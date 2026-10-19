import React from 'react';
import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar/Navbar';
import CommandPalette from '@/components/command/CommandPalette';
import SakuraCanvas from '@/components/japanese/SakuraCanvas';
import ManekiNeko from '@/components/japanese/ManekiNeko';

export const metadata: Metadata = {
  title: 'CD-IELTS Writing Simulator | Nền tảng Luyện thi IELTS Chuẩn Inspera',
  description:
    'Luyện thi IELTS Writing Task 1 & Task 2 mô phỏng 100% giao diện thi thật CD-IELTS Inspera. Chấm điểm chi tiết với AI Gemini 2.5 theo tiêu chí chuẩn British Council & IDP.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/torii-icon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  variable: '--font-sans',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-display',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  variable: '--font-mono',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="vi"
      suppressHydrationWarning
      className={`${inter.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable} font-sans`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/torii-icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const t = localStorage.getItem('cd_ielts_theme');
                if (t === 'dark') {
                  document.documentElement.classList.add('dark');
                } else if (t === 'japanese') {
                  document.documentElement.classList.add('japanese');
                } else {
                  document.documentElement.classList.remove('dark', 'japanese');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-paper dark:bg-carbon text-stone-900 dark:text-stone-100 antialiased selection:bg-vermilion/15 selection:text-vermilion relative font-sans">
        {/* Subtle Physical Paper Grain Overlay */}
        <div className="fixed inset-0 pointer-events-none noise-overlay z-0" aria-hidden="true" />

        {/* Ambient Falling Sakura Petals */}
        <SakuraCanvas />

        <Navbar />
        <CommandPalette />
        <main className="flex-1 flex flex-col relative z-10">{children}</main>

        {/* Lucky Maneki-Neko Waving Back-To-Top Button */}
        <ManekiNeko mode="back-to-top" size={44} tooltip="Vẫy tay rước Band 8.5+! 🐾 (Lên đầu trang)" />
      </body>
    </html>
  );
}
