/* ===========================================================================
   LỘ TRÌNH BÀI TẬP TƯƠNG TÁC  ·  INTERACTIVE EXERCISE ROADMAP
   - Bài đã xong: tích ✓.  Bài hiện tại: tự mở, kèm hướng dẫn + prompt.
   - Bấm vào một bài: mở hướng dẫn VÀ tô sáng đúng component trên trang.
   - Nút thu gọn/hiện thanh Lộ trình.  Song ngữ Việt / English (đổi ở nút 🌐).
   File này KHÔNG cần sửa. Bạn chỉ sửa: index.html, styles.css, app.js, config.js.
   =========================================================================== */
(function () {
  "use strict";

  function lang() {
    return window.VibeI18N ? window.VibeI18N.lang : "vi";
  }
  // resolve {vi, en} -> chuỗi theo ngôn ngữ hiện tại
  function L(o) {
    if (o && typeof o === "object") return o[lang()] != null ? o[lang()] : o.vi;
    return o;
  }
  function norm(s) {
    return (s || "").replace(/\s+/g, " ").trim();
  }

  // chuỗi giao diện của thanh Lộ trình
  var UI = {
    heading: { vi: "Lộ trình bài tập", en: "Exercise roadmap" },
    collapse: { vi: "Ẩn thanh này", en: "Hide this panel" },
    tip: {
      vi: "💡 Thử tự diễn đạt yêu cầu cho AI trước — bí mới mở “Xem prompt gửi AI”.",
      en: "💡 Try phrasing the request to the AI yourself first — only open “See the prompt” if stuck.",
    },
    promptHead: { vi: "Prompt — copy & gửi AI", en: "Prompt — copy & send to the AI" },
    showPrompt: { vi: "✨ Xem prompt gửi AI", en: "✨ See the prompt" },
    focusBtn: { vi: "🔎 Chỉ cho tôi trên trang", en: "🔎 Show me on the page" },
    copy: { vi: "Copy", en: "Copy" },
    copied: { vi: "Đã copy ✓", en: "Copied ✓" },
    mark: { vi: "Đánh dấu đã xong ✓", en: "Mark as done ✓" },
    done: { vi: "xong", en: "done" },
    manual: { vi: "tự đánh dấu", en: "mark yourself" },
    waiting: { vi: "đang chờ", en: "waiting" },
    banner: { vi: "🎉 Hoàn thành tất cả — bạn giỏi lắm!", en: "🎉 All done — you nailed it!" },
    completedOf: { vi: "hoàn thành", en: "completed" },
    keepGoing: { vi: " · làm tiếp bài đang mở 👇", en: " · keep going with the open task 👇" },
  };

  function text(sel) {
    var el = document.querySelector(sel);
    return el ? (el.textContent || "").trim() : "";
  }
  // đọc MÀU NỀN nút chính thật (phản ánh màu chủ đạo dù đổi qua --brand hay trực tiếp)
  function primaryRgb() {
    var el = document.querySelector(".btn");
    if (el) {
      var bg = getComputedStyle(el).backgroundColor;
      if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") return bg;
    }
    var raw = getComputedStyle(document.documentElement).getPropertyValue("--brand").trim();
    var p = document.createElement("span");
    p.style.color = raw; document.body.appendChild(p);
    var rgb = getComputedStyle(p).color; p.remove();
    return rgb;
  }
  function isPurple() {
    var m = primaryRgb().match(/\d+/g); if (!m) return false;
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
  // tiêu đề đã đổi chưa? — khác với MỌI bản mặc định (cả Việt lẫn English)
  function headlineChanged() {
    var t = norm(text("#headline"));
    if (t === "") return false;
    var defs = (window.VibeI18N ? window.VibeI18N.defaultsOf("headline") : []).map(norm);
    return defs.indexOf(t) === -1;
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
  // Bài 7: key đã được đưa ra khỏi code (không còn hardcode) chưa?
  function keySecured() {
    return typeof window.isKeySecured === "function" ? window.isKeySecured() : false;
  }

  // tag = số bài (khớp slide); target = component sẽ tô sáng khi bấm bài.
  var TASKS = [
    {
      id: "run", tag: "Bài 3", target: null,
      title: { vi: "Chạy được trang", en: "Get the page running" },
      instruct: {
        vi: "Trang đã chạy và bạn đang xem nó. 🎉 Nếu chưa thấy, bảo AI chạy giúp ở chế độ dev.",
        en: "The page is running and you're looking at it. 🎉 If not, ask the AI to run it in dev mode.",
      },
      prompt: {
        vi: "Hãy chạy giúp tôi trang web này ở chế độ xem trước (dev) và cho tôi địa chỉ localhost để mở trên trình duyệt.",
        en: "Please run this website in preview (dev) mode and give me the localhost address to open in the browser.",
      },
      auto: function () { return true; },
    },
    {
      id: "name", tag: "Bài 3.1", target: "#brandName",
      title: { vi: "Đổi tên thành “Apero”", en: "Rename it to “Apero”" },
      instruct: {
        vi: "Đổi tên thương hiệu hiển thị trên trang thành <b>Apero</b>. Cứ để AI tự tìm chỗ và sửa.",
        en: "Change the brand name shown on the page to <b>Apero</b>. Let the AI find and edit it.",
      },
      prompt: {
        vi: "Đổi tên thương hiệu hiển thị trên trang thành 'Apero'. Bạn tự tìm những chỗ đang để tên cũ rồi sửa giúp tôi, chỉ sửa đúng chỗ đó.",
        en: "Change the brand name shown on the page to 'Apero'. Find the places using the old name yourself and fix only those.",
      },
      auto: function () { return text("#brandName").toLowerCase() === "apero"; },
    },
    {
      id: "headline", tag: "Bài 3.1", target: "#headline",
      title: { vi: "Đổi tiêu đề chính", en: "Change the main headline" },
      instruct: {
        vi: "Đổi câu tiêu đề lớn ở đầu trang thành câu của bạn. Bảo AI tìm và đổi giúp.",
        en: "Change the big headline at the top to your own sentence. Ask the AI to find and change it.",
      },
      prompt: {
        vi: "Đổi câu tiêu đề lớn (headline) ở đầu trang thành câu tôi sẽ đọc cho bạn. Tự tìm đúng chỗ và sửa giúp tôi.",
        en: "Change the big headline at the top of the page to the sentence I'll dictate. Find the right spot and edit it for me.",
      },
      auto: headlineChanged,
    },
    {
      id: "color", tag: "Bài 3.1", target: ".hero-actions .btn",
      title: { vi: "Đổi màu chủ đạo sang TÍM", en: "Change the primary color to PURPLE" },
      instruct: {
        vi: "Đổi màu chủ đạo của trang sang <b>tím</b>. AI sẽ biết chỗ cần chỉnh.",
        en: "Change the primary color of the page to <b>purple</b>. The AI will know where to edit.",
      },
      prompt: {
        vi: "Đổi màu chủ đạo (màu chính) của trang sang tông tím. Tự tìm chỗ định nghĩa màu và đổi giúp tôi, giải thích ngắn gọn nó ảnh hưởng tới những phần nào.",
        en: "Change the primary color of the page to a purple tone. Find where the color is defined and change it, then briefly explain what it affects.",
      },
      auto: isPurple,
    },
    {
      id: "logo", tag: "Bài 3.2", target: "#logo",
      title: { vi: "Thêm logo / ảnh của bạn", en: "Add your logo / image" },
      instruct: {
        vi: "Thay logo trên trang bằng ảnh của bạn. Bỏ ảnh vào dự án rồi nhờ AI gắn.",
        en: "Replace the logo with your own image. Drop the image into the project and ask the AI to wire it up.",
      },
      prompt: {
        vi: "Tôi vừa bỏ một ảnh (logo.png) vào dự án. Hãy thay logo hiện tại trên trang bằng ảnh này — tự tìm chỗ đang dùng logo cũ và thay giúp tôi.",
        en: "I just dropped an image (logo.png) into the project. Replace the current logo on the page with it — find where the old logo is used and swap it for me.",
      },
      auto: logoChanged,
    },
    {
      id: "bug", tag: "Bài 3.3", target: ".visit-card",
      title: { vi: "Sửa lỗi “Lượt ghé thăm”", en: "Fix the “Visit count” bug" },
      instruct: {
        vi: "Mở <b>F12 → Console</b>, copy dòng lỗi <b>màu đỏ</b>, dán cho AI nhờ sửa.",
        en: "Open <b>F12 → Console</b>, copy the <b>red</b> error line, and paste it to the AI to fix.",
      },
      prompt: {
        vi: "Trang đang lỗi ở widget 'Lượt ghé thăm'. Tôi mở F12 → Console và copy được lỗi sau, đọc giúp và sửa:\n\n<dán đoạn log lỗi màu đỏ vào đây>\n\nGiải thích ngắn gọn nguyên nhân rồi sửa đúng chỗ gây lỗi.",
        en: "The 'Visit count' widget is broken. I opened F12 → Console and copied this error — read it and fix it:\n\n<paste the red error log here>\n\nBriefly explain the cause, then fix the exact spot causing it.",
      },
      auto: bugFixed,
    },
    {
      id: "commit", tag: "Bài 5",
      title: { vi: "Commit & quay tới / quay lui", en: "Commit & travel forward / back" },
      instruct: {
        vi: "Commit thay đổi. Rồi thử quay về commit <b>đầu tiên</b> — chạy lại sẽ thấy mọi thay đổi biến mất; quay lại commit <b>mới nhất</b> — mọi thứ trở lại.",
        en: "Commit your changes. Then check out the <b>first</b> commit — re-run and watch everything vanish; return to the <b>latest</b> commit and it all comes back.",
      },
      prompt: {
        vi: "Hãy commit toàn bộ thay đổi với mô tả 'Hoàn thành landing page'. Sau đó: chỉ tôi cách xem lịch sử commit, quay về commit ĐẦU TIÊN để chạy lại trang và thấy các thay đổi biến mất, rồi quay lại commit MỚI NHẤT để mọi thứ trở lại đầy đủ.",
        en: "Commit all changes with the message 'Complete landing page'. Then: show me how to view the commit history, check out the FIRST commit so I can run the page and see my changes disappear, then return to the LATEST commit so everything comes back.",
      },
      manual: true,
    },
    {
      id: "createrepo", tag: "Bài 5.1",
      title: { vi: "Tạo repo trên GitHub (Private)", en: "Create a GitHub repo (Private)" },
      instruct: {
        vi: "Trên GitHub: bấm <b>+</b> → New repository, đặt tên, chọn <b>Private</b>, Create. ⚠️ Bước này dễ lỗi / đòi quyền — bạn có thể phải thao tác tay.",
        en: "On GitHub: click <b>+</b> → New repository, name it, choose <b>Private</b>, Create. ⚠️ This step often errors / asks for permissions — you may need to do it by hand.",
      },
      prompt: {
        vi: "Tạo giúp tôi một repo GitHub PRIVATE tên 'vibecode-studentwork' (có thể dùng lệnh gh repo create). Cho tôi link repo. Nếu gh chưa có quyền thì dừng lại và chỉ tôi cách tạo tay trên github.com.",
        en: "Create a PRIVATE GitHub repo named 'vibecode-studentwork' for me (you can use gh repo create). Give me the repo link. If gh isn't authorized, stop and show me how to create it manually on github.com.",
      },
      manual: true,
    },
    {
      id: "push", tag: "Bài 5.2",
      title: { vi: "Push lên GitHub (repo riêng)", en: "Push to GitHub (your own repo)" },
      instruct: {
        vi: "Push code lên repo Private vừa tạo — tách khỏi repo gốc đã clone.",
        en: "Push the code to the Private repo you just created — separate from the original cloned repo.",
      },
      prompt: {
        vi: "Hãy đổi remote sang repo Private tôi vừa tạo (<điền-tên-repo>) để tách khỏi repo gốc, rồi push toàn bộ code lên.",
        en: "Change the remote to the Private repo I just created (<your-repo>) so it's separate from the original, then push all the code up.",
      },
      manual: true,
    },
    {
      id: "deploy", tag: "Bài 6",
      title: { vi: "Deploy lên Vercel", en: "Deploy to Vercel" },
      instruct: {
        vi: "Import repo vào Vercel & deploy. Mở trang qua link <code>*.vercel.app</code> sẽ tự tích xanh.",
        en: "Import the repo into Vercel & deploy. Opening the page on a <code>*.vercel.app</code> link ticks this green.",
      },
      prompt: {
        vi: "Tôi đã đăng nhập Vercel bằng GitHub. Hướng dẫn tôi import repo <điền-tên-repo> và deploy ra link công khai. Giải thích vì sao mỗi lần push code mới thì Vercel tự deploy lại (CI/CD).",
        en: "I'm signed in to Vercel with GitHub. Walk me through importing the repo <your-repo> and deploying it to a public link. Explain why every push redeploys automatically (CI/CD).",
      },
      auto: function () { return /vercel\.app$/.test(location.hostname); },
    },
    {
      id: "env", tag: "Bài 7", target: "#keyAlert",
      title: { vi: "Đưa API key vào .env", en: "Move the API key into .env" },
      instruct: {
        vi: "Cảnh báo đỏ đầu trang đang in API key bị lộ. Nhờ AI chuyển key trong <code>config.js</code> ra file <code>.env</code> — làm xong cảnh báo sẽ tự chuyển sang XANH.",
        en: "The red alert at the top shows the leaked API key. Ask the AI to move the key from <code>config.js</code> into a <code>.env</code> file — once done the alert turns GREEN automatically.",
      },
      prompt: {
        vi: "Trong config.js đang hardcode API_KEY và trang đang hiện cảnh báo key bị lộ. Hãy chuyển key ra file .env (để config.js không còn chứa key thật), thêm .env vào .gitignore để không bị push lên GitHub, và hướng dẫn tôi khai báo key đó trong Environment Variables trên Vercel.",
        en: "config.js hardcodes API_KEY and the page shows a 'key exposed' warning. Move the key into a .env file (so config.js no longer holds the real key), add .env to .gitignore so it isn't pushed to GitHub, and show me how to declare that key in Vercel's Environment Variables.",
      },
      auto: keySecured,
    },
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

  function build() {
    var root = document.getElementById("guide");
    if (!root) return;
    refs = [];
    root.innerHTML =
      '<div class="guide-head"><span class="dot"></span><h2>' + L(UI.heading) + "</h2>" +
      '<button class="g-collapse" id="gCollapse" type="button" title="' + L(UI.collapse) + '" aria-label="' + L(UI.collapse) + '">✕</button></div>' +
      '<p class="guide-sub" id="gSub"></p>' +
      '<div class="g-progress"><i id="gBar"></i></div>' +
      '<p class="guide-tip">' + L(UI.tip) + "</p>" +
      '<div class="g-list" id="gList"></div>' +
      '<div class="g-done-banner" id="gBanner">' + L(UI.banner) + "</div>";

    var list = document.getElementById("gList");
    TASKS.forEach(function (t) {
      var step = document.createElement("div");
      step.className = "g-step";
      step.innerHTML =
        '<div class="g-row">' +
          '<span class="g-check"></span>' +
          '<span class="g-meta"><span class="g-tag">' + t.tag + "</span>" +
          '<div class="g-title">' + L(t.title) + "</div></span>" +
          '<span class="g-state"></span>' +
        "</div>" +
        '<div class="g-body">' +
          '<p class="g-instruct">' + L(t.instruct) + "</p>" +
          (t.target ? '<button class="g-focus" type="button">' + L(UI.focusBtn) + "</button>" : "") +
          '<button class="g-prompt-btn" type="button">' + L(UI.showPrompt) + "</button>" +
          '<div class="g-prompt">' +
            '<div class="g-prompt-head"><span>' + L(UI.promptHead) + "</span>" +
            '<button class="g-copy" type="button">' + L(UI.copy) + "</button></div>" +
            '<p class="g-prompt-text"></p>' +
          "</div>" +
          (t.manual ? '<button class="g-mark" type="button">' + L(UI.mark) + "</button>" : "") +
        "</div>";

      step.querySelector(".g-prompt-text").textContent = L(t.prompt);

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
        navigator.clipboard.writeText(L(t.prompt)).then(function () {
          btn.textContent = L(UI.copied);
          setTimeout(function () { btn.textContent = L(UI.copy); }, 1500);
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
      state.textContent = d ? L(UI.done) : (r.task.manual ? L(UI.manual) : L(UI.waiting));
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
      done + "/" + TASKS.length + " " + L(UI.completedOf) + (currentId ? L(UI.keepGoing) : "");
    document.getElementById("gBanner").classList.toggle("show", done === TASKS.length);
  }

  // thu gọn / hiện thanh Lộ trình
  document.addEventListener("click", function (e) {
    var id = e.target && e.target.id;
    if (id === "guideToggle") document.body.classList.remove("guide-collapsed");
    if (id === "gCollapse") document.body.classList.add("guide-collapsed");
  });

  // đổi ngôn ngữ -> dựng lại thanh Lộ trình bằng ngôn ngữ mới
  document.addEventListener("vibe:lang", function () {
    build();
    refresh();
  });

  build();
  refresh();
  setInterval(refresh, 800);
  document.addEventListener("input", refresh);
})();
