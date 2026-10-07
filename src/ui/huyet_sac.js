!function (n) {
  "use strict";
  var e = n.HuyetSacUI = {};
  var t = ["rung_mang_xa", "mach_dat_dong", "dam_lay_boss"];
  var a = { used: 0, expiresAt: 0, harvested: [] };
  var r = 0;
  var o = 0;
  var i = null;
  var h = -1;
  var c = null;
  var u = null;
  var l = !1;
  function d() {
    return !!(n.Gateway && n.Gateway.connected && n.Gateway.ready);
  }
  function s() {
    var e = n.SceneWorld && n.SceneWorld.map;
    return e && e.data && e.data.id || "";
  }
  function p() {
    return t.indexOf(s()) >= 0;
  }
  function y(e, t) {
    if (d()) {
      return n.Gateway.partySend(e, t || {});
    }
    // Nghịch Tiên: không có máy chủ → xử lý trên máy (huyet_sac_solo.js)
    if (n.HuyetSacSolo) {
      return n.HuyetSacSolo.send(e, t || {});
    }
    n.HUD.setCaption("Huyết Xích Cấm Địa chỉ mở khi đang kết nối máy chủ.");
    return !1;
  }
  function g(e, t) {
    n.HUD.openDialog("Huyết Xích Cấm Địa", e, t || {});
  }
  function m(e) {
    var t = n.HuyetSac;
    return t && t.luotNgay ? t.luotNgay(e) : 5;
  }
  e.onMapEntered = function () {
    var e = n.SceneWorld && n.SceneWorld.player;
    if (p() && function (n) {
      return !(!n || !/^luyen_khi(?:_|$)/.test(String(n.realmId || "")));
    }(e)) {
      var t = "pntt:huyet-sac:truc-co-reminder:" + function (n) {
        return String(n && (n.id || n.name || n.uid) || "local-player").replace(/[^a-z0-9_-]/gi, "_");
      }(e) + ":" + (n.HuyetSac && "function" == typeof n.HuyetSac.day ? n.HuyetSac.day(Date.now()) : new Date(Date.now() + 252e5).toISOString().slice(0, 10));
      try {
        if (window.localStorage.getItem(t)) {
          return;
        }
        window.localStorage.setItem(t, "1");
      }
      catch (n) {
      }
      var a = n.HuyetSac && n.HuyetSac.recipeText ? n.HuyetSac.recipeText("truc_co_dan", " + ") : "nguyên liệu Trúc Cơ Đan";
      if (n.HUD && n.HUD.setCaption) {
        n.HUD.setCaption("Lần đầu vào Huyết Xích hôm nay!\nNhanh chóng thu hoạch " + a + " để luyện Trúc Cơ Đan.");
      }
    }
  };
  e.state = function (n) {
    a = { used: Math.max(0, Math.min(m(), 0 | n.used)), expiresAt: Number(n.expiresAt) || 0, harvested: Array.isArray(n.harvested) ? n.harvested.slice() : [] };
    r = a.expiresAt ? Date.now() + Math.max(0, a.expiresAt - (Number(n.serverNow) || Date.now())) : 0;
    o = Number(n.collapseAt) ? Date.now() + Math.max(0, Number(n.collapseAt) - (Number(n.serverNow) || Date.now())) : 0;
    v();
    if (f && a.harvested.indexOf(f.mapId + ":" + f.propId) >= 0) {
      f = null;
    }
    M();
  };
  var f = null;
  function v() {
    var e = n.SceneWorld && n.SceneWorld.map;
    if (e && e.props && p()) {
      for (var t = s() + ":", r = 0; r < e.props.length; r++) {
        var o = e.props[r];
        if (a.harvested.indexOf(t + o.id) >= 0) {
          o.hidden = !0;
        }
      }
    }
  }
  e.batDauThu = function (e) {
    var t = n.SceneWorld && n.SceneWorld.player;
    f = { propId: String(e.propId), mapId: s(), batDau: Date.now(), ms: Math.max(0, Number(e.ms) || 3e3), px: t ? t.x : 0, py: t ? t.y : 0 };
    if (n.HUD && n.HUD.setCaption) {
      n.HUD.setCaption("Đang thu hoạch — đứng yên " + Math.round(f.ms / 1e3) + " giây.");
    }
  };
  e.huyThu = function (e) {
    f = null;
    if (e && e.why && n.HUD && n.HUD.setCaption) {
      n.HUD.setCaption(e.why);
    }
  };
  e.drawThu = function (e, t, a) {
    if (f) {
      var r = n.SceneWorld && n.SceneWorld.map;
      var o = n.SceneWorld && n.SceneWorld.player;
      if (r && s() === f.mapId)
        if (o && Math.hypot(o.x - f.px, o.y - f.py) > 12) {
          f = null;
        }
        else {
          for (var i = null, h = 0; h < (r.props || []).length; h++)
            r.props[h].id === f.propId && (i = r.props[h]);
          if (i && !i.hidden) {
            var c = n.CONFIG && n.CONFIG.TILE || 32;
            var u = Math.min(1, (Date.now() - f.batDau) / Math.max(1, f.ms));
            var l = Math.round((i.tx + .5) * c - t - 17);
            var d = Math.round((i.ty + 1) * c - a - 44);
            e.save();
            e.fillStyle = "rgba(0,0,0,0.75)";
            e.fillRect(l - 1, d - 1, 36, 7);
            e.fillStyle = "#3a1414";
            e.fillRect(l, d, 34, 5);
            e.fillStyle = "#e8b83a";
            e.fillRect(l, d, Math.round(34 * u), 5);
            e.fillStyle = "#fff2b8";
            e.fillRect(l, d, Math.round(34 * u), 1);
            e.restore();
          }
          else {
            f = null;
          }
        }
      else {
        f = null;
      }
    }
  };
  e.closed = function () {
    a.expiresAt = 0;
    r = 0;
    o = 0;
    M();
  };
  var S = ["rung_mang_xa", "mach_dat_dong"];
  var b = ["bich_ngoc_chop", "tran_than_thach", "dia_linh_qua", "truc_co_thao"];
  var _ = "";
  var C = null;
  function H() {
    for (var e = n.SceneWorld && n.SceneWorld.enemies || [], t = 0, a = 0; a < e.length; a++)
      e[a] && !e[a].dead && t++;
    return t;
  }
  function w() {
    var e = n.Gateway;
    g((e && e.party && e.party.members ? e.party.members.length : 1) <= 1 ? "Đạo hữu đang đi MỘT MÌNH. Ba con đầu đàn trong Huyết Xích đánh rất đau — nên lập tổ đội 2–6 người rồi hãy vào.\n\nVẫn vào một mình thì thu 100 Linh Thạch và tính một lượt hôm nay." : "Đội trưởng xác nhận sẽ thu 100 Linh Thạch và tính một lượt hôm nay của từng thành viên hợp lệ đang ở Miếu Hoang. Cả đội sẽ được đưa vào ngay.", { actionLabel: "Mở Huyết Xích Cấm Địa", onAction: function () {
        if (d()) {
          n.Gateway.partyEnterDungeon("rung_mang_xa");
        }
        else if (n.HuyetSacSolo) {
          n.HuyetSacSolo.dangKy();
        }
        else {
          n.HUD.setCaption("Cần kết nối máy chủ để mở phó bản tổ đội.");
        }
      } });
  }
  function x(e) {
    if (!(l)) {
      if (d()) {
        l = !0;
        n.Gateway.cmd("breakthrough", { useBaoMenh: !!e }, function (e) {
          l = !1;
          if (e && !1 !== e.ok) {
            if (!(n.SceneWorld && n.SceneWorld.playFoundationBreakthrough && n.SceneWorld.playFoundationBreakthrough(e))) {
              g(e.why || (e.success ? "Đột phá thành công." : "Đột phá thất bại."));
            }
          }
          else {
            g(e && e.why || "Máy chủ chưa thể xử lý lần đột phá này.");
          }
        });
      }
      else if (n.HuyetSac && n.HuyetSac.attempt) {
        // Nghịch Tiên: đột phá ngay trên máy — 70%, kèm Bảo Mệnh Phù 100% (luật của tác giả trong HuyetSac.attempt)
        var pl = n.SceneWorld && n.SceneWorld.player;
        var kq = pl ? n.HuyetSac.attempt(n, pl, !!e) : { ok: !1, why: "Chưa vào thế giới." };
        if (kq.ok) {
          if (n.HUD.refreshBag) {
            n.HUD.refreshBag();
          }
          if (!(n.SceneWorld && n.SceneWorld.playFoundationBreakthrough && n.SceneWorld.playFoundationBreakthrough(kq))) {
            g(kq.why);
          }
        }
        else {
          g(kq.why);
        }
      }
      else {
        n.HUD.setCaption("Cần kết nối máy chủ để đột phá Trúc Cơ.");
      }
    }
  }
  function M() {
    if (v(), function () {
      if (document.body) {
        var e = p() && o > 0;
        if (!i) {
          if (!e) {
            return;
          }
          (i = document.createElement("div")).id = "huyet-collapse";
          i.setAttribute("aria-live", "polite");
          i.innerHTML = "<small>Cấm Địa sụp sau</small><b></b>";
          document.body.appendChild(i);
        }
        if (i.hidden = !e, e) {
          var t = Math.max(0, Math.ceil((o - Date.now()) / 1e3));
          i.querySelector("b").textContent = Math.floor(t / 60) + ":" + String(t % 60).padStart(2, "0");
          i.classList.toggle("urgent", t <= 30);
          if (t !== h && n.Audio && n.Audio.play && (h < 0 || t <= 30 && (t <= 10 || t % 5 == 0))) {
            n.Audio.play("dungeon_warning");
            h = t;
          }
        }
        else {
          h = -1;
        }
      }
    }(), !c && document.body && ((c = document.createElement("aside")).id = "huyet-sac-hud", c.hidden = !0, c.setAttribute && c.setAttribute("aria-label", "Trạng thái Huyết Xích Cấm Địa"), c.innerHTML = '<button type="button" aria-label="Rời phó bản">Rời</button><span></span>', (document.getElementById && document.getElementById("hud-right") || document.body).appendChild(c), u = c.querySelector("span"), c.querySelector("button").addEventListener("click", function () {
      g("Rời lượt hiện tại? Phí và lượt không được hoàn lại; vật phẩm đã thu hoạch vẫn được giữ.", { actionLabel: "Xác nhận rời phó bản", onAction: function () {
          y("leave_dungeon");
        } });
    })), c) {
      var e = p() && r > 0;
      if (c.hidden = !e, e) {
        var t = Math.max(0, Math.ceil((r - Date.now()) / 1e3));
        var a = Math.floor(t / 60);
        var l = String(t % 60).padStart(2, "0");
        u.textContent = a + ":" + l;
        u.title = "Thời gian còn lại của lượt Huyết Xích";
        c.classList.toggle("urgent", t <= 60);
      }
    }
  }
  e.sealed = function () {
    return S.indexOf(s()) >= 0 && H() > 0;
  };
  e.drawSeals = function (e, t, a, r) {
    var o = s();
    var i = n.SceneWorld && n.SceneWorld.map;
    if (o !== _ && (_ = o, C = null), !(S.indexOf(o) < 0) && i && i.props && n.VFX) {
      var h = H();
      var c = null !== C && C > 0 && 0 === h;
      if (C = h, h || c) {
        for (var u = n.CONFIG && n.CONFIG.TILE || 32, l = n.Renderer && n.Renderer.w || 99999, d = n.Renderer && n.Renderer.h || 99999, p = 0; p < i.props.length; p++) {
          var y = i.props[p];
          if (!(y.hidden || b.indexOf(y.type) < 0)) {
            var g = (y.tx + .5) * u;
            var m = (y.ty + 1) * u - 2;
            if (c) {
              if (n.VFX.spawnSealBreak) {
                n.VFX.spawnSealBreak(g, m);
              }
            }
            else {
              var f = g - t;
              var v = m - a;
              if (!(f < -40 || v < -60 || f > l + 40 || v > d + 40)) {
                if (n.VFX.drawCamChe) {
                  n.VFX.drawCamChe(e, Math.round(f), Math.round(v), r, 1.7 * p);
                }
              }
            }
          }
        }
      }
    }
  };
  e.interact = function (t) {
    if (!t) {
      return !1;
    }
    if ("nu_tu_mieu_hoang" === t.id) {
      y("huyet_status");
      var r = [{ label: "Đăng ký Huyết Xích Cấm Địa", icon: "spirit_stone", note: (i = m(n.Progress && n.Progress.realmId), h = Math.max(0, Math.min(i, 0 | a.used)), "1–6 người (nên đi theo nhóm) · Phí 100/người · ngươi có " + (n.Progress && Number(n.Progress.stones) || 0) + " Linh Thạch · " + h + "/" + i + " lượt hôm nay"), onChoose: w }];
      var o = n.YenLangUI && n.YenLangUI.choice && n.YenLangUI.choice();
      if (o) {
        r.splice(1, 0, o);
      }
      g("", { choiceOnly: !0, hideClose: !0, choices: r });
      return !0;
    }
    var i;
    var h;
    if (p() && ["bich_ngoc_chop", "tran_than_thach", "dia_linh_qua", "truc_co_thao"].indexOf(t.type) >= 0) {
      var c = s() + ":" + t.id;
      if (a.harvested.indexOf(c) >= 0) {
        g("Điểm tài nguyên này đã được đội thu hoạch trong lượt hiện tại.");
      }
      else {
        if (f && f.propId === String(t.id)) {
          n.HUD.setCaption("Đang thu hoạch — đứng yên cho tới khi đầy thanh.");
        }
        else {
          if (e.sealed()) {
            n.HUD.setCaption("Cấm chế còn phong — quét sạch " + H() + " yêu thú trong khu này rồi mới thu hoạch được.");
          }
          else {
            y("huyet_harvest", { propId: t.id });
          }
        }
      }
      return !0;
    }
    return !1;
  };
  e.breakthrough = function () {
    var e = n.SceneWorld && n.SceneWorld.player;
    if (e && n.Breakthrough) {
      var t = n.Breakthrough.check(e);
      var a = n.HuyetSac && n.HuyetSac.SO_PHU_TRUC_CO || 5;
      if (t.ready) {
        g("Đạo Hạnh đã viên mãn. Mỗi lần thử tiêu hao một Trúc Cơ Đan.\n\nChỉ dùng Trúc Cơ Đan: 70%.\nDùng thêm " + a + " Bảo Mệnh Phù: cộng 30%, đạt 100%.\n\nNếu thất bại, cảnh giới và Đạo Hạnh được giữ nguyên.", { choices: [{ label: "Dùng Trúc Cơ Đan · 70%", disabled: l, onChoose: function () {
                x(!1);
              } }, { label: "Kèm " + a + " Bảo Mệnh Phù · 100%", note: (0 | n.Inventory.count("bao_menh_phu")) >= a ? "Tiêu hao thêm " + a + " lá" : "Đang có " + (0 | n.Inventory.count("bao_menh_phu")) + "/" + a + " Bảo Mệnh Phù", disabled: l || (0 | n.Inventory.count("bao_menh_phu")) < a, onChoose: function () {
                x(!0);
              } }] });
      }
      else {
        g("Chưa thể dựng đạo cơ:\n" + n.Breakthrough.describe(t));
      }
    }
  };
  setInterval(M, 500);
}(window.PNTT);
