!function (e) {
  "use strict";
  var r = e.CloudSave = { active: !1, dirty: !1, lastPush: 0, lastError: null };
  var n = null;
  var t = null;
  var a = null;
  var l = null;
  var i = null;
  var o = null;
  function u() {
    var r = e.Utils.store.get(e.CONFIG.STORAGE_KEY, null);
    return !(!r || !r.name);
  }
  r.pull = function () {
    return e.Net.online && e.Auth.user ? e.Net.client.from("characters").select("name, appearance, map_id, x, y, dir, realm_id, exp, save").eq("user_id", e.Auth.user.id).maybeSingle().then(function (n) {
      if (n.error) {
        throw n.error;
      }
      var t = n.data;
      if (r.markLocalOwner(e.Auth.user.id), !t) {
        return { found: u(), local: !0 };
      }
      var a = t.appearance && t.appearance.name ? t.appearance : null;
      if (a) {
        e.Utils.store.set(e.CONFIG.STORAGE_KEY, a);
      }
      var l = t.save && Object.keys(t.save).length ? t.save : null;
      if (l) {
        e.Utils.store.set(e.CONFIG.PROGRESS_KEY, l);
      }
      r.spawn = t.map_id && l ? { mapId: t.map_id, x: t.x, y: t.y, dir: t.dir } : null;
      return { found: !!a || u(), appearance: a };
    }).catch(function (n) {
      r.lastError = e.Net.viError(n);
      console.error("[PNTT] Lỗi nạp nhân vật:", n);
      return { found: u(), error: r.lastError };
    }) : Promise.resolve({ found: u(), local: !0 });
  };
  r.push = function (n) {
    if (!e.Net.online || !e.Auth.user) {
      return Promise.resolve(!1);
    }
    if (e.Gateway && e.Gateway.connected) {
      return Promise.resolve(!1);
    }
    if (e.Gateway && e.Gateway.configured && e.Gateway.configured()) {
      return Promise.resolve(!1);
    }
    if (!n && !r.dirty && !t) {
      return Promise.resolve(!1);
    }
    var a = function () {
      return function (n) {
        if (!n && !r.dirty) {
          return Promise.resolve(!1);
        }
        var t = e.Utils.store.get(e.CONFIG.STORAGE_KEY, null);
        var a = e.Utils.store.get(e.CONFIG.PROGRESS_KEY, null) || {};
        var l = e.SceneWorld;
        var i = l && l.player;
        var o = { user_id: e.Auth.user.id, name: t && t.name || e.Auth.username || "Đạo hữu", appearance: t || {}, save: a, realm_id: a.realm || "pham_nhan", exp: Math.round(a.exp || 0) };
        if (i && l.map && l.map.data) {
          o.map_id = l.map.data.id;
          o.x = Math.round(i.x);
          o.y = Math.round(i.y);
          o.dir = 0 | i.dir;
        }
        r.dirty = !1;
        r.lastPush = Date.now();
        return e.Net.client.from("characters").upsert(o, { onConflict: "user_id" }).then(function (n) {
          return n.error ? (r.dirty = !0, r.lastError = e.Net.viError(n.error), console.error("[PNTT] Lỗi lưu nhân vật:", n.error), !r.warned && e.HUD && e.HUD.setCaption && (r.warned = !0, e.HUD.setCaption("Chưa lưu được lên máy chủ — tiến trình chỉ nằm trên máy này.")), !1) : (r.lastError = null, !0);
        });
      }(n);
    };
    var l = t ? t.then(a, a) : a();
    t = l;
    var i = function (e) {
      if (t === l) {
        t = null;
      }
      return e;
    };
    l.then(i, i);
    return l;
  };
  r.start = function () {
    if (!r.active && e.Net.online && e.Auth.user) {
      r.active = !0;
      a = e.Quest.save;
      l = function () {
        a.apply(this, arguments);
        r.dirty = !0;
      };
      e.Quest.save = l;
      n = setInterval(function () {
        r.push(!1);
      }, 1e3 * e.Net.saveIntervalSec);
      i = function () {
        if ("hidden" === document.visibilityState) {
          r.push(!0);
        }
      };
      o = function () {
        r.push(!0);
      };
      document.addEventListener("visibilitychange", i);
      window.addEventListener("pagehide", o);
      window.addEventListener("beforeunload", o);
    }
  };
  r.stop = function () {
    if (n) {
      clearInterval(n);
      n = null;
    }
    if (i) {
      document.removeEventListener("visibilitychange", i);
      i = null;
    }
    if (o) {
      window.removeEventListener("pagehide", o);
      window.removeEventListener("beforeunload", o);
      o = null;
    }
    if (l && e.Quest.save === l) {
      e.Quest.save = a;
    }
    l = null;
    a = null;
    r.active = !1;
    r.spawn = null;
  };
  var s = "pntt_local_owner";
  r.localOwner = function () {
    return e.Utils.store.get(s, null);
  };
  r.markLocalOwner = function (r) {
    if (r) {
      e.Utils.store.set(s, r);
    }
  };
  r.clearLocal = function (n) {
    var t = r.localOwner();
    return !(n && t && t === n || (e.Utils.store.del(e.CONFIG.STORAGE_KEY), e.Utils.store.del(e.CONFIG.PROGRESS_KEY), n && r.markLocalOwner(n), 0));
  };
}(window.PNTT);
