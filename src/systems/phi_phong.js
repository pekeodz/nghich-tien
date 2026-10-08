/* ============================================================================
 *  phi_phong.js — PHI PHONG (ÁO CHOÀNG) CỦA NGHỊCH TIÊN
 * ----------------------------------------------------------------------------
 *  11 cấp theo kiểu Kiếm Thế: Siêu Phàm → Huyền Tinh Đại Thánh.
 *  - Thêm ô "phi_phong" (ngoaiTrang) vào Inventory.slots: lưu, cộng chỉ số như trang bị
 *    nhưng hiện ở mục Ngoại Trang (src/ui/ngoai_trang.js), không hiện trên bảng Trang Bị.
 *  - Vẽ phi phong bằng pixel quanh khung nhân vật 32x64 (bọc SpriteFactory.drawFrame):
 *    lớp sau lưng vẽ trước thân, lớp trước (cổ áo, gai vai, đốm sáng) vẽ sau thân.
 *  - Cấp 8 trở lên có vòng sáng dưới chân (ảnh dải khung assets/sprites/fx/vong_*.png).
 *  - Nâng cấp ở chỗ Rem (Chân Núi Tản Viên): Linh Thạch + Phi Phong Tinh Hoa,
 *    tỉ lệ giảm dần, thất bại mất nguyên liệu nhưng không tụt cấp.
 *  - Tinh Hoa rơi từ quái (boss rơi nhiều), mua được ở Rem 3 cái/ngày.
 *  Chỉnh cân bằng trong CAU_HINH và bảng CAP bên dưới.
 * ==========================================================================*/
