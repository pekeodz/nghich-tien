/* Nghịch Tiên — Long Quy (Đường Chủ Bạch Hổ Đường) và Thử Bảo.
 *
 * Long Quy: sprite assets/sprites/mob/long_quy.png (1 dải 32 khung, quay phải, quay trái thì lật).
 *   Đánh thường: cắn ở cự ly gần (AI gốc của Enemy).
 *   Chiêu 1 · Lao Tới Cắn: thu mình, lao thẳng tới chỗ người chơi vừa đứng, đớp mạnh.
 *   Chiêu 2 · Long Hống: vươn cổ gầm, sóng âm tỏa vòng tròn — trúng thì mất máu và bị choáng.
 *   Chiêu 3 · Quy Giáp: rụt vào mai, khiên vòm hiện ra, giảm mạnh sát thương nhận vào và hồi máu dần, rồi chui ra.
 * Thử Bảo: chuột mang bảo vật, 20 máu, đòn nào trúng cũng chỉ mất đúng 1 máu, thấy người là chạy.
 *
 * Mọi con số chỉnh ở CAU_HINH. */
(function (P) {
  "use strict";
  var CAU_HINH = {
    BOSS_HP: 6000, BOSS_DMG: 42,
    // Lao Tới Cắn
    CAN_HOI: 6.5, CAN_TAM_MIN: 80, CAN_TAM_MAX: 300, CAN_HE_SO: 1.8, CAN_TRUNG: 64,
    // Long Hống
    HONG_HOI: 13, HONG_TAM: 170, HONG_HE_SO: 0.9, HONG_CHOANG: 1.6,
    // Quy Giáp: rụt mai khi máu xuống dưới các mốc này
    MAI_MOC: [0.65, 0.35], MAI_GIAY: 4, MAI_GIAM: 0.2, MAI_HOI_MOI_NHIP: 0.02, MAI_NHIP: 0.5,
    NGHI_GIUA_CHIEU: 1.4,
    // Thử Bảo
    CHUOT_HP: 20, CHUOT_SO_TOC_CHAY: 82, CHUOT_SO_TOC_DI: 38, CHUOT_SO: 110
  };
  var LQ = P.LongQuy = { CAU_HINH: CAU_HINH };
  // ảnh mới phải có trong danh mục tài nguyên thì Assets mới chịu tải
  if (P.ASSET_MANIFEST) {
    P.ASSET_MANIFEST["assets/sprites/mob/long_quy.png"] = 171467;
    P.ASSET_MANIFEST["assets/sprites/mob/thu_bao.png"] = 7664;
    P.ASSET_MANIFEST["assets/sprites/fx/long_quy/song.png"] = 21148;
  }

  /* ---------- khai báo quái ---------- */
  function khaiBao() {
    var D = P.ENEMY_DEFS || (P.Enemy && P.Enemy.ENEMY_DEFS);
    if (!D) return false;
    D.long_quy = {
      name: "Long Quy · Đường Chủ Bạch Hổ Đường", level: 13, anhMob: "long_quy",
      sprite: { w: 148, h: 117, ax: 72, ay: 113 }, barY: 104, barW: 64, shadow: { rx: 46, ry: 9 },
      sheet: { cols: 32, fw: 185, fh: 146, anims: { idle: [0, 2], run: [2, 4], attack: [6, 7] }, animFps: { idle: 2, run: 7, attack: 10 }, fps: 8 },
      hp: CAU_HINH.BOSS_HP, exp: 300, speed: 46, aggro: 280, leashRange: 1400, wanderRadius: 24, wanderPause: 3,
      contactDmg: CAU_HINH.BOSS_DMG, hitCooldown: 1.3, hitRadius: 60, bodyRadius: 44, respawnSec: 0, isBoss: !0
    };
    D.thu_bao = {
      name: "Thử Bảo", level: 10, anhMob: "thu_bao",
      sprite: { w: 48, h: 20, ax: 24, ay: 19 }, barY: 22, shadow: { rx: 13, ry: 3 },
      sheet: { cols: 8, fw: 73, fh: 31, anims: { idle: [0, 1], run: [0, 8] }, fps: 16 },
      hp: CAU_HINH.CHUOT_HP, exp: 3, speed: CAU_HINH.CHUOT_SO_TOC_CHAY, aggro: 0, wanderRadius: 120, wanderPause: 0.4,
      contactDmg: 0, hitCooldown: 99, respawnSec: 0, motMau: !0
    };
    return true;
  }

  /* ---------- tiện ích ---------- */
  function W() { return P.SceneWorld; }
  function tg() { return (P.Game && P.Game.time) || performance.now() / 1000; }
  function TM() { return P.TileMap; }
  function chan(x, y) { var t = TM(); return !t || !t.isBlockedPixel ? false : t.isBlockedPixel(x, y); }
  function am(ten) { try { P.Audio && P.Audio.play && P.Audio.play(ten); } catch (e) {} }
  function chu(x, y, s, mau) { if (P.VFX && P.VFX.spawnText) P.VFX.spawnText(x, y, s, mau); }
  function kc(a, b) { var dx = b.x - a.x, dy = b.y - a.y; return Math.sqrt(dx * dx + dy * dy); }
  function rungMan(m) { try { if (P.Camera && P.Camera.shake) P.Camera.shake(m || 6, 0.3); } catch (e) {} }

  var anhSong = new Image(); anhSong.src = "assets/sprites/fx/long_quy/song.png";

  // mỗi con Long Quy có bản def riêng để đổi khung hình khi ra chiêu
  LQ.chuanBi = function (e) {
    if (!e || e.lq) return e;
    var s = e.def.sheet, an = {};
    for (var k in s.anims) an[k] = s.anims[k].slice();
    // def của quái noRespawn là Object.create(def gốc) → giữ nguyên chuỗi prototype
    e.def = Object.create(e.def); e.def.sheet = Object.assign({}, s, { anims: an, animFps: Object.assign({}, s.animFps) });
    e.lq = { act: null, cdCan: 3, cdHong: 6, nghi: 2, mocMai: 0, khien: false, goc: { idle: an.idle.slice(), run: an.run.slice() } };
    return e;
  };
  function datKhung(e, f) { var a = e.def.sheet.anims; a.idle = [f, 1]; a.run = [f, 1]; }
  function traKhung(e) { var a = e.def.sheet.anims; a.idle = e.lq.goc.idle.slice(); a.run = e.lq.goc.run.slice(); }
  function quay(e, p) { e.dir = p.x >= e.x ? 1 : -1; }

  /* ---------- chiêu thức ---------- */
  // bước: { t: giây, f: khung | [khung...] (chạy theo tiến độ) | {vong:[...], fps}, vao(e,p), moi(e,p,dt,k), ra(e,p) }
  function batDau(e, ten, buoc) {
    e.lq.act = { ten: ten, buoc: buoc, i: 0, t: 0 };
    e.state = "idle"; e.attackState = "none"; e.telegraphT = 0; e.atkAnimAt = null; e.roarAt = null;
    var p = W().player; if (buoc[0].vao) buoc[0].vao(e, p);
  }
  function chay(e, dt) {
    var a = e.lq.act, p = W().player, b = a.buoc[a.i];
    a.t += dt;
    var k = Math.min(1, a.t / b.t), f = b.f;
    if (Array.isArray(f)) f = f[Math.min(f.length - 1, Math.floor(k * f.length))];
    else if (f && f.vong) f = f.vong[Math.floor(a.t * (f.fps || 6)) % f.vong.length];
    datKhung(e, f);
    if (b.moi) b.moi(e, p, dt, k);
    if (a.t >= b.t) {
      if (b.ra) b.ra(e, p);
      if (!e.lq.act) return;
      a.i++; a.t = 0;
      if (a.i >= a.buoc.length) { ketThucChieu(e); return; }
      if (a.buoc[a.i].vao) a.buoc[a.i].vao(e, p);
    }
  }
  function ketThucChieu(e) {
    e.lq.act = null; e.lq.khien = false; e.lq.nghi = CAU_HINH.NGHI_GIUA_CHIEU; e.lq.tele = null;
    traKhung(e); e.state = "chase"; e.aggroUntil = tg() + 30;
  }

  function chieuCan(e) {
    var tx = 0, ty = 0, sx = 0, sy = 0;
    batDau(e, "can", [
      { t: 0.55, f: [6, 7], vao: function (e, p) { quay(e, p); am("boss_alert"); },
        moi: function (e, p, dt, k) { quay(e, p); e.lq.tele = { kieu: "lao", x0: e.x, y0: e.y, x1: p.x, y1: p.y, k: k }; },
        ra: function (e, p) {
          var dx = p.x - e.x, dy = p.y - e.y, d = Math.sqrt(dx * dx + dy * dy) || 1, di = Math.max(0, Math.min(CAU_HINH.CAN_TAM_MAX, d - 30));
          sx = e.x; sy = e.y; tx = e.x + dx / d * di; ty = e.y + dy / d * di; e.lq.tele = null; am("boss_pounce");
        } },
      { t: 0.22, f: 8, moi: function (e, p, dt, k) {
          var nx = sx + (tx - sx) * k, ny = sy + (ty - sy) * k;
          if (!chan(nx, ny)) { e.x = nx; e.y = ny; }
        } },
      { t: 0.32, f: [9, 10, 11], vao: function (e, p) {
          am("monster_attack_bite"); rungMan(5);
          if (!p.downed && kc(e, p) <= CAU_HINH.CAN_TRUNG + 10) P.Player.takeDamage(p, Math.round(e.def.contactDmg * CAU_HINH.CAN_HE_SO), { fromX: e.x, fromY: e.y, kb: 70 });
          if (P.VFX && P.VFX.spawnRing) P.VFX.spawnRing(e.x + e.dir * 46, e.y - 30, "#ff6a5a", 30, 0.35);
        } },
      { t: 0.35, f: 12 }
    ]);
  }

  function chieuHong(e) {
    var R = CAU_HINH.HONG_TAM;
    batDau(e, "hong", [
      { t: 0.5, f: [13, 14], vao: function (e, p) { quay(e, p); am("boss_alert"); },
        moi: function (e, p, dt, k) { e.lq.tele = { kieu: "vong", x: e.x, y: e.y, r: R, k: k * 0.45 }; } },
      { t: 0.7, f: { vong: [15, 16, 17, 18], fps: 8 },
        moi: function (e, p, dt, k) { e.lq.tele = { kieu: "vong", x: e.x, y: e.y, r: R, k: 0.45 + k * 0.55 }; } },
      { t: 0.5, f: 19, vao: function (e, p) {
          e.lq.tele = null; am("xich_ma_roar"); rungMan(9);
          song.push({ x: e.x + e.dir * 44, y: e.y - 66, t: 0, dur: 0.45, r: 46, dat: false });
          song.push({ x: e.x, y: e.y, t: 0, dur: 0.7, r: R, dat: true });
          if (!p.downed && kc(e, p) <= R) {
            P.Player.takeDamage(p, Math.round(e.def.contactDmg * CAU_HINH.HONG_HE_SO), { fromX: e.x, fromY: e.y, kb: 40 });
            if (P.Player.applyStun) P.Player.applyStun(p, CAU_HINH.HONG_CHOANG);
            chu(p.x, p.y - 60, "Choáng!", "#7fe8ff");
          }
        } },
      { t: 0.35, f: 20 }
    ]);
  }

  function chieuMai(e) {
    var nhip = 0;
    batDau(e, "mai", [
      { t: 0.6, f: [21, 22, 23, 24], vao: function () { am("skill_shield"); } },
      { t: CAU_HINH.MAI_GIAY, f: { vong: [25, 26, 27, 26], fps: 4 },
        vao: function (e) { e.lq.khien = true; nhip = 0; chu(e.x, e.y - 110, "Quy Giáp", "#9dff8a"); },
        moi: function (e, p, dt) {
          nhip += dt;
          if (nhip >= CAU_HINH.MAI_NHIP) {
            nhip -= CAU_HINH.MAI_NHIP;
            var hoi = Math.round(e.hpMax * CAU_HINH.MAI_HOI_MOI_NHIP);
            e.hp = Math.min(e.hpMax, e.hp + hoi);
            chu(e.x + (Math.random() * 40 - 20), e.y - 80, "+" + hoi, "#7dff7a");
            for (var i = 0; i < 3; i++) hat.push({ x: e.x + (Math.random() * 90 - 45), y: e.y - 10 - Math.random() * 30, vy: -26 - Math.random() * 20, t: 0, dur: 1.1 + Math.random() * 0.5, cong: Math.random() < 0.5 });
          }
        },
        ra: function (e) { e.lq.khien = false; } },
      { t: 0.5, f: [29, 30, 31] }
    ]);
  }

  function chonChieu(e, p, dt) {
    var L = e.lq;
    L.cdCan -= dt; L.cdHong -= dt; L.nghi -= dt;
    if (L.nghi > 0 || e.stunT > 0 || p.downed || e.state !== "chase") return;
    var ti = e.hp / e.hpMax, d = kc(e, p);
    if (L.mocMai < CAU_HINH.MAI_MOC.length && ti <= CAU_HINH.MAI_MOC[L.mocMai]) { L.mocMai++; return chieuMai(e); }
    if (L.cdHong <= 0 && d <= CAU_HINH.HONG_TAM - 20) { L.cdHong = CAU_HINH.HONG_HOI; return chieuHong(e); }
    if (L.cdCan <= 0 && d >= CAU_HINH.CAN_TAM_MIN && d <= CAU_HINH.CAN_TAM_MAX) { L.cdCan = CAU_HINH.CAN_HOI; return chieuCan(e); }
  }

  /* ---------- Thử Bảo: chạy trốn ---------- */
  function chuotChay(e, p, dt) {
    e.animTime = (e.animTime || 0) + dt;
    if (e.stunT > 0 || e.freezeT > 0) { e.state = "idle"; return; }
    var d = p ? kc(e, p) : 1e9, vx = 0, vy = 0, v = 0;
    if (p && !p.downed && d < CAU_HINH.CHUOT_SO) {
      vx = (e.x - p.x) / (d || 1); vy = (e.y - p.y) / (d || 1); v = CAU_HINH.CHUOT_SO_TOC_CHAY;
      e.chuotHuong = null;
    } else {
      e.chuotNghi = (e.chuotNghi || 0) - dt;
      if (!e.chuotHuong || e.chuotNghi <= 0) {
        var g = Math.random() * Math.PI * 2; e.chuotHuong = [Math.cos(g), Math.sin(g)]; e.chuotNghi = 0.8 + Math.random() * 1.6;
        if (Math.random() < 0.3) e.chuotHuong = [0, 0];
      }
      vx = e.chuotHuong[0]; vy = e.chuotHuong[1]; v = CAU_HINH.CHUOT_SO_TOC_DI;
    }
    if (e.slowT > 0) v *= e.slowMult || 0.6;
    if (!v || (!vx && !vy)) { e.state = "idle"; return; }
    var nx = e.x + vx * v * dt, ny = e.y + vy * v * dt;
    if (chan(nx, ny)) {
      // vướng tường/hào: thử trượt theo một trục, không được thì đổi hướng
      if (!chan(nx, e.y)) ny = e.y; else if (!chan(e.x, ny)) nx = e.x;
      else { e.chuotHuong = [-vx, -vy]; e.chuotNghi = 0.6; e.state = "idle"; return; }
    }
    e.x = nx; e.y = ny; e.state = "chase";
    if (Math.abs(vx) > 0.15) e.dir = vx > 0 ? 1 : -1;
  }

  /* ---------- móc vào Enemy ---------- */
  function ganEnemy() {
    var E = P.Enemy;
    if (!E || E.__ntLongQuy) return !!E;
    E.__ntLongQuy = true;
    var capNhat = E.update;
    E.update = function (e, dt, p, map, t) {
      if (e && !e.dead) {
        if (e.type === "thu_bao") { chuotChay(e, p, dt); return; }
        if (e.type === "long_quy") {
          LQ.chuanBi(e);
          if (e.lq.act) { e.animTime = (e.animTime || 0) + dt; if (e.stunT > 0 && e.lq.act.ten !== "mai") { ketThucChieu(e); } else { chay(e, dt); return; } }
          var r = capNhat.apply(this, arguments);
          if (!e.dead && !e.lq.act) chonChieu(e, p, dt);
          return r;
        }
      }
      return capNhat.apply(this, arguments);
    };
    var danh = E.hit;
    E.hit = function (e, n, t) {
      if (e && !e.dead && n > 0) n = soDanh(e, n);
      return danh.call(this, e, n, t);
    };
    // số bay lên khớp với máu thật bị trừ (world.js gọi flinch ngay trước spawnDamage)
    var giat = E.flinch, vuaGiat = null;
    E.flinch = function (e) { vuaGiat = e; return giat.apply(this, arguments); };
    var X = P.VFX;
    if (X && X.spawnDamage && !X.spawnDamage.__ntLQ) {
      var sd = X.spawnDamage;
      X.spawnDamage = function (x, y, n) {
        var e = vuaGiat; vuaGiat = null;
        if (e && e.x === x && e.y - 20 === y && typeof n === "number" && n > 0) {
          var m = soDanh(e, n);
          if (m !== n) { var a = Array.prototype.slice.call(arguments); a[2] = m; return sd.apply(this, a); }
        }
        return sd.apply(this, arguments);
      };
      X.spawnDamage.__ntLQ = true;
    }
    return true;
  }
  function soDanh(e, n) {
    if (e.def && e.def.motMau) return 1;
    if (e.type === "long_quy" && e.lq && e.lq.khien) return Math.max(1, Math.round(n * CAU_HINH.MAI_GIAM));
    return n;
  }

  /* ---------- vẽ: báo chiêu, sóng âm, hạt hồi máu ---------- */
  var song = [], hat = [], tLan = 0;
  function bossDangCo() {
    var w = W(); if (!w || !w.enemies) return [];
    return w.enemies.filter(function (e) { return e.type === "long_quy" && !e.dead && e.lq; });
  }
  function veSau(ctx, cx, cy) {
    var ds = bossDangCo(), now = tg();
    for (var i = 0; i < ds.length; i++) {
      var e = ds[i], te = e.lq.tele;
      if (e.lq.khien) {
        ctx.save(); ctx.translate(Math.round(e.x - cx), Math.round(e.y - cy));
        ctx.globalAlpha = 0.25 + 0.1 * Math.sin(now * 6); ctx.fillStyle = "#7dff7a";
        ctx.beginPath(); ctx.ellipse(0, 0, 70, 22, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore();
      }
      if (!te) continue;
      ctx.save();
      if (te.kieu === "vong") {
        var rx = te.r, ry = te.r * 0.55;
        ctx.translate(Math.round(te.x - cx), Math.round(te.y - cy));
        ctx.globalAlpha = 0.12 + 0.2 * te.k; ctx.fillStyle = "#4fd6ff";
        ctx.beginPath(); ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2); ctx.fill();
        ctx.globalAlpha = 0.9; ctx.strokeStyle = "#8ff0ff"; ctx.lineWidth = 2; ctx.setLineDash([6, 4]); ctx.lineDashOffset = -20 * now;
        ctx.beginPath(); ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]);
        ctx.strokeStyle = "#ffffff"; ctx.lineWidth = 1.3;
        ctx.beginPath(); ctx.ellipse(0, 0, rx * te.k, ry * te.k, 0, 0, Math.PI * 2); ctx.stroke();
      } else if (te.kieu === "lao") {
        var dx = te.x1 - te.x0, dy = te.y1 - te.y0, d = Math.sqrt(dx * dx + dy * dy) || 1, L = Math.min(CAU_HINH.CAN_TAM_MAX, d);
        ctx.translate(Math.round(te.x0 - cx), Math.round(te.y0 - cy)); ctx.rotate(Math.atan2(dy, dx));
        ctx.globalAlpha = 0.18 + 0.25 * te.k; ctx.fillStyle = "#ff4b3a"; ctx.fillRect(0, -20, L, 40);
        ctx.globalAlpha = 0.85; ctx.strokeStyle = "#ffb09a"; ctx.lineWidth = 1.5; ctx.strokeRect(0, -20, L, 40);
        ctx.globalAlpha = 0.6; ctx.fillStyle = "#ff7a5a"; ctx.fillRect(0, -20, L * te.k, 40);
      }
      ctx.restore();
    }
  }
  function veTruoc(ctx, cx, cy) {
    var now = tg(), dt = Math.min(0.1, Math.max(0, now - tLan)); tLan = now;
    for (var i = song.length - 1; i >= 0; i--) {
      var s = song[i]; s.t += dt; if (s.t >= s.dur) { song.splice(i, 1); continue; }
      var k = s.t / s.dur, ep = s.dat ? 0.55 : 1;
      ctx.save(); ctx.translate(Math.round(s.x - cx), Math.round(s.y - cy));
      for (var j = 0; j < (s.dat ? 3 : 2); j++) {
        var kk = Math.max(0, k - j * 0.18); if (kk <= 0) continue;
        var r = 12 + (s.r - 12) * Math.min(1, kk * 1.15);
        ctx.globalAlpha = Math.max(0, 0.95 * (1 - kk));
        if (anhSong.complete && anhSong.naturalWidth) ctx.drawImage(anhSong, -r, -r * ep, r * 2, r * 2 * ep);
        else { ctx.strokeStyle = "#8ff0ff"; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(0, 0, r, r * ep, 0, 0, Math.PI * 2); ctx.stroke(); }
      }
      ctx.restore();
    }
    for (var h = hat.length - 1; h >= 0; h--) {
      var o = hat[h]; o.t += dt; if (o.t >= o.dur) { hat.splice(h, 1); continue; }
      o.y += o.vy * dt;
      var a = 1 - o.t / o.dur, X = Math.round(o.x - cx), Y = Math.round(o.y - cy);
      ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = o.cong ? "#9dff8a" : "#d8ffb0";
      if (o.cong) { ctx.fillRect(X - 1, Y - 4, 3, 9); ctx.fillRect(X - 4, Y - 1, 9, 3); } else ctx.fillRect(X - 1, Y - 1, 3, 3);
      ctx.restore();
    }
  }
  function ganVe() {
    var X = P.VFX; if (!X || !X.draw || X.draw.__ntLongQuy) return !!X;
    var g = X.draw;
    X.draw = function (ctx, cx, cy, lop) {
      try { if (lop === "back") veSau(ctx, cx, cy); } catch (e) {}
      var r = g.apply(this, arguments);
      try { if (lop !== "back") veTruoc(ctx, cx, cy); } catch (e) {}
      return r;
    };
    X.draw.__ntLongQuy = true;
    return true;
  }

  /* ---------- thả quái lúc chạy ---------- */
  LQ.tha = function (type, x, y, opt) {
    var w = W(); if (!w || !w.enemies || !P.Enemy) return null;
    var e = P.Enemy.create({ id: type + "_" + Math.random().toString(36).slice(2, 7), type: type, x: x, y: y, noRespawn: true });
    if (opt && opt.ten) { e.def = Object.create(e.def); e.def.name = opt.ten; }
    if (type === "long_quy") LQ.chuanBi(e);
    w.enemies.push(e);
    return e;
  };

  LQ._chieu = { can: chieuCan, hong: chieuHong, mai: chieuMai };
  khaiBao();
  var lan = 0, hen = setInterval(function () {
    var a = ganEnemy(), b = ganVe();
    if ((a && b) || ++lan > 100) clearInterval(hen);
  }, 100);
})(window.PNTT);
