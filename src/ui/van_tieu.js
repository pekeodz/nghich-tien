!function (n) {
  "use strict";
  var e = n.VanTieuUI = { chuyen: null, cao: 0 };
  var a = null;
  var t = {};
  var o = 0;
  var u = -1;
  function i() {
    return "undefined" != typeof document && !!document && !!document.body;
  }
  function c() {
    return n.VanTieu;
  }
  function h() {
    return !!(n.SceneWorld && n.SceneWorld.online && n.SceneWorld.online());
  }
  function r(e) {
    if (n.HUD && n.HUD.toast) {
      n.HUD.toast(e);
    }
    else {
      if (n.HUD && n.HUD.setCaption) {
        n.HUD.setCaption(e);
      }
    }
  }
  function l(n) {
    var a = e.chuyen;
    return a ? Math.max(0, (0 | n) - (Date.now() - a.nhanLuc)) : 0;
  }
  function d() {
    if (i() && document.documentElement) {
      var a = e.cao + (n.TranMachUI && n.TranMachUI.cao || 0);
      if (a !== u) {
        u = a;
        if (a > 0) {
          document.documentElement.style.setProperty("--yl-hud-h", a + "px");
        }
        else {
          document.documentElement.style.removeProperty("--yl-hud-h");
        }
      }
    }
  }
  function g(e) {
    return n.VanTieu ? n.VanTieu.giayDoc(e) : "";
  }
  function y() {
    if ((a || e.chuyen) && (!a && i() && ((a = document.createElement("aside")).id = "van-tieu-hud", a.hidden = !0, a.setAttribute("aria-label", "Vận Tiêu"), a.innerHTML = '<header><b class="vt-hang"></b><span class="vt-han"></span></header><div class="vt-mau"><i></i></div><div class="vt-dong"></div>', (document.getElementById && document.getElementById("hud-right") || document.body).appendChild(a), t.hang = a.querySelector(".vt-hang"), t.han = a.querySelector(".vt-han"), t.mau = a.querySelector(".vt-mau i"), t.dong = a.querySelector(".vt-dong")), a)) {
      var o = e.chuyen;
      var u = c();
      if (a.hidden = !o, !o || !u) {
        e.cao = 0;
        return void d();
      }
      var h = u.hang(o.hang);
      t.hang.textContent = u.tenHang(o.hang);
      t.hang.style.color = h ? h.mau : "";
      t.han.textContent = g(l(o.han));
      var r = function () {
        var e = n.SceneWorld && n.SceneWorld.enemies;
        var a = n.SceneWorld && n.SceneWorld.player;
        if (!e || !a) {
          return null;
        }
        for (var t = null, o = 1 / 0, u = 0; u < e.length; u++) {
          var i = e[u];
          if (i && !i.dead && i.def && i.def.tieuXa) {
            var c = Math.abs(i.x - a.x) + Math.abs(i.y - a.y);
            if (c < o) {
              o = c;
              t = i;
            }
          }
        }
        return t;
      }();
      var y = r && r.hpMax ? r.hp / r.hpMax : o.hp / o.hm;
      t.mau.style.width = Math.max(0, Math.min(100, Math.round(100 * y))) + "%";
      var s = o.dung ? l(o.dung) : 0;
      a.classList.toggle("dung", !!o.dung);
      t.dong.textContent = o.dung ? "Xe tụt lại · còn " + g(s) : "Cờ đỏ · kéo tới Bảnh Tiên Sinh";
      e.cao = a.offsetHeight + 6;
      d();
    }
  }
  function s() {
    return { label: "Bỏ Hàng", note: "Mất phí, xe tan", onChoose: p };
  }
  function T(e, a) {
    var t = n.Gateway;
    if (t && t.cmd) {
      t.cmd(e, {}, function (e) {
        if (!e || !e.ok) {
          if (n.Audio) {
            n.Audio.play("deny");
          }
          return void r(e && e.why || "Máy chủ không nhận.");
        }
        if (a) {
          a(e);
        }
        if (e.toast) {
          r(e.toast);
        }
        if (n.HUD && n.HUD.refreshBag) {
          n.HUD.refreshBag();
        }
      });
    }
  }
  function f() {
    T("vantieu.nhan", function () {
      if (n.Audio) {
        n.Audio.play("coin");
      }
    });
  }
  function v() {
    T("vantieu.giao", function () {
      if (n.Audio) {
        n.Audio.play("coin");
      }
    });
  }
  function p() {
    T("vantieu.bo");
  }
  e.nhan = function (a) {
    var t = n.Gateway;
    var u = n.SceneWorld && n.SceneWorld.player;
    if (a) {
      if ("bat" === a.act || "st" === a.act) {
        var h = !e.chuyen;
        e.chuyen = { hang: a.hang, heSo: +a.heSo || 0, han: 0 | a.han, hp: +a.hp || 0, hm: +a.hm || 1, dung: 0 | a.dung, nhanLuc: Date.now() };
        if (t) {
          t.vanTieu = e.chuyen;
          t.coChien = a.co || "do";
        }
        if (u) {
          u.tieuXa = e.chuyen.heSo;
          u.flying = !1;
        }
        if (n.TayTrai && n.TayTrai.ve) {
          n.TayTrai.ve();
        }
        if ("bat" === a.act && n.SceneWorld && n.SceneWorld.autoOn && n.Input && n.Input.pressAutoToggle) {
          n.Input.pressAutoToggle();
        }
        if (h && "bat" === a.act) {
          r((c() && c().tenHang(a.hang)) + " — kéo xe tới Bảnh Tiên Sinh, Thành Thăng Long.");
        }
        if (!o && i()) {
          o = setInterval(function () {
            if (!e.chuyen) {
              clearInterval(o);
              return void (o = 0);
            }
            y();
          }, 500);
        }
        return void y();
      }
      if ("het" === a.act) {
        e.chuyen = null;
        if (t) {
          t.vanTieu = null;
          t.coChien = a.co || "";
        }
        if (u) {
          u.tieuXa = 0;
        }
        if (n.TayTrai && n.TayTrai.ve) {
          n.TayTrai.ve();
        }
        if ("giao" === a.ly && a.thuong) {
          r("Giao hàng xong · +" + a.thuong + " Linh Thạch");
        }
        y();
      }
    }
  };
  e.reset = function () {
    e.chuyen = null;
    if (n.Gateway) {
      n.Gateway.vanTieu = null;
    }
    var a = n.SceneWorld && n.SceneWorld.player;
    if (a) {
      a.tieuXa = 0;
    }
    y();
  };
  e.cuopDuoc = function () {
    var a = c();
    var t = n.Gateway;
    var o = n.TileMap && n.TileMap.data;
    return !!(a && t && o && h()) && !e.chuyen && !a.camCuop(o.id) && a.checkCuop({ R: n, flags: n.Quest && n.Quest.flags, coChien: t.coChien || "", chinhChu: !1, cungToi: !1 }).ok;
  };
  e.chiaCho = d;
  e.moLyThanh = function (a, t) {
    var o = c();
    if (!o || !h() || !e.chuyen && !o.daTrucCo(n)) {
      return !1;
    }
    var u = a.name || "Huấn Sư Huynh";
    var i = { label: "Nói Chuyện", onChoose: t };
    if (e.chuyen) {
      n.HUD.openDialog(u, "Hàng còn trên đường. Kéo xe tới Bảnh Tiên Sinh ở Thành Thăng Long.", { choices: [s(), i] });
      return !0;
    }
    var r = n.Quest && n.Quest.flags;
    var l = o.checkNhan({ R: n, flags: r, stones: n.Progress && n.Progress.stones, daCoTieu: !1, downed: !1, dangBay: !(!n.SceneWorld.player || !n.SceneWorld.player.flying), coDenBuoc: !(!n.Gateway || !n.Gateway.coDenBuoc), giaoThuc: n.Gateway && n.Gateway.PROTOCOL, now: Date.now() });
    n.HUD.openDialog(u, '"Có chuyến hàng gửi Bảnh Tiên Sinh ở Thành Thăng Long. Đạo hữu kéo giúp ta nhé — chỉ đi bộ, cờ đỏ bật suốt đường, kẻ cướp rình sẵn."', { choices: [{ label: "Nhận Tiêu", note: l.ok ? o.PHI + " Linh Thạch · còn " + o.conLuotVan(r, Date.now()) + "/" + o.LUOT_VAN + " lượt" : l.why, disabled: !l.ok, onChoose: f }, i] });
    return !0;
  };
  e.moBanh = function (a, t) {
    var o = c();
    if (!o || !h() || !e.chuyen && !o.daTrucCo(n)) {
      return !1;
    }
    var u = a.name || "Bảnh Tiên Sinh";
    var i = { label: "Nghe Ông Nói", onChoose: t };
    return e.chuyen ? (n.HUD.openDialog(u, 'Ông liếc chiếc xe, gật đầu:\n\n"Để xe đó. Đủ hàng thì có thưởng."', { choices: [{ label: "Giao Hàng", note: "Đứng cạnh ông, xe sát bên", onChoose: v }, s(), i] }), !0) : (n.HUD.openDialog(u, '"Hàng của Huấn Sư Huynh ở Rừng Trúc? Kéo tới đây thì ta trả. Cướp được của người ta rồi mang tới cũng được."', { choices: [i] }), !0);
  };
}(window.PNTT);
