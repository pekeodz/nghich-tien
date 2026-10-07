!function (n) {
  "use strict";
  var e = window.matchMedia("(orientation: portrait)");
  var t = null;
  function i() {
    var n = String(navigator.userAgent || "");
    var e = window.matchMedia("(display-mode: standalone)").matches || !0 === window.navigator.standalone;
    var t = window.matchMedia("(pointer: coarse)").matches && Math.min(window.screen.width || innerWidth, window.screen.height || innerHeight) <= 760;
    return !!window.Capacitor || /iPhone|iPod/i.test(n) || e && t;
  }
  function o() {
    if (i()) {
      var n = (t || !document.body || ((t = document.createElement("div")).id = "orientation-lock", t.hidden = !0, t.setAttribute("role", "alert"), t.setAttribute("aria-live", "assertive"), t.innerHTML = '<div class="orientation-lock-card"><span class="orientation-lock-icon" aria-hidden="true">↻</span><h1 class="orientation-lock-title">Xoay ngang để vào game</h1><p class="orientation-lock-copy">Nghịch Tiên chỉ chơi ở màn hình ngang trên điện thoại.</p></div>', document.body.appendChild(t)), t);
      var o = !!e.matches;
      n.hidden = !o;
      document.body.classList.toggle("orientation-blocked", o);
    }
  }
  function a() {
    if (i()) {
      var n = window.screen && window.screen.orientation;
      if (n && "function" == typeof n.lock) {
        try {
          var e = n.lock("landscape");
          if (e && "function" == typeof e.catch) {
            e.catch(function () {
            });
          }
        }
        catch (n) {
        }
      }
    }
  }
  function d() {
    if (i()) {
      o();
      a();
      window.addEventListener("resize", o, { passive: !0 });
      window.addEventListener("orientationchange", o, { passive: !0 });
      if (e.addEventListener) {
        e.addEventListener("change", o);
      }
      else {
        if (e.addListener) {
          e.addListener(o);
        }
      }
      document.addEventListener("pointerup", a, { once: !0, passive: !0 });
    }
  }
  n.OrientationLock = { init: d, refresh: o };
  if ("loading" === document.readyState) {
    document.addEventListener("DOMContentLoaded", d, { once: !0 });
  }
  else {
    d();
  }
}(window.PNTT = window.PNTT || {});
