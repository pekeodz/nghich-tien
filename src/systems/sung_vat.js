/* ============================================================================
 *  sung_vat.js — SỦNG VẬT (Nghịch Tiên)
 * ----------------------------------------------------------------------------
 *  Thú cưng đi theo chủ, cùng đánh yêu thú, tự dùng kỹ năng riêng, có cấp.
 *    - Có sủng vật: ấp Trứng Sủng Vật (mục Sủng Vật trong Hành Trang → "Ấp Trứng").
 *    - Xuất chiến / thu về ở mục Sủng Vật. Mỗi lúc chỉ một con xuất chiến.
 *    - Đi theo chủ; chủ đánh yêu thú (hoặc bị yêu thú đuổi) thì sủng vật lao vào mổ.
 *      Quái chết vì sủng vật vẫn rơi đồ, cộng Đạo Hạnh cho chủ (SceneWorld.ntDanhQuai).
 *    - Kỹ năng tự dùng khi có mục tiêu, hồi chiêu riêng.
 *    - Chủ đả tọa (hoặc đứng yên lâu) thì sủng vật ngồi ngủ.
 *    - Lên cấp nhờ yêu thú bị hạ khi đang xuất chiến; cấp càng cao mổ càng đau.
 *    - Không theo vào Vạn Hoang Chiến Trường và các trận tỉ thí / võ đài.
 *  Dữ liệu lưu trong Quest.flags.sungVat = { co: { ga_con: { lv, exp } }, xuat: "ga_con" | null }.
 *
 *  Sprite: hàng theo hướng game (xuống, trái, phải, lên), khung 112x112, chân ở (56,106).
 *  Cột 0-3 đi, 4-7 đánh, 8-10 đứng yên, 11-13 nghỉ ngơi. Cắt bằng tools/ga_con/cat.py.
 *  Thêm sủng vật khác: thêm một mục vào SV.DS và một vật phẩm trứng (trungCua: "<id>").
 * ==========================================================================*/
