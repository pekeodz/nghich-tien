/* ============================================================================
 *  nhan_kiem_hop_nhat.js — CHIÊU NHÂN KIẾM HỢP NHẤT (Võ Đang · Nghịch Tiên)
 * ----------------------------------------------------------------------------
 *  Bấm chiêu: thân hoá kiếm quang lao thẳng tới mục tiêu, để lại chuỗi ảnh ảo xanh dọc
 *  đường lao; rồi 3 phân ảnh lần lượt từ hai bên sườn và sau lưng đối thủ lao vào chém,
 *  mỗi nhát bung một vòng kiếm khí xanh.
 *    - Nhát 1, 2: sát thương lên mục tiêu và tối đa 2 kẻ đứng sát nó.
 *    - Nhát 3: mạnh hơn, làm chậm mục tiêu.
 *  Hiệu ứng vòng kiếm khí: assets/sprites/fx/nhan_kiem/slash.png (6 khung, cắt bằng tools/nhan_kiem/cat_slash.py).
 *  Ảnh ảo: vẽ lại chính hình nhân vật (đúng áo, tóc, vũ khí đang mặc), nhuộm xanh, mờ dần.
 *  Bí tịch: Long Quy (Bạch Hổ Đường) có cơ hội rơi; admin thêm được.
 * ==========================================================================*/
