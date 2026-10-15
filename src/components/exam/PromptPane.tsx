'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  FileText,
  Edit3,
  Highlighter,
  Maximize2,
  Table as TableIcon,
  Upload,
  Info,
} from 'lucide-react';
import { PromptSeed, ContrastMode, FontSize } from '@/types';
import Task1LineChart from '@/components/charts/Task1LineChart';
import Task1BarChart from '@/components/charts/Task1BarChart';
import Task1PieChart from '@/components/charts/Task1PieChart';
import ImageZoomModal from './ImageZoomModal';
import { compressImage } from '@/lib/utils';

interface PromptPaneProps {
  prompt: PromptSeed;
  contrastMode: ContrastMode;
  fontSize: FontSize;
  scratchpadNotes: string;
  onScratchpadChange: (notes: string) => void;
  customImageBase64?: string;
  onCustomImageUpload?: (base64: string) => void;
  onPromptTextChange?: (newText: string) => void;
  isCustomPrompt?: boolean;
}

export default function PromptPane({
  prompt,
  contrastMode,
  fontSize,
  scratchpadNotes,
  onScratchpadChange,
  customImageBase64,
  onCustomImageUpload,
  onPromptTextChange,
  isCustomPrompt,
}: PromptPaneProps) {
  const [activeTab, setActiveTab] = useState<'prompt' | 'scratchpad'>('prompt');
  const [showTable, setShowTable] = useState(false);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [highlightTooltip, setHighlightTooltip] = useState<{
    visible: boolean;
    x: number;
    y: number;
  }>({ visible: false, x: 0, y: 0 });

  const questionContainerRef = useRef<HTMLDivElement>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !onCustomImageUpload) return;
    try {
      setUploadingImage(true);
      const compressed = await compressImage(file);
      onCustomImageUpload(compressed);
    } catch (err) {
      console.error('Failed to compress and upload image', err);
      alert('Không thể tải ảnh. Vui lòng thử lại với định dạng PNG hoặc JPG.');
    } finally {
      setUploadingImage(false);
    }
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
                  : 'bg-sky-50 border-sky-100 text-sky-900'
              }`}
            >
              <div className="flex items-center gap-1.5 font-bold">
                <Info className="w-4 h-4 text-sky-600 shrink-0" />
                <span>
                  {prompt.taskType === 'task1'
                    ? 'IELTS Writing Task 1 (Academic)'
                    : 'IELTS Writing Task 2'}
                </span>
              </div>
              <p className="leading-relaxed">
                You should spend about <strong>{prompt.timeMinutes} minutes</strong> on this task.
                Write at least <strong>{prompt.minWords} words</strong>.
              </p>
            </div>

            {/* Prompt Question */}
            <div className="space-y-2">
              <h3 className="font-bold text-sm tracking-wide uppercase opacity-80">Đề bài:</h3>
              {isCustomPrompt ? (
                <textarea
                  value={prompt.question}
                  onChange={(e) => onPromptTextChange?.(e.target.value)}
                  placeholder="Dán câu hỏi đề bài thi tại đây..."
                  rows={4}
                  className="w-full p-3 text-sm rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              ) : (
                <div className="p-4 rounded-lg border border-dashed border-gray-300 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 leading-relaxed font-cdielts">
                  {prompt.question}
                </div>
              )}
            </div>

            {/* Instruction */}
            <p className="text-xs italic opacity-85 font-medium">{prompt.instruction}</p>

            {/* Custom Image Upload for Task 1 */}
            {isCustomPrompt && prompt.taskType === 'task1' && (
              <div className="p-4 rounded-lg border-2 border-dashed border-sky-300 dark:border-sky-800 bg-sky-50/50 dark:bg-sky-950/20 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-semibold text-sky-900 dark:text-sky-300">
                    <Upload className="w-4 h-4" />
                    Tải lên ảnh biểu đồ / bản đồ / quy trình Task 1 (Tùy chọn)
                  </div>
                  {uploadingImage && (
                    <span className="text-xs text-sky-600 animate-pulse">Đang nén ảnh...</span>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/webp"
                  onChange={handleFileUpload}
                  className="block w-full text-xs text-gray-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-sky-600 file:text-white hover:file:bg-sky-700"
                />
                <p className="text-[11px] text-gray-500 dark:text-gray-400">
                  Hệ thống tự động nén kích thước &lt;500KB bằng Canvas trước khi gửi lên AI Gemini Vision.
                </p>
              </div>
            )}

            {/* Uploaded Custom Image View */}
            {customImageBase64 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold">Ảnh đề bài đã tải lên:</span>
                  <button
                    type="button"
                    onClick={() => setIsZoomOpen(true)}
                    className="inline-flex items-center gap-1 text-xs text-sky-600 dark:text-sky-400 hover:underline"
                  >
                    <Maximize2 className="w-3 h-3" /> Phóng to ảnh
                  </button>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={customImageBase64}
                  alt="Custom Chart"
                  onClick={() => setIsZoomOpen(true)}
                  className="w-full max-h-72 object-contain rounded border border-gray-200 dark:border-zinc-800 bg-white cursor-pointer hover:opacity-95 transition"
                />
              </div>
            )}

            {/* Built-in Interactive Charts for Task 1 */}
            {prompt.taskType === 'task1' && !customImageBase64 && (
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider opacity-80">
                    Biểu đồ số liệu trực quan:
                  </span>
                  {prompt.chartTable && (
                    <button
                      type="button"
                      onClick={() => setShowTable(!showTable)}
                      className="inline-flex items-center gap-1 text-xs text-sky-600 dark:text-sky-400 hover:underline"
                    >
                      <TableIcon className="w-3.5 h-3.5" />
                      {showTable ? 'Ẩn bảng số liệu' : 'Xem bảng số liệu chi tiết'}
                    </button>
                  )}
                </div>

                {prompt.chartType === 'line' && prompt.chartData && prompt.chartDataKeys && (
                  <Task1LineChart data={prompt.chartData} dataKeys={prompt.chartDataKeys} />
                )}

                {prompt.chartType === 'bar' && prompt.chartData && prompt.chartDataKeys && (
                  <Task1BarChart data={prompt.chartData} dataKeys={prompt.chartDataKeys} />
                )}

                {prompt.chartType === 'pie' && prompt.chartData && (
                  <Task1PieChart data={prompt.chartData as any} />
                )}

                {/* Data Table */}
                {showTable && prompt.chartTable && (
                  <div className="overflow-x-auto rounded border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
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

      {/* Zoom Modal for Custom Image */}
      {customImageBase64 && (
        <ImageZoomModal
          isOpen={isZoomOpen}
          onClose={() => setIsZoomOpen(false)}
          imageUrl={customImageBase64}
          title={prompt.title}
        />
      )}
    </div>
  );
}
