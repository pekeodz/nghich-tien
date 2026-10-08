/* Nghịch Tiên — "người chơi ảo" (bot) khi chơi không có máy chủ.
 *
 *  1. Võ đài: Chấp Sự Đại Hội cho đấu Tán Tu Chiến Bảng và Đại Hội Tu Tiên với bot
 *     → ghi nhận nhiệm vụ giai đoạn 19 (đấu 1 trận Chiến Bảng) và 21 (thắng 1 trận Đại Hội).
 *  2. Đạo hữu ảo: vài bot đi lang thang ở bản đồ, ngồi tu luyện, đánh quái, nói chuyện,
 *     thỉnh thoảng tới mời tỉ thí; chạm vào bot để mời tỉ thí / bắt chuyện / xem thông tin.
 *  3. Tà tu ảo: ở bản đồ hoang thỉnh thoảng có tà tu lao vào đánh; hạ được thì rơi linh thạch.
 *
 * Bot dùng tên, ngoại hình, trang bị từ danh sách Tán Tu Chiến Bảng của tác giả (ChienBang.bot).
 * Khi đánh nhau, bot là một "quái hình người" (Enemy có tuSi) nên mọi chiêu/đòn của người chơi đều trúng.
 * Sức mạnh bot tính theo chính nhân vật: máu ≈ 20 đòn thường của người chơi, sát thương theo
 * Khí Huyết tối đa, tăng/giảm theo chênh lệch cảnh giới. */
