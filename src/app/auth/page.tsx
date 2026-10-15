'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, Mail, Lock, User, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { getSupabaseBrowserClient, isSupabaseConfigured } from '@/lib/supabase/client';

export default function AuthPage() {
  const router = useRouter();
  const configured = isSupabaseConfigured();

  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!configured) {
      setErrorMsg('Supabase chưa được cấu hình key thực. Hệ thống đang hoạt động ở chế độ Guest / LocalStorage 100% tính năng.');
      return;
    }

    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;

    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName },
          },
        });
        if (error) throw error;
        setSuccessMsg('Đăng ký thành công! Vui lòng kiểm tra email để xác nhận tài khoản (nếu bật email confirmation) hoặc đăng nhập.');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        router.push('/dashboard');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Đã xảy ra lỗi trong quá trình xác thực.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4 py-12">
      <div className="max-w-md w-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl shadow-xl overflow-hidden p-8 space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">
            {isSignUp ? 'Tạo Tài Khoản Luyện Thi' : 'Đăng Nhập Tài Khoản'}
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {isSignUp
              ? 'Lưu trữ bài thi đồng bộ trên đám mây Supabase'
              : 'Tiếp tục lộ trình nâng band điểm IELTS của bạn'}
          </p>
        </div>

        {/* Guest Mode Notice */}
        {!configured && (
          <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 space-y-1">
            <div className="flex items-center gap-1.5 font-bold">
              <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Chế độ Khách (Guest / LocalStorage Mode)</span>
            </div>
            <p className="leading-relaxed opacity-90">
              Supabase chưa được điền key thật trên môi trường này. Bạn hoàn toàn có thể sử dụng 100% tính năng luyện thi, chấm AI và lưu lịch sử vào trình duyệt mà không cần đăng nhập!
            </p>
          </div>
        )}

        {errorMsg && (
          <div className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-xl text-xs text-red-700 dark:text-red-300">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="flex items-start gap-2 p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs text-emerald-700 dark:text-emerald-300">
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Họ và Tên
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Nguyễn Văn A"
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Mật khẩu
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-1.5"
          >
            <span>{loading ? 'Đang xử lý...' : isSignUp ? 'Đăng Ký Ngay' : 'Đăng Nhập'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 border-t border-gray-100 dark:border-zinc-800 text-xs text-gray-500">
          {isSignUp ? (
            <span>
              Đã có tài khoản?{' '}
              <button
                type="button"
                onClick={() => setIsSignUp(false)}
                className="text-sky-600 font-semibold hover:underline"
              >
                Đăng nhập
              </button>
            </span>
          ) : (
            <span>
              Chưa có tài khoản?{' '}
              <button
                type="button"
                onClick={() => setIsSignUp(true)}
                className="text-sky-600 font-semibold hover:underline"
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
