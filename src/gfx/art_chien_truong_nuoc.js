!function (a) {
  "use strict";
  var r = a.ChienTruongArt;
  if (r && r.ct) {
    for (var o = r.ct, n = r.kit, f = o.T, t = o.KL, e = n.dai, i = n.hashU, d = 12, u = 128, m = 768, v = new Float32Array(m), c = 0; c < m; c++)
      v[c] = Math.sin(c / m * Math.PI * 2);
    var h = { 1: { mau: ["#0a355f", "#0e4676", "#175a90", "#4aa4d0", "#072a4c", "#d8f4ff"].map(l), song: [[1, 3, -1, .5], [-1, 5, 1, .5], [2, -7, -1, .4], [0, 9, -2, .3], [3, 2, 1, .2], [1, -11, 2, .2]], dinh: .4, day: .46, bd: .04, lap: .0016, doi: .1 }, 2: { mau: ["#124a6b", "#18607f", "#237896", "#6ac0d6", "#0d3b58", "#e6fbff"].map(l), song: [[0, 4, -1, .5], [1, 6, -1, .5], [-1, 9, -2, .35], [2, -5, 1, .3], [0, 11, -2, .25], [3, 3, -1, .15]], dinh: .4, day: .46, bd: .04, lap: .0022, doi: .1 }, 3: { mau: ["#15516a", "#1d667f", "#2a7f95", "#74c8d2", "#103f56", "#effffe"].map(l), song: [[1, 3, -1, .4], [-1, 5, 1, .5], [1, 8, -1, .4], [2, -6, 1, .3], [0, 10, 2, .2]], dinh: .42, day: .46, bd: .04, lap: .0018, doi: .08 }, 4: { mau: ["#0f2218", "#16301f", "#1f4129", "#4f7a4e", "#0b1912", "#b8e8a8"].map(l), song: [[1, 2, -1, .5], [-1, 4, 1, .4], [2, 5, -1, .3]], dinh: .48, day: .5, bd: .04, lap: 8e-4, doi: .08 }, 5: { mau: ["#187a96", "#2090a8", "#35a8ba", "#9ee2e8", "#136b86", "#ffffff"].map(l), song: [[0, 4, -1, .5], [1, 7, -2, .5], [-1, 9, -1, .35], [2, -5, 2, .3], [0, 12, -2, .25]], dinh: .38, day: .44, bd: .045, lap: .0026, doi: .1 } };
    var g = e(["#010208", "#02040e", "#040816", "#070d24", "#0b1434", "#101c48", "#18285e"], 7);
    o.jobNuoc = function (r, o) {
      for (var n = r.stNuoc || (r.stNuoc = { k: 1, f: 0, pad: null, kieu: {} }); n.k <= 6;) {
        if (!(6 === n.k ? p(o, n) : s(n.k, o, n))) {
          return !1;
        }
        n.kieu[n.k] = n.pad.canvas;
        n.k++;
        n.f = 0;
        n.pad = null;
      }
      r.nuocTam = n.kieu;
      var f;
      var e = r.TW;
      var i = r.TH;
      var d = r.cls;
      var u = r.dia && r.dia.wk;
      var m = e * i;
      var v = r.nuocO = new Uint8Array(m);
      for (f = 0; f < m; f++) {
        var c = d[f];
        var h = 0;
        if (c === t.VUC) {
          h = 6;
        }
        else {
          if (c === t.NUOC || c === t.BIEN || c === t.CAN) {
            h = u && u[f] || (c === t.BIEN ? 1 : 2);
          }
          else {
            if (!(c !== t.CAUN && c !== t.CAUD)) {
              h = 1 === r.duoiCau[f] ? 6 : u && u[f] || 2;
            }
          }
        }
        v[f] = h;
      }
      for (f = 0; f < m; f++)
        if ((d[f] === t.CAUN || d[f] === t.CAUD) && 2 === r.duoiCau[f]) {
          for (var g = f % e, l = f / e | 0, b = 0, N = 1; N <= 4 && !b; N++)
            for (var I = -N; I <= N && !b; I++)
              for (var k = -N; k <= N; k++) {
                var w = g + k;
                var U = l + I;
                if (!(w < 0 || U < 0 || w >= e || U >= i)) {
                  var C = d[U * e + w];
                  if ((C === t.NUOC || C === t.BIEN) && u && u[U * e + w]) {
                    b = u[U * e + w];
                    break;
                  }
                }
              }
          v[f] = b || 2;
        }
      if (!r.mangNuoc) {
        for (var y = 256, T = a.Utils.canvas(y, y), x = T.ctx.createImageData(y, y), A = x.data, D = 0; D < y; D++)
          for (var E = 0; E < y; E++) {
            var S = .62 * M(E / 21, D / 21, 3001) + .38 * M(E / 8.5, D / 8.5, 3011);
            var O = 4 * (D * y + E);
            if (S > .12) {
              A[O] = 96;
              A[O + 1] = 176;
              A[O + 2] = 224;
              A[O + 3] = Math.min(60, 120 * (S - .12));
            }
            else {
              if (S < -.08) {
                A[O] = 3;
                A[O + 1] = 18;
                A[O + 2] = 46;
                A[O + 3] = Math.min(84, 190 * (-.08 - S));
              }
            }
          }
        T.ctx.putImageData(x, 0, 0);
        r.mangNuoc = T.canvas;
      }
      var B = r.nuocVien = new Uint8Array(m);
      for (f = 0; f < m; f++)
        if (!v[f]) {
          for (var V = f % e, H = f / e | 0, P = 0, W = -1; W <= 1 && !P; W++)
            for (var j = -1; j <= 1; j++)
              if (D = H + W, !((E = V + j) < 0 || D < 0 || E >= e || D >= i) && v[D * e + E]) {
                P = v[D * e + E];
                break;
              }
          B[f] = P;
        }
      return !0;
    };
    o.veNen = function (a, r, o, n, t, e, i, m) {
      var v = r.nuocTam;
      if (v) {
        var c = r.TW;
        var h = r.TH;
        var g = r.nuocO;
        var l = r.nuocVien;
        var s = Math.max(0, Math.floor(o / f) - 1);
        var b = Math.max(0, Math.floor(n / f) - 1);
        var M = Math.min(c - 1, Math.floor((o + t) / f) + 1);
        var p = Math.min(h - 1, Math.floor((n + e) / f) + 1);
        var I = m > 0 ? (Math.floor(5 * i) % d + d) % d : 0;
        var k = m > 0 ? (Math.floor(3 * i) % d + d) % d : 0;
        var w = a.imageSmoothingEnabled;
        a.imageSmoothingEnabled = !1;
        var U;
        var C;
        var y;
        var T;
        var x = .32 * o;
        var A = .32 * n;
        for (C = b; C <= p; C++)
          for (U = s; U <= M; U++)
            (T = g[y = C * c + U] || l[y]) && 6 !== T && N(a, v[T], I * u, U * f & 127, C * f & 127, U * f - o, C * f - n);
        if (r.mangNuoc) {
          var D = 16;
          var E = m > 0 ? i : 0;
          var S = Math.max(0, (o + 5 * E) / D);
          var O = Math.max(0, (n + 2 * E) / D);
          var B = Math.min(256 - S, t / D + 1);
          var V = Math.min(256 - O, e / D + 1);
          if (B > 1 && V > 1) {
            a.imageSmoothingEnabled = !0;
            a.drawImage(r.mangNuoc, S, O, B, V, S * D - 5 * E - o, O * D - 2 * E - n, B * D, V * D);
            a.imageSmoothingEnabled = !1;
          }
        }
        for (C = b; C <= p; C++)
          for (U = s; U <= M; U++)
            if (6 === (T = g[y = C * c + U] || l[y])) {
              var H = ((U * f + x) % u + u) % u | 0;
              var P = ((C * f + A) % u + u) % u | 0;
              N(a, v[6], k * u, H, P, U * f - o, C * f - n);
            }
        a.imageSmoothingEnabled = w;
      }
    };
  }
  function l(a) {
    return n.hex(a);
  }
  function s(r, o, n) {
    var f;
    var t = h[r];
    var e = (n.pad || (n.pad = a.Utils.canvas(1536, u))).ctx;
    var c = 0;
    for (f = 0; f < t.song.length; f++)
      c += t.song[f][3];
    for (var g = t.mau, l = g[5]; n.f < d;) {
      for (var s = e.createImageData(u, u), M = s.data, p = n.f, N = 0; N < u; N++)
        for (var I = 0; I < u; I++) {
          var k = 0;
          for (f = 0; f < t.song.length; f++) {
            var w = t.song[f];
            var U = ((6 * (w[0] * I + w[1] * N) + w[2] * p * 64 + 131 * f) % m + m) % m;
            k += w[3] * v[U];
          }
          var C = (k /= c) > t.doi ? g[2] : k < -t.doi ? g[0] : g[1];
          if (Math.abs(k - t.dinh) < t.bd) {
            C = g[3];
          }
          else {
            if (Math.abs(k + t.day) < .9 * t.bd) {
              C = g[4];
            }
          }
          var y = 1023 & i(I, N, 971 + r);
          if (y < 1024 * t.lap * 12 && (p - 7 * y % d + d) % d < 2) {
            C = l;
          }
          var T = 4 * (N * u + I);
          M[T] = C[0];
          M[T + 1] = C[1];
          M[T + 2] = C[2];
          M[T + 3] = 255;
        }
      if (e.putImageData(s, p * u, 0), n.f++, o && b() > o) {
        return !1;
      }
    }
    return !0;
  }
  function b() {
    return "undefined" != typeof performance ? performance.now() : Date.now();
  }
  function M(a, r, o) {
    var n = Math.floor(a);
    var f = Math.floor(r);
    var t = a - n;
    var e = r - f;
    t = t * t * (3 - 2 * t);
    e = e * e * (3 - 2 * e);
    var d = (1023 & i(n, f, o)) / 511.5 - 1;
    var u = (1023 & i(n + 1, f, o)) / 511.5 - 1;
    var m = (1023 & i(n, f + 1, o)) / 511.5 - 1;
    return (d + (u - d) * t) * (1 - e) + (m + ((1023 & i(n + 1, f + 1, o)) / 511.5 - 1 - m) * t) * e;
  }
  function p(r, o) {
    for (var n = (o.pad || (o.pad = a.Utils.canvas(1536, u))).ctx, f = g, t = f.length - 1; o.f < d;) {
      for (var e = n.createImageData(u, u), c = e.data, h = o.f, l = 0; l < u; l++)
        for (var s = 0; s < u; s++) {
          var M = .28 + .22 * (.5 * (.5 * v[(6 * (s + l) + 64 * h) % m] + .35 * v[(6 * (2 * s - l) + 3072 - 64 * h) % m] + .25 * v[(3 * l * 6 + 128 * h) % m]) + .35 * (.4 * v[(6 * (3 * s + 2 * l) + 64 * h + 200) % m] + .3 * v[(6 * (s - 2 * l + 256) + 128 * h) % m]));
          var p = Math.round(M * t);
          if (p < 0) {
            p = 0;
          }
          else {
            if (p > t) {
              p = t;
            }
          }
          var N = f[p];
          var I = 4 * (l * u + s);
          var k = N[0];
          var w = N[1];
          var U = N[2];
          var C = 2047 & i(s, l + 3 * h & 127, 977);
          if (C < 3) {
            k = 120;
            w = 130;
            U = 240;
          }
          else {
            if (C < 6) {
              k = 80;
              w = 70;
              U = 170;
            }
          }
          c[I] = k;
          c[I + 1] = w;
          c[I + 2] = U;
          c[I + 3] = 255;
        }
      if (n.putImageData(e, h * u, 0), o.f++, r && b() > r) {
        return !1;
      }
    }
    return !0;
  }
  function N(a, r, o, n, f, t, e) {
    var i = Math.min(32, u - n);
    var d = Math.min(32, u - f);
    a.drawImage(r, o + n, f, i, d, t, e, i, d);
    if (i < 32) {
      a.drawImage(r, o, f, 32 - i, d, t + i, e, 32 - i, d);
    }
    if (d < 32) {
      a.drawImage(r, o + n, 0, i, 32 - d, t, e + d, i, 32 - d);
      if (i < 32) {
        a.drawImage(r, o, 0, 32 - i, 32 - d, t + i, e + d, 32 - i, 32 - d);
      }
    }
  }
}(window.PNTT);
