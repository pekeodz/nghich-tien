!function (a) {
  "use strict";
  var e = a.ThanChuongFX = {};
  var t = 2 * Math.PI;
  var r = "assets/sprites/fx/than_chuong.png";
  var o = "assets/sprites/fx/than_chuong_add.png";
  e.ATLAS = r;
  e.ADD = o;
  e.ATLAS_SIZE = [692, 470];
  e.ADD_SIZE = [680, 470];
  var l = { w: 340, h: 470 };
  var i = { x: 176, y: 421 };
  var n = [0, 340];
  var s = { x0: 24, x1: 280, span: .8 };
  var h = { w: 176, h: 120, x0: 340, n: 6 };
  var d = [[42, 255], [99, 380], [153, 408], [205, 389], [256, 345]];
  var f = { x: 176, y: 112, r: 60 };
  e.CELL = l;
  e.ANCHOR = i;
  e.ADD_X = n;
  e.HUE = s;
  e.PUFF = h;
  e.TIPS = d;
  e.SEAL = f;
  var g = e.CFG = { fire: 1.8, peek: .4, cloudIn: .62, windT: .15, slamT: .34, hold: .32, lift: .62, fadeOut: .8, height: 176, scale: .5, tail: 1.2 };
  function p(a, e, t) {
    return a < e ? e : a > t ? t : a;
  }
  function u(a) {
    return (a = p(a, 0, 1)) * a * (3 - 2 * a);
  }
  function c(a) {
    return 1 - (1 - (a = p(a, 0, 1))) * (1 - a) * (1 - a);
  }
  function b(a, e, t) {
    return a + (e - a) * t;
  }
  function v() {
    return a.Quality ? a.Quality.tier : 2;
  }
  function m(a, e) {
    var t = 43758.5453 * Math.sin(12.9898 * (a + 1) + 78.233 * e);
    return t - Math.floor(t);
  }
  function M(a, e, t) {
    a = (a % 1 + 1) % 1;
    var r = t < .5 ? t * (1 + e) : t + e - t * e;
    var o = 2 * t - r;
    function l(a) {
      return (a = (a % 1 + 1) % 1) < 1 / 6 ? o + 6 * (r - o) * a : a < .5 ? r : a < 2 / 3 ? o + (r - o) * (2 / 3 - a) * 6 : o;
    }
    return [Math.round(255 * l(a + 1 / 3)), Math.round(255 * l(a)), Math.round(255 * l(a - 1 / 3))];
  }
  function y(a, e) {
    return "rgba(" + a[0] + "," + a[1] + "," + a[2] + "," + (e < 0 ? 0 : e > 1 ? 1 : e) + ")";
  }
  var x = null;
  function S(a, e) {
    var t = document.createElement("canvas");
    t.width = a;
    t.height = e;
    return t;
  }
  function w(a, e) {
    for (var t = S(e, e), r = t.getContext("2d"), o = e / 2, l = r.createRadialGradient(o, o, 0, o, o, o), i = 0; i <= 14; i++) {
      var n = i / 14;
      var s = 14 === i ? 0 : Math.exp(-Math.pow(n / .4, 2));
      l.addColorStop(n, "rgba(" + a + "," + s.toFixed(4) + ")");
    }
    r.fillStyle = l;
    r.fillRect(0, 0, e, e);
    return t;
  }
  function A() {
    var a;
    var e = S(192, 192);
    var r = e.getContext("2d");
    function o(a, e, t, o) {
      r.save();
      r.rotate(a);
      var l = r.createLinearGradient(0, 0, e, 0);
      l.addColorStop(0, "rgba(255,255,255," + o + ")");
      l.addColorStop(.3, "rgba(255,248,215," + .5 * o + ")");
      l.addColorStop(1, "rgba(255,240,200,0)");
      r.fillStyle = l;
      r.beginPath();
      r.moveTo(0, -t);
      r.lineTo(e, 0);
      r.lineTo(0, t);
      r.closePath();
      r.fill();
      r.restore();
    }
    for (r.translate(96, 96), a = 0; a < 4; a++)
      o(a * Math.PI / 2, 94.08, 3.4, .95);
    for (a = 0; a < 4; a++)
      o(Math.PI / 4 + a * Math.PI / 2, 49.92, 2.2, .55);
    var l = r.createRadialGradient(0, 0, 0, 0, 0, 32.64);
    l.addColorStop(0, "rgba(255,255,255,1)");
    l.addColorStop(.35, "rgba(255,250,225,0.55)");
    l.addColorStop(1, "rgba(255,245,210,0)");
    r.fillStyle = l;
    r.beginPath();
    r.arc(0, 0, 32.64, 0, t);
    r.fill();
    return e;
  }
  function C() {
    var a = S(64, 64);
    var e = a.getContext("2d");
    var t = e.createRadialGradient(32, 32, 0, 32, 32, 32);
    t.addColorStop(0, "rgba(190,170,146,0.85)");
    t.addColorStop(.6, "rgba(150,132,112,0.40)");
    t.addColorStop(1, "rgba(130,114,96,0)");
    e.fillStyle = t;
    e.fillRect(0, 0, 64, 64);
    return a;
  }
  var k = [[120, 240, 140], [255, 108, 76], [236, 196, 96], [255, 242, 190], [96, 176, 255]];
  function P() {
    var a;
    var e;
    var r = S(256, 256);
    var o = r.getContext("2d");
    var l = 128;
    o.translate(l, l);
    o.lineCap = "round";
    var i = o.createRadialGradient(0, 0, 0, 0, 0, l);
    function n(a, e, r) {
      o.beginPath();
      o.arc(0, 0, a, 0, t);
      o.lineWidth = e;
      o.strokeStyle = r;
      o.stroke();
    }
    for (i.addColorStop(0, "rgba(200,170,255,0.30)"), i.addColorStop(.6, "rgba(150,130,255,0.13)"), i.addColorStop(1, "rgba(150,130,255,0)"), o.fillStyle = i, o.beginPath(), o.arc(0, 0, l, 0, t), o.fill(), n(121, 2.6, "rgba(255,230,160,0.96)"), n(115, 1, "rgba(255,244,200,0.55)"), o.strokeStyle = "rgba(255,236,176,0.75)", o.lineWidth = 1, a = 0; a < 60; a++) {
      e = a / 60 * t;
      var s = a % 5 == 0 ? 103 : 109;
      o.beginPath();
      o.moveTo(Math.cos(e) * s, Math.sin(e) * s);
      o.lineTo(113 * Math.cos(e), 113 * Math.sin(e));
      o.stroke();
    }
    n(98, 1.2, "rgba(200,190,255,0.65)");
    n(46, 1.6, "rgba(255,240,196,0.80)");
    var h = [];
    for (a = 0; a < 5; a++)
      e = -Math.PI / 2 + a * t / 5, h.push([98 * Math.cos(e), 98 * Math.sin(e)]);
    for (o.strokeStyle = "rgba(255,246,214,0.88)", o.lineWidth = 1.7, o.beginPath(), a = 0; a < 6; a++) {
      var d = h[2 * a % 5];
      if (0 === a) {
        o.moveTo(d[0], d[1]);
      }
      else {
        o.lineTo(d[0], d[1]);
      }
    }
    for (o.stroke(), o.strokeStyle = "rgba(255,236,170,0.40)", o.lineWidth = 1, o.beginPath(), a = 0; a <= 5; a++) {
      var f = h[a % 5];
      if (0 === a) {
        o.moveTo(f[0], f[1]);
      }
      else {
        o.lineTo(f[0], f[1]);
      }
    }
    for (o.stroke(), a = 0; a < 5; a++) {
      var g = k[a];
      var p = h[a][0];
      var u = h[a][1];
      var c = o.createRadialGradient(p, u, 0, p, u, 15);
      c.addColorStop(0, "rgba(" + g[0] + "," + g[1] + "," + g[2] + ",0.95)");
      c.addColorStop(1, "rgba(" + g[0] + "," + g[1] + "," + g[2] + ",0)");
      o.fillStyle = c;
      o.beginPath();
      o.arc(p, u, 15, 0, t);
      o.fill();
      o.fillStyle = "rgba(255,255,255,0.96)";
      o.beginPath();
      o.arc(p, u, 3.2, 0, t);
      o.fill();
      o.strokeStyle = "rgba(" + g[0] + "," + g[1] + "," + g[2] + ",0.95)";
      o.lineWidth = 2;
      o.beginPath();
      o.arc(p, u, 7, 0, t);
      o.stroke();
    }
    o.fillStyle = "rgba(255,246,214,0.95)";
    o.beginPath();
    o.arc(0, 0, 8, 0, t);
    o.fill();
    o.strokeStyle = "rgba(255,230,160,0.9)";
    o.lineWidth = 1.6;
    o.beginPath();
    o.arc(0, 0, 15, 0, t);
    o.stroke();
    return r;
  }
  function O(a) {
    for (var e = S(32, 128), t = e.getContext("2d"), r = t.createImageData(32, 128), o = r.data, l = 0; l < 128; l++)
      for (var i = Math.pow(l / 127, .6), n = 0; n < 32; n++) {
        var s = (n - 15.5) / 15.5;
        var h = 4 * (32 * l + n);
        var d = Math.exp(-s * s * 3.4);
        var f = Math.exp(-s * s * 30);
        o[h] = Math.round(b(a[0], 255, .85 * f));
        o[h + 1] = Math.round(b(a[1], 255, .85 * f));
        o[h + 2] = Math.round(b(a[2], 255, .85 * f));
        o[h + 3] = Math.round(255 * p(.72 * d + .55 * f, 0, 1) * i);
      }
    t.putImageData(r, 0, 0);
    return e;
  }
  function I() {
    if (x) {
      return x;
    }
    if ("undefined" == typeof document) {
      return null;
    }
    var a;
    var e;
    var t;
    var r;
    x = { glow: [w("255,120,60", 128), w("255,214,90", 128), w("120,255,160", 128), w("90,220,255", 128), w("150,130,255", 128), w("255,110,220", 128)], glowWhite: w("255,255,255", 128), beam: [O([255, 120, 60]), O([255, 214, 90]), O([120, 255, 160]), O([90, 220, 255]), O([150, 130, 255]), O([255, 110, 220])], flare: A(), shade: (a = 128, e = S(a, a), t = e.getContext("2d"), r = t.createRadialGradient(64, 64, 0, 64, 64, 64), r.addColorStop(0, "rgba(14,6,34,0.95)"), r.addColorStop(.55, "rgba(18,8,40,0.55)"), r.addColorStop(1, "rgba(18,8,40,0)"), t.fillStyle = r, t.fillRect(0, 0, a, a), e), dust: C(), seal: P(), tint: null };
    var o = S(l.w, l.h);
    x.tint = { canvas: o, ctx: o.getContext("2d") };
    return x;
  }
  function R(a, e, t) {
    var r;
    var o;
    var l = a.k;
    var i = function (a) {
      var e = a.fire;
      var t = Math.min(1, e / 1.8);
      var r = g.slamT * t;
      return { tPeek: g.peek * e, tWind: e - r - g.windT * t, tSlam: e - r, f: e };
    }(a);
    var n = i.f;
    var s = t || {};
    var h = (g.height + 78) * l;
    var d = .46 * g.height * l;
    var f = d + 16 * l;
    var v = -6 * l;
    var m = 0;
    var M = e - n;
    if (e < i.tPeek) {
      r = h;
    }
    else {
      if (e < i.tWind) {
        r = b(h, d, u((e - i.tPeek) / Math.max(.01, i.tWind - i.tPeek)));
      }
      else {
        if (e < i.tSlam) {
          r = b(d, f, c((e - i.tWind) / Math.max(.01, i.tSlam - i.tWind)));
        }
        else {
          if (e < n) {
            r = b(f, v, (o = p(o = m = (e - i.tSlam) / Math.max(.01, n - i.tSlam), 0, 1), Math.pow(o, 3)));
          }
          else {
            m = 1;
            r = v + 5 * l * Math.exp(12 * -M) * Math.abs(Math.sin(34 * M));
            if (M > g.hold) {
              r += 46 * l * u((M - g.hold) / g.lift);
            }
          }
        }
      }
    }
    var y = p((e - i.tPeek) / Math.max(.01, n - i.tPeek), 0, 1);
    var x = u((e - i.tPeek + .12) / .3);
    if (M > g.hold) {
      x *= 1 - u((M - g.hold) / (.92 * g.lift));
    }
    s.d = r;
    s.a = x;
    s.rot = -.1 * Math.pow(1 - y, 2) + (e >= i.tWind && e < i.tSlam ? .03 * Math.sin(u((e - i.tWind) / Math.max(.01, i.tSlam - i.tWind)) * Math.PI) : 0);
    s.sc = b(.82, 1, c(y)) + .05 * m * m * (e < n ? 1 : 0) + (M > g.hold ? .06 * u((M - g.hold) / g.lift) : 0);
    var S = e >= n ? Math.exp(14 * -M) : 0;
    s.sx = 1 + .05 * S;
    s.sy = 1 - .065 * S;
    s.slamU = m;
    return s;
  }
  e.prime = function () {
    if (!e._primed) {
      if (e._primed = !0, a.Assets && a.Assets.loadImage) {
        var t = a.Assets.PRIO && a.Assets.PRIO.NORMAL;
        a.Assets.loadImage(r, t);
        a.Assets.loadImage(o, t);
      }
      if (v() > 0) {
        I();
      }
    }
  };
  e.spawn = function (r, o, l) {
    l = l || {};
    e.prime();
    var i;
    var n = l.hitDelay > 0 ? l.hitDelay : g.fire;
    var s = o && isFinite(o.x) && isFinite(o.y) ? o : null;
    var d = s ? s.x : +l.x || 0;
    var f = s ? s.y : +l.y || 0;
    var u = n + g.hold + g.lift + g.fadeOut + .1;
    var c = { type: "thanchuong", q: !0, owner: r || null, target: s, ghost: !!l.ghost, x: d, y: f, gx: d, gy: f, bx: d, by: f, k: (i = a.Renderer, i && i.h > 0 ? p(i.h / 250, .7, 1) : 1), R: l.radius > 0 ? l.radius : 56, fire: n, elapsed: 0, fired: !1, seed: 4294967296 * Math.random() >>> 0, puffs: null, env: null, pose: { d: 0, a: 0, rot: 0, sc: 1, sx: 1, sy: 1, slamU: 0 }, life: u, max: u };
    (function (a) {
      var e;
      var r;
      var o = [];
      function l(e) {
        return m(a.seed % 977 + 1.7 * e, .37 * e);
      }
      for (e = 0; e < 15; e++) {
        var i = e >= 9;
        var n = i ? 92 : 205;
        r = 2 * l(e + 1) - 1;
        var s = Math.sign(r) * Math.pow(Math.abs(r), .85) * n;
        var d = i ? 26 * l(e + 31) - 10 : 50 * l(e + 31) - 26;
        o.push({ i: l(e + 61) * h.n | 0, front: i, ox: s, oy: d, s: i ? .62 + .4 * l(e + 91) : .95 + .62 * l(e + 91), a: i ? .34 + .24 * l(e + 121) : .52 + .3 * l(e + 121), flip: l(e + 151) < .5, ph: l(e + 181) * t, dr: 12 * (l(e + 211) - .5), from: (s >= 0 ? 1 : -1) * (60 + 110 * l(e + 241)) });
      }
      a.puffs = o;
    })(c);
    a.VFX.list.push(c);
    return c;
  };
  e.update = function (e, t) {
    e.elapsed += t;
    var r = e.elapsed;
    var o = e.target;
    if (r < e.fire) {
      if (o && !o.dead && isFinite(o.x) && isFinite(o.y)) {
        e.gx = o.x;
        e.gy = o.y;
      }
      var l = 1 - Math.exp(-14 * t);
      e.bx += (e.gx - e.bx) * l;
      e.by += (e.gy - e.by) * l;
      e.x = e.bx;
      e.y = e.by;
    }
    if (!e.fired && r >= e.fire) {
      e.fired = !0;
      (function (e) {
        e.bx = e.gx;
        e.by = e.gy;
        e.x = e.bx;
        e.y = e.by;
        var t = a.Camera;
        if (t) {
          if (e.ghost) {
            if (t.shakeAt) {
              t.shakeAt(e.bx, e.by, 8, .5);
            }
          }
          else {
            if (t.shake) {
              t.shake(11, .62);
            }
          }
        }
      })(e);
    }
  };
  e.poseAt = function (a, e) {
    return R(a, e, {});
  };
  e.draw = function (e, h, b, x, S) {
    if ("front" !== S) {
      var w = v();
      var A = function (a) {
        var e = a.elapsed;
        var t = a.fire;
        var r = a.env || (a.env = {});
        if (r.t === e) {
          return r;
        }
        r.t = e;
        var o = e - t;
        r.ti = o;
        var l = g.cloudIn * t;
        r.gather = c(e / Math.max(.1, l));
        r.cloudA = u(e / Math.max(.1, l)) * (1 - u((o - (g.hold + .3 * g.lift)) / (g.lift + .7 * g.fadeOut)));
        r.dimA = .26 * u(e / (.75 * t)) * (1 - u((o - g.hold) / (g.lift + .6 * g.fadeOut)));
        r.charge = u((e - g.peek * t) / Math.max(.2, t * (1 - g.peek)));
        r.shadowA = u((e - .15) / Math.max(.3, t - .4)) * (o < 0 ? 1 : 1 - u((o - .35) / .9));
        r.sealOpen = c(e / .5);
        r.sealA = (o < 0 ? .45 + .4 * r.charge : .85) * r.sealOpen * (o < 0 ? 1 : 1 - u((o - .15) / (g.fadeOut + .7)));
        r.pulse = o < 0 ? 0 : Math.pow(1 - p(o / .7, 0, 1), 2);
        r.flashA = o < 0 ? 0 : .5 * Math.pow(1 - p(o / .26, 0, 1), 2);
        r.markA = o < 0 ? 0 : 1 - u((o - .35) / (g.fadeOut + .9));
        R(a, e, a.pose);
        return r;
      }(h);
      var C = w > 0 ? I() : null;
      if (!(w > 0) || C) {
        var k = -(+b || 0);
        var P = -(+x || 0);
        if ("back" === S) {
          (function (a, e, r, o, l, i, n) {
            var s = e.elapsed;
            var h = r.ti;
            var d = e.k;
            var f = e.bx + o;
            var b = e.by + l;
            var v = e.R;
            if (a.save(), a.imageSmoothingEnabled = !0, r.shadowA > .004) {
              var x = 2.5 * v;
              var S = .52 * x;
              a.globalCompositeOperation = "source-over";
              if (0 !== i && n) {
                a.globalAlpha = p(.62 * r.shadowA * (.7 + .5 * r.charge), 0, 1);
                a.drawImage(n.shade, f - x / 2, b - S / 2, x, S);
              }
              else {
                a.fillStyle = "rgba(16,8,38," + .34 * r.shadowA + ")";
                a.beginPath();
                a.ellipse(f, b, .46 * x, .46 * S, 0, 0, t);
                a.fill();
              }
            }
            if (0 === i || !n) {
              a.globalAlpha = 1;
              a.globalCompositeOperation = "lighter";
              a.strokeStyle = "rgba(255,236,170," + p(r.sealA, 0, 1) + ")";
              a.lineWidth = 1.2;
              a.beginPath();
              a.ellipse(f, b, v * r.sealOpen, v * r.sealOpen * .52, 0, 0, t);
              a.stroke();
              return void a.restore();
            }
            a.globalCompositeOperation = "lighter";
            var w = (v + 5) * r.sealOpen / 121;
            var A = h < 0 ? 0 : Math.pow(1 - p(h / .45, 0, 1), 2);
            var C = p(r.sealA + .7 * A, 0, 1.6);
            if (C > .01) {
              a.save();
              a.translate(f, b);
              a.scale(1, .52);
              a.rotate(.3 * s);
              a.globalAlpha = p(C, 0, 1);
              a.drawImage(n.seal, -128 * w, -128 * w, 256 * w, 256 * w);
              if (C > 1) {
                a.globalAlpha = p(C - 1, 0, 1);
                a.drawImage(n.seal, -128 * w, -128 * w, 256 * w, 256 * w);
              }
              a.restore();
            }
            if (h >= 0) {
              (function (a, e, r, o, l, i) {
                var n;
                var s = r.ti;
                for (a.lineCap = "round", n = 0; n < 3; n++) {
                  var h = p((s - .09 * n) / (.62 + .1 * n), 0, 1);
                  if (!(h <= 0 || h >= 1)) {
                    var d = e.R * (.35 + (1.15 + .22 * n) * c(h));
                    var f = Math.pow(1 - h, 1.7) * (0 === n ? 1 : .8);
                    a.strokeStyle = y(T[n], f);
                    a.lineWidth = (4.2 - .8 * n) * (1 - .6 * h) * i;
                    a.beginPath();
                    a.ellipse(o, l, d, .52 * d, 0, 0, t);
                    a.stroke();
                  }
                }
              })(a, e, r, f, b, d);
              (function (a, e, r, o, l, i, n) {
                var s;
                var h;
                var d = r.ti;
                var f = n >= 2 ? 11 : 6;
                var p = u(d / .18);
                var c = 1 - u((d - .5) / (g.fadeOut + 1));
                if (!(c <= .01 || p <= 0)) {
                  for (a.lineJoin = "round", s = 0; s < f; s++) {
                    var b = s / f * t + .5 * (m(s, 1) - .5);
                    var v = (.55 * e.R + m(s, 2) * e.R * .95) * p;
                    var x = o;
                    var S = l;
                    for (a.beginPath(), a.moveTo(x, S), h = 1; h <= 4; h++) {
                      var w = v * h / 4;
                      var A = 11 * (m(7 * s + h, 3) - .5);
                      x = o + Math.cos(b) * w - Math.sin(b) * A;
                      S = l + .5 * (Math.sin(b) * w + Math.cos(b) * A);
                      a.lineTo(x, S);
                    }
                    a.globalCompositeOperation = "source-over";
                    a.strokeStyle = "rgba(24,12,40," + .6 * c + ")";
                    a.lineWidth = 3.2;
                    a.stroke();
                    a.globalCompositeOperation = "lighter";
                    a.strokeStyle = y(M(m(s, 5) + .3 * W(e), 1, .62), .9 * c * (1 - u(d / 1.7)));
                    a.lineWidth = 1.3;
                    a.stroke();
                  }
                  a.globalCompositeOperation = "source-over";
                }
              })(a, e, r, f, b, 0, i);
            }
            a.restore();
          })(e, h, A, k, P, w, C);
        }
        else {
          (function (e, h, b, v, x, S, w) {
            h.elapsed;
            var A;
            var C = h.k;
            var k = b.ti;
            var P = a.Renderer;
            var O = P ? P.w : 640;
            var I = P ? P.h : 360;
            var T = (A = a.Assets) && A.get ? A.get(r) : null;
            var W = function () {
              var e = a.Assets;
              return e && e.get ? e.get(o) : null;
            }();
            var L = h.bx + v;
            var E = h.by + x;
            var _ = a.Camera;
            var U = _ && isFinite(_.y) ? 26 * C : -1e9;
            var N = Math.max(E - g.height * C, U);
            if (e.save(), e.imageSmoothingEnabled = !0, b.dimA > .004) {
              var X = S >= 2 ? 1 : 1 === S ? .7 : .4;
              if (S >= 1) {
                var q = e.createLinearGradient(0, 0, 0, I);
                q.addColorStop(0, "rgba(10,6,34," + b.dimA * X + ")");
                q.addColorStop(1, "rgba(12,8,38," + .45 * b.dimA * X + ")");
                e.fillStyle = q;
              }
              else {
                e.fillStyle = "rgba(12,8,38," + b.dimA * X * .6 + ")";
              }
              e.fillRect(0, 0, O, I);
            }
            if (F(e, h, b, T, L, N, C, S, w, !1), S >= 1 && w && function (a, e, t, r, o, l, i, n) {
              var s;
              var h = e.fire;
              var d = e.elapsed;
              var f = n >= 2 ? 4 : 2;
              for (a.globalCompositeOperation = "lighter", a.lineCap = "round", a.lineJoin = "round", s = 0; s < f; s++) {
                var g = (d - ((.3 + .17 * s) * h + .05 * m(s, 9))) / .16;
                if (!(g < 0 || g > 1)) {
                  var p;
                  var u = (1 - g) * (g < .3 ? g / .3 : 1);
                  var c = r + 220 * (m(s, 11) - .5) * i;
                  var b = o + 6 * i;
                  var v = (46 + 46 * m(s, 12)) * i;
                  var x = [[c, b]];
                  for (p = 1; p <= 7; p++)
                    c += 26 * (m(13 * s + p, 14) - .5) * i, b += v / 7, x.push([c, b]);
                  var S = M(.55 + .25 * m(s, 15), 1, .78);
                  for (a.strokeStyle = y(S, .45 * u), a.lineWidth = 4.5 * i, a.beginPath(), a.moveTo(x[0][0], x[0][1]), p = 1; p < x.length; p++)
                    a.lineTo(x[p][0], x[p][1]);
                  a.stroke();
                  a.strokeStyle = "rgba(255,255,255," + .95 * u + ")";
                  a.lineWidth = 1.4 * i;
                  a.stroke();
                }
              }
              a.globalCompositeOperation = "source-over";
              a.globalAlpha = 1;
            }(e, h, 0, L, N, 0, C, S), function (a, e, t, r, o, i, h, d, f, g) {
              var u = e.pose;
              var c = e.elapsed;
              var b = t.ti;
              if (!(u.a <= .004)) {
                var v = h - u.d;
                var m = f >= 1 && g && o ? function (a, e, t) {
                  var r;
                  var o = e.tint.ctx;
                  var i = .3 * a.elapsed + a.seed % 997 / 997;
                  o.globalCompositeOperation = "source-over";
                  o.globalAlpha = 1;
                  var h = o.createLinearGradient(s.x0, 0, s.x1, 0);
                  for (r = 0; r <= 8; r++)
                    h.addColorStop(r / 8, y(M(i + s.span * r / 8, 1, .6), 1));
                  o.fillStyle = h;
                  o.fillRect(0, 0, l.w, l.h);
                  o.globalCompositeOperation = "destination-in";
                  o.drawImage(t, n[0], 0, l.w, l.h, 0, 0, l.w, l.h);
                  o.globalCompositeOperation = "source-over";
                  return e.tint.canvas;
                }(e, g, o) : null;
                var x = (.62 + .38 * t.charge + .55 * t.pulse) * u.a;
                var S = (.45 + .4 * t.charge + .5 * t.pulse) * x;
                if (f >= 2 && m && u.slamU > 0 && u.slamU < 1 && b < 0) {
                  var w;
                  var A = {};
                  for (w = 1; w <= 3; w++)
                    R(e, c - .032 * w, A), D(a, null, m, null, i, h - A.d, d, A, 0, .34 / w * u.a, 0);
                }
                if (D(a, r, m, o, i, v, d, u, .94 * u.a, x, S), f >= 1 && g) {
                  var C = g.glow[Math.floor(6 * (.3 * c + e.seed % 997 / 997)) % 6];
                  var k = 260 * d * u.sc;
                  var P = 300 * d * u.sc;
                  a.save();
                  a.globalCompositeOperation = "lighter";
                  a.globalAlpha = p((.1 + .18 * t.charge + .3 * t.pulse) * u.a, 0, 1);
                  a.drawImage(C, i - k / 2, v - .6 * P, k, P);
                  a.restore();
                }
              }
            }(e, h, b, T, W, L, E, C, S, w), F(e, h, b, T, L, N, C, S, w, !0), S >= 1 && w ? (function (a, e, r, o, l, n, s) {
              var h;
              var d = e.elapsed;
              var p = e.fire;
              var u = e.pose;
              var c = g.peek * p;
              if (!(d < c || d > p + .25)) {
                var b = s >= 2 ? 26 : 12;
                var v = l - u.d;
                var x = g.scale * n * u.sc;
                var S = o + (f.x - i.x) * x;
                var w = v + (f.y - i.y) * x;
                for (a.save(), a.globalCompositeOperation = "lighter", h = 0; h < b; h++) {
                  var A = .55 + .4 * m(h, 31);
                  var C = c + m(h, 32) * (p - c);
                  var k = (d - C) % (A + .3) / A;
                  if (!(d < C || k < 0 || k > 1)) {
                    var P = m(h, 33) * t + 3.2 * k;
                    var O = (90 + 70 * m(h, 34)) * n * Math.pow(1 - k, 1.6);
                    var I = S + Math.cos(P) * O;
                    var R = w + Math.sin(P) * O * .75;
                    var T = Math.sin(Math.PI * Math.min(1, 1.1 * k)) * r.charge * u.a;
                    a.fillStyle = y(M(m(h, 35), 1, .7), T);
                    var W = (m(h, 36) < .25 ? 2.2 : 1.4) * n;
                    a.fillRect(I - W / 2, R - W / 2, W, W);
                    a.fillStyle = y([255, 255, 255], .7 * T);
                    a.fillRect(I - .5, R - .5, 1, 1);
                  }
                }
                a.restore();
              }
            }(e, h, b, L, E, C, S), k >= 0 && function (a, e, r, o, l, n, s, h) {
              var f;
              var b = r.ti;
              var v = o;
              var M = l;
              var x = 1 === s;
              var S = .3 * e.elapsed % 1;
              if (a.save(), a.globalCompositeOperation = "lighter", b < .45) {
                var w = 1 - u(b / .45);
                var A = (96 + 150 * u(b / .45)) * n;
                a.globalAlpha = w;
                a.save();
                a.translate(v, M - 10 * n);
                a.rotate(.8 * b);
                a.drawImage(h.flare, -A / 2, -A / 2, A, A);
                a.restore();
                var C = (150 + 120 * b) * n;
                a.globalAlpha = .9 * w;
                a.drawImage(h.glowWhite, v - C / 2, M - .28 * C, C, .5 * C);
              }
              if (b < .85) {
                var k = g.scale * n * e.pose.sc;
                for (f = 0; f < 5; f++) {
                  var P = v + (d[f][0] - i.x) * k;
                  var O = M + (d[f][1] - i.y) * k;
                  var I = b / .85;
                  var R = u(b / .14);
                  var T = (160 + 70 * m(f, 51)) * n * R;
                  var W = (30 * (1 - .7 * I) + 7) * n;
                  var F = Math.pow(1 - I, 1.1);
                  var D = (Math.floor(6 * S) + f + 1) % 6;
                  a.globalAlpha = p(F, 0, 1);
                  a.drawImage(h.beam[D], P - W / 2, O - T, W, T);
                  var L = (34 + 40 * (1 - I)) * n;
                  a.globalAlpha = p(.9 * F, 0, 1);
                  a.drawImage(h.glow[D], P - L / 2, O - .4 * L, L, .8 * L);
                }
              }
              var E = x ? 22 : 46;
              for (a.lineCap = "round", f = 0; f < E; f++) {
                var _ = .55 + .6 * m(f, 61);
                var U = b - .06 * m(f, 62);
                if (!(U < 0 || U > _)) {
                  var N = (150 * m(f, 63) - 165) * Math.PI / 180;
                  var X = 110 + 220 * m(f, 64);
                  var q = v + (m(f, 66) - .5) * e.R * 1.2 * n + Math.cos(N) * X * U;
                  var H = M - 6 * n + Math.sin(N) * X * U * .9 + 380 * U * U * .5;
                  var J = 1 - U / _ * (U / _);
                  var Q = Math.cos(N) * X;
                  var Z = Math.sin(N) * X * .9 + 380 * U;
                  var V = Math.sqrt(Q * Q + Z * Z) || 1;
                  var j = Math.min(8, .035 * V) * n;
                  a.strokeStyle = y(G(f, S), J);
                  a.lineWidth = (1 + 1.2 * m(f, 65)) * n;
                  a.beginPath();
                  a.moveTo(q - Q / V * j, H - Z / V * j);
                  a.lineTo(q, H);
                  a.stroke();
                }
              }
              if (a.globalCompositeOperation = "source-over", !x) {
                for (f = 0; f < 16; f++) {
                  var z = .7 + .5 * m(f, 71);
                  var B = b - .04 * m(f, 72);
                  if (!(B < 0 || B > z)) {
                    var K = (140 * m(f, 73) - 160) * Math.PI / 180;
                    var Y = 70 + 160 * m(f, 74);
                    var $ = v + (m(f, 75) - .5) * e.R * 1.4 * n + Math.cos(K) * Y * B;
                    var aa = M + Math.sin(K) * Y * B * .9 + 520 * B * B * .5;
                    if (aa > M + 4 * n) {
                      aa = M + 4 * n;
                    }
                    var ea = (1.6 + 2.2 * m(f, 76)) * n;
                    a.globalAlpha = 1 - u((B - .6 * z) / (.4 * z));
                    a.fillStyle = "#4b3a34";
                    a.fillRect($ - ea / 2, aa - ea / 2, ea, ea);
                    a.fillStyle = "#a88f7c";
                    a.fillRect($ - ea / 2, aa - ea / 2, .5 * ea, .5 * ea);
                  }
                }
              }
              var ta = x ? 6 : 11;
              for (f = 0; f < ta; f++) {
                var ra = b / .9;
                if (ra < 0 || ra > 1) {
                  break;
                }
                var oa = f / ta * t + .5 * m(f, 81);
                var la = e.R * (.3 + .95 * c(ra)) * n;
                var ia = (22 + 22 * m(f, 82)) * n * (.5 + .9 * ra);
                a.globalAlpha = .55 * Math.pow(1 - ra, 1.4);
                a.drawImage(h.dust, v + Math.cos(oa) * la - ia / 2, M + Math.sin(oa) * la * .5 - .4 * ia - 4 * n, ia, ia);
              }
              a.restore();
            }(e, h, b, L, E, C, S, w)) : k >= 0 && k < .3 && 0 === S && (e.globalCompositeOperation = "source-over", e.globalAlpha = 1, e.fillStyle = "rgba(255,250,236," + .22 * (1 - k / .3) + ")", e.fillRect(0, 0, O, I)), S >= 1 && b.flashA > .004) {
              var H = h.ghost && a.Camera && a.Camera.nearness ? a.Camera.nearness(h.bx, h.by) : 1;
              var J = b.flashA * H * (S >= 2 ? 1 : .6);
              if (J > .004) {
                e.globalCompositeOperation = "source-over";
                e.globalAlpha = 1;
                e.fillStyle = "rgba(255,251,236," + J + ")";
                e.fillRect(0, 0, O, I);
              }
            }
            e.restore();
          })(e, h, A, k, P, w, C);
        }
      }
    }
  };
  var T = [[255, 246, 210], [120, 220, 255], [255, 130, 230]];
  function W(a) {
    return .3 * a.elapsed % 1;
  }
  function F(a, e, r, o, l, i, n, s, d, f) {
    if (!(r.cloudA <= .004)) {
      var c;
      var b = e.elapsed;
      var v = e.puffs;
      var m = r.ti;
      var M = 0 === s;
      if (a.globalCompositeOperation = "source-over", o && !M) {
        var y = s >= 2 ? v.length : Math.ceil(.7 * v.length);
        var x = m > 0 ? 46 * u((m - g.hold) / (g.lift + g.fadeOut)) * n : 0;
        for (c = 0; c < y; c++) {
          var S = v[c];
          if (S.front === f) {
            var w = 1 - r.gather;
            var A = l + S.ox * n + S.from * w * n + Math.sin(.6 * b + S.ph) * S.dr * n + .4 * S.dr * b * n;
            var C = i + S.oy * n - x + 2.5 * Math.sin(.9 * b + S.ph) * n;
            var k = S.s * n * (.85 + .15 * r.gather);
            var P = h.w * k;
            var O = h.h * k;
            var I = S.a * r.cloudA * (.35 + .65 * r.gather);
            a.globalAlpha = p(I, 0, 1);
            var R = h.x0 + (1 & S.i) * h.w;
            var T = (S.i >> 1) * h.h;
            if (S.flip) {
              a.save();
              a.translate(A, C);
              a.scale(-1, 1);
              a.drawImage(o, R, T, h.w, h.h, -P / 2, -O / 2, P, O);
              a.restore();
            }
            else {
              a.drawImage(o, R, T, h.w, h.h, A - P / 2, C - O / 2, P, O);
            }
          }
        }
        if (s >= 1 && d && !f) {
          a.globalCompositeOperation = "lighter";
          var W = .12 + .38 * r.charge + .5 * r.pulse;
          var F = .3 * b + e.seed % 997 / 997;
          var D = s >= 2 ? 4 : 2;
          for (c = 0; c < D; c++) {
            var G = d.glow[(Math.floor(6 * F) + 2 * c) % 6];
            var L = (210 + 70 * Math.sin(2 * b + c)) * n;
            var E = .5 * L;
            var _ = l + 70 * (c - (D - 1) / 2) * n;
            a.globalAlpha = p(W * r.cloudA * .5, 0, 1);
            a.drawImage(G, _ - L / 2, i + 18 * n - x - E / 2, L, E);
          }
        }
        a.globalCompositeOperation = "source-over";
        a.globalAlpha = 1;
      }
      else {
        if (!(f)) {
          a.fillStyle = "rgba(150,160,205," + .55 * r.cloudA + ")";
          a.beginPath();
          a.ellipse(l, i, 190 * n, 36 * n, 0, 0, t);
          a.fill();
        }
      }
    }
  }
  function D(a, e, t, r, o, s, h, d, f, u, c) {
    var b = g.scale * h * d.sc;
    a.save();
    a.translate(o, s);
    a.rotate(d.rot);
    a.scale(b * d.sx, b * d.sy);
    if (e && f > .004) {
      a.globalCompositeOperation = "source-over";
      a.globalAlpha = p(f, 0, 1);
      a.drawImage(e, 0, 0, l.w, l.h, -i.x, -i.y, l.w, l.h);
    }
    a.globalCompositeOperation = "lighter";
    if (t && u > .004) {
      a.globalAlpha = p(u, 0, 1);
      a.drawImage(t, 0, 0, l.w, l.h, -i.x, -i.y, l.w, l.h);
      if (u > 1) {
        a.globalAlpha = p(u - 1, 0, 1);
        a.drawImage(t, 0, 0, l.w, l.h, -i.x, -i.y, l.w, l.h);
      }
    }
    if (r && c > .004) {
      a.globalAlpha = p(c, 0, 1);
      a.drawImage(r, n[1], 0, l.w, l.h, -i.x, -i.y, l.w, l.h);
    }
    a.restore();
  }
  function G(a, e) {
    return M(m(a, 41) + e, 1, .64);
  }
}(window.PNTT);
