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
  GradingResult,
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

// ==============================================================================
// 3. AI-TAILORED BLOCK & SENTENCE GENERATOR PER PROMPT
// ==============================================================================

/**
 * Extracts distinct bullet points or clauses from prompt outline notes
 */
function extractOutlineGuidancePoints(outlineText?: string, maxPoints: number = 3): string[] {
  if (!outlineText) return [];
  // Split on '.', '->', ';', or ':'
  const rawParts = outlineText
    .split(/(?:\.\s+|->|;)/)
    .map((s) => s.trim().replace(/^[\-\*\d\.\s]+/, ''))
    .filter((s) => s.length > 5);

  if (rawParts.length === 0) {
    return [outlineText.trim()];
  }
  return rawParts.slice(0, maxPoints);
}

/**
 * AI-tailored block and sentence generator:
 * Analyzes the prompt's specific category, topic, question, chart details, and outline
 * to determine the optimal number of sentences and write targeted prompts for each sentence.
 */
export function generateTailoredBlocksForPrompt(prompt: PromptSeed): BuilderBlock[] {
  const isTask1 = prompt.taskType === 'task1';
  const promptId = prompt.id;
  const category = prompt.category || (isTask1 ? 'Line Graph' : 'Opinion');

  if (isTask1) {
    // TASK 1: Introduction (1-2 sentences), Overview (2 sentences), Body 1 (2-4 sentences), Body 2 (2-4 sentences)
    const b1Points = extractOutlineGuidancePoints(prompt.outline?.body1, 3);
    const b2Points = extractOutlineGuidancePoints(prompt.outline?.body2, 3);
    const overviewPoints = extractOutlineGuidancePoints(prompt.outline?.overviewOrThesis, 2);

    // 1. Introduction: 1 sentence for single chart, 2 for complex/multi-chart
    const isMultiChart = category.toLowerCase().includes('mixed') || category.toLowerCase().includes('table');
    const introSentences: SentenceInput[] = [
      {
        id: `${promptId}_intro_1`,
        text: '',
        placeholderHint: `Câu 1 (Paraphrase đề bài): Paraphrase lại chủ đề và mốc thời gian của biểu đồ: "${prompt.question || prompt.title}"`,
      },
    ];
    if (isMultiChart) {
      introSentences.push({
        id: `${promptId}_intro_2`,
        text: '',
        placeholderHint: 'Câu 2 (Đơn vị & Đối tượng): Nêu rõ các đơn vị đo lường và phạm vi các đối tượng khảo sát chính',
      });
    }

    // 2. Overview: 2 sentences
    const overviewSentences: SentenceInput[] = [
      {
        id: `${promptId}_over_1`,
        text: '',
        placeholderHint: overviewPoints[0]
          ? `Câu 1 (Xu hướng bao quát): ${overviewPoints[0]}`
          : 'Câu 1 (Xu hướng bao quát): Nêu đặc điểm / xu hướng tổng thể nổi bật nhất (Overall, it is evident that...)',
      },
      {
        id: `${promptId}_over_2`,
        text: '',
        placeholderHint: overviewPoints[1]
          ? `Câu 2 (So sánh nổi bật): ${overviewPoints[1]}`
          : 'Câu 2 (So sánh nổi bật): Nêu điểm cao nhất/thấp nhất hoặc sự phân hóa lớn nhất giữa các đối tượng (Additionally, ...)',
      },
    ];

    // 3. Body 1: Tailored to prompt.outline.body1
    const b1Sentences: SentenceInput[] = [];
    if (b1Points.length >= 3) {
      b1Sentences.push(
        {
          id: `${promptId}_b1_1`,
          text: '',
          placeholderHint: `Câu 1 (Topic & Điểm xuất phát): ${b1Points[0]}`,
        },
        {
          id: `${promptId}_b1_2`,
          text: '',
          placeholderHint: `Câu 2 (Diễn biến chi tiết / Điểm nhấn): ${b1Points[1]}`,
        },
        {
          id: `${promptId}_b1_3`,
          text: '',
          placeholderHint: `Câu 3 (So sánh then chốt / Điểm kết): ${b1Points[2]}`,
        }
      );
    } else if (b1Points.length === 2) {
      b1Sentences.push(
        {
          id: `${promptId}_b1_1`,
          text: '',
          placeholderHint: `Câu 1 (Mô tả nhóm số liệu 1): ${b1Points[0]}`,
        },
        {
          id: `${promptId}_b1_2`,
          text: '',
          placeholderHint: `Câu 2 (Diễn biến và so sánh chi tiết): ${b1Points[1]}`,
        }
      );
    } else {
      b1Sentences.push(
        {
          id: `${promptId}_b1_1`,
          text: '',
          placeholderHint: `Câu 1 (Topic sentence nhóm 1): Báo cáo điểm khởi đầu hoặc nhóm số liệu đầu tiên`,
        },
        {
          id: `${promptId}_b1_2`,
          text: '',
          placeholderHint: `Câu 2 (Chi tiết biến động): Nêu đỉnh điểm, mức sụt giảm hoặc sự thay đổi quan trọng`,
        },
        {
          id: `${promptId}_b1_3`,
          text: '',
          placeholderHint: `Câu 3 (So sánh đối chiếu): Đối chiếu số liệu với thời điểm cuối hoặc đối tượng liên quan`,
        }
      );
    }

    // 4. Body 2: Tailored to prompt.outline.body2
    const b2Sentences: SentenceInput[] = [];
    if (b2Points.length >= 3) {
      b2Sentences.push(
        {
          id: `${promptId}_b2_1`,
          text: '',
          placeholderHint: `Câu 1 (Chuyển ý & Nhóm 2): ${b2Points[0]}`,
        },
        {
          id: `${promptId}_b2_2`,
          text: '',
          placeholderHint: `Câu 2 (Chi tiết đối lập / Biến động): ${b2Points[1]}`,
        },
        {
          id: `${promptId}_b2_3`,
          text: '',
          placeholderHint: `Câu 3 (Số liệu kết thúc & So sánh tổng): ${b2Points[2]}`,
        }
      );
    } else if (b2Points.length === 2) {
      b2Sentences.push(
        {
          id: `${promptId}_b2_1`,
          text: '',
          placeholderHint: `Câu 1 (Chuyển sang nhóm số liệu 2): ${b2Points[0]}`,
        },
        {
          id: `${promptId}_b2_2`,
          text: '',
          placeholderHint: `Câu 2 (Số liệu chi tiết và đối chiếu kết thúc): ${b2Points[1]}`,
        }
      );
    } else {
      b2Sentences.push(
        {
          id: `${promptId}_b2_1`,
          text: '',
          placeholderHint: `Câu 1 (Chuyển ý sang nhóm 2): Mô tả nhóm dữ liệu hoặc giai đoạn thứ hai`,
        },
        {
          id: `${promptId}_b2_2`,
          text: '',
          placeholderHint: `Câu 2 (Số liệu chi tiết): Báo cáo các mốc số liệu cụ thể và sự tăng/giảm`,
        },
        {
          id: `${promptId}_b2_3`,
          text: '',
          placeholderHint: `Câu 3 (Kết luận so sánh): So sánh tổng tương quan giữa nhóm 2 và nhóm 1`,
        }
      );
    }

    return [
      {
        id: 'intro',
        title: '1. Introduction (Mở bài)',
        descriptionVi: 'Paraphrase lại đề bài bằng cấu trúc câu và từ vựng học thuật.',
        sentences: introSentences,
      },
      {
        id: 'overview',
        title: '2. Overview (Tổng quan)',
        descriptionVi: 'Nêu các xu hướng bao quát và điểm nổi bật nhất không dẫn số liệu cụ thể.',
        sentences: overviewSentences,
      },
      {
        id: 'body1',
        title: '3. Body Paragraph 1 (Thân bài 1)',
        descriptionVi: 'Mô tả chi tiết nhóm số liệu đầu tiên (kèm số liệu mốc, đỉnh, đáy và sự so sánh).',
        sentences: b1Sentences,
      },
      {
        id: 'body2',
        title: '4. Body Paragraph 2 (Thân bài 2)',
        descriptionVi: 'Mô tả chi tiết nhóm số liệu còn lại và đối chiếu với nhóm đầu tiên.',
        sentences: b2Sentences,
      },
    ];
  } else {
    // TASK 2: Introduction (2 sentences), Body 1 (3-4 sentences), Body 2 (3-4 sentences), Conclusion (2 sentences)
    const b1Points = extractOutlineGuidancePoints(prompt.outline?.body1, 3);
    const b2Points = extractOutlineGuidancePoints(prompt.outline?.body2, 3);
    const thesisText = prompt.outline?.overviewOrThesis || '';
    const conclusionText = prompt.outline?.conclusion || '';

    // 1. Introduction: 2 sentences (Hook/Background + Direct Thesis)
    const introSentences: SentenceInput[] = [
      {
        id: `${promptId}_t2_intro_1`,
        text: '',
        placeholderHint: `Câu 1 (Background): Dẫn dắt chủ đề xã hội và paraphrase đề bài: "${prompt.question}"`,
      },
      {
        id: `${promptId}_t2_intro_2`,
        text: '',
        placeholderHint: thesisText
          ? `Câu 2 (Thesis Statement): Khẳng định lập trường của bạn: ${thesisText}`
          : 'Câu 2 (Thesis Statement): Trả lời trực tiếp câu hỏi đề bài và nêu phương hướng nghị luận chính của bạn',
      },
    ];

    // 2. Body 1: Tailored to category & prompt.outline.body1
    const b1Sentences: SentenceInput[] = [];
    const b1Main = b1Points[0] || 'Nêu luận điểm chính thứ nhất ủng hộ lập trường của bạn';
    const b1Detail = b1Points[1] || 'Phân tích sâu nguyên nhân, cơ chế hoặc logic tại sao luận điểm này xác đáng';
    const b1Example = b1Points[2] || 'Đưa ra ví dụ thực tế hoặc bằng chứng cụ thể minh chứng cho luận điểm này';

    b1Sentences.push(
      {
        id: `${promptId}_t2_b1_1`,
        text: '',
        placeholderHint: `Câu 1 (Topic Sentence): ${b1Main}`,
      },
      {
        id: `${promptId}_t2_b1_2`,
        text: '',
        placeholderHint: `Câu 2 (Explanation): ${b1Detail}`,
      },
      {
        id: `${promptId}_t2_b1_3`,
        text: '',
        placeholderHint: `Câu 3 (Example/Evidence): ${b1Example}`,
      }
    );

    // If Discuss Both Views or 4 points available, add impact/evaluation sentence
    if (category.toLowerCase().includes('discuss') || b1Points.length >= 4) {
      b1Sentences.push({
        id: `${promptId}_t2_b1_4`,
        text: '',
        placeholderHint: b1Points[3]
          ? `Câu 4 (Evaluation/Mini-conclusion): ${b1Points[3]}`
          : 'Câu 4 (Mini-conclusion): Đánh giá sức nặng hoặc tính xác đáng của góc nhìn trên',
      });
    }

    // 3. Body 2: Tailored to category & prompt.outline.body2
    const b2Sentences: SentenceInput[] = [];
    const b2Main = b2Points[0] || 'Nêu luận điểm chính thứ hai (hoặc phân tích góc nhìn ưu tiên của bạn)';
    const b2Detail = b2Points[1] || 'Đào sâu phân tích tác động dài hạn, cơ chế hoặc giải pháp cụ thể';
    const b2Example = b2Points[2] || 'Dẫn chứng thực tiễn hoặc chính sách điển hình chứng minh';

    b2Sentences.push(
      {
        id: `${promptId}_t2_b2_1`,
        text: '',
        placeholderHint: `Câu 1 (Topic Sentence): ${b2Main}`,
      },
      {
        id: `${promptId}_t2_b2_2`,
        text: '',
        placeholderHint: `Câu 2 (Explanation/Solution): ${b2Detail}`,
      },
      {
        id: `${promptId}_t2_b2_3`,
        text: '',
        placeholderHint: `Câu 3 (Example/Impact): ${b2Example}`,
      }
    );

    // If Problem & Solution or Discuss Both Views, add expected outcome/affirmation
    if (category.toLowerCase().includes('discuss') || category.toLowerCase().includes('problem') || b2Points.length >= 4) {
      b2Sentences.push({
        id: `${promptId}_t2_b2_4`,
        text: '',
        placeholderHint: b2Points[3]
          ? `Câu 4 (Outcome/Affirmation): ${b2Points[3]}`
          : 'Câu 4 (Affirmation): Khẳng định lại giá trị vượt trội hoặc kết quả kỳ vọng đạt được',
      });
    }

    // 4. Conclusion: 2 sentences
    const concSentences: SentenceInput[] = [
      {
        id: `${promptId}_t2_conc_1`,
        text: '',
        placeholderHint: conclusionText
          ? `Câu 1 (Restatement): ${conclusionText}`
          : 'Câu 1 (Restatement): Khẳng định lại lập trường chính và tóm tắt ngắn gọn 2 luận điểm trọng tâm',
      },
      {
        id: `${promptId}_t2_conc_2`,
        text: '',
        placeholderHint: 'Câu 2 (Final Outlook): Đưa ra một dự đoán tương lai, khuyến nghị hành động hoặc thông điệp đúc kết sâu sắc',
      },
    ];

    return [
      {
        id: 'intro',
        title: '1. Introduction (Mở bài)',
        descriptionVi: 'Dẫn dắt chủ đề (Background) và khẳng định rõ lập trường / câu luận đề (Thesis statement).',
        sentences: introSentences,
      },
      {
        id: 'body1',
        title: '2. Body Paragraph 1 (Thân bài 1)',
        descriptionVi: 'Phát triển luận điểm thứ nhất (Topic sentence + Phân tích cơ chế + Dẫn chứng thực tế).',
        sentences: b1Sentences,
      },
      {
        id: 'body2',
        title: '3. Body Paragraph 2 (Thân bài 2)',
        descriptionVi: 'Phát triển luận điểm thứ hai (Topic sentence + Mở rộng phân tích + Khẳng định tác động).',
        sentences: b2Sentences,
      },
      {
        id: 'conclusion',
        title: '4. Conclusion (Kết bài)',
        descriptionVi: 'Khẳng định lại lập trường và đúc kết thông điệp tương lai (không thêm ý tưởng mới).',
        sentences: concSentences,
      },
    ];
  }
}

