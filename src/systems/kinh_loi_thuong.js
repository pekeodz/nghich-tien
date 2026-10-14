/* ============================================================================
 *  kinh_loi_thuong.js — VŨ KHÍ KINH LÔI THƯƠNG (Nghịch Tiên)
 * ----------------------------------------------------------------------------
 *  Thương bay (phi thương) giống Hoàng Lôi Thương: lơ lửng cạnh chủ, đánh thường thì
 *  rời tay đâm xuyên tới mục tiêu rồi bay về (dùng đúng tư thế bay của các thương khác).
 *    - Hình thương: 12 khung có sét chạy quanh (assets/weapons/kinh_loi_thuong_bay.png),
 *      ghép bằng tools/kinh_loi_thuong/cat.py (thương dựng đứng, mũi ở trên).
 *    - Mỗi nhát đánh thường trúng: rồng sét từ mây giáng xuống ngay chỗ mục tiêu
 *      (assets/sprites/fx/kinh_loi_thuong_fx.png, ghép bằng tools/kinh_loi_thuong/cat_fx.py).
 *  Hiện chỉ admin phát (không rơi, không bán).
 * ==========================================================================*/
(function (P) {
  "use strict";
  if (!P || !P.ITEMS) return;
  var ID = "kinh_loi_thuong";
  var ANH = "assets/weapons/kinh_loi_thuong_bay.png";
  var FX = "assets/sprites/fx/kinh_loi_thuong_fx.png";
  var ICON = "assets/items/icon_kinh_loi_thuong.png";
  // khung trong ảnh: thương dựng đứng, mũi ở trên (y = MUI), đuôi cán ở dưới (y = DUOI), trục ở x = TRUC_X
  var SP = { fw: 124, fh: 242, frames: 12, fps: 12, TRUC_X: 61, MUI: 2, DUOI: 241 };
  // trong hệ toạ độ phi thương của game (sau khi lật dọc, giống các thương khác): mũi ở y = -48, đuôi ở y = +28
  var Y_MUI = -48, Y_DUOI = 28;
  // hiệu ứng rồng sét khi đánh trúng
  var HU = { fw: 208, fh: 221, frames: 9, ax: 104, ay: 147, scale: 0.46, life: 0.62 };

  P.ITEMS[ID] = {
    id: ID, name: "Kinh Lôi Thương", type: "vu_khi", slot: "vu_khi", grade: "Địa phẩm hạ",
    atkBonus: 16, requireRealm: "truc_co_2", flying: true, reachBonus: 108, attackTime: 1, hitAt: 0.32,
    desc: "Thương lưỡi băng lam, ngọc lục quấn rồng nơi hộ thủ, cán sắt đen khắc lôi văn. Sét trời luôn chạy quanh mũi thương. Rời tay đâm xuyên mục tiêu rồi quay về; mỗi nhát trúng gọi rồng sét từ mây giáng xuống ngay chỗ kẻ địch. Công +16.",
    icon: ID
  };
  if (P.ASSET_MANIFEST) { P.ASSET_MANIFEST[ICON] = 10041; P.ASSET_MANIFEST[ANH] = 106789; P.ASSET_MANIFEST[FX] = 61196; }
  if (P.ASSET_VERSIONS) { P.ASSET_VERSIONS[ANH] = "klt3"; P.ASSET_VERSIONS[FX] = "klt3"; }

  function layAnh(path) {
    var A = P.Assets; if (!A) return null;
    var img = A.get(path);
    if (!img && A.loadImage && !layAnh["_" + path]) { layAnh["_" + path] = 1; A.loadImage(path, A.PRIO && A.PRIO.NORMAL); }
    return img && (img.naturalWidth || img.width) ? img : null;
  }

  /* ---------------- dáng bay: mượn khuôn Hoàng Lôi Thương, đổi màu vệt ---------------- */
  function dinhNghia() {
    var WA = P.WeaponArt;
    if (!WA || !WA.define) return false;
    if (WA.defs[ID] && WA.defs[ID].__klt3) return true;
    var goc = WA.defs.hoang_loi_thuong || WA.defs.thiet_thuong || {};
    WA.define(Object.assign({}, goc, {
      id: ID, kind: "thuong", flying: true, flyArt: ID, __klt3: true,
      smear: "rgba(80,220,255,.38)",
      trail: { core: "#eafcff", glow: "#3fd2ff", radius: 20, lift: 24, life: 0.24 }
    }));
    return true;
  }

  function veThuong(ctx, t, camX, camY) {
    var img = layAnh(ANH); if (!img) return false;
    var now = Number(P.Game && P.Game.time) || performance.now() / 1000;
    var f = Math.floor(now * SP.fps) % SP.frames;
    var k = (Y_DUOI - Y_MUI) / (SP.DUOI - SP.MUI);
    var x0 = -SP.TRUC_X * k, y0 = Y_MUI - SP.MUI * k, w = SP.fw * k, h = SP.fh * k;
    ctx.save();
    ctx.translate(Math.round(t.x - camX), Math.round(t.y - camY));
    ctx.rotate(t.angle || 0);
    ctx.scale(1, -1);   // như các thương khác của game: lật dọc rồi vẽ, nên lúc đâm mũi chĩa thẳng vào mục tiêu
    if (t.smear) {   // vệt lướt khi phóng đi
      ctx.save(); ctx.globalCompositeOperation = "lighter";
      ctx.fillStyle = t.smearColor || "rgba(80,220,255,.38)";
      ctx.fillRect(-3, Y_MUI + 6, 6, (Y_DUOI - Y_MUI) + 18);
      ctx.restore();
    }
    ctx.imageSmoothingEnabled = true;
    if ("imageSmoothingQuality" in ctx) ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, f * SP.fw, 0, SP.fw, SP.fh, x0, y0, w, h);
    if (!P.Quality || P.Quality.tier !== 0) {   // ánh sét cộng sáng nhẹ
      ctx.globalCompositeOperation = "lighter"; ctx.globalAlpha = 0.22 + 0.12 * Math.sin(now * 9);
      ctx.drawImage(img, f * SP.fw, 0, SP.fw, SP.fh, x0, y0, w, h);
    }
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

  /* ---------------- mỗi nhát đánh thường trúng: rồng sét giáng xuống mục tiêu ---------------- */
  var lanCuoi = -1;
  function bocDanh() {
    var E = P.Enemy;
    if (!E || !E.hit) return false;
    if (E.hit.__klt) return true;
    var g = E.hit;
    E.hit = function (e, n, t) {
      try {
        var w = P.SceneWorld, p = w && w.player;
        if (p && p.cfg && p.cfg.weapon === ID && p.state === "attack" && e && !e.dead && n > 0) {
          var now = P.Game ? P.Game.time : Date.now() / 1000;
          if (Math.abs(now - lanCuoi) > 0.15 && P.VFX && P.VFX.spawnSheetFx) {   // một nhát chỉ một rồng sét
            lanCuoi = now;
            P.VFX.spawnSheetFx(e.x, e.y + 2, { path: FX, cols: HU.frames, fw: HU.fw, fh: HU.fh, frames: HU.frames,
              ax: HU.ax, ay: HU.ay, scale: HU.scale, blend: "lighter", smooth: true, fadeOut: 0.12, life: HU.life });
            if (P.Audio && P.Audio.play) { try { P.Audio.play("thunder", { gain: 0.45 }); } catch (er) {} }
            if (P.Camera && P.Camera.shake) P.Camera.shake(1.2, 0.08);
          }
        }
      } catch (er) {}
      return g.apply(this, arguments);
    };
    E.hit.__klt = true;
    return true;
  }

  var lan = 0, hen = setInterval(function () { var a = dinhNghia(), b = bocVe(), c = bocDanh(); if ((a && b && c) || ++lan > 200) clearInterval(hen); }, 120);
  dinhNghia(); layAnh(ANH);
  if (P.Assets && P.Assets.loadFx) { try { P.Assets.loadFx(FX); } catch (e) {} }
})(window.PNTT);
