# CD-IELTS Writing Simulator & AI Examiner (Inspera UI)

Nền tảng web luyện thi IELTS Writing (Task 1 & Task 2) mô phỏng 100% giao diện thi thật trên máy tính (CD-IELTS Inspera - British Council & IDP), tích hợp trợ lý Giám khảo AI sử dụng **Google Gemini 2.5 Flash** (hỗ trợ Multimodal Vision đọc ảnh biểu đồ) và cơ sở dữ liệu **Supabase**.

---

## 🌟 Tính Năng Nổi Bật

### 1. 3 Chế Độ Luyện Thi Chuẩn Phòng Thi
- **Task 1 Academic (20 phút, tối thiểu 150 từ)**: Chấm theo tiêu chí TA (Task Achievement), CC, LR, GRA.
- **Task 2 Essay (40 phút, tối thiểu 250 từ)**: Chấm theo tiêu chí TR (Task Response), CC, LR, GRA.
- **Thi Thử Full Test (60 phút)**: Thanh điều hướng `Part 1` và `Part 2` ở đáy màn hình. Điểm Overall Writing tính theo công thức chuẩn: làm tròn 0.5 gần nhất của `(Task 1 + Task 2 * 2) / 3`.

### 2. Giao Diện CD-IELTS Inspera 100%
- **Khung soạn thảo chuyên dụng**: Tắt hoàn toàn gạch chân đỏ kiểm tra chính tả (`spellCheck={false}`).
- **Bộ đếm từ thời gian thực (Real-time Word Counter)**: Đổi màu xanh khi đạt mốc tối thiểu.
- **Đồng hồ đếm ngược**: Nút ẩn/hiện giờ, đổi màu đỏ và cảnh báo nhấp nháy khi còn dưới 5 phút.
- **Tùy chỉnh hỗ trợ thi (Accommodations)**: 
  - Cỡ chữ: Normal / Large / Extra Large.
  - Chế độ tương phản cao: Đen trên Trắng, Trắng trên Đen, và **Vàng trên Đen (Yellow on Black)** chuẩn Inspera.
- **Text Highlighter**: Cho phép bôi đen từ khóa quan trọng ở cột đề bài để tô vàng.
- **Khung ghi chú/dàn ý (Scratchpad)**: Hỗ trợ lập dàn ý không ảnh hưởng bài thi chính thức.
- **Tự động lưu nháp (Auto-save)**: Lưu vào `localStorage` mỗi 3 giây.

### 3. Kho Đề Mẫu & Tự Nhập Đề (Custom Prompt)
- **3 đề mẫu Task 1**: Line Graph, Bar Chart, Pie Chart render tương tác bằng `Recharts` kèm bảng số liệu chi tiết.
- **3 đề mẫu Task 2**: Opinion, Discussion, Problem & Solution.
- **Tự nhập đề**: Dán câu hỏi tự do & Tải lên ảnh biểu đồ/bản đồ/quy trình riêng (hệ thống tự động nén bằng HTML5 Canvas `< 500KB` trước khi gửi lên Gemini Multimodal Vision).

### 4. Hệ Thống Chấm Điểm AI Examiner (Gemini 2.5 Flash)
- Đóng vai cựu giám khảo IELTS IDP/British Council khắt khe:
  - Phạt điểm TA/TR nếu dưới số từ quy định.
  - Kiểm tra Overview, độ chính xác số liệu trích dẫn (Task 1).
  - Kiểm tra Thesis statement, độ sâu luận điểm và ví dụ (Task 2).
- Highlight trực tiếp các câu sai ngữ pháp/từ vựng/liên kết trên bài viết với giải thích tiếng Việt chi tiết.
- Gợi ý nâng cấp từ vựng học thuật C1/C2 (Collocations & Context).
- Cung cấp bài viết mẫu Band 8.5+ hoàn chỉnh bám sát đề thi và ý tưởng của thí sinh.

### 5. Tiện Ích Chống Lỗi & Hạn Mức (Vercel Free Ready)
- `export const maxDuration = 60;` chống lỗi Timeout 504 trên Vercel.
- Nén ảnh Canvas chống lỗi 413 Payload Too Large.
- Chống spam: Giới hạn tối đa 3 lần gửi chấm trong 5 phút.
- **Chế độ BYOK (Bring Your Own Key)**: Nút cài đặt trên Header cho phép người dùng tự điền Gemini API Key cá nhân miễn phí.
- **In / Xuất PDF**: Nút in bài chấm chuẩn vector sạch đẹp trên trang kết quả.
- **Lưu trữ kép (Dual Storage)**: Đồng bộ Supabase nếu đã đăng nhập; tự động fallback LocalStorage nếu ở chế độ khách.

---

## 🛠️ Tech Stack
- **Framework**: Next.js 14 (App Router), TypeScript, Tailwind CSS.
- **UI & Icons**: Lucide React, clsx, tailwind-merge.
- **Data Visualization**: Recharts (LineChart, BarChart, PieChart, AreaChart).
- **AI Model**: Google Gemini 2.5 Flash (`@google/generative-ai`).
- **Database & Auth**: Supabase (`@supabase/supabase-js`, `@supabase/ssr`).

---

## 🚀 Cài Đặt & Chạy Môi Trường Local

```bash
# 1. Cài đặt dependencies
npm install

# 2. Cấu hình file .env.local
cp .env.example .env.local

# 3. Khởi chạy server phát triển
npm run dev
```

Mở trình duyệt tại [http://localhost:3000](http://localhost:3000).
