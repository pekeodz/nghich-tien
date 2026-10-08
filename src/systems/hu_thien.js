!function (n) {
  "use strict";
  var t = n.HuThien = {};
  var _ = 36e5;
  var a = 24 * _;
  function h(n) {
    return Math.floor((n + t.VN_OFFSET_MS) / a) * a;
  }
  function i(n) {
    return (n < 10 ? "0" : "") + n;
  }
  t.VN_OFFSET_MS = 7 * _;
  t.MAP_1 = "hu_thien_1";
  t.MAP_2 = "hu_thien_2";
  t.MAP_3 = "hu_thien_3";
  t.MAP_4 = "hu_thien_4";
  t.MAPS = [t.MAP_1, t.MAP_2, t.MAP_3, t.MAP_4];
  t.TEN_AI = { hu_thien_1: "Ải 1 · Dược Viên", hu_thien_2: "Ải 2 · Băng Hỏa Trận", hu_thien_3: "Ải 3 · Nội Điện", hu_thien_4: "Mật Thất" };
  t.laMap = function (n) {
    return t.MAPS.indexOf(String(n || "")) >= 0;
  };
  t.ai = function (n) {
    return t.MAPS.indexOf(String(n || "")) + 1;
  };
  t.pkTuDo = function (n) {
    return t.laMap(n);
  };
  t.NPC = "hu_thien_cuc_lac";
  t.NPC_MAP = "dong_mach_ngam";
  t.VE_O = { tx: 21, ty: 15 };
  t.THU_KHAI = [4];
  t.GIO_KHAI = 20;
  t.PHUT_KHAI = 16;
  t.KEO_DAI = 18e5;
  t.BAO_TRUOC = 96e4;
  t.DONG_CUA_SAU = 12e5;
  t.ngayVN = function (n) {
    var _ = new Date(Math.floor(Number(n) || 0) + t.VN_OFFSET_MS);
    return _.getUTCFullYear() + "-" + i(_.getUTCMonth() + 1) + "-" + i(_.getUTCDate());
  };
  t.laNgayKhai = function (n) {
    var _ = new Date(h(Math.floor(Number(n) || 0))).getUTCDay();
    return t.THU_KHAI.indexOf(_) >= 0;
  };
  t.dungKy = function (n, _, a) {
    _ = _ || t.KEO_DAI;
    return { id: (a || "htd") + ":" + n, ngay: t.ngayVN(n), baoLuc: n - t.BAO_TRUOC, batDauLuc: n, dongCuaLuc: n + Math.min(t.DONG_CUA_SAU, _), ketThucLuc: n + _ };
  };
  t.kyTai = function (n) {
    var i = h(n = Math.floor(Number(n) || 0)) + t.GIO_KHAI * _ + 6e4 * t.PHUT_KHAI - t.VN_OFFSET_MS;
    if (n >= i + t.KEO_DAI) {
      i += a;
    }
    for (var o = 0; o < 8 && !t.laNgayKhai(i); o++)
      i += a;
    return t.dungKy(i);
  };
  t.giaiDoan = function (n, _) {
    return n < (_ = _ || t.kyTai(n)).baoLuc ? "NGHI" : n < _.batDauLuc ? "BAO" : n < _.ketThucLuc ? "MO" : "XONG";
  };
  t.conNhanDoi = function (n, _) {
    return "MO" === t.giaiDoan(n, _) && n < _.dongCuaLuc;
  };
  t.gioDoc = function (n) {
    var _ = new Date(Math.floor(Number(n) || 0) + t.VN_OFFSET_MS);
    return i(_.getUTCHours()) + ":" + i(_.getUTCMinutes());
  };
  t.giayDoc = function (n) {
    var t = Math.max(0, Math.ceil((Number(n) || 0) / 1e3));
    return Math.floor(t / 60) + ":" + i(t % 60);
  };
  t.TUOI_TONG_MS = 3 * _;
  t.TUOI_THANH_VIEN_MS = 3 * _;
  t.TONG_TOI_THIEU = 3;
  t.TOI_DA_MOI_TONG = 20;
  t.TONG_TOI_THIEU_KY = 2;
  t.tongDuTuoi = function (n, _) {
    return _ - (Number(n && n.taoLuc) || 0) >= t.TUOI_TONG_MS;
  };
  t.thanhVienDuTuoi = function (n, _) {
    return _ - (Number(n && n.vaoLuc) || 0) >= t.TUOI_THANH_VIEN_MS;
  };
  t.TEN_BANG = function () {
    return "Bản chung";
  };
  t.CAN_CANH_GIOI = "luyen_khi_7";
  t.CANH_GIOI = ["truc_co"];
  t.TEN_CG = { truc_co: "Trúc Cơ" };
  t.duCanhGioi = function (_) {
    var a = n.realmIndexById ? n.realmIndexById(String(_ || "")) : 0;
    return (0 | a) >= (0 | (n.realmIndexById ? n.realmIndexById(t.CAN_CANH_GIOI) : 7)) && (0 | a) > 0;
  };
  t.canhGioi = function (n) {
    return t.duCanhGioi(n) ? "truc_co" : null;
  };
  t.NGOC_PHU = "htd_ngoc_phu";
  t.CAN_NGOC_PHU = 3;
  t.NGOC_PHU_TOI_DA = 3;
  t.HUT_PHU_THEM = 110;
  t.HU_ANH = "HU_ANH";
  t.AI1_DONG_MS = 9e5;
  t.BAO_AI1_DONG = [3e5, 6e4];
  t.TRU_BAN = { TAM: 240, NHIP_MS: 1100, BAY_MS: 300 };
  t.PK_AI = { 1: !1, 2: !1, 3: !0, 4: !0 };
  t.TRU = { bang: "htd_tru_bang", hoa: "htd_tru_hoa" };
  t.mauTru = function (n) {
    return n === t.TRU.bang ? "xanh" : "do";
  };
  t.laTru = function (n) {
    return n === t.TRU.bang || n === t.TRU.hoa;
  };
  t.LOAI_DINH = "htd_dinh";
  t.laDinh = function (n) {
    return !!n && !n.dead && n.type === t.LOAI_DINH;
  };
  t.trongSanh = function (t, _, a) {
    var h = t && t.htSanh;
    if (!h) {
      return !1;
    }
    var i = n.CONFIG && n.CONFIG.TILE || 32;
    var o = Math.floor(_ / i);
    var u = Math.floor((a - 1) / i);
    return o >= h.tx0 && o <= h.tx1 && u >= h.ty0 && u <= h.ty1;
  };
  t.trongVong = function (t, _, a) {
    if (!t) {
      return !1;
    }
    var h = n.CONFIG && n.CONFIG.TILE || 32;
    var i = (t.tx + .5) * h;
    var o = (t.ty + .5) * h;
    var u = t.r || 40;
    var r = _ - i;
    var c = a - o;
    return r * r + c * c <= u * u;
  };
  t.trongHanhLang = function (t, _, a) {
    var h = t && t.htCamChe;
    if (!h) {
      return !1;
    }
    var i = n.CONFIG && n.CONFIG.TILE || 32;
    var o = Math.floor(_ / i);
    var u = Math.floor((a - 1) / i);
    return o >= h.tx0 && o <= h.tx1 && u >= h.ty0 && u <= h.ty1;
  };
  t.raoKhung = function (t) {
    var _ = t && t.htRao;
    if (!_) {
      return null;
    }
    var a = n.CONFIG && n.CONFIG.TILE || 32;
    return { x0: _.tx0 * a, y0: _.ty0 * a, x1: (_.tx1 + 1) * a, y1: (_.ty1 + 1) * a };
  };
  var o = 7 * a;
  var u = 23 * _;
  t.tuanSo = function (n) {
    return Math.floor((Math.floor(Number(n) || 0) + t.VN_OFFSET_MS - u) / o);
  };
  t.chotKeTiep = function (n) {
    return (t.tuanSo(n) + 1) * o + u - t.VN_OFFSET_MS;
  };
  t.PHAN_THUONG_HA_SAT = { 1: [{ id: "manh_yeu_dan_cap_3", n: 3 }, { id: "linh_thach", n: 1e3 }, { id: "ruong_khoi_loi", n: 1 }], 2: [{ id: "manh_yeu_dan_cap_3", n: 2 }, { id: "linh_thach", n: 700 }, { id: "ruong_khoi_loi", n: 1 }], 3: [{ id: "manh_yeu_dan_cap_3", n: 1 }, { id: "linh_thach", n: 500 }, { id: "ruong_khoi_loi", n: 1 }] };
  t.PHAN_THUONG_DINH = { 1: [{ id: "manh_yeu_dan_cap_3", n: 2 }, { id: "linh_thach", n: 800 }], 2: [{ id: "manh_yeu_dan_cap_3", n: 1 }, { id: "linh_thach", n: 500 }], 3: [{ id: "linh_thach", n: 300 }] };
  t.LOI = { chua_mo: "Sỹ Sách Điện chưa mở.", khoa: "Sỹ Sách Điện đang đóng.", het_nhan: "Đã qua giờ nhận người mới.", chua_co_bang: "Danh sách tông môn chốt lúc 20:00 tối Thứ Năm — chưa có.", khong_o_tong: "Sỹ Sách Điện chỉ dành cho tông môn — đạo hữu chưa thuộc tông môn nào.", tong_non: "Tông môn chưa đủ 3 giờ tuổi.", moi_vao_tong: "Đạo hữu vào tông chưa đủ 3 giờ.", chua_du_canh_gioi: "Cần Luyện Khí tầng 7 trở lên.", tong_ngoai_bang: "Tông môn không có tên trong bảng kỳ này (cần 3 người đủ tư cách lúc 20:00).", xa_npc: "Hãy tới cạnh Thủ Điện Sỹ Sách ở Miếu Ông Trường Con.", tong_day: "Tông môn đã đủ 20 người trong điện.", ai1_dong: "Ải 1 đã đóng — tông môn chưa mở được cửa nên không vào nữa.", ai1_da_mo: "Tông môn đã mở cửa Ải 1 — không nhặt đồ ở đây nữa.", trong_thuong: "Có người đang trọng thương.", dang_tran: "Đang tỉ thí hoặc trong trận.", dang_giam: "Đang bị giam.", dang_giao_chien: "Vừa giao chiến, đợi một lát.", khong_trong: "Đạo hữu không ở trong Sỹ Sách Điện.", thieu_ngoc_phu: "Tông môn cần 3 Sỹ Sách Ngọc Phù để mở cửa Ải 1.", rao_dong: "Hàng rào Băng Hỏa còn đóng — đánh sập cả Trụ Băng và Trụ Hoả trước.", xoay_dong: "Vòng xoáy đã đóng.", xoay_day: "Mật Thất đã đủ tông.", xa_vat: "Đứng sát hơn nữa.", dang_van: "Đang vận rồi.", nguoi_khac_van: "Có người đang vận món này.", tui_day: "Túi đồ đã đầy.", tran_ky: "Đã nhặt đủ phần của đạo hữu kỳ này.", da_co_ngoc_phu: "Mỗi người mang tối đa 3 Ngọc Phù.", vung_an_toan: "Không vận trong vùng an toàn.", cho_hoi_sinh: "Chưa hồi sinh được." };
  t.viLoi = function (n) {
    _ = t.LOI;
    a = n;
    return Object.prototype.hasOwnProperty.call(_, a) ? t.LOI[n] : "Chưa thực hiện được.";
    var _;
    var a;
  };
}(window.PNTT);
