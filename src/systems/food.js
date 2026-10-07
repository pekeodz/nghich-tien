!function (n) {
  "use strict";
  var e = n.Food = { active: {}, PACKS: [1, 5] };
  e.SHOP = [{ id: "bat_com_linh_me", cost: 300 }, { id: "linh_ke_can", cost: 3e3, perDay: 1 }, { id: "dan_ngu_hanh", cost: 8e3, perDay: 1 }];
  e.LIMIT_FLAG = "food_mua_ngay";
  e.dayVN = function (n) {
    return Math.floor(((n || e.now()) + 252e5) / 864e5);
  };
  e.boughtToday = function (t, r, a) {
    var o = (r = r || n).Quest && r.Quest.flags;
    var i = o && o[e.LIMIT_FLAG];
    return i && i.ngay === e.dayVN(a) ? 0 | (i.da && i.da[t]) : 0;
  };
  e.leftToday = function (n, t, r) {
    var a = e.row(n);
    return a && a.perDay ? Math.max(0, a.perDay - e.boughtToday(n, t, r)) : 1 / 0;
  };
  e.row = function (n) {
    for (var t = 0; t < e.SHOP.length; t++)
      if (e.SHOP[t].id === n) {
        return e.SHOP[t];
      }
    return null;
  };
  e.defOf = function (e, t) {
    var r = (t = t || n).ITEMS ? t.ITEMS[e] : null;
    return r && r.food ? r : null;
  };
  e.now = function () {
    return Date.now();
  };
  e.buy = function (t, r, a) {
    if (a = a || n, r |= 0, e.PACKS.indexOf(r) < 0) {
      return { ok: !1, why: "không bán theo phần ấy" };
    }
    var o = e.row(t);
    if (!o) {
      return { ok: !1, why: "hàng cơm không có món ấy" };
    }
    var i = o.cost * r;
    if (r > e.leftToday(t, a)) {
      return { ok: !1, why: "hôm nay đã mua đủ " + o.perDay + " phần, mai mua tiếp" };
    }
    if (!a.Progress.spendStones(i)) {
      return { ok: !1, why: "không đủ Linh Thạch" };
    }
    if (o.perDay) {
      var f = a.Quest.flags;
      var u = e.dayVN();
      var c = f[e.LIMIT_FLAG];
      if (!(c && c.ngay === u)) {
        c = f[e.LIMIT_FLAG] = { ngay: u, da: {} };
      }
      c.da[t] = (0 | c.da[t]) + r;
    }
    a.Inventory.add(t, r);
    a.Quest.save();
    return { ok: !0, itemId: t, n: r, cost: i, stones: 0 | a.Progress.stones };
  };
  e.MAX_STACK_HOURS = 72;
  e.power = function (n) {
    var e = n && n.food || {};
    return 10 * (e.hpPct || 0) + (e.mp || 0) + (e.sp || 0) + (e.bp || 0);
  };
  e.betterActive = function (t, r, a) {
    r = r || n;
    for (var o = e.power(e.defOf(t, r)), i = e.list(r, a), f = 0; f < i.length; f++)
      if (i[f].id !== t && e.power(i[f].def) > o) {
        return i[f];
      }
    return null;
  };
  e.eat = function (t, r, a) {
    r = r || n;
    a = a || e.now();
    var o = e.defOf(t, r);
    if (!o) {
      return { ok: !1, why: "món ấy không ăn được" };
    }
    if (o.food.minRealm && r.Progress && r.realmIndexById && r.realmIndexById(r.Progress.realmId) < r.realmIndexById(o.food.minRealm)) {
      return { ok: !1, why: "cần Trúc Cơ sơ kỳ trở lên mới dùng được" };
    }
    if (!r.Inventory.has(t, 1)) {
      return { ok: !1, why: "trong túi không còn phần nào" };
    }
    var i = e.betterActive(t, r, a);
    if (i) {
      return { ok: !1, why: "đang dùng " + i.def.name + ", món này yếu hơn" };
    }
    var f = e.remaining(t, a);
    var u = 36e5 * o.food.hours;
    var c = 36e5 * e.MAX_STACK_HOURS;
    var h = Math.min(c, f + u);
    if (h <= f) {
      return { ok: !1, why: "còn no, chưa ăn thêm được" };
    }
    r.Inventory.remove(t, 1);
    var d = [];
    Object.keys(e.active).forEach(function (n) {
      if (n !== t) {
        if (e.remaining(n, a) > 0) {
          d.push(n);
        }
        delete e.active[n];
      }
    });
    e.active[t] = a + h;
    if (r.Quest.markAteFood) {
      r.Quest.markAteFood(t);
    }
    r.Quest.save();
    return { ok: !0, itemId: t, until: e.active[t], hours: o.food.hours, replaced: d };
  };
  e.remaining = function (n, t) {
    t = t || e.now();
    var r = e.active[n] || 0;
    return r <= t ? (e.active[n] && delete e.active[n], 0) : r - t;
  };
  e.isActive = function (n, t) {
    return e.remaining(n, t) > 0;
  };
  e.list = function (t, r) {
    t = t || n;
    r = r || e.now();
    var a = [];
    Object.keys(e.active).forEach(function (n) {
      var o = e.remaining(n, r);
      if (!(o <= 0)) {
        var i = e.defOf(n, t);
        if (i) {
          a.push({ id: n, def: i, left: o });
        }
        else {
          delete e.active[n];
        }
      }
    });
    return a;
  };
  e.tick = function (t, r, a, o) {
    if (t && !t.downed && r > 0) {
      a = a || n;
      var i = e.list(a, o);
      if (i.length) {
        for (var f = 0, u = 0, c = 0, h = 0, d = 0; d < i.length; d++)
          f += i[d].def.food.hpPct || 0, u += i[d].def.food.mp || 0, c += i[d].def.food.sp || 0, h += i[d].def.food.bp || 0;
        if (f > 0 && t.hp < t.hpMax) {
          var s = n.Player && n.Player.healMult ? n.Player.healMult(t) : 1;
          t.hp = Math.min(t.hpMax, t.hp + t.hpMax * (f / 100) * s * r);
        }
        if (u > 0 && t.mpMax > 0 && t.mp < t.mpMax) {
          t.mp = Math.min(t.mpMax, t.mp + u * r);
        }
        if (c > 0 && t.spMax > 0 && t.sp < t.spMax) {
          t.sp = Math.min(t.spMax, t.sp + c * r);
        }
        if (h > 0 && t.bpMax > 0 && t.bp < t.bpMax) {
          t.bp = Math.min(t.bpMax, t.bp + h * r);
        }
      }
    }
  };
  e.fmtLeft = function (n) {
    var e = Math.max(0, Math.ceil(n / 6e4));
    var t = Math.floor(e / 60);
    e -= 60 * t;
    return t > 0 ? t + " giờ" + (e ? " " + e + " phút" : "") : e + " phút";
  };
  e.serialize = function (n) {
    var t = {};
    n = n || e.now();
    Object.keys(e.active).forEach(function (r) {
      if (e.active[r] > n) {
        t[r] = e.active[r];
      }
    });
    return t;
  };
  e.load = function (n, t) {
    if (e.active = {}, n) {
      t = t || e.now();
      var r = null;
      var a = 0;
      Object.keys(n).forEach(function (e) {
        var o = +n[e] || 0;
        if (o > t && o > a) {
          r = e;
          a = o;
        }
      });
      if (r) {
        e.active[r] = a;
      }
    }
  };
  e.reset = function () {
    e.active = {};
  };
}(window.PNTT);
