'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  PenTool,
  BarChart2,
  User,
  LogOut,
  Layers,
  Sparkles,
  Target,
  ChevronDown,
  X,
  Check,
  Sprout,
  Sun,
  Moon,
  Settings,
  BookOpen,
} from 'lucide-react';
import { getSupabaseBrowserClient, isSupabaseConfigured } from '@/lib/supabase/client';
import SettingsModal from '@/components/settings/SettingsModal';
import ManekiNeko from '@/components/japanese/ManekiNeko';
import ToriiGate from '@/components/japanese/ToriiGate';
import CharacterSelectionModal from '@/components/pixel-companion/CharacterSelectionModal';
import { CompanionSettings, DEFAULT_COMPANION_SETTINGS } from '@/components/pixel-companion/types';

export default function Navbar() {
  const pathname = usePathname();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [targetBand, setTargetBand] = useState<number>(7.0);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isCharModalOpen, setIsCharModalOpen] = useState(false);
  const [companionSettings, setCompanionSettings] = useState<CompanionSettings>(DEFAULT_COMPANION_SETTINGS);
  const [bandSaved, setBandSaved] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark' | 'japanese'>('light');

  useEffect(() => {
    const syncCompanion = () => {
      try {
        const stored = localStorage.getItem('cd_ielts_companion_settings');
        if (stored) {
          setCompanionSettings({ ...DEFAULT_COMPANION_SETTINGS, ...JSON.parse(stored) });
        }
      } catch {}
    };
    syncCompanion();
    window.addEventListener('companion-settings-updated', syncCompanion);
    return () => window.removeEventListener('companion-settings-updated', syncCompanion);
  }, []);

  // Load and sync theme from localStorage on mount
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('cd_ielts_theme') as 'light' | 'dark' | 'japanese' | null;
      if (savedTheme === 'dark') {
        setTheme('dark');
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('japanese');
      } else if (savedTheme === 'japanese') {
        setTheme('japanese');
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('japanese');
      } else {
        setTheme('light');
        document.documentElement.classList.remove('dark', 'japanese');
      }
    } catch {}
  }, []);

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'japanese') => {
    setTheme(newTheme);
    try {
      localStorage.setItem('cd_ielts_theme', newTheme);
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('japanese');
      } else if (newTheme === 'japanese') {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('japanese');
      } else {
        document.documentElement.classList.remove('dark', 'japanese');
      }
    } catch {}
  };

  useEffect(() => {
    // Check Supabase session
    if (isSupabaseConfigured()) {
      const supabase = getSupabaseBrowserClient();
      if (supabase) {
        supabase.auth.getUser().then(({ data: { user } }) => {
          if (user?.email) {
            setUserEmail(user.email);
            setUserName(user.user_metadata?.full_name || user.email.split('@')[0]);
            // Load profile target band
            supabase
              .from('profiles')
              .select('target_band, full_name')
              .eq('id', user.id)
              .single()
              .then(({ data }) => {
                if (data?.target_band) setTargetBand(Number(data.target_band));
                if (data?.full_name) setUserName(data.full_name);
              });
          }
        });

        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
          if (session?.user) {
            setUserEmail(session.user.email || null);
            setUserName(session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || null);
          } else {
            setUserEmail(null);
            setUserName(null);
          }
        });

        return () => {
          authListener.subscription.unsubscribe();
        };
      }
    } else {
      // Local profile fallback
      const savedProfile = localStorage.getItem('cd_ielts_local_user');
      if (savedProfile) {
        try {
          const parsed = JSON.parse(savedProfile);
          setUserEmail(parsed.email || null);
          setUserName(parsed.fullName || null);
          if (parsed.targetBand) setTargetBand(Number(parsed.targetBand));
        } catch {}
      }
    }
  }, []);

  const handleUpdateTargetBand = async (newBand: number) => {
    setTargetBand(newBand);
    setBandSaved(true);
    setTimeout(() => setBandSaved(false), 2000);

    // Save to local profile
    const savedProfile = localStorage.getItem('cd_ielts_local_user');
    const existing = savedProfile ? JSON.parse(savedProfile) : {};
    localStorage.setItem(
      'cd_ielts_local_user',
      JSON.stringify({ ...existing, targetBand: newBand })
    );

    // Save to Supabase if logged in
    if (isSupabaseConfigured()) {
      const supabase = getSupabaseBrowserClient();
      if (supabase) {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          await supabase.from('profiles').update({ target_band: newBand }).eq('id', user.id);
        }
      }
    }
  };

  const handleSignOut = async () => {
    if (isSupabaseConfigured()) {
      const supabase = getSupabaseBrowserClient();
      if (supabase) {
        await supabase.auth.signOut();
      }
    }
    localStorage.removeItem('cd_ielts_local_user');
    localStorage.removeItem('cd_ielts_essay_records');
    setUserEmail(null);
    setUserName(null);
    setIsProfileModalOpen(false);
    window.location.reload();
  };

  // Do not show full navbar inside the actual exam simulation room to avoid distractions
  if (pathname === '/practice') {
    return null;
  }

  const initials = (userName || userEmail || 'U').slice(0, 2).toUpperCase();

  return (
    <>
      <nav className="sticky top-0 z-30 bg-paper/90 dark:bg-carbon/90 backdrop-blur-md hairline-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Maneki-neko */}
            <div className="flex items-center gap-2.5">
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-200">
                  <ToriiGate width={34} height={30} text="合格" glow={false} showShimenawa={true} />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-baseline">
                    <span className="font-bold text-sm tracking-tight text-stone-900 dark:text-stone-100">
                      CD-IELTS
                    </span>
                    <span className="text-vermilion font-display font-extrabold text-base ml-1">
                      Writing
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-stone-500 dark:text-stone-400 tracking-wider uppercase font-medium mt-0.5">
                    Inspera Official Simulator
                  </span>
                </div>
              </Link>
              <div className="hidden lg:block pl-1">
                <ManekiNeko size={30} tooltip="Mèo Thần Tài chúc bạn thi đạt Band cao! 🐾" />
              </div>
            </div>

            {/* Nav links */}
            <div className="hidden md:flex items-center gap-0.5 text-xs font-medium">
              <Link
                href="/builder"
                className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 ${
                  pathname === '/builder'
                    ? 'text-stone-950 dark:text-stone-50 font-semibold bg-stone-200/60 dark:bg-stone-800/60'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-stone-100 hover:bg-stone-100/70 dark:hover:bg-stone-850'
                }`}
              >
                <Sprout className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Writing Builder</span>
                <span className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-emerald-100/80 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-300/60 dark:border-emerald-800/60 uppercase font-semibold">
                  Mới
                </span>
              </Link>
              <Link
                href="/prompts"
                className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 ${
                  pathname === '/prompts'
                    ? 'text-stone-950 dark:text-stone-50 font-semibold bg-stone-200/60 dark:bg-stone-800/60'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-stone-100 hover:bg-stone-100/70 dark:hover:bg-stone-850'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-vermilion" />
                <span>Kho Đề</span>
                <span className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30 font-bold">
                  107
                </span>
              </Link>
              <Link
                href="/practice?mode=task1"
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  pathname === '/practice' && typeof window !== 'undefined' && window.location.search.includes('task1')
                    ? 'text-stone-950 dark:text-stone-50 font-semibold bg-stone-200/60 dark:bg-stone-800/60'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-stone-100 hover:bg-stone-100/70 dark:hover:bg-stone-850'
                }`}
              >
                Luyện Task 1
              </Link>
              <Link
                href="/practice?mode=task2"
                className="px-3 py-1.5 rounded-md text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-stone-100 hover:bg-stone-100/70 dark:hover:bg-stone-850 transition-colors"
              >
                Luyện Task 2
              </Link>
              <Link
                href="/practice?mode=full_test"
                className="px-3 py-1.5 rounded-md text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-stone-100 hover:bg-stone-100/70 dark:hover:bg-stone-850 transition-colors flex items-center gap-1.5"
              >
                <Layers className="w-3.5 h-3.5 text-stone-400" />
                <span>Thi Full Test (60p)</span>
              </Link>
              <Link
                href="/dashboard"
                className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 ${
                  pathname === '/dashboard'
                    ? 'text-stone-950 dark:text-stone-50 font-semibold bg-stone-200/60 dark:bg-stone-800/60'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-stone-100 hover:bg-stone-100/70 dark:hover:bg-stone-850'
                }`}
              >
                <BarChart2 className="w-3.5 h-3.5 text-stone-400" />
                <span>Thống kê</span>
              </Link>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              {/* Account State */}
              {userEmail ? (
                <button
                  type="button"
                  onClick={() => setIsProfileModalOpen(true)}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-md hairline-border hover:bg-stone-100/70 dark:hover:bg-stone-850 transition text-left"
                >
                  <div className="w-6 h-6 rounded bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 flex items-center justify-center font-mono font-bold text-[11px]">
                    {initials}
                  </div>
                  <div className="hidden sm:flex flex-col">
                    <span className="text-xs font-semibold text-stone-900 dark:text-stone-100 truncate max-w-[110px]">
                      {userName || userEmail}
                    </span>
                    <span className="font-mono text-[11px] text-vermilion font-semibold flex items-center gap-1">
                      Target {targetBand.toFixed(1)}
                    </span>
                  </div>
                  <ChevronDown className="w-3 h-3 text-stone-400" />
                </button>
              ) : (
                <Link
                  href="/auth"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md hairline-border hover:bg-stone-100/70 dark:hover:bg-stone-850 text-xs font-medium text-stone-700 dark:text-stone-300 transition-colors"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Tài khoản</span>
                </Link>
              )}

              {/* Character & Theme Settings Button (「キャラ＆テーマ設定」) */}
              <button
                type="button"
                onClick={() => setIsCharModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md hairline-border bg-stone-50 dark:bg-stone-900 hover:bg-stone-100 dark:hover:bg-stone-850 text-xs font-medium text-stone-700 dark:text-stone-300 transition-colors"
                title="Đổi nhân vật Pixel & Giao diện Nhật Bản (「キャラ＆テーマ設定」)"
              >
                <span className="w-2 h-2 rounded-full bg-vermilion" />
                <span className="hidden sm:inline font-mono text-[11px]">キャラ＆テーマ</span>
                <span className="sm:hidden font-mono text-[11px]">Nhân vật</span>
              </button>

              {/* System Settings Button (Theme & Builder Config) */}
              <button
                type="button"
                onClick={() => setIsSettingsModalOpen(true)}
                className="p-1.5 rounded-md hairline-border text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100/70 dark:hover:bg-stone-850 transition-colors flex items-center justify-center"
                title="Cài đặt hệ thống (Giao diện & Builder)"
                aria-label="Cài đặt"
              >
                <Settings className="w-4 h-4" />
              </button>

              {/* Start Writing button */}
              <Link
                href="/practice?mode=full_test"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-stone-900 text-stone-50 hover:bg-vermilion dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-vermilion dark:hover:text-stone-50 text-xs font-semibold tracking-wide transition-all duration-200 ease-spring"
              >
                <span>Bắt đầu thi</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* User Profile Modal */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-800/40">
              <h3 className="font-bold text-sm text-gray-900 dark:text-gray-100">
                Hồ Sơ Thí Sinh
              </h3>
              <button
                onClick={() => setIsProfileModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-600 to-blue-700 text-white flex items-center justify-center font-bold text-lg shadow-md">
                  {initials}
                </div>
                <div>
                  <h4 className="font-bold text-base text-gray-900 dark:text-white">
                    {userName || 'Thí sinh IELTS'}
                  </h4>
                  <p className="text-xs text-gray-500 truncate max-w-[200px]">{userEmail}</p>
                </div>
              </div>

              {/* Target Band Selector */}
              <div className="space-y-2 pt-2 border-t border-gray-100 dark:border-zinc-800">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5 text-sky-600" />
                    Mục tiêu Band điểm Writing:
                  </label>
                  {bandSaved && (
                    <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                      <Check className="w-3 h-3" /> Đã lưu
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-5 gap-1.5">
                  {[6.0, 6.5, 7.0, 7.5, 8.0].map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => handleUpdateTargetBand(b)}
                      className={`py-1.5 rounded-lg text-xs font-bold font-mono transition border ${
                        targetBand === b
                          ? 'bg-sky-600 text-white border-sky-600 shadow-sm'
                          : 'border-gray-200 dark:border-zinc-700 hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {b.toFixed(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Settings Shortcut */}
              <div className="pt-2 border-t border-gray-100 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => {
                    setIsProfileModalOpen(false);
                    setIsSettingsModalOpen(true);
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800 text-gray-700 dark:text-gray-300 transition text-xs"
                >
                  <span className="font-semibold flex items-center gap-2">
                    <Settings className="w-3.5 h-3.5 text-sky-600" />
                    Cài đặt hệ thống (Giao diện &amp; Builder)
                  </span>
                  <span className="text-[11px] font-semibold text-gray-400">
                    {theme === 'dark' ? '🌙 Tối' : '☀️ Sáng'}
                  </span>
                </button>
              </div>

              {/* Quick Navigation */}
              <div className="space-y-1.5 pt-2 border-t border-gray-100 dark:border-zinc-800 text-xs">
                <Link
                  href="/prompts"
                  onClick={() => setIsProfileModalOpen(false)}
                  className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800 text-gray-700 dark:text-gray-300 transition"
                >
                  <span className="font-semibold flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-vermilion" />
                    Thư viện 107 Đề Thi Forecast
                  </span>
                  <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-700 dark:text-amber-400 font-bold">
                    Band 8+
                  </span>
                </Link>
                <Link
                  href="/dashboard"
                  onClick={() => setIsProfileModalOpen(false)}
                  className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800 text-gray-700 dark:text-gray-300 transition"
                >
                  <span className="font-semibold">Xem Lịch sử &amp; Thống kê bài viết</span>
                  <BarChart2 className="w-4 h-4 text-sky-600" />
                </Link>
              </div>

              {/* Logout button */}
              <button
                type="button"
                onClick={handleSignOut}
                className="w-full py-2.5 rounded-xl border border-red-200 dark:border-red-900/60 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 text-xs font-bold transition flex items-center justify-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Đăng xuất tài khoản</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal (Theme & Builder Auto-Suggest) */}
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        currentTheme={theme}
        onThemeChange={handleThemeChange}
      />

      {/* Character Selection Modal */}
      <CharacterSelectionModal
        isOpen={isCharModalOpen}
        onClose={() => setIsCharModalOpen(false)}
        settings={companionSettings}
        onSaveSettings={(newSettings) => {
          setCompanionSettings(newSettings);
          try {
            localStorage.setItem('cd_ielts_companion_settings', JSON.stringify(newSettings));
            localStorage.setItem('cd_ielts_sakura_enabled', String(newSettings.sakuraEnabled));
            window.dispatchEvent(
              new CustomEvent('sakura-toggle', { detail: { enabled: newSettings.sakuraEnabled } })
            );
            window.dispatchEvent(new Event('companion-settings-updated'));
          } catch {}
        }}
      />
    </>
  );
}
