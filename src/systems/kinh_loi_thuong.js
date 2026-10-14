/* ============================================================================
 *  kinh_loi_thuong.js — VŨ KHÍ KINH LÔI THƯƠNG (Nghịch Tiên)
 * ----------------------------------------------------------------------------
 *  Thương bay (phi thương) kiểu Hoàng Lôi Thương: lơ lửng cạnh chủ, đánh thường thì
 *  rời tay đâm xuyên tới mục tiêu rồi bay về. Hình vẽ dùng 12 khung thương có sét
 *  chạy quanh (assets/weapons/kinh_loi_thuong_bay.png, ghép bằng tools/kinh_loi_thuong/cat.py).
 *  Mỗi nhát đánh thường trúng: 25% gọi "Kinh Lôi" giáng thêm 50% sát thương.
 *  Hiện chỉ admin phát (không rơi, không bán).
 * ==========================================================================*/
(function (P) {
  "use strict";
  if (!P || !P.ITEMS) return;
  var ID = "kinh_loi_thuong";
  var ANH = "assets/weapons/kinh_loi_thuong_bay.png";
  var ICON = "assets/items/icon_kinh_loi_thuong.png";
  // khung trong ảnh: thương dựng đứng, mũi ở trên (y = MUI), đuôi cán ở dưới (y = DUOI), trục ở x = TRUC_X
  var SP = { fw: 124, fh: 242, frames: 12, fps: 12, TRUC_X: 61, MUI: 2, DUOI: 241 };
  // trong hệ toạ độ phi thương của game: mũi ở y = -48, đuôi ở y = +27
  var Y_MUI = -48, Y_DUOI = 27;
  var CAU_HINH = { SET_TI_LE: 0.25, SET_HE_SO: 0.5 };

  P.ITEMS[ID] = {
    id: ID, name: "Kinh Lôi Thương", type: "vu_khi", slot: "vu_khi", grade: "Địa phẩm hạ",
    atkBonus: 16, requireRealm: "truc_co_2", flying: true, reachBonus: 108, attackTime: 1, hitAt: 0.32,
    thunder: { chance: CAU_HINH.SET_TI_LE, mult: CAU_HINH.SET_HE_SO },
    desc: "Thương lưỡi băng lam, ngọc lục quấn rồng nơi hộ thủ, cán sắt đen khắc lôi văn. Sét trời luôn chạy quanh mũi thương. Rời tay đâm xuyên mục tiêu rồi quay về; mỗi nhát trúng có 25% gọi Kinh Lôi giáng thêm 50% sát thương. Công +16.",
    icon: ID
  };
  if (P.ASSET_MANIFEST) { P.ASSET_MANIFEST[ICON] = 10041; P.ASSET_MANIFEST[ANH] = 106789; }

  /* ---------------- hình bay: mượn khuôn Hoàng Lôi Thương, đổi màu vệt ---------------- */
  function dinhNghia() {
    var WA = P.WeaponArt;
    if (!WA || !WA.define) return false;
    if (WA.defs[ID]) return true;
    var goc = WA.defs.hoang_loi_thuong || WA.defs.thiet_thuong || {};
    WA.define(Object.assign({}, goc, {
      id: ID, kind: "thuong", flying: true, flyArt: ID,
      smear: "rgba(80,220,255,.38)",
      trail: { core: "#eafcff", glow: "#3fd2ff", radius: 20, lift: 24, life: 0.24 }
    }));
    return true;
  }

  var anh = null;
  function layAnh() {
    if (anh) return anh.complete && anh.naturalWidth ? anh : null;
    anh = new Image(); anh.src = ANH + "?v=1";
    return null;
  }
  function veThuong(ctx, t, camX, camY) {
    var img = layAnh(); if (!img) return false;
    var now = P.Game ? P.Game.time : performance.now() / 1000;
    var f = Math.floor(now * SP.fps) % SP.frames;
    var k = (Y_DUOI - Y_MUI) / (SP.DUOI - SP.MUI);
    ctx.save();
    ctx.translate(Math.round(t.x - camX), Math.round(t.y - camY));
    ctx.rotate(t.angle || 0);
    if (t.smear) {   // vệt lướt khi phóng đi
      ctx.save(); ctx.globalCompositeOperation = "lighter";
      ctx.fillStyle = t.smearColor || "rgba(80,220,255,.38)";
      ctx.fillRect(-3, Y_MUI + 6, 6, (Y_DUOI - Y_MUI) + 18);
      ctx.restore();
    }
    var sm = ctx.imageSmoothingEnabled; ctx.imageSmoothingEnabled = true;
    if ("imageSmoothingQuality" in ctx) ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, f * SP.fw, 0, SP.fw, SP.fh, -SP.TRUC_X * k, Y_MUI - SP.MUI * k, SP.fw * k, SP.fh * k);
    // ánh sét cộng sáng nhẹ
    ctx.globalCompositeOperation = "lighter"; ctx.globalAlpha = 0.22 + 0.12 * Math.sin(now * 9);
    ctx.drawImage(img, f * SP.fw, 0, SP.fw, SP.fh, -SP.TRUC_X * k, Y_MUI - SP.MUI * k, SP.fw * k, SP.fh * k);
    ctx.imageSmoothingEnabled = sm;
    ctx.restore();
    return true;
  }
  function bocVe() {
    var PL = P.Player;
    if (!PL || !PL.drawPhiKiem) return false;
    if (PL.drawPhiKiem.__klt) return true;
    var g = PL.drawPhiKiem;
    PL.drawPhiKiem = function (ctx, t, camX, camY) {
      if (t && t.art === ID && !t.hidden) { try { if (veThuong(ctx, t, camX, camY)) return; } catch (e) {} }
      return g.apply(this, arguments);
    };
    PL.drawPhiKiem.__klt = true;
    return true;
  }

  /* ---------------- Kinh Lôi: sét đánh thêm khi đánh thường trúng ---------------- */
  var dangSet = false;
  function bocDanh() {
    var E = P.Enemy;
    if (!E || !E.hit) return false;
    if (E.hit.__klt) return true;
    var g = E.hit;
    E.hit = function (e, n, t) {
      var kq = g.apply(this, arguments);
      try {
        var w = P.SceneWorld, p = w && w.player;
        if (!dangSet && p && p.cfg && p.cfg.weapon === ID && p.state === "attack" && e && n > 0 && Math.random() < CAU_HINH.SET_TI_LE) {
          var x = e.x, y = e.y, them = Math.max(1, Math.round(n * CAU_HINH.SET_HE_SO));
          setTimeout(function () {
            if (P.VFX && P.VFX.spawnLightning) P.VFX.spawnLightning(x, y);
            if (P.Audio && P.Audio.play) { try { P.Audio.play("thunder", { gain: 0.5 }); } catch (er) {} }
            if (e.dead) return;
            dangSet = true;
            try {
              if (w.ntDanhQuai) w.ntDanhQuai(e, them);
              else E.hit(e, them, P.Game ? P.Game.time : 0);
            } finally { dangSet = false; }
            if (P.VFX && P.VFX.spawnText) P.VFX.spawnText(x, y - 54, "Kinh Lôi!", "#8fe8ff");
          }, 120);
        }
      } catch (er) {}
      return kq;
    };
    E.hit.__klt = true;
    return true;
  }

  var lan = 0, hen = setInterval(function () { var a = dinhNghia(), b = bocVe(), c = bocDanh(); if ((a && b && c) || ++lan > 200) clearInterval(hen); }, 120);
  dinhNghia(); layAnh();
})(window.PNTT);
