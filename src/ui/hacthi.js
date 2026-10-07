!function (n) {
  "use strict";
  var a = n.HacThiUI = {};
  function i() {
    return n.HacThi;
  }
  function t() {
    return n.Quest;
  }
  function h() {
    return n.SceneWorld && n.SceneWorld.player;
  }
  function e() {
    var a = n.TileMap && n.TileMap.data;
    return a ? a.id : "";
  }
  function o() {
    return !!(n.Gateway && n.Gateway.connected && n.Gateway.ready);
  }
  function c(n) {
    return Math.max(0, Number(function (n) {
      var a = i();
      return a ? t().flags[a.CO[n]] : void 0;
    }(n)) || 0);
  }
  function u(a) {
    var i = n.ITEMS && n.ITEMS[a];
    return i && i.name || a;
  }
  function d(n) {
    return (Number(n) || 0).toLocaleString("vi-VN");
  }
  var r = 0;
  function p() {
    return "ht" + ++r + "-" + (1e9 * Math.random() | 0).toString(36);
  }
  var l = null;
  function g(n, a) {
    n = String(n || "");
    l = { text: n.charAt(0).toUpperCase() + n.slice(1), loi: !!a, luc: Date.now() };
  }
  function C(n) {
    if (!(!l || Date.now() - l.luc > 6e3)) {
      n.appendChild(A("p", "hct-bao" + (l.loi ? "" : " tot"), l.text));
    }
  }
  function v(a) {
    var i = h();
    if (n.Audio) {
      n.Audio.play("deny");
    }
    if (i && n.VFX) {
      n.VFX.spawnText(i.x, i.y - 52, a || "không được", "#c9a45c");
    }
    if (n.HUD && n.HUD.setCaption) {
      n.HUD.setCaption(a || "Không được.");
    }
    g(a || "Không được.", !0);
  }
  function f(a, i, t) {
    if (o()) {
      n.Gateway.cmd(a, i || {}, function (a) {
        if (!a || !a.ok) {
          v(a && a.why || "không được");
          return void (t && t(a));
        }
        if (a.toast) {
          g(a.toast, !1);
        }
        if (a.toast && n.HUD && n.HUD.setCaption) {
          n.HUD.setCaption(a.toast);
        }
        if (a.tayNai) {
          T.so = a;
        }
        if (t) {
          t(a);
        }
      });
    }
    else {
      v("Hắc Thị chỉ mở khi chơi trực tuyến");
    }
  }
  function m(a, i, t) {
    n.HUD.openDialog(a, i, t && t.length ? { choices: t } : void 0);
  }
  function s(n, a, i, t, h) {
    return { label: n, note: a || "", onChoose: i, disabled: !!t, icon: h };
  }
  a.chanNpc = function (h, e) {
    var o = i();
    if (!o || !h) {
      return !1;
    }
    switch (h.id) {
      case o.NPC_AN_MAY:
        (function (h) {
          var e = i();
          var o = t().flags;
          var u = t().stage;
          var d = h.name;
          if (u === e.GD.NUT_THAT && !o[e.CO.AM_HIEU]) {
            return o[e.CO.GAP_AN_MAY] ? t().duManhGiay() ? void m(d, '"Đúng ám hiệu. Cầm Quỷ Diện, rồi chở cho Quỷ Nha 5 Yêu Đan Cấp 1."', [s("Nhận Quỷ Diện", "", function () {
                f("hacthi.amHieu", {});
              }, !1, "quy_dien")]) : void m(d, '"Mới có ' + i().MANH_GIAY.filter(function (a) {
              return n.Inventory.has(a);
            }).length + '/3 mảnh. Đủ rồi quay lại."') : void m(d, '"Muốn vào Hắc Thị thì đọc ám hiệu. Hạ Hắc Y Tà Tu ở Rừng Mãng Xà, Đầm Lầy, Bãi Đá Hang Gió lấy 3 mảnh giấy."', [s("Nhận lời", "", function () {
                f("hacthi.noi", { buoc: "gap_an_may" });
              })]);
          }
          if (u !== e.GD.CHUYEN_DAU || o[e.CO.GIAO_CHUYEN])
            if (t().khamChoDangLam() && n.Inventory.has(e.SO_SACH)) {
              var r = c("TUAN_VE") >= e.TUAN_VE_CAN;
              m(d, r ? '"Tốt, đưa sổ đây."' : '"Tuần Vệ còn bám đuôi. Hạ đủ ' + e.TUAN_VE_CAN + " tên ở Hắc Phong Lĩnh (" + c("TUAN_VE") + "/" + e.TUAN_VE_CAN + ')."', r ? [s("Giao sổ", 'Danh hiệu "Kẻ Không Mặt"', function () {
                  f("hacthi.giaoSo", { nhanh: "A" });
                })] : null);
            }
            else {
              var p = [];
              if ((n.Inventory.has(e.QUY_DIEN) || i().coHangLau(n))) {
                p.push(s("Tay Nải", "", function () {
                  a.mo("tay_nai");
                }, !1, "hac_phieu"));
              }
              m(d, n.Inventory.has(e.QUY_DIEN) ? '"Đóng hàng vào Tay Nải ở đây. Gục trong đèo là rơi hết."' : '"Cho xin đồng bạc lẻ…"', p);
            }
          else {
            var l = e.soTrongTayNai(n, e.CHUYEN_DAU_HANG);
            var g = Math.max(0, e.CHUYEN_DAU_SO - l);
            if (g > 0) {
              var C = n.Inventory.tradableCount ? n.Inventory.tradableCount(e.CHUYEN_DAU_HANG) : n.Inventory.count(e.CHUYEN_DAU_HANG);
              return void m(d, C >= g ? '"Đóng hàng vào Tay Nải rồi qua đèo. Chuyến này gục không mất hàng."' : '"Cần ' + e.CHUYEN_DAU_SO + " Yêu Đan Cấp 1, ngươi mới có " + (C + l) + '."', C >= g ? [s("Đóng hàng", g + " Yêu Đan Cấp 1", function () {
                  f("hacthi.dongGoi", { itemId: e.CHUYEN_DAU_HANG, qty: g });
                }, !1, e.CHUYEN_DAU_HANG)] : null);
            }
            m(d, '"Hàng đủ rồi. Qua Hắc Phong Lĩnh, giao cho Quỷ Nha."');
          }
        })(h);
        return !0;
      case o.NPC_QUY_NHA:
        (function (h) {
          var e = i();
          var o = t().flags;
          var u = t().stage;
          var d = h.name;
          if (u !== e.GD.CHUYEN_DAU || o[e.CO.GIAO_CHUYEN]) {
            var r = [];
            var p = e.moBang(n);
            if (t().khamChoMo()) {
              r.push(s("Nhận sổ sách", "Việc phụ", function () {
                f("hacthi.noi", { buoc: "nhan_so_sach" });
              }, !1, "so_sach_den"));
            }
            r.push(s("Bán hàng", p ? "" : "Giao chuyến đầu trước", function () {
              a.mo("thu_mua");
            }, !p, "hac_phieu"));
            r.push(s("Quầy Đổi", "", function () {
              a.mo("doi");
            }, !p));
            r.push(s("Tay Nải", "", function () {
              a.mo("tay_nai");
            }));
            m(d, p ? t().khamChoMo() ? '"Chấp Pháp sắp khám chợ. Mang sổ này đi giúp ta?"' : u === e.GD.SO_THU_MUA ? '"Đủ ' + e.giaDoi(n, e.dongDoi("huyet_ngoc_chi")) + ' Hắc Phiếu thì đổi Huyết Ngọc Chi ở Quầy Đổi."' : '"Mang hàng trong Tay Nải tới đây mà bán."' : '"Ta không làm ăn với mặt lạ."', r);
          }
          else {
            var l = e.soTrongTayNai(n, e.CHUYEN_DAU_HANG);
            var g = c("PHUC_KICH");
            var C = l >= e.CHUYEN_DAU_SO && g >= e.PHUC_KICH_CAN;
            m(d, C ? '"Hàng tới rồi. Từ nay ngươi bán được cho ta."' : '"Tay nải mới có ' + l + "/" + e.CHUYEN_DAU_SO + " Yêu Đan Cấp 1" + (g < e.PHUC_KICH_CAN ? ", phục kích còn đó (" + g + "/" + e.PHUC_KICH_CAN + ")" : "") + '."', C ? [s("Giao hàng", "+12 Hắc Phiếu", function () {
                f("hacthi.giaoChuyen", {});
              })] : null);
          }
        })(h);
        return !0;
      case o.NPC_DAU_GIA:
        (function (n) {
          m(n.name, '"Mỗi phiên một món, mỗi người một phiếu kín. Cao nhất thắng, thua được hoàn."', [s("Xem đấu giá", "", function () {
              a.moDauGia();
            }, !1, "hac_phieu")]);
        })(h);
        return !0;
      case o.NPC_CAI_NGUC:
        (function (n) {
          var a = Q();
          m(n.name, a > 0 ? '"Còn ' + i().chuGiam(a) + ' nữa mới được ra."' : '"Lao này giam kẻ dính tới chợ đen."');
        })(h);
        return !0;
      case o.NPC_CHAP_PHAP:
        (function (a) {
          var h = i();
          if (t().khamChoDangLam() && n.Inventory.has(h.SO_SACH)) {
            m(a.name, '"Nộp sổ thì thưởng ' + d(h.TO_GIAC_LINH_THACH) + " Linh Thạch, nhưng phải ngồi lao " + h.GIAM_PHUT + ' phút."', [s("Tố giác", 'Danh hiệu "Thiết Diện"', function () {
                f("hacthi.giaoSo", { nhanh: "B" });
              })]);
          }
          else {
            m(a.name, '"Chợ đen dưới Ma Động — ta biết. Chỉ thiếu chứng cứ."');
          }
        })(h);
        return !0;
      case "dai_phu": return function (a, h) {
        var e = i();
        var o = t().flags;
        var c = t().stage;
        var u = s("Việc khác…", "", function () {
          h();
        });
        if (c === e.GD.NUT_THAT && n.realmReached(n.Progress.realmId, "truc_co_1") && !o[e.CO.HOI_TRUNG_KY] && !o[e.CO.GAP_AN_MAY]) {
          m(a.name, '"Lên Trung Kỳ cần Ngưng Nguyên Đan, mà Huyết Ngọc Chi chỉ chợ đen có. Tìm Lão Ăn Mày Gù ở Ma Động."', [s("Ghi nhớ", "", function () {
              f("hacthi.noi", { buoc: "hoi_trung_ky" });
            }), u]);
          return !0;
        }
        if (c === e.GD.PHA_QUAN && n.Inventory.has(e.HUYET_NGOC_CHI) && !t().coNgungNguyenDan()) {
          var d = (0 | n.Progress.stones) >= e.LUYEN_DAN_LINH_THACH;
          m(a.name, '"Huyết Ngọc Chi thật. Lão luyện cho, công ' + e.LUYEN_DAN_LINH_THACH + ' Linh Thạch."', [s("Luyện Ngưng Nguyên Đan", e.LUYEN_DAN_LINH_THACH + " Linh Thạch", function () {
              f("hacthi.luyenDan", {});
            }, !d, "pill_crimson"), u]);
          return !0;
        }
        return !1;
      }(h, e);
    }
    return !1;
  };
  a.chanDaiDa = function (n, a) {
    var i = t();
    return !(!i.moTamKiep || !i.moTamKiep() || (m("Phá Quan Trung Kỳ", "Đủ cả rồi. Phá quan sẽ gặp Tâm Kiếp — thắng là lên Trung Kỳ, thua không mất gì.", [s("Phá quan", "", function () {
        f("hacthi.tamKiep", {});
      }, !1, "quy_dien"), s("Đả tọa", "", function () {
        a();
      })]), 0));
  };
  a.nutTrongTui = function (t, h, e) {
    var o = i();
    if (o && t && !t.emptySlot && t.def) {
      var c = n.Inventory.has(o.QUY_DIEN) || o.coHangLau(n);
      if (t.def.id !== o.QUY_DIEN) {
        if (!(!c || t.equipped || o.whyNotHang(n, t.def.id))) {
          h("Đóng vào Tay Nải", "secondary", function () {
            e();
            a.mo("tay_nai", t.def.id);
          });
        }
      }
      else {
        h("Tay Nải Lậu", "", function () {
          e();
          a.mo("tay_nai");
        });
      }
    }
  };
  var y = null;
  var _ = !1;
  var N = "thu_mua";
  var H = null;
  var T = { bang: null, so: null, loi: null };
  function A(n, a, i) {
    var t = document.createElement(n);
    if (a) {
      t.className = a;
    }
    if (null != i) {
      t.textContent = i;
    }
    return t;
  }
  function b(a, i) {
    var t = document.createElement("canvas");
    t.width = t.height = 32;
    t.className = "hct-icon";
    var h = n.ITEMS && n.ITEMS[a];
    if (h && n.drawItemIcon) {
      n.drawItemIcon(t.getContext("2d"), h.icon, 0, 0, 32);
    }
    if (i) {
      t.style.width = t.style.height = i + "px";
    }
    return t;
  }
  function D() {
    if (o()) {
      var a = e() === i().MAP_CHO;
      n.Gateway.cmd(a && "tay_nai" !== N ? "hacthi.xem" : "hacthi.tayNai", {}, function (i) {
        if (!i || !i.ok) {
          T.loi = i && i.why || null;
          return void (i && i.why && a && n.Gateway.cmd("hacthi.tayNai", {}, function (n) {
            if (n && n.ok) {
              T.so = n;
            }
            if (_) {
              U();
            }
          }));
        }
        T.so = i;
        T.loi = null;
        if (i.bang) {
          T.bang = i.bang;
        }
        if (_) {
          U();
        }
      });
    }
    else {
      U();
    }
  }
  function U() {
    if (y) {
      y.innerHTML = "";
      var h = i();
      var c = A("div", "hct-hop");
      y.appendChild(c);
      var r = A("div", "hct-dau");
      r.appendChild(A("div", "hct-ten", "Hắc Thị Tam Giới"));
      var l = A("button", "hct-dong", "✕");
      l.type = "button";
      l.addEventListener("click", a.dong);
      r.appendChild(l);
      c.appendChild(r);
      var g = function () {
        var a = i();
        var t = T.so;
        if (t) {
          return t;
        }
        var h = a.phieuHomNay(n);
        return { bac: a.bacDanh(n), tenBac: a.tenBac(a.bacDanh(n)), danh: a.danh(n), mocKe: a.mocKe(n), phieu: n.Inventory.count(a.HAC_PHIEU), phieuNgay: h.da, tranNgay: h.tran, tayNai: Object.assign({}, a.tayNai(n)), kham: null, cho: null };
      }();
      var v = A("div", "hct-the");
      var m = A("div", "hct-so");
      m.appendChild(A("div", "hct-so-n", g.tenBac));
      m.appendChild(A("div", "hct-so-l", "Hắc Danh " + d(g.danh) + (null != g.mocKe ? "/" + d(g.mocKe) : "")));
      v.appendChild(m);
      var s = A("div", "hct-so");
      s.appendChild(A("div", "hct-so-n", d(g.phieu)));
      s.appendChild(A("div", "hct-so-l", "Hắc Phiếu"));
      v.appendChild(s);
      var _ = A("div", "hct-so");
      if (_.appendChild(A("div", "hct-so-n", d(g.phieuNgay) + "/" + d(g.tranNgay))), _.appendChild(A("div", "hct-so-l", "Phiếu hôm nay")), v.appendChild(_), c.appendChild(v), t().stage === h.GD.SO_THU_MUA && !t().coHuyetNgocChi()) {
        var M = h.giaDoi(n, h.dongDoi("huyet_ngoc_chi"));
        c.appendChild(A("p", "hct-ghi muc-tieu", "Mục tiêu: " + d(Math.min(g.phieu, M)) + "/" + d(M) + " Hắc Phiếu → đổi Huyết Ngọc Chi"));
      }
      if (C(c), o()) {
        if (g.kham && c.appendChild(A("p", "hct-bao", g.kham.bao > 0 ? "Chấp Pháp sắp khám chợ — tạm ngừng thu!" : "Chấp Pháp đang khám chợ.")), g.cho && (g.cho.phieu || g.cho.items && g.cho.items.length)) {
          var G = A("button", "hct-nut phu", "Nhận đồ đang chờ");
          G.type = "button";
          G.addEventListener("click", function () {
            f("hacthi.nhan", {}, function () {
              D();
            });
          });
          c.appendChild(G);
        }
        var P = A("div", "hct-tabs");
        [["thu_mua", "Bán"], ["doi", "Quầy Đổi"], ["tay_nai", "Tay Nải"]].forEach(function (n) {
          var a = A("button", "hct-tab" + (N === n[0] ? " on" : ""), n[1]);
          a.type = "button";
          a.addEventListener("click", function () {
            N = n[0];
            U();
            D();
          });
          P.appendChild(a);
        });
        c.appendChild(P);
        var k = A("div", "hct-than");
        c.appendChild(k);
        if ("thu_mua" === N) {
          (function (a, t) {
            var h = i();
            if (e() === h.MAP_CHO)
              if (h.moBang(n)) {
                a.appendChild(A("p", "hct-ghi", "Chỉ bán hàng trong Tay Nải. Mỗi món nhận có hạn, đầy lại sau 24 giờ."));
                var o = T.bang || [];
                if (o.length) {
                  o.forEach(function (i) {
                    var e = A("div", "hct-hang" + (i.khoa ? " khoa" : ""));
                    e.appendChild(b(i.id));
                    var o = A("div", "hct-giua");
                    if (o.appendChild(A("div", "hct-hang-ten", u(i.id))), i.khoa) {
                      o.appendChild(A("div", "hct-hang-phu", "Cần " + h.tenBac(i.bac)));
                      e.appendChild(o);
                      return void a.appendChild(e);
                    }
                    var c = i.gia * h.TY_LE_PHIEU / h.LT_MOI_PHIEU;
                    var d = Math.floor(i.gia * (1 - h.TY_LE_PHIEU) + 1e-9);
                    o.appendChild(A("div", "hct-hang-phu", c.toLocaleString("vi-VN", { maximumFractionDigits: 1 }) + " phiếu + " + d + " LT/món · còn nhận " + i.con));
                    e.appendChild(o);
                    var r = 0 | i.co;
                    var l = Math.min(r, i.con);
                    var g = I(l, l);
                    var C = A("button", "hct-nut", r ? "Bán" : "Hết hàng");
                    C.type = "button";
                    C.disabled = !(l > 0 && !t.kham);
                    if (!(r)) {
                      g.disabled = !0;
                    }
                    C.addEventListener("click", function () {
                      var a = Math.floor(Number(g.value) || 0);
                      f("hacthi.ban", { itemId: i.id, qty: a, requestId: p() }, function (a) {
                        if (a && a.ok) {
                          if (a.bang) {
                            T.bang = a.bang;
                          }
                          if (n.Audio) {
                            n.Audio.play("coin");
                          }
                          return void D();
                        }
                        U();
                      });
                    });
                    var v = A("div", "hct-phai");
                    v.appendChild(g);
                    v.appendChild(C);
                    e.appendChild(v);
                    a.appendChild(e);
                  });
                }
                else {
                  a.appendChild(A("p", "hct-ghi", T.loi ? "Lại gần Quỷ Nha để xem giá." : "Đang hỏi giá…"));
                }
              }
              else {
                a.appendChild(A("p", "hct-ghi", "Giao chuyến hàng đầu trước."));
              }
            else {
              a.appendChild(A("p", "hct-ghi", "Bảng ở quầy Quỷ Nha, trong Hắc Thị."));
            }
          })(k, g);
        }
        else {
          if ("doi" === N) {
            (function (a) {
              var t = i();
              if (e() === t.MAP_CHO) {
                a.appendChild(A("p", "hct-ghi", "Đổi Hắc Phiếu lấy hàng hiếm."));
                t.DOI.forEach(function (i) {
                  var h = t.giaDoi(n, i);
                  var e = t.xetDoi(n, i.ma);
                  var o = A("div", "hct-hang" + (e ? " mo" : ""));
                  o.appendChild(b(i.id));
                  var c = A("div", "hct-giua");
                  c.appendChild(A("div", "hct-hang-ten", u(i.id) + (i.n > 1 ? " x" + i.n : "")));
                  var r = e && e.indexOf(u(t.HAC_PHIEU)) >= 0 ? "chưa đủ phiếu" : e;
                  c.appendChild(A("div", "hct-hang-phu", d(h) + " Hắc Phiếu" + (r ? " · " + r : i.bac > 1 ? " · cần " + t.tenBac(i.bac) : "")));
                  o.appendChild(c);
                  var l = A("button", "hct-nut", "Đổi");
                  l.type = "button";
                  l.disabled = !!e;
                  l.addEventListener("click", function () {
                    f("hacthi.doi", { ma: i.ma, requestId: p() }, function (a) {
                      if (a && a.ok) {
                        if (n.Audio) {
                          n.Audio.play("coin");
                        }
                        return void D();
                      }
                      U();
                    });
                  });
                  o.appendChild(l);
                  a.appendChild(o);
                });
              }
              else {
                a.appendChild(A("p", "hct-ghi", "Quầy đổi ở chỗ Quỷ Nha."));
              }
            })(k);
          }
          else {
            (function (a, t) {
              var h = i();
              var o = t.tayNai || {};
              var c = Object.keys(o).filter(function (n) {
                return (0 | o[n]) > 0;
              });
              var d = c.reduce(function (n, a) {
                return n + (0 | o[a]);
              }, 0);
              var r = h.camDongGoi(e());
              a.appendChild(A("p", "hct-ghi", c.length + "/" + h.TAY_NAI_O + " loại · " + d + "/" + h.TAY_NAI_MON + " món. " + (r ? "Trong đèo, trong chợ: không đóng, không gỡ." : "Gục trong đèo là rơi hết.")));
              var p = A("div", "hct-tn");
              c.forEach(function (n) {
                var a = A("div", "hct-hang");
                a.appendChild(b(n));
                var i = A("div", "hct-giua");
                i.appendChild(A("div", "hct-hang-ten", u(n) + " x" + o[n]));
                a.appendChild(i);
                var t = I(0 | o[n], 0 | o[n]);
                var h = A("button", "hct-nut phu", "Gỡ ra");
                h.type = "button";
                h.disabled = r;
                t.disabled = r;
                h.addEventListener("click", function () {
                  f("hacthi.goRa", { itemId: n, qty: Math.floor(Number(t.value) || 0) }, function () {
                    D();
                  });
                });
                var e = A("div", "hct-phai");
                e.appendChild(t);
                e.appendChild(h);
                a.appendChild(e);
                p.appendChild(a);
              });
              if (!(c.length)) {
                p.appendChild(A("p", "hct-ghi", "Tay nải trống."));
              }
              a.appendChild(p);
              a.appendChild(A("div", "hct-muc", "Đóng thêm từ túi"));
              var l = (n.Inventory.list ? n.Inventory.list() : []).filter(function (a) {
                return !h.whyNotHang(n, a.def.id) && n.Inventory.tradableCount(a.def.id) > 0;
              });
              l.sort(function (n, a) {
                var i = h.dongThuMua(n.def.id) ? 0 : 1;
                var t = h.dongThuMua(a.def.id) ? 0 : 1;
                if (H) {
                  if (n.def.id === H) {
                    return -1;
                  }
                  if (a.def.id === H) {
                    return 1;
                  }
                }
                return i - t || String(n.def.name).localeCompare(String(a.def.name));
              });
              if (!(l.length)) {
                a.appendChild(A("p", "hct-ghi", "Túi không có hàng buôn được."));
              }
              l.forEach(function (i) {
                var t = i.def.id;
                var e = A("div", "hct-hang" + (t === H ? " chon" : ""));
                e.appendChild(b(t));
                var o = A("div", "hct-giua");
                o.appendChild(A("div", "hct-hang-ten", i.def.name + " x" + n.Inventory.tradableCount(t)));
                o.appendChild(A("div", "hct-hang-phu", h.dongThuMua(t) ? "Quỷ Nha thu" : "Quỷ Nha không thu"));
                e.appendChild(o);
                var c = n.Inventory.tradableCount(t);
                var u = I(c, c);
                var d = A("button", "hct-nut", "Đóng vào");
                d.type = "button";
                d.disabled = r;
                u.disabled = r;
                d.addEventListener("click", function () {
                  f("hacthi.dongGoi", { itemId: t, qty: Math.floor(Number(u.value) || 0) }, function () {
                    D();
                  });
                });
                var p = A("div", "hct-phai");
                p.appendChild(u);
                p.appendChild(d);
                e.appendChild(p);
                a.appendChild(e);
              });
            })(k, g);
          }
        }
      }
      else {
        c.appendChild(A("p", "hct-ghi", "Chỉ mở khi chơi trực tuyến."));
      }
    }
  }
  function I(n, a) {
    var i = A("input", "hct-sl");
    i.type = "number";
    i.min = 1;
    i.max = Math.max(1, n);
    i.value = String(Math.max(1, Math.min(n, a || n)));
    return i;
  }
  a.mo = function (n, t) {
    if (i()) {
      N = n || "thu_mua";
      H = t || null;
      _ = !0;
      l = null;
      (y || ((y = A("div", "hct-lop")).addEventListener("click", function (n) {
        if (n.target === y) {
          a.dong();
        }
      }), document.body.appendChild(y), y)).style.display = "flex";
      U();
      D();
    }
  };
  a.dong = function () {
    _ = !1;
    if (y) {
      y.style.display = "none";
    }
  };
  a.dangMo = function () {
    return _;
  };
  var M = null;
  var G = !1;
  var P = null;
  var k = 0;
  var E = null;
  var L = 0;
  function w(n) {
    var a = P;
    return "Chốt sau " + i().chuGiam(n) + " · " + (a ? a.soPhieu : 0) + " phiếu";
  }
  function Y() {
    if (M) {
      M.innerHTML = "";
      var n = A("div", "hct-hop");
      M.appendChild(n);
      var i = A("div", "hct-dau");
      i.appendChild(A("div", "hct-ten", "Đấu Giá Kín"));
      var t = A("button", "hct-dong", "✕");
      if (t.type = "button", t.addEventListener("click", a.dongDauGia), i.appendChild(t), n.appendChild(i), C(n), o()) {
        var h = P;
        if (h) {
          var e = Math.max(0, h.conMs - (Date.now() - k));
          var c = A("div", "hct-hang lon");
          c.appendChild(b(h.id, 48));
          var r = A("div", "hct-giua");
          if (r.appendChild(A("div", "hct-hang-ten", u(h.id) + (h.n > 1 ? " x" + h.n : ""))), E = A("div", "hct-hang-phu", w(e)), r.appendChild(E), c.appendChild(r), n.appendChild(c), h.phieuCuaToi > 0) {
            n.appendChild(A("p", "hct-ghi", "Phiếu của ngươi: " + d(h.phieuCuaToi) + " Hắc Phiếu · thua được hoàn."));
          }
          else {
            n.appendChild(A("p", "hct-ghi", "Tối thiểu " + h.toiThieu + " · đang có " + d(h.phieu) + " Hắc Phiếu."));
            var l = A("div", "hct-phai");
            var g = I(Math.max(h.toiThieu, h.phieu), h.toiThieu);
            g.min = h.toiThieu;
            var v = A("button", "hct-nut", "Bỏ phiếu");
            v.type = "button";
            v.disabled = h.phieu < h.toiThieu;
            v.addEventListener("click", function () {
              f("hacthi.boPhieu", { gia: Math.floor(Number(g.value) || 0), requestId: p() }, function (n) {
                if (n && n.ok && n.dauGia) {
                  P = n.dauGia;
                  k = Date.now();
                }
                Y();
              });
            });
            l.appendChild(g);
            l.appendChild(v);
            n.appendChild(l);
          }
        }
        else {
          n.appendChild(A("p", "hct-ghi", "Đang tải…"));
        }
      }
      else {
        n.appendChild(A("p", "hct-ghi", "Chỉ mở khi chơi trực tuyến."));
      }
    }
  }
  a.moDauGia = function () {
    if (!(M)) {
      (M = A("div", "hct-lop")).addEventListener("click", function (n) {
        if (n.target === M) {
          a.dongDauGia();
        }
      });
      document.body.appendChild(M);
    }
    G = !0;
    l = null;
    M.style.display = "flex";
    Y();
    if (o()) {
      n.Gateway.cmd("hacthi.dauGia", {}, function (n) {
        if (n && n.ok) {
          P = n.dauGia;
          k = Date.now();
          Y();
        }
        else {
          v(n && n.why);
        }
      });
    }
  };
  a.dongDauGia = function () {
    G = !1;
    E = null;
    if (M) {
      M.style.display = "none";
    }
  };
  var O = 0;
  var x = null;
  var S = 0;
  var K = null;
  function Q() {
    return Math.max(0, O - Date.now());
  }
  function q() {
    var a = i();
    if (a && "undefined" != typeof document) {
      if (!(K)) {
        K = A("div", "hct-dai");
        document.body.appendChild(K);
      }
      var t = e();
      var c = "";
      var u = "hct-dai";
      var d = Q();
      if (d > 0) {
        c = "Thiên Lao · còn " + a.chuGiam(d);
        u += " lao";
      }
      else if (x && (t === a.MAP_CHO || t === a.MAP_HPL)) {
        var r = Date.now() - S;
        var p = x.bao - r;
        var l = x.conMs - r;
        if (p > 0) {
          c = "Chấp Pháp sắp khám chợ · " + a.chuGiam(p);
          u += " do";
        }
        else {
          if (l > 0) {
            c = "Chấp Pháp đang khám · mở lại sau " + a.chuGiam(l);
            u += " do";
          }
          else {
            x = null;
          }
        }
      }
      if (c || t !== a.MAP_HPL) {
        if (!c && t === a.MAP_CHO && n.Gateway && n.Gateway.selfId) {
          c = "Quỷ Diện · ngươi là " + a.tenAn(n.Gateway.selfId);
        }
      }
      else {
        c = "Hắc Phong Lĩnh · PK tự do" + (a.coHangLau(n) ? " · mang hàng: cấm bay" : "");
        u += " pk";
      }
      K.className = u;
      K.textContent = c;
      K.style.display = c ? "block" : "none";
      var g = h();
      if (g && g.flying && a.camBay(n, t) && n.Player && n.Player.landFly) {
        n.Player.landFly(g, n.SceneWorld && n.SceneWorld.map);
        if (n.HUD && n.HUD.setCaption) {
          n.HUD.setCaption("Mang hàng — không bay qua đèo được.");
        }
      }
      (function () {
        if (G && P && E) {
          var a = Math.max(0, P.conMs - (Date.now() - k));
          E.textContent = w(a);
          if (a <= 0 && o() && Date.now() - L > 5e3) {
            L = Date.now();
            n.Gateway.cmd("hacthi.dauGia", {}, function (n) {
              if (n && n.ok) {
                P = n.dauGia;
                k = Date.now();
                Y();
              }
            });
          }
        }
      })();
    }
  }
  a.dangKham = function () {
    if (!x) {
      return !1;
    }
    var n = Date.now() - S;
    return x.bao - n <= 0 && x.conMs - n > 0;
  };
  a.nhan = function (n) {
    if (n) {
      if ("giam" === n.act) {
        O = n.conMs > 0 ? Date.now() + n.conMs : 0;
      }
      if ("kham" === n.act) {
        x = n.kham || null;
        S = Date.now();
      }
      q();
    }
  };
  if ("function" == typeof setInterval && "undefined" != typeof document) {
    setInterval(q, 500);
  }
}(window.PNTT);