(function (P) {
  "use strict";
  if (!P) return;
  var NK = P.NhanKiem = {};
  var CAU_HINH = NK.CAU_HINH = {
    LAO_GIAY: 0.16,          // thời gian lao tới
    CACH_DICH: 26,           // dừng cách mục tiêu
    NHAT: [0.3, 0.46, 0.64], // lúc 3 phân ảnh chém trúng (tính từ khi bấm)
    PHAN_LAO: 0.13,          // mỗi phân ảnh lao vào mất chừng này giây
    PHAN_XA: 115,            // phân ảnh xuất hiện cách mục tiêu
    PHAN_GOC: [100, -100, 180],   // hướng phân ảnh lao vào (độ, so với hướng từ mục tiêu tới người chơi)
    HE_SO_NHAT: [0.85, 0.85, 1.3],   // nhân với coef của chiêu cho từng nhát
    TAM_LAN: 46,             // kẻ đứng trong tầm này quanh mục tiêu cũng trúng
    ANH_AO: 7,               // số ảnh ảo dọc đường lao
    SLASH_TI_LE: 0.62
  };
  var BOOK = "bi_tich_nhan_kiem_hop_nhat", ICON = "assets/items/icon_" + BOOK + ".png", ANH = "assets/sprites/fx/nhan_kiem/slash.png";
  if (P.ASSET_MANIFEST) { P.ASSET_MANIFEST[ICON] = 1898; P.ASSET_MANIFEST[ANH] = 39514; }
  if (P.ASSET_VERSIONS) { P.ASSET_VERSIONS[ICON] = "nk01"; P.ASSET_VERSIONS[ANH] = "nk01"; }

  var DEF = NK.DEF = {
    id: "nhan_kiem_hop_nhat", short: "Nhân Kiếm", name: "Nhân Kiếm Hợp Nhất", book: BOOK, element: "Kiếm", glyph: "劍", icon: BOOK,
    shape: "ground", medium: !0, thuongPham: !0, requireRealm: "truc_co_2", dao: "chinh",
    autoFoe: !0, needTarget: !0, primaryTarget: !0, maxTargets: 3,
    cooldown: 10, cast: 0.3, mp: 28, sp: 11, range: 200, speed: 0, shots: 1, spread: 0,
    coef: 2.7, hitR: 0, blastR: 46, delay: 0.2, hitDelay: 0.2, vfx: "nhan_kiem_hop_nhat",
    effect: null,
    colors: { core: "#f2fbff", mid: "#4fb6ff", edge: "#164a9a", glow: "#9fe0ff" },
    tip: "Tuyệt kỹ Võ Đang: thân hoá kiếm quang lao thẳng tới mục tiêu, ảnh ảo nối đuôi sau lưng, rồi chém liên tiếp 3 nhát kiếm khí. Mỗi nhát trúng mục tiêu và tối đa 2 kẻ đứng sát nó; nhát cuối mạnh nhất và làm chậm. Cần Trúc Cơ Trung Kỳ."
  };
  if (P.ITEMS && !P.ITEMS[BOOK]) P.ITEMS[BOOK] = { id: BOOK, name: "Bí Tịch Nhân Kiếm Hợp Nhất", type: "bi_tich", grade: "Địa phẩm thượng", requireRealm: "truc_co_2", icon: BOOK,
    desc: "Kiếm quyết của Võ Đang: người và kiếm làm một, thân hoá kiếm quang lao tới áp sát rồi chém ba nhát liền. Đường Chủ Long Quy ở Bạch Hổ Đường đôi khi rơi ra. Cần Trúc Cơ Trung Kỳ." };

  /* ---------------- tiện ích ---------------- */
  function W() { return P.SceneWorld; }
  function gio() { return performance.now() / 1000; }
  function am(t, o) { try { P.Audio && P.Audio.play && P.Audio.play(t, o); } catch (e) {} }
  function chan(x, y) { var t = P.TileMap; return !!(t && t.isBlockedPixel && t.isBlockedPixel(x, y)); }
  var anh = null;
  function layAnh() { if (!anh) { anh = new Image(); anh.src = ANH + "?v=nk01"; } return anh.complete && anh.naturalWidth ? anh : null; }

  /* ---------------- trạng thái hiệu ứng ---------------- */
  var anhAo = [];    // {x,y,dir,col,cfg,sheet,t,dur}
  var vong = [];     // {x,y,t,dur,goc,lat}
  var phan = [];     // 3 phân ảnh lao vào chém: {x0,y0,x1,y1,t,lao,giu,mo,dir,cfg,sheet,vet}
  var dang = [];     // chiêu đang diễn: {pl, dich, t0, buoc}

  /* ảnh ảo: vẽ hình nhân vật vào canvas phụ rồi nhuộm xanh */
  var dem = null;
  function veAnhAo(ctx, a, camX, camY, k, nhuom) {
    if (!a.sheet || !P.SpriteFactory) return;
    var S = 2, w = 32 * S, h = 64 * S;
    if (!dem) { dem = document.createElement("canvas"); dem.width = w; dem.height = h; }
    var c = dem.getContext("2d");
    c.clearRect(0, 0, w, h); c.globalCompositeOperation = "source-over"; c.imageSmoothingEnabled = false;
    try { P.SpriteFactory.drawFrame(c, a.sheet, a.dir, a.col, 0, 0, S, a.cfg); } catch (e) { return; }
    c.globalCompositeOperation = "source-atop";
    c.fillStyle = "rgba(40,120,235," + (nhuom == null ? 0.62 : nhuom) + ")"; c.fillRect(0, 0, w, h);
    c.globalCompositeOperation = "source-over";
    var C = P.CONFIG || {}, ax = C.CHAR_ANCHOR_X || 16, ay = C.CHAR_ANCHOR_Y || 62;
    ctx.save();
    ctx.globalAlpha = Math.min(1, 0.6 * k);
    ctx.drawImage(dem, Math.round(a.x - camX - ax), Math.round(a.y - camY - ay), 32, 64);
    ctx.restore();
  }
  function veVong(ctx, v, camX, camY) {
    var img = layAnh(); if (!img) return;
    var n = 6, fw = img.naturalWidth / n, fh = img.naturalHeight;
    var k = Math.min(0.999, v.t / v.dur), f = Math.floor(k * n);
    var s = CAU_HINH.SLASH_TI_LE;
    ctx.save();
    ctx.translate(Math.round(v.x - camX), Math.round(v.y - camY - 22));
    ctx.rotate(v.goc); if (v.lat) ctx.scale(-1, 1);
    ctx.globalAlpha = k > 0.8 ? (1 - k) / 0.2 : 1;
    var sm = ctx.imageSmoothingEnabled; ctx.imageSmoothingEnabled = true;
    ctx.drawImage(img, f * fw, 0, fw, fh, -fw * s / 2, -fh * s / 2, fw * s, fh * s);
    ctx.imageSmoothingEnabled = sm;
    ctx.restore();
  }

  /* ---------------- diễn chiêu ---------------- */
  function cotDi(pl) { return Math.floor(gio() * 10) % 4; }
  function lao(d, dt) {
    var pl = d.pl, k = Math.min(1, (gio() - d.t0) / CAU_HINH.LAO_GIAY);
    if (d.daLao) return;
    var x = d.x0 + (d.x1 - d.x0) * k, y = d.y0 + (d.y1 - d.y0) * k;
    if (!chan(x, y)) { pl.x = x; pl.y = y; } else d.daLao = true;
    if (P.Player && P.Player.stop) { try { P.Player.stop(pl); } catch (e) {} }
    if (pl.path) pl.path.length = 0;
    // thả ảnh ảo đều dọc đường
    var can = Math.floor(k * CAU_HINH.ANH_AO);
    while (d.daTha < can) {
      d.daTha++;
      var kk = d.daTha / CAU_HINH.ANH_AO;
      anhAo.push({ x: d.x0 + (d.x1 - d.x0) * kk * 0.92, y: d.y0 + (d.y1 - d.y0) * kk * 0.92, dir: pl.dir, col: d.daTha % 4, cfg: pl.cfg, sheet: pl.sheet, t: 0, dur: 0.38 + 0.05 * d.daTha });
    }
    if (k >= 1) d.daLao = true;
  }
  function chem(d, i) {
    var pl = d.pl, g = d.dich;
    var cx = g && !g.dead ? g.x : d.x1 + (d.x1 - d.x0) * 0.1, cy = g && !g.dead ? g.y : d.y1;
    vong.push({ x: cx, y: cy, t: 0, dur: 0.34, goc: [-.5, .7, 0][i] + (Math.random() - .5) * .3, lat: i === 1 });
    am(i < 2 ? "swing" : "hit_big", { rate: 1 + i * 0.08 });
    if (P.Camera && P.Camera.shake) { try { P.Camera.shake(i < 2 ? 1.5 : 3, 0.12); } catch (e) {} }
    pl.attackTime = 0; pl.atkSwing = (pl.atkSwing || 0) + 1;
    // sát thương
    var w = W(); if (!w || !w.enemies || !P.Skills) return;
    var dmg = Math.max(1, Math.round(P.Skills.dmgOf(DEF) * CAU_HINH.HE_SO_NHAT[i]));
    var trung = [];
    if (g && !g.dead && w.enemies.indexOf(g) >= 0) trung.push(g);
    w.enemies.forEach(function (e) {
      if (trung.length >= DEF.maxTargets || e.dead || trung.indexOf(e) >= 0 || !e.def || e.def.tieuXa || e.def.human) return;
      var dx = e.x - cx, dy = e.y - cy; if (dx * dx + dy * dy <= CAU_HINH.TAM_LAN * CAU_HINH.TAM_LAN) trung.push(e);
    });
    trung.forEach(function (e) {
      if (w.ntDanhQuai) w.ntDanhQuai(e, dmg); else if (P.Skills.dealDamage) P.Skills.dealDamage(e, dmg, null, pl);
      if (i === 2 && !e.dead && P.Skills.applyEffect) { try { P.Skills.applyEffect(e, { kind: "slow", time: 2, mult: 0.6 }, pl); } catch (er) { e.slowT = Math.max(e.slowT || 0, 2); e.slowMult = 0.6; } }
    });
  }
  function sinhPhan(d, i) {
    var pl = d.pl, g = d.dich;
    var cx = g && !g.dead ? g.x : d.x1, cy = g && !g.dead ? g.y : d.y1;
    var goc = Math.atan2(d.y0 - cy, d.x0 - cx) + CAU_HINH.PHAN_GOC[i] * Math.PI / 180;
    var x0 = cx + Math.cos(goc) * CAU_HINH.PHAN_XA, y0 = cy + Math.sin(goc) * CAU_HINH.PHAN_XA * 0.75;
    var x1 = cx + Math.cos(goc) * 20, y1 = cy + Math.sin(goc) * 14;
    var dx = cx - x0, dy = cy - y0, dir = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 2 : 1) : (dy > 0 ? 0 : 3);
    phan.push({ x0: x0, y0: y0, x1: x1, y1: y1, t: 0, lao: CAU_HINH.PHAN_LAO, giu: 0.16, mo: 0.16, dir: dir, cfg: pl.cfg, sheet: pl.sheet, vet: 0 });
    am("swing", { rate: 1.15 + i * 0.05 });
  }
  function vePhan(ctx, o, camX, camY) {
    var x, y, col, k;
    if (o.t < o.lao) { k = o.t / o.lao; x = o.x0 + (o.x1 - o.x0) * k; y = o.y0 + (o.y1 - o.y0) * k; col = 1; }
    else { x = o.x1; y = o.y1; col = o.t < o.lao + o.giu * 0.5 ? 4 : 5; }
    var mo = o.t > o.lao + o.giu ? 1 - (o.t - o.lao - o.giu) / o.mo : 1;
    veAnhAo(ctx, { x: x, y: y, dir: o.dir, col: col, cfg: o.cfg, sheet: o.sheet }, camX, camY, 1.45 * Math.max(0, mo), 0.55);
  }
  NK.dien = function (pl, dich, aim) {
    var tx = dich ? dich.x : aim.x, ty = dich ? dich.y : aim.y;
    var dx = tx - pl.x, dy = ty - pl.y, l = Math.sqrt(dx * dx + dy * dy) || 1;
    var di = Math.max(0, Math.min(DEF.range, l - CAU_HINH.CACH_DICH));
    if (Math.abs(dx) > Math.abs(dy)) pl.dir = dx > 0 ? 2 : 1; else pl.dir = dy > 0 ? 0 : 3;
    if (pl.flying && P.Player && P.Player.landFly) { try { P.Player.landFly(pl, P.TileMap); } catch (e) {} }
    dang.push({ pl: pl, dich: dich, t0: gio(), x0: pl.x, y0: pl.y, x1: pl.x + dx / l * di, y1: pl.y + dy / l * di, buoc: 0, daTha: 0, daLao: false });
    am("skill_dash"); am("swing", { rate: 1.25 });
    if (P.VFX && P.VFX.spawnRing) P.VFX.spawnRing(pl.x, pl.y - 18, "#7fd0ff", 18, 0.25);
  };
  var tTruoc = 0;
  function capNhat() {
    var now = gio(), dt = tTruoc ? Math.min(0.1, now - tTruoc) : 0.016; tTruoc = now;
    for (var i = dang.length - 1; i >= 0; i--) {
      var d = dang[i], t = now - d.t0;
      lao(d, dt);
      while ((d.phan | 0) < 3 && t >= CAU_HINH.NHAT[d.phan | 0] - CAU_HINH.PHAN_LAO) { sinhPhan(d, d.phan | 0); d.phan = (d.phan | 0) + 1; }
      while (d.buoc < 3 && t >= CAU_HINH.NHAT[d.buoc]) { chem(d, d.buoc); d.buoc++; }
      if (d.buoc >= 3) dang.splice(i, 1);
    }
    for (var a = anhAo.length - 1; a >= 0; a--) { anhAo[a].t += dt; if (anhAo[a].t >= anhAo[a].dur) anhAo.splice(a, 1); }
    for (var q = phan.length - 1; q >= 0; q--) {
      var o = phan[q]; o.t += dt;
      if (o.t < o.lao) { o.vet -= dt; if (o.vet <= 0) { o.vet = 0.025; var kk = o.t / o.lao; anhAo.push({ x: o.x0 + (o.x1 - o.x0) * kk, y: o.y0 + (o.y1 - o.y0) * kk, dir: o.dir, col: 1, cfg: o.cfg, sheet: o.sheet, t: 0, dur: 0.22 }); } }
      if (o.t >= o.lao + o.giu + o.mo) phan.splice(q, 1);
    }
    for (var v = vong.length - 1; v >= 0; v--) { vong[v].t += dt; if (vong[v].t >= vong[v].dur) vong.splice(v, 1); }
  }

  /* ---------------- móc vào hệ thống ---------------- */
  function ganSkill() {
    var S = P.Skills; if (!S || !S.DEFS) return false;
    if (!S.DEFS[DEF.id]) {
      S.DEFS[DEF.id] = DEF;
      if (S.MEDIUM_ORDER && S.MEDIUM_ORDER.indexOf(DEF.id) < 0) S.MEDIUM_ORDER.push(DEF.id);
      if (S.SLOTS && S.SLOTS.indexOf(DEF.id) < 0) S.SLOTS.push(DEF.id);
    }
    if (S.cast && !S.cast.__nk) {
      var g = S.cast;
      S.cast = function (t, a, o, i) {
        if (a && a.id === DEF.id) {
          // tự diễn: lao tới + 3 nhát (không dùng luồng "ground" gốc)
          var dich = o && o.target && !o.target.dead ? o.target : null;
          if (!i) NK.dien(t, dich, o || { x: t.x, y: t.y });
          return;
        }
        return g.apply(this, arguments);
      };
      S.cast.__nk = true;
    }
    return true;
  }
  function ganVe() {
    var V = P.VFX; if (!V || !V.draw || V.draw.__nk) return !!(V && V.draw && V.draw.__nk);
    var d = V.draw;
    V.draw = function (ctx, camX, camY, lop) {
      try {
        if (lop === "back") { capNhat(); for (var i = 0; i < anhAo.length; i++) veAnhAo(ctx, anhAo[i], camX, camY, 1 - anhAo[i].t / anhAo[i].dur); }
      } catch (e) {}
      var r = d.apply(this, arguments);
      try {
        if (lop !== "back") {
          for (var q = 0; q < phan.length; q++) vePhan(ctx, phan[q], camX, camY);
          for (var j = 0; j < vong.length; j++) veVong(ctx, vong[j], camX, camY);
        }
      } catch (e) {}
      return r;
    };
    V.draw.__nk = true;
    return true;
  }
  var ROI = NK.ROI = { TYPE: "long_quy", CHANCE: 0.05 };
  function ganRoi() {
    var L = P.Loot; if (!L || !L.rollKill || L.rollKill.__nk) return !!(L && L.rollKill && L.rollKill.__nk);
    var g = L.rollKill;
    L.rollKill = function (a, t, e) {
      var o = g.apply(this, arguments);
      if (a && a.type === ROI.TYPE && Array.isArray(o) && (e ? e() : Math.random()) < ROI.CHANCE) o.push(BOOK);
      return o;
    };
    L.rollKill.__nk = true;
    return true;
  }
  NK._dang = function () { return { dang: dang.length, anhAo: anhAo.length, vong: vong.length, phan: phan.length }; };
  function caiDat() { var a = ganSkill(), b = ganVe(), c = ganRoi(); layAnh(); return a && b && c; }
  var lan = 0, hen = setInterval(function () { if (caiDat() || ++lan > 150) clearInterval(hen); }, 100);
  caiDat();
})(window.PNTT);
