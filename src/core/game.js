!function (n) {
  "use strict";
  var e = n.Game = { scene: null, running: !1, time: 0, paused: !1, crashed: !1 };
  var t = 0;
  var i = null;
  var r = 0;
  var o = !1;
  var c = n.Probe || { on: !1, KIND: {}, now: function () {
      return 0;
    }, time: function () {
    }, sample: function () {
    }, count: function () {
    }, warn: function () {
    } };
  function a(t, i) {
    if (e.scene && e.scene.exit) {
      e.scene.exit();
    }
    n.Input.resetAll();
    e.scene = t;
    if (t && t.enter) {
      t.enter(i || {});
    }
  }
  function u() {
    if (!o && e.running) {
      o = !0;
      requestAnimationFrame(s);
    }
  }
  function s(i) {
    if (o = !1, e.running) {
      var a = n.Quality ? n.Quality.fpsCap(i) : 0;
      if (a > 0 && i - t < 900 / a && i >= t) {
        u();
      }
      else {
        var s = i - t;
        var l = s / 1e3;
        t = i;
        var d = 1;
        if (a > 0 && a < 20 && s > 50 && s < 1e3) {
          l /= d = Math.min(8, Math.ceil(s / 50));
        }
        if (l > .05) {
          l = .05;
        }
        if (l < 0) {
          l = 0;
        }
        var m = a > 0 && a < 20;
        if (m) {
          c.count("khung tiết kiệm pin");
        }
        else {
          if (s >= 0 && s < 1e3) {
            c.time("khung hình", s);
          }
        }
        if (s >= 1e3) {
          c.count("trang tỉnh lại sau khi bị treo");
        }
        if (!m && s > 100 && s < 1e3) {
          c.count("khung khựng quá 100ms");
          c.sample(c.KIND.stall, Math.round(s));
          c.warn("stall", "Khung hình khựng " + Math.round(s) + "ms");
        }
        var h = c.on ? c.now() : 0;
        var p = h;
        var f = h;
        var g = h;
        try {
          if (n.Input.update(), c.on && (p = f = g = c.now()), e.scene) {
            for (var x = 0; x < d; x++)
              e.time += l, e.scene.update && e.scene.update(l);
            if (c.on) {
              f = g = c.now();
            }
            if (e.scene.draw) {
              e.scene.draw(n.Renderer.ctx);
            }
            if (c.on) {
              g = c.now();
            }
          }
          else {
            e.time += l * d;
          }
          if (n.Renderer.present(), r = 0, c.on) {
            var v = c.now();
            c.time("· đọc phím", p - h);
            c.time("· cập nhật", f - p);
            c.time("· vẽ", g - f);
            c.time("· đưa lên màn", v - g);
          }
        }
        catch (n) {
          if (!function (n) {
            r++;
            c.count("khung hình ném lỗi");
            if (1 === r) {
              console.error("[PNTT] Lỗi giữa khung hình:", n);
            }
            return r < 30 || (e.running = !1, e.crashed = !0, console.error("[PNTT] Dừng vòng lặp: " + r + " khung hình liên tiếp ném lỗi.", n), function () {
              try {
                if (!document.body || document.getElementById("pntt-crash")) {
                  return;
                }
                var n = document.createElement("div");
                n.id = "pntt-crash";
                n.setAttribute("role", "alert");
                n.style.cssText = "position:fixed;inset:0;z-index:9999;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;padding:24px;background:rgba(10,12,16,.92);color:#e8e0cc;text-align:center;font:16px/1.6 system-ui,sans-serif";
                var e = document.createElement("p");
                e.style.cssText = "margin:0;max-width:32em";
                e.textContent = "Thế giới vừa gặp lỗi và đã dừng lại. Tiến trình của ngươi nằm ở máy chủ, tải lại là chơi tiếp được.";
                var t = document.createElement("button");
                t.type = "button";
                t.textContent = "Tải lại";
                t.style.cssText = "padding:10px 22px;font:inherit;cursor:pointer;border-radius:6px;border:1px solid #c9a45c;background:#1b1f27;color:#e8e0cc";
                t.onclick = function () {
                  location.reload();
                };
                n.appendChild(e);
                n.appendChild(t);
                document.body.appendChild(n);
              }
              catch (n) {
              }
            }(), !1);
          }(n)) {
            return;
          }
        }
        u();
      }
    }
  }
  e.init = function () {
    i = document.getElementById("fade");
    return e;
  };
  e.changeScene = function (n, e, t) {
    if (t) {
      a(n, e);
    }
    else {
      i.classList.add("on");
      setTimeout(function () {
        a(n, e);
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            i.classList.remove("on");
          });
        });
      }, 420);
    }
  };
  e.start = function () {
    if (!(e.running)) {
      e.running = !0;
      e.crashed = !1;
      r = 0;
      t = performance.now();
      u();
    }
  };
}(window.PNTT);
