import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/navbar/Navbar';

export const metadata: Metadata = {
  title: 'CD-IELTS Writing Simulator | Nền tảng Luyện thi IELTS Chuẩn Inspera',
  description:
    'Luyện thi IELTS Writing Task 1 & Task 2 mô phỏng 100% giao diện thi thật CD-IELTS Inspera. Chấm điểm chi tiết với AI Gemini 2.5 theo tiêu chí chuẩn British Council & IDP.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-slate-100">
        <Navbar />
        <main className="flex-1 flex flex-col">{children}</main>
      </body>
    </html>
  );
}
