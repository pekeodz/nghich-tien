/* ============================================================================
 *  van_tieu_offline.js — VẬN TIÊU CHƠI KHÔNG CẦN MÁY CHỦ (Nghịch Tiên)
 * ----------------------------------------------------------------------------
 *  Bản gốc của tác giả (systems/van_tieu.js + ui/van_tieu.js) do máy chủ giữ xe, đếm giờ,
 *  cho người khác cướp. File này làm các việc đó ngay trên máy người chơi:
 *    - Nhận tiêu ở Huấn Sư Huynh (Rừng Trúc): cần Trúc Cơ, phí 400 Linh Thạch, 3 chuyến/ngày.
 *      Hạng xe bốc ngẫu nhiên: Trắng / Lục / Đỏ / Vàng (máu xe và thưởng tăng dần).
 *    - Xe đi theo người kéo (người kéo đi chậm, không bay, không Tự Động).
 *      Đi xa xe quá DAY_KEO thì xe "tụt lại"; bỏ quá XE_BO_GIAY giây là mất xe.
 *    - Qua cổng sang bản đồ khác trên tuyến, xe theo sang nếu đang ở gần.
 *    - Ở các bản đồ ngoài vùng an toàn, MA TU CƯỚP TIÊU kéo tới từng đợt quấy phá:
 *      chúng nhắm vào xe, ai lại gần hoặc đánh chúng thì chúng quay sang đánh người.
 *      Xe hết máu là mất hàng.
 *    - Giao ở Bảnh Tiên Sinh (Thành Thăng Long): thưởng theo hạng xe và máu xe còn lại.
 *  Chỉ chạy khi không kết nối máy chủ; có máy chủ thì để nguyên luồng gốc.
 *  Mọi con số chỉnh ở CAU_HINH.
 * ==========================================================================*/
