/* ============================================================================
 *  mat_na_noel.js — NGOẠI TRANG MẶT NẠ: ÔNG GIÀ NOEL (Nghịch Tiên)
 * ----------------------------------------------------------------------------
 *  Ô "Mặt Nạ" trong mục Ngoại Trang. Đeo mặt nạ thì nhân vật biến hẳn thành
 *  Ông Già Noel (sprite riêng assets/sprites/ngoai_trang/noel.png):
 *    - không vẽ thân, tóc, áo, vũ khí, phi phong của nhân vật;
 *    - đang cưỡi thú / phi hành vẫn chỉ thấy Ông Già Noel đi bộ dưới đất
 *      (thú cưỡi không vẽ, tốc độ và chỉ số thú cưỡi vẫn giữ);
 *    - đánh, ra chiêu: Noel vung túi quà; ngồi thiền: Noel ngồi giữa hai bao quà;
 *    - tên, danh hiệu, vòng sáng phi phong dưới chân vẫn giữ.
 *  Hiện chỉ admin phát (không rơi, không bán).
 *
 *  Sprite: 4 hàng theo hướng game (xuống, trái, phải, lên), khung 140x174 (độ phân giải gốc, vẽ thu 0.46), chân ở (70,148).
 *  Cột 0-7 đi, 8-15 đánh, 16-17 ngồi, 18 đứng yên. Cắt bằng tools/noel/cat.py.
 *  Thêm mặt nạ khác: thêm một mục vào MAT_NA với ảnh cùng bố cục.
 * ==========================================================================*/
