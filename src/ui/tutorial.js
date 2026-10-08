!function (t) {
  "use strict";
  var n = t.Utils;
  var e = t.Tutorial = { active: !1, step: -1 };
  var i = {};
  var r = null;
  var a = null;
  var o = !1;
  function u() {
    return t.SceneWorld;
  }
  function d() {
    var t = u();
    return t && t.player;
  }
  function c() {
    return t.Input && "touch" === t.Input.mode;
  }
  function l() {
    return !(!t.TouchUI || !t.TouchUI.visible);
  }
  function h() {
    return !(!t.TouchUI || "joystick" !== t.TouchUI.controlStyle);
  }
  function s(t) {
    return "<kbd>" + t + "</kbd>";
  }
  function g(t) {
    var n = t && document.querySelector(t);
    if (!n) {
      return null;
    }
    var e = n.getBoundingClientRect();
    return e.width < 4 || e.height < 4 || e.bottom < 0 || e.right < 0 || e.top > innerHeight || e.left > innerWidth ? null : n;
  }
  var f = [];
  function m(t, n, e, i) {
    var r = document.createElement("div");
    r.className = "tut-hole " + n;
    r.hidden = !0;
    document.body.appendChild(r);
    f.push({ ring: t, hole: r, dim: e, guard: i || null });
  }
  function b() {
    var t = i.hand;
    var n = i.ring;
    if (t)
      if (!n.hidden && n.style.width) {
        var e;
        var r;
        var a;
        var o = parseFloat(n.style.left);
        var u = parseFloat(n.style.top);
        var d = parseFloat(n.style.width);
        var c = parseFloat(n.style.height);
        var l = innerWidth;
        if (u + c + 78 < innerHeight) {
          e = o + d / 2;
          r = u + c - 10;
          a = 0;
        }
        else {
          if (u - 78 > 0) {
            e = o + d / 2;
            r = u + 10;
            a = 180;
          }
          else {
            if (o + d + 78 < l) {
              e = o + d - 10;
              r = u + c / 2;
              a = -90;
            }
            else {
              e = o + 10;
              r = u + c / 2;
              a = 90;
            }
          }
        }
        t.style.left = Math.round(e) + "px";
        t.style.top = Math.round(r) + "px";
        t.style.setProperty("--tut-rot", a + "deg");
        t.hidden = !1;
      }
      else {
        t.hidden = !0;
      }
  }
  var v = [{ title: "Bảng nhiệm vụ", body: function () {
        return "Việc cần làm ghi ở <b>bảng này</b>. Mũi tên vàng dưới chân nhân vật chỉ đường tới đó.";
      }, target: function () {
        return "#quest-tracker";
      }, dim: .78, ack: "Đã hiểu", done: function (t) {
        var n = Date.now() - t.startAt;
        return g("#quest-tracker") ? n > 45e3 : n > 6e3;
      } }, { title: "Di chuyển", body: function () {
        var t = h() ? "kéo vòng tròn ở góc trái" : "giữ các nút mũi tên ở góc trái";
        return l() && c() ? t.charAt(0).toUpperCase() + t.slice(1) + " để đi." : "Dùng " + s("W") + s("A") + s("S") + s("D") + " hoặc phím mũi tên để đi." + (l() ? " Hoặc " + t + "." : "");
      }, target: function () {
        return l() ? h() ? "#joystick .joystick-ring" : "#dpad" : null;
      }, dim: .76, done: function (t) {
        return t.dist >= 40;
      } }, { title: "Chạy cho nhanh", body: function () {
        return c() ? "Chạm nút <b>Chạy</b> để chạy nhanh hơn. Chạm lần nữa để đi bộ." : "Bấm " + s("Shift") + " để bật chạy, bấm lần nữa để đi bộ" + (l() ? " — hoặc bấm nút <b>Chạy</b>." : ".");
      }, target: function () {
        return l() ? g("#joystick-run") ? "#joystick-run" : "#btn-run" : null;
      }, avoid: function () {
        return h() ? "#joystick" : "#dpad";
      }, dim: .76, done: function () {
        return !(!t.Input || !t.Input.run);
      } }];
  function p(t) {
    return "pntt_tut_v1_" + String(t || "").toLowerCase();
  }
  function y(t) {
    e.step = t;
    var n = d();
    a.dist = 0;
    a.lastX = n ? n.x : 0;
    a.lastY = n ? n.y : 0;
    a.doneAt = 0;
    a.startAt = Date.now();
    i.card.classList.remove("tut-ok");
    (function () {
      var t = e.step;
      var n = t >= v.length;
      i.count.textContent = n ? "Hướng dẫn" : "Hướng dẫn " + (t + 1) + "/" + v.length;
      for (var r = "", a = 0; a < v.length; a++)
        r += '<i class="' + (a < t ? "on" : a === t ? "cur" : "") + '"></i>';
      if (i.dots.innerHTML = r, n) {
        i.title.textContent = "Sẵn sàng lên đường!";
        i.body.innerHTML = "Giờ đi theo mũi tên vàng để làm nhiệm vụ đầu tiên. Muốn xem lại: <b>Menu → Xem lại hướng dẫn</b>.";
        i.ack.textContent = "Bắt đầu";
        return void (i.ack.hidden = !1);
      }
      var o = v[t];
      i.title.textContent = o.title;
      i.body.innerHTML = o.body();
      i.ack.textContent = o.ack || "";
      i.ack.hidden = !o.ack;
    })();
  }
  function k() {
    if (!(a.doneAt)) {
      a.doneAt = Date.now();
      i.card.classList.add("tut-ok");
      i.title.textContent = "✓ " + v[e.step].title;
      if (t.Audio && t.Audio.play) {
        t.Audio.play("ui");
      }
    }
  }
  function _(t, n) {
    var e = t.getBoundingClientRect();
    return { left: e.left - n, top: e.top - n, right: e.right + n, bottom: e.bottom + n };
  }
  function C(t, n) {
    return t.left < n.right && t.right > n.left && t.top < n.bottom && t.bottom > n.top;
  }
  var H = ["#dpad", "#touch-buttons"];
  var T = ["#hud-left", "#hud-btns", "#hud-journal", "#hud-right", "#hud-target"];
  function A(t, n, e, r, a) {
    r = r || i.card;
    a = a || i.ring;
    var o = g(t);
    var u = r.offsetWidth;
    var d = r.offsetHeight;
    var c = innerWidth;
    var l = innerHeight;
    var h = { left: c / 2 - 70, right: c / 2 + 70, top: l / 2 - Math.min(120, .28 * l), bottom: l / 2 + Math.min(50, .12 * l) };
    function s() {
      return [c / 2 - u / 2, 12];
    }
    var f = null;
    var m = [];
    if (o) {
      var b = o.getBoundingClientRect();
      a.hidden = !1;
      a.style.left = b.left - 6 + "px";
      a.style.top = b.top - 6 + "px";
      a.style.width = b.width + 12 + "px";
      a.style.height = b.height + 12 + "px";
      a.style.borderRadius = "50%" === getComputedStyle(o).borderRadius ? "50%" : "10px";
      f = _(o, 6);
      var v = g(n);
      if (v) {
        var p = v.getBoundingClientRect();
        f = { left: Math.min(f.left, p.left), top: Math.min(f.top, p.top), right: Math.max(f.right, p.right), bottom: Math.max(f.bottom, p.bottom) };
      }
    }
    else {
      a.hidden = !0;
    }
    for (var y = 0; y < H.length; y++) {
      var k = g(H[y]);
      if (k) {
        for (var A = "touch-buttons" === k.id ? k.children : [k], M = 0; M < A.length; M++) {
          var w = A[M].getBoundingClientRect();
          if (w.width > 4 && w.height > 4) {
            m.push(_(A[M], 2));
          }
        }
      }
    }
    for (var L = 0; L < T.length; L++) {
      var x = g(T[L]);
      if (x) {
        m.push(_(x, 4));
      }
    }
    function E(t, n, e) {
      if (n < 8 || n + d > l - 8 || t < 8 || t + u > c - 8) {
        return !1;
      }
      var i = { left: t, top: n, right: t + u, bottom: n + d };
      if (C(i, h)) {
        return !1;
      }
      if (f && C(i, f)) {
        return !1;
      }
      if (e) {
        for (var r = 0; r < m.length; r++)
          if (C(i, m[r])) {
            return !1;
          }
      }
      return !0;
    }
    var S = [];
    if (f) {
      var B = (f.left + f.right) / 2;
      var D = (f.top + f.bottom) / 2;
      var I = [B - u / 2, f.top - 14 - d, 0];
      var N = [B - u / 2, f.bottom + 14, 0];
      var U = [f.right + 14, D - d / 2, 1];
      var q = [f.left - 14 - u, D - d / 2, 1];
      S = B < c / 3 ? [U, I, N, q] : B > 2 * c / 3 ? [q, I, N, U] : [I, N, U, q];
    }
    if (!("top" !== e && f)) {
      S.unshift(s().concat(0));
    }
    for (var O = 0; O < 2 && ("top" === e || !f); O++)
      for (var G = O ? l - d - 8 : 12, R = 0; R <= c / 2; R += 24)
        S.push([c / 2 - u / 2 + R, G, 0], [c / 2 - u / 2 - R, G, 0]);
    for (var F = null, W = null, j = 0; j < 2 && null == F; j++)
      for (var P = 0; P < S.length && null == F; P++) {
        var K = Math.max(8, Math.min(c - u - 8, S[P][0]));
        var Q = [S[P][1]];
        if (S[P][2]) {
          Q.push(h.bottom, h.top - d);
        }
        for (var Y = 0; Y < Q.length; Y++)
          if (!(Y > 0 && Math.abs(Q[Y] - Q[0]) > 40) && E(K, Q[Y], 0 === j)) {
            F = K;
            W = Q[Y];
            break;
          }
      }
    if (null == F) {
      var X = s();
      F = X[0];
      W = X[1];
    }
    F = Math.max(8, Math.min(c - u - 8, F));
    W = Math.max(8, Math.min(l - d - 8, W));
    r.style.left = Math.round(F) + "px";
    r.style.top = Math.round(W) + "px";
  }
  function M() {
    if (i.card) {
      i.card.hidden = !0;
    }
    if (i.ring) {
      i.ring.hidden = !0;
    }
    if (i.hand) {
      i.hand.hidden = !0;
    }
  }
  e.start = function (n) {
    !function () {
      if (!i.card) {
        i.ring = document.createElement("div");
        i.ring.id = "tut-ring";
        i.ring.hidden = !0;
        i.card = document.createElement("div");
        i.card.id = "tut-card";
        i.card.className = "panel";
        i.card.setAttribute("role", "status");
        i.card.setAttribute("aria-live", "polite");
        i.card.hidden = !0;
        i.card.innerHTML = '<div class="tut-head"><span class="tut-count"></span><button type="button" class="tut-skip">Bỏ qua</button></div><div class="tut-title"></div><div class="tut-body"></div><div class="tut-foot"><span class="tut-dots"></span><button type="button" class="tut-ack btn-sub" hidden></button></div>';
        i.count = i.card.querySelector(".tut-count");
        i.title = i.card.querySelector(".tut-title");
        i.body = i.card.querySelector(".tut-body");
        i.dots = i.card.querySelector(".tut-dots");
        i.ack = i.card.querySelector(".tut-ack");
        i.card.querySelector(".tut-skip").addEventListener("click", function () {
          e.finish(!0);
        });
        i.ack.addEventListener("click", function () {
          if (e.step >= v.length) {
            e.finish(!1);
          }
          else {
            k();
          }
        });
        i.hand = document.createElement("div");
        i.hand.id = "tut-hand";
        i.hand.hidden = !0;
        var n = t.PrologueUI && t.PrologueUI.HAND_SVG;
        i.hand.innerHTML = n || '<span class="tut-hand-emoji">👆</span>';
        m(i.ring, "tut-hole", .72);
        document.body.appendChild(i.ring);
        document.body.appendChild(i.hand);
        document.body.appendChild(i.card);
      }
    }();
    a = { name: n, dist: 0, lastX: 0, lastY: 0, doneAt: 0 };
    e.active = !0;
    y(0);
  };
  e.finish = function () {
    if (a && a.name) {
      n.store.set(p(a.name), !0);
    }
    o = !1;
    e.active = !1;
    e.step = -1;
    M();
  };
  e.reset = function (t) {
    var i = d();
    n.store.set(p(t || i && i.cfg && i.cfg.name), !1);
    e.active = !1;
    M();
  };
  e.debugStep = function (t) {
    if (e.active) {
      y(0 | t);
    }
  };
  e.replay = function () {
    e.reset();
    if (e.resetHints) {
      e.resetHints();
    }
    o = !0;
    var t = document.getElementById("menu");
    if (t && !t.classList.contains("hidden")) {
      t.click();
    }
  };
  var w = {};
  function L() {
    if (w.ring) {
      w.ring.hidden = w.arrow.hidden = w.chip.hidden = !0;
    }
  }
  var x = { el: null, id: null, doneAt: 0 };
  function E() {
    return t.Quest;
  }
  function S() {
    var n = t.TileMap && t.TileMap.data;
    return n && n.id;
  }
  function B() {
    return !(!t.HUD || !t.HUD.bagOpen);
  }
  function D(t, n) {
    if (!B()) {
      return "#hud-left";
    }
    if (g('.bag-slot.selected[data-item="' + t + '"]')) {
      return ".bag-detail-actions .equip-action";
    }
    var e = '.bag-slot[data-item="' + t + '"]';
    if (g(e)) {
      return e;
    }
    var i = '.bag-filter[data-filter="' + n + '"]';
    return g(i) ? i : g('.ht-muc[data-tab="trang-bi"]') ? '.ht-muc[data-tab="trang-bi"]' : null;
  }
  function I(t, n, e, i) {
    return B() ? g('.bag-slot.selected[data-item="' + t + '"]') ? "Bấm <b>" + e + "</b>." : "Chọn <b>" + n + "</b>" + ("vat-pham" === i ? " (mục Vật Phẩm)" : "") + " rồi bấm <b>" + e + "</b>." : (c() ? "Chạm vào <b>bảng nhân vật</b>" : "Bấm " + s("B") + " hoặc bấm vào <b>bảng nhân vật</b>") + " để mở Hành Trang.";
  }
  var N = [{ id: "cam_kiem", title: "Cầm Trúc Kiếm lên", bag: !0, when: function () {
        var t = E();
        return 5 === t.stage && !!t.flags.nhan_viec_ly_thanh && !t.daCamTrucKiem();
      }, done: function () {
        return E().daCamTrucKiem();
      }, body: function () {
        return I("truc_kiem", "Trúc Kiếm", "Trang Bị", "trang-bi");
      }, target: function () {
        return D("truc_kiem", "trang-bi");
      } }, { id: "auto", title: "Tự động đánh", when: function () {
        var t = E();
        var n = u();
        return 5 === t.stage && !!t.flags.nhan_viec_ly_thanh && t.daCamTrucKiem() && "thanh_truc_lam" === S() && !(n && n.autoOn) && t.kills < t.NEED_KILLS;
      }, done: function () {
        var t = u();
        return !(!t || !t.autoOn);
      }, body: function () {
        return (c() ? "Chạm nút <b>Auto</b>" : "Bấm " + s("T") + " hoặc nút <b>Auto</b>") + " — nhân vật tự tìm Bọ Ngựa gần nhất mà đánh. Bấm lần nữa để dừng.";
      }, target: function () {
        return g("#btn-auto-touch") ? "#btn-auto-touch" : "#btn-auto";
      } }, { id: "an_com", title: "Ăn cơm để hồi sức", bag: !0, when: function () {
        var n = d();
        var e = E();
        return !!n && n.hpMax > 0 && n.hp / n.hpMax < .5 && !n.downed && t.Inventory.has(e.COM_LINH_ME) && !e.flags.da_an_com_linh_me;
      }, done: function () {
        var n = E();
        return !!n.flags.da_an_com_linh_me || !t.Inventory.has(n.COM_LINH_ME);
      }, body: function () {
        return I(E().COM_LINH_ME, "Bát Cơm Linh Mễ", "Ăn", "vat-pham") + (B() ? "" : " Cơm hồi máu dần theo thời gian.");
      }, target: function () {
        return D(E().COM_LINH_ME, "vat-pham");
      } }, { id: "tuong_tac", title: "Nói chuyện · hái · xem", when: function () {
        return (0 | E().stage) <= 2 && !!(t.Targeting && t.Targeting.mucTieuTuongTac && t.Targeting.mucTieuTuongTac());
      }, done: function () {
        return !(!t.HUD || !t.HUD.dialogOpen);
      }, body: function () {
        return c() ? "Chạm thẳng vào người hay vật để tương tác — hoặc bấm nút <b>?</b> khi nó hiện." : "Đứng cạnh rồi bấm " + s("E") + " để nói chuyện, hái, hay xem.";
      }, target: function () {
        return c() && g("#btn-attack") ? "#btn-attack" : null;
      } }, { id: "vuon", title: "Trồng linh thảo", at: "top", when: function () {
        return 8 === E().stage && "vuon_ca_nhan" === S();
      }, done: function () {
        return E().stage >= 9;
      }, body: function () {
        var n = t.Farm;
        return n ? n.hasAnySeed() && n.count("empty") > 0 ? "Chạm một <b>luống trống</b> (dấu ?) để gieo — gieo kín cả mười luống." : n.count("dry") > 0 && n.hasWaterAccess && !n.hasWaterAccess() ? "Chạm <b>Ao Bích Thuỷ</b> (góc trên bên phải) để mở nguồn nước tưới." : n.count("dry") > 0 ? "Chạm từng <b>luống đang lớn</b> để tưới — tưới rồi một phút là chín." : n.count("ready") > 0 ? "Luống chín có dấu <b>!</b> — chạm để hái." : "Cây đang lớn — chờ một chút rồi hái. Mũi tên vàng chỉ luống cần làm." : "Làm theo mũi tên vàng.";
      }, target: function () {
        return null;
      } }, { id: "dao_hanh", title: "Đạo Hạnh viên mãn", ack: "Đã hiểu", when: function () {
        var t = E();
        var n = d();
        return t.stage >= 10 && t.stage <= 14 && !!n && n.canMeditate && t.daoHanhFull();
      }, done: function () {
        return !E().daoHanhFull();
      }, body: function () {
        return "Thanh <b>Đạo Hạnh</b> đầy là đủ để phá quan. Tới <b>đài đá</b>, " + (c() ? "chạm vào đài đá" : "bấm " + s("E")) + " để phá quan.";
      }, target: function () {
        return g("#row-xp") ? "#row-xp" : null;
      } }, { id: "da_toa", title: "Đả tọa tích Đạo Hạnh", when: function () {
        var t = E();
        var n = d();
        return (13 === t.stage || t.stage === t.BI_TICH_STAGE && !t.biTichUnlocked()) && !!n && n.canMeditate && "sit" !== n.state && !t.daoHanhFull();
      }, done: function () {
        var t = d();
        return !!t && "sit" === t.state;
      }, body: function () {
        return (c() ? "Chạm nút <b>Đả Tọa</b>" : "Bấm " + s("Q")) + " để ngồi thiền. Ngồi trên <b>đài đá</b> được thêm Đạo Hạnh mỗi giây — nhanh hơn đi săn lúc đầu.";
      }, target: function () {
        return c() && g("#btn-meditate-touch") ? "#btn-meditate-touch" : null;
      } }, { id: "phap_thuat", title: "Dùng pháp quyết", ack: "Đã hiểu", when: function () {
        var n = E();
        var e = t.Skills;
        return n.stage === n.YEU_COT_STAGE && "mieu_hoang" === S() && !!(e && e.barSlots && e.barSlots().length);
      }, done: function () {
        var t = E();
        return t.stage !== t.YEU_COT_STAGE;
      }, body: function () {
        return "Chiêu vừa học nằm trên <b>thanh chiêu</b> dưới màn hình. " + (c() ? "Chạm ô chiêu" : "Bấm phím số ghi trên ô chiêu") + " để đánh vào con quái đang nhắm. Bật <b>Auto</b> thì nhân vật tự dùng.";
      }, target: function () {
        return g("#hotbar") ? "#hotbar" : null;
      } }, { id: "tu_dong_cau", title: "Câu Linh Ngư", when: function () {
        var n = E();
        var e = u();
        return n.stage === n.LINH_NGU_STAGE && "duoc_vien" === S() && t.Inventory.count(n.DOC_DANG_ITEM) >= n.NEED_DOC_DANG && (Number(n.flags[n.LINH_NGU_CATCH_FLAG]) || 0) < n.NEED_LINH_NGU && !(e && (e.fishing || e.fishingAuto));
      }, done: function () {
        var t = u();
        return !(!t || !t.fishingAuto);
      }, body: function () {
        return "Tới sát mép <b>hồ</b> hoặc <b>suối</b>, " + (c() ? "chạm mặt nước" : "bấm " + s("E") + " ở mép nước") + " rồi chọn <b>Tự động câu</b>. Linh Ngư hiếm — cứ để nó câu; đi lại là dừng.";
      }, target: function () {
        return null;
      } }];
  function U() {
    var t = d();
    var n = t && t.cfg && t.cfg.name;
    return n ? "pntt_hint_v1_" + String(n).toLowerCase() : null;
  }
  function q(t) {
    var e = U();
    var i = e ? n.store.get(e, {}) : {};
    return !(!i || !i[t]);
  }
  function O() {
    if (x.el) {
      x.el.card.hidden = !0;
      x.el.ring.hidden = !0;
    }
  }
  function G() {
    if (x.id) {
      (function (t) {
        var e = U();
        if (e) {
          var i = n.store.get(e, {}) || {};
          i[t] = !0;
          n.store.set(e, i);
        }
      })(x.id);
    }
    x.id = null;
    x.doneAt = 0;
    O();
  }
  e.resetHints = function () {
    var t = U();
    if (t) {
      n.store.set(t, {});
    }
    x.id = null;
    O();
  };
  e.init = function () {
    if (!r) {
      r = setInterval(function () {
        try {
          !function () {
            if (e.active) {
              var r = d();
              if (r && t.Game.scene === u()) {
                var c = e.step;
                if (function (n) {
                  var e = u();
                  var i = v[n] && v[n].id;
                  var r = a && a.doneAt;
                  if (t.HUD && t.HUD.dialogOpen) {
                    return !0;
                  }
                  if (t.HUD && t.HUD.bagOpen && ("bag" !== i || !r) && "menu" !== i) {
                    return !0;
                  }
                  if (t.SkillBook && t.SkillBook.open) {
                    return !0;
                  }
                  if (e && e.menuOpen && ("menu" !== i || !r)) {
                    return !0;
                  }
                  var o = document.getElementById("hud");
                  return !(!o || !o.classList.contains("hidden"));
                }(c) ? M() : i.card.hidden = !1, c >= v.length) {
                  if (!(i.card.hidden)) {
                    A(null);
                  }
                  if (!(a.endAt)) {
                    a.endAt = Date.now();
                  }
                  return void (Date.now() - a.endAt > 7e3 && e.finish());
                }
                var l = r.x - a.lastX;
                var h = r.y - a.lastY;
                var s = Math.sqrt(l * l + h * h);
                if (s < 64) {
                  a.dist += s;
                }
                a.lastX = r.x;
                a.lastY = r.y;
                var g = v[c];
                if (!a.doneAt && g.done(a) && k(), a.doneAt && Date.now() - a.doneAt > 900) {
                  y(c + 1);
                }
                else if (i.card.hidden) {
                  i.ring.hidden = !0;
                  b();
                }
                else {
                  if (!a.doneAt) {
                    var f = g.body();
                    if (i.body.innerHTML !== f) {
                      i.body.innerHTML = f;
                    }
                  }
                  i.ring._dim = g.dim;
                  A(g.target(), "function" == typeof g.avoid ? g.avoid() : g.avoid, g.at);
                  b();
                }
              }
              else {
                M();
              }
            }
            else {
              var m = function () {
                var e = d();
                if (!e || !t.Game || t.Game.scene !== u()) {
                  return null;
                }
                var i = e.cfg && e.cfg.name;
                return i && (o || t.Quest && !((0 | t.Quest.stage) > 1)) ? n.store.get(p(i), !1) ? null : i : null;
              }();
              if (!m) {
                return;
              }
              e.start(m);
            }
          }();
        }
        finally {
          try {
            !function () {
              var n = t.Quest;
              var i = u();
              var r = d();
              var a = document.getElementById("hud");
              if (!(n && n.phiHanhHintActive && n.phiHanhHintActive() && !e.active && r && !r.flying && t.Game && t.Game.scene === i) || t.HUD && (t.HUD.dialogOpen || t.HUD.bagOpen) || i && i.menuOpen || a && a.classList.contains("hidden")) {
                L();
              }
              else {
                if (!(w.ring)) {
                  w.ring = document.createElement("div");
                  w.ring.id = "fly-hint-ring";
                  w.ring.hidden = !0;
                  w.arrow = document.createElement("div");
                  w.arrow.id = "fly-hint-arrow";
                  w.arrow.hidden = !0;
                  w.arrow.innerHTML = "<span>Bấm để bay</span><b>▼</b>";
                  w.chip = document.createElement("div");
                  w.chip.id = "fly-hint-chip";
                  w.chip.hidden = !0;
                  w.chip.innerHTML = "Nhấn " + s("F") + " để Phi Hành";
                  m(w.ring, "fly-hole", .66);
                  document.body.appendChild(w.ring);
                  document.body.appendChild(w.arrow);
                  document.body.appendChild(w.chip);
                }
                var o = l() ? g("#btn-fly") : null;
                if (!o) {
                  w.ring.hidden = w.arrow.hidden = !0;
                  return void (w.chip.hidden = !1);
                }
                var c = o.getBoundingClientRect();
                w.chip.hidden = !0;
                w.ring.hidden = w.arrow.hidden = !1;
                w.ring.style.left = c.left - 6 + "px";
                w.ring.style.top = c.top - 6 + "px";
                w.ring.style.width = c.width + 12 + "px";
                w.ring.style.height = c.height + 12 + "px";
                w.ring.style.borderRadius = "50%" === getComputedStyle(o).borderRadius ? "50%" : "12px";
                var h = w.arrow.offsetWidth || 90;
                var f = w.arrow.offsetHeight || 40;
                var b = Math.max(6, Math.min(innerWidth - h - 6, c.left + c.width / 2 - h / 2));
                var v = Math.max(6, c.top - 6 - f - 2);
                w.arrow.style.left = b + "px";
                w.arrow.style.top = v + "px";
              }
            }();
          }
          catch (t) {
            L();
          }
          try {
            !function () {
              var n = d();
              if (!e.active && n && t.Quest && t.Game && t.Game.scene === u()) {
                var i = x.id ? function (t) {
                  for (var n = 0; n < N.length; n++)
                    if (N[n].id === t) {
                      return N[n];
                    }
                  return null;
                }(x.id) : null;
                if (i) {
                  if (!x.doneAt && i.done() && (x.doneAt = Date.now(), x.el.card.classList.add("tut-ok"), x.el.title.textContent = "✓ " + i.title, t.Audio && t.Audio.play && t.Audio.play("ui")), x.doneAt && Date.now() - x.doneAt > 900) {
                    return void G();
                  }
                  if (!x.doneAt && !i.when()) {
                    x.id = null;
                    return void O();
                  }
                }
                else {
                  for (var r = 0; r < N.length; r++) {
                    var a = N[r];
                    if (!q(a.id) && !a.done() && a.when()) {
                      i = a;
                      break;
                    }
                  }
                  if (!i) {
                    return void O();
                  }
                  !function () {
                    if (!x.el) {
                      var t = document.createElement("div");
                      t.id = "hint-ring";
                      t.hidden = !0;
                      var n = document.createElement("div");
                      n.id = "hint-card";
                      n.className = "panel";
                      n.setAttribute("role", "status");
                      n.setAttribute("aria-live", "polite");
                      n.hidden = !0;
                      n.innerHTML = '<div class="tut-head"><span class="tut-count">Gợi ý</span><button type="button" class="tut-skip">Ẩn</button></div><div class="tut-title"></div><div class="tut-body"></div><div class="tut-foot"><span></span><button type="button" class="tut-ack btn-sub" hidden></button></div>';
                      x.el = { ring: t, card: n, title: n.querySelector(".tut-title"), body: n.querySelector(".tut-body"), ack: n.querySelector(".tut-ack") };
                      n.querySelector(".tut-skip").addEventListener("click", function () {
                        G();
                      });
                      x.el.ack.addEventListener("click", function () {
                        G();
                      });
                      m(t, "hint-hole", .62, function () {
                        return n.classList.contains("in-bag");
                      });
                      document.body.appendChild(t);
                      document.body.appendChild(n);
                    }
                  }();
                  x.id = i.id;
                  x.doneAt = 0;
                  x.el.card.classList.remove("tut-ok");
                  x.el.title.textContent = i.title;
                  x.el.ack.textContent = i.ack || "";
                  x.el.ack.hidden = !i.ack;
                }
                if (function (n) {
                  var e = u();
                  if (t.HUD && t.HUD.dialogOpen) {
                    return !0;
                  }
                  if (B() && !n.bag) {
                    return !0;
                  }
                  if (t.SkillBook && t.SkillBook.open) {
                    return !0;
                  }
                  if (e && e.menuOpen) {
                    return !0;
                  }
                  var i = document.getElementById("hud");
                  return !(!i || !i.classList.contains("hidden"));
                }(i)) {
                  O();
                }
                else {
                  var o;
                  var c;
                  var l;
                  var h;
                  if (o = B() && i.bag, c = x.el.card, (h = (l = o && document.querySelector("#bag .hanh-trang-panel")) && l.querySelector(".ht-than")) ? c.parentNode === l && c.nextSibling === h || l.insertBefore(c, h) : c.parentNode !== document.body && document.body.appendChild(c), c.classList.toggle("in-bag", !!h), x.el.card.hidden = !1, !x.doneAt) {
                    var s = i.body();
                    if (x.el.body.innerHTML !== s) {
                      x.el.body.innerHTML = s;
                    }
                  }
                  A(i.target(), i.avoid, i.at, x.el.card, x.el.ring);
                }
              }
              else {
                O();
              }
            }();
          }
          catch (t) {
            O();
          }
          try {
            !function () {
              for (var t = 0; t < f.length; t++) {
                var n = f[t];
                var e = n.ring;
                if (e.hidden || n.guard && n.guard()) {
                  if (!(n.hole.hidden)) {
                    n.hole.hidden = !0;
                  }
                }
                else {
                  var i = n.hole.style;
                  i.left = e.style.left;
                  i.top = e.style.top;
                  i.width = e.style.width;
                  i.height = e.style.height;
                  i.borderRadius = e.style.borderRadius;
                  i.setProperty("--tut-dim", String(null != e._dim ? e._dim : n.dim));
                  if (n.hole.hidden) {
                    n.hole.hidden = !1;
                  }
                }
              }
            }();
          }
          catch (t) {
          }
        }
      }, 120);
      var c = document.getElementById("menu-tutorial");
      if (c) {
        c.addEventListener("click", e.replay);
      }
    }
  };
  if ("undefined" != typeof document && document.body) {
    e.init();
  }
  else {
    if ("undefined" != typeof document) {
      document.addEventListener("DOMContentLoaded", e.init);
    }
  }
}(window.PNTT);
