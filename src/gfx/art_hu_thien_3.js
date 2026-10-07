!function () {
  "use strict";
  var a = window.PNTT.HuThienArt;
  var n = a.kit;
  var t = n.S;
  var r = 32;
  var h = n.h01;
  var v = (n.clamp01, n.kep, n.smooth);
  var o = (n.bayer, n.nLo);
  var e = n.nMi;
  var i = n.nHi;
  var f = n.mau;
  var M = null;
  function s(a, n) {
    return 1.6 * o(3500 + (.9 * a | 0), 60 + (.9 * n | 0)) + .8 * i(40 + (2.4 * a | 0), 17 + (2.4 * n | 0));
  }
  var b = [[14, -3, 24, 8, .7], [3, -1, 13, 5, .85]];
  var c = [[9, -2, 18, 5, .6], [2, -1, 14, 4, .75]];
  var u = [[8, -2, 20, 6, .6], [2, -1, 14, 4, .7]];
  var g = [[10, -3, 24, 8, .65], [2, -1, 16, 5, .8]];
  var m = [[7, -1, 9, 3.5, .5]];
  function l(a) {
    switch (a) {
      case "ruined_pillar": return b;
      case "ruined_sect_wall": return c;
      case "long_uyen_brazier": return u;
      case "dan_lo_thang_long": return g;
      case "long_uyen_banner": return m;
      default: return null;
    }
  }
  function d(a, n, r, h, v, o) {
    var f = o.r + 6;
    var s = 2 * Math.PI;
    var b = .4 + .04 * i(2 * n, 2 * r + 3) + .08 * e(n + 90, r + 20);
    if (t.ram = M.phong, t.nx = 0, t.ny = 0, h > f - 3) {
      var c = f - h;
      b = c < 1 ? .14 : c < 2 ? .8 : .36;
      t.ram = M.tuong;
    }
    else {
      var u = (v + Math.PI) / s * 8;
      var g = u - Math.floor(u);
      if (h > 10 && (g < .04 || g > .96)) {
        b = .14;
      }
      if (Math.abs(h - (o.r - 8)) < .9) {
        b = .16;
      }
      else {
        if (h < o.r - 8 && h > o.r - 10.5) {
          b += .1;
        }
      }
      if (h < 10) {
        b = .55;
        if (h > 8.4) {
          b = .16;
        }
      }
    }
    t.v = b;
    if (h > 14 && h < o.r - 12 && Math.abs((v + Math.PI) / s * 16 % 1 - .5) < .12) {
      t.ram = M.phong;
      t.v = .9;
    }
  }
  a.ai[3] = { chuanBi: function (a) {
      M = function () {
        var a = n.dai;
        return { dai: a(["#070b10", "#0d141b", "#141e28", "#1c2a37", "#263a4a", "#324c60", "#416279", "#527a93", "#6592ac", "#7aaac2", "#93c1d5", "#b0d7e6"], 12), tuong: a(["#05070b", "#0a0e15", "#11171f", "#1a222e", "#242f3f", "#303e52", "#3f4f66", "#50637c", "#647a93", "#7a91aa", "#93aac1", "#adc3d6"], 12), ngoc: a(["#02100e", "#06201b", "#0b3229", "#124638", "#1b5b48", "#257259", "#328a6c", "#45a283", "#5fba9b", "#82cfb4", "#aae2cf", "#d6f3e8"], 12), vang: a(["#2b1a05", "#452a09", "#633d0e", "#84551a", "#a87126", "#cc9036", "#e8ae49", "#f9c862", "#ffdc88", "#ffeeb3"], 10), tham: a(["#100408", "#1e0910", "#2f0e19", "#441324", "#5c1830", "#75203d", "#902a4b", "#ab375b", "#c6486c", "#df6383"], 10), dong: a(["#150d06", "#24160a", "#38230f", "#503416", "#6b4620", "#88602b", "#a77b38", "#c69749", "#e0b45e", "#f2cf82"], 10), phong: a(["#040a0d", "#08141a", "#0e222b", "#163340", "#1f4655", "#2b5c6d", "#3a7285", "#4d8a9d", "#66a2b4", "#84bac9"], 10), tim: a(["#0a0714", "#140e26", "#20173d", "#2e2257", "#3f316f", "#544588", "#6b5aa2", "#8676bb", "#a294d0", "#c0b3e4"], 10) };
      }();
      var t;
      var h = a.TW;
      var v = a.TH;
      var o = h * v;
      var e = (a.gw, a.gh, a.data);
      var i = a.lo = new Uint8Array(o);
      for (t = 0; t < o; t++)
        switch (a.nen[t]) {
          case "cliff":
            i[t] = 3;
            break;
          case "jade_floor":
            i[t] = 2;
            break;
          case "ancient_ruin_floor":
            i[t] = "ruined_sect_wall" === a.vat[t] ? 5 : 1;
            break;
          default: i[t] = 0;
        }
      var f = e.htDinh || { tx: h / 2 | 0, ty: v / 2 | 0 };
      a.dinh = { x: (f.tx + .5) * r, y: (f.ty + .5) * r };
      var b = new Int16Array(o).fill(-1);
      var c = [];
      for (t = 0; t < o; t++)
        if (!(1 !== i[t] && 5 !== i[t] || b[t] >= 0)) {
          var u = [t];
          var g = c.length;
          var m = 0;
          var d = 0;
          var x = 0;
          var y = 1e9;
          var p = -1;
          var _ = 1e9;
          var w = -1;
          for (b[t] = g; u.length;) {
            var A = u.pop();
            var L = A % h;
            var k = A / h | 0;
            m++;
            d += L;
            x += k;
            y = Math.min(y, L);
            p = Math.max(p, L);
            _ = Math.min(_, k);
            w = Math.max(w, k);
            [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(function (a) {
              var n = L + a[0];
              var t = k + a[1];
              if (!(n < 0 || t < 0 || n >= h || t >= v)) {
                var r = t * h + n;
                if (!(1 !== i[r] && 5 !== i[r] || b[r] >= 0)) {
                  b[r] = g;
                  u.push(r);
                }
              }
            });
          }
          c.push({ sz: m, cx: (d / m + .5) * r, cy: (x / m + .5) * r, x0: y, x1: p, y0: _, y1: w });
        }
      for (a.phong = [], t = 0; t < o; t++)
        if (!(b[t] < 0)) {
          var I = c[b[t]];
          if (!(I.sz < 40)) {
            var P = I.cx - a.dinh.x;
            var R = I.cy - a.dinh.y;
            if (!(P * P + R * R < 4e4)) {
              if (1 === i[t]) {
                i[t] = 4;
              }
              if (a.phong.indexOf(I) < 0) {
                a.phong.push(I);
              }
            }
          }
        }
      a.kh = n.dungKhoi(a, function (a) {
        return 3 === i[a];
      }, [1], s, 2);
      a.rut = (e.htRut || []).map(function (a) {
        return { x: (a.tx + .5) * r, y: (a.ty + .5) * r, r: a.r || 40 };
      });
      var T = 1e9;
      var W = -1;
      (e.portals || []).forEach(function (a) {
        if (a.ty >= v - 2) {
          T = Math.min(T, a.tx);
          W = Math.max(W, a.tx);
        }
      });
      a.tham = W >= 0 ? { cx: (T + W + 1) * r / 2, w: Math.min(136, (W - T + 1) * r - 8) } : { cx: a.W / 2, w: 128 };
      a.RA = 236;
      (function (a) {
        function t(t, r, h) {
          if (t) {
            for (var v = 0; v < t.length; v++)
              n.bongElip(a, r + t[v][0], h + t[v][1], t[v][2], t[v][3], t[v][4]);
          }
        }
        for (var h = 0; h < a.TH; h++)
          for (var v = 0; v < a.TW; v++) {
            var o = a.vat[h * a.TW + v];
            if (o) {
              t(l(o), v * r + 16, (h + 1) * r);
            }
          }
        (a.data.decorations || []).forEach(function (a) {
          t(l(a.name), a.tx * r + 16, (a.ty + 1) * r);
        });
      })(a);
      (function (a) {
        var t = a.gw;
        var h = a.gh;
        var v = t * h;
        var o = a.LW = new Float32Array(v);
        var e = a.LK = new Float32Array(v);
        var i = a.LV = new Float32Array(v);
        (a.data.decorations || []).forEach(function (t) {
          var h = t.tx * r + 16;
          var v = (t.ty + 1) * r;
          if ("long_uyen_brazier" === t.name) {
            n.congSang(a, o, h, v - 26, 132, .95, 1.2);
          }
          if ("dan_lo_thang_long" === t.name) {
            n.congSang(a, o, h, v - 20, 80, .5, 1.2);
          }
        });
        n.congSang(a, e, a.dinh.x, a.dinh.y, 240, .32, 1.1);
        n.congSang(a, i, a.dinh.x, a.dinh.y, 120, .4, 1.1);
        a.rut.forEach(function (t) {
          n.congSang(a, e, t.x, t.y, 96, .4, 1.1);
        });
        n.congSang(a, e, a.tham.cx, a.H - 20, 150, .35, 1);
        a.LW = n.mo(o, t, h, 1);
        a.LK = n.mo(e, t, h, 1);
        a.LV = n.mo(i, t, h, 1);
      })(a);
    }, to: function (a, n, r, f) {
      if (a.kh.M[f]) {
        !function (a, n, r, o) {
          var f = a.kh;
          var s = f.V[o];
          var b = f.U[o];
          var c = f.E[o];
          if (t.nx = 0, t.ny = 0, s < 6e4) {
            var u = Math.floor(s / 16);
            var g = s - 16 * u;
            var m = 1 & u ? 16 : 0;
            var l = Math.floor((n + m) / 32);
            var d = n + m - 32 * l;
            var x = .5 + .12 * (h(l, u, 921) - .5) + .1 * e(n + 60, .7 * r + 10) + .04 * i(2 * n, 2 * r);
            t.ram = M.tuong;
            if (0 === g || 0 === d) {
              x = .14;
            }
            else {
              if (15 === g || 1 === d) {
                x += .09;
              }
              else {
                if (g < 3 || d < 3) {
                  x += .03;
                }
                else {
                  if (g > 12) {
                    x -= .06;
                  }
                }
              }
            }
            var y = b < 6e4 ? b : r;
            if (x *= .72 + .28 * v(0, 60, y) * 0 + .28 * v(10, 44, s), y < 14)
              if (t.ram = M.tuong, x = .28 + .03 * i(2 * n, 2 * r), y < 2) {
                t.ram = M.vang;
                x = .5;
              }
              else if (y >= 4 && y < 6) {
                t.ram = M.vang;
                x = .36;
              }
              else if (y >= 6 && y < 12) {
                var p = (n % 16 + 16) % 16;
                var _ = y - 6;
                if ((0 === _ && p < 12 || 5 === _ && p > 3 || 0 === p && _ < 4 || 12 === p && _ > 1)) {
                  t.ram = M.vang;
                  x = .46;
                }
              }
              else {
                if (y >= 12) {
                  t.ram = M.vang;
                  x = .28;
                }
              }
            if (s < 10) {
              x = .26 + (s < 2 ? 0 : .04) + .04 * i(2 * n, 2 * r);
              if (9 === s) {
                t.ram = M.vang;
                x = .3;
              }
              if (s < 1) {
                x = .08;
              }
            }
            t.v = x;
            return void (c < 2 && (t.v *= .9));
          }
          var w = n / 32 | 0;
          var A = r / 32 | 0;
          var L = n - 32 * w;
          var k = r - 32 * A;
          var I = .36 + .08 * (h(w, A, 931) - .5) + .08 * e(n + 30, r + 90) + .035 * i(2 * n, 2 * r);
          if (t.ram = M.tuong, 0 === L || 0 === k ? I = .1 : 1 !== L && 1 !== k || (I += .07), t.v = I, c >= 7 && c < 13) {
            var P = ((n + r) % 24 + 24) % 24;
            var R = ((n - r) % 24 + 24) % 24;
            if (Math.abs(P - 12) < 1.2 || Math.abs(R - 12) < 1.2) {
              t.ram = M.vang;
              t.v = .3;
            }
            else {
              if (!(7 !== c && 12 !== c)) {
                t.v -= .08;
              }
            }
          }
          if (c < 2) {
            t.ram = M.vang;
            t.v = .5;
          }
          else {
            if (c < 4) {
              t.v += .1;
            }
            else {
              if (c < 6) {
                t.v -= .05;
              }
            }
          }
        }(a, n, r, f);
      }
      else {
        var s = (r >> 5) * a.TW + (n >> 5);
        var b = a.lo[s];
        var c = n + .5 - a.dinh.x;
        var u = r + .5 - a.dinh.y;
        if (c < a.RA && c > -a.RA && u < a.RA && u > -a.RA) {
          var g = Math.sqrt(c * c + u * u);
          if (g < a.RA) {
            return void function (a, n, r, v, o, f) {
              var s = Math.atan2(o, v);
              var b = 2 * Math.PI;
              var c = a.RA;
              if (t.nx = 0, t.ny = 0, f > c - 10) {
                var u = c - f;
                t.ram = M.dong;
                t.v = u < 1 ? .14 : u < 2.4 ? .82 : u < 4 ? .36 : .3;
                return void (u > 5 && (t.ram = M.tuong, t.v = .34 + .05 * i(2 * n, 2 * r)));
              }
              if (f > 176) {
                var g = (s + Math.PI) / b * 24;
                var m = g - Math.floor(g);
                var l = Math.floor(g);
                var d = h(l, 9, 821);
                t.ram = M.tuong;
                var x = .5 + (1 & l ? .05 : -.03) + .07 * (d - .5) + .035 * i(2 * n, 2 * r) + .08 * e(n + 30, r + 60);
                if (m < .03 || m > .97) {
                  x = .13;
                }
                else {
                  if (m < .06) {
                    x += .09;
                  }
                  else {
                    if (m > .94) {
                      x -= .08;
                    }
                  }
                }
                t.v = x;
                var y = f - 201;
                var p = (m - .5) * f * b / 24;
                if (Math.abs(y) < 9 && Math.abs(p) < 5.5)
                  if (Math.abs(y) > 7.2 || Math.abs(p) > 4.2) {
                    t.v = .2;
                  }
                  else {
                    t.ram = M.phong;
                    t.v = .32 + .05 * i(3 * n, 3 * r);
                    var _ = 5 * d | 0;
                    if ((0 === _ && Math.abs(p) < 1.1 || 1 === _ && Math.abs(y) < 1.1 || 2 === _ && Math.abs(Math.abs(y) - Math.abs(p)) < 1.2 || 3 === _ && Math.abs(y * y / 8 + p) < 1.4 || 4 === _ && (Math.abs(y) < 1.1 || Math.abs(p) > 2.8))) {
                      t.ram = M.vang;
                      t.v = .72;
                    }
                  }
              }
              else {
                if (f > 166) {
                  var w = (s + Math.PI) / b * 120;
                  var A = w - Math.floor(w);
                  t.ram = M.vang;
                  t.v = .5;
                  return void (f > 172.5 ? t.v = .28 : f < 168 ? t.v = .3 : A > .4 && A < .6 && (t.v = .86));
                }
                if (f > 100) {
                  var L = .46 + .3 * e(.7 * n + 400, .7 * r + 90) + .05 * i(n + 8, 2 * r + 1);
                  var k = e(60 + (.5 * n + .8 * r | 0), 700 + (.4 * r | 0));
                  if (k > .12) {
                    L += .55 * (k - .12);
                  }
                  t.ram = M.ngoc;
                  t.v = L;
                  Math.cos(s);
                  Math.sin(s);
                  var I = Math.max(Math.abs(v), Math.abs(o)) - 132;
                  var P = Math.abs(Math.abs(v) + Math.abs(o) - 186.6744);
                  if (Math.abs(I) < 1.05) {
                    t.ram = M.vang;
                    t.v = .62;
                  }
                  if (P < 1.05 && Math.abs(v) + Math.abs(o) < 190) {
                    t.ram = M.vang;
                    t.v = .62;
                  }
                  if (Math.abs((s + Math.PI) / b * 8 % 1 - .5) > .485 && f > 106 && f < 160) {
                    t.ram = M.vang;
                    t.v = .44;
                  }
                  var R = (s + Math.PI) / b * 8;
                  var T = R - Math.floor(R);
                  var W = Math.sqrt((f - 140) * (f - 140) + Math.pow((T - .5) * f * b / 8, 2));
                  if (Math.abs(W - 11) < .9) {
                    t.ram = M.vang;
                    t.v = .5;
                  }
                  else {
                    if (W < 4) {
                      t.ram = M.vang;
                      t.v = .7;
                    }
                  }
                  return void (f < 108 && (t.ram = M.vang, t.v = f < 103 ? .32 : .6));
                }
                if (f > 60) {
                  var E = .3 + .16 * e(n + 200, .8 * r + 90) + .04 * i(2 * n, 2 * r);
                  t.ram = M.ngoc;
                  t.v = E;
                  var K = (s + Math.PI) / b * 12;
                  var S = K - Math.floor(K);
                  var q = Math.sqrt((f - 80) * (f - 80) + Math.pow((S - .5) * f * b / 12, 2));
                  if (q < 9.5)
                    if (t.ram = M.phong, t.v = .32, q > 8) {
                      t.ram = M.vang;
                      t.v = .6;
                    }
                    else {
                      var H = Math.floor(K) % 6;
                      var V = (Math.atan2(f - 80, (S - .5) * f * b / 12), (S - .5) * f * b / 12);
                      var z = f - 80;
                      if ((0 === H ? Math.abs(V) < 1.1 || Math.abs(z) < 1.1 : 1 === H ? Math.abs(Math.abs(V) - Math.abs(z)) < 1.2 : 2 === H ? Math.abs(Math.sqrt(V * V + z * z) - 5) < 1.1 : 3 === H ? Math.abs(z) < 1.1 || Math.abs(V - .5 * z) < 1.1 : 4 === H ? Math.abs(V) + Math.abs(z) < 6 && Math.abs(V) + Math.abs(z) > 4 : Math.abs(V) < 1.1 && z < 3 || Math.abs(z + 2) < 1.1)) {
                        t.ram = M.vang;
                        t.v = .8;
                      }
                    }
                  else {
                    if ((Math.abs(f - 60.6) < .7 || Math.abs(f - 99) < .7)) {
                      t.ram = M.vang;
                      t.v = .5;
                    }
                  }
                }
                else {
                  var F = (s + Math.PI) / b * 16;
                  var U = F - Math.floor(F);
                  var j = 2 * Math.abs(U - .5);
                  var B = 56 - j * j * 12;
                  t.ram = M.dong;
                  if (f < B) {
                    t.v = .42 + .3 * (1 - f / B) + (1 & Math.floor(F) ? .06 : -.02) + .04 * i(2 * n, 2 * r);
                    if (j > .9) {
                      t.v = .2;
                    }
                    if (f < 22) {
                      t.ram = M.tuong;
                      t.v = .2 + .004 * f;
                    }
                    if (f < 20 && f > 17.8) {
                      t.ram = M.vang;
                      t.v = .4;
                    }
                  }
                  else {
                    t.ram = M.tuong;
                    t.v = .22 + .04 * i(2 * n, r);
                  }
                }
              }
            }(a, n, r, c, u, g);
          }
        }
        if (4 !== b) {
          if (5 === b) {
            var m = 31 & n;
            var l = 31 & r;
            t.ram = M.tuong;
            t.nx = 0;
            t.ny = 0;
            t.v = .28 + .04 * i(2 * n, 2 * r) + (l < 3 ? .1 : 0);
            return void ((m < 2 || m > 29) && (t.v -= .06));
          }
          var x = a.tham.w / 2;
          var y = n - a.tham.cx;
          if (y > -x && y < x && r > a.dinh.y + a.RA - 6) {
            (function (a, n, r) {
              var h = a.tham.w;
              var v = n - a.tham.cx;
              var o = h / 2 - Math.abs(v);
              var f = .5 + .05 * i(2 * n, 2 * r + 3) + .06 * e(n + 10, r + 70);
              if (t.ram = M.tham, t.nx = 0, t.ny = 0, f += 1 & n ? .02 : -.02, o < 3) {
                t.ram = M.dong;
                return void (t.v = .3);
              }
              if (o < 4.4) {
                t.ram = M.vang;
                return void (t.v = .62);
              }
              if (o < 6) {
                t.ram = M.vang;
                return void (t.v = .26);
              }
              if (o < 8) {
                f -= .14;
              }
              t.v = f;
              var s = (r % 96 + 96) % 96;
              var b = Math.abs(v);
              var c = Math.abs(b) / 30 + Math.abs(s - 48) / 42;
              if (c < 1 && c > .9) {
                t.ram = M.vang;
                t.v = .5;
              }
              else {
                if (c <= .9 && c > .84) {
                  t.ram = M.tham;
                  t.v = .22;
                }
              }
              var u = Math.abs(b) / 9 + Math.abs(s - 48) / 15;
              if (u < 1) {
                t.ram = M.vang;
                t.v = .5 + .3 * (1 - u);
              }
              if ((Math.abs(s) < 1.5 || Math.abs(s - 96) < 1.5) && b < 30) {
                t.ram = M.vang;
                t.v = .36;
              }
            })(a, n, r, Math.abs(y));
          }
          else {
            (function (a, n, r, v) {
              var f = n / 64 | 0;
              var s = r / 64 | 0;
              var b = n - 64 * f;
              var c = r - 64 * s;
              var u = h(f, s, 811);
              var g = .5 + (f + s & 1 ? .05 : -.03) + .08 * (u - .5) + .1 * e(n + 70, r + 30) + .03 * i(2 * n + 5, 2 * r + 9);
              t.ram = M.dai;
              t.nx = 0;
              t.ny = 0;
              var m = o(60 + (.4 * n + .9 * r | 0) + 7 * f, 700 + (.3 * r | 0) + 5 * s);
              if (m > .12) {
                g += .5 * (m - .12);
              }
              if (0 === b || 0 === c) {
                g = .12;
              }
              else {
                if (1 === b || 1 === c) {
                  g += .1;
                }
                else {
                  if (!(63 !== b && 63 !== c)) {
                    g -= .07;
                  }
                }
              }
              if (u < .07 && b > 6 && b < 58 && Math.abs(c - (.45 * b + 10)) < .6) {
                g = .18;
              }
              if (h(n, r, 812) < .015) {
                g -= .08;
              }
              else {
                if (h(n >> 1, r >> 1, 813) < .008) {
                  g += .1;
                }
              }
              t.v = g;
              if (1 === a.lo[v]) {
                t.v -= .05;
              }
              var l = Math.abs(n - 592);
              var d = Math.abs(n - 976);
              if ((l < 1.2 || l > 3.4 && l < 4.4 || d < 1.2 || d > 3.4 && d < 4.4) && r > 700 && r < a.H - 64) {
                t.ram = M.vang;
                t.v = l < 1.2 || d < 1.2 ? .62 : .34;
                t.nx = 0;
                t.ny = 0;
              }
              var x = h(n >> 2, r >> 2, 815);
              if (x > .9965 && 1 == (3 & n) && 1 == (3 & r) && (t.mau = x > .9985 ? [236, 244, 255] : [148, 176, 214]), "ruined_pillar" === a.vat[v]) {
                var y = 31 & n;
                var p = 31 & r;
                if (y > 1 && y < 30 && p > 1 && p < 30) {
                  t.ram = M.tuong;
                  t.v = .46 + .04 * i(2 * n, 2 * r);
                  if (y < 5 || p < 5) {
                    t.v += .1;
                  }
                  else {
                    if ((y > 26 || p > 26)) {
                      t.v -= .12;
                    }
                  }
                  var _ = Math.sqrt((y - 15.5) * (y - 15.5) + (p - 15.5) * (p - 15.5));
                  if (Math.abs(_ - 11) < .8) {
                    t.ram = M.vang;
                    t.v = .45;
                  }
                }
              }
            })(a, n, r, s);
          }
        }
        else {
          !function (a, n, r) {
            var v = n / 32 | 0;
            var o = r / 32 | 0;
            var f = n - 32 * v;
            var s = r - 32 * o;
            var b = h(v, o, 911);
            var c = .42 + .09 * (b - .5) + .1 * e(n + 90, r + 20) + .035 * i(2 * n + 5, 2 * r + 9);
            t.ram = M.phong;
            t.nx = 0;
            t.ny = 0;
            if (0 === f || 0 === s) {
              c = .24;
            }
            else {
              if (1 === f || 1 === s) {
                c += .05;
              }
              else {
                if (!(31 !== f && 31 !== s)) {
                  c -= .04;
                }
              }
            }
            if (b < .06 && f > 4 && f < 28 && Math.abs(s - (.55 * f + 4)) < .6) {
              c = .2;
            }
            t.v = c;
            for (var u = 0; u < a.rut.length; u++) {
              var g = a.rut[u];
              var m = n + .5 - g.x;
              var l = r + .5 - g.y;
              var x = Math.sqrt(m * m + l * l);
              if (x < g.r + 10) {
                return void d(0, n, r, x, Math.atan2(l, m), g);
              }
            }
          }(a, n, r);
        }
      }
    }, hau: function (a, t, r, h, v, o) {
      var e = a.bong[o];
      if (e && n.phu(t, r, [3, 6, 14], e / 255 * .55), !a.kh.M[o]) {
        var i = n.bongKhoi(a, a.kh.sd, h, v, 16);
        if (i > .02) {
          n.phu(t, r, [2, 4, 10], .5 * i);
        }
      }
      var M = f(a, a.LW, h, v);
      var s = f(a, a.LK, h, v);
      var b = f(a, a.LV, h, v);
      if (M > .02) {
        n.cong(t, r, [255, 168, 84], .26 * M);
      }
      if (s > .02) {
        n.cong(t, r, [80, 200, 220], .13 * s);
      }
      if (b > .02) {
        n.cong(t, r, [255, 214, 120], .12 * b);
      }
    }, hauKy: function () {
      return !0;
    }, don: function (a) {
      a.kh = null;
      a.bong = null;
      a.LW = a.LK = a.LV = null;
    } };
}();
