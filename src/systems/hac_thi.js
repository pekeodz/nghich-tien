!function (n) {
  "use strict";
  var a = n.HacThi = {};
  function t(n) {
    if (n && n.Quest && n.Quest.save) {
      n.Quest.save();
    }
  }
  a.MAP_HPL = "hac_phong_linh";
  a.MAP_CHO = "hac_thi";
  a.MAP_TAM = "tam_canh";
  a.MAP_LAO = "bat_quai_thach_phan";
  a.MAP_UUV = "u_uynh_vuc";
  a.NPC_AN_MAY = "lao_an_may_gu";
  a.NPC_QUY_NHA = "quy_nha_lao_nhan";
  a.NPC_DAU_GIA = "mac_tam_nuong";
  a.NPC_CAI_NGUC = "cai_nguc";
  a.NPC_CHAP_PHAP = "chap_phap_su";
  a.QUY_DIEN = "quy_dien";
  a.HAC_PHIEU = "hac_phieu";
  a.HUYET_NGOC_CHI = "huyet_ngoc_chi";
  a.NGUNG_NGUYEN_DAN = "ngung_nguyen_dan";
  a.SO_SACH = "so_sach_quy_nha";
  a.MANH_GIAY = ["manh_giay_am_hieu_1", "manh_giay_am_hieu_2", "manh_giay_am_hieu_3"];
  a.KHOA_CHO = ["quy_dien", "huyet_ngoc_chi", "ngung_nguyen_dan"];
  a.GD = { NUT_THAT: 31, AM_HIEU: 31, CHUYEN_DAU: 32, SO_THU_MUA: 33, PHA_QUAN: 34 };
  a.CHUYEN_DAU_HANG = "yeu_dan_cap_1";
  a.CHUYEN_DAU_SO = 5;
  a.PHUC_KICH_CAN = 3;
  a.PHUC_KICH_LOAI = "phuc_kich_ta_tu";
  a.TUAN_VE_CAN = 3;
  a.TUAN_VE_LOAI = "chap_phap_tuan_ve";
  a.TO_GIAC_LINH_THACH = 1500;
  a.LUYEN_DAN_LINH_THACH = 300;
  a.CO = { HOI_TRUNG_KY: "hoi_trung_ky", THO_REN_MACH: "tho_ren_mach_hac_thi", GAP_AN_MAY: "gap_an_may_gu", AM_HIEU: "doc_am_hieu", GAP_QUY_NHA: "gap_quy_nha", PHUC_KICH: "hac_phuc_kich", GIAO_CHUYEN: "giao_chuyen_dau", NHAN_SO: "nhan_so_sach", TUAN_VE: "hac_tuan_ve", NHANH: "gd28_nhanh", MAN_HAN: "man_han_giam", DANH_HIEU_A: "danh_hieu_khong_mat", DANH_HIEU_B: "danh_hieu_thiet_dien", DOI_CHI: "doi_huyet_ngoc_chi", BO_PHIEU: "bo_phieu_dau_gia", LUYEN_DAN: "luyen_ngung_nguyen", TAM_KIEP: "thang_tam_kiep" };
  a.TY_LE_PHIEU = .8;
  a.LT_MOI_PHIEU = 20;
  a.TRAN_PHIEU_NGAY = 600;
  a.TIEU_SU_THUONG = .1;
  a.lamTronPhieu = function (n) {
    return Math.round(100 * (Number(n) || 0) + 1e-7) / 100;
  };
  a.tachCong = function (n) {
    var t = Math.max(0, Math.floor(Number(n) || 0));
    return { phieu: Math.floor(t * a.TY_LE_PHIEU / a.LT_MOI_PHIEU * 100 + 1e-7) / 100, lt: Math.floor(t * (1 - a.TY_LE_PHIEU) + 1e-9) };
  };
  a.TAY_NAI_O = 6;
  a.TAY_NAI_MON = 40;
  a.BAC_DANH = [{ ten: "Mặt Lạ", tu: 0 }, { ten: "Khách Quen", tu: 100 }, { ten: "Người Nhà", tu: 500 }, { ten: "Tâm Phúc", tu: 1500 }];
  a.THU_MUA = [{ id: "linh_ngu", bac: 1 }, { id: "linh_ke_can", bac: 1 }, { id: "tran_than_thach", bac: 1 }, { id: "co_bich_moc", bac: 1 }, { id: "pha_canh_dan", bac: 1 }, { id: "ngu_hanh_thao", bac: 1 }, { id: "nguu_sung", bac: 1 }, { id: "nanh_ho", bac: 1 }, { id: "yeu_dan_cap_1", bac: 1 }];
  a.dongThuMua = function (n) {
    for (var t = 0; t < a.THU_MUA.length; t++)
      if (a.THU_MUA[t].id === n) {
        return a.THU_MUA[t];
      }
    return null;
  };
  a.GIA_HUYET_NGOC_CHI = 200;
  a.DOI = [{ ma: "huyet_ngoc_chi", id: "huyet_ngoc_chi", n: 1, gia: a.GIA_HUYET_NGOC_CHI, bac: 1 }, { ma: "bao_menh_phu", id: "bao_menh_phu", n: 1, gia: 80, bac: 1 }, { ma: "phu_kim_o", id: "phu_kim_o", n: 1, gia: 45, bac: 1 }, { ma: "luc_tinh_thach", id: "luc_tinh_thach", n: 1, gia: 40, bac: 1 }, { ma: "hat_ngu_hanh", id: "hat_ngu_hanh_thao", n: 1, gia: 50, bac: 2 }, { ma: "loan_loi_hoa", id: "tran_ban_loan_loi_hoa", n: 1, gia: 250, bac: 3 }];
  a.dongDoi = function (n) {
    for (var t = 0; t < a.DOI.length; t++)
      if (a.DOI[t].ma === n) {
        return a.DOI[t];
      }
    return null;
  };
  a.DAU_GIA_PHUT = 30;
  a.PHIEU_TOI_DA = 1e5;
  a.GIAM_PHUT = 10;
  a.LAO = { x0: 49, x1: 54, y0: 10, y1: 12 };
  a.O_LAO = { tx: 51, ty: 11 };
  a.TRUOC_LAO = { tx: 51, ty: 13 };
  a.trongLao = function (n, t) {
    return t > a.LAO.y0 && t < a.LAO.y1 && n > a.LAO.x0 && n < a.LAO.x1;
  };
  a.KHAM_BAO_TRUOC_GIAY = 60;
  a.KHAM_PHUT = 10;
  a.soMoi = function () {
    return { tayNai: {}, danh: 0, phieuNgay: { ngay: 0, n: 0 }, giamDen: 0, soChuyen: 0, ho: {}, le: 0 };
  };
  a.chuanHoa = function (n) {
    var t = a.soMoi();
    if (!n || "object" != typeof n) {
      return t;
    }
    var h = n.tayNai && "object" == typeof n.tayNai ? n.tayNai : {};
    Object.keys(h).forEach(function (n) {
      var a = Math.max(0, Math.floor(Number(h[n]) || 0));
      if (a > 0 && /^[a-z0-9_]{1,48}$/.test(n)) {
        t.tayNai[n] = a;
      }
    });
    t.danh = Math.max(0, a.lamTronPhieu(n.danh));
    t.le = Math.max(0, Math.min(99, Math.floor(Number(n.le) || 0)));
    var r = n.phieuNgay || {};
    t.phieuNgay = { ngay: Math.max(0, Math.floor(Number(r.ngay) || 0)), n: Math.max(0, a.lamTronPhieu(r.n)) };
    t.giamDen = Math.max(0, Number(n.giamDen) || 0);
    t.soChuyen = Math.max(0, Math.floor(Number(n.soChuyen) || 0));
    var o = n.ho && "object" == typeof n.ho ? n.ho : {};
    Object.keys(o).forEach(function (n) {
      var h = o[n];
      if (h && a.dongThuMua(n)) {
        var r = Number(h.con);
        var _ = Number(h.at);
        if (isFinite(r) && r >= 0 && isFinite(_) && _ >= 0) {
          t.ho[n] = { con: r, at: _ };
        }
      }
    });
    return t;
  };
  a.so = function (t) {
    var h = (t = t || n).Progress;
    return h ? (h.hacThi && "object" == typeof h.hacThi || (h.hacThi = a.soMoi()), h.hacThi.tayNai || (h.hacThi.tayNai = {}), h.hacThi.phieuNgay || (h.hacThi.phieuNgay = { ngay: 0, n: 0 }), h.hacThi.ho && "object" == typeof h.hacThi.ho || (h.hacThi.ho = {}), h.hacThi) : a.soMoi();
  };
  a.tayNai = function (n) {
    return a.so(n).tayNai;
  };
  a.demTayNai = function (n) {
    var t = a.tayNai(n);
    var h = 0;
    var r = 0;
    for (var o in t)
      if (Object.prototype.hasOwnProperty.call(t, o)) {
        var _ = 0 | t[o];
        if (_ > 0) {
          h++;
          r += _;
        }
      }
    return { o: h, mon: r };
  };
  a.coHangLau = function (n) {
    return a.demTayNai(n).mon > 0;
  };
  a.soTrongTayNai = function (n, t) {
    return 0 | a.tayNai(n)[t];
  };
  a.camDongGoi = function (n) {
    return n === a.MAP_HPL || n === a.MAP_CHO || n === a.MAP_TAM;
  };
  a.whyNotHang = function (a, t) {
    var h = a && a.ITEMS || n.ITEMS || {};
    var r = Object.prototype.hasOwnProperty.call(h, t) ? h[t] : null;
    return r ? "tien_te" === r.type ? "tiền tệ không đóng vào tay nải" : String(r.type || "").indexOf("nhiem_vu") >= 0 ? "đồ nhiệm vụ không phải hàng" : r.slot ? "trang bị không phải hàng lậu" : "bi_tich" === r.type ? "bí tịch không phải hàng lậu" : n.Market && n.Market.KHOA_TIEN_TRINH && n.Market.KHOA_TIEN_TRINH[t] ? r.name + " là vật dẫn đường tu luyện, không đem buôn" : null : "vật phẩm không có thật";
  };
  a.xetDongGoi = function (n, t, h, r) {
    if (!((h = Math.floor(Number(h) || 0)) >= 1 && h <= 9999)) {
      return "số lượng không hợp lệ";
    }
    if (a.camDongGoi(r)) {
      return "chỉ đóng hàng ở ngoài đèo";
    }
    var o = a.whyNotHang(n, t);
    if (o) {
      return o;
    }
    var _ = n.Inventory;
    if (!_.canTrade(t, h)) {
      var u = _.tradableCount ? _.tradableCount(t) : _.count(t);
      return u > 0 ? "chỉ còn " + u + " món đóng được" : "không có món này trong túi";
    }
    var i = a.demTayNai(n);
    return !(a.soTrongTayNai(n, t) > 0) && i.o >= a.TAY_NAI_O ? "tay nải chỉ chứa " + a.TAY_NAI_O + " loại hàng" : i.mon + h > a.TAY_NAI_MON ? "tay nải chỉ còn chỗ cho " + Math.max(0, a.TAY_NAI_MON - i.mon) + " món" : null;
  };
  a.dongGoi = function (n, h, r, o) {
    var _ = a.xetDongGoi(n, h, r, o);
    if (_) {
      return { ok: !1, why: _ };
    }
    if (r = Math.floor(Number(r)), !n.Inventory.remove(h, r)) {
      return { ok: !1, why: "không có đủ món này trong túi" };
    }
    var u = a.tayNai(n);
    u[h] = (0 | u[h]) + r;
    t(n);
    return { ok: !0, n: r };
  };
  a.xetGoRa = function (n, t, h, r) {
    if (!((h = Math.floor(Number(h) || 0)) >= 1 && h <= 9999)) {
      return "số lượng không hợp lệ";
    }
    if (a.camDongGoi(r)) {
      return "không gỡ hàng trong đèo hay trong chợ";
    }
    if (a.soTrongTayNai(n, t) < h) {
      return "trong tay nải không có đủ món này";
    }
    var o = n.Inventory && n.Inventory.MAX_STACK || 9999;
    return n.Inventory.count(t) + h > o ? "túi không chứa thêm được" : null;
  };
  a.goRa = function (n, h, r, o) {
    var _ = a.xetGoRa(n, h, r, o);
    return _ ? { ok: !1, why: _ } : (r = Math.floor(Number(r)), a.botTayNai(n, h, r), n.Inventory.add(h, r), t(n), { ok: !0, n: r });
  };
  a.botTayNai = function (n, t, h) {
    var r = a.tayNai(n);
    var o = 0 | r[t];
    var _ = Math.max(0, Math.min(o, Math.floor(Number(h) || 0)));
    if (o - _ > 0) {
      r[t] = o - _;
    }
    else {
      delete r[t];
    }
    return _;
  };
  a.nhetTayNai = function (n, t, h) {
    if (a.whyNotHang(n, t)) {
      return 0;
    }
    var r = a.demTayNai(n);
    if (!(a.soTrongTayNai(n, t) > 0) && r.o >= a.TAY_NAI_O) {
      return 0;
    }
    var o = Math.max(0, Math.min(Math.floor(Number(h) || 0), a.TAY_NAI_MON - r.mon));
    if (o <= 0) {
      return 0;
    }
    var _ = a.tayNai(n);
    _[t] = (0 | _[t]) + o;
    return o;
  };
  a.trutTayNai = function (n) {
    var t = a.tayNai(n);
    var h = [];
    Object.keys(t).forEach(function (n) {
      var a = 0 | t[n];
      if (a > 0) {
        h.push([n, a]);
      }
    });
    a.so(n).tayNai = {};
    return h;
  };
  a.tichThuNua = function (n) {
    var t = a.tayNai(n);
    var h = [];
    Object.keys(t).forEach(function (r) {
      var o = 0 | t[r];
      var _ = Math.ceil(o / 2);
      if (_ > 0) {
        a.botTayNai(n, r, _);
        h.push([r, _]);
      }
    });
    return h;
  };
  a.danh = function (n) {
    return Number(a.so(n).danh) || 0;
  };
  a.bacDanh = function (n) {
    for (var t = a.danh(n), h = 0, r = 0; r < a.BAC_DANH.length; r++)
      t >= a.BAC_DANH[r].tu && (h = r);
    return h;
  };
  a.tenBac = function (n) {
    return (a.BAC_DANH[n] || a.BAC_DANH[0]).ten;
  };
  a.congDanh = function (n, t) {
    var h = a.so(n);
    h.danh = Math.max(0, a.lamTronPhieu((Number(h.danh) || 0) + (Number(t) || 0)));
    return h.danh;
  };
  a.lenBac = function (n, t) {
    var h = (a.BAC_DANH[t] || {}).tu;
    if (null == h) {
      return a.danh(n);
    }
    var r = a.so(n);
    if ((Number(r.danh) || 0) < h) {
      r.danh = h;
    }
    return r.danh;
  };
  a.mocKe = function (n) {
    var t = a.BAC_DANH[a.bacDanh(n) + 1];
    return t ? t.tu : null;
  };
  a.moBang = function (n) {
    return a.bacDanh(n) >= 1;
  };
  a.ngayVN = function (n) {
    return Math.floor(((null == n ? Date.now() : n) + 252e5) / 864e5);
  };
  a.phieuHomNay = function (n, t) {
    var h = a.so(n).phieuNgay || {};
    var r = a.ngayVN(t);
    var o = h.ngay === r ? a.lamTronPhieu(h.n) : 0;
    return { ngay: r, da: o, tran: a.TRAN_PHIEU_NGAY, con: Math.max(0, a.lamTronPhieu(a.TRAN_PHIEU_NGAY - o)) };
  };
  a.ghiPhieuNgay = function (n, t, h) {
    var r = a.phieuHomNay(n, h);
    var o = Math.max(0, Math.min(a.lamTronPhieu(t), r.con));
    a.so(n).phieuNgay = { ngay: r.ngay, n: a.lamTronPhieu(r.da + o) };
    return o;
  };
  a.soPhieu = function (t) {
    t = t || n;
    return a.lamTronPhieu(t.Inventory.count(a.HAC_PHIEU) + (0 | a.so(t).le) / 100);
  };
  a.nhanPhieu = function (n, t) {
    var h = a.so(n);
    var r = (0 | h.le) + Math.round(100 * (Number(t) || 0) + 1e-7);
    var o = Math.max(0, Math.floor(r / 100));
    h.le = r - 100 * o;
    if (o > 0) {
      n.Inventory.add(a.HAC_PHIEU, o);
    }
    return o;
  };
  a.giamConMs = function (n, t) {
    var h = Number(a.so(n).giamDen) || 0;
    return Math.max(0, h - (null == t ? Date.now() : t));
  };
  a.dangGiam = function (n, t) {
    return a.giamConMs(n, t) > 0;
  };
  a.chuGiam = function (n) {
    var a = Math.max(0, Math.ceil((n || 0) / 1e3));
    var t = a % 60;
    return Math.floor(a / 60) + ":" + (t < 10 ? "0" : "") + t;
  };
  a.chanCua = function (t, h, r) {
    if (r = r || {}, a.dangGiam(t, r.now)) {
      return "Đang bị giam.";
    }
    if (h === a.MAP_HPL && n.realmReached && t.Progress && !n.realmReached(t.Progress.realmId, "truc_co_1")) {
      return "Cần Trúc Cơ mới vào được.";
    }
    if (h === a.MAP_CHO) {
      if (!t.Inventory || !t.Inventory.has(a.QUY_DIEN)) {
        return "Cần Quỷ Diện mới vào được.";
      }
      if (r.dangKham) {
        return "Chấp Pháp đang khám chợ — cửa đóng.";
      }
    }
    return null;
  };
  a.camBay = function (n, t) {
    return t === a.MAP_HPL && a.coHangLau(n);
  };
  a.pkTuDo = function (n) {
    return n === a.MAP_HPL;
  };
  a.tenAn = function (n) {
    for (var a = String(n || ""), t = 2166136261, h = 0; h < a.length; h++)
      t ^= a.charCodeAt(h), t = Math.imul(t, 16777619) >>> 0;
    return "Khách Vô Danh #" + (10 + t % 90);
  };
  a.giaDoi = function (n, t) {
    if (!t) {
      return 0;
    }
    var h = 0 | t.gia;
    if (t.id === a.HUYET_NGOC_CHI && n && n.Quest && n.Quest.flags && "B" === n.Quest.flags[a.CO.NHANH]) {
      h *= 2;
    }
    return h;
  };
  a.xetDoi = function (n, t) {
    var h = a.dongDoi(t);
    if (!h) {
      return "quầy không có món ấy";
    }
    if (a.bacDanh(n) < (0 | h.bac)) {
      return "cần Hắc Danh " + a.tenBac(h.bac);
    }
    var r = a.giaDoi(n, h);
    if (!n.Inventory.has(a.HAC_PHIEU, r)) {
      return "cần " + r + " Hắc Phiếu";
    }
    var o = n.Inventory.MAX_STACK || 9999;
    return n.Inventory.count(h.id) + h.n > o ? "túi không chứa thêm được" : null;
  };
  a.fmt = function (n) {
    return (Number(n) || 0).toLocaleString("vi-VN");
  };
}(window.PNTT);
