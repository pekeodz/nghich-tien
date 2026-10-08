/* ============================================================================
 *  bach_ho_duong.js — PHÓ BẢN BẠCH HỔ ĐƯỜNG (Nghịch Tiên)
 * ----------------------------------------------------------------------------
 *  NPC "Môn Đồ Bạch Hổ Đường" đứng ở cổng tây Thành Thăng Long, trên đầu có danh xưng
 *  xanh lục "Báo danh Bạch Hổ Đường" (giống Kiếm Thế). Báo danh xong vào bản đồ bach_ho_duong
 *  (world/map_bach_ho_duong.js), chơi một mình, không cần máy chủ:
 *    1. Hạ hết Môn Đồ Canh Giữ ở 4 đầu cầu.
 *    2. Đường Chủ Long Quy hiện trên đài giữa (systems/long_quy.js).
 *    3. Long Quy ngã → Thử Bảo chạy tán loạn, mỗi đòn chỉ mất 1 máu.
 *    4. Dọn xong hoặc hết giờ thì đưa ra ngoài thành.
 * ==========================================================================*/
(function (P) {
  "use strict";
  if (!P || !P.MapData) return;
  var B = P.BachHoDuong = {};
  var CAU_HINH = B.CAU_HINH = {
    CANH_GIOI: "luyen_khi_10",   // cảnh giới tối thiểu để báo danh
    LUOT_NGAY: 2,                // số lượt mỗi ngày
    PHI: 200,                    // Linh Thạch mỗi lượt
    MAP: "bat_quai_thach_phan",  // Thành Thăng Long
    TX: 14, TY: 27,              // trong cổng tây, chừa chỗ cho Bảnh Tiên Sinh (10,29)
    PB: "bach_ho_duong",         // bản đồ phó bản
    PHUT: 15,                    // thời gian mỗi lượt
    SO_CHUOT: 10,                // Thử Bảo chạy ra khi Đường Chủ ngã
    CHUOT_GIAY: 90,              // Thử Bảo chạy thoát sau từng ấy giây
    RA_SAU_GIAY: 30,             // dọn xong thì đưa ra ngoài sau từng ấy giây
    THUONG_BOSS: [400, 700],     // Linh Thạch khi hạ Đường Chủ
    THUONG_CHUOT: [30, 60]       // Linh Thạch mỗi Thử Bảo
  };
  // Môn Đồ Canh Giữ ở 4 đầu cầu (ô bản đồ)
  var CANH = [[16, 21], [19, 21], [8, 11], [8, 14], [27, 11], [27, 14], [16, 4], [19, 4]];
  var GIUA = { tx: 18, ty: 12.6 }; // đài ngọc
  B.NPC = "bao_danh_bach_ho_duong";
  var TEN = "Môn Đồ Bạch Hổ Đường", DANH_XUNG = "Báo danh Bạch Hổ Đường";

  /* ---------------- đặt NPC vào bản đồ ---------------- */
  function datNpc() {
    var M = P.MapData.BAT_QUAI_THACH_PHAN; if (!M) return;
    var ds = M.objects || M.props || (M.objects = []);
    if (ds.some(function (o) { return o.id === B.NPC; })) return;
    ds.push({ id: B.NPC, type: "npc", tx: CAU_HINH.TX, ty: CAU_HINH.TY, block: !0, r: 46, name: TEN, title: DANH_XUNG, face: 0,
      cfg: { gender: "male", hair: "dao_ke", hairColor: "hac", beard: "rau_de", outfit: "ma_vuong_bao", skin: "tan", aura: "none", accessory: "none", hat: "none", bag: "none", shoes: "ink", weapon: "none" } });
  }
  datNpc();

  /* ---------------- danh xưng xanh lục trên tên NPC ---------------- */
  function ganDanhXung() {
    var X = P.Pixel; if (!X || !X.text || X.text.__bhd) return;
    var g = X.text;
    X.text = function (ctx, x, y, chu, mau) {
      var kq = g.apply(this, arguments);
      if (chu === TEN && mau === "#f0d27a") g.call(this, ctx, x, y - 12, DANH_XUNG, "#5ee08a", "#000000", "400 11px " + X.MAP_FONT, "center");
      return kq;
    };
    X.text.__bhd = true;
  }

  /* ---------------- hộp thoại ---------------- */
  function hop(t, nd, o) { if (P.HUD && P.HUD.openDialog) P.HUD.openDialog(t, nd, o || {}); }
  // hộp thoại chữ canh trái (luật lệ có đánh số); hộp thoại khác mở sau sẽ trở lại canh giữa
  function hopTrai(t, nd, o) {
    ganCanhTrai(); hop(t, nd, o);
    var d = document.getElementById("dialog"); if (d) d.classList.add("nt-canh-trai");
  }
  function ganCanhTrai() {
    var H = P.HUD; if (!H || !H.openDialog || H.openDialog.__ntTrai) return;
    var g = H.openDialog;
    H.openDialog = function () { var d = document.getElementById("dialog"); if (d) d.classList.remove("nt-canh-trai"); return g.apply(this, arguments); };
    H.openDialog.__ntTrai = true;
    var st = document.createElement("style");
    st.textContent = "#dialog.nt-canh-trai #dialog-text{text-align:left;max-width:52ch}";
    document.head.appendChild(st);
  }
  function flags() { var Q = P.Quest; if (!Q) return {}; Q.flags = Q.flags || {}; return Q.flags; }
  function homNay() { return new Date(Date.now() + 252e5).toISOString().slice(0, 10); }
  function soDo() { var f = flags(), d = f.ntBachHo || (f.ntBachHo = {}); if (d.ngay !== homNay()) { d.ngay = homNay(); d.luot = 0; } return d; }
  function tenCG(id) { return P.realmNameById ? P.realmNameById(id) : id; }
  function duCanhGioi() { var I = P.Inventory; return !I || !I.realmOk || I.realmOk({ requireRealm: CAU_HINH.CANH_GIOI }); }

  B.moNpc = function (npc) {
    var d = soDo(), con = CAU_HINH.LUOT_NGAY - (d.luot | 0), lt = P.Progress ? P.Progress.stones | 0 : 0;
    if (luot()) {
      return hop(TEN, "Đạo hữu còn lượt Bạch Hổ Đường chưa xong.", { choices: [{ label: "Vào lại Bạch Hổ Đường", primary: true, onChoose: function () { if (P.HUD && P.HUD.closeDialog) P.HUD.closeDialog(); vao(); } }] });
    }
    var ly = !duCanhGioi() ? "Cần " + tenCG(CAU_HINH.CANH_GIOI) : con <= 0 ? "Hôm nay hết lượt" : lt < CAU_HINH.PHI ? "Thiếu Linh Thạch" : "";
    hop(TEN, 'Gã môn đồ khoanh tay đứng chắn cổng, giọng sang sảng:\n\n"Bạch Hổ Đường mở cửa thu nhận anh hùng thiên hạ! Vượt qua thử thách, hạ được Đường Chủ, của cải trong đường tha hồ mà nhặt."',
      { choices: [
        { label: "Báo danh vào Bạch Hổ Đường", primary: !ly, disabled: !!ly,
          note: (ly ? ly + " · " : "") + "Phí " + CAU_HINH.PHI + " Linh Thạch · hôm nay còn " + Math.max(0, con) + "/" + CAU_HINH.LUOT_NGAY + " lượt",
          onChoose: function () { baoDanh(npc); } },
        { label: "Bạch Hổ Đường là nơi nào?", note: "Luật lệ phó bản", onChoose: function () { gioiThieu(npc); } },
        { label: "Phần thưởng", note: "Đường Chủ và Thử Bảo", onChoose: function () { phanThuong(npc); } }
      ], oneCol: true });
  };
  function baoDanh(npc) {
    var r = luot();
    if (r) { vao(); return; }
    var d = soDo(), lt = P.Progress ? P.Progress.stones | 0 : 0;
    if (!duCanhGioi()) return hop(TEN, "Cần " + tenCG(CAU_HINH.CANH_GIOI) + " trở lên mới được báo danh.");
    if ((d.luot | 0) >= CAU_HINH.LUOT_NGAY) return hop(TEN, "Hôm nay đạo hữu đã vào đủ " + CAU_HINH.LUOT_NGAY + " lượt. Mai hãy quay lại.");
    if (lt < CAU_HINH.PHI || !P.Progress.spendStones || !P.Progress.spendStones(CAU_HINH.PHI)) return hop(TEN, "Không đủ " + CAU_HINH.PHI + " Linh Thạch lệ phí.");
    d.luot = (d.luot | 0) + 1;
    flags().ntBachHoRun = { het: Date.now() + CAU_HINH.PHUT * 60000, pha: "canh", chuot: 0 };
    luu();
    if (P.HUD && P.HUD.refreshStones) P.HUD.refreshStones();
    if (P.HUD && P.HUD.closeDialog) P.HUD.closeDialog();
    vao();
    caption("Vào Bạch Hổ Đường — " + CAU_HINH.PHUT + " phút. Lượt " + d.luot + "/" + CAU_HINH.LUOT_NGAY + " hôm nay.");
  }
  function gioiThieu(npc) {
    hopTrai(TEN + " · Luật lệ", "Bạch Hổ Đường mỗi ngày mở cửa " + CAU_HINH.LUOT_NGAY + " lượt, chỉ nhận đạo hữu từ " + tenCG(CAU_HINH.CANH_GIOI) + " trở lên. Mỗi lượt có " + CAU_HINH.PHUT + " phút.\n\n1. Vào đường, hạ hết Môn Đồ Canh Giữ ở bốn đầu cầu.\n2. Đường Chủ Long Quy sẽ xuất hiện trên đài giữa. Coi chừng cú lao tới cắn, tiếng gầm làm choáng và lúc nó rụt vào mai hồi máu.\n3. Long Quy ngã xuống, " + CAU_HINH.SO_CHUOT + " con Thử Bảo trong kho sẽ chạy tán loạn. Bắt được con nào thì được thưởng con đó. Sau " + CAU_HINH.CHUOT_GIAY + " giây chúng sẽ trốn mất.\n\nHết giờ, bị hạ gục hoặc tự ra khỏi cổng thì lượt đó kết thúc.",
      { choices: [{ label: "Quay lại", onChoose: function () { B.moNpc(npc); } }], oneCol: true });
  }
  function phanThuong(npc) {
    hop(TEN + " · Phần thưởng", "• Hạ Đường Chủ: " + CAU_HINH.THUONG_BOSS[0] + "–" + CAU_HINH.THUONG_BOSS[1] + " Linh Thạch và Đạo Hạnh.\n• Mỗi Thử Bảo: " + CAU_HINH.THUONG_CHUOT[0] + "–" + CAU_HINH.THUONG_CHUOT[1] + " Linh Thạch.\n\n(Phần thưởng đang để tạm, sẽ chốt sau.)",
      { choices: [{ label: "Quay lại", onChoose: function () { B.moNpc(npc); } }], oneCol: true });
  }

  /* ---------------- lượt đang chạy ---------------- */
  function luu() { try { P.Quest && P.Quest.save && P.Quest.save(); } catch (e) {} }
  function caption(t) { if (P.HUD && P.HUD.setCaption) P.HUD.setCaption(t); }
  function luot() { var r = flags().ntBachHoRun; return r && r.het > Date.now() ? r : null; }
  function W() { return P.SceneWorld; }
  function banDo() { var w = W(), m = w && w.map; return (m && m.data && m.data.id) || (P.TileMap && P.TileMap.data && P.TileMap.data.id) || ""; }
  function am(t) { try { P.Audio && P.Audio.play && P.Audio.play(t); } catch (e) {} }
  function ngauNhien(a) { return a[0] + Math.floor(Math.random() * (a[1] - a[0] + 1)); }
  function thuong(n, x, y) {
    if (P.Progress && P.Progress.addStones) P.Progress.addStones(n); else if (P.Progress) P.Progress.stones = (P.Progress.stones | 0) + n;
    if (P.HUD && P.HUD.refreshStones) P.HUD.refreshStones();
    if (P.VFX && P.VFX.spawnText && x != null) P.VFX.spawnText(x, y - 40, "+" + n + " Linh Thạch", "#ffe08a");
  }
  var T = (P.CONFIG && P.CONFIG.TILE) || 32;
  function px(t) { return (t + 0.5) * T; }

  var vuaToi = 0;
  var dang = null; // { canh:[], boss, chuot:[], thaChuotLuc, xongLuc }
  function vao() {
    dang = null;
    if (banDo() === CAU_HINH.PB) { thaTheoPha(); return; }
    if (W() && W().switchMap) W().switchMap(CAU_HINH.PB, { tx: 17, ty: 24 });
  }
  function ra(lyDo) {
    var r = flags().ntBachHoRun;
    flags().ntBachHoRun = null; dang = null; luu();
    hud(null);
    if (banDo() === CAU_HINH.PB && W() && W().switchMap) W().switchMap(CAU_HINH.MAP, { tx: CAU_HINH.TX + 1, ty: CAU_HINH.TY + 2 });
    if (lyDo) setTimeout(function () { caption(lyDo); }, 900);
  }
  B.roi = function () { ra("Đã rời Bạch Hổ Đường."); };

  function thaTheoPha() {
    var r = luot(), LQ = P.LongQuy; if (!r || !LQ) return;
    var w = W(); if (!w || !w.enemies) return;
    // dọn quái cũ của phó bản (tải lại trang)
    w.enemies = w.enemies.filter(function (e) { return !e.ntBHD; });
    dang = { canh: [], boss: null, chuot: [], thaChuotLuc: 0, xongLuc: 0 };
    if (r.pha === "canh") {
      CANH.forEach(function (c) { var e = LQ.tha("hac_y_ta_tu_1", px(c[0]), px(c[1]), { ten: "Môn Đồ Canh Giữ" }); if (e) { e.ntBHD = 1; dang.canh.push(e); } });
      caption("Hạ hết Môn Đồ Canh Giữ ở 4 đầu cầu để Đường Chủ lộ diện.");
    } else if (r.pha === "boss") thaBoss();
    else if (r.pha === "chuot") thaChuot(GIUA.tx * T, GIUA.ty * T, CAU_HINH.SO_CHUOT - (r.chuot | 0));
    else if (r.pha === "xong") dang.xongLuc = Date.now();
  }
  function thaBoss() {
    var e = P.LongQuy.tha("long_quy", GIUA.tx * T, GIUA.ty * T); if (!e) return;
    e.ntBHD = 1; e.aggroUntil = (P.Game ? P.Game.time : 0) + 999; dang.boss = e;
    am("boss_alert");
    if (P.HUD && P.HUD.announce) P.HUD.announce("Đường Chủ Long Quy xuất hiện!", "Coi chừng cú lao cắn, tiếng gầm gây choáng và mai rùa hồi máu");
  }
  function thaChuot(cx, cy, n) {
    for (var i = 0; i < n; i++) {
      var g = Math.random() * Math.PI * 2, d = 20 + Math.random() * 120;
      var x = cx + Math.cos(g) * d, y = cy + Math.sin(g) * d * 0.7;
      if (P.TileMap && P.TileMap.isBlockedPixel && P.TileMap.isBlockedPixel(x, y)) { x = cx; y = cy; }
      var e = P.LongQuy.tha("thu_bao", x, y); if (e) { e.ntBHD = 1; dang.chuot.push(e); }
    }
    dang.thaChuotLuc = Date.now();
  }

  function nhip() {
    var r = flags().ntBachHoRun, o = banDo();
    if (!r) { if (dang || hudEl) { dang = null; hud(null); } return; }
    if (r.het <= Date.now()) { if (o === CAU_HINH.PB) ra("Hết giờ — đã bị đưa ra ngoài thành."); else { flags().ntBachHoRun = null; luu(); hud(null); } return; }
    if (o !== CAU_HINH.PB) {
      vuaToi = 0;
      // đã rời bản đồ (đi cổng, bị hạ, đổi map) → kết thúc lượt
      if (dang) { flags().ntBachHoRun = null; dang = null; luu(); hud(null); caption("Đã rời Bạch Hổ Đường."); }
      return;
    }
    if (W() && W().transitioning) { vuaToi = 0; return; }
    if (!dang) {
      // đợi world.js nạp xong quái của bản đồ rồi mới thả, kẻo bị xoá mất
      if (!vuaToi) vuaToi = Date.now();
      if (Date.now() - vuaToi < 700) return;
      thaTheoPha();
    }
    if (!dang) return;
    if (r.pha === "canh") {
      if (dang.canh.length && dang.canh.every(function (e) { return e.dead; })) {
        r.pha = "boss"; luu(); thaBoss();
      }
    } else if (r.pha === "boss") {
      if (dang.boss && dang.boss.dead) {
        var b = dang.boss; r.pha = "chuot"; r.chuot = 0; luu();
        thuong(ngauNhien(CAU_HINH.THUONG_BOSS), b.x, b.y);
        am("boss_death");
        if (P.HUD && P.HUD.announce) P.HUD.announce("Long Quy đã ngã!", "Thử Bảo trong kho chạy tán loạn — mỗi đòn chỉ mất 1 máu");
        var bx = b.x, by = b.y; dang.boss = null;
        setTimeout(function () { if (dang && luot()) thaChuot(bx, by, CAU_HINH.SO_CHUOT); }, 1200);
      }
    } else if (r.pha === "chuot") {
      dang.chuot.forEach(function (e) {
        if (e.dead && !e.ntDaThuong) { e.ntDaThuong = 1; r.chuot = (r.chuot | 0) + 1; thuong(ngauNhien(CAU_HINH.THUONG_CHUOT), e.x, e.y); }
      });
      var conSong = dang.chuot.filter(function (e) { return !e.dead; });
      var troiHet = dang.thaChuotLuc && Date.now() - dang.thaChuotLuc > CAU_HINH.CHUOT_GIAY * 1000;
      if (dang.thaChuotLuc && (!conSong.length || troiHet)) {
        if (troiHet && conSong.length) {
          var w = W(); conSong.forEach(function (e) { e.dead = true; e.respawnAt = Infinity; if (P.VFX && P.VFX.spawnText) P.VFX.spawnText(e.x, e.y - 20, "chạy thoát", "#cccccc"); });
          if (w && w.enemies) w.enemies = w.enemies.filter(function (e) { return conSong.indexOf(e) < 0; });
        }
        r.pha = "xong"; luu(); dang.xongLuc = Date.now(); am("dungeon_clear");
        if (P.HUD && P.HUD.announce) P.HUD.announce("Bạch Hổ Đường đã dọn xong", "Bắt được " + (r.chuot | 0) + "/" + CAU_HINH.SO_CHUOT + " Thử Bảo · " + CAU_HINH.RA_SAU_GIAY + " giây nữa đưa ra ngoài thành");
      }
    } else if (r.pha === "xong") {
      if (!dang.xongLuc) dang.xongLuc = Date.now();
      if (Date.now() - dang.xongLuc > CAU_HINH.RA_SAU_GIAY * 1000) { ra("Rời Bạch Hổ Đường. Hẹn lượt sau!"); return; }
    }
    hud(r);
  }

  /* ---------------- bảng đếm giờ ---------------- */
  var hudEl = null;
  function hud(r) {
    if (!r) { if (hudEl) { hudEl.remove(); hudEl = null; } return; }
    if (!hudEl) {
      hudEl = document.createElement("div");
      hudEl.id = "nt-bhd-hud";
      hudEl.style.cssText = "position:fixed;top:176px;right:12px;z-index:40;background:rgba(20,16,12,.82);border:1px solid #8a6d3b;border-radius:6px;padding:6px 12px;color:#f0e2c0;font:13px/1.35 serif;text-align:center;pointer-events:auto;min-width:220px";
      hudEl.innerHTML = '<div style="color:#f0d27a;font-weight:700">Bạch Hổ Đường <span data-k="gio"></span></div><div data-k="viec" style="font-size:12px"></div><button data-k="roi" style="margin-top:4px;font:12px serif;padding:2px 10px;background:#3a2d1c;color:#f0e2c0;border:1px solid #8a6d3b;border-radius:4px;cursor:pointer">Rời</button>';
      hudEl.querySelector('[data-k="roi"]').onclick = function () { B.roi(); };
      document.body.appendChild(hudEl);
    }
    var con = Math.max(0, Math.floor((r.het - Date.now()) / 1000));
    hudEl.querySelector('[data-k="gio"]').textContent = "· " + Math.floor(con / 60) + ":" + ("0" + con % 60).slice(-2);
    var viec = "";
    if (r.pha === "canh") viec = "Môn Đồ Canh Giữ: " + (dang ? dang.canh.filter(function (e) { return !e.dead; }).length : 0) + "/" + CANH.length;
    else if (r.pha === "boss") viec = "Hạ Đường Chủ Long Quy" + (dang && dang.boss ? " · " + Math.max(0, Math.round(100 * dang.boss.hp / dang.boss.hpMax)) + "%" : "");
    else if (r.pha === "chuot") viec = "Bắt Thử Bảo: " + (r.chuot | 0) + "/" + CAU_HINH.SO_CHUOT + (dang && dang.thaChuotLuc ? " · còn " + Math.max(0, CAU_HINH.CHUOT_GIAY - Math.floor((Date.now() - dang.thaChuotLuc) / 1000)) + "s" : "");
    else viec = "Đã dọn xong · bắt " + (r.chuot | 0) + "/" + CAU_HINH.SO_CHUOT + " Thử Bảo";
    hudEl.querySelector('[data-k="viec"]').textContent = viec;
  }
  setInterval(function () { try { nhip(); } catch (e) { if (window.console) console.warn("BachHoDuong", e); } }, 250);
  B._dang = function () { return dang; };

  function caiDat() { datNpc(); ganDanhXung(); }
  caiDat();
  if (typeof window !== "undefined") window.addEventListener("load", caiDat);
})(window.PNTT);
