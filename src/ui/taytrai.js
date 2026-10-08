!function (t) {
  "use strict";
  var n = t.Utils;
  var e = t.TayTrai = { mo: !1 };
  var o = {};
  var a = { co: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3v18" stroke-width="2.2"/><path class="tt-vai" d="M7 4h11l-3 4 3 4H7z"/></svg>', dosat: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4l10 10M14 14l2 4 2-2-4-2" stroke-width="2"/><path d="M20 4L10 14M10 14l-2 4-2-2 4-2" stroke-width="2"/></svg>', thoat: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4H6v16h8" stroke-width="2"/><path d="M11 12h9M17 8l4 4-4 4" stroke-width="2"/></svg>' };
  function i(n, e, o, a) {
    t.HUD.openMateMenu(n, e, [{ label: o, onChoose: a }, { label: "Huỷ", onChoose: function () {
        } }], null);
  }
  function c(n) {
    if (t.HUD && t.HUD.toast) {
      t.HUD.toast(n);
    }
    else {
      if (t.HUD && t.HUD.setCaption) {
        t.HUD.setCaption(n);
      }
    }
  }
  function d(n) {
    var o = t.Gateway;
    o.cmd("coChien", { mau: n }, function (t) {
      if (t && t.ok) {
        o.coChien = t.co || "";
        if (t.toast) {
          c(t.toast);
        }
        e.ve();
      }
      else {
        c(t && t.why || "Không đổi được cờ.");
      }
    });
  }
  function u(n, a) {
    var i = o.keThuDs;
    if (i.textContent = "", !n || !n.length) {
      var c = document.createElement("li");
      c.className = "tt-kt-trong";
      c.textContent = a || "Chưa có ai";
      return void i.appendChild(c);
    }
    n.forEach(function (n) {
      var o = document.createElement("li");
      var a = document.createElement("button");
      a.type = "button";
      a.className = "tt-kt-dong";
      a.title = n.ten + (n.on ? " · đang trong game" : " · không trong game");
      var c = document.createElement("span");
      c.className = "tt-kt-cham " + (n.on ? "on" : "off");
      var d = document.createElement("span");
      d.className = "tt-kt-chu";
      var h = document.createElement("span");
      h.className = "tt-kt-ten";
      h.textContent = n.ten;
      var l = document.createElement("span");
      l.className = "tt-kt-cap";
      l.textContent = n.canhGioi || "";
      d.appendChild(h);
      d.appendChild(l);
      a.appendChild(c);
      a.appendChild(d);
      a.addEventListener("click", function () {
        e.dong();
        t.HUD.openMateMenu(n.ten, (n.canhGioi ? n.canhGioi + " · " : "") + (n.on ? "Đang trong game" : "Không trong game"), [{ label: "Xoá khỏi sổ", onChoose: function () {
              t.Gateway.cmd("keThu", { xoa: n.id }, function (t) {
                if (t && t.ok) {
                  u(t.ds || []);
                }
              });
            } }, { label: "Đóng", onChoose: function () {
            } }], null);
      });
      o.appendChild(a);
      i.appendChild(o);
    });
  }
  var h = [{ id: "co", ten: "Chọn cờ", lam: function () {
        var n = t.Gateway;
        var e = t.CoChien;
        if (e && n)
          if (n.connected && n.ready)
            if (n.vanTieu) {
              c("Đang áp tải, chưa đổi cờ được.");
            }
            else if (n.coDenBuoc) {
              var o = t.LuyenQuy;
              c("Sát Nghiệp còn nặng — dưới " + (o ? o.MOC_THA_CO : 80) + " mới tháo được cờ đen. Cúng ở Miếu Ông Trường Con hoặc uống Tẩy Tâm Đan.");
            }
            else {
              var a = n.coChien || "";
              var i = [{ label: "Tháo cờ", on: !a, disabled: !a, onChoose: function () {
                    d("");
                  } }];
              e.MAU.forEach(function (t) {
                i.push({ label: t.ten + (t.id === a ? " · đang đeo" : ""), mau: t.mau, vien: t.vien, on: t.id === a, disabled: t.id === a, note: "den" === t.id ? "Đánh được mọi người đang đeo cờ" : "Đánh người khác màu, cùng màu là đồng minh", onChoose: function () {
                    d(t.id);
                  } });
              });
              t.HUD.openMateMenu("Chọn cờ", "Chỉ người cùng cắm cờ mới đánh được nhau", i, null);
            }
          else {
            c("Cờ chiến cần nối được máy chủ.");
          }
      } }, { id: "dosat", ten: "Đồ sát", lam: function () {
        var n = t.Gateway;
        if (n && n.doSatCheck) {
          var e = n.doSatCheck();
          if (e.ok) {
            i("Đồ Sát?", "Mất " + e.cost + " Đạo Hạnh, không hoàn lại", "Xác nhận đồ sát", function () {
              n.doSatPress();
            });
          }
          else {
            c(e.why);
          }
        }
      } }, { id: "thoat", ten: "Đăng xuất", lam: function () {
        i("Đăng xuất?", t.Auth && t.Auth.isGuest && t.Auth.isGuest() ? "Tài khoản khách: ghi nhớ tên để vào lại" : "Về màn hình đăng nhập", "Đăng xuất", function () {
          var t = n.$("#menu-logout");
          if (t) {
            t.click();
          }
        });
      } }];
  e.init = function () {
    if (o.root = n.$("#tay-trai"), !o.root || o.cot) {
      return e;
    }
    o.cot = n.$("#tt-cot");
    o.mo = n.$("#tt-mo");
    h.forEach(function (t) {
      var n = document.createElement("button");
      n.type = "button";
      n.className = "tt-nut";
      n.dataset.viec = t.id;
      var i = document.createElement("span");
      i.className = "tt-tron";
      i.innerHTML = a[t.id] || "";
      var c = document.createElement("span");
      c.className = "tt-ten";
      c.textContent = t.ten;
      n.appendChild(i);
      n.appendChild(c);
      n.addEventListener("click", function () {
        e.dong();
        t.lam();
      });
      o.cot.appendChild(n);
      if ("co" === t.id) {
        o.nutCo = n;
      }
    });
    o.keThu = document.createElement("section");
    o.keThu.className = "tt-kethu";
    var t = document.createElement("h3");
    t.textContent = "Kẻ thù";
    o.keThuDs = document.createElement("ul");
    o.keThu.appendChild(t);
    o.keThu.appendChild(o.keThuDs);
    o.cot.appendChild(o.keThu);
    u([]);
    o.mo.addEventListener("click", function () {
      if (e.mo) {
        e.dong();
      }
      else {
        e.moRa();
      }
    });
    document.addEventListener("pointerdown", function (t) {
      if (e.mo && o.root && !o.root.contains(t.target)) {
        e.dong();
      }
    }, !0);
    e.ve();
    return e;
  };
  e.moRa = function () {
    var n;
    if (o.root) {
      e.mo = !0;
      o.root.classList.add("mo");
      document.body.classList.add("tay-trai-mo");
      o.mo.setAttribute("aria-expanded", "true");
      o.mo.setAttribute("aria-label", "Thu cột lệnh");
      e.ve();
      n = t.Gateway;
      if (o.keThu) {
        if (n && n.connected && n.ready) {
          n.cmd("keThu", {}, function (t) {
            if (t && t.ok) {
              u(t.ds || []);
            }
            else {
              u(null, "Chưa tải được");
            }
          });
        }
        else {
          u(null, "Cần nối máy chủ");
        }
      }
    }
  };
  e.dong = function () {
    if (o.root && e.mo) {
      e.mo = !1;
      o.root.classList.remove("mo");
      document.body.classList.remove("tay-trai-mo");
      o.mo.setAttribute("aria-expanded", "false");
      o.mo.setAttribute("aria-label", "Mở cột lệnh");
    }
  };
  e.ve = function () {
    if (o.nutCo) {
      var n = t.CoChien && t.CoChien.def(t.Gateway && t.Gateway.coChien);
      var e = o.nutCo.querySelector(".tt-vai");
      if (e) {
        e.style.fill = n ? n.mau : "none";
      }
      o.nutCo.title = n ? "Đang đeo cờ " + n.ten : "Chưa đeo cờ";
    }
  };
  if ("loading" === document.readyState) {
    document.addEventListener("DOMContentLoaded", e.init);
  }
  else {
    e.init();
  }
}(window.PNTT);
