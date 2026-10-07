!function (e) {
  "use strict";
  var a = e.CONFIG;
  var i = e.RemotePlayer = {};
  var n = { attack: 1, seal: 1, palm: 1, cast: 1, guard: 1, hurt: 1 };
  function r(a, i) {
    var n = i.state || "idle";
    var r = i.ps || "";
    if (n === a.state && r === a.pose || (a.actTime = 0), a.state = n, a.pose = r, void 0 !== i.hp) {
      var l = Math.max(0, Math.min(1, i.hp / 100));
      if (a.seen && l < a.hp) {
        a.hurtT = .35;
      }
      a.hp = l;
    }
    if (void 0 !== i.bp) {
      a.bp = Math.max(0, Math.min(1, i.bp / 100));
    }
    if (void 0 !== i.dn) {
      t(a, !!i.dn);
    }
    a.doSat = !!i.ds;
    a.coChien = i.cc || "";
    a.freezeT = i.fz ? 1 : 0;
    var o = a.hinhId;
    a.hinhId = i.hh || null;
    if (a.hinhId && a.hinhId !== o) {
      a.hinhTuoi = 0;
    }
    a.linhAnT = i.la ? 1 : 0;
    var d = 0 | i.sx;
    var s = a.poisonT > 0;
    a.burnT = 1 & d ? 1 : 0;
    a.burnMa = !!(2 & d);
    a.stunT = 4 & d ? 1 : 0;
    a.slowT = 8 & d ? 1 : 0;
    a.poisonT = 16 & d ? 1 : 0;
    a.woundT = 32 & d ? 1 : 0;
    a.hasteT = 64 & d ? 1 : 0;
    a.shieldHp = a.shieldT = 128 & d ? 1 : 0;
    a.rootT = 256 & d ? 1 : 0;
    a.shieldLong = !!(512 & d);
    a.shieldBell = !!(1024 & d);
    a.resistN = 0 | i.rk;
    if (a.poisonT > 0 && !s && a.seen && e.VFX && e.VFX.spawnPoisoned) {
      e.VFX.spawnPoisoned(a, 3);
    }
    a.fishing = !!i.fs;
    if (void 0 !== i.fx) {
      a.fishX = i.fx;
    }
    if (void 0 !== i.fy) {
      a.fishY = i.fy;
    }
  }
  function t(e, i) {
    if (i !== e.downed) {
      e.downed = i;
      e.bloodT = i ? a.DOWNED.BLOOD_EVERY : 0;
      if (i) {
        e.state = "down";
        e.pose = "";
        e.actTime = 0;
      }
    }
  }
  function l(a) {
    if (null == a) {
      return null;
    }
    var i = e.Gateway;
    if (i && a === i.selfId && e.SceneWorld && e.SceneWorld.player) {
      return e.SceneWorld.player;
    }
    var n = i && i.remotes && i.remotes[a];
    return n && !n.downed ? n : function (a) {
      var i = e.SceneWorld && e.SceneWorld.enemies;
      if (null == a || !i) {
        return null;
      }
      if (e.Enemy && e.Enemy.find) {
        var n = e.Enemy.find(i, a);
        return n && !n.dead ? n : null;
      }
      for (var r = 0; r < i.length; r++)
        if (i[r].id === a && !i[r].dead) {
          return i[r];
        }
      return null;
    }(a);
  }
  function o(a, i, n, r) {
    if (e.Camera && e.Camera.shakeAt) {
      e.Camera.shakeAt(a, i, n, r);
    }
  }
  function d(a, i) {
    return e.Camera && e.Camera.nearness ? e.Camera.nearness(a, i) : 0;
  }
  function s(i) {
    var r = "pose" === i.state && i.pose ? i.pose : i.state;
    if (i.flying && e.Player && e.Player.flySeated && e.Player.flySeated(i.cfg) && !i.downed && "attack" !== r && "hurt" !== r) {
      r = "sit";
    }
    else {
      if (i.flying && "walk" === r) {
        r = "idle";
      }
    }
    var t = a.ANIM[r] || a.ANIM.idle;
    var l = t.cols.length;
    if (n[r]) {
      var o = Math.min(l - 1, Math.floor(i.actTime * t.fps));
      return "pose" === i.state && i.stepHold > 0 && !i.flying && e.Player && e.Player.walkActCol ? e.Player.walkActCol(r, o, t.cols[o], i.walkT) : t.cols[o];
    }
    return t.cols[Math.floor(i.animTime * t.fps) % l];
  }
  function f(i, n, r, t) {
    if (e.VFX.spawnChamBay) {
      var l = i.flyRise > 0 ? a.FLY.HOVER * i.flyRise : 0;
      e.VFX.spawnChamBay(i.x, i.y - 12 - l, n, r, t);
    }
  }
  i.create = function (e, a) {
    var n = { id: e, name: "", doSat: !1, realm: "", tong: null, cfg: null, sheet: null, sheetKey: null, sheetPending: !1, bp: 0, x: 0, y: 0, tx: 0, ty: 0, dir: 0, state: "idle", pose: "", flying: !1, fishing: !1, fishX: 0, fishY: 0, flyRise: 0, downed: !1, hp: 1, hurtT: 0, duelResult: null, animTime: 0, actTime: 0, moteT: 0, bloodT: 0, trailT: 0, seen: !1, lastPacketAt: -99 };
    i.setIdentity(n, a);
    return n;
  };
  i.setIdentity = function (a, i) {
    if (i) {
      a.name = i.name || a.name || "Đạo hữu";
      if (i.realm) {
        a.realm = i.realm;
      }
      if ("tong" in i) {
        a.tong = i.tong || null;
      }
      if ("phanThan" in i) {
        a.phanThan = !!i.phanThan;
      }
      var n = i.cfg;
      if (n && JSON.stringify(n) !== JSON.stringify(a.cfg)) {
        var l = !(!a.cfg || !a.cfg.lucTinh);
        a.cfg = n;
        if (!l && n.lucTinh && e.LucTinhTrucKiem) {
          e.LucTinhTrucKiem.summon(a, e.Game ? e.Game.time : 0);
        }
        else {
          if (l && !n.lucTinh) {
            a.lucTinhAttack = null;
            a.lucTinhSummonAt = -1 / 0;
          }
        }
        var o = e.SpriteFactory;
        if (o.request) {
          var d = o.request(n);
          a.sheet = d.sheet;
          a.sheetKey = d.key;
          a.sheetPending = !!d.pending;
        }
        else {
          a.sheet = o.get(n);
          a.sheetKey = null;
          a.sheetPending = !1;
        }
      }
      var s = i.pos;
      if (s) {
        var f = e.Game.time - a.lastPacketAt > 2;
        if (a.seen) {
          if (f) {
            a.tx = s.x;
            a.ty = s.y;
            if (void 0 !== s.dir) {
              a.dir = 0 | s.dir;
            }
            r(a, s);
          }
          else {
            if (void 0 !== s.dn) {
              t(a, !!s.dn);
            }
          }
        }
        else {
          a.x = s.x;
          a.y = s.y;
          a.tx = s.x;
          a.ty = s.y;
          a.dir = 0 | s.dir;
          r(a, s);
          a.seen = !0;
        }
      }
    }
  };
  i.setTarget = function (a, i) {
    a.lastPacketAt = e.Game.time;
    a.tx = i.x;
    a.ty = i.y;
    a.dir = 0 | i.dir;
    a.flying = !!i.fly;
    if (!(a.seen)) {
      a.x = i.x;
      a.y = i.y;
      a.seen = !0;
    }
    r(a, i);
  };
  i.act = function (i, n) {
    if (n && e.VFX) {
      var r = void 0 === n.x ? i.x : n.x;
      var s = void 0 === n.y ? i.y : n.y;
      if (void 0 !== n.d && (i.dir = 0 | n.d), !(e.Quality && e.Quality.anNguoi && e.Quality.anNguoi(i))) {
        switch (n.k) {
          case "swing":
            var h = !1;
            if (i.state = "attack", i.pose = "", i.actTime = 0, i.veCham) {
              var u = c[0 | i.dir] || c[0];
              f(i, i.x + 30 * u[0], i.y - 12 + 18 * u[1], "#ffe08a");
              break;
            }
            if (e.Quality && e.Quality.boDonXa && e.Quality.boDonXa({ x: r, y: s })) {
              break;
            }
            if (e.Player && e.Player.hasPhiKiem && (e.Player.hasPhiKiem(i.cfg) || e.LucTinhTrucKiem && e.LucTinhTrucKiem.enabled(i))) {
              e.Player.startPhiKiem(i, null);
            }
            else if (i.cfg && "luc_tinh_kiem" === i.cfg.weapon) {
              var y = e.ITEMS && e.ITEMS[i.cfg.weapon];
              if (y && "phong_doc" === y.attackVfx && e.VFX.spawnFanAttack) {
                e.VFX.spawnFanAttack(r, s, a.DIRS[i.dir] || "down");
              }
              if (e.VFX.spawnLucTinhKiemSlash) {
                e.VFX.spawnLucTinhKiemSlash(r, s, i.dir);
              }
            }
            else if (e.ITEMS && i.cfg && e.ITEMS[i.cfg.weapon] && "phong_doc" === e.ITEMS[i.cfg.weapon].attackVfx && e.VFX.spawnFanAttack) {
              e.VFX.spawnFanAttack(r, s, a.DIRS[i.dir] || "down");
            }
            else if (e.WeaponArt && e.WeaponArt.defOf && e.WeaponArt.defOf(i.cfg) && "truc_con" === e.WeaponArt.defOf(i.cfg).id && e.VFX.spawnTrucConAction2) {
              e.VFX.spawnTrucConAction2(r, s, a.DIRS[i.dir] || "down");
            }
            else if (i.cfg && "sao_ngoc_luu" === i.cfg.weapon && e.VFX.spawnSaoNgocLuuWave) {
              e.VFX.spawnSaoNgocLuuWave(r, s, a.DIRS[i.dir] || "down");
            }
            else if (i.cfg && "truc_tieu" === i.cfg.weapon && e.VFX.spawnTrucTieuWave) {
              e.VFX.spawnTrucTieuWave(r, s, a.DIRS[i.dir] || "down");
            }
            else if (i.cfg && "xich_viem_song_kich" === i.cfg.weapon && e.VFX.spawnSongKichFlurry) {
              e.VFX.spawnSongKichFlurry(r, s, a.DIRS[i.dir] || "down");
            }
            else if (i.cfg && e.ITEMS && e.ITEMS[i.cfg.weapon] && e.ITEMS[i.cfg.weapon].roi && e.VFX.spawnLoiTienLash) {
              e.VFX.spawnLoiTienLash(r, s, a.DIRS[i.dir] || "down", null, { owner: i, sfx: "remote", weapon: i.cfg.weapon, crackAt: e.ITEMS[i.cfg.weapon].attackTime * e.ITEMS[i.cfg.weapon].hitAt, strikeAt: .35 * e.ITEMS[i.cfg.weapon].attackTime, endAt: e.ITEMS[i.cfg.weapon].attackTime });
              h = !0;
            }
            else if (e.WeaponArt && e.WeaponArt.defOf && e.WeaponArt.defOf(i.cfg) && "huyet_ma_liem" === e.WeaponArt.defOf(i.cfg).id && e.VFX.spawnHuyetMaLiemSwing) {
              var m = e.ITEMS && e.ITEMS.huyet_ma_liem;
              e.VFX.spawnHuyetMaLiemSwing(r, s, a.DIRS[i.dir] || "down", null, { duration: m ? m.attackTime * (1 - m.hitAt) : .7, hitU: .3 });
            }
            else {
              var w = e.WeaponArt && e.WeaponArt.arcOf(i.cfg, a.DIRS[i.dir] || "down");
              if (w) {
                e.VFX.spawnBladeArc(r, s, w);
              }
              else {
                e.VFX.spawnSlash(r, s, i.dir);
              }
            }
            var p = e.Audio.weaponAttackSfx ? e.Audio.weaponAttackSfx(i.cfg && i.cfg.weapon) : "swing";
            if (!(h)) {
              e.Audio.atPoint(p, r, s, { gain: .7, rate: .9 + .2 * Math.random() });
            }
            o(r, s, 2.4, .12);
            break;
          case "thunder":
            if (i.veCham && d(r, s) <= 0) {
              f(i, r, s - 6, "#cfefff");
              break;
            }
            if (e.Audio.atPointSkill) {
              e.Audio.atPointSkill({ id: "loi_chuong" }, r, s);
            }
            else {
              e.Audio.atPoint("thunder", r, s);
            }
            e.VFX.spawnLightning(r, s);
            if (d(r, s) > 0) {
              e.VFX.spawnFlash(.12, "#cfefff");
            }
            o(r, s, 5, .26);
            break;
          case "spell":
            var T = e.Skills && e.Skills.DEFS ? e.Skills.DEFS[n.s] : null;
            if (!T) {
              break;
            }
            var g = { x: n.ax, y: n.ay, target: l(n.t) };
            var P = e.Quality && e.Quality.remoteSpell ? e.Quality.remoteSpell(T, { x: r, y: s }, g) : "full";
            if ("skip" === P) {
              break;
            }
            if ("cham" === P) {
              var x = "aura" === T.shape || "self" === T.shape ? null : g.target || g;
              var v = c[0 | i.dir] || c[0];
              if (!(x && Number.isFinite(x.x) && Number.isFinite(x.y))) {
                x = { x: r + 30 * v[0], y: s + 18 * v[1] };
              }
              f(i, x.x, x.y - 6, T.colors && T.colors.glow || "#9fe0ff");
              break;
            }
            if (e.Audio.atPointSkill && e.Audio.atPointSkill(T, r, s), "lite" === P) {
              var S = "aura" === T.shape || "self" === T.shape ? { x: r, y: s } : g.target || g;
              if (Number.isFinite(S.x) && Number.isFinite(S.y)) {
                e.VFX.spawnRing(S.x, S.y - 6, T.colors.glow, Math.min(40, T.blastR || 18), .4);
              }
              break;
            }
            e.Skills.cast({ x: r, y: s, dir: 0 | i.dir, flyRise: i.flyRise || 0, cfg: i.cfg, vfxOwner: i, variant: n.v }, T, g, !0);
            break;
          case "realm":
            if (n.r) {
              i.realm = n.r;
            }
            break;
          case "hurt":
            i.hurtT = .35;
            (function (a, i, n, r) {
              var t = e.Skills && e.Skills.PASSIVES ? e.Skills.PASSIVES[i.s] : null;
              if (t) {
                var l = t.colors;
                if (i.w > 0) {
                  if (e.VFX.spawnGoldenWard) {
                    e.VFX.spawnGoldenWard(n, r, l);
                  }
                }
                else {
                  if (i.g > 0 && e.VFX.spawnSpringHeal) {
                    e.VFX.spawnSpringHeal(n, r, l);
                  }
                }
              }
            })(0, n, r, s);
            break;
          case "down":
            e.Audio.atPoint("down", r, s, { gain: .6 });
            t(i, !0);
            i.hp = 0;
            e.VFX.spawnBloodSpit(r, s, i.dir, 9);
            e.VFX.spawnBloodPool(r, s);
            o(r, s, 5, .45);
            break;
          case "revive":
            t(i, !1);
            i.reviveShield = a.DOWNED.REVIVE_INVULN;
            e.VFX.spawnRing(r, s - 16, "#9df2dd", 34, .7);
            break;
          case "ascend":
            e.VFX.spawnRing(r, s - 14, "#dff3ff", 90, .9);
            e.VFX.spawnRing(r, s - 14, "#bff3d8", 58, .7);
            e.VFX.spawnPillar(r, s, 1.8);
            if (n.r) {
              i.realm = n.r;
            }
            o(r, s, 4.5, .35);
        }
      }
    }
  };
  i.update = function (i, n) {
    if (i.animTime += n, i.actTime += n, i.hinhId && (i.hinhTuoi = (i.hinhTuoi || 0) + n), i.hurtT > 0 && (i.hurtT -= n), i.reviveShield > 0 && (i.reviveShield = Math.max(0, i.reviveShield - n)), i.sheetPending) {
      var r = e.SpriteFactory.peek && e.SpriteFactory.peek(i.sheetKey);
      if (r) {
        i.sheet = r;
        i.sheetPending = !1;
      }
    }
    if (!(e.Gateway && e.Gateway.netBuffer && e.Gateway.netBuffer.place(i, i.id))) {
      var t = Math.min(1, 12 * n);
      i.x += (i.tx - i.x) * t;
      i.y += (i.ty - i.y) * t;
    }
    var l = Math.abs(i.x - (void 0 === i.lastX ? i.x : i.lastX)) + Math.abs(i.y - (void 0 === i.lastY ? i.y : i.lastY));
    i.lastX = i.x;
    i.lastY = i.y;
    i.stepHold = l > .05 ? .15 : Math.max(0, (i.stepHold || 0) - n);
    if (i.stepHold > 0 && !i.flying) {
      i.walkT = (i.walkT || 0) + n * a.PLAYER.CAST_MOVE_MULT;
    }
    var o = i.flying ? 1 : 0;
    if (i.flyRise !== o) {
      var d = n / a.FLY.RISE_TIME;
      i.flyRise = i.flyRise < o ? Math.min(o, i.flyRise + d) : Math.max(o, i.flyRise - d);
    }
    if (e.VFX) {
      if (i.downed) {
        i.bloodT -= n;
        if (i.bloodT <= 0) {
          i.bloodT = a.DOWNED.BLOOD_EVERY;
          e.VFX.spawnBloodSpit(i.x, i.y, i.dir, 3);
        }
      }
      else if ("sit" === i.state) {
        var s = i.cfg && i.cfg.realmId;
        var f = s && e.realmIndexById && e.realmIndexById(s) >= e.realmIndexById("truc_co_1");
        if (f) {
          i.meditateRingT = (void 0 === i.meditateRingT ? 2.6 : i.meditateRingT) - n;
          if (i.meditateRingT <= 0) {
            i.meditateRingT = 2.6;
            e.VFX.spawnRing(i.x, i.y - 18, "#9adbd0", 22, .58);
          }
        }
        i.moteT -= n;
        if (i.moteT <= 0) {
          i.moteT = a.MEDITATE.MOTE_EVERY;
          e.VFX.spawnGather(i.x, i.y);
          if (f) {
            e.VFX.spawnGather(i.x, i.y, 58 + 20 * Math.random());
          }
        }
      }
      if (i.flyRise > 0 && (Math.abs(i.tx - i.x) > .6 || Math.abs(i.ty - i.y) > .6)) {
        i.trailT -= n;
        if (i.trailT <= 0) {
          i.trailT = a.FLY.TRAIL_EVERY;
          e.VFX.spawnFlyTrail(i.x, i.y - a.FLY.HOVER * i.flyRise - 2, 1 === i.dir ? -1 : 2 === i.dir ? 1 : 0);
        }
      }
    }
  };
  i.frameCol = s;
  i.draw = function (n, r, t, l, o) {
    if (n.veCham) {
      !function (n, r, t, l) {
        var o = n.flyRise > 0 ? a.FLY.HOVER * n.flyRise : 0;
        var d = Math.round(n.x - t);
        var s = Math.round(n.y - l - o);
        var f = i.tagStyle(n);
        var c = n.downed ? "#7a7a7a" : f.nameColor || "#e8e0c8";
        e.Pixel.ellipse(r, d, Math.round(n.y - l) - 1, 4, 2, e.Palette.WORLD.shadow, null);
        e.Pixel.ellipse(r, d, s - 12, 3, 3, c, "#000000");
        if (n.hurtT > 0) {
          e.Pixel.ellipse(r, d, s - 12, 5, 5, null, "#ffd9d0");
        }
        y(n, r, d, s + a.CHAR_ANCHOR_Y - 19);
      }(n, r, t, l);
    }
    else if (n.sheet) {
      var d = !!n.veGian;
      var f = n.flyRise > 0 ? a.FLY.HOVER * n.flyRise + 1.2 * Math.sin(3 * n.animTime) * n.flyRise : 0;
      var c = Math.round(n.x - a.CHAR_ANCHOR_X - t);
      var h = Math.round(n.y - a.CHAR_ANCHOR_Y - l - f);
      var u = Math.round(n.x - t);
      var m = Math.round(n.y - l);
      var w = !(!n.hinhId || n.downed || !e.Player || !e.Player.sheetHinh);
      var p = w ? e.Player.sheetHinh(n, n.hinhId) : null;
      e.Pixel.ellipse(r, u, m - 1, 8 * (1 - .35 * n.flyRise), 3 * (1 - .3 * n.flyRise), e.Palette.WORLD.shadow, null);
      if (w && !d && e.XichMaFX) {
        e.XichMaFX.aura(r, u, m - f, n, n.animTime, "back");
      }
      var T = 3 === n.dir;
      if (!d && !T && e.Player && e.Player.drawBackgroundAura) {
        e.Player.drawBackgroundAura(r, u, m - f, n);
      }
      if (!d && e.VFX && e.VFX.drawPlayerStatus) {
        e.VFX.drawPlayerStatus(r, u, m - f, n, n.animTime, "back");
      }
      if (e.VFX && e.VFX.watchStatus) {
        e.VFX.watchStatus(n, n.x, n.y - 50 - f);
      }
      var g = e.Player && e.Player.flyArt ? e.Player.flyArt(n.cfg) : null;
      var P = "canh" === g && e.Player.flyWingLayer ? e.Player.flyWingLayer(n) : null;
      if (!d && n.flyRise > 0 && "canh" === g && e.Player && e.Player.drawPhongLoiRunVfx) {
        e.Player.drawPhongLoiRunVfx(r, u, m - f, n);
      }
      if (n.flyRise > 0 && e.Player && e.Player.drawFlyMount && ("canh" !== g || "back" === P)) {
        e.Player.drawFlyMount(r, u, m - f, n);
      }
      var x = !d && e.LucTinhTrucKiem && e.LucTinhTrucKiem.enabled(n);
      if (x && e.Player && e.Player.drawPhiKiem && (e.Player.drawLucTinhKiemAura && e.Player.drawLucTinhKiemAura(r, u, m - f, n, "back"), e.LucTinhTrucKiem.drawLayer(r, n, t, l, "back", e.Player.drawPhiKiem, n.x, n.y - f - 28)), p) {
        e.SpriteFactory.drawBody(r, p, n.dir, s(n), c, h, e.Player.cfgHinh(n, n.hinhId));
      }
      else {
        var v = n.downed && !n.sheetPending ? e.SpriteFactory.getPale(n.cfg) : n.sheet;
        e.SpriteFactory.drawBody(r, v, n.dir, s(n), c, h, n.cfg);
      }
      if (n.flyRise > 0 && e.ThuCuoi && e.ThuCuoi.drawFront) {
        e.ThuCuoi.drawFront(r, u, m - f, n);   // Nghịch Tiên: lớp trước của thú cưỡi
      }
      if (w && !d && e.XichMaFX && e.XichMaFX.aura(r, u, m - f, n, n.animTime, "front"), n.flyRise > 0 && "canh" === g && "front" === P && e.Player.drawFlyWings && e.Player.drawFlyWings(r, u, m - f, n), !d && n.flyRise > 0 && "canh" === g && e.Player.drawPhongLoiFrontVfx && e.Player.drawPhongLoiFrontVfx(r, u, m - f, n), n.reviveShield > 0 && e.Player && e.Player.drawReviveShield && e.Player.drawReviveShield(r, u, m - f, n.reviveShield, n.animTime), !d && T && e.Player && e.Player.drawBackgroundAura && e.Player.drawBackgroundAura(r, u, m - f, n), x && e.Player && e.Player.drawPhiKiem) {
        if (e.Player.drawLucTinhKiemAura) {
          e.Player.drawLucTinhKiemAura(r, u, m - f, n, "front");
        }
        e.LucTinhTrucKiem.drawLayer(r, n, t, l, "front", e.Player.drawPhiKiem, n.x, n.y - f - 28);
      }
      else if (e.Player && e.Player.phiKiemPose) {
        var S = e.Player.phiKiemPose(n);
        if (S) {
          e.Player.drawPhiKiem(r, S, t, l);
        }
      }
      if (n.fishing) {
        var F = Math.round(n.x - t + (1 === n.dir ? -5 : 5));
        var A = Math.round(n.y - l - 22);
        var M = Math.round(n.fishX - t);
        var R = Math.round(n.fishY - l + 1.5 * Math.sin(5 * (o || n.animTime || 0)));
        var V = Math.round(F + .55 * (M - F));
        var X = Math.round(Math.min(A - 13, A + .35 * (R - A)));
        e.Pixel.line(r, F, A, V, X, "#6a4322");
        e.Pixel.line(r, F + 1, A, V + 1, X, "#b07a42");
        e.Pixel.line(r, V, X, M, R, "#e9f3ec");
        e.Pixel.ellipse(r, M, R, 3, 2, "#f2f0df", "#3c3025");
        e.Pixel.r(r, M - 2, R - 1, 5, 1, "#c94f3f");
      }
      if (!d && e.VFX && e.VFX.drawPlayerStatus) {
        e.VFX.drawPlayerStatus(r, u, m - f, n, n.animTime, "front");
      }
      if (n.freezeT > 0 && e.VFX && e.VFX.drawPlayerFrozen) {
        e.VFX.drawPlayerFrozen(r, u, m - f, n, n.animTime);
      }
      y(n, r, u, m - f);
    }
  };
  var c = [[0, 1], [-1, 0], [1, 0], [0, -1]];
  i.offscreen = function (a) {
    if (a.sheet && e.Player && e.Player.phiKiemPose) {
      e.Player.phiKiemPose(a);
    }
  };
  i.tagStyle = function (a) {
    var i = e.Gateway;
    var n = !(!i || !(i.duel && i.duel.id === a.id || i.tmcLaDich && i.tmcLaDich(a.id)));
    var r = !!a.doSat;
    var t = !r && !!(e.Gateway && e.Gateway.honNghiep && e.Gateway.honNghiep[a.id]);
    var l = !!(e.Targeting && e.Targeting.coDich && e.Targeting.coDich(a));
    var o = e.Gateway && e.Gateway.daoCua && e.Gateway.daoCua[a.id] || "";
    var d = !!(o && e.Targeting && e.Targeting.daoDich && e.Targeting.daoDich(a));
    return { doiThu: n, doSat: r, coDich: l || d, bar: n || r || l || d || a.hp < 1 || a.downed, barW: n || r ? 24 : 18, frame: r ? "#4a0806" : n ? "#3a0f0c" : "#1a1410", nameColor: r ? "#ff2d1a" : n ? "#ff5b4d" : a.downed ? "#9aa3ad" : t ? "#a8323c" : "chinh" === o ? "#ffd86b" : "ma" === o ? "#c88cff" : "#bfe0ff" };
  };
  var h = {};
  i.veDauTong = function (a, i, n, r) {
    if (!(r && e.Sect && e.SectEmblem && e.Utils)) {
      return 0;
    }
    var t = n - 16 + 3;
    var l = e.Pixel.overlayScale ? e.Pixel.overlayScale() : 1;
    l = Math.max(1, Math.round(100 * l) / 100);
    e.Pixel.mapImage(a, i, t, function (a, i, n) {
      var r = a + "|" + (i || "-") + "|" + n;
      if (h[r]) {
        return h[r];
      }
      var t = Math.max(1, Math.round(16 * n));
      var l = e.Utils.canvas(t, t);
      if (l.ctx.imageSmoothingEnabled = !1, l.ctx.drawImage(e.SectEmblem.canvas(a), 0, 0, t, t), i) {
        var o = Math.max(1, Math.round(n));
        l.ctx.fillStyle = i;
        l.ctx.fillRect(0, 0, t, o);
        l.ctx.fillRect(0, t - o, t, o);
        l.ctx.fillRect(0, 0, o, t);
        l.ctx.fillRect(t - o, 0, o, t);
      }
      h[r] = l.canvas;
      return l.canvas;
    }(r.dau, function (a) {
      if (!e.Sect.CHUC) {
        return null;
      }
      if (a !== e.Sect.CHUC.TONG_CHU && a !== e.Sect.CHUC.TRUONG_LAO) {
        return null;
      }
      var i = e.Sect.mauChuc(a);
      return i && i.vien || null;
    }(r.chuc), l), 16, 16);
    return 17;
  };
  i.veTenCoDau = function (a, n, r, t, l, o, d, s) {
    e.Pixel.text(a, n, r, t, l, "#000000", o, "center");
    var f = s && e.CoChien ? e.CoChien.def(s) : null;
    if ((d && e.Sect || f) && e.Pixel.textWidthFor) {
      var c = e.Pixel.textWidthFor(a, t, o);
      if (d && e.Sect) {
        i.veDauTong(a, n - c / 2 - 1 - 16, r, d);
      }
      if (f) {
        i.veCoChien(a, n + c / 2 + 2, r, f);
      }
    }
  };
  i.veCoChien = function (a, i, n, r) {
    var t = n - 8;
    e.Pixel.r(a, i, t, 1, 9, "#2a1a0c");
    e.Pixel.r(a, i + 1, t, 6, 5, r.vien);
    e.Pixel.r(a, i + 2, t + 1, 4, 3, r.mau);
  };
  var u = ["manhcute"];
  function y(n, r, t, l) {
    var o = l - a.CHAR_ANCHOR_Y - 3;
    var d = o - 10;
    var s = "500 7px " + e.Pixel.MAP_FONT;
    var f = "500 8.4px " + e.Pixel.MAP_FONT;
    var c = i.tagStyle(n);
    var h = n.duelResult && n.duelResult.until > Date.now() ? n.duelResult : null;
    if (!h && n.duelResult && (n.duelResult = null), h) {
      var u = "win" === h.result ? "THẮNG" : "lose" === h.result ? "THUA" : "champ" === h.result ? "VÔ ĐỊCH" : "HOÀ";
      var y = "win" === h.result ? "#ffe08a" : "lose" === h.result ? "#ff8a7a" : "champ" === h.result ? "#ffd23a" : "#d9e4f2";
      e.Pixel.text(r, t, d - 17, u, y, "#000000", "700 10px " + e.Pixel.MAP_FONT, "center");
    }
    if (c.bar) {
      var m = c.barW;
      var w = t - m / 2;
      var p = d - 11;
      e.Pixel.r(r, w - 1, p - 1, m + 2, 4, c.frame);
      e.Pixel.r(r, w, p, m, 2, "#5a1c16");
      e.Pixel.r(r, w, p, Math.max(0, Math.round(m * n.hp)), 2, n.hurtT > 0 ? "#ffd9d0" : "#e0604a");
      if (c.doiThu && n.bp > 0) {
        e.Pixel.r(r, w, p + 2, m, 1, "#3a2a12");
        e.Pixel.r(r, w, p + 2, Math.max(0, Math.round(m * n.bp)), 1, "#f59e42");
      }
    }
    if (n.name) {
      i.veTenCoDau(r, t, d, String(n.name).toLowerCase(), c.nameColor, f, n.tong, n.coChien);
      if (i.laAdmin(n.name)) {
        i.veNhanAdmin(r, t, c.bar ? d - 15 : d - 9);
      }
      else {
        if (n.phanThan) {
          i.veNhanPhanThan(r, t, c.bar ? d - 15 : d - 9);
        }
      }
    }
    var T = n.downed ? "Trọng Thương" : function (a) {
      if (!a || !e.realmById) {
        return "";
      }
      var i = e.realmById(a);
      return i ? i.name : "";
    }(n.realm);
    if (T) {
      e.Pixel.text(r, t, o, T, n.downed ? "#e04b4b" : "#9fb59a", "#000000", s, "center");
    }
  }
  i.laAdmin = function (e) {
    return u.indexOf(String(e || "").toLowerCase()) >= 0;
  };
  i.veNhanPhanThan = function (a, i, n) {
    e.Pixel.text(a, i, n, "Phân thân", "#b9a7ff", "#000000", "700 7px " + e.Pixel.MAP_FONT, "center");
  };
  i.veNhanAdmin = function (a, i, n) {
    e.Pixel.text(a, i, n, "ADMIN", "#ff5a45", "#000000", "700 7px " + e.Pixel.MAP_FONT, "center");
  };
}(window.PNTT);
