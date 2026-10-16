import { TASK_1_SEEDS, TASK_2_SEEDS, getPromptById } from './data/seed-prompts';
import {
  BuilderBlock,
  BuilderDailyTracker,
  BuilderLevel,
  BuilderNode,
  BuilderState,
  BuilderTargetBand,
  BuilderTreeConfig,
  InteractiveMCQ,
  PromptSeed,
  SentenceInput,
} from '@/types';

const BUILDER_STORAGE_KEY = 'cd_ielts_writing_builder_state_v1';

// ==============================================================================
// 1. LIBRARY STATISTICS & CONFIGURATION
// ==============================================================================

export interface LibraryPromptStats {
  task1Total: number;
  task2Total: number;
  maxLevels: number;
  task1Categories: Record<string, number>;
  task2Categories: Record<string, number>;
}

export function getLibraryPromptStats(): LibraryPromptStats {
  const task1Categories: Record<string, number> = {};
  for (const p of TASK_1_SEEDS) {
    const cat = p.category || 'Other';
    task1Categories[cat] = (task1Categories[cat] || 0) + 1;
  }

  const task2Categories: Record<string, number> = {};
  for (const p of TASK_2_SEEDS) {
    const cat = p.category || 'Other';
    task2Categories[cat] = (task2Categories[cat] || 0) + 1;
  }

  const maxLevels = Math.min(TASK_1_SEEDS.length, TASK_2_SEEDS.length);

  return {
    task1Total: TASK_1_SEEDS.length,
    task2Total: TASK_2_SEEDS.length,
    maxLevels,
    task1Categories,
    task2Categories,
  };
}

export interface PacingSuggestion {
  key: 'gentle' | 'standard' | 'intensive';
  label: string;
  description: string;
  levels: number;
  ratePerDay: string;
}

export function getPacingSuggestions(studyDays: number, maxLevels: number): PacingSuggestion[] {
  const gentleLevels = Math.max(3, Math.min(maxLevels, Math.round(studyDays * 0.5)));
  const standardLevels = Math.max(3, Math.min(maxLevels, Math.round(studyDays * 1.0)));
  const intensiveLevels = Math.max(3, Math.min(maxLevels, Math.round(studyDays * 1.6)));

  return [
    {
      key: 'gentle',
      label: 'Nhẹ nhàng',
      description: 'Phù hợp người bận rộn, rèn phản xạ chắc chắn',
      levels: gentleLevels,
      ratePerDay: `~${(gentleLevels / studyDays).toFixed(1)} tầng/ngày`,
    },
    {
      key: 'standard',
      label: 'Tiêu chuẩn (Khuyên dùng)',
      description: 'Tiến độ lý tưởng để bao phủ trọn bộ kỹ năng',
      levels: standardLevels,
      ratePerDay: `~${(standardLevels / studyDays).toFixed(1)} tầng/ngày`,
    },
    {
      key: 'intensive',
      label: 'Tăng tốc',
      description: 'Luyện thi cấp tốc, tối đa hóa số lượng bài viết',
      levels: intensiveLevels,
      ratePerDay: `~${(intensiveLevels / studyDays).toFixed(1)} tầng/ngày`,
    },
  ];
}

// ==============================================================================
// 2. SMART ROUND-ROBIN PROMPT DISTRIBUTION ALGORITHM
// ==============================================================================

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Distributes prompts evenly across categories using round-robin cycling
 * to ensure maximum diversity across all N levels.
 */
