'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  ShieldCheck,
  Mail,
  Lock,
  User,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Target,
  KeyRound,
  Eye,
  EyeOff,
  Sparkles,
  RotateCcw,
} from 'lucide-react';
import { getSupabaseBrowserClient, isSupabaseConfigured } from '@/lib/supabase/client';
import AcademicLogo from '@/components/brand/AcademicLogo';
import { useSoundEngine } from '@/hooks/useSoundEngine';

type AuthView = 'signin' | 'signup' | 'forgot' | 'update-password';

function AuthContent() {
  const { playClick, playLockIn } = useSoundEngine();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get('redirect') || '/dashboard';
  const configured = isSupabaseConfigured();

  const [authView, setAuthView] = useState<AuthView>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [targetBand, setTargetBand] = useState<number>(7.0);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Detect recovery flow from URL params, hash, or Supabase Auth state change
  useEffect(() => {
    const mode = searchParams.get('mode');
    const type = searchParams.get('type');
    if (mode === 'update-password' || type === 'recovery') {
      setAuthView('update-password');
    }

    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash.includes('type=recovery') || hash.includes('access_token')) {
        setAuthView('update-password');
      }
    }

    if (configured) {
      const supabase = getSupabaseBrowserClient();
      if (supabase) {
        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange(async (event) => {
          if (event === 'PASSWORD_RECOVERY') {
            setAuthView('update-password');
            setSuccessMsg('Đã xác thực yêu cầu khôi phục. Vui lòng nhập mật khẩu mới của bạn.');
          }
        });

        // Exchange code if provided in query param
        const code = searchParams.get('code');
        if (code) {
          supabase.auth.exchangeCodeForSession(code).then(({ error }) => {
            if (!error) {
              setAuthView('update-password');
              setSuccessMsg('Đã xác thực mã bảo mật. Vui lòng nhập mật khẩu mới.');
            }
          });
        }

        return () => {
          subscription.unsubscribe();
        };
      }
    }
  }, [configured, searchParams]);

  const switchView = (newView: AuthView) => {
    playClick();
    setAuthView(newView);
    setErrorMsg('');
    setSuccessMsg('');
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    playLockIn();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    try {
      if (authView === 'forgot') {
        // FORGOT / RECOVER PASSWORD
        if (!email.trim()) {
          throw new Error('Vui lòng nhập địa chỉ email của bạn.');
        }

        if (configured) {
          const supabase = getSupabaseBrowserClient();
          if (supabase) {
            const redirectUrl =
              typeof window !== 'undefined'
                ? `${window.location.origin}/auth?mode=update-password`
                : undefined;
            const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
              redirectTo: redirectUrl,
            });
            if (error) throw error;
            setSuccessMsg(
              `Liên kết khôi phục đã được gửi đến "${email}". Vui lòng kiểm tra hộp thư đến (hoặc hòm thư Rác/Spam) và bấm vào liên kết để đặt lại mật khẩu.`
            );
          }
        } else {
          // Local storage fallback simulation
          setSuccessMsg(
            `Đã xác nhận yêu cầu khôi phục cho tài khoản "${email}". Vui lòng tạo mật khẩu mới ngay bên dưới.`
          );
          setTimeout(() => {
            setAuthView('update-password');
          }, 800);
        }
      } else if (authView === 'update-password') {
        // UPDATE NEW PASSWORD
        if (newPassword.length < 6) {
          throw new Error('Mật khẩu mới phải có độ dài tối thiểu 6 ký tự.');
        }
        if (newPassword !== confirmPassword) {
          throw new Error('Mật khẩu xác nhận không khớp. Vui lòng kiểm tra lại.');
        }

        if (configured) {
          const supabase = getSupabaseBrowserClient();
          if (supabase) {
            const { error } = await supabase.auth.updateUser({
              password: newPassword,
            });
            if (error) throw error;
            setSuccessMsg('Đổi mật khẩu thành công! Đang chuyển hướng đến phòng luyện thi...');
            setTimeout(() => {
              router.push(redirectTarget);
            }, 1200);
          }
        } else {
          // Local fallback
          const local = localStorage.getItem('cd_ielts_local_user');
          let parsed: Record<string, any> = {
            email: email || 'user@example.com',
            fullName: fullName || email.split('@')[0] || 'Thí sinh',
            targetBand,
          };
          if (local) {
            try {
              parsed = JSON.parse(local);
            } catch {}
          }
          parsed.password = newPassword;
          parsed.signedInAt = Date.now();
          localStorage.setItem('cd_ielts_local_user', JSON.stringify(parsed));
          setSuccessMsg('Cập nhật mật khẩu thành công! Đang chuyển hướng...');
          setTimeout(() => {
            router.push(redirectTarget);
          }, 1200);
        }
      } else if (authView === 'signup') {
        // SIGN UP
        if (password.length < 6) {
          throw new Error('Mật khẩu phải có độ dài tối thiểu 6 ký tự.');
        }

        if (configured) {
          const supabase = getSupabaseBrowserClient();
          if (supabase) {
            const { data, error } = await supabase.auth.signUp({
              email: email.trim(),
              password,
              options: {
                data: {
                  full_name: fullName.trim(),
                  target_band: targetBand,
                },
              },
            });
            if (error) throw error;
            if (data.user) {
              await supabase.from('profiles').upsert({
                id: data.user.id,
                email: email.trim(),
                full_name: fullName.trim(),
                target_band: targetBand,
              });
            }
            setSuccessMsg('Đăng ký tài khoản thành công! Đang chuyển hướng...');
            setTimeout(() => {
              router.push(redirectTarget);
            }, 1000);
          }
        } else {
          localStorage.setItem(
            'cd_ielts_local_user',
            JSON.stringify({
              email: email.trim(),
              fullName: fullName.trim() || email.split('@')[0],
              targetBand,
              signedInAt: Date.now(),
            })
          );
          setSuccessMsg('Đăng ký tài khoản thành công! Đang chuyển hướng...');
          setTimeout(() => {
            router.push(redirectTarget);
          }, 600);
        }
      } else {
        // SIGN IN
        if (configured) {
          const supabase = getSupabaseBrowserClient();
          if (supabase) {
            const { error } = await supabase.auth.signInWithPassword({
              email: email.trim(),
              password,
            });
            if (error) throw error;
            router.push(redirectTarget);
          }
        } else {
          localStorage.setItem(
            'cd_ielts_local_user',
            JSON.stringify({
              email: email.trim(),
              fullName: fullName.trim() || email.split('@')[0],
              targetBand,
              signedInAt: Date.now(),
            })
          );
          setSuccessMsg('Đăng nhập thành công! Đang chuyển hướng...');
          setTimeout(() => {
            router.push(redirectTarget);
          }, 600);
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Đã xảy ra lỗi trong quá trình xử lý.');
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
              {authView === 'signup'
                ? 'Tạo Tài Khoản Luyện Thi'
                : authView === 'forgot'
                ? 'Khôi Phục Mật Khẩu'
                : authView === 'update-password'
                ? 'Tạo Mật Khẩu Mới'
                : 'Đăng Nhập Hệ Thống'}
            </h2>
            <p className="font-mono text-xs text-stone-500 dark:text-stone-400 mt-1">
              {authView === 'signup'
                ? 'Lưu trữ tiến trình luyện thi & lịch sử bài viết'
                : authView === 'forgot'
                ? 'Nhận liên kết đặt lại mật khẩu an toàn qua email'
                : authView === 'update-password'
                ? 'Thiết lập mật khẩu bảo mật mới cho tài khoản'
                : 'Tiếp tục luyện tập và đối chiếu chuẩn điểm Inspera'}
            </p>
          </div>
        </div>

        {errorMsg && (
          <div className="flex items-start gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-md text-xs text-red-700 dark:text-red-400 font-mono">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="flex items-start gap-2 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-md text-xs text-emerald-700 dark:text-emerald-400 font-mono">
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{successMsg}</span>
          </div>
        )}

        {/* FORGOT PASSWORD EXPLANATION BANNER */}
        {authView === 'forgot' && (
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-300 font-mono flex items-start gap-2.5">
            <KeyRound className="w-4 h-4 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
            <p className="leading-relaxed">
              Bạn lỡ quên mật khẩu? Đừng lo lắng, hãy nhập email tài khoản của bạn bên dưới. Hệ thống
              sẽ gửi cho bạn liên kết để tạo mật khẩu mới an toàn.
            </p>
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-4">
          {/* SIGN UP EXTRA FIELDS */}
          {authView === 'signup' && (
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
                    placeholder="Nhập họ và tên hoặc biệt danh"
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

          {/* EMAIL FIELD (For Signin, Signup, and Forgot Password) */}
          {authView !== 'update-password' && (
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
                  placeholder="name@example.com"
                  className="w-full pl-9 pr-3 py-2 text-xs hairline-border rounded-md bg-paper dark:bg-carbon text-stone-900 dark:text-stone-100 focus:outline-none focus:border-stone-900 dark:focus:border-stone-100 transition-colors"
                />
              </div>
            </div>
          )}

          {/* PASSWORD FIELD (For Signin and Signup) */}
          {(authView === 'signin' || authView === 'signup') && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block font-mono text-[11px] uppercase tracking-wider text-stone-600 dark:text-stone-400">
                  Mật khẩu:
                </label>
                {authView === 'signin' && (
                  <button
                    type="button"
                    onClick={() => switchView('forgot')}
                    className="font-mono text-[11px] text-stone-500 dark:text-stone-400 hover:text-vermilion transition-colors cursor-pointer"
                  >
                    Quên mật khẩu?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-9 py-2 text-xs hairline-border rounded-md bg-paper dark:bg-carbon text-stone-900 dark:text-stone-100 focus:outline-none focus:border-stone-900 dark:focus:border-stone-100 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-2.5 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition-colors"
                  tabIndex={-1}
                  title={showPassword ? 'Ẩn mật khẩu' : 'Hiển thị mật khẩu'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}

          {/* UPDATE PASSWORD FIELDS */}
          {authView === 'update-password' && (
            <>
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-stone-600 dark:text-stone-400 mb-1">
                  Mật khẩu mới (tối thiểu 6 ký tự):
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Nhập mật khẩu mới"
                    className="w-full pl-9 pr-9 py-2 text-xs hairline-border rounded-md bg-paper dark:bg-carbon text-stone-900 dark:text-stone-100 focus:outline-none focus:border-stone-900 dark:focus:border-stone-100 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-2.5 top-2.5 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition-colors"
                    tabIndex={-1}
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-stone-600 dark:text-stone-400 mb-1">
                  Xác nhận mật khẩu mới:
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Nhập lại mật khẩu mới"
                    className="w-full pl-9 pr-3 py-2 text-xs hairline-border rounded-md bg-paper dark:bg-carbon text-stone-900 dark:text-stone-100 focus:outline-none focus:border-stone-900 dark:focus:border-stone-100 transition-colors"
                  />
                </div>
              </div>
            </>
          )}

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 rounded-md bg-stone-900 text-stone-50 hover:bg-vermilion dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-vermilion dark:hover:text-stone-50 disabled:opacity-50 font-semibold text-xs tracking-wide transition-all duration-200 ease-spring flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
          >
            {loading ? (
              <span>Đang xử lý...</span>
            ) : authView === 'forgot' ? (
              <>
                <KeyRound className="w-4 h-4" />
                <span>Gửi Liên Kết Khôi Phục</span>
              </>
            ) : authView === 'update-password' ? (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Cập Nhật Mật Khẩu Mới</span>
              </>
            ) : authView === 'signup' ? (
              <>
                <span>Đăng Ký Tài Khoản</span>
                <ArrowRight className="w-4 h-4" />
              </>
            ) : (
              <>
                <span>Đăng Nhập</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* FOOTER SWITCHER LINKS */}
        <div className="text-center pt-3 hairline-t font-mono text-xs text-stone-500">
          {authView === 'forgot' ? (
            <button
              type="button"
              onClick={() => switchView('signin')}
              className="inline-flex items-center gap-1.5 text-stone-900 dark:text-stone-100 font-semibold hover:text-vermilion transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Quay lại trang Đăng nhập</span>
            </button>
          ) : authView === 'update-password' ? (
            <button
              type="button"
              onClick={() => switchView('signin')}
              className="inline-flex items-center gap-1.5 text-stone-900 dark:text-stone-100 font-semibold hover:text-vermilion transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Quay lại trang Đăng nhập</span>
            </button>
          ) : authView === 'signup' ? (
            <span>
              Đã có tài khoản?{' '}
              <button
                type="button"
                onClick={() => switchView('signin')}
                className="text-stone-900 dark:text-stone-100 font-semibold underline underline-offset-4 hover:text-vermilion cursor-pointer"
              >
                Đăng nhập
              </button>
            </span>
          ) : (
            <span>
              Chưa có tài khoản?{' '}
              <button
                type="button"
                onClick={() => switchView('signup')}
                className="text-stone-900 dark:text-stone-100 font-semibold underline underline-offset-4 hover:text-vermilion cursor-pointer"
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
