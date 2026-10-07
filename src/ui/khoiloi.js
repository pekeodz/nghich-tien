!function (a) {
  "use strict";
  var i = a.KhoiLoiUI = {};
  var n = null;
  var t = !1;
  var o = "";
  function r() {
    return a.KhoiLoi;
  }
  function e() {
    return a.SceneWorld && a.SceneWorld.player;
  }
  function u(i) {
    if (a.HUD && a.HUD.setCaption) {
      a.HUD.setCaption(i);
    }
  }
  i.dangRaDs = function () {
    var i = a.Gateway;
    var n = [];
    var t = r();
    if (!(i && i.khoiLoiBay && i.selfId && t)) {
      return n;
    }
    for (var o = 0; o < i.khoiLoiBay.length; o++) {
      var e = i.khoiLoiBay[o];
      if (e.o === i.selfId) {
        var u = t.DEFS[e.k];
        if (u) {
          n.push(u.id);
        }
      }
    }
    return n;
  };
  i.dangRa = function (a) {
    return i.dangRaDs().indexOf(a) >= 0;
  };
  i.dat = function (t) {
    if (t) {
      n = t;
      var u = e();
      if (u && "number" == typeof t.sp) {
        u.sp = Math.max(0, Math.min(u.spMax || t.sp, t.sp));
      }
      var d = r();
      if (d && a.KhoiLoiFX && a.Inventory) {
        d.DEFS.forEach(function (i) {
          if (a.Inventory.count(i.id) > 0) {
            a.KhoiLoiFX.prime(i.ky);
          }
        });
      }
      o = "";
      i.veLai();
    }
  };
  i.trangThai = function () {
    var a = r();
    return { sp: n ? n.sp : null, ra: i.dangRaDs(), tran: a ? a.TRAN : 2, cam: n ? n.cam : null };
  };
  i.veLai = function () {
    var n = i.dangRaDs().join(",");
    if (n !== o) {
      o = n;
      if (a.QuickSlots && a.QuickSlots.update) {
        a.QuickSlots.update(e());
      }
    }
  };
  i.batTat = function (n, o) {
    var d = r();
    if (d && d.byId(n))
      if (a.Gateway && a.Gateway.connected && a.Gateway.ready) {
        if (!t) {
          var c = i.dangRa(n);
          if (!c) {
            var s = e();
            var f = d.xetGoi(a, n, i.dangRaDs(), s ? s.sp : 0);
            if (f) {
              u(f + ".");
              if (a.Audio) {
                a.Audio.play("deny");
              }
              return void (o && o({ ok: !1, why: f }));
            }
          }
          t = !0;
          a.Gateway.cmd(c ? "khoiloi.thu" : "khoiloi.goi", { id: n }, function (n) {
            t = !1;
            if (n && n.kl) {
              i.dat(n.kl);
            }
            if (n && !1 === n.ok) {
              u((n.why || "Không được") + ".");
            }
            else {
              if (n && n.toast) {
                u(n.toast);
              }
            }
            if (a.HUD && a.HUD.renderBag) {
              a.HUD.renderBag();
            }
            if (a.QuickSlots && a.QuickSlots.update) {
              a.QuickSlots.update(e());
            }
            if (o) {
              o(n);
            }
          });
        }
      }
      else {
        u("Phải nối máy chủ mới gọi được khôi lỗi.");
      }
  };
  i.nhanNut = function (a) {
    var n = r() && r().byId(a);
    return n ? i.dangRa(a) ? "Thu Hồi" : "Triệu Hồi · " + n.sp + " Thần Thức" : "";
  };
}(window.PNTT);
