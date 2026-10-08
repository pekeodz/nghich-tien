/* ============================================================================
 *  huyen_am_tram.js — CHIÊU HUYỀN ÂM TRẢM (Nghịch Tiên, theo chiêu Ngũ Độc của Kiếm Thế)
 * ----------------------------------------------------------------------------
 *  Dạng phóng tia (bolt), bắn liên tục (hồi 1 giây): 3 luồng đao khí độc bay thẳng,
 *  trúng thì bùng độc + bãi độc; độc CỘNG TẦNG (effect.chong, xử lý trong skills.js) tối đa 10 tầng, 6 giây.
 *  Hình ảnh: sprite assets/sprites/fx/huyen_am_tram/{khi,no,vung}.png (cắt bằng tools/huyen_am_tram/cat_sprite.py)
 *            + vòng ấn dưới chân, nhát chém trăng khuyết, tia và giọt độc vẽ bằng canvas.
 *  Gắn vào skills.js ở các chỗ ghi "Nghịch Tiên: Huyền Âm Trảm" (phát chiêu, vẽ đạn, trúng đích, tính độc).
 *  Âm thanh: assets/audio/sfx/huyen_am_tram_{phat,trung}.mp3 (thay tiếng tổng hợp mặc định của chiêu).
 *  Chiêu thượng phẩm (như Phi Long Tại Thiên): cần Trúc Cơ Trung Kỳ; bí tịch rơi 2% từ Song Dực Ma Báo.
 *  Chỉnh số ở DEF và ROI bên dưới.
 * ==========================================================================*/
