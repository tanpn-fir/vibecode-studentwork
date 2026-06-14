# Landing Page Bài Tập · Vibe Coding

Trang web mẫu (static: HTML/CSS/JS, không framework) cho workshop **Vibe Coding**.
Bạn sẽ nhờ **AI** chỉnh sửa trang này từng bước. Khi run lên, một **bảng Lộ trình
bài tập** hiện ở góc phải — làm xong nhiệm vụ nào, nó **tự tích xanh** nhiệm vụ đó,
và khi xong **tất cả**, một **giấy chứng nhận** đẹp tự hiện ra 🎉.

Trang **song ngữ Việt / English** — đổi bằng nút **🌐** ở góc trên phải.

> Bản demo trực tuyến: **https://vibecode-studentwork.vercel.app**

---

## 🚀 Cách bắt đầu (cho người mới)

1. Mở thư mục này trong **Antigravity** (hoặc IDE bất kỳ).
2. Bảo AI: **“Đọc file `setup-plan.md` và làm theo, xong thì tick done.”**
3. AI sẽ cài git / node / python… rồi chạy trang ở `http://localhost:5173`.
   > ⚠️ AI sẽ xin nhiều quyền → kiểm tra rồi **Accept** (hoặc bật **Auto mode**).
   > Vài bước cần bạn tự làm: nhập tên/email, đăng nhập GitHub trên trình duyệt,
   > nhập mật khẩu máy.

**Chạy nhanh (nếu đã có Node):**

```bash
npm run dev        # phục vụ tại http://localhost:5173
```

---

## 📂 Các file (chúng "nói chuyện" với nhau)

| File | Vai trò |
|---|---|
| `index.html` | Khung nội dung trang (chữ, nút, ảnh, form). |
| `styles.css` | Màu sắc & giao diện — biến `--brand` là **màu chủ đạo**. |
| `app.js` | Tính năng trang — **có 1 lỗi cố ý** + cảnh báo "API key bị lộ". |
| `config.js` | Có 1 API key bị **hardcode** (bài tập đưa vào `.env`). |
| `i18n.js` | Song ngữ VI/EN + nút 🌐 — **không cần sửa**. |
| `guide.js` | Bảng Lộ trình tự kiểm tra hoàn thành — **không cần sửa**. |
| `certificate.js` | Giấy chứng nhận hoàn thành — **không cần sửa**. |
| `assets/` | Ảnh, logo, video nền. |
| `setup-plan.md` | Plan cho **AI** đọc & cài đặt toàn bộ môi trường. |
| `AGENTS.md` | Hướng dẫn cho **AI** đóng vai coach: đọc code, run, dẫn bạn làm bài tập. |

---

## ✅ Lộ trình bài tập (khớp số bài trên slide)

| Bài | Nhiệm vụ | Tự kiểm tra |
|---|---|---|
| **3** | Chạy được trang trên localhost | tự động |
| **3.1** | Đổi tên thương hiệu → “Apero”, đổi tiêu đề, đổi màu chủ đạo sang **tím** (`--brand`) | tự động |
| **3.2** | Thêm logo / ảnh của bạn (thay `#logo`) | tự động |
| **3.3** | Sửa lỗi: **F12 → Console**, copy lỗi đỏ, gửi AI nhờ sửa | tự động |
| **5** | Commit bằng Git; thử quay về commit đầu ↔ commit mới nhất | tự đánh dấu |
| **5.1** | Tạo repo **Private** trên GitHub | tự đánh dấu |
| **5.2** | Push code lên repo riêng | tự đánh dấu |
| **6** | Deploy lên Vercel (mở qua link `*.vercel.app` → tự tích xanh) | tự động |
| **7** | Đưa API key trong `config.js` vào `.env` → cảnh báo đỏ chuyển **xanh** | tự động |

> Bài tập 1 (làm trang “Email Support” từ đầu) và Bài 2 (clone repo này) làm trên
> slide — không cần file mẫu ở đây.

---

## 🔐 Bài 7 — API key bị lộ

`config.js` đang **hardcode** một API key. Trang in thẳng key ra màn hình trong
một **cảnh báo đỏ** "API KEY ĐANG BỊ LỘ". Khi bạn nhờ AI chuyển key ra file `.env`
(để `config.js` không còn chứa key thật) và thêm `.env` vào `.gitignore`, cảnh báo
sẽ **tự đổi sang xanh** "có thể đã an toàn ^^" và Bài 7 trên Lộ trình tự tích xanh.

## 🏆 Giấy chứng nhận

Hoàn thành **tất cả** nhiệm vụ → giấy chứng nhận tự hiện. Bạn nhập **tên** + **ảnh**,
rồi **Tải về (In / PDF)**.
*(Mentor: xem trước nhanh bằng nút 🏆 góc dưới-trái, hoặc mở `?cert=1`.)*

---

## 💡 Mẹo ra lệnh cho AI

Nói rõ bạn muốn gì + để AI tự tìm chỗ. Ví dụ:
> “Đổi màu chủ đạo của trang sang tông tím, tự tìm chỗ định nghĩa màu rồi sửa giúp tôi.”
