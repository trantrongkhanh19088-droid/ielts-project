export type TaskType = 'task1' | 'task2' | 'full_test';

export type ContrastMode = 'default' | 'white-on-black' | 'yellow-on-black';
export type FontSize = 'normal' | 'large' | 'extra-large';

export interface ChartDataPoint {
  label: string;
  [key: string]: string | number;
}

export interface PromptSeed {
  id: string;
  taskType: 'task1' | 'task2';
  title: string;
  category: string; // e.g., 'Line Graph', 'Bar Chart', 'Pie Chart', 'Opinion', 'Discussion', 'Problem & Solution'
  instruction: string;
  question: string;
  minWords: number;
  timeMinutes: number;
  chartType?: 'line' | 'bar' | 'pie' | 'custom_image' | 'process' | 'map' | 'table';
  imageUrl?: string;
  chartData?: ChartDataPoint[];
  chartDataKeys?: { key: string; name: string; color: string }[];
  chartDescription?: string;
  chartTable?: {
    headers: string[];
    rows: (string | number)[][];
  };
  outline?: {
    overviewOrThesis?: string;
    body1?: string;
    body2?: string;
    conclusion?: string;
    note?: string;
  };
  isCustom?: boolean;
  createdAt?: string;
}

export interface SentenceCorrection {
  original: string;
  corrected: string;
  errorType: 'Grammar' | 'Vocabulary' | 'Cohesion';
  explanationVi: string;
}

export interface VocabularyUpgrade {
  basicWord: string;
  academicAlternatives: string[];
  contextExample: string;
}

export interface CriterionFeedback {
  score: number;
  feedback: string;
}

export interface GradingCriteria {
  taskAchievementOrResponse: CriterionFeedback;
  coherenceCohesion: CriterionFeedback;
  lexicalResource: CriterionFeedback;
  grammaticalRange: CriterionFeedback;
}

export interface DiagnosticRoadmap {
  bandCeilingFactor: string;
  topPriorityFix: string;
  examinerNoteVi?: string;
}

export interface GradingResult {
  overallBand: number;
  criteria: GradingCriteria;
  sentenceCorrections: SentenceCorrection[];
  vocabularyUpgrades: VocabularyUpgrade[];
  modelEssayBand8: string;
  diagnosticRoadmap?: DiagnosticRoadmap;
  wordCount: number;
  timeSpentSeconds: number;
  taskType: 'task1' | 'task2';
  promptTitle: string;
  promptText: string;
  userEssay: string;
}

export interface FullTestGradingResult {
  isFullTest: true;
  overallBand: number; // rounded to nearest 0.5 of (Task1 + Task2*2)/3
  task1Result: GradingResult;
  task2Result: GradingResult;
  totalTimeSeconds: number;
  createdAt: string;
}

export interface EssayRecord {
  id: string;
  user_id?: string;
  task_type: TaskType;
  prompt_title: string;
  prompt_text: string;
  chart_image_url?: string;
  essay_content: string;
  word_count: number;
  duration_seconds: number;
  overall_band: number;
  tr_score?: number;
  cc_score?: number;
  lr_score?: number;
  gra_score?: number;
  ai_feedback_json: GradingResult | FullTestGradingResult;
  server_signature?: string;
  created_at: string;
}

export interface HighlightItem {
  id: string;
  text: string;
  color?: string;
}

export * from './builder';