export function createInitialBlocksForTask(taskType: 'task1' | 'task2', promptId: string): BuilderBlock[] {
  const prompt = getPromptById(promptId);
  if (prompt) {
    return generateTailoredBlocksForPrompt(prompt);
  }

  // Fallback if prompt not found
  return [
    {
      id: 'intro',
      title: '1. Introduction (Mở bài)',
      descriptionVi: 'Paraphrase lại đề bài bằng cấu trúc câu và từ đồng nghĩa học thuật.',
      sentences: [
        {
          id: `${promptId}_intro_1`,
          text: '',
          placeholderHint: 'Câu 1: Paraphrase đề bài bằng từ đồng nghĩa học thuật',
        },
      ],
    },
    {
      id: taskType === 'task1' ? 'overview' : 'body1',
      title: taskType === 'task1' ? '2. Overview (Tổng quan)' : '2. Body Paragraph 1 (Thân bài 1)',
      descriptionVi: 'Phân tích các luận điểm hoặc đặc điểm tổng thể.',
      sentences: [
        {
          id: `${promptId}_b1_1`,
          text: '',
          placeholderHint: 'Câu 1: Luận điểm chính hoặc xu hướng nổi bật',
        },
        {
          id: `${promptId}_b1_2`,
          text: '',
          placeholderHint: 'Câu 2: Phân tích chi tiết và dẫn chứng minh họa',
        },
      ],
    },
    {
      id: taskType === 'task1' ? 'body1' : 'body2',
      title: taskType === 'task1' ? '3. Body Paragraph 1 (Thân bài 1)' : '3. Body Paragraph 2 (Thân bài 2)',
      descriptionVi: 'Mô tả chi tiết nhóm số liệu hoặc luận điểm kế tiếp.',
      sentences: [
        {
          id: `${promptId}_b2_1`,
          text: '',
          placeholderHint: 'Câu 1: Luận điểm thứ hai hoặc nhóm số liệu tiếp theo',
        },
        {
          id: `${promptId}_b2_2`,
          text: '',
          placeholderHint: 'Câu 2: Dữ liệu chi tiết hoặc đối chiếu so sánh',
        },
      ],
    },
    {
      id: taskType === 'task1' ? 'body2' : 'conclusion',
      title: taskType === 'task1' ? '4. Body Paragraph 2 (Thân bài 2)' : '4. Conclusion (Kết bài)',
      descriptionVi: 'Hoàn thiện đoạn thân bài còn lại hoặc đúc kết toàn bài.',
      sentences: [
        {
          id: `${promptId}_end_1`,
          text: '',
          placeholderHint: 'Câu 1: Khẳng định lại luận điểm hoặc số liệu chốt cuối',
        },
        {
          id: `${promptId}_end_2`,
          text: '',
          placeholderHint: 'Câu 2: Đưa ra nhận định hoặc thông điệp kết luận',
        },
      ],
    },
  ];
}