export function selectDistributedPrompts(seeds: PromptSeed[], count: number): PromptSeed[] {
  // Group by category
  const groups: Record<string, PromptSeed[]> = {};
  for (const item of seeds) {
    const cat = item.category || 'General';
    if (!groups[cat]) groups[cat] = [];
    groups[cat].push(item);
  }

  // Shuffle within each group
  const categoryKeys = Object.keys(groups);
  for (const cat of categoryKeys) {
    groups[cat] = shuffleArray(groups[cat]);
  }

  // Shuffle order of categories
  const shuffledCatKeys = shuffleArray(categoryKeys);

  const selected: PromptSeed[] = [];
  const pointers: Record<string, number> = {};
  for (const cat of shuffledCatKeys) pointers[cat] = 0;

  let currentCatIdx = 0;
  let attempts = 0;
  const maxAttempts = count * 10;

  while (selected.length < count && attempts < maxAttempts) {
    attempts++;
    const cat = shuffledCatKeys[currentCatIdx % shuffledCatKeys.length];
    currentCatIdx++;

    const groupList = groups[cat];
    const ptr = pointers[cat];

    if (ptr < groupList.length) {
      selected.push(groupList[ptr]);
      pointers[cat] = ptr + 1;
    } else {
      // If group exhausted, check if any other group has remaining
      const availableCat = shuffledCatKeys.find((c) => pointers[c] < groups[c].length);
      if (availableCat) {
        selected.push(groups[availableCat][pointers[availableCat]]);
        pointers[availableCat]++;
      } else {
        // If all exhausted and we need more, reshuffle and loop
        const fallback = shuffleArray(seeds);
        selected.push(fallback[selected.length % fallback.length]);
      }
    }
  }

  return selected.slice(0, count);
}

// ==============================================================================
// 3. INITIAL BLOCK TEMPLATES FOR GUIDED WRITING
// ==============================================================================