(function (P) {
  "use strict";
  if (!P || !P.ITEMS) return;
  var SV = P.SungVat = {};
  var CH = SV.CAU_HINH = {
    CAP_TOI_DA: 30,
    TAM_THEO: 34,        // đứng cách chủ
    TAM_DANH: 230,       // tìm yêu thú trong bán kính quanh chủ
    TAM_XA: 640,         // xa chủ quá thì dịch chuyển về
    TOC: 150             // px/giây khi đi theo
  };
  SV.DS = {
    ga_con: {
      id: "ga_con", ten: "Gà Con", icon: "assets/items/icon_ga_con.png",
      anh: "assets/sprites/sung_vat/ga_con.png", fw: 112, fh: 112, ax: 56, ay: 106, tiLe: 0.27,
      di: [0, 4], danh: [4, 4], dung: [8, 3], nghi: [11, 3], fpsDi: 9,
      donGoc: 0.3, donMoiCap: 0.015,        // mỗi cú mổ = (donGoc + donMoiCap × cấp) × đòn thường của chủ
      nhipDanh: 1.1,                          // giây giữa hai cú mổ
      kyNang: {
        id: "ga_con_no_gian", ten: "Gà Con Nổi Giận", anh: "assets/sprites/sung_vat/ga_con_ky_nang.png",
        hoi: 12, heSo: 3, banKinh: 56, choang: 0.8,
        mota: "Gà Con xù lông lao vào mổ liên hồi, gây sát thương bằng 3 lần cú mổ thường lên mọi yêu thú quanh mục tiêu và làm chúng choáng 0,8 giây. Hồi chiêu 12 giây."
      },
      mota: "Chú gà con vàng ươm, mắt tròn xoe, lúc nào cũng lon ton theo chủ. Hiền thì hiền, nhưng ai động vào chủ là xù lông mổ tới tấp."
    }
  };
  // trứng
  P.ITEMS.trung_ga_con = {
    id: "trung_ga_con", name: "Trứng Gà Con", type: "vat_pham", grade: "Linh phẩm", icon: "trung_ga_con", trungCua: "ga_con",
    desc: "Quả trứng xanh ấm tay, bên trong có tiếng lích chích. Mở Hành Trang → mục Sủng Vật → Ấp Trứng để Gà Con chui ra theo đạo hữu."
  };
  if (P.ASSET_MANIFEST) {
    P.ASSET_MANIFEST["assets/items/icon_trung_ga_con.png"] = 7940;
    P.ASSET_MANIFEST["assets/items/icon_ga_con.png"] = 6343;
    P.ASSET_MANIFEST["assets/sprites/sung_vat/ga_con.png"] = 95998;
    P.ASSET_MANIFEST["assets/sprites/sung_vat/ga_con_ky_nang.png"] = 10632;
  }

  /* ---------------- dữ liệu ---------------- */
  function flags() { var q = P.Quest; if (q && !q.flags) q.flags = {}; return q ? q.flags : null; }
  function du() {
    var f = flags(); if (!f) return { co: {}, xuat: null };
    if (!f.sungVat || typeof f.sungVat !== "object") f.sungVat = { co: {}, xuat: null };
    if (!f.sungVat.co) f.sungVat.co = {};
    return f.sungVat;
  }
  function luu() { try { P.Quest && P.Quest.save && P.Quest.save(); } catch (e) {} }
  SV.du = du;
  SV.expCan = function (lv) { return Math.round(30 * lv * (1 + 0.15 * lv)); };
  SV.dangXuat = function () { var d = du(); return d.xuat && d.co[d.xuat] && SV.DS[d.xuat] ? d.xuat : null; };
  function dinhNghia() { var id = SV.dangXuat(); return id ? SV.DS[id] : null; }
  function W() { return P.SceneWorld; }
  function pl() { return W() && W().player; }
  function tg() { return P.Game ? P.Game.time : Date.now() / 1000; }
  function mapId() { var m = W() && W().map; return (m && m.data && m.data.id) || ""; }
  function dist(a, b) { return Math.hypot(a.x - b.x, a.y - b.y); }
  function huong(dx, dy) { return Math.abs(dx) > Math.abs(dy) ? (dx < 0 ? 1 : 2) : (dy < 0 ? 3 : 0); }
  function don(p) { return P.Player && P.Player.meleeDamage && p ? P.Player.meleeDamage(p) : 5; }
  SV.satThuong = function (id, p) {
    var d = SV.DS[id], s = du().co[id]; if (!d || !s) return 0;
    return Math.max(1, Math.round(don(p || pl()) * (d.donGoc + d.donMoiCap * (s.lv || 1))));
  };

  /* ---------------- ấp trứng, xuất chiến ---------------- */
  SV.apTrung = function (itemId) {
    var it = P.ITEMS[itemId], id = it && it.trungCua, d = id && SV.DS[id];
    if (!d) return { ok: false, why: "Không phải trứng sủng vật." };
    if (!P.Inventory.has || !P.Inventory.has(itemId)) return { ok: false, why: "Trong túi không có " + it.name + "." };
    P.Inventory.remove(itemId, 1);
    var D = du(), daCo = !!D.co[id];
    if (daCo) {   // nở thêm con trùng: hoá thành kinh nghiệm cho con đang có
      themExp(id, 200);
    } else {
      D.co[id] = { lv: 1, exp: 0 };
      if (!D.xuat) D.xuat = id;
    }
    luu();
    var p = pl();
    if (p && P.VFX) { if (P.VFX.spawnRing) P.VFX.spawnRing(p.x, p.y - 8, "#ffd95a", 30, 0.7); if (P.VFX.spawnText) P.VFX.spawnText(p.x, p.y - 60, daCo ? d.ten + " +200 kinh nghiệm" : d.ten + " đã nở!", "#ffe08a"); }
    if (P.Audio && P.Audio.play) { try { P.Audio.play("quest_complete"); } catch (e) {} }
    pet = null;
    return { ok: true, daCo: daCo, id: id };
  };
  SV.xuatChien = function (id) {
    var D = du(); if (id && !D.co[id]) return;
    D.xuat = id || null; luu(); pet = null;
  };
  function themExp(id, n) {
    var s = du().co[id]; if (!s || n <= 0) return;
    if (s.lv >= CH.CAP_TOI_DA) { s.exp = 0; return; }
    s.exp = (s.exp || 0) + n;
    var len = false;
    while (s.lv < CH.CAP_TOI_DA && s.exp >= SV.expCan(s.lv)) { s.exp -= SV.expCan(s.lv); s.lv++; len = true; }
    if (s.lv >= CH.CAP_TOI_DA) s.exp = 0;
    if (len && pet && P.VFX && P.VFX.spawnText) {
      P.VFX.spawnText(pet.x, pet.y - 44, SV.DS[id].ten + " lên cấp " + s.lv + "!", "#ffe08a");
      if (P.VFX.spawnRing) P.VFX.spawnRing(pet.x, pet.y - 6, "#ffe08a", 20, 0.6);
    }
    if (len && P.Audio && P.Audio.play) { try { P.Audio.play("levelup"); } catch (e) {} }
  }
  SV.themExp = themExp;

  /* ---------------- ảnh ---------------- */
  var anh = {};
  function layAnh(src) {
    var a = anh[src];
    if (a) return a.complete && a.naturalWidth ? a : null;
    a = anh[src] = new Image(); a.src = src + "?v=1";
    return null;
  }
  SV.layAnh = layAnh;

  /* ---------------- hành vi ---------------- */
  var pet = null;   // { id, x, y, dir, tt: "di"|"dung"|"danh"|"nghi", t, muc, cdDanh, cdKN, dangDanh, nghiTu }
  SV.pet = function () { return pet; };
  function biCam() {
    var id = mapId();
    if (P.ChienTruong && id === P.ChienTruong.MAP) return true;
    if (P.ChienTruongOffline && P.ChienTruongOffline.dangDau && P.ChienTruongOffline.dangDau()) return true;
    if (P.NTBot && P.NTBot.dangDau && P.NTBot.dangDau()) return true;
    if (id === "chien_bang_dai" || id === "dai_hoi_dau") return true;
    var p = pl(); if (!p || (P.ChienTruongUI && P.ChienTruongUI.dangXem && P.ChienTruongUI.dangXem())) return true;
    return false;
  }
  function danhDuoc(e) {
    if (!e || e.dead) return false;
    if (e.ntBot && e.ntBot.kieu !== "tatu") return false;
    if (e.ct) return false;
    var d = e.def || {};
    if (P.KhoiLoi && P.KhoiLoi.danhDuoc) return P.KhoiLoi.danhDuoc(d);
    return !d.human && d.contactDmg > 0 && d.speed > 0;
  }
  function timMuc(p) {
    // ưu tiên mục tiêu chủ đang chọn, rồi yêu thú đang đuổi chủ
    var T = P.Targeting, c = T && T.currentEnemy ? T.currentEnemy() : null;
    if (c && danhDuoc(c) && dist(c, p) < CH.TAM_DANH && (p.state === "attack" || p.state === "pose" || c.state === "chase" || (W() && W().autoOn))) return c;
    var w = W(), best = null, bd = CH.TAM_DANH;
    (w && w.enemies || []).forEach(function (e) {
      if (!danhDuoc(e) || e.state !== "chase") return;
      var d = dist(e, p); if (d < bd) { bd = d; best = e; }
    });
    return best;
  }
  // sủng vật nhỏ, đi xuyên bụi cây / đá cho khỏi kẹt
  function diToi(tx, ty, toc, dt) {
    var dx = tx - pet.x, dy = ty - pet.y, d = Math.hypot(dx, dy);
    if (d < 2) return false;
    var b = Math.min(d, toc * dt);
    pet.x += dx / d * b; pet.y += dy / d * b;
    pet.dir = huong(dx, dy);
    return true;
  }
  var truoc = 0;
  SV.capNhat = function () {
    var now = tg(), dt = Math.min(0.1, Math.max(0, now - (truoc || now))); truoc = now;
    var id = SV.dangXuat(), p = pl();
    if (!id || !p || biCam()) { pet = null; return; }
    var d = SV.DS[id];
    if (!pet || pet.id !== id || pet.map !== mapId()) {
      pet = { id: id, map: mapId(), x: p.x - 26, y: p.y + 6, dir: 0, tt: "dung", t: 0, muc: null, cdDanh: 0, cdKN: 2, nghiTu: now, cuX: p.x, cuY: p.y };
      if (P.VFX && P.VFX.spawnRing) P.VFX.spawnRing(pet.x, pet.y - 6, "#ffe08a", 14, 0.4);
    }
    pet.t += dt;
    pet.cdDanh = Math.max(0, pet.cdDanh - dt);
    pet.cdKN = Math.max(0, pet.cdKN - dt);
    // chủ đứng yên lâu / đả tọa → ngủ
    if (Math.hypot(p.x - pet.cuX, p.y - pet.cuY) > 2 || p.state === "attack") { pet.nghiTu = now; pet.cuX = p.x; pet.cuY = p.y; }
    if (dist(pet, p) > CH.TAM_XA) { pet.x = p.x - 20; pet.y = p.y + 6; pet.muc = null; }
    // đang mổ: chờ hết hoạt ảnh
    if (pet.dangDanh) {
      var dd = pet.dangDanh; dd.t += dt;
      if (!dd.trung && dd.t >= dd.luc) { dd.trung = true; ra(dd); }
      if (dd.t >= dd.dai) pet.dangDanh = null;
      return;
    }
    var m = p.downed ? null : timMuc(p);
    if (m) {
      pet.muc = m;
      var kc = dist(pet, m);
      if (kc > 26) { diToi(m.x + (pet.x < m.x ? -18 : 18), m.y + 2, CH.TOC * 1.4, dt); pet.tt = "di"; }
      else {
        pet.dir = huong(m.x - pet.x, m.y - pet.y);
        if (pet.cdKN <= 0) {
          pet.cdKN = d.kyNang.hoi; pet.cdDanh = d.nhipDanh;
          pet.dangDanh = { muc: m, t: 0, luc: 0.3, dai: 0.6, kn: true };
          pet.tt = "danh";
          hienKyNang(d);
        } else if (pet.cdDanh <= 0) {
          pet.cdDanh = d.nhipDanh;
          pet.dangDanh = { muc: m, t: 0, luc: 0.22, dai: 0.45 };
          pet.tt = "danh";
        } else pet.tt = "dung";
      }
      pet.nghiTu = now;
      return;
    }
    pet.muc = null;
    // theo chủ: đứng sau lưng chủ
    var o = [[-1, -0.35], [1.1, 0.2], [-1.1, 0.2], [0.6, 1]][p.dir & 3] || [-1, 0];
    var tx = p.x + o[0] * CH.TAM_THEO, ty = p.y + 4 + o[1] * 14;
    var kc2 = Math.hypot(tx - pet.x, ty - pet.y);
    var dangDi = kc2 > 10 && diToi(tx, ty, CH.TOC * (kc2 > 90 ? 1.9 : 1.1), dt);
    if (dangDi) { pet.tt = "di"; pet.nghiTu = Math.max(pet.nghiTu, now - 1); return; }
    if (p.state === "sit" || now - pet.nghiTu > 12) {
      if (pet.tt !== "nghi") { pet.tt = "nghi"; pet.t = 0; }
    } else { if (pet.tt !== "dung") pet.t = 0; pet.tt = "dung"; pet.dir = p.dir & 3; }
  };
  function hienKyNang(d) {
    pet.knHien = 1.2;
    if (P.VFX && P.VFX.spawnText) P.VFX.spawnText(pet.x, pet.y - 50, d.kyNang.ten + "!", "#ffb347");
    if (P.Audio && P.Audio.play) { try { P.Audio.play("whisper", { gain: 0.5 }); } catch (e) {} }
  }
  function ra(dd) {
    var m = dd.muc, d = SV.DS[pet.id], p = pl();
    if (!m || m.dead || !p) return;
    var w = W(), dmg = SV.satThuong(pet.id, p);
    if (dd.kn) {
      var k = d.kyNang, ds = (w.enemies || []).filter(function (e) { return danhDuoc(e) && dist(e, m) <= k.banKinh; });
      if (P.VFX) {
        if (P.VFX.spawnRing) P.VFX.spawnRing(m.x, m.y - 4, "#ffb347", k.banKinh, 0.45);
        if (P.VFX.spawnFireBurst) P.VFX.spawnFireBurst(m.x, m.y - 10, { core: "#fff3c4", mid: "#ffc04a", edge: "#e2731f", glow: "#ffe08a" });
      }
      ds.forEach(function (e) {
        e.stunT = Math.max(e.stunT || 0, k.choang);
        if (w.ntDanhQuai) w.ntDanhQuai(e, Math.round(dmg * k.heSo));
      });
    } else {
      if (P.VFX && P.VFX.spawnHitSpark) P.VFX.spawnHitSpark(m.x, m.y - 14);
      if (w.ntDanhQuai) w.ntDanhQuai(m, dmg);
    }
  }

  /* ---------------- vẽ ---------------- */
  SV.khung = function (d, tt, t, dir) {
    if (tt === "di") return d.di[0] + Math.floor(t * d.fpsDi) % d.di[1];
    if (tt === "danh") return d.danh[0] + Math.min(d.danh[1] - 1, Math.floor(t * d.danh[1]));
    if (tt === "nghi") { var k = Math.floor(t * 0.8); return d.nghi[0] + (k < 2 ? k : 1 + (Math.floor(t * 0.5) % 2)); }
    var seq = [0, 0, 0, 1, 0, 0, 2, 0], i = seq[Math.floor(t * 2.5) % seq.length];
    return d.dung[0] + i;
  };
  SV.veKhung = function (ctx, d, col, dir, chanX, chanY, k) {
    var img = layAnh(d.anh); if (!img) return false;
    k = k || d.tiLe;
    var sm = ctx.imageSmoothingEnabled; ctx.imageSmoothingEnabled = true;
    ctx.drawImage(img, col * d.fw, (dir & 3) * d.fh, d.fw, d.fh, chanX - d.ax * k, chanY - d.ay * k, d.fw * k, d.fh * k);
    ctx.imageSmoothingEnabled = sm;
    return true;
  };
  function vePet(ctx, camX, camY) {
    if (!pet) return;
    var d = SV.DS[pet.id], x = Math.round(pet.x - camX), y = Math.round(pet.y - camY);
    var tt = pet.dangDanh ? "danh" : pet.tt, t = pet.dangDanh ? pet.dangDanh.t / pet.dangDanh.dai : pet.t;
    ctx.save();
    ctx.fillStyle = "rgba(0,0,0,0.25)";
    ctx.beginPath(); ctx.ellipse(x, y, 9, 3, 0, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
    SV.veKhung(ctx, d, SV.khung(d, tt, t, pet.dir), pet.dir, x, y);
    // tên + cấp
    var s = du().co[pet.id];
    ctx.save();
    ctx.font = "bold 9px sans-serif"; ctx.textAlign = "center";
    var ten = d.ten + " · " + (s ? s.lv : 1);
    ctx.fillStyle = "rgba(0,0,0,0.6)"; ctx.fillText(ten, x + 1, y - 27);
    ctx.fillStyle = "#ffe9a8"; ctx.fillText(ten, x, y - 28);
    ctx.restore();
    // biểu tượng kỹ năng bật lên trên đầu
    if (pet.knHien > 0) {
      pet.knHien -= 1 / 60;
      var ic = layAnh(d.kyNang.anh);
      if (ic) {
        var a = Math.min(1, pet.knHien * 2), lift = (1.2 - pet.knHien) * 10;
        ctx.save(); ctx.globalAlpha = a;
        ctx.drawImage(ic, x - 11, y - 66 - lift, 22, 22);
        ctx.strokeStyle = "#ffcf6a"; ctx.lineWidth = 1; ctx.strokeRect(x - 11.5, y - 66.5 - lift, 23, 23);
        ctx.restore();
      }
    }
  }
  // chen vào danh sách vẽ theo chiều sâu của thế giới (nhờ móc depthItems của Chiến Trường, luôn được gọi mỗi khung)
  function bocVe() {
    var U = P.ChienTruongUI;
    if (!U || !U.depthItems) return false;
    if (U.depthItems.__sv) return true;
    var g = U.depthItems;
    U.depthItems = function (list) {
      var r = g.apply(this, arguments);
      try {
        SV.capNhat();
        if (pet && list && list.push) list.push({ y: pet.y, fn: function (ctx, camX, camY) { vePet(ctx, camX, camY); } });
      } catch (e) { if (window.console) console.error(e); }
      return r;
    };
    U.depthItems.__sv = true;
    return true;
  }
  // kinh nghiệm: mỗi yêu thú bị hạ (bởi chủ hay sủng vật) khi đang xuất chiến
  function bocExp() {
    var Q = P.Quest;
    if (!Q || !Q.addKill) return false;
    if (Q.addKill.__sv) return true;
    var g = Q.addKill;
    Q.addKill = function (def) {
      try {
        var id = SV.dangXuat();
        if (id && pet && def && !def.ntBot) { themExp(id, Math.max(2, Math.round((def.level || 1) * 2 + (def.isBoss ? 40 : 0)))); }
      } catch (e) {}
      return g.apply(this, arguments);
    };
    Q.addKill.__sv = true;
    return true;
  }

  var lan = 0, hen = setInterval(function () { var a = bocVe(), b = bocExp(); if ((a && b) || ++lan > 200) clearInterval(hen); }, 150);
  layAnh(SV.DS.ga_con.anh); layAnh(SV.DS.ga_con.kyNang.anh);
})(window.PNTT);
