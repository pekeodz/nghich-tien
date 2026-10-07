!function (e) {
  "use strict";
  var t = e.Utils;
  var n = e.CONFIG;
  var o = e.DownedUI = { open: !1, watching: !1 };
  var a = {};
  var i = "";
  var d = !1;
  var r = 0;
  o.init = function () {
    a.root = t.$("#downed");
    return a.root ? (a.count = t.$("#downed-count"), a.home = t.$("#downed-home"), a.spot = t.$("#downed-spot"), a.watch = t.$("#downed-watch"), a.spotNote = t.$("#downed-spot-note"), a.badge = t.$("#downed-badge"), a.home.addEventListener("click", function () {
      if (e.SceneWorld.reviveAtHome) {
        e.SceneWorld.reviveAtHome();
      }
    }), a.spot.addEventListener("click", function () {
      if (e.SceneWorld.reviveOnSpot) {
        e.SceneWorld.reviveOnSpot();
      }
    }), a.watch.addEventListener("click", function () {
      o.watch();
    }), a.badge && a.badge.addEventListener("click", function () {
      o.show();
    }), o) : o;
  };
  o.update = function (t) {
    if (a.root)
      if (t && t.downed) {
        var c = e.SceneWorld;
        if (c && c.map && c.map.data && "dai_hoi_dau" === c.map.data.id) {
          o.close();
        }
        else {
          var l = e.TongMonChien;
          if (l && c && c.map && c.map.data && c.map.data.id === l.MAP) {
            o.close();
          }
          else if (c && c.map && c.map.data && "chien_bang_dai" === c.map.data.id) {
            o.close();
          }
          else {
            var s = e.HuThienUI;
            var h = s && s.hoiSinhConLai ? s.hoiSinhConLai(t) : null;
            if (null === h) {
              if (d && a.home) {
                d = !1;
                a.home.disabled = !1;
              }
              var v = Math.max(0, n.DOWNED.AUTO_HOME - t.downTime);
              if (v <= 0) {
                if (e.SceneWorld.reviveAtHome) {
                  e.SceneWorld.reviveAtHome(!0);
                }
              }
              else {
                if (!o.open && !o.watching && t.downTime >= n.DOWNED.PANEL_DELAY) {
                  o.show();
                }
                var m = Math.ceil(v) + "s";
                if (m !== i) {
                  i = m;
                  if (a.count) {
                    a.count.textContent = m;
                  }
                  if (a.badge) {
                    a.badge.textContent = "Trọng Thương · " + m;
                  }
                }
              }
            }
            else {
              if (a.home && d !== h > 0) {
                d = h > 0;
                a.home.disabled = d;
              }
              if (h <= 0 && t.downTime >= n.DOWNED.AUTO_HOME && Date.now() - r > 1500) {
                r = Date.now();
                if (e.SceneWorld.reviveAtHome) {
                  e.SceneWorld.reviveAtHome(!0);
                }
              }
              if (!o.open && !o.watching && t.downTime >= n.DOWNED.PANEL_DELAY) {
                o.show();
              }
              var u = Math.ceil(h) + "s";
              if (u !== i) {
                i = u;
                if (a.count) {
                  a.count.textContent = u;
                }
                if (a.badge) {
                  a.badge.textContent = "Trọng Thương · " + u;
                }
              }
            }
          }
        }
      }
      else {
        o.close();
      }
  };
  o.show = function () {
    if (a.root) {
      (function () {
        if (a.spotNote) {
          var t = e.SceneWorld && e.SceneWorld.map;
          var n = e.SceneWorld && e.SceneWorld.player;
          var i = o.reviveLeft(n, t);
          var d = 0 === i;
          var r = !d && !!(t && t.data && t.data.huyetSac);
          var c = !!(t && t.data && t.data.lamLang);
          var l = !!(t && t.data && t.data.huThien);
          if (a.spot) {
            a.spot.disabled = d;
          }
          var s = a.home && a.home.querySelector("b");
          var h = a.home && a.home.querySelector("small");
          var v = a.root && a.root.querySelector(".downed-timer");
          if (s && (s.textContent = l ? "Về Cổng Ngoại Điện" : c ? "Về Giếng Làng" : r ? "Hồi sinh cửa" : "Về làng"), h && (h.textContent = "Miễn phí"), v && v.firstChild && (v.firstChild.nodeValue = l ? "Hồi sinh ở Cổng sau " : c ? "Tự về giếng sau " : r ? "Tự hồi cửa sau " : "Tự hồi sau "), d) {
            a.spotNote.textContent = "Hết lượt";
          }
          else {
            var m = null === i ? "" : " · còn " + i + " lần";
            a.spotNote.textContent = "Còn" + m;
          }
        }
      })();
      a.root.classList.remove("hidden");
      if (a.badge) {
        a.badge.classList.add("hidden");
      }
      o.open = !0;
      o.watching = !1;
      a.home.focus({ preventScroll: !0 });
    }
  };
  o.watch = function () {
    if (a.root) {
      a.root.classList.add("hidden");
      if (a.badge) {
        a.badge.classList.remove("hidden");
      }
      o.open = !1;
      o.watching = !0;
    }
  };
  o.close = function () {
    if (a.root) {
      a.root.classList.add("hidden");
      if (a.badge) {
        a.badge.classList.add("hidden");
      }
      o.open = !1;
      o.watching = !1;
      i = "";
      if (d && a.home) {
        d = !1;
        a.home.disabled = !1;
      }
    }
  };
  o.reviveLeft = function (t, n) {
    if (t && "number" == typeof t.reviveLeft) {
      return t.reviveLeft;
    }
    var o = e.SceneWorld;
    return o && o.reviveLeftOffline && n ? o.reviveLeftOffline() : null;
  };
}(window.PNTT);
