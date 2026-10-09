!function (t) {
  "use strict";
  var n = t.ChienTruong;
  if (n) {
    var a = t.ChienTruongUI = { open: !1, st: null };
    var e = {};
    var o = 0;
    var i = !1;
    var c = m();
    var r = "pntt.chienTruongToastMin";
    var l = { suat: null, thuGon: !1, ve: 0, key: "" };
    a.now = p;
    a.dangTrongTran = function () {
      return L();
    };
    a.dangTrongCho = function () {
      return v() === n.MAP_CHO;
    };
    a.dangXem = function () {
      return L() && c.bong;
    };
    a.an = function () {
      return L() && c.an && !c.bong;
    };
    a.trangThai = function () {
      return c;
    };
    a.chanLenh = function (n) {
      return !!L() && (n && t.VFX && t.VFX.spawnText && t.VFX.spawnText(n.x, n.y - 52, "Chiến Trường chỉ đánh thường", "#c9a45c"), !0);
    };
    a.init = function () {
      if (!e.root && document.body) {
        var t;
        var n;
        var o = e.root = (t = "ct-root", n = document.createElement("div"), t && (n.id = t), n);
        o.innerHTML = '<aside id="ct-toast" class="dh-toast ct-toast hidden" aria-live="polite" aria-label="Vạn Hoang Chiến Trường"><button id="ct-toast-pill" class="dh-toast-pill hidden" type="button" aria-label="Mở thông báo Chiến Trường"><span class="dh-toast-icon" aria-hidden="true">⚔</span><b id="ct-toast-pill-clock">--:--</b></button><div id="ct-toast-card" class="dh-toast-card"><header class="dh-toast-head"><span class="dh-toast-icon" aria-hidden="true">⚔</span><div class="dh-toast-title"><strong id="ct-toast-label">Chốt sổ sau</strong><small id="ct-toast-sub">Vạn Hoang Chiến Trường</small></div><b id="ct-toast-clock">--:--</b><button id="ct-toast-min" class="dh-toast-min" type="button" aria-label="Thu gọn" title="Thu gọn">–</button></header><p id="ct-toast-msg" class="dh-toast-msg hidden"></p><div class="dh-toast-actions"><button id="ct-toast-act" class="dh-toast-btn main" type="button">Ghi Danh</button><button id="ct-toast-more" class="dh-toast-btn" type="button">Chi tiết</button></div></div></aside><div id="chientruong" class="overlay hidden" role="dialog" aria-modal="true" aria-labelledby="ct-title"><div class="scroll-panel narrow daihoi-panel"><header class="dh-head"><div><span class="sheet-kicker">SINH TỒN · BO THU DẦN</span><h2 id="ct-title">Vạn Hoang Chiến Trường</h2></div><strong id="ct-clock" class="dh-clock">--:--</strong></header><div id="ct-phase" class="dh-phase">Chưa mở sổ</div><div id="ct-info" class="dh-info"></div><button id="ct-act" class="btn-main" type="button">Ghi Danh</button><button id="ct-close" class="btn-sub" type="button">Lui Bước</button></div></div><div id="ct-hud" class="hidden" aria-live="off"><div class="ct-hud-hang"><span id="ct-con" class="ct-chip"></span><span id="ct-mang" class="ct-chip"></span><span id="ct-hasat" class="ct-chip"></span></div><div id="ct-bo" class="ct-hud-bo"></div><div id="ct-buff" class="ct-buff"></div></div><div id="ct-xem" class="hidden"><div class="ct-xem-hd"><span class="ct-xem-tag">ĐANG XEM</span><span id="ct-xem-ten" class="ct-xem-ten"></span></div><div class="ct-xem-nut"><button id="ct-xem-truoc" type="button" aria-label="Người trước">◀</button><button id="ct-xem-sau" type="button" aria-label="Người sau">▶</button><button id="ct-xem-roi" type="button">Về Phòng Chờ</button></div></div><div id="ct-dem" class="hidden"></div><div id="ct-banner" class="hidden"><strong></strong><small></small></div><div id="ct-guc" class="hidden"><strong></strong><small></small></div><div id="ct-bao"></div><button id="ct-mo" class="hidden" type="button">Mở Rương</button><div id="ct-ketqua" class="overlay hidden" role="dialog" aria-modal="true" aria-labelledby="ct-kq-hang"><div class="scroll-panel narrow daihoi-panel"><header class="dh-head"><div><span class="sheet-kicker">KẾT QUẢ</span><h2 id="ct-kq-hang">Hạng 1</h2></div></header><div id="ct-kq-top" class="dh-info"></div><button id="ct-kq-dong" class="btn-main" type="button">Đóng</button></div></div>';
        document.body.appendChild(o);
        e.toast = k("#ct-toast");
        e.toastCard = k("#ct-toast-card");
        e.toastPill = k("#ct-toast-pill");
        e.toastPillClock = k("#ct-toast-pill-clock");
        e.toastSub = k("#ct-toast-sub");
        e.toastLabel = k("#ct-toast-label");
        e.toastClock = k("#ct-toast-clock");
        e.toastMsg = k("#ct-toast-msg");
        e.toastAct = k("#ct-toast-act");
        e.panel = k("#chientruong");
        e.phase = k("#ct-phase");
        e.clock = k("#ct-clock");
        e.info = k("#ct-info");
        e.act = k("#ct-act");
        e.hud = k("#ct-hud");
        e.con = k("#ct-con");
        e.mang = k("#ct-mang");
        e.hasat = k("#ct-hasat");
        e.bo = k("#ct-bo");
        e.buff = k("#ct-buff");
        e.xem = k("#ct-xem");
        e.xemTen = k("#ct-xem-ten");
        e.dem = k("#ct-dem");
        e.banner = k("#ct-banner");
        e.guc = k("#ct-guc");
        e.bao = k("#ct-bao");
        e.mo = k("#ct-mo");
        e.kq = k("#ct-ketqua");
        k("#ct-toast-min").addEventListener("click", function () {
          N(!0);
        });
        e.toastPill.addEventListener("click", function () {
          N(!1);
        });
        k("#ct-toast-more").addEventListener("click", function () {
          a.show();
        });
        e.toastAct.addEventListener("click", function () {
          w(e.toastAct.dataset.act);
        });
        e.act.addEventListener("click", function () {
          w(e.act.dataset.act);
        });
        k("#ct-close").addEventListener("click", function () {
          a.hide();
        });
        e.panel.addEventListener("click", function (t) {
          if (t.target === e.panel) {
            a.hide();
          }
        });
        k("#ct-kq-dong").addEventListener("click", function () {
          e.kq.classList.add("hidden");
        });
        k("#ct-xem-truoc").addEventListener("click", function () {
          x("theoDoi", { huong: -1 });
        });
        k("#ct-xem-sau").addEventListener("click", function () {
          x("theoDoi", { huong: 1 });
        });
        k("#ct-xem-roi").addEventListener("click", function () {
          x("roi");
        });
        e.mo.addEventListener("click", function () {
          a.moRuongGan();
        });
        ["pointerdown", "mousedown", "touchstart"].forEach(function (t) {
          [e.xem, e.mo].forEach(function (n) {
            n.addEventListener(t, function (t) {
              t.stopPropagation();
            }, { passive: !0 });
          });
        });
        window.addEventListener("resize", function () {
          l.key = "";
          a.updateToast();
        });
      }
    };
    a.show = function () {
      if (e.panel) {
        a.open = !0;
        e.panel.classList.remove("hidden");
        if (e.toast) {
          e.toast.classList.add("hidden");
        }
        x("xem");
        R();
      }
    };
    a.hide = function () {
      if (e.panel) {
        a.open = !1;
        e.panel.classList.add("hidden");
        l.key = "";
        a.updateToast();
      }
    };
    a.toggle = function () {
      if (a.open) {
        a.hide();
      }
      else {
        a.show();
      }
    };
    a.nhan = function (r) {
      var d;
      var h;
      var s;
      var u;
      if (r && e.root) {
        switch ((r.serverNow && function (t) {
          if (t > 0) {
            var n = t - Date.now();
            if (!i || Math.abs(n - o) > 4e3) {
              o = n;
              return void (i = !0);
            }
            o += .2 * (n - o);
          }
        }(r.serverNow), r.act)) {
          case "st":
            a.st = r;
            l.key = "";
            R();
            a.updateToast();
            break;
          case "tha":
            !function (n) {
              var a = C();
              var e = c.mapTruoc;
              if ((c = m()).mapTruoc = e, c.tha = n, c.khoaDen = n.khoaMs > 0 ? (n.serverNow || p()) + n.khoaMs : 0, a && (c.hpMaxGoc = a.hpMax), A(), n.khoaMs > 0) {
                G("Xuống Vạn Hoang!", "Bảng " + (n.tenBang || "") + " · " + n.n + " người");
                var o = t.ChienTruongArt;
                if (a && o && o.ct && o.ct.hieuUng) {
                  o.ct.hieuUng("roi", a.x, a.y);
                }
              }
            }(r);
            break;
          case "bo":
            c.bo = { t0: r.t0, r0: r.r0, tam: r.tam, ds: r.ds || [] };
            break;
          case "nhip":
            !function (t) {
              c.nhip = t;
              T(t.hpMax);
              if (!("LOAI" !== t.trangThai || c.bong || c.loai)) {
                c.loai = { hang: 0 };
              }
            }(r);
            break;
          case "vat":
            !function (t) {
              var n;
              var a;
              var e = t.them || {};
              var o = t.bo || {};
              for (n = 0; e.b && n < e.b.length; n++)
                a = e.b[n], c.bui[a[0]] = { id: a[0], x: a[1], y: a[2], bien: a[0] % 3 };
              for (n = 0; e.r && n < e.r.length; n++)
                a = e.r[n], c.ruong[a[0]] = { id: a[0], x: a[1], y: a[2], vang: !!a[3] };
              for (n = 0; o.b && n < o.b.length; n++)
                delete c.bui[o.b[n]];
              for (n = 0; o.r && n < o.r.length; n++)
                delete c.ruong[o.r[n]];
              for (c.lay = Object.create(null), n = 0; t.lay && n < t.lay.length; n++)
                c.lay[t.lay[n]] = 1;
            }(r);
            break;
          case "an":
            c.an = !!r.on;
            if (!(r.on || "danh" !== r.ly)) {
              G("Lộ thân!", "");
            }
            break;
          case "mo":
            c.mo = { id: r.id, bd: Date.now(), ms: r.ms };
            break;
          case "moXong":
            c.mo = null;
            if (r.buff) {
              G("Nhận buff " + (r.buff.ten || "") + (r.buff.vang ? " (vàng)" : ""), (s = r.buff, u = Math.round(100 * (s.pct || 0)), "hoi" === s.k ? "+" + u + "% Khí Huyết mỗi giây · " + s.giay + " giây" : "giap" === s.k ? "Hộ thuẫn " + u + "% Khí Huyết · " + s.giay + " giây" : "+" + u + "% · " + s.giay + " giây"));
            }
            break;
          case "moHuy":
            c.mo = null;
            if (r.why) {
              D(r.why, "warn");
            }
            break;
          case "buff":
            !function (t) {
              c.buff = (t.ds || []).map(function (t) {
                return { k: t.k, tang: t.tang, pct: t.pct, den: Date.now() + 1e3 * t.con };
              });
              T(t.hpMax);
            }(r);
            break;
          case "guc":
            c.guc = { den: r.den || p() + (r.cho || 0), mang: r.mang };
            break;
          case "hoiSinh":
            c.guc = null;
            G("Hồi sinh!", "Còn " + r.mang + " mạng · khiên 3 giây");
            d = C();
            h = t.ChienTruongArt;
            if (d && h && h.ct && h.ct.hieuUng) {
              h.ct.hieuUng("hoi", d.x, d.y);
            }
            break;
          case "loai":
            c.guc = null;
            c.loai = r;
            G("BỊ LOẠI · hạng " + r.hang + "/" + r.soNguoi, r.haSat + " hạ sát");
            break;
          case "bong":
            c.bong = !0;
            c.an = !1;
            c.guc = null;
            A();
            break;
          case "xem":
            !function (n) {
              c.xem = { id: n.id, ten: n.ten, x: n.x, y: n.y };
              var a = C();
              if (a && "number" == typeof n.x && "number" == typeof n.y) {
                a.x = n.x;
                a.y = n.y;
                var e = t.SceneWorld && t.SceneWorld.map;
                if (t.Camera && t.Camera.snapTo && t.Renderer && e) {
                  t.Camera.snapTo(a.x, a.y, t.Renderer.w, t.Renderer.h, e.pxWidth, e.pxHeight);
                }
              }
            }(r);
            break;
          case "ketqua":
            c.ketqua = r;
            (function () {
              var t = c.ketqua;
              if (t && e.kq) {
                M(k("#ct-kq-hang"), "Hạng " + t.hang + " / " + t.soNguoi + " · " + (t.tenBang || ""));
                var a = k("#ct-kq-top");
                a.innerHTML = "";
                var o = document.createElement("div");
                o.textContent = "Đạo hữu hạ " + t.haSat + " người. Top " + n.HANG_CO_QUA + ":";
                a.appendChild(o);
                (t.top || []).forEach(function (t) {
                  var n = document.createElement("div");
                  n.textContent = "#" + t.hang + " " + t.ten + " · " + t.haSat + " hạ sát";
                  a.appendChild(n);
                });
                e.kq.classList.remove("hidden");
              }
            })();
            break;
          case "veCho":
            c.bong = !1;
            c.guc = null;
            A();
            break;
          case "banner":
            if (L()) {
              G(r.text, r.phu);
            }
            break;
          case "bao": if (L()) {
            D(r.text, r.kieu);
          }
        }
      }
    };
    var d = 0;
    a.update = function (o) {
      if (e.root) {
        var i;
        var r = v();
        if (r !== c.mapTruoc) {
          if (c.mapTruoc === n.MAP && r !== n.MAP) {
            if ((i = C()) && c.hpMaxGoc && i.hpMax !== c.hpMaxGoc) {
              i.hpMax = c.hpMaxGoc;
              if (i.hp > i.hpMax) {
                i.hp = i.hpMax;
              }
            }
            c = m();
            A();
            [e.hud, e.xem, e.mo, e.guc, e.dem, e.banner].forEach(function (t) {
              if (t) {
                t.classList.add("hidden");
              }
            });
            if (e.bao) {
              e.bao.innerHTML = "";
            }
          }
          c.mapTruoc = r;
          A();
          l.key = "";
          if (r === n.MAP_CHO) {
            x("xem");
          }
        }
        var h;
        var s = Date.now();
        if (s - d >= 100) {
          d = s;
          (function () {
            var t = L() && !!c.tha;
            if (e.hud.classList.toggle("hidden", !t), t) {
              var a = c.nhip;
              var o = c.bong;
              M(e.con, "⚔ " + (a ? a.con : c.tha.n) + " / " + c.tha.n);
              e.mang.classList.toggle("hidden", o);
              e.hasat.classList.toggle("hidden", o);
              var i = a ? a.mang : c.tha.mang;
              M(e.mang, new Array(Math.max(0, i) + 1).join("♥") + new Array(Math.max(0, n.MANG - i) + 1).join("♡"));
              M(e.hasat, "Hạ " + (a ? a.haSat : 0));
              var r = S();
              var l = "";
              if (a && a.ngoai && !o) {
                l = "⚠ NGOÀI VÒNG BO · -" + Math.round(100 * (r ? r.sat : .01)) + "%/giây";
              }
              else {
                if (r) {
                  l = "cho" === r.pha ? "Vòng bo đầu hiện sau " + y(r.toiGd) : "dung" === r.pha ? "Bo thu hẹp sau " + y(r.toiCo) : "co" === r.pha ? "Bo đang thu hẹp · còn " + y(r.toiHet) : null != r.toiGd ? "Vòng kế sau " + y(r.toiGd) : "Vòng cuối cùng";
                  if (c.an) {
                    l = "🌿 Đang ẩn · " + l;
                  }
                }
              }
              M(e.bo, l);
              e.bo.classList.toggle("ngoai", !(!a || !a.ngoai || o));
              for (var d = "", h = 0; !o && h < c.buff.length; h++) {
                var s = c.buff[h];
                var u = Math.ceil((s.den - Date.now()) / 1e3);
                if (!(u <= 0)) {
                  var g = n.BUFF[s.k];
                  d += '<span class="ct-bf ' + s.k + '">' + (g ? g.ten : s.k) + (s.tang > 1 ? " ×" + s.tang : "") + " " + s.pct + "% · " + u + "s</span>";
                }
              }
              if (e.buff._h !== d) {
                e.buff._h = d;
                e.buff.innerHTML = d;
              }
            }
          })();
          u = c.khoaDen - p();
          g = "";
          if (L() && !c.bong && c.khoaDen && u > -800) {
            g = u > 0 ? String(Math.ceil(u / 1e3)) : "Chiến!";
          }
          if (e.dem.textContent !== g) {
            e.dem.textContent = g;
            e.dem.classList.toggle("hidden", !g);
            e.dem.classList.toggle("go", "Chiến!" === g);
            e.dem.classList.remove("pop");
            e.dem.offsetWidth;
            if (g) {
              e.dem.classList.add("pop");
            }
          }
          (function () {
            var t = C();
            var n = "";
            var a = "";
            if (L() && !c.bong && t && t.downed) {
              if (c.guc) {
                n = "TRỌNG THƯƠNG";
                a = "Hồi sinh sau " + Math.max(0, Math.ceil((c.guc.den - p()) / 1e3)) + " giây · còn " + c.guc.mang + " mạng";
              }
              else {
                if (c.loai) {
                  n = "BỊ LOẠI";
                  a = c.loai.hang ? "Hạng " + c.loai.hang + "/" + c.loai.soNguoi : "";
                }
              }
            }
            var o = n + "|" + a;
            if (e.guc._k !== o) {
              e.guc._k = o;
              e.guc.classList.toggle("hidden", !n);
              e.guc.querySelector("strong").textContent = n;
              e.guc.querySelector("small").textContent = a;
            }
          })();
          h = a.dangXem();
          e.xem.classList.toggle("hidden", !h);
          if (h) {
            M(e.xemTen, c.xem ? c.xem.ten : "…");
          }
          (function () {
            var t = a.ruongGan();
            var n = !!t && !c.mo;
            e.mo.classList.toggle("hidden", !n);
            if (n) {
              M(e.mo, t.vang ? "Mở Rương Vàng" : "Mở Rương");
            }
          })();
          if (a.open) {
            R();
          }
        }
        if (s - l.ve >= 250) {
          l.ve = s;
          a.updateToast();
        }
        if (c.banner && s > c.banner.han) {
          c.banner = null;
          e.banner.classList.add("hidden");
        }
        if (a.dangXem()) {
          (function () {
            var n = C();
            if (n && c.xem) {
              var a = t.Gateway && t.Gateway.remotes && t.Gateway.remotes[c.xem.id];
              if (a && "number" == typeof a.x && "number" == typeof a.y) {
                n.x = a.x;
                n.y = a.y;
              }
            }
          })();
        }
      }
      var u;
      var g;
    };
    a.ruongGan = function () {
      var t = C();
      if (!t || !L() || c.bong || t.downed) {
        return null;
      }
      var a = null;
      var e = n.RUONG_TAM_PX + 24;
      var o = e * e;
      for (var i in c.ruong) {
        var r = c.ruong[i];
        var l = r.x - t.x;
        var d = r.y - t.y;
        var h = l * l + d * d;
        if (h <= o) {
          a = r;
          o = h;
        }
      }
      return a;
    };
    a.moRuongGan = function () {
      var t = a.ruongGan();
      return !(!t || c.mo || (x("moRuong", { id: t.id }), 0));
    };
    a.toastModel = function (t, a, e, o) {
      var i = t;
      var c = a && a.lich && a.lich.id === i.id ? a : null;
      var r = !(!c || !c.daGhi);
      var l = "Kỳ " + n.gioDoc(i.batDauLuc);
      var d = { id: i.id, sub: l, label: "", clock: "", fill: 0, urgent: !1, act: null, btn: "", why: "" };
      function h(t, n, a) {
        var o = Math.max(0, t - e);
        d.clock = y(o);
        d.fill = n ? Math.max(0, Math.min(1, o / Math.max(1, t - n))) : 0;
        d.urgent = o <= a;
      }
      if (o === n.MAP) {
        return null;
      }
      var s = c && c.tenBang ? " · " + c.tenBang : "";
      if (o === n.MAP_CHO) {
        d.act = "roi";
        var u = c && c.trangThai;
        if ("LOAI" === u || "XONG" === u) {
          d.label = "LOAI" === u ? "Đã bị loại" : "Đã xong kỳ này";
          d.sub = l + (c.hang ? " · hạng " + c.hang : "");
          d.btn = "Về Làng";
        }
        else {
          if ("DANG_DAU" === i.giaiDoan && c && c.daTha) {
            d.label = "Đang thả xuống";
            d.sub = l + s;
            d.btn = "Về Làng";
          }
          else {
            h(i.batDauLuc, i.moPhongChoLuc, 15e3);
            d.label = "Vào đảo sau";
            d.sub = l + s;
            d.btn = "Rút Tên";
          }
        }
        return d;
      }
      if ("DANG_KY" === i.giaiDoan) {
        if (h(i.moPhongChoLuc, i.moDangKyLuc, 6e4), d.label = "Chốt sổ sau", d.sub = l + s, c && c.bang && c.huy && c.huy[c.bang]) {
          d.why = "Bảng này thiếu người nên huỷ.";
        }
        else if (r && c.soNguoiBang && c.bang) {
          var g = c.soNguoiBang[c.bang] || 0;
          if (g < c.nguong) {
            d.why = "Bảng có " + g + "/" + c.nguong + " người cần để mở.";
          }
        }
        d.act = r ? null : "ghi_danh";
        d.btn = r ? "✓ Đã ghi danh" : "Ghi Danh";
        return d;
      }
      return r && "PHONG_CHO" === i.giaiDoan ? (h(i.batDauLuc, i.moPhongChoLuc, 15e3), d.label = "Vào đảo sau", d.sub = l + s, d.btn = "Chờ thả xuống", d) : null;
    };
    a.updateToast = function () {
      if (e.toast) {
        var o;
        var i = p();
        var c = n.lich(i);
        var d = v();
        var h = d === n.MAP_CHO || d === n.MAP;
        var s = t.Gateway && t.Gateway.ready && ((o = C()) && o.realmId && n.bangCua(o.realmId).bang || h) ? a.toastModel(c, a.st, i, d) : null;
        if (s && l.suat !== s.id) {
          l.suat = s.id;
          l.thuGon = function (t) {
            try {
              return window.localStorage.getItem(r) === t;
            }
            catch (t) {
              return !1;
            }
          }(s.id);
          l.key = "";
          x("xem");
        }
        var u = !!s && !a.open;
        if (e.toast.classList.toggle("hidden", !u), u) {
          var g = [s.sub, s.label, s.clock, s.btn, s.act, s.why, l.thuGon, s.urgent].join("|");
          if (g !== l.key) {
            l.key = g;
            e.toast.classList.toggle("min", l.thuGon);
            e.toast.classList.toggle("urgent", s.urgent);
            e.toastCard.classList.toggle("hidden", l.thuGon);
            e.toastPill.classList.toggle("hidden", !l.thuGon);
            M(e.toastPillClock, s.clock || "Chiến Trường");
            M(e.toastSub, s.sub);
            M(e.toastLabel, s.label);
            M(e.toastClock, s.clock);
            M(e.toastMsg, s.why);
            e.toastMsg.classList.toggle("hidden", !s.why);
            e.toastAct.dataset.act = s.act || "";
            e.toastAct.textContent = s.btn;
            e.toastAct.disabled = !s.act;
            e.toastAct.classList.toggle("main", !!s.act);
            e.toastAct.classList.toggle("done", !s.act);
            (function () {
              var t = e.toast;
              var n = document.getElementById("hud-right");
              var a = n && n.getBoundingClientRect();
              var o = window.innerWidth;
              if (!a || !a.width) {
                t.style.top = "12px";
                return void (t.style.right = "12px");
              }
              var i = document.getElementById("party-hud");
              var c = i && !i.classList.contains("hidden") && i.getBoundingClientRect();
              if (c && c.width && c.top < a.bottom && c.right <= a.left + 1) {
                a = { left: c.left, top: a.top, right: a.right, bottom: a.bottom, width: a.width };
              }
              var r;
              var l;
              var d = t.getBoundingClientRect().width || 196;
              if (a.left - 8 - d >= 8) {
                r = Math.round(a.top);
                l = Math.round(o - a.left + 8);
              }
              else {
                r = Math.round(a.bottom + 6);
                l = Math.round(o - a.right);
              }
              var h = 0;
              ["dh-toast", "tmc-toast"].forEach(function (t) {
                var n = document.getElementById(t);
                if (n && !n.classList.contains("hidden")) {
                  var a = n.getBoundingClientRect();
                  if (a.width) {
                    h = Math.max(h, a.bottom + 6);
                  }
                }
              });
              if (h) {
                r = Math.max(r, Math.round(h));
              }
              t.style.top = r + "px";
              t.style.right = l + "px";
            })();
          }
        }
      }
    };
    var h = { GHI_DANH: "Đã ghi danh", CHO: "Đang ở Phòng Chờ", DANG_DAU: "Đang trong trận", LOAI: "Đã bị loại", XONG: "Đã xong kỳ này", HUY: "Bảng đã huỷ" };
    var s = { CHUA_MO: "Chưa mở sổ", DANG_KY: "Đang nhận ghi danh", PHONG_CHO: "Sắp thả xuống", DANG_DAU: "Đang diễn ra" };
    a.drawGround = function (n, a, e, o) {
      if (L() && c.tha && t.Renderer && t.Renderer.w) {
        var i = S();
        if (i) {
          var r = t.Renderer.w;
          var l = t.Renderer.h;
          var d = t.ChienTruongArt;
          if (!(d && d.ct && d.ct.veBo && d.ct.veBo(n, a, e, r, l, o, i, t.Quality ? t.Quality.tier : 2))) {
            var h = i.x - a;
            var s = i.y - e;
            n.save();
            n.beginPath();
            n.rect(0, 0, r, l);
            if (i.r > 0) {
              n.arc(h, s, i.r, 0, 2 * Math.PI, !0);
            }
            var u = .5 + .5 * Math.sin(3.2 * o);
            n.fillStyle = "rgba(190, 36, 36, " + (.26 + .08 * u).toFixed(3) + ")";
            n.fill("evenodd");
            if (i.r > 0) {
              n.lineWidth = 8;
              n.strokeStyle = "rgba(255,255,255,0.12)";
              n.beginPath();
              n.arc(h, s, i.r + 4, 0, 2 * Math.PI);
              n.stroke();
              n.lineWidth = 3;
              n.strokeStyle = "rgba(255,255,255,0.88)";
              n.beginPath();
              n.arc(h, s, i.r, 0, 2 * Math.PI);
              n.stroke();
            }
            if (i.dich && i.dich.r > 0 && "xong" !== i.pha) {
              n.lineWidth = 2.5;
              n.setLineDash([14, 10]);
              n.lineDashOffset = 16 * -o;
              n.strokeStyle = "rgba(120, 205, 255, 0.95)";
              n.beginPath();
              n.arc(i.dich.x - a, i.dich.y - e, i.dich.r, 0, 2 * Math.PI);
              n.stroke();
              n.setLineDash([]);
            }
            n.restore();
          }
        }
      }
    };
    a.veMini = function (n, a) {
      if (L() && c.tha) {
        var e = t.CONFIG.TILE;
        var o = S();
        if (o) {
          n.save();
          n.lineWidth = 1;
          n.strokeStyle = "rgba(255,255,255,0.95)";
          n.beginPath();
          n.arc(o.x / e * a, o.y / e * a, Math.max(.5, o.r / e * a), 0, 2 * Math.PI);
          n.stroke();
          if (o.dich && o.dich.r > 0 && "xong" !== o.pha) {
            n.strokeStyle = "rgba(120,205,255,0.95)";
            n.setLineDash([2, 2]);
            n.beginPath();
            n.arc(o.dich.x / e * a, o.dich.y / e * a, Math.max(.5, o.dich.r / e * a), 0, 2 * Math.PI);
            n.stroke();
          }
          n.restore();
        }
      }
    };
    var u = [];
    var g = null;
    var f = null;
    var b = null;
    a.khoiSprite = q;
    a.depthItems = function (n) {
      if (L() && c.tha && t.Camera && t.Renderer) {
        q();
        var a;
        var e = t.Camera.renderX();
        var o = t.Camera.renderY();
        var i = t.Renderer.w;
        var r = t.Renderer.h;
        for (a in c.bui)
          (function (t) {
            if (!(t.x < e - 70 || t.x > e + i + 70 || t.y < o - 60 || t.y > o + r + 70)) {
              n.push({ y: t.y + 14, fn: function (n, a, e, o) {
                  var i = c.lay[t.id] ? Math.round(2 * Math.sin(22 * o + t.id)) : 0;
                  n.drawImage(u[t.bien % u.length], Math.round(t.x - 56 + i - a), Math.round(t.y - 74 - e));
                } });
            }
          })(c.bui[a]);
        for (a in c.ruong)
          (function (t) {
            if (!(t.x < e - 40 || t.x > e + i + 40 || t.y < o - 40 || t.y > o + r + 40)) {
              n.push({ y: t.y + 12, fn: function (n, a, e, o) {
                  var i = Math.round(t.x - 24 - a);
                  var r = Math.round(t.y - 32 - e);
                  if (t.vang) {
                    var l = .5 + .5 * Math.sin(4 * o + t.id);
                    var d = n.createRadialGradient(i + 24, r + 24, 4, i + 24, r + 24, 42);
                    d.addColorStop(0, "rgba(255,224,120," + (.45 + .25 * l).toFixed(2) + ")");
                    d.addColorStop(1, "rgba(255,224,120,0)");
                    n.fillStyle = d;
                    n.fillRect(i - 22, r - 16, 92, 84);
                  }
                  if (n.drawImage(t.vang ? f : g, i, r), c.mo && c.mo.id === t.id) {
                    var h = Math.min(1, (Date.now() - c.mo.bd) / c.mo.ms);
                    n.fillStyle = "rgba(0,0,0,0.65)";
                    n.fillRect(i + 2, r - 8, 44, 7);
                    n.fillStyle = "#ffd36a";
                    n.fillRect(i + 3, r - 7, Math.round(42 * h), 5);
                  }
                } });
            }
          })(c.ruong[a]);
      }
    };
    a.drawFront = function (n, a, e, o) {
      var i = t.ChienTruongArt;
      if (i && i.ct && i.ct.veBoVien && L() && c.tha && !c.bong && c.nhip && c.nhip.ngoai && t.Renderer) {
        i.ct.veBoVien(n, t.Renderer.w, t.Renderer.h, o, !0);
      }
      var r = C();
      if (L() && r && !c.bong && c.tha && c.an) {
        q();
        n.save();
        n.globalAlpha = .62;
        n.drawImage(b, Math.round(r.x - 30 - a), Math.round(r.y - 54 - e));
        n.globalAlpha = 1;
        n.font = "700 11px sans-serif";
        n.textAlign = "center";
        n.fillStyle = "rgba(0,0,0,0.6)";
        n.fillText("ẨN", Math.round(r.x - a) + 1, Math.round(r.y - 76 - e) + 1);
        n.fillStyle = "#b6f09a";
        n.fillText("ẨN", Math.round(r.x - a), Math.round(r.y - 76 - e));
        n.restore();
      }
    };
  }
  function m() {
    return { tha: null, bo: null, nhip: null, an: !1, bui: Object.create(null), ruong: Object.create(null), lay: Object.create(null), mo: null, buff: [], guc: null, loai: null, bong: !1, xem: null, hpMaxGoc: 0, ketqua: null, khoaDen: 0, banner: null, mapTruoc: "" };
  }
  function v() {
    var n = t.SceneWorld && t.SceneWorld.map;
    return n && n.data && n.data.id || "";
  }
  function p() {
    return Date.now() + o;
  }
  function y(t) {
    return n.dem(t);
  }
  function x(n, a, e) {
    if (t.Gateway && t.Gateway.chienTruong) {
      t.Gateway.chienTruong(n, a, e);
    }
  }
  function k(t) {
    return document.querySelector(t);
  }
  function M(t, n) {
    if (t && t.textContent !== n) {
      t.textContent = n;
    }
  }
  function C() {
    return t.SceneWorld && t.SceneWorld.player;
  }
  function L() {
    return v() === n.MAP;
  }
  function w(t) {
    if ("ghi_danh" === t) {
      x("ghiDanh");
    }
    else {
      if ("huy" === t) {
        x("huy");
      }
      else {
        if ("roi" === t) {
          x("roi");
        }
      }
    }
  }
  function T(t) {
    var n = C();
    if (n && t > 0 && L() && n.hpMax !== t) {
      if (!(c.hpMaxGoc)) {
        c.hpMaxGoc = n.hpMax;
      }
      n.hpMax = t;
      if (n.hp > n.hpMax) {
        n.hp = n.hpMax;
      }
    }
  }
  function G(t, n) {
    if (e.banner && t) {
      c.banner = { han: Date.now() + 3600 };
      e.banner.querySelector("strong").textContent = t;
      e.banner.querySelector("small").textContent = n || "";
      e.banner.classList.remove("hidden");
      e.banner.classList.remove("pop");
      e.banner.offsetWidth;
      e.banner.classList.add("pop");
    }
  }
  function D(t, n) {
    if (e.bao && t) {
      var a = document.createElement("div");
      for (a.className = "ct-tin " + (n || "info"), a.textContent = t, e.bao.appendChild(a); e.bao.children.length > 4;)
        e.bao.removeChild(e.bao.firstChild);
      setTimeout(function () {
        if (a.parentNode) {
          a.parentNode.removeChild(a);
        }
      }, 7e3);
    }
  }
  function A() {
    if (document.body) {
      document.body.classList.toggle("ct-tran", L() && !c.bong);
      document.body.classList.toggle("ct-bong", L() && c.bong);
    }
  }
  function S() {
    return c.bo ? n.boTai({ r0: c.bo.r0, tam0: c.bo.tam, gd: c.bo.ds }, p() - c.bo.t0) : null;
  }
  function N(t) {
    l.thuGon = !!t;
    try {
      if (t && l.suat) {
        window.localStorage.setItem(r, l.suat);
      }
      else {
        window.localStorage.removeItem(r);
      }
    }
    catch (t) {
    }
    l.key = "";
    a.updateToast();
  }
  function R() {
    if (e.panel && !e.panel.classList.contains("hidden")) {
      var t;
      var o;
      var i = a.st;
      var c = p();
      var r = n.lich(c);
      M(e.phase, s[r.giaiDoan] || r.giaiDoan);
      if ("CHUA_MO" === r.giaiDoan) {
        t = r.moDangKyLuc;
        o = "mở sổ ghi danh";
      }
      else {
        if ("DANG_KY" === r.giaiDoan) {
          t = r.moPhongChoLuc;
          o = "chốt sổ, vào Phòng Chờ";
        }
        else {
          if ("PHONG_CHO" === r.giaiDoan) {
            t = r.batDauLuc;
            o = "thả xuống chiến trường";
          }
          else {
            t = r.ketThucLuc;
            o = "hết trận";
          }
        }
      }
      M(e.clock, y(t - c));
      var l = ["Còn " + y(t - c) + " nữa " + o + ".", "Sống sót cuối cùng thắng · 3 mạng · chỉ đánh thường · top " + n.HANG_CO_QUA + " có thưởng như Đại Hội.", "Mở tối Thứ Hai và Thứ Sáu, " + n.GIO_KHAI[0] + ":00.", "Bo thu dần · ẩn trong bụi · rương cho buff."];
      if (i && i.soNguoiBang) {
        l.push("Đã ghi danh: Luyện Khí " + (i.soNguoiBang.luyen_khi || 0) + " · Trúc Cơ " + (i.soNguoiBang.truc_co || 0) + " (mỗi bảng cần " + i.nguong + ", tối đa " + i.toiDa + ").");
        if (i.daGhi) {
          l.push("Đạo hữu: " + (h[i.trangThai] || i.trangThai) + " · bảng " + (i.tenBang || "") + " · lượt hôm nay " + i.luot.da + "/" + i.luot.toiDa + ".");
        }
        else {
          if (i.tuCachWhy) {
            l.push(i.tuCachWhy);
          }
          else {
            l.push("Bảng của đạo hữu: " + (i.tenBang || "—") + " · lượt hôm nay " + i.luot.da + "/" + i.luot.toiDa + ".");
          }
        }
        var d = i.ketQuaTruoc;
        if (d && d.bang) {
          ["luyen_khi", "truc_co"].forEach(function (t) {
            var n = d.bang[t];
            if (n) {
              if (n.huy) {
                l.push("Kỳ trước · " + n.ten + ": huỷ (thiếu người).");
              }
              else {
                if (n.top && n.top.length) {
                  l.push("Kỳ trước · " + n.ten + ": " + n.top.map(function (t) {
                    return "#" + t.hang + " " + t.ten;
                  }).join(" · "));
                }
              }
            }
          });
        }
      }
      else {
        l.push("Đang chờ máy chủ…");
      }
      var u = l.join("");
      if (e.info._h !== u) {
        e.info._h = u;
        e.info.innerHTML = "";
        for (var g = 0; g < l.length; g++) {
          var f = document.createElement("div");
          f.textContent = l[g];
          e.info.appendChild(f);
        }
      }
      var b;
      var m = null;
      var x = !0;
      var k = v();
      if (i && k === n.MAP_CHO) {
        m = "roi";
        x = !1;
        b = "LOAI" === i.trangThai || "XONG" === i.trangThai ? "Về Làng" : "Rút Tên · Về Làng";
      }
      else {
        if (i && i.daGhi) {
          if ("DANG_KY" === r.giaiDoan) {
            m = "huy";
            b = "Rút tên khỏi sổ";
            x = !1;
          }
          else {
            b = h[i.trangThai] || "Đã ghi danh";
          }
        }
        else {
          if (i && "DANG_KY" === r.giaiDoan && i.bang) {
            m = "ghi_danh";
            b = "Ghi Danh";
            x = !1;
          }
          else {
            b = "DANG_KY" === r.giaiDoan ? "Chưa đủ tư cách" : "Chưa tới giờ ghi danh";
          }
        }
      }
      e.act.dataset.act = m || "";
      M(e.act, b);
      e.act.disabled = x;
    }
  }
  function H(t, n) {
    var a = document.createElement("canvas");
    a.width = t;
    a.height = n;
    return a;
  }
  function P(t) {
    var n = H(2 * t.width, 2 * t.height);
    var a = n.getContext("2d");
    a.imageSmoothingEnabled = !1;
    a.drawImage(t, 0, 0, n.width, n.height);
    return n;
  }
  function _(t, n, a, e, o) {
    t.fillStyle = o;
    for (var i = -e; i <= e; i++) {
      var c = Math.floor(Math.sqrt(e * e - i * i) + .5);
      t.fillRect(n - c, a + i, 2 * c + 1, 1);
    }
  }
  function O(t, n, a, e, o, i) {
    t.fillStyle = i;
    for (var c = -o; c <= o; c++) {
      var r = Math.floor(e * Math.sqrt(1 - c * c / (o * o)) + .5);
      t.fillRect(n - r, a + c, 2 * r + 1, 1);
    }
  }
  function B(t) {
    var n = t >>> 0 || 1;
    return function () {
      return (n = 1664525 * n + 1013904223 >>> 0) / 4294967296;
    };
  }
  function I(t) {
    var n = H(56, 46);
    var a = n.getContext("2d");
    var e = B(9173 + 77 * t);
    O(a, 28, 39, 25, 5, "rgba(0,0,0,0.30)");
    for (var o = ["#1d4025", "#285a2e", "#37773a", "#4d9645", "#78bd58"], i = [{ y: 31, du: 22, so: 7, r: 9 }, { y: 27, du: 19, so: 6, r: 9 }, { y: 22, du: 15, so: 5, r: 8 }, { y: 17, du: 11, so: 4, r: 7 }, { y: 12, du: 7, so: 3, r: 5 }], c = 0; c < i.length; c++)
      for (var r = i[c], l = 0; l < r.so; l++)
        _(a, Math.round(28 + 2 * (l / Math.max(1, r.so - 1) - .5) * r.du + 4 * (e() - .5)), Math.round(r.y + 5 * (e() - .5)), r.r - (e() < .35 ? 1 : 0), o[c]);
    for (var d = ["#a6dc72", "#c9ef8c"], h = 0; h < 16; h++)
      _(a, Math.round(14 + 28 * e()), Math.round(9 + 22 * e()), 1, d[1 & h]);
    if (1 === t) {
      for (var s = 0; s < 7; s++)
        _(a, Math.round(12 + 32 * e()), Math.round(14 + 20 * e()), 1, "#e8605a");
    }
    if (2 === t) {
      for (var u = 0; u < 6; u++) {
        var g = Math.round(12 + 32 * e());
        var f = Math.round(12 + 20 * e());
        a.fillStyle = "#fff3c4";
        a.fillRect(g, f, 2, 2);
        a.fillStyle = "#ffd55a";
        a.fillRect(g, f, 1, 1);
      }
    }
    return P(n);
  }
  function E(t) {
    var n = H(24, 21);
    var a = n.getContext("2d");
    O(a, 12, 18, 10, 2, "rgba(0,0,0,0.32)");
    var e = t ? "#d9a62a" : "#8a5a2b";
    var o = t ? "#7d540c" : "#4a2d12";
    var i = t ? "#ffe28a" : "#b27a40";
    var c = t ? "#fff3b8" : "#3a3a42";
    var r = t ? "#5a3c08" : "#e0c870";
    a.fillStyle = o;
    a.fillRect(3, 9, 18, 8);
    a.fillStyle = e;
    a.fillRect(4, 10, 16, 6);
    a.fillStyle = o;
    a.fillRect(3, 6, 18, 4);
    a.fillRect(4, 4, 16, 2);
    a.fillRect(6, 3, 12, 1);
    a.fillStyle = e;
    a.fillRect(4, 6, 16, 3);
    a.fillRect(5, 5, 14, 1);
    a.fillStyle = i;
    a.fillRect(5, 6, 14, 1);
    a.fillRect(5, 10, 14, 1);
    a.fillStyle = c;
    a.fillRect(3, 8, 18, 1);
    a.fillRect(10, 4, 4, 13);
    a.fillStyle = r;
    a.fillRect(11, 10, 2, 3);
    return P(n);
  }
  function q() {
    if (!u.length) {
      for (var t = 0; t < 3; t++)
        u.push(I(t));
      g = E(!1);
      f = E(!0);
      b = function () {
        for (var t = H(30, 24), n = t.getContext("2d"), a = B(4421), e = ["#285a2e", "#37773a", "#4d9645", "#78bd58"], o = 0; o < 4; o++)
          for (var i = 0; i < 5 - o; i++)
            _(n, Math.round(15 + (a() - .5) * (22 - 4 * o)), Math.round(16 - 3 * o + 4 * (a() - .5)), 5 - (o > 2 ? 1 : 0), e[o]);
        return P(t);
      }();
    }
  }
}(window.PNTT);
