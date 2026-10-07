!function (t) {
  "use strict";
  var n = t.TongMonChienUI = { open: !1, state: null, tran: null, ketCap: null, bangTuan: null };
  var a = {};
  var e = 0;
  var i = !1;
  var o = { ve: 0, key: "", thuGon: !1, ky: null };
  var c = "pntt.tmcToastMin";
  function l() {
    return t.TongMonChien;
  }
  function d() {
    return t.Gateway;
  }
  function u() {
    var n = t.SceneWorld && t.SceneWorld.map;
    return n && n.data && n.data.id || "";
  }
  function r() {
    return !!l() && u() === l().MAP;
  }
  function h() {
    return d() && d().gioMayChu && d().gioMayChu() || Date.now() + e;
  }
  function s(t) {
    if (!(t > 0)) {
      t = 0;
    }
    var n = Math.ceil(t / 1e3);
    var a = Math.floor(n / 3600);
    var e = Math.floor(n / 60) % 60;
    var i = n % 60;
    var o = function (t) {
      return (t < 10 ? "0" : "") + t;
    };
    return a > 0 ? a + ":" + o(e) + ":" + o(i) : e + ":" + o(i);
  }
  function g(t, n, a) {
    var e = document.createElement(t);
    if (n) {
      e.className = n;
    }
    if (void 0 !== a) {
      e.textContent = a;
    }
    return e;
  }
  function p(t) {
    return Number(t || 0).toLocaleString("vi-VN");
  }
  function m(a) {
    if (a)
      if ("bang" !== a) {
        var e = d();
        if (e && e.tmc) {
          e.tmc(a, function (a) {
            if (a && !a.ok) {
              n.loi = a.why || "Không thực hiện được.";
              n.loiLuc = Date.now();
            }
            else {
              n.loi = "";
            }
            o.key = "";
            if (a && a.toast && t.HUD && t.HUD.setCaption) {
              t.HUD.setCaption(a.toast);
            }
            if (n.open) {
              L();
            }
          });
        }
      }
      else {
        n.show();
      }
  }
  function b(t) {
    o.thuGon = !!t;
    try {
      if (t && o.ky) {
        window.localStorage.setItem(c, o.ky);
      }
      else {
        window.localStorage.removeItem(c);
      }
    }
    catch (t) {
    }
    o.key = "";
  }
  n.dem = s;
  n.init = function () {
    if (!a.toast && "undefined" != typeof document && document.body) {
      a.toast = g("aside", "tmc-toast hidden");
      a.toast.id = "tmc-toast";
      a.toast.setAttribute("aria-live", "polite");
      a.toast.setAttribute("aria-label", "Tông Môn Chiến");
      a.toast.innerHTML = '<button class="tmc-pill hidden" type="button" aria-label="Mở thẻ Tông Môn Chiến"><span class="tmc-icon" aria-hidden="true">宗</span><b class="tmc-pill-clock">--:--</b></button><div class="tmc-card"><button class="tmc-head" type="button" title="Mở bảng" aria-label="Mở bảng Tông Môn Chiến"><span class="tmc-icon" aria-hidden="true">宗</span><span class="tmc-title"><strong class="tmc-label"></strong><small class="tmc-sub"></small></span><b class="tmc-clock">--:--</b></button><button class="tmc-min" type="button" aria-label="Thu gọn" title="Thu gọn">–</button><p class="tmc-msg hidden"></p><button class="tmc-act" type="button"></button></div>';
      document.body.appendChild(a.toast);
      a.pill = a.toast.querySelector(".tmc-pill");
      a.pillClock = a.toast.querySelector(".tmc-pill-clock");
      a.card = a.toast.querySelector(".tmc-card");
      a.label = a.toast.querySelector(".tmc-label");
      a.sub = a.toast.querySelector(".tmc-sub");
      a.clock = a.toast.querySelector(".tmc-clock");
      a.msg = a.toast.querySelector(".tmc-msg");
      a.act = a.toast.querySelector(".tmc-act");
      a.toast.querySelector(".tmc-min").addEventListener("click", function () {
        b(!0);
      });
      a.pill.addEventListener("click", function () {
        b(!1);
      });
      a.toast.querySelector(".tmc-head").addEventListener("click", function () {
        n.show();
      });
      a.act.addEventListener("click", function () {
        m(a.act.dataset.act);
      });
      a.tran = g("div", "hidden");
      a.tran.id = "tmc-tran";
      a.tran.innerHTML = '<div class="tmc-ben a"><span class="tmc-hang"><b class="tmc-ten"></b><span class="tmc-dung"></span></span><div class="tmc-thanh"><i></i></div></div><div class="tmc-giua"><b class="tmc-gio"></b><small class="tmc-tran-ten"></small><small class="tmc-ket"></small></div><div class="tmc-ben b"><span class="tmc-hang"><b class="tmc-ten"></b><span class="tmc-dung"></span></span><div class="tmc-thanh"><i></i></div></div>';
      document.body.appendChild(a.tran);
      a.dem = g("div", "hidden");
      a.dem.id = "tmc-dem";
      a.dem.setAttribute("aria-live", "assertive");
      document.body.appendChild(a.dem);
      a.bang = g("div", "overlay hidden");
      a.bang.id = "tmc-bang";
      a.bang.setAttribute("role", "dialog");
      a.bang.setAttribute("aria-modal", "true");
      a.bang.setAttribute("aria-label", "Tông Môn Chiến");
      a.bangThan = g("div", "scroll-panel narrow tmc-panel");
      a.bang.appendChild(a.bangThan);
      a.bang.addEventListener("click", function (t) {
        if (t.target === a.bang) {
          n.hide();
        }
      });
      document.body.appendChild(a.bang);
      window.addEventListener("resize", function () {
        o.key = "";
      });
    }
  };
  n.apply = function (t) {
    if (t) {
      n.state = t;
      if (t.lich && !i) {
        e = t.lich.bayGio - Date.now();
        i = !0;
      }
      o.key = "";
      if (n.open) {
        L();
      }
    }
  };
  n.onTran = function (t) {
    if (n.tran && t.capId !== n.tran.capId) {
      n.ketCap = null;
    }
    n.tran = t;
    if (n.open) {
      L();
    }
  };
  n.onKet = function (t) {
    if (t && t.cap) {
      n.ketCap = t;
    }
  };
  n.lam = m;
  n.toastModel = function (t, n, a, e, i, o) {
    var c = l();
    if (!c || !t) {
      return null;
    }
    var d = n && n.lich && n.lich.id === t.id ? n : null;
    var u = d && d.toi;
    var r = function (t) {
      return !!l() && t === l().MAP;
    }(i);
    var h = (a && a.phe || u && u.phe, { id: t.id, label: "", sub: "Tông Môn Chiến", clock: "", urgent: !1, act: null, btn: "", why: "" });
    if (r && (o || u && u.trongSan)) {
      var g = o || {};
      var p = g.a && g.b ? g.a.ten + " — " + g.b.ten : h.sub;
      h.act = "roi";
      h.btn = "Rời Sân";
      h.sub = p;
      if ("DEM_NGUOC" === g.trangThai) {
        h.label = "Trận " + g.so + " · khai chiến";
        h.clock = s(g.demNguocLuc - e);
        h.urgent = !0;
      }
      else {
        if ("DANG_DAU" === g.trangThai) {
          h.label = "Trận " + g.so;
          h.clock = s(g.hetGioLuc - e);
          h.urgent = g.hetGioLuc - e <= 15e3;
        }
        else {
          if ("CHO_VAO" === g.trangThai) {
            h.label = "Trận " + g.so + " · chờ vào";
            h.clock = s(g.hanVaoLuc - e);
          }
          else {
            if ("XONG" === g.trangThai && g.tiepLuc) {
              h.label = "Trận " + (g.so + 1) + " sau";
              h.clock = s(g.tiepLuc - e);
            }
            else {
              if ("CAP_XONG" === g.trangThai) {
                h.label = "Xong lượt";
                h.clock = s(t.ketThucLuc - e);
              }
              else {
                h.label = "Sân Đấu VIP";
                h.clock = s(t.ketThucLuc - e);
              }
            }
          }
        }
      }
      return h;
    }
    if (!a) {
      return null;
    }
    if ("DANG_KY" === t.giaiDoan) {
      h.label = "Khai chiến";
      h.clock = s(t.batDauLuc - e);
      h.urgent = t.batDauLuc - e <= 6e4;
      h.sub = c.gioDoc(t.batDauLuc) + " · tự vào";
      var m = u && "number" == typeof u.duTuCach ? u.duTuCach : null;
      if (null === m) {
        h.btn = "";
      }
      else {
        if (m >= c.TOI_THIEU_ONLINE) {
          h.btn = "✓ " + m + " người";
        }
        else {
          h.btn = "✕ Thiếu người " + m + "/" + c.TOI_THIEU_ONLINE;
        }
      }
      return h;
    }
    return "DANG_DAU" !== t.giaiDoan || !u || !u.daGhiDanh || d && d.xong ? null : (h.clock = s(t.ketThucLuc - e), u.loai ? (h.label = "Không đủ người", h.btn = "Bảng", h.act = "bang", h) : u.xong ? (h.label = "Xong kỳ", h.sub = u.diem + " điểm", h.btn = "Bảng", h.act = "bang", h) : u.capId ? (h.label = "Đang đấu · lượt " + (u.luot + 1), u.duocTinh ? (h.act = "vao", h.btn = "Vào Sân", h) : (h.btn = "Chỉ xem", h)) : (u.nghiToi > e ? (h.label = "Nghỉ · lượt " + (u.luot + 1), h.clock = s(u.nghiToi - e)) : h.label = "Chờ cặp · " + u.luot + "/" + c.LUOT_MOI_TONG, u.trongCho ? (h.act = "roi", h.btn = "Rời Phòng") : u.duocTinh ? (h.act = "vao", h.btn = "Vào Lại") : (h.btn = "Bảng", h.act = "bang"), h));
  };
  n.tranModel = function (t, n, a, e) {
    if (!t || !t.a || !t.b) {
      return null;
    }
    var i = l();
    function o(n) {
      var a = t[n];
      var e = (a.ds || []).length;
      return { ten: a.ten, dung: a.dung + "/" + e, fill: e ? Math.max(0, Math.min(1, (a.mau || 0) / e)) : 0, mau: Math.round(100 * (a.mau || 0)) + "%" };
    }
    var c = { a: o("a"), b: o("b"), minh: null, nhan: "", gio: "", urgent: !1 };
    if (n && t.a.tongId === n) {
      c.minh = "a";
    }
    else {
      if (n && t.b.tongId === n) {
        c.minh = "b";
      }
    }
    var d = i && t.so ? i.tenTran(t.so, e) : "";
    c.nhan = t.so ? "Trận " + t.so + "/3 · " + d : "Tông Môn Chiến";
    if ("DANG_DAU" === t.trangThai) {
      c.gio = s(t.hetGioLuc - a);
      c.urgent = t.hetGioLuc - a <= 15e3;
    }
    else {
      if ("DEM_NGUOC" === t.trangThai) {
        c.gio = "Chuẩn bị";
      }
      else {
        if ("CHO_VAO" === t.trangThai) {
          c.gio = "Chờ " + s(t.hanVaoLuc - a);
        }
        else {
          if ("XONG" === t.trangThai) {
            c.gio = t.tiepLuc ? "Sau " + s(t.tiepLuc - a) : "Xong";
          }
          else {
            if ("CAP_XONG" === t.trangThai) {
              c.gio = "Xong lượt";
            }
          }
        }
      }
    }
    return c;
  };
  var v = { moc: 0, text: "" };
  n.update = function () {
    if (a.toast) {
      var t = h();
      !function (t) {
        if (a.dem) {
          var e = r() ? n.tran : null;
          if (e && "DEM_NGUOC" === e.trangThai && e.demNguocLuc > 0) {
            v.moc = e.demNguocLuc;
          }
          var i = "";
          if (v.moc) {
            var o = v.moc - t;
            if (o > 0) {
              i = String(Math.ceil(o / 1e3));
            }
            else {
              if (o > -900) {
                i = "Khai Chiến!";
              }
              else {
                v.moc = 0;
              }
            }
          }
          if (i !== v.text) {
            v.text = i;
            a.dem.textContent = i;
            a.dem.classList.toggle("hidden", !i);
            a.dem.classList.toggle("go", i.length > 1);
            a.dem.classList.remove("pop");
            a.dem.offsetWidth;
            if (i) {
              a.dem.classList.add("pop");
            }
          }
        }
      }(t);
      var e = Date.now();
      if (!(e - o.ve < 250)) {
        o.ve = e;
        if (!r() && n.tran) {
          n.tran = null;
          n.ketCap = null;
        }
        (function (t) {
          if (a.toast && l()) {
            var e = d();
            var i = !(!e || !e.ready);
            var r = l().lich(t);
            var h = u();
            var s = i ? n.toastModel(r, n.state, e.sect || null, t, h, n.tran) : null;
            if (s && o.ky !== s.id) {
              o.ky = s.id;
              o.thuGon = function (t) {
                try {
                  return window.localStorage.getItem(c) === t;
                }
                catch (t) {
                  return !1;
                }
              }(s.id);
              o.key = "";
              if (e && e.tmc) {
                e.tmc("xem");
              }
            }
            var g = !!s && !n.open;
            if (a.toast.classList.toggle("hidden", !g), g) {
              var p = n.loi && Date.now() - (n.loiLuc || 0) < 8e3 ? n.loi : "";
              var m = [s.sub, s.label, s.clock, s.btn, s.act, p, o.thuGon, s.urgent].join("|");
              if (m !== o.key) {
                o.key = m;
                a.toast.classList.toggle("min", o.thuGon);
                a.toast.classList.toggle("urgent", s.urgent);
                a.card.classList.toggle("hidden", o.thuGon);
                a.pill.classList.toggle("hidden", !o.thuGon);
                a.pillClock.textContent = s.clock || "宗";
                a.label.textContent = s.label;
                a.sub.textContent = s.sub;
                a.clock.textContent = s.clock;
                a.msg.textContent = p;
                a.msg.classList.toggle("hidden", !p);
                a.act.dataset.act = s.act || "";
                a.act.textContent = s.btn;
                a.act.classList.toggle("hidden", !s.btn);
                a.act.disabled = !s.act;
                a.act.classList.toggle("main", !!s.act);
                a.act.classList.toggle("done", !s.act);
                (function () {
                  var t = a.toast;
                  var n = document.getElementById("dh-toast");
                  var e = n && !n.classList.contains("hidden") && n.getBoundingClientRect();
                  if (e && e.width) {
                    t.style.top = Math.round(e.bottom + 6) + "px";
                    return void (t.style.right = Math.round(window.innerWidth - e.right) + "px");
                  }
                  var i = document.getElementById("hud-right");
                  var o = i && i.getBoundingClientRect();
                  var c = t.getBoundingClientRect().width || 196;
                  if (!o || !o.width) {
                    t.style.top = "12px";
                    return void (t.style.right = "12px");
                  }
                  if (o.left - 8 - c >= 8) {
                    t.style.top = Math.round(o.top) + "px";
                    t.style.right = Math.round(window.innerWidth - o.left + 8) + "px";
                  }
                  else {
                    t.style.top = Math.round(o.bottom + 6) + "px";
                    t.style.right = Math.round(window.innerWidth - o.right) + "px";
                  }
                })();
              }
            }
          }
        })(t);
        (function (t) {
          if (a.tran) {
            var e = d();
            var i = r() ? n.tran : null;
            var o = e && e.sect;
            var c = i ? n.tranModel(i, o && o.id, t, o && o.phe) : null;
            if (a.tran.classList.toggle("hidden", !c), c) {
              var l = "";
              var u = n.ketCap;
              if (u && u.capId === i.capId) {
                var h = "hoa" === u.thang ? null : "a" === u.thang ? u.a.ten : u.b.ten;
                l = (h ? h + " thắng" : "Hoà") + " · " + u.diem.a + "–" + u.diem.b;
              }
              else {
                if (i.ketQua && i.ketQua.length) {
                  l = i.ketQua.map(function (t) {
                    return "hoa" === t ? "Hoà" : "a" === t ? i.a.ten : i.b.ten;
                  }).map(function (t, n) {
                    return "T" + (n + 1) + ": " + t;
                  }).join(" · ");
                }
              }
              var s = [c.a.ten, c.a.dung, c.a.mau, c.b.ten, c.b.dung, c.b.mau, c.nhan, c.gio, c.minh, l].join("|");
              if (a.tran.dataset.key !== s) {
                a.tran.dataset.key = s;
                ["a", "b"].forEach(function (t) {
                  var n = a.tran.querySelector(".tmc-ben." + t);
                  n.classList.toggle("minh", c.minh === t);
                  n.querySelector(".tmc-ten").textContent = c[t].ten;
                  n.querySelector(".tmc-dung").textContent = c[t].dung;
                  n.querySelector(".tmc-thanh i").style.width = (100 * c[t].fill).toFixed(1) + "%";
                  n.title = "Máu " + c[t].mau;
                });
                a.tran.querySelector(".tmc-tran-ten").textContent = c.nhan;
                a.tran.querySelector(".tmc-gio").textContent = c.gio;
                var g = a.tran.querySelector(".tmc-ket");
                g.textContent = l;
                g.classList.toggle("hidden", !l);
                a.tran.classList.toggle("urgent", c.urgent);
              }
            }
            else {
              a.tran.dataset.key = "";
            }
          }
        })(t);
        if (n.open) {
          y(t);
        }
      }
    }
  };
  n.show = function () {
    if (a.bang) {
      n.open = !0;
      a.bang.classList.remove("hidden");
      if (a.toast) {
        a.toast.classList.add("hidden");
      }
      L();
      var t = d();
      if (t && t.tmc) {
        t.tmc("xem");
        T(function () {
          if (n.open) {
            L();
          }
        });
      }
    }
  };
  var C = 0;
  function T(t) {
    var a = d();
    if (!(!a || !a.tmc || Date.now() - C < 15e3)) {
      C = Date.now();
      a.tmc("bang", function (a) {
        if (a && a.ok && a.bang) {
          n.bangTuan = a.bang;
          if (t) {
            t();
          }
        }
        else {
          C = 0;
        }
      });
    }
  }
  n.hide = function () {
    if (a.bang) {
      n.open = !1;
      a.bang.classList.add("hidden");
      o.key = "";
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
  var f = { NGHI: "Nghỉ", DANG_KY: "Sắp khai chiến", DANG_DAU: "Đang đấu", XONG: "Đã xong" };
  function y(t) {
    var n = a.bangThan && a.bangThan.querySelector(".tmc-dong-ho");
    if (n && l()) {
      var e = l().lich(t);
      var i = "NGHI" === e.giaiDoan ? e.moDangKyLuc : "DANG_KY" === e.giaiDoan ? e.batDauLuc : e.ketThucLuc;
      n.textContent = i - t >= 864e5 ? l().thuDoc(e.batDauLuc) + " " + l().gioDoc(e.batDauLuc) : s(i - t);
    }
  }
  function L() {
    var t = l();
    if (a.bangThan && t) {
      var e = h();
      var i = t.lich(e);
      var o = n.state && n.state.lich && n.state.lich.id === i.id ? n.state : null;
      var c = d();
      var r = c && c.sect;
      var s = r && r.phe;
      var b = a.bangThan;
      b.innerHTML = "";
      var v = g("header", "tmc-dau");
      var C = g("div", "tmc-dau-trai");
      C.appendChild(g("h2", null, "Tông Môn Chiến"));
      C.appendChild(g("small", null, t.ngayKhaiDoc() + " · " + t.gioDoc(i.batDauLuc) + "–" + t.gioDoc(i.ketThucLuc)));
      v.appendChild(C);
      var T = g("div", "tmc-dau-phai");
      T.appendChild(g("strong", "tmc-dong-ho", "--:--"));
      T.appendChild(g("span", "tmc-pha", f[i.giaiDoan] || i.giaiDoan));
      v.appendChild(T);
      b.appendChild(v);
      var L = g("div", "tmc-than");
      b.appendChild(L);
      var D = n.toastModel(i, o, r || null, e, u(), n.tran);
      var N = o && o.toi;
      var M = g("div", "tmc-toi");
      if (r) {
        if (N && N.daGhiDanh) {
          M.appendChild(g("b", "tmc-toi-ten", r.ten));
          M.appendChild(g("span", "tmc-chip", N.luot + "/" + t.LUOT_MOI_TONG + " lượt"));
          M.appendChild(g("span", "tmc-chip", N.diem + " điểm"));
          if (N.loai) {
            S("Không đủ " + t.TOI_THIEU_ONLINE + " người — không dự kỳ này.", "bao");
          }
          else {
            if (!(N.duocTinh)) {
              S("Vào tông chưa đủ 3 giờ — chỉ xem.", "bao");
            }
          }
        }
        else {
          if ("DANG_KY" === i.giaiDoan || "NGHI" === i.giaiDoan) {
            S("Tự vào lúc " + t.gioDoc(i.batDauLuc) + " · cần ≥ " + t.TOI_THIEU_ONLINE + " người online, vào tông ≥ 3 giờ.");
          }
          else {
            S("Tông không dự kỳ này.");
          }
        }
      }
      else {
        S("Chưa có tông môn.");
      }
      L.appendChild(M);
      var _ = n.loi && Date.now() - (n.loiLuc || 0) < 8e3 ? n.loi : "";
      if (_ && L.appendChild(g("p", "tmc-loi", _)), D && D.act && "bang" !== D.act) {
        var I = g("button", "tmc-nut chinh", D.btn);
        I.type = "button";
        I.addEventListener("click", function () {
          m(D.act);
        });
        L.appendChild(I);
      }
      if (o && o.caps && o.caps.length) {
        L.appendChild(g("h4", "tmc-h", "Đang đấu"));
        var G = g("div", "tmc-ds");
        o.caps.forEach(function (t) {
          var n = (t.ketQua || []).map(function (t) {
            return "hoa" === t ? "=" : "a" === t ? "◀" : "▶";
          }).join(" ");
          var a = g("div", "tmc-dong hai");
          a.appendChild(g("span", "tmc-dong-ten", t.a.ten + " — " + t.b.ten));
          a.appendChild(g("span", "tmc-dong-so", "T" + (t.so || 1) + (n ? " · " + n : "")));
          G.appendChild(a);
        });
        L.appendChild(G);
      }
      var H = o && o.tongs && o.tongs.length ? o.tongs : null;
      var O = !H && n.state && n.state.bangTruoc ? n.state.bangTruoc : null;
      if (H || O) {
        L.appendChild(g("h4", "tmc-h", H ? "Kỳ này" : "Kỳ trước · " + O.ngay));
        var w = g("div", "tmc-ds");
        (H || O.ds).forEach(function (n, a) {
          var e = g("div", "tmc-dong" + (r && n.id === r.id ? " minh" : ""));
          e.appendChild(g("span", "tmc-dong-hang", n.hang ? String(n.hang) : "–"));
          e.appendChild(g("span", "tmc-dong-ten", n.ten + (n.loai ? " ✕" : "")));
          e.appendChild(g("span", "tmc-dong-so", n.diem + " đ · " + n.thang + "T " + n.hoa + "H " + n.thua + "B" + (H ? " · " + n.luot + "/" + t.LUOT_MOI_TONG : "")));
          w.appendChild(e);
        });
        L.appendChild(w);
      }
      k(L, r);
      var E = g("details", "tmc-luat");
      E.appendChild(g("summary", null, "Luật"));
      var x = g("ul");
      [t.LUOT_MOI_TONG + " lượt mỗi tông, bốc ngẫu nhiên.", "Mỗi lượt 3 trận: " + t.tenTran(1, s) + " · " + t.tenTran(2, s) + " · hỗn chiến tối đa " + t.TOI_DA_HON_CHIEN + " đấu " + t.TOI_DA_HON_CHIEN + ".", "Mỗi người một mạng, " + t.TRAN_KEO_DAI / 1e3 + " giây một trận — hết giờ bên nhiều máu hơn thắng.", "Cấm trận pháp.", "Thắng lượt: quỹ tông +" + p(t.THUONG_LINH_THACH) + " Linh Thạch (hoà +" + p(t.THUONG_HOA) + ").", t.CHIEN_HUAN ? "Chiến Huân mỗi lượt: thắng +" + t.CHIEN_HUAN.thang + " · hoà +" + t.CHIEN_HUAN.hoa + " · thua +" + t.CHIEN_HUAN.thua + "." : ""].forEach(function (t) {
        if (t) {
          x.appendChild(g("li", null, t));
        }
      });
      E.appendChild(x);
      L.appendChild(E);
      var A = g("button", "tmc-nut dong", "Lui Bước");
      A.type = "button";
      A.addEventListener("click", function () {
        n.hide();
      });
      b.appendChild(A);
      y(e);
    }
    function S(t, n) {
      M.appendChild(g("p", "tmc-toi-dong" + (n ? " " + n : ""), t));
    }
  }
  function k(t, a) {
    var e = n.bangTuan;
    if (t.appendChild(g("h4", "tmc-h", e ? "Tuần " + String(e.tuan).replace(/^\d+-W0?/, "") : "Tuần")), e)
      if (e.ds.length) {
        var i = g("div", "tmc-ds");
        e.ds.slice(0, 20).forEach(function (t) {
          var n = g("div", "tmc-dong" + (a && t.id === a.id ? " minh" : ""));
          n.appendChild(g("span", "tmc-dong-hang", String(t.hang)));
          n.appendChild(g("span", "tmc-dong-ten", t.ten));
          n.appendChild(g("span", "tmc-dong-so", t.diem + " đ · " + t.thang + "T " + t.hoa + "H " + t.thua + "B"));
          i.appendChild(n);
        });
        t.appendChild(i);
        if (e.cuaToi && !e.ds.slice(0, 20).some(function (t) {
          return t.id === e.cuaToi.id;
        })) {
          t.appendChild(g("p", "tm-trong", "Tông mình: hạng " + e.cuaToi.hang + " · " + e.cuaToi.diem + " điểm"));
        }
      }
      else {
        t.appendChild(g("p", "tm-trong", "Chưa có trận."));
      }
    else {
      t.appendChild(g("p", "tm-trong", "Đang tải…"));
    }
  }
  n.veTabTongMon = function (t, a) {
    var e = l();
    if (e) {
      var i = h();
      var o = e.lich(i);
      t.appendChild(g("p", "tm-ngay", e.ngayKhaiDoc() + " · " + e.gioDoc(o.batDauLuc) + "–" + e.gioDoc(o.ketThucLuc) + " · " + ("NGHI" === o.giaiDoan ? "tới " + e.thuDoc(o.batDauLuc) : f[o.giaiDoan] || "")));
      var c = g("div");
      k(c, a);
      t.appendChild(c);
      var d = g("button", "tm-nut chinh", "Mở bảng");
      d.type = "button";
      d.addEventListener("click", function () {
        n.show();
      });
      t.appendChild(d);
      T(function () {
        c.innerHTML = "";
        k(c, a);
      });
    }
  };
}(window.PNTT);
