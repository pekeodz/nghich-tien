/* Nghịch Tiên — Kiếm Linh (Chính Đạo), Âm Hồn (Ma Đạo), Khôi Lỗi / Thi Khôi chạy trên máy người chơi.
 *
 * Bản gốc: máy chủ sinh và điều khiển đồng minh rồi gửi danh sách về (Gateway.honBay, Gateway.khoiLoiBay);
 * game chỉ vẽ (AmHon, KhoiLoiFX) và trừ Linh Lực nuôi hồn. Khi không có máy chủ, file này tự làm phần máy chủ:
 *   - gọi / thu theo đúng điều kiện của tác giả (ChinhDao.xetGoi, LuyenQuy.xetGoi, KhoiLoi.xetGoi);
 *   - Kiếm Linh / Âm Hồn: tốn 30 Linh Lực mỗi lần gọi, hao 0,2 Linh Lực/giây mỗi con (game tự trừ),
 *     cạn Linh Lực thì cả bầy tự về; khôi lỗi tốn Thần Thức, tồn tại 120 giây;
 *   - bay theo chủ, tự lao vào yêu thú gần nhất và đánh; quái chết vẫn rơi đồ, cộng Đạo Hạnh cho chủ
 *     (qua SceneWorld.ntDanhQuai).
 * Sát thương mỗi đòn tính theo đòn thường của chủ — chỉnh ở CAU_HINH. */
