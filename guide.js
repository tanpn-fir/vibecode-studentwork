/* ===========================================================================
   LỘ TRÌNH BÀI TẬP TƯƠNG TÁC
   - Bài đã xong: tích ✓.  Bài hiện tại: tự mở, kèm hướng dẫn + prompt.
   - Bấm vào một bài: mở hướng dẫn VÀ tô sáng đúng component trên trang.
   - Nút thu gọn/hiện thanh Lộ trình.
   File này KHÔNG cần sửa. Bạn chỉ sửa: index.html, styles.css, app.js, config.js.
   =========================================================================== */
(function () {
  "use strict";

  var DEFAULT_HEADLINE = "Tiêu đề mẫu — hãy yêu cầu AI đổi câu này";

  function text(sel) {
    var el = document.querySelector(sel);
    return el ? (el.textContent || "").trim() : "";
  }
  function brandRgb() {
    var raw = getComputedStyle(document.documentElement).getPropertyValue("--brand").trim();
    var p = document.createElement("span");
    p.style.color = raw; document.body.appendChild(p);
    var rgb = getComputedStyle(p).color; p.remove();
    return rgb;
  }
  function isPurple() {
    var m = brandRgb().match(/\d+/g); if (!m) return false;
    var r = +m[0] / 255, g = +m[1] / 255, b = +m[2] / 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
    if (d < 0.08) return false;
    var h = 0;
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h = Math.round(h * 60); if (h < 0) h += 360;
    return h >= 250 && h <= 330;
  }
  function logoChanged() {
    var img = document.querySelector("#logo"); if (!img) return false;
    var src = img.getAttribute("src") || "";
    return src.indexOf("logo-placeholder") === -1 && img.naturalWidth > 0;
  }
  function bugFixed() {
    var v = text("#visitCount");
    return v !== "" && v !== "—" && !isNaN(parseInt(v, 10));
  }

  // tag = số bài (khớp slide); target = component sẽ tô sáng khi bấm bài.
  var TASKS = [
    { id: "run", tag: "Bài 3", title: "Chạy được trang",
      instruct: "Trang đã chạy và bạn đang xem nó. 🎉 Nếu chưa thấy, bảo AI chạy giúp ở chế độ dev.",
      prompt: "Hãy chạy giúp tôi trang web này ở chế độ xem trước (dev) và cho tôi địa chỉ localhost để mở trên trình duyệt.",
      auto: function () { return true; } },

    { id: "name", tag: "Bài 3.1", title: 'Đổi tên thành “Apero”', target: "#brandName",
      instruct: "Mở <code>index.html</code>, tìm <code>#brandName</code> (và <code>#brandFooter</code>), đổi thành <b>Apero</b>.",
      prompt: "Trong file index.html, đổi tên thương hiệu (#brandName và #brandFooter) thành 'Apero'. Chỉ sửa đúng chỗ đó, giữ nguyên phần còn lại, rồi cho tôi xem lại.",
      auto: function () { return text("#brandName").toLowerCase() === "apero"; } },

    { id: "headline", tag: "Bài 3.1", title: "Đổi tiêu đề chính", target: "#headline",
      instruct: "Trong <code>index.html</code>, đổi nội dung <code>#headline</code> thành câu của bạn.",
      prompt: "Trong index.html, đổi nội dung tiêu đề chính (#headline) thành câu tôi sẽ đọc cho bạn. Cho tôi xem lại kết quả.",
      auto: function () { var t = text("#headline"); return t !== "" && t !== DEFAULT_HEADLINE; } },

    { id: "color", tag: "Bài 3.1", title: "Đổi màu chủ đạo sang TÍM", target: ".hero-actions .btn",
      instruct: "Trong <code>styles.css</code>, đổi biến <code>--brand</code> sang màu tím (vd <code>#7c3aed</code>).",
      prompt: "Trong styles.css, đổi biến --brand sang màu tím (#7c3aed). Giải thích ngắn gọn biến đó ảnh hưởng tới những phần nào trên trang.",
      auto: isPurple },

    { id: "logo", tag: "Bài 3.2", title: "Thêm logo / ảnh của bạn", target: "#logo",
      instruct: "Bỏ ảnh vào thư mục <code>assets</code>, rồi đổi <code>src</code> của <code>#logo</code> trong <code>index.html</code>.",
      prompt: "Tôi vừa bỏ ảnh tên logo.png vào thư mục assets. Hãy thay logo (#logo trong index.html) bằng ảnh này và giải thích đường dẫn ảnh hoạt động thế nào.",
      auto: logoChanged },

    { id: "bug", tag: "Bài 3.3", title: "Sửa lỗi “Lượt ghé thăm”", target: ".visit-card",
      instruct: "Mở <b>F12 → Console</b>, copy dòng lỗi <b>màu đỏ</b>, dán cho AI nhờ sửa.",
      prompt: "Trang đang lỗi ở widget 'Lượt ghé thăm'. Tôi mở F12 → Console và copy được lỗi sau, đọc giúp và sửa:\n\n<dán đoạn log lỗi màu đỏ vào đây>\n\nGiải thích ngắn gọn nguyên nhân rồi sửa đúng chỗ gây lỗi.",
      auto: bugFixed },

    { id: "commit", tag: "Bài 5", title: "Lưu mốc (commit) bằng Git",
      instruct: "Nhờ AI commit toàn bộ thay đổi, rồi xem lại lịch sử các mốc.",
      prompt: "Hãy giúp tôi lưu toàn bộ thay đổi hiện tại thành một mốc (commit) với mô tả 'Hoàn thành landing page'. Sau đó chỉ tôi cách xem lại lịch sử các mốc và cách quay về mốc cũ.",
      manual: true },

    { id: "push", tag: "Bài 5.1", title: "Push lên GitHub (Private)",
      instruct: "Tạo repo <b>Private</b> trên GitHub, rồi push code lên (tách khỏi repo gốc).",
      prompt: "Tôi đã tạo repo Private trên GitHub tên <điền-tên-repo>. Hãy đổi remote sang repo này để tách khỏi repo gốc, rồi push toàn bộ code lên.",
      manual: true },

    { id: "deploy", tag: "Bài 6", title: "Deploy lên Vercel",
      instruct: "Import repo vào Vercel & deploy. Mở trang qua link <code>*.vercel.app</code> sẽ tự tích xanh.",
      prompt: "Tôi đã đăng nhập Vercel bằng GitHub. Hướng dẫn tôi import repo <điền-tên-repo> và deploy ra link công khai. Giải thích vì sao mỗi lần push code mới thì Vercel tự deploy lại (CI/CD).",
      auto: function () { return /vercel\.app$/.test(location.hostname); } },

    { id: "env", tag: "Bài 7", title: "Đưa API key vào .env", target: "#apiInfo",
      instruct: "Chuyển API key trong <code>config.js</code> ra file <code>.env</code> cho an toàn.",
      prompt: "Trong config.js đang hardcode API_KEY. Hãy chuyển nó ra file .env, thêm .env vào .gitignore để không bị push lên GitHub, và hướng dẫn tôi khai báo key đó trong Environment Variables trên Vercel.",
      manual: true },
  ];

  var STORE = "vibecode-guide";
  function loadManual() { try { return JSON.parse(localStorage.getItem(STORE) || "{}"); } catch (e) { return {}; } }
  function saveManual(s) { try { localStorage.setItem(STORE, JSON.stringify(s)); } catch (e) {} }
  var manual = loadManual();

  function isDone(t) {
    if (t.manual) return !!manual[t.id];
    try { return !!t.auto(); } catch (e) { return false; }
  }

  // tô sáng + cuộn tới component trên trang
  var hlTimer;
  function focusTarget(sel) {
    if (!sel) return;
    var el = document.querySelector(sel);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    document.querySelectorAll(".hl-focus").forEach(function (e) { e.classList.remove("hl-focus"); });
    el.classList.add("hl-focus");
    clearTimeout(hlTimer);
    hlTimer = setTimeout(function () { el.classList.remove("hl-focus"); }, 2400);
  }

  var openIds = {};
  var lastCurrent = null;
  var refs = [];

  function buildOnce() {
    var root = document.getElementById("guide");
    if (!root) return;
    root.innerHTML =
      '<div class="guide-head"><span class="dot"></span><h2>Lộ trình bài tập</h2>' +
      '<button class="g-collapse" id="gCollapse" type="button" title="Ẩn thanh này" aria-label="Ẩn">✕</button></div>' +
      '<p class="guide-sub" id="gSub"></p>' +
      '<div class="g-progress"><i id="gBar"></i></div>' +
      '<div class="g-list" id="gList"></div>' +
      '<div class="g-done-banner" id="gBanner">🎉 Hoàn thành tất cả — bạn giỏi lắm!</div>';

    var list = document.getElementById("gList");
    TASKS.forEach(function (t) {
      var step = document.createElement("div");
      step.className = "g-step";
      step.innerHTML =
        '<div class="g-row">' +
          '<span class="g-check"></span>' +
          '<span class="g-meta"><span class="g-tag">' + t.tag + "</span>" +
          '<div class="g-title">' + t.title + "</div></span>" +
          '<span class="g-state"></span>' +
        "</div>" +
        '<div class="g-body">' +
          '<p class="g-instruct">' + t.instruct + "</p>" +
          (t.target ? '<button class="g-focus" type="button">🔎 Chỉ cho tôi trên trang</button>' : "") +
          '<button class="g-prompt-btn" type="button">✨ Xem prompt gửi AI</button>' +
          '<div class="g-prompt">' +
            '<div class="g-prompt-head"><span>Prompt — copy &amp; gửi AI</span>' +
            '<button class="g-copy" type="button">Copy</button></div>' +
            '<p class="g-prompt-text"></p>' +
          "</div>" +
          (t.manual ? '<button class="g-mark" type="button">Đánh dấu đã xong ✓</button>' : "") +
        "</div>";

      step.querySelector(".g-prompt-text").textContent = t.prompt;

      // bấm dòng tiêu đề: mở/đóng + tô sáng component
      step.querySelector(".g-row").addEventListener("click", function () {
        openIds[t.id] = !openIds[t.id];
        applyOpen();
        if (openIds[t.id]) focusTarget(t.target);
      });
      // nút "chỉ cho tôi trên trang"
      if (t.target) {
        step.querySelector(".g-focus").addEventListener("click", function () { focusTarget(t.target); });
      }
      step.querySelector(".g-prompt-btn").addEventListener("click", function () {
        step.querySelector(".g-prompt").classList.toggle("show");
      });
      step.querySelector(".g-copy").addEventListener("click", function (e) {
        var btn = e.currentTarget;
        navigator.clipboard.writeText(t.prompt).then(function () {
          btn.textContent = "Đã copy ✓";
          setTimeout(function () { btn.textContent = "Copy"; }, 1500);
        }).catch(function () {});
      });
      if (t.manual) {
        step.querySelector(".g-mark").addEventListener("click", function () {
          manual[t.id] = true; saveManual(manual); refresh();
        });
      }

      list.appendChild(step);
      refs.push({ task: t, el: step });
    });
  }

  function applyOpen() {
    refs.forEach(function (r) {
      r.el.classList.toggle("open", !!openIds[r.task.id]);
    });
  }

  function refresh() {
    var done = 0, currentId = null;
    refs.forEach(function (r) {
      var d = isDone(r.task);
      if (d) done++;
      else if (!currentId) currentId = r.task.id;
      r.el.classList.toggle("done", d);
      r.el.querySelector(".g-check").textContent = d ? "✓" : "";
      var state = r.el.querySelector(".g-state");
      state.textContent = d ? "xong" : (r.task.manual ? "tự đánh dấu" : "đang chờ");
    });

    refs.forEach(function (r) {
      r.el.classList.toggle("current", r.task.id === currentId);
    });
    if (currentId && currentId !== lastCurrent) {
      openIds[currentId] = true;
      lastCurrent = currentId;
    }
    applyOpen();

    var pct = Math.round((done / TASKS.length) * 100);
    document.getElementById("gBar").style.width = pct + "%";
    document.getElementById("gSub").textContent =
      done + "/" + TASKS.length + " hoàn thành" + (currentId ? " · làm tiếp bài đang mở 👇" : "");
    document.getElementById("gBanner").classList.toggle("show", done === TASKS.length);
  }

  // thu gọn / hiện thanh Lộ trình
  document.addEventListener("click", function (e) {
    var id = e.target && e.target.id;
    if (id === "guideToggle") document.body.classList.remove("guide-collapsed");
    if (id === "gCollapse") document.body.classList.add("guide-collapsed");
  });

  buildOnce();
  refresh();
  setInterval(refresh, 800);
  document.addEventListener("input", refresh);
})();