(function (P) {
  "use strict";
  var B = P.NTBot = {};
  var CAU_HINH = B.CAU_HINH = {
    DON_DE_HA: 28,            // số đòn thường để hạ bot cùng cảnh giới
    SAT_THUONG_DON: 0.065,    // đòn cận chiến của bot = % Khí Huyết tối đa người chơi
    SAT_THUONG_CHIEU: 1.5,    // hệ số nhân sát thương chiêu (mỗi chiêu có % riêng trong bảng CHIEU)
    HOI_CHIEU: [6.5, 2.8],    // giây giữa hai chiêu: Luyện Khí tầng 1 → Trúc Cơ (giảm dần theo cảnh giới)
    MOI_CANH_GIOI: 0.12,      // mỗi tầng cảnh giới chênh lệch → ±12% sức mạnh
    TRAN_GIAY: 90,            // một trận võ đài tối đa 90 giây
    DAO_HUU_MOI_MAP: 3,       // số đạo hữu ảo mỗi bản đồ
    MOI_TI_THI_PHUT: [3, 6],  // đạo hữu ảo tới mời tỉ thí sau 3–6 phút
    TA_TU_PHUT: [3, 6],       // tà tu xuất hiện sau 3–6 phút ở bản đồ hoang
    TA_TU_TI_LE: 0.45,
    CB_LUOT_NGAY: 10,
    DH_LUOT_NGAY: 1
  };

  /* ================= tiện ích ================= */
  function W() { return P.SceneWorld; }
  function pl() { return W() && W().player; }
  function online() { var g = P.Gateway; return !!(g && g.connected && g.ready); }
  function tg() { return P.Game ? P.Game.time : Date.now() / 1000; }
  function mapId() { var m = W() && W().map; return (m && m.data && m.data.id) || ""; }
  function mapData() { var m = W() && W().map; return m && m.data; }
  function ri(id) { return P.realmIndexById ? P.realmIndexById(id) : 0; }
  function realmAt(i) { var R = P.REALMS || []; i = Math.max(0, Math.min(R.length - 1, i)); return R[i] ? R[i].id : "luyen_khi_1"; }
  function realmName(id) { var r = P.realmById && P.realmById(id); return r ? r.name : id; }
  function caption(t) { if (P.HUD && P.HUD.setCaption) P.HUD.setCaption(t); }
  function hop(tieuDe, noiDung, o) { if (P.HUD && P.HUD.openDialog) P.HUD.openDialog(tieuDe, noiDung, o || {}); }
  function Q() { return P.Quest; }
  function flags() { var q = Q(); if (q && !q.flags) q.flags = {}; return q ? q.flags : {}; }
  function luu() { try { Q() && Q().save && Q().save(); } catch (e) {} }
  function homNay() { return new Date(Date.now() + 252e5).toISOString().slice(0, 10); }
  function rnd(a, b) { return a + Math.random() * (b - a); }
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  function hash(s) { var h = 2166136261; s = String(s); for (var i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619); return h >>> 0; }
  function dist(a, b) { return Math.hypot(a.x - b.x, a.y - b.y); }
  function TM() { return P.TileMap; }
  function diDuoc(x, y) { var t = TM(); return !t || !t.isBlockedPixel || !t.isBlockedPixel(x, y); }
  function thuong(id, n) {
    if (id === "linh_thach") { if (P.Progress && P.Progress.addStones) P.Progress.addStones(n); else if (P.Progress) P.Progress.stones = (P.Progress.stones | 0) + n; }
    else if (P.ITEMS && P.ITEMS[id]) P.Inventory.add(id, n);
  }
  function tenVat(id) { return id === "linh_thach" ? "Linh Thạch" : (P.ITEMS && P.ITEMS[id] ? P.ITEMS[id].name : id); }
  function moTaThuong(ds) { return ds.map(function (x) { return x.n + " " + tenVat(x.id); }).join(", "); }
  function choMap(id, cb, lan) {
    lan = lan || 0;
    var w = W();
    if (w && w.map && w.map.data && w.map.data.id === id && !w.transitioning && w.player) return setTimeout(cb, 350);
    if (lan > 120) return;
    setTimeout(function () { choMap(id, cb, lan + 1); }, 100);
  }

  /* ================= hồ sơ bot ================= */
  B.hoSo = function (ma, realmId) {
    var cb = P.ChienBang && P.ChienBang.bot ? P.ChienBang.bot(((ma % 50) + 50) % 50) : null;
    var ap = cb ? cb.appearance : { name: "Tán Tu", gender: "male", hair: "dao_dong" };
    var eq = (cb && cb.equipment) || {};
    var cfg = Object.assign({}, P.DEFAULT_CHARACTER || {}, ap);
    var vk = eq.vu_khi && P.ITEMS && P.ITEMS[eq.vu_khi];
    cfg.weapon = vk ? eq.vu_khi : "none";
    var ao = eq.ao && P.ITEMS && P.ITEMS[eq.ao];
    if (ao && ao.outfitArt) cfg.outfit = ao.outfitArt;
    cfg.realmId = realmId || (cb && cb.realm) || "luyen_khi_1";
    cfg.name = ap.name;
    return { ma: ma, name: ap.name, realm: cfg.realmId, cfg: cfg, equip: eq };
  };
  function tuSiTuCfg(c) {
    return { gender: c.gender, hair: c.hair, hairColor: c.hairColor, beard: c.beard || "none", outfit: c.outfit, skin: c.skin, shoes: c.shoes || "ink", hat: c.hat || "none", accessory: c.accessory || "none", weapon: c.weapon && c.weapon !== "none" ? c.weapon : "thiet_kiem" };
  }
  B.chiSo = function (realmId, heSo) {
    var p = pl();
    var dmg = (P.Player && P.Player.meleeDamage && p) ? P.Player.meleeDamage(p) : 10;
    var cl = ri(realmId) - ri(P.Progress ? P.Progress.realmId : realmId);
    var f = Math.max(0.6, Math.min(1.8, 1 + CAU_HINH.MOI_CANH_GIOI * cl)) * (heSo || 1);
    var hpMax = (p && p.hpMax) || 100;
    return {
      hp: Math.max(60, Math.round(dmg * CAU_HINH.DON_DE_HA * f)),
      dmg: Math.max(3, Math.round(hpMax * CAU_HINH.SAT_THUONG_DON * f)),
      f: f, hpMax: hpMax,
      speed: Math.round(60 + Math.max(-6, Math.min(10, cl * 2)))
    };
  };

  /* ================= bot chiến đấu (Enemy hình người) ================= */
  var demLoai = 0;
  /* ---------- bộ chiêu của bot ----------
   * Lấy theo bộ chiêu kẻ địch ở màn mở đầu (prologue.js) — dùng đúng hiệu ứng kỹ năng thật.
   * Mỗi chiêu: windup = giây báo trước (vòng dưới đất), lead = giây hiệu ứng bắt đầu trước khi nổ,
   * r = bán kính trúng, dmg = % Khí Huyết tối đa người chơi (nhân CAU_HINH.SAT_THUONG_CHIEU và độ chênh cảnh giới). */
  function V() { return P.VFX || {}; }
  function mauKN(id) { var d = P.Skills && P.Skills.DEFS && P.Skills.DEFS[id]; return d ? d.colors : undefined; }
  function am(id, o) { try { if (P.Audio && P.Audio.play) P.Audio.play(id, o); } catch (e) {} }
  var CHIEU = {
    // —— chiêu cơ bản (Luyện Khí) ——
    hoa_cau: { ten: "Hỏa Cầu Thuật", windup: 0.9, lead: 0.05, r: 40, dmg: 0.07, color: "#ff7a2a",
      hit: function (e, x, y) { V().spawnFireBurst && V().spawnFireBurst(x, y, { core: "#fff3c4", mid: "#ff9a3c", edge: "#d63b1f", glow: "#ffd27a" }); am("hit_big", { gain: 0.6 }); } },
    phong_nhan: { ten: "Phong Nhận", windup: 0.75, lead: 0.05, r: 44, dmg: 0.06, color: "#9ff3b0",
      hit: function (e, x, y) { V().spawnWindBurst && V().spawnWindBurst(x, y, { glow: "#d8ffe0", core: "#f2fff4", mid: "#7fe39a", edge: "#2f9a55" }); } },
    bang_truy: { ten: "Băng Trùy", windup: 0.9, lead: 0.05, r: 40, dmg: 0.065, color: "#a8dcf5",
      hit: function (e, x, y) { V().spawnIceBurst && V().spawnIceBurst(x, y, { glow: "#a8dcf5", core: "#eaf8ff", mid: "#7fc4e8", edge: "#3d7ea6" }); am("weapon_frost_sword", { gain: 0.6 }); } },
    loi_kich: { ten: "Lôi Kích", windup: 0.85, lead: 0.05, r: 38, dmg: 0.07, color: "#9fd0ff",
      hit: function (e, x, y) { V().spawnLightning && V().spawnLightning(x, y); am("thunder", { gain: 0.45 }); } },
    dia_thu: { ten: "Địa Thứ", windup: 1.0, lead: 0.05, r: 46, dmg: 0.072, color: "#d8a060",
      hit: function (e, x, y) { V().spawnEarthSpikes && V().spawnEarthSpikes(x, y, 42, { glow: "#ffd8a0", core: "#e8c08a", mid: "#9a6a3a", edge: "#5a3a1a" }); am("hit_big", { gain: 0.6 }); } },
    // —— Huyết đạo ——
    cuuhuyet: { ten: "Cửu Huyết Kiếm Trận", windup: 1.15, lead: 1, r: 64, dmg: 0.078, color: "#ff4a6a",
      start: function (e, x, y) { V().spawnCuuHuyetTran && V().spawnCuuHuyetTran(x, y, { colors: mauKN("cuu_huyet_kiem_tran"), radius: 64 }); am("weapon_blood_sword"); },
      hit: function (e, x, y) { V().spawnHuyetKiemImpact && V().spawnHuyetKiemImpact(x, y - 16, 0, -1); am("hit_big", { gain: 0.8 }); } },
    liem: { ten: "Huyết Liêm Trảm", windup: 0.95, lead: 0.22, r: 48, dmg: 0.068, color: "#ff3b52",
      start: function (e, x, y) { V().spawnHuyetLiem && V().spawnHuyetLiem(e, { x: x, y: y }, { hitDelay: 0.17 }); },
      hit: function () { am("hit_big", { gain: 0.8 }); } },
    buc: { ten: "Huyết Bức Chưởng", windup: 0.8, lead: 0.34, r: 44, dmg: 0.062, color: "#ff5a4a",
      start: function (e, x, y) { V().spawnHuyetBuc && V().spawnHuyetBuc(e, { x: x, y: y }, { hitDelay: 0.34 }); },
      hit: function () { am("hit_big", { gain: 0.8 }); } },
    // —— Hắc Sát ——
    baoan: { ten: "Ma Bạo Ấn", windup: 0.9, lead: 0.72, r: 66, dmg: 0.08, color: "#c27bff",
      start: function (e, x, y) { V().spawnMaBaoAn && V().spawnMaBaoAn(x, y, { colors: mauKN("ma_bao_an"), radius: 66 }); },
      hit: function (e, x, y) { V().spawnMaBaoAnImpact && V().spawnMaBaoAnImpact(x, y, { colors: mauKN("ma_bao_an"), radius: 66 }); am("hit_big", { gain: 0.8 }); } },
    hon: { ten: "Ma Hồn Phệ", windup: 1.15, lead: 1.05, r: 44, dmg: 0.065, color: "#a85cff",
      start: function (e, x, y) { V().spawnMaHonPhe && V().spawnMaHonPhe(e, { x: x, y: y }, { colors: mauKN("ma_hon_phe"), range: 200, hitDelay: 1.05 }); },
      hit: function () { am("hit_big", { gain: 0.8 }); } },
    anhky: { ten: "Ảnh Ký Phù", windup: 0.95, lead: 0.62, r: 42, dmg: 0.07, color: "#55cfff",
      start: function (e, x, y) { V().spawnAnhKyPhu && V().spawnAnhKyPhu(e.x, e.y - 8, { x: x, y: y }, { duration: 0.56, hitU: 0.9, range: 360, layers: 3 }); },
      hit: function (e, x, y) { V().spawnAnhKyPhuImpact && V().spawnAnhKyPhuImpact(x, y - 16); am("hit_big", { gain: 0.8 }); } },
    // —— Tuyền Cơ ——
    tramma: { ten: "Trảm Ma", windup: 0.85, lead: 0.62, r: 62, dmg: 0.074, color: "#b77dff",
      start: function (e, x, y) { V().spawnTramMa && V().spawnTramMa(x, y); },
      hit: function () { am("hit_big", { gain: 0.8 }); } },
    tienvu: { ten: "Tiên Vũ", windup: 1, lead: 0.44, r: 78, dmg: 0.075, color: "#ffd24a",
      start: function (e, x, y) { V().spawnTienVu && V().spawnTienVu(x, y, { colors: mauKN("tien_vu"), radius: 78 }); },
      hit: function () { am("hit_big", { gain: 0.8 }); } },
    luan: { ten: "Băng Kiếm Luân", windup: 1.25, lead: 1.25, r: 50, dmg: 0.07, color: "#8deaff",
      start: function (e, x, y) { V().spawnBangKiemLuan && V().spawnBangKiemLuan(e.x, e.y, { colors: mauKN("bang_kiem_luan"), radius: 120, aim: Math.atan2(y - e.y, x - e.x), dir: e.dir, targets: [{ x: x, y: y + 18 }] }); },
      hit: function () { am("weapon_frost_sword", { gain: 0.7 }); } },
    // —— Lôi Lâm ——
    loi: { ten: "Loạn Lôi Bạo", windup: 0.95, lead: 0.5, r: 58, dmg: 0.07, color: "#7fd6ff",
      start: function (e, x, y) { V().spawnLoanLoiBao && V().spawnLoanLoiBao(x, y); },
      hit: function (e, x, y) { am("thunder", { gain: 0.5 }); V().spawnLightning && V().spawnLightning(x, y); } },
    thuongvu: { ten: "Hoàng Lôi Thương Vũ", windup: 1.4, lead: 1.05, r: 84, dmg: 0.085, color: "#ffe680",
      start: function (e, x, y) { P.HoangLoiFX && P.HoangLoiFX.spawnThuongVu && P.HoangLoiFX.spawnThuongVu(e, { x: x, y: y }, { hitDelay: 1, radius: 84 }); },
      hit: function () { am("thunder", { gain: 0.55 }); } },
    kimthuong: { ten: "Kim Thương Giáng Thế", windup: 1.45, lead: 1.2, r: 78, dmg: 0.09, color: "#ff9a3a",
      start: function (e, x, y) { V().spawnKimThuongGiangThe && V().spawnKimThuongGiangThe(x, y); },
      hit: function () { am("hit_big", { gain: 0.8 }); if (P.Camera && P.Camera.shake) P.Camera.shake(3, 0.2); } }
  };
  B.CHIEU = CHIEU;
  var CO_BAN = ["hoa_cau", "phong_nhan", "bang_truy", "loi_kich", "dia_thu"];
  var PHAI = { huyet: ["liem", "buc", "cuuhuyet"], hacsat: ["anhky", "hon", "baoan"], tuyen: ["tramma", "luan", "tienvu"], lam: ["loi", "thuongvu", "kimthuong"] };
  var TEN_PHAI = { huyet: "Huyết đạo", hacsat: "Hắc Sát", tuyen: "Tuyền Cơ", lam: "Lôi Lâm" };
  // số chiêu theo cảnh giới: LK1-3: 1 · LK4-6: 2 · LK7-9: 2 (1 chiêu môn phái) · LK10-13: 3 · Trúc Cơ: 4
  function boChieu(hs) {
    var h = hash(hs.name + "|" + hs.ma), k = ri(hs.realm);
    var phai = ["huyet", "hacsat", "tuyen", "lam"][h % 4], cb = CO_BAN[(h >>> 3) % CO_BAN.length], cb2 = CO_BAN[((h >>> 3) + 2) % CO_BAN.length];
    var ds = [cb];
    if (k >= 4 && k <= 6) ds.push(cb2);
    if (k >= 7) ds.push(PHAI[phai][0]);
    if (k >= 10) ds.push(PHAI[phai][1]);
    if (k >= 14) ds.push(PHAI[phai][2]);
    return { phai: phai, ds: ds };
  }
  B.boChieu = boChieu;
  B.moTaChieu = function (hs) {
    var b = boChieu(hs);
    return (ri(hs.realm) >= 7 ? TEN_PHAI[b.phai] + ": " : "") + b.ds.map(function (id) { return CHIEU[id].ten; }).join(", ");
  };
  var daMoi = false;
  function moiHieuUng() {   // nạp sẵn ảnh hiệu ứng nặng một lần
    if (daMoi) return; daMoi = true;
    try {
      ["NguyetQuangFX", "ThanChuongFX", "KimKiemFX", "HuyetBucFX", "HuyetLiemFX", "HoangLoiFX", "TuTuongBanFX"].forEach(function (k) { if (P[k] && P[k].prime) { try { P[k].prime(); } catch (e) {} } });
      if (V().primeMaHonPhe) V().primeMaHonPhe();
      if (V().HEAVY && P.Assets && P.Assets.loadFx) ["ma_bao_an", "tram_ma", "tien_vu", "bang_kiem_luan"].forEach(function (k) { if (V().HEAVY[k]) P.Assets.loadFx(V().HEAVY[k]); });
    } catch (e) {}
  }
  B.taoChienBot = function (hs, x, y, opt) {
    opt = opt || {};
    var cs = B.chiSo(hs.realm, opt.heSo);
    var type = "nt_bot_" + (++demLoai);
    var goc = (P.ENEMY_DEFS && P.ENEMY_DEFS.hac_phong_ta_tu) || {};
    var lunge = P.ENEMY_DEFS && P.ENEMY_DEFS.yl_tuan_ve && P.ENEMY_DEFS.yl_tuan_ve.pounce;
    var taTu = opt.kieu === "tatu";
    var def = Object.assign({}, goc, {
      name: (taTu ? "Tà Tu · " : "") + hs.name + " · " + realmName(hs.realm),
      level: Math.max(1, ri(hs.realm)),
      tuSi: tuSiTuCfg(hs.cfg),
      hp: cs.hp, exp: taTu ? Math.round(20 + ri(hs.realm) * 4) : 0, stones: 0,
      speed: cs.speed, aggro: taTu ? 280 : 1200, leashRange: taTu ? 760 : 5000,
      contactDmg: cs.dmg, hitCooldown: 0.85, hitRadius: 26, bodyRadius: 10,
      wanderRadius: 40, wanderPause: 1.2, respawnSec: 0, khongNhan: true, human: false, isBoss: false,
      ntBot: { kieu: opt.kieu || "tithi", f: cs.f, bo: boChieu(hs) }
    });
    if (lunge) def.pounce = lunge; else delete def.pounce;
    P.ENEMY_DEFS[type] = def;
    var e = P.Enemy.create({ id: type, type: type, x: x, y: y });
    e.ntBot = def.ntBot;
    e.ntHs = hs;
    e.ntCast = tg() + rnd(2, 3.5);
    moiHieuUng();
    e.aggroUntil = tg() + 999;
    W().enemies.push(e);
    if (P.VFX && P.VFX.spawnRing) P.VFX.spawnRing(x, y - 10, "#e9d5ff", 26, 0.5);
    return e;
  };
  function goChienBot(e) {
    if (!e) return;
    e.dead = true; e.respawnAt = Infinity;
    var ds = W() && W().enemies; if (!ds) return;
    var i = ds.indexOf(e); if (i >= 0) ds.splice(i, 1);
  }

  // chiêu: vòng báo dưới chân người chơi bám theo nửa đầu thời gian báo, sau đó đứng yên → chạy ra là né được
  var tele = [];
  B._tele = tele;
  function nhipChieu() {
    var w = W(), p = pl(); if (!w || !p || !w.enemies) return;
    var t = tg(), dt = Math.min(0.1, Math.max(0, t - (nhipChieu.truoc || t))); nhipChieu.truoc = t;
    for (var i = 0; i < w.enemies.length; i++) {
      var e = w.enemies[i];
      if (!e.ntBot || e.dead || p.downed) continue;
      if (e.ntBot.kieu !== "tatu" && !(tran && tran.bot === e && tran.dangDau)) continue;
      if (dist(e, p) > 320 || t < e.ntCast || e.ntDangNiem > t) continue;
      var bo = e.ntBot.bo, id = bo.ds[Math.floor(Math.random() * bo.ds.length)], c = CHIEU[id];
      var k = ri(e.ntHs && e.ntHs.realm), hc = CAU_HINH.HOI_CHIEU, cd = Math.max(hc[1], hc[0] - (hc[0] - hc[1]) * Math.min(1, k / 15));
      e.ntCast = t + c.windup + cd * rnd(0.8, 1.2);
      e.ntDangNiem = t + c.windup;
      if (P.VFX && P.VFX.spawnText) P.VFX.spawnText(e.x, e.y - 62, c.ten, c.color);
      if (P.VFX && P.VFX.spawnRing) P.VFX.spawnRing(e.x, e.y - 12, c.color, 22, 0.45);
      am("whisper", { gain: 0.5 });
      tele.push({ e: e, c: c, x: p.x, y: p.y, t: 0, dur: c.windup, lead: Math.min(c.lead, c.windup), khoa: 0.5 * c.windup, batDau: false,
                  dmg: Math.round((p.hpMax || 100) * c.dmg * CAU_HINH.SAT_THUONG_CHIEU * (e.ntBot.f || 1)) });
    }
    for (var n = tele.length - 1; n >= 0; n--) {
      var o = tele[n];
      if (o.e.dead) { tele.splice(n, 1); continue; }
      o.t += dt;
      if (o.t < o.khoa) { var q = Math.min(1, 5 * dt); o.x += (p.x - o.x) * q; o.y += (p.y - o.y) * q; }
      if (!o.batDau && o.t >= o.dur - o.lead) { o.batDau = true; try { o.c.start && o.c.start(o.e, o.x, o.y); } catch (er) {} }
      if (o.t < o.dur) continue;
      tele.splice(n, 1);
      try { o.c.hit && o.c.hit(o.e, o.x, o.y); } catch (er) {}
      var rx = o.c.r, ry = 0.55 * o.c.r;
      if (!p.downed && Math.pow((p.x - o.x) / rx, 2) + Math.pow((p.y - o.y) / ry, 2) <= 1) {
        p.hurtTimer = 0;   // chiêu không bị chặn bởi thời gian miễn thương sau đòn thường
        P.Player.takeDamage(p, o.dmg, { fromX: o.x, fromY: o.y, kb: 50 });
      }
    }
  }
  // vẽ vòng báo chiêu (lớp dưới nhân vật)
  function veTele(ctx, camX, camY) {
    if (!tele.length) return;
    var now = tg();
    for (var i = 0; i < tele.length; i++) {
      var o = tele[i], k = Math.min(1, o.t / o.dur), rx = o.c.r, ry = 0.55 * rx;
      ctx.save();
      ctx.translate(Math.round(o.x - camX), Math.round(o.y - camY));
      ctx.globalAlpha = 0.1 + 0.22 * k; ctx.fillStyle = o.c.color;
      ctx.beginPath(); ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = 0.85; ctx.strokeStyle = o.c.color; ctx.lineWidth = 1.6;
      ctx.setLineDash([5, 4]); ctx.lineDashOffset = -18 * now;
      ctx.beginPath(); ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]);
      ctx.globalAlpha = 0.95; ctx.strokeStyle = "#ffffff"; ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.ellipse(0, 0, rx * (1 - k), ry * (1 - k), 0, 0, Math.PI * 2); ctx.stroke();
      ctx.restore();
    }
  }
  function ganVeTele() {
    var X = P.VFX; if (!X || !X.draw || X.draw.__ntTele) return;
    var g = X.draw;
    X.draw = function (ctx, camX, camY, lop) { if (lop === "back") { try { veTele(ctx, camX, camY); } catch (e) {} } return g.apply(this, arguments); };
    X.draw.__ntTele = true;
  }
  /* ================= trận đấu (tỉ thí, võ đài) ================= */
  var tran = null;
  B.dangDau = function () { return !!tran; };
  /* opt: { hs, kieu, heSo, map, ve, tieuDe, onKetThuc(thang, lyDo) } */
  B.batDauTran = function (opt) {
    if (tran) return;
    var p = pl(); if (!p) return;
    tran = { opt: opt, bot: null, dangDau: false, ketThuc: false, map: opt.map || mapId() };
    function dungBot() {
      var p2 = pl(); if (!p2 || !tran) return;
      var bx, by;
      if (opt.map) {
        var md = mapData(), T = (P.CONFIG && P.CONFIG.TILE) || 32;
        var cx = (md.width || 16) * T / 2, cy = (md.height || 12) * T / 2;
        p2.x = cx - 4 * T; p2.y = cy + T; if (p2.stop) p2.stop();
        if (P.Camera && P.Camera.snapTo && P.Renderer) P.Camera.snapTo(p2.x, p2.y, P.Renderer.w, P.Renderer.h, W().map.pxWidth, W().map.pxHeight);
        bx = cx + 4 * T; by = cy + T;
        p2.hp = p2.hpMax; p2.mp = p2.mpMax; if (p2.bpMax) p2.bp = p2.bpMax;
      } else {
        bx = opt.x != null ? opt.x : p2.x + 90; by = opt.y != null ? opt.y : p2.y;
      }
      var dem = 3;
      caption((opt.tieuDe || "Tỉ thí") + " · " + opt.hs.name + " (" + realmName(opt.hs.realm) + ")\nTrận đấu bắt đầu sau " + dem + "…");
      var iv = setInterval(function () {
        if (!tran) return clearInterval(iv);
        dem--;
        if (dem > 0) { caption("Trận đấu bắt đầu sau " + dem + "…"); return; }
        clearInterval(iv);
        caption("Khai chiến!");
        if (P.Audio && P.Audio.play) P.Audio.play("duel_start");
        tran.bot = B.taoChienBot(opt.hs, bx, by, { kieu: opt.kieu, heSo: opt.heSo });
        tran.batDau = tg();
        tran.dangDau = true;
      }, 1000);
    }
    if (opt.map && mapId() !== opt.map) { W().switchMap(opt.map); choMap(opt.map, dungBot); }
    else dungBot();
  };
  function ketThucTran(thang, lyDo) {
    if (!tran || tran.ketThuc) return;
    tran.ketThuc = true; tran.dangDau = false;
    var t = tran, opt = t.opt, p = pl();
    var bx = t.bot ? t.bot.x : (p ? p.x + 60 : 0), by = t.bot ? t.bot.y : (p ? p.y : 0);
    if (t.bot) {
      if (P.VFX && P.VFX.spawnText) P.VFX.spawnText(t.bot.x, t.bot.y - 56, thang ? "Chịu thua!" : "Đa tạ chỉ giáo!", "#ffe08a");
      goChienBot(t.bot);
    }
    tele.length = 0;
    if (p) { p.hp = Math.max(p.hp, Math.round(p.hpMax * (thang ? 0.5 : 0.3))); }
    if (P.HUD && P.HUD.announce) P.HUD.announce(thang ? "THẮNG" : "THUA");
    if (P.Audio && P.Audio.play) P.Audio.play(thang ? "victory" : "defeat");
    tran = null;
    setTimeout(function () {
      if (p && opt.map) { p.hp = p.hpMax; p.mp = p.mpMax; if (p.bpMax) p.bp = p.bpMax; }
      if (opt.onKetThuc) opt.onKetThuc(thang, lyDo, { x: bx, y: by });
    }, 1200);
  }
  B.veLang = function () {
    if (mapId() === "tan_vien") return;
    W().switchMap("tan_vien");
    choMap("tan_vien", function () {
      var md = mapData(), p = pl(), T = (P.CONFIG && P.CONFIG.TILE) || 32;
      var ds = [].concat(md.interactables || [], md.props || [], md.npcs || []);
      for (var i = 0; i < ds.length; i++) if (ds[i].id === "chap_su_dai_hoi") {
        p.x = (ds[i].tx + 0.5) * T; p.y = (ds[i].ty + 2) * T;
        if (P.Camera && P.Camera.snapTo && P.Renderer) P.Camera.snapTo(p.x, p.y, P.Renderer.w, P.Renderer.h, W().map.pxWidth, W().map.pxHeight);
        break;
      }
    });
  };
  function nhipTran() {
    if (!tran) return;
    var p = pl();
    if (tran.opt.map && mapId() && mapId() !== tran.opt.map && tran.dangDau) return ketThucTran(false, "roi");
    if (!tran.dangDau) return;
    if (!p || p.downed) return ketThucTran(false, "nga");
    if (tran.bot && tran.bot.dead) return ketThucTran(true, "ha");
    if (!tran.opt.map && tran.bot && dist(p, tran.bot) > 520) return ketThucTran(false, "bo_chay");
    var con = CAU_HINH.TRAN_GIAY - (tg() - tran.batDau);
    if (con <= 0) {
      var a = p.hp / p.hpMax, b = tran.bot ? tran.bot.hp / tran.bot.hpMax : 1;
      return ketThucTran(a > b, "het_gio");
    }
  }

  // chặn đòn kết liễu: bot không chết thật mà chịu thua; người chơi không ngã mà thua trận
  function boc() {
    if (P.Enemy && P.Enemy.hit && !P.Enemy.hit.__nt) {
      var hitGoc = P.Enemy.hit;
      P.Enemy.hit = function (e, n, t) {
        if (e && tran && tran.bot === e && tran.dangDau && !e.dead && e.hp - n <= 0) {
          e.hp = 1;
          if (P.VFX && P.VFX.spawnDamage) P.VFX.spawnDamage(e.x, e.y - 20, n, "deal");
          ketThucTran(true, "ha");
          return false;
        }
        return hitGoc.apply(this, arguments);
      };
      P.Enemy.hit.__nt = true;
    }
    if (P.Player && P.Player.takeDamage && !P.Player.takeDamage.__nt) {
      var tdGoc = P.Player.takeDamage;
      P.Player.takeDamage = function (t, n, l) {
        if (tran && tran.dangDau && t && t === pl() && !t.downed && (n || 0) >= t.hp + Math.floor(t.bp || 0) + (t.shieldHp || 0) + (t.hinhGiap || 0)) {
          var r = tdGoc.call(this, t, Math.max(0, t.hp - 1), l);
          ketThucTran(false, "nga");
          return r;
        }
        return tdGoc.apply(this, arguments);
      };
      P.Player.takeDamage.__nt = true;
    }
    if (P.Loot && P.Loot.rollKill && !P.Loot.rollKill.__nt) {
      var rk = P.Loot.rollKill;
      P.Loot.rollKill = function (a) {
        if (a && a.def && a.def.ntBot) return a.def.ntBot.kieu === "tatu" ? roiTaTu(a) : [];
        return rk.apply(this, arguments);
      };
      P.Loot.rollKill.__nt = true;
    }
    if (Q() && Q().addKill && !Q().addKill.__nt) {
      var ak = Q().addKill;
      Q().addKill = function (def) { if (def && def.ntBot) return false; return ak.apply(this, arguments); };
      Q().addKill.__nt = true;
    }
    // chạm vào đạo hữu ảo
    if (P.PhongChoUI && P.PhongChoUI.cham && !P.PhongChoUI.cham.__nt) {
      var ch = P.PhongChoUI.cham;
      P.PhongChoUI.cham = function (r, x, y) { if (chamDaoHuu(x, y)) return true; return ch.apply(this, arguments); };
      P.PhongChoUI.cham.__nt = true;
    }
  }

  /* ================= Chấp Sự Đại Hội: Chiến Bảng & Đại Hội ================= */
  function cb() { var f = flags(); if (!f.ntChienBang) f.ntChienBang = { hang: 0, ngay: "", luot: 0, ngayThuong: "" }; var c = f.ntChienBang; if (c.ngay !== homNay()) { c.ngay = homNay(); c.luot = 0; } return c; }
  function dh() { var f = flags(); if (!f.ntDaiHoi) f.ntDaiHoi = { ngay: "", lan: 0 }; var d = f.ntDaiHoi; if (d.ngay !== homNay()) { d.ngay = homNay(); d.lan = 0; } return d; }
  function thuongTran() {
    var T = P.Tournament && P.Tournament.THUONG_MOI_TRAN;
    var tc = /^truc_co/.test(String(P.Progress && P.Progress.realmId));
    return (T && (tc ? T.truc_co : T.luyen_khi)) || (tc ? 100 : 50);
  }

  B.chapSu = function (npc) {
    var ten = (npc && npc.name) || "Chấp Sự Đại Hội";
    var c = cb(), d = dh();
    var p = P.Progress;
    var du7 = P.realmReached ? P.realmReached(p.realmId, "luyen_khi_7") : true;
    var ch = [];
    ch.push({ label: "Tán Tu Chiến Bảng · khiêu chiến", icon: "sword",
      note: (c.hang ? "Hạng của ngươi: " + c.hang : "Chưa có hạng") + " · còn " + Math.max(0, CAU_HINH.CB_LUOT_NGAY - c.luot) + "/" + CAU_HINH.CB_LUOT_NGAY + " lượt hôm nay",
      disabled: c.luot >= CAU_HINH.CB_LUOT_NGAY, onChoose: chonDoiThuCB });
    ch.push({ label: "Đại Hội Tu Tiên · đấu loại 8 người", icon: "spirit_stone",
      note: !du7 ? "Cần Luyện Khí tầng 7 trở lên" : d.lan >= CAU_HINH.DH_LUOT_NGAY ? "Hôm nay đã dự Đại Hội" : "3 vòng · thắng mỗi trận " + thuongTran() + " Linh Thạch · vô địch thưởng Trúc Cơ Đan",
      disabled: !du7 || d.lan >= CAU_HINH.DH_LUOT_NGAY, onChoose: batDauDaiHoi });
    var ds = thuongHang(c.hang);
    if (c.hang && ds.length) {
      ch.push({ label: "Nhận thưởng giữ hạng hôm nay", note: c.ngayThuong === homNay() ? "Đã nhận hôm nay" : "Hạng " + c.hang + ": " + moTaThuong(ds), disabled: c.ngayThuong === homNay(), onChoose: function () {
        ds.forEach(function (x) { thuong(x.id, x.n); }); c.ngayThuong = homNay(); luu();
        if (P.HUD && P.HUD.refreshBag) P.HUD.refreshBag();
        hop(ten, "Thưởng giữ hạng " + c.hang + " Tán Tu Chiến Bảng:\n" + moTaThuong(ds));
      } });
    }
    hop(ten, '"Đạo hữu tới ghi danh Đại Hội, hay muốn thử sức trên Tán Tu Chiến Bảng?"\n\n(Trận đấu với tán tu do hệ thống điều khiển — chơi không cần máy chủ.)', { choices: ch });
  };
  function thuongHang(h) {
    var C = P.ChienBang; if (!C || !h) return [];
    if (h === 1) return C.PHAN_THUONG || [];
    if (C.PHAN_THUONG_HANG && C.PHAN_THUONG_HANG[h]) return C.PHAN_THUONG_HANG[h];
    return h <= 20 ? [{ id: "linh_thach", n: 50 }] : [];
  }

  function chonDoiThuCB() {
    var c = cb(), C = P.ChienBang, toi = c.hang || 0, so = (C && C.SO_SUAT) || 50, ds = [];
    for (var n = 1; n <= so; n++) if (C && C.danhDuoc ? C.danhDuoc(toi, n) : (toi ? n < toi && toi - n <= 5 : n > so - 5)) ds.push(n);
    var ch = ds.slice(0, 5).map(function (n) {
      var hs = B.hoSo(n - 1);
      return { label: "Hạng " + n + " · " + hs.name, note: realmName(hs.realm) + " · " + B.moTaChieu(hs), onChoose: function () { danhCB(n, hs); } };
    });
    if (!ch.length) return hop("Tán Tu Chiến Bảng", "Ngươi đã đứng đầu bảng — không còn ai để khiêu chiến.");
    hop("Tán Tu Chiến Bảng", "Chọn đối thủ trên bảng rồi vào Chiến Bảng Đài.\nThắng người hạng cao hơn thì đổi hạng với họ.", { choices: ch });
  }
  function danhCB(n, hs) {
    var c = cb(); c.luot++; luu();
    B.batDauTran({ hs: hs, kieu: "chienbang", map: "chien_bang_dai", tieuDe: "Tán Tu Chiến Bảng · hạng " + n, onKetThuc: function (thang) {
      var q = Q(); var ghi = q && q.recordChienBangMatch && q.recordChienBangMatch();
      var msg;
      if (thang) {
        var tt = (P.ChienBang && P.ChienBang.THUONG_THANG) || [{ id: "linh_thach", n: 50 }];
        tt.forEach(function (x) { thuong(x.id, x.n); });
        var cu = c.hang;
        if (!c.hang || n < c.hang) c.hang = n;
        msg = "Thắng " + hs.name + "! " + (c.hang !== cu ? "Lên hạng " + c.hang + "." : "Giữ hạng " + c.hang + ".") + "\nThưởng: " + moTaThuong(tt);
      } else msg = "Thua " + hs.name + ". Luyện thêm rồi quay lại.";
      if (ghi) msg += "\n\n✔ Nhiệm vụ: đã đấu 1 trận Tán Tu Chiến Bảng.";
      luu(); if (P.HUD && P.HUD.refreshBag) P.HUD.refreshBag(); if (W().refreshQuest) W().refreshQuest();
      B.veLang();
      choMap("tan_vien", function () { hop("Tán Tu Chiến Bảng", msg); });
    } });
  }

  function batDauDaiHoi() {
    var d = dh(); d.lan++; luu();
    var base = ri(P.Progress.realmId), seed = hash(homNay() + (P.Progress.name || ""));
    var doi = [0, 1, 2].map(function (v) { return B.hoSo((seed + v * 17) % 50, realmAt(base + v - 1)); });
    var vong = ["Vòng Tứ Kết", "Bán Kết", "Chung Kết"];
    var daThang = 0;
    function danh(v) {
      B.batDauTran({ hs: doi[v], kieu: "daihoi", map: "dai_hoi_dau", heSo: 1 + v * 0.05, tieuDe: "Đại Hội Tu Tiên · " + vong[v], onKetThuc: function (thang) {
        var ghiNv = "";
        if (thang) {
          daThang++;
          thuong("linh_thach", thuongTran());
          var q = Q();
          if (q && q.recordDaiHoiWin && q.recordDaiHoiWin()) ghiNv += "\n✔ Nhiệm vụ: thắng 1 trận Đại Hội.";
          if (q && q.recordDaiHoiSeedWin && q.recordDaiHoiSeedWin()) ghiNv += "\n✔ Việc Dược Công: Thắng Trận Đại Hội.";
          if (W().refreshQuest) W().refreshQuest();
        }
        luu(); if (P.HUD && P.HUD.refreshBag) P.HUD.refreshBag();
        if (thang && v < 2) {
          return hop("Đại Hội Tu Tiên", "Thắng " + vong[v] + "! +" + thuongTran() + " Linh Thạch." + ghiNv + "\n\nNghỉ một lát rồi vào " + vong[v + 1] + " gặp " + doi[v + 1].name + " (" + realmName(doi[v + 1].realm) + ").",
            { choices: [{ label: "Vào " + vong[v + 1], onChoose: function () { danh(v + 1); } }, { label: "Bỏ cuộc, về làng", onChoose: function () { ketDaiHoi(daThang, ghiNv); } }] });
        }
        ketDaiHoi(daThang, ghiNv);
      } });
    }
    hop("Đại Hội Tu Tiên", "Đã ghi danh. Tám người bốc thăm, đấu loại trực tiếp ba vòng.\n\nTứ kết gặp " + doi[0].name + " (" + realmName(doi[0].realm) + ").", { choices: [{ label: "Lên Đài Luận Võ", onChoose: function () { danh(0); } }] });
  }
  function ketDaiHoi(daThang, ghiNv) {
    var thuongThem = [], hang;
    if (daThang >= 3) { hang = "Vô địch"; thuongThem.push({ id: "truc_co_dan", n: (P.Tournament && P.Tournament.THUONG_DAN) || 1 }); }
    else if (daThang === 2) { hang = "Hạng nhì"; thuongThem.push({ id: "manh_yeu_dan_cap_3", n: 1 }); }
    else if (daThang === 1) { hang = "Top 4"; thuongThem.push({ id: "manh_yeu_dan_cap_3", n: 1 }); }
    else hang = "Dừng ở tứ kết";
    thuongThem.forEach(function (x) { thuong(x.id, x.n); });
    luu(); if (P.HUD && P.HUD.refreshBag) P.HUD.refreshBag();
    B.veLang();
    choMap("tan_vien", function () {
      hop("Đại Hội Tu Tiên", "Kết quả: " + hang + " · thắng " + daThang + " trận (+" + daThang * thuongTran() + " Linh Thạch)." + (thuongThem.length ? "\nThưởng thêm: " + moTaThuong(thuongThem) : "") + (ghiNv || ""));
    });
  }

  /* ================= đạo hữu ảo (đi lang thang) ================= */
  var daoHuu = [];   // { id, hs, r, st, until, tx, ty, muc, dmg, swing, noi }
  var mapDH = "";
  var hanMoi = 0;
  var CAU_NOI = ["Hôm nay linh khí dồi dào thật.", "Đạo hữu tu luyện tới tầng nào rồi?", "Quái ở đây rơi Linh Thạch khá đấy.", "Tối nay ta đi Huyết Xích, có ai đi cùng?", "Thiếu một viên Trúc Cơ Đan nữa thôi…",
    "Đan Lô trong làng luyện đan nhanh lắm.", "Ai bán Huyền Thiết Khoáng không?", "Hây da!", "Đi đâu cũng gặp Xích Nhãn Ngưu…", "Nghe nói Long Uyên có rồng xuất hiện.", "Tĩnh tâm, tĩnh tâm…", "Đại Hội năm nay ai vô địch nhỉ?"];
  var CAU_CHAO = ["Đạo hữu khỏe!", "Chào đạo hữu.", "Hữu duyên gặp mặt!"];
  function mapDuocTha() {
    var md = mapData(); if (!md) return false;
    if (md.huyetSac || md.scope === "match" || md.scope === "party") return false;
    if (P.DoSat && P.DoSat.safeMap && P.DoSat.safeMap(md.id) && md.id !== "tan_vien") return false;
    return true;
  }
  function viTriNgauNhien(gan, banKinh) {
    var md = mapData(), T = (P.CONFIG && P.CONFIG.TILE) || 32;
    for (var k = 0; k < 60; k++) {
      var x, y;
      if (gan) { x = gan.x + rnd(-banKinh, banKinh); y = gan.y + rnd(-banKinh, banKinh); }
      else { x = rnd(2, (md.width || 20) - 2) * T; y = rnd(2, (md.height || 20) - 2) * T; }
      if (diDuoc(x, y) && diDuoc(x - 8, y) && diDuoc(x + 8, y)) return { x: x, y: y };
    }
    return null;
  }
  function xoaDaoHuu() {
    var G = P.Gateway;
    daoHuu.forEach(function (b) { if (G && G.remotes) delete G.remotes[b.id]; if (P.Chat && P.Chat.bubbles) delete P.Chat.bubbles[b.id]; });
    daoHuu = [];
  }
  function datRemote(b, state) {
    var G = P.Gateway; if (!G) return;
    if (!G.remotes[b.id]) {
      b.r = G.remotes[b.id] = P.RemotePlayer.create(b.id, { name: b.hs.name, realm: b.hs.realm, cfg: b.hs.cfg });
      b.r.ntBot = true;
    }
    P.RemotePlayer.setTarget(b.r, { x: b.x, y: b.y, dir: b.dir | 0, state: state || "idle", hp: 100 });
  }
  function noi(b, cau) { if (P.Chat && P.Chat.bubble) P.Chat.bubble(b.id, cau); }
  function sinhDaoHuu() {
    xoaDaoHuu();
    mapDH = mapId();
    if (!mapDuocTha() || online()) return;
    var base = ri(P.Progress.realmId), seed = hash(mapDH + homNay());
    for (var i = 0; i < CAU_HINH.DAO_HUU_MOI_MAP; i++) {
      var vt = viTriNgauNhien(null); if (!vt) continue;
      var ma = (seed + i * 7) % 50;
      var hs = B.hoSo(ma, realmAt(Math.max(ri("luyen_khi_1"), base + ((seed >> (i * 3)) % 5) - 2)));
      var b = { id: "bot:" + mapDH + ":" + i, hs: hs, x: vt.x, y: vt.y, dir: 0, st: "idle", until: tg() + rnd(1, 4), noi: tg() + rnd(8, 30) };
      daoHuu.push(b);
      datRemote(b, "idle");
    }
    hanMoi = tg() + 60 * rnd(CAU_HINH.MOI_TI_THI_PHUT[0], CAU_HINH.MOI_TI_THI_PHUT[1]);
  }
  function huong(dx, dy) { return Math.abs(dx) > Math.abs(dy) ? (dx < 0 ? 1 : 2) : (dy < 0 ? 3 : 0); }
  function nhipDaoHuu(dt) {
    if (online()) { if (daoHuu.length) xoaDaoHuu(); return; }
    if (mapId() !== mapDH) sinhDaoHuu();
    var w = W(), p = pl(), t = tg();
    if (!w || !p) return;
    daoHuu.forEach(function (b) {
      if (b.anTrongTran) return;
      // đổi việc
      if (t >= b.until && b.st !== "di" && b.st !== "danh" && b.st !== "toi") {
        var r = Math.random();
        if (r < 0.45) { var vt = viTriNgauNhien(b, 220); if (vt) { b.st = "di"; b.tx = vt.x; b.ty = vt.y; b.until = t + 12; } }
        else if (r < 0.62) { b.st = "ngoi"; b.until = t + rnd(8, 18); }
        else if (r < 0.85) {
          var muc = null, best = 240;
          (w.enemies || []).forEach(function (e) { if (!e.dead && !e.ntBot && !(e.def && e.def.isBoss) && !(e.def && e.def.human)) { var d = dist(b, e); if (d < best) { best = d; muc = e; } } });
          if (muc) { b.st = "danh"; b.muc = muc; b.until = t + 25; b.swing = t; } else { b.st = "dung"; b.until = t + rnd(2, 5); }
        } else { b.st = "dung"; b.until = t + rnd(2, 5); }
      }
      var state = "idle";
      if (b.st === "di" || b.st === "toi" || b.st === "danh") {
        var tx = b.tx, ty = b.ty;
        if (b.st === "danh") { if (!b.muc || b.muc.dead || t > b.until) { b.st = "dung"; b.until = t + 2; b.muc = null; } else { tx = b.muc.x + (b.x < b.muc.x ? -22 : 22); ty = b.muc.y; } }
        if (b.st === "toi") { tx = p.x + (b.x < p.x ? -40 : 40); ty = p.y; }
        if (b.st !== "dung") {
          var dx = tx - b.x, dy = ty - b.y, d = Math.hypot(dx, dy);
          if (d > 4) {
            var bs = Math.min(d, 54 * dt), nx = b.x + dx / d * bs, ny = b.y + dy / d * bs;
            if (diDuoc(nx, ny)) { b.x = nx; b.y = ny; b.dir = huong(dx, dy); state = "walk"; }
            else if (b.st === "di") { b.st = "dung"; b.until = t + 1; }
            else if (diDuoc(nx, b.y)) { b.x = nx; state = "walk"; } else if (diDuoc(b.x, ny)) { b.y = ny; state = "walk"; }
          } else if (b.st === "di") { b.st = "dung"; b.until = t + rnd(1.5, 4); }
          if (b.st === "toi" && dist(b, p) < 60) { b.st = "dung"; b.until = t + 30; moiTiThi(b); }
          if (b.st === "danh" && b.muc && dist(b, b.muc) < 32) {
            b.dir = huong(b.muc.x - b.x, b.muc.y - b.y);
            state = (t - b.swing) % 0.9 < 0.35 ? "attack" : "idle";
            if (t - b.swing >= 0.9) {
              b.swing = t;
              var dmg = Math.max(1, Math.round((b.muc.hpMax || 50) * rnd(0.07, 0.12)));
              var chet = P.Enemy.hit(b.muc, dmg, t);
              if (P.VFX && P.VFX.spawnDamage) P.VFX.spawnDamage(b.muc.x, b.muc.y - 20, dmg, "deal");
              if (P.Enemy.flinch) P.Enemy.flinch(b.muc, t, b.x, b.y);
              if (chet) { if (w.showKillFx) w.showKillFx(b.muc); b.muc = null; b.st = "dung"; b.until = t + rnd(2, 4); if (Math.random() < 0.3) noi(b, pick(["Hạ rồi!", "Dễ ợt.", "Thêm một con."])); }
            }
          }
        }
      } else if (b.st === "ngoi") state = "sit";
      // nói chuyện
      if (t >= b.noi) { b.noi = t + rnd(25, 70); if (Math.random() < 0.45) noi(b, dist(b, p) < 120 && Math.random() < 0.5 ? pick(CAU_CHAO) : pick(CAU_NOI)); }
      datRemote(b, state);
    });
    // thỉnh thoảng một đạo hữu tới mời tỉ thí
    if (daoHuu.length && t >= hanMoi && !tran && !p.downed && !(P.HUD && P.HUD.dialogOpen)) {
      hanMoi = t + 60 * rnd(CAU_HINH.MOI_TI_THI_PHUT[0], CAU_HINH.MOI_TI_THI_PHUT[1]);
      var gan = daoHuu.filter(function (b) { return !b.anTrongTran && dist(b, p) < 700; });
      if (gan.length) { var b = pick(gan); b.st = "toi"; b.until = t + 20; noi(b, "Đạo hữu! Đợi ta một chút!"); }
    }
  }
  function moiTiThi(b) {
    noi(b, "Tỉ thí một trận chứ?");
    hop(b.hs.name + " · " + realmName(b.hs.realm), '"Thấy đạo hữu khí tức bất phàm — có dám tỉ thí một trận?"\n\n(Thua không mất gì; thắng được 20 Linh Thạch.)', {
      choices: [{ label: "Nhận lời tỉ thí", onChoose: function () { tiThi(b); } }, { label: "Từ chối", onChoose: function () { noi(b, "Tiếc thật, lần sau vậy."); } }]
    });
  }
  function tiThi(b) {
    if (tran) return;
    b.anTrongTran = true;
    var G = P.Gateway; if (G && G.remotes) delete G.remotes[b.id];
    b.r = null;
    B.batDauTran({ hs: b.hs, kieu: "tithi", x: b.x, y: b.y, tieuDe: "Tỉ thí", onKetThuc: function (thang, lyDo, vt) {
      b.anTrongTran = false;
      if (vt) { b.x = vt.x; b.y = vt.y; }
      if (mapId() === mapDH) datRemote(b, "idle");
      if (thang) { thuong("linh_thach", 20); luu(); }
      setTimeout(function () { noi(b, thang ? pick(["Đạo hữu lợi hại!", "Ta thua tâm phục khẩu phục."]) : pick(["Nhường rồi!", "Luyện thêm đi nhé."])); }, 300);
      caption(thang ? "Thắng tỉ thí với " + b.hs.name + " · +20 Linh Thạch" : lyDo === "bo_chay" ? "Đã rời xa — trận tỉ thí kết thúc." : "Thua tỉ thí với " + b.hs.name + ".");
    } });
  }
  function chamDaoHuu(x, y) {
    if (online() || tran) return false;
    for (var i = 0; i < daoHuu.length; i++) {
      var b = daoHuu[i];
      if (b.anTrongTran) continue;
      if (Math.abs(x - b.x) <= 16 && y <= b.y + 6 && y >= b.y - 60) { menuDaoHuu(b); return true; }
    }
    return false;
  }
  /* Mở đúng bảng "Xem Thông Tin" của game (InspectUI) với dữ liệu của bot */
  B.xemThongTin = function (hs) {
    var eqGoc = hs.equip || {}, equipment = {}, bonus = { atkBonus: 0, hpBonus: 0, mpBonus: 0, spBonus: 0, bpBonus: 0, resist: 0 }, vuKhi = null;
    Object.keys(eqGoc).forEach(function (k) {
      var id = eqGoc[k], it = id && P.ITEMS && P.ITEMS[id];
      if (!it) return;
      var o = it.slot || k;
      if (equipment[o]) return;
      equipment[o] = id;
      bonus.atkBonus += it.atkBonus | 0; bonus.hpBonus += it.hpBonus | 0; bonus.mpBonus += it.mpBonus | 0;
      bonus.spBonus += it.spBonus | 0; bonus.bpBonus += it.bpBonus | 0; bonus.resist += +it.resistBonus || 0;
      if (o === "vu_khi") vuKhi = it;
    });
    var r = (P.realmById && P.realmById(hs.realm)) || {};
    var atk = (P.baseAttack ? P.baseAttack(hs.realm) : 0) + (vuKhi && typeof vuKhi.damage === "number" ? Math.max(0, vuKhi.damage) : bonus.atkBonus);
    var duLieu = {
      name: hs.name, realm: hs.realm, cfg: hs.cfg, equipment: equipment, bonus: bonus,
      stats: { hpMax: (r.hpMax | 0) + bonus.hpBonus, mpMax: (r.mpMax | 0) + bonus.mpBonus, spMax: (r.spMax | 0) + bonus.spBonus, bpMax: (r.bpMax | 0) + bonus.bpBonus, atk: atk }
    };
    if (P.InspectUI && P.InspectUI.show) P.InspectUI.show(duLieu);
    else hop(hs.name, "Cảnh giới: " + realmName(hs.realm));
  };
  function menuDaoHuu(b) {
    var p = pl(), xa = p && dist(b, p) > 170;
    var ch = [
      { label: "Mời tỉ thí", disabled: xa, note: xa ? "Đứng gần lại rồi hãy mời" : "Thua không mất gì", onChoose: function () { noi(b, "Được, ra chiêu đi!"); tiThi(b); } },
      { label: "Bắt chuyện", onChoose: function () { noi(b, pick(CAU_NOI)); } },
      { label: "Xem Thông Tin", note: "Trang bị và chỉ số", onChoose: function () { B.xemThongTin(b.hs); } }
    ];
    if (P.HUD && P.HUD.openMateMenu) P.HUD.openMateMenu(b.hs.name, "Cảnh giới: " + realmName(b.hs.realm), ch, P.Input && P.Input.tapClient);
    else hop(b.hs.name, "", { choices: ch });
  }

  /* ================= tà tu ảo ================= */
  var taTu = null, hanTaTu = 0, mapTT = "";
  function mapHoang() {
    var md = mapData(); if (!md || !mapDuocTha()) return false;
    if (md.id === "tan_vien" || (P.DoSat && P.DoSat.safeMap && P.DoSat.safeMap(md.id))) return false;
    return true;
  }
  function roiTaTu(a) {
    var ds = [], n = 3 + Math.floor(Math.random() * 4) + Math.floor(ri(a.ntHs ? a.ntHs.realm : "luyen_khi_1") / 3);
    for (var i = 0; i < n; i++) ds.push("linh_thach");
    if (Math.random() < 0.3) ds.push(pick(["phu_hoa", "phu_kim_giap", "phu_loi_dong", "phu_han_bang"].filter(function (id) { return P.ITEMS && P.ITEMS[id]; }) || ["linh_thach"]));
    var eq = a.ntHs && a.ntHs.equip;
    if (eq && Math.random() < 0.06) { var cac = ["giay", "mu", "nhan", "phap_boi"].map(function (k) { return eq[k]; }).filter(function (id) { return id && P.ITEMS && P.ITEMS[id]; }); if (cac.length) ds.push(pick(cac)); }
    // nguyên liệu luyện Kiếm Linh (mang Kiếm Hạp) / Âm Hồn (mang Hồn Phiên)
    var CDao = P.ChinhDao, LQ = P.LuyenQuy;
    if (CDao && CDao.coHap && CDao.coHap(P) && Math.random() < 0.6) ds.push(CDao.TRU_MA || "tru_ma_lenh");
    else if (LQ && LQ.coPhien && LQ.coPhien(P) && Math.random() < 0.6) ds.push(LQ.TU_SI_HON || "tu_si_hon");
    caption("Đã hạ " + (a.ntHs ? a.ntHs.name : "Tà Tu") + "!");
    return ds.filter(Boolean);
  }
  function nhipTaTu() {
    var p = pl(), t = tg(); if (!p) return;
    if (online()) return;
    if (mapId() !== mapTT) { mapTT = mapId(); taTu = null; hanTaTu = t + 60 * rnd(CAU_HINH.TA_TU_PHUT[0], CAU_HINH.TA_TU_PHUT[1]); }
    if (taTu) {
      if (taTu.dead || (W().enemies || []).indexOf(taTu) < 0) { taTu = null; hanTaTu = t + 60 * rnd(CAU_HINH.TA_TU_PHUT[0], CAU_HINH.TA_TU_PHUT[1]); return; }
      if (dist(taTu, p) > 900 && t - taTu.ntSinh > 40) { goChienBot(taTu); taTu = null; hanTaTu = t + 60 * rnd(CAU_HINH.TA_TU_PHUT[0], CAU_HINH.TA_TU_PHUT[1]); }
      return;
    }
    if (t < hanTaTu || tran || p.downed || !mapHoang()) return;
    hanTaTu = t + 60 * rnd(CAU_HINH.TA_TU_PHUT[0], CAU_HINH.TA_TU_PHUT[1]);
    if (P.realmReached && !P.realmReached(P.Progress.realmId, "luyen_khi_4")) return;
    if (Math.random() > CAU_HINH.TA_TU_TI_LE) return;
    var vt = null;
    for (var k = 0; k < 40 && !vt; k++) { var g = rnd(0, Math.PI * 2), x = p.x + Math.cos(g) * 280, y = p.y + Math.sin(g) * 200; if (diDuoc(x, y)) vt = { x: x, y: y }; }
    if (!vt) return;
    var base = ri(P.Progress.realmId);
    var hs = B.hoSo(Math.floor(Math.random() * 50), realmAt(base + Math.floor(rnd(-1, 2))));
    hs.cfg.outfit = pick(["hac_y", "huyet_anh_y", hs.cfg.outfit]);
    taTu = B.taoChienBot(hs, vt.x, vt.y, { kieu: "tatu", heSo: 0.9 });
    taTu.ntSinh = t;
    caption("⚠ Tà Tu " + hs.name + " (" + realmName(hs.realm) + ") đang lao tới — chuẩn bị nghênh chiến!");
    if (P.Audio && P.Audio.play) P.Audio.play("dungeon_warning");
  }

  // phục vụ kiểm thử / trang quản trị
  B._debug = {
    daoHuu: function () { return daoHuu; },
    moiNgay: function () { hanMoi = 0; },
    taTuNgay: function () { hanTaTu = 0; CAU_HINH.TA_TU_TI_LE = 1; },
    tran: function () { return tran; },
    taTu: function () { return taTu; }
  };

  /* ================= vòng lặp ================= */
  var truoc = 0;
  function nhip() {
    try {
      boc();
      var w = W(); if (!w || !w.player || w.transitioning) return;
      var t = tg(), dt = truoc ? Math.min(0.25, Math.max(0, t - truoc)) : 0.1; truoc = t;
      if (online()) return;
      // lỡ kẹt ở võ đài sau khi tải lại trang
      if (!tran && (mapId() === "chien_bang_dai" || mapId() === "dai_hoi_dau")) { B.veLang(); return; }
      ganVeTele();
      nhipTran();
      nhipChieu();
      nhipDaoHuu(dt);
      nhipTaTu();
    } catch (e) { if (window.console) console.warn("[NTBot]", e); }
  }
  setInterval(nhip, 100);
})(window.PNTT);
