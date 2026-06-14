/* ===========================================================================
   I18N — song ngữ Việt / English cho landing page.
   - Văn bản tĩnh đánh dấu bằng data-i18n="key" (hoặc data-i18n-ph cho placeholder).
   - guide.js dùng window.VibeI18N.lang + sự kiện "vibe:lang" để tự dựng lại.
   - QUAN TRỌNG: chỉ dịch lại phần text NÀO đang còn là bản mặc định. Nếu học viên
     đã sửa (vd đổi tiêu đề / tên thương hiệu), giữ nguyên — không ghi đè.
   File này KHÔNG cần sửa.
   =========================================================================== */
(function () {
  "use strict";

  var KEY = "vibecode-lang";

  // Từ điển cho văn bản tĩnh trong index.html
  var DICT = {
    vi: {
      title: "Landing Page Bài Tập · Vibe Coding",
      brand: "BRAND X",
      navFeatures: "Tính năng",
      navContact: "Liên hệ",
      navSlides: "📑 Slide bài học ↗",
      navStart: "Bắt đầu",
      heroEyebrow: "Trang web của bạn",
      headline: "Tiêu đề mẫu — hãy yêu cầu AI đổi câu này",
      heroSub:
        "Mỗi đoạn chữ, mỗi màu, mỗi tấm ảnh đều nằm trong các file. Nhờ AI chỉnh sửa và xem điều kỳ diệu — làm theo Lộ trình bên phải nhé.",
      btnPrimary: "Nút chính",
      btnLearn: "Tìm hiểu thêm",
      f1Title: "Nhanh",
      f1Body: "Dựng trang trong vài phút bằng cách ra lệnh cho AI.",
      f2Title: "Dễ sửa",
      f2Body: "Đổi chữ, đổi màu, đổi ảnh — tất cả chỉ là sửa văn bản trong file.",
      visitTitle: "Lượt ghé thăm",
      visitNote: "(đang lỗi — mở F12 xem Console)",
      contactTitle: "Liên hệ",
      emailPh: "Email của bạn",
      sendBtn: "Gửi",
      footerText: " · Trang mẫu cho workshop Vibe Coding",
      guideToggle: "Lộ trình",
    },
    en: {
      title: "Exercise Landing Page · Vibe Coding",
      brand: "BRAND X",
      navFeatures: "Features",
      navContact: "Contact",
      navSlides: "📑 Lecture slides ↗",
      navStart: "Get started",
      heroEyebrow: "Your website",
      headline: "Sample headline — ask the AI to change this line",
      heroSub:
        "Every line of text, every color, every image lives in a file. Ask the AI to edit them and watch the magic — just follow the Roadmap on the right.",
      btnPrimary: "Primary button",
      btnLearn: "Learn more",
      f1Title: "Fast",
      f1Body: "Build a page in minutes just by commanding the AI.",
      f2Title: "Easy to edit",
      f2Body: "Change text, colors, images — it's all just editing text in files.",
      visitTitle: "Visit count",
      visitNote: "(broken — open F12 and check the Console)",
      contactTitle: "Contact",
      emailPh: "Your email",
      sendBtn: "Send",
      footerText: " · Sample page for the Vibe Coding workshop",
      guideToggle: "Roadmap",
    },
  };

  var lang = "vi";
  try {
    var saved = localStorage.getItem(KEY);
    if (saved === "vi" || saved === "en") lang = saved;
  } catch (e) {}
  // cho phép deep-link ?lang=en / ?lang=vi (tiện chia sẻ & kiểm tra)
  try {
    var q = new URLSearchParams(location.search).get("lang");
    if (q === "vi" || q === "en") lang = q;
  } catch (e) {}

  function norm(s) {
    return (s || "").replace(/\s+/g, " ").trim();
  }
  // Tập các bản mặc định của 1 key (mọi ngôn ngữ) — để biết text có bị sửa chưa.
  function defaultsOf(key) {
    return [norm(DICT.vi[key]), norm(DICT.en[key])];
  }

  function apply() {
    document.documentElement.lang = lang;
    if (DICT[lang].title) document.title = DICT[lang].title;

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var k = el.getAttribute("data-i18n");
      if (DICT[lang][k] == null) return;
      // chỉ ghi đè nếu text hiện tại vẫn là 1 bản mặc định (chưa bị học viên sửa)
      if (defaultsOf(k).indexOf(norm(el.textContent)) === -1) return;
      el.textContent = DICT[lang][k];
    });

    document.querySelectorAll("[data-i18n-ph]").forEach(function (el) {
      var k = el.getAttribute("data-i18n-ph");
      if (DICT[lang][k] != null) el.setAttribute("placeholder", DICT[lang][k]);
    });

    var label = document.getElementById("langLabel");
    if (label) label.textContent = lang === "vi" ? "EN" : "VI";
  }

  function set(l) {
    if (l !== "vi" && l !== "en") return;
    lang = l;
    try {
      localStorage.setItem(KEY, l);
    } catch (e) {}
    apply();
    document.dispatchEvent(new CustomEvent("vibe:lang", { detail: lang }));
  }

  function toggle() {
    set(lang === "vi" ? "en" : "vi");
  }

  window.VibeI18N = {
    get lang() {
      return lang;
    },
    set: set,
    toggle: toggle,
    apply: apply,
    // các bản mặc định (mọi ngôn ngữ) của 1 key — guide.js dùng để dò "đã sửa chưa"
    defaultsOf: defaultsOf,
    // resolve {vi, en} -> chuỗi theo ngôn ngữ hiện tại
    t: function (o) {
      if (o && typeof o === "object") return o[lang] != null ? o[lang] : o.vi;
      return o;
    },
  };

  // nút đổi ngôn ngữ
  var btn = document.getElementById("langToggle");
  if (btn) btn.addEventListener("click", toggle);

  apply();
})();
