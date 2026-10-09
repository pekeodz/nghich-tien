!function (a) {
  "use strict";
  var t = a.VFX;
  if (t) {
    var e = a.TuVanPhienFX = {};
    var o = 2 * Math.PI;
    e.IMG = "assets/sprites/fx/tu_van_phien_ma_khi.png";
    e.DUR = { cloud: 1.65, vortex: 2.15, domain: 2.8, hit: .6 };
    e.NAME = { cloud: "Ma Khí Xuất Phiên", vortex: "Tử Vân Cuồng Phong", domain: "Tử Vân Ma Vực" };
    e.FAST_BASIC = 1.4;
    e.SPREAD_BASIC = 1.4;
    var r = [162, 75, 219];
    var i = [232, 200, 255];
    var l = [70, 22, 112];
    var n = [216, 58, 154];
    var s = !1;
    e.prime = function () {
      if (!s && a.Assets && a.Assets.loadImage) {
        s = !0;
        a.Assets.loadImage(e.IMG, a.Assets.PRIO && a.Assets.PRIO.PREFETCH);
      }
    };
    var h = {};
    var f = [Math.PI / 2, Math.PI, 0, -Math.PI / 2];
    e.tipOf = function (t, e) {
      var o = void 0 === e ? A(t) : e;
      var r = 0;
      if (a.CONFIG && a.CONFIG.FLY) {
        r = a.CONFIG.FLY.HOVER * (t && t.flyRise || 0);
      }
      return { x: t.x + 34 * Math.cos(o), y: t.y - 24 - r + 14 * Math.sin(o) };
    };
    t.spawnTuVanPhien = function (a, o) {
      o = o || {};
      e.prime();
      var r = e.DUR[o.kind] ? o.kind : "cloud";
      var i = a || { x: 0, y: 0, dir: 2 };
      var l = void 0 !== o.angle ? o.angle : A(i);
      var n = e.tipOf(i, l);
      var s = o.basic && "cloud" === r ? e.FAST_BASIC : 1;
      var h = e.DUR[r] / s;
      var f = { type: "tuvanphien", kind: r, owner: i, ghost: !!o.ghost, elapsed: 0, dur: h, seed: 27 + (1e3 * Math.random() | 0), angle: l, scale: 1, spread: o.basic && "cloud" === r ? e.SPREAD_BASIC : 1, follow: "domain" === r && !o.at, fixed: !(!o.at || "vortex" !== r), hitAt: o.hitDelay > 0 && o.hitDelay < h ? o.hitDelay / h : -1, shook: !1, ax: n.x, ay: n.y, life: h, max: h };
      if ("domain" === r) {
        f.ax = i.x;
        f.ay = i.y - 16;
      }
      if (o.at) {
        f.ax = o.at.x;
        f.ay = o.at.y;
      }
      f.x = f.ax;
      f.y = f.ay;
      t.list.push(f);
      return f;
    };
    e.update = function (t, e) {
      if (t.elapsed += e, t.follow && t.owner && isFinite(t.owner.x) && isFinite(t.owner.y)) {
        var o = 0;
        if (a.CONFIG && a.CONFIG.FLY) {
          o = a.CONFIG.FLY.HOVER * (t.owner.flyRise || 0);
        }
        t.ax = t.owner.x;
        t.ay = t.owner.y - 16 - o;
      }
      t.x = t.ax;
      t.y = t.ay;
      if (!t.shook && t.hitAt >= 0 && t.elapsed >= t.hitAt * t.dur) {
        t.shook = !0;
        if (d() >= 1 && a.Camera && a.Camera.shakeAt && ("vortex" === t.kind || "domain" === t.kind)) {
          a.Camera.shakeAt(t.ax, t.ay, t.ghost ? 1.4 : 2.4, .22);
        }
      }
    };
    e.draw = function (t, s, h, f, b) {
      if ("back" === b || "front" === b) {
        var A = s.elapsed || 0;
        if (!(A >= s.dur)) {
          var k = { x: s.ax - (+h || 0), y: s.ay - (+f || 0), angle: s.angle, scale: s.scale, seed: s.seed, spread: s.spread, fixed: s.fixed, hitAt: s.hitAt, durSec: s.dur, q: d() };
          t.save();
          if ("back" === b) {
            (function (a, t, e, n) {
              if ("hit" !== t) {
                var s;
                var h;
                var f = n.q;
                var d = Math.sin(c(e) * Math.PI);
                var M = n.scale;
                if ("cloud" === t) {
                  var g = .15 * d;
                  if (g <= 0) {
                    return;
                  }
                  var y = 70 + 45 * p(e);
                  var m = Math.cos(n.angle) * y * M;
                  var S = Math.sin(n.angle) * y * M;
                  a.save();
                  a.translate(n.x, n.y);
                  a.globalAlpha *= g;
                  a.scale(1, .7);
                  var C = a.createRadialGradient(m, S / .7, 3 * M, m, S / .7, 65 * M);
                  C.addColorStop(0, "#622278");
                  C.addColorStop(.7, "#552065");
                  C.addColorStop(1, "rgba(85,32,101,0)");
                  a.fillStyle = C;
                  a.fillRect(m - 65 * M, S / .7 - 65 * M, 130 * M, 130 * M);
                  return void a.restore();
                }
                var b = ("domain" === t ? 96 : 62) * M;
                var x = p(e / .2) * (1 - v((e - .8) / .2));
                if (!(x <= .01)) {
                  a.save();
                  a.translate(n.x, n.y + 4 * M);
                  a.scale(1, .52);
                  var A = a.createRadialGradient(0, 0, .1 * b, 0, 0, 1.1 * b);
                  A.addColorStop(0, u(l, .55 * x));
                  A.addColorStop(.7, u(l, .32 * x));
                  A.addColorStop(1, u(l, 0));
                  a.fillStyle = A;
                  a.fillRect(1.2 * -b, 1.2 * -b, 2.4 * b, 2.4 * b);
                  a.globalCompositeOperation = "lighter";
                  a.strokeStyle = u(r, 1);
                  var k = e * ("domain" === t ? 1.1 : 2.6);
                  for (a.lineWidth = 2.4 * M, a.globalAlpha = .65 * x, a.beginPath(), a.arc(0, 0, b * ("domain" === t ? .98 : .95), 0, o), a.stroke(), a.lineWidth = 1.2 * M, a.globalAlpha = .5 * x, a.beginPath(), a.arc(0, 0, .84 * b, 0, o), a.stroke(), a.globalAlpha = .8 * x, a.strokeStyle = u(i, 1), a.lineWidth = 1.6 * M, s = 0; s < 8; s++) {
                    h = k + s * o / 8;
                    var P = .865 * b;
                    var I = .945 * b;
                    a.beginPath();
                    a.moveTo(Math.cos(h) * P, Math.sin(h) * P);
                    a.lineTo(Math.cos(h + .05) * (P + I) * .5, Math.sin(h + .05) * (P + I) * .5);
                    a.lineTo(Math.cos(h - .03) * I, Math.sin(h - .03) * I);
                    a.stroke();
                  }
                  if ("domain" === t && f >= 1) {
                    a.globalAlpha = .34 * x;
                    a.strokeStyle = u(r, 1);
                    a.lineWidth = 1.1 * M;
                    var R = .82 * b;
                    for (a.beginPath(), s = 0; s <= 8; s++)
                      h = .6 * -k + 3 * s % 8 * o / 8, s ? a.lineTo(Math.cos(h) * R, Math.sin(h) * R) : a.moveTo(Math.cos(h) * R, Math.sin(h) * R);
                    a.stroke();
                  }
                  a.restore();
                }
              }
            })(t, s.kind, A / s.dur, k);
          }
          else {
            (function (t, s, h, f) {
              if (!(h <= 0 || h >= 1)) {
                var d = f.q;
                var b = function () {
                  var t = a.Assets;
                  var o = t && t.get ? t.get(e.IMG) : null;
                  return o && !1 !== o.complete && (o.naturalWidth || o.width) ? o : null;
                }();
                var A = f.seed;
                var k = f.spread || 1;
                t.save();
                t.translate(f.x, f.y);
                t.scale(f.scale, f.scale);
                var P;
                var I;
                var R;
                var T;
                var w;
                var O = Math.min(1, h / .12) * Math.pow(1 - h, "domain" === s ? .45 : .6);
                var F = f.angle || 0;
                var G = Math.cos(F);
                var V = Math.sin(F);
                var W = -V;
                var D = G;
                var E = d >= 2 ? 1 : 1 === d ? .67 : .34;
                var N = f.hitAt >= 0 ? (h - f.hitAt) / (.25 / f.durSec) : -1;
                if ("cloud" === s) {
                  var _ = 105 * k;
                  var L = d >= 1 ? 2 : 1;
                  for (t.save(), t.rotate(F), g(t, 6, 0, 30 + 18 * p(h / .18), r, .9 * (1 - v(h / .3))), w = 0; w < L; w++) {
                    var q = c((h - .07 * w) / .5);
                    if (!(q <= 0 || q >= 1)) {
                      var z = 24 + p(q) * _;
                      var B = (26 + 16 * q) * (w ? .8 : 1);
                      var Y = 11 * (1 - .65 * q) * (w ? .8 : 1);
                      var H = Math.pow(1 - q, .7) * Math.min(1, 7 * q) * (w ? .7 : 1);
                      if (g(t, z - 6, 0, 1.5 * B, r, .5 * H, .8), x(t, z, B, Y, r, H, "#f2dcff"), d >= 1) {
                        for (I = 1; I <= 3; I++)
                          x(t, z - 9 * I * k, B * (1 - .1 * I), Y * (1 - .2 * I), l, H * (.3 - .07 * I), "#8b4ebd");
                      }
                    }
                  }
                  for (t.restore(), P = 0; P < 9; P++)
                    if (!(P / 9 >= E && P % 3 != 0)) {
                      var U = .035 * P;
                      var X = c((h - U) / (1 - U));
                      if (!(X <= 0)) {
                        var j = (18 + p(X) * (45 + 16 * P)) * k;
                        var K = Math.sin(7 * X + 1.8 * P) * (9 + 1.9 * P);
                        var Q = G * j + W * K;
                        var J = V * j + D * K - 10 - 13 * X;
                        y(t, Q, J, R = (35 + 9 * P) * (.6 + .75 * p(X)), .56 * R, O * (.5 + .022 * P), .2 * Math.sin(5 * X + P), !!(P % 2), b);
                        if (d >= 1 && P % 2 == 0) {
                          g(t, Q, J, .34 * R, r, .32 * O * (1 - .5 * X));
                        }
                      }
                    }
                  if (d >= 1) {
                    for (t.save(), t.rotate(F), w = 0; w < 2; w++) {
                      T = [];
                      var Z = 150 * k * p(h / .55);
                      for (P = 0; P < 20; P++) {
                        var $ = P / 19;
                        T.push([14 + $ * Z, Math.sin(5.2 * $ + 9 * h + 2.4 * w) * (4 + 11 * $) * (w ? -1 : 1) + (w ? 6 : -6) * $]);
                      }
                      m(t, T, 7 * (1 - h), .8 * O, r, "#e9ccff");
                    }
                    if (d >= 2) {
                      C(t, h, A, 22, 40, 0, 120 * k, 28, !0);
                    }
                    t.restore();
                  }
                }
                else if ("vortex" === s) {
                  var aa = p(h / .3);
                  var ta = f.fixed ? 0 : G * (50 + 80 * p(h));
                  var ea = f.fixed ? 0 : V * (50 + 80 * p(h));
                  var oa = 96 * aa;
                  var ra = 58 * (.55 + .45 * aa);
                  var ia = h * o * 2.1;
                  if (d >= 1) {
                    t.save();
                    t.globalCompositeOperation = "lighter";
                    var la = t.createLinearGradient(0, ea, 0, ea - oa - 12);
                    la.addColorStop(0, u(r, .42 * O));
                    la.addColorStop(1, u(r, 0));
                    t.fillStyle = la;
                    t.fillRect(ta - 9, ea - oa - 12, 18, oa + 12);
                    t.restore();
                  }
                  var na = d >= 2 ? 9 : 1 === d ? 6 : 4;
                  var sa = d >= 2 ? 3 : 2;
                  var ha = [];
                  for (I = 0; I < na; I++) {
                    var fa = I / (na - 1);
                    var da = ra * (.34 + .66 * Math.pow(fa, .85)) * (1 + .08 * Math.sin(8 * h + I));
                    for (w = 0; w < sa; w++) {
                      var ca = ia * (1.35 - .7 * fa) + 1.7 * I + w * o / sa;
                      ha.push({ x: ta + Math.cos(ca) * da, y: ea - fa * oa + Math.sin(ca) * da * .36 - 6, z: Math.sin(ca), s: 30 + 22 * fa + 18 * M(3 * I + w, A), h: fa, a: ca });
                    }
                  }
                  for (ha.sort(function (a, t) {
                    return a.z - t.z;
                  }), P = 0; P < ha.length; P++) {
                    var pa = ha[P];
                    var va = .62 + .38 * (.5 * pa.z + .5);
                    y(t, pa.x, pa.y, 1.5 * pa.s, .78 * pa.s, .52 * O * va * (1 - .35 * pa.h), .3 * pa.a, !!(P % 2), b);
                  }
                  if (d >= 1) {
                    for (w = 0; w < 3; w++) {
                      for (T = [], P = 0; P < 28; P++) {
                        var Ma = P / 27;
                        var ua = 1.35 * ia + Ma * o * 1.9 + w * o / 3;
                        var ga = ra * (.3 + .7 * Ma) * .92;
                        T.push([ta + Math.cos(ua) * ga, ea - Ma * oa * 1.02 + Math.sin(ua) * ga * .36 - 6]);
                      }
                      m(t, T, 5.5, .62 * O, r, "#f0d8ff");
                    }
                  }
                  g(t, ta, ea - oa - 4, 26 + 20 * aa, n, .34 * O);
                  if (d >= 1) {
                    t.save();
                    C(t, h, A, d >= 2 ? 26 : 12, ta, ea - 10, 70, 80, d >= 2);
                    t.restore();
                  }
                  if (N >= 0 && N < 1) {
                    g(t, ta, ea - 20, 44 + 70 * N, i, .95 * (1 - N));
                    t.save();
                    t.globalCompositeOperation = "lighter";
                    t.globalAlpha = .9 * (1 - N);
                    t.strokeStyle = u(i, 1);
                    t.lineWidth = 3.4 * (1 - N) + .6;
                    t.beginPath();
                    t.ellipse(ta, ea, 26 + 70 * p(N), .42 * (26 + 70 * p(N)), 0, 0, o);
                    t.stroke();
                    t.restore();
                  }
                }
                else if ("domain" === s) {
                  var ya = p(h / .6);
                  var ma = 78 * ya;
                  var Sa = d >= 2 ? 14 : 1 === d ? 9 : 5;
                  for (P = 0; P < Sa; P++) {
                    var Ca = P * o / Sa + .9 * h;
                    var ba = Math.cos(Ca) * ma;
                    var xa = Math.sin(Ca) * ma * .52;
                    var Aa = -10 - 14 * Math.sin(h * Math.PI);
                    var ka = 62 + 45 * M(P, A);
                    y(t, ba, xa + Aa, ka, .62 * ka, .5 * O, .17 * Math.sin(Ca + h), !!(P % 2), b);
                    if (d >= 1) {
                      y(t, 1.03 * ba, xa + Aa - 22 - 10 * Math.sin(4 * h + P), .8 * ka, .5 * ka, .3 * O, .2 * -Math.sin(Ca), !(P % 2), b);
                    }
                  }
                  if (y(t, 40 * G, 40 * V - 33, 100 * ya, 68 * ya, .3 * O, .2 * h, !1, b), d >= 1) {
                    for (t.save(), t.globalCompositeOperation = "lighter", P = 0; P < 8; P++) {
                      var Pa = P * o / 8 + .5 * h;
                      var Ia = Math.cos(Pa) * ma * 1.02;
                      var Ra = Math.sin(Pa) * ma * .52 * 1.02;
                      var Ta = 40 + 16 * Math.sin(9 * h + 2 * P);
                      var wa = t.createLinearGradient(0, Ra, 0, Ra - Ta);
                      wa.addColorStop(0, u(r, .5 * O));
                      wa.addColorStop(1, u(r, 0));
                      t.fillStyle = wa;
                      t.fillRect(Ia - 1.6, Ra - Ta, 3.2, Ta);
                    }
                    t.restore();
                    g(t, 0, -6, .9 * ma, r, .2 * O, .52);
                  }
                  if (d >= 2 && (t.save(), C(t, h, A, 26, 0, 0, 110, 60, !0), t.restore()), N >= 0 && N < 1) {
                    var Oa = 14 + (ma + 26) * p(N);
                    g(t, 0, -8, 50 + 60 * N, i, .8 * (1 - N), .6);
                    t.save();
                    t.globalCompositeOperation = "lighter";
                    t.globalAlpha = .95 * (1 - N);
                    t.strokeStyle = u(i, 1);
                    t.lineWidth = 4 * (1 - N) + .6;
                    t.beginPath();
                    t.ellipse(0, 2, Oa, .52 * Oa, 0, 0, o);
                    t.stroke();
                    t.globalAlpha *= .5;
                    t.lineWidth = 9 * (1 - N);
                    t.strokeStyle = u(r, 1);
                    t.stroke();
                    t.restore();
                  }
                }
                else {
                  var Fa = Math.sin(c(h) * Math.PI);
                  for (g(t, 0, -4, 18 + 30 * p(h / .4), i, .95 * (1 - v(h / .45))), P = 0; P < (d >= 2 ? 4 : 2); P++) {
                    var Ga = P * o / 4 + 2 * M(P, A);
                    var Va = 8 + 22 * p(h);
                    R = (28 + 8 * P) * (.6 + .8 * p(h));
                    y(t, Math.cos(Ga) * Va, Math.sin(Ga) * Va * .6 - 6 - 10 * h, R, .6 * R, .7 * Fa, .3 * Math.sin(Ga), !!(P % 2), b);
                  }
                  if (d >= 1) {
                    for (S(t, 0, -6, 20 * (1 - v(h / .6)), 1, i), t.save(), t.globalCompositeOperation = "lighter", t.globalAlpha = .85 * (1 - h), t.strokeStyle = u(r, 1), t.lineWidth = 2.2 * (1 - h) + .4, t.beginPath(), t.ellipse(0, 0, 8 + 34 * p(h), .55 * (8 + 34 * p(h)), 0, 0, o), t.stroke(), t.restore(), P = 0; P < 4; P++) {
                      var Wa = P * o / 4 + .6 + M(P, A + 8);
                      var Da = 30 * p(h / .7);
                      for (T = [], I = 0; I < 9; I++) {
                        var Ea = I / 8;
                        T.push([Math.cos(Wa + .8 * Ea) * Da * Ea, Math.sin(Wa + .8 * Ea) * Da * Ea * .6 - 4]);
                      }
                      m(t, T, 4 * (1 - h), .9 * (1 - h), r, "#f0d8ff");
                    }
                  }
                }
                t.restore();
              }
            })(t, s.kind, A / s.dur, k);
          }
          t.restore();
        }
      }
    };
    e.spawnImpact = function (e, o, r, i) {
      for (var l = d() >= 2 ? 9 : 4, n = Math.sqrt(r * r + i * i) || 1, s = r / n, h = i / n, f = 0; f < l; f++) {
        var c = Math.atan2(h, s) + 2 * (Math.random() - .5);
        var p = 45 + 70 * Math.random();
        t.list.push({ type: "spark", x: e, y: o, vx: Math.cos(c) * p, vy: Math.sin(c) * p * .7 - 12, color: f % 3 ? "#a664d0" : "#f7dfff", life: .3 + .25 * Math.random(), max: .55 });
      }
      t.list.push({ type: "lightring", x: e, y: o, color: "#8735af", maxR: 18, life: .26, max: .26 });
      t.spawnTuVanPhien({ x: e, y: o + 24 }, { kind: "hit", at: { x: e, y: o }, ghost: !0 });
      if (d() >= 1 && a.Camera && a.Camera.shakeAt) {
        a.Camera.shakeAt(e, o, 1.6, .14);
      }
    };
  }
  function d() {
    var t = a.Quality;
    return t && "number" == typeof t.tier ? t.tier : 2;
  }
  function c(a) {
    return a < 0 ? 0 : a > 1 ? 1 : a;
  }
  function p(a) {
    return 1 - Math.pow(1 - c(a), 3);
  }
  function v(a) {
    return (a = c(a)) * a * (3 - 2 * a);
  }
  function M(a, t) {
    var e = 43758.5453 * Math.sin(127.1 * a + 311.7 * (void 0 === t ? 1 : t));
    return e - Math.floor(e);
  }
  function u(a, t) {
    return "rgba(" + a[0] + "," + a[1] + "," + a[2] + "," + t + ")";
  }
  function g(a, t, e, o, r, i, l) {
    if (!(i <= .01 || o <= .5)) {
      var n = function (a) {
        var t = a.join(",");
        if (void 0 !== h[t]) {
          return h[t];
        }
        if ("undefined" == typeof document) {
          h[t] = null;
          return null;
        }
        var e = document.createElement("canvas");
        e.width = 64;
        e.height = 64;
        var o = e.getContext("2d");
        var r = o.createRadialGradient(32, 32, 0, 32, 32, 32);
        r.addColorStop(0, "rgba(255,255,255,1)");
        r.addColorStop(.22, u(a, .85));
        r.addColorStop(.6, u(a, .22));
        r.addColorStop(1, u(a, 0));
        o.fillStyle = r;
        o.fillRect(0, 0, 64, 64);
        h[t] = e;
        return e;
      }(r);
      if (a.save(), a.globalCompositeOperation = "lighter", a.globalAlpha *= i > 1 ? 1 : i, n) {
        a.drawImage(n, t - o, e - o * (l || 1), 2 * o, 2 * o * (l || 1));
      }
      else {
        var s = a.createRadialGradient(t, e, 0, t, e, o);
        s.addColorStop(0, "#ffffff");
        s.addColorStop(.3, u(r, .7));
        s.addColorStop(1, u(r, 0));
        a.fillStyle = s;
        a.fillRect(t - o, e - o, 2 * o, 2 * o);
      }
      a.restore();
    }
  }
  function y(a, t, e, o, r, i, l, n, s) {
    if (!(i <= .005)) {
      if (a.save(), a.translate(t, e), a.rotate(l || 0), n && a.scale(-1, 1), a.globalAlpha *= i > 1 ? 1 : i, s) {
        a.drawImage(s, -o / 2, -r / 2, o, r);
      }
      else {
        var h = a.createRadialGradient(0, 0, 2, 0, 0, o / 2);
        h.addColorStop(0, "#a947db");
        h.addColorStop(.4, "#542172");
        h.addColorStop(1, "rgba(84,33,114,0)");
        a.fillStyle = h;
        a.scale(1, r / o);
        a.fillRect(-o / 2, -o / 2, o, o);
      }
      a.restore();
    }
  }
  function m(a, t, e, o, r, i) {
    if (!(t.length < 2 || o <= .01)) {
      var l;
      var n = t.length;
      var s = [];
      var h = [];
      for (l = 0; l < n; l++) {
        var f = l / (n - 1);
        var d = t[Math.max(0, l - 1)];
        var c = t[Math.min(n - 1, l + 1)];
        var p = Math.atan2(c[1] - d[1], c[0] - d[0]) + Math.PI / 2;
        var v = e * Math.pow(Math.sin(Math.PI * Math.pow(f, .7)), .9) * .5;
        s.push([t[l][0] + Math.cos(p) * v, t[l][1] + Math.sin(p) * v]);
        h.push([t[l][0] - Math.cos(p) * v, t[l][1] - Math.sin(p) * v]);
      }
      a.save();
      a.globalCompositeOperation = "lighter";
      for (var M = 0; M < 2; M++) {
        var g = M ? .38 : 1;
        for (a.globalAlpha = o * (M ? .9 : .55), a.fillStyle = M ? i : u(r, 1), a.beginPath(), l = 0; l < n; l++) {
          var y = t[l][0] + (s[l][0] - t[l][0]) * g;
          var m = t[l][1] + (s[l][1] - t[l][1]) * g;
          if (l) {
            a.lineTo(y, m);
          }
          else {
            a.moveTo(y, m);
          }
        }
        for (l = n - 1; l >= 0; l--)
          a.lineTo(t[l][0] + (h[l][0] - t[l][0]) * g, t[l][1] + (h[l][1] - t[l][1]) * g);
        a.closePath();
        a.fill();
      }
      a.restore();
    }
  }
  function S(a, t, e, o, r, l) {
    if (!(r <= .02 || o < .8)) {
      a.save();
      a.globalCompositeOperation = "lighter";
      a.globalAlpha *= r > 1 ? 1 : r;
      a.fillStyle = u(l || i, 1);
      a.beginPath();
      a.moveTo(t - o, e);
      a.lineTo(t, e - .16 * o);
      a.lineTo(t + o, e);
      a.lineTo(t, e + .16 * o);
      a.closePath();
      a.moveTo(t, e - .8 * o);
      a.lineTo(t + .12 * o, e);
      a.lineTo(t, e + .8 * o);
      a.lineTo(t - .12 * o, e);
      a.closePath();
      a.fill();
      a.fillStyle = "#ffffff";
      a.fillRect(t - .7, e - .7, 1.4, 1.4);
      a.restore();
    }
  }
  function C(a, t, e, r, l, n, s, h, f) {
    for (var d = 0; d < r; d++) {
      var c = M(d, e + 6) * o;
      var v = (8 + M(d, e) * s) * p(t);
      var u = l + Math.cos(c) * v;
      var g = n + Math.sin(c) * v * .5 - h * t * (.4 + M(d, e + 3));
      var y = 1 + 1.6 * M(d, e + 4);
      var m = (1 - t) * (.3 + .55 * M(d, e + 2));
      a.globalAlpha = m;
      a.fillStyle = d % 4 ? "#ce84ed" : "#f7dfff";
      a.fillRect(u, g, y, y);
      if (f && d % 5 == 0) {
        S(a, u, g, 3 + 2 * y, 1.2 * m, i);
      }
    }
  }
  function b(a, t, e, o) {
    var r = e / Math.sin(1);
    var i = t - r;
    var l = i + r * Math.cos(1);
    var n = t - (o = Math.min(o, .85 * (t - l)));
    var s = (n * n - l * l - e * e) / (2 * (n - l));
    var h = n - s;
    var f = Math.atan2(e, l - s);
    a.beginPath();
    a.arc(i, 0, r, -1, 1);
    a.arc(s, 0, h, f, -f, !0);
    a.closePath();
  }
  function x(a, t, e, o, r, i, l) {
    if (!(i <= .01)) {
      a.save();
      a.globalCompositeOperation = "lighter";
      a.globalAlpha = .6 * i;
      a.fillStyle = u(r, 1);
      b(a, t, e, o);
      a.fill();
      a.globalAlpha = .95 * i;
      a.fillStyle = l;
      b(a, t + .1 * o, .86 * e, .5 * o);
      a.fill();
      a.restore();
    }
  }
  function A(a) {
    return void 0 !== f[0 | (a && a.dir)] ? f[0 | (a && a.dir)] : 0;
  }
}(window.PNTT);