export function createInitialBlocksForTask(taskType: 'task1' | 'task2', promptId: string): BuilderBlock[] {
  if (taskType === 'task1') {
    return [
      {
        id: 'intro',
        title: '1. Introduction (Mở bài)',
        descriptionVi: 'Paraphrase lại đề bài bằng cấu trúc câu và từ đồng nghĩa học thuật (1-2 câu).',
        sentences: [
          {
            id: `${promptId}_intro_1`,
            text: '',
            placeholderHint: 'Câu 1: Paraphrase đề bài (VD: The given line graph illustrates the proportion of...)',
          },
        ],
      },
      {
        id: 'overview',
        title: '2. Overview (Tổng quan)',
        descriptionVi: 'Nêu 1-2 đặc điểm nổi bật nhất (xu hướng chung tăng/giảm hoặc điểm cao nhất/thấp nhất) không dẫn số liệu chi tiết.',
        sentences: [
          {
            id: `${promptId}_over_1`,
            text: '',
            placeholderHint: 'Câu 1: Nêu xu hướng chung nổi bật nhất (VD: Overall, it is evident that...)',
          },
          {
            id: `${promptId}_over_2`,
            text: '',
            placeholderHint: 'Câu 2: Nêu sự so sánh hoặc khác biệt lớn nhất giữa các đối tượng (VD: Additionally, X consistently accounted for the highest...)',
          },
        ],
      },
      {
        id: 'body1',
        title: '3. Body Paragraph 1 (Thân bài 1)',
        descriptionVi: 'Mô tả chi tiết nhóm số liệu đầu tiên (kèm số liệu cụ thể, thời gian và sự so sánh).',
        sentences: [
          {
            id: `${promptId}_b1_1`,
            text: '',
            placeholderHint: 'Câu 1: Giới thiệu nhóm số liệu / điểm khởi đầu (VD: In terms of X, the figure commenced at...)',
          },
          {
            id: `${promptId}_b1_2`,
            text: '',
            placeholderHint: 'Câu 2: Diễn biến tiếp theo hoặc sự so sánh với đối tượng khác (VD: This was followed by a sharp increase to...)',
          },
        ],
      },
      {
        id: 'body2',
        title: '4. Body Paragraph 2 (Thân bài 2)',
        descriptionVi: 'Mô tả chi tiết nhóm số liệu còn lại và các điểm giao nhau/kết thúc.',
        sentences: [
          {
            id: `${promptId}_b2_1`,
            text: '',
            placeholderHint: 'Câu 1: Chuyển ý sang nhóm số liệu thứ hai (VD: Looking at the remaining categories, Y witnessed...)',
          },
          {
            id: `${promptId}_b2_2`,
            text: '',
            placeholderHint: 'Câu 2: Số liệu thời điểm cuối hoặc điểm tương phản nổi bật (VD: By the end of the period, this number had reached...)',
          },
        ],
      },
    ];
  } else {
    // Task 2
    return [
      {
        id: 'intro',
        title: '1. Introduction (Mở bài)',
        descriptionVi: 'Dẫn dắt chủ đề (Background statement) và nêu rõ lập trường / câu luận đề (Thesis statement).',
        sentences: [
          {
            id: `${promptId}_t2_intro_1`,
            text: '',
            placeholderHint: 'Câu 1: Paraphrase chủ đề xã hội được nêu trong đề bài (Background sentence)',
          },
          {
            id: `${promptId}_t2_intro_2`,
            text: '',
            placeholderHint: 'Câu 2: Nêu quan điểm / định hướng bài viết của bạn (Thesis statement)',
          },
        ],
      },
      {
        id: 'body1',
        title: '2. Body Paragraph 1 (Thân bài 1)',
        descriptionVi: 'Phát triển luận điểm thứ nhất (Topic sentence + Giải thích nguyên nhân/hệ quả + Ví dụ minh họa).',
        sentences: [
          {
            id: `${promptId}_t2_b1_1`,
            text: '',
            placeholderHint: 'Câu 1 (Topic Sentence): Nêu luận điểm chính thứ nhất ủng hộ lập trường của bạn',
          },
          {
            id: `${promptId}_t2_b1_2`,
            text: '',
            placeholderHint: 'Câu 2 (Explanation): Đào sâu phân tích lý do tại sao luận điểm này xác đáng',
          },
          {
            id: `${promptId}_t2_b1_3`,
            text: '',
            placeholderHint: 'Câu 3 (Example/Evidence): Đưa ra một ví dụ thực tế hoặc kết quả cụ thể để chứng minh',
          },
        ],
      },
      {
        id: 'body2',
        title: '3. Body Paragraph 2 (Thân bài 2)',
        descriptionVi: 'Phát triển luận điểm thứ hai (hoặc phản biện góc nhìn đối lập + củng cố lại quan điểm của bạn).',
        sentences: [
          {
            id: `${promptId}_t2_b2_1`,
            text: '',
            placeholderHint: 'Câu 1 (Topic Sentence): Nêu luận điểm chính thứ hai (hoặc phân tích khía cạnh thứ hai)',
          },
          {
            id: `${promptId}_t2_b2_2`,
            text: '',
            placeholderHint: 'Câu 2 (Explanation): Mở rộng phân tích cơ chế, tác động sâu xa đến cá nhân hoặc xã hội',
          },
          {
            id: `${promptId}_t2_b2_3`,
            text: '',
            placeholderHint: 'Câu 3 (Example/Mini-conclusion): Đưa ra ví dụ minh chứng hoặc câu chốt khẳng định tác động',
          },
        ],
      },
      {
        id: 'conclusion',
        title: '4. Conclusion (Kết bài)',
        descriptionVi: 'Khẳng định lại lập trường chính và tóm tắt ngắn gọn các ý quan trọng (không đưa thêm ý tưởng mới).',
        sentences: [
          {
            id: `${promptId}_t2_conc_1`,
            text: '',
            placeholderHint: 'Câu 1: Tóm tắt lại 2 luận điểm trọng tâm đã phân tích ở 2 thân bài',
          },
          {
            id: `${promptId}_t2_conc_2`,
            text: '',
            placeholderHint: 'Câu 2: Tái khẳng định lập trường cuối cùng hoặc đưa ra một lời dự đoán/khuyến nghị ngắn gọn',
          },
        ],
      },
    ];
  }
}

// ==============================================================================
// 4. BEANSTALK TREE GENERATION
// ==============================================================================

