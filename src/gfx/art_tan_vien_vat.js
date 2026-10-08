!function (a) {
  "use strict";
  var r = a.ObjectArt;
  var t = a.TanVienNha;
  var n = t && t.kit;
  if (r && r.defs && n) {
    var o = 2 * Math.PI;
    var i = Math.PI;
    var e = n.Spr;
    var f = n.bac;
    var u = n.mix;
    var l = n.h01;
    var h = n.vn;
    var c = n.bayer;
    var v = (n.clamp, a.TanVienVat = { DAI: "tv_dai_da", LO: "tv_dan_lo", TUYEN: "tv_linh_tuyen", KHUNG: 4, BANG: { dai_da: "tv_dai_da", dan_lo: "tv_dan_lo", linh_tuyen: "tv_linh_tuyen" }, DAI_TAM: { x: 0, y: -6.5 }, LO_MIENG: { x: 0, y: -40.6 }, LO_CUA: { x: 0, y: -6 }, TUYEN_BON: { x: 4, y: -10.5 }, TUYEN_VOI: { x: 8.5, y: -23.5 } });
    var M = [[14, 58, 70], [26, 112, 128], [52, 176, 176], [128, 230, 214], [226, 255, 246]];
    var s = [[26, 22, 20], [58, 52, 46], [96, 86, 70], [142, 126, 94], [190, 170, 122]];
    var d = [[40, 14, 8], [190, 52, 20], [244, 128, 36], [255, 196, 70], [255, 240, 150]];
    _(v.DAI, 60, 34, 30, 22, 3, function (a, r, t) {
      var n;
      var e = p(30);
      var c = p(15.5);
      var v = p(28);
      var M = p(10.6);
      var s = p(3.4);
      var d = .5 + .5 * Math.sin(t / 4 * o);
      for (x(a, e + p(1.5), c + s + p(2.2), v + p(2.5), M + p(1.6), .5), n = s; n >= 1; n--)
        a.ell(e, c + n, v, M, function (a, t, o) {
          var i = p(5.2);
          var e = Math.floor((a + .5) / i);
          var u = (a + .5) % i;
          var h = 1.8 + .8 * (l(e, 1, 201) - .5) - n / s * .9 - .35 * o;
          if (u < 1) {
            h -= .9;
          }
          return f(r.da, h, a, t);
        });
      var _ = [7, 6, 5, 4, 3, 2, 1, 0];
      for (a.ell(e, c, v, M, function (a, t, n, e) {
        var c;
        var v;
        var M = Math.sqrt(n * n + e * e);
        var s = Math.atan2(e, n);
        var p = .5 * -(.55 * n + .8 * e);
        if (M > .84) {
          var x = (s + i) / o * 18;
          var y = Math.floor(x);
          var b = x - y;
          c = 2.5 + 1 * (l(y, 2, 202) - .5) + p;
          if ((b < .07 || b > .95)) {
            c -= 1;
          }
          if (M > .965) {
            c -= .8;
          }
          v = f(r.da, c, a, t);
          if (h(.17 * a, .22 * t, 203) > .58 && e > -.25) {
            v = u(v, r.rieu, .6);
          }
          return v;
        }
        if (M > .79) {
          return f(r.da, .9 + .5 * p, a, t);
        }
        c = 3 + p + .6 * (h(.09 * a, .14 * t, 204) - .5);
        var E = 0;
        if (Math.abs(M - .66) < .026) {
          E = 1;
        }
        else if (M > .36 && M < .56) {
          var N = (s + i) / (i / 4);
          var T = Math.round(N) % 8;
          var A = Math.abs(N - Math.round(N)) * (i / 4);
          if (A < .2) {
            var U = M < .4 ? 0 : M < .48 ? 1 : 2;
            var I = _[T] >> U & 1;
            if (Math.abs(M - [.385, .45, .515][U]) < .02 && (I || A > .05)) {
              E = 1;
            }
          }
        }
        if (M < .2) {
          var O;
          var g = n / .2;
          var G = e / .2;
          O = g * g + (G + .5) * (G + .5) <= .016 ? 1 : g * g + (G - .5) * (G - .5) <= .016 || g * g + (G + .5) * (G + .5) <= .25 ? 0 : g * g + (G - .5) * (G - .5) <= .25 ? 1 : g < 0 ? 0 : 1;
          return f(r.da, O ? 4 : 1, a, t);
        }
        if (v = f(r.da, c, a, t), E) {
          return u(f(r.da, .6, a, t), [172, 240, 255], .3 + .6 * d);
        }
        var m = Math.abs(M - .66);
        if (m < .14) {
          v = u(v, [150, 226, 250], (.03 + .1 * d) * (1 - m / .14));
        }
        return v;
      }), n = 0; n < 3; n++) {
        var y = e + (l(n, 3, 205) - .5) * v * .9;
        var b = c + (l(n, 4, 206) - .5) * M * .8;
        if (!(Math.hypot((y - e) / v, (b - c) / M) < .5)) {
          a.line(y, b, y + (l(n, 5, 207) - .5) * p(9), b + (l(n, 6, 208) - .5) * p(3), r.da[0], .55, 1);
        }
      }
      [[2.2, 1], [2.55, .8], [1.45, .9]].forEach(function (t, n) {
        for (var o = t[0], i = e + Math.cos(o) * v * .96, f = c + Math.sin(o) * M * .96 + 1, u = -2; u <= 2; u++)
          a.line(i + u, f, i + 1.6 * u, f - p(2.6 + 2.4 * l(n, u, 209)) * t[1], 1 & u ? r.co[3] : r.co[2], 1, 1);
      });
      [[1.7, 0], [2.4, 1], [.95, 2]].forEach(function (r) {
        var t = e + Math.cos(r[0]) * v * .93;
        var n = c + Math.sin(r[0]) * M * .93 - 1;
        var o = [[250, 246, 236], [242, 190, 210], [246, 226, 120]][r[1]];
        a.rect(t - 1, n - 1, 3, 1, o);
        a.rect(t, n - 2, 1, 3, o);
        a.px(t, n - 1, [232, 190, 60]);
      });
    });
    _(v.LO, 54, 58, 27, 58, 5, function (a, r, t) {
      var n;
      var e;
      var c;
      var v = .5 + .5 * Math.sin(t / 4 * o);
      x(a, p(27) + 2, p(55.4), p(23), p(4), .55);
      var M = p(9);
      var _ = p(45);
      var y = p(38);
      var b = p(54.5);
      var E = p(4.2);
      var N = p(27);
      var T = p(48);
      for (c = y; c < b; c++)
        for (e = M; e < _; e++) {
          var A = Math.floor((c - y) / E);
          var U = (c - y) % E;
          var I = (1 & A) * p(4);
          var O = p(7);
          var g = Math.floor((e - M + I) / O);
          var G = (e - M + I) % O;
          var m = 2.1 + .9 * (l(g, A, 301) - .5) - (e - N) / p(18) * .55 + (U >= E - 1 ? .45 : 0);
          if ((U < 1 || G < 1)) {
            m -= 1.1;
          }
          if (c > b - 3) {
            m -= .5;
          }
          var q = f(r.da, m, e, c);
          var w = Math.hypot((e - N) / 2, (c - T) / 2);
          if (w < 11) {
            q = u(q, [255, 150, 60], (1 - w / 11) * (.3 + .12 * v));
          }
          a.px(e, c, q);
        }
      function V(a, r) {
        var t = a - N;
        var n = r - T;
        return Math.abs(t) <= p(6) && (r >= T || t * t + n * n <= p(6) * p(6)) && r < p(54.5);
      }
      for (a.ell(N, p(38), p(18.5), p(5), function (a, t, n, o) {
        return f(r.da, 3 - .5 * n - .5 * o + .5 * (l(a >> 2, t >> 2, 302) - .5), a, t);
      }), c = p(42); c < p(54.5); c++)
        for (e = N - p(6); e <= N + p(6); e++)
          if (V(e, c)) {
            var L = (c - p(42)) / (p(54.5) - p(42));
            a.px(e, c, u(d[0], [96, 28, 10], .7 * L));
          }
      for (n = 0; n < 3; n++) {
        var P = N + (n - 1) * p(3.4);
        var Y = p(5.4 + 2.4 * Math.sin(1.7 * t + 2.1 * n) + (1 === n ? 2 : 0));
        var B = p(2.1);
        var D = P + p(.7 * Math.sin(1.3 * t + n));
        a.poly([[P - B, p(54.5)], [P - .5 * B, p(54.5) - .55 * Y], [D, p(54.5) - Y], [P + .5 * B, p(54.5) - .5 * Y], [P + B, p(54.5)]], d[2]);
        a.poly([[P - .6 * B, p(54.5)], [D, p(54.5) - .72 * Y], [P + .6 * B, p(54.5)]], d[3]);
        a.poly([[P - .25 * B, p(54.5)], [D, p(54.5) - .4 * Y], [P + .25 * B, p(54.5)]], d[4]);
      }
      for (e = N - p(5); e <= N + p(5); e += 2)
        a.rect(e, p(53.4), 2, 2, l(e, t, 303) < .5 ? d[1] : d[2]);
      for (c = p(41.4); c < p(54.5); c++)
        for (e = N - p(7); e <= N + p(7); e++)
          if (!V(e, c)) {
            var H = e - N;
            var K = c - T;
            if (Math.abs(H) <= p(7) && (c >= T || H * H + K * K <= p(7) * p(7)) && !(Math.abs(H) <= p(6) && (c >= T || H * H + K * K <= p(6) * p(6)))) {
              a.px(e, c, f(r.da, 1.2 + (c < T ? 1.3 : 0), e, c));
            }
          }
      for ([[12, 15.6], [38.4, 42]].forEach(function (r) {
        a.rect(p(r[0]), p(35.4), p(r[1] - r[0]), p(5), s[1]);
        a.rect(p(r[0]), p(35.4), 2, p(5), s[2]);
      }), a.ell(p(27), p(27), p(17.5), p(12.5), function (a, r, t, n) {
        var o = 2.5 - .9 * (.9 * t + .5 * n) - .8 * Math.max(0, n) + .6 * (h(.12 * a, .16 * r, 304) - .5);
        if (Math.abs(n - .12) < .1) {
          o += .45 + (a >> 1 & 1 ? 0 : -.4);
        }
        var i = f(s, o, a, r);
        if (n > .1 && h(.1 * a, .1 * r, 305) > .6) {
          i = u(i, [74, 134, 108], .42);
        }
        return i;
      }), function (a, r, t, n, o, i) {
        a.ell(r, t, n, .72 * n, function (a, r, t, n) {
          return t * t + (n + .5) * (n + .5) <= .012 ? o : t * t + (n - .5) * (n - .5) <= .012 || t * t + (n + .5) * (n + .5) <= .25 ? i : t * t + (n - .5) * (n - .5) <= .25 ? o : t < 0 ? i : o;
        });
      }(a, p(27), p(28.4), p(3.5), s[4], s[0]), a.ell(p(27), p(17), p(18.2), p(5.2), function (a, r, t, n) {
        return f(s, 3.2 - .5 * (t + n) - (n > .55 ? .9 : 0), a, r);
      }), a.ell(p(27), p(17.4), p(15), p(3.7), function (a, r, n, o) {
        var i = 2.5 - 1.2 * Math.sqrt(n * n + o * o) + (Math.abs(n + .35) + Math.abs(o + .35) < .3 ? .9 : 0) + .7 * (h(.2 * a + 2 * t, .3 * r, 306) - .5);
        return f([[12, 56, 48], [28, 110, 92], [60, 176, 138], [136, 226, 180], [220, 255, 232]], i, a, r);
      }), n = 0; n < 3; n++) {
        var k = (.37 * n + .25 * t) % 1;
        var S = p(27) + (k - .5) * p(20);
        var j = p(17.4) + Math.sin(2.3 * n + 1.1 * t) * p(1.3);
        a.px(S - 1, j, [226, 255, 238]);
        a.px(S + 1, j, [226, 255, 238]);
        a.px(S, j - 1, [226, 255, 238]);
        a.px(S, j + 1, [120, 200, 160]);
      }
      for ([-1, 1].forEach(function (r) {
        a.ell(p(27 + 19.8 * r), p(14.5), p(3.2), p(5), function (a, t, n, o) {
          return Math.sqrt(n * n + o * o) > .52 ? f(s, 2.4 - .8 * n * r * -1 + (o < -.3 ? .6 : 0), a, t) : null;
        });
      }), a.ell(p(49.6), p(47), p(4.2), p(7.6), function (a, r, t, n) {
        return f(s, 2.7 - .7 * t - .5 * n, a, r);
      }), a.ell(p(47.8), p(44.4), 2.2, 2.2, s[4]), a.ell(p(5.2), p(46), p(4.6), p(4.6), function (a, r, t, n) {
        var e = Math.atan2(n, t);
        return 1 & Math.floor((e + i) / o * 12) ? [212, 186, 110] : [170, 140, 76];
      }), a.line(p(5.2), p(50.6), p(5.2), p(54.6), r.go[2], 1, 2), n = 0; n < 3; n++) {
        var C = p(51.4) + n * p(1.2) * 1;
        var z = p(34) + 3 * (1 & n);
        a.rect(z, C, p(10.4) - 3 * (1 & n), p(1.3) + 1, r.go[1 + (1 & n)]);
        a.rect(z, C, p(10.4) - 3 * (1 & n), 1, r.go[3]);
      }
      a.vien(r.vien, .55);
    });
    _(v.TUYEN, 56, 50, 28, 50, 4, function (a, r, t) {
      var n;
      var e;
      var v;
      var s = p(32);
      var d = p(40);
      for (x(a, s + 2, p(47.4), p(19), p(3.6), .5), a.ell(s, d - p(1), p(22), p(9), function (a, r, t, n) {
        return .28 * (1 - t * t - n * n) > .28 * c(a, r) ? [120, 230, 226] : null;
      }, .45), [[21, 33, 16, 7], [11, 30, 9, 8.5], [20, 26, 10.5, 9], [29.5, 28.5, 7, 7]].forEach(function (t, n) {
        a.ell(p(t[0]), p(t[1]), p(t[2]), p(t[3]), function (a, t, o, i) {
          var e = 2.3 - .7 * (.6 * o + .8 * i) + .9 * (h(.12 * a, .16 * t, 400 + n) - .5);
          if (l(a >> 2, t >> 1, 410 + n) < .05) {
            e -= .8;
          }
          if ((t + (a >> 2)) % p(4.4) < 1) {
            e -= .75;
          }
          var c = f(r.da, e, a, t);
          if (i < -.1 && h(.14 * a, .2 * t, 420 + n) > .34) {
            c = u(c, r.rieu, .7);
          }
          return c;
        });
      }), e = 0; e < 4; e++) {
        var _ = p(6 + 3.4 * e);
        var y = p(38 - (1 & e));
        for (n = -3; n <= 3; n++)
          a.line(_, y, _ + 2.2 * n, y - p(3.6) + Math.abs(n), 1 & n ? r.co[3] : r.co[2], 1, 1);
      }
      a.line(p(26.5), p(21.4), p(36), p(25), r.tre[0], 1, 5);
      a.line(p(26.5), p(21.4), p(36), p(25), r.tre[2], 1, 3);
      a.line(p(26.5), p(21), p(36), p(24.6), r.tre[4], .9, 1);
      a.rect(p(31) - 1, p(22.6), 2, 5, r.tre[1]);
      var b = p(36.4);
      var E = p(26.6);
      var N = p(37.4);
      for (v = E; v < N; v++) {
        var T = (v - E) / (N - E);
        var A = ((v >> 1) + 2 * t) % 4 < 2;
        a.px(b, v, A ? [236, 255, 252] : M[3]);
        a.px(b + 1, v, A ? M[3] : M[2]);
        if (T > .5) {
          a.px(b - 1, v, M[2], .7);
        }
      }
      var U = p(16);
      var I = p(6.4);
      var O = p(3.4);
      for (e = O; e >= 1; e--)
        a.ell(s, d + e, U, I, function (a, t, n) {
          var o = p(5);
          var i = Math.floor((a + .5) / o);
          var u = (a + .5) % o;
          var h = 1.8 + .8 * (l(i, 7, 430) - .5) - e / O * .9 - .3 * n;
          if (u < 1) {
            h -= .9;
          }
          return f(r.da, h, a, t);
        });
      a.ell(s, d, U, I, function (a, n, e, c) {
        var v = Math.sqrt(e * e + c * c);
        if (v > .8) {
          var s = (Math.atan2(c, e) + i) / o * 12;
          var d = Math.floor(s);
          var x = s - d;
          var _ = 2.6 + .9 * (l(d, 8, 431) - .5) - .45 * (.5 * e + .7 * c);
          if ((x < .08 || x > .94)) {
            _ -= 1;
          }
          if (v > .95) {
            _ -= .7;
          }
          var y = f(r.da, _, a, n);
          if (h(.18 * a, .25 * n, 432) > .66 && c > -.1) {
            y = u(y, r.rieu, .6);
          }
          return y;
        }
        var E = (a - b) / (.5 * U);
        var N = (n - p(38.2)) / (.5 * I);
        var T = Math.sqrt(E * E + N * N);
        var A = 1.6 + 2.6 * (.8 - v) + 1.6 * Math.max(0, 1 - T) + .7 * (h(.16 * a + 1.5 * t, .3 * n, 433) - .5);
        var O = (.27 * t + .1) % 1;
        if (Math.abs(T - 2.4 * O) < .13 && O < .9) {
          A += 1 * (1 - O);
        }
        return f(M, A, a, n);
      });
      [[15.5, 43.5, 4.6, 1], [20.4, 41.4, 3.6, 0], [11.6, 41.2, 3.2, 2]].forEach(function (r, n) {
        var o = p(r[0]);
        var i = p(r[1]);
        var e = p(.5 * r[2]);
        var f = p(1.9 * r[2]);
        a.poly([[o - e, i], [o - e, i - .78 * f], [o, i - f], [o + e, i - .78 * f], [o + e, i]], function (a, r) {
          return a < o ? !(t + n & 3) && r < i - .6 * f ? [236, 255, 252] : [150, 238, 232] : [60, 168, 188];
        });
        a.line(o, i - f, o, i, [200, 250, 248], .8, 1);
        a.ell(o, i + 1, e + 2, 2, [14, 60, 66], .6);
      });
      [[22.5, 45.6], [46.2, 43.4]].forEach(function (r, t) {
        var n = p(r[0]);
        var o = p(r[1]);
        a.ell(n, o + 2, 5, 2, [58, 120, 74]);
        [-2, 0, 2].forEach(function (r) {
          a.poly([[n + r - 2, o + 1], [n + r, o - 4 - (0 === r ? 2 : 0)], [n + r + 2, o + 1]], t ? [250, 214, 232] : [255, 246, 248]);
        });
        a.px(n, o - 1, [240, 200, 80]);
      });
      a.vien(r.vien, .55);
    });
    v.doiVat = function (a) {
      var t = a && a.data;
      if (!t || "tan_vien" !== t.id) {
        return 0;
      }
      for (var n = 0, o = (a.props || []).concat(a.flatProps || []), i = 0; i < o.length; i++) {
        var e = v.BANG[o[i].id];
        if (e) {
          o[i].art = e;
          for (var f = 0; f < v.KHUNG; f++)
            r.get(e, f);
          n++;
        }
      }
      return n;
    };
  }
  function p(a) {
    return Math.round(2 * a);
  }
  function x(a, r, t, n, o, i) {
    a.ell(r, t, n, o, function (a, r, t, n) {
      return (1 - (t * t + n * n)) * i > c(a, r) * i ? [10, 14, 8] : null;
    }, .6);
  }
  function _(a, n, o, i, f, u, l) {
    r.defs[a] = { w: n, h: o, ax: i, ay: f, variants: v.KHUNG, density: 2, animated: !0, fps: u, noExternal: !0, noShadow: !0, draw: function (a, r, i) {
        var f = e(2 * n, 2 * o);
        l(f, t.kit.bangMau(0), (i % 4 + 4) % 4);
        f.flush(a);
      } };
  }
}(window.PNTT);
