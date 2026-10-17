'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  FileText,
  Edit3,
  Highlighter,
  Maximize2,
  Table as TableIcon,
  Info,
  Sparkles,
  Shuffle,
} from 'lucide-react';
import { PromptSeed, ContrastMode, FontSize } from '@/types';
import Task1LineChart from '@/components/charts/Task1LineChart';
import Task1BarChart from '@/components/charts/Task1BarChart';
import Task1PieChart from '@/components/charts/Task1PieChart';
import ImageZoomModal from './ImageZoomModal';

interface PromptPaneProps {
  prompt: PromptSeed;
  availablePrompts?: PromptSeed[];
  onSelectPrompt?: (prompt: PromptSeed) => void;
  contrastMode: ContrastMode;
  fontSize: FontSize;
  scratchpadNotes: string;
  onScratchpadChange: (notes: string) => void;
  onRandomizePrompt?: () => void;
}

export default function PromptPane({
  prompt,
  contrastMode,
  fontSize,
  scratchpadNotes,
  onScratchpadChange,
  onRandomizePrompt,
}: PromptPaneProps) {
  const [activeTab, setActiveTab] = useState<'prompt' | 'scratchpad'>('prompt');
  const [showTable, setShowTable] = useState(false);
  const [showOutline, setShowOutline] = useState(false);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [chartViewMode, setChartViewMode] = useState<'image' | 'interactive'>('image');
  const [highlightTooltip, setHighlightTooltip] = useState<{
    visible: boolean;
    x: number;
    y: number;
  }>({ visible: false, x: 0, y: 0 });

  const questionContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setChartViewMode('image');
    setShowTable(false);
  }, [prompt.id]);

  // Handle Text Selection for Highlighting
  const handleMouseUp = () => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) {
      setHighlightTooltip({ visible: false, x: 0, y: 0 });
      return;
    }

    const text = selection.toString().trim();
    if (text.length > 0) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setHighlightTooltip({
        visible: true,
        x: rect.left + rect.width / 2,
        y: rect.top - 38,
      });
    }
  };

  const applyHighlight = () => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const span = document.createElement('mark');
    span.className = 'bg-yellow-300 dark:bg-yellow-400/50 text-black px-0.5 rounded cursor-pointer';
    span.title = 'Click to remove highlight';
    span.onclick = (e) => {
      e.stopPropagation();
      const parent = span.parentNode;
      while (span.firstChild) {
        parent?.insertBefore(span.firstChild, span);
      }
      parent?.removeChild(span);
    };

    try {
      range.surroundContents(span);
      selection.removeAllRanges();
    } catch {
      // Fallback for cross-node selection
    }
    setHighlightTooltip({ visible: false, x: 0, y: 0 });
  };

  const clearAllHighlights = () => {
    if (!questionContainerRef.current) return;
    const marks = questionContainerRef.current.querySelectorAll('mark');
    marks.forEach((mark) => {
      const parent = mark.parentNode;
      while (mark.firstChild) {
        parent?.insertBefore(mark.firstChild, mark);
      }
      parent?.removeChild(mark);
    });
    setHighlightTooltip({ visible: false, x: 0, y: 0 });
  };

  const fontSizeClass =
    fontSize === 'extra-large' ? 'text-lg' : fontSize === 'large' ? 'text-base' : 'text-sm';

  return (
    <div
      className={`h-full flex flex-col border-r transition-colors overflow-hidden select-text ${
        contrastMode === 'yellow-on-black'
          ? 'bg-black text-[#ffe600] border-[#ffe600]/40'
          : contrastMode === 'white-on-black'
          ? 'bg-zinc-950 text-white border-zinc-800'
          : 'bg-gray-50 text-gray-900 border-gray-200'
      }`}
    >
      {/* Pane Tabs Header */}
      <div
        className={`flex items-center justify-between px-4 py-2 border-b select-none ${
          contrastMode === 'yellow-on-black'
            ? 'bg-zinc-950 border-[#ffe600]/30'
            : contrastMode === 'white-on-black'
            ? 'bg-zinc-900 border-zinc-800'
            : 'bg-white border-gray-200'
        }`}
      >
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setActiveTab('prompt')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition ${
              activeTab === 'prompt'
                ? contrastMode === 'yellow-on-black'
                  ? 'bg-[#ffe600] text-black'
                  : 'bg-sky-600 text-white'
                : 'opacity-70 hover:opacity-100'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            Đề bài & Biểu đồ
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('scratchpad')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition ${
              activeTab === 'scratchpad'
                ? contrastMode === 'yellow-on-black'
                  ? 'bg-[#ffe600] text-black'
                : 'bg-sky-600 text-white'
                : 'opacity-70 hover:opacity-100'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            Ghi chú / Dàn ý nháp
          </button>
        </div>

        {activeTab === 'prompt' && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={clearAllHighlights}
              className="text-[11px] underline opacity-70 hover:opacity-100"
              title="Xóa toàn bộ tô vàng"
            >
              Clear Highlights
            </button>
          </div>
        )}
      </div>

      {/* Pane Content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        {activeTab === 'prompt' ? (
          <div
            ref={questionContainerRef}
            onMouseUp={handleMouseUp}
            className={`space-y-5 ${fontSizeClass}`}
          >
            {/* Task Requirement Card */}
            <div
              className={`p-3.5 rounded-lg border text-xs space-y-1.5 ${
                contrastMode === 'yellow-on-black'
                  ? 'bg-zinc-950 border-[#ffe600]/30 text-[#ffe600]'
                  : contrastMode === 'white-on-black'
                  ? 'bg-zinc-900 border-zinc-800 text-zinc-300'
                  : 'bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 text-gray-800 dark:text-zinc-200 shadow-xs'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-sky-600 text-white shadow-xs">
                    <Info className="w-3.5 h-3.5" />
                    {prompt.taskType === 'task1' ? 'IELTS Academic Task 1' : 'IELTS Writing Task 2'}
                  </span>
                  {prompt.category && (
                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 border border-gray-200 dark:border-zinc-700">
                      {prompt.category}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold border ${
                      contrastMode === 'yellow-on-black'
                        ? 'bg-black border-[#ffe600] text-[#ffe600]'
                        : contrastMode === 'white-on-black'
                        ? 'bg-zinc-800 border-zinc-700 text-zinc-300'
                        : 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400'
                    }`}
                  >
                    <Sparkles className="w-3 h-3 text-emerald-500 shrink-0" />
                    <span>Đề ngẫu nhiên</span>
                  </span>

                  {onRandomizePrompt && (
                    <button
                      type="button"
                      onClick={onRandomizePrompt}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold border transition shadow-xs hover:scale-105 active:scale-95 ${
                        contrastMode === 'yellow-on-black'
                          ? 'bg-[#ffe600] text-black border-[#ffe600] hover:bg-[#ffe600]/80'
                          : contrastMode === 'white-on-black'
                          ? 'bg-zinc-800 border-zinc-600 text-white hover:bg-zinc-700'
                          : 'bg-sky-50 dark:bg-sky-950/60 border-sky-300 dark:border-sky-800 text-sky-700 dark:text-sky-300 hover:bg-sky-100 dark:hover:bg-sky-900/60'
                      }`}
                      title="Đổi sang đề thi ngẫu nhiên khác (đặt lại đồng hồ và làm mới bài viết)"
                    >
                      <Shuffle className="w-3 h-3 text-sky-600 dark:text-sky-400 shrink-0" />
                      <span>Đổi đề khác (Random)</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-zinc-400 pt-1">
                <span>Thời gian khuyến nghị: <strong className="text-gray-800 dark:text-zinc-200">{prompt.timeMinutes} phút</strong></span>
                <span>•</span>
                <span>Độ dài tối thiểu: <strong className="text-gray-800 dark:text-zinc-200">{prompt.minWords} từ</strong></span>
              </div>
            </div>

            {/* Prompt Question Card */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-xs uppercase tracking-wider text-gray-500 dark:text-zinc-400">
                  Nội dung đề bài thi:
                </h3>
              </div>

              <div className={`p-4 sm:p-5 rounded-r-xl border-l-4 border-l-sky-600 border-y border-r leading-relaxed transition-colors shadow-xs ${
                contrastMode === 'yellow-on-black'
                  ? 'bg-zinc-950 border-[#ffe600]/40 text-[#ffe600]'
                  : contrastMode === 'white-on-black'
                  ? 'bg-zinc-900 border-zinc-800 text-zinc-100'
                  : 'bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 text-gray-900 dark:text-zinc-100'
              }`}>
                <p className="text-sm md:text-[15px] font-sans font-medium leading-relaxed">
                  {prompt.question}
                </p>
              </div>
            </div>

            {/* Instruction */}
            <p className="text-xs italic opacity-85 font-medium">{prompt.instruction}</p>

            {/* Forecast Outline & Hints */}
            {prompt.outline && (
              <div className="rounded-lg border border-sky-200 dark:border-sky-900 bg-sky-50/50 dark:bg-sky-950/20 overflow-hidden text-xs">
                <button
                  type="button"
                  onClick={() => setShowOutline(!showOutline)}
                  className="w-full flex items-center justify-between px-3.5 py-2 font-bold text-sky-800 dark:text-sky-300 hover:bg-sky-100/50 dark:hover:bg-sky-900/30 transition text-left"
                >
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                    <span>Dàn ý &amp; Luận điểm gợi ý (Forecast Outline Band 8.0+)</span>
                  </span>
                  <span className="text-[11px] font-semibold text-sky-600 dark:text-sky-400 underline">
                    {showOutline ? 'Thu gọn ▲' : 'Xem gợi ý ▼'}
                  </span>
                </button>
                {showOutline && (
                  <div className="p-3.5 pt-2 space-y-2.5 border-t border-sky-200/60 dark:border-sky-900/50 text-gray-700 dark:text-gray-300 leading-relaxed font-sans">
                    {prompt.outline.overviewOrThesis && (
                      <div className="p-2 rounded bg-white/70 dark:bg-zinc-900/60 border border-sky-100 dark:border-zinc-800">
                        <strong className="text-sky-800 dark:text-sky-300">
                          {prompt.taskType === 'task1' ? 'Overview (Tổng quan): ' : 'Thesis Statement (Luận điểm mở bài): '}
                        </strong>
                        <span>{prompt.outline.overviewOrThesis}</span>
                      </div>
                    )}
                    {prompt.outline.body1 && (
                      <div className="p-2 rounded bg-white/70 dark:bg-zinc-900/60 border border-sky-100 dark:border-zinc-800">
                        <strong className="text-sky-800 dark:text-sky-300">Body 1: </strong>
                        <span>{prompt.outline.body1}</span>
                      </div>
                    )}
                    {prompt.outline.body2 && (
                      <div className="p-2 rounded bg-white/70 dark:bg-zinc-900/60 border border-sky-100 dark:border-zinc-800">
                        <strong className="text-sky-800 dark:text-sky-300">Body 2: </strong>
                        <span>{prompt.outline.body2}</span>
                      </div>
                    )}
                    {prompt.outline.conclusion && (
                      <div className="p-2 rounded bg-white/70 dark:bg-zinc-900/60 border border-sky-100 dark:border-zinc-800">
                        <strong className="text-sky-800 dark:text-sky-300">Conclusion: </strong>
                        <span>{prompt.outline.conclusion}</span>
                      </div>
                    )}
                    {prompt.outline.note && (
                      <div className="text-[11px] text-amber-700 dark:text-amber-400 font-medium italic pt-1">
                        <strong>Lưu ý làm bài: </strong>
                        <span>{prompt.outline.note}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Built-in Visual Diagram / Interactive Charts for Task 1 */}
            {prompt.taskType === 'task1' && (
              <div className="space-y-3 pt-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold uppercase tracking-wider opacity-85">
                      {prompt.category ? `Đề bài: ${prompt.category}` : 'Hình ảnh / Biểu đồ:'}
                    </span>
                    {prompt.imageUrl && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                        Forecast Quý 3
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Toggle between Original Scan and Interactive Chart if both exist */}
                    {prompt.imageUrl && prompt.chartData && (
                      <div className="flex rounded-md p-0.5 bg-gray-200 dark:bg-zinc-800 text-[11px] font-medium">
                        <button
                          type="button"
                          onClick={() => setChartViewMode('image')}
                          className={`px-2 py-0.5 rounded transition ${
                            chartViewMode === 'image'
                              ? 'bg-white dark:bg-zinc-900 text-sky-600 dark:text-sky-400 shadow-sm font-semibold'
                              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
                          }`}
                        >
                          Hình ảnh gốc
                        </button>
                        <button
                          type="button"
                          onClick={() => setChartViewMode('interactive')}
                          className={`px-2 py-0.5 rounded transition ${
                            chartViewMode === 'interactive'
                              ? 'bg-white dark:bg-zinc-900 text-sky-600 dark:text-sky-400 shadow-sm font-semibold'
                              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
                          }`}
                        >
                          Biểu đồ số
                        </button>
                      </div>
                    )}

                    {prompt.imageUrl && (
                      <button
                        type="button"
                        onClick={() => setIsZoomOpen(true)}
                        className="inline-flex items-center gap-1 text-xs text-sky-600 dark:text-sky-400 hover:underline font-semibold"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>Phóng to</span>
                      </button>
                    )}

                    {prompt.chartTable && (
                      <button
                        type="button"
                        onClick={() => setShowTable(!showTable)}
                        className="inline-flex items-center gap-1 text-xs text-sky-600 dark:text-sky-400 hover:underline"
                      >
                        <TableIcon className="w-3.5 h-3.5" />
                        <span>{showTable ? 'Ẩn số liệu' : 'Bảng số liệu'}</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Display Official Diagram Image (Map, Process, or Chart) */}
                {prompt.imageUrl && (chartViewMode === 'image' || !prompt.chartData) && (
                  <div className="relative group rounded-xl border border-gray-200 dark:border-zinc-800 bg-white p-2.5 overflow-hidden shadow-sm">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={prompt.imageUrl}
                      alt={prompt.title}
                      onClick={() => setIsZoomOpen(true)}
                      className="w-full max-h-80 object-contain rounded cursor-zoom-in transition-transform duration-200 group-hover:scale-[1.01]"
                    />
                    <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/75 text-white text-[10px] px-2 py-1 rounded-md pointer-events-none flex items-center gap-1">
                      <Maximize2 className="w-3 h-3" />
                      <span>Nhấp để phóng to toàn màn hình</span>
                    </div>
                  </div>
                )}

                {/* Display Interactive Chart if selected or if no image */}
                {(!prompt.imageUrl || chartViewMode === 'interactive') && prompt.chartData && (
                  <div>
                    {prompt.chartType === 'line' && prompt.chartDataKeys && (
                      <Task1LineChart data={prompt.chartData} dataKeys={prompt.chartDataKeys} />
                    )}
                    {prompt.chartType === 'bar' && prompt.chartDataKeys && (
                      <Task1BarChart data={prompt.chartData} dataKeys={prompt.chartDataKeys} />
                    )}
                    {prompt.chartType === 'pie' && (
                      <Task1PieChart data={prompt.chartData as any} />
                    )}
                  </div>
                )}

                {/* Data Table */}
                {showTable && prompt.chartTable && (
                  <div className="overflow-x-auto rounded border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 mt-2">
                    <table className="w-full text-xs text-left border-collapse">
                      <thead className="bg-gray-100 dark:bg-zinc-800 border-b border-gray-200 dark:border-zinc-700">
                        <tr>
                          {prompt.chartTable.headers.map((h, i) => (
                            <th key={i} className="p-2.5 font-bold">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {prompt.chartTable.rows.map((row, rIdx) => (
                          <tr
                            key={rIdx}
                            className="border-b border-gray-100 dark:border-zinc-800/50 hover:bg-gray-50/50 dark:hover:bg-zinc-800/30"
                          >
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="p-2.5">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          /* Scratchpad / Outline Tab */
          <div className="h-full flex flex-col space-y-3">
            <div className="flex items-center justify-between text-xs opacity-80">
              <span>Khung nháp (Scratchpad) — Không tính vào điểm số chính thức:</span>
              <span>Tự động lưu nháp</span>
            </div>
            <textarea
              value={scratchpadNotes}
              onChange={(e) => onScratchpadChange(e.target.value)}
              placeholder="Ghi chú nhanh dàn ý tại đây...
- Introduction & Paraphrase:
- Overview (Task 1) / Thesis Statement (Task 2):
- Body Paragraph 1 (Key Trend / Main Point 1):
- Body Paragraph 2 (Comparison / Main Point 2):"
              className={`w-full flex-1 min-h-[350px] p-4 text-xs font-mono rounded-lg border focus:outline-none focus:ring-1 leading-relaxed ${
                contrastMode === 'yellow-on-black'
                  ? 'bg-black border-[#ffe600]/40 text-[#ffe600] focus:ring-[#ffe600]'
                  : contrastMode === 'white-on-black'
                  ? 'bg-zinc-900 border-zinc-800 text-zinc-200 focus:ring-zinc-600'
                  : 'bg-white border-gray-300 text-gray-800 focus:ring-sky-500'
              }`}
            />
          </div>
        )}
      </div>

      {/* Floating Highlight Button Tooltip */}
      {highlightTooltip.visible && (
        <div
          className="fixed z-50 transform -translate-x-1/2 flex items-center gap-1 bg-gray-900 text-white px-2.5 py-1 rounded shadow-xl text-xs"
          style={{ top: `${highlightTooltip.y}px`, left: `${highlightTooltip.x}px` }}
        >
          <button
            type="button"
            onClick={applyHighlight}
            className="flex items-center gap-1 font-semibold hover:text-yellow-300 transition"
          >
            <Highlighter className="w-3.5 h-3.5 text-yellow-400" />
            Highlight
          </button>
        </div>
      )}

      {/* Zoom Modal for Forecast Image */}
      {prompt.imageUrl && (
        <ImageZoomModal
          isOpen={isZoomOpen}
          onClose={() => setIsZoomOpen(false)}
          imageUrl={prompt.imageUrl}
          title={prompt.title}
        />
      )}
    </div>
  );
}
