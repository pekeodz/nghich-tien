!function (e) {
  "use strict";
  var t = document.getElementById("auth-gate");
  var n = document.getElementById("auth-scenery-canvas");
  if (t && n && e.TileMap && e.MapData) {
    var a = n.getContext("2d", { alpha: !1 });
    var i = [{ id: "tan_vien", drift: .48, phase: .4 }, { id: "long_uyen", drift: .12, phase: 2.1, bossOnly: !0 }, { id: "rung_mang_xa", drift: .54, phase: 4.2, atmosphere: !0 }];
    var r = !1;
    var o = 0;
    var h = 0;
    var c = 0;
    var s = null;
    var d = 0;
    var l = 0;
    var m = 0;
    var u = 1;
    var f = .75;
    var g = !(!window.matchMedia || !window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    if (window.addEventListener("resize", v), document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        if (o) {
          cancelAnimationFrame(o);
        }
        o = 0;
      }
      else {
        T();
      }
    }), window.matchMedia) {
      var p = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (p.addEventListener) {
        p.addEventListener("change", function (e) {
          g = e.matches;
          s = null;
          T();
        });
      }
    }
    if (window.MutationObserver) {
      new MutationObserver(O).observe(t, { attributes: !0, attributeFilter: ["class"] });
    }
    O();
  }
  function v() {
    l = Math.max(1, window.innerWidth || document.documentElement.clientWidth);
    m = Math.max(1, window.innerHeight || document.documentElement.clientHeight);
    u = Math.min(1.35, Math.max(1, window.devicePixelRatio || 1));
    n.width = Math.round(l * u);
    n.height = Math.round(m * u);
    a.setTransform(u, 0, 0, u, 0, 0);
    a.imageSmoothingEnabled = !1;
    T();
  }
  function w(e) {
    var t = {};
    Object.keys(e).forEach(function (n) {
      t[n] = e[n];
    });
    return t;
  }
  function M(e, t) {
    Object.keys(e).forEach(function (n) {
      if (!(Object.prototype.hasOwnProperty.call(t, n))) {
        delete e[n];
      }
    });
    Object.keys(t).forEach(function (n) {
      e[n] = t[n];
    });
  }
  function y(e, t, n) {
    var a = w(e);
    M(e, t);
    try {
      n();
    }
    finally {
      M(e, a);
    }
  }
  function E(t, n, a, i) {
    var o = e.TileMap;
    var c = w(o);
    var s = null;
    try {
      o.load(n);
      s = w(o);
    }
    catch (e) {
      console.warn("[PNTT] Không dựng được cảnh nền " + t.id + ":", e);
    }
    finally {
      M(o, c);
    }
    if (s) {
      var d = document.createElement("canvas");
      d.width = Math.max(1, Math.round(s.pxWidth * f));
      d.height = Math.max(1, Math.round(s.pxHeight * f));
      var l = d.getContext("2d", { alpha: !1 });
      l.imageSmoothingEnabled = !1;
      l.setTransform(f, 0, 0, f, 0, 0);
      l.fillStyle = n.ambient || "#111510";
      l.fillRect(0, 0, s.pxWidth, s.pxHeight);
      var m = [];
      var u = [];
      try {
        y(o, s, function () {
          o.visibleObjects(0, 0, o.pxWidth, o.pxHeight).forEach(function (e) {
            m.push({ sortY: e.sortY, object: e });
          });
          o.visibleProps(0, 0, o.pxWidth, o.pxHeight).forEach(function (e) {
            m.push({ sortY: e.sortY, prop: e });
          });
          m.sort(function (e, t) {
            return e.sortY - t.sortY;
          });
          var n = o.enemySpawns || [];
          var a = [];
          var i = [];
          n.forEach(function (t) {
            var n = e.ENEMY_DEFS && e.ENEMY_DEFS[t.type];
            if (n && n.isBoss) {
              a.push(t);
            }
            else {
              i.push(t);
            }
          });
          u = a.slice();
          if (!(t.bossOnly)) {
            i.slice(0, Math.max(0, 4 - u.length)).forEach(function (e) {
              u.push(e);
            });
          }
        });
      }
      catch (e) {
        console.warn("[PNTT] Không phân lớp được cảnh nền " + t.id + ":", e);
        return void i(null);
      }
      var g = 0;
      var p = !1;
      var v = 0;
      var E = 0;
      var b = !1;
      var x = [e.HuyetXichArt, e.TanVienArt, e.LongUyenArt].filter(function (e) {
        return e && e.coTranh && e.coTranh(n);
      })[0] || null;
      var T = 0;
      !function c() {
        if (r && a === h) {
          var f = performance.now();
          if (x && 0 === g && !x.sanSang(n) && (T || (T = f, x.chuanBiTruoc(n, null)), f - T < 4e3)) {
            requestAnimationFrame(c);
          }
          else {
            try {
              y(o, s, function () {
                for (; g < o.height && (0 === g || performance.now() - f < 5);)
                  o.drawGround(l, 0, g * e.CONFIG.TILE, o.pxWidth - 1, e.CONFIG.TILE - 1, 0, !1), g++;
                if (g >= o.height && !p) {
                  o.drawFlatProps(l, 0, 0, 4);
                  p = !0;
                }
                for (var n = 0; g >= o.height && p && v < m.length && n < 8 && (0 === n || performance.now() - f < 5);) {
                  var a = m[v++];
                  if (n++, a.object) {
                    o.drawObject(l, a.object, 0, 0, 4);
                  }
                  else {
                    var i = a.prop;
                    if (i.name) {
                      var r = {};
                      Object.keys(i).forEach(function (e) {
                        if ("name" !== e) {
                          r[e] = i[e];
                        }
                      });
                      i = r;
                    }
                    o.drawProp(l, i, 0, 0, 4);
                  }
                }
                if (g >= o.height && p && v >= m.length && !b) {
                  if (e.Enemy && e.Enemy.create && e.Enemy.draw) {
                    for (; E < u.length;) {
                      var h = e.Enemy.create(u[E]);
                      h.animTime = .8 + .12 * E;
                      h.wanderTimer = 0;
                      e.Enemy.draw(h, l, 0, 0, 4 + .1 * E);
                      E++;
                    }
                  }
                  if (t.atmosphere && e.ThreeMapsAtmosphere && e.ThreeMapsAtmosphere.drawOverlays) {
                    e.ThreeMapsAtmosphere.drawOverlays(l, o, 0, 0, o.pxWidth, o.pxHeight, 8);
                  }
                  b = !0;
                }
              });
            }
            catch (e) {
              console.warn("[PNTT] Lỗi khi vẽ cảnh nền " + t.id + ":", e);
              return void i(null);
            }
            if (g >= o.height && p && v >= m.length && b) {
              i(d);
            }
            else {
              requestAnimationFrame(c);
            }
          }
        }
      }();
    }
    else {
      i(null);
    }
  }
  function b(e, t, n, i) {
    var r = 1.08 * Math.max(l / t.width, m / t.height);
    var o = t.width * r;
    var h = t.height * r;
    var c = Math.max(0, o - l);
    var s = Math.max(0, h - m);
    var d = g ? 0 : Math.sin(.035 * n + e.phase);
    var u = Math.max(0, Math.min(1, e.drift + .1 * d));
    var f = g ? .5 : .5 + .025 * Math.sin(.018 * n + e.phase);
    a.save();
    a.globalAlpha = i;
    a.drawImage(t, -c * u, -s * f, o, h);
    a.restore();
  }
  function x(e) {
    if (o = 0, r && !document.hidden) {
      var t = e / 1e3;
      a.setTransform(u, 0, 0, u, 0, 0);
      a.imageSmoothingEnabled = !1;
      a.globalAlpha = 1;
      a.fillStyle = "#0b100c";
      a.fillRect(0, 0, l, m);
      var n = i[c];
      if (n && n.image && b(n, n.image, t, 1), !g && !s && t - d >= 27) {
        var h = (c + 1) % i.length;
        if (i[h] && i[h].image) {
          s = { to: h, startedAt: t };
        }
      }
      if (s) {
        var f = Math.min(1, (t - s.startedAt) / 3.2);
        var p = i[s.to];
        b(p, p.image, t, f);
        if (f >= 1) {
          c = s.to;
          d = t;
          s = null;
        }
      }
      if (!(g)) {
        T();
      }
    }
  }
  function T() {
    if (!(!r || o || document.hidden)) {
      o = requestAnimationFrame(x);
    }
  }
  function A(t, n) {
    if (r && n === h && !(t >= i.length)) {
      var a;
      var o = i[t];
      var s = (a = o.id, e.MapData.get ? e.MapData.get(a) : e.MapData[a.toUpperCase()]);
      if (!s) {
        o.ready = !0;
        return void A(t + 1, n);
      }
      if (o.ready) {
        A(t + 1, n);
      }
      else {
        if (o.image) {
          l();
        }
        else {
          E(o, s, n, function (e) {
            if (r && n === h) {
              if (e) {
                o.image = e;
              }
              if (0 === t && o.image && 0 === c) {
                d = performance.now() / 1e3;
              }
              T();
              l();
            }
          });
        }
      }
    }
    function l() {
      var a = e.Assets && e.Assets.ensureMap ? e.Assets.ensureMap(s) : Promise.resolve([]);
      Promise.resolve(a).then(function () {
        if (r && n === h) {
          E(o, s, n, function (e) {
            if (r && n === h) {
              o.ready = !0;
              if (e) {
                o.image = e;
              }
              T();
            }
          });
        }
      }, function () {
        o.ready = !0;
      });
      A(t + 1, n);
    }
  }
  function O() {
    if (t.classList.contains("hidden")) {
      (function () {
        if (r) {
          r = !1;
          h++;
          s = null;
          if (o) {
            cancelAnimationFrame(o);
          }
          o = 0;
          for (var e = 0; e < i.length; e++)
            i[e].image && (i[e].image.width = 0, i[e].image.height = 0), i[e].image = null, i[e].ready = !1;
          n.width = 1;
          n.height = 1;
        }
      })();
    }
    else {
      if (!(r || t.classList.contains("hidden"))) {
        r = !0;
        h++;
        c = 0;
        s = null;
        d = performance.now() / 1e3;
        v();
        A(0, h);
        T();
      }
    }
  }
}(window.PNTT);