(function (P) {
  "use strict";
  if (!P || !P.ITEMS) return;
  var MN = P.MatNa = {};
  var MAT_NA = MN.DS = {
    mat_na_noel: { hinh: "noel", anh: "assets/sprites/ngoai_trang/noel.png", fw: 140, fh: 174, ax: 70, ay: 148, tiLe: 0.46,
      di: [0, 8], danh: [8, 8], ngoi: [16, 2], dung: 18, fpsDi: 11, fpsDanh: 14, fpsNgoi: 1.1 }
  };
  var ICON = "assets/items/icon_mat_na_noel.png";
  if (P.ASSET_MANIFEST) { P.ASSET_MANIFEST[ICON] = 6881; P.ASSET_MANIFEST[MAT_NA.mat_na_noel.anh] = 286997; }

  /* ---------------- vật phẩm + ô Mặt Nạ ---------------- */
  P.ITEMS.mat_na_noel = {
    id: "mat_na_noel", name: "Mặt Nạ Ông Già Noel", type: "vat_pham", slot: "mat_na", grade: "Linh phẩm thượng",
    ngoaiTrang: true, matNa: "noel", icon: "mat_na_noel",
    desc: "Đeo vào là hoá thành Ông Già Noel vác bao quà. Đi đâu, đánh gì, cưỡi thú hay ngồi thiền cũng vẫn là Ông Già Noel. Phi phong và thú cưỡi tạm ẩn, chỉ số vẫn giữ."
  };
  var INV = P.Inventory;
  if (INV && INV.slots && !INV.slots.some(function (s) { return s.id === "mat_na"; })) {
    INV.slots.push({ id: "mat_na", name: "Mặt Nạ", mark: "NẠ", ngoaiTrang: true });
  }
  function moONgoaiTrang() {
    var NT = P.NgoaiTrang; if (!NT || !NT.O) return false;
    NT.O.forEach(function (o) { if (o.id === "mat_na") delete o.sapCo; });
    return true;
  }

  /* ---------------- ai đang đeo mặt nạ nào ---------------- */
  function matNaDangDeo() {
    var id = INV && INV.equipment && INV.equipment.mat_na;
    return id && MAT_NA[id] ? id : null;
  }
  function dongBoCfg(cfg) {
    var id = matNaDangDeo();
    if (id) cfg.ntMatNa = id; else if ("ntMatNa" in cfg) delete cfg.ntMatNa;
  }
  function W() { return P.SceneWorld; }
  function matNaCua(cfg) {
    if (!cfg || cfg.__khongPhong) return null;     // dạng biến hình (cfgHinh) thì không đè
    var w = W();
    if (w && w.player && cfg === w.player.cfg) dongBoCfg(cfg);
    return cfg.ntMatNa && MAT_NA[cfg.ntMatNa] ? MAT_NA[cfg.ntMatNa] : null;
  }
  MN.dangDeo = function (cfg) { return !!matNaCua(cfg); };
  MN.dongBo = function () {
    var w = W(); if (w && w.player && w.player.cfg) dongBoCfg(w.player.cfg);
  };

  /* ---------------- ảnh ---------------- */
  var anh = {};
  function layAnh(m) {
    var a = anh[m.anh];
    if (a) return a.complete && a.naturalWidth ? a : null;
    a = anh[m.anh] = new Image(); a.src = m.anh + "?v=5";
    return null;
  }

  /* ---------------- chọn khung theo cột tư thế gốc ----------------
   * CONFIG.ANIM: idle 6-7, walk 0-3, attack 4-5, sit 8-9, seal..cast 10-19, hurt 20-21, down 22-23,
   * đi kèm đánh/kết ấn 24-35. */
  function gio() { return (typeof performance !== "undefined" ? performance.now() : Date.now()) / 1000; }
  function tienDoDanh(e) {
    // 0..1 theo đúng lúc ra đòn của nhân vật chính (đòn đánh thường hoặc chuỗi tư thế ra chiêu)
    if (!e) return -1;
    if (e.state === "attack") {
      var d = P.Player && P.Player.attackTime ? P.Player.attackTime(e) : 0.8;
      return Math.min(0.999, Math.max(0, (e.attackTime || 0) / (d || 0.8)));
    }
    if (e.state === "pose" && e.poseSteps && e.poseSteps.length) {
      var st = e.poseSteps[e.poseIdx] || e.poseSteps[e.poseSteps.length - 1];
      var k = st && st.dur ? Math.min(1, (e.poseT || 0) / st.dur) : 0;
      return Math.min(0.999, ((e.poseIdx || 0) + k) / e.poseSteps.length);
    }
    return -1;
  }
  function khungCua(m, col, e) {
    var t = gio();
    if (col >= 0 && col <= 3) return m.di[0] + Math.floor(t * m.fpsDi) % m.di[1];          // đi
    if (col >= 24 && col <= 35) return m.di[0] + Math.floor(t * m.fpsDi) % m.di[1];         // vừa đi vừa ra chiêu
    if (col === 4 || col === 5 || (col >= 10 && col <= 19)) {                                // đánh / ra chiêu
      var k = tienDoDanh(e);
      if (k >= 0) return m.danh[0] + Math.floor(k * m.danh[1]);
      var nua = m.danh[1] / 2, dau = (col & 1) ? nua : 0;
      return m.danh[0] + dau + Math.floor(t * m.fpsDanh) % nua;
    }
    if (col === 8 || col === 9 || col === 22 || col === 23) return m.ngoi[0] + (col & 1);    // ngồi thiền / ngã
    return m.dung != null ? m.dung : m.di[0];                                                 // đứng yên (hai chân thẳng), bị đánh
  }
  // (x,y) = góc trái trên ô nhân vật 32x64 như SpriteFactory; chân ở (x+16, y+62)
  function veNoel(ctx, m, dir, col, x, y, s, cfg) {
    var img = layAnh(m); if (!img) return true;   // chưa tải xong: không vẽ thân gốc, tránh nháy
    s = s || 1;
    var C = P.CONFIG || {}, chanX = x + (C.CHAR_ANCHOR_X || 16) * s, chanY = y + (C.CHAR_ANCHOR_Y || 62) * s;
    var w = W(), e = w && w.player && cfg && w.player.cfg === cfg ? w.player : null;
    var f = khungCua(m, col, e), hang = dir & 3;
    var sm = ctx.imageSmoothingEnabled; ctx.imageSmoothingEnabled = true;
    // ảnh giữ độ phân giải gốc, chỉ thu nhỏ lúc vẽ (tiLe) → lên màn hình phóng to vẫn nét
    var k = (m.tiLe || 1) * s;
    ctx.drawImage(img, f * m.fw, hang * m.fh, m.fw, m.fh, chanX - m.ax * k, chanY - m.ay * k, m.fw * k, m.fh * k);
    ctx.imageSmoothingEnabled = sm;
    return true;
  }

  /* ---------------- bọc SpriteFactory ---------------- */
  // canvas giả: gọi drawBody gốc cho các lớp bọc khác (danh hiệu) nhận diện, nhưng không vẽ gì
  var ctxRong = typeof Proxy !== "undefined" ? new Proxy({}, { get: function () { return function () {}; }, set: function () { return true; } }) : null;
  function bocSprite() {
    var SF = P.SpriteFactory;
    if (!SF || !SF.drawFrame || SF.__matNa) return !!(SF && SF.__matNa);
    SF.__matNa = true;
    var gocFrame = SF.drawFrame, gocBody = SF.drawBody;
    SF.drawFrame = function (ctx, sheet, row, col, x, y, scale, cfg) {
      var m = matNaCua(cfg);
      if (m) return veNoel(ctx, m, row, col, x | 0, y | 0, scale || 1, cfg);
      return gocFrame.apply(this, arguments);
    };
    if (gocBody) SF.drawBody = function (ctx, sheet, dir, col, x, y, cfg) {
      var m = matNaCua(cfg);
      if (m) {
        // vẫn báo cho lớp danh hiệu biết thân vừa vẽ là ai (phi_phong.js bọc drawBody ở ngoài hoặc trong)
        if (ctxRong) try { gocBody.call(this, ctxRong, sheet, dir, col, x, y, cfg); } catch (e) {}
        return veNoel(ctx, m, dir, col, x | 0, y | 0, 1, cfg);
      }
      return gocBody.apply(this, arguments);
    };
    return true;
  }

  /* ---------------- cưỡi thú / phi hành: ẩn thú, Noel đi bộ dưới đất ---------------- */
  function bocVeNguoi() {
    // nhân vật chính: hàm draw nằm trên chính đối tượng người chơi (tạo lại khi đổi bản đồ)
    var w = W(), pl = w && w.player;
    if (pl && pl.draw && !pl.draw.__matNa) {
      var goc = pl.draw;
      pl.draw = function () {
        if (!(pl.flyRise > 0 || pl.flying) || !matNaCua(pl.cfg)) return goc.apply(this, arguments);
        var r = pl.flyRise, f = pl.flying;
        pl.flyRise = 0; pl.flying = false;
        try { return goc.apply(this, arguments); } finally { pl.flyRise = r; pl.flying = f; }
      };
      pl.draw.__matNa = true;
    }
    // vệt lửa Kỳ Lân dưới chân cũng tắt khi đang là Noel
    var TC = P.ThuCuoi;
    if (TC && TC.drawFront && !TC.drawFront.__matNa) {
      var df = TC.drawFront;
      TC.drawFront = function (ctx, x, y, n) { if (n && matNaCua(n.cfg)) return; return df.apply(this, arguments); };
      TC.drawFront.__matNa = true;
    }
    return !!(pl && pl.draw && pl.draw.__matNa);
  }

  /* ---------------- đổi đồ thì cập nhật ngay ---------------- */
  function bocDongBo() {
    var PP = P.PhiPhong;
    if (PP && PP.dongBo && !PP.dongBo.__matNa) {
      var g = PP.dongBo;
      PP.dongBo = function () { MN.dongBo(); return g.apply(this, arguments); };
      PP.dongBo.__matNa = true;
    }
  }

  /* đang là Noel thì mọi thứ tính theo độ cao bay (kiếm Vạn Kiếm Quy Tông, hào quang, hiệu ứng chiêu…)
   * cũng nằm sát đất như Noel, không lơ lửng ngang chỗ người cưỡi thú */
  function bocBayCao() {
    var g = window.NTBayCao;
    if (typeof g !== "function" || g.__matNa) return !!(g && g.__matNa);
    window.NTBayCao = function (v) { if (v && matNaCua(v.cfg)) return 0; return g.apply(this, arguments); };
    window.NTBayCao.__matNa = true;
    return true;
  }

  function caiDat() {
    var a = bocSprite(), b = bocVeNguoi(), c = moONgoaiTrang() && bocBayCao();
    bocDongBo(); MN.dongBo();
    return a && b && c;
  }
  var lan = 0, hen = setInterval(function () { if (caiDat() || ++lan > 150) clearInterval(hen); }, 100);
  // người chơi được tạo lại khi đổi bản đồ / đăng nhập → bọc lại hàm draw
  setInterval(function () { try { bocVeNguoi(); } catch (e) {} }, 500);
  caiDat();
})(window.PNTT);
