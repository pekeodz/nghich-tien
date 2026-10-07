!function (a) {
  "use strict";
  var t = a.VFX;
  if (t) {
    var e = a.Pixel;
    var r = a.Utils;
    var n = a.TrucKiemFX = {};
    var h = 2 * Math.PI;
    var i = n.COLORS = { white: "#ffffff", pale: "#e9ffb0", lime: "#a6ee54", green: "#55c640", deep: "#26893a", glow: "#d2ff8c", leaf: "#6ccf45", leafHi: "#c8f27e", leafDeep: "#2e8a3a", gold: "#f0c75a", goldHi: "#ffe9a0", goldDeep: "#a8741c" };
    var o = [i.glow, i.white, i.pale, i.lime, i.green, i.deep];
    var f = .16;
    var M = .66;
    var s = .78;
    var l = {};
    var u = 96;
    var d = new Uint8Array(9216);
    var c = u;
    var p = u;
    var m = -1;
    var v = -1;
    var w = [.5, .8, 1];
    n.spawnSlash = function (a, e, r) {
      t.list.push({ type: "truckiem", x: a, y: e - (r.lift || 22), start: r.start * Math.PI / 180, sweep: r.sweep * Math.PI / 180, radius: (r.radius || 17) + 5, seed: 1e3 * Math.random() | 0, lite: k(), life: .66, max: .66 });
    };
    var x = new Float32Array(49);
    var g = new Float32Array(49);
    var y = { flat: [[[-2, -1, 0], [-1, -1, 0], [0, -1, 0], [1, -1, 0], [-3, 0, 2], [-2, 0, 0], [-1, 0, 1], [0, 0, 1], [1, 0, 0], [2, 0, 2], [-1, 1, 2], [0, 1, 2], [1, 1, 2]], [[-1, -2, 0], [-1, -1, 0], [-1, 0, 0], [-1, 1, 0], [0, -3, 2], [0, -2, 0], [0, -1, 1], [0, 0, 1], [0, 1, 0], [0, 2, 2], [1, -1, 2], [1, 0, 2], [1, 1, 2]], [[-2, -2, 2], [-1, -1, 0], [0, 0, 1], [1, 1, 0], [2, 2, 2], [-1, -2, 0], [0, -1, 0], [1, 0, 0], [2, 1, 0], [-2, -1, 2], [-1, 0, 2], [0, 1, 2], [1, 2, 2]], [[2, -2, 2], [1, -1, 0], [0, 0, 1], [-1, 1, 0], [-2, 2, 2], [1, -2, 0], [0, -1, 0], [-1, 0, 0], [-2, 1, 0], [2, -1, 2], [1, 0, 2], [0, 1, 2], [-1, 2, 2]]], edge: [[[-1, 0, 2], [0, 0, 1], [1, 0, 2]], [[0, -1, 2], [0, 0, 1], [0, 1, 2]], [[-1, -1, 2], [0, 0, 1], [1, 1, 2]], [[1, -1, 2], [0, 0, 1], [-1, 1, 2]]] };
    var P = { green: [i.leaf, i.leafHi, i.leafDeep], gold: [i.gold, i.goldHi, i.goldDeep] };
    n.draw = function (a, t, r, n) {
      var o = t.max - t.life;
      if (!(o < 0)) {
        var l;
        var u;
        var d = t.lite ? Math.min(H(), 1) : H();
        var c = Math.round(t.x - r);
        var p = Math.round(t.y - n);
        var m = F(o / f);
        if (o <= f) {
          l = Math.max(0, m - M);
          u = 1;
        }
        else {
          var v = Math.min(1, (o - f) / .24);
          l = 1 - M + M * v * v;
          u = 1 - v * v;
        }
        if (u > .03 && l < m) {
          A();
          if (d >= 2) {
            X(t, m - .07, l + .12, 3.6, -3.5, !0);
          }
          if (d >= 2 && o <= 1.4 * f) {
            (function (a, t, e, r) {
              var n;
              var h;
              var i = a.start + a.sweep * t;
              var o = Math.cos(i);
              var f = Math.sin(i) * s;
              var M = a.radius - r;
              var l = Math.round(2.2 * M);
              for (n = 0; n <= l; n++)
                h = r + M * n / l, T(Math.floor(o * h), Math.floor(f * h), S(1, n > .7 * l ? 1 : 3));
            })(t, m, 0, .38 * t.radius);
          }
          X(t, m, l, 8.5, 0, !1);
          O(a, c, p, Q(u));
          if (d >= 2) {
            C(a, c, p, t, o, 9);
          }
          (function (a, t, r, n, h, o, M) {
            var s;
            var l;
            var u = U(n, M, n.radius * (.88 + .12 * M));
            var d = Math.max(0, 1 - Math.abs(h - f) / .08);
            var c = 1 + Math.round(3 * d);
            var p = t + Math.floor(u.x);
            var m = r + Math.floor(u.y);
            for (e.r(a, p - 1, m - 1, 2, 2, I(i.white, o)), s = 2; s <= c + 1; s++)
              D(a, p - s, m, I(i.pale, l = o * (1 - (s - 2) / (c + .6)))), D(a, p + s - 1, m, I(i.pale, l)), D(a, p, m - s, I(i.pale, l)), D(a, p - 1, m + s - 1, I(i.pale, l));
            if (d > .4) {
              D(a, p - 2, m - 2, I(i.lime, o * d));
              D(a, p + 2, m - 2, I(i.lime, o * d));
              D(a, p - 2, m + 2, I(i.lime, o * d));
              D(a, p + 2, m + 2, I(i.lime, o * d));
            }
          })(a, c, p, t, o, u, m);
        }
        else {
          if (d >= 2) {
            C(a, c, p, t, o, 9);
          }
        }
        if (d >= 1) {
          (function (a, t, e, r, n, i) {
            var o;
            var M;
            var l;
            var u;
            var d;
            var c;
            var p;
            var m;
            var v;
            var w;
            var x;
            var g;
            var y;
            var P;
            var I;
            var H;
            var k;
            var D;
            var F = r.sweep >= 0 ? 1 : -1;
            for (o = 0; o < i; o++)
              m = .3 + .62 * (o + .3 + .5 * b(r.seed, o, 1)) / i, n < (v = f * q(m)) || (l = n - v) >= (w = .4 + .26 * b(r.seed, o, 2)) || (y = U(r, m, r.radius * (.92 + .16 * b(r.seed, o, 3))), x = 38 + 34 * b(r.seed, o, 4), g = 10 + 20 * b(r.seed, o, 5), P = -Math.sin(y.a) * F, I = Math.cos(y.a) * s * F, H = Math.sqrt(P * P + I * I) || 1, k = Math.cos(y.a), D = Math.sin(y.a) * s, u = L(M = { x0: y.x, y0: y.y, vx: P / H * x + k * g, vy: I / H * x + D * g - 8, g: 32 + 14 * b(r.seed, o, 6), amp: 2 + 2.6 * b(r.seed, o, 7), w: 11 + 5 * b(r.seed, o, 8), ph: b(r.seed, o, 9) * h }, l), d = l > .6 * w ? 1 - (l - .6 * w) / (.4 * w) : 1, c = Math.abs(u.ph) > .35, p = Math.atan2(M.vy + M.g * l, M.vx) + .9 * u.ph, K(a, t + u.x, e + u.y, p, c, o % 5 == 4 ? 1 : 0, d));
          })(a, c, p, t, o, d >= 2 ? 8 : 4);
        }
      }
    };
    n.spawnImpact = function (a, e, r, n) {
      t.list.push({ type: "truckiemhit", x: a, y: e, angle: Math.atan2(n || -1, r || 0), seed: 1e3 * Math.random() | 0, lite: k(), life: .5, max: .5 });
    };
    n.drawHit = function (a, t, e, r) {
      var n = t.max - t.life;
      if (!(n < 0)) {
        var o;
        var f;
        var M;
        var s;
        var l;
        var u = t.lite ? Math.min(H(), 1) : H();
        var d = Math.round(t.x - e);
        var c = Math.round(t.y - r);
        if (A(), n < .09) {
          for (f = 1 - n / .09, o = -(s = 2 + Math.round(5 * f)); o <= s; o++)
            T(o, 0, S(2, 0 === o ? 1 : Math.abs(o) > s - 2 ? 3 : 2)), T(0, o, S(2, 0 === o ? 1 : Math.abs(o) > s - 2 ? 3 : 2));
          for (o = -(s >> 1) - 1; o <= 1 + (s >> 1); o++)
            T(o, o, S(2, 2)), T(o, -o, S(2, 2));
          T(-1, -1, S(2, 1));
          T(0, -1, S(2, 1));
          T(-1, 0, S(2, 1));
          T(0, 0, S(2, 1));
        }
        if (n < .19) {
          f = n / .19;
          var p = Math.min(1, n / .045);
          l = f < .55 ? 2 : f < .8 ? 1 : 0;
          N(t.angle + Math.PI / 2 + .6, 30 * p, 5.2 * (1 - .35 * f), l);
          N(t.angle + Math.PI / 2 - .6, 23 * p, 4 * (1 - .35 * f), l);
        }
        if (n < .26 && (l = (f = n / .26) < .55 ? 2 : f < .8 ? 1 : 0, R(s = 3 + 11 * F(f), 3, l), u >= 1 && R(s - 1.3, 2, l)), O(a, d, c, Q(1)), u >= 1) {
          var m;
          var v;
          var w;
          var x;
          var g;
          var y;
          var P;
          var k;
          var q;
          var U;
          var X = u >= 2 ? 10 : 5;
          for (o = 0; o < X; o++)
            m = t.angle + o / X * h + .7 * (b(t.seed, o, 1) - .5), v = 70 + 60 * b(t.seed, o, 2), (x = n) >= (w = .32 + .2 * b(t.seed, o, 3)) || (g = (1 - Math.exp(-3.6 * x)) / 3.6, U = x > .6 * w ? 1 - (x - .6 * w) / (.4 * w) : 1, K(a, d + (k = Math.cos(m)) * v * g - (q = Math.sin(m)) * (P = 2.4 * (y = Math.sin(14 * x + b(t.seed, o, 4) * h)) * Math.min(1, 6 * x)), c + q * v * .62 * g + k * P + 22 * x * x - 5 * Math.min(1, 8 * x), m + .8 * y, Math.abs(y) > .35, 0, U));
        }
        if (n < .18) {
          f = n / .18;
          var C;
          var L;
          var V = u >= 2 ? 8 : 4;
          for (o = 0; o < V; o++)
            m = t.angle + .4 + o / V * h + .5 * (b(t.seed, o, 5) - .5), v = 12 + 28 * f * (.6 + .8 * b(t.seed, o, 6)), D(a, C = d + Math.cos(m) * v, L = c + Math.sin(m) * v * .62, I(o % 2 ? i.pale : i.white, M = 1 - f)), D(a, C - 2 * Math.cos(m), L - 1.2 * Math.sin(m), I(i.lime, .7 * M));
        }
      }
    };
  }
  function I(a, t) {
    var e = t >= .94 ? 8 : Math.round(8 * t);
    if (e <= 0) {
      return null;
    }
    var n = a + e;
    var h = l[n];
    if (!(h)) {
      h = l[n] = 8 === e ? a : r.alpha(a, e / 8);
    }
    return h;
  }
  function b(a, t, e) {
    var r = 43758.5453 * Math.sin(12.9898 * a + 78.233 * t + 37.719 * e);
    return r - Math.floor(r);
  }
  function H() {
    return a.Quality ? a.Quality.tier : 2;
  }
  function k() {
    var a;
    var e;
    var r = 0;
    for (a = 0; a < t.list.length; a++)
      "truckiem" !== (e = t.list[a].type) && "truckiemhit" !== e || r++;
    return r >= 6;
  }
  function D(a, t, r, n) {
    if (n) {
      e.dot(a, t, r, n);
    }
  }
  function F(a) {
    return 1 - Math.pow(1 - Math.min(1, Math.max(0, a)), 1.7);
  }
  function q(a) {
    return 1 - Math.pow(1 - Math.min(1, Math.max(0, a)), 1 / 1.7);
  }
  function A() {
    d.fill(0);
    c = u;
    p = u;
    m = -1;
    v = -1;
  }
  function T(a, t, e) {
    t += 48;
    if (!((a += 48) < 0 || t < 0 || a >= u || t >= u)) {
      d[t * u + a] = e;
      if (a < c) {
        c = a;
      }
      if (a > m) {
        m = a;
      }
      if (t < p) {
        p = t;
      }
      if (t > v) {
        v = t;
      }
    }
  }
  function O(a, t, r, n) {
    var h;
    var i;
    var o;
    var f;
    var M;
    var s;
    for (i = p; i <= v; i++)
      for (s = i * u, h = c; h <= m;)
        if (o = d[s + h]) {
          for (f = 1; h + f <= m && d[s + h + f] === o;)
            f++;
          if ((M = n[o])) {
            e.r(a, t - 48 + h, r - 48 + i, f, 1, M);
          }
          h += f;
        }
        else {
          h++;
        }
  }
  function Q(a) {
    var t;
    var e;
    var r = [null];
    for (t = 0; t < 3; t++)
      for (e = 0; e < o.length; e++)
        r.push(I(o[e], a * w[t] * (0 === e ? .45 : 1)));
    return r;
  }
  function S(a, t) {
    return 1 + a * o.length + t;
  }
  function U(a, t, e) {
    var r = a.start + a.sweep * t;
    return { x: Math.cos(r) * e, y: Math.sin(r) * e * s, a: r };
  }
  function X(a, t, e, r, n, i) {
    var o;
    var f;
    var M;
    var l;
    var u;
    var d;
    var c;
    var p;
    var m;
    var v;
    var w;
    var y;
    var P;
    var I;
    var b = a.radius + n;
    var H = t - e;
    var k = 1 / a.sweep;
    var D = a.start + .5 * a.sweep;
    if (!(H <= 0)) {
      for (m = 0; m <= 48; m++)
        p = m / 48, x[m] = b * (.88 + .12 * p), g[m] = r * Math.pow(p, 1.1) * Math.min(1, 7 * (1 - p) + .35) + .8;
      var F = a.start + a.sweep * e;
      var q = a.start + a.sweep * t;
      var A = Math.cos(F);
      var O = Math.sin(F);
      var Q = Math.cos(q);
      var U = Math.sin(q);
      var X = a.sweep >= 0 ? 1 : -1;
      var C = b + 1.5;
      var K = b - r - 3;
      var L = Math.ceil(C);
      var N = Math.ceil(C * s);
      for (f = -N; f <= N; f++)
        for (l = (f + .5) / s, o = -L; o <= L; o++)
          X * (A * l - O * (M = o + .5)) < -.05 || X * (M * U - l * Q) < -.05 || (u = Math.sqrt(M * M + l * l)) > C || u < K || (d = Math.atan2(l, M) - D, (c = .5 + (d -= h * Math.round(d / h)) * k) < e || c > t || (v = x[m = 48 * (p = (c - e) / H) + .5 | 0], w = g[m], u > v + .5 || u < v - w || (y = u > v ? 0 : (v - u) / w, P = p < .2 ? 0 : p < .5 ? 1 : 2, i ? (P = Math.max(0, P - 1), I = y < .4 ? 2 : 3) : I = u > v - .3 ? 1 : y < .28 ? 2 : y < .55 ? 3 : y < .82 ? 4 : 5, T(o, f, S(P, I)))));
    }
  }
  function C(a, t, e, r, n, h) {
    var o;
    var M;
    var s;
    var l;
    var u;
    var d;
    for (o = 0; o < h; o++)
      M = .1 + .85 * (o + b(r.seed, o, 21)) / h, l = n - f * q(M), s = .16 + .16 * b(r.seed, o, 22), l < 0 || l >= s || (u = U(r, M, r.radius * (.72 + .4 * b(r.seed, o, 23)) + 16 * l), d = 1 - l / s, (Math.floor(40 * l) + o) % 3 == 2 && (d *= .4), D(a, t + Math.floor(u.x), e + Math.floor(u.y), I(o % 3 ? i.pale : i.white, d)));
  }
  function K(a, t, e, r, n, h, i) {
    var o;
    var f;
    var M;
    var s = (n ? y.flat : y.edge)[function (a) {
      var t = (a % Math.PI + Math.PI) % Math.PI;
      return t < Math.PI / 8 || t >= 7 * Math.PI / 8 ? 0 : t < 3 * Math.PI / 8 ? 2 : t < 5 * Math.PI / 8 ? 1 : 3;
    }(r)];
    var l = h ? P.gold : P.green;
    for (t = Math.floor(t), e = Math.floor(e), o = 0; o < s.length; o++)
      (M = I(l[(f = s[o])[2]], i)) && D(a, t + f[0], e + f[1], M);
  }
  function L(a, t) {
    var e = (1 - Math.exp(-3.2 * t)) / 3.2;
    var r = a.amp * Math.sin(a.w * t + a.ph) * Math.min(1, 5 * t);
    var n = -a.vy;
    var h = a.vx;
    var i = Math.sqrt(n * n + h * h) || 1;
    return { x: a.x0 + a.vx * e + n / i * r, y: a.y0 + a.vy * e + h / i * r + .5 * a.g * t * t, ph: Math.sin(a.w * t + a.ph) };
  }
  function N(a, t, e, r) {
    var n;
    var h;
    var i;
    var o;
    var f;
    var M = Math.cos(a);
    var l = Math.sin(a);
    var u = -l;
    var d = M;
    var c = Math.round(2 * t);
    for (n = 0; n <= c; n++)
      for (h = n / c - .5, o = -(i = e * Math.pow(Math.max(0, 1 - 2 * Math.abs(h)), .75) + .6) / 2; o <= i / 2 + .01; o += .5)
        f = Math.abs(o) / (i / 2 + .01), T(Math.floor(M * t * h + u * o), Math.floor((l * t * h + d * o) * s), S(r, f < .3 ? 1 : f < .62 ? 2 : f < .88 ? 3 : 4));
  }
  function R(a, t, e) {
    var r;
    var n;
    var i = Math.max(16, Math.round(7 * a));
    for (r = 0; r < i; r++)
      n = r / i * h, T(Math.floor(Math.cos(n) * a), Math.floor(Math.sin(n) * a * .62), S(e, t));
  }
}(window.PNTT);
