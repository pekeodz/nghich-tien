!function (a) {
  "use strict";
  var n = a.VeTay;
  if (n) {
    var r = a.ThangLongArt = n.tao({ id: "bat_quai_thach_phan", tienTo: "tlg_", code: { V: 1, v: 2, s: 3, j: 4, o: 5, d: 6, p: 7, 3: 8, "=": 9, "#": 10, Y: 10 } });
    var t = r.kit;
    var v = t.S;
    var h = 32;
    var o = t.h01;
    var e = t.hashU;
    var c = t.clamp01;
    var i = (t.kep, t.smooth);
    var f = (t.bayer, t.nLo);
    var u = t.nMi;
    var s = t.nHi;
    var M = t.mau;
    var b = t.dai;
    var m = 976;
    var g = 669;
    var d = 64;
    var l = null;
    var y = [[608, 704], [896, 1056], [1216, 1312]];
    var x = [255, 196, 120];
    var _ = [110, 240, 224];
    var k = [176, 110, 255];
    var p = 288 / 224;
    var I = [7, 3, 5, 1, 6, 2, 4, 0];
    var T = { x0: 932, x1: 1020, y0: 320, y1: 451 };
    var P = [[255, 186, 206], [255, 232, 140], [236, 240, 255], [214, 190, 255], [255, 160, 130]];
    r.nen = { chuanBi: function (a) {
        l = { ngoc: b(["#3d4c4a", "#586b66", "#7a9089", "#9cb3a8", "#bccdbb", "#d8e3cf", "#eff2dc", "#fffcec"], 8), da: b(["#343a46", "#4d5562", "#687079", "#868b8b", "#a4a699", "#c2c0a8", "#dcd7bc", "#f2ecd0"], 8), phien: b(["#151d2a", "#1f2c40", "#2b3e57", "#3a5370", "#4d6d8a", "#6789a2", "#88a8b8", "#b0c8d0"], 8), vang: b(["#2b1a05", "#452a09", "#633d0e", "#84551a", "#a87126", "#cc9036", "#e8ae49", "#f9c862", "#ffdc88", "#ffeeb3"], 10), nuoc: b(["#0a2236", "#103550", "#184e6c", "#226a88", "#3488a2", "#52a8ba", "#82c8d0", "#b8e6e4", "#e6fbf6"], 9), hac: b(["#0a0712", "#140e20", "#21172f", "#30213f", "#432e56", "#5a4072", "#765a92", "#9678b4"], 8), dat: b(["#1c120f", "#2e1f17", "#45301f", "#5f4329", "#7d5a36", "#9c7a4a", "#bb9a62", "#d6b87e"], 8), co: b(["#10261a", "#183a24", "#245232", "#33703f", "#47904d", "#63ae5c", "#8ccb72", "#b8e493"], 8), tham: b(["#26070a", "#44101a", "#6b1a24", "#962733", "#c03c42", "#e0605a", "#f58c72", "#ffc0a0"], 8), tuong: b(["#182232", "#243347", "#34485f", "#486079", "#627b92", "#8299ac", "#a4b8c4", "#ccd9dc"], 8), ngoi: b(["#0a1830", "#102a4a", "#173f66", "#205a84", "#2e7aa2", "#4a9cbc", "#78c0d2", "#b0e2ea"], 8), son: b(["#2a0808", "#4a1010", "#721a18", "#9c2a22", "#c4422f", "#e2664a", "#f5906c", "#ffc19a"], 8), go: b(["#140a06", "#26150b", "#3d2313", "#573319", "#774922", "#99632e", "#b9823f", "#d8a460"], 8), tim: b(["#100820", "#1e1038", "#321a5a", "#4b2a84", "#6840b0", "#8a62d6", "#b088f0", "#d8b8ff"], 8), cyan: [150, 240, 240], trang: [240, 252, 244] };
        var n = a.cl;
        t.viec(a, "nuoc", function () {
          a.kn = t.dungKhoi(a, function (a) {
            return 8 === n[a];
          }, [2], function (a, n) {
            return 4 * f(a + 20, n + 60) + 2 * u(a + 90, n + 30);
          }, 4);
        });
        t.viec(a, "phien", function () {
          a.ks = t.dungKhoi(a, function (a) {
            return 3 === n[a];
          }, [1], null, 2);
        });
        t.viec(a, "cau", function () {
          !function (a) {
            var n;
            var r;
            var t;
            var v = a.TW;
            var o = a.TH;
            var e = a.cl;
            var c = a.gw;
            var i = a.gh;
            var f = a.brId = new Int16Array(v * o).fill(-1);
            var u = a.cau = [];
            for (t = 0; t < o; t++)
              for (r = 0; r < v; r++)
                if (!(9 !== e[t * v + r] || f[t * v + r] >= 0)) {
                  var s = [[r, t]];
                  var M = r;
                  var b = r;
                  var m = t;
                  var g = t;
                  var d = u.length;
                  for (f[t * v + r] = d; s.length;) {
                    var l = s.pop();
                    if (l[0] < M) {
                      M = l[0];
                    }
                    if (l[0] > b) {
                      b = l[0];
                    }
                    if (l[1] < m) {
                      m = l[1];
                    }
                    if (l[1] > g) {
                      g = l[1];
                    }
                    [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(function (a) {
                      var n = l[0] + a[0];
                      var r = l[1] + a[1];
                      if (!(n < 0 || r < 0 || n >= v || r >= o)) {
                        if (9 === e[r * v + n] && f[r * v + n] < 0) {
                          f[r * v + n] = d;
                          s.push([n, r]);
                        }
                      }
                    });
                  }
                  u.push({ x0: M * h, y0: m * h, x1: (b + 1) * h, y1: (g + 1) * h, id: d });
                }
            u.forEach(function (n) {
              for (var r = !1, t = n.y0 / h - 1; t <= n.y1 / h; t++)
                for (var v = n.x0 / h - 1; v <= n.x1 / h; v++)
                  8 === S(a, v, t) && (r = !0);
              n.nuoc = r;
            });
            var y;
            var x;
            var _ = a.bed = new Float32Array(c * i).fill(9);
            var k = { tree_pine: [30, 15], oak_tree: [32, 16], forest_tree_round: [30, 15], forest_tree_lean: [30, 15], forest_tree_tall: [40, 19], forest_bush_dense: [22, 11], forest_bush_spread: [24, 11], forest_bush_cardamom: [22, 11], dt_icon_binh_hoa: [14, 7] };
            var p = a.data.decorations || [];
            for (n = 0; n < p.length; n++) {
              var I = p[n];
              var T = k[I.name];
              if (T) {
                var P = I.tx * h + 16;
                var w = (I.ty + 1) * h - 5;
                for (x = Math.max(0, (w - 1.4 * T[1]) / 4 | 0); x <= Math.min(i - 1, (w + 1.4 * T[1]) / 4 | 0); x++)
                  for (y = Math.max(0, (P - 1.4 * T[0]) / 4 | 0); y <= Math.min(c - 1, (P + 1.4 * T[0]) / 4 | 0); y++) {
                    var W = (4 * y + 2 - P) / T[0];
                    var A = (4 * x + 2 - w) / T[1];
                    var H = Math.sqrt(W * W + A * A);
                    if (H < _[x * c + y]) {
                      _[x * c + y] = H;
                    }
                  }
              }
            }
          }(a);
        });
        t.viec(a, "sang", function () {
          !function (a) {
            var n;
            var r = a.W;
            var v = a.H;
            var o = a.gw;
            var e = a.gh;
            var c = a.luc = new Float32Array(o * e * 3);
            var i = a.data.decorations || [];
            var f = [1, 0, 0];
            var u = [0, 1, 0];
            for (n = 0; n < i.length; n++) {
              var s = i[n];
              var M = s.tx * h + 16;
              var b = (s.ty + 1) * h;
              if ("dt_den" === s.name) {
                t.congSang(a, c, M, b - 44, 70, f, .5, 1);
              }
              else {
                if ("dt_lu_hoa" === s.name) {
                  t.congSang(a, c, M, b - 30, 84, f, .65, 1);
                }
                else {
                  if ("dt_den_long" === s.name) {
                    t.congSang(a, c, M, b - 24, 50, f, .42, 1);
                  }
                  else {
                    if ("dt_icon_thach_dang" === s.name) {
                      t.congSang(a, c, M, b - 28, 46, f, .34, 1);
                    }
                    else {
                      if ("dt_tru" === s.name) {
                        t.congSang(a, c, M, b - 26, 92, u, .36, 1);
                      }
                      else {
                        if ("tgt_khi_bong" === s.name) {
                          t.congSang(a, c, M, b - 20, 130, u, .7, 1);
                        }
                      }
                    }
                  }
                }
              }
            }
            t.congSang(a, c, m, g, 240, u, .26, 1);
            t.congSang(a, c, 960, 1171.2, 200, [0, 0, 1], .7, 1);
            t.congSang(a, c, 208, 960, 120, f, .25, 1);
            var d = a.sh = new Uint8Array(r * v);
            function l(a, n, t, h, o, e, c) {
              function i(o, e, c) {
                for (var i = [a, t, t + o, t + o, a + o, a], f = [n, n, n + e, h + e, h + e, h], u = Math.max(0, Math.floor(n)); u < Math.min(v, Math.ceil(h + e)); u++) {
                  for (var s = u + .5, M = 1e9, b = -1e9, m = 0; m < 6; m++) {
                    var g = (m + 1) % 6;
                    var l = f[m];
                    var y = f[g];
                    if (l <= s && y > s || y <= s && l > s) {
                      var x = i[m] + (s - l) * (i[g] - i[m]) / (y - l);
                      if (x < M) {
                        M = x;
                      }
                      if (x > b) {
                        b = x;
                      }
                    }
                  }
                  if (!(b < M)) {
                    for (var _ = Math.max(0, Math.round(M)); _ < Math.min(r, Math.round(b)); _++)
                      d[u * r + _] < c && (d[u * r + _] = c);
                  }
                }
              }
              i(o, e, 1);
              if (!(c)) {
                i(.5 * o, .5 * e, 2);
              }
            }
            a.dungBong = l;
            var y = { dt_pho_lau: [-80, -96, 80, 0, 62, 34], dt_cho: [-48, -32, 48, 0, 26, 14], dt_thap: [-48, -96, 48, 0, 92, 50], dt_thuy_dinh: [-64, -96, 64, 0, 40, 22], dt_dai_dien: [-144, -128, 144, 0, 96, 42], dt_tru: [-9, -6, 9, 0, 26, 12], dt_den: [-7, -6, 7, 0, 20, 9], dt_long_tru: [-11, -6, 11, 0, 30, 14], dt_thap_canh: [-22, -14, 22, 0, 48, 24], dt_lu_hoa: [-9, -6, 9, 0, 16, 8], dt_bia_gioi: [-9, -6, 9, 0, 18, 8], dt_icon_thach_dang: [-7, -5, 7, 0, 14, 7], dt_mon: [-62, -14, 62, 0, 50, 22] };
            for (n = 0; n < i.length; n++) {
              var x = i[n];
              var _ = y[x.name];
              if (_) {
                var k = x.tx * h + 16;
                var p = (x.ty + 1) * h;
                l(k + _[0], p + _[1], k + _[2], p + _[3], _[4], _[5]);
              }
            }
          }(a);
        });
      }, to: function (a, n, r, b) {
        var x = n >> 5;
        var _ = r >> 5;
        var k = 31 & n;
        var S = 31 & r;
        var w = a.cl[_ * a.TW + x];
        if (1 === w) {
          return function (a, n, r, t, e) {
            var c = a.W;
            var f = a.H;
            var u = r;
            var M = f - 1 - r;
            var b = n;
            var m = c - 1 - n;
            var g = (Math.min(u, M, b, m), t < 2 || t > a.TW - 3);
            var x = e < 2 || e > a.TH - 3;
            if (g && x) {
              return function (a, n, r, t, e) {
                var c = n + .5 - (t < 2 ? 1 : a.TW - 1) * h;
                var i = r + .5 - (e < 2 ? 1 : a.TH - 1) * h;
                var f = Math.abs(c);
                var u = Math.abs(i);
                var s = Math.max(f, u);
                if (s > 31) {
                  return A(0, n, r, 20, 20, n + r, 0);
                }
                var M = f > u ? c < 0 ? 0 : 1 : i < 0 ? 2 : 3;
                var b = s / 31;
                var m = Math.floor(6 * (1 - b));
                var g = .3 + .3 * (1 - b) + (0 === M ? .16 : 2 === M ? .1 : 1 === M ? -.1 : -.04);
                var d = M < 2 ? i : c;
                var y = Math.floor((d + 40) / 5);
                var x = d + 40 - 5 * y;
                if (x < 1) {
                  g -= .1;
                }
                else {
                  if (x < 2) {
                    g += .04;
                  }
                }
                if (31 * (1 - b) % 6 < 1) {
                  g -= .06;
                }
                v.ram = l.ngoi;
                v.v = g + .04 * (o(y, m, 81) - .5);
                v.nx = 0;
                v.ny = 0;
                if (Math.abs(f - u) < 1.2 && s > 4) {
                  v.ram = l.vang;
                  v.v = .52 + .2 * (1 - b);
                }
                if (s < 4.5) {
                  v.ram = l.vang;
                  v.v = .84 - .04 * s;
                }
                if (s > 28) {
                  v.v -= .14;
                }
              }(a, n, r, t, e);
            }
            if (g) {
              var _ = t < 2 ? n : n - (c - d);
              var k = t < 2 ? 63 - _ : _;
              return A(0, n, r, 63 - k, k, r, 0);
            }
            var p = e < 2 ? r : r - (f - d);
            var I = e < 2 ? 63 - p : p;
            var T = 63 - I;
            return e < 2 ? function (a, n, r, t, h) {
              var e = 26;
              if (h < e) {
                var c = Math.floor(r / 13);
                var f = 1 & c ? 13 : 0;
                var u = Math.floor((n + f) / 26);
                var M = n + f - 26 * u;
                var b = r - 13 * c;
                var m = .4 + .1 * (o(u, c, 71) - .5) + .04 * s(n, r) + .1 * i(e, 0, h) * 0;
                if (b < 1) {
                  m -= .16;
                }
                else {
                  if (b >= 12) {
                    m -= .22;
                  }
                  else {
                    if (b < 3) {
                      m += .05;
                    }
                  }
                }
                if (M < 1) {
                  m -= .16;
                }
                else {
                  if (M > 24) {
                    m -= .08;
                  }
                  else {
                    if (M < 3) {
                      m += .04;
                    }
                  }
                }
                m -= .26 * i(8, 0, h);
                m += .08 * i(e - 6, e, h);
                v.ram = l.tuong;
                v.v = m;
                v.nx = 0;
                v.ny = .3;
                for (var g = 0; g < y.length; g++) {
                  var d = y[g];
                  var x = (d[0] + d[1]) / 2;
                  var _ = (d[1] - d[0]) / 2 - 6;
                  var k = Math.abs(n - x);
                  var p = e - h;
                  if (k < _) {
                    var I = 22;
                    var T = Math.sqrt(Math.max(0, 1 - k / _ * (k / _))) * (I - 8) + 8;
                    if (p < T) {
                      var P = p / T;
                      v.ram = l.ngoc;
                      v.v = .4 + .46 * P * (1 - k / _ * .4);
                      v.mau = null;
                      if (p > T - 2.2) {
                        v.ram = l.vang;
                        v.v = .66;
                      }
                    }
                    else {
                      if (p < T + 3) {
                        v.ram = l.vang;
                        v.v = .55;
                      }
                    }
                  }
                }
              }
              else {
                A(0, n, r, t, h, n, 0);
              }
            }(0, n, r, T, I) : A(0, n, r, T, I, n, 1);
          }(a, n, r, x, _);
        }
        if (9 === w) {
          return function (a, n, r, t, h) {
            var e = a.cau[a.brId[h * a.TW + t]];
            var c = e.x1 - e.x0;
            var i = e.y1 - e.y0;
            var u = n - e.x0;
            var M = r - e.y0;
            var b = c >= i;
            if (!e.nuoc) {
              return H(a, n, r, t, h, 31 & n, 31 & r);
            }
            if (b) {
              if (M < 11) {
                return q(0, n, r, u, M, !0, e);
              }
              if (M >= i - 7) {
                return q(0, n, r, u, i - 1 - M, !1, e);
              }
            }
            else if (u < 7 || u >= c - 7) {
              v.ram = l.son;
              return void (v.v = .46);
            }
            var m = Math.floor(u / 8);
            var g = u - 8 * m;
            var d = .48 + .1 * (o(m, e.id, 91) - .5) + .04 * s(n, r) + .04 * f(n, 3 * r);
            if (0 === g) {
              d -= .22;
            }
            else {
              if (1 === g) {
                d += .06;
              }
            }
            if ((M + 5 * m) % 13 == 0) {
              d -= .06;
            }
            v.ram = l.go;
            v.v = d;
            v.nx = 0;
            v.ny = 0;
            if (!(3 !== g || 13 !== M && M !== i - 10)) {
              v.ram = l.vang;
              v.v = .7;
            }
            if (M >= 11 && M < 17) {
              v.v -= .16 * (1 - (M - 11) / 6);
            }
          }(a, n, r, x, _);
        }
        if (10 === w || !function (a, n, r) {
          var t = T;
          if (n < t.x0 || n >= t.x1 || r < t.y0 || r >= t.y1) {
            return !1;
          }
          var h = n - t.x0;
          var o = t.x1 - t.x0;
          var e = r - t.y0;
          var c = Math.min(h, o - 1 - h);
          var i = t.y1 - 1 - r;
          if (v.nx = 0, v.ny = 0, c < 1) {
            v.ram = l.tham;
            v.v = .1;
            return !0;
          }
          if (c < 3) {
            v.ram = l.vang;
            v.v = .62 - (c < 2 ? 0 : .1);
            return !0;
          }
          if (c < 9) {
            v.ram = l.tham;
            v.v = .3 + (c < 5 ? .04 : 0) + .03 * s(n, r);
            if (c > 4.5 && c < 7.5 && e % 12 < 2) {
              v.ram = l.vang;
              v.v = .66;
            }
            return !0;
          }
          if (c < 10.5) {
            v.ram = l.vang;
            v.v = .52;
            return !0;
          }
          var f = h - o / 2;
          var u = (r + 6) % 22 - 11;
          var M = Math.abs(f) / 26 + Math.abs(u) / 11;
          v.ram = l.tham;
          v.v = .42 + .03 * s(n, r);
          if (M < 1) {
            v.v = .34 + (M > .8 ? .06 : 0) + .04 * (1 - M);
            if (M < .22) {
              v.ram = l.vang;
              v.v = .66;
            }
          }
          if (Math.abs(f) < 1) {
            v.ram = l.vang;
            v.v = .46;
          }
          if (i < 5 && n % 3 != 0) {
            v.ram = l.vang;
            v.v = .5 - .02 * i;
          }
          return !0;
        }(0, n, r)) {
          if (a.kn.M[b]) {
            return function (a, n, r, t, h, e) {
              var c = a.kn;
              var M = c.U[e];
              var b = c.E[e];
              if (M < 11) {
                var m = Math.floor((M + 50) / 5.5);
                var g = 1 & m ? 11 : 0;
                var d = Math.floor((n + g) / 22);
                var y = n + g - 22 * d;
                var x = M + 50 - 5.5 * m;
                var _ = .4 + .1 * (o(d, m, 71) - .5) + .04 * s(n, r);
                if (x < .9) {
                  _ -= .14;
                }
                if (y < 1) {
                  _ -= .12;
                }
                _ -= .26 * i(0, 11, 11 - M) * 0;
                _ -= .2 * i(3, 11, M);
                v.ram = l.tuong;
                v.v = _ + .1;
                v.nx = 0;
                v.ny = .3;
                return void (M > 8.5 && (v.ram = l.nuoc, v.v = .26 + .03 * (11 - M)));
              }
              var k = .5 - .1 * i(0, 26, b) + .07 * f(n + 100, r + 20) + .04 * u(2 * n, r);
              var p = Math.sin(.3 * n + .11 * r + 7 * u(n + 10, r + 40));
              if (p > .82) {
                k += .1;
              }
              else {
                if (p < -.86) {
                  k -= .06;
                }
              }
              k -= .2 * i(17, 11, M);
              if (b < 6) {
                k += .1 * (1 - b / 6);
              }
              v.ram = l.nuoc;
              v.v = k;
              v.nx = 0;
              v.ny = 0;
              if ((13 * (n >> 1) + 7 * (r >> 1)) % 41 == 0 && s(n, r) > 0) {
                v.v = .9;
              }
            }(a, n, r, 0, 0, b);
          }
          switch ((8 === w && (w = 2), w)) {
            case 10:
              !function (a, n, r, t, h, e, c) {
                var i = r >> 5;
                var u = 1 & i ? 32 : 0;
                var M = n + u & 63;
                var b = 31 & r;
                var m = .6 + .07 * (o(n + u >> 6, i, 29) - .5) + .06 * f(n + 70, r + 10) + .02 * s(n, r);
                if (0 === M || 0 === b) {
                  m -= .16;
                }
                else {
                  if (1 === M || 1 === b) {
                    m += .05;
                  }
                  else {
                    if ((M >= 62 || b >= 30)) {
                      m -= .06;
                    }
                  }
                }
                a.data.ground;
                m += W(a, t, h, e, c, 10);
                v.ram = l.da;
                v.v = m;
                v.nx = 0;
                v.ny = 0;
              }(a, n, r, x, _, k, S);
              break;
            case 6:
            case 7:
              !function (a, n, r, t, h, o) {
                var c = .48 + .12 * f(n, r) + .08 * u(n + 30, r + 14) + .05 * s(n, r);
                v.ram = l.dat;
                v.nx = 0;
                v.ny = 0;
                var i = r - 928;
                if (6 === o && i >= 0 && i < 64) {
                  var M = Math.min(Math.abs(i - 14), Math.abs(i - 50));
                  if (M < 3) {
                    c -= .12 * (1 - M / 3);
                  }
                }
                var b = n / 6 | 0;
                var m = r / 6 | 0;
                var g = e(b, m, 501);
                if ((7 & g) < (7 === o ? 4 : 2)) {
                  var d = 1.3 + .5 * (g >>> 4 & 3);
                  var y = (n + .5 - (6 * b + 2.5 + (g >>> 8 & 1))) / d;
                  var x = (r + .5 - (6 * m + 2.5 + (g >>> 10 & 1))) / (.75 * d);
                  var _ = y * y + x * x;
                  if (_ < 1) {
                    c = .5 + .22 * (1 - _) - (.05 * y + .08 * x) + .02 * (g >>> 14 & 3);
                  }
                  else {
                    if (_ < 1.8 && y + x > 0) {
                      c -= .08;
                    }
                  }
                }
                c += .6 * W(a, t, h, 31 & n, 31 & r, o);
                v.v = c;
              }(a, n, r, x, _, w);
              break;
            case 5:
              !function (a, n, r, h, e, c, i) {
                var M = .34 + .09 * f(n + 30, r + 80) + .05 * u(n + 7, r + 1) + .035 * s(n, r) + .06 * (o(n >> 5, r >> 5, 33) - .5);
                if (0 === c || 0 === i) {
                  M -= .14;
                }
                else {
                  if (!(1 !== c && 1 !== i)) {
                    M += .05;
                  }
                }
                v.ram = l.hac;
                v.nx = 0;
                v.ny = 0;
                var b = t.rach(n + 90, r + 30);
                if (b > 233) {
                  v.mau = l.tim[3 + (b - 233 >> 2 > 2 ? 2 : b - 233 >> 2)];
                }
                else {
                  M += .8 * W(a, h, e, c, i, 5);
                  v.v = M;
                }
              }(a, n, r, x, _, k, S);
              break;
            case 4:
              !function (a, n, r, h, M, b, d) {
                var y = 63 & n;
                var x = 63 & r;
                var _ = o(n >> 6, r >> 6, 13);
                var k = .66 + .08 * (_ - .5) + .09 * f(n + 11, r + 37) + .05 * u(2 * n + 5, 2 * r + 9) + .025 * s(n, r);
                var T = Math.abs(Math.sin(.034 * n + .021 * r + 6 * f(300 + (n >> 1), 70 + (r >> 1))));
                if (T < .045) {
                  k -= .07;
                }
                else {
                  if (T < .1) {
                    k += .02;
                  }
                }
                if (t.rach(n, r) > 232 && _ < .5) {
                  k -= .1;
                }
                if (Math.sin(.04 * (n + r) + 9 * _) > .93) {
                  k += .06;
                }
                if (0 === y || 0 === x) {
                  k -= .22;
                }
                else {
                  if (1 === y || 1 === x) {
                    k += .07;
                  }
                  else {
                    if ((y >= 62 || x >= 62)) {
                      k -= .08;
                    }
                  }
                }
                k += W(a, h, M, b, d, 4);
                v.ram = l.ngoc;
                v.v = k;
                v.nx = 0;
                v.ny = 0;
                if (!(function (a, n, r) {
                  if (4 !== 4) {
                    return !1;
                  }
                  var t;
                  var h = -1;
                  if (r > 893 && Math.abs(n - m) < 4 ? (h = Math.abs(n - m), t = r) : Math.abs(r - g) < 4 && (n > 1284 || n < 668) && (h = Math.abs(r - g), t = n), h < 0) {
                    return !1;
                  }
                  if (v.nx = 0, v.ny = 0, h < 1.2) {
                    v.ram = l.ngoc;
                    v.v = .92;
                    return !0;
                  }
                  if (h < 2.6) {
                    v.ram = l.vang;
                    v.v = .58 - (h > 2 ? .08 : 0);
                    return !0;
                  }
                  var o = (t % 48 + 48) % 48 - 24;
                  return Math.abs(o) + h < 6.4 && h < 5.6 && (v.ram = l.vang, v.v = .62 + .16 * (1 - (Math.abs(o) + h) / 6.4), !0);
                }(0, n, r))) {
                  (function (a, n, r, t) {
                    var h = n - m;
                    var o = (r - g) * p;
                    var u = Math.sqrt(h * h + o * o);
                    if (u > 300) {
                      return !1;
                    }
                    var M;
                    var b = Math.atan2(o, h);
                    for (M = 0; M < 8; M++) {
                      var d = M * Math.PI / 4;
                      var y = h - 288 * Math.cos(d);
                      var x = o - 288 * Math.sin(d);
                      var _ = Math.sqrt(y * y + x * x);
                      if (_ < 19) {
                        v.nx = 0;
                        v.ny = 0;
                        return _ > 16.2 ? (v.ram = l.vang, v.v = .66 - .004 * (y + x), !0) : _ > 14.2 ? (v.ram = l.phien, v.v = .26, !0) : (v.ram = l.ngoc, v.v = .3 + .3 * (1 - _ / 14.2) + (_ < 6 ? .18 : 0), Math.abs(_ - 9.5) < .7 && (v.v += .14), !0);
                      }
                    }
                    var k = Math.abs(u - 288);
                    if (k < 3.4) {
                      v.ram = l.vang;
                      v.v = .54 + .22 * (1 - k / 3.4) - (4e-4 * h + 4e-4 * o);
                      v.nx = -.2;
                      v.ny = -.3;
                      return !0;
                    }
                    if (k < 5.6) {
                      v.ram = l.phien;
                      v.v = .2;
                      v.nx = 0;
                      v.ny = 0;
                      return !0;
                    }
                    if (u > 288) {
                      v.v = t - .08 * i(14, 5.6, u - 288);
                      return !1;
                    }
                    if (u > 251 && u < 282) {
                      var T = Math.abs(u - 252.4);
                      var P = Math.abs(u - 281);
                      if (v.nx = 0, v.ny = 0, T < 1 || P < 1) {
                        v.ram = l.vang;
                        v.v = .52;
                        return !0;
                      }
                      if (u > 254 && u < 279) {
                        var S = Math.floor(266 * b / 12);
                        var w = u - 254;
                        var W = !1;
                        var A = 266 * b - 12 * S - 6;
                        var H = w - 12.5;
                        switch (7 & e(S, 7, 311)) {
                          case 0:
                            W = Math.abs(A) < .9 && Math.abs(H) < 8;
                            break;
                          case 1:
                            W = Math.abs(H) < .9 && Math.abs(A) < 4.5;
                            break;
                          case 2:
                            W = Math.abs(A) < .9 && Math.abs(H) < 7 || Math.abs(H) < .9 && Math.abs(A) < 4.5;
                            break;
                          case 3:
                            W = Math.abs(Math.abs(A) - 3.5) < .9 && Math.abs(H) < 6 || Math.abs(Math.abs(H) - 6) < .9 && Math.abs(A) < 3.5;
                            break;
                          case 4:
                            W = Math.abs(A - .5 * H) < .9 && Math.abs(H) < 8;
                            break;
                          case 5:
                            W = Math.abs(A) < 1.4 && Math.abs(H - 4) < 1.4 || Math.abs(A) < 1.4 && Math.abs(H + 4) < 1.4;
                            break;
                          case 6:
                            W = Math.abs(Math.abs(A) - 3) < .9 && Math.abs(H) < 7 || Math.abs(H) < .9 && Math.abs(A) < 3.5;
                            break;
                          default: W = Math.abs(A) < .9 && Math.abs(H) < 8 || Math.abs(H - 6) < .9 && Math.abs(A) < 3;
                        }
                        v.ram = l.ngoc;
                        return W ? (v.ram = l.vang, v.v = .5, !0) : (v.v = .3 + .06 * Math.sin(.4 * w) + .025 * s(n, r), !0);
                      }
                    }
                    if (u > 157 && u < 251) {
                      var q = .58 + .05 * (1 - Math.abs(u - 204) / 50) + .05 * f(n + 60, r + 40) + .025 * s(n, r);
                      v.ram = l.ngoc;
                      v.nx = 0;
                      v.ny = 0;
                      var B = Math.abs(u - 158.5);
                      var C = Math.abs(u - 249.5);
                      if (B < 1.1 || C < 1.1) {
                        v.ram = l.vang;
                        v.v = .56;
                        return !0;
                      }
                      var E = Math.abs((b + 2 * Math.PI) % (Math.PI / 4) - Math.PI / 8) * u;
                      if (E < 1 && Math.abs(u - 204) > 22) {
                        v.ram = l.ngoc;
                        v.v = .86;
                        return !0;
                      }
                      if (E < 2 && Math.abs(u - 204) > 22) {
                        q -= .06;
                      }
                      var U = Math.round(b / (Math.PI / 4));
                      var Y = U * Math.PI / 4;
                      var F = (U % 8 + 8) % 8;
                      var K = Math.cos(Y);
                      var L = Math.sin(Y);
                      var R = h - 204 * K;
                      var V = o - 204 * L;
                      var X = -R * L + V * K;
                      var j = R * K + V * L;
                      if (Math.abs(X) < 19) {
                        var N = I[F];
                        for (M = 0; M < 3; M++) {
                          var O = 10 * (M - 1);
                          if (Math.abs(j - O) < 2.4 && (1 == (N >> M & 1) || Math.abs(X) > 5)) {
                            v.ram = l.vang;
                            v.v = .66 - .06 * (j - O);
                            if (Math.abs(j - O) > 1.6) {
                              v.v -= .14;
                            }
                            return !0;
                          }
                        }
                      }
                      v.v = q;
                      return !0;
                    }
                    if (u > 145 && u < 160) {
                      v.ram = l.ngoc;
                      v.v = .62;
                      v.nx = 0;
                      v.ny = 0;
                      return !0;
                    }
                    if (u > 60 && u <= 145) {
                      var z = .66 + .05 * f(n + 10, r + 90) + .025 * s(n, r) + .06 * i(145, 62, u);
                      v.ram = l.ngoc;
                      v.nx = 0;
                      v.ny = 0;
                      var D = Math.abs(u - 146.5);
                      var G = Math.abs(u - 75);
                      if (D < 1.2 || G < 1) {
                        v.ram = l.vang;
                        v.v = .56;
                        return !0;
                      }
                      var J = (b + 2 * Math.PI) % (Math.PI / 8) - Math.PI / 16;
                      var Q = u;
                      var Z = Math.abs(J) * Q;
                      var $ = 11.5 * Math.sin(Math.PI * c((Q - 78) / 66));
                      if (Q > 78 && Q < 144 && Math.abs(Z - $) < .9) {
                        v.ram = l.vang;
                        v.v = .46;
                        return !0;
                      }
                      if (Q > 78 && Q < 144 && Z < $) {
                        z += .04 + .05 * (1 - Z / ($ + .1));
                      }
                      var aa = Math.round(b / (Math.PI / 4));
                      return Math.abs(b - aa * Math.PI / 4) * u < 1.1 && u > 78 && u < 143 ? (v.ram = l.ngoc, v.v = .9, !0) : (v.v = z, !0);
                    }
                    if (u <= 60) {
                      if (u > 57.4) {
                        v.ram = l.vang;
                        v.v = .6;
                        v.nx = 0;
                        v.ny = 0;
                        return !0;
                      }
                      var na;
                      var ra = Math.hypot(h, o + 30);
                      var ta = Math.hypot(h, o - 30);
                      na = ra < 30 ? ra > 7.5 : ta < 30 ? ta < 7.5 : h > 0;
                      v.nx = 0;
                      v.ny = 0;
                      if (na) {
                        v.ram = l.ngoc;
                        v.v = .86 + .04 * s(n, r);
                      }
                      else {
                        v.ram = l.tim;
                        v.v = .14 + .04 * s(n, r) + .05 * (1 - u / 60);
                      }
                      if (Math.min(Math.abs(ra - 30), Math.abs(ta - 30)) < .9) {
                        v.ram = l.vang;
                        v.v = .52;
                      }
                      return !0;
                    }
                    v.ram = l.vang;
                    v.v = .56;
                    v.nx = 0;
                    v.ny = 0;
                  })(0, n, r, k);
                }
              }(a, n, r, x, _, k, S);
              break;
            case 3:
              if (x < 22 && _ >= 27 && _ <= 32) {
                (function (a, n, r, t, h, e, c) {
                  var i = .5 + .07 * f(n + 4, r + 9) + .04 * u(n + 60, r + 20) + .03 * s(n, r) + .05 * (o(n >> 5, r >> 5, 17) - .5);
                  if (0 === e || 0 === c) {
                    i -= .16;
                  }
                  else {
                    if (!(1 !== e && 1 !== c)) {
                      i += .05;
                    }
                  }
                  v.ram = l.da;
                  v.v = i - .14;
                  v.nx = 0;
                  v.ny = 0;
                  if (u(n + 10, r + 70) > .1 && o(n >> 1, r >> 1, 77) < .3) {
                    v.ram = l.dat;
                    v.v = .4 + .06 * s(n, r);
                  }
                  i += .5 * W(a, t, h, e, c, 3);
                })(a, n, r, x, _, k, S);
              }
              else {
                (function (a, n, r, h, e, c, i, M) {
                  var b = a.ks;
                  var m = .46 + .07 * f(n + 4, r + 9) + .04 * u(n + 60, r + 20) + .03 * s(n, r) + .05 * (o(n >> 5, r >> 5, 17) - .5);
                  if (0 === c || 0 === i) {
                    m -= .15;
                  }
                  else {
                    if (1 === c || 1 === i) {
                      m += .05;
                    }
                    else {
                      if ((c >= 30 || i >= 30)) {
                        m -= .06;
                      }
                    }
                  }
                  if (t.rach(n + 40, r + 12) > 232) {
                    m -= .08;
                  }
                  m += W(a, h, e, c, i, 3);
                  v.ram = l.phien;
                  v.v = m;
                  v.nx = 0;
                  v.ny = 0;
                  var g = b.E[M];
                  if (b.M[M]) {
                    var d = Math.abs(g - 27.3);
                    if (d < 1.5) {
                      v.ram = l.vang;
                      v.v = .56 + .16 * (1 - d / 1.5);
                    }
                    else {
                      if (d < 3) {
                        v.v -= .07;
                      }
                      else {
                        if (d < 6 && g < 27.3) {
                          v.v += .02;
                        }
                      }
                    }
                  }
                })(a, n, r, x, _, k, S, b);
              }
              break;
            default: H(a, n, r, x, _, k, S);
          }
          if (5 !== w && 6 !== w && 7 !== w && 10 !== w) {
            var B = M(a, a.bed, n, r);
            if (B < 1.16) {
              (function (a, n, r, t) {
                if (t < .86) {
                  var h = .5 * u(1.3 * n + 40, 1.3 * r) + .5 * s(n, r);
                  v.ram = l.co;
                  v.v = .36 + .14 * (1 - t) + .18 * h;
                  v.nx = 0;
                  v.ny = 0;
                  if (e(n >> 1, r >> 1, 611) % 53 == 0) {
                    v.mau = P[e(n >> 3, r >> 3, 612) % P.length];
                  }
                  else {
                    if (e(n, r, 613) % 29 == 0) {
                      v.v += .16;
                    }
                  }
                  return !0;
                }
                if (t < 1) {
                  v.ram = l.dat;
                  v.v = .3 + .06 * s(n, r);
                  v.nx = 0;
                  v.ny = 0;
                }
                else {
                  if (t < 1.14) {
                    v.ram = l.da;
                    v.v = .66 - 1.2 * (t - 1) + .03 * s(n, r);
                    v.nx = 0;
                    v.ny = 0;
                  }
                }
              })(0, n, r, B);
            }
          }
          !function (a, n, r, t, h) {
            var o = a.kn;
            var e = M(a, o.sd, n, r);
            if (e > 0 && e < 7) {
              var c = e;
              if (c < 1.4) {
                v.ram = l.tuong;
                v.v = .22;
              }
              else {
                if (c < 5.2) {
                  v.ram = l.da;
                  v.v = .66 + (c < 2.6 ? .08 : 0) - (c > 4 ? .06 : 0) + .03 * s(n, r);
                }
                else {
                  v.v = h - .1;
                }
              }
            }
          }(a, n, r, 0, v.v);
        }
      }, hau: function (a, n, r, v, h, o) {
        var e = t.docSang(a, a.luc, v, h);
        var c = e[0];
        var i = e[1];
        var f = e[2];
        if (c > .02) {
          t.cong(n, r, x, .42 * Math.min(.55, c));
        }
        if (i > .02) {
          t.cong(n, r, _, .34 * Math.min(.55, i));
        }
        if (f > .02) {
          t.cong(n, r, k, .36 * Math.min(.8, f));
        }
        var u = a.sh[o];
        if (u) {
          var s = 2 === u ? .72 : .86;
          n[r] *= .95 * s;
          n[r + 1] *= .99 * s;
          n[r + 2] *= 1.07 * s;
        }
      }, don: function (a) {
        a.kn = null;
        a.ks = null;
        a.sh = null;
        a.luc = null;
        a.bed = null;
        a.brId = null;
        a.cau = null;
        a.dungBong = null;
      } };
    r.hh = { CX: m, CY: g, RX: 288, RY: 224, AO: { x: 1648, y: 832, rx: 153.6, ry: 112 }, CUA_BAC: y };
  }
  function S(a, n, r) {
    return n < 0 || r < 0 || n >= a.TW || r >= a.TH ? 1 : a.cl[r * a.TW + n];
  }
  function w(a) {
    return 4 === a ? 4 : 3 === a ? 3 : 2 === a ? 2 : 10 === a || 5 === a ? 3 : 1;
  }
  function W(a, n, r, t, v, h) {
    var o;
    var e = w(h);
    var c = 0;
    function i(a) {
      return a !== h && 1 !== a && 8 !== a && 9 !== a && w(a) !== e;
    }
    if (v < 4 && i(o = S(a, n, r - 1))) {
      c += w(o) < e ? v < 1 ? -.14 : .1 : -.1 * (4 - v) / 4;
    }
    if (v > 27 && i(o = S(a, n, r + 1))) {
      c += w(o) < e ? v > 30 ? -.16 : .04 : -.12 * (v - 27) / 4;
    }
    if (t < 4 && i(o = S(a, n - 1, r))) {
      c += w(o) < e ? t < 1 ? -.14 : .1 : -.1 * (4 - t) / 4;
    }
    if (t > 27 && i(o = S(a, n + 1, r))) {
      c += w(o) < e ? t > 30 ? -.16 : .04 : -.12 * (t - 27) / 4;
    }
    return c;
  }
  function A(a, n, r, t, h, e, c) {
    var i = .46 + .09 * f(n + 10, r + 70) + .04 * s(n, r);
    v.ram = l.tuong;
    v.nx = 0;
    v.ny = 0;
    var u = e / 32 | 0;
    var M = e - 32 * u;
    if (M < 1) {
      i -= .14;
    }
    else {
      if (M < 2) {
        i += .05;
      }
    }
    i += .06 * (o(u, c, 61) - .5);
    var b = function (a) {
      if (a > 11) {
        return 0;
      }
      var n = e % 26 < 14;
      return a <= 1.4 && n ? 3 : n ? 1 : 2;
    };
    var m = b(t);
    var g = b(h);
    if (1 === m || 1 === g) {
      v.ram = l.tuong;
      i = .62 + (1 === m && t < 3 ? .1 : 0) + (1 === g && h < 3 ? .1 : 0);
    }
    else {
      if (3 === m || 3 === g) {
        i = .78;
      }
      else {
        if (!(2 !== m && 2 !== g)) {
          i = .26;
        }
      }
    }
    var d = Math.abs((t - h) / 2);
    if (d < 1 && t > 13 && h > 13 ? (v.ram = l.vang, i = .56) : d < 2 && t > 13 && h > 13 && (i -= .06), t > 14 && h > 14 && d > 4 && d < 12) {
      var y = e % 48 - 24;
      var x = d - 8;
      var _ = Math.sqrt(y * y + x * x * 1.4);
      if ((Math.abs(_ - 6) < .9 || _ < 1.6)) {
        v.ram = l.vang;
        i = .38;
      }
    }
    v.v = i;
  }
  function H(a, n, r, h, e, c, i) {
    var M = o(h, e, 23);
    var b = .56 + (h + e & 1 ? .012 : -.012) + .06 * (M - .5) + .065 * f(n + 50, r + 20) + .03 * u(n + 3, 2 * r) + .02 * s(n, r);
    if (0 === c || 0 === i) {
      b -= .14;
    }
    else {
      if (1 === c || 1 === i) {
        b += .05;
      }
      else {
        if ((c >= 31 || i >= 31)) {
          b -= .06;
        }
      }
    }
    if (t.rach(n, r) > 233 && M < .25) {
      b -= .09;
    }
    b += W(a, h, e, c, i, 2);
    v.ram = l.da;
    v.v = b;
    v.nx = 0;
    v.ny = 0;
  }
  function q(a, n, r, t, h, o, e) {
    var c = t % 40 < 8 || t >= e.x1 - e.x0 - 8;
    var i = t % 40 - 4;
    return o ? h < 2 ? (v.ram = l.ngoc, v.v = .66 + (h < 1 ? .12 : 0), v.nx = 0, void (v.ny = 0)) : c ? (v.ram = l.ngoc, v.v = .46 + (t % 40 < 2 ? .14 : -.06) - (h > 8 ? .1 : 0), v.nx = i < 0 ? -.4 : .4, v.ny = 0, void (h >= 2 && h < 4 && (v.ram = l.vang, v.v = .62))) : h < 5 ? (v.ram = l.son, v.v = .5 + (h < 3 ? .1 : -.1), v.nx = 0, void (v.ny = 0)) : t % 10 < 3 && h < 10 ? (v.ram = l.son, v.v = .44 + (t % 10 == 0 ? .1 : 0), v.nx = 0, void (v.ny = 0)) : (v.ram = l.go, v.v = .24 + .04 * s(n, r), v.nx = 0, void (v.ny = 0)) : h < 2 ? (v.ram = l.ngoc, v.v = .7, v.nx = 0, void (v.ny = 0)) : h < 4.5 ? (v.ram = l.son, v.v = .52 + (h < 3 ? .1 : -.08), v.nx = 0, void (v.ny = 0)) : (v.ram = l.go, v.v = .3, v.nx = 0, v.ny = 0, void (c && (v.ram = l.ngoc, v.v = .54)));
  }
}(window.PNTT);
