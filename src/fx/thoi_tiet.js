!function (a) {
  "use strict";
  var n = a.Utils;
  var r = "pntt_weather";
  var t = ["quang", "nang", "mua_phun", "mua_rao", "giong", "suong", "gio", "linh_vu"];
  var e = { xanh: [["#5f8f3a", "#86b04a"], ["#8a7a36", "#c8b25a"], ["#3f6f3a", "#6ea45a"]], truc: [["#557a2c", "#86b04a"], ["#8a7a36", "#c8b25a"], ["#3e6b34", "#7cae5a"]], kho: [["#7a6a40", "#a89460"], ["#6a5a3a", "#96805a"], ["#8a7048", "#b89a66"]] };
  var o = [[[-2, 0], [-1, 0], [0, 0], [1, 0], [2, 0]], [[-2, -1], [-1, -1], [0, 0], [1, 1], [2, 1]], [[0, -1], [0, 0], [0, 1]], [[-2, 1], [-1, 1], [0, 0], [1, -1], [2, -1]]];
  var l = [null, [255, 214, 130, .085], [110, 130, 150, .07], [50, 70, 104, .17], [16, 22, 44, .26], [205, 220, 226, .1], [196, 178, 138, .05], [70, 100, 190, .09]];
  var i = [];
  function u(a, n, r) {
    var t = Math.imul(0 | a, 374761393) + Math.imul(0 | n, 668265263) + Math.imul(0 | r, 1013904223) | 0;
    return ((t = Math.imul(t ^ t >>> 13, 1274126177)) ^ t >>> 16) >>> 0;
  }
  function f(a, n, r) {
    return u(a, n, r) / 4294967296;
  }
  function h(a, n, r) {
    return a < n ? n : a > r ? r : a;
  }
  function d(a, r) {
    return n.hash2(a + 4096, r + 4096) / 4294967296;
  }
  function v(a, n) {
    var r = Math.floor(a);
    var t = Math.floor(n);
    var e = a - r;
    var o = n - t;
    e = e * e * (3 - 2 * e);
    o = o * o * (3 - 2 * o);
    var l = d(r, t);
    var i = d(r + 1, t);
    var u = d(r, t + 1);
    var f = l + (i - l) * e;
    return f + (u + (d(r + 1, t + 1) - u) * e - f) * o;
  }
  i[2] = { nFar: 70, nNear: 60, vy: 170, lean: .35, farLen: 4, nearLen: 7, farA: .38, nearA: .55, rgb: [200, 218, 232], rip: 10 };
  i[3] = { nFar: 150, nNear: 120, vy: 270, lean: .5, farLen: 6, nearLen: 11, farA: .5, nearA: .75, rgb: [210, 228, 244], rip: 22 };
  i[4] = { nFar: 210, nNear: 170, vy: 360, lean: .6, farLen: 8, nearLen: 14, farA: .55, nearA: .85, rgb: [220, 234, 250], rip: 34 };
  var c = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
  function s(a, n) {
    return (c[(3 & n) << 2 | 3 & a] + .5) / 16;
  }
  var g = Object.create(null);
  var M = 0;
  function p(a, n) {
    var r = a + "#" + n;
    var t = g[r];
    return t || (M > 48 && (g = Object.create(null), M = 0), t = { t: 0, s: 0, d: 0 }, g[r] = t, M++, t);
  }
  var m = 256;
  var b = new Float32Array(m);
  var w = new Float32Array(m);
  var A = new Float32Array(m);
  var y = new Float32Array(m);
  !function () {
    for (var a = n.rng(20260930), r = 0; r < m; r++)
      b[r] = a(), w[r] = a(), A[r] = .85 + .3 * a(), y[r] = a();
  }();
  var _ = ["full", "visual", "off"];
  var x = { full: "Đầy đủ", visual: "Không tiếng", off: "Tắt" };
  var I = a.Weather = { IDS: t, NAMES: ["Trời quang", "Nắng đẹp", "Mưa phùn", "Mưa rào", "Giông bão", "Sương mù", "Gió lớn", "Linh vũ"], MAPS: { tan_vien: { w: [30, 22, 12, 12, 4, 8, 8, 4], la: "xanh" }, thanh_truc_lam: { w: [20, 12, 20, 12, 4, 16, 12, 4], la: "truc" }, duoc_vien: { w: [22, 20, 16, 8, 2, 12, 4, 16], la: "xanh" }, vuon_ca_nhan: { w: [30, 26, 16, 12, 2, 6, 4, 4], la: "xanh" }, bat_quai_thach_phan: { w: [34, 26, 12, 12, 4, 6, 6, 0], la: "kho" }, thach_phong_thung_lung: { w: [22, 14, 8, 10, 12, 12, 22, 0], la: "kho" }, bai_da_hang_gio: { w: [24, 16, 8, 10, 8, 14, 20, 0], la: "kho" }, long_uyen: { w: [22, 10, 12, 24, 12, 12, 4, 4], la: "xanh" }, hac_phong_linh: { w: [14, 0, 8, 12, 24, 16, 26, 0], la: "kho" } }, GIO_MO: 6, GIO_DONG: 23, DUR_MIN: 900, DUR_MAX: 1800, FADE_S: 45, TZ_S: 25200, rev: 0, now: function () {
      return Date.now();
    } };
  var S = I._S = { mode: "full", force: -1, mapId: "", seed: 0, mapRef: null, on: !1, label: "", lv: new Float32Array(8), dom: 0, day: NaN, dir: 1, wind: 0, wph: 0, swell: 1, perf: 1, good: 0, perfN: 0, perfSum: 0, area: 1, dens: 1, vw: 480, vh: 270, bolt: null, boltGap: 6, thunderIn: -1, sndT: 0, idle: !1, hidden: !1, rnd: n.rng((1540483477 ^ Date.now()) >>> 0) };
  var O = !1;
  try {
    O = !(!window.matchMedia || !window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }
  catch (a) {
    O = !1;
  }
  var k = n.store.get(r, "full");
  if (_.indexOf(k) >= 0) {
    S.mode = k;
  }
  try {
    var F = /[?&]thoitiet=([a-z_]+)/.exec(window.location && window.location.search || "");
    if (F && t.indexOf(F[1]) >= 0) {
      S.force = t.indexOf(F[1]);
    }
  }
  catch (a) {
  }
  function N() {
    var n = a.Audio;
    if (n && n.bed) {
      n.bed("mua", 0);
      n.bed("gio", 0);
    }
  }
  function R(a, r, t) {
    T = !0;
    for (var e = n.canvas(a, r), o = e.ctx.createImageData(a, r), l = o.data, i = 0; i < r; i++)
      for (var u = 0; u < a; u++) {
        var f = t(u, i);
        if (f && !(f[3] <= 0)) {
          var h = 4 * (i * a + u);
          l[h] = f[0];
          l[h + 1] = f[1];
          l[h + 2] = f[2];
          l[h + 3] = f[3];
        }
      }
    e.ctx.putImageData(o, 0, 0);
    return e.canvas;
  }
  I.ngay = p;
  I._cacheSize = function () {
    return { tiles: P.length, sprites: Object.keys(L).length, built: T };
  };
  I.mode = function () {
    return S.mode;
  };
  I.modeLabel = function () {
    return x[S.mode];
  };
  I.setMode = function (a) {
    return _.indexOf(a) < 0 ? S.mode : (S.mode = a, n.store.set(r, a), "full" !== a && N(), "off" === a && D(), a);
  };
  I.nextMode = function () {
    return I.setMode(_[(_.indexOf(S.mode) + 1) % _.length]);
  };
  I.label = function () {
    return S.label;
  };
  I.active = function () {
    return S.on;
  };
  I.force = function (a) {
    var n = null == a ? -1 : t.indexOf(a);
    S.force = n;
    return n >= 0 ? t[n] : null;
  };
  I.stateAt = function (a, n) {
    var r = function (a, n) {
      var r = n + 25200;
      var t = Math.floor(r / 86400);
      var e = p(a, t);
      if (0 === e.t) {
        return { t: 0, k: 0, day: t };
      }
      var o = r - 86400 * t - e.s;
      var l = o < 0 || o > e.d ? 0 : function (a) {
        return (a = h(a, 0, 1)) * a * (3 - 2 * a);
      }(Math.min(o / 45, (e.d - o) / 45));
      return { t: e.t, k: l, day: t };
    }(a, n);
    return { cur: t[r.t], k: r.k };
  };
  I.stop = function () {
    S.on = !1;
    N();
    D();
  };
  I.reduceMotion = function (a) {
    if (void 0 !== a) {
      O = !!a;
    }
    return O;
  };
  if ("undefined" != typeof document && document.addEventListener) {
    document.addEventListener("visibilitychange", function () {
      S.hidden = !!document.hidden;
      if (S.hidden) {
        N();
      }
    });
  }
  I._fire = function () {
    for (var a = S.rnd, n = S.vw, r = S.vh, t = n * (.12 + .76 * a()), e = -6, o = r * (.42 + .4 * a()), l = 2 * (a() - .5), i = [0 | t, e]; e < o;)
      e += 7 + 9 * a(), t += 5 * l + 14 * (a() - .5), i.push(0 | t, 0 | e);
    var u = null;
    var f = i.length / 2;
    if (f > 6) {
      var h = 2 * (2 + (a() * (f - 5) | 0));
      var d = i[h];
      var v = i[h + 1];
      var c = a() < .5 ? -1 : 1;
      u = [d, v];
      for (var s = 0; s < 4; s++)
        v += 6 + 7 * a(), d += c * (4 + 8 * a()), u.push(0 | d, 0 | v);
    }
    S.bolt = { t: 0, pts: i, fork: u };
    S.thunderIn = .3 + 1.5 * a();
  };
  I.update = function (n, r) {
    var t = r && r.data;
    var e = t ? t.id : "";
    if (r !== S.mapRef) {
      S.mapRef = r || null;
      I.rev++;
    }
    if (e !== S.mapId) {
      S.mapId = e;
      S.seed = function (a) {
        for (var n = -2128831035, r = 0; r < a.length; r++)
          n ^= a.charCodeAt(r), n = Math.imul(n, 16777619);
        return n >>> 0;
      }(e);
      S.day = NaN;
    }
    var o = a.Quality ? a.Quality.tier : 2;
    S.mode;
    if ((S.on || S.label)) {
      S.on = !1;
      S.label = "";
      S.dom = 0;
      I.rev++;
    }
    S.bolt = null;
    S.thunderIn = -1;
    if (T && ("off" === S.mode || o < 2)) {
      D();
    }
    return void function (n) {
      if (S.sndT -= n, !(S.sndT > 0)) {
        S.sndT = .25;
        var r = a.Audio;
        if (r && r.bed) {
          S.idle = !!(a.Quality && a.Quality.idle && a.Quality.idle());
          var t = S.lv;
          if (!S.on || "full" !== S.mode || S.hidden || S.idle) {
            N();
          }
          else {
            var e = .35 * t[2] + .75 * t[3] + t[4];
            var o = .6 * t[4] + .9 * t[6] + .15 * t[5];
            r.bed("mua", e);
            r.bed("gio", o * (.8 + .2 * Math.sin(.05 * S.wph + S.wind)));
          }
        }
      }
    }(n);
  };
  var L = {};
  function D() {
    L = {};
    j = {};
    P.length = 0;
    T = !1;
  }
  var T = !1;
  var q = [-.6, -.3, 0, .3, .6];
  function G(a, r) {
    T = !0;
    for (var t = n.canvas(7, 5), e = t.ctx, o = 0; o < r.length; o++)
      e.fillStyle = 0 === o || o === r.length - 1 ? a[0] : a[1], e.fillRect(3 + r[o][0], 2 + r[o][1], 1, 1);
    return t.canvas;
  }
  function E(a, n) {
    return (a %= n) < 0 ? a + n : a;
  }
  var Q = [160, 128];
  var C = [128, 160];
  var j = {};
  var P = [];
  function U(a, r, t) {
    var e = 100 * a + 10 * r + t;
    var o = j[e];
    if (o) {
      return o;
    }
    var l = i[a];
    var f = 0 === r;
    var h = Q[r];
    var d = C[r];
    var v = function (a, n, r) {
      var t = a + n + r;
      var e = L[t];
      if (e) {
        return e;
      }
      var o = i[n];
      var l = "f" === a;
      var u = l ? o.farLen : o.nearLen;
      var f = l ? o.farA : o.nearA;
      var h = q[r];
      var d = Math.round(Math.abs(h) * u);
      var v = d + 1;
      var c = h < 0 ? -1 : 1;
      var s = o.rgb;
      return L[t] = R(v, u, function (a, n) {
        var r = Math.round(Math.abs(h) * n);
        if (a !== (c > 0 ? r : d - r)) {
          return null;
        }
        var t = f * (.3 + .7 * n / (u - 1 || 1));
        return [s[0], s[1], s[2], Math.round(255 * t)];
      });
    }(f ? "f" : "n", a, t);
    T = !0;
    for (var c = n.canvas(h, d), s = c.ctx, g = n.rng(u(a, r, t + 77)), M = Math.round((f ? l.nFar : l.nNear) * h * d / 129600), p = 0; p < M; p++)
      for (var m = g() * h | 0, b = g() * d | 0, w = 0; w <= 1; w++)
        for (var A = 0; A <= 1; A++)
          s.drawImage(v, m - A * h, b - w * d);
    j[e] = c.canvas;
    P.push(e);
    if (P.length > 16) {
      delete j[P.shift()];
    }
    return c.canvas;
  }
  function z(a, n, r, t, e, o, l, u) {
    var f;
    var d = i[n];
    var v = (f = S.wind * d.lean, h(Math.round(f / .3) + 2, 0, 4));
    a.globalAlpha = r * S.swell;
    for (var c = 0; c < 2; c++)
      if (!(0 === c && S.perf < .6)) {
        for (var s = 0 === c, g = Q[c], M = C[c], p = d.vy * (s ? .78 : 1), m = s ? .55 : 1.1, b = U(n, c, v), w = E(p * d.lean * S.wph - t * m, g) - g, A = E(p * u - e * m, M) - M; A < l; A += M)
          for (var y = w; y < o; y += g)
            a.drawImage(b, Math.floor(y), Math.floor(A));
      }
    a.globalAlpha = 1;
  }
  function W(a, n, r, t) {
    for (var e = 0; e + 3 < n.length; e += 2)
      for (var o = n[e], l = n[e + 1], i = n[e + 2], u = n[e + 3], f = u - l || 1, h = l; h < u; h++)
        a.fillRect((o + (i - o) * (h - l) / f | 0) - t, h, r, 1);
  }
  I.draw = function (a, n, r, t, u, d, c) {
    if (S.on) {
      var g = S.lv;
      var M = (S.mapId, null);
      if (M) {
        S.vw = u;
        S.vh = d;
        S.area = h(u * d / 129600, .7, 3);
        S.dens = Math.pow(S.area, .75);
        a.save();
        a.imageSmoothingEnabled = !1;
        a.globalCompositeOperation = "source-over";
        a.globalAlpha = 1;
        (function (a, n, r) {
          var t;
          var e = S.lv;
          var o = 0;
          var i = 0;
          var u = 0;
          var f = 1;
          var h = 0;
          for (t = 1; t < 8; t++) {
            var d = l[t];
            if (d && !(e[t] <= .004)) {
              var v = d[3] * e[t];
              o += d[0] * v;
              i += d[1] * v;
              u += d[2] * v;
              h += v;
              f *= 1 - v;
            }
          }
          if (!(h < .004)) {
            a.fillStyle = "rgba(" + Math.round(o / h) + "," + Math.round(i / h) + "," + Math.round(u / h) + "," + (1 - f).toFixed(3) + ")";
            a.fillRect(0, 0, n, r);
          }
        })(a, u, d);
        if (g[5] > .02) {
          (function (a, n, r, t, e, o, l) {
            for (var i = function () {
              if (L.fog) {
                return L.fog;
              }
              var a = [];
              function n(a) {
                return R(192, 64, function (n, r) {
                  var t = (n + .5) / 192 * 2 - 1;
                  var e = (r + .5) / 64 * 2 - 1;
                  var o = 1 - (t * t + e * e);
                  if (o <= 0) {
                    return null;
                  }
                  var l = function (a, n) {
                    return .55 * v(a, n) + .3 * v(2.1 * a, 2.1 * n) + .15 * v(4.3 * a, 4.3 * n);
                  }(.05 * n + 11.7 * a, .1 * r + 5.3 * a);
                  var i = Math.min(1, 1.6 * o) * (.25 + 1.1 * l);
                  var u = Math.floor(4 * i + .95 * s(n, r)) / 4;
                  return u > 0 ? [226, 234, 238, Math.round(120 * Math.min(1, u))] : null;
                });
              }
              for (var r = 0; r < 3; r++)
                a.push(n(r + 1));
              return L.fog = a;
            }(), u = Math.sqrt(S.area) * (S.perf >= .6 ? 1 : .6), f = Math.round(5 * u), h = Math.round(4 * u), d = 0; d < f + h; d++) {
              var c = d < f;
              var g = c ? 2 : 1;
              var M = 192 * g;
              var p = 64 * g;
              var m = c ? .3 : .55;
              var _ = e + M;
              var x = o + p;
              var I = (c ? 5 : 9) * (.6 + A[d]) * (y[d] < .5 ? 1 : -1);
              var O = E(b[d] * _ + I * l - r * m, _) - M;
              var k = E(w[d] * x + 5 * Math.sin(.12 * l + 1.7 * d) - t * m, x) - p;
              a.globalAlpha = n * (c ? .75 : .55) * (.75 + .25 * Math.sin(.2 * l + d));
              a.drawImage(i[d % 3], 0 | O, 0 | k, M, p);
            }
            a.globalAlpha = 1;
          })(a, g[5], r, t, u, d, c);
        }
        if (g[1] > .02) {
          (function (a, n, r, t, e, o, l) {
            var i;
            var u = L.sun ? L.sun : L.sun = { beam: R(170, 190, function (a, n) {
                var r = a - .55 * n - 8;
                if (r < 0 || r > 58) {
                  return null;
                }
                var t = 1 - Math.abs(r - 29) / 29;
                var e = Math.sin(Math.PI * n / 190);
                var o = Math.floor(t * t * e * 3 + .95 * s(a, n)) / 3;
                return o > 0 ? [255, 244, 180, Math.round(92 * o)] : null;
              }), glow: R(280, 280, function (a, n) {
                var r = Math.sqrt(a * a + n * n) / 280;
                if (r >= 1) {
                  return null;
                }
                var t = (1 - r) * (1 - r);
                var e = Math.floor(4 * t + .95 * s(a, n)) / 4;
                return e > 0 ? [255, 238, 165, Math.round(150 * Math.min(1, e))] : null;
              }) };
            var f = e + 170;
            for (a.globalAlpha = n * (.75 + .15 * Math.sin(.2 * l)), a.drawImage(u.glow, 0, 0), i = 0; i < 4; i++) {
              var h = E((i + .35 + .3 * b[i]) / 4 * f - .25 * r, f) - 170;
              a.globalAlpha = n * (.5 + .35 * Math.sin(.25 * l + 1.9 * i));
              a.drawImage(u.beam, 0 | h, -20 - 30 * (1 & i));
            }
            var d = Math.min(160, Math.round(30 * n * S.perf * S.dens));
            var v = o + 8;
            var c = e + 8;
            for (a.fillStyle = "#fff2b8", i = 0; i < d; i++) {
              var g = E(b[i] * c + 6 * (.5 + A[i]) * l - .7 * r, c);
              var M = E(w[i] * v - 4 * l * (.5 + y[i]) + 3 * Math.sin(.7 * l + i) - .7 * t, v);
              var p = Math.sin(l * (.8 + y[i]) + 30 * b[i]);
              if (!(p <= .05)) {
                a.globalAlpha = n * p * .85;
                a.fillRect(0 | g, 0 | M, 1, 1);
              }
            }
            a.globalAlpha = 1;
          })(a, g[1], r, t, u, d, c);
        }
        if ((g[6] > .02 || g[4] > .02)) {
          (function (a, n, r, t, l, i, u, f, h) {
            var d;
            if (!(Math.abs(S.wind) < .05)) {
              var v = Math.min(100, Math.round(34 * n * S.perf * S.swell * S.dens));
              var c = u + 60;
              var s = f + 8;
              for (a.fillStyle = "#e8f0f2", d = 0; d < v; d++) {
                var g = 14 + (26 * y[d] | 0);
                var M = E(b[d] * c + (200 + 160 * A[d]) * S.wph - .9 * l, c) - 30;
                var p = w[d] * s + 3 * Math.sin(.03 * M + d) - .9 * i;
                a.globalAlpha = .22 + .22 * y[d];
                a.fillRect(0 | M, 0 | E(p, s), g, 1);
              }
              var m = Math.min(160, Math.round(46 * (n + .55 * r) * S.perf * S.dens));
              var _ = function (a) {
                var n = "la" + a;
                var r = L[n];
                if (r) {
                  return r;
                }
                for (var t = [], l = e[a] || e.xanh, i = 0; i < l.length; i++) {
                  for (var u = [], f = 0; f < 4; f++)
                    u.push(G(l[i], o[f]));
                  t.push(u);
                }
                return L[n] = t;
              }(t);
              for (a.globalAlpha = 1, d = 0; d < m; d++) {
                var x = E(b[d] * (u + 30) + (90 + 90 * A[d]) * S.wph - .85 * l, u + 30) - 15;
                var I = E(w[d] * (f + 20) + 14 * h * y[d] + 7 * Math.sin(h * (1.4 + y[d]) + d) - .85 * i, f + 20) - 10;
                var O = _[d % _.length][h * (3 + 3 * y[d]) + d & 3];
                a.drawImage(O, x - 3 | 0, I - 2 | 0);
              }
              var k = Math.min(100, Math.round(36 * n * S.perf * S.dens));
              for (a.fillStyle = "#cdb98a", d = 0; d < k; d++) {
                var F = E(b[d + 100] * (u + 20) + (240 + 120 * A[d]) * S.wph - l, u + 20) - 10;
                a.globalAlpha = .5;
                a.fillRect(0 | F, 0 | E(w[d + 100] * (f + 8) - i, f + 8), 2, 1);
              }
              a.globalAlpha = 1;
            }
          })(a, g[6], g[4], M.la, r, t, u, d, c);
        }
        var p;
        var m = 0;
        for (p = 2; p <= 4; p++)
          g[p] <= .02 || (z(a, p, g[p], r, t, u, d, c), m += i[p].rip * g[p]);
        if (m > .5) {
          (function (a, n, r, t, e, o, l, i) {
            var u = Math.min(72, Math.round(r * S.dens * S.perf));
            if (!(u < 1)) {
              for (var h = function () {
                if (L.rip) {
                  return L.rip;
                }
                var a = [];
                function n(a) {
                  var n = 2 + 1.7 * a;
                  var r = .5 * n;
                  var t = Math.ceil(2 * n) + 3;
                  var e = Math.ceil(2 * r) + 3;
                  var o = [.85, .6, .4, .22][a];
                  return R(t, e, function (a, l) {
                    var i = (a - t / 2 + .5) / n;
                    var u = (l - e / 2 + .5) / r;
                    var f = Math.sqrt(i * i + u * u);
                    return Math.abs(f - 1) > .32 ? null : [226, 240, 250, Math.round(255 * o * (1 - Math.abs(f - 1) / .32 * .5))];
                  });
                }
                for (var r = 0; r < 4; r++)
                  a.push(n(r));
                return L.rip = a;
              }(), d = o + 16, v = l + 16, c = n.pxWidth, s = n.pxHeight, g = 0; g < u; g++) {
                var M = i / (.5 + .5 * y[g]) + 10 * w[g];
                var p = Math.floor(M);
                var m = M - p;
                if (!(m > .6)) {
                  var b = E(f(g, p, 11) * d - t, d);
                  var A = E(f(g, p, 12) * v - e, v);
                  if (!c || !(b + t < 0 || b + t > c || A + e < 0 || A + e > s)) {
                    var _ = h[m / .6 * 4 | 0];
                    a.drawImage(_, b - _.width / 2 | 0, A - _.height / 2 | 0);
                  }
                }
              }
            }
          })(a, n, m, r, t, u, d, c);
        }
        if (g[7] > .02) {
          (function (a, n, r, t, e, o, l) {
            var i = function () {
              if (L.mote) {
                return L.mote;
              }
              function a(a) {
                return R(9, 9, function (n, r) {
                  var t = n - 4;
                  var e = r - 4;
                  var o = Math.sqrt(t * t + e * e);
                  if (o > 4.3) {
                    return null;
                  }
                  if (o < .9) {
                    return [255, 255, 255, 255];
                  }
                  if (o < 1.8) {
                    return [a[0], a[1], a[2], 235];
                  }
                  var l = Math.floor(3 * (1 - o / 4.3) + .9 * s(n, r)) / 3;
                  return l > 0 ? [a[0], a[1], a[2], Math.round(130 * l)] : null;
                });
              }
              return L.mote = [a([150, 236, 255]), a([202, 170, 255])];
            }();
            var u = Math.min(150, Math.round(64 * n * S.perf * S.dens));
            var f = e + 16;
            var h = o + 24;
            a.globalCompositeOperation = "lighter";
            a.fillStyle = "rgba(160,238,255,0.4)";
            for (var d = 0; d < u; d++) {
              var v = 20 + 16 * A[d];
              var c = E(b[d] * f + 6 * Math.sin(l * (.6 + y[d]) + d) - .9 * r, f) - 8;
              var g = E(w[d] * h + v * l - .9 * t, h) - 12;
              a.globalAlpha = n * (.55 + .45 * Math.sin(l * (1.2 + y[d]) + 2 * d));
              a.drawImage(i[1 & d], 0 | c, 0 | g);
              a.fillRect(c + 4 | 0, g - 4 | 0, 1, 4);
            }
            a.globalAlpha = 1;
            a.globalCompositeOperation = "source-over";
          })(a, g[7], r, t, u, d, c);
        }
        (function (a, n, r) {
          var t = S.bolt;
          if (t && !O) {
            var e;
            var o = (e = t.t) < .04 ? e / .04 : e < .09 ? 1 - (e - .04) / .05 * .7 : e < .15 ? .3 + (e - .09) / .06 * .6 : e < .6 ? .9 * Math.exp(7 * -(e - .15)) : 0;
            if (!(o <= .01)) {
              a.fillStyle = "rgba(225,235,255," + (.3 * o).toFixed(3) + ")";
              a.fillRect(0, 0, n, r);
              if (!(t.t > .24)) {
                a.fillStyle = "rgba(190,210,255," + (.28 * o).toFixed(3) + ")";
                W(a, t.pts, 4, 1);
                if (t.fork) {
                  W(a, t.fork, 3, 1);
                }
                a.fillStyle = "rgba(255,255,255," + Math.min(1, o + .15).toFixed(3) + ")";
                W(a, t.pts, 2, 0);
                if (t.fork) {
                  W(a, t.fork, 1, 0);
                }
              }
            }
          }
        })(a, u, d);
        a.restore();
      }
    }
  };
}(window.PNTT);
