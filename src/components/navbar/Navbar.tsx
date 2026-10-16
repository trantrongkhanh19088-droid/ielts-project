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
} from 'lucide-react';
import { getSupabaseBrowserClient, isSupabaseConfigured } from '@/lib/supabase/client';
import SettingsModal from '@/components/settings/SettingsModal';

export default function Navbar() {
  const pathname = usePathname();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [targetBand, setTargetBand] = useState<number>(7.0);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [bandSaved, setBandSaved] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Load and sync theme from localStorage on mount
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('cd_ielts_theme') as 'light' | 'dark' | null;
      if (savedTheme === 'dark') {
        setTheme('dark');
        document.documentElement.classList.add('dark');
      } else {
        setTheme('light');
        document.documentElement.classList.remove('dark');
      }
    } catch {}
  }, []);

  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    try {
      localStorage.setItem('cd_ielts_theme', newTheme);
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
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
      <nav className="sticky top-0 z-30 bg-white/95 dark:bg-zinc-950/95 backdrop-blur border-b border-gray-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl overflow-hidden border border-sky-400/50 shadow-md shadow-sky-500/20 group-hover:scale-105 transition bg-white dark:bg-zinc-800 shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/avatar-logo.png"
                  alt="CD-IELTS Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-base tracking-tight text-gray-900 dark:text-white">
                  CD-IELTS <span className="text-sky-600">Writing</span>
                </span>
                <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium tracking-wider uppercase">
                  Inspera Official Simulator
                </span>
              </div>
            </Link>

            {/* Nav links */}
            <div className="hidden md:flex items-center gap-1 text-sm font-medium">
              <Link
                href="/builder"
                className={`px-3 py-2 rounded-lg transition flex items-center gap-1.5 ${
                  pathname === '/builder'
                    ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 font-bold'
                    : 'text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50/50 dark:hover:bg-zinc-900'
                }`}
              >
                <Sprout className="w-4 h-4 text-emerald-600 animate-pulse" />
                <span className="font-bold">Writing Builder</span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                  Mới
                </span>
              </Link>
              <Link
                href="/practice?mode=task1"
                className={`px-3 py-2 rounded-lg transition ${
                  pathname === '/practice' && typeof window !== 'undefined' && window.location.search.includes('task1')
                    ? 'text-sky-600 bg-sky-50 dark:bg-sky-950/40 font-semibold'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-900'
                }`}
              >
                Luyện Task 1
              </Link>
              <Link
                href="/practice?mode=task2"
                className="px-3 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-900 transition"
              >
                Luyện Task 2
              </Link>
              <Link
                href="/practice?mode=full_test"
                className="px-3 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-900 transition flex items-center gap-1.5"
              >
                <Layers className="w-4 h-4 text-sky-600" />
                <span>Thi Full Test (60p)</span>
              </Link>
              <Link
                href="/dashboard"
                className={`px-3 py-2 rounded-lg transition flex items-center gap-1.5 ${
                  pathname === '/dashboard'
                    ? 'text-sky-600 bg-sky-50 dark:bg-sky-950/40 font-semibold'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-900'
                }`}
              >
                <BarChart2 className="w-4 h-4" />
                <span>Thống kê &amp; Lịch sử</span>
              </Link>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              {/* Account State */}
              {userEmail ? (
                <button
                  type="button"
                  onClick={() => setIsProfileModalOpen(true)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-gray-200 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-900 transition text-left"
                >
                  <div className="w-7 h-7 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                    {initials}
                  </div>
                  <div className="hidden sm:flex flex-col">
                    <span className="text-xs font-semibold text-gray-900 dark:text-gray-100 truncate max-w-[120px]">
                      {userName || userEmail}
                    </span>
                    <span className="text-[10px] text-sky-600 dark:text-sky-400 font-bold flex items-center gap-1">
                      <Target className="w-3 h-3" /> Target {targetBand.toFixed(1)}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                </button>
              ) : (
                <Link
                  href="/auth"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-gray-300 dark:border-zinc-700 hover:bg-gray-100 dark:hover:bg-zinc-900 text-xs font-semibold text-gray-700 dark:text-gray-200 transition"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Tài khoản</span>
                </Link>
              )}

              {/* System Settings Button (Theme & Builder Config) */}
              <button
                type="button"
                onClick={() => setIsSettingsModalOpen(true)}
                className="p-2 rounded-xl border border-gray-200 dark:border-zinc-800 text-gray-600 dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-gray-100 dark:hover:bg-zinc-900 transition flex items-center justify-center shadow-xs"
                title="Cài đặt hệ thống (Giao diện & Builder)"
                aria-label="Cài đặt"
              >
                <Settings className="w-4 h-4" />
              </button>

              {/* Start Writing button */}
              <Link
                href="/practice?mode=full_test"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition shadow-md shadow-sky-600/20"
              >
                <Sparkles className="w-3.5 h-3.5" />
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
    </>
  );
}
