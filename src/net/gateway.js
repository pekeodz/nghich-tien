!function (e) {
  "use strict";
  var n = e.Gateway = { PROTOCOL: 10, socket: null, connected: !1, selfId: null, mapId: null, remotes: {}, serverTime: 0, lastError: null, ready: !1, duel: null, duelResults: Object.create(null), invite: null, duelInvites: Object.create(null), duelInviteOrder: [], onCreateCharError: null, party: null, partyPending: Object.create(null), partyInviteOrder: [], sect: null, clan: null, sectPending: Object.create(null), sectInviteOrder: [], doSatUntil: 0, formation: e.FormationState ? e.FormationState.create() : { supported: !1 } };
  var t = 160;
  var a = 160;
  var i = [];
  var o = 0;
  var r = null;
  var s = 0;
  function u() {
    s = Date.now() + 1200;
    h();
    a = 120;
    i = [];
    v.lastSnapAt = 0;
  }
  function l() {
    var e = Date.now();
    if (!(e - o < 3e3 || e - (l.at || 0) < 1e3)) {
      l.at = e;
      a = Math.max(120, a - 15);
    }
  }
  if ("undefined" != typeof document && document.addEventListener) {
    document.addEventListener("visibilitychange", function () {
      if (!(document.hidden)) {
        u();
      }
    });
    window.addEventListener("focus", u);
  }
  var d = null;
  function c(e) {
    var n = Date.now() - e;
    if (null === d || Math.abs(n - d) > 1e3 || n < d) {
      d = n;
    }
    else {
      d += .05;
    }
  }
  function h() {
    d = null;
    m = {};
    i = [];
    r = null;
    p = Date.now() + 1500;
  }
  var p = 0;
  function f(e) {
    return (e = Number(e) || 0) && null !== d ? e + d : e;
  }
  n.gioMayChu = function () {
    return null === d ? null : Date.now() - d;
  };
  var m = {};
  function y(e, n, t, a) {
    var i = m[e] || (m[e] = []);
    var o = i[i.length - 1];
    if (!(o && n <= o.t)) {
      i.push({ t: n, x: t, y: a });
      if (i.length > 8) {
        i.shift();
      }
    }
  }
  function g(e, n) {
    var i = null === d ? null : Date.now() - d - t;
    if (null === i) {
      return !1;
    }
    var u = function (e, n) {
      var i = m[e];
      if (!i || !i.length) {
        return null;
      }
      if (1 === i.length || n <= i[0].t) {
        return { x: i[0].x, y: i[0].y };
      }
      for (var u = 1; u < i.length; u++)
        if (!(i[u].t < n)) {
          var l = i[u - 1];
          var d = i[u];
          var c = d.t - l.t;
          var h = c > 0 ? (n - l.t) / c : 1;
          return { x: l.x + (d.x - l.x) * h, y: l.y + (d.y - l.y) * h };
        }
      var p;
      var f = i[i.length - 1];
      var y = i[i.length - 2];
      var g = n - f.t;
      if (g > 1500) {
        return { x: f.x, y: f.y };
      }
      if ((p = f.t) !== r) {
        r = p;
        if (!(Date.now() < s)) {
          o = Date.now();
          v.underruns++;
          S.sample(S.KIND.underrun, t);
          a = Math.min(420, a + 25);
        }
      }
      var x = Math.min(100, g);
      if (x <= 0) {
        return { x: f.x, y: f.y };
      }
      var I = Math.max(1, f.t - y.t);
      return { x: f.x + (f.x - y.x) * x / I, y: f.y + (f.y - y.y) * x / I };
    }(n, i);
    if (!u) {
      return !1;
    }
    var l = Date.now();
    var c = !e._smT;
    var h = c ? 0 : Math.min(250, l - e._smT);
    e._smT = l;
    var p = u.x - e.x;
    var f = u.y - e.y;
    if (c || p * p + f * f > 67600) {
      e.x = u.x;
      e.y = u.y;
      e._ex = 0;
      e._ey = 0;
      return !0;
    }
    var y = e._ex || 0;
    var g = e._ey || 0;
    if (y || g) {
      var x = Math.exp(-h / 80);
      if ((y *= x) * y + (g *= x) * g < .04) {
        y = 0;
        g = 0;
      }
    }
    var I = e.x - (u.x + y);
    var w = e.y - (u.y + g);
    var k = 4 + .7 * h;
    if (I * I + w * w > k * k) {
      y += I;
      g += w;
    }
    e._ex = y;
    e._ey = g;
    e.x = u.x + y;
    e.y = u.y + g;
    return !0;
  }
  n.netBuffer = { push: function (e, n, t, a) {
      c(n);
      y(e, n, t, a);
    }, place: g, drop: function (e) {
      delete m[e];
    }, reset: h };
  var v = { snaps: 0, gapMin: 1e9, gapMax: 0, gapSum: 0, lastSnapAt: 0, softFix: 0, hardFix: 0, ignoredFix: 0, staleFix: 0, blockedFix: 0, underruns: 0, drops: 0, teleports: 0, snapDropped: 0, snap2Full: 0, snap2Stale: 0, resyncs: 0, aoiExits: 0 };
  var x = e.SnapDelta ? e.SnapDelta.create() : null;
  var S = e.Probe || { on: !1, KIND: {}, FIX: {}, now: function () {
      return 0;
    }, time: function () {
    }, sample: function () {
    }, count: function () {
    }, warn: function () {
    }, stat: function () {
      return null;
    }, get: function () {
      return 0;
    } };
  e.netDebug = function () {
    var i;
    var o = v.snaps || 1;
    return { "ảnh chụp nhận được": v.snaps, "nhịp ảnh chụp (ms)": { "nhỏ nhất": Math.round(1e9 === v.gapMin ? 0 : v.gapMin), "trung bình": Math.round(v.gapSum / o), "lớn nhất": Math.round(v.gapMax) }, "kéo vị trí": { "lờ đi (dưới vùng chết)": v.ignoredFix, "trôi êm": v.softFix, "nhảy thẳng": v.hardFix, "bỏ vì đã sửa rồi": v.staleFix, "chỗ máy chủ chỉ vào đang bị chắn": v.blockedFix }, "nhịp khung hình (ms)": S.stat("khung hình"), "số khung hình khựng quá 100ms": S.get("khung khựng quá 100ms"), "đang vẽ / đang biết": (i = e.SceneWorld && e.SceneWorld.cullStats, i ? { "người khác": i.remotesDrawn + "/" + i.remotes, "quái": i.enemiesDrawn + "/" + i.enemies } : null), "số lần rớt kết nối": v.drops, "số lần bị dời chỗ tức thì": v.teleports, "ảnh chụp v2": x ? { "gói toàn cảnh": v.snap2Full, "xin toàn cảnh": v.resyncs, "gói của bản đồ cũ bị bỏ": v.snap2Stale, "lượt người ra khỏi tầm nhìn": v.aoiExits, "người trong phòng / đang thấy": Object.keys(n.roster).length + " / " + Object.keys(n.remotes).length, "đang giữ": x.players.size + " người, " + x.mobs.size + " quái" } : "không nạp", "dấu bản đồ": { "máy chủ đang ở": n.mapEpoch, "cảnh đang mô phỏng": b, "máy chủ có hiểu dấu": T }, "lệch đồng hồ với máy chủ (ms)": null === d ? null : Math.round(d), "độ trễ vẽ (ms)": Math.round(t), "độ trễ vẽ đang nhắm tới (ms)": Math.round(a), "số lần cạn mốc (phải suy tiếp)": v.underruns, "ảnh chụp bỏ vì đang chuyển cảnh": v.snapDropped };
  };
  var I = null;
  var w = null;
  function k() {
    if (!n.ready || "undefined" != typeof document && document.hidden) {
      I = null;
    }
    else {
      var a = { at: Date.now(), u: v.underruns, l: S.get("khung khựng quá 100ms") || 0 };
      if (I) {
        var o = S.stat("khung hình");
        var r = { v: 1, s: Math.round((a.at - I.at) / 1e3), u: Math.max(0, a.u - I.u), l: Math.max(0, a.l - I.l), d: Math.round(t), n: Object.keys(n.remotes).length, q: e.Quality ? e.Quality.tier : 2 };
        var s = function () {
          if (i.length < 4) {
            return null;
          }
          var e = i.slice().sort(function (e, n) {
            return e - n;
          });
          return e[Math.floor(.9 * e.length)];
        }();
        if (null !== s) {
          r.g = Math.round(s);
        }
        if (o && o.p95 >= 0) {
          r.f = Math.round(o.p95);
        }
        if (null !== w) {
          r.r = Math.round(w);
        }
        I = a;
        G({ op: "ping", t: Date.now(), ns: r });
      }
      else {
        I = a;
      }
    }
  }
  n.sendNetReport = k;
  var F = 0;
  n.mapEpoch = 0;
  var b = 0;
  var T = !1;
  var _ = 0;
  var D = 0;
  var C = 0;
  var U = [];
  var A = { x: -1, y: -1, dir: -1, state: "", pose: "", fly: -1, fishing: -1, fishX: -1, fishY: -1 };
  var M = {};
  var X = 0;
  var H = null;
  var P = 1e3;
  var V = null;
  var W = !1;
  var O = !1;
  var E = null;
  var N = !1;
  n.daChao = !1;
  var B = null;
  var L = {};
  function K() {
    return null;
  }
  n.configured = function () {
    return !!K();
  };
  n.login = function (e) {
    return new Promise(function (t) {
      var a = !1;
      function i(e) {
        if (!(a)) {
          a = !0;
          n.onLogin = null;
          t(e);
        }
      }
      n.onLogin = i;
      if (n.connect()) {
        setTimeout(function () {
          i(null);
        }, e || 6e3);
      }
      else {
        i(null);
      }
    });
  };
  n.connect = function (t) {
    var a = K();
    if (!a) {
      n.lastError = "Không rõ địa chỉ máy chủ.";
      return !1;
    }
    if (n.socket && (0 === n.socket.readyState || 1 === n.socket.readyState)) {
      return !0;
    }
    n.onReady = t || n.onReady;
    n.bindIntents();
    try {
      n.socket = new WebSocket(a);
    }
    catch (e) {
      n.lastError = "Không mở được kết nối: " + e.message;
      j();
      return !1;
    }
    n.socket.onopen = function () {
      n.connected = !0;
      n.lastError = null;
      (e.Net && e.Net.online && e.Net.client ? e.Net.client.auth.getSession().then(function (e) {
        var n = e && e.data && e.data.session;
        return n && n.access_token || "guest";
      }).catch(function () {
        return "guest";
      }) : Promise.resolve("guest")).then(function (t) {
        var a = { op: "hello", token: t, name: q(), proto: n.PROTOCOL };
        if (x) {
          a.snap = 2;
        }
        if (e.Formations && e.FormationState) {
          a.features = { formation: e.Formations.PROTOCOL };
        }
        G(a);
      });
    };
    n.socket.onmessage = function (t) {
      var a;
      var i = S.on ? S.now() : 0;
      try {
        a = JSON.parse(t.data);
      }
      catch (e) {
        return;
      }
      !function (t) {
        switch (t.op) {
          case "welcome": return function (t) {
            W = !1;
            P = 1e3;
            n.selfId = t.selfId;
            n.serverTime = t.serverTime;
            n.hasChar = !!t.hasChar;
            if (t.appearanceShop && e.AppearanceShop && e.AppearanceShop.setPrices) {
              e.AppearanceShop.setPrices(t.appearanceShop);
            }
            n.coChien = "";
            n.coDenBuoc = !1;
            if (e.TayTrai && e.TayTrai.ve) {
              e.TayTrai.ve();
            }
            n.snapV = 2 === t.snap ? 2 : 1;
            if (null != t.ep) {
              T = !0;
              n.mapEpoch = 0 | t.ep;
            }
            var a = !!(e.Formations && e.FormationState && t.features && t.features.formation === e.Formations.PROTOCOL);
            if (e.FormationState ? e.FormationState.reset(n.formation, a, n.mapEpoch) : n.formation.supported = !1, e.FormationUI && e.FormationUI.setSupported && e.FormationUI.setSupported(a), t.appearance && t.appearance.name && (e.Utils.store.set(e.CONFIG.STORAGE_KEY, t.appearance), function (n) {
              var t = e.SceneWorld && e.SceneWorld.player;
              if (t && t.cfg) {
                var a = { weapon: 1, fly: 1, hat: 1, aura: 1 };
                for (var i in n)
                  Object.prototype.hasOwnProperty.call(n, i) && !a[i] && (t.cfg[i] = n[i]);
                if (t.refreshSheet) {
                  t.refreshSheet();
                }
              }
            }(t.appearance)), n.hasChar || (n.ready = !0), N = !0, n.daChao = !0, n.onLogin && n.onLogin({ hasChar: n.hasChar }), B) {
              if (!(n.hasChar)) {
                pe();
              }
            }
            else if (!n.hasChar && e.Game && e.SceneWorld && e.Game.scene === e.SceneWorld) {
              var i = e.Utils.store.get(e.CONFIG.STORAGE_KEY, null);
              if (i && i.name) {
                G({ op: "create_char", appearance: i });
              }
            }
          }(t);
          case "mo_khoa": return void (e.MO_KHOA = { khucBon: !0 === t.khucBon, huThien: !0 === t.huThien });
          case "appearance_shop": return void (e.AppearanceShop && e.AppearanceShop.setPrices && e.AppearanceShop.setPrices(t));
          case "state": return function (t) {
            if (t.save) {
              if ("huyet_harvest" === t.act && e.Audio && e.Audio.play && e.Audio.play("pickup", { gain: .75 }), "tam_kiep_len" === t.act) {
                var a = e.SceneWorld && e.SceneWorld.player;
                if (e.Audio && e.Audio.play) {
                  e.Audio.play("breakthrough");
                }
                if (a && e.VFX && e.VFX.spawnQuestComplete) {
                  e.VFX.spawnQuestComplete(a.x, a.y);
                }
              }
              if (e.Utils.store.set(e.CONFIG.PROGRESS_KEY, t.save), e.Quest.load(), n.ready = !0, e.Skills && e.Skills.syncPrefsFromServer && e.Skills.syncPrefsFromServer(e.Quest.flags) && e.Hotbar) {
                var i = e.SceneWorld && e.SceneWorld.player;
                if (e.Hotbar.update) {
                  e.Hotbar.update(i);
                }
                if (e.Hotbar.renderAuto) {
                  e.Hotbar.renderAuto();
                }
              }
              var o = e.SceneWorld && e.SceneWorld.player;
              if (o && (e.Progress.realmId !== o.realmId && e.Player.setRealm(o, e.Progress.realmId), o.exp = e.Progress.exp, o.cfg && (e.Progress.linhCan ? o.cfg.linhCan = e.Progress.linhCan : delete o.cfg.linhCan), e.Player.refreshEquipment(o)), e.HUD && (e.HUD.updateQuest && e.HUD.updateQuest(), e.HUD.refreshRealm && e.HUD.refreshRealm(), e.HUD.refreshBag && e.HUD.refreshBag()), n.onReady) {
                var r = n.onReady;
                n.onReady = null;
                r(t);
              }
              if (n.hasChar = !0, B) {
                var s = B.ok;
                clearTimeout(B.timer);
                B = null;
                if (s) {
                  s();
                }
              }
            }
          }(t);
          case "map": return function (t) {
            n.mapId = t.mapId;
            if ("lam_lang" === t.mapId && e.Audio && e.Audio.play) {
              e.Audio.play("lam_lang_entry", { gain: .65 });
            }
            if (e.KhuUI) {
              e.KhuUI.setMap(t.mapId, t.khu, t.soKhu);
            }
            if (e.TranMachUI) {
              e.TranMachUI.setMap(t.mapId);
            }
            if (e.CongBossUI) {
              e.CongBossUI.setMap(t.mapId);
            }
            if (null != t.ep) {
              T = !0;
              n.mapEpoch = 0 | t.ep;
            }
            if (e.FormationState) {
              e.FormationState.reset(n.formation, n.formation.supported, n.mapEpoch);
            }
            if (e.FormationUI && e.FormationUI.onMap) {
              e.FormationUI.onMap(n.mapEpoch);
            }
            n.remotes = {};
            n.honBay = [];
            n.honNghiep = Object.create(null);
            n.daoCua = Object.create(null);
            if (e.AmHon) {
              e.AmHon.reset();
            }
            n.khoiLoiBay = [];
            if (e.KhoiLoiFX) {
              e.KhoiLoiFX.reset();
            }
            n.duelResults = Object.create(null);
            var a = e.SceneWorld && e.SceneWorld.player;
            if (a) {
              a.duelResult = null;
            }
            n.roster = {};
            n.mach = { mapId: t.mapId, rows: {} };
            L = {};
            h();
            if (x) {
              e.SnapDelta.reset(x);
            }
            (t.p || []).forEach(function (e) {
              ie(e.id, e, e.pos);
            });
            if (e.SceneWorld && e.SceneWorld.enterServerMap) {
              e.SceneWorld.enterServerMap(t);
            }
            le();
          }(t);
          case "snap": return z(t);
          case "snap2": return function (t) {
            if (x)
              if (T && null != t.ep && (0 | t.ep) !== n.mapEpoch) {
                v.snap2Stale++;
              }
              else {
                var a;
                var i;
                var o = e.SnapDelta.apply(x, t);
                if (!o.ok) {
                  c(t.t);
                  a = o.why;
                  return void ((i = Date.now()) - J < 1e3 || (J = i, v.resyncs++, S.count("mạng · xin toàn cảnh"), S.on && S.warn("resync", "Ảnh chụp lệch (" + a + ") — xin toàn cảnh"), G({ op: "resync" })));
                }
                if (t.full && v.snap2Full++, t.gp) {
                  for (var r = 0; r < t.gp.length; r++) {
                    var s = t.gp[r];
                    if (n.remotes[s]) {
                      v.aoiExits++;
                    }
                    oe(s);
                  }
                }
                if (t.ge) {
                  for (var u = e.SceneWorld, l = 0; l < t.ge.length; l++) {
                    delete m[t.ge[l]];
                    var d = u && u.enemies ? be(u, t.ge[l]) : null;
                    if (d) {
                      d.netSeen = !1;
                    }
                  }
                }
                z({ op: "snap", t: t.t, p: o.players, e: o.mobs });
              }
          }(t);
          case "you": return function (n) {
            var t = e.SceneWorld && e.SceneWorld.player;
            if (t) {
              for (var a = 0 | n.seq, i = null, o = [], r = 0; r < U.length; r++) {
                var s = U[r];
                if (s.seq === a) {
                  i = s;
                }
                if (s.seq > a) {
                  o.push(s);
                }
              }
              if (U = o, n.fix && null != n.ep && (0 | n.ep) !== b) {
                v.staleFix++;
                S.sample(S.KIND.fix, 0, 0, a, S.FIX.stale);
              }
              else if (n.fix && a <= _) {
                v.staleFix++;
                S.sample(S.KIND.fix, 0, 0, a, S.FIX.stale);
              }
              else if (n.fix) {
                var u = n.x;
                var l = n.y;
                if (i) {
                  u += t.x - i.x;
                  l += t.y - i.y;
                }
                var d = u - t.x;
                var c = l - t.y;
                var h = Math.sqrt(d * d + c * c);
                if (h <= 6) {
                  v.ignoredFix++;
                  S.sample(S.KIND.fix, Math.round(h), o.length, a, S.FIX.ignored);
                  F = 0;
                }
                else {
                  if (h > 140) {
                    if (++F >= 3 && Date.now() > p) {
                      F = 0;
                      v.hardFix++;
                      S.sample(S.KIND.fix, Math.round(h), o.length, a, S.FIX.hard);
                      Z(t, u, l, !1);
                      if (t.path) {
                        t.path.length = 0;
                      }
                      if (e.SceneWorld.cancelApproach) {
                        e.SceneWorld.cancelApproach();
                      }
                      ee(t);
                    }
                    else {
                      v.softFix++;
                      S.sample(S.KIND.fix, Math.round(h), o.length, a, S.FIX.soft);
                      Z(t, u, l, !0);
                    }
                  }
                  else {
                    F = 0;
                    v.softFix++;
                    S.sample(S.KIND.fix, Math.round(h), o.length, a, S.FIX.soft);
                    Z(t, u, l, !0);
                  }
                }
              }
              if (void 0 !== n.hp) {
                t.hp = n.hp;
              }
              if (void 0 !== n.mp) {
                t.mp = n.mp;
              }
              if (void 0 !== n.sp) {
                t.sp = n.sp;
              }
              if (void 0 !== n.bp) {
                t.bp = n.bp;
              }
              if (n.dn && !t.downed) {
                e.Player.knockDown(t);
              }
            }
          }(t);
          case "status": return function (n) {
            var t = e.SceneWorld && e.SceneWorld.player;
            if (t) {
              var a = t.shieldHp || 0;
              var i = t.hasteT || 0;
              var o = t.slowT || 0;
              var r = t.poisonT || 0;
              var s = t.hinhT || 0;
              var u = t.linhAnUntil > Date.now();
              if (t.hasteT = +n.ht || 0, t.hasteMult = t.hasteT > 0 && +n.hm || 1, t.shieldHp = +n.sh || 0, t.shieldT = +n.shT || 0, t.shieldLong = !!n.shL, t.shieldBell = !!n.shB, t.slowT = +n.sl || 0, t.slowMult = t.slowT > 0 && +n.slm || 1, t.hinhT = +n.hn || 0, t.hinhId = t.hinhT > 0 && n.hi || null, t.hinhGiap = t.hinhT > 0 && +n.hg || 0, t.hinhGiapMax = t.hinhT > 0 && +n.hgm || 0, t.hinhT > 0 && s <= 0 && (t.hinhTuoi = 0), t.stunT = +n.st || 0, t.rootT = +n.rt || 0, t.freezeT = +n.fz || 0, t.linhAnUntil = +n.la > 0 ? Date.now() + 1e3 * +n.la : 0, t.burnT = +n.bn || 0, t.burnDps = t.burnT > 0 && +n.bd || 0, t.burnMa = t.burnT > 0 && !!n.bm, t.resistN = +n.rk || 0, t.poisonT = +n.pn || 0, t.poisonDps = t.poisonT > 0 && +n.pd || 0, t.woundT = +n.wn || 0, t.woundDps = t.woundT > 0 && +n.wd || 0, t.woundHeal = t.woundT > 0 ? null == n.wh ? .5 : +n.wh : 1, (t.stunT > 0 || t.rootT > 0) && t.path && (t.path.length = 0), t.talismanCds = {}, n.tcd) {
                for (var l in n.tcd)
                  t.talismanCds[l] = +n.tcd[l] || 0;
              }
              if (e.VFX) {
                if (t.shieldHp > a && !t.shieldBell) {
                  if (e.VFX.spawnGoldenWard) {
                    e.VFX.spawnGoldenWard(t.x, t.y, { core: "#fff8c9", mid: "#e8c85a", edge: "#b8862a", glow: "#ffd978" });
                  }
                  else {
                    e.VFX.spawnRing(t.x, t.y - 14, "#ffd978", 34, .5);
                  }
                }
                if (t.hasteT > i && i <= 0) {
                  e.VFX.spawnRing(t.x, t.y - 10, "#bdf0d2", 30, .4);
                }
                if (t.slowT > o && o <= 0) {
                  e.VFX.spawnRing(t.x, t.y - 10, "#a8dcf5", 26, .45);
                }
                if (!u && t.linhAnUntil > Date.now() && e.VFX.spawnText) {
                  e.VFX.spawnText(t.x, t.y - 64, "Linh Ấn", "#d9a7ff");
                }
                if (t.poisonT > r && r <= 0 && e.VFX.spawnPoisoned) {
                  e.VFX.spawnPoisoned(t, t.poisonT);
                }
              }
            }
          }(t);
          case "formation": return function (t) {
            if (e.FormationState && n.formation) {
              var a = "undefined" != typeof performance && performance.now ? performance.now() : Date.now();
              var i = e.FormationState.apply(n.formation, t, n.selfId, n.mapEpoch, a);
              if (i.ok) {
                if ("balance" === t.act) {
                  if (Number.isSafeInteger(t.stones) && t.stones >= 0) {
                    e.Progress.stones = t.stones;
                  }
                  var o = e.SceneWorld && e.SceneWorld.player;
                  if (o && "number" == typeof t.mp && isFinite(t.mp)) {
                    o.mp = Math.max(0, Math.min(o.mpMax, t.mp));
                  }
                  if ("string" == typeof t.item && Number.isSafeInteger(t.itemCount) && t.itemCount >= 0) {
                    if (t.itemCount) {
                      e.Inventory.bag[t.item] = t.itemCount;
                    }
                    else {
                      delete e.Inventory.bag[t.item];
                    }
                  }
                  if (e.HUD && e.HUD.refreshBag) {
                    e.HUD.refreshBag();
                  }
                }
                if (e.FormationUI && e.FormationUI.onPacket) {
                  e.FormationUI.onPacket(t, i);
                }
              }
            }
          }(t);
          case "hon": return function (t) {
            if ("phien" === t.act) {
              if (t.khoa) {
                Y(t.khoa);
              }
              if (t.phien && e.QuyAnFX) {
                e.QuyAnFX.prime();
              }
              return void (e.HonPhienUI && e.HonPhienUI.dat(t));
            }
            if ("khoa" !== t.act) {
              if ("coDen" === t.act) {
                n.coDenBuoc = !!t.buoc;
                n.coChien = t.co || "";
                return void (e.TayTrai && e.TayTrai.ve && e.TayTrai.ve());
              }
              if ("bay" === t.act) {
                n.honBay = t.l || [];
                n.honNghiep = Object.create(null);
                for (var a = t.ac || [], i = 0; i < a.length; i++)
                  n.honNghiep[a[i]] = 1;
                n.daoCua = Object.create(null);
                for (var o = t.ch || [], r = t.mt || [], s = 0; s < o.length; s++)
                  n.daoCua[o[s]] = "chinh";
                for (var u = 0; u < r.length; u++)
                  n.daoCua[r[u]] = "ma";
                if (e.HonPhienUI) {
                  e.HonPhienUI.veLai();
                }
              }
            }
            else {
              Y(t.ids || []);
            }
          }(t);
          case "khoiloi": return function (t) {
            if ("bay" === t.act) {
              n.khoiLoiBay = t.l || [];
              return void (e.KhoiLoiUI && e.KhoiLoiUI.veLai && e.KhoiLoiUI.veLai());
            }
            if ("phien" !== t.act) {
              if ("vo" === t.act && e.KhoiLoiFX) {
                e.KhoiLoiFX.vo(t);
              }
            }
            else {
              if (e.KhoiLoiUI) {
                e.KhoiLoiUI.dat(t);
              }
            }
          }(t);
          case "hacthi": return void (e.HacThiUI && e.HacThiUI.nhan(t));
          case "huthien": return void (e.HuThienUI && e.HuThienUI.nhan(t));
          case "tranmach": return void (e.TranMachUI && e.TranMachUI.nhan(t));
          case "bosscong": return void (e.CongBossUI && e.CongBossUI.nhan(t));
          case "spawn": return function (n) {
            if (n && n.e) {
              if ("ll_quy_phien" === n.e.t && e.Audio && e.Audio.atPoint) {
                e.Audio.atPoint("lam_lang_quy_phien", +n.e.x || 0, +n.e.y || 0, { gain: .55 });
              }
              $([n.e]);
              var t = e.BossHien && be(e.SceneWorld, n.e.id);
              if (t && !t.dead) {
                e.BossHien.batDau(t, e.Game.time);
              }
            }
          }(t);
          case "hit": return function (t) {
            var a = e.SceneWorld && e.SceneWorld.player;
            if (t.pl) {
              var i = n.remotes[t.id];
              if (i) {
                i.hurtT = .35;
                e.VFX.spawnDamage(i.x, i.y - 46, t.dmg, "deal");
                e.VFX.spawnHitSpark(i.x, i.y - 22, a ? i.x - a.x : 0, a ? i.y - a.y : -1);
              }
            }
            else {
              var o = be(e.SceneWorld, t.id);
              if (o && e.SceneWorld.showHitFx) {
                e.SceneWorld.showHitFx(o, t.dmg, a);
              }
            }
          }(t);
          case "kill": return function (t) {
            var a = be(e.SceneWorld, t.id);
            if (a && (a.dead = !0, a.hp = 0, e.SceneWorld.showKillFx && e.SceneWorld.showKillFx(a), e.VFX.spawnRing(a.x, a.y - 8, "#cfeba8", 20, .45), t.exp > 0 && t.by === n.selfId)) {
              var i = e.ENEMY_DEFS && e.ENEMY_DEFS[a.type];
              e.VFX.spawnText(a.x, a.y - 22, e.Player.expText(e.Progress.realmId, i, t.exp), e.Player.expMau(e.Progress.realmId, i));
            }
          }(t);
          case "hurt": return function (n) {
            var t = e.SceneWorld && e.SceneWorld.player;
            if (t) {
              t.hp = n.hp;
              if (void 0 !== n.byId && null !== n.byId && "" !== n.byId && e.Player && e.Player.onPlayerDamage) {
                e.Player.onPlayerDamage(t);
              }
              if (void 0 !== n.bp) {
                t.bp = n.bp;
              }
              if (void 0 !== n.mp) {
                t.mp = n.mp;
              }
              t.hurtTimer = e.CONFIG.ENEMY.HURT_TIME;
              t.bpRegenDelay = e.CONFIG.RESOURCES.BP_REGEN_DELAY;
              ne(t, n.dmg);
              if (n.mpLoss > 0) {
                e.VFX.spawnText(t.x, t.y - 64, "-" + Math.round(n.mpLoss) + " Linh Lực", "#8fddff");
              }
            }
          }(t);
          case "down": return function (n) {
            var t = e.SceneWorld && e.SceneWorld.player;
            if (t && !t.downed) {
              e.Player.knockDown(t);
              t.reviveLeft = "number" == typeof n.left ? n.left : null;
              if (n.lostExp > 0) {
                e.VFX.spawnText(t.x, t.y - 66, "-" + n.lostExp + " Đạo Hạnh", "#c9a45c");
              }
            }
          }(t);
          case "revived": return function (t) {
            var a = e.SceneWorld && e.SceneWorld.player;
            if (a) {
              var i = null == t.ep || (0 | t.ep) === b;
              if (i) {
                a.x = t.x;
                a.y = t.y;
              }
              a.hp = t.hp;
              a.mp = t.mp;
              n.teleported();
              if (a.downed) {
                e.Player.revive(a, t.hp / (a.hpMax || 1), "number" == typeof t.bp ? t.bp / (a.bpMax || 1) : void 0);
                if (e.Audio) {
                  e.Audio.play("revive");
                }
              }
              if (i) {
                ee(a);
              }
              S.sample(S.KIND.revive, Math.round(a.x), Math.round(a.y), i ? 1 : 0);
              if (e.DownedUI && e.DownedUI.close) {
                e.DownedUI.close();
              }
            }
          }(t);
          case "act": return function (t) {
            if ("enemy_poison" !== t.k)
              if ("ll_tru_ban" !== t.k) {
                if ("ll_kim_kiem" === t.k) {
                  var a = be(e.SceneWorld, t.id);
                  var i = t.t === n.selfId ? e.SceneWorld.player : n.remotes[t.t];
                  if (!(i && !i.downed)) {
                    i = { x: +t.tx, y: +t.ty };
                  }
                  return void (e.KimKiemFX && e.KimKiemFX.spawn(a || { x: +t.tx, y: +t.ty - 200 }, i, { hitDelay: (+t.w || 2200) / 1e3, ghost: t.t !== n.selfId }));
                }
                if ("ll_ta_hoa" === t.k) {
                  var o = t.pts || [];
                  if (o.length && e.Audio && e.Audio.atPoint) {
                    e.Audio.atPoint("lam_lang_ta_hoa", +o[0].x || 0, +o[0].y || 0, { gain: .7 });
                  }
                  return void (e.VFX && e.VFX.spawnTaHoaBao && e.VFX.spawnTaHoaBao(o, (+t.w || 1600) / 1e3, +t.r || 72));
                }
                if ("long_luu_tinh" === t.k) {
                  var r = t.pts || [];
                  if (r.length && e.Audio && e.Audio.atPoint) {
                    e.Audio.atPoint("boss_meteor_rain", +r[0].x || 0, +r[0].y || 0, { gain: .7 });
                  }
                  return void (e.VFX && e.VFX.spawnLongLuuTinh && e.VFX.spawnLongLuuTinh(r, (+t.w || 1400) / 1e3, +t.r || 76, { mau: "xanh_tim" === t.mau ? "xanh_tim" : "", tu: t.tu || null }));
                }
                if ("duel_result" !== t.k)
                  if (t.k && 0 === t.k.indexOf("phu_")) {
                    n.talismanFx(t);
                  }
                  else if ("tran_loi_bao" !== t.k)
                    if ("tran_tu_tuong" !== t.k)
                      if ("tran_dao_gia" !== t.k)
                        if ("tran_tu_tuong_chan" !== t.k)
                          if ("bi_dong" !== t.k)
                            if ("set_giang" !== t.k)
                              if ("huyet_hut" !== t.k)
                                if ("quy_an" !== t.k)
                                  if ("xuyen_kich" !== t.k)
                                    if ("vankiem_release" !== t.k) {
                                      if (t.id !== n.selfId) {
                                        var s = n.remotes[t.id];
                                        if (!s) {
                                          if (2 === n.snapV) {
                                            return;
                                          }
                                          s = n.remotes[t.id] = e.RemotePlayer.create(t.id, te(t.id));
                                        }
                                        e.RemotePlayer.act(s, t);
                                      }
                                    }
                                    else {
                                      var u = t.id === n.selfId ? e.SceneWorld && e.SceneWorld.player : n.remotes[t.id];
                                      if (u && e.Skills && e.Skills.releaseVanKiem) {
                                        e.Skills.releaseVanKiem(u, function (t) {
                                          if (null == t) {
                                            return null;
                                          }
                                          var a = e.SceneWorld && e.SceneWorld.player;
                                          if (t === n.selfId && a && !a.downed) {
                                            return a;
                                          }
                                          var i = n.remotes[t];
                                          if (i && !i.downed) {
                                            return i;
                                          }
                                          var o = be(e.SceneWorld, t);
                                          return o && !o.dead ? o : null;
                                        }(t.t), { x: t.ax, y: t.ay }, t.flight);
                                      }
                                    }
                                  else {
                                    var l = t.id === n.selfId ? e.SceneWorld && e.SceneWorld.player : n.remotes[t.id];
                                    if (!(!l || l.veCham || !e.VFX || !e.VFX.spawnXuyenKich || t.id !== n.selfId && e.Quality && e.Quality.boDonXa && e.Quality.boDonXa(l))) {
                                      e.VFX.spawnXuyenKich(l, { x: +t.x || l.x, y: +t.y || l.y }, { dash: (+t.w || 200) / 1e3 });
                                    }
                                  }
                                else {
                                  var d = t.id === n.selfId ? e.SceneWorld && e.SceneWorld.player : n.remotes[t.id];
                                  if (d && !d.veCham && e.VFX && e.VFX.spawnQuyAn) {
                                    var c = be(e.SceneWorld, t.t);
                                    e.VFX.spawnQuyAn(d, c && !c.dead ? c : { x: +t.tx || d.x, y: +t.ty || d.y }, { hitDelay: (+t.w || 2300) / 1e3 });
                                  }
                                }
                              else {
                                var h = t.id === n.selfId ? e.SceneWorld && e.SceneWorld.player : n.remotes[t.id];
                                if (h && !h.veCham && e.VFX) {
                                  if (t.src && t.src.length && e.VFX.spawnHutHuyet) {
                                    e.VFX.spawnHutHuyet(h, t.src, t.n);
                                  }
                                  else {
                                    if (e.VFX.spawnLifesteal) {
                                      e.VFX.spawnLifesteal(h.x, h.y, t.n);
                                    }
                                  }
                                }
                              }
                            else {
                              var p = t.id === n.selfId ? e.SceneWorld && e.SceneWorld.player : n.remotes[t.id];
                              if (!(p && p.veCham || !e.VFX || !e.VFX.spawnLoiTienThunder)) {
                                e.VFX.spawnLoiTienThunder(+t.x || 0, +t.y || 0, p && p.cfg && p.cfg.weapon);
                              }
                            }
                          else {
                            var f = t.id === n.selfId ? e.SceneWorld && e.SceneWorld.player : n.remotes[t.id];
                            if (f && !f.veCham && e.Skills && e.Skills.biDongVfx) {
                              e.Skills.biDongVfx(f, t, t.id === n.selfId);
                            }
                          }
                        else {
                          if (e.FormationUI && e.FormationUI.onBarrier) {
                            e.FormationUI.onBarrier(t);
                          }
                        }
                      else {
                        if (e.FormationUI && e.FormationUI.onDaoGia) {
                          e.FormationUI.onDaoGia(t);
                        }
                      }
                    else {
                      if (e.FormationUI && e.FormationUI.onStrike) {
                        e.FormationUI.onStrike(t);
                      }
                    }
                  else {
                    if (e.VFX && e.VFX.spawnLoanLoiBao) {
                      e.VFX.spawnLoanLoiBao(+t.x || 0, +t.y || 0);
                    }
                  }
                else {
                  !function (t, a, i) {
                    if (null != t) {
                      var o = { result: a = "win" === a || "lose" === a || "draw" === a ? a : "draw", until: Date.now() + Math.max(1500, Math.min(1e4, Number(i) || 5e3)) };
                      n.duelResults[t] = o;
                      var r = t === n.selfId && e.SceneWorld && e.SceneWorld.player;
                      if (r) {
                        r.duelResult = o;
                      }
                      var s = n.remotes[t];
                      if (s) {
                        s.duelResult = o;
                      }
                    }
                  }(t.id, t.result, t.ttl);
                }
              }
              else {
                !function (t) {
                  var a = e.SceneWorld;
                  if (a && e.VFX && e.VFX.spawnTruBan) {
                    var i = be(a, t.id);
                    if (i) {
                      i.truMucTieu = t.t;
                      i.truBanLuc = e.Game.time;
                    }
                    var o = e.Enemy.nongTru(i || { def: e.ENEMY_DEFS.ta_mach_tru });
                    var r = (i ? i.x : +t.x) + o.dx;
                    var s = (i ? i.y : +t.y) + o.dy;
                    if (e.Audio && e.Audio.atPoint) {
                      e.Audio.atPoint("lam_lang_tower_shot", r, s, { gain: .75 });
                    }
                    var u = t.t === n.selfId ? a.player : n.remotes[t.t];
                    if (!(u && !u.downed)) {
                      u = { x: +t.tx, y: +t.ty };
                    }
                    e.VFX.spawnTruBan(r, s, u, t.mau, (+t.bay || 300) / 1e3);
                  }
                }(t);
              }
            else {
              !function (t) {
                if (e.VFX && t) {
                  for (var a = t.targets || [], i = [], o = 0; o < a.length; o++) {
                    var r = a[o];
                    if (isFinite(r.x) && isFinite(r.y)) {
                      i.push({ x: r.x, y: r.y });
                      var s = r.id === n.selfId ? e.SceneWorld && e.SceneWorld.player : n.remotes[r.id];
                      if (!(s)) {
                        s = { id: r.id, x: r.x, y: r.y };
                      }
                      if (r.id === n.selfId && s) {
                        s.poisonT = Math.max(s.poisonT || 0, +r.t || 0);
                        s.poisonDps = Math.max(s.poisonDps || 0, +t.dps || 0);
                      }
                      else {
                        if (s) {
                          s.poisonT = Math.max(s.poisonT || 0, +r.t || 0);
                        }
                      }
                      if (e.VFX.spawnPoisoned) {
                        e.VFX.spawnPoisoned(s, +r.t || 5);
                      }
                    }
                  }
                  if (i.length && e.VFX.spawnPoisonSpit) {
                    e.VFX.spawnPoisonSpit(t.x, t.y, i);
                  }
                  if (i.length && e.Audio && e.Audio.atPoint) {
                    e.Audio.atPoint("monster_poison_spit", +t.x || 0, +t.y || 0, { gain: .55, rate: .92 + .16 * Math.random() });
                  }
                }
              }(t);
            }
          }(t);
          case "loot": return function (n) {
            var t = e.SceneWorld;
            if (t && t.onServerLoot) {
              t.onServerLoot(n.l || []);
            }
          }(t);
          case "loot_gone": return function (n) {
            var t = e.SceneWorld;
            if (t && t.onServerLootGone) {
              t.onServerLootGone(n.id, n.by || null);
            }
          }(t);
          case "join": return function (e) {
            ie(e.id, e, e.pos);
            le();
          }(t);
          case "leave": return function (t) {
            oe(t.id);
            delete n.roster[t.id];
            if (x) {
              e.SnapDelta.forget(x, t.id);
            }
            le();
          }(t);
          case "duel": return function (t) {
            var a = function (n) {
              if (e.HUD && e.HUD.setCaption) {
                e.HUD.setCaption(n);
              }
            };
            var i = t.name || "đạo hữu";
            switch (t.act) {
              case "invite":
                if (void 0 === t.id || null === t.id) {
                  return;
                }
                var o = { id: t.id, name: i, expiresAt: f(t.expiresAt) };
                var r = !n.duelInvites[String(t.id)];
                if (r) {
                  n.duelInviteOrder.push(String(t.id));
                }
                n.duelInvites[String(t.id)] = o;
                re();
                if (r && e.Audio) {
                  e.Audio.play("invite");
                }
                if (e.Chat && e.Chat.setInvite) {
                  e.Chat.setInvite("duel", { name: i, expiresAt: o.expiresAt, text: i + " mời ngươi tỉ thí 90 giây. Ai gây nhiều sát thương hơn sẽ thắng; đổi bản đồ hoặc thoát game bị xử thua.", viec: [{ label: "Nhận lời tỉ thí", note: "Thua thì trọng thương", onChoose: function () {
                          n.duelAnswer(!0, t.id);
                        } }, { label: "Từ chối", onChoose: function () {
                          n.duelAnswer(!1, t.id);
                        } }] }, t.id);
                }
                return a(i + " mời ngươi tỉ thí — mở Thư [Enter] để trả lời.");
              case "sent": return a("Đã gửi lời mời tỉ thí tới " + i + ".");
              case "start":
                n.duel = { id: t.id, name: i, damage: Number(t.damage) || 0, foeDamage: Number(t.foeDamage) || 0, endsAt: Number(t.endsAt) || 0, tournament: !!t.tournament };
                se(t.id, "accepted");
                if (e.Audio) {
                  e.Audio.play("gong");
                }
                return a("Tỉ thí bắt đầu — 90 giây, ai gây nhiều sát thương hơn thắng.");
              case "progress":
                if (!n.duel || String(n.duel.id) !== String(t.id)) {
                  return;
                }
                n.duel.damage = Number(t.damage) || 0;
                n.duel.foeDamage = Number(t.foeDamage) || 0;
                return void (Number(t.endsAt) > 0 && (n.duel.endsAt = Number(t.endsAt)));
              case "end":
                n.duel = null;
                return "yield" === t.why ? a(t.win ? i + " xin thua. Ngươi thắng trận tỉ thí." : "Ngươi xin thua trận tỉ thí.") : "downed" === t.why ? a(t.win ? "Ngươi thắng trận tỉ thí trước " + i + "." : "Ngươi bại trận trước " + i + ".") : "timeout" === t.why ? a(t.win ? "Hết 90 giây — ngươi thắng nhờ gây nhiều sát thương hơn." : "Hết 90 giây — ngươi thua vì gây ít sát thương hơn.") : "timeout_draw" === t.why ? a("Hết 90 giây — hai bên hoà sát thương.") : "left" === t.why ? a(t.win ? i + " rời bản đồ hoặc thoát game. Ngươi thắng." : "Ngươi rời trận nên bị xử thua.") : a("Trận tỉ thí kết thúc.");
              case "declined": return a(i + " từ chối tỉ thí.");
              case "expired": return a("Lời mời tỉ thí đã hết hạn.");
              case "invite_closed": return void se(t.id, t.why || "expired");
              case "deny": return a(t.why || "Không mời tỉ thí được lúc này.");
            }
          }(t);
          case "party": return function (t) {
            if ("huyet_state" === t.act && e.HuyetSacUI) {
              e.HuyetSacUI.state(t);
            }
            else if ("huyet_thu" === t.act && e.HuyetSacUI && e.HuyetSacUI.batDauThu) {
              e.HuyetSacUI.batDauThu(t);
            }
            else if ("huyet_thu_huy" === t.act && e.HuyetSacUI && e.HuyetSacUI.huyThu) {
              e.HuyetSacUI.huyThu(t);
            }
            else if ("string" != typeof t.act || 0 !== t.act.indexOf("yl_")) {
              var a = function (n) {
                if (e.HUD && e.HUD.setCaption) {
                  e.HUD.setCaption(n);
                }
              };
              var i = t.name || "đạo hữu";
              switch (t.act) {
                case "invite":
                  var o = { inviteId: t.inviteId, fromId: t.fromId, name: t.fromName || i, expiresAt: f(t.expiresAt) };
                  if (!o.inviteId) {
                    return;
                  }
                  var r = !n.partyPending[String(o.inviteId)];
                  if (r) {
                    n.partyInviteOrder.push(String(o.inviteId));
                  }
                  n.partyPending[String(o.inviteId)] = o;
                  if (r && e.Audio) {
                    e.Audio.play("invite");
                  }
                  if (e.Chat && e.Chat.setInvite) {
                    e.Chat.setInvite("party", { name: o.name, inviteId: o.inviteId, expiresAt: o.expiresAt, text: o.name + " mời ngươi gia nhập tổ đội. Tổ đội tối đa 6 người và có thể cùng tiến vào Bí Cảnh; không chia ké Đạo Hạnh hay chiến lợi phẩm.", viec: [{ label: "Gia nhập tổ đội", note: "Cùng vào Bí Cảnh", onChoose: function () {
                            n.partyAnswer(!0, o.inviteId);
                          } }, { label: "Từ chối", onChoose: function () {
                            n.partyAnswer(!1, o.inviteId);
                          } }] }, o.inviteId);
                  }
                  return a(o.name + " mời ngươi vào tổ đội — mở Thư [Enter] để trả lời.");
                case "state":
                  if (n.party && n.party.partyId === t.partyId && (0 | t.revision) < (0 | n.party.revision)) {
                    return;
                  }
                  n.party = t;
                  return void (e.HUD && e.HUD.renderParty && e.HUD.renderParty(t));
                case "clear":
                  if (n.party = null, ue(null, t.why), e.HUD && e.HUD.renderParty && e.HUD.renderParty(null), "kicked" === t.why) {
                    return a("Ngươi đã bị mời rời khỏi tổ đội.");
                  }
                  if ("offline" === t.why || "solo_end" === t.why) {
                    return;
                  }
                  return a("Ngươi đã rời tổ đội.");
                case "invite_closed": return void ue(t.inviteId, t.why);
                case "sent": return a("Đã gửi lời mời tổ đội tới " + i + ".");
                case "joined":
                  if (e.Audio) {
                    e.Audio.play("party_join");
                  }
                  return a(i + " đã gia nhập tổ đội.");
                case "huyet_notice": return a(t.text || "Huyết Xích Cấm Địa đã cập nhật chiến lợi phẩm.");
                case "declined": return a(i + " từ chối lời mời tổ đội.");
                case "expired": return a("offline" === t.why ? i + " đã rời mạng." : "Lời mời tổ đội đã hết hiệu lực.");
                case "dungeon_closed":
                  if (e.HuyetSacUI) {
                    e.HuyetSacUI.closed(t.why);
                  }
                  if (e.YenLangUI) {
                    e.YenLangUI.closed(t.why);
                  }
                  return a("expired" === t.why ? "Bí Cảnh đã hết thời gian." : "collapsed" === t.why ? "Cấm Địa đã sụp — cả đội được đưa ra Miếu Hoang." : "yl_thua" === t.why ? "Núi đã khép. Tộc Trưởng lại chìm vào giấc đá." : "yl_sup" === t.why ? "Núi đã sụp — cả đội được đưa ra Miếu Hoang." : "Bí Cảnh đã đóng.");
                case "deny": return a(t.why || "Không thực hiện được thao tác tổ đội lúc này.");
              }
            }
            else {
              if (e.YenLangUI) {
                e.YenLangUI.onGoi(t);
              }
            }
          }(t);
          case "dosat": return function (t) {
            var a = function (n) {
              if (e.HUD && e.HUD.setCaption) {
                e.HUD.setCaption(n);
              }
            };
            switch (t.act) {
              case "start":
                n.doSatUntil = t.until || 0;
                return a("Đồ sát — mất " + t.cost + " Đạo Hạnh. Trong " + Math.round(t.remain || 0) + " giây tới, ngươi chạm được vào người khác, và ai cũng chạm được vào ngươi.");
              case "end":
                n.doSatUntil = 0;
                return "downed" === t.why ? a("Ngươi gục xuống. Dấu đồ sát tan theo.") : "safe" === t.why ? a("Đất này có luật riêng — dấu đồ sát tan.") : a("Hết hạn đồ sát. Ngươi lại vô hại với người khác.");
              case "deny": return a(t.why || "Không đồ sát được lúc này.");
              case "flag":
                var i = n.remotes && n.remotes[t.id];
                return void (i && (i.doSat = !!t.on));
            }
          }(t);
          case "chat": return function (n) {
            if (e.Chat) {
              e.Chat.pushSay(n.id, n.name, n.text);
            }
          }(t);
          case "world_chat": return function (n) {
            if (e.Chat) {
              e.Chat.pushWorldSay(n.id, n.name, n.text);
            }
          }(t);
          case "whisper": return function (n) {
            if (e.Chat) {
              return n.err ? e.Chat.pushWhisperError(n.err, n.toName) : void e.Chat.pushWhisper(n);
            }
          }(t);
          case "sect": return function (t) {
            var a;
            switch (t.act) {
              case "state":
                n.sect = t.tong || null;
                n.clan = n.sect;
                if (e.SectUI && e.SectUI.apply) {
                  e.SectUI.apply(n.sect, t.why);
                }
                return void (e.Chat && e.Chat.setSect && e.Chat.setSect(n.sect));
              case "chat": return void (e.Chat && e.Chat.pushSect && e.Chat.pushSect(t));
              case "invite": return function (t) {
                if (t.moiId) {
                  var a = String(t.moiId);
                  var i = !n.sectPending[a];
                  if (i) {
                    n.sectInviteOrder.push(a);
                  }
                  n.sectPending[a] = t;
                  if (i && e.Audio) {
                    e.Audio.play("invite");
                  }
                  if (e.Chat && e.Chat.setInvite) {
                    e.Chat.setInvite("sect", { name: t.tuTen || "Đạo hữu", inviteId: t.moiId, expiresAt: f(t.hetHan), text: (t.tuTen || "Một đạo hữu") + " mời vào " + (t.tongTen || "một tông môn") + (e.Sect && t.phe ? " · " + e.Sect.tenPhe(t.phe) : "") + ".", viec: [{ label: "Gia nhập", note: t.tongTen || "", onChoose: function () {
                            n.sectAnswer(t.moiId, !0);
                          } }, { label: "Từ chối", onChoose: function () {
                            n.sectAnswer(t.moiId, !1);
                          } }] }, t.moiId);
                  }
                  if (e.HUD && e.HUD.setCaption) {
                    e.HUD.setCaption((t.tuTen || "Một đạo hữu") + " mời ngươi vào " + (t.tongTen || "tông môn") + " — mở Thư [Enter] để trả lời.");
                  }
                }
              }(t);
              case "nv": return void (e.QuanSuUI && e.QuanSuUI.onNv && e.QuanSuUI.onNv(t));
              case "lamlang": return void (e.LamLangUI && e.LamLangUI.onGoi && e.LamLangUI.onGoi(t));
              case "bao":
                if (e.Chat && e.Chat.line) {
                  e.Chat.line(t.text, "sys", { muc: n.sect ? "clan" : "sys" });
                }
                a = t.text || "";
                return void (e.HUD && e.HUD.setCaption && e.HUD.setCaption(a));
            }
          }(t);
          case "daihoi": return function (t) {
            if (t && t.chiXem) {
              if (n.daiHoiState) {
                n.daiHoiState.xem = t.xem || null;
              }
            }
            else {
              n.daiHoiState = t;
            }
            if (e.DaiHoiUI) {
              e.DaiHoiUI.apply(t);
            }
          }(t);
          case "tmc": return function (t) {
            var a = e.TongMonChienUI;
            if ("state" === t.act) {
              n.tmcState = t;
              if (a) {
                a.apply(t);
              }
            }
            else {
              if ("tran" === t.act) {
                n.tmcDich = function (e) {
                  if (!e || "DANG_DAU" !== e.trangThai || !e.a || !e.b) {
                    return null;
                  }
                  var t = null;
                  if (["a", "b"].forEach(function (a) {
                    (e[a].ds || []).forEach(function (e) {
                      if (!(e.id !== n.selfId || e.guc)) {
                        t = a;
                      }
                    });
                  }), !t) {
                    return null;
                  }
                  var a = Object.create(null);
                  (e["a" === t ? "b" : "a"].ds || []).forEach(function (e) {
                    if (!(e.guc)) {
                      a[e.id] = !0;
                    }
                  });
                  return a;
                }(t);
                if (a) {
                  a.onTran(t);
                }
              }
              else {
                if ("ket" === t.act && a) {
                  a.onKet(t);
                }
              }
            }
          }(t);
          case "toast": return function (n) {
            if (n.banner && e.PvpKet) {
              e.PvpKet.show(n.banner);
            }
            else {
              if (e.HUD && e.HUD.setCaption) {
                e.HUD.setCaption(n.text);
              }
            }
          }(t);
          case "bosses": return void (e.BossBoard && e.BossBoard.set(t.boards));
          case "mach": return function (t) {
            if (n.mach && Array.isArray(t.l)) {
              var a = Date.now();
              t.l.forEach(function (e) {
                if (e && "string" == typeof e.id) {
                  n.mach.rows[e.id] = { r: e, at: a };
                }
              });
              if (e.SceneWorld && e.SceneWorld.applyMach) {
                e.SceneWorld.applyMach();
              }
            }
          }(t);
          case "khu": return void (e.KhuUI && e.KhuUI.onList(t));
          case "skill_res": return function (n) {
            if (!(n.n > 0)) {
              var t = e.Skills && e.Skills.DEFS && e.Skills.DEFS[n.s];
              if (!t || !t.bienHinh) {
                var a = e.SceneWorld && e.SceneWorld.player;
                if (a && e.VFX) {
                  e.VFX.spawnText(a.x, a.y - 64, "Hụt", "#9aa3ad");
                }
              }
            }
          }(t);
          case "ack": return function (n) {
            var t = M[n.rid];
            delete M[n.rid];
            if (n.toast && e.HUD && e.HUD.setCaption) {
              if (!(de.test(n.toast))) {
                e.HUD.setCaption(n.toast);
              }
            }
            else {
              if (!1 === n.ok && n.why && e.HUD && e.HUD.setCaption) {
                e.HUD.setCaption("Không được: " + n.why);
              }
            }
            if (t) {
              t(n);
            }
          }(t);
          case "pong": return function (e) {
            if ("number" == typeof e.t) {
              w = Math.max(0, Date.now() - e.t);
            }
          }(t);
          case "err": !function (t) {
            if (n.lastError = t.msg || t.code, !B || "name_taken" !== t.code && "bad_msg" !== t.code && "busy" !== t.code && "bad_token" !== t.code && "kicked" !== t.code && "outdated" !== t.code || (fe(t.msg || "Máy chủ từ chối tạo nhân vật."), "name_taken" !== t.code && "bad_msg" !== t.code && "busy" !== t.code)) {
              if ("name_taken" === t.code) {
                var a = n.onCreateCharError;
                n.onCreateCharError = null;
                return void (a ? a(t.msg || "Đạo hiệu này đã có người sử dụng.") : e.HUD && e.HUD.setCaption && e.HUD.setCaption(t.msg || "Đạo hiệu đã có người sử dụng."));
              }
              if ("no_char" !== t.code) {
                return "bad_token" === t.code || "kicked" === t.code || "outdated" === t.code ? (V = { code: t.code, msg: t.msg }, void ("bad_token" === t.code && e.AuthUI && e.AuthUI.open && e.AuthUI.open(t.msg))) : void (e.HUD && e.HUD.setCaption && e.HUD.setCaption(t.msg || "Máy chủ từ chối yêu cầu."));
              }
              if (n.onNoChar) {
                n.onNoChar();
              }
            }
          }(t);
        }
      }(a);
      if (S.on) {
        (function (e, n, t) {
          var a = n && n.length || 0;
          S.count("mạng · ký tự nhận", a);
          if (!(!e || "snap" !== e.op && "snap2" !== e.op)) {
            S.count("mạng · ký tự ảnh chụp", a);
            S.time("mạng · parse+áp ảnh chụp", t);
            S.time("mạng · người trong ảnh chụp", (e.p || []).length);
            S.time("mạng · quái trong ảnh chụp", (e.e || []).length);
          }
        })(a, t.data, S.now() - i);
      }
    };
    n.socket.onclose = function (t) {
      if (!V && t && "đăng nhập nơi khác" === t.reason) {
        V = { code: "kicked", msg: "Tài khoản vừa đăng nhập ở nơi khác." };
      }
      v.drops++;
      n.connected = !1;
      n.ready = !1;
      N = !1;
      n.remotes = {};
      n.roster = {};
      if (x) {
        e.SnapDelta.reset(x);
      }
      n.duel = null;
      n.doSatUntil = 0;
      n.invite = null;
      n.duelInvites = Object.create(null);
      n.duelInviteOrder = [];
      n.party = null;
      n.partyPending = Object.create(null);
      n.partyInviteOrder = [];
      n.sectPending = Object.create(null);
      n.sectInviteOrder = [];
      n.tmcDich = null;
      if (e.Chat && e.Chat.setInvite) {
        e.Chat.setInvite("sect", null);
      }
      if (e.FormationState) {
        e.FormationState.reset(n.formation, !1, n.mapEpoch);
      }
      else {
        n.formation.supported = !1;
      }
      if (e.FormationUI && e.FormationUI.setSupported) {
        e.FormationUI.setSupported(!1);
      }
      if (e.Chat && e.Chat.setInvite) {
        e.Chat.setInvite("party", null);
      }
      if (e.Chat && e.Chat.setInvite) {
        e.Chat.setInvite("duel", null);
      }
      if (e.HUD && e.HUD.renderParty) {
        e.HUD.renderParty(null);
      }
      if (e.HUD && e.HUD.setOnlineCount) {
        e.HUD.setOnlineCount(0);
      }
      if (V) {
        (function () {
          var n = e.Net && e.Net.client && e.Net.client.auth;
          if ("kicked" !== V.code) {
            return "bad_token" === V.code && !W && n && n.refreshSession ? (W = !0, void n.refreshSession().then(function (e) {
              if (e && e.data && e.data.session) {
                V = null;
                j();
              }
              else {
                Q();
              }
            }, Q)) : void Q();
          }
          if (!(O)) {
            if (e.Auth && e.Auth.signOut) {
              O = !0;
              e.Auth.signOut({ localOnly: !0 }).then(function (e) {
                if (e && e.ok && window.location && "function" == typeof window.location.reload) {
                  window.location.reload();
                }
                else {
                  Q();
                }
              }, Q);
            }
            else {
              Q();
            }
          }
        })();
      }
      else {
        j();
      }
    };
    n.socket.onerror = function () {
      n.lastError = "Mất kết nối tới máy chủ.";
    };
    return !0;
  };
  var R = "pntt.guestId";
  function q() {
    if (e.Auth && e.Auth.username) {
      return e.Auth.username;
    }
    var n = e.Utils.store.get(R, null);
    if ("string" != typeof n || !/^[a-z0-9]{6,12}$/.test(n)) {
      n = "k";
      for (var t = 0; t < 10; t++)
        n += Math.floor(36 * Math.random()).toString(36);
      if (e.Utils.store.set) {
        e.Utils.store.set(R, n);
      }
    }
    return n;
  }
  function Q() {
    if (V && !E) {
      var t = "kicked" === V.code ? "Tài khoản này vừa vào game ở nơi khác. Phiên trên thiết bị này đã đăng xuất." : "outdated" === V.code ? V.msg || "Bản game trên máy đã cũ. Hãy cập nhật ứng dụng để tiếp tục chơi." : "Phiên đăng nhập đã hết hạn. Tải lại trang (F5) để đăng nhập lại.";
      n.lastError = t;
      var a = function () {
        if (e.HUD && e.HUD.setCaption) {
          e.HUD.setCaption(t);
        }
      };
      a();
      E = setInterval(a, 2500);
    }
  }
  function j() {
    if (!H) {
      var e = Math.round(P * (.5 + .5 * Math.random()));
      H = setTimeout(function () {
        H = null;
        n.connect();
      }, e);
      P = Math.min(15e3, Math.round(1.7 * P));
    }
  }
  function G(e) {
    return !(!n.socket || 1 !== n.socket.readyState || (n.socket.send(JSON.stringify(e)), 0));
  }
  function Y(e) {
    n.daoKhoa = Object.create(null);
    for (var t = 0; e && t < e.length; t++)
      n.daoKhoa[e[t]] = 1;
  }
  function z(t) {
    n.serverTime = t.t;
    c(t.t);
    var o = Date.now();
    if (v.lastSnapAt) {
      var r = o - v.lastSnapAt;
      v.gapSum += r;
      if (r < v.gapMin) {
        v.gapMin = r;
      }
      if (r > v.gapMax) {
        v.gapMax = r;
      }
      (function (e) {
        if (i.push(e), i.length > 24 && i.shift(), !(i.length < 8)) {
          var n = i.slice().sort(function (e, n) {
            return e - n;
          });
          var t = n[Math.floor(.9 * n.length)];
          var o = Math.max(120, Math.min(420, 1.2 * t + 30));
          if (o > a) {
            a = o;
          }
        }
      })(r);
    }
    if (v.lastSnapAt = o, v.snaps++, I && Date.now() - I.at < 3e4 || k(), e.SceneWorld && e.SceneWorld.transitioning) {
      v.snapDropped++;
    }
    else {
      var s;
      for (s = 0; s < (t.p || []).length; s++) {
        var u = t.p[s];
        var l = n.remotes[u.id] || (n.remotes[u.id] = e.RemotePlayer.create(u.id, te(u.id)));
        l.duelResult = ae(u.id);
        y(u.id, t.t, u.x, u.y);
        e.RemotePlayer.setTarget(l, u);
      }
      $(t.e || [], t.t);
    }
  }
  n.biChan = function () {
    return V;
  };
  n.send = G;
  n.honBay = [];
  n.honNghiep = Object.create(null);
  n.daoCua = Object.create(null);
  n.daoKhoa = Object.create(null);
  n.khoiLoiBay = [];
  var J = 0;
  function $(n, t) {
    var a = e.SceneWorld;
    if (a && a.enemies) {
      for (var i = 0; i < n.length; i++) {
        var o = n[i];
        var r = be(a, o.id);
        if (!r) {
          if (!e.ENEMY_DEFS[o.t]) {
            continue;
          }
          (r = e.Enemy.create({ id: o.id, type: o.t, x: o.x, y: o.y })).netSeen = !1;
          a.enemies.push(r);
        }
        r.tuMay = !1;
        L[o.id] = { x: o.x, y: o.y };
        if (t) {
          y(o.id, t, o.x, o.y);
        }
        r.dir = o.dir;
        r.state = o.st;
        if (r.netSeen && o.hp < r.hp && !o.d) {
          e.Enemy.flinch(r, e.Game.time);
        }
        if (void 0 !== o.bd && !!o.bd != !!r.bienDi && e.Enemy.datBienDi) {
          e.Enemy.datBienDi(r, !!o.bd);
        }
        r.hp = o.hp;
        if (o.hm) {
          r.hpMax = o.hm;
        }
        r.attackState = o.tg ? "telegraph" : "none";
        r.slowT = Math.max(0, +o.sl || 0);
        r.slowMult = r.slowT > 0 && +o.slm || 1;
        r.stunT = Math.max(0, +o.zn || 0);
        r.freezeT = Math.max(0, +o.fz || 0);
        r.linhAnUntil = +o.la > 0 ? Date.now() + 1e3 * +o.la : 0;
        var s = r.poisonT || 0;
        if (r.poisonT = Math.max(0, +o.pn || 0), r.poisonDps = r.poisonT > 0 && +o.pd || 0, r.woundT = Math.max(0, +o.wn || 0), r.burnT = Math.max(0, +o.bn || 0), r.burnMa = r.burnT > 0 && !!o.bm, r.netSeen && r.poisonT > s && e.VFX && e.VFX.spawnPoisoned && e.VFX.spawnPoisoned(r, r.poisonT), void 0 !== o.ns) {
          r.novaWind = (o.nw || 0) / 100;
          r.novaX = o.nx;
          r.novaY = o.ny;
          var u = r.def && r.def.fireNova;
          var l = r.netSeen && o.ns !== r.novaSeq;
          if (l && u && u.tim && e.VFX.spawnBaoKich) {
            e.VFX.spawnBaoKich(o.nx, o.ny, u.radius);
          }
          else {
            if (l && e.VFX.spawnFireNova) {
              e.VFX.spawnFireNova(o.nx, o.ny);
            }
          }
          if (l && r.def && r.def.isBoss && u && e.Audio && e.Audio.atPoint) {
            e.Audio.atPoint("boss_nova", o.nx, o.ny, { gain: .65 });
          }
          r.novaSeq = o.ns;
        }
        if (void 0 !== o.hs) {
          r.tcWind = (o.hw || 0) / 100;
          r.tcX = o.hx;
          r.tcY = o.hy;
          var d = r.def && r.def.tuyetChieu;
          var c = r.netSeen && o.hs !== r.tcSeq;
          if (c && d)
            if ("vo_cao" === d.kieu && d.tim) {
              if (r.tcAn = !1, e.VFX.spawnMaBaoAnImpact) {
                for (var h = { core: "#fbe8ff", mid: "#b04cff", edge: "#2a0638", glow: "#d27bff" }, p = [[0, 0], [-.55, 0], [.55, 0], [0, -.32], [0, .32]], f = 0; f < p.length; f++)
                  e.VFX.spawnMaBaoAnImpact(o.hx + p[f][0] * d.radius, o.hy + p[f][1] * d.radius, { colors: h, radius: 60 });
              }
            }
            else {
              if ("vo_cao" === d.kieu) {
                if (e.VFX.spawnHoVuongVo) {
                  e.VFX.spawnHoVuongVo(o.hx, o.hy, d.radius);
                }
              }
              else {
                if (e.VFX.spawnThienHoa) {
                  e.VFX.spawnThienHoa(o.hx, o.hy, d.radius);
                }
              }
            }
          if (c && r.def && r.def.isBoss && d && e.Audio && e.Audio.atPoint) {
            e.Audio.atPoint("boss_ultimate", o.hx, o.hy, { gain: .7 });
          }
          r.tcSeq = o.hs;
        }
        if (void 0 !== o.js) {
          r.pounceWind = (o.jw || 0) / 100;
          r.pounceX = o.jx;
          r.pounceY = o.jy;
          var m = r.netSeen && o.js !== r.pounceSeq;
          if (m && e.VFX.spawnBossPounce) {
            e.VFX.spawnBossPounce(o.jx, o.jy, r.type);
          }
          if (m && r.def && r.def.isBoss && e.Audio && e.Audio.atPoint) {
            e.Audio.atPoint("boss_pounce", o.jx, o.jy, { gain: .65 });
          }
          r.pounceSeq = o.js;
        }
        if (void 0 !== o.bs) {
          var g = r.def && r.def.baoKich;
          if (r.netSeen && o.bs !== r.bkSeq && g) {
            r.roarAt = e.Game.time;
          }
          if (r.netSeen && o.bs !== r.bkSeq && g && e.VFX.spawnBaoKich) {
            e.VFX.spawnBaoKich(r.x, r.y, g.radius, "than_thu_xich_long" === r.type ? ["#ff8a3a", "#d8401a", "#ffe0a0"] : null);
            if ("hoang_cuu_bao" === r.type) {
              if (e.VFX.spawnTaKhiTram) {
                e.VFX.spawnTaKhiTram(r.x, r.y, g.radius, r.dir);
              }
              if (e.Audio && e.Audio.atPoint) {
                e.Audio.atPoint("lam_lang_ta_khi_tram", r.x, r.y, { gain: .7 });
              }
            }
            else {
              if (e.Audio && e.Audio.atPoint) {
                e.Audio.atPoint("boss_bao_kich", r.x, r.y, { gain: .65 });
              }
            }
            if ("linh_ho_tran_son" === r.type && e.VFX.spawnLinhHoBaoKich) {
              e.VFX.spawnLinhHoBaoKich(r.x, r.y, g.radius);
            }
            if ("than_thu_xich_long" === r.type && e.VFX.spawnLongViemBaoKich) {
              e.VFX.spawnLongViemBaoKich(r.x, r.y, g.radius);
            }
          }
          r.bkSeq = o.bs;
        }
        if (void 0 !== o.av && (r.atkVariant = 0 | o.av), void 0 !== o.vk && (r.vuKhi = o.vk || null), (r.def.human || r.def.tuSi) && e.Enemy.xinSheet) {
          var v = a.player;
          if ((r.def.isBoss || v && Math.abs(v.x - o.x) < 900 && Math.abs(v.y - o.y) < 700)) {
            e.Enemy.xinSheet(r);
          }
        }
        if (void 0 !== o.ttl) {
          r.ttlGiay = Math.max(0, 0 | o.ttl);
        }
        var x = !!r.dead;
        r.dead = !!o.d;
        if (r.dead) {
          r.hien = null;
        }
        else {
          if (x && r.netSeen && r.def.isBoss && e.BossHien) {
            e.BossHien.batDau(r, e.Game.time);
          }
        }
        if (!(r.netSeen)) {
          r.x = o.x;
          r.y = o.y;
          r.netSeen = !0;
        }
      }
      for (var S = !1, I = 0; I < a.enemies.length; I++)
        if (a.enemies[I] && a.enemies[I].tuMay) {
          S = !0;
          break;
        }
      if (S) {
        a.enemies = a.enemies.filter(function (e) {
          return e && !e.tuMay;
        });
      }
    }
  }
  function Z(n, t, a, i) {
    var o = n.x;
    var r = n.y;
    e.Player.placeAt(n, t, a, e.SceneWorld && e.SceneWorld.map);
    var s = o - n.x;
    var u = r - n.y;
    if (0 === s && 0 === u) {
      v.blockedFix++;
      S.sample(S.KIND.fix, 0, 0, C, S.FIX.blocked);
      return void S.warn("blockedFix", "Chỗ máy chủ chỉ vào đang bị chắn trên lưới máy khách.");
    }
    n.viewOff = i && s * s + u * u > .25 ? { x: s, y: u, x0: s, y0: u, t: 0 } : null;
    U = [];
    _ = C;
  }
  function ee(n) {
    var t = e.SceneWorld;
    if (e.Camera && e.Camera.snapTo && e.Renderer && t && t.map) {
      e.Camera.snapTo(n.x, n.y, e.Renderer.w, e.Renderer.h, t.map.pxWidth, t.map.pxHeight);
    }
  }
  function ne(n, t) {
    e.Audio.play("hurt");
    if (n.hp > 0 && n.hp <= .25 * (n.hpMax || 1)) {
      e.Audio.play("hp_low");
    }
    e.VFX.spawnDamage(n.x, n.y - 46, t, "take");
    e.Camera.shake(1.8, .1);
    e.VFX.spawnVignette("#8e1c14", .3, function (e, n) {
      var t = (n || 0) / Math.max(1, e.hpMax || 1);
      var a = Math.max(0, Math.min(1, (e.hp || 0) / Math.max(1, e.hpMax || 1)));
      return Math.min(.72, .24 + 1.6 * t + .3 * (1 - a));
    }(n, t));
  }
  function te(e) {
    return n.roster[e] || null;
  }
  function ae(e) {
    var t = n.duelResults[e];
    return t ? t.until <= Date.now() ? (delete n.duelResults[e], null) : t : null;
  }
  function ie(t, a, i) {
    if (t === n.selfId) {
      return null;
    }
    if (a) {
      n.roster[t] = { id: t, name: a.name, cfg: a.cfg, realm: a.realm, tong: a.tong || null, phanThan: a.phanThan ? 1 : 0 };
    }
    var o = n.remotes[t];
    return o ? (e.RemotePlayer.setIdentity(o, n.roster[t]), o.duelResult = ae(t), o) : 2 === n.snapV ? null : ((o = n.remotes[t] = e.RemotePlayer.create(t, a)).duelResult = ae(t), i && e.RemotePlayer.setTarget(o, i), o);
  }
  function oe(e) {
    delete n.remotes[e];
    delete L[e];
    delete m[e];
  }
  function re() {
    for (; n.duelInviteOrder.length && !n.duelInvites[n.duelInviteOrder[0]];)
      n.duelInviteOrder.shift();
    n.invite = n.duelInviteOrder.length ? n.duelInvites[n.duelInviteOrder[0]] : null;
  }
  function se(t, a) {
    for (var i = null == t ? n.duelInviteOrder.slice() : [String(t)], o = 0; o < i.length; o++) {
      var r = String(i[o]);
      var s = n.duelInvites[r];
      if (s) {
        delete n.duelInvites[r];
        var u = n.duelInviteOrder.indexOf(r);
        if (u >= 0) {
          n.duelInviteOrder.splice(u, 1);
        }
        if (e.Chat && e.Chat.setInvite) {
          e.Chat.setInvite("duel", null, s.id, a);
        }
      }
    }
    re();
  }
  function ue(t, a) {
    for (var i = null == t ? n.partyInviteOrder.slice() : [String(t)], o = 0; o < i.length; o++) {
      var r = String(i[o]);
      var s = n.partyPending[r];
      if (s) {
        delete n.partyPending[r];
        var u = n.partyInviteOrder.indexOf(r);
        if (u >= 0) {
          n.partyInviteOrder.splice(u, 1);
        }
        if (e.Chat && e.Chat.setInvite) {
          e.Chat.setInvite("party", null, s.inviteId, a);
        }
      }
    }
  }
  function le() {
    var t = 1;
    for (var a in n.roster)
      t++;
    if (e.HUD && e.HUD.setOnlineCount) {
      e.HUD.setOnlineCount(t);
    }
  }
  n.buildMobs = function (e) {
    $(e || [], 0);
  };
  n.showHurtFx = ne;
  n.roster = {};
  n.sectAnswer = function (t, a) {
    var i = String(t || "");
    if (n.sectPending[i]) {
      delete n.sectPending[i];
      var o = n.sectInviteOrder.indexOf(i);
      if (o >= 0) {
        n.sectInviteOrder.splice(o, 1);
      }
    }
    if (e.Chat && e.Chat.setInvite) {
      e.Chat.setInvite("sect", null, t);
    }
    n.cmd("sect.traLoiMoi", { moiId: t, dong: !!a }, function (n) {
      if (n && !n.ok && e.HUD && e.HUD.setCaption) {
        e.HUD.setCaption(n.why || "");
      }
    });
  };
  n.sectChat = function (t) {
    return !(!n.connected || !n.sect || (n.cmd("sect.chat", { text: String(t || "") }, function (n) {
      if (n && !n.ok && e.Chat && e.Chat.line) {
        e.Chat.line(n.why || "Chưa gửi được.", "sys", { muc: "clan" });
      }
    }), 0));
  };
  n.clanChat = function (e) {
    return n.sectChat(e);
  };
  n.tmcLaDich = function (t) {
    if (!n.tmcDich || !n.tmcDich[t] || !e.TongMonChien) {
      return !1;
    }
    var a = e.SceneWorld && e.SceneWorld.map;
    return !(!a || !a.data || a.data.id !== e.TongMonChien.MAP);
  };
  n.tmc = function (t, a) {
    n.cmd("tmc." + t, {}, function (t) {
      if (t && t.tmc) {
        n.tmcState = t.tmc;
        if (e.TongMonChienUI) {
          e.TongMonChienUI.apply(t.tmc);
        }
      }
      if (a) {
        a(t);
      }
    });
  };
  var de = /^(\+\d+ (?!Dược Công)|Đã (gieo hạt|tưới|vứt bỏ|đổi một gói hạt)|Thu hái xong|Ấm bụng)/;
  n.cmd = function (e, n, t) {
    var a = n ? Object.assign({}, n) : {};
    a.op = "cmd";
    a.cmd = e;
    a.rid = ++X;
    if (t) {
      M[a.rid] = t;
    }
    if (!G(a) && t) {
      delete M[a.rid];
      t({ ok: !1, why: "mất kết nối" });
    }
  };
  var ce = 0;
  n.talismanUse = function (e, t, a) {
    var i = { itemId: String(e || ""), mapEpoch: 0 | b };
    i.requestId = "phu" + ++ce + "-" + (1e9 * Math.random() | 0).toString(36);
    if (t) {
      if ("point" === t.kind) {
        i.aimX = t.x;
        i.aimY = t.y;
      }
      else {
        if ("dir" === t.kind) {
          i.dirX = t.x;
          i.dirY = t.y;
        }
      }
    }
    n.cmd("talisman.use", i, a);
    return i.requestId;
  };
  var he = 0;
  function pe() {
    if (B) {
      G({ op: "create_char", appearance: B.cfg });
    }
  }
  function fe(e) {
    if (B) {
      var n = B.hong;
      clearTimeout(B.timer);
      B = null;
      if (n) {
        n(e);
      }
    }
  }
  n.formationSupported = function () {
    return !!(e.Formations && e.FormationState && n.connected && n.ready && n.formation && n.formation.supported);
  };
  n.formationBegin = function (t, a, i) {
    if (!n.formationSupported()) {
      return null;
    }
    var o = e.Formations.defOf(t);
    if (!o) {
      return null;
    }
    var r = "tran" + ++he + "-" + (1e9 * Math.random() | 0).toString(36);
    var s = { op: "formation", act: "begin", protocol: e.Formations.PROTOCOL, ep: 0 | b, requestId: r, defId: o.id, upkeepBudget: 0 | a };
    if (o.aim === e.Formations.AIM.POINT) {
      if (!i || !isFinite(i.x) || !isFinite(i.y)) {
        return null;
      }
      s.aimX = Math.round(i.x);
      s.aimY = Math.round(i.y);
    }
    return G(s) ? r : null;
  };
  n.formationDismiss = function (t) {
    return !(!n.formationSupported() || !t) && G({ op: "formation", act: "dismiss", protocol: e.Formations.PROTOCOL, ep: 0 | b, formationId: t });
  };
  n.attack = function () {
    var n = e.Targeting && e.Targeting.currentEnemy ? e.Targeting.currentEnemy() : null;
    G(n && !n.dead && null != n.id ? { op: "attack", targetId: String(n.id) } : { op: "attack" });
  };
  n.skill = function (e, t) {
    if (!t && n.duel) {
      t = n.duel.id;
    }
    G({ op: "skill", skillId: e, targetId: t || null });
  };
  n.duelSend = function (e, n) {
    return G({ op: "duel", act: e, id: n || null });
  };
  n.partySend = function (e, n) {
    var t = { op: "party", act: e };
    n = n || {};
    ["targetId", "memberId", "inviteId", "dungeonId", "propId", "itemId"].forEach(function (e) {
      if (null != n[e]) {
        t[e] = n[e];
      }
    });
    return G(t);
  };
  n.partyInvite = function (e) {
    return n.partySend("invite", { targetId: e });
  };
  n.partyAnswer = function (e, t) {
    var a = t || n.partyInviteOrder[0];
    var i = a && n.partyPending[String(a)];
    return !!i && (i.expiresAt && Date.now() >= i.expiresAt ? (ue(i.inviteId, "expired"), !1) : (ue(a = i.inviteId, e ? "accepted" : "declined"), n.partySend(e ? "accept" : "decline", { inviteId: a })));
  };
  n.partyLeave = function () {
    return n.partySend("leave");
  };
  n.partyKick = function (e) {
    return n.partySend("kick", { memberId: e });
  };
  n.partyPromote = function (e) {
    return n.partySend("promote", { memberId: e });
  };
  n.partyEnterDungeon = function (e) {
    return n.partySend("enter_dungeon", { dungeonId: e });
  };
  n.partyIsLeader = function () {
    return !(!n.party || n.party.leaderId !== n.selfId);
  };
  n.partyMember = function (e) {
    for (var t = n.party && n.party.members || [], a = 0; a < t.length; a++)
      if (t[a].id === e) {
        return t[a];
      }
    return null;
  };
  n.doSatActive = function () {
    return !(!e.DoSat || !e.DoSat.active(n.doSatUntil));
  };
  n.doSatRemain = function () {
    return e.DoSat && e.DoSat.remain(n.doSatUntil) || 0;
  };
  n.doSatPress = function () {
    var t = n.doSatCheck();
    return t.ok ? G({ op: "dosat", act: "start" }) : (e.HUD && e.HUD.setCaption && e.HUD.setCaption(t.why), !1);
  };
  n.doSatCheck = function () {
    if (!e.DoSat) {
      return { ok: !1, why: "Chưa nạp xong luật đồ sát.", cost: 0, exp: 0 };
    }
    if (!n.connected || !n.ready) {
      return { ok: !1, why: "Đồ sát cần nối được máy chủ.", cost: 0, exp: 0 };
    }
    var t = e.SceneWorld && e.SceneWorld.player;
    var a = e.TileMap && e.TileMap.data;
    return e.DoSat.check({ realm: e.Progress && e.Progress.realm(), exp: 0 | (t && t.exp), mapId: a && a.id, downed: !(!t || !t.downed), inDuel: !!n.duel, active: n.doSatActive() });
  };
  n.remoteAt = function (e, t) {
    var a = null;
    var i = 1 / 0;
    for (var o in n.remotes) {
      var r = n.remotes[o];
      if (r) {
        var s = e - r.x;
        var u = t - (r.y - 22);
        if (!(Math.abs(s) > 14 || Math.abs(u) > 26)) {
          var l = s * s + u * u;
          if (l < i) {
            i = l;
            a = r;
          }
        }
      }
    }
    return a;
  };
  n.distTo = function (e, n) {
    return e && n ? Math.sqrt((e.x - n.x) * (e.x - n.x) + (e.y - n.y) * (e.y - n.y)) : 1 / 0;
  };
  n.duelChallengeNearest = function () {
    var t = e.SceneWorld && e.SceneWorld.player;
    if (!t) {
      return !1;
    }
    var a = null;
    var i = 1 / 0;
    for (var o in n.remotes) {
      var r = n.remotes[o];
      if (r) {
        var s = r.x - t.x;
        var u = r.y - t.y;
        var l = Math.sqrt(s * s + u * u);
        if (l < i) {
          i = l;
          a = o;
        }
      }
    }
    return a ? n.duelSend("challenge", a) : (e.HUD && e.HUD.setCaption && e.HUD.setCaption("Quanh đây không có đạo hữu nào để tỉ thí."), !1);
  };
  n.duelAnswer = function (e, t) {
    var a = t || n.invite && n.invite.id;
    if (null == a || !n.duelInvites[String(a)]) {
      return !1;
    }
    var i = n.duelInvites[String(a)];
    return i.expiresAt && Date.now() >= i.expiresAt ? (se(a, "expired"), !1) : (se(a, e ? "accepted" : "declined"), n.duelSend(e ? "accept" : "decline", a));
  };
  n.duelPress = function () {
    return n.duel ? n.duelSend("yield") : n.invite ? n.duelAnswer(!0) : n.duelChallengeNearest();
  };
  n.enter = function (e) {
    G({ op: "enter", mapId: e });
  };
  n.createChar = function (e) {
    G({ op: "create_char", appearance: e });
  };
  n.taoNhanVat = function (e, t, a) {
    if (B) {
      clearTimeout(B.timer);
    }
    B = { cfg: e, ok: t, hong: a, timer: 0 };
    if (V) {
      fe(V.msg || "Không nối được máy chủ game.");
    }
    else {
      B.timer = setTimeout(function () {
        if (B && B.hong) {
          B.hong("Máy chủ chưa trả lời. Kiểm tra mạng rồi bấm Bước Vào lần nữa.");
        }
      }, 2e4);
      if (n.connected && N) {
        pe();
      }
      else {
        n.connect();
      }
    }
  };
  n.huyTaoNhanVat = function () {
    if (B) {
      clearTimeout(B.timer);
    }
    B = null;
  };
  n.chat = function (e, n) {
    return G({ op: "chat", text: e, channel: "world" === n ? "world" : "map" });
  };
  n.whisper = function (e, n) {
    return G({ op: "whisper", to: e, text: n });
  };
  n.daiHoi = function (e, n) {
    return G(n ? { op: "daihoi", act: e, tran: n } : { op: "daihoi", act: e });
  };
  n.refreshIdentity = function () {
  };
  var me = { ascend: 1 };
  n.act = function (e) {
    return !(!n.connected || !me[e]) && G({ op: "act", k: e });
  };
  var ye = [];
  var ge = [];
  function ve(n, t, a, i, o) {
    if (e.VFX.spawnTalismanPaper && void 0 !== n.ox && void 0 !== n.oy) {
      e.VFX.spawnTalismanPaper(+n.ox || 0, +n.oy || 0, void 0 === a ? +n.x || 0 : a, void 0 === i ? +n.y || 0 : i, t, o);
    }
  }
  var xe = { phu_thanh_tam: ["heal", .8, 1.15], phu_kim_giap: ["skill_shield", .8, 1.1], phu_toc_hanh: ["buff", 1, 1.2] };
  n.talismanFx = function (t) {
    if (t && e.VFX) {
      var a = +t.x || 0;
      var i = +t.y || 0;
      if ("phu_thanh_tam" !== t.k && "phu_kim_giap" !== t.k && "phu_toc_hanh" !== t.k)
        if ("phu_hoa_ban" !== t.k) {
          if ("phu_hoa_no" === t.k) {
            ge = ge.filter(function (e) {
              return e.id !== t.bid;
            });
            if (e.VFX.stopTalismanBolt) {
              e.VFX.stopTalismanBolt(t.bid);
            }
            if (e.VFX.spawnFireBurst) {
              e.VFX.spawnFireBurst(a, i, { core: "#fff3c4", mid: "#ff9a3c", edge: "#d63b1f", glow: "#ffd27a" });
            }
            else {
              e.VFX.spawnRing(a, i, "#ff9a3c", 2 * (+t.r || 24), .4);
            }
            return void (e.Audio && e.Audio.atPoint("hurt", a, i, { gain: .5, rate: .8 }));
          }
          if ("phu_kim_long" !== t.k)
            if ("phu_kim_o" !== t.k)
              if ("phu_kim_o_lao" !== t.k) {
                if ("phu_tho_don" === t.k) {
                  var o = +t.x0 || 0;
                  var r = +t.y0 || 0;
                  if (e.VFX.spawnTalismanPaper) {
                    e.VFX.spawnTalismanPaper(o, r, a, i, "tho_don", { life: .24, lift: 8, arc: 6 });
                  }
                  e.VFX.spawnSmoke(o, r, 1.2);
                  e.VFX.spawnDust(o, r);
                  e.VFX.spawnSmoke(a, i, 1.2);
                  e.VFX.spawnDust(a, i);
                  if (e.VFX.spawnChips) {
                    e.VFX.spawnChips(a, i, 5, "#6d5636", "#c8a877");
                  }
                  return void (e.Audio && e.Audio.atPoint("hurt", a, i, { gain: .3, rate: 1.4 }));
                }
                if ("phu_han_bang" === t.k) {
                  if (void 0 !== t.ox && void 0 !== t.oy) {
                    ve(t, "han_bang", a, i, { life: .22, lift: 14, arc: 12, impact: !0 });
                    return void ye.push({ at: .2, k: "phu_han_bang_no", x: a, y: i });
                  }
                  n.talismanFx({ k: "phu_han_bang_no", x: a, y: i });
                }
                else if ("phu_han_bang_no" === t.k) {
                  if (e.VFX.spawnIceBurst) {
                    e.VFX.spawnIceBurst(a, i, { glow: "#a8dcf5", core: "#eaf8ff", mid: "#7fc4e8", edge: "#3d7ea6" });
                  }
                  else {
                    e.VFX.spawnRing(a, i - 10, "#a8dcf5", 24, .4);
                  }
                  if (e.Audio) {
                    e.Audio.atPoint("skill_ice", a, i, { gain: .55, rate: 1.15 });
                  }
                }
                else if ("phu_loi_bao" === t.k) {
                  var s = +t.t || .15;
                  ve(t, "loi_dong", a, i, { life: Math.max(.12, s), lift: 16, arc: 14, impact: !0 });
                  e.VFX.spawnRing(a, i - 6, "#e6d4ff", 2 * (+t.r || 16), s + .05);
                  ye.push({ at: s, k: "phu_loi_dong", x: a, y: i });
                }
                else {
                  if ("phu_loi_dong" === t.k) {
                    if (e.VFX.spawnLoiDong) {
                      e.VFX.spawnLoiDong(a, i);
                    }
                    else {
                      e.VFX.spawnLightning(a, i);
                    }
                    if (e.Audio) {
                      e.Audio.atPoint("skill_lightning", a, i, { gain: .6, rate: 1.15 });
                    }
                  }
                }
              }
              else {
                if (e.VFX.spawnKimOImpact) {
                  var u = +t.dx;
                  var l = +t.dy;
                  if (!(isFinite(u))) {
                    u = 0;
                  }
                  if (!(isFinite(l))) {
                    l = -1;
                  }
                  e.VFX.spawnKimOImpact(a, i - 22, u, l);
                }
                if (e.Audio) {
                  e.Audio.atPoint("thunder", a, i, { gain: .45, rate: .75 });
                  e.Audio.atPoint("hit_big", a, i, { gain: .5, rate: .8 });
                }
              }
            else {
              var d = (+t.dx || 0) / 1e3;
              var c = (+t.dy || 0) / 1e3;
              if (e.VFX.spawnKimO) {
                e.VFX.spawnKimO(a, i, d, c);
              }
              if (e.Audio) {
                e.Audio.atPoint("spell", a, i, { gain: .5, rate: .7 });
              }
              var h = +t.d || 300;
              ye.push({ at: .7, k: "phu_kim_o_lao", x: a + d * h * .5, y: i + c * h * .5, dx: d, dy: c });
            }
          else {
            if (e.Audio) {
              e.Audio.atPoint("spell", a, i, { gain: .5, rate: .85 });
            }
          }
        }
        else {
          var p = { id: t.bid, x: a, y: i, vx: +t.vx || 0, vy: +t.vy || 0, left: +t.d || 0, khoi: 0 };
          if (ge.push(p), e.VFX.spawnTalismanPaper) {
            var f = a + .22 * p.vx;
            var m = i + .22 * p.vy;
            e.VFX.spawnTalismanPaper(a, i + 16, f, m + 16, "hoa_phu", { life: .24, lift: 8, arc: 5 });
          }
          if (e.VFX.spawnTalismanBolt) {
            e.VFX.spawnTalismanBolt(p);
          }
        }
      else {
        if (e.VFX.spawnTalismanSelf) {
          e.VFX.spawnTalismanSelf(a, i, t.k.slice(4));
        }
        var y = xe[t.k];
        if (y && e.Audio) {
          e.Audio.atPoint(y[0], a, i, { gain: y[1], rate: y[2] });
        }
      }
    }
  };
  n.talismanWarp = function (t) {
    var a = e.SceneWorld && e.SceneWorld.player;
    if (a && t) {
      if (!(null != t.ep && (0 | t.ep) !== b)) {
        a.x = +t.x;
        a.y = +t.y;
        if (a.path) {
          a.path.length = 0;
        }
        n.teleported();
      }
    }
  };
  n.update = function (i, o) {
    var r;
    r = a - t;
    if (Math.abs(r) < .5) {
      t = a;
    }
    else {
      t += Math.max(-8, Math.min(8, .08 * r));
    }
    l();
    (function (e) {
      if (ye.length) {
        for (var t = [], a = 0; a < ye.length; a++) {
          var i = ye[a];
          i.at -= e;
          if (i.at > 0) {
            t.push(i);
          }
          else {
            n.talismanFx({ k: i.k, x: i.x, y: i.y, dx: i.dx, dy: i.dy });
          }
        }
        ye = t;
      }
    })(i);
    (function (n) {
      if (ge.length) {
        for (var t = [], a = 0; a < ge.length; a++) {
          var i = ge[a];
          var o = Math.sqrt(i.vx * i.vx + i.vy * i.vy);
          var r = o * n;
          if (r > i.left) {
            r = i.left;
          }
          if (o > 0) {
            i.x += i.vx / o * r;
            i.y += i.vy / o * r;
          }
          i.left -= r;
          i.khoi -= n;
          if (i.khoi <= 0) {
            i.khoi = .025;
            if (e.VFX.spawnEmber) {
              e.VFX.spawnEmber(i.x, i.y, "#ff9a3c", "#fff3c4");
            }
          }
          if (i.left > 1e-4) {
            t.push(i);
          }
          else {
            if (e.VFX.stopTalismanBolt) {
              e.VFX.stopTalismanBolt(i.id);
            }
          }
        }
        ge = t;
      }
    })(i);
    var s = e.SceneWorld;
    if (!s || !s.transitioning) {
      var u;
      var d = Object.keys(n.remotes);
      for (u = 0; u < d.length; u++)
        e.RemotePlayer.update(n.remotes[d[u]], i);
      if (s && s.enemies) {
        for (u = 0; u < s.enemies.length; u++) {
          var c = s.enemies[u];
          var h = L[c.id];
          c.animTime += i;
          if (c.hitTimer > 0) {
            c.hitTimer -= i;
          }
          if (h && !c.dead) {
            if (!(g(c, c.id))) {
              c.x = h.x;
              c.y = h.y;
            }
          }
        }
      }
    }
    if (function (e, n) {
      var t = e && e.viewOff;
      if (t)
        if (t.t += 1e3 * n, t.t >= 450) {
          e.viewOff = null;
        }
        else {
          var a = 1 - t.t / 450;
          var i = a * a * a;
          t.x = t.x0 * i;
          t.y = t.y0 * i;
        }
    }(o, i), n.connected && o && !(e.SceneWorld && e.SceneWorld.transitioning || (D -= i) > 0)) {
      D = 1 / (e.Net && e.Net.netTickHz || 10);
      var p = "pose" === o.state && o.poseSteps && o.poseSteps[o.poseIdx] ? o.poseSteps[o.poseIdx].name : "";
      var f = o.flying ? 1 : 0;
      var m = e.SceneWorld && e.SceneWorld.fishing || null;
      var y = m ? 1 : 0;
      var v = m ? Math.round(m.bobX) : -1;
      var x = m ? Math.round(m.bobY) : -1;
      if (Math.abs(o.x - A.x) > .5 || Math.abs(o.y - A.y) > .5 || o.dir !== A.dir || o.state !== A.state || p !== A.pose || f !== A.fly || y !== A.fishing || y && (v !== A.fishX || x !== A.fishY)) {
        var S = { op: "move", seq: C + 1, x: Math.round(o.x), y: Math.round(o.y), dir: 0 | o.dir, st: o.state, ps: p || void 0, fly: f, fs: y, fx: y ? v : void 0, fy: y ? x : void 0, ep: T ? b : void 0 };
        if (G(S)) {
          C = S.seq;
          A.x = o.x;
          A.y = o.y;
          A.dir = o.dir;
          A.state = o.state;
          A.pose = p;
          A.fly = f;
          A.fishing = y;
          A.fishX = v;
          A.fishY = x;
          U.push({ seq: C, x: o.x, y: o.y });
          if (U.length > 32) {
            U.shift();
          }
        }
      }
    }
  };
  var Se = { doc_bia_da: 1, hoi_dao_dong: 1, nhan_viec_ly_thanh: 1, bai_kien_dai_phu: 1, nhan_phuong_dan: 1 };
  var Ie = !1;
  var we = [];
  function ke(e, t, a, i) {
    if (e)
      if ("function" == typeof e[t]) {
        var o = e[t];
        e[t] = function () {
          var e = i ? i() : void 0;
          var r = o.apply(this, arguments);
          if (n.connected && n.ready) {
            try {
              a(r, arguments, e);
            }
            catch (e) {
              console.error("[PNTT] Lỗi khi báo ý định " + t + ":", e);
            }
          }
          return r;
        };
      }
      else {
        we.push(t);
      }
  }
  function Fe() {
    b = n.mapEpoch;
    U = [];
    F = 0;
    _ = C;
    A.x = -1;
    A.y = -1;
    A.dir = -1;
    A.state = "";
    A.pose = "";
    A.fly = -1;
    A.fishing = -1;
    A.fishX = -1;
    A.fishY = -1;
    var t = e.SceneWorld && e.SceneWorld.player;
    if (t) {
      t.viewOff = null;
    }
    var a = Date.now() + 1500;
    if (a > p) {
      p = a;
    }
  }
  function be(n, t) {
    return n && n.enemies ? e.Enemy.find(n.enemies, t) : null;
  }
  n.bindIntents = function () {
    if (!(Ie)) {
      Ie = !0;
      ke(e.Quest, "setFlag", function (e, t) {
        if (e && Se[t[0]]) {
          n.cmd("talk", { flag: t[0] });
        }
      });
      ke(e.Quest, "advance", function (e, t, a) {
        if (e && a) {
          n.cmd("quest.turnIn");
        }
      }, function () {
        return !e.Quest.autoAdvances();
      });
      ke(e.Quest, "recordBachKhoaAnswer", function (e, t) {
        if (e && !0 === t[0]) {
          n.cmd("quest.bachKhoaAnswer", { correct: !0 });
        }
      });
      ke(e.Progress, "markHarvested", function (e, t) {
        n.cmd("gather", { propId: t[0] });
      });
      ke(e.Quest, "startSeedQuest", function (e, t) {
        if (e) {
          n.cmd("seed.start", { taskId: t[0] });
        }
      });
      ke(e.Quest, "collectSeedMaterial", function (e, t) {
        if (e) {
          n.cmd("seed.collect", { propId: t[1] });
        }
      });
      ke(e.Quest, "completeSeedQuest", function (e) {
        if (e) {
          n.cmd("seed.complete");
        }
      });
      ke(e.Quest, "completeEscortSeedQuest", function (e) {
        if (e) {
          n.cmd("seed.escortComplete");
        }
      });
      ke(e.Quest, "cancelSeedQuest", function (e) {
        if (e) {
          n.cmd("seed.cancel");
        }
      });
      ke(e.Quest, "buySeedPack", function (e, t) {
        if (e) {
          n.cmd("seed.buyPack", { packId: t[0] });
        }
      });
      ke(e.Quest, "startHangDongQuest", function (e) {
        if (e) {
          n.cmd("cave.start");
        }
      });
      ke(e.Quest, "claimHangDongChest", function (e) {
        if (e) {
          n.cmd("cave.chest");
        }
      });
      ke(e.Quest, "pointToTangKinh", function (e) {
        if (e) {
          n.cmd("bitich.point");
        }
      });
      ke(e.Quest, "chonBinhKhi", function (e, t) {
        if (e) {
          n.cmd("quest.binhKhi", { itemId: t[0] });
        }
      });
      ke(e.Quest, "acceptEquipmentTask", function (e) {
        if (e) {
          n.cmd("bitich.equipTask");
        }
      });
      ke(e.Quest, "startBiTichQuest", function (e) {
        if (e) {
          n.cmd("bitich.start");
        }
      });
      ke(e.Quest, "finishBiTichQuest", function (e, t) {
        if (e) {
          n.cmd("bitich.finish", { choiceId: t[0] });
        }
      });
      ke(e.Food, "buy", function (e, t) {
        if (e && e.ok) {
          n.cmd("food.buy", { itemId: t[0], n: t[1] });
        }
      });
      ke(e.Food, "eat", function (e, t) {
        if (e && e.ok) {
          n.cmd("food.eat", { itemId: t[0] });
        }
      });
      ke(e.Talismans, "buy", function (e, t) {
        if (e && e.ok) {
          n.cmd("talisman.buy", { id: t[0], n: t[1] });
        }
      });
      ke(e.Inventory, "equip", function (e, t) {
        if (e && e.ok) {
          n.cmd("item.equip", { itemId: t[0] });
        }
      });
      ke(e.Inventory, "unequip", function (e, t) {
        if (e && e.ok) {
          n.cmd("item.unequip", { slotId: t[0] });
        }
      });
      ke(e.Inventory, "sell", function (e, t) {
        if (e && e.ok) {
          n.cmd("item.sell", { itemId: t[0] });
        }
      });
      ke(e.Inventory, "buySlot", function (e) {
        if (e && e.ok) {
          n.cmd("bag.expand");
        }
      });
      ke(e.Inventory, "useBagItem", function (e, t) {
        if (e && e.ok) {
          n.cmd("bag.useItem", { itemId: t[0] });
        }
      });
      ke(e.Inventory, "discard", function (e, t) {
        if (e && e.ok) {
          n.cmd("item.discard", { itemId: t[0], qty: t[1] || 1 });
        }
      });
      ke(e.Skills, "setActive", function (e, t) {
        if (e) {
          n.cmd("skill.select", { skillId: t[0] });
        }
      });
      ke(e.Skills, "setPassiveEquipped", function (e, t) {
        if (e && e.ok) {
          n.cmd("skill.biDong", { skillId: t[0], on: t[1] ? 1 : 0 });
        }
      });
      ke(e.Farm, "sow", function (e, t) {
        if (e) {
          n.cmd("farm.sow", { plot: t[0], seed: t[1] });
        }
      });
      ke(e.Farm, "water", function (e, t) {
        if (e) {
          n.cmd("farm.water", { plot: t[0] });
        }
      });
      ke(e.Farm, "harvest", function (e, t) {
        if (e) {
          n.cmd("farm.harvest", { plot: t[0] });
        }
      });
      ke(e.Player, "ascend", function (e) {
        if (e) {
          n.cmd("breakthrough");
        }
      });
      ke(e.Player, "sit", function (e) {
        if (!1 !== e) {
          n.cmd("meditate", { on: 1 });
        }
      });
      ke(e.Player, "stand", function (e) {
        if (!1 !== e) {
          n.cmd("meditate", { on: 0 });
        }
      });
      if (we.length) {
        console.warn("[PNTT] Bảng gương ý định lệch khỏi bộ luật — không bọc được: " + we.join(", "));
      }
    }
  };
  n.teleported = function () {
    v.teleports++;
    var n = e.SceneWorld && e.SceneWorld.player;
    if (n) {
      S.sample(S.KIND.warp, Math.round(n.x), Math.round(n.y));
    }
    Fe();
  };
  n.reset = function () {
    L = {};
    Fe();
  };
}(window.PNTT);
