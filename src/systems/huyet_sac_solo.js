/* Nghịch Tiên — Huyết Xích Cấm Địa chơi một mình, không cần máy chủ.
 *
 * Bản gốc do máy chủ quản lượt, thu phí, đếm giờ, cho hái và đóng cửa phó bản.
 * File này làm các việc đó ngay trên máy người chơi, theo đúng luật trong game:
 *   - Luyện Khí tầng 7 trở lên, 5 lượt/ngày (Trúc Cơ: 4), phí 100 Linh Thạch.
 *   - 15 phút mỗi lượt, 3 tầng: Rừng Mãng Xà → Lòng Đất → Đầm Lầy.
 *   - Khu nào còn yêu thú thì cấm chế còn phong, phải dọn sạch mới hái được.
 *   - Hạ U Minh Cự Mãng xong, Cấm Địa sụp sau SAP_SAU_GIAY giây.
 * Lượt trong ngày ghi vào Quest.flags.huyetSacDay / huyetSacCount (bảng Hoạt Động đọc đúng hai trường này).
 * Lượt đang chạy ghi vào Quest.flags.huyetSacRun để tải lại trang không mất. */
(function (P) {
  "use strict";
  var TANG = ["rung_mang_xa", "mach_dat_dong", "dam_lay_boss"];
  var VE = "mieu_hoang";
  var PHI = 100;
  var THOI_LUONG_MS = 15 * 60 * 1000;
  var SAP_SAU_GIAY = 90;
  var THU_MS = 3000;
  var BOSS_CUOI = "u_minh_cu_mang";
  var THU_TUONG_CHANCE = 0.05; // Thú Tượng Giáp: mỗi lượt bốc một lần (bản gốc do máy chủ bốc)
  // điểm hái → vật phẩm và số lượng [ít nhất, nhiều nhất] mỗi lần hái
  var THU_HOACH = {
    truc_co_thao: { item: "truc_co_thao", min: 2, max: 3 },     // 12 điểm/lượt → 24–36 Trúc Cơ Thảo
    dia_linh_qua: { item: "dia_linh_qua", min: 2, max: 4 },     // 5 điểm/lượt → 10–20 Địa Linh Hóa Quả
    bich_ngoc_chop: { item: "co_bich_moc", min: 2, max: 3 },    // 6 điểm/lượt → 12–18 Cổ Bích Mộc
    tran_than_thach: { item: "tran_than_thach", min: 2, max: 3 } // 6 điểm/lượt → 12–18 Trấn Thần Thạch
  };

  var S = P.HuyetSacSolo = { TANG: TANG, THU_HOACH: THU_HOACH, PHI: PHI, THOI_LUONG_MS: THOI_LUONG_MS };
  var thu = null;      // lần hái đang chạy
  var banDoTruoc = ""; // để biết khi nào vừa vào tầng mới

  function Q() { return P.Quest; }
  function flags() { var q = Q(); if (q && !q.flags) q.flags = {}; return q && q.flags; }
  function luu() { try { Q() && Q().save && Q().save(); } catch (e) {} }
  function caption(t) { if (P.HUD && P.HUD.setCaption) P.HUD.setCaption(t); }
  function hop(t, o) { if (P.HUD && P.HUD.openDialog) P.HUD.openDialog("Huyết Xích Cấm Địa", t, o || {}); }
  function homNay() { return P.HuyetSac && P.HuyetSac.day ? P.HuyetSac.day(Date.now()) : new Date(Date.now() + 252e5).toISOString().slice(0, 10); }
  function realm() { return (P.Progress && P.Progress.realmId) || ""; }
  function luotNgay() { return P.HuyetSac && P.HuyetSac.luotNgay ? P.HuyetSac.luotNgay(realm()) : 5; }
  function daDung() { var f = flags() || {}; return f.huyetSacDay === homNay() ? (f.huyetSacCount | 0) : 0; }
  function banDo() { var m = P.SceneWorld && P.SceneWorld.map; return (m && m.data && m.data.id) || ""; }
  function trongCamDia() { return TANG.indexOf(banDo()) >= 0; }
  function luot() { var f = flags(); return f && f.huyetSacRun && f.huyetSacRun.expiresAt ? f.huyetSacRun : null; }
  function conHan(r) { var now = Date.now(); return r && now < r.expiresAt && !(r.collapseAt && now >= r.collapseAt); }

  function dayTrangThai() {
    var UI = P.HuyetSacUI, r = luot();
    if (!UI || !UI.state) return;
    UI.state({ used: daDung(), expiresAt: r ? r.expiresAt : 0, collapseAt: r && r.collapseAt || 0, harvested: r ? r.harvested : [], serverNow: Date.now() });
  }

  /* ---- Đăng ký ở Nữ Tu Miếu Hoang ---- */
  S.dangKy = function () {
    var r = luot();
    if (conHan(r)) {
      // đang còn lượt dở → cho vào lại tầng đầu
      return vaoTang(TANG[0]);
    }
    if (P.realmReached && !P.realmReached(realm(), "luyen_khi_7")) return hop("Cần Luyện Khí tầng 7 trở lên mới vào được Huyết Xích Cấm Địa.");
    var n = luotNgay(), u = daDung();
    if (u >= n) return hop("Hôm nay đã hết " + n + " lượt. Mai hãy quay lại.");
    if ((Number(P.Progress && P.Progress.stones) || 0) < PHI) return hop("Không đủ " + PHI + " Linh Thạch phí vào Cấm Địa.");
    if (!P.Progress.spendStones(PHI)) return hop("Không trừ được phí vào Cấm Địa.");
    var f = flags();
    f.huyetSacDay = homNay();
    f.huyetSacCount = u + 1;
    f.huyetSacRun = { expiresAt: Date.now() + THOI_LUONG_MS, collapseAt: 0, harvested: [], killed: {}, thuTuong: Math.random() < ((P.LootRates && P.LootRates.THU_TUONG_GIAP_CHANCE) || THU_TUONG_CHANCE) };
    luu();
    if (P.HUD && P.HUD.refreshStones) P.HUD.refreshStones();
    vaoTang(TANG[0]);
    caption("Đã vào Huyết Xích Cấm Địa — " + Math.round(THOI_LUONG_MS / 60000) + " phút. Lượt " + (u + 1) + "/" + n + " hôm nay.");
  };

  function vaoTang(id) {
    if (P.SceneWorld && P.SceneWorld.switchMap) P.SceneWorld.switchMap(id);
    setTimeout(dayTrangThai, 600);
  }

  var dangVe = 0;
  function ketThuc(lyDo) {
    if (Date.now() - dangVe < 4000) return;
    dangVe = Date.now();
    var f = flags();
    if (f && f.huyetSacRun) { f.huyetSacRun = null; luu(); }
    thu = null;
    if (P.HuyetSacUI && P.HuyetSacUI.closed) P.HuyetSacUI.closed();
    if (trongCamDia() && P.SceneWorld && P.SceneWorld.switchMap) P.SceneWorld.switchMap(VE);
    if (lyDo) setTimeout(function () { caption(lyDo); }, 900);
  }

  /* ---- Lệnh mà giao diện gửi (thay cho máy chủ) ---- */
  S.send = function (act, d) {
    var r = luot();
    if (act === "huyet_status") { dayTrangThai(); return true; }
    if (act === "leave_dungeon") { ketThuc("Đã rời Huyết Xích Cấm Địa. Vật phẩm đã hái vẫn được giữ."); return true; }
    if (act === "huyet_harvest") {
      if (!conHan(r) || !trongCamDia()) { caption("Lượt Huyết Xích đã hết."); return false; }
      var key = banDo() + ":" + d.propId;
      if (r.harvested.indexOf(key) >= 0) { caption("Điểm này đã hái trong lượt này."); return false; }
      if (P.HuyetSacUI && P.HuyetSacUI.sealed && P.HuyetSacUI.sealed()) return false;
      var pl = P.SceneWorld && P.SceneWorld.player;
      thu = { propId: String(d.propId), key: key, map: banDo(), batDau: Date.now(), x: pl ? pl.x : 0, y: pl ? pl.y : 0 };
      if (P.HuyetSacUI && P.HuyetSacUI.batDauThu) P.HuyetSacUI.batDauThu({ propId: d.propId, ms: THU_MS });
      return true;
    }
    return false;
  };

  function timProp(id) {
    var m = P.SceneWorld && P.SceneWorld.map;
    var ps = (m && m.props) || [];
    for (var i = 0; i < ps.length; i++) if (String(ps[i].id) === id) return ps[i];
    return null;
  }

  function xongThu() {
    var r = luot(), t = thu; thu = null;
    if (!r || !t) return;
    var pr = timProp(t.propId), cf = pr && THU_HOACH[pr.type];
    if (!cf) return;
    var sl = cf.min + Math.floor(Math.random() * (cf.max - cf.min + 1));
    P.Inventory.add(cf.item, sl);
    r.harvested.push(t.key);
    pr.hidden = true;
    luu();
    var it = P.ITEMS && P.ITEMS[cf.item];
    var pl = P.SceneWorld && P.SceneWorld.player;
    if (P.VFX && P.VFX.spawnText && pl) P.VFX.spawnText(pl.x, pl.y - 52, "+" + sl + " " + (it ? it.name : cf.item), "#ffe08a");
    if (P.Audio && P.Audio.play) P.Audio.play("pickup", { gain: .75 });
    if (P.HUD && P.HUD.refreshBag) P.HUD.refreshBag();
    dayTrangThai();
  }

  function roiDo(id, e) {
    var W = P.SceneWorld;
    if (!W || !W.drops || !P.ITEMS[id]) { P.Inventory.add(id, 1); return; }
    W.drops.push({ kind: "item", itemId: id, n: 1, lootId: null, owner: null, boss: true, bossName: "U Minh Cự Mãng", age: 0, x: e.x, y: e.y - 26, vx: 0, vy: -70, gy: e.y + 6, state: "fall", t: 0, asked: false, sortY: e.y });
    if (P.Audio && P.Audio.atPoint) P.Audio.atPoint("rare_drop", e.x, e.y);
  }

  /* ---- Nhịp kiểm tra: giờ, hái, quái đã hạ, boss cuối ---- */
  function nhip() {
    var W = P.SceneWorld;
    if (!W || !W.player || !W.map) return;
    var r = luot(), m = banDo();

    if (TANG.indexOf(m) >= 0) {
      if (!conHan(r)) {
        var sap = r && r.collapseAt && Date.now() >= r.collapseAt;
        return ketThuc(sap ? "Huyết Xích Cấm Địa đã sụp — đưa về Miếu Hoang." : "Hết giờ — Huyết Xích Cấm Địa đóng lại, đưa về Miếu Hoang.");
      }
      var killed = r.killed[m] || (r.killed[m] = []);
      // vừa vào lại tầng đã đánh → quái đã hạ không sống lại
      if (m !== banDoTruoc) {
        banDoTruoc = m;
        (W.enemies || []).forEach(function (e) {
          if (killed.indexOf(e.id) >= 0) { e.dead = true; e.respawnAt = Infinity; e.hp = 0; return; }
          // bản gốc nhân đôi máu/sát thương boss cho tổ đội; đi một mình thì giữ chỉ số gốc
          var goc = P.ENEMY_DEFS && P.ENEMY_DEFS[e.type];
          if (goc && goc.isBoss && e.def && e.def !== goc && e.hpMax > goc.hp) {
            e.def.hp = goc.hp; e.def.contactDmg = goc.contactDmg;
            e.hpMax = goc.hp; if (e.hp > goc.hp) e.hp = goc.hp;
          }
        });
        dayTrangThai();
      }
      var doi = false;
      (W.enemies || []).forEach(function (e) {
        if (e.dead && killed.indexOf(e.id) < 0) {
          killed.push(e.id); doi = true;
          if (e.type === BOSS_CUOI && !r.collapseAt) {
            r.collapseAt = Date.now() + SAP_SAU_GIAY * 1000;
            // nhiệm vụ giai đoạn 21: "Hạ U Minh Cự Mãng ở Huyết Xích Cấm Địa" (bản gốc máy chủ ghi)
            if (Q() && Q().recordHuyetSacBoss && Q().recordHuyetSacBoss() && W.refreshQuest) W.refreshQuest();
            if (r.thuTuong) { r.thuTuong = false; roiDo("thu_tuong_giap", e); }
            caption("U Minh Cự Mãng đã ngã! Cấm Địa sẽ sụp sau " + SAP_SAU_GIAY + " giây — mau hái nốt rồi rời đi.");
            dayTrangThai();
          }
        }
      });
      if (doi) luu();
      // hái: đứng yên đủ 3 giây
      if (thu) {
        var pl = W.player;
        if (thu.map !== m || Math.hypot(pl.x - thu.x, pl.y - thu.y) > 12) { thu = null; caption("Đã ngừng thu hoạch."); }
        else if (Date.now() - thu.batDau >= THU_MS) xongThu();
      }
    } else {
      banDoTruoc = m;
      thu = null;
      if (r && !conHan(r)) { flags().huyetSacRun = null; luu(); }
    }
  }
  setInterval(nhip, 200);
})(window.PNTT);
