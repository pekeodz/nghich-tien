/* ============================================================================
 *  loot_rates.js — BẢNG TỈ LỆ RƠI ĐỒ của Nghịch Tiên
 * ----------------------------------------------------------------------------
 *  Bản gốc lấy bảng này từ máy chủ của tác giả. Bản Nghịch Tiên không có máy
 *  chủ đó nên trước đây mọi tỉ lệ dưới đây đều = 0 (quái không rơi linh thạch,
 *  nguyên liệu, trang bị hiếm; nhiệm vụ Yêu Cốt ở mốc 15 không làm được).
 *
 *  Số là xác suất cho MỖI con quái bị hạ: 0.25 = 25%, 0.005 = 0,5%.
 *  Muốn game dễ/khó hơn thì chỉnh số ở đây rồi tải lại trang.
 * ==========================================================================*/
window.PNTT = window.PNTT || {};
PNTT.LootRates = {
  // --- Rơi thường gặp ---
  STONE_CHANCE: 0.25,          // linh thạch từ quái thường
  MATERIAL_DROP_CHANCE: 0.30,  // nguyên liệu / dược liệu nhiệm vụ
  YEU_COT_DROP_RATE: 0.25,     // Yêu Cốt (nhiệm vụ mốc 15 cần 10 cái)
  PHU_CHU_CHANCE: 0.03,        // phù chú từ yêu thú có yêu đan

  // --- Đồ hiếm ---
  RARE_GEAR_CHANCE: 0.003,     // mũ/giáp/giày/nhẫn/bội hiếm
  XUYEN_SON_CHANCE: 0.05,      // Xuyên Sơn Giáp Phiến (bản biến dị cố định 10%)
  HAC_TIEN_CHANCE: 0.01,       // thú cưỡi Hạc Tiên từ Hạc Tiên ở Yên Lăng
  HAC_TIEN_PHU_CHANCE: 0.05,   // phù chú từ Hạc Tiên
  HUYET_SAC_BOSS_CHANCE: 0.02, // Tử Tinh Dương Thần Bội từ boss Huyết Sắc
  XICH_PHI_KIEM_CHANCE: 0.005, // Xích Phi Kiếm từ boss Huyết Sắc
  LUC_PHI_KIEM_CHANCE: 0.005,  // Lục Phi Kiếm từ Hoàng Cửu Báo
  KY_LAN_CHANCE: 0.02,         // thú cưỡi Xích Diễm Kỳ Lân từ Thần Thú Xích Long (thu_cuoi.js)

  // --- Yêu Đan (bản gốc do máy chủ cấp, bản offline trước đây không bao giờ rơi) ---
  YEU_DAN_BOSS_CHANCE: 1.0,    // boss: chắc chắn (đúng như Bách Khoa trong game ghi)
  YEU_DAN_CHANCE: 0.30,        // yêu thú thường: Bạch Hổ Tuyết, Xích Nhãn Ngưu, Ngân Mao Hống…

  // --- Theo loại quái / bản đồ (__default dùng cho loại chưa ghi riêng) ---
  ORE: { __default: 0.15 },          // Huyền Thiết Khoáng từ quái đá
  ENEMY_STONE: { __default: 0.30 },  // quái có ghi "stoneRate" riêng
  MAP_STONE: { __default: 0.30 }     // bản đồ có ghi "stoneRate" riêng
};

/* Yêu Đan: gắn thêm vào kết quả hạ quái (Loot.rollKill).
 * Boss có trong Loot.YEU_DAN → YEU_DAN_BOSS_CHANCE; yêu thú thường → YEU_DAN_CHANCE.
 * Song Dực Ma Báo (Loot.YEU_DAN_CHOT_HA) → Yêu Đan Cấp 6 cho người ra đòn chót. */
(function (P) {
  "use strict";
  var L = P.Loot;
  if (!L || !L.rollKill || L.__yeuDanVa) return;
  L.__yeuDanVa = true;
  var goc = L.rollKill;
  L.rollKill = function (a, t, e) {
    var o = goc.apply(this, arguments);
    if (!a || !Array.isArray(o)) return o;
    var R = P.LootRates || {}, rnd = e || Math.random;
    var boss = !!(a.def && a.def.isBoss);
    var yd = L.YEU_DAN && L.YEU_DAN[a.type];
    if (yd && rnd() < (boss ? R.YEU_DAN_BOSS_CHANCE : R.YEU_DAN_CHANCE)) o.push(yd);
    var ch = L.YEU_DAN_CHOT_HA && L.YEU_DAN_CHOT_HA[a.type];
    if (ch && rnd() < R.YEU_DAN_BOSS_CHANCE) o.push(ch);
    return o;
  };
})(window.PNTT);
