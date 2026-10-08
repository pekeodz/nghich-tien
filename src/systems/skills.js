!function (n) {
  "use strict";
  var e = n.Skills = {};
  var t = void 0 !== window.location ? window.location : null;
  var a = !!t && ("localhost" === t.hostname || "127.0.0.1" === t.hostname || "[::1]" === t.hostname || "::1" === t.hostname);
  e.testMode = !(!a || !/(?:^|[?&])skilltest=1(?:&|$)/.test(t.search || ""));
  var o = t && (t.search || "").match(/(?:^|[?&])skill=([^&]+)/);
  function i(n, e) {
    return !(!e || !n.Inventory) && (n.Inventory.owns ? n.Inventory.owns(e.book, 1) : n.Inventory.has(e.book, 1));
  }
  function r(n, t) {
    if (e.testMode) {
      return !0;
    }
    var a = t.sp || 0;
    return !((n.sp || 0) < a || (n.sp -= a, 0));
  }
  function h(n, e, t) {
    var a = n.biDongFx || (n.biDongFx = []);
    if (a.length >= 8) {
      a.shift();
    }
    var o = { s: e };
    if (t) {
      for (var i in t)
        o[i] = t[i];
    }
    a.push(o);
  }
  function u(n) {
    return n.passiveCds || (n.passiveCds = {});
  }
  function s(n, e) {
    return Math.max(0, Math.floor((n || 0) - (e || 0)));
  }
  function l(e, t) {
    var a = n.Player && n.Player.healMult ? n.Player.healMult(e) : 1;
    var o = Math.min(Math.round(t * a), s(e.hpMax, e.hp));
    if (o > 0) {
      e.hp += o;
    }
    return o > 0 ? o : 0;
  }
  e.testActive = o ? decodeURIComponent(o[1]) : "hoa_cau";
  e.testPassive = null;
  e.DEFS = { hoa_cau: { id: "hoa_cau", short: "Hỏa Cầu", name: "Hỏa Cầu Thuật", book: "bi_tich_hoa_cau", element: "Hỏa", glyph: "✹", shape: "bolt", cooldown: 6, cast: .4, mp: 14, sp: 4, range: 124, speed: 138, shots: 1, spread: 0, coef: 1.8, hitR: 13, blastR: 22, effect: { kind: "burn", time: 3, dpsCoef: .15 }, colors: { core: "#fff3c4", mid: "#ff9a3c", edge: "#d63b1f", glow: "#ffd27a" }, tip: "Đạn lửa nổ diện rộng, thiêu đốt 3 giây sau khi trúng." }, phong_nhan: { id: "phong_nhan", short: "Phong Nhẫn", name: "Phong Nhẫn Thuật", book: "bi_tich_phong_nhan", element: "Phong", glyph: "⟩", shape: "bolt", cooldown: 3.4, cast: .22, mp: 9, sp: 3, range: 112, speed: 246, shots: 3, spread: 26, coef: 1.7, hitR: 9, blastR: 0, effect: null, colors: { core: "#f2fff6", mid: "#9ff0c8", edge: "#3d9e77", glow: "#cdf5e0" }, tip: "Ba lưỡi gió toả nan quạt, thi triển nhanh, khó né." }, bang_thau: { id: "bang_thau", short: "Băng Châm", name: "Băng Thấu Châm", book: "bi_tich_bang_thau", element: "Băng", glyph: "❊", shape: "bolt", cooldown: 5, cast: .3, mp: 13, sp: 5, range: 104, speed: 208, shots: 5, spread: 18, coef: 1.7, hitR: 8, blastR: 0, effect: { kind: "slow", time: 3.2, mult: .5 }, colors: { core: "#f4fdff", mid: "#a9e4ff", edge: "#2f7fb8", glow: "#cdf1ff" }, tip: "Năm đinh băng găm liên tiếp, mục tiêu chậm còn một nửa trong 3 giây." }, dia_thich: { id: "dia_thich", short: "Địa Thích", name: "Địa Thích Thuật", book: "bi_tich_dia_thich", element: "Thổ", glyph: "⩕", shape: "ground", cooldown: 7.5, cast: .42, mp: 16, sp: 6, range: 92, speed: 0, shots: 1, spread: 0, coef: 1.8, hitR: 0, blastR: 28, delay: .35, instantOnPress: !0, effect: { kind: "stun", time: 1.3 }, colors: { core: "#e0cba0", mid: "#a97b4a", edge: "#5b3d22", glow: "#c9a45c" }, tip: "Cọc đá trồi lên từ góc khuất, gây choáng 1.3 giây." }, xich_chan: { id: "xich_chan", short: "Xích Chân", name: "Sơ Xích Chân", book: "bi_tich_so_xich_chan", element: "Thổ", glyph: "✣", shape: "ground", cooldown: 12, cast: .42, mp: 12, sp: 4, range: 132, speed: 0, shots: 1, spread: 0, coef: .7, hitR: 0, blastR: 54, delay: .18, primaryTarget: !0, maxTargets: 1, playerTargetOnly: !0, effect: { kind: "root", time: 2 }, colors: { core: "#fff0dc", mid: "#d84b3f", edge: "#541326", glow: "#ff7267" }, tip: "Kết ấn dưới chân một người chơi trong tầm, trói tối đa 2 người suốt 2 giây. Người bị xích vẫn đánh và thi triển chiêu được; sát thương nhẹ." }, ngu_kiem_sat: { id: "ngu_kiem_sat", short: "Ngũ Kiếm Sát", name: "Ngũ Kiếm Sát", book: "bi_tich_ngu_kiem_sat", element: "Kim", glyph: "✦", shape: "ground", medium: !0, boostWeapon: "huyet_kiem", maxTargets: 4, cooldown: 8.5, cast: .48, mp: 20, sp: 8, range: 118, speed: 0, shots: 1, spread: 0, coef: 5.2, hitR: 0, blastR: 38, delay: .12, vfx: "skill1", effect: null, colors: { core: "#fff2ff", mid: "#bca8ff", edge: "#5c3f9b", glow: "#d8c8ff" }, tip: "Năm kiếm ảnh đồng loạt khóa tâm trận, chém quét tối đa 4 mục tiêu. Có Huyết Kiếm trong hành trang: sát thương đầy đủ; thiếu pháp khí: còn 50%." }, huyet_kiem_tran: { id: "huyet_kiem_tran", short: "Huyết Kiếm Trận", name: "Huyết Kiếm Trận", book: "bi_tich_huyet_kiem_tran", element: "Huyết", glyph: "✣", shape: "ground", medium: !0, boostWeapon: "huyet_kiem", maxTargets: 4, cooldown: 10, cast: .52, mp: 24, sp: 10, range: 126, speed: 0, shots: 1, spread: 0, coef: 5.6, hitR: 0, blastR: 46, delay: .16, vfx: "luojian", effect: null, colors: { core: "#fff0ef", mid: "#ff5361", edge: "#8d1528", glow: "#ff8190" }, tip: "Huyết kiếm liên tiếp cắm xuống đất, chấn động và gây sát thương lên tối đa 4 mục tiêu. Có Huyết Kiếm trong hành trang: sát thương đầy đủ; thiếu pháp khí: còn 50%." }, van_kiem_quy_tong: { id: "van_kiem_quy_tong", short: "Vạn Kiếm Quy Tông", name: "Vạn Kiếm Quy Tông", book: "bi_tich_van_kiem_quy_tong", element: "Kiếm", glyph: "✺", medium: !0, dao: "chinh", requireRealm: "truc_co_2", thuongPham: !0, shape: "ground", cooldown: 12, cast: .65, mp: 35, sp: 15, range: 220, speed: 0, shots: 1, spread: 0, coef: 9, hitR: 0, blastR: 0, delay: 2.6, hitDelay: 2.6, waitForTarget: 60, releaseDelay: 1.15, vfx: "van_kiem_quy_tong", effect: null, colors: { core: "#edffff", mid: "#88dbde", edge: "#316979", glow: "#a8f5ee" }, tip: "Triệu hồi 24 binh khí chân khí xoay quanh người tối đa 60 giây để chờ mục tiêu hợp lệ, rồi cùng lao đúng vào mục tiêu. Mỗi lúc chỉ một lượt kiếm: đánh xong mới gọi được lượt mới. Hình và màu theo kiếm, đao hoặc thương tương thích đang trang bị; trang bị khác dùng hình Thiết Kiếm. Hào quang là hiệu ứng thị giác, không cấp miễn thương." }, cuu_huyet_kiem_tran: { id: "cuu_huyet_kiem_tran", short: "Cửu Huyết Kiếm Trận", name: "Cửu Huyết Kiếm Trận", book: "bi_tich_cuu_huyet_tran", element: "Huyết", glyph: "✥", shape: "aura", medium: !0, boostWeapon: "huyet_kiem", cooldown: 12, cast: .6, mp: 28, sp: 12, range: 96, speed: 0, shots: 1, spread: 0, coef: 6.5, hitR: 0, blastR: 96, maxTargets: 5, delay: .18, lifesteal: { pct: .01, max: .05, pvp: .5 }, vfx: "cuu_huyet_tran", effect: null, colors: { core: "#fff0fb", mid: "#e98cff", edge: "#711a70", glow: "#ff6fbd" }, tip: "Chín kiếm huyết ảnh xoay quanh bản thân, gây sát thương lên tối đa 5 đối phương gần nhất, mỗi kẻ trúng hồi 1% Khí Huyết tối đa (tối đa 5%). Có Huyết Kiếm trong hành trang: sát thương đầy đủ và hút huyết; thiếu pháp khí: còn 50%, không hút huyết." }, kim_thuong_giang_the: { id: "kim_thuong_giang_the", short: "Kim Thương", name: "Kim Thương Giáng Thế", book: "bi_tich_kim_thuong_giang_the", legacyBook: "hoa_kim_thuong", element: "Hỏa", glyph: "⇓", icon: "bi_tich_kim_thuong_giang_the", shape: "ground", medium: !0, boostWeapon: "hoa_kim_thuong", maxTargets: 4, cooldown: 12, cast: .5, mp: 30, sp: 12, range: 132, speed: 0, shots: 1, spread: 0, coef: 5.6, hitR: 0, blastR: 130, delay: .2, hitDelay: 1.15, vfx: "kim_thuong_giang_the", effect: [{ kind: "burn", time: 4, dpsCoef: .45 }, { kind: "stun", time: .8 }], colors: { core: "#fff8d8", mid: "#ff9a3a", edge: "#8a2a12", glow: "#ffb45c" }, tip: "Hoả Kim Thương từ trời giáng xuống điểm ngắm: nổ lửa diện rộng, thiêu đốt 4 giây và choáng 0,8 giây. Có Hoả Kim Thương trong hành trang: sát thương đầy đủ; thiếu pháp khí: còn 50%." }, loi_thuong_quan_dia: { id: "loi_thuong_quan_dia", short: "Quán Địa", name: "Lôi Thương Quán Địa", book: "bi_tich_loi_thuong_quan_dia", element: "Lôi", glyph: "⇓", icon: "bi_tich_loi_thuong_quan_dia", shape: "ground", medium: !0, thuongPham: !0, requireRealm: "truc_co_2", boostWeapon: "hoang_loi_thuong", maxTargets: 3, cooldown: 9, cast: .5, mp: 30, sp: 12, range: 150, speed: 0, shots: 1, spread: 0, coef: 6.3, hitR: 0, blastR: 56, delay: .3, hitDelay: .3, vfx: "loi_thuong_quan_dia", effect: { kind: "stun", time: 1 }, colors: { core: "#fffbe0", mid: "#ffd92e", edge: "#9a5a08", glow: "#ffe680" }, tip: "Thương sét từ trời cắm xuống điểm ngắm, nổ lôi quang trúng tối đa 3 kẻ và làm choáng 1 giây. Cần Trúc Cơ Trung Kỳ. Có Hoàng Lôi Thương trong hành trang: sát thương đầy đủ; thiếu pháp khí: còn 50%." }, ngu_loi_thuong_vu: { id: "ngu_loi_thuong_vu", short: "Thương Vũ", name: "Ngũ Lôi Thương Vũ", book: "bi_tich_ngu_loi_thuong_vu", element: "Lôi", glyph: "⇊", icon: "bi_tich_ngu_loi_thuong_vu", shape: "ground", medium: !0, thuongPham: !0, requireRealm: "truc_co_2", boostWeapon: "hoang_loi_thuong", maxTargets: 5, cooldown: 14, cast: .6, mp: 36, sp: 14, range: 170, speed: 0, shots: 1, spread: 0, coef: 9.8, hitR: 0, blastR: 84, delay: 1, hitDelay: 1, vfx: "ngu_loi_thuong_vu", effect: { kind: "slow", time: 3.5, mult: .45 }, colors: { core: "#fffbe0", mid: "#ffd92e", edge: "#7a4ad8", glow: "#ffe680" }, tip: "Năm thương sét lần lượt giáng quanh điểm ngắm, cây cuối cắm đúng tâm: trúng tối đa 5 kẻ và làm chậm còn 45% trong 3,5 giây. Cần Trúc Cơ Trung Kỳ. Có Hoàng Lôi Thương trong hành trang: sát thương đầy đủ; thiếu pháp khí: còn 50%." }, thanh_lam_kiem_tru: { id: "thanh_lam_kiem_tru", short: "Thanh Băng Kiếm Trụ", name: "Thanh Băng Kiếm Trụ", book: "bi_tich_thanh_lam_kiem_tru", element: "Kim", glyph: "⚔", shape: "bolt", vfx: "thanh_bang_kiem_tru", medium: !0, boostWeapon: "bang_linh_kiem", cooldown: 8, cast: .38, mp: 15, sp: 6, range: 128, speed: 270, shots: 1, spread: 0, coef: 5.2, hitR: 12, blastR: 36, maxTargets: 2, primaryTarget: !0, effect: null, colors: { core: "#efffff", mid: "#67d9ee", edge: "#1764b1", glow: "#8defff" }, tip: "Triệu hồi mưa kiếm băng, gây sát thương lên mục tiêu chính rồi lan thêm tối đa 2 đối thủ. Có Băng Linh Kiếm trong hành trang: sát thương đầy đủ; thiếu pháp khí: còn 50%." }, anh_ky_phu: { id: "anh_ky_phu", short: "Ảnh Kỵ", name: "Ảnh Kỵ", book: "bi_tich_anh_ky_phu", element: "Phù", glyph: "♞", icon: "bi_tich_anh_ky_phu", shape: "bolt", medium: !0, cooldown: 9, cast: .44, mp: 18, sp: 7, range: 192, speed: 250, shots: 1, spread: 0, coef: 6, hitR: 13, blastR: 0, mpDrain: 4, vfx: "anh_ky_phu", vfxLayers: 3, effect: { kind: "stun", time: 1.3, chance: .5 }, colors: { core: "#f2ffff", mid: "#55cfff", edge: "#2457a4", glow: "#9cecff" }, tip: "Kỵ ảnh xanh lao tới mục tiêu, gây sát thương, rút 4 Linh Lực và có 50% cơ hội làm choáng 1,3 giây." }, bang_kiem_tran: { id: "bang_kiem_tran", short: "Băng Kiếm Trận", name: "Băng Kiếm Trận", book: "bi_tich_bang_kiem_tran", element: "Băng", glyph: "❄", icon: "bi_tich_bang_kiem_tran", shape: "ground", medium: !0, boostWeapon: "bang_linh_kiem", cooldown: 11, cast: .54, mp: 26, sp: 11, range: 136, speed: 0, shots: 1, spread: 0, coef: 5, hitR: 0, blastR: 66, shatterBonus: .2, maxTargets: 4, delay: .22, vfx: "bang_kiem_tran", effect: [{ kind: "freeze", time: 1.2 }, { kind: "slow", time: 3.6, mult: .45 }], colors: { core: "#f4ffff", mid: "#55cfff", edge: "#1764b1", glow: "#a9efff" }, tip: "Dựng trận kiếm băng tại điểm ngắm, gây sát thương lên tối đa 4 mục tiêu, đóng băng 1,2 giây rồi làm chậm còn 45% trong 3,6 giây. Mục tiêu đã Chậm hoặc Đóng Băng chịu thêm 20% sát thương Băng Vỡ. Có Băng Linh Kiếm trong hành trang: sát thương đầy đủ; thiếu pháp khí: còn 50%." }, bang_kiem_luan: { id: "bang_kiem_luan", short: "Băng Kiếm Luân", name: "Băng Kiếm Luân", book: "bi_tich_bang_kiem_luan", element: "Băng", glyph: "✥", icon: "bi_tich_bang_kiem_luan", shape: "aura", medium: !0, boostWeapon: "bang_linh_kiem", cooldown: 10, cast: .72, mp: 22, sp: 9, range: 246, speed: 0, shots: 1, spread: 0, coef: 4.9, hitR: 0, blastR: 246, maxTargets: 5, delay: .16, vfx: "bang_kiem_luan", effect: { kind: "slow", time: 4, mult: .55 }, colors: { core: "#f5ffff", mid: "#46c9ff", edge: "#1453ae", glow: "#8deaff" }, tip: "Kiếm luân băng xoay quanh thân, gây sát thương và làm chậm tối đa 5 mục tiêu gần nhất còn 55% trong 4 giây. Có Băng Linh Kiếm trong hành trang: sát thương đầy đủ; thiếu pháp khí: còn 50%." }, tien_vu: { id: "tien_vu", short: "Tiễn Vũ", name: "Tiễn Vũ", book: "bi_tich_tien_vu", element: "Kim", glyph: "➹", icon: "bi_tich_tien_vu", shape: "ground", medium: !0, boostWeapon: "cung_linh", maxTargets: 4, cooldown: 11, cast: .46, mp: 24, sp: 10, range: 176, speed: 0, shots: 1, spread: 0, coef: 5.25, hitR: 0, blastR: 80, delay: .2, hitDelay: .4, vfx: "tien_vu", effect: { kind: "wound", chance: .3, time: 5, dpsCoef: .25, heal: .5 }, colors: { core: "#fff6c8", mid: "#f0c040", edge: "#8a5a12", glow: "#ffd76a" }, tip: "Trút mưa tên vàng xuống điểm ngắm, trúng tối đa 4 mục tiêu. Mỗi mục tiêu có 30% dính Thâm Thương: rỉ máu 5 giây và chỉ hồi được 50% Khí Huyết. Có Linh Cung trong hành trang: sát thương đầy đủ; thiếu pháp khí: còn 50%." }, tram_ma: { id: "tram_ma", short: "Trầm Ma", name: "Trầm Ma", book: "bi_tich_tram_ma", element: "Ma", glyph: "⊛", icon: "bi_tich_tram_ma", shape: "aura", medium: !0, maxTargets: 3, cooldown: 9, cast: .42, mp: 18, sp: 7, range: 176, speed: 0, shots: 1, spread: 0, coef: 5.25, hitR: 0, blastR: 176, delay: .35, vfx: "tram_ma", linhAn: { time: 4, bonus: .15 }, effect: { kind: "burn", chance: .5, time: 4, dpsCoef: .3, ma: !0 }, colors: { core: "#f1e2ff", mid: "#9a5cff", edge: "#2a0b3d", glow: "#b77dff" }, tip: "Ma khí lan ra rất xa quanh thân, tự tìm 3 kẻ địch gần nhất và mở xoáy ma khí dưới chân từng kẻ. Mỗi mục tiêu trúng mang Linh Ấn 4 giây: đòn trực tiếp kế tiếp của bạn gây thêm 15% sát thương rồi tiêu hao ấn. Mục tiêu cũng có 50% cơ hội dính Ma Hỏa, thiêu đốt 4 giây." }, ma_bao_an: { id: "ma_bao_an", short: "Ma Bạo Ấn", name: "Ma Bạo Ấn", book: "bi_tich_ma_bao_an", element: "Ma", glyph: "卍", icon: "bi_tich_ma_bao_an", shape: "ground", medium: !0, thuongPham: !0, requireRealm: "truc_co_2", dao: "ma", maxTargets: 4, cooldown: 13, cast: .45, mp: 34, sp: 14, range: 150, speed: 0, shots: 1, spread: 0, coef: 6.6, hitR: 0, blastR: 72, delay: .7, hitDelay: .7, vfx: "ma_bao_an", effect: { kind: "burn", time: 5, dpsCoef: .4, ma: !0 }, colors: { core: "#fbe8ff", mid: "#b04cff", edge: "#2a0638", glow: "#d27bff" }, tip: "Kết ma ấn tại điểm ngắm: ma khí tụ lại rồi ba ấn nổ liền nhau, trúng tối đa 4 kẻ. Kẻ trúng chắc chắn dính Ma Hỏa 5 giây. Cần Trúc Cơ Trung Kỳ và mang Hồn Phiên." }, ma_hon_phe: { id: "ma_hon_phe", short: "Ma Hồn Phệ", name: "Ma Hồn Phệ", book: "bi_tich_ma_hon_phe", element: "Ma", glyph: "☠", icon: "bi_tich_ma_hon_phe", shape: "ground", medium: !0, thuongPham: !0, requireRealm: "truc_co_1", dao: "ma", maxTargets: 4, cooldown: 11.5, cast: .5, mp: 26, sp: 12, range: 180, speed: 0, shots: 1, spread: 0, coef: 8.5, hitR: 0, blastR: 42, delay: 2.2, hitDelay: 2.2, vfx: "ma_hon_phe", effect: { kind: "burn", time: 4, dpsCoef: .45, ma: !0 }, colors: { core: "#fff0ff", mid: "#ef315f", edge: "#2b073f", glow: "#8f4dff" }, tip: "Gọi 5–7 đầu lâu ma lần lượt xoáy vòng quanh chủ rồi lao cong vào mục tiêu. Ma Hỏa 4 giây; cần Trúc Cơ Sơ Kỳ và Hồn Phiên." }, cuu_u_ma_trao: { id: "cuu_u_ma_trao", short: "Ma Trảo", name: "Cửu U Ma Trảo", book: "bi_tich_cuu_u_ma_trao", element: "Ma", glyph: "爪", icon: "bi_tich_cuu_u_ma_trao", shape: "aura", medium: !0, thuongPham: !0, requireRealm: "truc_co_2", dao: "ma", maxTargets: 5, cooldown: 15, cast: .55, mp: 36, sp: 15, range: 180, speed: 0, shots: 1, spread: 0, coef: 10.5, hitR: 0, blastR: 180, delay: .95, hitDelay: .95, vfx: "cuu_u_ma_trao", effect: null, colors: { core: "#f3dcff", mid: "#9b4dff", edge: "#2a0b4d", glow: "#c58cff" }, tip: "Năm bàn tay ma trồi lên dưới chân năm kẻ gần nhất rồi vồ xé, sát thương ngang Thái Âm Nguyệt Quang. Cần Trúc Cơ Trung Kỳ và Hồn Phiên." }, phi_long_tai_thien: { id: "phi_long_tai_thien", short: "Phi Long", name: "Phi Long Tại Thiên", book: "bi_tich_phi_long_tai_thien", element: "Kim", glyph: "龍", icon: "bi_tich_phi_long_tai_thien", shape: "ground", medium: !0, thuongPham: !0, requireRealm: "truc_co_2", dao: "chinh", autoFoe: !0, primaryTarget: !0, maxTargets: 2, cooldown: 15, cast: .55, mp: 36, sp: 15, range: 200, speed: 0, shots: 1, spread: 0, coef: 11, hitR: 0, blastR: 84, delay: 1.15, hitDelay: 1.15, vfx: "phi_long_tai_thien", effect: null, colors: { core: "#fff8d8", mid: "#ffd45a", edge: "#7a4a08", glow: "#ffe28a" }, tip: "Ba rồng ảo ảnh bay quanh người rồi lao vào mục tiêu chính cùng hai kẻ gần nó nhất, sát thương nặng hơn Cửu U Ma Trảo. Cần Trúc Cơ Trung Kỳ và Kiếm Hạp." }, nguyet_quang: { id: "nguyet_quang", short: "Nguyệt Quang", name: "Thái Âm Nguyệt Quang", book: "bi_tich_nguyet_quang", element: "Quang", glyph: "☾", icon: "bi_tich_nguyet_quang", shape: "ground", medium: !0, thuongPham: !0, requireRealm: "truc_co_2", maxTargets: 3, cooldown: 14, cast: .55, mp: 34, sp: 14, range: 190, speed: 0, shots: 1, spread: 0, coef: 10.5, hitR: 0, blastR: 34, delay: 1.3, hitDelay: 1.3, vfx: "nguyet_quang", effect: { kind: "stun", time: .8 }, colors: { core: "#ffffff", mid: "#9fdcff", edge: "#243f9a", glow: "#e6f4ff" }, tip: "Triệu trăng lên cao rồi giáng luồng nguyệt quang xuống điểm ngắm: sát thương rất lớn, trúng tối đa 3 kẻ, choáng 0,8 giây. Cần Trúc Cơ Trung Kỳ." }, kim_quang_cu_kiem: { id: "kim_quang_cu_kiem", short: "Cự Kiếm", name: "Kim Quang Cự Kiếm", book: "bi_tich_kim_quang_cu_kiem", element: "Kim", glyph: "⚔", icon: "bi_tich_kim_quang_cu_kiem", shape: "ground", medium: !0, thuongPham: !0, requireRealm: "truc_co_2", dao: "chinh", autoFoe: !0, maxTargets: 1, cooldown: 10, cast: .5, mp: 26, sp: 11, range: 210, speed: 0, shots: 1, spread: 0, coef: 7.2, hitR: 0, blastR: 0, delay: 2.2, hitDelay: 2.2, vfx: "kim_quang_cu_kiem", effect: null, colors: { core: "#fffbe0", mid: "#ffd24a", edge: "#a8601a", glow: "#ffe28a" }, tip: "Triệu một cây kim kiếm khổng lồ từ vòng năng lượng, bay chậm theo vòng cung rồi cắm vào mục tiêu. Cần Trúc Cơ Trung Kỳ và Kiếm Hạp." }, ngu_sac_than_chuong: { id: "ngu_sac_than_chuong", short: "Thần Chưởng", name: "Ngũ Sắc Thần Chưởng", book: "bi_tich_ngu_sac_than_chuong", element: "Ngũ Hành", glyph: "掌", icon: "bi_tich_ngu_sac_than_chuong", shape: "ground", medium: !0, thuongPham: !0, requireRealm: "truc_co_2", maxTargets: 5, cooldown: 30, cast: .6, mp: 36, sp: 14, range: 200, speed: 0, shots: 1, spread: 0, coef: 22.5, hitR: 0, blastR: 56, delay: 1.8, hitDelay: 1.8, vfx: "ngu_sac_than_chuong", effect: { kind: "stun", time: 2 }, colors: { core: "#ffffff", mid: "#b98cff", edge: "#3d2a8a", glow: "#ffe2a0" }, tip: "Bàn tay ngũ sắc khổng lồ thò ra từ mây sương rồi bổ xuống điểm ngắm: sát thương cực lớn, trúng tối đa 5 kẻ, choáng 2 giây. Hồi chiêu rất lâu. Cần Trúc Cơ Trung Kỳ." }, huyet_buc_chuong: { id: "huyet_buc_chuong", short: "Huyết Bức", name: "Huyết Bức Chưởng", book: "bi_tich_huyet_buc_chuong", element: "Huyết", glyph: "蝠", icon: "bi_tich_huyet_buc_chuong", shape: "ground", medium: !0, autoFoe: !0, maxTargets: 3, cooldown: 5.5, cast: .4, mp: 14, sp: 6, range: 130, speed: 0, shots: 1, spread: 0, coef: 5, hitR: 0, blastR: 44, delay: .34, hitDelay: .34, vfx: "huyet_buc_chuong", effect: { kind: "wound", chance: .35, time: 4, dpsCoef: .2, heal: .5 }, colors: { core: "#ffe9d8", mid: "#e0283a", edge: "#4a0612", glow: "#ff5a4a" }, tip: "Bầy dơi huyết bắn vào mục tiêu, trúng tối đa 3 kẻ; 35% dính Thâm Thương (rỉ máu 4 giây, hồi máu còn 50%)." }, huyet_liem_tram: { id: "huyet_liem_tram", short: "Liêm Trảm", name: "Huyết Liêm Trảm", book: "bi_tich_huyet_liem_tram", element: "Huyết", glyph: "镰", icon: "bi_tich_huyet_liem_tram", shape: "ground", medium: !0, autoFoe: !0, requireRealm: "luyen_khi_10", boostWeapon: "huyet_ma_liem", maxTargets: 4, cooldown: 7, cast: .45, mp: 24, sp: 10, range: 150, speed: 0, shots: 1, spread: 0, coef: 5.8, hitR: 0, blastR: 52, delay: .17, hitDelay: .17, vfx: "huyet_liem_tram", effect: null, lifesteal: { pct: .05, max: .15, pvp: .5 }, colors: { core: "#ffe6e0", mid: "#e0283a", edge: "#4a0612", glow: "#ff3b52" }, tip: "Làn sóng liêm máu nổ thành mây huyết, trúng tối đa 4 kẻ. Cần Luyện Khí Tầng 10. Có Huyết Ma Liêm trong hành trang: sát thương gấp đôi và hút 5% Khí Huyết mỗi kẻ trúng (tối đa 15%); thiếu pháp khí: còn 50%, không hút." }, tu_anh_phuoc_tien: { id: "tu_anh_phuoc_tien", short: "Tứ Ảnh", name: "Tứ Ảnh Phược Tiên", book: "bi_tich_tu_anh_phuoc_tien", element: "Ảnh", glyph: "影", icon: "bi_tich_tu_anh_phuoc_tien", shape: "ground", medium: !0, requireRealm: "truc_co_1", kieuRoi: ["bach_loi_tien", "nhuyen_tien"], autoFoe: !0, needTarget: !0, maxTargets: 1, cooldown: 10, cast: .5, mp: 26, sp: 10, range: 170, speed: 0, shots: 1, spread: 0, coef: 6, hitR: 0, blastR: 0, delay: .8, hitDelay: .8, vfx: "tu_anh_phuoc_tien", effect: { kind: "root", time: 2.5 }, colors: { core: "#f2fbff", mid: "#6fc7ff", edge: "#2553b8", glow: "#a8e4ff" }, tip: "Thân hoá bốn bóng mờ, mỗi bóng quất một roi trói chân đối phương 2,5 giây. Cần Trúc Cơ Sơ Kỳ. Có Nhuyễn Tiên thì roi đỏ, không thì roi sét Bạch Lôi Tiên." }, xich_ma_hoa_than: { id: "xich_ma_hoa_than", short: "Xích Ma", name: "Xích Ma Hóa Thân", book: "bi_tich_xich_ma_hoa_than", element: "Ma", glyph: "魔", icon: "bi_tich_xich_ma_hoa_than", shape: "self", medium: !0, requireRealm: "truc_co_1", dao: "ma", cooldown: 37.5, cast: .6, mp: 30, sp: 12, range: 140, speed: 0, shots: 1, spread: 0, hitR: 0, blastR: 0, vfx: "xich_ma", effect: null, bienHinh: { hinh: "xich_ma", fx: "XichMaFX", time: 12, dang: { gender: "male", skin: "xich_ma", outfit: "xich_ma_y", hair: "xich_ma_toc", hairColor: "hac", eyeColor: "xich_ma", shoes: "ink" }, speed: 1.6, minAttack: .5, giap: .6, giapTen: "Ma Giáp", giapMau: "#ff6a4a", lifesteal: { pct: .015, pvp: .5 } }, colors: { core: "#ffe2c8", mid: "#e0283a", edge: "#2a0710", glow: "#ff6a3c" }, tip: "Cường hoá thân thể 12 giây: đánh nhanh gấp 1,6, hút huyết, có Ma Giáp đỡ đòn, ma khí bao quanh người. Vẫn bay, dùng vũ khí và chiêu như thường. Cần Trúc Cơ Sơ Kỳ và Hồn Phiên." }, kim_cuong_hoa_than: { id: "kim_cuong_hoa_than", short: "Kim Cương", name: "Kim Cương Hóa Thân", book: "bi_tich_kim_cuong_hoa_than", element: "Kim", glyph: "金", icon: "bi_tich_kim_cuong_hoa_than", shape: "self", medium: !0, requireRealm: "truc_co_1", dao: "chinh", cooldown: 37.5, cast: .6, mp: 30, sp: 12, range: 140, speed: 0, shots: 1, spread: 0, hitR: 0, blastR: 0, vfx: "kim_cuong", effect: null, bienHinh: { hinh: "kim_cuong", fx: "KimCuongFX", time: 14, dang: { eyeColor: "kim_cuong" }, kimHoa: !0, giu: ["beard", "accessory", "aura"], speed: 1.45, minAttack: .5, giap: 1, giapTen: "Cương Khí", giapMau: "#ffd86b", lifesteal: { pct: .01, pvp: .5 } }, colors: { core: "#fff6c8", mid: "#ffc83a", edge: "#7a4a08", glow: "#ffe27a" }, tip: "Cường hoá thân thể 14 giây: đánh nhanh gấp 1,45, hút huyết, có Cương Khí đỡ đòn, thân mạ vàng kim, mắt phát sáng, kim quang bao quanh người. Vẫn bay, dùng vũ khí và chiêu như thường. Cần Trúc Cơ Sơ Kỳ và Kiếm Hạp." } };
  e.ORDER = ["hoa_cau", "phong_nhan", "bang_thau", "dia_thich", "xich_chan"];
  e.MEDIUM_ORDER = ["ngu_kiem_sat", "huyet_kiem_tran", "cuu_huyet_kiem_tran", "thanh_lam_kiem_tru", "kim_thuong_giang_the", "anh_ky_phu", "bang_kiem_tran", "bang_kiem_luan", "van_kiem_quy_tong", "tien_vu", "tram_ma", "ma_bao_an", "ma_hon_phe", "nguyet_quang", "kim_quang_cu_kiem", "ngu_sac_than_chuong", "huyet_buc_chuong", "loi_thuong_quan_dia", "ngu_loi_thuong_vu", "huyet_liem_tram", "tu_anh_phuoc_tien", "xich_ma_hoa_than", "kim_cuong_hoa_than", "cuu_u_ma_trao", "phi_long_tai_thien"];
  e.activeOrder = function () {
    return e.ORDER.concat(e.MEDIUM_ORDER);
  };
  e.VAN_KIEM_COST = 2e4;
  e.canBuyVanKiem = function (t) {
    if ((t = t || n).Inventory.owns("bi_tich_van_kiem_quy_tong")) {
      return { ok: !1, why: "đã sở hữu bí tịch" };
    }
    var a = e.lockReason("van_kiem_quy_tong", t);
    return a ? { ok: !1, why: a } : t.Progress.stones < e.VAN_KIEM_COST ? { ok: !1, why: "cần 20000 Linh Thạch" } : { ok: !0 };
  };
  e.buyVanKiem = function (t) {
    t = t || n;
    var a = e.canBuyVanKiem(t);
    return a.ok ? t.Progress.spendStones(e.VAN_KIEM_COST) ? (t.Inventory.add("bi_tich_van_kiem_quy_tong", 1), t.Quest && t.Quest.save && t.Quest.save(), { ok: !0, itemId: "bi_tich_van_kiem_quy_tong", cost: e.VAN_KIEM_COST }) : { ok: !1, why: "thiếu Linh Thạch" } : a;
  };
  e.MA_BAO_AN_COST = 2e4;
  e.MA_BAO_AN_BOOK = "bi_tich_ma_bao_an";
  e.canBuyMaBaoAn = function (t) {
    if ((t = t || n).Inventory.owns(e.MA_BAO_AN_BOOK)) {
      return { ok: !1, why: "đã có bí tịch" };
    }
    var a = e.lockReason("ma_bao_an", t);
    return a ? { ok: !1, why: a } : (0 | t.Progress.stones) < e.MA_BAO_AN_COST ? { ok: !1, why: "cần " + e.MA_BAO_AN_COST + " Linh Thạch" } : { ok: !0 };
  };
  e.buyMaBaoAn = function (t) {
    t = t || n;
    var a = e.canBuyMaBaoAn(t);
    return a.ok ? t.Progress.spendStones(e.MA_BAO_AN_COST) ? (t.Inventory.add(e.MA_BAO_AN_BOOK, 1), t.Quest && t.Quest.save && t.Quest.save(), { ok: !0, itemId: e.MA_BAO_AN_BOOK, cost: e.MA_BAO_AN_COST }) : { ok: !1, why: "thiếu Linh Thạch" } : a;
  };
  e.XICH_MA_COST = 12e3;
  e.XICH_MA_BOOK = "bi_tich_xich_ma_hoa_than";
  e.canBuyXichMa = function (t) {
    if ((t = t || n).Inventory.owns(e.XICH_MA_BOOK)) {
      return { ok: !1, why: "đã có bí tịch" };
    }
    var a = e.lockReason("xich_ma_hoa_than", t);
    return a ? { ok: !1, why: a } : (0 | t.Progress.stones) < e.XICH_MA_COST ? { ok: !1, why: "cần " + e.XICH_MA_COST + " Linh Thạch" } : { ok: !0 };
  };
  e.buyXichMa = function (t) {
    t = t || n;
    var a = e.canBuyXichMa(t);
    return a.ok ? t.Progress.spendStones(e.XICH_MA_COST) ? (t.Inventory.add(e.XICH_MA_BOOK, 1), t.Quest && t.Quest.save && t.Quest.save(), { ok: !0, itemId: e.XICH_MA_BOOK, cost: e.XICH_MA_COST }) : { ok: !1, why: "thiếu Linh Thạch" } : a;
  };
  e.KIM_CUONG_COST = 12e3;
  e.KIM_CUONG_BOOK = "bi_tich_kim_cuong_hoa_than";
  e.canBuyKimCuong = function (t) {
    if ((t = t || n).Inventory.owns(e.KIM_CUONG_BOOK)) {
      return { ok: !1, why: "đã có bí tịch" };
    }
    var a = e.lockReason("kim_cuong_hoa_than", t);
    return a ? { ok: !1, why: a } : (0 | t.Progress.stones) < e.KIM_CUONG_COST ? { ok: !1, why: "cần " + e.KIM_CUONG_COST + " Linh Thạch" } : { ok: !0 };
  };
  e.buyKimCuong = function (t) {
    t = t || n;
    var a = e.canBuyKimCuong(t);
    return a.ok ? t.Progress.spendStones(e.KIM_CUONG_COST) ? (t.Inventory.add(e.KIM_CUONG_BOOK, 1), t.Quest && t.Quest.save && t.Quest.save(), { ok: !0, itemId: e.KIM_CUONG_BOOK, cost: e.KIM_CUONG_COST }) : { ok: !1, why: "thiếu Linh Thạch" } : a;
  };
  e.KIM_QUANG_COST = 12e3;
  e.KIM_QUANG_BOOK = "bi_tich_kim_quang_cu_kiem";
  e.canBuyKimQuang = function (t) {
    if ((t = t || n).Inventory.owns(e.KIM_QUANG_BOOK)) {
      return { ok: !1, why: "đã có bí tịch" };
    }
    var a = e.lockReason("kim_quang_cu_kiem", t);
    return a ? { ok: !1, why: a } : (0 | t.Progress.stones) < e.KIM_QUANG_COST ? { ok: !1, why: "cần " + e.KIM_QUANG_COST + " Linh Thạch" } : { ok: !0 };
  };
  e.buyKimQuang = function (t) {
    t = t || n;
    var a = e.canBuyKimQuang(t);
    return a.ok ? t.Progress.spendStones(e.KIM_QUANG_COST) ? (t.Inventory.add(e.KIM_QUANG_BOOK, 1), t.Quest && t.Quest.save && t.Quest.save(), { ok: !0, itemId: e.KIM_QUANG_BOOK, cost: e.KIM_QUANG_COST }) : { ok: !1, why: "thiếu Linh Thạch" } : a;
  };
  e.weaponAllowed = function (n, e) {
    return !e.allowedWeapons || e.allowedWeapons.indexOf(n && n.cfg && n.cfg.weapon) >= 0;
  };
  e.SECT_SHOP_NPC = "tgt_thien_kiem_tong";
  e.SECT_SHOP = [];
  e.sectShopRow = function (n) {
    for (var t = 0; t < e.SECT_SHOP.length; t++)
      if (e.SECT_SHOP[t].id === n) {
        return e.SECT_SHOP[t];
      }
    return null;
  };
  e.canBuySectSkill = function (t, a) {
    a = a || n;
    var o = e.sectShopRow(t);
    var i = e.DEFS[t];
    return o && i ? a.Inventory && a.Progress ? (a.Inventory.owns ? a.Inventory.owns(i.book, 1) : a.Inventory.has(i.book, 1)) ? { ok: !1, why: "đã có bí tịch trong túi" } : (0 | a.Progress.stones) < o.cost ? { ok: !1, why: "không đủ Linh Thạch" } : { ok: !0, row: o, def: i } : { ok: !1, why: "luật nhân vật chưa sẵn sàng" } : { ok: !1, why: "không có bí tịch này" };
  };
  e.buySectSkill = function (t, a) {
    a = a || n;
    var o = e.canBuySectSkill(t, a);
    return o.ok ? a.Progress.spendStones(o.row.cost) ? (a.Inventory.add(o.def.book, 1), a.Quest && a.Quest.save && a.Quest.save(), { ok: !0, id: o.def.id, itemId: o.def.book, cost: o.row.cost, stones: 0 | a.Progress.stones }) : { ok: !1, why: "không đủ Linh Thạch" } : o;
  };
  e.PASSIVE_MAX = 5;
  e.PASSIVE_FLAG = "bi_dong_chon";
  e.PASSIVES = { kim_quang_chao: { id: "kim_quang_chao", book: "bi_tich_kim_quang_chao", name: "Kim Quang Cháo", short: "Kim Quang", element: "Kim", kind: "shield", sp: 1, cooldown: 5, amountCoef: 2.7, colors: { core: "#fff5bd", mid: "#e8c85a", edge: "#9b6b24", glow: "#ffe98a" }, tip: "Tự dựng khiên khi sát thương xuyên vào Khí Huyết, chặn một phần đòn — càng cao tu vi càng chặn được nhiều." }, moc_xuan: { id: "moc_xuan", book: "bi_tich_moc_xuan", name: "Mộc Xuân Thuật", short: "Mộc Xuân", element: "Mộc", kind: "heal", sp: 1, cooldown: 7, amountCoef: 2, colors: { core: "#efffd0", mid: "#8bd46a", edge: "#3e7838", glow: "#b9f39c" }, tip: "Tự vận hành khi Khí Huyết bị thương, chữa lại một phần — càng cao tu vi càng chữa được nhiều." }, tu_linh: { id: "tu_linh", book: "bi_tich_tu_linh", name: "Tụ Linh Quyết", short: "Tụ Linh", element: "Linh", kind: "tu_linh", sp: 2, every: 5, pct: .02, requireRealm: "truc_co_1", colors: { core: "#e6fbff", mid: "#6fd6e8", edge: "#2a7f93", glow: "#9befff" }, tip: "Mỗi 5 giây hồi 2% Linh Lực." }, ho_tam: { id: "ho_tam", book: "bi_tich_ho_tam", name: "Hộ Tâm Chân Khí", short: "Hộ Tâm", element: "Kim", kind: "ho_tam", sp: 3, below: .3, reduce: .15, time: 4, cooldown: 30, requireRealm: "truc_co_1", colors: { core: "#fff1d6", mid: "#f0b35a", edge: "#a4561f", glow: "#ffc978" }, tip: "Khí Huyết dưới 30% thì giảm 15% sát thương nhận vào trong 4 giây." }, phong_hanh: { id: "phong_hanh", book: "bi_tich_phong_hanh", name: "Phong Hành Bộ", short: "Phong Hành", element: "Phong", kind: "phong_hanh", sp: 2, speed: .05, healPct: .01, cooldown: 1, requireRealm: "truc_co_1", colors: { core: "#eafff4", mid: "#7fdcae", edge: "#2f8a62", glow: "#b8f0d4" }, tip: "Tăng 5% tốc độ di chuyển; né đòn thành công hồi 1% Khí Huyết." }, kiem_y: { id: "kiem_y", book: "bi_tich_kiem_y", name: "Kiếm Ý Sơ Thành", short: "Kiếm Ý", element: "Kiếm", kind: "kiem_y", sp: 3, every: 4, bonus: .12, window: 3, requireRealm: "truc_co_1", colors: { core: "#f4ffff", mid: "#a8c7d4", edge: "#46515a", glow: "#d9f4ff" }, tip: "Cầm kiếm: đòn thứ 4 liên tiếp tăng 12% sát thương." }, bang_tam: { id: "bang_tam", book: "bi_tich_bang_tam", name: "Băng Tâm", short: "Băng Tâm", element: "Băng", kind: "bang_tam", sp: 2, reduce: .2, cooldown: 1, requireRealm: "truc_co_1", colors: { core: "#eefaff", mid: "#8fd3f5", edge: "#2f7fb8", glow: "#cdf1ff" }, tip: "Giảm 20% thời gian bị làm chậm, trói chân hoặc choáng." }, hoa_mach: { id: "hoa_mach", book: "bi_tich_hoa_mach", name: "Hỏa Mạch", short: "Hỏa Mạch", element: "Hỏa", kind: "hoa_mach", sp: 3, chance: .1, extra: 1, requireRealm: "truc_co_1", colors: { core: "#fff3c4", mid: "#ff9a3c", edge: "#d63b1f", glow: "#ffb45c" }, tip: "Kỹ năng Hỏa có 10% cơ hội thiêu đốt thêm 1 giây." }, tho_thuan: { id: "tho_thuan", book: "bi_tich_tho_thuan", name: "Thổ Thuẫn", short: "Thổ Thuẫn", element: "Thổ", kind: "tho_thuan", sp: 4, still: 2, amount: 20, time: 8, cooldown: 8, requireRealm: "truc_co_1", colors: { core: "#fbeccb", mid: "#c89a5a", edge: "#6b4a2c", glow: "#e8c78f" }, tip: "Đứng yên 2 giây thì nhận lá chắn hấp thụ 20 sát thương." }, moc_sinh: { id: "moc_sinh", book: "bi_tich_moc_sinh", name: "Mộc Sinh", short: "Mộc Sinh", element: "Mộc", kind: "moc_sinh", sp: 2, hpPct: .03, mpPct: .02, requireRealm: "truc_co_1", colors: { core: "#f1ffd8", mid: "#9be07a", edge: "#3e7838", glow: "#c6f7a8" }, tip: "Hạ quái thì hồi 3% Khí Huyết và 2% Linh Lực." }, tinh_tam: { id: "tinh_tam", book: "bi_tich_tinh_tam", name: "Tĩnh Tâm", short: "Tĩnh Tâm", element: "Linh", kind: "tinh_tam", sp: 3, idle: 4, discount: .2, requireRealm: "truc_co_1", colors: { core: "#f5f0ff", mid: "#b9a6ef", edge: "#5b4a9a", glow: "#d8ccff" }, tip: "Không thi triển kỹ năng trong 4 giây thì kỹ năng tiếp theo giảm 20% tiêu hao." }, ma_khi: { id: "ma_khi", book: "bi_tich_ma_khi", name: "Ma Khí Hộ Thể", short: "Ma Khí", element: "Ma", kind: "ma_khi", sp: 4, heavy: .15, reduce: .25, window: 15, requireRealm: "truc_co_1", colors: { core: "#f3dcff", mid: "#9a5cff", edge: "#3a1760", glow: "#c9a2ff" }, tip: "Bị chí mạng (một đòn mất từ 15% Khí Huyết) thì đòn chí mạng kế tiếp giảm 25% sát thương." }, cat_tuong: { id: "cat_tuong", book: "bi_tich_cat_tuong", name: "Cát Tường Hộ Giáp", short: "Cát Tường", element: "Kim", kind: "cat_tuong", sp: 4, cooldown: 10, pct: .12, below: .95, range: 8, maxTargets: 5, hoTro: !0, stat: "bp", roiO: "bai_da_hang_gio", colors: { core: "#fff6d0", mid: "#ffb04a", edge: "#b4521c", glow: "#ffd27a" }, tip: "Mỗi 10 giây hồi 12% Giáp cho tối đa 5 người cùng đội hoặc cùng tông môn đứng gần (tính cả mình)." }, thao_duoc: { id: "thao_duoc", book: "bi_tich_thao_duoc", name: "Thảo Dược Hồi Xuân", short: "Thảo Dược", element: "Mộc", kind: "thao_duoc", sp: 4, cooldown: 10, pct: .08, below: .9, range: 8, maxTargets: 5, hoTro: !0, stat: "hp", roiO: "duoc_vien", colors: { core: "#f0ffd8", mid: "#9be06a", edge: "#3e7838", glow: "#c9f7a0" }, tip: "Mỗi 10 giây hồi 8% Khí Huyết cho tối đa 5 người cùng đội hoặc cùng tông môn đứng gần (tính cả mình)." } };
  e.PASSIVE_ORDER = ["kim_quang_chao", "moc_xuan", "tu_linh", "ho_tam", "phong_hanh", "kiem_y", "bang_tam", "hoa_mach", "tho_thuan", "moc_sinh", "tinh_tam", "ma_khi", "cat_tuong", "thao_duoc"];
  e.passiveAmount = function (n) {
    return n ? Math.max(1, Math.round((n.amountCoef || 0) * e.power())) : 0;
  };
  e.passiveByBook = function (n) {
    for (var t = 0; t < e.PASSIVE_ORDER.length; t++) {
      var a = e.PASSIVES[e.PASSIVE_ORDER[t]];
      if (a.book === n) {
        return a;
      }
    }
    return null;
  };
  e.passiveLock = function (t, a) {
    a = a || n;
    var o = e.PASSIVES[t];
    return o ? o.requireRealm && a.Progress && a.realmReached && !a.realmReached(a.Progress.realmId, o.requireRealm) ? "cần " + (a.realmNameById ? a.realmNameById(o.requireRealm) : o.requireRealm) : null : "không có bí tịch này";
  };
  e.ownsPassive = function (t, a) {
    return i(a || n, e.PASSIVES[t]);
  };
  e.knownPassive = function (t, a) {
    a = a || n;
    var o = e.PASSIVES[t];
    return !!o && (e.testMode ? e.testPassive === t : i(a, o) && !e.passiveLock(t, a));
  };
  e.passiveList = function (t) {
    var a;
    var o = (t = t || n).Quest;
    var i = o && o.flags ? o.flags[e.PASSIVE_FLAG] : null;
    var r = [];
    if (Array.isArray(i)) {
      for (a = 0; a < i.length && r.length < e.PASSIVE_MAX; a++)
        r.indexOf(i[a]) < 0 && e.knownPassive(i[a], t) && r.push(i[a]);
      return r;
    }
    for (a = 0; a < e.PASSIVE_ORDER.length && r.length < e.PASSIVE_MAX; a++)
      e.knownPassive(e.PASSIVE_ORDER[a], t) && r.push(e.PASSIVE_ORDER[a]);
    return r;
  };
  e.passiveOn = function (n, t) {
    return e.testMode ? e.testPassive === n : e.passiveList(t).indexOf(n) >= 0;
  };
  e.setPassiveEquipped = function (t, a, o) {
    if (o = o || n, !e.PASSIVES[t] || !o.Quest || !o.Quest.flags) {
      return { ok: !1, why: "không có bí tịch này" };
    }
    var i = e.passiveList(o).slice();
    var r = i.indexOf(t);
    if (a) {
      if (r >= 0) {
        return { ok: !0, list: i };
      }
      if (!e.knownPassive(t, o)) {
        return { ok: !1, why: e.passiveLock(t, o) || "chưa có bí tịch này" };
      }
      if (i.length >= e.PASSIVE_MAX) {
        return { ok: !1, why: "chỉ mang được " + e.PASSIVE_MAX + " bí tịch bị động" };
      }
      i.push(t);
    }
    else {
      if (r < 0) {
        return { ok: !0, list: i };
      }
      i.splice(r, 1);
    }
    o.Quest.flags[e.PASSIVE_FLAG] = i;
    if (o.Quest.save) {
      o.Quest.save();
    }
    return { ok: !0, list: i };
  };
  e.autoEquipPassive = function (t, a) {
    a = a || n;
    var o = e.passiveByBook(t);
    var i = a.Quest;
    if (o && i && i.flags && Array.isArray(i.flags[e.PASSIVE_FLAG])) {
      e.setPassiveEquipped(o.id, !0, a);
    }
  };
  e.triggerHealthDefense = function (n, t) {
    if (t <= 0) {
      return null;
    }
    for (var a = u(n), o = ["kim_quang_chao", "moc_xuan"], i = 0; i < o.length; i++) {
      var h = o[i];
      var s = e.PASSIVES[h];
      if (e.passiveOn(h) && !((a[h] || 0) > 0) && r(n, s)) {
        a[h] = s.cooldown;
        S(n);
        var l = e.passiveAmount(s);
        if ("shield" === s.kind) {
          var c = Math.min(l, t);
          return { def: s, damage: t - c, blocked: c, heal: 0 };
        }
        return { def: s, damage: t, blocked: 0, heal: l };
      }
    }
    return null;
  };
  e.passiveFx = function (n, e, t) {
    h(n, e, t);
  };
  e.giamSatThuong = function (n, t, a) {
    if (!(t > 0 && n)) {
      return t;
    }
    var o = t;
    if (n.hoTamT > 0) {
      t *= 1 - e.PASSIVES.ho_tam.reduce;
    }
    var i = e.PASSIVES.ma_khi;
    if ((!a || !a.overTime) && n.hpMax > 0 && o >= n.hpMax * i.heavy && e.passiveOn("ma_khi")) {
      if (n.maKhiT > 0 && r(n, i)) {
        var u = t * i.reduce;
        t -= u;
        h(n, "ma_khi", { w: Math.round(u) });
      }
      n.maKhiT = i.window;
    }
    return t === o ? o : Math.max(0, Math.round(t));
  };
  e.sauKhiTrungDon = function (n) {
    var t = e.PASSIVES.ho_tam;
    if (!(!n || n.downed || !(n.hpMax > 0) || n.hp <= 0 || n.hp >= n.hpMax * t.below || n.hoTamT > 0 || (u(n).ho_tam || 0) > 0 || !e.passiveOn("ho_tam"))) {
      if (r(n, t)) {
        n.hoTamT = t.time;
        u(n).ho_tam = t.cooldown;
        h(n, "ho_tam");
      }
    }
  };
  e.tickBiDong = function (t, a) {
    if (t && a > 0) {
      if (t.hoTamT > 0 && (t.hoTamT = Math.max(0, t.hoTamT - a)), t.maKhiT > 0 && (t.maKhiT = Math.max(0, t.maKhiT - a)), t.kyT > 0 && (t.kyT -= a, t.kyT <= 0 && (t.kyT = 0, t.kyN = 0)), t.khongChieuT = Math.min(60, (t.khongChieuT || 0) + a), t.downed) {
        t.tuLinhT = 0;
        return void (t.ttStill = 0);
      }
      var o = null;
      var i = e.PASSIVES.tu_linh;
      if (t.tuLinhT = (t.tuLinhT || 0) + a, t.tuLinhT >= i.every) {
        t.tuLinhT = 0;
        var l = (o = e.testMode ? [e.testPassive] : e.passiveList()).indexOf("tu_linh") >= 0 ? Math.min(Math.round((t.mpMax || 0) * i.pct), s(t.mpMax, t.mp)) : 0;
        if (l > 0 && r(t, i)) {
          t.mp += l;
          h(t, "tu_linh", { m: l });
        }
      }
      var c = e.PASSIVES.tho_thuan;
      var g = void 0 !== t.ttX && Math.abs(t.x - t.ttX) < .5 && Math.abs(t.y - t.ttY) < .5;
      t.ttX = t.x;
      t.ttY = t.y;
      t.ttStill = g ? (t.ttStill || 0) + a : 0;
      if (t.ttStill >= c.still && (u(t).tho_thuan || 0) <= 0 && !(t.shieldT > 0 && t.shieldHp >= c.amount)) {
        if (!(o)) {
          o = e.testMode ? [e.testPassive] : e.passiveList();
        }
        if (o.indexOf("tho_thuan") < 0) {
          t.ttStill = 0;
        }
      }
      if (t.ttStill >= c.still && (u(t).tho_thuan || 0) <= 0 && !(t.shieldT > 0 && t.shieldHp >= c.amount) && r(t, c)) {
        if (n.Player && n.Player.giveShield) {
          n.Player.giveShield(t, c.amount, c.time);
        }
        else {
          t.shieldHp = c.amount;
          t.shieldT = c.time;
        }
        u(t).tho_thuan = c.cooldown;
        t.ttStill = 0;
        h(t, "tho_thuan", { w: c.amount });
      }
    }
  };
  e.hoTroIds = function () {
    for (var n = [], t = 0; t < e.PASSIVE_ORDER.length; t++) {
      var a = e.PASSIVES[e.PASSIVE_ORDER[t]];
      if (a && a.hoTro) {
        n.push(a.id);
      }
    }
    return n;
  };
  e.hoTroSan = function (n, t) {
    var a = e.PASSIVES[t];
    return !(!(a && a.hoTro && n) || n.downed || (u(n)[t] || 0) > 0 || !e.passiveOn(t)) && (e.testMode || (n.sp || 0) >= a.sp);
  };
  e.hoTroKich = function (n, t) {
    var a = e.PASSIVES[t];
    return !(!e.hoTroSan(n, t) || !r(n, a) || (u(n)[t] = a.cooldown, 0));
  };
  e.hoTroCan = function (n, t) {
    var a = e.PASSIVES[t];
    var o = a && a.stat;
    var i = n && n[o + "Max"];
    return !!(o && !n.downed && i > 0 && n[o] < i * a.below);
  };
  e.hoTroLuong = function (n, t, a, o) {
    var i = e.PASSIVES[t];
    var r = i && i.stat;
    if (!r || !n || n.downed || !(n[r + "Max"] > 0)) {
      return 0;
    }
    var h = a > 0 && a < 1 ? a : 1;
    if ("hp" === r && o >= 0) {
      h *= o;
    }
    var u = Math.round(n[r + "Max"] * i.pct * h);
    return Math.min(Math.max(0, u), s(n[r + "Max"], n[r]));
  };
  e.hoTroFx = function (n, e, t) {
    h(n, e, { b: t });
  };
  e.moveBonus = function (n) {
    return n && !n.flying && e.passiveOn("phong_hanh") ? 1 + e.PASSIVES.phong_hanh.speed : 1;
  };
  e.phongHanhNe = function (n) {
    var t = e.PASSIVES.phong_hanh;
    return !(!(n && !n.downed && n.hpMax > 0) || n.hp >= n.hpMax || (u(n).phong_hanh || 0) > 0 || !e.passiveOn("phong_hanh") || !r(n, t) || (u(n).phong_hanh = t.cooldown, h(n, "phong_hanh", { g: l(n, Math.max(1, n.hpMax * t.healPct)) }), 0));
  };
  e.kiemYTruoc = function (n, t) {
    var a = e.PASSIVES.kiem_y;
    n.kyBoost = !1;
    return t && /kiem/.test(String(t.id || "")) && e.passiveOn("kiem_y") ? (n.kyN || 0) >= a.every - 1 && r(n, a) ? (n.kyBoost = !0, 1 + a.bonus) : 1 : (n.kyN = 0, 1);
  };
  e.kiemYSau = function (n, t) {
    var a = e.PASSIVES.kiem_y;
    if (!t) {
      if (n.kyBoost && !e.testMode) {
        n.sp = Math.min(n.spMax || n.sp, (n.sp || 0) + a.sp);
      }
      n.kyN = 0;
      return void (n.kyBoost = !1);
    }
    if (n.kyBoost) {
      n.kyN = 0;
      n.kyBoost = !1;
      h(n, "kiem_y");
    }
    else {
      n.kyN = (n.kyN || 0) + 1;
    }
    n.kyT = a.window;
  };
  e.bangTam = function (n, t) {
    var a = e.PASSIVES.bang_tam;
    if (!(n && t > 0 && e.passiveOn("bang_tam"))) {
      return t;
    }
    if ((u(n).bang_tam || 0) <= 0) {
      if (!r(n, a)) {
        return t;
      }
      u(n).bang_tam = a.cooldown;
      h(n, "bang_tam");
    }
    return t * (1 - a.reduce);
  };
  e.hoaMach = function (n, t, a, o) {
    var i = e.PASSIVES.hoa_mach;
    if (!(n && t && "Hỏa" === t.element && a && e.passiveOn("hoa_mach"))) {
      return a;
    }
    var u = Array.isArray(a) ? a : [a];
    if (!u.some(function (n) {
      return n && "burn" === n.kind;
    })) {
      return a;
    }
    if ((o ? o() : Math.random()) >= i.chance) {
      return a;
    }
    if (!r(n, i)) {
      return a;
    }
    var s = u.map(function (n) {
      if (!n || "burn" !== n.kind) {
        return n;
      }
      var e = {};
      for (var t in n)
        e[t] = n[t];
      e.time = (e.time || 0) + i.extra;
      return e;
    });
    h(n, "hoa_mach");
    return Array.isArray(a) ? s : s[0];
  };
  e.mocSinh = function (n) {
    var t = e.PASSIVES.moc_sinh;
    if (!n || n.downed || !e.passiveOn("moc_sinh")) {
      return !1;
    }
    if (!s(n.hpMax, n.hp) && !s(n.mpMax, n.mp)) {
      return !1;
    }
    if (!r(n, t)) {
      return !1;
    }
    var a = l(n, n.hpMax * t.hpPct);
    var o = Math.min(Math.round((n.mpMax || 0) * t.mpPct), s(n.mpMax, n.mp));
    if (o > 0) {
      n.mp += o;
    }
    else {
      o = 0;
    }
    h(n, "moc_sinh", { g: a, m: o });
    return !0;
  };
  e.spellCost = function (n, t) {
    var a = t.mp || 0;
    var o = t.sp || 0;
    var i = e.PASSIVES.tinh_tam;
    if ((n.khongChieuT || 0) >= i.idle && e.passiveOn("tinh_tam")) {
      var r = Math.round(a * (1 - i.discount));
      var h = Math.round(o * (1 - i.discount)) + (e.testMode ? 0 : i.sp);
      if ((n.mp || 0) >= r && (n.sp || 0) >= h) {
        return { mp: r, sp: h, tinhTam: !0 };
      }
    }
    return { mp: a, sp: o, tinhTam: !1 };
  };
  e.daPhatChieu = function (n, e) {
    n.khongChieuT = 0;
    if (e && e.tinhTam) {
      h(n, "tinh_tam");
    }
  };
  e.biDongVfx = function (t, a, o) {
    var i = n.VFX;
    if (a && "chuong" === a.s) {
      if (t && n.ChuongFx && n.ChuongFx.spawnKich) {
        n.ChuongFx.spawnKich(t.x, t.y, a.w, o);
      }
    }
    else {
      var r = a && e.PASSIVES[a.s];
      if (i && t && r) {
        var h = r.colors;
        var u = t.x;
        var s = t.y;
        var l = null;
        var c = i.spawnPassivePulse && i.spawnPassivePulse(u, s, r.id, h, a);
        if ("shield" === r.kind) {
          if (i.spawnGoldenWard) {
            i.spawnGoldenWard(u, s, h);
          }
          if (a.w > 0) {
            l = "Kim Quang chặn " + a.w;
          }
        }
        else {
          if ("heal" === r.kind || "moc_sinh" === r.kind) {
            if (i.spawnSpringHeal) {
              i.spawnSpringHeal(u, s, h);
            }
            if (a.g > 0) {
              l = "+" + a.g + " " + r.short;
            }
          }
          else {
            if ("phong_hanh" === r.kind) {
              if (i.spawnRing) {
                i.spawnRing(u, s - 10, h.glow, 24, .35);
              }
              if (a.g > 0) {
                l = "+" + a.g + " " + r.short;
              }
            }
            else {
              if ("tho_thuan" === r.kind) {
                if (i.spawnGoldenWard) {
                  i.spawnGoldenWard(u, s, h);
                }
                l = r.short + " +" + (a.w || 0);
              }
              else {
                if ("cat_tuong" === r.kind) {
                  if (i.spawnCatTuong) {
                    i.spawnCatTuong(u, s);
                  }
                  else {
                    if (i.spawnGoldenWard) {
                      i.spawnGoldenWard(u, s, h);
                    }
                  }
                  if (a.b > 0) {
                    l = "+" + a.b + " Giáp";
                  }
                }
                else {
                  if ("thao_duoc" === r.kind) {
                    if (i.spawnThaoDuoc) {
                      i.spawnThaoDuoc(u, s);
                    }
                    else {
                      if (i.spawnSpringHeal) {
                        i.spawnSpringHeal(u, s, h);
                      }
                    }
                    if (a.b > 0) {
                      l = "+" + a.b + " Khí Huyết";
                    }
                  }
                  else {
                    if (!c && i.spawnRing) {
                      i.spawnRing(u, s - 15, h.glow, 26, .42);
                      i.spawnRing(u, s - 15, h.mid, 14, .3);
                    }
                    l = "tu_linh" === r.kind ? "+" + (a.m || 0) + " Linh Lực" : "ma_khi" === r.kind ? "Ma Khí đỡ " + (a.w || 0) : r.short;
                  }
                }
              }
            }
          }
        }
        if (o && l && i.spawnText) {
          i.spawnText(u, s - 62, l, h.glow);
        }
      }
    }
  };
  e.updatePassiveCooldowns = function (n, t) {
    if (n.passiveCds) {
      for (var a in n.passiveCds)
        n.passiveCds[a] > 0 && (n.passiveCds[a] = Math.max(0, n.passiveCds[a] - t));
      if (e.testMode) {
        S(n);
      }
    }
  };
  e.THUNDER_BOOK = "bi_tich_loi_chuong";
  e.knownThunder = function () {
    return !!e.testMode || !!n.Inventory && (n.Inventory.owns ? n.Inventory.owns(e.THUNDER_BOOK, 1) : n.Inventory.has(e.THUNDER_BOOK, 1));
  };
  e.byBook = function (n) {
    for (var t = e.activeOrder(), a = 0; a < t.length; a++) {
      var o = e.DEFS[t[a]];
      if (o.book === n || o.legacyBook === n) {
        return o;
      }
    }
    return null;
  };
  e.ownsBook = function (t, a) {
    a = a || n;
    var o = e.DEFS[t];
    if (!o || !a.Inventory) {
      return !1;
    }
    var i = a.Inventory.owns ? function (n) {
      return a.Inventory.owns(n, 1);
    } : function (n) {
      return a.Inventory.has(n, 1);
    };
    return i(o.book) || !(!o.legacyBook || !i(o.legacyBook));
  };
  e.lockReason = function (t, a) {
    a = a || n;
    var o = e.DEFS[t];
    return o ? o.requireRealm && a.Progress && a.realmReached && !a.realmReached(a.Progress.realmId, o.requireRealm) ? "cần " + (a.realmNameById ? a.realmNameById(o.requireRealm) : o.requireRealm) : o.canVuKhi && !e.vuKhiHopLe(o, a) ? "cần " + o.canVuKhi.map(function (n) {
      var e = a.ITEMS && a.ITEMS[n];
      return e ? e.name : n;
    }).join(" hoặc ") + " trong hành trang" : !o.quanQuan || a.TopBoss && a.TopBoss.coNgoi && a.TopBoss.coNgoi(a) ? e.khoaDao(o.dao, null, a) : "cần giữ ngôi Quán Quân Săn Boss" : "không có chiêu này";
  };
  e.vuKhiHopLe = function (e, t) {
    t = t || n;
    var a = e && (e.canVuKhi || e.kieuRoi);
    var o = t.Inventory;
    if (!a || !o) {
      return null;
    }
    var i = o.equipped ? o.equipped("vu_khi") : null;
    if (i && a.indexOf(i.id) >= 0) {
      return i.id;
    }
    for (var r = 0; r < a.length; r++)
      if (o.owns ? o.owns(a[r], 1) : o.has(a[r], 1)) {
        return a[r];
      }
    return null;
  };
  e.khoaDao = function (e, t, a) {
    a = a || n;
    return t && a.Progress && a.realmReached && !a.realmReached(a.Progress.realmId, t) ? "cần " + (a.realmNameById ? a.realmNameById(t) : t) : "ma" !== e || a.LuyenQuy && a.LuyenQuy.coPhien(a) ? "chinh" !== e || a.ChinhDao && a.ChinhDao.coHap(a) ? null : "cần mang Kiếm Hạp" : "cần mang Hồn Phiên";
  };
  e.known = function (t) {
    var a = e.DEFS[t];
    return e.testMode ? !!a : !(!a || !n.Inventory) && e.ownsBook(t) && !e.lockReason(t);
  };
  e.knownList = function () {
    return (e.testMode ? e.ORDER : e.activeOrder()).filter(e.known).map(function (n) {
      return e.DEFS[n];
    });
  };
  e.active = function () {
    if (e.testMode) {
      return e.DEFS[e.testActive] || e.DEFS.hoa_cau;
    }
    var t = n.Quest;
    var a = t && t.flags ? t.flags.phap_thuat_dung : null;
    if (a && e.known(a)) {
      return e.DEFS[a];
    }
    var o = e.knownList();
    return o.length ? o[0] : null;
  };
  e.setActive = function (t) {
    return !!e.known(t) && (e.testMode ? (e.testActive = t, S(), !0) : (n.Quest && n.Quest.flags && (n.Quest.flags.phap_thuat_dung = t, n.Quest.save()), !0));
  };
  e.THUNDER_DEF = { id: "loi_chuong", short: "Lôi Chưởng", name: "Bí Tịch Lôi Chưởng", element: "Lôi", glyph: "ϟ", thunder: !0, colors: { core: "#f2ffff", mid: "#9df2dd", edge: "#3d8fa0", glow: "#9df2dd" }, tip: "Vỗ chưởng gọi sét giáng xuống mục tiêu, quét cả cụm quái đứng gần." };
  e.SLOTS = ["loi_chuong", "hoa_cau", "phong_nhan", "bang_thau", "dia_thich", "xich_chan", "ngu_kiem_sat", "huyet_kiem_tran", "cuu_huyet_kiem_tran", "thanh_lam_kiem_tru", "kim_thuong_giang_the", "anh_ky_phu", "bang_kiem_tran", "bang_kiem_luan", "van_kiem_quy_tong", "tien_vu", "tram_ma", "ma_bao_an", "ma_hon_phe", "nguyet_quang", "kim_quang_cu_kiem", "ngu_sac_than_chuong", "huyet_buc_chuong", "loi_thuong_quan_dia", "ngu_loi_thuong_vu", "huyet_liem_tram", "tu_anh_phuoc_tien", "xich_ma_hoa_than", "kim_cuong_hoa_than", "cuu_u_ma_trao", "phi_long_tai_thien"];
  e.slotDef = function (n) {
    var t = e.SLOTS[n];
    return t ? "loi_chuong" === t ? e.THUNDER_DEF : e.DEFS[t] || null : null;
  };
  e.slotKnown = function (n) {
    var t = e.slotDef(n);
    return !!t && (!e.testMode || !t.medium) && (t.thunder ? e.knownThunder() : e.known(t.id));
  };
  var c = "pntt.thanhChieu.v1";
  var g = null;
  function _(n) {
    var e = {};
    if (n && "object" == typeof n) {
      for (var t in n)
        n[t] && (e[t] = 1);
    }
    return e;
  }
  function f(n) {
    return Array.isArray(n) ? n.slice() : null;
  }
  function m(n) {
    return n < 32 || n >= 127 && n <= 159 || n >= 8203 && n <= 8207 || n >= 8232 && n <= 8238 || n >= 8288 && n <= 8292 || 65279 === n;
  }
  function d(n, t) {
    for (var a = "string" == typeof n ? n : "", o = 0, i = ""; o < a.length; o++)
      i += m(a.charCodeAt(o)) ? " " : a.charAt(o);
    a = i.replace(/\s+/g, " ").replace(/^ | $/g, "");
    return (a = (Array.from ? Array.from(a).slice(0, e.TEN_BO_TOI_DA).join("") : a.slice(0, e.TEN_BO_TOI_DA)).replace(/^ | $/g, "")) || t;
  }
  function p(n, t) {
    var a;
    var o = [];
    if (t && Array.isArray(t.bo)) {
      for (a = 0; a < t.bo.length && o.length < e.BO_TOI_DA; a++) {
        var i = t.bo[a];
        if (i && "object" == typeof i) {
          o.push({ ten: d(i.ten, "Combo " + (o.length + 1)), tat: _(i.tat), an: _(i.an), thuTu: f(i.thuTu) });
        }
      }
    }
    if (!(o.length)) {
      o.push({ ten: "Combo 1", tat: {}, an: {}, thuTu: null });
    }
    n.bo = o;
    var r = t && t.dung;
    n.dung = "number" == typeof r && r >= 0 && r < o.length && r === Math.floor(r) ? r : 0;
    n.loai = {};
    var h = t && t.loai;
    for (a = 0; a < e.LOAI_MUC_TIEU.length; a++) {
      var u = e.LOAI_MUC_TIEU[a];
      var s = h && h[u];
      if ("number" == typeof s && s >= 0 && s < o.length && s === Math.floor(s)) {
        n.loai[u] = s;
      }
    }
    y(n);
  }
  function y(n) {
    var e = n.bo[n.dung];
    if (e) {
      e.tat = _(n.tat);
      e.an = _(n.an);
      e.thuTu = f(n.thuTu);
    }
  }
  function v(n, e) {
    var t = n.bo[e];
    n.tat = _(t.tat);
    n.an = _(t.an);
    n.thuTu = f(t.thuTu);
    n.dung = e;
  }
  function b() {
    return n.Utils && n.Utils.store;
  }
  function k() {
    if (g) {
      return g;
    }
    var e = null;
    var t = b();
    try {
      e = t ? t.get(c, null) : null;
    }
    catch (n) {
      e = null;
    }
    if (g = { tat: {}, an: {}, thuTu: null, t: 0 }, e && "object" == typeof e) {
      if (e.tat && "object" == typeof e.tat) {
        g.tat = e.tat;
      }
      if (e.an && "object" == typeof e.an) {
        g.an = e.an;
      }
      if (Array.isArray(e.thuTu)) {
        g.thuTu = e.thuTu;
      }
      g.t = +e.t || 0;
      p(g, e);
      return g;
    }
    var a = n.Quest && n.Quest.flags;
    if (a) {
      if (a.chieu_tat && "object" == typeof a.chieu_tat) {
        for (var o in a.chieu_tat)
          a.chieu_tat[o] && (g.tat[o] = 1);
      }
      if (Array.isArray(a.chieu_thu_tu)) {
        g.thuTu = a.chieu_thu_tu.slice();
      }
    }
    p(g, null);
    return g;
  }
  function T() {
    var n = b();
    try {
      if (n) {
        n.set(c, { tat: g.tat, an: g.an, thuTu: g.thuTu, t: g.t, bo: g.bo, dung: g.dung, loai: g.loai });
      }
    }
    catch (n) {
    }
  }
  function w() {
    g.t = Math.max(Date.now(), (g.t || 0) + 1);
    y(g);
    T();
    M();
  }
  e.BO_TOI_DA = 6;
  e.TEN_BO_TOI_DA = 14;
  e.LOAI_MUC_TIEU = ["boss", "quai", "nguoi"];
  var x = -1;
  function M() {
    var e = n.Gateway;
    if (e && e.connected && "function" == typeof e.cmd && x !== g.t) {
      x = g.t;
      e.cmd("pref.thanhChieu", { tat: g.tat, an: g.an, thuTu: g.thuTu, t: g.t, bo: g.bo, dung: g.dung, loai: g.loai });
    }
  }
  function S(t) {
    if (e.testMode && "undefined" != typeof document) {
      var a = document.getElementById("skill-test-panel");
      if (a) {
        t = t || n.SceneWorld && n.SceneWorld.player;
        a.classList.remove("hidden");
        for (var o = a.querySelectorAll("[data-test-skill], [data-test-passive]"), i = 0; i < o.length; i++) {
          var r = !e.testPassive && o[i].dataset.testSkill === e.testActive;
          var h = o[i].dataset.testPassive === e.testPassive;
          if (o[i].classList.toggle("active", r || h), o[i].dataset.testPassive) {
            var u = o[i].dataset.testPassive;
            var s = o[i].querySelector("[data-passive-label]");
            var l = t && t.passiveCds && t.passiveCds[u] || 0;
            var c = h && l > 0;
            if (o[i].classList.toggle("cooling", c), s) {
              var g = c ? Math.ceil(l) + "s" : e.PASSIVES[u].short;
              if (s.textContent !== g) {
                s.textContent = g;
              }
            }
          }
        }
      }
    }
  }
  function C(t) {
    if (e.setActive(t)) {
      e.testPassive = null;
      S();
      var a = e.DEFS[t];
      var o = n.SceneWorld;
      if (o && o.player) {
        if (o.player.spellCd = 0, n.VFX && n.VFX.spawnText(o.player.x, o.player.y - 58, "Đang thử: " + a.name, a.colors.glow), "ma_hon_phe" === t && n.VFX.spawnMaHonPhe) {
          var i = 1 === o.player.dir ? -1 : 2 === o.player.dir ? 1 : 0;
          var r = 0 === o.player.dir ? 1 : 3 === o.player.dir ? -1 : 0;
          n.VFX.spawnMaHonPhe(o.player, { x: o.player.x + i * (a.range || 180), y: o.player.y + r * (a.range || 180) }, { colors: a.colors, range: a.range, hitDelay: a.hitDelay });
        }
        if ("nguyet_quang" === t && n.NguyetQuangFX) {
          var h = 1 === o.player.dir ? -1 : 2 === o.player.dir ? 1 : 0;
          var u = 0 === o.player.dir ? 1 : 3 === o.player.dir ? -1 : 0;
          n.NguyetQuangFX.spawn(o.player, { x: o.player.x + h * (.7 * a.range), y: o.player.y + u * (.7 * a.range) }, { colors: a.colors, radius: a.blastR, hitDelay: a.hitDelay });
        }
        if ("kim_quang_cu_kiem" === t && n.KimKiemFX) {
          var s = 1 === o.player.dir ? -1 : 2 === o.player.dir ? 1 : 0;
          var l = 0 === o.player.dir ? 1 : 3 === o.player.dir ? -1 : 0;
          n.KimKiemFX.spawn(o.player, { x: o.player.x + s * (.6 * a.range), y: o.player.y + l * (.6 * a.range) }, { hitDelay: a.hitDelay });
        }
        if ("ngu_sac_than_chuong" === t && n.ThanChuongFX) {
          var c = 1 === o.player.dir ? -1 : 2 === o.player.dir ? 1 : 0;
          var g = 0 === o.player.dir ? 1 : 3 === o.player.dir ? -1 : 0;
          n.ThanChuongFX.spawn(o.player, { x: o.player.x + c * (.7 * a.range), y: o.player.y + g * (.7 * a.range) }, { colors: a.colors, radius: a.blastR, hitDelay: a.hitDelay });
        }
        if ("huyet_buc_chuong" === t && n.VFX.spawnHuyetBuc) {
          var _ = 1 === o.player.dir ? -1 : 2 === o.player.dir ? 1 : 0;
          var f = 0 === o.player.dir ? 1 : 3 === o.player.dir ? -1 : 0;
          n.VFX.spawnHuyetBuc(o.player, { x: o.player.x + _ * (.9 * a.range), y: o.player.y + f * (.9 * a.range) }, { hitDelay: a.hitDelay });
        }
        if ("huyet_liem_tram" === t && n.VFX.spawnHuyetLiem) {
          var m = 1 === o.player.dir ? -1 : 2 === o.player.dir ? 1 : 0;
          var d = 0 === o.player.dir ? 1 : 3 === o.player.dir ? -1 : 0;
          var p = { x: o.player.x + m * (.8 * a.range), y: o.player.y + d * (.8 * a.range) };
          n.VFX.spawnHuyetLiem(o.player, p, { hitDelay: a.hitDelay });
          if (n.VFX.spawnHutHuyet) {
            n.VFX.spawnHutHuyet(o.player, [[p.x, p.y], [p.x + 14, p.y + 10], [p.x - 12, p.y - 8]], 0, a.hitDelay);
          }
        }
        if ("cuu_u_ma_trao" === t && n.VFX.spawnMaTrao) {
          for (var y = 1 === o.player.dir ? -1 : 2 === o.player.dir ? 1 : 0, v = 0 === o.player.dir ? 1 : 3 === o.player.dir ? -1 : 0, b = Math.atan2(v, y), k = [], T = 0; T < 5; T++) {
            var w = b + .5 * (T - 2);
            var x = 70 + T % 2 * 38;
            k.push({ x: o.player.x + Math.cos(w) * x, y: o.player.y + Math.sin(w) * x });
          }
          n.VFX.spawnMaTrao(o.player, k, { colors: a.colors, radius: a.blastR, hitDelay: a.hitDelay });
        }
        if ("phi_long_tai_thien" === t && n.VFX.spawnPhiLong) {
          for (var M = 1 === o.player.dir ? -1 : 2 === o.player.dir ? 1 : 0, C = 0 === o.player.dir ? 1 : 3 === o.player.dir ? -1 : 0, O = Math.atan2(C, M), P = [], A = 0; A < 3; A++) {
            var K = O + .55 * (A - 1);
            var R = 100 + A % 2 * 26;
            P.push({ x: o.player.x + Math.cos(K) * R, y: o.player.y + Math.sin(K) * R * .8 });
          }
          n.VFX.spawnPhiLong(o.player, P, { hitDelay: a.hitDelay });
        }
        if ("tu_anh_phuoc_tien" === t && n.VFX.spawnTuAnhPhuoc) {
          var H = 1 === o.player.dir ? -1 : 2 === o.player.dir ? 1 : 0;
          var I = 0 === o.player.dir ? 1 : 3 === o.player.dir ? -1 : 0;
          n.VFX.spawnTuAnhPhuoc(o.player, { x: o.player.x + H * (.65 * a.range), y: o.player.y + I * (.65 * a.range) }, { variant: e.vuKhiHopLe(a, n) || "bach_loi_tien", hitDelay: a.hitDelay, bindTime: a.effect.time });
        }
        if (a.bienHinh && n.Player && n.Player.giveForm) {
          n.Player.giveForm(o.player, a);
          var V = n.Player.hinhFX ? n.Player.hinhFX(a.id) : null;
          if (V && V.spawnHoaThan) {
            V.spawnHoaThan(o.player, { colors: a.colors });
          }
        }
      }
    }
  }
  function O(t) {
    var a = e.PASSIVES[t];
    if (e.testMode && a) {
      var o = e.testPassive !== t;
      e.testPassive = t;
      var i = n.SceneWorld;
      if (i && i.player) {
        i.player.passiveCds = i.player.passiveCds || {};
        if (o) {
          i.player.passiveCds[t] = 0;
        }
        if (n.VFX) {
          n.VFX.spawnText(i.player.x, i.player.y - 58, "Bị động: " + a.name, a.colors.glow);
          if ("shield" === a.kind && n.VFX.spawnGoldenWard) {
            n.VFX.spawnGoldenWard(i.player.x, i.player.y, a.colors);
          }
          else {
            if ("heal" === a.kind && n.VFX.spawnSpringHeal) {
              n.VFX.spawnSpringHeal(i.player.x, i.player.y, a.colors);
            }
          }
        }
      }
      S(i && i.player);
    }
  }
  e.syncPrefsFromServer = function (n) {
    var e = k();
    var t = n && n.thanh_chieu;
    var a = t && "object" == typeof t ? +t.t || 0 : -1;
    return a >= 0 && a >= e.t ? !(a === e.t && e.t || (p(g = { tat: t.tat && "object" == typeof t.tat ? t.tat : {}, an: t.an && "object" == typeof t.an ? t.an : e.an, thuTu: Array.isArray(t.thuTu) ? t.thuTu : null, t: a }, Array.isArray(t.bo) ? t : e), T(), 0)) : ((e.thuTu || Object.keys(e.tat).length || Object.keys(e.an).length || e.bo.length > 1 || "Combo 1" !== e.bo[0].ten || Object.keys(e.loai).length) && e.t > a && (e.t || (e.t = 1, T()), M()), !1);
  };
  e._reloadPrefs = function () {
    g = null;
  };
  e.hasCustomOrder = function () {
    return !!k().thuTu;
  };
  e.comboDanhSach = function () {
    return k().bo.map(function (n) {
      return n.ten;
    });
  };
  e.comboDung = function () {
    return k().dung;
  };
  e.comboDay = function () {
    return k().bo.length >= e.BO_TOI_DA;
  };
  e.comboTenGoiY = function () {
    for (var n = e.comboDanhSach(), t = 1; t < 100; t++)
      if (n.indexOf("Combo " + t) < 0) {
        return "Combo " + t;
      }
    return "Combo";
  };
  e.comboThem = function (n) {
    var t = k();
    return t.bo.length >= e.BO_TOI_DA ? -1 : (y(t), t.bo.push({ ten: d(n, e.comboTenGoiY()), tat: _(t.tat), an: _(t.an), thuTu: f(t.thuTu) }), t.dung = t.bo.length - 1, w(), t.dung);
  };
  e.comboChuyen = function (n) {
    var e = k();
    return !("number" != typeof n || n !== Math.floor(n) || n < 0 || n >= e.bo.length || n === e.dung || (y(e), v(e, n), w(), 0));
  };
  e.comboDoiTen = function (n, e) {
    var t = k().bo[n];
    if (!t) {
      return !1;
    }
    var a = d(e, t.ten);
    return a !== t.ten && (t.ten = a, w(), !0);
  };
  e.comboXoa = function (n) {
    var e = k();
    if (e.bo.length <= 1 || !e.bo[n]) {
      return !1;
    }
    y(e);
    var t = e.dung;
    for (var a in e.bo.splice(n, 1), t === n ? v(e, Math.min(n, e.bo.length - 1)) : t > n && (e.dung = t - 1), e.loai)
      e.loai[a] === n ? delete e.loai[a] : e.loai[a] > n && e.loai[a]--;
    w();
    return !0;
  };
  e.comboGan = function (n, t) {
    var a = k();
    if (e.LOAI_MUC_TIEU.indexOf(n) < 0) {
      return !1;
    }
    if (-1 === t || null == t) {
      if ("number" != typeof a.loai[n]) {
        return !1;
      }
      delete a.loai[n];
    }
    else {
      if ("number" != typeof t || t !== Math.floor(t) || t < 0 || t >= a.bo.length || a.loai[n] === t) {
        return !1;
      }
      a.loai[n] = t;
    }
    w();
    return !0;
  };
  e.comboDuocGan = function (n) {
    var e = k().loai[n];
    return "number" == typeof e ? e : -1;
  };
  e.comboChoMucTieu = function (n) {
    var t = k();
    var a = t.loai[n];
    return !("number" != typeof a || a === t.dung || a >= t.bo.length) && e.comboChuyen(a);
  };
  e.slotOrder = function () {
    var n;
    var t;
    var a = k().thuTu || [];
    var o = [];
    for (n = 0; n < a.length; n++)
      (t = e.SLOTS.indexOf(a[n])) >= 0 && o.indexOf(t) < 0 && o.push(t);
    for (n = 0; n < e.SLOTS.length; n++)
      o.indexOf(n) < 0 && o.push(n);
    return o;
  };
  e.learnedSlots = function () {
    for (var n = e.slotOrder(), t = [], a = 0; a < n.length; a++)
      e.slotKnown(n[a]) && t.push(n[a]);
    return t;
  };
  e.HOTBAR_MAX = 8;
  e.hotbarSkillVisible = function (n) {
    return !k().an[n];
  };
  e.barSlots = function () {
    for (var n = e.learnedSlots(), t = [], a = 0; a < n.length && t.length < e.HOTBAR_MAX; a++)
      e.hotbarSkillVisible(e.SLOTS[n[a]]) && t.push(n[a]);
    return t;
  };
  e.onBar = function (n) {
    for (var t = e.barSlots(), a = 0; a < t.length; a++)
      if (e.SLOTS[t[a]] === n) {
        return !0;
      }
    return !1;
  };
  e.barFull = function () {
    return e.barSlots().length >= e.HOTBAR_MAX;
  };
  e.setHotbarSkillVisible = function (n, t) {
    if (!n || e.SLOTS.indexOf(n) < 0) {
      return !1;
    }
    if (t && !e.onBar(n) && e.barFull()) {
      return !1;
    }
    var a = k().an;
    if (t) {
      delete a[n];
    }
    else {
      a[n] = 1;
    }
    w();
    return !0;
  };
  e.toggleHotbarSkill = function (n) {
    var t = !e.onBar(n);
    return e.setHotbarSkillVisible(n, t) ? t : null;
  };
  e.hotbarSlots = function () {
    for (var n = e.barSlots(), t = n.slice(), a = e.learnedSlots(), o = 0; o < a.length; o++)
      n.indexOf(a[o]) < 0 && t.push(a[o]);
    return t;
  };
  e.moveHotbar = function (n, t) {
    var a = e.learnedSlots();
    if (t |= 0, (n |= 0) < 0 || n >= a.length || t < 0 || t >= a.length || n === t) {
      return !1;
    }
    var o = a.splice(n, 1)[0];
    a.splice(t, 0, o);
    for (var i = e.slotOrder(), r = 0, h = 0; h < i.length; h++)
      e.slotKnown(i[h]) && (i[h] = a[r++]);
    k().thuTu = i.map(function (n) {
      return e.SLOTS[n];
    });
    w();
    return !0;
  };
  e.resetHotbarOrder = function () {
    return !!k().thuTu && (g.thuTu = null, w(), !0);
  };
  e.hotbarDef = function (n) {
    var t = e.hotbarSlots()[n];
    return void 0 === t ? null : e.slotDef(t);
  };
  e.hotbarIndex = function (n) {
    for (var t = e.hotbarSlots(), a = 0; a < t.length; a++)
      if (e.SLOTS[t[a]] === n) {
        return a;
      }
    return -1;
  };
  e.autoPreferred = function (n) {
    return !k().tat[n];
  };
  e.autoUses = function (n) {
    return e.autoPreferred(n) && e.onBar(n);
  };
  e.setAutoUses = function (n, e) {
    var t = k().tat;
    if (e) {
      delete t[n];
    }
    else {
      t[n] = 1;
    }
    w();
    return !0;
  };
  e.toggleAutoUses = function (n) {
    if (!e.onBar(n)) {
      return null;
    }
    var t = !e.autoPreferred(n);
    e.setAutoUses(n, t);
    return t;
  };
  e.autoRotation = function () {
    for (var n = [], t = e.learnedSlots(), a = 0; a < t.length; a++) {
      var o = e.slotDef(t[a]);
      if (o && !o.playerTargetOnly && e.autoUses(o.id)) {
        n.push(o);
      }
    }
    return n;
  };
  e.ready = function (t, a) {
    return !(!t || !a || !e.weaponAllowed(t, a) || a.bienHinh && n.Player && n.Player.formDef && n.Player.formDef(t) || (a.thunder ? t.thunderCd > 0 : e.dangTreo(t, a) || t.spellCd > 0 || t.spellCds && t.spellCds[a.id] > 0));
  };
  e.dangTreo = function (n, t) {
    if (!(n && t && t.waitForTarget > 0)) {
      return !1;
    }
    for (var a = n.vfxOwner || n, o = 0; o < e.grounds.length; o++) {
      var i = e.grounds[o];
      if (i.def.id === t.id && i.owner === a && !i.ghost && !i.fired) {
        return !0;
      }
    }
    return !1;
  };
  e.huyTreo = function (n, t) {
    if (!(n && t && t.waitForTarget > 0)) {
      return !1;
    }
    for (var a = n.vfxOwner || n, o = e.grounds.length - 1; o >= 0; o--) {
      var i = e.grounds[o];
      if (i.def.id === t.id && i.owner === a && !i.ghost && !i.fired) {
        if (i.vfx) {
          i.vfx.life = 0;
        }
        e.grounds.splice(o, 1);
        return !0;
      }
    }
    return !1;
  };
  e.WEAPON_BOOST_MULT = 1;
  e.WEAPON_NO_BOOST_MULT = .5;
  e.hasBoostWeapon = function (e) {
    if (!e || !e.boostWeapon) {
      return !1;
    }
    var t = n.Inventory;
    if (!t) {
      return !1;
    }
    if (t.owns) {
      return !!t.owns(e.boostWeapon, 1);
    }
    if (t.count && t.count(e.boostWeapon) > 0) {
      return !0;
    }
    var a = t.equipped ? t.equipped("vu_khi") : null;
    return !(!a || a.id !== e.boostWeapon);
  };
  e.damageMultiplier = function (n) {
    return n && n.boostWeapon ? e.hasBoostWeapon(n) ? e.WEAPON_BOOST_MULT : e.WEAPON_NO_BOOST_MULT : 1;
  };
  e.power = function () {
    var e = n.Progress && n.Progress.realmId;
    return n.skillPower ? n.skillPower(e || "pham_nhan") : 3;
  };
  e.powerDmg = function (n, t) {
    return Math.max(1, Math.round((n || 0) * e.power() * (null == t ? 1 : t)));
  };
  e.dmgOf = function (n) {
    return n ? e.powerDmg(n.coef, e.damageMultiplier(n)) : 0;
  };
  e.fullDmgOf = function (n) {
    return n ? e.powerDmg(n.coef, e.WEAPON_BOOST_MULT) : 0;
  };
  e.lifestealOn = function (n) {
    return !!(n && n.lifesteal && e.hasBoostWeapon(n));
  };
  e.lifestealApply = function (t, a, o, i) {
    if (!e.lifestealOn(a) || !t || t.downed || !(t.hpMax > 0) || t.hp >= t.hpMax) {
      return 0;
    }
    var r = a.lifesteal;
    var h = (o || 0) + (i || 0) * (null == r.pvp ? 1 : r.pvp);
    var u = n.Player && n.Player.healMult ? n.Player.healMult(t) : 1;
    var s = Math.round(t.hpMax * Math.min(r.max || 1, (r.pct || 0) * h) * u);
    return (s = Math.min(Math.max(0, s), Math.ceil(t.hpMax - t.hp))) > 0 ? (t.hp = Math.min(t.hpMax, t.hp + s), s) : 0;
  };
  e.HINH_CHUAN = { nhatGiay: 1, giaMau: .5 };
  e.heSoGiayHinh = function (t, a) {
    var o = t && t.bienHinh;
    if (!(o && t.cooldown > 0 && n.KHUNG_CHI_SO)) {
      return 0;
    }
    var i = a && n.KHUNG_CHI_SO[a] ? a : "truc_co_1";
    var r = n.KHUNG_CHI_SO[i].than;
    var h = n.skillPower(i);
    var u = e.HINH_CHUAN;
    var s = o.lifesteal && o.lifesteal.pct || 0;
    return ((o.speed - 1) * o.time / u.nhatGiay + s * r.hpMax * (o.speed / u.nhatGiay) * o.time * u.giaMau / h + (o.giap || 0) * r.bpMax * u.giaMau / h) / t.cooldown;
  };
  e.shotShare = function (n, e, t) {
    e = Math.max(1, 0 | e);
    var a = Math.floor(n / e);
    return a + (t < n - a * e ? 1 : 0);
  };
  e.effectOf = function (n) {
    if (!n || !n.effect) {
      return null;
    }
    var t = e.damageMultiplier(n);
    return function n(a) {
      if (Array.isArray(a)) {
        return a.map(n);
      }
      var o = {};
      for (var i in a)
        o[i] = a[i];
      if (!("burn" !== o.kind && "wound" !== o.kind && "poison" !== o.kind)) {   // Nghịch Tiên: thêm poison
        if ("number" == typeof o.dpsCoef) {
          o.dps = e.powerDmg(o.dpsCoef, t);
        }
        else {
          if ("number" == typeof o.dps) {
            o.dps *= t;
          }
        }
        delete o.dpsCoef;
      }
      return o;
    }(n.effect);
  };
  e.effectApplies = function (n) {
    if (!n || "number" != typeof n.chance) {
      return !0;
    }
    var e = Math.max(0, Math.min(1, n.chance));
    return Math.random() < e;
  };
  e.pickAuto = function (t, a, o) {
    var i = e.autoRotation();
    if (!i.length) {
      return null;
    }
    for (var r = ((0 | o) % i.length + i.length) % i.length, h = 0; h < i.length; h++) {
      var u = (r + h) % i.length;
      var s = i[u];
      var l = s.thunder ? n.CONFIG.THUNDER.RANGE : "aura" === s.shape ? Math.min(s.range, .8 * s.blastR) : s.range;
      if (e.ready(t, s) && !(a > l)) {
        return { def: s, idx: u };
      }
    }
    return null;
  };
  e.coolLeft = function (n, e) {
    if (!n || !e) {
      return 0;
    }
    if (e.thunder) {
      return n.thunderCd > 0 ? n.thunderCd : 0;
    }
    var t = n.spellCds && n.spellCds[e.id] || 0;
    return Math.max(t, n.spellCd > 0 ? n.spellCd : 0);
  };
  e.bindTestPanel = function () {
    if (e.testMode && "undefined" != typeof document) {
      var n = document.getElementById("skill-test-panel");
      if (n && "1" !== n.dataset.bound) {
        n.dataset.bound = "1";
        n.addEventListener("click", function (n) {
          var e = n.target.closest("[data-test-skill], [data-test-passive]");
          if (e) {
            if (e.dataset.testPassive) {
              O(e.dataset.testPassive);
            }
            else {
              C(e.dataset.testSkill);
            }
          }
        });
        document.addEventListener("keydown", function (n) {
          if (!n.repeat) {
            var e = n.target && n.target.tagName;
            if ("INPUT" !== e && "TEXTAREA" !== e && "SELECT" !== e) {
              var t = { Digit3: "hoa_cau", Digit4: "phong_nhan", Digit5: "bang_thau", Digit6: "dia_thich", Digit0: "ma_hon_phe", Minus: "nguyet_quang", Equal: "kim_quang_cu_kiem", Digit9: "ngu_sac_than_chuong", BracketLeft: "huyet_buc_chuong", BracketRight: "huyet_liem_tram", Backslash: "tu_anh_phuoc_tien", Quote: "xich_ma_hoa_than", Semicolon: "kim_cuong_hoa_than", Comma: "cuu_u_ma_trao", Period: "phi_long_tai_thien" };
              var a = { Digit7: "kim_quang_chao", Digit8: "moc_xuan" };
              if ((t[n.code] || a[n.code])) {
                n.preventDefault();
                if (a[n.code]) {
                  O(a[n.code]);
                }
                else {
                  C(t[n.code]);
                }
              }
            }
          }
        });
        S();
      }
    }
  };
  e.bolts = [];
  e.grounds = [];
  e.auras = [];
  e.reset = function () {
    e.bolts.length = 0;
    e.grounds.length = 0;
    e.auras.length = 0;
  };
  e.cast = function (t, a, o, i) {
    if (a.bienHinh) {
      var r = a.bienHinh.fx ? n[a.bienHinh.fx] : null;
      if (r && r.spawnHoaThan) {
        r.spawnHoaThan(t.vfxOwner || t, { colors: a.colors, ghost: !!i });
      }
    }
    else {
      var h = function (e) {
        return window.NTBayCao(e);   // Nghịch Tiên: độ cao theo thú cưỡi
      }(t);
      var u = o.x - t.x;
      var s = o.y - 10 - (t.y - 18 - h);
      var l = Math.sqrt(u * u + s * s) || 1;
      var c = Math.atan2(s, u);
      var g = o.target && !o.target.dead ? o.target : null;
      if ("aura" !== a.shape) {
        if ("ground" === a.shape) {
          var _ = Math.min(l, a.range);
          var f = g ? 0 : a.delay;
          var m = g ? g.x : t.x + Math.cos(c) * _;
          var d = g ? g.y : t.y + Math.sin(c) * _;
          if (a.hitDelay > 0 && (f = a.hitDelay), "kim_thuong_giang_the" === a.vfx && n.VFX.spawnKimThuongGiangThe && n.VFX.spawnKimThuongGiangThe(m, d), "tien_vu" === a.vfx && n.VFX.spawnTienVu && n.VFX.spawnTienVu(m, d, { colors: a.colors, radius: a.blastR }), "ma_bao_an" === a.vfx && n.VFX.spawnMaBaoAn && n.VFX.spawnMaBaoAn(m, d, { colors: a.colors, radius: a.blastR }), "ma_bao_an" === a.vfx && n.VFX.spawnTalismanPaper) {
            var p = t.x + 10 * Math.cos(c);
            var y = t.y - 18 - h + 6 * Math.sin(c);
            var v = m - p;
            var b = d - 22 - y;
            var k = Math.sqrt(v * v + b * b);
            var T = Math.max(.18, Math.min(.34, k / 560));
            var w = { paper: "#eedcff", edge: "#a74bd2", ink: "#541a70", glow: a.colors.glow || "#d27bff" };
            n.VFX.spawnRing(p, y, w.glow, 13, .2);
            n.VFX.spawnTalismanPaper(p, y, m, d, "ma_bao_an", { colors: w, fromLift: 0, toLift: 22, lift: 14, life: T });
          }
          if ("ma_hon_phe" === a.vfx && n.VFX.spawnMaHonPhe && n.VFX.spawnMaHonPhe(t, g || { x: m, y: d }, { colors: a.colors, range: a.range, hitDelay: a.hitDelay, ghost: !!i }), "nguyet_quang" === a.vfx && n.NguyetQuangFX && n.NguyetQuangFX.spawn(t, g || { x: m, y: d }, { colors: a.colors, radius: a.blastR, hitDelay: a.hitDelay, ghost: !!i }), "kim_quang_cu_kiem" === a.vfx && n.KimKiemFX && n.KimKiemFX.spawn(t.vfxOwner || t, g || { x: m, y: d }, { hitDelay: a.hitDelay, ghost: !!i }), "ngu_sac_than_chuong" === a.vfx && n.ThanChuongFX && n.ThanChuongFX.spawn(t, g || { x: m, y: d }, { colors: a.colors, radius: a.blastR, hitDelay: a.hitDelay, ghost: !!i }), "huyet_buc_chuong" === a.vfx && n.VFX.spawnHuyetBuc && n.VFX.spawnHuyetBuc(t.vfxOwner || t, g || { x: m, y: d }, { hitDelay: a.hitDelay, ghost: !!i }), "huyet_liem_tram" === a.vfx && n.VFX.spawnHuyetLiem && n.VFX.spawnHuyetLiem(t.vfxOwner || t, g || { x: m, y: d }, { hitDelay: a.hitDelay, ghost: !!i }), "phi_long_tai_thien" === a.vfx && n.VFX.spawnPhiLong) {
            var x = g ? [g] : [];
            if (e.enemiesNow) {
              x = x.concat(e.blastTargets(a, m, d, e.enemiesNow(), g));
            }
            n.VFX.spawnPhiLong(t.vfxOwner || t, x, { hitDelay: a.hitDelay, point: { x: m, y: d }, ghost: !!i });
          }
          if ("tu_anh_phuoc_tien" === a.vfx && n.VFX.spawnTuAnhPhuoc) {
            n.VFX.spawnTuAnhPhuoc(t.vfxOwner || t, g || { x: m, y: d }, { variant: t.variant || (i ? void 0 : e.vuKhiHopLe(a, n)), hitDelay: a.hitDelay, bindTime: a.effect && a.effect.time, ghost: !!i });
          }
          if ("loi_thuong_quan_dia" === a.vfx && n.HoangLoiFX) {
            n.HoangLoiFX.spawnQuanDia(t.vfxOwner || t, g || { x: m, y: d }, { hitDelay: a.hitDelay, ghost: !!i });
          }
          if ("ngu_loi_thuong_vu" === a.vfx && n.HoangLoiFX) {
            n.HoangLoiFX.spawnThuongVu(t.vfxOwner || t, g || { x: m, y: d }, { hitDelay: a.hitDelay, radius: a.blastR, ghost: !!i });
          }
          var M = "van_kiem_quy_tong" === a.id && !g && a.waitForTarget > 0;
          var S = null;
          if ("van_kiem_quy_tong" === a.vfx && n.VanKiemFX) {
            S = n.VanKiemFX.spawn(t, { x: m, y: d, target: g }, a.hitDelay, a.waitForTarget, a.releaseDelay);
          }
          e.grounds.push({ def: a, owner: t.vfxOwner || t, x: m, y: d, target: g, delay: M ? a.waitForTarget + 1 : f, t: 0, fired: !1, waiting: M, vfx: S, ghost: !!i, life: M ? a.waitForTarget : f + .5 });
          return void n.VFX.spawnRing(t.x, t.y - 6 - h, a.colors.glow, 26, .45);
        }
        var C = t.x + 10 * Math.cos(c);
        var O = t.y - 18 - h + 6 * Math.sin(c);
        var P = (a.spread || 0) * Math.PI / 180;
        var A = !(!g || a.straight);
        if ("thanh_lam_kiem_tru" === a.id && n.VFX.spawnThanhLamKiemTru) {
          var K = Math.min(l, a.range);
          var R = g ? g.x : t.x + Math.cos(c) * K;
          var H = g ? g.y : t.y + Math.sin(c) * K;
          n.VFX.spawnThanhLamKiemTru(R, H, { target: g, angle: Math.atan2(H - t.y, R - t.x), colors: a.colors });
        }
        if ("huyen_am_tram" === a.id && n.HuyenAmTramFX) {
          n.HuyenAmTramFX.phat(t.x, t.y - h, c);   // Nghịch Tiên: Huyền Âm Trảm
        }
        if ("anh_ky_phu" === a.vfx && n.VFX.spawnAnhKyPhu) {
          n.VFX.spawnAnhKyPhu(C, O, g || { x: o.x, y: o.y }, { duration: Math.max(.34, Math.min(.68, l / a.speed)), hitU: .9, range: a.range, layers: a.vfxLayers });
        }
        for (var I = i ? 0 : e.dmgOf(a), V = 0; V < a.shots; V++) {
          var D = c + P * (a.shots > 1 ? V / (a.shots - 1) - .5 : 0);
          var F = Math.random() < .5 ? -1 : 1;
          D += A ? F * (.3 + .32 * Math.random()) : 0;
          var B = A ? .62 * a.speed : a.speed;
          e.bolts.push({ def: a, x: C, y: O, vx: Math.cos(D) * B, vy: Math.sin(D) * B, angle: D, target: g, guided: A, speedNow: B, accel: A ? 2.5 * a.speed : 0, turnRate: A ? 4.8 + 2.2 * Math.random() : 0, spin: Math.random() * Math.PI * 2, elapsed: 0, ghost: !!i, dmg: e.shotShare(I, a.shots, V), wait: "bang_thau" === a.id ? .055 * V : 0, travel: 0, maxTravel: A ? 1.55 * a.range : a.range, trail: 0, life: A ? a.range / B + .65 : a.range / a.speed + .25 });
        }
      }
      else {
        if (e.auras.push({ def: a, owner: t, x: t.x, y: t.y, delay: a.delay || 0, t: 0, fired: !1, ghost: !!i, aim: c, target: g, life: (a.delay || 0) + 1.05 }), n.VFX.spawnRing(t.x, t.y - 6 - h, a.colors.glow, .62 * a.blastR, .55), "tram_ma" === a.vfx && n.VFX.spawnTramMa && e.enemiesNow) {
          for (var X = e.blastTargets(a, t.x, t.y, e.enemiesNow(), null), q = 0; q < X.length; q++)
            n.VFX.spawnTramMa(X[q].x, X[q].y);
        }
        if ("cuu_u_ma_trao" === a.vfx && n.VFX.spawnMaTrao && e.enemiesNow) {
          var L = e.blastTargets(a, t.x, t.y, e.enemiesNow(), null);
          if (L.length) {
            n.VFX.spawnMaTrao(t.vfxOwner || t, L, { colors: a.colors, radius: a.blastR, hitDelay: a.hitDelay, ghost: !!i });
          }
        }
        if ("bang_kiem_luan" === a.vfx && n.VFX.list) {
          var E = n.VFX.list[n.VFX.list.length - 1];
          if (E && "lightring" === E.type) {
            E.renderLayer = 3 === t.dir ? "front" : "back";
          }
        }
      }
    }
  };
  var P = [];
  function A(n, e) {
    var t = (e - n) % (2 * Math.PI);
    if (t > Math.PI) {
      t -= 2 * Math.PI;
    }
    if (t < -Math.PI) {
      t += 2 * Math.PI;
    }
    return t;
  }
  function K(n, e, t, a, o, i, r, h) {
    V(n, e, t);
    if (n.blastR > 0) {
      R(n, a.x, a.y, o, i, n.primaryTarget ? a : null);
    }
    else {
      H(n, a, i, h);
    }
  }
  function R(t, a, o, i, r, h) {
    var u = !1;
    var s = [];
    if (h && !h.dead) {
      H(t, h, r);
      u = !0;
      s.push(h);
    }
    for (var l = e.blastTargets(t, a, o, i, h), c = 0; c < l.length; c++)
      H(t, l[c], r), u = !0, s.push(l[c]);
    if (u && t.lifesteal) {
      (function (t, a) {
        if (!n.Gateway || !n.Gateway.connected) {
          var o = n.SceneWorld && n.SceneWorld.player;
          if (o && e.lifestealOn(t)) {
            for (var i = e.lifestealApply(o, t, a.length, 0), r = [], h = 0; h < a.length && r.length < 5; h++)
              r.push([a[h].x, a[h].y]);
            if (n.VFX.spawnHutHuyet) {
              n.VFX.spawnHutHuyet(o, r, i);
            }
            else {
              if (i > 0 && n.VFX.spawnLifesteal) {
                n.VFX.spawnLifesteal(o.x, o.y, i);
              }
            }
          }
        }
      })(t, s);
    }
    if (!u && ("aura" === t.shape || "ground" === t.shape && t.vfx)) {
      n.VFX.spawnText(a, o - 26, "aura" === t.shape ? "bang_kiem_luan" === t.vfx ? "Băng Kiếm Luân không chạm mục tiêu" : "cuu_u_ma_trao" === t.vfx ? "Ma Trảo không chạm mục tiêu" : "Cửu Huyết Kiếm Trận không chạm mục tiêu" : "kim_thuong_giang_the" === t.vfx ? "Kim Thương giáng hụt" : "tien_vu" === t.vfx ? "Mưa tên trượt mục tiêu" : "ma_bao_an" === t.vfx ? "Ma ấn nổ hụt" : "ma_hon_phe" === t.vfx ? "Ma Hồn Phệ trượt mục tiêu" : "nguyet_quang" === t.vfx ? "Nguyệt Quang trượt mục tiêu" : "kim_quang_cu_kiem" === t.vfx ? "Kim Quang Cự Kiếm trượt mục tiêu" : "ngu_sac_than_chuong" === t.vfx ? "Thần Chưởng đập hụt" : "huyet_buc_chuong" === t.vfx ? "Huyết Bức Chưởng trượt mục tiêu" : "huyet_liem_tram" === t.vfx ? "Huyết Liêm Trảm trượt mục tiêu" : "tu_anh_phuoc_tien" === t.vfx ? "Tứ Ảnh Phược Tiên trượt mục tiêu" : "phi_long_tai_thien" === t.vfx ? "Phi Long trượt mục tiêu" : "loi_thuong_quan_dia" === t.vfx ? "Lôi Thương cắm hụt" : "ngu_loi_thuong_vu" === t.vfx ? "Mưa thương trượt mục tiêu" : "bang_kiem_tran" === t.vfx ? "Băng Kiếm Trận trượt mục tiêu" : "Kiếm trận trượt mục tiêu", t.colors.glow);
    }
  }
  function H(t, a, o, i) {
    if ("number" != typeof i) {
      i = e.dmgOf(t);
    }
    var r = !(!a || !(a.slowT > 0 || a.freezeT > 0));
    if (i > 0 && t.shatterBonus > 0 && r) {
      i = Math.round(i * (1 + t.shatterBonus));
    }
    var h = n.SceneWorld && n.SceneWorld.player;
    var u = i > 0 && e.dealDamage(a, i, o, h);
    var s = function (n, e) {
      if (!(n && e > 0 && "number" == typeof n.mp)) {
        return 0;
      }
      var t = Math.max(0, n.mp);
      n.mp = Math.max(0, t - e);
      return t - n.mp;
    }(a, t.mpDrain);
    I(a, e.effectOf ? e.effectOf(t) : t.effect);
    if (u && t.linhAn && !a.dead) {
      a.linhAnBy = h || null;
      a.linhAnBonus = t.linhAn.bonus;
      a.linhAnUntil = Date.now() + 1e3 * t.linhAn.time;
    }
    if (s > 0) {
      n.VFX.spawnText(a.x, a.y - 36, "-" + Math.round(s) + " Linh Lực", "#8fddff");
    }
  }
  function I(n, t) {
    if (n && t)
      if (Array.isArray(t)) {
        for (var a = 0; a < t.length; a++)
          I(n, t[a]);
      }
      else {
        if (e.effectApplies(t)) {
          if ("burn" === t.kind) {
            n.burnT = Math.max(n.burnT || 0, t.time);
            n.burnDps = t.dps;
            n.burnMa = !!t.ma;
            if (void 0 === n.burnTick) {
              n.burnTick = 1;
            }
          }
          else {
            if ("poison" === t.kind && t.chong > 1) {
              // Nghịch Tiên: độc cộng tầng (Huyền Âm Trảm) — mỗi lần trúng thêm 1 tầng tới t.chong, làm mới thời gian
              n.poisonChong = n.poisonT > 0 ? Math.min(t.chong, (n.poisonChong || 0) + 1) : 1;
              n.poisonT = Math.max(n.poisonT || 0, t.time);
              n.poisonDps = Math.max(1, Math.round((t.dps || 1) * n.poisonChong));
              if (void 0 === n.poisonTick) {
                n.poisonTick = 1;
              }
            }
            else if ("poison" === t.kind) {
              n.poisonT = Math.max(n.poisonT || 0, t.time);
              n.poisonDps = Math.max(n.poisonDps || 0, t.dps || 1);
              if (void 0 === n.poisonTick) {
                n.poisonTick = 1;
              }
            }
            else {
              if ("slow" === t.kind) {
                n.slowT = Math.max(n.slowT || 0, t.time);
                n.slowMult = Math.min(n.slowMult || 1, t.mult);
              }
              else {
                if ("stun" === t.kind) {
                  n.stunT = Math.max(n.stunT || 0, t.time);
                }
                else {
                  if ("root" === t.kind) {
                    n.rootT = Math.max(n.rootT || 0, t.time);
                  }
                  else {
                    if ("wound" === t.kind) {
                      if (!(n.woundT > 0)) {
                        n.woundTick = 1;
                      }
                      n.woundT = Math.max(n.woundT || 0, t.time);
                      n.woundDps = Math.max(n.woundDps || 0, t.dps || 1);
                    }
                    else {
                      if ("freeze" === t.kind) {
                        n.freezeT = Math.max(n.freezeT || 0, t.time);
                        n.stunT = Math.max(n.stunT || 0, t.time);
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
  }
  function V(e, t, a, o, i) {
    if ("huyen_am_tram" === e.id && n.HuyenAmTramFX) {
      n.HuyenAmTramFX.trung(t, a);   // Nghịch Tiên: Huyền Âm Trảm
    }
    else if ("anh_ky_phu" === e.id && n.VFX.spawnAnhKyPhuImpact) {
      n.VFX.spawnAnhKyPhuImpact(t, a);
    }
    else {
      if ("thanh_lam_kiem_tru" === e.id) {
        if (n.VFX.spawnRing) {
          n.VFX.spawnRing(t, a, e.colors.glow, 22, .3);
        }
      }
      else {
        if ("hoa_cau" === e.id) {
          n.VFX.spawnFireBurst(t, a, e.colors);
        }
        else {
          if ("phong_nhan" === e.id) {
            n.VFX.spawnWindBurst(t, a, e.colors);
          }
          else {
            n.VFX.spawnIceBurst(t, a, e.colors);
          }
        }
      }
    }
  }
  function D(e, t, a) {
    n.VFX.spawnRipple(t, a, e.colors.glow);
    for (var o = 0; o < 3; o++)
      n.VFX.spawnEmber(t + (6 * Math.random() - 3), a + (6 * Math.random() - 3), e.colors.mid, e.colors.core);
  }
  e.enemiesNow = function () {
    return P;
  };
  e.update = function (t, a, o) {
    P = a = a || [];
    (function (t, a, o) {
      for (var i = e.bolts.length - 1; i >= 0; i--) {
        var r = e.bolts[i];
        if (r.wait > 0) {
          r.wait -= t;
        }
        else {
          if (r.life -= t, r.spin += 14 * t, r.elapsed += t, r.target && r.target.dead && (r.target = null), r.target && r.guided) {
            var h = Math.atan2(r.target.y - 10 - r.y, r.target.x - r.x);
            var u = A(r.angle, h);
            var s = r.turnRate * t;
            if (Math.abs(u) <= s) {
              r.angle = h;
            }
            else {
              r.angle += u < 0 ? -s : s;
            }
            r.speedNow = Math.min(r.def.speed, r.speedNow + r.accel * t);
            r.vx = Math.cos(r.angle) * r.speedNow;
            r.vy = Math.sin(r.angle) * r.speedNow;
          }
          r.x += r.vx * t;
          r.y += r.vy * t;
          r.travel += Math.sqrt(r.vx * r.vx + r.vy * r.vy) * t;
          r.trail -= t;
          if (r.trail <= 0) {
            r.trail = .035;
            n.VFX.spawnEmber(r.x, r.y, r.def.colors.mid, r.def.colors.core);
          }
          var l = null;
          if (r.target) {
            var c = r.target.x - r.x;
            var g = r.target.y - 10 - r.y;
            if (Math.sqrt(c * c + g * g) <= r.def.hitR + 6) {
              l = r.target;
            }
          }
          else {
            for (var _ = 0; _ < a.length; _++) {
              var f = a[_];
              if (!f.dead) {
                var m = f.x - r.x;
                var d = f.y - 10 - r.y;
                if (Math.sqrt(m * m + d * d) <= r.def.hitR + 6) {
                  l = f;
                  break;
                }
              }
            }
          }
          if (l) {
            if (r.ghost) {
              V(r.def, r.x, r.y, r.target, r.angle);
            }
            else {
              K(r.def, r.x, r.y, l, a, o, r.angle, r.dmg);
            }
            e.bolts.splice(i, 1);
          }
          else {
            if ((r.life <= 0 || r.travel >= r.maxTravel)) {
              D(r.def, r.x, r.y);
              e.bolts.splice(i, 1);
            }
          }
        }
      }
    })(t, a, o);
    (function (t, a, o) {
      for (var i = e.grounds.length - 1; i >= 0; i--) {
        var r = e.grounds[i];
        if (r.t += t, r.waiting) {
          if ((!n.Gateway || !n.Gateway.connected) && !r.ghost && r.owner) {
            for (var h = null, u = 1 / 0, s = 0; s < a.length; s++) {
              var l = a[s];
              if (l && !l.dead) {
                var c = l.x - r.owner.x;
                var g = l.y - r.owner.y;
                var _ = c * c + g * g;
                if (_ <= r.def.range * r.def.range && _ < u) {
                  h = l;
                  u = _;
                }
              }
            }
            if (h) {
              e.releaseVanKiem(r.owner, h, { x: h.x, y: h.y }, r.def.releaseDelay);
            }
          }
          if (r.waiting) {
            if (r.t >= r.life) {
              e.grounds.splice(i, 1);
            }
            continue;
          }
        }
        if (r.fired || !r.target || r.target.dead || (r.x = r.target.x, r.y = r.target.y), !r.fired && r.t >= r.delay) {
          r.fired = !0;
          if ("xich_chan" === r.def.id && n.VFX.spawnXichChan) {
            n.VFX.spawnXichChan(r.x, r.y, { colors: r.def.colors, radius: r.def.blastR });
          }
          else {
            if ("kim_thuong_giang_the" === r.def.vfx || "van_kiem_quy_tong" === r.def.vfx || "tien_vu" === r.def.vfx || "ma_bao_an" === r.def.vfx || "ma_hon_phe" === r.def.vfx || "nguyet_quang" === r.def.vfx || "kim_quang_cu_kiem" === r.def.vfx || "ngu_sac_than_chuong" === r.def.vfx || "huyet_buc_chuong" === r.def.vfx || "loi_thuong_quan_dia" === r.def.vfx || "ngu_loi_thuong_vu" === r.def.vfx || "huyet_liem_tram" === r.def.vfx || "tu_anh_phuoc_tien" === r.def.vfx || "phi_long_tai_thien" === r.def.vfx) {
              if ("ma_bao_an" === r.def.vfx && n.VFX.spawnMaBaoAnImpact) {
                n.VFX.spawnMaBaoAnImpact(r.x, r.y, { colors: r.def.colors, radius: r.def.blastR });
              }
            }
            else {
              if ("bang_kiem_tran" === r.def.vfx && n.VFX.spawnBangKiemTran) {
                n.VFX.spawnBangKiemTran(r.x, r.y, { colors: r.def.colors, radius: r.def.blastR });
              }
              else {
                if (r.def.vfx && n.VFX.spawnSwordFormation) {
                  n.VFX.spawnSwordFormation(r.x, r.y, { animation: r.def.vfx, colors: r.def.colors, radius: r.def.blastR });
                }
                else {
                  n.VFX.spawnEarthSpikes(r.x, r.y, r.def.blastR, r.def.colors);
                }
              }
            }
          }
          var f = "nguyet_quang" === r.def.vfx || "ngu_sac_than_chuong" === r.def.vfx;
          var m = "kim_quang_cu_kiem" === r.def.vfx;
          var d = "phi_long_tai_thien" === r.def.vfx;
          if (m && n.Audio && n.Audio.atPoint) {
            n.Audio.atPoint("skill_goldsword_hit", r.x, r.y, { gain: 1, rate: .96 + .08 * Math.random() });
          }
          if (r.ghost) {
            if (!(f)) {
              n.Camera.shakeAt(r.x, r.y, m ? 7 : d ? 6 : 4, m ? .34 : d ? .3 : .22);
            }
          }
          else {
            if (!(f)) {
              n.Camera.shake(m ? 7 : d ? 6 : 4, m ? .34 : d ? .3 : .22);
            }
            if ("van_kiem_quy_tong" === r.def.id) {
              if (r.target && !r.target.dead) {
                H(r.def, r.target, o);
              }
            }
            else {
              R(r.def, r.x, r.y, a, o, r.target);
            }
          }
        }
        if (r.t >= r.life) {
          e.grounds.splice(i, 1);
        }
      }
    })(t, a, o);
    (function (t, a, o) {
      for (var i = e.auras.length - 1; i >= 0; i--) {
        var r = e.auras[i];
        if (r.t += t, r.owner && !r.fired && (r.x = r.owner.x, r.y = r.owner.y), !r.fired && r.t >= r.delay) {
          if (r.fired = !0, "cuu_huyet_tran" === r.def.vfx && n.VFX.spawnCuuHuyetTran) {
            n.VFX.spawnCuuHuyetTran(r.x, r.y, { colors: r.def.colors, radius: r.def.blastR });
          }
          else if ("bang_kiem_luan" === r.def.vfx && n.VFX.spawnBangKiemLuan) {
            var h = e.blastTargets(r.def, r.x, r.y, a, null);
            n.VFX.spawnBangKiemLuan(r.x, r.y, { colors: r.def.colors, radius: r.def.blastR, dir: r.owner && r.owner.dir, aim: r.aim, targets: h });
          }
          if (r.ghost) {
            n.Camera.shakeAt(r.x, r.y, 5, .24);
          }
          else {
            n.Camera.shake(5, .24);
            R(r.def, r.x, r.y, a, o);
          }
        }
        if (r.t >= r.life) {
          e.auras.splice(i, 1);
        }
      }
    })(t, a, o);
    (function (t, a, o) {
      for (var i = 0; i < a.length; i++) {
        var r = a[i];
        var h = r.burnT > 0;
        var u = r.poisonT > 0;
        var s = r.freezeT > 0;
        var l = r.stunT > 0 && !s;
        e.tickStatus(r, t, function (n) {
          e.dealDamage(r, n, o);
        });
        if (!(r.dead)) {
          if (l && Math.random() < 9 * t) {
            n.VFX.spawnEmber(r.x + (14 * Math.random() - 7), r.y - 22, "#f0d27a", "#fff3c4");
          }
          if (h && Math.random() < 16 * t) {
            n.VFX.spawnEmber(r.x + (10 * Math.random() - 5), r.y - 6 - 12 * Math.random(), "#ff9a3c", "#fff3c4");
          }
          if (u && Math.random() < 10 * t) {
            n.VFX.spawnEmber(r.x + (12 * Math.random() - 6), r.y - 8 - 12 * Math.random(), "#58bd5c", "#d7ff9a");
          }
        }
      }
    })(t, a, o);
  };
  e.releaseVanKiem = function (t, a, o, i) {
    if (!t) {
      return !1;
    }
    for (var r = e.grounds.length - 1; r >= 0; r--) {
      var h = e.grounds[r];
      if (h.waiting && h.owner === t && "van_kiem_quy_tong" === h.def.id) {
        var u = a && !a.dead ? a.x : o && o.x;
        var s = a && !a.dead ? a.y : o && o.y;
        if (!Number.isFinite(u) || !Number.isFinite(s)) {
          return !1;
        }
        var l = i > 0 ? i : h.def.releaseDelay || 1.15;
        h.target = a && !a.dead ? a : null;
        h.x = u;
        h.y = s;
        h.waiting = !1;
        h.delay = h.t + l;
        h.life = h.delay + .55;
        if (h.vfx && n.VanKiemFX && n.VanKiemFX.release) {
          n.VanKiemFX.release(h.vfx, h.target, { x: u, y: s }, l);
        }
        return !0;
      }
    }
    return !1;
  };
  e.blastTargets = function (n, e, t, a, o) {
    for (var i = [], r = 0; r < a.length; r++) {
      var h = a[r];
      if (!h.dead && h !== o) {
        var u = h.x - e;
        var s = h.y - t;
        var l = u * u + s * s;
        if (!(Math.sqrt(l) > n.blastR)) {
          i.push({ enemy: h, d2: l });
        }
      }
    }
    if (n.maxTargets) {
      i.sort(function (n, e) {
        return n.d2 - e.d2;
      });
      i.length = Math.min(i.length, n.maxTargets);
    }
    for (var c = [], g = 0; g < i.length; g++)
      c.push(i[g].enemy);
    return c;
  };
  e.dealDamage = function (e, t, a, o) {
    if (!n.SceneWorld || !n.SceneWorld.requestHit) {
      return !1;
    }
    var i = e && e.hp;
    n.SceneWorld.requestHit(e, t, a, o);
    return !!(e && "number" == typeof i && e.hp < i);
  };
  e.applyEffect = I;
  e.tickStatus = function (n, e, t) {
    if (n.dead) {
      n.burnT = n.poisonT = n.slowT = n.stunT = n.freezeT = n.woundT = n.rootT = 0;
      return void (n.burnMa = !1);
    }
    if (n.rootT > 0) {
      n.rootT = Math.max(0, n.rootT - e);
    }
    if (n.woundT > 0) {
      n.woundT -= e;
      n.woundTick = (n.woundTick || 0) - e;
      if (n.woundTick <= 0) {
        n.woundTick += 1;
        if (t) {
          t(n.woundDps || 1, "wound");
        }
      }
      if (n.woundT <= 0) {
        n.woundT = 0;
        n.woundDps = 0;
        n.woundTick = 1;
      }
    }
    if (n.slowT > 0) {
      n.slowT -= e;
      if (n.slowT <= 0) {
        n.slowT = 0;
        n.slowMult = 1;
      }
    }
    if (n.stunT > 0) {
      n.stunT = Math.max(0, n.stunT - e);
    }
    if (n.freezeT > 0) {
      n.freezeT = Math.max(0, n.freezeT - e);
    }
    if (n.burnT > 0) {
      n.burnT -= e;
      n.burnTick -= e;
      if (n.burnTick <= 0) {
        n.burnTick = 1;
        if (t) {
          t(n.burnDps || 1, "burn");
        }
      }
      if (n.burnT <= 0) {
        n.burnT = 0;
        n.burnMa = !1;
      }
    }
    if (n.poisonT > 0) {
      n.poisonT -= e;
      n.poisonTick = (n.poisonTick || 0) - e;
      if (n.poisonTick <= 0) {
        n.poisonTick += 1;
        if (t) {
          t(n.poisonDps || 1, "poison");
        }
      }
      if (n.poisonT <= 0) {
        n.poisonT = 0;
        n.poisonDps = 0;
        n.poisonChong = 0;
        n.poisonTick = 1;
      }
    }
  };
  e.draw = function (t, a, o) {
    for (var i = n.Pixel, r = n.Utils, h = 0; h < e.bolts.length; h++) {
      var u = e.bolts[h];
      if (!(u.wait > 0)) {
        var s = Math.round(u.x - a);
        var l = Math.round(u.y - o);
        var c = u.def.colors;
        if ("huyen_am_tram" === u.def.id && n.HuyenAmTramFX) {
          n.HuyenAmTramFX.veDan(t, u, s, l);   // Nghịch Tiên: Huyền Âm Trảm
        }
        else if ("anh_ky_phu" !== u.def.id && "thanh_lam_kiem_tru" !== u.def.id)
          if ("hoa_cau" === u.def.id) {
            var g = 1 + .14 * Math.sin(u.spin);
            var _ = 1 + .1 * Math.sin(.72 * u.spin + .8);
            i.ellipse(t, s, l, 10 * g, 8 * g, r.alpha(c.edge, .32), null);
            i.ellipse(t, s, l, 8 * g, 7 * g, r.alpha(c.glow, .48), null);
            i.ellipse(t, s, l, 5 * _, 5 * _, c.mid, c.edge);
            i.ellipse(t, s - 1, l - 1, 3, 3, c.core, null);
            i.dot(t, s - 2, l - 2, "#ffffff");
            for (var f = u.angle + Math.PI, m = 0; m < 5; m++) {
              var d = f + .3 * (m - 2) + .16 * Math.sin(u.spin + m);
              var p = 7 + (2 === m ? 5 : m % 2 ? 2 : 0);
              i.dot(t, s + Math.cos(d) * p, l + Math.sin(d) * p, r.alpha(c.glow, .85));
              i.dot(t, s + Math.cos(d) * (p - 3), l + Math.sin(d) * (p - 3), c.mid);
            }
            for (var y = 0; y < 4; y++) {
              var v = .28 * u.spin + y * Math.PI / 2;
              i.dot(t, s + 7 * Math.cos(v) * g, l + 5 * Math.sin(v) * g, r.alpha(c.glow, .72));
            }
          }
          else if ("phong_nhan" === u.def.id) {
            var b = u.angle + Math.PI / 2;
            var k = Math.cos(u.angle);
            var T = Math.sin(u.angle);
            var w = Math.cos(b);
            var x = Math.sin(b);
            var M = 1 + .08 * Math.sin(1.35 * u.spin);
            i.ellipse(t, s - 1.5 * k, l - 1.5 * T, 8 * M, 9 * M, r.alpha(c.glow, .12), null);
            for (var S = 0; S < 5; S++) {
              var C = 2.2 * (S - 2);
              var O = Math.sin(1.1 * u.spin + 2.2 * S) * (1.2 + .22 * S);
              var P = s - k * (5 + S) + w * C;
              var A = l - T * (5 + S) + x * C;
              var K = s - k * (15 + 3 * S) + w * (C + O);
              var R = l - T * (15 + 3 * S) + x * (C + O);
              i.line(t, P, A, K, R, r.alpha(2 === S ? c.mid : c.glow, 2 === S ? .72 : .42));
              if (2 === S) {
                i.dot(t, K, R, r.alpha(c.core, .55));
              }
            }
            for (var H = 0; H < 2; H++) {
              var I = s - k * (9 + 5 * H);
              var V = l - T * (9 + 5 * H);
              var D = 4 + 2 * H + 1.2 * Math.sin(u.spin + H);
              i.line(t, I - w * D, V - x * D, I + w * D, V + x * D, r.alpha(c.core, .34 - .08 * H));
            }
            for (var F = -5; F <= 5; F++) {
              var B = F / 5;
              var X = 6 * (1 - B * B);
              var q = s + w * F * 1.75 + k * X;
              var L = l + x * F * 1.75 + T * X;
              i.dot(t, q - 2 * k, L - 2 * T, r.alpha(c.edge, .86 - .28 * Math.abs(B)));
              i.dot(t, q, L, Math.abs(F) < 4 ? c.core : c.mid);
              if (Math.abs(F) < 3) {
                i.dot(t, q + k, L + T, r.alpha("#ffffff", .92));
              }
            }
            i.dot(t, s + 7 * k, l + 7 * T, "#ffffff");
          }
          else {
            var E = Math.cos(u.angle);
            var N = Math.sin(u.angle);
            var Q = (w = -N, x = E, M = 1 + .1 * Math.sin(1.45 * u.spin), s + 6 * E);
            var G = l + 6 * N;
            var U = s - 6 * E;
            var W = l - 6 * N;
            i.ellipse(t, s - 2 * E, l - 2 * N, 8 * M, 3 * M, r.alpha(c.glow, .2), null);
            i.line(t, U - 5 * E, W - 5 * N, U + 1 * E, W + 1 * N, r.alpha(c.edge, .52));
            i.fatLine(t, U, W, Q, G, 3, r.alpha(c.edge, .9));
            i.fatLine(t, U, W, Q, G, 1, c.mid);
            i.line(t, U + 1.5 * w, W + 1.5 * x, Q - 1.2 * E + 1.5 * w, G - 1.2 * N + 1.5 * x, r.alpha(c.core, .8));
            i.dot(t, Q, G, c.core);
            i.dot(t, Q - E, G - N, "#ffffff");
            for (var j = 0; j < 3; j++)
              d = .55 * u.spin + j * Math.PI * 2 / 3, i.dot(t, s + 6 * Math.cos(d), l + 3 * Math.sin(d), r.alpha(c.core, .58));
          }
      }
    }
    for (var z = 0; z < e.grounds.length; z++) {
      var Y = e.grounds[z];
      if (!Y.fired && "nguyet_quang" !== Y.def.vfx && "kim_quang_cu_kiem" !== Y.def.vfx && "ngu_sac_than_chuong" !== Y.def.vfx && "huyet_buc_chuong" !== Y.def.vfx && "huyet_liem_tram" !== Y.def.vfx && "tu_anh_phuoc_tien" !== Y.def.vfx && "phi_long_tai_thien" !== Y.def.vfx) {
        var $ = Math.round(Y.x - a);
        var J = Math.round(Y.y - o);
        var Z = Y.delay > 0 ? Math.min(1, Y.t / Y.delay) : 1;
        var nn = 6 + Z * (Y.def.blastR - 6);
        i.ellipse(t, $, J, nn, Math.max(1, .45 * nn), null, r.alpha(Y.def.colors.glow, .35 + .45 * Z));
        for (var en = 0; en < 4; en++) {
          var tn = en * Math.PI / 2 + .4;
          i.line(t, $, J, $ + Math.cos(tn) * nn * .8, J + Math.sin(tn) * nn * .36, r.alpha(Y.def.colors.edge, .6 * Z));
        }
      }
    }
  };
  e.bindTestPanel();
}(window.PNTT);
