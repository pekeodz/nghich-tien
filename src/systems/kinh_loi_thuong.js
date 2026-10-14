/* ============================================================================
 *  kinh_loi_thuong.js — VŨ KHÍ KINH LÔI THƯƠNG (Nghịch Tiên)
 * ----------------------------------------------------------------------------
 *  Thương CẦM TRÊN TAY (không bay): đứng / đi cầm thương theo tay nhân vật, đánh thường
 *  thì vung đâm như đánh thường (khuôn vung thương của game), nhát trúng gọi hiệu ứng
 *  "rồng sét giáng xuống" ngay tại mục tiêu.
 *    - Hình thương: 12 khung có sét chạy quanh (assets/weapons/kinh_loi_thuong_bay.png),
 *      ghép bằng tools/kinh_loi_thuong/cat.py (thương dựng đứng, mũi ở trên).
 *    - Hiệu ứng đánh: 9 khung (assets/sprites/fx/kinh_loi_thuong_fx.png),
 *      ghép bằng tools/kinh_loi_thuong/cat_fx.py (căn theo điểm sét chạm đất).
 *  Hiện chỉ admin phát (không rơi, không bán).
 * ==========================================================================*/
(function (P) {
  "use strict";
  if (!P || !P.ITEMS) return;
  var ID = "kinh_loi_thuong";
  var ANH = "assets/weapons/kinh_loi_thuong_bay.png";
  var FX = "assets/sprites/fx/kinh_loi_thuong_fx.png";
  var ICON = "assets/items/icon_kinh_loi_thuong.png";
  // khung thương trong ảnh: dựng đứng, mũi ở trên (y = MUI), đuôi cán ở dưới (y = DUOI), trục ở x = TRUC_X
  var SP = { fw: 124, fh: 242, frames: 12, fps: 12, TRUC_X: 61, MUI: 2, DUOI: 241 };
  // cầm tay: dài bao nhiêu (đơn vị ô nhân vật 32x64), tay nắm cách mũi bao nhiêu phần chiều dài
  var CAM = { DAI: 48, NAM: 0.62 };
  // hiệu ứng đánh thường
  var HU = { fw: 208, fh: 221, frames: 9, ax: 104, ay: 147, scale: 0.46, life: 0.62 };

  P.ITEMS[ID] = {
    id: ID, name: "Kinh Lôi Thương", type: "vu_khi", slot: "vu_khi", grade: "Địa phẩm hạ",
    atkBonus: 16, requireRealm: "truc_co_2", reachBonus: 100, attackTime: 1, hitAt: 0.32,
    desc: "Thương lưỡi băng lam, ngọc lục quấn rồng nơi hộ thủ, cán sắt đen khắc lôi văn. Sét trời luôn chạy quanh mũi thương. Cầm tay vung đâm; mỗi nhát trúng gọi rồng sét từ mây giáng xuống ngay chỗ kẻ địch. Công +16.",
    icon: ID
  };
  if (P.ASSET_MANIFEST) { P.ASSET_MANIFEST[ICON] = 10041; P.ASSET_MANIFEST[ANH] = 106789; P.ASSET_MANIFEST[FX] = 61196; }
  if (P.ASSET_VERSIONS) { P.ASSET_VERSIONS[ANH] = "klt2"; P.ASSET_VERSIONS[FX] = "klt2"; }

  function layAnh(path) {
    var A = P.Assets; if (!A) return null;
    var img = A.get(path);
    if (!img && A.loadImage && !layAnh["_" + path]) { layAnh["_" + path] = 1; A.loadImage(path, A.PRIO && A.PRIO.NORMAL); }
    return img && (img.naturalWidth || img.width) ? img : null;
  }

  /* ---------------- thương cầm tay ----------------
   * Gọi từ WeaponArt.draw (lớp "overlay", vẽ mỗi khung hình trên/dưới thân nhân vật).
   * s.grip = chỗ bàn tay (đơn vị ô nhân vật), s.angle = hướng mũi thương (độ). */
  function veCamTay(ctx, s, def, cfg) {
    var g = s.grip; if (!g) return;
    var img = layAnh(ANH);
    var goc = null == s.renderAngle ? s.angle : s.renderAngle;
    var t = Number(P.Game && P.Game.time) || 0;
    var dai = CAM.DAI, k = dai / (SP.DUOI - SP.MUI), rong = SP.fw * k;
    ctx.save();
    ctx.translate(g.x, g.y);
    ctx.rotate((goc + 90) * Math.PI / 180);   // trục -y của ảnh (mũi) quay về hướng goc
    if (img) {
      var f = Math.floor(t * SP.fps) % SP.frames;
      var y0 = -CAM.NAM * dai - SP.MUI * k;     // mũi cách tay NAM × chiều dài
      ctx.imageSmoothingEnabled = true;
      if ("imageSmoothingQuality" in ctx) ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, f * SP.fw, 0, SP.fw, SP.fh, -SP.TRUC_X * k, y0, rong, SP.fh * k);
      if (!P.Quality || P.Quality.tier !== 0) {
        ctx.globalCompositeOperation = "lighter";
        ctx.globalAlpha = 0.18 + 0.1 * Math.sin(t * 9);
        ctx.drawImage(img, f * SP.fw, 0, SP.fw, SP.fh, -SP.TRUC_X * k, y0, rong, SP.fh * k);
      }
    } else {   // ảnh chưa tải xong: vẽ tạm cán + mũi
      ctx.fillStyle = "#1c2a33"; ctx.fillRect(-1, -CAM.NAM * dai, 2, dai);
      ctx.fillStyle = "#5fe0ff"; ctx.fillRect(-2, -CAM.NAM * dai, 4, 9);
    }
    ctx.restore();
    // bàn tay đè lên cán cho giống đang nắm
    if (s.held && cfg && P.Palette && P.Pixel && P.Pixel.blk) {
      var v = P.Palette.pick("SKIN", cfg.skin, "light");
      P.Pixel.blk(ctx, g.x - 1, g.y - 1, 2, 2, s.far ? v.shade : v.base, v.line);
      if (P.Pixel.dot) P.Pixel.dot(ctx, g.x, g.y - 1, s.far ? v.base : v.hi);
    }
  }

  function dinhNghia() {
    var WA = P.WeaponArt;
    if (!WA || !WA.define || !WA.SWING) return false;
    if (WA.defs[ID] && WA.defs[ID].__klt2) return true;
    WA.define({
      id: ID, kind: "thuong", art: (WA.MAT && WA.MAT.steel) || {}, artPath: ANH, overlay: true,
      swing: WA.SWING.spear, render: veCamTay, __klt2: true,
      trail: { core: "#eafcff", glow: "#3fd2ff", radius: 20, lift: 24, life: 0.24 }
    });
    return true;
  }

  /* ---------------- hiệu ứng mỗi nhát đánh thường trúng ---------------- */
  var lanCuoi = 0;
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
          if (now - lanCuoi > 0.15 && P.VFX && P.VFX.spawnSheetFx) {   // một nhát chỉ một rồng sét
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

  var lan = 0, hen = setInterval(function () { var a = dinhNghia(), b = bocDanh(); if ((a && b) || ++lan > 200) clearInterval(hen); }, 120);
  dinhNghia(); layAnh(ANH);
  if (P.Assets && P.Assets.loadFx) { try { P.Assets.loadFx(FX); } catch (e) {} }
})(window.PNTT);
