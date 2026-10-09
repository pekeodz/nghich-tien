/* ============================================================================
 *  chien_truong_offline.js — VẠN HOANG CHIẾN TRƯỜNG CHẠY TRÊN MÁY (Nghịch Tiên)
 * ----------------------------------------------------------------------------
 *  Bản gốc của tác giả: trận sinh tồn 16–100 người thật, máy chủ điều khiển.
 *  Nghịch Tiên không có máy chủ đấu trực tiếp, nên tệp này đóng vai "máy chủ" ngay
 *  trên máy: tạo đảo, bot, vòng bo, rương, bụi rồi gửi tin cho giao diện gốc
 *  (ChienTruongUI.nhan) đúng như máy chủ thật gửi.
 *
 *  Luật giữ theo bản gốc (src/systems/chien_truong.js của tác giả):
 *    - Luyện Khí tầng 7–13 vào bảng Luyện Khí, Trúc Cơ vào bảng Trúc Cơ;
 *    - khiên mở màn 8 giây, khoá chân 5 giây; 3 mạng; từ vòng bo 4 gục là bị loại;
 *    - 6 vòng bo theo đúng mốc và mức mất máu; rương cho buff; bụi để ẩn;
 *    - chỉ đánh thường (giao diện gốc đã chặn kỹ năng, bay; tệp này chặn thêm đan dược);
 *    - xếp hạng: sống lâu hơn → mạng còn → số hạ gục → sát thương.
 *  Khác bản gốc: vào bất cứ lúc nào ở Chấp Sự Đại Hội; đối thủ là bot (SO_BOT);
 *  thưởng top 4 (như Đại Hội) chỉ nhận một lần mỗi ngày.
 * ==========================================================================*/
