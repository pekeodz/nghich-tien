!function (a) {
  "use strict";
  var o = a.ThungLungArt;
  if (o && o.kit) {
    var t = o.kit;
    var l = o.MAP_ID;
    var e = 32;
    var n = t.h01;
    var r = t.clamp01;
    var i = t.smooth;
    var h = t.kep;
    var g = Math.PI;
    var v = 2 * Math.PI;
    var c = { lanh: [140, 196, 255], lanhSang: [228, 244, 255], nong: [255, 84, 60], vang: [255, 208, 122], do: [232, 58, 66], trang: [255, 246, 230], den: [10, 6, 10], khoi: [190, 205, 225], tham: [176, 14, 30], loi: [255, 200, 126], bui: [206, 192, 168], nang: [255, 236, 184] };
    var s = { d: 0 };
    var u = 54;
    o._nan = {};
    var f = null;
    var d = { v: !1, t: -99 };
    var p = 0;
    o.drawGround = function (a, t, n, d, p, m, b, M) {
      var y = t && t.data;
      if (y && y.id === l && !(M < 1)) {
        if (!(f && f.data === y)) {
          f = J(y);
        }
        O();
        f.camX = n;
        f.camY = d;
        f.vw = p;
        f.vh = m;
        if (f.tgGround !== b) {
          f.tgGround = b;
          ra(b, M);
        }
        a.save();
        a.imageSmoothingEnabled = !0;
        (function (a, o, t, l) {
          var e;
          var n;
          var i;
          for (e = f.dec.length - 1; e >= 0; e--) {
            var h = f.dec[e];
            var g = l - h.t0;
            if (g > h.life) {
              f.dec.splice(e, 1);
            }
            else {
              var v = 1 - g / h.life;
              var s = Math.round(h.x - o);
              var u = Math.round(h.y - t);
              if (!(s < -80 || s > f.vw + 80 || u < -80 || u > f.vh + 80))
                if (0 !== h.k) {
                  a.globalCompositeOperation = "source-over";
                  P(a, "den", s, u, .85 * h.r, .46 * v, .62);
                  var d = r(1 - g / (.55 * h.life));
                  for (a.lineCap = "round", n = 0; n < h.v.length; n++) {
                    var p = h.v[n];
                    for (a.globalCompositeOperation = "source-over", a.strokeStyle = "rgba(8,4,8," + (.8 * v).toFixed(2) + ")", a.lineWidth = 1.6, a.beginPath(), a.moveTo(s + p[0][0], u + p[0][1]), i = 1; i < p.length; i++)
                      a.lineTo(s + p[i][0], u + p[i][1]);
                    if (a.stroke(), d > .02) {
                      for (a.globalCompositeOperation = "lighter", a.strokeStyle = C(c.do, c.vang, d), a.globalAlpha = .85 * d * v + .1 * v, a.lineWidth = 1, a.beginPath(), a.moveTo(s + p[0][0], u + p[0][1]), i = 1; i < p.length; i++)
                        a.lineTo(s + p[i][0], u + p[i][1]);
                      a.stroke();
                      a.globalAlpha = 1;
                    }
                  }
                  if (d > .05) {
                    a.globalCompositeOperation = "lighter";
                    P(a, 2 === h.k ? "vang" : "nong", s, u, .7 * h.r, .32 * d, .55);
                  }
                }
                else {
                  a.globalCompositeOperation = "source-over";
                  P(a, "den", s, u, .9 * h.r, .42 * v, .5);
                }
            }
          }
          a.globalCompositeOperation = "source-over";
          a.globalAlpha = 1;
        })(a, n, d, b);
        a.imageSmoothingEnabled = !1;
        (function (a, o, t) {
          var l = f.H.lo;
          if (l && l.length) {
            var e = null;
            a.imageSmoothingEnabled = !1;
            a.globalAlpha = 1;
            for (var n = 0; n < l.length; n++)
              V(l[n][0], l[n][1], 40) && (e || (e = G()), a.drawImage(e, Math.round(l[n][0] - 13 - o), Math.round(l[n][1] - 12 - t), 26, 18));
          }
        })(a, n, d);
        (function (a, o, t, l) {
          var e = f.H.rak;
          if (e && e.length) {
            var n = f.song;
            var r = l - f.chetT;
            var i = l - f.hoiT;
            var g = n * (.1 + .55 * f.dong + .35 * f.gian) * (.78 + .22 * Math.sin(3.1 * l + 1));
            if (g += .9 * f.chiec, g += r >= 0 && r < 2.5 ? .8 * (1 - r / 2.5) : 0, g += i >= 0 && i < 2.4 ? .9 * (1 - i / 2.4) : 0, f.giao > .5 && (g *= .35), !(g < .02)) {
              var v = f.H.dai;
              if (!(v.x1 - o < -10 || v.x0 - o > f.vw + 10 || v.y1 - t < -10 || v.y0 - t > f.vh + 10)) {
                a.imageSmoothingEnabled = !0;
                a.lineCap = "round";
                a.lineJoin = "round";
                for (var s = [[3.4, c.tham, .55, "source-over"], [2, c.nong, .5, "lighter"], [.9, c.loi, .85, "lighter"]], u = 0; u < 3; u++) {
                  var d = s[u];
                  a.globalCompositeOperation = d[3];
                  a.globalAlpha = h(g * d[2], 0, 1);
                  a.strokeStyle = S(d[1]);
                  a.lineWidth = d[0];
                  a.beginPath();
                  for (var p = 0; p < e.length; p++) {
                    var m = e[p];
                    a.moveTo(m[0][0] - o, m[0][1] - t);
                    for (var b = 1; b < m.length; b++)
                      a.lineTo(m[b][0] - o, m[b][1] - t);
                  }
                  a.stroke();
                }
                a.globalAlpha = 1;
                a.globalCompositeOperation = "source-over";
              }
            }
          }
        })(a, n, d, b);
        (function (a, o, t, l, e) {
          var n = f.song;
          var r = f.tinh;
          var v = .82 + .18 * Math.sin(1.9 * l);
          var d = 1 - f.giao;
          var p = l - f.chetT;
          var m = l - f.hoiT;
          var b = l - f.pulseT;
          var M = n * (.3 + .26 * f.near + .34 * f.dong + .16 * f.gian) * v;
          var y = p >= 0 && p < 3.2 ? 1 - i(0, 3.2, p) : 0;
          var x = .16 * r * (.75 + .25 * Math.sin(.9 * l));
          var C = m >= 0 && m < 2.4 ? 1 - i(0, 2.4, m) : 0;
          var w = b >= 0 && b < 1.3 ? 1 - i(0, 1.3, b) : 0;
          var T = l - f.cuongT;
          var k = T >= 0 && T < 1.2 ? 1 - i(0, 1.2, T) : 0;
          if ((V(f.tam.x, f.tam.y, 200) || !(y <= 0)) && !(M < .01 && y <= 0 && x < .01 && C <= 0 && w <= 0 && k <= 0 && f.chiec < .01)) {
            var O;
            var R = F();
            var P = Math.round(f.tam.x - R.ox - o);
            var I = Math.round(f.tam.y - R.oy - t);
            a.imageSmoothingEnabled = !1;
            a.globalCompositeOperation = "lighter";
            if ((O = M * (1 - d) * .9) > .01) {
              a.globalAlpha = h(O, 0, 1);
              a.drawImage(R.lanh, P, I, R.W, R.H);
            }
            if ((O = M * d + .7 * C + .8 * w + .6 * k) > .01) {
              a.globalCompositeOperation = "source-over";
              a.globalAlpha = h(.95 * O, 0, 1);
              a.drawImage(R.tham, P, I, R.W, R.H);
              a.globalCompositeOperation = "lighter";
              a.globalAlpha = h(.66 * O, 0, 1);
              a.drawImage(R.loi, P, I, R.W, R.H);
            }
            if ((O = y * y * .75 + .5 * f.chiec + .35 * C + .3 * w + .4 * k) > .01) {
              a.globalAlpha = h(O, 0, 1);
              a.drawImage(R.trang, P, I, R.W, R.H);
            }
            if ((O = .55 * y) > .01) {
              a.globalAlpha = h(O, 0, 1);
              a.drawImage(R.loi, P, I, R.W, R.H);
            }
            if ((O = x) > .01) {
              a.globalAlpha = O;
              a.drawImage(R.lanh, P, I, R.W, R.H);
            }
            var E = n > .05 ? n : y > 0 ? y : 0;
            if (E > .02 && e >= 2 && !f.crowd) {
              var W = R.run.getContext("2d");
              var H = s.d;
              var D = R.run.width;
              var _ = D / 2;
              var X = l * (1.05 + 1.5 * f.dong + 1.2 * f.gian);
              W.setTransform(1, 0, 0, 1, 0, 0);
              W.globalCompositeOperation = "source-over";
              W.clearRect(0, 0, D, D);
              for (var Y = 0; Y < 4; Y++) {
                var q = X - .42 * Y;
                W.fillStyle = "rgba(255,255,255," + (.95 - .24 * Y).toFixed(2) + ")";
                W.beginPath();
                W.moveTo(_, _);
                W.arc(_, _, 60 * H, q - .42, q, !1);
                W.closePath();
                W.fill();
                var G = X + g - .42 * Y;
                W.beginPath();
                W.moveTo(_, _);
                W.arc(_, _, 60 * H, G - .42, G, !1);
                W.closePath();
                W.fill();
              }
              W.globalCompositeOperation = "destination-in";
              W.drawImage(R.que, 0, 0);
              W.globalCompositeOperation = "source-atop";
              W.fillStyle = S(A(c.lanhSang, c.vang, d));
              W.fillRect(0, 0, D, D);
              W.globalCompositeOperation = "source-over";
              a.globalAlpha = h(E * (.7 + .3 * f.dong), 0, 1);
              a.drawImage(R.run, Math.round(f.tam.x - u - o), Math.round(f.tam.y - u - t), 108, 108);
            }
            a.globalAlpha = 1;
            a.globalCompositeOperation = "source-over";
          }
        })(a, n, d, b, M);
        (function (a, o, t, l) {
          var e;
          var n = f.waves;
          if (n.length) {
            for (a.globalCompositeOperation = "lighter", a.imageSmoothingEnabled = !0, e = n.length - 1; e >= 0; e--) {
              var r = n[e];
              var i = l - r.t0;
              if (!(i < 0))
                if (i >= r.life) {
                  n.splice(e, 1);
                }
                else {
                  var h = i / r.life;
                  var g = r.r0 + (r.r1 - r.r0) * (1 - (1 - h) * (1 - h));
                  var c = Math.round(r.x - o);
                  var s = Math.round(r.y - t);
                  if (!(c < -g - 8 || c > f.vw + g + 8 || s < .5 * -g - 8 || s > f.vh + .5 * g + 8)) {
                    var u = Math.pow(1 - h, 1.3) * r.a;
                    a.globalAlpha = u;
                    a.strokeStyle = S(r.cA);
                    a.lineWidth = r.lw * (1 - .4 * h);
                    a.beginPath();
                    a.ellipse(c, s, g, .5 * g, 0, 0, v);
                    a.stroke();
                    a.globalAlpha = .6 * u;
                    a.strokeStyle = S(r.cB);
                    a.lineWidth = 1;
                    a.beginPath();
                    a.ellipse(c, s, .72 * g, .36 * g, 0, 0, v);
                    a.stroke();
                  }
                }
            }
            a.globalAlpha = 1;
            a.globalCompositeOperation = "source-over";
          }
        })(a, n, d, b);
        a.imageSmoothingEnabled = !0;
        var x = f.boss;
        var w = 1;
        if (f.song > .02 && x && V(x.x, x.y, 140)) {
          var T = Math.round(x.x - n);
          var k = Math.round(x.y - 22 - d);
          var R = 1 - f.giao;
          var I = .85 + .15 * Math.sin(2.4 * b);
          a.globalCompositeOperation = "source-over";
          P(a, "tham", T, k, 70 + 16 * f.dong, f.song * (.16 + .28 * f.dong + .18 * f.gian) * I * (.4 + .6 * R), .5);
          a.globalCompositeOperation = "lighter";
          P(a, "vang", T, k, 34, f.song * (.1 + .18 * f.dong) * I * (.35 + .65 * R), .5);
          P(a, "lanh", T, k, 58, f.song * f.giao * .2 * I, .5);
          a.globalCompositeOperation = "source-over";
        }
        for (a.globalCompositeOperation = "lighter", w = 0; w < f.ho.length; w++) {
          var E = f.ho[w];
          if (Q(E) && V(E.x, E.y, 80)) {
            P(a, "lanh", Math.round(E.x - n), Math.round(E.y - 2 - d), 30, .16 + .05 * Math.sin(2 * b + w), .5);
          }
        }
        if (M >= 2 && !f.crowd) {
          (function (a, t, l, n) {
            var r = o.vatThem;
            if (r && r.length) {
              a.globalCompositeOperation = "lighter";
              a.imageSmoothingEnabled = !0;
              for (var i = 0; i < r.length; i++) {
                var h = r[i];
                var g = 0 === h.name.indexOf("tl_tinh_the");
                var v = "tl_xe_mo" === h.name && 0 === h.v;
                if (g || v) {
                  var c = h.tx * e + 16;
                  var s = (h.ty + 1) * e - 4;
                  if (V(c, s, 50)) {
                    var u = .8 + .2 * Math.sin(1.7 * n + 2.3 * i);
                    P(a, "lanh", Math.round(c - t), Math.round(s - 5 - l), v ? 26 : 30, (v ? .13 : .19) * u, .6);
                    P(a, "lanhSang", Math.round(c - t), Math.round(s - 12 - l), 12, .13 * u, .9);
                  }
                }
              }
              a.globalAlpha = 1;
              a.globalCompositeOperation = "source-over";
            }
          })(a, n, d, b);
        }
        a.restore();
        a.globalAlpha = 1;
        a.globalCompositeOperation = "source-over";
      }
    };
    var m = [[6.2, 24.2, .3], [13, 20.8, 1.7], [19.5, 17, 3.1], [25, 13.6, 4.4], [9.5, 27, 5.5], [29.5, 15.6, 2.4]];
    var b = [[3.9, 26.7, 1.8], [8.6, 24.9, .5], [14.4, 22.4, 2.9], [20.2, 19.4, 4.1], [25.6, 16.2, 1.1], [30.4, 12.4, 3.6], [35.2, 4.6, 5.2]];
    o.drawFx = function (a, t, u, d, p, M, y, x) {
      var A = t && t.data;
      if (A && A.id === l && !(x < 1)) {
        if (!(f && f.data === A)) {
          f = J(A);
        }
        O();
        f.camX = u;
        f.camY = d;
        f.vw = p;
        f.vh = M;
        if (f.tgFx !== y) {
          f.tgFx = y;
          if (f.tgGround !== y) {
            f.tgGround = y;
            ra(y, x);
          }
        }
        var R = x >= 2 && !f.crowd ? 2 : 1;
        a.save();
        if (R >= 2) {
          (function (a, o, t, l, e, n) {
            var r = N();
            var i = 768;
            var h = .16 + .1 * f.song * f.near - .06 * f.tinh;
            if (!((h *= .9 + .1 * Math.sin(.13 * n)) < .01)) {
              var g = -T(o - 7 * n, i);
              var v = -T(t - 3.2 * n, i);
              a.imageSmoothingEnabled = !0;
              a.globalCompositeOperation = "source-over";
              a.globalAlpha = h;
              for (var c = g; c < l; c += i)
                for (var s = v; s < e; s += i)
                  a.drawImage(r, Math.round(c), Math.round(s), i, i);
              a.globalAlpha = 1;
            }
          })(a, u, d, p, M, y);
          (function (a, o, t, l, n, r) {
            var i = U();
            var h = (1 - .7 * f.song * f.near + .5 * f.tinh) * (1 - .9 * f.troi) * (1 + .6 * f.nang);
            if (!(h < .05)) {
              a.globalCompositeOperation = "lighter";
              a.imageSmoothingEnabled = !0;
              for (var g = 0; g < m.length; g++) {
                var v = m[g];
                var c = v[0] * e + 7 * Math.sin(.11 * r + v[2]);
                var s = v[1] * e;
                if (!(c < o - 90 || c > o + l + 90 || s < t - 110 || s > t + n + 110)) {
                  var u = .26 * h * (.55 + .45 * Math.sin(.36 * r + 2.1 * v[2]));
                  if (!(u < .006)) {
                    a.globalAlpha = u;
                    a.drawImage(i, Math.round(c - 28 - o), Math.round(s - 100 - t), 96, 300);
                  }
                }
              }
              a.globalAlpha = 1;
              a.globalCompositeOperation = "source-over";
            }
          })(a, u, d, p, M, y);
          (function (a, o, t, l, r, i) {
            var h = L();
            a.imageSmoothingEnabled = !0;
            a.globalCompositeOperation = "source-over";
            for (var g = 0; g < b.length; g++) {
              var v = b[g];
              var c = 1.7 + .5 * n(g, 41, 2);
              var s = h.W * c;
              var u = h.H * c * .9;
              var d = v[0] * e + 26 * Math.sin(.07 * i + v[2]) - s / 2;
              var p = v[1] * e - .62 * u;
              if (!(d > o + l || d + s < o || p > t + r || p + u < t)) {
                var m = (0 === g ? .17 : .1) * (.7 + .3 * Math.sin(.17 * i + 3 * v[2])) * (1 - .5 * f.song * f.near);
                if (!(m < .008)) {
                  a.globalAlpha = m;
                  a.drawImage(h.c, Math.round(d - o), Math.round(p - t), Math.round(s), Math.round(u));
                }
              }
            }
            a.globalAlpha = 1;
          })(a, u, d, p, M, y);
          (function (a, o, t, l, e) {
            if (!(e < 2)) {
              var n = f.song * (.1 + .1 * f.giao + .06 * f.dong) * (.4 + .6 * f.near);
              if (!((n += .03 * f.tinh) < .008)) {
                var r = L();
                var i = f.H.dai;
                var h = i.x0 - 30;
                var g = i.x1 + 30;
                var v = i.y0 - 20;
                var c = i.y1 + 60;
                if (!(g < o || h > o + f.vw || c < t || v > t + f.vh)) {
                  a.save();
                  a.beginPath();
                  a.rect(Math.round(h - o), Math.round(v - t), Math.round(g - h), Math.round(c - v));
                  a.clip();
                  a.imageSmoothingEnabled = !0;
                  a.globalCompositeOperation = "source-over";
                  for (var s = 1.5 * r.W, u = 1.5 * r.H, d = 0; d < 2; d++) {
                    var p = -(l * (5 + 4 * d) + 60 * d) % s;
                    var m = (d ? 24 : 0) + 5 * Math.sin(.15 * l + d);
                    a.globalAlpha = n * (d ? .7 : 1);
                    for (var b = p; b < g - h + s; b += s)
                      for (var M = 0; M < c - v + u; M += u)
                        a.drawImage(r.c, Math.round(h - o + b), Math.round(v - t + M + m - (d ? 30 : 0)), s, u);
                  }
                  a.restore();
                  a.globalAlpha = 1;
                }
              }
            }
          })(a, u, d, y, R);
        }
        (function (a, o, t, l, e) {
          var n = f.H.lo;
          if (n && n.length) {
            var i;
            var h = f.song;
            var v = f.tinh;
            var s = l - f.chetT;
            var u = f.giao > .5;
            var d = l - f.flareT;
            var p = d >= 0 && d < 1.6 ? Math.exp(2.2 * -d) : 0;
            for (i = 0; i < n.length; i++) {
              var m = n[i][0];
              var b = n[i][1] + 1;
              if (V(m, b, 60)) {
                var M = Math.round(m - o);
                var y = Math.round(b - t - 3);
                var S = 1.7 * i;
                if (h > .03) {
                  var x = (13 + 5 * f.dong + 4 * f.gian + 11 * p) * h;
                  a.globalCompositeOperation = "lighter";
                  a.imageSmoothingEnabled = !0;
                  P(a, u ? "lanh" : "nong", M, y - 6, 26 + 8 * f.dong + 10 * p, (.34 + .3 * p) * h, .8);
                  P(a, u ? "lanhSang" : "vang", M, y - 4, 12 + 5 * p, (.34 + .25 * p) * h, .8);
                  a.imageSmoothingEnabled = !1;
                  a.globalCompositeOperation = "source-over";
                  var A = B(u);
                  var T = x / 18;
                  var k = 9 * l + 2 * i & 7;
                  if (a.globalAlpha = h, a.drawImage(A[k], M - Math.round(12 * T), y - Math.round(37 * T), Math.round(24 * T), Math.round(40 * T)), e >= 2) {
                    a.globalCompositeOperation = "lighter";
                    for (var O = 0; O < 3; O++) {
                      var R = w(l * (.9 + .2 * O) + .3 * S + O / 3);
                      a.globalAlpha = .9 * Math.sin(R * g) * h;
                      a.fillStyle = u ? "rgb(225,240,255)" : C(c.vang, c.nong, R);
                      a.fillRect(M + Math.round(4 * Math.sin(6 * R + O + S)) - 1, Math.round(y - x - 22 * R), 1, 1);
                    }
                  }
                  a.globalAlpha = 1;
                  a.globalCompositeOperation = "source-over";
                }
                else if (v > .05 || s < 5) {
                  var I = s >= 0 ? r(1 - s / 5) : .2;
                  if (a.globalCompositeOperation = "lighter", a.imageSmoothingEnabled = !0, P(a, "nong", M, y - 3, 12, .38 * I, .6), a.imageSmoothingEnabled = !1, a.globalCompositeOperation = "source-over", e >= 2) {
                    a.fillStyle = "rgb(170,178,190)";
                    for (var E = 0; E < 3; E++) {
                      var W = w(.18 * l + E / 3 + .21 * i);
                      a.globalAlpha = .18 * Math.sin(W * g) * r(v + .3);
                      a.fillRect(M - 1 + Math.round(3 * Math.sin(5 * W + E + i)), Math.round(y - 6 - 28 * W), 2, 2);
                    }
                  }
                }
              }
            }
            a.globalAlpha = 1;
            a.globalCompositeOperation = "source-over";
          }
        })(a, u, d, y, R);
        (function (a, o, t, l, e) {
          if (!(e < 2 || f.giao < .05)) {
            a.globalCompositeOperation = "lighter";
            a.imageSmoothingEnabled = !1;
            for (var n = 0; n < f.ho.length; n++) {
              var r = f.ho[n];
              if (Q(r) && V(r.x, r.y, 50)) {
                for (var i = 0; i < 6; i++) {
                  var h = w(.5 * l + i / 6 + .13 * n);
                  var v = r.x + 9 * Math.sin(7 * h + 1.7 * i + n);
                  var c = r.y - 8 - 38 * h;
                  a.globalAlpha = .65 * Math.sin(h * g) * f.giao;
                  a.fillStyle = 1 & i ? "rgb(228,244,255)" : "rgb(150,200,255)";
                  a.fillRect(Math.round(v - o), Math.round(c - t), 1, i % 3 == 0 ? 2 : 1);
                }
              }
            }
            a.globalAlpha = 1;
            a.globalCompositeOperation = "source-over";
          }
        })(a, u, d, y, R);
        (function (a, o, t, l, e) {
          var n = f.boss;
          if (n && !(f.giao < .02)) {
            var r = f.giao;
            var i = Math.round(n.x - o);
            var h = Math.round(n.y - 22 - t);
            if (!(i < -140 || i > f.vw + 140 || h < -140 || h > f.vh + 140)) {
              var c = h - 32;
              var s = 46;
              var u = 52;
              a.imageSmoothingEnabled = !0;
              a.globalCompositeOperation = "lighter";
              var d = .86 + .14 * Math.sin(3.2 * l);
              var p = a.createRadialGradient(i, c, 11.5, i, c, 46.92);
              p.addColorStop(0, "rgba(120,180,255,0)");
              p.addColorStop(.7, "rgba(120,180,255," + (.05 * r).toFixed(3) + ")");
              p.addColorStop(1, "rgba(170,215,255," + (.3 * r * d).toFixed(3) + ")");
              a.save();
              a.translate(i, c);
              a.scale(1, u / s);
              a.translate(-i, -c);
              a.fillStyle = p;
              a.beginPath();
              a.arc(i, c, 46.92, 0, v);
              a.fill();
              a.restore();
              a.save();
              a.beginPath();
              a.ellipse(i, c, s, u, 0, 0, v);
              a.clip();
              a.globalAlpha = .14 * r;
              a.fillStyle = "rgb(200,230,255)";
              for (var m = 0; m < 4; m++) {
                var b = i - s + (2.6 * w(.32 * l + .27 * m) - .8) * s * 2;
                a.beginPath();
                a.moveTo(b, c - u);
                a.lineTo(b + 9, c - u);
                a.lineTo(b - 18, c + u);
                a.lineTo(b - 27, c + u);
                a.closePath();
                a.fill();
              }
              a.restore();
              a.globalAlpha = .3 * r * d;
              a.strokeStyle = "rgb(150,205,255)";
              a.lineWidth = 2.6;
              a.beginPath();
              a.ellipse(i, c, s, u, 0, 0, v);
              a.stroke();
              a.globalAlpha = .5 * r * d;
              a.strokeStyle = "rgb(205,232,255)";
              a.lineWidth = .9;
              a.beginPath();
              a.ellipse(i, c, s, u, 0, 0, v);
              a.stroke();
              a.globalAlpha = .95 * r;
              a.strokeStyle = "rgb(250,253,255)";
              a.lineWidth = 1.5;
              a.beginPath();
              a.ellipse(i, c, 45, 51, 0, 1.08 * g, 1.4 * g);
              a.stroke();
              var M = 1.3 * l;
              a.globalAlpha = .85 * r;
              a.beginPath();
              a.ellipse(i, c, s, u, 0, M, M + .5);
              a.stroke();
              a.beginPath();
              a.ellipse(i, c, s, u, 0, M + g, M + g + .5);
              a.stroke();
              a.globalAlpha = .7 * r;
              a.strokeStyle = "rgb(160,205,255)";
              a.lineWidth = 1.2;
              a.beginPath();
              a.ellipse(i, h, 44, 15, 0, 0, g);
              a.stroke();
              a.fillStyle = "rgb(235,246,255)";
              for (var y = e >= 2 ? 10 : 6, S = 0; S < y; S++) {
                var x = .8 * l + S / y * v;
                var A = Math.sin(x);
                if (!(A < 0)) {
                  a.globalAlpha = r * (.35 + .65 * A);
                  a.fillRect(Math.round(i + 44 * Math.cos(x)) - 1, Math.round(h + 15 * A) - 1, 2, 2);
                }
              }
              a.imageSmoothingEnabled = !1;
              for (var C = i, T = h - 38, k = 0; k < f.ho.length; k++) {
                var O = f.ho[k];
                if (Q(O)) {
                  var R = Math.round(O.x - o);
                  var P = Math.round(O.y - 16 - t);
                  var I = (R + C) / 2;
                  var E = Math.min(P, T) - 22 - .08 * Math.abs(R - C);
                  a.globalAlpha = .38 * r;
                  a.strokeStyle = "rgb(150,200,255)";
                  a.lineWidth = 1.4;
                  a.beginPath();
                  a.moveTo(R, P);
                  a.quadraticCurveTo(I, E, C, T);
                  a.stroke();
                  a.globalAlpha = .7 * r;
                  a.strokeStyle = "rgb(235,246,255)";
                  a.lineWidth = .7;
                  a.beginPath();
                  a.moveTo(R, P);
                  a.quadraticCurveTo(I, E, C, T);
                  a.stroke();
                  a.fillStyle = "rgb(255,255,255)";
                  for (var W = 0; W < 3; W++) {
                    var H = w(.55 * l + W / 3 + .19 * k);
                    var D = 1 - H;
                    var _ = D * D * R + 2 * D * H * I + H * H * C;
                    var X = D * D * P + 2 * D * H * E + H * H * T;
                    a.globalAlpha = r * Math.sin(H * g);
                    a.fillRect(Math.round(_) - 1, Math.round(X) - 1, 3, 3);
                    a.globalAlpha = r * Math.sin(H * g) * .4;
                    a.fillRect(Math.round(_) - 2, Math.round(X) - 2, 5, 5);
                  }
                }
              }
              a.globalAlpha = 1;
              a.globalCompositeOperation = "source-over";
            }
          }
        })(a, u, d, y, R);
        (function (a, o, t, l, e) {
          var r = f.boss;
          if (r && !(f.song < .03)) {
            var i = Math.round(r.x - o);
            var h = Math.round(r.y - 22 - t);
            if (!(i < -120 || i > f.vw + 120 || h < -120 || h > f.vh + 120)) {
              var s;
              var u;
              var d = f.song;
              var p = 1 - .75 * f.giao;
              var m = f.dong;
              var b = f.gian;
              var M = d * (.35 + .5 * m + .3 * b) * p;
              for (a.imageSmoothingEnabled = !1, a.globalCompositeOperation = "lighter", u = e >= 2 ? 4 + Math.round(4 * b) : 3, s = 0; s < u; s++) {
                var y = (s % 2 ? -1 : 1) * (.9 + s % 3 * .35 + .6 * b);
                var x = l * y + s * v / u;
                var A = 27 + s % 3 * 7 + 2.5 * Math.sin(1.3 * l + s);
                var T = h - 34;
                a.lineCap = "round";
                for (var k = 0; k < 2; k++) {
                  a.strokeStyle = S(k ? c.vang : c.nong);
                  a.lineWidth = k ? 1 : 2.4;
                  a.globalAlpha = M * (k ? .7 : .5) * (.65 + .35 * Math.sin(2.7 * l + 1.9 * s));
                  a.beginPath();
                  for (var O = .95 + s % 2 * .25, R = 0; R <= 8; R++) {
                    var I = x + (y > 0 ? 1 : -1) * R / 8 * O;
                    var E = A * (1 - .14 * R / 8);
                    var W = i + Math.cos(I) * E * 1.05;
                    var H = T + Math.sin(I) * E * .92;
                    if (0 === R) {
                      a.moveTo(W, H);
                    }
                    else {
                      a.lineTo(W, H);
                    }
                  }
                  a.stroke();
                }
              }
              for (u = e >= 2 ? 10 + Math.round(12 * m) + Math.round(6 * b) : 6, s = 0; s < u; s++) {
                var D = n(s, 11, 3);
                var _ = w(l / (1.3 + 1.3 * n(s, 12, 3)) + D);
                var X = n(s, 13, 3) * v;
                var Y = 8 + 26 * n(s, 14, 3);
                var q = i + Math.cos(X) * Y + 3.5 * Math.sin(1.6 * l + 2.3 * s);
                var F = h - 8 - Math.sin(X) * Y * .4 - _ * (30 + 50 * n(s, 15, 3));
                a.globalAlpha = Math.sin(_ * g) * (.55 + .4 * m) * d * p;
                a.fillStyle = C(c.vang, c.nong, _);
                var G = _ < .5 && s % 3 == 0 ? 2 : 1;
                a.fillRect(Math.round(q), Math.round(F), G, G);
              }
              a.imageSmoothingEnabled = !0;
              var B = d * (.05 + .1 * m + .12 * b) * p;
              P(a, "do", i + Math.round(6 * Math.sin(.7 * l)), h + 4, 46 + 16 * b, B, .32);
              a.globalAlpha = 1;
              a.globalCompositeOperation = "source-over";
            }
          }
        })(a, u, d, y, R);
        (function (a, o, t, l, e) {
          var h = f.boss;
          if (!(!h || f.gian < .35 || f.song < .5 || e < 2)) {
            var g = Math.floor(l / 5.2);
            var v = l - 5.2 * g;
            if (!(v > .55 || n(g, 5, 9) > .35 + .55 * f.gian)) {
              var s = h.x - o + 70 * (n(g, 6, 9) - .5);
              var u = h.y - 60 - t + 24 * (n(g, 7, 9) - .5);
              if (!(s < -80 || s > f.vw + 80 || u < -80 || u > f.vh + 80)) {
                var d = r(v / .12);
                var p = 1 - i(.12, .55, v);
                var m = .5 * (n(g, 8, 9) - .5) - .9;
                var b = Math.cos(m);
                var M = Math.sin(m);
                a.globalCompositeOperation = "lighter";
                a.imageSmoothingEnabled = !0;
                a.lineCap = "round";
                for (var y = -1; y <= 1; y++) {
                  var x = s + -M * y * 7;
                  var A = u + b * y * 7;
                  var C = 56 - 8 * Math.abs(y);
                  var w = x - b * C * .5;
                  var T = A - M * C * .5;
                  var k = w + b * C * d;
                  var O = T + M * C * d;
                  a.strokeStyle = S(c.nong);
                  a.lineWidth = 3.2;
                  a.globalAlpha = .55 * p;
                  a.beginPath();
                  a.moveTo(w, T);
                  a.lineTo(k, O);
                  a.stroke();
                  a.strokeStyle = S(c.trang);
                  a.lineWidth = 1.1;
                  a.globalAlpha = .95 * p;
                  a.beginPath();
                  a.moveTo(w, T);
                  a.lineTo(k, O);
                  a.stroke();
                }
                a.globalAlpha = 1;
                a.globalCompositeOperation = "source-over";
              }
            }
          }
        })(a, u, d, y, R);
        (function (a, o, t, l, e) {
          var r = l - f.chetT;
          if (!(r < 0 || r > 70)) {
            var h = Math.round(f.chetX - o);
            var u = Math.round(f.chetY - 22 - t);
            if (!(h < -200 || h > f.vw + 200 || u < -260 || u > f.vh + 260)) {
              var d;
              var p = (s.cot || (s.cot = q("cot", _)), s.cot);
              var m = z(l) ? .45 : 1;
              if (a.globalCompositeOperation = "lighter", a.imageSmoothingEnabled = !0, r < .55) {
                var b = 1 - r / .55;
                P(a, "trang", h, u - 36, 84 + 70 * (1 - b), b * b * .62 * m, 1);
                P(a, "vang", h, u - 30, 120 * (.5 + r), .5 * b * m, 1);
              }
              for (d = 0; d < 3; d++) {
                var M = r - .28 * d;
                if (!(M < 0 || M > 1.6)) {
                  var y = M / 1.6;
                  var x = 12 + 200 * y;
                  a.globalAlpha = (1 - y) * (.8 - .18 * d);
                  a.strokeStyle = S(1 === d ? c.vang : c.trang);
                  a.lineWidth = 2.2 - .5 * d;
                  a.beginPath();
                  a.ellipse(h, u, x, .5 * x, 0, 0, v);
                  a.stroke();
                }
              }
              if (r < 4.2) {
                var A = 4 + 20 * Math.sin(i(0, .6, r) * g * .5) * (1 - .8 * i(1.4, 4.2, r));
                var w = 40 + 250 * i(0, 1.5, r);
                var T = i(0, .25, r) * (1 - i(1.7, 4.2, r));
                a.globalAlpha = .9 * T;
                a.drawImage(p, h - 1.5 * A, u - w, 3 * A, w);
                a.globalAlpha = .55 * T;
                a.drawImage(p, h - .55 * A, u - 1.06 * w, 1.1 * A, 1.06 * w);
                P(a, "vang", h, u - 6, 30 + 14 * T, .35 * T, .5);
              }
              a.imageSmoothingEnabled = !1;
              var k = e >= 2 ? 52 : 24;
              for (d = 0; d < k; d++) {
                var O = (r - (.04 + .95 * n(d, 21, 4))) / (1.6 + 1.2 * n(d, 22, 4));
                if (!(O <= 0 || O >= 1)) {
                  var R = n(d, 23, 4) * v + 5.5 * O;
                  var I = 4 + 26 * Math.sqrt(O) * (.5 + n(d, 24, 4));
                  var E = h + Math.cos(R) * I;
                  var W = u - 4 - 150 * Math.pow(O, .85) + Math.sin(R) * I * .3;
                  a.globalAlpha = .95 * Math.sin(O * g);
                  a.fillStyle = C(c.trang, c.vang, O);
                  var H = d % 4 == 0 ? 2 : 1;
                  a.fillRect(Math.round(E), Math.round(W), H, H);
                }
              }
              if (r > 2.5 && e >= 2) {
                var D = i(2.5, 6, r) * (1 - i(20, 70, r)) * .15;
                if (D > .004) {
                  var X = Math.round(f.tam.x - o);
                  var Y = Math.round(f.tam.y - t);
                  for (a.imageSmoothingEnabled = !0, d = 0; d < 3; d++)
                    for (var F = X - 122 + 90 * d + 4 * Math.sin(.3 * l + d), G = 0; G < 3; G++) {
                      var B = 9 * (2 - G);
                      var L = D * (.3 + .3 * G);
                      var N = a.createLinearGradient(F, Y - 150, F + 70, Y + 60);
                      N.addColorStop(0, "rgba(255,232,170,0)");
                      N.addColorStop(.35, "rgba(255,232,170," + L.toFixed(3) + ")");
                      N.addColorStop(1, "rgba(255,232,170,0)");
                      a.globalAlpha = 1;
                      a.fillStyle = N;
                      a.beginPath();
                      a.moveTo(F - B, Y - 150);
                      a.lineTo(F + 34 + B, Y - 150);
                      a.lineTo(F + 34 + 70 + B, Y + 60);
                      a.lineTo(F + 70 - 26 - B, Y + 60);
                      a.closePath();
                      a.fill();
                    }
                }
              }
              a.globalAlpha = 1;
              a.globalCompositeOperation = "source-over";
            }
          }
        })(a, u, d, y, R);
        (function (a, o, t, l, e) {
          if (!(f.tinh < .05 || e < 2)) {
            var r = f.tam.x;
            var i = f.tam.y;
            if (V(r, i, 160)) {
              a.globalCompositeOperation = "lighter";
              a.imageSmoothingEnabled = !1;
              for (var h = 0; h < 12; h++) {
                var s = n(h, 31, 4);
                var u = w(l / (3 + 2.5 * n(h, 32, 4)) + s);
                var d = n(h, 33, 4) * v;
                var p = 20 + 34 * n(h, 34, 4);
                var m = r + Math.cos(d) * p;
                var b = i + Math.sin(d) * p * .5 - 44 * u;
                a.globalAlpha = .7 * Math.sin(u * g) * f.tinh;
                a.fillStyle = C(c.lanhSang, c.vang, .35 + .4 * u);
                a.fillRect(Math.round(m - o), Math.round(b - t), 1, 1);
                if (h % 3 == 0) {
                  a.fillRect(Math.round(m - o) - 1, Math.round(b - t), 3, 1);
                }
              }
              a.globalAlpha = 1;
              a.globalCompositeOperation = "source-over";
            }
          }
        })(a, u, d, y, R);
        (function (a, o, t, l) {
          var e;
          var n;
          var r;
          var i;
          var h;
          var g;
          var v = f.hat;
          for (e = v.length - 1; e >= 0; e--)
            (r = l - (n = v[e]).t0) < 0 || r >= n.life && (v.splice(e, 1), 1 === n.k && (oa(n.x, n.y, 3, 9 + 2 * n.s, l, .8, .3), la(n.x, n.y, l, n.sd)));
          for (e = 0; e < v.length; e++)
            if (!((r = l - (n = v[e]).t0) < 0))
              if (i = r / n.life, 0 === n.k) {
                a.globalCompositeOperation = "lighter";
                a.imageSmoothingEnabled = !1;
                var c = n.x + n.vx * r;
                var s = n.y + n.vy * r + 90 * r * r;
                if (h = Math.round(c - o), g = Math.round(s - t), h < -20 || h > f.vw + 20 || g < -20 || g > f.vh + 20) {
                  continue;
                }
                a.fillStyle = n.c ? "rgb(225,242,255)" : "rgb(130,185,250)";
                a.globalAlpha = (1 - i) * (1 - .4 * i);
                var u = n.s;
                a.save();
                a.translate(h, g);
                a.rotate(n.rot + n.vr * r);
                a.beginPath();
                a.moveTo(-u, .4 * -u);
                a.lineTo(u, 0);
                a.lineTo(.3 * -u, .9 * u);
                a.closePath();
                a.fill();
                a.restore();
              }
              else if (1 === n.k) {
                var d = n.y - n.cao + .5 * n.g * r * r;
                if (h = Math.round(n.x - o), g = Math.round(d - t), h < -10 || h > f.vw + 10 || g < -10 || g > f.vh + 10) {
                  continue;
                }
                a.globalCompositeOperation = "source-over";
                a.imageSmoothingEnabled = !1;
                a.globalAlpha = 1;
                var p = n.s;
                a.fillStyle = "rgb(96,90,82)";
                a.fillRect(h, g, p, p);
                a.fillStyle = "rgb(176,168,150)";
                a.fillRect(h, g, Math.max(1, p - 1), 1);
                a.globalAlpha = .28;
                a.fillStyle = "rgb(206,192,168)";
                a.fillRect(h, g - 5, 1, 5);
              }
              else if (2 === n.k) {
                if (h = Math.round(n.x - o), g = Math.round(n.y - t - 7 * i), h < -40 || h > f.vw + 40 || g < -40 || g > f.vh + 40) {
                  continue;
                }
                var m = n.r0 + (n.r1 - n.r0) * (1 - (1 - i) * (1 - i));
                a.globalCompositeOperation = "source-over";
                a.imageSmoothingEnabled = !0;
                P(a, "bui", h, g, m, n.a * Math.pow(1 - i, 1.4), .62);
              }
              else if (5 === n.k) {
                var b = n.x + n.vx * r;
                var M = n.y + n.vy * r + 150 * r * r;
                if (M > n.y0 && (M = n.y0), h = Math.round(b - o), g = Math.round(M - t), h < -10 || h > f.vw + 10 || g < -10 || g > f.vh + 10) {
                  continue;
                }
                a.globalCompositeOperation = "source-over";
                a.imageSmoothingEnabled = !1;
                a.globalAlpha = 1 - i * i;
                a.fillStyle = "rgb(120,112,100)";
                a.fillRect(h, g, 1, 1);
              }
          var y = l - f.vaT;
          if (y >= 0 && y < .7) {
            var S = y / .7;
            a.globalCompositeOperation = "lighter";
            a.imageSmoothingEnabled = !0;
            P(a, "lanhSang", Math.round(f.vaX - o), Math.round(f.vaY - t), 70 * (1 - .4 * S), .7 * (1 - S), 1);
          }
          a.globalAlpha = 1;
          a.globalCompositeOperation = "source-over";
        })(a, u, d, y);
        if (R >= 2) {
          (function (a, o, t, l, e, r, i) {
            var h = i >= 2 ? 34 : 0;
            if (h) {
              var g = l + 40;
              var v = e + 40;
              var c = 1 - .55 * f.song * f.near;
              a.globalCompositeOperation = "lighter";
              a.imageSmoothingEnabled = !1;
              for (var s = 0; s < h; s++) {
                var u = n(s, 61, 1);
                var d = n(s, 62, 1);
                var p = n(s, 63, 1);
                var m = u * g * 3 + r * (2.6 + 3 * p) + 5 * Math.sin(.5 * r + 2.1 * s);
                var b = d * v * 3 - r * (1 + 1.5 * p) + 4 * Math.sin(.37 * r + s);
                var M = o - 20 + T(m - o, g);
                var y = t - 20 + T(b - t, v);
                var S = (.2 + .55 * (.5 + .5 * Math.sin(r * (1.1 + p) + 3.3 * s))) * c;
                a.globalAlpha = S;
                a.fillStyle = p > .7 ? "rgb(255,244,214)" : "rgb(232,222,196)";
                var x = Math.round(M - o);
                var A = Math.round(y - t);
                a.fillRect(x, A, 1, 1);
                if (p > .82 && S > .5) {
                  a.globalAlpha = .4 * S;
                  a.fillRect(x - 1, A, 3, 1);
                  a.fillRect(x, A - 1, 1, 3);
                }
              }
              a.globalAlpha = 1;
              a.globalCompositeOperation = "source-over";
            }
          })(a, u, d, p, M, y, R);
          (function (a, t, l, r, i) {
            var h = o.vatThem;
            if (h && h.length && !(i < 2)) {
              a.globalCompositeOperation = "lighter";
              a.imageSmoothingEnabled = !1;
              for (var g = 0; g < h.length; g++) {
                var c = h[g];
                if (0 === c.name.indexOf("tl_tinh_the") || "tl_xe_mo" === c.name && 0 === c.v) {
                  var s = c.tx * e + 16;
                  var u = (c.ty + 1) * e - 4;
                  if (V(s, u, 40)) {
                    for (var f = 0; f < 2; f++) {
                      var d = n(g, f, 71) * v;
                      var p = Math.sin(r * (.9 + .35 * f) + d);
                      if (!(p < .9)) {
                        var m = (p - .9) / .1;
                        var b = Math.round(s + 18 * (n(g, f, 72) - .5) - t);
                        var M = Math.round(u - 12 - 14 * n(g, f, 73) - l);
                        a.globalAlpha = m;
                        a.fillStyle = "rgb(255,255,255)";
                        a.fillRect(b, M, 1, 1);
                        a.globalAlpha = .7 * m;
                        a.fillStyle = "rgb(190,232,255)";
                        a.fillRect(b - 2, M, 5, 1);
                        a.fillRect(b, M - 2, 1, 5);
                        a.globalAlpha = .35 * m;
                        a.fillRect(b - 3, M, 7, 1);
                        a.fillRect(b, M - 3, 1, 7);
                      }
                    }
                  }
                }
              }
              a.globalAlpha = 1;
              a.globalCompositeOperation = "source-over";
            }
          })(a, u, d, y, R);
          (function (a, o, t, l) {
            if (!(l < 2)) {
              var e = f.near * f.song * (.1 + .28 * f.dong + .16 * f.gian) + .34 * f.chiec * f.near;
              if (!(e < .01)) {
                var n = function (a, o) {
                  if (s.vig && s.vw === a && s.vh === o) {
                    return s.vig;
                  }
                  var t = Math.max(8, Math.ceil(a / 4));
                  var l = Math.max(8, Math.ceil(o / 4));
                  var e = k(t, l);
                  var n = e.ctx;
                  var r = n.createRadialGradient(t / 2, l / 2, .28 * Math.min(t, l), t / 2, l / 2, .72 * Math.max(t, l));
                  r.addColorStop(0, "rgba(40,0,10,0)");
                  r.addColorStop(.6, "rgba(40,0,10,0.42)");
                  r.addColorStop(1, "rgba(16,0,6,0.92)");
                  n.fillStyle = r;
                  n.fillRect(0, 0, t, l);
                  s.vig = e.canvas;
                  s.vw = a;
                  s.vh = o;
                  return s.vig;
                }(o, t);
                a.imageSmoothingEnabled = !0;
                a.globalCompositeOperation = "source-over";
                a.globalAlpha = h(1.25 * e, 0, .8);
                a.drawImage(n, 0, 0, o, t);
                a.globalAlpha = 1;
              }
            }
          })(a, p, M, R);
        }
        a.restore();
        a.globalAlpha = 1;
        a.globalCompositeOperation = "source-over";
      }
    };
    var M = o.chuanBiTruoc;
    o.chuanBiTruoc = function (o, t, e) {
      if (M && M(o, t, e), o && o.id === l && a.Utils && a.Utils.canvas && "undefined" != typeof document) {
        var n = [function () {
            F();
          }, function () {
            G();
          }, function () {
            B(!1);
          }, function () {
            B(!0);
          }, function () {
            L();
          }, function () {
            N();
          }, function () {
            U();
          }, function () {
            ["lanh", "lanhSang", "nong", "vang", "do", "tham", "trang", "den", "bui"].forEach(R);
          }];
        var r = 0;
        setTimeout(function a() {
          if (!(r >= n.length)) {
            try {
              O();
              n[r++]();
            }
            catch (a) {
              return;
            }
            setTimeout(a, 16);
          }
        }, 60);
      }
    };
    var y = o.nha;
    o.nha = function (a) {
      if (y) {
        y(a);
      }
      if (a && a.id === l) {
        if (f && f.data !== a) {
          f = null;
        }
      }
      else {
        f = null;
        s = { d: 0 };
      }
    };
    o._fx = function () {
      return { S: f, SP: s };
    };
    o._datLai = function () {
      f = null;
    };
  }
  function S(a) {
    return "rgb(" + (0 | a[0]) + "," + (0 | a[1]) + "," + (0 | a[2]) + ")";
  }
  function x(a, o) {
    return "rgba(" + a[0] + "," + a[1] + "," + a[2] + "," + o.toFixed(3) + ")";
  }
  function A(a, o, t) {
    return [a[0] + (o[0] - a[0]) * t, a[1] + (o[1] - a[1]) * t, a[2] + (o[2] - a[2]) * t];
  }
  function C(a, o, t) {
    return S(A(a, o, t));
  }
  function w(a) {
    return a - Math.floor(a);
  }
  function T(a, o) {
    return (a % o + o) % o;
  }
  function k(o, t) {
    return a.Utils.canvas(Math.max(1, Math.ceil(o)), Math.max(1, Math.ceil(t)));
  }
  function O() {
    var o = (a.Renderer && a.Renderer.gfx) >= 2 ? 2 : 1;
    if (s.d !== o) {
      s = { d: o, glow: {}, tran: null, bat: null, luaLanh: null, luaNong: null, mist: null, cot: null, may: null, tia: null, vig: null, vw: 0, vh: 0 };
    }
    return s;
  }
  function R(a) {
    var o = s.glow[a];
    if (o) {
      return o;
    }
    var t = c[a] || c.trang;
    var l = 48;
    var e = k(96, 96);
    var n = e.ctx;
    var r = n.createRadialGradient(l, l, 0, l, l, l);
    r.addColorStop(0, x(t, 1));
    r.addColorStop(.22, x(t, .62));
    r.addColorStop(.5, x(t, .22));
    r.addColorStop(.78, x(t, .05));
    r.addColorStop(1, x(t, 0));
    n.fillStyle = r;
    n.fillRect(0, 0, 96, 96);
    return s.glow[a] = { c: e.canvas, R: l };
  }
  function P(a, o, t, l, e, n, r) {
    if (!(n <= .004 || e < 1)) {
      var i = R(o);
      var h = r || 1;
      a.globalAlpha = n > 1 ? 1 : n;
      a.drawImage(i.c, t - e, l - e * h, 2 * e, 2 * e * h);
    }
  }
  function I(a, o, t) {
    var l;
    var e = s.d;
    var n = k(a.width, a.height);
    var r = n.ctx;
    if (t > 0) {
      var i = Math.round(1.6 * e);
      var h = Math.round(3.4 * e);
      var g = [[-1, 0], [1, 0], [0, -1], [0, 1], [-1, -1], [1, -1], [-1, 1], [1, 1]];
      for (r.globalAlpha = .55 * t, l = 0; l < 8; l++)
        r.drawImage(a, g[l][0] * h, g[l][1] * h);
      for (r.globalAlpha = t, l = 0; l < 8; l++)
        r.drawImage(a, g[l][0] * i, g[l][1] * i);
    }
    r.globalAlpha = 1;
    r.drawImage(a, 0, 0);
    r.globalCompositeOperation = "source-in";
    r.fillStyle = S(o);
    r.fillRect(0, 0, a.width, a.height);
    return n.canvas;
  }
  function E() {
    for (var a = s.d, o = 292 * a, l = 140 * a, e = k(o, l), n = e.ctx.createImageData(o, l), r = n.data, i = 0; i < l; i++)
      for (var h = (i + .5) / a - 6 - 64, g = 0; g < o; g++) {
        var v = (g + .5) / a - 6 - 140;
        var f = t.tranDo(v, h);
        if (0 !== f && 4 !== f) {
          var d = 4 * (i * o + g);
          r[d] = r[d + 1] = r[d + 2] = r[d + 3] = 255;
        }
      }
    e.ctx.putImageData(n, 0, 0);
    var p = 108 * a;
    var m = k(p, p);
    var b = m.ctx.createImageData(p, p);
    var M = b.data;
    for (i = 0; i < p; i++)
      for (g = 0; g < p; g++) {
        var y = t.tranDo((g + .5) / a - u, (i + .5) / a - u);
        if (2 === y || 3 === y) {
          var S = 4 * (i * p + g);
          M[S] = M[S + 1] = M[S + 2] = M[S + 3] = 255;
        }
      }
    m.ctx.putImageData(b, 0, 0);
    return { W: 292, H: 140, ox: 146, oy: 70, que: m.canvas, lanh: I(e.canvas, c.lanh, .2), tham: I(e.canvas, c.tham, .3), loi: I(e.canvas, c.loi, 0), trang: I(e.canvas, c.trang, .24), run: k(p, p).canvas };
  }
  function W() {
    var a = s.d;
    var o = k(26 * a, 18 * a);
    var t = o.ctx;
    t.scale(a, a);
    t.fillStyle = "rgba(0,0,0,0.34)";
    t.beginPath();
    t.ellipse(13, 12, 12, 5.2, 0, 0, v);
    t.fill();
    t.fillStyle = "#4a4740";
    t.beginPath();
    t.ellipse(13, 9, 10.5, 6.6, 0, 0, v);
    t.fill();
    t.fillStyle = "#7d786c";
    t.beginPath();
    t.ellipse(13, 8.2, 10.5, 6.2, 0, g, v);
    t.fill();
    t.fillStyle = "#a19b8c";
    t.beginPath();
    t.ellipse(13, 7.6, 9.2, 4.6, 0, 1.05 * g, 1.62 * g);
    t.fill();
    t.fillStyle = "#18161a";
    t.beginPath();
    t.ellipse(13, 9, 7.2, 4.2, 0, 0, v);
    t.fill();
    t.fillStyle = "#332e2e";
    t.beginPath();
    t.ellipse(13, 9.4, 5.6, 2.9, 0, 0, v);
    t.fill();
    t.fillStyle = "#4c4644";
    t.beginPath();
    t.ellipse(12.2, 8.7, 3.6, 1.6, 0, 0, v);
    t.fill();
    t.fillStyle = "#6a2c1e";
    t.fillRect(10.4, 9.6, 1, 1);
    t.fillRect(14.6, 9.9, 1, 1);
    t.fillRect(12.6, 10.4, 1, 1);
    return o.canvas;
  }
  function H(a, o, t, l, e, n, r, i) {
    for (var h = r ? [40, 92, 200] : [150, 22, 22], g = r ? [92, 160, 240] : [236, 92, 24], v = r ? [180, 222, 255] : [255, 178, 56], c = r ? [248, 252, 255] : [255, 240, 176], s = 1 / i, u = 0; u < l; u += s) {
      var f = u / l;
      var d = Math.pow(1 - f, .62);
      var p = 1.15 * Math.sin(9.5 * e + .42 * u + n) * f + .6 * Math.sin(5.3 * e + 2 * n) * f;
      var m = 4.6 * d * (.82 + .18 * Math.sin(12 * e + n + .3 * u));
      if (m < .5) {
        m = .5;
      }
      var b = o + p;
      var M = Math.round((t - u) * i) / i;
      if (a.globalAlpha = 1 - .35 * f, a.fillStyle = S(f < .5 ? h : g), a.fillRect(Math.round((b - m) * i) / i, M, Math.max(s, Math.round(2 * m * i) / i), s), m > 1.2) {
        a.fillStyle = S(f < .62 ? g : v);
        a.globalAlpha = .95;
        var y = .66 * m;
        a.fillRect(Math.round((b - y) * i) / i, M, Math.max(s, Math.round(2 * y * i) / i), s);
      }
      if (m > 1.9 && f < .75) {
        a.fillStyle = S(f < .4 ? v : c);
        a.globalAlpha = 1;
        var x = .34 * m;
        a.fillRect(Math.round((b - x) * i) / i, M, Math.max(s, Math.round(2 * x * i) / i), s);
      }
    }
    a.globalAlpha = 1;
  }
  function D() {
    var a;
    var o;
    var t = 160;
    var l = k(t, 80);
    var e = l.ctx.createImageData(t, 80);
    var r = e.data;
    var h = new Float32Array(32);
    for (a = 0; a < h.length; a++)
      h[a] = n(a, 71, 5);
    function g(a, o, t, l) {
      var e = a * t;
      var n = o * l;
      var r = Math.floor(e);
      var i = Math.floor(n);
      var g = e - r;
      var v = n - i;
      g = g * g * (3 - 2 * g);
      v = v * v * (3 - 2 * v);
      var c = h[i % 4 * 8 + r % 8];
      var s = h[i % 4 * 8 + (r + 1) % 8];
      var u = h[(i + 1) % 4 * 8 + r % 8];
      return c + (s - c) * g + (u - c) * v + (c - s - u + h[(i + 1) % 4 * 8 + (r + 1) % 8]) * g * v;
    }
    for (o = 0; o < 80; o++)
      for (a = 0; a < t; a++) {
        var c = a / t;
        var s = o / 80;
        var u = .62 * g(c, s, 8, 4) + .38 * g(2 * c % 1, 2 * s % 1, 8, 4);
        var f = i(.38, .82, u) * (.5 - .5 * Math.cos(s * v));
        var d = 4 * (o * t + a);
        r[d] = 214;
        r[d + 1] = 226;
        r[d + 2] = 240;
        r[d + 3] = Math.round(255 * f);
      }
    l.ctx.putImageData(e, 0, 0);
    return { c: l.canvas, W: t, H: 80 };
  }
  function _() {
    for (var a = k(64, 256), o = a.ctx.createImageData(64, 256), t = o.data, l = 0; l < 256; l++)
      for (var e = l / 255, n = Math.pow(e, .9), i = 0; i < 64; i++) {
        var h = (i + .5) / 64 * 2 - 1;
        var g = 1 - h * h;
        var v = g * g * n;
        var c = Math.pow(Math.max(0, 1 - 1.7 * Math.abs(h)), 2);
        var s = 4 * (64 * l + i);
        var u = r(.6 * v + .7 * c);
        t[s] = 255;
        t[s + 1] = Math.round(226 + 29 * c);
        t[s + 2] = Math.round(160 + 90 * c * e);
        t[s + 3] = Math.round(255 * r(.75 * v + c * n * .6) * (.55 + .45 * u));
      }
    a.ctx.putImageData(o, 0, 0);
    return a.canvas;
  }
  function X() {
    var a;
    var o;
    var t = 64;
    var l = k(t, t);
    var e = l.ctx.createImageData(t, t);
    var r = e.data;
    var h = new Float32Array(16);
    var g = new Float32Array(64);
    for (a = 0; a < h.length; a++)
      h[a] = n(a, 331, 1);
    for (a = 0; a < g.length; a++)
      g[a] = n(a, 332, 1);
    function v(a, o, t, l) {
      var e = t * o;
      var n = l * o;
      var r = Math.floor(e);
      var i = Math.floor(n);
      var h = e - r;
      var g = n - i;
      h = h * h * (3 - 2 * h);
      g = g * g * (3 - 2 * g);
      var v = a[i % o * o + r % o];
      var c = a[i % o * o + (r + 1) % o];
      var s = a[(i + 1) % o * o + r % o];
      return v + (c - v) * h + (s - v) * g + (v - c - s + a[(i + 1) % o * o + (r + 1) % o]) * h * g;
    }
    for (o = 0; o < t; o++)
      for (a = 0; a < t; a++) {
        var c = .68 * v(h, 4, a / t, o / t) + .32 * v(g, 8, a / t, o / t);
        var s = 4 * (o * t + a);
        r[s] = 14;
        r[s + 1] = 22;
        r[s + 2] = 40;
        r[s + 3] = Math.round(255 * i(.46, .8, c));
      }
    l.ctx.putImageData(e, 0, 0);
    return l.canvas;
  }
  function Y() {
    for (var a = k(64, 200), o = a.ctx.createImageData(64, 200), t = o.data, l = 0; l < 200; l++)
      for (var e = l / 199, n = 16 + 32 * e, r = 8 + 6 * e, h = i(0, .22, e) * (1 - i(.6, 1, e)), g = 0; g < 64; g++) {
        var v = (g + .5 - n) / r;
        if (!(v < -1 || v > 1)) {
          var c = 1 - v * v;
          var s = 4 * (64 * l + g);
          t[s] = 255;
          t[s + 1] = 240;
          t[s + 2] = 196;
          t[s + 3] = Math.round(255 * c * c * h);
        }
      }
    a.ctx.putImageData(o, 0, 0);
    return a.canvas;
  }
  function q(a, t) {
    var l = "undefined" != typeof performance ? performance.now() : 0;
    var e = t();
    o._nan[a] = Math.round(10 * (("undefined" != typeof performance ? performance.now() : 0) - l)) / 10;
    return e;
  }
  function F() {
    if (!(s.tran)) {
      s.tran = q("tran", E);
    }
    return s.tran;
  }
  function G() {
    if (!(s.bat)) {
      s.bat = q("bat", W);
    }
    return s.bat;
  }
  function B(a) {
    var o = a ? "luaLanh" : "luaNong";
    if (!(s[o])) {
      s[o] = q(o, function () {
        return function (a) {
          for (var o = s.d, t = [], l = 0; l < 8; l++) {
            var e = k(24 * o, 40 * o);
            var n = e.ctx;
            n.scale(o, o);
            var r = .19 * l;
            H(n, 12, 37, 20, r, 1.3 * l, a, o);
            H(n, 15.5, 38, 12.4, r + .37, 1.3 * l + 2, a, o);
            H(n, 8.5, 38, 11, r + .71, 1.3 * l + 4, a, o);
            t.push(e.canvas);
          }
          return t;
        }(a);
      });
    }
    return s[o];
  }
  function L() {
    if (!(s.mist)) {
      s.mist = q("mist", D);
    }
    return s.mist;
  }
  function N() {
    if (!(s.may)) {
      s.may = q("may", X);
    }
    return s.may;
  }
  function U() {
    if (!(s.tia)) {
      s.tia = q("tia", Y);
    }
    return s.tia;
  }
  function J(a) {
    var o = t.hinh(a);
    return { data: a, H: o, tam: o.tam, t: -1, tier: 2, vw: 512, vh: 288, camX: 0, camY: 0, boss: null, ho: [], nHo: 0, gan: 9999, near: 0, song: 0, giao: 0, dong: 0, gian: 0, chiec: 0, tinh: 0, daThay: !1, lastSong: null, lastHo: -1, lastSeen: -1e9, lastBk: null, lastPounce: null, lastTc: null, lastHp: -1, hitT: -1e9, chetT: -1e9, chetX: 0, chetY: 0, hoiT: -1e9, vaT: -1e9, vaX: 0, vaY: 0, pulseT: -1e9, armed: !0, pha: -1, cuongT: -1e9, flareT: -1e9, nextRock: 4, nRock: 0, waves: [], lastChase: !1, calmSince: -1e9, gamT: -1e9, lastDead: null, crowd: !1, troiT: -1e9, troi: 0, nang: 0, dec: [], hat: [], nDec: 0, tgGround: null, tgFx: null };
  }
  function Q(a) {
    return !(!a || a.dead || !1 === a.netSeen);
  }
  function j(a, o, t, l, e) {
    return a + (o - a) * (1 - Math.exp(-t / (o > a ? l : e)));
  }
  function z(a) {
    if (a - d.t > 2 || a < d.t) {
      d.t = a;
      try {
        d.v = !(!window.matchMedia || !window.matchMedia("(prefers-reduced-motion: reduce)").matches);
      }
      catch (a) {
        d.v = !1;
      }
    }
    return d.v;
  }
  function K(o, t, l, e, n) {
    var r = a.Camera;
    if (r && !z(n) && r.shakeAt) {
      r.shakeAt(o, t, l, e);
    }
  }
  function V(a, o, t) {
    return a > f.camX - t && a < f.camX + f.vw + t && o > f.camY - t && o < f.camY + f.vh + t;
  }
  function Z(a, o, t, l, e) {
    for (var r = { k: a, x: o, y: t, r: 22 + 30 * l, t0: e, life: 2 === a ? 14 : 8, v: [] }, i = 0 === a ? 0 : 1 === a ? 6 : 9, h = 7919 * f.nDec++ + 131 * a | 0, g = 0; g < i; g++) {
      for (var c = (g / i + .12 * n(h, g, 3)) * v, s = r.r * (.7 + .6 * n(h, g, 4)), u = [], d = 0; d <= 5; d++) {
        var p = d / 5;
        var m = .5 * (n(h, 9 * g + d, 5) - .5);
        u.push([Math.cos(c + m) * s * p, Math.sin(c + m) * s * p * .86]);
      }
      r.v.push(u);
    }
    if (f.dec.length >= 10) {
      f.dec.shift();
    }
    f.dec.push(r);
  }
  function $(a) {
    if (f.hat.length < 120) {
      f.hat.push(a);
    }
  }
  function aa(a, o, t, l, e, n, r, i, h, g, v) {
    if (f.waves.length >= 10) {
      f.waves.shift();
    }
    f.waves.push({ x: a, y: o, t0: t + (v || 0), life: l, r0: e, r1: n, cA: r, cB: i, lw: h, a: g });
  }
  function oa(a, o, t, l, e, n, r) {
    $({ k: 2, x: a, y: o, r0: t, r1: l, t0: e, life: n || .9, a: null == r ? .34 : r });
  }
  function ta(a, o, t, l, e) {
    var r = Math.sqrt(2 * t / 300);
    var i = p++;
    $({ k: 1, x: a, y: o, cao: t, g: 300, t0: l, life: r, s: e || 1 + (3 * n(i, 7, 3) | 0), sd: i });
  }
  function la(a, o, t, l) {
    for (var e = 0; e < 2; e++) {
      var r = -g * (.25 + .5 * n(l, e, 8));
      $({ k: 5, x: a, y: o, y0: o, vx: Math.cos(r) * (18 + 26 * n(l, e, 9)) * (n(l, e, 10) < .5 ? -1 : 1), vy: Math.sin(r) * (44 + 40 * n(l, e, 11)), t0: t, life: .55 + .3 * n(l, e, 12) });
    }
  }
  function ea(a, o, t, l, e) {
    var r;
    var i = f.H.vach;
    var h = [];
    if (i) {
      for (r = 0; r < i.length; r++) {
        var g = i[r][0] - l;
        var v = i[r][1] - e;
        if (g * g + v * v < 36100) {
          h.push(i[r]);
        }
      }
      if (h.length) {
        for (r = 0; r < o; r++) {
          var c = h[(n(p++, 13, 4) * h.length | 0) % h.length];
          var s = 30 + 44 * n(r, p, 5);
          ta(c[0] + 22 * (n(r, p, 6) - .5), c[1] + 2 + 5 * n(r, p, 7), s, a + .5 * n(r, p, 8) * t, null);
          if (r % 2 == 0) {
            oa(c[0] + 30 * (n(r, p, 9) - .5), c[1] + 3, 4, 13 + 8 * t, a + .3 * n(r, p, 10), 1.1, .26);
          }
        }
      }
    }
  }
  function na(a, o, t, l) {
    f.flareT = o;
    ea(o, 2 === a ? 6 : 1 === a ? 3 : 4, 2 === a ? 1.3 : .7, t, l);
  }
  function ra(o, t) {
    var l = a.SceneWorld;
    var e = l && l.enemies;
    var g = l && l.player;
    var s = f.t < 0 ? .016 : h(o - f.t, 0, .1);
    f.t = o;
    f.tier = t;
    var u;
    var d = null;
    var m = f.ho;
    if (m.length = 0, e) {
      for (u = 0; u < e.length; u++) {
        var b = e[u];
        if (b) {
          if ("linh_ho_tran_son" === b.type) {
            d = b;
          }
          else {
            if ("bach_ho_tuyet" === b.type) {
              m.push(b);
            }
          }
        }
      }
    }
    f.boss = d;
    var M = Q(d);
    var y = 0;
    var S = !(!d || !1 === d.netSeen);
    for (u = 0; u < m.length; u++)
      Q(m[u]) && y++;
    f.nHo = y;
    var x = g ? Math.sqrt((g.x - f.tam.x) * (g.x - f.tam.x) + (g.y - f.tam.y) * (g.y - f.tam.y)) : 9999;
    f.gan = x;
    var A = 1 - i(300, 720, x);
    f.near = A;
    var C = d && d.hpMax ? r(d.hp / d.hpMax) : 1;
    var w = a.Quality;
    if (f.crowd = !(!w || !w.crowd), function (o) {
      if (!(o - f.troiT < 1 && o >= f.troiT)) {
        f.troiT = o;
        var t = a.Weather;
        var l = t && t._S && t._S.lv;
        var e = 0;
        var n = 0;
        try {
          if (l && t.active && t.active()) {
            e = r(.6 * l[2] + .9 * l[3] + l[4] + .7 * l[5]);
            n = r(l[1]);
          }
        }
        catch (a) {
          e = 0;
          n = 0;
        }
        f.troi = e;
        f.nang = n;
      }
    }(o), d && S) {
      var T = o - f.lastSeen < .8;
      if (!0 === f.lastSong && !M && d.dead && T && A > .02 && function (a, o) {
        f.chetT = o;
        f.chetX = a.x;
        f.chetY = a.y;
        for (var t = 0; t < 16; t++)
          Z(0, a.x, a.y - 22, .2, o);
        f.dec.length = Math.min(f.dec.length, 6);
        ea(o, 7, 1.2, a.x, a.y);
        K(a.x, a.y, 7, .55, o);
      }(d, o), !0 === f.lastDead && !d.dead && A > .02 && (f.hoiT = o, f.chetT = -1e9, f.pha = 0, f.armed = !0, aa(f.tam.x, f.tam.y, o, 2, 0, 150, c.nong, c.vang, 2, .8, 0)), f.lastDead = !!d.dead, M && f.lastHo > 0 && 0 === y && T && A > .02 && function (a, o) {
        f.vaT = o;
        f.vaX = a.x;
        f.vaY = a.y - 54;
        f.giao = 0;
        aa(a.x, a.y, o, .7, 20, 150, c.lanhSang, c.trang, 2, .8, 0);
        for (var t = 0; t < 26; t++) {
          var l = (t / 26 + .03 * n(t, 91, 2)) * v;
          var e = 46 + 70 * n(t, 92, 2);
          $({ k: 0, x: f.vaX + 34 * Math.cos(l), y: f.vaY + 40 * Math.sin(l), vx: Math.cos(l) * e, vy: Math.sin(l) * e * .8 - 26, t0: o, life: .85 + .5 * n(t, 93, 2), s: 2 + (4 * n(t, 94, 2) | 0), rot: n(t, 95, 2) * v, vr: 12 * (n(t, 96, 2) - .5), c: 1 & t });
        }
        K(a.x, a.y, 4, .28, o);
      }(d, o), null !== f.lastBk && d.bkSeq !== f.lastBk && M && (Z(0, d.x, d.y - 22, 1, o), na(0, o, d.x, d.y)), null !== f.lastPounce && d.pounceSeq !== f.lastPounce && M && (Z(1, d.pounceX, d.pounceY, .8, o), na(1, o, d.pounceX, d.pounceY)), null !== f.lastTc && d.tcSeq !== f.lastTc && M && (Z(2, d.tcX, d.tcY, 1.4, o), na(2, o, d.tcX, d.tcY)), f.lastBk = d.bkSeq, f.lastPounce = d.pounceSeq, f.lastTc = d.tcSeq, M) {
        var k = C < .33 ? 2 : C < .66 ? 1 : 0;
        if (f.pha < 0) {
          f.pha = k;
        }
        else {
          if (k > f.pha) {
            if (T && A > .02) {
              (function (a, o, t) {
                f.cuongT = o;
                f.flareT = o;
                aa(a.x, a.y, o, 1.2, 14, 214, c.do, c.trang, 3, .9, 0);
                aa(a.x, a.y, o, 1, 8, 140, c.trang, c.vang, 1.4, .7, .18);
                ea(o, 5 + 2 * t, 1.4, a.x, a.y);
                K(a.x, a.y, 5 + t, .4, o);
              })(d, o, k);
            }
            f.pha = k;
          }
          else {
            if (k < f.pha && C > .9) {
              f.pha = k;
            }
          }
        }
        f.lastSeen = o;
        f.daThay = !0;
      }
      if (M && f.lastHp >= 0 && d.hp < f.lastHp - .5) {
        f.hitT = o;
      }
      f.lastHp = d.hp;
      f.lastSong = M;
      f.lastHo = M ? y : -1;
    }
    if (M && f.armed && A > .55) {
      f.pulseT = o;
      f.armed = !1;
      aa(f.tam.x, f.tam.y, o, 1.3, 20, 190, c.nong, c.vang, 2.4, .85, 0);
    }
    else {
      if (!f.armed && A < .15) {
        f.armed = !0;
      }
    }
    var O = M && "chase" === d.state;
    if (O && !f.lastChase && o - f.calmSince >= 6 && o - f.gamT > 10 && A > .15) {
      (function (a, o) {
        f.gamT = o;
        f.flareT = o;
        f.pulseT = o;
        aa(a.x, a.y, o, 1.1, 20, 260, c.bui, c.trang, 3, .75, 0);
        aa(a.x, a.y, o, .9, 10, 170, c.trang, c.vang, 1.3, .55, .14);
        for (var t = 0; t < 8; t++) {
          var l = t / 8 * v + .5 * n(p++, 3, 9);
          oa(a.x + 26 * Math.cos(l), a.y - 2 + 12 * Math.sin(l), 5, 16, o + .05 + .03 * t, 1, .3);
        }
        ea(o, f.crowd ? 2 : 4, .9, a.x, a.y);
        K(a.x, a.y, 4, .35, o);
      })(d, o);
    }
    if (!O && f.lastChase) {
      f.calmSince = o;
    }
    f.lastChase = O;
    var R = M && ("chase" === d.state || "telegraph" === d.attackState || d.pounceWind > 0 || d.tcWind > 0 || o - f.hitT < 3);
    var P = M && d.tcWind > 0 && d.def && d.def.tuyetChieu ? r(1 - d.tcWind / d.def.tuyetChieu.windup * .85) : 0;
    if (f.song = j(f.song, M ? 1 : 0, s, .5, 1.2), f.giao = M && y > 0 ? j(f.giao, 1, s, .5, .2) : j(f.giao, 0, s, .2, .15), f.dong = j(f.dong, R ? 1 : 0, s, .2, 1.4), f.gian = j(f.gian, M ? 1 - i(.12, .55, C) : 0, s, .6, 2), f.chiec = j(f.chiec, P, s, .18, .5), f.tinh = j(f.tinh, d && S && d.dead ? 1 : 0, s, .5, 6), t >= 2 && !f.crowd && o >= f.nextRock) {
      var I = f.dong > .5 && A > .3;
      f.nextRock = o + (I ? 1.5 + 1.8 * n(f.nRock, 4, 9) : 10 + 14 * n(f.nRock, 5, 9));
      f.nRock++;
      var E = I ? f.H.vachDai : f.H.vach;
      var W = [];
      if (E) {
        for (u = 0; u < E.length; u++)
          E[u][0] > f.camX - 40 && E[u][0] < f.camX + f.vw + 40 && E[u][1] > f.camY && E[u][1] < f.camY + f.vh + 40 && W.push(E[u]);
      }
      if (W.length) {
        var H = W[(n(f.nRock, 6, 9) * W.length | 0) % W.length];
        ta(H[0] + 20 * (n(f.nRock, 7, 9) - .5), H[1] + 2 + 4 * n(f.nRock, 8, 9), 26 + 34 * n(f.nRock, 9, 9), o, null);
      }
    }
  }
}(window.PNTT);
