'use client';

import React, { useState, useEffect } from 'react';
import { Key, X, Check, ExternalLink, ShieldCheck } from 'lucide-react';
import { getUserApiKey, setUserApiKey } from '@/lib/utils';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ApiKeyModal({ isOpen, onClose }: ApiKeyModalProps) {
  const [apiKey, setApiKey] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setApiKey(getUserApiKey());
      setSaved(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    setUserApiKey(apiKey);
    setSaved(true);
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  const handleClear = () => {
    setUserApiKey('');
    setApiKey('');
    setSaved(true);
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl shadow-2xl max-w-md w-full overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/50">
          <div className="flex items-center gap-2">
            <Key className="w-5 h-5 text-sky-600 dark:text-sky-400" />
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              Cài đặt Gemini API Key (BYOK)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4">
          <div className="flex items-start gap-3 p-3 bg-sky-50 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900 rounded-lg text-xs text-sky-800 dark:text-sky-300">
            <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5 text-sky-600" />
            <p>
              Key của bạn được lưu <strong>duy nhất trong trình duyệt (localStorage)</strong> của máy bạn, không bao giờ được lưu vào cơ sở dữ liệu server. Chế độ này giúp bạn thoải mái luyện thi không lo giới hạn quota của hệ thống!
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Google Gemini API Key
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
            />
          </div>

          <div className="flex items-center justify-between text-xs">
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-sky-600 dark:text-sky-400 hover:underline"
            >
              Lấy API Key miễn phí tại Google AI Studio
              <ExternalLink className="w-3 h-3" />
            </a>
            {apiKey && (
              <button
                type="button"
                onClick={handleClear}
                className="text-red-500 hover:text-red-700 underline text-xs"
              >
                Xóa Key đã lưu
              </button>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
          >
            Đóng
          </button>
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-sky-600 hover:bg-sky-700 rounded-lg transition shadow-sm"
          >
            {saved ? (
              <>
                <Check className="w-4 h-4" /> Đã lưu thành công!
              </>
            ) : (
              'Lưu API Key'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
