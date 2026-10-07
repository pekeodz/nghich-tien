!function (t) {
  "use strict";
  var e = t.Utils;
  var n = t.TouchUI = { root: null, visible: !1 };
  var i = null;
  var o = null;
  var r = null;
  var s = null;
  var a = null;
  var u = null;
  var d = null;
  var c = "pntt_touch_style";
  var l = "pntt_touch_visible";
  function p(t, e) {
    var n = Number(t);
    return isFinite(n) ? n : e;
  }
  function f(t) {
    return "joystick" === t ? "joystick" : "dpad";
  }
  function v() {
    if (u) {
      u.style.transform = "translate(-50%, -50%)";
    }
  }
  function h(e) {
    if (s) {
      var n = p(e && e.clientX, s.cx);
      var i = p(e && e.clientY, s.cy);
      var o = n - s.cx;
      var r = i - s.cy;
      var a = Math.sqrt(o * o + r * r);
      var d = a > 0 ? o / a : 0;
      var c = a > 0 ? r / a : 0;
      var l = Math.min(a, s.radius);
      var f = a > s.deadzone ? Math.min(1, a / s.radius) : 0;
      if (u) {
        u.style.transform = "translate(calc(-50% + " + Math.round(d * l) + "px), calc(-50% + " + Math.round(c * l) + "px))";
      }
      t.Input.setJoystick(d * f, c * f, !0);
    }
  }
  function g(e) {
    if (i === e.pointerId && o === a) {
      i = null;
      o = null;
      s = null;
      v();
      t.Input.setJoystick(0, 0, !1);
    }
  }
  function y() {
    i = null;
    o = null;
    r = null;
    s = null;
    v();
    if (a) {
      a.classList.remove("dragging");
    }
    document.querySelectorAll(".dpad-btn.pressed").forEach(function (t) {
      t.classList.remove("pressed");
    });
    t.Input.setJoystick(0, 0, !1);
  }
  function L(t) {
    if (null !== i && i !== t.pointerId) {
      y();
    }
  }
  function m(e, n) {
    var i = p(e.dataset && e.dataset.dx, 0);
    var o = p(e.dataset && e.dataset.dy, 0);
    var s = p(n.clientX, NaN);
    var a = p(n.clientY, NaN);
    if (r && isFinite(s) && isFinite(a)) {
      var u = r.originX + (s - r.startX) - r.cx;
      var d = r.originY + (a - r.startY) - r.cy;
      var c = Math.sqrt(u * u + d * d);
      if (c > r.deadzone) {
        var l = Math.min(1, c / r.radius);
        t.Input.setJoystick(u / c * l, d / c * l, !0);
      }
      else {
        t.Input.setJoystick(0, 0, !0);
      }
    }
    else {
      t.Input.setJoystick(i, o, !0);
    }
  }
  function w() {
    if (t.Input && t.Input.setJoystick) {
      if (a) {
        a.classList.remove("dragging");
      }
      y();
    }
  }
  function E() {
    if ("hidden" !== document.visibilityState && t.Game && t.SceneWorld && t.Game.scene === t.SceneWorld) {
      n.restoreVisibility(!0);
      n.refresh();
      if (window.requestAnimationFrame) {
        window.requestAnimationFrame(function () {
          n.refresh();
        });
      }
    }
  }
  function I(t) {
    if (null !== i && t.pointerId === i) {
      y();
    }
  }
  function b(t) {
    if (null !== i && t.touches && 0 === t.touches.length) {
      y();
    }
  }
  window.addEventListener("pointerup", I, !0);
  window.addEventListener("pointercancel", I, !0);
  window.addEventListener("touchend", b, { capture: !0, passive: !0 });
  window.addEventListener("touchcancel", b, { capture: !0, passive: !0 });
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      w();
    }
    else {
      E();
    }
  });
  window.addEventListener("pagehide", w);
  window.addEventListener("blur", w);
  window.addEventListener("pageshow", E, { passive: !0 });
  window.addEventListener("focus", E, { passive: !0 });
  document.addEventListener("resume", E, { passive: !0 });
  window.addEventListener("orientationchange", E, { passive: !0 });
  window.addEventListener("resize", E, { passive: !0 });
  n.init = function () {
    n.root = e.$("#touch-ui");
    a = e.$("#joystick");
    u = e.$("#joystick-thumb");
    d = e.$("#joystick-run");
    document.querySelectorAll(".dpad-btn").forEach(function (n) {
      function s(e) {
        if (i === e.pointerId && o === n) {
          i = null;
          o = null;
          r = null;
          n.classList.remove("pressed");
          t.Input.setJoystick(0, 0, !1);
        }
      }
      n.addEventListener("pointerdown", function (t) {
        t.preventDefault();
        L(t);
        i = t.pointerId;
        o = n;
        if ("function" == typeof n.setPointerCapture) {
          n.setPointerCapture(t.pointerId);
        }
        n.classList.add("pressed");
        (function (t, n) {
          var i = p(t.dataset && t.dataset.dx, 0);
          var o = p(t.dataset && t.dataset.dy, 0);
          var s = p(n.clientX, NaN);
          var a = p(n.clientY, NaN);
          var u = function (t) {
            var n = e.$("#dpad");
            if (!n || "function" != typeof n.getBoundingClientRect) {
              return null;
            }
            var i = n.getBoundingClientRect();
            if (!(i && i.width > 0 && i.height > 0)) {
              return null;
            }
            var o = "function" == typeof t.getBoundingClientRect ? t.getBoundingClientRect() : null;
            var r = o && o.width > 0 ? Math.min(o.width, o.height) : .325 * Math.min(i.width, i.height);
            var s = Math.min(i.width, i.height) / 2 - r / 2;
            return s > 0 ? { cx: i.left + i.width / 2, cy: i.top + i.height / 2, radius: s } : null;
          }(t);
          r = null;
          if (u && isFinite(s) && isFinite(a)) {
            r = { startX: s, startY: a, cx: u.cx, cy: u.cy, radius: u.radius, originX: u.cx + i * u.radius, originY: u.cy + o * u.radius, deadzone: Math.min(8, .18 * u.radius) };
          }
          m(t, n);
        })(n, t);
      });
      n.addEventListener("pointermove", function (t) {
        if (i === t.pointerId && o === n) {
          t.preventDefault();
          m(n, t);
        }
      });
      n.addEventListener("pointerup", s);
      n.addEventListener("pointercancel", s);
      n.addEventListener("lostpointercapture", s);
    });
    if (a) {
      a.addEventListener("pointerdown", function (t) {
        if (!(d && (t.target === d || d.contains && d.contains(t.target)))) {
          t.preventDefault();
          L(t);
          i = t.pointerId;
          o = a;
          if ("function" == typeof a.setPointerCapture) {
            a.setPointerCapture(t.pointerId);
          }
          a.classList.add("dragging");
          (function (t) {
            var n = function () {
              var t = a || e.$("#joystick");
              if (!t || "function" != typeof t.getBoundingClientRect) {
                return null;
              }
              var n = t.getBoundingClientRect();
              if (!(n && n.width > 0 && n.height > 0)) {
                return null;
              }
              var i = u && "function" == typeof u.getBoundingClientRect ? u.getBoundingClientRect() : null;
              var o = i && i.width > 0 ? Math.min(i.width, i.height) : 58;
              var r = Math.min(n.width, n.height) / 2 - o / 2 - 4;
              return r > 0 ? { cx: n.left + n.width / 2, cy: n.top + n.height / 2, radius: r } : null;
            }();
            if (n) {
              s = { pointerId: t.pointerId, cx: n.cx, cy: n.cy, radius: n.radius, deadzone: Math.min(8, .18 * n.radius) };
              h(t);
            }
          })(t);
        }
      });
      a.addEventListener("pointermove", function (t) {
        if (i === t.pointerId && o === a) {
          t.preventDefault();
          h(t);
        }
      });
      a.addEventListener("pointerup", function (t) {
        a.classList.remove("dragging");
        g(t);
      });
      a.addEventListener("pointercancel", function (t) {
        a.classList.remove("dragging");
        g(t);
      });
      a.addEventListener("lostpointercapture", function (t) {
        a.classList.remove("dragging");
        g(t);
      });
    }
    k("#btn-attack", function () {
      t.Input.pressAttack();
    });
    k("#btn-fly", function () {
      t.Input.pressFlyToggle();
    });
    k("#btn-target", function () {
      t.Input.pressCycleTarget();
    });
    k("#btn-auto-touch", function () {
      t.Input.pressAutoToggle();
    });
    k("#btn-fishing-stop-touch", function () {
      if (t.SceneWorld && t.SceneWorld.stopFishing) {
        t.SceneWorld.stopFishing();
      }
    });
    k("#btn-meditate-touch", function () {
      t.Input.pressMeditate();
    });
    var l = [e.$("#btn-run"), d].filter(function (t) {
      return !!t;
    });
    t.Input.onRunChange = function (t) {
      l.forEach(function (e) {
        e.classList.toggle("active", t);
      });
    };
    l.forEach(function (e) {
      e.classList.toggle("active", !!t.Input.run);
      e.addEventListener("pointerdown", function (e) {
        e.preventDefault();
        if (e.stopPropagation) {
          e.stopPropagation();
        }
        t.Input.toggleRun();
      });
    });
    var f = e.$("#btn-dosat");
    if (f) {
      (function (e) {
        var n = e.querySelector ? e.querySelector(".dosat-fill") : null;
        var i = 0;
        var o = 0;
        function r() {
          var e = (Date.now() - i) / 1e3 / M;
          if (e >= 1) {
            s();
            t.Input.pressDoSat();
          }
          else {
            if (n) {
              n.style.height = Math.round(100 * e) + "%";
            }
            o = requestAnimationFrame(r);
          }
        }
        function s() {
          if (o) {
            cancelAnimationFrame(o);
          }
          o = 0;
          i = 0;
          e.classList.remove("holding");
          if (n) {
            n.style.height = "0%";
          }
        }
        e.addEventListener("pointerdown", function (t) {
          t.preventDefault();
          if (!(i)) {
            i = Date.now();
            e.classList.add("holding");
            o = requestAnimationFrame(r);
          }
        });
        ["pointerup", "pointercancel", "pointerleave", "lostpointercapture"].forEach(function (t) {
          e.addEventListener(t, s);
        });
      })(f);
    }
    n.setControlStyle(e.store.get(c, "joystick"), !1);
    n.setVisible(!1);
    return n;
  };
  var M = .8;
  function k(t, n) {
    var i = e.$(t);
    if (i) {
      i.addEventListener("pointerdown", function (t) {
        t.preventDefault();
        i.classList.add("pressed");
        n();
      });
      var o = function () {
        i.classList.remove("pressed");
      };
      i.addEventListener("pointerup", o);
      i.addEventListener("pointercancel", o);
      i.addEventListener("pointerleave", o);
    }
  }
  n.controlStyle = "dpad";
  n.controlStyleLabel = function () {
    return "joystick" === f(n.controlStyle) ? "Joystick MOBA" : "Phím hướng";
  };
  n.setControlStyle = function (i, o) {
    var r = f(i);
    n.controlStyle = r;
    if (!1 !== o) {
      e.store.set(c, r);
    }
    var s = e.$("#dpad");
    var a = e.$("#joystick");
    if (s) {
      s.classList.toggle("hidden", "dpad" !== r);
    }
    if (a) {
      a.classList.toggle("hidden", "joystick" !== r);
    }
    y();
    if (t.MoveLayout && t.MoveLayout.refresh) {
      t.MoveLayout.refresh();
    }
    return r;
  };
  n.setVisible = function (i, o) {
    i = !!i;
    n.visible = i;
    if ((!0 === o || void 0 === o && t.Game && t.Game.scene === t.SceneWorld)) {
      e.store.set(l, i);
    }
    if (n.root) {
      n.root.classList.toggle("hidden", !i);
      if (!(i)) {
        y();
      }
      if (t.MoveLayout && t.MoveLayout.refresh) {
        t.MoveLayout.refresh();
      }
    }
  };
  n.restoreVisibility = function (t) {
    var i = e.store.get(l, null);
    var o = null === i ? !!t : !!i;
    n.setVisible(o, !1);
    return o;
  };
  n.refresh = function () {
    if (!(n.root)) {
      n.root = e.$("#touch-ui");
    }
    if (n.root) {
      n.root.classList.toggle("hidden", !n.visible);
    }
    if (t.MoveLayout && t.MoveLayout.refresh) {
      t.MoveLayout.refresh();
    }
    return n.visible;
  };
}(window.PNTT);
