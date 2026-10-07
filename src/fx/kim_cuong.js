!function (a) {
  "use strict";
  var o = a.VFX;
  if (o) {
    var t = a.KimCuongFX = {};
    var l = 2 * Math.PI;
    t.ID = "kim_cuong_hoa_than";
    var r = t.COLORS = { core: "#fff6c8", mid: "#ffc83a", edge: "#7a4a08", glow: "#ffe27a", hot: "#fffbe0", deep: "#b8761a" };
    var e = { he: "kim", mid: r.mid, glow: r.glow, core: r.core };
    t.accentOf = c;
    t.variantOf = d;
    var i = { age: 0, flare: 0, ending: 0 };
    t.prime = function (o) {
      if (o && a.Player && a.Player.sheetHinh) {
        a.Player.sheetHinh(o, t.ID);
      }
    };
    t.spawnHoaThan = function (e, i) {
      i = i || {};
      var n = e || { x: 0, y: 0 };
      if (t.prime(n), isFinite(n.x) && isFinite(n.y)) {
        var h = f();
        var g = n.x;
        var s = n.y;
        var d = i.colors || {};
        var u = c(n);
        var p = { core: d.core || r.core, mid: d.mid || r.mid, edge: d.edge || r.edge, glow: d.glow || r.glow };
        o.spawnRing(g, s, p.edge, 50, .65);
        o.spawnRing(g, s, p.glow, 34, .46);
        if (h >= 1) {
          o.spawnRing(g, s, u.glow, 66, .82);
          o.spawnRing(g, s - 24, p.core, 20, .28);
        }
        var m;
        var v = h >= 2 ? i.ghost ? 10 : 24 : h >= 1 ? 8 : 0;
        for (m = 0; m < v; m++)
          o.list.push({ type: "ember", x: g + 22 * (Math.random() - .5), y: s - 4 - 30 * Math.random(), vx: 20 * (Math.random() - .5), vy: -(30 + 54 * Math.random()), mid: m % 3 ? p.mid : u.mid, core: m % 2 ? r.hot : u.core, life: .55 + .45 * Math.random(), max: 1 });
        if (h >= 2 && !i.ghost) {
          for (m = 0; m < 16; m++) {
            var M = m / 16 * l + .3 * Math.random();
            var b = 46 + 44 * Math.random();
            o.list.push({ type: "spark", x: g, y: s - 24, vx: Math.cos(M) * b, vy: Math.sin(M) * b * .55 - 26, color: m % 3 == 0 ? u.glow : m % 3 == 1 ? r.hot : p.mid, life: .4 + .2 * Math.random(), max: .6 });
          }
        }
        if (h >= 1 && a.Camera && a.Camera.shakeAt) {
          a.Camera.shakeAt(g, s, i.ghost ? 1.6 : 2.4, .3);
        }
      }
    };
    t.spawnVoGiap = function (t) {
      if (t && isFinite(t.x) && isFinite(t.y)) {
        var e = f();
        var i = c(t);
        if (o.spawnRing(t.x, t.y - 26, r.glow, 30, .34), a.Audio && a.Audio.play && a.Audio.play("kim_cuong_vo"), !(e < 1)) {
          for (var n = e >= 2 ? 14 : 6, h = 0; h < n; h++) {
            var g = h / n * l + .4 * Math.random();
            var s = 38 + 46 * Math.random();
            o.list.push({ type: "spark", x: t.x, y: t.y - 26, vx: Math.cos(g) * s, vy: Math.sin(g) * s * .6 - 20, color: h % 3 == 0 ? i.glow : h % 3 == 1 ? r.hot : r.mid, life: .32 + .18 * Math.random(), max: .5 });
          }
        }
      }
    };
    var n = [];
    t.eyePoints = function (o, t, l, r) {
      if (n.length = 0, 3 == (l |= 0)) {
        return n;
      }
      var e = a.CharArt;
      var i = a.CONFIG || {};
      var h = e && e.poseOf ? e.poseOf(0 | r) : null;
      if (h && (h.sit || "hurt" === h.act || "down" === h.act)) {
        return n;
      }
      var f = h ? 0 | h.bob : 0;
      var g = t - (i.CHAR_ANCHOR_Y || 62) + (e && e.RIG && e.RIG.HEAD_Y || 6) + f;
      var s = o - (i.CHAR_ANCHOR_X || 16);
      var c = g + 9.5;
      if (0 === l) {
        n.push(s + 12.5, c, s + 18.5, c);
      }
      else {
        if (2 === l) {
          n.push(s + 20, c);
        }
        else {
          n.push(s + 12, c);
        }
      }
      return n;
    };
    var h = [7, 0, 5, 2, 6, 1, 4, 3];
    t.aura = function (o, e, n, b, y, k, w) {
      var A = f();
      if (!(A < 1 && "back" !== k)) {
        var C = function (o) {
          var l = o && o.hinhTuoi > 0 ? o.hinhTuoi : 0;
          var r = a.Skills && a.Skills.DEFS && a.Skills.DEFS[t.ID];
          var e = r && r.bienHinh ? r.bienHinh.time : 14;
          var n = o && o.hinhT > 0 ? o.hinhT : Math.max(0, e - l);
          i.age = l;
          i.flare = l < .9 ? 1 - l / .9 : 0;
          i.ending = n < 3 ? 1 - n / 3 : 0;
          return i;
        }(b);
        var S = c(b);
        var x = d(b);
        var O = (C.ending > 0 ? .55 + .45 * Math.abs(Math.sin(y * (6 + 10 * C.ending))) : 1) * (1 - .3 * C.ending);
        var P = !!(b && b.flyRise > .3);
        var R = !(!b || 3 !== b.dir);
        if (o.save(), "back" === k) {
          if (A >= 1) {
            var _ = .5 + .5 * Math.sin(2.6 * y);
            o.globalCompositeOperation = "lighter";
            o.fillStyle = r.mid;
            o.globalAlpha = (.05 + .03 * _ + .1 * C.flare) * O;
            p(o, e, n - 28, 22 + 3 * _ + 8 * C.flare, 36 + 3 * _);
            o.fill();
            o.globalAlpha = (.07 + .05 * _ + .2 * C.flare) * O;
            p(o, e, n - 28, 16 + 2 * _ + 6 * C.flare, 30 + 3 * _);
            o.fill();
            o.globalAlpha = (.1 + .1 * C.flare) * O;
            o.fillStyle = S.glow;
            p(o, e, n - 29, 9 + 2 * _, 22);
            o.fill();
            if (C.age < 1) {
              (function (a, o, t, l) {
                var r = 1 - l;
                if (!(r <= 0)) {
                  var e = a.createLinearGradient(0, t, 0, t - 128);
                  e.addColorStop(0, "rgba(255,244,190,0.95)");
                  e.addColorStop(.5, "rgba(255,214,100,0.5)");
                  e.addColorStop(1, "rgba(255,214,100,0)");
                  a.globalCompositeOperation = "lighter";
                  a.fillStyle = e;
                  var i = 6 + 11 * r;
                  a.globalAlpha = .16 * r;
                  a.fillRect(Math.round(o - i), t - 128, Math.round(2 * i), 128);
                  a.globalAlpha = .3 * r * r + .08 * r;
                  a.fillRect(Math.round(o - .62 * i), t - 128, Math.round(1.24 * i), 128);
                  a.globalAlpha = .85 * r;
                  var n = 1.5 + 3 * r;
                  a.fillRect(Math.round(o - n), t - 128, Math.round(2 * n), 128);
                }
              })(o, e, n, C.age);
            }
            (function (a, o, t, l, r, e, i) {
              var n = a.createLinearGradient(0, t, 0, t - 76);
              n.addColorStop(0, "rgba(255,230,130,0.6)");
              n.addColorStop(1, "rgba(255,230,130,0)");
              a.globalCompositeOperation = "lighter";
              a.fillStyle = n;
              for (var h = i >= 2 ? 5 : 3, f = 0; f < h; f++) {
                var g = 34 + 15 * Math.sin(1.6 * l + 1.3 * f) + 26 * e;
                var s = o + 6.4 * (f - (h - 1) / 2) + 2 * Math.sin(.9 * l + 2 * f);
                a.globalAlpha = (.2 + .1 * Math.sin(2.1 * l + f)) * r;
                a.fillRect(Math.round(s), Math.round(t - g), f === h >> 1 ? 2 : 1, Math.round(g));
              }
            })(o, e, n, y, O, C.flare, A);
          }
          if (!(P)) {
            (function (a, o, t, e, i, n, f, s, c) {
              var d;
              var m;
              var v;
              var M;
              var b;
              var y;
              var k = g(n.age / .35, .05, 1);
              var w = 20 * k * (1 - .25 * n.ending);
              var A = .34 * w;
              var C = t - 1;
              var S = .5 + .5 * Math.sin(2.6 * e);
              if (a.globalCompositeOperation = "source-over", a.globalAlpha = (.3 + .06 * S + .2 * n.flare) * i, a.fillStyle = r.edge, p(a, o, C, w, A), a.fill(), a.globalCompositeOperation = "lighter", a.lineWidth = 1, a.globalAlpha = (.7 + .2 * n.flare) * i, a.strokeStyle = r.mid, p(a, o, C, w, A), a.stroke(), !(c < 1)) {
                if (a.globalAlpha = .55 * i, a.strokeStyle = f.glow, p(a, o, C, .62 * w, .62 * A), a.stroke(), 0 === s) {
                  for (d = 0; d < 8; d++)
                    m = .5 * e + d * l / 8, b = o + (v = Math.cos(m)) * w * .8, y = C + (M = Math.sin(m)) * A * .8, a.globalAlpha = (.42 + .14 * S) * i, a.fillStyle = d % 2 ? f.mid : r.mid, p(a, b, y, 3.6 * k, 1.5 * k, Math.atan2(M * A, v * w)), a.fill(), u(a, b + v * w * .12, y + M * A * .12, 1, 1, r.hot, .85 * i);
                }
                else if (1 === s) {
                  for (d = 0; d < 8; d++) {
                    m = .4 * -e + d * l / 8;
                    v = Math.cos(m);
                    M = Math.sin(m);
                    for (var x = 0; x < 3; x++) {
                      var O = w * (.92 - .12 * x);
                      u(a, b = o + v * O, y = C + M * O * .34, 1, 1, h[d] >> x & 1 ? d % 2 ? f.glow : r.hot : r.deep, (h[d] >> x & 1 ? .9 : .4) * i);
                    }
                  }
                }
                else {
                  for (a.lineWidth = 1, a.strokeStyle = f.mid, d = 0; d < 4; d++)
                    m = .6 * e + d * l / 4, v = Math.cos(m), M = Math.sin(m), a.globalAlpha = .35 * i, a.beginPath(), a.moveTo(o + v * w * .62, C + M * A * .62), a.lineTo(o + v * w, C + M * A), a.stroke();
                  for (d = 0; d < 4; d++)
                    m = .35 * -e + d * l / 4, u(a, (b = o + (v = Math.cos(m)) * w) - 1, y = C + (M = Math.sin(m)) * A, 3, 1, r.hot, .9 * i), u(a, b, y - 1, 1, 3, r.hot, .9 * i);
                }
                for (d = 0; d < 4; d++)
                  m = 1.3 * e + d * l / 4, u(a, o + Math.cos(m) * w, C + Math.sin(m) * A, 2, 1, d % 2 ? f.core : r.hot, .9 * i);
              }
            })(o, e, n, y, O, C, S, x, A);
            if (A >= 2) {
              (function (a, o, t, l, r, e) {
                var i = l % 2.4 / 2.4;
                var n = 8 + 32 * i;
                a.globalCompositeOperation = "lighter";
                a.lineWidth = 1;
                a.strokeStyle = e.glow;
                a.globalAlpha = .5 * Math.pow(1 - i, 1.6) * r;
                p(a, o, t - 1, n, .34 * n);
                a.stroke();
              })(o, e, n, y, O, S);
            }
          }
          if (A >= 1) {
            if (!(R)) {
              m(o, e, n, y, O, C, S, !1, A);
            }
            v(o, e, n, y, O, S, A, "back");
            M(o, e, n, y, O, S, A, "back", C);
          }
          return void o.restore();
        }
        if ("front" === k) {
          (function (a, o, e, i, n, h, f, g, s) {
            var c = t.eyePoints(o, e, i ? i.dir : 0, s);
            if (c.length) {
              var d = .78 + .22 * Math.sin(4.5 * n) + .5 * g.flare;
              a.globalCompositeOperation = "lighter";
              for (var p = 0; p < c.length; p += 2) {
                var m = c[p];
                var v = c[p + 1];
                a.fillStyle = f.glow;
                a.globalAlpha = .07 * d * h;
                a.beginPath();
                a.arc(m, v, 4.8, 0, l);
                a.fill();
                a.fillStyle = r.glow;
                a.globalAlpha = .12 * d * h;
                a.beginPath();
                a.arc(m, v, 3.2, 0, l);
                a.fill();
                a.fillStyle = r.hot;
                a.globalAlpha = .2 * d * h;
                a.beginPath();
                a.arc(m, v, 1.9, 0, l);
                a.fill();
                u(a, m - 4, v - .5, 8, 1, r.glow, .08 * d * h);
                u(a, m - 2.5, v - .5, 5, 1, r.hot, .18 * d * h);
                u(a, m - .5, v - 4, 1, 8, r.glow, .1 * d * h);
              }
            }
          })(o, e, n, b, y, O, S, C, w);
          v(o, e, n, y, O, S, A, "front");
          M(o, e, n, y, O, S, A, "front", C);
          if (A >= 2) {
            (function (a, o, t, l, e, i) {
              a.globalCompositeOperation = "lighter";
              for (var n = 0; n < 3; n++) {
                var h = 1.1 * l + .37 * n;
                var f = Math.floor(h);
                var g = h - f;
                var c = 3.1 * f + 17.3 * n;
                var d = Math.sin(g * Math.PI);
                if (!(d <= .05)) {
                  var p = o + (s(c) < .5 ? -1 : 1) * (6 + 11 * s(c + 1));
                  var m = t - 8 - 50 * s(c + 2);
                  var v = d > .6 ? 3 : 2;
                  u(a, p, m, 1, 1, "#ffffff", d * e);
                  u(a, p - v, m, v, 1, n % 2 ? i.glow : r.hot, .8 * d * e);
                  u(a, p + 1, m, v, 1, n % 2 ? i.glow : r.hot, .8 * d * e);
                  u(a, p, m - v, 1, v, r.hot, .8 * d * e);
                  u(a, p, m + 1, 1, v, r.hot, .8 * d * e);
                }
              }
            })(o, e, n, y, O, S);
          }
          if (R) {
            m(o, e, n, y, O, C, S, !0, A);
          }
          o.restore();
        }
        else {
          o.restore();
        }
      }
    };
  }
  function f() {
    var o = a.Quality;
    return o && "number" == typeof o.tier ? o.tier : 2;
  }
  function g(a, o, t) {
    return a < o ? o : a > t ? t : a;
  }
  function s(a) {
    var o = 43758.5453 * Math.sin(127.1 * a + 311.7);
    return o - Math.floor(o);
  }
  function c(o) {
    var t = o && o.cfg;
    var l = a.Player;
    if (!t || !l || !l.heCuaNguoi) {
      return e;
    }
    var i = (t.linhCan || "") + "|" + (t.name || t.charId || "");
    var n = o._kcAcc;
    if (n && n.key === i) {
      return n.acc;
    }
    var h = l.heCuaNguoi(t);
    var f = e;
    var g = a.Palette && a.Palette.mixHex;
    if (h && h.mau && "kim" !== h.he && g) {
      f = { he: h.he, mid: g(r.mid, h.mau, .6), glow: g(r.glow, h.mau, .5), core: g(r.core, h.mau, .25) };
    }
    o._kcAcc = { key: i, acc: f };
    return f;
  }
  function d(a) {
    var o = a && a.cfg;
    if (!o) {
      return 0;
    }
    var t = String(o.auraSeed || o.name || o.charId || "kc");
    var l = a._kcVar;
    if (l && l.key === t) {
      return l.v;
    }
    for (var r = 0, e = 0; e < t.length; e++)
      r = Math.imul(r ^ t.charCodeAt(e), 16777619);
    var i = (r >>> 0 >>> 5) % 3;
    a._kcVar = { key: t, v: i };
    return i;
  }
  function u(a, o, t, l, r, e, i) {
    a.globalAlpha = i;
    a.fillStyle = e;
    a.fillRect(Math.round(o), Math.round(t), l, r);
  }
  function p(a, o, t, r, e, i) {
    a.beginPath();
    a.ellipse(o, t, Math.max(.1, r), Math.max(.1, e), i || 0, 0, l);
  }
  function m(a, o, t, e, i, n, h, f, g) {
    var s;
    var c;
    var d = o;
    var p = t - 49;
    var m = 10.5 + 1.1 * Math.sin(2.2 * e) + 3.5 * n.flare;
    if (a.globalCompositeOperation = "lighter", f || (a.globalAlpha = (.15 + .08 * n.flare) * i, a.fillStyle = r.mid, a.beginPath(), a.arc(d, p, m, 0, l), a.fill()), a.lineWidth = 1, a.globalAlpha = (f ? .5 : .7) * i, a.strokeStyle = r.glow, a.beginPath(), a.arc(d, p, m, 0, l), a.stroke(), a.globalAlpha = .32 * i, a.strokeStyle = h.glow, a.beginPath(), a.arc(d, p, m + 2.4, 0, l), a.stroke(), !(g < 2)) {
      for (s = 0; s < 12; s++)
        c = .8 * e + s * l / 12, u(a, d + Math.cos(c) * (m + 4.6), p + Math.sin(c) * (m + 4.6), 1, 1, s % 3 == 0 ? h.core : r.glow, .7 * i);
      for (s = 0; s < 4; s++)
        c = .8 * e + s * l / 4, u(a, d + Math.cos(c) * m - 1, p + Math.sin(c) * m - 1, 2, 2, s % 2 ? h.core : r.hot, .95 * i);
    }
  }
  function v(a, o, t, e, i, n, h, f) {
    var g = h >= 2 ? 4 : 3;
    a.globalCompositeOperation = "lighter";
    for (var s = 0; s < g; s++) {
      var c = 1.9 * e + s * l / g;
      var d = Math.sin(c);
      if ("back" === f == d < 0) {
        var p = o + 15 * Math.cos(c);
        var m = t - 30 + 5 * d + 3 * Math.sin(2.3 * e + 1.7 * s);
        var v = ("front" === f ? .92 : .5) * i;
        u(a, p - 1, m - 1, 3, 3, s % 2 ? n.glow : r.glow, .7 * v);
        u(a, p, m - 2, 1, 5, r.hot, v);
        u(a, p - 2, m, 5, 1, r.hot, .8 * v);
      }
    }
  }
  function M(a, o, t, l, e, i, n, h, f) {
    var s = "back" === h ? 3 : n >= 2 ? 6 : 3;
    var c = 1 - .5 * f.ending;
    a.globalCompositeOperation = "lighter";
    for (var d = 0; d < s; d++) {
      var p = (l * c * (.34 + d % 3 * .06) + .177 * d + ("back" === h ? .5 : 0)) % 1;
      u(a, o + Math.sin(1.7 * l + 2.1 * d + ("back" === h ? 1 : 0)) * (8 + d % 4 * 2) + 1.4 * (d - s / 2), t - 6 - 60 * p, d % 5 == 0 ? 2 : 1, d % 5 == 0 ? 2 : 1, d % 2 ? i.glow : r.hot, g(1 - 1.05 * p, 0, 1) * ("back" === h ? .5 : .85) * e);
    }
  }
}(window.PNTT);
