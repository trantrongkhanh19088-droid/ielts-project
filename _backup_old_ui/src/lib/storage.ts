import { EssayRecord, TaskType, GradingResult, FullTestGradingResult } from '@/types';
import { getSupabaseBrowserClient, isSupabaseConfigured } from './supabase/client';

const ESSAYS_STORAGE_KEY = 'cd_ielts_essay_records';
const DRAFT_PREFIX = 'cd_ielts_draft_';

export function getUserStorageKey(userId?: string | null): string {
  if (userId) return `cd_ielts_essay_records_${userId}`;
  return 'cd_ielts_essay_records_guest';
}

export function getLocalRecordsByKey(key: string): EssayRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveLocalRecordsByKey(key: string, records: EssayRecord[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(records));
  } catch (err) {
    console.error('Failed to save essay records to localStorage', err);
  }
}

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
  server_signature?: string;
}): Promise<EssayRecord> {
  const newRecord: EssayRecord = {
    id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `essay_${Date.now()}`,
    ...record,
    created_at: new Date().toISOString(),
  };

  let currentUserId: string | null = null;

  // Try saving to Supabase if configured & user logged in
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseBrowserClient();
      if (supabase) {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          currentUserId = user.id;
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

  // Save to user-scoped local storage
  const userKey = getUserStorageKey(currentUserId);
  const existing = getLocalRecordsByKey(userKey);
  existing.unshift(newRecord);
  saveLocalRecordsByKey(userKey, existing);

  // Clean legacy shared storage to prevent leaking between accounts on same device
  if (typeof window !== 'undefined') {
    localStorage.removeItem(ESSAYS_STORAGE_KEY);
  }

  return newRecord;
}

export function getLocalEssayRecords(userId?: string | null): EssayRecord[] {
  if (typeof window === 'undefined') return [];
  if (userId) {
    return getLocalRecordsByKey(getUserStorageKey(userId));
  }
  // Try to find if user is logged in via Supabase local session
  try {
    const sbKey = Object.keys(localStorage).find((k) => k.startsWith('sb-') && k.endsWith('-auth-token'));
    if (sbKey) {
      const rawSb = localStorage.getItem(sbKey);
      if (rawSb) {
        const parsed = JSON.parse(rawSb);
        const uid = parsed?.user?.id;
        if (uid) {
          const userRecs = getLocalRecordsByKey(getUserStorageKey(uid));
          return userRecs;
        }
      }
    }
  } catch {}

  const guest = getLocalRecordsByKey('cd_ielts_essay_records_guest');
  if (guest.length > 0) return guest;

  return getLocalRecordsByKey(ESSAYS_STORAGE_KEY);
}

export async function fetchAllEssayRecords(): Promise<EssayRecord[]> {
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

          if (!error && data) {
            // Keep user-scoped local cache in sync
            saveLocalRecordsByKey(getUserStorageKey(user.id), data as EssayRecord[]);
            // Return user's own essays (even if empty [] for new users!)
            return data as EssayRecord[];
          }

          // In case of network error, return this user's local cache ONLY
          return getLocalRecordsByKey(getUserStorageKey(user.id));
        }
      }
    } catch (err) {
      console.warn('Failed to fetch from Supabase, checking local cache', err);
    }
  }

  // Guest / unauthenticated fallback
  const guestRecords = getLocalRecordsByKey('cd_ielts_essay_records_guest');
  if (guestRecords.length > 0) return guestRecords;
  return getLocalRecordsByKey(ESSAYS_STORAGE_KEY);
}

export async function fetchEssayRecordById(id: string): Promise<EssayRecord | null> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseBrowserClient();
      if (supabase) {
        const { data, error } = await supabase
          .from('essays')
          .select('*')
          .eq('id', id)
          .maybeSingle();

        if (!error && data) {
          return data as EssayRecord;
        }
      }
    } catch (err) {
      console.warn('Failed to fetch essay by id from Supabase', err);
    }
  }

  // Fallback to searching user cache or guest cache
  const all = await fetchAllEssayRecords();
  const found = all.find((r) => r.id === id);
  if (found) return found;

  const legacy = getLocalRecordsByKey(ESSAYS_STORAGE_KEY).find((r) => r.id === id);
  return legacy || null;
}

export async function deleteEssayRecordAsync(id: string): Promise<void> {
  // 1. Delete from Supabase if logged in
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseBrowserClient();
      if (supabase) {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          await supabase.from('essays').delete().eq('id', id).eq('user_id', user.id);
          const userKey = getUserStorageKey(user.id);
          const list = getLocalRecordsByKey(userKey).filter((r) => r.id !== id);
          saveLocalRecordsByKey(userKey, list);
        }
      }
    } catch (err) {
      console.warn('Could not delete essay from Supabase', err);
    }
  }

  // 2. Also remove from local caches
  const guestKey = 'cd_ielts_essay_records_guest';
  const guestList = getLocalRecordsByKey(guestKey).filter((r) => r.id !== id);
  saveLocalRecordsByKey(guestKey, guestList);

  const legacyList = getLocalRecordsByKey(ESSAYS_STORAGE_KEY).filter((r) => r.id !== id);
  saveLocalRecordsByKey(ESSAYS_STORAGE_KEY, legacyList);
}

export function deleteLocalEssayRecord(id: string): void {
  // Synchronous delete for legacy callers, also dispatches async Supabase delete
  deleteEssayRecordAsync(id);
}

export function clearAllEssayRecords(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(ESSAYS_STORAGE_KEY);
    localStorage.removeItem('cd_ielts_essay_records_guest');
  } catch (err) {
    console.error('Failed to clear essay records from localStorage', err);
  }
}

export async function clearAllEssayRecordsAsync(): Promise<void> {
  let userId: string | null = null;
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseBrowserClient();
      if (supabase) {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          userId = user.id;
          await supabase.from('essays').delete().eq('user_id', user.id);
        }
      }
    } catch (err) {
      console.warn('Could not delete all essays from Supabase', err);
    }
  }

  if (typeof window !== 'undefined') {
    if (userId) {
      localStorage.removeItem(getUserStorageKey(userId));
    }
    localStorage.removeItem('cd_ielts_essay_records_guest');
    localStorage.removeItem(ESSAYS_STORAGE_KEY);
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

export function clearAllDrafts(): void {
  if (typeof window === 'undefined') return;
  try {
    const keys = Object.keys(localStorage);
    for (const k of keys) {
      if (k.startsWith(DRAFT_PREFIX)) {
        localStorage.removeItem(k);
      }
    }
  } catch (err) {
    console.error('Failed to clear all drafts', err);
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
