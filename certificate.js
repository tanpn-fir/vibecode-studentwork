/* ===========================================================================
   GIẤY CHỨNG NHẬN  ·  CERTIFICATE
   - Tự xuất hiện khi học viên hoàn thành TẤT CẢ bài trong Lộ trình.
   - Học viên nhập TÊN → hiện giấy chứng nhận đẹp, có logo Apero, tải về (In / PDF).
   - Backdoor: nút 🏆 nhỏ góc dưới-trái (luôn có) + deep-link ?cert=1
     để mentor xem trước / giới thiệu cho học viên.
   - Song ngữ Việt / English (theo nút 🌐).
   File này KHÔNG cần sửa.
   =========================================================================== */
(function () {
  "use strict";

  function t(o) {
    if (window.VibeI18N) return window.VibeI18N.t(o);
    return o && typeof o === "object" ? o.vi : o;
  }

  var TX = {
    kicker: { vi: "GIẤY CHỨNG NHẬN", en: "CERTIFICATE" },
    title: { vi: "Hoàn thành khoá Vibe Coding", en: "Vibe Coding Completion" },
    certifies: { vi: "Chứng nhận rằng", en: "This certifies that" },
    namePh: { vi: "Nhập tên của bạn", en: "Enter your name" },
    body: {
      vi: "đã hoàn thành trọn vẹn lộ trình Vibe Coding — từ con số 0 đến việc deploy một website thật lên internet.",
      en: "has completed the full Vibe Coding journey — from zero to deploying a real website live on the internet.",
    },
    skills: {
      vi: "Vibe Coding · Git · GitHub · Vercel · Bảo mật .env",
      en: "Vibe Coding · Git · GitHub · Vercel · .env security",
    },
    dateLabel: { vi: "Ngày cấp", en: "Date" },
    signRole: { vi: "Mentor · Apero", en: "Mentor · Apero" },
    nameField: { vi: "Tên trên chứng nhận", en: "Name on certificate" },
    download: { vi: "⬇️ Tải về (In / PDF)", en: "⬇️ Download (Print / PDF)" },
    close: { vi: "Đóng", en: "Close" },
    backdoor: { vi: "Xem thử giấy chứng nhận (mentor)", en: "Preview certificate (mentor)" },
  };

  var state = { name: "" };

  function fmtDate() {
    try {
      var d = new Date();
      var lang = window.VibeI18N ? window.VibeI18N.lang : "vi";
      return d.toLocaleDateString(lang === "vi" ? "vi-VN" : "en-GB", {
        day: "2-digit", month: "long", year: "numeric",
      });
    } catch (e) {
      return "";
    }
  }

  var overlay;

  function buildOnce() {
    if (overlay) return;
    overlay = document.createElement("div");
    overlay.id = "certOverlay";
    overlay.className = "cert-overlay";
    overlay.hidden = true;
    overlay.innerHTML =
      '<div class="cert-modal" role="dialog" aria-modal="true">' +
        '<button class="cert-x" type="button" aria-label="Close">✕</button>' +

        '<div class="cert-controls">' +
          '<label class="cert-ctrl-name"><span data-c="nameField"></span>' +
            '<input id="certName" type="text" autocomplete="name" /></label>' +
          '<button id="certDownload" class="cert-dl" type="button"></button>' +
        '</div>' +

        '<div class="cert-paper" id="certPaper">' +
          '<div class="cert-frame">' +
            '<div class="cert-corner tl"></div><div class="cert-corner tr"></div>' +
            '<div class="cert-corner bl"></div><div class="cert-corner br"></div>' +
            '<img class="cert-logo" src="assets/apero-logo.svg" alt="Apero" />' +
            '<p class="cert-kicker" data-c="kicker"></p>' +
            '<h2 class="cert-title" data-c="title"></h2>' +
            '<div class="cert-rule"><span></span><b>★</b><span></span></div>' +
            '<p class="cert-certifies" data-c="certifies"></p>' +
            '<p class="cert-name" id="certNameOut"></p>' +
            '<p class="cert-body" data-c="body"></p>' +
            '<p class="cert-skills" data-c="skills"></p>' +
            '<div class="cert-foot">' +
              '<div class="cert-date"><small data-c="dateLabel"></small><b id="certDate"></b></div>' +
              '<div class="cert-seal"><span class="cert-seal-star">★</span><i class="cert-ribbon"></i></div>' +
              '<div class="cert-sign"><b>Phạm Nhật Tân</b><small data-c="signRole"></small></div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';
    document.body.appendChild(overlay);

    overlay.querySelector(".cert-x").addEventListener("click", close);
    overlay.addEventListener("click", function (e) { if (e.target === overlay) close(); });

    var nameInput = overlay.querySelector("#certName");
    nameInput.addEventListener("input", function () {
      state.name = nameInput.value;
      renderName();
    });

    overlay.querySelector("#certDownload").addEventListener("click", function () {
      window.print();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !overlay.hidden) close();
    });

    document.addEventListener("vibe:lang", function () { if (!overlay.hidden) applyText(); });
  }

  function renderName() {
    var out = overlay.querySelector("#certNameOut");
    out.textContent = state.name || t(TX.namePh);
    out.classList.toggle("empty", !state.name);
  }
  function applyText() {
    overlay.querySelectorAll("[data-c]").forEach(function (el) {
      el.textContent = t(TX[el.getAttribute("data-c")]);
    });
    overlay.querySelector("#certName").placeholder = t(TX.namePh);
    overlay.querySelector("#certDownload").textContent = t(TX.download);
    overlay.querySelector(".cert-x").setAttribute("aria-label", t(TX.close));
    overlay.querySelector("#certDate").textContent = fmtDate();
    renderName();
  }

  function open() {
    buildOnce();
    applyText();
    overlay.hidden = false;
    document.body.classList.add("cert-open");
    setTimeout(function () { overlay.classList.add("show"); }, 10);
    var n = overlay.querySelector("#certName");
    if (!state.name) setTimeout(function () { n.focus(); }, 250);
  }
  function close() {
    if (!overlay) return;
    overlay.classList.remove("show");
    document.body.classList.remove("cert-open");
    setTimeout(function () { overlay.hidden = true; }, 220);
  }

  window.VibeCert = { open: open, close: close };

  // backdoor: nút nhỏ góc dưới-trái cho mentor
  var bd = document.createElement("button");
  bd.id = "certBackdoor";
  bd.className = "cert-backdoor";
  bd.type = "button";
  bd.textContent = "🏆";
  bd.addEventListener("click", open);
  function syncBackdoorTitle() { bd.title = t(TX.backdoor); }
  syncBackdoorTitle();
  document.addEventListener("vibe:lang", syncBackdoorTitle);
  document.body.appendChild(bd);

  // deep-link ?cert=1 -> mở ngay (tiện kiểm tra)
  try {
    if (new URLSearchParams(location.search).get("cert") === "1") {
      setTimeout(open, 300);
    }
  } catch (e) {}
})();
