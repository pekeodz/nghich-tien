!function (r) {
  "use strict";
  var a = "thach_phong_thung_lung";
  var n = 32;
  var t = 256;
  var o = r.ThungLungArt = {};
  function i(r, a, n) {
    var t = Math.imul(0 | r, 374761393) ^ Math.imul(0 | a, 668265263) ^ Math.imul(40503 + (0 | n), 1274126177);
    return ((t = Math.imul(t ^ t >>> 13, 1274126177)) ^ t >>> 16) >>> 0;
  }
  function u(r, a, n) {
    return i(r, a, n) / 4294967296;
  }
  function e(r) {
    return r < 0 ? 0 : r > 1 ? 1 : r;
  }
  function f(r, a, n) {
    return r < a ? a : r > n ? n : r;
  }
  function h(r, a, n) {
    var t = e((n - r) / (a - r));
    return t * t * (3 - 2 * t);
  }
  function l() {
    return "undefined" != typeof performance ? performance.now() : Date.now();
  }
  var v = 512;
  var c = 511;
  var s = null;
  var d = null;
  function M(r, a) {
    for (var n = new Float32Array(v * v), t = 0; t < r.length; t++) {
      for (var o = r[t][0], i = r[t][1], e = v / o, f = new Float32Array(e * e), h = 0; h < f.length; h++)
        f[h] = 2 * u(h, 7 * t + a, o) - 1;
      for (var l = 0; l < v; l++) {
        var c = l / o;
        var s = 0 | c;
        var d = c - s;
        d = d * d * (3 - 2 * d);
        for (var M = s % e * e, g = (s + 1) % e * e, y = 0; y < v; y++) {
          var x = y / o;
          var m = 0 | x;
          var p = x - m;
          p = p * p * (3 - 2 * p);
          var w = m % e;
          var b = (m + 1) % e;
          var T = f[M + w];
          var D = f[M + b];
          var k = f[g + w];
          var L = f[g + b];
          n[l * v + y] += i * (T + (D - T) * p + (k - T) * d + (T - D - k + L) * p * d);
        }
      }
    }
    return n;
  }
  function g(r, a) {
    return s[(a & c) << 9 | r & c];
  }
  function y(r, a) {
    return d[(a & c) << 9 | r & c];
  }
  var x = 0;
  var m = 0;
  var p = 0;
  var w = 0;
  var b = 0;
  function T(r, a, n, t) {
    for (var o = Math.ceil(r / n) + 3, i = Math.ceil(a / n) + 3, e = new Float32Array(o * i), f = new Float32Array(o * i), h = 0; h < i; h++)
      for (var l = 0; l < o; l++)
        e[h * o + l] = (l - 1 + .17 + .66 * u(l, h, t)) * n, f[h * o + l] = (h - 1 + .17 + .66 * u(l, h, t + 1)) * n;
    return { cw: n, nx: o, ny: i, sx: e, sy: f, dec: new Int8Array(o * i) };
  }
  var D = new Float32Array(9);
  var k = new Float32Array(9);
  var L = new Int32Array(9);
  function A(r, a, n) {
    for (var t = r.cw, o = r.nx, i = Math.floor(a / t) + 1, u = Math.floor(n / t) + 1, e = 0, f = 1e9, h = 0, l = r.sx, v = r.sy, c = -1; c <= 1; c++)
      for (var s = -1; s <= 1; s++) {
        var d = (u + c) * o + (i + s);
        D[e] = l[d];
        k[e] = v[d];
        L[e] = d;
        var M = a - D[e];
        var g = n - k[e];
        var y = M * M + g * g;
        if (y < f) {
          f = y;
          h = e;
        }
        e++;
      }
    for (var T = D[h], A = k[h], W = 1e9, P = h, F = 0; F < e; F++)
      if (F !== h) {
        var H = D[F] - T;
        var I = k[F] - A;
        var O = Math.sqrt(H * H + I * I);
        var R = (.5 * (D[F] + T) - a) * H / O + (.5 * (k[F] + A) - n) * I / O;
        if (R < W) {
          W = R;
          P = F;
        }
      }
    x = W;
    m = a - T;
    p = n - A;
    w = L[h];
    b = L[P];
  }
  function W(r, a, n, t) {
    var o;
    var i;
    var u;
    var e;
    var f;
    var h;
    var l = new Float32Array(r.length);
    var v = new Float32Array(r.length);
    for (i = 0; i < n; i++) {
      var c = i * a;
      for (u = 0, e = 0, o = 0; o <= t && o < a; o++)
        u += r[c + o], e++;
      for (o = 0; o < a; o++)
        l[c + o] = u / e, h = o - t, (f = o + t + 1) < a && (u += r[c + f], e++), h >= 0 && (u -= r[c + h], e--);
    }
    for (o = 0; o < a; o++) {
      for (u = 0, e = 0, i = 0; i <= t && i < n; i++)
        u += l[i * a + o], e++;
      for (i = 0; i < n; i++)
        v[i * a + o] = u / e, h = i - t, (f = i + t + 1) < n && (u += l[f * a + o], e++), h >= 0 && (u -= l[h * a + o], e--);
    }
    return v;
  }
  function P(r, a, n, t) {
    for (var o = 0; o < t.length; o++)
      r = W(r, a, n, t[o]);
    return r;
  }
  var F = 0;
  var H = 0;
  var I = 0;
  function O(r, a, n) {
    var t = (a + .5) / 4 - .5;
    var o = (n + .5) / 4 - .5;
    var i = Math.floor(t);
    var u = Math.floor(o);
    H = t - i;
    I = o - u;
    if (i < 0) {
      i = 0;
      H = 0;
    }
    else {
      if (i > r.gw - 2) {
        i = r.gw - 2;
        H = 1;
      }
    }
    if (u < 0) {
      u = 0;
      I = 0;
    }
    else {
      if (u > r.gh - 2) {
        u = r.gh - 2;
        I = 1;
      }
    }
    F = u * r.gw + i;
  }
  function R(r, a) {
    var n = r[F];
    var t = r[F + 1];
    var o = r[F + a];
    var i = r[F + a + 1];
    return n + (t - n) * H + (o - n) * I + (n - t - o + i) * H * I;
  }
  function q(r) {
    var a = parseInt(r.slice(1), 16);
    return [a >> 16 & 255, a >> 8 & 255, 255 & a];
  }
  function N(r, a, n) {
    return [r[0] + (a[0] - r[0]) * n, r[1] + (a[1] - r[1]) * n, r[2] + (a[2] - r[2]) * n];
  }
  function _(r, a) {
    for (var n = [], t = 0; t < a; t++) {
      for (var o = t / (a - 1), i = 0; i < r.length - 2 && o > r[i + 1][0];)
        i++;
      var u = r[i];
      var f = r[i + 1];
      var h = N(u[1], f[1], e((o - u[0]) / (f[0] - u[0])));
      n.push([Math.round(h[0]), Math.round(h[1]), Math.round(h[2])]);
    }
    return n;
  }
  function U(r, a, n) {
    var t = q(r.line);
    var o = q(r.d1);
    var i = q(r.base);
    var u = q(r.d2);
    var e = q(r.d3 || r.d2);
    return _([[0, N(t, a, .55)], [.16, t], [.36, o], [.52, i], [.68, u], [.84, e], [1, N(e, n, .42)]], 12);
  }
  function C(r, a, n) {
    return r.map(function (r) {
      var t = N(r, a, n);
      return [Math.round(t[0]), Math.round(t[1]), Math.round(t[2])];
    });
  }
  var E = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
  function K(r, a) {
    return (E[(3 & a) << 2 | 3 & r] + .5) / 16;
  }
  function B(r, a, n, t, o, i) {
    var u = n.length - 1;
    var f = e(t) * u;
    var h = 0 | f;
    if (f - h > K(o, i) && h < u) {
      h++;
    }
    var l = n[h];
    r[a] = l[0];
    r[a + 1] = l[1];
    r[a + 2] = l[2];
    r[a + 3] = 255;
  }
  var Q = [[2.4, 27.5], [7, 26.6], [12, 25], [16.5, 23.2], [20.5, 21.2], [24, 19], [27, 16.8], [29.6, 14.6], [30.6, 12.4], [30.6, 10.4]];
  var S = [[1, 0, 0], [0, 1, 1], [1, 0, 1], [0, 0, 0], [1, 1, 0], [1, 1, 1], [0, 1, 0], [0, 0, 1]];
  function V(r, a, n) {
    return r > a - n && r < a + n;
  }
  function Y(r, a) {
    var n = r < 0 ? -r : r;
    if (n > 138 || a > 62 || a < -62) {
      return 0;
    }
    var t = Math.sqrt(r * r + a * a);
    if (t <= 61) {
      if (V(t, 56.5, .62) || V(t, 53, .62)) {
        return 1;
      }
      var o = Math.atan2(a, r);
      if (t > 38.5 && t < 50.5) {
        var u = Math.floor((t - 38.5) / 4);
        if (u <= 2 && t - 38.5 - 4 * u < 3) {
          var e = Math.round(o / .7853982);
          var f = (o - .7853982 * e) * t;
          if ((f < 0 ? -f < 12.5 : f < 12.5) && (S[(e % 8 + 8) % 8][u] || (f < 0 ? -f : f) > 2.7)) {
            return 2;
          }
        }
        var h = (o - .7853982 * (Math.floor(o / .7853982 + .5) + .5)) * t;
        if (h > -1.6 && h < 1.6 && t > 43.5 && t < 46) {
          return 3;
        }
      }
      if (V(t, 36, .6) || V(t, 33.5, .6)) {
        return 1;
      }
      if (t > 22.5 && t < 31.5) {
        var l = (o + .06 * (t - 22)) / .2617994;
        var v = Math.floor(l);
        var c = l - v;
        var s = i(31 & v, 7, 3) / 4294967296;
        if (s > .3) {
          var d = 5 + 4 * s;
          var M = 31.5 - t;
          if (M < d) {
            var g = .16 + .22 * (1 - M / d);
            if (c > .5 - g && c < .5 + g) {
              return 6;
            }
          }
        }
      }
      if (t < 21) {
        if (V(t, 20, .62)) {
          return 1;
        }
        var y = Math.sqrt(r * r + (a + 10) * (a + 10)) < 10;
        var x = Math.sqrt(r * r + (a - 10) * (a - 10)) < 10;
        var m = Math.sqrt(r * r + (a + 10) * (a + 10));
        var p = Math.sqrt(r * r + (a - 10) * (a - 10));
        if (r >= 0 && V(m, 10, .62) || r <= 0 && V(p, 10, .62)) {
          return 1;
        }
        if (m < 2.7 || p < 2.7) {
          return 3;
        }
        var w = r < 0 ? !x : y;
        if (m < 2.7) {
          w = !w;
        }
        if (p < 2.7) {
          w = !w;
        }
        return w ? 4 : 0;
      }
      return 0;
    }
    if (n > 62 && a > -10 && a < 10) {
      var b = n - 62;
      if (a > -.6 && a < .6 && (0 | b) % 9 < 6) {
        return 1;
      }
      if (a > 6.4 && a < 7.6 || a < -6.4 && a > -7.6) {
        return 1;
      }
      var T = Math.floor(b / 11);
      var D = b - 11 * T;
      var k = i(T, 19, 5) / 4294967296;
      if (k > .22 && (a < 0 ? -a : a) < 3 + 4 * k && Math.abs(D - (5.5 + .42 * a)) < .85) {
        return 5;
      }
    }
    return 0;
  }
  function j(r) {
    var a = (r.enemies || []).filter(function (r) {
      return "linh_ho_tran_son" === r.type;
    })[0];
    return a ? { tx: a.tx, ty: a.ty } : { tx: 30, ty: 8 };
  }
  function X(r, a, n) {
    var t;
    var o = 1e9;
    var i = 0;
    var u = 0;
    var e = 0;
    var f = [];
    for (t = 0; t + 1 < r.length; t++) {
      var h = r[t + 1][0] - r[t][0];
      var l = r[t + 1][1] - r[t][1];
      var v = Math.sqrt(h * h + l * l);
      f.push([r[t][0], r[t][1], h, l, v]);
      u += v;
    }
    for (t = 0; t < f.length; t++) {
      var c = f[t];
      var s = ((a - c[0]) * c[2] + (n - c[1]) * c[3]) / (c[4] * c[4]);
      s = s < 0 ? 0 : s > 1 ? 1 : s;
      var d = c[0] + c[2] * s - a;
      var M = c[1] + c[3] * s - n;
      var g = Math.sqrt(d * d + M * M);
      if (g < o) {
        o = g;
        i = (e + c[4] * s) / u;
      }
      e += c[4];
    }
    z = o;
    G = i;
  }
  var z = 0;
  var G = 0;
  function J(r) {
    return 24 - 9 * f(r, 0, 1);
  }
  function Z(r) {
    var a = r >>> 0;
    return function () {
      var r = a = a + 1831565813 >>> 0;
      r = Math.imul(r ^ r >>> 15, 1 | r);
      return (((r ^= r + Math.imul(r ^ r >>> 7, 61 | r)) ^ r >>> 14) >>> 0) / 4294967296;
    };
  }
  var $ = { data: null, h: null };
  function rr(r) {
    if ($.data === r && $.h) {
      return $.h;
    }
    for (var a = r.legend || {}, t = r.terrace, o = t ? t.mountain || "" : "C", i = j(r), u = i.ty - 1, e = i.ty + 2, f = 1e9, h = -1, l = {}, v = u; v <= e; v++)
      for (var c = r.ground[v] || "", s = 0; s < r.width; s++) {
        var d = c.charAt(s);
        var M = a[d] || {};
        if (!(o.indexOf(d) >= 0 || M.block && M.flyBlock && !M.obj)) {
          if (s < f) {
            f = s;
          }
          if (s > h) {
            h = s;
          }
          var g = l[v] || (l[v] = [s, s]);
          if (s < g[0]) {
            g[0] = s;
          }
          if (s > g[1]) {
            g[1] = s;
          }
        }
      }
    if (h < 0) {
      f = i.tx - 4;
      h = i.tx + 4;
    }
    var y = { boss: i, hDai0: u, hDai1: e, dai: { x0: f * n, y0: u * n, x1: (h + 1) * n, y1: (e + 1) * n }, bacY0: (e + 1) * n, tam: { x: i.tx * n + 16, y: (i.ty + 1) * n - 8 }, rak: [], vuot: [], chay: [], lo: [] };
    var x = l[u];
    var m = l[e];
    function p(n, t) {
      if (n < 0 || t < 0 || n >= r.width || t >= r.height) {
        return !0;
      }
      var i = (r.ground[t] || "").charAt(n);
      var u = a[i] || {};
      return o.indexOf(i) >= 0 || !!u.block;
    }
    if (x && m) {
      y.lo = [[x[0] * n + 24, u * n + 22], [(x[1] + 1) * n - 24, u * n + 22], [m[0] * n + 24, (e + 1) * n - 18], [(m[1] + 1) * n - 24, (e + 1) * n - 18]];
    }
    y.vach = [];
    y.vachDai = [];
    for (var w = 1; w < r.height - 1; w++)
      for (var b = 1; b < r.width - 1; b++)
        if (p(b, w)) {
          var T = null;
          if (p(b, w + 1)) {
            if (p(b + 1, w)) {
              if (!(p(b - 1, w))) {
                T = [b * n + 2, w * n + 22];
              }
            }
            else {
              T = [(b + 1) * n - 2, w * n + 22];
            }
          }
          else {
            T = [b * n + 16, (w + 1) * n];
          }
          if (T) {
            y.vach.push(T);
            if (Math.abs(T[0] - y.tam.x) < 200 && Math.abs(T[1] - y.tam.y) < 110) {
              y.vachDai.push(T);
            }
          }
        }
    var D = Z(7717);
    var k = y.tam;
    var L = y.dai;
    function A(r, a, n, t, o) {
      for (var i = [[r, a]], u = r, e = a, f = n, h = 0; h < t && (f += .7 * (D() - .5), u += Math.cos(f) * (3 + 3 * D()), e += Math.sin(f) * (3 + 3 * D()), !(u < L.x0 + 4 || u > L.x1 - 4 || e < L.y0 + 4 || e > L.y1 - 4)); h += 3 + (3 * D() | 0))
        i.push([u, e]), o < 2 && D() < .16 && A(u, e, f + (D() < .5 ? .9 : -.9), .45 * t - .3 * h, o + 1);
      if (i.length > 1) {
        y.rak.push(i);
      }
    }
    for (var W = 0; W < 9; W++) {
      var P = W / 9 * Math.PI * 2 + .5 * D();
      A(k.x + 60 * Math.cos(P), k.y + 60 * Math.sin(P), P, 46 + 50 * D(), 0);
    }
    [[-98, -30, .5], [-70, 33, -.32], [92, -26, 2.5], [74, 30, 3.3], [-38, 40, -.7], [40, -40, .9], [-118, 6, .1], [110, 12, 3.1]].forEach(function (r) {
      for (var a = k.x + r[0], n = k.y + r[1], t = r[2], o = -Math.sin(t), i = Math.cos(t), u = 26 + (14 * D() | 0), e = -1; e <= 1; e++) {
        for (var f = [], h = 0; h <= 1.001; h += .1) {
          var l = 2.4 * Math.sin(h * Math.PI);
          f.push([a + Math.cos(t) * h * u + o * (4.6 * e + l), n + Math.sin(t) * h * u + i * (4.6 * e + l)]);
        }
        y.vuot.push({ pts: f, dam: 0 === e ? 1 : .8 });
      }
    });
    y.chay = [[-14, 6, 15], [22, -4, 11], [-46, -12, 9], [58, 16, 12], [4, 34, 10], [-70, 22, 8], [78, -18, 8]].map(function (r) {
      return { x: k.x + r[0], y: k.y + r[1], r: r[2], sd: 1e6 * D() | 0 };
    });
    $ = { data: r, h: y };
    return y;
  }
  var ar = null;
  function nr(r, a, n) {
    var t = a.dec[n];
    if (t) {
      return 1 === t;
    }
    var o = a.sx[n];
    var i = a.sy[n];
    O(r, o, i);
    var u = R(r.dNui, r.gw);
    var e = R(r.dLoi, r.gw);
    var f = J(R(r.sLoi, r.gw));
    var l = Math.round(o);
    var v = Math.round(i);
    var c = .9 * g(l, v) + .45 * g(2 * l + 77, 2 * v + 31);
    var s = h(f + 4, f + 26, e) * (.3 + .7 * h(9, 28, u)) + .42 * c > .4;
    a.dec[n] = s ? 1 : 2;
    return s;
  }
  function tr(r, a, n, t, o, i, u) {
    var e = 1 - h(3, 12, o);
    return !(e <= .02 || e <= .98 * K(n + 1, t + 3) || (B(r, a, ar.soi, .5 + .07 * u + .05 * i - .1 * (1 - h(0, 14, o)), n, t), 0));
  }
  function or(r, a, t, o, i) {
    var e = r.TW;
    var f = r.loai[(i >> 5) * e + (o >> 5)];
    O(r, o, i);
    var l = R(r.dNui, r.gw);
    if (1 === f) {
      (function (r, a, n, t, o, i, e, f) {
        var l = g(t, o);
        var v = y(t, o);
        var c = g(2 * t + 77, 2 * o + 31);
        var s = 1 - h(f - 3.2, f + 1.6, e + 3 * y(t + 50, o + 90) + 2 * c);
        var d = 1 - h(3, 32, i);
        var M = u(t, o, 5) - .5;
        if (s > .5) {
          var T = .58 + .045 * v + .04 * l - .06 * d + .07 * M;
          if (u(t >> 1, o >> 1, 29) < .045) {
            T += .13;
          }
          return void B(a, n, ar.soi, T, t, o);
        }
        A(r.vSlab, t + 2.4 * y(t + 11, o + 7), o + 2.4 * y(t + 3, o + 29));
        var D;
        var k;
        var L = x;
        var W = m;
        var P = p;
        var F = w;
        var H = b;
        var I = r.vSlab;
        var O = 0;
        if (nr(r, I, F)) {
          D = ar.voi;
          var R = .55 + .2 * v;
          k = .5 + .17 * (u(F, 7, 3) - .5) + .05 * v + .05 * l - .17 * d - .0021 * (W + P);
          var q = 3.1416 * u(F, 9, 4);
          var N = (W * Math.cos(q) + P * Math.sin(q)) / 7 + 1.6 * l + 9 * u(F, 5, 6);
          if ((N -= Math.floor(N)) < .07 && L > 3) {
            k -= .045;
          }
          else {
            if (N > .93 && L > 3) {
              k += .025;
            }
          }
          if (v > .5 && u(t >> 1, o >> 1, 41) < .35) {
            k += .05;
          }
          if (L < R) {
            k = .17 + .05 * d;
            O = d > .3 && g(t + 620, o + 250) > .12 ? 1 : 0;
          }
          else {
            if (L < R + 1.4) {
              k += -(W + P) / (Math.abs(W) + Math.abs(P) + 1) * .085;
            }
          }
          if (L < R + 3.2 && L >= R && !nr(r, I, H) && h(R + 3.2, R, L) * (.6 + .4 * v) > 1.05 * K(t, o)) {
            D = ar.soi;
            k = .55 + .05 * v;
          }
          if (!O && L < R + 3.2 && d > .32 && d * h(.12, .6, g(t + 700, o + 40)) * h(R + 3.2, R, L) > .9 * K(t + 1, o + 2)) {
            O = 2;
          }
        }
        else {
          if (d * h(-.3, .3, g(t + 400, o + 210)) > K(t + 2, o + 1)) {
            D = ar.dat;
            k = .5 + .1 * l + .06 * v - .1 * d + .06 * M;
          }
          else {
            D = ar.soi;
            k = .55 + .1 * l + .06 * v + .03 * c - .15 * d + .06 * M;
            if (u(t >> 1, o >> 1, 31) < .03) {
              k -= .1;
            }
            var _ = Math.sin(.5 * (.55 * t + .83 * o) + 5 * l + 3 * c);
            k += (_ > .88 ? .045 : _ < -.92 ? -.035 : 0) * (1 - d);
          }
          if (L < 2.4 && nr(r, I, H)) {
            k -= .07 * (1 - L / 2.4);
          }
        }
        if (!O && d > .34 && d * h(.05, .5, g(2 * t + 300, 2 * o + 120)) * .9 > K(t + 3, o) + .08) {
          O = 2;
        }
        if (1 !== O) {
          if (2 !== O) {
            B(a, n, D, k, t, o);
          }
          else {
            B(a, n, ar.reu, .32 + .28 * v + .1 * (1 - d), t, o);
          }
        }
        else {
          B(a, n, ar.reu, .14 + .1 * v, t, o);
        }
      })(r, a, t, o, i, l, R(r.dLoi, r.gw), J(R(r.sLoi, r.gw)));
    }
    else {
      if (2 === f) {
        (function (r, a, t, o, i, e) {
          var f = r.dai;
          var l = o - f.x0;
          var v = i - f.y0;
          var c = Math.floor(v / n);
          var s = v - c * n;
          var d = g(o, i);
          var M = y(o, i);
          var x = g(2 * o + 5, 2 * i + 61);
          if (!tr(a, t, o, i, e, d, M)) {
            var m = l + 24 * (1 & c);
            var p = Math.floor(m / 48);
            var w = m - 48 * p;
            var b = 1 - h(0, 24, e);
            var T = .5 + .15 * (u(p, c, 33) - .5) + .1 * d + .06 * M + .03 * x - .17 * b;
            var D = 0;
            if (w < 1 || s < 1) {
              T -= .22;
              D = 1;
            }
            else {
              if (w < 2.2 || s < 2.2) {
                T += .06;
              }
              else {
                if ((w > 46.6 || s > 30.4)) {
                  T -= .08;
                }
              }
            }
            T += .05 * g(2 * o + 300, 2 * i + 70);
            var k = u(p, c, 44);
            if (k < .3 && !D) {
              var L = 8 + 32 * u(p, c, 45);
              var A = 6 + 20 * u(p, c, 46);
              var W = 2.4 * (u(p, c, 47) - .5);
              var P = w - L;
              var F = s - A;
              var H = Math.abs(F - P * Math.tan(W)) * Math.cos(W);
              var I = P * Math.cos(W) + F * Math.sin(W);
              if (H < .55 && Math.abs(I) < 8 + 40 * k) {
                T = .16;
              }
              else {
                if (H < 1.45 && H >= .55 && Math.abs(I) < 8 + 40 * k && P + F < 0) {
                  T += .05;
                }
              }
            }
            var O = 0;
            if (b > .15 && Math.min(w, s, 48 - w, 32 - s) < 3.2 && h(0, .5, g(o + 800, i + 33)) * b > .9 * K(o, i)) {
              O = 1;
            }
            var R = r.tam;
            var q = o + .5 - R.x;
            var N = i + .5 - R.y;
            var _ = Y(q, N);
            if (1 === _ || 2 === _ || 3 === _ || 5 === _ || 6 === _) {
              T = .035 + .03 * M;
            }
            else if (4 === _) {
              T -= .1;
            }
            else {
              var U = Y(q - 1, N - 1);
              if (!(1 !== U && 2 !== U && 3 !== U && 5 !== U && 6 !== U)) {
                T += .22;
              }
            }
            if (O) {
              B(a, t, ar.reu, .26 + .22 * M, o, i);
            }
            else {
              B(a, t, ar.dai, T, o, i);
            }
          }
        })(r, a, t, o, i, l);
      }
      else {
        if (3 === f) {
          (function (r, a, t, o, i, e) {
            var f = i - r.bacY0;
            var l = Math.floor(f / n);
            var v = f - l * n;
            var c = g(o, i);
            var s = y(o, i);
            if (!(e < 6 && tr(a, t, o, i, 1.9 * e, c, s))) {
              var d = 1 - h(0, 20, e);
              var M = .52 + .09 * c + .06 * s - .16 * d;
              var x = o + 24 * (1 & l);
              var m = Math.floor(x / 48);
              var p = x - 48 * m;
              var w = .13 * (u(m, l, 71) - .5);
              M += w;
              if (v < 6) {
                M = .2 + v / 6 * .15 + .5 * w - .08 * d + .035 * s;
                if (v < 2) {
                  M -= .07;
                }
                if ((p < 1 || p > 47)) {
                  M -= .07;
                }
              }
              else {
                if (v >= 30) {
                  M += .2 + .1 * (v - 30);
                }
                else {
                  if (v < 8) {
                    M -= .05;
                  }
                }
                if (p < 1) {
                  M -= .16;
                }
                else {
                  if (p > 46.5) {
                    M -= .07;
                  }
                }
                if (p < 2.4 && p >= 1) {
                  M += .06;
                }
              }
              if (u(o >> 2, i >> 2, 91) < .05 && v >= 6) {
                M -= .1;
              }
              B(a, t, ar.dai, M, o, i);
            }
          })(r, a, t, o, i, l);
        }
        else {
          (function (r, a, n, t, o, i) {
            var e = g(t, o);
            var f = y(t, o);
            if (!tr(a, n, t, o, i, e, f)) {
              var l = 1 - h(0, 26, i);
              A(r.vDoc, t + 2 * y(t + 21, o + 5), o + 2 * y(t + 9, o + 44));
              var v = x;
              var c = m;
              var s = p;
              var d = .52 + .14 * (u(w, 3, 8) - .5) + .08 * e + .05 * f - .15 * l - .0022 * (c + s);
              if (v < .6) {
                d = .18;
              }
              else {
                if (v < 1.8 && c + s < 0) {
                  d += .07;
                }
                else {
                  if (v < 1.8) {
                    d -= .05;
                  }
                }
              }
              if (l > .1 && v < 3.6 && h(0, .5, g(t + 900, o + 5)) * (.6 + l) > .95 * K(t, o)) {
                B(a, n, ar.reu, .26 + .24 * f, t, o);
              }
              else {
                B(a, n, ar.dai, d, t, o);
              }
            }
          })(r, a, t, o, i, l);
        }
      }
    }
  }
  function ir(r, a, n, t, o, i, u, e, f) {
    if (i = Math.round(i) - t, u = Math.round(u) - o, !(i < 0 || u < 0 || i >= a || u >= n)) {
      var h = 4 * (u * a + i);
      if (null == f || f >= 1) {
        r[h] = e[0];
        r[h + 1] = e[1];
        r[h + 2] = e[2];
        return void (r[h + 3] = 255);
      }
      r[h] = r[h] + (e[0] - r[h]) * f;
      r[h + 1] = r[h + 1] + (e[1] - r[h + 1]) * f;
      r[h + 2] = r[h + 2] + (e[2] - r[h + 2]) * f;
    }
  }
  function ur(r, a, n, t, o, i, u) {
    if (i = Math.round(i) - t, u = Math.round(u) - o, i < 0 || u < 0 || i >= a || u >= n) {
      return null;
    }
    var e = 4 * (u * a + i);
    return [r[e], r[e + 1], r[e + 2]];
  }
  function er(r, a, n, t, o, i, u, e, f, h, l) {
    i = Math.round(i);
    u = Math.round(u);
    e = Math.round(e);
    f = Math.round(f);
    for (var v = Math.abs(e - i), c = i < e ? 1 : -1, s = -Math.abs(f - u), d = u < f ? 1 : -1, M = v + s; ir(r, a, n, t, o, i, u, h, l), i !== e || u !== f;) {
      var g = 2 * M;
      if (g >= s) {
        M += s;
        i += c;
      }
      if (g <= v) {
        M += v;
        u += d;
      }
    }
  }
  function fr(r, a) {
    return [r[0] * a, r[1] * a, r[2] * a];
  }
  function hr(r, a, n, t, o, i, e) {
    var f = e.s;
    var h = e.sd;
    var l = 7 & e.c ? 1 == (3 & e.c) ? ar.da : ar.soi : ar.dat;
    var v = e.x;
    var c = e.y;
    var s = 6 + (h >>> 20 & 3);
    var d = l[Math.min(11, s + 3)];
    var M = l[s];
    var g = l[Math.max(0, s - 3)];
    var y = fr(l[2], .72);
    if (f <= 1) {
      ir(a, n, t, o, i, v + 1, c + 1, y, .55);
      ir(a, n, t, o, i, v, c, M);
      return void ir(a, n, t, o, i, v + 1, c, g);
    }
    if (2 === f) {
      ir(a, n, t, o, i, v + 1, c + 2, y, .5);
      ir(a, n, t, o, i, v + 2, c + 1, y, .5);
      ir(a, n, t, o, i, v, c, d);
      ir(a, n, t, o, i, v + 1, c, M);
      ir(a, n, t, o, i, v, c + 1, M);
      return void ir(a, n, t, o, i, v + 1, c + 1, g);
    }
    for (var x = 3 === f ? 2.5 : 3.2, m = 3 === f ? 1.9 : 2.5, p = -3; p <= 4; p++)
      for (var w = -4; w <= 5; w++)
        (w - .5) * (w - .5) / (x * x) + (p - .5) * (p - .5) / (m * m) > 1 && (w - 1.5) * (w - 1.5) / (x * x) + (p - 1.1) * (p - 1.1) / (m * m) <= 1 && ir(a, n, t, o, i, v + w, c + p, y, .5);
    for (p = -3; p <= 3; p++)
      for (w = -4; w <= 4; w++) {
        var b = w * w / (x * x) + p * p / (m * m);
        if (!(b > 1)) {
          var T = (.7 * -w - .9 * p) / 3 + .35 * (u(w + v, p + c, 3) - .5);
          var D = T > .34 ? d : T > -.16 ? M : g;
          if (b > .72 && T < 0) {
            D = fr(D, .82);
          }
          ir(a, n, t, o, i, v + w, c + p, D);
        }
      }
  }
  function lr(r, a, n, t, o, i, u) {
    var e = u.sd;
    var f = u.x;
    var h = u.y;
    var l = ar.co;
    var v = 3 + (e >>> 14 & 3);
    ir(a, n, t, o, i, f + 1, h + 1, [22, 22, 14], .42);
    for (var c = 0; c < v; c++)
      for (var s = 1.5 * (c - (v - 1) / 2), d = 3 + (e >>> 17 + c & 3) + (c === v >> 1 ? 1 : 0), M = 0; M < d; M++) {
        var g = 0 === M ? 1 : M < d - 1 ? 2 : 4;
        ir(a, n, t, o, i, f + Math.round(s * (1 + .35 * M)), h - M, l[Math.min(5, g + (e >>> 9 & 1))]);
      }
  }
  function vr(r, a, n, t, o, i, u) {
    var e = ar.C.hoa[u.c % ar.C.hoa.length];
    var f = u.x;
    var h = u.y;
    ir(a, n, t, o, i, f, h + 1, [40, 60, 30], .6);
    ir(a, n, t, o, i, f, h, [60, 96, 50]);
    ir(a, n, t, o, i, f, h - 1, [60, 96, 50]);
    ir(a, n, t, o, i, f - 1, h - 2, e);
    ir(a, n, t, o, i, f + 1, h - 2, e);
    ir(a, n, t, o, i, f, h - 3, e);
    ir(a, n, t, o, i, f, h - 1 - 1, ar.C.nhuy);
  }
  function cr(r, a, n, t, o, i, u) {
    for (var e = u.pts, f = 0; f + 1 < e.length; f++) {
      var h = f / e.length;
      var l = .96 - .5 * h;
      er(a, n, t, o, i, e[f][0], e[f][1], e[f + 1][0], e[f + 1][1], [16, 16, 24], l);
      er(a, n, t, o, i, e[f][0] + 1, e[f][1] + 1, e[f + 1][0] + 1, e[f + 1][1] + 1, [120, 134, 158], .16 * (1 - h));
    }
  }
  function sr(r, a, n, t, o, i, u) {
    for (var e = u.pts, f = 0; f + 1 < e.length; f++) {
      var h = f / (e.length - 1);
      var l = (.35 + .65 * Math.sin(h * Math.PI)) * u.dam;
      er(a, n, t, o, i, e[f][0], e[f][1], e[f + 1][0], e[f + 1][1], [12, 14, 22], l);
      er(a, n, t, o, i, e[f][0] + 1, e[f][1] + 1, e[f + 1][0] + 1, e[f + 1][1] + 1, [150, 164, 188], .32 * l);
    }
  }
  function dr(r, a, n, t, o, i, e) {
    for (var f = e.v, h = f.r, l = -h - 1; l <= h + 1; l++)
      for (var v = -h - 1; v <= h + 1; v++) {
        Math.atan2(l, v);
        var c = Math.sqrt(v * v + l * l);
        var s = h * (.66 + .34 * g(Math.round(f.x + 1.5 * v) + 200, Math.round(f.y + 1.5 * l) + 40));
        if (!(c > s)) {
          var d = 1 - c / s;
          if (ur(a, n, t, o, i, f.x + v, f.y + l)) {
            var M = Math.min(.85, .35 + .7 * d);
            if (!(u(v, l, f.sd) < .12 && d < .5)) {
              ir(a, n, t, o, i, f.x + v, f.y + l, ar.than[Math.min(3, 4 * d | 0)], M);
            }
          }
        }
      }
  }
  function Mr(r, a, n) {
    if (r.xong[a]) {
      return !0;
    }
    var o = a % r.nx * t;
    var i = (a / r.nx | 0) * t;
    var u = Math.min(t, r.W - o);
    var e = Math.min(t, r.H - i);
    if (!(r.anh[a])) {
      r.anh[a] = r.ctx.createImageData(u, e);
      r.dong[a] = 0;
    }
    for (var f = r.anh[a].data, h = (ar = r.R).vach[4], v = r.TW, c = r.loai, s = r.dong[a]; s < e; s++) {
      if (n && s > r.dong[a] && l() > n) {
        r.dong[a] = s;
        return !1;
      }
      for (var d = i + s, M = s * u * 4, g = (d >> 5) * v, y = 0; y < u; y++, M += 4)
        0 !== c[g + (o + y >> 5)] ? or(r, f, M, o + y, d) : (f[M] = h[0], f[M + 1] = h[1], f[M + 2] = h[2], f[M + 3] = 255);
    }
    (function (r, a, n, t, o, i, u) {
      for (var e = r.mangDs[a], f = 0; f < e.length; f++) {
        var h = e[f];
        switch (h.k) {
          case 0:
            hr(0, n, t, o, i, u, h);
            break;
          case 1:
            lr(0, n, t, o, i, u, h);
            break;
          case 2:
            vr(0, n, t, o, i, u, h);
            break;
          case 10:
            cr(0, n, t, o, i, u, h);
            break;
          case 11:
            sr(0, n, t, o, i, u, h);
            break;
          case 12: dr(0, n, t, o, i, u, h);
        }
      }
    })(r, a, f, u, e, o, i);
    r.ctx.putImageData(r.anh[a], o, i);
    r.anh[a] = null;
    r.xong[a] = 1;
    return !0;
  }
  function gr(r, a) {
    for (; !Mr(r, a, 0);)
      ;
  }
  var yr = { data: null, pal: null, layer: null, loi: !1 };
  function xr(a, o, u) {
    var e = l();
    var f = a.width;
    var v = a.height;
    var c = f * n;
    var g = v * n;
    var y = { data: a, TW: f, TH: v, W: c, H: g, gw: c / 4, gh: g / 4 };
    var x = r.Utils.canvas(c, g);
    y.canvas = x.canvas;
    y.ctx = x.ctx;
    y.R = function () {
      var a = r.Palette && r.Palette.WORLD;
      var n = { soi: U(a.pebble, [40, 36, 40], [252, 246, 228]), da: U(a.stone, [28, 30, 40], [242, 240, 228]), dat: U(a.dirt, [38, 28, 30], [248, 230, 186]), reu: U({ line: a.grass.line, d1: a.grass.line, base: a.grass.d1, d2: a.grass.base, d3: a.grass.d2 }, [6, 26, 26], [190, 222, 150]), vach: U(a.cliff, [24, 24, 30], [226, 220, 204]) };
      n.co = _([[0, q(a.grass.line)], [.3, N(q(a.grass.d1), q(a.dirt.d1), .35)], [.6, N(q(a.grass.d2), q(a.dirt.d2), .45)], [1, N(q(a.grass.d3), q(a.dirt.d3), .6)]], 6);
      n.dai = C(n.da, [62, 72, 92], .2);
      n.dai = n.dai.map(function (r, a) {
        var n = .9 + a / 11 * .12;
        return [Math.round(r[0] * n), Math.round(r[1] * n), Math.round(r[2] * n)];
      });
      n.voi = C(n.da, [176, 164, 140], .13);
      n.than = _([[0, [12, 10, 12]], [.5, [34, 28, 30]], [1, [78, 62, 56]]], 6);
      n.C = { hoa: (a.flower || ["#e8dfa0", "#e5b7c9", "#d8dce8", "#e2a86a"]).map(q), nhuy: [240, 204, 92], ro: [212, 196, 150] };
      return n;
    }();
    y.nx = Math.ceil(c / t);
    y.ny = Math.ceil(g / t);
    y.so = y.nx * y.ny;
    y.xong = new Uint8Array(y.so);
    y.anh = [];
    y.dong = [];
    var m = a.spawn || { tx: f / 2, ty: v / 2 };
    var p = null == o ? (m.tx + .5) * n : o;
    var w = null == u ? (m.ty + .5) * n : u;
    y.thuTu = [];
    for (var b = 0; b < y.so; b++)
      y.thuTu.push(b);
    function D(r) {
      var a = (r % y.nx + .5) * t - p;
      var n = (.5 + (r / y.nx | 0)) * t - w;
      return a * a + n * n;
    }
    y.thuTu.sort(function (r, a) {
      return D(r) - D(a);
    });
    y.viec = [function (r) {
        return function (r) {
          return !(!s || !d) || !(!s && (s = M([[128, .5], [64, .3], [32, .2]], 41), r && l() > r)) && (d || (d = M([[16, .5], [8, .3], [4, .2]], 43)), !0);
        }(r);
      }, function () {
        ar = y.R;
        (function (r) {
          var a;
          var o;
          var u;
          var e = r.data;
          var f = r.TW;
          var l = r.TH;
          var v = e.legend || {};
          var c = r.gw;
          var s = r.gh;
          var d = c * s;
          var M = e.terrace;
          var g = M ? M.mountain || "" : "C";
          var y = r.loai = new Uint8Array(f * l);
          var x = rr(e);
          var m = x.boss;
          r.boss = m;
          var p = x.hDai0;
          var w = x.hDai1;
          for (o = 0; o < l; o++) {
            var b = e.ground[o] || "";
            for (a = 0; a < f; a++) {
              u = o * f + a;
              var D = b.charAt(a);
              var k = v[D] || {};
              if (g.indexOf(D) >= 0 || k.block && k.flyBlock && !k.obj) {
                y[u] = 0;
              }
              else {
                if (o >= p && o <= w) {
                  y[u] = 2;
                }
                else {
                  if (o > w && o <= w + 3 && Math.abs(a - m.tx) <= 4) {
                    y[u] = 3;
                  }
                  else {
                    y[u] = o < p ? 4 : 1;
                  }
                }
              }
            }
          }
          r.dai = x.dai;
          r.bacY0 = x.bacY0;
          r.tam = x.tam;
          r.rak = x.rak;
          r.vuot = x.vuot;
          r.chay = x.chay;
          r.vSlab = T(r.W, r.H, 54, 611);
          r.vDoc = T(r.W, r.H, 40, 701);
          for (var L = new Uint8Array(d), A = 0; A < s; A++)
            for (var W = (4 * A + 2 >> 5) * f, F = 0; F < c; F++)
              L[A * c + F] = 0 === y[W + (4 * F + 2 >> 5)] ? 1 : 0;
          var H = function (r, a, n) {
            var t;
            var o;
            var i;
            var u;
            var e = 1.41421;
            var f = new Float32Array(a * n);
            for (t = 0; t < f.length; t++)
              f[t] = r[t] ? 0 : 1e9;
            for (i = 0; i < n; i++)
              for (o = 0; o < a; o++)
                u = f[t = i * a + o], o > 0 && f[t - 1] + 1 < u && (u = f[t - 1] + 1), i > 0 && (f[t - a] + 1 < u && (u = f[t - a] + 1), o > 0 && f[t - a - 1] + e < u && (u = f[t - a - 1] + e), o < a - 1 && f[t - a + 1] + e < u && (u = f[t - a + 1] + e)), f[t] = u;
            for (i = n - 1; i >= 0; i--)
              for (o = a - 1; o >= 0; o--)
                u = f[t = i * a + o], o < a - 1 && f[t + 1] + 1 < u && (u = f[t + 1] + 1), i < n - 1 && (f[t + a] + 1 < u && (u = f[t + a] + 1), o < a - 1 && f[t + a + 1] + e < u && (u = f[t + a + 1] + e), o > 0 && f[t + a - 1] + e < u && (u = f[t + a - 1] + e)), f[t] = u;
            return f;
          }(L, c, s);
          for (u = 0; u < d; u++)
            H[u] = Math.max(0, 4 * (H[u] - .5));
          r.dNui = P(H, c, s, [1, 1]);
          var I = r.dLoi = new Float32Array(d);
          var q = r.sLoi = new Float32Array(d);
          for (A = 0; A < s; A++)
            for (F = 0; F < c; F++)
              X(Q, (4 * F + 2) / n, (4 * A + 2) / n), I[A * c + F] = z * n, q[A * c + F] = G;
          r.dLoi = P(I, c, s, [1]);
          (function (r) {
            var a;
            var n;
            var o = r.W;
            var u = r.H;
            var e = r.TW;
            var f = r.ds = [];
            for (n = 0; n < u / 10; n++)
              for (a = 0; a < o / 10; a++) {
                var l = i(a, n, 901);
                var v = 10 * a + (7 & l) + 1;
                var c = 10 * n + (l >>> 3 & 7) + 1;
                if (!(v >= o - 2 || c >= u - 2)) {
                  var s = r.loai[(c >> 5) * e + (v >> 5)];
                  if (0 !== s) {
                    O(r, v, c);
                    var d = R(r.dNui, r.gw);
                    var M = R(r.dLoi, r.gw);
                    var g = (l >>> 8) / 16777216;
                    var y = J(R(r.sLoi, r.gw));
                    var x = M < y - 3;
                    var m = Math.abs(M - y) < 5;
                    var p = 1 - h(4, 36, d);
                    var w = 1 === s ? 1 : 2 === s ? .1 : 3 === s ? .12 : .22;
                    var b = (.2 + .36 * p + (m ? .3 : 0)) * w * (x ? .28 : 1);
                    if (g < b) {
                      var T = 1 + (l >>> 5 & 3) % 4;
                      if (!(!(p < .35) || m || l >>> 9 & 3)) {
                        T = Math.min(4, T + 1);
                      }
                      if (m && l >>> 9 & 1) {
                        T = 3 + (l >>> 10 & 1);
                      }
                      f.push({ k: 0, x: v, y: c, s: T, c: l >>> 11 & 15, sd: l });
                    }
                    else {
                      if (g < b + .05 * w * (.4 + p) && !x && 1 === s) {
                        f.push({ k: 1, x: v, y: c, s: 0, c: l >>> 11 & 15, sd: l });
                      }
                      else {
                        if (g < b + .05 * w * (.4 + p) + .018 * w * p && !x && 1 === s) {
                          f.push({ k: 2, x: v, y: c, s: 0, c: l >>> 11 & 3, sd: l });
                        }
                      }
                    }
                  }
                }
              }
            !function (r) {
              var a = r.ds;
              r.rak.forEach(function (r) {
                var n = 1e9;
                var t = -1;
                var o = 1e9;
                var i = -1;
                r.forEach(function (r) {
                  n = Math.min(n, r[0]);
                  t = Math.max(t, r[0]);
                  o = Math.min(o, r[1]);
                  i = Math.max(i, r[1]);
                });
                a.push({ k: 10, x: (n + t) / 2, y: (o + i) / 2, r: Math.max(t - n, i - o) / 2 + 3, pts: r });
              });
              r.vuot.forEach(function (r) {
                a.push({ k: 11, x: r.pts[5][0], y: r.pts[5][1], r: 40, pts: r.pts, dam: r.dam });
              });
              r.chay.forEach(function (r) {
                a.push({ k: 12, x: r.x, y: r.y, r: r.r + 6, v: r });
              });
            }(r);
            var D = r.nx;
            var k = r.ny;
            r.mangDs = [];
            for (var L = 0; L < D * k; L++)
              r.mangDs.push([]);
            for (var A = 0; A < f.length; A++)
              for (var W = f[A], P = W.r || 8, F = Math.max(0, (W.x - P) / t | 0), H = Math.min(D - 1, (W.x + P) / t | 0), I = Math.max(0, (W.y - P) / t | 0), q = Math.min(k - 1, (W.y + P) / t | 0), N = I; N <= q; N++)
                for (var _ = F; _ <= H; _++)
                  r.mangDs[N * D + _].push(W);
          })(r);
        })(y);
      }];
    y.msKhung = l() - e;
    return y;
  }
  function mr(r, a) {
    for (; r.viec.length;)
      if (!1 !== r.viec[0](a) && r.viec.shift(), a && l() > a) {
        return !r.viec.length;
      }
    return !0;
  }
  function pr(r, a) {
    for (var n = 0; n < r.thuTu.length; n++) {
      var t = r.thuTu[n];
      if (!r.xong[t]) {
        if (!Mr(r, t, a)) {
          return !1;
        }
        if (wr(r), a && l() > a) {
          return !1;
        }
      }
    }
    return !0;
  }
  function wr(r) {
    if (!r.hetViec) {
      for (var a = 0; a < r.so; a++)
        if (!r.xong[a]) {
          return;
        }
      if (!(r.viec.length)) {
        r.dNui = r.dLoi = r.sLoi = null;
        r.mangDs = null;
        r.hetViec = !0;
        r.msTong = l() - r.batDau;
        s = d = null;
      }
    }
  }
  function br() {
    return !!((!r.Quality || !r.Quality.level || r.Quality.tier >= 1) && r.Utils && r.Utils.canvas && "undefined" != typeof document && r.Palette && r.Palette.WORLD);
  }
  function Tr(a, n, t) {
    yr.data = a;
    yr.pal = r.Palette.WORLD;
    yr.layer = null;
    yr.loi = !1;
    try {
      yr.layer = xr(a, n, t);
      yr.layer.batDau = l() - yr.layer.msKhung;
    }
    catch (r) {
      yr.loi = !0;
      console.error("[PNTT] Không dựng được nền Thung Lũng:", r);
    }
  }
  o.chuanBiTruoc = function (n, t, o) {
    if (n && n.id === a && br()) {
      if (!(yr.data === n && yr.pal === r.Palette.WORLD && yr.layer)) {
        yr.data = n;
        yr.pal = r.Palette.WORLD;
        yr.layer = null;
        yr.loi = !1;
        setTimeout(function r() {
          if (yr.data === n && !yr.loi) {
            var a = yr.layer;
            try {
              if (!a) {
                Tr(n, t, o);
                return void setTimeout(r, 0);
              }
              if (a.dangHien) {
                return;
              }
              var i = l() + 12;
              if (!(mr(a, i) && pr(a, i))) {
                setTimeout(r, 0);
              }
            }
            catch (r) {
              yr.loi = !0;
              console.error("[PNTT] Không dựng được nền Thung Lũng:", r);
            }
          }
        }, 0);
      }
    }
  };
  o.quen = function () {
    yr.layer = null;
    yr.loi = !1;
  };
  o.choXong = function (r) {
    if (!r || yr.data !== r) {
      return !0;
    }
    if (yr.loi) {
      return !0;
    }
    var a = yr.layer;
    if (a && a.dangHien) {
      return !0;
    }
    if (!a || a.viec.length) {
      return !1;
    }
    for (var n = 0; n < a.so; n++)
      if (!a.xong[n]) {
        return !1;
      }
    return !0;
  };
  o.nha = function (r) {
    if (yr.data && yr.data !== r) {
      yr.data = null;
      yr.layer = null;
      yr.loi = !1;
    }
  };
  o.layerFor = function (n) {
    var t = n && n.data;
    if (!t || t.id !== a) {
      if (yr.data && yr.layer && yr.layer.dangHien) {
        yr.data = null;
        yr.layer = null;
      }
      return null;
    }
    if (!br()) {
      return null;
    }
    if (yr.data === t && yr.pal === r.Palette.WORLD && (yr.layer || yr.loi) || Tr(t, null, null), yr.loi) {
      return null;
    }
    try {
      mr(yr.layer, 0);
    }
    catch (r) {
      yr.loi = !0;
      console.error("[PNTT] Không dựng được nền Thung Lũng:", r);
      return null;
    }
    return yr.layer;
  };
  o.dangDung = function (r) {
    return !(!(r && r.data && r.data.id === a && yr.data === r.data && yr.layer) || yr.loi);
  };
  o.coTranh = function (r) {
    return !(!r || r.id !== a || !br());
  };
  o.sanSang = function (r) {
    return !(yr.data !== r || !yr.layer || !yr.layer.hetViec);
  };
  o.nuongTiep = function (r) {
    return !!r && (mr(r, 0), !pr(r, l() + 50));
  };
  o.draw = function (r, a, n, o, i, u) {
    var e = Math.max(0, Math.floor(n));
    var f = Math.min(a.W, Math.ceil(n + i) + 1);
    var h = Math.max(0, Math.floor(o));
    var v = Math.min(a.H, Math.ceil(o + u) + 1);
    if (!(f <= e || v <= h)) {
      a.dangHien = !0;
      mr(a, 0);
      for (var c = e / t | 0, s = (f - 1) / t | 0, d = (v - 1) / t | 0, M = h / t | 0; M <= d; M++)
        for (var g = c; g <= s; g++) {
          var y = M * a.nx + g;
          if (!(a.xong[y])) {
            gr(a, y);
            wr(a);
          }
        }
      if (!(a.hetViec)) {
        pr(a, l() + 3);
      }
      r.drawImage(a.canvas, e, h, f - e, v - h, e - n | 0, h - o | 0, f - e, v - h);
    }
  };
  o._taoLop = xr;
  o.MAP_ID = a;
  o.kit = { T: n, h01: u, hashU: i, clamp01: e, kep: f, smooth: h, hex: q, tron3: N, tranDo: Y, TRAN_R: 58, QUE: S, LOI: Q, DOC: [[30.5, 9], [31.5, 6.4], [33.4, 4.4], [36, 3.5], [38, 2.6]], rng: Z, tamBoss: j, hinh: rr, layer: function () {
      return yr.layer;
    } };
}(window.PNTT);
