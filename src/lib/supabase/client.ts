import { createBrowserClient } from '@supabase/ssr';
import { SupabaseClient } from '@supabase/supabase-js';

export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) return false;
  if (url.includes('your-project-id') || anonKey.includes('your-supabase-anon-key')) {
    return false;
  }
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

let browserClient: SupabaseClient | null = null;

export function getSupabaseBrowserClient(): SupabaseClient | null {
  if (!isSupabaseConfigured()) {
    return null;
  }

  if (!browserClient) {
    let url = (process.env.NEXT_PUBLIC_SUPABASE_URL || '').trim();
    // Strip accidental /rest/v1/ or trailing slashes that break auth endpoints
    url = url.replace(/\/rest\/v1\/?$/i, '').replace(/\/+$/, '');
    const anonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '').trim();
    browserClient = createBrowserClient(url, anonKey);
  }

  return browserClient;
}
