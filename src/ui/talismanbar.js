!function (t) {
  "use strict";
  var e = t.Utils;
  var n = t.TalismanBar = { built: !1, shown: !0 };
  var a = [];
  n.MAX = 5;
  var i = "pntt.thanhPhu.v1";
  var r = null;
  function o() {
    if (r) {
      return r;
    }
    var t = null;
    try {
      t = e && e.store ? e.store.get(i, null) : null;
    }
    catch (e) {
      t = null;
    }
    return r = t && t.an && "object" == typeof t.an ? t.an : {};
  }
  function s() {
    try {
      if (e && e.store) {
        e.store.set(i, { an: r });
      }
    }
    catch (t) {
    }
  }
  function l(e) {
    var n = t.Talismans && t.Talismans.defOf(e);
    return !!(n && t.Inventory && t.Inventory.count(n.item) > 0);
  }
  function d(e, n) {
    if (e.textContent = "", n) {
      var a = t.CombatIcons && t.CombatIcons.create("talisman", n && n.id, 16);
      if (a) {
        e.appendChild(a);
      }
      else {
        e.textContent = n && c[n.id] || "符";
      }
    }
    else {
      e.textContent = "符";
    }
  }
  n.barIds = function () {
    for (var e = [], a = o(), i = t.Talismans ? t.Talismans.list() : [], r = 0; r < i.length && e.length < n.MAX; r++) {
      var s = i[r].id;
      if (!a[s] && l(s)) {
        e.push(s);
      }
    }
    return e;
  };
  n.onBar = function (t) {
    return n.barIds().indexOf(t) >= 0;
  };
  n.full = function () {
    return n.barIds().length >= n.MAX;
  };
  n.toggleOnBar = function (t) {
    var e = o();
    return n.onBar(t) ? (e[t] = 1, s(), !1) : n.full() ? null : (delete e[t], s(), !0);
  };
  n._reload = function () {
    r = null;
  };
  var c = { thanh_tam: "☯", kim_giap: "盾", toc_hanh: "風", han_bang: "❄", loi_dong: "⚡", hoa_phu: "火", tho_don: "土" };
  var u = { thanh_tam: "#7fd6c4", kim_giap: "#ffd978", toc_hanh: "#bdf0d2", han_bang: "#a8dcf5", loi_dong: "#e6d4ff", hoa_phu: "#ffb46a", tho_don: "#d9b98a" };
  n.GLYPH = c;
  n.MAU = u;
  n.init = function () {
    var i = e.$("#phu-bar");
    if (!i || n.built || !t.Talismans) {
      return n;
    }
    n.built = !0;
    n.root = i;
    for (var r = t.Talismans.list(), o = 0; o < r.length; o++) {
      var s = r[o];
      var l = document.createElement("button");
      l.type = "button";
      l.className = "phu-o";
      l.dataset.phu = s.id;
      var c = document.createElement("span");
      c.className = "phu-hinh";
      d(c, s);
      c.style.color = u[s.id] || "#e9d9a2";
      l.appendChild(c);
      var h = document.createElement("small");
      h.className = "phu-ten";
      h.textContent = s.short;
      l.appendChild(h);
      var f = document.createElement("span");
      f.className = "phu-so";
      f.textContent = "0";
      l.appendChild(f);
      var p = document.createElement("strong");
      p.className = "phu-hoi hidden";
      l.appendChild(p);
      i.appendChild(l);
      a.push({ root: l, glyph: c, ten: h, so: f, cd: p, id: s.id, trangThai: "" });
    }
    i.addEventListener("pointerdown", function (t) {
      var e = t.target && t.target.closest && t.target.closest("[data-phu]");
      if (e) {
        if (t.preventDefault) {
          t.preventDefault();
        }
        n.use(e.dataset.phu);
      }
    });
    i.addEventListener("click", function (t) {
      if (!t.detail) {
        var e = t.target && t.target.closest && t.target.closest("[data-phu]");
        if (e) {
          n.use(e.dataset.phu);
        }
      }
    });
    n.update(t.SceneWorld && t.SceneWorld.player);
    return n;
  };
  n.setVisible = function (t) {
    n.shown = !!t;
    if (n.root) {
      n.root.classList.toggle("hidden", !t || !n.barIds().length);
    }
  };
  n.picked = "thanh_tam";
  n.pick = function (e) {
    if (t.Talismans && t.Talismans.defOf(e)) {
      var i = t.Talismans.defOf(e);
      if (t.Inventory && !(t.Inventory.count(i.item) <= 0)) {
        n.picked = e;
        for (var r = 0; r < a.length; r++)
          a[r].root.classList.toggle("chon", a[r].id === e);
        n.pickedState = e;
      }
    }
  };
  n.usePicked = function () {
    n.use(n.picked);
  };
  n.use = function (e) {
    var a = t.Talismans;
    var i = a && a.defOf(e);
    var r = t.SceneWorld && t.SceneWorld.player;
    if (i && r) {
      if (n.picked !== e) {
        n.pick(e);
      }
      var o = a.canUse(r, i, t);
      if (o.ok) {
        var s = null;
        if (i.aim !== a.AIM.SELF) {
          var l;
          var d;
          var c = t.Targeting && t.Targeting.current();
          if (i.dash) {
            var u = function (e) {
              var n = t.Input;
              return n && n.hasManualMove() ? { x: n.vector.x, y: n.vector.y } : e.path && e.path.length ? { x: e.path[0].x - e.x, y: e.path[0].y - e.y } : { x: 1 === e.dir ? -1 : 2 === e.dir ? 1 : 0, y: 0 === e.dir ? 1 : 3 === e.dir ? -1 : 0 };
            }(r);
            l = r.x + u.x;
            d = r.y + u.y;
          }
          else if (c && c.obj && ("enemy" === c.kind || "duel" === c.kind || "dosat" === c.kind)) {
            l = c.obj.x;
            d = c.obj.y;
          }
          else {
            var h = 1 === r.dir ? -1 : 2 === r.dir ? 1 : 0;
            var f = 0 === r.dir ? 1 : 3 === r.dir ? -1 : 0;
            l = r.x + h * (i.range || 96) * .6;
            d = r.y + f * (i.range || 96) * .6;
          }
          if (i.aim === a.AIM.POINT) {
            s = { kind: "point", x: l, y: d };
          }
          else {
            var p = l - r.x;
            var v = d - r.y;
            var m = Math.sqrt(p * p + v * v);
            if (!(m > 1e-4)) {
              return void (t.VFX && t.VFX.spawnText(r.x, r.y - 52, i.short + ": chưa rõ hướng", "#c9a45c"));
            }
            s = { kind: "dir", x: p / m, y: v / m };
          }
        }
        if (t.Audio) {
          t.Audio.play("ui");
        }
        if (t.Gateway && t.Gateway.talismanUse) {
          t.Gateway.talismanUse(i.item, s, function (e) {
            if (e && e.ok) {
              if (e.warp && t.Gateway.talismanWarp) {
                t.Gateway.talismanWarp(e.warp);
              }
              if ("number" == typeof e.sp && r) {
                r.sp = e.sp;
              }
              return void (e.fx && t.Gateway.talismanFx && t.Gateway.talismanFx(e.fx));
            }
            var n = t.SceneWorld && t.SceneWorld.player;
            if (n && t.VFX) {
              t.VFX.spawnText(n.x, n.y - 52, i.short + ": " + (e && e.why || "không được"), "#c9a45c");
            }
          });
        }
      }
      else {
        if (t.VFX) {
          t.VFX.spawnText(r.x, r.y - 52, i.short + ": " + o.why, "#c9a45c");
        }
      }
    }
  };
  n.update = function (e) {
    if (n.built) {
      var i = t.Talismans;
      var r = function () {
        for (var e = 0; e < a.length; e++) {
          var n = t.Talismans.defOf(a[e].id);
          if (t.Inventory && t.Inventory.count(n.item) > 0) {
            return a[e].id;
          }
        }
        return null;
      }();
      var o = i.defOf(n.picked);
      if (!(!r || o && t.Inventory.count(o.item))) {
        n.picked = r;
      }
      var s = n.barIds();
      n.root.classList.toggle("hidden", !n.shown || !s.length);
      for (var l = 0; l < a.length; l++) {
        var d = a[l];
        var c = i.defOf(d.id);
        var u = t.Inventory ? t.Inventory.count(c.item) : 0;
        var h = e ? i.coolLeft(e, c) : 0;
        var f = s.indexOf(d.id) >= 0;
        var p = u + "|" + (h > 0 ? Math.ceil(h) : 0) + "|" + (f ? 1 : 0);
        if (p !== d.trangThai) {
          d.trangThai = p;
          d.so.textContent = String(u);
          d.root.classList.toggle("hidden", !f);
          d.root.classList.toggle("nguoi", h > 0);
          d.root.setAttribute("aria-label", c.name + " — còn " + u + " lá" + (h > 0 ? ", hồi sau " + Math.ceil(h) + " giây" : "") + ". " + c.tip + (c.sp ? " Tốn " + c.sp + " Thần Thức." : ""));
          if (h > 0) {
            d.cd.textContent = Math.ceil(h) + "s";
            d.cd.classList.remove("hidden");
          }
          else {
            d.cd.classList.add("hidden");
          }
        }
      }
      var v = r ? n.picked : null;
      if (n.pickedState !== v) {
        n.pickedState = v;
        for (var m = 0; m < a.length; m++)
          a[m].root.classList.toggle("chon", a[m].id === v);
      }
    }
  };
}(window.PNTT);
