import { TaskType, PromptSeed, GradingResult } from './index';

export type BuilderTargetBand = '5.5' | '6.0' | '6.5' | '7.0' | '7.5' | '8.0+';

export type BuilderNodeStatus = 'locked' | 'available' | 'completed';

export interface SentenceCheckError {
  type: 'Grammar' | 'Vocabulary' | 'Spelling' | 'Punctuation';
  originalSnippet: string;
  correction: string;
  explanationVi: string;
}

export interface SentenceCheckResult {
  hasErrors: boolean;
  errors: SentenceCheckError[];
  correctedSentence: string;
  overallAdviceVi?: string;
}

export interface LexicalHighlight {
  phrase: string;
  type: 'Collocation' | 'C1/C2 Vocabulary' | 'Academic Phrase' | 'Grammar Structure';
  meaningVi: string;
  usageNoteVi: string;
}

export interface ParaphraseAlternative {
  sentence: string;
  styleLabel: string;
  explanationVi?: string;
}

export interface SentenceParaphraseResult {
  paraphrasedSentence: string;
  bandScore: BuilderTargetBand;
  lexicalHighlights: LexicalHighlight[];
  styleExplanationVi: string;
  alternatives?: ParaphraseAlternative[];
}

export interface SentenceInput {
  id: string;
  text: string;
  placeholderHint: string;
  checkResult?: SentenceCheckResult | null;
  paraphraseResult?: SentenceParaphraseResult | null;
}

export interface BuilderBlock {
  id: 'intro' | 'overview' | 'body1' | 'body2' | 'conclusion';
  title: string;
  descriptionVi: string;
  sentences: SentenceInput[];
}

export interface BuilderNode {
  promptId: string;
  taskType: 'task1' | 'task2';
  status: BuilderNodeStatus;
  blocks: BuilderBlock[];
  completedAt?: string;
  wordCount?: number;
  mcqAnswers?: Record<number, number>; // question index -> selected option index
  gradingResult?: GradingResult;
  recordId?: string;
}

export interface BuilderLevel {
  levelNumber: number; // 1 to N (1 is bottom, N is top)
  task1Node: BuilderNode; // Left branch
  task2Node: BuilderNode; // Right branch
}

export interface BuilderTreeConfig {
  targetBand: BuilderTargetBand;
  studyDays: number;
  totalLevels: number; // N
  createdAt: string;
}

export interface BuilderDailyTracker {
  lastActiveDate: string; // YYYY-MM-DD
  completedNodesToday: number;
  targetNodesToday: number;
  studyStreakDays: number;
}

export interface BuilderState {
  config: BuilderTreeConfig | null;
  levels: BuilderLevel[];
  dailyTracker: BuilderDailyTracker;
}

export interface InteractiveMCQOption {
  text: string;
  isCorrect: boolean;
  explanationVi: string;
}

export interface InteractiveMCQ {
  id: number;
  question: string;
  purposeVi: string;
  options: InteractiveMCQOption[];
}
