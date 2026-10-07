!function (n) {
  "use strict";
  var a = n.HonPhienUI = {};
  var h = null;
  var i = !1;
  var d = null;
  function e() {
    return n.LuyenQuy;
  }
  function t() {
    return !!(n.Gateway && n.Gateway.connected && n.Gateway.ready);
  }
  function p() {
    return n.ChinhDao;
  }
  function o() {
    var a = n.Gateway;
    if (!a || !a.honBay || !a.selfId) {
      return 0;
    }
    for (var h = 0, i = 0; i < a.honBay.length; i++)
      a.honBay[i].o === a.selfId && h++;
    return h;
  }
  function c(n, a, h) {
    var i = document.createElement(n);
    if (a) {
      i.className = a;
    }
    if (null != h) {
      i.textContent = h;
    }
    return i;
  }
  function l() {
    return h || ((h = c("div", "hp-lop")).addEventListener("click", function (n) {
      if (n.target === h) {
        a.dong();
      }
    }), document.body.appendChild(h), h);
  }
  function r(n, a, h) {
    var i = c("div", "hp-so");
    var d = c("div", "hp-so-n", String(a));
    if (h) {
      d.style.color = h;
    }
    i.appendChild(d);
    i.appendChild(c("div", "hp-so-l", n));
    return i;
  }
  function u(n, a, h, i, d) {
    var e = c("button", "hp-nut" + (h ? " tat" : ""));
    e.appendChild(c("span", "hp-nut-t", n));
    e.appendChild(c("span", "hp-nut-p", h ? i : a));
    e.disabled = !!h;
    if (!(h)) {
      e.addEventListener("click", d);
    }
    return e;
  }
  function v() {
    var h = e();
    var i = a.trangThai();
    var d = l();
    d.innerHTML = "";
    var o = c("div", "hp-hop");
    if (d.appendChild(o), "chinh" === i.dao && p()) {
      !function (h, i) {
        var d = p();
        var o = e();
        h.classList.add("hp-chinh");
        var l = c("div", "hp-dau");
        l.appendChild(c("h3", null, "Tụ Linh Kiếm Hạp"));
        var v = c("button", "hp-x", "×");
        v.addEventListener("click", a.dong);
        l.appendChild(v);
        h.appendChild(l);
        var y = 0 | i.dang;
        var C = 0 | i.kl;
        var f = 0 | i.tranKl;
        var H = c("div", "hp-hang");
        H.appendChild(r("Trong hạp", C + "/" + f));
        H.appendChild(r("Đang gọi", y));
        H.appendChild(r("Sát Nghiệp", i.nghiep, i.nghiep > 0 ? "#d8553f" : "#9fd7a0"));
        h.appendChild(H);
        if (i.nghiep > 0) {
          h.appendChild(c("div", "hp-mo", "Còn Sát Nghiệp — Kiếm Linh không nghe gọi."));
        }
        var s = C + y + 1;
        var L = s > f;
        h.appendChild(c("div", "hp-de", L ? "Luyện Kiếm Linh — đủ " + f + "/" + f : "Luyện Kiếm Linh thứ " + s + "/" + f));
        var _ = c("div", "hp-ds");
        if (L) {
          _.appendChild(c("div", "hp-mo", "Đã đủ " + f + " Kiếm Linh."));
        }
        else {
          var T = d.congThucCon(s);
          var I = null;
          var N = c("div", "hp-nl");
          T.forEach(function (n) {
            var a = m(i, n.id);
            var h = a >= n.can;
            if (!(h || I)) {
              I = "Thiếu " + (n.can - a) + " " + n.ten;
            }
            var d = c("div", "hp-nl-d" + (h ? " du" : ""));
            d.appendChild(c("span", null, n.ten));
            d.appendChild(c("b", null, a + " / " + n.can));
            N.appendChild(d);
          });
          _.appendChild(N);
          _.appendChild(u("Luyện thanh thứ " + s, "đủ nguyên liệu", !!I, I, function () {
            g("hon.luyen", { congThuc: "tiep" });
          }));
        }
        h.appendChild(_);
        h.appendChild(c("div", "hp-de", "Kiếm Linh"));
        var M = c("div", "hp-ds");
        var P = n.SceneWorld && n.SceneWorld.player ? n.SceneWorld.player.mp : 0;
        var O = t() ? i.nghiep > 0 ? "Còn Sát Nghiệp" : C <= 0 ? "Hạp trống" : y >= f ? "Đã đủ" : P < o.MP_GOI ? "Thiếu Linh Lực" : null : "Phải nối máy chủ";
        M.appendChild(u("Gọi một thanh", o.MP_GOI + " Linh Lực", !!O, O, function () {
          g("hon.goi", {});
        }));
        M.appendChild(u("Thu về hạp", y + " thanh đang bay", y <= 0, "Chưa gọi thanh nào", function () {
          g("hon.thu", {});
        }));
        h.appendChild(M);
        h.appendChild(c("div", "hp-mo hp-chan", "Kiếm hao " + o.MP_NUOI + " Linh Lực mỗi giây. Hạ Ma tu hay kẻ đồ sát được Trừ Ma Lệnh."));
      }(o, i);
    }
    else {
      var v = c("div", "hp-dau");
      v.appendChild(c("h3", null, "Hồn Phiên"));
      var y = c("button", "hp-x", "×");
      if (y.addEventListener("click", a.dong), v.appendChild(y), o.appendChild(v), !i.phien) {
        var C = c("div", "hp-trong");
        C.appendChild(c("p", null, "Chưa có Hồn Phiên."));
        C.appendChild(c("p", "hp-mo", "Thỉnh ở Sứ Giả Ma Đạo — tầng Ma Động, Tam Giới Thành."));
        return void o.appendChild(C);
      }
      var f = function (n) {
        var a;
        var h = e();
        a = "tam_ma";
        return (!h.mocBat || h.mocBat(a)) && n.nghiep >= n.moc.tamMa ? h.BAC[2] : n.nghiep >= n.moc.tenDo ? h.BAC[1] : h.BAC[0];
      }(i);
      var H = c("div", "hp-hang");
      H.appendChild(r("Trong phiên", i.am + "/" + i.tran));
      H.appendChild(r("Đang gọi", i.dang));
      H.appendChild(r("Sát Nghiệp", i.nghiep, f.mau));
      o.appendChild(H);
      var s = c("div", "hp-nghiep");
      var L = c("div", "hp-nghiep-day");
      var _ = c("div", "hp-nghiep-cham");
      _.style.width = Math.min(100, i.nghiep / Math.max(1, i.moc.phanPhe) * 100) + "%";
      _.style.background = f.mau;
      L.appendChild(_);
      var T = e();
      [i.moc.tenDo].concat(T.mocBat && !T.mocBat("tam_ma") ? [] : [i.moc.tamMa]).forEach(function (n) {
        var a = c("i", "hp-vach");
        a.style.left = n / Math.max(1, i.moc.phanPhe) * 100 + "%";
        L.appendChild(a);
      });
      s.appendChild(L);
      s.appendChild(c("div", "hp-mo", f.ten));
      o.appendChild(s);
      var I = i.am + (0 | i.dang) + 1;
      L = I > i.tran;
      o.appendChild(c("div", "hp-de", L ? "Luyện Âm Hồn — đủ " + i.tran + "/" + i.tran : "Luyện Âm Hồn thứ " + I + "/" + i.tran));
      var N = c("div", "hp-ds");
      if (L) {
        N.appendChild(c("div", "hp-mo", "Bầy đã đủ " + i.tran + " con — không luyện thêm được."));
      }
      else {
        var M = h.congThucCon(I);
        var P = null;
        var O = c("div", "hp-nl");
        M.forEach(function (n) {
          var a = m(i, n.id);
          var h = a >= n.can;
          if (!(h || P)) {
            P = "Thiếu " + (n.can - a) + " " + n.ten;
          }
          var d = c("div", "hp-nl-d" + (h ? " du" : ""));
          d.appendChild(c("span", null, n.ten));
          d.appendChild(c("b", null, a + " / " + n.can));
          O.appendChild(d);
        });
        N.appendChild(O);
        N.appendChild(u("Luyện con thứ " + I, "đủ nguyên liệu", !!P, P, function () {
          g("hon.luyen", { congThuc: "tiep" });
        }));
      }
      o.appendChild(N);
      o.appendChild(c("div", "hp-de", "Bầy quỷ"));
      var S = c("div", "hp-ds");
      var U = n.SceneWorld && n.SceneWorld.player ? n.SceneWorld.player.mp : 0;
      var B = t() ? i.am <= 0 ? "Phiên trống" : (0 | i.dang) >= i.tran ? "Bầy đã đủ" : U < h.MP_GOI ? "Thiếu Linh Lực" : null : "Phải nối máy chủ";
      S.appendChild(u("Gọi một con", h.MP_GOI + " Linh Lực", !!B, B, function () {
        g("hon.goi", {});
      }));
      S.appendChild(u("Thu cả bầy", i.dang + " con đang đứng", i.dang <= 0, "Chưa gọi con nào", function () {
        g("hon.thu", {});
      }));
      o.appendChild(S);
      o.appendChild(c("div", "hp-mo hp-chan", "Quỷ hao " + h.MP_NUOI + " Linh Lực mỗi giây. Cạn khí, bị đánh tan hay gục thì quỷ tự về phiên."));
    }
  }
  function m(a, h) {
    var i = e();
    var d = p();
    return d && h === d.CHINH_KHI ? 0 | a.ck : d && h === d.HIEP_NGHIA ? 0 | a.hn : d && h === d.TRU_MA ? 0 | a.tm : h === i.PHAM_HON ? 0 | a.pham : h === i.OAN_HON ? 0 | a.oan : h === i.TU_SI_HON ? 0 | a.tuSi : h === i.THU_HON_3 ? 0 | a.thu3 : h === i.THU_HON_4 ? 0 | a.thu4 : h === i.THU_HON_6 ? 0 | a.thu6 : n.Inventory.count(h);
  }
  function g(h, i) {
    if (t()) {
      n.Gateway.cmd(h, i, function (h) {
        if (h && h.hon) {
          a.dat(h.hon);
        }
        if (h && !h.ok) {
          y(h.why || "không được");
        }
        else {
          if (h && h.toast) {
            y(h.toast);
          }
        }
        if (n.HUD && n.HUD.renderBag) {
          n.HUD.renderBag();
        }
      });
    }
    else {
      var o;
      var c = e();
      var l = p() && "chinh" === p().dao(n);
      if ("hon.luyen" === h) {
        return (o = l ? p().luyen(n) : c.luyen(i.congThuc, n)).ok ? (d = null, v(), n.HUD && n.HUD.renderBag && n.HUD.renderBag(), void y(l ? "Luyện thành một Kiếm Linh" : "Luyện thành một Âm Hồn")) : void y(o.why);
      }
      y(l ? "Phải nối máy chủ mới gọi được Kiếm Linh" : "Phải nối máy chủ mới gọi được quỷ");
    }
  }
  function y(a) {
    if (a) {
      var h = n.SceneWorld && n.SceneWorld.player;
      if (h && n.VFX) {
        n.VFX.spawnText(h.x, h.y - 52, a, "#c9a45c");
      }
    }
  }
  a.trangThai = function () {
    var a;
    var h = d || { phien: (a = e()).coPhien(n) ? 1 : 0, am: n.Inventory.count(a.AM_HON), dang: 0, tran: a.tranAmHon(n), pham: n.Inventory.count(a.PHAM_HON), oan: n.Inventory.count(a.OAN_HON), tuSi: n.Inventory.count(a.TU_SI_HON), thu3: n.Inventory.count(a.THU_HON_3), thu4: n.Inventory.count(a.THU_HON_4), thu6: n.Inventory.count(a.THU_HON_6), nghiep: a.satNghiep(n), moc: { tenDo: a.moc("ten_do", n), tamMa: a.moc("tam_ma", n), phanPhe: a.moc("thanh", n) }, maDao: a.laMaDao(n) ? 1 : 0, dao: p() ? p().dao(n) : a.coPhien(n) ? "ma" : "", hap: p() && p().coHap(n) ? 1 : 0, kl: p() ? n.Inventory.count(p().KIEM_LINH) : 0, tranKl: p() ? p().tran(n) : 0, ck: p() ? n.Inventory.count(p().CHINH_KHI) : 0, hn: p() ? n.Inventory.count(p().HIEP_NGHIA) : 0, tm: p() ? n.Inventory.count(p().TRU_MA) : 0 };
    if (t()) {
      h = Object.assign({}, h, { dang: o() });
    }
    return h;
  };
  a.dat = function (a) {
    if (a) {
      d = a;
      var h = n.SceneWorld && n.SceneWorld.player;
      if (h && "number" == typeof a.mp) {
        h.mp = Math.max(0, Math.min(h.mpMax, a.mp));
      }
      if (i) {
        v();
      }
    }
  };
  a.mo = function () {
    if (n.LuyenQuy) {
      i = !0;
      l().style.display = "flex";
      v();
    }
  };
  a.dong = function () {
    i = !1;
    if (h) {
      h.style.display = "none";
    }
  };
  a.dangMo = function () {
    return i;
  };
  a.veLai = function () {
    if (i) {
      v();
    }
  };
}(window.PNTT);
