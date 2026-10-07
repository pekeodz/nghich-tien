!function (t) {
  "use strict";
  var a = t.TruyenTongUI = {};
  var n = [0, 1, 2, 1];
  var r = [2, 3, 3, 4, 5, 0];
  var o = null;
  var e = {};
  var i = null;
  var l = null;
  function d() {
    return t.TruyenTong;
  }
  function s() {
    var a = t.SceneWorld;
    return a && a.map && a.map.data ? a.map.data.id : null;
  }
  function p(a) {
    if (t.HUD && t.HUD.setCaption) {
      t.HUD.setCaption(a);
    }
  }
  var f = null;
  var h = [];
  var u = 260;
  var g = 46;
  function c(a, n) {
    if (e[a.id] = 1.1, function (t, a, n) {
      for (var r = d().center(t), o = [], e = [], i = 0; i < 26; i++)
        o.push({ a: Math.random() * Math.PI * 2, r: .2 + .8 * Math.random(), v: 180 + 260 * Math.random(), len: 24 + 70 * Math.random(), w: Math.random() < .3 ? 3 : 2, off: Math.random() * u, white: Math.random() < .35 });
      for (var l = 0; l < 30; l++)
        e.push({ a: Math.random() * Math.PI * 2, spin: 2 + 3 * Math.random(), r: .6 + .6 * Math.random(), v: 40 + 90 * Math.random(), off: Math.random() });
      h.push({ map: t.map, x: r.x, y: r.y, mode: a, t: 0, dur: n, rays: o, sparks: e, boom: !1 });
    }(a, n ? "down" : "up", n ? 1.5 : 1.7), t.VFX) {
      for (var r = d().center(a), o = 0; o < 14; o++)
        t.VFX.spawnQiWisp(r.x + 70 * (Math.random() - .5), r.y + 22 * (Math.random() - .5));
      if (t.Audio && t.Audio.play) {
        try {
          t.Audio.play("portal");
        }
        catch (t) {
        }
      }
    }
  }
  function y(t) {
    return "up" === t.mode ? 1.2 : .35;
  }
  function m(t) {
    return t < 0 ? 0 : t > 1 ? 1 : t;
  }
  function b(t, a, n, r) {
    var o = a.x - n;
    var e = a.y - r;
    var i = a.t;
    var l = y(a);
    var d = "up" === a.mode && i < l ? .25 + i / l * .75 : 1 - m((i - l) / (a.dur - l));
    if (!(d <= 0)) {
      var s = e - u;
      var p = e;
      if ("down" === a.mode && i < l) {
        p = s + u * (i / l);
      }
      t.save();
      t.globalCompositeOperation = "lighter";
      var f = g * (.7 + .3 * d);
      var h = t.createLinearGradient(o - f, 0, o + f, 0);
      h.addColorStop(0, "rgba(60,220,200,0)");
      h.addColorStop(.5, "rgba(120,255,230," + .42 * d + ")");
      h.addColorStop(1, "rgba(60,220,200,0)");
      t.fillStyle = h;
      t.fillRect(o - f, s, 2 * f, p - s);
      var c = 6 + 10 * d * (a.boom && i - l < .25 ? 2.2 : 1);
      var b = t.createLinearGradient(o - c, 0, o + c, 0);
      b.addColorStop(0, "rgba(255,255,255,0)");
      b.addColorStop(.5, "rgba(255,255,255," + .75 * d + ")");
      b.addColorStop(1, "rgba(255,255,255,0)");
      t.fillStyle = b;
      t.fillRect(o - c, s, 2 * c, p - s);
      var v = t.createLinearGradient(0, s - 40, 0, s + 60);
      v.addColorStop(0, "rgba(0,0,0,0)");
      v.addColorStop(1, "rgba(150,255,235," + .25 * d + ")");
      t.fillStyle = v;
      t.fillRect(o - f, s - 40, 2 * f, 100);
      t.lineWidth = 2;
      for (var M = 0; M < 5; M++) {
        var w = (.9 * i + M / 5) % 1;
        if ("down" === a.mode) {
          w = 1 - w;
        }
        var x = e - w * u * .9;
        if (!(x < s || x > p)) {
          var S = g * (1.15 - .45 * w);
          t.strokeStyle = "rgba(170,255,235," + .8 * d * (1 - w) + ")";
          t.beginPath();
          t.ellipse(o, x, S, .34 * S, 0, 0, 2 * Math.PI);
          t.stroke();
          t.strokeStyle = "rgba(255,240,170," + .45 * d * (1 - w) + ")";
          t.beginPath();
          t.ellipse(o, x, .8 * S, .27 * S, 0, 0, 2 * Math.PI);
          t.stroke();
        }
      }
      for (var C = 0; C < a.rays.length; C++) {
        var T = a.rays[C];
        var k = Math.cos(T.a) * g * T.r;
        var R = Math.sin(T.a) * g * T.r * .34;
        var P = (T.off + i * T.v) % (u + T.len);
        var A = "down" === a.mode ? s + P : e + R - P;
        var I = "down" === a.mode ? A - T.len : A + T.len;
        var F = Math.max(s, Math.min(I, A));
        var L = Math.min(p, Math.max(I, A));
        if (!(L <= F)) {
          var V = t.createLinearGradient(0, A, 0, I);
          V.addColorStop(0, T.white ? "rgba(255,255,255," + .95 * d + ")" : "rgba(150,255,235," + .9 * d + ")");
          V.addColorStop(1, "rgba(80,220,200,0)");
          t.fillStyle = V;
          t.fillRect(Math.round(o + k), F, T.w, L - F);
        }
      }
      for (var W = 0; W < a.sparks.length; W++) {
        var X = a.sparks[W];
        var G = X.a + i * X.spin;
        var O = (X.off + i * X.v / u) % 1 * u * .8;
        var D = o + Math.cos(G) * g * X.r;
        var _ = e - O + Math.sin(G) * g * X.r * .34;
        var E = Math.sin(G) > 0;
        t.fillStyle = E ? "rgba(255,250,200," + .95 * d + ")" : "rgba(120,240,220," + .6 * d + ")";
        t.fillRect(Math.round(D), Math.round(_), E ? 3 : 2, E ? 3 : 2);
      }
      if (a.boom) {
        var H = m((i - l) / .6);
        if (H < 1) {
          var U = g * (1 + 2.4 * H);
          t.lineWidth = 3 * (1 - H) + 1;
          t.strokeStyle = "rgba(200,255,240," + .9 * (1 - H) + ")";
          t.beginPath();
          t.ellipse(o, e, U, .36 * U, 0, 0, 2 * Math.PI);
          t.stroke();
          var z = t.createRadialGradient(o, e, 0, o, e, U);
          z.addColorStop(0, "rgba(255,255,255," + .5 * (1 - H) + ")");
          z.addColorStop(1, "rgba(120,255,230,0)");
          t.fillStyle = z;
          t.beginPath();
          t.ellipse(o, e, U, .36 * U, 0, 0, 2 * Math.PI);
          t.fill();
        }
      }
      t.restore();
    }
  }
  a.drawFront = function (t, a, n) {
    if (h.length) {
      for (var r = s(), o = 0; o < h.length; o++)
        h[o].map === r && b(t, h[o], a, n);
    }
  };
  a.go = function () {
    var a = t.SceneWorld;
    var n = a && a.player;
    if (n && !i && !a.transitioning) {
      var r = d().padAt(s(), n.x, n.y);
      if (r) {
        var o = a.online && a.online();
        if (!o && (0 | (t.Progress && t.Progress.stones)) < d().COST) {
          p("Không đủ " + d().COST + " Linh Thạch để truyền tống");
        }
        else {
          if (n.stop) {
            n.stop();
          }
          i = { pad: r, t: 1.2, online: o };
          c(r, !1);
          p("Truyền Tống Trận đang khởi động…");
        }
      }
    }
  };
  a.update = function (n, r) {
    for (var u in e)
      e[u] -= n, e[u] <= 0 && delete e[u];
    !function (a) {
      for (var n = h.length - 1; n >= 0; n--) {
        var r = h[n];
        r.t += a;
        if (!r.boom && r.t >= y(r)) {
          r.boom = !0;
          if (t.VFX && t.VFX.spawnFlash) {
            t.VFX.spawnFlash(.45, "rgba(190,255,240,0.55)");
          }
          if (t.VFX && t.VFX.spawnRipple) {
            t.VFX.spawnRipple(r.x, r.y, "#bff8ec");
          }
        }
        if (r.t >= r.dur) {
          h.splice(n, 1);
        }
      }
    }(n);
    var g = t.SceneWorld;
    var m = s();
    if (i)
      if (i.t -= n, r && d().padAt(m, r.x, r.y) === i.pad) {
        if (i.t <= 0) {
          var b = i;
          i = null;
          (function (a) {
            var n = t.SceneWorld;
            var r = d().pad(a.pad.to);
            if (r)
              if (a.online) {
                t.Gateway.cmd("truyentong.di", {}, function (t) {
                  if (t && t.ok) {
                    l = { padId: r.id, until: Date.now() + 8e3 };
                    if (t.toast) {
                      p(t.toast);
                    }
                  }
                  else {
                    p("Truyền tống thất bại: " + (t && t.why || "lỗi"));
                  }
                });
              }
              else {
                var o = d().pay(t);
                if (o.ok) {
                  l = { padId: r.id, until: Date.now() + 8e3 };
                  p("Truyền tống tới " + a.pad.label + " · trừ " + o.cost + " Linh Thạch");
                  n.switchMap(r.map, { tx: r.tx, ty: r.ty });
                }
                else {
                  p(o.why);
                }
              }
          })(b);
        }
      }
      else {
        i = null;
        p("Rời trận — huỷ truyền tống");
      }
    if (l) {
      var v = d().pad(l.padId);
      if (Date.now() > l.until) {
        l = null;
      }
      else {
        if (!(!v || m !== v.map || g && g.transitioning)) {
          c(v, !0);
          l = null;
        }
      }
    }
    !function (n) {
      var r = function () {
        if (o) {
          return o;
        }
        var t = document.createElement("style");
        t.textContent = "#tt-btn{position:fixed;left:50%;bottom:196px;transform:translate(-50%,0);z-index:40;padding:5px 12px;border-radius:14px;border:1px solid #6fe3d0;background:rgba(10,40,44,.86);color:#d8fff6;font:600 13px/1.2 inherit;cursor:pointer;box-shadow:0 0 10px rgba(80,230,200,.45);white-space:nowrap}#tt-btn:hover{background:rgba(20,70,72,.92)}#tt-btn[disabled]{opacity:.55;cursor:default}#tt-btn .tt-gia{color:#8fe0e6;font-weight:400;margin-left:6px}";
        document.head.appendChild(t);
        (o = document.createElement("button")).id = "tt-btn";
        o.type = "button";
        o.style.display = "none";
        o.addEventListener("click", function (t) {
          t.stopPropagation();
          a.go();
        });
        document.body.appendChild(o);
        return o;
      }();
      if (!n) {
        r.style.display = "none";
        return void (r._pad = null);
      }
      if (r._pad !== n.id) {
        r._pad = n.id;
        r.innerHTML = "Truyền Tống → " + n.label + '<span class="tt-gia">' + d().COST + " Linh Thạch</span>";
      }
      r.disabled = !!i;
      r.style.display = "";
      if (!(function (a, n) {
        var r = t.Renderer;
        if (!(f && r && r.display && r.display.getBoundingClientRect)) {
          return !1;
        }
        var o = r.display.getBoundingClientRect();
        if (!o.width || !o.height) {
          return !1;
        }
        var e = r.zoom || 1;
        var i = d().center(n);
        var l = o.left + (i.x - f.x) * e;
        var s = o.top + (i.y - f.y + 30) * e;
        var p = (a.offsetWidth || 160) / 2 + 4;
        if (l < o.left + p) {
          l = o.left + p;
        }
        if (l > o.right - p) {
          l = o.right - p;
        }
        if (s > o.bottom - 28) {
          s = o.bottom - 28;
        }
        a.style.left = Math.round(l) + "px";
        a.style.top = Math.round(s) + "px";
        a.style.bottom = "auto";
        return !0;
      }(r, n))) {
        r.style.left = "50%";
        r.style.top = "auto";
        r.style.bottom = "196px";
      }
    }(!r || g && g.transitioning ? null : d().padAt(m, r.x, r.y));
  };
  a.drawGround = function (o, i, l, p) {
    f = { x: i, y: l };
    var h = d() ? d().padsOf(s()) : [];
    if (h.length) {
      var u = function () {
        var n = d().ART;
        var r = t.Assets && t.Assets.get(n.path);
        if (!(r || !t.Assets || a._asked)) {
          a._asked = !0;
          t.Assets.loadImage(n.path, t.Assets.PRIO.NORMAL);
        }
        return r;
      }();
      if (u) {
        for (var g = d().ART, c = 0; c < h.length; c++) {
          var y = h[c];
          var m = d().center(y);
          var b = e[y.id];
          var v = b ? r[Math.min(r.length - 1, Math.floor((1.1 - b) / 1.1 * r.length))] : n[Math.floor(5 * p) % n.length];
          var M = Math.round(m.x - i - g.ax * g.scale);
          var w = Math.round(m.y - l - g.ay * g.scale);
          o.imageSmoothingEnabled = !1;
          o.drawImage(u, v * g.fw, 0, g.fw, g.fh, M, w, g.fw * g.scale, g.fh * g.scale);
        }
      }
    }
  };
}(window.PNTT);
