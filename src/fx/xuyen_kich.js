!function (e) {
  "use strict";
  var a = e.VFX;
  if (a) {
    var n = e.XuyenKichFX = {};
    var i = 2 * Math.PI;
    var r = .1;
    var t = n.COLORS = { core: "#fff2d8", mid: "#ff9a3c", edge: "#d9361c", glow: "255,150,60", deep: "120,16,10" };
    var o = [];
    a.spawnXuyenKich = function (n, i, u) {
      if (u = u || {}, !n || !isFinite(n.x) || !isFinite(n.y)) {
        return null;
      }
      var s;
      var f;
      var d = u.dash > .05 ? Math.min(u.dash, .6) : .2;
      var h = (i && isFinite(i.x) ? i.x : n.x) - n.x;
      var y = (i && isFinite(i.y) ? i.y : n.y) - n.y;
      var x = Math.sqrt(h * h + y * y);
      if (x < 12) {
        var g = [[0, 1], [-1, 0], [1, 0], [0, -1]][0 | n.dir] || [0, 1];
        s = g[0];
        f = g[1];
        x = 90;
      }
      else {
        s = h / x;
        f = y / x;
      }
      var c = { type: "xuyenkich", owner: n, x: n.x, y: n.y, sx: n.x, sy: n.y, ux: s, uy: f, L: x, dash: d, el: 0, hitDone: !1, landDone: !1, emberT: 0, born: Date.now(), life: d + r + .3 + .06, max: d + r + .3 + .06 };
      a.list.push(c);
      o.push(c);
      if (a.spawnText) {
        a.spawnText(n.x, n.y - 64, "Xuyên Kích", "#ffb860");
      }
      if (e.Audio && e.Audio.atPoint) {
        e.Audio.atPoint("weapon_songkich", n.x, n.y, { rate: .62, gain: .9 });
      }
      if (l() >= 1 && a.spawnRing) {
        a.spawnRing(n.x, n.y - 4, t.edge, 22, .28);
      }
      return c;
    };
    n.dangLao = function () {
      return o.length > 0;
    };
    n.offsetOf = function (e) {
      for (var a = Date.now(), n = null, i = o.length - 1; i >= 0; i--) {
        var r = o[i];
        if (r.life <= 0 || r.el >= r.max || a - r.born > 3e3) {
          o.splice(i, 1);
        }
        else if (r.owner === e && !n) {
          var t = s(r);
          if (t > 0) {
            n = { x: Math.round(r.ux * t), y: Math.round(r.uy * t) };
          }
        }
      }
      return n;
    };
    n.update = function (e, n) {
      e.el += n;
      var i = e.el;
      if (!e.hitDone && i >= .3 * e.dash) {
        e.hitDone = !0;
        var r = s(e);
        var o = e.sx + e.ux * r;
        var u = e.sy + e.uy * r - 28;
        if (l() >= 1 && a.spawnRing) {
          a.spawnRing(o, u, t.mid, 26, .24);
        }
      }
      if (!e.landDone && i >= e.dash && (e.landDone = !0, l() >= 1 && a.spawnRing && a.spawnRing(e.sx + e.ux * e.L, e.sy + e.uy * e.L - 2, t.edge, 24, .3)), i < e.dash && l() >= 2 && (e.emberT -= n, e.emberT <= 0)) {
        e.emberT = .018;
        var f = s(e);
        var d = e.sx + e.ux * f;
        var h = e.sy + e.uy * f - 28;
        var y = 2 * (Math.random() - .5);
        a.list.push({ type: "spark", x: d - 8 * e.ux + -e.uy * y * 6, y: h - 8 * e.uy + e.ux * y * 6, vx: -e.ux * (20 + 30 * Math.random()) + -e.uy * y * 24, vy: -e.uy * (20 + 30 * Math.random()) + e.ux * y * 24 - 8, color: Math.random() < .5 ? t.mid : t.core, life: .2 + .1 * Math.random(), max: .3 });
      }
    };
    n.draw = function (e, a, n, o, d) {
      var h = a.el;
      var y = a.dash;
      var x = l();
      var g = -n;
      var c = -o;
      var p = a.ux;
      var v = a.uy;
      var m = a.sx + g;
      var w = a.sy - 28 + c;
      var b = s(a);
      var M = h < y + r;
      var T = m + p * a.L;
      var L = w + v * a.L;
      if (e.save(), "back" === d) {
        if (M) {
          var D = m + p * b;
          var R = w + v * b;
          var P = Math.max(0, b - 120);
          var C = m + p * P;
          var F = w + v * P;
          var O = h < y ? 1 : u(1 - (h - y) / r, 0, 1);
          if (x >= 2 && (e.globalCompositeOperation = "lighter", f(e, C, F, D, R, 0, 26, "rgba(" + t.glow + ",0.35)", .55 * O), e.globalCompositeOperation = "source-over"), f(e, C, F, D, R, 0, 15, t.edge, .85 * O), f(e, C, F, D, R, 0, 9, t.mid, .95 * O), f(e, C, F, D, R, 0, 4, t.core, O), x >= 1) {
            var A;
            var S = -v;
            var X = p;
            var k = [-13, 9, 18];
            var K = [.9, .7, .5];
            for (A = 0; A < 3; A++) {
              var q = Math.min(b, 120 * K[A]);
              var G = D + S * k[A];
              var I = R + X * k[A];
              f(e, G - p * q, I - v * q, G, I, 0, 1.6, t.core, .55 * O);
            }
          }
          if (x >= 2) {
            var N = e.createRadialGradient(D, R, 1, D, R, 20);
            N.addColorStop(0, "rgba(" + t.glow + ",0.5)");
            N.addColorStop(1, "rgba(" + t.glow + ",0)");
            e.globalCompositeOperation = "lighter";
            e.globalAlpha = O;
            e.fillStyle = N;
            e.beginPath();
            e.arc(D, R, 20, 0, i);
            e.fill();
          }
        }
      }
      else {
        var Q = u((h - y) / .42, 0, 1);
        var V = (1 - Q) * (1 - Q);
        var _ = h < y ? 1 - (1 - h / y) * (1 - h / y) : 1;
        var j = m + (T - m) * _;
        var z = w + (L - w) * _;
        var B = 1 + 5 * (1 - Q);
        if (V > .02) {
          f(e, m, w, j, z, .25 * B, 1.6 * B, t.edge, .75 * V);
          f(e, m, w, j, z, .15 * B, .9 * B, t.core, V);
        }
      }
      e.restore();
    };
  }
  function l() {
    var a = e.Quality;
    return a && "number" == typeof a.tier ? a.tier : 2;
  }
  function u(e, a, n) {
    return e < a ? a : e > n ? n : e;
  }
  function s(e) {
    var a = e.el;
    var n = e.dash;
    if (a <= n) {
      var i = u(a / n, 0, 1);
      return e.L * (1 - (1 - i) * (1 - i));
    }
    if (a <= n + r) {
      return e.L;
    }
    var t = (a - n - r) / .3;
    return t >= 1 ? 0 : e.L * (1 - function (e) {
      return e * e * (3 - 2 * e);
    }(t));
  }
  function f(e, a, n, i, r, t, o, l, u) {
    var s = i - a;
    var f = r - n;
    var d = Math.sqrt(s * s + f * f);
    if (!(d < .5 || u <= .01)) {
      var h = -f / d;
      var y = s / d;
      e.globalAlpha = u;
      e.fillStyle = l;
      e.beginPath();
      e.moveTo(a + h * t / 2, n + y * t / 2);
      e.lineTo(i + h * o / 2, r + y * o / 2);
      e.lineTo(i - h * o / 2, r - y * o / 2);
      e.lineTo(a - h * t / 2, n - y * t / 2);
      e.closePath();
      e.fill();
    }
  }
}(window.PNTT);
