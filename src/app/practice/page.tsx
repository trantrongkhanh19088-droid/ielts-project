'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { PromptSeed, TaskType, ContrastMode, FontSize, GradingResult, FullTestGradingResult } from '@/types';
import { TASK_1_SEEDS, TASK_2_SEEDS, getPromptById } from '@/lib/data/seed-prompts';
import ExamHeader from '@/components/exam/ExamHeader';
import PromptPane from '@/components/exam/PromptPane';
import EditorPane from '@/components/exam/EditorPane';
import FullTestNavBar from '@/components/exam/FullTestNavBar';
import {
  calculateOverallBand,
  checkRateLimit,
  recordSubmission,
  getUserApiKey,
  countWords,
} from '@/lib/utils';
import { saveEssayRecord, saveDraft, loadDraft, clearDraft } from '@/lib/storage';

function PracticeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Mode and seed prompt initialization
  const modeParam = (searchParams.get('mode') as TaskType) || 'task1';
  const promptIdParam = searchParams.get('promptId') || '';
  const isCustomMode = searchParams.get('custom') === 'true';

  const [mode, setMode] = useState<TaskType>(modeParam);
  const isFullTest = mode === 'full_test';

  // Part state for Full Test mode ('task1' or 'task2')
  const [activeFullTestPart, setActiveFullTestPart] = useState<'task1' | 'task2'>('task1');

  // Prompts setup
  const [task1Prompt, setTask1Prompt] = useState<PromptSeed>(() => {
    if (modeParam === 'task1' && promptIdParam) {
      const p = getPromptById(promptIdParam);
      if (p && p.taskType === 'task1') return p;
    }
    return TASK_1_SEEDS[0];
  });

  const [task2Prompt, setTask2Prompt] = useState<PromptSeed>(() => {
    if (modeParam === 'task2' && promptIdParam) {
      const p = getPromptById(promptIdParam);
      if (p && p.taskType === 'task2') return p;
    }
    return TASK_2_SEEDS[0];
  });

  // Custom inputs
  const [customImageBase64, setCustomImageBase64] = useState<string>('');

  // Essay Contents & Scratchpads
  const [task1Essay, setTask1Essay] = useState('');
  const [task2Essay, setTask2Essay] = useState('');
  const [task1Notes, setTask1Notes] = useState('');
  const [task2Notes, setTask2Notes] = useState('');

  // Exam UI Settings
  const [contrastMode, setContrastMode] = useState<ContrastMode>('default');
  const [fontSize, setFontSize] = useState<FontSize>('normal');
  const [lastSavedAt, setLastSavedAt] = useState<number>(Date.now());

  // Countdown Timer
  const initialSeconds = isFullTest ? 60 * 60 : modeParam === 'task2' ? 40 * 60 : 20 * 60;
  const [timeRemaining, setTimeRemaining] = useState<number>(initialSeconds);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load existing draft if present
  useEffect(() => {
    const draft1 = loadDraft(isFullTest ? 'full_task1' : `single_task1_${task1Prompt.id}`);
    if (draft1) {
      setTask1Essay(draft1.content || '');
      setTask1Notes(draft1.notes || '');
    }

    const draft2 = loadDraft(isFullTest ? 'full_task2' : `single_task2_${task2Prompt.id}`);
    if (draft2) {
      setTask2Essay(draft2.content || '');
      setTask2Notes(draft2.notes || '');
    }
  }, [isFullTest, task1Prompt.id, task2Prompt.id]);

  // Timer Tick Interval
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Auto-save drafts every 3 seconds
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      if (isFullTest) {
        saveDraft('full_task1', task1Essay, task1Notes);
        saveDraft('full_task2', task2Essay, task2Notes);
      } else if (mode === 'task1') {
        saveDraft(`single_task1_${task1Prompt.id}`, task1Essay, task1Notes);
      } else {
        saveDraft(`single_task2_${task2Prompt.id}`, task2Essay, task2Notes);
      }
      setLastSavedAt(Date.now());
    }, 3000);

    return () => clearInterval(autoSaveInterval);
  }, [isFullTest, mode, task1Essay, task1Notes, task2Essay, task2Notes, task1Prompt.id, task2Prompt.id]);

  // Current active prompt & content based on mode & active part
  const currentPrompt = isFullTest
    ? activeFullTestPart === 'task1'
      ? task1Prompt
      : task2Prompt
    : mode === 'task1'
    ? task1Prompt
    : task2Prompt;

  const currentEssay = isFullTest
    ? activeFullTestPart === 'task1'
      ? task1Essay
      : task2Essay
    : mode === 'task1'
    ? task1Essay
    : task2Essay;

  const handleCurrentEssayChange = (val: string) => {
    if (isFullTest) {
      if (activeFullTestPart === 'task1') setTask1Essay(val);
      else setTask2Essay(val);
    } else if (mode === 'task1') {
      setTask1Essay(val);
    } else {
      setTask2Essay(val);
    }
  };

  const currentNotes = isFullTest
    ? activeFullTestPart === 'task1'
      ? task1Notes
    : task2Notes
    : mode === 'task1'
    ? task1Notes
    : task2Notes;

  const handleCurrentNotesChange = (val: string) => {
    if (isFullTest) {
      if (activeFullTestPart === 'task1') setTask1Notes(val);
      else setTask2Notes(val);
    } else if (mode === 'task1') {
      setTask1Notes(val);
    } else {
      setTask2Notes(val);
    }
  };

  // Submission & AI Grading
  const handleSubmit = async () => {
    if (isSubmitting) return;

    // Word count safety checks
    const t1Words = countWords(task1Essay);
    const t2Words = countWords(task2Essay);

    if (isFullTest) {
      if (t1Words < 30 && t2Words < 30) {
        alert('Bạn chưa viết đủ nội dung cho bài thi. Vui lòng viết ít nhất một đoạn văn cho cả hai task trước khi nộp bài.');
        return;
      }
      if (t1Words < 150 || t2Words < 250) {
        const confirmShort = confirm(
          `Cảnh báo số từ:\n- Task 1: ${t1Words}/150 từ\n- Task 2: ${t2Words}/250 từ\nViết dưới số từ tối thiểu sẽ bị trừ điểm tiêu chí Task Achievement / Task Response theo luật IELTS.\nBạn có chắc chắn muốn nộp bài ngay bây giờ?`
        );
        if (!confirmShort) return;
      }
    } else if (mode === 'task1') {
      if (t1Words < 30) {
        alert('Nội dung bài viết quá ngắn. Vui lòng viết thêm để AI có thể chấm điểm chính xác.');
        return;
      }
      if (t1Words < 150) {
        const confirmShort = confirm(
          `Bài viết của bạn mới đạt ${t1Words}/150 từ. Bạn có chắc chắn muốn nộp bài và chấp nhận bị trừ điểm Task Achievement không?`
        );
        if (!confirmShort) return;
      }
    } else {
      if (t2Words < 30) {
        alert('Nội dung bài viết quá ngắn. Vui lòng viết thêm để AI có thể chấm điểm chính xác.');
        return;
      }
      if (t2Words < 250) {
        const confirmShort = confirm(
          `Bài viết của bạn mới đạt ${t2Words}/250 từ. Bạn có chắc chắn muốn nộp bài và chấp nhận bị trừ điểm Task Response không?`
        );
        if (!confirmShort) return;
      }
    }

    // Rate Limit Check (Max 3 submissions in 5 minutes)
    const rateCheck = checkRateLimit();
    if (!rateCheck.allowed) {
      alert(
        `Bạn đã gửi chấm quá nhiều lần trong thời gian ngắn. Vui lòng đợi ${rateCheck.remainingWaitSeconds} giây nữa trước khi gửi chấm tiếp để bảo vệ hạn mức API.`
      );
      return;
    }

    setIsSubmitting(true);
    const userApiKey = getUserApiKey();
    const timeSpent = initialSeconds - timeRemaining;

    try {
      if (isFullTest) {
        // Parallel grading for Task 1 and Task 2 to avoid 60s timeout
        const [res1, res2] = await Promise.all([
          fetch('/api/grade', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              taskType: 'task1',
              promptText: task1Prompt.question,
              chartDataOrDescription: task1Prompt.chartDescription,
              imageBase64: customImageBase64 || undefined,
              essayContent: task1Essay,
              userApiKey,
            }),
          }),
          fetch('/api/grade', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              taskType: 'task2',
              promptText: task2Prompt.question,
              chartDataOrDescription: undefined,
              imageBase64: undefined,
              essayContent: task2Essay,
              userApiKey,
            }),
          }),
        ]);

        if (!res1.ok || !res2.ok) {
          const err1 = !res1.ok ? await res1.json() : null;
          const err2 = !res2.ok ? await res2.json() : null;
          throw new Error(err1?.error || err2?.error || 'Lỗi khi gọi AI chấm bài');
        }

        const data1: GradingResult = await res1.json();
        const data2: GradingResult = await res2.json();

        data1.taskType = 'task1';
        data1.promptTitle = task1Prompt.title;
        data1.promptText = task1Prompt.question;
        data1.userEssay = task1Essay;
        data1.wordCount = t1Words;
        data1.timeSpentSeconds = Math.round(timeSpent * 0.33);

        data2.taskType = 'task2';
        data2.promptTitle = task2Prompt.title;
        data2.promptText = task2Prompt.question;
        data2.userEssay = task2Essay;
        data2.wordCount = t2Words;
        data2.timeSpentSeconds = Math.round(timeSpent * 0.67);

        const overallBand = calculateOverallBand(data1.overallBand, data2.overallBand);

        const fullTestResult: FullTestGradingResult = {
          isFullTest: true,
          overallBand,
          task1Result: data1,
          task2Result: data2,
          totalTimeSeconds: timeSpent,
          createdAt: new Date().toISOString(),
        };

        recordSubmission();

        const record = await saveEssayRecord({
          task_type: 'full_test',
          prompt_title: `Full Test: ${task1Prompt.title} & ${task2Prompt.title}`,
          prompt_text: `Task 1: ${task1Prompt.question}\n\nTask 2: ${task2Prompt.question}`,
          essay_content: `--- TASK 1 ---\n${task1Essay}\n\n--- TASK 2 ---\n${task2Essay}`,
          word_count: t1Words + t2Words,
          duration_seconds: timeSpent,
          overall_band: overallBand,
          tr_score: data2.criteria.taskAchievementOrResponse.score,
          cc_score: (data1.criteria.coherenceCohesion.score + data2.criteria.coherenceCohesion.score) / 2,
          lr_score: (data1.criteria.lexicalResource.score + data2.criteria.lexicalResource.score) / 2,
          gra_score: (data1.criteria.grammaticalRange.score + data2.criteria.grammaticalRange.score) / 2,
          ai_feedback_json: fullTestResult,
        });

        clearDraft('full_task1');
        clearDraft('full_task2');

        router.push(`/results?id=${record.id}`);
      } else {
        // Single Task Mode
        const isT1 = mode === 'task1';
        const activePrompt = isT1 ? task1Prompt : task2Prompt;
        const activeEssay = isT1 ? task1Essay : task2Essay;

        const res = await fetch('/api/grade', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            taskType: isT1 ? 'task1' : 'task2',
            promptText: activePrompt.question,
            chartDataOrDescription: activePrompt.chartDescription,
            imageBase64: isT1 && customImageBase64 ? customImageBase64 : undefined,
            essayContent: activeEssay,
            userApiKey,
          }),
        });

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData?.error || 'Lỗi khi gọi AI chấm bài');
        }

        const data: GradingResult = await res.json();
        data.taskType = isT1 ? 'task1' : 'task2';
        data.promptTitle = activePrompt.title;
        data.promptText = activePrompt.question;
        data.userEssay = activeEssay;
        data.wordCount = countWords(activeEssay);
        data.timeSpentSeconds = timeSpent;

        recordSubmission();

        const record = await saveEssayRecord({
          task_type: isT1 ? 'task1' : 'task2',
          prompt_title: activePrompt.title,
          prompt_text: activePrompt.question,
          chart_image_url: customImageBase64 || undefined,
          essay_content: activeEssay,
          word_count: data.wordCount,
          duration_seconds: timeSpent,
          overall_band: data.overallBand,
          tr_score: data.criteria.taskAchievementOrResponse.score,
          cc_score: data.criteria.coherenceCohesion.score,
          lr_score: data.criteria.lexicalResource.score,
          gra_score: data.criteria.grammaticalRange.score,
          ai_feedback_json: data,
        });

        clearDraft(`single_${mode}_${activePrompt.id}`);

        router.push(`/results?id=${record.id}`);
      }
    } catch (err: any) {
      console.error('Submission failed', err);
      alert(`Chấm bài thất bại: ${err.message || 'Lỗi kết nối'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const modeLabel = isFullTest
    ? 'Full Writing Test (60 min)'
    : mode === 'task1'
    ? 'Task 1 Practice (20 min)'
    : 'Task 2 Practice (40 min)';

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors ${
        contrastMode === 'yellow-on-black'
          ? 'bg-black text-[#ffe600]'
          : contrastMode === 'white-on-black'
          ? 'bg-zinc-950 text-white'
          : 'bg-white text-gray-900'
      }`}
    >
      {/* Inspera Simulator Header */}
      <ExamHeader
        title={currentPrompt.title}
        modeLabel={modeLabel}
        timeRemainingSeconds={timeRemaining}
        contrastMode={contrastMode}
        onContrastModeChange={setContrastMode}
        fontSize={fontSize}
        onFontSizeChange={setFontSize}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />

      {/* Main Split-Pane Examination Area (50% Prompt, 50% Editor) */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 overflow-hidden h-[calc(100vh-105px)]">
        {/* Left Column (50%): Prompt, Charts, Highlighting, Scratchpad */}
        <div className="h-full overflow-hidden">
          <PromptPane
            prompt={currentPrompt}
            contrastMode={contrastMode}
            fontSize={fontSize}
            scratchpadNotes={currentNotes}
            onScratchpadChange={handleCurrentNotesChange}
            customImageBase64={customImageBase64}
            onCustomImageUpload={setCustomImageBase64}
            onPromptTextChange={(newText) => {
              if (isFullTest && activeFullTestPart === 'task1') {
                setTask1Prompt((prev) => ({ ...prev, question: newText }));
              } else if (isFullTest && activeFullTestPart === 'task2') {
                setTask2Prompt((prev) => ({ ...prev, question: newText }));
              } else if (mode === 'task1') {
                setTask1Prompt((prev) => ({ ...prev, question: newText }));
              } else {
                setTask2Prompt((prev) => ({ ...prev, question: newText }));
              }
            }}
            isCustomPrompt={isCustomMode}
          />
        </div>

        {/* Right Column (50%): Inspera Editor with No Spellcheck */}
        <div className="h-full overflow-hidden">
          <EditorPane
            content={currentEssay}
            onChange={handleCurrentEssayChange}
            minWords={currentPrompt.minWords}
            taskTitle={isFullTest ? (activeFullTestPart === 'task1' ? 'Part 1 (Task 1)' : 'Part 2 (Task 2)') : currentPrompt.title}
            contrastMode={contrastMode}
            fontSize={fontSize}
            lastSavedAt={lastSavedAt}
          />
        </div>
      </div>

      {/* Full Test Navigation Bar at bottom */}
      {isFullTest && (
        <FullTestNavBar
          currentPart={activeFullTestPart}
          onSwitchPart={setActiveFullTestPart}
          task1WordCount={countWords(task1Essay)}
          task2WordCount={countWords(task2Essay)}
          contrastMode={contrastMode}
        />
      )}
    </div>
  );
}

export default function PracticePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-950">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-4 border-sky-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-xs text-gray-500 font-medium">Đang chuẩn bị phòng thi CD-IELTS...</p>
          </div>
        </div>
      }
    >
      <PracticeContent />
    </Suspense>
  );
}
