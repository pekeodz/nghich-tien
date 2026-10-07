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
  function p(t) {
    return n().fmt(t);
  }
  function u() {
    return 0 | (t.Progress && t.Progress.stones);
  }
  var c = 0;
  function s() {
    return "cho" + ++c + "-" + (1e9 * Math.random() | 0).toString(36);
  }
  function h(t) {
    t.head.innerHTML = "";
    var e = r("span", "market-purse", p(u()) + " LT");
    e.title = "Hầu bao: " + p(u()) + " Linh Thạch";
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
  function v(a) {
    a.token++;
    E(a.root);
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
    var u = "dang" === e._tab || !!a.chan;
    a.groups.classList.toggle("an", u);
    a.body.classList.toggle("tab-dang", u);
    g(a, "mua" === e._tab ? a.dem : null);
    if (a.chan) {
      a.subs.classList.add("an");
    }
    h(a);
    a.body.innerHTML = "";
    if (a.chan) {
      (function (e) {
        var n = r("div", "market-empty");
        n.appendChild(r("div", null, e.chan));
        var a = I("Kiểm tra lại", "secondary", function () {
          e.chan = null;
          e.daDo = !1;
          e.dem = null;
          v(e);
        });
        a.classList.add("market-empty-nut");
        n.appendChild(a);
        e.body.appendChild(n);
        if (t.realmReached && t.Progress && t.realmReached(t.Progress.realmId, "luyen_khi_10")) {
          e.body.appendChild(function () {
            var e = r("div", "market-qua");
            e.setAttribute("role", "group");
            e.setAttribute("aria-label", "Quà khi mở chợ");
            e.appendChild(r("div", "market-qua-tit", "Quà mở chợ"));
            var n = r("div", "market-qua-luoi");
            b.forEach(function (t) {
              n.appendChild(function (t) {
                var e = l(t.id);
                var n = r("div", "market-qua-o" + (t.hop ? " hop" : ""));
                n.title = e.name + (t.khoa ? " (khoá)" : "");
                var a = d(e.icon, 32);
                a.className = "market-qua-ic";
                n.appendChild(a);
                n.appendChild(r("span", "market-qua-n", "×" + p(t.n)));
                n.appendChild(r("span", "market-qua-ten", e.name));
                if (t.khoa) {
                  n.appendChild(r("span", "market-qua-khoa", "khoá"));
                }
                return n;
              }(t));
            });
            e.appendChild(n);
            (function (e) {
              var n = t.Inventory && t.Inventory.HOP && t.Inventory.HOP[f];
              if (n) {
                var a = r("div", "market-qua-hop");
                a.appendChild(r("div", "market-qua-hop-tit", l(f).name + " mở ra ngẫu nhiên"));
                n.forEach(function (e, n) {
                  var i = t.Inventory.hopPool ? t.Inventory.hopPool(f, n) : e.pool;
                  if (i.length) {
                    var o = r("div", "market-qua-phan" + (e.pool.length > 8 ? " rong" : ""));
                    o.appendChild(r("div", "market-qua-phan-ten", "1 " + e.ten));
                    var p = r("div", "market-qua-dai");
                    i.forEach(function (t) {
                      var e = l(t);
                      var n = d(e.icon, 32);
                      n.className = "market-qua-mini";
                      n.title = e.name;
                      p.appendChild(n);
                    });
                    o.appendChild(p);
                    a.appendChild(o);
                  }
                });
                e.appendChild(a);
              }
            })(e);
            return e;
          }());
        }
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
          var p = r("button", "market-q-x", "✕");
          p.type = "button";
          p.hidden = !e._tim;
          p.setAttribute("aria-label", "Xoá từ khoá");
          d.appendChild(o);
          d.appendChild(p);
          a.appendChild(d);
          var u = r("div", "market-sorts");
          function c() {
            Array.prototype.forEach.call(u.children, function (t) {
              var n = t.dataset.sap === e._sap;
              t.classList.toggle("on", n);
              t.setAttribute("aria-pressed", n ? "true" : "false");
            });
          }
          u.setAttribute("role", "group");
          u.setAttribute("aria-label", "Xếp theo");
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
                c();
                C();
              }
            });
            u.appendChild(n);
          });
          a.appendChild(u);
          c();
          var s = r("button", "market-reload", "⟳");
          s.type = "button";
          s.title = "Làm mới";
          s.setAttribute("aria-label", "Làm mới");
          s.addEventListener("click", function () {
            C();
          });
          a.appendChild(s);
          t.body.appendChild(a);
          var m = r("div", "market-list");
          m.setAttribute("role", "list");
          t.body.appendChild(m);
          var v = null;
          var b = 0;
          var f = null;
          function k(t) {
            var n = o.value.trim();
            function a() {
              if (m.isConnected && n !== e._tim) {
                e._tim = n;
                e._trang = 0;
                C();
              }
            }
            p.hidden = !o.value;
            clearTimeout(f);
            if (t) {
              a();
            }
            else {
              f = setTimeout(a, 280);
            }
          }
          function C() {
            var i = ++b;
            if (v) {
              v.remove();
              v = null;
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
            y(t, "market.xem", d, function (d) {
              if (i === b)
                if (m.innerHTML = "", d.ok) {
                  t.dangTreo = d.dangTreo;
                  t.dem = d.dem || null;
                  h(t);
                  g(t, t.dem);
                  if (d.cho) {
                    m.appendChild(A(t, d.cho));
                  }
                  var p = d.hang;
                  if (!d.dem && e._phu) {
                    p = p.filter(function (t) {
                      return n().sub(l(t.itemId)) === e._phu;
                    });
                  }
                  if (p.length) {
                    p.forEach(function (e) {
                      m.appendChild(T(t, e, d.bayGio));
                    });
                    if (d.soTrang > 1) {
                      v = function (t, e, n) {
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
                        C();
                      });
                      (window.matchMedia && window.matchMedia("(min-width: 560px)").matches ? a : t.body).appendChild(v);
                    }
                  }
                  else {
                    m.appendChild(function (t, n) {
                      var a = r("div", "market-empty");
                      if (e._tim) {
                        a.appendChild(r("div", null, 'Không có "' + e._tim + '".'));
                        var i = I("Xoá từ khoá", "secondary", function () {
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
          p.addEventListener("click", function () {
            o.value = "";
            k(!0);
            o.focus({ preventScroll: !0 });
          });
          C();
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
              var u = { tatca: l.length };
              l.forEach(function (t) {
                var e = n().sub(t.def);
                u[e] = 1 + (0 | u[e]);
              });
              g(a, u);
              var c = e._phu ? l.filter(function (t) {
                return n().sub(t.def) === e._phu;
              }) : l;
              if (c.length) {
                a.body.appendChild(r("div", "market-hint", "Chọn món để treo · phí " + Math.round(100 * n().FEE_RATE) + "% khi bán được · " + Math.round(n().TTL_MS / 36e5) + " giờ · tối đa " + n().MAX_LISTINGS + " món"));
                var m = r("div", "bag-list forge-grid market-grid");
                m.setAttribute("role", "list");
                c.forEach(function (l) {
                  var u = l.def.id;
                  var c = n().tradable(u, t) ? i.tradableCount(u) : 0;
                  var h = r("button", "bag-slot forge-slot " + o(l.def) + (c ? "" : " empty"));
                  h.type = "button";
                  h.setAttribute("role", "listitem");
                  h.title = l.def.name;
                  h.appendChild(d(l.def.icon, 32));
                  h.appendChild(r("span", "bag-qty", c ? String(c) : "✕"));
                  h.setAttribute("aria-label", l.def.name + (c ? ", bán được " + c : ", không bán được"));
                  h.addEventListener("click", function () {
                    if (c) {
                      !function (a, i, d, o) {
                        var l = q(a, i, o, [i.grade, "có " + d].filter(Boolean).join(" · "));
                        var u = r("div", "market-form");
                        var c = r("label", "market-field");
                        c.appendChild(r("span", null, "Số lượng"));
                        var h = r("input");
                        h.type = "number";
                        h.min = "1";
                        h.max = String(d);
                        h.step = "1";
                        h.value = "1";
                        h.inputMode = "numeric";
                        c.appendChild(h);
                        var m = I("Tối đa", "secondary market-max", function () {
                          h.value = String(d);
                          A();
                        });
                        c.appendChild(m);
                        if (d <= 1) {
                          c.classList.add("hidden");
                        }
                        u.appendChild(c);
                        var b = r("label", "market-field");
                        b.appendChild(r("span", null, "Giá cả lô"));
                        var f = r("input");
                        f.type = "text";
                        f.inputMode = "numeric";
                        f.autocomplete = "off";
                        f.placeholder = "Từ " + p(n().MIN_PRICE) + " LT";
                        b.appendChild(f);
                        u.appendChild(b);
                        var g = r("div", "market-calc");
                        var k = r("div", "bag-detail-note market-warn");
                        var C = r("div", "bag-detail-note");
                        u.appendChild(g);
                        u.appendChild(k);
                        l.card.appendChild(u);
                        var _ = r("div", "bag-detail-actions");
                        var L = I("Đăng Bán");
                        function T() {
                          return { qty: d <= 1 ? 1 : x(h.value), price: x(f.value) };
                        }
                        function A() {
                          var e = T();
                          var r = n().checkPost(t, i.id, e.qty, e.price, a.dangTreo || 0);
                          if (n().priceOk(e.price)) {
                            g.textContent = "Phí " + p(n().fee(e.price)) + " · Nhận " + p(n().payout(e.price)) + " LT";
                          }
                          else {
                            g.textContent = "Giá " + p(n().MIN_PRICE) + " – " + p(n().MAX_PRICE) + " LT";
                          }
                          k.textContent = n().qtyOk(e.qty) && n().lastSkillBook(t, i.id, e.qty) ? "Quyển cuối: treo là quên chiêu tới khi rút về." : "";
                          L.disabled = !r.ok;
                          C.textContent = r.ok || !f.value ? "" : r.why;
                        }
                        _.appendChild(L);
                        _.appendChild(I("Đóng", "secondary", function () {
                          E(a.root, o);
                        }));
                        l.card.appendChild(_);
                        l.card.appendChild(C);
                        h.addEventListener("input", A);
                        f.addEventListener("input", A);
                        A();
                        L.addEventListener("click", function () {
                          var r = T();
                          if (n().checkPost(t, i.id, r.qty, r.price, a.dangTreo || 0).ok) {
                            if (n().lastSkillBook(t, i.id, r.qty) && "1" !== L.dataset.xacNhan) {
                              L.dataset.xacNhan = "1";
                              return void (L.textContent = "Vẫn treo — quên chiêu");
                            }
                            L.disabled = !0;
                            y(a, "market.dang", { itemId: i.id, qty: r.qty, price: r.price, requestId: s() }, function (n) {
                              if (!n.ok) {
                                C.textContent = n.why;
                                L.disabled = !1;
                                return void (t.Audio && t.Audio.play("deny"));
                              }
                              if (t.Audio) {
                                t.Audio.play("coin");
                              }
                              E(a.root);
                              e._tab = "dang";
                              v(a);
                            });
                          }
                        });
                        f.focus({ preventScroll: !0 });
                      }(a, l.def, c, h);
                    }
                    else {
                      var i = n().whyNot(u, t) || "đã Khóa Thần Niệm";
                      if (t.HUD.setCaption) {
                        t.HUD.setCaption(l.def.name + ": " + i);
                      }
                    }
                  });
                  m.appendChild(h);
                });
                a.body.appendChild(m);
                if (null == a.dangTreo) {
                  y(a, "market.cuatoi", {}, function (t) {
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
            y(a, "market.cuatoi", {}, function (t) {
              a.daDo = !0;
              if (t.ok) {
                a.dangTreo = t.hang.length;
              }
              v(a);
            });
          }
        }
        else {
          (function (t) {
            var e = r("div", "market-list");
            e.setAttribute("role", "list");
            t.body.appendChild(e);
            e.appendChild(r("div", "market-empty", "Đang tải…"));
            y(t, "market.cuatoi", {}, function (n) {
              e.innerHTML = "";
              if (n.ok) {
                t.dangTreo = n.hang.length;
                h(t);
                if (n.cho) {
                  e.appendChild(A(t, n.cho));
                }
                if (n.hang.length) {
                  n.hang.forEach(function (a) {
                    e.appendChild(T(t, a, n.bayGio));
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
          C(d);
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
              v(d);
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
              v(d);
            }
          });
          d.groups.appendChild(n);
        });
        t.appendChild(d.tabs);
        t.appendChild(d.head);
        t.appendChild(d.groups);
        t.appendChild(d.subs);
        t.appendChild(d.body);
        v(d);
      } });
  };
  var b = [{ id: "linh_thach", n: 1e3 }, { id: "manh_yeu_dan_cap_3", n: 2, khoa: !0 }, { id: "nguu_sung", n: 1, khoa: !0 }, { id: "nanh_ho", n: 1, khoa: !0 }, { id: "hop_van_bao", n: 1, khoa: !0, hop: !0 }];
  var f = "hop_van_bao";
  function g(t, a) {
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
            v(t);
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
    k(t);
    setTimeout(function () {
      if (e._ctx === t) {
        k(t);
      }
    }, 0);
  }
  function k(t) {
    var e = t.subs;
    var n = e.querySelector(".on");
    if (n && e.scrollWidth > e.clientWidth) {
      e.scrollLeft = Math.max(0, n.offsetLeft - (e.clientWidth - n.offsetWidth) / 2);
    }
    C(t);
  }
  function C(t) {
    var e = t.subs;
    e.classList.toggle("m-trai", e.scrollLeft > 2);
    e.classList.toggle("m-phai", e.scrollLeft + e.clientWidth < e.scrollWidth - 2);
  }
  function y(t, n, a, i) {
    var r = t.token;
    t.cmd(n, a, function (n) {
      if (r === t.token && e._ctx === t) {
        if ((n = n || { ok: !1, why: "máy chủ không trả lời" }).chan && !t.chan) {
          t.chan = n.why || "Vạn Bảo Phường chưa mở.";
          return void v(t);
        }
        i(n);
      }
    });
  }
  function _(t, e) {
    return n().conLai(t.expiresAt, e).replace(/^còn /, "");
  }
  function L(t) {
    var e = t.price / t.qty;
    return p(e >= 100 ? Math.round(e) : Math.round(10 * e) / 10);
  }
  function T(e, a, i) {
    var c = l(a.itemId);
    var h = t.Inventory;
    var b = r("button", "market-row" + (a.mine ? " mine" : ""));
    b.type = "button";
    b.setAttribute("role", "listitem");
    var f = r("span", "market-icon bag-slot " + o(c));
    f.appendChild(d(c.icon, 32));
    if (a.qty > 1) {
      f.appendChild(r("span", "bag-qty", "x" + a.qty));
    }
    b.appendChild(f);
    var g = r("span", "market-mid");
    g.appendChild(r("span", "market-name", c.name));
    var k = r("span", "market-meta");
    k.appendChild(r("span", "market-meta-t", (a.mine ? "Của ngươi" : a.sellerName) + " · " + _(a, i)));
    var C = !a.mine && c.requireRealm && h && h.realmOk && !h.realmOk(c);
    if (C) {
      var T = r("span", "market-need", "≥ " + h.realmNeedName(c));
      T.title = "Cần " + h.realmNeedName(c);
      k.appendChild(T);
    }
    g.appendChild(k);
    b.appendChild(g);
    var A = r("span", "market-cost");
    A.appendChild(r("span", "market-price", p(a.price)));
    if (a.qty > 1) {
      A.appendChild(r("span", "market-unit", L(a) + "/món"));
    }
    b.appendChild(A);
    b.setAttribute("aria-label", c.name + ", số lượng " + a.qty + ", giá " + p(a.price) + " Linh Thạch" + (a.qty > 1 ? " (khoảng " + L(a) + " một món)" : "") + (C ? ", cần " + h.realmNeedName(c) : "") + ", người bán " + (a.mine ? "chính ngươi" : a.sellerName));
    b.addEventListener("click", function () {
      !function (e, a, i, d) {
        var o = l(a.itemId);
        var c = q(e, o, d, [o.grade, "x" + a.qty].filter(Boolean).join(" · "));
        var h = r("ul", "market-facts");
        h.appendChild(r("li", null, "Giá cả lô: " + p(a.price) + " LT" + (a.qty > 1 ? " · " + L(a) + "/món" : "")));
        h.appendChild(r("li", null, (a.mine ? "Của ngươi" : a.sellerName) + " · " + _(a, i)));
        if (a.mine) {
          h.appendChild(r("li", null, "Nhận " + p(n().payout(a.price)) + " (phí " + p(n().fee(a.price)) + ")"));
        }
        c.card.appendChild(h);
        var b = r("div", "bag-detail-actions");
        var f = r("div", "bag-detail-note");
        if (a.mine) {
          b.appendChild(I("Rút về", "danger", function (t) {
            !function (t, e, n, a) {
              n.disabled = !0;
              y(t, "market.rut", { listingId: e.id, requestId: s() }, function (e) {
                if (!e.ok) {
                  if (a) {
                    a.textContent = e.why;
                  }
                  return void (n.disabled = !1);
                }
                E(t.root);
                v(t);
              });
            }(e, a, t.currentTarget, f);
          }));
        }
        else {
          var g = u() >= a.price;
          var k = I(g ? "Mua · " + p(a.price) : "Thiếu LT (" + p(u()) + "/" + p(a.price) + ")");
          k.disabled = !g;
          k.addEventListener("click", function () {
            if (!(k.disabled)) {
              k.disabled = !0;
              y(e, "market.mua", { listingId: a.id, requestId: s() }, function (n) {
                if (!n.ok) {
                  f.textContent = n.why;
                  k.disabled = !1;
                  return void (t.Audio && t.Audio.play("deny"));
                }
                if (t.Audio) {
                  t.Audio.play("coin");
                }
                E(e.root);
                m(e);
                v(e);
              });
            }
          });
          b.appendChild(k);
        }
        b.appendChild(I("Đóng", "secondary", function () {
          E(e.root, d);
        }));
        c.card.appendChild(b);
        c.card.appendChild(f);
        c.x.focus({ preventScroll: !0 });
      }(e, a, i, b);
    });
    return b;
  }
  function A(n, a) {
    var i = r("div", "market-cho");
    var d = [];
    if (a.stones) {
      d.push(p(a.stones) + " Linh Thạch");
    }
    (a.items || []).forEach(function (t) {
      d.push(l(t[0]).name + (t[1] > 1 ? " x" + t[1] : ""));
    });
    i.appendChild(r("span", null, (a.stones ? "Bán được: " : "Chờ nhận: ") + d.join(", ")));
    var o = r("button", "equip-action", a.stones ? "Nhận tiền" : "Nhận");
    o.type = "button";
    o.addEventListener("click", function () {
      o.disabled = !0;
      y(n, "market.nhan", {}, function (a) {
        if (a.ok) {
          if (t.Audio) {
            t.Audio.play("coin");
          }
          m(n);
          setTimeout(function () {
            if (e._ctx === n) {
              v(n);
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
  function E(t, e) {
    var n = t && t.querySelector(".market-detail");
    if (n) {
      n.remove();
    }
    if (e && document.contains(e)) {
      e.focus({ preventScroll: !0 });
    }
  }
  function q(e, n, a, i) {
    E(e.root);
    var l = r("div", "bag-detail forge-detail market-detail");
    l.setAttribute("role", "dialog");
    l.setAttribute("aria-label", "Chi tiết " + n.name);
    l.addEventListener("click", function (t) {
      if (t.target === l) {
        E(e.root, a);
      }
    });
    var p = r("div", "bag-detail-card");
    var u = r("button", "panel-x", "✕");
    u.type = "button";
    u.setAttribute("aria-label", "Đóng chi tiết");
    u.addEventListener("click", function () {
      E(e.root, a);
    });
    p.appendChild(u);
    var c = r("div", "bag-detail-head");
    var s = r("div", "bag-detail-icon " + o(n));
    s.appendChild(d(n.icon, 32));
    c.appendChild(s);
    var h = r("div");
    h.appendChild(r("h3", null, n.name));
    h.appendChild(r("div", "bag-detail-meta", i || n.grade || ""));
    c.appendChild(h);
    p.appendChild(c);
    var m = t.HUD.itemStatLabels ? t.HUD.itemStatLabels(n) : [];
    if (m.length && p.appendChild(r("div", "item-bonuses", m.join(" · "))), (t.Inventory && t.Inventory.effectLines ? t.Inventory.effectLines(n) : []).forEach(function (t) {
      p.appendChild(r("div", "item-effect", t));
    }), n.requireRealm && t.Inventory && t.Inventory.realmOk) {
      var v = t.Inventory.realmOk(n);
      p.appendChild(r("div", "item-require" + (v ? " met" : ""), (v ? "✓ " : "✕ ") + "Cần " + t.Inventory.realmNeedName(n)));
    }
    if (n.desc) {
      p.appendChild(r("p", null, n.desc));
    }
    l.appendChild(p);
    e.root.appendChild(l);
    return { wrap: l, card: p, x: u };
  }
  function I(t, e, n) {
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
  e.QUA_MO_CHO = b;
  e.refresh = function () {
    if (e._ctx && document.contains(e._ctx.box)) {
      v(e._ctx);
    }
  };
  e.closeDetail = function () {
    var t = document.getElementById("dialog");
    if (t) {
      E(t);
    }
  };
}(window.PNTT);