// ==============================================================================
// 4. BEANSTALK TREE GENERATION WITH WEAKNESS TARGETING
// ==============================================================================

export interface BeanstalkWeaknessOptions {
  weaknessPrompt?: string;
  targetedWeaknesses?: string[];
  coachAdvice?: string;
  customTask1Ids?: string[];
  customTask2Ids?: string[];
}

export function selectPromptsWithWeaknessPriority(
  seeds: PromptSeed[],
  count: number,
  taskType: 'task1' | 'task2',
  options?: BeanstalkWeaknessOptions
): { prompt: PromptSeed; isTargetWeakness: boolean; weaknessReason?: string }[] {
  const targetedWeaknesses = options?.targetedWeaknesses || [];
  const weaknessPrompt = (options?.weaknessPrompt || '').trim().toLowerCase();
  const customIds = taskType === 'task1' ? options?.customTask1Ids : options?.customTask2Ids;

  const hasAnyFilter =
    targetedWeaknesses.length > 0 || weaknessPrompt.length > 0 || (customIds && customIds.length > 0);

  if (!hasAnyFilter) {
    const regular = selectDistributedPrompts(seeds, count);
    return regular.map((p) => ({ prompt: p, isTargetWeakness: false }));
  }

  const categoryKeywordsMap: Record<string, string[]> = {
    'Map': ['map', 'bản đồ', 'quy hoạch', 'village', 'town', 'layout', 'renovation', 'plan'],
    'Process': ['process', 'quy trình', 'chu trình', 'sản xuất', 'stage', 'production', 'cycle', 'manufacturing'],
    'Bar Chart': ['bar', 'cột', 'bar chart', 'biểu đồ cột'],
    'Line Graph': ['line', 'đường', 'line graph', 'xu hướng', 'trend'],
    'Pie Chart': ['pie', 'tròn', 'tỷ trọng', 'proportion', 'percentage'],
    'Table Chart': ['table', 'bảng', 'số liệu'],
    'Discuss Both Views': ['discuss', 'thảo luận', 'hai quan điểm', 'both views', 'cả hai'],
    'Opinion': ['opinion', 'quan điểm', 'đồng tình', 'agree', 'disagree', 'phản đối'],
    'Causes and Solutions': ['cause', 'solution', 'nguyên nhân', 'giải pháp', 'hậu quả', 'problem'],
    'Two-part': ['two-part', 'hai câu hỏi', '2 câu hỏi', '2 phần'],
    'Advantages': ['advantage', 'disadvantage', 'lợi ích', 'tác hại', 'mặt tốt', 'mặt xấu'],
  };

  const topicKeywords: { tag: string; keywords: string[] }[] = [
    { tag: 'Môi trường', keywords: ['môi trường', 'environment', 'khí hậu', 'climate', 'pollution', 'rác thải', 'plastic', 'năng lượng', 'energy'] },
    { tag: 'Công nghệ & AI', keywords: ['công nghệ', 'technology', 'ai', 'trí tuệ nhân tạo', 'internet', 'social media', 'smartphone', 'máy tính', 'robot'] },
    { tag: 'Giáo dục', keywords: ['giáo dục', 'education', 'trường học', 'school', 'university', 'sinh viên', 'student', 'trẻ em', 'children'] },
    { tag: 'Xã hội & Đời sống', keywords: ['xã hội', 'society', 'gia đình', 'family', 'người già', 'elderly', 'lifestyle', 'thành phố', 'city'] },
    { tag: 'Sức khỏe & Y tế', keywords: ['sức khỏe', 'health', 'y tế', 'bệnh', 'diet', 'thực phẩm', 'food', 'nutrition'] },
    { tag: 'Tội phạm & Luật pháp', keywords: ['tội phạm', 'crime', 'luật', 'law', 'police', 'prison', 'tù'] },
    { tag: 'Việc làm & Kinh tế', keywords: ['việc làm', 'work', 'job', 'kinh tế', 'economy', 'lương', 'salary', 'career'] },
  ];

  const scoredSeeds = seeds.map((seed) => {
    let score = 0;
    const reasons: string[] = [];
    const seedCat = (seed.category || '').toLowerCase();
    const seedTitle = (seed.title || '').toLowerCase();
    const seedQuestion = (seed.question || '').toLowerCase();
    const seedContent = `${seedCat} ${seedTitle} ${seedQuestion}`;

    if (customIds && customIds.includes(seed.id)) {
      score += 300;
      reasons.push('Đề xuất trọng tâm từ AI');
    }

    for (const tag of targetedWeaknesses) {
      const lowerTag = tag.toLowerCase();
      if (seedCat.includes(lowerTag) || lowerTag.includes(seedCat)) {
        score += 150;
        reasons.push(`Dạng bài: ${seed.category}`);
      }
      for (const [catKey, keywords] of Object.entries(categoryKeywordsMap)) {
        if (lowerTag.includes(catKey.toLowerCase()) || lowerTag.includes(keywords[0])) {
          if (keywords.some((kw) => seedCat.includes(kw) || seedContent.includes(kw))) {
            score += 120;
            reasons.push(`Dạng bài: ${catKey}`);
          }
        }
      }
      for (const topic of topicKeywords) {
        if (lowerTag.includes(topic.tag.toLowerCase())) {
          if (topic.keywords.some((kw) => seedContent.includes(kw))) {
            score += 100;
            reasons.push(`Chủ đề: ${topic.tag}`);
          }
        }
      }
    }

    if (weaknessPrompt) {
      for (const [catKey, keywords] of Object.entries(categoryKeywordsMap)) {
        const matchesPrompt = keywords.some((kw) => weaknessPrompt.includes(kw));
        const matchesSeed = keywords.some((kw) => seedCat.includes(kw) || seedContent.includes(kw));
        if (matchesPrompt && matchesSeed) {
          score += 120;
          reasons.push(`Khắc phục dạng: ${catKey}`);
        }
      }

      for (const topic of topicKeywords) {
        const matchesPrompt = topic.keywords.some((kw) => weaknessPrompt.includes(kw));
        const matchesSeed = topic.keywords.some((kw) => seedContent.includes(kw));
        if (matchesPrompt && matchesSeed) {
          score += 90;
          reasons.push(`Chủ đề rèn luyện: ${topic.tag}`);
        }
      }
    }

    const uniqueReasons = Array.from(new Set(reasons));
    const reasonText = uniqueReasons.length > 0 ? uniqueReasons.slice(0, 2).join(' • ') : undefined;

    return {
      seed,
      score,
      isTargetWeakness: score > 0,
      weaknessReason: reasonText,
    };
  });

  const targeted = scoredSeeds.filter((s) => s.score > 0).sort((a, b) => b.score - a.score);
  const remaining = scoredSeeds.filter((s) => s.score === 0);

  const maxTargetedToTake = Math.min(targeted.length, Math.max(1, Math.round(count * 0.75)));
  const chosenTargeted = targeted.slice(0, maxTargetedToTake);
  const remainingNeeded = count - chosenTargeted.length;

  let chosenRemaining: PromptSeed[] = [];
  if (remainingNeeded > 0) {
    const leftoverSeeds = [
      ...targeted.slice(maxTargetedToTake).map((t) => t.seed),
      ...remaining.map((r) => r.seed),
    ];
    chosenRemaining = selectDistributedPrompts(leftoverSeeds, remainingNeeded);
  }

  const result: { prompt: PromptSeed; isTargetWeakness: boolean; weaknessReason?: string }[] = [];
  let tIdx = 0;
  let rIdx = 0;

  for (let i = 0; i < count; i++) {
    if (tIdx < chosenTargeted.length && (i % 2 === 0 || rIdx >= chosenRemaining.length)) {
      const item = chosenTargeted[tIdx++];
      result.push({
        prompt: item.seed,
        isTargetWeakness: true,
        weaknessReason: item.weaknessReason,
      });
    } else if (rIdx < chosenRemaining.length) {
      result.push({
        prompt: chosenRemaining[rIdx++],
        isTargetWeakness: false,
      });
    } else if (tIdx < chosenTargeted.length) {
      const item = chosenTargeted[tIdx++];
      result.push({
        prompt: item.seed,
        isTargetWeakness: true,
        weaknessReason: item.weaknessReason,
      });
    }
  }

  return result;
}

