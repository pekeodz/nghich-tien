/* ============================================================================
 *  thu_cuoi.js — THÚ CƯỠI THÊM CỦA NGHỊCH TIÊN
 * ----------------------------------------------------------------------------
 *  Mỗi thú cưỡi = 1 vật phẩm ô "phi_hanh" có fly.art = "ngua" + khối mount
 *  (tấm sprite 10 cột x 4 hàng giống Hắc Thổ Linh Mã: xuống, trái, phải, lên;
 *  8 khung chạy + 2 khung đứng; mỗi khung 128x112, vẽ ra 64x56; chân đặt cùng mặt đất với Hắc Thổ Linh Mã).
 *  Thú cưỡi mới (Trâu, Xe Của Ma Tốc Độ, Sát Lang Hỏa Thánh, Hoàng Lân, Phượng Hoàng): chỉ admin gửi tặng.
 * ==========================================================================*/
/* Độ cao người cưỡi khi phi hành (Nghịch Tiên): mặc định CONFIG.FLY.HOVER, thú cưỡi cao
 * (mount.hover) nâng người lên ngang yên. Mọi chỗ trước đây tính FLY.HOVER * flyRise gọi hàm này. */
window.NTBayCao = function (v) {
  var P = window.PNTT || {}, C = P.CONFIG, r = (v && v.flyRise) || 0;
  if (!r) return 0;
  var h = C && C.FLY ? C.FLY.HOVER : 10, cfg = v.cfg, it = cfg && cfg.fly && P.ITEMS && P.ITEMS[cfg.fly];
  var m = it && it.fly && it.fly.art === "ngua" && it.mount;
  var hh = m && m.hoverHuong && m.hoverHuong[v.dir | 0];
  return (hh || (m && m.hover) || h) * r;
};
(function (P) {
  "use strict";
  P.ThuCuoi = P.ThuCuoi || {};

  /* Chọn cột khung cho thú cưỡi có số khung đi / đứng khác nhau theo từng hướng.
   * mount.di = [xuống, trái, phải, lên] số khung đi; mount.dung = số khung đứng (0 = đứng vẫn lặp dáng đi, như chim vỗ cánh).
   * Mỗi hàng của tấm sheet: [khung đi ...][khung đứng ...]. Gọi từ player.js (drawFlyHorse) qua mount.cotKhung. */
  function cotKhung(o, n, d, h) {
    var di = o.di[d] || 1, dg = o.dung[d] || 0, s;
    if (n && n.state === "walk") { s = Math.floor(h * o.fps) % di; if (s < 0) s += di; return s; }
    if (!dg) { s = Math.floor(h * (o.idleFps || o.fps)) % di; if (s < 0) s += di; return s; }
    s = Math.floor(h * o.idleFps) % dg; if (s < 0) s += dg;
    return di + s;
  }
  P.ThuCuoi.cotKhung = cotKhung;

  function khungHienTai(o, n) {                // giống cách player.js chọn khung
    var h = (n && n.animTime) || 0, s;
    if (o.cotKhung) { var d = (n && n.dir) | 0; if (d < 0 || d >= (o.rows || 4)) d = 0; return o.cotKhung(o, n, d, h); }
    if (!o.idleFrames || (n && n.state === "walk")) {
      s = Math.floor(h * o.fps) % o.frames; if (s < 0) s += o.frames;
    } else {
      s = Math.floor(h * o.idleFps) % o.idleFrames; if (s < 0) s += o.idleFrames;
      s += o.frames;
    }
    return s;
  }
  // Lớp trước: khi quay mặt xuống, đầu thú nằm trước người cưỡi nên phải vẽ lại
  // phần đầu SAU khi vẽ người. mount.front = { hướng: số pixel tính từ đỉnh khung, hoặc [từ, đến] }.
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

  /* ---------------- PHẨM THIÊN (cao nhất): viền vàng ----------------
   * Bản gốc chỉ có Phàm / Linh / Địa nên đồ "Thiên phẩm" bị tô như đồ thường. */
  (function () {
    var L = P.Loot;
    if (!L || !L.gradeKey || L.gradeKey.__thien) return;
    if (L.GRADES && !L.GRADES.heaven) L.GRADES.heaven = { color: "#e0a53a", glow: .56, name: "#ffd77a" };
    var g = L.gradeKey;
    L.gradeKey = function (t) { return t && t.indexOf("Thiên") >= 0 ? "heaven" : g.apply(this, arguments); };
    L.gradeKey.__thien = true;
    var css = ".equip-slot.grade-heaven,.bag-slot.grade-heaven,.bag-detail-icon.grade-heaven{border-color:#e0a53a;box-shadow:0 0 6px rgba(255,190,70,.45) inset}";
    var them = function () { var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st); };
    if (document.head) them(); else document.addEventListener("DOMContentLoaded", them);
  })();

  /* ---------------- 5 THÚ CƯỠI MỚI ----------------
   * Ảnh lẻ do chủ game vẽ, ghép bằng tools/thu_cuoi_moi/ghep.py (xem cau_hinh.json).
   * Tấm sheet: 4 hàng (xuống, trái, phải, lên); khung vẽ 1:1; chân thú chạm đất ở y = gy.
   * hover = người cưỡi được nâng lên bao nhiêu (ngang yên), anchorY = gy - hover.
   * front = phần thú vẽ đè lên người cưỡi (đầu khi quay xuống, mông/đuôi khi quay lên). */
  var MOI = {};
  function themThu(id, o) {
    var SP = "assets/sprites/mount/" + id + ".png", IC = "assets/items/icon_" + id + ".png";
    if (P.ASSET_MANIFEST) { P.ASSET_MANIFEST[SP] = o.bytes[0]; P.ASSET_MANIFEST[IC] = o.bytes[1]; }
    if (P.ASSET_VERSIONS) { P.ASSET_VERSIONS[SP] = o.ver; P.ASSET_VERSIONS[IC] = o.ver; }
    var m = o.mount;
    var mount = { path: SP, frameW: m.fw, frameH: m.fh, frames: m.di[0], idleFrames: m.dung[0] || 0, rows: 4,
                  fps: m.fps, idleFps: m.idleFps, drawW: m.fw, drawH: m.fh, anchorX: m.fw / 2, anchorY: m.gy - m.hover,
                  hover: m.hover, di: m.di, dung: m.dung, cotKhung: cotKhung };
    if (m.ha) {   // hàng nào được hạ xuống trong sheet thì người cưỡi nâng lên đúng chừng đó (chân thú vẫn chạm đất)
      for (var d = 0; d < 4; d++) if (m.ha[d]) { mount.hoverHuong = mount.hoverHuong || {}; mount.hoverHuong[d] = m.hover + m.ha[d]; }
    }
    // lớp đè trước người cưỡi: quay xuống thì đầu thú che từ ngang bụng người trở xuống,
    // quay lên thì mông/đuôi che chân người
    mount.front = m.front || { 0: [mount.anchorY - 26, m.fh], 3: [mount.anchorY - 4, m.fh] };
    P.ITEMS[id] = {
      id: id, name: o.name, type: "vat_pham", slot: "phi_hanh", grade: o.grade, requireRealm: o.realm,
      fly: { art: "ngua", speed: o.speed, realmMin: o.realm, name: "Cưỡi " + o.name },
      mount: mount, desc: o.desc, icon: id, adminOnly: true
    };
    for (var k in o.stat) P.ITEMS[id][k] = o.stat[k];
    MOI[id] = o;
  }

  themThu("trau_linh", {
    name: "Trâu", grade: "Linh phẩm trung", realm: "luyen_khi_5", speed: 1.75, ver: "m5c", bytes: [36116, 6908],
    stat: { bpBonus: 20 },
    mount: { fw: 110, fh: 85, gy: 82, ha: [0, 0, 0, 0], di: [5, 6, 6, 5], dung: [1, 1, 1, 1], fps: 8, idleFps: 1, hover: 21 },
    desc: "Trâu cày lưng rộng của vùng đồng bằng, khoác yên gấm đỏ. Đi không nhanh nhưng bền sức, gánh nổi người mặc giáp nặng. Cần Luyện Khí Tầng 5."
  });
  themThu("xe_ma_toc_do", {
    name: "Xe Của Ma Tốc Độ", grade: "Địa phẩm thượng", realm: "truc_co_1", speed: 2.05, ver: "m5c", bytes: [89662, 8451],
    stat: { mpRegen: 2, spRegen: 1 }, lua: { sau: 30 },
    mount: { fw: 126, fh: 124, gy: 115, ha: [4, 0, 0, 0], di: [9, 6, 6, 8], dung: [4, 1, 1, 1], fps: 14, idleFps: 6, hover: 19 },
    desc: "Cỗ xe sắt hai bánh của quỷ tốc độ, đầu lâu làm đèn, bánh xe cháy lửa địa ngục. Lao qua đâu là để lại vệt lửa cháy trên mặt đất. Cần Trúc Cơ."
  });
  themThu("sat_lang_hoa_thanh", {
    name: "Sát Lang Hỏa Thánh", grade: "Thiên phẩm thượng", realm: "truc_co_1", speed: 2.25, ver: "m5c", bytes: [115503, 7524],
    stat: { mpRegen: 4, bpBonus: 30 }, lua: { sau: 34 },
    mount: { fw: 128, fh: 124, gy: 99, ha: [20, 0, 0, 0], di: [10, 9, 9, 10], dung: [7, 1, 1, 1], fps: 12, idleFps: 5, hover: 23 },
    desc: "Thánh thú sói lửa của Hỏa Ngục, lông đen như mực, bờm và đuôi cháy rực không bao giờ tắt. Chạy đến đâu lửa cháy theo vết chân đến đó. Thú cưỡi hàng đầu, cần Trúc Cơ."
  });
  themThu("hoang_lan", {
    name: "Hoàng Lân", grade: "Thiên phẩm thượng", realm: "truc_co_1", speed: 2.25, ver: "m5c", bytes: [118054, 5701],
    stat: { mpRegen: 4, bpBonus: 30 }, lua: { sau: 36 },
    mount: { fw: 118, fh: 136, gy: 105, ha: [0, 0, 0, 0], di: [12, 9, 9, 9], dung: [8, 1, 1, 1], fps: 12, idleFps: 6, hover: 27 },
    desc: "Kỳ lân vảy vàng mang huyết mạch Hoàng Long, sừng tím, bờm đỏ, chóp đuôi là ngọn lửa bất diệt. Ai cưỡi được Hoàng Lân là người được trời đất chọn. Thú cưỡi hàng đầu, cần Trúc Cơ."
  });
  themThu("phuong_hoang_hoa", {
    name: "Phượng Hoàng", grade: "Thiên phẩm thượng", realm: "truc_co_1", speed: 2.3, ver: "m5c", bytes: [95213, 5233],
    stat: { mpRegen: 5, bpBonus: 25 },
    mount: { fw: 132, fh: 115, gy: 93, ha: [0, 0, 0, 0], di: [9, 8, 8, 9], dung: [0, 0, 0, 0], fps: 12, idleFps: 8, hover: 37 },
    desc: "Thần điểu lửa tắm mình trong lửa mà tái sinh, mỗi lần vỗ cánh rơi xuống một trận mưa tàn lửa. Cưỡi Phượng Hoàng là bay giữa không trung, chẳng con thú nào đuổi kịp. Thú cưỡi hàng đầu, cần Trúc Cơ."
  });
  P.ThuCuoi.MOI = MOI;

  // nạp sẵn ảnh thú cưỡi (player.js chỉ lấy ảnh đã nạp, không tự nạp)
  function napAnh() {
    var A = P.Assets; if (!A || !A.loadImage) return false;
    for (var id in MOI) { try { A.loadImage(P.ITEMS[id].mount.path, A.PRIO && A.PRIO.PREFETCH); } catch (e) {} }
    return true;
  }
  if (!napAnh()) { var lanNap = 0, henNap = setInterval(function () { if (napAnh() || ++lanNap > 100) clearInterval(henNap); }, 200); }

  /* ---------------- HOÀNG KIM SƯ TỬ ----------------
   * Sprite nền trong suốt (4 hàng: lên, xuống, trái, phải x 8 khung), cắt bằng tools/thu_cuoi/cat_sprite.py:
   *   python3 cat_sprite.py <anh.png> 0.75 0 <ra.png>   (hàng trái trong ảnh gốc có khung ngược nên lật hàng phải)
   * Khung 127x86, tâm yên x=63, chân chạm đất y=83; hover nâng người cưỡi ngang yên. */
  (function () {
    var SP = "assets/sprites/mount/su_tu_hoang_kim.png", IC = "assets/items/icon_su_tu_hoang_kim.png";
    if (P.ASSET_MANIFEST) { P.ASSET_MANIFEST[SP] = 84827; P.ASSET_MANIFEST[IC] = 6615; }
    if (P.ASSET_VERSIONS) { P.ASSET_VERSIONS[SP] = "sutu01"; P.ASSET_VERSIONS[IC] = "sutu01"; }
    P.ITEMS.su_tu_hoang_kim = {
      id: "su_tu_hoang_kim", name: "Hoàng Kim Sư Tử", type: "vat_pham", slot: "phi_hanh", grade: "Linh phẩm thượng",
      requireRealm: "luyen_khi_10",
      fly: { art: "ngua", speed: 1.8, realmMin: "luyen_khi_10", name: "Cưỡi Hoàng Kim Sư Tử" },
      mount: { path: SP, frameW: 127, frameH: 86, frames: 8, idleFrames: 2, rows: 4, fps: 10, idleFps: 1,
               drawW: 127, drawH: 86, anchorX: 63, anchorY: 56, hover: 27,
               front: { 0: [30, 86], 3: [40, 86] } },   // xuống: bờm + mặt che chân người; lên: mông + đuôi
      bpBonus: 15, spRegen: 1,
      desc: "Sư tử bờm vàng của Tây Vực, khoác yên gấm đỏ dát vàng. Gầm một tiếng, yêu thú quanh đó đều cụp đuôi. Cần Luyện Khí Tầng 10 mới trị nổi.",
      icon: "su_tu_hoang_kim"
    };
  })();

  /* ---------------- VỆT LỬA khi cưỡi thú lửa (Xe Của Ma Tốc Độ, Sát Lang Hỏa Thánh, Hoàng Lân) ----------------
   * Ba loại hạt, vẽ theo kiểu pixel cho hợp với game:
   *   chay  — vết cháy đỏ cam trên mặt đất, mờ dần (lớp "back", dưới nhân vật)
   *   lua   — lưỡi lửa bốc lên từ dấu chân (lớp "back")
   *   tan   — tàn lửa nhỏ bay lơ lửng (lớp "front", trên nhân vật)
   * Gắn vào PNTT.VFX.update/draw sau khi vfx.js đã nạp. */
  var hat = [], MAX_HAT = 260, demLua = 0, demChay = 0, demTan = 0;
  var MAU_LUA = ["#fff3b0", "#ffd25a", "#ff9a2e", "#f0561e", "#b3261a", "#5a1a14"];

  function thuLua(pl) {
    var o = pl && pl.flyRise > 0 && pl.cfg && MOI[pl.cfg.fly];
    return o && o.lua ? o.lua : null;
  }
  // điểm sau đuôi theo hướng đi: 0 xuống, 1 trái, 2 phải, 3 lên
  function sauLung(pl, sau) {
    var d = pl.dir | 0;
    return d === 1 ? { x: pl.x + sau, y: pl.y - 1 } : d === 2 ? { x: pl.x - sau, y: pl.y - 1 }
         : d === 0 ? { x: pl.x, y: pl.y - 6 } : { x: pl.x, y: pl.y + 3 };
  }
  function them(o) { if (hat.length < MAX_HAT) hat.push(o); }
  function sinhHat(pl, dt) {
    var lua = thuLua(pl);
    if (!lua) return;
    var p = sauLung(pl, lua.sau || 26), dangChay = pl.state === "walk";
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

})(window.PNTT);
