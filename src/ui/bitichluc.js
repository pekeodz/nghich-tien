!function (n) {
  "use strict";
  var t = n.BiTichLuc = { open: !1 };
  var o = { hoa_cau: "Cầu lửa nổ diện nhỏ, thiêu đốt", phong_nhan: "Ba lưỡi gió toả quạt, ra chiêu nhanh", bang_thau: "Năm đinh băng, làm chậm", dia_thich: "Cọc đá trồi lên, choáng", xich_chan: "Trói người chơi trong tầm", loi_chuong: "Sét giáng cả cụm, hồi nhanh", ngu_kiem_sat: "Năm kiếm ảnh quét vùng", huyet_kiem_tran: "Huyết kiếm cắm đất, chấn vùng", cuu_huyet_kiem_tran: "Chín kiếm xoay quanh thân", thanh_lam_kiem_tru: "Mưa kiếm băng, lan thêm 2 kẻ", kim_thuong_giang_the: "Thương lửa giáng, thiêu đốt + choáng", anh_ky_phu: "Kỵ ảnh lao tới, rút Linh Lực", bang_kiem_tran: "Trận băng đóng cứng, Băng Vỡ +20%", bang_kiem_luan: "Kiếm luân băng quanh thân, làm chậm", van_kiem_quy_tong: "24 binh khí lao vào một mục tiêu", tien_vu: "Mưa tên, gây Thâm Thương", tram_ma: "Ma khí tự tìm 3 kẻ gần nhất", ma_bao_an: "Ba ấn nổ liền, Ma Hỏa chắc chắn", ma_hon_phe: "Bầy đầu lâu ma xoáy vào mục tiêu", cuu_u_ma_trao: "Năm bàn tay ma vồ năm kẻ gần nhất", phi_long_tai_thien: "Ba rồng ảo ảnh cắn ba kẻ gần nhau", nguyet_quang: "Nguyệt quang giáng, sát thương lớn", kim_quang_cu_kiem: "Cự kiếm vàng cắm một mục tiêu", ngu_sac_than_chuong: "Bàn tay khổng lồ, hồi rất lâu", huyet_buc_chuong: "Dơi huyết, Thâm Thương, tầm xa", loi_thuong_quan_dia: "Thương sét cắm đất, choáng", ngu_loi_thuong_vu: "Năm thương sét, làm chậm", huyet_liem_tram: "Sóng liêm máu; có liêm: gấp đôi + hút huyết", tu_anh_phuoc_tien: "Bốn bóng quất roi, trói chân 2,5 giây", xich_ma_hoa_than: "Hoá ma thần: đánh nhanh, đấm xa, hút huyết", kim_cuong_hoa_than: "Mạ vàng kim: đánh nhanh, Cương Khí, hút huyết", luc_tinh_truc_kiem: "Sáu kiếm ảnh thay công thường", dan_linh: "Linh Lực tự hồi đều", kim_quang_chao: "Tự dựng khiên khi đòn xuyên tới Khí Huyết", moc_xuan: "Tự chữa khi Khí Huyết bị thương", ho_tam: "Dưới 30% Khí Huyết: giảm 15% sát thương trong 4s", phong_hanh: "+5% tốc chạy; né đòn hồi 1% Khí Huyết", tinh_tam: "Nghỉ 4s không ra chiêu: chiêu sau rẻ hơn 20%", ma_khi: "Bị chí mạng: đòn chí mạng kế giảm 25%", cat_tuong: "Mỗi 10s hồi 12% Giáp cho đồng đội gần", thao_duoc: "Mỗi 10s hồi 8% Khí Huyết cho đồng đội gần" };
  function i(n) {
    return Number(n).toLocaleString("vi-VN") + " Linh Thạch";
  }
  function a(t, o) {
    var i = n.Loot;
    var a = i && i.MA_BAO_BI_TICH_KET_DAN;
    if (a) {
      for (var e = 0; e < a.length; e++)
        if (a[e].ITEM === t) {
          return "Đánh Song Dực Ma Báo";
        }
    }
    return "Đánh Song Dực Ma Báo";
  }
  var e = { van_kiem_quy_tong: function (n) {
      return ["Chưởng Sự Chính Đạo bán · " + i(n.VAN_KIEM_COST)];
    }, kim_quang_cu_kiem: function (n) {
      return ["Chưởng Sự Chính Đạo bán · " + i(n.KIM_QUANG_COST), a("bi_tich_kim_quang_cu_kiem")];
    }, luc_tinh_truc_kiem: function () {
      var t = n.LucTinhTrucKiem;
      var o = t && n.ITEMS && n.ITEMS[t.MAT];
      return ["Chưởng Sự Chính Đạo bán · " + i(t ? t.COST : 0) + (t && o ? " + " + t.MAT_COST + " " + o.name : "")];
    }, ma_bao_an: function (n) {
      return ["Sứ Giả Ma Đạo bán · " + i(n.MA_BAO_AN_COST)];
    }, ma_hon_phe: function () {
      return ["Đánh Song Dực Ma Báo"];
    }, cuu_u_ma_trao: function () {
      return ["Đánh Song Dực Ma Báo"];
    }, phi_long_tai_thien: function () {
      return ["Đánh Song Dực Ma Báo"];
    }, xich_ma_hoa_than: function (n) {
      return ["Sứ Giả Ma Đạo bán · " + i(n.XICH_MA_COST)];
    }, kim_cuong_hoa_than: function (n) {
      return ["Chưởng Sự Chính Đạo bán · " + i(n.KIM_CUONG_COST)];
    }, nguyet_quang: function () {
      return [a("bi_tich_nguyet_quang")];
    }, ngu_sac_than_chuong: function () {
      return [a("bi_tich_ngu_sac_than_chuong")];
    }, loi_thuong_quan_dia: function () {
      return [a("bi_tich_loi_thuong_quan_dia")];
    }, ngu_loi_thuong_vu: function () {
      return [a("bi_tich_ngu_loi_thuong_vu")];
    }, huyet_buc_chuong: function () {
      return ["Đánh boss Huyết Xích Cấm Địa", "Rương Tộc Trưởng Yên Lãng Sơn"];
    }, huyet_liem_tram: function () {
      return ["Đánh quái trong Hang Động"];
    }, tu_anh_phuoc_tien: function () {
      return ["Phần thưởng hạng 1 Top Sát Thương Boss tuần"];
    }, cat_tuong: function () {
      return ["Đánh yêu thú ở Bãi Đá Hàng Gió"];
    }, thao_duoc: function () {
      return ["Đánh yêu thú ở Thảo Dược Cốc"];
    }, dan_linh: function () {
      return ["Quà nhiệm vụ Duyên Pháp Bí Tịch"];
    } };
  var h = [{ id: "chu_dong", label: "Chủ Động" }, { id: "bi_dong", label: "Bị Động" }];
  var u = { chu_dong: [{ id: "so_cap", label: "Sơ Cấp" }, { id: "trung_cap", label: "Trung Cấp" }, { id: "thuong_pham", label: "Thượng Phẩm" }], bi_dong: [{ id: "nen_tang", label: "Nền Tảng" }, { id: "phong_thu", label: "Phòng Thủ" }, { id: "hoi_phuc", label: "Hồi Phục" }, { id: "tang_luc", label: "Tăng Lực" }, { id: "ho_tro", label: "Hỗ Trợ Đội" }] };
  var c = { shield: "phong_thu", ho_tam: "phong_thu", tho_thuan: "phong_thu", ma_khi: "phong_thu", bang_tam: "phong_thu", heal: "hoi_phuc", tu_linh: "hoi_phuc", moc_sinh: "hoi_phuc", tinh_tam: "hoi_phuc", kiem_y: "tang_luc", hoa_mach: "tang_luc", phong_hanh: "tang_luc", cat_tuong: "ho_tro", thao_duoc: "ho_tro" };
  var r = { so_cap: "Phàm phẩm · rút ở Tủ Sơ Cấp", trung_cap: "Linh phẩm · Tủ Trung Cấp hoặc rơi từ boss", thuong_pham: "Đòi Trúc Cơ, có quyển còn đòi đạo", nen_tang: "Tâm pháp đi kèm đạo thể", phong_thu: "Chặn đòn, giảm sát thương", hoi_phuc: "Hồi máu, Linh Lực, tiết kiệm tiêu hao", tang_luc: "Thêm sát thương, tốc độ", ho_tro: "Hồi cho cả đội · chỉ rơi hiếm" };
  function l(n) {
    return String(Math.round(100 * n) / 100).replace(".", ",");
  }
  function g(n) {
    return l(n) + "s";
  }
  function s(t) {
    return n.ITEMS && n.ITEMS[t];
  }
  function m(t) {
    var o = n.Inventory;
    return !!(o && t && (o.owns ? o.owns(t, 1) : o.has && o.has(t, 1)));
  }
  function d(t) {
    return n.realmNameById ? n.realmNameById(t) : t;
  }
  function _(t, o) {
    var i = function (t) {
      var o = n.Gacha;
      var i = [];
      return o && o.POOLS ? (Object.keys(o.POOLS).forEach(function (n) {
        var a = o.POOLS[n];
        if (o.indexOf(t, n) >= 0) {
          i.push("Rút ở " + a.label);
        }
      }), i) : i;
    }(o);
    var a = e[t];
    if (a) {
      i = i.concat(a(n.Skills));
    }
    return i;
  }
  function p(n) {
    var t = [];
    if (n.requireRealm) {
      t.push(d(n.requireRealm));
    }
    if ("ma" === n.dao) {
      t.push("mang Hồn Phiên");
    }
    if ("chinh" === n.dao) {
      t.push("mang Kiếm Hạp");
    }
    if (n.quanQuan) {
      t.push("giữ ngôi Quán Quân Săn Boss");
    }
    if (n.canVuKhi) {
      t.push("có " + n.canVuKhi.map(function (n) {
        var t = s(n);
        return t ? t.name : n;
      }).join(" hoặc "));
    }
    return t.join(" · ");
  }
  function f(t, i, a) {
    var e = n.Skills;
    var h = (n.CONFIG && n.CONFIG.THUNDER, a ? e.THUNDER_BOOK : i.book);
    var u = s(h) || {};
    var c = i.boostWeapon ? s(i.boostWeapon) : null;
    var r = e.powerDmg(i.coef, 1);
    var l = e.powerDmg(i.coef, e.WEAPON_NO_BOOST_MULT);
    var d = !(!c || !e.hasBoostWeapon(i));
    var f = i.cooldown ? i.coef / i.cooldown : 0;
    var b = function (n) {
      var t = Array.isArray(n) ? n : n ? [n] : [];
      var o = [];
      var i = [];
      t.forEach(function (n) {
        var t = "number" == typeof n.chance ? Math.round(100 * n.chance) + "% " : "";
        if ("burn" === n.kind) {
          o.push(t + (n.ma ? "Ma Hỏa " : "Thiêu đốt ") + g(n.time) + (n.dps ? " (" + n.dps + "/s)" : ""));
          i.push(n.ma ? "Ma Hỏa" : "Thiêu");
        }
        else {
          if ("slow" === n.kind) {
            o.push(t + "Chậm còn " + Math.round(100 * n.mult) + "% · " + g(n.time));
            i.push("Chậm");
          }
          else {
            if ("stun" === n.kind) {
              o.push(t + "Choáng " + g(n.time));
              i.push("Choáng");
            }
            else {
              if ("freeze" === n.kind) {
                o.push(t + "Đóng băng " + g(n.time));
                i.push("Băng");
              }
              else {
                if ("root" === n.kind) {
                  o.push(t + "Trói " + g(n.time));
                  i.push("Trói");
                }
                else {
                  if ("wound" === n.kind) {
                    o.push(t + "Thâm Thương " + g(n.time) + (n.dps ? " (" + n.dps + "/s)" : "") + (null != n.heal ? ", hồi máu còn " + Math.round(100 * n.heal) + "%" : ""));
                    i.push("Thâm Thương");
                  }
                }
              }
            }
          }
        }
      });
      return { text: o, tags: i };
    }(a ? null : e.effectOf ? e.effectOf(i) : i.effect);
    var k = a ? "Cả cụm trong vùng sét" : i.maxTargets > 1 ? "Tối đa " + i.maxTargets + " kẻ" : 1 === i.maxTargets ? "Một mục tiêu" : i.shots > 1 ? i.shots + " viên, mỗi viên một đích" : i.blastR >= 20 ? "Nổ diện nhỏ" : "Một mục tiêu";
    var v = [];
    if ("chinh" === i.dao) {
      v.push("Chính Đạo");
    }
    if ("ma" === i.dao) {
      v.push("Ma Đạo");
    }
    if (i.quanQuan) {
      v.push("Quán Quân");
    }
    if (a || i.maxTargets > 1) {
      v.push(a ? "Vùng" : "Vùng ×" + i.maxTargets);
    }
    else {
      if (i.shots > 1) {
        v.push("Chùm ×" + i.shots);
      }
      else {
        v.push("Đơn");
      }
    }
    b.tags.forEach(function (n) {
      if (v.indexOf(n) < 0) {
        v.push(n);
      }
    });
    if (i.mpDrain) {
      v.push("Rút LL");
    }
    if (i.lifesteal) {
      v.push("Hút huyết");
    }
    var T = [["Hồi chiêu", g(i.cooldown)], ["Tiêu hao", i.mp + " LL · " + i.sp + " TT"], ["Tầm", i.range + "px"], ["Mục tiêu", k]];
    if (i.blastR && !a) {
      T.push(["Vùng nổ", "bán kính " + i.blastR + "px"]);
    }
    if (a) {
      T.push(["Vùng sét", "bán kính " + i.blastR + "px"]);
    }
    if (i.cast) {
      T.push(["Vận chiêu", g(i.cast)]);
    }
    if (i.hitDelay > .5) {
      T.push(["Trễ đòn", g(i.hitDelay)]);
    }
    if (i.mpDrain) {
      T.push(["Rút Linh Lực", i.mpDrain + " mỗi lần trúng người"]);
    }
    if (i.shatterBonus) {
      T.push(["Băng Vỡ", "+" + Math.round(100 * i.shatterBonus) + "% lên kẻ đã chậm/đóng băng"]);
    }
    if (i.lifesteal) {
      T.push(["Hút huyết", Math.round(100 * i.lifesteal.pct) + "% mỗi kẻ, tối đa " + Math.round(100 * i.lifesteal.max) + "% (cần " + (c ? c.name : "pháp khí") + ")"]);
    }
    var y = a ? "" : p(i);
    return { id: t, tab: "chu_dong", book: h, name: u.name || i.name, title: i.name, icon: u.icon || i.icon, glow: i.colors && i.colors.glow, grade: u.grade || "", element: i.element, group: i.thuongPham ? "thuong_pham" : i.medium || a ? "trung_cap" : "so_cap", daoRank: "chinh" === i.dao ? 1 : "ma" === i.dao ? 2 : 0, gon: o[t] || i.tip || "", owned: m(h), lock: a ? null : e.lockReason ? e.lockReason(t) : null, cond: y, cd: i.cooldown, dmg: r, dmgFull: r, dmgHalf: c ? l : 0, dmgCoef: i.coef, boostName: c ? c.name : "", boosted: d, dps: f, dpsText: Math.round(r / i.cooldown * 10) / 10, effects: b.text, tags: v, stats: T, nguon: _(t, h), _ratio: f };
  }
  function b(n) {
    for (var t = u[n.tab] || [], o = 0; o < t.length; o++)
      if (t[o].id === n.group) {
        return o;
      }
    return t.length;
  }
  t.TABS = h;
  t.GROUPS = u;
  t.GROUP_HINT = r;
  t.entries = function () {
    var t = n.Skills;
    var i = [];
    var a = n.CONFIG && n.CONFIG.THUNDER;
    if (!t) {
      return i;
    }
    if (a) {
      i.push(f("loi_chuong", { id: "loi_chuong", name: "Lôi Chưởng", element: "Lôi", coef: a.COEF, cooldown: a.COOLDOWN, cast: a.CAST, mp: a.MP_COST, sp: a.SP_COST, range: a.RANGE, blastR: a.RADIUS, medium: !0, colors: t.THUNDER_DEF && t.THUNDER_DEF.colors }, !0));
    }
    t.activeOrder().forEach(function (a) {
      if (t.DEFS[a]) {
        i.push(t.DEFS[a].bienHinh ? function (t, i) {
          var a = n.Skills;
          var e = i.bienHinh;
          var h = s(i.book) || {};
          var u = e.lifesteal || null;
          function c(n) {
            return l(100 * n) + "%";
          }
          var r = [["Hồi chiêu", g(i.cooldown)], ["Tiêu hao", i.mp + " LL · " + i.sp + " TT"], ["Hoá thân", g(e.time)], ["Nhịp đánh", "nhanh gấp " + l(e.speed) + " lần (không dưới " + g(e.minAttack) + " một nhát)"]];
          if (u) {
            r.push(["Hút huyết", c(u.pct) + " Khí Huyết tối đa mỗi nhát trúng (đánh người: " + c(u.pct * (null == u.pvp ? 1 : u.pvp)) + ")"]);
          }
          if (e.giap) {
            r.push([e.giapTen || "Ma Giáp", c(e.giap) + " Giáp tối đa, đỡ đòn trước hộ thuẫn và Giáp"]);
          }
          if (i.cast) {
            r.push(["Vận chiêu", g(i.cast)]);
          }
          r.push(["Chiêu khác", "vẫn dùng được trong lúc hoá thân"]);
          var d = ["Hoá thân"];
          if ("chinh" === i.dao) {
            d.unshift("Chính Đạo");
          }
          if ("ma" === i.dao) {
            d.unshift("Ma Đạo");
          }
          if (u) {
            d.push("Hút huyết");
          }
          return { id: t, tab: "chu_dong", book: i.book, name: h.name || i.name, title: i.name, icon: h.icon || i.icon, glow: i.colors && i.colors.glow, grade: h.grade || "", element: i.element, group: i.thuongPham ? "thuong_pham" : "trung_cap", daoRank: "chinh" === i.dao ? 1 : "ma" === i.dao ? 2 : 0, gon: o[t] || i.tip || "", owned: m(i.book), lock: a.lockReason ? a.lockReason(t) : null, cond: p(i), cd: i.cooldown, noDmg: !0, effects: [], tags: d, stats: r, nguon: _(t, i.book) };
        }(a, t.DEFS[a]) : f(a, t.DEFS[a], !1));
      }
    });
    var e;
    var h;
    var u = (h = (e = n.LucTinhTrucKiem) && s(e.BOOK), e && h ? { id: "luc_tinh_truc_kiem", tab: "chu_dong", book: e.BOOK, name: h.name, title: h.name, icon: h.icon, glow: "#d45aff", grade: h.grade || "", element: "Kiếm Thuật", group: "thuong_pham", daoRank: 1, gon: o.luc_tinh_truc_kiem, owned: m(e.BOOK), lock: e.lockReason ? e.lockReason(n) : null, cond: d(e.REALM) + " · mang Kiếm Hạp", noDmg: !0, effects: [], tags: ["Chính Đạo", "Kiếm thức"], stats: [["Kiếm ảnh", e.COUNT + " thanh"], ["Vũ khí", e.weaponNames(n)], ["Kích hoạt", "Tự thay Công Thường khi cầm đúng kiếm"], ["Tiêu hao", "Không tốn gì"]], nguon: _("luc_tinh_truc_kiem", e.BOOK) } : null);
    if (u) {
      i.push(u);
    }
    var r = function () {
      var n = s("bi_tich_dan_linh");
      if (!n) {
        return null;
      }
      var t = n.mpRegen || 1;
      return { id: "dan_linh", tab: "bi_dong", book: n.id, name: n.name, title: n.name, icon: n.icon, glow: "#bff3d8", grade: n.grade || "", element: "Tâm Pháp", group: "nen_tang", daoRank: 0, gon: "Linh Lực +" + t + " mỗi giây, tự vận hành", owned: m(n.id), lock: null, cond: "", effects: [], tags: [], stats: [["Tiêu hao", "Không tốn gì"], ["Kích hoạt", "Tự động khi có quyển"]], nguon: _("dan_linh", n.id) };
    }();
    if (r) {
      i.push(r);
    }
    t.PASSIVE_ORDER.forEach(function (a) {
      if (t.PASSIVES[a]) {
        i.push(function (t, i) {
          var a = n.Skills;
          var e = s(i.book) || {};
          var h = [["Tiêu hao", i.sp + " Thần Thức mỗi lần kích"]];
          if (!("shield" !== i.kind && "heal" !== i.kind)) {
            h.unshift(["shield" === i.kind ? "Chắn được" : "Hồi lại", a.passiveAmount(i) + " Khí Huyết (theo tu vi)"]);
          }
          if (i.cooldown) {
            h.push(["Hồi", g(i.cooldown)]);
          }
          if (i.maxTargets) {
            h.push(["Phạm vi", "tối đa " + i.maxTargets + " người cùng đội/tông"]);
          }
          var u = [i.sp + " TT"];
          if (i.hoTro) {
            u.push("Đồng đội");
          }
          return { id: t, tab: "bi_dong", book: i.book, name: e.name || i.name, title: i.name, icon: e.icon, glow: i.colors && i.colors.glow, grade: e.grade || "", element: i.element, group: c[i.kind] || "tang_luc", daoRank: 0, gon: o[t] || i.tip, owned: m(i.book), lock: a.passiveLock ? a.passiveLock(t) : null, cond: i.requireRealm ? d(i.requireRealm) : "", effects: [], tags: u, stats: h, nguon: _(t, i.book), cost: i.sp };
        }(a, t.PASSIVES[a]));
      }
    });
    var k = 0;
    i.forEach(function (n) {
      if (n._ratio > k) {
        k = n._ratio;
      }
    });
    i.forEach(function (n) {
      if (null != n._ratio) {
        n.power = k ? Math.max(.04, n._ratio / k) : 0;
      }
      delete n._ratio;
    });
    var v = {};
    i.forEach(function (n, t) {
      v[n.tab + ":" + n.id] = t;
    });
    i.sort(function (n, t) {
      if (n.tab !== t.tab) {
        return "chu_dong" === n.tab ? -1 : 1;
      }
      var o = b(n);
      var i = b(t);
      return o !== i ? o - i : n.daoRank !== t.daoRank ? n.daoRank - t.daoRank : v[n.tab + ":" + n.id] - v[t.tab + ":" + t.id];
    });
    return i;
  };
  t.count = function (n) {
    var t = 0;
    n.forEach(function (n) {
      if (n.owned) {
        t++;
      }
    });
    return { have: t, all: n.length };
  };
  t.fold = function (n) {
    return String(n || "").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").toLowerCase();
  };
  t.filter = function (n, o) {
    var i = t.fold(o.query || "").trim();
    return n.filter(function (n) {
      return !(o.tab && n.tab !== o.tab || o.group && "all" !== o.group && n.group !== o.group || o.missing && n.owned || i && t.fold(n.name + " " + n.element + " " + n.tags.join(" ")).indexOf(i) < 0);
    });
  };
  var k = {};
  var v = [];
  var T = { tab: "chu_dong", group: "all", missing: !1, query: "", sel: null };
  function y(n) {
    return n.tab + ":" + n.id;
  }
  function C(n, t, o, i) {
    var a = document.createElement("button");
    a.type = "button";
    a.className = "bt-chip" + (o ? " " + o : "") + (t ? " on" : "");
    a.textContent = n;
    a.addEventListener("click", i);
    return a;
  }
  function S() {
    k.tabs.innerHTML = "";
    h.forEach(function (n) {
      var o = t.count(v.filter(function (t) {
        return t.tab === n.id;
      }));
      var i = C(n.label + " " + o.have + "/" + o.all, T.tab === n.id, "bt-tab", function () {
        if (T.tab !== n.id) {
          T.tab = n.id;
          T.group = "all";
          T.sel = null;
          k.body.classList.remove("xem-chi-tiet");
          S();
          E();
          w();
        }
      });
      i.setAttribute("role", "tab");
      i.setAttribute("aria-selected", T.tab === n.id ? "true" : "false");
      k.tabs.appendChild(i);
    });
  }
  function E() {
    k.groups.innerHTML = "";
    var n = v.filter(function (n) {
      return n.tab === T.tab;
    });
    k.groups.appendChild(C("Tất cả", "all" === T.group, "", function () {
      T.group = "all";
      E();
      w();
    }));
    u[T.tab].forEach(function (t) {
      var o = n.filter(function (n) {
        return n.group === t.id;
      }).length;
      if (o) {
        k.groups.appendChild(C(t.label + " " + o, T.group === t.id, "", function () {
          T.group = t.id;
          E();
          w();
        }));
      }
    });
    k.groups.appendChild(C("Chưa có", T.missing, "bt-miss", function () {
      T.missing = !T.missing;
      E();
      w();
    }));
  }
  function L(t, o) {
    var i = document.createElement("canvas");
    i.width = i.height = 16;
    i.className = "bt-icon" + (o ? " " + o : "");
    if (t.icon && n.drawItemIcon) {
      n.drawItemIcon(i.getContext("2d"), t.icon, 0, 0, 16);
      if (n.sharpenItemIcon) {
        n.sharpenItemIcon(i, t.icon);
      }
    }
    return i;
  }
  function w() {
    k.list.innerHTML = "";
    var o = t.filter(v, { tab: T.tab, group: T.group, missing: T.missing, query: T.query });
    if (!o.length) {
      var i = document.createElement("p");
      i.className = "bt-none";
      i.textContent = T.missing ? "Không còn quyển nào để tìm — ngươi có đủ rồi." : "Không có quyển nào khớp.";
      k.list.appendChild(i);
      return void H(null);
    }
    if (!(T.sel && o.some(function (n) {
      return y(n) === T.sel;
    }))) {
      T.sel = y(o[0]);
    }
    var a = null;
    o.forEach(function (o) {
      if (o.group !== a) {
        a = o.group;
        var i = u[o.tab].filter(function (n) {
          return n.id === o.group;
        })[0];
        var e = document.createElement("div");
        e.className = "bt-sec";
        var h = v.filter(function (n) {
          return n.tab === o.tab && n.group === o.group;
        });
        var c = t.count(h);
        e.innerHTML = "<b></b><small></small><i></i>";
        e.children[0].textContent = i ? i.label : "Khác";
        e.children[1].textContent = r[o.group] || "";
        e.children[2].textContent = c.have + "/" + c.all;
        k.list.appendChild(e);
      }
      k.list.appendChild(function (t) {
        var o = document.createElement("button");
        o.type = "button";
        o.className = "bt-row" + (t.owned ? " own" : "") + (y(t) === T.sel ? " sel" : "");
        o.style.setProperty("--glow", t.glow || "#c9a45c");
        o.appendChild(L(t));
        var i = document.createElement("span");
        i.className = "bt-row-mid";
        var a = document.createElement("b");
        a.textContent = t.title;
        var e = document.createElement("small");
        if ("chu_dong" !== t.tab || t.noDmg) {
          e.textContent = t.gon;
        }
        else {
          e.textContent = t.dmg + " sát thương · hồi " + g(t.cd);
        }
        i.appendChild(a);
        i.appendChild(e);
        o.appendChild(i);
        var h = document.createElement("span");
        h.className = "bt-row-tags";
        t.tags.slice(0, 2).forEach(function (n) {
          var t = document.createElement("em");
          t.textContent = n;
          h.appendChild(t);
        });
        o.appendChild(h);
        var u = document.createElement("span");
        u.className = "bt-mark";
        u.textContent = t.owned ? "✓" : "";
        u.title = t.owned ? "Đã có" : "";
        o.appendChild(u);
        o.addEventListener("click", function () {
          T.sel = y(t);
          Array.prototype.forEach.call(k.list.querySelectorAll(".bt-row.sel"), function (n) {
            n.classList.remove("sel");
          });
          o.classList.add("sel");
          H(t);
          k.body.classList.add("xem-chi-tiet");
          if (n.Audio) {
            n.Audio.play("ui", { gain: .5 });
          }
        });
        return o;
      }(o));
    });
    H(t.byId(T.sel));
  }
  function M(n, t, o, i) {
    var a = document.createElement(t);
    if (o) {
      a.className = o;
    }
    if (null != i) {
      a.textContent = i;
    }
    n.appendChild(a);
    return a;
  }
  function H(n) {
    if (k.detail.innerHTML = "", n) {
      k.detail.style.setProperty("--glow", n.glow || "#c9a45c");
      var t = M(k.detail, "button", "bt-back", "‹ Danh sách");
      t.type = "button";
      t.addEventListener("click", function () {
        k.body.classList.remove("xem-chi-tiet");
      });
      var o = M(k.detail, "div", "bt-d-head");
      o.appendChild(L(n, "big"));
      var i = M(o, "div", "bt-d-title");
      if (M(i, "b", "", n.title), M(i, "small", "", [n.grade, "Hệ " + n.element].filter(Boolean).join(" · ")), M(o, "span", "bt-own " + (n.owned ? "yes" : "no"), n.owned ? "Đã có" : "Chưa có"), M(k.detail, "p", "bt-gon", n.gon), "chu_dong" === n.tab && !n.noDmg) {
        var a = M(k.detail, "div", "bt-hero");
        M(a, "b", "", String(n.dmg));
        M(a, "span", "", "sát thương · ≈ " + l(n.dpsText) + "/giây");
        var e = M(k.detail, "div", "bt-bar-power");
        M(e, "i").style.width = Math.round(100 * (n.power || 0)) + "%";
        e.title = "Sức so với chiêu mạnh nhất (sát thương mỗi giây)";
        if (n.boostName) {
          M(k.detail, "p", "bt-boost" + (n.boosted ? " ok" : ""), n.boosted ? "Có " + n.boostName + " trong hành trang: đủ sát thương." : "Cần " + n.boostName + " trong hành trang — thiếu thì chỉ còn " + n.dmgHalf + ".");
        }
      }
      var h = M(k.detail, "dl", "bt-grid");
      if (n.stats.forEach(function (n) {
        M(h, "dt", "", n[0]);
        M(h, "dd", "", n[1]);
      }), n.effects.length) {
        M(h, "dt", "", "Hiệu ứng");
        var u = M(h, "dd", "");
        n.effects.forEach(function (n) {
          M(u, "span", "bt-eff", n);
        });
      }
      if (n.cond) {
        M(h, "dt", "", "Điều kiện");
        M(h, "dd", n.lock ? "bt-warn" : "bt-okc", n.cond + (n.lock ? " — " + n.lock : " ✓"));
      }
      M(k.detail, "div", "bt-d-sec", "Kiếm ở đâu");
      var c = M(k.detail, "ul", "bt-src");
      if (n.nguon.length) {
        n.nguon.forEach(function (n) {
          M(c, "li", "", n);
        });
      }
      else {
        M(c, "li", "muted", "Chưa có đường nhận công khai.");
      }
    }
  }
  t.init = function () {
    var o = n.Utils;
    k.root = o.$("#bitichluc");
    return k.root ? (k.count = o.$("#bt-count"), k.tabs = o.$("#bt-tabs"), k.find = o.$("#bt-find"), k.groups = o.$("#bt-groups"), k.body = o.$("#bt-body"), k.list = o.$("#bt-list"), k.detail = o.$("#bt-detail"), k.note = o.$("#bt-note"), k.close = o.$("#bt-close"), k.close.addEventListener("click", function () {
      t.close();
    }), k.root.addEventListener("click", function (n) {
      if (n.target === k.root) {
        t.close();
      }
    }), k.find.addEventListener("input", function () {
      T.query = k.find.value;
      w();
    }), ["keydown", "keyup", "keypress"].forEach(function (n) {
      k.find.addEventListener(n, function (n) {
        n.stopPropagation();
      });
    }), t) : t;
  };
  t.show = function () {
    if (k.root) {
      v = t.entries();
      if (!(t.byId(T.sel))) {
        T.sel = null;
      }
      k.body.classList.remove("xem-chi-tiet");
      (function () {
        S();
        E();
        w();
        var o = t.count(v);
        k.count.textContent = "Đã có " + o.have + "/" + o.all;
        var i = n.Progress && n.realmById ? n.realmById(n.Progress.realmId) : null;
        k.note.textContent = "Sát thương tính theo tu vi hiện tại" + (i ? " (" + i.name + ")" : "") + " · LL = Linh Lực · TT = Thần Thức";
      })();
      k.root.classList.remove("hidden");
      t.open = !0;
      if (n.Audio) {
        n.Audio.play("ui");
      }
    }
  };
  t.close = function () {
    if (k.root) {
      k.root.classList.add("hidden");
      t.open = !1;
    }
  };
  t.back = function () {
    if (k.body && k.body.classList.contains("xem-chi-tiet")) {
      k.body.classList.remove("xem-chi-tiet");
    }
    else {
      t.close();
    }
  };
  t.byId = function (n) {
    if (!n) {
      return null;
    }
    for (var t = 0; t < v.length; t++)
      if (v[t].tab + ":" + v[t].id === n) {
        return v[t];
      }
    return null;
  };
}(window.PNTT);
