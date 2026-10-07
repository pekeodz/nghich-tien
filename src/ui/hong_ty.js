!function (t) {
  "use strict";
  var e = t.HongTyUI = {};
  e._muc = "com";
  var n = [{ id: "com", ten: "Cơm" }, { id: "phu", ten: "Phù Chú" }, { id: "y", ten: "Y Phục" }];
  function i(t, e, n) {
    var i = document.createElement(t);
    if (e) {
      i.className = e;
    }
    if (null != n) {
      i.textContent = n;
    }
    return i;
  }
  function a(e, n) {
    var i = document.createElement("canvas");
    i.width = i.height = n;
    if (e && t.drawItemIcon) {
      t.drawItemIcon(i.getContext("2d"), e, 0, 0, n);
    }
    if (e && t.sharpenItemIcon) {
      t.sharpenItemIcon(i, e);
    }
    return i;
  }
  function o(e) {
    return "grade-" + (t.Loot ? t.Loot.gradeKey(e && e.grade) : "common");
  }
  function r() {
    return t.Progress ? 0 | t.Progress.stones : 0;
  }
  e.outfits = function () {
    return Object.keys(t.ITEMS || {}).map(function (e) {
      return t.ITEMS[e];
    }).filter(function (t) {
      return t && "ao" === t.slot && t.outfitArt && t.requireRealm && "quan_dui" !== t.id;
    }).sort(function (t, e) {
      return ("female" === t.requireGender ? 0 : 1) - ("female" === e.requireGender ? 0 : 1);
    });
  };
  var d = [0, 2, 3, 1];
  var c = null;
  function u(e, n, i) {
    var a = Object.assign({}, c && c() || t.DEFAULT_CHARACTER || {});
    if (n) {
      a.outfit = n.outfitArt;
      if (n.requireGender && n.requireGender !== a.gender) {
        a.gender = n.requireGender;
        a.hair = "female" === n.requireGender ? "tien_tu" : "dao_ke";
        a.beard = "none";
      }
    }
    var o = e.getContext("2d");
    o.clearRect(0, 0, e.width, e.height);
    o.imageSmoothingEnabled = !1;
    try {
      var r = t.SpriteFactory.get(a);
      t.SpriteFactory.drawFrame(o, r, d[i % 4], 6, 8, -8, 3, a);
    }
    catch (t) {
    }
  }
  e.open = function (d, l) {
    c = l.cfg || null;
    var s = l.chiMuc ? n.filter(function (t) {
      return l.chiMuc.indexOf(t.id) >= 0;
    }) : n;
    if (!(s.some(function (t) {
      return t.id === e._muc;
    }))) {
      e._muc = s[0].id;
    }
    t.HUD.openDialog(d && d.name || "Hồng Tỷ", "Chọn một món để xem và mua.", { content: function (n, d) {
        n.classList.add("forge-box");
        var c = i("div", "bag-filters forge-tabs hongty-tabs");
        c.setAttribute("role", "tablist");
        var h = i("div", "bag-list forge-grid");
        h.setAttribute("role", "list");
        var p = i("div", "hongty-stones");
        function f() {
          h.innerHTML = "";
          p.textContent = "Linh Thạch: " + r();
          (function (n) {
            if ("com" === n) {
              var i = t.Food;
              return i.SHOP.map(function (e) {
                var n = t.ITEMS[e.id];
                var a = n.food;
                var o = i.remaining(e.id);
                return { id: e.id, def: n, tag: o > 0 ? "No" : e.cost + "", tagCls: o > 0 ? "ready" : "recipe", meta: e.cost + " Linh Thạch/phần · no " + a.hours + " giờ", body: "Mỗi giây hồi " + a.hpPct + "% Khí Huyết, " + a.mp + " Linh Lực, " + a.bp + " Giáp." + (e.perDay ? " Hôm nay còn mua được " + i.leftToday(e.id) + "/" + e.perDay + "." : "") + (o > 0 ? " Đang no, còn " + i.fmtLeft(o) + "." : ""), buttons: function (n, a) {
                    i.PACKS.forEach(function (t) {
                      n("Mua " + t + " · " + e.cost * t, r() < e.cost * t || t > i.leftToday(e.id), function () {
                        a.buyFood(e, t);
                      });
                    });
                    if (t.Inventory.has(e.id, 1)) {
                      n("Ăn ngay", !1, function () {
                        a.eat(e.id);
                      });
                    }
                  } };
              });
            }
            if ("phu" === n) {
              var a = t.Talismans;
              return a.SHOP.map(function (e) {
                var n = a.defOf(e.id);
                var i = t.ITEMS[n.item];
                return { id: n.item, def: i, name: n.name, tag: e.cost + "", tagCls: "recipe", meta: e.cost + " Linh Thạch/lá · hồi " + n.cooldown + "s", body: n.tip, buttons: function (t, n) {
                    a.PACKS.forEach(function (i) {
                      t("Mua " + i + " · " + e.cost * i, r() < e.cost * i, function () {
                        n.buyTalisman(e, i);
                      });
                    });
                  } };
              });
            }
            return e.outfits().map(function (e) {
              var n;
              var i;
              var a;
              var o = (n = e.id, i = t.PhapBao, a = t.Loot, i && i.rowOf && i.rowOf(n) ? { tag: "Rơi", cls: "drop", text: "Rơi từ Thần Thú Xích Long, Linh Hổ Trấn Sơn." } : a && (a.MA_BAO_Y_PHUC && a.MA_BAO_Y_PHUC.indexOf(n) >= 0 || a.MA_BAO_THANH_TAM_Y && a.MA_BAO_THANH_TAM_Y.ITEM === n) ? { tag: "Rơi", cls: "drop", text: "Rơi từ Song Dực Ma Báo." } : a && a.HUYET_SAC_SONG_KICH && a.HUYET_SAC_SONG_KICH.ITEM === n ? { tag: "Rơi", cls: "drop", text: "Rơi từ Cấm Địa Huyết Xích, Yên Lãng Sơn; kho bảo vật Sỹ Sách Điện." } : a && a.HUYET_SAC_LONG_TUONG && a.HUYET_SAC_LONG_TUONG.ITEM === n ? { tag: "Rơi", cls: "drop", text: "Rơi từ ba boss Huyết Xích Cấm Địa." } : { tag: "Hiếm", cls: "reward", text: "Không bán, không rơi." });
              return { id: e.id, def: e, tag: o.tag, tagCls: o.cls, meta: ["female" === e.requireGender ? "Nữ" : "male" === e.requireGender ? "Nam" : "", e.grade].filter(Boolean).join(" · "), body: o.text, buttons: function () {
                } };
            });
          }(e._muc).forEach(function (n) {
            h.appendChild(function (n) {
              var r = n.name || n.def.name;
              var c = i("button", "bag-slot forge-slot " + o(n.def));
              c.type = "button";
              c.setAttribute("role", "listitem");
              c.setAttribute("aria-label", r);
              c.title = r;
              c.appendChild(a(n.def.icon, 32));
              c.appendChild(i("span", "bag-qty forge-tag " + n.tagCls, n.tag));
              c.addEventListener("click", function () {
                if ("y" === e._muc) {
                  (function (t, e) {
                    C = t.def;
                    b.textContent = t.def.name;
                    v.textContent = t.meta + " · " + t.body;
                    if (_) {
                      _.classList.remove("on");
                    }
                    _ = e;
                    e.classList.add("on");
                    u(m, C, y);
                  })(n, c);
                }
                else {
                  (function (e, n) {
                    T();
                    var r = e.name || e.def.name;
                    var c = i("div", "bag-detail forge-detail hongty-detail");
                    c.setAttribute("role", "dialog");
                    c.setAttribute("aria-label", "Chi tiết " + r);
                    c.addEventListener("click", function (t) {
                      if (t.target === c) {
                        T(n);
                      }
                    });
                    var u = i("div", "bag-detail-card");
                    var s = i("button", "panel-x", "✕");
                    s.type = "button";
                    s.setAttribute("aria-label", "Đóng chi tiết");
                    s.addEventListener("click", function () {
                      T(n);
                    });
                    u.appendChild(s);
                    var h = i("div", "bag-detail-head");
                    var p = i("div", "bag-detail-icon " + o(e.def));
                    p.appendChild(a(e.def.icon, 32));
                    h.appendChild(p);
                    var g = i("div");
                    g.appendChild(i("h3", null, r));
                    g.appendChild(i("div", "bag-detail-meta", e.meta + " · có " + t.Inventory.count(e.id)));
                    h.appendChild(g);
                    u.appendChild(h);
                    if (e.body) {
                      u.appendChild(i("p", null, e.body));
                    }
                    var m = i("div", "bag-detail-actions");
                    e.buttons(function (t, e, n) {
                      var a = i("button", "equip-action", t);
                      a.type = "button";
                      a.disabled = !!e;
                      a.addEventListener("click", function () {
                        n();
                        T();
                        f();
                      });
                      m.appendChild(a);
                    }, l);
                    var b = i("button", "equip-action secondary", "Đóng");
                    b.type = "button";
                    b.addEventListener("click", function () {
                      T(n);
                    });
                    m.appendChild(b);
                    u.appendChild(m);
                    c.appendChild(u);
                    d.appendChild(c);
                    s.focus({ preventScroll: !0 });
                  })(n, c);
                }
              });
              return c;
            }(n));
          }));
          var n = "y" === e._muc;
          A.classList.toggle("co-thu", n);
          g.hidden = !n;
          if (n) {
            _ = null;
            u(m, C, y);
          }
          Array.prototype.forEach.call(c.querySelectorAll("[data-muc]"), function (t) {
            var n = t.dataset.muc === e._muc;
            t.classList.toggle("on", n);
            t.setAttribute("aria-selected", n ? "true" : "false");
          });
        }
        var g = i("div", "hongty-thu");
        var m = document.createElement("canvas");
        m.width = 112;
        m.height = 168;
        m.title = "Bấm để xoay";
        var b = i("b", null, "Thử đồ");
        var v = i("small", null, "Chọn một bộ để mặc thử");
        g.appendChild(m);
        g.appendChild(b);
        g.appendChild(v);
        var C = null;
        var y = 0;
        var _ = null;
        m.addEventListener("click", function () {
          y++;
          u(m, C, y);
        });
        var A = i("div", "hongty-than");
        function T(t) {
          var e = d.querySelector(".forge-detail");
          if (e) {
            e.remove();
          }
          if (t && document.contains(t)) {
            t.focus({ preventScroll: !0 });
          }
        }
        if (s.forEach(function (t) {
          var n = i("button", "bag-filter", t.ten);
          n.type = "button";
          n.setAttribute("role", "tab");
          n.dataset.muc = t.id;
          n.addEventListener("click", function () {
            if (e._muc !== t.id) {
              e._muc = t.id;
              T();
              f();
            }
          });
          c.appendChild(n);
        }), l.openAppearance) {
          var E = i("button", "bag-filter hongty-ngoai-hinh", "Ngoại Hình");
          E.type = "button";
          E.addEventListener("click", function () {
            l.openAppearance();
          });
          c.appendChild(E);
        }
        n.appendChild(c);
        A.appendChild(g);
        A.appendChild(h);
        n.appendChild(A);
        n.appendChild(p);
        f();
      } });
  };
}(window.PNTT);