export function generateBeanstalkTree(
  totalLevels: number,
  targetBand: BuilderTargetBand,
  studyDays: number
): BuilderState {
  const t1Prompts = selectDistributedPrompts(TASK_1_SEEDS, totalLevels);
  const t2Prompts = selectDistributedPrompts(TASK_2_SEEDS, totalLevels);

  const levels: BuilderLevel[] = [];

  for (let i = 0; i < totalLevels; i++) {
    const levelNumber = i + 1;
    // Level 1 starts available; subsequent levels start locked
    const initialStatus = levelNumber === 1 ? 'available' : 'locked';

    const t1Seed = t1Prompts[i];
    const t2Seed = t2Prompts[i];

    const task1Node: BuilderNode = {
      promptId: t1Seed.id,
      taskType: 'task1',
      status: initialStatus,
      blocks: createInitialBlocksForTask('task1', t1Seed.id),
    };

    const task2Node: BuilderNode = {
      promptId: t2Seed.id,
      taskType: 'task2',
      status: initialStatus,
      blocks: createInitialBlocksForTask('task2', t2Seed.id),
    };

    levels.push({
      levelNumber,
      task1Node,
      task2Node,
    });
  }

  const todayStr = new Date().toISOString().slice(0, 10);
  const totalIncompleteNodes = totalLevels * 2;
  const initialTargetToday = Math.max(1, Math.ceil(totalIncompleteNodes / studyDays));

  const config: BuilderTreeConfig = {
    targetBand,
    studyDays,
    totalLevels,
    createdAt: new Date().toISOString(),
  };

  const dailyTracker: BuilderDailyTracker = {
    lastActiveDate: todayStr,
    completedNodesToday: 0,
    targetNodesToday: initialTargetToday,
    studyStreakDays: 1,
  };

  return {
    config,
    levels,
    dailyTracker,
  };
}

// ==============================================================================
// 5. STORAGE & STATE MANAGEMENT
// ==============================================================================

export function loadBuilderState(): BuilderState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(BUILDER_STORAGE_KEY);
    if (!raw) return null;
    const parsed: BuilderState = JSON.parse(raw);

    // Refresh daily tracker if date changed
    const todayStr = new Date().toISOString().slice(0, 10);
    if (parsed.dailyTracker && parsed.dailyTracker.lastActiveDate !== todayStr) {
      const remainingDays = calculateRemainingStudyDays(parsed.config);
      const remainingNodes = countRemainingNodes(parsed.levels);
      const newTarget = remainingDays > 0 ? Math.max(1, Math.ceil(remainingNodes / remainingDays)) : 1;

      // Check streak: was yesterday active?
      const lastDate = new Date(parsed.dailyTracker.lastActiveDate);
      const todayDate = new Date(todayStr);
      const diffDays = Math.round((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));

      let streak = parsed.dailyTracker.studyStreakDays || 1;
      if (diffDays === 1 && parsed.dailyTracker.completedNodesToday > 0) {
        streak += 1;
      } else if (diffDays > 1) {
        streak = 1; // reset streak if missed a full day
      }

      parsed.dailyTracker = {
        lastActiveDate: todayStr,
        completedNodesToday: 0,
        targetNodesToday: newTarget,
        studyStreakDays: streak,
      };

      saveBuilderState(parsed);
    }

    return parsed;
  } catch (err) {
    console.error('Failed to load builder state from localStorage', err);
    return null;
  }
}

export function saveBuilderState(state: BuilderState): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(BUILDER_STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error('Failed to save builder state to localStorage', err);
  }
}

export function resetCurrentTreeState(state: BuilderState): BuilderState {
  const updatedLevels: BuilderLevel[] = state.levels.map((lvl) => ({
    ...lvl,
    task1Node: {
      ...lvl.task1Node,
      status: lvl.levelNumber === 1 ? 'available' : 'locked',
      blocks: createInitialBlocksForTask('task1', lvl.task1Node.promptId),
      completedAt: undefined,
      wordCount: undefined,
      mcqAnswers: undefined,
    },
    task2Node: {
      ...lvl.task2Node,
      status: lvl.levelNumber === 1 ? 'available' : 'locked',
      blocks: createInitialBlocksForTask('task2', lvl.task2Node.promptId),
      completedAt: undefined,
      wordCount: undefined,
      mcqAnswers: undefined,
    },
  }));

  const newState: BuilderState = {
    ...state,
    levels: updatedLevels,
    dailyTracker: {
      ...state.dailyTracker,
      completedNodesToday: 0,
    },
  };

  saveBuilderState(newState);
  return newState;
}

