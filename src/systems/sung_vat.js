/* ============================================================================
 *  sung_vat.js — SỦNG VẬT (Nghịch Tiên)
 * ----------------------------------------------------------------------------
 *  Thú cưng đi theo chủ, cùng đánh yêu thú, tự dùng kỹ năng riêng, có cấp.
 *    - Có sủng vật: ấp Trứng Sủng Vật (mục Sủng Vật trong Hành Trang → "Ấp Trứng").
 *    - Xuất chiến / thu về ở mục Sủng Vật. Mỗi lúc chỉ một con xuất chiến.
 *    - Đi theo chủ; chủ đánh yêu thú (hoặc bị yêu thú đuổi) thì sủng vật xông vào đánh.
 *      Quái chết vì sủng vật vẫn rơi đồ, cộng Đạo Hạnh cho chủ (SceneWorld.ntDanhQuai).
 *    - Kỹ năng tự dùng khi có mục tiêu, hồi chiêu riêng.
 *    - Chủ đả tọa (hoặc đứng yên lâu) thì sủng vật ngồi ngủ.
 *    - Lên cấp nhờ yêu thú bị hạ khi đang xuất chiến; cấp càng cao đánh càng đau.
 *    - Không theo vào Vạn Hoang Chiến Trường và các trận tỉ thí / võ đài.
 *  Dữ liệu lưu trong Quest.flags.sungVat = { co: { ga_con: { lv, exp } }, xuat: "ga_con" | null }.
 *
 *  Sprite: hàng theo hướng game (xuống, trái, phải, lên), khung 136x136, chân ở (68,128).
 *  Cột 0-4 đi, 5-8 đánh, 9-11 đứng yên, 12-15 nghỉ ngơi (số khung từng hướng: soDi/soDanh). Ghép bằng tools/ga_con/cat.py.
 *  Thêm sủng vật khác: thêm một mục vào SV.DS (sprite cùng bố cục) và một vật phẩm trứng (trungCua: "<id>").
 *  Trang bị sủng vật (Mũ · Vai · Giáp): xem SV.O_TB bên dưới; đồ mặc lưu ở Quest.flags.sungVat.co[id].tb.
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
      anh: "assets/sprites/sung_vat/ga_con.png", fw: 136, fh: 136, ax: 68, ay: 128, cao: 112, tiLe: 0.32,
      // cột: đi 0-4, đánh 5-8, đứng yên 9-11, nghỉ 12-15 · số khung theo hướng (xuống, trái, phải, lên)
      di: [0, 5], soDi: [4, 4, 5, 4], danh: [5, 4], soDanh: [4, 3, 3, 4], dung: [9, 3], nghi: [12, 4], fpsDi: 8,
      tamBan: 110,                            // đứng cách mục tiêu bao xa thì bắn được (px)
      nongSung: [[16, -12], [-18, -12], [18, -12], [8, -22]],   // đầu nòng súng theo hướng (so với chân)
      donGoc: 0.3, donMoiCap: 0.015,        // mỗi phát bắn = (donGoc + donMoiCap × cấp) × đòn thường của chủ
      nhipDanh: 1.1,                          // giây giữa hai phát bắn
      kyNang: {
        id: "dan_hoa_cai", ten: "Đạn Hoa Cải", anh: "assets/sprites/sung_vat/ga_con_ky_nang.png",
        hoi: 12, heSo: 3, tam: 140, goc: 40, choang: 0.6,
        mota: "Gà Con nạp đạn hoa cải, bóp cò một phát toé lửa: mọi yêu thú trong hình quạt trước nòng (xa 140) trúng sát thương bằng 3 lần phát bắn thường và choáng 0,6 giây. Hồi chiêu 12 giây."
      },
      nguon: "Quản trị gửi tặng",
      mota: "Chú gà con đội nón lá, quàng khăn hồng, ôm khẩu súng săn to gần bằng người. Lon ton theo chủ cả ngày, thấy yêu thú là lên đạn bắn liền."
    }
  };
  // trứng
  P.ITEMS.trung_ga_con = {
    id: "trung_ga_con", name: "Trứng Gà Con", type: "vat_pham", grade: "Linh phẩm", icon: "trung_ga_con", trungCua: "ga_con",
    desc: "Quả trứng xanh ấm tay, bên trong có tiếng lích chích và tiếng lạch cạch như ai đang lên đạn. Mở Hành Trang → mục Sủng Vật → Ấp Trứng để Gà Con chui ra theo đạo hữu."
  };
  if (P.ASSET_MANIFEST) {
    P.ASSET_MANIFEST["assets/items/icon_trung_ga_con.png"] = 9125;
    P.ASSET_MANIFEST["assets/items/icon_ga_con.png"] = 9450;
    P.ASSET_MANIFEST["assets/sprites/sung_vat/ga_con.png"] = 217450;
    P.ASSET_MANIFEST["assets/sprites/sung_vat/ga_con_ky_nang.png"] = 13309;
    if (P.ASSET_VERSIONS) { P.ASSET_VERSIONS["assets/items/icon_trung_ga_con.png"] = "sv2"; P.ASSET_VERSIONS["assets/items/icon_ga_con.png"] = "sv2"; }
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
  /* ---------------- trang bị sủng vật: Mũ · Vai · Giáp ----------------
   * Vật phẩm trang bị cho sủng vật khai báo như sau (ví dụ):
   *   P.ITEMS.sv_mu_long_vu = { id: "sv_mu_long_vu", name: "Mũ Lông Vũ", type: "sv_trang_bi", svSlot: "mu",
   *     grade: "Linh phẩm", icon: "sv_mu_long_vu", svCong: 8, svTocDanh: 0, svHoiChieu: 5, svExp: 0, desc: "…" };
   *   svCong: +% sát thương · svTocDanh: +% tốc độ đánh · svHoiChieu: −% hồi chiêu kỹ năng · svExp: +% kinh nghiệm
   *   (tuỳ chọn) chiCho: ["ga_con"] — chỉ sủng vật trong danh sách mới mặc được. */
  SV.O_TB = [{ id: "mu", ten: "Mũ", mark: "MŨ" }, { id: "vai", ten: "Vai", mark: "VAI" }, { id: "giap", ten: "Giáp", mark: "GIÁP" }];
  SV.CHI_SO = [["svCong", "Sát thương", "+", "%"], ["svTocDanh", "Tốc độ đánh", "+", "%"], ["svHoiChieu", "Hồi chiêu", "−", "%"], ["svExp", "Kinh nghiệm", "+", "%"]];
  function tbCua(id) { var s = du().co[id]; if (!s) return {}; if (!s.tb) s.tb = {}; return s.tb; }
  SV.tbCua = tbCua;
  SV.laDoSV = function (def) { return !!(def && def.type === "sv_trang_bi" && def.svSlot); };
  SV.macDuoc = function (petId, def) { return SV.laDoSV(def) && (!def.chiCho || def.chiCho.indexOf(petId) >= 0); };
  SV.chiSoTb = function (id) {
    var tb = tbCua(id), t = { svCong: 0, svTocDanh: 0, svHoiChieu: 0, svExp: 0 };
    for (var k in tb) { var it = tb[k] && P.ITEMS[tb[k]]; if (it) for (var c in t) t[c] += +it[c] || 0; }
    t.svHoiChieu = Math.min(60, t.svHoiChieu);
    return t;
  };
  SV.mac = function (petId, itemId) {
    var it = P.ITEMS[itemId];
    if (!du().co[petId]) return { ok: false, why: "Chưa có sủng vật này." };
    if (!SV.macDuoc(petId, it)) return { ok: false, why: "Món này không mặc cho " + (SV.DS[petId] ? SV.DS[petId].ten : "sủng vật") + " được." };
    if (!P.Inventory.has(itemId)) return { ok: false, why: "Trong túi không có " + it.name + "." };
    var tb = tbCua(petId), cu = tb[it.svSlot];
    P.Inventory.remove(itemId, 1);
    if (cu) P.Inventory.add(cu, 1);
    tb[it.svSlot] = itemId;
    luu();
    return { ok: true };
  };
  SV.thao = function (petId, slot) {
    var tb = tbCua(petId), cu = tb[slot];
    if (!cu) return { ok: false, why: "Ô đang trống." };
    var I = P.Inventory;
    if (!I.has(cu) && I.usedSlots && I.capacity && I.usedSlots() >= I.capacity()) return { ok: false, why: "Túi đồ đã đầy." };
    P.Inventory.add(cu, 1); tb[slot] = null; luu();
    return { ok: true };
  };
  SV.nhipDanh = function (id) { var d = SV.DS[id]; return d.nhipDanh / (1 + SV.chiSoTb(id).svTocDanh / 100); };
  SV.hoiChieu = function (id) { var d = SV.DS[id]; return d.kyNang.hoi * (1 - SV.chiSoTb(id).svHoiChieu / 100); };
  SV.satThuong = function (id, p) {
    var d = SV.DS[id], s = du().co[id]; if (!d || !s) return 0;
    return Math.max(1, Math.round(don(p || pl()) * (d.donGoc + d.donMoiCap * (s.lv || 1)) * (1 + SV.chiSoTb(id).svCong / 100)));
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
    a = anh[src] = new Image(); a.src = src + "?v=2";
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
    // đang đánh: chờ hết hoạt ảnh
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
      if (kc > d.tamBan) {
        // tiến tới chỗ cách mục tiêu ~80% tầm bắn, trên đường thẳng từ mục tiêu về phía mình
        var vx = pet.x - m.x, vy = pet.y - m.y, vl = Math.hypot(vx, vy) || 1;
        diToi(m.x + vx / vl * d.tamBan * 0.8, m.y + vy / vl * d.tamBan * 0.8, CH.TOC * 1.4, dt); pet.tt = "di";
      }
      else {
        pet.dir = huong(m.x - pet.x, m.y - pet.y);
        if (pet.cdKN <= 0) {
          pet.cdKN = SV.hoiChieu(pet.id); pet.cdDanh = SV.nhipDanh(pet.id);
          pet.dangDanh = { muc: m, t: 0, luc: 0.28, dai: 0.6, kn: true };
          pet.tt = "danh";
          hienKyNang(d);
        } else if (pet.cdDanh <= 0) {
          pet.cdDanh = SV.nhipDanh(pet.id);
          pet.dangDanh = { muc: m, t: 0, luc: 0.18, dai: 0.45 };
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
  function nong(d) { var o = d.nongSung[pet.dir & 3]; return { x: pet.x + o[0], y: pet.y + o[1] }; }
  function vetDan(x0, y0, x1, y1, dam) { (pet.tia || (pet.tia = [])).push({ x0: x0, y0: y0, x1: x1, y1: y1, t: 0, dam: !!dam }); }
  function ra(dd) {
    var m = dd.muc, d = SV.DS[pet.id], p = pl();
    if (!m || m.dead || !p) return;
    var w = W(), dmg = SV.satThuong(pet.id, p), n0 = nong(d);
    if (P.Audio && P.Audio.play) { try { P.Audio.play(dd.kn ? "hit_big" : "hit", { rate: dd.kn ? 0.8 : 1.3, gain: 0.7 }); } catch (e) {} }
    if (dd.kn) {
      // hình quạt trước nòng
      var k = d.kyNang, huong0 = Math.atan2(m.y - 14 - n0.y, m.x - n0.x), nua = k.goc * Math.PI / 180;
      var ds = (w.enemies || []).filter(function (e) {
        if (!danhDuoc(e)) return false;
        var dx = e.x - pet.x, dy = e.y - pet.y, kc = Math.hypot(dx, dy);
        if (kc > k.tam) return false;
        var lech = Math.abs(((Math.atan2(dy, dx) - huong0 + Math.PI * 3) % (Math.PI * 2)) - Math.PI);
        return lech <= nua || kc < 24;
      });
      for (var i = -3; i <= 3; i++) {
        var g = huong0 + i * nua / 3 + (Math.random() - 0.5) * 0.08, xa = k.tam * (0.75 + Math.random() * 0.25);
        vetDan(n0.x, n0.y, n0.x + Math.cos(g) * xa, n0.y + Math.sin(g) * xa, true);
      }
      if (P.VFX && P.VFX.spawnFireBurst) P.VFX.spawnFireBurst(n0.x + Math.cos(huong0) * 10, n0.y + Math.sin(huong0) * 10, { core: "#fff8d0", mid: "#ffd25a", edge: "#ff8a2a", glow: "#fff0a0" });
      if (P.Camera && P.Camera.shake) P.Camera.shake(1.6, 0.12);
      ds.forEach(function (e) {
        e.stunT = Math.max(e.stunT || 0, k.choang);
        if (P.VFX && P.VFX.spawnHitSpark) P.VFX.spawnHitSpark(e.x, e.y - 14);
        if (w.ntDanhQuai) w.ntDanhQuai(e, Math.round(dmg * k.heSo));
      });
    } else {
      vetDan(n0.x, n0.y, m.x, m.y - 14, false);
      if (P.VFX && P.VFX.spawnHitSpark) P.VFX.spawnHitSpark(m.x, m.y - 14);
      if (w.ntDanhQuai) w.ntDanhQuai(m, dmg);
    }
  }
  function veTia(ctx, camX, camY) {
    if (!pet || !pet.tia || !pet.tia.length) return;
    ctx.save(); ctx.lineCap = "round";
    for (var i = pet.tia.length - 1; i >= 0; i--) {
      var v = pet.tia[i]; v.t += 1 / 60;
      var song = v.dam ? 0.16 : 0.1;
      if (v.t > song) { pet.tia.splice(i, 1); continue; }
      var a = 1 - v.t / song;
      ctx.globalAlpha = a;
      ctx.strokeStyle = v.dam ? "#ffd25a" : "#fff3b0"; ctx.lineWidth = v.dam ? 1.6 : 1.2;
      ctx.beginPath(); ctx.moveTo(v.x0 - camX, v.y0 - camY); ctx.lineTo(v.x1 - camX, v.y1 - camY); ctx.stroke();
    }
    ctx.restore();
  }

  /* ---------------- vẽ ---------------- */
  SV.khung = function (d, tt, t, dir) {
    var h = (dir | 0) & 3, soDi = d.soDi ? d.soDi[h] : d.di[1], soDanh = d.soDanh ? d.soDanh[h] : d.danh[1];
    if (tt === "di") return d.di[0] + Math.floor(t * d.fpsDi) % soDi;
    if (tt === "danh") return d.danh[0] + Math.min(soDanh - 1, Math.floor(t * soDanh));
    if (tt === "nghi") {   // ngồi xuống dần rồi lặp hai khung cuối (ngủ gật)
      var n = d.nghi[1], k = Math.floor(t * 0.9);
      return d.nghi[0] + (k < n - 1 ? k : n - 2 + (Math.floor(t * 0.6) % 2));
    }
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
    SV.veKhung(ctx, d, SV.khung(d, tt, t, pet.dir), pet.dir, x, y);
    // tên + cấp
    // tên vẽ giống tên người chơi (chữ điểm ảnh FVF Fernando, viền đen), dòng dưới là cấp như dòng cảnh giới
    var s = du().co[pet.id], PX = P.Pixel;
    var dinh = y - Math.round((d.cao || d.ay) * d.tiLe) + 6;   // sát trên chóp nón
    if (PX && PX.text && PX.MAP_FONT) {
      PX.text(ctx, x, dinh - 9, String(d.ten).toLowerCase(), "#f0d27a", "#000000", "700 8.4px " + PX.MAP_FONT, "center");
      PX.text(ctx, x, dinh, "Cấp " + (s ? s.lv : 1), "#cfe0b8", "#000000", "700 7px " + PX.MAP_FONT, "center");
    } else {
      ctx.save(); ctx.font = "bold 9px sans-serif"; ctx.textAlign = "center"; ctx.fillStyle = "#f0d27a";
      ctx.fillText(d.ten + " · " + (s ? s.lv : 1), x, dinh); ctx.restore();
    }
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
        if (pet && list && list.push) list.push({ y: pet.y, fn: function (ctx, camX, camY) { vePet(ctx, camX, camY); veTia(ctx, camX, camY); } });
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
        if (id && pet && def && !def.ntBot) { themExp(id, Math.round(Math.max(2, (def.level || 1) * 2 + (def.isBoss ? 40 : 0)) * (1 + SV.chiSoTb(id).svExp / 100))); }
      } catch (e) {}
      return g.apply(this, arguments);
    };
    Q.addKill.__sv = true;
    return true;
  }

  var lan = 0, hen = setInterval(function () { var a = bocVe(), b = bocExp(); if ((a && b) || ++lan > 200) clearInterval(hen); }, 150);
  layAnh(SV.DS.ga_con.anh); layAnh(SV.DS.ga_con.kyNang.anh);
})(window.PNTT);
