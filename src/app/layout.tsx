import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/navbar/Navbar';

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

import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  variable: '--font-inter',
});

import SakuraCanvas from '@/components/japanese/SakuraCanvas';
import ManekiNeko from '@/components/japanese/ManekiNeko';
import PixelCompanion from '@/components/pixel-companion/PixelCompanion';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning className={inter.variable}>
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
      <body className={`${inter.className} min-h-screen flex flex-col bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-slate-100 antialiased relative`}>
        {/* Ambient Falling Sakura Petals */}
        <SakuraCanvas />

        <Navbar />
        <main className="flex-1 flex flex-col">{children}</main>

        {/* 55 Pixel Companion with Interactive Speech Bubbles & Settings */}
        <PixelCompanion />

        {/* Lucky Maneki-Neko Waving Back-To-Top Button */}
        <ManekiNeko mode="back-to-top" size={44} tooltip="Vẫy tay rước Band 8.5+! 🐾 (Lên đầu trang)" />
      </body>
    </html>
  );
}
