!function (t) {
  "use strict";
  var n = ["Giữ chuột phải (hoặc kéo nút xoay) để nhìn quanh trước khi xông vào.", "Đánh quái cùng cảnh giới thì lên đạo hạnh nhanh nhất — vượt cấp phí công.", "Dược thảo hái rồi sẽ mọc lại; đừng chặt sạch một vạt trong một lượt.", "Phi hành bay qua được suối và bụi thấp, nhưng vách núi thì không.", "Bí tịch đủ hai nửa mới đọc được — nửa dưới nằm trong tay yêu quái.", "Đứng gần bia đá rồi bấm E để đọc chữ khắc.", "Tiến trình lưu theo tài khoản: đổi máy vẫn còn nguyên đạo hạnh và túi đồ."];
  var i = t.LoadingScreen = { visible: !1 };
  var e = {};
  var a = 0;
  var o = 0;
  var r = 0;
  var l = 0;
  var s = 0;
  var h = 0;
  var c = !1;
  function u(t) {
    return document.getElementById(t);
  }
  function m() {
    if (!r && i.visible) {
      r = requestAnimationFrame(function t() {
        r = 0;
        var n = o - a;
        if (n > 5e-4) {
          if ((a += Math.max(.18 * n, .0015)) > o && (a = o), d(), i.visible) {
            return void (r = requestAnimationFrame(t));
          }
        }
        else {
          a = o;
          d();
        }
      });
    }
  }
  function d() {
    var t = Math.round(100 * a);
    if (e.fill) {
      e.fill.style.width = t + "%";
    }
    if (e.pct) {
      e.pct.textContent = t + "%";
    }
  }
  function p() {
    if (!l && e.tip) {
      s = Math.floor(Math.random() * n.length);
      e.tip.textContent = n[s];
      l = setInterval(function () {
        s = (s + 1) % n.length;
        e.tip.textContent = n[s];
      }, 4200);
    }
  }
  i.init = function () {
    e.root = u("loading");
    e.phase = u("load-phase");
    e.fill = u("load-bar-fill");
    e.pct = u("load-pct");
    e.detail = u("load-detail");
    e.tip = u("load-tip");
    e.mapRoot = u("map-loading");
    e.mapName = u("map-load-name");
    e.mapFill = u("map-load-fill");
    i.visible = !(!e.root || e.root.classList.contains("hidden"));
    if (i.visible) {
      p();
    }
    return i;
  };
  i.show = function (t) {
    if (!(e.root)) {
      i.init();
    }
    return e.root ? (e.root.classList.remove("hidden"), e.root.classList.remove("fading"), i.visible = !0, i.setPhase(t), p(), m(), i) : i;
  };
  i.setPhase = function (t) {
    if (null != t && e.phase) {
      e.phase.textContent = t;
    }
    return i;
  };
  i.setDetail = function (t) {
    if (e.detail) {
      e.detail.textContent = null == t ? "" : t;
    }
    return i;
  };
  i.setProgress = function (t) {
    if ((t = Math.max(0, Math.min(1, t || 0))) > o) {
      o = t;
    }
    m();
    return i;
  };
  i.phase = function (t, n, e) {
    i.setPhase(t);
    return function (t) {
      i.setProgress(n + (e - n) * Math.max(0, Math.min(1, t || 0)));
    };
  };
  i.hide = function () {
    if (!e.root) {
      return i;
    }
    o = 1;
    a = 1;
    d();
    i.visible = !1;
    if (l) {
      clearInterval(l);
      l = 0;
    }
    e.root.classList.add("fading");
    var t = e.root;
    setTimeout(function () {
      t.classList.add("hidden");
      t.classList.remove("fading");
    }, 360);
    if (r) {
      cancelAnimationFrame(r);
      r = 0;
    }
    return i;
  };
  i.fail = function (t) {
    i.setPhase(t || "Không nạp được tài nguyên — thử tải lại trang.");
    if (e.root) {
      e.root.classList.add("failed");
    }
    return i;
  };
  i.mapShow = function (t) {
    c = !0;
    if (e.mapName) {
      e.mapName.textContent = t || "";
    }
    if (e.mapFill) {
      e.mapFill.style.width = "0%";
    }
    if (!(h)) {
      h = setTimeout(function () {
        h = 0;
        if (c && e.mapRoot) {
          e.mapRoot.classList.remove("hidden");
        }
      }, 260);
    }
    return i;
  };
  i.mapProgress = function (t) {
    if (e.mapFill) {
      e.mapFill.style.width = Math.round(100 * Math.max(0, Math.min(1, t || 0))) + "%";
    }
    return i;
  };
  i.mapHide = function () {
    c = !1;
    if (h) {
      clearTimeout(h);
      h = 0;
    }
    if (e.mapRoot) {
      e.mapRoot.classList.add("hidden");
    }
    return i;
  };
  i.debugState = function () {
    return { visible: i.visible, shown: a, target: o, mapWanted: c };
  };
}(window.PNTT);
