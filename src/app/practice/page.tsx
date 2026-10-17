'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { PromptSeed, TaskType, ContrastMode, FontSize, GradingResult, FullTestGradingResult } from '@/types';
import { TASK_1_SEEDS, TASK_2_SEEDS, getPromptById, getRandomPrompt } from '@/lib/data/seed-prompts';
import ExamHeader from '@/components/exam/ExamHeader';
import PromptPane from '@/components/exam/PromptPane';
import EditorPane from '@/components/exam/EditorPane';
import FullTestNavBar from '@/components/exam/FullTestNavBar';
import GradingProgressModal from '@/components/exam/GradingProgressModal';
import { ShieldCheck, Lock, CheckCircle2, AlertTriangle, X, RotateCcw } from 'lucide-react';
import {
  calculateOverallBand,
  checkRateLimit,
  recordSubmission,
  countWords,
} from '@/lib/utils';
import {
  saveEssayRecord,
  saveDraft,
  loadDraft,
  clearDraft,
  clearAllDrafts,
  getActiveSession,
  saveActiveSession,
  clearActiveSession,
  getLastCompletedPromptId,
  setLastCompletedPromptId,
} from '@/lib/storage';

function PracticeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Mode initialization
  const modeParam = (searchParams.get('mode') as TaskType) || 'task1';
  const promptIdParam = searchParams.get('promptId');
  const [mode, setMode] = useState<TaskType>(modeParam);
  const isFullTest = mode === 'full_test';

  // Part state for Full Test mode ('task1' or 'task2')
  const [activeFullTestPart, setActiveFullTestPart] = useState<'task1' | 'task2'>('task1');

  // Prompts setup
  const [task1Prompt, setTask1Prompt] = useState<PromptSeed>(() => TASK_1_SEEDS[0]);
  const [task2Prompt, setTask2Prompt] = useState<PromptSeed>(() => TASK_2_SEEDS[0]);
  const [isSessionLoaded, setIsSessionLoaded] = useState(false);

  // Essay Contents & Scratchpads
  const [task1Essay, setTask1Essay] = useState('');
  const [task2Essay, setTask2Essay] = useState('');
  const [task1Notes, setTask1Notes] = useState('');
  const [task2Notes, setTask2Notes] = useState('');

  // Exam UI Settings
  const [contrastMode, setContrastMode] = useState<ContrastMode>('default');
  const [fontSize, setFontSize] = useState<FontSize>('normal');
  const [lastSavedAt, setLastSavedAt] = useState<number>(Date.now());
  const [isEditorFullscreen, setIsEditorFullscreen] = useState(false);

  // Countdown Timer
  const defaultMinutes = isFullTest ? 60 : modeParam === 'task2' ? 40 : 20;
  const initialSeconds = defaultMinutes * 60;
  const [timeRemaining, setTimeRemaining] = useState<number>(initialSeconds);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<{ message: string; is503: boolean } | null>(null);
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  const [examSessionToken, setExamSessionToken] = useState<string>('');

  // Human Verification & Anti-Bot Challenge Modal State
  const [showChallengeModal, setShowChallengeModal] = useState(false);
  const [challengeProblem, setChallengeProblem] = useState({ q: '9 + 7', a: 16 });
  const [challengeAnswer, setChallengeAnswer] = useState('');
  const [challengeError, setChallengeError] = useState('');

  // Behavioral Telemetry for bot detection
  const telemetryRef = useRef({
    keystrokes: 0,
    mouseEvents: 0,
    pasteCount: 0,
    focusSeconds: 0,
  });

  useEffect(() => {
    const handleKey = () => { telemetryRef.current.keystrokes++; };
    const handleMouse = () => { telemetryRef.current.mouseEvents++; };
    const handlePaste = () => { telemetryRef.current.pasteCount++; };

    window.addEventListener('keydown', handleKey);
    window.addEventListener('mousemove', handleMouse);
    window.addEventListener('paste', handlePaste);

    const timer = setInterval(() => {
      if (typeof document !== 'undefined' && document.hasFocus()) {
        telemetryRef.current.focusSeconds++;
      }
    }, 1000);

    return () => {
      window.removeEventListener('keydown', handleKey);
      window.removeEventListener('mousemove', handleMouse);
      window.removeEventListener('paste', handlePaste);
      clearInterval(timer);
    };
  }, []);

  // Fetch cryptographic exam session token from server
  useEffect(() => {
    let isMounted = true;
    async function initSession() {
      try {
        const res = await fetch(`/api/exam/session?taskType=${modeParam}`);
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data.token) {
            setExamSessionToken(data.token);
          }
        }
      } catch (err) {
        console.warn('Could not initialize session token', err);
      }
    }
    initSession();
    return () => {
      isMounted = false;
    };
  }, [modeParam]);

  // Load or generate active random session and drafts
  useEffect(() => {
    setMode(modeParam);
    const existingSession = getActiveSession(modeParam);

    if (modeParam === 'full_test') {
      let t1P: PromptSeed | undefined;
      let t2P: PromptSeed | undefined;

      if (existingSession && existingSession.task1PromptId && existingSession.task2PromptId) {
        t1P = getPromptById(existingSession.task1PromptId);
        t2P = getPromptById(existingSession.task2PromptId);
      }

      if (!t1P || !t2P) {
        // Brand new session: completely clear out old essays/notes
        setTask1Essay('');
        setTask2Essay('');
        setTask1Notes('');
        setTask2Notes('');
        clearDraft('full_task1');
        clearDraft('full_task2');

        const lastT1 = getLastCompletedPromptId('task1');
        const lastT2 = getLastCompletedPromptId('task2');
        t1P = getRandomPrompt('task1', lastT1);
        t2P = getRandomPrompt('task2', lastT2);
        saveActiveSession({
          mode: 'full_test',
          task1PromptId: t1P.id,
          task2PromptId: t2P.id,
          startedAt: Date.now(),
        });
        setTimeRemaining(60 * 60);
      } else {
        // Continuing ongoing active session
        const draft1 = loadDraft('full_task1');
        const draft2 = loadDraft('full_task2');
        setTask1Essay(draft1?.content || '');
        setTask1Notes(draft1?.notes || '');
        setTask2Essay(draft2?.content || '');
        setTask2Notes(draft2?.notes || '');

        const savedTime = draft1?.timeRemaining ?? draft2?.timeRemaining;
        if (typeof savedTime === 'number' && savedTime > 0) {
          setTimeRemaining(savedTime);
        } else {
          setTimeRemaining(60 * 60);
        }
      }

      setTask1Prompt(t1P);
      setTask2Prompt(t2P);
    } else if (modeParam === 'task1') {
      let t1P: PromptSeed | undefined;

      if (promptIdParam) {
        t1P = getPromptById(promptIdParam);
      } else if (existingSession && existingSession.promptId) {
        t1P = getPromptById(existingSession.promptId);
      }

      // If user comes from a specific prompt link and it differs from existing session
      const isSwitchingPrompt = promptIdParam && existingSession?.promptId !== promptIdParam;

      if (!t1P || isSwitchingPrompt) {
        if (!t1P) {
          const lastT1 = getLastCompletedPromptId('task1');
          t1P = getRandomPrompt('task1', lastT1);
        }
        // Brand new session: reset editor
        setTask1Essay('');
        setTask1Notes('');
        clearDraft(`single_task1_${t1P.id}`);
        saveActiveSession({
          mode: 'task1',
          promptId: t1P.id,
          startedAt: Date.now(),
        });
        setTimeRemaining(20 * 60);
      } else {
        // Continuing ongoing active session
        const draft = loadDraft(`single_task1_${t1P.id}`);
        setTask1Essay(draft?.content || '');
        setTask1Notes(draft?.notes || '');
        if (typeof draft?.timeRemaining === 'number' && draft.timeRemaining > 0) {
          setTimeRemaining(draft.timeRemaining);
        } else {
          setTimeRemaining(20 * 60);
        }
      }

      setTask1Prompt(t1P);
    } else {
      // task2
      let t2P: PromptSeed | undefined;

      if (promptIdParam) {
        t2P = getPromptById(promptIdParam);
      } else if (existingSession && existingSession.promptId) {
        t2P = getPromptById(existingSession.promptId);
      }

      // If user comes from a specific prompt link and it differs from existing session
      const isSwitchingPrompt = promptIdParam && existingSession?.promptId !== promptIdParam;

      if (!t2P || isSwitchingPrompt) {
        if (!t2P) {
          const lastT2 = getLastCompletedPromptId('task2');
          t2P = getRandomPrompt('task2', lastT2);
        }
        // Brand new session: reset editor
        setTask2Essay('');
        setTask2Notes('');
        clearDraft(`single_task2_${t2P.id}`);
        saveActiveSession({
          mode: 'task2',
          promptId: t2P.id,
          startedAt: Date.now(),
        });
        setTimeRemaining(40 * 60);
      } else {
        // Continuing ongoing active session
        const draft = loadDraft(`single_task2_${t2P.id}`);
        setTask2Essay(draft?.content || '');
        setTask2Notes(draft?.notes || '');
        if (typeof draft?.timeRemaining === 'number' && draft.timeRemaining > 0) {
          setTimeRemaining(draft.timeRemaining);
        } else {
          setTimeRemaining(40 * 60);
        }
      }

      setTask2Prompt(t2P);
    }

    setIsSessionLoaded(true);
  }, [modeParam, promptIdParam]);

  // Timer Tick Interval (respects pause state and session load)
  useEffect(() => {
    if (!isSessionLoaded || isTimerPaused || isSubmitting) return;

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
  }, [isSessionLoaded, isTimerPaused, isSubmitting]);

  // Auto-save drafts every 3 seconds (including timeRemaining)
  useEffect(() => {
    if (!isSessionLoaded || isSubmitting) return;

    const autoSaveInterval = setInterval(() => {
      if (isFullTest) {
        saveDraft('full_task1', task1Essay, task1Notes, timeRemaining);
        saveDraft('full_task2', task2Essay, task2Notes, timeRemaining);
      } else if (mode === 'task1') {
        saveDraft(`single_task1_${task1Prompt.id}`, task1Essay, task1Notes, timeRemaining);
      } else {
        saveDraft(`single_task2_${task2Prompt.id}`, task2Essay, task2Notes, timeRemaining);
      }
      setLastSavedAt(Date.now());
    }, 3000);

    return () => clearInterval(autoSaveInterval);
  }, [isSessionLoaded, isFullTest, mode, task1Essay, task1Notes, task2Essay, task2Notes, timeRemaining, task1Prompt.id, task2Prompt.id, isSubmitting]);

  // Save on beforeunload (closing tab or refreshing)
  useEffect(() => {
    if (!isSessionLoaded || isSubmitting) return;

    const handleBeforeUnload = () => {
      if (isFullTest) {
        saveDraft('full_task1', task1Essay, task1Notes, timeRemaining);
        saveDraft('full_task2', task2Essay, task2Notes, timeRemaining);
      } else if (mode === 'task1') {
        saveDraft(`single_task1_${task1Prompt.id}`, task1Essay, task1Notes, timeRemaining);
      } else {
        saveDraft(`single_task2_${task2Prompt.id}`, task2Essay, task2Notes, timeRemaining);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isSessionLoaded, isFullTest, mode, task1Essay, task1Notes, task2Essay, task2Notes, timeRemaining, task1Prompt.id, task2Prompt.id, isSubmitting]);

  // Home navigation with save
  const handleSaveAndGoHome = () => {
    if (isFullTest) {
      saveDraft('full_task1', task1Essay, task1Notes, timeRemaining);
      saveDraft('full_task2', task2Essay, task2Notes, timeRemaining);
    } else if (mode === 'task1') {
      saveDraft(`single_task1_${task1Prompt.id}`, task1Essay, task1Notes, timeRemaining);
    } else {
      saveDraft(`single_task2_${task2Prompt.id}`, task2Essay, task2Notes, timeRemaining);
    }

    const minutesLeft = Math.floor(timeRemaining / 60);
    const secondsLeft = timeRemaining % 60;
    const confirmExit = confirm(
      `Đã tự động lưu toàn bộ tiến độ bài viết và thời gian còn lại (${minutesLeft} phút ${secondsLeft} giây).\n\nBạn có muốn quay về Trang chủ ngay bây giờ? Bạn có thể mở lại bất kỳ lúc nào để tiếp tục đúng đề thi này.`
    );
    if (confirmExit) {
      router.push('/');
    }
  };

  const handleResetTime = (seconds?: number) => {
    setTimeRemaining(seconds || initialSeconds);
    setIsTimerPaused(false);
  };

  const handleSetCustomTime = (minutes: number) => {
    setTimeRemaining(Math.max(1, Math.round(minutes * 60)));
    setIsTimerPaused(false);
  };

  const handleTogglePauseTimer = () => {
    setIsTimerPaused((prev) => !prev);
  };

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

    // Rate Limit Check (Max 10 submissions in 5 minutes)
    const rateCheck = checkRateLimit();
    if (!rateCheck.allowed) {
      alert(
        `Bạn đã gửi chấm quá 10 lần trong 5 phút. Vui lòng đợi ${rateCheck.remainingWaitSeconds} giây nữa trước khi gửi chấm tiếp để bảo vệ hạn mức hệ thống.`
      );
      return;
    }

    const timeSpent = initialSeconds - timeRemaining;

    // Generate random human verification math challenge
    const num1 = Math.floor(Math.random() * 15) + 5;
    const num2 = Math.floor(Math.random() * 9) + 3;
    setChallengeProblem({ q: `${num1} + ${num2}`, a: num1 + num2 });
    setChallengeAnswer('');
    setChallengeError('');
    setShowChallengeModal(true);
  };

  const handleConfirmHumanChallengeAndSubmit = async () => {
    if (!challengeAnswer.trim()) {
      setChallengeError('Vui lòng nhập kết quả xác minh bạn là người thật.');
      return;
    }

    if (parseInt(challengeAnswer.trim(), 10) !== challengeProblem.a) {
      setChallengeError('Đáp án xác minh chưa đúng, vui lòng thử lại.');
      return;
    }

    setShowChallengeModal(false);
    await executeSubmission();
  };

  const executeSubmission = async () => {
    setIsSubmitting(true);
    const timeSpent = initialSeconds - timeRemaining;
    const t1Words = countWords(task1Essay);
    const t2Words = countWords(task2Essay);

    const telemetryPayload = {
      keystrokes: telemetryRef.current.keystrokes,
      mouseEvents: telemetryRef.current.mouseEvents,
      pasteCount: telemetryRef.current.pasteCount,
      focusSeconds: telemetryRef.current.focusSeconds,
      humanProofSolved: true,
    };

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
              imageBase64: undefined,
              essayContent: task1Essay,
              sessionToken: examSessionToken,
              securityTrap: '',
              telemetry: telemetryPayload,
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
              sessionToken: examSessionToken,
              securityTrap: '',
              telemetry: telemetryPayload,
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
          chart_image_url: task1Prompt.imageUrl || undefined,
          essay_content: `--- TASK 1 ---\n${task1Essay}\n\n--- TASK 2 ---\n${task2Essay}`,
          word_count: t1Words + t2Words,
          duration_seconds: timeSpent,
          overall_band: overallBand,
          tr_score: data2.criteria.taskAchievementOrResponse.score,
          cc_score: (data1.criteria.coherenceCohesion.score + data2.criteria.coherenceCohesion.score) / 2,
          lr_score: (data1.criteria.lexicalResource.score + data2.criteria.lexicalResource.score) / 2,
          gra_score: (data1.criteria.grammaticalRange.score + data2.criteria.grammaticalRange.score) / 2,
          ai_feedback_json: fullTestResult,
          server_signature: (data1 as any).serverVerificationSignature || (data2 as any).serverVerificationSignature,
        });

        clearDraft('full_task1');
        clearDraft('full_task2');
        clearActiveSession('full_test');
        clearAllDrafts();
        setLastCompletedPromptId('task1', task1Prompt.id);
        setLastCompletedPromptId('task2', task2Prompt.id);

        setTask1Essay('');
        setTask2Essay('');
        setTask1Notes('');
        setTask2Notes('');

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
            imageBase64: undefined,
            essayContent: activeEssay,
            sessionToken: examSessionToken,
            securityTrap: '',
            telemetry: telemetryPayload,
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
          chart_image_url: activePrompt.imageUrl || undefined,
          essay_content: activeEssay,
          word_count: data.wordCount,
          duration_seconds: timeSpent,
          overall_band: data.overallBand,
          tr_score: data.criteria.taskAchievementOrResponse.score,
          cc_score: data.criteria.coherenceCohesion.score,
          lr_score: data.criteria.lexicalResource.score,
          gra_score: data.criteria.grammaticalRange.score,
          ai_feedback_json: data,
          server_signature: (data as any).serverVerificationSignature,
        });

        clearDraft(`single_${mode}_${activePrompt.id}`);
        clearDraft(`single_task1_${activePrompt.id}`);
        clearDraft(`single_task2_${activePrompt.id}`);
        clearActiveSession(mode);
        clearAllDrafts();
        setLastCompletedPromptId(isT1 ? 'task1' : 'task2', activePrompt.id);

        setTask1Essay('');
        setTask2Essay('');
        setTask1Notes('');
        setTask2Notes('');

        router.push(`/results?id=${record.id}`);
      }
    } catch (err: any) {
      console.error('Submission failed', err);
      const is503 =
        err.message?.includes('503') ||
        err.message?.includes('quá tải') ||
        err.message?.includes('High Demand') ||
        err.message?.includes('Service Unavailable');

      setSubmitError({
        message: is503
          ? 'Máy chủ chấm bài Google AI hiện đang có lượng truy cập tăng đột biến tạm thời (503 Service Unavailable). Bài viết của bạn ĐÃ ĐƯỢC LƯU AN TOÀN nguyên vẹn trong hệ thống. Vui lòng bấm "Thử chấm lại ngay".'
          : err.message || 'Lỗi khi kết nối đến hệ thống chấm thi.',
        is503,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRandomizePrompt = () => {
    const isT1 = isFullTest ? activeFullTestPart === 'task1' : mode === 'task1';
    const currentText = isFullTest
      ? (activeFullTestPart === 'task1' ? task1Essay : task2Essay)
      : (mode === 'task1' ? task1Essay : task2Essay);

    if (currentText && currentText.trim().length > 10) {
      const confirmMsg = isFullTest
        ? `Bạn có chắc muốn đổi sang đề thi ngẫu nhiên khác cho ${activeFullTestPart === 'task1' ? 'Part 1 (Task 1)' : 'Part 2 (Task 2)'}? Bài viết của phần này sẽ bị xóa và đồng hồ bấm giờ sẽ được đặt lại từ đầu.`
        : 'Bạn có chắc muốn đổi sang đề thi ngẫu nhiên khác? Bài viết đã nhập trong khối này sẽ bị xóa và đồng hồ bấm giờ sẽ được đặt lại từ đầu.';
      if (!confirm(confirmMsg)) return;
    }

    if (isFullTest) {
      if (activeFullTestPart === 'task1') {
        const lastT1 = getLastCompletedPromptId('task1');
        const newT1 = getRandomPrompt('task1', task1Prompt.id || lastT1);
        setTask1Prompt(newT1);
        setTask1Essay('');
        setTask1Notes('');
        clearDraft('full_task1');
        saveActiveSession({
          mode: 'full_test',
          task1PromptId: newT1.id,
          task2PromptId: task2Prompt.id,
          startedAt: Date.now(),
        });
      } else {
        const lastT2 = getLastCompletedPromptId('task2');
        const newT2 = getRandomPrompt('task2', task2Prompt.id || lastT2);
        setTask2Prompt(newT2);
        setTask2Essay('');
        setTask2Notes('');
        clearDraft('full_task2');
        saveActiveSession({
          mode: 'full_test',
          task1PromptId: task1Prompt.id,
          task2PromptId: newT2.id,
          startedAt: Date.now(),
        });
      }
      setTimeRemaining(60 * 60);
    } else if (mode === 'task1') {
      const lastT1 = getLastCompletedPromptId('task1');
      const newT1 = getRandomPrompt('task1', task1Prompt.id || lastT1);
      setTask1Prompt(newT1);
      setTask1Essay('');
      setTask1Notes('');
      clearDraft(`single_task1_${task1Prompt.id}`);
      clearDraft(`single_task1_${newT1.id}`);
      clearActiveSession('task1');
      saveActiveSession({
        mode: 'task1',
        promptId: newT1.id,
        startedAt: Date.now(),
      });
      setTimeRemaining(20 * 60);
      if (typeof window !== 'undefined') {
        window.history.replaceState(null, '', `/practice?mode=task1&promptId=${newT1.id}`);
      }
    } else {
      // task2
      const lastT2 = getLastCompletedPromptId('task2');
      const newT2 = getRandomPrompt('task2', task2Prompt.id || lastT2);
      setTask2Prompt(newT2);
      setTask2Essay('');
      setTask2Notes('');
      clearDraft(`single_task2_${task2Prompt.id}`);
      clearDraft(`single_task2_${newT2.id}`);
      clearActiveSession('task2');
      saveActiveSession({
        mode: 'task2',
        promptId: newT2.id,
        startedAt: Date.now(),
      });
      setTimeRemaining(40 * 60);
      if (typeof window !== 'undefined') {
        window.history.replaceState(null, '', `/practice?mode=task2&promptId=${newT2.id}`);
      }
    }

    // Refresh exam security token & reset telemetry
    fetch(`/api/exam/session?taskType=${modeParam}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.token) setExamSessionToken(d.token);
      })
      .catch(() => {});

    telemetryRef.current = {
      keystrokes: 0,
      mouseEvents: 0,
      pasteCount: 0,
      focusSeconds: 0,
    };
  };

  const modeLabel = isFullTest
    ? 'Full Writing Test (60 min)'
    : mode === 'task1'
    ? 'Task 1 Practice (20 min)'
    : 'Task 2 Practice (40 min)';

  if (!isSessionLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-950">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-sky-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-gray-500 font-medium">Đang chuẩn bị đề thi ngẫu nhiên và nạp tiến độ bài làm...</p>
        </div>
      </div>
    );
  }

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
        onGoHome={handleSaveAndGoHome}
        onResetTime={handleResetTime}
        onSetCustomTime={handleSetCustomTime}
        isTimerPaused={isTimerPaused}
        onTogglePauseTimer={handleTogglePauseTimer}
        onRandomizePrompt={handleRandomizePrompt}
        defaultMinutes={defaultMinutes}
      />

      {/* Main Split-Pane Examination Area (Prompt / Editor) */}
      <div className={`flex-1 grid overflow-hidden h-[calc(100vh-105px)] ${
        isEditorFullscreen
          ? 'grid-cols-1'
          : 'grid-cols-1 md:grid-cols-2'
      }`}>
        {/* Left Column (Prompt, Charts, Highlighting, Scratchpad) */}
        {!isEditorFullscreen && (
          <div className="h-full overflow-hidden border-r border-gray-200 dark:border-zinc-800">
            <PromptPane
              prompt={currentPrompt}
              contrastMode={contrastMode}
              fontSize={fontSize}
              scratchpadNotes={currentNotes}
              onScratchpadChange={handleCurrentNotesChange}
              onRandomizePrompt={handleRandomizePrompt}
            />
          </div>
        )}

        {/* Right Column: Inspera Editor with No Spellcheck */}
        <div className="h-full overflow-hidden">
          <EditorPane
            content={currentEssay}
            onChange={handleCurrentEssayChange}
            minWords={currentPrompt.minWords}
            taskTitle={isFullTest ? (activeFullTestPart === 'task1' ? 'Part 1 (Task 1)' : 'Part 2 (Task 2)') : currentPrompt.title}
            contrastMode={contrastMode}
            fontSize={fontSize}
            lastSavedAt={lastSavedAt}
            isFullscreen={isEditorFullscreen}
            onToggleFullscreen={() => setIsEditorFullscreen(!isEditorFullscreen)}
            onFontSizeChange={setFontSize}
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

      {/* Anti-Bot Human Verification Challenge Modal */}
      {showChallengeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-carbon/70 dark:bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="max-w-md w-full bg-paper dark:bg-carbon hairline-border shadow-xl p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 hairline-border bg-paper-subtle dark:bg-carbon-subtle text-vermilion flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 stroke-[1.75]" />
                </div>
                <div>
                  <div className="font-mono text-[11px] tracking-wider text-vermilion uppercase">
                    00 // XÁC THỰC THÍ SINH
                  </div>
                  <h3 className="font-display font-bold text-base text-carbon dark:text-paper leading-snug">
                    Xác nhận nộp bài thi
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowChallengeModal(false)}
                className="text-carbon-muted dark:text-paper-muted hover:text-carbon dark:hover:text-paper p-1 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-paper-subtle dark:bg-carbon-subtle hairline-border p-3.5 text-xs space-y-1.5 font-mono">
              <div className="flex justify-between text-carbon-muted dark:text-paper-muted">
                <span>Chế độ:</span>
                <span className="font-semibold text-carbon dark:text-paper uppercase">
                  {mode.replace('_', ' ')}
                </span>
              </div>
              <div className="flex justify-between text-carbon-muted dark:text-paper-muted">
                <span>Thời gian:</span>
                <span className="font-semibold text-carbon dark:text-paper">
                  {Math.floor((initialSeconds - timeRemaining) / 60)}m {(initialSeconds - timeRemaining) % 60}s
                </span>
              </div>
              <div className="flex justify-between text-carbon-muted dark:text-paper-muted">
                <span>Tổng số từ:</span>
                <span className="font-semibold text-vermilion">
                  {isFullTest
                    ? countWords(task1Essay) + countWords(task2Essay)
                    : countWords(mode === 'task1' ? task1Essay : task2Essay)}{' '}
                  words
                </span>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <label className="block text-xs font-mono text-carbon dark:text-paper uppercase tracking-wider">
                Anti-Bot Verification:{' '}
                <span className="text-vermilion font-bold text-sm ml-1">
                  {challengeProblem.q} = ?
                </span>
              </label>
              <input
                type="number"
                autoFocus
                value={challengeAnswer}
                onChange={(e) => {
                  setChallengeAnswer(e.target.value);
                  setChallengeError('');
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleConfirmHumanChallengeAndSubmit();
                }}
                placeholder="Nhập kết quả số..."
                className="w-full px-3.5 py-2.5 hairline-border bg-paper dark:bg-carbon text-sm font-mono text-carbon dark:text-paper focus:outline-none focus:border-vermilion"
              />
              {challengeError && (
                <p className="text-[11px] text-vermilion font-mono flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  <span>{challengeError}</span>
                </p>
              )}
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowChallengeModal(false)}
                className="flex-1 py-2.5 px-3.5 hairline-border text-xs font-mono tracking-wider uppercase text-carbon-muted dark:text-paper-muted hover:text-carbon dark:hover:text-paper hover:bg-paper-subtle dark:hover:bg-carbon-subtle transition-colors"
              >
                Tiếp tục viết
              </button>
              <button
                type="button"
                onClick={handleConfirmHumanChallengeAndSubmit}
                className="flex-1 py-2.5 px-3.5 hairline-border bg-carbon dark:bg-paper text-paper dark:text-carbon hover:bg-vermilion dark:hover:bg-vermilion dark:hover:text-white text-xs font-mono tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Nộp &amp; Chấm bài</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Grading Progress Modal */}
      <GradingProgressModal isOpen={isSubmitting} isFullTest={isFullTest} />

      {/* Submission / 503 Overload Retry Modal */}
      {submitError && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-carbon/70 dark:bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-paper dark:bg-carbon hairline-border max-w-md w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 hairline-border bg-paper-subtle dark:bg-carbon-subtle text-vermilion flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 stroke-[1.75]" />
              </div>
              <div>
                <h3 className="text-base font-display font-bold text-carbon dark:text-paper">
                  {submitError.is503 ? 'Máy chủ Google AI đang bận (503)' : 'Chưa thể hoàn tất chấm bài'}
                </h3>
                <p className="text-xs font-mono text-vermilion flex items-center gap-1 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Bài làm được bảo lưu trên bộ nhớ tạm
                </p>
              </div>
            </div>

            <p className="text-xs text-carbon-muted dark:text-paper-muted leading-relaxed hairline-border bg-paper-subtle dark:bg-carbon-subtle p-3.5 font-sans">
              {submitError.message}
            </p>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setSubmitError(null)}
                className="px-4 py-2 hairline-border text-xs font-mono tracking-wider uppercase text-carbon-muted dark:text-paper-muted hover:text-carbon dark:hover:text-paper hover:bg-paper-subtle dark:hover:bg-carbon-subtle transition-colors"
              >
                Quay lại bài viết
              </button>
              <button
                type="button"
                onClick={() => {
                  setSubmitError(null);
                  handleSubmit();
                }}
                className="px-5 py-2 hairline-border bg-carbon dark:bg-paper text-paper dark:text-carbon hover:bg-vermilion dark:hover:bg-vermilion dark:hover:text-white text-xs font-mono tracking-wider uppercase transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Thử chấm lại ngay</span>
              </button>
            </div>
          </div>
        </div>
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
