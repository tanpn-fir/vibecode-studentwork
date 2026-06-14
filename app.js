/* ===========================================================================
   TÍNH NĂNG CỦA TRANG  ·  PAGE FEATURES
   ⚠️ Ở ĐÂY CÓ MỘT LỖI CỐ Ý (cho Bài tập 3.3).
   Khi chạy trang, mở F12 → tab Console, bạn sẽ thấy một dòng lỗi MÀU ĐỎ.
   Hãy COPY dòng lỗi đó và gửi cho AI, nhờ nó sửa giúp.

   ⚠️ THERE IS AN INTENTIONAL BUG HERE (for Exercise 3.3).
   Run the page, open F12 → Console, and you'll see a RED error line.
   Copy that error and send it to the AI to fix.
   =========================================================================== */

// Tính năng: hiển thị số "lượt ghé thăm" lên trang.
// Lưu ý: hàm này được gọi Ở CUỐI FILE (sau khi mọi thứ khác đã chạy), vì nó CỐ Ý
// gây lỗi — gọi cuối để dòng lỗi đỏ vẫn hiện ở Console nhưng không chặn phần khác.
function setupVisitCounter() {
  var el = document.getElementById("visitCount");
  if (!el) return;

  // BUG: hàm getVisitCount() chưa được định nghĩa ở đâu cả -> trang sẽ báo lỗi.
  // (Gợi ý cho AI: hãy tạo hàm getVisitCount trả về một con số.)
  el.textContent = getVisitCount();

  // Khi sửa xong, dòng chú thích "đang lỗi" sẽ được ẩn đi.
  var note = document.querySelector(".visit-note");
  if (note) note.style.display = "none";
}

/* ===========================================================================
   BÀI 7 — CẢNH BÁO API KEY BỊ LỘ  ·  EXERCISE 7 — EXPOSED API KEY ALERT
   - Nếu API_KEY vẫn còn là một secret ghi cứng (bắt đầu bằng "sk-") -> hiện
     cảnh báo ĐỎ, in cả key ra màn hình ("key của bạn đang bị lộ").
   - Khi học viên chuyển key ra .env (config.js không còn secret) -> tự đổi sang
     trạng thái XANH "key của bạn CÓ THỂ đã an toàn ^^".
   =========================================================================== */

// Key có đang bị lộ (hardcode) không? — dùng cả cho Lộ trình ở guide.js.
function isKeyExposed() {
  try {
    return typeof API_KEY === "string" && /^sk-[A-Za-z0-9_-]{8,}$/.test(API_KEY.trim());
  } catch (e) {
    // API_KEY không còn tồn tại (đã bỏ khỏi config.js) -> coi như an toàn
    return false;
  }
}
window.isKeyExposed = isKeyExposed;
window.isKeySecured = function () {
  return !isKeyExposed();
};

var KEY_TEXT = {
  exposedTag: { vi: "⚠️ API KEY ĐANG BỊ LỘ", en: "⚠️ API KEY EXPOSED" },
  exposedMsg: {
    vi: "Key dưới đây đang ghi cứng trong code — ai mở source cũng đọc được:",
    en: "The key below is hardcoded in your code — anyone reading the source can see it:",
  },
  exposedHint: {
    vi: "Nhiệm vụ Bài 7: nhờ AI chuyển key này ra file .env (và thêm .env vào .gitignore).",
    en: "Exercise 7: ask the AI to move this key into a .env file (and add .env to .gitignore).",
  },
  safeTag: { vi: "🔒 Đã an toàn hơn", en: "🔒 Safer now" },
  safeMsg: {
    vi: "Không còn key ghi cứng trong code nữa — key của bạn “có thể” đã được bảo mật ^^",
    en: "No hardcoded key left in the code — your key “might” be secured now ^^",
  },
};

function tr(o) {
  if (window.VibeI18N) return window.VibeI18N.t(o);
  return o.vi;
}

function renderKeyAlert() {
  var box = document.getElementById("keyAlert");
  if (!box) return;
  box.hidden = false;

  if (isKeyExposed()) {
    box.className = "key-alert exposed";
    box.innerHTML =
      '<span class="key-alert-tag"></span>' +
      '<p class="key-alert-msg"></p>' +
      '<code class="key-alert-code"></code>' +
      '<p class="key-alert-hint"></p>';
    box.querySelector(".key-alert-tag").textContent = tr(KEY_TEXT.exposedTag);
    box.querySelector(".key-alert-msg").textContent = tr(KEY_TEXT.exposedMsg);
    box.querySelector(".key-alert-code").textContent = String(API_KEY);
    box.querySelector(".key-alert-hint").textContent = tr(KEY_TEXT.exposedHint);
  } else {
    box.className = "key-alert safe";
    box.innerHTML =
      '<span class="key-alert-tag"></span>' + '<p class="key-alert-msg"></p>';
    box.querySelector(".key-alert-tag").textContent = tr(KEY_TEXT.safeTag);
    box.querySelector(".key-alert-msg").textContent = tr(KEY_TEXT.safeMsg);
  }
}

renderKeyAlert();
// dịch lại banner khi đổi ngôn ngữ
document.addEventListener("vibe:lang", renderKeyAlert);

// ⚠️ GỌI CUỐI CÙNG — hàm này CỐ Ý gây lỗi (Bài 3.3). Đặt ở cuối để lỗi đỏ vẫn
// hiện trong Console mà không chặn cảnh báo key / banner phía trên.
setupVisitCounter();