(function (P) {
  "use strict";
  if (!P) return;
  var CAU_HINH = {
    HAN_PHUT: 12,                       // thời hạn một chuyến
    XE_BO_GIAY: 60,                     // xe bị bỏ xa quá lâu thì mất
    XE_THEO: 34,                        // xe đứng cách người kéo chừng này
    TI_LE_HANG: { trang: 50, luc: 30, do: 15, vang: 5 },
    THUONG: { trang: 750, luc: 950, do: 1250, vang: 1900 },   // Linh Thạch khi xe còn đầy máu
    THUONG_TOI_THIEU: 0.5,              // xe gần vỡ vẫn được ít nhất 50% thưởng
    // Ma Tu
    DOT_DAU_GIAY: [4, 8],               // vào bản đồ có cướp: đợt đầu sau 4–8 giây
    DOT_CACH_GIAY: [28, 42],            // các đợt sau cách nhau
    MOI_DOT: [2, 3],                    // số Ma Tu mỗi đợt
    TOI_DA: 5,                          // Ma Tu còn sống tối đa cùng lúc
    MA_TU_HP: 900, MA_TU_DMG: 30,
    DANH_XE: 22, DANH_XE_CACH: 1.2,     // sát thương lên xe mỗi nhát, giây giữa 2 nhát
    MA_TU_THAY_NGUOI: 80,               // Ma Tu nhắm người: người lại gần chừng này thì quay sang đánh người
    TI_LE_NHAM_XE: 0.6,                 // 60% Ma Tu chỉ lo phá xe, bị đánh mới quay sang người
    TAM_DANH_XE: 36,
    MA_TU_LINH_THACH: [15, 35]
  };
  var VO = P.VanTieuOffline = { CAU_HINH: CAU_HINH };
  var VT = function () { return P.VanTieu; };
  function W() { return P.SceneWorld; }
  function online() { var w = W(); return !!(w && w.online && w.online()); }
  function flags() { var Q = P.Quest; if (!Q) return {}; Q.flags = Q.flags || {}; return Q.flags; }
  function luu() { try { P.Quest && P.Quest.save && P.Quest.save(); } catch (e) {} }
  function banDo() { return (P.TileMap && P.TileMap.data && P.TileMap.data.id) || ""; }
  function tg() { return (P.Game && P.Game.time) || performance.now() / 1000; }
  function hop(t, nd, o) { if (P.HUD && P.HUD.openDialog) P.HUD.openDialog(t, nd, o || {}); }
  function bao(t) { if (P.HUD && P.HUD.toast) P.HUD.toast(t); else if (P.HUD && P.HUD.setCaption) P.HUD.setCaption(t); }
  function am(t) { try { P.Audio && P.Audio.play && P.Audio.play(t); } catch (e) {} }
  function rnd(a) { return a[0] + Math.random() * (a[1] - a[0]); }
  function rndInt(a) { return a[0] + Math.floor(Math.random() * (a[1] - a[0] + 1)); }
  function kc(a, b) { var dx = a.x - b.x, dy = a.y - b.y; return Math.sqrt(dx * dx + dy * dy); }
  function chan(x, y) { var t = P.TileMap; return !!(t && t.isBlockedPixel && t.isBlockedPixel(x, y)); }
  function themDa(n, x, y) {
    if (!n) return;
    if (P.Progress && P.Progress.addStones) P.Progress.addStones(n); else if (P.Progress) P.Progress.stones = (P.Progress.stones | 0) + n;
    if (P.HUD && P.HUD.refreshStones) P.HUD.refreshStones();
    if (P.VFX && P.VFX.spawnText && x != null) P.VFX.spawnText(x, y - 40, "+" + n + " Linh Thạch", "#ffe08a");
  }

  /* ---------------- Ma Tu Cướp Tiêu ---------------- */
  function khaiBao() {
    var D = P.ENEMY_DEFS; if (!D || D.ma_tu_cuop_tieu) return !!D;
    D.ma_tu_cuop_tieu = {
      name: "Ma Tu Cướp Tiêu", level: 15,
      tuSi: { gender: "male", hair: "ma_vi", hairColor: "hac", beard: "none", outfit: "ma_vuong_bao", skin: "tan", shoes: "ink", weapon: "bich_nguc_ta_dao" },
      sprite: { w: 32, h: 64, ax: 16, ay: 62 }, barY: 50,
      hp: CAU_HINH.MA_TU_HP, exp: 45, speed: 66, aggro: CAU_HINH.MA_TU_THAY_NGUOI, contactDmg: CAU_HINH.MA_TU_DMG, hitCooldown: .9,
      wanderRadius: 30, wanderPause: 1.2, respawnSec: 0, khongNhan: !0, maTuCuop: !0
    };
    return true;
  }

  /* ---------------- trạng thái chuyến ---------------- */
  var xe = null;          // quái "tieu_xa_<hạng>" đang theo người
  var maTu = [];          // Ma Tu đang sống
  var bdTruoc = "", dotSau = 0, xaTu = 0, gioLuu = 0;
  function chuyen() { var r = flags().ntVanTieu; return r && r.hang ? r : null; }

  function hangNgauNhien() {
    var t = CAU_HINH.TI_LE_HANG, tong = 0, k; for (k in t) tong += t[k];
    var x = Math.random() * tong; for (k in t) { x -= t[k]; if (x <= 0) return k; } return "trang";
  }
  function baoUI(r, act) {
    var U = P.VanTieuUI, V = VT(); if (!U || !U.nhan || !V) return;
    U.nhan({ act: act || "st", hang: r.hang, heSo: V.heSoToc(r.hang), han: Math.max(0, r.het - Date.now()), hp: r.hp, hm: r.hm, co: "do" });
    // HUD gốc đếm hạn từ lúc nhận: đặt lại cho đúng giờ còn lại
    if (U.chuyen) { U.chuyen.nhanLuc = Date.now(); U.chuyen.han = Math.max(0, r.het - Date.now()); }
  }
  function datXe(r, x, y) {
    var w = W(); if (!w || !w.enemies || !P.Enemy) return null;
    xoaXe();
    var e = P.Enemy.create({ id: "tieu_xa_nt", type: "tieu_xa_" + r.hang, x: x, y: y, noRespawn: true });
    e.hpMax = r.hm; e.hp = Math.max(1, Math.min(r.hm, r.hp)); e.ntXe = 1;
    w.enemies.push(e); xe = e; xaTu = 0;
    return e;
  }
  function xoaXe() {
    var w = W();
    if (w && w.enemies) w.enemies = w.enemies.filter(function (e) { return !e.ntXe; });
    xe = null;
  }
  function xoaMaTu() {
    var w = W();
    if (w && w.enemies) w.enemies = w.enemies.filter(function (e) { return !(e.def && e.def.maTuCuop); });
    maTu = [];
  }
  function ketThuc(ly, thuong) {
    var r = flags().ntVanTieu;
    flags().ntVanTieu = null; luu();
    xoaXe(); xoaMaTu();
    var U = P.VanTieuUI;
    if (U && U.nhan) U.nhan({ act: "het", ly: ly, thuong: thuong, co: "" });
    var pl = W() && W().player; if (pl) pl.tieuXa = 0;
    return r;
  }

  /* ---------------- nhận / giao / bỏ ---------------- */
  VO.nhan = function () {
    var V = VT(), pl = W() && W().player; if (!V || !pl) return;
    var f = flags();
    var k = V.checkNhan({ R: P, flags: f, stones: P.Progress && P.Progress.stones, daCoTieu: !!chuyen(), downed: !!pl.downed, dangBay: !!pl.flying, coDenBuoc: false, giaoThuc: null, now: Date.now() });
    if (!k.ok) { am("deny"); return hop("Huấn Sư Huynh", k.why); }
    if (!P.Progress.spendStones || !P.Progress.spendStones(V.PHI)) { am("deny"); return hop("Huấn Sư Huynh", V.viLoi("thieu_phi")); }
    V.ghiLuot(f, V.CO_VAN, Date.now());
    var hang = hangNgauNhien(), hm = V.hpXe(hang);
    var r = f.ntVanTieu = { hang: hang, het: Date.now() + CAU_HINH.HAN_PHUT * 60000, hp: hm, hm: hm, diet: 0 };
    luu();
    if (P.HUD && P.HUD.refreshStones) P.HUD.refreshStones();
    if (P.HUD && P.HUD.closeDialog) P.HUD.closeDialog();
    if (pl.flying && P.Player && P.Player.landFly) { try { P.Player.landFly(pl, P.TileMap); } catch (e) {} }
    datXe(r, pl.x + 28, pl.y + 10);
    baoUI(r, "bat");
    am("coin");
    hop("Huấn Sư Huynh", 'Huấn Sư Huynh vỗ vai:\n\n"Xe ' + V.tenHang(hang) + ' giao cho đạo hữu. Đường lên Thăng Long phải qua Bãi Đá, Mỏ Linh Thạch và Thung Lũng — ma tu hay rình cướp ở đó. Giữ xe cho kỹ, ' + CAU_HINH.HAN_PHUT + ' phút phải tới nơi."');
  };
  VO.giao = function (npc) {
    var r = chuyen(), pl = W() && W().player, V = VT(); if (!r || !pl || !V) return;
    if (!xe || xe.dead) return hop(npc.name || "Bảnh Tiên Sinh", V.viLoi("khong_co_tieu"));
    var nx = (npc.tx + 0.5) * 32, ny = (npc.ty + 0.5) * 32;
    if (kc(pl, { x: nx, y: ny }) > V.GIAO_NGUOI + 30) return hop(npc.name || "Bảnh Tiên Sinh", V.viLoi("chua_toi"));
    if (kc(xe, { x: nx, y: ny }) > V.GIAO_XE + 40) return hop(npc.name || "Bảnh Tiên Sinh", V.viLoi("xe_chua_toi"));
    var k = Math.max(CAU_HINH.THUONG_TOI_THIEU, xe.hp / xe.hpMax), thuong = Math.round((CAU_HINH.THUONG[r.hang] || 600) * k);
    var x = xe.x, y = xe.y;
    ketThuc("giao", thuong);
    themDa(thuong, x, y);
    am("coin");
    if (P.HUD && P.HUD.closeDialog) P.HUD.closeDialog();
    hop(npc.name || "Bảnh Tiên Sinh", 'Ông kiểm hàng một lượt, gật gù:\n\n"Đủ cả. Đây là ' + thuong + ' Linh Thạch công kéo xe' + (r.diet ? ", thêm phần dẹp " + r.diet + " tên ma tu dọc đường" : "") + '."');
  };
  VO.bo = function () {
    if (!chuyen()) return;
    ketThuc("bo");
    bao("Đã bỏ hàng. Xe tiêu tan, mất phí.");
  };

  /* ---------------- hộp thoại NPC (thay luồng máy chủ khi chơi offline) ---------------- */
  function boHang() { return { label: "Bỏ Hàng", note: "Mất phí, xe tan", onChoose: VO.bo }; }
  function bocUI() {
    var U = P.VanTieuUI; if (!U || U.__ntOffline) return !!(U && U.__ntOffline);
    U.__ntOffline = true;
    var goc1 = U.moLyThanh, goc2 = U.moBanh;
    U.moLyThanh = function (npc, noiChuyen) {
      if (online()) return goc1.apply(this, arguments);
      var V = VT(); if (!V) return false;
      var r = chuyen(), ten = npc.name || "Huấn Sư Huynh", nc = { label: "Nói Chuyện", onChoose: noiChuyen };
      if (r) { hop(ten, "Hàng còn trên đường. Kéo xe tới Bảnh Tiên Sinh ở Thành Thăng Long.", { choices: [boHang(), nc] }); return true; }
      if (!V.daTrucCo(P)) return false;
      var f = flags(), pl = W() && W().player;
      var k = V.checkNhan({ R: P, flags: f, stones: P.Progress && P.Progress.stones, daCoTieu: false, downed: !!(pl && pl.downed), dangBay: !!(pl && pl.flying), coDenBuoc: false, giaoThuc: null, now: Date.now() });
      hop(ten, '"Có chuyến hàng gửi Bảnh Tiên Sinh ở Thành Thăng Long. Đạo hữu kéo giúp ta nhé — chỉ đi bộ, ma tu rình cướp dọc đường."',
        { choices: [{ label: "Nhận Tiêu", primary: k.ok, note: k.ok ? V.PHI + " Linh Thạch · còn " + V.conLuotVan(f, Date.now()) + "/" + V.LUOT_VAN + " lượt" : k.why, disabled: !k.ok, onChoose: VO.nhan },
          { label: "Vận tiêu là gì?", onChoose: function () { gioiThieu(npc, noiChuyen); } }, nc] });
      return true;
    };
    U.moBanh = function (npc, nghe) {
      if (online()) return goc2.apply(this, arguments);
      var V = VT(); if (!V) return false;
      var ten = npc.name || "Bảnh Tiên Sinh", ng = { label: "Nghe Ông Nói", onChoose: nghe };
      if (chuyen()) { hop(ten, 'Ông liếc chiếc xe, gật đầu:\n\n"Để xe đó. Đủ hàng thì có thưởng."', { choices: [{ label: "Giao Hàng", primary: true, note: "Đứng cạnh ông, xe sát bên", onChoose: function () { VO.giao(npc); } }, boHang(), ng] }); return true; }
      if (!V.daTrucCo(P)) return false;
      hop(ten, '"Hàng của Huấn Sư Huynh ở Rừng Trúc? Kéo tới đây thì ta trả công."', { choices: [ng] });
      return true;
    };
    return true;
  }
  function gioiThieu(npc, nc) {
    var V = VT(), T = CAU_HINH.THUONG;
    hop((npc.name || "Huấn Sư Huynh") + " · Vận tiêu",
      "Nhận một xe hàng ở đây rồi kéo tới Bảnh Tiên Sinh ở cổng tây Thành Thăng Long, đi qua Tản Viên, Bãi Đá, Mỏ Linh Thạch và Thung Lũng.\n\n" +
      "• Cần Trúc Cơ, phí " + V.PHI + " Linh Thạch, mỗi ngày " + V.LUOT_VAN + " chuyến, hạn " + CAU_HINH.HAN_PHUT + " phút.\n" +
      "• Kéo xe thì đi chậm, không bay được. Đi xa xe quá thì xe tụt lại, bỏ lâu là mất.\n" +
      "• Ngoài Rừng Trúc, Tản Viên và Thăng Long, Ma Tu Cướp Tiêu sẽ kéo tới từng đợt phá xe. Xe vỡ là mất hàng.\n" +
      "• Hạng xe bốc ngẫu nhiên. Thưởng khi giao (xe còn nguyên): Trắng " + T.trang + ", Lục " + T.luc + ", Đỏ " + T.do + ", Vàng " + T.vang + " Linh Thạch. Xe càng sứt mẻ thưởng càng ít.",
      { choices: [{ label: "Quay lại", onChoose: function () { P.VanTieuUI.moLyThanh(npc, nc); } }], oneCol: true });
  }

  /* ---------------- xe đi theo + Ma Tu ---------------- */
  function theoNguoi(dt, pl) {
    var V = VT(), d = kc(xe, pl);
    var keo = V ? V.DAY_KEO : 320;
    if (d > keo) { xaTu += dt; xe.state = "idle"; return; }
    xaTu = 0;
    if (d <= CAU_HINH.XE_THEO) { xe.state = "idle"; return; }
    var sp = Math.max(40, (pl.speed || 68) * ((V && V.heSoToc(chuyen().hang)) || 0.85) * 1.15);
    var bb = Math.min(sp * dt, d - CAU_HINH.XE_THEO);
    var nx = xe.x + (pl.x - xe.x) / d * bb, ny = xe.y + (pl.y - xe.y) / d * bb;
    if (!chan(nx, ny)) { xe.x = nx; xe.y = ny; }
    else if (!chan(nx, xe.y)) xe.x = nx;
    else if (!chan(xe.x, ny)) xe.y = ny;
    else if (d > 90) { xe.x = pl.x - (pl.x - xe.x) / d * 30; xe.y = pl.y - (pl.y - xe.y) / d * 30; }  // kẹt góc: kéo bật qua
    xe.dir = pl.x >= xe.x ? 1 : -1;
    xe.animTime = (xe.animTime || 0) + dt;
  }
  function thaDot() {
    var w = W(), pl = w && w.player; if (!xe || !pl) return;
    var song = maTu.filter(function (e) { return !e.dead; }).length;
    var n = Math.min(rndInt(CAU_HINH.MOI_DOT), CAU_HINH.TOI_DA - song);
    if (n <= 0) return;
    for (var i = 0; i < n; i++) {
      var g = Math.random() * Math.PI * 2, r = 150 + Math.random() * 60;
      var x = xe.x + Math.cos(g) * r, y = xe.y + Math.sin(g) * r * 0.8;
      if (P.TileMap && P.TileMap.nearestWalkable) {
        var T = (P.CONFIG && P.CONFIG.TILE) || 32, o = P.TileMap.nearestWalkable(Math.floor(x / T), Math.floor(y / T), 6);
        if (o) { x = (o.tx + 0.5) * T; y = (o.ty + 0.5) * T; }
      }
      var e = P.Enemy.create({ id: "ma_tu_" + Math.random().toString(36).slice(2, 7), type: "ma_tu_cuop_tieu", x: x, y: y, noRespawn: true });
      e.ntDanhXe = 0; e.ntNhamXe = Math.random() < CAU_HINH.TI_LE_NHAM_XE; w.enemies.push(e); maTu.push(e);
      if (P.VFX && P.VFX.spawnRing) P.VFX.spawnRing(x, y, "#a23cff", 26, 0.5);
    }
    am("boss_alert");
    bao(n + " Ma Tu Cướp Tiêu xông ra chặn xe!");
  }
  function bocEnemy() {
    var E = P.Enemy; if (!E || !E.update || E.update.__ntVT) return !!(E && E.update && E.update.__ntVT);
    var goc = E.update;
    E.update = function (e, dt, pl) {
      if (e && !e.dead) {
        if (e.ntXe) { if (e === xe && pl && !(W() && W().transitioning)) theoNguoi(dt, pl); return; }   // xe đi theo người kéo
        if (e.def && e.def.maTuCuop && xe && !xe.dead && pl) {
          var dNguoi = kc(e, pl), bucMinh = e.aggroUntil && e.aggroUntil > tg();
          var danhNguoi = bucMinh || (!e.ntNhamXe && dNguoi < CAU_HINH.MA_TU_THAY_NGUOI);
          if (!danhNguoi && e.stunT <= 0 && !(e.freezeT > 0)) {
            e.animTime = (e.animTime || 0) + dt;
            var d = kc(e, xe);
            if (d > CAU_HINH.TAM_DANH_XE) {
              var sp = (e.def.speed || 60) * (e.slowT > 0 ? (e.slowMult || 0.6) : 1) * dt;
              var nx = e.x + (xe.x - e.x) / d * sp, ny = e.y + (xe.y - e.y) / d * sp;
              if (!chan(nx, ny)) { e.x = nx; e.y = ny; } else if (!chan(nx, e.y)) e.x = nx; else if (!chan(e.x, ny)) e.y = ny;
              e.state = "chase"; e.dir = xe.x >= e.x ? 1 : -1;
            } else {
              e.state = "idle";
              e.ntDanhXe = (e.ntDanhXe || 0) - dt;
              if (e.ntDanhXe <= 0) {
                e.ntDanhXe = CAU_HINH.DANH_XE_CACH;
                e.atkAnimAt = e.drawTime; e.attackState = "telegraph";
                setTimeout(function () { if (e.attackState === "telegraph") e.attackState = "none"; }, 180);
                xe.hp -= CAU_HINH.DANH_XE;
                if (P.VFX && P.VFX.spawnDamage) P.VFX.spawnDamage(xe.x, xe.y - 30, CAU_HINH.DANH_XE, "take");
                am("hit");
              }
            }
            return;
          }
        }
      }
      return goc.apply(this, arguments);
    };
    E.update.__ntVT = true;
    return true;
  }

  /* ---------------- nhịp chính ---------------- */
  var tLan = 0;
  function nhip() {
    var now = performance.now() / 1000, dt = tLan ? Math.min(0.25, now - tLan) : 0.05; tLan = now;
    var r = chuyen();
    if (!r) { if (xe) xoaXe(); if (maTu.length) xoaMaTu(); bdTruoc = banDo(); return; }
    if (online()) return;
    var w = W(), pl = w && w.player, V = VT();
    if (!w || !pl || !V || w.transitioning) return;
    var bd = banDo();
    if (Date.now() > r.het) { ketThuc("han"); return bao("Quá hạn vận tiêu — hàng bị thu hồi."); }
    // vừa đổi bản đồ
    if (bd !== bdTruoc) {
      var vua = bdTruoc; bdTruoc = bd; maTu = [];
      if (!V.trongTuyen(bd)) { ketThuc("bo"); return bao("Rời tuyến vận tiêu — xe bị bỏ lại."); }
      if (vua && r.xeXa) { ketThuc("bo"); return bao("Xe bị bỏ lại ở bản đồ trước — mất hàng."); }
      datXe(r, pl.x + 24, pl.y + 12);
      dotSau = V.camCuop(bd) ? 0 : now + rnd(CAU_HINH.DOT_DAU_GIAY);
      baoUI(r);
      return;
    }
    if (!xe || w.enemies.indexOf(xe) < 0) { datXe(r, pl.x + 24, pl.y + 12); baoUI(r); }
    if (pl.flying && P.Player && P.Player.landFly) { try { P.Player.landFly(pl, P.TileMap); } catch (e) {} }
    pl.tieuXa = V.heSoToc(r.hang);
    // xe vỡ
    if (xe.hp <= 0 || xe.dead) {
      var x = xe.x, y = xe.y;
      ketThuc("vo");
      if (P.VFX && P.VFX.spawnRing) P.VFX.spawnRing(x, y, "#ff5a3a", 40, 0.6);
      am("boss_death");
      return hop("Vận Tiêu", "Ma Tu đã phá nát xe hàng. Chuyến này coi như mất.");
    }
    r.xeXa = xaTu > 0;
    if (xaTu > CAU_HINH.XE_BO_GIAY) { ketThuc("bo"); return bao("Bỏ xe quá lâu — hàng bị mất."); }
    // Ma Tu
    maTu.forEach(function (e) {
      if (e.dead && !e.ntDaTinh) { e.ntDaTinh = 1; r.diet = (r.diet | 0) + 1; themDa(rndInt(CAU_HINH.MA_TU_LINH_THACH), e.x, e.y); }
    });
    if (!V.camCuop(bd) && dotSau && now >= dotSau) { thaDot(); dotSau = now + rnd(CAU_HINH.DOT_CACH_GIAY); }
    r.hp = Math.max(0, Math.round(xe.hp));
    // HUD gốc: dòng trạng thái
    var U = P.VanTieuUI;
    if (U && U.chuyen) {
      U.chuyen.hp = r.hp; U.chuyen.nhanLuc = Date.now(); U.chuyen.han = Math.max(0, r.het - Date.now());
      U.chuyen.dung = xaTu > 0 ? Math.max(1, Math.round((CAU_HINH.XE_BO_GIAY - xaTu) * 1000)) : 0;
    }
    if (now - gioLuu > 5) { gioLuu = now; luu(); }
  }
  VO._xe = function () { return xe; };
  VO._maTu = function () { return maTu; };
  VO._thaDot = thaDot;

  function caiDat() { var a = khaiBao(), b = bocUI(), c = bocEnemy(); return a && b && c; }
  var lan = 0, hen = setInterval(function () { if (caiDat() || ++lan > 150) clearInterval(hen); }, 100);
  setInterval(function () { try { nhip(); } catch (e) { if (window.console) console.warn("VanTieuOffline", e); } }, 100);
})(window.PNTT);
