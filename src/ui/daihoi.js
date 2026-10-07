!function (t) {
  "use strict";
  var a = t.Utils;
  var n = t.DaiHoiUI = { open: !1, state: null };
  var e = {};
  var o = 0;
  var i = !1;
  var h = { CHUA_MO: "Chưa mở sổ", DANG_KY: "Đang nhận ghi danh", PHONG_CHO: "Sắp khai hội", DANG_DAU: "Đang thi đấu" };
  var s = { GHI_DANH: "Đã ghi danh", CHO: "Đang ở phòng chờ", DANG_DAU: "Đang thi đấu", BI_LOAI: "Đã bị loại", VO_DICH: "VÔ ĐỊCH" };
  n.init = function () {
    e.root = a.$("#daihoi");
    if (e.root) {
      e.phase = a.$("#dh-phase");
      e.clock = a.$("#dh-clock");
      e.info = a.$("#dh-info");
      e.msg = a.$("#dh-msg");
      e.act = a.$("#dh-act");
      e.close = a.$("#dh-close");
      e.toast = a.$("#dh-toast");
      if (e.toast) {
        e.toastCard = a.$("#dh-toast-card");
        e.toastPill = a.$("#dh-toast-pill");
        e.toastPillClock = a.$("#dh-toast-pill-clock");
        e.toastSub = a.$("#dh-toast-sub");
        e.toastLabel = a.$("#dh-toast-label");
        e.toastClock = a.$("#dh-toast-clock");
        e.toastMsg = a.$("#dh-toast-msg");
        e.toastAct = a.$("#dh-toast-act");
        a.$("#dh-toast-min").addEventListener("click", function () {
          m(!0);
        });
        e.toastPill.addEventListener("click", function () {
          m(!1);
        });
        a.$("#dh-toast-more").addEventListener("click", function () {
          n.show();
        });
        e.toastAct.addEventListener("click", function () {
          var a = e.toastAct.dataset.act;
          if ("nhanh" !== a) {
            if (a && t.Gateway) {
              t.Gateway.daiHoi(a);
            }
          }
          else {
            if (t.BangNhanhUI) {
              t.BangNhanhUI.show(n.state && n.state.bang);
            }
          }
        });
        window.addEventListener("resize", function () {
          d.key = "";
          n.updateToast();
        });
      }
      e.close.addEventListener("click", function () {
        n.hide();
      });
      e.act.addEventListener("click", function () {
        var a = e.act.dataset.act;
        if (a && t.Gateway) {
          t.Gateway.daiHoi(a);
        }
      });
      e.root.addEventListener("click", function (t) {
        if (t.target === e.root) {
          n.hide();
        }
      });
    }
  };
  n.show = function () {
    if (e.root) {
      n.open = !0;
      e.root.classList.remove("hidden");
      if (e.toast) {
        e.toast.classList.add("hidden");
      }
      if (t.Gateway) {
        t.Gateway.daiHoi("xem");
      }
      b();
    }
  };
  n.hide = function () {
    if (e.root) {
      n.open = !1;
      e.root.classList.add("hidden");
      d.key = "";
      n.updateToast();
    }
  };
  n.toggle = function () {
    if (n.open) {
      n.hide();
    }
    else {
      n.show();
    }
  };
  n.apply = function (t) {
    if (t && t.chiXem) {
      if (n.state) {
        n.state.xem = t.xem || null;
      }
      return void (u.key = "");
    }
    n.state = t;
    if (t && t.lich && !i) {
      o = t.lich.bayGio - Date.now();
      i = !0;
    }
    b();
    d.key = "";
    n.updateToast();
  };
  var l = { el: null, text: "" };
  n.demNguocText = function () {
    return l.text;
  };
  var c = { el: null, key: "" };
  n.dangXem = function () {
    var t = n.state;
    return !(!t || !t.xem) && "dai_hoi_dau" === y();
  };
  n.xemTran = function (a) {
    if (a && t.Gateway && t.Gateway.daiHoi) {
      t.Gateway.daiHoi("xem_tran", a);
    }
  };
  var u = { el: null, key: "" };
  n.update = function () {
    !function () {
      var t = n.state;
      var a = t && t.tranDemNguoc > 0 ? t.tranDemNguoc : 0;
      if (!a && n.dangXem() && t.xem.demNguoc > 0) {
        a = t.xem.demNguoc;
      }
      if (a) {
        l.moc = a;
      }
      var e = "";
      if (l.moc) {
        var o = l.moc - g();
        if (o > 0) {
          e = String(Math.ceil(o / 1e3));
        }
        else {
          if (o > -900) {
            e = "Khai Chiến!";
          }
          else {
            l.moc = 0;
          }
        }
      }
      if (e !== l.text) {
        l.text = e;
        if (!(l.el)) {
          l.el = document.createElement("div");
          l.el.id = "dh-dem-nguoc";
          l.el.setAttribute("aria-live", "assertive");
          document.body.appendChild(l.el);
        }
        l.el.textContent = e;
        l.el.classList.toggle("hidden", !e);
        l.el.classList.toggle("go", e.length > 1);
        l.el.classList.remove("pop");
        l.el.offsetWidth;
        if (e) {
          l.el.classList.add("pop");
        }
      }
    }();
    (function () {
      var a = n.state;
      var e = !!(a && a.tranHet > 0 && "dai_hoi_dau" === y());
      var o = t.Gateway && t.Gateway.duel;
      var i = !(!(o && o.endsAt > 0) || o.tournament);
      var h = e || i;
      if (!c.el) {
        if (!h) {
          return;
        }
        c.el = document.createElement("div");
        c.el.id = "dh-sat";
        c.el.innerHTML = '<span class="dh-sat-so me"></span><div class="dh-sat-thanh"><i></i></div><span class="dh-sat-so foe"></span><span class="dh-sat-gio"></span>';
        document.body.appendChild(c.el);
        c.me = c.el.querySelector(".me");
        c.foe = c.el.querySelector(".foe");
        c.fill = c.el.querySelector("i");
        c.gio = c.el.querySelector(".dh-sat-gio");
      }
      if (c.el.classList.toggle("hidden", !h), h) {
        var s = e ? a.satMinh || 0 : o.damage || 0;
        var l = e ? a.satDoiThu || 0 : o.foeDamage || 0;
        var u = e ? a.tranHet : o.endsAt;
        var d = Math.max(0, Math.ceil((u - g()) / 1e3));
        var r = s + "|" + l + "|" + d;
        if (r !== c.key) {
          c.key = r;
          var m = s + l;
          c.fill.style.width = (m ? s / m * 100 : 50).toFixed(1) + "%";
          c.me.textContent = s;
          c.foe.textContent = l;
          c.gio.textContent = Math.floor(d / 60) + ":" + String(d % 60).padStart(2, "0");
          c.el.classList.toggle("urgent", d <= 15);
        }
      }
      else {
        c.key = "";
      }
    })();
    (function () {
      var a = n.dangXem();
      if (!u.el) {
        if (!a) {
          return;
        }
        var e = u.el = document.createElement("div");
        e.id = "dh-xem";
        e.innerHTML = '<div class="dh-xem-hd"><span class="dh-xem-tag">ĐANG XEM</span><span class="dh-xem-vong"></span><span class="dh-xem-gio"></span><button type="button" class="dh-xem-roi">Thôi Xem</button></div><div class="dh-xem-doi"><div class="dh-xem-ben a"><span class="dh-xem-ten"></span><div class="dh-xem-mau"><i></i></div></div><div class="dh-xem-vs"></div><div class="dh-xem-ben b"><span class="dh-xem-ten"></span><div class="dh-xem-mau"><i></i></div></div></div>';
        document.body.appendChild(e);
        u.vong = e.querySelector(".dh-xem-vong");
        u.gio = e.querySelector(".dh-xem-gio");
        u.vs = e.querySelector(".dh-xem-vs");
        u.a = e.querySelector(".dh-xem-ben.a");
        u.b = e.querySelector(".dh-xem-ben.b");
        e.querySelector(".dh-xem-roi").addEventListener("click", function () {
          if (t.Gateway) {
            t.Gateway.daiHoi("roi");
          }
        });
        ["pointerdown", "mousedown", "touchstart"].forEach(function (t) {
          e.addEventListener(t, function (t) {
            t.stopPropagation();
          }, { passive: !0 });
        });
      }
      if (u.el.classList.toggle("hidden", !a), a) {
        var o = n.state.xem;
        var i = g();
        var h = "";
        var s = !1;
        if (o.veLuc > 0) {
          h = "Về sau " + Math.max(0, Math.ceil((o.veLuc - i) / 1e3)) + "s";
        }
        else if ("DANG_DAU" === o.tt && o.het > 0) {
          var l = Math.max(0, Math.ceil((o.het - i) / 1e3));
          h = Math.floor(l / 60) + ":" + String(l % 60).padStart(2, "0");
          s = l <= 15;
        }
        else {
          if ("DEM_NGUOC" === o.tt) {
            h = "Sắp khai chiến";
          }
          else {
            if ("CHO_VAO" === o.tt) {
              h = "Chờ vào đài";
            }
          }
        }
        var c = [o.tran, o.tt, o.thang, h, o.a.hp, o.b.hp, o.a.sat, o.b.sat].join("|");
        if (c !== u.key) {
          u.key = c;
          u.el.classList.toggle("urgent", s);
          u.vong.textContent = o.vong + " · " + o.bang;
          u.gio.textContent = h;
          u.vs.textContent = o.a.sat + " – " + o.b.sat;
          u.vs.title = "Sát thương đã gây";
          [[u.a, o.a], [u.b, o.b]].forEach(function (t) {
            var a = t[0];
            var n = t[1];
            a.querySelector(".dh-xem-ten").textContent = n.ten || "?";
            a.querySelector("i").style.width = (null == n.hp ? 100 : n.hp) + "%";
            a.classList.toggle("thang", !!o.thang && o.thang === n.id);
            a.classList.toggle("thua", !!o.thang && o.thang !== n.id);
          });
        }
      }
      else {
        u.key = "";
      }
    })();
    if (n.open) {
      b();
    }
    var a = Date.now();
    if (a - d.ve >= 250) {
      d.ve = a;
      n.updateToast();
    }
  };
  var d = { suat: null, thuGon: !1, ve: 0, key: "" };
  var r = "pntt.daiHoiToastMin";
  function g() {
    return t.Gateway && t.Gateway.gioMayChu && t.Gateway.gioMayChu() || f();
  }
  function m(t) {
    d.thuGon = !!t;
    try {
      if (t && d.suat) {
        window.localStorage.setItem(r, d.suat);
      }
      else {
        window.localStorage.removeItem(r);
      }
    }
    catch (t) {
    }
    d.key = "";
    n.updateToast();
  }
  var v = { dai_hoi_cho: 1, dai_hoi_dau: 1 };
  function y() {
    var a = t.SceneWorld && t.SceneWorld.map;
    return a && a.data && a.data.id || "";
  }
  function f() {
    return Date.now() + o;
  }
  function p(t) {
    if (!(t > 0)) {
      t = 0;
    }
    var a = Math.ceil(t / 1e3);
    var n = Math.floor(a / 3600);
    var e = Math.floor(a / 60) % 60;
    var o = a % 60;
    var i = function (t) {
      return (t < 10 ? "0" : "") + t;
    };
    return n > 0 ? n + ":" + i(e) + ":" + i(o) : e + ":" + i(o);
  }
  function b() {
    if (e.root && !e.root.classList.contains("hidden")) {
      var a = n.state;
      if (!a || !a.lich) {
        e.phase.textContent = "Chưa nối được máy chủ";
        e.clock.textContent = "--:--";
        e.info.textContent = "";
        e.msg.textContent = "";
        return void C(null, "Đóng", !0);
      }
      var o;
      var i;
      var l = a.lich;
      var c = f();
      e.phase.textContent = h[l.giaiDoan] || l.giaiDoan;
      if ("CHUA_MO" === l.giaiDoan) {
        o = l.moDangKyLuc;
        i = "nữa mở sổ ghi danh";
      }
      else {
        if ("DANG_KY" === l.giaiDoan) {
          o = l.moPhongChoLuc;
          i = "nữa chốt sổ và tự vào phòng chờ";
        }
        else {
          if ("PHONG_CHO" === l.giaiDoan) {
            o = l.batDauLuc;
            i = "nữa khai hội";
          }
          else {
            o = l.ketThucLuc;
            i = "nữa tan hội";
          }
        }
      }
      e.clock.textContent = p(o - c);
      e.clock.title = i;
      var u = t.Tournament;
      var d = !!(u && u.coBangTrucCo && u.coBangTrucCo(l));
      var r = ["Còn " + p(o - c) + " " + i + "."];
      if (d && a.soNguoiBang ? r.push("Đã ghi danh: bảng Luyện Khí " + (a.soNguoiBang.luyen_khi || 0) + " / " + a.toiDa + " · bảng Trúc Cơ " + (a.soNguoiBang.truc_co || 0) + " / " + a.toiDa + ".") : r.push("Đã ghi danh: " + a.soNguoi + " / " + a.toiDa + " người."), a.daGhiDanh) {
        r.push("Đạo hữu" + (d && a.tenBang ? " (bảng " + a.tenBang + ")" : "") + ": " + (s[a.trangThai] || a.trangThai) + " · đã thắng " + a.thangMayVong + " vòng.");
        if (a.dangDau && a.doiThu) {
          r.push("Đối thủ vòng này: " + a.doiThu + ".");
        }
      }
      else if (d) {
        r.push("Luyện Khí tầng " + a.tangToiThieu + " đến " + (a.tangToiDa || 13) + " đấu bảng Luyện Khí; Trúc Cơ đấu bảng riêng — thắng mỗi trận có Linh Thạch, vô địch nhận thêm quà (mỗi ngày một lần).");
      }
      else {
        var g = u && u.GIO_KHAI_TRUC_CO ? u.GIO_KHAI_TRUC_CO.map(function (t) {
          return t + ":" + (u.PHUT_KHAI_HOI < 10 ? "0" : "") + u.PHUT_KHAI_HOI;
        }).join(", ") : "";
        r.push("Kỳ này chỉ có bảng Luyện Khí tầng " + a.tangToiThieu + " đến " + (a.tangToiDa || 13) + "." + (g ? " Bảng Trúc Cơ mở kỳ " + g + "." : ""));
      }
      var m = a.voDichBang || {};
      if (d && (m.luyen_khi || m.truc_co)) {
        if (m.luyen_khi) {
          r.push("Vô địch bảng Luyện Khí: " + m.luyen_khi + ".");
        }
        if (m.truc_co) {
          r.push("Vô địch bảng Trúc Cơ: " + m.truc_co + ".");
        }
      }
      else {
        if (a.voDich) {
          r.push("Vô địch kỳ này: " + a.voDich + ".");
        }
      }
      e.info.innerHTML = "";
      for (var b = 0; b < r.length; b++) {
        var x = document.createElement("div");
        x.textContent = r[b];
        e.info.appendChild(x);
      }
      e.msg.textContent = a.why || "";
      e.msg.classList.toggle("hidden", !a.why);
      (function (t, a) {
        if (n.dangXem()) {
          return C("roi", "Thôi Xem", !1);
        }
        var e = t.trongDai || !!v[y()];
        var o = t.daGhiDanh && ("BI_LOAI" === t.trangThai || "VO_DICH" === t.trangThai || t.kyXong);
        if (!e || t.daGhiDanh && !o) {
          if (t.daGhiDanh) {
            if ("BI_LOAI" === t.trangThai || "VO_DICH" === t.trangThai) {
              C(null, "Đã xong kỳ này", !0);
            }
            else {
              if ("PHONG_CHO" === a.giaiDoan || "DANG_DAU" === a.giaiDoan) {
                C(null, t.dangDau ? "Đang thi đấu" : "Chờ trọng tài gọi", !0);
              }
              else {
                C("huy", "Rút tên khỏi sổ", !1);
              }
            }
          }
          else {
            if ("DANG_KY" === a.giaiDoan) {
              C("ghi_danh", "Ghi Danh Dự Hội", !1);
            }
            else {
              if ("PHONG_CHO" === a.giaiDoan || "DANG_DAU" === a.giaiDoan) {
                C(null, "Đã chốt sổ kỳ này", !0);
              }
              else {
                C(null, "Chưa tới giờ ghi danh", !0);
              }
            }
          }
        }
        else {
          C("roi", "Về Làng", !1);
        }
      })(a, l);
    }
  }
  function C(t, a, n) {
    e.act.dataset.act = t || "";
    e.act.textContent = a;
    e.act.disabled = !!n;
  }
  n.toastModel = function (a, n, e, o) {
    var i = a;
    var h = n && n.lich && n.lich.id === i.id ? n : null;
    var s = !(!h || !h.daGhiDanh);
    var l = !!v[o || ""] || !(!h || !h.trongDai);
    var c = s && ("BI_LOAI" === h.trangThai || "VO_DICH" === h.trangThai || !!h.kyXong);
    var u = "Kỳ " + t.Tournament.gioDoc(i.batDauLuc);
    var d = { id: i.id, sub: u, label: "", clock: "", fill: 0, urgent: !1, act: null, btn: "", why: h && h.why ? h.why : "" };
    function r(t, a, n) {
      var o = Math.max(0, t - e);
      d.clock = p(o);
      d.fill = a ? Math.max(0, Math.min(1, o / Math.max(1, t - a))) : 0;
      d.urgent = o <= n;
    }
    if (h && h.xem && "dai_hoi_dau" === o) {
      d.label = "Đang xem " + String(h.xem.vong || "").toLowerCase();
      d.sub = u;
      d.act = "roi";
      d.btn = "Thôi Xem";
      return d;
    }
    if (l && (!s || c)) {
      d.label = s ? "VO_DICH" === h.trangThai ? "Vô địch kỳ này!" : "Đã xong kỳ này" : "Đài Luận Võ";
      d.sub = u + (s ? " · thắng " + (h.thangMayVong || 0) + " vòng" : "");
      d.act = "roi";
      d.btn = "Về Làng";
      return d;
    }
    if (c) {
      return null;
    }
    if (h && h.tenBang && t.Tournament.coBangTrucCo(i) && (u += " · bảng " + h.tenBang), "DANG_KY" === i.giaiDoan) {
      r(i.moPhongChoLuc, i.moDangKyLuc, 6e4);
      d.label = "Chốt sổ sau";
      d.sub = u + " · " + (s ? "đã ghi danh" : "mở ghi danh");
      d.act = s ? null : "ghi_danh";
      d.btn = s ? "✓ Đã ghi danh" : "Ghi Danh";
      return d;
    }
    if (!s) {
      return null;
    }
    if ("PHONG_CHO" === i.giaiDoan) {
      r(i.batDauLuc, i.moPhongChoLuc, 15e3);
      d.label = "Vào trận sau";
      d.sub = u + " · phòng chờ";
      d.btn = "Chờ khai hội";
      return d;
    }
    if ("DANG_DAU" === i.giaiDoan) {
      var g = "Vòng " + (h.vong || 1);
      if (h.tranDemNguoc > 0) {
        r(h.tranDemNguoc, h.tranDemNguoc - t.Tournament.DEM_NGUOC_MS, 3e3);
        d.label = g + " · khai chiến sau";
        d.sub = h.doiThu ? "Đối thủ: " + h.doiThu : u;
        d.btn = "Chuẩn bị";
      }
      else {
        if (h.tranHet > 0) {
          r(h.tranHet, h.tranHet - t.Tournament.TRAN_KEO_DAI, 15e3);
          d.label = g + " · hết giờ sau";
          d.sub = h.doiThu ? "Đối thủ: " + h.doiThu : u;
          d.btn = "Đang thi đấu";
        }
        else {
          if (h.tranVaoHan > 0) {
            r(h.tranVaoHan, h.tranVaoHan - t.Tournament.HAN_VAO_DAU, 15e3);
            d.label = g + " · vào đài sau";
            d.sub = h.doiThu ? "Đối thủ: " + h.doiThu : u;
            d.btn = "Đang vào đài";
          }
          else {
            if (h.vongSauLuc > e) {
              r(h.vongSauLuc, h.vongSauLuc - (t.Tournament.NGHI_GIUA_VONG || 12e3), 5e3);
              d.label = "Vòng " + ((h.vong || 1) + 1) + " bắt đầu sau";
              d.sub = u + " · thắng " + (h.thangMayVong || 0) + " vòng";
              d.btn = "Xem bảng nhánh";
              d.act = "nhanh";
            }
            else {
              r(i.ketThucLuc, i.batDauLuc, 0);
              d.label = "Chờ vòng kế";
              d.sub = u + " · thắng " + (h.thangMayVong || 0) + " vòng";
              d.btn = "Chờ trọng tài";
            }
          }
        }
      }
      return d;
    }
    return null;
  };
  n.updateToast = function () {
    if (e.toast && t.Tournament) {
      var a;
      var o;
      var i = !(!t.Gateway || !t.Gateway.ready);
      var h = g();
      var s = t.Tournament.lich(h);
      var l = y();
      var c = i && (a = s, (o = t.SceneWorld && t.SceneWorld.player) && o.realmId && t.Tournament.bangCua(o.realmId, a).bang || v[l]) ? n.toastModel(s, n.state, h, l) : null;
      if (c && d.suat !== c.id) {
        d.suat = c.id;
        d.thuGon = function (t) {
          try {
            return window.localStorage.getItem(r) === t;
          }
          catch (t) {
            return !1;
          }
        }(c.id);
        d.key = "";
        if (t.Gateway) {
          t.Gateway.daiHoi("xem");
        }
      }
      var u = !!c && !n.open;
      if (e.toast.classList.toggle("hidden", !u), u) {
        var m = [c.sub, c.label, c.clock, c.btn, c.act, c.why, d.thuGon, c.urgent].join("|");
        if (m !== d.key) {
          d.key = m;
          e.toast.classList.toggle("min", d.thuGon);
          e.toast.classList.toggle("urgent", c.urgent);
          e.toastCard.classList.toggle("hidden", d.thuGon);
          e.toastPill.classList.toggle("hidden", !d.thuGon);
          e.toastPillClock.textContent = c.clock || "Đại Hội";
          e.toastSub.textContent = c.sub;
          e.toastLabel.textContent = c.label;
          e.toastClock.textContent = c.clock;
          e.toastMsg.textContent = c.why;
          e.toastMsg.classList.toggle("hidden", !c.why);
          e.toastAct.dataset.act = c.act || "";
          e.toastAct.textContent = c.btn;
          e.toastAct.disabled = !c.act;
          e.toastAct.classList.toggle("main", !!c.act);
          e.toastAct.classList.toggle("done", !c.act);
          (function () {
            var t = e.toast;
            var a = document.getElementById("hud-right");
            var n = a && a.getBoundingClientRect();
            var o = window.innerWidth;
            if (!n || !n.width) {
              t.style.top = "12px";
              return void (t.style.right = "12px");
            }
            var i = document.getElementById("party-hud");
            var h = i && !i.classList.contains("hidden") && i.getBoundingClientRect();
            if (h && h.width && h.top < n.bottom && h.right <= n.left + 1) {
              n = { left: h.left, top: n.top, right: n.right, bottom: n.bottom, width: n.width };
            }
            var s = t.getBoundingClientRect().width || 196;
            if (n.left - 8 - s >= 8) {
              t.style.top = Math.round(n.top) + "px";
              t.style.right = Math.round(o - n.left + 8) + "px";
            }
            else {
              t.style.top = Math.round(n.bottom + 6) + "px";
              t.style.right = Math.round(o - n.right) + "px";
            }
          })();
        }
      }
    }
  };
  n.dem = p;
}(window.PNTT);
