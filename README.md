# Landing Page Bài Tập · Vibe Coding

Trang web mẫu cho buổi workshop. Bạn sẽ nhờ **AI** chỉnh sửa trang này từng bước.
Khi run lên, một **bảng Nhiệm vụ** hiện ở góc phải — làm xong nhiệm vụ nào,
nó **tự tích xanh** nhiệm vụ đó.

## 🚀 Cách bắt đầu (cho người mới)

1. Mở thư mục này trong **Antigravity**.
2. Bảo AI: **“Đọc file SETUP.md và cài đặt giúp tôi toàn bộ môi trường (git, node, python…), rồi chạy trang lên.”**
3. AI sẽ cài mọi thứ và mở trang ở `http://localhost:5173`.

> Chạy nhanh (nếu đã có Node): `npm run dev`

## 📂 Các file (chúng "nói chuyện" với nhau)

| File | Vai trò |
|------|---------|
| `index.html` | Khung nội dung trang (chữ, nút, ảnh) |
| `styles.css` | Màu sắc & giao diện (biến `--brand` là màu chủ đạo) |
| `app.js` | Tính năng của trang — **có 1 lỗi cố ý** để luyện sửa bug |
| `config.js` | Có 1 API key bị **hardcode** — bài tập đưa vào `.env` |
| `missions.js` | Bảng nhiệm vụ tự kiểm tra (**không cần sửa**) |
| `assets/` | Ảnh, logo |
| `SETUP.md` | Hướng dẫn cho **AI** cài đặt môi trường |

## ✅ Các nhiệm vụ (ứng với bài tập trên slide)

- **Bài 2** — Chạy được trang trên localhost.
- **Bài 2.1** — Đổi tên thương hiệu thành “Apero”, đổi tiêu đề, đổi màu chủ đạo sang **tím** (`--brand` trong `styles.css`).
- **Bài 2.2** — Thêm logo / ảnh của bạn (thay `#logo` trong `index.html`).
- **Bài 2.3** — Sửa lỗi: mở **F12 → Console**, copy dòng lỗi đỏ, gửi AI nhờ sửa.
- **Bài 4** — Lưu mốc (commit) bằng Git.
- **Bài 4.1** — Push code lên GitHub (repo Private).
- **Bài 5** — Deploy lên Vercel (mở qua link `*.vercel.app` → tự tích xanh).
- **Bài 6** — Đưa API key trong `config.js` vào file `.env`.

> Bài 1 (làm một trang HTML “Email Support”) làm từ đầu, không cần file mẫu ở đây.

## 💡 Mẹo ra lệnh cho AI
Nói rõ bạn muốn gì + file nào. Ví dụ:
> “Trong `styles.css`, đổi biến `--brand` sang màu tím (#7c3aed) rồi cho tôi xem lại.”
