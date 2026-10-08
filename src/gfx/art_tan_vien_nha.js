!function (r) {
  "use strict";
  var n = r.ObjectArt;
  if (n && n.defs) {
    var t = r.TanVienNha = { TEN: "tv_nha_tranh", SW: 116, SH: 96, CX: 58, KHOI: { x: 10, y: -74 }, DEN: { x: 15.4, y: -30 }, KIEU: { "10,9": 3, "16,9": 0, "20,9": 1, "6,17": 2 } };
    var a = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
    var o = [[56, 30, 18], [116, 62, 36], [158, 92, 54], [190, 118, 70], [214, 150, 100]];
    var e = [[[40, 56, 22], [78, 98, 38], [118, 132, 52], [154, 160, 72], [184, 184, 96]], [[44, 52, 24], [86, 94, 38], [126, 120, 52], [160, 146, 76], [190, 172, 100]]];
    n.defs[t.TEN] = { w: 116, h: 96, ax: 58, ay: 96, variants: 4, density: 2, noExternal: !0, noShadow: !0, draw: function (r, n, t) {
        var a = g(232, 192);
        (function (r, n) {
          var t;
          var a;
          var o;
          var e;
          var f;
          var l = s(n);
          t = r;
          a = p(60);
          o = p(93.5);
          e = p(53);
          f = p(4.6);
          t.ell(a, o, e, f, function (r, n, t, a) {
            var o = t * t + a * a;
            return (o < .5 ? .3 : (1 - o) / .5 * .3) > .3 * h(r, n) ? [10, 14, 8] : null;
          }, .7);
          (function (r, n) {
            for (var t = p(88.5), a = p(95), o = p(13), e = p(103), f = o, u = 0; f < e;) {
              for (var l = p(7 + 7 * i(u, 3, 11)), c = Math.min(e, f + l), v = 2 + 1.6 * (i(u, 4, 12) - .5), h = t; h < a; h++)
                for (var M = f; M < c; M++) {
                  var g = v + (.9 - (h - t) / (a - t) * 1.5) + (M - f < 2 ? .5 : 0) - (c - M <= 2 ? .45 : 0);
                  if (h === t) {
                    g += 1;
                  }
                  if (h >= a - 2) {
                    g -= .8;
                  }
                  if (!(M !== f && M !== c - 1 && h !== a - 1)) {
                    g -= 1.1;
                  }
                  r.px(M, h, d(n.da, g, M, h));
                }
              f = c;
              u++;
            }
          })(r, l);
          (function (r, n) {
            for (var t = p(15), a = p(101), o = p(44), e = p(89.5), f = o; f < e; f++)
              for (var l = f / 2, c = t; c < a; c++) {
                var v;
                var h;
                var g = c / 2;
                if (l < 74) {
                  var s = c >> 2;
                  var x = f >> 2;
                  var m = !(s + x & 1);
                  var b = 3 & c;
                  var y = 3 & f;
                  v = 2.2 + .9 * (i(s, x, 21) - .5);
                  if (m) {
                    if (0 === y) {
                      v -= 1.2;
                    }
                    else {
                      v += 3 === y ? .5 : .15;
                    }
                  }
                  else {
                    if (0 === b) {
                      v -= 1.2;
                    }
                    else {
                      v += 3 === b ? .5 : .15;
                    }
                  }
                }
                else {
                  if (l < 76) {
                    v = 1.2 + (1 & c ? .2 : 0);
                  }
                  else {
                    v = 2.4 + 2.1 * (M(.09 * c, .2 * f, 31) - .5) - .04 * (l - 76);
                    if (i(c >> 1, f >> 1, 22) < .05) {
                      v -= .7;
                    }
                  }
                }
                v += -(g - 58) / 90 * .45;
                if (l < 62) {
                  v *= .5 + .5 * u((l - 52) / 10, 0, 1);
                }
                h = d(l < 76 ? n.phen : n.dat, v, c, f);
                r.px(c, f, h);
              }
            for (var E = 0; E < 6; E++) {
              var w = p(20 + 76 * i(E, 1, 41));
              var V = p(78 + 8 * i(E, 2, 42));
              if (!(w > p(46) && w < p(70))) {
                for (var T = 3 + (5 * i(E, 3, 43) | 0), I = w, N = V, j = 0; j < T; j++)
                  r.px(I, N, n.dat[0], .8), I += i(E, j, 44) < .5 ? 0 : 1, N += 1, i(E, j, 45) < .3 && (I -= 1);
              }
            }
          })(r, l);
          m(r, l, 15, 50, 89.5, 3.4);
          m(r, l, 97.6, 50, 89.5, 3.4);
          (function (r, n) {
            var t;
            var a;
            var o = p(24);
            var e = p(40);
            var f = p(59);
            var u = p(71);
            for (a = f; a < u; a++)
              for (t = o; t < e; t++)
                r.px(t, a, c(n.toi, [58, 40, 22], (a - f) / (u - f) * .35));
            r.rect(o + p(5), f, 2, u - f, n.go[2]);
            r.rect(o + p(10), f, 2, u - f, n.go[2]);
            r.rect(o, f + p(5), e - o, 2, n.go[2]);
            r.rect(o - 3, f - 3, e - o + 6, 3, n.go[3]);
            r.rect(o - 3, u, e - o + 6, 3, n.go[1]);
            r.rect(o - 3, f - 3, 3, u - f + 6, n.go[3]);
            r.rect(e, f - 3, 3, u - f + 6, n.go[1]);
            [[o - 3, -1], [e + 3, 1]].forEach(function (t) {
              var a = t[0];
              var o = t[1];
              r.poly([[a, f - 2], [a + o * p(3.6), f - p(1.4)], [a + o * p(3.6), u + p(1.4)], [a, u + 2]], function (r, t) {
                var o = Math.abs(r - a) / p(3.6);
                return d(n.go, 1.7 + .9 * (1 - o) + (t >> 1 & 1 ? .25 : -.15) + .4 * (i(r >> 1, t >> 2, 97) - .5), r, t);
              });
              r.line(a, f + p(3), a + o * p(3.6), f + p(3.4), n.go[0], 1, 1);
              r.line(a, u - p(3), a + o * p(3.6), u - p(2.6), n.go[0], 1, 1);
            });
          })(r, l);
          (function (r, n) {
            var t;
            var a;
            var o = p(79);
            var e = p(93);
            var f = p(58.5);
            var u = p(71);
            for (t = o; t < e; t++)
              for (a = f; a < u; a++) {
                var l = (t - o) % 3;
                var c = 1.9 + .9 * (i(Math.floor((t - o) / 3), 2, 98) - .5) + (0 === l ? -.9 : 1 === l ? .3 : 0);
                r.px(t, a, d(n.go, c, t, a));
              }
            r.line(o + 1, f + p(2), e - 2, u - p(2), n.go[3], 1, 2);
            r.rect(o, f + p(2.2), e - o, 3, n.go[0]);
            r.rect(o, u - p(5), e - o, 3, n.go[0]);
            r.rect(o - 3, f - 3, e - o + 6, 3, n.go[3]);
            r.rect(o - 3, u, e - o + 6, 3, n.go[1]);
            r.rect(o - 3, f - 3, 3, u - f + 6, n.go[3]);
            r.rect(e, f - 3, 3, u - f + 6, n.go[1]);
          })(r, l);
          (function (r, n, t) {
            var a;
            var o;
            var e = p(49);
            var f = p(67);
            var l = p(63);
            var v = p(89.5);
            for (o = l; o < v; o++)
              for (a = e; a < f; a++) {
                var h = (o - l) / (v - l);
                var M = 1.4 * Math.max(0, h - .45) * (1 - .8 * Math.abs((a - (e + f) / 2) / ((f - e) / 2)));
                r.px(a, o, c(n.toi, [92, 58, 26], u(M, 0, .5)));
              }
            if (3 === t) {
              for (a = e; a < f; a++)
                for (o = l; o < v; o++) {
                  var g = (a - e) % 3;
                  var s = 2 + .9 * (i(Math.floor((a - e) / 3), 1, 91) - .5) + (0 === g ? -.9 : 1 === g ? .35 : 0);
                  r.px(a, o, d(n.go, s - (o - l) / (v - l) * .4, a, o));
                }
              for (a = e; a < f; a += 3)
                i(a, 2, 92) < .7 && r.rect(a, l + 2, 1, v - l - 4, [255, 214, 120], .55);
              r.line(e, p(81), f, p(81), n.go[0], 1, 3);
              r.line(e, p(81) - 1, f, p(81) - 1, n.go[3], 1, 1);
              r.line(e, p(68), f, p(68), n.go[0], 1, 3);
              r.line(e, p(68) - 1, f, p(68) - 1, n.go[3], 1, 1);
              r.ell(f - p(3), p(76), 2, 2, [214, 178, 96]);
            }
            else {
              for (o = p(66.5); o < p(74); o++)
                for (a = e; a < f; a++) {
                  var x = Math.floor((a - e) / 3);
                  var b = (a - e) % 3;
                  if (!(2 === b && i(x, 1, 93) < .8)) {
                    var y = 2.4 + (0 === b ? .6 : 0) - (o - p(66.5)) / p(7.5) * .7 + .7 * (i(x, 2, 94) - .5);
                    r.px(a, o, d(n.tre, y, a, o));
                  }
                }
              for (r.rect(e, p(73.6), f - e, 2, n.tre[1]), o = p(63.4); o < p(66.8); o++) {
                var E = (o - p(63.4)) / (p(66.8) - p(63.4));
                for (a = e; a < f; a++)
                  r.px(a, o, d(n.tre, 3.4 - 2.6 * Math.abs(E - .35) + (a >> 2 & 1 ? .15 : 0), a, o));
              }
              r.rect(e + p(3), p(63.2), 2, p(3.8), n.go[1]);
              r.rect(f - p(3) - 2, p(63.2), 2, p(3.8), n.go[1]);
            }
            for (m(r, n, 46.6, 60, 89.5, 2.6), m(r, n, 67, 60, 89.5, 2.6), o = p(58.8); o < p(63.4); o++)
              for (a = p(45); a < p(71.6); a++) {
                var w = (o - p(58.8)) / (p(63.4) - p(58.8));
                r.px(a, o, d(n.go, 2.6 + (w < .3 ? 1 : 0) - 1.3 * w + .4 * (i(a >> 2, 3, 95) - .5), a, o));
              }
            for (o = p(89.2); o < p(93.5); o++)
              for (a = p(45); a < p(71); a++) {
                var V = 3.2 - (o - p(89.2)) / (p(93.5) - p(89.2)) * 1.9 + .6 * (i(a >> 2, o >> 2, 96) - .5);
                if ((a === p(45) || a === p(71) - 1 || o >= p(93.5) - 1)) {
                  V -= 1;
                }
                r.px(a, o, d(n.da, V, a, o));
              }
          })(r, l, n);
          for (var v = p(54.4); v < p(57.6); v++)
            for (var g = p(15); g < p(101); g++) {
              var w = (v - p(54.4)) / (p(57.6) - p(54.4));
              r.px(g, v, d(l.go, 2.2 + (w < .3 ? .9 : 0) - 1.1 * w + .4 * (i(g >> 2, 5, 99) - .5), g, v));
            }
          if (0 === n) {
            y(r, l, 31, 82.5, 6.4);
            b(r, 78, 82.5, 4.6, 6.4);
            E(r, l, 73.5, 57.4, 11);
            E(r, l, 77.6, 57.4, 9);
          }
          else {
            if (1 === n) {
              (function (r, n, t, a, o) {
                r.rect(p(t), p(o), p(a - t), p(2), n.tre[3]);
                r.rect(p(t), p(o), p(a - t), 1, n.tre[4]);
                for (var e = p(t); e < p(a); e += 3)
                  r.rect(e, p(o) + 2, 1, p(2) - 2, n.tre[1]);
                r.rect(p(t) + 2, p(o + 2), 3, p(5), n.tre[1]);
                r.rect(p(a) - 5, p(o + 2), 3, p(5), n.tre[1]);
              })(r, l, 22, 42, 82);
              (function (r, n, t, a, o, e) {
                for (var f = Math.max(2, Math.round(e / 2.7)), i = 0; i < f; i++)
                  for (var u = p(a + e - (i + 1) * (e / f)), l = 2 * (1 & i), c = p(t) + l; c < p(t + o) - 2; c += p(3.6)) {
                    var v = Math.min(p(3.6) - 1, p(t + o) - c);
                    r.rect(c, u, v, p(e / f) - 1, n.go[1 + (c >> 3 & 1)]);
                    r.rect(c, u, v, 1, n.go[3]);
                    r.ell(c + v - 2, u + p(e / f) / 2 - 1, 2, p(e / f) / 2 - .5, [188, 142, 92]);
                  }
              })(r, l, 80, 78, 15, 11);
            }
            else {
              if (2 === n) {
                (function (r, n, t, a, o) {
                  r.line(p(t), p(a), p(t), p(a + o), n.go[0], 1, 1);
                  for (var e = 0; e < o / 1.7; e++) {
                    var f = p(a + 1 + 1.7 * e);
                    var i = 1 & e ? 1 : -1;
                    r.ell(p(t) + 2 * i, f + 2, 2, 3.4, function (r, n, t, a) {
                      return a < -.3 && t * i < .2 ? [255, 120, 86] : a > .4 ? [140, 28, 22] : [206, 48, 36];
                    });
                    r.px(p(t) + 2 * i, f - 1, [72, 110, 40]);
                  }
                })(r, l, 43.4, 58, 18);
                (function (r, n, t, a) {
                  [-1, 1].forEach(function (o) {
                    var e = p(t + 1.8 * o);
                    r.line(e, p(a), e, p(a + 2), n.go[0], 1, 1);
                    r.ell(e, p(a + 5.2), 2.4, p(3.2), function (r, n, t) {
                      return r + n & 3 ? t < -.2 ? [255, 222, 110] : [238, 190, 56] : [214, 164, 36];
                    });
                    r.poly([[e - 3, p(a + 2.6)], [e + 3, p(a + 2.6)], [e + 1, p(a + 5.5)], [e - 1, p(a + 5.5)]], [138, 156, 64]);
                  });
                })(r, l, 73.8, 58);
                b(r, 83, 83, 4.2, 6);
                b(r, 92, 84.4, 3.8, 5);
                y(r, l, 28, 83, 5.4);
              }
              else {
                (function (r, n, t, a) {
                  r.line(p(t), p(a), p(t), p(a + 3), n.go[0], 1, 1);
                  var o = p(t);
                  var e = p(a + 8);
                  r.rect(o - 4, e - p(4.4), 8, 3, n.go[0]);
                  r.rect(o - 4, e + p(3.4), 8, 3, n.go[0]);
                  r.ell(o, e, 5, p(4), function (r, n, t, a) {
                    return a < -.2 ? [255, 120, 70] : [220, 70, 40];
                  });
                  r.ell(o, e, 3, p(2.6), [255, 222, 130]);
                  r.line(o, e + p(4.4) + 3, o, e + p(4.4) + 8, [210, 60, 40], 1, 1);
                })(r, l, 73.4, 57.6);
                (function (r, n, t, a) {
                  r.line(p(t), p(a), p(t + 2.5), p(a + 15), n.go[2], 1, 2);
                  for (var o = 0; o < 16; o++)
                    r.line(p(t + 2.5) + .9 * (o - 8), p(a + 15), p(t + 2.5) + .5 * (o - 8), p(a + 22), o % 3 ? n.mai[4] : n.mai[2], 1, 1);
                  r.rect(p(t + 2.5) - 5, p(a + 15) - 2, 10, 2, n.go[0]);
                })(r, l, 24, 66);
              }
            }
          }
          (function (r, n, t) {
            for (var a = p(10), o = p(52), e = a; e <= o + p(7); e++)
              for (var f = (e + .5) / 2, l = u((f - 11) / 41, 0, 1), v = 2 * x(Math.min(f, 52)), h = Math.round(116 - v); h < Math.round(116 + v); h++) {
                var g = (h + .5 - 116) / v;
                var s = o + 5 * (i(h >> 1, 7, 61) - .45);
                if (e > s) {
                  if (e - s > (i(h, 8, 62) < .55 ? Math.floor(7 * i(h, 9, 63)) : 0)) {
                    continue;
                  }
                  r.px(h, e, i(h, e, 64) < .5 ? n.mai[0] : n.mai[1]);
                }
                else {
                  var m = 10 * Math.pow(l, .82);
                  var b = Math.floor(m);
                  var y = m - b;
                  var E = .5 * (g + 1) * (6 + Math.floor(5 * l)) + .5 * (1 & b);
                  var w = Math.floor(E);
                  var V = E - w;
                  var T = 2.5 + 1 * (i(b, w, 65) - .5) - .5 * g - .7 * l + (l < .18 ? .45 : 0);
                  var I = 6 * E;
                  var N = Math.floor(I);
                  var j = I - N;
                  T += .85 * (i(N, b, 67) - .5);
                  if (j < .2) {
                    T -= .55;
                  }
                  else {
                    if (j > .82) {
                      T += .3;
                    }
                  }
                  if (y < .16) {
                    T += .95;
                  }
                  else {
                    if (y > .76) {
                      T -= 1.5;
                    }
                  }
                  if ((V < .06 || V > .94)) {
                    T -= .9;
                  }
                  if (e > o - p(3.5)) {
                    T -= .9 + .05 * (e - (o - p(3.5)));
                  }
                  var D = 3 === t ? .6 : 1 === t ? .7 : .84;
                  var S = M(.16 * h + 3 * t, .2 * e, 71) > D && y > .5 && l > .25;
                  var H = d(n.mai, T, h, e);
                  if (S) {
                    H = c(H, n.rieu, .5);
                  }
                  else {
                    if (3 !== t && M(.07 * h, .09 * e, 72) > .82 && l > .15 && l < .85) {
                      H = c(H, n.ra, .4);
                    }
                  }
                  r.px(h, e, H);
                }
              }
          })(r, l, n);
          (function (r, n) {
            var t = p(68);
            var a = p(23);
            r.ell(t, a, p(5.2), p(3.6), function (r, t, a, o) {
              return .55 * (1 - (a * a + o * o)) > .55 * h(r, t) ? n.toi : null;
            }, .5);
            r.ell(t, a + 1, p(2.9), p(1.7), n.toi);
            for (var o = -p(4); o <= p(4); o++) {
              var e = a - p(1.9) - Math.round(Math.sqrt(Math.max(0, 1 - o / p(4.4) * (o / p(4.4)))) * p(1.3));
              r.px(t + o, e, n.mai[5]);
              r.px(t + o, e + 1, n.mai[4]);
            }
          })(r, l);
          (function (r, n) {
            for (var t = p(36), a = p(80), o = p(4.8), e = p(12.5), f = t; f < a; f++)
              for (var u = Math.abs(f + .5 - 116) / p(22), l = o + Math.pow(u, 3) * p(3.2), c = Math.round(l); c < e; c++) {
                var v = (c - l) / (e - l);
                var h = 3.4 + (v < .28 ? 1 : 0) - 1.6 * v + .5 * (i(f >> 1, c >> 1, 81) - .5);
                if ((f + 2 * c) % 12 < 2) {
                  h -= .7;
                }
                var M = Math.abs(f + .5 - 92);
                var g = Math.abs(f + .5 - 140);
                if ((M < p(1.2) || g < p(1.2))) {
                  h = 1 + .5 * (1 & c);
                }
                r.px(f, c, d(n.noc, h, f, c));
              }
            [34.5, 81.5].forEach(function (t) {
              var a = p(t);
              [[[a - 7, p(13)], [a + 7, p(1.6)]], [[a + 7, p(13)], [a - 7, p(1.6)]]].forEach(function (t) {
                r.line(t[0][0], t[0][1], t[1][0], t[1][1], n.tre[0], 1, 4);
                r.line(t[0][0], t[0][1], t[1][0], t[1][1], n.tre[2], 1, 2);
                r.line(t[0][0] - 1, t[0][1], t[1][0] - 1, t[1][1], n.tre[4], .8, 1);
              });
              r.rect(a - 1, p(7.6), 3, 2, n.tre[0]);
            });
          })(r, l);
          if (1 === n) {
            (function (r) {
              var n;
              var t = [[p(8), p(56)], [p(10), p(46)], [p(14), p(38)], [p(20), p(32)], [p(26), p(27)], [p(33), p(23)]];
              for (n = 0; n < t.length - 1; n++)
                r.line(t[n][0], t[n][1], t[n + 1][0], t[n + 1][1], [58, 84, 30], 1, 2);
              for (n = 0; n < t.length; n++)
                for (var a = 0; a < 3; a++) {
                  var o = t[n][0] + 12 * (i(n, a, 111) - .5);
                  var e = t[n][1] + 8 * (i(n, a, 112) - .5);
                  r.ell(o, e, 3.4, 2.7, function (r, n, t, a) {
                    return t + a < -.2 ? [128, 176, 62] : [74, 122, 40];
                  });
                }
              [[p(15.5), p(57.5), 1], [p(22), p(58.5), .85]].forEach(function (n) {
                var t = n[0];
                var a = n[1];
                var o = n[2];
                r.line(t, a - 4, t, a, [58, 84, 30], 1, 1);
                r.ell(t, a + 4 * o + 2, 3.6 * o, 3.6 * o, function (r, n, t, a) {
                  return t + a < -.3 ? [214, 222, 120] : [158, 178, 70];
                });
                r.ell(t, a + 10 * o + 2, 5 * o, 5 * o, function (r, n, t, a) {
                  return t + a < -.35 ? [222, 230, 130] : a > .4 ? [120, 142, 52] : [168, 190, 78];
                });
              });
            })(r);
          }
          r.vien(l.vien, .5);
        })(a, (t % 4 + 4) % 4);
        a.flush(r);
      } };
    t.kit = { Spr: g, bac: d, hex: l, mix: c, nhan: v, h01: i, vn: M, bayer: h, clamp: u, bangMau: s };
    t.doiVat = function (a) {
      var o = a && a.data;
      if (!o || "tan_vien" !== o.id || !a.objects) {
        return 0;
      }
      for (var e = 0, i = 0; i < a.objects.length; i++) {
        var u = a.objects[i];
        if ("hut" === u.name) {
          var l = t.KIEU[u.tx + "," + u.ty];
          u.name = t.TEN;
          u.variant = null != l ? l : f(u.tx, u.ty, 7) % 4;
          u.cullMargin = void 0;
          n.get(u.name, u.variant);
          e++;
        }
      }
      if (r.TanVienVat && r.TanVienVat.doiVat) {
        r.TanVienVat.doiVat(a);
      }
      return e;
    };
  }
  function f(r, n, t) {
    var a = Math.imul(0 | r, 374761393) ^ Math.imul(0 | n, 668265263) ^ Math.imul(40503 + (0 | t), 1274126177);
    return ((a = Math.imul(a ^ a >>> 13, 1274126177)) ^ a >>> 16) >>> 0;
  }
  function i(r, n, t) {
    return f(r, n, t) / 4294967296;
  }
  function u(r, n, t) {
    return r < n ? n : r > t ? t : r;
  }
  function l(r) {
    var n = parseInt(r.slice(1), 16);
    return [n >> 16 & 255, n >> 8 & 255, 255 & n];
  }
  function c(r, n, t) {
    return [r[0] + (n[0] - r[0]) * t, r[1] + (n[1] - r[1]) * t, r[2] + (n[2] - r[2]) * t];
  }
  function v(r, n) {
    return [r[0] * n, r[1] * n, r[2] * n];
  }
  function h(r, n) {
    return (a[(3 & n) << 2 | 3 & r] + .5) / 16;
  }
  function d(r, n, t, a) {
    var o = r.length - 1;
    var e = 0 | (n = u(n, 0, o));
    if (n - e > h(t, a) && e < o) {
      e++;
    }
    return r[e];
  }
  function M(r, n, t) {
    var a = Math.floor(r);
    var o = Math.floor(n);
    var e = r - a;
    var f = n - o;
    e = e * e * (3 - 2 * e);
    f = f * f * (3 - 2 * f);
    var u = i(a, o, t);
    var l = i(a + 1, o, t);
    var c = i(a, o + 1, t);
    var v = u + (l - u) * e;
    return v + (c + (i(a + 1, o + 1, t) - c) * e - v) * f;
  }
  function g(r, n) {
    var t = new Uint8ClampedArray(r * n * 4);
    var a = { W: r, H: n, buf: t, px: function (a, o, e, f) {
        if (a = Math.round(a), o = Math.round(o), !(a < 0 || o < 0 || a >= r || o >= n)) {
          var i = 4 * (o * r + a);
          if (null == f || f >= 1) {
            t[i] = e[0];
            t[i + 1] = e[1];
            t[i + 2] = e[2];
            return void (t[i + 3] = 255);
          }
          if (!(f <= 0)) {
            var u = t[i + 3] / 255;
            var l = f + u * (1 - f);
            t[i] = (e[0] * f + t[i] * u * (1 - f)) / l;
            t[i + 1] = (e[1] * f + t[i + 1] * u * (1 - f)) / l;
            t[i + 2] = (e[2] * f + t[i + 2] * u * (1 - f)) / l;
            t[i + 3] = 255 * l;
          }
        }
      }, alpha: function (a, o) {
        return a < 0 || o < 0 || a >= r || o >= n ? 0 : t[4 * (o * r + a) + 3];
      }, rect: function (r, n, t, o, e, f) {
        r = Math.round(r);
        n = Math.round(n);
        t = Math.round(t);
        o = Math.round(o);
        for (var i = n; i < n + o; i++)
          for (var u = r; u < r + t; u++)
            a.px(u, i, e, f);
      }, line: function (r, n, t, o, e, f, i) {
        r = Math.round(r);
        n = Math.round(n);
        t = Math.round(t);
        o = Math.round(o);
        var u = Math.abs(t - r);
        var l = r < t ? 1 : -1;
        var c = -Math.abs(o - n);
        var v = n < o ? 1 : -1;
        var h = u + c;
        for (i = i || 1; i <= 1 ? a.px(r, n, e, f) : a.rect(r - (i >> 1), n - (i >> 1), i, i, e, f), r !== t || n !== o;) {
          var d = 2 * h;
          if (d >= c) {
            h += c;
            r += l;
          }
          if (d <= u) {
            h += u;
            n += v;
          }
        }
      }, ell: function (r, n, t, o, e, f) {
        for (var i = Math.floor(n - o); i <= Math.ceil(n + o); i++)
          for (var u = Math.floor(r - t); u <= Math.ceil(r + t); u++) {
            var l = (u + .5 - r) / t;
            var c = (i + .5 - n) / o;
            if (!(l * l + c * c > 1))
              if ("function" == typeof e) {
                var v = e(u, i, l, c);
                if (v) {
                  a.px(u, i, v, f);
                }
              }
              else {
                a.px(u, i, e, f);
              }
          }
      }, poly: function (r, n, t) {
        var o;
        var e = 1 / 0;
        var f = -1 / 0;
        for (o = 0; o < r.length; o++)
          r[o][1] < e && (e = r[o][1]), r[o][1] > f && (f = r[o][1]);
        for (var i = Math.floor(e); i < Math.ceil(f); i++) {
          var u = i + .5;
          var l = [];
          for (o = 0; o < r.length; o++) {
            var c = r[o];
            var v = r[(o + 1) % r.length];
            if ((c[1] <= u && v[1] > u || v[1] <= u && c[1] > u)) {
              l.push(c[0] + (u - c[1]) * (v[0] - c[0]) / (v[1] - c[1]));
            }
          }
          l.sort(function (r, n) {
            return r - n;
          });
          for (var h = 0; h + 1 < l.length; h += 2)
            for (var d = Math.round(l[h]); d < Math.round(l[h + 1]); d++)
              if ("function" == typeof n) {
                var M = n(d, i);
                if (M) {
                  a.px(d, i, M, t);
                }
              }
              else {
                a.px(d, i, n, t);
              }
        }
      }, vien: function (a, o) {
        var e;
        var f;
        var i;
        var u = [];
        var l = [];
        var c = 250;
        for (f = 0; f < n; f++)
          for (e = 0; e < r; e++)
            t[3 + (i = 4 * (f * r + e))] >= c ? (0 === e || t[i - 4 + 3] < c || e === r - 1 || t[i + 4 + 3] < c || 0 === f || t[i - 4 * r + 3] < c || f === n - 1 || t[i + 4 * r + 3] < c) && l.push(i) : (e > 0 && t[i - 4 + 3] >= c || e < r - 1 && t[i + 4 + 3] >= c || f > 0 && t[i - 4 * r + 3] >= c || f < n - 1 && t[i + 4 * r + 3] >= c) && u.push(i);
        for (var v = 0; v < l.length; v++)
          t[l[v]] *= o, t[l[v] + 1] *= o, t[l[v] + 2] *= o;
        for (v = 0; v < u.length; v++)
          t[u[v] + 3] > 0 || (t[u[v]] = a[0], t[u[v] + 1] = a[1], t[u[v] + 2] = a[2], t[u[v] + 3] = 255);
      }, flush: function (a) {
        var o = a.createImageData(r, n);
        o.data.set(t);
        a.putImageData(o, 0, 0);
      } };
    return a;
  }
  function p(r) {
    return Math.round(2 * r);
  }
  function s(n) {
    var t = r.Palette.WORLD;
    var a = t.thatch;
    var o = t.wood;
    var e = t.bamboo;
    var f = t.stone;
    var i = t.dirt;
    var u = t.grass;
    var h = [null, l(u.d2), l(a.d3), l(f.base)][n];
    var d = [0, .16, .2, .34][n];
    function M(r) {
      r = l(r);
      return h ? c(r, h, d) : r;
    }
    var g = {};
    g.mai = [c(l(a.line), M(a.d1), .5), M(a.d1), c(M(a.d1), M(a.base), .55), M(a.base), M(a.d2), M(a.d3)];
    if (3 === n) {
      g.mai = g.mai.map(function (r) {
        return v(r, .9);
      });
    }
    g.ra = c(l(a.d2), l(a.d3), .35);
    g.noc = g.mai.map(function (r) {
      return c(r, l(a.d3), .28);
    });
    g.phen = [c(l(o.d1), l(a.d1), .5), c(l(a.d1), l(i.d1), .45), c(l(a.base), l(i.base), .4), c(l(a.d2), l(i.d2), .4), c(l(a.d3), l(i.d3), .42)];
    g.dat = [c(l(i.line), l(i.d1), .7), l(i.d1), l(i.base), c(l(i.d2), l(a.d2), .3), c(l(i.d3), l(a.d3), .35)];
    g.go = [l(o.line), l(o.d1), l(o.base), l(o.d2), l(o.d3)];
    g.tre = [l(e.line), l(e.d1), l(e.base), l(e.d2), c(l(e.d2), l(a.d3), .4)];
    g.da = [l(f.line), l(f.d1), l(f.base), l(f.d2), l(f.d3)];
    g.rieu = c(l(u.d1), l(u.base), .4);
    g.co = [l(u.line), l(u.d1), l(u.base), l(u.d2), l(u.d3)];
    g.toi = [27, 19, 12];
    g.vien = v(c(l(a.line), l(o.line), .5), .8);
    return g;
  }
  function x(r) {
    var n = u((r - 11) / 41, 0, 1);
    return 24 + 30 * Math.pow(n, 1.3);
  }
  function m(r, n, t, a, o, e) {
    for (var f = p(a); f < p(o); f++)
      for (var u = p(t); u < p(t + e); u++) {
        var l = (u - p(t)) / p(e);
        var c = 2.2 + (l < .3 ? 1 : 0) - (l > .7 ? .9 : 0) + .5 * (i(u, f >> 3, 51) - .5);
        if (!(u + (f >> 4) & 3)) {
          c -= .35;
        }
        r.px(u, f, d(n.go, c, u, f));
      }
  }
  function b(r, n, t, a, e) {
    var f = p(n);
    var u = p(t);
    r.ell(f + 2, u + p(e) - 2, p(a) + 1, 3, [10, 14, 8], .35);
    r.ell(f, u, p(a), p(e), function (r, n, t, a) {
      var e = 2.6 - .8 * t + -.55 * a + (a < -.7 ? .5 : 0) - .9 * Math.max(0, a) + .3 * (i(r >> 1, n >> 1, 101) - .5);
      return d(o, e, r, n);
    });
    r.ell(f, u - p(e) + 2, .74 * p(a), 2.5, [226, 168, 114]);
    r.ell(f, u - p(e) + 2, .5 * p(a), 1.5, [40, 24, 14]);
  }
  function y(r, n, t, a, o) {
    r.ell(p(t), p(a), p(o), p(o), function (r, t, a, o) {
      var e = Math.sqrt(a * a + o * o);
      var f = 2.4 + (1 & Math.floor(6 * e) ? .5 : -.2) - .5 * a - .35 * o + (e > .88 ? -1.1 : 0) + .35 * (i(r >> 1, t >> 1, 102) - .5);
      if (e < .14) {
        f -= .8;
      }
      return d(n.tre, f, r, t);
    });
  }
  function E(r, n, t, a, o) {
    r.line(p(t), p(a), p(t), p(a + 2.2), n.go[0], 1, 1);
    for (var f = p(a + 2.2), u = p(o), l = 0; l < u; l++)
      for (var c = l / u, v = Math.round(5 * (1 - 1.15 * Math.abs(c - .3)) + 1), h = -v; h <= v; h++) {
        var M = i(h + 40, l, 103);
        var g = 2.3 + 1.4 * (M - .5) - .5 * c - h / (v + 1) * .45;
        r.px(p(t) + h, f + l, d(e[M < .2 ? 0 : 1], g, h, l));
      }
    r.rect(p(t) - 3, f, 6, 2, n.go[1]);
  }
}(window.PNTT);
