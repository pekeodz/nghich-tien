!function (a) {
  "use strict";
  var n = a.VeTay;
  if (n) {
    var r = a.HacKit = a.HacKit || {};
    var e = a.HacPhongArt = n.tao({ id: "hac_phong_linh", tienTo: "hpv_", code: { O: 0, Q: 0, F: 0, G: 0, o: 1, u: 1, p: 1, r: 1, R: 1, "#": 1, d: 2, e: 2, L: 3, l: 3 } });
    var t = e.kit;
    var c = t.S;
    var o = 32;
    var u = t.h01;
    var i = t.hashU;
    var f = (t.kep, t.smooth);
    var d = t.bayer;
    var v = t.nLo;
    var h = t.nMi;
    var l = t.nHi;
    var m = t.mau;
    var s = t.gan;
    var g = t.dai;
    var M = null;
    r.bangMau = W;
    r.rd = function () {
      return M || (M = W());
    };
    r.NF = 8;
    r.lava = null;
    r.nuongNham = function (a) {
      for (M || (M = W()), r.lava || (r.lava = []); r.lava.length < 8;)
        if (r.lava.push(P(r.lava.length)), a && t.bayGio() > a) {
          return r.lava.length >= 8;
        }
      return !0;
    };
    r.veNham = function (n, e, t, c, u, i, f) {
      if (r.lava && !(r.lava.length < 8) && e.loNham) {
        for (var d = null != f ? f : Math.floor(4 * (a.Game && a.Game.time || 0)), v = r.lava[(d % 8 + 8) % 8], h = Math.max(0, Math.floor(t)), l = Math.min(e.W, Math.ceil(t + u) + 1), m = Math.max(0, Math.floor(c)), s = Math.min(e.H, Math.ceil(c + i) + 1), g = m >> 5; g <= s - 1 >> 5; g++)
          for (var M = h >> 5; M <= l - 1 >> 5; M++)
            if (e.loNham[g * e.TW + M]) {
              var b = M * o % 384;
              var x = g * o % 384;
              n.drawImage(v, b, x, o, o, M * o - t, g * o - c, o, o);
            }
      }
    };
    r.baoDraw = function (a) {
      var n = a.draw;
      a.draw = function (e, t, c, o, u, i, f) {
        if (!t.xong) {
          try {
            a._chayViec(t, 0);
          }
          catch (a) {
            return n(e, t, c, o, u, i);
          }
          if (!t.xong) {
            return n(e, t, c, o, u, i);
          }
        }
        r.veNham(e, t, c, o, u, i, f);
        return n(e, t, c, o, u, i);
      };
    };
    r.taoVe = function (a) {
      var n = a.kit;
      var e = n.S;
      var t = n.h01;
      var c = n.hashU;
      var o = n.smooth;
      var u = n.bayer;
      var i = n.nLo;
      var f = (n.nMi, n.nHi);
      var d = r.FACE;
      function v(a, r, t, c, i, f, d) {
        var v = n.docSang(a, a.luc, r, t);
        var h = v[0];
        var l = v[1];
        var m = u(r, t);
        var s = u(r + 2, t + 1);
        var g = o(.2, .46, h);
        var M = o(.16, .44, l);
        if (M > .9 * g && M > s) {
          e.ram = f;
          d += .04 + .1 * Math.min(1, l);
        }
        else {
          if (g > m) {
            e.ram = i;
            d += .03 + .1 * Math.min(1, h);
          }
          else {
            e.ram = c;
          }
        }
        e.v = d;
      }
      return { dungSang: v, dungCot: function (a) {
          for (var n, r = a.W, e = a.cid = new Int16Array(r), t = a.clx = new Uint8Array(r), o = a.cwd = new Uint8Array(r), u = 0, i = 0; u < r;) {
            var f = 5 + c(i, 3, 31) % 5;
            for (n = 0; n < f && u < r; n++)
              e[u] = i, t[u] = n, o[u] = f, u++;
            i++;
          }
        }, toVach: function (a, u, h, l) {
          var m = a.kh;
          var s = m.V[l];
          var g = m.U[l];
          var M = m.E[l];
          var b = a.cid[u];
          var x = a.clx[u];
          var y = a.cwd[u];
          var _ = d - 4 + c(b, 5, 32) % 12 + (c(b >> 2, 6, 34) % 3 == 0 ? 8 : 0);
          if (s < _) {
            var w = .36 + .008 * ((15 & c(b, 7, 33)) - 7) + .05 * i(u + 11, 2 * s + 7) + .035 * f(u, h);
            if (x < 1) {
              w += .16;
            }
            else {
              if (x < 2) {
                w += .07;
              }
              else {
                if (x >= y - 1) {
                  w -= .17;
                }
                else {
                  if (x >= y - 2) {
                    w -= .07;
                  }
                }
              }
            }
            w += .08 * (.5 - x / (y - 1));
            var S = 11 + c(b, 9, 35) % 9;
            var p = c(b, 10, 35) % S;
            var k = Math.floor((s + p) / S);
            var A = s + p - k * S;
            if (A < 1.2 ? w -= .15 : A < 2.6 && (w += .04), w += .012 * ((7 & c(b, k, 36)) - 3.5), s > _ - 3 && (w += .1), w -= .18 * o(7, 0, s), a.vachDai) {
              var W = s - (_ - 12);
              if (W >= 0 && W < 6) {
                e.nx = 0;
                e.ny = .2;
                e.ram = r.rd().dong;
                e.v = .4 + (W < 1.4 ? .2 : W > 4.4 ? -.14 : .02) + .06 * (f(u, h) - 0);
                return void (W > 1.4 && W < 4.4 && u % 14 < 2 && (e.v = .86));
              }
            }
            if (t(u >> 1, 77, 11) > .93 && !(1 & u)) {
              w -= .07 * o(0, _, s);
            }
            e.nx = 0;
            e.ny = .2;
            v(a, u, h, r.rd().da, r.rd().daC, r.rd().daW, w);
            return void (s < 12 && A < 1.2 && c(u, k, 421) % 9 == 0 && e.ram === r.rd().daW && (e.ram = null, e.mau = r.rd().lav[4 + (1 & c(u, h, 422))]));
          }
          var P = M;
          var C = .24 + .07 * i(u + 70, h + 20) + .03 * f(u, h);
          C -= .16 * o(6, 70, P);
          if (s < 6e4 && s - _ < 3) {
            C += .12;
          }
          e.nx = 0;
          e.ny = 0;
          e.ram = r.rd().da;
          e.v = C;
          if (s >= 6e4 && g < 6e4 && P < 3) {
            e.v += .12;
          }
          var N = n.voro(u >> 1, h >> 1);
          if (N.e < 1) {
            e.v -= .07;
          }
          else {
            if (N.e < 2.2 && N.dx + N.dy < 0) {
              e.v += .035;
            }
          }
          e.v += .009 * ((7 & N.id) - 3.5);
          var I = n.rach(u + 13, h + 5);
          if (I > 242 && P > 5 && i(u + 130, h + 70) > .12) {
            var L = I - 242 >> 2;
            e.mau = r.rd().lav[2 + (L > 2 ? 2 : L)];
            e.ram = null;
          }
        } };
    };
    var b = r.FACE = 36;
    var x = { x0: 43, y0: 2, x1: 54, y1: 7 };
    r.hpl = { FACE: b, RIM: 3, TRAM: x };
    var y = r.taoVe(e);
    var _ = y.dungSang;
    var w = y.toVach;
    var S = [1, 0, 0];
    var p = [0, 1, 0];
    var k = [0, 0, 1];
    var A = !1;
    e.nen = { chuanBi: function (a) {
        a.loNham = new Uint8Array(a.TW * a.TH);
        (function (a) {
          M = r.rd();
          var n;
          var e;
          var c = a.gw;
          var u = a.gh;
          var i = a.cl;
          var f = (a.W, a.TW);
          var d = a.TH;
          var l = a.data;
          var m = a.chr = new Uint8Array(f * d);
          for (e = 0; e < d; e++)
            for (n = 0; n < f; n++)
              m[e * f + n] = (l.ground[e] || "").charCodeAt(n) || 0;
          t.viec(a, "vach", function () {
            y.dungCot(a);
            a.kh = t.dungKhoi(a, function (a) {
              return 0 === i[a];
            }, [3], function (a, n) {
              return 9 * v(a + 40, n + 10) + 4 * h(a + 7, n + 91);
            }, 5);
          });
          t.viec(a, "truong", function () {
            var n = t.matNa(a, function (a) {
              return 3 === i[a] || 0 === i[a];
            });
            a.sdL = t.truongDau(n, c, u, [2, 2]);
            a.sdL0 = t.truongDau(n, c, u, []);
            var r = t.matNa(a, function (a) {
              return 2 === i[a];
            });
            a.sdP = t.truongDau(r, c, u, [3, 3]);
            a.sdP0 = t.truongDau(r, c, u, []);
            var e = t.matNa(a, function (a) {
              if (117 !== m[a]) {
                return !1;
              }
              var n = a % f;
              var r = a / f | 0;
              return !(n >= x.x0 - 1 && n <= x.x1 + 1 && r >= x.y0 - 1 && r <= x.y1 + 1);
            });
            a.sdU = t.truongDau(e, c, u, [3, 3]);
            var o = t.matNa(a, function (a) {
              return 112 === m[a];
            });
            a.sdS = t.truongDau(o, c, u, [2, 2]);
          });
          t.viec(a, "sang", function () {
            for (var n = a.luc = new Float32Array(c * u * 3), r = a.heat = new Float32Array(c * u), e = a.dLv = t.chamfer(t.matNa(a, function (a) {
              return 3 === i[a];
            }), c, u), f = 0; f < r.length; f++) {
              var d = 4 * e[f];
              e[f] = d;
              var v = d > 400 ? 0 : .85 * Math.exp(-Math.max(0, d - 6) / 40);
              r[f] = v;
              n[3 * f + 1] = v;
            }
            !function (a, n) {
              for (var r = 0; r < n.length; r++) {
                var e = n[r];
                var c = e.tx * o + 16;
                var u = (e.ty + 1) * o;
                switch (e.name) {
                  case "tgt_den_do":
                    t.congSang(a, a.luc, c, u - 44, 92, p, .8, 1);
                    break;
                  case "campfire_7":
                    t.congSang(a, a.luc, c, u - 8, 124, p, 1, 1);
                    break;
                  case "hpl_leu":
                    t.congSang(a, a.luc, c, u - 8, 60, p, .45, 1);
                    break;
                  case "hpl_khoi":
                    t.congSang(a, a.luc, c, u - 14, 64, p, .6, 1);
                    break;
                  case "tgt_nam_ma_hoa":
                    t.congSang(a, a.luc, c, u - 8, 44, S, .65, 1);
                    break;
                  case "cave_crystal":
                    t.congSang(a, a.luc, c, u - 20, 72, S, .85, 1);
                    break;
                  case "ht_cua_ngam":
                    t.congSang(a, a.luc, c, u - 44, 150, p, 1, 1);
                    break;
                  case "tgt_thap_canh_ma":
                    t.congSang(a, a.luc, c, u - 80, 76, p, .5, 1);
                    break;
                  case "tgt_cot_phu_van":
                    t.congSang(a, a.luc, c, u - 30, 52, k, .55, 1);
                    break;
                  case "hpl_coc_so": t.congSang(a, a.luc, c, u - 56, 26, p, .34, 1);
                }
              }
            }(a, l.decorations || []);
          });
        })(a);
      }, to: function (a, n, r, e) {
        A = !1;
        return a.kh.M[e] ? w(a, n, r, e) : function (a, n, r) {
          var e = a.kh;
          var o = m(a, e.sd, n, r);
          var u = s(a, a.sdL0, n, r);
          var g = 1e3;
          var b = 1e3;
          var y = 0;
          var w = 1e3;
          if (u < 52) {
            var S = m(a, a.sdL0, n, r);
            g = m(a, a.dLv, n, r);
            if ((b = (b = m(a, a.sdL, n, r) + 6 * v(1.3 * n + 30, 1.3 * r + 9) + 3 * h(n + 80, r + 15)) < S - 6 ? S - 6 : b > S + 6 ? S + 6 : b) < 0 && g > 7) {
              b = 1e3;
            }
            w = g + 6 * v(n + 70, r + 33);
            y = m(a, a.heat, n, r);
          }
          else {
            if (u < 240) {
              y = m(a, a.heat, n, r);
            }
          }
          if (b < -3) {
            A = !0;
            return void (c.mau = [0, 0, 0]);
          }
          if (b < 0) {
            c.ram = M.lav;
            c.nx = 0;
            c.ny = 0;
            return void (c.v = .6 + (b + 3) / 3 * .1 + .1 * l(n, r) + .08 * (d(n, r) - .5));
          }
          var p = 1e3;
          if (s(a, a.sdP0, n, r) < 40) {
            var k = m(a, a.sdP0, n, r);
            p = (p = m(a, a.sdP, n, r) + 7 * v(1.1 * n + 99, 1.1 * r + 4) + 3 * h(n + 13, r + 51)) < k - 7 ? k - 7 : p > k + 7 ? k + 7 : p;
          }
          var W = 1.7 * v(n, r) + 1 * h(n + 31, r + 17) + .16 * (d(n, r) - .5);
          var P = .44 + .045 * (W < -.16 ? 0 : W < .2 ? 1 : 2) + .035 * l(n, r) + .03 * h(n + 5, r + 9);
          var C = M.nen;
          c.nx = 0;
          c.ny = 0;
          var N = t.voro(n >> 1, r >> 1);
          P += .01 * ((15 & N.id) - 7.5);
          if (N.e < .9) {
            P -= .085;
          }
          else {
            if (N.e < 2.2 && N.dx + N.dy < 0) {
              P += .028;
            }
          }
          var I = 1e3;
          if (s(a, a.sdU, n, r) < 14) {
            I = m(a, a.sdU, n, r) + 5 * v(n + 5, r + 9);
          }
          if (I < 0) {
            P += .05 * f(0, -6, I);
            if (N.e < 1.2) {
              P -= .05;
            }
          }
          var L = v(.18 * n + 400, 3.1 * r + 11) + .4 * h(.4 * n + 40, 1.1 * r);
          var T = f(.3, .42, L);
          if (T > 0 && T > d(n + 1, r + 2) && o > 6) {
            C = M.tro;
            P = .3 + .08 * T + .05 * l(n, r) + .1 * (L - .3);
          }
          var U = t.rach(n, r);
          var D = v(n + 200, r + 40);
          if (U > 228 && D > -.02) {
            if (y > .3 && U > 236) {
              c.ram = M.lav;
              return void (c.v = .3 + .36 * y + .012 * (U - 236));
            }
            P -= .17;
          }
          else {
            if (U > 218 && D > .06) {
              P -= .07;
            }
          }
          var F = n / 12 | 0;
          var H = r / 12 | 0;
          var E = i(F, H, 401);
          var V = s(a, a.sdS, n, r) < 8 ? m(a, a.sdS, n, r) : 20;
          if (h(12 * F + 40, 12 * H + 70) + .22 * f(54, 0, o) + (V < 4 ? .34 : 0) + (p < 16 ? .12 : 0) > .14 && !(E & (V < 4 ? 1 : 3))) {
            var R = 1.5 + .55 * (E >>> 4 & 3);
            var G = (n + .5 - (12 * F + 3.5 + 1.3 * (E >>> 8 & 3))) / R;
            var K = (r + .5 - (12 * H + 3.5 + 1.3 * (E >>> 12 & 3))) / (.72 * R);
            var q = G * G + K * K;
            if (q < 1) {
              P = P + .03 + .16 * (1 - q) - (.05 * G + .09 * K) + .02 * ((E >>> 16 & 3) - 1);
            }
            else {
              if (q < 1.9 && .6 * G + K > 0) {
                P -= .11;
              }
            }
          }
          var B = n >> 5;
          var O = r >> 5;
          if (117 === a.chr[O * a.TW + B] && B >= x.x0 && B <= x.x1 && O >= x.y0 && O <= x.y1 || 49 === B && 3 === O) {
            var Q = r / 36 | 0;
            var j = i(Q, 3, 78) % 46;
            var z = (n + j) / 46 | 0;
            var J = n + j - 46 * z;
            var X = r - 36 * Q;
            var Y = i(z, Q, 77);
            var Z = .46 + .013 * ((15 & Y) - 7) + .05 * v(n + 5, r + 9) + .035 * l(n, r) + .05 * (.5 - J / 46) - .04 * (X / 36 - .5);
            if (J < 1.4 || X < 1.4) {
              Z -= .2;
            }
            else {
              if ((J < 2.8 || X < 2.8)) {
                Z += .07;
              }
            }
            if ((J < 5 && X < 5 || J > 41 && X > 31)) {
              Z -= .04;
            }
            if (t.rach(n + 40, r + 12) > 226 && !(3 & Y)) {
              Z -= .2;
            }
            if (h(1.3 * n + 700, 1.3 * r + 90) > .3 && 1 == (7 & Y)) {
              Z -= .09;
            }
            Z -= .2 * f(30, 0, o);
            c.nx = 0;
            c.ny = 0;
            return void _(a, n, r, M.lat, M.latC, M.latW, Z);
          }
          if (p < 0) {
            var $ = f(-3, 0, p);
            if (!($ > 0 && d(n, r) < .9 * $)) {
              var aa = .54 + .05 * l(n, r) + .04 * h(n + 9, r + 21);
              var na = v(.22 * n + 500, 1.7 * r) + .4 * h(.4 * n + 90, 1.2 * r);
              if (na > .3) {
                aa -= .08;
              }
              else {
                if (na < -.34) {
                  aa += .05;
                }
              }
              if (p > -2.6) {
                aa -= .1;
              }
              else {
                if (p > -4.6) {
                  aa += .04;
                }
              }
              var ra = i(n >> 1, r >> 1, 511) % 61;
              if (0 === ra) {
                aa += .22;
              }
              else {
                if (1 === ra) {
                  aa -= .12;
                }
              }
              aa -= .22 * f(40, 0, o);
              c.nx = 0;
              c.ny = 0;
              return void _(a, n, r, M.duong, M.duongC, M.duongW, aa);
            }
          }
          var ea = 1 - f(12, 34, w);
          if (ea > 0 && ea > .95 * d(n + 1, r)) {
            var ta = t.voro(n >> 1, r >> 1);
            var ca = 1 - f(2, 22, w);
            var oa = .2 + .08 * ca + .05 * l(n, r) + .012 * ((7 & ta.id) - 3.5);
            if (ta.e < 1) {
              oa -= .07;
            }
            else {
              if (ta.e < 2.2 && ta.dx + ta.dy < 0) {
                oa += .04;
              }
            }
            c.ram = M.nguoi;
            c.v = oa;
            return void (ta.e < .9 + 1.1 * ca && ca > .3 && (c.ram = M.lav, c.v = .26 + .26 * ca + .04 * (.9 - ta.e)));
          }
          P -= .26 * f(46, 0, o);
          var ua = 0;
          if (m(a, e.sd, n - 9, r - 9) < 0) {
            ua += .5;
          }
          if (m(a, e.sd, n - 19, r - 17) < 0) {
            ua += .3;
          }
          if (m(a, e.sd, n - 29, r - 25) < 0) {
            ua += .2;
          }
          P -= .2 * ua;
          _(a, n, r, C, M.nenC, M.nenW, P);
        }(a, n, r);
      }, dan: function (a) {
        !function (a) {
          var n;
          var r;
          var e = t.Spr(260, 116);
          var c = 130;
          function o(a, n, o, u, i) {
            for (r = 0; r < 720; r++)
              for (var f = r / 720 * Math.PI * 2, d = 0; d < i; d++)
                e.px(c + Math.cos(f) * (a - d), 58 + Math.sin(f) * (n - .42 * d), t.xem(o, u - .06 * d, r, d), .62);
          }
          for (o(120, 50, M.tim, .62, 2), o(96, 40, M.tim, .5, 1), o(60, 25, M.mau, .78, 1), n = 0; n < 24; n++) {
            var u = n / 24 * Math.PI * 2;
            var i = c + 108 * Math.cos(u);
            var f = 58 + 45 * Math.sin(u);
            var d = n % 3 ? t.xem(M.tim, .8, n, 1) : t.xem(M.mau, .9, n, 1);
            e.rect(i - 3, f - 1, 7, 1, d, .8);
            e.rect(i - (1 & n ? 2 : 0), f - 3, 1, 5, d, .8);
            if (1 & n) {
              e.px(i + 2, f + 1, d, .8);
            }
          }
          [0, Math.PI].forEach(function (a) {
            for (var n = [], r = 0; r < 3; r++) {
              var o = a - Math.PI / 2 + r * Math.PI * 2 / 3;
              n.push([c + 88 * Math.cos(o), 58 + 36 * Math.sin(o)]);
            }
            for (var u = 0; u < 3; u++)
              e.line(n[u][0], n[u][1], n[(u + 1) % 3][0], n[(u + 1) % 3][1], t.xem(M.tim, .55, u, 1), .5, 1);
          });
          e.ell(c, 58, 10, 5, t.xem(M.mau, .8, 1, 1), .5);
          t.dan(a, e, 1454, 108.4);
        }(a);
        (function (a) {
          var n;
          var r = t.Spr(150, 110);
          for ([[40, 40, 16, 7], [74, 66, 12, 5], [28, 80, 10, 4], [100, 44, 9, 4], [60, 24, 7, 3], [112, 82, 12, 5]].forEach(function (a) {
            r.ell(a[0], a[1], a[2], a[3], t.xem(M.mau, .3 + .2 * u(a[0], a[1], 5), a[0], a[1]), .62);
            r.ell(a[0] - 2, a[1] - 1, .5 * a[2], .5 * a[3], t.xem(M.mau, .5, a[0], a[1]), .4);
          }), r.line(30, 34, 90, 70, t.xem(M.mau, .34, 1, 1), .5, 2), n = 0; n < 22; n++)
            r.px(24 + 100 * u(n, 1, 951), 20 + 80 * u(n, 2, 951), t.xem(M.mau, .5, n, 1), .7);
          t.dan(a, r, 1078, 313.6);
        })(a);
      }, hau: function (a, n, r, e, t, c) {
        if (A) {
          n[r + 3] = 0;
          a.loNham[(t >> 5) * a.TW + (e >> 5)] = 1;
        }
      }, hauKy: function (a, n) {
        return r.nuongNham(n);
      }, don: function (a) {
        a.kh = a.sdL = a.sdL0 = a.sdP = a.sdP0 = a.sdU = a.sdS = a.luc = a.heat = a.dLv = null;
        a.chr = a.cid = a.clx = a.cwd = null;
      } };
    r.baoDraw(e);
    e.hh = { FACE: b, RIM: 3, TRAM: x };
  }
  function W() {
    return { nen: g(["#0a090d", "#141217", "#1e1b23", "#2a262f", "#38333d", "#48424d", "#5b545f", "#706873", "#898088"], 9), nenC: g(["#050a0e", "#0a1620", "#10222e", "#193446", "#244a62", "#32627e", "#468098", "#62a0b4", "#8cc4d0"], 9), nenW: g(["#0c0507", "#1a0c0d", "#2c1411", "#43201a", "#5d2e22", "#7a3e2c", "#9a5238", "#be6c48", "#e08a5c"], 9), tro: g(["#16131a", "#221e26", "#322d36", "#463f48", "#5c545c", "#756b72", "#90858a", "#aca0a2", "#cbbfbd"], 9), duong: g(["#120d0e", "#1f1718", "#2e2323", "#403332", "#554743", "#6c5c55", "#85736a", "#a08c80", "#bfa999"], 9), duongW: g(["#160a08", "#2a1510", "#43221a", "#5e3322", "#7e4a30", "#a2663f", "#c88650", "#e8a868", "#ffd09a"], 9), duongC: g(["#0a0e12", "#141e26", "#202e3a", "#324454", "#486070", "#647e8c", "#869ea8", "#b0c4cc", "#d8e8ec"], 9), nguoi: g(["#0a0405", "#160809", "#26100d", "#3a1810", "#552414", "#7a3216", "#a84a1a", "#d77024", "#ffa23c"], 9), lav: g(["#1c0606", "#3a0a06", "#6a1208", "#a02a0c", "#d4501a", "#f08a2a", "#ffb83e", "#ffe08a", "#fff6c8"], 9), da: g(["#05040a", "#0b0810", "#140f1b", "#1e1627", "#2a2036", "#382c46", "#493a58", "#5e4c6e", "#7a6890", "#9a88b0"], 10), daC: g(["#04080e", "#0a1420", "#122436", "#1c3a52", "#2b5470", "#3e7090", "#5a90ae", "#82b4c8", "#b4d8e4"], 9), daW: g(["#0a0405", "#1a0b0b", "#2e1410", "#4a1f14", "#6e2d18", "#964020", "#c25a2a", "#e8803a", "#ffb060"], 9), lat: g(["#0c0a10", "#17141c", "#241f2a", "#352e3a", "#493f4b", "#62555f", "#7c6e75", "#9a8a8e", "#bcaaaa"], 9), latW: g(["#120a0a", "#241410", "#3c2218", "#5a3322", "#7c4a2e", "#a46a3e", "#cc8c52", "#eab06c", "#ffd8a0"], 9), latC: g(["#080c12", "#101a24", "#1c2c3a", "#2c4254", "#406072", "#5a8090", "#80a4b0", "#acc8d0", "#d8ecf0"], 9), tim: g(["#0d0620", "#1a0c3a", "#2c1466", "#431e96", "#6230c6", "#8a52e6", "#b588f8", "#dcbcff", "#f6eaff"], 9), nam: g(["#03141a", "#07262e", "#0c4250", "#126074", "#1a8098", "#28a4be", "#52c8dc", "#92e8f2", "#dcfaff"], 9), mau: g(["#1a0406", "#2e080b", "#4a0e12", "#6a1519", "#8a1c22", "#aa2830"], 6), dong: g(["#2a1a05", "#452a09", "#633d0e", "#84551a", "#a87126", "#cc9036", "#e8ae49", "#f9c862", "#ffe698"], 9) };
  }
  function P(n) {
    var r;
    var e;
    var c = 384;
    var o = 48;
    var i = n / 8 * Math.PI * 2;
    var d = 2 * Math.PI;
    var v = a.Utils.canvas(c, c);
    var h = v.ctx;
    var l = h.createImageData(c, c);
    var m = l.data;
    var s = new Float32Array(64);
    var g = new Float32Array(64);
    var b = new Float32Array(64);
    for (e = 0; e < 8; e++)
      for (r = 0; r < 8; r++) {
        var x = u(r, e, 901) * d;
        var y = 3 + 7 * u(r, e, 902);
        var _ = u(r, e, 906) * d;
        s[8 * e + r] = (r + .18 + .64 * u(r, e, 903)) * o + Math.cos(i + x) * y;
        g[8 * e + r] = (e + .18 + .64 * u(r, e, 904)) * o + Math.sin(i + _) * y;
        b[8 * e + r] = u(r, e, 905);
      }
    for (var w = M.lav, S = 0; S < c; S++)
      for (var p = S / o | 0, k = 0; k < c; k++) {
        for (var A = k / o | 0, W = k + .5 + 3.2 * Math.sin(S * d / 96 + i) + 1.6 * Math.sin(S * d / 48 - 2 * i), P = S + .5 + 3.2 * Math.sin(k * d / 96 + i) + 1.6 * Math.sin(k * d / 192 + i), C = 1e9, N = 1e9, I = 0, L = 0, T = -1; T <= 1; T++)
          for (var U = -1; U <= 1; U++) {
            var D = A + U;
            var F = p + T;
            var H = (D % 8 + 8) % 8;
            var E = (F % 8 + 8) % 8;
            var V = W - (s[8 * E + H] + (D - H) * o);
            var R = P - (g[8 * E + H] + (F - E) * o);
            var G = V * V + R * R;
            if (G < C) {
              N = C;
              L = I;
              C = G;
              I = b[8 * E + H];
            }
            else {
              if (G < N) {
                N = G;
                L = b[8 * E + H];
              }
            }
          }
        C = Math.sqrt(C);
        var K;
        var q = (N = Math.sqrt(N)) - C;
        var B = I > .4;
        var O = L > .4;
        var Q = .5 + .25 * Math.sin(k * d / 96 + 2.2 * Math.sin(S * d / 48 + i) + 5 * I) + .25 * Math.sin(S * d / 96 - 1.8 * Math.sin(k * d / 192 - i) + 4 * L);
        if (B) {
          K = .07 + .13 * u(k / 6 | 0, S / 6 | 0, 907 + (1 & n)) * .5 + .1 * Q * .5 + .08 * I;
          if (q > 6.5 && q < 11) {
            K += .04;
          }
          var j = O ? 1 - f(.8, 4.2, q) : 1 - f(1, 9, q);
          var z = .42 + .5 * j * (.88 + .12 * Math.sin(i + I * d));
          if (j > .02 && z > K) {
            K = z;
          }
        }
        else {
          K = .5 + .2 * Q + .07 * Math.sin(i + 20 * I) + .1 * (1 - f(0, 22, C));
          if (O) {
            K += .22 * (1 - f(.5, 10, q));
          }
          if (!(7 * k + 13 * S + 5 * n & 255)) {
            K = .97;
          }
        }
        var J = 4 * (S * c + k);
        var X = t.xem(w, K, k, S);
        m[J] = X[0];
        m[J + 1] = X[1];
        m[J + 2] = X[2];
        m[J + 3] = 255;
      }
    h.putImageData(l, 0, 0);
    return v.canvas;
  }
}(window.PNTT);
