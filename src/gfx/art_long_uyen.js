!function (a) {
  "use strict";
  var r = "long_uyen";
  var n = 32;
  var t = 256;
  var o = a.LongUyenArt = {};
  function e(a, r, n) {
    var t = Math.imul(0 | a, 374761393) ^ Math.imul(0 | r, 668265263) ^ Math.imul(40503 + (0 | n), 1274126177);
    return ((t = Math.imul(t ^ t >>> 13, 1274126177)) ^ t >>> 16) >>> 0;
  }
  function u(a, r, n) {
    return e(a, r, n) / 4294967296;
  }
  function f(a) {
    return a < 0 ? 0 : a > 1 ? 1 : a;
  }
  function l(a, r, n) {
    return a < r ? r : a > n ? n : a;
  }
  function i(a, r, n) {
    var t = f((n - a) / (r - a));
    return t * t * (3 - 2 * t);
  }
  function h() {
    return "undefined" != typeof performance ? performance.now() : Date.now();
  }
  var c = 512;
  var v = 511;
  var d = null;
  var s = null;
  var g = null;
  var M = null;
  var y = null;
  var b = null;
  var x = null;
  var w = null;
  var m = null;
  var p = null;
  function A(a, r) {
    for (var n = new Float32Array(c * c), t = 0; t < a.length; t++) {
      for (var o = a[t][0], e = a[t][1], f = c / o, l = new Float32Array(f * f), i = 0; i < l.length; i++)
        l[i] = 2 * u(i, 7 * t + r, o) - 1;
      for (var h = 0; h < c; h++) {
        var v = h / o;
        var d = 0 | v;
        var s = v - d;
        s = s * s * (3 - 2 * s);
        for (var g = d % f * f, M = (d + 1) % f * f, y = 0; y < c; y++) {
          var b = y / o;
          var x = 0 | b;
          var w = b - x;
          w = w * w * (3 - 2 * w);
          var m = x % f;
          var p = (x + 1) % f;
          var A = l[g + m];
          var _ = l[g + p];
          var k = l[M + m];
          var T = l[M + p];
          n[h * c + y] += e * (A + (_ - A) * w + (k - A) * s + (A - _ - k + T) * w * s);
        }
      }
    }
    return n;
  }
  function _(a, r, n) {
    for (var t = a.hx, o = a.hy, u = 32, f = new Float32Array(9), l = new Float32Array(9), i = new Int32Array(9), h = r; h < n; h++)
      for (var v = h / 16 | 0, d = 0; d < c; d++) {
        for (var s = d / 16 | 0, x = 0, w = 1e9, m = 0, p = -1; p <= 1; p++)
          for (var A = -1; A <= 1; A++) {
            var _ = s + A;
            var k = v + p;
            var T = 0;
            var I = 0;
            if (_ < 0) {
              _ += u;
              T = -c;
            }
            else {
              if (_ >= u) {
                _ -= u;
                T = c;
              }
            }
            if (k < 0) {
              k += u;
              I = -c;
            }
            else {
              if (k >= u) {
                k -= u;
                I = c;
              }
            }
            var U = k * u + _;
            f[x] = t[U] + T;
            l[x] = o[U] + I;
            i[x] = U;
            var C = d + .5 - f[x];
            var R = h + .5 - l[x];
            var W = C * C + R * R;
            if (W < w) {
              w = W;
              m = x;
            }
            x++;
          }
        for (var P = f[m], D = l[m], N = 1e9, q = 0; q < x; q++)
          if (q !== m) {
            var L = f[q] - P;
            var F = l[q] - D;
            var H = Math.sqrt(L * L + F * F);
            if (!(H < .001)) {
              var S = (.5 * (f[q] + P) - (d + .5)) * L / H + (.5 * (l[q] + D) - (h + .5)) * F / H;
              if (S < N) {
                N = S;
              }
            }
          }
        var K = h * c + d;
        g[K] = Math.min(255, Math.max(0, Math.round(8 * N)));
        M[K] = Math.max(-127, Math.min(127, Math.round(d + .5 - P)));
        y[K] = Math.max(-127, Math.min(127, Math.round(h + .5 - D)));
        b[K] = 65535 & e(i[m], 177, 5);
      }
  }
  var k = [[[0, 0, 1], [0, -1, 2], [0, -2, 3], [-1, -1, 2], [-2, -2, 3], [1, -1, 2], [2, -2, 3]], [[0, 0, 1], [0, -1, 2], [1, -2, 3], [-1, 0, 1], [-2, -1, 3]], [[0, 0, 1], [-1, -1, 2], [-1, -2, 3], [1, -1, 2], [1, -2, 3]], [[0, 0, 1], [0, -1, 2], [-1, -2, 3], [1, 0, 1], [2, -1, 3]], [[0, 0, 1], [1, -1, 3]], [[0, 0, 1], [0, -1, 3]]];
  var T = [[[0, 0, 1], [0, -1, 2], [0, -2, 2], [0, -3, 3], [-1, -1, 2], [-1, -2, 2], [-2, -3, 3], [1, -1, 2], [2, -2, 2], [2, -3, 3]], [[0, 0, 1], [0, -1, 2], [1, -2, 2], [1, -3, 2], [1, -4, 3], [-1, -1, 2], [-1, -2, 3]], [[0, 0, 1], [-1, -1, 2], [-1, -2, 2], [-2, -3, 3], [1, -1, 2], [1, -2, 2], [1, -3, 2], [2, -4, 3], [0, -2, 2], [0, -3, 3]]];
  function I(a, r, n, t, o, u) {
    for (var f = 0; f < c / t; f++)
      for (var l = 0; l < c / n; l++) {
        var i = e(l, f, u);
        if (!((1023 & i) / 1024 >= o)) {
          for (var h = l * n + (i >>> 10) % n, d = f * t + (i >>> 14) % t, s = r[(i >>> 20) % r.length], g = i >>> 27 & 1, M = 0; M < s.length; M++) {
            var y = (d + s[M][1] & v) << 9 | h + (g ? -s[M][0] : s[M][0]) & v;
            if (a[y] < s[M][2]) {
              a[y] = s[M][2];
            }
          }
          var b = (d + 1 & v) << 9 | h & v;
          var x = (d + 1 & v) << 9 | h + 1 & v;
          if (0 === a[b]) {
            a[b] = -1;
          }
          if (0 === a[x]) {
            a[x] = -1;
          }
        }
      }
  }
  var U = [[[0, -1, 1], [-1, 0, 1], [1, 0, 1], [0, 1, 1], [0, 0, 2], [1, 1, 3], [0, 2, 3]], [[0, -1, 1], [-1, 0, 1], [1, 0, 1], [0, 1, 1], [0, 0, 2], [1, 1, 3], [0, 2, 3]], [[0, 0, 1], [1, 0, 1], [0, -1, 1], [1, 1, 3], [2, 1, 3]], [[0, 0, 1], [2, -1, 1], [1, 1, 3], [3, 0, 3]]];
  var C = null;
  function R(a, r) {
    return d[(r & v) << 9 | a & v];
  }
  function W(a, r) {
    return s[(r & v) << 9 | a & v];
  }
  var P = 0;
  var D = 0;
  var N = 0;
  var q = 0;
  function L(a, r) {
    var n = (r & v) << 9 | a & v;
    P = .125 * g[n];
    D = M[n];
    N = y[n];
    q = b[n];
  }
  function F(a, r, n, t, o, e, u) {
    L(Math.round(a * n + R(a + u, r + e) * o) + e, Math.round(r * t + R(a + e, r + u) * o) + u);
  }
  function H(a, r, n) {
    var t;
    var o;
    var e;
    var u;
    var f = 1.41421;
    var l = new Float32Array(r * n);
    for (t = 0; t < l.length; t++)
      l[t] = a[t] ? 0 : 1e9;
    for (e = 0; e < n; e++)
      for (o = 0; o < r; o++)
        u = l[t = e * r + o], o > 0 && l[t - 1] + 1 < u && (u = l[t - 1] + 1), e > 0 && (l[t - r] + 1 < u && (u = l[t - r] + 1), o > 0 && l[t - r - 1] + f < u && (u = l[t - r - 1] + f), o < r - 1 && l[t - r + 1] + f < u && (u = l[t - r + 1] + f)), l[t] = u;
    for (e = n - 1; e >= 0; e--)
      for (o = r - 1; o >= 0; o--)
        u = l[t = e * r + o], o < r - 1 && l[t + 1] + 1 < u && (u = l[t + 1] + 1), e < n - 1 && (l[t + r] + 1 < u && (u = l[t + r] + 1), o < r - 1 && l[t + r + 1] + f < u && (u = l[t + r + 1] + f), o > 0 && l[t + r - 1] + f < u && (u = l[t + r - 1] + f)), l[t] = u;
    return l;
  }
  function S(a, r, n, t) {
    var o;
    var e;
    var u;
    var f;
    var l;
    var i;
    var h = new Float32Array(a.length);
    var c = new Float32Array(a.length);
    for (e = 0; e < n; e++) {
      var v = e * r;
      for (u = 0, f = 0, o = 0; o <= t && o < r; o++)
        u += a[v + o], f++;
      for (o = 0; o < r; o++)
        h[v + o] = u / f, i = o - t, (l = o + t + 1) < r && (u += a[v + l], f++), i >= 0 && (u -= a[v + i], f--);
    }
    for (o = 0; o < r; o++) {
      for (u = 0, f = 0, e = 0; e <= t && e < n; e++)
        u += h[e * r + o], f++;
      for (e = 0; e < n; e++)
        c[e * r + o] = u / f, i = e - t, (l = e + t + 1) < n && (u += h[l * r + o], f++), i >= 0 && (u -= h[i * r + o], f--);
    }
    return c;
  }
  function K(a, r, n, t) {
    for (var o = 0; o < t.length; o++)
      a = S(a, r, n, t[o]);
    return a;
  }
  function O(a, r, n, t) {
    for (var o = new Uint8Array(a.length), e = 0; e < a.length; e++)
      o[e] = a[e] ? 0 : 1;
    var u = H(o, r, n);
    var f = H(a, r, n);
    var l = new Float32Array(a.length);
    for (e = 0; e < l.length; e++)
      l[e] = a[e] ? 4 * -(u[e] - .5) : 4 * (f[e] - .5);
    return K(l, r, n, t || [1, 1]);
  }
  var E = 0;
  var j = 0;
  var B = 0;
  function V(a, r, n) {
    var t = (r + .5) / 4 - .5;
    var o = (n + .5) / 4 - .5;
    var e = Math.floor(t);
    var u = Math.floor(o);
    j = t - e;
    B = o - u;
    if (e < 0) {
      e = 0;
      j = 0;
    }
    else {
      if (e > a.gw - 2) {
        e = a.gw - 2;
        j = 1;
      }
    }
    if (u < 0) {
      u = 0;
      B = 0;
    }
    else {
      if (u > a.gh - 2) {
        u = a.gh - 2;
        B = 1;
      }
    }
    E = u * a.gw + e;
  }
  function z(a, r) {
    var n = a[E];
    var t = a[E + 1];
    var o = a[E + r];
    var e = a[E + r + 1];
    return n + (t - n) * j + (o - n) * B + (n - t - o + e) * j * B;
  }
  function Q(a, r, n, t) {
    var o = (n + .5) / 4 - .5;
    var e = (t + .5) / 4 - .5;
    var u = Math.floor(o);
    var f = Math.floor(e);
    var l = o - u;
    var i = e - f;
    var h = a.gw;
    if (u < 0) {
      u = 0;
      l = 0;
    }
    else {
      if (u > h - 2) {
        u = h - 2;
        l = 1;
      }
    }
    if (f < 0) {
      f = 0;
      i = 0;
    }
    else {
      if (f > a.gh - 2) {
        f = a.gh - 2;
        i = 1;
      }
    }
    var c = f * h + u;
    var v = r[c];
    var d = r[c + 1];
    var s = r[c + h];
    return v + (d - v) * l + (s - v) * i + (v - d - s + r[c + h + 1]) * l * i;
  }
  function X(a) {
    var r = parseInt(a.slice(1), 16);
    return [r >> 16 & 255, r >> 8 & 255, 255 & r];
  }
  function G(a, r, n) {
    return [a[0] + (r[0] - a[0]) * n, a[1] + (r[1] - a[1]) * n, a[2] + (r[2] - a[2]) * n];
  }
  function J(a, r) {
    for (var n = [], t = 0; t < r; t++) {
      for (var o = t / (r - 1), e = 0; e < a.length - 2 && o > a[e + 1][0];)
        e++;
      var u = a[e];
      var l = a[e + 1];
      var i = G(u[1], l[1], f((o - u[0]) / (l[0] - u[0])));
      n.push([Math.round(i[0]), Math.round(i[1]), Math.round(i[2])]);
    }
    return n;
  }
  function Y(a, r, n) {
    var t = X(a.line);
    var o = X(a.d1);
    var e = X(a.base);
    var u = X(a.d2);
    var f = X(a.d3 || a.d2);
    return J([[0, G(t, r, .55)], [.16, t], [.36, o], [.52, e], [.68, u], [.84, f], [1, G(f, n, .42)]], 12);
  }
  var Z = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
  function $(a, r) {
    return (Z[(3 & r) << 2 | 3 & a] + .5) / 16;
  }
  var aa = -.506;
  var ra = -.628;
  var na = .58;
  var ta = null;
  var oa = 0;
  var ea = 0;
  var ua = 0;
  var fa = null;
  var la = null;
  function ia(a, r, n, t) {
    if (la) {
      a[r] = la[0];
      a[r + 1] = la[1];
      a[r + 2] = la[2];
      return void (a[r + 3] = 255);
    }
    var o;
    var e;
    var u;
    var l;
    var i;
    !function (a, r, n, t, o, e) {
      var u = n.length - 1;
      var l = f(t) * u;
      var i = 0 | l;
      if (l - i > $(o, e) && i < u) {
        i++;
      }
      var h = n[i];
      a[r] = h[0];
      a[r + 1] = h[1];
      a[r + 2] = h[2];
      a[r + 3] = 255;
    }(a, r, fa, oa * (o = ea, e = ua, u = 1 - o * o - e * e, l = u > 0 ? Math.sqrt(u) : 0, i = o * aa + e * ra + .608 * l, i <= 0 ? na : na + (1 - na) * i / .608), n, t);
  }
  var ha = { trucCao: [[14, -5, 24, 9, .55], [3, -2, 12, 4, .85]], trucNho: [[9, -3, 15, 6, .5], [2, -1, 9, 3.4, .8]], rock: [[7, -2, 16, 6, .8], [2, -1, 12, 4, .55]], stele: [[9, -2, 12, 4.2, .85]], board: [[10, -2, 22, 5, .75]], tuong: [[12, -3, 22, 8, .72], [3, -1, 15, 5, .85]], lu: [[8, -2, 20, 6, .62], [2, -1, 14, 4, .7]], co: [[10, -2, 11, 4, .5]], daReu: [[10, -3, 36, 9, .55]], npc: [[8, -2, 11, 4, .72]] };
  function ca(a) {
    return a ? "bamboo_tall" === a ? ha.trucCao : "bamboo_small" === a ? ha.trucNho : "rock_big" === a || "cave_rock" === a ? ha.rock : /stele/.test(a) ? ha.stele : "long_uyen_dragon_statue" === a ? ha.tuong : "long_uyen_brazier" === a ? ha.lu : "long_uyen_banner" === a ? ha.co : "long_uyen_moss_rocks" === a ? ha.daReu : null : null;
  }
  function va(a, r) {
    return 14 * R(3e3 + (.45 * a | 0), 100 + (.45 * r | 0)) + 2.4 * R(3100 + (1.4 * a | 0), 900 + (1.4 * r | 0));
  }
  function da(a, r) {
    return a < r - 5 ? r - 5 : a > r + 5 ? r + 5 : a;
  }
  function sa(a, r, n) {
    return da(Q(a, a.sdfN, r, n) + va(r, n), Q(a, a.sdfN0, r, n));
  }
  function ga(a, r, n) {
    var t = Q(a, a.sdfK, r, n);
    var o = Q(a, a.sdfK0, r, n);
    return t < o - 2.5 ? o - 2.5 : t > o + 2.5 ? o + 2.5 : t;
  }
  function Ma(a, r, n) {
    return r < 0 || n < 0 || r >= a.W || n >= a.H ? 1 : a.che[(n >> 5) * a.TW + (r >> 5)];
  }
  function ya(a, r) {
    return (r + 229 * (a >> 9) & v) << 9 | a + 173 * (r >> 9) & v;
  }
  function ba(a, r, n) {
    L(1200 + (2.2 * a | 0), 1200 + (2.2 * r | 0));
    var t = q;
    if ((1023 & t) / 1024 >= n) {
      return !1;
    }
    var o = 3.4 + .9 * (t >> 10 & 3);
    if (D * D + N * N < o * o) {
      fa = t >> 12 & 1 ? ta.soi : ta.da;
      oa = .5 + .03 * (t >> 5 & 7);
      ea = l(D / o, -.85, .85);
      ua = l(N / o, -.85, .85);
      return !0;
    }
    var e = D - 2.4;
    var u = N - 3.2;
    if (e * e + u * u < o * o) {
      oa -= .12;
    }
    return !1;
  }
  function xa(a, r) {
    F(a, r, .94, 1.06, 7, 300, 2300);
  }
  function wa(a, r, n) {
    var t = q;
    if (D * D + N * N < a * a) {
      var o = t >> 6 & 7;
      fa = o < 5 ? ta.soi : o < 7 ? ta.da : ta.dat;
      ea = l(D / a, -.86, .86);
      ua = l(N / a, -.86, .86);
      oa = r + .24 * ((63 & t) / 63 - .5) - .15 * n;
      return 1;
    }
    var e = D - .34 * a;
    var u = N - .46 * a;
    return e * e + u * u < a * a ? 2 : 0;
  }
  function ma(a, r, n) {
    fa = ta.bach;
    ea = 0;
    ua = .35;
    var t = n <= 3 ? 0 : 1;
    var o = a + 7 * t;
    var e = Math.floor(o / 14);
    var f = o - 14 * e;
    var l = .5 - .035 * n + .1 * (u(e, t + 3 * (r >> 5), 81) - .5);
    if (1 === n) {
      l = .24;
    }
    else {
      if (4 === n) {
        l = .26;
      }
    }
    if (f < 1 && 1 !== n && 4 !== n) {
      l -= .14;
    }
    if (n >= 6) {
      l -= .1;
      if (W(3 * a, r + 5) > .1) {
        fa = ta.reu;
        l = .3;
      }
    }
    oa = l;
  }
  var pa = 0;
  var Aa = 0;
  var _a = 0;
  var ka = 0;
  function Ta(a, r) {
    if (!(r <= 0)) {
      var n = r + pa * (1 - r);
      var t = pa * (1 - r);
      Aa = (a[0] * r + Aa * t) / n;
      _a = (a[1] * r + _a * t) / n;
      ka = (a[2] * r + ka * t) / n;
      pa = n;
    }
  }
  function Ia(a, r) {
    if (pa < .02) {
      a[r + 3] = 0;
    }
    else {
      a[r] = Aa;
      a[r + 1] = _a;
      a[r + 2] = ka;
      a[r + 3] = 255 * pa | 0;
    }
  }
  function Ua(a, r, n, t, o) {
    if (ea = 0, ua = .35, 1 === t || 2 === t && u(r, 3, 71) < .55 || 3 === t && u(r, 4, 71) < .18) {
      fa = ta.co;
      return void (oa = .3 - .04 * (t - 1) + .04 * W(3 * r, n));
    }
    var e = (t - 1) / Math.max(1, o - 1);
    fa = ta.dat;
    oa = .44 - .2 * e + .07 * W(3 * r + 9, .5 * n | 0);
    if (u(r >> 1, n >> 1, 72) < .1) {
      fa = ta.da;
      oa = .46 - .1 * e;
    }
    if (t >= o) {
      oa *= .66;
    }
  }
  var Ca = 0;
  var Ra = 0;
  function Wa(a, r, n, t, o) {
    V(a, t, o);
    var e = a.gw;
    var h = (o >> 5) * a.TW + (t >> 5);
    var c = a.loai[h];
    la = null;
    var v = ga(a, t, o);
    if (v < 0) {
      !function (a, r, n, t, o, e) {
        var u;
        for (u = 1; u <= 7; u++)
          if (ga(a, t, o - u) >= 0) {
            if (Ma(a, t, o - u)) {
              break;
            }
            ma(t, o, u);
            return void ia(r, n, t, o);
          }
        if (!a.cong[(o >> 5) * a.TW + (t >> 5)] || !function (a, r, n, t) {
          var o = 31 & t;
          var e = 31 & n;
          return !(o < 16 || (ea = 0, ua = 0, la = null, o < 19 ? (fa = ta.bach, oa = 16 === o ? .86 : 18 === o ? .3 : .56, ia(a, r, n, t), 0) : e % 6 == 2 || e % 6 == 3 || 25 === o || 26 === o ? (fa = ta.sat, oa = e % 6 == 2 || 25 === o ? .72 : .42, ia(a, r, n, t), 0) : (pa = Aa = _a = ka = 0, Ta(ta.C.sau, .8 + .015 * (o - 19)), o < 21 && W(3 * n, t + 11) > -.1 && Ta(ta.C.bot, .45), Ia(a, r), 0)));
        }(r, n, t, o)) {
          if (pa = Aa = _a = ka = 0, Ta(ta.C.ngoc, .12), e < 9) {
            var f = 1 - e / 9;
            Ta(ta.C.nong, .26 * f * f);
          }
          if (ga(a, t - 2, o - 3) >= 0 && !Ma(a, t - 2, o - 3)) {
            Ta(ta.C.bong, .3);
          }
          else {
            if (ga(a, t - 4, o - 6) >= 0 && !Ma(a, t - 4, o - 6)) {
              Ta(ta.C.bong, .17);
            }
          }
          if (ga(a, t, o - 7 - 1) >= 0 && !Ma(a, t, o - 7 - 1)) {
            if (W(2 * t + 5, o + 70) > -.15) {
              Ta(ta.C.bot, .42);
            }
          }
          else {
            if (e < 1.3) {
              Ta(ta.C.bong, .36);
            }
            else {
              if (e < 2.4 && W(2 * t + 9, o + 40) > .12) {
                Ta(ta.C.bot, .26);
              }
            }
          }
          Ia(r, n);
        }
      }(a, r, n, t, o, -v);
    }
    else {
      var d = da(z(a.sdfN, e) + va(t, o), z(a.sdfN0, e));
      if (d < 0) {
        !function (a, r, n, t, o, e) {
          var u;
          var f = z(a.wCau, a.gw);
          var l = -e;
          if (l < 7 && f < .5) {
            for (u = 1; u <= 5; u++)
              if (sa(a, t, o - u) >= 0) {
                if (Ma(a, t, o - u)) {
                  break;
                }
                Ua(0, t, o, u, 5);
                return void ia(r, n, t, o);
              }
          }
          if (l > 16) {
            r[n + 3] = 0;
          }
          else {
            if (pa = Aa = _a = ka = 0, l < 8) {
              var i = 1 - l / 8;
              Ta(ta.C.nong, .3 * i * i);
            }
            if (f < .5) {
              var h = 0;
              if (sa(a, t - 2, o - 3 - 5) >= 0) {
                h = .34;
              }
              else {
                if (sa(a, t - 4, o - 6 - 5) >= 0) {
                  h = .22;
                }
                else {
                  if (sa(a, t - 6, o - 10 - 5) >= 0) {
                    h = .11;
                  }
                }
              }
              Ta(ta.C.bong, h);
            }
            var c = 0;
            if (l < 1.5) {
              c = .66;
            }
            else {
              if ((l < 2.8 && W(2 * t + 9, o + 40) > .15 || sa(a, t, o - 5 - 1) >= 0)) {
                c = .34;
              }
            }
            if (c && W(2 * t + 5, o + 70) > -.12) {
              Ta(ta.C.bot, c);
            }
            Ia(r, n);
          }
        }(a, r, n, t, o, d);
      }
      else {
        if (v < 7 && 0 === a.lv[h]) {
          (function (a, r, n, t) {
            var o = ga(a, r + 2, n) - ga(a, r - 2, n);
            var e = ga(a, r, n + 2) - ga(a, r, n - 2);
            var f = Math.abs(e) >= Math.abs(o);
            var l = f ? r + 7 : n + 3;
            var i = Math.floor(l / 18);
            var h = l - 18 * i;
            var c = u(i, f ? n >> 4 : 999 + (r >> 4), 77);
            fa = ta.bach;
            ea = 0;
            ua = 0;
            var v = .64 + .12 * (c - .5) + .05 * W(2 * r + 5, 2 * n + 9);
            if (t < 1.3) {
              v = .9;
            }
            else {
              if (t < 2.3) {
                v += .07;
              }
              else {
                if (t > 5.8) {
                  v = .28;
                }
                else {
                  if (t > 4.8) {
                    v -= .08;
                  }
                }
              }
            }
            if (h < 1 && t < 5.8) {
              v = .34;
            }
            else {
              if (h < 2 && t < 5.8) {
                v += .05;
              }
            }
            if (u(r >> 1, n >> 1, 78) < .03) {
              v -= .1;
            }
            if (t > 2.4 && t < 5.6 && R(2 * r + 900, 2 * n + 300) > .38 && u(r, n, 79) < .45) {
              fa = ta.reu;
              v = .42;
            }
            oa = v - .3 * z(a.wBep, a.gw);
          })(a, t, o, v);
          if (a.bong) {
            oa -= a.bong[o * a.W + t] / 255 * .25;
          }
          return void ia(r, n, t, o);
        }
        if (7 === c && a.bac) {
          (function (a, r, n) {
            var t = a.bac;
            var o = r - t.x0;
            var e = t.x1 - t.x0;
            var f = n - t.y0;
            var l = t.y1 - t.y0;
            if (ea = 0, ua = 0, f < 7 || f >= l - 7) {
              fa = ta.bach;
              var i = f < 7 ? f : l - 1 - f;
              oa = i < 1 ? .2 : i < 2 ? .72 : i > 5 ? .3 : .52 - o / e * .16;
              return void (o % 21 == 0 && i >= 1 && i <= 5 && (oa = .3));
            }
            var h = f < 11 ? .14 * (1 - (f - 7) / 4) : 0;
            var c = Math.floor(o / 11);
            var v = o - 11 * c;
            fa = ta.da;
            var d = .6 - .055 * c + .08 * (u(c, f >> 3, 91) - .5) + .05 * W(2 * r, 2 * n);
            xa(1.3 * r + 40 * c, n);
            if (P < .8) {
              d -= .1;
            }
            if (0 === v) {
              d = .9 - .04 * c;
            }
            else {
              if (1 === v) {
                d += .08;
              }
              else {
                if (v >= 8) {
                  d -= 10 === v ? .44 : 9 === v ? .3 : .12;
                }
              }
            }
            d += .06 * (1 - 2 * Math.abs(f / l - .5));
            if ((7 * c + (f >> 2)) % 11 == 0 && v > 2 && v < 9) {
              d -= .12;
            }
            if ((f < 10 || f > l - 11) && v > 1 && v < 9 && R(2 * r + 11, 2 * n + 7) > .26) {
              fa = ta.reu;
              d = .38;
            }
            oa = d - h;
          })(a, t, o);
          if (a.bong) {
            oa -= a.bong[o * a.W + t] / 255 * .25;
          }
          return void ia(r, n, t, o);
        }
        var s = 99;
        if ((9 === c || 5 === c || 4 === c || 0 === c || 3 === c) && (s = function (a, r, n) {
          return Q(a, a.sdfThem, r, n) + 3 * R(3900 + (1.7 * r | 0), 510 + (1.7 * n | 0)) + 1.2 * W(r + 13, n + 29);
        }(a, t, o), s < 0 && s > -10)) {
          V(a, t, o);
          (function (a, r, n, t) {
            ea = 0;
            ua = 0;
            var o = x[ya(r + 3, n + 17)];
            if (t > 7.8 + 1.5 * W(2 * r + 1, n + 9)) {
              fa = ta.co;
              return void (oa = .46 + (o > 0 ? .06 * o : 0) - (t > 9 ? 0 : .06));
            }
            F(r, n, 1.45, 1.6, 5, 6100, 1300);
            var e = 5.6 + .8 * (q >> 9 & 3);
            if (D * D + N * N < e * e && (255 & q) < 225) {
              fa = ta.soi;
              oa = .5 + .2 * ((63 & q) / 63 - .5) + (t < 2.5 ? .08 : 0);
              ea = l(D / e * 1.1, -.86, .86);
              ua = l(N / e * 1.1, -.86, .86);
              if (!(q >> 6 & 7)) {
                fa = ta.reu;
                oa = .44;
                ea *= .5;
                ua *= .5;
              }
            }
            else {
              if (o > 0 && t > 2.5) {
                fa = ta.co;
                oa = .34 + .06 * o;
              }
              else {
                fa = R(2 * r + 70, 2 * n + 910) > .2 ? ta.reu : ta.dat;
                oa = .16 + .06 * W(3 * r, 3 * n + 5);
              }
            }
          })(0, t, o, -s);
          if (a.bong) {
            oa -= a.bong[o * a.W + t] / 255 * .3;
          }
          return void ia(r, n, t, o);
        }
        if ((1 !== a.lv[h] || 9 === c && s >= 0) && 3 !== c && 0 !== c && 2 !== c)
          if (6 === c) {
            !function (a, r, n, t) {
              var o;
              if (fa = ta.bach, ea = 0, ua = 0, t < 18) {
                var e = t - 7;
                var f = Math.abs(Q(a, a.sdfDao, r + 3, n) - Q(a, a.sdfDao, r - 3, n)) > Math.abs(Q(a, a.sdfDao, r, n + 3) - Q(a, a.sdfDao, r, n - 3));
                var l = f ? n : r;
                var i = Math.floor((l + 5) / 32);
                var h = l + 5 - 32 * i;
                o = .4 + .08 * (u(i, f ? 1 : 2, 301) - .5) + .04 * W(2 * r + 1, 2 * n + 3);
                if (e < 1) {
                  o = .24;
                }
                else {
                  if (e > 2.5 && e < 3.5) {
                    o = .26;
                  }
                  else {
                    if (e >= 3.5 && e < 4.5) {
                      o += .1;
                    }
                    else {
                      if (e > 8.5 && e < 9.5) {
                        o = .3;
                      }
                      else {
                        if (e >= 9.5) {
                          o += .14;
                        }
                      }
                    }
                  }
                }
                if (h < 1 && e > 1) {
                  o = .26;
                }
              }
              else {
                var c = Math.floor(n / 16);
                var v = 8 * (1 & c);
                var d = Math.floor((r + v) / 16);
                var s = r + v - 16 * d;
                var g = n - 16 * c;
                var M = u(d, c, 311);
                o = .6 + .14 * (M - .5) + .04 * W(2 * r + 3, 2 * n + 7) + .05 * R(r + 70, n + 30);
                if (0 === s || 0 === g) {
                  o = .3;
                }
                else {
                  if (1 === s || 1 === g) {
                    o += .08;
                  }
                  else {
                    if (!(15 !== s && 15 !== g)) {
                      o -= .06;
                    }
                  }
                }
                if (M < .08 && s > 3 && s < 13 && Math.abs(g - (.6 * s + 2)) < .6) {
                  o = .32;
                }
                if (u(r >> 1, n >> 1, 312) < .01) {
                  o -= .08;
                }
              }
              if (a.tam) {
                var y = (r + .5 - a.tam.x) / 150;
                var b = (n + .5 - a.tam.y) / 124;
                var x = 137 * (Math.sqrt(y * y + b * b) - 1);
                if (Math.abs(x) < 1) {
                  o = .26;
                }
                else if (x >= 1 && x < 2) {
                  o += .12;
                }
                else if (Math.abs(x + 5) < .7) {
                  o = .3;
                }
                else if (x > 2 && x < 44) {
                  var w = r + .5 - a.tam.x;
                  var m = 1.21 * (n + .5 - a.tam.y);
                  if (Math.abs(Math.abs(w) - Math.abs(m)) < 1.1) {
                    o = .3;
                  }
                }
              }
              oa = o;
            }(a, t, o, -z(a.sdfDao, e));
          }
          else {
            var g = z(a.sdfL, e);
            if (g < 14 && function (a, r, n) {
              xa(r, n);
              var t = r - D / .94;
              var o = n - N / 1.06;
              return Q(a, a.sdfL, t, o) + .55 * (q >> 4 & 15) - 5 < 0;
            }(a, t, o) ? (V(a, t, o), function (a, r, n, t) {
              xa(r, n);
              var o = P;
              var e = q;
              var f = D;
              var l = N;
              var h = z(a.wBep, a.gw);
              if (ea = 0, ua = 0, o < .75) {
                if (R(400 + (1.2 * r | 0), 80 + (1.2 * n | 0)) + .3 * i(10, 2, t) > .14 && h < .2) {
                  fa = ta.reu;
                  oa = .34 + .05 * W(3 * r, 3 * n);
                }
                else {
                  fa = ta.da;
                  oa = .18;
                }
                return void (oa *= 1 - .5 * h);
              }
              fa = ta.da;
              var c = .62 + .16 * ((255 & e) / 255 - .5) + .035 * W(2 * r + 5, 2 * n + 9);
              if (t < 4 && (c -= .06 * (1 - t / 4)), o < 3.2) {
                var v = Math.sqrt(f * f + l * l) + .001;
                var d = .72 * (1 - o / 3.2);
                ea = f / v * d;
                ua = l / v * d;
              }
              if (!(e >> 8 & 7) && o > 2) {
                var s = .37 * (e >> 3);
                var g = Math.cos(s);
                var M = Math.sin(s);
                if (Math.abs(f * g + l * M) < .75 && Math.abs(l * g - f * M) < 6) {
                  c = .28;
                }
              }
              var y = R(50 + (2 * r | 0), 80 + (2 * n | 0)) + .2 * W(2 * r, 2 * n + 40);
              if (o < 2.2 && y > .34 && h < .2) {
                fa = ta.reu;
                c = .36 + .06 * W(3 * r + 1, 3 * n);
                ea = 0;
                ua = 0;
              }
              else {
                if (u(r, n, 97) < .02) {
                  c -= .1;
                }
                else {
                  if (u(r >> 1, n >> 1, 98) < .012) {
                    c += .12;
                  }
                }
              }
              oa = c -= .45 * h;
            }(a, t, o, Math.max(0, -g))) : (V(a, t, o), function (a, r, n, t) {
              var o = a.gw;
              var e = i(18, 2, z(a.sdfNui, o));
              ea = 0;
              ua = 0;
              var f = R(5100 + (.55 * r | 0), 1300 + (.55 * n | 0)) + .35 * R(r + 900, n + 5100) + .3 * i(26, 8, t);
              if (f < -.16) {
                var l = i(-.16, -.36, f);
                if (F(r, n, 1.3, 1.4, 6, 3300, 300), (255 & q) < 120 * l + 40) {
                  var h = wa(6 + .8 * (q >> 9 & 3), .56, 0);
                  if (1 === h) {
                    return;
                  }
                  if (2 === h) {
                    fa = ta.soi;
                    return void (oa = .3);
                  }
                }
                if (F(r, n, 2.6, 2.7, 6, 5100, 2100), (255 & q) < 160 * l + 30) {
                  var c = wa(4.6 + .6 * (q >> 9 & 3), .52, 0);
                  if (1 === c) {
                    return;
                  }
                  if (2 === c) {
                    fa = ta.soi;
                    return void (oa = .32);
                  }
                }
                fa = ta.soi;
                return void (oa = .42 + .06 * W(2 * r + 3, 2 * n + 1) + (u(r, n, 97) < .12 ? -.08 : 0));
              }
              F(r, n, .52, .6, 10, 7300, 900);
              var v = P;
              var d = q;
              if (v < .9) {
                fa = e > .2 || R(2 * r + 30, 2 * n + 700) > .2 ? ta.reu : ta.da;
                return void (oa = fa === ta.reu ? .3 + .05 * W(3 * r, 3 * n) : .2);
              }
              var s = .06 * ((d >> 2 & 7) - 3.5);
              var g = .06 * ((d >> 5 & 7) - 3.5);
              fa = ta.da;
              var M = .5 + .14 * ((255 & d) / 255 - .5) + .1 * R(2 * r + 600, 2 * n + 60) + .04 * W(2 * r, 2 * n);
              if (ea = s, ua = g, v < 2.4) {
                var y = Math.sqrt(D * D + N * N) + .001;
                var b = .6 * (1 - v / 2.4);
                ea += D / y * b * .55;
                ua += N / y * b * .55;
              }
              if (W(40 + (.6 * r + .9 * n | 0), (.3 * n | 0) + (63 & d)) > .34 && (M -= .06), u(r, n, 199) < .025 ? M -= .1 : u(r >> 1, n >> 1, 198) < .01 && (M += .1), oa = M, e > .05 && R(2200 + (1.3 * r | 0), 90 + (1.3 * n | 0)) + .5 * e > .42) {
                var w = x[ya(r + 41, n + 77)];
                fa = w > 0 ? ta.co : ta.reu;
                oa = w > 0 ? .38 + .07 * w : .34 + .06 * W(3 * r, 3 * n + 9);
                ea = 0;
                return void (ua = 0);
              }
              if (t > 3) {
                ba(r, n, .035);
              }
            }(a, t, o, g)), s >= 0 && s < 16)
              if (function (a, r, n) {
                var t = Q(a, a.sdfThem, r + 3, n) - Q(a, a.sdfThem, r - 3, n);
                var o = Q(a, a.sdfThem, r, n + 3) - Q(a, a.sdfThem, r, n - 3);
                var e = Math.sqrt(t * t + o * o) + .001;
                Ca = t / e;
                Ra = o / e;
              }(a, t, o), Ra > .42 && s < 10) {
                !function (a, r, n) {
                  fa = ta.da;
                  ea = 0;
                  ua = .4;
                  F(a, 1.6 * r, 1.1, 1, 4, 7700, 2900);
                  var t = .46 - .018 * n + .14 * ((63 & q) / 63 - .5);
                  if (P < .9) {
                    t = .2;
                  }
                  else {
                    if (P < 1.8 && N < 0) {
                      t += .08;
                    }
                  }
                  if (n < 1) {
                    t = .72;
                  }
                  else {
                    if (n < 2) {
                      t = .3;
                    }
                  }
                  if (n > 7 && W(2 * a + 5, r) > .05) {
                    fa = ta.reu;
                    t = .3;
                  }
                  oa = t;
                }(t, o, s);
              }
              else if (Ca > .4 && s < 5 - 2 * Ra) {
                fa = ta.da;
                ea = .3;
                ua = 0;
                oa = .3 - .025 * s + .12 * (W(t + 3, .34 * o | 0) - .5);
                if (u(t, o >> 2, 887) < .1) {
                  oa -= .08;
                }
              }
              else {
                var M = 1 - s / 16;
                if (oa -= .4 * M * M * (.55 + .45 * f(Ca)), s < 7) {
                  F(t, o, 2.4, 2.5, 4, 8100, 3100);
                  var y = 3.2 + .6 * (q >> 9 & 3);
                  if ((255 & q) < 70 && D * D + N * N < y * y) {
                    fa = ta.da;
                    oa = .44 + .16 * ((31 & q) / 31 - .5);
                    ea = l(D / y, -.8, .8);
                    ua = l(N / y, -.8, .8);
                  }
                }
              }
          }
        else {
          var b = i(4, 28, d);
          V(a, t + (14 * R(t + 4100, o + 700) + 9 * R(2 * t + 900, 2 * o + 4700)) * b, o + (14 * R(t + 700, o + 4100) + 9 * R(2 * t + 4700, 2 * o + 900)) * b);
          var A = z(a.sdfU, e);
          var _ = A < 16 ? A + function (a, r) {
            return 6 * R(1500 + (.9 * a | 0), 60 + (.9 * r | 0)) + 2.4 * R(1700 + (2 * a | 0), 260 + (2 * r | 0)) + 2.6 * W(40 + (2.4 * a | 0), 17 + (.8 * r | 0));
          }(t, o) : A;
          V(a, t, o);
          if (_ < 0) {
            (function (a, r, n, t) {
              var o = .48 + .24 * (R(2e3 + (.7 * r | 0), 700 + (.7 * n | 0)) + .08) + .08 * R(2 * r + 60, 2 * n + 3100) + .04 * W(2 * r + 11, 2 * n + 5);
              o += .09 * i(4, 20, t);
              if (t < 6) {
                o -= .05 * (1 - t / 6);
              }
              if (t < 2.6) {
                o -= .12 * (1 - t / 2.6);
              }
              var e = u(r, n, 91);
              if (e < .03 ? o -= .1 : e > .975 && (o += .1), fa = ta.dat, oa = o, ea = 0, ua = 0, W(r + 700, 2 * n + 300) < -.42 && (oa -= .05), !(t > 1.5 && ba(r, n, .05))) {
                var f = p[ya(r + 171, n + 313)];
                if (f && (f >> 3) / 32 < .06 + .3 * z(a.wRung, a.gw) + .12 * i(8, 0, t)) {
                  var l = 7 & f;
                  if (4 !== l) {
                    fa = ta.la;
                    oa = 3 === l ? .68 : 2 === l ? .56 : .4;
                    ea = 0;
                    return void (ua = 0);
                  }
                  oa -= .08;
                }
                var h = x[ya(r + 211, n + 97)];
                if (h > 0 && u(r >> 3, n >> 3, 93) < .05 + .35 * i(6, 0, t)) {
                  fa = ta.co;
                  oa = .42 + .07 * h;
                  ea = 0;
                  ua = 0;
                }
              }
            })(a, t, o, -_);
          }
          else {
            (function (a, r, n, t, o) {
              var e = a.gw;
              var f = z(a.wRung, e);
              var h = z(a.wCao, e);
              var c = z(a.wHoa, e);
              var v = .56 + .3 * (R(1e3 + (r >> 1), 200 + (n >> 1)) + .08) + .13 * R(r + 300, n + 50);
              var d = 1.25 * n | 0;
              ea = l(1.9 * (W(r + 65, d) - W(r + 63, d)), -.3, .3);
              ua = l(1.9 * (W(r + 64, d + 1) - W(r + 64, d - 1)), -.3, .3);
              var s = ya(r, n);
              var g = x[s];
              if (h > .15) {
                var M = w[ya(r + 97, n + 211)];
                if (0 !== M && u(r >> 3, n >> 3, 41) < 1.2 * h && (M > g || 0 === g)) {
                  g = M;
                }
                v -= .07 * h;
              }
              var y = 1 - .5 * f;
              if (g > 0) {
                v += (1 === g ? .07 : 2 === g ? .14 : .22) * y;
              }
              else {
                if (g < 0) {
                  v -= .12 * y;
                }
              }
              var b = u(r, n, 5);
              if (b < .02) {
                v -= .1;
              }
              else {
                if (b > .988) {
                  v += .08;
                }
              }
              v -= .22 * f;
              if (o < 7) {
                v -= .05 * (1 - o / 7);
              }
              if (t < 1.2) {
                v += .07;
              }
              var A = R(3300 + (1.6 * r | 0), 700 + (1.6 * n | 0)) + .18 * W(r + 50, n + 90);
              if (f > .15 && f < .9 && A > .3) {
                v += .13 * i(.3, .42, A);
              }
              fa = ta.co;
              oa = v;
              if (f > .55 && R(800 + (1.2 * r | 0), 1900 + (1.2 * n | 0)) > .16) {
                fa = ta.reu;
                oa = v + .04;
              }
              var _ = p[ya(r + 71, n + 13)];
              if (_ && (_ >> 3) / 32 < .05 + .62 * f - .1 * h) {
                var k = 7 & _;
                if (4 !== k) {
                  fa = ta.la;
                  oa = 3 === k ? .66 : 2 === k ? .52 : .34;
                  oa -= .08 * f;
                  ea = 0;
                  return void (ua = 0);
                }
                oa -= .12;
              }
              if (f > .6 && u(r >> 1, n >> 1, 23) < .03 * (f - .6)) {
                fa = ta.dat;
                oa = .5 + .16 * u(r >> 1, n >> 1, 24);
                ea = 0;
                return void (ua = -.2);
              }
              var T = m[ya(r + 31, n + 57)];
              if (T && t > 1.5 && o > 3 && (T >> 4) / 16 < .014 + .8 * c - .6 * f - .2 * h) {
                var I = 3 & T;
                if (1 === I) {
                  la = ta.C.hoa[T >> 2 & 3];
                }
                else {
                  if (2 === I) {
                    la = ta.C.nhuy;
                  }
                  else {
                    oa -= .12;
                  }
                }
              }
            })(a, t, o, _, d);
          }
          if (d < 4.6) {
            (function (a, r, n, t) {
              if (!la) {
                var o = a.gw;
                if (!(z(a.wCau, o) > .3)) {
                  var e = sa(a, r + 2, n) - sa(a, r - 2, n);
                  var u = sa(a, r, n + 2) - sa(a, r, n - 2);
                  var f = Math.sqrt(e * e + u * u) + .001;
                  var l = -e / f;
                  var i = -u / f;
                  var h = l * aa + i * ra;
                  var c = i > .5 ? .9 : 1.3 + 1.9 * Math.abs(l) + 1.4 * W(3 * r + 7, 3 * n);
                  if (t < c) {
                    ea = 0;
                    ua = 0;
                    var v = x[ya(r + 5, n + 9)];
                    return i <= .5 && v > 0 && t > .4 * c ? (fa = ta.co, void (oa = .32 + .05 * v)) : (fa = ta.dat, oa = i > .5 ? .2 : .22 + t / c * .12 + .05 * W(2 * r, 2 * n + 11), void (h > .2 && t < 1 && (oa += .1)));
                  }
                  if (t < 1.2) {
                    oa += h > .2 ? .14 : i > .4 ? -.1 : -.07;
                  }
                  else {
                    if (t < 2.4 && h > .35) {
                      oa += .05;
                    }
                  }
                }
              }
            })(a, t, o, d);
          }
        }
        if (!la && a.bong) {
          oa -= a.bong[o * a.W + t] / 255 * .3;
        }
        ia(r, n, t, o);
      }
    }
  }
  function Pa(a, r, o) {
    if (a.xong[r]) {
      return !0;
    }
    var e = r % a.nx * t;
    var u = (r / a.nx | 0) * t;
    var f = Math.min(t, a.W - e);
    var l = Math.min(t, a.H - u);
    if (!(a.anh[r])) {
      a.anh[r] = a.ctx.createImageData(f, l);
      a.dong[r] = 0;
    }
    for (var i = a.anh[r].data, c = (ta = a.R).da[5], v = a.TW, d = a.che, s = a.dong[r]; s < l; s++) {
      if (o && s > a.dong[r] && h() > o) {
        a.dong[r] = s;
        return !1;
      }
      for (var g = u + s, M = s * f * 4, y = (g >> 5) * v, b = 0; b < f; b++, M += 4)
        d[y + (e + b >> 5)] ? (i[M] = c[0], i[M + 1] = c[1], i[M + 2] = c[2], i[M + 3] = 255) : Wa(a, i, M, e + b, g);
    }
    a.ctx.putImageData(a.anh[r], e, u);
    for (var x = 0; x < l >> 5; x++)
      for (var w = 0; w < f >> 5; w++) {
        for (var m = 0, p = 0; p < n && !m; p++)
          for (var A = 4 * ((x * n + p) * f + w * n) + 3, _ = 0; _ < n; _++)
            if (255 !== i[A + 4 * _]) {
              m = 1;
              break;
            }
        if (m) {
          a.loNuoc[((u >> 5) + x) * a.TW + (e >> 5) + w] = 1;
        }
      }
    a.anh[r] = null;
    a.xong[r] = 1;
    return !0;
  }
  function Da(a, r) {
    for (; !Pa(a, r, 0);)
      ;
  }
  var Na = { data: null, pal: null, layer: null, loi: !1 };
  function qa(r, o, f) {
    var l = h();
    var R = r.width;
    var W = r.height;
    var P = R * n;
    var D = W * n;
    var N = { data: r, TW: R, TH: W, W: P, H: D, gw: P / 4, gh: D / 4 };
    var q = a.Utils.canvas(P, D);
    N.canvas = q.canvas;
    N.ctx = q.ctx;
    N.R = function () {
      var r = a.Palette && a.Palette.WORLD;
      var n = r.thatch || r.dirt;
      var t = r.stone;
      var o = { co: Y(r.grass, [10, 34, 40], [230, 240, 170]), dat: Y(r.dirt, [38, 28, 30], [248, 230, 186]), da: Y(t, [28, 30, 40], [242, 240, 228]), soi: Y(r.pebble, [40, 36, 40], [252, 246, 228]), la: Y(n, [44, 34, 22], [250, 238, 190]), reu: Y({ line: r.grass.line, d1: r.grass.line, base: r.grass.d1, d2: r.grass.base, d3: r.grass.d2 }, [6, 26, 26], [190, 222, 150]), bach: J([[0, G(X(t.line), [20, 26, 40], .5)], [.18, X(t.line)], [.38, X(t.d1)], [.56, X(t.d2)], [.74, X(t.d3 || t.d2)], [.88, G(X(t.d3 || t.d2), [236, 240, 244], .45)], [1, [250, 250, 246]]], 12), sat: J([[0, [14, 16, 20]], [.4, [44, 48, 56]], [.75, [92, 98, 106]], [1, [168, 174, 180]]], 8) };
      var e = r.water;
      o.C = { nong: X(e.d3), bot: G(X(e.d3), [255, 255, 255], .55), bong: G(X(e.line), [4, 10, 16], .55), ngoc: G(X(e.d2), [70, 190, 170], .5), sau: G(X(e.line), [6, 30, 40], .4), hoa: (r.flower || ["#e8dfa0", "#e5b7c9", "#d8dce8", "#e2a86a"]).map(X), nhuy: [240, 204, 92] };
      return o;
    }();
    N.nx = Math.ceil(P / t);
    N.ny = Math.ceil(D / t);
    N.so = N.nx * N.ny;
    N.xong = new Uint8Array(N.so);
    N.anh = [];
    N.dong = [];
    N.loNuoc = new Uint8Array(R * W);
    var L = r.spawn || { tx: R / 2, ty: W / 2 };
    var F = null == o ? (L.tx + .5) * n : o;
    var H = null == f ? (L.ty + .5) * n : f;
    N.thuTu = [];
    for (var E = 0; E < N.so; E++)
      N.thuTu.push(E);
    function j(a) {
      var r = (a % N.nx + .5) * t - F;
      var n = (.5 + (a / N.nx | 0)) * t - H;
      return r * r + n * n;
    }
    N.thuTu.sort(function (a, r) {
      return j(a) - j(r);
    });
    N.viec = [function (a) {
        return function (a) {
          if (p && !C) {
            return !0;
          }
          if (!d && (d = A([[128, .5], [64, .3], [32, .2]], 13), a && h() > a)) {
            return !1;
          }
          if (!s && (s = A([[16, .5], [8, .3], [4, .2]], 19), a && h() > a)) {
            return !1;
          }
          if (!b || C) {
            for (C || (C = function () {
              for (var a = new Float32Array(1024), r = new Float32Array(1024), n = 0; n < 32; n++)
                for (var t = 0; t < 32; t++)
                  a[32 * n + t] = 16 * (t + .14 + .72 * u(t, n, 611)), r[32 * n + t] = 16 * (n + .14 + .72 * u(t, n, 612));
              g = new Uint8Array(c * c);
              M = new Int8Array(c * c);
              y = new Int8Array(c * c);
              b = new Uint16Array(c * c);
              return { hx: a, hy: r, y: 0 };
            }()); C.y < c;) {
              var r = Math.min(c, C.y + 16);
              if (_(C, C.y, r), C.y = r, a && C.y < c && h() > a) {
                return !1;
              }
            }
            C = null;
          }
          I(x = new Int8Array(c * c), k, 8, 4, .66, 521);
          I(w = new Int8Array(c * c), T, 4, 4, .8, 523);
          (function (a) {
            for (var r = 0; r < 64; r++)
              for (var n = 0; n < 64; n++)
                for (var t = e(n, r, 733), o = 8 * n + 1 + (t >>> 4) % 6, u = 8 * r + 1 + (t >>> 8) % 6, f = U[(t >>> 12) % U.length], l = t >>> 16 & 3, i = t >>> 18 & 15, h = 0; h < f.length; h++) {
                  var c = (u + f[h][1] & v) << 9 | o + f[h][0] & v;
                  if (!(3 === f[h][2] && a[c])) {
                    a[c] = f[h][2] | l << 2 | i << 4;
                  }
                }
          })(m = new Uint8Array(c * c));
          (function (a) {
            for (var r = 0; r < 64; r++)
              for (var n = 0; n < 64; n++)
                for (var t = e(n, r, 1733), o = e(n, r, 1737), u = 8 * n + t % 8, f = 8 * r + (t >>> 3) % 8, l = (t >>> 6 & 255) / 255 * Math.PI, i = 4 + (t >>> 14 & 3) + (1 & o ? 2 : 0), h = t >>> 17 & 31, c = Math.cos(l), d = Math.sin(l), s = 0; s <= i; s++) {
                  var g = Math.round(u + c * s);
                  var M = Math.round(f + d * s);
                  var y = 0 === s || s === i ? 1 : s === i >> 1 ? 3 : 2;
                  var b = (M & v) << 9 | g & v;
                  if (((7 & a[b]) < y || 4 == (7 & a[b]))) {
                    a[b] = y | h << 3;
                  }
                  var x = (M + 1 & v) << 9 | g + 1 & v;
                  if (!(a[x])) {
                    a[x] = 4 | h << 3;
                  }
                }
          })(p = new Uint8Array(c * c));
          return !0;
        }(a);
      }, function () {
        !function (a) {
          var r;
          var t;
          var o;
          var e;
          var u = a.data;
          var f = a.TW;
          var l = a.TH;
          var h = u.legend || {};
          var c = a.gw;
          var v = a.gh;
          var d = c * v;
          var s = a.loai = new Uint8Array(f * l);
          var g = a.lv = new Uint8Array(f * l);
          var M = new Uint8Array(f * l);
          var y = new Uint8Array(f * l);
          var b = new Uint8Array(f * l);
          var x = new Float32Array(f * l);
          var w = u.terrace;
          var m = w ? (w.mountain || "") + (w.water || "") : "";
          var p = a.che = new Uint8Array(f * l);
          for (t = 0; t < l; t++) {
            var A = u.ground[t] || "";
            var _ = u.tang && u.tang[t] || "";
            for (r = 0; r < f; r++) {
              o = t * f + r;
              var k = A.charAt(r);
              if (m && m.indexOf(k) >= 0) {
                p[o] = 1;
              }
              var T = h[k] || {};
              var I = T.ground || "";
              var U = T.obj || "";
              var C = _.charAt(r);
              switch ((g[o] = C ? +C : /^grass/.test(I) ? 1 : 0, I)) {
                case "water":
                  s[o] = 1;
                  break;
                case "bridge":
                  s[o] = 2;
                  break;
                case "bac_da_nui":
                  s[o] = 7;
                  break;
                case "dirt":
                  s[o] = 0 === g[o] ? 4 : 3;
                  break;
                case "dirt_pebble":
                  s[o] = 4;
                  break;
                case "pebble":
                  s[o] = 5;
                  break;
                case "cliff":
                case "cliff2":
                case "cliff_base":
                  s[o] = T.flyDrop && !p[o] ? 9 : 8;
                  break;
                case "thac_nui":
                  s[o] = 8;
                  M[o] = 1;
                  break;
                default: s[o] = 0;
              }
              y[o] = "grass_flower" === I ? 1 : 0;
              b[o] = "grass_tall" === I ? 1 : 0;
              x[o] = /bamboo_tall/.test(U) ? 1 : /bamboo_small/.test(U) ? .75 : 0;
            }
          }
          function R(a, r) {
            return a < 0 || r < 0 || a >= f || r >= l ? 8 : s[r * f + a];
          }
          var W = null;
          for (t = 0; t < l; t++)
            for (r = 0; r < f; r++)
              7 === s[o = t * f + r] && (7 === R(r - 1, t) || 7 === R(r + 1, t) || 7 === R(r, t - 1) || 7 === R(r, t + 1) ? (W || (W = { x0: r, y0: t, x1: r, y1: t }), W.x0 = Math.min(W.x0, r), W.x1 = Math.max(W.x1, r), W.y0 = Math.min(W.y0, t), W.y1 = Math.max(W.y1, t)) : s[o] = 3);
          a.bac = W ? { x0: W.x0 * n, y0: W.y0 * n, x1: (W.x1 + 1) * n, y1: (W.y1 + 1) * n } : null;
          var P = (u.enemies || []).filter(function (a) {
            return "than_thu_xich_long" === a.type;
          })[0];
          if (P && 5 === s[P.ty * f + P.tx]) {
            var D = [[P.tx, P.ty]];
            for (s[P.ty * f + P.tx] = 6; D.length;) {
              var N = D.pop();
              [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(function (a) {
                var r = N[0] + a[0];
                var n = N[1] + a[1];
                if (5 === R(r, n)) {
                  s[n * f + r] = 6;
                  D.push([r, n]);
                }
              });
            }
          }
          a.tam = null;
          (u.decorations || []).forEach(function (r) {
            if ("long_uyen_dragon_relief" === r.name) {
              a.tam = { x: r.tx * n + 16, y: (r.ty + 1) * n - 119 };
            }
          });
          var q = new Int16Array(f * l).fill(-1);
          var L = [];
          function F(a) {
            return 1 === s[a] || 2 === s[a] || M[a];
          }
          for (o = 0; o < f * l; o++)
            if (F(o) && !(q[o] >= 0)) {
              var H = L.length;
              var E = [o];
              var j = !1;
              for (q[o] = H; E.length;) {
                var B = E.pop();
                var V = B % f;
                var z = B / f | 0;
                for (1 === s[B] && 0 === g[B] && (j = !0), e = 0; e < 4; e++) {
                  var Q = V + (0 === e ? 1 : 1 === e ? -1 : 0);
                  var X = z + (2 === e ? 1 : 3 === e ? -1 : 0);
                  if (!(Q < 0 || X < 0 || Q >= f || X >= l)) {
                    var G = X * f + Q;
                    if (!(q[G] >= 0 || !F(G))) {
                      q[G] = H;
                      E.push(G);
                    }
                  }
                }
              }
              L.push(j);
            }
          var J = a.hoKe = new Uint8Array(f * l);
          var Y = new Uint8Array(f * l);
          for (o = 0; o < f * l; o++)
            q[o] < 0 || (L[q[o]] ? 1 === s[o] && (J[o] = 1) : (1 === s[o] || 2 === s[o] || M[o]) && (Y[o] = 1));
          var Z = a.cong = new Uint8Array(f * l);
          for (t = 0; t < l - 1; t++)
            for (r = 0; r < f; r++)
              J[o = t * f + r] && 8 === s[o + f] && !M[o + f] && (Z[o] = 1);
          function $(a) {
            for (var r = new Uint8Array(d), n = 0; n < v; n++)
              for (var t = (4 * n + 2 >> 5) * f, o = 0; o < c; o++)
                r[n * c + o] = a(t + (4 * o + 2 >> 5)) ? 1 : 0;
            return r;
          }
          function aa(a) {
            for (var r = new Float32Array(d), n = 0; n < v; n++)
              for (var t = (4 * n + 2 >> 5) * f, o = 0; o < c; o++)
                r[n * c + o] = a[t + (4 * o + 2 >> 5)];
            return r;
          }
          var ra = $(function (a) {
            return J[a];
          });
          a.sdfK = O(ra, c, v, [1]);
          a.sdfK0 = O(ra, c, v, []);
          var na = $(function (a) {
            return Y[a];
          });
          a.sdfN = O(na, c, v, [2, 2, 2]);
          a.sdfN0 = O(na, c, v, []);
          a.sdfU = O($(function (a) {
            return 3 === s[a] || 7 === s[a];
          }), c, v, [2, 2, 2]);
          a.sdfL = O($(function (a) {
            return 4 === s[a];
          }), c, v, [1, 1]);
          a.sdfDao = O($(function (a) {
            return 6 === s[a];
          }), c, v, []);
          a.sdfNui = O($(function (a) {
            return 8 === s[a];
          }), c, v, [2]);
          a.sdfThem = O($(function (a) {
            return 1 === g[a] && 7 !== s[a];
          }), c, v, [2, 2]);
          a.wHoa = K(aa(y), c, v, [2, 2]);
          a.wCao = K(aa(b), c, v, [2, 1]);
          a.wRung = K(aa(x), c, v, [3, 3, 2]);
          a.wCau = K(aa(function () {
            for (var a = new Float32Array(f * l), r = 0; r < a.length; r++)
              a[r] = 2 === s[r] ? 1 : 0;
            return a;
          }()), c, v, [2, 2]);
          var ta = a.wBep = new Float32Array(d);
          (u.decorations || []).forEach(function (a) {
            if ("long_uyen_brazier" === a.name) {
              for (var r = a.tx * n + 16, t = (a.ty + 1) * n - 4, o = Math.max(0, Math.floor((r - 30) / 4)), e = Math.min(c - 1, Math.ceil((r + 30) / 4)), u = Math.max(0, Math.floor((t - 30) / 4)), f = Math.min(v - 1, Math.ceil((t + 30) / 4)), l = u; l <= f; l++)
                for (var i = o; i <= e; i++) {
                  var h = 4 * i + 2 - r;
                  var d = 1.4 * (4 * l + 2 - t);
                  var s = Math.sqrt(h * h + d * d) / 30;
                  if (s < 1) {
                    ta[l * c + i] = Math.max(ta[l * c + i], (1 - s) * (1 - s));
                  }
                }
            }
          });
          a.wBep = S(ta, c, v, 1);
          (function (a) {
            var r = a.W;
            var t = a.H;
            var o = a.data;
            var e = o.legend || {};
            var u = a.TW;
            var f = a.bong = new Uint8Array(r * t);
            function l(a, n, o, e, u) {
              for (var l = Math.max(0, Math.floor(a - o - 1)), h = Math.min(r - 1, Math.ceil(a + o + 1)), c = Math.max(0, Math.floor(n - e - 1)), v = Math.min(t - 1, Math.ceil(n + e + 1)), d = c; d <= v; d++)
                for (var s = l; s <= h; s++) {
                  var g = (s + .5 - a) / o;
                  var M = (d + .5 - n) / e;
                  var y = g * g + M * M;
                  if (!(y >= 1)) {
                    var b = Math.round(255 * u * (1 - i(.35, 1, y)));
                    var x = d * r + s;
                    if (b > f[x]) {
                      f[x] = b;
                    }
                  }
                }
            }
            function h(a, r, n) {
              if (a) {
                for (var t = 0; t < a.length; t++)
                  l(r + a[t][0], n + a[t][1], a[t][2], a[t][3], a[t][4]);
              }
            }
            for (var c = 0; c < a.TH; c++)
              for (var v = o.ground[c] || "", d = 0; d < u; d++) {
                var s = e[v.charAt(d)] || {};
                if (s.obj && "water" !== s.ground) {
                  h(ca(s.obj), d * n + 16, (c + 1) * n);
                }
              }
            (o.decorations || []).forEach(function (a) {
              h(ca(a.name), a.tx * n + 16, (a.ty + 1) * n);
            });
            (o.props || []).forEach(function (a) {
              if ("npc" === a.type) {
                h(ha.npc, a.tx * n + 16, (a.ty + 1) * n);
              }
            });
            (o.bossBoards || []).forEach(function (a) {
              h(ha.board, a.tx * n + 16, (a.ty + 1) * n);
            });
          })(a);
        }(N);
      }];
    N.msKhung = h() - l;
    return N;
  }
  function La(a, r) {
    for (; a.viec.length;)
      if (!1 !== a.viec[0](r) && a.viec.shift(), r && h() > r) {
        return !a.viec.length;
      }
    return !0;
  }
  function Fa(a, r) {
    for (var n = 0; n < a.thuTu.length; n++) {
      var t = a.thuTu[n];
      if (!a.xong[t]) {
        if (!Pa(a, t, r)) {
          return !1;
        }
        if (Ha(a), r && h() > r) {
          return !1;
        }
      }
    }
    return !0;
  }
  function Ha(a) {
    if (!a.hetViec) {
      for (var r = 0; r < a.so; r++)
        if (!a.xong[r]) {
          return;
        }
      if (!(a.viec.length)) {
        a.sdfK = a.sdfK0 = a.sdfN = a.sdfN0 = a.sdfU = a.sdfL = a.sdfDao = a.sdfNui = a.sdfThem = null;
        a.wHoa = a.wCao = a.wRung = a.wCau = a.wBep = null;
        a.bong = null;
        a.hetViec = !0;
        a.msTong = h() - a.batDau;
        d = s = g = M = y = b = null;
        x = w = m = p = null;
        C = null;
      }
    }
  }
  function Sa() {
    return !!((!a.Quality || !a.Quality.level || a.Quality.tier >= 1) && a.Utils && a.Utils.canvas && "undefined" != typeof document && a.Palette && a.Palette.WORLD);
  }
  function Ka(r, n, t) {
    Na.data = r;
    Na.pal = a.Palette.WORLD;
    Na.layer = null;
    Na.loi = !1;
    try {
      Na.layer = qa(r, n, t);
      Na.layer.batDau = h() - Na.layer.msKhung;
    }
    catch (a) {
      Na.loi = !0;
      console.error("[PNTT] Không dựng được nền Long Uyên Cốc:", a);
    }
  }
  if (a.ObjectArt && a.ObjectArt.defs && a.Pixel) {
    a.ObjectArt.defs.long_uyen_phien_da = { w: 32, h: 32, ax: 16, ay: 32, variants: 4, noExternal: !0, noShadow: !0, tongTranh: !0, draw: function (r, n, t) {
        var o = a.Pixel;
        var e = 5 + (1 & t);
        var u = 6 + (t >> 1 & 1);
        var f = 22 - (1 & t);
        var l = 17;
        o.r(r, e - 2, u + l + 1, f + 4, 3, "rgba(226,246,255,0.42)");
        o.r(r, e - 1, u - 1, f + 2, 1, "rgba(226,246,255,0.25)");
        o.r(r, e - 2, u + 2, 1, 15, "rgba(226,246,255,0.22)");
        o.r(r, e, u + l, f, 3, "#5d605c");
        o.r(r, e, u + l + 2, f, 1, "#3f4442");
        o.r(r, e, u, f, l, "#a8aaa2");
        o.r(r, e, u, f, 1, "#d8d9cf");
        o.r(r, e, u, 1, l, "#c7c8bf");
        o.r(r, e + f - 1, u + 1, 1, 16, "#83867f");
        o.r(r, e + 1, u + l - 1, f - 1, 1, "#8d9089");
        for (var i = 0; i < 9; i++)
          o.dot(r, e + 2 + (n() * (f - 4) | 0), u + 2 + (13 * n() | 0), n() > .5 ? "#969890" : "#b9bab1");
        if (!(1 !== t && 3 !== t)) {
          o.r(r, e + f - 5, u + l - 3, 4, 2, "#6f8f45");
          o.dot(r, e + f - 6, u + l - 2, "#5b7a3a");
        }
        if (2 === t) {
          o.line(r, e + 4, u + 5, e + 9, u + 11, "#8a8c85");
        }
      } };
  }
  var Oa = { data: null, fx: null };
  function Ea(a) {
    if (Oa.data !== a) {
      Oa.data = a;
      Oa.fx = function (a) {
        var r = a.width;
        var t = a.height;
        var o = a.legend || {};
        var e = a.tang || [];
        var f = { thac: [], nuoc: [], suong: [], lua: [], tran: null, la: [], nang: [], dom: [], chuon: [], hoTam: null };
        function l(n, e) {
          return n < 0 || e < 0 || n >= r || e >= t ? {} : o[(a.ground[e] || "").charAt(n)] || {};
        }
        function i(a, r) {
          return +((e[r] || "").charAt(a) || 2);
        }
        var h;
        var c;
        var v;
        var d;
        var s;
        var g;
        var M = function (a) {
          return /bamboo/.test(a.obj || "");
        };
        var y = function (a) {
          return "water" === a.ground;
        };
        var b = function (a) {
          return "thac_nui" === a.ground;
        };
        for (c = 0; c < t - 1; c++)
          for (h = 0; h < r; h++)
            if (b(l(h, c)) && !b(l(h, c + 1)) && (!b(l(h - 1, c)) || b(l(h - 1, c + 1)))) {
              for (var x = h; b(l(x + 1, c)) && !b(l(x + 1, c + 1));)
                x++;
              f.thac.push({ x: (h + x + 1) * n / 2, y: (c + 1) * n, w: (x - h + 1) * n, k: f.thac.length, tay: h < r / 2 });
            }
        var w = 0;
        var m = 0;
        var p = 0;
        for (c = 0; c < t; c++)
          for (h = 0; h < r; h++) {
            var A = l(h, c);
            if (y(A) && A.block) {
              for (g = 0, d = -1; d <= 1; d++)
                for (v = -1; v <= 1; v++)
                  y(l(h + v, c + d)) && g++;
              if (!(g < 5)) {
                f.nuoc.push({ x: h * n + 16, y: c * n + 16, k: f.nuoc.length });
                if (0 === i(h, c)) {
                  w += h;
                  m += c;
                  p++;
                  if ((7 * h + 3 * c) % 5 == 0) {
                    f.suong.push({ x: h * n + 16, y: c * n + 14, k: f.suong.length });
                  }
                }
              }
            }
          }
        for (p && (f.hoTam = { x: (w / p + .5) * n, y: (m / p + .5) * n }), (a.decorations || []).forEach(function (a) {
          if ("long_uyen_brazier" === a.name) {
            f.lua.push({ x: a.tx * n + 16, y: (a.ty + 1) * n, k: f.lua.length });
          }
          if ("long_uyen_dragon_relief" === a.name) {
            f.tran = { x: a.tx * n + 16, y: (a.ty + 1) * n - 119 };
          }
        }), c = 0; c < t; c++)
          for (h = 0; h < r; h++)
            if (M(l(h, c)) && !(u(h, c, 401) > .4)) {
              var _ = !0;
              for (s = f.la.length - 1; s >= 0 && s > f.la.length - 40; s--)
                if (Math.abs(f.la[s].x - h * n) < 96 && Math.abs(f.la[s].y - c * n) < 96) {
                  _ = !1;
                  break;
                }
              if (_) {
                f.la.push({ x: h * n + 16, y: c * n - 40, k: f.la.length });
              }
            }
        for (c = 1; c < t - 1; c++)
          for (h = 1; h < r - 1; h++) {
            var k = l(h, c);
            if (!k.block && !y(k) && 1 === i(h, c)) {
              var T = y(l(h + 1, c)) || y(l(h - 1, c)) || y(l(h, c + 1)) || y(l(h, c - 1));
              var I = M(l(h + 1, c)) || M(l(h - 1, c));
              if ((T && u(h, c, 411) < .4 || I && u(h, c, 412) < .18)) {
                f.dom.push({ x: h * n + 16, y: c * n + 12, k: f.dom.length });
              }
            }
          }
        var U = [];
        for (c = 2; c < t - 1; c++)
          for (h = 2; h < r - 1; h++)
            if (!l(h, c).block && !y(l(h, c)) && 1 === i(h, c)) {
              for (g = 0, d = -3; d <= 0; d++)
                for (v = -3; v <= 1; v++)
                  M(l(h + v, c + d)) && g++;
              if (g >= 5) {
                U.push([h, c, g + 3 * u(h, c, 413)]);
              }
            }
        for (U.sort(function (a, r) {
          return r[2] - a[2];
        }), s = 0; s < U.length && f.nang.length < 5; s++) {
          var C = U[s];
          var R = !0;
          for (v = 0; v < f.nang.length; v++)
            if (Math.abs(f.nang[v].x - C[0] * n) < 192 && Math.abs(f.nang[v].y - C[1] * n) < 160) {
              R = !1;
              break;
            }
          if (R) {
            f.nang.push({ x: C[0] * n + 16, y: C[1] * n + 16, k: f.nang.length });
          }
        }
        var W = f.tran || f.hoTam;
        if (W) {
          for (s = 0; s < 3; s++)
            f.chuon.push({ x: W.x, y: W.y + 8, k: s });
        }
        return f;
      }(a);
    }
    return Oa.fx;
  }
  var ja = null;
  var Ba = [[[-2, 0], [-1, 0], [0, 0], [1, 0], [2, 0]], [[-2, -1], [-1, -1], [0, 0], [1, 1], [2, 1]], [[0, -1], [0, 0], [0, 1]], [[-2, 1], [-1, 1], [0, 0], [1, -1], [2, -1]]];
  o.drawFx = function (n, t, o, e, l, i, h, c) {
    var v = t && t.data;
    if (v && v.id === r && 0 !== c) {
      var d = Ea(v);
      var s = function () {
        if (ja) {
          return ja;
        }
        if (!a.Utils || !a.Utils.canvas || "undefined" == typeof document) {
          return null;
        }
        function r(r, n, t) {
          for (var o = a.Utils.canvas(r, n), e = o.ctx.createImageData(r, n), u = e.data, f = 0; f < n; f++)
            for (var l = 0; l < r; l++) {
              var i = t(l, f);
              var h = 4 * (f * r + l);
              if (!(!i || i[3] <= 0)) {
                u[h] = i[0];
                u[h + 1] = i[1];
                u[h + 2] = i[2];
                u[h + 3] = i[3];
              }
            }
          o.ctx.putImageData(e, 0, 0);
          return o.canvas;
        }
        function n(a, n, t, o) {
          var e = 2 * a + 1;
          return r(e, e, function (r, e) {
            var u = r - a;
            var f = e - a;
            var l = Math.sqrt(u * u + f * f);
            if (l > a) {
              return null;
            }
            var i = Math.floor((1 - l / a) * o + .95 * $(r, e)) / o;
            return i > 0 ? [n[0], n[1], n[2], Math.round(i * t)] : null;
          });
        }
        for (var t = [], o = 0; o < 4; o++)
          t.push(r(16, 26, function (a) {
            return function (r, n) {
              var t = (25 - n) / 25;
              var o = Math.sin(1.9 * a + 4 * t) * t * 2.2;
              var e = (t < .3 ? t / .3 : 1) * (1 - .75 * t) * 7 * (.85 + .15 * Math.sin(2.7 * a + 1));
              var u = Math.abs(r + .5 - 8 - o);
              return u > e || e <= 0 ? null : u < .35 * e && t < .6 ? [255, 246, 200, 235] : u < .7 * e ? [255, 176, 64, 205] : [236, 84, 30, 160];
            };
          }(o)));
        ja = { suong: r(80, 22, function (a, r) {
            for (var n = 0, t = [[20, 12, 18, 7], [42, 10, 24, 8], [62, 13, 15, 6]], o = 0; o < t.length; o++) {
              var e = (a - t[o][0]) / t[o][2];
              var u = (r - t[o][1]) / t[o][3];
              n = Math.max(n, 1 - (e * e + u * u));
            }
            if (n <= 0) {
              return null;
            }
            var f = Math.floor(4 * n + .95 * $(a, r)) / 4;
            return [232, 244, 238, Math.round(110 * f)];
          }), bui: r(46, 20, function (a, r) {
            var n = (a - 23) / 23;
            var t = (r - 10) / 10;
            var o = 1 - (n * n + t * t);
            if (o <= 0) {
              return null;
            }
            var e = Math.floor(4 * o + .95 * $(a, r)) / 4;
            return [240, 250, 255, Math.round(120 * e)];
          }), nang: r(130, 170, function (a, r) {
            var n = a - .5 * r - 6;
            if (n < 0 || n > 42) {
              return null;
            }
            var t = 1 - Math.abs(n - 21) / 21;
            var o = Math.sin(Math.PI * r / 170);
            var e = Math.floor(t * t * o * 3 + .95 * $(a, r)) / 3;
            return e > 0 ? [255, 246, 196, Math.round(44 * e)] : null;
          }), quang: r(9, 9, function (a, r) {
            var n = a - 4;
            var t = r - 4;
            var o = Math.sqrt(n * n + t * t);
            if (o > 4.3) {
              return null;
            }
            var e = o < 1 ? 1 : Math.floor(3 * (1 - o / 4.3) + .9 * $(a, r)) / 3;
            return e > 0 ? [214, 255, 150, Math.round(e * (o < 1 ? 255 : 110))] : null;
          }), linh: r(9, 9, function (a, r) {
            var n = a - 4;
            var t = r - 4;
            var o = Math.sqrt(n * n + t * t);
            if (o > 4.3) {
              return null;
            }
            var e = o < 1 ? 1 : Math.floor(3 * (1 - o / 4.3) + .9 * $(a, r)) / 3;
            return e > 0 ? [150, 225, 255, Math.round(e * (o < 1 ? 255 : 120))] : null;
          }), haoLua: n(34, [255, 150, 60], 110, 5), denNen: r(96, 34, function (a, r) {
            var n = (a - 48) / 48;
            var t = (r - 17) / 17;
            var o = Math.sqrt(n * n + t * t);
            if (o > 1) {
              return null;
            }
            var e = Math.floor(4 * (1 - o) + .95 * $(a, r)) / 4;
            return e > 0 ? [255, 170, 80, Math.round(70 * e)] : null;
          }), vong: r(301, 257, function (a, r) {
            var n = (a - 150) / 134;
            var t = (r - 128) / 114;
            var o = Math.sqrt(n * n + t * t);
            var e = Math.exp(-Math.pow(11 * (o - 1), 2));
            if (o < 1) {
              e = Math.max(e, .12 * (1 - o));
            }
            var u = Math.floor(5 * e + .95 * $(a, r)) / 5;
            return u > 0 ? [96, 196, 255, Math.round(120 * u)] : null;
          }), ngoc: n(20, [170, 230, 255], 120, 5), cauVong: r(72, 34, function (a, r) {
            var n = a - 36;
            var t = r - 34;
            var o = 34 - Math.sqrt(n * n + t * t);
            if (o < 0 || o >= 10) {
              return null;
            }
            var e = [[255, 90, 90], [255, 180, 70], [250, 240, 110], [110, 220, 140], [110, 160, 255]][Math.min(4, o / 2 | 0)];
            var u = Math.sin(Math.PI * f((a - 4) / 64));
            var l = Math.floor(3 * u + .9 * $(a, r)) / 3;
            return l > 0 ? [e[0], e[1], e[2], Math.round(84 * l)] : null;
          }), lua: t };
        return ja;
      }();
      if (d && s) {
        var g;
        var M;
        var y;
        var b;
        var x;
        var w;
        var m = h || 0;
        var p = c >= 2;
        var A = function (a, r, n) {
          return a > o - n && a < o + l + n && r > e - n && r < e + i + n;
        };
        for (n.save(), n.imageSmoothingEnabled = !1, n.globalCompositeOperation = "source-over", g = 0; g < d.nuoc.length; g++)
          if (A((b = d.nuoc[g]).x, b.y, 24)) {
            for (M = 0; M < (p ? 2 : 1); M++) {
              var _ = u(b.k, M, 421);
              var k = (m * (.5 + .6 * _) + 9 * _) % 1;
              if (!(k > .3)) {
                y = Math.sin(k / .3 * Math.PI);
                n.globalAlpha = .9 * y;
                n.fillStyle = "#f4fcff";
                var T = Math.round(b.x - 12 + 24 * u(b.k, M, 422) - o);
                var I = Math.round(b.y - 12 + 24 * u(b.k, M, 423) - e);
                n.fillRect(T, I, 1, 1);
                if (y > .6) {
                  n.globalAlpha = .45 * y;
                  n.fillRect(T - 1, I, 3, 1);
                }
              }
            }
            var U = u(b.k, 7, 424);
            var C = (.28 * m + 13 * U) % 1;
            if (U < (p ? .32 : .16) && C < .55) {
              var R = 2 + C / .55 * 9;
              var W = .5 * (1 - C / .55);
              n.globalAlpha = W;
              n.strokeStyle = "#d8f2f7";
              n.lineWidth = 1;
              n.beginPath();
              n.ellipse(Math.round(b.x - o) + .5, Math.round(b.y + 4 - e) + .5, R, .45 * R, 0, 0, 2 * Math.PI);
              n.stroke();
            }
          }
        if (p) {
          for (g = 0; g < d.suong.length; g++) {
            b = d.suong[g];
            var P = 22 * Math.sin(.09 * m + 1.9 * b.k);
            var D = 3 * Math.sin(.21 * m + b.k);
            if (A(b.x + P, b.y, 90)) {
              n.globalAlpha = .2 + .08 * Math.sin(.33 * m + 2.1 * b.k);
              n.drawImage(s.suong, Math.round(b.x - 40 + P - o), Math.round(b.y - 11 + D - e));
            }
          }
        }
        for (g = 0; g < d.thac.length; g++)
          if (A((b = d.thac[g]).x, b.y, 80)) {
            for (M = 0; M < (p ? 5 : 2); M++) {
              var N = u(b.k, M, 431);
              var q = (m / (2.6 + 1.4 * N) + N) % 1;
              x = b.x + (N - .5) * b.w * 1.1 + 18 * (q - .5) * (N > .5 ? 1 : -1);
              w = b.y + 4 - 16 * q;
              n.globalAlpha = .62 * Math.sin(q * Math.PI);
              n.drawImage(s.bui, Math.round(x - 23 - o), Math.round(w - 10 - e));
            }
            for (n.fillStyle = "#f2fbff", M = 0; M < (p ? 12 : 5); M++) {
              var L = u(b.k, M, 432);
              var F = (m / (.7 + .5 * L) + L) % 1;
              x = b.x + (L - .5) * b.w * .9 + (L - .5) * F * 14;
              w = b.y + 5 - Math.sin(F * Math.PI) * (6 + 9 * L);
              n.globalAlpha = .9 * (1 - F);
              n.fillRect(Math.round(x - o), Math.round(w - e), 1, 1);
            }
          }
        for (g = 0; g < d.chuon.length; g++) {
          var H = m * (.42 + .12 * g) + 3.1 * g;
          var S = (b = d.chuon[g]).x + 205 * Math.sin(1.1 * H) + 12 * Math.sin(2.7 * H);
          var K = b.y + 155 * Math.sin(.8 * H + 1) + 9 * Math.cos(2.1 * H);
          if (A(S, K, 10)) {
            var O = 99 * Math.cos(1.1 * H) >= 0 ? 1 : -1;
            var E = (22 * m | 0) % 2;
            x = Math.round(S - o);
            w = Math.round(K - e);
            n.globalAlpha = 1;
            n.fillStyle = ["#3fb6c9", "#d0503a", "#8fbf3b"][g % 3];
            n.fillRect(x - 3 * O, w, 1, 1);
            n.fillRect(x - 2 * O, w, 1, 1);
            n.fillRect(x - O, w, 1, 1);
            n.fillRect(x, w, 1, 1);
            n.fillStyle = "#1b2a2c";
            n.fillRect(x + O, w, 1, 1);
            n.globalAlpha = .7;
            n.fillStyle = "#e8f7ff";
            if (E) {
              n.fillRect(x - 1, w - 2, 1, 2);
              n.fillRect(x + 1, w - 2, 1, 2);
            }
            else {
              n.fillRect(x - 2, w - 1, 2, 1);
              n.fillRect(x + 1, w - 1, 2, 1);
            }
          }
        }
        var j = p ? 2 : 1;
        for (g = 0; g < d.la.length; g++)
          if (A((b = d.la[g]).x, b.y + 40, 120)) {
            for (M = 0; M < j; M++) {
              var B = u(b.k, M, 441);
              var V = (m * (.08 + .05 * B) + 11 * B) % 1;
              var z = b.x + 46 * V + 9 * Math.sin(9 * V + 20 * B);
              var Q = b.y + 118 * V;
              y = V < .1 ? V / .1 : V > .85 ? (1 - V) / .15 : 1;
              var X = Ba[m * (2.2 + 2 * B) + 7 * B & 3];
              n.globalAlpha = y;
              for (var G = Math.round(z - o), J = Math.round(Q - e), Y = 0; Y < X.length; Y++)
                n.fillStyle = 0 === Y || Y === X.length - 1 ? B > .5 ? "#8a7a36" : "#557a2c" : B > .5 ? "#c8b25a" : "#86b04a", n.fillRect(G + X[Y][0], J + X[Y][1], 1, 1);
            }
          }
        if (n.globalCompositeOperation = "lighter", d.tran && A(d.tran.x, d.tran.y, 170)) {
          var Z = function () {
            for (var r = a.SceneWorld && a.SceneWorld.enemies || [], n = 0; n < r.length; n++)
              if (r[n] && "than_thu_xich_long" === r[n].type && !r[n].dead) {
                return !0;
              }
            return !1;
          }();
          var aa = Z ? 1 : .6;
          var ra = Z ? 1.4 : .8;
          for (b = d.tran, n.globalAlpha = (.32 + .14 * Math.sin(m * ra)) * aa, n.drawImage(s.vong, Math.round(b.x - 150 - o), Math.round(b.y - 128 - e)), M = 0; M < 8; M++) {
            var na = m * (Z ? .34 : .2) + M * Math.PI / 4;
            x = b.x + 140 * Math.cos(na);
            w = b.y + 119 * Math.sin(na);
            n.globalAlpha = (.55 + .35 * Math.sin(3 * m + 1.3 * M)) * aa;
            n.drawImage(s.linh, Math.round(x - 4 - o), Math.round(w - 4 - e));
            for (var ta = 1; ta <= 3; ta++) {
              var oa = na - .05 * ta;
              n.globalAlpha = (.3 - .08 * ta) * aa;
              n.fillStyle = "#bfe9ff";
              n.fillRect(Math.round(b.x + 140 * Math.cos(oa) - o), Math.round(b.y + 119 * Math.sin(oa) - e), 1, 1);
            }
          }
          for (n.globalAlpha = (.35 + .3 * Math.max(0, Math.sin(2.1 * m))) * aa, n.drawImage(s.ngoc, Math.round(b.x - 20 - o), Math.round(b.y - 20 - e)), M = 0; M < (p ? 12 : 6); M++) {
            var ea = u(M, 3, 451);
            var ua = (m / (3 + 2.5 * ea) + ea) % 1;
            var fa = ea * Math.PI * 2;
            var la = 20 + 90 * u(M, 4, 451);
            x = b.x + Math.cos(fa) * la + 3 * Math.sin(6 * ua + M);
            w = b.y + Math.sin(fa) * la * .84 - 46 * ua;
            n.globalAlpha = .8 * Math.sin(ua * Math.PI) * aa;
            n.drawImage(s.linh, Math.round(x - 4 - o), Math.round(w - 4 - e));
          }
        }
        for (g = 0; g < d.lua.length; g++)
          if (A((b = d.lua[g]).x, b.y - 40, 90)) {
            var ia = .85 + .08 * Math.sin(9.3 * m + 2.1 * b.k) + .07 * Math.sin(14.1 * m + b.k);
            n.globalAlpha = .5 * ia;
            n.drawImage(s.denNen, Math.round(b.x - 48 - o), Math.round(b.y - 20 - e));
            n.globalAlpha = .42 * ia;
            n.drawImage(s.haoLua, Math.round(b.x - 34 - o), Math.round(b.y - 80 - e));
            var ha = 10 * m + 1.7 * b.k & 3;
            for (n.globalAlpha = .75, n.drawImage(s.lua[ha], Math.round(b.x - 8 - o), Math.round(b.y - 66 - e)), n.fillStyle = "#ffb45a", M = 0; M < (p ? 5 : 2); M++) {
              var ca = u(b.k, M, 461);
              var va = (m / (1.4 + 1.2 * ca) + ca) % 1;
              n.globalAlpha = .95 * (1 - va);
              n.fillRect(Math.round(b.x - 4 + 8 * ca + 4 * Math.sin(8 * va + 9 * ca) - o), Math.round(b.y - 58 - 46 * va - e), 1, 1);
            }
          }
        for (g = 0; g < d.dom.length; g++) {
          var da = u((b = d.dom[g]).k, 1, 471);
          var sa = m * (.25 + .2 * da) + 20 * da;
          var ga = b.x + 14 * Math.sin(1.3 * sa) + 4 * Math.sin(3.1 * sa);
          var Ma = b.y - 6 + 10 * Math.sin(.9 * sa + 2);
          if (A(ga, Ma, 8)) {
            if (!((y = Math.max(0, Math.sin(m * (1.1 + da) + 30 * da))) < .05)) {
              n.globalAlpha = .85 * y;
              n.drawImage(s.quang, Math.round(ga - 4 - o), Math.round(Ma - 4 - e));
            }
          }
        }
        if (p) {
          for (g = 0; g < d.thac.length; g++)
            (b = d.thac[g]).tay && A(b.x, b.y, 90) && (n.globalAlpha = .5 + .25 * Math.sin(.4 * m + 1), n.drawImage(s.cauVong, Math.round(b.x - 36 - o), Math.round(b.y - 30 - e)));
          for (g = 0; g < d.nang.length; g++)
            A((b = d.nang[g]).x, b.y, 170) && (n.globalAlpha = .42 + .28 * Math.sin(.27 * m + 1.7 * g), n.drawImage(s.nang, Math.round(b.x - 90 - o), Math.round(b.y - 140 - e)));
        }
        n.restore();
      }
    }
  };
  o.chuanBiTruoc = function (n, t, o) {
    if (n && n.id === r && Sa()) {
      if (!(Na.data === n && Na.pal === a.Palette.WORLD && Na.layer)) {
        Na.data = n;
        Na.pal = a.Palette.WORLD;
        Na.layer = null;
        Na.loi = !1;
        setTimeout(function a() {
          if (Na.data === n && !Na.loi) {
            var r = Na.layer;
            try {
              if (!r) {
                Ka(n, t, o);
                return void setTimeout(a, 0);
              }
              if (r.dangHien) {
                return;
              }
              var e = h() + 12;
              if (!(La(r, e) && Fa(r, e))) {
                setTimeout(a, 0);
              }
            }
            catch (a) {
              Na.loi = !0;
              console.error("[PNTT] Không dựng được nền Long Uyên Cốc:", a);
            }
          }
        }, 0);
      }
    }
  };
  o.quen = function () {
    Na.layer = null;
    Na.loi = !1;
  };
  o.choXong = function (a) {
    if (!a || Na.data !== a) {
      return !0;
    }
    if (Na.loi) {
      return !0;
    }
    var r = Na.layer;
    if (r && r.dangHien) {
      return !0;
    }
    if (!r || r.viec.length) {
      return !1;
    }
    for (var n = 0; n < r.so; n++)
      if (!r.xong[n]) {
        return !1;
      }
    return !0;
  };
  o.nha = function (a) {
    if (Na.data && Na.data !== a) {
      Na.data = null;
      Na.layer = null;
      Na.loi = !1;
    }
  };
  o.layerFor = function (n) {
    var t = n && n.data;
    if (!t || t.id !== r) {
      if (Na.data && Na.layer && Na.layer.dangHien) {
        Na.data = null;
        Na.layer = null;
      }
      return null;
    }
    if (!Sa()) {
      return null;
    }
    if (Na.data === t && Na.pal === a.Palette.WORLD && (Na.layer || Na.loi) || Ka(t, null, null), Na.loi) {
      return null;
    }
    try {
      La(Na.layer, 0);
    }
    catch (a) {
      Na.loi = !0;
      console.error("[PNTT] Không dựng được nền Long Uyên Cốc:", a);
      return null;
    }
    return Na.layer;
  };
  o.dangDung = function (a) {
    return !(!(a && a.data && a.data.id === r && Na.data === a.data && Na.layer) || Na.loi);
  };
  o.coTranh = function (a) {
    return !(!a || a.id !== r || !Sa());
  };
  o.sanSang = function (a) {
    return !(Na.data !== a || !Na.layer || !Na.layer.hetViec);
  };
  o.nuongTiep = function (a) {
    return !!a && (La(a, 0), !Fa(a, h() + 50));
  };
  o.draw = function (r, o, e, u, f, l, i) {
    var c = Math.max(0, Math.floor(e));
    var v = Math.min(o.W, Math.ceil(e + f) + 1);
    var d = Math.max(0, Math.floor(u));
    var s = Math.min(o.H, Math.ceil(u + l) + 1);
    if (!(v <= c || s <= d)) {
      o.dangHien = !0;
      La(o, 0);
      for (var g = c / t | 0, M = (v - 1) / t | 0, y = (s - 1) / t | 0, b = d / t | 0; b <= y; b++)
        for (var x = g; x <= M; x++) {
          var w = b * o.nx + x;
          if (!(o.xong[w])) {
            Da(o, w);
            Ha(o);
          }
        }
      if (!(o.hetViec)) {
        Fa(o, h() + 3);
      }
      var m = a.Tileset;
      if (m && m.draw) {
        for (var p = v - 1 >> 5, A = s - 1 >> 5, _ = d >> 5; _ <= A; _++)
          for (var k = c >> 5; k <= p; k++)
            o.loNuoc[_ * o.TW + k] && m.draw(r, "water", k * n - e, _ * n - u, i);
      }
      r.drawImage(o.canvas, c, d, v - c, s - d, c - e | 0, d - u | 0, v - c, s - d);
    }
  };
  o._taoLop = qa;
  o._fx = Ea;
  o.MAP_ID = r;
}(window.PNTT);
