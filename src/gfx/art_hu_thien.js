!function (n) {
  "use strict";
  var r = { hu_thien_1: 1, hu_thien_2: 2, hu_thien_3: 3, hu_thien_4: 4 };
  var a = n.HuThienArt = { ai: {}, IDS: r };
  var t = a.kit = { T: 32, G: 4 };
  function o(n, r, a) {
    var t = Math.imul(0 | n, 374761393) ^ Math.imul(0 | r, 668265263) ^ Math.imul(40503 + (0 | a), 1274126177);
    return ((t = Math.imul(t ^ t >>> 13, 1274126177)) ^ t >>> 16) >>> 0;
  }
  function e(n, r, a) {
    return o(n, r, a) / 4294967296;
  }
  function u(n) {
    return n < 0 ? 0 : n > 1 ? 1 : n;
  }
  function i(n, r, a) {
    var t = u((a - n) / (r - n));
    return t * t * (3 - 2 * t);
  }
  function f() {
    return "undefined" != typeof performance ? performance.now() : Date.now();
  }
  var l = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
  function c(n, r) {
    return (l[(3 & r) << 2 | 3 & n] + .5) / 16;
  }
  t.hashU = o;
  t.h01 = e;
  t.clamp01 = u;
  t.kep = function (n, r, a) {
    return n < r ? r : n > a ? a : n;
  };
  t.smooth = i;
  t.bayer = c;
  t.bayGio = f;
  var h = 512;
  var v = 511;
  var g = null;
  var d = null;
  var y = null;
  var m = null;
  var M = null;
  var s = null;
  var w = null;
  var x = null;
  var p = null;
  var A = null;
  var T = null;
  var U = null;
  var b = null;
  var I = null;
  function D(n, r) {
    for (var a = new Float32Array(h * h), t = 0; t < n.length; t++) {
      for (var o = n[t][0], u = n[t][1], i = h / o, f = new Float32Array(i * i), l = 0; l < f.length; l++)
        f[l] = 2 * e(l, 7 * t + r, o) - 1;
      for (var c = 0; c < h; c++) {
        var v = c / o;
        var g = 0 | v;
        var d = v - g;
        d = d * d * (3 - 2 * d);
        for (var y = g % i * i, m = (g + 1) % i * i, M = 0; M < h; M++) {
          var s = M / o;
          var w = 0 | s;
          var x = s - w;
          x = x * x * (3 - 2 * x);
          var p = w % i;
          var A = (w + 1) % i;
          var T = f[y + p];
          var U = f[y + A];
          var b = f[m + p];
          var I = f[m + A];
          a[c * h + M] += u * (T + (U - T) * x + (b - T) * d + (T - U - b + I) * x * d);
        }
      }
    }
    return a;
  }
  function F(n, r, a) {
    for (var t = n.hx, e = n.hy, u = 32, i = new Float32Array(9), f = new Float32Array(9), l = new Int32Array(9), c = r; c < a; c++)
      for (var v = c / 16 | 0, g = 0; g < h; g++) {
        for (var d = g / 16 | 0, y = 0, x = 1e9, p = 0, A = -1; A <= 1; A++)
          for (var T = -1; T <= 1; T++) {
            var U = d + T;
            var b = v + A;
            var I = 0;
            var D = 0;
            if (U < 0) {
              U += u;
              I = -h;
            }
            else {
              if (U >= u) {
                U -= u;
                I = h;
              }
            }
            if (b < 0) {
              b += u;
              D = -h;
            }
            else {
              if (b >= u) {
                b -= u;
                D = h;
              }
            }
            var F = b * u + U;
            i[y] = t[F] + I;
            f[y] = e[F] + D;
            l[y] = F;
            var H = g + .5 - i[y];
            var k = c + .5 - f[y];
            var S = H * H + k * k;
            if (S < x) {
              x = S;
              p = y;
            }
            y++;
          }
        for (var W = i[p], _ = f[p], q = 1e9, C = 0; C < y; C++)
          if (C !== p) {
            var N = i[C] - W;
            var P = f[C] - _;
            var K = Math.sqrt(N * N + P * P);
            if (!(K < .001)) {
              var j = (.5 * (i[C] + W) - (g + .5)) * N / K + (.5 * (f[C] + _) - (c + .5)) * P / K;
              if (j < q) {
                q = j;
              }
            }
          }
        var G = c * h + g;
        m[G] = Math.min(255, Math.max(0, Math.round(8 * q)));
        M[G] = Math.max(-127, Math.min(127, Math.round(g + .5 - W)));
        s[G] = Math.max(-127, Math.min(127, Math.round(c + .5 - _)));
        w[G] = 65535 & o(l[p], 177, 5);
      }
  }
  var H = [[[0, 0, 1], [0, -1, 2], [0, -2, 3], [-1, -1, 2], [-2, -2, 3], [1, -1, 2], [2, -2, 3]], [[0, 0, 1], [0, -1, 2], [1, -2, 3], [-1, 0, 1], [-2, -1, 3]], [[0, 0, 1], [-1, -1, 2], [-1, -2, 3], [1, -1, 2], [1, -2, 3]], [[0, 0, 1], [0, -1, 2], [-1, -2, 3], [1, 0, 1], [2, -1, 3]], [[0, 0, 1], [1, -1, 3]], [[0, 0, 1], [0, -1, 3]]];
  var k = [[[0, 0, 1], [0, -1, 2], [0, -2, 2], [0, -3, 3], [-1, -1, 2], [-1, -2, 2], [-2, -3, 3], [1, -1, 2], [2, -2, 2], [2, -3, 3]], [[0, 0, 1], [0, -1, 2], [1, -2, 2], [1, -3, 2], [1, -4, 3], [-1, -1, 2], [-1, -2, 3]], [[0, 0, 1], [-1, -1, 2], [-1, -2, 2], [-2, -3, 3], [1, -1, 2], [1, -2, 2], [1, -3, 2], [2, -4, 3], [0, -2, 2], [0, -3, 3]]];
  function S(n, r, a, t, e, u) {
    for (var i = 0; i < h / t; i++)
      for (var f = 0; f < h / a; f++) {
        var l = o(f, i, u);
        if (!((1023 & l) / 1024 >= e)) {
          for (var c = f * a + (l >>> 10) % a, g = i * t + (l >>> 14) % t, d = r[(l >>> 20) % r.length], y = l >>> 27 & 1, m = 0; m < d.length; m++) {
            var M = (g + d[m][1] & v) << 9 | c + (y ? -d[m][0] : d[m][0]) & v;
            if (n[M] < d[m][2]) {
              n[M] = d[m][2];
            }
          }
          var s = (g + 1 & v) << 9 | c & v;
          var w = (g + 1 & v) << 9 | c + 1 & v;
          if (0 === n[s]) {
            n[s] = -1;
          }
          if (0 === n[w]) {
            n[w] = -1;
          }
        }
      }
  }
  var W = [[[0, -1, 1], [-1, 0, 1], [1, 0, 1], [0, 1, 1], [0, 0, 2], [1, 1, 3], [0, 2, 3]], [[0, -1, 1], [-1, 0, 1], [1, 0, 1], [0, 1, 1], [0, 0, 2], [1, 1, 3], [0, 2, 3]], [[0, 0, 1], [1, 0, 1], [0, -1, 1], [1, 1, 3], [2, 1, 3]], [[0, 0, 1], [2, -1, 1], [1, 1, 3], [3, 0, 3]]];
  var _ = [[[-2, -1], [1, -1], [-1, 1]], [[-2, -2], [1, -2], [-1, 0], [-3, 1], [2, 1]], [[-1, -2], [-3, 0], [1, 0]], [[-2, -1], [1, -1], [-1, 1], [2, 2]]];
  function q() {
    var n = D([[128, .4], [32, .4], [16, .2]], 23);
    function r(n, r, a) {
      for (var t = 0; t < h; t++)
        for (var o = t * h, e = (t - 1 & v) * h, u = (t + 1 & v) * h, i = 0; i < h; i++) {
          var f = n[o + i] * a;
          var l = (n[o + (i + 1 & v)] - n[o + (i - 1 & v)]) * a * .5;
          var c = (n[u + i] - n[e + i]) * a * .5;
          var g = 1 - (f < 0 ? -f : f) / (Math.sqrt(l * l + c * c) + 4e-4) / 1.8;
          r[o + i] = g > 0 ? Math.round(255 * g) : 0;
        }
    }
    b = new Uint8Array(h * h);
    I = new Uint8Array(h * h);
    r(y, b, 1);
    r(n, I, 1);
  }
  t.rach = function (n, r, a) {
    var t = n & v;
    var o = r & v;
    if (n >> 9 & 1) {
      t = v - t;
    }
    if (r >> 9 & 1) {
      o = v - o;
    }
    return (a ? I : b)[o << 9 | t];
  };
  var C = null;
  var N = { stamp: !0, rach: !0 };
  function P(n, r) {
    return g[(r & v) << 9 | n & v];
  }
  function K(n, r) {
    return d[(r & v) << 9 | n & v];
  }
  function j(n, r) {
    return (r + 229 * (n >> 9) & v) << 9 | n + 173 * (r >> 9) & v;
  }
  a.kcThoi = {};
  t.nLo = P;
  t.nMi = function (n, r) {
    return y[(r & v) << 9 | n & v];
  };
  t.nHi = K;
  t.oTam = j;
  t.khom = function (n, r) {
    return x[j(n, r)];
  };
  t.khomCao = function (n, r) {
    return p[j(n, r)];
  };
  t.hoa = function (n, r) {
    return A[j(n, r)];
  };
  t.la = function (n, r) {
    return T[j(n, r)];
  };
  t.baLa = function (n, r) {
    return U[j(n, r)];
  };
  var G = 0;
  var O = 0;
  var E = 0;
  var R = 0;
  function V(n, r) {
    var a = (r & v) << 9 | n & v;
    G = .125 * m[a];
    O = M[a];
    E = s[a];
    R = w[a];
  }
  var B = t.v = { e: 0, dx: 0, dy: 0, id: 0 };
  function L(n, r, a) {
    var t;
    var o;
    var e;
    var u;
    var i = 1.41421;
    var f = new Float32Array(r * a);
    for (t = 0; t < f.length; t++)
      f[t] = n[t] ? 0 : 1e9;
    for (e = 0; e < a; e++)
      for (o = 0; o < r; o++)
        u = f[t = e * r + o], o > 0 && f[t - 1] + 1 < u && (u = f[t - 1] + 1), e > 0 && (f[t - r] + 1 < u && (u = f[t - r] + 1), o > 0 && f[t - r - 1] + i < u && (u = f[t - r - 1] + i), o < r - 1 && f[t - r + 1] + i < u && (u = f[t - r + 1] + i)), f[t] = u;
    for (e = a - 1; e >= 0; e--)
      for (o = r - 1; o >= 0; o--)
        u = f[t = e * r + o], o < r - 1 && f[t + 1] + 1 < u && (u = f[t + 1] + 1), e < a - 1 && (f[t + r] + 1 < u && (u = f[t + r] + 1), o < r - 1 && f[t + r + 1] + i < u && (u = f[t + r + 1] + i), o > 0 && f[t + r - 1] + i < u && (u = f[t + r - 1] + i)), f[t] = u;
    return f;
  }
  function Q(n, r, a, t) {
    var o;
    var e;
    var u;
    var i;
    var f;
    var l;
    var c = new Float32Array(n.length);
    var h = new Float32Array(n.length);
    for (e = 0; e < a; e++) {
      var v = e * r;
      for (u = 0, i = 0, o = 0; o <= t && o < r; o++)
        u += n[v + o], i++;
      for (o = 0; o < r; o++)
        c[v + o] = u / i, l = o - t, (f = o + t + 1) < r && (u += n[v + f], i++), l >= 0 && (u -= n[v + l], i--);
    }
    for (o = 0; o < r; o++) {
      for (u = 0, i = 0, e = 0; e <= t && e < a; e++)
        u += c[e * r + o], i++;
      for (e = 0; e < a; e++)
        h[e * r + o] = u / i, l = e - t, (f = e + t + 1) < a && (u += c[f * r + o], i++), l >= 0 && (u -= c[l * r + o], i--);
    }
    return h;
  }
  function X(n, r, a, t) {
    for (var o = 0; o < t.length; o++)
      n = Q(n, r, a, t[o]);
    return n;
  }
  function z(n, r, a, t) {
    var o = (a + .5) / 4 - .5;
    var e = (t + .5) / 4 - .5;
    var u = Math.floor(o);
    var i = Math.floor(e);
    var f = o - u;
    var l = e - i;
    var c = n.gw;
    if (u < 0) {
      u = 0;
      f = 0;
    }
    else {
      if (u > c - 2) {
        u = c - 2;
        f = 1;
      }
    }
    if (i < 0) {
      i = 0;
      l = 0;
    }
    else {
      if (i > n.gh - 2) {
        i = n.gh - 2;
        l = 1;
      }
    }
    var h = i * c + u;
    var v = r[h];
    var g = r[h + 1];
    var d = r[h + c];
    return v + (g - v) * f + (d - v) * l + (v - g - d + r[h + c + 1]) * f * l;
  }
  function J(n) {
    var r = parseInt(n.slice(1), 16);
    return [r >> 16 & 255, r >> 8 & 255, 255 & r];
  }
  function Y(n, r, a) {
    return [n[0] + (r[0] - n[0]) * a, n[1] + (r[1] - n[1]) * a, n[2] + (r[2] - n[2]) * a];
  }
  function Z(n, r) {
    for (var a = n.map(function (n) {
      return [n[0], "string" == typeof n[1] ? J(n[1]) : n[1]];
    }), t = [], o = 0; o < r; o++) {
      for (var e = o / (r - 1), i = 0; i < a.length - 2 && e > a[i + 1][0];)
        i++;
      var f = a[i];
      var l = a[i + 1];
      var c = Y(f[1], l[1], u((e - f[0]) / (l[0] - f[0])));
      t.push([Math.round(c[0]), Math.round(c[1]), Math.round(c[2])]);
    }
    return t;
  }
  t.voro = function (n, r) {
    V(n, r);
    B.e = G;
    B.dx = O;
    B.dy = E;
    B.id = R;
    return B;
  };
  t.voroUon = function (n, r, a, t, o, e, u) {
    (function (n, r, a, t, o, e, u) {
      V(Math.round(n * a + P(n + u, r + e) * o) + e, Math.round(r * t + P(n + e, r + u) * o) + u);
    })(n, r, a, t, o, e, u);
    B.e = G;
    B.dx = O;
    B.dy = E;
    B.id = R;
    return B;
  };
  t.chamfer = L;
  t.mo = Q;
  t.moNhieu = X;
  t.truongDau = function (n, r, a, t) {
    for (var o = new Uint8Array(n.length), e = 0; e < n.length; e++)
      o[e] = n[e] ? 0 : 1;
    var u = L(o, r, a);
    var i = L(n, r, a);
    var f = new Float32Array(n.length);
    for (e = 0; e < f.length; e++)
      f[e] = n[e] ? 4 * -(u[e] - .5) : 4 * (i[e] - .5);
    return X(f, r, a, t || [1, 1]);
  };
  t.matNa = function (n, r) {
    for (var a = n.gw, t = n.gh, o = n.TW, e = new Uint8Array(a * t), u = 0; u < t; u++)
      for (var i = (4 * u + 2 >> 5) * o, f = 0; f < a; f++)
        e[u * a + f] = r(i + (4 * f + 2 >> 5)) ? 1 : 0;
    return e;
  };
  t.matDo = function (n, r) {
    for (var a = n.gw, t = n.gh, o = n.TW, e = new Float32Array(a * t), u = 0; u < t; u++)
      for (var i = (4 * u + 2 >> 5) * o, f = 0; f < a; f++)
        e[u * a + f] = r[i + (4 * f + 2 >> 5)];
    return e;
  };
  t.mau = z;
  t.dungKhoi = function (n, r, a, o, e) {
    var u;
    var i;
    var f;
    var l = n.W;
    var c = n.H;
    var h = n.gw;
    var v = n.gh;
    var g = l * c;
    var d = t.truongDau(t.matNa(n, r), h, v, a || [2]);
    var y = t.truongDau(t.matNa(n, r), h, v, []);
    e = e || 4;
    var m = new Uint8Array(g);
    var M = new Uint16Array(g);
    var s = new Uint16Array(g);
    var w = new Uint8Array(g);
    for (i = 0; i < c; i++)
      for (u = 0; u < l; u++) {
        var x = z(n, y, u, i);
        var p = z(n, d, u, i) + (o ? o(u, i) : 0);
        f = i * l + u;
        if ((p = p < x - e ? x - e : p > x + e ? x + e : p) < 0) {
          m[f] = 1;
          w[f] = -p > 255 ? 255 : 0 | -p;
        }
      }
    for (u = 0; u < l; u++) {
      var A = 0;
      var T = !1;
      var U = !1;
      for (i = c - 1; i >= 0; i--)
        m[f = i * l + u] ? (T || (T = !0, A = 0, U = i === c - 1), M[f] = U ? 6e4 : A, A++) : T = !1;
      var b = 0;
      var I = !1;
      var D = !1;
      for (i = 0; i < c; i++)
        m[f = i * l + u] ? (I || (I = !0, b = 0, D = 0 === i), s[f] = D ? 6e4 : b, b++) : I = !1;
    }
    return { sd: d, sd0: y, M: m, V: M, U: s, E: w };
  };
  t.bongKhoi = function (n, r, a, t, o) {
    var e = z(n, r, a - .55 * o, t - .9 * o);
    return e <= 0 ? 1 : e >= o ? 0 : (1 - e / o) * (1 - e / o);
  };
  t.caoDa = function (n, r) {
    return .72 * P(1.7 * n | 0, 2.3 * r | 0) + .28 * K(.9 * n | 0, 1.2 * r | 0);
  };
  t.congSang = function (n, r, a, t, o, e, u) {
    var i = n.gw;
    var f = n.gh;
    var l = Math.max(0, (a - o) / 4 | 0);
    var c = Math.min(i - 1, (a + o) / 4 | 0);
    var h = Math.max(0, (t - o) / 4 | 0);
    var v = Math.min(f - 1, (t + o) / 4 | 0);
    u = u || 1.25;
    for (var g = h; g <= v; g++)
      for (var d = l; d <= c; d++) {
        var y = 4 * d + 2 - a;
        var m = (4 * g + 2 - t) * u;
        var M = 1 - Math.sqrt(y * y + m * m) / o;
        if (M > 0) {
          r[g * i + d] = Math.min(1.4, r[g * i + d] + M * M * e);
        }
      }
  };
  t.bongElip = function (n, r, a, t, o, e) {
    for (var u = n.W, f = n.H, l = n.bong, c = Math.max(0, Math.floor(r - t - 1)), h = Math.min(u - 1, Math.ceil(r + t + 1)), v = Math.max(0, Math.floor(a - o - 1)), g = Math.min(f - 1, Math.ceil(a + o + 1)), d = v; d <= g; d++)
      for (var y = c; y <= h; y++) {
        var m = (y + .5 - r) / t;
        var M = (d + .5 - a) / o;
        var s = m * m + M * M;
        if (!(s >= 1)) {
          var w = Math.round(255 * e * (1 - i(.3, 1, s)));
          var x = d * u + y;
          if (w > l[x]) {
            l[x] = w;
          }
        }
      }
  };
  t.hex = J;
  t.tron3 = Y;
  t.daiMoc = Z;
  t.dai = function (n, r) {
    return Z(n.map(function (r, a) {
      return [a / (n.length - 1), r];
    }), r || n.length);
  };
  var $ = t.S = { ram: null, v: .5, nx: 0, ny: 0, mau: null };
  function nn(n, r, a, t, o, e) {
    var i = a.length - 1;
    var f = u(t) * i;
    var l = 0 | f;
    if (f - l > c(o, e) && l < i) {
      l++;
    }
    var h = a[l];
    n[r] = h[0];
    n[r + 1] = h[1];
    n[r + 2] = h[2];
    n[r + 3] = 255;
  }
  t.toRamp = nn;
  var rn = .58;
  function an(n, r) {
    var a = 1 - n * n - r * r;
    var t = -.506 * n + -.628 * r + .608 * (a > 0 ? Math.sqrt(a) : 0);
    return t <= 0 ? rn : rn + (1 - rn) * t / .608;
  }
  function tn(n, r, a, t) {
    if ($.mau) {
      n[r] = $.mau[0];
      n[r + 1] = $.mau[1];
      n[r + 2] = $.mau[2];
      return void (n[r + 3] = 255);
    }
    nn(n, r, $.ram, $.v * an($.nx, $.ny), a, t);
  }
  function on(r, t) {
    var u = f();
    var i = r.width;
    var l = r.height;
    var c = 32 * i;
    var I = 32 * l;
    var P = a.ai[t];
    if (!P) {
      throw new Error("chưa có nét vẽ cho ải " + t);
    }
    var K = { data: r, ai: t, P: P, TW: i, TH: l, W: c, H: I, gw: c / 4, gh: I / 4, batDau: u };
    var j = r.legend || {};
    K.nen = new Array(i * l);
    K.vat = new Array(i * l);
    K.chan = new Uint8Array(i * l);
    for (var G = 0; G < l; G++)
      for (var O = r.ground[G] || "", E = 0; E < i; E++) {
        var R = j[O.charAt(E)] || {};
        var V = G * i + E;
        K.nen[V] = R.ground || "";
        K.vat[V] = R.obj || "";
        K.chan[V] = R.block ? 1 : 0;
      }
    function B(n, r) {
      r.ten = n;
      return r;
    }
    K.bong = new Uint8Array(c * I);
    K.thoi = {};
    K.chen = 0;
    K.viec = [B("ketCau", function (n) {
        return function (n, r) {
          r = r || N;
          var t = function () {
            return n && f() > n;
          };
          function u(n, r) {
            var t = f();
            r();
            a.kcThoi[n] = (a.kcThoi[n] || 0) + f() - t;
          }
          if (!g && (u("nlo", function () {
            g = D([[128, .5], [64, .3], [32, .2]], 13);
          }), t())) {
            return !1;
          }
          if (!y && (u("nmi", function () {
            y = D([[64, .45], [32, .35], [16, .2]], 17);
          }), t())) {
            return !1;
          }
          if (!d && (u("nhi", function () {
            d = D([[16, .5], [8, .3], [4, .2]], 19);
          }), t())) {
            return !1;
          }
          if (!w || C) {
            if (!(C)) {
              C = function () {
                for (var n = new Float32Array(1024), r = new Float32Array(1024), a = 0; a < 32; a++)
                  for (var t = 0; t < 32; t++)
                    n[32 * a + t] = 16 * (t + .14 + .72 * e(t, a, 611)), r[32 * a + t] = 16 * (a + .14 + .72 * e(t, a, 612));
                m = new Uint8Array(h * h);
                M = new Int8Array(h * h);
                s = new Int8Array(h * h);
                w = new Uint16Array(h * h);
                return { hx: n, hy: r, y: 0 };
              }();
            }
            for (var i = f(); C.y < h;) {
              var l = Math.min(h, C.y + 16);
              if (F(C, C.y, l), C.y = l, C.y < h && t()) {
                a.kcThoi.voro = (a.kcThoi.voro || 0) + f() - i;
                return !1;
              }
            }
            if (a.kcThoi.voro = (a.kcThoi.voro || 0) + f() - i, C = null, t()) {
              return !1;
            }
          }
          return !(r.stamp && !T && (u("dau", function () {
            S(x = new Int8Array(h * h), H, 8, 4, .66, 521);
            S(p = new Int8Array(h * h), k, 4, 4, .8, 523);
            (function (n) {
              for (var r = 0; r < 64; r++)
                for (var a = 0; a < 64; a++)
                  for (var t = o(a, r, 733), e = 8 * a + 1 + (t >>> 4) % 6, u = 8 * r + 1 + (t >>> 8) % 6, i = W[(t >>> 12) % W.length], f = t >>> 16 & 3, l = t >>> 18 & 15, c = 0; c < i.length; c++) {
                    var h = (u + i[c][1] & v) << 9 | e + i[c][0] & v;
                    if (!(3 === i[c][2] && n[h])) {
                      n[h] = i[c][2] | f << 2 | l << 4;
                    }
                  }
            })(A = new Uint8Array(h * h));
            (function (n) {
              for (var r = 0; r < 64; r++)
                for (var a = 0; a < 64; a++)
                  for (var t = o(a, r, 1733), e = o(a, r, 1737), u = 8 * a + t % 8, i = 8 * r + (t >>> 3) % 8, f = (t >>> 6 & 255) / 255 * Math.PI, l = 4 + (t >>> 14) % 3, c = 1 + .4 * (e >>> 3 & 1), h = (e >>> 5) % 3, g = t >>> 17 & 7, d = Math.cos(f), y = Math.sin(f), m = -y, M = d, s = 0; s <= l; s += .5)
                    for (var w = s / l, x = Math.sin(Math.PI * w) * c, p = -x; p <= x + .01; p += .5) {
                      var A = Math.round(u + d * s + m * p);
                      var T = Math.round(i + y * s + M * p);
                      var U = Math.abs(p) > x - .55 ? 1 : Math.abs(p) < .3 && w > .15 && w < .8 ? 3 : 2;
                      var b = (T & v) << 9 | A & v;
                      var I = 7 & n[b];
                      if ((!I || 4 === I || I < U)) {
                        n[b] = U | h << 3 | g << 5;
                      }
                      var D = (T + 1 & v) << 9 | A + 1 & v;
                      if (!(n[D])) {
                        n[D] = 4 | h << 3 | g << 5;
                      }
                    }
            })(T = new Uint8Array(h * h));
            (function (n) {
              for (var r = 0; r < h / 12 - 1; r++)
                for (var a = 0; a < h / 12 - 1; a++)
                  for (var t = o(a, r, 1901), e = 12 * a + 3 + t % 7, u = 12 * r + 3 + (t >>> 3) % 7, i = _[(t >>> 6) % _.length], f = t >>> 9 & 15, l = 0; l < i.length; l++) {
                    for (var c = e + i[l][0], g = u + i[l][1], d = 0; d < 2; d++)
                      for (var y = 0; y < 2; y++)
                        n[(g + d & v) << 9 | c + y & v] = (0 === y && 0 === d ? 2 : 1) | f << 2;
                    var m = (g + 2 & v) << 9 | c + 1 & v;
                    if (!(n[m])) {
                      n[m] = 3 | f << 2;
                    }
                  }
            })(U = new Uint8Array(h * h));
          }), t()) || (r.rach && !b && u("rach", q), 0));
        }(n, { stamp: 1 === t, rach: 2 === t || 4 === t });
      }), B("chuanBi", function () {
        K.chen = 0;
        P.chuanBi(K);
        K.dong = 0;
      }), B("canvas", function () {
        var r = n.Utils.canvas(c, I);
        K.canvas = r.canvas;
        K.ctx = r.ctx;
        K.anh = K.ctx.createImageData(c, I);
        K.dong = 0;
      }), B("to", function (n) {
        return function (n, r) {
          for (var a = n.W, t = n.P, o = n.anh.data, e = t.to, u = t.hau; n.dong < n.H;) {
            for (var i = Math.min(n.H, n.dong + 16), l = n.dong; l < i; l++)
              for (var c = 0; c < a; c++) {
                var h = l * a + c;
                var v = 4 * h;
                $.ram = null;
                $.mau = null;
                $.v = .5;
                $.nx = 0;
                $.ny = 0;
                e(n, c, l, h);
                tn(o, v, c, l);
                if (u) {
                  u(n, o, v, c, l, h);
                }
              }
            if (n.dong = i, r && f() > r) {
              return n.dong >= n.H;
            }
          }
          return !0;
        }(K, n);
      }), B("put", function () {
        K.ctx.putImageData(K.anh, 0, 0);
        K.anh = null;
      }), B("hauKy", function (n) {
        return !P.hauKy || P.hauKy(K, n);
      }), B("xong", function () {
        K.xong = !0;
        K.msTong = f() - K.batDau;
        if (P.don) {
          P.don(K);
        }
      })];
    return K;
  }
  function en(n, r) {
    for (; n.viec.length;) {
      var a = f();
      var t = n.viec[0];
      var o = !1 !== t(r);
      if (n.thoi && (n.thoi[t.ten || "?"] = (n.thoi[t.ten || "?"] || 0) + (f() - a)), o && n.viec.shift(), r && f() > r) {
        return !n.viec.length;
      }
    }
    return !0;
  }
  t.nang = an;
  t.dat = function (n, r, a, t) {
    $.ram = n;
    $.v = r;
    $.nx = a || 0;
    $.ny = t || 0;
    $.mau = null;
  };
  t.datMau = function (n) {
    $.mau = n;
  };
  t.phu = function (n, r, a, t) {
    if (!(t <= .004)) {
      if (t > 1) {
        t = 1;
      }
      n[r] += (a[0] - n[r]) * t;
      n[r + 1] += (a[1] - n[r + 1]) * t;
      n[r + 2] += (a[2] - n[r + 2]) * t;
    }
  };
  t.cong = function (n, r, a, t) {
    if (!(t <= .004)) {
      var o = n[r] + a[0] * t;
      var e = n[r + 1] + a[1] * t;
      var u = n[r + 2] + a[2] * t;
      n[r] = o > 255 ? 255 : o;
      n[r + 1] = e > 255 ? 255 : e;
      n[r + 2] = u > 255 ? 255 : u;
    }
  };
  t.viec = function (n, r, a) {
    a.ten = r;
    n.viec.splice(1 + n.chen++, 0, a);
  };
  var un = null;
  var fn = {};
  t.veToi = function (r, a, t, o, e, u, i, f) {
    var l = u >= 2 ? 3 : 5;
    var c = Math.ceil(o / l) + 2;
    var h = Math.ceil(e / l) + 2;
    if ((!un || un.canvas.width < c || un.canvas.height < h)) {
      un = n.Utils.canvas(Math.max(c, un ? un.canvas.width : 0), Math.max(h, un ? un.canvas.height : 0));
    }
    var v = un.ctx;
    v.globalCompositeOperation = "source-over";
    v.globalAlpha = 1;
    if ("function" == typeof i) {
      i(v, c, h, l, a, t);
    }
    else {
      v.fillStyle = i;
      v.fillRect(0, 0, c, h);
    }
    v.globalCompositeOperation = "lighter";
    f(function (r, o, e, u, i) {
      var f = (r - a) / l;
      var g = (o - t) / l;
      var d = e / l;
      if (!(f < -d || g < -d || f > c + d || g > h + d)) {
        v.globalAlpha = i > 1 ? 1 : i;
        v.drawImage(function (r) {
          var a = fn[r];
          if (a) {
            return a;
          }
          for (var t = n.Utils.canvas(64, 64), o = t.ctx.createRadialGradient(32, 32, 0, 32, 32, 32), e = J(r), u = 0; u <= 6; u++) {
            var i = u / 6;
            var f = Math.pow(1 - i, 1.8);
            o.addColorStop(i, "rgba(" + e[0] + "," + e[1] + "," + e[2] + "," + f.toFixed(3) + ")");
          }
          t.ctx.fillStyle = o;
          t.ctx.fillRect(0, 0, 64, 64);
          fn[r] = t.canvas;
          return t.canvas;
        }(u), f - d, g - d, 2 * d, 2 * d);
      }
    });
    v.globalAlpha = 1;
    v.globalCompositeOperation = "source-over";
    r.save();
    r.globalCompositeOperation = "multiply";
    r.imageSmoothingEnabled = !0;
    r.drawImage(un.canvas, 0, 0, c, h, 0, 0, c * l, h * l);
    r.restore();
  };
  t.nguonNguoi = function (r, a, t, o, e, u, i, f) {
    var l = n.SceneWorld && n.SceneWorld.player;
    if (l) {
      r(l.x, l.y - 18, u, f || "#fff0d8", 1);
      r(l.x, l.y - 18, .52 * u, "#fff4e4", .5);
    }
    var c = n.Gateway && n.Gateway.remotes;
    var h = 0;
    if (c) {
      for (var v in c) {
        var g = c[v];
        if (!(!g || !g.seen || h >= 16 || g.x < a - 200 || g.x > a + o + 200 || g.y < t - 200 || g.y > t + e + 200)) {
          r(g.x, g.y - 18, i, f || "#ffe8cc", .9);
          h++;
        }
      }
    }
  };
  var ln = {};
  t.quang = function (r, a, t, o) {
    var e = r.join(",") + "|" + a + "|" + t + "|" + o;
    var u = ln[e];
    if (u) {
      return u;
    }
    for (var i = 2 * a + 1, f = n.Utils.canvas(i, i), l = f.ctx.createImageData(i, i), h = l.data, v = 0; v < i; v++)
      for (var g = 0; g < i; g++) {
        var d = g - a;
        var y = v - a;
        var m = Math.sqrt(d * d + y * y);
        if (!(m > a)) {
          var M = Math.floor((1 - m / a) * o + .95 * c(g, v)) / o;
          var s = 4 * (v * i + g);
          if (!(M <= 0)) {
            h[s] = r[0];
            h[s + 1] = r[1];
            h[s + 2] = r[2];
            h[s + 3] = Math.round(M * t);
          }
        }
      }
    f.ctx.putImageData(l, 0, 0);
    return ln[e] = f.canvas;
  };
  var cn = {};
  t.quangMem = function (r, a, t, o, e) {
    var u = r.join(",") + "|" + a + "|" + t + "|" + o + "|" + e;
    var i = cn[u];
    if (i) {
      return i;
    }
    for (var f = n.Utils.canvas(a, t), l = f.ctx.createImageData(a, t), c = l.data, h = 0; h < t; h++)
      for (var v = 0; v < a; v++) {
        var g = (v + .5 - a / 2) / (a / 2);
        var d = (h + .5 - t / 2) / (t / 2);
        var y = g * g + d * d;
        if (!(y >= 1)) {
          var m = Math.pow(1 - y, e || 1.6);
          var M = 4 * (h * a + v);
          c[M] = r[0];
          c[M + 1] = r[1];
          c[M + 2] = r[2];
          c[M + 3] = Math.round(m * o);
        }
      }
    f.ctx.putImageData(l, 0, 0);
    return cn[u] = f.canvas;
  };
  t.nhaQuang = function () {
    ln = {};
    cn = {};
    fn = {};
  };
  var hn = { data: null, layer: null, loi: !1 };
  function vn() {
    return !(!n.Utils || !n.Utils.canvas || "undefined" == typeof document);
  }
  function gn(n) {
    return n && r[n.id] || 0;
  }
  function dn(n) {
    hn.loi = !0;
    if ("undefined" != typeof console) {
      console.error("[PNTT] Không dựng được nền Hư Thiên:", n);
    }
  }
  function yn(n) {
    hn.data = n;
    hn.layer = null;
    hn.loi = !1;
    try {
      hn.layer = on(n, gn(n));
    }
    catch (n) {
      dn(n);
    }
  }
  a.chuanBiTruoc = function (n) {
    if (gn(n) && vn()) {
      if (!(hn.data === n && (hn.layer || hn.loi))) {
        hn.data = n;
        hn.layer = null;
        hn.loi = !1;
        setTimeout(function r() {
          if (hn.data === n && !hn.loi) {
            try {
              if (!hn.layer) {
                yn(n);
                return void setTimeout(r, 0);
              }
              if (hn.layer.dangHien) {
                return;
              }
              if (!(en(hn.layer, f() + 12))) {
                setTimeout(r, 0);
              }
            }
            catch (n) {
              dn(n);
            }
          }
        }, 0);
      }
    }
  };
  a.quen = function () {
  };
  a.choXong = function (n) {
    if (!gn(n) || hn.data !== n || hn.loi) {
      return !0;
    }
    var r = hn.layer;
    return !(!r || !r.xong && !r.dangHien);
  };
  a.nha = function (n) {
    if (hn.data && hn.data !== n) {
      hn.data = null;
      hn.layer = null;
      hn.loi = !1;
    }
    if (!(gn(n))) {
      g = y = d = m = M = s = w = null;
      x = p = A = T = U = b = I = null;
      C = null;
    }
  };
  a.layerFor = function (n) {
    var r = n && n.data;
    return gn(r) ? vn() && a.ai[gn(r)] ? (hn.data === r && (hn.layer || hn.loi) || yn(r), hn.loi ? null : hn.layer) : null : (hn.data && hn.layer && hn.layer.dangHien && (hn.data = null, hn.layer = null), null);
  };
  a.dangDung = function (n) {
    return !(!(n && n.data && gn(n.data) && hn.data === n.data && hn.layer) || hn.loi);
  };
  a.sanSang = function (n) {
    return !(hn.data !== n || !hn.layer || !hn.layer.xong);
  };
  a.lop = function (n) {
    return hn.data === n && hn.layer && hn.layer.xong ? hn.layer : null;
  };
  a.nuongTiep = function (n) {
    if (!n) {
      return !1;
    }
    try {
      en(n, 0);
    }
    catch (n) {
      throw dn(n), n;
    }
    return !n.xong && !hn.loi;
  };
  a.draw = function (n, r, a, t, o, e) {
    if (r.dangHien = !0, !r.xong) {
      try {
        en(r, 0);
      }
      catch (n) {
        dn(n);
      }
      if (!r.xong) {
        return !1;
      }
    }
    var u = Math.max(0, Math.floor(a));
    var i = Math.min(r.W, Math.ceil(a + o) + 1);
    var f = Math.max(0, Math.floor(t));
    var l = Math.min(r.H, Math.ceil(t + e) + 1);
    if (i > u && l > f) {
      n.drawImage(r.canvas, u, f, i - u, l - f, u - a | 0, f - t | 0, i - u, l - f);
    }
    return !0;
  };
  a.drawFx = function (n, r, t, o, e, u, i, f) {
    var l = r && r.data;
    var c = gn(l);
    if (!(!c || !a.veFx || f <= 0)) {
      a.veFx(n, c, r, t, o, e, u, i || 0, f, a.lop(l));
    }
  };
  a.doiVat = function (n) {
    var r = gn(n && n.data);
    if (r && a.chonVat) {
      for (var t = [n.objects, n.flatObjects], o = 0; o < t.length; o++)
        for (var e = t[o] || [], u = 0; u < e.length; u++)
          a.chonVat(r, e[u], n);
    }
  };
  a._taoLop = on;
  a.aiCua = gn;
  a.MAP_IDS = r;
}(window.PNTT);
