'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  PenTool,
  BarChart2,
  FileText,
  Key,
  User,
  LogOut,
  Layers,
  Sparkles,
} from 'lucide-react';
import ApiKeyModal from '@/components/exam/ApiKeyModal';
import { getSupabaseBrowserClient, isSupabaseConfigured } from '@/lib/supabase/client';

export default function Navbar() {
  const pathname = usePathname();
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    if (isSupabaseConfigured()) {
      const supabase = getSupabaseBrowserClient();
      if (supabase) {
        supabase.auth.getUser().then(({ data: { user } }) => {
          if (user?.email) setUserEmail(user.email);
        });

        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
          setUserEmail(session?.user?.email || null);
        });

        return () => {
          authListener.subscription.unsubscribe();
        };
      }
    }
  }, []);

  const handleSignOut = async () => {
    if (isSupabaseConfigured()) {
      const supabase = getSupabaseBrowserClient();
      if (supabase) {
        await supabase.auth.signOut();
        setUserEmail(null);
        window.location.reload();
      }
    }
  };

  // Do not show full navbar inside the actual exam simulation room to avoid distractions
  if (pathname === '/practice') {
    return null;
  }

  return (
    <>
      <nav className="sticky top-0 z-30 bg-white/95 dark:bg-zinc-950/95 backdrop-blur border-b border-gray-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-600 to-blue-700 flex items-center justify-center text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition">
                <PenTool className="w-5 h-5" />
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
            <div className="flex items-center gap-2">
              {/* BYOK button */}
              <button
                type="button"
                onClick={() => setIsKeyModalOpen(true)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-zinc-800 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-900 transition shadow-sm"
                title="Cài đặt Gemini API Key cá nhân"
              >
                <Key className="w-3.5 h-3.5 text-sky-600" />
                <span className="hidden sm:inline">Gemini Key</span>
              </button>

              {/* Supabase Auth State */}
              {userEmail ? (
                <div className="flex items-center gap-2 pl-2">
                  <span className="text-xs text-gray-600 dark:text-gray-300 font-medium hidden sm:inline max-w-[130px] truncate">
                    {userEmail}
                  </span>
                  <button
                    onClick={handleSignOut}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-900 text-gray-500 hover:text-red-600 transition"
                    title="Đăng xuất"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <Link
                  href="/auth"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-900 transition"
                >
                  <User className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Tài khoản</span>
                </Link>
              )}

              {/* Start Writing button */}
              <Link
                href="/practice?mode=full_test"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Bắt đầu thi</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <ApiKeyModal isOpen={isKeyModalOpen} onClose={() => setIsKeyModalOpen(false)} />
    </>
  );
}
