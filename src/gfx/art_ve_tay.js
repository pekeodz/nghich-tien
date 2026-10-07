!function (n) {
  "use strict";
  var r = n.VeTay = { T: 32, G: 4, ds: [], ban: {} };
  function a(n, r, a) {
    var t = Math.imul(0 | n, 374761393) ^ Math.imul(0 | r, 668265263) ^ Math.imul(40503 + (0 | a), 1274126177);
    return ((t = Math.imul(t ^ t >>> 13, 1274126177)) ^ t >>> 16) >>> 0;
  }
  function t(n, r, t) {
    return a(n, r, t) / 4294967296;
  }
  function o(n) {
    return n < 0 ? 0 : n > 1 ? 1 : n;
  }
  function u(n, r, a) {
    return n < r ? r : n > a ? a : n;
  }
  function e(n, r, a) {
    var t = o((a - n) / (r - n));
    return t * t * (3 - 2 * t);
  }
  function i() {
    return "undefined" != typeof performance ? performance.now() : Date.now();
  }
  var f = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
  function l(n, r) {
    return (f[(3 & r) << 2 | 3 & n] + .5) / 16;
  }
  function c(n) {
    var r = n >>> 0;
    return function () {
      var n = r = r + 1831565813 >>> 0;
      n = Math.imul(n ^ n >>> 15, 1 | n);
      return (((n ^= n + Math.imul(n ^ n >>> 7, 61 | n)) ^ n >>> 14) >>> 0) / 4294967296;
    };
  }
  function v(n) {
    var r = parseInt(n.slice(1), 16);
    return [r >> 16 & 255, r >> 8 & 255, 255 & r];
  }
  function h(n, r, a) {
    return [n[0] + (r[0] - n[0]) * a, n[1] + (r[1] - n[1]) * a, n[2] + (r[2] - n[2]) * a];
  }
  function d(n, r) {
    for (var a = n.map(function (n) {
      return [n[0], "string" == typeof n[1] ? v(n[1]) : n[1]];
    }), t = [], u = 0; u < r; u++) {
      for (var e = u / (r - 1), i = 0; i < a.length - 2 && e > a[i + 1][0];)
        i++;
      var f = a[i];
      var l = a[i + 1];
      var c = h(f[1], l[1], o((e - f[0]) / (l[0] - f[0])));
      t.push([Math.round(c[0]), Math.round(c[1]), Math.round(c[2])]);
    }
    return t;
  }
  function g(n, r) {
    return d(n.map(function (r, a) {
      return [a / (n.length - 1), r];
    }), r || n.length);
  }
  function y(n, r, a) {
    return n.map(function (n) {
      return [n[0] + (r[0] - n[0]) * a, n[1] + (r[1] - n[1]) * a, n[2] + (r[2] - n[2]) * a];
    });
  }
  function s(n, r, a, t) {
    var u = n.length - 1;
    var e = o(r) * u;
    var i = 0 | e;
    if (e - i > l(a, t) && i < u) {
      i++;
    }
    return n[i];
  }
  function m(n, r) {
    var a = 1 - n * n - r * r;
    var t = -.506 * n + -.628 * r + .608 * (a > 0 ? Math.sqrt(a) : 0);
    return t <= 0 ? .6 : .6 + .4 * t / .608;
  }
  r.tao = function (f) {
    var M = f.id;
    var x = f.code || {};
    var w = f.kc || { nlo: 1, nmi: 1, nhi: 1, voro: 1, rach: 1 };
    var p = { ID: M, cfg: f };
    var A = p.kit = { T: 32, G: 4 };
    A.hashU = a;
    A.h01 = t;
    A.clamp01 = o;
    A.kep = u;
    A.smooth = e;
    A.bayer = l;
    A.bayGio = i;
    A.rng = c;
    A.hex = v;
    A.tron3 = h;
    A.daiMoc = d;
    A.dai = g;
    A.nhuom = y;
    A.xem = s;
    A.nang = m;
    var T = 512;
    var D = 511;
    var F = null;
    var U = null;
    var b = null;
    var H = null;
    var I = null;
    var k = null;
    var C = null;
    var S = null;
    function W(n, r) {
      for (var a = new Float32Array(T * T), o = 0; o < n.length; o++) {
        for (var u = n[o][0], e = n[o][1], i = T / u, f = new Float32Array(i * i), l = 0; l < f.length; l++)
          f[l] = 2 * t(l, 7 * o + r, u) - 1;
        for (var c = 0; c < T; c++) {
          var v = c / u;
          var h = 0 | v;
          var d = v - h;
          d = d * d * (3 - 2 * d);
          for (var g = h % i * i, y = (h + 1) % i * i, s = 0; s < T; s++) {
            var m = s / u;
            var M = 0 | m;
            var x = m - M;
            x = x * x * (3 - 2 * x);
            var w = M % i;
            var p = (M + 1) % i;
            var A = f[g + w];
            var D = f[g + p];
            var F = f[y + w];
            var U = f[y + p];
            a[c * T + s] += e * (A + (D - A) * x + (F - A) * d + (A - D - F + U) * x * d);
          }
        }
      }
      return a;
    }
    function V(n, r, t) {
      for (var o = n.hx, u = n.hy, e = 32, i = new Float32Array(9), f = new Float32Array(9), l = new Int32Array(9), c = r; c < t; c++)
        for (var v = c / 16 | 0, h = 0; h < T; h++) {
          for (var d = h / 16 | 0, g = 0, y = 1e9, s = 0, m = -1; m <= 1; m++)
            for (var M = -1; M <= 1; M++) {
              var x = d + M;
              var w = v + m;
              var p = 0;
              var A = 0;
              if (x < 0) {
                x += e;
                p = -T;
              }
              else {
                if (x >= e) {
                  x -= e;
                  p = T;
                }
              }
              if (w < 0) {
                w += e;
                A = -T;
              }
              else {
                if (w >= e) {
                  w -= e;
                  A = T;
                }
              }
              var D = w * e + x;
              i[g] = o[D] + p;
              f[g] = u[D] + A;
              l[g] = D;
              var F = h + .5 - i[g];
              var U = c + .5 - f[g];
              var b = F * F + U * U;
              if (b < y) {
                y = b;
                s = g;
              }
              g++;
            }
          for (var S = i[s], W = f[s], V = 1e9, q = 0; q < g; q++)
            if (q !== s) {
              var K = i[q] - S;
              var N = f[q] - W;
              var O = Math.sqrt(K * K + N * N);
              if (!(O < .001)) {
                var B = (.5 * (i[q] + S) - (h + .5)) * K / O + (.5 * (f[q] + W) - (c + .5)) * N / O;
                if (B < V) {
                  V = B;
                }
              }
            }
          var E = c * T + h;
          H[E] = Math.min(255, Math.max(0, Math.round(8 * V)));
          I[E] = Math.max(-127, Math.min(127, Math.round(h + .5 - S)));
          k[E] = Math.max(-127, Math.min(127, Math.round(c + .5 - W)));
          C[E] = 65535 & a(l[s], 177, 5);
        }
    }
    function q() {
      var n = W([[128, .4], [32, .4], [16, .2]], 23);
      S = new Uint8Array(T * T);
      for (var r = 0; r < T; r++)
        for (var a = r * T, t = (r - 1 & D) * T, o = (r + 1 & D) * T, u = 0; u < T; u++) {
          var e = n[a + u];
          var i = .5 * (n[a + (u + 1 & D)] - n[a + (u - 1 & D)]);
          var f = .5 * (n[o + u] - n[t + u]);
          var l = 1 - (e < 0 ? -e : e) / (Math.sqrt(i * i + f * f) + 4e-4) / 1.8;
          S[a + u] = l > 0 ? Math.round(255 * l) : 0;
        }
    }
    A.rach = function (n, r) {
      var a = n & D;
      var t = r & D;
      if (n >> 9 & 1) {
        a = D - a;
      }
      if (r >> 9 & 1) {
        t = D - t;
      }
      return S[t << 9 | a];
    };
    var K = null;
    function N() {
      F = U = b = H = I = k = C = S = null;
      K = null;
    }
    p.kcThoi = {};
    A.nLo = function (n, r) {
      return F[(r & D) << 9 | n & D];
    };
    A.nMi = function (n, r) {
      return U[(r & D) << 9 | n & D];
    };
    A.nHi = function (n, r) {
      return b[(r & D) << 9 | n & D];
    };
    var O = A.v = { e: 0, dx: 0, dy: 0, id: 0 };
    function B(n, r, a) {
      var t;
      var o;
      var u;
      var e;
      var i = 1.41421;
      var f = new Float32Array(r * a);
      for (t = 0; t < f.length; t++)
        f[t] = n[t] ? 0 : 1e9;
      for (u = 0; u < a; u++)
        for (o = 0; o < r; o++)
          e = f[t = u * r + o], o > 0 && f[t - 1] + 1 < e && (e = f[t - 1] + 1), u > 0 && (f[t - r] + 1 < e && (e = f[t - r] + 1), o > 0 && f[t - r - 1] + i < e && (e = f[t - r - 1] + i), o < r - 1 && f[t - r + 1] + i < e && (e = f[t - r + 1] + i)), f[t] = e;
      for (u = a - 1; u >= 0; u--)
        for (o = r - 1; o >= 0; o--)
          e = f[t = u * r + o], o < r - 1 && f[t + 1] + 1 < e && (e = f[t + 1] + 1), u < a - 1 && (f[t + r] + 1 < e && (e = f[t + r] + 1), o < r - 1 && f[t + r + 1] + i < e && (e = f[t + r + 1] + i), o > 0 && f[t + r - 1] + i < e && (e = f[t + r - 1] + i)), f[t] = e;
      return f;
    }
    function E(n, r, a, t) {
      var o;
      var u;
      var e;
      var i;
      var f;
      var l;
      var c = new Float32Array(n.length);
      var v = new Float32Array(n.length);
      for (u = 0; u < a; u++) {
        var h = u * r;
        for (e = 0, i = 0, o = 0; o <= t && o < r; o++)
          e += n[h + o], i++;
        for (o = 0; o < r; o++)
          c[h + o] = e / i, l = o - t, (f = o + t + 1) < r && (e += n[h + f], i++), l >= 0 && (e -= n[h + l], i--);
      }
      for (o = 0; o < r; o++) {
        for (e = 0, i = 0, u = 0; u <= t && u < a; u++)
          e += c[u * r + o], i++;
        for (u = 0; u < a; u++)
          v[u * r + o] = e / i, l = u - t, (f = u + t + 1) < a && (e += c[f * r + o], i++), l >= 0 && (e -= c[l * r + o], i--);
      }
      return v;
    }
    function G(n, r, a, t) {
      for (var o = 0; o < t.length; o++)
        n = E(n, r, a, t[o]);
      return n;
    }
    function P(n, r, a, t) {
      for (var o = new Uint8Array(n.length), u = 0; u < n.length; u++)
        o[u] = n[u] ? 0 : 1;
      var e = B(o, r, a);
      var i = B(n, r, a);
      var f = new Float32Array(n.length);
      for (u = 0; u < f.length; u++)
        f[u] = n[u] ? 4 * -(e[u] - .5) : 4 * (i[u] - .5);
      return G(f, r, a, t || [1, 1]);
    }
    function j(n, r) {
      for (var a = n.gw, t = n.gh, o = n.TW, u = new Uint8Array(a * t), e = 0; e < t; e++)
        for (var i = (4 * e + 2 >> 5) * o, f = 0; f < a; f++)
          u[e * a + f] = r(i + (4 * f + 2 >> 5)) ? 1 : 0;
      return u;
    }
    function R(n, r, a, t) {
      var o = (a + .5) / 4 - .5;
      var u = (t + .5) / 4 - .5;
      var e = Math.floor(o);
      var i = Math.floor(u);
      var f = o - e;
      var l = u - i;
      var c = n.gw;
      if (e < 0) {
        e = 0;
        f = 0;
      }
      else {
        if (e > c - 2) {
          e = c - 2;
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
      var v = i * c + e;
      var h = r[v];
      var d = r[v + 1];
      var g = r[v + c];
      return h + (d - h) * f + (g - h) * l + (h - d - g + r[v + c + 1]) * f * l;
    }
    A.voro = function (n, r) {
      var a = (r & D) << 9 | n & D;
      O.e = .125 * H[a];
      O.dx = I[a];
      O.dy = k[a];
      O.id = C[a];
      return O;
    };
    A.chamfer = B;
    A.mo = E;
    A.moNhieu = G;
    A.truongDau = P;
    A.matNa = j;
    A.mau = R;
    A.gan = function (n, r, a, t) {
      return r[(t >> 2) * n.gw + (a >> 2)];
    };
    A.congSang = function (n, r, a, t, o, u, e, i) {
      var f = n.gw;
      var l = n.gh;
      var c = Math.max(0, (a - o) / 4 | 0);
      var v = Math.min(f - 1, (a + o) / 4 | 0);
      var h = Math.max(0, (t - o) / 4 | 0);
      var d = Math.min(l - 1, (t + o) / 4 | 0);
      i = i || 1;
      for (var g = h; g <= d; g++)
        for (var y = c; y <= v; y++) {
          var s = 4 * y + 2 - a;
          var m = (4 * g + 2 - t) * i;
          var M = 1 - Math.sqrt(s * s + m * m) / o;
          if (M > 0) {
            var x = 3 * (g * f + y);
            var w = M * M * e;
            r[x] += u[0] * w;
            r[x + 1] += u[1] * w;
            r[x + 2] += u[2] * w;
          }
        }
    };
    var L = A.C3 = [0, 0, 0];
    A.docSang = function (n, r, a, t) {
      var o = n.gw;
      var u = (a + .5) / 4 - .5;
      var e = (t + .5) / 4 - .5;
      var i = 0 | u;
      var f = 0 | e;
      var l = u - i;
      var c = e - f;
      if (i < 0) {
        i = 0;
        l = 0;
      }
      else {
        if (i > o - 2) {
          i = o - 2;
          l = 1;
        }
      }
      if (f < 0) {
        f = 0;
        c = 0;
      }
      else {
        if (f > n.gh - 2) {
          f = n.gh - 2;
          c = 1;
        }
      }
      var v = 3 * (f * o + i);
      var h = v + 3;
      var d = v + 3 * o;
      var g = d + 3;
      var y = (1 - l) * (1 - c);
      var s = l * (1 - c);
      var m = (1 - l) * c;
      var M = l * c;
      L[0] = r[v] * y + r[h] * s + r[d] * m + r[g] * M;
      L[1] = r[v + 1] * y + r[h + 1] * s + r[d + 1] * m + r[g + 1] * M;
      L[2] = r[v + 2] * y + r[h + 2] * s + r[d + 2] * m + r[g + 2] * M;
      return L;
    };
    A.dungKhoi = function (n, r, a, t, o) {
      var u;
      var e;
      var i;
      var f = n.W;
      var l = n.H;
      var c = n.gw;
      var v = n.gh;
      var h = f * l;
      var d = j(n, r);
      var g = P(d, c, v, a || [2]);
      var y = P(d, c, v, []);
      o = o || 4;
      var s = new Uint8Array(h);
      var m = new Uint16Array(h);
      var M = new Uint16Array(h);
      var x = new Uint8Array(h);
      for (e = 0; e < l; e++)
        for (u = 0; u < f; u++) {
          var w = R(n, y, u, e);
          var p = R(n, g, u, e) + (t ? t(u, e) : 0);
          i = e * f + u;
          if ((p = p < w - o ? w - o : p > w + o ? w + o : p) < 0) {
            s[i] = 1;
            x[i] = -p > 255 ? 255 : 0 | -p;
          }
        }
      for (u = 0; u < f; u++) {
        var A = 0;
        var T = !1;
        var D = !1;
        for (e = l - 1; e >= 0; e--)
          s[i = e * f + u] ? (T || (T = !0, A = 0, D = e === l - 1), m[i] = D ? 6e4 : A, A++) : T = !1;
        var F = 0;
        var U = !1;
        var b = !1;
        for (e = 0; e < l; e++)
          s[i = e * f + u] ? (U || (U = !0, F = 0, b = 0 === e), M[i] = b ? 6e4 : F, F++) : U = !1;
      }
      return { sd: g, sd0: y, M: s, V: m, U: M, E: x };
    };
    var _ = A.S = { ram: null, v: .5, nx: 0, ny: 0, mau: null };
    function X(n, r, a, t, u, e) {
      var i = a.length - 1;
      var f = o(t) * i;
      var c = 0 | f;
      if (f - c > l(u, e) && c < i) {
        c++;
      }
      var v = a[c];
      n[r] = v[0];
      n[r + 1] = v[1];
      n[r + 2] = v[2];
      n[r + 3] = 255;
    }
    function z(n, r, a, t) {
      if (_.mau) {
        n[r] = _.mau[0];
        n[r + 1] = _.mau[1];
        n[r + 2] = _.mau[2];
        return void (n[r + 3] = 255);
      }
      X(n, r, _.ram, _.v * m(_.nx, _.ny), a, t);
    }
    function J(r) {
      var a = i();
      var o = r.width;
      var u = r.height;
      var e = 32 * o;
      var l = 32 * u;
      var c = p.nen;
      if (!c) {
        throw new Error("chưa có nét vẽ nền " + M);
      }
      for (var v = { data: r, P: c, TW: o, TH: u, W: e, H: l, gw: e / 4, gh: l / 4, batDau: a, art: p }, h = o * u, d = v.cl = new Uint8Array(h), g = 0; g < u; g++)
        for (var y = r.ground[g] || "", s = 0; s < o; s++) {
          var m = x[y.charAt(s)];
          d[g * o + s] = void 0 === m ? f.codeKhac || 0 : m;
        }
      function A(n, r) {
        r.ten = n;
        return r;
      }
      v.thoi = {};
      v.chen = 0;
      v.viec = [A("ketCau", function (n) {
          return function (n) {
            var r = function () {
              return n && i() > n;
            };
            function a(n, r) {
              var a = i();
              r();
              p.kcThoi[n] = (p.kcThoi[n] || 0) + i() - a;
            }
            if (w.nlo && !F && (a("nlo", function () {
              F = W([[128, .5], [64, .3], [32, .2]], 13);
            }), r())) {
              return !1;
            }
            if (w.nmi && !U && (a("nmi", function () {
              U = W([[64, .45], [32, .35], [16, .2]], 17);
            }), r())) {
              return !1;
            }
            if (w.nhi && !b && (a("nhi", function () {
              b = W([[16, .5], [8, .3], [4, .2]], 19);
            }), r())) {
              return !1;
            }
            if (w.voro && (!C || K)) {
              if (!(K)) {
                K = function () {
                  for (var n = new Float32Array(1024), r = new Float32Array(1024), a = 0; a < 32; a++)
                    for (var o = 0; o < 32; o++)
                      n[32 * a + o] = 16 * (o + .14 + .72 * t(o, a, 611)), r[32 * a + o] = 16 * (a + .14 + .72 * t(o, a, 612));
                  H = new Uint8Array(T * T);
                  I = new Int8Array(T * T);
                  k = new Int8Array(T * T);
                  C = new Uint16Array(T * T);
                  return { hx: n, hy: r, y: 0 };
                }();
              }
              for (var o = i(); K.y < T;) {
                var u = Math.min(T, K.y + 16);
                if (V(K, K.y, u), K.y = u, K.y < T && r()) {
                  p.kcThoi.voro = (p.kcThoi.voro || 0) + i() - o;
                  return !1;
                }
              }
              if (p.kcThoi.voro = (p.kcThoi.voro || 0) + i() - o, K = null, r()) {
                return !1;
              }
            }
            if (w.rach && !S) {
              a("rach", q);
            }
            return !0;
          }(n);
        }), A("chuanBi", function (n) {
          v.chen = 0;
          c.chuanBi(v);
          v.dong = 0;
        }), A("canvas", function () {
          var r = n.Utils.canvas(e, l);
          v.canvas = r.canvas;
          v.ctx = r.ctx;
          v.anh = v.ctx.createImageData(e, l);
          v.dong = 0;
        }), A("to", function (n) {
          return function (n, r) {
            for (var a = n.W, t = n.P, o = n.anh.data, u = t.to, e = t.hau; n.dong < n.H;) {
              for (var f = Math.min(n.H, n.dong + 16), l = n.dong; l < f; l++)
                for (var c = 0; c < a; c++) {
                  var v = l * a + c;
                  var h = 4 * v;
                  _.ram = null;
                  _.mau = null;
                  _.v = .5;
                  _.nx = 0;
                  _.ny = 0;
                  u(n, c, l, v);
                  z(o, h, c, l);
                  if (e) {
                    e(n, o, h, c, l, v);
                  }
                }
              if (n.dong = f, r && i() > r) {
                return n.dong >= n.H;
              }
            }
            return !0;
          }(v, n);
        }), A("dan", function (n) {
          return !c.dan || !1 !== c.dan(v, n);
        }), A("put", function () {
          v.ctx.putImageData(v.anh, 0, 0);
          v.anh = null;
        }), A("vat", function (r) {
          return function (r, a) {
            var t = n.ObjectArt;
            var o = t && t.defs;
            if (!(a && f.tienTo && o && t.get)) {
              return !0;
            }
            if (!r.vatDs) {
              for (var u in r.vatDs = [], r.vatI = 0, o)
                if (0 === u.indexOf(f.tienTo)) {
                  for (var e = 0; e < (o[u].variants || 1); e++)
                    r.vatDs.push([u, e]);
                }
            }
            for (; r.vatI < r.vatDs.length;) {
              var l = r.vatDs[r.vatI++];
              if (t.get(l[0], l[1]), i() > a) {
                return r.vatI >= r.vatDs.length;
              }
            }
            return !0;
          }(v, r);
        }), A("hauKy", function (n) {
          return !c.hauKy || c.hauKy(v, n);
        }), A("xong", function () {
          v.xong = !0;
          v.msTong = i() - v.batDau;
          if (c.don) {
            c.don(v);
          }
          N();
        })];
      return v;
    }
    function Q(n, r) {
      for (; n.viec.length;) {
        var a = i();
        var t = n.viec[0];
        var o = !1 !== t(r);
        if (n.thoi && (n.thoi[t.ten || "?"] = (n.thoi[t.ten || "?"] || 0) + (i() - a)), o && n.viec.shift(), r && i() > r) {
          return !n.viec.length;
        }
      }
      return !0;
    }
    A.toRamp = X;
    A.dat = function (n, r, a, t) {
      _.ram = n;
      _.v = r;
      _.nx = a || 0;
      _.ny = t || 0;
      _.mau = null;
    };
    A.datMau = function (n) {
      _.mau = n;
    };
    A.phu = function (n, r, a, t) {
      if (!(t <= .004)) {
        if (t > 1) {
          t = 1;
        }
        n[r] += (a[0] - n[r]) * t;
        n[r + 1] += (a[1] - n[r + 1]) * t;
        n[r + 2] += (a[2] - n[r + 2]) * t;
      }
    };
    A.nhan = function (n, r, a) {
      n[r] *= a;
      n[r + 1] *= a;
      n[r + 2] *= a;
    };
    A.nhanMau = function (n, r, a, t) {
      n[r] *= 1 + (a[0] / 255 - 1) * t;
      n[r + 1] *= 1 + (a[1] / 255 - 1) * t;
      n[r + 2] *= 1 + (a[2] / 255 - 1) * t;
    };
    A.cong = function (n, r, a, t) {
      if (!(t <= .004)) {
        var o = n[r] + a[0] * t;
        var u = n[r + 1] + a[1] * t;
        var e = n[r + 2] + a[2] * t;
        n[r] = o > 255 ? 255 : o;
        n[r + 1] = u > 255 ? 255 : u;
        n[r + 2] = e > 255 ? 255 : e;
      }
    };
    A.Spr = function (n, r) {
      var a = new Uint8ClampedArray(n * r * 4);
      var t = { W: n, H: r, buf: a, px: function (t, o, u, e) {
          if (t = Math.round(t), o = Math.round(o), !(t < 0 || o < 0 || t >= n || o >= r)) {
            var i = 4 * (o * n + t);
            if (null == e || e >= 1) {
              a[i] = u[0];
              a[i + 1] = u[1];
              a[i + 2] = u[2];
              return void (a[i + 3] = 255);
            }
            if (!(e <= 0)) {
              var f = a[i + 3] / 255;
              var l = e + f * (1 - e);
              a[i] = (u[0] * e + a[i] * f * (1 - e)) / l;
              a[i + 1] = (u[1] * e + a[i + 1] * f * (1 - e)) / l;
              a[i + 2] = (u[2] * e + a[i + 2] * f * (1 - e)) / l;
              a[i + 3] = 255 * l;
            }
          }
        }, alpha: function (t, o) {
          t = Math.round(t);
          o = Math.round(o);
          return t < 0 || o < 0 || t >= n || o >= r ? 0 : a[4 * (o * n + t) + 3];
        }, get: function (r, t) {
          var o = 4 * (Math.round(t) * n + Math.round(r));
          return [a[o], a[o + 1], a[o + 2], a[o + 3]];
        }, rect: function (n, r, a, o, u, e) {
          n = Math.round(n);
          r = Math.round(r);
          a = Math.round(a);
          o = Math.round(o);
          for (var i = r; i < r + o; i++)
            for (var f = n; f < n + a; f++)
              t.px(f, i, u, e);
        }, poly: function (n, r, a) {
          var o;
          var u = 1 / 0;
          var e = -1 / 0;
          for (o = 0; o < n.length; o++)
            n[o][1] < u && (u = n[o][1]), n[o][1] > e && (e = n[o][1]);
          for (var i = Math.floor(u); i < Math.ceil(e); i++) {
            var f = i + .5;
            var l = [];
            for (o = 0; o < n.length; o++) {
              var c = n[o];
              var v = n[(o + 1) % n.length];
              if ((c[1] <= f && v[1] > f || v[1] <= f && c[1] > f)) {
                l.push(c[0] + (f - c[1]) * (v[0] - c[0]) / (v[1] - c[1]));
              }
            }
            l.sort(function (n, r) {
              return n - r;
            });
            for (var h = 0; h + 1 < l.length; h += 2)
              for (var d = Math.round(l[h]); d < Math.round(l[h + 1]); d++)
                if ("function" == typeof r) {
                  var g = r(d, i);
                  if (g) {
                    t.px(d, i, g, g.length > 3 ? g[3] : a);
                  }
                }
                else {
                  t.px(d, i, r, a);
                }
          }
        }, line: function (n, r, a, o, u, e, i) {
          n = Math.round(n);
          r = Math.round(r);
          a = Math.round(a);
          o = Math.round(o);
          var f = Math.abs(a - n);
          var l = n < a ? 1 : -1;
          var c = -Math.abs(o - r);
          var v = r < o ? 1 : -1;
          var h = f + c;
          for (i = i || 1; i <= 1 ? t.px(n, r, u, e) : t.rect(n - (i >> 1), r - (i >> 1), i, i, u, e), n !== a || r !== o;) {
            var d = 2 * h;
            if (d >= c) {
              h += c;
              n += l;
            }
            if (d <= f) {
              h += f;
              r += v;
            }
          }
        }, ell: function (n, r, a, o, u, e) {
          for (var i = Math.floor(r - o); i <= Math.ceil(r + o); i++)
            for (var f = Math.floor(n - a); f <= Math.ceil(n + a); f++) {
              var l = (f + .5 - n) / a;
              var c = (i + .5 - r) / o;
              if (!(l * l + c * c > 1))
                if ("function" == typeof u) {
                  var v = u(f, i, l, c);
                  if (v) {
                    t.px(f, i, v, e);
                  }
                }
                else {
                  t.px(f, i, u, e);
                }
            }
        }, each: function (a, o, u, e, i) {
          for (var f = Math.max(0, 0 | o); f < Math.min(r, e); f++)
            for (var l = Math.max(0, 0 | a); l < Math.min(n, u); l++) {
              var c = i(l, f);
              if (c) {
                t.px(l, f, c, c.length > 3 ? c[3] : 1);
              }
            }
        }, vien: function (t, o) {
          for (var u = [], e = 0; e < r; e++)
            for (var i = 0; i < n; i++) {
              var f = 4 * (e * n + i);
              if (!(a[f + 3] < 128)) {
                if ((0 === i || a[f - 4 + 3] < 128 || i === n - 1 || a[f + 4 + 3] < 128 || 0 === e || a[f - 4 * n + 3] < 128 || e === r - 1 || a[f + 4 * n + 3] < 128)) {
                  u.push(f);
                }
              }
            }
          for (var l = 0; l < u.length; l++) {
            var c = u[l];
            a[c] *= t;
            a[c + 1] *= t * (o && o.lam ? 1.02 : 1);
            a[c + 2] *= t * (o && o.lam ? 1.08 : 1);
          }
        }, flush: function (t) {
          var o = t.createImageData(n, r);
          o.data.set(a);
          t.putImageData(o, 0, 0);
        } };
      return t;
    };
    A.dan = function (n, r, a, t) {
      var o = n.anh.data;
      var u = n.W;
      var e = n.H;
      var i = r.buf;
      var f = r.W;
      var l = r.H;
      a = Math.round(a);
      t = Math.round(t);
      for (var c = 0; c < l; c++) {
        var v = t + c;
        if (!(v < 0 || v >= e)) {
          for (var h = 0; h < f; h++) {
            var d = a + h;
            if (!(d < 0 || d >= u)) {
              var g = 4 * (c * f + h);
              var y = i[g + 3];
              if (y) {
                var s = 4 * (v * u + d);
                if (255 !== y) {
                  var m = y / 255;
                  o[s] += (i[g] - o[s]) * m;
                  o[s + 1] += (i[g + 1] - o[s + 1]) * m;
                  o[s + 2] += (i[g + 2] - o[s + 2]) * m;
                }
                else {
                  o[s] = i[g];
                  o[s + 1] = i[g + 1];
                  o[s + 2] = i[g + 2];
                  o[s + 3] = 255;
                }
              }
            }
          }
        }
      }
    };
    A.khaiVat = function (r, a, t, o, u, e, i) {
      var f = n.ObjectArt && n.ObjectArt.defs;
      if (!f) {
        return null;
      }
      var l = { w: a, h: t, ax: o, ay: u, variants: (e = e || {}).variants || 1, density: 2, noExternal: !0, noShadow: !1 !== e.boBong };
      if (e.frames) {
        l.variants = e.frames;
        l.animated = !0;
        l.fps = e.fps || 6;
      }
      l.draw = function (n, r, o) {
        var u = A.Spr(2 * a, 2 * t);
        if (e.frames) {
          i(u, o % e.frames, e.kieu || 0, e);
        }
        else {
          i(u, o, e.kieu || 0, e);
        }
        u.flush(n);
      };
      f[r] = l;
      return l;
    };
    A.CODE = x;
    A.viec = function (n, r, a) {
      a.ten = r;
      n.viec.splice(1 + n.chen++, 0, a);
    };
    var Y = { data: null, layer: null, loi: !1 };
    function Z() {
      return !(!n.Utils || !n.Utils.canvas || "undefined" == typeof document);
    }
    function $(n) {
      return !(!n || n.id !== M || f.laCuaTa && !f.laCuaTa(n));
    }
    function nn(n) {
      Y.loi = !0;
      if ("undefined" != typeof console) {
        console.error("[PNTT] Không dựng được nền " + M + ":", n);
      }
    }
    function rn(n) {
      Y.data = n;
      Y.layer = null;
      Y.loi = !1;
      try {
        Y.layer = J(n);
      }
      catch (n) {
        nn(n);
      }
    }
    p.chuanBiTruoc = function (n) {
      if ($(n) && Z()) {
        if (!(Y.data === n && (Y.layer || Y.loi))) {
          Y.data = n;
          Y.layer = null;
          Y.loi = !1;
          setTimeout(function r() {
            if (Y.data === n && !Y.loi) {
              try {
                if (!Y.layer) {
                  rn(n);
                  return void setTimeout(r, 0);
                }
                if (Y.layer.dangHien) {
                  return;
                }
                if (!(Q(Y.layer, i() + 12))) {
                  setTimeout(r, 0);
                }
              }
              catch (n) {
                nn(n);
              }
            }
          }, 0);
        }
      }
    };
    p.choXong = function (n) {
      if (!$(n) || Y.data !== n || Y.loi) {
        return !0;
      }
      var r = Y.layer;
      return !(!r || !r.xong && !r.dangHien);
    };
    p.nha = function (n) {
      var r = !(!Y.layer || !Y.layer.dangHien);
      if (!(!Y.data || Y.data === n || null != n && r)) {
        Y.data = null;
        Y.layer = null;
        Y.loi = !1;
        N();
      }
      if (!($(n))) {
        N();
      }
    };
    p.layerFor = function (n) {
      var r = n && n.data;
      return $(r) ? Z() && p.nen ? (Y.data === r && (Y.layer || Y.loi) || rn(r), Y.loi ? null : Y.layer) : null : (Y.data && Y.layer && Y.layer.dangHien && (Y.data = null, Y.layer = null), null);
    };
    p.dangDung = function (n) {
      return !(!(n && n.data && $(n.data) && Y.data === n.data && Y.layer) || Y.loi);
    };
    p.sanSang = function (n) {
      return !(Y.data !== n || !Y.layer || !Y.layer.xong);
    };
    p.lop = function (n) {
      return Y.data === n && Y.layer && Y.layer.xong ? Y.layer : null;
    };
    p.nuongTiep = function (n) {
      if (!n) {
        return !1;
      }
      try {
        Q(n, 0);
      }
      catch (n) {
        throw nn(n), n;
      }
      return !n.xong && !Y.loi;
    };
    p.draw = function (n, r, a, t, o, u) {
      if (r.dangHien = !0, !r.xong) {
        try {
          Q(r, 0);
        }
        catch (n) {
          nn(n);
        }
        if (!r.xong) {
          return !1;
        }
      }
      var e = Math.max(0, Math.floor(a));
      var i = Math.min(r.W, Math.ceil(a + o) + 1);
      var f = Math.max(0, Math.floor(t));
      var l = Math.min(r.H, Math.ceil(t + u) + 1);
      if (i > e && l > f) {
        n.drawImage(r.canvas, e, f, i - e, l - f, e - a | 0, f - t | 0, i - e, l - f);
      }
      return !0;
    };
    p.drawFx = function (n, r, a, t, o, u, e, i) {
      var f = r && r.data;
      if (!(!$(f) || !p.veFx || i <= 0)) {
        p.veFx(n, r, a, t, o, u, e || 0, i, p.lop(f));
      }
    };
    p._taoLop = J;
    p._chayViec = Q;
    p.laCuaTa = $;
    r.ds.push(p);
    r.ban[M] = p;
    return p;
  };
  r.veNen = function (n, a, t, o, u, e, i) {
    for (var f = 0; f < r.ds.length; f++) {
      var l = r.ds[f];
      var c = l.layerFor(n);
      if (c && !1 !== l.draw(a, c, t, o, u, e, i)) {
        return !0;
      }
    }
    return !1;
  };
  r.doiVat = function (n) {
    for (var a = 0; a < r.ds.length; a++) {
      var t = r.ds[a];
      if (t.doiVat && t.laCuaTa(n.data)) {
        t.doiVat(n);
      }
    }
  };
  r.drawFx = function (n, a, t, o, u, e, i, f) {
    for (var l = 0; l < r.ds.length; l++)
      r.ds[l].drawFx(n, a, t, o, u, e, i, f);
  };
  r.dangDung = function (n) {
    for (var a = 0; a < r.ds.length; a++)
      if (r.ds[a].dangDung(n)) {
        return !0;
      }
    return !1;
  };
  var M = {};
  r.quang = function (r, a) {
    var t = r[0] + "," + r[1] + "," + r[2] + "|" + a;
    var o = M[t];
    if (o) {
      return o;
    }
    for (var u = n.Utils.canvas(2 * a, 2 * a), e = u.ctx.createRadialGradient(a, a, 0, a, a, a), i = 0; i <= 8; i++) {
      var f = i / 8;
      var l = Math.pow(1 - f, 2.1);
      e.addColorStop(f, "rgba(" + r[0] + "," + r[1] + "," + r[2] + "," + l.toFixed(3) + ")");
    }
    u.ctx.fillStyle = e;
    u.ctx.fillRect(0, 0, 2 * a, 2 * a);
    return M[t] = u.canvas;
  };
  r.halo = function (n, a, t, o, u, e) {
    if (!(e <= .01)) {
      n.globalAlpha = e > 1 ? 1 : e;
      n.drawImage(r.quang(a, t), o - t, u - t);
    }
  };
}(window.PNTT);