(function (P) {
  "use strict";
  var T = P.TrieuHoi = {};
  var CH = T.CAU_HINH = {
    HON_HE_SO: 0.6,       // Kiếm Linh / Âm Hồn: mỗi đòn = 60% đòn thường của chủ
    KL_HE_SO: 0.5,        // Khôi lỗi: mỗi đòn = công của khôi lỗi + 50% đòn thường của chủ
    HON_TOC: 210,         // tốc độ bay của hồn (px/giây)
    HON_DUOI: 600         // xa chủ quá thì hồn dịch chuyển về
  };

  function online() { var g = P.Gateway; return !!(g && g.connected && g.ready); }
  function W() { return P.SceneWorld; }
  function pl() { return W() && W().player; }
  function tg() { return P.Game ? P.Game.time : Date.now() / 1000; }
  function mapData() { var m = W() && W().map; return m && m.data; }
  function mapId() { var d = mapData(); return (d && d.id) || ""; }
  function G() { return P.Gateway; }
  function selfId() { var g = G(); if (g && !online() && !g.selfId) g.selfId = "nt-self"; return g ? g.selfId : null; }
  function LQ() { return P.LuyenQuy; }
  function CD() { return P.ChinhDao; }
  function KL() { return P.KhoiLoi; }
  function laChinh() { var c = CD(); return !!(c && c.dao && c.dao(P) === "chinh"); }
  function camMap() { var k = KL(); return k && k.mapCam ? k.mapCam(mapData()) : null; }
  function don(p) { return P.Player && P.Player.meleeDamage && p ? P.Player.meleeDamage(p) : 5; }
  function dist(a, b) { return Math.hypot(a.x - b.x, a.y - b.y); }
  function huong(dx, dy) { return Math.abs(dx) > Math.abs(dy) ? (dx < 0 ? 1 : 2) : (dy < 0 ? 3 : 0); }

  var hon = [];   // Kiếm Linh / Âm Hồn (mỗi con gọi ra rời khỏi hạp/phiên, thu về thì trả lại)
  var kloi = [];  // khôi lỗi
  var dem = 0, mapTruoc = "";

  /* ---------- mục tiêu ---------- */
  function danhDuoc(e) {
    if (!e || e.dead) return false;
    if (e.ntBot && e.ntBot.kieu !== "tatu") return false;          // không xen vào tỉ thí / võ đài
    var d = e.def || {};
    if (KL() && KL().danhDuoc) return KL().danhDuoc(d);
    return !d.human && d.contactDmg > 0 && d.speed > 0;
  }
  function timMuc(goc, tam) {
    var w = W(), best = null, bd = tam;
    (w && w.enemies || []).forEach(function (e) { if (!danhDuoc(e)) return; var d = dist(goc, e); if (d < bd) { bd = d; best = e; } });
    return best;
  }
  function danh(e, dmg) {
    var w = W();
    if (w && w.ntDanhQuai) return w.ntDanhQuai(e, dmg);
    return P.Enemy && P.Enemy.hit ? P.Enemy.hit(e, dmg, tg()) : false;
  }

  /* ---------- Kiếm Linh / Âm Hồn ---------- */
  function soTran() { var c = laChinh(); return c ? (CD().tran ? CD().tran(P) : 5) : (LQ() && LQ().tranAmHon ? LQ().tranAmHon(P) : 5); }
  function xetGoiHon() {
    var p = pl(); if (!p) return "Chưa vào thế giới";
    var cam = camMap(); if (cam) return cam.replace("khôi lỗi", laChinh() ? "Kiếm Linh" : "Âm Hồn");
    return laChinh() ? (CD() && CD().xetGoi ? CD().xetGoi(P, hon.length, p.mp) : "Chưa có Kiếm Hạp")
                     : (LQ() && LQ().xetGoi ? LQ().xetGoi(P, hon.length, p.mp) : "Chưa có Hồn Phiên");
  }
  function goiMotHon() {
    var why = xetGoiHon(); if (why) return why;
    var p = pl(), lq = LQ();
    var item = laChinh() ? CD().KIEM_LINH : lq.AM_HON;
    if (!P.Inventory.remove(item, 1)) return laChinh() ? "Trong hạp chưa có Kiếm Linh" : "Trong phiên chưa có Âm Hồn";
    p.mp = Math.max(0, p.mp - ((lq && lq.MP_GOI) || 30));
    var chinh = laChinh();
    var h = { i: "nt-hon-" + (++dem), item: item, k: chinh ? 1 : 0, x: p.x + (Math.random() - 0.5) * 30, y: p.y - 10, hpMax: lq && lq.mauAmHon ? lq.mauAmHon(p.hpMax) : 40, a: 0, at: 0, cd: 0, muc: null, nhin: 0 };
    h.hp = h.hpMax;
    hon.push(h);
    ghiNho();
    if (P.VFX && P.VFX.spawnRing) P.VFX.spawnRing(h.x, h.y, chinh ? "#7fd8ff" : "#d0406a", 22, 0.5);
    return null;
  }
  T.soHon = function () { return hon.length; };
  /* lenh: "goi" | "goiHet" | "thu" → trả về câu báo */
  T.hon = function (lenh) {
    var ten = laChinh() ? "Kiếm Linh" : "Âm Hồn", dv = laChinh() ? "thanh" : "con";
    if (lenh === "thu") {
      var n = hon.length; thuHon();
      return n ? "Thu " + n + " " + dv + " " + ten + " về " + (laChinh() ? "hạp" : "phiên") + "." : "Chưa gọi " + ten + " nào.";
    }
    var goi = 0, why = null;
    do { why = goiMotHon(); if (!why) goi++; } while (!why && lenh === "goiHet");
    capNhat();
    if (P.Audio && P.Audio.play && goi) P.Audio.play("cast");
    return goi ? "Gọi " + goi + " " + dv + " " + ten + " · đang bay " + hon.length + "/" + soTran() : ten + ": " + why;
  };
  function thuHon(lyDo) {
    hon.forEach(function (h) { if (h.item) P.Inventory.add(h.item, 1); });
    hon.forEach(function (h) { if (P.VFX && P.VFX.spawnRing) P.VFX.spawnRing(h.x, h.y, h.k ? "#7fd8ff" : "#d0406a", 16, 0.35); });
    hon = [];
    ghiNho();
    capNhat();
    if (lyDo && P.HUD && P.HUD.setCaption) P.HUD.setCaption(lyDo);
  }

  // ghi lại số hồn đang ở ngoài để tải lại trang thì trả về túi, không mất
  function ghiNho() {
    var q = P.Quest; if (!q) return;
    if (!q.flags) q.flags = {};
    var m = {};
    hon.forEach(function (h) { if (h.item) m[h.item] = (m[h.item] || 0) + 1; });
    q.flags.ntHonRa = Object.keys(m).length ? m : null;
    try { q.save && q.save(); } catch (e) {}
  }
  function traVeSauKhiTai() {
    var q = P.Quest, m = q && q.flags && q.flags.ntHonRa;
    if (!m || hon.length) return;
    Object.keys(m).forEach(function (id) { if (m[id] > 0) P.Inventory.add(id, m[id]); });
    q.flags.ntHonRa = null;
    try { q.save && q.save(); } catch (e) {}
  }
  var daTra = false;

  /* ---------- Khôi lỗi ---------- */
  function dsKhoiLoi() { var k = KL(); return kloi.map(function (x) { return k.DEFS[x.k].id; }); }
  T.khoiLoi = function (id) {
    var k = KL(), p = pl();
    if (!k || !p) return { ok: false, why: "Chưa vào thế giới" };
    var def = k.byId(id); if (!def) return { ok: false, why: "Không có khôi lỗi ấy" };
    var idx = k.DEFS.indexOf(def);
    for (var j = 0; j < kloi.length; j++) if (kloi[j].k === idx) { voKhoiLoi(kloi[j]); kloi.splice(j, 1); capNhat(); return { ok: true, toast: "Thu hồi " + def.ten + "." }; }
    var cam = camMap(); if (cam) return { ok: false, why: cam };
    var why = k.xetGoi ? k.xetGoi(P, id, dsKhoiLoi(), p.sp) : null;
    if (why) return { ok: false, why: why };
    p.sp = Math.max(0, (p.sp || 0) - (def.sp || 0));
    var cd = k.choDung ? k.choDung(kloi.length) : { dx: 26, dy: 5 };
    kloi.push({ i: "nt-kl-" + (++dem), k: idx, x: p.x + cd.dx, y: p.y + cd.dy, hp: def.hp, hpMax: def.hp, a: 0, at: 0, d: 0, s: 0, cd: 0, muc: null, het: tg() + (k.TON_TAI || 120), dmg: def.dmg });
    capNhat();
    return { ok: true, toast: "Triệu hồi " + def.ten + " · tồn tại " + (k.TON_TAI || 120) + " giây." };
  };
  function voKhoiLoi(x) { if (P.KhoiLoiFX && P.KhoiLoiFX.vo) P.KhoiLoiFX.vo({ i: x.i, k: x.k, x: x.x, y: x.y }); }

  /* ---------- đẩy danh sách cho phần vẽ của game ---------- */
  function capNhat() {
    if (online()) return;
    var g = G(); if (!g) return;
    var me = selfId();
    g.honBay = hon.map(function (h) { return { i: h.i, o: me, x: h.x, y: h.y, k: h.k, h: Math.round(100 * h.hp / h.hpMax), a: h.a, at: h.at, ag: h.ag || 0, ax: h.ax, ay: h.ay }; });
    g.khoiLoiBay = kloi.map(function (x) { return { i: x.i, o: me, x: x.x, y: x.y, k: x.k, h: Math.round(100 * x.hp / x.hpMax), a: x.a, at: x.at, d: x.d, s: x.s }; });
    if (P.KhoiLoiUI && P.KhoiLoiUI.veLai) P.KhoiLoiUI.veLai();
    if (P.HonPhienUI && P.HonPhienUI.veLai) P.HonPhienUI.veLai();
  }

  /* ---------- AI ---------- */
  function diChuyen(o, tx, ty, tocDo, dt) {
    var dx = tx - o.x, dy = ty - o.y, d = Math.hypot(dx, dy);
    if (d < 1) return false;
    var b = Math.min(d, tocDo * dt);
    o.x += dx / d * b; o.y += dy / d * b;
    return b > 0.5;
  }
  var truoc = 0;
  function nhip() {
    try {
      if (online()) { if (hon.length) { hon.forEach(function (h) { if (h.item) P.Inventory.add(h.item, 1); }); hon = []; ghiNho(); } kloi = []; return; }
      var w = W(), p = pl(); if (!w || !p || w.transitioning) return;
      var t = tg(), dt = truoc ? Math.min(0.25, Math.max(0, t - truoc)) : 0.1; truoc = t;
      selfId();
      if (!daTra && P.Inventory && P.Quest && P.Quest.flags) { daTra = true; traVeSauKhiTai(); }
      if (mapId() !== mapTruoc) {
        var doiMap = !!mapTruoc; mapTruoc = mapId();
        if (doiMap && (hon.length || kloi.length)) {
          var cam = camMap();
          if (cam) { thuHon(); kloi = []; capNhat(); }
          else { hon.forEach(function (h) { h.x = p.x; h.y = p.y - 10; h.muc = null; }); kloi.forEach(function (x) { x.x = p.x; x.y = p.y; x.muc = null; }); }
        }
      }
      if (!hon.length && !kloi.length) return;
      if (p.downed) { thuHon("Chủ nhân ngã xuống — đồng minh tan biến."); kloi.forEach(voKhoiLoi); kloi = []; capNhat(); return; }

      // ---- hồn ----
      if (hon.length) {
        if (p.mp <= 0) thuHon("Cạn Linh Lực — cả bầy tự về.");
        else if (laChinh() && LQ() && LQ().satNghiep && LQ().satNghiep(P) > 0) thuHon("Sát Nghiệp — Kiếm Linh không nghe gọi.");
      }
      var lq = LQ() || {}, nhipHon = lq.NHIP_DANH || 1.2, tamHon = lq.TAM_DANH || 26, bamHon = lq.TAM_BAM || 460;
      var dmgHon = Math.max(2, Math.round(don(p) * CH.HON_HE_SO));
      hon.forEach(function (h, idx) {
        if (dist(h, p) > CH.HON_DUOI) { h.x = p.x; h.y = p.y - 10; h.muc = null; }
        if (h.muc && (!danhDuoc(h.muc) || dist(h.muc, p) > bamHon)) h.muc = null;
        if (!h.muc && t >= h.nhin) { h.nhin = t + 0.4; h.muc = timMuc(p, bamHon); }
        if (h.muc) {
          var e = h.muc, goc = idx / Math.max(1, hon.length) * Math.PI * 2;
          var mx = e.x + Math.cos(goc) * 14, my = e.y - 10 + Math.sin(goc) * 8;
          diChuyen(h, mx, my, CH.HON_TOC, dt);
          if (dist(h, { x: e.x, y: e.y - 10 }) <= tamHon + ((e.def && e.def.bodyRadius) || 0) && t >= h.cd) {
            h.cd = t + nhipHon;
            h.a++; h.at = 0; h.ag = Math.atan2(e.y - h.y, e.x - h.x); h.ax = e.x; h.ay = e.y - 12;
            if (danh(e, dmgHon)) h.muc = null;
          }
        } else {
          var cd = lq.choDung ? lq.choDung(idx, hon.length, t * 0.6) : { dx: 0, dy: -14 };
          diChuyen(h, p.x + cd.dx, p.y + cd.dy, CH.HON_TOC, dt);
        }
        h.at += dt;
      });

      // ---- khôi lỗi ----
      var k = KL() || {};
      for (var j = kloi.length - 1; j >= 0; j--) {
        var x = kloi[j];
        if (t >= x.het) {
          voKhoiLoi(x); kloi.splice(j, 1);
          if (P.HUD && P.HUD.setCaption) P.HUD.setCaption("Khôi lỗi đã hết thời gian, tan thành vụn.");
          continue;
        }
        var xa = dist(x, p);
        if (xa > (k.TAM_BAM || 720)) { x.x = p.x; x.y = p.y; x.muc = null; }
        if (x.muc && (!danhDuoc(x.muc) || dist(x.muc, p) > (k.TAM_BAM || 720))) x.muc = null;
        if (!x.muc && t >= (x.nhin || 0)) { x.nhin = t + 0.4; x.muc = timMuc(p, k.TAM_HO_CHU ? k.TAM_HO_CHU * 2 : 300); }
        var toc = xa > (k.TAM_THEO_CHU || 280) ? (k.TOC_DUOI || 210) : (k.TOC_DO || 120);
        var dang = false;
        if (x.muc) {
          var e2 = x.muc;
          var tx2 = e2.x + (x.x < e2.x ? -18 : 18), ty2 = e2.y;
          if (dist(x, e2) > (k.TAM_DANH || 30) + ((e2.def && e2.def.bodyRadius) || 0)) dang = diChuyen(x, tx2, ty2, toc, dt);
          x.d = huong(e2.x - x.x, e2.y - x.y);
          if (!dang && t >= x.cd) {
            x.cd = t + (k.NHIP_DANH || 1);
            x.a++; x.at = 0;
            var dmg = Math.max(1, Math.round(x.dmg + don(p) * CH.KL_HE_SO));
            if (danh(e2, dmg)) x.muc = null;
          }
        } else {
          var c2 = k.choDung ? k.choDung(j) : { dx: 26, dy: 5 };
          var ox = x.x;
          var oy = x.y;
          dang = diChuyen(x, p.x + c2.dx, p.y + c2.dy, toc, dt);
          if (dang) x.d = huong(x.x - ox, x.y - oy);
        }
        x.s = dang ? 1 : 0;
        x.at += dt;
      }
      capNhat();
    } catch (err) { if (window.console) console.warn("[TrieuHoi]", err); }
  }
  setInterval(nhip, 100);
})(window.PNTT);
