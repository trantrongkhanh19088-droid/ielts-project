'use client';

import React, { useState, useEffect } from 'react';
import { Loader2, CheckCircle2, Sparkles, Brain, Award, BookCheck } from 'lucide-react';

interface GradingProgressModalProps {
  isOpen: boolean;
  isFullTest?: boolean;
}

const TIPS = [
  'Mẹo Task 1: Luôn có đoạn Overview tổng quan nêu bật xu hướng chính để đạt tối thiểu Band 6.0 TA.',
  'Mẹo Task 2: Cần nêu rõ lập trường (Thesis Statement) ngay ở đoạn Mở bài và giữ vững xuyên suốt toàn bài.',
  'Mẹo Từ vựng: Ưu tiên dùng Collocations tự nhiên thay vì ghép các từ hiếm gặp một cách gượng ép.',
  'Mẹo Ngữ pháp: Kết hợp linh hoạt giữa câu đơn, câu ghép và câu phức với các mệnh đề quan hệ / phân từ.',
  'Mẹo Điểm số: Điểm Overall Writing tính theo trọng số: Task 1 chiếm 1/3, Task 2 chiếm 2/3 tổng điểm.',
];

export default function GradingProgressModal({ isOpen, isFullTest }: GradingProgressModalProps) {
  const [seconds, setSeconds] = useState(0);
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setSeconds(0);
      return;
    }

    const timer = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);

    const tipTimer = setInterval(() => {
      setTipIndex((i) => (i + 1) % TIPS.length);
    }, 4500);

    return () => {
      clearInterval(timer);
      clearInterval(tipTimer);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Compute active steps based on elapsed seconds (typical duration ~10-15s)
  const steps = [
    {
      title: 'Phân tích cấu trúc bài viết & đối chiếu yêu cầu đề bài',
      desc: isFullTest ? 'Đang đọc song song Task 1 & Task 2...' : 'Đang kiểm tra độ dài & tiêu chí hình thức...',
      icon: BookCheck,
      threshold: 3,
    },
    {
      title: 'Đánh giá 4 tiêu chuẩn IELTS (TR/TA, CC, LR, GRA)',
      desc: 'Áp dụng biểu điểm chuẩn chính thức từ British Council & IDP...',
      icon: Brain,
      threshold: 7,
    },
    {
      title: 'Phát hiện lỗi câu & gợi ý từ vựng học thuật C1-C2',
      desc: 'Chỉ rõ nguyên nhân lỗi ngữ pháp và từ vựng thay thế đắt giá...',
      icon: Sparkles,
      threshold: 11,
    },
    {
      title: 'Biên soạn bài mẫu Band 8.5+ & hoàn tất báo cáo chi tiết',
      desc: 'Tạo bài luận mẫu hoàn chỉnh làm tư liệu tham khảo đối chiếu...',
      icon: Award,
      threshold: 15,
    },
  ];

  // Calculate percentage (0 - 95%)
  const progressPercent = Math.min(95, Math.round((seconds / 14) * 90) + 5);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-zinc-800 p-6 sm:p-7 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-950/70 text-sky-600 dark:text-sky-400 flex items-center justify-center border border-sky-200 dark:border-sky-800">
              <Loader2 className="w-5 h-5 animate-spin" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white text-base">
                AI Senior Examiner Đang Chấm Bài
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {isFullTest ? 'Chấm song song Task 1 & Task 2' : 'Đánh giá toàn diện 4 tiêu chí IELTS'}
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="font-mono text-sm font-bold text-sky-600 dark:text-sky-400">
              {seconds}s
            </span>
            <p className="text-[11px] text-gray-400">ước tính ~10-15s</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="w-full h-2 bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-sky-500 via-indigo-500 to-emerald-500 transition-all duration-700 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-gray-400">
            <span>Tiến trình đánh giá chuyên sâu</span>
            <span>{progressPercent}%</span>
          </div>
        </div>

        {/* Steps List */}
        <div className="space-y-3">
          {steps.map((st, i) => {
            const isCompleted = seconds >= st.threshold;
            const isCurrent =
              !isCompleted && (i === 0 || seconds >= steps[i - 1].threshold);
            const Icon = st.icon;

            return (
              <div
                key={i}
                className={`flex items-start gap-3 p-2.5 rounded-xl transition ${
                  isCurrent
                    ? 'bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800/60'
                    : isCompleted
                    ? 'opacity-85'
                    : 'opacity-40'
                }`}
              >
                <div className="mt-0.5">
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  ) : isCurrent ? (
                    <Loader2 className="w-4 h-4 text-sky-600 dark:text-sky-400 animate-spin" />
                  ) : (
                    <Icon className="w-4 h-4 text-gray-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-xs font-semibold ${
                      isCurrent
                        ? 'text-sky-900 dark:text-sky-300'
                        : isCompleted
                        ? 'text-gray-800 dark:text-gray-200'
                        : 'text-gray-500'
                    }`}
                  >
                    {st.title}
                  </p>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate">
                    {st.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* IELTS Tip Carousel while waiting */}
        <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 text-amber-900 dark:text-amber-300">
          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Mẹo làm bài IELTS Writing:</span>
          </div>
          <p className="text-xs leading-relaxed italic transition-all duration-300">
            &ldquo;{TIPS[tipIndex]}&rdquo;
          </p>
        </div>

        <p className="text-center text-[11px] text-gray-400">
          Vui lòng không đóng trình duyệt trong khi AI đang xử lý bài viết.
        </p>
      </div>
    </div>
  );
}
