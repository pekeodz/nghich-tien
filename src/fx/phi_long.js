!function (t) {
  "use strict";
  var a = t.VFX;
  if (a) {
    var e = t.PhiLongFX = {};
    var r = 2 * Math.PI;
    var i = e.ATLAS = "assets/sprites/fx/phi_long.png";
    e.ATLAS_SIZE = [335, 338];
    var o = e.SPR = { body: [0, 0, 335, 168], roar: [0, 170, 123, 168], roarU: 212, roarCx: 88, axisY: 94, pivotU: 276, tailU: 4 };
    var n = e.CFG = { hit: 1.15, launch: .55, appear: .4, coast: .34, tail: .72, step: 2.5, slice: [3, 5, 9], alpha: .9, bloom: .26, wave: 3, waveLen: 62, waveSpd: 9, maxHist: 520, maxMotes: 90, ghosts: [.08, .16], ghostA: [.2, .09] };
    var s = e.SPECS = [{ R: 46, h0: -12, rise: 50, w: 2.9, sc: .46, dphi: 0, lag: 0, side: 1 }, { R: 59, h0: -2, rise: 46, w: 2.6, sc: .4, dphi: -.95, lag: .03, side: -1 }, { R: 72, h0: 8, rise: 42, w: 2.3, sc: .35, dphi: .95, lag: .06, side: 1 }];
    e.COUNT = s.length;
    var l = e.COLORS = { gold: "#ffd45a", goldHi: "#fff1b8", ring: "#ffd45a", ringHot: "#fff8d8", sparkA: "#ffd45a", sparkB: "#fff8d8", sparkC: "#e8a21e", seal: "#ffd45a", sealDeep: "#7a4a08" };
    var h = [[1, 1, 1], [0, 1, 1], [1, 0, 1], [0, 0, 1], [1, 1, 0], [0, 1, 0], [1, 0, 0], [0, 0, 0]];
    var f = !1;
    e.prime = function () {
      if (!f && t.Assets && t.Assets.loadImage) {
        f = !0;
        t.Assets.loadImage(i, t.Assets.PRIO && t.Assets.PRIO.PREFETCH);
      }
    };
    var p = null;
    a.spawnPhiLong = function (t, r, i) {
      i = i || {};
      e.prime();
      var o = i.hitDelay > .6 ? i.hitDelay : n.hit;
      var l = t || { x: 0, y: 0 };
      var h = o + n.tail;
      var f = { type: "philong", owner: l, ghost: !!i.ghost, hit: o, elapsed: 0, seed: 1e6 * Math.random() | 0, vic: [], dr: [], hits: [], motes: [], moteAcc: 0, life: h, max: h };
      w(f);
      f.x = f.fx;
      f.y = f.fy;
      for (var p = [], x = 0; x < (r ? r.length : 0); x++) {
        var d = r[x];
        if (d && isFinite(d.x) && isFinite(d.y)) {
          p.push(M(d));
        }
      }
      if (!p.length) {
        var g = i.point;
        if (g && isFinite(g.x) && isFinite(g.y)) {
          p.push(M({ x: g.x, y: g.y }));
        }
        else {
          p.push(M({ x: f.fx + 70 * b(l), y: f.fy }));
        }
      }
      f.vic = p;
      for (var y = 0; y < s.length; y++) {
        var c = S(f, y, p[y % p.length]);
        f.dr.push(c);
        C(0, c, 0, v());
      }
      a.list.push(f);
      return f;
    };
    e.update = function (t, a) {
      t.elapsed += a;
      var e;
      var r = t.elapsed;
      var i = v();
      for (w(t), function (t) {
        for (var a = 0; a < t.vic.length; a++) {
          var e = t.vic[a];
          var r = e.t;
          if (r && !r.dead && isFinite(r.x) && isFinite(r.y)) {
            e.x = r.x;
            e.y = r.y;
          }
        }
      }(t), e = 0; e < t.dr.length; e++) {
        var o = t.dr[e];
        var s = o.pos.x;
        var l = o.pos.y;
        P(t, o, r, o.pos);
        if (r >= o.tL) {
          o.flown += Math.sqrt((o.pos.x - s) * (o.pos.x - s) + (o.pos.y - l) * (o.pos.y - l));
        }
        var h = o.hist;
        h.push({ t: r, x: o.pos.x, y: o.pos.y, z: o.pos.z });
        if (h.length > n.maxHist) {
          h.splice(0, h.length - n.maxHist);
        }
        C(0, o, r, i);
        if (!o.ended && r >= t.hit) {
          o.ended = !0;
          R(t, o, e);
        }
      }
      if (i >= 2 && r < t.hit + n.coast) {
        for (t.moteAcc += 18 * a * t.dr.length; t.moteAcc >= 1;)
          t.moteAcc -= 1, L(t);
      }
      for (e = t.motes.length - 1; e >= 0; e--) {
        var f = t.motes[e];
        f.age += a;
        if (f.age >= f.life) {
          t.motes.splice(e, 1);
        }
        else {
          f.x += f.vx * a;
          f.y += f.vy * a;
          f.vx *= .96;
          f.vy = .96 * f.vy - 6 * a;
        }
      }
      for (e = t.hits.length - 1; e >= 0; e--)
        r - t.hits[e].t0 > .7 && t.hits.splice(e, 1);
    };
    e.draw = function (a, e, o, s, f) {
      if ("back" === f || "front" === f) {
        var c;
        var M = v();
        var b = (c = t.Assets) && c.get ? c.get(i) : null;
        var w = M > 0 ? function () {
          if (p || "undefined" == typeof document) {
            return p;
          }
          try {
            p = { gold: u("255,206,96"), white: u("255,246,214") };
          }
          catch (t) {
            p = null;
          }
          return p;
        }() : null;
        var k = -(+o || 0);
        var A = -(+s || 0);
        var S = e.elapsed || 0;
        if (a.save(), a.imageSmoothingEnabled = !0, "back" === f) {
          if (M >= 1) {
            (function (t, a, e, i, o, s, f) {
              if (!(e > a.hit + .5 + .4)) {
                var p = g(e / .32);
                var v = e < a.hit ? 1 : 1 - d((e - a.hit) / .5);
                var c = x(e / .2, 0, 1) * v;
                if (!(c <= .01)) {
                  var u = y(18, 50, p);
                  var M = Math.round(a.fx + i);
                  var b = Math.round(a.fy + o);
                  if (t.save(), t.translate(M, b), f) {
                    var w = x(e / .25, 0, 1) * (1 - d((e - n.launch) / .5)) * .42;
                    if (w > .01) {
                      t.save();
                      t.translate(0, -34);
                      t.globalCompositeOperation = "lighter";
                      m(t, f.gold, .46 * u, 56, w);
                      t.restore();
                    }
                  }
                  if (f && e < .3) {
                    var k = e / .3;
                    t.save();
                    t.translate(0, -20);
                    t.globalCompositeOperation = "lighter";
                    m(t, f.white, 22 + 26 * k, 30 + 30 * k, .5 * (1 - k));
                    t.restore();
                  }
                  t.scale(1, .5);
                  if (f) {
                    t.globalCompositeOperation = "lighter";
                    m(t, f.gold, 1.4 * u, 1.4 * u, .6 * c);
                    t.globalCompositeOperation = "source-over";
                  }
                  t.globalAlpha = .92 * c;
                  t.lineWidth = 1.7;
                  t.strokeStyle = l.seal;
                  t.beginPath();
                  t.arc(0, 0, u, 0, r);
                  t.stroke();
                  t.lineWidth = 1.1;
                  t.strokeStyle = l.goldHi;
                  t.beginPath();
                  t.arc(0, 0, .58 * u, 0, r);
                  t.stroke();
                  t.globalAlpha = .7 * c;
                  t.strokeStyle = l.sealDeep;
                  t.lineWidth = 1.4;
                  t.beginPath();
                  t.arc(0, 0, .7 * u, 0, r);
                  t.stroke();
                  var A = .9 * e;
                  t.strokeStyle = l.goldHi;
                  t.lineWidth = 1.4;
                  for (var S = 0; S < 8; S++) {
                    t.save();
                    t.rotate(A + S / 8 * r);
                    t.translate(.82 * u, 0);
                    t.globalAlpha = .95 * c;
                    for (var C = 0; C < 3; C++) {
                      var O = 2.5 * (C - 1);
                      t.beginPath();
                      if (h[S][C]) {
                        t.moveTo(O, -3.6);
                        t.lineTo(O, 3.6);
                      }
                      else {
                        t.moveTo(O, -3.6);
                        t.lineTo(O, -.9);
                        t.moveTo(O, .9);
                        t.lineTo(O, 3.6);
                      }
                      t.stroke();
                    }
                    t.restore();
                  }
                  var z = (e - n.launch) / .26;
                  if (z > 0 && z < 1) {
                    t.globalAlpha = .7 * (1 - z);
                    t.strokeStyle = l.ringHot;
                    t.lineWidth = 2;
                    t.beginPath();
                    t.arc(0, 0, u * (.6 + .7 * z), 0, r);
                    t.stroke();
                  }
                  t.restore();
                }
              }
            })(a, e, S, k, A, 0, w);
          }
          for (var C = 0; C < e.hits.length; C++)
            E(a, e, e.hits[C], k, A, M);
        }
        for (var O = 0; O < e.dr.length; O++)
          U(a, e, e.dr[O], S, k, A, M, b, f);
        if ("front" === f) {
          if (M >= 1 && w) {
            (function (t, a, e, r, i, o) {
              if (!(e > a.hit + .1)) {
                t.save();
                t.globalCompositeOperation = "lighter";
                for (var n = 0; n < a.dr.length; n++) {
                  var s = a.dr[n];
                  var l = s.tr;
                  if (!(l.n < 2)) {
                    var h = I(a, 1, e) * (e > a.hit ? x(1 - (e - a.hit) / .1, 0, 1) : 1);
                    var f = d((e - s.tL) / Math.max(.2, a.hit - s.tL));
                    var p = 11 + 12 * f;
                    t.save();
                    t.translate(Math.round(l.x[0] + r), Math.round(l.y[0] + i));
                    m(t, o.gold, p, p, h * (.4 + .3 * f));
                    m(t, o.white, .5 * p, .5 * p, h * (.25 + .4 * f));
                    t.restore();
                  }
                }
                t.restore();
              }
            })(a, e, S, k, A, w);
          }
          for (var z = 0; z < e.hits.length; z++)
            N(a, e, e.hits[z], k, A, M, w, b);
          if (M >= 2) {
            (function (t, a, e, r, i) {
              if (i && a.motes.length) {
                t.globalCompositeOperation = "lighter";
                for (var o = 0; o < a.motes.length; o++) {
                  var n = a.motes[o];
                  var s = n.age / n.life;
                  var l = .9 * (s < .18 ? s / .18 : 1 - (s - .18) / .82);
                  t.save();
                  t.translate(Math.round(n.x + e), Math.round(n.y + r));
                  m(t, n.k ? i.white : i.gold, 2.4 * n.r, 2.4 * n.r, l);
                  t.restore();
                }
              }
            })(a, e, k, A, w);
          }
        }
        a.restore();
      }
    };
    e.headOf = function (t, a) {
      return t.dr[a] && t.dr[a].pos;
    };
    e.trailOf = function (t, a, e) {
      var r = t.dr[a];
      return r ? T(r, { x: [], y: [], z: [], a: [], n: 0 }, void 0 === e ? t.elapsed : e, (o.pivotU - o.tailU) * r.S.sc + 24) : null;
    };
  }
  function v() {
    var a = t.Quality;
    return a && "number" == typeof a.tier ? a.tier : 2;
  }
  function x(t, a, e) {
    return t < a ? a : t > e ? e : t;
  }
  function d(t) {
    return (t = x(t, 0, 1)) * t * (3 - 2 * t);
  }
  function g(t) {
    return 1 - (1 - (t = x(t, 0, 1))) * (1 - t) * (1 - t);
  }
  function y(t, a, e) {
    return t + (a - t) * e;
  }
  function c(t, a) {
    var e = Math.imul(0 | t, 374761393) + Math.imul(0 | a, 668265263) | 0;
    return (((e = Math.imul(e ^ e >>> 13, 1274126177)) ^ e >>> 16) >>> 0) / 4294967296;
  }
  function u(t) {
    var a = document.createElement("canvas");
    a.width = a.height = 64;
    for (var e = a.getContext("2d"), r = e.createRadialGradient(32, 32, 0, 32, 32, 32), i = 0; i <= 12; i++) {
      var o = i / 12;
      var n = 12 === i ? 0 : Math.exp(-Math.pow(o / .42, 2));
      r.addColorStop(o, "rgba(" + t + "," + n.toFixed(4) + ")");
    }
    e.fillStyle = r;
    e.fillRect(0, 0, 64, 64);
    return a;
  }
  function m(t, a, e, r, i) {
    if (!(!a || i <= .004)) {
      t.globalAlpha = i > 1 ? 1 : i;
      t.drawImage(a, -e, -r, 2 * e, 2 * r);
    }
  }
  function M(t) {
    var a = t && t.def;
    return { t: t || null, x: t && isFinite(t.x) ? t.x : 0, y: t && isFinite(t.y) ? t.y : 0, h: x(a && a.barY || 40, 20, 90) };
  }
  function b(t) {
    return t && 1 === t.dir ? -1 : 1;
  }
  function w(a) {
    var e = a.owner;
    if (e && isFinite(e.x) && isFinite(e.y)) {
      var r = 0;
      if (t.CONFIG && t.CONFIG.FLY) {
        r = window.NTBayCao(e);
      }
      a.fx = e.x;
      a.fy = e.y;
      a.kx = e.x;
      a.ky = e.y - 20 - r;
    }
    else {
      if (void 0 === a.kx) {
        a.fx = a.kx = 0;
        a.fy = 0;
        a.ky = -20;
      }
    }
  }
  function k(t, a, e, r, i) {
    var o = t.h0 + t.rise * x(r, -3, 3);
    i.x = a.kx + t.R * Math.cos(e);
    i.y = a.ky + .55 * t.R * Math.sin(e) - .85 * o;
    i.z = Math.sin(e);
    return i;
  }
  function A(t, a, e) {
    e.x = -t.R * t.w * Math.sin(a);
    e.y = .55 * t.R * t.w * Math.cos(a) - .85 * t.rise;
    return e;
  }
  function S(t, a, e) {
    for (var i = s[a], o = { i: a, S: i, vic: e, tL: n.launch + i.lag, hist: [], launched: !1, ended: !1, fl: null, end: null, last: null, pos: { x: 0, y: 0, z: -1 }, ang: 0, flown: 0, tr: { x: [], y: [], z: [], a: [], n: 0 }, g1: { x: [], y: [], z: [], a: [], n: 0 }, g2: { x: [], y: [], z: [], a: [], n: 0 } }, l = e.x, h = e.y - .5 * e.h, f = Math.atan2(h - t.ky, l - t.kx), p = -2, v = 0, x = { x: 0, y: 0 }, d = 0; d < 120; d++) {
      var g = d / 120 * r;
      A(i, g, x);
      var y = (x.x * Math.cos(f) + x.y * Math.sin(f)) / (Math.sqrt(x.x * x.x + x.y * x.y) || 1);
      if (y > p) {
        p = y;
        v = g;
      }
    }
    o.phi0 = v + i.dphi - i.w * o.tL;
    o.flip = l >= t.kx ? 1 : -1;
    for (var c = { x: 0, y: 0, z: 0 }, u = 150; u >= 0; u--) {
      var m = .02 * -u;
      k(i, t, o.phi0 + i.w * m, m, c);
      o.hist.push({ t: m, x: c.x, y: c.y, z: c.z });
    }
    o.pos.x = c.x;
    o.pos.y = c.y;
    o.pos.z = c.z;
    A(i, o.phi0, x);
    o.ang = Math.atan2(x.y, x.x);
    return o;
  }
  function C(t, a, e, r) {
    var i = a.S.sc * (.82 + .18 * d(e / n.appear));
    var s = (o.pivotU - o.tailU) * i + 24;
    T(a, a.tr, e, s);
    a.ang = a.tr.a[0];
    a.scNow = i;
    if (r >= 2) {
      T(a, a.g1, Math.max(-2.9, e - n.ghosts[0]), s);
      T(a, a.g2, Math.max(-2.9, e - n.ghosts[1]), s);
    }
  }
  function O(t) {
    return { x: t.x, y: t.y - .5 * t.h };
  }
  function z(t, a, e, r) {
    var i = t.fl;
    var o = t.S;
    var n = a.x - i.x0;
    var s = a.y - i.y0;
    var l = Math.sqrt(n * n + s * s) || 1;
    var h = n / l;
    var f = s / l;
    var p = x(.36 * l, 16, 95);
    var v = .34 * l;
    var d = .17 * o.side * l;
    var g = i.x0 + i.tx * p;
    var y = i.y0 + i.ty * p;
    var c = a.x - h * v - f * d;
    var u = a.y - f * v + h * d;
    var m = 1 - e;
    var M = m * m * m;
    var b = 3 * m * m * e;
    var w = 3 * m * e * e;
    var k = e * e * e;
    r.x = M * i.x0 + b * g + w * c + k * a.x;
    r.y = M * i.y0 + b * y + w * u + k * a.y;
    r.a1 = p;
    r.p2x = c;
    r.p2y = u;
    return r;
  }
  function F(t, a) {
    var e = t.fl;
    return x(e.v0 * e.Tf / (3 * Math.max(a, 1)), .4, .85);
  }
  function P(t, a, e, r) {
    var i = a.S;
    if (e < a.tL) {
      return k(i, t, a.phi0 + i.w * e, e, r);
    }
    if (!(a.launched)) {
      (function (t, a) {
        var e = a.S;
        var r = a.phi0 + e.w * a.tL;
        var i = k(e, t, r, a.tL, { x: 0, y: 0, z: 0 });
        var o = A(e, r, { x: 0, y: 0 });
        var n = Math.sqrt(o.x * o.x + o.y * o.y) || 1;
        a.fl = { x0: i.x, y0: i.y, tx: o.x / n, ty: o.y / n, v0: n, Tf: Math.max(.2, t.hit - a.tL) };
        a.launched = !0;
      })(t, a);
    }
    var o = O(a.vic);
    var n = a.fl;
    if (r.z = 1, e <= t.hit) {
      var s = x((e - a.tL) / n.Tf, 0, 1);
      var l = F(a, z(a, o, .5, { x: 0, y: 0 }).a1);
      z(a, o, l * s + (1 - l) * s * s, r);
      a.last = { p2x: r.p2x, p2y: r.p2y, a1: r.a1 };
      return r;
    }
    if (!a.end) {
      var h = a.last || { p2x: o.x - 1, p2y: o.y, a1: 30 };
      var f = o.x - h.p2x;
      var p = o.y - h.p2y;
      var v = Math.sqrt(f * f + p * p) || 1;
      var d = F(a, h.a1);
      a.end = { x: o.x, y: o.y, dx: f / v, dy: p / v, v: 3 * v * (2 - d) / n.Tf };
    }
    var g = e - t.hit;
    var y = a.end;
    var c = y.v * (1 - Math.exp(-7 * g)) / 7;
    r.x = y.x + y.dx * c;
    r.y = y.y + y.dy * c;
    return r;
  }
  function L(t) {
    var a = 1e3 * t.elapsed | 0;
    var e = c(t.seed, a) * t.dr.length | 0;
    var i = t.dr[x(e, 0, t.dr.length - 1)].tr;
    if (!(t.motes.length >= n.maxMotes || i.n < 6)) {
      var o = c(t.seed + 5, a + 17) * (i.n - 2) | 0;
      var s = c(t.seed + 9, a + 31) * r;
      t.motes.push({ x: i.x[o] + 4 * Math.cos(s), y: i.y[o] + 4 * Math.sin(s), vx: 12 * Math.cos(s), vy: 12 * Math.sin(s) - 8, age: 0, life: .45 + .45 * c(t.seed + 2, a), r: 1.3 + 1.6 * c(t.seed + 3, a), k: c(t.seed + 4, a) < .3 ? 1 : 0 });
    }
  }
  function R(e, i, o) {
    var n = i.vic;
    var s = v();
    var h = O(n);
    if (e.hits.push({ t0: e.elapsed, x: n.x, y: n.y, cx: h.x, cy: h.y, h: n.h, ang: i.ang, flip: i.flip, sc: i.S.sc, i: o }), a.spawnRing && (a.spawnRing(n.x, n.y, l.ring, 30, .36), s >= 1 && a.spawnRing(n.x, n.y - 8, l.ringHot, 15, .22)), s >= 1) {
      for (var f = s >= 2 ? 8 : 4, p = 0; p < f; p++) {
        var x = p / f * r + .9 * c(e.seed, 11 * o + p);
        a.list.push({ type: "spark", x: h.x, y: h.y, vx: Math.cos(x) * (48 + 46 * c(e.seed, 11 * o + p + 300)), vy: Math.sin(x) * (30 + 24 * c(e.seed, 11 * o + p + 500)) - 18, color: p % 3 == 0 ? l.sparkB : p % 3 == 1 ? l.sparkA : l.sparkC, life: .32, max: .32 });
      }
    }
    if (o < 2 && t.Audio && t.Audio.atPoint) {
      t.Audio.atPoint("skill_dragon_hit", n.x, n.y, { gain: .8, rate: .94 + .1 * o });
    }
  }
  function T(t, a, e, r) {
    for (var i = t.hist, o = i.length, s = o - 1, l = n.step; s > 0 && i[s].t > e;)
      s--;
    var h = i[s].x;
    var f = i[s].y;
    var p = i[s].z;
    if (s < o - 1 && i[s + 1].t > i[s].t) {
      var v = x((e - i[s].t) / (i[s + 1].t - i[s].t), 0, 1);
      h = i[s].x + (i[s + 1].x - i[s].x) * v;
      f = i[s].y + (i[s + 1].y - i[s].y) * v;
      p = i[s].z + (i[s + 1].z - i[s].z) * v;
    }
    var d = a.x;
    var g = a.y;
    var y = a.z;
    var c = 1;
    var u = 0;
    var m = l;
    var M = h;
    var b = f;
    d[0] = h;
    g[0] = f;
    y[0] = p;
    for (var w = Math.ceil(r / l) + 3, k = s; k >= 0 && c < w; k--) {
      var A = i[k].x;
      var S = i[k].y;
      var C = A - M;
      var O = S - b;
      var z = Math.sqrt(C * C + O * O);
      if (!(z < 1e-6)) {
        for (; u + z >= m && c < w;) {
          var F = (m - u) / z;
          d[c] = M + C * F;
          g[c] = b + O * F;
          y[c] = i[k].z;
          c++;
          m += l;
        }
        u += z;
        M = A;
        b = S;
      }
    }
    for (c < 2 && (d[1] = d[0] - l, g[1] = g[0], y[1] = y[0], c = 2); c < w;) {
      var P = d[c - 1] - d[c - 2];
      var L = g[c - 1] - g[c - 2];
      d[c] = d[c - 1] + P;
      g[c] = g[c - 1] + L;
      y[c] = y[c - 1];
      c++;
    }
    a.n = c;
    for (var R = 0; R < c; R++) {
      var T = Math.max(0, R - 2);
      var I = Math.min(c - 1, R + 2);
      a.a[R] = Math.atan2(g[T] - g[I], d[T] - d[I]);
    }
    return a;
  }
  function I(t, a, e) {
    var r = x((e / n.appear - .55 * (1 - a)) / .45, 0, 1);
    if (e > t.hit) {
      r *= 1 - x(((e - t.hit) / n.coast - .5 * a) / .5, 0, 1);
    }
    return r;
  }
  function H(t, a, e) {
    return a < 0 && e >= t.flown - 4;
  }
  function U(t, a, e, i, s, l, h, f, p) {
    var v = e.scNow || e.S.sc;
    var x = e.tr;
    if (!(x.n < 2 || i > a.hit + n.coast))
      if (f && f.width) {
        var d = n.slice[h >= 2 ? 0 : 1 === h ? 1 : 2];
        Y(t, a, e, x, f, i, v, d, s, l, p, 1, h >= 2 ? n.bloom : 0, 0);
        if (h >= 2) {
          Y(t, a, e, e.g1, f, i, v, 2 * d, s, l, p, n.ghostA[0], 0, 1);
          Y(t, a, e, e.g2, f, i, v, 2 * d, s, l, p, n.ghostA[1], 0, 2);
        }
      }
      else {
        if ("front" === p) {
          (function (t, a, e, i, o, s) {
            if (!(s <= .01 || a.n < 2)) {
              var l = Math.min(a.n, Math.ceil(e / n.step));
              t.save();
              t.lineCap = "round";
              t.strokeStyle = "#ffd45a";
              t.globalAlpha = .85 * s;
              for (var h = 0; h < l - 1; h++)
                t.lineWidth = 1 + 5 * (1 - h / l), t.beginPath(), t.moveTo(a.x[h] + i, a.y[h] + o), t.lineTo(a.x[h + 1] + i, a.y[h + 1] + o), t.stroke();
              t.fillStyle = "#fff1b8";
              t.beginPath();
              t.arc(a.x[0] + i, a.y[0] + o, 4, 0, r);
              t.fill();
              t.restore();
            }
          })(t, x, (o.pivotU - o.tailU) * v, s, l, I(a, 1, i));
        }
      }
  }
  function Y(t, a, e, i, s, l, h, f, p, v, g, y, c, u) {
    if (!(i.n < 2)) {
      for (var m = e.flip, M = o.tailU, b = o.pivotU, w = n.step, k = Math.ceil((b - M) / f), A = o.body[3], S = o.body[2], C = n.wave * x(l / .5, 0, 1) * (l > a.hit ? x(1 - (l - a.hit) / .3, 0, 1) : 1), O = y * (u ? 1 : n.alpha), z = 0; z <= k; z++) {
        var F = z === k;
        var P = M + z * f;
        var L = P + .5 * f;
        var R = I(a, F ? 1 : (L - M) / (b - M), l) * O;
        if (!(R <= .01)) {
          var T;
          var U;
          var Y;
          var E;
          var N;
          if (F) {
            T = i.x[0];
            U = i.y[0];
            Y = i.z[0];
            E = i.a[0];
            N = 0;
          }
          else {
            var W = (N = (b - L) * h) / w;
            var q = Math.floor(W);
            if (q + 1 >= i.n) {
              continue;
            }
            var G = W - q;
            T = i.x[q] + (i.x[q + 1] - i.x[q]) * G;
            U = i.y[q] + (i.y[q + 1] - i.y[q]) * G;
            Y = i.z[q];
            E = i.a[q];
            var D = C * Math.sin(r * N / n.waveLen - n.waveSpd * l + 1.7 * e.i) * d(N / 34);
            T += -Math.sin(E) * D;
            U += Math.cos(E) * D;
          }
          if ("back" === g === H(e, Y, N)) {
            if (t.save(), t.translate(T + p, U + v), t.rotate(E), t.scale(h, h * m), u) {
              t.globalCompositeOperation = "lighter";
              t.globalAlpha = R;
              if (F) {
                t.drawImage(s, b, 0, S - b, A, 0, -o.axisY, S - b, A);
              }
              else {
                t.drawImage(s, P, 0, f + .3, A, .5 * -f, -o.axisY, f + .3, A);
              }
            }
            else if (t.globalAlpha = R, F ? t.drawImage(s, b, 0, S - b, A, 0, -o.axisY, S - b, A) : t.drawImage(s, P, 0, f + .3, A, .5 * -f, -o.axisY, f + .3, A), c > 0) {
              t.globalCompositeOperation = "lighter";
              var _ = F ? 1 : .4 + .6 * Math.max(0, Math.sin(r * (N / 70 - 1.5 * l) + 2.1 * e.i));
              t.globalAlpha = R * c * (1 + 1.6 * _);
              if (F) {
                t.drawImage(s, b, 0, S - b, A, 0, -o.axisY, S - b, A);
              }
              else {
                t.drawImage(s, P, 0, f + .3, A, .5 * -f, -o.axisY, f + .3, A);
              }
            }
            t.restore();
          }
        }
      }
    }
  }
  function E(t, a, e, i, o, n) {
    var s = a.elapsed - e.t0;
    if (!(s < 0 || s > .5 || n < 1)) {
      var h = s / .5;
      t.save();
      t.translate(Math.round(e.x + i), Math.round(e.y + o));
      t.scale(1, .5);
      t.globalAlpha = .85 * (1 - h);
      t.strokeStyle = l.goldHi;
      t.lineWidth = 2.2 * (1 - h) + .6;
      t.beginPath();
      t.arc(0, 0, 8 + 42 * g(h), 0, r);
      t.stroke();
      t.globalAlpha = .5 * (1 - h);
      t.strokeStyle = l.gold;
      t.beginPath();
      t.arc(0, 0, 4 + 26 * g(h), 0, r);
      t.stroke();
      t.restore();
    }
  }
  function N(t, a, e, r, i, n, s, l) {
    var h = a.elapsed - e.t0;
    if (!(h < 0 || h > .62)) {
      var f = Math.round(e.cx + r);
      var p = Math.round(e.cy + i);
      if (t.save(), t.translate(f, p), s && h < .22) {
        var v = h / .22;
        t.globalCompositeOperation = "lighter";
        m(t, s.white, 34 * (.5 + .7 * v), 34 * (.5 + .7 * v), .62 * (1 - v));
        m(t, s.gold, 56 * (.6 + .6 * v), 38 * (.6 + .6 * v), .42 * (1 - v));
        t.globalCompositeOperation = "source-over";
      }
      if (s && h < .46) {
        var x = h / .46;
        t.save();
        t.translate(0, .5 * e.h - 62);
        t.globalCompositeOperation = "lighter";
        m(t, s.white, y(20, 7, x), 66, .8 * (1 - x));
        t.restore();
      }
      if (l && l.width && n >= 1 && h < .42) {
        var d = h / .42;
        var g = e.sc * (1.5 + .7 * d);
        var c = o.roar;
        t.globalCompositeOperation = "lighter";
        t.globalAlpha = .62 * Math.pow(1 - d, 1.6);
        t.rotate(e.ang);
        t.scale(g, g * e.flip);
        t.drawImage(l, c[0], c[1], c[2], c[3], -o.roarCx, -o.axisY, c[2], c[3]);
        t.globalCompositeOperation = "source-over";
      }
      t.restore();
    }
  }
}(window.PNTT);
