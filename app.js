/* ===========================================================================
   TÍNH NĂNG CỦA TRANG
   ⚠️ Ở ĐÂY CÓ MỘT LỖI CỐ Ý (cho Bài tập 2.3).
   Khi chạy trang, mở F12 → tab Console, bạn sẽ thấy một dòng lỗi MÀU ĐỎ.
   Hãy COPY dòng lỗi đó và gửi cho AI, nhờ nó sửa giúp.
   =========================================================================== */

// Tính năng: hiển thị số "lượt ghé thăm" lên trang.
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

setupVisitCounter();

// Hiển thị thông tin "API" ở footer (liên quan Bài tập 6 — API key đang hardcode).
(function showApiInfo() {
  var el = document.getElementById("apiInfo");
  if (el && typeof API_KEY === "string") {
    el.textContent = "API key (demo): " + API_KEY.slice(0, 10) + "••••••";
  }
})();
