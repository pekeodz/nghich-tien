!function (e) {
  "use strict";
  var t = e.Utils;
  var n = e.UIScale = { scale: 1 };
  n.apply = function () {
    var i = e.Renderer && e.Renderer.dpiBoost ? e.Renderer.dpiBoost() : 1;
    var r = Math.min(window.innerWidth / i / 1370, window.innerHeight / i / 770);
    r = t.clamp(Math.round(20 * r) / 20, 1, 2.6);
    r = Math.round(r * i * 20) / 20;
    n.scale = r;
    var o = document.documentElement.style;
    o.setProperty("--ui-scale", String(r));
    o.setProperty("--ui-vw", window.innerWidth / r + "px");
    o.setProperty("--ui-vh", window.innerHeight / r + "px");
    return r;
  };
  n.init = function () {
    n.apply();
    (function () {
      var e = document.getElementById("hud-left");
      var t = document.getElementById("hud");
      if (e && t) {
        var n = -1;
        if ("function" == typeof ResizeObserver) {
          new ResizeObserver(i).observe(e);
        }
        else {
          setInterval(i, 500);
        }
        i();
      }
      function i() {
        var i = e.offsetHeight;
        if (i && i !== n) {
          n = i;
          t.style.setProperty("--hud-left-h", i + "px");
        }
      }
    })();
    window.addEventListener("resize", n.apply, { passive: !0 });
    window.addEventListener("orientationchange", function () {
      setTimeout(n.apply, 120);
    });
    return n;
  };
}(window.PNTT);