(function (P) {
  "use strict";
  var CT = P.ChienTruong;
  if (!CT) return;
  var O = P.ChienTruongOffline = {};
  var CAU_HINH = O.CAU_HINH = {
    SO_BOT: 20,                // số đối thủ ảo mỗi trận
    BOT_MAU: 14,               // số đòn thường của người chơi để hạ một bot cùng cảnh giới
    BOT_DON: 0.055,            // đòn của bot = % Khí Huyết tối đa người chơi
    BOT_SUC: 0.85,             // hệ số sức mạnh chung của bot
    BOT_DANH_NHAU_DPS: 0.055,  // hai bot đánh nhau: mỗi giây mất % máu của mình
    TAM_NHIN: 240,             // bot thấy đối thủ trong bán kính này
    TAM_RUONG: 520             // bot đi tìm rương trong bán kính này
  };

  /* ---------------- tiện ích ---------------- */
  function W() { return P.SceneWorld; }
  function pl() { return W() && W().player; }
  function mapId() { var m = W() && W().map; return (m && m.data && m.data.id) || ""; }
  function bayGio() { return Date.now(); }
  function tg() { return P.Game ? P.Game.time : Date.now() / 1000; }
  function UI() { return P.ChienTruongUI; }
  function gui(m) { m.serverNow = bayGio(); try { if (UI() && UI().nhan) UI().nhan(m); } catch (e) { if (window.console) console.error(e); } }
  function dist(a, b) { return Math.hypot(a.x - b.x, a.y - b.y); }
  function rnd(a, b) { return a + Math.random() * (b - a); }
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  function flags() { var q = P.Quest; if (q && !q.flags) q.flags = {}; return q ? q.flags : {}; }
  function luu() { try { P.Quest && P.Quest.save && P.Quest.save(); } catch (e) {} }
  function ngay() { return P.Tournament && P.Tournament.ngayVN ? P.Tournament.ngayVN() : Math.floor((Date.now() + 252e5) / 864e5); }
  function chu(t) { if (P.HUD && P.HUD.setCaption) P.HUD.setCaption(t); }
  function hop(a, b, o) { if (P.HUD && P.HUD.openDialog) P.HUD.openDialog(a, b, o || {}); }
  function tenVat(id) { return id === "linh_thach" ? "Linh Thạch" : (P.ITEMS && P.ITEMS[id] ? P.ITEMS[id].name : id); }
  function bao(text, kieu) { gui({ act: "bao", text: text, kieu: kieu || "info" }); }
  function chanDuoc(x, y) {
    var m = W() && W().map; if (!m || !m.rectBlocked) return false;
    return m.rectBlocked(x - 7, y - 8, x + 7, y);
  }
  // điểm đứng được, trong vòng tròn (cx,cy,r)
  function diemTrong(cx, cy, r, thu) {
    for (var i = 0; i < (thu || 80); i++) {
      var g = Math.random() * Math.PI * 2, k = Math.sqrt(Math.random()) * r;
      var x = cx + Math.cos(g) * k, y = cy + Math.sin(g) * k;
      if (!chanDuoc(x, y) && !chanDuoc(x + 16, y) && !chanDuoc(x - 16, y)) return { x: x, y: y };
    }
    return null;
  }

  /* ---------------- trận ---------------- */
  var tran = null;
  O.dangDau = function () { return !!tran; };
  O.tran = function () { return tran; };
  function trongTran() { return !!tran && mapId() === CT.MAP; }
  function boHienTai() { return tran ? CT.boTai(tran.boData, bayGio() - tran.t0) : null; }
  function tenBang(b) { return CT.BANG[b] ? CT.BANG[b].ten : b; }

  // ai được dự
  O.tuCach = function () {
    var p = P.Progress, r = p && p.realmId;
    var b = CT.bangCua(r);
    return b;
  };
  function cheoCanhGioi(bang) {
    var R = P.REALMS || [];
    var ri = function (id) { return P.realmIndexById ? P.realmIndexById(id) : 0; };
    var cua = ri(P.Progress.realmId), ds = [];
    for (var i = 0; i < R.length; i++) {
      var id = R[i].id, b = CT.bangCua(id);
      if (b.bang === bang && Math.abs(ri(id) - cua) <= 2) ds.push(id);
    }
    return ds.length ? ds : [P.Progress.realmId];
  }

  /* ---------- tạo trận ---------- */
  O.batDau = function () {
    if (tran) return;
    var tc = O.tuCach();
    if (!tc.bang) return hop(CT.TEN, tc.why || "Chưa đủ tư cách.");
    var p = pl(); if (!p) return;
    if (p.downed) return hop(CT.TEN, CT.viLoi("trong_thuong"));
    if (P.HUD && P.HUD.closeDialog) P.HUD.closeDialog();
    if (p.flying && P.Player && P.Player.landFly) { try { P.Player.landFly(p); } catch (e) {} }
    tran = { bang: tc.bang, pha: "vao", mapTruoc: mapId(), bots: [], buff: { cong: [], giap: [], hoi: [], toc: [], mau: [] } };
    chu("Đang vào " + CT.TEN + "…");
    W().switchMap(CT.MAP);
    var lan = 0;
    (function cho() {
      var w = W();
      if (w && w.map && w.map.data && w.map.data.id === CT.MAP && !w.transitioning && w.player) return setTimeout(khoiTao, 400);
      if (++lan > 150) { tran = null; return; }
      setTimeout(cho, 100);
    })();
  };

  function khoiTao() {
    var p = pl(); if (!tran || !p) return;
    var t = tran, now = bayGio();
    var cx = CT.TAM.x, cy = CT.TAM.y, R = CT.R_MAX;
    t.t0 = now + CT.KHOA_CHAN_MO_MAN_MS;          // bo tính từ lúc mở khoá
    t.khoaDen = now + CT.KHOA_CHAN_MO_MAN_MS;
    t.khienDen = now + CT.KHIEN_MO_MAN_MS;
    t.boData = CT.taoChuoiBo(null, Math.random);
    t.n = CAU_HINH.SO_BOT + 1;
    t.toi = { ten: (p.cfg && p.cfg.name) || p.name || "Đạo hữu", mang: CT.MANG, haSat: 0, sat: 0, song: true, loaiLuc: 0, la: "toi" };
    t.gdCuoi = 0;
    t.daBao = {};
    t.ketThuc = false;
    t.ruongDem = 0;
    // chỗ thả: rải đều quanh đảo, cách nhau ≥ KHOANG_CACH_THA
    var cho = [];
    function layCho() {
      for (var k = 0; k < 60; k++) {
        var d = diemTrong(cx, cy, R * 0.85, 40);
        if (!d) continue;
        var xa = cho.every(function (c) { return dist(c, d) >= CT.KHOANG_CACH_THA; });
        if (xa || k > 50) { cho.push(d); return d; }
      }
      return { x: cx + rnd(-60, 60), y: cy + rnd(-60, 60) };
    }
    var dToi = layCho();
    p.x = dToi.x; p.y = dToi.y; if (p.stop) p.stop();
    p.hp = p.hpMax; p.mp = p.mpMax; if (p.bpMax) p.bp = p.bpMax;
    p.reviveShield = 2.8; p.hurtTimer = CT.KHIEN_MO_MAN_MS / 1000;   // vòng khiên gốc tối đa 3 giây; nhịp giữ lại tới hết khiên
    t.khoaO = { x: p.x, y: p.y };
    if (P.Camera && P.Camera.snapTo && P.Renderer) P.Camera.snapTo(p.x, p.y, P.Renderer.w, P.Renderer.h, W().map.pxWidth, W().map.pxHeight);
    // bot
    var canh = cheoCanhGioi(t.bang), HE = ["kim", "moc", "thuy", "hoa", "tho", "loi", "bang", "phong", "am", "quang"];
    var goc = Math.floor(Math.random() * 50);
    for (var i = 0; i < CAU_HINH.SO_BOT; i++) {
      var hs = P.NTBot.hoSo((goc + i * 7) % 50, pick(canh));
      hs.cfg.linhCan = pick(HE);
      var d = layCho();
      var e = taoBot(hs, d.x, d.y);
      t.bots.push(e);
    }
    // bụi và rương
    t.bui = []; t.ruong = [];
    var soBui = CT.soBui(R), id = 1;
    for (var b = 0; b < soBui * 3 && t.bui.length < soBui; b++) {
      var q = diemTrong(cx, cy, R * 0.92, 20); if (!q) continue;
      if (t.bui.every(function (o) { return dist(o, q) > 90; })) t.bui.push({ id: id++, x: q.x, y: q.y, nguoi: 0 });
    }
    themRuong(CT.soRuong(t.n), cx, cy, R * 0.9, false);
    gui({ act: "bo", t0: t.t0, r0: t.boData.r0, tam: t.boData.tam0, ds: t.boData.gd });
    gui({ act: "tha", khoaMs: CT.KHOA_CHAN_MO_MAN_MS, n: t.n, tenBang: tenBang(t.bang), mang: CT.MANG });
    gui({ act: "vat", them: { b: t.bui.map(function (o) { return [o.id, o.x, o.y]; }), r: t.ruong.map(function (o) { return [o.id, o.x, o.y, o.vang ? 1 : 0]; }) }, bo: {}, lay: [] });
    t.pha = "dau";
    t.anTu = 0; t.an = false; t.anLoKhoa = 0; t.anNghi = {}; t.dungYenTu = 0; t.viTriCu = { x: p.x, y: p.y };
    t.mo = null;
    t.tick = setInterval(nhip, CT.SOAT_NHIP_MS);
    t.lastTick = bayGio();
    if (P.Audio && P.Audio.play) P.Audio.play("duel_start");
  }

  function themRuong(so, cx, cy, r, vang) {
    var t = tran, them = [];
    for (var k = 0; k < so * 6 && them.length < so; k++) {
      var q = diemTrong(cx, cy, r, 20); if (!q) continue;
      if (t.ruong.concat(them).every(function (o) { return dist(o, q) > 150; })) them.push({ id: ++t.ruongDem, x: q.x, y: q.y, vang: !!vang, mo: null });
    }
    t.ruong = t.ruong.concat(them);
    return them;
  }

  /* ---------- bot ---------- */
  function taoBot(hs, x, y) {
    var e = P.NTBot.taoChienBot(hs, x, y, { kieu: "chientruong", heSo: CAU_HINH.BOT_SUC });
    var def = e.def;
    var p = pl();
    // máu & đòn theo luật Chiến Trường (mỏng hơn tỉ thí để trận nhanh)
    var cs = P.NTBot.chiSo(hs.realm, CAU_HINH.BOT_SUC);
    var dmg = (P.Player && P.Player.meleeDamage && p) ? P.Player.meleeDamage(p) : 10;
    var hpMax = Math.max(60, Math.round(dmg * CAU_HINH.BOT_MAU * cs.f));
    // khắc chế hệ (chỉ tính khi cả hai đã có hệ — từ Trúc Cơ)
    var khacToi = heSo(cfgToi(), hs.cfg), khacBot = heSo(hs.cfg, cfgToi());
    def.contactDmg = Math.max(3, Math.round((p ? p.hpMax : 100) * CAU_HINH.BOT_DON * cs.f * khacBot));
    def.hp = hpMax; e.hp = hpMax; e.hpMax = hpMax;
    def.aggro = 0; def.leashRange = 99999; def.wanderRadius = 8; def.wanderPause = 0.25;
    e.aggroUntil = 0;
    e.ct = { tocGoc: def.speed || 60, hs: hs, ten: hs.name, mang: CT.MANG, haSat: 0, sat: 0, song: true, loaiLuc: 0, f: cs.f, khac: khacToi,
             muc: null, doi: null, buff: {}, ketT: 0, cuX: x, cuY: y, nghiDen: 0, moRuong: null, hoiDen: 0, khienDen: bayGio() + CT.KHIEN_MO_MAN_MS };
    e.homeX = x; e.homeY = y;
    return e;
  }
  function cfgToi() { var p = pl(); return p ? Object.assign({}, p.cfg || {}, { realmId: p.realmId || (P.Progress && P.Progress.realmId) }) : null; }
  function heSo(a, b) {
    try { return P.Player && P.Player.heSoKhac && a && b ? P.Player.heSoKhac(a, b) : 1; } catch (e) { return 1; }
  }
  function botSong() { return tran ? tran.bots.filter(function (e) { return e.ct.song; }) : []; }
  function soConSong() { return botSong().length + (tran && tran.toi.song ? 1 : 0); }
  function trenDao(e) { return W().enemies.indexOf(e) >= 0; }
  function anBot(e) { var ds = W().enemies, i = ds.indexOf(e); if (i >= 0) ds.splice(i, 1); }
  function hienBot(e) { if (!trenDao(e)) { e.dead = false; W().enemies.push(e); } }

  // bot gục: mất mạng, hồi sinh hoặc bị loại
  function botGuc(e, keGiet) {
    var c = e.ct; if (!c.song || c.gucDen) return;
    c.mang--;
    if (P.VFX && P.VFX.spawnText) P.VFX.spawnText(e.x, e.y - 56, "Gục!", "#ff9a8a");
    var bo = boHienTai(), gd = bo ? bo.k : 0;
    if (keGiet) { keGiet.haSat++; bao((keGiet.la === "toi" ? "Đạo hữu" : keGiet.ten) + " hạ " + c.ten, keGiet.la === "toi" ? "tot" : "info"); }
    if (c.mang <= 0 || gd >= CT.LOAI_TU_GD) {
      c.song = false; c.loaiLuc = bayGio() - tran.t0; c.mangCuoi = Math.max(0, c.mang);
      anBot(e); e.dead = true;
      kiemTraKetThuc();
      return;
    }
    c.gucDen = bayGio() + CT.HOI_SINH_CHO_MS;
    anBot(e); e.dead = true;
  }
  function botHoiSinh(e) {
    var c = e.ct, bo = boHienTai();
    var vong = bo ? (bo.dich && bo.pha !== "xong" ? bo.dich : bo) : { x: CT.TAM.x, y: CT.TAM.y, r: CT.R_MAX };
    var d = null;
    for (var k = 0; k < 20; k++) {
      var q = diemTrong(vong.x, vong.y, Math.max(80, vong.r * 0.8), 30); if (!q) continue;
      var p = pl(), xa = (!p || !tran.toi.song || dist(q, p) > CT.HOI_SINH_CACH_DICH) && botSong().every(function (o) { return o === e || !trenDao(o) || dist(o, q) > CT.HOI_SINH_CACH_DICH; });
      d = q; if (xa) break;
    }
    if (!d) d = { x: CT.TAM.x, y: CT.TAM.y };
    e.x = d.x; e.y = d.y; e.homeX = d.x; e.homeY = d.y;
    e.hp = Math.round(e.hpMax * CT.HOI_SINH_HP);
    c.gucDen = 0; c.doi = null; c.muc = null; c.khienDen = bayGio() + CT.KHIEN_HOI_SINH_MS;
    hienBot(e);
    if (P.ChienTruongArt && P.ChienTruongArt.ct && P.ChienTruongArt.ct.hieuUng) { try { P.ChienTruongArt.ct.hieuUng("hoi", e.x, e.y); } catch (er) {} }
  }

  // não bot: chọn việc mỗi nhịp
  function naoBot(e, dt, bo) {
    var c = e.ct, p = pl(), now = bayGio(), def = e.def;
    var khoa = now < tran.khoaDen;
    def.speed = khoa ? 0 : c.tocGoc * (c.buff.toc ? 1 + c.buff.toc.pct / 100 : 1);
    if (khoa) { def.aggro = 0; return; }
    // vòng an toàn bot muốn đứng
    var vong = bo ? (bo.dich && bo.pha !== "xong" && bo.pha !== "cho" ? bo.dich : bo) : null;
    var ngoai = vong && !CT.trongVong(vong, e.x, e.y, -40);
    // kẻ địch gần nhất (người chơi nếu không ẩn, hoặc bot khác)
    var doi = null, gan = CAU_HINH.TAM_NHIN;
    var toiThay = p && tran.toi.song && !p.downed && !tran.an && now >= tran.khienDen;
    if (toiThay && dist(e, p) < gan) { doi = p; gan = dist(e, p); }
    var ds = tran.bots;
    for (var i = 0; i < ds.length; i++) {
      var o = ds[i];
      if (o === e || !o.ct.song || o.ct.gucDen || !trenDao(o) || now < o.ct.khienDen) continue;
      var d = dist(e, o); if (d < gan) { gan = d; doi = o; }
    }
    var yeu = e.hp < e.hpMax * 0.3;
    if (doi && (yeu && ngoai)) doi = null;              // máu yếu, đang ngoài bo: chạy vào bo trước
    c.doi = doi;
    if (doi === p) {
      def.aggro = 600; e.aggroUntil = tg() + 2;
      e.homeX = p.x; e.homeY = p.y;
      return;
    }
    def.aggro = 0; e.aggroUntil = 0;
    var dich = null;
    if (doi) dich = doi;
    else if (ngoai) {
      if (!c.muc || !CT.trongVong(vong, c.muc.x, c.muc.y, -60)) c.muc = diemTrong(vong.x, vong.y, Math.max(60, vong.r * 0.6), 20) || { x: vong.x, y: vong.y };
      dich = c.muc;
    } else {
      // tìm rương gần
      var r = null, gr = CAU_HINH.TAM_RUONG;
      for (var k = 0; k < tran.ruong.length; k++) {
        var rr = tran.ruong[k]; if (rr.mo && rr.mo !== e) continue;
        var dd = dist(e, rr); if (dd < gr) { gr = dd; r = rr; }
      }
      if (r) {
        dich = r;
        if (gr < CT.RUONG_TAM_PX * 0.8) {
          if (!c.moRuong) { c.moRuong = { r: r, den: now + CT.RUONG_MO_MS }; r.mo = e; }
          dich = { x: e.x, y: e.y };
          if (now >= c.moRuong.den) { botNhanRuong(e, r); c.moRuong = null; }
        }
      } else {
        if (!c.muc || dist(e, c.muc) < 30 || now > c.mucDen) {
          var v2 = vong || { x: CT.TAM.x, y: CT.TAM.y, r: CT.R_MAX * 0.8 };
          c.muc = diemTrong(v2.x, v2.y, Math.max(80, v2.r * 0.7), 20) || { x: v2.x, y: v2.y };
          c.mucDen = now + rnd(6000, 12000);
        }
        dich = c.muc;
      }
    }
    if (c.moRuong && (dich !== c.moRuong.r && dist(e, c.moRuong.r) > CT.RUONG_TAM_PX)) { c.moRuong.r.mo = null; c.moRuong = null; }
    e.homeX = dich.x; e.homeY = dich.y; e.wanderTx = dich.x; e.wanderTy = dich.y; e.wanderTimer = 0.2;
    // kẹt: đứng mãi một chỗ → đổi hướng; kẹt lâu và ở xa người chơi → nhảy tới chỗ trống gần đó
    var dc = Math.hypot(e.x - c.cuX, e.y - c.cuY);
    if (dc < 4 && dist(e, dich) > 40) c.ketT += dt; else c.ketT = Math.max(0, c.ketT - dt);
    c.cuX = e.x; c.cuY = e.y;
    if (c.ketT > 1.6) {
      c.muc = diemTrong(e.x, e.y, 220, 20); c.mucDen = now + 4000;
      if (c.muc && !doi) { e.homeX = c.muc.x; e.homeY = c.muc.y; e.wanderTx = c.muc.x; e.wanderTy = c.muc.y; }
      if (c.ketT > 6 && (!p || dist(e, p) > 700)) {
        var q = diemTrong(dich.x, dich.y, 160, 30);
        if (q) { e.x = q.x; e.y = q.y; }
        c.ketT = 0;
      }
    }
  }
  function botNhanRuong(e, r) {
    var b = taoBuff(r.vang);
    e.ct.buff[b.k] = { pct: b.pct, den: bayGio() + b.giay * 1000 };
    if (b.k === "hoi") e.hp = Math.min(e.hpMax, e.hp + e.hpMax * 0.25);
    if (b.k === "mau") { e.hpMax = Math.round(e.hpMax * (1 + b.pct / 100)); e.hp = Math.min(e.hpMax, e.hp + e.hpMax * b.pct / 100); }
    if (b.k === "giap") e.ct.giap = e.hpMax * b.pct / 100;
    xoaRuong(r);
  }
  function xoaRuong(r) {
    var i = tran.ruong.indexOf(r); if (i >= 0) tran.ruong.splice(i, 1);
    tran.bots.forEach(function (o) { if (o.ct.moRuong && o.ct.moRuong.r === r) o.ct.moRuong = null; });
    gui({ act: "vat", them: {}, bo: { r: [r.id] }, lay: [] });
  }
  // hai bot đứng sát nhau: đấu (mô phỏng), có hiệu ứng chém
  function botDanhNhau(e, dt) {
    var c = e.ct, o = c.doi;
    if (!o || o === pl() || !o.ct || !o.ct.song || o.ct.gucDen || !trenDao(o)) return;
    if (dist(e, o) > 64) return;
    var now = bayGio();
    if (now < o.ct.khienDen) return;
    var sat = o.hpMax * CAU_HINH.BOT_DANH_NHAU_DPS * dt * (c.f / (o.ct.f || 1)) * (c.buff.cong ? 1 + c.buff.cong.pct / 100 : 1);
    if (o.ct.giap > 0) { var g = Math.min(o.ct.giap, sat); o.ct.giap -= g; sat -= g; }
    o.hp -= sat; c.sat += sat;
    e.dir = o.x >= e.x ? 1 : -1;
    if (!c.chemDen || now >= c.chemDen) {
      c.chemDen = now + rnd(650, 950);
      var p = pl();
      if (!p || dist(e, p) > 120) { e.attackState = "telegraph"; e.telegraphT = 0; }
      if (p && dist(e, p) < 900 && P.VFX) {
        if (P.VFX.spawnHitSpark) P.VFX.spawnHitSpark(o.x, o.y - 22);
        if (P.VFX.spawnDamage) P.VFX.spawnDamage(o.x, o.y - 30, Math.max(1, Math.round(sat * 7)), "deal");
      }
    }
    if (o.hp <= 0) { o.hp = 0; botGuc(o, c); }
  }

  /* ---------- buff từ rương ---------- */
  var BUFF_MUC = { cong: [12, 30], giap: [15, 40], hoi: [1.5, 3], toc: [15, 30], mau: [12, 30] };
  function taoBuff(vang) {
    var k = pick(CT.THU_TU_BUFF), m = BUFF_MUC[k];
    var pct = Math.round(vang ? m[1] : m[0]);
    if (k === "hoi") pct = vang ? 3 : 1.5;
    return { k: k, ten: CT.BUFF[k].ten, pct: pct, giay: vang ? 45 : 30, vang: !!vang };
  }
  function buffToi() {
    var t = tran, now = bayGio(), ds = [];
    for (var k in t.buff) {
      t.buff[k] = t.buff[k].filter(function (b) { return b.den > now; });
      if (!t.buff[k].length) continue;
      var pct = 0; t.buff[k].forEach(function (b) { pct += b.pct; });
      var tran_ = { cong: 60, giap: 80, hoi: 6, toc: 45, mau: 60 }[k];
      pct = Math.min(tran_, pct);
      var con = Math.max.apply(null, t.buff[k].map(function (b) { return b.den; }));
      ds.push({ k: k, tang: t.buff[k].length, pct: Math.round(pct * 10) / 10, con: Math.ceil((con - now) / 1000) });
    }
    return ds;
  }
  function pctBuff(k) { var ds = buffToi(); for (var i = 0; i < ds.length; i++) if (ds[i].k === k) return ds[i].pct; return 0; }
  function apBuffToi() {
    var p = pl(); if (!p) return;
    var t = tran;
    if (!t.hpMaxGoc) t.hpMaxGoc = p.hpMax;
    var mau = pctBuff("mau"), hm = Math.round(t.hpMaxGoc * (1 + mau / 100));
    var toc = pctBuff("toc");
    if (toc > 0 && !p.flying) { p.hasteT = 0.5; p.hasteMult = 1 + toc / 100; }
    gui({ act: "buff", ds: buffToi(), hpMax: hm });
    if (hm !== p.hpMax) { var them = hm - p.hpMax; p.hpMax = hm; if (them > 0) p.hp = Math.min(p.hpMax, p.hp + them); }
  }
  function toiNhanRuong(r) {
    var b = taoBuff(r.vang), p = pl(), now = bayGio();
    tran.buff[b.k].push({ pct: b.pct, den: now + b.giay * 1000 });
    if (b.k === "giap" && p) {
      p.shieldHp = Math.max(p.shieldHp || 0, Math.round(p.hpMax * b.pct / 100));
      p.shieldCap = p.shieldHp; p.shieldT = Math.max(p.shieldT || 0, b.giay);
    }
    gui({ act: "moXong", buff: { ten: b.ten, k: b.k, pct: b.pct / 100, giay: b.giay, vang: b.vang } });
    xoaRuong(r);
    apBuffToi();
    if (P.Audio && P.Audio.play) P.Audio.play("coin");
  }

  /* ---------- người chơi: ẩn trong bụi, mở rương, gục ---------- */
  function lo(ly) {
    var t = tran; if (!t.an) return;
    t.an = false; t.anLoKhoa = bayGio() + CT.AN_LO_KHOA_MS;
    if (t.anBui) { t.anBui.nguoi = Math.max(0, t.anBui.nguoi - 1); t.anBui = null; }
    gui({ act: "an", on: false, ly: ly || "" });
  }
  function nhipAn(p, dt) {
    var t = tran, now = bayGio();
    var dc = Math.hypot(p.x - t.viTriCu.x, p.y - t.viTriCu.y);
    t.viTriCu = { x: p.x, y: p.y };
    var dangDanh = p.state === "attack" || p.state === "pose";
    if (t.an) {
      if (dangDanh) return lo("danh");
      if (dc > 3 || !t.anBui || dist(p, t.anBui) > CT.BUI_R) return lo("");
      if (now - t.anTu > CT.AN_TOI_DA_MS) { t.anNghi[t.anBui.id] = now + CT.AN_NGHI_MS; return lo("het"); }
      if (botSong().some(function (e) { return trenDao(e) && dist(e, p) < CT.AN_NGUOI_GAN_PX; })) return lo("gan");
      return;
    }
    if (dc > CT.AN_DUNG_YEN_PX * dt * 4 || dangDanh) { t.dungYenTu = now; return; }
    if (now < t.anLoKhoa || t.mo) return;
    var bui = null;
    for (var i = 0; i < t.bui.length; i++) { var b = t.bui[i]; if (dist(p, b) <= CT.BUI_R && (t.anNghi[b.id] || 0) < now && b.nguoi < CT.BUI_TOI_DA_NGUOI) { bui = b; break; } }
    if (!bui) { t.dungYenTu = now; return; }
    if (now - t.dungYenTu >= CT.AN_DUNG_YEN_MS) {
      t.an = true; t.anTu = now; t.anBui = bui; bui.nguoi++;
      gui({ act: "an", on: true });
    }
  }
  O.moRuong = function (id) {
    var t = tran, p = pl(); if (!t || !p || !t.toi.song || p.downed) return;
    if (t.an) return gui({ act: "moHuy", why: CT.viLoi("dang_an") });
    if (t.mo) return gui({ act: "moHuy", why: CT.viLoi("da_mo_ruong") });
    var r = null; for (var i = 0; i < t.ruong.length; i++) if (t.ruong[i].id === id) r = t.ruong[i];
    if (!r) return gui({ act: "moHuy", why: CT.viLoi("khong_ruong") });
    if (dist(p, r) > CT.RUONG_TAM_PX + 24) return gui({ act: "moHuy", why: CT.viLoi("ruong_xa") });
    if (r.mo && r.mo !== p) return gui({ act: "moHuy", why: CT.viLoi("ruong_co_nguoi") });
    r.mo = p;
    t.mo = { r: r, den: bayGio() + CT.RUONG_MO_MS, x: p.x, y: p.y, hp: p.hp };
    gui({ act: "mo", id: r.id, ms: CT.RUONG_MO_MS });
  };
  function nhipMo(p) {
    var t = tran, m = t.mo; if (!m) return;
    if (Math.hypot(p.x - m.x, p.y - m.y) > 6 || p.hp < m.hp || p.downed) {
      m.r.mo = null; t.mo = null;
      return gui({ act: "moHuy", why: "Bị gián đoạn — rương chưa mở." });
    }
    if (bayGio() >= m.den) { t.mo = null; toiNhanRuong(m.r); }
  }
  function toiGuc() {
    var t = tran, p = pl(); if (!t.toi.song || t.toiGucDen) return;
    t.toi.mang--;
    lo("");
    if (t.mo) { t.mo.r.mo = null; t.mo = null; }
    var bo = boHienTai(), gd = bo ? bo.k : 0;
    if (t.toi.mang <= 0 || gd >= CT.LOAI_TU_GD) return toiBiLoai();
    t.toiGucDen = bayGio() + CT.HOI_SINH_CHO_MS;
    gui({ act: "guc", cho: CT.HOI_SINH_CHO_MS, mang: t.toi.mang });
  }
  function toiHoiSinh() {
    var t = tran, p = pl(); t.toiGucDen = 0; if (!p) return;
    var bo = boHienTai(), vong = bo ? (bo.dich && bo.pha !== "xong" && bo.pha !== "cho" ? bo.dich : bo) : { x: CT.TAM.x, y: CT.TAM.y, r: CT.R_MAX };
    var d = null;
    for (var k = 0; k < 25; k++) {
      var q = diemTrong(vong.x, vong.y, Math.max(80, vong.r * 0.8), 30); if (!q) continue;
      d = q;
      if (botSong().every(function (e) { return !trenDao(e) || dist(e, q) > CT.HOI_SINH_CACH_DICH; })) break;
    }
    if (d) { p.x = d.x; p.y = d.y; }
    if (P.Player && P.Player.revive) P.Player.revive(p, CT.HOI_SINH_HP);
    p.downed = false;
    p.reviveShield = Math.min(3, CT.KHIEN_HOI_SINH_MS / 1000); p.hurtTimer = CT.KHIEN_HOI_SINH_MS / 1000;
    t.khienDen = bayGio() + CT.KHIEN_HOI_SINH_MS;
    if (P.Camera && P.Camera.snapTo && P.Renderer) P.Camera.snapTo(p.x, p.y, P.Renderer.w, P.Renderer.h, W().map.pxWidth, W().map.pxHeight);
    gui({ act: "hoiSinh", mang: t.toi.mang });
    apBuffToi();
  }
  function hangKhiLoai() {
    // hạng = số người còn sống (không tính mình) + 1
    return botSong().length + 1;
  }
  function toiBiLoai() {
    var t = tran; if (!t.toi.song) return;
    t.toi.song = false; t.toi.loaiLuc = bayGio() - t.t0; t.toi.mangCuoi = Math.max(0, t.toi.mang);
    var hang = hangKhiLoai();
    t.toi.hang = hang;
    gui({ act: "loai", hang: hang, soNguoi: t.n, haSat: t.toi.haSat });
    // không có người thật để xem trận: tính nhanh phần còn lại rồi báo kết quả
    setTimeout(function () { if (tran === t) ketThuc("loai"); }, 3500);
  }

  /* ---------- nhịp chính ---------- */
  function nhip() {
    var t = tran; if (!t || t.ketThuc) return;
    if (mapId() !== CT.MAP) {          // rời đảo (đổi bản đồ, về làng): huỷ trận
      if (!t.roiLuc) t.roiLuc = bayGio();
      if (bayGio() - t.roiLuc > 1500) huyTran();
      return;
    }
    var now = bayGio(), dt = Math.min(0.5, (now - t.lastTick) / 1000); t.lastTick = now;
    var p = pl(); if (!p) return;
    var bo = boHienTai();
    // khiên: giữ vòng khiên hiện tới lúc hết (vòng gốc chỉ vẽ được tới 3 giây)
    if (now < t.khienDen && t.toi.song && !p.downed) p.reviveShield = Math.max(p.reviveShield || 0, Math.min(2.8, (t.khienDen - now) / 1000));
    // khoá chân mở màn
    if (now < t.khoaDen && t.toi.song) { p.x = t.khoaO.x; p.y = t.khoaO.y; if (p.stop) p.stop(); }
    // báo bo
    if (bo) {
      var gd = CT.BO_GD;
      for (var i = 0; i < gd.length; i++) {
        var batCo = t.t0 + gd[i].batDau + gd[i].dung;
        if (!t.daBao["c" + i] && now >= batCo - CT.BO_BAO_TRUOC_MS && now < batCo) {
          t.daBao["c" + i] = 1;
          gui({ act: "banner", text: "Vòng bo " + (i + 1) + " sắp thu hẹp", phu: "Còn 20 giây · ra ngoài mất " + Math.round(gd[i].sat * 100) + "% Khí Huyết mỗi giây" });
        }
        if (!t.daBao["g" + i] && now >= t.t0 + gd[i].batDau) {
          t.daBao["g" + i] = 1;
          if (i === 0) gui({ act: "banner", text: "Vòng bo đã hiện", phu: "Đi vào vòng xanh trước khi bo thu hẹp" });
          if (i + 1 === CT.LOAI_TU_GD) gui({ act: "banner", text: "Từ giờ gục là bị loại", phu: "Mạng còn lại vẫn được tính xếp hạng" });
          if (i === 1) {   // giữa vòng 2 và 4: rương vàng trong vùng bo
            var v = bo.dich || bo, so = Math.round(rnd(CT.RUONG_VANG[0], CT.RUONG_VANG[1]));
            var them = themRuong(so, v.x, v.y, v.r * 0.85, true);
            if (them.length) { gui({ act: "vat", them: { r: them.map(function (o) { return [o.id, o.x, o.y, 1]; }) }, bo: {}, lay: [] }); bao("Có " + them.length + " rương vàng xuất hiện trong vùng bo", "tot"); }
          }
        }
      }
      // rương ngoài bo biến mất khi bo co xong
      if (bo.pha === "xong" && t.gdCuoi !== bo.k) {
        t.gdCuoi = bo.k;
        var mat = t.ruong.filter(function (r) { return !CT.trongVong(bo, r.x, r.y); });
        mat.forEach(function (r) { if (t.mo && t.mo.r === r) { t.mo = null; gui({ act: "moHuy", why: "Rương đã tan vào bo." }); } xoaRuong(r); });
      }
    }
    // người chơi
    if (t.toi.song) {
      if (t.toiGucDen) { if (now >= t.toiGucDen) toiHoiSinh(); }
      else if (p.downed) toiGuc();
      else {
        nhipAn(p, dt);
        nhipMo(p);
        // bo trừ máu
        var ngoai = bo && bo.k > 0 && !CT.trongVong(bo, p.x, p.y);
        if (ngoai) {
          t.boTich = (t.boTich || 0) + dt;
          if (t.boTich >= 1) {
            t.boTich -= 1;
            var sat = Math.max(1, Math.round(p.hpMax * bo.sat));
            P.Player.takeDamage(p, sat, { boCt: true, overTime: true });
          }
        } else t.boTich = 0;
        t.ngoai = !!ngoai;
        var hoi = pctBuff("hoi");
        if (hoi > 0) p.hp = Math.min(p.hpMax, p.hp + p.hpMax * hoi / 100 * dt);
        if (pctBuff("toc") > 0) { p.hasteT = 0.5; p.hasteMult = 1 + pctBuff("toc") / 100; }
      }
    }
    if (t.buffKy === undefined || now - t.buffKy > 1000) { t.buffKy = now; apBuffToi(); }
    // bot
    for (var j = 0; j < t.bots.length; j++) {
      var e = t.bots[j], c = e.ct;
      if (!c.song) continue;
      if (c.gucDen) { if (now >= c.gucDen) botHoiSinh(e); continue; }
      if (!trenDao(e)) continue;
      for (var k in c.buff) if (c.buff[k].den < now) delete c.buff[k];
      naoBot(e, dt, bo);
      botDanhNhau(e, dt);
      if (c.buff.hoi) e.hp = Math.min(e.hpMax, e.hp + e.hpMax * c.buff.hoi.pct / 100 * dt);
      if (bo && bo.k > 0 && !CT.trongVong(bo, e.x, e.y)) {
        e.hp -= e.hpMax * bo.sat * dt;
        if (e.hp <= 0) { e.hp = 0; botGuc(e, null); }
      }
    }
    gui({ act: "nhip", con: soConSong(), mang: Math.max(0, t.toi.mang), haSat: t.toi.haSat, ngoai: !!t.ngoai, hpMax: p.hpMax, trangThai: t.toi.song ? "DANG_DAU" : "LOAI" });
    // hết giờ
    if (now - t.t0 >= CT.TRAN_KEO_DAI - CT.KHOA_CHAN_MO_MAN_MS) ketThuc("het_gio");
  }
  function kiemTraKetThuc() {
    var t = tran; if (!t || t.ketThuc) return;
    var con = soConSong();
    if (t.toi.song && con <= 1) setTimeout(function () { if (tran === t) ketThuc("thang"); }, 800);
  }

  /* ---------- kết thúc, xếp hạng, thưởng ---------- */
  function ketThuc(ly) {
    var t = tran; if (!t || t.ketThuc) return;
    t.ketThuc = true;
    clearInterval(t.tick);
    lo("");
    var now = bayGio();
    // người còn sống lúc hết trận: xếp theo luật soHang (song trước, rồi mạng, hạ gục, sát thương)
    var ds = t.bots.map(function (e) {
      var c = e.ct;
      return { ten: c.ten, song: c.song, mang: c.song ? Math.max(0, c.mang) : (c.mangCuoi || 0), haSat: c.haSat, sat: Math.round(c.sat), loaiLuc: c.loaiLuc, la: "bot" };
    });
    var toi = t.toi;
    ds.push({ ten: toi.ten, song: toi.song, mang: toi.song ? Math.max(0, toi.mang) : (toi.mangCuoi || 0), haSat: toi.haSat, sat: Math.round(toi.sat), loaiLuc: toi.loaiLuc, la: "toi" });
    ds.sort(CT.soHang);
    // người chơi bị loại sớm: giữ đúng hạng lúc bị loại
    var hang = 0;
    for (var i = 0; i < ds.length; i++) if (ds[i].la === "toi") hang = i + 1;
    if (!toi.song && toi.hang) {
      var ban = ds.splice(hang - 1, 1)[0];
      ds.splice(toi.hang - 1, 0, ban);
      hang = toi.hang;
    }
    var top = ds.slice(0, CT.HANG_CO_QUA).map(function (x, i) { return { hang: i + 1, ten: x.la === "toi" ? x.ten + " (đạo hữu)" : x.ten, haSat: x.haSat }; });
    gui({ act: "ketqua", hang: hang, soNguoi: t.n, tenBang: tenBang(t.bang), haSat: toi.haSat, top: top });
    // thưởng
    var thuong = [], ghi = "";
    if (hang <= CT.HANG_CO_QUA) {
      var f = flags(), n = ngay();
      if (CT.daNhanQuaHomNay(P, n)) ghi = "Hôm nay đạo hữu đã nhận thưởng Chiến Trường rồi — mai quay lại nhé.";
      else {
        thuong = CT.phanThuong(t.bang, hang, false) || [];
        thuong.forEach(function (x) {
          if (x.id === "linh_thach") { if (P.Progress && P.Progress.addStones) P.Progress.addStones(x.n); }
          else if (P.ITEMS && P.ITEMS[x.id]) P.Inventory.add(x.id, x.n);
        });
        f[CT.QUA_NGAY_FLAG] = { ngay: n, hang: hang };
        luu();
        if (P.HUD && P.HUD.refreshBag) P.HUD.refreshBag();
      }
    }
    if (P.HUD && P.HUD.announce) P.HUD.announce(hang === 1 ? "VÔ ĐỊCH" : "HẠNG " + hang);
    if (P.Audio && P.Audio.play) P.Audio.play(hang === 1 ? "victory" : hang <= 4 ? "pvp_win" : "defeat");
    var p = pl();
    if (p && p.downed && P.Player && P.Player.revive) P.Player.revive(p, 1);
    // dọn bot
    t.bots.forEach(function (e) { anBot(e); e.dead = true; });
    var loi = "Hạng " + hang + "/" + t.n + " · hạ " + toi.haSat + " người." + (thuong.length ? "\nThưởng: " + thuong.map(function (x) { return x.n + " " + tenVat(x.id); }).join(", ") : "") + (ghi ? "\n" + ghi : "");
    t.loiKetQua = loi;
    setTimeout(function () {
      hop(CT.TEN, (hang === 1 ? "Đạo hữu là người cuối cùng đứng trên đảo!\n\n" : "") + loi, { choices: [{ label: "Về Làng", onChoose: function () { veLang(); } }] });
    }, 1800);
    setTimeout(function () { if (tran === t) veLang(); }, CT.VE_LANG_SAU + 10000);
  }
  function huyTran() {
    var t = tran; if (!t) return;
    clearInterval(t.tick);
    t.bots.forEach(function (e) { anBot(e); e.dead = true; });
    tran = null;
  }
  function veLang() {
    var t = tran;
    if (t) { clearInterval(t.tick); t.bots.forEach(function (e) { anBot(e); e.dead = true; }); }
    tran = null;
    var p = pl();
    if (p) { if (p.downed && P.Player && P.Player.revive) P.Player.revive(p, 1); p.hp = p.hpMax; p.mp = p.mpMax; }
    if (P.HUD && P.HUD.closeDialog) P.HUD.closeDialog();
    if (P.NTBot && P.NTBot.veLang) P.NTBot.veLang();
  }
  O.veLang = veLang;

  /* ---------- chặn & nối vào game ---------- */
  function boc() {
    var ok = true;
    // giao diện gốc gửi lệnh qua Gateway.chienTruong (máy chủ) — ở đây xử lý tại máy
    var G = P.Gateway;
    if (G && !G.__ctOffline) {
      var goc = G.chienTruong;
      G.chienTruong = function (lenh, data, cb) {
        if (tran || mapId() === CT.MAP) {
          if (lenh === "moRuong") O.moRuong(data && data.id);
          else if (lenh === "roi") veLang();
          if (cb) cb({ ok: true });
          return;
        }
        if (lenh === "ghiDanh") { O.batDau(); if (cb) cb({ ok: true }); return; }
        if (goc) return goc.apply(this, arguments);
      };
      G.__ctOffline = true;
    } else if (!G) ok = false;
    // đòn của người chơi lên bot: buff Công + khắc chế hệ; bot hết máu thì "gục" theo luật Chiến Trường
    if (P.Enemy && P.Enemy.hit && !P.Enemy.hit.__ct) {
      var hitGoc = P.Enemy.hit;
      P.Enemy.hit = function (e, n, t2) {
        if (e && e.ct && tran && !e.dead) {
          if (bayGio() < e.ct.khienDen) return false;
          if (tran.an) lo("danh");
          n = n * (1 + pctBuff("cong") / 100) * (e.ct.khac || 1);
          if (e.ct.giap > 0) { var g = Math.min(e.ct.giap, n); e.ct.giap -= g; n -= g; }
          tran.toi.sat += Math.max(0, Math.min(n, e.hp));
          if (e.hp - n <= 0) {
            e.hp = 0;
            if (P.VFX && P.VFX.spawnDamage) P.VFX.spawnDamage(e.x, e.y - 20, Math.round(n), "deal");
            botGuc(e, tran.toi);
            return false;
          }
          arguments[1] = n;
        }
        return hitGoc.apply(this, arguments);
      };
      P.Enemy.hit.__ct = true;
    } else if (!P.Enemy) ok = false;
    // bị đánh thì lộ thân, đòn đang mở rương bị huỷ (nhipMo tự kiểm máu)
    if (P.Player && P.Player.takeDamage && !P.Player.takeDamage.__ct) {
      var td = P.Player.takeDamage;
      P.Player.takeDamage = function (pp, n, o) {
        if (tran && pp === pl() && !(o && o.boCt)) {
          if (bayGio() < tran.khienDen) return false;
          if (tran.an && n > 0) lo("danh");
        }
        return td.apply(this, arguments);
      };
      P.Player.takeDamage.__ct = true;
    }
    // cấm dùng đồ trong túi (đan dược…) giữa trận
    var INV = P.Inventory;
    if (INV && INV.useBagItem && !INV.useBagItem.__ct) {
      var ub = INV.useBagItem;
      INV.useBagItem = function () {
        if (trongTran()) { chu(CT.viLoi("cam_dung")); return { ok: false, reason: "chien_truong" }; }
        return ub.apply(this, arguments);
      };
      INV.useBagItem.__ct = true;
    }
    // Chấp Sự Đại Hội: thêm lựa chọn Vạn Hoang Chiến Trường
    var B = P.NTBot;
    if (B && B.chapSu && !B.chapSu.__ct) {
      var cs = B.chapSu;
      B.chapSu = function (npc) {
        var r = cs.apply(this, arguments);
        themLuaChon(npc);
        return r;
      };
      B.chapSu.__ct = true;
    } else if (!B) ok = false;
    // bảng Chiến Trường gốc (lịch 21:00 Thứ Hai · Thứ Sáu, cần máy chủ) → khi không có máy chủ mở bảng chơi với bot
    var U = UI();
    if (U && U.show && !U.show.__ct) {
      var sh = U.show;
      U.show = function () {
        var g = P.Gateway;
        if (!(g && g.connected && g.ready)) return O.hoi();
        return sh.apply(this, arguments);
      };
      U.show.__ct = true;
    }
    // nút Kết quả "Đóng" → hỏi về làng
    var dong = document.getElementById("ct-kq-dong");
    if (dong && !dong.__ct) {
      dong.__ct = true;
      dong.addEventListener("click", function () {
        if (tran && tran.ketThuc) setTimeout(function () { hop(CT.TEN, tran && tran.loiKetQua || "", { choices: [{ label: "Về Làng", onChoose: veLang }] }); }, 50);
      });
    }
    return ok && !!dong;
  }
  function themLuaChon(npc) {
    // HUD.openDialog vừa mở hộp thoại Chấp Sự — mở lại với thêm một lựa chọn
    var tc = O.tuCach(), f = flags(), daNhan = CT.daNhanQuaHomNay(P, ngay());
    var note = !tc.bang ? (tc.why || "Chưa đủ tư cách") : "Bảng " + tenBang(tc.bang) + " · " + (CAU_HINH.SO_BOT + 1) + " người · 3 mạng · chỉ đánh thường" + (daNhan ? " · hôm nay đã nhận thưởng" : " · top 4 có thưởng");
    var H = P.HUD; if (!H || !H.openDialog || !H.__ctLast) return;
    var last = H.__ctLast;
    var ch = (last.o && last.o.choices ? last.o.choices.slice() : []);
    ch.push({ label: "Vạn Hoang Chiến Trường · sinh tồn", icon: "sword", note: note, disabled: !tc.bang, onChoose: function () { O.hoi(); } });
    H.openDialog(last.ten, last.noiDung, Object.assign({}, last.o, { choices: ch }));
  }
  // nhớ hộp thoại vừa mở để chèn thêm lựa chọn
  function bocHop() {
    var H = P.HUD; if (!H || !H.openDialog) return false;
    if (H.openDialog.__ct) return true;
    var g = H.openDialog;
    H.openDialog = function (ten, noiDung, o) { H.__ctLast = { ten: ten, noiDung: noiDung, o: o }; return g.apply(this, arguments); };
    H.openDialog.__ct = true;
    return true;
  }
  O.hoi = function () {
    var tc = O.tuCach();
    if (!tc.bang) return hop(CT.TEN, tc.why || "Chưa đủ tư cách.");
    var daNhan = CT.daNhanQuaHomNay(P, ngay());
    var q1 = CT.phanThuong(tc.bang, 1, false) || [];
    hop(CT.TEN, "Cả đảo thả xuống cùng lúc, vòng bo thu dần, người cuối cùng đứng vững thì thắng.\n\n" +
      "· " + (CAU_HINH.SO_BOT + 1) + " người (đạo hữu và " + CAU_HINH.SO_BOT + " tán tu), bảng " + tenBang(tc.bang) + "\n" +
      "· 3 mạng — từ vòng bo 4 gục là bị loại\n" +
      "· Chỉ đánh thường: cấm kỹ năng, phù chú, đan dược, bay\n" +
      "· Rương cho buff · đứng yên trong bụi để ẩn (tối đa 25 giây)\n" +
      "· Top 4 có thưởng như Đại Hội" + (daNhan ? " — hôm nay đã nhận, trận này chỉ để luyện tay" : " (vô địch: " + q1.map(function (x) { return x.n + " " + tenVat(x.id); }).join(", ") + ")") + "\n\n" +
      "Trận kéo dài tối đa khoảng 13 phút.", { choices: [
        { label: "Xuống Vạn Hoang", icon: "sword", onChoose: function () { O.batDau(); } },
        { label: "Để sau", onChoose: function () { if (P.HUD && P.HUD.closeDialog) P.HUD.closeDialog(); } }
      ] });
  };

  var lan = 0, hen = setInterval(function () { var a = bocHop(), b = boc(); if ((a && b) || ++lan > 200) clearInterval(hen); }, 150);
})(window.PNTT);
