!function (t) {
  "use strict";
  var n = t.KhuUI = { khu: 1, soKhu: 1, mapId: null };
  var e = null;
  var o = [];
  var a = 0;
  var i = [];
  function u(t) {
    return i[t - 1] || a;
  }
  function r(t, n) {
    var e = u(n);
    return e ? t >= e ? "day" : t > e / 2 ? "dong" : "vang" : "";
  }
  function c() {
    if (e) {
      e.grid.innerHTML = "";
      for (var t = 1; t <= n.soKhu; t++) {
        var a = o[t - 1];
        var i = document.createElement("button");
        i.type = "button";
        i.className = "khu-o " + r(a || 0, t) + (t === n.khu ? " dang" : "");
        i.textContent = String(t);
        i.title = null == a ? "Khu " + t : "Khu " + t + " — " + a + "/" + u(t) + " người";
        i.setAttribute("data-khu", String(t));
        i.addEventListener("click", s);
        e.grid.appendChild(i);
      }
      e.note.textContent = "Đang ở khu " + n.khu + ". Chọn khu khác để chuyển.";
    }
  }
  function s(e) {
    var o = 0 | Number(e.currentTarget.getAttribute("data-khu"));
    if (o !== n.khu) {
      var a = t.Gateway;
      if (a && a.connected && a.send({ op: "khu", act: "chon", khu: o })) {
        n.close();
      }
      else {
        if (t.HUD && t.HUD.setCaption) {
          t.HUD.setCaption("Chỉ đổi khu được khi đang trực tuyến.");
        }
      }
    }
    else {
      n.close();
    }
  }
  n.setMap = function (t, e, u) {
    var r = n.mapId !== t;
    n.mapId = t;
    n.khu = e > 0 ? 0 | e : 1;
    n.soKhu = u > 1 ? 0 | u : 1;
    if (r) {
      o = [];
      a = 0;
      i = [];
    }
    if (n.soKhu <= 1) {
      n.close();
    }
    else {
      if (n.isOpen()) {
        c();
      }
    }
  };
  n.onList = function (t) {
    if (t && t.mapId === n.mapId) {
      o = Array.isArray(t.dem) ? t.dem.map(function (t) {
        return 0 | t;
      }) : [];
      a = 0 | t.toiDa;
      i = Array.isArray(t.tran) ? t.tran.map(function (t) {
        return 0 | t;
      }) : [];
      if (t.khu) {
        n.khu = 0 | t.khu;
      }
      if (n.isOpen()) {
        c();
      }
    }
  };
  n.isOpen = function () {
    return !(!e || e.root.classList.contains("hidden"));
  };
  n.open = function () {
    var o = t.Gateway;
    if (o && o.connected) {
      if (n.soKhu <= 1) {
        if (t.HUD && t.HUD.setCaption) {
          t.HUD.setCaption("Bản đồ này không chia khu.");
        }
      }
      else {
        if (!(e)) {
          (e = {}).root = document.createElement("div");
          e.root.id = "khu-panel";
          e.root.className = "khu-overlay hidden";
          e.root.innerHTML = '<div class="khu-scroll" role="dialog" aria-label="Chọn khu"><div class="khu-head"><span>Khu</span><button type="button" class="khu-x" aria-label="Đóng">✕</button></div><div class="khu-grid"></div><div class="khu-note"></div></div>';
          document.body.appendChild(e.root);
          e.grid = e.root.querySelector(".khu-grid");
          e.note = e.root.querySelector(".khu-note");
          e.root.querySelector(".khu-x").addEventListener("click", n.close);
          e.root.addEventListener("click", function (t) {
            if (t.target === e.root) {
              n.close();
            }
          });
          window.addEventListener("keydown", function (t) {
            if ("Escape" === t.key && n.isOpen()) {
              t.preventDefault();
              n.close();
            }
          });
        }
        c();
        e.root.classList.remove("hidden");
        o.send({ op: "khu", act: "xem" });
      }
    }
    else {
      if (t.HUD && t.HUD.setCaption) {
        t.HUD.setCaption("Khu chỉ có khi chơi trực tuyến.");
      }
    }
  };
  n.close = function () {
    if (e) {
      e.root.classList.add("hidden");
    }
  };
}(window.PNTT);