(function (P) {
  "use strict";
  if (!P || !P.ITEMS) return;
  var PP = P.PhiPhong = {};

  var CAU_HINH = PP.CAU_HINH = {
    TINH_HOA: "phi_phong_tinh_hoa",
    GIA_TINH_HOA: 60,          // Linh Thạch / 1 Tinh Hoa mua ở Rem
    MUA_MOI_NGAY: 3,
    ROI_QUAI: 0.02,            // quái thường
    ROI_BOSS: 0.6,             // boss: 60% rơi 1, thêm 30% rơi cái thứ hai
    THAT_BAI_GIU_LAI: 0.5      // thất bại: giữ lại một nửa số Tinh Hoa
  };

  /* ------------------------------------------------------------------ bảng cấp
   * mau: bảng màu pixel; nang: chi phí nâng TỪ cấp này lên cấp kế (tinh hoa, linh thạch, tỉ lệ) */
  var CAP = PP.CAP = [
    { ten: "Siêu Phàm Hy Ký", grade: "Phàm phẩm thượng", realm: null, hp: 6, bp: 4, resist: 0,
      nang: [1, 50, 1], mau: { tren: "#a8389e", duoi: "#6e1c6c", vien: "#d070c8", co: "#d8a840" } },
    { ten: "Xuất Trần Kinh Hồng", grade: "Phàm phẩm thượng", realm: "luyen_khi_1", hp: 10, bp: 7, resist: .01,
      nang: [2, 100, 1], mau: { tren: "#e04ad0", duoi: "#8e22a0", vien: "#ff9af0", co: "#f0c050", khoa: "#ffe0ff" } },
    { ten: "Lăng Tuyệt Vụ Ảnh", grade: "Linh phẩm hạ", realm: "luyen_khi_3", hp: 15, bp: 10, resist: .01,
      nang: [3, 200, .9], mau: { tren: "#e8602f", duoi: "#b8381c", vien: "#f0c060", co: "#e8b84a" } },
    { ten: "Kinh Thế Độc Vũ", grade: "Linh phẩm hạ", realm: "luyen_khi_5", hp: 20, bp: 14, resist: .02,
      nang: [4, 300, .8], mau: { tren: "#ff8a32", duoi: "#d4501a", vien: "#ffd060", co: "#ffcf4a", khoa: "#7fe0ff", hoa: "#ffc070" } },
    { ten: "Ngự Không Phùng Hư", grade: "Linh phẩm trung", realm: "luyen_khi_7", hp: 28, bp: 20, resist: .02, sp: 4,
      nang: [5, 500, .7], mau: { tren: "#8fd0ff", duoi: "#2b5fd0", vien: "#e8f6ff", co: "#cfeaff", vai: "gai", mauVai: "#e6f6ff", vai2: "#9fd2ff", gio: "#dff3ff" } },
    { ten: "Hỗn Thiên Trấn Nguyên", grade: "Linh phẩm trung", realm: "luyen_khi_9", hp: 36, bp: 26, resist: .03, sp: 6,
      nang: [6, 700, .6], mau: { tren: "#6ab4ff", duoi: "#1a338f", vien: "#bfe2ff", co: "#d8ecff", vai: "gaiLon", mauVai: "#d9eeff", vai2: "#7fb6ff", hao: "#6fb6ff", khoa: "#ffffff" } },
    { ten: "Sồ Phượng Linh Vũ", grade: "Linh phẩm thượng", realm: "luyen_khi_11", hp: 46, bp: 34, resist: .04, sp: 8, mp: 8,
      nang: [7, 1000, .5], mau: { tren: "#e0344e", duoi: "#b0203c", vien: "#ffb04a", co: "#f0a030", gau: "#ff86a8", vai: "canh", mauVai: "#ffb04a", vai2: "#ff7a2a", lap: "#ffd27a", hao: "#ff6a5a" } },
    { ten: "Tiềm Long Ngâm Uyên", grade: "Linh phẩm thượng", realm: "luyen_khi_13", hp: 58, bp: 44, resist: .05, sp: 10, mp: 10, aura: "tiemlong",
      nang: [8, 1500, .4], mau: { tren: "#e8304a", duoi: "#a01834", vien: "#ffd060", co: "#ffc23a", gau: "#ff86a8", vai: "canh", mauVai: "#ffd060", vai2: "#ff9a2a", vay: "#ff6080", lap: "#fff0b0", hao: "#ff8a4a", khoa: "#ff3a3a" } },
    { ten: "Truyền Thuyết Chí Tôn", grade: "Địa phẩm hạ", realm: "truc_co_1", hp: 72, bp: 56, resist: .06, sp: 12, mp: 12, aura: "chiton",
      nang: [9, 2000, .3], mau: { tren: "#6a4428", duoi: "#3a2414", vien: "#ffd34a", co: "#ffd34a", gau: "#e8b030", vai: "sung", mauVai: "#ffe07a", vai2: "#c8901a", lap: "#fff3b0", hao: "#ffcf4a", khoa: "#7fffd0" } },
    { ten: "Vô Song Vương Giả", grade: "Địa phẩm trung", realm: "truc_co_2", hp: 88, bp: 70, resist: .07, sp: 14, mp: 14, aura: "vosong",
      nang: [10, 3000, .25], mau: { tren: "#5a3820", duoi: "#2a180c", vien: "#ffe060", co: "#ffe060", gau: "#ffd040", vai: "sungLon", mauVai: "#fff0a0", vai2: "#d89a1a", lap: "#ffffff", hao: "#ffd84a", khoa: "#ff4a6a", vien2: "#b07a10" } },
    { ten: "Huyền Tinh Đại Thánh", grade: "Thiên phẩm hạ", realm: "truc_co_2", hp: 110, bp: 90, resist: .08, sp: 18, mp: 18, aura: "huyentinh",
      nang: null, mau: { tren: "#fff0a0", duoi: "#e0a020", vien: "#fffbe0", co: "#fff4c0", gau: "#ffcf40", vai: "lua", mauVai: "#fff4b8", vai2: "#ffd040", lap: "#ffffff", hao: "#fff0a0", khoa: "#ffffff", lua: true } }
  ];
  // vòng sáng dưới chân: ảnh dải khung (w,h mỗi khung; ax,ay = điểm đặt chân; iv = ms/khung)
  var AURA = PP.AURA = {
    tiemlong: { w: 90, h: 90, n: 12, ax: 44, ay: 47, iv: 100 },
    chiton: { w: 96, h: 60, n: 48, ax: 51, ay: 28, iv: 80 },
    vosong: { w: 100, h: 109, n: 12, ax: 50, ay: 71, iv: 79 },
    huyentinh: { w: 100, h: 88, n: 20, ax: 50, ay: 54, iv: 90 }
  };
  var AURA_VER = "1";

  PP.id = function (idx) { return "phi_phong_" + (idx + 1); };
  PP.capCuaVat = function (id) { var it = id && P.ITEMS[id]; return it && typeof it.phiPhongCap === "number" ? it.phiPhongCap : -1; };

  /* ------------------------------------------------------------------ vật phẩm */
  var MO_TA = [
    "Tấm phi phong tím thẫm cổ viền kim tuyến — món đồ đầu tiên của kẻ mới bước chân vào đường tu.",
    "Lụa tím hồng nhẹ như cánh hạc, khoá cài bằng ngọc trai trắng. Bay lên mới thấy hết dáng thanh thoát.",
    "Phi phong đỏ cam may từ sợi tơ sương núi, viền vàng nhạt. Gió thổi qua để lại vệt mờ như sương khói.",
    "Gấm cam thêu hoa vàng, khoá cài ngọc lam. Người khoác nó đứng giữa đám đông vẫn nổi bật một mình.",
    "Lụa lam nhạt chuyển xanh thẫm, vai đính lông vũ trắng. Mỗi bước đi đều có gió lướt theo.",
    "Gấm xanh trầm vai cài gai lông lớn, quanh mép phi phong toả quầng lam nhè nhẹ.",
    "Đỏ thẫm viền vàng, vai đính cánh phượng nhỏ, gấu thêu hồng. Đi tới đâu đốm lửa vàng bay lên tới đó.",
    "Đỏ thẫm thêu vảy rồng, khoá cài huyết ngọc. Dưới chân bùng vòng lửa đỏ của rồng ẩn dưới vực.",
    "Da nâu sẫm viền vàng ròng, hai vai dựng sừng vàng. Dưới chân rồng vàng cuộn quanh không dứt.",
    "Nâu đen viền vàng hai lớp, sừng vàng lớn trên vai. Sấm sét tím vây quanh người khoác.",
    "Tơ vàng óng như nắng, lụa bay rực rỡ trên vai, gấu toả lửa vàng. Dưới chân sen vàng xoay nở."
  ];
  CAP.forEach(function (c, i) {
    var it = {
      id: PP.id(i), name: "Phi Phong " + c.ten, type: "vat_pham", slot: "phi_phong", grade: c.grade,
      hpBonus: c.hp, bpBonus: c.bp, phiPhongCap: i, ngoaiTrang: true, icon: "phi_phong_" + (i + 1),
      desc: MO_TA[i] + " (Phi phong cấp " + (i + 1) + "/11" + (c.aura ? " · có vòng sáng dưới chân" : "") + ". Nâng cấp ở chỗ Rem, Chân Núi Tản Viên.)"
    };
    if (c.realm) it.requireRealm = c.realm;
    if (c.resist) it.resistBonus = c.resist;
    if (c.sp) it.spBonus = c.sp;
    if (c.mp) it.mpBonus = c.mp;
    P.ITEMS[it.id] = it;
  });
  P.ITEMS[CAU_HINH.TINH_HOA] = {
    id: CAU_HINH.TINH_HOA, name: "Phi Phong Tinh Hoa", type: "vat_pham", grade: "Linh phẩm hạ",
    icon: "phi_phong_tinh_hoa",
    desc: "Sợi tơ linh quang kết từ tinh khí yêu thú. Đem tới chỗ Rem ở Chân Núi Tản Viên để dệt thêm vào phi phong, nâng lên cấp cao hơn. Quái nào cũng có thể rơi, boss rơi nhiều hơn."
  };

  /* ------------------------------------------------------------------ ô trang bị */
  var INV = P.Inventory;
  if (INV && INV.slots && !INV.slots.some(function (s) { return s.id === "phi_phong"; })) {
    INV.slots.push({ id: "phi_phong", name: "Phi Phong", mark: "PHONG", ngoaiTrang: true });   // ô Ngoại Trang: không hiện trên bảng Trang Bị
    if (INV.equipment && !("phi_phong" in INV.equipment)) INV.equipment.phi_phong = null;
  }

  /* ------------------------------------------------------------------ tiện ích màu */
  function hex(c) { return [parseInt(c.slice(1, 3), 16), parseInt(c.slice(3, 5), 16), parseInt(c.slice(5, 7), 16)]; }
  function lerp(a, b, k) { return a + (b - a) * k; }
  var memo = {};
  function tron(a, b, k) {
    k = Math.round(k * 24) / 24;
    var key = a + b + k, v = memo[key];
    if (v) return v;
    var x = hex(a), y = hex(b);
    return (memo[key] = "rgb(" + Math.round(lerp(x[0], y[0], k)) + "," + Math.round(lerp(x[1], y[1], k)) + "," + Math.round(lerp(x[2], y[2], k)) + ")");
  }
  function toiDi(c, k) {
    var key = c + "*" + k, v = memo[key];
    if (v) return v;
    var x = hex(c);
    return (memo[key] = "rgb(" + Math.round(x[0] * k) + "," + Math.round(x[1] * k) + "," + Math.round(x[2] * k) + ")");
  }
  function hash(a, b) { var h = Math.imul(a | 0, 374761393) + Math.imul(b | 0, 668265263) | 0; h = Math.imul(h ^ h >>> 13, 1274126177); return ((h ^ h >>> 16) >>> 0) / 4294967296; }
  function hang(diem, y) {
    for (var i = 0; i < diem.length - 1; i++) {
      var a = diem[i], b = diem[i + 1];
      if (y >= a[0] && y <= b[0]) { var k = (y - a[0]) / Math.max(1, b[0] - a[0]); return [Math.round(lerp(a[1], b[1], k)), Math.round(lerp(a[2], b[2], k))]; }
    }
    return null;
  }

  /* ------------------------------------------------------------------ hình dáng
   * Khung 32x64, chân y≈61, vai y≈23. dir: 0 xuống, 1 trái, 2 phải, 3 lên. buoc 0..3 nhịp đi. */
  function hinhDang(dir, buoc, t, cap) {
    var lay = [0, 1, 0, -1][buoc & 3], gio = Math.sin(t * 3) * 0.6, dai = cap.lua ? 2 : 0;
    if (dir === 0) return { sau: true, diem: [[23, 7, 24], [30, 5, 26], [44, 3 - (lay > 0 ? 1 : 0), 28 + (lay < 0 ? 1 : 0)], [57 + dai, 1 - lay, 30 - lay]] };
    if (dir === 3) return { sau: false, diem: [[23, 8, 23], [26, 6, 25], [40, 4, 27], [57 + dai, 2 + lay, 29 + lay]] };
    var lui = Math.round(2 + Math.abs(lay) + gio + (cap.lua ? 2 : 0));
    var d = [[23, 14, 20], [32, 15, 23 + (lui >> 1)], [44, 15, 26 + lui], [57 + dai, 15 + (lay > 0 ? 1 : 0), 28 + lui]];
    if (dir === 2) d = d.map(function (r) { return [r[0], 31 - r[2], 31 - r[1]]; });
    return { sau: true, diem: d, ben: dir };
  }

  // bút vẽ: một "điểm" = s x s pixel thật; gộp các điểm liền nhau cùng màu thành một fillRect
  function But(c, ox, oy, s) { this.c = c; this.ox = ox; this.oy = oy; this.s = s; }
  But.prototype.px = function (x, y, mau, a) {
    if (a != null && a <= 0.02) return;
    var c = this.c;
    if (a != null) c.globalAlpha = Math.min(1, a);
    c.fillStyle = mau;
    c.fillRect(this.ox + x * this.s, this.oy + y * this.s, this.s, this.s);
    if (a != null) c.globalAlpha = 1;
  };
  But.prototype.dong = function (y, x0, mangMau) {
    var c = this.c, s = this.s, bd = 0;
    for (var i = 1; i <= mangMau.length; i++) {
      if (i === mangMau.length || mangMau[i] !== mangMau[bd]) {
        c.fillStyle = mangMau[bd];
        c.fillRect(this.ox + (x0 + bd) * s, this.oy + y * s, (i - bd) * s, s);
        bd = i;
      }
    }
  };

  function veVai(b, cap, t, ben) {
    if (!cap.vai) return;
    var m = cap.mauVai, m2 = cap.vai2 || m;
    function mot(x0, huong) {
      function p(dx, dy, c) { b.px(x0 + dx * huong, dy, c); }
      var k;
      if (cap.vai === "gai" || cap.vai === "gaiLon") {
        var L = cap.vai === "gaiLon" ? 1 : 0, s = Math.round(Math.sin(t * 3) * (L ? 1 : 0));
        [[0, 24, -3, 18 - L * 3 + s], [1, 24, -5, 21 - L * 2], [-1, 24, -1, 17 - L * 4 + s]].forEach(function (g) {
          var n = 8;
          for (var q = 0; q <= n; q++) p(Math.round(lerp(g[0], g[2], q / n)), Math.round(lerp(g[1], g[3], q / n)), q > n - 3 ? m : m2);
        });
        p(0, 25, m2); p(1, 25, m2); p(-1, 25, m);
      } else if (cap.vai === "canh") {
        for (k = 0; k < 5; k++) { p(-k, 24 - (k >> 1), k % 2 ? m2 : m); p(-k, 25 - (k >> 1), m2); }
        p(-5, 22, m); p(-6, 21, m);
      } else if (cap.vai === "sung" || cap.vai === "sungLon") {
        var lon = cap.vai === "sungLon", cao = lon ? 14 : 10;
        for (k = 0; k <= cao; k++) {
          var cong = Math.round(Math.sin(k / cao * 2.2) * (lon ? 4 : 3)), y = 24 - k;
          p(-cong, y, k > cao - 3 ? m : m2);
          if (k < cao * 0.6) p(-cong + 1, y, m);
          if (k < cao * 0.3) p(-cong - 1, y, m2);
        }
        p(0, 25, m2); p(1, 25, m); p(-1, 25, m2);
      } else if (cap.vai === "lua") {
        for (k = 0; k < 12; k++) p(-2 - Math.round(Math.sin(t * 3 + k * 0.5) * 2) - (k >> 2), 22 + k, k % 3 ? m2 : m);
      }
    }
    if (ben == null) { mot(7, 1); mot(24, -1); }
    else mot(ben === 1 ? 19 : 12, ben === 1 ? -1 : 1);
  }

  /* vẽ một lớp phi phong. c: ctx; ox,oy: góc trái trên khung 32x64 (pixel thật); s: tỉ lệ;
   * lop: "sau" (trước khi vẽ thân) hoặc "truoc" (sau khi vẽ thân) */
  PP.ve = function (c, ox, oy, s, dir, buoc, t, idx, lop, ngoi) {
    var C = CAP[idx]; if (!C) return;
    var cap = C.mau, hd = hinhDang(dir, buoc, t, cap);
    var b = new But(c, ox, oy, s || 1);
    var y0 = hd.diem[0][0], y1 = hd.diem[hd.diem.length - 1][0], y, x, r;
    var laLopNay = (lop === "sau") === hd.sau;
    if (lop === "sau" && cap.hao) {
      for (y = y0 - 1; y <= y1 + 1; y++) {
        r = hang(hd.diem, Math.min(y1, Math.max(y0, y))); if (!r) continue;
        var nhip = 0.22 + 0.2 * Math.sin(t * 4 + y * 0.4);
        b.px(r[0] - 1, y, cap.hao, nhip); b.px(r[1] + 1, y, cap.hao, nhip);
        if (y === y1 + 1) for (x = r[0]; x <= r[1]; x++) b.px(x, y, cap.hao, nhip * 0.8);
      }
    }
    if (laLopNay) {
      for (y = y0; y <= y1; y++) {
        r = hang(hd.diem, y); if (!r) continue;
        var kY = (y - y0) / Math.max(1, y1 - y0), mang = [];
        for (x = r[0]; x <= r[1]; x++) {
          var kX = (x - r[0]) / Math.max(1, r[1] - r[0]);
          var mau = tron(cap.tren, cap.duoi, kY);
          if (kX > 0.68 || (x - r[0]) % 5 === 4) mau = toiDi(cap.duoi, kX > 0.68 ? 0.82 : 0.9);
          if (cap.gau && y >= y1 - 3) mau = (x + y) % 2 ? cap.gau : toiDi(cap.gau, 0.88);
          if (cap.vay && y > y0 + 3 && y < y1 - 4 && (x + (y >> 1)) % 4 === 0 && y % 2 === 0) mau = cap.vay;
          if (cap.hoa && y > y0 + 4 && y < y1 - 3 && (x + y) % 6 === 0 && (x - y + 60) % 6 === 0) mau = cap.hoa;
          if (cap.lua && (x + Math.round(Math.sin(t * 3 + y * 0.3) * 2)) % 5 === 0) mau = cap.vien;
          if ((x === r[0] || x === r[1] || y === y1) && cap.vien) mau = cap.vien;
          if (cap.vien2 && y === y1 - 1) mau = cap.vien2;
          mang.push(mau);
        }
        b.dong(y, r[0], mang);
        if (cap.lua && y === y1) for (var x2 = r[0]; x2 <= r[1]; x2 += 2) {
          var cao = 1 + Math.round(1.5 + 1.5 * Math.sin(t * 4 + x2));
          for (var h = 1; h <= cao; h++) b.px(x2, y + h, cap.vien, 0.9 - h * 0.2);
        }
      }
    }
    if (lop === "truoc") {
      if (cap.co && hd.ben == null) {
        for (var x4 = 8; x4 <= 23; x4++) { b.px(x4, 23, cap.co); if (x4 > 9 && x4 < 22) b.px(x4, 24, toiDi(cap.co, 0.8)); }
        if (dir === 0 && cap.khoa) { b.px(15, 25, cap.co); b.px(16, 25, cap.co); b.px(15, 26, cap.khoa); b.px(16, 26, cap.khoa); b.px(15, 27, cap.co); b.px(16, 27, cap.co); }
      } else if (cap.co) { var xc = hd.ben === 1 ? 17 : 14; b.px(xc, 23, cap.co); b.px(xc + 1, 23, cap.co); b.px(xc, 24, cap.co); }
      // lúc ngồi (thiền, cưỡi thú) bỏ gai/sừng vai: thân ngồi thấp nên chúng dựng lên quanh mặt
      if (!ngoi) veVai(b, cap, t, hd.ben);
      if (cap.lap) for (var i = 0; i < (idx >= 9 ? 9 : 6); i++) {
        var pha = (t * 0.7 + hash(i, idx)) % 1, yy = Math.round(lerp(y0 + 2, y1, hash(i, 7))), rr = hang(hd.diem, yy);
        if (!rr) continue;
        var sx = Math.round(lerp(rr[0] - 3, rr[1] + 3, hash(i, 3))), sy = Math.round(yy - pha * 12), a = Math.sin(pha * Math.PI);
        b.px(sx, sy, cap.lap, a);
        if (a > 0.7) { b.px(sx - 1, sy, cap.lap, a * 0.5); b.px(sx + 1, sy, cap.lap, a * 0.5); b.px(sx, sy - 1, cap.lap, a * 0.5); b.px(sx, sy + 1, cap.lap, a * 0.5); }
      }
      if (cap.gio && hd.ben != null) for (var j = 0; j < 3; j++) {
        var gy = 30 + j * 9 + Math.round(Math.sin(t * 2 + j) * 2), dd = 4 + j;
        for (var q = 0; q < dd; q++) {
          var gx = hd.ben === 1 ? 26 + q + ((t * 20 + j * 5) % 6 | 0) : 5 - q - ((t * 20 + j * 5) % 6 | 0);
          b.px(gx, gy, cap.gio, 0.7 - q * 0.1);
        }
      }
    }
  };

  /* ------------------------------------------------------------------ vòng sáng */
  var anhAura = {};
  function layAura(key) {
    var A = anhAura[key];
    if (A) return A.complete && A.naturalWidth ? A : null;
    if (typeof Image === "undefined") return null;
    A = anhAura[key] = new Image();
    A.src = "assets/sprites/fx/vong_" + key + ".png?v=" + AURA_VER;
    return null;
  }
  PP.veVong = function (c, chanX, chanY, idx, t, s) {
    var C = CAP[idx], key = C && C.aura; if (!key) return;
    var M = AURA[key], img = layAura(key); if (!M || !img) return;
    s = s || 1;
    var f = Math.floor(t * 1000 / M.iv) % M.n;
    var sm = c.imageSmoothingEnabled;
    c.imageSmoothingEnabled = true;
    c.drawImage(img, f * M.w, 0, M.w, M.h, Math.round(chanX - M.ax * s), Math.round(chanY - M.ay * s), M.w * s, M.h * s);
    c.imageSmoothingEnabled = sm;
  };

  /* ------------------------------------------------------------------ ai đang khoác gì */
  PP.capDangMac = function () {
    var id = INV && INV.equipment && INV.equipment.phi_phong;
    return PP.capCuaVat(id);
  };
  function dongBoCfg(cfg) {
    var k = PP.capDangMac();
    if (k >= 0) cfg.phiPhong = k; else if ("phiPhong" in cfg) delete cfg.phiPhong;
  }
  PP.dongBo = function () {
    var W = P.SceneWorld, pl = W && W.player;
    if (pl && pl.cfg) dongBoCfg(pl.cfg);
    if (pl && P.Player && P.Player.refreshEquipment) { try { P.Player.refreshEquipment(pl); } catch (e) {} }
    if (P.HUD) { try { if (P.HUD.refreshPortrait) P.HUD.refreshPortrait(); if (P.HUD.renderBag) P.HUD.renderBag(); } catch (e) {} }
    var k = PP.capDangMac(); if (k >= 0 && CAP[k].aura) layAura(CAP[k].aura);
  };
  function capCuaCfg(cfg) {
    if (!cfg || cfg.__khongPhong) return -1;
    var W = P.SceneWorld;
    if (W && W.player && cfg === W.player.cfg) dongBoCfg(cfg);
    return typeof cfg.phiPhong === "number" && CAP[cfg.phiPhong] ? cfg.phiPhong : -1;
  }
  function nhipBuoc(col) {
    if (col >= 0 && col < 4) return col;
    if (col >= 24 && col <= 35) return (col & 1) ? 1 : 3;
    return 0;
  }
  function gio() { return (typeof performance !== "undefined" ? performance.now() : Date.now()) / 1000; }

  /* ------------------------------------------------------------------ bọc SpriteFactory */
  var trongThan = 0;
  function bocSprite() {
    var SF = P.SpriteFactory;
    if (!SF || !SF.drawFrame || SF.__phiPhong) return !!(SF && SF.__phiPhong);
    SF.__phiPhong = true;
    var gocFrame = SF.drawFrame, gocBody = SF.drawBody;
    SF.drawFrame = function (ctx, sheet, row, col, x, y, scale, cfg) {
      var k = capCuaCfg(cfg);
      if (k < 0 || col === 22 || col === 23 || (P.MatNa && P.MatNa.dangDeo(cfg))) return gocFrame.apply(this, arguments);
      var s = scale || 1, t = gio(), b = nhipBuoc(col), dir = row & 3;
      // tư thế ngồi (thiền, cưỡi thú: cột 8/9) thân hạ xuống 9–10 px → hạ phi phong theo, thêm 3 px
      // cho cổ áo nằm dưới cằm; cắt phần gấu thừa dưới mặt đất để không lòi ra dưới chân
      var ha = col === 8 ? 12 : col === 9 ? 13 : 0, oy = (y | 0) + Math.round(ha * s);
      function lop(ten) {
        if (!ha) { PP.ve(ctx, x | 0, oy, s, dir, b, t, k, ten); return; }
        ctx.save(); ctx.beginPath(); ctx.rect((x | 0) - 16 * s, y | 0, 64 * s, 63 * s); ctx.clip();
        try { PP.ve(ctx, x | 0, oy, s, dir, b, t, k, ten, true); } finally { ctx.restore(); }
      }
      try { lop("sau"); } catch (e) {}
      var kq = gocFrame.apply(this, arguments);
      try { lop("truoc"); } catch (e) {}
      return kq;
    };
    if (gocBody) SF.drawBody = function (ctx, sheet, dir, col, x, y, cfg) {
      var k = capCuaCfg(cfg);
      thanVuaVe = cfg || null;   // tên vẽ ngay sau thân → biết gắn danh hiệu nào
      trongThan++;
      try { return gocBody.apply(this, arguments); } finally { trongThan--; }
    };
    return true;
  }

  /* ------------------------------------------------------------------ vòng sáng dưới đất
   * Vẽ ở lớp "back" của VFX.drawPlayerStatus (trước thú cưỡi / mây / thân) tại đúng mặt đất:
   * khi phi hành nhân vật bay lên nhưng vòng sáng vẫn nằm dưới đất chỗ cái bóng. */
  function bocVong() {
    var V = P.VFX;
    if (!V || !V.drawPlayerStatus || V.drawPlayerStatus.__phiPhong) return;
    var goc = V.drawPlayerStatus;
    V.drawPlayerStatus = function (ctx, x, y, ent, t, lop) {
      if (lop === "back" && ent && !ent.downed) {
        try {
          var k = capCuaCfg(ent.cfg);
          if (k >= 0 && CAP[k].aura) {
            var bay = ent.flyRise > 0 ? (window.NTBayCao ? window.NTBayCao(ent) : 10 * ent.flyRise) + 1.2 * Math.sin(3 * (ent.animTime || 0)) * ent.flyRise : 0;
            var a0 = ctx.globalAlpha;
            if (bay > 0) ctx.globalAlpha = a0 * (1 - 0.3 * Math.min(1, ent.flyRise));
            PP.veVong(ctx, x, Math.round(y + bay) - 1, k, gio(), 1);
            ctx.globalAlpha = a0;
          }
        } catch (e) {}
      }
      return goc.apply(this, arguments);
    };
    V.drawPlayerStatus.__phiPhong = true;
  }

  /* ------------------------------------------------------------------ danh hiệu cạnh tên
   * Ảnh dải khung assets/sprites/fx/danh_hieu/<key>.png (đã cắt sát chữ + quầng sáng).
   * Vẽ bên trái tên qua lớp chữ nét cao (Pixel.mapImage), cao bằng chữ tên. */
  var DANH_HIEU = PP.DANH_HIEU = [
    { key: "sieupham", w: 60, h: 24, n: 15, iv: 80 }, { key: "xuattran", w: 59, h: 22, n: 15, iv: 80 },
    { key: "langtuyet", w: 90, h: 27, n: 15, iv: 80 }, { key: "kinhthe", w: 64, h: 26, n: 15, iv: 80 },
    { key: "ngukhong", w: 61, h: 27, n: 15, iv: 80 }, { key: "honthien", w: 59, h: 27, n: 15, iv: 80 },
    { key: "sophuong", w: 58, h: 24, n: 15, iv: 80 }, { key: "tiemlong", w: 61, h: 27, n: 15, iv: 80 },
    { key: "chiton", w: 59, h: 26, n: 15, iv: 80 }, { key: "vosong", w: 61, h: 29, n: 15, iv: 80 },
    { key: "daithanh", w: 79, h: 33, n: 14, iv: 55 }
  ];
  var DH_TI_LE = 0.72, DH_VER = "3", khungDH = {};
  var thanVuaVe = null;
  function layKhungDH(idx) {
    var M = DANH_HIEU[idx]; if (!M) return null;
    var o = khungDH[M.key];
    if (o) return o.xong ? o.khung : null;
    if (typeof Image === "undefined") return null;
    o = khungDH[M.key] = { xong: false, khung: [] };
    var img = new Image();
    img.onload = function () {
      for (var i = 0; i < M.n; i++) {
        var c = document.createElement("canvas"); c.width = M.w; c.height = M.h;
        c.getContext("2d").drawImage(img, i * M.w, 0, M.w, M.h, 0, 0, M.w, M.h);
        o.khung.push(c);
      }
      o.xong = true;
    };
    img.src = "assets/sprites/fx/danh_hieu/" + M.key + ".png?v=" + DH_VER;
    return null;
  }
  // vẽ danh hiệu cấp idx; (phaiX, giuaY) = mép phải và giữa theo chiều cao (toạ độ thế giới)
  PP.veDanhHieu = function (ctx, phaiX, giuaY, idx, tiLe) {
    var M = DANH_HIEU[idx], k = layKhungDH(idx); if (!M || !k) return 0;
    tiLe = tiLe || DH_TI_LE;
    var f = k[Math.floor(gio() * 1000 / M.iv) % M.n], w = M.w * tiLe, h = M.h * tiLe;
    if (P.Pixel && P.Pixel.mapImage) P.Pixel.mapImage(ctx, phaiX - w, giuaY - h / 2, f, w, h);
    else ctx.drawImage(f, phaiX - w, giuaY - h / 2, w, h);
    return w;
  };
  function bocTen() {
    var R = P.RemotePlayer;
    if (!R || !R.veTenCoDau || R.veTenCoDau.__phiPhong) return;
    var goc = R.veTenCoDau;
    R.veTenCoDau = function (ctx, x, y, ten, mau, font, tong, coChien) {
      var kq = goc.apply(this, arguments);
      var cfg = thanVuaVe; thanVuaVe = null;
      try {
        var k = capCuaCfg(cfg);
        if (k >= 0 && (!cfg.name || String(cfg.name).toLowerCase() === String(ten))) {
          var rong = P.Pixel && P.Pixel.textWidthFor ? P.Pixel.textWidthFor(ctx, ten, font) : 6 * String(ten).length;
          var lech = tong && P.Sect ? 17 : 0;
          PP.veDanhHieu(ctx, x - rong / 2 - 2 - lech, y - 3, k);
        }
      } catch (e) {}
      return kq;
    };
    R.veTenCoDau.__phiPhong = true;
  }
  // dạng biến hình (cfgHinh) sao chép cả cfg — không khoác phi phong khi đã hoá hình
  function bocBienHinh() {
    var PL = P.Player;
    if (!PL || !PL.cfgHinh || PL.cfgHinh.__phiPhong) return;
    var goc = PL.cfgHinh;
    PL.cfgHinh = function () {
      var c = goc.apply(this, arguments);
      if (c && "phiPhong" in c) delete c.phiPhong;
      if (c) c.__khongPhong = true;
      return c;
    };
    PL.cfgHinh.__phiPhong = true;
  }

  /* ------------------------------------------------------------------ biểu tượng vật phẩm */
  var bieuTuong = {};
  function veBieuTuong(key) {
    if (bieuTuong[key]) return bieuTuong[key];
    if (typeof document === "undefined") return null;
    var cv = document.createElement("canvas"), c = cv.getContext("2d");
    if (key === "phi_phong_tinh_hoa") {
      cv.width = cv.height = 16;
      var g = c.createRadialGradient(8, 8, 1, 8, 8, 7);
      g.addColorStop(0, "#fffbe0"); g.addColorStop(0.45, "#ffcf4a"); g.addColorStop(1, "rgba(255,120,200,0)");
      c.fillStyle = g; c.fillRect(0, 0, 16, 16);
      c.fillStyle = "#ff86c8";
      [[3, 6], [4, 5], [5, 4], [6, 4], [9, 11], [10, 11], [11, 10], [12, 9]].forEach(function (p) { c.fillRect(p[0], p[1], 1, 1); });
      c.fillStyle = "#ffffff"; c.fillRect(7, 7, 2, 2);
    } else {
      var idx = (parseInt(key.slice(10), 10) || 1) - 1;
      cv.width = 40; cv.height = 48;
      PP.ve(c, 4, -12, 1, 3, 0, 0.6, idx, "sau");
      PP.ve(c, 4, -12, 1, 3, 0, 0.6, idx, "truoc");
    }
    bieuTuong[key] = cv;
    return cv;
  }
  function bocAssets() {
    var A = P.Assets;
    if (!A || !A.item || A.item.__phiPhong) return;
    var goc = A.item;
    A.item = function (key) {
      if (typeof key === "string" && key.indexOf("phi_phong_") === 0) return veBieuTuong(key);
      return goc.apply(this, arguments);
    };
    A.item.__phiPhong = true;
  }

  /* ------------------------------------------------------------------ rơi Tinh Hoa */
  function bocLoot() {
    var L = P.Loot;
    if (!L || !L.rollKill || L.rollKill.__phiPhong) return;
    var goc = L.rollKill;
    L.rollKill = function (a, t, e) {
      var o = goc.apply(this, arguments);
      if (!a || !Array.isArray(o)) return o;
      var rnd = e || Math.random, boss = !!(a.def && a.def.isBoss);
      if (a.def && a.def.ntBot && a.def.ntBot.kieu !== "tatu") return o;   // tỉ thí với bot không rơi
      if (boss) {
        if (rnd() < CAU_HINH.ROI_BOSS) o.push(CAU_HINH.TINH_HOA);
        if (rnd() < CAU_HINH.ROI_BOSS * 0.5) o.push(CAU_HINH.TINH_HOA);
      } else if (rnd() < CAU_HINH.ROI_QUAI * (a.def && a.def.ntBot ? 5 : 1)) o.push(CAU_HINH.TINH_HOA);
      return o;
    };
    L.rollKill.__phiPhong = true;
  }

  /* ------------------------------------------------------------------ bot cũng khoác phi phong */
  function bocBot() {
    var B = P.NTBot;
    if (!B || !B.hoSo || B.hoSo.__phiPhong) return;
    var goc = B.hoSo;
    B.hoSo = function (ma, realmId) {
      var hs = goc.apply(this, arguments);
      try {
        var ri = P.realmIndexById ? P.realmIndexById(hs.realm) : 1, toiDa = -1;
        CAP.forEach(function (c, i) { if (!c.realm || (P.realmIndexById && P.realmIndexById(c.realm) <= ri)) toiDa = i; });
        var h = (((ma | 0) * 2654435761) >>> 0) % 1000 / 1000;
        if (toiDa >= 0 && h > 0.25) {
          var k = Math.max(0, toiDa - Math.floor(((h * 7.3) % 1) * 4));
          hs.cfg.phiPhong = k;
          hs.equip = Object.assign({}, hs.equip || {}, { phi_phong: PP.id(k) });
        }
      } catch (e) {}
      return hs;
    };
    B.hoSo.__phiPhong = true;
  }

  /* ------------------------------------------------------------------ Rem: nhận, mua, nâng cấp */
  function flags() { var Q = P.Quest; if (!Q) return null; Q.flags = Q.flags || {}; return Q.flags; }
  function luu() { try { if (P.Quest && P.Quest.save) P.Quest.save(); } catch (e) {} }
  function homNay() { return new Date(Date.now() + 252e5).toISOString().slice(0, 10); }
  function soDo() { var f = flags() || {}; var d = f.ntPhiPhong || (f.ntPhiPhong = {}); if (d.ngay !== homNay()) { d.ngay = homNay(); d.mua = 0; } return d; }
  function da() { return P.Progress ? P.Progress.stones | 0 : 0; }
  function tieuDa(n) { var Pr = P.Progress; if (!Pr) return false; if (Pr.spendStones) return Pr.spendStones(n); if ((Pr.stones | 0) < n) return false; Pr.stones -= n; return true; }
  function hop(t, noiDung, o) { if (P.HUD && P.HUD.openDialog) P.HUD.openDialog(t, noiDung, o || {}); }
  function caption(t) { if (P.HUD && P.HUD.setCaption) P.HUD.setCaption(t); }
  function amThanh(id) { try { if (P.Audio && P.Audio.play) P.Audio.play(id); } catch (e) {} }
  function coPhiPhongNao() {
    for (var i = 0; i < CAP.length; i++) { var id = PP.id(i); if (INV.count(id) > 0 || INV.equipment.phi_phong === id) return true; }
    return false;
  }
  function tenCanhGioi(id) { return id ? (INV.realmNeedName ? INV.realmNeedName({ requireRealm: id }) : id) : "Phàm Nhân"; }
  function chiSo(i) {
    var c = CAP[i], s = ["Khí Huyết +" + c.hp, "Giáp +" + c.bp];
    if (c.resist) s.push("Kháng +" + Math.round(c.resist * 100) + "%");
    if (c.sp) s.push("Thần Thức +" + c.sp);
    if (c.mp) s.push("Linh Lực +" + c.mp);
    return s.join(" · ");
  }
  function hieuUng(ok) {
    var W = P.SceneWorld, pl = W && W.player, V = P.VFX;
    if (!pl || !V) return;
    if (V.spawnRing) { V.spawnRing(pl.x, pl.y - 20, ok ? "#ffd34a" : "#8a8a9a", ok ? 34 : 20, .6); if (ok) V.spawnRing(pl.x, pl.y - 20, "#ff86c8", 22, .45); }
    if (V.spawnText) V.spawnText(pl.x, pl.y - 56, ok ? "Nâng cấp thành công!" : "Thất bại…", ok ? "#ffe07a" : "#c0c0cc");
  }

  PP.luaChonRem = function (npc) {
    var k = PP.capDangMac();
    return { label: "Phi Phong", icon: k >= 0 ? "phi_phong_" + (k + 1) : CAU_HINH.TINH_HOA,
      note: k >= 0 ? "Đang khoác cấp " + (k + 1) + " · nâng cấp, mua Tinh Hoa" : "Nhận, nâng cấp phi phong", onChoose: function () { PP.mo(npc); } };
  };

  PP.mo = function (npc) {
    var ten = (npc && npc.name || "Rem") + " · Phi Phong";
    var d = soDo(), k = PP.capDangMac(), th = INV.count(CAU_HINH.TINH_HOA), ch = [], loi;
    if (k < 0) {
      if (!d.daNhan && !coPhiPhongNao()) {
        ch.push({ label: "Nhận Phi Phong " + CAP[0].ten, icon: "phi_phong_1", primary: true, note: "Quà tặng cho người mới · " + chiSo(0), onChoose: function () {
          d.daNhan = true; INV.addBound(PP.id(0), 1); INV.equip(PP.id(0)); luu(); PP.dongBo(); hieuUng(true); amThanh("coin");
          hop(ten, 'Rem phủi phẳng nếp áo rồi khoác lên vai đạo hữu:\n\n"Phi phong Siêu Phàm này hợp với người đấy. Gom thêm Phi Phong Tinh Hoa rồi quay lại, Rem dệt cho đẹp hơn nữa."', { choices: [{ label: "Xem phi phong", onChoose: function () { PP.mo(npc); } }] });
        } });
      }
      loi = coPhiPhongNao() ? "Đạo hữu chưa khoác phi phong. Mở Hành Trang → Ngoại Trang, khoác phi phong lên rồi quay lại để nâng cấp." : "";
    } else if (CAP[k].nang) {
      var n = CAP[k].nang, sau = CAP[k + 1], duCG = INV.realmOk(P.ITEMS[PP.id(k + 1)]);
      var thieu = th < n[0] ? "thiếu " + (n[0] - th) + " Tinh Hoa" : da() < n[1] ? "thiếu " + (n[1] - da()) + " Linh Thạch" : !duCG ? "cần " + tenCanhGioi(sau.realm) : "";
      ch.push({ label: "Nâng lên cấp " + (k + 2) + " · " + sau.ten, icon: "phi_phong_" + (k + 2), primary: !thieu, disabled: !!thieu,
        note: n[0] + " Tinh Hoa · " + n[1] + " Linh Thạch · thành công " + Math.round(n[2] * 100) + "%" + (thieu ? " · " + thieu : ""),
        desc: chiSo(k + 1) + (sau.aura ? " · vòng sáng dưới chân" : ""),
        onChoose: function () { nangCap(npc, k); } });
    }
    var conMua = CAU_HINH.MUA_MOI_NGAY - (d.mua | 0);
    ch.push({ label: "Mua Phi Phong Tinh Hoa", icon: CAU_HINH.TINH_HOA, disabled: conMua <= 0 || da() < CAU_HINH.GIA_TINH_HOA,
      note: CAU_HINH.GIA_TINH_HOA + " Linh Thạch · hôm nay còn " + Math.max(0, conMua) + "/" + CAU_HINH.MUA_MOI_NGAY,
      onChoose: function () {
        if (!tieuDa(CAU_HINH.GIA_TINH_HOA)) { amThanh("deny"); return caption("Không đủ Linh Thạch."); }
        d.mua = (d.mua | 0) + 1; INV.add(CAU_HINH.TINH_HOA, 1); luu(); amThanh("coin");
        if (P.HUD && P.HUD.refreshBag) P.HUD.refreshBag();
        PP.mo(npc);
      } });
    ch.push({ label: "Xem 11 cấp phi phong", note: "Chỉ số, cảnh giới cần, vòng sáng", onChoose: function () { PP.bangCap(npc, 0); } });
    var dau = k >= 0
      ? "Đang khoác: Phi Phong " + CAP[k].ten + " (cấp " + (k + 1) + "/11)\n" + chiSo(k) + (CAP[k].nang ? "" : "\n\nĐã là cấp cao nhất — Rem chẳng còn gì để dệt thêm nữa.")
      : 'Rem nghiêng đầu nhìn vai đạo hữu:\n\n"Tu sĩ mà không có tấm phi phong thì trông lạnh lẽo lắm."';
    hop(ten, dau + (loi ? "\n\n" + loi : "") + "\n\nTrong túi: " + th + " Phi Phong Tinh Hoa · " + da() + " Linh Thạch", { choices: ch, oneCol: true });
  };

  function nangCap(npc, k) {
    var n = CAP[k] && CAP[k].nang; if (!n || PP.capDangMac() !== k) return;
    var ten = (npc && npc.name || "Rem") + " · Phi Phong";
    if (INV.count(CAU_HINH.TINH_HOA) < n[0] || da() < n[1] || !INV.realmOk(P.ITEMS[PP.id(k + 1)])) { amThanh("deny"); return PP.mo(npc); }
    if (!tieuDa(n[1])) { amThanh("deny"); return PP.mo(npc); }
    var ok = Math.random() < n[2];
    if (ok) {
      INV.remove(CAU_HINH.TINH_HOA, n[0]);
      INV.equipment.phi_phong = PP.id(k + 1);
    } else {
      INV.remove(CAU_HINH.TINH_HOA, n[0] - Math.floor(n[0] * CAU_HINH.THAT_BAI_GIU_LAI));
    }
    luu(); PP.dongBo(); hieuUng(ok); amThanh(ok ? "coin" : "deny");
    if (ok && P.Chat && P.Chat.system && k + 1 >= 7) { try { P.Chat.system("Phi phong của đạo hữu đã lên cấp " + (k + 2) + ": " + CAP[k + 1].ten + "!"); } catch (e) {} }
    hop(ten, ok
      ? 'Sợi tơ cuối cùng vừa thắt nút, phi phong bừng sáng.\n\nĐã lên cấp ' + (k + 2) + ": Phi Phong " + CAP[k + 1].ten + "\n" + chiSo(k + 1) + (CAP[k + 1].aura && !CAP[k].aura ? "\n\nDưới chân đạo hữu đã hiện vòng sáng!" : "")
      : 'Rem lắc đầu, gỡ sợi tơ vừa đứt ra:\n\n"Lần này chưa thành. Phi phong vẫn nguyên cấp cũ — còn giữ lại được ' + Math.floor(n[0] * CAU_HINH.THAT_BAI_GIU_LAI) + ' Tinh Hoa."',
      { choices: [{ label: "Tiếp tục", onChoose: function () { PP.mo(npc); } }] });
  }

  PP.bangCap = function (npc, trang) {
    var moiTrang = 6, ds = CAP.slice(trang * moiTrang, trang * moiTrang + moiTrang), k = PP.capDangMac();
    var ch = ds.map(function (c, j) {
      var i = trang * moiTrang + j;
      return { label: "Cấp " + (i + 1) + " · " + c.ten + (i === k ? "  (đang khoác)" : ""), icon: "phi_phong_" + (i + 1), disabled: true,
        note: c.grade + " · " + (c.realm ? "cần " + tenCanhGioi(c.realm) : "không cần cảnh giới") + (c.aura ? " · vòng sáng" : ""), desc: chiSo(i) };
    });
    if ((trang + 1) * moiTrang < CAP.length) ch.push({ label: "Trang sau", onChoose: function () { PP.bangCap(npc, trang + 1); } });
    if (trang > 0) ch.push({ label: "Trang trước", onChoose: function () { PP.bangCap(npc, trang - 1); } });
    ch.push({ label: "Quay lại", onChoose: function () { PP.mo(npc); } });
    hop((npc && npc.name || "Rem") + " · Các cấp phi phong", "Nâng từng cấp một ở chỗ Rem. Thất bại không tụt cấp, chỉ mất Linh Thạch và một nửa số Tinh Hoa.", { choices: ch, oneCol: true });
  };

  /* ------------------------------------------------------------------ khởi động */
  function caiDat() {
    bocSprite(); bocAssets(); bocLoot(); bocBot(); bocTen(); bocBienHinh(); bocVong();
    if (P.ITEMS && P.clearItemIcons) { /* biểu tượng tự vẽ lần đầu khi cần */ }
  }
  caiDat();
  if (typeof window !== "undefined") {
    if (typeof document !== "undefined" && document.readyState === "loading") document.addEventListener("DOMContentLoaded", caiDat);
    window.addEventListener("load", caiDat);
  }
  PP._caiDat = caiDat;
})(window.PNTT);
