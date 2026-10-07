!function (t) {
  "use strict";
  var e = t.MarketUI = {};
  var n = function () {
    return t.Market;
  };
  e._tab = "mua";
  e._nhom = "trang-bi";
  e._phu = "";
  e._trang = 0;
  e._sap = "moi";
  e._tim = "";
  var a = [{ id: "mua", ten: "Mua" }, { id: "ban", ten: "Bán" }, { id: "dang", ten: "Đang bán" }];
  var i = [{ id: "moi", ten: "Mới", nhan: "Mới treo trước" }, { id: "re", ten: "Rẻ", nhan: "Giá thấp trước" }, { id: "dat", ten: "Đắt", nhan: "Giá cao trước" }];
  function r(t, e, n) {
    var a = document.createElement(t);
    if (e) {
      a.className = e;
    }
    if (null != n) {
      a.textContent = n;
    }
    return a;
  }
  function d(e, n) {
    var a = document.createElement("canvas");
    a.width = a.height = n;
    if (e && t.drawItemIcon) {
      t.drawItemIcon(a.getContext("2d"), e, 0, 0, n);
    }
    if (e && t.sharpenItemIcon) {
      t.sharpenItemIcon(a, e);
    }
    return a;
  }
  function o(e) {
    return "grade-" + (t.Loot ? t.Loot.gradeKey(e && e.grade) : "common");
  }
  function l(e) {
    return t.ITEMS && t.ITEMS[e] || { name: e };
  }
  function u(t) {
    return n().fmt(t);
  }
  function c() {
    return 0 | (t.Progress && t.Progress.stones);
  }
  var p = 0;
  function s() {
    return "cho" + ++p + "-" + (1e9 * Math.random() | 0).toString(36);
  }
  function h(t) {
    t.head.innerHTML = "";
    var e = r("span", "market-purse", u(c()) + " LT");
    e.title = "Hầu bao: " + u(c()) + " Linh Thạch";
    e.setAttribute("aria-label", e.title);
    t.head.appendChild(e);
    var a = t.tabs.querySelector('[data-tab="dang"]');
    if (a) {
      a.textContent = "Đang bán" + (null != t.dangTreo ? " " + t.dangTreo + "/" + n().MAX_LISTINGS : "");
    }
  }
  function m(t) {
    setTimeout(function () {
      if (e._ctx === t) {
        h(t);
      }
    }, 250);
  }
  function b(a) {
    a.token++;
    T(a.root);
    Array.prototype.forEach.call(a.tabs.children, function (t) {
      var n = t.dataset.tab === e._tab;
      t.classList.toggle("on", n);
      t.setAttribute("aria-selected", n ? "true" : "false");
    });
    Array.prototype.forEach.call(a.groups.children, function (t) {
      var n = t.dataset.nhom === e._nhom;
      t.classList.toggle("on", n);
      t.setAttribute("aria-selected", n ? "true" : "false");
    });
    var c = "dang" === e._tab || !!a.chan;
    a.groups.classList.toggle("an", c);
    a.body.classList.toggle("tab-dang", c);
    f(a, "mua" === e._tab ? a.dem : null);
    if (a.chan) {
      a.subs.classList.add("an");
    }
    h(a);
    a.body.innerHTML = "";
    if (a.chan) {
      (function (t) {
        var e = r("div", "market-empty");
        e.appendChild(r("div", null, t.chan));
        var n = E("Kiểm tra lại", "secondary", function () {
          t.chan = null;
          t.daDo = !1;
          t.dem = null;
          b(t);
        });
        n.classList.add("market-empty-nut");
        e.appendChild(n);
        t.body.appendChild(e);
      })(a);
    }
    else {
      if ("mua" === e._tab) {
        (function (t) {
          var a = r("div", "market-bar");
          var d = r("div", "market-search");
          var o = r("input", "market-q");
          o.type = "text";
          o.placeholder = "Tìm…";
          o.maxLength = 40;
          o.autocomplete = "off";
          o.spellcheck = !1;
          o.enterKeyHint = "search";
          o.value = e._tim;
          o.setAttribute("aria-label", "Tìm theo tên vật phẩm (gõ không dấu cũng được)");
          var u = r("button", "market-q-x", "✕");
          u.type = "button";
          u.hidden = !e._tim;
          u.setAttribute("aria-label", "Xoá từ khoá");
          d.appendChild(o);
          d.appendChild(u);
          a.appendChild(d);
          var c = r("div", "market-sorts");
          function p() {
            Array.prototype.forEach.call(c.children, function (t) {
              var n = t.dataset.sap === e._sap;
              t.classList.toggle("on", n);
              t.setAttribute("aria-pressed", n ? "true" : "false");
            });
          }
          c.setAttribute("role", "group");
          c.setAttribute("aria-label", "Xếp theo");
          i.forEach(function (t) {
            var n = r("button", "market-sortbtn", t.ten);
            n.type = "button";
            n.title = t.nhan;
            n.dataset.sap = t.id;
            n.setAttribute("aria-label", t.nhan);
            n.addEventListener("click", function () {
              if (e._sap !== t.id) {
                e._sap = t.id;
                e._trang = 0;
                p();
                y();
              }
            });
            c.appendChild(n);
          });
          a.appendChild(c);
          p();
          var s = r("button", "market-reload", "⟳");
          s.type = "button";
          s.title = "Làm mới";
          s.setAttribute("aria-label", "Làm mới");
          s.addEventListener("click", function () {
            y();
          });
          a.appendChild(s);
          t.body.appendChild(a);
          var m = r("div", "market-list");
          m.setAttribute("role", "list");
          t.body.appendChild(m);
          var b = null;
          var v = 0;
          var g = null;
          function k(t) {
            var n = o.value.trim();
            function a() {
              if (m.isConnected && n !== e._tim) {
                e._tim = n;
                e._trang = 0;
                y();
              }
            }
            u.hidden = !o.value;
            clearTimeout(g);
            if (t) {
              a();
            }
            else {
              g = setTimeout(a, 280);
            }
          }
          function y() {
            var i = ++v;
            if (b) {
              b.remove();
              b = null;
            }
            m.innerHTML = "";
            m.appendChild(r("div", "market-empty", "Đang tải…"));
            var d = { nhom: e._nhom, trang: e._trang, sap: e._sap };
            if (e._phu) {
              d.phu = e._phu;
            }
            if (e._tim) {
              d.tim = e._tim;
            }
            C(t, "market.xem", d, function (d) {
              if (i === v)
                if (m.innerHTML = "", d.ok) {
                  t.dangTreo = d.dangTreo;
                  t.dem = d.dem || null;
                  h(t);
                  f(t, t.dem);
                  if (d.cho) {
                    m.appendChild(_(t, d.cho));
                  }
                  var u = d.hang;
                  if (!d.dem && e._phu) {
                    u = u.filter(function (t) {
                      return n().sub(l(t.itemId)) === e._phu;
                    });
                  }
                  if (u.length) {
                    u.forEach(function (e) {
                      m.appendChild(L(t, e, d.bayGio));
                    });
                    if (d.soTrang > 1) {
                      b = function (t, e, n) {
                        var a = r("div", "market-pager");
                        var i = r("button", "equip-action secondary", "‹");
                        i.type = "button";
                        i.title = "Trang trước";
                        i.setAttribute("aria-label", "Trang trước");
                        i.disabled = t <= 0;
                        i.addEventListener("click", function () {
                          n(t - 1);
                        });
                        var d = r("button", "equip-action secondary", "›");
                        d.type = "button";
                        d.title = "Trang sau";
                        d.setAttribute("aria-label", "Trang sau");
                        d.disabled = t >= e - 1;
                        d.addEventListener("click", function () {
                          n(t + 1);
                        });
                        a.appendChild(i);
                        a.appendChild(r("span", "market-page", t + 1 + "/" + e));
                        a.appendChild(d);
                        return a;
                      }(d.trang, d.soTrang, function (t) {
                        e._trang = t;
                        y();
                      });
                      (window.matchMedia && window.matchMedia("(min-width: 560px)").matches ? a : t.body).appendChild(b);
                    }
                  }
                  else {
                    m.appendChild(function (t, n) {
                      var a = r("div", "market-empty");
                      if (e._tim) {
                        a.appendChild(r("div", null, 'Không có "' + e._tim + '".'));
                        var i = E("Xoá từ khoá", "secondary", function () {
                          t.value = "";
                          n(!0);
                        });
                        i.classList.add("market-empty-nut");
                        a.appendChild(i);
                      }
                      else {
                        a.appendChild(r("div", null, "Trống."));
                      }
                      return a;
                    }(o, k));
                  }
                }
                else {
                  m.appendChild(r("div", "market-empty", d.why));
                }
            });
          }
          o.addEventListener("input", function () {
            k(!1);
          });
          o.addEventListener("keydown", function (t) {
            if ("Enter" === t.key) {
              t.preventDefault();
              k(!0);
              if (window.matchMedia && window.matchMedia("(pointer: coarse)").matches) {
                o.blur();
              }
            }
            else {
              if ("Escape" === t.key) {
                t.stopPropagation();
                if (o.value) {
                  o.value = "";
                  k(!0);
                }
                else {
                  o.blur();
                }
              }
            }
          });
          u.addEventListener("click", function () {
            o.value = "";
            k(!0);
            o.focus({ preventScroll: !0 });
          });
          y();
        })(a);
      }
      else {
        if ("ban" === e._tab) {
          if (a.daDo) {
            (function (a) {
              var i = t.Inventory;
              var l = i.list().filter(function (t) {
                return n().group(t.def) === e._nhom;
              });
              var c = { tatca: l.length };
              l.forEach(function (t) {
                var e = n().sub(t.def);
                c[e] = 1 + (0 | c[e]);
              });
              f(a, c);
              var p = e._phu ? l.filter(function (t) {
                return n().sub(t.def) === e._phu;
              }) : l;
              if (p.length) {
                a.body.appendChild(r("div", "market-hint", "Chọn món để treo · phí " + Math.round(100 * n().FEE_RATE) + "% khi bán được · " + Math.round(n().TTL_MS / 36e5) + " giờ · tối đa " + n().MAX_LISTINGS + " món"));
                var m = r("div", "bag-list forge-grid market-grid");
                m.setAttribute("role", "list");
                p.forEach(function (l) {
                  var c = l.def.id;
                  var p = n().tradable(c, t) ? i.tradableCount(c) : 0;
                  var h = r("button", "bag-slot forge-slot " + o(l.def) + (p ? "" : " empty"));
                  h.type = "button";
                  h.setAttribute("role", "listitem");
                  h.title = l.def.name;
                  h.appendChild(d(l.def.icon, 32));
                  h.appendChild(r("span", "bag-qty", p ? String(p) : "✕"));
                  h.setAttribute("aria-label", l.def.name + (p ? ", bán được " + p : ", không bán được"));
                  h.addEventListener("click", function () {
                    if (p) {
                      !function (a, i, d, o) {
                        var l = A(a, i, o, [i.grade, "có " + d].filter(Boolean).join(" · "));
                        var c = r("div", "market-form");
                        var p = r("label", "market-field");
                        p.appendChild(r("span", null, "Số lượng"));
                        var h = r("input");
                        h.type = "number";
                        h.min = "1";
                        h.max = String(d);
                        h.step = "1";
                        h.value = "1";
                        h.inputMode = "numeric";
                        p.appendChild(h);
                        var m = E("Tối đa", "secondary market-max", function () {
                          h.value = String(d);
                          q();
                        });
                        p.appendChild(m);
                        if (d <= 1) {
                          p.classList.add("hidden");
                        }
                        c.appendChild(p);
                        var f = r("label", "market-field");
                        f.appendChild(r("span", null, "Giá cả lô"));
                        var v = r("input");
                        v.type = "text";
                        v.inputMode = "numeric";
                        v.autocomplete = "off";
                        v.placeholder = "Từ " + u(n().MIN_PRICE) + " LT";
                        f.appendChild(v);
                        c.appendChild(f);
                        var g = r("div", "market-calc");
                        var k = r("div", "bag-detail-note market-warn");
                        var y = r("div", "bag-detail-note");
                        c.appendChild(g);
                        c.appendChild(k);
                        l.card.appendChild(c);
                        var L = r("div", "bag-detail-actions");
                        var _ = E("Đăng Bán");
                        function I() {
                          return { qty: d <= 1 ? 1 : x(h.value), price: x(v.value) };
                        }
                        function q() {
                          var e = I();
                          var r = n().checkPost(t, i.id, e.qty, e.price, a.dangTreo || 0);
                          if (n().priceOk(e.price)) {
                            g.textContent = "Phí " + u(n().fee(e.price)) + " · Nhận " + u(n().payout(e.price)) + " LT";
                          }
                          else {
                            g.textContent = "Giá " + u(n().MIN_PRICE) + " – " + u(n().MAX_PRICE) + " LT";
                          }
                          k.textContent = n().qtyOk(e.qty) && n().lastSkillBook(t, i.id, e.qty) ? "Quyển cuối: treo là quên chiêu tới khi rút về." : "";
                          _.disabled = !r.ok;
                          y.textContent = r.ok || !v.value ? "" : r.why;
                        }
                        L.appendChild(_);
                        L.appendChild(E("Đóng", "secondary", function () {
                          T(a.root, o);
                        }));
                        l.card.appendChild(L);
                        l.card.appendChild(y);
                        h.addEventListener("input", q);
                        v.addEventListener("input", q);
                        q();
                        _.addEventListener("click", function () {
                          var r = I();
                          if (n().checkPost(t, i.id, r.qty, r.price, a.dangTreo || 0).ok) {
                            if (n().lastSkillBook(t, i.id, r.qty) && "1" !== _.dataset.xacNhan) {
                              _.dataset.xacNhan = "1";
                              return void (_.textContent = "Vẫn treo — quên chiêu");
                            }
                            _.disabled = !0;
                            C(a, "market.dang", { itemId: i.id, qty: r.qty, price: r.price, requestId: s() }, function (n) {
                              if (!n.ok) {
                                y.textContent = n.why;
                                _.disabled = !1;
                                return void (t.Audio && t.Audio.play("deny"));
                              }
                              if (t.Audio) {
                                t.Audio.play("coin");
                              }
                              T(a.root);
                              e._tab = "dang";
                              b(a);
                            });
                          }
                        });
                        v.focus({ preventScroll: !0 });
                      }(a, l.def, p, h);
                    }
                    else {
                      var i = n().whyNot(c, t) || "đã Khóa Thần Niệm";
                      if (t.HUD.setCaption) {
                        t.HUD.setCaption(l.def.name + ": " + i);
                      }
                    }
                  });
                  m.appendChild(h);
                });
                a.body.appendChild(m);
                if (null == a.dangTreo) {
                  C(a, "market.cuatoi", {}, function (t) {
                    if (t.ok) {
                      a.dangTreo = t.hang.length;
                      h(a);
                    }
                  });
                }
              }
              else {
                a.body.appendChild(r("div", "market-empty", "Túi trống mục này."));
              }
            })(a);
          }
          else {
            a.body.appendChild(r("div", "market-empty", "Đang tải…"));
            C(a, "market.cuatoi", {}, function (t) {
              a.daDo = !0;
              if (t.ok) {
                a.dangTreo = t.hang.length;
              }
              b(a);
            });
          }
        }
        else {
          (function (t) {
            var e = r("div", "market-list");
            e.setAttribute("role", "list");
            t.body.appendChild(e);
            e.appendChild(r("div", "market-empty", "Đang tải…"));
            C(t, "market.cuatoi", {}, function (n) {
              e.innerHTML = "";
              if (n.ok) {
                t.dangTreo = n.hang.length;
                h(t);
                if (n.cho) {
                  e.appendChild(_(t, n.cho));
                }
                if (n.hang.length) {
                  n.hang.forEach(function (a) {
                    e.appendChild(L(t, a, n.bayGio));
                  });
                }
                else {
                  e.appendChild(r("div", "market-empty", "Chưa treo món nào."));
                }
              }
              else {
                e.appendChild(r("div", "market-empty", n.why));
              }
            });
          })(a);
        }
      }
    }
  }
  function f(t, a) {
    if (t.subsNhom !== e._nhom) {
      t.subsNhom = e._nhom;
      t.subs.innerHTML = "";
      t.subs.scrollLeft = 0;
      [{ id: "", ten: "Tất cả" }].concat(n().SUBS[e._nhom] || []).forEach(function (n) {
        var a = r("button", "market-sub");
        a.type = "button";
        a.dataset.phu = n.id;
        a.appendChild(r("span", "market-sub-ten", n.ten));
        a.appendChild(r("span", "market-sub-n"));
        a.addEventListener("click", function () {
          if (e._phu !== n.id) {
            e._phu = n.id;
            e._trang = 0;
            b(t);
          }
        });
        t.subs.appendChild(a);
      });
    }
    Array.prototype.forEach.call(t.subs.children, function (t) {
      var n = t.dataset.phu;
      var i = n === e._phu;
      var r = a ? 0 | ("" === n ? a.tatca : a[n]) : null;
      t.classList.toggle("on", i);
      t.classList.toggle("trong", 0 === r);
      t.setAttribute("aria-pressed", i ? "true" : "false");
      var d = t.lastChild;
      d.textContent = null == r ? "" : r > 999 ? "999+" : String(r);
      d.hidden = null == r;
    });
    t.subs.classList.toggle("an", "dang" === e._tab);
    v(t);
    setTimeout(function () {
      if (e._ctx === t) {
        v(t);
      }
    }, 0);
  }
  function v(t) {
    var e = t.subs;
    var n = e.querySelector(".on");
    if (n && e.scrollWidth > e.clientWidth) {
      e.scrollLeft = Math.max(0, n.offsetLeft - (e.clientWidth - n.offsetWidth) / 2);
    }
    g(t);
  }
  function g(t) {
    var e = t.subs;
    e.classList.toggle("m-trai", e.scrollLeft > 2);
    e.classList.toggle("m-phai", e.scrollLeft + e.clientWidth < e.scrollWidth - 2);
  }
  function C(t, n, a, i) {
    var r = t.token;
    t.cmd(n, a, function (n) {
      if (r === t.token && e._ctx === t) {
        if ((n = n || { ok: !1, why: "máy chủ không trả lời" }).chan && !t.chan) {
          t.chan = n.why || "Vạn Bảo Phường chưa mở.";
          return void b(t);
        }
        i(n);
      }
    });
  }
  function k(t, e) {
    return n().conLai(t.expiresAt, e).replace(/^còn /, "");
  }
  function y(t) {
    var e = t.price / t.qty;
    return u(e >= 100 ? Math.round(e) : Math.round(10 * e) / 10);
  }
  function L(e, a, i) {
    var p = l(a.itemId);
    var h = t.Inventory;
    var f = r("button", "market-row" + (a.mine ? " mine" : ""));
    f.type = "button";
    f.setAttribute("role", "listitem");
    var v = r("span", "market-icon bag-slot " + o(p));
    v.appendChild(d(p.icon, 32));
    if (a.qty > 1) {
      v.appendChild(r("span", "bag-qty", "x" + a.qty));
    }
    f.appendChild(v);
    var g = r("span", "market-mid");
    g.appendChild(r("span", "market-name", p.name));
    var L = r("span", "market-meta");
    L.appendChild(r("span", "market-meta-t", (a.mine ? "Của ngươi" : a.sellerName) + " · " + k(a, i)));
    var _ = !a.mine && p.requireRealm && h && h.realmOk && !h.realmOk(p);
    if (_) {
      var x = r("span", "market-need", "≥ " + h.realmNeedName(p));
      x.title = "Cần " + h.realmNeedName(p);
      L.appendChild(x);
    }
    g.appendChild(L);
    f.appendChild(g);
    var I = r("span", "market-cost");
    I.appendChild(r("span", "market-price", u(a.price)));
    if (a.qty > 1) {
      I.appendChild(r("span", "market-unit", y(a) + "/món"));
    }
    f.appendChild(I);
    f.setAttribute("aria-label", p.name + ", số lượng " + a.qty + ", giá " + u(a.price) + " Linh Thạch" + (a.qty > 1 ? " (khoảng " + y(a) + " một món)" : "") + (_ ? ", cần " + h.realmNeedName(p) : "") + ", người bán " + (a.mine ? "chính ngươi" : a.sellerName));
    f.addEventListener("click", function () {
      !function (e, a, i, d) {
        var o = l(a.itemId);
        var p = A(e, o, d, [o.grade, "x" + a.qty].filter(Boolean).join(" · "));
        var h = r("ul", "market-facts");
        h.appendChild(r("li", null, "Giá cả lô: " + u(a.price) + " LT" + (a.qty > 1 ? " · " + y(a) + "/món" : "")));
        h.appendChild(r("li", null, (a.mine ? "Của ngươi" : a.sellerName) + " · " + k(a, i)));
        if (a.mine) {
          h.appendChild(r("li", null, "Nhận " + u(n().payout(a.price)) + " (phí " + u(n().fee(a.price)) + ")"));
        }
        p.card.appendChild(h);
        var f = r("div", "bag-detail-actions");
        var v = r("div", "bag-detail-note");
        if (a.mine) {
          f.appendChild(E("Rút về", "danger", function (t) {
            !function (t, e, n, a) {
              n.disabled = !0;
              C(t, "market.rut", { listingId: e.id, requestId: s() }, function (e) {
                if (!e.ok) {
                  if (a) {
                    a.textContent = e.why;
                  }
                  return void (n.disabled = !1);
                }
                T(t.root);
                b(t);
              });
            }(e, a, t.currentTarget, v);
          }));
        }
        else {
          var g = c() >= a.price;
          var L = E(g ? "Mua · " + u(a.price) : "Thiếu LT (" + u(c()) + "/" + u(a.price) + ")");
          L.disabled = !g;
          L.addEventListener("click", function () {
            if (!(L.disabled)) {
              L.disabled = !0;
              C(e, "market.mua", { listingId: a.id, requestId: s() }, function (n) {
                if (!n.ok) {
                  v.textContent = n.why;
                  L.disabled = !1;
                  return void (t.Audio && t.Audio.play("deny"));
                }
                if (t.Audio) {
                  t.Audio.play("coin");
                }
                T(e.root);
                m(e);
                b(e);
              });
            }
          });
          f.appendChild(L);
        }
        f.appendChild(E("Đóng", "secondary", function () {
          T(e.root, d);
        }));
        p.card.appendChild(f);
        p.card.appendChild(v);
        p.x.focus({ preventScroll: !0 });
      }(e, a, i, f);
    });
    return f;
  }
  function _(n, a) {
    var i = r("div", "market-cho");
    var d = [];
    if (a.stones) {
      d.push(u(a.stones) + " Linh Thạch");
    }
    (a.items || []).forEach(function (t) {
      d.push(l(t[0]).name + (t[1] > 1 ? " x" + t[1] : ""));
    });
    i.appendChild(r("span", null, (a.stones ? "Bán được: " : "Chờ nhận: ") + d.join(", ")));
    var o = r("button", "equip-action", a.stones ? "Nhận tiền" : "Nhận");
    o.type = "button";
    o.addEventListener("click", function () {
      o.disabled = !0;
      C(n, "market.nhan", {}, function (a) {
        if (a.ok) {
          if (t.Audio) {
            t.Audio.play("coin");
          }
          m(n);
          setTimeout(function () {
            if (e._ctx === n) {
              b(n);
            }
          }, 250);
        }
        else {
          o.disabled = !1;
        }
      });
    });
    i.appendChild(o);
    return i;
  }
  function T(t, e) {
    var n = t && t.querySelector(".market-detail");
    if (n) {
      n.remove();
    }
    if (e && document.contains(e)) {
      e.focus({ preventScroll: !0 });
    }
  }
  function A(e, n, a, i) {
    T(e.root);
    var l = r("div", "bag-detail forge-detail market-detail");
    l.setAttribute("role", "dialog");
    l.setAttribute("aria-label", "Chi tiết " + n.name);
    l.addEventListener("click", function (t) {
      if (t.target === l) {
        T(e.root, a);
      }
    });
    var u = r("div", "bag-detail-card");
    var c = r("button", "panel-x", "✕");
    c.type = "button";
    c.setAttribute("aria-label", "Đóng chi tiết");
    c.addEventListener("click", function () {
      T(e.root, a);
    });
    u.appendChild(c);
    var p = r("div", "bag-detail-head");
    var s = r("div", "bag-detail-icon " + o(n));
    s.appendChild(d(n.icon, 32));
    p.appendChild(s);
    var h = r("div");
    h.appendChild(r("h3", null, n.name));
    h.appendChild(r("div", "bag-detail-meta", i || n.grade || ""));
    p.appendChild(h);
    u.appendChild(p);
    var m = t.HUD.itemStatLabels ? t.HUD.itemStatLabels(n) : [];
    if (m.length && u.appendChild(r("div", "item-bonuses", m.join(" · "))), (t.Inventory && t.Inventory.effectLines ? t.Inventory.effectLines(n) : []).forEach(function (t) {
      u.appendChild(r("div", "item-effect", t));
    }), n.requireRealm && t.Inventory && t.Inventory.realmOk) {
      var b = t.Inventory.realmOk(n);
      u.appendChild(r("div", "item-require" + (b ? " met" : ""), (b ? "✓ " : "✕ ") + "Cần " + t.Inventory.realmNeedName(n)));
    }
    if (n.desc) {
      u.appendChild(r("p", null, n.desc));
    }
    l.appendChild(u);
    e.root.appendChild(l);
    return { wrap: l, card: u, x: c };
  }
  function E(t, e, n) {
    var a = r("button", "equip-action" + (e ? " " + e : ""), t);
    a.type = "button";
    if (n) {
      a.addEventListener("click", n);
    }
    return a;
  }
  function x(t) {
    var e = String(t || "").replace(/[.,\s]/g, "");
    return /^\d{1,12}$/.test(e) ? Number(e) : NaN;
  }
  e.open = function (i, d) {
    var o = (d = d || {}).cmd;
    e._phu = "";
    e._tim = "";
    t.HUD.openDialog(i && i.name || "Vạn Bảo Phường", "", { content: function (t, i) {
        t.classList.add("forge-box", "market-box");
        var d = { box: t, root: i, cmd: o, token: 0, dangTreo: null };
        e._ctx = d;
        d.head = r("div", "market-head");
        d.tabs = r("div", "bag-filters market-tabs");
        d.tabs.setAttribute("role", "tablist");
        d.tabs.setAttribute("aria-label", "Việc ở chợ");
        d.groups = r("div", "bag-filters market-groups");
        d.groups.setAttribute("role", "tablist");
        d.groups.setAttribute("aria-label", "Loại hàng");
        d.subs = r("div", "market-subs");
        d.subs.setAttribute("role", "group");
        d.subs.setAttribute("aria-label", "Phân loại chi tiết");
        d.subs.addEventListener("scroll", function () {
          g(d);
        });
        d.subs.addEventListener("wheel", function (t) {
          if (!(!t.deltaY || t.deltaX || d.subs.scrollWidth <= d.subs.clientWidth)) {
            d.subs.scrollLeft += t.deltaY;
            t.preventDefault();
          }
        }, { passive: !1 });
        d.body = r("div", "market-body");
        a.forEach(function (t) {
          var n = r("button", "bag-filter", t.ten);
          n.type = "button";
          n.setAttribute("role", "tab");
          n.dataset.tab = t.id;
          n.addEventListener("click", function () {
            if (e._tab !== t.id) {
              e._tab = t.id;
              e._trang = 0;
              b(d);
            }
          });
          d.tabs.appendChild(n);
        });
        n().GROUPS.forEach(function (t) {
          var n = r("button", "bag-filter", t.ten);
          n.type = "button";
          n.setAttribute("role", "tab");
          n.dataset.nhom = t.id;
          n.addEventListener("click", function () {
            if (e._nhom !== t.id) {
              e._nhom = t.id;
              e._phu = "";
              e._trang = 0;
              d.dem = null;
              b(d);
            }
          });
          d.groups.appendChild(n);
        });
        t.appendChild(d.tabs);
        t.appendChild(d.head);
        t.appendChild(d.groups);
        t.appendChild(d.subs);
        t.appendChild(d.body);
        b(d);
      } });
  };
  e.refresh = function () {
    if (e._ctx && document.contains(e._ctx.box)) {
      b(e._ctx);
    }
  };
  e.closeDetail = function () {
    var t = document.getElementById("dialog");
    if (t) {
      T(t);
    }
  };
}(window.PNTT);
