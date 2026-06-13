# SETUP — Hướng dẫn cho AI cài đặt môi trường

> 🤖 **Dành cho AI (Claude / Codex trong Antigravity).**
> Người dùng là người MỚI HỌC, gần như chưa biết gì về lập trình. Hãy thực hiện
> tuần tự các bước dưới đây, **giải thích ngắn gọn bằng tiếng Việt** trước mỗi
> bước, tự chạy lệnh giúp họ, và **xin phép** khi cần quyền. Nếu một công cụ đã
> có sẵn thì bỏ qua bước cài. Cuối cùng phải xác nhận mọi thứ đã sẵn sàng.

## 0. Nhận diện máy
- Xác định hệ điều hành (macOS / Windows / Linux) và trình quản lý gói phù hợp
  (macOS: Homebrew; Windows: winget/choco; Linux: apt/dnf…).
- Báo cho người dùng biết bạn sắp cài những gì.

## 1. Công cụ dòng lệnh (command line) cơ bản
- Đảm bảo có terminal hoạt động.
- macOS: nếu thiếu, cài Command Line Tools (`xcode-select --install`).
- Windows: ưu tiên dùng PowerShell; cài `winget` nếu chưa có.

## 2. Git
- Kiểm tra: `git --version`. Nếu chưa có thì cài.
- Cấu hình tên & email nếu chưa có:
  - `git config --global user.name "<Tên người dùng>"`
  - `git config --global user.email "<email người dùng>"`
- Hỏi người dùng tên + email để điền.
- Đăng nhập GitHub trên máy: hướng dẫn cài & dùng `gh` (GitHub CLI) →
  `gh auth login` (hoặc thiết lập SSH/credential helper). Giải thích đây là bước
  để máy được phép đẩy/kéo code với GitHub.

## 3. Node.js (kèm npm)
- Kiểm tra: `node -v` và `npm -v`.
- Nếu chưa có, cài Node bản LTS (khuyến nghị qua `nvm` để dễ quản lý phiên bản).
- Mục tiêu: `node -v` ≥ 18.

## 4. Python
- Kiểm tra: `python3 --version`.
- Nếu chưa có, cài Python 3 (bản ổn định mới nhất).
- Đảm bảo `pip` hoạt động (`python3 -m pip --version`).

## 5. Chạy trang web mẫu (dự án này)
Đây là một trang web tĩnh (HTML/CSS/JS) — không cần build phức tạp.
- Cài phụ thuộc (nếu cần): `npm install`.
- Chạy ở chế độ xem trước: `npm run dev`
  (script này dùng `serve` để mở web ở địa chỉ http://localhost:5173).
- Mở địa chỉ localhost đó trên trình duyệt cho người dùng xem.
- Nếu cổng bận, chọn cổng khác và báo lại địa chỉ mới.

## 6. (Tuỳ chọn) Next.js cho dự án lớn hơn
Nếu buổi học cần một dự án Next.js đầy đủ, hãy hướng dẫn tạo bằng
`npx create-next-app@latest` ở một thư mục khác, và giải thích khác biệt với
trang tĩnh này.

## 7. Kiểm tra lần cuối
In ra một bảng tóm tắt trạng thái cho người dùng, ví dụ:

| Công cụ | Phiên bản | OK? |
|--------|-----------|-----|
| git    | …         | ✅  |
| node   | …         | ✅  |
| npm    | …         | ✅  |
| python | …         | ✅  |
| gh (GitHub) | đã đăng nhập | ✅ |

- Xác nhận trang mẫu đã mở được trên localhost.
- Nhắc người dùng mở `README.md` để biết các bài tập tiếp theo.

> Sau khi xong, hãy nói: *"Môi trường đã sẵn sàng. Bạn mở README.md để bắt đầu
> các bài tập nhé."*
