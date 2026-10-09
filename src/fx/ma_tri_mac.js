!function (a) {
  "use strict";
  var e = a.VFX;
  if (e) {
    var t = a.MaTriMacFX = {};
    var l = 2 * Math.PI;
    t.IMG = "assets/sprites/fx/ma_tri_mac_son_ha.png";
    t.DUR = { stroke: .85, sweep: 1.2, landscape: 2.6, hit: .8 };
    t.NAME = { stroke: "Nhất Bút Phá Không", sweep: "Hoành Tảo Mặc Ngân", landscape: "Sơn Hà Nhập Họa" };
    var r = { stroke: 0, sweep: 2.4, landscape: 3.5, hit: 1.6 };
    var i = { stroke: .5, sweep: .62, landscape: .47, hit: .5 };
    t.SCALE = i;
    var o = !1;
    t.prime = function () {
      if (!o && a.Assets && a.Assets.loadImage) {
        o = !0;
        a.Assets.loadImage(t.IMG, a.Assets.PRIO && a.Assets.PRIO.PREFETCH);
      }
    };
    var n = {};
    var s = "#cfeee0";
    var h = null;
    var f = null;
    var c = [Math.PI / 2, Math.PI, 0, -Math.PI / 2];
    t.tipOf = function (e, t) {
      var l = void 0 === t ? P(e) : t;
      var r = 0;
      if (a.CONFIG && a.CONFIG.FLY) {
        r = a.CONFIG.FLY.HOVER * (e && e.flyRise || 0);
      }
      return { x: e.x + 26 * Math.cos(l), y: e.y - 24 - r + 12 * Math.sin(l) };
    };
    e.spawnMaTriMac = function (a, l) {
      l = l || {};
      t.prime();
      var o = t.DUR[l.kind] ? l.kind : "stroke";
      var n = a || { x: 0, y: 0, dir: 2 };
      var s = void 0 !== l.angle ? l.angle : P(n);
      var h = t.tipOf(n, s);
      var f = t.DUR[o] + (r[o] || 0);
      var c = { type: "matrimac", kind: o, owner: n, ghost: !!l.ghost, elapsed: 0, dur: t.DUR[o], seed: 19 + (1e3 * Math.random() | 0), angle: "landscape" === o || "hit" === o ? 0 : s, scale: i[o], hitAt: l.hitDelay > 0 && l.hitDelay < t.DUR[o] ? l.hitDelay / t.DUR[o] : -1, shook: !1, follow: "sweep" === o, ax: h.x, ay: h.y, life: f, max: f };
      if ("landscape" === o) {
        var v = l.at || { x: h.x + 100 * Math.cos(s), y: h.y + 60 * Math.sin(s) };
        c.ax = v.x - 150;
        c.ay = v.y - 18;
      }
      else if ("hit" === o) {
        var d = l.at || { x: h.x, y: h.y };
        c.ax = d.x;
        c.ay = d.y;
      }
      else {
        if ("sweep" === o) {
          c.cx = 125 * i.sweep;
        }
      }
      c.x = c.ax;
      c.y = c.ay;
      e.list.push(c);
      return c;
    };
    t.update = function (e, t) {
      if (e.elapsed += t, e.follow && e.owner && isFinite(e.owner.x) && isFinite(e.owner.y)) {
        var l = 0;
        if (a.CONFIG && a.CONFIG.FLY) {
          l = a.CONFIG.FLY.HOVER * (e.owner.flyRise || 0);
        }
        e.ax = e.owner.x - Math.cos(e.angle) * e.cx;
        e.ay = e.owner.y - 22 - l - Math.sin(e.angle) * e.cx * .5;
      }
      e.x = e.ax;
      e.y = e.ay;
      if (!e.shook && e.hitAt >= 0 && e.elapsed >= e.hitAt * e.dur) {
        e.shook = !0;
        if (d() >= 1 && a.Camera && a.Camera.shakeAt && ("sweep" === e.kind || "landscape" === e.kind)) {
          a.Camera.shakeAt(e.ax + ("landscape" === e.kind ? 160 : 0), e.ay, e.ghost ? 1.4 : 2.4, .22);
        }
      }
    };
    t.draw = function (a, e, t, i, o) {
      if ("back" === o || "front" === o) {
        var n = d();
        var c = e.elapsed || 0;
        var P = { x: e.ax - (+t || 0), y: e.ay - (+i || 0), angle: e.angle, scale: e.scale, ink: .97, seed: e.seed, q: n, hitAt: e.hitAt, durSec: e.dur };
        if (a.save(), "front" === o) {
          if (c <= e.dur) {
            (function (a, e, t, r) {
              if (!(t < 0 || t > 1)) {
                var i = r.seed;
                var o = r.q;
                var n = r.ink;
                a.save();
                a.translate(r.x, r.y);
                a.rotate(r.angle);
                a.scale(r.scale, r.scale);
                a.fillStyle = "#102a26";
                a.strokeStyle = a.fillStyle;
                a.globalAlpha *= n;
                var c;
                var d;
                var P;
                var C = 1 - g((t - .65) / .35);
                var T = r.hitAt >= 0 ? (t - r.hitAt) / (.3 / r.durSec) : -1;
                if ("stroke" === e) {
                  var I = u((t - .1) / .5);
                  var R = 30 + 250 * I;
                  if (t < .34) {
                    var O = 1 - g(t / .34);
                    for (P = [], c = 0; c < 14; c++) {
                      var F = 2 * (d = c / 13) - 1.2;
                      P.push([14 + 40 * Math.cos(F), 34 * Math.sin(F)]);
                    }
                    a.save();
                    a.globalAlpha *= O;
                    y(a, P, 17, i + 3, .8, o, .3);
                    a.restore();
                  }
                  if (t > .06) {
                    a.save();
                    a.globalAlpha *= C;
                    P = [];
                    var G = o >= 2 ? 45 : 24;
                    var E = Math.min(190, R - 14);
                    for (c = 0; c < G; c++)
                      d = c / (G - 1), P.push([R - E + E * d, 11 * Math.sin(d * Math.PI * 1.4) * (1 - d)]);
                    var N = 27 * (.55 + .45 * Math.sin(Math.PI * I));
                    if (o >= 1 && (S(a, R - 70, 0, 64 * (.6 + .5 * I), .55 * (1 - t)), a.fillStyle = s, y(a, P, 1.55 * N, i + 11, .2, 0, .3), a.fillStyle = "#102a26", b(a, R - 70, 0, 52, i, .02)), y(a, P, N, i, .95, o, .55), o >= 1) {
                      var D = [];
                      for (c = 0; c < P.length; c++)
                        D.push([P[c][0], P[c][1] - .3 * N * Math.sin(Math.PI * c / (P.length - 1))]);
                      for (a.fillStyle = s, y(a, D, 3.2, i + 7, .6, 0, .25), a.fillStyle = "#102a26", y(a, A([Math.max(8, R - E - 10), -6], [R - .25 * E, -26], [R + 22, -6], 18), 4, i + 1, .65, o), c = 0; c < 3; c++) {
                        var q = 15 * (c - 1) + 6 * (M(c, i + 20) - .5);
                        var H = Math.max(10, R - 250 - 40 * M(c, i + 21));
                        y(a, A([H, q], [H + 90, q + 2 * (c - 1)], [Math.max(H + 30, R - 100), q], 14), 3.2, i + 30 + c, .4 * (1 - t), 0, .4);
                      }
                      m(a, R, 0, I, i, o >= 2 ? 23 : 10, 46 + 32 * I);
                      k(a, R + 6, 0, 22 * (1 - g((t - .1) / .5)), .9);
                    }
                    a.restore();
                  }
                }
                else if ("hit" === e) {
                  var L = u(t / .35);
                  var U = 1 - g((t - .55) / .45);
                  if (S(a, 0, -8, 24 + 44 * L, .9 * (1 - g(t / .5))), o >= 1 && k(a, 0, -8, 56 * (1 - g(t / .4)), 1), a.save(), a.globalAlpha *= U, b(a, 0, 4, 30 + 18 * L, i, .16), m(a, 0, 0, L, i + 2, o >= 2 ? 26 : 10, 70), o >= 1) {
                    for (c = 0; c < 5; c++) {
                      var W = 56 * (M(c, i + 5) - .5) * L;
                      var Y = (8 + 24 * M(c, i + 6)) * u((t - .08) / .6);
                      a.fillRect(W - 1.2, 6, 2.4, Y);
                      a.beginPath();
                      a.arc(W, 6 + Y, 2.6, 0, l);
                      a.fill();
                    }
                  }
                  a.restore();
                  w(a, r, 0, 4, 16 + 84 * u(t / .6), 5 * (1 - t) + .8, .9 * (1 - t));
                }
                else if ("sweep" === e) {
                  var _ = u((t - .12) / .5);
                  if (t > .12) {
                    a.globalAlpha *= C;
                    P = [];
                    var V = o >= 2 ? 75 : 40;
                    for (c = 0; c < V; c++) {
                      var X = 5.3 * _ * (d = c / (V - 1)) - 2.35;
                      P.push([125 + 145 * Math.cos(X), 112 * Math.sin(X)]);
                    }
                    if (o >= 1 && (b(a, 125, 0, 154, i, .009), S(a, 125, 0, 190, .18 * (1 - t)), a.fillStyle = s, y(a, P, 56, i + 11, .17, 0, .25), a.fillStyle = "#102a26"), y(a, P, 38, i, .9, o, .4), o >= 1) {
                      var B = [];
                      var K = [];
                      for (c = 0; c < P.length; c++)
                        B.push([125 + 1.08 * (P[c][0] - 125), 1.08 * P[c][1]]), K.push([125 + 1.065 * (P[c][0] - 125), 1.065 * P[c][1]]);
                      y(a, B, 4, i + 2, .46, o);
                      a.fillStyle = s;
                      y(a, K, 3.2, i + 7, .5, 0, .25);
                      a.fillStyle = "#102a26";
                      var Q = [];
                      var j = u((t - .2) / .5);
                      for (c = 0; c < 36; c++) {
                        var z = 2.6 - 4.4 * j * (d = c / 35);
                        Q.push([125 + 98 * Math.cos(z), 74 * Math.sin(z)]);
                      }
                      y(a, Q, 15, i + 5, .55, 0, .5);
                      var J = P[P.length - 1];
                      m(a, J[0], J[1], _, i + 9, o >= 2 ? 43 : 18, 100);
                      k(a, J[0], J[1], 18 * (1 - g((t - .15) / .4)), .9);
                      if (t > .42) {
                        m(a, 170, 0, p(3 * (t - .42)), i + 13, o >= 2 ? 25 : 10, 135);
                      }
                    }
                    if (T >= 0 && T < 1) {
                      S(a, 125, 0, 40 + 90 * T, .8 * (1 - T));
                      w(a, r, 125, 0, 24 + 150 * u(T), 6 * (1 - T) + .8, .95 * (1 - T));
                    }
                  }
                }
                else if ("landscape" === e) {
                  var Z = g((t - .15) / .5);
                  if (t > .08) {
                    a.globalAlpha *= 1 - g((t - .81) / .19);
                    var $ = 45 + 230 * g(t / .6);
                    if (o >= 1 && b(a, 240, 0, $, i, .015), a.save(), a.globalAlpha *= 1 - g((t - .48) / .35), a.lineWidth = 1.2, a.beginPath(), a.ellipse(210, 0, 70 + 200 * Z, 45 + 95 * Z, 0, 0, l * Z), a.stroke(), a.restore(), t > .15) {
                      var aa = v();
                      if (aa) {
                        var ea = function (a) {
                          if (!a) {
                            return null;
                          }
                          if (f === a) {
                            return h;
                          }
                          if (f = a, h = a, "undefined" == typeof document || !document.createElement) {
                            return h;
                          }
                          try {
                            var e = document.createElement("canvas");
                            e.width = 520;
                            e.height = 347;
                            var t = e.getContext("2d");
                            t.drawImage(a, 0, 0, 520, 347);
                            t.globalCompositeOperation = "destination-in";
                            for (var l = [[0, 0, 56, 0], [520, 0, 464, 0], [0, 0, 0, 70], [0, 347, 0, 270]], r = 0; r < l.length; r++) {
                              var i = l[r];
                              var o = document.createElement("canvas");
                              o.width = 520;
                              o.height = 347;
                              var n = o.getContext("2d");
                              n.fillStyle = "#000";
                              n.fillRect(0, 0, 520, 347);
                              n.globalCompositeOperation = "destination-out";
                              var s = n.createLinearGradient(i[0], i[1], i[2], i[3]);
                              s.addColorStop(0, "rgba(0,0,0,1)");
                              s.addColorStop(1, "rgba(0,0,0,0)");
                              n.fillStyle = s;
                              n.fillRect(0, 0, 520, 347);
                              t.drawImage(o, 0, 0);
                            }
                            h = e;
                          }
                          catch (e) {
                            h = a;
                          }
                          return h;
                        }(aa);
                        var ta = 520 * Z;
                        if (a.save(), a.imageSmoothingEnabled = !0, a.beginPath(), a.rect(0, -260, Math.max(0, ta - (o >= 1 ? 70 : 0)), 510), a.clip(), a.drawImage(ea, 0, -235, 520, 347), a.restore(), o >= 1) {
                          for (var la = 0; la < 7; la++) {
                            var ra = Math.max(0, ta - 70 + 10 * la);
                            var ia = Math.min(10, ta - ra);
                            if (!(ia <= 0)) {
                              a.save();
                              a.globalAlpha *= 1 - (la + .5) / 7;
                              a.beginPath();
                              a.rect(ra, -260, ia, 510);
                              a.clip();
                              a.drawImage(ea, 0, -235, 520, 347);
                              a.restore();
                            }
                          }
                          for (a.save(), a.globalAlpha *= .28 * p(4 * (t - .2)) * (1 - g((t - .7) / .3)), c = 0; c < 3; c++) {
                            var oa = 130 + 140 * c + 26 * Math.sin(5 * t + 2 * c);
                            var na = a.createRadialGradient(oa, 96, 0, oa, 96, 120);
                            na.addColorStop(0, "rgba(225,245,235,0.8)");
                            na.addColorStop(1, "rgba(225,245,235,0)");
                            a.fillStyle = na;
                            a.save();
                            a.translate(0, 96);
                            a.scale(1, .28);
                            a.translate(0, -96);
                            a.fillRect(oa - 120, -24, 240, 240);
                            a.restore();
                          }
                          a.restore();
                          a.fillStyle = "#102a26";
                        }
                      }
                      else {
                        for (a.save(), a.beginPath(), a.rect(0, -260, 560 * Z, 510), a.clip(), c = 0; c < 7; c++)
                          x(a, 55 + 69 * c, 35, 80 + 50 * M(c, i), 70 + 115 * M(c, i + 3), i + c, .24, o);
                        for (c = 0; c < 4; c++)
                          x(a, 105 + 113 * c, 72, 95 + 25 * M(c, i + 1), 90 + 135 * M(c, i + 5), i + 20 + c, .76, o);
                        for (var sa = 0; sa < 7; sa++) {
                          var ha = [];
                          for (c = 0; c < 55; c++)
                            d = c / 54, ha.push([480 * d, 18 * Math.sin(8.6 * d + .37 * sa) + 94 + 5 * sa]);
                          y(a, ha, 0 === sa ? 12 : 2, i + sa, .25, o);
                        }
                        a.restore();
                      }
                      if (o >= 1) {
                        m(a, 440 * Z, 60, p(2 * (t - .2)), i + 30, o >= 2 ? 40 : 16, 110);
                      }
                    }
                    if (t > .49 && o >= 1) {
                      var fa = g((t - .49) / .13);
                      for (S(a, 340, 20, 30 + 110 * fa, .7 * (1 - g((t - .55) / .2))), w(a, r, 340, 20, 18 + 190 * u((t - .49) / .25), 6 * (1 - p((t - .49) / .25)) + .8, 1 - p((t - .49) / .25)), a.save(), a.globalAlpha *= 1 - g((t - .67) / .17), a.translate(340, 20), c = 0; c < 8; c++)
                        a.save(), a.rotate(c / 8 * l), y(a, [[15, 0], [45 + 45 * fa, 12 * M(c, i)], [110 + 25 * fa, 0]], 7, i + c, .4, o), a.restore();
                      a.restore();
                    }
                  }
                }
                a.restore();
              }
            })(a, e.kind, c / e.dur, P);
          }
        }
        else if (r[e.kind] && c > .6 * e.dur) {
          var C = 1 - p((c - e.dur) / r[e.kind]);
          !function (a, e, t, l) {
            if (!(l <= .01)) {
              var r;
              var i;
              var o = t.seed;
              if (a.save(), a.translate(t.x, t.y), a.rotate(t.angle), a.scale(t.scale, t.scale), a.globalAlpha = .12 * t.ink * l, a.fillStyle = "#243b31", a.strokeStyle = a.fillStyle, "hit" === e) {
                b(a, 0, 4, 46, o, .1);
              }
              else if ("sweep" === e) {
                for (i = [], r = 0; r < 40; r++) {
                  var n = r / 39 * 5.3 - 2.35;
                  i.push([125 + 145 * Math.cos(n), 112 * Math.sin(n)]);
                }
                y(a, i, 16, o, .8, t.q);
              }
              else if ("landscape" === e) {
                var s = v();
                if (s) {
                  a.drawImage(s, 0, -110, 480, 210);
                }
                else {
                  for (r = 0; r < 4; r++)
                    x(a, 105 + 105 * r, 35, 90, 70 + 80 * M(r, o), o + r, .6, t.q);
                }
                y(a, [[25, 50], [150, 68], [270, 47], [440, 58]], 7, o, .6, t.q);
              }
              a.restore();
            }
          }(a, e.kind, P, C * p((c - .6 * e.dur) / (.4 * e.dur)));
        }
        a.restore();
      }
    };
    t.spawnImpact = function (t, l, r, i) {
      for (var o = d() >= 2 ? 8 : 3, n = Math.sqrt(r * r + i * i) || 1, s = r / n, h = i / n, f = 0; f < o; f++) {
        var c = Math.atan2(h, s) + 1.9 * (Math.random() - .5);
        var v = 45 + 70 * Math.random();
        e.list.push({ type: "spark", x: t, y: l, vx: Math.cos(c) * v, vy: Math.sin(c) * v * .7 - 12, color: f % 3 ? "#15332e" : "#6a8a80", life: .3 + .22 * Math.random(), max: .52 });
      }
      e.spawnMaTriMac({ x: t, y: l + 24 }, { kind: "hit", at: { x: t, y: l }, ghost: !0 });
      if (d() >= 1 && a.Camera && a.Camera.shakeAt) {
        a.Camera.shakeAt(t, l, 1.5, .12);
      }
    };
  }
  function v() {
    var e = a.Assets;
    var l = e && e.get ? e.get(t.IMG) : null;
    return l && !1 !== l.complete && (l.naturalWidth || l.width) ? l : null;
  }
  function d() {
    var e = a.Quality;
    return e && "number" == typeof e.tier ? e.tier : 2;
  }
  function p(a, e, t) {
    t = void 0 === t ? 1 : t;
    return a < (e = void 0 === e ? 0 : e) ? e : a > t ? t : a;
  }
  function g(a) {
    return (a = p(a)) * a * (3 - 2 * a);
  }
  function u(a) {
    return 1 - Math.pow(1 - p(a), 3);
  }
  function M(a, e) {
    var t = 43758.5453 * Math.sin(127.1 * a + 311.7 * (void 0 === e ? 1 : e));
    return t - Math.floor(t);
  }
  function y(a, e, t, l, r, i, o) {
    if (!(e.length < 2)) {
      o = void 0 === o ? 1 : o;
      a.save();
      a.globalAlpha *= r;
      var s;
      var h = [];
      var f = [];
      var c = e.length;
      for (s = 0; s < c; s++) {
        var v = s / (c - 1);
        var d = e[Math.max(0, s - 1)];
        var p = e[Math.min(c - 1, s + 1)];
        var g = Math.atan2(p[1] - d[1], p[0] - d[0]) + Math.PI / 2;
        var u = (.06 + .94 * Math.pow(Math.sin(Math.PI * v), .62)) * t * (1 - .3 * o + .6 * M(s, l) * o);
        var y = (M(s, l + 9) - .5) * t * .12 * o;
        h.push([e[s][0] + Math.cos(g) * (.5 * u + y), e[s][1] + Math.sin(g) * (.5 * u + y)]);
        f.push([e[s][0] - Math.cos(g) * (.5 * u - y), e[s][1] - Math.sin(g) * (.5 * u - y)]);
      }
      for (a.beginPath(), s = 0; s < c; s++)
        s ? a.lineTo(h[s][0], h[s][1]) : a.moveTo(h[s][0], h[s][1]);
      for (s = c - 1; s >= 0; s--)
        a.lineTo(f[s][0], f[s][1]);
      a.closePath();
      var m = a.fillStyle;
      if ("string" == typeof m && i >= 1 && (a.fillStyle = function (a, e) {
        if (n[e]) {
          return n[e];
        }
        if ("undefined" == typeof document) {
          return e;
        }
        var t = document.createElement("canvas");
        t.width = 128;
        t.height = 128;
        var l = t.getContext("2d");
        l.fillStyle = e;
        l.fillRect(0, 0, 128, 128);
        l.globalCompositeOperation = "destination-out";
        for (var r = 0; r < 440; r++)
          l.globalAlpha = .14 + .56 * M(r, 67), l.fillRect(128 * M(r, 29), 128 * M(r, 32), 1 + 8 * M(r, 41), .35 + .9 * M(r, 38));
        var i = a.createPattern(t, "repeat");
        n[e] = i;
        return i;
      }(a, m)), a.fill(), a.fillStyle = m, i >= 1) {
        a.globalAlpha *= .42;
        a.lineWidth = .7;
        for (var b = i >= 2 ? 17 : 8, x = 0; x < b; x++) {
          a.beginPath();
          var A = (M(x, l + 34) - .5) * t * .8;
          for (s = 0; s < c; s++) {
            var S = e[Math.max(0, s - 1)];
            var k = e[Math.min(c - 1, s + 1)];
            var w = Math.atan2(k[1] - S[1], k[0] - S[0]) + Math.PI / 2;
            var P = e[s][0] + Math.cos(w) * A + 3 * M(s + x, l);
            var C = e[s][1] + Math.sin(w) * A + 3 * M(s + x, l + 4);
            if (0 === s || M(s + 11 * x, l + 12) > .78) {
              a.moveTo(P, C);
            }
            else {
              a.lineTo(P, C);
            }
          }
          a.stroke();
        }
      }
      a.restore();
    }
  }
  function m(a, e, t, r, i, o, n) {
    a.save();
    for (var s = 0; s < o; s++) {
      var h = M(s, i) * l;
      var f = (.15 + .85 * M(s, i + 2)) * n * u(r);
      var c = e + Math.cos(h) * f;
      var v = t + Math.sin(h) * f * .6;
      var d = (1 + 4 * M(s, i + 5)) * (1 - .45 * r);
      a.globalAlpha = .3 + .65 * M(s, i + 1);
      a.beginPath();
      a.ellipse(c, v, d * (1 + 1.4 * r), .5 * d, h, 0, l);
      a.fill();
    }
    a.restore();
  }
  function b(a, e, t, r, i, o) {
    a.save();
    a.globalAlpha *= o;
    for (var n = 0; n < 8; n++) {
      a.beginPath();
      for (var s = 0; s < 36; s++) {
        var h = s / 36 * l;
        var f = r * (.6 + .4 * M(s + 7 * n, i));
        var c = e + Math.cos(h) * f;
        var v = t + Math.sin(h) * f * .5;
        if (s) {
          a.lineTo(c, v);
        }
        else {
          a.moveTo(c, v);
        }
      }
      a.closePath();
      a.fill();
    }
    a.restore();
  }
  function x(a, e, t, l, r, i, o, n) {
    a.save();
    a.globalAlpha *= o;
    a.beginPath();
    a.moveTo(e - .55 * l, t);
    a.lineTo(e - .25 * l, t - .48 * r);
    a.lineTo(e - .18 * l, t - .4 * r);
    a.lineTo(e - .04 * l, t - .96 * r);
    a.lineTo(e + .015 * l, t - r);
    a.lineTo(e + .17 * l, t - .63 * r);
    a.lineTo(e + .23 * l, t - .7 * r);
    a.lineTo(e + .5 * l, t);
    a.closePath();
    a.globalAlpha *= .17;
    a.fill();
    a.globalAlpha /= .17;
    for (var s = [e + .015 * l, t - r], h = 0; h < 8; h++)
      y(a, [s, [e + (M(h, i) - .5) * l * .2, t - .6 * r], [e + (h / 8 - .5) * l * .9, t]], l * (.025 + .055 * M(h, i + 2)), i + h, .1 + .35 * M(h, i + 3), n);
    y(a, [[e - .5 * l, t], [e - .25 * l, t - .48 * r], [e - .18 * l, t - .4 * r], s], .025 * l, i, .8, n);
    a.restore();
  }
  function A(a, e, t, l) {
    for (var r = [], i = 0; i < l; i++) {
      var o = i / (l - 1);
      var n = 1 - o;
      r.push([n * n * a[0] + 2 * o * n * e[0] + o * o * t[0], n * n * a[1] + 2 * o * n * e[1] + o * o * t[1]]);
    }
    return r;
  }
  function S(a, e, t, l, r) {
    if (!(r <= .01 || l < 1)) {
      a.save();
      a.globalCompositeOperation = "lighter";
      a.globalAlpha *= r > 1 ? 1 : r;
      var i = a.createRadialGradient(e, t, 0, e, t, l);
      i.addColorStop(0, "rgba(236,255,246,0.9)");
      i.addColorStop(.35, "rgba(150,215,185,0.34)");
      i.addColorStop(1, "rgba(150,215,185,0)");
      a.fillStyle = i;
      a.fillRect(e - l, t - l, 2 * l, 2 * l);
      a.restore();
    }
  }
  function k(a, e, t, l, r) {
    if (!(r <= .02 || l < 1)) {
      a.save();
      a.globalCompositeOperation = "lighter";
      a.globalAlpha *= r > 1 ? 1 : r;
      a.fillStyle = "rgba(214,246,232,1)";
      a.beginPath();
      a.moveTo(e - l, t);
      a.lineTo(e, t - .14 * l);
      a.lineTo(e + l, t);
      a.lineTo(e, t + .14 * l);
      a.closePath();
      a.moveTo(e, t - .7 * l);
      a.lineTo(e + .12 * l, t);
      a.lineTo(e, t + .7 * l);
      a.lineTo(e - .12 * l, t);
      a.closePath();
      a.fill();
      a.restore();
    }
  }
  function w(a, e, t, r, i, o, n) {
    if (!(n <= .01 || i < 1)) {
      var s = function (a, e, t) {
        var l = Math.cos(a.angle);
        var r = Math.sin(a.angle);
        return [e * l - t * r, e * r + t * l];
      }(e, t, r);
      a.save();
      a.rotate(-e.angle);
      a.globalAlpha *= n > 1 ? 1 : n;
      a.strokeStyle = "#102a26";
      a.lineWidth = o;
      a.beginPath();
      a.ellipse(s[0], s[1], i, .5 * i, 0, 0, l);
      a.stroke();
      a.globalCompositeOperation = "lighter";
      a.strokeStyle = "rgba(190,235,215,0.75)";
      a.lineWidth = Math.max(.6, .3 * o);
      a.beginPath();
      a.ellipse(s[0], s[1], i + .75 * o, .5 * (i + .75 * o), 0, 0, l);
      a.stroke();
      a.restore();
    }
  }
  function P(a) {
    return void 0 !== c[0 | (a && a.dir)] ? c[0 | (a && a.dir)] : 0;
  }
}(window.PNTT);
