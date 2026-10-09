!function (n) {
  "use strict";
  function a() {
    return n.Tournament;
  }
  var t = n.ChienTruong = {};
  var _ = 36e5;
  var u = 24 * _;
  function o(n, u) {
    return n + t.GIO_KHAI[u] * _ + 6e4 * t.PHUT_THA - a().VN_OFFSET_MS;
  }
  function h(n, a) {
    return { id: t.maSuat(n), thuTu: a, moDangKyLuc: n - t.MO_DANG_KY_TRUOC, moPhongChoLuc: n - t.MO_PHONG_CHO_TRUOC, batDauLuc: n, ketThucLuc: n + t.TRAN_KEO_DAI, hetCuaSoLuc: n + t.CUA_SO };
  }
  function g(n) {
    return t.THU_MO.indexOf(new Date(n).getUTCDay()) >= 0;
  }
  t.TEN = "Vạn Hoang Chiến Trường";
  t.MAP = "chien_truong";
  t.MAP_CHO = "chien_truong_cho";
  t.GIAO_THUC_TOI_THIEU = 13;
  t.GIO_KHAI = [21];
  t.THU_MO = [1, 5];
  t.SO_SUAT = t.GIO_KHAI.length;
  t.PHUT_THA = 16;
  t.MO_DANG_KY_TRUOC = 96e4;
  t.MO_PHONG_CHO_TRUOC = 6e4;
  t.TRAN_KEO_DAI = 84e4;
  t.NAN_LAI = 6e4;
  t.CUA_SO = t.TRAN_KEO_DAI + t.NAN_LAI;
  t.VE_LANG_SAU = 2e4;
  t.maSuat = function (n) {
    return "chien_truong:" + Math.floor(n);
  };
  t.suatTai = function (n) {
    for (var _ = function (n) {
      return Math.floor((n + a().VN_OFFSET_MS) / u) * u;
    }(n = Math.floor(Number(n) || 0)), r = 0; r < 8; r++)
      if (g(_ + r * u)) {
        for (var i = 0; i < t.SO_SUAT; i++) {
          var c = o(_ + r * u, i);
          if (n < c + t.CUA_SO) {
            return h(c, i);
          }
        }
      }
    return h(o(_ + 8 * u, 0), 0);
  };
  t.giaiDoan = function (n, a) {
    return n < (a = a || t.suatTai(n)).moDangKyLuc ? "CHUA_MO" : n < a.moPhongChoLuc ? "DANG_KY" : n < a.batDauLuc ? "PHONG_CHO" : "DANG_DAU";
  };
  t.lich = function (n) {
    var a = t.suatTai(n);
    return { id: a.id, thuTu: a.thuTu, giaiDoan: t.giaiDoan(n, a), moDangKyLuc: a.moDangKyLuc, moPhongChoLuc: a.moPhongChoLuc, batDauLuc: a.batDauLuc, ketThucLuc: a.ketThucLuc, hetCuaSoLuc: a.hetCuaSoLuc, bayGio: n };
  };
  t.gioDoc = function (n) {
    return a().gioDoc(n);
  };
  t.ngayVN = function (n) {
    return a().ngayVN(n);
  };
  t.BANG = { luyen_khi: { id: "luyen_khi", ten: "Luyện Khí" }, truc_co: { id: "truc_co", ten: "Trúc Cơ" } };
  t.THU_TU_BANG = ["luyen_khi", "truc_co"];
  t.NGUONG_MO_BANG = 16;
  t.TOI_DA = 100;
  t.LUOT_MOI_NGAY = 2;
  t.MANG = 3;
  t.MOT_IP_MOT_NICK = !0;
  t.LUOT_FLAG = "chien_truong_luot";
  t.QUA_NGAY_FLAG = "chien_truong_qua_ngay";
  t.bangCua = function (n) {
    var t = String(n || "");
    var _ = /^luyen_khi_(\d+)$/.exec(t);
    if (_) {
      var u = Number(_[1]);
      if (u < a().TANG_TOI_THIEU) {
        return { why: "Phải Luyện Khí tầng " + a().TANG_TOI_THIEU + " trở lên mới đủ tư cách. Đạo hữu đang ở tầng " + u + "." };
      }
      if (u <= a().TANG_TOI_DA) {
        return { bang: "luyen_khi", tang: u };
      }
    }
    return /^truc_co_/.test(t) ? { bang: "truc_co" } : "pham_nhan" !== t && t ? { why: "Chiến Trường chỉ dành cho Luyện Khí tầng " + a().TANG_TOI_THIEU + " đến " + a().TANG_TOI_DA + " và Trúc Cơ." } : { why: "Phải Luyện Khí tầng " + a().TANG_TOI_THIEU + " trở lên mới đủ tư cách." };
  };
  t.luotDaDung = function (n, a) {
    var _ = n && n.Quest && n.Quest.flags;
    var u = _ && _[t.LUOT_FLAG];
    return u && u.ngay === a ? 0 | u.so : 0;
  };
  t.daNhanQuaHomNay = function (n, a) {
    var _ = n && n.Quest && n.Quest.flags;
    var u = _ && _[t.QUA_NGAY_FLAG];
    return !(!u || u.ngay !== a);
  };
  t.KHIEN_MO_MAN_MS = 8e3;
  t.KHOA_CHAN_MO_MAN_MS = 5e3;
  t.HOI_SINH_CHO_MS = 5e3;
  t.HOI_SINH_HP = .7;
  t.KHIEN_HOI_SINH_MS = 3e3;
  t.LOAI_TU_GD = 4;
  t.KHOANG_CACH_THA = 220;
  t.HOI_SINH_CACH_DICH = 200;
  t.HAN_VAO_TRE_MS = 6e4;
  t.GIU_ROT_MANG_MS = 45e3;
  t.AFK_MS = 9e4;
  t.SOAT_NHIP_MS = 200;
  t.BO_GD = [{ batDau: 12e4, dung: 9e4, co: 6e4, r: .7, sat: .01 }, { batDau: 27e4, dung: 6e4, co: 6e4, r: .45, sat: .02 }, { batDau: 39e4, dung: 6e4, co: 6e4, r: .25, sat: .04 }, { batDau: 51e4, dung: 45e3, co: 45e3, r: .12, sat: .07 }, { batDau: 6e5, dung: 3e4, co: 45e3, r: .04, sat: .12 }, { batDau: 675e3, dung: 0, co: 9e4, r: 0, sat: .2 }];
  t.BO_BAO_TRUOC_MS = 2e4;
  t.BO_NHIP_MS = 1e3;
  t.BO_SO_GD = t.BO_GD.length;
  t.W = 128;
  t.H = 128;
  t.TAM = { x: 32 * t.W / 2, y: 32 * t.H / 2 };
  t.R_MAX = 1920;
  t.banKinhDau = function (n) {
    return t.R_MAX;
  };
  t.taoChuoiBo = function (n, a) {
    for (var _ = t.banKinhDau(n), u = { x: t.TAM.x, y: t.TAM.y }, o = [], h = { x: u.x, y: u.y, r: _ }, g = 0; g < t.BO_GD.length; g++) {
      var r = t.BO_GD[g].r * _;
      var i = Math.max(0, h.r - r);
      var c = a() * Math.PI * 2;
      var e = Math.sqrt(a()) * i * .98;
      var A = { x: h.x + Math.cos(c) * e, y: h.y + Math.sin(c) * e, r: r };
      o.push(A);
      h = A;
    }
    return { r0: _, tam0: u, gd: o };
  };
  t.boTai = function (n, a) {
    var _;
    var u = t.BO_GD;
    var o = -1;
    for (_ = 0; _ < u.length; _++)
      a >= u[_].batDau && (o = _);
    var h = { x: n.tam0.x, y: n.tam0.y, r: n.r0 };
    if (o < 0) {
      return { k: 0, pha: "cho", x: h.x, y: h.y, r: h.r, dich: null, sat: u[0].sat, toiCo: u[0].batDau - a + u[0].dung, toiHet: u[0].batDau - a + u[0].dung + u[0].co, toiGd: u[0].batDau - a };
    }
    var g = 0 === o ? h : n.gd[o - 1] || h;
    var r = n.gd[o] || null;
    var i = a - u[o].batDau;
    var c = u[o];
    var e = { k: o + 1, pha: "dung", x: g.x, y: g.y, r: g.r, dich: r ? { x: r.x, y: r.y, r: r.r } : null, sat: c.sat, toiCo: c.dung - i, toiHet: c.dung + c.co - i, toiGd: o + 1 < u.length ? u[o + 1].batDau - a : null };
    if (!r) {
      return e;
    }
    if (i >= c.dung + c.co) {
      e.pha = "xong";
      e.x = r.x;
      e.y = r.y;
      e.r = r.r;
    }
    else if (i >= c.dung) {
      var A = c.co > 0 ? (i - c.dung) / c.co : 1;
      e.pha = "co";
      e.x = g.x + (r.x - g.x) * A;
      e.y = g.y + (r.y - g.y) * A;
      e.r = g.r + (r.r - g.r) * A;
    }
    return e;
  };
  t.trongVong = function (n, a, t, _) {
    var u = a - n.x;
    var o = t - n.y;
    var h = n.r + (_ || 0);
    return u * u + o * o <= h * h;
  };
  t.BUI_R = 52;
  t.BUI_TOI_DA_NGUOI = 4;
  t.AN_DUNG_YEN_MS = 500;
  t.AN_DUNG_YEN_PX = 14;
  t.AN_TOI_DA_MS = 25e3;
  t.AN_NGHI_MS = 15e3;
  t.AN_LO_KHOA_MS = 4e3;
  t.AN_NGUOI_GAN_PX = 80;
  t.BUI_RUNG_PX = 200;
  t.SO_BUI_CHUAN = 125;
  t.soBui = function (n) {
    var a = n / t.R_MAX;
    return Math.max(24, Math.round(t.SO_BUI_CHUAN * a * a));
  };
  t.RUONG_MO_MS = 2e3;
  t.RUONG_TAM_PX = 56;
  t.RUONG_HE_SO = .8;
  t.RUONG_VANG = [6, 8];
  t.soRuong = function (n) {
    return Math.max(8, Math.round(t.RUONG_HE_SO * n));
  };
  t.BUFF = { cong: { id: "cong", ten: "Công", mota: "Tăng sát thương gây ra" }, giap: { id: "giap", ten: "Giáp", mota: "Hộ thuẫn che đòn" }, hoi: { id: "hoi", ten: "Hồi Khí Huyết", mota: "Hồi Khí Huyết mỗi giây" }, toc: { id: "toc", ten: "Tốc Hành", mota: "Chạy nhanh hơn" }, mau: { id: "mau", ten: "Khí Huyết Tối Đa", mota: "Tăng Khí Huyết tối đa" } };
  t.THU_TU_BUFF = ["cong", "giap", "hoi", "toc", "mau"];
  t.soHang = function (n, a) {
    return !!n.song != !!a.song ? n.song ? -1 : 1 : n.song ? a.mang - n.mang || a.haSat - n.haSat || a.sat - n.sat : a.loaiLuc - n.loaiLuc || a.mang - n.mang || a.haSat - n.haSat || a.sat - n.sat;
  };
  t.HANG_CO_QUA = 4;
  t.quaHang = function (n, _) {
    return 1 === _ ? a().quaVoDich(n) : _ >= 2 && _ <= t.HANG_CO_QUA ? a().quaHang(n, _) : [];
  };
  t.phanThuong = function (n, a, _) {
    var u = t.quaHang(n, a);
    return _ ? u.filter(function (n) {
      return "linh_thach" === n.id;
    }) : u;
  };
  var r = { chua_mo: "Chưa tới giờ ghi danh.", da_chot: "Đã chốt sổ kỳ này, không nhận thêm người.", da_tha: "Kỳ này đã thả xuống chiến trường rồi.", da_ghi: "Đạo hữu đã ghi danh rồi.", chua_ghi: "Đạo hữu chưa ghi danh kỳ này.", het_luot: "Hôm nay đạo hữu đã dùng hết " + t.LUOT_MOI_NGAY + " lượt Chiến Trường.", bang_day: "Bảng này đã đủ " + t.TOI_DA + " người.", cung_ip: "Cùng địa chỉ mạng đã có một nhân vật ghi danh bảng này.", app_cu: "Cần cập nhật bản mới để vào Vạn Hoang Chiến Trường.", trong_thuong: "Đang trọng thương thì chưa ghi danh được.", dang_tran: "Đang ở trong trận khác, chưa ghi danh được.", dang_giam: "Đang bị giam.", dang_giao_chien: "Vừa giao chiến — chờ ít giây.", da_xong: "Đạo hữu đã xong kỳ này.", khong_o_day: "Đạo hữu không ở Vạn Hoang Chiến Trường.", dang_tran_dau: "Đang giữa trận, không rời được.", huy_dang_dau: "Đã thả xuống chiến trường, không rút tên được nữa.", cam_dung: "Trong Vạn Hoang Chiến Trường chỉ đánh thường — kỹ năng, phù chú, đan dược, bay đều bị cấm.", khong_ruong: "Không có rương nào ở gần.", ruong_co_nguoi: "Có người đang mở rương này.", da_mo_ruong: "Đạo hữu đang mở một rương khác.", ruong_xa: "Đứng sát rương hơn nữa.", dang_an: "Rương lộ thân — phải rời bụi mới mở được.", khong_the: "Lúc này không làm được việc đó." };
  t.viLoi = function (n) {
    return r[n] || "Lúc này không làm được việc đó.";
  };
  t.dem = function (n) {
    var a = Math.max(0, Math.ceil(n / 1e3));
    var t = Math.floor(a / 60);
    var _ = a % 60;
    if (t >= 60) {
      var u = Math.floor(t / 60);
      return u >= 24 ? Math.floor(u / 24) + " ngày " + u % 24 + " giờ" : u + " giờ " + t % 60 + " phút";
    }
    return t + ":" + (_ < 10 ? "0" : "") + _;
  };
}(window.PNTT);