(function (P) {
  "use strict";
  if (!P) return;
  var HAT = P.HuyenAmTramFX = { list: [] };
  var TAU = Math.PI * 2;
  function rnd(a, b) { return a + Math.random() * (b - a); }
  function rg(c, x, y, r0, r1, st) { var g = c.createRadialGradient(x, y, r0, x, y, r1); st.forEach(function (s) { g.addColorStop(s[0], s[1]); }); return g; }
  var M = { loi: "#f4ffd8", sang: "#9dff4a", vua: "#3fe03a", dam: "#138a2a", toi: "#06401a" };

  /* ---------------- sprite ---------------- */
  var THU_MUC = "assets/sprites/fx/huyen_am_tram/", VER = "1";
  var SP = { khi: { w: 142, h: 57, n: 8, fps: 16, tl: 0.46 }, no: { w: 156, h: 143, n: 4, tl: 0.5 }, vung: { w: 173, h: 136, n: 3, tl: 0.42 } };
  var anh = {};
  function lay(k) {
    var a = anh[k];
    if (a) return a.complete && a.naturalWidth ? a : null;
    if (typeof Image === "undefined") return null;
    a = anh[k] = new Image(); a.src = THU_MUC + k + ".png?v=" + VER; return null;
  }
  HAT.nap = function () { lay("khi"); lay("no"); lay("vung"); };
  function veKhung(c, k, f, x, y, goc, tlX, tlY) {
    var S = SP[k], img = lay(k); if (!img) return false;
    f = Math.max(0, Math.min(S.n - 1, f | 0));
    c.save(); c.translate(x, y); if (goc) c.rotate(goc);
    var w = S.w * (tlX || S.tl), h = S.h * (tlY || tlX || S.tl);
    var sm = c.imageSmoothingEnabled; c.imageSmoothingEnabled = true;
    c.drawImage(img, f * S.w, 0, S.w, S.h, k === "khi" ? -w + 8 : -w / 2, -h / 2, w, h);
    c.imageSmoothingEnabled = sm;
    c.restore(); return true;
  }


  /* ---------------- âm thanh (assets/audio/sfx/huyen_am_tram_*.mp3, cắt từ đoạn review bạn gửi) ---------------- */
  var AM = { phat: { src: "assets/audio/sfx/huyen_am_tram_phat.mp3", gain: 0.75 }, trung: { src: "assets/audio/sfx/huyen_am_tram_trung.mp3", gain: 0.6, min: 0.12 } };
  function napAm() {
    var A = P.Audio; if (!A || !A.ctx || typeof fetch === "undefined") return;
    Object.keys(AM).forEach(function (k) {
      var a = AM[k]; if (a.buf || a.dang) return; a.dang = true;
      fetch(a.src + "?v=" + VER).then(function (r) { return r.arrayBuffer(); })
        .then(function (b) { return new Promise(function (ok, loi) { A.ctx.decodeAudioData(b, ok, loi); }); })
        .then(function (buf) { a.buf = buf; }, function () { a.dang = false; });
    });
  }
  // phát tại điểm (x,y): xa người chơi thì nhỏ dần như Audio.atPoint
  function choi(k, x, y) {
    var A = P.Audio, a = AM[k];
    if (!A || !a || !A.ready || !A.on || !A.sfxOn || !(A.volume > 0) || !A.ctx || A.ctx.state !== "running" || !A.master) return;
    if (!a.buf) { napAm(); return; }
    var now = A.ctx.currentTime; if (a.min && a.luc && now - a.luc < a.min) return; a.luc = now;
    var g = a.gain, pl = P.SceneWorld && P.SceneWorld.player;
    if (pl && typeof x === "number") { var d = Math.hypot(x - pl.x, y - pl.y); if (d >= 320) return; var s = 1 - d / 320; g *= s * s; }
    try {
      var src = A.ctx.createBufferSource(), gn = A.ctx.createGain();
      src.buffer = a.buf; gn.gain.value = g; src.connect(gn); gn.connect(A.master); src.start(now);
    } catch (e) {}
  }
  HAT.choi = choi; HAT._am = AM;
  function ganAm() {
    var A = P.Audio; if (!A || !A.playSkill || A.playSkill.__hat) return;
    var g = A.playSkill;
    A.playSkill = function (def) { if (def && def.id === "huyen_am_tram") return true; return g.apply(this, arguments); };   // dùng tiếng riêng thay tiếng tổng hợp
    A.playSkill.__hat = true;
    napAm();
  }

  /* ---------------- phát chiêu / trúng ---------------- */
  // (x,y): chân người ra chiêu (đã trừ độ cao bay), a: góc nhắm
  HAT.phat = function (x, y, a) {
    HAT.nap();
    choi("phat", x, y);
    var L = HAT.list;
    L.push({ k: "an", x: x, y: y, t: 0, max: 0.75 });
    L.push({ k: "chem", x: x, y: y - 18, a: a, t: 0, max: 0.22, lat: 1 });
    L.push({ k: "chem", x: x, y: y - 16, a: a, t: -0.08, max: 0.22, lat: -1 });
  };
  HAT.trung = function (x, y) {
    var L = HAT.list;
    // nhiều luồng trúng gần nhau → một bãi độc
    for (var i = 0; i < L.length; i++) if (L[i].k === "vung" && Math.abs(L[i].x - x) < 18 && Math.abs(L[i].y - y) < 12 && L[i].t < 0.5) return;
    choi("trung", x, y);
    L.push({ k: "no", x: x, y: y, t: 0, max: 0.5 });
    L.push({ k: "vung", x: x, y: y, t: 0, max: 2.6 });
    for (var j = 0; j < 12; j++) { var aa = rnd(0, TAU), vv = rnd(40, 110); L.push({ k: "giot", x: x, y: y - 8, vx: Math.cos(aa) * vv, vy: Math.sin(aa) * vv * 0.6 - rnd(20, 60), t: 0, max: rnd(0.35, 0.6), r: rnd(1, 2.2), gy: y + rnd(-6, 6) }); }
  };
  // vẽ một viên đạn (bolt) của chiêu: u = bolt của Skills, (sx,sy) = toạ độ màn hình
  HAT.veDan = function (c, u, sx, sy) {
    var S = SP.khi, f = Math.floor(((u.elapsed || 0) + (u.spin || 0)) * S.fps) % S.n;
    if (!veKhung(c, "khi", f, sx, sy, u.angle, 0.42, 0.42)) {
      c.save(); c.strokeStyle = M.vua; c.lineWidth = 3; c.beginPath(); c.moveTo(sx, sy); c.lineTo(sx - Math.cos(u.angle) * 20, sy - Math.sin(u.angle) * 20); c.stroke(); c.restore();
    }
    if (Math.random() < 0.5) HAT.list.push({ k: "tia", x: u.x - Math.cos(u.angle) * 10, y: u.y + rnd(-2, 2), vx: -Math.cos(u.angle) * rnd(20, 50) + rnd(-15, 15), vy: rnd(-25, 10), t: 0, max: rnd(0.2, 0.35) });
  };

  HAT.update = function (dt) {
    var L = HAT.list;
    for (var i = L.length - 1; i >= 0; i--) {
      var p = L[i]; p.t += dt;
      if (p.k === "vung" && p.t > 0 && Math.random() < dt * 7) L.push({ k: "bot", x: p.x + rnd(-14, 14), y: p.y + rnd(-5, 5), t: 0, max: rnd(0.5, 0.9), r: rnd(1.2, 2.4) });
      if (p.k === "tia") { p.x += p.vx * dt; p.y += p.vy * dt; }
      if (p.k === "giot") { p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 260 * dt; if (p.y > p.gy) { p.y = p.gy; p.vx *= 0.5; p.vy = 0; } }
      if (p.t >= p.max) L.splice(i, 1);
    }
    if (L.length > 400) L.splice(0, L.length - 400);
  };
  function veAn(c, p) {   // vòng ấn lục dưới chân
    var k = p.t / p.max, al = k < 0.2 ? k / 0.2 : 1 - (k - 0.2) / 0.8, r = 16 + 6 * Math.min(1, k * 3);
    c.save(); c.translate(p.x, p.y); c.scale(1, 0.5); c.globalAlpha = al;
    c.fillStyle = rg(c, 0, 0, 0, r + 4, [[0, "rgba(157,255,74,0.35)"], [0.7, "rgba(63,224,58,0.18)"], [1, "rgba(19,138,42,0)"]]); c.beginPath(); c.arc(0, 0, r + 4, 0, TAU); c.fill();
    c.strokeStyle = M.sang; c.lineWidth = 1.6; c.beginPath(); c.arc(0, 0, r, 0, TAU); c.stroke();
    c.lineWidth = 1; c.beginPath(); c.arc(0, 0, r * 0.62, 0, TAU); c.stroke();
    c.rotate(p.t * 3);
    for (var i = 0; i < 6; i++) { c.rotate(TAU / 6); c.fillStyle = M.loi; c.fillRect(r * 0.66, -1.2, r * 0.3, 2.4); c.beginPath(); c.arc(r * 0.81, 0, 1.6, 0, TAU); c.fill(); }
    c.restore();
  }
  function veChem(c, p) {   // nhát chém trăng khuyết đặc
    if (p.t < 0) return;
    var k = p.t / p.max, al = 1 - k * k, r = 22 + 8 * k, day = 7 * (1 - k * 0.6);
    var giua = -0.2 + 1.4 * Math.min(1, k * 1.7), a0 = giua - 1.2, a1 = giua + 0.5;
    c.save(); c.translate(p.x, p.y); c.rotate(p.a); c.scale(1, 0.8 * p.lat);
    var g = c.createLinearGradient(Math.cos(a0) * r, Math.sin(a0) * r, Math.cos(a1) * r, Math.sin(a1) * r);
    g.addColorStop(0, "rgba(19,138,42,0)"); g.addColorStop(0.55, "rgba(63,224,58,0.85)"); g.addColorStop(1, "rgba(244,255,216,1)");
    c.globalAlpha = al; c.fillStyle = g;
    c.beginPath(); c.arc(0, 0, r, a0, a1); c.arc(day * 0.6, 0, r - day, a1, a0, true); c.closePath(); c.fill();
    c.strokeStyle = M.loi; c.lineWidth = 1.2; c.beginPath(); c.arc(0, 0, r, a0 + (a1 - a0) * 0.5, a1); c.stroke();
    c.restore();
  }
  function veBot(c, p) {    // bọt độc nổi lên
    var k = p.t / p.max; c.save(); c.globalAlpha = 1 - k; c.strokeStyle = M.sang; c.lineWidth = 0.8; c.fillStyle = "rgba(157,255,74,0.35)";
    c.beginPath(); c.arc(p.x, p.y - k * 10, p.r * (0.6 + k), 0, TAU); c.fill(); c.stroke(); c.restore();
  }
  function veTia(c, p) { var k = p.t / p.max; c.save(); c.globalAlpha = 1 - k; c.fillStyle = k < 0.5 ? M.loi : M.sang; c.fillRect(p.x - 0.8, p.y - 0.8, 1.6, 1.6); c.restore(); }
  function veGiot(c, p) { var k = p.t / p.max; c.save(); c.globalAlpha = 1 - k; c.fillStyle = k < 0.4 ? M.sang : M.vua; c.beginPath(); c.arc(p.x, p.y, p.r, 0, TAU); c.fill(); c.restore(); }
  function veNo(c, p) { var S = SP.no, f = Math.min(S.n - 1, Math.floor(p.t / p.max * S.n)); c.save(); c.globalAlpha = p.t > p.max * 0.75 ? (p.max - p.t) / (p.max * 0.25) : 1; veKhung(c, "no", f, p.x, p.y - 14, 0); c.restore(); }
  function veVung(c, p) {
    var k = p.t / p.max, f = k < 0.25 ? 0 : k < 0.6 ? 1 : 2;
    var al = Math.min(1, p.t / 0.15) * Math.min(1, (p.max - p.t) / 0.5);
    c.save(); c.globalAlpha = al * 0.95; veKhung(c, "vung", f, p.x, p.y, 0, 0.5, 0.4); c.restore();
  }
  // lop "back": ấn + bãi độc (dưới nhân vật); "front": còn lại
  HAT.draw = function (c, camX, camY, lop) {
    var L = HAT.list; if (!L.length) return;
    c.save(); c.translate(-camX, -camY);
    for (var i = 0; i < L.length; i++) {
      var p = L[i]; if (p.t < 0) continue;
      if (lop === "back") { if (p.k === "an") veAn(c, p); else if (p.k === "vung") veVung(c, p); }
      else if (lop === "front") {
        if (p.k === "no") veNo(c, p);
        c.globalCompositeOperation = "lighter";
        if (p.k === "chem") veChem(c, p); else if (p.k === "tia") veTia(c, p);
        c.globalCompositeOperation = "source-over";
        if (p.k === "bot") veBot(c, p); else if (p.k === "giot") veGiot(c, p);
      }
    }
    c.restore();
  };
  function ganVFX() {
    var V = P.VFX; if (!V || !V.update || !V.draw || V.__hat) return;
    V.__hat = true;
    var u = V.update, d = V.draw, cl = V.clear;
    V.update = function (dt) { var r = u.apply(this, arguments); try { HAT.update(dt || 0); } catch (e) {} return r; };
    V.draw = function (ctx, camX, camY, lop) { var r = d.apply(this, arguments); try { HAT.draw(ctx, camX, camY, lop); } catch (e) {} return r; };
    if (cl) V.clear = function () { HAT.list.length = 0; return cl.apply(this, arguments); };
  }

  /* ---------------- chiêu + bí tịch ---------------- */
  var BOOK = "bi_tich_huyen_am_tram", ICON = "assets/items/icon_" + BOOK + ".png";
  if (P.ASSET_MANIFEST) P.ASSET_MANIFEST[ICON] = 2069;
  if (P.ASSET_VERSIONS) P.ASSET_VERSIONS[ICON] = "hat03";
  var DEF = HAT.DEF = {
    id: "huyen_am_tram", short: "Huyền Âm", name: "Huyền Âm Trảm", book: BOOK, element: "Độc", glyph: "毒", icon: BOOK,
    shape: "bolt", medium: !0, thuongPham: !0, requireRealm: "truc_co_2", straight: !0,
    // bắn liên tục: sát thương mỗi phát thấp, mạnh nhờ độc cộng tầng khi đánh lâu
    cooldown: 1, cast: 0.2, mp: 7, sp: 2, range: 190, speed: 320, shots: 3, spread: 12,
    coef: 0.8, hitR: 13, blastR: 0,
    effect: [{ kind: "poison", time: 6, dpsCoef: 0.1, chong: 10 }, { kind: "slow", time: 1.5, mult: 0.8 }],
    colors: { core: "#f4ffd8", mid: "#3fe03a", edge: "#06401a", glow: "#9dff4a" },
    tip: "Tuyệt kỹ Ngũ Độc: chém liên tục ba luồng âm độc hình rắn, hồi chiêu chỉ 1 giây. Sát thương mỗi phát nhẹ nhưng độc cộng dồn: mỗi luồng trúng thêm một tầng (tối đa 10), mỗi tầng rút máu thêm, độc kéo dài 6 giây và làm mới khi trúng tiếp. Hợp đánh lâu. Cần Trúc Cơ Trung Kỳ."
  };
  if (P.ITEMS && !P.ITEMS[BOOK]) P.ITEMS[BOOK] = { id: BOOK, name: "Bí Tịch Huyền Âm Trảm", type: "bi_tich", grade: "Địa phẩm thượng", requireRealm: "truc_co_2", icon: BOOK,
    desc: "Tuyệt kỹ thất truyền của Ngũ Độc giáo: dẫn âm độc vào lưỡi đao, chém liên tục ra từng luồng độc khí hình rắn. Độc ngấm dần, càng đánh lâu càng rút máu mạnh. Song Dực Ma Báo đôi khi rơi ra. Cần Trúc Cơ Trung Kỳ." };
  function ganSkill() {
    var S = P.Skills; if (!S || !S.DEFS) return;
    if (!S.DEFS.huyen_am_tram) {
      S.DEFS.huyen_am_tram = DEF;
      if (S.MEDIUM_ORDER && S.MEDIUM_ORDER.indexOf(DEF.id) < 0) S.MEDIUM_ORDER.push(DEF.id);
      if (S.SLOTS && S.SLOTS.indexOf(DEF.id) < 0) S.SLOTS.push(DEF.id);
    }
  }
  // rơi từ Song Dực Ma Báo như Phi Long Tại Thiên / Cửu U Ma Trảo (2%)
  var ROI = HAT.ROI = { TYPE: "song_duc_ma_bao", CHANCE: 0.02 };
  function ganRoi() {
    var L = P.Loot; if (!L || !L.rollKill || L.rollKill.__hat) return;
    var g = L.rollKill;
    L.rollKill = function (a, t, e) {
      var o = g.apply(this, arguments);
      if (a && a.type === ROI.TYPE && Array.isArray(o) && (e ? e() : Math.random()) < ROI.CHANCE) o.push(BOOK);
      return o;
    };
    L.rollKill.__hat = true;
  }
  function caiDat() { ganSkill(); ganVFX(); ganRoi(); ganAm(); }
  caiDat();
  if (typeof window !== "undefined") window.addEventListener("load", caiDat);
})(window.PNTT);
