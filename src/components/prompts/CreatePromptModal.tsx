'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  Sparkles,
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  Trash2,
  AlertCircle,
  PenTool,
  BarChart3,
  Lightbulb,
  FileText,
  BookOpen,
} from 'lucide-react';
import { PromptSeed } from '@/types';
import { saveCustomPrompt } from '@/lib/storage';
import { useSoundEngine } from '@/hooks/useSoundEngine';

interface CreatePromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newPrompt: PromptSeed) => void;
}

const TASK1_CATEGORIES = [
  'Line Graph',
  'Bar Chart',
  'Pie Chart',
  'Table',
  'Process Diagram',
  'Map Comparison',
  'Mixed Charts',
];

const TASK2_CATEGORIES = [
  'Opinion / Agree or Disagree',
  'Discuss Both Views',
  'Advantages & Disadvantages',
  'Problem & Solution',
  'Two-part Question',
];

export default function CreatePromptModal({ isOpen, onClose, onSuccess }: CreatePromptModalProps) {
  const { playClick, playChime } = useSoundEngine();
  const [mounted, setMounted] = useState(false);

  // Form State
  const [taskType, setTaskType] = useState<'task1' | 'task2'>('task2');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Opinion / Agree or Disagree');
  const [question, setQuestion] = useState('');
  const [instruction, setInstruction] = useState(
    'Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.'
  );
  const [imageBase64, setImageBase64] = useState<string | null>(null);

  // Outline State
  const [overviewOrThesis, setOverviewOrThesis] = useState('');
  const [body1, setBody1] = useState('');
  const [body2, setBody2] = useState('');
  const [conclusion, setConclusion] = useState('');
  const [note, setNote] = useState('');
  const [suggestedVocab, setSuggestedVocab] = useState<
    { word: string; meaningVi: string; collocation: string }[]
  >([]);

  // UI State
  const [isGenerating, setIsGenerating] = useState(false);
  const [generateError, setGenerateError] = useState('');
  const [isOutlineOpen, setIsOutlineOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync default instructions & categories on taskType change
  const handleTaskTypeChange = (type: 'task1' | 'task2') => {
    playClick();
    setTaskType(type);
    if (type === 'task1') {
      setCategory('Line Graph');
      setInstruction(
        'Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.'
      );
    } else {
      setCategory('Opinion / Agree or Disagree');
      setInstruction(
        'Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.'
      );
    }
  };

  // Keyboard Escape listener
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Compress & convert file to clean Base64
  const processImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Vui lòng chọn tệp hình ảnh (PNG, JPG, WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        // Resize if image is huge to fit within localStorage
        const canvas = document.createElement('canvas');
        const maxDimension = 1200;
        let { width, height } = img;

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
          setImageBase64(compressedDataUrl);
        }
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  // Handle Drag & Drop
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processImageFile(e.dataTransfer.files[0]);
    }
  };

  // Handle Clipboard Paste (e.g. snipped screenshot via Win+Shift+S / Cmd+Shift+4)
  const handlePaste = (e: React.ClipboardEvent) => {
    if (e.clipboardData.items) {
      for (let i = 0; i < e.clipboardData.items.length; i++) {
        const item = e.clipboardData.items[i];
        if (item.type.indexOf('image') !== -1) {
          const file = item.getAsFile();
          if (file) {
            processImageFile(file);
            break;
          }
        }
      }
    }
  };

  // Call AI Outline Generator API
  const handleGenerateOutline = async () => {
    if (!question || question.trim().length < 5) {
      setGenerateError('Vui lòng nhập nội dung đề bài trước khi yêu cầu AI tạo dàn ý.');
      return;
    }

    playClick();
    setIsGenerating(true);
    setGenerateError('');

    try {
      const res = await fetch('/api/prompts/generate-outline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          taskType,
          title: title.trim() || undefined,
          question: question.trim(),
          category: category || undefined,
          imageBase64: imageBase64 || undefined,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Không thể tạo dàn ý AI.');
      }

      const data = await res.json();

      if (data.title && !title.trim()) {
        setTitle(data.title);
      }
      if (data.category) {
        setCategory(data.category);
      }
      if (data.instruction) {
        setInstruction(data.instruction);
      }

      if (data.outline) {
        setOverviewOrThesis(data.outline.overviewOrThesis || '');
        setBody1(data.outline.body1 || '');
        setBody2(data.outline.body2 || '');
        setConclusion(data.outline.conclusion || '');
        setNote(data.outline.note || '');
      }

      if (Array.isArray(data.suggestedVocabulary)) {
        setSuggestedVocab(data.suggestedVocabulary);
      }

      setIsOutlineOpen(true);
      playChime();
    } catch (err: any) {
      setGenerateError(err.message || 'Lỗi khi kết nối với AI Examiner.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Save Custom Prompt
  const handleSave = () => {
    if (!question.trim()) {
      alert('Vui lòng nhập nội dung đề bài.');
      return;
    }

    playClick();
    const promptId = `custom-${taskType}-${Date.now()}`;
    const generatedTitle =
      title.trim() ||
      `${taskType === 'task1' ? 'T1 Custom' : 'T2 Custom'}: ${question.slice(0, 45)}...`;

    const newPrompt: PromptSeed = {
      id: promptId,
      taskType,
      title: generatedTitle,
      category: category || (taskType === 'task1' ? 'Custom Chart' : 'General Essay'),
      instruction: instruction.trim(),
      question: question.trim(),
      minWords: taskType === 'task1' ? 150 : 250,
      timeMinutes: taskType === 'task1' ? 20 : 40,
      imageUrl: imageBase64 || undefined,
      outline: {
        overviewOrThesis: overviewOrThesis.trim() || undefined,
        body1: body1.trim() || undefined,
        body2: body2.trim() || undefined,
        conclusion: conclusion.trim() || undefined,
        note: note.trim() || undefined,
      },
    };

    saveCustomPrompt(newPrompt);
    playChime();
    onSuccess(newPrompt);
    onClose();
  };

  if (!isOpen || !mounted) return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150 overflow-y-auto"
      onClick={onClose}
      onPaste={handlePaste}
    >
      <div
        className="relative bg-paper dark:bg-carbon border border-stone-300 dark:border-stone-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden text-stone-900 dark:text-stone-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800 bg-paper-subtle dark:bg-carbon-subtle shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 font-bold uppercase">
                Tài khoản của bạn // Private Prompt
              </span>
              <span className="text-[11px] font-mono text-stone-400">Lưu trữ cục bộ / Account</span>
            </div>
            <h2 className="text-lg font-bold font-display text-stone-900 dark:text-stone-100 mt-1">
              Tải Lên &amp; Tạo Đề Thi IELTS Writing
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg border border-stone-200 dark:border-stone-800 text-stone-400 hover:text-stone-800 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs flex-1">
          {/* Task Type Switcher */}
          <div>
            <label className="block font-mono text-[11px] font-bold text-stone-600 dark:text-stone-400 uppercase mb-1.5">
              Chọn phần thi (Task Type):
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleTaskTypeChange('task1')}
                className={`p-3 rounded-xl border flex items-center gap-2.5 transition text-left ${
                  taskType === 'task1'
                    ? 'border-sky-500 bg-sky-500/10 text-sky-900 dark:text-sky-200 shadow-xs'
                    : 'border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-850'
                }`}
              >
                <BarChart3 className="w-5 h-5 text-sky-500 shrink-0" />
                <div>
                  <span className="font-bold block text-xs">Task 1: Academic Report</span>
                  <span className="text-[11px] opacity-70">≥150 từ • 20 phút • Biểu đồ / Bản đồ</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleTaskTypeChange('task2')}
                className={`p-3 rounded-xl border flex items-center gap-2.5 transition text-left ${
                  taskType === 'task2'
                    ? 'border-amber-500 bg-amber-500/10 text-amber-900 dark:text-amber-200 shadow-xs'
                    : 'border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-850'
                }`}
              >
                <PenTool className="w-5 h-5 text-amber-500 shrink-0" />
                <div>
                  <span className="font-bold block text-xs">Task 2: Academic Essay</span>
                  <span className="text-[11px] opacity-70">≥250 từ • 40 phút • Luận điểm</span>
                </div>
              </button>
            </div>
          </div>

          {/* Prompt Question Content */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="font-mono text-[11px] font-bold text-stone-600 dark:text-stone-400 uppercase">
                Nội dung câu hỏi đề bài thi (Question): <span className="text-red-500">*</span>
              </label>
              <span className="text-[11px] font-mono text-stone-400">Hỗ trợ dán ảnh (Ctrl+V)</span>
            </div>
            <textarea
              rows={4}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder={
                taskType === 'task1'
                  ? 'Ví dụ: The charts below show the percentage of water used for different purposes in six areas of the world...'
                  : 'Ví dụ: Some people think that universities should provide graduates with the knowledge and skills needed in the workplace. Others think that the true function of a university should be to give access to knowledge for its own sake, regardless of whether the course is useful to an employer. Discuss both views and give your opinion.'
              }
              className="w-full p-3 rounded-xl border border-stone-200 dark:border-stone-800 bg-paper-subtle dark:bg-carbon-subtle focus:outline-none focus:border-stone-900 dark:focus:border-stone-100 leading-relaxed font-sans text-xs transition"
            />
          </div>

          {/* Optional Title & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-mono text-[11px] font-bold text-stone-600 dark:text-stone-400 uppercase mb-1">
                Tiêu đề ngắn gọn (Title):
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Để trống AI sẽ tự tạo..."
                className="w-full px-3 py-2 rounded-lg border border-stone-200 dark:border-stone-800 bg-paper-subtle dark:bg-carbon-subtle text-xs focus:outline-none focus:border-stone-900 dark:focus:border-stone-100"
              />
            </div>

            <div>
              <label className="block font-mono text-[11px] font-bold text-stone-600 dark:text-stone-400 uppercase mb-1">
                Thể loại bài (Category):
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-stone-200 dark:border-stone-800 bg-paper-subtle dark:bg-carbon-subtle text-xs focus:outline-none focus:border-stone-900 dark:focus:border-stone-100"
              >
                {(taskType === 'task1' ? TASK1_CATEGORIES : TASK2_CATEGORIES).map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Task 1 Image Upload Dropzone */}
          <div>
            <label className="block font-mono text-[11px] font-bold text-stone-600 dark:text-stone-400 uppercase mb-1.5">
              Hình ảnh đề bài (Biểu đồ / Bản đồ / Quy trình):
            </label>

            {imageBase64 ? (
              <div className="relative border border-stone-200 dark:border-stone-800 rounded-xl p-3 bg-stone-50 dark:bg-stone-900 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imageBase64}
                    alt="Đề bài đính kèm"
                    className="max-h-20 max-w-[120px] object-contain rounded border border-stone-200 bg-white"
                  />
                  <div>
                    <span className="font-semibold text-xs block text-stone-800 dark:text-stone-200">
                      Ảnh đề bài đã sẵn sàng
                    </span>
                    <span className="text-[11px] text-stone-400">
                      Sẽ được hiển thị trong phòng thi và cho AI phân tích số liệu
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setImageBase64(null)}
                  className="p-2 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition"
                  title="Xóa ảnh"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-stone-300 dark:border-stone-700 hover:border-stone-500 rounded-xl p-4 text-center cursor-pointer transition bg-stone-50/50 dark:bg-stone-900/30 group"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => e.target.files?.[0] && processImageFile(e.target.files[0])}
                  accept="image/*"
                  className="hidden"
                />
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-8 h-8 rounded-full bg-stone-200 dark:bg-stone-800 flex items-center justify-center text-stone-500 group-hover:scale-105 transition">
                    <Upload className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-xs text-stone-700 dark:text-stone-300">
                    Bấm để tải ảnh lên hoặc kéo thả tệp vào đây
                  </span>
                  <span className="text-[11px] text-stone-400">
                    Mẹo: Có thể chụp màn hình (Win + Shift + S) rồi ấn <kbd className="px-1 py-0.5 rounded bg-stone-200 dark:bg-stone-800 font-mono">Ctrl + V</kbd> để dán ảnh trực tiếp
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* AI Outline Generator Action Banner */}
          <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-50/60 dark:bg-amber-950/20 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-1.5 font-bold text-amber-900 dark:text-amber-200 text-xs">
                  <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>AI Examiner: Tự Động Phân Tích &amp; Tạo Dàn Ý Band 8.0+</span>
                </div>
                <p className="text-[11px] text-amber-800/80 dark:text-amber-300/80 leading-relaxed mt-0.5">
                  Gemini AI sẽ phân tích đề bài, trích xuất Overview/Thesis, lập luận 2 Body Paragraphs và gợi ý các cụm Collocations điểm cao.
                </p>
              </div>

              <button
                type="button"
                onClick={handleGenerateOutline}
                disabled={isGenerating || !question.trim()}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white font-semibold text-xs transition shadow-xs shrink-0 cursor-pointer"
              >
                {isGenerating ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Đang tạo dàn ý...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{overviewOrThesis ? 'Tạo lại Dàn Ý' : 'Tạo Dàn Ý Band 8+'}</span>
                  </>
                )}
              </button>
            </div>

            {generateError && (
              <div className="flex items-center gap-1.5 text-xs text-rose-600 pt-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{generateError}</span>
              </div>
            )}
          </div>

          {/* Outline Fields (Collapsible / Editable) */}
          <div className="border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden">
            <button
              type="button"
              onClick={() => setIsOutlineOpen(!isOutlineOpen)}
              className="w-full flex items-center justify-between px-4 py-2.5 bg-paper-subtle dark:bg-carbon-subtle border-b border-stone-200 dark:border-stone-800 font-bold text-xs hover:bg-stone-100 dark:hover:bg-stone-800 transition text-left"
            >
              <div className="flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                <span>Dàn Ý Band 8.0+ &amp; Từ Vựng (Xem / Chỉnh sửa)</span>
                {overviewOrThesis && (
                  <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 font-bold">
                    Đã có dàn ý
                  </span>
                )}
              </div>
              <span className="font-mono text-[11px] text-stone-400">
                {isOutlineOpen ? '[Thu gọn -]' : '[Mở rộng +]'}
              </span>
            </button>

            {isOutlineOpen && (
              <div className="p-4 space-y-3 bg-paper dark:bg-carbon text-xs">
                <div>
                  <label className="block font-bold text-stone-700 dark:text-stone-300 text-[11px] mb-1">
                    {taskType === 'task1' ? '1. Overview (Xu hướng tổng quan):' : '1. Overview / Thesis Statement (Luận điểm mở bài):'}
                  </label>
                  <textarea
                    rows={2}
                    value={overviewOrThesis}
                    onChange={(e) => setOverviewOrThesis(e.target.value)}
                    placeholder="Tóm tắt tổng quan xu hướng hoặc quan điểm chính..."
                    className="w-full p-2.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-paper-subtle dark:bg-carbon-subtle text-xs font-sans"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-stone-700 dark:text-stone-300 text-[11px] mb-1">
                      2. Body Paragraph 1 (Luận điểm 1):
                    </label>
                    <textarea
                      rows={3}
                      value={body1}
                      onChange={(e) => setBody1(e.target.value)}
                      placeholder="Ý chính và số liệu / dẫn chứng cho đoạn 1..."
                      className="w-full p-2.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-paper-subtle dark:bg-carbon-subtle text-xs font-sans"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 dark:text-stone-300 text-[11px] mb-1">
                      3. Body Paragraph 2 (Luận điểm 2):
                    </label>
                    <textarea
                      rows={3}
                      value={body2}
                      onChange={(e) => setBody2(e.target.value)}
                      placeholder="Ý chính và so sánh / dẫn chứng cho đoạn 2..."
                      className="w-full p-2.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-paper-subtle dark:bg-carbon-subtle text-xs font-sans"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-stone-700 dark:text-stone-300 text-[11px] mb-1">
                      4. Conclusion (Kết luận):
                    </label>
                    <textarea
                      rows={2}
                      value={conclusion}
                      onChange={(e) => setConclusion(e.target.value)}
                      placeholder="Tóm tắt khẳng định lại quan điểm..."
                      className="w-full p-2.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-paper-subtle dark:bg-carbon-subtle text-xs font-sans"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 dark:text-stone-300 text-[11px] mb-1">
                      5. Lưu ý tránh bẫy giám khảo (Note):
                    </label>
                    <textarea
                      rows={2}
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Lưu ý các lỗi thí sinh hay mắc phải..."
                      className="w-full p-2.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-paper-subtle dark:bg-carbon-subtle text-xs font-sans"
                    />
                  </div>
                </div>

                {/* Suggested Vocabulary Tags */}
                {suggestedVocab.length > 0 && (
                  <div className="pt-2 border-t border-stone-200 dark:border-stone-800">
                    <span className="font-bold text-[11px] text-stone-700 dark:text-stone-300 block mb-1.5">
                      Gợi ý Collocations / Từ vựng điểm cao cho đề này:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {suggestedVocab.map((v, idx) => (
                        <div
                          key={idx}
                          className="px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-200 text-[11px]"
                          title={`${v.meaningVi} — ${v.collocation}`}
                        >
                          <strong className="font-semibold">{v.word}</strong>: {v.meaningVi}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-stone-200 dark:border-stone-800 bg-paper-subtle dark:bg-carbon-subtle flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 font-semibold text-xs transition"
          >
            Hủy bỏ
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={!question.trim()}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-stone-900 text-stone-50 hover:bg-vermilion dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-vermilion dark:hover:text-stone-50 text-xs font-bold transition shadow-sm cursor-pointer disabled:opacity-50"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Lưu Vào Kho Đề Của Tôi</span>
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
