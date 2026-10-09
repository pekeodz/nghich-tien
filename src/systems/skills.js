!function (n) {
  "use strict";
  var a = n.Skills = {};
  var e = void 0 !== window.location ? window.location : null;
  var t = !!e && ("localhost" === e.hostname || "127.0.0.1" === e.hostname || "[::1]" === e.hostname || "::1" === e.hostname);
  a.testMode = !(!t || !/(?:^|[?&])skilltest=1(?:&|$)/.test(e.search || ""));
  var o = e && (e.search || "").match(/(?:^|[?&])skill=([^&]+)/);
  function i(n, a) {
    return !(!a || !n.Inventory) && (n.Inventory.owns ? n.Inventory.owns(a.book, 1) : n.Inventory.has(a.book, 1));
  }
  function r(n, e) {
    if (a.testMode) {
      return !0;
    }
    var t = e.sp || 0;
    return !((n.sp || 0) < t || (n.sp -= t, 0));
  }
  function h(n, a, e) {
    var t = n.biDongFx || (n.biDongFx = []);
    if (t.length >= 8) {
      t.shift();
    }
    var o = { s: a };
    if (e) {
      for (var i in e)
        o[i] = e[i];
    }
    t.push(o);
  }
  function u(n) {
    return n.passiveCds || (n.passiveCds = {});
  }
  function s(n, a) {
    return Math.max(0, Math.floor((n || 0) - (a || 0)));
  }
  function c(a, e) {
    var t = n.Player && n.Player.healMult ? n.Player.healMult(a) : 1;
    var o = Math.min(Math.round(e * t), s(a.hpMax, a.hp));
    if (o > 0) {
      a.hp += o;
    }
    return o > 0 ? o : 0;
  }
  a.testActive = o ? decodeURIComponent(o[1]) : "hoa_cau";
  a.testPassive = null;
  a.DEFS = { hoa_cau: { id: "hoa_cau", short: "Hỏa Cầu", name: "Hỏa Cầu Thuật", book: "bi_tich_hoa_cau", element: "Hỏa", glyph: "✹", shape: "bolt", cooldown: 6, cast: .4, mp: 14, sp: 4, range: 124, speed: 138, shots: 1, spread: 0, coef: 1.8, hitR: 13, blastR: 22, effect: { kind: "burn", time: 3, dpsCoef: .15 }, colors: { core: "#fff3c4", mid: "#ff9a3c", edge: "#d63b1f", glow: "#ffd27a" }, tip: "Đạn lửa nổ diện rộng, thiêu đốt 3 giây sau khi trúng." }, phong_nhan: { id: "phong_nhan", short: "Phong Nhẫn", name: "Phong Nhẫn Thuật", book: "bi_tich_phong_nhan", element: "Phong", glyph: "⟩", shape: "bolt", cooldown: 3.4, cast: .22, mp: 9, sp: 3, range: 112, speed: 246, shots: 3, spread: 26, coef: 1.7, hitR: 9, blastR: 0, effect: null, colors: { core: "#f2fff6", mid: "#9ff0c8", edge: "#3d9e77", glow: "#cdf5e0" }, tip: "Ba lưỡi gió toả nan quạt, thi triển nhanh, khó né." }, bang_thau: { id: "bang_thau", short: "Băng Châm", name: "Băng Thấu Châm", book: "bi_tich_bang_thau", element: "Băng", glyph: "❊", shape: "bolt", cooldown: 5, cast: .3, mp: 13, sp: 5, range: 104, speed: 208, shots: 5, spread: 18, coef: 1.7, hitR: 8, blastR: 0, effect: { kind: "slow", time: 3.2, mult: .5 }, colors: { core: "#f4fdff", mid: "#a9e4ff", edge: "#2f7fb8", glow: "#cdf1ff" }, tip: "Năm đinh băng găm liên tiếp, mục tiêu chậm còn một nửa trong 3 giây." }, dia_thich: { id: "dia_thich", short: "Địa Thích", name: "Địa Thích Thuật", book: "bi_tich_dia_thich", element: "Thổ", glyph: "⩕", shape: "ground", cooldown: 7.5, cast: .42, mp: 16, sp: 6, range: 92, speed: 0, shots: 1, spread: 0, coef: 1.8, hitR: 0, blastR: 28, delay: .35, instantOnPress: !0, effect: { kind: "stun", time: 1.3 }, colors: { core: "#e0cba0", mid: "#a97b4a", edge: "#5b3d22", glow: "#c9a45c" }, tip: "Cọc đá trồi lên từ góc khuất, gây choáng 1.3 giây." }, xich_chan: { id: "xich_chan", short: "Xích Chân", name: "Sơ Xích Chân", book: "bi_tich_so_xich_chan", element: "Thổ", glyph: "✣", shape: "ground", cooldown: 12, cast: .42, mp: 12, sp: 4, range: 132, speed: 0, shots: 1, spread: 0, coef: .7, hitR: 0, blastR: 54, delay: .18, primaryTarget: !0, maxTargets: 1, playerTargetOnly: !0, effect: { kind: "root", time: 2 }, colors: { core: "#fff0dc", mid: "#d84b3f", edge: "#541326", glow: "#ff7267" }, tip: "Kết ấn dưới chân một người chơi trong tầm, trói tối đa 2 người suốt 2 giây. Người bị xích vẫn đánh và thi triển chiêu được; sát thương nhẹ." }, ngu_kiem_sat: { id: "ngu_kiem_sat", short: "Ngũ Kiếm Sát", name: "Ngũ Kiếm Sát", book: "bi_tich_ngu_kiem_sat", element: "Kim", glyph: "✦", shape: "ground", medium: !0, boostWeapon: "huyet_kiem", maxTargets: 4, cooldown: 8.5, cast: .48, mp: 20, sp: 8, range: 118, speed: 0, shots: 1, spread: 0, coef: 5.2, hitR: 0, blastR: 38, delay: .12, vfx: "skill1", effect: null, colors: { core: "#fff2ff", mid: "#bca8ff", edge: "#5c3f9b", glow: "#d8c8ff" }, tip: "Năm kiếm ảnh đồng loạt khóa tâm trận, chém quét tối đa 4 mục tiêu. Có Huyết Kiếm trong hành trang: sát thương đầy đủ; thiếu pháp khí: còn 50%." }, huyet_kiem_tran: { id: "huyet_kiem_tran", short: "Huyết Kiếm Trận", name: "Huyết Kiếm Trận", book: "bi_tich_huyet_kiem_tran", element: "Huyết", glyph: "✣", shape: "ground", medium: !0, boostWeapon: "huyet_kiem", maxTargets: 4, cooldown: 10, cast: .52, mp: 24, sp: 10, range: 126, speed: 0, shots: 1, spread: 0, coef: 5.6, hitR: 0, blastR: 46, delay: .16, vfx: "luojian", effect: null, colors: { core: "#fff0ef", mid: "#ff5361", edge: "#8d1528", glow: "#ff8190" }, tip: "Huyết kiếm liên tiếp cắm xuống đất, chấn động và gây sát thương lên tối đa 4 mục tiêu. Có Huyết Kiếm trong hành trang: sát thương đầy đủ; thiếu pháp khí: còn 50%." }, van_kiem_quy_tong: { id: "van_kiem_quy_tong", short: "Vạn Kiếm Quy Tông", name: "Vạn Kiếm Quy Tông", book: "bi_tich_van_kiem_quy_tong", element: "Kiếm", glyph: "✺", medium: !0, dao: "chinh", requireRealm: "truc_co_2", thuongPham: !0, shape: "ground", cooldown: 12, cast: .65, mp: 35, sp: 15, range: 220, speed: 0, shots: 1, spread: 0, coef: 9, hitR: 0, blastR: 0, delay: 2.6, hitDelay: 2.6, waitForTarget: 60, releaseDelay: 1.15, vfx: "van_kiem_quy_tong", effect: null, colors: { core: "#edffff", mid: "#88dbde", edge: "#316979", glow: "#a8f5ee" }, tip: "Triệu hồi 24 binh khí chân khí xoay quanh người tối đa 60 giây để chờ mục tiêu hợp lệ, rồi cùng lao đúng vào mục tiêu. Mỗi lúc chỉ một lượt kiếm: đánh xong mới gọi được lượt mới. Hình và màu theo kiếm, đao hoặc thương tương thích đang trang bị; trang bị khác dùng hình Thiết Kiếm. Hào quang là hiệu ứng thị giác, không cấp miễn thương." }, cuu_huyet_kiem_tran: { id: "cuu_huyet_kiem_tran", short: "Cửu Huyết Kiếm Trận", name: "Cửu Huyết Kiếm Trận", book: "bi_tich_cuu_huyet_tran", element: "Huyết", glyph: "✥", shape: "aura", medium: !0, boostWeapon: "huyet_kiem", cooldown: 12, cast: .6, mp: 28, sp: 12, range: 96, speed: 0, shots: 1, spread: 0, coef: 6.5, hitR: 0, blastR: 96, maxTargets: 5, delay: .18, lifesteal: { pct: .01, max: .05, pvp: .5 }, vfx: "cuu_huyet_tran", effect: null, colors: { core: "#fff0fb", mid: "#e98cff", edge: "#711a70", glow: "#ff6fbd" }, tip: "Chín kiếm huyết ảnh xoay quanh bản thân, gây sát thương lên tối đa 5 đối phương gần nhất, mỗi kẻ trúng hồi 1% Khí Huyết tối đa (tối đa 5%). Có Huyết Kiếm trong hành trang: sát thương đầy đủ và hút huyết; thiếu pháp khí: còn 50%, không hút huyết." }, kim_thuong_giang_the: { id: "kim_thuong_giang_the", short: "Kim Thương", name: "Kim Thương Giáng Thế", book: "bi_tich_kim_thuong_giang_the", legacyBook: "hoa_kim_thuong", element: "Hỏa", glyph: "⇓", icon: "bi_tich_kim_thuong_giang_the", shape: "ground", medium: !0, boostWeapon: "hoa_kim_thuong", maxTargets: 4, cooldown: 12, cast: .5, mp: 30, sp: 12, range: 132, speed: 0, shots: 1, spread: 0, coef: 5.6, hitR: 0, blastR: 130, delay: .2, hitDelay: 1.15, vfx: "kim_thuong_giang_the", effect: [{ kind: "burn", time: 4, dpsCoef: .45 }, { kind: "stun", time: .8 }], colors: { core: "#fff8d8", mid: "#ff9a3a", edge: "#8a2a12", glow: "#ffb45c" }, tip: "Hoả Kim Thương từ trời giáng xuống điểm ngắm: nổ lửa diện rộng, thiêu đốt 4 giây và choáng 0,8 giây. Có Hoả Kim Thương trong hành trang: sát thương đầy đủ; thiếu pháp khí: còn 50%." }, loi_thuong_quan_dia: { id: "loi_thuong_quan_dia", short: "Quán Địa", name: "Lôi Thương Quán Địa", book: "bi_tich_loi_thuong_quan_dia", element: "Lôi", glyph: "⇓", icon: "bi_tich_loi_thuong_quan_dia", shape: "ground", medium: !0, thuongPham: !0, requireRealm: "truc_co_2", boostWeapon: "hoang_loi_thuong", maxTargets: 3, cooldown: 9, cast: .5, mp: 30, sp: 12, range: 150, speed: 0, shots: 1, spread: 0, coef: 6.3, hitR: 0, blastR: 56, delay: .3, hitDelay: .3, vfx: "loi_thuong_quan_dia", effect: { kind: "stun", time: 1 }, colors: { core: "#fffbe0", mid: "#ffd92e", edge: "#9a5a08", glow: "#ffe680" }, tip: "Thương sét từ trời cắm xuống điểm ngắm, nổ lôi quang trúng tối đa 3 kẻ và làm choáng 1 giây. Cần Trúc Cơ Trung Kỳ. Có Hoàng Lôi Thương trong hành trang: sát thương đầy đủ; thiếu pháp khí: còn 50%." }, ngu_loi_thuong_vu: { id: "ngu_loi_thuong_vu", short: "Thương Vũ", name: "Ngũ Lôi Thương Vũ", book: "bi_tich_ngu_loi_thuong_vu", element: "Lôi", glyph: "⇊", icon: "bi_tich_ngu_loi_thuong_vu", shape: "ground", medium: !0, thuongPham: !0, requireRealm: "truc_co_2", boostWeapon: "hoang_loi_thuong", maxTargets: 5, cooldown: 14, cast: .6, mp: 36, sp: 14, range: 170, speed: 0, shots: 1, spread: 0, coef: 9.8, hitR: 0, blastR: 84, delay: 1, hitDelay: 1, vfx: "ngu_loi_thuong_vu", effect: { kind: "slow", time: 3.5, mult: .45 }, colors: { core: "#fffbe0", mid: "#ffd92e", edge: "#7a4ad8", glow: "#ffe680" }, tip: "Năm thương sét lần lượt giáng quanh điểm ngắm, cây cuối cắm đúng tâm: trúng tối đa 5 kẻ và làm chậm còn 45% trong 3,5 giây. Cần Trúc Cơ Trung Kỳ. Có Hoàng Lôi Thương trong hành trang: sát thương đầy đủ; thiếu pháp khí: còn 50%." }, thanh_lam_kiem_tru: { id: "thanh_lam_kiem_tru", short: "Thanh Băng Kiếm Trụ", name: "Thanh Băng Kiếm Trụ", book: "bi_tich_thanh_lam_kiem_tru", element: "Kim", glyph: "⚔", shape: "bolt", vfx: "thanh_bang_kiem_tru", medium: !0, boostWeapon: "bang_linh_kiem", cooldown: 8, cast: .38, mp: 15, sp: 6, range: 128, speed: 270, shots: 1, spread: 0, coef: 5.2, hitR: 12, blastR: 36, maxTargets: 2, primaryTarget: !0, effect: null, colors: { core: "#efffff", mid: "#67d9ee", edge: "#1764b1", glow: "#8defff" }, tip: "Triệu hồi mưa kiếm băng, gây sát thương lên mục tiêu chính rồi lan thêm tối đa 2 đối thủ. Có Băng Linh Kiếm trong hành trang: sát thương đầy đủ; thiếu pháp khí: còn 50%." }, anh_ky_phu: { id: "anh_ky_phu", short: "Ảnh Kỵ", name: "Ảnh Kỵ", book: "bi_tich_anh_ky_phu", element: "Phù", glyph: "♞", icon: "bi_tich_anh_ky_phu", shape: "bolt", medium: !0, cooldown: 9, cast: .44, mp: 18, sp: 7, range: 192, speed: 250, shots: 1, spread: 0, coef: 6, hitR: 13, blastR: 0, mpDrain: 4, vfx: "anh_ky_phu", vfxLayers: 3, effect: { kind: "stun", time: 1.3, chance: .5 }, colors: { core: "#f2ffff", mid: "#55cfff", edge: "#2457a4", glow: "#9cecff" }, tip: "Kỵ ảnh xanh lao tới mục tiêu, gây sát thương, rút 4 Linh Lực và có 50% cơ hội làm choáng 1,3 giây." }, bang_kiem_tran: { id: "bang_kiem_tran", short: "Băng Kiếm Trận", name: "Băng Kiếm Trận", book: "bi_tich_bang_kiem_tran", element: "Băng", glyph: "❄", icon: "bi_tich_bang_kiem_tran", shape: "ground", medium: !0, boostWeapon: "bang_linh_kiem", cooldown: 11, cast: .54, mp: 26, sp: 11, range: 136, speed: 0, shots: 1, spread: 0, coef: 5, hitR: 0, blastR: 66, shatterBonus: .2, maxTargets: 4, delay: .22, vfx: "bang_kiem_tran", effect: [{ kind: "freeze", time: 1.2 }, { kind: "slow", time: 3.6, mult: .45 }], colors: { core: "#f4ffff", mid: "#55cfff", edge: "#1764b1", glow: "#a9efff" }, tip: "Dựng trận kiếm băng tại điểm ngắm, gây sát thương lên tối đa 4 mục tiêu, đóng băng 1,2 giây rồi làm chậm còn 45% trong 3,6 giây. Mục tiêu đã Chậm hoặc Đóng Băng chịu thêm 20% sát thương Băng Vỡ. Có Băng Linh Kiếm trong hành trang: sát thương đầy đủ; thiếu pháp khí: còn 50%." }, bang_kiem_luan: { id: "bang_kiem_luan", short: "Băng Kiếm Luân", name: "Băng Kiếm Luân", book: "bi_tich_bang_kiem_luan", element: "Băng", glyph: "✥", icon: "bi_tich_bang_kiem_luan", shape: "aura", medium: !0, boostWeapon: "bang_linh_kiem", cooldown: 10, cast: .72, mp: 22, sp: 9, range: 246, speed: 0, shots: 1, spread: 0, coef: 4.9, hitR: 0, blastR: 246, maxTargets: 5, delay: .16, vfx: "bang_kiem_luan", effect: { kind: "slow", time: 4, mult: .55 }, colors: { core: "#f5ffff", mid: "#46c9ff", edge: "#1453ae", glow: "#8deaff" }, tip: "Kiếm luân băng xoay quanh thân, gây sát thương và làm chậm tối đa 5 mục tiêu gần nhất còn 55% trong 4 giây. Có Băng Linh Kiếm trong hành trang: sát thương đầy đủ; thiếu pháp khí: còn 50%." }, tien_vu: { id: "tien_vu", short: "Tiễn Vũ", name: "Tiễn Vũ", book: "bi_tich_tien_vu", element: "Kim", glyph: "➹", icon: "bi_tich_tien_vu", shape: "ground", medium: !0, boostWeapon: "cung_linh", maxTargets: 4, cooldown: 11, cast: .46, mp: 24, sp: 10, range: 176, speed: 0, shots: 1, spread: 0, coef: 5.25, hitR: 0, blastR: 80, delay: .2, hitDelay: .4, vfx: "tien_vu", effect: { kind: "wound", chance: .3, time: 5, dpsCoef: .25, heal: .5 }, colors: { core: "#fff6c8", mid: "#f0c040", edge: "#8a5a12", glow: "#ffd76a" }, tip: "Trút mưa tên vàng xuống điểm ngắm, trúng tối đa 4 mục tiêu. Mỗi mục tiêu có 30% dính Thâm Thương: rỉ máu 5 giây và chỉ hồi được 50% Khí Huyết. Có Linh Cung trong hành trang: sát thương đầy đủ; thiếu pháp khí: còn 50%." }, tram_ma: { id: "tram_ma", short: "Trầm Ma", name: "Trầm Ma", book: "bi_tich_tram_ma", element: "Ma", glyph: "⊛", icon: "bi_tich_tram_ma", shape: "aura", medium: !0, maxTargets: 3, cooldown: 9, cast: .42, mp: 18, sp: 7, range: 176, speed: 0, shots: 1, spread: 0, coef: 5.25, hitR: 0, blastR: 176, delay: .35, vfx: "tram_ma", linhAn: { time: 4, bonus: .15 }, effect: { kind: "burn", chance: .5, time: 4, dpsCoef: .3, ma: !0 }, colors: { core: "#f1e2ff", mid: "#9a5cff", edge: "#2a0b3d", glow: "#b77dff" }, tip: "Ma khí lan ra rất xa quanh thân, tự tìm 3 kẻ địch gần nhất và mở xoáy ma khí dưới chân từng kẻ. Mỗi mục tiêu trúng mang Linh Ấn 4 giây: đòn trực tiếp kế tiếp của bạn gây thêm 15% sát thương rồi tiêu hao ấn. Mục tiêu cũng có 50% cơ hội dính Ma Hỏa, thiêu đốt 4 giây." }, ma_bao_an: { id: "ma_bao_an", short: "Ma Bạo Ấn", name: "Ma Bạo Ấn", book: "bi_tich_ma_bao_an", element: "Ma", glyph: "卍", icon: "bi_tich_ma_bao_an", shape: "ground", medium: !0, thuongPham: !0, requireRealm: "truc_co_2", dao: "ma", maxTargets: 4, cooldown: 13, cast: .45, mp: 34, sp: 14, range: 150, speed: 0, shots: 1, spread: 0, coef: 6.6, hitR: 0, blastR: 72, delay: .7, hitDelay: .7, vfx: "ma_bao_an", effect: { kind: "burn", time: 5, dpsCoef: .4, ma: !0 }, colors: { core: "#fbe8ff", mid: "#b04cff", edge: "#2a0638", glow: "#d27bff" }, tip: "Kết ma ấn tại điểm ngắm: ma khí tụ lại rồi ba ấn nổ liền nhau, trúng tối đa 4 kẻ. Kẻ trúng chắc chắn dính Ma Hỏa 5 giây. Cần Trúc Cơ Trung Kỳ và mang Hồn Phiên." }, ma_hon_phe: { id: "ma_hon_phe", short: "Ma Hồn Phệ", name: "Ma Hồn Phệ", book: "bi_tich_ma_hon_phe", element: "Ma", glyph: "☠", icon: "bi_tich_ma_hon_phe", shape: "ground", medium: !0, thuongPham: !0, requireRealm: "truc_co_1", dao: "ma", maxTargets: 4, cooldown: 11.5, cast: .5, mp: 26, sp: 12, range: 180, speed: 0, shots: 1, spread: 0, coef: 8.5, hitR: 0, blastR: 42, delay: 2.2, hitDelay: 2.2, vfx: "ma_hon_phe", effect: { kind: "burn", time: 4, dpsCoef: .45, ma: !0 }, colors: { core: "#fff0ff", mid: "#ef315f", edge: "#2b073f", glow: "#8f4dff" }, tip: "Gọi 5–7 đầu lâu ma lần lượt xoáy vòng quanh chủ rồi lao cong vào mục tiêu. Ma Hỏa 4 giây; cần Trúc Cơ Sơ Kỳ và Hồn Phiên." }, cuu_u_ma_trao: { id: "cuu_u_ma_trao", short: "Ma Trảo", name: "Cửu U Ma Trảo", book: "bi_tich_cuu_u_ma_trao", element: "Ma", glyph: "爪", icon: "bi_tich_cuu_u_ma_trao", shape: "aura", medium: !0, thuongPham: !0, requireRealm: "truc_co_2", dao: "ma", maxTargets: 5, cooldown: 15, cast: .55, mp: 36, sp: 15, range: 180, speed: 0, shots: 1, spread: 0, coef: 10.5, hitR: 0, blastR: 180, delay: .95, hitDelay: .95, vfx: "cuu_u_ma_trao", effect: null, colors: { core: "#f3dcff", mid: "#9b4dff", edge: "#2a0b4d", glow: "#c58cff" }, tip: "Năm bàn tay ma trồi lên dưới chân năm kẻ gần nhất rồi vồ xé, sát thương ngang Thái Âm Nguyệt Quang. Cần Trúc Cơ Trung Kỳ và Hồn Phiên." }, phi_long_tai_thien: { id: "phi_long_tai_thien", short: "Phi Long", name: "Phi Long Tại Thiên", book: "bi_tich_phi_long_tai_thien", element: "Kim", glyph: "龍", icon: "bi_tich_phi_long_tai_thien", shape: "ground", medium: !0, thuongPham: !0, requireRealm: "truc_co_2", dao: "chinh", autoFoe: !0, primaryTarget: !0, maxTargets: 2, cooldown: 15, cast: .55, mp: 36, sp: 15, range: 200, speed: 0, shots: 1, spread: 0, coef: 11, hitR: 0, blastR: 84, delay: 1.15, hitDelay: 1.15, vfx: "phi_long_tai_thien", effect: null, colors: { core: "#fff8d8", mid: "#ffd45a", edge: "#7a4a08", glow: "#ffe28a" }, tip: "Ba rồng ảo ảnh bay quanh người rồi lao vào mục tiêu chính cùng hai kẻ gần nó nhất, sát thương nặng hơn Cửu U Ma Trảo. Cần Trúc Cơ Trung Kỳ và Kiếm Hạp." }, hoanh_tao_mac_ngan: { id: "hoanh_tao_mac_ngan", short: "Hoành Tảo", name: "Hoành Tảo Mặc Ngân", book: "bi_tich_hoanh_tao_mac_ngan", element: "Mặc", glyph: "墨", icon: "bi_tich_hoanh_tao_mac_ngan", shape: "aura", medium: !0, requireRealm: "truc_co_1", maxTargets: 4, cooldown: 8.5, cast: .45, mp: 24, sp: 9, range: 130, speed: 0, shots: 1, spread: 0, coef: 5.25, hitR: 0, blastR: 110, delay: .5, hitDelay: .5, vfx: "hoanh_tao_mac_ngan", effect: null, colors: { core: "#d8e8dc", mid: "#2a4a40", edge: "#0a1a16", glow: "#8fc4ae" }, tip: "Vung bút quét một vòng mực quanh thân, đánh tối đa 4 kẻ gần nhất trong 110px. Cần Trúc Cơ Sơ Kỳ." }, son_ha_nhap_hoa: { id: "son_ha_nhap_hoa", short: "Sơn Hà", name: "Sơn Hà Nhập Họa", book: "bi_tich_son_ha_nhap_hoa", element: "Mặc", glyph: "山", icon: "bi_tich_son_ha_nhap_hoa", shape: "ground", medium: !0, requireRealm: "truc_co_1", autoFoe: !0, maxTargets: 5, cooldown: 10, cast: .5, mp: 26, sp: 10, range: 190, speed: 0, shots: 1, spread: 0, coef: 6, hitR: 0, blastR: 96, delay: 1.3, hitDelay: 1.3, vfx: "son_ha_nhap_hoa", effect: null, colors: { core: "#d8e8dc", mid: "#2a4a40", edge: "#0a1a16", glow: "#8fc4ae" }, tip: "Trải một bức tranh sơn thuỷ xuống điểm ngắm, nét bút ấn xuống đánh tối đa 5 kẻ trong tranh sau 1,3 giây. Cần Trúc Cơ Sơ Kỳ." }, tu_van_cuong_phong: { id: "tu_van_cuong_phong", short: "Cuồng Phong", name: "Tử Vân Cuồng Phong", book: "bi_tich_tu_van_cuong_phong", element: "Ma", glyph: "旋", icon: "bi_tich_tu_van_cuong_phong", shape: "ground", medium: !0, requireRealm: "truc_co_1", autoFoe: !0, maxTargets: 4, cooldown: 8.8, cast: .45, mp: 24, sp: 9, range: 180, speed: 0, shots: 1, spread: 0, coef: 5.4, hitR: 0, blastR: 84, delay: 1, hitDelay: 1, vfx: "tu_van_cuong_phong", effect: null, colors: { core: "#f7dfff", mid: "#8735af", edge: "#2a0f3c", glow: "#c07be8" }, tip: "Dựng một cột khói tím xoáy xuống điểm ngắm, sau 1 giây đánh tối đa 4 kẻ trong 84px. Cần Trúc Cơ Sơ Kỳ." }, tu_van_ma_vuc: { id: "tu_van_ma_vuc", short: "Ma Vực", name: "Tử Vân Ma Vực", book: "bi_tich_tu_van_ma_vuc", element: "Ma", glyph: "域", icon: "bi_tich_tu_van_ma_vuc", shape: "aura", medium: !0, requireRealm: "truc_co_1", maxTargets: 5, cooldown: 9.5, cast: .5, mp: 25, sp: 10, range: 130, speed: 0, shots: 1, spread: 0, coef: 5.8, hitR: 0, blastR: 96, delay: 1.1, hitDelay: 1.1, vfx: "tu_van_ma_vuc", effect: null, colors: { core: "#f7dfff", mid: "#8735af", edge: "#2a0f3c", glow: "#c07be8" }, tip: "Ma khí tím toả thành vành quanh thân, sau 1,1 giây đánh tối đa 5 kẻ gần nhất trong 96px. Cần Trúc Cơ Sơ Kỳ." }, nguyet_quang: { id: "nguyet_quang", short: "Nguyệt Quang", name: "Thái Âm Nguyệt Quang", book: "bi_tich_nguyet_quang", element: "Quang", glyph: "☾", icon: "bi_tich_nguyet_quang", shape: "ground", medium: !0, thuongPham: !0, requireRealm: "truc_co_2", maxTargets: 3, cooldown: 14, cast: .55, mp: 34, sp: 14, range: 190, speed: 0, shots: 1, spread: 0, coef: 10.5, hitR: 0, blastR: 34, delay: 1.3, hitDelay: 1.3, vfx: "nguyet_quang", effect: { kind: "stun", time: .8 }, colors: { core: "#ffffff", mid: "#9fdcff", edge: "#243f9a", glow: "#e6f4ff" }, tip: "Triệu trăng lên cao rồi giáng luồng nguyệt quang xuống điểm ngắm: sát thương rất lớn, trúng tối đa 3 kẻ, choáng 0,8 giây. Cần Trúc Cơ Trung Kỳ." }, kim_quang_cu_kiem: { id: "kim_quang_cu_kiem", short: "Cự Kiếm", name: "Kim Quang Cự Kiếm", book: "bi_tich_kim_quang_cu_kiem", element: "Kim", glyph: "⚔", icon: "bi_tich_kim_quang_cu_kiem", shape: "ground", medium: !0, thuongPham: !0, requireRealm: "truc_co_2", dao: "chinh", autoFoe: !0, maxTargets: 1, cooldown: 10, cast: .5, mp: 26, sp: 11, range: 210, speed: 0, shots: 1, spread: 0, coef: 7.2, hitR: 0, blastR: 0, delay: 2.2, hitDelay: 2.2, vfx: "kim_quang_cu_kiem", effect: null, colors: { core: "#fffbe0", mid: "#ffd24a", edge: "#a8601a", glow: "#ffe28a" }, tip: "Triệu một cây kim kiếm khổng lồ từ vòng năng lượng, bay chậm theo vòng cung rồi cắm vào mục tiêu. Cần Trúc Cơ Trung Kỳ và Kiếm Hạp." }, ngu_sac_than_chuong: { id: "ngu_sac_than_chuong", short: "Thần Chưởng", name: "Ngũ Sắc Thần Chưởng", book: "bi_tich_ngu_sac_than_chuong", element: "Ngũ Hành", glyph: "掌", icon: "bi_tich_ngu_sac_than_chuong", shape: "ground", medium: !0, thuongPham: !0, requireRealm: "truc_co_2", maxTargets: 5, cooldown: 30, cast: .6, mp: 36, sp: 14, range: 200, speed: 0, shots: 1, spread: 0, coef: 22.5, hitR: 0, blastR: 56, delay: 1.8, hitDelay: 1.8, vfx: "ngu_sac_than_chuong", effect: { kind: "stun", time: 2 }, colors: { core: "#ffffff", mid: "#b98cff", edge: "#3d2a8a", glow: "#ffe2a0" }, tip: "Bàn tay ngũ sắc khổng lồ thò ra từ mây sương rồi bổ xuống điểm ngắm: sát thương cực lớn, trúng tối đa 5 kẻ, choáng 2 giây. Hồi chiêu rất lâu. Cần Trúc Cơ Trung Kỳ." }, huyet_buc_chuong: { id: "huyet_buc_chuong", short: "Huyết Bức", name: "Huyết Bức Chưởng", book: "bi_tich_huyet_buc_chuong", element: "Huyết", glyph: "蝠", icon: "bi_tich_huyet_buc_chuong", shape: "ground", medium: !0, autoFoe: !0, maxTargets: 3, cooldown: 5.5, cast: .4, mp: 14, sp: 6, range: 130, speed: 0, shots: 1, spread: 0, coef: 5, hitR: 0, blastR: 44, delay: .34, hitDelay: .34, vfx: "huyet_buc_chuong", effect: { kind: "wound", chance: .35, time: 4, dpsCoef: .2, heal: .5 }, colors: { core: "#ffe9d8", mid: "#e0283a", edge: "#4a0612", glow: "#ff5a4a" }, tip: "Bầy dơi huyết bắn vào mục tiêu, trúng tối đa 3 kẻ; 35% dính Thâm Thương (rỉ máu 4 giây, hồi máu còn 50%)." }, huyet_liem_tram: { id: "huyet_liem_tram", short: "Liêm Trảm", name: "Huyết Liêm Trảm", book: "bi_tich_huyet_liem_tram", element: "Huyết", glyph: "镰", icon: "bi_tich_huyet_liem_tram", shape: "ground", medium: !0, autoFoe: !0, requireRealm: "luyen_khi_10", boostWeapon: "huyet_ma_liem", maxTargets: 4, cooldown: 7, cast: .45, mp: 24, sp: 10, range: 150, speed: 0, shots: 1, spread: 0, coef: 5.8, hitR: 0, blastR: 52, delay: .17, hitDelay: .17, vfx: "huyet_liem_tram", effect: null, lifesteal: { pct: .05, max: .15, pvp: .5 }, colors: { core: "#ffe6e0", mid: "#e0283a", edge: "#4a0612", glow: "#ff3b52" }, tip: "Làn sóng liêm máu nổ thành mây huyết, trúng tối đa 4 kẻ. Cần Luyện Khí Tầng 10. Có Huyết Ma Liêm trong hành trang: sát thương gấp đôi và hút 5% Khí Huyết mỗi kẻ trúng (tối đa 15%); thiếu pháp khí: còn 50%, không hút." }, tu_anh_phuoc_tien: { id: "tu_anh_phuoc_tien", short: "Tứ Ảnh", name: "Tứ Ảnh Phược Tiên", book: "bi_tich_tu_anh_phuoc_tien", element: "Ảnh", glyph: "影", icon: "bi_tich_tu_anh_phuoc_tien", shape: "ground", medium: !0, requireRealm: "truc_co_1", kieuRoi: ["bach_loi_tien", "nhuyen_tien"], autoFoe: !0, needTarget: !0, maxTargets: 1, cooldown: 10, cast: .5, mp: 26, sp: 10, range: 170, speed: 0, shots: 1, spread: 0, coef: 6, hitR: 0, blastR: 0, delay: .8, hitDelay: .8, vfx: "tu_anh_phuoc_tien", effect: { kind: "root", time: 2.5 }, colors: { core: "#f2fbff", mid: "#6fc7ff", edge: "#2553b8", glow: "#a8e4ff" }, tip: "Thân hoá bốn bóng mờ, mỗi bóng quất một roi trói chân đối phương 2,5 giây. Cần Trúc Cơ Sơ Kỳ. Có Nhuyễn Tiên thì roi đỏ, không thì roi sét Bạch Lôi Tiên." }, xich_ma_hoa_than: { id: "xich_ma_hoa_than", short: "Xích Ma", name: "Xích Ma Hóa Thân", book: "bi_tich_xich_ma_hoa_than", element: "Ma", glyph: "魔", icon: "bi_tich_xich_ma_hoa_than", shape: "self", medium: !0, requireRealm: "truc_co_1", dao: "ma", cooldown: 37.5, cast: .6, mp: 30, sp: 12, range: 140, speed: 0, shots: 1, spread: 0, hitR: 0, blastR: 0, vfx: "xich_ma", effect: null, bienHinh: { hinh: "xich_ma", fx: "XichMaFX", time: 12, dang: { gender: "male", skin: "xich_ma", outfit: "xich_ma_y", hair: "xich_ma_toc", hairColor: "hac", eyeColor: "xich_ma", shoes: "ink" }, speed: 1.6, minAttack: .5, giap: .6, giapTen: "Ma Giáp", giapMau: "#ff6a4a", lifesteal: { pct: .015, pvp: .5 } }, colors: { core: "#ffe2c8", mid: "#e0283a", edge: "#2a0710", glow: "#ff6a3c" }, tip: "Cường hoá thân thể 12 giây: đánh nhanh gấp 1,6, hút huyết, có Ma Giáp đỡ đòn, ma khí bao quanh người. Vẫn bay, dùng vũ khí và chiêu như thường. Cần Trúc Cơ Sơ Kỳ và Hồn Phiên." }, kim_cuong_hoa_than: { id: "kim_cuong_hoa_than", short: "Kim Cương", name: "Kim Cương Hóa Thân", book: "bi_tich_kim_cuong_hoa_than", element: "Kim", glyph: "金", icon: "bi_tich_kim_cuong_hoa_than", shape: "self", medium: !0, requireRealm: "truc_co_1", dao: "chinh", cooldown: 37.5, cast: .6, mp: 30, sp: 12, range: 140, speed: 0, shots: 1, spread: 0, hitR: 0, blastR: 0, vfx: "kim_cuong", effect: null, bienHinh: { hinh: "kim_cuong", fx: "KimCuongFX", time: 14, dang: { eyeColor: "kim_cuong" }, kimHoa: !0, giu: ["beard", "accessory", "aura"], speed: 1.45, minAttack: .5, giap: 1, giapTen: "Cương Khí", giapMau: "#ffd86b", lifesteal: { pct: .01, pvp: .5 } }, colors: { core: "#fff6c8", mid: "#ffc83a", edge: "#7a4a08", glow: "#ffe27a" }, tip: "Cường hoá thân thể 14 giây: đánh nhanh gấp 1,45, hút huyết, có Cương Khí đỡ đòn, thân mạ vàng kim, mắt phát sáng, kim quang bao quanh người. Vẫn bay, dùng vũ khí và chiêu như thường. Cần Trúc Cơ Sơ Kỳ và Kiếm Hạp." } };
  a.ORDER = ["hoa_cau", "phong_nhan", "bang_thau", "dia_thich", "xich_chan"];
  a.MEDIUM_ORDER = ["ngu_kiem_sat", "huyet_kiem_tran", "cuu_huyet_kiem_tran", "thanh_lam_kiem_tru", "kim_thuong_giang_the", "anh_ky_phu", "bang_kiem_tran", "bang_kiem_luan", "van_kiem_quy_tong", "tien_vu", "tram_ma", "ma_bao_an", "ma_hon_phe", "nguyet_quang", "kim_quang_cu_kiem", "ngu_sac_than_chuong", "huyet_buc_chuong", "loi_thuong_quan_dia", "ngu_loi_thuong_vu", "huyet_liem_tram", "tu_anh_phuoc_tien", "xich_ma_hoa_than", "kim_cuong_hoa_than", "cuu_u_ma_trao", "phi_long_tai_thien", "hoanh_tao_mac_ngan", "son_ha_nhap_hoa", "tu_van_cuong_phong", "tu_van_ma_vuc"];
  a.activeOrder = function () {
    return a.ORDER.concat(a.MEDIUM_ORDER);
  };
  a.VAN_KIEM_COST = 2e4;
  a.canBuyVanKiem = function (e) {
    if ((e = e || n).Inventory.owns("bi_tich_van_kiem_quy_tong")) {
      return { ok: !1, why: "đã sở hữu bí tịch" };
    }
    var t = a.lockReason("van_kiem_quy_tong", e);
    return t ? { ok: !1, why: t } : e.Progress.stones < a.VAN_KIEM_COST ? { ok: !1, why: "cần 20000 Linh Thạch" } : { ok: !0 };
  };
  a.buyVanKiem = function (e) {
    e = e || n;
    var t = a.canBuyVanKiem(e);
    return t.ok ? e.Progress.spendStones(a.VAN_KIEM_COST) ? (e.Inventory.add("bi_tich_van_kiem_quy_tong", 1), e.Quest && e.Quest.save && e.Quest.save(), { ok: !0, itemId: "bi_tich_van_kiem_quy_tong", cost: a.VAN_KIEM_COST }) : { ok: !1, why: "thiếu Linh Thạch" } : t;
  };
  a.MA_BAO_AN_COST = 2e4;
  a.MA_BAO_AN_BOOK = "bi_tich_ma_bao_an";
  a.canBuyMaBaoAn = function (e) {
    if ((e = e || n).Inventory.owns(a.MA_BAO_AN_BOOK)) {
      return { ok: !1, why: "đã có bí tịch" };
    }
    var t = a.lockReason("ma_bao_an", e);
    return t ? { ok: !1, why: t } : (0 | e.Progress.stones) < a.MA_BAO_AN_COST ? { ok: !1, why: "cần " + a.MA_BAO_AN_COST + " Linh Thạch" } : { ok: !0 };
  };
  a.buyMaBaoAn = function (e) {
    e = e || n;
    var t = a.canBuyMaBaoAn(e);
    return t.ok ? e.Progress.spendStones(a.MA_BAO_AN_COST) ? (e.Inventory.add(a.MA_BAO_AN_BOOK, 1), e.Quest && e.Quest.save && e.Quest.save(), { ok: !0, itemId: a.MA_BAO_AN_BOOK, cost: a.MA_BAO_AN_COST }) : { ok: !1, why: "thiếu Linh Thạch" } : t;
  };
  a.XICH_MA_COST = 12e3;
  a.XICH_MA_BOOK = "bi_tich_xich_ma_hoa_than";
  a.canBuyXichMa = function (e) {
    if ((e = e || n).Inventory.owns(a.XICH_MA_BOOK)) {
      return { ok: !1, why: "đã có bí tịch" };
    }
    var t = a.lockReason("xich_ma_hoa_than", e);
    return t ? { ok: !1, why: t } : (0 | e.Progress.stones) < a.XICH_MA_COST ? { ok: !1, why: "cần " + a.XICH_MA_COST + " Linh Thạch" } : { ok: !0 };
  };
  a.buyXichMa = function (e) {
    e = e || n;
    var t = a.canBuyXichMa(e);
    return t.ok ? e.Progress.spendStones(a.XICH_MA_COST) ? (e.Inventory.add(a.XICH_MA_BOOK, 1), e.Quest && e.Quest.save && e.Quest.save(), { ok: !0, itemId: a.XICH_MA_BOOK, cost: a.XICH_MA_COST }) : { ok: !1, why: "thiếu Linh Thạch" } : t;
  };
  a.KIM_CUONG_COST = 12e3;
  a.KIM_CUONG_BOOK = "bi_tich_kim_cuong_hoa_than";
  a.canBuyKimCuong = function (e) {
    if ((e = e || n).Inventory.owns(a.KIM_CUONG_BOOK)) {
      return { ok: !1, why: "đã có bí tịch" };
    }
    var t = a.lockReason("kim_cuong_hoa_than", e);
    return t ? { ok: !1, why: t } : (0 | e.Progress.stones) < a.KIM_CUONG_COST ? { ok: !1, why: "cần " + a.KIM_CUONG_COST + " Linh Thạch" } : { ok: !0 };
  };
  a.buyKimCuong = function (e) {
    e = e || n;
    var t = a.canBuyKimCuong(e);
    return t.ok ? e.Progress.spendStones(a.KIM_CUONG_COST) ? (e.Inventory.add(a.KIM_CUONG_BOOK, 1), e.Quest && e.Quest.save && e.Quest.save(), { ok: !0, itemId: a.KIM_CUONG_BOOK, cost: a.KIM_CUONG_COST }) : { ok: !1, why: "thiếu Linh Thạch" } : t;
  };
  a.KIM_QUANG_COST = 12e3;
  a.KIM_QUANG_BOOK = "bi_tich_kim_quang_cu_kiem";
  a.canBuyKimQuang = function (e) {
    if ((e = e || n).Inventory.owns(a.KIM_QUANG_BOOK)) {
      return { ok: !1, why: "đã có bí tịch" };
    }
    var t = a.lockReason("kim_quang_cu_kiem", e);
    return t ? { ok: !1, why: t } : (0 | e.Progress.stones) < a.KIM_QUANG_COST ? { ok: !1, why: "cần " + a.KIM_QUANG_COST + " Linh Thạch" } : { ok: !0 };
  };
  a.buyKimQuang = function (e) {
    e = e || n;
    var t = a.canBuyKimQuang(e);
    return t.ok ? e.Progress.spendStones(a.KIM_QUANG_COST) ? (e.Inventory.add(a.KIM_QUANG_BOOK, 1), e.Quest && e.Quest.save && e.Quest.save(), { ok: !0, itemId: a.KIM_QUANG_BOOK, cost: a.KIM_QUANG_COST }) : { ok: !1, why: "thiếu Linh Thạch" } : t;
  };
  a.weaponAllowed = function (n, a) {
    return !a.allowedWeapons || a.allowedWeapons.indexOf(n && n.cfg && n.cfg.weapon) >= 0;
  };
  a.SECT_SHOP_NPC = "tgt_thien_kiem_tong";
  a.SECT_SHOP = [];
  a.sectShopRow = function (n) {
    for (var e = 0; e < a.SECT_SHOP.length; e++)
      if (a.SECT_SHOP[e].id === n) {
        return a.SECT_SHOP[e];
      }
    return null;
  };
  a.canBuySectSkill = function (e, t) {
    t = t || n;
    var o = a.sectShopRow(e);
    var i = a.DEFS[e];
    return o && i ? t.Inventory && t.Progress ? (t.Inventory.owns ? t.Inventory.owns(i.book, 1) : t.Inventory.has(i.book, 1)) ? { ok: !1, why: "đã có bí tịch trong túi" } : (0 | t.Progress.stones) < o.cost ? { ok: !1, why: "không đủ Linh Thạch" } : { ok: !0, row: o, def: i } : { ok: !1, why: "luật nhân vật chưa sẵn sàng" } : { ok: !1, why: "không có bí tịch này" };
  };
  a.buySectSkill = function (e, t) {
    t = t || n;
    var o = a.canBuySectSkill(e, t);
    return o.ok ? t.Progress.spendStones(o.row.cost) ? (t.Inventory.add(o.def.book, 1), t.Quest && t.Quest.save && t.Quest.save(), { ok: !0, id: o.def.id, itemId: o.def.book, cost: o.row.cost, stones: 0 | t.Progress.stones }) : { ok: !1, why: "không đủ Linh Thạch" } : o;
  };
  a.PASSIVE_MAX = 5;
  a.PASSIVE_FLAG = "bi_dong_chon";
  a.PASSIVES = { kim_quang_chao: { id: "kim_quang_chao", book: "bi_tich_kim_quang_chao", name: "Kim Quang Cháo", short: "Kim Quang", element: "Kim", kind: "shield", sp: 1, cooldown: 5, amountCoef: 2.7, colors: { core: "#fff5bd", mid: "#e8c85a", edge: "#9b6b24", glow: "#ffe98a" }, tip: "Tự dựng khiên khi sát thương xuyên vào Khí Huyết, chặn một phần đòn — càng cao tu vi càng chặn được nhiều." }, moc_xuan: { id: "moc_xuan", book: "bi_tich_moc_xuan", name: "Mộc Xuân Thuật", short: "Mộc Xuân", element: "Mộc", kind: "heal", sp: 1, cooldown: 7, amountCoef: 2, colors: { core: "#efffd0", mid: "#8bd46a", edge: "#3e7838", glow: "#b9f39c" }, tip: "Tự vận hành khi Khí Huyết bị thương, chữa lại một phần — càng cao tu vi càng chữa được nhiều." }, tu_linh: { id: "tu_linh", book: "bi_tich_tu_linh", name: "Tụ Linh Quyết", short: "Tụ Linh", element: "Linh", kind: "tu_linh", sp: 2, every: 5, pct: .02, requireRealm: "truc_co_1", colors: { core: "#e6fbff", mid: "#6fd6e8", edge: "#2a7f93", glow: "#9befff" }, tip: "Mỗi 5 giây hồi 2% Linh Lực." }, ho_tam: { id: "ho_tam", book: "bi_tich_ho_tam", name: "Hộ Tâm Chân Khí", short: "Hộ Tâm", element: "Kim", kind: "ho_tam", sp: 3, below: .3, reduce: .15, time: 4, cooldown: 30, requireRealm: "truc_co_1", colors: { core: "#fff1d6", mid: "#f0b35a", edge: "#a4561f", glow: "#ffc978" }, tip: "Khí Huyết dưới 30% thì giảm 15% sát thương nhận vào trong 4 giây." }, phong_hanh: { id: "phong_hanh", book: "bi_tich_phong_hanh", name: "Phong Hành Bộ", short: "Phong Hành", element: "Phong", kind: "phong_hanh", sp: 2, speed: .05, healPct: .01, cooldown: 1, requireRealm: "truc_co_1", colors: { core: "#eafff4", mid: "#7fdcae", edge: "#2f8a62", glow: "#b8f0d4" }, tip: "Tăng 5% tốc độ di chuyển; né đòn thành công hồi 1% Khí Huyết." }, kiem_y: { id: "kiem_y", book: "bi_tich_kiem_y", name: "Kiếm Ý Sơ Thành", short: "Kiếm Ý", element: "Kiếm", kind: "kiem_y", sp: 3, every: 4, bonus: .12, window: 3, requireRealm: "truc_co_1", colors: { core: "#f4ffff", mid: "#a8c7d4", edge: "#46515a", glow: "#d9f4ff" }, tip: "Cầm kiếm: đòn thứ 4 liên tiếp tăng 12% sát thương." }, bang_tam: { id: "bang_tam", book: "bi_tich_bang_tam", name: "Băng Tâm", short: "Băng Tâm", element: "Băng", kind: "bang_tam", sp: 2, reduce: .2, cooldown: 1, requireRealm: "truc_co_1", colors: { core: "#eefaff", mid: "#8fd3f5", edge: "#2f7fb8", glow: "#cdf1ff" }, tip: "Giảm 20% thời gian bị làm chậm, trói chân hoặc choáng." }, hoa_mach: { id: "hoa_mach", book: "bi_tich_hoa_mach", name: "Hỏa Mạch", short: "Hỏa Mạch", element: "Hỏa", kind: "hoa_mach", sp: 3, chance: .1, extra: 1, requireRealm: "truc_co_1", colors: { core: "#fff3c4", mid: "#ff9a3c", edge: "#d63b1f", glow: "#ffb45c" }, tip: "Kỹ năng Hỏa có 10% cơ hội thiêu đốt thêm 1 giây." }, tho_thuan: { id: "tho_thuan", book: "bi_tich_tho_thuan", name: "Thổ Thuẫn", short: "Thổ Thuẫn", element: "Thổ", kind: "tho_thuan", sp: 4, still: 2, amount: 20, time: 8, cooldown: 8, requireRealm: "truc_co_1", colors: { core: "#fbeccb", mid: "#c89a5a", edge: "#6b4a2c", glow: "#e8c78f" }, tip: "Đứng yên 2 giây thì nhận lá chắn hấp thụ 20 sát thương." }, moc_sinh: { id: "moc_sinh", book: "bi_tich_moc_sinh", name: "Mộc Sinh", short: "Mộc Sinh", element: "Mộc", kind: "moc_sinh", sp: 2, hpPct: .03, mpPct: .02, requireRealm: "truc_co_1", colors: { core: "#f1ffd8", mid: "#9be07a", edge: "#3e7838", glow: "#c6f7a8" }, tip: "Hạ quái thì hồi 3% Khí Huyết và 2% Linh Lực." }, tinh_tam: { id: "tinh_tam", book: "bi_tich_tinh_tam", name: "Tĩnh Tâm", short: "Tĩnh Tâm", element: "Linh", kind: "tinh_tam", sp: 3, idle: 4, discount: .2, requireRealm: "truc_co_1", colors: { core: "#f5f0ff", mid: "#b9a6ef", edge: "#5b4a9a", glow: "#d8ccff" }, tip: "Không thi triển kỹ năng trong 4 giây thì kỹ năng tiếp theo giảm 20% tiêu hao." }, ma_khi: { id: "ma_khi", book: "bi_tich_ma_khi", name: "Ma Khí Hộ Thể", short: "Ma Khí", element: "Ma", kind: "ma_khi", sp: 4, heavy: .15, reduce: .25, window: 15, requireRealm: "truc_co_1", colors: { core: "#f3dcff", mid: "#9a5cff", edge: "#3a1760", glow: "#c9a2ff" }, tip: "Bị chí mạng (một đòn mất từ 15% Khí Huyết) thì đòn chí mạng kế tiếp giảm 25% sát thương." }, cat_tuong: { id: "cat_tuong", book: "bi_tich_cat_tuong", name: "Cát Tường Hộ Giáp", short: "Cát Tường", element: "Kim", kind: "cat_tuong", sp: 4, cooldown: 10, pct: .12, below: .95, range: 8, maxTargets: 5, hoTro: !0, stat: "bp", roiO: "bai_da_hang_gio", colors: { core: "#fff6d0", mid: "#ffb04a", edge: "#b4521c", glow: "#ffd27a" }, tip: "Mỗi 10 giây hồi 12% Giáp cho tối đa 5 người cùng đội hoặc cùng tông môn đứng gần (tính cả mình)." }, thao_duoc: { id: "thao_duoc", book: "bi_tich_thao_duoc", name: "Thảo Dược Hồi Xuân", short: "Thảo Dược", element: "Mộc", kind: "thao_duoc", sp: 4, cooldown: 10, pct: .08, below: .9, range: 8, maxTargets: 5, hoTro: !0, stat: "hp", roiO: "duoc_vien", colors: { core: "#f0ffd8", mid: "#9be06a", edge: "#3e7838", glow: "#c9f7a0" }, tip: "Mỗi 10 giây hồi 8% Khí Huyết cho tối đa 5 người cùng đội hoặc cùng tông môn đứng gần (tính cả mình)." } };
  a.PASSIVE_ORDER = ["kim_quang_chao", "moc_xuan", "tu_linh", "ho_tam", "phong_hanh", "kiem_y", "bang_tam", "hoa_mach", "tho_thuan", "moc_sinh", "tinh_tam", "ma_khi", "cat_tuong", "thao_duoc"];
  a.passiveAmount = function (n) {
    return n ? Math.max(1, Math.round((n.amountCoef || 0) * a.power())) : 0;
  };
  a.passiveByBook = function (n) {
    for (var e = 0; e < a.PASSIVE_ORDER.length; e++) {
      var t = a.PASSIVES[a.PASSIVE_ORDER[e]];
      if (t.book === n) {
        return t;
      }
    }
    return null;
  };
  a.passiveLock = function (e, t) {
    t = t || n;
    var o = a.PASSIVES[e];
    return o ? o.requireRealm && t.Progress && t.realmReached && !t.realmReached(t.Progress.realmId, o.requireRealm) ? "cần " + (t.realmNameById ? t.realmNameById(o.requireRealm) : o.requireRealm) : null : "không có bí tịch này";
  };
  a.ownsPassive = function (e, t) {
    return i(t || n, a.PASSIVES[e]);
  };
  a.knownPassive = function (e, t) {
    t = t || n;
    var o = a.PASSIVES[e];
    return !!o && (a.testMode ? a.testPassive === e : i(t, o) && !a.passiveLock(e, t));
  };
  a.passiveList = function (e) {
    var t;
    var o = (e = e || n).Quest;
    var i = o && o.flags ? o.flags[a.PASSIVE_FLAG] : null;
    var r = [];
    if (Array.isArray(i)) {
      for (t = 0; t < i.length && r.length < a.PASSIVE_MAX; t++)
        r.indexOf(i[t]) < 0 && a.knownPassive(i[t], e) && r.push(i[t]);
      return r;
    }
    for (t = 0; t < a.PASSIVE_ORDER.length && r.length < a.PASSIVE_MAX; t++)
      a.knownPassive(a.PASSIVE_ORDER[t], e) && r.push(a.PASSIVE_ORDER[t]);
    return r;
  };
  a.passiveOn = function (n, e) {
    return a.testMode ? a.testPassive === n : a.passiveList(e).indexOf(n) >= 0;
  };
  a.setPassiveEquipped = function (e, t, o) {
    if (o = o || n, !a.PASSIVES[e] || !o.Quest || !o.Quest.flags) {
      return { ok: !1, why: "không có bí tịch này" };
    }
    var i = a.passiveList(o).slice();
    var r = i.indexOf(e);
    if (t) {
      if (r >= 0) {
        return { ok: !0, list: i };
      }
      if (!a.knownPassive(e, o)) {
        return { ok: !1, why: a.passiveLock(e, o) || "chưa có bí tịch này" };
      }
      if (i.length >= a.PASSIVE_MAX) {
        return { ok: !1, why: "chỉ mang được " + a.PASSIVE_MAX + " bí tịch bị động" };
      }
      i.push(e);
    }
    else {
      if (r < 0) {
        return { ok: !0, list: i };
      }
      i.splice(r, 1);
    }
    o.Quest.flags[a.PASSIVE_FLAG] = i;
    if (o.Quest.save) {
      o.Quest.save();
    }
    return { ok: !0, list: i };
  };
  a.autoEquipPassive = function (e, t) {
    t = t || n;
    var o = a.passiveByBook(e);
    var i = t.Quest;
    if (o && i && i.flags && Array.isArray(i.flags[a.PASSIVE_FLAG])) {
      a.setPassiveEquipped(o.id, !0, t);
    }
  };
  a.triggerHealthDefense = function (n, e) {
    if (e <= 0) {
      return null;
    }
    for (var t = u(n), o = ["kim_quang_chao", "moc_xuan"], i = 0; i < o.length; i++) {
      var h = o[i];
      var s = a.PASSIVES[h];
      if (a.passiveOn(h) && !((t[h] || 0) > 0) && r(n, s)) {
        t[h] = s.cooldown;
        S(n);
        var c = a.passiveAmount(s);
        if ("shield" === s.kind) {
          var l = Math.min(c, e);
          return { def: s, damage: e - l, blocked: l, heal: 0 };
        }
        return { def: s, damage: e, blocked: 0, heal: c };
      }
    }
    return null;
  };
  a.passiveFx = function (n, a, e) {
    h(n, a, e);
  };
  a.giamSatThuong = function (n, e, t) {
    if (!(e > 0 && n)) {
      return e;
    }
    var o = e;
    if (n.hoTamT > 0) {
      e *= 1 - a.PASSIVES.ho_tam.reduce;
    }
    var i = a.PASSIVES.ma_khi;
    if ((!t || !t.overTime) && n.hpMax > 0 && o >= n.hpMax * i.heavy && a.passiveOn("ma_khi")) {
      if (n.maKhiT > 0 && r(n, i)) {
        var u = e * i.reduce;
        e -= u;
        h(n, "ma_khi", { w: Math.round(u) });
      }
      n.maKhiT = i.window;
    }
    return e === o ? o : Math.max(0, Math.round(e));
  };
  a.sauKhiTrungDon = function (n) {
    var e = a.PASSIVES.ho_tam;
    if (!(!n || n.downed || !(n.hpMax > 0) || n.hp <= 0 || n.hp >= n.hpMax * e.below || n.hoTamT > 0 || (u(n).ho_tam || 0) > 0 || !a.passiveOn("ho_tam"))) {
      if (r(n, e)) {
        n.hoTamT = e.time;
        u(n).ho_tam = e.cooldown;
        h(n, "ho_tam");
      }
    }
  };
  a.tickBiDong = function (e, t) {
    if (e && t > 0) {
      if (e.hoTamT > 0 && (e.hoTamT = Math.max(0, e.hoTamT - t)), e.maKhiT > 0 && (e.maKhiT = Math.max(0, e.maKhiT - t)), e.kyT > 0 && (e.kyT -= t, e.kyT <= 0 && (e.kyT = 0, e.kyN = 0)), e.khongChieuT = Math.min(60, (e.khongChieuT || 0) + t), e.downed) {
        e.tuLinhT = 0;
        return void (e.ttStill = 0);
      }
      var o = null;
      var i = a.PASSIVES.tu_linh;
      if (e.tuLinhT = (e.tuLinhT || 0) + t, e.tuLinhT >= i.every) {
        e.tuLinhT = 0;
        var c = (o = a.testMode ? [a.testPassive] : a.passiveList()).indexOf("tu_linh") >= 0 ? Math.min(Math.round((e.mpMax || 0) * i.pct), s(e.mpMax, e.mp)) : 0;
        if (c > 0 && r(e, i)) {
          e.mp += c;
          h(e, "tu_linh", { m: c });
        }
      }
      var l = a.PASSIVES.tho_thuan;
      var g = void 0 !== e.ttX && Math.abs(e.x - e.ttX) < .5 && Math.abs(e.y - e.ttY) < .5;
      e.ttX = e.x;
      e.ttY = e.y;
      e.ttStill = g ? (e.ttStill || 0) + t : 0;
      if (e.ttStill >= l.still && (u(e).tho_thuan || 0) <= 0 && !(e.shieldT > 0 && e.shieldHp >= l.amount)) {
        if (!(o)) {
          o = a.testMode ? [a.testPassive] : a.passiveList();
        }
        if (o.indexOf("tho_thuan") < 0) {
          e.ttStill = 0;
        }
      }
      if (e.ttStill >= l.still && (u(e).tho_thuan || 0) <= 0 && !(e.shieldT > 0 && e.shieldHp >= l.amount) && r(e, l)) {
        if (n.Player && n.Player.giveShield) {
          n.Player.giveShield(e, l.amount, l.time);
        }
        else {
          e.shieldHp = l.amount;
          e.shieldT = l.time;
        }
        u(e).tho_thuan = l.cooldown;
        e.ttStill = 0;
        h(e, "tho_thuan", { w: l.amount });
      }
    }
  };
  a.hoTroIds = function () {
    for (var n = [], e = 0; e < a.PASSIVE_ORDER.length; e++) {
      var t = a.PASSIVES[a.PASSIVE_ORDER[e]];
      if (t && t.hoTro) {
        n.push(t.id);
      }
    }
    return n;
  };
  a.hoTroSan = function (n, e) {
    var t = a.PASSIVES[e];
    return !(!(t && t.hoTro && n) || n.downed || (u(n)[e] || 0) > 0 || !a.passiveOn(e)) && (a.testMode || (n.sp || 0) >= t.sp);
  };
  a.hoTroKich = function (n, e) {
    var t = a.PASSIVES[e];
    return !(!a.hoTroSan(n, e) || !r(n, t) || (u(n)[e] = t.cooldown, 0));
  };
  a.hoTroCan = function (n, e) {
    var t = a.PASSIVES[e];
    var o = t && t.stat;
    var i = n && n[o + "Max"];
    return !!(o && !n.downed && i > 0 && n[o] < i * t.below);
  };
  a.hoTroLuong = function (n, e, t, o) {
    var i = a.PASSIVES[e];
    var r = i && i.stat;
    if (!r || !n || n.downed || !(n[r + "Max"] > 0)) {
      return 0;
    }
    var h = t > 0 && t < 1 ? t : 1;
    if ("hp" === r && o >= 0) {
      h *= o;
    }
    var u = Math.round(n[r + "Max"] * i.pct * h);
    return Math.min(Math.max(0, u), s(n[r + "Max"], n[r]));
  };
  a.hoTroFx = function (n, a, e) {
    h(n, a, { b: e });
  };
  a.moveBonus = function (n) {
    return n && !n.flying && a.passiveOn("phong_hanh") ? 1 + a.PASSIVES.phong_hanh.speed : 1;
  };
  a.phongHanhNe = function (n) {
    var e = a.PASSIVES.phong_hanh;
    return !(!(n && !n.downed && n.hpMax > 0) || n.hp >= n.hpMax || (u(n).phong_hanh || 0) > 0 || !a.passiveOn("phong_hanh") || !r(n, e) || (u(n).phong_hanh = e.cooldown, h(n, "phong_hanh", { g: c(n, Math.max(1, n.hpMax * e.healPct)) }), 0));
  };
  a.kiemYTruoc = function (n, e) {
    var t = a.PASSIVES.kiem_y;
    n.kyBoost = !1;
    return e && /kiem/.test(String(e.id || "")) && a.passiveOn("kiem_y") ? (n.kyN || 0) >= t.every - 1 && r(n, t) ? (n.kyBoost = !0, 1 + t.bonus) : 1 : (n.kyN = 0, 1);
  };
  a.kiemYSau = function (n, e) {
    var t = a.PASSIVES.kiem_y;
    if (!e) {
      if (n.kyBoost && !a.testMode) {
        n.sp = Math.min(n.spMax || n.sp, (n.sp || 0) + t.sp);
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
    n.kyT = t.window;
  };
  a.bangTam = function (n, e) {
    var t = a.PASSIVES.bang_tam;
    if (!(n && e > 0 && a.passiveOn("bang_tam"))) {
      return e;
    }
    if ((u(n).bang_tam || 0) <= 0) {
      if (!r(n, t)) {
        return e;
      }
      u(n).bang_tam = t.cooldown;
      h(n, "bang_tam");
    }
    return e * (1 - t.reduce);
  };
  a.hoaMach = function (n, e, t, o) {
    var i = a.PASSIVES.hoa_mach;
    if (!(n && e && "Hỏa" === e.element && t && a.passiveOn("hoa_mach"))) {
      return t;
    }
    var u = Array.isArray(t) ? t : [t];
    if (!u.some(function (n) {
      return n && "burn" === n.kind;
    })) {
      return t;
    }
    if ((o ? o() : Math.random()) >= i.chance) {
      return t;
    }
    if (!r(n, i)) {
      return t;
    }
    var s = u.map(function (n) {
      if (!n || "burn" !== n.kind) {
        return n;
      }
      var a = {};
      for (var e in n)
        a[e] = n[e];
      a.time = (a.time || 0) + i.extra;
      return a;
    });
    h(n, "hoa_mach");
    return Array.isArray(t) ? s : s[0];
  };
  a.mocSinh = function (n) {
    var e = a.PASSIVES.moc_sinh;
    if (!n || n.downed || !a.passiveOn("moc_sinh")) {
      return !1;
    }
    if (!s(n.hpMax, n.hp) && !s(n.mpMax, n.mp)) {
      return !1;
    }
    if (!r(n, e)) {
      return !1;
    }
    var t = c(n, n.hpMax * e.hpPct);
    var o = Math.min(Math.round((n.mpMax || 0) * e.mpPct), s(n.mpMax, n.mp));
    if (o > 0) {
      n.mp += o;
    }
    else {
      o = 0;
    }
    h(n, "moc_sinh", { g: t, m: o });
    return !0;
  };
  a.spellCost = function (n, e) {
    var t = e.mp || 0;
    var o = e.sp || 0;
    var i = a.PASSIVES.tinh_tam;
    if ((n.khongChieuT || 0) >= i.idle && a.passiveOn("tinh_tam")) {
      var r = Math.round(t * (1 - i.discount));
      var h = Math.round(o * (1 - i.discount)) + (a.testMode ? 0 : i.sp);
      if ((n.mp || 0) >= r && (n.sp || 0) >= h) {
        return { mp: r, sp: h, tinhTam: !0 };
      }
    }
    return { mp: t, sp: o, tinhTam: !1 };
  };
  a.daPhatChieu = function (n, a) {
    n.khongChieuT = 0;
    if (a && a.tinhTam) {
      h(n, "tinh_tam");
    }
  };
  a.biDongVfx = function (e, t, o) {
    var i = n.VFX;
    if (t && "chuong" === t.s) {
      if (e && n.ChuongFx && n.ChuongFx.spawnKich) {
        n.ChuongFx.spawnKich(e.x, e.y, t.w, o);
      }
    }
    else {
      var r = t && a.PASSIVES[t.s];
      if (i && e && r) {
        var h = r.colors;
        var u = e.x;
        var s = e.y;
        var c = null;
        var l = i.spawnPassivePulse && i.spawnPassivePulse(u, s, r.id, h, t);
        if ("shield" === r.kind) {
          if (i.spawnGoldenWard) {
            i.spawnGoldenWard(u, s, h);
          }
          if (t.w > 0) {
            c = "Kim Quang chặn " + t.w;
          }
        }
        else {
          if ("heal" === r.kind || "moc_sinh" === r.kind) {
            if (i.spawnSpringHeal) {
              i.spawnSpringHeal(u, s, h);
            }
            if (t.g > 0) {
              c = "+" + t.g + " " + r.short;
            }
          }
          else {
            if ("phong_hanh" === r.kind) {
              if (i.spawnRing) {
                i.spawnRing(u, s - 10, h.glow, 24, .35);
              }
              if (t.g > 0) {
                c = "+" + t.g + " " + r.short;
              }
            }
            else {
              if ("tho_thuan" === r.kind) {
                if (i.spawnGoldenWard) {
                  i.spawnGoldenWard(u, s, h);
                }
                c = r.short + " +" + (t.w || 0);
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
                  if (t.b > 0) {
                    c = "+" + t.b + " Giáp";
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
                    if (t.b > 0) {
                      c = "+" + t.b + " Khí Huyết";
                    }
                  }
                  else {
                    if (!l && i.spawnRing) {
                      i.spawnRing(u, s - 15, h.glow, 26, .42);
                      i.spawnRing(u, s - 15, h.mid, 14, .3);
                    }
                    c = "tu_linh" === r.kind ? "+" + (t.m || 0) + " Linh Lực" : "ma_khi" === r.kind ? "Ma Khí đỡ " + (t.w || 0) : r.short;
                  }
                }
              }
            }
          }
        }
        if (o && c && i.spawnText) {
          i.spawnText(u, s - 62, c, h.glow);
        }
      }
    }
  };
  a.updatePassiveCooldowns = function (n, e) {
    if (n.passiveCds) {
      for (var t in n.passiveCds)
        n.passiveCds[t] > 0 && (n.passiveCds[t] = Math.max(0, n.passiveCds[t] - e));
      if (a.testMode) {
        S(n);
      }
    }
  };
  a.THUNDER_BOOK = "bi_tich_loi_chuong";
  a.knownThunder = function () {
    return !!a.testMode || !!n.Inventory && (n.Inventory.owns ? n.Inventory.owns(a.THUNDER_BOOK, 1) : n.Inventory.has(a.THUNDER_BOOK, 1));
  };
  a.byBook = function (n) {
    for (var e = a.activeOrder(), t = 0; t < e.length; t++) {
      var o = a.DEFS[e[t]];
      if (o.book === n || o.legacyBook === n) {
        return o;
      }
    }
    return null;
  };
  a.ownsBook = function (e, t) {
    t = t || n;
    var o = a.DEFS[e];
    if (!o || !t.Inventory) {
      return !1;
    }
    var i = t.Inventory.owns ? function (n) {
      return t.Inventory.owns(n, 1);
    } : function (n) {
      return t.Inventory.has(n, 1);
    };
    return i(o.book) || !(!o.legacyBook || !i(o.legacyBook));
  };
  a.lockReason = function (e, t) {
    t = t || n;
    var o = a.DEFS[e];
    return o ? o.requireRealm && t.Progress && t.realmReached && !t.realmReached(t.Progress.realmId, o.requireRealm) ? "cần " + (t.realmNameById ? t.realmNameById(o.requireRealm) : o.requireRealm) : o.canVuKhi && !a.vuKhiHopLe(o, t) ? "cần " + o.canVuKhi.map(function (n) {
      var a = t.ITEMS && t.ITEMS[n];
      return a ? a.name : n;
    }).join(" hoặc ") + " trong hành trang" : !o.quanQuan || t.TopBoss && t.TopBoss.coNgoi && t.TopBoss.coNgoi(t) ? a.khoaDao(o.dao, null, t) : "cần giữ ngôi Quán Quân Săn Boss" : "không có chiêu này";
  };
  a.vuKhiHopLe = function (a, e) {
    e = e || n;
    var t = a && (a.canVuKhi || a.kieuRoi);
    var o = e.Inventory;
    if (!t || !o) {
      return null;
    }
    var i = o.equipped ? o.equipped("vu_khi") : null;
    if (i && t.indexOf(i.id) >= 0) {
      return i.id;
    }
    for (var r = 0; r < t.length; r++)
      if (o.owns ? o.owns(t[r], 1) : o.has(t[r], 1)) {
        return t[r];
      }
    return null;
  };
  a.khoaDao = function (a, e, t) {
    t = t || n;
    return e && t.Progress && t.realmReached && !t.realmReached(t.Progress.realmId, e) ? "cần " + (t.realmNameById ? t.realmNameById(e) : e) : "ma" !== a || t.LuyenQuy && t.LuyenQuy.coPhien(t) ? "chinh" !== a || t.ChinhDao && t.ChinhDao.coHap(t) ? null : "cần mang Kiếm Hạp" : "cần mang Hồn Phiên";
  };
  a.known = function (e) {
    var t = a.DEFS[e];
    return a.testMode ? !!t : !(!t || !n.Inventory) && a.ownsBook(e) && !a.lockReason(e);
  };
  a.knownList = function () {
    return (a.testMode ? a.ORDER : a.activeOrder()).filter(a.known).map(function (n) {
      return a.DEFS[n];
    });
  };
  a.active = function () {
    if (a.testMode) {
      return a.DEFS[a.testActive] || a.DEFS.hoa_cau;
    }
    var e = n.Quest;
    var t = e && e.flags ? e.flags.phap_thuat_dung : null;
    if (t && a.known(t)) {
      return a.DEFS[t];
    }
    var o = a.knownList();
    return o.length ? o[0] : null;
  };
  a.setActive = function (e) {
    return !!a.known(e) && (a.testMode ? (a.testActive = e, S(), !0) : (n.Quest && n.Quest.flags && (n.Quest.flags.phap_thuat_dung = e, n.Quest.save()), !0));
  };
  a.THUNDER_DEF = { id: "loi_chuong", short: "Lôi Chưởng", name: "Bí Tịch Lôi Chưởng", element: "Lôi", glyph: "ϟ", thunder: !0, colors: { core: "#f2ffff", mid: "#9df2dd", edge: "#3d8fa0", glow: "#9df2dd" }, tip: "Vỗ chưởng gọi sét giáng xuống mục tiêu, quét cả cụm quái đứng gần." };
  a.SLOTS = ["loi_chuong", "hoa_cau", "phong_nhan", "bang_thau", "dia_thich", "xich_chan", "ngu_kiem_sat", "huyet_kiem_tran", "cuu_huyet_kiem_tran", "thanh_lam_kiem_tru", "kim_thuong_giang_the", "anh_ky_phu", "bang_kiem_tran", "bang_kiem_luan", "van_kiem_quy_tong", "tien_vu", "tram_ma", "ma_bao_an", "ma_hon_phe", "nguyet_quang", "kim_quang_cu_kiem", "ngu_sac_than_chuong", "huyet_buc_chuong", "loi_thuong_quan_dia", "ngu_loi_thuong_vu", "huyet_liem_tram", "tu_anh_phuoc_tien", "xich_ma_hoa_than", "kim_cuong_hoa_than", "cuu_u_ma_trao", "phi_long_tai_thien", "hoanh_tao_mac_ngan", "son_ha_nhap_hoa", "tu_van_cuong_phong", "tu_van_ma_vuc"];
  a.slotDef = function (n) {
    var e = a.SLOTS[n];
    return e ? "loi_chuong" === e ? a.THUNDER_DEF : a.DEFS[e] || null : null;
  };
  a.slotKnown = function (n) {
    var e = a.slotDef(n);
    return !!e && (!a.testMode || !e.medium) && (e.thunder ? a.knownThunder() : a.known(e.id));
  };
  var l = "pntt.thanhChieu.v1";
  var g = null;
  function _(n) {
    var a = {};
    if (n && "object" == typeof n) {
      for (var e in n)
        n[e] && (a[e] = 1);
    }
    return a;
  }
  function m(n) {
    return Array.isArray(n) ? n.slice() : null;
  }
  function f(n) {
    return n < 32 || n >= 127 && n <= 159 || n >= 8203 && n <= 8207 || n >= 8232 && n <= 8238 || n >= 8288 && n <= 8292 || 65279 === n;
  }
  function d(n, e) {
    for (var t = "string" == typeof n ? n : "", o = 0, i = ""; o < t.length; o++)
      i += f(t.charCodeAt(o)) ? " " : t.charAt(o);
    t = i.replace(/\s+/g, " ").replace(/^ | $/g, "");
    return (t = (Array.from ? Array.from(t).slice(0, a.TEN_BO_TOI_DA).join("") : t.slice(0, a.TEN_BO_TOI_DA)).replace(/^ | $/g, "")) || e;
  }
  function p(n, e) {
    var t;
    var o = [];
    if (e && Array.isArray(e.bo)) {
      for (t = 0; t < e.bo.length && o.length < a.BO_TOI_DA; t++) {
        var i = e.bo[t];
        if (i && "object" == typeof i) {
          o.push({ ten: d(i.ten, "Combo " + (o.length + 1)), tat: _(i.tat), an: _(i.an), thuTu: m(i.thuTu) });
        }
      }
    }
    if (!(o.length)) {
      o.push({ ten: "Combo 1", tat: {}, an: {}, thuTu: null });
    }
    n.bo = o;
    var r = e && e.dung;
    n.dung = "number" == typeof r && r >= 0 && r < o.length && r === Math.floor(r) ? r : 0;
    n.loai = {};
    var h = e && e.loai;
    for (t = 0; t < a.LOAI_MUC_TIEU.length; t++) {
      var u = a.LOAI_MUC_TIEU[t];
      var s = h && h[u];
      if ("number" == typeof s && s >= 0 && s < o.length && s === Math.floor(s)) {
        n.loai[u] = s;
      }
    }
    y(n);
  }
  function y(n) {
    var a = n.bo[n.dung];
    if (a) {
      a.tat = _(n.tat);
      a.an = _(n.an);
      a.thuTu = m(n.thuTu);
    }
  }
  function v(n, a) {
    var e = n.bo[a];
    n.tat = _(e.tat);
    n.an = _(e.an);
    n.thuTu = m(e.thuTu);
    n.dung = a;
  }
  function b() {
    return n.Utils && n.Utils.store;
  }
  function k() {
    if (g) {
      return g;
    }
    var a = null;
    var e = b();
    try {
      a = e ? e.get(l, null) : null;
    }
    catch (n) {
      a = null;
    }
    if (g = { tat: {}, an: {}, thuTu: null, t: 0 }, a && "object" == typeof a) {
      if (a.tat && "object" == typeof a.tat) {
        g.tat = a.tat;
      }
      if (a.an && "object" == typeof a.an) {
        g.an = a.an;
      }
      if (Array.isArray(a.thuTu)) {
        g.thuTu = a.thuTu;
      }
      g.t = +a.t || 0;
      p(g, a);
      return g;
    }
    var t = n.Quest && n.Quest.flags;
    if (t) {
      if (t.chieu_tat && "object" == typeof t.chieu_tat) {
        for (var o in t.chieu_tat)
          t.chieu_tat[o] && (g.tat[o] = 1);
      }
      if (Array.isArray(t.chieu_thu_tu)) {
        g.thuTu = t.chieu_thu_tu.slice();
      }
    }
    p(g, null);
    return g;
  }
  function T() {
    var n = b();
    try {
      if (n) {
        n.set(l, { tat: g.tat, an: g.an, thuTu: g.thuTu, t: g.t, bo: g.bo, dung: g.dung, loai: g.loai });
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
  a.BO_TOI_DA = 6;
  a.TEN_BO_TOI_DA = 14;
  a.LOAI_MUC_TIEU = ["boss", "quai", "nguoi"];
  var x = -1;
  function M() {
    var a = n.Gateway;
    if (a && a.connected && "function" == typeof a.cmd && x !== g.t) {
      x = g.t;
      a.cmd("pref.thanhChieu", { tat: g.tat, an: g.an, thuTu: g.thuTu, t: g.t, bo: g.bo, dung: g.dung, loai: g.loai });
    }
  }
  function S(e) {
    if (a.testMode && "undefined" != typeof document) {
      var t = document.getElementById("skill-test-panel");
      if (t) {
        e = e || n.SceneWorld && n.SceneWorld.player;
        t.classList.remove("hidden");
        for (var o = t.querySelectorAll("[data-test-skill], [data-test-passive]"), i = 0; i < o.length; i++) {
          var r = !a.testPassive && o[i].dataset.testSkill === a.testActive;
          var h = o[i].dataset.testPassive === a.testPassive;
          if (o[i].classList.toggle("active", r || h), o[i].dataset.testPassive) {
            var u = o[i].dataset.testPassive;
            var s = o[i].querySelector("[data-passive-label]");
            var c = e && e.passiveCds && e.passiveCds[u] || 0;
            var l = h && c > 0;
            if (o[i].classList.toggle("cooling", l), s) {
              var g = l ? Math.ceil(c) + "s" : a.PASSIVES[u].short;
              if (s.textContent !== g) {
                s.textContent = g;
              }
            }
          }
        }
      }
    }
  }
  function C(e) {
    if (a.setActive(e)) {
      a.testPassive = null;
      S();
      var t = a.DEFS[e];
      var o = n.SceneWorld;
      if (o && o.player) {
        if (o.player.spellCd = 0, n.VFX && n.VFX.spawnText(o.player.x, o.player.y - 58, "Đang thử: " + t.name, t.colors.glow), "ma_hon_phe" === e && n.VFX.spawnMaHonPhe) {
          var i = 1 === o.player.dir ? -1 : 2 === o.player.dir ? 1 : 0;
          var r = 0 === o.player.dir ? 1 : 3 === o.player.dir ? -1 : 0;
          n.VFX.spawnMaHonPhe(o.player, { x: o.player.x + i * (t.range || 180), y: o.player.y + r * (t.range || 180) }, { colors: t.colors, range: t.range, hitDelay: t.hitDelay });
        }
        if ("nguyet_quang" === e && n.NguyetQuangFX) {
          var h = 1 === o.player.dir ? -1 : 2 === o.player.dir ? 1 : 0;
          var u = 0 === o.player.dir ? 1 : 3 === o.player.dir ? -1 : 0;
          n.NguyetQuangFX.spawn(o.player, { x: o.player.x + h * (.7 * t.range), y: o.player.y + u * (.7 * t.range) }, { colors: t.colors, radius: t.blastR, hitDelay: t.hitDelay });
        }
        if ("kim_quang_cu_kiem" === e && n.KimKiemFX) {
          var s = 1 === o.player.dir ? -1 : 2 === o.player.dir ? 1 : 0;
          var c = 0 === o.player.dir ? 1 : 3 === o.player.dir ? -1 : 0;
          n.KimKiemFX.spawn(o.player, { x: o.player.x + s * (.6 * t.range), y: o.player.y + c * (.6 * t.range) }, { hitDelay: t.hitDelay });
        }
        if ("ngu_sac_than_chuong" === e && n.ThanChuongFX) {
          var l = 1 === o.player.dir ? -1 : 2 === o.player.dir ? 1 : 0;
          var g = 0 === o.player.dir ? 1 : 3 === o.player.dir ? -1 : 0;
          n.ThanChuongFX.spawn(o.player, { x: o.player.x + l * (.7 * t.range), y: o.player.y + g * (.7 * t.range) }, { colors: t.colors, radius: t.blastR, hitDelay: t.hitDelay });
        }
        if ("huyet_buc_chuong" === e && n.VFX.spawnHuyetBuc) {
          var _ = 1 === o.player.dir ? -1 : 2 === o.player.dir ? 1 : 0;
          var m = 0 === o.player.dir ? 1 : 3 === o.player.dir ? -1 : 0;
          n.VFX.spawnHuyetBuc(o.player, { x: o.player.x + _ * (.9 * t.range), y: o.player.y + m * (.9 * t.range) }, { hitDelay: t.hitDelay });
        }
        if ("huyet_liem_tram" === e && n.VFX.spawnHuyetLiem) {
          var f = 1 === o.player.dir ? -1 : 2 === o.player.dir ? 1 : 0;
          var d = 0 === o.player.dir ? 1 : 3 === o.player.dir ? -1 : 0;
          var p = { x: o.player.x + f * (.8 * t.range), y: o.player.y + d * (.8 * t.range) };
          n.VFX.spawnHuyetLiem(o.player, p, { hitDelay: t.hitDelay });
          if (n.VFX.spawnHutHuyet) {
            n.VFX.spawnHutHuyet(o.player, [[p.x, p.y], [p.x + 14, p.y + 10], [p.x - 12, p.y - 8]], 0, t.hitDelay);
          }
        }
        if ("cuu_u_ma_trao" === e && n.VFX.spawnMaTrao) {
          for (var y = 1 === o.player.dir ? -1 : 2 === o.player.dir ? 1 : 0, v = 0 === o.player.dir ? 1 : 3 === o.player.dir ? -1 : 0, b = Math.atan2(v, y), k = [], T = 0; T < 5; T++) {
            var w = b + .5 * (T - 2);
            var x = 70 + T % 2 * 38;
            k.push({ x: o.player.x + Math.cos(w) * x, y: o.player.y + Math.sin(w) * x });
          }
          n.VFX.spawnMaTrao(o.player, k, { colors: t.colors, radius: t.blastR, hitDelay: t.hitDelay });
        }
        if ("phi_long_tai_thien" === e && n.VFX.spawnPhiLong) {
          for (var M = 1 === o.player.dir ? -1 : 2 === o.player.dir ? 1 : 0, C = 0 === o.player.dir ? 1 : 3 === o.player.dir ? -1 : 0, O = Math.atan2(C, M), P = [], A = 0; A < 3; A++) {
            var K = O + .55 * (A - 1);
            var R = 100 + A % 2 * 26;
            P.push({ x: o.player.x + Math.cos(K) * R, y: o.player.y + Math.sin(K) * R * .8 });
          }
          n.VFX.spawnPhiLong(o.player, P, { hitDelay: t.hitDelay });
        }
        if ("hoanh_tao_mac_ngan" === e && n.VFX.spawnMaTriMac && n.VFX.spawnMaTriMac(o.player, { kind: "sweep", hitDelay: t.hitDelay }), "son_ha_nhap_hoa" === e && n.VFX.spawnMaTriMac) {
          var V = 1 === o.player.dir ? -1 : 2 === o.player.dir ? 1 : 0;
          var D = 0 === o.player.dir ? 1 : 3 === o.player.dir ? -1 : 0;
          n.VFX.spawnMaTriMac(o.player, { kind: "landscape", hitDelay: t.hitDelay, at: { x: o.player.x + V * t.range * .6, y: o.player.y + D * t.range * .6 } });
        }
        if ("tu_van_cuong_phong" === e && n.VFX.spawnTuVanPhien) {
          var F = 1 === o.player.dir ? -1 : 2 === o.player.dir ? 1 : 0;
          var H = 0 === o.player.dir ? 1 : 3 === o.player.dir ? -1 : 0;
          n.VFX.spawnTuVanPhien(o.player, { kind: "vortex", hitDelay: t.hitDelay, at: { x: o.player.x + F * t.range * .6, y: o.player.y + H * t.range * .6 } });
        }
        if ("tu_van_ma_vuc" === e && n.VFX.spawnTuVanPhien && n.VFX.spawnTuVanPhien(o.player, { kind: "domain", hitDelay: t.hitDelay }), "tu_anh_phuoc_tien" === e && n.VFX.spawnTuAnhPhuoc) {
          var I = 1 === o.player.dir ? -1 : 2 === o.player.dir ? 1 : 0;
          var X = 0 === o.player.dir ? 1 : 3 === o.player.dir ? -1 : 0;
          n.VFX.spawnTuAnhPhuoc(o.player, { x: o.player.x + I * (.65 * t.range), y: o.player.y + X * (.65 * t.range) }, { variant: a.vuKhiHopLe(t, n) || "bach_loi_tien", hitDelay: t.hitDelay, bindTime: t.effect.time });
        }
        if (t.bienHinh && n.Player && n.Player.giveForm) {
          n.Player.giveForm(o.player, t);
          var B = n.Player.hinhFX ? n.Player.hinhFX(t.id) : null;
          if (B && B.spawnHoaThan) {
            B.spawnHoaThan(o.player, { colors: t.colors });
          }
        }
      }
    }
  }
  function O(e) {
    var t = a.PASSIVES[e];
    if (a.testMode && t) {
      var o = a.testPassive !== e;
      a.testPassive = e;
      var i = n.SceneWorld;
      if (i && i.player) {
        i.player.passiveCds = i.player.passiveCds || {};
        if (o) {
          i.player.passiveCds[e] = 0;
        }
        if (n.VFX) {
          n.VFX.spawnText(i.player.x, i.player.y - 58, "Bị động: " + t.name, t.colors.glow);
          if ("shield" === t.kind && n.VFX.spawnGoldenWard) {
            n.VFX.spawnGoldenWard(i.player.x, i.player.y, t.colors);
          }
          else {
            if ("heal" === t.kind && n.VFX.spawnSpringHeal) {
              n.VFX.spawnSpringHeal(i.player.x, i.player.y, t.colors);
            }
          }
        }
      }
      S(i && i.player);
    }
  }
  a.syncPrefsFromServer = function (n) {
    var a = k();
    var e = n && n.thanh_chieu;
    var t = e && "object" == typeof e ? +e.t || 0 : -1;
    return t >= 0 && t >= a.t ? !(t === a.t && a.t || (p(g = { tat: e.tat && "object" == typeof e.tat ? e.tat : {}, an: e.an && "object" == typeof e.an ? e.an : a.an, thuTu: Array.isArray(e.thuTu) ? e.thuTu : null, t: t }, Array.isArray(e.bo) ? e : a), T(), 0)) : ((a.thuTu || Object.keys(a.tat).length || Object.keys(a.an).length || a.bo.length > 1 || "Combo 1" !== a.bo[0].ten || Object.keys(a.loai).length) && a.t > t && (a.t || (a.t = 1, T()), M()), !1);
  };
  a._reloadPrefs = function () {
    g = null;
  };
  a.hasCustomOrder = function () {
    return !!k().thuTu;
  };
  a.comboDanhSach = function () {
    return k().bo.map(function (n) {
      return n.ten;
    });
  };
  a.comboDung = function () {
    return k().dung;
  };
  a.comboDay = function () {
    return k().bo.length >= a.BO_TOI_DA;
  };
  a.comboTenGoiY = function () {
    for (var n = a.comboDanhSach(), e = 1; e < 100; e++)
      if (n.indexOf("Combo " + e) < 0) {
        return "Combo " + e;
      }
    return "Combo";
  };
  a.comboThem = function (n) {
    var e = k();
    return e.bo.length >= a.BO_TOI_DA ? -1 : (y(e), e.bo.push({ ten: d(n, a.comboTenGoiY()), tat: _(e.tat), an: _(e.an), thuTu: m(e.thuTu) }), e.dung = e.bo.length - 1, w(), e.dung);
  };
  a.comboChuyen = function (n) {
    var a = k();
    return !("number" != typeof n || n !== Math.floor(n) || n < 0 || n >= a.bo.length || n === a.dung || (y(a), v(a, n), w(), 0));
  };
  a.comboDoiTen = function (n, a) {
    var e = k().bo[n];
    if (!e) {
      return !1;
    }
    var t = d(a, e.ten);
    return t !== e.ten && (e.ten = t, w(), !0);
  };
  a.comboXoa = function (n) {
    var a = k();
    if (a.bo.length <= 1 || !a.bo[n]) {
      return !1;
    }
    y(a);
    var e = a.dung;
    for (var t in a.bo.splice(n, 1), e === n ? v(a, Math.min(n, a.bo.length - 1)) : e > n && (a.dung = e - 1), a.loai)
      a.loai[t] === n ? delete a.loai[t] : a.loai[t] > n && a.loai[t]--;
    w();
    return !0;
  };
  a.comboGan = function (n, e) {
    var t = k();
    if (a.LOAI_MUC_TIEU.indexOf(n) < 0) {
      return !1;
    }
    if (-1 === e || null == e) {
      if ("number" != typeof t.loai[n]) {
        return !1;
      }
      delete t.loai[n];
    }
    else {
      if ("number" != typeof e || e !== Math.floor(e) || e < 0 || e >= t.bo.length || t.loai[n] === e) {
        return !1;
      }
      t.loai[n] = e;
    }
    w();
    return !0;
  };
  a.comboDuocGan = function (n) {
    var a = k().loai[n];
    return "number" == typeof a ? a : -1;
  };
  a.comboChoMucTieu = function (n) {
    var e = k();
    var t = e.loai[n];
    return !("number" != typeof t || t === e.dung || t >= e.bo.length) && a.comboChuyen(t);
  };
  a.slotOrder = function () {
    var n;
    var e;
    var t = k().thuTu || [];
    var o = [];
    for (n = 0; n < t.length; n++)
      (e = a.SLOTS.indexOf(t[n])) >= 0 && o.indexOf(e) < 0 && o.push(e);
    for (n = 0; n < a.SLOTS.length; n++)
      o.indexOf(n) < 0 && o.push(n);
    return o;
  };
  a.learnedSlots = function () {
    for (var n = a.slotOrder(), e = [], t = 0; t < n.length; t++)
      a.slotKnown(n[t]) && e.push(n[t]);
    return e;
  };
  a.HOTBAR_MAX = 8;
  a.hotbarSkillVisible = function (n) {
    return !k().an[n];
  };
  a.barSlots = function () {
    for (var n = a.learnedSlots(), e = [], t = 0; t < n.length && e.length < a.HOTBAR_MAX; t++)
      a.hotbarSkillVisible(a.SLOTS[n[t]]) && e.push(n[t]);
    return e;
  };
  a.onBar = function (n) {
    for (var e = a.barSlots(), t = 0; t < e.length; t++)
      if (a.SLOTS[e[t]] === n) {
        return !0;
      }
    return !1;
  };
  a.barFull = function () {
    return a.barSlots().length >= a.HOTBAR_MAX;
  };
  a.setHotbarSkillVisible = function (n, e) {
    if (!n || a.SLOTS.indexOf(n) < 0) {
      return !1;
    }
    if (e && !a.onBar(n) && a.barFull()) {
      return !1;
    }
    var t = k().an;
    if (e) {
      delete t[n];
    }
    else {
      t[n] = 1;
    }
    w();
    return !0;
  };
  a.toggleHotbarSkill = function (n) {
    var e = !a.onBar(n);
    return a.setHotbarSkillVisible(n, e) ? e : null;
  };
  a.hotbarSlots = function () {
    for (var n = a.barSlots(), e = n.slice(), t = a.learnedSlots(), o = 0; o < t.length; o++)
      n.indexOf(t[o]) < 0 && e.push(t[o]);
    return e;
  };
  a.moveHotbar = function (n, e) {
    var t = a.learnedSlots();
    if (e |= 0, (n |= 0) < 0 || n >= t.length || e < 0 || e >= t.length || n === e) {
      return !1;
    }
    var o = t.splice(n, 1)[0];
    t.splice(e, 0, o);
    for (var i = a.slotOrder(), r = 0, h = 0; h < i.length; h++)
      a.slotKnown(i[h]) && (i[h] = t[r++]);
    k().thuTu = i.map(function (n) {
      return a.SLOTS[n];
    });
    w();
    return !0;
  };
  a.resetHotbarOrder = function () {
    return !!k().thuTu && (g.thuTu = null, w(), !0);
  };
  a.hotbarDef = function (n) {
    var e = a.hotbarSlots()[n];
    return void 0 === e ? null : a.slotDef(e);
  };
  a.hotbarIndex = function (n) {
    for (var e = a.hotbarSlots(), t = 0; t < e.length; t++)
      if (a.SLOTS[e[t]] === n) {
        return t;
      }
    return -1;
  };
  a.autoPreferred = function (n) {
    return !k().tat[n];
  };
  a.autoUses = function (n) {
    return a.autoPreferred(n) && a.onBar(n);
  };
  a.setAutoUses = function (n, a) {
    var e = k().tat;
    if (a) {
      delete e[n];
    }
    else {
      e[n] = 1;
    }
    w();
    return !0;
  };
  a.toggleAutoUses = function (n) {
    if (!a.onBar(n)) {
      return null;
    }
    var e = !a.autoPreferred(n);
    a.setAutoUses(n, e);
    return e;
  };
  a.autoRotation = function () {
    for (var n = [], e = a.learnedSlots(), t = 0; t < e.length; t++) {
      var o = a.slotDef(e[t]);
      if (o && !o.playerTargetOnly && a.autoUses(o.id)) {
        n.push(o);
      }
    }
    return n;
  };
  a.ready = function (e, t) {
    return !(!e || !t || !a.weaponAllowed(e, t) || t.bienHinh && n.Player && n.Player.formDef && n.Player.formDef(e) || (t.thunder ? e.thunderCd > 0 : a.dangTreo(e, t) || e.spellCd > 0 || e.spellCds && e.spellCds[t.id] > 0));
  };
  a.dangTreo = function (n, e) {
    if (!(n && e && e.waitForTarget > 0)) {
      return !1;
    }
    for (var t = n.vfxOwner || n, o = 0; o < a.grounds.length; o++) {
      var i = a.grounds[o];
      if (i.def.id === e.id && i.owner === t && !i.ghost && !i.fired) {
        return !0;
      }
    }
    return !1;
  };
  a.huyTreo = function (n, e) {
    if (!(n && e && e.waitForTarget > 0)) {
      return !1;
    }
    for (var t = n.vfxOwner || n, o = a.grounds.length - 1; o >= 0; o--) {
      var i = a.grounds[o];
      if (i.def.id === e.id && i.owner === t && !i.ghost && !i.fired) {
        if (i.vfx) {
          i.vfx.life = 0;
        }
        a.grounds.splice(o, 1);
        return !0;
      }
    }
    return !1;
  };
  a.WEAPON_BOOST_MULT = 1;
  a.WEAPON_NO_BOOST_MULT = .5;
  a.hasBoostWeapon = function (a) {
    if (!a || !a.boostWeapon) {
      return !1;
    }
    var e = n.Inventory;
    if (!e) {
      return !1;
    }
    if (e.owns) {
      return !!e.owns(a.boostWeapon, 1);
    }
    if (e.count && e.count(a.boostWeapon) > 0) {
      return !0;
    }
    var t = e.equipped ? e.equipped("vu_khi") : null;
    return !(!t || t.id !== a.boostWeapon);
  };
  a.damageMultiplier = function (n) {
    return n && n.boostWeapon ? a.hasBoostWeapon(n) ? a.WEAPON_BOOST_MULT : a.WEAPON_NO_BOOST_MULT : 1;
  };
  a.power = function () {
    var a = n.Progress && n.Progress.realmId;
    return n.skillPower ? n.skillPower(a || "pham_nhan") : 3;
  };
  a.powerDmg = function (n, e) {
    return Math.max(1, Math.round((n || 0) * a.power() * (null == e ? 1 : e)));
  };
  a.dmgOf = function (n) {
    return n ? a.powerDmg(n.coef, a.damageMultiplier(n)) : 0;
  };
  a.fullDmgOf = function (n) {
    return n ? a.powerDmg(n.coef, a.WEAPON_BOOST_MULT) : 0;
  };
  a.lifestealOn = function (n) {
    return !!(n && n.lifesteal && a.hasBoostWeapon(n));
  };
  a.lifestealApply = function (e, t, o, i) {
    if (!a.lifestealOn(t) || !e || e.downed || !(e.hpMax > 0) || e.hp >= e.hpMax) {
      return 0;
    }
    var r = t.lifesteal;
    var h = (o || 0) + (i || 0) * (null == r.pvp ? 1 : r.pvp);
    var u = n.Player && n.Player.healMult ? n.Player.healMult(e) : 1;
    var s = Math.round(e.hpMax * Math.min(r.max || 1, (r.pct || 0) * h) * u);
    return (s = Math.min(Math.max(0, s), Math.ceil(e.hpMax - e.hp))) > 0 ? (e.hp = Math.min(e.hpMax, e.hp + s), s) : 0;
  };
  a.HINH_CHUAN = { nhatGiay: 1, giaMau: .5 };
  a.heSoGiayHinh = function (e, t) {
    var o = e && e.bienHinh;
    if (!(o && e.cooldown > 0 && n.KHUNG_CHI_SO)) {
      return 0;
    }
    var i = t && n.KHUNG_CHI_SO[t] ? t : "truc_co_1";
    var r = n.KHUNG_CHI_SO[i].than;
    var h = n.skillPower(i);
    var u = a.HINH_CHUAN;
    var s = o.lifesteal && o.lifesteal.pct || 0;
    return ((o.speed - 1) * o.time / u.nhatGiay + s * r.hpMax * (o.speed / u.nhatGiay) * o.time * u.giaMau / h + (o.giap || 0) * r.bpMax * u.giaMau / h) / e.cooldown;
  };
  a.shotShare = function (n, a, e) {
    a = Math.max(1, 0 | a);
    var t = Math.floor(n / a);
    return t + (e < n - t * a ? 1 : 0);
  };
  a.effectOf = function (n) {
    if (!n || !n.effect) {
      return null;
    }
    var e = a.damageMultiplier(n);
    return function n(t) {
      if (Array.isArray(t)) {
        return t.map(n);
      }
      var o = {};
      for (var i in t)
        o[i] = t[i];
      if (!("burn" !== o.kind && "wound" !== o.kind && "poison" !== o.kind)) {   // Nghịch Tiên: thêm poison
        if ("number" == typeof o.dpsCoef) {
          o.dps = a.powerDmg(o.dpsCoef, e);
        }
        else {
          if ("number" == typeof o.dps) {
            o.dps *= e;
          }
        }
        delete o.dpsCoef;
      }
      return o;
    }(n.effect);
  };
  a.effectApplies = function (n) {
    if (!n || "number" != typeof n.chance) {
      return !0;
    }
    var a = Math.max(0, Math.min(1, n.chance));
    return Math.random() < a;
  };
  a.pickAuto = function (e, t, o) {
    var i = a.autoRotation();
    if (!i.length) {
      return null;
    }
    for (var r = ((0 | o) % i.length + i.length) % i.length, h = 0; h < i.length; h++) {
      var u = (r + h) % i.length;
      var s = i[u];
      var c = s.thunder ? n.CONFIG.THUNDER.RANGE : "aura" === s.shape ? Math.min(s.range, .8 * s.blastR) : s.range;
      if (a.ready(e, s) && !(t > c)) {
        return { def: s, idx: u };
      }
    }
    return null;
  };
  a.coolLeft = function (n, a) {
    if (!n || !a) {
      return 0;
    }
    if (a.thunder) {
      return n.thunderCd > 0 ? n.thunderCd : 0;
    }
    var e = n.spellCds && n.spellCds[a.id] || 0;
    return Math.max(e, n.spellCd > 0 ? n.spellCd : 0);
  };
  a.bindTestPanel = function () {
    if (a.testMode && "undefined" != typeof document) {
      var n = document.getElementById("skill-test-panel");
      if (n && "1" !== n.dataset.bound) {
        n.dataset.bound = "1";
        n.addEventListener("click", function (n) {
          var a = n.target.closest("[data-test-skill], [data-test-passive]");
          if (a) {
            if (a.dataset.testPassive) {
              O(a.dataset.testPassive);
            }
            else {
              C(a.dataset.testSkill);
            }
          }
        });
        document.addEventListener("keydown", function (n) {
          if (!n.repeat) {
            var a = n.target && n.target.tagName;
            if ("INPUT" !== a && "TEXTAREA" !== a && "SELECT" !== a) {
              var e = { Digit3: "hoa_cau", Digit4: "phong_nhan", Digit5: "bang_thau", Digit6: "dia_thich", Digit0: "ma_hon_phe", Minus: "nguyet_quang", Equal: "kim_quang_cu_kiem", Digit9: "ngu_sac_than_chuong", BracketLeft: "huyet_buc_chuong", BracketRight: "huyet_liem_tram", Backslash: "tu_anh_phuoc_tien", Quote: "xich_ma_hoa_than", Semicolon: "kim_cuong_hoa_than", Comma: "cuu_u_ma_trao", Period: "phi_long_tai_thien", Slash: "hoanh_tao_mac_ngan", Backquote: "son_ha_nhap_hoa" };
              var t = { Digit7: "kim_quang_chao", Digit8: "moc_xuan" };
              if ((e[n.code] || t[n.code])) {
                n.preventDefault();
                if (t[n.code]) {
                  O(t[n.code]);
                }
                else {
                  C(e[n.code]);
                }
              }
            }
          }
        });
        S();
      }
    }
  };
  a.bolts = [];
  a.grounds = [];
  a.auras = [];
  a.reset = function () {
    a.bolts.length = 0;
    a.grounds.length = 0;
    a.auras.length = 0;
  };
  a.cast = function (e, t, o, i) {
    if (t.bienHinh) {
      var r = t.bienHinh.fx ? n[t.bienHinh.fx] : null;
      if (r && r.spawnHoaThan) {
        r.spawnHoaThan(e.vfxOwner || e, { colors: t.colors, ghost: !!i });
      }
    }
    else {
      var h = function (a) {
        return window.NTBayCao(a);
      }(e);
      var u = o.x - e.x;
      var s = o.y - 10 - (e.y - 18 - h);
      var c = Math.sqrt(u * u + s * s) || 1;
      var l = Math.atan2(s, u);
      var g = o.target && !o.target.dead ? o.target : null;
      if ("aura" !== t.shape) {
        if ("ground" === t.shape) {
          var _ = Math.min(c, t.range);
          var m = g ? 0 : t.delay;
          var f = g ? g.x : e.x + Math.cos(l) * _;
          var d = g ? g.y : e.y + Math.sin(l) * _;
          if (t.hitDelay > 0 && (m = t.hitDelay), "kim_thuong_giang_the" === t.vfx && n.VFX.spawnKimThuongGiangThe && n.VFX.spawnKimThuongGiangThe(f, d), "tien_vu" === t.vfx && n.VFX.spawnTienVu && n.VFX.spawnTienVu(f, d, { colors: t.colors, radius: t.blastR }), "ma_bao_an" === t.vfx && n.VFX.spawnMaBaoAn && n.VFX.spawnMaBaoAn(f, d, { colors: t.colors, radius: t.blastR }), "ma_bao_an" === t.vfx && n.VFX.spawnTalismanPaper) {
            var p = e.x + 10 * Math.cos(l);
            var y = e.y - 18 - h + 6 * Math.sin(l);
            var v = f - p;
            var b = d - 22 - y;
            var k = Math.sqrt(v * v + b * b);
            var T = Math.max(.18, Math.min(.34, k / 560));
            var w = { paper: "#eedcff", edge: "#a74bd2", ink: "#541a70", glow: t.colors.glow || "#d27bff" };
            n.VFX.spawnRing(p, y, w.glow, 13, .2);
            n.VFX.spawnTalismanPaper(p, y, f, d, "ma_bao_an", { colors: w, fromLift: 0, toLift: 22, lift: 14, life: T });
          }
          if ("ma_hon_phe" === t.vfx && n.VFX.spawnMaHonPhe && n.VFX.spawnMaHonPhe(e, g || { x: f, y: d }, { colors: t.colors, range: t.range, hitDelay: t.hitDelay, ghost: !!i }), "nguyet_quang" === t.vfx && n.NguyetQuangFX && n.NguyetQuangFX.spawn(e, g || { x: f, y: d }, { colors: t.colors, radius: t.blastR, hitDelay: t.hitDelay, ghost: !!i }), "kim_quang_cu_kiem" === t.vfx && n.KimKiemFX && n.KimKiemFX.spawn(e.vfxOwner || e, g || { x: f, y: d }, { hitDelay: t.hitDelay, ghost: !!i }), "ngu_sac_than_chuong" === t.vfx && n.ThanChuongFX && n.ThanChuongFX.spawn(e, g || { x: f, y: d }, { colors: t.colors, radius: t.blastR, hitDelay: t.hitDelay, ghost: !!i }), "huyet_buc_chuong" === t.vfx && n.VFX.spawnHuyetBuc && n.VFX.spawnHuyetBuc(e.vfxOwner || e, g || { x: f, y: d }, { hitDelay: t.hitDelay, ghost: !!i }), "huyet_liem_tram" === t.vfx && n.VFX.spawnHuyetLiem && n.VFX.spawnHuyetLiem(e.vfxOwner || e, g || { x: f, y: d }, { hitDelay: t.hitDelay, ghost: !!i }), "phi_long_tai_thien" === t.vfx && n.VFX.spawnPhiLong) {
            var x = g ? [g] : [];
            if (a.enemiesNow) {
              x = x.concat(a.blastTargets(t, f, d, a.enemiesNow(), g));
            }
            n.VFX.spawnPhiLong(e.vfxOwner || e, x, { hitDelay: t.hitDelay, point: { x: f, y: d }, ghost: !!i });
          }
          if ("son_ha_nhap_hoa" === t.vfx && n.VFX.spawnMaTriMac) {
            n.VFX.spawnMaTriMac(e.vfxOwner || e, { kind: "landscape", angle: l, at: { x: f, y: d }, ghost: !!i, hitDelay: t.hitDelay });
          }
          if ("tu_van_cuong_phong" === t.vfx && n.VFX.spawnTuVanPhien) {
            n.VFX.spawnTuVanPhien(e.vfxOwner || e, { kind: "vortex", angle: l, at: { x: f, y: d }, ghost: !!i, hitDelay: t.hitDelay });
          }
          if ("tu_anh_phuoc_tien" === t.vfx && n.VFX.spawnTuAnhPhuoc) {
            n.VFX.spawnTuAnhPhuoc(e.vfxOwner || e, g || { x: f, y: d }, { variant: e.variant || (i ? void 0 : a.vuKhiHopLe(t, n)), hitDelay: t.hitDelay, bindTime: t.effect && t.effect.time, ghost: !!i });
          }
          if ("loi_thuong_quan_dia" === t.vfx && n.HoangLoiFX) {
            n.HoangLoiFX.spawnQuanDia(e.vfxOwner || e, g || { x: f, y: d }, { hitDelay: t.hitDelay, ghost: !!i });
          }
          if ("ngu_loi_thuong_vu" === t.vfx && n.HoangLoiFX) {
            n.HoangLoiFX.spawnThuongVu(e.vfxOwner || e, g || { x: f, y: d }, { hitDelay: t.hitDelay, radius: t.blastR, ghost: !!i });
          }
          var M = "van_kiem_quy_tong" === t.id && !g && t.waitForTarget > 0;
          var S = null;
          if ("van_kiem_quy_tong" === t.vfx && n.VanKiemFX) {
            S = n.VanKiemFX.spawn(e, { x: f, y: d, target: g }, t.hitDelay, t.waitForTarget, t.releaseDelay);
          }
          a.grounds.push({ def: t, owner: e.vfxOwner || e, x: f, y: d, target: g, delay: M ? t.waitForTarget + 1 : m, t: 0, fired: !1, waiting: M, vfx: S, ghost: !!i, life: M ? t.waitForTarget : m + .5 });
          return void n.VFX.spawnRing(e.x, e.y - 6 - h, t.colors.glow, 26, .45);
        }
        var C = e.x + 10 * Math.cos(l);
        var O = e.y - 18 - h + 6 * Math.sin(l);
        var P = (t.spread || 0) * Math.PI / 180;
        var A = !(!g || t.straight);
        if ("thanh_lam_kiem_tru" === t.id && n.VFX.spawnThanhLamKiemTru) {
          var K = Math.min(c, t.range);
          var R = g ? g.x : e.x + Math.cos(l) * K;
          var V = g ? g.y : e.y + Math.sin(l) * K;
          n.VFX.spawnThanhLamKiemTru(R, V, { target: g, angle: Math.atan2(V - e.y, R - e.x), colors: t.colors });
        }
        if ("huyen_am_tram" === t.id && n.HuyenAmTramFX) {
          n.HuyenAmTramFX.phat(e.x, e.y - h, l);   // Nghịch Tiên: Huyền Âm Trảm
        }
        if ("anh_ky_phu" === t.vfx && n.VFX.spawnAnhKyPhu) {
          n.VFX.spawnAnhKyPhu(C, O, g || { x: o.x, y: o.y }, { duration: Math.max(.34, Math.min(.68, c / t.speed)), hitU: .9, range: t.range, layers: t.vfxLayers });
        }
        for (var D = i ? 0 : a.dmgOf(t), F = 0; F < t.shots; F++) {
          var H = l + P * (t.shots > 1 ? F / (t.shots - 1) - .5 : 0);
          var I = Math.random() < .5 ? -1 : 1;
          H += A ? I * (.3 + .32 * Math.random()) : 0;
          var X = A ? .62 * t.speed : t.speed;
          a.bolts.push({ def: t, x: C, y: O, vx: Math.cos(H) * X, vy: Math.sin(H) * X, angle: H, target: g, guided: A, speedNow: X, accel: A ? 2.5 * t.speed : 0, turnRate: A ? 4.8 + 2.2 * Math.random() : 0, spin: Math.random() * Math.PI * 2, elapsed: 0, ghost: !!i, dmg: a.shotShare(D, t.shots, F), wait: "bang_thau" === t.id ? .055 * F : 0, travel: 0, maxTravel: A ? 1.55 * t.range : t.range, trail: 0, life: A ? t.range / X + .65 : t.range / t.speed + .25 });
        }
      }
      else {
        if (a.auras.push({ def: t, owner: e, x: e.x, y: e.y, delay: t.delay || 0, t: 0, fired: !1, ghost: !!i, aim: l, target: g, life: (t.delay || 0) + 1.05 }), n.VFX.spawnRing(e.x, e.y - 6 - h, t.colors.glow, .62 * t.blastR, .55), "tram_ma" === t.vfx && n.VFX.spawnTramMa && a.enemiesNow) {
          for (var B = a.blastTargets(t, e.x, e.y, a.enemiesNow(), null), q = 0; q < B.length; q++)
            n.VFX.spawnTramMa(B[q].x, B[q].y);
        }
        if ("cuu_u_ma_trao" === t.vfx && n.VFX.spawnMaTrao && a.enemiesNow) {
          var L = a.blastTargets(t, e.x, e.y, a.enemiesNow(), null);
          if (L.length) {
            n.VFX.spawnMaTrao(e.vfxOwner || e, L, { colors: t.colors, radius: t.blastR, hitDelay: t.hitDelay, ghost: !!i });
          }
        }
        if ("hoanh_tao_mac_ngan" === t.vfx && n.VFX.spawnMaTriMac && n.VFX.spawnMaTriMac(e.vfxOwner || e, { kind: "sweep", angle: l, ghost: !!i, hitDelay: t.hitDelay }), "tu_van_ma_vuc" === t.vfx && n.VFX.spawnTuVanPhien && n.VFX.spawnTuVanPhien(e.vfxOwner || e, { kind: "domain", angle: l, ghost: !!i, hitDelay: t.hitDelay }), "bang_kiem_luan" === t.vfx && n.VFX.list) {
          var E = n.VFX.list[n.VFX.list.length - 1];
          if (E && "lightring" === E.type) {
            E.renderLayer = 3 === e.dir ? "front" : "back";
          }
        }
      }
    }
  };
  var P = [];
  function A(n, a) {
    var e = (a - n) % (2 * Math.PI);
    if (e > Math.PI) {
      e -= 2 * Math.PI;
    }
    if (e < -Math.PI) {
      e += 2 * Math.PI;
    }
    return e;
  }
  function K(n, a, e, t, o, i, r, h) {
    F(n, a, e);
    if (n.blastR > 0) {
      R(n, t.x, t.y, o, i, n.primaryTarget ? t : null);
    }
    else {
      V(n, t, i, h);
    }
  }
  function R(e, t, o, i, r, h) {
    var u = !1;
    var s = [];
    if (h && !h.dead) {
      V(e, h, r);
      u = !0;
      s.push(h);
    }
    for (var c = a.blastTargets(e, t, o, i, h), l = 0; l < c.length; l++)
      V(e, c[l], r), u = !0, s.push(c[l]);
    if (u && e.lifesteal) {
      (function (e, t) {
        if (!n.Gateway || !n.Gateway.connected) {
          var o = n.SceneWorld && n.SceneWorld.player;
          if (o && a.lifestealOn(e)) {
            for (var i = a.lifestealApply(o, e, t.length, 0), r = [], h = 0; h < t.length && r.length < 5; h++)
              r.push([t[h].x, t[h].y]);
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
      })(e, s);
    }
    if (!u && ("aura" === e.shape || "ground" === e.shape && e.vfx)) {
      n.VFX.spawnText(t, o - 26, "aura" === e.shape ? "bang_kiem_luan" === e.vfx ? "Băng Kiếm Luân không chạm mục tiêu" : "cuu_u_ma_trao" === e.vfx ? "Ma Trảo không chạm mục tiêu" : "hoanh_tao_mac_ngan" === e.vfx ? "Hoành Tảo không chạm mục tiêu" : "tu_van_ma_vuc" === e.vfx ? "Ma Vực không chạm mục tiêu" : "Cửu Huyết Kiếm Trận không chạm mục tiêu" : "kim_thuong_giang_the" === e.vfx ? "Kim Thương giáng hụt" : "tien_vu" === e.vfx ? "Mưa tên trượt mục tiêu" : "ma_bao_an" === e.vfx ? "Ma ấn nổ hụt" : "ma_hon_phe" === e.vfx ? "Ma Hồn Phệ trượt mục tiêu" : "nguyet_quang" === e.vfx ? "Nguyệt Quang trượt mục tiêu" : "kim_quang_cu_kiem" === e.vfx ? "Kim Quang Cự Kiếm trượt mục tiêu" : "ngu_sac_than_chuong" === e.vfx ? "Thần Chưởng đập hụt" : "huyet_buc_chuong" === e.vfx ? "Huyết Bức Chưởng trượt mục tiêu" : "huyet_liem_tram" === e.vfx ? "Huyết Liêm Trảm trượt mục tiêu" : "tu_anh_phuoc_tien" === e.vfx ? "Tứ Ảnh Phược Tiên trượt mục tiêu" : "phi_long_tai_thien" === e.vfx ? "Phi Long trượt mục tiêu" : "son_ha_nhap_hoa" === e.vfx ? "Sơn Hà trượt mục tiêu" : "tu_van_cuong_phong" === e.vfx ? "Cuồng Phong trượt mục tiêu" : "loi_thuong_quan_dia" === e.vfx ? "Lôi Thương cắm hụt" : "ngu_loi_thuong_vu" === e.vfx ? "Mưa thương trượt mục tiêu" : "bang_kiem_tran" === e.vfx ? "Băng Kiếm Trận trượt mục tiêu" : "Kiếm trận trượt mục tiêu", e.colors.glow);
    }
  }
  function V(e, t, o, i) {
    if ("number" != typeof i) {
      i = a.dmgOf(e);
    }
    var r = !(!t || !(t.slowT > 0 || t.freezeT > 0));
    if (i > 0 && e.shatterBonus > 0 && r) {
      i = Math.round(i * (1 + e.shatterBonus));
    }
    var h = n.SceneWorld && n.SceneWorld.player;
    var u = i > 0 && a.dealDamage(t, i, o, h);
    var s = function (n, a) {
      if (!(n && a > 0 && "number" == typeof n.mp)) {
        return 0;
      }
      var e = Math.max(0, n.mp);
      n.mp = Math.max(0, e - a);
      return e - n.mp;
    }(t, e.mpDrain);
    D(t, a.effectOf ? a.effectOf(e) : e.effect);
    if (u && e.linhAn && !t.dead) {
      t.linhAnBy = h || null;
      t.linhAnBonus = e.linhAn.bonus;
      t.linhAnUntil = Date.now() + 1e3 * e.linhAn.time;
    }
    if (s > 0) {
      n.VFX.spawnText(t.x, t.y - 36, "-" + Math.round(s) + " Linh Lực", "#8fddff");
    }
  }
  function D(n, e) {
    if (n && e)
      if (Array.isArray(e)) {
        for (var t = 0; t < e.length; t++)
          D(n, e[t]);
      }
      else {
        if (a.effectApplies(e)) {
          if ("burn" === e.kind) {
            n.burnT = Math.max(n.burnT || 0, e.time);
            n.burnDps = e.dps;
            n.burnMa = !!e.ma;
            if (void 0 === n.burnTick) {
              n.burnTick = 1;
            }
          }
          else {
            if ("poison" === e.kind && e.chong > 1) {
              // Nghịch Tiên: độc cộng tầng (Huyền Âm Trảm) — mỗi lần trúng thêm 1 tầng tới e.chong, làm mới thời gian
              n.poisonChong = n.poisonT > 0 ? Math.min(e.chong, (n.poisonChong || 0) + 1) : 1;
              n.poisonT = Math.max(n.poisonT || 0, e.time);
              n.poisonDps = Math.max(1, Math.round((e.dps || 1) * n.poisonChong));
              if (void 0 === n.poisonTick) {
                n.poisonTick = 1;
              }
            }
            else if ("poison" === e.kind) {
              n.poisonT = Math.max(n.poisonT || 0, e.time);
              n.poisonDps = Math.max(n.poisonDps || 0, e.dps || 1);
              if (void 0 === n.poisonTick) {
                n.poisonTick = 1;
              }
            }
            else {
              if ("slow" === e.kind) {
                n.slowT = Math.max(n.slowT || 0, e.time);
                n.slowMult = Math.min(n.slowMult || 1, e.mult);
              }
              else {
                if ("stun" === e.kind) {
                  n.stunT = Math.max(n.stunT || 0, e.time);
                }
                else {
                  if ("root" === e.kind) {
                    n.rootT = Math.max(n.rootT || 0, e.time);
                  }
                  else {
                    if ("wound" === e.kind) {
                      if (!(n.woundT > 0)) {
                        n.woundTick = 1;
                      }
                      n.woundT = Math.max(n.woundT || 0, e.time);
                      n.woundDps = Math.max(n.woundDps || 0, e.dps || 1);
                    }
                    else {
                      if ("freeze" === e.kind) {
                        n.freezeT = Math.max(n.freezeT || 0, e.time);
                        n.stunT = Math.max(n.stunT || 0, e.time);
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
  function F(a, e, t, o, i) {
    if ("huyen_am_tram" === a.id && n.HuyenAmTramFX) {
      n.HuyenAmTramFX.trung(e, t);   // Nghịch Tiên: Huyền Âm Trảm
    }
    else if ("anh_ky_phu" === a.id && n.VFX.spawnAnhKyPhuImpact) {
      n.VFX.spawnAnhKyPhuImpact(e, t);
    }
    else {
      if ("thanh_lam_kiem_tru" === a.id) {
        if (n.VFX.spawnRing) {
          n.VFX.spawnRing(e, t, a.colors.glow, 22, .3);
        }
      }
      else {
        if ("hoa_cau" === a.id) {
          n.VFX.spawnFireBurst(e, t, a.colors);
        }
        else {
          if ("phong_nhan" === a.id) {
            n.VFX.spawnWindBurst(e, t, a.colors);
          }
          else {
            n.VFX.spawnIceBurst(e, t, a.colors);
          }
        }
      }
    }
  }
  function H(a, e, t) {
    n.VFX.spawnRipple(e, t, a.colors.glow);
    for (var o = 0; o < 3; o++)
      n.VFX.spawnEmber(e + (6 * Math.random() - 3), t + (6 * Math.random() - 3), a.colors.mid, a.colors.core);
  }
  a.enemiesNow = function () {
    return P;
  };
  a.update = function (e, t, o) {
    P = t = t || [];
    (function (e, t, o) {
      for (var i = a.bolts.length - 1; i >= 0; i--) {
        var r = a.bolts[i];
        if (r.wait > 0) {
          r.wait -= e;
        }
        else {
          if (r.life -= e, r.spin += 14 * e, r.elapsed += e, r.target && r.target.dead && (r.target = null), r.target && r.guided) {
            var h = Math.atan2(r.target.y - 10 - r.y, r.target.x - r.x);
            var u = A(r.angle, h);
            var s = r.turnRate * e;
            if (Math.abs(u) <= s) {
              r.angle = h;
            }
            else {
              r.angle += u < 0 ? -s : s;
            }
            r.speedNow = Math.min(r.def.speed, r.speedNow + r.accel * e);
            r.vx = Math.cos(r.angle) * r.speedNow;
            r.vy = Math.sin(r.angle) * r.speedNow;
          }
          r.x += r.vx * e;
          r.y += r.vy * e;
          r.travel += Math.sqrt(r.vx * r.vx + r.vy * r.vy) * e;
          r.trail -= e;
          if (r.trail <= 0) {
            r.trail = .035;
            n.VFX.spawnEmber(r.x, r.y, r.def.colors.mid, r.def.colors.core);
          }
          var c = null;
          if (r.target) {
            var l = r.target.x - r.x;
            var g = r.target.y - 10 - r.y;
            if (Math.sqrt(l * l + g * g) <= r.def.hitR + 6) {
              c = r.target;
            }
          }
          else {
            for (var _ = 0; _ < t.length; _++) {
              var m = t[_];
              if (!m.dead) {
                var f = m.x - r.x;
                var d = m.y - 10 - r.y;
                if (Math.sqrt(f * f + d * d) <= r.def.hitR + 6) {
                  c = m;
                  break;
                }
              }
            }
          }
          if (c) {
            if (r.ghost) {
              F(r.def, r.x, r.y, r.target, r.angle);
            }
            else {
              K(r.def, r.x, r.y, c, t, o, r.angle, r.dmg);
            }
            a.bolts.splice(i, 1);
          }
          else {
            if ((r.life <= 0 || r.travel >= r.maxTravel)) {
              H(r.def, r.x, r.y);
              a.bolts.splice(i, 1);
            }
          }
        }
      }
    })(e, t, o);
    (function (e, t, o) {
      for (var i = a.grounds.length - 1; i >= 0; i--) {
        var r = a.grounds[i];
        if (r.t += e, r.waiting) {
          if ((!n.Gateway || !n.Gateway.connected) && !r.ghost && r.owner) {
            for (var h = null, u = 1 / 0, s = 0; s < t.length; s++) {
              var c = t[s];
              if (c && !c.dead) {
                var l = c.x - r.owner.x;
                var g = c.y - r.owner.y;
                var _ = l * l + g * g;
                if (_ <= r.def.range * r.def.range && _ < u) {
                  h = c;
                  u = _;
                }
              }
            }
            if (h) {
              a.releaseVanKiem(r.owner, h, { x: h.x, y: h.y }, r.def.releaseDelay);
            }
          }
          if (r.waiting) {
            if (r.t >= r.life) {
              a.grounds.splice(i, 1);
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
            if ("kim_thuong_giang_the" === r.def.vfx || "van_kiem_quy_tong" === r.def.vfx || "tien_vu" === r.def.vfx || "ma_bao_an" === r.def.vfx || "ma_hon_phe" === r.def.vfx || "nguyet_quang" === r.def.vfx || "kim_quang_cu_kiem" === r.def.vfx || "ngu_sac_than_chuong" === r.def.vfx || "huyet_buc_chuong" === r.def.vfx || "loi_thuong_quan_dia" === r.def.vfx || "ngu_loi_thuong_vu" === r.def.vfx || "huyet_liem_tram" === r.def.vfx || "tu_anh_phuoc_tien" === r.def.vfx || "phi_long_tai_thien" === r.def.vfx || "son_ha_nhap_hoa" === r.def.vfx || "tu_van_cuong_phong" === r.def.vfx) {
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
          var m = "nguyet_quang" === r.def.vfx || "ngu_sac_than_chuong" === r.def.vfx;
          var f = "kim_quang_cu_kiem" === r.def.vfx;
          var d = "phi_long_tai_thien" === r.def.vfx;
          if (f && n.Audio && n.Audio.atPoint) {
            n.Audio.atPoint("skill_goldsword_hit", r.x, r.y, { gain: 1, rate: .96 + .08 * Math.random() });
          }
          if (r.ghost) {
            if (!(m)) {
              n.Camera.shakeAt(r.x, r.y, f ? 7 : d ? 6 : 4, f ? .34 : d ? .3 : .22);
            }
          }
          else {
            if (!(m)) {
              n.Camera.shake(f ? 7 : d ? 6 : 4, f ? .34 : d ? .3 : .22);
            }
            if ("van_kiem_quy_tong" === r.def.id) {
              if (r.target && !r.target.dead) {
                V(r.def, r.target, o);
              }
            }
            else {
              R(r.def, r.x, r.y, t, o, r.target);
            }
          }
        }
        if (r.t >= r.life) {
          a.grounds.splice(i, 1);
        }
      }
    })(e, t, o);
    (function (e, t, o) {
      for (var i = a.auras.length - 1; i >= 0; i--) {
        var r = a.auras[i];
        if (r.t += e, r.owner && !r.fired && (r.x = r.owner.x, r.y = r.owner.y), !r.fired && r.t >= r.delay) {
          if (r.fired = !0, "cuu_huyet_tran" === r.def.vfx && n.VFX.spawnCuuHuyetTran) {
            n.VFX.spawnCuuHuyetTran(r.x, r.y, { colors: r.def.colors, radius: r.def.blastR });
          }
          else if ("bang_kiem_luan" === r.def.vfx && n.VFX.spawnBangKiemLuan) {
            var h = a.blastTargets(r.def, r.x, r.y, t, null);
            n.VFX.spawnBangKiemLuan(r.x, r.y, { colors: r.def.colors, radius: r.def.blastR, dir: r.owner && r.owner.dir, aim: r.aim, targets: h });
          }
          if (r.ghost) {
            n.Camera.shakeAt(r.x, r.y, 5, .24);
          }
          else {
            n.Camera.shake(5, .24);
            R(r.def, r.x, r.y, t, o);
          }
        }
        if (r.t >= r.life) {
          a.auras.splice(i, 1);
        }
      }
    })(e, t, o);
    (function (e, t, o) {
      for (var i = 0; i < t.length; i++) {
        var r = t[i];
        var h = r.burnT > 0;
        var u = r.poisonT > 0;
        var s = r.freezeT > 0;
        var c = r.stunT > 0 && !s;
        a.tickStatus(r, e, function (n) {
          a.dealDamage(r, n, o);
        });
        if (!(r.dead)) {
          if (c && Math.random() < 9 * e) {
            n.VFX.spawnEmber(r.x + (14 * Math.random() - 7), r.y - 22, "#f0d27a", "#fff3c4");
          }
          if (h && Math.random() < 16 * e) {
            n.VFX.spawnEmber(r.x + (10 * Math.random() - 5), r.y - 6 - 12 * Math.random(), "#ff9a3c", "#fff3c4");
          }
          if (u && Math.random() < 10 * e) {
            n.VFX.spawnEmber(r.x + (12 * Math.random() - 6), r.y - 8 - 12 * Math.random(), "#58bd5c", "#d7ff9a");
          }
        }
      }
    })(e, t, o);
  };
  a.releaseVanKiem = function (e, t, o, i) {
    if (!e) {
      return !1;
    }
    for (var r = a.grounds.length - 1; r >= 0; r--) {
      var h = a.grounds[r];
      if (h.waiting && h.owner === e && "van_kiem_quy_tong" === h.def.id) {
        var u = t && !t.dead ? t.x : o && o.x;
        var s = t && !t.dead ? t.y : o && o.y;
        if (!Number.isFinite(u) || !Number.isFinite(s)) {
          return !1;
        }
        var c = i > 0 ? i : h.def.releaseDelay || 1.15;
        h.target = t && !t.dead ? t : null;
        h.x = u;
        h.y = s;
        h.waiting = !1;
        h.delay = h.t + c;
        h.life = h.delay + .55;
        if (h.vfx && n.VanKiemFX && n.VanKiemFX.release) {
          n.VanKiemFX.release(h.vfx, h.target, { x: u, y: s }, c);
        }
        return !0;
      }
    }
    return !1;
  };
  a.blastTargets = function (n, a, e, t, o) {
    for (var i = [], r = 0; r < t.length; r++) {
      var h = t[r];
      if (!h.dead && h !== o) {
        var u = h.x - a;
        var s = h.y - e;
        var c = u * u + s * s;
        if (!(Math.sqrt(c) > n.blastR)) {
          i.push({ enemy: h, d2: c });
        }
      }
    }
    if (n.maxTargets) {
      i.sort(function (n, a) {
        return n.d2 - a.d2;
      });
      i.length = Math.min(i.length, n.maxTargets);
    }
    for (var l = [], g = 0; g < i.length; g++)
      l.push(i[g].enemy);
    return l;
  };
  a.dealDamage = function (a, e, t, o) {
    if (!n.SceneWorld || !n.SceneWorld.requestHit) {
      return !1;
    }
    var i = a && a.hp;
    n.SceneWorld.requestHit(a, e, t, o);
    return !!(a && "number" == typeof i && a.hp < i);
  };
  a.applyEffect = D;
  a.tickStatus = function (n, a, e) {
    if (n.dead) {
      n.burnT = n.poisonT = n.slowT = n.stunT = n.freezeT = n.woundT = n.rootT = 0;
      return void (n.burnMa = !1);
    }
    if (n.rootT > 0) {
      n.rootT = Math.max(0, n.rootT - a);
    }
    if (n.woundT > 0) {
      n.woundT -= a;
      n.woundTick = (n.woundTick || 0) - a;
      if (n.woundTick <= 0) {
        n.woundTick += 1;
        if (e) {
          e(n.woundDps || 1, "wound");
        }
      }
      if (n.woundT <= 0) {
        n.woundT = 0;
        n.woundDps = 0;
        n.woundTick = 1;
      }
    }
    if (n.slowT > 0) {
      n.slowT -= a;
      if (n.slowT <= 0) {
        n.slowT = 0;
        n.slowMult = 1;
      }
    }
    if (n.stunT > 0) {
      n.stunT = Math.max(0, n.stunT - a);
    }
    if (n.freezeT > 0) {
      n.freezeT = Math.max(0, n.freezeT - a);
    }
    if (n.burnT > 0) {
      n.burnT -= a;
      n.burnTick -= a;
      if (n.burnTick <= 0) {
        n.burnTick = 1;
        if (e) {
          e(n.burnDps || 1, "burn");
        }
      }
      if (n.burnT <= 0) {
        n.burnT = 0;
        n.burnMa = !1;
      }
    }
    if (n.poisonT > 0) {
      n.poisonT -= a;
      n.poisonTick = (n.poisonTick || 0) - a;
      if (n.poisonTick <= 0) {
        n.poisonTick += 1;
        if (e) {
          e(n.poisonDps || 1, "poison");
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
  a.draw = function (e, t, o) {
    for (var i = n.Pixel, r = n.Utils, h = 0; h < a.bolts.length; h++) {
      var u = a.bolts[h];
      if (!(u.wait > 0)) {
        var s = Math.round(u.x - t);
        var c = Math.round(u.y - o);
        var l = u.def.colors;
        if ("huyen_am_tram" === u.def.id && n.HuyenAmTramFX) {
          n.HuyenAmTramFX.veDan(e, u, s, c);   // Nghịch Tiên: Huyền Âm Trảm
        }
        else if ("anh_ky_phu" !== u.def.id && "thanh_lam_kiem_tru" !== u.def.id)
          if ("hoa_cau" === u.def.id) {
            var g = 1 + .14 * Math.sin(u.spin);
            var _ = 1 + .1 * Math.sin(.72 * u.spin + .8);
            i.ellipse(e, s, c, 10 * g, 8 * g, r.alpha(l.edge, .32), null);
            i.ellipse(e, s, c, 8 * g, 7 * g, r.alpha(l.glow, .48), null);
            i.ellipse(e, s, c, 5 * _, 5 * _, l.mid, l.edge);
            i.ellipse(e, s - 1, c - 1, 3, 3, l.core, null);
            i.dot(e, s - 2, c - 2, "#ffffff");
            for (var m = u.angle + Math.PI, f = 0; f < 5; f++) {
              var d = m + .3 * (f - 2) + .16 * Math.sin(u.spin + f);
              var p = 7 + (2 === f ? 5 : f % 2 ? 2 : 0);
              i.dot(e, s + Math.cos(d) * p, c + Math.sin(d) * p, r.alpha(l.glow, .85));
              i.dot(e, s + Math.cos(d) * (p - 3), c + Math.sin(d) * (p - 3), l.mid);
            }
            for (var y = 0; y < 4; y++) {
              var v = .28 * u.spin + y * Math.PI / 2;
              i.dot(e, s + 7 * Math.cos(v) * g, c + 5 * Math.sin(v) * g, r.alpha(l.glow, .72));
            }
          }
          else if ("phong_nhan" === u.def.id) {
            var b = u.angle + Math.PI / 2;
            var k = Math.cos(u.angle);
            var T = Math.sin(u.angle);
            var w = Math.cos(b);
            var x = Math.sin(b);
            var M = 1 + .08 * Math.sin(1.35 * u.spin);
            i.ellipse(e, s - 1.5 * k, c - 1.5 * T, 8 * M, 9 * M, r.alpha(l.glow, .12), null);
            for (var S = 0; S < 5; S++) {
              var C = 2.2 * (S - 2);
              var O = Math.sin(1.1 * u.spin + 2.2 * S) * (1.2 + .22 * S);
              var P = s - k * (5 + S) + w * C;
              var A = c - T * (5 + S) + x * C;
              var K = s - k * (15 + 3 * S) + w * (C + O);
              var R = c - T * (15 + 3 * S) + x * (C + O);
              i.line(e, P, A, K, R, r.alpha(2 === S ? l.mid : l.glow, 2 === S ? .72 : .42));
              if (2 === S) {
                i.dot(e, K, R, r.alpha(l.core, .55));
              }
            }
            for (var V = 0; V < 2; V++) {
              var D = s - k * (9 + 5 * V);
              var F = c - T * (9 + 5 * V);
              var H = 4 + 2 * V + 1.2 * Math.sin(u.spin + V);
              i.line(e, D - w * H, F - x * H, D + w * H, F + x * H, r.alpha(l.core, .34 - .08 * V));
            }
            for (var I = -5; I <= 5; I++) {
              var X = I / 5;
              var B = 6 * (1 - X * X);
              var q = s + w * I * 1.75 + k * B;
              var L = c + x * I * 1.75 + T * B;
              i.dot(e, q - 2 * k, L - 2 * T, r.alpha(l.edge, .86 - .28 * Math.abs(X)));
              i.dot(e, q, L, Math.abs(I) < 4 ? l.core : l.mid);
              if (Math.abs(I) < 3) {
                i.dot(e, q + k, L + T, r.alpha("#ffffff", .92));
              }
            }
            i.dot(e, s + 7 * k, c + 7 * T, "#ffffff");
          }
          else {
            var E = Math.cos(u.angle);
            var N = Math.sin(u.angle);
            var Q = (w = -N, x = E, M = 1 + .1 * Math.sin(1.45 * u.spin), s + 6 * E);
            var G = c + 6 * N;
            var U = s - 6 * E;
            var W = c - 6 * N;
            i.ellipse(e, s - 2 * E, c - 2 * N, 8 * M, 3 * M, r.alpha(l.glow, .2), null);
            i.line(e, U - 5 * E, W - 5 * N, U + 1 * E, W + 1 * N, r.alpha(l.edge, .52));
            i.fatLine(e, U, W, Q, G, 3, r.alpha(l.edge, .9));
            i.fatLine(e, U, W, Q, G, 1, l.mid);
            i.line(e, U + 1.5 * w, W + 1.5 * x, Q - 1.2 * E + 1.5 * w, G - 1.2 * N + 1.5 * x, r.alpha(l.core, .8));
            i.dot(e, Q, G, l.core);
            i.dot(e, Q - E, G - N, "#ffffff");
            for (var j = 0; j < 3; j++)
              d = .55 * u.spin + j * Math.PI * 2 / 3, i.dot(e, s + 6 * Math.cos(d), c + 3 * Math.sin(d), r.alpha(l.core, .58));
          }
      }
    }
    for (var z = 0; z < a.grounds.length; z++) {
      var Y = a.grounds[z];
      if (!Y.fired && "nguyet_quang" !== Y.def.vfx && "kim_quang_cu_kiem" !== Y.def.vfx && "ngu_sac_than_chuong" !== Y.def.vfx && "huyet_buc_chuong" !== Y.def.vfx && "huyet_liem_tram" !== Y.def.vfx && "tu_anh_phuoc_tien" !== Y.def.vfx && "phi_long_tai_thien" !== Y.def.vfx && "son_ha_nhap_hoa" !== Y.def.vfx && "tu_van_cuong_phong" !== Y.def.vfx) {
        var $ = Math.round(Y.x - t);
        var J = Math.round(Y.y - o);
        var Z = Y.delay > 0 ? Math.min(1, Y.t / Y.delay) : 1;
        var nn = 6 + Z * (Y.def.blastR - 6);
        i.ellipse(e, $, J, nn, Math.max(1, .45 * nn), null, r.alpha(Y.def.colors.glow, .35 + .45 * Z));
        for (var an = 0; an < 4; an++) {
          var en = an * Math.PI / 2 + .4;
          i.line(e, $, J, $ + Math.cos(en) * nn * .8, J + Math.sin(en) * nn * .36, r.alpha(Y.def.colors.edge, .6 * Z));
        }
      }
    }
  };
  a.bindTestPanel();
}(window.PNTT);
