!function (e) {
  "use strict";
  var t = e.Utils;
  var n = e.MoveLayout = {};
  var i = "pntt.moveLayout";
  var o = { x: 0, y: 0, k: 1 };
  var r = { x: 0, y: 0, k: 1 };
  var d = null;
  function u() {
    return [t.$("#dpad"), t.$("#joystick")].filter(function (e) {
      return !!e;
    });
  }
  function s() {
    for (var e = u(), t = 0; t < e.length; t++)
      if (!e[t].classList.contains("hidden")) {
        return e[t];
      }
    return e[0] || null;
  }
  function a(e) {
    r = function (e) {
      e = e || {};
      var t = Number(e.k);
      return { x: Number.isFinite(Number(e.x)) ? Math.round(Number(e.x)) : 0, y: Number.isFinite(Number(e.y)) ? Math.round(Number(e.y)) : 0, k: Number.isFinite(t) ? Math.max(.6, Math.min(1.6, t)) : 1 };
    }(e);
    u().forEach(function (e) {
      e.style.setProperty("--move-x", r.x + "px");
      e.style.setProperty("--move-y", r.y + "px");
      e.style.setProperty("--move-k", String(r.k));
    });
  }
  function l() {
    var e = s();
    if (e && "function" == typeof e.getBoundingClientRect) {
      var t = e.getBoundingClientRect();
      if (t.width > 0) {
        var n = window.innerWidth;
        var i = window.innerHeight;
        var o = 0;
        var d = 0;
        if (t.left < 0) {
          o = -t.left;
        }
        else {
          if (t.right > n) {
            o = n - t.right;
          }
        }
        if (t.top < 0) {
          d = -t.top;
        }
        else {
          if (t.bottom > i) {
            d = i - t.bottom;
          }
        }
        if ((o || d)) {
          a({ x: r.x + o, y: r.y + d, k: r.k });
        }
      }
    }
  }
  function c() {
    t.store.set(i, r);
  }
  function v() {
    if (d) {
      var e = s();
      var t = d.querySelector(".move-edit-khung");
      if (e) {
        var n = e.getBoundingClientRect();
        t.style.left = n.left + "px";
        t.style.top = n.top + "px";
        t.style.width = n.width + "px";
        t.style.height = n.height + "px";
      }
      d.querySelector(".move-edit-co").value = String(Math.round(100 * r.k));
      d.querySelector(".move-edit-pt").textContent = Math.round(100 * r.k) + "%";
    }
  }
  n.refresh = function () {
    a(r);
    l();
    c();
    if (n.dangChinh) {
      v();
    }
    return r;
  };
  n.load = function () {
    a(t.store.get(i, o));
    l();
    c();
  };
  var h = null;
  function m() {
    n.refresh();
  }
  n.mo = function () {
    if (!(d)) {
      (function () {
        (d = document.createElement("div")).id = "move-edit";
        d.className = "hidden";
        d.innerHTML = '<div class="move-edit-khung" aria-label="Kéo để dời nút di chuyển"></div><div class="move-edit-bang"><div>Kéo khung để dời nút di chuyển</div><label>Kích thước: <b class="move-edit-pt">100%</b><input class="move-edit-co" type="range" min="60" max="160" step="5" value="100"></label><div class="move-edit-nut"><button type="button" class="btn-sub move-edit-md">Mặc định</button><button type="button" class="btn-main move-edit-xong">Xong</button></div></div>';
        document.body.appendChild(d);
        var e = d.querySelector(".move-edit-khung");
        var t = d.querySelector(".move-edit-co");
        var i = null;
        e.addEventListener("pointerdown", function (t) {
          t.preventDefault();
          i = { id: t.pointerId, sx: t.clientX, sy: t.clientY, x: r.x, y: r.y };
          if (e.setPointerCapture) {
            e.setPointerCapture(t.pointerId);
          }
        });
        e.addEventListener("pointermove", function (e) {
          if (i && i.id === e.pointerId) {
            a({ x: i.x + e.clientX - i.sx, y: i.y + e.clientY - i.sy, k: r.k });
            l();
            v();
          }
        });
        var u = function (e) {
          if (i && i.id === e.pointerId) {
            i = null;
          }
        };
        e.addEventListener("pointerup", u);
        e.addEventListener("pointercancel", u);
        t.addEventListener("input", function () {
          a({ x: r.x, y: r.y, k: Number(t.value) / 100 });
          l();
          v();
        });
        d.querySelector(".move-edit-md").addEventListener("click", function () {
          a(o);
          v();
        });
        d.querySelector(".move-edit-xong").addEventListener("click", n.dong);
      })();
    }
    var t = e.TouchUI;
    h = t ? !!t.visible : null;
    if (t && t.setVisible) {
      t.setVisible(!0);
    }
    d.classList.remove("hidden");
    n.dangChinh = !0;
    v();
  };
  n.dong = function () {
    if (d) {
      d.classList.add("hidden");
      n.dangChinh = !1;
      c();
      var t = e.TouchUI;
      if (t && t.setVisible && !1 === h) {
        t.setVisible(!1);
      }
    }
  };
  window.addEventListener("resize", m, { passive: !0 });
  window.addEventListener("orientationchange", m, { passive: !0 });
  n.load();
}(window.PNTT);