export function deleteBuilderState(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(BUILDER_STORAGE_KEY);
  } catch (err) {
    console.error('Failed to delete builder state', err);
  }
}

export function calculateRemainingStudyDays(config: BuilderTreeConfig | null): number {
  if (!config) return 1;
  const createdDate = new Date(config.createdAt);
  const now = new Date();
  const elapsedDays = Math.floor((now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
  return Math.max(1, config.studyDays - elapsedDays);
}

export function countRemainingNodes(levels: BuilderLevel[]): number {
  let count = 0;
  for (const lvl of levels) {
    if (lvl.task1Node.status !== 'completed') count++;
    if (lvl.task2Node.status !== 'completed') count++;
  }
  return count;
}

export function countCompletedNodes(levels: BuilderLevel[]): number {
  let count = 0;
  for (const lvl of levels) {
    if (lvl.task1Node.status === 'completed') count++;
    if (lvl.task2Node.status === 'completed') count++;
  }
  return count;
}

/**
 * Marks a node as completed, increments daily tracker, and unlocks the next level.
 */
export function completeNodeInState(
  state: BuilderState,
  levelNumber: number,
  taskType: 'task1' | 'task2',
  assembledWordCount: number
): BuilderState {
  const updatedLevels = state.levels.map((lvl) => {
    if (lvl.levelNumber === levelNumber) {
      if (taskType === 'task1') {
        return {
          ...lvl,
          task1Node: {
            ...lvl.task1Node,
            status: 'completed' as const,
            completedAt: new Date().toISOString(),
            wordCount: assembledWordCount,
          },
        };
      } else {
        return {
          ...lvl,
          task2Node: {
            ...lvl.task2Node,
            status: 'completed' as const,
            completedAt: new Date().toISOString(),
            wordCount: assembledWordCount,
          },
        };
      }
    }
    return lvl;
  });

  // Unlock next level if currently completed level has either node completed
  const currentLvl = updatedLevels.find((l) => l.levelNumber === levelNumber);
  if (currentLvl) {
    const nextLvl = updatedLevels.find((l) => l.levelNumber === levelNumber + 1);
    if (nextLvl) {
      // If either task 1 or task 2 is completed on current level, make next level available!
      if (nextLvl.task1Node.status === 'locked') nextLvl.task1Node.status = 'available';
      if (nextLvl.task2Node.status === 'locked') nextLvl.task2Node.status = 'available';
    }
  }

  const newCompletedToday = (state.dailyTracker.completedNodesToday || 0) + 1;
  const remainingDays = calculateRemainingStudyDays(state.config);
  const remainingNodes = countRemainingNodes(updatedLevels);
  const updatedTargetToday = Math.max(1, Math.ceil(remainingNodes / remainingDays));

  const updatedState: BuilderState = {
    ...state,
    levels: updatedLevels,
    dailyTracker: {
      ...state.dailyTracker,
      completedNodesToday: newCompletedToday,
      targetNodesToday: updatedTargetToday,
    },
  };

  saveBuilderState(updatedState);
  return updatedState;
}

// ==============================================================================
// 6. INTERACTIVE MULTIPLE CHOICE QUESTIONS (MCQs) GENERATOR
// ==============================================================================

export function getInteractiveMCQsForPrompt(prompt: PromptSeed, targetBand: BuilderTargetBand): InteractiveMCQ[] {
  if (prompt.taskType === 'task1') {
    const isDynamic = prompt.category.includes('Line') || prompt.category.includes('Bar') || prompt.category.includes('Table');
    const isProcessOrMap = prompt.category.includes('Process') || prompt.category.includes('Map');

    if (isProcessOrMap) {
      return [
        {
          id: 1,
          question: 'Dạng bài này có đặc điểm trọng tâm nào bạn cần xác định ngay từ đầu?',
          purposeVi: 'Phân tích bản chất đề bài (Process / Map)',
          options: [
            {
              text: 'Xác định các giai đoạn tuần tự từ đầu đến cuối (với Process) hoặc các mốc thời gian / địa điểm quy hoạch thay đổi (với Map).',
              isCorrect: true,
              explanationVi: 'Chính xác! Đối với Process và Map, việc nắm được thứ tự các bước hoặc điểm thay đổi trước-sau là chìa khóa then chốt để đạt Band 7.0+ Task Achievement.',
            },
            {
              text: 'Tìm ra số liệu phần trăm cao nhất và thấp nhất.',
              isCorrect: false,
              explanationVi: 'Process và Map thường không chứa các số liệu phần trăm mà chú trọng vào các bước quy trình hoặc sự biến đổi cấu trúc hạ tầng.',
            },
            {
              text: 'Đưa ra ý kiến cá nhân xem quy trình này có hiệu quả hay không.',
              isCorrect: false,
              explanationVi: 'Tuyệt đối không đưa nhận xét chủ quan trong IELTS Task 1; bạn chỉ được miêu tả khách quan những gì biểu thị trên hình.',
            },
          ],
        },
        {
          id: 2,
          question: 'Đoạn Overview cho bài này nên tập trung vào điều gì?',
          purposeVi: 'Chiến thuật viết Overview chuẩn IELTS',
          options: [
            {
              text: 'Nêu tổng số giai đoạn (bắt đầu bằng gì, kết thúc bằng gì) hoặc những thay đổi tổng thể lớn nhất (khu vực mở rộng, hiện đại hóa).',
              isCorrect: true,
              explanationVi: 'Rất chuẩn! Một Overview xuất sắc cho Process cần nêu rõ số bước và điểm đầu/cuối; với Map cần khái quát sự biến đổi lớn nhất.',
            },
            {
              text: 'Liệt kê từng chi tiết nhỏ xuất hiện trên bản đồ hoặc sơ đồ.',
              isCorrect: false,
              explanationVi: 'Overview không được chứa các chi tiết vụn vặt, chỉ nêu bức tranh tổng quan lớn.',
            },
            {
              text: 'Bỏ qua Overview để dành thời gian viết 3 đoạn thân bài.',
              isCorrect: false,
              explanationVi: 'Thiếu Overview sẽ khiến điểm Task Achievement bị khống chế tối đa ở mức Band 5.0 theo quy định chính thức của IELTS!',
            },
          ],
        },
        {
          id: 3,
          question: 'Thì và thể ngữ pháp (Voice & Tense) chủ đạo nên sử dụng là gì?',
          purposeVi: 'Độ chính xác và đa dạng ngữ pháp (Grammatical Range)',
          options: [
            {
              text: 'Thể bị động (Passive Voice) để miêu tả các bước gia công/xây dựng khách quan.',
              isCorrect: true,
              explanationVi: 'Đúng vậy! Bị động là cấu trúc ăn điểm tiêu chuẩn (VD: "is harvested", "are transported", "was demolished and replaced by").',
            },
            {
              text: 'Thì tương lai tiếp diễn và câu điều kiện giả định loại 3.',
              isCorrect: false,
              explanationVi: 'Không cần thiết và dễ gây sai lệch ngữ nghĩa khi mô tả biểu đồ thực tế.',
            },
            {
              text: 'Chỉ dùng thì hiện tại đơn chủ động ngắn.',
              isCorrect: false,
              explanationVi: 'Chỉ dùng chủ động đơn giản sẽ giới hạn điểm Grammatical Range ở mức Band 5.0 - 6.0.',
            },
          ],
        },
      ];
    } else {
      // Standard Charts (Line, Bar, Pie, Table)
      return [
        {
          id: 1,
          question: 'Đâu là cách phân đoạn thân bài (Body 1 & Body 2) hợp lý nhất cho đề bài này?',
          purposeVi: 'Tổ chức Coherence & Cohesion logic',
          options: [
            {
              text: 'Nhóm các đối tượng có xu hướng giống nhau vào Body 1 (ví dụ nhóm cùng tăng), và nhóm còn lại vào Body 2 (cùng giảm/dao động).',
              isCorrect: true,
              explanationVi: 'Rất tốt! Phân nhóm theo tính tương đồng hoặc mốc thời gian giúp người đọc dễ so sánh và đạt điểm Coherence & Cohesion rất cao.',
            },
            {
              text: 'Mỗi năm viết thành một đoạn văn riêng lẻ.',
              isCorrect: false,
              explanationVi: 'Chia đoạn theo từng năm sẽ khiến bài bị vụn vặt, thiếu sự so sánh và mất liên kết logic.',
            },
            {
              text: 'Gộp toàn bộ số liệu vào một đoạn thân bài duy nhất dài 150 từ.',
              isCorrect: false,
              explanationVi: 'Thân bài cần tối thiểu 2 đoạn được phân chia rõ ràng để đảm bảo tiêu chí Paragraphing.',
            },
          ],
        },
        {
          id: 2,
          question: 'Điều nào sau đây là BẮT BUỘC phải có trong phần Overview để đạt Band 7.0+?',
          purposeVi: 'Đáp ứng tiêu chí Task Achievement',
          options: [
            {
              text: 'Xu hướng chung xuyên suốt thời kỳ (tăng/giảm/dao động) và đối tượng dẫn đầu/chiếm ưu thế nhất mà KHÔNG trích dẫn số liệu cụ thể.',
              isCorrect: true,
              explanationVi: 'Chính xác 100%! Overview chuẩn Band 8+ chỉ khái quát các xu hướng chính và hạng mục nổi bật nhất mà không đưa số liệu chi tiết.',
            },
            {
              text: 'Trích dẫn chính xác số liệu của năm đầu tiên và năm cuối cùng.',
              isCorrect: false,
              explanationVi: 'Nếu đưa số liệu cụ thể vào Overview, bạn đang biến nó thành đoạn Body chứ không còn là một Overview thuần túy.',
            },
            {
              text: 'Giải thích nguyên nhân kinh tế xã hội dẫn tới sự thay đổi đó.',
              isCorrect: false,
              explanationVi: 'Nghiêm cấm suy đoán nguyên nhân bên ngoài trong Task 1 (sẽ bị trừ nặng điểm Task Achievement).',
            },
          ],
        },
        {
          id: 3,
          question: 'Cách đưa số liệu và so sánh nào dưới đây được giám khảo đánh giá cao nhất?',
          purposeVi: 'Tối ưu hóa Lexical Resource & Cấu trúc so sánh',
          options: [
            {
              text: 'Sử dụng cấu trúc so sánh gấp đôi, gấp ba hoặc phân số (VD: "doubled", "threefold", "accounted for almost a third").',
              isCorrect: true,
              explanationVi: 'Chính xác! Giám khảo luôn tìm kiếm các cách diễn đạt tỷ lệ và quan hệ tương quan thay vì chỉ chép lại số liệu thô.',
            },
            {
              text: 'Liệt kê lần lượt từng con số theo mẫu câu lặp lại "A was X, B was Y, C was Z".',
              isCorrect: false,
              explanationVi: 'Cách viết này là "mechanical listing", bị giới hạn điểm ở Band 5.0 - 5.5.',
            },
            {
              text: 'Chỉ nêu đối tượng cao nhất và bỏ qua các đối tượng khác.',
              isCorrect: false,
              explanationVi: 'Bỏ sót các đối tượng quan trọng sẽ bị phạt lỗi thiếu Key Features.',
            },
          ],
        },
      ];
    }
  } else {
    // Task 2 MCQs
    return [
      {
        id: 1,
        question: 'Dạng đề bài này thuộc loại nào và đòi hỏi bạn phải giải quyết những gì?',
        purposeVi: 'Phân tích yêu cầu đề bài Task Response',
        options: [
          {
            text: `Đây là dạng bài ${prompt.category || 'Nghị luận'}; bạn cần trả lời trực tiếp toàn bộ các vế câu hỏi của đề bài một cách cân bằng và nhất quán.`,
            isCorrect: true,
            explanationVi: 'Đúng! Việc xác định đúng dạng đề (Opinion, Discussion, Causes/Solutions, Two-part) là bước sống còn để không bị lạc đề hay trả lời thiếu vế.',
          },
          {
            text: 'Chỉ cần chọn một khía cạnh dễ viết nhất và phớt lờ vế còn lại của câu hỏi.',
            isCorrect: false,
            explanationVi: 'Nếu bỏ qua bất kỳ vế nào trong đề bài Task 2, điểm Task Response của bạn sẽ bị chặn trần ở mức Band 5.0!',
          },
          {
            text: 'Viết một bài luận chung chung về chủ đề mà không cần trả lời câu hỏi.',
            isCorrect: false,
            explanationVi: 'Lạc đề hoàn toàn sẽ bị chấm điểm dưới Band 5.0.',
          },
        ],
      },
      {
        id: 2,
        question: `Để đạt mục tiêu Band ${targetBand}, câu Thesis Statement ở mở bài cần thể hiện như thế nào?`,
        purposeVi: 'Xây dựng Thesis Statement chuẩn xác',
        options: [
          {
            text: 'Nêu rõ ràng lập trường / luận điểm xuyên suốt của bạn ngay từ mở bài (clear position throughout the response).',
            isCorrect: true,
            explanationVi: 'Chính xác! IELTS Band 7.0+ Descriptors yêu cầu: "presents a clear position throughout the response". Không được giấu quan điểm đến kết bài mới nói.',
          },
          {
            text: 'Viết mập mờ "vấn đề này có nhiều ưu và nhược điểm mà tôi sẽ phân tích ở dưới".',
            isCorrect: false,
            explanationVi: 'Câu mở bài này là câu rập khuôn (formulaic template) khiến giám khảo đánh giá thấp năng lực tư duy phản biện.',
          },
          {
            text: 'Không cần nêu quan điểm, chỉ cần lặp lại nguyên văn câu hỏi của đề bài.',
            isCorrect: false,
            explanationVi: 'Sao chép nguyên văn sẽ bị gạch bỏ và không tính vào số từ hợp lệ.',
          },
        ],
      },
      {
        id: 3,
        question: 'Cấu trúc phát triển một đoạn thân bài (PEEL Method) chặt chẽ nhất là gì?',
        purposeVi: 'Phát triển luận điểm sâu sắc & Logic',
        options: [
          {
            text: 'Topic Sentence (Câu chủ đề) ➔ Explanation (Giải thích cơ chế) ➔ Example (Ví dụ thực tiễn) ➔ Link/Impact (Kết luận tác động).',
            isCorrect: true,
            explanationVi: 'Hoàn hảo! Phương pháp PEEL đảm bảo mỗi luận điểm đều được mổ xẻ có chiều sâu, tránh liệt kê hời hợt, đạt điểm cao cho Task Response.',
          },
          {
            text: 'Liệt kê 4-5 lý do ngắn gọn dưới dạng gạch đầu dòng hoặc câu đơn.',
            isCorrect: false,
            explanationVi: 'Liệt kê ý mà không giải thích sâu là lỗi điển hình của các bài viết Band 5.0 - 5.5.',
          },
          {
            text: 'Chỉ kể một câu chuyện cá nhân dài từ đầu đến cuối đoạn.',
            isCorrect: false,
            explanationVi: 'Task 2 là văn nghị luận học thuật (academic essay), không phải tự truyện cá nhân.',
          },
        ],
      },
    ];
  }
}

export function assembleFullEssayFromBlocks(blocks: BuilderBlock[]): { text: string; wordCount: number } {
  const paragraphs: string[] = [];

  for (const block of blocks) {
    const validSentences = block.sentences
      .map((s) => s.text.trim())
      .filter((t) => t.length > 0);

    if (validSentences.length > 0) {
      paragraphs.push(validSentences.join(' '));
    }
  }

  const fullText = paragraphs.join('\n\n');
  const words = fullText.trim().split(/\s+/).filter(Boolean);
  return {
    text: fullText,
    wordCount: words.length,
  };
}
