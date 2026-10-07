/* ============================================================================
 *  thu_cuoi.js — THÚ CƯỠI THÊM CỦA NGHỊCH TIÊN
 * ----------------------------------------------------------------------------
 *  Mỗi thú cưỡi = 1 vật phẩm ô "phi_hanh" có fly.art = "ngua" + khối mount
 *  (tấm sprite 10 cột x 4 hàng giống Hắc Thổ Linh Mã: xuống, trái, phải, lên;
 *  8 khung chạy + 2 khung đứng; mỗi khung 128x112, vẽ ra 64x56; chân đặt cùng mặt đất với Hắc Thổ Linh Mã).
 *  Tỉ lệ rơi chỉnh trong loot_rates.js (KY_LAN_CHANCE).
 * ==========================================================================*/
(function (P) {
  "use strict";
  var SPRITE = "assets/sprites/mount/ky_lan_xich_diem.png";
  var ICON = "assets/items/icon_ky_lan_xich_diem.png";

  // Khai báo ảnh với bộ nạp (manifest.js sinh tự động nên thêm ở đây)
  if (P.ASSET_MANIFEST) { P.ASSET_MANIFEST[SPRITE] = 82898; P.ASSET_MANIFEST[ICON] = 1720; }
  if (P.ASSET_VERSIONS) { P.ASSET_VERSIONS[SPRITE] = "kylan07"; P.ASSET_VERSIONS[ICON] = "kylan03"; }

  P.ITEMS.ky_lan_xich_diem = {
    id: "ky_lan_xich_diem",
    name: "Xích Diễm Kỳ Lân",
    type: "vat_pham",
    slot: "phi_hanh",
    grade: "Địa phẩm thượng",
    fly: { art: "ngua", speed: 1.85, realmMin: "luyen_khi_7", name: "Cưỡi Xích Diễm Kỳ Lân" },
    mount: { path: SPRITE, frameW: 128, frameH: 112, frames: 8, idleFrames: 2, rows: 4,
             fps: 11, idleFps: 2.5, drawW: 64, drawH: 56, anchorX: 32, anchorY: 35 },
    mpRegen: 2,
    desc: "Kỳ lân lửa sinh ra từ máu rồng nhỏ xuống Long Uyên. Bờm và chóp đuôi cháy rực không tắt, " +
          "bốn vó giẫm lên linh khí mà chạy. Chỉ chịu theo người từng góp sức hạ Thần Thú Xích Long.",
    icon: "ky_lan_xich_diem"
  };

  // Lớp trước: khi quay mặt xuống, đầu thú nằm trước người cưỡi nên phải vẽ lại
  // phần đầu SAU khi vẽ người. mount.front = { hướng: số pixel tính từ đỉnh khung, hoặc [từ, đến] }.
  P.ITEMS.ky_lan_xich_diem.mount.front = { 0: 54, 3: [40, 72] };   // 3 = hướng lên: nửa dưới đuôi lửa + mông

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
    var d = (n.dir | 0), v = o.front[d];
    if (!v || d < 0 || d >= (o.rows || 4)) return;
    var tu = Array.isArray(v) ? v[0] : 0, cao = Array.isArray(v) ? v[1] - v[0] : v;
    var img = P.Assets && P.Assets.get ? P.Assets.get(o.path) : null;
    if (!img) return;
    var s = khungHienTai(o, n), k = o.drawW / o.frameW;
    ctx.save();
    ctx.translate(x, y);
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(img, s * o.frameW, d * o.frameH + tu, o.frameW, cao, -o.anchorX, -o.anchorY + tu * k, o.drawW, cao * k);
    ctx.restore();
  };

  /* ---------------- VỆT LỬA khi cưỡi Xích Diễm Kỳ Lân ----------------
   * Ba loại hạt, vẽ theo kiểu pixel cho hợp với game:
   *   chay  — vết cháy đỏ cam trên mặt đất, mờ dần (lớp "back", dưới nhân vật)
   *   lua   — lưỡi lửa bốc lên từ dấu chân (lớp "back")
   *   tan   — tàn lửa nhỏ bay lơ lửng (lớp "front", trên nhân vật)
   * Gắn vào PNTT.VFX.update/draw sau khi vfx.js đã nạp. */
  var TRAIL_ITEM = "ky_lan_xich_diem";
  var hat = [], MAX_HAT = 260, demLua = 0, demChay = 0, demTan = 0;
  var MAU_LUA = ["#fff3b0", "#ffd25a", "#ff9a2e", "#f0561e", "#b3261a", "#5a1a14"];

  function cuoiKyLan(pl) {
    return pl && pl.flyRise > 0 && pl.cfg && pl.cfg.fly === TRAIL_ITEM;
  }
  // điểm sau đuôi theo hướng đi: 0 xuống, 1 trái, 2 phải, 3 lên
  function sauLung(pl) {
    var d = pl.dir | 0;
    return d === 1 ? { x: pl.x + 12, y: pl.y - 1 } : d === 2 ? { x: pl.x - 12, y: pl.y - 1 }
         : d === 0 ? { x: pl.x, y: pl.y - 6 } : { x: pl.x, y: pl.y + 3 };
  }
  function them(o) { if (hat.length < MAX_HAT) hat.push(o); }
  function sinhHat(pl, dt) {
    if (!cuoiKyLan(pl)) return;
    var p = sauLung(pl), dangChay = pl.state === "walk";
    if (dangChay) {
      demChay -= dt; demLua -= dt; demTan -= dt;
      if (demChay <= 0) {
        demChay = 0.05;
        them({ k: "chay", x: p.x + (Math.random() * 10 - 5), y: p.y + (Math.random() * 4 - 2),
               r: 2 + Math.random() * 2.5, life: 1.4 + Math.random() * 0.5, max: 1.9 });
      }
      while (demLua <= 0) {
        demLua += 0.022;
        them({ k: "lua", x: p.x + (Math.random() * 12 - 6), y: p.y + (Math.random() * 4 - 2),
               vx: (Math.random() * 10 - 5), vy: -(14 + Math.random() * 22),
               s: 2 + (Math.random() * 2 | 0), life: 0.45 + Math.random() * 0.35, max: 0.8 });
      }
      if (demTan <= 0) {
        demTan = 0.07;
        them({ k: "tan", x: p.x + (Math.random() * 14 - 7), y: p.y - 4 - Math.random() * 6,
               vx: (Math.random() * 16 - 8), vy: -(20 + Math.random() * 26), ph: Math.random() * 6.28,
               life: 0.9 + Math.random() * 0.6, max: 1.5 });
      }
    } else {
      demTan -= dt;                       // đứng yên: vài tàn lửa quanh vó
      if (demTan <= 0) {
        demTan = 0.22;
        them({ k: "tan", x: pl.x + (Math.random() * 26 - 13), y: pl.y - Math.random() * 4,
               vx: (Math.random() * 6 - 3), vy: -(10 + Math.random() * 12), ph: Math.random() * 6.28,
               life: 0.8 + Math.random() * 0.5, max: 1.3 });
      }
    }
  }
  function capNhat(dt) {
    var W = P.SceneWorld;
    if (W && W.player) sinhHat(W.player, dt);
    for (var i = hat.length - 1; i >= 0; i--) {
      var h = hat[i];
      h.life -= dt;
      if (h.life <= 0) { hat.splice(i, 1); continue; }
      if (h.k === "lua") { h.x += h.vx * dt; h.y += h.vy * dt; h.vx *= 0.96; }
      else if (h.k === "tan") { h.ph += dt * 6; h.x += (h.vx + Math.sin(h.ph) * 10) * dt; h.y += h.vy * dt; h.vy *= 0.985; }
    }
  }
  function ve(ctx, camX, camY, lop) {
    if (!hat.length) return;
    ctx.save();
    ctx.imageSmoothingEnabled = false;
    for (var i = 0; i < hat.length; i++) {
      var h = hat[i], t = h.life / h.max, x = Math.round(h.x - camX), y = Math.round(h.y - camY);
      if (lop === "back" && h.k === "chay") {
        // vết cháy: bầu dục pixel dẹt theo mặt đất + quầng sáng, nguội dần cam -> đỏ thẫm
        var r = Math.max(2, Math.round(h.r * (0.75 + 0.25 * t)));
        var nong = Math.min(1, t * 1.5);
        ctx.globalCompositeOperation = "lighter";
        ctx.globalAlpha = 0.28 * nong;
        var g = ctx.createRadialGradient(x, y, 0, x, y, r * 3);
        g.addColorStop(0, "#ff7a1e"); g.addColorStop(1, "rgba(255,80,20,0)");
        ctx.fillStyle = g; ctx.fillRect(x - r * 3, y - r * 2, r * 6, r * 4);
        ctx.globalCompositeOperation = "source-over";
        ctx.globalAlpha = Math.min(1, t * 2) * 0.85;
        for (var dy = -1; dy <= 1; dy++) {               // 3 hàng: hẹp - rộng - hẹp
          var w = dy === 0 ? r * 2 : Math.max(1, r * 2 - 3);
          ctx.fillStyle = dy === 0 ? (t > 0.55 ? "#ff8a2a" : t > 0.3 ? "#c8401c" : "#6a1c12")
                                   : (t > 0.55 ? "#d8501e" : "#5a1810");
          ctx.fillRect(Math.round(x - w / 2), y + dy, Math.round(w), 1);
        }
        if (t > 0.65) { ctx.fillStyle = "#ffe08a"; ctx.fillRect(x - 1, y, 2, 1); }
      } else if (lop === "back" && h.k === "lua") {
        // lưỡi lửa: cột nhọn, gốc vàng trắng -> cam -> ngọn đỏ, co dần khi tắt
        var cao = Math.max(1, Math.round((h.s + 2) * (0.35 + t)));
        var rong = t > 0.45 ? 2 : 1;
        ctx.globalCompositeOperation = "lighter";
        ctx.globalAlpha = 0.35 * t;
        ctx.fillStyle = "#ff6a1a"; ctx.fillRect(x - rong, y - cao, rong * 2 + 1, cao + 1);
        ctx.globalCompositeOperation = "source-over";
        ctx.globalAlpha = Math.min(1, t * 1.8);
        for (var k2 = 0; k2 < cao; k2++) {
          var u = k2 / cao;                                 // 0 = gốc, 1 = ngọn
          ctx.fillStyle = u < 0.3 ? (t > 0.5 ? "#fff3b0" : "#ffd25a") : u < 0.65 ? "#ff9a2e" : (t > 0.3 ? "#f0561e" : "#8a2416");
          var ww = u < 0.6 ? rong : 1;
          ctx.fillRect(x - (ww >> 1), y - k2, ww, 1);
        }
      } else if (lop === "front" && h.k === "tan") {
        ctx.globalCompositeOperation = "source-over";
        ctx.globalAlpha = Math.min(1, t * 2);
        ctx.fillStyle = t > 0.55 ? "#ffe9a0" : t > 0.25 ? "#ff9a2e" : "#d0401e";
        ctx.fillRect(x, y, 1, 1);
        if (t > 0.6) { ctx.globalAlpha *= 0.45; ctx.fillRect(x - 1, y, 3, 1); ctx.fillRect(x, y - 1, 1, 3); }
      }
    }
    ctx.restore();
  }
  function ganVaoVFX() {
    var V = P.VFX;
    if (!V || V.__vetLua) return !!(V && V.__vetLua);
    V.__vetLua = true;
    var u = V.update, d = V.draw, c = V.clear;
    V.update = function (dt) { var r = u.apply(this, arguments); try { capNhat(dt || 0); } catch (e) {} return r; };
    V.draw = function (ctx, camX, camY, lop) {
      var r = d.apply(this, arguments);
      if (lop === "back" || lop === "front") { try { ve(ctx, camX, camY, lop); } catch (e) {} }
      return r;
    };
    V.clear = function () { hat.length = 0; return c.apply(this, arguments); };
    return true;
  }
  P.ThuCuoi.vetLua = { hat: hat, capNhat: capNhat };   // để kiểm thử
  if (!ganVaoVFX()) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", ganVaoVFX);
    else setTimeout(ganVaoVFX, 0);
  }

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
