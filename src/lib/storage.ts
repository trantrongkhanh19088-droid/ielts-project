import { EssayRecord, TaskType, GradingResult, FullTestGradingResult } from '@/types';
import { getSupabaseBrowserClient, isSupabaseConfigured } from './supabase/client';

const ESSAYS_STORAGE_KEY = 'cd_ielts_essay_records';
const DRAFT_PREFIX = 'cd_ielts_draft_';

export async function saveEssayRecord(record: {
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
}): Promise<EssayRecord> {
  const newRecord: EssayRecord = {
    id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `essay_${Date.now()}`,
    ...record,
    created_at: new Date().toISOString(),
  };

  // Try saving to Supabase if configured & user logged in
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseBrowserClient();
      if (supabase) {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          newRecord.user_id = user.id;
          const { data, error } = await supabase.from('essays').insert([
            {
              user_id: user.id,
              task_type: newRecord.task_type,
              prompt_title: newRecord.prompt_title,
              prompt_text: newRecord.prompt_text,
              chart_image_url: newRecord.chart_image_url || null,
              essay_content: newRecord.essay_content,
              word_count: newRecord.word_count,
              duration_seconds: newRecord.duration_seconds,
              overall_band: newRecord.overall_band,
              tr_score: newRecord.tr_score || null,
              cc_score: newRecord.cc_score || null,
              lr_score: newRecord.lr_score || null,
              gra_score: newRecord.gra_score || null,
              ai_feedback_json: newRecord.ai_feedback_json,
            },
          ]).select().single();

          if (!error && data) {
            newRecord.id = data.id;
          }
        }
      }
    } catch (err) {
      console.warn('Could not save to Supabase, falling back to localStorage only', err);
    }
  }

  // Always save to localStorage for instant local access
  try {
    const existing = getLocalEssayRecords();
    existing.unshift(newRecord);
    localStorage.setItem(ESSAYS_STORAGE_KEY, JSON.stringify(existing));
  } catch (err) {
    console.error('Failed to save essay to localStorage', err);
  }

  return newRecord;
}

export function getLocalEssayRecords(): EssayRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(ESSAYS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export async function fetchAllEssayRecords(): Promise<EssayRecord[]> {
  const localList = getLocalEssayRecords();

  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseBrowserClient();
      if (supabase) {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data, error } = await supabase
            .from('essays')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

          if (!error && data && data.length > 0) {
            return data as EssayRecord[];
          }
        }
      }
    } catch (err) {
      console.warn('Failed to fetch from Supabase, returning local list', err);
    }
  }

  return localList;
}

export function deleteLocalEssayRecord(id: string): void {
  try {
    const list = getLocalEssayRecords().filter((r) => r.id !== id);
    localStorage.setItem(ESSAYS_STORAGE_KEY, JSON.stringify(list));
  } catch (err) {
    console.error('Failed to delete local essay record', err);
  }
}

export function clearAllEssayRecords(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(ESSAYS_STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear essay records from localStorage', err);
  }
}

export async function clearAllEssayRecordsAsync(): Promise<void> {
  clearAllEssayRecords();
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseBrowserClient();
      if (supabase) {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          await supabase.from('essays').delete().eq('user_id', user.id);
        }
      }
    } catch (err) {
      console.warn('Could not delete all essays from Supabase', err);
    }
  }
}

// Auto-save draft utilities
export function saveDraft(key: string, content: string, notes?: string, timeRemaining?: number): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(
      `${DRAFT_PREFIX}${key}`,
      JSON.stringify({
        content,
        notes: notes || '',
        timeRemaining: typeof timeRemaining === 'number' ? timeRemaining : undefined,
        updatedAt: Date.now(),
      })
    );
  } catch (err) {
    console.error('Failed to save draft to localStorage', err);
  }
}

export function loadDraft(key: string): { content: string; notes: string; timeRemaining?: number; updatedAt: number } | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(`${DRAFT_PREFIX}${key}`);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearDraft(key: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(`${DRAFT_PREFIX}${key}`);
  } catch (err) {
    console.error('Failed to clear draft', err);
  }
}

// Active session data interface & persistence
export interface ActiveSessionData {
  mode: TaskType;
  promptId?: string;
  task1PromptId?: string;
  task2PromptId?: string;
  startedAt: number;
}

const ACTIVE_SESSION_PREFIX = 'cd_ielts_active_session_';
const LAST_COMPLETED_PREFIX = 'cd_ielts_last_completed_';

export function getActiveSession(mode: TaskType): ActiveSessionData | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(`${ACTIVE_SESSION_PREFIX}${mode}`);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveActiveSession(session: ActiveSessionData): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(`${ACTIVE_SESSION_PREFIX}${session.mode}`, JSON.stringify(session));
  } catch (err) {
    console.error('Failed to save active session', err);
  }
}

export function clearActiveSession(mode: TaskType): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(`${ACTIVE_SESSION_PREFIX}${mode}`);
  } catch (err) {
    console.error('Failed to clear active session', err);
  }
}

export function getLastCompletedPromptId(taskType: 'task1' | 'task2'): string | undefined {
  if (typeof window === 'undefined') return undefined;
  try {
    return localStorage.getItem(`${LAST_COMPLETED_PREFIX}${taskType}`) || undefined;
  } catch {
    return undefined;
  }
}

export function setLastCompletedPromptId(taskType: 'task1' | 'task2', id: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(`${LAST_COMPLETED_PREFIX}${taskType}`, id);
  } catch (err) {
    console.error('Failed to save last completed prompt id', err);
  }
}
