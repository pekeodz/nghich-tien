!function (e) {
  "use strict";
  var n = e.Utils;
  var t = "pntt_gfx_quality";
  var r = [{ id: "binh_thuong", name: "Bình thường", tier: 2, fps: 0, maxDpr: 3, density: 0, vfx: 1 }, { id: "thap", name: "Thấp", tier: 1, fps: 60, maxDpr: 2, density: 0, vfx: .5 }, { id: "sieu_lo", name: "Siêu lỏ", tier: 0, fps: 30, maxDpr: 1, density: 1, vfx: 0 }];
  var i = { dust: 1, mote: 1, qiwisp: 1, chip: 1, blood: 1, bloodpool: 1, leaf: 1, flytrail: 1, smoke: 1, gather: 1, spark: 1, ember: 1, firepuff: 1, shard: 1, boltdust: 1, boltflash: 1, ripple: 1, hitspark: 1, springaura: 1, tieuxa: 1 };
  var a = { flash: 1, vignette: 1 };
  var o = e.Quality = { levels: r, level: r[0], tier: 2 };
  function u(e) {
    for (var n = 0; n < r.length; n++)
      if (r[n].id === e) {
        return r[n];
      }
    return null;
  }
  function l(n) {
    var t = o.tier >= 1 != n.tier >= 1;
    o.level = n;
    o.tier = n.tier;
    if (t && e.TanVienArt) {
      e.TanVienArt.nha(null);
    }
    if (t && e.BaiDaArt && e.BaiDaArt.nha) {
      e.BaiDaArt.nha(null);
    }
    if (t && e.RungTrucArt && e.RungTrucArt.nha) {
      e.RungTrucArt.nha(null);
    }
    if (t && e.DuocCocArt && e.DuocCocArt.nha) {
      e.DuocCocArt.nha(null);
    }
    if (t && e.LongUyenArt && e.LongUyenArt.nha) {
      e.LongUyenArt.nha(null);
    }
    if (t && e.ThungLungArt && e.ThungLungArt.nha) {
      e.ThungLungArt.nha(null);
    }
    var r = document.documentElement;
    if (r && r.classList) {
      r.classList.toggle("gfx-thap", 1 === n.tier);
      r.classList.toggle("gfx-sieu-lo", 0 === n.tier);
    }
  }
  o.get = function () {
    return o.level;
  };
  o.set = function (r) {
    var i = u(r);
    return i ? (l(i), n.store.set(t, i.id), e.Renderer && e.Renderer.display && e.Renderer.resize(), i) : o.level;
  };
  o.next = function () {
    var e = r.indexOf(o.level);
    return o.set(r[(e + 1) % r.length].id);
  };
  o.phone = function () {
    try {
      var e = window.matchMedia && window.matchMedia("(pointer: coarse)").matches;
      var n = window.screen || {};
      var t = Math.min(n.width || 0, n.height || 0) || Math.min(window.innerWidth || 0, window.innerHeight || 0);
      return !!e && t > 0 && t <= 500;
    }
    catch (e) {
      return !1;
    }
  }();
  o.PHONE_MAX_DPR = 2;
  o.maxDpr = function () {
    var e = o.level.maxDpr || 3;
    return o.phone ? Math.min(e, o.PHONE_MAX_DPR) : e;
  };
  o.IDLE_FPS = 30;
  o.IDLE_MS = 45e3;
  var c = h();
  function h() {
    return "undefined" != typeof performance && performance.now ? performance.now() : Date.now();
  }
  function f() {
    c = h();
  }
  if ("undefined" != typeof window && window.addEventListener) {
    ["pointerdown", "pointermove", "touchstart", "keydown", "wheel"].forEach(function (e) {
      window.addEventListener(e, f, { passive: !0, capture: !0 });
    });
  }
  o.markInput = f;
  o.AUTO_IDLE_MS = 8e3;
  o.idle = function (n) {
    if (s()) {
      return !1;
    }
    var t = e.SceneWorld && e.SceneWorld.player;
    if (t && "sit" === t.state) {
      return !0;
    }
    if (e.Input && e.Input.hasManualMove && e.Input.hasManualMove()) {
      c = null == n ? h() : n;
      return !1;
    }
    var r = (null == n ? h() : n) - c;
    return !!(e.SceneWorld && e.SceneWorld.autoOn && r >= o.AUTO_IDLE_MS) || r >= o.IDLE_MS;
  };
  o.LOWPOWER_MS = 18e4;
  o.LOWPOWER_FPS = 10;
  var d = "pntt_tiet_kiem_pin";
  function s() {
    var n = e.SceneWorld && e.SceneWorld.map;
    return !(!n || !n.data || "dai_hoi_dau" !== n.data.id);
  }
  o.lowPowerOn = 0 !== +n.store.get(d, 1);
  o.setLowPower = function (e) {
    o.lowPowerOn = !!e;
    n.store.set(d, e ? 1 : 0);
    return o.lowPowerOn;
  };
  o.lowPower = function (n) {
    return !(!o.lowPowerOn || s()) && !(e.Input && e.Input.hasManualMove && e.Input.hasManualMove()) && (null == n ? h() : n) - c >= o.LOWPOWER_MS;
  };
  o.TOUCH_FPS = 60;
  o.touch = function () {
    try {
      return !(!window.matchMedia || !window.matchMedia("(pointer: coarse)").matches);
    }
    catch (e) {
      return !1;
    }
  }();
  o.CROWD_ON = 15;
  o.CROWD_OFF = 10;
  o.CROWD_FPS = 30;
  o.crowd = !1;
  o.setCrowd = function (e, n) {
    if (!1 === n) {
      o.crowd = !1;
    }
    else {
      if (o.crowd) {
        if (e < o.CROWD_OFF) {
          o.crowd = !1;
        }
      }
      else {
        if (e >= o.CROWD_ON) {
          o.crowd = !0;
        }
      }
    }
  };
  o.remoteTier = function () {
    return o.crowd && !s() ? Math.max(0, o.tier - 1) : o.tier;
  };
  o.fpsCap = function (e) {
    var n = o.level.fps;
    if (!(n > 0 || !o.touch)) {
      n = o.TOUCH_FPS;
    }
    if (o.lowPower(e)) {
      n = n > 0 ? Math.min(n, o.LOWPOWER_FPS) : o.LOWPOWER_FPS;
    }
    else {
      if (o.idle(e)) {
        n = n > 0 ? Math.min(n, o.IDLE_FPS) : o.IDLE_FPS;
      }
    }
    if (o.crowd && 1 === o.tier && !s()) {
      n = n > 0 ? Math.min(n, o.CROWD_FPS) : o.CROWD_FPS;
    }
    return n;
  };
  o.isDecor = function (e) {
    return !!i[e];
  };
  o.vfxCap = function () {
    return o.tier >= 2 ? 320 : 1 === o.tier ? 200 : 100;
  };
  o.keepVfx = function (e) {
    return !!(o.tier >= 2 || !e || s()) || (i[e.type] ? 0 !== o.tier && Math.random() < o.level.vfx : !a[e.type] || o.tier > 0);
  };
  var p = { 2: 6, 1: 0, 0: 0 };
  var w = [];
  function m(e, n, t) {
    if (!e || !n) {
      return !1;
    }
    var r = e.x - n.x;
    var i = e.y - n.y;
    return r * r + i * i <= t * t;
  }
  function g(n, t) {
    var r = e.Camera;
    var i = e.Renderer;
    return !(r && i && i.w > 0 && i.h > 0) || n >= r.x - 64 && n <= r.x + i.w + 64 && t >= r.y - 64 && t <= r.y + i.h + 64;
  }
  o.remoteSpell = function (n, t, r) {
    if (!n) {
      return "full";
    }
    var i = e.SceneWorld && e.SceneWorld.player;
    if (!i || s()) {
      return "full";
    }
    var a = "aura" === n.shape || "self" === n.shape ? t : r && r.target ? r.target : r;
    var u = r && r.target === i || m(t, i, Math.max(200, (n.range || 0) + 40)) || m(a, i, 200);
    if (!(u || a && g(a.x, a.y) || t && g(t.x, t.y))) {
      return "skip";
    }
    var l = o.remoteTier();
    if (0 === l && !u) {
      return "cham";
    }
    if (!n.vfx) {
      return "full";
    }
    for (var c = ("undefined" != typeof performance && performance.now ? performance.now() : Date.now()) / 1e3, h = w.length - 1; h >= 0; h--)
      w[h] <= c && w.splice(h, 1);
    return !u && w.length >= (p[l] || 0) ? 0 === l ? "skip" : "lite" : (w.push(c + function (e) {
      return Math.min(4, (e.delay || 0) + (e.hitDelay || 0) + 1.2);
    }(n)), "full");
  };
  o.chamNguoi = function () {
    return 0 === o.remoteTier() && !s();
  };
  var v;
  var _ = "pntt_an_nguoi";
  var D = [{ id: 0, name: "Hiện tất cả" }, { id: 1, name: "Chỉ đồng đội" }, { id: 2, name: "Ẩn hết" }];
  var M = 1 === (v = +n.store.get(_, 0)) || 2 === v ? v : 0;
  o.nguoiMode = function () {
    return M;
  };
  o.nguoiLabel = function () {
    return D[M].name;
  };
  o.nguoiNext = function () {
    M = (M + 1) % D.length;
    n.store.set(_, M);
    return M;
  };
  o.anNguoi = function (n) {
    if (0 === M || !n || s()) {
      return !1;
    }
    var t = e.Targeting;
    var r = e.Gateway;
    return !(t && t.thuDich && t.thuDich(n) || 1 === M && r && r.partyMember && r.partyMember(n.id));
  };
  o.boDonXa = function (n) {
    return !(!o.crowd || s() || m(n, e.SceneWorld && e.SceneWorld.player, 200));
  };
  o.resetSpellBudget = function () {
    w.length = 0;
  };
  l(u(n.store.get(t, o.phone ? "thap" : "binh_thuong")) || u("binh_thuong"));
}(window.PNTT);
