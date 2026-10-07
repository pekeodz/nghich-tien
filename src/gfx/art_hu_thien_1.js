!function () {
  "use strict";
  var a = window.PNTT.HuThienArt;
  var n = a.kit;
  var r = n.S;
  var t = 32;
  var o = n.h01;
  var v = (n.clamp01, n.kep);
  var f = n.smooth;
  var e = n.bayer;
  var c = n.nLo;
  var i = n.nMi;
  var u = n.nHi;
  var d = n.mau;
  var s = null;
  var b = [[236, 236, 226], [246, 214, 108], [244, 170, 190], [176, 168, 236]];
  var h = [244, 206, 92];
  function m(a, n) {
    return 6 * c(1500 + (.9 * a | 0), 60 + (.9 * n | 0)) + 2.4 * c(1700 + (2 * a | 0), 260 + (2 * n | 0)) + 2.6 * u(40 + (2.4 * a | 0), 17 + (.8 * n | 0));
  }
  function y(a, n) {
    for (var r = 1e9, o = -1, v = 1e9, f = -1, e = a.TW * a.TH, c = 0; c < e; c++)
      if (n(c)) {
        var i = c % a.TW;
        var u = c / a.TW | 0;
        if (i < r) {
          r = i;
        }
        if (i > o) {
          o = i;
        }
        if (u < v) {
          v = u;
        }
        if (u > f) {
          f = u;
        }
      }
    return o < 0 ? null : { x0: r * t, y0: v * t, x1: (o + 1) * t, y1: (f + 1) * t, cx: (r + o + 1) * t / 2, cy: (v + f + 1) * t / 2, tx0: r, ty0: v, tx1: o, ty1: f };
  }
  var x = [[12, -4, 22, 9, .55], [3, -2, 12, 4.5, .8]];
  var l = [[7, -2, 14, 5, .5], [2, -1, 8, 3, .7]];
  var M = [[7, -2, 17, 6, .8], [2, -1, 12, 4, .55]];
  var g = [[4, -1, 8, 3, .55]];
  var T = [[13, -3, 22, 7, .7], [3, -1, 12, 4.5, .85]];
  var w = [[8, -2, 13, 4.5, .8]];
  var _ = [[9, -2, 18, 5, .6], [2, -1, 14, 4, .75]];
  var W = [[5, -1, 12, 4, .5]];
  function k(a) {
    switch (a) {
      case "bamboo_tall": return x;
      case "bamboo_clump": return l;
      case "rock_big": return M;
      case "rock_small": return g;
      case "ruined_pillar": return T;
      case "ancient_stele_broken":
      case "stele":
      case "tan_vien_lantern_banner": return w;
      case "ruined_sect_wall": return _;
      case "herb": return W;
      default: return null;
    }
  }
  function D(a, t, m, y, x) {
    var l = d(a, a.wRung, t, m);
    var M = d(a, a.wCao, t, m);
    var g = d(a, a.wHoa, t, m);
    var T = .5 + .26 * (c(1e3 + (t >> 1), 200 + (m >> 1)) + .06) + .13 * i(t + 300, m + 50);
    var w = 1.25 * m | 0;
    r.nx = v(1.9 * (u(t + 65, w) - u(t + 63, w)), -.3, .3);
    r.ny = v(1.9 * (u(t + 64, w + 1) - u(t + 64, w - 1)), -.3, .3);
    var _ = n.khom(t, m);
    if (M > .15) {
      var W = n.khomCao(t + 97, m + 211);
      if (0 !== W && o(t >> 3, m >> 3, 41) < 1.2 * M && (W > _ || 0 === _)) {
        _ = W;
      }
      T -= .05 * M;
    }
    var k = 1 - .55 * l;
    if (_ > 0) {
      T += (1 === _ ? .07 : 2 === _ ? .14 : .23) * k;
    }
    else {
      if (_ < 0) {
        T -= .13 * k;
      }
    }
    var D = o(t, m, 5);
    if (D < .02) {
      T -= .1;
    }
    else {
      if (D > .988) {
        T += .09;
      }
    }
    T -= .2 * l;
    if (y < 8) {
      T -= .05 * (1 - Math.max(y, 0) / 8);
    }
    if (x < 9) {
      T -= .16 * (1 - Math.max(x, 0) / 9);
    }
    var N = .8 * i(t + 1300, m + 700) + .5 * c(.5 * t + 200, .5 * m + 900);
    r.ram = s.co;
    r.v = T;
    if (l < .3 && .85 * f(.14, .42, N) * (1 - 2 * l) > e(t, m)) {
      r.ram = s.coV;
      r.v = T - .05;
    }
    if (l > .42 && c(800 + (1.2 * t | 0), 1900 + (1.2 * m | 0)) > .05) {
      r.ram = s.reu;
      r.v = T + .03;
    }
    var A = n.la(t + 71, m + 13);
    if (A && (A >> 5) / 8 < .012 + .6 * l - .05 * M) {
      var S = 7 & A;
      if (4 !== S) {
        r.ram = s.la;
        r.v = 3 === S ? .66 : 2 === S ? .5 : .34;
        r.v -= .06 * l;
        r.nx = 0;
        return void (r.ny = 0);
      }
      r.v -= .12;
    }
    if (l > .6 && o(t >> 1, m >> 1, 23) < .03 * (l - .6)) {
      r.ram = s.dat;
      r.v = .42 + .14 * o(t >> 1, m >> 1, 24);
      r.nx = 0;
      return void (r.ny = -.2);
    }
    var p = n.hoa(t + 31, m + 57);
    if (p && y > 3 && l < .5 && (p >> 4) / 16 < .02 + .85 * g - .5 * l - .15 * M) {
      var H = 3 & p;
      if (1 === H) {
        r.mau = b[p >> 2 & 3];
      }
      else {
        if (2 === H) {
          r.mau = h;
        }
        else {
          r.v -= .12;
        }
      }
    }
    var L = n.baLa(t + 211, m + 97);
    if (L && l < .4 && (L >> 2) / 16 < .16 + .1 * g) {
      var I = 3 & L;
      if (1 === I) {
        r.ram = s.coV;
        r.v = .52;
        r.nx = 0;
        r.ny = 0;
        r.mau = null;
      }
      else {
        if (2 === I) {
          r.ram = s.coV;
          r.v = .66;
          r.nx = 0;
          r.ny = 0;
          r.mau = null;
        }
        else {
          r.v -= .1;
        }
      }
    }
  }
  a.ai[1] = { chuanBi: function (a) {
      var r;
      r = n.dai;
      s = { co: r(["#0a2019", "#112f22", "#19432a", "#235831", "#2f6e39", "#3e8542", "#509b4b", "#66b256", "#7fc763", "#99d975", "#b4e78f", "#d0f3ab"], 12), coV: r(["#14210e", "#213512", "#324c19", "#446620", "#587f28", "#6f9a32", "#88b43e", "#a2cb4e", "#bcdd66", "#d3eb85", "#e5f5a8", "#f2fbcb"], 12), reu: r(["#040d0a", "#07150f", "#0b1f15", "#102b1b", "#163821", "#1e4728", "#285731", "#34683a", "#427a44", "#538f50", "#68a55f", "#80ba70"], 12), la: r(["#1c1a0a", "#2c2a0e", "#403c14", "#584f1c", "#736725", "#8f8232", "#a99c44", "#c1b458", "#d5c86f", "#e3d98a", "#eee7a8", "#f7f2c6"], 12), soiAm: r(["#1c1712", "#2a231b", "#3a3025", "#4c4033", "#605243", "#756553", "#8b7a65", "#a08e77", "#b5a48b", "#c9b9a0"], 10), dat: r(["#171009", "#241810", "#352418", "#493322", "#5d4230", "#735339", "#896643", "#9f7b52", "#b59162", "#c9a674", "#dabb89", "#ead1a3"], 12), vuon: r(["#080504", "#130b08", "#1f120c", "#2d1a11", "#3c2416", "#4d2f1c", "#603c24", "#754b2d", "#8a5b38", "#a06d44", "#b68153", "#cc9767"], 12), da: r(["#0d0f16", "#161a24", "#222732", "#303745", "#404958", "#525c6c", "#66707e", "#7b8492", "#9199a6", "#a8afba", "#bfc5ce", "#d6dae0"], 12), tan: r(["#0f110c", "#1a1c14", "#27291e", "#363a2c", "#474c3b", "#59604a", "#6d745b", "#828a70", "#989f85", "#aeb59b", "#c4cab1", "#dadfc7"], 12), ngoc: r(["#03161a", "#072529", "#0c3938", "#124e46", "#1a6555", "#247c65", "#329479", "#46ab8f", "#63c1a5", "#88d5bc", "#b0e5d2", "#dbf5eb"], 12), vang: r(["#2b1a05", "#452a09", "#633d0e", "#84551a", "#a87126", "#cc9036", "#e8ae49", "#f9c862", "#ffdc88", "#ffeeb3"], 10), nuoc: r(["#03121a", "#061e2b", "#0a2d3f", "#0f3d54", "#164f6b", "#1f6385", "#2a779d", "#388cb1", "#4ba2c3", "#67b7d1", "#8acbdf", "#b3dfe9"], 12), go: r(["#140b06", "#211208", "#321c0d", "#472a14", "#5d391c", "#744a25", "#8d5c30", "#a6703d", "#bf8650", "#d69f66"], 10), soi: r(["#1a1816", "#282522", "#38342f", "#49443e", "#5c564f", "#706a62", "#867f76", "#9c958a", "#b3aca0", "#cac3b6", "#ddd7c9"], 11) };
      var o;
      var v;
      var f;
      var e = a.TW;
      var c = a.TH;
      var i = e * c;
      var u = a.gw;
      var d = a.gh;
      var b = a.data;
      var h = a.lo = new Uint8Array(i);
      var m = new Float32Array(i);
      var x = new Float32Array(i);
      var l = new Float32Array(i);
      for (f = 0; f < i; f++) {
        switch (a.nen[f]) {
          case "dirt":
            h[f] = 1;
            break;
          case "stone_floor":
            h[f] = 2;
            break;
          case "jade_floor":
            h[f] = 3;
            break;
          case "pebble":
            h[f] = 4;
            break;
          case "sacred_soil":
            h[f] = 5;
            break;
          case "ancient_ruin_floor":
            h[f] = 6;
            break;
          case "water":
            h[f] = 7;
            break;
          default: h[f] = 0;
        }
        x[f] = "grass_flower" === a.nen[f] ? 1 : 0;
        l[f] = "grass_tall" === a.nen[f] ? 1 : 0;
        m[f] = "bamboo_tall" === a.vat[f] ? 1 : "bamboo_clump" === a.vat[f] ? .3 : 0;
      }
      if (a.san = y(a, function (a) {
        return 2 === h[a] || 3 === h[a];
      }), a.san) {
        for (v = a.san.ty0; v <= a.san.ty1; v++)
          for (o = a.san.tx0; o <= a.san.tx1; o++)
            6 === h[v * e + o] && (h[v * e + o] = 2);
      }
      a.ngoc = y(a, function (a) {
        return 3 === h[a];
      });
      var M = y(a, function (a) {
        return 5 === h[a];
      });
      if (a.vuon = M ? { tx0: M.tx0 - 1, ty0: M.ty0 - 1, tx1: M.tx1 + 1, ty1: M.ty1 + 1 } : null, a.vuon) {
        for (v = a.vuon.ty0; v <= a.vuon.ty1; v++)
          for (o = a.vuon.tx0; o <= a.vuon.tx1; o++)
            1 === h[v * e + o] && (h[v * e + o] = 8);
      }
      var g = a.bedId = new Int16Array(i).fill(-1);
      var T = a.beds = [];
      for (f = 0; f < i; f++)
        if (!(5 !== h[f] || g[f] >= 0)) {
          var w = T.length;
          var _ = [f];
          var W = { x0: 1e9, y0: 1e9, x1: -1, y1: -1 };
          for (g[f] = w; _.length;) {
            var D = _.pop();
            var N = D % e;
            var A = D / e | 0;
            W.x0 = Math.min(W.x0, N);
            W.x1 = Math.max(W.x1, N);
            W.y0 = Math.min(W.y0, A);
            W.y1 = Math.max(W.y1, A);
            [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(function (a) {
              var n = N + a[0];
              var r = A + a[1];
              if (!(n < 0 || r < 0 || n >= e || r >= c)) {
                var t = r * e + n;
                if (!(5 !== h[t] || g[t] >= 0)) {
                  g[t] = w;
                  _.push(t);
                }
              }
            });
          }
          T.push({ x0: W.x0 * t, y0: W.y0 * t, x1: (W.x1 + 1) * t, y1: (W.y1 + 1) * t });
        }
      function S(a, n) {
        return a < 0 || n < 0 || a >= e || n >= c ? 0 : h[n * e + a];
      }
      a.lo2 = S;
      var p = a.thuan = new Uint8Array(i);
      for (v = 0; v < c; v++)
        for (o = 0; o < e; o++) {
          for (var H = 1, L = -1; L <= 1 && H; L++)
            for (var I = -1; I <= 1; I++)
              if (0 !== S(o + I, v + L)) {
                H = 0;
                break;
              }
          p[v * e + o] = H;
        }
      function P(a) {
        return function (n) {
          return h[n] === a;
        };
      }
      a.sdfDat = n.truongDau(n.matNa(a, P(1)), u, d, [2, 2, 2]);
      a.sdfDat0 = n.truongDau(n.matNa(a, P(1)), u, d, []);
      a.sdfSan = n.truongDau(n.matNa(a, function (a) {
        return 2 === h[a] || 3 === h[a];
      }), u, d, [1]);
      a.sdfVuon = n.truongDau(n.matNa(a, function (a) {
        return 8 === h[a] || 5 === h[a];
      }), u, d, [1]);
      a.sdfTan = n.truongDau(n.matNa(a, P(6)), u, d, [1]);
      a.sdfTan0 = n.truongDau(n.matNa(a, P(6)), u, d, []);
      a.sdfSoi = n.truongDau(n.matNa(a, function (a) {
        return 4 === h[a] || 7 === h[a];
      }), u, d, [2, 2]);
      a.sdfNuoc = n.truongDau(n.matNa(a, P(7)), u, d, [2, 2]);
      a.wRung = n.moNhieu(n.matDo(a, m), u, d, [3, 3, 2]);
      a.wHoa = n.moNhieu(n.matDo(a, x), u, d, [2, 2]);
      a.wCao = n.moNhieu(n.matDo(a, l), u, d, [2, 1]);
      var q = b.htTranPhap;
      a.tran = q ? { x: (q.tx + .5) * t, y: (q.ty + .5) * t, r: q.r || 52 } : null;
      a.tan = y(a, P(6));
      a.ao = y(a, P(7));
      (function (a) {
        function r(r, t, o) {
          if (r) {
            for (var v = 0; v < r.length; v++)
              n.bongElip(a, t + r[v][0], o + r[v][1], r[v][2], r[v][3], r[v][4]);
          }
        }
        for (var o = 0; o < a.TH; o++)
          for (var v = 0; v < a.TW; v++) {
            var f = a.vat[o * a.TW + v];
            if (f) {
              r(k(f), v * t + 16, (o + 1) * t);
            }
          }
        (a.data.decorations || []).forEach(function (a) {
          r(k(a.name), a.tx * t + 16, (a.ty + 1) * t);
        });
      })(a);
      (function (a) {
        var r = a.gw;
        var o = a.gh;
        var v = r * o;
        var f = a.LW = new Float32Array(v);
        var e = a.LK = new Float32Array(v);
        (a.data.decorations || []).forEach(function (r) {
          var o = r.tx * t + 16;
          var v = (r.ty + 1) * t;
          if ("tan_vien_lantern_banner" === r.name) {
            n.congSang(a, f, o, v - 40, 78, .85, 1.2);
          }
          if ("stele" === r.name) {
            n.congSang(a, e, o, v - 26, 44, .45, 1.2);
          }
        });
        for (var c = 0; c < a.TW * a.TH; c++) {
          var i = c % a.TW * t + 16;
          var u = (1 + (c / a.TW | 0)) * t;
          if ("herb" === a.vat[c]) {
            n.congSang(a, e, i, u - 8, 40, .5, 1.15);
          }
          if ("ancient_stele_broken" === a.vat[c]) {
            n.congSang(a, e, i, u - 22, 46, .5, 1.2);
          }
        }
        if (a.tran) {
          n.congSang(a, f, a.tran.x, a.tran.y, 86, .6, 1.15);
        }
        if (a.ngoc) {
          n.congSang(a, e, a.ngoc.cx, a.ngoc.cy, 130, .36, 1.1);
        }
        a.LW = n.mo(f, r, o, 1);
        a.LK = n.mo(e, r, o, 1);
      })(a);
    }, to: function (a, e, b) {
      var h = (b >> 5) * a.TW + (e >> 5);
      var y = a.lo[h];
      var x = a.tran;
      if (x) {
        var l = e + .5 - x.x;
        var M = b + .5 - x.y;
        if (l < x.r + 9 && l > -x.r - 9 && M < x.r + 9 && M > -x.r - 9) {
          var g = Math.sqrt(l * l + M * M);
          if (g < x.r + 8) {
            return void function (a, n, t, o, v) {
              var f = a.tran;
              var e = f.r + 8;
              var c = .5 + .05 * u(2 * n, 2 * t + 3) + .1 * i(n + 90, t + 20);
              r.ram = s.da;
              r.nx = 0;
              r.ny = 0;
              var d = (v + Math.PI) / (2 * Math.PI) * 12;
              var b = d - Math.floor(d);
              if (o < e - 2 && (b < .03 || b > .97) && o > 22 && (c = .2), o > e - 3) {
                var h = e - o;
                c = h < 1 ? .18 : h < 2 ? .74 : .42;
              }
              if (Math.abs(o - (f.r - 8)) < .9) {
                c = .16;
              }
              else {
                if (Math.abs(o - (f.r - 8)) < 1.9 && o < f.r - 8) {
                  c += .1;
                }
              }
              if (Math.abs(o - 30) < .8) {
                c = .18;
              }
              if (o < 14) {
                c = .56 + .05 * u(2 * n, 2 * t);
                if (o > 12.4) {
                  c = .2;
                }
              }
              r.v = c;
              if (o > 32 && o < f.r - 10 && Math.abs(2 * d % 1 - .5) < .12 && Math.abs(d - Math.floor(d) - .5) < .32) {
                r.ram = s.vang;
                r.v = .34;
              }
            }(a, e, b, g, Math.atan2(M, l));
          }
        }
      }
      if (a.thuan[h]) {
        D(a, e, b, 99, 99);
      }
      else {
        switch (y) {
          case 5: return void function (a, n, t, f) {
            var e = a.beds[a.bedId[f]];
            var i = Math.min(n - e.x0, e.x1 - 1 - n, t - e.y0, e.y1 - 1 - t);
            if (i < 4) {
              var d = Math.min(n - e.x0, e.x1 - 1 - n);
              var b = Math.min(t - e.y0, e.y1 - 1 - t);
              var h = d < b;
              var m = h ? t : n;
              var y = Math.floor((m + 5) / 24);
              var x = m + 5 - 24 * y;
              var l = .5 + .14 * (o(y, h ? 3 : 4, 55) - .5) + .05 * u(3 * n, t);
              if (i < 1) {
                l += .16;
              }
              else {
                if (i > 2.6) {
                  l -= .18;
                }
              }
              if (x < 1) {
                l -= .2;
              }
              if (i > 1.2 && i < 2.6 && (4 === x || 20 === x)) {
                l = .9;
              }
              if (d < 6 && b < 6) {
                l = .66;
                if (d < 1 || b < 1) {
                  l = .84;
                }
                else {
                  if ((d > 4 || b > 4)) {
                    l = .36;
                  }
                }
              }
              r.ram = s.go;
              r.v = l;
              r.nx = 0;
              return void (r.ny = 0);
            }
            var M = (t - e.y0 + 3) % 10 / 10;
            var g = .4 + .06 * Math.sin(6.2832 * M) + .1 * c(n + 3, 2 * t + 9) + .05 * u(2 * n, 2 * t + 5);
            r.ram = s.vuon;
            r.v = g;
            r.nx = 0;
            r.ny = v(.32 * -Math.cos(6.2832 * M), -.32, .32);
            if (i < 8) {
              r.v -= .09 * (1 - (i - 4) / 4);
            }
            var T = o(n, t, 61);
            if (T < .035) {
              r.v -= .12;
            }
            else {
              if (T > .985) {
                r.v += .16;
              }
            }
            if (o(n >> 1, t >> 1, 62) < .012) {
              r.ram = s.soi;
              r.v = .52;
            }
          }(a, e, b, h);
          case 8: return void function (a, f, e, i) {
            var d = i % a.TW;
            var b = i / a.TW | 0;
            var h = a.vuon;
            var m = a.lo2;
            var y = h.tx0 * t;
            var x = (h.tx1 + 1) * t;
            var l = h.ty0 * t;
            var M = (h.ty1 + 1) * t;
            var g = 99;
            var T = !1;
            if (d === h.tx0 && 0 === m(d - 1, b) && f - y < g && (g = f - y, T = !0), d === h.tx1 && 0 === m(d + 1, b) && x - 1 - f < g && (g = x - 1 - f, T = !0), b === h.ty0 && 0 === m(d, b - 1) && e - l < g && (g = e - l, T = !1), b === h.ty1 && 0 === m(d, b + 1) && M - 1 - e < g && (g = M - 1 - e, T = !1), g < 6) {
              var w = T ? e : f;
              var _ = Math.floor((w + 3) / 12);
              var W = w + 3 - 12 * _;
              var k = o(_, T ? 7 : 8, 81);
              r.ram = k < .7 ? s.soi : s.soiAm;
              r.nx = 0;
              r.ny = 0;
              var D = .58 + .2 * (k - .5) + .04 * u(2 * f, 2 * e);
              if (W < 1) {
                D = .14;
              }
              else {
                if (W < 2 || g < 1.2) {
                  D += .12;
                }
                else {
                  if ((W > 10 || g > 4.6)) {
                    D -= .14;
                  }
                }
              }
              return void (r.v = D);
            }
            var N = .52 + .12 * c(f + 900, 2 * e + 30) + .06 * u(2 * f + 2, 2 * e + 8);
            r.ram = s.dat;
            r.v = N;
            r.nx = 0;
            r.ny = 0;
            var A = n.voro(200 + (1.4 * f | 0), 700 + (1.4 * e | 0));
            var S = A.id;
            var p = 2.6 + .55 * (S >> 9 & 3);
            var H = A.dx * A.dx + A.dy * A.dy;
            if ((255 & S) < 110 && H < p * p) {
              r.ram = S >> 12 & 1 ? s.soiAm : s.soi;
              r.v = .46 + .03 * (S >> 4 & 7);
              r.nx = v(A.dx / p, -.85, .85);
              r.ny = v(A.dy / p, -.85, .85);
            }
            if (o(f, e, 71) < .03) {
              r.v -= .1;
            }
          }(a, e, b, h);
          case 3: return void function (a, n, t) {
            var o = a.ngoc;
            var v = n + .5 - o.cx;
            var f = t + .5 - o.cy;
            var e = Math.max(Math.abs(v), Math.abs(f));
            var c = Math.sqrt(v * v + f * f);
            var d = (o.x1 - o.x0) / 2;
            var b = .5 + .34 * i(.7 * n + 400, .7 * t + 90) + .06 * u(n + 8, 2 * t + 1);
            var h = i(60 + (.5 * n + .8 * t | 0), 700 + (.4 * t | 0));
            if (h > .14) {
              b += .6 * (h - .14);
            }
            r.ram = s.ngoc;
            r.v = b;
            r.nx = 0;
            r.ny = 0;
            var m = Math.atan2(f, v);
            if (e > d - 3) {
              r.v = .16;
            }
            else {
              if (e > d - 5) {
                r.ram = s.vang;
                r.v = .55;
              }
              else {
                if (e > d - 8) {
                  r.v = .2 + .04 * u(n, t);
                }
              }
            }
            var y = d - 12;
            if (Math.abs(c - y) < 1.1 ? (r.ram = s.vang, r.v = .62) : Math.abs(c - (y - 4)) < .7 && (r.ram = s.vang, r.v = .32), c > 40 && c < 60) {
              var x = (m + Math.PI) / (2 * Math.PI) * 8;
              var l = Math.floor(x);
              var M = x - l;
              var g = Math.abs(M - .5);
              if (g < .26) {
                for (var T = [7, 2, 5, 0, 6, 1, 4, 3][7 & l], w = 0; w < 3; w++)
                  Math.abs(c - (44 + 6 * w)) < 1.6 && (T >> w & 1 || g > .07) && (r.ram = s.vang, r.v = .7 - .04 * w);
              }
            }
            if (c < 26)
              if (c > 24.4) {
                r.ram = s.vang;
                r.v = .58;
              }
              else {
                var _;
                var W = Math.sqrt(v * v + (f + 12) * (f + 12));
                var k = Math.sqrt(v * v + (f - 12) * (f - 12));
                _ = W < 3 || !(k < 3) && !(W < 12) && (k < 12 || v > 0);
                r.ram = s.ngoc;
                r.v = _ ? .88 : .13;
              }
            if (c > y + 3 && e < d - 8 && Math.abs(Math.abs(v) - Math.abs(f)) < 1.1) {
              r.ram = s.vang;
              r.v = .5;
            }
          }(a, e, b);
          case 2: return void function (a, n, t, v) {
            var f = a.san;
            var e = Math.min(n - f.x0, f.x1 - 1 - n, t - f.y0, f.y1 - 1 - t);
            var c = n / 32 | 0;
            var d = t / 32 | 0;
            var b = n - 32 * c;
            var h = t - 32 * d;
            var m = o(c, d, 411);
            var y = .56 + (c + d & 1 ? .03 : -.02) + .09 * (m - .5) + .03 * u(2 * n + 5, 2 * t + 9) + .04 * i(n + 70, t + 30);
            if (r.ram = s.da, r.nx = 0, r.ny = 0, 0 === b || 0 === h ? y = .2 : 1 === b || 1 === h ? y += .09 : 31 !== b && 31 !== h || (y -= .07), m < .09 && b > 4 && b < 28 && Math.abs(h - (.55 * b + 4)) < .6 && (y = .24), o(n, t, 412) < .02 ? y -= .09 : o(n >> 1, t >> 1, 413) < .012 && (y += .1), r.v = y, a.vat[v] && b > 2 && b < 30 && h > 2 && h < 30 && (r.v = .44 + .04 * u(2 * n, 2 * t), b < 5 || h < 5 ? r.v += .1 : (b > 26 || h > 26) && (r.v -= .12)), e < 9) {
              var x = ((Math.min(n - f.x0, f.x1 - 1 - n) < Math.min(t - f.y0, f.y1 - 1 - t) ? t : n) % 16 + 16) % 16;
              r.v = .36 + .04 * u(2 * n, 2 * t);
              if (e < 1.4) {
                r.v = .72;
              }
              else {
                if (e < 3) {
                  r.v = .3;
                }
                else {
                  if (e < 4) {
                    r.ram = s.vang;
                    r.v = .42;
                  }
                  else {
                    if (e < 8 && (x < 3 || x >= 8 && x < 11)) {
                      r.v = .5;
                    }
                    else {
                      if (e >= 8) {
                        r.v = .28;
                      }
                    }
                  }
                }
              }
            }
          }(a, e, b, h);
        }
        var T = 1.2 * u(2 * e, 2 * b);
        var w = d(a, a.sdfNuoc, e, b) + T;
        if (w < 0) {
          !function (a, t, o, v) {
            var e = .5 - .3 * f(0, 50, v) + .1 * i(.8 * t + 100, 1.4 * o + 20) + .05 * u(.5 * t, 2 * o + 4);
            var d = c(900 + (.4 * t + .7 * o | 0), 200 + (.35 * o | 0));
            if (d > .12) {
              e += .55 * (d - .12);
            }
            var b = n.voroUon(t, o, 2.2, 2, 3, 5100, 2100);
            if (v < 30 && b.e < .6) {
              e += .07 * f(30, 8, v);
            }
            if (v < 1.6) {
              e = .74 + .05 * u(3 * t, 3 * o);
            }
            else {
              if (v < 3.4) {
                e += .07;
              }
            }
            r.ram = s.nuoc;
            r.v = e;
            r.nx = 0;
            r.ny = 0;
          }(0, e, b, -w);
        }
        else if (d(a, a.sdfSoi, e, b) + .5 * m(e, b) < 0) {
          !function (a, t, e) {
            var i = n.voroUon(t, e, 1.5, 1.6, 4, 3300, 300);
            var b = i.id;
            var h = i.dx;
            var m = i.dy;
            var y = 5.4 + .8 * (b >> 9 & 3);
            var x = d(a, a.sdfNuoc, t, e);
            var l = f(22, 0, x);
            if (i.e < .8) {
              r.ram = s.soi;
              r.v = .12;
              r.nx = 0;
              return void (r.ny = 0);
            }
            var M = b >> 6 & 7;
            r.ram = M < 4 ? s.soi : M < 7 ? s.da : s.soiAm;
            r.nx = v(h / y, -.85, .85);
            r.ny = v(m / y, -.85, .85);
            r.v = .56 + .24 * ((63 & b) / 63 - .5) - .22 * l + .04 * u(2 * t, 2 * e);
            if (l > .4 && o(t, e, 77) < .16) {
              r.v += .14;
            }
            if (c(2 * t + 500, 2 * e + 30) > .25 && l < .6) {
              r.ram = s.reu;
              r.v = .36 + .06 * u(3 * t, 3 * e);
              r.nx = 0;
              r.ny = 0;
            }
          }(a, e, b);
        }
        else {
          var _ = d(a, a.sdfTan0, e, b);
          if (_ + (_ > -4 ? 5 * i(1.3 * e + 40, 1.3 * b + 80) + 2 * u(e, b) : 0) < 0) {
            !function (a, t, v, e) {
              var d = a.tan;
              var b = t + 5 * i(.5 * t + 300, .5 * v + 40);
              var h = v + 5 * i(.5 * t + 90, .5 * v + 700);
              var m = Math.floor(h / 40);
              var y = 1 & m ? 22 : 0;
              var x = Math.floor((b + y) / 44);
              var l = b + y - 44 * x;
              var M = h - 40 * m;
              var g = o(x, m, 511);
              var T = o(x, m, 512);
              if (r.nx = 0, r.ny = 0, r.ram = s.tan, l < 1.7 || M < 1.7) {
                var w = c(2 * t + 30, 2 * v + 700) > .02 || T > .7;
                r.ram = w ? s.reu : s.tan;
                return void (r.v = w ? .32 + .05 * u(3 * t, 3 * v) : .1);
              }
              var _ = .54 + .14 * (g - .5) + .1 * i(t + 600, v + 60) + .05 * u(2 * t, 2 * v);
              if (l < 3 ? (_ += .1, r.nx = -.5) : l > 41 && (_ -= .08, r.nx = .5), M < 3 ? (_ += .1, r.ny = -.5) : M > 37 && (_ -= .08, r.ny = .5), r.nx += .03 * ((8 * T | 0) - 3.5), r.ny += .03 * ((64 * T % 8 | 0) - 3.5), g < .1 ? _ -= .15 : g > .94 && (_ += .09), g > .12 && g < .34) {
                var W = .62 * (l - 22) + (M - 20) * (g < .23 ? .78 : -.78);
                if (Math.abs(W) < .55 + .4 * u(3 * t, 3 * v)) {
                  r.ram = s.tan;
                  _ = .16;
                }
              }
              if (g > .5 && g < .6 && l > 8 && l < 36 && M > 8 && (l - 30) * (l - 30) + (M - 10) * (M - 10) < 70 && (_ -= .12), o(t, v, 199) < .02 ? _ -= .09 : o(t >> 1, v >> 1, 198) < .01 && (_ += .1), r.v = _, d) {
                var k = t + .5 - d.cx;
                var D = v + .5 - d.cy;
                var N = Math.sqrt(k * k + D * D);
                var A = Math.atan2(D, k);
                if (Math.abs(N - 118) < 1.4 ? (r.ram = s.tan, r.v = .12) : N > 118 && N < 120.6 ? r.v += .16 : N < 118 && N > 116.6 && (r.v -= .08), Math.abs(N - 106) < .9 && (r.ram = s.tan, r.v = .16), N > 106 && N < 118 && Math.abs((A + Math.PI) / (2 * Math.PI) * 24 % 1 - .5) < .11 && (r.ram = s.tan, r.v = .13), Math.abs(N - 70) < 1 && (r.ram = s.tan, r.v = .15), N < 34) {
                  var S = .65 * Math.abs(Math.cos(1.5 * A + .5)) + .35;
                  if (N < 30 * S && N > 26 * S) {
                    r.ram = s.tan;
                    r.v = .16;
                  }
                }
              }
              if (e > -6 && c(220 + (1.4 * t | 0), 90 + (1.4 * v | 0)) + .3 * f(-6, 0, e) > .12 && (r.ram = s.reu, r.v = .36 + .06 * u(3 * t + 1, 3 * v), r.nx = 0, r.ny = 0), l < 5 || M < 5) {
                var p = n.khom(t + 41, v + 77);
                if (p > 0 && T > .4) {
                  r.ram = s.co;
                  r.v = .42 + .07 * p;
                  r.nx = 0;
                  r.ny = 0;
                }
              }
            }(a, e, b, _);
          }
          else {
            var W;
            var k;
            var N = (W = d(a, a.sdfDat, e, b) + m(e, b)) < (k = d(a, a.sdfDat0, e, b)) - 5 ? k - 5 : W > k + 5 ? k + 5 : W;
            if (N < 0) {
              (function (a, t, e, i) {
                var d = .5 + .26 * (c(2e3 + (.7 * t | 0), 700 + (.7 * e | 0)) + .08) + .08 * c(2 * t + 60, 2 * e + 3100) + .045 * u(2 * t + 11, 2 * e + 5);
                d += .08 * f(4, 20, i);
                if (i < 6) {
                  d -= .05 * (1 - i / 6);
                }
                if (i < 2.6) {
                  d -= .13 * (1 - i / 2.6);
                }
                var b = o(t, e, 91);
                if (b < .03 ? d -= .1 : b > .975 && (d += .1), r.ram = s.dat, r.v = d, r.nx = 0, r.ny = 0, u(t + 700, 2 * e + 300) < -.42 && (r.v -= .05), !(i > 1.5 && function (a, t) {
                  var o = n.voro(1200 + (2.2 * a | 0), 1200 + (2.2 * t | 0));
                  var f = o.id;
                  if ((1023 & f) / 1024 >= .06) {
                    return !1;
                  }
                  var e = 3.2 + .9 * (f >> 10 & 3);
                  if (o.dx * o.dx + o.dy * o.dy < e * e) {
                    r.ram = f >> 12 & 1 ? s.soiAm : s.soi;
                    r.v = .46 + .025 * (f >> 5 & 7);
                    r.nx = v(o.dx / e, -.85, .85);
                    r.ny = v(o.dy / e, -.85, .85);
                    return !0;
                  }
                  var c = o.dx - 2.4;
                  var i = o.dy - 3.2;
                  if (c * c + i * i < e * e) {
                    r.v -= .12;
                  }
                  return !1;
                }(t, e))) {
                  var h = n.la(t + 171, e + 313);
                  if (h && (h >> 5) / 8 < .02 + .06 * f(8, 0, i)) {
                    var m = 7 & h;
                    if (4 !== m) {
                      r.ram = s.la;
                      r.v = 3 === m ? .66 : 2 === m ? .54 : .4;
                      r.nx = 0;
                      return void (r.ny = 0);
                    }
                    r.v -= .08;
                  }
                  var y = n.khom(t + 211, e + 97);
                  if (y > 0 && o(t >> 3, e >> 3, 93) < .05 + .4 * f(6, 0, i)) {
                    r.ram = s.co;
                    r.v = .42 + .07 * y;
                    r.nx = 0;
                    r.ny = 0;
                  }
                }
              })(0, e, b, -N);
            }
            else {
              D(a, e, b, N, d(a, a.sdfSan, e, b));
            }
          }
        }
      }
    }, hau: function (a, r, t, o, v, f) {
      var e = a.bong[f];
      if (e) {
        n.phu(r, t, [6, 12, 26], e / 255 * .55);
      }
      var c = d(a, a.LW, o, v);
      var i = d(a, a.LK, o, v);
      if (c > .02) {
        n.cong(r, t, [255, 176, 92], .2 * c);
      }
      if (i > .02) {
        n.cong(r, t, [80, 240, 200], .14 * i);
      }
    }, hauKy: function (a) {
      var n = a.ctx;
      function r(a, r, t, o, v) {
        n.fillStyle = v;
        n.fillRect(a, r, t, o);
      }
      for (var v = 0; v < a.TW * a.TH; v++)
        if ("herb" === a.vat[v]) {
          for (var f = v % a.TW * t + 16, e = (1 + (v / a.TW | 0)) * t - 2, c = -5; c <= 5; c++)
            for (var i = -13; i <= 13; i++) {
              var u = i / 13 * (i / 13) + c / 5 * (c / 5);
              if (!(u > 1)) {
                r(f + i, e + c, 1, 1, 1 - u < .15 ? "#1a0f0a" : c < -1 && i < 3 ? "#5a3a24" : "#33200f");
              }
            }
        }
      if (a.ao) {
        var d = (a.ao.x0 + a.ao.x1) / 2;
        var s = (a.ao.y0 + a.ao.y1) / 2;
        var b = (a.ao.x1 - a.ao.x0) / 2;
        var h = (a.ao.y1 - a.ao.y0) / 2;
        [[-50, -22, 9], [34, -34, 8], [-92, 14, 7], [66, 24, 10], [4, 34, 8], [-20, 10, 6], [96, -6, 6], [-64, -40, 6]].forEach(function (a, n) {
          for (var t = Math.round(d + a[0] * b / 160), v = Math.round(s + a[1] * h / 96), f = a[2], e = 6.28 * o(n, 7, 901), c = -f; c <= f; c++)
            for (var i = 1.25 * -f; i <= 1.25 * f; i++) {
              var u = i / 1.25 * (i / 1.25) + c * c;
              if (!(u > f * f)) {
                var m = Math.atan2(c, i / 1.25);
                if (!(Math.abs((m - e + 9.42) % 6.28 - 3.14) < .16 && u > 3)) {
                  var y = Math.sqrt(u) / f;
                  var x = Math.abs(3 * m / 3.14159 % 1 - .5) > .44 && y > .15;
                  var l = y > .86 ? "#7fd58a" : x ? "#3f9a56" : y < .35 ? "#5cbf70" : "#4aa862";
                  if (i < 0 && c < 0 && y > .5) {
                    l = "#69c67a";
                  }
                  r(t + Math.round(i), v + c, 1, 1, l);
                }
              }
            }
          r(t - f + 1, v + f, 2 * f, 1, "rgba(6,20,32,0.35)");
        });
      }
      return !0;
    }, don: function (a) {
      a.LW = a.LK = a.sdfDat = a.sdfDat0 = a.sdfVuon = a.sdfSan = a.sdfTan = a.sdfTan0 = a.sdfSoi = a.sdfNuoc = null;
      a.wRung = a.wHoa = a.wCao = a.bong = a.thuan = null;
    } };
}();
