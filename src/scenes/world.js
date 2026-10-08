!function (n) {
  "use strict";
  var a = n.CONFIG;
  var e = a.TILE;
  var t = n.Utils;
  if (n.SpriteFactory.hold) {
    n.SpriteFactory.hold(function (a) {
      if (i.player) {
        a(i.player.sheetKey);
      }
      var e = n.Gateway && n.Gateway.remotes;
      for (var t in e)
        e[t] && a(e[t].sheetKey);
    });
  }
  var i = n.SceneWorld = { player: null, map: null, enemies: [], critters: [], waterTime: 0, moteTimer: 0, spiritTimer: 0, menuOpen: !1, menuBuilt: !1, ritual: null, ascend: null, foundationBreakthrough: null, brewing: null, fishing: null, fishingAuto: !1, qiSurge: null, transitioning: !1, portalCooldowns: {}, portalCooldownNotified: {}, autoOn: !1, autoTargetId: null, autoPathTimer: 0, autoSkillIdx: 0, brewCooldownUntil: 0, approach: null, chopping: null, drops: [], escortFollower: null, questGuideOn: t.store.get("pntt_quest_guide_on", !0) };
  var o = [];
  function h() {
    return !!(n.Gateway && n.Gateway.connected && n.Gateway.ready);
  }
  function c(a, e) {
    if (h()) {
      n.Gateway.cmd(a, e);
    }
  }
  function r(a) {
    if (a && n.Chat && n.Chat.enterMap) {
      n.Chat.enterMap(a.name || "");
    }
    if (a && n.Audio && n.Audio.setMap) {
      n.Audio.setMap(a.id);
    }
    if (a && n.Assets) {
      n.Assets.pinMap(a.id);
      n.Assets.idle(function () {
        n.Assets.prefetchNeighbors(a, 1);
      });
    }
  }
  function u() {
    n.VFX.clear();
    n.Skills.reset();
    n.Targeting.clear();
    i.ritual = null;
    i.ascend = null;
    i.foundationBreakthrough = null;
    i.brewing = null;
    i.fishing = null;
    i.fishingAuto = !1;
    i.qiSurge = null;
    i.approach = null;
    i.chopping = null;
    i.manualCast = null;
    i.autoTargetId = null;
    i.tuChiDuong = !1;
    i.autoNghiDen = n.Game.time + 2;
    ma();
    n.HUD.closeDialog();
    n.HUD.setCaption(null);
    if (i.player) {
      i.player.sitLocked = !1;
    }
  }
  function l(a, e) {
    n.Skills.update(a, i.enemies, function (n) {
      k(n, e);
    });
    n.VFX.update(a);
  }
  function s(o, c, r) {
    if (c.update(o, r), function (n) {
      if (g()) {
        if (!(i.escortFollower)) {
          p();
        }
        var a = i.escortFollower;
        var e = i.player;
        var t = 0;
        var o = 0;
        if (a && e) {
          if (0 === e.dir) {
            o = -22;
          }
          else {
            if (1 === e.dir) {
              t = 20;
            }
            else {
              if (2 === e.dir) {
                t = -20;
              }
              else {
                o = 22;
              }
            }
          }
          var h = e.x + t - a.x;
          var c = e.y + o - a.y;
          var r = h * h + c * c;
          if (r > 22500) {
            a.x = e.x + t;
            a.y = e.y + o;
            a.moving = !1;
          }
          else if (r > 196) {
            var u = Math.sqrt(r);
            var l = Math.min(u, Math.max(78, 1.15 * e.speed) * n);
            a.x += h / u * l;
            a.y += c / u * l;
            a.moving = !0;
            if (Math.abs(h) > Math.abs(c)) {
              a.dir = h > 0 ? 2 : 1;
            }
            else {
              a.dir = c > 0 ? 0 : 3;
            }
          }
          else {
            a.moving = !1;
            a.dir = e.dir;
          }
          a.animTime += n;
        }
      }
      else {
        i.escortFollower = null;
      }
    }(o), x(o), v(o), _(i.map.props), _(i.map.flatProps), i.map.applyLinhChi && n.Game.time >= b && (b = n.Game.time + 5, i.map.applyLinhChi()), n.Farm.syncProps(r), function (e, t) {
      var o = i.approach;
      if (o)
        if (n.Input.hasManualMove() || n.Game.time > o.until) {
          i.approach = null;
        }
        else {
          if (o.obj) {
            var h = o.obj.x - t.x;
            var c = o.obj.y - a.TILE / 2 - t.y;
            var r = n.Targeting && n.Targeting.propReach ? n.Targeting.propReach(o.obj) : o.obj.r || 40;
            if (Math.sqrt(h * h + c * c) > r) {
              return;
            }
            i.approach = null;
            t.stop();
            q(t, h, c);
            return void pn(o.obj);
          }
          var u = n.Targeting.current();
          if (u && u.key === o.key) {
            if (u.dist <= u.r) {
              i.approach = null;
              tn(t);
            }
          }
          else {
            i.approach = null;
          }
        }
    }(0, c), function (a, o) {
      var h = i.chopping;
      if (h) {
        var c = h.prop;
        if (c.hidden || n.HUD.dialogOpen || n.Input.hasManualMove() || t.dist(o.x, o.y, c.x, c.y - e / 2) > (c.r || 40) + 16) {
          ca();
        }
        else if (h.t += a, !(h.t < ia)) {
          h.t = 0;
          h.swing++;
          var r = !!c.chopTask;
          var u = ea(c.seedTask || c.chopTask);
          q(o, c.x - o.x, c.y - o.y);
          n.Player.attack(o);
          c.shakeDur = r ? .5 : .26;
          c.shakeUntil = n.Game.time + c.shakeDur;
          c.shakeAmp = r ? 2 : 3;
          n.VFX.spawnChips(c.x, c.y - (r ? 26 : 10), r ? 7 : 5, u[2], u[3], c.y);
          if (r) {
            n.VFX.spawnLeaves(c.x, c.y - 130, 6, 62, c.y);
          }
          if (h.swing >= ta) {
            i.chopping = null;
            n.VFX.spawnChips(c.x, c.y - (r ? 28 : 12), r ? 12 : 9, u[2], u[3], c.y);
            n.VFX.spawnDust(c.x, c.y);
            if (r) {
              n.VFX.spawnLeaves(c.x, c.y - 130, 12, 62, c.y);
              if (n.Quest.chopAvailable(c.chopTask)) {
                (function (a) {
                  var e = n.Quest.reserveSeedMaterial(a.chopTask);
                  if (e) {
                    (function (a, e) {
                      var t = a.x - 90 + 50 * Math.random();
                      var o = a.y - 64 + 12 * Math.random();
                      var h = a.y - 150 - 16 * Math.random();
                      if (n.Audio && n.Audio.atPoint) {
                        n.Audio.atPoint("drop", a.x, a.y);
                      }
                      i.drops.push({ art: "dry_branch", variant: 3 * Math.random() | 0, task: a.chopTask, materialId: e, x: a.x - 10 - 20 * Math.random(), y: h, vx: .7 * (t - a.x), vy: 10, gy: o, state: "fall", t: 0, sortY: h });
                    })(a, e);
                  }
                })(c);
              }
              else {
                if (ha()) {
                  n.Gateway.cmd("sect.nv.chatCay", {}, function (a) {
                    if (a && !a.ok && a.why && n.HUD.setCaption) {
                      n.HUD.setCaption(a.why);
                    }
                  });
                }
              }
            }
            else {
              (function (a) {
                var e = n.Quest;
                if (e.collectSeedMaterial(a.seedTask, a.id)) {
                  var t = e.seedTaskInfo();
                  var o = ea(a.seedTask);
                  a.hidden = !0;
                  if (a.block) {
                    i.map.blocked[a.ty * i.map.width + a.tx] = 0;
                  }
                  n.VFX.spawnText(a.x, a.y - 30, "+1 " + (t ? t.itemName : a.name), o[0]);
                  n.VFX.spawnRing(a.x, a.y - 6, o[1], 20, .55);
                  if (e.seedQuestComplete()) {
                    n.VFX.spawnText(i.player.x, i.player.y - 58, "Đã đủ — về giao Đại Phu", "#f0d27a");
                  }
                  dn(!1);
                }
              })(c);
            }
          }
        }
      }
    }(o, c), function (a, e) {
      if (ra && !i.transitioning) {
        var o = ra;
        ra = null;
        i.onServerLoot(o);
      }
      for (var c = i.drops.length - 1; c >= 0; c--) {
        var r = i.drops[c];
        if ("bay" !== r.state)
          if ("fall" !== r.state)
            if (r.t += a, "item" === r.kind && (r.age += a), "item" !== r.kind || h() || r.granted || !n.Loot.expired(r.age, r))
              if ("ground" !== r.state) {
                var u = e.x;
                var l = e.y - 16;
                p = Math.min(1, 6 * a + r.t * a * 12);
                r.x += (u - r.x) * p;
                r.y += (l - r.y) * p;
                r.sortY = r.y + 20;
                if ((t.dist(r.x, r.y, u, l) < 6 || r.t > 1.2)) {
                  i.drops.splice(c, 1);
                  fa(r);
                }
              }
              else {
                if (r.t < sa) {
                  continue;
                }
                if (r.ht && r.vanMs > 0) {
                  if (h() && n.HuThienUI && n.HuThienUI.dungTrenBaoVat) {
                    n.HuThienUI.dungTrenBaoVat(r, e, t.dist(e.x, e.y, r.x, r.y) <= la);
                  }
                  continue;
                }
                var s = la + (!r.ht || r.vanMs > 0 || !n.HuThien ? 0 : n.HuThien.HUT_PHU_THEM || 0);
                if (!ya(r) && t.dist(e.x, e.y, r.x, r.y) > s) {
                  continue;
                }
                if (!da(r)) {
                  continue;
                }
                if ("item" === r.kind && !r.ht && !n.Inventory.canFit(r.itemId)) {
                  var g = Date.now();
                  if ((!i._bagFullAt || g - i._bagFullAt > 5e3)) {
                    i._bagFullAt = g;
                    if (n.HUD && n.HUD.setCaption) {
                      n.HUD.setCaption("Túi đồ đã đầy — dọn túi hoặc mở thêm ô");
                    }
                  }
                  continue;
                }
                if ("item" === r.kind && h()) {
                  if (!(r.asked)) {
                    r.asked = !0;
                    n.Gateway.cmd("loot.pick", { id: r.lootId }, function (n) {
                      if (!(n && n.ok)) {
                        r.asked = !1;
                      }
                    });
                  }
                  continue;
                }
                r.state = "fly";
                r.t = 0;
              }
            else {
              i.drops.splice(c, 1);
            }
          else {
            r.x += r.vx * a;
            r.y += r.vy * a;
            r.vy += 420 * a;
            r.vx *= .97;
            if (r.y >= r.gy) {
              r.y = r.gy;
              r.state = "ground";
              r.t = 0;
              r.sortY = r.y;
              n.VFX.spawnDust(r.x, r.y);
              n.VFX.spawnChips(r.x, r.y - 4, 4, "#5b3d22", "#b8946a", r.y);
            }
            r.sortY = r.y;
          }
        else {
          r.t += a;
          var p = Math.min(1, r.t / r.bT);
          r.x = r.bx0 + (r.bx1 - r.bx0) * p;
          r.y = r.by0 + (r.by1 - r.by0) * p - 4 * r.bH * p * (1 - p);
          r.sortY = Math.max(r.y, r.by1 - 1);
          if (p >= 1) {
            r.x = r.bx1;
            r.y = r.by1;
            r.gy = r.by1;
            r.state = "ground";
            r.t = 0;
            r.sortY = r.y;
            n.VFX.spawnDust(r.x, r.y);
            n.VFX.spawnChips(r.x, r.y - 4, 4, "#5b3d22", "#b8946a", r.y);
          }
        }
      }
    }(o, c), n.Skills.update(o, i.enemies, function (n) {
      k(n, c);
    }), n.Hotbar.update(c), n.TalismanBar && n.TalismanBar.update(c), n.FormationUI && n.FormationUI.update(o), n.TruyenTongUI && n.TruyenTongUI.update(o, c), n.BangNhanhUI && n.BangNhanhUI.update(), n.PhongChoUI && n.PhongChoUI.update(), n.QuickSlots && n.QuickSlots.update(c), an(o), !i.transitioning && r && r.checkPortal) {
      var u = r.checkPortal(c.x, c.y);
      if (u && u.cooldownSec > 0) {
        var l = u.cooldownGroup || u.kind || u.toMap;
        var s = Date.now() / 1e3;
        var d = i.portalCooldowns[l] || 0;
        if (d > s) {
          u = null;
          if (!(i.portalCooldownNotified[l])) {
            i.portalCooldownNotified[l] = !0;
            if (n.HUD && n.HUD.setCaption) {
              n.HUD.setCaption("Cột Khí Bổng đang hồi · còn " + Math.max(1, Math.ceil(d - s)) + " giây");
            }
          }
        }
        else {
          delete i.portalCooldowns[l];
          delete i.portalCooldownNotified[l];
          i.portalCooldowns[l] = s + u.cooldownSec + .25;
        }
      }
      if (u && n.HacThi) {
        var y = n.HacThi.chanCua(n, u.toMap, { dangKham: !(!n.HacThiUI || !n.HacThiUI.dangKham()) });
        if (y) {
          var m = u.toMap + "@" + u.tx + "," + u.ty;
          if (i.cuaBiChan !== m) {
            i.cuaBiChan = m;
            n.Audio.play("deny");
            if (n.HUD && n.HUD.setCaption) {
              n.HUD.setCaption(y);
            }
          }
          u = null;
        }
      }
      else {
        if (!(u)) {
          i.cuaBiChan = null;
        }
      }
      if (u && n.HuThienUI && n.HuThienUI.chanCua) {
        var f = n.HuThienUI.chanCua(u.toMap);
        if (f) {
          var T = u.toMap + "@" + u.tx + "," + u.ty;
          if (i.cuaBiChan !== T) {
            i.cuaBiChan = T;
            n.Audio.play("deny");
            if (n.HUD && n.HUD.setCaption) {
              n.HUD.setCaption(f);
            }
          }
          u = null;
        }
      }
      if (u) {
        return void i.switchMap(u.toMap, u.targetSpawn);
      }
    }
    if (i.transitioning || !function (e, t) {
      if (!t || !t.data || "long_uyen" !== t.data.id || !t.prop) {
        return !1;
      }
      var o = n.Quest;
      var h = t.prop("hang_dong_cua");
      if (!(o && h && o.hangDongUnlocked() && o.flags.hang_dong_da_nhan)) {
        return !1;
      }
      var c = h.x - e.x;
      var r = h.y - a.TILE / 2 - e.y;
      return !(Math.sqrt(c * c + r * r) > (h.r || 40) || (i.transitioning || (o.flags.hang_dong_da_lay_ruong || o.enterHangDong(), e.flying && (n.Player.landFly(e, t), E()), i.switchMap("hang_dong_co", { tx: 14, ty: 16 })), 0));
    }(c, r)) {
      if (!i.transitioning && r && r.checkWarp) {
        var D = r.checkWarp(c.x, c.y);
        if (D) {
          return void function (a, t) {
            var o = "khi_bong" === a.kind;
            var h = "goong" === a.kind;
            var c = o ? "#8fdcff" : h ? "#a9e8ff" : "#ffc98a";
            t.stop();
            n.Audio.play("teleport", { gain: .8, rate: .96 + .08 * Math.random() });
            if (o) {
              n.VFX.spawnPillar(t.x, t.y, .8);
            }
            n.VFX.spawnRing(t.x, t.y, c, h ? 40 : 52, .45);
            t.x = a.to.tx * e + e / 2;
            t.y = a.to.ty * e + e - 4;
            t.vx = 0;
            t.vy = 0;
            if (n.Gateway && n.Gateway.teleported) {
              n.Gateway.teleported();
            }
            n.Camera.snapTo(t.x, t.y, n.Renderer.w, n.Renderer.h, i.map.pxWidth, i.map.pxHeight);
            if (o) {
              n.VFX.spawnPillar(t.x, t.y, 1.3);
            }
            n.VFX.spawnRing(t.x, t.y, c, 62, .6);
            if (a.title) {
              n.VFX.spawnText(t.x, t.y - 54, a.title, c);
            }
          }(D, c);
        }
      }
      i.moteTimer -= o;
      if (i.moteTimer <= 0) {
        i.moteTimer = .5 + .6 * Math.random();
        n.VFX.spawnMote(n.Camera.renderX() + Math.random() * n.Renderer.w, n.Camera.renderY() + n.Renderer.h + 6);
      }
      (function (a) {
        var t = i.map && i.map.data && i.map.data.spiritSpots;
        if (t && t.length && (i.spiritTimer -= a, !(i.spiritTimer > 0))) {
          var o = t[Math.random() * t.length | 0];
          i.spiritTimer = o.rate || .25;
          var h = o.tx * e + e / 2;
          var c = (o.ty + 1) * e;
          var r = n.Camera.renderX();
          var u = n.Camera.renderY();
          var l = o.rx || 40;
          var s = o.top || 90;
          var g = o.h || 60;
          if (!(h + l < r || h - l > r + n.Renderer.w || c < u || c - s > u + n.Renderer.h)) {
            var p = h + (2 * Math.random() - 1) * l;
            var d = c - s + Math.random() * g;
            n.VFX.spawnQiWisp(p, d);
            if (Math.random() < .6) {
              n.VFX.spawnMote(p + (16 * Math.random() - 8), d + (12 * Math.random() - 6));
            }
          }
        }
      })(o);
      n.VFX.update(o);
      n.HUD.update(o);
    }
  }
  function g() {
    var a = n.Quest.seedTaskInfo();
    return !(!a || "escort" !== a.kind);
  }
  function p() {
    if (g() && i.player) {
      i.escortFollower = { x: i.player.x - 18, y: i.player.y + 8, dir: i.player.dir || 0, moving: !1, animTime: 0, cfg: { gender: "male", hair: "dao_dong", hairColor: "nau", outfit: "thanh_y", skin: "light", aura: "none" } };
    }
    else {
      i.escortFollower = null;
    }
  }
  function d(e, t, i, o) {
    var h = Math.round(t.x - i);
    var c = Math.round(t.y - o);
    var r = t.moving ? a.ANIM.walk : a.ANIM.idle;
    var u = r.cols[Math.floor(t.animTime * r.fps) % r.cols.length];
    var l = n.SpriteFactory.get(t.cfg);
    n.Pixel.ellipse(e, h, c - 1, 8, 3, n.Palette.WORLD.shadow, null);
    n.SpriteFactory.drawBody(e, l, t.dir, u, h - a.CHAR_ANCHOR_X, c - a.CHAR_ANCHOR_Y);
  }
  function y(a) {
    return !a.requireStage || n.Quest.stage >= a.requireStage;
  }
  function m() {
    var a = i.map.enemySpawns || [];
    i.enemies = [];
    for (var e = 0; e < a.length; e++)
      if (y(a[e])) {
        var t = n.Enemy.create(a[e]);
        if (t) {
          t.tuMay = !0;
        }
        i.enemies.push(t);
        if (t && t.def && t.def.isBoss && n.Audio && n.Audio.play) {
          n.Audio.play("boss_alert");
        }
      }
    i.critters = f(i.map);
  }
  function f(a) {
    for (var e = a && a.critterSpawns || [], t = [], i = 0; i < e.length; i++)
      n.CRITTER_DEFS[e[i].type] ? t.push(n.Critter.create(e[i])) : console.warn("[PNTT] Bỏ qua sinh vật chưa có định nghĩa:", e[i].type);
    return t;
  }
  function T() {
    if (i.map && i.map.data && "hang_dong_co" === i.map.data.id) {
      var a = i.map.prop("linh_duoc_ruong");
      if (a) {
        a.variant = n.Quest.flags.hang_dong_da_lay_ruong ? 1 : 0;
      }
    }
  }
  function v(a) {
    if (0 !== Bn()) {
      for (var e = 0; e < i.critters.length; e++)
        n.Critter.update(i.critters[e], a, i.map);
    }
  }
  function x(a) {
    if (!h()) {
      var e = i.enemies;
      if (n.LuyenQuy) {
        i.player.honPhien = n.LuyenQuy.coPhien(n) ? 1 : 0;
      }
      if (n.ChinhDao) {
        i.player.kiemHap = n.ChinhDao.coHap(n) ? 1 : 0;
      }
      for (var t = 0; t < e.length; t++) {
        var o = e[t];
        var c = o.novaSeq;
        var r = o.pounceSeq;
        n.Enemy.update(o, a, i.player, i.map, n.Game.time);
        if (o.novaSeq !== c && n.VFX.spawnFireNova) {
          n.VFX.spawnFireNova(o.novaX, o.novaY);
          if (o.def && o.def.isBoss && n.Audio && n.Audio.atPoint) {
            n.Audio.atPoint("boss_nova", o.novaX, o.novaY, { gain: .65 });
          }
        }
        if (o.pounceSeq !== r && n.VFX.spawnBossPounce) {
          n.VFX.spawnBossPounce(o.pounceX, o.pounceY, o.type);
          if (o.def && o.def.isBoss && n.Audio && n.Audio.atPoint) {
            n.Audio.atPoint("boss_pounce", o.pounceX, o.pounceY, { gain: .65 });
          }
        }
      }
    }
  }
  i.online = h;
  i.intent = c;
  i.startMapData = function () {
    if ("undefined" != typeof location && ("localhost" === location.hostname || "127.0.0.1" === location.hostname || "[::1]" === location.hostname || "::1" === location.hostname)) {
      var a = /(?:^|[?&])map=([^&]+)/.exec(location.search || "");
      if (a && n.MapData.get) {
        var e = "";
        try {
          e = decodeURIComponent(a[1]);
        }
        catch (n) {
          e = a[1];
        }
        var t = n.MapData.get(e);
        if (t) {
          return t;
        }
      }
    }
    if (Ra && n.MapData.get) {
      var i = n.MapData.get(Ra.mapId);
      if (i) {
        return i;
      }
    }
    var o = n.CloudSave && n.CloudSave.spawn;
    var h = n.MapData.TAN_VIEN;
    if (o && o.mapId && n.MapData.get) {
      h = n.MapData.get(o.mapId) || h;
    }
    return h;
  };
  i.nenVeTay = function () {
    return [n.UUynhVucArt, n.ThienDaoArt, n.HuyetXichArt, n.TanVienArt, n.BaiDaArt, n.RungTrucArt, n.DuocCocArt, n.MieuHoangArt, n.MoLinhThachArt, n.LongUyenArt, n.ThungLungArt, n.HuThienArt, n.YenLangArt, n.SanDauArt].filter(Boolean).concat(n.VeTay ? n.VeTay.ds : []);
  };
  i.nuongNenDau = function (a, t) {
    var o = i.nenVeTay();
    if (!a || !o.length) {
      return Promise.resolve();
    }
    var h = n.CloudSave && n.CloudSave.spawn;
    var c = a.spawn || { tx: 0, ty: 0 };
    var r = h && h.mapId === a.id;
    var u = r ? h.x : c.tx * e + e / 2;
    var l = r ? h.y : c.ty * e + e / 2;
    o.forEach(function (n) {
      if (n.nha) {
        n.nha(a);
      }
      if (n.chuanBiTruoc) {
        n.chuanBiTruoc(a, u, l);
      }
    });
    return new Promise(function (n) {
      var e = Date.now() + (null == t ? 2e3 : t);
      !function t() {
        if (Date.now() >= e || o.every(function (n) {
          return !n.choXong || n.choXong(a);
        })) {
          return n();
        }
        setTimeout(t, 30);
      }();
    });
  };
  i.enter = function (o) {
    n.Quest.load();
    var c = o && o.cfg || t.store.get(a.STORAGE_KEY, null) || n.DEFAULT_CHARACTER;
    var l = n.CloudSave && n.CloudSave.spawn;
    var s = i.startMapData();
    i.map = n.TileMap.load(s);
    m();
    var g = i.map.data.spawn;
    var d = g.tx * e + e / 2;
    var y = g.ty * e + e - 4;
    if (l && l.mapId === i.map.data.id && (d = l.x, y = l.y), n.MapData.daiTanSafeSpawn) {
      var f = n.MapData.daiTanSafeSpawn(i.map.data.id, { x: d, y: y });
      d = f.x;
      y = f.y;
    }
    i.player = n.Player.create(c, d, y);
    if (l && null != l.dir) {
      i.player.dir = 0 | l.dir;
    }
    if (n.CloudSave) {
      n.CloudSave.spawn = null;
    }
    p();
    n.Camera.snapTo(i.player.x, i.player.y, n.Renderer.w, n.Renderer.h, i.map.pxWidth, i.map.pxHeight);
    u();
    n.Farm.syncProps(i.map);
    var T = Ra;
    Ra = null;
    if (T) {
      i.enterServerMap(T);
      if (i.map.data.id === T.mapId && T.e && n.Gateway && n.Gateway.buildMobs) {
        n.Gateway.buildMobs(T.e);
      }
    }
    n.HUD.bind(i.player, i.map.data.name);
    n.HUD.show();
    n.HUD.closeBag();
    n.TouchUI.restoreVisibility(!0);
    n.Hotbar.setVisible(!0);
    if (n.TalismanBar) {
      n.TalismanBar.setVisible(!0);
    }
    n.Chat.showPanel();
    if (!(i.menuBuilt)) {
      (function () {
        t.$("#menu-resume").addEventListener("click", Yn);
        t.$("#menu-touch").addEventListener("click", function () {
          var a = "touch" === n.Input.mode ? "keyboard" : "touch";
          n.Input.setMode(a, !0);
          n.TouchUI.setVisible("touch" === a);
          this.textContent = "Điều khiển: " + ("touch" === a ? "Cảm ứng" : "Bàn phím");
        });
        t.$("#menu-touch-style").addEventListener("click", function () {
          var a = "joystick" === n.TouchUI.controlStyle ? "joystick" : "dpad";
          var e = n.TouchUI.setControlStyle("joystick" === a ? "dpad" : "joystick");
          this.textContent = "Kiểu di chuyển: " + n.TouchUI.controlStyleLabel();
          if (!("joystick" === e && "touch" !== n.Input.mode)) {
            n.TouchUI.setVisible(!0);
          }
        });
        t.$("#menu-theme").addEventListener("click", function () {
          n.applyWorldTheme(n.Palette.nextWorldTheme(), !0);
          this.textContent = "Tông cảnh vật: " + n.Palette.WORLD.name;
        });
        t.$("#menu-zoom").addEventListener("click", function () {
          n.Renderer.nextView();
          this.textContent = qn();
        });
        var e = t.$("#menu-gfx");
        if (e && n.Quality) {
          e.addEventListener("click", function () {
            n.Quality.next();
            this.textContent = On();
            t.$("#menu-zoom").textContent = qn();
            Kn();
          });
        }
        var o = t.$("#menu-weather");
        if (o && n.Weather) {
          o.addEventListener("click", function () {
            n.Weather.nextMode();
            Kn();
          });
        }
        var c = t.$("#menu-nguoi");
        if (c && n.Quality && n.Quality.nguoiNext) {
          c.addEventListener("click", function () {
            n.Quality.nguoiNext();
            this.textContent = "Người chơi khác: " + n.Quality.nguoiLabel();
          });
        }
        t.$("#menu-debug").addEventListener("click", function () {
          a.DEBUG = !a.DEBUG;
          this.textContent = "Lưới gỡ lỗi: " + (a.DEBUG ? "Bật" : "Tắt");
        });
        t.$("#menu-feedback").addEventListener("click", function () {
          Yn();
          (function () {
            var e;
            var t;
            var i;
            var o;
            var c = a.GOP_Y || { TOI_THIEU: 5, TOI_DA: 500 };
            function r() {
              var n = $n.trim().length;
              t.textContent = n + " / " + c.TOI_DA;
              t.classList.toggle("gopy-dem-day", n >= c.TOI_DA);
              i.disabled = n < c.TOI_THIEU;
            }
            function u(n) {
              o.textContent = n || "";
              o.classList.toggle("hidden", !n);
            }
            if (h() && n.Gateway.cmd) {
              n.HUD.openDialog("Góp Ý", "Thấy lỗi, thấy chỗ khó chịu, hay muốn xin thêm gì — cứ viết. Đạo hiệu của đạo hữu được gửi kèm để bên kia biết nhắn lại cho ai.", { content: function (a) {
                  a.classList.add("gopy-box");
                  (e = document.createElement("textarea")).className = "tm-input gopy-vung";
                  e.rows = 5;
                  e.maxLength = c.TOI_DA;
                  e.value = $n;
                  e.placeholder = 'Ví dụ: đánh boss Linh Hổ ở khu 1 thì bảng giờ boss đứng mãi ở "Sắp xuất hiện"…';
                  e.addEventListener("input", function () {
                    $n = e.value;
                    u("");
                    r();
                  });
                  a.appendChild(e);
                  (o = document.createElement("p")).className = "gopy-loi hidden";
                  a.appendChild(o);
                  var h = document.createElement("div");
                  h.className = "gopy-hang";
                  (t = document.createElement("span")).className = "gopy-dem";
                  h.appendChild(t);
                  (i = document.createElement("button")).type = "button";
                  i.className = "btn-choice gopy-gui";
                  i.textContent = "Gửi";
                  i.addEventListener("click", function () {
                    var a = $n.trim();
                    if (!(a.length < c.TOI_THIEU)) {
                      i.disabled = !0;
                      i.textContent = "Đang gửi…";
                      u("");
                      n.Gateway.cmd("gopy", { noiDung: a }, function (a) {
                        if (a && a.ok) {
                          $n = "";
                          return void n.HUD.openDialog("Góp Ý", (a.toast || "Đã gửi góp ý.") + "\n\nLời của đạo hữu đã tới bàn của người giữ máy chủ.");
                        }
                        i.disabled = !1;
                        i.textContent = "Gửi";
                        u(a && a.why || "Chưa gửi được, thử lại sau.");
                      });
                    }
                  });
                  h.appendChild(i);
                  a.appendChild(h);
                  r();
                  if (e.focus) {
                    setTimeout(function () {
                      e.focus();
                    }, 0);
                  }
                } });
            }
            else {
              n.HUD.openDialog("Góp Ý", "Góp ý cần nối được máy chủ. Đang chơi ngoại tuyến nên chưa gửi đi đâu được.");
            }
          })();
        });
        t.$("#menu-move-layout").addEventListener("click", function () {
          Yn();
          if (n.MoveLayout) {
            n.MoveLayout.mo();
          }
        });
        t.$("#menu-thoat-ket").addEventListener("click", function () {
          var a;
          Yn();
          if ((a = n.Gateway) && a.connected && a.ready && a.cmd) {
            a.cmd("thoatKet", {}, function (a) {
              if (a && a.ok) {
                var e = i.player;
                if (e) {
                  var t = e.x;
                  var o = e.y;
                  var h = e.hp;
                  var c = Date.now() + 1e3 * (a.giay || 10);
                  if (Qn) {
                    clearInterval(Qn);
                  }
                  Qn = setInterval(function () {
                    var a = i.player;
                    var r = Math.ceil((c - Date.now()) / 1e3);
                    if (!a || a !== e || Math.abs(a.x - t) > 4 || Math.abs(a.y - o) > 4 || a.hp < h || a.downed || r <= 0) {
                      clearInterval(Qn);
                      return void (Qn = null);
                    }
                    n.HUD.setCaption("Thoát kẹt sau " + r + " giây — đứng yên, bị đánh là huỷ.");
                  }, 250);
                }
              }
              else {
                n.HUD.setCaption(a && a.why || "Không thoát kẹt được lúc này.");
              }
            });
          }
          else {
            n.HUD.setCaption("Thoát kẹt cần nối được máy chủ.");
          }
        });
        var r = t.$("#menu-audio");
        var u = t.$("#menu-audio-opts");
        var l = t.$("#audio-tick-music");
        var s = t.$("#audio-tick-sfx");
        var g = t.$("#audio-vol");
        function p() {
          var a = n.Audio;
          r.textContent = "Âm thanh: " + a.stepName();
          g.textContent = "Âm lượng: " + a.stepName();
          l.checked = !1 !== a.musicOn;
          s.checked = !1 !== a.sfxOn;
        }
        r.addEventListener("click", function () {
          var n = !1 === u.classList.toggle("hidden");
          r.setAttribute("aria-expanded", n ? "true" : "false");
          p();
        });
        l.addEventListener("change", function () {
          n.Audio.setMusicOn(l.checked);
        });
        s.addEventListener("change", function () {
          n.Audio.setSfxOn(s.checked);
        });
        g.addEventListener("click", function () {
          n.Audio.nextStep();
          p();
        });
        t.$("#menu-guide").addEventListener("click", function () {
          i.questGuideOn = !i.questGuideOn;
          t.store.set("pntt_quest_guide_on", i.questGuideOn);
          this.textContent = "Mũi tên chỉ đường: " + (i.questGuideOn ? "Bật" : "Tắt");
        });
        t.$("#menu-logout").addEventListener("click", function () {
          var a = this;
          if (!n.Auth || !n.Auth.user) {
            Yn();
            return void (n.Net && n.Net.online && window.location.reload());
          }
          a.disabled = !0;
          a.textContent = "Đang đăng xuất…";
          Yn();
          n.Auth.signOut().then(function (n) {
            if (!n || !n.ok) {
              throw new Error("Đăng xuất không thành công.");
            }
            window.location.reload();
          }).catch(function (e) {
            a.disabled = !1;
            a.textContent = "Đăng xuất";
            Rn();
            n.HUD.toast(n.Net && n.Net.viError ? n.Net.viError(e) : "Đăng xuất thất bại.");
          });
        });
        t.$("#btn-auto").addEventListener("click", function () {
          n.Input.pressAutoToggle();
        });
        var d = t.$("#btn-fishing-stop");
        if (d) {
          d.addEventListener("click", In);
        }
        var y = t.$("#ht-menu");
        if (y) {
          y.addEventListener("click", function () {
            if (n.HUD && n.HUD.bagOpen) {
              n.HUD.closeBag();
            }
            Rn();
          });
        }
        var m = t.$("#btn-sect");
        if (m) {
          m.addEventListener("click", Gn);
        }
        t.$("#menu").addEventListener("click", function (n) {
          if ("menu" === n.target.id) {
            Yn();
          }
        });
        i.menuBuilt = !0;
      })();
    }
    Yn();
    n.VFX.spawnText(i.player.x, i.player.y - 54, i.player.realm, "#cfe0b8");
    r(i.map.data);
    var v = n.Net && n.Net.online && !(n.Auth && n.Auth.user);
    if (n.Gateway && !v) {
      n.Gateway.connect();
    }
  };
  i.exit = function () {
    if (n.Weather) {
      n.Weather.stop();
    }
    if (n.Gateway) {
      n.Gateway.reset();
    }
    n.HUD.hide();
    n.Hotbar.setVisible(!1);
    if (n.TalismanBar) {
      n.TalismanBar.setVisible(!1);
    }
    n.Chat.hidePanel();
    n.HUD.setCaption(null);
    Yn();
  };
  i.update = function (e) {
    var o = i.player;
    var r = i.map;
    if (n.Gateway.update(e, o), n.ThreeMapsAtmosphere && r && n.ThreeMapsAtmosphere.update(e, o, r), n.DaiHoiUI && n.DaiHoiUI.update(), n.TongMonChienUI && n.TongMonChienUI.update(), n.Chat && n.Chat.updateBubbles && n.Chat.updateBubbles(e), n.NpcChatter && n.NpcChatter.update(e, i.player), n.AmHon && n.AmHon.update(n.Gateway.honBay || [], e), n.KhoiLoiFX && n.KhoiLoiFX.update(n.Gateway.khoiLoiBay || [], e), function (a, e) {
      if (n.LuyenQuy && e && e.mp > 0) {
        var t = n.Gateway.honBay;
        if (t && t.length) {
          for (var i = n.Gateway.selfId, o = 0, h = 0; h < t.length; h++)
            t[h].o === i && o++;
          if (o) {
            e.mp = Math.max(0, e.mp - n.LuyenQuy.MP_NUOI * o * a);
          }
        }
      }
    }(e, o), i.waterTime += e, n.PondFish && Bn() > 0 && n.PondFish.update(e, r), n.Weather && (n.Weather.update(e, r), n.Weather.rev !== En && function () {
      En = n.Weather.rev;
      var a = t.$("#hud-weather");
      if (a) {
        var e = n.Weather.label();
        if (a.textContent !== e) {
          a.textContent = e;
        }
        a.classList.toggle("hidden", !e);
      }
    }()), n.SpriteFactory.pump && n.SpriteFactory.pump(3), i.transitioning) {
      n.VFX.update(e);
      n.HUD.update(e);
      if (o && o.downed && n.DownedUI) {
        n.DownedUI.update(o);
      }
      an(e);
      return void (n.Input.consumeTap && n.Input.consumeTap());
    }
    if (nn()) {
      n.Targeting.clear();
      l(e, o);
      an(e);
      n.HUD.update(e);
      return void n.Input.reset();
    }
    if (o && o.downed) {
      n.Targeting.clear();
      o.update(e, r);
      x(e);
      v(e);
      n.Skills.update(e, i.enemies, function (n) {
        k(n, o);
      });
      an(e);
      n.VFX.update(e);
      n.HUD.update(e);
      n.DownedUI.update(o);
      return void n.Input.reset();
    }
    if (i.ritual) {
      n.Targeting.clear();
      (function (a) {
        var e = i.ritual;
        var t = i.player;
        e.t += a;
        if (e.t < 2.2) {
          Pn(0, "Vận chuyển Đạo Dẫn thuật — linh khí trời đất tụ về tứ chi bách hài…");
          e.a1 += a;
          if (e.a1 > .045) {
            e.a1 = 0;
            n.VFX.spawnGather(t.x, t.y, 40 + 40 * Math.random());
          }
          if (Math.floor(2 * e.t) !== Math.floor(2 * (e.t - a))) {
            n.VFX.spawnRing(t.x, t.y - 12, "#a9d8b6", 26, .8);
          }
        }
        else {
          if (e.t < 4.8) {
            Pn(1, "Trọc khí tích tụ bao năm đang bị bức xuất khỏi lục phủ ngũ tạng!");
            e.a2 += a;
            if (e.a2 > .055) {
              e.a2 = 0;
              n.VFX.spawnSmoke(t.x, t.y, 2);
            }
            n.Camera.shake(1.5, .1);
          }
          else {
            if (e.fail) {
              if (e.t < 6) {
                if (Pn(2, "Trọc khí dồn ngược lên tâm mạch — không đẩy ra nổi!")) {
                  n.VFX.spawnFlash(.4, "#5a2018");
                  n.VFX.spawnRing(t.x, t.y - 14, "#8a4a3a", 70, .8);
                  n.Camera.shake(5.5, .5);
                }
                e.a2 += a;
                if (e.a2 > .04) {
                  e.a2 = 0;
                  n.VFX.spawnSmoke(t.x + (16 * Math.random() - 8), t.y, 3);
                }
                n.Camera.shake(2.2, .12);
              }
              else {
                if (e.t < 7.2) {
                  Pn(3, "Kinh mạch rát như bị đốt — thang thuốc hỏng mất rồi…");
                }
                else {
                  (function () {
                    var a = i.player;
                    i.ritual = null;
                    a.sitLocked = !1;
                    n.Player.stand(a);
                    n.HUD.setCaption(null);
                    a.hp = Math.max(1, Math.round(.3 * a.hpMax));
                    n.HUD.refreshRealm();
                    n.Quest.setFlag("tay_tuy_that_bai");
                    (function () {
                      for (var a = i.map.props.concat(i.map.flatProps), e = 0; e < a.length; e++) {
                        var t = a[e];
                        if (t.herb && !t.off) {
                          t.hidden = !1;
                          t.regrowAt = 0;
                          delete n.Progress.harvested[t.id];
                        }
                      }
                      n.Quest.save();
                    })();
                    n.HUD.updateQuest();
                    n.VFX.spawnText(a.x, a.y - 54, "Phạt mao thất bại", "#e0604a");
                    n.HUD.openDialog("Phạt Mao Thất Bại", 'Trọc khí bị dồn tới cửa ải cuối cùng thì tắc lại. Không thoát ra được, nó quay ngược trở vào, chạy loạn trong kinh mạch.\n\nNgươi ngã vật xuống phiến đá, nôn ra một ngụm nước thuốc đen kịt. Bát Tẩy Tuỷ Thang coi như phí hoài. Khí huyết hao tổn quá nửa, tay chân bủn rủn không nhấc nổi.\n\n"Thân phàm chưa từng chịu khổ, lần đầu bức trọc khí mười người hỏng chín" — lời Thầy Ông Nội dặn lúc trước giờ mới thấm.\n\nBát thuốc mất rồi thì phải sắc bát khác. Dược thảo ven suối cũng vừa mọc lại — hái đủ ba ngọn, múc thêm bình Linh Tuyền Thuỷ, rồi ra đan lô nhóm lửa lần nữa.');
                  })();
                }
              }
            }
            else {
              if (e.t < 5.3) {
                if (Pn(2, "Tẩy tuỷ phạt mao — thay xương đổi thịt!")) {
                  n.VFX.spawnFlash(.55);
                  n.VFX.spawnRing(t.x, t.y - 14, "#dff3ff", 95, .95);
                  n.VFX.spawnRing(t.x, t.y - 14, "#bff3d8", 62, .75);
                  n.Camera.shake(4.5, .35);
                  (function () {
                    var a = i.player;
                    n.Player.setRealm(a, "luyen_khi_1");
                    n.Quest.setFlag("tay_tuy_xong");
                    n.HUD.refreshRealm();
                    n.HUD.refreshPortrait();
                    n.HUD.updateQuest();
                  })();
                }
              }
              else {
                if (e.t < 7.6) {
                  if (Pn(3, null)) {
                    n.VFX.spawnPillar(t.x, t.y, 2.1);
                  }
                  n.HUD.announce("LUYỆN KHÍ TẦNG 1 — Cảm Ứng Kỳ");
                  e.a3 += a;
                  if (e.a3 > .1) {
                    e.a3 = 0;
                    n.VFX.spawnMote(t.x + (26 * Math.random() - 13), t.y - 4);
                  }
                }
                else {
                  (function () {
                    var a = i.player;
                    i.ritual = null;
                    a.sitLocked = !1;
                    n.HUD.setCaption(null);
                    dn();
                    n.HUD.openDialog("Phạt Mao Thành Công", "Lớp trọc khí cuối cùng tan hết trong dòng nước. Một luồng khí mát lạnh chui qua da thịt, men theo kinh mạch chảy về đan điền.\n\nCảm Ứng Kỳ — từ nay ngươi không còn là phàm nhân.\n\nXuống Rừng Trúc phía nam tìm Huấn Sư Huynh.", { reward: [{ icon: "bowl", name: "Cảnh giới: Luyện Khí Tầng 1", qty: 1 }, { icon: "flask", name: "Mở khoá Linh Lực & Đả Tọa", qty: 1 }] });
                  })();
                }
              }
            }
          }
        }
      })(e);
      o.update(e, r);
      an(e);
      l(e, o);
      return void n.HUD.update(e);
    }
    if (i.foundationBreakthrough) {
      n.Targeting.clear();
      (function (a) {
        var e = i.foundationBreakthrough;
        var t = i.player;
        if (e && t) {
          e.t += a;
          if (e.t < 2.15) {
            if (0 !== e.phase) {
              e.phase = 0;
            }
            e.gatherAcc += a;
            if (e.gatherAcc > .032) {
              e.gatherAcc = 0;
              n.VFX.spawnGather(t.x, t.y - 5, 52 + 62 * Math.random());
            }
            if (Math.floor(3 * e.t) !== Math.floor(3 * (e.t - a))) {
              n.VFX.spawnRing(t.x, t.y - 11, "#b9d9ac", 34, .72);
            }
            n.Camera.shake(1, .08);
          }
          else {
            if (e.t < 4.55) {
              if (1 !== e.phase) {
                e.phase = 1;
                n.HUD.setCaption("Tám mạch quy nguyên — ép linh khí kết thành Đạo Cơ!");
              }
              e.gatherAcc += a;
              if (e.gatherAcc > .05) {
                e.gatherAcc = 0;
                n.VFX.spawnGather(t.x, t.y - 13, 34 + 42 * Math.random());
              }
              if (Math.floor(2.5 * e.t) !== Math.floor(2.5 * (e.t - a))) {
                n.VFX.spawnRing(t.x, t.y - 15, "#e6cf86", 44, .75);
              }
              n.Camera.shake(1.8, .1);
            }
            else {
              if (e.phase < 2) {
                e.phase = 2;
                if (e.success) {
                  n.HUD.setCaption("Đạo chủng khai mở — thiên địa cộng minh!");
                  n.VFX.spawnFlash(.68, "#effff3");
                  n.VFX.spawnRing(t.x, t.y - 17, "#effff3", 138, 1.3);
                  n.VFX.spawnRing(t.x, t.y - 17, "#f3d98b", 96, 1.08);
                  n.VFX.spawnRing(t.x, t.y - 17, "#bff3d8", 62, .86);
                  n.VFX.spawnPillar(t.x, t.y, 2.8);
                  n.Audio.play("breakthrough");
                  n.Camera.shake(7, .58);
                  n.HUD.announce("TRÚC CƠ — ĐẠO CƠ ĐÃ THÀNH");
                  F("ascend");
                }
                else {
                  n.HUD.setCaption("Đạo chủng vừa kết đã nứt — linh khí dồn ngược tâm mạch!");
                  n.VFX.spawnFlash(.4, "#5a2018");
                  n.VFX.spawnRing(t.x, t.y - 14, "#8a4a3a", 70, .8);
                  n.Camera.shake(5.5, .5);
                }
              }
              else {
                if (e.t < 7.8) {
                  e.settleAcc += a;
                  if (e.success && e.settleAcc > .065) {
                    e.settleAcc = 0;
                    n.VFX.spawnMote(t.x + (44 * Math.random() - 22), t.y - 24 * Math.random());
                  }
                  else {
                    if (!e.success && e.t < 6.25 && e.settleAcc > .04) {
                      e.settleAcc = 0;
                      n.VFX.spawnSmoke(t.x + (18 * Math.random() - 9), t.y, 3);
                      n.Camera.shake(2.2, .12);
                    }
                  }
                }
                else {
                  (function () {
                    var a = i.foundationBreakthrough;
                    var e = i.player;
                    if (a && e) {
                      i.foundationBreakthrough = null;
                      e.sitLocked = !1;
                      n.Player.stand(e);
                      n.HUD.setCaption(null);
                      n.HUD.refreshRealm();
                      n.HUD.refreshPortrait();
                      dn();
                      if (a.success) {
                        n.VFX.spawnText(e.x, e.y - 58, "Đạo Cơ đã thành", "#f4dc8e");
                        n.HUD.openDialog("Trúc Cơ Thành Công", a.why, { reward: [{ icon: "yin_yang", name: "Cảnh giới Trúc Cơ", qty: 1 }] });
                      }
                      else {
                        n.VFX.spawnText(e.x, e.y - 54, "Dựng Đạo Cơ thất bại", "#e0604a");
                        n.HUD.openDialog("Đột Phá Thất Bại", a.why);
                      }
                    }
                  })();
                }
              }
            }
          }
        }
      })(e);
      o.update(e, r);
      an(e);
      l(e, o);
      return void n.HUD.update(e);
    }
    if (i.ascend) {
      n.Targeting.clear();
      (function (e) {
        var t = i.ascend;
        var o = i.player;
        var h = a.ASCEND;
        if (t.t += e, t.t < h.FLASH_AT) {
          if (0 !== t.phase) {
            t.phase = 0;
            n.HUD.setCaption("Vận Đạo Dẫn thuật — dồn linh khí lên cửa quan…");
          }
          t.acc += e;
          if (t.acc > .04) {
            t.acc = 0;
            n.VFX.spawnGather(o.x, o.y, 34 + 46 * Math.random());
          }
          if (Math.floor(2 * t.t) !== Math.floor(2 * (t.t - e))) {
            n.VFX.spawnRing(o.x, o.y - 12, "#a9d8b6", 28, .7);
          }
          n.Camera.shake(1.2, .1);
        }
        else if (t.phase < 1) {
          t.phase = 1;
          var c = n.Player.ascend(o);
          n.VFX.spawnFlash(.5);
          n.VFX.spawnRing(o.x, o.y - 14, "#dff3ff", 90, .9);
          n.VFX.spawnRing(o.x, o.y - 14, "#bff3d8", 58, .7);
          n.VFX.spawnPillar(o.x, o.y, 1.8);
          n.Audio.play("breakthrough");
          n.Camera.shake(4.5, .35);
          n.HUD.announce("ĐỘT PHÁ — " + (c ? c.name : ""));
          n.Quest.save();
          F("ascend", (Math.round(o.x), Math.round(o.y), c && c.id));
        }
        else {
          if (t.t >= h.TIME) {
            (function () {
              var a = i.player;
              i.ascend = null;
              a.sitLocked = !1;
              n.HUD.setCaption(null);
              dn();
              n.HUD.openDialog("Phá Quan Thành Công", 'Một tiếng "bực" khẽ vang trong kinh mạch — cửa quan vỡ ra. Linh khí ứ đọng bấy lâu ào ạt chảy thông khắp tứ chi bách hài.\n\nCảnh giới hiện tại: ' + a.realm + ".\n" + a.realmSub + "\n\nĐạo Hạnh trở về số không, nhưng sức chứa của đan điền thì rộng hơn trước nhiều." + function () {
                var a = n.Quest;
                var e = n.realmIndexById(n.Progress.realmId);
                var t = n.realmIndexById;
                if (11 === a.stage) {
                  return "\n\nDược Linh Thú đang phá vườn — hạ 2 con ngay trong Vườn Cá Nhân lấy Linh Thúy, rồi luyện Tụ Khí Đan ở đan lô trong vườn.";
                }
                if (13 === a.stage && e === t("luyen_khi_2")) {
                  return "\n\nCòn một cửa nữa: tích đủ Đạo Hạnh ở Tầng 2 (đả tọa ở đài đá hoặc săn quái), rồi quay lại đây nuốt Tụ Khí Đan phá quan lên Luyện Khí Tầng 3.";
                }
                if (13 === a.stage && e >= t("luyen_khi_3")) {
                  return "\n\nVề Thảo Dược Cốc báo Đại Phu — lão có quà cho ngươi.";
                }
                if (a.stage === a.BI_TICH_STAGE && e === t("luyen_khi_3")) {
                  return "\n\nCửa Tầng 3 → 4 cần thêm một viên Tụ Khí Đan: gieo 3 Linh Diệp + 3 Huyết Thảo, hạ 2 Dược Linh Thú lấy Linh Thúy, luyện ở đan lô trong vườn.";
                }
                if (a.stage >= a.DOT_PHA_5_STAGE && a.isActive()) {
                  var i = a.stageInfo();
                  if (i && i.hint) {
                    return "\n\nViệc kế: " + i.hint;
                  }
                }
                return "";
              }(), { reward: [{ icon: "leaf_token", name: "Cảnh giới: " + a.realm, qty: 1 }] });
            })();
          }
          else {
            t.acc += e;
            if (t.acc > .1) {
              t.acc = 0;
              n.VFX.spawnMote(o.x + (26 * Math.random() - 13), o.y - 4);
            }
          }
        }
      })(e);
      i.player.update(e, r);
      an(e);
      l(e, o);
      return void n.HUD.update(e);
    }
    if (i.qiSurge) {
      n.Targeting.clear();
      (function (a) {
        var e = i.qiSurge;
        var t = i.player;
        e.t += a;
        if (e.t < 2.4) {
          if (0 !== e.phase) {
            e.phase = 0;
            n.HUD.setCaption("Dược lực tan trong huyết mạch — linh khí quanh mạch suối bị hút về…");
          }
          e.acc += a;
          if (e.acc > .04) {
            e.acc = 0;
            n.VFX.spawnGather(t.x, t.y, 38 + 44 * Math.random());
          }
          if (Math.floor(2 * e.t) !== Math.floor(2 * (e.t - a))) {
            n.VFX.spawnRing(t.x, t.y - 12, "#7fc0a0", 26, .7);
          }
          n.Camera.shake(1, .1);
        }
        else {
          if (e.phase < 1) {
            e.phase = 1;
            n.Player.addExp(t, t.expMax || 0, !0);
            n.Quest.setFlag("dung_tu_khi_duoc");
            n.VFX.spawnFlash(.35, "#bff3d8");
            n.VFX.spawnPillar(t.x, t.y, 1.6);
            n.VFX.spawnRing(t.x, t.y - 14, "#dff3ff", 72, .85);
            n.Camera.shake(3.2, .3);
            n.HUD.announce("TỤ KHÍ — Đạo Hạnh dồn về đan điền");
            n.Quest.save();
          }
          else {
            if (e.t >= 5) {
              (function () {
                var a = i.player;
                var e = i.qiSurge && i.qiSurge.prop;
                i.qiSurge = null;
                a.sitLocked = !1;
                n.HUD.setCaption(null);
                dn();
                var t = n.Breakthrough && n.Breakthrough.check(a);
                var o = !!(e && "meditate_stone" === e.type && t && t.ready && !t.blocked && t.next);
                n.HUD.openDialog("Tụ Khí Thành", "Dược lực tan vào kinh mạch, linh khí cuộn về đan điền. Đạo Hạnh đã VIÊN MÃN.\n\n" + (o ? "Nhân lúc linh khí đang đầy, phá quan lên " + t.next.name + " ngay tại đây." : "Đạo Hạnh đầy không tự lên tầng — ra đài đá bấm E để phá quan."), o ? { actionLabel: "Phá Quan Ngay", onAction: function () {
                    Fn(e);
                  } } : { reward: [{ icon: "potion", name: "Đạo Hạnh viên mãn", qty: 1 }] });
              })();
            }
            else {
              e.acc += a;
              if (e.acc > .1) {
                e.acc = 0;
                n.VFX.spawnMote(t.x + (26 * Math.random() - 13), t.y - 4);
              }
            }
          }
        }
      })(e);
      o.update(e, r);
      an(e);
      l(e, o);
      return void n.HUD.update(e);
    }
    if (i.brewing) {
      n.Targeting.clear();
      (function (a) {
        var e = i.brewing;
        e.t += a;
        e.acc += a;
        if (e.acc > .09) {
          e.acc = 0;
          n.VFX.spawnSmoke(e.prop.x, e.prop.y - 26, 1);
          if (Math.random() < .4) {
            n.VFX.spawnMote(e.prop.x + (14 * Math.random() - 7), e.prop.y - 24);
          }
        }
        var t = "tu_khi_dan" === e.make ? 3.4 : 2.6;
        if (!(e.t < t)) {
          var o = n.Inventory;
          var r = n.Quest;
          if (i.brewing = null, n.HUD.setCaption(null), "ghep_yeu_dan" !== e.make && "ghep_yeu_dan_phu" !== e.make) {
            if (c("brew", { recipeId: e.make }), "tu_khi_duoc" === e.make) {
              r.payRecipe(r.TU_KHI_DUOC_RECIPE);
              o.add("tu_khi_duoc", 1);
              n.VFX.spawnRing(e.prop.x, e.prop.y - 20, "#7fc0a0", 30, .7);
              n.HUD.openDialog("Linh Dược", "Nước thuốc rút lại còn đúng một chén, sánh như mật, màu xanh trong veo.\n\nPhải uống NƠI CÓ LINH KHÍ TỤ rồi vận công ngay — đài đá trong vườn là gần nhất.", { reward: [{ icon: "potion", name: "Linh Dược", qty: 1 }] });
            }
            else if ("tu_khi_dan" === e.make) {
              r.payRecipe(r.TU_KHI_DAN_RECIPE);
              o.add("tu_khi_dan", 1);
              r.setFlag("luyen_tu_khi_dan");
              n.VFX.spawnRing(e.prop.x, e.prop.y - 20, "#f0d27a", 34, .8);
              n.VFX.spawnRing(e.prop.x, e.prop.y - 20, "#9df2dd", 22, .6);
              n.HUD.openDialog("Tụ Khí Đan", "Nắp lô vừa mở, đan hương xộc lên. Trong lòng lô là một viên đan óng như hổ phách, lõi xanh biếc — Linh Thúy đã hoá vào thuốc.\n\nĐạo Hạnh đầy thì ra đài đá nuốt đan mà phá quan. Chưa đầy thì ngồi đài đá đả tọa hoặc đi săn quái.", { reward: [{ icon: "tu_khi_dan", name: "Tụ Khí Đan", qty: 1 }] });
            }
            else if ("truc_co_dan" === e.make) {
              var u = n.HuyetSac.recipes.truc_co_dan;
              r.payRecipe(u);
              o.add("truc_co_dan", 1);
              n.VFX.spawnRing(e.prop.x, e.prop.y - 20, "#f0d27a", 36, .85);
              n.VFX.spawnRing(e.prop.x, e.prop.y - 20, "#9df2dd", 22, .6);
              n.HUD.openDialog("Trúc Cơ Đan", "Trúc Cơ Thảo cùng Địa Linh Hóa Quả hòa thành một viên đan vàng óng. Mang theo tới lúc Đạo Hạnh viên mãn để phá quan lên Trúc Cơ.", { reward: [{ icon: "pill_gold", name: "Trúc Cơ Đan", qty: 1 }] });
            }
            else {
              if ("luyen_khi_dan" === e.make) {
                r.payRecipe(r.LUYEN_KHI_DAN_RECIPE);
                o.add("luyen_khi_dan", 1);
                n.VFX.spawnRing(e.prop.x, e.prop.y - 20, "#8fd8ff", 34, .8);
                n.HUD.openDialog("Luyện Khí Đan", "Lửa vừa rút, trong lòng lô đọng lại một viên đan ánh lam, mặt trơn như men sứ.\n\nHơi lạnh của Linh Ngọc Diệp và hơi nóng của Xích Dương Thảo quấn lấy nhau, giữ nhau ở thế cân bằng — đúng thứ cần để thông ba tầng giữa của Luyện Khí.", { reward: [{ icon: "pill_blue", name: "Luyện Khí Đan", qty: 1 }] });
              }
              else {
                if ("pha_canh_dan" === e.make) {
                  r.payRecipe(r.PHA_CANH_DAN_RECIPE);
                  o.add("pha_canh_dan", 1);
                  n.VFX.spawnRing(e.prop.x, e.prop.y - 20, "#c9a0e8", 36, .9);
                  n.VFX.spawnRing(e.prop.x, e.prop.y - 20, "#f0d27a", 22, .6);
                  n.HUD.openDialog("Phá Cảnh Đan", "Nắp lô bật lên một tiếng khẽ. Viên đan nằm giữa lòng lô, vỏ tím sẫm chạy vân kim tuyến, cầm lên thấy nặng hơn hẳn mấy viên đan trước.\n\nDược lực trong nó đủ để đẩy kinh mạch qua ba cửa quan cuối của Luyện Khí.", { reward: [{ icon: "pill_violet", name: "Phá Cảnh Đan", qty: 1 }] });
                }
                else {
                  if ("dan_ngu_hanh" === e.make) {
                    r.payRecipe(r.NGU_HANH_DAN_RECIPE);
                    o.add("dan_ngu_hanh", 1);
                    n.VFX.spawnRing(e.prop.x, e.prop.y - 20, "#f5d76e", 40, .95);
                    n.VFX.spawnRing(e.prop.x, e.prop.y - 20, "#86e6d1", 25, .7);
                    n.HUD.openDialog("Đan Ngũ Hành", "Năm dải linh quang Kim, Mộc, Thuỷ, Hoả, Thổ xoắn lại trong lòng lô, kết thành một viên đan ánh ngũ sắc.\n\nĂn như Cơm Linh Mễ: hiệu lực 72 giờ, hồi Khí Huyết và Giáp gấp 1,5 lần, hồi Linh Lực và Thần Thức gấp đôi. Dược lực chỉ hợp với tu sĩ Trúc Cơ sơ kỳ trở lên.", { reward: [{ icon: "dan_ngu_hanh", name: "Đan Ngũ Hành", qty: 1 }] });
                  }
                  else {
                    if ("bao_menh_phu" === e.make) {
                      r.payRecipe(n.HuyetSac.recipes.bao_menh_phu);
                      o.add("bao_menh_phu", 1);
                      n.VFX.spawnRing(e.prop.x, e.prop.y - 20, "#f0d27a", 34, .85);
                      n.HUD.openDialog("Bảo Mệnh Phù", "Bột Cổ Bích Mộc và Trấn Thần Thạch quyện lại, in thành một lá phù vàng.\nGom đủ 5 lá dùng kèm Trúc Cơ Đan để Trúc Cơ chắc chắn; 3 lá khi ghép Yêu Đan.", { reward: [{ icon: "phu_kim_giap", name: "Bảo Mệnh Phù", qty: 1 }] });
                    }
                    else {
                      if ("tay_tam_dan" === e.make) {
                        r.payRecipe(r.TAY_TAM_DAN_RECIPE);
                        o.add("tay_tam_dan", 1);
                        n.VFX.spawnRing(e.prop.x, e.prop.y - 20, "#e8f6ff", 36, .9);
                        n.HUD.openDialog("Tẩy Tâm Đan", "Viên đan trắng ngọc kết lại, hương thanh tâm lan khắp sân.\n\nMở Hành Trang, chọn đan rồi bấm Uống: bớt " + (n.LuyenQuy && n.LuyenQuy.TAY_TAM_BOT || 100) + " Sát Nghiệp.", { reward: [{ icon: "pill_white", name: "Tẩy Tâm Đan", qty: 1 }] });
                      }
                      else {
                        r.payRecipe(r.TAY_TUY_THANG_RECIPE);
                        o.add("tay_tuy_thang", 1);
                        n.VFX.spawnRing(e.prop.x, e.prop.y - 20, "#e8dfa0", 30, .7);
                        n.HUD.openDialog("Tẩy Tuỷ Thang", "Nước trong lô cạn dần, còn lại một bát thuốc xanh sẫm, hăng đắng.\n\nMang ra đài đá bên suối mà uống — như kiến bò khắp xương tuỷ, nhưng chịu được thì thoát phàm.", { reward: [{ icon: "bowl", name: "Tẩy Tuỷ Thang", qty: 1 }] });
                      }
                    }
                  }
                }
              }
            }
            n.Quest.save();
            dn();
          }
          else {
            var l = r.brewRecipe(e.make);
            var s = function (a) {
              if (a && !1 !== a.ok) {
                if (a.success) {
                  n.VFX.spawnRing(e.prop.x, e.prop.y - 20, "#ff9a6a", 36, .85);
                  n.HUD.openDialog("Ghép Yêu Đan", "Ba mảnh đan hoà làm một, viên đan đỏ rực nằm giữa lòng lô.", { reward: [{ icon: "yeu_dan_cap_3", name: "Yêu Đan Cấp 3", qty: 1 }] });
                }
                else {
                  n.HUD.openDialog("Ghép Yêu Đan", "Yêu khí không dồn lại được — ba mảnh đan đã tan trong lò.");
                }
              }
              else {
                n.HUD.openDialog("Ghép Yêu Đan", a && a.why || "Máy chủ chưa thể xử lý lần ghép này.");
              }
              dn();
            };
            if (h()) {
              n.Gateway.cmd("brew", { recipeId: e.make }, s);
            }
            else if (l && r.hasRecipe(l.recipe)) {
              r.payRecipe(l.recipe);
              var g = Math.random() < l.tiLe;
              if (g) {
                o.add(l.ketQua, 1);
              }
              r.save();
              s({ ok: !0, success: g });
            }
          }
        }
      })(e);
      an(e);
      l(e, o);
      return void n.HUD.update(e);
    }
    if (i.fishing) {
      if (!(n.Input.hasManualMove && n.Input.hasManualMove() || n.Input.tap)) {
        n.Targeting.clear();
        (function (a) {
          var e = i.fishing;
          if (e)
            if (e.t += a, e.t < e.duration) {
              n.HUD.setCaption((e.auto ? "Tự động câu... còn " : "Đang câu... còn ") + Math.max(1, Math.ceil(e.duration - e.t)) + "s");
            }
            else if (i.fishing = null, n.HUD.setCaption(null), h()) {
              n.Gateway.cmd("fishing.catch", null, function (n) {
                if (n && !1 !== n.ok) {
                  Un(e, n.missed ? null : n.itemId);
                }
                else {
                  Un(e, null);
                }
              });
            }
            else {
              var t = n.Fishing.rollCatch();
              if (t) {
                n.Inventory.add(t, 1);
                if (n.Quest.stage === n.Quest.LINH_NGU_STAGE) {
                  n.Quest.recordLinhNguCatch(t);
                  dn();
                }
              }
              Un(e, t);
            }
        })(e);
        an(e);
        l(e, o);
        return void n.HUD.update(e);
      }
      In();
    }
    if (i.fishingAuto && (n.Input.hasManualMove && n.Input.hasManualMove() || n.Input.tap) && In(), n.Input.consumeMenu() && (n.HopUI && n.HopUI.open ? n.HopUI.back() : n.BiTichLuc.open ? n.BiTichLuc.back() : n.GachaUI.open ? n.GachaUI.back() : n.SkillBook.open ? n.SkillBook.back() : n.HUD.bagOpen ? n.HUD.closeBag() : n.HUD.dialogOpen ? n.HUD.closeDialog() : i.menuOpen ? Yn() : Rn()), n.Input.consumeBag() && (i.menuOpen || n.HUD.dialogOpen || n.HUD.toggleBag("trang-bi")), n.Input.consumeSkillBook() && (i.menuOpen || n.HUD.dialogOpen || n.SkillBook.toggle()), n.Input.consumeAutoToggle() && P(), n.Input.consumeFlyToggle() && function () {
      var e = i.player;
      if (!(!e || n.HUD.dialogOpen || i.menuOpen || n.HUD.bagOpen || n.SkillBook.open)) {
        if (e.flying) {
          var t = e.x;
          var o = e.y;
          return n.Player.landFly(e, i.map) ? (Ga.sample(Ga.KIND.land, Math.round(Math.hypot(e.x - t, e.y - o)), 1), n.Audio.play("land", { rate: .92 + .08 * Math.random() }), void E()) : (Ga.sample(Ga.KIND.land, 0, 0), Ga.count("hạ phi hành: không có chỗ đáp"), n.Audio.play("deny"), void n.VFX.spawnText(e.x, e.y - 52, "Bên dưới không có chỗ đặt chân", "#c9a45c"));
        }
        var h = n.Player.flyMount();
        if (!h) {
          n.Audio.play("deny");
          return void n.VFX.spawnText(e.x, e.y - 52, "Chưa có pháp khí phi hành", "#c9a45c");
        }
        if (!n.Player.canFly(e)) {
          var c = n.realmById(h.fly.realmMin || a.FLY.REALM_MIN);
          n.Audio.play("deny");
          return void n.VFX.spawnText(e.x, e.y - 52, "Cần " + c.name, "#c9a45c");
        }
        if (n.Player.inNoFlyZone && n.Player.inNoFlyZone(e, i.map)) {
          n.Audio.play("deny");
          n.VFX.spawnText(e.x, e.y - 52, "Vùng cấm bay", "#c9a45c");
        }
        else {
          if (n.HacThi && i.map && i.map.data && n.HacThi.camBay(n, i.map.data.id)) {
            n.Audio.play("deny");
            n.VFX.spawnText(e.x, e.y - 52, "Mang hàng — không bay được", "#c9a45c");
          }
          else {
            n.Player.mountFly(e);
            n.Audio.play("fly", { rate: .96 + .08 * Math.random() });
            E();
            if (n.Quest.markFirstFlight && n.Quest.markFirstFlight()) {
              n.Quest.save();
              dn(!1);
              n.VFX.spawnText(e.x, e.y - 64, "✓ Đã biết Phi Hành", "#bff3d8");
            }
          }
        }
      }
    }(), n.Input.consumeDuel() && (h() ? n.Gateway.duelPress() : n.HUD.setCaption("Tỉ thí cần nối được máy chủ và có đạo hữu bên cạnh.")), n.Input.consumeDoSat() && (h() ? n.Gateway.doSatPress() : n.HUD.setCaption("Đồ sát cần nối được máy chủ.")), i.menuOpen || n.HUD.bagOpen || n.SkillBook.open || n.GachaUI.open || n.BiTichLuc.open || n.HopUI && n.HopUI.open) {
      if (!n.HUD.bagOpen || i.menuOpen || n.GachaUI.open || n.BiTichLuc.open || n.HopUI && n.HopUI.open || !i.autoOn) {
        l(e, o);
      }
      else {
        n.Input.reset();
        n.Targeting.refresh(o, r, i.enemies);
        if (!(n.HUD.dialogOpen || "sit" === o.state)) {
          Y(e, o, r);
        }
        s(e, o, r);
      }
    }
    else {
      n.Targeting.refresh(o, r, i.enemies);
      (function () {
        var n = t.$("#btn-attack");
        if (n) {
          var a = B();
          var e = !!a;
          if (n._hoi !== e || e && n._ten !== a.name) {
            n._hoi = e;
            n._ten = e ? a.name : null;
            n.classList.toggle("hoi", e);
            var i = !(!e || !a.obj || "tho_ren" !== a.obj.id);
            n.classList.toggle("forge-action", i);
            var o = n.querySelector(".skill-name");
            if (o) {
              o.textContent = i ? "Mở Lò Rèn" : e ? "Tương Tác" : "Công Thường";
            }
            n.setAttribute("aria-label", i ? "Mở Lò Rèn" : e ? "Tương tác với " + a.name : "Đánh thường");
          }
        }
      })();
      (function () {
        var a = t.$("#btn-dosat");
        if (a) {
          var e = n.Gateway;
          if (h()) {
            a.classList.remove("hidden");
            var i = e.doSatActive();
            if (a.classList.toggle("active", i), i) {
              a.classList.remove("locked");
              var o = Math.ceil(e.doSatRemain());
              var c = a.querySelector && a.querySelector(".skill-name");
              if (c) {
                c.textContent = o + "s";
              }
              return void a.setAttribute("aria-label", "Đang đồ sát — còn " + o + " giây");
            }
            var r = a.querySelector && a.querySelector(".skill-name");
            if (r && "Đồ Sát" !== r.textContent) {
              r.textContent = "Đồ Sát";
            }
            var u = e.doSatCheck();
            a.classList.toggle("locked", !u.ok);
            a.setAttribute("aria-label", u.ok ? "Đồ sát — bấm giữ, mất " + u.cost + " Đạo Hạnh" : u.why || "Chưa đồ sát được");
          }
          else {
            a.classList.add("hidden");
          }
        }
      })();
      var u = n.Input.consumeTap();
      if (u && n.HUD.mateMenuOpen && n.HUD.closeMateMenu(), u && !n.HUD.dialogOpen && n.PhongChoUI && n.PhongChoUI.cham(r, u.x + n.Camera.renderX(), u.y + n.Camera.renderY()) && (u = null), u && !n.HUD.dialogOpen) {
        var g = u.x + n.Camera.renderX();
        var p = u.y + n.Camera.renderY();
        var d = n.Targeting.npcAt(r, g, p);
        var y = !(!d || !d.tapPriority);
        var m = !y && h() && n.Gateway.remoteAt ? n.Gateway.remoteAt(g, p) : null;
        var f = !!m && n.Targeting.khoaVao(m);
        var T = m || y ? null : n.Targeting.pickAt(g, p);
        var b = m || T ? null : d;
        if (f) {
          q(o, m.x - o.x, m.y - o.y);
          en({ name: m.name || "Đạo hữu" });
        }
        else if (m) {
          L(m, o);
        }
        else if (T) {
          en(T);
          if (B()) {
            tn(o);
          }
        }
        else if (b) {
          !function (e, t) {
            var o = n.Pathfinder.route(i.map, e.x, e.y, t.x, t.y, a.PLAYER.HITBOX_W / 2, a.PLAYER.HITBOX_H);
            if (o.length) {
              n.Player.stand(e);
              e.setPath(o);
              i.approach = { obj: t, until: n.Game.time + a.TARGET.APPROACH_TIME };
              n.VFX.spawnRipple(t.x, t.y - a.TILE / 2, "#f7c822");
            }
            else {
              n.VFX.spawnText(e.x, e.y - 52, "Không tới được " + (t.name || "chỗ ấy"), "#c9a45c");
            }
          }(o, b);
        }
        else if (g >= 0 && p >= 0 && g < r.pxWidth && p < r.pxHeight) {
          var _ = n.Pathfinder.route(r, o.x, o.y, g, p, a.PLAYER.HITBOX_W / 2, a.PLAYER.HITBOX_H);
          if (_.length) {
            i.tuChiDuong = !0;
            n.Player.stand(o);
            o.setPath(_);
            n.VFX.spawnRipple(_[_.length - 1].x, _[_.length - 1].y, "#e7e2d0");
          }
        }
      }
      if (n.Input.consumeAttack())
        if (n.HUD.dialogOpen) {
          n.HUD.closeDialog();
        }
        else if (B()) {
          tn(o);
        }
        else {
          n.Player.stand(o);
          var D = n.Targeting.currentEnemy() || n.Targeting.doiThuNguoi();
          if (D) {
            q(o, D.x - o.x, D.y - o.y);
          }
          n.Player.attack(o, D && !D.dead && C(o, D) ? D : null);
        }
      var H = n.Input.consumeSlot();
      if (H && !n.HUD.dialogOpen ? A(o, H - 1) : n.HUD.dialogOpen || function (a) {
        var e = i.manualCast;
        if (e)
          if (n.Game.time > e.until) {
            i.manualCast = null;
          }
          else {
            var t = n.Skills.hotbarIndex(e.id);
            var o = n.Skills.hotbarDef(t);
            if (o) {
              if (!(U(a, o))) {
                i.manualCast = null;
                A(a, t);
              }
            }
            else {
              i.manualCast = null;
            }
          }
      }(o), n.Input.consumeSpell() && !n.HUD.dialogOpen) {
        var w = I(o);
        if (w) {
          A(o, n.Skills.hotbarIndex(w.id));
        }
      }
      if (n.Input.consumeMeditate() && (V() && (i.tmcNguoiLai = !0), "sit" === o.state ? n.Player.stand(o) : o.canMeditate ? n.Player.sit(o, !1) ? (E(), n.Audio.play("meditate"), n.VFX.spawnText(o.x, o.y - 52, "Đả tọa", "#bff3d8")) : o.meditatePvpLock > 0 && n.VFX.spawnText(o.x, o.y - 52, "Vừa bị người chơi đánh · chờ " + Math.ceil(o.meditatePvpLock) + "s", "#efb15c") : n.VFX.spawnText(o.x, o.y - 52, "Chưa dẫn khí nhập thể", "#c9a45c")), n.Input.consumeCycleTarget() && !n.HUD.dialogOpen) {
        var M = n.Targeting.cycle();
        if (M) {
          i.approach = null;
          en(M);
        }
        else {
          n.VFX.spawnText(o.x, o.y - 52, "Quanh đây không có gì", "#c9a45c");
        }
      }
      if (n.Input.consumeInteract()) {
        if (n.HUD.dialogOpen) {
          n.HUD.closeDialog();
        }
        else {
          tn(o);
        }
      }
      (function (a) {
        var e = performance.now();
        if (!(V() && !a.downed)) {
          i.tmcVaoLuc = 0;
          i.tmcNguoiLai = !1;
          return void (i.tmcTuBat && (i.tmcTuBat = !1, i.autoOn && P("Tự Động: TẮT")));
        }
        if (!(i.tmcVaoLuc)) {
          i.tmcVaoLuc = e;
        }
        var t = n.Input.lastActAt || 0;
        if (i.tmcNguoiLai) {
          if (i.tmcTuBat) {
            i.tmcTuBat = !1;
            if (i.autoOn) {
              P("Trả lái");
            }
          }
        }
        else {
          if ("sit" === a.state && (i.autoOn || e - Math.max(t, i.tmcVaoLuc) >= N)) {
            n.Player.stand(a);
          }
          if (i.tmcTuBat) {
            if ((t > i.tmcTuBatLuc || n.Input.hasManualMove())) {
              i.tmcTuBat = !1;
              if (i.autoOn) {
                P("Trả lái");
              }
            }
          }
          else {
            if (!(i.autoOn || n.HUD.dialogOpen || e - Math.max(t, i.tmcVaoLuc) < N)) {
              i.tmcTuBat = !0;
              i.tmcTuBatLuc = e;
              P("Tự chiến");
            }
          }
        }
      })(o);
      if (i.autoOn && !n.HUD.dialogOpen && "sit" !== o.state) {
        Y(e, o, r);
      }
      s(e, o, r);
    }
  };
  var b = 0;
  function _(a) {
    for (var e = 0; e < a.length; e++) {
      var t = a[e];
      if (t.herb && t.hidden && !t.off && t.regrowAt && n.Game.time >= t.regrowAt) {
        t.hidden = !1;
      }
    }
  }
  function D(a, e, t, o) {
    if (h()) {
      return !1;
    }
    var c = !!(o && a && a.linhAnBy === o && a.linhAnUntil > Date.now());
    var r = c ? a.linhAnBonus || .15 : 0;
    if (c) {
      e = Math.round(e * (1 + r));
    }
    H(a, e, o);
    var u = n.Enemy.hit(a, e, n.Game.time);
    if ((c || u)) {
      a.linhAnBy = null;
      a.linhAnBonus = 0;
      a.linhAnUntil = 0;
    }
    if (c && n.VFX && n.VFX.spawnText) {
      n.VFX.spawnText(a.x, a.y - 42, "Linh Ấn · +" + Math.round(100 * r) + "%", "#d9a7ff");
    }
    if (u) {
      i.showKillFx(a);
    }
    if (u && t) {
      t(a);
    }
    return u;
  }
  // Nghịch Tiên: đồng minh triệu hồi (trieu_hoi.js) đánh quái — quái chết vẫn rơi đồ, cộng Đạo Hạnh cho người chơi
  i.ntDanhQuai = function (a, t) {
    return !(!a || a.dead || !i.player) && D(a, t, function (n) {
      k(n, i.player);
    }, i.player);
  };
  function H(a, e, t) {
    var i = !!(a && a.def && a.def.isBoss);
    var o = !i && t && t.cfg && n.Audio.weaponImpactSfx ? n.Audio.weaponImpactSfx(t.cfg.weapon) : null;
    var h = i && n.Audio.bossHitSfx ? n.Audio.bossHitSfx(a.type) : null;
    var c = i ? h || "boss_hit" : o || (e >= 25 ? "hit_big" : "hit");
    n.Audio.play(c, { rate: .9 + .2 * Math.random() });
    n.Enemy.flinch(a, n.Game.time, t && t.x, t && t.y);
    n.VFX.spawnDamage(a.x, a.y - 20, e, "deal", !(!a.def || !a.def.isBoss));
    var r = t && t.cfg && "huyet_kiem" === t.cfg.weapon;
    var u = t && t.cfg && "bang_linh_kiem" === t.cfg.weapon;
    var l = t && t.cfg && "luc_tinh_kiem" === t.cfg.weapon;
    var s = t && t.cfg && "cung_linh" === t.cfg.weapon;
    var g = t && t.cfg && "luc_doc_cham" === t.cfg.weapon;
    var p = t && t.cfg && "hoa_kim_thuong" === t.cfg.weapon;
    var d = t && t.cfg && "hoang_loi_thuong" === t.cfg.weapon;
    var y = t && t.cfg && "huyet_ma_phu" === t.cfg.weapon;
    var m = t && t.cfg && "bich_nguc_ta_dao" === t.cfg.weapon;
    var f = t && t.cfg && "truc_con" === t.cfg.weapon;
    var T = t && t.cfg && "thiet_cot_nha_no" === t.cfg.weapon;
    var v = t && t.cfg && "quat_phong" === t.cfg.weapon;
    var x = t && t.cfg && "truc_kiem" === t.cfg.weapon;
    var b = t && t.cfg && "sao_ngoc_luu" === t.cfg.weapon;
    var _ = t && t.cfg && "truc_tieu" === t.cfg.weapon;
    var D = t && t.cfg && "xich_viem_song_kich" === t.cfg.weapon;
    var H = t && t.cfg && n.ITEMS && n.ITEMS[t.cfg.weapon] && n.ITEMS[t.cfg.weapon].roi;
    if (m && n.VFX.spawnBichNgucTaDao) {
      n.VFX.spawnBichNgucTaDao(a.x, a.y);
    }
    else {
      if (l && n.VFX.spawnLucTinhKiemImpact) {
        n.VFX.spawnLucTinhKiemImpact(a.x, a.y - 10, t ? a.x - t.x : 0, t ? a.y - t.y : -1);
      }
      else {
        if (p && n.VFX.spawnHoaKimThuongImpact) {
          n.VFX.spawnHoaKimThuongImpact(a.x, a.y - 10, t ? a.x - t.x : 0, t ? a.y - t.y : -1);
        }
        else {
          if (d && n.HoangLoiFX) {
            n.HoangLoiFX.spawnImpact(a.x, a.y - 10, t ? a.x - t.x : 0, t ? a.y - t.y : -1);
          }
          else {
            if (y && n.HuyetMaPhuFX) {
              n.HuyetMaPhuFX.spawnImpact(a.x, a.y - 10, t ? a.x - t.x : 0, t ? a.y - t.y : -1);
            }
            else {
              if (g && n.VFX.spawnLucDocChamImpact) {
                n.VFX.spawnLucDocChamImpact(a.x, a.y - 10, t ? a.x - t.x : 0, t ? a.y - t.y : -1);
              }
              else {
                if (s && n.VFX.spawnLinhCungImpact) {
                  n.VFX.spawnLinhCungImpact(a.x, a.y - 10, t ? a.x - t.x : 0, t ? a.y - t.y : -1);
                }
                else {
                  if (u && n.VFX.spawnBangLinhKiemImpact) {
                    n.VFX.spawnBangLinhKiemImpact(a.x, a.y - 10, t ? a.x - t.x : 0, t ? a.y - t.y : -1);
                  }
                  else {
                    if (T && n.VFX.spawnNhaNoImpact) {
                      n.VFX.spawnNhaNoImpact(a.x, a.y - 10, t ? a.x - t.x : 0, t ? a.y - t.y : -1);
                    }
                    else {
                      if (v && n.VFX.spawnFanAttackImpact) {
                        n.VFX.spawnFanAttackImpact(a.x, a.y - 10, t ? a.x - t.x : 0, t ? a.y - t.y : -1);
                      }
                      else {
                        if (x && n.VFX.spawnTrucKiemImpact) {
                          n.VFX.spawnTrucKiemImpact(a.x, a.y - 10, t ? a.x - t.x : 0, t ? a.y - t.y : -1);
                        }
                        else {
                          if (b && n.VFX.spawnSaoNgocLuuShot) {
                            n.VFX.spawnSaoNgocLuuShot(t, a.x, a.y - 10, t ? a.x - t.x : 0, t ? a.y - t.y : -1);
                          }
                          else {
                            if (_ && n.VFX.spawnTrucTieuShot) {
                              n.VFX.spawnTrucTieuShot(t, a.x, a.y - 10, t ? a.x - t.x : 0, t ? a.y - t.y : -1);
                            }
                            else {
                              if (H && n.VFX.spawnLoiTienImpact) {
                                n.VFX.spawnLoiTienImpact(a.x, a.y - 10, t ? a.x - t.x : 0, t ? a.y - t.y : -1, t.cfg.weapon);
                              }
                              else {
                                if (D && n.VFX.spawnSongKichImpact) {
                                  n.VFX.spawnSongKichImpact(a.x, a.y - 10, t ? a.x - t.x : 0, t ? a.y - t.y : -1);
                                }
                                else {
                                  if (r && n.VFX.spawnHuyetKiem) {
                                    n.VFX.spawnHuyetKiem(a.x, a.y - 8);
                                    if (n.VFX.spawnHuyetKiemImpact) {
                                      n.VFX.spawnHuyetKiemImpact(a.x, a.y - 8, t ? a.x - t.x : 0, t ? a.y - t.y : -1);
                                    }
                                  }
                                  else {
                                    if (f && n.VFX.spawnTrucConImpact) {
                                      n.VFX.spawnTrucConImpact(a.x, a.y - 10, t ? a.x - t.x : 0, t ? a.y - t.y : -1);
                                    }
                                    else {
                                      n.VFX.spawnHitSpark(a.x, a.y - 10, t ? a.x - t.x : 0, t ? a.y - t.y : -1);
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  function k(a, e) {
    if (!h()) {
      n.Quest.addKill(a.def);
      if (!(!(n.LuyenQuy && a.def && a.def.human) || n.ChinhDao && n.ChinhDao.laTaDo(a.def))) {
        n.LuyenQuy.themNghiep("oan_hon" === a.def.hon ? "thuong_doi" : "pham_nhan", n);
      }
      var t = n.Loot.rollKill(a, n);
      if (t.length) {
        (function (a, e, t) {
          for (var o = n.Loot, h = [], c = {}, r = 0; r < e.length; r++) {
            var u = e[r];
            if (u)
              if ("linh_thach" === u && c[u]) {
                c[u].n += 1;
              }
              else {
                var l = { item: u, n: 1 };
                if ("linh_thach" === u) {
                  c[u] = l;
                }
                h.push(l);
              }
          }
          for (var s = 0; s < h.length; s++) {
            l = h[s];
            var g = o.scatter(s, h.length);
            var p = !!(a && a.def && a.def.isBoss) || !1;
            if (0 === s && n.Audio && n.Audio.atPoint) {
              n.Audio.atPoint(p ? "rare_drop" : "drop", a.x, a.y);
            }
            var d = p && a && a.def ? String(a.def.name || a.type || "Boss").split("·")[0].trim() : null;
            i.drops.push({ kind: "item", itemId: l.item, n: l.n, lootId: null, owner: t || null, boss: p, bossName: d, age: 0, x: a.x, y: a.y - 26, vx: 2.4 * g.dx, vy: -70, gy: a.y + g.dy, state: "fall", t: 0, asked: !1, sortY: a.y });
          }
        })(a, t, pa());
        if (t.indexOf(n.Quest.MANH_HA) >= 0) {
          n.VFX.spawnRing(a.x, a.y - 10, "#f0d27a", 24, .55);
        }
        if (t.indexOf("huyen_thiet_khoang") >= 0) {
          n.HUD.setCaption("Yêu thú đã bị hạ · Linh Dược Rương đã mở khoá");
          T();
        }
      }
      var o = n.Player.expKill(n.Progress.realmId, a.def);
      n.Player.addExp(e, o, !0);
      n.VFX.spawnText(a.x, a.y - 22, n.Player.expText(n.Progress.realmId, a.def, o), n.Player.expMau(n.Progress.realmId, a.def));
      n.VFX.spawnRing(a.x, a.y - 8, "#cfeba8", 20, .45);
      dn();
    }
  }
  function w(n) {
    var e = a.PLAYER.ATTACK_ORIGIN;
    var t = 1 === n.dir ? -1 : 2 === n.dir ? 1 : 0;
    var i = 0 === n.dir ? 1 : 3 === n.dir ? -1 : 0;
    return { x: n.x + t * e, y: n.y + i * e };
  }
  function C(a, e) {
    var t = w(a);
    var i = e.x - t.x;
    var o = e.y - t.y;
    return Math.sqrt(i * i + o * o) <= n.Player.reach(a) + (e.def && e.def.bodyRadius || 0);
  }
  function L(e, t, i) {
    i = i || n.Input.tapClient;
    var o = n.Gateway;
    var h = e.name || "Đạo hữu";
    var c = o.distTo(e, t);
    var r = a.DUEL && a.DUEL.INVITE_RANGE || 160;
    var u = [];
    if (o.duel && o.duel.id === e.id) {
      u.push({ label: "Xin thua", note: "Kết trận ngay, nhận phần thua", onChoose: function () {
          o.duelSend("yield");
        } });
    }
    else {
      if (o.invite && o.invite.id === e.id) {
        u.push({ label: "Nhận lời tỉ thí", note: "Thua thì trọng thương", onChoose: function () {
            o.duelAnswer(!0);
          } });
        u.push({ label: "Từ chối", onChoose: function () {
            o.duelAnswer(!1);
          } });
      }
      else {
        if (o.duel) {
          u.push({ label: "Mời tỉ thí", disabled: !0, note: "Đang dở một trận khác" });
        }
        else {
          u.push({ label: "Mời tỉ thí", disabled: c > r, note: c > r ? "Đứng gần lại rồi hãy mời" : "Thua thì trọng thương", onChoose: function () {
              o.duelSend("challenge", e.id);
            } });
        }
      }
    }
    var l = o.party;
    var s = o.partyMember && o.partyMember(e.id);
    var g = a.PARTY && a.PARTY.INVITE_RANGE || 180;
    var p = l && l.members ? l.members.length : 0;
    var d = "";
    if (s ? d = "Đã ở cùng tổ đội" : l && l.activeRunId ? d = "Bí Cảnh đang mở" : p >= 6 ? d = "Tổ đội đã đủ 6/6" : c > g && (d = "Đứng gần lại rồi hãy mời"), u.push({ label: s ? "Đồng đội" : "Mời vào tổ đội", disabled: !!d, note: d || "Cùng tiến vào Bí Cảnh", onChoose: function () {
        o.partyInvite(e.id);
      } }), n.SectUI) {
      var y = n.SectUI.viSaoKhongMoi(e);
      u.push({ label: "Mời Vào Tông Môn", disabled: !!y, note: y || "Nhập môn " + (o.sect ? o.sect.ten : "tông môn"), onChoose: function () {
          n.SectUI.moi(e.id);
        } });
    }
    u.push({ label: "Nhắn riêng", note: "Chỉ mình người ấy nghe", onChoose: function () {
        n.Chat.whisperTo(h);
      } });
    var m = n.InspectUI ? n.InspectUI.cost() : 5;
    var f = (t.sp || 0) < m;
    if (u.push({ label: "Xem Thông Tin (" + m + " Thần Thức)", disabled: f, note: f ? "Thần Thức không đủ (cần " + m + ")" : "Tốn " + m + " Thần Thức", onChoose: function () {
        if (n.InspectUI) {
          n.InspectUI.request(e.id);
        }
      } }), u.push({ label: "Giao dịch", disabled: !0, note: "Chưa mở" }), o.doSatActive()) {
      u.push({ label: "Đồ Sát", disabled: !0, note: "Đang đồ sát — còn " + Math.ceil(o.doSatRemain()) + " giây" });
    }
    else {
      var T = o.doSatCheck();
      u.push({ label: "Đồ Sát", disabled: !T.ok, note: T.ok ? "Mất " + T.cost + " Đạo Hạnh" : T.why || "Chưa đồ sát được", onChoose: function () {
          !function (a, e, t) {
            n.HUD.openMateMenu("Đồ Sát?", "Mất " + e + " Đạo Hạnh, không hoàn lại", [{ label: "Xác nhận đồ sát", note: "Mang dấu đỏ, ai cũng đánh được mình", onChoose: function () {
                  n.Gateway.doSatPress();
                } }, { label: "Huỷ", onChoose: function () {
                } }], t || n.Input.tapClient);
          }(0, T.cost, i);
        } });
    }
    var v = e.realm && n.realmById(e.realm) ? n.realmById(e.realm).name : "";
    n.HUD.openMateMenu(h, v ? "Cảnh giới: " + v : "", u, i);
  }
  function I(a) {
    for (var e = n.Skills.autoRotation().filter(function (n) {
      return !n.thunder;
    }), t = 0; t < e.length; t++)
      if (n.Skills.ready(a, e[t])) {
        return e[t];
      }
    return e.length ? e[0] : n.Skills.active();
  }
  i.showHitFx = H;
  i.showKillFx = function (a) {
    var e = !!(a && a.def && a.def.isBoss);
    n.Audio.atPoint(e ? "boss_death" : "kill", a.x, a.y, { rate: e ? .94 + .1 * Math.random() : .9 + .2 * Math.random() });
    if (a && a.def && a.def.deathVfx && n.VFX.spawnXichLongDeath) {
      n.VFX.spawnXichLongDeath(a.x, a.y, a.dir, a.def.deathVfx);
    }
  };
  i.requestHit = D;
  i.onPlayerSlash = function (a) {
    if (h()) {
      n.Gateway.attack();
    }
    else {
      for (var e = n.Player.reach(a), t = 1 === a.dir ? -1 : 2 === a.dir ? 1 : 0, o = 0 === a.dir ? 1 : 3 === a.dir ? -1 : 0, c = i.enemies, r = n.Player.meleeDamage ? n.Player.meleeDamage(a) : n.baseAttack(n.Progress.realmId) + n.Inventory.bonus("atkBonus"), u = !!n.Player.singleTargetWeapon(a), l = null, s = 1 / 0, g = !1, p = n.Player.weaponBurn ? n.Player.weaponBurn(a) : null, d = n.Player.weaponWound ? n.Player.weaponWound(a) : null, y = w(a), m = 0; m < c.length; m++) {
        var f = c[m];
        if (!f.dead) {
          var T = f.x - y.x;
          var v = f.y - y.y;
          var x = Math.sqrt(T * T + v * v);
          if (!(x > e + (f.def && f.def.bodyRadius || 0))) {
            T = f.x - a.x;
            v = f.y - a.y;
            if (!((x = Math.sqrt(T * T + v * v)) > 2 && T * t + v * o <= 0)) {
              if (u) {
                if (x < s) {
                  s = x;
                  l = f;
                }
              }
              else {
                H(f);
                D(f, r, function (n) {
                  k(n, a);
                }, a);
                g = !0;
              }
            }
          }
        }
      }
      if (u && l) {
        H(l);
        D(l, r, function (n) {
          k(n, a);
        }, a);
        g = !0;
        var b = n.Player.weaponThunder ? n.Player.weaponThunder(a) : null;
        if (b && !l.dead) {
          D(l, Math.max(1, Math.round(r * b.mult)), function (n) {
            k(n, a);
          }, a);
          if (n.VFX.spawnLoiTienThunder) {
            n.VFX.spawnLoiTienThunder(l.x, l.y - 10, a.cfg && a.cfg.weapon);
          }
        }
      }
      if (g) {
        var _ = n.Player.lifesteal(a, !1);
        if (_ > 0 && n.VFX.spawnLifesteal) {
          n.VFX.spawnLifesteal(a.x, a.y, _);
        }
      }
    }
    function H(e) {
      if (e && n.Skills) {
        if (p) {
          n.Skills.applyEffect(e, p);
        }
        var t = n.Player.weaponPoison ? n.Player.weaponPoison(a) : null;
        if (t) {
          n.Skills.applyEffect(e, t);
        }
        if (d) {
          n.Skills.applyEffect(e, d);
        }
      }
    }
  };
  i.moBangDaoHuu = function (a) {
    var e = n.Targeting.current && n.Targeting.current();
    var t = i.player;
    if (e && "player" === e.kind && e.obj && t) {
      L(e.obj, t, a);
    }
  };
  i.onPlayerThunder = function (e) {
    if (n.Audio.playSkill) {
      n.Audio.playSkill(n.Skills.THUNDER_DEF);
    }
    else {
      n.Audio.play("thunder");
    }
    var t = a.THUNDER;
    var o = e.x;
    var c = e.y;
    var r = e.castTarget || n.Targeting.currentEnemy() || n.Targeting.doiThuNguoi();
    if (e.castTarget = null, r && !r.dead && S(e, r) <= t.RANGE) {
      o = r.x;
      c = r.y;
    }
    else {
      var u = 1 === e.dir ? -1 : 2 === e.dir ? 1 : 0;
      var l = 0 === e.dir ? 1 : 3 === e.dir ? -1 : 0;
      o = e.x + 34 * u;
      c = e.y + 34 * l;
    }
    if (n.VFX.spawnLightning(o, c), n.VFX.spawnFlash(.16, "#cfefff"), n.Camera.shake(5, .26), h()) {
      n.Gateway.skill("thunder", r && !r.dead ? r.id : null);
    }
    else {
      F("thunder", (Math.round(o), Math.round(c)));
      for (var s = i.enemies, g = 0, p = n.Skills.powerDmg(t.COEF), d = 0; d < s.length; d++) {
        var y = s[d];
        if (!y.dead) {
          var m = y.x - o;
          var f = y.y - c;
          if (!(Math.sqrt(m * m + f * f) > t.RADIUS)) {
            g++;
            D(y, p, function (n) {
              k(n, e);
            }, e);
          }
        }
      }
      if (!(g)) {
        n.VFX.spawnText(o, c - 30, "Sét đánh hụt", "#7fb6c9");
      }
    }
  };
  i.sanSangDauTien = I;
  var M = a.PLAYER.SPELL_GAP + .5;
  function U(n, a) {
    return "attack" === n.state || "pose" === n.state || !a.thunder && n.spellCd > 0;
  }
  function A(e, t) {
    var o = t >= 0 ? n.Skills.hotbarDef(t) : null;
    if (o) {
      var h = function (n, a) {
        return a.thunder ? n.thunderCd > 0 ? n.thunderCd : 0 : n.spellCds && n.spellCds[a.id] || 0;
      }(e, o);
      if (h > 0) {
        n.VFX.spawnText(e.x, e.y - 52, o.short + " còn " + Math.ceil(h) + "s", "#7fb6c9");
      }
      else if (U(e, o)) {
        i.manualCast = { id: o.id, until: n.Game.time + M };
      }
      else if (i.manualCast = null, !o.needTarget || function (e, t) {
        var i = t.range + (a.PLAYER && a.PLAYER.CAST_RANGE_SLACK || 0);
        var o = n.Targeting.currentEnemy() || n.Targeting.doiThuNguoi();
        if (o && !o.dead && S(e, o) <= i) {
          return !0;
        }
        if (t.autoFoe) {
          var h = X(e);
          if (h && S(e, h) <= i) {
            return !0;
          }
        }
        return !1;
      }(e, o))
        if (n.Skills.testMode || !n.Skills.dangTreo(e, o)) {
          n.Player.stand(e);
          var c = n.Targeting.currentEnemy() || n.Targeting.doiThuNguoi();
          if (c) {
            q(e, c.x - e.x, c.y - e.y);
          }
          var r = o.thunder ? n.Player.castThunder(e) : n.Player.castSpell(e, o);
          if (!0 === r) {
            n.VFX.spawnText(e.x, e.y - 52, o.name + "!", o.colors.glow);
          }
          else {
            if ("chua_hoc" === r) {
              n.VFX.spawnText(e.x, e.y - 52, "Chưa có " + o.name, "#c9a45c");
            }
            else {
              if ("chua_khai_mo" === r) {
                n.VFX.spawnText(e.x, e.y - 52, "Chưa khai mở Linh Lực", "#7fb6c9");
              }
              else {
                if ("thieu_linh_luc" === r) {
                  n.VFX.spawnText(e.x, e.y - 52, "Linh Lực không đủ", "#7fb6c9");
                }
                else {
                  if ("thieu_than_thuc" === r) {
                    n.VFX.spawnText(e.x, e.y - 52, "Thần Thức không đủ", "#b58add");
                  }
                  else {
                    if ("dang_bay" === r) {
                      n.VFX.spawnText(e.x, e.y - 52, "Hạ xuống rồi hãy hóa thân", "#c9a45c");
                    }
                  }
                }
              }
            }
          }
        }
        else {
          n.VFX.spawnText(e.x, e.y - 52, o.short + " chưa đánh xong", "#c9a45c");
        }
      else {
        n.VFX.spawnText(e.x, e.y - 52, "Cần mục tiêu trong tầm", "#c9a45c");
      }
    }
    else {
      n.VFX.spawnText(e.x, e.y - 52, "Ô này chưa có chiêu", "#c9a45c");
    }
  }
  function F(a) {
    if (n.Gateway && n.Gateway.act) {
      n.Gateway.act(a);
    }
  }
  function S(n, a) {
    var e = n.x - a.x;
    var t = n.y - a.y;
    return Math.sqrt(e * e + t * t);
  }
  function P(a) {
    if (n.Gateway && n.Gateway.vanTieu && !i.autoOn) {
      n.VFX.spawnText(i.player.x, i.player.y - 52, "Đang áp tải, không dùng Tự Động", "#ffb36b");
    }
    else {
      if (void 0 === a) {
        i.tmcTuBat = !1;
      }
      i.autoOn = !i.autoOn;
      i.autoTargetId = null;
      n.Audio.play("toggle", { rate: i.autoOn ? 1.12 : .88 });
      var e = t.$("#btn-auto");
      if (e) {
        e.classList.toggle("active", i.autoOn);
      }
      var o = t.$("#btn-auto-touch");
      if (o) {
        o.classList.toggle("active", i.autoOn);
        o.setAttribute("aria-pressed", i.autoOn ? "true" : "false");
      }
      n.VFX.spawnText(i.player.x, i.player.y - 52, a || (i.autoOn ? "Tự Động: BẬT" : "Tự Động: TẮT"), "#bff3d8");
    }
  }
  i.onPlayerSpell = function (e, t) {
    var i;
    var o = e.castTarget || n.Targeting.currentEnemy() || n.Targeting.doiThuNguoi();
    if (e.castTarget = null, n.Audio.playSkill && n.Audio.playSkill(t), t.bienHinh) {
      n.Skills.cast(e, t, { x: e.x, y: e.y });
      return h() ? void n.Gateway.skill(t.id, null) : (n.Player.giveForm(e, t), void F("spell", (Math.round(e.x), Math.round(e.y), e.dir, t.id, Math.round(e.x), Math.round(e.y))));
    }
    var c = t.range + (a.PLAYER && a.PLAYER.CAST_RANGE_SLACK || 0);
    if (t.autoFoe && (!o || o.dead || S(e, o) > c)) {
      var r = X(e);
      if (r && S(e, r) <= c) {
        o = r;
      }
    }
    if (o && !o.dead && S(e, o) <= c) {
      i = { x: o.x, y: o.y, target: o };
    }
    else {
      var u = 1 === e.dir ? -1 : 2 === e.dir ? 1 : 0;
      var l = 0 === e.dir ? 1 : 3 === e.dir ? -1 : 0;
      i = { x: e.x + u * t.range, y: e.y + l * t.range };
    }
    n.Skills.cast(e, t, i);
    if (h()) {
      n.Gateway.skill(t.id, i.target ? i.target.id : null);
    }
    else {
      F("spell", (Math.round(e.x), Math.round(e.y), e.dir, t.id, Math.round(i.x), Math.round(i.y), i.target && i.target.id));
    }
  };
  var N = 3e3;
  function V() {
    var a = n.Gateway;
    if (!h() || !a.tmcDich || !a.tmcLaDich) {
      return !1;
    }
    for (var e in a.tmcDich)
      if (a.tmcLaDich(e)) {
        return !0;
      }
    return !1;
  }
  function B() {
    return n.Targeting.mucTieuTuongTac();
  }
  function E() {
    var n = t.$("#btn-fly");
    if (n) {
      n.classList.toggle("active", !(!i.player || !i.player.flying));
    }
  }
  function X(n) {
    for (var a = null, e = 1 / 0, o = i.enemies, h = 0; h < o.length; h++) {
      var c = o[h];
      if (!(c.dead || c.def && (c.def.human || c.def.tieuXa))) {
        var r = t.dist(n.x, n.y, c.x, c.y);
        if (r < e) {
          e = r;
          a = c;
        }
      }
    }
    return a;
  }
  function G(n) {
    var a = n && n.def;
    return !(!a || !a.isBoss && !/Yêu Thú Cấp/.test(a.name || ""));
  }
  function R(n, a) {
    for (var e = null, o = 1 / 0, h = i.enemies, c = 0; c < h.length; c++) {
      var r = h[c];
      if (!(r.dead || r.def && (r.def.human || r.def.tieuXa)) && a(r)) {
        var u = t.dist(n.x, n.y, r.x, r.y);
        if (u < o) {
          o = u;
          e = r;
        }
      }
    }
    return e;
  }
  var K = 6;
  var O = 0;
  function q(n, a, e) {
    if (Math.abs(a) > Math.abs(e)) {
      n.dir = a > 0 ? 2 : 1;
    }
    else {
      if (0 !== e) {
        n.dir = e > 0 ? 0 : 3;
      }
    }
  }
  function Q(a, e, t) {
    if ("attack" === a.state || "pose" === a.state) {
      return !1;
    }
    var o = e.x - a.x;
    var h = e.y - a.y;
    var c = Math.sqrt(o * o + h * h);
    var r = n.Skills.pickAuto(a, c, i.autoSkillIdx);
    if (!r) {
      return !1;
    }
    if (!(t)) {
      a.stop();
    }
    q(a, o, h);
    a.castTarget = e;
    var u = r.def;
    return !0 === (u.thunder ? n.Player.castThunder(a) : n.Player.castSpell(a, u)) ? (i.autoSkillIdx = r.idx + 1, n.VFX.spawnText(a.x, a.y - 52, u.name + "!", u.colors.glow), !0) : (a.castTarget = null, !1);
  }
  function Y(e, o, c) {
    if (!i.manualCast && !(i.autoNghiDen && n.Game.time < i.autoNghiDen || n.HuThienUI && n.HuThienUI.giuYen && n.HuThienUI.giuYen(o) || n.YenLangUI && n.YenLangUI.giuYen && n.YenLangUI.giuYen(o))) {
      if (i.tuChiDuong && !o.path.length) {
        i.tuChiDuong = !1;
      }
      var r = n.Input.hasManualMove() || i.tuChiDuong || !!i.approach;
      var u = r ? n.Targeting.currentEnemy() : null;
      if (u && u.dead) {
        u = null;
      }
      var l = function () {
        var a = n.Gateway;
        if (!h() || !a.duel || !a.remotes) {
          return null;
        }
        var e = a.remotes[a.duel.id];
        return !e || e.downed ? null : e;
      }() || function (e) {
        var i = n.Targeting.doiThuNguoi();
        return !i || i.downed ? null : t.dist(e.x, e.y, i.x, i.y) <= a.TARGET.RANGE ? i : null;
      }(o) || u || function (e) {
        if (V()) {
          var o = function (a) {
            var e = n.Gateway;
            if (!h() || !e.remotes || !e.tmcLaDich) {
              return null;
            }
            var i = null;
            var o = 1 / 0;
            for (var c in e.remotes) {
              var r = e.remotes[c];
              if (r && !r.downed && e.tmcLaDich(r.id)) {
                var u = t.dist(a.x, a.y, r.x, r.y);
                if (u < o) {
                  o = u;
                  i = r;
                }
              }
            }
            return i;
          }(e);
          if (o) {
            return o;
          }
        }
        var c = n.Hotbar && n.Hotbar.uuTien ? n.Hotbar.uuTien() : "auto";
        var r = null;
        if ("boss" === c) {
          r = R(e, G);
        }
        else {
          if ("quai" === c) {
            r = R(e, function (n) {
              return !G(n);
            });
          }
          else {
            if ("nguoi" === c) {
              r = function (e) {
                var i = n.Gateway;
                if (!h() || !i.remotes) {
                  return null;
                }
                var o = null;
                var c = a.TARGET.RANGE;
                for (var r in i.remotes) {
                  var u = i.remotes[r];
                  if (u && !u.downed && n.Targeting.thuDich(u)) {
                    var l = t.dist(e.x, e.y, u.x, u.y);
                    if (l <= c) {
                      c = l;
                      o = u;
                    }
                  }
                }
                return o;
              }(e);
            }
            else {
              if ("mau" === c) {
                r = function (n) {
                  for (var e = null, o = 1 / 0, h = 1 / 0, c = i.enemies, r = 0; r < c.length; r++) {
                    var u = c[r];
                    if (!(u.dead || u.def && (u.def.human || u.def.tieuXa))) {
                      var l = t.dist(n.x, n.y, u.x, u.y);
                      if (!(l > a.TARGET.RANGE)) {
                        var s = u.hpMax > 0 ? u.hp / u.hpMax : 1;
                        if ((s < o || s === o && l < h)) {
                          o = s;
                          h = l;
                          e = u;
                        }
                      }
                    }
                  }
                  return e;
                }(e);
              }
            }
          }
        }
        return r || X(e);
      }(o);
      if (l) {
        if (function (a) {
          var e;
          var t;
          if (!(!n.Hotbar || !n.Hotbar.comboChoMucTieu || n.Game.time < O)) {
            if (n.Hotbar.comboChoMucTieu((t = (e = a) && e.def) ? t.human ? "nguoi" : G(e) ? "boss" : "quai" : "nguoi")) {
              O = n.Game.time + K;
            }
          }
        }(l), r) {
          var s = o.path.slice();
          if (!Q(o, l, !0) && "attack" !== o.state && "pose" !== o.state && C(o, l)) {
            q(o, l.x - o.x, l.y - o.y);
            n.Player.attack(o, l);
          }
          return void (!s.length || o.path.length || n.Input.hasManualMove() || Array.prototype.push.apply(o.path, s));
        }
        if (!Q(o, l)) {
          var g = l.x - o.x;
          var p = l.y - o.y;
          if (Math.sqrt(g * g + p * p), C(o, l)) {
            o.stop();
            q(o, g, p);
            n.Player.attack(o, l);
          }
          else if (i.autoPathTimer -= e, i.autoTargetId !== l.id || i.autoPathTimer <= 0 || !o.path.length) {
            i.autoTargetId = l.id;
            i.autoPathTimer = .4;
            var d = n.Pathfinder.route(c, o.x, o.y, l.x, l.y, a.PLAYER.HITBOX_W / 2, a.PLAYER.HITBOX_H);
            if (d.length) {
              o.setPath(d);
            }
          }
        }
      }
    }
  }
  var $ = { 2: 12, 1: 8, 0: 5 };
  var W = [];
  var j = [];
  var z = !1;
  var Z = -1;
  var J = { than_thu_xich_long: 1, linh_ho_tran_son: 1, song_duc_ma_bao: 1 };
  function nn() {
    return !!(n.DaiHoiUI && n.DaiHoiUI.dangXem && n.DaiHoiUI.dangXem());
  }
  function an(a) {
    var e = i.player;
    n.Camera.update(n.Player.viewX(e), n.Player.viewY(e) - 12, n.Renderer.w, n.Renderer.h, i.map.pxWidth, i.map.pxHeight, a);
  }
  function en(a) {
    if (a && i.player) {
      n.VFX.spawnText(i.player.x, i.player.y - 52, "» " + a.name, "#f7c822");
    }
  }
  function tn(e) {
    var t;
    var o;
    var h = n.Targeting.current();
    if (h)
      if (h.dist > h.r) {
        !function (e, t) {
          var o = n.Pathfinder.route(i.map, e.x, e.y, t.x, t.y, a.PLAYER.HITBOX_W / 2, a.PLAYER.HITBOX_H);
          if (o.length) {
            n.Player.stand(e);
            e.setPath(o);
            i.approach = { key: t.key, until: n.Game.time + a.TARGET.APPROACH_TIME };
            n.VFX.spawnRipple(t.x, t.y, "#f7c822");
          }
          else {
            n.VFX.spawnText(e.x, e.y - 52, "Không tới được " + t.name, "#c9a45c");
          }
        }(e, h);
      }
      else {
        if (i.approach = null, e.stop(), "enemy" !== h.kind && "duel" !== h.kind && "dosat" !== h.kind && n.Audio.play("interact", { rate: .96 + .08 * Math.random() }), "duel" === h.kind || "dosat" === h.kind) {
          q(e, h.x - e.x, h.y - e.y);
          return void n.Player.attack(e, C(e, h.obj) ? h.obj : null);
        }
        if ("enemy" === h.kind) {
          q(e, h.x - e.x, h.y - e.y);
          return void n.Player.attack(e, C(e, h) ? h : null);
        }
        if ("scenery" === h.kind) {
          if (n.BangNhanhUI && n.BangNhanhUI.onInteract(h.obj)) {
            return;
          }
          if (n.PhongChoUI && n.PhongChoUI.onInteract(h.obj)) {
            return;
          }
          return "bia_da" === h.obj.id ? (t = h.obj, void (0 === (o = n.Quest).stage || 1 === o.stage && !o.stageComplete() ? n.HUD.openDialog("Bia Đá Cổ Tự", 'Bia rêu phong khắc mấy dòng đã mờ:\n"Muốn dẫn khí nhập thể, trước phải gột trọc khí: hái ba ngọn Tẩy Uế Thảo ven suối, sắc thành thang ở đan lô, rồi ra đài đá mà ngồi."\n\nNgươi nhẩm đọc ba lượt — trong đầu hiện lên pháp môn Đạo Dẫn thuật.', { actionLabel: "Ghi Nhớ Cổ Pháp", onAction: function () {
              o.start();
              o.setFlag("doc_bia_da");
              n.Audio.play("quest");
              n.VFX.spawnText(i.player.x, i.player.y - 58, "Lĩnh ngộ: Đạo Dẫn thuật", "#bff3d8");
              n.VFX.spawnRing(i.player.x, i.player.y - 14, "#cfe0b8", 34, .8);
              dn();
            } }) : n.HUD.openDialog(t.title, t.text))) : "ho_bich_thuy" === h.obj.id ? void function (a) {
            var e = n.Quest;
            var t = n.Farm;
            if (e.stage < 8) {
              n.VFX.spawnText(a.x, a.y - 30, "Chưa mở Vườn Cá Nhân", "#c9a45c");
            }
            else {
              var i = t.hasWaterAccess && t.hasWaterAccess();
              n.HUD.openDialog("", "", { choiceOnly: !0, hideClose: !0, choices: [{ label: i ? "Múc nước ✓" : "Múc nước", icon: "flask", disabled: i, onChoose: function () {
                      if (t.unlockWaterAccess && t.unlockWaterAccess()) {
                        c("lake.scoop");
                        n.VFX.spawnText(a.x, a.y - 30, "Đã mở nguồn nước vĩnh viễn", "#9fd8ea");
                        n.VFX.spawnRipple(a.x + 10, a.y - 4, "#7fc0d3");
                        n.HUD.updateQuest();
                      }
                    } }] });
            }
          }(h.obj) : !(r = h.obj) || "ho_bich_thuy_cong" !== r.id && "suoi_duoc_coc" !== r.id ? (q(e, h.x - e.x, h.y - e.y), void n.VFX.spawnQuanSat(h.x, h.topY - 6, h.obj.title, h.obj.text)) : void function (a) {
            n.HUD.openDialog("", "", { choiceOnly: !0, hideClose: !0, choices: [{ label: "Thả câu", icon: "fish", onChoose: function () {
                    Mn(a);
                  } }, { label: "Tự động câu", icon: "fish", note: "Dừng bằng nút hoặc di chuyển", onChoose: function () {
                    Mn(a, !0);
                  } }] });
          }(h.obj);
        }
        var r;
        pn(h.obj);
      }
  }
  function on(a) {
    var e = function () {
      var e;
      if ("ly_thanh" === a.id) {
        if (!(n.VanTieuUI && n.VanTieuUI.moLyThanh(a, function () {
          na(a);
        }))) {
          na(a);
        }
      }
      else {
        if ("su_phu" === a.id) {
          (function (a) {
            var e = i.player;
            var t = n.Quest.seedTaskInfo();
            if (t && "escort" === t.kind || !function (a) {
              var e = n.Quest;
              var t = n.Inventory;
              var i = a.name;
              return !(e.stage > 4) && (e.stage >= 1 && e.stageComplete() && dn(!1), e.stage > 4 ? (n.HUD.openDialog(i, '"Tẩy tuỷ thành rồi! Xuống Rừng Trúc phía nam tìm Huấn Sư Huynh — nó đang cần người."'), !0) : e.stage <= 1 ? (n.HUD.openDialog(i, 'Thầy Ông Nội hé mắt nhìn con:\n\n"Thân phàm nặng trọc khí, ngồi cả năm cũng chẳng cảm nổi linh khí. Hái ba ngọn Tẩy Uế Thảo ven suối, đem vào đan lô trong sân này sắc thành thang — rồi tính tiếp."', { actionLabel: "Nhận Việc", onAction: function () {
                  e.start();
                  e.setFlag("hoi_dao_dong");
                  dn();
                } }), !0) : 2 === e.stage ? (n.HUD.openDialog(i, '"Tẩy Uế Thảo là khóm cỏ ba lá phát sáng ven suối. Đủ ba ngọn thì vào đan lô trong sân mà sắc."\n\nĐang có: ' + t.count("tay_ue_thao") + "/" + e.NEED_HERB + " ngọn."), !0) : 3 === e.stage ? (n.HUD.openDialog(i, '"Đan lô ở ngay trong sân, củi ta chất sẵn. Chọn Tẩy Tuỷ Thang rồi đợi lò sôi."'), !0) : e.flags.tay_tuy_that_bai && !t.has("tay_tuy_thang") ? (n.HUD.openDialog(i, '"Hỏng một lần là chuyện thường. Sắc lại một bát ở đan lô rồi ra đài đá thử lần nữa."'), !0) : (n.HUD.openDialog(i, '"Ra đài đá bên suối, uống lúc thang còn nóng rồi ngồi yên. Đau mấy cũng chớ đứng dậy."'), !0));
            }(a)) {
              var o;
              var h;
              if (!t || "escort" !== t.kind) {
                return n.Quest.stage === n.Quest.BACH_KHOA_STAGE ? (o = a.name, void ((h = n.Quest).bachKhoaXong() ? Ba(o) : n.HUD.openDialog(o, 'Thầy Ông Nội lấy quyển Bách Khoa Tu Tiên đặt lên bàn:\n\n"Trong này ghi vật phẩm, nhiệm vụ, bản đồ và quái thú con đã gặp. Ta hỏi năm câu — không biết thì mở sách tra, sai cũng không bị phạt. Đủ năm câu ta cho 300 Linh Thạch làm vốn."\n\nTiến độ: ' + h.bachKhoaProgress() + "/" + h.BACH_KHOA_NEED + " câu đúng.", { choices: [{ label: "Bắt đầu Hỏi Đạo", onChoose: function () {
                        Ea(o);
                      } }, { label: "Mở Bách Khoa Tu Tiên", onChoose: Va }] }))) : void ("Phàm Nhân" !== e.realm ? n.HUD.openDialog(a.name, "Muốn tích Đạo Hạnh, hãy diệt yêu thú hoặc đả tọa.", { choices: [{ label: "Mở Bách Khoa Tu Tiên", note: "Tra cứu vật phẩm, nhiệm vụ, quái boss, bí cảnh và bản đồ", onChoose: function () {
                        if (n.Encyclopedia) {
                          n.Encyclopedia.open();
                        }
                      } }] }) : n.HUD.openDialog(a.name, "Khí chưa nhập thể, con hãy luyện thêm rồi quay lại tìm ta.", { choices: [{ label: "Mở Bách Khoa Tu Tiên", note: "Tra cứu vật phẩm, nhiệm vụ, quái, bản đồ và hoạt động", onChoose: function () {
                        if (n.Encyclopedia) {
                          n.Encyclopedia.open();
                        }
                      } }] }));
              }
              n.HUD.openDialog(a.name, 'Thầy Ông Nội đỡ lấy người cháu còn hơi yếu, bắt mạch một lúc rồi gật đầu:\n\n"Bệnh căn đã sạch, trên đường cũng không nhiễm thêm phong hàn. Con đưa người từ Thảo Dược Cốc về tới đây bình an, việc này làm chu toàn."', { actionLabel: "Bẩm Thầy Ông Nội", onAction: function () {
                  var a = n.Quest.completeEscortSeedQuest();
                  if (a) {
                    i.escortFollower = null;
                    n.VFX.spawnText(i.player.x, i.player.y - 58, "+" + a.reward + " Dược Công", "#f0d27a");
                    dn(!1);
                  }
                }, reward: [{ icon: "scroll", name: "Điểm Dược Công", qty: t.reward }, { icon: "spirit_stone", name: "Linh Thạch", qty: n.Quest.seedTaskStones(t) }], choices: [{ label: "Mở Bách Khoa Tu Tiên", note: "Vật phẩm · nhiệm vụ · quái boss · bản đồ và hoạt động", onChoose: function () {
                      if (n.Encyclopedia) {
                        n.Encyclopedia.open();
                      }
                    } }] });
            }
          })(a);
        }
        else {
          if ("dai_phu" === a.id) {
            (function (a) {
              var e = n.Quest;
              var t = n.Inventory;
              var o = n.Farm;
              var c = i.player;
              var r = a.name;
              if ("Phàm Nhân" !== c.realm)
                if (e.stage < 7) {
                  n.HUD.openDialog(r, '"Ta có nghe Huấn Sư Huynh nhắc tới ngươi. Việc rừng trúc còn dở dang thì lo cho xong đi đã, chuyện dược viên chạy đâu mà vội."');
                }
                else {
                  if (e.moThinhGiao()) {
                    var u = 'Lão nhân đặt dao thái thuốc xuống, lần này nhìn thẳng vào mắt ngươi:\n\n"Tầng mười rồi. Bấy nhiêu năm ta bốc thuốc cho ngươi, cũng nên xem ngươi học được tới đâu."\n\nLão rút trong tay áo ra một ống trúc nhỏ, dốc ngược: sáu cây kim bạc mảnh như sợi tóc trượt ra lòng bàn tay, đầu kim ánh lên một màu xanh lục.\n\n"Lục Độc Châm. Lão phu chữa người bằng nó, mà lấy mạng người cũng bằng nó. Ra Sân Đấu, cứ coi lão phu là kẻ địch mà đánh — nương tay là ngươi thua."';
                    return h() ? void n.HUD.openDialog(r, u, { actionLabel: "Xin Chỉ Giáo", onAction: function () {
                        n.Gateway.cmd("daiphu.thachDau", {}, function (a) {
                          if (!(a && a.ok)) {
                            n.HUD.openDialog(r, "Chưa đánh được: " + (a && a.why || "lỗi không rõ") + ".");
                          }
                        });
                      } }) : void n.HUD.openDialog(r, u + "\n\n(Trận thỉnh giáo cần nối được với máy chủ. Vào mạng rồi hãy tìm lão.)");
                  }
                  if (e.stage !== e.DOC_DANG_STAGE)
                    if (e.canChonBinhKhi()) {
                      Pa(r);
                    }
                    else if (Aa(e) || function (n) {
                      return !!(n.stage >= 8 && n.stage <= n.DUOC_VIEN_LAST_STAGE && !n.autoAdvances() && n.stageComplete()) || n.duocVienArcDone() && !n.flags.bao_cong_4;
                    }(e) || !e.pointToTangKinh())
                      if (7 !== e.stage || e.flags.bai_kien_dai_phu) {
                        var l = e.stage >= 8 && !e.duocVienArcDone();
                        if (!(e.stage >= 8) || e.stageComplete() || Aa(e) || e.duocVienArcDone() && !e.flags.bao_cong_4 || l && !e.hasActiveSeedQuest() || !La(r))
                          if (8 !== e.stage)
                            if (9 !== e.stage)
                              if (10 !== e.stage)
                                if (11 !== e.stage) {
                                  if (12 !== e.stage) {
                                    return 13 === e.stage ? e.stageComplete() ? void n.HUD.openDialog(r, 'Lão nhân chắp tay sau lưng, ngắm ngươi từ đầu tới chân:\n\n"Tầng 3. Mấy hôm mà bằng người ta ba năm — nhờ chịu khó cúi xuống chăm cây. Cầm lấy hồ lô này, với ít hạt giống cho viên Tụ Khí Đan kế tiếp."', { actionLabel: "Báo Công & Bái Tạ", onAction: function () {
                                        if (e.stageComplete()) {
                                          e.advance();
                                          e.setFlag("bao_cong_4");
                                          t.add("duoc_y_boi", 1);
                                          t.add("hat_linh_diep", 3);
                                          t.add("hat_huyet_thao", 3);
                                          dn(!1);
                                          if (e.canChonBinhKhi()) {
                                            Pa(r);
                                          }
                                        }
                                      }, reward: [{ icon: "gourd", name: "Dược Y Bội", qty: 1 }, { icon: "seed_luc", name: "Hạt Linh Diệp", qty: 3 }, { icon: "seed_huyet", name: "Hạt Huyết Thảo", qty: 3 }] }) : void g('"Đạo Hạnh đầy thì ra đài đá trong vườn, nuốt Tụ Khí Đan mà phá quan. Chưa đầy thì ngồi đài đá đả tọa, hoặc đi săn quái."') : void (!e.duocVienArcDone() || e.flags.bao_cong_4 ? g('"Dược Viên cứ để đấy mà dùng, gieo hái tuỳ ngươi — miễn đừng bỏ hoang."\n\n"Hết hạt thì tới tìm lão phu nhận việc nhân giống. Có nguyên liệu đổi hạt — không ai tu tiên mà chỉ ngửa tay xin mãi được. Linh thảo hái được cứ đem về đan lô trong làng luyện đan, đạo hạnh tự khắc tiến."') : n.HUD.openDialog(r, 'Lão nhân đặt hẳn dao cầu xuống, chắp tay sau lưng ngắm ngươi từ đầu tới chân:\n\n"Luyện Khí Tầng 3. Từ một kẻ phàm nhân gánh nước tới bước này, người khác mất ba năm, ngươi mất mấy hôm — phần lớn là nhờ chịu khó cúi xuống chăm cây."\n\n"Đường tu tiên dài lắm, nhưng cái lý thì có bấy nhiêu thôi: trồng gì gặt nấy."\n\nLão tháo chiếc hồ lô gỗ nhỏ đeo bên hông đưa cho ngươi.', { actionLabel: "Bái Tạ", onAction: function () {
                                        e.setFlag("bao_cong_4");
                                        t.add("duoc_y_boi", 1);
                                        t.add("hat_linh_diep", 3);
                                        t.add("hat_huyet_thao", 3);
                                        dn(!1);
                                      }, reward: [{ icon: "gourd", name: "Dược Y Bội", qty: 1 }, { icon: "seed_luc", name: "Hạt Linh Diệp", qty: 3 }, { icon: "seed_huyet", name: "Hạt Huyết Thảo", qty: 3 }] }));
                                  }
                                  g('"Đủ vị thì luyện Tụ Khí Đan ở đan lô trong vườn."\n\n' + e.recipeLines(e.TU_KHI_DAN_RECIPE));
                                }
                                else {
                                  g('"Lũ Dược Linh Thú đang gặm vườn của ngươi. Hạ hai con lấy Linh Thúy — thứ ấy là vị chính của Tụ Khí Đan."\n\nLinh Thúy: ' + Math.min(t.count("linh_thuy"), e.NEED_LINH_THUY) + "/" + e.NEED_LINH_THUY + ".");
                                }
                              else {
                                g(e.flags.dung_tu_khi_duoc ? '"Linh khí đầy ứ rồi — ra đài đá phá quan lên Tầng 2 đi, cửa này chưa cần đan."' : '"Uống chén Linh Dược ở đài đá trong vườn rồi vận công ngay, uống dọc đường là phí."');
                              }
                            else {
                              g('"Hái đủ rồi thì sắc Linh Dược ngay ở đan lô trong vườn — hai Linh Diệp, hai Huyết Thảo."');
                            }
                          else {
                            g('"Gieo hết hạt, chạm ao múc nước một lần rồi tưới từng luống — tưới rồi một phút là hái được."\n\nĐã hái: Linh Diệp ' + t.count("linh_diep") + "/" + e.NEED_LINH_DIEP + " · Huyết Thảo " + t.count("huyet_thao") + "/" + e.NEED_HUYET_THAO + "\nVườn: " + o.count("empty") + " luống trống · " + o.count("growing") + " đang lớn · " + o.count("ready") + " tới tuổi hái.");
                          }
                      }
                      else {
                        n.HUD.openDialog(r, 'Lão nhân nhìn đan điền ngươi một hồi:\n\n"Tầng 1 rồi à. Muốn tiến nhanh phải biết dùng linh dược. Qua cổng kia là Vườn Cá Nhân của ngươi — gieo hết chỗ hạt này, tưới cho mau lớn. Đan lô với đài đá có sẵn trong vườn."', { actionLabel: "Nhận Hạt Giống", onAction: function () {
                            e.setFlag("bai_kien_dai_phu");
                            t.add("hat_linh_diep", e.NEED_LINH_DIEP);
                            t.add("hat_huyet_thao", e.NEED_HUYET_THAO);
                            n.VFX.spawnText(i.player.x, i.player.y - 58, "Nhận việc: chăm nom Dược Viên", "#bff3d8");
                            dn();
                          }, reward: [{ icon: "seed_luc", name: "Hạt Linh Diệp", qty: e.NEED_LINH_DIEP }, { icon: "seed_huyet", name: "Hạt Huyết Thảo", qty: e.NEED_HUYET_THAO }] });
                      }
                    else {
                      n.HUD.openDialog(r, 'Lão nhân dừng dao, nhìn ngươi chăm chú:\n\n"Kinh mạch thông tới tầng bốn rồi đấy. Lão phu chỉ biết thuốc — muốn học pháp quyết thì về làng tìm Tàng Kinh Lão Nhân. Cầm chiếc lá này, dẫn khí vào là nó cõng ngươi bay."\n\nTrang bị Phi Diệp vào ô Phi Hành (Hành Trang), rồi bấm nút Phi Hành (phím F) để bay.', { actionLabel: "Ghi Nhớ", onAction: function () {
                          n.VFX.spawnText(i.player.x, i.player.y - 58, "Về làng tìm Tàng Kinh Lão Nhân", "#e8dfa0");
                          dn();
                        }, reward: [{ icon: "phi_diep", name: "Phi Diệp", qty: 1 }] });
                    }
                  else if (e.stageComplete()) {
                    n.HUD.openDialog(r, 'Đại Phu niêm giọt độc vào lọ, thả con Linh Ngư vào chậu nước: "Đúng thứ lão cần. Mấy lá phù và hạt thảo dược này cho ngươi. Về làng đi — Thầy Ông Nội có mấy câu muốn hỏi ngươi."', { actionLabel: "Báo Công", onAction: function () {
                        if (e.stageComplete()) {
                          e.flags.bao_cong_doc_dang = !0;
                          e.advance();
                          n.Inventory.add("phu_kim_giap", 2);
                          n.Inventory.add("phu_hoa", 1);
                          n.Inventory.add("hat_thanh_tam", 2);
                          n.Inventory.add("hat_linh_diep", 2);
                          dn(!1);
                        }
                      }, reward: [{ icon: "phu_kim_giap", name: "Kim Giáp Phù", qty: 2 }, { icon: "phu_hoa", name: "Hoả Phù", qty: 1 }, { icon: "seed_thanh", name: "Hạt Thanh Tâm Hoa", qty: 2 }, { icon: "seed_luc", name: "Hạt Linh Diệp", qty: 2 }] });
                  }
                  else {
                    var s = Math.min(Number(e.flags[e.LINH_NGU_CATCH_FLAG]) || 0, e.NEED_LINH_NGU);
                    n.HUD.openDialog(r, '"Dược Cốc đang bị Độc Đằng Yêu quấy nhiễu. Hạ chúng lấy 10 Độc Dịch, rồi ra hồ hoặc suối câu cho lão một con Linh Ngư."\n\nCâu cá: chạm mặt nước, chọn "Tự động câu".\nĐộc Dịch: ' + Math.min(t.count(e.DOC_DANG_ITEM), e.NEED_DOC_DANG) + "/" + e.NEED_DOC_DANG + " · Linh Ngư: " + s + "/" + e.NEED_LINH_NGU, e.canOpenSeedMenu() ? { choices: [{ label: "Sổ Dược Công · đổi hạt", icon: "scroll", note: "Việc phụ — lấy thêm hạt khi cần", onChoose: function () {
                            La(r);
                          } }] } : null);
                  }
                }
              else {
                n.HUD.openDialog(r, 'Lão nhân áo vải trắng đang ngồi thái thuốc, ngẩng lên liếc ngươi một cái rồi lại cúi xuống:\n\n"Thân còn nặng trọc khí, kinh mạch chưa thông — có cho ngươi linh dược cũng chỉ tổ phí thuốc. Về Chân Núi Tản Viên tẩy tuỷ phạt mao cho xong đã."');
              }
              function g(a) {
                n.HUD.openDialog(r, a, e.canOpenSeedMenu() ? { choices: [{ label: "Sổ Dược Công · đổi hạt", icon: "scroll", note: "Việc phụ — lấy thêm hạt khi cần", onChoose: function () {
                        La(r);
                      } }] } : null);
              }
            })(a);
          }
          else {
            if ("lao_dao_hang_cave" === a.id) {
              (function (a) {
                var e = n.Quest;
                if (e.hangDongUnlocked())
                  if (e.flags.hang_dong_da_lay_ruong) {
                    n.HUD.openDialog(a.name, 'Lão đạo vuốt chòm râu bạc, liếc mảnh Huyền Thiết bên hông ngươi rồi bật cười:\n\n"Gan dạ mà không tham, biết lấy đúng thứ mình cần — chuyến xuống hang ấy coi như không uổng. Dược liệu trong rương đủ cho một lò Phá Cảnh Đan, còn khoáng kia mang về Thợ Rèn trong làng mà rèn binh khí."' + (e.stage !== e.FORGE_STAGE || e.flags.ren_vu_khi_chinh ? "" : "\n\nCần 2 Huyền Thiết Khoáng (đang có " + n.Inventory.count("huyen_thiet_khoang") + ") — Thạch Yêu, Thạch Ma trong hang hay rơi."));
                  }
                  else if (e.hangDongActive()) {
                    var t = e.hasHangDongKey() ? '"Hạch trong tay ngươi còn ấm đấy. Áp nó vào ổ khoá trên rương thì cấm chế tự tan — nhanh lên, đừng để khí trong hang làm hỏng thuốc."' : '"Cửa hang ở ngay bên cạnh ta. Thạch Giáp Yêu nằm giữa hang, hạ được nó thì moi lấy cái hạch đá trong lớp giáp — chính nó nuôi cấm chế trên rương. Không địch nổi thì cứ lui ra, con vật ấy chừng nửa khắc lại lành như cũ, ngươi mất gì đâu."';
                    n.HUD.openDialog(a.name, t);
                  }
                  else {
                    n.HUD.openDialog(a.name, 'Một lão đạo áo đen phủ bụi đường đứng tựa vách đá cạnh cửa hang, bên chân cắm chiếc la bàn đồng đã xỉn màu. Thấy ngươi, lão hất cằm về cái miệng hang tối om:\n\n"Ngươi đã tới Luyện Khí Tầng 7 mà còn đứng chờ linh thảo lớn từng ngày sao? Ta biết một hang động cũ, linh khí dồi dào tới mức Bích Vân Diệp và Long Huyết Thảo vẫn tươi trong rương đá."\n\n"Nhưng Thạch Giáp Yêu Nhất Giai Thượng Phẩm đã chiếm hang. Trong lớp giáp nó có một hạch đá — chính cái hạch ấy nuôi cấm chế trên rương, moi được thì rương mở. Giáp nó còn cho Huyền Thiết đem về lò rèn. Con vật ấy hạ rồi chừng nửa khắc lại lành, nên không địch nổi thì cứ lui ra rồi vào lại — hang ấy giờ ai cũng xuống được, gặp người khác trong đó thì rủ nhau mà đánh."\n\n"À, còn con Xích Long nằm giữa cốc kia — nó không đuổi tới tận cửa hang đâu, nhưng lửa nó phun thì xa lắm. Thấy đất dưới chân đỏ lên là chạy ngay, đừng đứng ì."', { actionLabel: "Nhận Việc Mạo Hiểm", onAction: function () {
                        if (e.startHangDongQuest()) {
                          n.VFX.spawnText(a.x, a.y - 56, "Đã nhận: Hang Động", "#f0d27a");
                          n.HUD.updateQuest();
                        }
                      }, reward: e.PHA_CANH_DAN_RECIPE.map(function (a) {
                        var e = n.ITEMS[a.id];
                        return { icon: e.icon, name: e.name, qty: a.qty };
                      }) });
                  }
                else {
                  var i = n.realmById(e.HANG_DONG_REALM_MIN);
                  n.HUD.openDialog(a.name, 'Lão đạo liếc ngươi một cái từ đầu tới chân, lắc đầu:\n\n"Trong hang ấy có con Thạch Giáp Yêu nằm giữ rương linh dược. Thân thủ ngươi bây giờ mà xuống thì chỉ tổ nuôi nó béo thêm. Luyện tới ' + (i ? i.name : "Luyện Khí Tầng 7") + ' rồi hẵng quay lại tìm lão phu — lúc ấy nói chuyện mới có ý nghĩa."');
                }
              })(a);
            }
            else {
              if ("tang_kinh_lao_nhan" === a.id) {
                (function (a) {
                  var e = n.Quest;
                  var t = a.name;
                  if (e.stage !== e.YEU_COT_STAGE)
                    if (e.flags.bi_tich_hoan_thanh) {
                      var o = n.Gacha.missing(n, "so_cap").length;
                      var h = n.Gacha.missing(n, "trung_cap").length;
                      var c = n.Gacha.missing(n, "bi_dong").length;
                      var r = function (a) {
                        return n.Gacha.freeToday && n.Gacha.freeToday(n, a) ? "Miễn phí 1 lượt hôm nay · " : "";
                      };
                      var u = e.stage !== e.RUT_BI_TICH_STAGE || e.biTichGachaDone() ? "Chọn cấp sách để rút; giá và cơ hội nhận được hiển thị ngay trên từng nút." : '"Thầy Ông Nội ngươi đã dặn trước rồi." Lão nhân úp cả tủ sách xuống mặt bàn.\n\nChọn Tàng Kinh Sơ Cấp, rút tới khi ra một quyển CHƯA CÓ là xong việc — quyển trùng hoàn lại ' + n.Gacha.DUP_REFUND + " Linh Thạch.";
                      n.HUD.openDialog(t, u, { choices: [{ label: "Tàng Kinh Sơ Cấp", note: o ? r("so_cap") + n.Gacha.pool("so_cap").cost + " Linh Thạch/lượt · còn " + o + " quyển" : "Cả tủ đã về tay ngươi", icon: "bi_tich", disabled: !o, onChoose: function () {
                              n.GachaUI.show();
                            } }, { label: "Tàng Kinh Trung Cấp", note: h ? "1.000 Linh Thạch/lượt · còn " + h + " quyển" : "Cả tủ trung cấp đã về tay ngươi", icon: "bi_tich_loi_chuong", disabled: !h, onChoose: function () {
                              n.GachaUI.show("trung_cap");
                            } }, { label: "Tàng Kinh Bị Động", note: c ? r("bi_dong") + "500 Linh Thạch/lượt · còn " + c + " quyển" : "Cả tủ bị động đã về tay ngươi", icon: "bi_tich_kim_quang_chao", disabled: !c, onChoose: function () {
                              n.GachaUI.show("bi_dong");
                            } }, { label: "Bí Tịch Lục", note: "Tra cứu mọi bí tịch: chỉ số, công dụng, nơi nhận", icon: "bi_tich", onChoose: function () {
                              n.BiTichLuc.show();
                            } }] });
                    }
                    else if (e.biTichComplete()) {
                      !function (a) {
                        var e = n.Quest;
                        n.HUD.openDialog(a, 'Ngươi đặt hai mảnh giấy rách lên án. Lão nhân xoay chúng lại cho khớp, mép rách ăn vào nhau vừa in.\n\n"Đúng là một quyển. Nửa trên dạy dẫn khí rời Đan Điền, nửa dưới dạy đưa khí ra kinh mạch tay chân — thiếu một nửa thì đọc tới giữa chừng là tẩu hoả."\n\nLão khâu lại gáy sách cất vào tủ, rồi lụi cụi lôi ra bốn quyển xếp thành một hàng:\n"Ngươi đoạt sách về cho lão phu thì lão phu trả công. Bốn quyển sơ cấp, chọn LẤY MỘT. Duyên pháp mỗi đời một quyển — chọn rồi thì đừng quay lại đòi đổi."', { choices: e.BI_TICH_CHOICES.map(yn) });
                      }(t);
                    }
                    else if (e.flags.bi_tich_nhan_viec) {
                      var l = n.Inventory.has(e.MANH_THUONG, 1);
                      n.HUD.openDialog(t, l ? '"Nửa trên ngươi lấy được rồi. Nửa dưới nằm trong bụng lũ yêu quái quanh miễu — chúng tha giấy về ổ chứ có đọc được đâu. Cứ dọn sạch mấy con quanh sân, trước sau gì cũng ra."' : '"Miếu Hoang ở ngay phía tây làng, theo lối mòn mép trái mà đi. Nửa trên quyển sách còn nằm trên án thờ — bao năm rồi chẳng ai dám vào lấy vì lũ yêu quái nương yêu khí trong đó mà sinh ra."');
                    }
                    else if (e.biTichUnlocked()) {
                      if (e.flags.phi_diep_da_trao) {
                        e.acceptEquipmentTask();
                        if (e.equipmentTutorialComplete()) {
                          n.HUD.openDialog(t, 'Lão nhân đặt quyển sách đang phơi xuống, nhìn thẳng vào đan điền ngươi một hồi rồi gật gù:\n\n"Kinh mạch tầng bốn, thông cả rồi. Đại Phu bảo ngươi tới đúng lúc lắm."\n\n"Tụ Khí chỉ giúp ngươi nhập môn. Muốn thật sự chiến đấu, phải có pháp quyết dẫn linh lực."\n\nLão thở dài, chỉ tay về phía tây làng:\n"Ngặt nỗi quyển vỡ lòng ấy lão phu để thất lạc trong Miếu Hoang từ đời nào, giờ lại rách làm đôi. Nửa trên còn nằm trên án thờ. Nửa dưới thì lũ yêu quái trong miễu tha đi mất — muốn lấy lại chỉ còn cách chém chúng mà đoạt."', { actionLabel: "Nhận Việc", onAction: function () {
                              if (e.startBiTichQuest()) {
                                n.VFX.spawnText(i.player.x, i.player.y - 58, "Nhận việc: Duyên Pháp Bí Tịch", "#e8dfa0");
                                dn();
                              }
                            } });
                        }
                        else {
                          n.HUD.openDialog(t, '"Bài tập trang bị còn chưa xong. Nhấn [B] mở Hành Trang, chọn Phi Diệp → Trang Bị. Nó vào ô Phi Hành, binh khí đang cầm vẫn giữ nguyên."');
                        }
                      }
                      else {
                        n.HUD.openDialog(t, 'Lão nhân đưa cho ngươi một chiếc Phi Diệp gân bạc rồi chỉ vào Hành Trang:\n\n"Trước khi học pháp quyết, phải biết cưỡi lá mà đi. Nhấn [B], bấm Phi Diệp rồi chọn Trang Bị — nó nằm ở ô Phi Hành riêng, không đụng gì tới binh khí ngươi đang cầm."', { actionLabel: "Nhận Task Trang Bị", onAction: function () {
                            e.acceptEquipmentTask();
                            n.VFX.spawnText(i.player.x, i.player.y - 58, "Task: trang bị Phi Diệp", "#e8dfa0");
                            dn(!1);
                          }, reward: [{ icon: "phi_diep", name: "Phi Diệp", qty: 1 }] });
                      }
                    }
                    else {
                      var s = n.realmById(e.BI_TICH_REALM_MIN);
                      n.HUD.openDialog(t, 'Lão nhân ngồi giữa đống sách cũ, phe phẩy quạt mo, chỉ liếc ngươi một cái:\n\n"Kinh mạch còn chưa thông hết mà đã hỏi pháp quyết? Khí trong người ngươi chạy tới nửa vòng là nghẽn. Tới ' + (s ? s.name : "Luyện Khí Tầng 4") + ' rồi hẵng quay lại — lúc ấy lão phu nói ngươi mới nghe ra."');
                    }
                  else {
                    if (e.stageComplete()) {
                      n.HUD.openDialog(t, 'Lão nhân lật xem đống Yêu Cốt Vụn, gật đầu: "Pháp quyết đã dùng được trong thực chiến. Cầm ít phù và hạt giống này. Giờ xuống Thảo Dược Cốc: Đại Phu cần Độc Dịch của Độc Đằng Yêu và một con Linh Ngư."', { actionLabel: "Báo Công", onAction: function () {
                          if (e.stageComplete()) {
                            e.flags.bao_cong_yeu_cot = !0;
                            e.advance();
                            n.Inventory.add("phu_thanh_tam", 2);
                            n.Inventory.add("phu_toc_hanh", 1);
                            n.Inventory.add("hat_linh_diep", 2);
                            n.Inventory.add("hat_huyet_thao", 2);
                            dn(!1);
                          }
                        }, reward: [{ icon: "phu_thanh_tam", name: "Thanh Tâm Phù", qty: 2 }, { icon: "phu_toc_hanh", name: "Tốc Hành Phù", qty: 1 }, { icon: "seed_luc", name: "Hạt Linh Diệp", qty: 2 }, { icon: "seed_huyet", name: "Hạt Huyết Thảo", qty: 2 }] });
                    }
                    else {
                      n.HUD.openDialog(t, '"Đã có pháp quyết thì phải biết dùng. Sang Miếu Hoang phía tây làng hạ Yêu Quái, nhặt 10 Yêu Cốt Vụn chúng rơi rồi mang về."\n\nChiêu vừa học nằm trên thanh chiêu dưới màn hình — bấm phím số hoặc chạm ô chiêu để thi triển; bật Auto thì tự dùng.\n\nĐang có: ' + n.Inventory.count("yeu_cot") + "/" + e.NEED_YEU_COT + " Yêu Cốt Vụn.");
                    }
                  }
                })(a);
              }
              else {
                if ("chap_su_dai_hoi" === a.id) {
                  e = a;
                  if (h()) {
                    if (n.ChienBangUI) {
                      n.ChienBangUI.moChapSu(e);
                    }
                    else {
                      n.HUD.closeDialog();
                      n.DaiHoiUI.show();
                    }
                  }
                  else if (n.NTBot && n.NTBot.chapSu) {
                    n.NTBot.chapSu(e);   // Nghịch Tiên: Chiến Bảng / Đại Hội đấu với bot khi không có máy chủ
                  }
                  else {
                    n.HUD.openDialog(e.name, 'Người ấy khép sổ lại:\n\n"Đại hội cần đông người mới thành hội. Đạo hữu đang tu một mình nơi hoang sơn, chưa nối được với Tiên Đồ — chờ khi nào nối được rồi hãy tới."');
                  }
                }
                else {
                  if ("tho_ren" === a.id) {
                    Wn(a);
                  }
                  else {
                    if (n.Market && a.id === n.Market.NPC_ID) {
                      (function (a) {
                        if (h() && n.MarketUI) {
                          var e = n.Auth && !n.Auth.localFixture && n.Auth.user;
                          if (e && n.Market && n.Market.CAN_EMAIL && !n.Market.emailThat(n.Auth.linkedEmail ? n.Auth.linkedEmail(e) : e.email)) {
                            n.HUD.openDialog(a.name || "Vạn Bảo Phường", "Liên kết email để mở Vạn Bảo Phường.", { choices: [{ label: "Liên kết email", note: "Cài Đặt → Tài khoản", onChoose: function () {
                                    Rn();
                                    var n = t.$("#account-email-open");
                                    if (n && !n.classList.contains("hidden")) {
                                      n.click();
                                    }
                                  } }] });
                          }
                          else {
                            n.MarketUI.open(a, { cmd: function (a, e, t) {
                                n.Gateway.cmd(a, e, t);
                              } });
                          }
                        }
                        else {
                          n.HUD.openDialog(a.name || "Vạn Bảo Phường", 'Lão chủ phường gõ bàn tính: "Chợ chỉ họp khi đạo hữu trực tuyến — có người mua người bán thì Vạn Bảo Phường mới mở cửa."');
                        }
                      })(a);
                    }
                    else {
                      if ("ba_hang_com" === a.id) {
                        mn(a);
                      }
                      else {
                        if (n.PhongCho && a.id === n.PhongCho.NPC) {
                          (function (a) {
                            if (n.HongTyUI) {
                              n.HongTyUI.open(a, { cfg: function () {
                                  return i.player && i.player.cfg;
                                }, chiMuc: ["com", "phu"], buyFood: wn, eat: Cn, buyTalisman: kn });
                            }
                            else {
                              mn(a);
                            }
                          })(a);
                        }
                        else {
                          if ("tran_phap_su" === a.id) {
                            Zn(a);
                          }
                          else {
                            if (n.Sect && a.id === n.Sect.NPC && n.QuanSuUI) {
                              n.QuanSuUI.mo(a);
                            }
                            else {
                              if ("tgt_thien_kiem_tong" === a.id) {
                                Jn(a);
                              }
                              else {
                                if (n.LuyenQuy && a.id === n.LuyenQuy.NPC) {
                                  (function (a) {
                                    var e = n.LuyenQuy;
                                    var t = a.name || "Sứ Giả Ma Đạo";
                                    var i = e.xetHoc(n);
                                    if (i) {
                                      n.HUD.openDialog(t, 'Lão sứ giả không buồn ngẩng lên.\n\n"Đạo của bổn tông không dạy cho kẻ còn đang dở dang. Xong việc của ngươi đi đã."\n\nCòn thiếu: ' + i + ".");
                                    }
                                    else {
                                      var o = [];
                                      if (e.coPhien(n)) {
                                        o.push({ label: "Mở Hồn Phiên", note: "Luyện và gọi Âm Hồn", icon: "hon_phien", onChoose: function () {
                                            if (n.HonPhienUI) {
                                              n.HonPhienUI.mo();
                                            }
                                          } });
                                        var h = n.Skills;
                                        if (h && h.canBuyMaBaoAn && !n.Inventory.owns(h.MA_BAO_AN_BOOK)) {
                                          var c = h.canBuyMaBaoAn(n);
                                          o.push({ label: "Mua Bí Tịch Ma Bạo Ấn", note: c.ok ? h.MA_BAO_AN_COST.toLocaleString("vi-VN") + " Linh Thạch" : c.why, icon: h.MA_BAO_AN_BOOK, disabled: !c.ok, onChoose: hn });
                                        }
                                        if (h && h.canBuyXichMa && !n.Inventory.owns(h.XICH_MA_BOOK)) {
                                          var r = h.canBuyXichMa(n);
                                          o.push({ label: "Mua Bí Tịch Xích Ma Hóa Thân", note: r.ok ? h.XICH_MA_COST.toLocaleString("vi-VN") + " Linh Thạch" : r.why, icon: h.XICH_MA_BOOK, disabled: !r.ok, onChoose: cn });
                                        }
                                        o.push({ label: "Trả Hồn Phiên", note: "Bỏ Ma Đạo — mất hết Âm Hồn", icon: "hon_phien", onChoose: function () {
                                            gn("Hồn Phiên", "Âm Hồn");
                                          } });
                                      }
                                      else {
                                        var u = e.xetThinhPhien(n);
                                        o.push({ label: "Thỉnh Hồn Phiên", note: u || e.GIA_PHIEN + " Linh Thạch", icon: "hon_phien", disabled: !!u, onChoose: rn });
                                      }
                                      n.HUD.openDialog(t, 'Lão đẩy tới một lá phiên đen, cán bằng xương.\n\n"Hồn của kẻ vừa ngã tan trong chớp mắt. Có lá này thì nó không tan — nó về đây. Tám mươi mảnh phàm hồn kết thành một Âm Hồn, gọi ra thì nó đánh giúp ngươi."\n\n"Giá của nó không tính bằng Linh Thạch. Ngươi sẽ biết."\n\nLinh Thạch đang có: ' + (0 | n.Progress.stones) + ".", { choices: o });
                                    }
                                  })(a);
                                }
                                else {
                                  if (n.ChinhDao && a.id === n.ChinhDao.NPC) {
                                    ln(a);
                                  }
                                  else {
                                    if (n.LuyenQuy && a.id === n.LuyenQuy.NPC_CUNG) {
                                      (function (a) {
                                        var e = n.LuyenQuy;
                                        var t = a.name || "Ông Từ Giữ Miếu";
                                        var o = e.satNghiep(n);
                                        if (o <= 0) {
                                          n.HUD.openDialog(t, a.text || "");
                                        }
                                        else {
                                          var c = 0 | n.Progress.stones;
                                          var r = function (a, t) {
                                            var o = e.xetCung(n, a);
                                            return { label: t, note: o.why || "bớt " + o.diem + " điểm · " + o.gia + " Linh Thạch", icon: "spirit_stone", disabled: !!o.why, onChoose: function () {
                                                !function (a) {
                                                  var e = n.LuyenQuy;
                                                  var t = i.player;
                                                  var o = function (a) {
                                                    if (!a || !a.ok) {
                                                      n.Audio.play("deny");
                                                      return void n.VFX.spawnText(t.x, t.y - 52, a && a.why || "không cúng được", "#c9a45c");
                                                    }
                                                    n.Audio.play("coin");
                                                    n.VFX.spawnRing(t.x, t.y - 10, "#f0d27a", 24, .6);
                                                    n.VFX.spawnText(t.x, t.y - 52, "Sát Nghiệp −" + a.diem + " (còn " + a.con + ")", "#f0d27a");
                                                    if (a.hon && n.HonPhienUI) {
                                                      n.HonPhienUI.dat(a.hon);
                                                    }
                                                    n.HUD.renderBag();
                                                  };
                                                  if (h()) {
                                                    n.Gateway.cmd("nghiep.cung", { diem: 0 | a }, o);
                                                  }
                                                  else {
                                                    o(e.cung(n, a));
                                                  }
                                                }(a);
                                              } };
                                          };
                                          var u = [r(1, "Cúng một nén nhang")];
                                          if (o >= 10) {
                                            u.push(r(10, "Cúng mười nén"));
                                          }
                                          u.push(r(0, "Cúng tới sạch nghiệp"));
                                          n.HUD.openDialog(t, '"Trên người ngươi còn vương ' + o + ' điểm Sát Nghiệp. Thắp nén nhang, góp chút công đức cho miếu — nghiệp sẽ nhẹ đi."\n\n' + e.GIA_CUNG + " Linh Thạch một điểm. Linh Thạch đang có: " + c + "." + (e.CO_DEN_BAT && o > e.MOC_CO_DEN ? "\n\nNghiệp trên " + e.MOC_CO_DEN + ": đang bị cắm cờ đen, dưới " + e.MOC_THA_CO + " mới tháo được." : ""), { choices: u });
                                        }
                                      })(a);
                                    }
                                    else {
                                      if (n.HuThien && a.id === n.HuThien.NPC && n.HuThienUI) {
                                        n.HuThienUI.moNpc(a);
                                      }
                                      else {
                                        if (n.BachHoDuong && a.id === n.BachHoDuong.NPC) {
                                          n.BachHoDuong.moNpc(a);   // Nghịch Tiên: báo danh Bạch Hổ Đường
                                        }
                                        else if (n.DiemDanh && a.id === n.DiemDanh.NPC) {
                                          Tn(a);
                                        }
                                        else {
                                          if (!("huyet_anh_khach" === a.id && n.VanTieuUI && n.VanTieuUI.moBanh(a, function () {
                                            n.HUD.openDialog(a.name, a.text);
                                          }))) {
                                            if (a.text) {
                                              n.HUD.openDialog(a.name, a.text);
                                            }
                                            else {
                                              n.HUD.openDialog(a.name || "Đạo hữu", '"Đường tu còn dài, đạo hữu cứ đi thong thả."');
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    };
    if (n.NpcChatter) {
      n.NpcChatter.say(a);
    }
    if (!(n.HacThiUI && n.HacThiUI.chanNpc(a, e))) {
      e();
    }
  }
  function hn() {
    var a = n.Skills;
    var e = i.player;
    var t = function () {
      n.Audio.play("coin");
      n.VFX.spawnText(e.x, e.y - 52, "+1 Bí Tịch Ma Bạo Ấn", "#d27bff");
      n.HUD.renderBag();
    };
    var o = function (a) {
      n.Audio.play("deny");
      n.VFX.spawnText(e.x, e.y - 52, a || "không mua được", "#c9a45c");
    };
    if (h()) {
      n.Gateway.cmd("mabaoan.buy", {}, function (n) {
        if (n && n.ok) {
          t();
        }
        else {
          o(n && n.why);
        }
      });
    }
    else {
      var c = a.buyMaBaoAn(n);
      if (c.ok) {
        t();
      }
      else {
        o(c.why);
      }
    }
  }
  function cn() {
    var a = n.Skills;
    var e = i.player;
    var t = function () {
      n.Audio.play("coin");
      n.VFX.spawnText(e.x, e.y - 52, "+1 Bí Tịch Xích Ma Hóa Thân", "#ff6a3c");
      n.HUD.renderBag();
    };
    var o = function (a) {
      n.Audio.play("deny");
      n.VFX.spawnText(e.x, e.y - 52, a || "không mua được", "#c9a45c");
    };
    if (h()) {
      n.Gateway.cmd("xichma.buy", {}, function (n) {
        if (n && n.ok) {
          t();
        }
        else {
          o(n && n.why);
        }
      });
    }
    else {
      var c = a.buyXichMa(n);
      if (c.ok) {
        t();
      }
      else {
        o(c.why);
      }
    }
  }
  function rn() {
    var a = n.LuyenQuy;
    var e = i.player;
    var t = a.xetThinhPhien(n);
    if (t) {
      n.Audio.play("deny");
      return void n.VFX.spawnText(e.x, e.y - 52, t, "#c9a45c");
    }
    if (h()) {
      n.Gateway.cmd("hon.thinhPhien", {}, function (a) {
        if (!a || !a.ok) {
          n.Audio.play("deny");
          return void n.VFX.spawnText(e.x, e.y - 52, a && a.why || "không thỉnh được", "#c9a45c");
        }
        if (a.hon && n.HonPhienUI) {
          n.HonPhienUI.dat(a.hon);
        }
        un();
      });
    }
    else {
      if (a.thinhPhien(n).ok) {
        un();
      }
    }
  }
  function un() {
    var a = i.player;
    n.Audio.play("coin");
    n.VFX.spawnRing(a.x, a.y - 10, "#c22333", 26, .6);
    n.VFX.spawnText(a.x, a.y - 52, "+1 Hồn Phiên", "#e8506a");
    n.HUD.renderBag();
    if (n.HonPhienUI) {
      n.HonPhienUI.mo();
    }
  }
  function ln(a) {
    var e = n.ChinhDao;
    var t = n.LuyenQuy;
    var o = a.name || "Chưởng Sự Chính Đạo";
    var c = t.xetHoc(n);
    if (c) {
      n.HUD.openDialog(o, '"Kiếm của chính đạo chỉ trao cho người đã đi hết đường mình. Xong việc đã."\n\nCòn thiếu: ' + c + ".");
    }
    else {
      var r = [];
      if (e.coHap(n)) {
        r.push({ label: "Mở Kiếm Hạp", note: "Luyện và gọi Kiếm Linh", icon: "kiem_hap", onChoose: function () {
            if (n.HonPhienUI) {
              n.HonPhienUI.mo();
            }
          } });
        r.push({ label: "Trả Kiếm Hạp", note: "Bỏ Chính Đạo — mất hết Kiếm Linh", icon: "kiem_hap", onChoose: function () {
            gn("Kiếm Hạp", "Kiếm Linh");
          } });
      }
      else {
        var u = e.xetThinhHap(n);
        r.push({ label: "Thỉnh Kiếm Hạp", note: u || e.GIA_HAP + " Linh Thạch", icon: "kiem_hap", disabled: !!u, onChoose: sn });
      }
      var l = a;
      var s = i.player;
      var g = r;
      if (t = n.LucTinhTrucKiem) {
        var p = n.ITEMS[t.BOOK];
        var d = t.canBuy(n, s);
        var y = n.Inventory.count(t.MAT);
        g.push({ label: "Thuật Pháp: " + p.name + " · " + t.COST + " LT + " + t.MAT_COST + " " + t.matName(n), note: "Dùng với " + t.weaponNames(n) + ". Sáu trực kiếm xoay quanh người và lần lượt thay công thường lao vào mục tiêu. " + t.matName(n) + " cạy từ Mạch Phong Tinh ở Bãi Đá — đang có " + y + "/" + t.MAT_COST + "." + (d.ok ? "" : " — " + d.why), icon: p.icon, disabled: !d.ok, onChoose: function () {
            !function (a) {
              var e = n.LucTinhTrucKiem;
              function t(t) {
                if (!t || !t.ok) {
                  n.Audio.play("deny");
                  return void n.HUD.setCaption("Không mua được: " + (t && t.why || "máy chủ từ chối"));
                }
                n.Audio.play("coin");
                n.VFX.spawnRing(a.x, a.y - 18, "#d45aff", 30, .6);
                n.HUD.setCaption("Đã mua " + n.ITEMS[e.BOOK].name + " · -" + e.priceLine(n));
                if (n.Player && i.player) {
                  n.Player.refreshEquipment(i.player);
                }
                if (n.HUD.refreshBag) {
                  n.HUD.refreshBag();
                }
                if (!(h())) {
                  ln(a);
                }
              }
              if (h()) {
                n.Gateway.cmd("daitanmagic.buy", {}, t);
              }
              else {
                t(e.buy(n, i.player));
              }
            }(l);
          } });
      }
      var m = n.Formations;
      var f = m && m.DEFS.dao_gia;
      if (f) {
        var T = m.canBuyDaoGia(n);
        var v = m.DAO_GIA_GIA.items.map(function (a) {
          return n.ITEMS[a[0]].name + " " + n.Inventory.count(a[0]) + "/" + a[1];
        }).join(", ");
        g.push({ label: "Trận Pháp: " + f.name, note: m.daoGiaGiaLine(n) + ". Đang có: " + v + "." + (T.ok ? "" : " — " + T.why), icon: n.ITEMS[f.item].icon, disabled: !T.ok, onChoose: function () {
            !function (a) {
              var e = n.Formations;
              function t(e) {
                if (!e || !e.ok) {
                  n.Audio.play("deny");
                  return void n.HUD.setCaption("Không đổi được: " + (e && e.why || "máy chủ từ chối"));
                }
                n.Audio.play("coin");
                n.VFX.spawnRing(a.x, a.y - 18, "#f0c454", 26, .5);
                n.HUD.setCaption("Đã đổi " + n.ITEMS.tran_ban_dao_gia.name);
                if (n.HUD.refreshBag) {
                  n.HUD.refreshBag();
                }
                if (!(h())) {
                  ln(a);
                }
              }
              if (h()) {
                n.Gateway.cmd("daogia.buy", {}, t);
              }
              else {
                t(e.buyDaoGia(n));
              }
            }(l);
          } });
      }
      var x = n.Skills.canBuyVanKiem(n);
      g.push({ label: "Bí Tịch Vạn Kiếm Quy Tông · " + n.Skills.VAN_KIEM_COST + " LT", note: "24 binh khí chân khí chia bốn tầng hư thực, lần lượt quy tụ vào một mục tiêu. Dùng kiếm, đao hoặc thương." + (x.ok ? "" : " — " + x.why), icon: "bi_tich_van_kiem_quy_tong", disabled: !x.ok, onChoose: function () {
          !function (a) {
            function e(e) {
              if (!e || !e.ok) {
                n.Audio.play("deny");
                return void n.HUD.setCaption("Không mua được: " + (e && e.why || "máy chủ từ chối"));
              }
              n.Audio.play("coin");
              n.HUD.setCaption("Đã mua Bí Tịch Vạn Kiếm Quy Tông · -20000 Linh Thạch");
              if (n.HUD.refreshBag) {
                n.HUD.refreshBag();
              }
              if (!(h())) {
                ln(a);
              }
            }
            if (h()) {
              n.Gateway.cmd("vankiem.buy", {}, e);
            }
            else {
              e(n.Skills.buyVanKiem(n));
            }
          }(l);
        } });
      var b = n.Skills.canBuyKimQuang(n);
      g.push({ label: "Bí Tịch Kim Quang Cự Kiếm · " + n.Skills.KIM_QUANG_COST + " LT", note: "Triệu một cây kim kiếm khổng lồ từ vòng năng lượng, bay chậm theo vòng cung rồi cắm vào mục tiêu." + (b.ok ? "" : " — " + b.why), icon: "bi_tich_kim_quang_cu_kiem", disabled: !b.ok, onChoose: function () {
          !function (a) {
            function e(e) {
              if (!e || !e.ok) {
                n.Audio.play("deny");
                return void n.HUD.setCaption("Không mua được: " + (e && e.why || "máy chủ từ chối"));
              }
              n.Audio.play("coin");
              n.HUD.setCaption("Đã mua Bí Tịch Kim Quang Cự Kiếm · -" + n.Skills.KIM_QUANG_COST + " Linh Thạch");
              if (n.HUD.refreshBag) {
                n.HUD.refreshBag();
              }
              if (!(h())) {
                ln(a);
              }
            }
            if (h()) {
              n.Gateway.cmd("kimquang.buy", {}, e);
            }
            else {
              e(n.Skills.buyKimQuang(n));
            }
          }(l);
        } });
      var _ = n.Skills.canBuyKimCuong(n);
      g.push({ label: "Bí Tịch Kim Cương Hóa Thân · " + n.Skills.KIM_CUONG_COST + " LT", note: "Cường hoá thân thể 14 giây: đánh nhanh, hút huyết, Cương Khí đỡ đòn, thân mạ vàng kim, mắt phát sáng." + (_.ok ? "" : " — " + _.why), icon: "bi_tich_kim_cuong_hoa_than", disabled: !_.ok, onChoose: function () {
          !function (a) {
            function e(e) {
              if (!e || !e.ok) {
                n.Audio.play("deny");
                return void n.HUD.setCaption("Không mua được: " + (e && e.why || "máy chủ từ chối"));
              }
              n.Audio.play("coin");
              n.HUD.setCaption("Đã mua Bí Tịch Kim Cương Hóa Thân · -" + n.Skills.KIM_CUONG_COST + " Linh Thạch");
              if (n.HUD.refreshBag) {
                n.HUD.refreshBag();
              }
              if (!(h())) {
                ln(a);
              }
            }
            if (h()) {
              n.Gateway.cmd("kimcuong.buy", {}, e);
            }
            else {
              e(n.Skills.buyKimCuong(n));
            }
          }(l);
        } });
      n.HUD.openDialog(o, '"Hạ sơn tặc, trừ ma tu — chính khí của chúng tụ vào hạp này, luyện thành Kiếm Linh."\n\n"Ma tu nhìn tên vàng là biết ngươi. Gặp nhau thì đánh, mỗi người mỗi ngày một lần."\n\nLinh Thạch đang có: ' + (0 | n.Progress.stones) + ".", { choices: r });
    }
  }
  function sn() {
    var a = n.ChinhDao;
    var e = i.player;
    var t = a.xetThinhHap(n);
    if (t) {
      n.Audio.play("deny");
      return void n.VFX.spawnText(e.x, e.y - 52, t, "#c9a45c");
    }
    var o = function () {
      n.Audio.play("coin");
      n.VFX.spawnRing(e.x, e.y - 10, "#ffd86b", 26, .6);
      n.VFX.spawnText(e.x, e.y - 52, "+1 Tụ Linh Kiếm Hạp", "#ffe08a");
      n.HUD.renderBag();
      if (n.HonPhienUI) {
        n.HonPhienUI.mo();
      }
    };
    if (h()) {
      n.Gateway.cmd("hon.thinhHap", {}, function (a) {
        if (!a || !a.ok) {
          n.Audio.play("deny");
          return void n.VFX.spawnText(e.x, e.y - 52, a && a.why || "không thỉnh được", "#c9a45c");
        }
        if (a.hon && n.HonPhienUI) {
          n.HonPhienUI.dat(a.hon);
        }
        o();
      });
    }
    else {
      if (a.thinhHap(n).ok) {
        o();
      }
    }
  }
  function gn(a, e) {
    var t = i.player;
    n.HUD.openDialog("Trả " + a, "Trả " + a + " là mất hết " + e + " đã luyện. Nguyên liệu trong túi vẫn giữ.\n\nChắc chưa?", { choices: [{ label: "Trả " + a, note: "Không lấy lại được", onChoose: function () {
            var e = function () {
              n.Audio.play("ui");
              n.VFX.spawnText(t.x, t.y - 52, "Đã trả " + a, "#c9a45c");
              n.HUD.renderBag();
            };
            if (h()) {
              n.Gateway.cmd("hon.traVat", {}, function (a) {
                if (!a || !a.ok) {
                  n.Audio.play("deny");
                  return void n.VFX.spawnText(t.x, t.y - 52, a && a.why || "không trả được", "#c9a45c");
                }
                if (a.hon && n.HonPhienUI) {
                  n.HonPhienUI.dat(a.hon);
                }
                e();
              });
            }
            else {
              if (n.ChinhDao.traVat(n).ok) {
                e();
              }
            }
          } }] });
  }
  function pn(a) {
    var e;
    if (!(n.HuyetSacUI && n.HuyetSacUI.interact(a) || n.LamLangUI && n.LamLangUI.interact(a) || n.YenLangUI && n.YenLangUI.interact(a))) {
      switch (a.type) {
        case "npc":
          on(a);
          break;
        case "forge":
          Wn(a);
          break;
        case "cave_entrance":
          !function (a) {
            var e = n.Quest;
            if (e.hangDongUnlocked()) {
              if (e.flags.hang_dong_da_nhan) {
                n.HUD.openDialog(a.name, e.flags.hang_dong_da_lay_ruong ? "Cấm chế đã tan, trong hang chỉ còn tiếng nước nhỏ giọt và chiếc rương trống." : "Bên trong tối đặc, linh khí nặng như sương. Một lối thoát nằm ở cửa nam, ra vào lúc nào cũng được — lũ Thạch Yêu bị hạ rồi cũng tự tụ lại sau một lúc.", { actionLabel: e.flags.hang_dong_da_lay_ruong ? "Vào Lại Hang" : "Bước Vào Hang", onAction: function () {
                    if (!(e.flags.hang_dong_da_lay_ruong)) {
                      e.enterHangDong();
                    }
                    if (i.player.flying) {
                      n.Player.landFly(i.player, i.map);
                      E();
                    }
                    i.switchMap("hang_dong_co", { tx: 14, ty: 16 });
                  } });
              }
              else {
                n.HUD.openDialog(a.name, "Hơi lạnh rịn ra từ khe đá. Một tầng cấm chế mỏng như màng nước chặn trước cửa — Lão Đạo Hành Cước đứng gần đây hẳn biết cách mở.");
              }
            }
            else {
              var t = n.realmById(e.HANG_DONG_REALM_MIN);
              n.HUD.openDialog(a.name, "Hơi lạnh rịn ra từ khe đá. Ngươi vừa đưa tay tới thì một tầng cấm chế mỏng như màng nước bật lên, hất ngược lại tê rần cả cánh tay.\n\nĐạo hạnh chưa tới thì cấm chế này không cách nào lay chuyển — nghe nói phải " + (t ? t.name : "Luyện Khí Tầng 7") + " trở lên mới bước qua nổi.");
            }
          }(a);
          break;
        case "bi_tich_prop":
          !function (a) {
            var e = n.Quest;
            var t = n.Inventory;
            if (e.flags.bi_tich_nhan_viec) {
              if (t.has(e.MANH_THUONG, 1)) {
                n.HUD.openDialog(a.name, "Nửa trên quyển bí tịch ngươi đã cất kỹ trong người rồi.");
              }
              else {
                t.add(e.MANH_THUONG, 1);
                a.hidden = !0;
                n.Progress.markHarvested(a.id);
                n.VFX.spawnText(a.x, a.y - 26, "+1 Mảnh Bí Tịch · Thượng", "#f0d27a");
                n.VFX.spawnRing(a.x, a.y - 6, "#f0d27a", 20, .5);
                dn();
              }
            }
            else {
              n.HUD.openDialog(a.name, "Một xấp giấy ố vàng nằm ngay ngắn trên án, gáy khâu chỉ đã mục. Nét chữ chu sa dày đặc nhưng ngươi đọc mà chẳng hiểu gì — chưa ai chỉ cho ngươi cách đọc thứ này.");
            }
          }(a);
          break;
        case "cave_chest":
          !function (a) {
            var e = n.Quest;
            if (e.flags.hang_dong_da_lay_ruong) {
              a.variant = 1;
              return void n.HUD.openDialog(a.name, "Nắp rương đã mở. Bên trong chỉ còn mùi linh thảo thanh mát vương trên lớp vải lót cũ.");
            }
            if (e.hasHangDongKey()) {
              var t = e.claimHangDongChest();
              if (t) {
                a.variant = 1;
                n.Audio.play("chest");
                n.HUD.setCaption(null);
                n.VFX.spawnRing(a.x, a.y - 12, "#f0d27a", 38, .9);
                n.VFX.spawnText(a.x, a.y - 48, "Đủ nguyên liệu Phá Cảnh Đan!", "#e8d4ff");
                dn();
                n.HUD.openDialog("Linh Dược Rương Đã Mở", "Hạch đá vừa chạm ổ khoá thì tắt lịm, xích đá rơi xuống thành bụi. Trong rương, ba hộp ngọc vẫn giữ nguyên linh khí: Bích Vân Diệp xanh như mây, Long Huyết Thảo đỏ ánh kim và những hạt Linh Thúy trong vắt — đúng một lò Phá Cảnh Đan (cửa Tầng 7 → 8)." + (e.stage !== e.FORGE_STAGE || e.flags.ren_vu_khi_chinh ? "" : "\n\nViệc kế: mang 2 Huyền Thiết Khoáng về Thợ Rèn trong làng rèn một vũ khí."), { reward: t.map(function (a) {
                    var e = n.ITEMS[a.id];
                    return { icon: e.icon, name: e.name, qty: a.qty };
                  }) });
              }
            }
            else {
              n.HUD.openDialog(a.name, "Ba vòng xích đá quấn quanh rương, mối xích chụm lại ở một ổ khoá lõm hình cầu. Cái lõm ấy vừa đúng một hạch đá — thứ nằm trong lớp giáp Thạch Giáp Yêu giữa hang.");
            }
          }(a);
          break;
        case "bamboo_shoot_prop":
          e = a;
          n.Inventory.add("mang_truc", 1);
          e.hidden = !0;
          e.regrowAt = n.Game.time + 90;
          n.Progress.markHarvested(e.id);
          n.VFX.spawnText(e.x, e.y - 26, "+1 Măng Trúc Xanh", "#bff3d8");
          n.VFX.spawnRing(e.x, e.y - 6, "#8ec971", 18, .5);
          break;
        case "ling_chi_prop":
          !function (n) {
            ka(n, "nam_linh_chi", "#f0a080");
          }(a);
          break;
        case "seed_bamboo_prop":
          oa(a);
          break;
        case "co_thu_linh_moc":
          !function (a) {
            if (n.Quest.chopAvailable(a.chopTask) || ha()) {
              oa(a);
            }
            else {
              n.HUD.openDialog(a.name, "Cây đại thụ choán cả góc thung, gốc bạnh thành mấy múi rễ nổi to bằng người ôm, vỏ nứt dọc như da trâu già. Trong kẽ tán, linh khí đọng lại thành từng vệt sáng xanh rồi rịn ra bay lên, mát rượi cả một khoảng đất.\n\nRễ nó ăn trúng mạch linh khí dưới lòng thung, hút suốt mấy trăm năm nên đến cành khô trên tán cũng còn dược tính. Đại Phu dặn: bổ dao cho cành khô rụng thì được, chớ phạm vào phần gỗ còn sống.");
            }
          }(a);
          break;
        case "mach_han_tinh":
          ka(a, "han_tinh_thach", "#a9e8ff");
          break;
        case "mach_tu_tinh":
          ka(a, "tu_tinh_thach", "#d9b6ff");
          break;
        case "mach_luc_tinh":
          ka(a, "luc_tinh_thach", "#b8ffb0");
          break;
        case "phong_tinh_mach":
          ka(a, "phong_tinh_thach", "#9df0fb");
          break;
        case "phong_linh_thao":
          ka(a, "phong_linh_thao", "#bdf0c2");
          break;
        case "herb_plot":
          !function (a) {
            var e = n.Farm;
            var t = n.Quest;
            var o = n.Inventory;
            var h = i.player;
            var c = a.id;
            if (t.stage < 8 && e.isEmpty(c)) {
              n.HUD.openDialog(a.name, "Luống đất đã xới tơi, còn hằn vết cuốc mới. Bên mép luống cắm hai cọc tre nhỏ đánh dấu.\n\nVườn thuốc của người ta, chưa được chủ vườn gật đầu thì chớ có gieo bừa xuống.");
            }
            else {
              if (e.ready(c)) {
                var r = e.seedDef(e.plot(c).seed);
                var u = e.harvest(c);
                var l = u && n.ITEMS[u];
                e.syncProps(i.map);
                var s = function (a) {
                  var e = n.ObjectArt.defs.herb_plot;
                  return a && e && e.glow && e.glow[a.art] || "#cfeba8";
                }(r);
                n.VFX.spawnText(a.x, a.y - 30, "+1 " + (l ? l.name : "Linh thảo"), "#bff3d8");
                n.VFX.spawnRing(a.x, a.y - 6, s, 22, .5);
                n.VFX.spawnChips(a.x, a.y - 16, 10, "#3f5f2a", s, a.y);
                n.VFX.spawnLeaves(a.x, a.y - 26, 4, 12, a.y);
                if (l && l.icon) {
                  n.VFX.spawnItemPop(a.x, a.y - 40, l.icon);
                }
                return void dn();
              }
              if (e.isEmpty(c)) {
                var g = e.seedsInBag();
                if (g.length) {
                  n.HUD.openDialog(a.name, "Chọn loại hạt muốn gieo:", { choices: g.map(function (t) {
                      var o = n.ITEMS[t.def.seed];
                      return { label: "Gieo " + (o ? o.name : t.def.seed) + "  ×" + t.qty, icon: o ? o.icon : null, onChoose: function () {
                          if (e.sow(c, t.def.seed)) {
                            e.syncProps(i.map);
                            n.VFX.spawnText(a.x, a.y - 26, "Đã gieo hạt", "#bff3d8");
                            n.VFX.spawnRing(a.x, a.y - 4, "#a99070", 16, .4);
                            n.VFX.spawnChips(a.x, a.y - 8, 6, "#5c4526", "#a99070", a.y);
                            n.HUD.updateQuest();
                          }
                        } };
                    }) });
                }
                else {
                  n.VFX.spawnText(h.x, h.y - 52, "Hết hạt — tìm Đại Phu nhận việc", "#c9a45c");
                }
              }
              else {
                if (e.canWater(c)) {
                  var p = e.hasWaterAccess && e.hasWaterAccess();
                  var d = o.has("linh_tuyen_thuy", 1);
                  if (!p && !d) {
                    return void n.VFX.spawnText(a.x, a.y - 30, "Tới Hồ Nước múc nước một lần", "#9fd8ea");
                  }
                  if (!e.water(c)) {
                    return;
                  }
                  if (!(p)) {
                    o.remove("linh_tuyen_thuy", 1);
                  }
                  e.syncProps(i.map);
                  n.VFX.spawnRipple(a.x, a.y - 4, "#7fc0d3");
                  n.VFX.spawnChips(a.x, a.y - 30, 7, "#4f9fb8", "#bfeaf5", a.y - 4);
                  n.VFX.spawnText(a.x, a.y - 30, "Đã tưới — còn " + e.remain(c) + "s", "#9fd8ea");
                  return void n.HUD.updateQuest();
                }
                n.VFX.spawnText(a.x, a.y - 30, "Còn " + e.remain(c) + "s nữa mới tới tuổi thuốc", "#e8dfa0");
              }
            }
          }(a);
          break;
        case "clue_prop":
          !function (a) {
            if (6 === n.Quest.stage) {
              n.Progress.markHarvested(a.id);
              a.hidden = !0;
              n.VFX.spawnText(a.x, a.y - 26, "+1 Manh Mối", "#e8dfa0");
              n.VFX.spawnRing(a.x, a.y - 6, "#f0d27a", 18, .5);
              dn();
            }
            else {
              n.VFX.spawnText(a.x, a.y - 26, "Chưa tới lúc", "#c8c0a0");
            }
          }(a);
          break;
        case "herb":
          !function (a) {
            var e = n.Quest;
            var t = n.Inventory;
            var o = i.player;
            if (e.stage < 2) {
              n.HUD.openDialog("Khóm Cỏ Dại", "Một khóm cỏ ba lá, lá xanh nhạt viền trắng, mọc chen giữa đám cỏ dại nơi đất ẩm. Ngươi chưa biết nó dùng để làm gì.");
            }
            else if (t.count("tay_ue_thao") >= e.NEED_HERB) {
              n.VFX.spawnText(o.x, o.y - 52, "Đã đủ ba ngọn", "#c9a45c");
            }
            else {
              t.add("tay_ue_thao", 1);
              a.hidden = !0;
              a.regrowAt = n.Game.time + 90;
              n.Progress.markHarvested(a.id);
              var h = t.count("tay_ue_thao");
              var c = 2 === e.stage ? " · " + h + "/" + e.NEED_HERB : "";
              n.VFX.spawnText(a.x, a.y - 26, "+1 Tẩy Uế Thảo" + c, "#bff3d8");
              n.VFX.spawnRing(a.x, a.y - 6, "#cfeba8", 18, .5);
              dn();
            }
          }(a);
          break;
        case "spring":
          !function (a) {
            var e = n.Quest;
            var t = n.Inventory;
            if (10 === e.stage && t.has("tu_khi_duoc")) {
              wa(a);
            }
            else {
              n.HUD.openDialog(a.name, "Mạch nước rỉ ra từ khe đá, theo ống tre cũ chảy xuống một bồn đá nhỏ. Nước trong đến mức nhìn rõ từng hạt sạn dưới đáy, hơi lạnh phả lên mặt.");
            }
          }(a);
          break;
        case "cauldron":
          !function (a) {
            var e = n.Quest;
            var t = n.Inventory;
            if (t.has("tay_tuy_thang")) {
              n.HUD.openDialog(a.name, "Thang thuốc đã sắc xong, đang đựng trong bát sành mang theo người. Giờ chỉ còn việc ra đài đá bên suối mà đả tọa.");
            }
            else if (e.stage < 3) {
              n.HUD.openDialog(a.name, "Một chiếc đan lô bằng gang đã cũ, bụng lô khắc hoa văn bát quái mờ hết nét. Trong lò còn vài cục than chưa tàn hẳn.\n\n" + (2 === e.stage ? "Cần đủ " + e.NEED_HERB + " ngọn Tẩy Uế Thảo mới sắc được. Đang có " + t.count("tay_ue_thao") + " ngọn." : "Ngươi chưa biết nên nấu thứ gì trong đó."));
            }
            else {
              var o = n.Quest.brewList();
              if (o.length) {
                var h = Math.max(0, Math.ceil(i.brewCooldownUntil - n.Game.time));
                if (n.DanLoUI) {
                  n.DanLoUI.open(a, o, h, function (e) {
                    i.brewing = { t: 0, prop: a, acc: 0, make: e.id };
                    n.HUD.setCaption(e.caption);
                  });
                }
                else {
                  n.HUD.openDialog(a.name, "Một chiếc đan lô bằng gang đã cũ, bụng lô khắc hoa văn bát quái mờ hết nét.\n" + (h > 0 ? "Lò còn nóng, chờ thêm " + h + " giây nữa mới nhóm lại được.\n" : "") + "\nChọn đan phương muốn luyện:", { choices: o.map(function (o) {
                      var c;
                      var r = o.needItem && !t.has(o.needItem);
                      var u = !e.hasRecipe(o.recipe);
                      c = r ? "Cần " + o.needItemName : o.recipe.map(function (a) {
                        var e = n.ITEMS[a.id];
                        return (e ? e.name : a.id) + " " + n.Inventory.count(a.id) + "/" + a.qty;
                      }).join(" · ") + (u ? " — còn thiếu" : "") + " · " + o.note;
                      return { label: o.name, note: c, icon: o.icon, disabled: r || u || o.repeat && h > 0, onChoose: function () {
                          i.brewing = { t: 0, prop: a, acc: 0, make: o.id };
                          n.HUD.setCaption(o.caption);
                        } };
                    }) });
                }
              }
              else {
                n.HUD.openDialog(a.name, "Lò còn ấm than, nhưng lúc này ngươi chưa có đan phương nào để nhóm lửa.");
              }
            }
          }(a);
          break;
        case "meditate_stone":
          An(a);
          break;
        case "khu_board":
          if (n.KhuUI) {
            n.KhuUI.open();
          }
          break;
        case "rank_board":
          if (n.XepHangUI) {
            n.XepHangUI.open();
          }
          break;
        case "world_map_board":
          if (n.WorldMap && !n.WorldMap.open) {
            n.WorldMap.show();
          }
          break;
        default: n.HUD.openDialog(a.name, "");
      }
    }
  }
  function dn(a) {
    var e = n.Quest;
    var t = !1;
    for (e.markLinhThuy(); e.isActive() && e.autoAdvances() && e.stageComplete();)
      e.advance(), t = !0, !1 !== a && n.VFX.spawnText(i.player.x, i.player.y - 58, "Nhiệm vụ cập nhật", "#e8dfa0");
    if (t) {
      (function () {
        if (!h()) {
          var a;
          var e;
          var t;
          var o;
          var c = i.map.enemySpawns || [];
          for (a = 0; a < c.length; a++)
            if (y(t = c[a])) {
              for (o = !1, e = 0; e < i.enemies.length; e++)
                if (i.enemies[e].id === t.id) {
                  o = !0;
                  break;
                }
              if (!(o)) {
                i.enemies.push(n.Enemy.create(t));
                n.VFX.spawnRing(t.x, t.y - 10, "#bff3d8", 26, .6);
              }
            }
        }
      })();
    }
    n.HUD.updateQuest();
  }
  function yn(a) {
    var e = n.Skills;
    var t = n.ITEMS[a];
    var o = e.byBook(a);
    var h = e.passiveByBook(a);
    var c = null;
    if (o) {
      c = "ST " + (e.dmgOf ? e.dmgOf(o) : 0) + (o.shots > 1 ? " (" + o.shots + " viên)" : "") + " · " + o.mp + " LL · Hồi " + o.cooldown + "s";
    }
    else {
      if (h) {
        c = h.mp + " LL · Hồi " + h.cooldown + "s";
      }
    }
    return { label: t.name, icon: t.icon, note: o ? o.element + " hệ · Công kích" : h ? h.element + " hệ · Bị động" : "Nền tảng", stats: c, desc: o ? o.tip : h ? h.tip : null, onChoose: function () {
        !function (a) {
          var e = n.Quest;
          var t = n.ITEMS[a];
          var o = n.Skills.byBook(a);
          var h = n.Skills.passiveByBook(a);
          var c = t.desc;
          c += o ? '\n\n"Học xong thì bấm phím 2 mà thi triển." — ' + o.tip + "\n\nHao mỗi lần: " + o.mp + " Linh Lực, " + o.sp + " Thần Thức. Hồi chiêu " + o.cooldown + " giây." : h ? '\n\n"Không cần kết ấn. Khí Huyết vừa bị uy hiếp là pháp quyết tự vận." — ' + h.tip + "\n\nTự hao mỗi lần: " + h.mp + " Linh Lực. Hồi lại sau " + h.cooldown + " giây; không chiếm phím pháp thuật." : '\n\n"Quyển này không dạy chiêu nào cả. Nó dạy cái nền — thiếu nền thì chiêu nào cũng chỉ là múa tay."';
          n.HUD.openDialog(t.name, c, { actionLabel: "Nhận Quyển Này", onAction: function () {
              if (e.finishBiTichQuest(a)) {
                n.VFX.spawnText(i.player.x, i.player.y - 58, "Nhận " + t.name, "#f0d27a");
                n.VFX.spawnRing(i.player.x, i.player.y - 12, "#f0d27a", 34, .7);
                if (o) {
                  n.VFX.spawnText(i.player.x, i.player.y - 74, "Học được " + o.name, o.colors.glow);
                }
                else {
                  if (h) {
                    n.VFX.spawnText(i.player.x, i.player.y - 74, "Lĩnh ngộ bị động: " + h.name, h.colors.glow);
                  }
                }
                dn();
              }
            }, reward: [{ icon: t.icon, name: t.name, qty: 1 }] });
        }(a);
      } };
  }
  function mn(a) {
    var e = n.Food;
    var t = n.Talismans;
    if (n.AppearanceShop, n.HongTyUI) {
      n.HongTyUI.open(a, { cfg: function () {
          return i.player && i.player.cfg;
        }, buyFood: wn, eat: Cn, buyTalisman: kn, openAppearance: function () {
          n.HUD.closeDialog();
          _n(a.name);
        } });
    }
    else {
      var o;
      var h = e.SHOP.map(function (t) {
        var i = n.ITEMS[t.id];
        var o = e.remaining(t.id);
        var h = t.cost + " Linh Thạch/phần · hiệu lực " + i.food.hours + " giờ";
        if (o > 0) {
          h = "Đang no — còn " + e.fmtLeft(o) + " · " + h;
        }
        return { label: i.name, note: h, icon: i.icon, onChoose: function () {
            !function (a, e) {
              var t = n.Food;
              var i = n.ITEMS[e.id];
              var o = i.food;
              var h = t.remaining(e.id);
              var c = i.desc + "\n\nĂn xong no " + o.hours + " giờ đồng hồ THẬT — thoát ra rồi vào lại vẫn còn. Trong lúc ấy mỗi giây hồi " + o.hpPct + "% Khí Huyết tối đa, " + o.mp + " Linh Lực và " + o.bp + " Giáp, kể cả đang chạy hay đang đánh nhau.\n\nGiá: " + e.cost + " Linh Thạch một phần. Trong túi đang có " + n.Inventory.count(e.id) + " phần." + (e.perDay ? "\nHôm nay còn mua được " + t.leftToday(e.id) + "/" + e.perDay + " phần." : "") + (h > 0 ? "\nĐang no, còn " + t.fmtLeft(h) + " nữa." : "");
              var r = t.PACKS.map(function (a) {
                return { label: "Mua " + a + " phần", note: e.cost * a + " Linh Thạch", icon: i.icon, disabled: (0 | n.Progress.stones) < e.cost * a || a > t.leftToday(e.id), onChoose: function () {
                    wn(e, a);
                  } };
              });
              if (n.Inventory.has(e.id, 1)) {
                r.push({ label: "Ăn Ngay Một Bát", note: h > 0 ? "Cộng dồn vào phần còn lại" : "Bắt đầu hiệu lực " + o.hours + " giờ", icon: i.icon, onChoose: function () {
                    Cn(e.id);
                  } });
              }
              n.HUD.openDialog(i.name, c, { choices: r });
            }(a.name, t);
          } };
      });
      h.push({ label: "Tủ Ngoại Hình", note: (o = i.player && i.player.cfg, n.AppearanceShop.CATEGORIES.reduce(function (a, e) {
          return a + n.AppearanceShop.options(e.field, o || {}).length;
        }, 0) + " mẫu · 1 Linh Thạch mỗi lần đổi · không cộng chỉ số"), onChoose: function () {
          _n(a.name);
        } });
      var c = n.PhapBao ? n.PhapBao.list(n) : [];
      if (c.length) {
        h.push({ label: "Tủ Y Phục", note: c.length + " bộ y phục · " + n.PhapBao.DROP_HINT, icon: n.ITEMS[c[0].id].icon, onChoose: function () {
            !function (a) {
              var e = n.PhapBao;
              i.player;
              n.HUD.openDialog((a.name || "Hồng Tỷ") + " · Tủ Y Phục", 'Bà lão mở chiếc hòm gỗ đáy, chỉ cho xem mấy bộ bào gấp vuông vức rồi lắc đầu:\n\n"Mấy bộ này ta không bán — ngấm yêu khí rồi, chỉ Thần Thú Xích Long ở Long Uyên Cốc và Linh Hổ Trấn Sơn mới giữ được. Hạ chúng đi, may ra rơi một bộ hợp với ngươi (rồng 5%, hổ 20%). Chưa tới Luyện Khí tầng 7 thì giữ nếp bào không nổi."', { choices: e.list(n).map(function (a) {
                  var e = n.ITEMS[a.id];
                  var t = [e.hpBonus ? "+" + e.hpBonus + " Khí Huyết" : "", e.mpBonus ? "+" + e.mpBonus + " Linh Lực" : "", e.bpBonus ? "+" + e.bpBonus + " Giáp" : "", e.resistBonus ? "Kháng hiệu ứng +" + Math.round(100 * e.resistBonus) + "%" : ""].filter(Boolean).join(" · ");
                  return { label: e.name, note: t + " · ô Áo · rơi từ Xích Long (0,5%) / Linh Hổ Trấn Sơn (1%)", icon: e.icon, disabled: !0 };
                }) });
            }(a);
          } });
      }
      h.push({ label: "Quầy Phù Chú", note: t.SHOP.length + " lá phù · từ " + n.Talismans.SHOP.reduce(function (n, a) {
          return a.cost < n ? a.cost : n;
        }, 1 / 0) + " Linh Thạch một lá", icon: n.ITEMS[t.defOf(t.SHOP[0].id).item].icon, onChoose: function () {
          !function (a) {
            var e = n.Talismans;
            var t = n.Quest;
            var i = e.SHOP.map(function (a) {
              var t = e.defOf(a.id);
              var i = n.ITEMS[t.item];
              return { label: t.name, note: a.cost + " Linh Thạch/lá · trong túi có " + n.Inventory.count(t.item) + " lá", icon: i.icon, onChoose: function () {
                  !function (a) {
                    var e = n.Talismans;
                    var t = e.defOf(a.id);
                    var i = n.ITEMS[t.item];
                    var o = i.desc + "\n\n" + t.tip + "\nHồi chiêu " + t.cooldown + " giây. Ngũ hành: " + t.element + ".\n\nGiá: " + a.cost + " Linh Thạch một lá. Trong túi đang có " + n.Inventory.count(t.item) + " lá.";
                    var h = e.PACKS.map(function (e) {
                      return { label: "Mua " + e + " lá", note: a.cost * e + " Linh Thạch", icon: i.icon, disabled: (0 | n.Progress.stones) < a.cost * e, onChoose: function () {
                          kn(a, e);
                        } };
                    });
                    n.HUD.openDialog(t.name, o, { choices: h });
                  }(a);
                } };
            });
            n.HUD.openDialog(a + " · Quầy Phù Chú", 'Bà lão mở nắp tráp. Giấy vàng xếp thành từng xấp mỏng, nét chu sa còn tươi, sờ vào thấy rít tay.\n\n"Đốt một lá là mất một lá, đừng tiếc mà chết uổng. Mua sẵn đi — lúc cần thì không ai chạy về đây kịp đâu."\n\nLinh Thạch đang có: ' + t.biTichStones() + " viên.", { choices: i });
          }(a.name);
        } });
      n.HUD.openDialog(a.name, "Cơm, ngoại hình, y phục và phù chú — chọn món ngươi cần.", { choices: h });
    }
  }
  i.refreshQuest = function () {
    dn();
  };
  var fn = { tieu_su: { tieuDe: "Tiểu Sử Cõi Tu Tiên", trang: ["Mồng 5 tháng 9 năm 2026, nén hương đầu tiên được thắp dưới chân núi Tản Viên. tutien2d khai sơn từ đó.\n\nBuổi đầu chỉ có một ngôi làng, một con suối, một lối mòn lên núi. Phàm nhân bước vào, hái thuốc, luyện khí, rèn kiếm, rồi tự hỏi đạo của mình ở đâu.", "Từ đó đường mở dần: thành Thăng Long, Long Uyên Cốc, Mỏ Linh Thạch, những bí cảnh phải kết bạn mới qua nổi.\n\nTông môn tranh phong, chính tà phân lộ, Đại Hội luận võ mỗi ngày một náo nhiệt. Cõi này vẫn đang lớn — và đạo hữu đang viết thêm vào lai lịch của nó."] }, nguoi_lam: { tieuDe: "Người Dựng Cõi Này", trang: ["Ta là Mạnh ShopT1, tục danh Hà Đức Mạnh — kẻ dựng nên cõi này.", "Năm 2018 ta lập ShopT1, nơi tụ hội hàng trăm nghìn game thủ. Dẫn một đội cốt cán cùng gần trăm cộng tác viên, ta chỉ giữ ba chữ: Minh Bạch, Cộng Đồng, Đồng Hành.\n\nNay ta đem chừng ấy kinh nghiệm dựng một cõi tu tiên công bằng, rõ ràng. Có góp ý gì, cứ nói thẳng với ta."] } };
  function Tn(a) {
    var e = n.DiemDanh;
    var t = e.daNhan(n);
    var o = e.tong(n);
    var c = n.ITEMS.linh_thach;
    n.HUD.openDialog(a.name || "Mạnh ShopT1", t ? ("Rem" === a.name ? "Rem khẽ nâng vạt tạp dề, cúi chào:" : "Người đội mão vàng giơ hai ngón cái, cười:") + '\n\n"Hôm nay đạo hữu lĩnh lộ phí rồi. Mai quay lại nhé — hoặc ngồi xuống nghe ta kể chuyện."' : ("Rem" === a.name ? "Rem khẽ nâng vạt tạp dề, cúi chào:" : "Người đội mão vàng giơ hai ngón cái, cười:") + '\n\n"Đạo hữu tới đúng lúc. Mỗi ngày ghé ta một lần, ta phát ' + e.LINH_THACH + ' Linh Thạch lộ phí."', { choices: [{ label: "Điểm Danh Hôm Nay", note: t ? "Hôm nay đã nhận · mai quay lại" + (o ? " · đã điểm danh " + o + " ngày" : "") : "+" + e.LINH_THACH + " Linh Thạch · mỗi ngày một lần" + (o ? " · đã điểm danh " + o + " ngày" : ""), icon: c && c.icon, disabled: t, onChoose: function () {
            !function (a) {
              var e = n.DiemDanh;
              var t = i.player;
              function o(i) {
                if (!i || !i.ok) {
                  n.Audio.play("deny");
                  return void n.HUD.setCaption("Chưa điểm danh được: " + (i && i.why || "máy chủ từ chối"));
                }
                if (h() && !e.daNhan(n)) {
                  n.Quest.flags[e.FLAG] = { ngay: e.ngayVN(), tong: e.tong(n) + 1 };
                }
                n.Audio.play("coin");
                n.VFX.spawnRing(a.x, a.y - 18, "#f0c454", 26, .5);
                if (t) {
                  n.VFX.spawnText(t.x, t.y - 52, "+" + e.LINH_THACH + " Linh Thạch", "#8fe0e6");
                }
                if (n.HUD.refreshBag) {
                  n.HUD.refreshBag();
                }
                var o = n.ITEMS.linh_thach;
                n.HUD.openDialog(a.name || "Mạnh ShopT1", "Điểm danh ngày thứ " + e.tong(n) + ". Linh thạch lộ phí đã vào túi — mai ghé lại nhé.", { reward: [{ icon: o && o.icon, name: "Linh Thạch", qty: e.LINH_THACH }], choices: [{ label: fn.tieu_su.tieuDe, onChoose: function () {
                        vn(a, "tieu_su", 0);
                      } }, { label: fn.nguoi_lam.tieuDe, onChoose: function () {
                        vn(a, "nguoi_lam", 0);
                      } }] });
              }
              if (h()) {
                n.Gateway.cmd("diemdanh", {}, o);
              }
              else {
                o(e.nhan(n));
              }
            }(a);
          } }, { label: fn.tieu_su.tieuDe, note: "tutien2d từ đâu mà có", onChoose: function () {
            vn(a, "tieu_su", 0);
          } }, { label: fn.nguoi_lam.tieuDe, note: "Mạnh ShopT1 là ai", onChoose: function () {
            vn(a, "nguoi_lam", 0);
          } }].concat(n.PhiPhong && n.PhiPhong.luaChonRem ? [n.PhiPhong.luaChonRem(a)] : []) });   // Nghịch Tiên: phi phong ở chỗ Rem
  }
  function vn(a, e, t) {
    var i = fn[e];
    var o = [];
    if (t + 1 < i.trang.length) {
      o.push({ label: "Nghe Tiếp", note: "Trang " + (t + 2) + "/" + i.trang.length, onChoose: function () {
          vn(a, e, t + 1);
        } });
    }
    o.push({ label: "Quay Lại", onChoose: function () {
        Tn(a);
      } });
    n.HUD.openDialog((a.name || "Mạnh ShopT1") + " · " + i.tieuDe, i.trang[t], { choices: o });
  }
  function xn(a, e) {
    var t;
    var i = e.id;
    if ("outfit" === a) {
      return (t = n.Palette.OUTFIT[i]) ? t.name : i;
    }
    if ("hairColor" === a) {
      return (t = n.Palette.HAIR[i]) ? t.name : i;
    }
    if ("skin" === a) {
      return (t = n.Palette.SKIN[i]) ? t.name : i;
    }
    if ("eyeColor" === a) {
      var o = n.CharArt.EYES[i];
      return o ? o.name : i;
    }
    return e.name || i;
  }
  var bn = { wired: !1, category: null, selected: null, busy: !1, vendor: "" };
  function _n(e) {
    var o = n.AppearanceShop;
    bn.vendor = e || "Hồng Tỷ";
    bn.category = bn.category || o.CATEGORIES[0];
    bn.selected = null;
    bn.busy = !1;
    if (!(bn.wired)) {
      bn.wired = !0;
      t.$("#appearance-x").addEventListener("click", Dn);
      t.$("#appearance-reset").addEventListener("click", function () {
        bn.selected = null;
        t.$("#appearance-status").textContent = "";
        Hn();
      });
      t.$("#appearance-apply").addEventListener("click", function () {
        if (bn.selected) {
          (function (e, o) {
            var h = i.player;
            var c = n.AppearanceShop;
            if (h && h.cfg && !bn.busy) {
              bn.busy = !0;
              t.$("#appearance-status").className = "appearance-status working";
              t.$("#appearance-status").textContent = "Hồng Tỷ đang sửa soạn " + xn(e.field, o) + "…";
              Hn();
              var r = n.Gateway;
              if (r && r.configured && r.configured()) {
                return r.connected && r.ready ? void r.cmd("appearance.buy", { field: e.field, value: o.id }, u) : void u({ ok: !1, why: "mất kết nối tới máy chủ" });
              }
              u(c.buy(e.field, o.id, n, h.cfg));
            }
            function u(i) {
              if (bn.busy = !1, !i || !i.ok) {
                n.Audio.play("deny");
                n.VFX.spawnText(h.x, h.y - 52, i && i.why || "Không đổi được", "#c9a45c");
                t.$("#appearance-status").className = "appearance-status error";
                var c = i && i.why || "Không đổi được. Hãy thử lại.";
                t.$("#appearance-status").textContent = "lệnh không có trong bảng" === c ? "Máy chủ chưa cập nhật Tủ Ngoại Hình. Hãy thử lại sau." : c;
                return void Hn();
              }
              var r = i.appearance || t.store.get(a.STORAGE_KEY, null) || {};
              (r = Object.assign({}, r))[i.field] = i.value;
              t.store.set(a.STORAGE_KEY, r);
              if (void 0 !== i.stones) {
                n.Progress.stones = 0 | i.stones;
              }
              h.cfg[i.field] = i.value;
              bn.selected = null;
              if (h.refreshSheet) {
                h.refreshSheet();
              }
              n.Audio.play("coin");
              if ("aura" === i.field) {
                n.Audio.play("aura_activate");
              }
              n.VFX.spawnText(h.x, h.y - 52, xn(e.field, o) + " · -" + i.cost + " Linh Thạch", "#f0d27a");
              t.$("#appearance-status").className = "appearance-status success";
              t.$("#appearance-status").textContent = "Đã thay " + xn(e.field, o) + " · còn " + (0 | n.Progress.stones) + " Linh Thạch";
              Hn();
            }
          })(bn.category, bn.selected);
        }
      });
      t.$("#appearance-shop").addEventListener("click", function (n) {
        if (n.target === t.$("#appearance-shop")) {
          Dn();
        }
      });
      document.addEventListener("keydown", function (n) {
        if (!("Escape" !== n.key || t.$("#appearance-shop").classList.contains("hidden"))) {
          Dn();
        }
      });
    }
    t.$("#appearance-title").textContent = bn.vendor + " · Tủ Ngoại Hình";
    t.$("#appearance-status").textContent = "";
    Hn();
    t.$("#appearance-shop").classList.remove("hidden");
    n.HUD.dialogOpen = !0;
    setTimeout(function () {
      t.$("#appearance-x").focus();
    }, 0);
  }
  function Dn() {
    t.$("#appearance-shop").classList.add("hidden");
    n.HUD.dialogOpen = !1;
  }
  function Hn() {
    var a = n.AppearanceShop;
    var e = i.player;
    var o = e && e.cfg || {};
    var h = bn.category || a.CATEGORIES[0];
    var c = t.$("#appearance-categories");
    c.innerHTML = "";
    a.CATEGORIES.forEach(function (n) {
      var e = a.options(n.field, o);
      var i = document.createElement("button");
      i.type = "button";
      i.className = "appearance-category" + (n.field === h.field ? " active" : "");
      i.setAttribute("aria-pressed", n.field === h.field ? "true" : "false");
      i.textContent = n.name;
      i.title = n.name + " · " + e.length + " mẫu";
      i.addEventListener("click", function () {
        !function (n) {
          bn.category = n;
          bn.selected = null;
          t.$("#appearance-status").textContent = "";
          Hn();
        }(n);
      });
      c.appendChild(i);
    });
    t.$("#appearance-stones").textContent = 0 | n.Progress.stones;
    (function (a, e) {
      var i = n.AppearanceShop;
      var o = t.$("#appearance-options");
      var h = 0 | n.Progress.stones;
      var c = i.options(a.field, e);
      var r = c.filter(function (n) {
        return e[a.field] === n.id;
      })[0] || c[0];
      var u = bn.selected || r;
      var l = !!u && e[a.field] !== u.id;
      o.innerHTML = "";
      c.forEach(function (n) {
        var i = e[a.field] === n.id;
        var h = u && u.id === n.id;
        var c = document.createElement("button");
        c.type = "button";
        c.className = "appearance-option" + (i ? " current" : "") + (h ? " selected" : "");
        c.disabled = bn.busy;
        c.setAttribute("aria-pressed", h ? "true" : "false");
        var r = document.createElement("span");
        if (r.className = "appearance-option-name", r.textContent = xn(a.field, n), c.appendChild(r), i) {
          var l = document.createElement("span");
          l.className = "appearance-option-badge";
          l.textContent = "✓";
          c.appendChild(l);
        }
        c.addEventListener("click", function () {
          bn.selected = n;
          t.$("#appearance-status").textContent = "";
          Hn();
        });
        o.appendChild(c);
      });
      var s = Object.assign({}, e);
      if (u) {
        s[a.field] = u.id;
      }
      var g = n.SpriteFactory.get(s);
      var p = t.$("#appearance-preview");
      var d = p.getContext("2d");
      d.clearRect(0, 0, p.width, p.height);
      d.imageSmoothingEnabled = !1;
      n.SpriteFactory.drawFrame(d, g, 0, 6, 52, 22, 2.8, s);
      t.$("#appearance-preview-state").textContent = l ? "Đang thử" : "Đang mặc";
      t.$("#appearance-preview-state").className = l ? "trying" : "";
      t.$("#appearance-preview-name").textContent = u ? xn(a.field, u) : "";
      var y = t.$("#appearance-reset");
      y.hidden = !l;
      y.disabled = bn.busy;
      var m = t.$("#appearance-apply");
      var f = u && i.priceOf ? i.priceOf(a.field, u.id) : i.COST;
      m.disabled = !l || h < f || bn.busy;
      m.textContent = bn.busy ? "Đang đổi…" : l ? h < f ? "Thiếu Linh Thạch" : "Đổi · " + f + " LT" : "Đang mặc";
    })(h, o);
  }
  function kn(a, e) {
    var t = n.Talismans.buy(a.id, e, n);
    var o = i.player;
    if (!t.ok) {
      n.Audio.play("deny");
      return void n.VFX.spawnText(o.x, o.y - 52, t.why, "#c9a45c");
    }
    n.Audio.play("coin");
    n.VFX.spawnText(o.x, o.y - 52, "+" + e + " " + n.ITEMS[t.itemId].name, "#f0d27a");
    n.HUD.renderBag();
  }
  function wn(a, e) {
    var t = n.Food.buy(a.id, e, n);
    var o = i.player;
    if (!t.ok) {
      n.Audio.play("deny");
      return void n.VFX.spawnText(o.x, o.y - 52, t.why, "#c9a45c");
    }
    n.Audio.play("coin");
    n.VFX.spawnText(o.x, o.y - 52, "+" + e + " " + n.ITEMS[a.id].name, "#f0d27a");
    n.HUD.renderBag();
  }
  function Cn(a) {
    var e = n.Food.eat(a, n);
    var t = i.player;
    if (!e.ok) {
      n.Audio.play("deny");
      return void n.VFX.spawnText(t.x, t.y - 52, e.why, "#c9a45c");
    }
    if (n.Audio.play("heal"), n.VFX.spawnRing(t.x, t.y - 6, "#f4efe0", 26, .5), n.VFX.spawnText(t.x, t.y - 52, "Ấm bụng — no " + e.hours + " giờ", "#bff3d8"), e.replaced && e.replaced.length) {
      var o = e.replaced.map(function (a) {
        return n.ITEMS[a] ? n.ITEMS[a].name : a;
      }).join(", ");
      n.VFX.spawnText(t.x, t.y - 70, "Mất hiệu lực " + o, "#c9a45c");
    }
    n.HUD.renderBag();
    dn(!1);
  }
  function Ln() {
    for (var n = !!i.fishingAuto, a = [t.$("#btn-fishing-stop"), t.$("#btn-fishing-stop-touch")], e = 0; e < a.length; e++) {
      var o = a[e];
      if (o) {
        o.classList.toggle("hidden", !n);
        o.classList.toggle("active", n);
        o.setAttribute("aria-pressed", n ? "true" : "false");
      }
    }
  }
  function In() {
    var a = !(!i.fishing && !i.fishingAuto);
    i.fishing = null;
    i.fishingAuto = !1;
    if (n.HUD) {
      n.HUD.setCaption(null);
    }
    Ln();
    if (a && i.player) {
      i.player.stop();
      i.player.state = "idle";
    }
  }
  function Mn(a, o) {
    var h = i.player;
    if (h && !i.fishing && n.Fishing) {
      if (ca(), i.approach = null, h.flying) {
        if (!n.Player.landFly(h, i.map)) {
          n.Audio.play("deny");
          return void n.VFX.spawnText(h.x, h.y - 52, "Bên dưới không có chỗ đặt chân", "#c9a45c");
        }
        E();
      }
      n.Player.stand(h);
      h.stop();
      h.state = "idle";
      h.animTime = 0;
      var c = function (n, a) {
        var o = i.map;
        if (!o || !o.groundName) {
          return { x: n.x, y: n.y };
        }
        for (var h = Math.floor(n.x / e), c = Math.floor(n.y / e), r = null, u = 1 / 0, l = Math.max(0, c - 3); l <= Math.min(o.height - 1, c + 3); l++)
          for (var s = Math.max(0, h - 3); s <= Math.min(o.width - 1, h + 3); s++)
            if ("water" === o.groundName[l * o.width + s]) {
              var g = s * e + e / 2;
              var p = l * e + e / 2;
              var d = t.dist(a.x, a.y, g, p) + .25 * t.dist(n.x, n.y, g, p);
              if (d < u) {
                u = d;
                r = { x: g, y: p };
              }
            }
        return r || { x: n.x, y: n.y };
      }(a, h);
      q(h, c.x - h.x, c.y - h.y);
      i.fishing = { t: 0, duration: n.Fishing.waitTime(), bobX: c.x, bobY: c.y, waterName: a.title || a.name || "Bờ Nước", prop: a, auto: !!o };
      i.fishingAuto = !!o;
      Ln();
      n.Audio.play("fishing_cast", { rate: .94 + .12 * Math.random() });
      n.VFX.spawnRipple(i.fishing.bobX, i.fishing.bobY, "#9fd8ea");
      n.HUD.setCaption(o ? "Đã bật tự động câu · chờ cá cắn câu" : "Đã thả mồi · chờ cá cắn câu");
    }
  }
  function Un(a, e) {
    var t = !(!a.auto || !i.fishingAuto);
    !function (a, e) {
      var t = i.player;
      if (n.VFX.spawnRipple(a.bobX, a.bobY, e ? "#bff3d8" : "#7fc0d3"), !e) {
        n.Audio.play("fishing_bite", { rate: .94 + .12 * Math.random() });
        return void n.VFX.spawnText(t.x, t.y - 54, "Cá rỉa mất mồi", "#c9a45c");
      }
      var o = n.ITEMS[e];
      var h = "linh_ngu" === e;
      n.Audio.play("fishing_catch", { rate: h ? 1.08 : .98 });
      n.VFX.spawnItemPop(t.x, t.y - 56, o.icon);
      n.VFX.spawnText(t.x, t.y - 38, "+1 " + o.name, h ? "#8ff5df" : "#b9d7df");
      if (h) {
        n.VFX.spawnRing(t.x, t.y - 12, "#8ff5df", 26, .6);
      }
      if (n.Quest.seedTaskInfo() && n.Quest.recordFishingCatch(e) && n.Quest.seedQuestComplete()) {
        n.VFX.spawnText(t.x, t.y - 74, "Đã đủ cá — về giao Đại Phu", "#f0d27a");
      }
      n.HUD.updateQuest();
    }(a, e);
    if (!t || n.Input.hasManualMove && n.Input.hasManualMove() || n.Input.tap) {
      if (t) {
        In();
      }
    }
    else {
      Mn(a.prop, !0);
    }
  }
  function An(a) {
    var e = n.Quest;
    var t = n.Inventory;
    var o = i.player;
    if (a.__boQuaTamKiep || !n.HacThiUI || !n.HacThiUI.chanDaiDa(a, function () {
      a.__boQuaTamKiep = !0;
      try {
        An(a);
      }
      finally {
        a.__boQuaTamKiep = !1;
      }
    }))
      if (10 === e.stage && t.has("tu_khi_duoc")) {
        wa(a);
      }
      else {
        if (13 === e.stage && o.canMeditate && !n.Player.isFull(o) && !t.has("tay_tuy_thang")) {
          n.VFX.spawnText(o.x, o.y - 64, "Chưa đủ Đạo Hạnh — đả tọa tại đây hoặc đi săn quái", "#f2c66d");
          n.Player.sit(o, !1, !0);
          return void n.Audio.play("meditate");
        }
        if (!o.canMeditate || !n.Player.isFull(o) || t.has("tay_tuy_thang")) {
          return !e.isDone() && !o.canMeditate || t.has("tay_tuy_thang") ? void (e.stage < 4 || !t.has("tay_tuy_thang") ? n.HUD.openDialog(a.name, "Một phiến đá phẳng nhô ra mặt suối, bề mặt mòn nhẵn — xem chừng đã có không ít đời đệ tử ngồi ở đây. Giữa phiến đá còn khắc mờ một vòng cổ tự.\n\n" + (3 === e.stage ? "Phải có Tẩy Tuỷ Thang trong tay mới ngồi xuống được." : "Nước suối lạnh thấu xương, ngồi lâu e rằng không chịu nổi.")) : n.HUD.openDialog(a.name, e.flags.tay_tuy_that_bai ? "Vẫn phiến đá ấy, vẫn dòng nước lạnh ấy. Vết rát trong kinh mạch lần trước nhắc ngươi nhớ mình đã hỏng ở chỗ nào.\n\nLần này ngươi uống chậm, từng ngụm nhỏ, vận Đạo Dẫn thuật đi trước một nhịp để mở đường cho trọc khí thoát ra, thay vì ép nó chạy loạn trong kinh mạch." : "Ngươi cởi ngoại bào, bưng bát Tẩy Tuỷ Thang còn nóng, ngồi xuống phiến đá mòn nhẵn. Nửa thân dưới ngâm trong dòng nước lạnh buốt.\n\nMột hơi uống cạn. Ruột gan lập tức nóng ran như có lửa đốt, trong khi ngoài da thì lạnh đến tê dại. Nóng lạnh giao tranh — chính là lúc trọc khí bị ép ra.", { actionLabel: e.flags.tay_tuy_that_bai ? "Phạt Mao Lần Nữa" : "Uống Thang & Đả Tọa", onAction: function () {
              !function (a) {
                var e = i.player;
                e.x = a.x;
                e.y = a.y - 4;
                n.Player.sit(e, !0);
                i.ritual = { t: 0, phase: -1, a1: 0, a2: 0, a3: 0, fail: Sn };
                n.Inventory.remove("tay_tuy_thang", 1);
                c("ritual.tayTuy");
              }(a);
            } })) : (n.Player.sit(o, !1, !0), n.Audio.play("meditate"), void n.VFX.spawnText(o.x, o.y - 52, "Đả tọa", "#bff3d8"));
        }
        !function (a) {
          if ("luyen_khi_13" === i.player.realmId && n.HuyetSacUI) {
            n.HuyetSacUI.breakthrough();
          }
          else {
            var e = i.player;
            var t = n.Breakthrough.check(e);
            if (t.blocked) {
              n.HUD.openDialog("Đột Phá Cảnh Giới", t.blocked);
            }
            else {
              var o = "Ngươi ngồi lên phiến đá, nhắm mắt dò xét đan điền. Linh khí đã đầy ắp, chỉ chờ một hơi bức phá là sang " + t.next.name + ".\n\nĐIỀU KIỆN PHÁ QUAN:\n" + n.Breakthrough.describe(t);
              if (t.ready) {
                n.HUD.openDialog("Đột Phá Cảnh Giới", o + "\n\nMọi thứ đã sẵn. Chỉ cần vận Đạo Dẫn thuật dồn toàn bộ linh khí lên cửa quan.", { actionLabel: "Bắt Đầu Phá Quan", onAction: function () {
                    Fn(a);
                  } });
              }
              else {
                n.HUD.openDialog("Đột Phá Cảnh Giới", o + "\n\nCòn thiếu, ép bừa chỉ tổ hỏng kinh mạch. Lo cho đủ rồi hãy quay lại.");
              }
            }
          }
        }(a);
      }
  }
  function Fn(a) {
    var e = i.player;
    n.Breakthrough.pay(e);
    e.x = a.x;
    e.y = a.y - 4;
    n.Player.sit(e, !0);
    i.ascend = { t: 0, phase: -1, acc: 0, next: n.Breakthrough.nextRealm(e) };
  }
  i.eatFood = Cn;
  i.stopFishing = In;
  i.playFoundationBreakthrough = function (a) {
    var e = i.player;
    return !(!e || i.foundationBreakthrough || (n.Targeting.clear(), n.Player.sit(e, !0), i.foundationBreakthrough = { t: 0, phase: -1, gatherAcc: 0, settleAcc: 0, success: !!a.success, why: a.why || (a.success ? "Đạo cơ đã thành." : "Phá quan thất bại.") }, n.VFX.spawnFoundationFormation(e.x, e.y, !!a.success, 7.8), n.HUD.setCaption("Tĩnh tâm định tức — dẫn linh khí toàn thân về khí hải…"), 0));
  };
  var Sn = !1;
  function Pn(a, e) {
    var t = i.ritual;
    if (null != e) {
      n.HUD.setCaption(e);
    }
    return t.phase !== a && (t.phase = a, !0);
  }
  var Nn = i.CULL = { remote: 336, enemy: 176, drop: 96, critter: 96 };
  var Vn = i.cullStats = { remotes: 0, remotesDrawn: 0, enemies: 0, enemiesDrawn: 0 };
  function Bn() {
    return n.Quality ? n.Quality.tier : 2;
  }
  var En = -1;
  function Xn(n, a, e, t, i, o, h) {
    return n > e - h && n < e + i + h && a > t - h && a < t + o + h;
  }
  function Gn() {
    if (i.menuOpen) {
      Yn();
    }
    if (n.HUD && n.HUD.bagOpen) {
      n.HUD.closeBag();
    }
    if (n.SectUI && n.SectUI.moBang) {
      n.SectUI.moBang();
    }
    else {
      n.HUD.openDialog("Tông Môn", "Chưa nạp được bảng Tông Môn.");
    }
  }
  function Rn() {
    i.menuOpen = !0;
    t.$("#menu").classList.remove("hidden");
    var e = t.$("#menu-player");
    if (e) {
      var o = i.player && i.player.cfg && i.player.cfg.name;
      e.textContent = "Đạo hiệu: " + (o || "Đạo hữu");
    }
    t.$("#menu-touch").textContent = "Điều khiển: " + ("touch" === n.Input.mode ? "Cảm ứng" : "Bàn phím");
    t.$("#menu-debug").textContent = "Lưới gỡ lỗi: " + (a.DEBUG ? "Bật" : "Tắt");
    t.$("#menu-theme").textContent = "Tông cảnh vật: " + n.Palette.WORLD.name;
    t.$("#menu-zoom").textContent = qn();
    var h = t.$("#menu-gfx");
    if (h) {
      h.classList.toggle("hidden", !n.Quality);
      h.textContent = On();
    }
    Kn();
    var c = t.$("#menu-nguoi");
    if (c && n.Quality && n.Quality.nguoiLabel) {
      c.textContent = "Người chơi khác: " + n.Quality.nguoiLabel();
    }
    t.$("#menu-guide").textContent = "Mũi tên chỉ đường: " + (i.questGuideOn ? "Bật" : "Tắt");
    t.$("#menu-audio").textContent = "Âm thanh: " + n.Audio.stepName();
    var r = t.$("#audio-vol");
    var u = t.$("#audio-tick-music");
    var l = t.$("#audio-tick-sfx");
    if (r) {
      r.textContent = "Âm lượng: " + n.Audio.stepName();
    }
    if (u) {
      u.checked = !1 !== n.Audio.musicOn;
    }
    if (l) {
      l.checked = !1 !== n.Audio.sfxOn;
    }
    var s = t.$("#menu-touch-style");
    if (s && n.TouchUI) {
      s.textContent = "Kiểu di chuyển: " + n.TouchUI.controlStyleLabel();
    }
    var g = t.$("#menu-logout");
    if (g) {
      var p = !(!n.Auth || !n.Auth.user);
      g.classList.toggle("hidden", !(p || n.Net && n.Net.online));
      g.disabled = !1;
      g.textContent = p ? n.Auth.isGuest && n.Auth.isGuest() ? "Đăng xuất (khách)" : "Đăng xuất" : "Đăng nhập / Đăng ký";
    }
  }
  function Kn() {
    var a = t.$("#menu-weather");
    if (a && (a.classList.toggle("hidden", !n.Weather), n.Weather)) {
      var e = Bn() < 2;
      a.disabled = e;
      a.textContent = e ? "Thời tiết: chỉ có ở đồ hoạ Bình thường" : "Thời tiết: " + n.Weather.modeLabel();
    }
  }
  function On() {
    var a = n.Quality;
    if (!a) {
      return "Đồ hoạ: Bình thường";
    }
    var e = a.get();
    return "Đồ hoạ: " + e.name + (e.fps ? " (" + e.fps + " FPS)" : "");
  }
  function qn() {
    var a = n.Renderer;
    return "Tỉ lệ phóng: " + a.view().name + " (" + a.zoom + "× · " + a.w + "×" + a.h + ")";
  }
  i.draw = function (h) {
    var c = i.map;
    var r = i.player;
    var u = n.Renderer.w;
    var l = n.Renderer.h;
    var s = n.Camera.renderX();
    var g = n.Camera.renderY();
    var p = Math.floor(4 * i.waterTime);
    var y = n.Game.time;
    var m = Bn();
    n.Renderer.clear(c.data.ambient);
    if (n.TamGioiSky && m > 0) {
      n.TamGioiSky.drawBack(h, c, s, g, u, l, y);
    }
    if (0 === m && c.drawGroundBaked) {
      c.drawGroundBaked(h, s, g, u, l, n.Renderer.gfx);
    }
    else {
      c.drawGround(h, s, g, u, l, p);
    }
    if (n.TamGioiSky) {
      n.TamGioiSky.drawEdges(h, c, s, g, u, l);
    }
    if (n.LamLangArt && n.LamLangArt.drawGround) {
      n.LamLangArt.drawGround(h, c, s, g, u, l);
    }
    c.drawFlatProps(h, s, g, y);
    if (n.ThungLungArt && n.ThungLungArt.drawGround) {
      n.ThungLungArt.drawGround(h, c, s, g, u, l, y, m);
    }
    if (n.FormationUI) {
      n.FormationUI.drawGround(h, s, g, y);
    }
    if (n.TruyenTongUI) {
      n.TruyenTongUI.drawGround(h, s, g, y);
    }
    if (n.HuThienUI) {
      n.HuThienUI.drawGround(h, s, g, y);
    }
    if (n.PondFish && m > 0) {
      n.PondFish.draw(h, c, s, g, y);
    }
    if (n.DongChay) {
      n.DongChay.draw(h, c, s, g, u, l, y, m);
    }
    if (n.TanVienFxArt && n.TanVienFxArt.drawGround) {
      n.TanVienFxArt.drawGround(h, c, s, g, u, l, y, m);
    }
    if (n.FormationUI) {
      n.FormationUI.drawCores(h, s, g, y);
    }
    o.length = 0;
    for (var f = c.visibleObjects(s, g, u, l), T = 0; T < f.length; T++)
      o.push({ y: f[T].sortY, o: f[T] });
    for (var v = c.visibleProps(s, g, u, l), x = 0; x < v.length; x++)
      o.push({ y: v[x].sortY, pr: v[x] });
    for (var b = 0; b < i.drops.length; b++) {
      var _ = i.drops[b];
      if (Xn(_.x, _.y, s, g, u, l, Nn.drop)) {
        o.push({ y: _.sortY, drop: _ });
      }
    }
    for (var D = i.enemies, H = 0, k = 0, w = 0; w < D.length; w++) {
      var C = D[w];
      if (!(C.dead)) {
        H++;
        if (Xn(C.x, C.y, s, g, u, l, Nn.enemy)) {
          k++;
          o.push({ y: C.y, en: C });
        }
      }
    }
    for (var L = 0; m > 0 && L < i.critters.length; L++) {
      var I = i.critters[L];
      if (Xn(I.x, I.y, s, g, u, l, Nn.critter)) {
        o.push({ y: I.sortY, cr: I });
      }
    }
    if (i.escortFollower && o.push({ y: i.escortFollower.y, escort: i.escortFollower }), n.AmHon && n.Gateway.honBay && n.Gateway.honBay.length) {
      for (var M = n.Gateway.honBay, U = n.Gateway.selfId, A = 0; A < M.length; A++) {
        var F = M[A];
        if (Xn(F.x, F.y, s, g, u, l, Nn.enemy)) {
          o.push({ y: F.y, hon: F, honMinh: F.o === U });
        }
      }
    }
    if (n.KhoiLoiFX && n.Gateway.khoiLoiBay && n.Gateway.khoiLoiBay.length) {
      for (var S = n.Gateway.khoiLoiBay, P = 0; P < S.length; P++) {
        var N = S[P];
        if (Xn(N.x, N.y, s, g, u, l, Nn.enemy)) {
          o.push({ y: N.y, kl: N });
        }
      }
    }
    var V = n.Gateway.remotes;
    var B = 0;
    var E = 0;
    for (var X in W.length = 0, V) {
      var G = V[X];
      if (G.seen) {
        B++;
        if (n.Quality && n.Quality.anNguoi && n.Quality.anNguoi(G)) {
          if (n.RemotePlayer.offscreen) {
            n.RemotePlayer.offscreen(G);
          }
        }
        else {
          if (Xn(G.x, G.y, s, g, u, l, Nn.remote)) {
            E++;
            W.push(G);
            o.push({ y: G.y, rm: G });
          }
          else {
            if (n.RemotePlayer.offscreen) {
              n.RemotePlayer.offscreen(G);
            }
          }
        }
      }
    }
    if (Vn.remotes = B, Vn.remotesDrawn = E, n.Quality && n.Quality.setCrowd) {
      var R = n.Game.time;
      if (R - Z >= .5 || R < Z) {
        Z = R;
        z = !1;
        for (var K = 0; K < i.enemies.length; K++)
          if (!i.enemies[K].dead && J[i.enemies[K].type]) {
            z = !0;
            break;
          }
      }
      n.Quality.setCrowd(W.length, z);
    }
    Vn.remotesGian = function (a, e) {
      var t;
      var i;
      var o = n.Quality ? n.Quality.remoteTier ? n.Quality.remoteTier() : n.Quality.tier : 2;
      var h = null != $[o] ? $[o] : 12;
      var c = n.Gateway;
      if (n.Quality && n.Quality.chamNguoi && n.Quality.chamNguoi()) {
        var r = 0;
        for (t = 0; t < a.length; t++)
          (i = a[t]).veGian = !1, i.veCham = !(n.Targeting && n.Targeting.thuDich && n.Targeting.thuDich(i) || c.partyMember && c.partyMember(i.id)), i.veCham && r++;
        return r;
      }
      for (t = 0; t < a.length; t++)
        a[t].veCham = !1;
      if (a.length <= h) {
        for (t = 0; t < a.length; t++)
          a[t].veGian = !1;
        return 0;
      }
      for (j.length = 0, t = 0; t < a.length; t++)
        if (i = a[t], n.Targeting && n.Targeting.thuDich && n.Targeting.thuDich(i) || c.partyMember && c.partyMember(i.id)) {
          i.veGian = !1;
        }
        else {
          var u = i.x - e.x;
          var l = i.y - e.y;
          i.khoangCach2 = u * u + l * l;
          j.push(i);
        }
      j.sort(function (n, a) {
        return n.khoangCach2 - a.khoangCach2;
      });
      var s = Math.max(0, h - (a.length - j.length));
      var g = 0;
      for (t = 0; t < j.length; t++)
        j[t].veGian = t >= s, j[t].veGian && g++;
      return g;
    }(W, r);
    Vn.enemies = H;
    Vn.enemiesDrawn = k;
    if (!(nn())) {
      o.push({ y: r.y, p: r });
    }
    if (n.BangNhanhUI && n.BangNhanhUI.depthItems) {
      n.BangNhanhUI.depthItems(o);
    }
    if (n.PhongChoUI && n.PhongChoUI.depthItems) {
      n.PhongChoUI.depthItems(o);
    }
    if (n.TuAnhPhuocFX && n.TuAnhPhuocFX.depthItems) {
      n.TuAnhPhuocFX.depthItems(o);
    }
    o.sort(function (n, a) {
      return n.y - a.y;
    });
    if (n.VFX.draw) {
      n.VFX.draw(h, s, g, "back");
    }
    for (var O = 0; O < o.length; O++) {
      var q = o[O];
      var Q = (q.p || q.rm) && n.XuyenKichFX && n.XuyenKichFX.dangLao() ? n.XuyenKichFX.offsetOf(q.p || q.rm) : null;
      if (Q) {
        h.save();
        h.translate(Q.x, Q.y);
      }
      if (q.p) {
        q.p.draw(h, s, g);
      }
      else {
        if (q.rm) {
          n.RemotePlayer.draw(q.rm, h, s, g, y);
        }
        else {
          if (q.escort) {
            d(h, q.escort, s, g);
          }
          else {
            if (q.pr) {
              c.drawProp(h, q.pr, s, g, y);
            }
            else {
              if (q.drop) {
                Ta(h, q.drop, s, g, y);
              }
              else {
                if (q.en) {
                  n.Enemy.draw(q.en, h, s, g, y);
                }
                else {
                  if (q.hon) {
                    n.AmHon.draw(h, q.hon, s, g, y, q.honMinh);
                  }
                  else {
                    if (q.kl) {
                      n.KhoiLoiFX.draw(h, q.kl, s, g, y);
                    }
                    else {
                      if (q.cr) {
                        n.Critter.draw(q.cr, h, s, g, y);
                      }
                      else {
                        if (q.fn) {
                          q.fn(h, s, g, y);
                        }
                        else {
                          c.drawObject(h, q.o, s, g, y);
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      if (Q) {
        h.restore();
      }
    }
    if (n.VFX.draw && n.VFX.draw(h, s, g, "front"), n.TruyenTongUI && n.TruyenTongUI.drawFront && n.TruyenTongUI.drawFront(h, s, g, y), n.HuThienUI && n.HuThienUI.drawFront(h, s, g, y), n.DaiTanArt && n.DaiTanArt.drawOverlay && n.DaiTanArt.drawOverlay(h, c, s, g, u, l, y), n.BaiDaArt && n.BaiDaArt.drawFx && n.BaiDaArt.drawFx(h, c, s, g, u, l, y, m), n.RungTrucArt && n.RungTrucArt.drawFx && n.RungTrucArt.drawFx(h, c, s, g, u, l, y, m), n.DuocCocArt && n.DuocCocArt.drawFx && n.DuocCocArt.drawFx(h, c, s, g, u, l, y, m), n.MieuHoangArt && n.MieuHoangArt.drawFx && n.MieuHoangArt.drawFx(h, c, s, g, u, l, y, m), n.MoLinhThachArt && n.MoLinhThachArt.drawFx && n.MoLinhThachArt.drawFx(h, c, s, g, u, l, y, m), n.LongUyenArt && n.LongUyenArt.drawFx && n.LongUyenArt.drawFx(h, c, s, g, u, l, y, m), n.ThungLungArt && n.ThungLungArt.drawFx && n.ThungLungArt.drawFx(h, c, s, g, u, l, y, m), n.PhongChoArt && n.PhongChoArt.drawFx && n.PhongChoArt.drawFx(h, c, s, g, u, l, y, m), n.HuThienArt && n.HuThienArt.drawFx && n.HuThienArt.drawFx(h, c, s, g, u, l, y, m), n.YenLangArt && n.YenLangArt.drawFx && n.YenLangArt.drawFx(h, c, s, g, u, l, y, m), n.SanDauArt && n.SanDauArt.drawFx && n.SanDauArt.drawFx(h, c, s, g, u, l, y, m), n.VeTay && n.VeTay.drawFx && n.VeTay.drawFx(h, c, s, g, u, l, y, m), n.LamLangArt && n.LamLangArt.drawFx && n.LamLangArt.drawFx(h, c, s, g, u, l, y, m), n.TanVienFxArt && n.TanVienFxArt.drawFx && n.TanVienFxArt.drawFx(h, c, s, g, u, l, y, m), n.HuyetSacUI && n.HuyetSacUI.drawSeals && n.HuyetSacUI.drawSeals(h, s, g, y), n.HuyetSacUI && n.HuyetSacUI.drawThu && n.HuyetSacUI.drawThu(h, s, g), n.YenLangUI && n.YenLangUI.draw && n.YenLangUI.draw(h, s, g, y), n.TamGioiSky && 2 === m && n.TamGioiSky.drawFront(h, c, s, g, u, l, y), n.Weather && 2 === m && n.Weather.draw(h, c, s, g, u, l, y), n.BossBoard && n.BossBoard.draw && n.BossBoard.draw(h, s, g), n.Chat && n.Chat.drawBubbles && n.Chat.drawBubbles(h, s, g, r), i.fishing && function (a, e, o, h, c) {
      var r = i.player;
      var u = n.Pixel;
      var l = Math.round(n.Player.viewX(r) - o + (1 === r.dir ? -5 : 5));
      var s = Math.round(n.Player.viewY(r) - h - 22);
      var g = Math.round(e.bobX - o);
      var p = Math.round(e.bobY - h + 1.5 * Math.sin(5 * (c || 0)));
      var d = Math.round(l + .55 * (g - l));
      var y = Math.round(Math.min(s - 13, s + .35 * (p - s)));
      u.line(a, l, s, d, y, "#6a4322");
      u.line(a, l + 1, s, d + 1, y, "#b07a42");
      u.line(a, d, y, g, p, t.alpha("#e9f3ec", .75));
      u.ellipse(a, g, p, 3, 2, "#f2f0df", "#3c3025");
      u.r(a, g - 2, p - 1, 5, 1, "#c94f3f");
    }(h, i.fishing, s, g, y), n.Targeting.draw(h, s, g, y), i.ritual && (1 === i.ritual.phase || i.ritual.fail && i.ritual.phase >= 2)) {
      var Y = Math.min(1, (i.ritual.t - 2.2) / 1.2);
      h.fillStyle = t.alpha("#0a0806", .42 * Y);
      h.fillRect(0, 0, u, l);
    }
    n.Skills.draw(h, s, g);
    n.VFX.draw(h, s, g, "base");
    if (n.ThreeMapsAtmosphere) {
      n.ThreeMapsAtmosphere.drawOverlays(h, c, s, g, u, l, y);
    }
    if (a.DEBUG) {
      (function (n, a, t, o, h) {
        for (var c = i.map, r = Math.max(0, Math.floor(a / e)), u = Math.max(0, Math.floor(t / e)), l = Math.min(c.width - 1, Math.floor((a + o) / e)), s = Math.min(c.height - 1, Math.floor((t + h) / e)), g = u; g <= s; g++)
          for (var p = r; p <= l; p++) {
            var d = p * e - a;
            var y = g * e - t;
            if (c.isBlockedTile(p, g)) {
              n.fillStyle = "rgba(220,60,60,0.22)";
              n.fillRect(d, y, e, e);
            }
            n.strokeStyle = "rgba(255,255,255,0.08)";
            n.strokeRect(d + .5, y + .5, e - 1, e - 1);
          }
      })(h, s, g, u, l);
    }
    if (c.drawPortalHints) {
      c.drawPortalHints(h, s, g, u, l, y);
    }
    (function (a, o, h, c) {
      var r = n.Quest;
      var u = i.player;
      if (u && i.map) {
        var l = n.WorldMap;
        var s = l && l.guideMapId ? l.guidePlace(i.map.data.id) : null;
        if (!s) {
          if (!i.questGuideOn || !r.guidePlace) {
            return;
          }
          s = r.guidePlace();
        }
        if (s && s.mapId) {
          var g;
          var p = i.map.data.id;
          if (s.mapId !== p) {
            var d = n.MapData.routeNextHop(p, s.mapId);
            if (!d) {
              return;
            }
            g = { x: d.tx * e + e / 2, y: d.ty * e + e / 2 };
          }
          else {
            if (!s.ids || !s.ids.length) {
              return;
            }
            var y = function (n, a, e) {
              for (var o = i.map.props.concat(i.map.flatProps, i.map.interactables), h = null, c = 1 / 0, r = 0; r < o.length; r++) {
                var u = o[r];
                if (-1 !== n.indexOf(u.id) && (a || !u.hidden)) {
                  var l = t.dist(e.x, e.y, u.x, u.y);
                  if (l < c) {
                    c = l;
                    h = u;
                  }
                }
              }
              return h;
            }(s.ids, !!s.anyState, u);
            if (!y) {
              return;
            }
            g = { x: y.x, y: y.y };
          }
          var m = g.x - u.x;
          var f = g.y - u.y;
          if (!(Math.sqrt(m * m + f * f) < 1.5 * e)) {
            var T = Math.atan2(f, m);
            var v = 40 + 3 * Math.sin(3 * c);
            var x = Math.round(u.x - o + Math.cos(T) * v);
            var b = Math.round(u.y - 22 - h + Math.sin(T) * v);
            a.save();
            a.translate(x, b);
            a.rotate(T + Math.PI / 2);
            a.beginPath();
            a.moveTo(0, -7);
            a.lineTo(5, 4);
            a.lineTo(0, 1);
            a.lineTo(-5, 4);
            a.closePath();
            a.fillStyle = "#f7c822";
            a.fill();
            a.lineWidth = 1;
            a.strokeStyle = "#2b2118";
            a.stroke();
            a.restore();
          }
        }
      }
    })(h, s, g, y);
    if (2 === m) {
      (function (n, a, e) {
        for (var t = 0; t < 6; t++)
          n.fillStyle = "rgba(10,12,9," + (.05 - .007 * t) + ")", n.fillRect(t, t, a - 2 * t, 1), n.fillRect(t, e - 1 - t, a - 2 * t, 1), n.fillRect(t, t, 1, e - 2 * t), n.fillRect(a - 1 - t, t, 1, e - 2 * t);
      })(h, u, l);
    }
  };
  var Qn = null;
  function Yn() {
    i.menuOpen = !1;
    var n = t.$("#menu");
    if (n) {
      n.classList.add("hidden");
    }
  }
  var $n = "";
  function Wn(a) {
    var e = n.Forge;
    var t = (n.Inventory, "tho_ren" === a.id && n.Quest.stage === n.Quest.XICH_LONG_STAGE && n.Quest.stageComplete());
    if (t && n.Quest.khucBonKhoa && n.Quest.khucBonKhoa() && !n.Quest.TRUC_CO_STAGE && (t = !1, n.HUD.setCaption && n.HUD.setCaption(n.Quest.KHUC_BON_KHOA_TEXT || "Khúc tiếp theo sắp mở — chờ thông báo.")), t) {
      var i = n.Quest.rewardItems(n.Quest.XICH_LONG_STAGE);
      n.HUD.openDialog(a.name || "Thợ Rèn", 'Thợ rèn đỡ lấy vệt máu rồng còn nóng hổi, mắt sáng rực: "Long Huyết thật! Có nó ta tôi được lõi phù. Cầm lấy ít Cổ Bích Mộc với Trấn Thần Thạch — gom đủ thì mang tới Nữ Tu Trông Miếu ở Miếu Hoang chế Bảo Mệnh Phù."', { actionLabel: "Hoàn Thành Nhiệm Vụ", onAction: function () {
          if (n.Quest.stageComplete()) {
            n.Quest.flags.bao_cong_xich_long = !0;
            n.Quest.advance();
            if (!(h())) {
              i.forEach(function (a) {
                n.Inventory.add(a[0], a[1]);
              });
            }
            dn(!1);
          }
        }, reward: i.map(function (a) {
          var e = n.ITEMS[a[0]] || {};
          return { icon: e.icon, name: e.name || a[0], qty: a[1] };
        }) });
    }
    else {
      var o = n.Quest.stage === n.Quest.FORGE_STAGE && !n.Quest.flags.ren_vu_khi_chinh;
      var c = "Nhiệm vụ cần một vũ khí: chọn Thiết Kiếm, Thiết Đao hoặc Thiết Thương (2 Huyền Thiết + 50 Linh Thạch) để rèn, rồi trang bị.";
      if (n.ForgeUI) {
        n.ForgeUI.open(a, function (n) {
          jn(a, n);
        }, o ? c : "Chọn một món để xem chi tiết, nguyên liệu và cách nhận.");
      }
      else {
        n.HUD.openDialog(a.name || "Lò Rèn Chân Núi", o ? c : "Chọn vũ khí hoặc trang bị cần rèn; giá và nguyên liệu hiện ngay trên từng nút.", { choices: e.RECIPES.map(function (t) {
            var i = e.check(t.id, n);
            var o = n.ITEMS[t.id] || {};
            var h = [o.hpBonus ? "+" + o.hpBonus + " Khí Huyết" : "", o.mpBonus ? "+" + o.mpBonus + " Linh Lực" : "", o.spBonus ? "+" + o.spBonus + " Thần Thức" : "", o.spRegen ? "hồi " + o.spRegen + " Thần Thức/giây" : "", o.bpBonus ? "+" + o.bpBonus + " Giáp" : "", o.resistBonus ? "Kháng hiệu ứng +" + Math.round(100 * o.resistBonus) + "%" : "", o.moveSpeedBonus ? "Tốc độ di chuyển +" + Math.round(100 * o.moveSpeedBonus) + "%" : ""].filter(Boolean).join(" · ");
            var c = t.requireRealm && n.realmById ? n.realmById(t.requireRealm) : null;
            var r = "phi_hanh" === t.slot ? "Phi Hành" + (c ? " · Cần " + c.name : "") : "mu" === t.slot ? "Pháp Bảo" + (h ? " · " + h : "") + (c ? " · Cần " + c.name : "") : "giap" === t.slot ? "Giáp" + (h ? " · " + h : "") + (c ? " · Cần " + c.name : "") : "giay" === t.slot ? "Hành Ngoa" + (h ? " · " + h : "") + (c ? " · Cần " + c.name : "") : "nhan" === t.slot ? "Linh Giới" + (h ? " · " + h : "") + (c ? " · Cần " + c.name : "") : "phap_boi" === t.slot ? "Pháp Bội" + (h ? " · " + h : "") + (c ? " · Cần " + c.name : "") : "Công +" + t.atk;
            return t.dropOnly ? { label: t.name, note: r + " · " + e.dropNote(t, n), icon: n.ITEMS[t.id] ? n.ITEMS[t.id].icon : null, disabled: !0, onChoose: function () {
              } } : { label: t.name, note: e.priceLine(t) + " · " + r + (i.ok ? "" : " — " + i.why), icon: n.ITEMS[t.id] ? n.ITEMS[t.id].icon : null, disabled: !i.ok, onChoose: function () {
                jn(a, t);
              } };
          }) });
      }
    }
  }
  function jn(a, e) {
    c("forge", { itemId: e.id });
    var t = n.Quest.stage === n.Quest.FORGE_STAGE && "vu_khi" === e.slot && !n.Quest.flags.ren_vu_khi_chinh;
    if (!h()) {
      var i = n.Forge.make(e.id, n);
      if (!i.ok) {
        return void n.HUD.setCaption(i.why);
      }
      dn();
    }
    n.VFX.spawnRing(a.x, a.y - 18, "#ffb35c", 26, .5);
    n.HUD.setCaption(e.caption);
    var o = e.khoiLoi && n.KhoiLoi ? "bấm khôi lỗi, chọn Triệu Hồi (" + (n.KhoiLoi.byId(e.id) || {}).sp + " Thần Thức mỗi lần, tối đa " + n.KhoiLoi.TRAN + " con cùng lúc)." : "phi_hanh" === e.slot ? "bấm món phi hành, chọn Trang Bị vào ô Phi Hành." : "mu" === e.slot ? "bấm mũ vừa rèn, chọn Trang Bị vào ô Pháp Bảo để nhận chỉ số." : "giap" === e.slot ? "bấm giáp vừa rèn, chọn Trang Bị vào ô Giáp để nhận chỉ số." : "nhan" === e.slot ? "bấm nhẫn vừa rèn, chọn Trang Bị vào ô Linh Giới để nhận hồi Thần Thức." : "phap_boi" === e.slot ? "bấm bội vừa rèn, chọn Trang Bị vào ô Pháp Bội để nhận chỉ số." : "bấm món vũ khí, chọn Trang Bị vào ô Vũ Khí thì đòn đánh thường mới nặng thêm.";
    n.HUD.openDialog(e.name, e.caption + "\n\nMón vừa rèn xong nằm trong Hành Trang. Mở túi rồi " + o + (t ? "\n\nViệc rèn của nhiệm vụ đã xong" + (n.Quest.hangXong() ? " — bảng nhiệm vụ tự sang việc kế." : ".") : ""), { reward: [{ icon: n.ITEMS[e.id] ? n.ITEMS[e.id].icon : null, name: e.name, qty: 1 }] });
  }
  var zn = { liet_hoa: "#e86b36", tu_linh: "#68d7b0", loan_loi_hoa: "#c68eff", tu_tuong: "#ffd678" };
  function Zn(a) {
    var e = n.Formations;
    var t = i.player;
    var o = (n.LucTinhTrucKiem, 0 | n.Progress.stones);
    var c = e.SHOP.map(function (o) {
      var c = e.defOf(o.id);
      var r = n.ITEMS[c.item];
      var u = e.canBuy(o.id, n, t);
      return { label: r.name + " · " + o.cost + " LT", note: "Bấm để xem thông số và mua" + (u.ok ? "" : " — " + u.why), icon: r.icon, onChoose: function () {
          !function (a, e, t) {
            var o = n.Formations;
            var c = n.ITEMS[t.item];
            var r = o.canBuy(e.id, n, i.player);
            var u = o.statLine(t) + " · " + o.runCostLine(t);
            if (!(r.ok)) {
              u += "\n\n" + r.why;
            }
            n.HUD.openDialog(c.name + " · " + e.cost + " LT", u, { actionLabel: r.ok ? "Mua x1 · " + e.cost + " LT" : null, onAction: r.ok ? function () {
                !function (a, e, t) {
                  function o(i) {
                    if (!i || !i.ok) {
                      n.Audio.play("deny");
                      return void n.HUD.setCaption("Không mua được: " + (i && i.why || "máy chủ từ chối"));
                    }
                    n.Audio.play("coin");
                    n.VFX.spawnRing(a.x, a.y - 18, zn[t.id] || "#68d7b0", 26, .5);
                    n.HUD.setCaption("Đã mua " + n.ITEMS[t.item].name + " · -" + e.cost + " Linh Thạch");
                    if (n.HUD.refreshBag) {
                      n.HUD.refreshBag();
                    }
                    if (!(h())) {
                      Zn(a);
                    }
                  }
                  if (h()) {
                    n.Gateway.cmd("formation.buy", { id: e.id }, o);
                  }
                  else {
                    o(n.Formations.buy(e.id, n, i.player));
                  }
                }(a, e, t);
              } : null, reward: [{ icon: c.icon, name: c.name, qty: 1 }] });
          }(a, o, c);
        } };
    });
    n.HUD.openDialog(a.name || "Trận Pháp Sư", 'Mặc Huyền đặt mấy mặt bàn đá lên tấm vải đen:\n\n"Trận bàn mua một lần, dựng mãi không mất. Gán nó vào một ô H J K L, kéo ra chỗ muốn đặt rồi buông tay là trận thành — rót Linh lực kích hoạt và lấy Linh Thạch trong hầu bao nuôi trận từng giây."\n\nĐang có: ' + o + " Linh Thạch", { choices: c });
  }
  function Jn(a) {
    var e = n.Skills;
    var t = i.player;
    var o = 0 | n.Progress.stones;
    if (e.SECT_SHOP.length) {
      n.HUD.openDialog(a.name || "Chấp Sự Thiên Kiếm Tông", "Chấp Sự mở hộp bí tịch Thiên Kiếm Tông. Chọn một quyển để lĩnh hội.\n\nLinh Thạch đang có: " + o + " viên.", { choices: e.SECT_SHOP.map(function (o) {
          var c = e.DEFS[o.id];
          var r = n.ITEMS[c.book];
          var u = c.boostWeapon && n.ITEMS[c.boostWeapon];
          var l = e.canBuySectSkill(o.id, n, t);
          return { label: r.name + " · " + o.cost + " LT", note: (c.tip || r.desc) + (u && !/trong hành trang/.test(c.tip || "") ? " Có " + u.name + " trong hành trang: sát thương đầy đủ; thiếu pháp khí: còn 50%." : "") + (l.ok ? "" : " — " + l.why), icon: r.icon, disabled: !l.ok, onChoose: function () {
              !function (a, e, t) {
                function o(i) {
                  if (!i || !i.ok) {
                    n.Audio.play("deny");
                    return void n.HUD.setCaption("Không mua được: " + (i && i.why || "máy chủ từ chối"));
                  }
                  n.Audio.play("coin");
                  n.VFX.spawnRing(a.x, a.y - 18, t.colors.glow, 30, .6);
                  n.HUD.setCaption("Đã mua " + n.ITEMS[t.book].name + " · -" + e.cost + " Linh Thạch");
                  if (n.HUD.refreshBag) {
                    n.HUD.refreshBag();
                  }
                  if (!(h())) {
                    Jn(a);
                  }
                }
                if (h()) {
                  n.Gateway.cmd("sectskill.buy", { id: e.id }, o);
                }
                else {
                  o(n.Skills.buySectSkill(e.id, n, i.player));
                }
              }(a, o, c);
            } };
        }) });
    }
    else {
      n.HUD.openDialog(a.name || "Chấp Sự Thiên Kiếm Tông", '"Hộp bí tịch của tông đã đóng. Muốn bí tịch trung cấp thì tới Tàng Kinh Các, rút ở Tàng Kinh Trung Cấp."');
    }
  }
  function na(a) {
    var e = i.player;
    var t = n.Quest;
    if ("Phàm Nhân" === e.realm) {
      n.HUD.openDialog(a.name, '"Đạo hữu còn mang thân phàm, trọc khí chưa tẩy thì chớ vào sâu. Lên sân đá xóm nhà tranh phía bắc tìm Thầy Ông Nội trước đã!"');
    }
    else if (5 !== t.stage || t.flags.nhan_viec_ly_thanh)
      if (5 !== t.stage)
        if (6 !== t.stage || !t.stageComplete() || t.flags.bao_cong_3) {
          if (6 !== t.stage) {
            if (t.flags.bao_cong_3) {
              n.HUD.openDialog(a.name, '"Trúc Kiếm dùng có vừa tay không? Rừng trúc giờ đã yên ổn hẳn nhờ công sư đệ cả."');
            }
            else {
              if (t.flags.bao_cong_2) {
                n.HUD.openDialog(a.name, '"Trúc Diệp Bội còn đó chứ? Cứ mang theo phòng thân, biết đâu sau này lại hữu dụng."');
              }
              else {
                n.HUD.openDialog(a.name, 'Huấn Sư Huynh mỉm cười gật đầu, trong mắt lộ vẻ tán thưởng:\n\n"Ồ! Khí sắc hồng hào, quanh thân đã có một tia linh quang yếu ớt — chúc mừng sư đệ đã bước vào Luyện Khí Tầng 1 (Cảm Ứng Kỳ)!"\n\n"Rừng trúc này phong cảnh hữu tình, linh khí thanh nhã, rất thích hợp để thổ nạp đả tọa. Măng trúc ven suối giòn ngọt, chứa chút ít linh khí giải khát rất tốt, cứ tự nhiên thu hoạch."');
              }
            }
          }
          else {
            n.HUD.openDialog(a.name, '"Diệt thêm vài con và tìm ba manh mối phát sáng quanh rừng giúp ta."\n\nTiến độ: diệt ' + t.patrolKills + "/" + t.NEED_PATROL_KILLS + " · manh mối " + t.clueCount() + "/3.");
          }
        }
        else {
          var o = t.rewardItems(6).length > 0;
          n.HUD.openDialog(a.name, 'Huấn Sư Huynh xem mấy manh mối, gật gù:\n\n"Tinh mắt lắm. Rừng trúc yên rồi' + (o ? " — cầm lấy chiếc bội này" : "") + '. Giờ xuống Thảo Dược Cốc phía nam tìm Đại Phu, lão đang cần người chăm vườn thuốc."', { actionLabel: "Báo Công", onAction: function () {
              t.flags.bao_cong_3 = !0;
              t.advance();
              if (o) {
                n.Inventory.add("truc_diep_boi", 1);
              }
              n.HUD.updateQuest();
            }, reward: o ? [{ icon: "leaf_token", name: "Trúc Diệp Bội", qty: 1 }] : null });
        }
      else {
        n.HUD.openDialog(a.name, t.daCamTrucKiem() ? '"Gặp con nào cứ đánh — bấm Auto cho nó tự tìm quái mà đánh."\n\nĐã diệt: ' + t.kills + "/" + t.NEED_KILLS + " con." : '"Kiếm để trong túi thì chém ai? Mở Hành Trang, chọn Trúc Kiếm rồi bấm Trang Bị."');
      }
    else {
      n.HUD.openDialog(a.name, 'Huấn Sư Huynh đứng dậy phủi tay:\n\n"Thầy Ông Nội nhắn ta rồi. Lũ Bọ Ngựa, Sơn Chuột đang phá rừng trúc — cầm thanh Trúc Kiếm này, dọn giúp ta năm con. Bát cơm này để dành, đói thì ăn."', { actionLabel: "Nhận Việc", onAction: function () {
          t.setFlag("nhan_viec_ly_thanh");
          n.Inventory.add("truc_kiem", 1);
          n.Inventory.add("bat_com_linh_me", 1);
          n.VFX.spawnText(i.player.x, i.player.y - 58, "Nhận việc · Trúc Kiếm + Bát Cơm", "#bff3d8");
          dn();
        }, reward: [{ icon: "bamboo_sword", name: "Trúc Kiếm", qty: 1 }, { icon: "com_bowl", name: "Bát Cơm Linh Mễ", qty: 1 }] });
    }
  }
  var aa = { truc_gia: ["#e8dfa0", "#cfeba8", "#75844a", "#c8de7e"], duoc_moc: ["#e0c48a", "#a98a4a", "#5b3d22", "#b8946a"], linh_chi: ["#f0a080", "#d9644a", "#7a3b2a", "#d98d6a"] };
  function ea(n) {
    return aa[n] || aa.linh_chi;
  }
  var ta = 3;
  var ia = .34;
  function oa(n) {
    if (!(i.chopping && i.chopping.prop === n)) {
      i.chopping = { prop: n, swing: 0, t: ia };
    }
  }
  function ha() {
    var a = n.QuanSuUI && n.QuanSuUI.nv && n.QuanSuUI.nv.dang;
    return !!(a && "chat_cay" === a.loai && a.co < a.can && n.Gateway && n.Gateway.cmd);
  }
  function ca() {
    if (i.chopping) {
      i.chopping.prop.shakeUntil = 0;
      i.chopping = null;
    }
  }
  var ra = null;
  var ua = null;
  var la = n.Loot.PICK_R;
  var sa = .2;
  function ga(n) {
    for (var a = 0; a < i.drops.length; a++)
      if (i.drops[a].lootId === n) {
        return i.drops[a];
      }
    return null;
  }
  function pa() {
    return n.Gateway && n.Gateway.selfId || null;
  }
  function da(a) {
    return "item" !== a.kind || !h() || n.Loot.canPick(a, pa(), a.age);
  }
  function ya(a) {
    return "item" === a.kind && n.Loot.autoPull(a, pa(), a.age);
  }
  function ma() {
    for (var a = 0; a < i.drops.length; a++)
      i.drops[a].materialId && n.Quest.releaseSeedMaterial(i.drops[a].materialId);
    i.drops.length = 0;
  }
  function fa(a) {
    var e = n.Quest;
    if ("item" === a.kind) {
      var t = n.ITEMS[a.itemId];
      var o = i.player;
      var c = t ? t.name : a.itemId;
      var r = Math.max(1, 0 | a.n);
      if (!(h())) {
        n.Loot.award(a.itemId, r, n);
      }
      n.Audio.play("linh_thach" === a.itemId ? "coin" : "pickup");
      n.VFX.spawnText(o.x, o.y - 46, "+" + r + " " + c, "linh_thach" === a.itemId ? "#8fe0e6" : a.itemId === n.Quest.MANH_HA ? "#f0d27a" : "#cfc7ac");
      n.VFX.spawnRing(o.x, o.y - 6, "#cfeba8", 20, .4);
      if (a.boss && n.Chat && n.Chat.line) {
        n.Chat.line("Nhận phần thưởng từ " + (a.bossName || "Boss") + ": +" + r + " " + c, "sys", { muc: "map" });
      }
      return void dn(!1);
    }
    if (e.claimSeedMaterial(a.task, a.materialId)) {
      var u = e.seedTaskInfo();
      var l = ea(a.task);
      var s = i.player;
      n.VFX.spawnText(s.x, s.y - 46, "+1 " + (u ? u.itemName : "Nguyên liệu"), l[0]);
      n.VFX.spawnRing(s.x, s.y - 6, l[1], 20, .45);
      if (e.seedQuestComplete()) {
        n.VFX.spawnText(s.x, s.y - 62, "Đã đủ — về giao Đại Phu", "#f0d27a");
      }
      dn(!1);
    }
  }
  function Ta(a, e, i, o, h) {
    var c = Math.round(e.x - i);
    var r = Math.round(e.y - o);
    if ("item" !== e.kind) {
      var u = n.ObjectArt.get(e.art, e.variant);
      if (u) {
        if ("fall" !== e.state) {
          var l = .3 + .14 * Math.sin(4 * h + e.x);
          n.Pixel.ellipse(a, c, r - 2, 10, 4, null, t.alpha("#f0d27a", l));
          r -= Math.round(1.5 + 1.5 * Math.sin(5 * h + e.x));
        }
        a.drawImage(u.canvas, c - u.ax | 0, r - u.ay | 0);
      }
    }
    else {
      !function (a, e, i, o, h) {
        var c = n.ITEMS[e.itemId];
        if (c) {
          var r = da(e);
          var u = n.Loot.gradeOf(c);
          if ("fall" !== e.state) {
            var l = .72 + .28 * Math.sin(3.4 * h + .13 * e.x);
            var s = r ? 1 : .45;
            var g = n.Loot.GLOW_ITEMS && n.Loot.GLOW_ITEMS[e.itemId];
            if (g && (0 === Bn() ? n.Pixel.ellipse(a, i, o - 4, 22, 9, t.alpha(g, .25), g) : function (n, a, e, i, o) {
              var h = .75 + .25 * Math.sin(4 * i);
              n.save();
              n.globalCompositeOperation = "lighter";
              var c = n.createRadialGradient(a, e - 4, 2, a, e - 4, 44);
              c.addColorStop(0, t.alpha(o, .85 * h));
              c.addColorStop(1, t.alpha(o, 0));
              n.fillStyle = c;
              n.beginPath();
              n.ellipse(a, e - 4, 44, 19, 0, 0, 2 * Math.PI);
              n.fill();
              var r = 110 + 12 * Math.sin(2.3 * i);
              var u = n.createLinearGradient(0, e - r, 0, e);
              u.addColorStop(0, t.alpha(o, 0));
              u.addColorStop(1, t.alpha(o, .8 * h));
              n.fillStyle = u;
              n.fillRect(Math.round(a - 11), Math.round(e - r), 22, Math.round(r));
              n.fillStyle = t.alpha("#ffffff", .55 * h);
              n.fillRect(Math.round(a - 2), Math.round(e - .85 * r), 4, Math.round(.85 * r));
              for (var l = 0; l < 10; l++) {
                var s = 1.8 * i + l * Math.PI / 5;
                var g = (18 * i + 11 * l) % 40;
                var p = a + 26 * Math.cos(s);
                var d = e - 6 + 10 * Math.sin(s) - g;
                n.fillStyle = t.alpha(o, .9 * (1 - g / 40));
                n.fillRect(Math.round(p), Math.round(d), 3, 3);
              }
              n.restore();
            }(a, i, o, h, g)), n.Pixel.ellipse(a, i, o - 1, 7, 3, t.alpha("#1b1710", .4), null), n.Pixel.ellipse(a, i, o - 2, 13, 6, t.alpha(u.color, .4 * u.glow * s), null), n.Pixel.ellipse(a, i, o - 2, 8, 4, t.alpha(u.color, u.glow * l * s), null), r && u.glow >= .3) {
              var p = (22 * h + 3 * e.x) % 26;
              n.Pixel.r(a, i, o - 6 - p, 1, 3, t.alpha(u.color, .5 * (1 - p / 26)));
            }
            if (r) {
              o -= Math.round(2 + 1.5 * Math.sin(5 * h + e.x));
            }
          }
          if (a.save(), r || (a.globalAlpha = .5), n.drawItemIcon(a, c.icon, i - (va >> 1), o - va, va), a.restore(), "fly" !== e.state) {
            a.save();
            if (!(r)) {
              a.globalAlpha = .45;
            }
            var d = c.name + ((0 | e.n) > 1 ? " ×" + e.n : "");
            n.Pixel.text(a, i, o - va - 4, d, u.name, "#161310", xa, "center");
            a.restore();
          }
        }
      }(a, e, c, r, h);
    }
  }
  i.onServerLoot = function (n) {
    for (var a = 0; a < n.length; a++) {
      var e = n[a];
      if (!ga(e.id)) {
        i.drops.push({ kind: "item", itemId: e.item, n: Math.max(1, 0 | e.n), lootId: e.id, owner: e.owner || null, boss: !!e.boss, bossName: e.bossName || null, daily: !!e.daily, khoa: 0 | e.khoa, ht: !!e.ht, vanMs: 0 | e.vn, age: e.age || 0, x: e.x, y: e.y - 26, vx: 0, vy: -70, gy: e.y, state: (e.age || 0) > 1 ? "ground" : "fall", t: 0, asked: !1, sortY: e.y });
        var t = i.drops[i.drops.length - 1];
        if ("ground" === t.state) {
          t.y = e.y;
          t.sortY = e.y;
        }
        else if ("number" == typeof e.ox && "number" == typeof e.oy) {
          var o = Math.hypot(e.x - e.ox, e.y - e.oy);
          t.state = "bay";
          t.bx0 = e.ox;
          t.by0 = e.oy;
          t.bx1 = e.x;
          t.by1 = e.y;
          t.bT = .45 + Math.min(.5, o / 700);
          t.bH = 40 + Math.min(70, .25 * o);
          t.x = e.ox;
          t.y = e.oy;
        }
      }
    }
  };
  i.onServerLootGone = function (n, a) {
    var e = ga(n);
    if (e) {
      return a && a === pa() ? (e.state = "fly", e.t = 0, void (e.granted = !0)) : void i.drops.splice(i.drops.indexOf(e), 1);
    }
  };
  var va = 16;
  var xa = "600 9px " + n.Pixel.MAP_FONT;
  function ba() {
    var a = i.map;
    if (a) {
      for (var e = a.props.concat(a.flatProps), t = 0; t < e.length; t++) {
        var o = e[t];
        if (o.seedTask) {
          o.hidden = !n.Quest.isSeedMaterialVisible(o.seedTask, o.id);
          if (o.block) {
            a.blocked[o.ty * a.width + o.tx] = o.hidden ? 0 : 1;
          }
        }
      }
    }
  }
  var _a = 20;
  var Da = { mach_han_tinh: [300, 1200], mach_tu_tinh: [300, 1200], mach_luc_tinh: [1800, 3600], ling_chi_prop: [10, 10] };
  function Ha(a) {
    if (a && i.player) {
      n.VFX.spawnText(i.player.x, i.player.y - 58, "Đã đủ — về giao Đại Phu", "#f0d27a");
    }
  }
  function ka(a, e, t) {
    var i = n.ITEMS[e];
    if (!a.harvestPending)
      if (h()) {
        a.harvestPending = !0;
        var o = a.x;
        var c = a.y;
        n.Gateway.cmd("resource.harvest", { propId: a.id }, function (h) {
          if (a.harvestPending = !1, !h || !h.ok) {
            var r = h && Number(h.retryAfter);
            if (r > 0) {
              a.hidden = !0;
              a.regrowAt = n.Game.time + r;
            }
            return void (h && h.why && n.VFX.spawnText(o, c - 26, h.why, "#c9a45c"));
          }
          if (n.HUD && n.HUD.refreshBag) {
            n.HUD.refreshBag();
          }
          dn();
          a.hidden = !0;
          a.regrowAt = n.Game.time + (Number(h.regrowAfter) || _a);
          n.VFX.spawnText(o, c - 26, "+1 " + (i ? i.name : e), t);
          n.VFX.spawnRing(o, c - 6, t, 20, .5);
          Ha(h.du);
        });
      }
      else {
        if ("ling_chi_prop" === a.type) {
          if (!n.Quest.pickLinhChi()) {
            return;
          }
        }
        else {
          n.Inventory.add(e, 1);
        }
        dn();
        a.hidden = !0;
        a.regrowAt = n.Game.time + function (n) {
          var a = Da[n.type];
          return a ? a[0] + Math.random() * (a[1] - a[0]) : _a;
        }(a);
        n.VFX.spawnText(a.x, a.y - 26, "+1 " + (i ? i.name : e), t);
        n.VFX.spawnRing(a.x, a.y - 6, t, 20, .5);
        if ("ling_chi_prop" === a.type) {
          Ha(n.Quest.linhChiDu());
        }
      }
  }
  function wa(a) {
    n.HUD.openDialog(a.name, 'Ngươi ngồi xuống phiến đá, hai tay bưng chén Linh Dược. Hơi nước lạnh từ lòng suối phả lên mặt, linh khí quanh chỗ ngồi đặc tới mức nhìn thấy được thành từng làn sương mỏng.\n\n"Uống xong là vận công ngay, chớ để dược lực tản mất" — lời Đại Phu dặn.', { actionLabel: "Uống Dược & Vận Công", onAction: function () {
        !function (a) {
          var e = i.player;
          n.Inventory.remove("tu_khi_duoc", 1);
          c("qi.surge");
          e.x = a.x;
          e.y = "spring" === a.type ? a.y + 22 : a.y - 4;
          n.Player.sit(e, !0);
          i.qiSurge = { t: 0, phase: -1, acc: 0, prop: a };
        }(a);
      } });
  }
  function Ca(a, e) {
    return [{ label: "Mở Quầy Đổi Hạt", note: "Đang có " + n.Progress.duocCong + " Dược Công", icon: "seed_luc", primary: Ma(), onChoose: function () {
          Ua(a);
        } }, { label: "Huỷ Nhiệm Vụ", note: "Hoàn lại 1 lượt nhận hôm nay · không mất Dược Công", icon: "scroll", onChoose: function () {
          !function (a, e) {
            var t = n.Quest;
            var o = e.dailyLimit || t.SEED_TASK_DAILY_LIMIT;
            var h = Math.min(o, t.seedTaskRunsLeft(e.id) + 1);
            n.HUD.openDialog(a, 'Lão khép cuốn sổ lại rồi hỏi lần nữa:\n\n"Huỷ việc ' + (e.shortName || e.name) + ' sao? Nguyên liệu đã nhặt vẫn ở trong túi, còn lượt nhận hôm nay sẽ được trả lại — không mất Dược Công."\n\nSau khi huỷ: còn ' + h + "/" + o + " lượt việc này hôm nay.", { choices: [{ label: "Quay Lại", onChoose: function () {
                    La(a);
                  } }, { label: "Xác Nhận Huỷ", note: "Không nhận thưởng · hoàn lại lượt đã nhận", icon: "scroll", onChoose: function () {
                    var e = t.cancelSeedQuest();
                    if (e) {
                      if ("escort" === e.kind) {
                        i.escortFollower = null;
                      }
                      ba();
                      ma();
                      n.VFX.spawnText(i.player.x, i.player.y - 58, "Đã huỷ việc · hoàn lại lượt", "#e8dfa0");
                      dn(!1);
                      La(a);
                    }
                  } }] });
          }(a, e);
        } }];
  }
  function La(a) {
    var e = n.Quest;
    var t = (n.Inventory, e.seedTaskInfo());
    if (t) {
      if ("tournament" === t.kind) {
        n.HUD.openDialog(a, "Việc Đại Hội đã được ghi vào sổ. Hãy thắng một trận đấu chính thức — trọng tài chốt kết quả xong sẽ tự ghi công và trao " + t.reward + " Điểm Dược Công + " + e.seedTaskStones(t) + " Linh Thạch. Mỗi ngày chỉ nhận thưởng một lần.", { choices: Ca(a, t) });
        return !0;
      }
      if ("escort" === t.kind) {
        n.HUD.openDialog(a, 'Đại Phu nhìn sang người cháu đang theo sau ngươi rồi dặn kỹ:\n\n"Bệnh nó đã khỏi, chỉ là chân tay còn yếu. Dẫn nó qua Rừng Trúc, về làng Tản Viên rồi giao tận tay Thầy Ông Nội. Tới nơi, Thầy Ông Nội sẽ ghi công cho ngươi."\n\nThưởng khi hoàn thành: ' + t.reward + " Điểm Dược Công + " + e.seedTaskStones(t) + " Linh Thạch.", { choices: Ca(a, t) });
        return !0;
      }
      var o = e.seedQuestProgress();
      var h = e.seedQuestComplete();
      var c = t.reward || e.DUOC_CONG_PER_TASK;
      var r = h ? { actionLabel: "fishing" === t.kind ? "Giao Ba Cá" : "Giao Nguyên Liệu", actionFirst: !0, onAction: function () {
          if (e.completeSeedQuest()) {
            ba();
            ma();
            n.VFX.spawnText(i.player.x, i.player.y - 58, "+" + c + " Dược Công", "#f0d27a");
            dn(!1);
            Ua(a);
          }
        }, reward: [{ icon: "scroll", name: "Điểm Dược Công", qty: c }, { icon: "spirit_stone", name: "Linh Thạch", qty: e.seedTaskStones(t) }], choices: Ca(a, t) } : { choices: Ca(a, t) };
      n.HUD.openDialog(a, h ? t.doneText || 'Đại Phu xem kỹ số nguyên liệu ngươi mang về, bẻ thử một mẩu rồi gật đầu:\n\n"Đủ rồi. Linh Chi giữ bào tử, Trúc Tâm giữ dược khí — có thứ này lão phu ủ lại đất, nhân một mẻ hạt mới cho ngươi được."' : "fishing" === t.kind ? '"Cá dùng làm thuốc lẫn nuôi linh thú đều phải còn tươi. ' + t.hint + '"\n\nĐã câu: ' + o + "/" + t.need + " cá." : '"Việc nhân hạt không thể làm tay không. ' + t.hint + '"\n\nĐã thu: ' + t.itemName + " " + o + "/" + t.need + ".", r);
      return !0;
    }
    if (!e.canOpenSeedMenu()) {
      return !1;
    }
    var u = e.availableSeedTasks().length;
    var l = [{ label: "Mở Quầy Đổi Hạt", note: Ma() ? "Đủ công đổi hạt · " + n.Progress.duocCong + " Dược Công" : "Đang có " + n.Progress.duocCong + " Dược Công", icon: "seed_luc", primary: Ma(), onChoose: function () {
          Ua(a);
        } }, { label: "Nhận Việc Dược Công", note: u ? "Còn " + n.Quest.seedTaskList().reduce(function (n, a) {
          return n + a.runsLeft;
        }, 0) + " lượt hôm nay" : "Hôm nay hết lượt · mai có việc mới", icon: "scroll", disabled: !u, primary: !Ma() && !!u, onChoose: function () {
          !function (a) {
            var e = n.Quest;
            var t = e.SEED_TASK_DAILY_LIMIT;
            n.HUD.openDialog(a, 'Lão lật cuốn sổ bìa vải, mặt giấy chia thành mấy dòng việc còn bỏ ngỏ:\n\n"Việc nào cũng có công của việc ấy. Ngươi tự chọn lấy một dòng — nhưng mỗi việc có hạn mức riêng trong ngày, dùng hết thì mai quay lại."', { choices: e.seedTaskList().map(function (o) {
                var h = o.def;
                var c = h.reward || e.DUOC_CONG_PER_TASK;
                var r = o.dailyLimit || t;
                return { label: h.shortName || h.name, note: o.exhausted ? "Hết " + r + "/" + r + " lượt hôm nay · mai mới mở lại" : h.place + " · thưởng " + c + " Dược Công + " + e.seedTaskStones(h) + " Linh Thạch · còn " + o.runsLeft + "/" + r + " lượt", icon: h.icon || "scroll", disabled: o.exhausted, onChoose: function () {
                    !function (a, e, t) {
                      var o = n.Quest;
                      var h = e.dailyLimit || o.SEED_TASK_DAILY_LIMIT;
                      n.HUD.openDialog(a, "Lão chấm ngón tay lên dòng ngươi chọn rồi nói:\n\n" + e.offerText + "\n\nHoàn thành sẽ nhận " + t + " Điểm Dược Công + " + o.seedTaskStones(e) + " Linh Thạch. Nhận việc này rồi thì hôm nay còn " + (o.seedTaskRunsLeft(e.id) - 1) + "/" + h + " lượt.", { actionLabel: "Nhận Việc Này", onAction: function () {
                          var a = o.startSeedQuest(e.id);
                          if (a) {
                            if ("escort" === a.kind) {
                              p();
                            }
                            ba();
                            ma();
                            n.VFX.spawnText(i.player.x, i.player.y - 58, "escort" === a.kind ? "Cháu Đại Phu đang theo sau" : "fishing" === a.kind ? "Nhận việc: câu đủ ba cá" : "tournament" === a.kind ? "Nhận việc: thắng Đại Hội" : "Nhận việc: " + a.itemName, "#f0d27a");
                            dn(!1);
                          }
                        }, reward: [{ icon: "scroll", name: "Điểm Dược Công", qty: t }, { icon: "spirit_stone", name: "Linh Thạch", qty: o.seedTaskStones(e) }] });
                    }(a, h, c);
                  } };
              }) });
          }(a);
        } }];
    var s = e.stageInfo();
    if (e.isActive() && s) {
      l.push({ label: "Hỏi Việc Chính", note: s.name, icon: "scroll", onChoose: function () {
          n.HUD.openDialog(a, s.hint);
        } });
    }
    n.HUD.openDialog(a, "Dược Công: " + n.Progress.duocCong + " điểm. Muốn lấy hạt thì mở quầy, thiếu công thì nhận việc.", { oneCol: !0, choices: l });
    return !0;
  }
  function Ia(a) {
    var e = n.Quest.buySeedPack(a.id);
    if (e) {
      n.VFX.spawnText(i.player.x, i.player.y - 58, "Đổi được " + e.name, "#bff3d8");
      dn(!1);
    }
  }
  function Ma() {
    var a = n.Quest;
    var e = n.Progress;
    return a.SEED_PACKS.some(function (n) {
      return a.packUnlocked(n) && e.duocCong >= n.cost;
    });
  }
  function Ua(a) {
    var e = n.Quest;
    var t = n.Progress;
    function i(n) {
      return e.packUnlocked(n) && t.duocCong >= n.cost;
    }
    var o = e.SEED_PACKS.slice().sort(function (n, a) {
      return (i(a) ? 1 : 0) - (i(n) ? 1 : 0);
    });
    n.HUD.openDialog(a, "Dược Công: " + t.duocCong + " điểm. Chạm gói hạt để đổi.", { oneCol: !0, choices: o.map(function (i) {
        var o = e.packUnlocked(i);
        var h = t.duocCong >= i.cost;
        var c = i.note + " · " + i.cost + " Dược Công";
        var r = o ? function (n, a) {
          for (var e = n.SEED_PACKS.indexOf(a) + 1; e < n.SEED_PACKS.length; e++)
            if (n.packUnlocked(n.SEED_PACKS[e])) {
              return n.SEED_PACKS[e];
            }
          return null;
        }(e, i) : null;
        if (r ? c = "Bậc thấp so với cảnh giới hiện tại · " + c : o && i.realm && (c = "Hợp cảnh giới · " + c), o) {
          if (!(h)) {
            c = "Còn thiếu " + (i.cost - t.duocCong) + " Dược Công · " + c;
          }
        }
        else {
          var u = n.realmById(i.realm);
          c = "Cần " + (u ? u.name : i.realm) + " mới đổi được · " + c;
        }
        return { label: "Đổi " + i.name, note: c, icon: i.give[0][0] && n.ITEMS[i.give[0][0]] ? n.ITEMS[i.give[0][0]].icon : "seed_luc", disabled: !o || !h, primary: o && h && !r, onChoose: function () {
            if (r) {
              (function (a, e, t) {
                var i = n.realmById(n.Progress.realmId);
                n.HUD.openDialog(a, 'Lão nheo mắt nhìn đạo hữu một lượt.\n\n"Tu vi ' + (i ? i.name : "như ngươi") + " mà còn đổi " + e.name + "? Hạt ấy chỉ để làm " + e.note.split("— ")[1] + ", ngươi dùng chẳng mấy nữa. " + t.name + ' mới hợp sức ngươi."\n\nĐổi gói này tốn ' + e.cost + " Dược Công (đang có " + n.Progress.duocCong + ").", { choices: [{ label: "Thôi, để xem lại", onChoose: function () {
                        Ua(a);
                      } }, { label: "Vẫn đổi " + e.name, note: "Trừ " + e.cost + " Dược Công · " + e.note, icon: n.ITEMS[e.give[0][0]] ? n.ITEMS[e.give[0][0]].icon : "seed_luc", onChoose: function () {
                        Ia(e);
                      } }] });
              })(a, i, r);
            }
            else {
              Ia(i);
            }
          } };
      }) });
  }
  function Aa(n) {
    return 7 === n.stage && !n.flags.bai_kien_dai_phu || n.canChonBinhKhi();
  }
  i.applyMach = function () {
    var a = n.Gateway && n.Gateway.mach;
    var t = i.map;
    if (a && t && t.data && t.data.id === a.mapId) {
      var o = Date.now();
      for (var h in a.rows) {
        var c = t.prop(h);
        if (c) {
          var r = a.rows[h].r;
          var u = "ling_chi_prop" === c.type;
          if (u) {
            c.off = !!r.off;
            if (c.off) {
              c.hidden = !0;
              c.regrowAt = 0;
            }
            else {
              if (!(r.con > 0)) {
                c.hidden = !1;
              }
            }
          }
          if ((c.doiCho || u) && Number.isInteger(r.tx) && Number.isInteger(r.ty)) {
            c.tx = r.tx;
            c.ty = r.ty;
            c.x = r.tx * e + e / 2;
            c.y = (r.ty + 1) * e;
            c.sortY = c.y;
          }
          var l = (Number(r.con) || 0) - (o - a.rows[h].at) / 1e3;
          if (!(c.off)) {
            if (l > 0) {
              c.hidden = !0;
              c.regrowAt = n.Game.time + l;
            }
            else {
              if (c.herb && c.regrowAt) {
                c.hidden = !1;
                c.regrowAt = 0;
              }
            }
          }
        }
      }
    }
  };
  var Fa = { thiet_kiem: "Nhẹ, ra đòn nhanh nhất · ngự kiếm bay tới", thiet_dao: "Mỗi nhát nặng nhất · ra đòn chậm", thiet_thuong: "Cân bằng · với xa nhất trong ba món" };
  function Sa(a) {
    var e = n.CONFIG.PLAYER;
    var t = a.attackTime || e.ATTACK_TIME;
    var i = e.REACH + (a.reachBonus || 0);
    return "Tốc độ " + (1 / t).toFixed(2).replace(".", ",") + " đòn/giây · Tầm " + Math.round(i) + "px";
  }
  function Pa(a) {
    var e = n.Quest;
    n.HUD.openDialog(a, 'Lão nhân kéo ra một bọc vải dầu, trong có ba món binh khí sắt:\n\n"Tầng 3 rồi mà còn cầm cây tre à? Yêu thú từ đây trở đi da dày lắm. Chọn LẤY MỘT món hợp tay."', { choices: e.BINH_KHI_CHOICES.map(function (e) {
        var t = n.ITEMS[e] || {};
        return { label: t.name || e, icon: t.icon, stats: "+" + (t.atkBonus || 0) + " công", note: Sa(t), desc: Fa[e] || "", onChoose: function () {
            !function (a, e) {
              var t = n.Quest;
              var o = n.ITEMS[e] || {};
              n.HUD.openDialog(o.name || e, (o.desc || "") + "\n\n" + (Fa[e] || "") + "\n+" + (o.atkBonus || 0) + " công · " + Sa(o) + ".\n\nChỉ được chọn một món, chọn rồi không đổi.", { actionLabel: "Nhận " + (o.name || "Món Này"), onAction: function () {
                  if (t.chonBinhKhi(e)) {
                    n.VFX.spawnText(i.player.x, i.player.y - 58, "Nhận: " + (o.name || e), "#e8dfa0");
                    dn();
                    n.HUD.openDialog(a, '"Cất đi — binh khí này đòi Luyện Khí Tầng 4 mới cầm nổi. Cửa ấy cần thêm một viên Tụ Khí Đan — trồng, săn Linh Thúy, luyện ở vườn như lần trước. Lên tầng rồi mở Hành Trang mà trang bị."');
                  }
                }, reward: [{ icon: o.icon, name: o.name || e, qty: 1 }], choices: [{ label: "Xem món khác", icon: "scroll", onChoose: function () {
                      Pa(a);
                    } }] });
            }(a, e);
          } };
      }) });
  }
  var Na = [[{ question: "Tụ Khí Đan dùng để làm gì?", answer: "Phá quan khi Đạo Hạnh đã đầy", choices: ["Phá quan khi Đạo Hạnh đã đầy", "Câu Linh Ngư", "Tăng số ô hành trang"] }, { question: "Yêu Cốt Vụn thường lấy từ đâu?", answer: "Yêu Quái Nhất Giai Hạ Phẩm ở Miếu Hoang", choices: ["Yêu Quái Nhất Giai Hạ Phẩm ở Miếu Hoang", "Cá ở Hồ Bích Thủy", "Đan lô trong làng"] }, { question: "Độc Đằng Độc Dịch rơi từ đâu?", answer: "Độc Đằng Yêu ở Thảo Dược Cốc", choices: ["Độc Đằng Yêu ở Thảo Dược Cốc", "Thợ Rèn làng Tản Viên", "Lão Đạo Hành Cước"] }, { question: "Bí Tịch dùng để làm gì?", answer: "Học pháp quyết mới", choices: ["Học pháp quyết mới", "Đổi lấy cá", "Mở luống linh thảo"] }], [{ question: "Có thể câu Linh Ngư ở đâu?", answer: "Hồ Bích Thủy hoặc Suối Dẫn Thủy", choices: ["Hồ Bích Thủy hoặc Suối Dẫn Thủy", "Miếu Hoang hoặc Long Uyên", "Đan Lô hoặc Rừng Trúc"] }, { question: "Muốn tìm Trúc Tâm thì nên tới đâu?", answer: "Rừng Trúc", choices: ["Rừng Trúc", "Huyết Xích Cấm Địa", "Hang Động"] }], [{ question: "Muốn vào Hang Động cần đạt cảnh giới nào?", answer: "Luyện Khí Tầng 7", choices: ["Luyện Khí Tầng 7", "Luyện Khí Tầng 3", "Phàm Nhân"] }, { question: "Ai chỉ đường vào Hang Động?", answer: "Lão Đạo Hành Cước ở cửa hang Long Uyên Cốc", choices: ["Lão Đạo Hành Cước ở cửa hang Long Uyên Cốc", "Đại Phu trong Dược Viên", "Chấp Sự ở Đại Hội"] }, { question: "Mở Linh Dược Rương cuối Hang Động cần vật gì?", answer: "Chìa Khoá", choices: ["Chìa Khoá", "Huyền Thiết Khoáng", "Linh Ngư"] }], [{ question: "Rèn Vũ Khí Huyền Thiết cần gì?", answer: "2 Huyền Thiết Khoáng và 50 Linh Thạch", choices: ["2 Huyền Thiết Khoáng và 50 Linh Thạch", "10 Yêu Cốt Vụn và 1 Linh Ngư", "3 Huyết Thảo và 2 Linh Thúy"] }, { question: "Mang nguyên liệu tới đâu để rèn vũ khí?", answer: "Thợ Rèn ở làng Tản Viên", choices: ["Thợ Rèn ở làng Tản Viên", "Đại Phu ở Thảo Dược Cốc", "Tàng Kinh Lão Nhân ở Miếu Hoang"] }, { question: "Huyền Thiết Khoáng chủ yếu dùng để làm gì?", answer: "Rèn vũ khí", choices: ["Rèn vũ khí", "Luyện Tụ Khí Đan", "Đổi lấy hạt giống"] }, { question: "Sau khi rèn xong vũ khí, người chơi sẽ bước vào phần nào?", answer: "Thử Lửa Đạo Tâm", choices: ["Thử Lửa Đạo Tâm", "Câu Một Linh Ngư", "Thu Hái Linh Thảo"] }], [{ question: "Muốn lấy Long Huyết cần làm gì?", answer: "Góp sức hạ Thần Thú Xích Long", choices: ["Góp sức hạ Thần Thú Xích Long", "Mở Linh Dược Rương", "Đổi bằng Dược Công"] }, { question: "Long Uyên nằm ở đâu?", answer: "Qua rìa phía đông Rừng Trúc", choices: ["Qua rìa phía đông Rừng Trúc", "Bên dưới Đan Lô", "Giữa Vườn Cá Nhân"] }, { question: "Bảng gỗ trước cửa Long Uyên dùng để làm gì?", answer: "Xem thời gian Xích Long xuất hiện", choices: ["Xem thời gian Xích Long xuất hiện", "Nhận Huyền Thiết Khoáng", "Học pháp quyết"] }, { question: "Huyết Xích Cấm Địa và Đại Hội Tu Tiên lần lượt thử điều gì?", answer: "Thử thân và thử tâm", choices: ["Thử thân và thử tâm", "Thử câu cá và luyện đan", "Thử trồng cây và khai khoáng"] }]];
  function Va() {
    if (n.Encyclopedia) {
      n.Encyclopedia.open();
    }
  }
  function Ba(a, e) {
    var t = n.Quest;
    if (t.bachKhoaXong()) {
      if (e) {
        n.VFX.spawnText(i.player.x, i.player.y - 58, "+" + t.BACH_KHOA_REWARD_STONES + " Linh Thạch", "#8fe0e6");
      }
      n.HUD.openDialog(a, (e ? 'Thầy Ông Nội gật đầu, khép quyển Bách Khoa lại, rồi đẩy tới một túi vải nhỏ kêu lanh canh:\n\n"Biết hỏi đúng chỗ thì đi đường xa cũng không lạc. Đây là ' + t.BACH_KHOA_REWARD_STONES + ' Linh Thạch, cầm lấy."\n\n' : "") + '"Chữ chép trong sách chưa phải là pháp. Sang tủ sách của Tàng Kinh Lão Nhân ngay bên kia sân, rút tới khi được một quyển bí tịch con CHƯA CÓ."', e ? { reward: [{ icon: "spirit_stone", name: "Linh Thạch", qty: t.BACH_KHOA_REWARD_STONES }] } : null);
    }
  }
  function Ea(a) {
    var e = n.Quest;
    var t = e.bachKhoaProgress();
    if (t >= e.BACH_KHOA_NEED) {
      Ba(a);
    }
    else {
      var i = Na[t];
      var o = i[Math.floor(Math.random() * i.length)];
      var h = o.choices.map(function (t) {
        return { label: t, onChoose: function () {
            if (t === o.answer) {
              if (e.recordBachKhoaAnswer(!0)) {
                dn(!1);
                if (e.bachKhoaXong()) {
                  Ba(a, !0);
                }
                else {
                  n.HUD.openDialog(a, "Đúng rồi. Con đã trả lời đúng " + e.bachKhoaProgress() + "/" + e.BACH_KHOA_NEED + " câu.", { actionLabel: "Câu tiếp theo", onAction: function () {
                      Ea(a);
                    } });
                }
              }
            }
            else {
              n.HUD.openDialog(a, "Chưa đúng. Con hãy mở Bách Khoa, xem lại mục liên quan rồi thử lại.\n\nGợi ý: " + o.answer + ".", { choices: [{ label: "Thử lại câu này", onChoose: function () {
                      Ea(a);
                    } }, { label: "Mở Bách Khoa Tu Tiên", onChoose: Va }] });
            }
          } };
      });
      h.push({ label: "Mở Bách Khoa Tu Tiên", note: "Tra cứu trước khi trả lời", onChoose: Va });
      n.HUD.openDialog(a, "Câu " + (t + 1) + "/" + e.BACH_KHOA_NEED + ":\n\n" + o.question, { choices: h });
    }
  }
  i.reviveAtHome = function (e) {
    var t = i.player;
    return !(!t || !t.downed || i.transitioning || (h() ? (c("revive", { mode: "home" }), 0) : (n.DownedUI.close(), n.Player.revive(t, a.DOWNED.HOME_HP), i.switchMap(a.DOWNED.HOME_MAP, null), n.Quest.save(), n.HUD.announce("Được đồng đạo khiêng về làng", "Thương thế tạm ổn, hãy đả tọa dưỡng lại"), setTimeout(function () {
      n.HUD.setCaption(null);
    }, 3600), e && n.VFX.spawnText(t.x, t.y - 52, "Nằm quá lâu — tự về làng", "#c9a45c"), 0)));
  };
  i.reviveLeftOffline = function () {
    var n = i.map && i.map.data ? i.map.data.id : "";
    if (i.reviveAreaOffline !== n) {
      i.reviveAreaOffline = n;
      i.reviveUsedOffline = 0;
    }
    return Math.max(0, a.DOWNED.MAX_REVIVES - (0 | i.reviveUsedOffline));
  };
  i.reviveOnSpot = function () {
    var e = i.player;
    return !(!e || !e.downed || (h() ? 0 === e.reviveLeft || (c("revive", { mode: "spot" }), 0) : i.reviveLeftOffline() <= 0 || (i.reviveUsedOffline = 1 + (0 | i.reviveUsedOffline), n.DownedUI.close(), n.Player.revive(e, a.DOWNED.ONSPOT_HP, a.DOWNED.ONSPOT_HP), n.Quest.save(), n.VFX.spawnText(e.x, e.y - 52, "Gượng dậy!", "#9df2dd"), 0)));
  };
  i.switchMap = function (a, e) {
    if (!i.transitioning) {
      if (h()) {
        var t = n.Game.time;
        if (i.enterAsk && i.enterAsk.mapId === a && t - i.enterAsk.at < Xa) {
          return;
        }
        i.enterAsk = { mapId: a, at: t };
        return void n.Gateway.enter(a);
      }
      Oa(a, e);
    }
  };
  var Xa = 1.2;
  var Ga = n.Probe || { on: !1, KIND: {}, now: function () {
      return 0;
    }, time: function () {
    }, sample: function () {
    }, count: function () {
    }, warn: function () {
    } };
  var Ra = null;
  i.enterServerMap = function (a) {
    if (i.enterAsk = null, i.player) {
      if (i.map && i.map.data && i.map.data.id === a.mapId) {
        (function () {
          if (i.transitioning) {
            Ga.sample(Ga.KIND.mapCancel, Ka, Ka + 1);
            Ka++;
            i.transitioning = !1;
            var a = document.getElementById("fade");
            if (a) {
              a.classList.remove("on");
            }
            if (n.LoadingScreen) {
              n.LoadingScreen.mapHide();
            }
          }
        })();
        if (i.player) {
          i.player.x = a.x;
          i.player.y = a.y;
          i.player.dir = 0 | a.dir;
          i.player.stop();
          if (n.Gateway && n.Gateway.teleported) {
            n.Gateway.teleported();
          }
          n.Camera.snapTo(a.x, a.y, n.Renderer.w, n.Renderer.h, i.map.pxWidth, i.map.pxHeight);
        }
        i.enemies = [];
        ma();
        return void (ra = a.l || []);
      }
      ra = a.l || [];
      ua = a.e || [];
      Oa(a.mapId, null, { x: a.x, y: a.y, dir: a.dir });
    }
    else {
      Ra = a;
    }
  };
  i.cancelApproach = function () {
    i.approach = null;
    i.tuChiDuong = !1;
    if (i.player) {
      i.player.stop();
    }
    i.autoPathTimer = 0;
  };
  var Ka = 0;
  function Oa(a, t, o) {
    var c = ++Ka;
    var l = Ga.now();
    Ga.sample(Ga.KIND.mapReq, c);
    i.transitioning = !0;
    var s = i.player;
    if (s) {
      s.stop();
    }
    var g = n.MapData.get ? n.MapData.get(a) : n.MapData[a.toUpperCase()] || n.MapData[a];
    if (!g) {
      console.error("[PNTT] Không tìm thấy dữ liệu map: " + a);
      return void (c === Ka && (i.transitioning = !1));
    }
    var d = document.getElementById("fade");
    if (d) {
      d.classList.add("on");
    }
    n.Audio.play("gate", { rate: .96 + .08 * Math.random() });
    var y = i.nenVeTay();
    y.forEach(function (n) {
      if (n.nha) {
        n.nha(g);
      }
    });
    var v = o ? o.x : t ? t.tx * e + e / 2 : null;
    var x = o ? o.y : t ? t.ty * e + e / 2 : null;
    y.forEach(function (n) {
      if (n.chuanBiTruoc) {
        n.chuanBiTruoc(g, v, x);
      }
    });
    var b = n.LoadingScreen;
    if (b) {
      b.mapShow(g.name);
    }
    var _ = new Promise(function (n) {
      setTimeout(n, 380);
    });
    var D = n.Assets && n.Assets.ensureMap ? n.Assets.ensureMap(g, b ? b.mapProgress : null) : Promise.resolve([]);
    var H = new Promise(function (n) {
      var a = Date.now() + 2e3;
      !function e() {
        if (c !== Ka || Date.now() >= a || y.every(function (n) {
          return !n.choXong || n.choXong(g);
        })) {
          return n();
        }
        setTimeout(e, 30);
      }();
    });
    Promise.all([_, D, H]).then(function () {
      if (c !== Ka) {
        Ga.sample(Ga.KIND.mapCancel, c, Ka);
        return void Ga.count("lượt chuyển cảnh bị lượt mới hơn thay thế");
      }
      if (b) {
        b.mapHide();
      }
      var a = Ga.now();
      if (Ga.time("chuyển cảnh · chờ tải", a - l), i.map = n.TileMap.load(g), Ga.time("chuyển cảnh · dựng bản đồ", Ga.now() - a), n.Gateway && n.Gateway.reset(), i.applyMach(), h() ? (i.enemies = [], ua && n.Gateway.buildMobs && n.Gateway.buildMobs(ua), ua = null) : m(), i.critters = f(i.map), u(), n.Farm.syncProps(i.map), o) {
        i.player.x = o.x;
        i.player.y = o.y;
        i.player.dir = 0 | o.dir;
      }
      else {
        var s = t || g.spawn || { tx: 7, ty: 2 };
        i.player.x = s.tx * e + e / 2;
        i.player.y = s.ty * e + e - 4;
      }
      i.player.vx = 0;
      i.player.vy = 0;
      i.player.state = "idle";
      p();
      n.Camera.snapTo(i.player.x, i.player.y, n.Renderer.w, n.Renderer.h, i.map.pxWidth, i.map.pxHeight);
      n.HUD.bind(i.player, i.map.data.name);
      (function () {
        if (i.map && i.map.data && "hang_dong_co" === i.map.data.id) {
          T();
          var a = n.Quest;
          var e = a.hangDongActive() && !a.flags.hang_dong_vao;
          if (!(h())) {
            a.enterHangDong();
          }
          if (e) {
            n.Camera.shake(4, .5);
            n.HUD.setCaption("Có thứ gì đó vừa cựa mình trong bóng tối cuối hang");
          }
          else {
            if (a.hangDongActive()) {
              n.HUD.setCaption(a.hasHangDongKey() ? "Đã có Chìa Khoá · mở Linh Dược Rương cuối hang" : "Hạ Thạch Giáp Yêu để lấy Chìa Khoá");
            }
          }
          n.HUD.updateQuest();
        }
      })();
      n.VFX.spawnText(i.player.x, i.player.y - 54, i.map.data.name, "#8cd97e");
      r(i.map.data);
      if (n.HuyetSacUI && n.HuyetSacUI.onMapEntered) {
        n.HuyetSacUI.onMapEntered();
      }
      Ga.sample(Ga.KIND.mapCommit, c, Math.round(Ga.now() - l));
      Ga.time("chuyển cảnh · tổng", Ga.now() - l);
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          if (c === Ka) {
            if (d) {
              d.classList.remove("on");
            }
            i.transitioning = !1;
          }
        });
      });
    }).catch(function (n) {
      Ga.count("chuyển bản đồ hỏng");
      console.error("[PNTT] Chuyển bản đồ hỏng:", n);
      if (c === Ka) {
        if (b) {
          b.mapHide();
        }
        if (d) {
          d.classList.remove("on");
        }
        i.transitioning = !1;
      }
    });
  }
}(window.PNTT);
