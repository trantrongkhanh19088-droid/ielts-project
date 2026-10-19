'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  ShieldCheck,
  Mail,
  Lock,
  User,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Target,
  PenTool,
} from 'lucide-react';
import { getSupabaseBrowserClient, isSupabaseConfigured } from '@/lib/supabase/client';
import AcademicLogo from '@/components/brand/AcademicLogo';
import { useSoundEngine } from '@/hooks/useSoundEngine';

function AuthContent() {
  const { playClick, playLockIn } = useSoundEngine();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get('redirect') || '/dashboard';
  const configured = isSupabaseConfigured();

  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [targetBand, setTargetBand] = useState<number>(7.0);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    playLockIn();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    try {
      if (configured) {
        const supabase = getSupabaseBrowserClient();
        if (supabase) {
          if (isSignUp) {
            const { data, error } = await supabase.auth.signUp({
              email,
              password,
              options: {
                data: {
                  full_name: fullName,
                  target_band: targetBand,
                },
              },
            });
            if (error) throw error;
            if (data.user) {
              await supabase.from('profiles').upsert({
                id: data.user.id,
                email,
                full_name: fullName,
                target_band: targetBand,
              });
            }
            setSuccessMsg('Đăng ký tài khoản thành công! Đang chuyển hướng...');
            setTimeout(() => {
              router.push(redirectTarget);
            }, 1000);
          } else {
            const { error } = await supabase.auth.signInWithPassword({
              email,
              password,
            });
            if (error) throw error;
            router.push(redirectTarget);
          }
        }
      } else {
        // Local mode fallback
        localStorage.setItem(
          'cd_ielts_local_user',
          JSON.stringify({
            email,
            fullName: fullName || email.split('@')[0],
            targetBand,
            signedInAt: Date.now(),
          })
        );
        setSuccessMsg('Đăng nhập thành công! Đang chuyển hướng...');
        setTimeout(() => {
          router.push(redirectTarget);
        }, 600);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Đã xảy ra lỗi trong quá trình xác thực.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4 py-16 bg-paper dark:bg-carbon relative overflow-hidden">
      <div className="max-w-md w-full bg-paper-subtle/90 dark:bg-carbon-subtle/80 hairline-border rounded-2xl shadow-sm p-8 sm:p-10 space-y-6 relative overflow-hidden z-10">
        {/* Top Vermilion Accent */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-vermilion" />

        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center">
            <AcademicLogo width={52} height={52} glow />
          </div>
          <div>
            <h2 className="font-display font-bold text-3xl text-stone-900 dark:text-stone-100 tracking-normal leading-snug">
              {isSignUp ? 'Tạo Tài Khoản Luyện Thi' : 'Đăng Nhập Hệ Thống'}
            </h2>
            <p className="font-mono text-xs text-stone-500 dark:text-stone-400 mt-1">
              {isSignUp
                ? 'Lưu trữ tiến trình luyện thi & lịch sử bài viết'
                : 'Tiếp tục luyện tập và đối chiếu chuẩn điểm Inspera'}
            </p>
          </div>
        </div>

        {errorMsg && (
          <div className="flex items-start gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-md text-xs text-red-700 dark:text-red-400 font-mono">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="flex items-start gap-2 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-md text-xs text-emerald-700 dark:text-emerald-400 font-mono">
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-4">
          {isSignUp && (
            <>
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-stone-600 dark:text-stone-400 mb-1">
                  Tên Thí Sinh:
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your username"
                    className="w-full pl-9 pr-3 py-2 text-xs hairline-border rounded-md bg-paper dark:bg-carbon text-stone-900 dark:text-stone-100 focus:outline-none focus:border-stone-900 dark:focus:border-stone-100 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-stone-600 dark:text-stone-400 mb-1">
                  Mục tiêu Band điểm Writing mong muốn
                </label>
                <div className="grid grid-cols-5 gap-1.5 font-mono">
                  {[6.0, 6.5, 7.0, 7.5, 8.0].map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => {
                        playClick();
                        setTargetBand(b);
                      }}
                      className={`py-1.5 rounded-md text-xs font-semibold transition-colors hairline-border ${
                        targetBand === b
                          ? 'bg-stone-900 text-stone-50 dark:bg-stone-100 dark:text-stone-950 font-bold'
                          : 'text-stone-600 dark:text-stone-400 hover:bg-stone-200/50 dark:hover:bg-stone-850'
                      }`}
                    >
                      {b.toFixed(1)}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block font-mono text-[11px] uppercase tracking-wider text-stone-600 dark:text-stone-400 mb-1">
              Email:
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full pl-9 pr-3 py-2 text-xs hairline-border rounded-md bg-paper dark:bg-carbon text-stone-900 dark:text-stone-100 focus:outline-none focus:border-stone-900 dark:focus:border-stone-100 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block font-mono text-[11px] uppercase tracking-wider text-stone-600 dark:text-stone-400 mb-1">
              Mật khẩu:
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 text-xs hairline-border rounded-md bg-paper dark:bg-carbon text-stone-900 dark:text-stone-100 focus:outline-none focus:border-stone-900 dark:focus:border-stone-100 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 rounded-md bg-stone-900 text-stone-50 hover:bg-vermilion dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-vermilion dark:hover:text-stone-50 disabled:opacity-50 font-semibold text-xs tracking-wide transition-all duration-200 ease-spring flex items-center justify-center gap-1.5"
          >
            <span>{loading ? 'Đang xử lý...' : isSignUp ? 'Đăng Ký Tài Khoản' : 'Đăng Nhập'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-3 hairline-t font-mono text-xs text-stone-500">
          {isSignUp ? (
            <span>
              Đã có tài khoản?{' '}
              <button
                type="button"
                onClick={() => {
                  playClick();
                  setIsSignUp(false);
                  setErrorMsg('');
                  setSuccessMsg('');
                }}
                className="text-stone-900 dark:text-stone-100 font-semibold underline underline-offset-4 hover:text-vermilion"
              >
                Đăng nhập
              </button>
            </span>
          ) : (
            <span>
              Chưa có tài khoản?{' '}
              <button
                type="button"
                onClick={() => {
                  playClick();
                  setIsSignUp(true);
                  setErrorMsg('');
                  setSuccessMsg('');
                }}
                className="text-stone-900 dark:text-stone-100 font-semibold underline underline-offset-4 hover:text-vermilion"
              >
                Đăng ký miễn phí
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense
      fallback={
        <div className="flex-1 flex items-center justify-center p-8 min-h-[50vh]">
          <div className="w-7 h-7 border-2 border-vermilion border-t-transparent animate-spin" />
        </div>
      }
    >
      <AuthContent />
    </Suspense>
  );
}
