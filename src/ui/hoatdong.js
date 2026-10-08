!function (n) {
  "use strict";
  var i = n.HoatDongUI = {};
  var h = 36e5;
  var t = [{ id: "tat-ca", ten: "Tất cả" }, { id: "nhiem-vu", ten: "Nhiệm vụ" }, { id: "boss", ten: "Boss" }, { id: "bi-canh", ten: "Bí cảnh" }, { id: "su-kien", ten: "Sự kiện" }];
  var a = [{ id: "xich_long", type: "than_thu_xich_long", map: "long_uyen", spawn: "ttxl_1", icon: "🐉", hoVe: "xich_nhan_nguu", ghiChu: "Ba Xích Nhãn Ngưu hộ thể — hạ hết hộ vệ trước." }, { id: "linh_ho", type: "linh_ho_tran_son", map: "thach_phong_thung_lung", spawn: "boss_linh_ho_tran_son", icon: "🐯", hoVe: "bach_ho_tuyet", ghiChu: "Bạch Hổ Tuyết hộ vệ quanh ổ." }, { id: "ma_bao", type: "song_duc_ma_bao", map: "mo_linh_thach", spawn: "boss_song_duc_ma_bao", icon: "🐆", hoVe: "ngan_mao_hong", ghiChu: "Ba Ngân Mao Hống hộ pháp — hạ hết trước. Ở sân mỏ sâu nhất." }];
  var o = ["xich_mang_vuong", "thach_mach_vuong", "u_minh_cu_mang"];
  var u = { el: null, loc: "tat-ca", chiTiet: null, duLieu: null, layLuc: 0, xinLuc: 0, nhip: 0, oTheoId: Object.create(null) };
  function c() {
    return n.Gateway;
  }
  function e() {
    var n = c();
    return n && n.gioMayChu && n.gioMayChu() || Date.now();
  }
  function g(n, i, h) {
    var t = document.createElement(n);
    if (i) {
      t.className = i;
    }
    if (null != h) {
      t.textContent = h;
    }
    return t;
  }
  function r(n) {
    return (n < 10 ? "0" : "") + n;
  }
  function d(n) {
    var i = new Date(Math.floor(Number(n) || 0) + 7 * h);
    return i.getUTCHours() + ":" + r(i.getUTCMinutes());
  }
  function _(n) {
    var i = Math.max(0, Math.ceil(n / 1e3));
    var h = Math.floor(i / 3600);
    var t = Math.floor(i % 3600 / 60);
    var a = i % 60;
    return h > 0 ? h + ":" + r(t) + ":" + r(a) : t + ":" + r(a);
  }
  function s(n) {
    return (n = Math.max(0, 0 | n)) >= 3600 ? Math.round(n / 360) / 10 + " giờ" : n >= 60 ? Math.round(n / 60) + " phút" : n + " giây";
  }
  function m(n) {
    return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  function l(n) {
    return Math.round(1e3 * n) / 10 + "%";
  }
  function T(i) {
    var h = n.ITEMS && n.ITEMS[i];
    return h ? h.name : i;
  }
  function p(i) {
    var h = n.MapData || {};
    var t = h.get && i ? h.get(i) : null;
    if (t && t.name && t.id === i) {
      return t.name;
    }
    var a = String(i || "").replace(/^tg_/, "");
    for (var o in h)
      if (h[o] && h[o].id === a && h[o].name) {
        return h[o].name;
      }
    return t && t.name ? t.name : i;
  }
  function H(n) {
    return String(n && n.name || "").split("|")[0].split("·").map(function (n) {
      return n.trim();
    }).filter(function (n) {
      return n && !/^Yêu Thú/.test(n);
    }).join(" ");
  }
  function C(n) {
    var i = /Yêu Thú Cấp \d+/.exec(String(n && n.name || ""));
    return i ? i[0] : "";
  }
  function N() {
    return n.Progress && n.Progress.realmId;
  }
  function M(i) {
    var h = N();
    return !h || !i || !n.realmReached || n.realmReached(h, i);
  }
  function A(i) {
    var h = c();
    if (h && h.cmd && h.ready) {
      var t = Date.now();
      if (!(!i && t - u.xinLuc < 2e4)) {
        u.xinLuc = t;
        h.cmd("hoatdong.xem", {}, function (n) {
          if (n && n.ok) {
            u.duLieu = n;
            u.layLuc = Date.now();
            E();
          }
        });
        if (h.sect && h.cmd) {
          h.cmd("sect.nv.xem", {}, function (i) {
            if (i && i.ok && n.QuanSuUI && n.QuanSuUI.apDung) {
              n.QuanSuUI.apDung(i.nv);
              E();
            }
          });
          if (n.LamLangUI && n.LamLangUI.xemTruoc) {
            n.LamLangUI.xemTruoc();
          }
        }
      }
    }
  }
  function f(i) {
    var h = n.Loot || {};
    var t = [];
    var a = !(!h.BOC_THAM_TUI || !h.BOC_THAM_TUI[i]);
    var o = a ? "bốc thăm theo công" : "đòn chót";
    var u = h.BOSS_LINH_THACH && h.BOSS_LINH_THACH[i];
    if (u) {
      t.push({ id: "linh_thach", ten: u[0] + "–" + u[1] + " Linh Thạch", ghi: "Chắc chắn · đòn chót" });
    }
    var c = h.YEU_DAN && h.YEU_DAN[i];
    if (c) {
      t.push({ id: c, ghi: "Chắc chắn · bốc thăm theo công" });
    }
    var e = h.YEU_DAN_CHOT_HA && h.YEU_DAN_CHOT_HA[i];
    if (e && t.push({ id: e, ghi: "Chắc chắn · " + o }), "than_thu_xich_long" === i) {
      t.push({ id: "hoang_lan_giap", ghi: l(h.XICH_LONG_GIAP_CHANCE || 0) });
      t.push({ id: "xich_long_huyet", ghi: l(h.XICH_LONG_HUYET_CHANCE || 0) });
      t.push({ id: null, icon: "👘", ten: "Y phục pháp bào", ghi: l(h.XICH_LONG_PHAP_BAO_CHANCE || 0) });
    }
    else if ("linh_ho_tran_son" === i) {
      t.push({ id: null, icon: "👘", ten: "Y phục pháp bào", ghi: l(h.LINH_HO_PHAP_BAO_CHANCE || 0) });
    }
    else if ("song_duc_ma_bao" === i) {
      t.push({ id: h.MA_BAO_QUAN_DUI_ITEM || "quan_dui", ghi: l(h.MA_BAO_QUAN_DUI_CHANCE || 0) });
      (h.MA_BAO_Y_PHUC || []).forEach(function (n) {
        t.push({ id: n, ghi: "1 trong " + h.MA_BAO_Y_PHUC.length + " · " + l(h.MA_BAO_Y_PHUC_CHANCE || 0) });
      });
      if (h.MA_BAO_THANH_TAM_Y) {
        t.push({ id: h.MA_BAO_THANH_TAM_Y.ITEM, ghi: l(h.MA_BAO_THANH_TAM_Y.CHANCE) });
      }
      if (h.MA_BAO_MA_HON_PHE) {
        t.push({ id: h.MA_BAO_MA_HON_PHE.ITEM, ghi: l(h.MA_BAO_MA_HON_PHE.CHANCE) });
      }
      if (h.MA_BAO_CUU_U_MA_TRAO) {
        t.push({ id: h.MA_BAO_CUU_U_MA_TRAO.ITEM, ghi: l(h.MA_BAO_CUU_U_MA_TRAO.CHANCE) });
      }
      if (h.MA_BAO_PHI_LONG) {
        t.push({ id: h.MA_BAO_PHI_LONG.ITEM, ghi: l(h.MA_BAO_PHI_LONG.CHANCE) });
      }
      (h.MA_BAO_BI_TICH_KET_DAN || []).forEach(function (n) {
        t.push({ id: n.ITEM, ghi: l(n.CHANCE) });
      });
      if (h.MA_BAO_HOANG_LOI_THUONG) {
        t.push({ id: h.MA_BAO_HOANG_LOI_THUONG.ITEM, ghi: l(h.MA_BAO_HOANG_LOI_THUONG.CHANCE) });
      }
      if (h.MA_BAO_BANG_LINH_KIEM) {
        t.push({ id: h.MA_BAO_BANG_LINH_KIEM.ITEM, ghi: l(h.MA_BAO_BANG_LINH_KIEM.CHANCE) });
      }
      var g = h.PHONG_SONG_DUC;
      if (g) {
        t.push({ id: g.ITEM, ghi: "Giữa trận · " + Math.round(100 * g.MIN) + "–" + Math.round(100 * g.MAX) + "% máu" });
      }
    }
    var r = h.BITICH_GIUA_TRAN;
    if (r && r.BOSSES.indexOf(i) >= 0) {
      r.ITEMS.forEach(function (n) {
        t.push({ id: n, ghi: "Giữa trận (1 quyển) · " + Math.round(100 * r.MIN) + "–" + Math.round(100 * r.MAX) + "% máu" });
      });
    }
    var d = h.GIUA_TRAN;
    var _ = d && d.BOSSES && d.BOSSES[i];
    if (_) {
      var s = _.soCuc || d.SO_CUC;
      var m = null != _.heSoPhu ? _.heSoPhu : 1;
      t.push({ id: "linh_thach", ten: s[0] + "–" + s[1] + " cục Linh Thạch", ghi: "Giữa trận · " + _.lt[0] + "–" + _.lt[1] + " viên/cục" });
      if (_.phaCanh > 0) {
        t.push({ id: d.PHA_CANH, ghi: "Giữa trận · " + l(_.phaCanh) });
      }
      Object.keys(_.them || {}).forEach(function (n) {
        t.push({ id: n, ghi: "Giữa trận · " + l(_.them[n]) });
      });
      if (!(_.khongTranBan)) {
        Object.keys(d.TRAN_BAN || {}).forEach(function (n) {
          t.push({ id: n, ghi: "Giữa trận · " + l(d.TRAN_BAN[n]) });
        });
      }
      if (m > 0) {
        Object.keys(d.PHU || {}).forEach(function (n) {
          t.push({ id: n, ghi: "Giữa trận · " + l(d.PHU[n] * m) });
        });
      }
    }
    var T = h.YEU_HUYET && h.YEU_HUYET[i];
    if (T) {
      t.push({ id: T.item, ghi: l(T.chance) + " · " + o });
    }
    var p = h.TONG_MON_LENH && h.TONG_MON_LENH[i];
    if (p) {
      t.push({ id: h.TONG_MON_LENH_ITEM || "tong_mon_lenh", ghi: l(p) + " · " + o });
    }
    var H = n.ENEMY_DEFS && n.ENEMY_DEFS[i];
    if (H && H.hon) {
      t.push({ id: H.hon, ghi: "Luyện Quỷ · giữ Hồn Phiên" + (a ? " · bốc thăm theo công" : "") });
    }
    return t;
  }
  function v(i) {
    var h = n.ENEMY_DEFS && n.ENEMY_DEFS[i];
    if (!h) {
      return [];
    }
    var t = [];
    if (h.fireNova && !h.fireNova.trongTai && t.push("🔥 Hoả Vũ — khoá chỗ đứng, " + h.fireNova.windup + " giây sau nổ lửa (thiêu đốt). Chạy khỏi vòng đỏ."), h.baoKich) {
      var a = 0 | h.baoKich.dot;
      t.push("💥 " + (h.baoKich.ten || "Bạo Kích") + " — nổ quanh thân KHÔNG báo trước, " + (a > 1 ? a + " đợt, mỗi đợt " : "") + h.baoKich.hitsMin + "–" + h.baoKich.hitsMax + " nhát. Đừng đứng dồn một chỗ.");
    }
    if (h.pounce && t.push("🐾 Nhảy vồ — thả diều hay đứng bên kia vật cản là bị vồ tới."), h.poisonSpit && t.push("☠️ Phun độc — trúng là nhiễm độc mất máu dần."), h.luuTinh && t.push("☄️ " + (h.luuTinh.ten || "Lưu Tinh") + " — còn " + Math.round(100 * h.luuTinh.from) + "–" + Math.round(100 * h.luuTinh.to) + "% máu, " + h.luuTinh.dot + " đợt thiên thạch rơi khắp bản đồ. Thấy vòng lửa thì chạy."), h.tuyetChieu && t.push("⚡ " + (h.tuyetChieu.ten || "Tuyệt chiêu") + " — khi còn " + Math.round(100 * h.tuyetChieu.from) + "–" + Math.round(100 * h.tuyetChieu.to) + "% máu, báo " + h.tuyetChieu.windup + " giây rồi đánh chí mạng."), h.lootLastHitOnly) {
      var o = n.Loot || {};
      t.push(o.BOC_THAM_TUI && o.BOC_THAM_TUI[i] ? "🎲 Mỗi món rơi đúng 1 cái, bốc thăm ngẫu nhiên giữa người góp công (từ 1% máu boss) rồi vào thẳng túi. Linh Thạch về người ra đòn chót." : "🎯 Đồ rơi chính về người ra đòn chót.");
    }
    return t;
  }
  function O(i) {
    var t = [];
    var e = n.Quest;
    if (e && e.stageInfo) {
      var g = e.stageInfo();
      var A = e.objectives && e.objectives() || [];
      var O = function (n) {
        return !!(n.done || n.max && (0 | n.cur) >= n.max);
      };
      var E = A.filter(O).length;
      var I = g ? String(g.name || "").split("—").pop().trim() : "";
      t.push({ id: "chinh", nhom: "nhiem-vu", icon: "📜", ten: "Nhiệm vụ chính", trangThai: g ? (I || g.name) + (A.length ? " · " + E + "/" + A.length : "") : "Đã xong mạch chính", mau: g ? "san" : "xong", chiTiet: function () {
          return { tieuDe: g ? g.name : "Nhiệm vụ chính", dong: g && g.hint ? [g.hint] : ["Đạo hữu đã đi hết mạch chính hiện có."], muc: A.length ? [{ ten: "Việc cần làm", ds: A.map(function (n) {
                  var i = n.max ? " (" + (0 | n.cur) + "/" + n.max + ")" : "";
                  return (O(n) ? "✅ " : "⬜ ") + n.text + i;
                }) }] : [] };
        } });
    }
    if (e && e.seedTaskList) {
      var L = e.seedTaskList() || [];
      var y = 0;
      L.forEach(function (n) {
        n.dailyLimit;
        y += Math.max(0, 0 | n.runsLeft);
      });
      var U = e.seedTaskInfo && e.seedTaskInfo();
      t.push({ id: "duoc_cong", nhom: "nhiem-vu", icon: "🌿", ten: "Việc Dược Công", trangThai: U ? "Đang làm: " + (U.shortName || U.name) : y > 0 ? "Còn " + y + " lượt hôm nay" : "Hôm nay đã xong", mau: U || y > 0 ? "san" : "xong", chiTiet: function () {
          return { tieuDe: "Việc Dược Công — Đại Phu", dong: ["Nhận việc vặt ở Đại Phu (Dược Viên). Xong việc báo công nhận Dược Công và Linh Thạch."], muc: [{ ten: "Việc hôm nay", ds: L.map(function (n) {
                  var i = n.def || {};
                  return (n.exhausted ? "✅ " : "⬜ ") + (i.shortName || i.name) + " — còn " + (0 | n.runsLeft) + "/" + (0 | n.dailyLimit);
                }) }] };
        } });
    }
    var b = c();
    var D = n.QuanSuUI && n.QuanSuUI.nv;
    var S = !(!b || !b.sect);
    if (t.push({ id: "tong_mon", nhom: "nhiem-vu", icon: "🏯", ten: "Nhiệm vụ tông môn", trangThai: S ? D ? D.dang ? "Đang làm: " + D.dang.ten : "Hôm nay " + D.soXong + "/" + D.toiDa + " việc" : "Mỗi ngày 3 việc" : "Chưa vào tông môn", mau: S ? D && D.soXong >= D.toiDa ? "xong" : "san" : "khoa", chiTiet: function () {
        var i = n.Sect;
        return { tieuDe: "Nhiệm Vụ Tông Môn", dong: ["Nhận, nộp ở Tông Môn Quản Sự (Thành Thăng Long). Mỗi ngày " + (i && i.NV_MOI_NGAY || 3) + " việc; thưởng Cống Hiến cho mình, Kinh Nghiệm cho tông và Chiến Huân vào túi."], muc: D ? [{ ten: "Bảng việc", ds: D.ds.map(function (n) {
                return (n.daLam ? "✅ " : n.dangLam ? "▶ " : "⬜ ") + n.ten + " · +" + n.congHien + " CH" + (n.chienHuan ? " · +" + n.chienHuan + " Chiến Huân" : "");
              }) }] : [] };
      } }), e && e.biTichTrackerInfo && (e.biTichActive && e.biTichActive() || e.biTichOffered && e.biTichOffered())) {
      var B = e.biTichTrackerInfo();
      if (B) {
        t.push({ id: "bi_tich", nhom: "nhiem-vu", icon: "📖", ten: "Nhiệm vụ phụ", trangThai: String(B.name || "").split("—").pop().trim(), mau: "san", chiTiet: function () {
            return { tieuDe: B.name, dong: [B.hint || ""], muc: [] };
          } });
      }
    }
    var G = n.ChinhDao;
    var k = n.LuyenQuy;
    if (G && G.khungGan) {
      var P = G.khungGan(i);
      var Y = G.dao(n);
      var x = G.GIO_MO + ":00–" + G.GIO_DONG + ":00";
      t.push({ id: "ma_chinh_pk", nhom: "su-kien", icon: "⚔️", ten: "Ma – Chính Đạo PK", trangThai: P.dang ? "Đang mở · còn " + _(P.dongLuc - i) : "Mở " + x + " · sau " + _(P.moLuc - i), mau: P.dang ? "san" : "sap", chiTiet: function () {
          return { tieuDe: "Ma Đạo – Chính Đạo tự do PK", the: [["⏰", "Mỗi ngày " + x + " (giờ Việt Nam)"], ["📍", "Mọi bản đồ trừ khu an toàn"], ["🎭", "ma" === Y ? "Bạn đang theo Ma Đạo (Hồn Phiên)" : "chinh" === Y ? "Bạn đang theo Chính Đạo (Kiếm Hạp)" : "Bạn chưa theo đạo nào"]], dong: ["Người cầm Hồn Phiên (Ma Đạo) và người cầm Kiếm Hạp (Chính Đạo) tự đánh được nhau trong khung giờ này, không cần cờ hay dấu Đồ Sát. Người cùng tổ đội không đánh nhau. Mỗi cặp chỉ hạ nhau một lần mỗi ngày."], muc: [{ ten: "Cách tham gia", ds: ["🔮 Ma Đạo: thỉnh Hồn Phiên ở " + p(k.MAP) + ".", "🗡️ Chính Đạo: thỉnh Kiếm Hạp ở Chưởng Sự Chính Đạo (" + p(G.MAP) + ").", "↔️ Đổi đạo phải trả vật cũ, mất cả bầy đã luyện."] }], doRoi: [{ id: G.TRU_MA, ghi: "Chính Đạo hạ Ma tu · lần đầu trong ngày với cặp ấy" }, { id: k && k.TU_SI_HON, ghi: "Ma Đạo hạ Chính tu · kèm Sát Nghiệp" }].filter(function (n) {
              return n.id;
            }) };
        } });
    }
    var K = n.HacThi;
    if (K && K.phieuHomNay && !(e && e.khucBonKhoa && e.khucBonKhoa())) {
      var R;
      var w;
      var Q = !!(n.Inventory && n.Inventory.has && n.Inventory.has(K.QUY_DIEN));
      var V = K.phieuHomNay(n, i);
      if (M("truc_co_1")) {
        if (Q) {
          R = "Hôm nay " + V.da + "/" + V.tran + " Hắc Phiếu";
          w = V.con > 0 ? "san" : "xong";
        }
        else {
          R = "Cần Quỷ Diện (GĐ " + K.GD.AM_HIEU + ")";
          w = "khoa";
        }
      }
      else {
        R = "Cần Trúc Cơ";
        w = "khoa";
      }
      t.push({ id: "hac_thi", nhom: "nhiem-vu", icon: "🎭", ten: "Hắc Thị", trangThai: R, mau: w, chiTiet: function () {
          return { tieuDe: "Hắc Thị", the: [["📍", "Ma Động → Hắc Phong Lĩnh → Hắc Thị"], ["🎓", "Trúc Cơ · đeo Quỷ Diện"], ["🎟️", "Trần " + V.tran + " Hắc Phiếu/ngày"]], dong: ["Mang hàng qua Hắc Phong Lĩnh (đường PK) bán vào Bảng Thu Mua của Quỷ Nha. " + Math.round(100 * K.TY_LE_PHIEU) + "% trả bằng Hắc Phiếu."], doRoi: (K.DOI || []).map(function (n) {
              return { id: n.id, ten: (n.n > 1 ? n.n + " " : "") + T(n.id), ghi: n.gia + " Hắc Phiếu · " + K.tenBac(n.bac) };
            }) };
        } });
    }
    a.forEach(function (i) {
      var a = n.ENEMY_DEFS && n.ENEMY_DEFS[i.type];
      if (a) {
        var o;
        var c;
        if ("song_duc_ma_bao" === i.type) {
          var e = u.duLieu && u.duLieu.maBao;
          var g = n.MaBao;
          if (e && e.dangSong) {
            o = "Đang xuất hiện · còn " + _(Math.max(0, 1e3 * e.conLaiGiay - (Date.now() - u.layLuc)));
            c = "san";
          }
          else {
            if (e && e.daHa) {
              o = "Hôm nay đã bị hạ";
              c = "xong";
            }
            else {
              o = "Ngẫu nhiên " + (g && g.GIO_MO || 11) + ":00–" + (g && g.GIO_DONG || 21) + ":00";
              c = "sap";
            }
          }
        }
        else {
          var r = function (n) {
            var i = u.duLieu;
            if (!i || !i.boss) {
              return null;
            }
            for (var h = 0; h < i.boss.length; h++) {
              var t = i.boss[h];
              if (t.id === n) {
                var a = (Date.now() - u.layLuc) / 1e3;
                return { dead: !!t.dead, con: t.con > 0 ? Math.max(0, t.con - a) : t.con };
              }
            }
            return null;
          }(i.spawn);
          if (r) {
            if (r.dead) {
              if (r.con > 0) {
                o = "Hồi sau " + _(1e3 * r.con);
                c = "sap";
              }
              else {
                o = "Sắp xuất hiện";
                c = "sap";
              }
            }
            else {
              o = "Đang xuất hiện";
              c = "san";
            }
          }
          else {
            o = "Hồi sinh " + s(a.respawnSec);
            c = "sap";
          }
        }
        t.push({ id: "boss_" + i.id, nhom: "boss", icon: i.icon, ten: H(a), phu: C(a), trangThai: o, mau: c, bossType: i.type, chiTiet: function () {
            var t = "song_duc_ma_bao" === i.type ? "Mỗi ngày một lần, hiện ngẫu nhiên " + (n.MaBao && n.MaBao.GIO_MO || 11) + ":00–" + (n.MaBao && n.MaBao.GIO_DONG || 21) + ":00, sống " + s((n.MaBao && n.MaBao.SONG_MS || 2 * h) / 1e3) + "." : "Hồi sinh " + s(a.respawnSec) + " sau khi bị hạ.";
            return { tieuDe: H(a), phu: C(a), bossType: i.type, the: [["📍", p(i.map)], ["⏳", t], ["❤️", m(a.hp) + " máu"], ["⚔️", "Đánh " + a.contactDmg]], dong: i.ghiChu ? [i.ghiChu] : [], muc: [{ ten: "Đặc điểm", ds: v(i.type) }], doRoi: f(i.type) };
          } });
      }
    });
    var X = n.HuyetSac;
    var q = e && e.flags || {};
    var F = X && X.day ? X.day(i) : "";
    var j = q.huyetSacDay === F ? 0 | q.huyetSacCount : 0;
    var z = X && X.luotNgay ? X.luotNgay(N()) : 5;
    var J = M("luyen_khi_7");
    t.push({ id: "huyet_sac", nhom: "bi-canh", icon: "🩸", ten: "Huyết Xích Cấm Địa", trangThai: J ? "Còn " + Math.max(0, z - j) + "/" + z + " lượt" : "Cần Luyện Khí 7", mau: J ? j >= z ? "xong" : "san" : "khoa", chiTiet: function () {
        var i = [];
        o.forEach(function (h) {
          var t = n.Loot && n.Loot.YEU_DAN && n.Loot.YEU_DAN[h];
          if (t && !i.some(function (n) {
            return n.id === t;
          })) {
            i.push({ id: t, ghi: "Mỗi boss · chắc chắn" });
          }
        });
        if (n.Loot && n.Loot.HUYET_SAC_BOSS_ITEM) {
          i.push({ id: n.Loot.HUYET_SAC_BOSS_ITEM, ghi: "Boss · tỉ lệ thấp" });
        }
        if (n.Loot && n.Loot.HUYET_SAC_LONG_TUONG) {
          i.push({ id: n.Loot.HUYET_SAC_LONG_TUONG.ITEM, ghi: "Boss · 0,1%" });
        }
        if (n.Loot && n.Loot.HUYET_BUC_CHUONG) {
          i.push({ id: n.Loot.HUYET_BUC_CHUONG.ITEM, ghi: "Boss · " + l(n.Loot.HUYET_BUC_CHUONG.CHANCE) });
        }
        if (n.Loot && n.Loot.HUYET_SAC_SONG_KICH) {
          i.push({ id: n.Loot.HUYET_SAC_SONG_KICH.ITEM, ghi: "Boss · rất hiếm" });
        }
        ["co_bich_moc", "tran_than_thach", "truc_co_thao"].forEach(function (h) {
          if (n.ITEMS && n.ITEMS[h]) {
            i.push({ id: h, ghi: "Hái trong bí cảnh" });
          }
        });
        return { tieuDe: "Huyết Xích Cấm Địa", the: [["📍", "Đăng ký ở nữ tu Miếu Hoang"], ["👥", "1–6 người"], ["⏳", "15 phút · 5 lượt/ngày (Trúc Cơ: 4)"], ["◈", "100 Linh Thạch/lượt"], ["🎓", "Luyện Khí 7 trở lên"]], dong: ["Ba tầng: Rừng Mãng Xà, Lòng Đất, Đầm Lầy — mỗi tầng một Yêu Thú Cấp 2 đầu đàn."], muc: [{ ten: "Boss", ds: o.map(function (i) {
                var h = n.ENEMY_DEFS && n.ENEMY_DEFS[i];
                return h ? "☠️ " + H(h) + " · " + m(h.hp) + " máu" : i;
              }) }], doRoi: i };
      } });
    var W;
    var Z;
    var $ = n.LamLang;
    var nn = n.LamLangUI && n.LamLangUI.ngoai;
    if ($) {
      if (S) {
        if (nn && nn.run) {
          W = "Đang mở · " + nn.run.soNguoi + " người";
          Z = "san";
        }
        else {
          if (nn && nn.daMoHomNay) {
            W = "Tông đã đi hôm nay";
            Z = "xong";
          }
          else {
            W = "Nên đi " + $.NGUOI_SAN + "–" + $.CHUAN_NGUOI + " người";
            Z = "san";
          }
        }
      }
      else {
        W = "Cần tông môn";
        Z = "khoa";
      }
      t.push({ id: "lam_lang", nhom: "bi-canh", icon: "🏘️", ten: "Lãm Làng", trangThai: W, mau: Z, chiTiet: function () {
          var i;
          var h = $.THUONG.thang;
          return { tieuDe: "Bí Cảnh Lãm Làng", bossType: $.BOSS, the: [["📍", "Mở ở Tông Môn Quản Sự"], ["👥", $.NGUOI_SAN + "–" + $.CHUAN_NGUOI + " người (tối đa " + $.TOI_DA + ")"], ["⏳", "15 phút · 1 lượt/ngày/tông"], ["🎓", (i = $.CANH_GIOI, (n.realmNameById && n.realmNameById(i) || i) + " trở lên")]], dong: ["01:00 chia hai mũi: Cổng Đông cứu ba lồng phàm dân · Đài Đá phá hai Tà Mạch Trụ (trụ bắn như trụ Liên Minh). Tà Soái hiện muộn nhất 07:00."], muc: [{ ten: "Tà Soái Hoàng Cửu Bảo", ds: ["🗡️ Cầm một món binh khí Kết Đan bốc mỗi trận", "👻 Gọi 5 Quỷ Phiên — con nào sống là hắn hồi máu", "🔥 Tà Hỏa Bạo — nổ vào chỗ đứng sau " + $.TA_HOA.BAO_TRUOC_MS / 1e3 + " giây", "⚔️ Kim Quang Cự Kiếm — khoá một người, kiếm bám theo, cắm sau " + $.KIM_KIEM.BAO_TRUOC_MS / 1e3 + " giây"].concat(v($.BOSS)) }], doRoi: [{ id: "linh_thach", ten: h.linhThach + " Linh Thạch", ghi: "Thắng · mỗi người" }, { id: $.CHIEN_HUAN, ten: h.chienHuan + " Chiến Huân", ghi: "Thắng · mỗi người" }, { id: null, icon: "✨", ten: "Tu Vi + " + h.congHien + " Cống Hiến", ghi: "Thắng · mỗi người" }, { id: null, icon: "🌟", ten: "Buff tông 24 giờ", ghi: "+" + Math.round(100 * $.BUFF.exp) + "% Đạo Hạnh" }] };
        } });
    }
    var hn = n.YenLang;
    if (hn) {
      var tn = hn.conLuot(q, i, N());
      var an = hn.luotNgay(N());
      var on = hn.canhGioiHopLe(N());
      t.push({ id: "yen_lang", nhom: "bi-canh", icon: "🔔", ten: "Yên Lãng Sơn", trangThai: on ? "Còn " + tn + "/" + an + " lượt" : "Luyện Khí 7 – Trúc Cơ", mau: on ? tn <= 0 ? "xong" : "san" : "khoa", chiTiet: function () {
          var i = [{ id: "linh_thach", ghi: "Rương Tế Đàn · chắc chắn" }];
          (hn.DO_RUONG || []).forEach(function (h) {
            if ("linh_thach" !== h && n.ITEMS && n.ITEMS[h]) {
              i.push({ id: h, ghi: "Rương Tế Đàn · tỉ lệ thấp" });
            }
          });
          return { tieuDe: "Yên Lãng Sơn", bossType: hn.QUAI.TOC_TRUONG, the: [["📍", "Đăng ký ở nữ tu Miếu Hoang"], ["👥", hn.TOI_THIEU + "–" + hn.TOI_DA + " người"], ["⏳", "Nhắm 8–10 phút · trần " + hn.giayDoc(hn.TONG_MS) + " · " + hn.LUOT_NGAY + " lượt/ngày (Trúc Cơ: " + hn.LUOT_NGAY_TRUC_CO + ")"], ["◈", "Miễn phí"], ["🎓", "Luyện Khí 7 – Trúc Cơ"]], dong: ["Núi phát lệnh: vòng xám thì đứng yên, ngừng đánh; vòng đỏ thì chạy. Sai lệnh bị Thạch Hóa. Đổ ba Trấn Sơn Bia để Tộc Trưởng hết được hộ thể."], muc: [{ ten: "Yên Lãng Lệnh", ds: ["🔔 Tĩnh (vòng xám) — đi quá " + hn.LENH.NGUONG_PX + "px hoặc ra đòn thì Thạch Hóa. Xong Tĩnh: " + hn.LENH.AM_PHA_MS / 1e3 + " giây Âm Phá, quái trong núi ăn thêm " + Math.round(100 * hn.LENH.AM_PHA_THEM) + "% sát thương.", "🌀 Đảo Âm (vòng đỏ, Tộc Trưởng dưới " + Math.round(100 * hn.LENH.DAO_AM_MAU) + "% máu) — ngược lại: đứng yên là Thạch Hóa.", "🌿 Ba bụi linh thảo ở Sơn Đạo: hạ hai Nhím Tộc Tuần Vệ để tan phong ấn, mỗi người hái một lần mỗi bụi."] }, { ten: "Ba tộc canh núi", ds: ["🐍 Xà Tộc (nỏ, phi châm) — Phong Nhận: gió xoáy làm chậm.", "🐒 Hầu Tộc (trúc côn, trúc kiếm) — Lôi Chưởng: sét đánh, choáng ngắn.", "🦔 Nhím Tộc (thương, đao, kiếm) — Hoả Cầu: cháy vài giây.", "Chiêu nào cũng báo vòng dưới chân trước khi nổ; hạ con đang niệm là tan chiêu."] }].concat([{ ten: "Tộc Trưởng", ds: v(hn.QUAI.TOC_TRUONG) }]), doRoi: i };
        } });
    }
    var un = n.HuThien;
    if (un && n.MO_KHOA && n.MO_KHOA.huThien) {
      var cn = un.kyTai(i);
      var en = un.giaiDoan(i, cn);
      var gn = "MO" === en ? "Đang diễn ra · còn " + _(cn.ketThucLuc - i) : "BAO" === en ? "Bảng tông đã chốt · khai " + un.gioDoc(cn.batDauLuc) : "Kỳ tới " + un.ngayVN(cn.batDauLuc).slice(5).split("-").reverse().join("/") + " " + un.gioDoc(cn.batDauLuc);
      t.push({ id: "hu_thien", nhom: "bi-canh", icon: "🏯", ten: "Sỹ Sách Điện", trangThai: gn, mau: "NGHI" === en ? "sap" : "san", chiTiet: function () {
          return { tieuDe: "Sỹ Sách Điện", the: [["📍", "Vào ở Thủ Điện Sỹ Sách, Miếu Ông Trường Con"], ["⏰", "Thứ Năm " + un.gioDoc(cn.batDauLuc) + " · kéo dài " + Math.round(un.KEO_DAI / 6e4) + " phút"], ["🏯", "Chỉ tông môn: danh sách tông chốt " + un.gioDoc(cn.baoLuc) + ", mọi tông cùng vào MỘT bản chung"], ["🎓", "Tông từ 3 giờ tuổi · người vào tông từ 3 giờ · Luyện Khí 7+"]], dong: ["Bốn ải: Ải 1–2 là PvE (Ngọc Phù tự hút vào người, mỗi người giữ tối đa 3; sập hai trụ thì hàng rào sang Ải 3 mở cho mọi tông, hành lang luôn đốt máu); từ Nội Điện các tông đánh được nhau, nhưng đứng gần Sỹ Sách Đỉnh thì tự ngắm Đỉnh trước. Mỗi boss chỉ một con, một mạng; đồ quý rơi từ kho chung, tổng cố định mỗi kỳ. Có top Hạ Sát và top Sát Thương Đỉnh theo tuần."] };
        } });
    }
    function rn(n) {
      var i = [];
      [["luyen_khi", "LK"], ["truc_co", "TC"]].forEach(function (h) {
        [["Vô địch", n.quaVoDich ? n.quaVoDich(h[0]) : []], ["Hạng 2", n.quaHang ? n.quaHang(h[0], 2) : []], ["Hạng 3–4", n.quaHang ? n.quaHang(h[0], 3) : []]].forEach(function (n) {
          n[1].forEach(function (t) {
            i.push({ id: t.id, ten: t.n + " " + T(t.id), ghi: n[0] + " · " + h[1] });
          });
        });
      });
      return i;
    }
    var dn = n.Tournament;
    if (dn && dn.lich) {
      var _n = dn.lich(i);
      var sn = "DANG_DAU" === _n.giaiDoan ? "Đang thi đấu" : "PHONG_CHO" === _n.giaiDoan ? "Phòng chờ đang mở" : "DANG_KY" === _n.giaiDoan ? "Ghi danh · khai " + d(_n.batDauLuc) : "Kỳ tới " + d(_n.batDauLuc);
      t.push({ id: "dai_hoi", nhom: "su-kien", icon: "🏆", ten: "Đại Hội Tu Tiên", trangThai: sn, mau: "CHUA_MO" === _n.giaiDoan ? "sap" : "san", chiTiet: function () {
          return { tieuDe: "Đại Hội Tu Tiên", the: [["⏰", (dn.GIO_KHAI || []).map(function (n) {
                  return n + ":" + r(dn.PHUT_KHAI_HOI || 0);
                }).join(" · ")], ["🎓", "Luyện Khí " + (dn.TANG_TOI_THIEU || 7) + "+ · bảng Trúc Cơ chỉ suất " + (dn.GIO_KHAI_TRUC_CO || [20]).map(function (n) {
                  return n + ":" + r(dn.PHUT_KHAI_HOI || 0);
                }).join(", ")], ["⏳", "Mỗi trận " + Math.round((dn.TRAN_KEO_DAI || 9e4) / 1e3) + " giây"]], dong: ["Ghi danh " + Math.round((dn.MO_DANG_KY_TRUOC || 96e4) / 6e4) + " phút trước giờ khai hội, vào phòng chờ trước 1 phút. Đấu loại trực tiếp, thắng lên vòng. Tối Thứ Năm nghỉ suất 20:16 để dành cho Sỹ Sách Điện."], muc: [{ ten: "Kỳ gần nhất", ds: ["Khai hội " + d(_n.batDauLuc), "Kết thúc " + d(_n.ketThucLuc)] }], doRoi: rn(dn) };
        } });
    }
    var mn = n.ChienBang;
    if (mn) {
      var ln = u.duLieu && u.duLieu.chienBang;
      t.push({ id: "chien_bang", nhom: "su-kien", icon: "⚔️", ten: "Tán Tu Chiến Bảng", trangThai: ln ? (ln.hang ? "Hạng " + ln.hang + " · " : "") + "còn " + ln.luotCon + "/" + ln.luotMoiNgay + " lượt" : mn.LUOT_MOI_NGAY + " lượt/ngày · chốt " + mn.GIO_CHOT + ":00", mau: ln && ln.luotCon <= 0 ? "xong" : "san", chiTiet: function () {
          return { tieuDe: "Tán Tu Chiến Bảng", the: [["📍", "Chấp Sự Đại Hội"], ["⚔️", mn.LUOT_MOI_NGAY + " lượt khiêu chiến/ngày"], ["⏰", "Chốt bảng " + mn.GIO_CHOT + ":00" + (ln ? " · còn " + _(ln.chotLuc - i) : "")], ["🎯", "Đánh tối đa " + mn.KHIEU_CHIEN_TOI_DA + " hạng trên mình"]], dong: ["Top " + mn.SO_SUAT + " tán tu. Thắng thì đổi hạng với người bị khiêu chiến."], doRoi: (mn.THUONG_THANG || []).map(function (n) {
              return { id: n.id, ten: n.n + " " + T(n.id), ghi: "Mỗi trận thắng" };
            }).concat((mn.PHAN_THUONG || []).map(function (n) {
              return { id: n.id, ten: n.n + " " + T(n.id), ghi: "Hạng 1" };
            })).concat([2, 3, 4, 5].reduce(function (n, i) {
              return n.concat(((mn.PHAN_THUONG_HANG || {})[i] || []).map(function (n) {
                return { id: n.id, ten: n.n + " " + T(n.id), ghi: "Hạng " + i };
              }));
            }, [])) };
        } });
    }
    var Tn = n.TongMonChien;
    if (Tn && Tn.lich) {
      var pn = Tn.lich(i);
      var Hn = "DANG_DAU" === pn.giaiDoan ? "Đang giao chiến tới " + Tn.gioDoc(pn.ketThucLuc) : "DANG_KY" === pn.giaiDoan ? "Khai chiến " + Tn.gioDoc(pn.batDauLuc) : (pn.ngay === Tn.ngayVN(i) ? "Tối nay " : Tn.thuDoc(pn.batDauLuc) + " · ") + Tn.gioDoc(pn.batDauLuc);
      t.push({ id: "tmc", nhom: "su-kien", icon: "🚩", ten: "Tông Môn Chiến", trangThai: Hn, mau: S ? "DANG_DAU" === pn.giaiDoan || "DANG_KY" === pn.giaiDoan ? "san" : "sap" : "khoa", chiTiet: function () {
          var n = Tn.CHIEN_HUAN || {};
          return { tieuDe: "Tông Môn Chiến", the: [["⏰", Tn.gioDoc(pn.batDauLuc) + "–" + Tn.gioDoc(pn.ketThucLuc) + " · " + Tn.ngayKhaiDoc()], ["👥", "Tự ghi danh — tông đủ " + (Tn.TOI_THIEU_ONLINE || 3) + " người online"], ["⚔️", (Tn.LUOT_MOI_TONG || 3) + " lượt × " + (Tn.TRAN_MOI_LUOT || 3) + " trận"]], dong: ["Mỗi người một mạng, mỗi trận " + Math.round((Tn.TRAN_KEO_DAI || 9e4) / 1e3) + " giây. Hết giờ bên còn nhiều máu hơn thắng."], doRoi: [{ id: "linh_thach", ten: m(Tn.THUONG_LINH_THACH || 0) + " Linh Thạch", ghi: "Quỹ tông · thắng lượt" }, { id: "chien_huan", ten: "Chiến Huân " + (n.thang || 0) + "/" + (n.hoa || 0) + "/" + (n.thua || 0), ghi: "Mỗi người ra sân · thắng/hoà/thua" }] };
        } });
    }
    return t;
  }
  function E() {
    if (u.el && u.el.root.isConnected) {
      var i = O(e());
      Array.prototype.forEach.call(u.el.loc.children, function (n) {
        n.classList.toggle("on", n.getAttribute("data-loc") === u.loc);
      });
      var h = u.chiTiet && i.filter(function (n) {
        return n.id === u.chiTiet;
      })[0];
      u.el.luoi.classList.toggle("hidden", !!h);
      u.el.loc.classList.toggle("hidden", !!h);
      u.el.ct.classList.toggle("hidden", !h);
      if (h) {
        (function (i) {
          var h = u.el.ct;
          var t = i.chiTiet();
          h.innerHTML = "";
          var a = g("div", "hd-ct-dau");
          var o = g("button", "hd-lui", "‹ Quay lại");
          o.type = "button";
          o.addEventListener("click", function () {
            u.chiTiet = null;
            E();
          });
          a.appendChild(o);
          var c = g("span", "hd-nhan " + i.mau, i.trangThai);
          a.appendChild(c);
          h.appendChild(a);
          var e = g("div", "hd-ct-dinh");
          var r = t.bossType && function (i) {
            var h = n.ENEMY_DEFS && n.ENEMY_DEFS[i];
            var t = n.Assets && n.Assets.mob && n.Assets.mob(i);
            if (!h || !t) {
              return null;
            }
            var a = h.sheet;
            var o = a && a.rects && a.rects[0];
            var u = o ? o[2] : a ? a.fw : h.sprite ? h.sprite.w : t.width;
            var c = o ? o[3] : a ? a.fh : h.sprite ? h.sprite.h : t.height;
            var e = document.createElement("canvas");
            var g = Math.min(3, Math.max(1, Math.floor(Math.min(160 / u, 96 / c))));
            e.width = u * g;
            e.height = c * g;
            e.className = "hd-chan-dung";
            var r = e.getContext("2d");
            r.imageSmoothingEnabled = !1;
            try {
              if (o) {
                r.drawImage(t, o[0], o[1], u, c, 0, 0, u * g, c * g);
              }
              else {
                r.drawImage(t, 0, a && a.sourceY || 0, u, c, 0, 0, u * g, c * g);
              }
            }
            catch (n) {
              return null;
            }
            return e;
          }(t.bossType) || g("span", "hd-ct-icon", i.icon);
          e.appendChild(r);
          var d = g("div", "hd-ct-chu");
          if (d.appendChild(g("h3", null, t.tieuDe)), t.phu && d.appendChild(g("small", null, t.phu)), (t.dong || []).forEach(function (n) {
            if (n) {
              d.appendChild(g("p", null, n));
            }
          }), e.appendChild(d), h.appendChild(e), t.the && t.the.length) {
            var _ = g("div", "hd-the");
            t.the.forEach(function (n) {
              var i = g("div", "hd-the-o");
              i.appendChild(g("span", "hd-the-icon", n[0]));
              i.appendChild(g("span", null, n[1]));
              _.appendChild(i);
            });
            h.appendChild(_);
          }
          if ((t.muc || []).forEach(function (n) {
            if (n.ds && n.ds.length) {
              h.appendChild(g("h4", "hd-muc", n.ten));
              var i = g("ul", "hd-ds");
              n.ds.forEach(function (n) {
                i.appendChild(g("li", null, n));
              });
              h.appendChild(i);
            }
          }), t.doRoi && t.doRoi.length) {
            h.appendChild(g("h4", "hd-muc", "boss" === i.nhom ? "Đồ rơi" : "Phần thưởng"));
            var s = g("div", "hd-roi");
            t.doRoi.forEach(function (i) {
              var h = g("div", "hd-roi-o");
              h.appendChild(i.id ? function (i) {
                var h = document.createElement("canvas");
                h.width = h.height = 16;
                h.className = "hd-icon-mon";
                var t = i && n.ITEMS && n.ITEMS[i];
                var a = t && t.icon || i;
                try {
                  n.drawItemIcon(h.getContext("2d"), a, 0, 0, 16);
                  if (n.sharpenItemIcon) {
                    n.sharpenItemIcon(h, a);
                  }
                }
                catch (n) {
                }
                h.style.width = h.style.height = "28px";
                return h;
              }(i.id) : g("span", "hd-roi-icon", i.icon || "✦"));
              var t = g("div", "hd-roi-chu");
              t.appendChild(g("b", null, i.ten || T(i.id)));
              if (i.ghi) {
                t.appendChild(g("small", null, i.ghi));
              }
              h.appendChild(t);
              h.title = (i.ten || T(i.id)) + (i.ghi ? " — " + i.ghi : "");
              s.appendChild(h);
            });
            h.appendChild(s);
          }
        })(h);
      }
      else {
        (function (n) {
          var i = u.el;
          i.luoi.innerHTML = "";
          u.oTheoId = Object.create(null);
          n.filter(function (n) {
            return "tat-ca" === u.loc || n.nhom === u.loc;
          }).forEach(function (n) {
            var h = g("button", "hd-o " + n.mau);
            h.type = "button";
            h.appendChild(g("span", "hd-o-icon", n.icon));
            var t = g("b", "hd-o-ten", n.ten);
            h.appendChild(t);
            if (n.phu) {
              h.appendChild(g("small", "hd-o-phu", n.phu));
            }
            var a = g("span", "hd-o-tt", n.trangThai);
            h.appendChild(a);
            h.title = n.ten + " — " + n.trangThai;
            h.addEventListener("click", function () {
              u.chiTiet = n.id;
              E();
            });
            i.luoi.appendChild(h);
            u.oTheoId[n.id] = { nut: h, tt: a };
          });
        })(i);
      }
    }
  }
  function I() {
    if (!u.el || !u.el.root.isConnected || null === u.el.root.offsetParent) {
      return i.dung();
    }
    if (!u.chiTiet) {
      for (var n = O(e()), h = 0; h < n.length; h++) {
        var t = n[h];
        var a = u.oTheoId[t.id];
        if (a) {
          if (a.tt.textContent !== t.trangThai) {
            a.tt.textContent = t.trangThai;
          }
          var o = "hd-o " + t.mau;
          if (a.nut.className !== o) {
            a.nut.className = o;
          }
        }
      }
      A(!1);
    }
  }
  i.moTrong = function (n) {
    if (n) {
      if (!(u.el && u.el.root.parentNode === n)) {
        (function (n) {
          n.innerHTML = "";
          var i = u.el = { root: g("div", "hd") };
          i.loc = g("div", "hd-loc");
          i.loc.setAttribute("role", "tablist");
          t.forEach(function (n) {
            var h = g("button", null, n.ten);
            h.type = "button";
            h.setAttribute("data-loc", n.id);
            h.addEventListener("click", function () {
              u.loc = n.id;
              u.chiTiet = null;
              E();
            });
            i.loc.appendChild(h);
          });
          i.luoi = g("div", "hd-luoi");
          i.ct = g("div", "hd-ct hidden");
          i.root.appendChild(i.loc);
          i.root.appendChild(i.luoi);
          i.root.appendChild(i.ct);
          n.appendChild(i.root);
        })(n);
      }
      u.chiTiet = null;
      E();
      A(!0);
      if (!(u.nhip)) {
        u.nhip = setInterval(I, 1e3);
      }
    }
  };
  i.dung = function () {
    if (u.nhip) {
      clearInterval(u.nhip);
      u.nhip = 0;
    }
  };
  i._danhSach = O;
  i._doRoiBoss = f;
}(window.PNTT);
