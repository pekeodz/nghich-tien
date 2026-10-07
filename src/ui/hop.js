!function (e) {
  "use strict";
  var n = e.Utils;
  var t = e.HopUI = { open: !1, rolling: !1 };
  var o = {};
  var i = [];
  var a = null;
  var l = -1;
  var r = null;
  var s = 0;
  var c = [];
  var d = "";
  var h = 0;
  var p = { khong_co_trong_tui: "Ngươi không còn hộp này trong túi", khong_phai_hop: "Vật này không mở ra được", hop_rong: "Hộp trống rỗng, không có gì để bốc" };
  function g(n) {
    var t = e.ITEMS[n];
    return t ? t.name : n;
  }
  function u(n, t, o) {
    var i = e.ITEMS[t];
    if (i) {
      e.drawItemIcon(n.getContext("2d"), i.icon, 0, 0, o);
      if (o > 16 && e.sharpenItemIcon) {
        e.sharpenItemIcon(n, i.icon);
      }
    }
  }
  function m() {
    var n = r[s];
    !function (e) {
      i = [];
      o.grid.innerHTML = "";
      o.grid.classList.remove("xong");
      var n = e.length <= 4 ? 2 : Math.min(7, Math.max(3, Math.ceil(e.length / 3)));
      o.grid.style.setProperty("--hop-cot", String(n));
      e.forEach(function (e, n) {
        var t = document.createElement("div");
        t.className = "hop-card";
        t.title = g(e);
        var a = document.createElement("canvas");
        a.width = a.height = 32;
        u(a, e, 32);
        t.appendChild(a);
        var l = document.createElement("span");
        l.className = "gacha-burst";
        t.appendChild(l);
        o.grid.appendChild(t);
        i.push({ el: t, id: e, index: n });
      });
      l = -1;
    }(n.pool);
    o.step.textContent = s + 1 + "/" + r.length;
    o.next.disabled = !0;
    o.next.textContent = "Đang bốc…";
    f("Phần " + (s + 1) + "/" + r.length + " · " + n.ten + "…");
    t.rolling = !0;
    var d = n.pool.indexOf(n.item);
    if (d < 0) {
      d = 0;
    }
    var h = i.length;
    var p = Math.floor(Math.random() * h);
    var m = Math.max(25, h + 4);
    m += ((d - p - m) % h + h) % h;
    var v = 0;
    !function x() {
      if (C = (p + v) % h, l >= 0 && i[l] && i[l].el.classList.remove("lit"), i[l = C] && i[l].el.classList.add("lit"), e.Audio.play("ui", { gain: .35, rate: 1.4 }), v >= m) {
        !function (n, i) {
          a = null;
          i.el.classList.remove("lit");
          l = i.index;
          o.grid.classList.add("xong");
          i.el.classList.add("won");
          e.Audio.play("spell");
          i.el.classList.remove("burst");
          i.el.offsetWidth;
          i.el.classList.add("burst");
          var d = g(n.item);
          c.push(d);
          f(n.ten + ": " + d + (n.trung ? " (trùng — ngươi đã có đủ cả bể)" : "") + (!1 === n.khoa ? "." : " · món khoá."));
          (function (n) {
            var t = e.ITEMS[n];
            if (t) {
              o.haul.classList.remove("hidden");
              var i = document.createElement("div");
              i.className = "gacha-chip";
              var a = document.createElement("canvas");
              a.width = a.height = 16;
              u(a, n, 16);
              i.appendChild(a);
              var l = document.createElement("span");
              l.textContent = t.name;
              i.appendChild(l);
              o.haul.appendChild(i);
            }
          })(n.item);
          o.next.textContent = s >= r.length - 1 ? "Xong" : "Tiếp ›";
          o.next.disabled = !1;
          t.rolling = !1;
          if (e.HUD && e.HUD.renderBag) {
            e.HUD.renderBag();
          }
        }(n, i[d]);
      }
      else {
        var H = ++v / m;
        a = setTimeout(x, 40 + 280 * Math.pow(H, 3));
      }
      var C;
    }();
  }
  function v() {
    if (!(o.next.disabled)) {
      if (!r || s >= r.length - 1) {
        t.close();
      }
      else {
        s++;
        m();
      }
    }
  }
  function f(e) {
    if (o.say) {
      o.say.textContent = e;
    }
  }
  t.init = function () {
    o.root = n.$("#hop-mo");
    return o.root ? (o.title = n.$("#hop-title"), o.step = n.$("#hop-step"), o.grid = n.$("#hop-grid"), o.say = n.$("#hop-say"), o.haul = n.$("#hop-haul"), o.next = n.$("#hop-next"), o.close = n.$("#hop-close"), o.next.addEventListener("click", v), o.close.addEventListener("click", function () {
      t.close();
    }), o.root.addEventListener("click", function (e) {
      if (e.target === o.root) {
        t.close();
      }
    }), t) : t;
  };
  t.mo = function (n) {
    if (o.root && !t.open && !t.rolling) {
      var i = e.ITEMS && e.ITEMS[n];
      if (i && e.Inventory.HOP && e.Inventory.HOP[n]) {
        r = null;
        s = 0;
        c = [];
        d = i.name;
        o.title.textContent = i.name;
        o.step.textContent = "…";
        o.grid.innerHTML = "";
        o.grid.classList.remove("xong");
        o.haul.classList.add("hidden");
        o.haul.innerHTML = "";
        o.next.disabled = !0;
        o.next.textContent = "Đang mở…";
        f("Nắp hộp rung lên, khoá đồng bật ra…");
        o.root.classList.remove("hidden");
        t.open = !0;
        t.rolling = !0;
        e.Audio.play("ui");
        var a = ++h;
        var l = function (n) {
          var i = !!(n && !1 !== n.ok && n.ket && n.ket.length);
          if (a === h && t.open) {
            if (!i) {
              t.rolling = !1;
              o.step.textContent = "";
              o.next.textContent = "Đóng";
              o.next.disabled = !1;
              e.Audio.play("deny");
              return void f(n && (p[n.why] || n.why) || "Hộp chưa mở được lúc này");
            }
            r = n.ket;
            m();
          }
          else {
            if (i && e.HUD) {
              if (e.HUD.setCaption) {
                e.HUD.setCaption(d + ": " + n.ket.map(function (e) {
                  return g(e.item);
                }).join(", ") + ".");
              }
              if (e.HUD.renderBag) {
                e.HUD.renderBag();
              }
            }
          }
        };
        if (e.SceneWorld && e.SceneWorld.online && e.SceneWorld.online()) {
          e.Gateway.cmd("hop.mo", { itemId: n }, l);
        }
        else {
          l(e.Inventory.moHop(n, Math.random));
        }
      }
    }
  };
  t.close = function () {
    if (o.root) {
      if (a) {
        clearTimeout(a);
        a = null;
      }
      if (l >= 0 && i[l]) {
        i[l].el.classList.remove("lit");
      }
      l = -1;
      var n = r && c.length < r.length;
      o.root.classList.add("hidden");
      t.open = !1;
      t.rolling = !1;
      if (n && e.HUD && e.HUD.setCaption) {
        e.HUD.setCaption(d + ": " + r.map(function (e) {
          return g(e.item);
        }).join(", ") + ".");
      }
      if (e.HUD && e.HUD.renderBag) {
        e.HUD.renderBag();
      }
      r = null;
    }
  };
  t.back = function () {
    t.close();
  };
}(window.PNTT);
