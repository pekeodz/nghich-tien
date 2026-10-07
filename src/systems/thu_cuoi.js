/* ============================================================================
 *  thu_cuoi.js — THÚ CƯỠI THÊM CỦA NGHỊCH TIÊN
 * ----------------------------------------------------------------------------
 *  Mỗi thú cưỡi = 1 vật phẩm ô "phi_hanh" có fly.art = "ngua" + khối mount
 *  (tấm sprite 2 cột x 4 hàng như Hạc Tiên: xuống, trái, phải, lên; 2 khung
 *  đổi qua lại; mỗi khung 128x112, vẽ ra 64x56; chân đặt cùng mặt đất với Hắc Thổ Linh Mã).
 *  Tỉ lệ rơi chỉnh trong loot_rates.js (KY_LAN_CHANCE).
 * ==========================================================================*/
(function (P) {
  "use strict";
  var SPRITE = "assets/sprites/mount/ky_lan_xich_diem.png";
  var ICON = "assets/items/icon_ky_lan_xich_diem.png";

  // Khai báo ảnh với bộ nạp (manifest.js sinh tự động nên thêm ở đây)
  if (P.ASSET_MANIFEST) { P.ASSET_MANIFEST[SPRITE] = 25585; P.ASSET_MANIFEST[ICON] = 1925; }
  if (P.ASSET_VERSIONS) { P.ASSET_VERSIONS[SPRITE] = "kylan06"; P.ASSET_VERSIONS[ICON] = "kylan02"; }

  P.ITEMS.ky_lan_xich_diem = {
    id: "ky_lan_xich_diem",
    name: "Xích Diễm Kỳ Lân",
    type: "vat_pham",
    slot: "phi_hanh",
    grade: "Địa phẩm thượng",
    fly: { art: "ngua", speed: 1.85, realmMin: "luyen_khi_7", name: "Cưỡi Xích Diễm Kỳ Lân" },
    mount: { path: SPRITE, frameW: 128, frameH: 112, frames: 2, rows: 4,
             fps: 4, drawW: 64, drawH: 56, anchorX: 32, anchorY: 35 },
    mpRegen: 2,
    desc: "Kỳ lân lửa sinh ra từ máu rồng nhỏ xuống Long Uyên. Bờm và chóp đuôi cháy rực không tắt, " +
          "bốn vó giẫm lên linh khí mà chạy. Chỉ chịu theo người từng góp sức hạ Thần Thú Xích Long.",
    icon: "ky_lan_xich_diem"
  };

  // Lớp trước: khi quay mặt xuống, đầu thú nằm trước người cưỡi nên phải vẽ lại
  // phần đầu SAU khi vẽ người. mount.front = { hướng: số pixel tính từ đỉnh khung }.
  P.ITEMS.ky_lan_xich_diem.mount.front = { 0: 53 };

  function khungHienTai(o, n) {                // giống cách player.js chọn khung
    var h = (n && n.animTime) || 0, s;
    if (!o.idleFrames || (n && n.state === "walk")) {
      s = Math.floor(h * o.fps) % o.frames; if (s < 0) s += o.frames;
    } else {
      s = Math.floor(h * o.idleFps) % o.idleFrames; if (s < 0) s += o.idleFrames;
      s += o.frames;
    }
    return s;
  }
  P.ThuCuoi = P.ThuCuoi || {};
  P.ThuCuoi.drawFront = function (ctx, x, y, n) {
    var cfg = n && n.cfg, it = cfg && cfg.fly && P.ITEMS[cfg.fly];
    var o = it && it.fly && it.fly.art === "ngua" && it.mount;
    if (!o || !o.front) return;
    var d = (n.dir | 0), cao = o.front[d];
    if (!cao || d < 0 || d >= (o.rows || 4)) return;
    var img = P.Assets && P.Assets.get ? P.Assets.get(o.path) : null;
    if (!img) return;
    var s = khungHienTai(o, n), k = o.drawW / o.frameW;
    ctx.save();
    ctx.translate(x, y);
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(img, s * o.frameW, d * o.frameH, o.frameW, cao, -o.anchorX, -o.anchorY, o.drawW, cao * k);
    ctx.restore();
  };

  // Rơi từ Thần Thú Xích Long
  var L = P.Loot;
  if (L && L.rollKill && !L.__kyLanVa) {
    L.__kyLanVa = true;
    var goc = L.rollKill;
    L.rollKill = function (a, t, e) {
      var o = goc.apply(this, arguments);
      if (a && Array.isArray(o) && a.type === "than_thu_xich_long") {
        var c = (P.LootRates && P.LootRates.KY_LAN_CHANCE) || 0;
        if ((e || Math.random)() < c) o.push("ky_lan_xich_diem");
      }
      return o;
    };
  }
})(window.PNTT);