export function generateBeanstalkTree(
  totalLevels: number,
  targetBand: BuilderTargetBand,
  studyDays: number,
  weaknessOptions?: BeanstalkWeaknessOptions
): BuilderState {
  let t1Pool = [...TASK_1_SEEDS];
  let t2Pool = [...TASK_2_SEEDS];

  if (typeof window !== 'undefined') {
    try {
      const keys = Object.keys(localStorage).filter((k) => k.startsWith('cd_ielts_custom_prompts_'));
      for (const k of keys) {
        const raw = localStorage.getItem(k);
        if (raw) {
          const list = JSON.parse(raw);
          if (Array.isArray(list)) {
            for (const item of list) {
              if (item.taskType === 'task1') t1Pool.push(item);
              else if (item.taskType === 'task2') t2Pool.push(item);
            }
          }
        }
      }
    } catch {}
  }

  const t1Selection = selectPromptsWithWeaknessPriority(t1Pool, totalLevels, 'task1', weaknessOptions);
  const t2Selection = selectPromptsWithWeaknessPriority(t2Pool, totalLevels, 'task2', weaknessOptions);

  const levels: BuilderLevel[] = [];

  for (let i = 0; i < totalLevels; i++) {
    const levelNumber = i + 1;
    const initialStatus = levelNumber === 1 ? 'available' : 'locked';

    const t1Item = t1Selection[i] || { prompt: t1Pool[0], isTargetWeakness: false };
    const t2Item = t2Selection[i] || { prompt: t2Pool[0], isTargetWeakness: false };

    const task1Node: BuilderNode = {
      promptId: t1Item.prompt.id,
      taskType: 'task1',
      status: initialStatus,
      blocks: createInitialBlocksForTask('task1', t1Item.prompt.id),
      isTargetWeakness: t1Item.isTargetWeakness,
      weaknessReason: t1Item.weaknessReason,
    };

    const task2Node: BuilderNode = {
      promptId: t2Item.prompt.id,
      taskType: 'task2',
      status: initialStatus,
      blocks: createInitialBlocksForTask('task2', t2Item.prompt.id),
      isTargetWeakness: t2Item.isTargetWeakness,
      weaknessReason: t2Item.weaknessReason,
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
    weaknessPrompt: weaknessOptions?.weaknessPrompt,
    targetedWeaknesses: weaknessOptions?.targetedWeaknesses,
    coachAdvice: weaknessOptions?.coachAdvice,
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

    // Upgrade any unwritten nodes to the new AI-tailored block structure
    let hasUpgrades = false;
    if (parsed.levels && parsed.levels.length > 0) {
      parsed.levels = parsed.levels.map((lvl: BuilderLevel) => {
        let t1Node = lvl.task1Node;
        let t2Node = lvl.task2Node;

        const isT1Unwritten =
          t1Node.status !== 'completed' &&
          t1Node.blocks.every((b) => b.sentences.every((s) => !s.text || s.text.trim() === ''));
        if (isT1Unwritten) {
          const p1 = getPromptById(t1Node.promptId);
          if (p1) {
            t1Node = {
              ...t1Node,
              blocks: generateTailoredBlocksForPrompt(p1),
            };
            hasUpgrades = true;
          }
        }

        const isT2Unwritten =
          t2Node.status !== 'completed' &&
          t2Node.blocks.every((b) => b.sentences.every((s) => !s.text || s.text.trim() === ''));
        if (isT2Unwritten) {
          const p2 = getPromptById(t2Node.promptId);
          if (p2) {
            t2Node = {
              ...t2Node,
              blocks: generateTailoredBlocksForPrompt(p2),
            };
            hasUpgrades = true;
          }
        }

        return {
          ...lvl,
          task1Node: t1Node,
          task2Node: t2Node,
        };
      });

      if (hasUpgrades) {
        saveBuilderState(parsed);
      }
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
  assembledWordCount: number,
  gradingResult?: GradingResult,
  recordId?: string
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
            gradingResult: gradingResult || lvl.task1Node.gradingResult,
            recordId: recordId || lvl.task1Node.recordId,
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
            gradingResult: gradingResult || lvl.task2Node.gradingResult,
            recordId: recordId || lvl.task2Node.recordId,
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

function deterministicShuffle<T>(array: T[], seedStr: string): T[] {
  let hash = 0;
  for (let i = 0; i < seedStr.length; i++) {
    hash = (hash << 5) - hash + seedStr.charCodeAt(i);
    hash |= 0;
  }
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    hash = (hash * 9301 + 49297) % 233280;
    const rnd = Math.abs(hash) / 233280;
    const j = Math.floor(rnd * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function getInteractiveMCQsForPrompt(prompt: PromptSeed, targetBand: BuilderTargetBand): InteractiveMCQ[] {
  let rawQuestions: InteractiveMCQ[] = [];
  if (prompt.taskType === 'task1') {
    const isDynamic = prompt.category.includes('Line') || prompt.category.includes('Bar') || prompt.category.includes('Table');
    const isProcessOrMap = prompt.category.includes('Process') || prompt.category.includes('Map');

    if (isProcessOrMap) {
      rawQuestions = [
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
      rawQuestions = [
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
    rawQuestions = [
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
            text: 'Topic Sentence (Câu chủ đề) -> Explanation (Giải thích cơ chế) -> Example (Ví dụ thực tiễn) -> Link/Impact (Kết luận tác động).',
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

  // Shuffle options deterministically based on prompt.id and question id so correct answer is randomized across A, B, C!
  return rawQuestions.map((q) => ({
    ...q,
    options: deterministicShuffle(q.options, `${prompt.id}_mcq_${q.id}`),
  }));
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

const BUILDER_AUTO_SUGGEST_KEY = 'cd_ielts_builder_auto_suggest';

export function getBuilderAutoSuggest(): boolean {
  if (typeof window === 'undefined') return true;
  try {
    const val = localStorage.getItem(BUILDER_AUTO_SUGGEST_KEY);
    return val === null ? true : val === 'true';
  } catch {
    return true;
  }
}

export function setBuilderAutoSuggest(enabled: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(BUILDER_AUTO_SUGGEST_KEY, enabled ? 'true' : 'false');
    window.dispatchEvent(new Event('builder_settings_changed'));
  } catch {}
}
