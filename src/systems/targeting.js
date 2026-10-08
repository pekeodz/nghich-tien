!function (e) {
  "use strict";
  var n = e.Utils;
  var a = e.Targeting = { list: [], key: null, manual: !1, doSatTruoc: !1, khoaNguoi: null };
  function t() {
    return e.CONFIG.TARGET;
  }
  function i(n) {
    if ("npc" === n.type) {
      return n.y - e.CONFIG.CHAR_ANCHOR_Y - 34;
    }
    var a = void 0 !== n.variant ? n.variant : n.tx % 3;
    var t = e.ObjectArt.get(n.art || n.type, a);
    return t ? n.y - t.ay - 6 : n.y - 32;
  }
  function r(e) {
    var n = e.def && e.def.sprite;
    return e.y - (n ? n.h : 24) - 6;
  }
  function o(e) {
    for (var n = a.list, t = 0; t < n.length; t++)
      if (n[t].key === e) {
        return t;
      }
    return -1;
  }
  a.propReach = function (e) {
    return (e && e.r || 40) + 24;
  };
  a.refresh = function (u, d, l) {
    var h = a.list;
    if (h.length = 0, u && d) {
      var c;
      var f;
      var y = e.CONFIG.TILE;
      var k = e.Player && e.Player.reach ? e.Player.reach(u) : 0;
      var s = Math.max(t().RANGE, k + (t().REACH_PAD || 0));
      var p = s + (t().KEEP_PAD || 0);
      var v = a.key;
      for (w(d.props), w(d.flatProps), c = 0; c < d.interactables.length; c++) {
        var m = d.interactables[c];
        if (!((f = n.dist(u.x, u.y, m.x, m.y)) > s)) {
          h.push({ key: "scn:" + (m.id || c), kind: "scenery", obj: m, x: m.x, y: m.y, baseY: m.y + 14, topY: m.y - 26, name: m.title, r: a.propReach(m), dist: f });
        }
      }
      for (l = l || [], c = 0; c < l.length; c++) {
        var T = l[c];
        if (!(T.dead || e.ChinhDao && !e.ChinhDao.danhDuoc(T.def))) {
          if ((!T.def || !T.def.tieuXa || e.VanTieuUI && e.VanTieuUI.cuopDuoc())) {
            f = n.dist(u.x, u.y, T.x, T.y);
            if (j("foe:" + T.id, f)) {
              h.push({ key: "foe:" + T.id, kind: "enemy", obj: T, x: T.x, y: T.y, baseY: T.y, topY: r(T), name: T.def && T.def.name || "Quái", r: e.CONFIG.PLAYER.REACH, dist: f });
            }
          }
        }
      }
      var g = e.Gateway;
      var D = null;
      if (g && g.duel && g.remotes) {
        var b = g.remotes[g.duel.id];
        if (b) {
          D = "duel:" + b.id;
          h.push(O(b, "duel", "Đối thủ"));
        }
      }
      if (g && g.remotes && e.DoSat) {
        var x = g.doSatActive && g.doSatActive();
        var C = a.pkTuDo();
        var A = a.khoaNguoi;
        for (var N in A && !a.thuDich(g.remotes[A]) && (a.khoaNguoi = null, A = null), g.remotes) {
          var P = g.remotes[N];
          if (P && !P.downed && (!g.duel || g.duel.id !== N)) {
            var M = !(!g.tmcLaDich || !g.tmcLaDich(N));
            var S = C && !a.dongDoiPk(N) && !a.khongPk(N, P);
            if ((x || P.doSat || M || S || a.coDich(P) || a.daoDich(P)) && (N === A || j("dosat:" + N, n.dist(u.x, u.y, P.x, P.y)))) {
              var H = O(P, "dosat", "Đạo hữu");
              H.chiCo = !x && !P.doSat && !M;
              h.push(H);
            }
          }
        }
      }
      if (g && g.remotes) {
        for (var R in g.remotes) {
          var G = g.remotes[R];
          if (G && !G.downed) {
            if (!(g.duel && g.duel.id === R || a.thuDich(G))) {
              if (j("player:" + R, f = n.dist(u.x, u.y, G.x, G.y))) {
                h.push(O(G, "player", "Đạo hữu"));
              }
            }
          }
        }
      }
      h.sort(function (e, n) {
        return e.dist - n.dist;
      });
      var I = null;
      for (c = 0; c < h.length; c++)
        if ("dosat" === h[c].kind && !h[c].chiCo) {
          I = h[c].key;
          break;
        }
      if (a.key && o(a.key) < 0 && (a.key = null, a.manual = !1), a.manual && a.key || (a.key = function (n) {
        if (!n.length) {
          return null;
        }
        var a;
        var t;
        var i = null;
        var r = e.HuThien;
        if (r && r.laDinh) {
          for (a = 0; a < n.length; a++)
            if ("enemy" === n[a].kind && r.laDinh(n[a].obj)) {
              i = n[a].key;
              break;
            }
        }
        for (a = 0; a < n.length; a++)
          if ("dosat" === n[a].kind && !n[a].chiCo) {
            return i || n[a].key;
          }
        for (a = 0; a < n.length; a++)
          if ("enemy" !== (t = n[a]).kind && "player" !== t.kind && "dosat" !== t.kind && t.dist <= t.r) {
            return t.key;
          }
        for (a = 0; a < n.length; a++)
          if (!("player" === (t = n[a]).kind || "enemy" === t.kind && t.obj && t.obj.def && (t.obj.def.human || t.obj.def.tieuXa))) {
            return "dosat" === t.kind && i ? i : t.key;
          }
        return null;
      }(h)), I && !a.doSatTruoc && (a.key = I, a.manual = !1), a.doSatTruoc = !!I, a.khoaNguoi) {
        var Y = "dosat:" + a.khoaNguoi;
        if (o(Y) >= 0) {
          a.key = Y;
          a.manual = !0;
        }
        else {
          a.khoaNguoi = null;
        }
      }
      if (D) {
        a.key = D;
        a.manual = !1;
      }
    }
    else {
      a.key = null;
    }
    function j(e, n) {
      return n <= (e === v ? p : s);
    }
    function w(e) {
      for (var t = 0; t < e.length; t++) {
        var r = e[t];
        if (!(r.hidden || !1 === r.targetable || (f = n.dist(u.x, u.y, r.x, r.y - y / 2)) > s)) {
          h.push({ key: "prop:" + r.id, kind: "prop", obj: r, x: r.x, y: r.y - y / 2, baseY: r.y, topY: i(r), name: r.name || r.id, r: a.propReach(r), dist: f });
        }
      }
    }
    function O(a, t, i) {
      return { key: t + ":" + a.id, kind: t, obj: a, x: a.x, y: a.y - 22, baseY: a.y, topY: a.y - e.CONFIG.CHAR_ANCHOR_Y - 24, name: a.name || i, r: e.CONFIG.PLAYER.REACH, dist: n.dist(u.x, u.y, a.x, a.y) };
    }
  };
  a.coDich = function (n) {
    var a = e.Gateway;
    var t = e.CoChien;
    if (!(n && a && t && t.hostile(a.coChien, n.coChien))) {
      return !1;
    }
    var i = e.TileMap && e.TileMap.data;
    return !t.camO(i && i.id);
  };
  a.daoDich = function (n) {
    var a = e.Gateway;
    var t = e.ChinhDao;
    if (!(n && a && t && a.daoCua)) {
      return !1;
    }
    if (!t.nghich(t.dao(e), a.daoCua[n.id] || "")) {
      return !1;
    }
    if (!t.trongGio(Date.now())) {
      return !1;
    }
    if (a.daoKhoa && a.daoKhoa[n.id]) {
      return !1;
    }
    if (a.partyMember && a.partyMember(n.id)) {
      return !1;
    }
    var i = e.TileMap && e.TileMap.data;
    return !(e.DoSat && e.DoSat.safeMap && e.DoSat.safeMap(i && i.id));
  };
  a.pkTuDo = function () {
    var n = e.TileMap && e.TileMap.data;
    return !!n && !!(e.HacThi && e.HacThi.pkTuDo(n.id) || e.HuThien && e.HuThien.pkTuDo(n.id));
  };
  a.dongDoiPk = function (n) {
    var a = e.Gateway;
    var t = e.TileMap && e.TileMap.data;
    return !(t && e.HuThien && e.HuThien.pkTuDo(t.id) || !(a && a.partyMember && a.partyMember(n)));
  };
  a.khongPk = function (n, a) {
    return !!(e.HuThienUI && e.HuThienUI.khongDich && e.HuThienUI.khongDich(n, a));
  };
  a.thuDich = function (n) {
    var t = e.Gateway;
    return !(!n || n.downed || !t || !t.remotes || (!t.duel || t.duel.id !== n.id) && (!t.tmcLaDich || !t.tmcLaDich(n.id)) && !a.coDich(n) && !a.daoDich(n) && (!a.pkTuDo() || a.dongDoiPk(n.id) || a.khongPk(n.id, n)) && (!e.DoSat || !(t.doSatActive && t.doSatActive() || n.doSat)));
  };
  a.khoaVao = function (n) {
    if (!a.thuDich(n)) {
      return !1;
    }
    var t = e.Gateway;
    var i = !(!t.duel || t.duel.id !== n.id);
    a.khoaNguoi = i ? null : n.id;
    a.key = (i ? "duel:" : "dosat:") + n.id;
    a.manual = !0;
    return !0;
  };
  a.doiThuNguoi = function () {
    var e = a.current();
    return !e || "duel" !== e.kind && "dosat" !== e.kind ? null : e.obj;
  };
  a.current = function () {
    var e = o(a.key);
    return e < 0 ? null : a.list[e];
  };
  a.currentEnemy = function () {
    var e = a.current();
    return e && "enemy" === e.kind ? e.obj : null;
  };
  a.cycle = function () {
    var e = a.list;
    if (!e.length) {
      return null;
    }
    var n = e[(o(a.key) + 1) % e.length];
    a.key = n.key;
    a.manual = !0;
    a.khoaNguoi = "dosat" === n.kind ? n.obj.id : null;
    return n;
  };
  a.pickAt = function (e, i) {
    for (var r = a.list, o = null, u = t().TAP_RADIUS, d = null, l = t().TAP_RADIUS, h = 0; h < r.length; h++) {
      var c = r[h];
      var f = (c.topY + c.baseY) / 2;
      var y = n.dist(e, i, c.x, f);
      if ("dosat" === c.kind || "duel" === c.kind) {
        if (y < l) {
          l = y;
          d = c;
        }
      }
      else {
        if (y < u) {
          u = y;
          o = c;
        }
      }
    }
    if ((o = d || o)) {
      a.key = o.key;
      a.manual = !0;
      a.khoaNguoi = "dosat" === o.kind ? o.obj.id : null;
    }
    return o;
  };
  a.mucTieuTuongTac = function () {
    var e = a.current();
    return e ? "enemy" === e.kind || "player" === e.kind || "duel" === e.kind || "dosat" === e.kind ? null : e : null;
  };
  a.npcAt = function (a, t, r) {
    if (!a) {
      return null;
    }
    for (var o = e.CONFIG.TILE, u = a.props || [], d = null, l = 1 / 0, h = 0; h < u.length; h++) {
      var c = u[h];
      if ("npc" === c.type && !c.hidden) {
        var f = c.tapW || o / 2;
        var y = i(c) - (c.tapTopPad || 0);
        var k = c.y + (c.tapBottomPad || 0);
        if (!(Math.abs(t - c.x) > f || r > k || r < y)) {
          var s = n.dist(t, r, c.x, c.y - o / 2);
          if (s < l) {
            l = s;
            d = c;
          }
        }
      }
    }
    return d;
  };
  a.clear = function () {
    a.list.length = 0;
    a.key = null;
    a.manual = !1;
    a.doSatTruoc = !1;
    a.khoaNguoi = null;
  };
  a.draw = function (i, r, o, f) {
    var y = a.current();
    if (y) {
      var k = Math.round(2 * Math.sin(3.4 * (f || 0)));
      var s = Math.round(y.x - r);
      var p = Math.round(y.topY - o) + k;
      e.Pixel.ellipse(i, s, Math.round(y.baseY - o) + 1, 11, 4, null, n.alpha(t().COLOR, .55));
      (function (n, a, t) {
        var i;
        var r;
        var o = e.Pixel;
        for (i = -1; i <= 7 && !((r = 2 * (8 - i) + 1) <= 0); i++)
          o.r(n, a - (r >> 1), t + i, r, 1, h);
        for (i = 0; i < 7 && !((r = 2 * (7 - i) + 1) <= 0); i++)
          o.r(n, a - (r >> 1), t + i, r, 1, i < 2 ? d : i > 4 ? l : u);
        o.r(n, a - 5, t, 4, 1, c);
        o.r(n, a - 4, t + 1, 2, 1, d);
      })(i, s, p);
    }
  };
  var u = "#f7c822";
  var d = "#ffe463";
  var l = "#d99a10";
  var h = "#2b2118";
  var c = "#fffbe6";
}(window.PNTT);
