!function (a) {
  "use strict";
  var e;
  var n;
  var t;
  var i = a.Utils;
  var o = a.Pixel;
  var r = { stuckSec: 1.6, windup: .75, cooldown: 4, range: 420, radius: 40, progress: .35 };
  var h = { hp: 60, exp: 2, speed: 30, aggro: 0, contactDmg: 0, hitCooldown: 99, wanderRadius: 90, wanderPause: 2.5, respawnSec: 300, sprite: { w: 32, h: 64, ax: 16, ay: 62 }, barY: 50, flee: { radius: 170, speed: 74, time: 4 }, hon: "pham_hon" };
  var l = { xa: { hair: "ma_vi", hairColor: "hac", skin: "tan" }, hau: { hair: "ma_vi", hairColor: "nau", skin: "tan" }, nhim: { hair: "thanh_van_bien", hairColor: "hac", skin: "light" } };
  function d(a, e, n, t, i) {
    var o = l[e];
    return Object.assign({ name: a, level: 10, tuSi: { gender: "male", hair: o.hair, hairColor: o.hairColor, beard: "none", outfit: e + "_toc_y", hat: e + "_toc_mao", accessory: e + "_toc", skin: o.skin, shoes: "ink", weapon: n }, sprite: { w: 32, h: 64, ax: 16, ay: 62 }, barY: 50, hp: 205, exp: 24, speed: 44, aggro: 240, leashRange: 600, wanderRadius: 30, wanderPause: 1.4, contactDmg: 14, hitCooldown: 1.1, ylChieu: t, respawnSec: 0, khongNhan: !0, yenLang: !0 }, i || {});
  }
  function s(a, e, n) {
    return Object.assign({ name: a, level: 1, human: e }, h, n || {});
  }
  function u(a, e) {
    return { name: "Hắc Y Tà Tu", level: 12, tuSi: { gender: "female", hair: "tien_tu", hairColor: e, beard: "none", outfit: "hac_y", skin: "light", shoes: "ink", weapon: "luc_doc_cham" }, sprite: { w: 32, h: 64, ax: 16, ay: 62 }, barY: 50, hp: 322, exp: 28, speed: 56, aggro: 110, contactDmg: 15, hitCooldown: .95, wanderRadius: 60, wanderPause: 2, respawnSec: 60, khongNhan: !0, manhGiay: a, nhiemVu: !0 };
  }
  a.ENEMY_DEFS = { sau_truc: { name: "Bọ Ngựa", level: 1, sprite: { w: 40, h: 32, ax: 16, ay: 30 }, barY: 30, shadow: { rx: 14, ry: 3 }, sheet: { cols: 6, fw: 80, fh: 64, anims: { idle: [0, 4], run: [4, 6], attack: [10, 4], hurt: [14, 2] }, fps: 6 }, hp: 5, exp: 3, speed: 14, aggro: 0, wanderRadius: 10, wanderPause: 1.8, contactDmg: 4, hitCooldown: 1 }, son_chuot: { name: "Sơn Chuột", level: 3, sprite: { w: 42, h: 23, ax: 19, ay: 21 }, barY: 18, shadow: { rx: 14, ry: 3 }, sheet: { cols: 6, fw: 84, fh: 46, anims: { idle: [0, 4], run: [4, 6], attack: [10, 4], hurt: [14, 2] }, fps: 10 }, hp: 11, exp: 5, speed: 46, aggro: 72, wanderRadius: 26, wanderPause: 1.1, contactDmg: 6, hitCooldown: .9 }, bach_ho_tuyet: { name: "Bạch Hổ Tuyết · Yêu Thú Cấp 1", level: 12, sprite: { w: 75, h: 44, ax: 38, ay: 40 }, barY: 36, shadow: { rx: 26, ry: 5 }, sheet: { cols: 6, fw: 150, fh: 88, anims: { idle: [0, 4], run: [4, 6], attack: [10, 4], hurt: [14, 2] }, fps: 8 }, hp: 1900, exp: 170, speed: 62, aggro: 300, wanderRadius: 34, wanderPause: .7, contactDmg: 34, hitCooldown: .72, respawnSec: 18e3, pounce: r, announceKill: !1, khu1Only: !0, lootLastHitOnly: !0 }, xich_nhan_nguu: { name: "Xích Nhãn Ngưu · Yêu Thú Cấp 1", level: 12, sprite: { w: 96, h: 70, ax: 48, ay: 68 }, barY: 70, shadow: { rx: 15, ry: 4 }, sheet: { cols: 6, fw: 192, fh: 140, anims: { idle: [0, 4], run: [4, 6], attack: [10, 4], hurt: [14, 2] }, fps: 8 }, ngang: { anh: "xich_nhan_nguu_ngang", sprite: { w: 96, h: 70, ax: 46, ay: 68 }, sheet: { cols: 6, fw: 192, fh: 140, anims: { idle: [0, 4], run: [4, 6], attack: [10, 4], hurt: [14, 2] }, fps: 8 } }, hp: 1900, exp: 170, speed: 58, aggro: 300, wanderRadius: 34, wanderPause: .7, contactDmg: 34, hitCooldown: .72, respawnSec: 10800, pounce: r, announceKill: !1, baoHienHinh: !0, khu1Only: !0, lootLastHitOnly: !0 }, xich_ma: { name: "Xích Ma Vương · Yêu Thú Cấp 1", level: 14, sprite: { w: 96, h: 70, ax: 48, ay: 68 }, barY: 70, shadow: { rx: 17, ry: 5 }, sheet: { cols: 6, fw: 192, fh: 140, anims: { idle: [0, 4], run: [4, 6], attack: [10, 4], hurt: [14, 2] }, fps: 8 }, hp: 4200, exp: 260, speed: 54, aggro: 260, wanderRadius: 30, wanderPause: .8, contactDmg: 38, hitCooldown: .8, respawnSec: 0, announceKill: !1, lootLastHitOnly: !0 }, ngan_mao_hong: { name: "Ngân Mao Hống · Yêu Thú Cấp 2", level: 12, sprite: { w: 70, h: 63, ax: 39, ay: 62 }, barY: 60, sheet: { cols: 3, fw: 100, fh: 90, anims: { idle: [0, 2], run: [2, 2], attack: [3, 2], hurt: [5, 1] }, fps: 6 }, hp: 2570, exp: 240, speed: 62, aggro: 300, wanderRadius: 34, wanderPause: .7, contactDmg: 40, hitCooldown: .8, respawnSec: 0, pounce: r, announceKill: !1, khu1Only: !0, lootLastHitOnly: !0 }, yl_hac_tien: { name: "Hạc Tiên · Yêu Thú Cấp 2", level: 12, sprite: { w: 77, h: 60, ax: 38, ay: 52 }, barY: 52, shadow: { rx: 15, ry: 4 }, sheet: { cols: 2, fw: 154, fh: 120, anims: { idle: [0, 2], run: [0, 2], attack: [0, 2], hurt: [0, 1] }, fps: 5 }, hp: 2570, exp: 240, speed: 70, aggro: 170, wanderRadius: 40, wanderPause: .9, contactDmg: 40, hitCooldown: .8, stones: 12, respawnSec: 0, announceKill: !1, khongNhan: !0, yenLang: !0 }, duoc_linh_thu: { name: "Dược Linh Thú", level: 5, sprite: { w: 39, h: 36, ax: 19, ay: 34 }, barY: 33, shadow: { rx: 14, ry: 3 }, sheet: { cols: 6, fw: 78, fh: 72, anims: { idle: [0, 4], run: [4, 6], attack: [10, 4], hurt: [14, 2] }, fps: 8 }, hp: 23, exp: 9, speed: 52, aggro: 96, wanderRadius: 30, wanderPause: 1.3, contactDmg: 8, hitCooldown: .85 }, doc_dang_yeu: { name: "Độc Đằng Yêu", level: 4, sprite: { w: 44, h: 43, ax: 20, ay: 40 }, barY: 41, shadow: { rx: 17, ry: 4 }, sheet: { cols: 6, fw: 88, fh: 86, anims: { idle: [0, 4], run: [4, 6], attack: [10, 4], hurt: [14, 2] }, fps: 7 }, hp: 17, exp: 7, speed: 38, aggro: 108, wanderRadius: 22, wanderPause: 1.5, contactDmg: 9, hitCooldown: .95 }, yeu_quai_ha_pham: { name: "Yêu Quái · Nhất Giai Hạ Phẩm", level: 1, sprite: { w: 42, h: 30, ax: 23, ay: 28 }, barY: 27, shadow: { rx: 15, ry: 3 }, sheet: { cols: 6, fw: 84, fh: 60, anims: { idle: [0, 4], run: [4, 6], attack: [10, 4], hurt: [14, 2] }, fps: 8 }, hp: 12, exp: 7, speed: 44, aggro: 92, wanderRadius: 24, wanderPause: 1.2, contactDmg: 7, hitCooldown: .9, respawnSec: 30 }, thach_yeu: { name: "Thạch Yêu", level: 3, sprite: { w: 40, h: 34, ax: 20, ay: 34 }, barY: 38, shadow: { rx: 14, ry: 3 }, thanDa: !0, hp: 18, exp: 8, speed: 40, aggro: 120, wanderRadius: 26, wanderPause: 1.1, contactDmg: 9, hitCooldown: .9, respawnSec: 30, stones: 1, ore: !0 }, thach_ma: { name: "Thạch Ma", level: 4, sprite: { w: 60, h: 51, ax: 30, ay: 51 }, barY: 55, shadow: { rx: 21, ry: 4 }, thanDa: !0, hp: 140, exp: 14, speed: 38, aggro: 138, wanderRadius: 28, wanderPause: 1.1, contactDmg: 44, hitCooldown: .9, respawnSec: 35, stones: 1, ore: !0 }, xuyen_son_giap: { name: "Xuyên Sơn Giáp", level: 6, desc: "Tê tê đá sống trong khe gió Bãi Đá, vảy kết từ Phong Tinh. Thỉnh thoảng có con biến dị: vảy đỏ tía, máu dày gấp hai mươi, đòn mạnh gấp năm.", sprite: { w: 96, h: 69, ax: 47, ay: 62 }, barY: 53, shadow: { rx: 32, ry: 6 }, sheet: { cols: 6, fw: 168, fh: 120, anims: { idle: [0, 4], run: [4, 6], attack: [10, 5], hurt: [15, 2] }, fps: 8 }, hitRadius: 30, hp: 300, exp: 30, speed: 44, aggro: 120, wanderRadius: 30, wanderPause: 1.2, contactDmg: 56, hitCooldown: .9, respawnSec: 40, bienDi: { chance: .004, hp: 20, dmg: 5, exp: 5, stones: 5, scale: 1.3, ten: "Biến Dị", anhMob: "xuyen_son_giap_bd" } }, linh_ho_tran_son: { name: "Linh Hổ Trấn Sơn · Yêu Thú Cấp 4", level: 14, sprite: { w: 127, h: 118, ax: 60, ay: 117 }, barY: 150, barW: 48, sheet: { k: .5, rects: [[730, 1332, 252, 234, -120, -232], [1796, 1064, 248, 236, -120, -234], [0, 1332, 242, 236, -120, -234], [244, 1332, 240, 236, -120, -234], [984, 1332, 240, 234, -120, -232], [1740, 1332, 246, 232, -120, -230], [504, 1570, 252, 230, -120, -228], [0, 1570, 254, 232, -120, -230], [1008, 1064, 218, 254, -102, -252], [742, 1064, 264, 258, -130, -254], [264, 1064, 250, 262, -106, -260], [584, 738, 262, 288, -126, -290], [848, 738, 244, 284, -106, -276], [516, 1064, 224, 262, -110, -258], [758, 1570, 246, 230, -118, -226], [1424, 738, 226, 276, -116, -274], [1652, 738, 230, 272, -118, -268], [0, 0, 310, 376, -152, -376], [0, 738, 232, 324, -112, -384], [622, 378, 254, 338, -130, -394], [1558, 378, 252, 334, -136, -392], [848, 0, 170, 372, -80, -416], [1020, 0, 170, 372, -80, -386], [0, 378, 224, 358, -104, -316], [1192, 0, 230, 368, -106, -326], [1246, 378, 310, 336, -152, -318], [486, 1332, 242, 236, -128, -230], [1812, 378, 226, 330, -118, -324], [1542, 1064, 252, 248, -126, -246], [0, 1064, 262, 266, -140, -250], [1226, 1332, 264, 234, -126, -230], [1492, 1332, 246, 234, -120, -232], [1256, 1570, 252, 224, -122, -216], [1758, 1570, 258, 214, -126, -202], [226, 378, 394, 344, -194, -324], [1424, 0, 468, 366, -230, -336], [312, 0, 534, 374, -260, -330], [256, 1570, 246, 232, -120, -228], [1510, 1570, 246, 216, -118, -212], [1006, 1570, 248, 226, -120, -224], [1228, 1064, 312, 252, -152, -214], [1094, 738, 328, 282, -162, -226], [234, 738, 348, 302, -174, -236], [878, 378, 366, 338, -182, -264]], anims: { idle: [0, 8], walk: [8, 6], run: [8, 6], jump: [14, 6], pounce: [20, 6], attack: [26, 6], roar: [32, 6], hurt: [38, 2], charge: [40, 4] }, fps: 14, animFps: { idle: 6, walk: 6, run: 11, hurt: 8, roar: 9, charge: 6 }, actionDriven: !0 }, drawScale: 2.6, shadow: { rx: 60, ry: 14 }, hp: 2e5, exp: 90, speed: 48, aggro: 420, leashRange: 2e3, wanderRadius: 38, wanderPause: .9, contactDmg: 575, hitCooldown: .9, respawnSec: 18e3, pounce: r, tuyetChieu: { kieu: "vo_cao", ten: "Hổ Vương Diệt Sát", from: .05, to: .1, windup: 1.5, radius: 150, range: 420, maxTargets: 6 }, baoKich: { ten: "Linh Hổ Bạo Kích", cooldown: 9, delay: 8, radius: 150, maxTargets: 5, mult: 1.3, hitsMin: 2, hitsMax: 4, gap: .55, dot: 3, gapDot: 1.2 }, hoVe: "bach_ho_tuyet", ore: !0, isBoss: !0, lootLastHitOnly: !0, hon: "thu_hon_4" }, thach_giap_yeu: { name: "Thạch Giáp Yêu · Nhất Giai Thượng Phẩm", level: 1, sprite: { w: 64, h: 54, ax: 32, ay: 54 }, barY: 58, shadow: { rx: 22, ry: 4 }, thanDa: !0, hp: 30, exp: 22, speed: 58, aggro: 320, wanderRadius: 20, wanderPause: .7, contactDmg: 16, hitCooldown: .72, respawnSec: 30, stones: 1, ore: !0 }, xich_tinh_mang: { name: "Xích Tinh Mãng", level: 10, sprite: { w: 60, h: 46, ax: 28, ay: 42 }, barY: 32, shadow: { rx: 21, ry: 4 }, sheet: { cols: 6, fw: 120, fh: 92, anims: { idle: [0, 4], run: [4, 6], attack: [10, 5], hurt: [15, 2] }, fps: 8 }, hp: 205, exp: 24, speed: 56, aggro: 150, wanderRadius: 28, wanderPause: .9, contactDmg: 14, hitCooldown: .85, poisonSpit: { chance: .28, cooldown: 5, range: 160, maxTargets: 2, damage: 8, duration: 5, dps: 4 }, respawnSec: 3600 }, xich_mang_vuong: { name: "Xích Mãng Vương · Yêu Thú Cấp 2", level: 12, sprite: { w: 132, h: 120, ax: 56, ay: 108 }, barY: 100, shadow: { rx: 52, ry: 10 }, sheet: { cols: 6, fw: 264, fh: 240, anims: { idle: [0, 4], run: [4, 6], attack: [10, 5], jump: [15, 3], pounce: [18, 3], hurt: [21, 2] }, fps: 8, actionDriven: !0 }, drawScale: 1.9, hp: 1900, exp: 170, speed: 62, aggro: 300, wanderRadius: 34, wanderPause: .7, contactDmg: 34, hitCooldown: .72, respawnSec: 3600, pounce: r, isBoss: !0 }, thach_mach_vuong: { name: "Thạch Mạch Vương · Yêu Thú Cấp 2", level: 12, sprite: { w: 108, h: 91, ax: 54, ay: 91 }, barY: 95, drawScale: 1.8, shadow: { rx: 38, ry: 7 }, thanDa: !0, hp: 2570, exp: 240, speed: 44, aggro: 300, wanderRadius: 26, wanderPause: .8, contactDmg: 40, hitCooldown: .8, respawnSec: 3600, pounce: r, isBoss: !0 }, u_minh_cu_mang: { name: "U Minh Cự Mãng · Yêu Thú Cấp 2", level: 13, sprite: { w: 140, h: 136, ax: 60, ay: 124 }, barY: 122, shadow: { rx: 58, ry: 11 }, sheet: { cols: 6, fw: 280, fh: 272, anims: { idle: [0, 4], run: [4, 6], attack: [10, 5], jump: [15, 3], pounce: [18, 3], hurt: [21, 2] }, fps: 8, actionDriven: !0 }, hp: 3370, exp: 320, speed: 46, aggro: 320, wanderRadius: 36, wanderPause: .6, contactDmg: 46, hitCooldown: .62, respawnSec: 3600, pounce: r, isBoss: !0 }, than_thu_xich_long: { name: "Thần Thú · Xích Long | Yêu Thú Cấp 3", level: 14, sprite: { w: 136, h: 68, ax: 68, ay: 62 }, barY: 70, barW: 48, sheet: { cols: 8, fw: 136, fh: 68, anims: { idle: [0, 8], run: [8, 6], attack: [14, 5], hurt: [19, 3], die: [22, 6] }, fps: 10 }, fireSheet: { animation: "attack_short_2", path: "assets/sprites/fx/xich_long_phun_lua.png", cols: 8, fw: 204, fh: 60, frames: 16, ax: 68, ay: 60, scale: 1 }, deathVfx: { path: "assets/sprites/mob/than_thu_xich_long.png", cols: 8, fw: 136, fh: 68, seq: [22, 23, 24, 25, 26, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27], ax: 68, ay: 62, life: 2, fadeOut: .42 }, hp: 1e5, exp: 1600, lootLastHitOnly: !0, hon: "thu_hon_3", speed: 52, aggro: 320, wanderRadius: 40, wanderPause: .7, contactDmg: 230, hitRadius: 78, bodyRadius: 44, leashRange: 300, hitCooldown: .62, baoKich: { ten: "Long Viêm Bạo Kích", cooldown: 9, delay: 8, radius: 150, maxTargets: 5, mult: 1.3, hitsMin: 2, hitsMax: 4, gap: .55, dot: 3, gapDot: 1.2 }, fireNova: { cooldown: 2.4, windup: 1.1, range: 460, radius: 68, dmg: 90, burnTime: 6, burnDps: 16 }, tuyetChieu: { kieu: "mua_lua", ten: "Thiên Hỏa Diệt Thế", from: .05, to: .1, windup: 3, radius: 280 }, luuTinh: { ten: "Long Viêm Lưu Tinh", from: .2, to: .25, dot: 5, gapDot: 2.2, windup: 1.4, radius: 76, moiNguoi: 2, rai: 10, mult: 3 }, hoVe: "xich_nhan_nguu", respawnSec: 10800, isBoss: !0 }, song_duc_ma_bao: { name: "Song Dực Ma Báo · Yêu Thú Cấp 6", level: 14, sprite: { w: 109, h: 65, ax: 54, ay: 62 }, barY: 76, barW: 56, drawScale: 1.6, sheet: { cols: 7, fw: 109, fh: 65, anims: { idle: [0, 4], run: [4, 6], attack: [10, 5], attack2: [15, 5], attack3: [20, 5], jump: [25, 4], pounce: [29, 3], hurt: [32, 3], die: [35, 6] }, attackAnims: ["attack", "attack2", "attack3"], fps: 10, actionDriven: !0 }, deathVfx: { path: "assets/sprites/mob/song_duc_ma_bao.png", cols: 7, fw: 109, fh: 65, seq: [35, 36, 37, 38, 39, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40], ax: 54, ay: 62, life: 2.2, fadeOut: .5, scale: 1.6 }, hp: 168500, exp: 360, speed: 72, aggro: 460, leashRange: 2e3, wanderRadius: 40, wanderPause: .7, contactDmg: 2300, hitCooldown: .85, hitRadius: 62, bodyRadius: 40, pounce: r, respawnSec: 0, hoVe: "ngan_mao_hong", baoKich: { ten: "Ma Báo Bạo Kích", cooldown: 7, delay: 6, radius: 170, maxTargets: 5, mult: .6, hitsMin: 2, hitsMax: 4, gap: .55, dot: 3, gapDot: 1.2 }, ore: !0, isBoss: !0, lootLastHitOnly: !0, hon: "thu_hon_6" }, tieu_phu: s("Tiều Phu", { gender: "male", hair: "dao_dong", hairColor: "hac", beard: "none", outfit: "ao_thon_lac", skin: "tan", shoes: "cloth" }), nong_phu: s("Nông Phu", { gender: "male", hair: "dao_ke", hairColor: "nau", beard: "rau_de", outfit: "ao_thon_lac", skin: "tan", shoes: "cloth" }), duoc_nong: s("Dược Nông", { gender: "female", hair: "tien_tu", hairColor: "nau", beard: "none", outfit: "lu_hanh_moc", skin: "light", shoes: "cloth" }), thu_sinh: s("Thư Sinh", { gender: "male", hair: "ma_vi", hairColor: "hac", beard: "none", outfit: "lu_hanh_moc", skin: "pale", shoes: "cloth" }), phu_khuan_vac: s("Phu Khuân Vác", { gender: "male", hair: "dao_dong", hairColor: "hac", beard: "quai_non", outfit: "quan_dui", skin: "tan", shoes: "none" }, { hp: 80, speed: 34, flee: { radius: 190, speed: 86, time: 4.5 } }), thuong_nhan: s("Thương Nhân", { gender: "male", hair: "cao_ke_ngoc_quan", hairColor: "hac", beard: "ria_kiem", outfit: "lu_hanh_moc", skin: "light", shoes: "ink" }, { hp: 560, exp: 8, respawnSec: 0, hon: "oan_hon", hoVe: "tieu_su", flee: { radius: 210, speed: 62, time: 6 } }), tieu_su: { name: "Tiêu Sư", level: 5, human: { gender: "male", hair: "thanh_van_bien", hairColor: "hac", beard: "quai_non", outfit: "hac_y", skin: "tan", shoes: "ink", weapon: "truc_kiem" }, sprite: { w: 32, h: 64, ax: 16, ay: 62 }, barY: 50, hp: 720, exp: 14, speed: 54, aggro: 140, contactDmg: 12, hitCooldown: 1.1, wanderRadius: 40, wanderPause: 1.6, respawnSec: 0, hon: "oan_hon" }, son_tac: s("Sơn Tặc", { gender: "male", hair: "dao_dong", hairColor: "hac", beard: "quai_non", outfit: "hac_y", skin: "tan", shoes: "ink" }, { hon: "chinh_khi", flee: { radius: 170, speed: 74, time: 4, tu: "chinh" } }), kiep_tac: { name: "Kiếp Tặc", level: 5, human: { gender: "male", hair: "ma_vi", hairColor: "nau", beard: "quai_non", outfit: "hac_y", skin: "tan", shoes: "ink", weapon: "truc_kiem" }, sprite: { w: 32, h: 64, ax: 16, ay: 62 }, barY: 50, hp: 720, exp: 14, speed: 54, aggro: 140, contactDmg: 12, hitCooldown: 1.1, wanderRadius: 40, wanderPause: 1.6, respawnSec: 0, hon: "hiep_nghia_lenh" }, hac_phong_ta_tu: { name: "Hắc Phong Tà Tu", level: 14, tuSi: { gender: "male", hair: "ma_vi", hairColor: "hac", beard: "none", outfit: "hac_y", skin: "tan", shoes: "ink", weapon: "thiet_dao" }, sprite: { w: 32, h: 64, ax: 16, ay: 62 }, barY: 50, hp: 528, exp: 40, speed: 60, aggro: 170, contactDmg: 20, hitCooldown: .9, wanderRadius: 70, wanderPause: 1.6, respawnSec: 75, stones: 1, khongNhan: !0 }, phuc_kich_ta_tu: { name: "Tà Tu Phục Kích", level: 14, tuSi: { gender: "male", hair: "thanh_van_bien", hairColor: "chu", beard: "quai_non", outfit: "huyet_anh_y", skin: "tan", shoes: "ink", weapon: "thiet_kiem" }, sprite: { w: 32, h: 64, ax: 16, ay: 62 }, barY: 50, hp: 440, exp: 32, speed: 62, aggro: 210, contactDmg: 18, hitCooldown: .9, wanderRadius: 50, wanderPause: 1.4, respawnSec: 40, khongNhan: !0 }, chap_phap_tuan_ve: { name: "Tuần Vệ Chấp Pháp", level: 15, tuSi: { gender: "male", hair: "cao_ke_ngoc_quan", hairColor: "hac", beard: "ria_kiem", outfit: "lam_y", skin: "light", shoes: "ink", weapon: "thiet_thuong" }, sprite: { w: 32, h: 64, ax: 16, ay: 62 }, barY: 50, hp: 998, exp: 90, speed: 58, aggro: 150, contactDmg: 28, hitCooldown: .85, wanderRadius: 90, wanderPause: 2.2, respawnSec: 90, stones: 2, khongNhan: !0 }, hac_y_ta_tu_1: u("manh_giay_am_hieu_1", "nau"), hac_y_ta_tu_2: u("manh_giay_am_hieu_2", "tu"), hac_y_ta_tu_3: u("manh_giay_am_hieu_3", "ngan"), lam_lang_ta_tu: { name: "Tà Tu Chiếm Làng", level: 13, tuSi: { gender: "male", hair: "ma_vi", hairColor: "hac", beard: "none", outfit: "ta_tu_y", skin: "tan", shoes: "ink", weapon: "thiet_dao" }, sprite: { w: 32, h: 64, ax: 16, ay: 62 }, barY: 50, hp: 1400, exp: 30, speed: 64, aggro: 200, contactDmg: 34, hitCooldown: .9, wanderRadius: 40, wanderPause: 1.8, respawnSec: 0, khongNhan: !0, lamLang: !0 }, lam_lang_ta_ve: { name: "Tà Vệ Binh", level: 14, tuSi: { gender: "male", hair: "thanh_van_bien", hairColor: "hac", beard: "quai_non", outfit: "ta_tu_y_xanh", skin: "light", shoes: "ink", weapon: "thiet_thuong" }, sprite: { w: 32, h: 64, ax: 16, ay: 62 }, barY: 50, hp: 2600, exp: 48, speed: 56, aggro: 190, contactDmg: 42, hitCooldown: 1, wanderRadius: 30, wanderPause: 2.2, respawnSec: 0, khongNhan: !0, lamLang: !0 }, ta_mach_tru: { name: "Tà Mạch Trụ", level: 14, sprite: { w: 44, h: 104, ax: 22, ay: 100 }, drawScale: 1.35, barY: 150, barW: 52, hp: 12e3, exp: 60, speed: 0, aggro: 0, contactDmg: 0, hitCooldown: 99, wanderRadius: 0, wanderPause: 99, bodyRadius: 18, respawnSec: 0, khongNhan: !0, lamLang: !0, tru: !0, truBan: !0, fireNova: { trongTai: !0, tim: !0, cooldown: 999, windup: 3, range: -1, radius: 120, dmg: 0, burnTime: 0, burnDps: 0 } }, bong_tan_ta_hon: { name: "Bóng Tàn Tà Hồn", level: 13, sprite: { w: 28, h: 46, ax: 14, ay: 44 }, barY: 46, hp: 1200, exp: 12, speed: 56, aggro: 240, contactDmg: 26, hitCooldown: 1, wanderRadius: 30, wanderPause: 1.2, respawnSec: 0, khongNhan: !0, lamLang: !0 }, ll_quy_phien: { name: "Quỷ Phiên Âm Hồn", level: 13, sprite: { w: 42, h: 42, ax: 21, ay: 34 }, barY: 40, hp: 450, exp: 6, speed: 100, aggro: 420, leashRange: 4e3, contactDmg: 24, hitCooldown: .8, wanderRadius: 30, wanderPause: .6, respawnSec: 0, khongNhan: !0, lamLang: !0, quyPhien: !0 }, hoang_cuu_bao: { name: "Hoàng Cửu Bảo · Tà Soái", level: 15, tuSi: { gender: "male", hair: "hoang_cuu_toc", hairColor: "hac", beard: "none", outfit: "hoang_cuu_bao_y", skin: "light", shoes: "ink", weapon: "bich_nguc_ta_dao" }, sprite: { w: 32, h: 64, ax: 16, ay: 62 }, drawScale: 1.45, barY: 80, barW: 64, hp: 96e3, exp: 400, speed: 66, aggro: 460, leashRange: 4e3, contactDmg: 60, hitCooldown: .9, hitRadius: 34, bodyRadius: 12, wanderRadius: 40, wanderPause: 2, pounce: r, baoKich: { ten: "Tà Khí Trảm", cooldown: 8, delay: 5, radius: 160, maxTargets: 6, mult: .8, hitsMin: 2, hitsMax: 3, gap: .6 }, tuyetChieu: { ten: "Tà Hỏa Diệt Thế", kieu: "mua_lua", from: .12, to: .2, windup: 3, radius: 190, maxTargets: 0 }, respawnSec: 0, isBoss: !0, khongNhan: !0, lamLang: !0 }, yl_xa_no: d("Xà Tộc Nỏ Thủ", "xa", "thiet_cot_nha_no", "phong"), yl_xa_cham: d("Xà Tộc Phi Châm", "xa", "luc_doc_cham", "phong"), yl_hau_con: d("Hầu Tộc Côn Thủ", "hau", "truc_con", "loi"), yl_hau_kiem: d("Hầu Tộc Kiếm Thủ", "hau", "truc_kiem", "loi"), yl_nhim_thuong: d("Nhím Tộc Thương Binh", "nhim", "thiet_thuong", "hoa_cau"), yl_nhim_dao: d("Nhím Tộc Đao Binh", "nhim", "thiet_dao", "hoa_cau"), yl_tuan_ve: d("Nhím Tộc Tuần Vệ", "nhim", "thiet_kiem", "hoa_cau", { level: 11, drawScale: 1.15, barY: 58, barW: 26, hp: 900, exp: 60, speed: 46, aggro: 220, contactDmg: 30, hitCooldown: .9, pounce: r }), yl_tran_son_bia: { name: "Trấn Sơn Bia", level: 12, sprite: { w: 44, h: 104, ax: 22, ay: 100 }, drawScale: 1.1, barY: 124, barW: 44, hp: 1500, exp: 80, speed: 0, aggro: 0, contactDmg: 0, hitCooldown: 99, wanderRadius: 0, wanderPause: 99, bodyRadius: 18, respawnSec: 0, khongNhan: !0, yenLang: !0, tru: !0, truBan: !0 }, yl_ho_ve: d("Xà Tộc Hộ Vệ", "xa", "thiet_dao", "phong", { level: 12, drawScale: 1.15, barY: 58, barW: 26, hp: 900, exp: 70, speed: 48, aggro: 260, leashRange: 900, contactDmg: 34, hitCooldown: .9, pounce: r }), yl_toc_truong: { name: "Tộc Trưởng · Yêu Thú Cấp 2 Biến Dị", level: 13, tuSi: { gender: "male", hair: "toc_truong_mao", hairColor: "hac", beard: "none", outfit: "toc_truong_y", skin: "light", shoes: "ink", weapon: "huyet_ma_liem" }, honQuanh: { n: 5, rx: 34, ry: 15, z: 26, w: .9 }, sprite: { w: 32, h: 64, ax: 16, ay: 62 }, drawScale: 1.7, barY: 118, barW: 60, shadow: { rx: 24, ry: 6 }, hp: 4200, exp: 320, speed: 46, aggro: 460, leashRange: 4e3, wanderRadius: 20, wanderPause: 1.2, contactDmg: 44, hitCooldown: .8, hitRadius: 30, pounce: r, tuyetChieu: { kieu: "vo_cao", ten: "Ma Bạo Diệt Thế", tim: !0, from: .05, to: .1, windup: 1.5, radius: 140, range: 420, maxTargets: 6, matPct: .6 }, hoVe: "yl_tran_son_bia", respawnSec: 0, isBoss: !0, announceKill: !1, khongNhan: !0, yenLang: !0 }, htd_tieu_ve: { name: "Sỹ Sách Tiểu Vệ", level: 12, tuSi: { gender: "male", hair: "thanh_van_bien", hairColor: "hac", beard: "none", outfit: "thanh_tam_y", skin: "light", shoes: "ink", weapon: "luc_tinh_kiem" }, sprite: { w: 32, h: 64, ax: 16, ay: 62 }, barY: 50, hp: 320, exp: 14, speed: 58, aggro: 160, contactDmg: 15, hitCooldown: .95, wanderRadius: 60, wanderPause: 1.8, respawnSec: 0, khongNhan: !0, huThien: !0 }, htd_thu_ve: { name: "Sỹ Sách Thủ Vệ", level: 12, tuSi: { gender: "male", hair: "long_tuong_khan", hairColor: "hac", beard: "ria_kiem", outfit: "long_tuong_y", skin: "light", shoes: "ink", weapon: "hoa_kim_thuong" }, sprite: { w: 32, h: 64, ax: 16, ay: 62 }, drawScale: 1.15, barY: 58, barW: 24, hp: 960, exp: 40, speed: 56, aggro: 190, contactDmg: 18, hitCooldown: .9, wanderRadius: 50, wanderPause: 2, respawnSec: 0, khongNhan: !0, huThien: !0 }, htd_ve_nhan: { name: "Trận Nhãn Vệ", level: 12, tuSi: { gender: "male", hair: "thien_luan_toc", hairColor: "hac", beard: "none", outfit: "thien_luan_kiem_y", skin: "tan", shoes: "ink", weapon: "bang_linh_kiem" }, sprite: { w: 32, h: 64, ax: 16, ay: 62 }, barY: 50, hp: 320, exp: 16, speed: 60, aggro: 170, contactDmg: 15, hitCooldown: .9, wanderRadius: 36, wanderPause: 2, fireNova: { trongTai: !0, cooldown: 7, windup: 1.2, range: 170, radius: 64, dmg: 0, burnTime: 0, burnDps: 0 }, respawnSec: 0, khongNhan: !0, huThien: !0 }, htd_thach_ma: { name: "Thạch Ma Cổ Cảnh", level: 13, sprite: { w: 96, h: 82, ax: 48, ay: 82 }, barY: 88, barW: 40, drawScale: 1.6, shadow: { rx: 34, ry: 6 }, thanDa: !0, hp: 4800, exp: 150, speed: 42, aggro: 230, leashRange: 600, contactDmg: 30, hitCooldown: .9, wanderRadius: 20, wanderPause: 1.2, fireNova: { trongTai: !0, tim: !0, cooldown: 9, windup: 1.4, range: 220, radius: 84, dmg: 0, burnTime: 0, burnDps: 0 }, respawnSec: 0, isBoss: !0, announceKill: !1, khongNhan: !0, huThien: !0 }, htd_dinh: { name: "Sỹ Sách Đỉnh", level: 13, sprite: { w: 116, h: 144, ax: 58, ay: 144 }, barY: 152, barW: 64, hp: 19200, exp: 300, speed: 0, aggro: 0, contactDmg: 0, hitCooldown: 99, wanderRadius: 0, wanderPause: 99, bodyRadius: 30, fireNova: { trongTai: !0, cooldown: 20, windup: 2, range: -1, radius: 170, dmg: 0, burnTime: 0, burnDps: 0 }, respawnSec: 0, isBoss: !0, announceKill: !1, khongNhan: !0, huThien: !0 }, htd_hu_anh: { name: "Hư Ảnh", level: 12, tuSi: { gender: "male", hair: "hoat_tu_toc_mat_na", hairColor: "hac", beard: "none", outfit: "hoat_tu_y", skin: "light", shoes: "ink", weapon: "luc_doc_cham" }, sprite: { w: 32, h: 64, ax: 16, ay: 62 }, barY: 50, hp: 240, exp: 6, speed: 84, aggro: 280, leashRange: 900, contactDmg: 12, hitCooldown: .8, wanderRadius: 30, wanderPause: .8, respawnSec: 0, khongNhan: !0, huThien: !0 }, htd_tru_bang: { name: "Trụ Băng", level: 15, sprite: { w: 44, h: 104, ax: 22, ay: 100 }, drawScale: 1.45, barY: 150, barW: 58, hp: 7e4, exp: 300, speed: 0, aggro: 0, contactDmg: 0, hitCooldown: 99, wanderRadius: 0, wanderPause: 99, bodyRadius: 20, respawnSec: 0, khongNhan: !0, huThien: !0, tru: !0, truBan: !0 }, htd_tru_hoa: { name: "Trụ Hoả", level: 15, sprite: { w: 44, h: 104, ax: 22, ay: 100 }, drawScale: 1.45, barY: 150, barW: 58, hp: 7e4, exp: 300, speed: 0, aggro: 0, contactDmg: 0, hitCooldown: 99, wanderRadius: 0, wanderPause: 99, bodyRadius: 20, respawnSec: 0, khongNhan: !0, huThien: !0, tru: !0, truBan: !0 }, tm_tru: { name: "Trụ Trấn Mạch", level: 15, sprite: { w: 44, h: 104, ax: 22, ay: 100 }, drawScale: 1.45, barY: 150, barW: 58, hp: a.TranMach && a.TranMach.LUAT.HP || 3240, exp: 0, speed: 0, aggro: 0, contactDmg: 0, hitCooldown: 99, wanderRadius: 0, wanderPause: 99, bodyRadius: 20, baoKich: { ten: "Trấn Mạch Chấn", cooldown: a.TranMach && a.TranMach.LUAT.DON_HOI_CHIEU || 5, delay: 2, radius: a.TranMach && a.TranMach.LUAT.DON_BAN_KINH || 190, maxTargets: a.TranMach && a.TranMach.LUAT.DON_TOI_DA_NGUOI || 6, dmg: a.TranMach && a.TranMach.LUAT.DON_DAME || 90, hitsMin: 1, hitsMax: 2, gap: .6, dot: 1, gapDot: 1.2 }, respawnSec: 0, khongNhan: !0, tru: !0, tranMach: !0, khu1Only: !0 } };
  if ((e = a.VanTieu)) {
    e.HANG.forEach(function (n) {
      a.ENEMY_DEFS["tieu_xa_" + n.id] = { name: "Tiêu Xa " + n.ten, level: 15, sprite: { w: 64, h: 52, ax: 32, ay: 46 }, barY: { trang: 72, luc: 80, do: 92, vang: 100 }[n.id], barW: 40, shadow: { rx: 40, ry: 5, dx: -6, dy: 1 }, hp: e.hpXe(n.id), exp: 0, speed: 0, aggro: 0, contactDmg: 0, hitCooldown: 99, wanderRadius: 0, wanderPause: 99, bodyRadius: 16, respawnSec: 0, khongNhan: !0, tieuXa: !0, tieuXaHang: n.id };
    });
  }
  n = a.ENEMY_DEFS.ngan_mao_hong;
  t = 1.9;
  a.ENEMY_DEFS.htd_loi_thu = { name: "Lôi Thú · Cổ Tu Hộ Pháp", level: 13, anhMob: "ngan_mao_hong", locMau: "sepia(0.7) hue-rotate(185deg) saturate(3) brightness(1.15) contrast(1.1)", sprite: { w: Math.round(n.sprite.w * t), h: Math.round(n.sprite.h * t), ax: Math.round(n.sprite.ax * t), ay: Math.round(n.sprite.ay * t) }, barY: Math.round(n.barY * t), barW: 56, sheet: n.sheet, drawScale: t, shadow: { rx: 34, ry: 8 }, hp: 12800, exp: 400, speed: 52, aggro: 420, leashRange: 2e3, contactDmg: 40, hitCooldown: .9, wanderRadius: 30, wanderPause: 1, pounce: r, baoKich: { ten: "Lôi Hống", cooldown: 10, delay: 6, radius: 140, maxTargets: 5, mult: 1.2, hitsMin: 2, hitsMax: 3, gap: .6 }, tuyetChieu: { kieu: "vo_cao", ten: "Lôi Thiên Phạt", from: .1, to: .2, windup: 1.6, radius: 140, range: 420, maxTargets: 6 }, respawnSec: 0, isBoss: !0, announceKill: !1, khongNhan: !0, huThien: !0 };
  var c = a.Enemy = {};
  c.create = function (e) {
    var n = a.ENEMY_DEFS[e.type];
    var t = n;
    if (e.noRespawn && !e.huyetSac) {
      (t = Object.create(n)).respawnSec = 0;
    }
    if (e.huyetSac) {
      (t = Object.create(n)).respawnSec = 0;
      if (n.isBoss) {
        t.hp = 2 * n.hp;
        t.contactDmg = 2 * n.contactDmg;
        if (n.pounce) {
          t.aggro = Math.max(n.aggro || 0, 360);
          t.leashRange = 4e3;
        }
        if (n.fireNova) {
          t.fireNova = Object.create(n.fireNova);
          if ("number" == typeof n.fireNova.dmg) {
            t.fireNova.dmg = 2 * n.fireNova.dmg;
          }
          if ("number" == typeof n.fireNova.burnDps) {
            t.fireNova.burnDps = 2 * n.fireNova.burnDps;
          }
        }
      }
    }
    return { id: e.id, type: e.type, def: t, stoneChance: e.stoneChance, hp: t.hp, hpMax: t.hp, homeX: e.x, homeY: e.y, x: e.x, y: e.y, dir: 1, state: "idle", animTime: 6 * Math.random(), wanderTx: e.x, wanderTy: e.y, wanderTimer: 1.5 * Math.random(), hitTimer: 0, flinchUntil: -99, flinchX: 0, flinchY: 0, attackState: "none", atkVariant: 0, ttlGiay: null, bkCd: 0, bkSeq: 0, novaCd: 0, novaWind: 0, novaX: 0, novaY: 0, novaSeq: 0, tcWind: 0, tcX: 0, tcY: 0, tcSeq: 0, stuckT: 0, pounceCd: 0, pounceWind: 0, pounceX: 0, pounceY: 0, pounceSeq: 0, returnStuckT: 0, telegraphT: 0, fleeT: 0, fleeSeq: 0, lastMoveX: 0, lastMoveY: 1, burnT: 0, burnDps: 0, burnTick: 1, poisonT: 0, poisonDps: 0, poisonTick: 1, slowT: 0, slowMult: 1, stunT: 0, freezeT: 0, dead: !1, respawnAt: 0, bienDi: !1, defGoc: null };
  };
  var f = [];
  c.datBienDi = function (a, e) {
    var n = a.defGoc || a.def;
    return !(!n || !n.bienDi || (e ? (a.defGoc = n, a.def = function (a) {
      for (var e = 0; e < f.length; e++)
        if (f[e].goc === a) {
          return f[e].bd;
        }
      var n = a.bienDi;
      var t = n.scale || 1;
      var i = Object.create(a);
      i.name = a.name + " · " + (n.ten || "Biến Dị");
      i.hp = Math.round(a.hp * (n.hp || 1));
      i.contactDmg = Math.round(a.contactDmg * (n.dmg || 1));
      i.exp = Math.round(a.exp * (n.exp || 1));
      if (n.stones) {
        i.stones = n.stones;
      }
      if (n.anhMob) {
        i.anhMob = n.anhMob;
      }
      if (1 !== t && a.sprite) {
        i.sprite = { w: Math.round(a.sprite.w * t), h: Math.round(a.sprite.h * t), ax: Math.round(a.sprite.ax * t), ay: Math.round(a.sprite.ay * t) };
        if (a.shadow) {
          i.shadow = { rx: Math.round(a.shadow.rx * t), ry: Math.round(a.shadow.ry * t) };
        }
        i.barY = Math.round((a.barY || 16) * t) + 4;
        if (a.hitRadius) {
          i.hitRadius = Math.round(a.hitRadius * t);
        }
      }
      i.laBienDi = !0;
      f.push({ goc: a, bd: i });
      return i;
    }(n), a.bienDi = !0) : a.defGoc && (a.def = a.defGoc, a.bienDi = !1), a.hpMax = a.def.hp, !a.bienDi));
  };
  var p = { list: null, n: 0, at: null };
  function g(a) {
    p.list = a;
    p.n = 0;
    p.at = Object.create(null);
  }
  function m(a) {
    for (; p.n < a.length; p.n++) {
      var e = a[p.n];
      if (e && !(e.id in p.at)) {
        p.at[e.id] = p.n;
      }
    }
  }
  c.find = function (a, e) {
    if (!a || null == e) {
      return null;
    }
    if ((p.list !== a || a.length < p.n)) {
      g(a);
    }
    m(a);
    var n = p.at[e];
    if (void 0 === n) {
      return null;
    }
    var t = a[n];
    if (t && t.id === e) {
      return t;
    }
    g(a);
    m(a);
    for (var i = 0; i < a.length; i++)
      if (a[i] && a[i].id === e) {
        return a[i];
      }
    return null;
  };
  c.update = function (e, n, t, i, o) {
    if (e.dead) {
      if (o >= e.respawnAt) {
        e.dead = !1;
        e.hp = e.hpMax;
        e.x = e.homeX;
        e.y = e.homeY;
        e.state = "idle";
        e.wanderTx = e.homeX;
        e.wanderTy = e.homeY;
        e.wanderTimer = .4;
        e.hitTimer = 0;
        e.fleeT = 0;
        e.flinchUntil = -99;
        e.aggroUntil = 0;
        e.burnT = e.poisonT = e.slowT = e.stunT = e.freezeT = e.rootT = 0;
        e.poisonDps = 0;
        e.poisonTick = 1;
        e.slowMult = 1;
      }
    }
    else {
      var r = e.def;
      var h = a.CONFIG.ENEMY;
      if (e.animTime += n, e.hitTimer > 0 && (e.hitTimer -= n), e.tcWind > 0) {
        e.attackState = "none";
        return void (e.telegraphT = 0);
      }
      if (e.stunT > 0) {
        e.attackState = "none";
        return void (e.telegraphT = 0);
      }
      if (t.downed) {
        e.attackState = "none";
        e.telegraphT = 0;
        if ("chase" === e.state) {
          e.state = "return";
        }
      }
      var l = t.x - e.x;
      var d = t.y - e.y;
      var s = Math.sqrt(l * l + d * d);
      var u = r.hitRadius || h.HIT_RADIUS;
      var f = r.leashRange || h.LEASH_RANGE;
      if (r.fireNova && !r.fireNova.trongTai) {
        var p = r.fireNova;
        if (e.novaCd > 0 && (e.novaCd -= n), e.novaWind > 0) {
          if (e.novaWind -= n, e.novaWind <= 0) {
            e.novaWind = 0;
            e.novaCd = p.cooldown;
            e.novaSeq = (e.novaSeq || 0) + 1;
            var g = t.x - e.novaX;
            var m = t.y - e.novaY;
            if (!t.downed && Math.sqrt(g * g + m * m) <= p.radius) {
              a.Player.takeDamage(t, p.dmg);
              if (a.Player.applyBurn) {
                a.Player.applyBurn(t, p.burnTime, p.burnDps);
              }
            }
          }
          return;
        }
        if (e.novaCd <= 0 && !t.downed && e.hitTimer <= 0 && s <= p.range) {
          e.novaWind = p.windup;
          e.novaX = t.x;
          e.novaY = t.y;
          e.attackState = "none";
          return void (e.telegraphT = 0);
        }
      }
      if (r.pounce) {
        var _ = r.pounce;
        if (e.pounceCd > 0 && (e.pounceCd -= n), e.pounceWind > 0) {
          if (e.pounceWind -= n, e.pounceWind <= 0) {
            e.pounceWind = 0;
            e.pounceCd = _.cooldown;
            e.stuckT = 0;
            if (e.pounceVe) {
              e.x = e.pounceVe.x;
              e.y = e.pounceVe.y;
              e.pounceVe = null;
            }
            else {
              e.x = e.pounceX;
              e.y = e.pounceY;
            }
            e.state = "chase";
            e.pounceSeq = (e.pounceSeq || 0) + 1;
            e.hitTimer = r.hitCooldown;
            var y = t.x - e.pounceX;
            var b = t.y - e.pounceY;
            if (!t.downed && Math.sqrt(y * y + b * b) <= _.radius) {
              a.Player.takeDamage(t, r.contactDmg);
            }
          }
          return;
        }
        if (e.pounceCd <= 0 && e.stuckT >= _.stuckSec && "chase" === e.state && !(e.rootT > 0) && !t.downed && s > u && s <= _.range) {
          var v = c.pounceLanding(e, t, i);
          if (v) {
            e.pounceVe = null;
          }
          else {
            v = { x: Math.round(t.x), y: Math.round(t.y) };
            e.pounceVe = { x: e.x, y: e.y };
          }
          e.pounceWind = _.windup;
          e.pounceX = v.x;
          e.pounceY = v.y;
          e.attackState = "none";
          return void (e.telegraphT = 0);
        }
      }
      if ("telegraph" === e.attackState) {
        e.telegraphT += n;
        return void (e.telegraphT >= h.TELEGRAPH_TIME && (e.attackState = "none", e.hitTimer = r.hitCooldown, t.hurtTimer <= 0 && !t.downed && s < u ? a.Player.takeDamage(t, r.contactDmg) : !t.downed && t.hpMax > 0 && s >= u && s < 3 * u && a.Player.onDodge && a.Player.onDodge(t)));
      }
      var x = 0;
      var M = 0;
      var k = r.aggro > 0 && e.aggroUntil > o ? Math.max(r.aggro, w) : r.aggro;
      var T = e.x - e.homeX;
      var S = e.y - e.homeY;
      var P = Math.sqrt(T * T + S * S);
      if (r.flee) {
        var C = r.flee;
        var D = e.flinchUntil > o;
        var A = "chinh" === C.tu ? !!t.kiemHap : !!t.honPhien;
        var Y = !t.downed && s < C.radius && A;
        if ((D || Y) && ("flee" !== e.state && (e.fleeSeq = 1 + (0 | e.fleeSeq)), e.state = "flee", e.fleeT = C.time), "flee" === e.state) {
          if (e.attackState = "none", e.telegraphT = 0, e.fleeT -= n, !(e.fleeT <= 0)) {
            var N = -l;
            var R = -d;
            var H = Math.sqrt(N * N + R * R);
            if (H < .5) {
              N = T || 1;
              R = S || 0;
              H = Math.sqrt(N * N + R * R) || 1;
            }
            var I = C.speed * (e.slowT > 0 && e.slowMult || 1) * (e.rootT > 0 ? 0 : 1);
            var L = e.x + N / H * I * n;
            var F = e.y + R / H * I * n;
            if (!(i.rectBlocked(L - 5, F - 6, L + 5, F))) {
              e.x = L;
            }
            if (!(i.rectBlocked(e.x - 5, F - 6, e.x + 5, F))) {
              e.y = F;
            }
            e.dir = N >= 0 ? 1 : -1;
            e.lastMoveX = N / H;
            return void (e.lastMoveY = R / H);
          }
          e.state = "return";
        }
      }
      if ("return" === e.state) {
        if (P > 4) {
          x = -T / P;
          M = -S / P;
        }
        else {
          e.state = "idle";
        }
      }
      else if (r.aggro > 0 && !t.downed && s < k && P < f) {
        e.state = "chase";
        if (s > 4) {
          x = l / s;
          M = d / s;
        }
      }
      else if (r.aggro > 0 && "chase" === e.state && P >= f) {
        e.state = "return";
        x = -T / P;
        M = -S / P;
      }
      else {
        if (e.wanderTimer -= n, e.wanderTimer <= 0) {
          e.wanderTimer = r.wanderPause + Math.random() * r.wanderPause;
          var B = Math.random() * Math.PI * 2;
          var O = Math.random() * r.wanderRadius;
          e.wanderTx = e.homeX + Math.cos(B) * O;
          e.wanderTy = e.homeY + Math.sin(B) * O;
        }
        var X = e.wanderTx - e.x;
        var W = e.wanderTy - e.y;
        var E = Math.sqrt(X * X + W * W);
        if (E > 2) {
          e.state = "wander";
          x = X / E;
          M = W / E;
        }
        else {
          e.state = "idle";
        }
      }
      if (0 !== x || 0 !== M) {
        e.dir = x >= 0 ? 1 : -1;
        e.lastMoveX = x;
        e.lastMoveY = M;
        var K = r.speed * (e.slowT > 0 && e.slowMult || 1) * (e.rootT > 0 ? 0 : 1);
        var q = e.x + x * K * n;
        var V = e.y + M * K * n;
        if (!(i.rectBlocked(q - 5, V - 6, q + 5, V))) {
          e.x = q;
        }
        if (!(i.rectBlocked(e.x - 5, V - 6, e.x + 5, V))) {
          e.y = V;
        }
      }
      if (r.pounce) {
        var G = r.speed * (e.slowT > 0 && e.slowMult || 1) * n;
        if ("chase" !== e.state || t.downed || !(s > u) || e.rootT > 0) {
          e.stuckT = 0;
        }
        else {
          var U = t.x - e.x;
          var j = t.y - e.y;
          if (s - Math.sqrt(U * U + j * j) < G * r.pounce.progress) {
            e.stuckT += n;
          }
          else {
            e.stuckT = Math.max(0, e.stuckT - 2 * n);
          }
        }
        if ("return" === e.state) {
          var Q = e.x - e.homeX;
          var z = e.y - e.homeY;
          var $ = P - Math.sqrt(Q * Q + z * z);
          e.returnStuckT = $ < G * r.pounce.progress ? e.returnStuckT + n : 0;
          if (e.returnStuckT >= 3) {
            e.x = e.homeX;
            e.y = e.homeY;
            e.state = "idle";
            e.returnStuckT = 0;
          }
        }
        else {
          e.returnStuckT = 0;
        }
      }
      var J = !(r.isBoss && r.tuSi);
      if (e.hitTimer <= 0 && (!J || t.hurtTimer <= 0) && !t.downed && s < u) {
        if (r.sheet && r.sheet.attackAnims) {
          e.atkVariant = (1 + (0 | e.atkVariant)) % r.sheet.attackAnims.length;
        }
        e.attackState = "telegraph";
        e.telegraphT = 0;
      }
    }
  };
  c.pounceLanding = function (a, e, n) {
    for (var t = a.def.pounce && a.def.pounce.radius || 40, i = a.x - e.x, o = a.y - e.y, r = Math.sqrt(i * i + o * o) || 1, h = [{ x: e.x + i / r * 14, y: e.y + o / r * 14 }, { x: e.x, y: e.y }], l = [16, 28], d = 0; d < l.length; d++)
      for (var s = 0; s < 8; s++) {
        var u = s * Math.PI / 4;
        h.push({ x: e.x + Math.cos(u) * l[d], y: e.y + Math.sin(u) * l[d] * .8 });
      }
    for (var c = null, f = 0; f < h.length; f++) {
      var p = h[f];
      var g = Math.round(p.x);
      var m = Math.round(p.y);
      if (!n.rectBlocked(g - 5, m - 6, g + 5, m)) {
        var w = g - e.x;
        var _ = m - e.y;
        if (!(Math.sqrt(w * w + _ * _) > t - 4)) {
          if (!n.lineClear || n.lineClear(g, m - 3, e.x, e.y - 3, 5, 3)) {
            return { x: g, y: m };
          }
          if (!(c)) {
            c = { x: g, y: m };
          }
        }
      }
    }
    return c;
  };
  c.flinch = function (e, n, t, i) {
    if (e && !e.dead)
      if (e.flinchUntil = n + a.CONFIG.ENEMY.FLINCH_TIME, void 0 !== t && void 0 !== i) {
        var o = e.x - t;
        var r = e.y - i;
        var h = Math.hypot(o, r);
        if (h < .5) {
          e.flinchX = e.flinchY = 0;
        }
        else {
          e.flinchX = o / h;
          e.flinchY = r / h;
        }
      }
      else {
        e.flinchX = e.flinchY = 0;
      }
  };
  var w = 480;
  function _(e, n, t, i, r, h) {
    for (var l = n.def.honQuanh, d = a.AmHon, s = d && a.Assets && a.Assets.get ? a.Assets.get(d.PATH) : null, u = l.n || 5, c = l.w || .9, f = 0; f < u; f++) {
      var p = r * c + f * Math.PI * 2 / u;
      var g = Math.sin(p);
      if (g < 0 === h) {
        var m = Math.round(t + Math.cos(p) * l.rx);
        var w = Math.round(i + g * l.ry);
        var _ = Math.round(2 * Math.sin(2.6 * r + 1.3 * f));
        if (o.ellipse(e, m, w + 1, 9, 3, "rgba(20,6,10,0.3)", null), s) {
          var y = d.SHEET;
          var b = d.BOX;
          var v = Math.floor(r * y.fps + 3 * f) % y.frames;
          e.save();
          e.globalAlpha = .92;
          e.imageSmoothingEnabled = !1;
          e.drawImage(s, v % y.cols * y.fw, Math.floor(v / y.cols) * y.fh, y.fw, y.fh, m - b.ax, w - b.ay - l.z + _, b.w, b.h);
          e.restore();
        }
        else {
          o.ellipse(e, m, w - l.z - 16 + _, 10, 11, "#c22333", "#3d0810");
          o.dot(e, m - 4, w - l.z - 18 + _, "#ff7a6a");
          o.dot(e, m + 4, w - l.z - 18 + _, "#ff7a6a");
        }
      }
    }
  }
  c.KHIEU_SEC = 8;
  c.hit = function (e, n, t) {
    if (e.dead) {
      return !1;
    }
    if (n > 0 && null != t && (e.aggroUntil = t + 8), e.hp -= n, e.hp > 0) {
      return !1;
    }
    e.dead = !0;
    var i = e.def.respawnSec;
    if (null == i) {
      i = a.CONFIG.ENEMY.RESPAWN_SEC;
    }
    e.respawnAt = i > 0 ? t + i : 1 / 0;
    return !0;
  };
  c.bossLabel = function (a) {
    var e = String(a && a.name || "Boss");
    var n = e.match(/^(.*?)\s*[·|]\s*(Yêu Thú Cấp\s*\d+)\s*$/);
    return n ? { ten: n[1].replace(/\s*·\s*/g, " · ").trim(), cap: n[2] } : { ten: e.split("·")[0].trim(), cap: null };
  };
  c.draw = function (e, n, t, r, h) {
    if (!e.dead) {
      var l = Math.round(e.x - t);
      var d = Math.round(e.y - r);
      var s = 1 * Math.sin(3 * h + e.homeX);
      var u = (e.flinchUntil - h) / a.CONFIG.ENEMY.FLINCH_TIME;
      var f = u > 0 ? Math.min(1, u) : 0;
      e.giatNow = f;
      e.drawTime = h;
      c.theoDoiChem(e, h);
      var p = e.def.sheet;
      if (p && p.anims && p.anims.attack) {
        var g = "telegraph" === e.attackState;
        if (!(!g || e.atkWasTele && h >= e.atkAnimAt)) {
          e.atkAnimAt = h;
          e.atkAnimVar = 0 | e.atkVariant;
        }
        e.atkWasTele = g;
      }
      var m = !!a.Quality && 0 === a.Quality.tier;
      var w = e.def.shadow;
      if (!(m)) {
        if (w) {
          a.Pixel.ellipse(n, l + (w.dx || 0) * (e.dir < 0 ? -1 : 1), d - (w.dy || 0), w.rx, w.ry, a.Palette.WORLD.shadow, null);
        }
        else {
          a.Pixel.ellipse(n, l, d - 1, 6, 2, a.Palette.WORLD.shadow, null);
        }
      }
      var y = e.def.barW || 14;
      var v = l - y / 2;
      var x = d - (e.def.barY || 16);
      var M = !!e.def.isBoss || /Yêu Thú Cấp/.test(e.def.name || "");
      if (M) {
        v = l - (y = Math.max(y, 56)) / 2;
      }
      var k = !!e.bienDi && !M;
      if (k) {
        v = l - (y = Math.max(y, 48)) / 2;
      }
      var T = M || k ? 4 : 2;
      a.Pixel.r(n, v - 1, x - 1, y + 2, T + 2, "#1a1410");
      a.Pixel.r(n, v, x, y, T, "#5a1c16");
      a.Pixel.r(n, v, x, Math.max(0, Math.round(y * e.hp / e.hpMax)), T, f ? "#ffd9d0" : "#e0604a");
      var S = x - 4;
      if (e.def.human && !M && (a.Pixel.text(n, l, S, e.def.name, "#d8d2c4", "#1a1712", "400 10px " + a.Pixel.MAP_FONT, "center"), S -= 12), e.def.tuSi && !M && (a.Pixel.text(n, l, S, e.def.name, "#f0a08a", "#1a0c08", "400 10px " + a.Pixel.MAP_FONT, "center"), S -= 12), e.def.tieuXa) {
        var P = a.VanTieu && a.VanTieu.hang(e.def.tieuXaHang);
        a.Pixel.text(n, l, S, e.def.name, P ? P.mau : "#ece8dc", "#1a1208", "700 10px " + a.Pixel.MAP_FONT, "center");
        S -= 12;
      }
      if (M) {
        var C = c.bossLabel(e.def);
        if (C.cap) {
          a.Pixel.text(n, l, S, C.cap, "#ff8a6a", "#1a0c08", "400 9px " + a.Pixel.MAP_FONT, "center");
          S -= 11;
        }
        a.Pixel.text(n, l, S, C.ten, "#ffd98a", "#1a1208", "700 11px " + a.Pixel.MAP_FONT, "center");
        S -= 13;
      }
      if (k) {
        var D = e.defGoc || e.def;
        a.Pixel.text(n, l, S, String(e.def.bienDi && e.def.bienDi.ten || "Biến Dị"), Math.sin(6 * h) > -.4 ? "#ff6a5a" : "#ffb0a0", "#1a0806", "700 10px " + a.Pixel.MAP_FONT, "center");
        S -= 11;
        a.Pixel.text(n, l, S, D.name, "#ffd98a", "#1a1208", "700 11px " + a.Pixel.MAP_FONT, "center");
        S -= 13;
      }
      if (null != e.ttlGiay && a.MaBao) {
        var A = a.MaBao.nhanGiay(e.ttlGiay);
        if (A) {
          a.Pixel.text(n, l, S, "Còn " + A, "#c9a6ff", "#1a1030", "400 9px " + a.Pixel.MAP_FONT, "center");
        }
      }
      if (e.novaWind > 0 && e.def.fireNova) {
        var R = e.def.fireNova;
        var H = Math.round(e.novaX - t);
        var I = Math.round(e.novaY - r);
        var L = Math.max(0, Math.min(1, e.novaWind / R.windup));
        var F = .72 + .28 * Math.sin(h * (14 - 9 * L));
        var B = R.tim ? ["150,40,220", "200,120,255", "230,180,255", "245,225,255"] : ["235,70,20", "255,150,45", "255,210,90", "255,240,170"];
        a.Pixel.ellipse(n, H, I, R.radius, .5 * R.radius, "rgba(" + B[0] + "," + (.3 + .2 * (1 - L)).toFixed(2) + ")", null);
        a.Pixel.ellipse(n, H, I, R.radius, .5 * R.radius, null, "rgba(" + B[1] + "," + F.toFixed(2) + ")");
        a.Pixel.ellipse(n, H, I, R.radius - 1, .5 * R.radius - 1, null, "rgba(" + B[2] + "," + (.8 * F).toFixed(2) + ")");
        a.Pixel.ellipse(n, H, I, R.radius * L, R.radius * L * .5, null, "rgba(" + B[3] + ",0.95)");
      }
      if (e.tcWind > 0 && e.def.tuyetChieu && "vo_cao" === e.def.tuyetChieu.kieu) {
        var O = e.def.tuyetChieu;
        var X = !!O.tim;
        var W = Math.round(e.tcX - t);
        var E = Math.round(e.tcY - r);
        var K = Math.max(0, Math.min(1, e.tcWind / O.windup));
        var q = .7 + .3 * Math.sin(h * (20 - 12 * K));
        var V = O.radius;
        var G = X ? "90,20,150" : "170,0,20";
        var U = X ? "190,90,255" : "255,40,60";
        var j = X ? "236,205,255" : "255,170,170";
        var Q = X ? "246,228,255" : "255,230,230";
        var z = X ? "205,120,255" : "255,60,70";
        if (a.Pixel.ellipse(n, W, E, V, .5 * V, "rgba(" + G + "," + (.2 + .3 * (1 - K)).toFixed(2) + ")", null), a.Pixel.ellipse(n, W, E, V, .5 * V, null, "rgba(" + U + "," + q.toFixed(2) + ")"), a.Pixel.ellipse(n, W, E, V - 1, .5 * V - 1, null, "rgba(" + j + "," + (.8 * q).toFixed(2) + ")"), a.Pixel.ellipse(n, W, E, V * K, V * K * .5, null, "rgba(" + Q + ",0.95)"), X) {
          if (e.tcWind <= .72 && !e.tcAn && a.VFX && a.VFX.spawnMaBaoAn) {
            e.tcAn = !0;
            for (var $ = { core: "#fbe8ff", mid: "#b04cff", edge: "#2a0638", glow: "#d27bff" }, J = [[0, 0], [-.55, 0], [.55, 0], [0, -.32], [0, .32]], Z = 0; Z < J.length; Z++)
              a.VFX.spawnMaBaoAn(e.tcX + J[Z][0] * V, e.tcY + J[Z][1] * V, { colors: $, radius: 60 });
          }
          for (var aa = 0; aa < 4; aa++) {
            var ea = 1.4 * h + aa * Math.PI / 4;
            a.Pixel.line(n, Math.round(W - Math.cos(ea) * V * .8), Math.round(E - Math.sin(ea) * V * .4), Math.round(W + Math.cos(ea) * V * .8), Math.round(E + Math.sin(ea) * V * .4), "rgba(" + U + "," + (.7 * q).toFixed(2) + ")");
          }
        }
        else {
          for (var na = -1; na <= 1; na++)
            a.Pixel.line(n, W - 34 + 16 * na, E - 22, W + 26 + 16 * na, E + 18, "rgba(255,60,70," + q.toFixed(2) + ")"), a.Pixel.line(n, W - 33 + 16 * na, E - 22, W + 27 + 16 * na, E + 18, "rgba(255,220,220," + (.7 * q).toFixed(2) + ")");
        }
        for (var ta = Math.round(e.x - t), ia = Math.round(e.y - r), oa = 0; oa < 12; oa += 2) {
          var ra = oa / 12;
          var ha = (oa + 1) / 12;
          a.Pixel.line(n, Math.round(ta + (W - ta) * ra), Math.round(ia + (E - ia) * ra), Math.round(ta + (W - ta) * ha), Math.round(ia + (E - ia) * ha), "rgba(" + z + ",0.8)");
        }
      }
      else if (e.tcWind > 0 && e.def.tuyetChieu) {
        var la = e.def.tuyetChieu;
        var da = Math.round(e.tcX - t);
        var sa = Math.round(e.tcY - r);
        var ua = Math.max(0, Math.min(1, e.tcWind / la.windup));
        var ca = .7 + .3 * Math.sin(h * (18 - 12 * ua));
        var fa = la.radius;
        a.Pixel.ellipse(n, da, sa, fa, .5 * fa, "rgba(200,30,10," + (.18 + .27 * (1 - ua)).toFixed(2) + ")", null);
        a.Pixel.ellipse(n, da, sa, fa, .5 * fa, null, "rgba(255,90,30," + ca.toFixed(2) + ")");
        a.Pixel.ellipse(n, da, sa, fa - 1, .5 * fa - 1, null, "rgba(255,200,80," + (.85 * ca).toFixed(2) + ")");
        a.Pixel.ellipse(n, da, sa, fa - 2, .5 * fa - 2, null, "rgba(255,90,30," + (.6 * ca).toFixed(2) + ")");
        a.Pixel.ellipse(n, da, sa, fa * ua, fa * ua * .5, null, "rgba(255,240,170,0.95)");
        for (var pa = 0; pa < 18; pa++) {
          var ga = .55 + pa % 5 * .09;
          var ma = (h + .37 * pa) % ga / ga;
          var wa = (D = 2.39996 * pa + 1.7 * Math.floor((h + .37 * pa) / ga), fa * Math.sqrt(.618 * pa % 1));
          var _a = da + Math.cos(D) * wa;
          var ya = sa + Math.sin(D) * wa * .5;
          var ba = 150 * (1 - ma);
          var va = _a - 40 * (1 - ma);
          a.Pixel.line(n, Math.round(va + 10), Math.round(ya - ba - 22), Math.round(va), Math.round(ya - ba), "rgba(255,140,40,0.55)");
          a.Pixel.ellipse(n, Math.round(va), Math.round(ya - ba), 3, 3, "#ffd76a", "#ff5a1a");
          if (ma > .85) {
            a.Pixel.ellipse(n, Math.round(_a), Math.round(ya), 7, 3, "rgba(255,120,30,0.6)", null);
          }
        }
      }
      if (e.pounceWind > 0 && e.def.pounce) {
        var xa = e.def.pounce;
        var Ma = Math.round(e.pounceX - t);
        var ka = Math.round(e.pounceY - r);
        var Ta = Math.max(0, Math.min(1, e.pounceWind / xa.windup));
        var Sa = .72 + .28 * Math.sin(h * (16 - 10 * Ta));
        var Pa = xa.radius;
        var Ca = "rgba(170,20,40," + (.26 + .22 * (1 - Ta)).toFixed(2) + ")";
        var Da = "rgba(255,70,80," + Sa.toFixed(2) + ")";
        var Aa = "rgba(255,235,235,0.95)";
        var Ya = "rgba(255,220,220," + Sa.toFixed(2) + ")";
        if ("xich_mang_vuong" === e.type) {
          Ca = "rgba(20,91,44," + (.28 + .2 * (1 - Ta)).toFixed(2) + ")";
          Da = "rgba(82,224,112," + Sa.toFixed(2) + ")";
          Aa = "rgba(222,255,190,0.95)";
          Ya = "rgba(174,255,136," + Sa.toFixed(2) + ")";
        }
        else {
          if ("thach_mach_vuong" === e.type) {
            Ca = "rgba(92,67,32," + (.28 + .2 * (1 - Ta)).toFixed(2) + ")";
            Da = "rgba(210,173,104," + Sa.toFixed(2) + ")";
            Aa = "rgba(255,240,189,0.95)";
            Ya = "rgba(255,220,150," + Sa.toFixed(2) + ")";
          }
          else {
            if ("u_minh_cu_mang" === e.type) {
              Ca = "rgba(20,45,78," + (.28 + .2 * (1 - Ta)).toFixed(2) + ")";
              Da = "rgba(83,154,219," + Sa.toFixed(2) + ")";
              Aa = "rgba(220,244,255,0.95)";
              Ya = "rgba(171,218,255," + Sa.toFixed(2) + ")";
            }
          }
        }
        a.Pixel.ellipse(n, Ma, ka, Pa, .5 * Pa, Ca, null);
        a.Pixel.ellipse(n, Ma, ka, Pa, .5 * Pa, null, Da);
        a.Pixel.ellipse(n, Ma, ka, Pa - 1, .5 * Pa - 1, null, Ya);
        a.Pixel.ellipse(n, Ma, ka, Pa * Ta, Pa * Ta * .5, null, Aa);
        var Na = Ya;
        var Ra = Math.round(Pa + 4);
        var Ha = Math.round(.5 * Pa + 3);
        a.Pixel.r(n, Ma - 1, ka - Ha - 4, 3, 4, Na);
        a.Pixel.r(n, Ma - 1, ka + Ha, 3, 4, Na);
        a.Pixel.r(n, Ma - Ra - 4, ka - 1, 4, 3, Na);
        a.Pixel.r(n, Ma + Ra, ka - 1, 4, 3, Na);
      }
      if ("telegraph" === e.attackState && Math.sin(40 * e.telegraphT) > 0) {
        a.Pixel.ellipse(n, l, d - 3, 8, 4, null, "rgba(224,60,60,0.55)");
      }
      if (e.def.flee && !e.dead && e.flinchUntil > h && e.keuLuc !== e.flinchUntil) {
        e.keuLuc = e.flinchUntil;
        if (a.VFX && a.VFX.spawnText) {
          a.VFX.spawnText(e.x, e.y - (e.def.barY || 16) - 14, "chinh" === e.def.flee.tu ? "Chạy mau!" : "Cứu với!", "#ffe0a8");
        }
      }
      if (e.def.truBan) {
        c.veTamTru(n, e, l, d, h, t, r);
      }
      if (!(m && !function (e) {
        var n = a.Targeting;
        if (n && n.currentEnemy && n.currentEnemy() === e) {
          return !0;
        }
        var t = a.SceneWorld && a.SceneWorld.player;
        if (!t) {
          return !0;
        }
        var i = e.x - t.x;
        var o = e.y - t.y;
        return i * i + o * o <= N * N;
      }(e))) {
        (function (a, e, n, t, r) {
          var h;
          var l;
          if (e.burnT > 0 && e.burnMa) {
            for (o.ellipse(a, n, t - 2, 9, 3, i.alpha("#1a0626", .45), null), h = 0; h < 4; h++) {
              var d = 5 + 5 * Math.abs(Math.sin(8.2 * r + 1.9 * h));
              var s = n - 6 + 4 * h;
              o.taper(a, s, t - 3 - d, 1, 3, d, h % 2 ? "#3a1150" : "#2a0b3d", null);
              o.taper(a, s, t - 2 - .7 * d, 1, 1, Math.round(.7 * d), "#9a5cff", null);
              o.dot(a, s, t - 3 - d, "#e7c9ff");
            }
            o.ellipse(a, n, t - 2, 8, 3, null, i.alpha("#b77dff", .35));
          }
          else if (e.burnT > 0) {
            for (h = 0; h < 3; h++) {
              var u = 4 + 4 * Math.abs(Math.sin(9 * r + 2.1 * h));
              var c = n - 5 + 5 * h;
              o.taper(a, c, t - 3 - u, 1, 3, u, "#ff9a3c", null);
              o.dot(a, c, t - 3 - u, "#fff3c4");
            }
            o.ellipse(a, n, t - 2, 8, 3, i.alpha("#d63b1f", .28), null);
          }
          if (e.poisonT > 0) {
            var f = .55 + .18 * Math.sin(7.5 * r);
            for (o.ellipse(a, n, t - 5, 9, 4, i.alpha("#4caf50", .18 * f), i.alpha("#9cf276", .62 * f)), h = 0; h < 3; h++) {
              var p = 3.2 * r + 2.1 * h;
              var g = n + Math.round(Math.cos(p) * (6 + h));
              var m = t - 9 - 8 * Math.abs(Math.sin(p)) - 2 * h;
              o.dot(a, g, m, i.alpha(1 === h ? "#e2ffae" : "#63d36a", f));
              if (1 !== h) {
                o.dot(a, g + 1, m - 1, i.alpha("#b7f58a", .7 * f));
              }
            }
          }
          if (e.woundT > 0) {
            for (o.ellipse(a, n, t - 1, 7, 2, i.alpha("#7a0f16", .35), null), h = 0; h < 3; h++) {
              var w = (1.6 * r + .37 * h) % 1;
              var _ = n - 6 + 6 * h;
              var y = t - 16 + Math.round(12 * w);
              o.dot(a, _, y, i.alpha("#d4202e", 1 - .6 * w));
              o.dot(a, _, y + 1, i.alpha("#7a0f16", 1 - .6 * w));
            }
          }
          if (e.slowT > 0) {
            for (o.ellipse(a, n, t - 1, 8, 3, i.alpha("#a9e4ff", .3), null), h = 0; h < 2; h++) {
              var b = n + (h ? 7 : -7);
              var v = t - 8;
              o.taper(a, b, v - 4, 1, 3, 5, "#cdf1ff", "#2f7fb8");
              o.dot(a, b, v - 4, "#ffffff");
            }
          }
          if (e.stunT > 0 && !(e.freezeT > 0)) {
            var x = t - (e.def.barY || 16) - 4;
            for (h = 0; h < 3; h++) {
              l = 5 * r + h * (2 * Math.PI / 3);
              var M = n + 9 * Math.cos(l);
              var k = x + 3 * Math.sin(l);
              o.dot(a, M, k, "#ffe9a8");
              o.dot(a, M - 1, k, "#f0d27a");
              o.dot(a, M + 1, k, "#f0d27a");
              o.dot(a, M, k - 1, "#f0d27a");
              o.dot(a, M, k + 1, "#f0d27a");
            }
          }
          if (e.freezeT > 0) {
            var T = .62 + .12 * Math.sin(11 * r);
            for (o.ellipse(a, n, t - 10, 10, 5, i.alpha("#55cfff", .14 * T), i.alpha("#a9efff", T)), h = 0; h < 6; h++) {
              l = h * Math.PI * 2 / 6 + Math.PI / 6;
              var S = n + 9 * Math.cos(l);
              var P = t - 10 + 10 * Math.sin(l);
              o.line(a, n + 3 * Math.cos(l), t - 10 + 3 * Math.sin(l), S, P, i.alpha(h % 2 ? "#55cfff" : "#e9fcff", T));
              o.dot(a, Math.round(S), Math.round(P), "#ffffff");
            }
          }
          if (e.linhAnUntil > Date.now()) {
            var C = t - (e.def.barY || 16) - 9;
            var D = .68 + .16 * Math.sin(8 * r);
            for (o.ellipse(a, n, C, 5, 2, i.alpha("#6e36a8", .28 * D), i.alpha("#d9a7ff", D)), h = 0; h < 4; h++) {
              l = 1.4 * r + h * Math.PI / 2;
              var A = Math.round(n + 5 * Math.cos(l));
              var Y = Math.round(C + 3 * Math.sin(l));
              o.line(a, n, C, A, Y, i.alpha("#d9a7ff", D));
              o.dot(a, A, Y, i.alpha(h % 2 ? "#f1dcff" : "#9a5cff", D));
            }
            o.dot(a, n, C, "#fff2ff");
          }
        })(n, e, l, d, h);
      }
      if (!(m)) {
        (function (a, e, n, t) {
          if (e && !e.dead) {
            var r = e.bienDi && Y[e.type + "_bd"] || Y[e.type];
            if (r && (!e.def || !e.def.thanDa || "thach_yeu" === e.type)) {
              var h;
              var l;
              var d;
              var s;
              var u;
              var c = e.def && e.def.drawScale || 1;
              var f = !(!e.def || !e.def.isBoss) || /Yêu Thú Cấp/.test(e.def && e.def.name || "") || !!e.bienDi ? 1 : .62;
              var p = (e.animTime || 0) * ("idle" === e.state ? 1.5 : 3.4) + .02 * (e.homeX || 0);
              var g = .72 + .18 * Math.sin(p);
              var m = r.r * c;
              if (a.save(), a.globalCompositeOperation = "lighter", o.ellipse(a, n, t - 2, m, Math.max(2, .28 * m), i.alpha(r.edge, .06 * f), i.alpha(r.glow, .32 * f * g)), o.ellipse(a, n, t - 16 * c, .52 * m, .72 * m, i.alpha(r.mid, .045 * f), i.alpha(r.glow, .16 * f * g)), "huyet" === r.k) {
                for (h = 0; h < 5; h++)
                  l = .7 * p + h * Math.PI * 2 / 5, d = n + Math.cos(l) * m * (.55 + h % 2 * .16), s = t - 8 + Math.sin(l) * m * .22, o.line(a, d - 5 * Math.cos(l), s - 2 * Math.sin(l), d + 4 * Math.cos(l), s + 2 * Math.sin(l), i.alpha(h % 2 ? r.mid : r.glow, f * (.38 + .3 * g))), o.dot(a, Math.round(d), Math.round(s), i.alpha(r.glow, f * g));
              }
              else if ("hoa" === r.k) {
                for (h = 0; h < 5; h++)
                  u = 5 + Math.abs(Math.sin(1.4 * p + 1.7 * h)) * (7 + 3 * c), d = n - .34 * m + h * m * .17, o.taper(a, Math.round(d), Math.round(t - 3), 1, 3, Math.round(u), i.alpha(h % 2 ? r.mid : r.edge, .48 * f), null), o.dot(a, Math.round(d), Math.round(t - 3 - u), i.alpha(r.glow, .78 * f));
              }
              else if ("doc" === r.k) {
                for (h = 0; h < 6; h++)
                  l = .55 * p + h * Math.PI / 3, d = n + Math.cos(l) * m * .58, s = t - 13 * c + Math.sin(l) * m * .3, o.dot(a, Math.round(d), Math.round(s), i.alpha(h % 2 ? r.glow : r.mid, f * (.5 + .3 * g))), h % 2 == 0 && o.dot(a, Math.round(d + 1), Math.round(s - 2), i.alpha(r.glow, .5 * f));
              }
              else if ("phong" === r.k) {
                for (h = 0; h < 4; h++) {
                  var w = h % 2 ? 1 : -1;
                  var _ = -10 - 7 * h + 3 * Math.sin(p + h);
                  o.line(a, n + 5 * w, t + _ + 5, n + w * (.62 * m + 3 * h), t + _, i.alpha(h % 2 ? r.glow : r.mid, f * (.34 + .18 * g)));
                }
              }
              else if ("tho" === r.k) {
                for (h = 0; h < 5; h++)
                  l = .35 * p + h * Math.PI * 2 / 5, d = n + Math.cos(l) * m * .65, s = t + Math.sin(l) * m * .16, o.line(a, Math.round(d), Math.round(s), Math.round(d + 3 * Math.cos(l)), Math.round(s - 4 - h % 2 * 3), i.alpha(h % 2 ? r.mid : r.glow, .45 * f));
              }
              else if ("moc" === r.k) {
                for (h = 0; h < 7; h++)
                  l = .4 * p + 1.2 * h, d = n + Math.cos(l) * (.3 * m + 1.2 * h), s = t - 12 - h % 3 * 7 + 3 * Math.sin(l), o.line(a, Math.round(d), Math.round(s), Math.round(d + (h % 2 ? 3 : -3)), Math.round(s - 2), i.alpha(h % 2 ? r.glow : r.mid, .48 * f)), o.dot(a, Math.round(d), Math.round(s), i.alpha(r.glow, .7 * f));
              }
              else {
                for (h = 0; h < 6; h++)
                  l = .55 * p + h * Math.PI / 3, d = n + Math.cos(l) * m * .55, s = t - 13 + Math.sin(l) * m * .24, o.line(a, n, t - 13, d, s, i.alpha(r.mid, .3 * f)), o.dot(a, Math.round(d), Math.round(s), i.alpha(r.glow, .68 * f));
              }
              a.restore();
            }
          }
        })(n, e, l, d);
      }
      var Ia = null;
      var La = !0;
      if (e.hien && a.BossHien) {
        La = c.sanSangThan(e);
        Ia = a.BossHien.trangThai(e, h, La);
      }
      else {
        if (!(e.def.human || e.def.tuSi)) {
          La = c.sanSangThan(e);
        }
      }
      var Fa = Ia ? !Ia.anThan : La || !(!e.def.human && !e.def.tuSi);
      if (e.def.honQuanh && Fa) {
        _(n, e, l, d, h, !0);
      }
      if (Ia) {
        a.BossHien.veDat(n, e, l, d, h, Ia);
      }
      n.save();
      n.translate(l + Math.round(e.flinchX * f * 3), Math.round(d + s + e.flinchY * f * 3));
      if (e.dir < 0) {
        n.scale(-1, 1);
      }
      if (Ia) {
        a.BossHien.catThan(n, e, Ia);
      }
      if (Fa) {
        b(n, e);
      }
      if (f && !m && Fa) {
        n.save();
        n.globalCompositeOperation = "lighter";
        n.globalAlpha = .85 * f;
        b(n, e);
        n.restore();
      }
      if (Ia && Ia.flash > .02 && !m && Fa) {
        n.save();
        n.globalCompositeOperation = "lighter";
        n.globalAlpha = .7 * Ia.flash;
        b(n, e);
        n.restore();
      }
      n.restore();
      if (Ia) {
        a.BossHien.veTren(n, e, l, d, h, Ia);
      }
      if (e.def.honQuanh && Fa) {
        _(n, e, l, d, h, !1);
      }
      if (!(!e.def.tuSi && !e.def.human || Ia && "no" !== Ia.pha)) {
        c.drawPhiKiem(e, n, t, r, h);
      }
    }
  };
  var y = {};
  function b(e, n) {
    if (!n.def.thanDa || !function (e, n) {
      var t = X[n.type];
      if (!t) {
        return !1;
      }
      var i = n.def.drawScale || 1;
      var o = Math.round(t.w * i * (a.CONFIG && a.CONFIG.GFX || 2));
      var r = function (e, n) {
        var t = e + "@" + n;
        if (W[t]) {
          return W[t];
        }
        var i = a.Assets && a.Assets.get && a.Assets.get(B);
        if (!i || !i.width || "undefined" == typeof document) {
          return null;
        }
        for (var o = X[e], r = O, h = Math.max(1, Math.round(n * r.h / r.w)), l = K(i, 0, n, h), d = K(i, r.w, n, h), s = l.getContext("2d"), u = s.getImageData(0, 0, n, h), c = u.data, f = 3; f < c.length; f += 4)
          c[f] = c[f] < 100 ? 0 : 255;
        s.putImageData(u, 0, 0);
        for (var p = E(o.khe[0]), g = E(o.khe[1]), m = E(o.khe[2]), w = d.getContext("2d"), _ = w.getImageData(0, 0, n, h), y = _.data, b = 0; b < y.length; b += 4) {
          var v = y[b + 3] / 255;
          var x = y[b] / 255 * v;
          var M = y[b + 1] / 255 * v;
          if (x < .03 || 0 === c[b + 3]) {
            y[b + 3] = 0;
          }
          else {
            var k;
            var T;
            var S;
            if (x < .5) {
              k = p;
              T = g;
              S = 2 * x;
            }
            else {
              k = g;
              T = m;
              S = 2 * (x - .5);
            }
            for (var P = Math.min(1, .9 * M), C = 0; C < 3; C++) {
              var D = k[C] + (T[C] - k[C]) * S;
              y[b + C] = Math.round(D + (m[C] - D) * P);
            }
            y[b + 3] = Math.round(Math.min(1, 1.7 * x) * o.kheA * 255);
          }
        }
        w.putImageData(_, 0, 0);
        return W[t] = { base: l, glow: d, mid: g, hi: m };
      }(n.type, o);
      if (!r) {
        if (a.Assets && a.Assets.loadImage && !W.nap) {
          W.nap = !0;
          a.Assets.loadImage(B, a.Assets.PRIO && a.Assets.PRIO.NORMAL);
        }
        return !1;
      }
      var h = O;
      var l = t.w / h.w;
      var d = t.w;
      var s = h.h * l;
      var u = h.ax * l;
      var c = h.ay * l;
      var f = n.animTime || 0;
      var p = n.state && "idle" !== n.state;
      var g = "telegraph" === n.attackState;
      var m = 0;
      var w = 0;
      var _ = 1;
      var y = 1;
      var b = 0;
      if (p) {
        var v = Math.sin(7 * f);
        var x = Math.abs(v);
        m = 1.6 * -x;
        w = .035 * v;
        y = 1 - .025 * (1 - x);
        _ = 1 + .015 * (1 - x);
      }
      else {
        var M = Math.sin(2.2 * f);
        y = 1 + .018 * M;
        _ = 1 - .008 * M;
      }
      if (g) {
        w -= .07;
        y *= 1.04;
        _ *= 1.03;
        b = .6 * Math.sin(60 * f) - 2;
      }
      var k = g ? 1.3 : .78 + .22 * Math.sin(3.1 * f + (n.homeX || 0));
      if (e.save(), 1 !== i && e.scale(i, i), t.hq && function (a, e, n, t, i, o, r) {
        var h;
        var l = e.hq;
        if (a.save(), a.globalCompositeOperation = "lighter", l.dat && (a.save(), a.scale(1, .3), (h = a.createRadialGradient(0, 0, 0, 0, 0, .62 * t)).addColorStop(0, q(n.mid, l.dat * r)), h.addColorStop(1, q(n.mid, 0)), a.fillStyle = h, a.fillRect(.62 * -t, .62 * -t, 1.24 * t, 1.24 * t), a.restore()), l.vong) {
          var d = .7 * o % 1;
          var s = t * (.3 + .4 * d);
          a.strokeStyle = q(n.hi, .55 * (1 - d));
          a.lineWidth = 1;
          a.beginPath();
          a.ellipse(0, -1, s, .3 * s, 0, 0, 2 * Math.PI);
          a.stroke();
        }
        if (l.than) {
          (h = a.createRadialGradient(0, .5 * -i, 0, 0, .5 * -i, .6 * t)).addColorStop(0, q(n.mid, l.than * r));
          h.addColorStop(.6, q(n.mid, l.than * r * .35));
          h.addColorStop(1, q(n.mid, 0));
          a.fillStyle = h;
          a.fillRect(.6 * -t, .5 * -i - .6 * t, 1.2 * t, 1.2 * t);
        }
        for (var u = 0; u < l.dom; u++) {
          var c = (.5 * o + u / l.dom) % 1;
          var f = Math.sin(12.9898 * u) * t * .4 + 1.5 * Math.sin(2 * o + u);
          var p = -c * i * 1.05;
          a.fillStyle = q(u % 2 ? n.hi : n.mid, .9 * Math.sin(c * Math.PI));
          a.fillRect(Math.round(f), Math.round(p), 1, 1);
        }
        a.restore();
      }(e, t, r, d, s, f, k), e.translate(b, m), e.rotate(w), e.scale(_, y), e.imageSmoothingEnabled = !0, e.drawImage(r.base, -u, -c, d, s), e.drawImage(r.glow, -u, -c, d, s), e.save(), e.globalCompositeOperation = "lighter", t.bloom) {
        var T = e.globalAlpha;
        e.globalAlpha = T * Math.min(1, t.bloom * k);
        e.drawImage(r.glow, -u, -c, d, s);
        e.globalAlpha = T;
      }
      for (var S = .042 * d * (.8 + .3 * t.mat), P = 0; P < 2; P++) {
        var C = (h.mat[P][0] - h.ax) * l;
        var D = (h.mat[P][1] - h.ay) * l;
        var A = e.createRadialGradient(C, D, 0, C, D, S);
        A.addColorStop(0, q(r.hi, .95 * t.mat * k));
        A.addColorStop(.35, q(r.mid, .6 * t.mat * k));
        A.addColorStop(1, q(r.mid, 0));
        e.fillStyle = A;
        e.fillRect(C - S, D - S, 2 * S, 2 * S);
      }
      e.restore();
      e.restore();
      return !0;
    }(e, n)) {
      var t = n.def.anhMob || n.type;
      var r = a.Assets.mob(t);
      var h = n.def.sprite;
      if (!r && n.def.anhMob && a.Assets.loadImage) {
        var l = Date.now();
        if (!(y[t] > l)) {
          y[t] = l + 3e3;
          a.Assets.loadImage(a.Assets.mobPath(t), a.Assets.PRIO && a.Assets.PRIO.NORMAL);
        }
      }
      if (r && h) {
        e.imageSmoothingEnabled = !1;
        var d = !(!n.def.locMau || "string" != typeof e.filter);
        var s = d ? e.filter : null;
        if (d) {
          e.filter = n.def.locMau;
        }
        var u = n.def.ngang;
        var f = u && function (a) {
          var e = a.drawTime || 0;
          var n = null == a.gocX ? 0 : a.x - a.gocX;
          var t = null == a.gocY ? 0 : a.y - a.gocY;
          a.gocX = a.x;
          a.gocY = a.y;
          var i;
          var o = "telegraph" === a.attackState || "number" == typeof a.atkAnimAt && e - a.atkAnimAt >= 0 && e - a.atkAnimAt < .6;
          if (o) {
            i = !0;
          }
          else {
            if (n * n + t * t > 4e-4) {
              a.gocDiLuc = e;
              i = Math.abs(n) >= .9 * Math.abs(t);
            }
            else {
              i = e - (null == a.gocDiLuc ? -9 : a.gocDiLuc) < .25 && !!a.gocNgang;
            }
          }
          if (i === !!a.gocNgang) {
            a.gocDoi = null;
          }
          else {
            if (o) {
              a.gocNgang = i;
              a.gocDoi = null;
            }
            else {
              if (null == a.gocDoi) {
                a.gocDoi = e;
              }
              else {
                if (e - a.gocDoi >= .12) {
                  a.gocNgang = i;
                  a.gocDoi = null;
                }
              }
            }
          }
          return !!a.gocNgang;
        }(n) ? a.Assets.mob(u.anh) : null;
        if (f) {
          v(e, n, f, u.sprite || h, u.sheet || n.def.sheet);
        }
        else {
          if (n.def.sheet) {
            v(e, n, r, h);
          }
          else {
            e.drawImage(r, -h.ax, -h.ay, h.w, h.h);
          }
        }
        return void (d && (e.filter = s));
      }
      var p = n.def.drawScale || 1;
      if (1 !== p) {
        e.save();
        e.scale(p, p);
      }
      (function (e, n) {
        if (n.def.human || n.def.tuSi) {
          (function (e, n) {
            var t = a.SpriteFactory;
            if (t && t.get) {
              var i = M(n.type, n.def, n.vuKhi);
              var o = function (e, n) {
                var t = a.SpriteFactory;
                if (!t.enqueue || !t.peek) {
                  return t.get(n);
                }
                var i = t.peek(t.keyOf(n));
                if (i) {
                  e.sheetCho = 0;
                  return i;
                }
                t.enqueue(n);
                var o = Date.now();
                if (e.sheetCho) {
                  if (o - e.sheetCho > k) {
                    e.sheetCho = 0;
                    return t.get(n);
                  }
                }
                else {
                  e.sheetCho = o;
                }
                return e.hien ? null : t.spareIfBuilt();
              }(n, i);
              if (o) {
                var r = "idle" === n.state ? a.CONFIG.ANIM.idle : a.CONFIG.ANIM.walk;
                var h = r.cols[Math.floor(n.animTime * r.fps) % r.cols.length];
                var l = (n.drawTime || 0) - (n.chemLuc || -9);
                var d = "telegraph" === n.attackState;
                if ((d || l >= 0 && l < T)) {
                  h = a.CONFIG.ANIM.attack.cols[d ? 0 : 1];
                }
                var s = a.CONFIG;
                e.save();
                if (n.dir < 0) {
                  e.scale(-1, 1);
                }
                var u = (d || l >= 0 && l < T) && null != n.huongDanh ? n.huongDanh : D(n);
                t.drawBody(e, o, u, h, -s.CHAR_ANCHOR_X, -s.CHAR_ANCHOR_Y, i);
                e.restore();
              }
            }
          })(e, n);
        }
        else {
          if ("sau_truc" === n.type) {
            (function (a, e) {
              var n = R;
              var t = ("idle" === e.state ? 0 : Math.floor(7 * e.animTime) % 2) ? 1 : -1;
              o.line(a, -4, -4, -7 + t, 0, n.dark);
              o.line(a, -1, -4, -2 - t, 0, n.dark);
              o.line(a, 2, -4, 4 + t, 0, n.dark);
              o.line(a, -4, -4, -6 + t, -3, n.base);
              o.line(a, 2, -4, 5 + t, -6, n.base);
              o.ellipse(a, -5, -6, 4, 3, n.dark, n.line);
              o.ellipse(a, -2, -7, 4, 3, n.base, n.line);
              o.r(a, -8, -7, 3, 1, n.dark);
              o.ellipse(a, 2, -8, 3, 3, n.base, n.line);
              o.r(a, 0, -9, 5, 1, n.hi);
              o.ellipse(a, 6, -9, 3, 3, n.hi, n.line);
              o.dot(a, 7, -10, n.eye);
              o.dot(a, 5, -10, n.eye);
              o.line(a, 7, -11, 10, -14, n.dark);
              o.line(a, 5, -11, 7, -14, n.dark);
              o.r(a, -3, -5, 4, 1, n.belly);
            })(e, n);
          }
          else {
            if ("linh_ho_tran_son" === n.type || "htd_loi_thu" === n.type) {
              (function (a, e) {
                var n = "idle" === e.state ? 0 : Math.floor(8 * e.animTime) % 2;
                var t = n ? 1 : -1;
                var i = "chase" === e.state && n ? 1 : 0;
                var r = "#30251d";
                var h = "#d9a54b";
                var l = "#f0d28d";
                var d = "#553420";
                var s = "#f4e9cf";
                var u = "#9b6233";
                o.ellipse(a, 0, -2, 34, 7, "rgba(20,22,23,0.38)", null);
                o.fatLine(a, -16, -21, -24, -17 + t, 4, h);
                o.fatLine(a, -24, -17 + t, -29, -24 + t, 4, u);
                o.fatLine(a, -28, -23 + t, -31, -26 + t, 3, d);
                o.blk(a, -15, -12 + i, 8, 10, u, r);
                o.blk(a, -13 + t, -5 + i, 9, 4, d, r);
                o.blk(a, 6, -12 - i, 8, 10, h, r);
                o.blk(a, 8 - t, -5 - i, 9, 4, d, r);
                o.blk(a, -7, -11 - i, 7, 9, l, r);
                o.blk(a, -6 - t, -4 - i, 8, 4, d, r);
                o.blk(a, 14, -13 + i, 7, 11, h, r);
                o.blk(a, 14 + t, -4 + i, 9, 4, d, r);
                o.line(a, 20, -2 + i, 24, -2 + i, s);
                o.line(a, 20, -4 + i, 23, -4 + i, s);
                o.ellipse(a, -2, -20 + i, 22, 13, h, r);
                o.ellipse(a, -3, -12 + i, 14, 5, s, r);
                o.ellipse(a, -7, -29 + i, 12, 5, l, null);
                o.fatLine(a, -15, -29 + i, -10, -21 + i, 3, d);
                o.fatLine(a, -7, -32 + i, -3, -22 + i, 3, d);
                o.fatLine(a, 2, -32 + i, 4, -23 + i, 3, d);
                o.fatLine(a, 10, -29 + i, 10, -22 + i, 3, d);
                o.ellipse(a, 14, -26 + i, 14, 12, u, r);
                o.ellipse(a, 17, -28 + i, 10, 9, h, r);
                o.polygon(a, [[10, -34 + i], [8, -42 + i], [15, -38 + i], [17, -33 + i]], u, r);
                o.polygon(a, [[20, -34 + i], [25, -41 + i], [26, -33 + i], [23, -30 + i]], h, r);
                o.ellipse(a, 24, -25 + i, 8, 6, l, r);
                o.ellipse(a, 29, -23 + i, 5, 3, s, r);
                o.dot(a, 22, -29 + i, "#a51e25");
                o.dot(a, 23, -29 + i, "#ffe8a6");
                o.dot(a, 29, -24 + i, r);
                o.line(a, 25, -21 + i, 32, -20 + i, s);
                o.line(a, 27, -19 + i, 33, -18 + i, s);
                o.fatLine(a, 18, -34 + i, 20, -31 + i, 2, d);
                o.fatLine(a, 25, -32 + i, 27, -28 + i, 2, d);
                o.polygon(a, [[27, -17 + i], [30, -17 + i], [29, -13 + i]], s, r);
              })(e, n);
            }
            else {
              if ("htd_dinh" === n.type) {
                (function (e, n) {
                  var t = n.animTime || 0;
                  var i = n.hpMax ? Math.max(0, Math.min(1, n.hp / n.hpMax)) : 1;
                  var r = Math.round(120 + 135 * (1 - i));
                  var h = Math.round(200 - 140 * (1 - i));
                  e.save();
                  e.globalAlpha = .3 + .12 * Math.sin(2.2 * t);
                  o.ellipse(e, 0, -3, 50, 13, "rgba(" + r + "," + h + ",255,0.5)", null);
                  e.restore();
                  var l = a.ObjectArt;
                  var d = l && l.get ? l.get("dan_lo_thang_long", Math.floor(11 * t) % 12) : null;
                  var s = 1.8;
                  if (d && d.canvas) {
                    e.drawImage(d.canvas, -d.ax * s, -d.ay * s, d.w * s, d.h * s);
                  }
                  else {
                    o.ellipse(e, 0, -70, 42, 34, "#6a5a3a", "#241a0e");
                    o.blk(e, -46, -110, 92, 8, "#8a7448", "#241a0e");
                    o.blk(e, -34, -40, 8, 40, "#5a4a2e", "#241a0e");
                    o.blk(e, 26, -40, 8, 40, "#5a4a2e", "#241a0e");
                    o.blk(e, -4, -36, 8, 36, "#5a4a2e", "#241a0e");
                    o.ellipse(e, 0, -74, 14, 10, "rgba(140,220,255,0.55)", null);
                  }
                })(e, n);
              }
              else {
                if ("duoc_linh_thu" === n.type) {
                  (function (a, e) {
                    var n = I;
                    var t = ("idle" === e.state ? 0 : Math.floor(8 * e.animTime) % 2) ? 1 : -1;
                    o.line(a, -5, -7, -6 + t, -1, n.furDk);
                    o.line(a, -2, -7, -2 - t, -1, n.furDk);
                    o.line(a, 3, -7, 4 + t, -1, n.furDk);
                    o.line(a, 5, -7, 5 - t, -1, n.furDk);
                    o.ellipse(a, -8, -11, 2, 2, n.furHi, n.line);
                    o.ellipse(a, -1, -11, 7, 5, n.fur, n.line);
                    o.ellipse(a, -1, -13, 5, 2, n.furHi, null);
                    o.r(a, -4, -14, 2, 1, n.jade);
                    o.r(a, 0, -15, 2, 1, n.jade);
                    o.r(a, 3, -14, 2, 1, n.jade);
                    o.ellipse(a, -1, -9, 3, 2, i.alpha(n.glow, .55), null);
                    o.dot(a, -1, -9, n.jadeHi);
                    o.ellipse(a, 6, -14, 3, 3, n.fur, n.line);
                    o.ellipse(a, 8, -16, 3, 2, n.fur, n.line);
                    o.r(a, 7, -17, 3, 1, n.furHi);
                    o.line(a, 8, -18, 10, -22, n.horn);
                    o.line(a, 10, -22, 12, -23, n.hornHi);
                    o.line(a, 7, -18, 6, -22, n.horn);
                    o.line(a, 6, -22, 4, -23, n.hornHi);
                    o.ellipse(a, 11, -23, 2, 1, n.hornHi, null);
                    o.ellipse(a, 4, -23, 2, 1, n.hornHi, null);
                    o.dot(a, 9, -16, n.eye);
                    o.dot(a, 10, -16, n.jadeHi);
                    o.dot(a, 11, -15, n.furDk);
                  })(e, n);
                }
                else {
                  if ("doc_dang_yeu" === n.type) {
                    (function (a, e) {
                      var n = L;
                      var t = Math.sin(e.animTime * ("idle" === e.state ? 3 : 7));
                      var i = t > 0 ? 1 : 0;
                      var r = "idle" === e.state ? 0 : t > .4 ? 1 : 0;
                      o.line(a, -9, -1, -3, -3, n.vineDk);
                      o.line(a, 9, -1, 3, -3, n.vineDk);
                      o.line(a, -6, -2, 6, -2, n.vineDk);
                      o.ellipse(a, 0, -5, 8 + i, 4, n.vine, n.line);
                      o.ellipse(a, -2, -6, 4, 2, n.vineHi, null);
                      o.ellipse(a, 1, -11 + r, 6 + i, 4, n.vine, n.line);
                      o.ellipse(a, -1, -12 + r, 3, 2, n.vineHi, null);
                      o.ellipse(a, 2, -16 + r, 4, 3, n.vine, n.line);
                      o.line(a, -7, -6, -9, -8, n.vineDk);
                      o.line(a, 7, -7, 9, -9, n.vineDk);
                      o.line(a, -5, -12 + r, -7, -14 + r, n.vineDk);
                      var h = t > 0 ? 2 : -2;
                      o.line(a, -5, -13 + r, -11, -17 + r + h, n.vine);
                      o.line(a, -11, -17 + r + h, -14, -14 + r + h, n.vineHi);
                      o.dot(a, -14, -13 + r + h, n.poison);
                      o.line(a, 7, -14 + r, 13, -19 + r - h, n.vine);
                      o.line(a, 13, -19 + r - h, 15, -16 + r - h, n.vineHi);
                      o.dot(a, 15, -15 + r - h, n.poison);
                      var l = -21 + r;
                      o.ellipse(a, 3, l + 2, 4, 2, n.vineDk, null);
                      o.ellipse(a, 3, l, 6, 5, n.bloom, n.bloomDk);
                      o.ellipse(a, 2, l - 1, 4, 3, n.bloomHi, null);
                      o.line(a, -2, l - 3, -4, l - 6, n.bloom);
                      o.line(a, 3, l - 5, 3, l - 8, n.bloom);
                      o.line(a, 8, l - 3, 10, l - 6, n.bloom);
                      o.dot(a, -4, l - 6, n.bloomHi);
                      o.dot(a, 3, l - 8, n.bloomHi);
                      o.dot(a, 10, l - 6, n.bloomHi);
                      o.ellipse(a, 4, l, 3, 2, n.maw, null);
                      o.dot(a, 5, l, n.eye);
                      o.dot(a, 4, l + 2, n.poison);
                      if ("chase" === e.state) {
                        o.dot(a, 6, l - 1, n.eye);
                      }
                    })(e, n);
                  }
                  else {
                    if ("yeu_quai_ha_pham" === n.type) {
                      (function (a, e) {
                        var n = F;
                        var t = "chase" === e.state;
                        var r = ("idle" === e.state ? 0 : Math.floor(8 * e.animTime) % 2) ? 1 : -1;
                        var h = t ? 2 : 0;
                        var l = "idle" === e.state && Math.sin(2.4 * e.animTime) > 0 ? 1 : 0;
                        o.blk(a, -6 + r, -7, 5, 7, n.furDk, n.line);
                        o.blk(a, 2 - r, -7, 5, 7, n.fur, n.line);
                        o.r(a, -6 + r, -2, 5, 2, n.line);
                        o.r(a, 2 - r, -2, 5, 2, n.line);
                        o.line(a, -5, -9, -10, -7 - 2 * r, n.furDk);
                        o.line(a, -10, -7 - 2 * r, -12, -11 - 2 * r, n.fur);
                        o.dot(a, -12, -12 - 2 * r, n.furHi);
                        o.ellipse(a, 0, -12 - h + l, 8, 6, n.fur, n.line);
                        o.ellipse(a, -2, -14 - h + l, 5, 3, n.furDk, null);
                        o.ellipse(a, 3, -11 - h + l, 4, 3, n.furHi, null);
                        var d = t ? 4 : 0;
                        o.fatLine(a, 4, -14 - h, 9 + d, -6 - h, 3, n.fur);
                        o.fatLine(a, 4, -14 - h, 9 + d, -6 - h, 1, n.furHi);
                        o.dot(a, 10 + d, -5 - h, n.claw);
                        o.dot(a, 11 + d, -6 - h, n.claw);
                        o.fatLine(a, -4, -14 - h, -8, -7 - h, 3, n.furDk);
                        o.dot(a, -9, -6 - h, n.claw);
                        var s = -20 - h + l;
                        if (o.ellipse(a, 2, s, 6, 5, n.fur, n.line), o.ellipse(a, 6, s + 1, 3, 3, n.furHi, n.line), o.dot(a, 8, s + 1, n.line), o.line(a, -2, s - 4, -4, s - 8, n.horn), o.dot(a, -4, s - 8, n.hornDk), o.line(a, 3, s - 5, 4, s - 9, n.horn), o.dot(a, 4, s - 9, n.hornDk), o.dot(a, 4, s - 1, n.eye), t) {
                          o.dot(a, 4, s - 2, n.eye);
                          o.dot(a, 1, s - 1, n.eye);
                          o.r(a, 5, s + 3, 3, 1, n.maw);
                          o.dot(a, 5, s + 3, n.claw);
                          o.dot(a, 7, s + 3, n.claw);
                          var u = Math.floor(6 * e.animTime) % 3;
                          o.dot(a, -6, -18 - u, i.alpha(n.aura, .7));
                          o.dot(a, 7, -20 - u, i.alpha(n.aura, .5));
                        }
                        else {
                          o.dot(a, 1, s - 1, i.alpha(n.eye, .75));
                        }
                      })(e, n);
                    }
                    else {
                      if ("xich_tinh_mang" === n.type || "xich_mang_vuong" === n.type) {
                        (function (a, e) {
                          var n = 4 * Math.sin(9 * e.animTime);
                          var t = "idle" === e.state ? 0 : n;
                          o.ellipse(a, 0, -2, 14, 4, "rgba(25,10,10,0.35)", null);
                          o.fatLine(a, -12, -4, -6, -6 + t, 3, "#991b1b");
                          o.dot(a, -14, -3, "#7f1d1d");
                          o.fatLine(a, -6, -6 + t, 2, -5 - t, 4, "#dc2626");
                          o.fatLine(a, -5, -7 + t, 1, -6 - t, 2, "#ef4444");
                          o.line(a, -6, -4 + t, 2, -3 - t, "#fef08a");
                          o.fatLine(a, 2, -5 - t, 8, -12, 4, "#dc2626");
                          o.fatLine(a, 3, -6 - t, 8, -13, 2, "#f87171");
                          o.polygon(a, [[6, -16], [14, -13], [14, -9], [7, -9]], "#b91c1c", "#7f1d1d");
                          o.polygon(a, [[7, -15], [13, -13], [7, -10]], "#ef4444", null);
                          o.dot(a, 10, -13, "#fbbf24");
                          o.dot(a, 11, -13, "#000000");
                          if (Math.sin(12 * e.animTime) > .3) {
                            o.line(a, 14, -11, 19, -11, "#7f1d1d");
                            o.dot(a, 19, -12, "#991b1b");
                            o.dot(a, 19, -10, "#991b1b");
                          }
                          if ("chase" === e.state) {
                            o.dot(a, 13, -8, "#10b981");
                            o.dot(a, 13, -7, "#34d399");
                          }
                        })(e, n);
                      }
                      else {
                        if ("u_minh_cu_mang" === n.type) {
                          (function (a, e) {
                            var n = e.animTime || 0;
                            var t = 2 * Math.sin(2.5 * n);
                            var i = 3 * Math.sin(4 * n);
                            var r = 6 * n % 20;
                            o.ellipse(a, 0, -3, 24 + .5 * r, 8 + .2 * r, null, "rgba(56,189,248,0.4)");
                            o.ellipse(a, 0, -3, 18, 6, "#0f172a", "#064e3b");
                            a.fillStyle = "#022c22";
                            a.beginPath();
                            a.ellipse(-14, -12, 16, 9, -.3, 0, 2 * Math.PI);
                            a.fill();
                            a.fillStyle = "#064e3b";
                            a.beginPath();
                            a.ellipse(-12, -14, 13, 7, -.3, 0, 2 * Math.PI);
                            a.fill();
                            a.fillStyle = "#022c22";
                            a.fillRect(.3 * i - 10, -40 + t, 20, 36);
                            a.fillStyle = "#064e3b";
                            a.fillRect(.3 * i - 8, -40 + t, 16, 34);
                            o.polygon(a, [[-22 + i, -42 + t], [-8 + i, -52 + t], [8 + i, -52 + t], [22 + i, -42 + t], [14 + i, -28 + t], [-14 + i, -28 + t]], "#064e3b", "#022c22");
                            o.ellipse(a, -12 + i, -38 + t, 4, 7, "#047857", "#34d399");
                            o.dot(a, -12 + i, -38 + t, "#a7f3d0");
                            o.ellipse(a, 12 + i, -38 + t, 4, 7, "#047857", "#34d399");
                            o.dot(a, 12 + i, -38 + t, "#a7f3d0");
                            a.fillStyle = "#047857";
                            a.fillRect(.5 * i - 5, -36 + t, 10, 26);
                            a.fillStyle = "#10b981";
                            for (var h = 0; h < 5; h++)
                              a.fillRect(.5 * i - 4, 5 * h - 34 + t, 8, 2);
                            var l = i;
                            var d = -52 + t;
                            o.polygon(a, [[l - 10, d], [l + 10, d], [l + 14, d + 10], [l, d + 16], [l - 14, d + 10]], "#064e3b", "#022c22");
                            o.ellipse(a, l, d + 6, 8, 7, "#047857", null);
                            o.line(a, l - 6, d, l - 14, d - 14, "#1e293b");
                            o.line(a, l - 14, d - 14, l - 18, d - 18, "#34d399");
                            o.line(a, l + 6, d, l + 14, d - 14, "#1e293b");
                            o.line(a, l + 14, d - 14, l + 18, d - 18, "#34d399");
                            o.dot(a, l - 5, d + 5, "#ef4444");
                            o.dot(a, l - 5, d + 4, "#fbbf24");
                            o.dot(a, l + 5, d + 5, "#ef4444");
                            o.dot(a, l + 5, d + 4, "#fbbf24");
                            o.line(a, l - 4, d + 14, l - 4, d + 19, "#f8fafc");
                            o.line(a, l + 4, d + 14, l + 4, d + 19, "#f8fafc");
                            o.dot(a, l - 4, d + 20, "#10b981");
                            o.dot(a, l + 4, d + 20, "#10b981");
                            a.save();
                            a.globalAlpha = .28 + .12 * Math.sin(5 * n);
                            o.ellipse(a, l, d + 4, 22, 18, null, "#10b981");
                            a.restore();
                          })(e, n);
                        }
                        else {
                          if ("ta_mach_tru" === n.type || "yl_tran_son_bia" === n.type || "htd_tru_bang" === n.type || "htd_tru_hoa" === n.type || "tm_tru" === n.type) {
                            if ("tm_tru" === n.type) {
                              (function (a, e) {
                                var n = e.animTime || 0;
                                var t = "#6f6a72";
                                var i = "#9a949c";
                                var r = "#3b373f";
                                var h = "#262329";
                                var l = "#141216";
                                var d = "#3f8fe0";
                                o.ellipse(a, 0, 38, 30, 7, "rgba(4,8,16,0.35)", null);
                                var s = Math.round(Math.sin(.9 * n));
                                o.polygon(a, [[-27, 4], [-20, 22], [-11, 18], [-6, 40 + s], [0, 24], [5, 47 + s], [11, 26], [17, 36 + s], [22, 17], [28, 4]], r, l);
                                o.polygon(a, [[-22, 5], [-16, 17], [-9, 14], [-5, 31 + s], [-1, 18], [4, 12], [-2, 4]], t, null);
                                o.polygon(a, [[5, 6], [9, 20], [14, 30 + s], [18, 18], [22, 8]], h, null);
                                o.line(a, -6, 19, -5, 34 + s, i);
                                o.line(a, 5, 24, 5, 41 + s, h);
                                o.polygon(a, [[-31, -1], [-26, -6], [-22, 2], [-27, 7]], t, l);
                                o.polygon(a, [[26, -2], [32, 1], [29, 8], [23, 5]], r, l);
                                o.r(a, -29, -3, 3, 1, i);
                                var u = .5 + .5 * Math.sin(2.1 * n);
                                o.polygon(a, [[-33, 4], [-31, -8], [-28, 4]], d, l);
                                o.polygon(a, [[-33, 4], [-31, -8], [-31, 3]], "#a9e0ff", null);
                                o.polygon(a, [[28, 6], [31, -5], [34, 6]], d, l);
                                o.ellipse(a, -31, -2, 6, 7, "rgba(120,200,255," + (.12 + .1 * u).toFixed(2) + ")", null);
                                for (var c = 0; c < 3; c++) {
                                  var f = .6 * n + 2.1 * c;
                                  var p = Math.round(Math.cos(f) * (34 + 5 * c));
                                  var g = 18 + 10 * c + Math.round(3 * Math.sin(1.3 * f));
                                  o.polygon(a, [[p - 3, g], [p - 1, g - 3], [p + 3, g - 1], [p + 2, g + 3], [p - 2, g + 3]], t, l);
                                  o.r(a, p - 1, g - 2, 2, 1, i);
                                }
                              })(e, n);
                            }
                            (function (a, e) {
                              var n = e.animTime || 0;
                              var t = c.mauTru(e);
                              var i = .55 + .35 * Math.abs(Math.sin(2.4 * n));
                              var r = "#6f6a72";
                              var h = "#9a949c";
                              var l = "#3b373f";
                              var d = "#141216";
                              var s = "#c79a3a";
                              var u = "#f0cf72";
                              var f = "#6e4e16";
                              o.ellipse(a, 0, 0, 25, 8, "rgba(10,8,14,0.5)", null);
                              o.ellipse(a, 0, -3, 23, 9, l, d);
                              o.ellipse(a, 0, -6, 23, 9, r, d);
                              o.ellipse(a, 0, -6, 18, 7, h, null);
                              o.ellipse(a, 0, -9, 16, 6, l, d);
                              o.ellipse(a, 0, -11, 16, 6, r, d);
                              for (var p = 0; p < 6; p++) {
                                var g = p * Math.PI / 3 + .3;
                                o.line(a, Math.round(17 * Math.cos(g)), Math.round(6.5 * Math.sin(g) - 6), Math.round(22 * Math.cos(g)), Math.round(8.5 * Math.sin(g) - 6), l);
                              }
                              o.taper(a, 0, -62, 20, 26, 51, r, d);
                              o.r(a, -11, -56, 4, 42, h);
                              o.r(a, 8, -56, 4, 42, l);
                              o.blk(a, -5, -52, 10, 34, t.lo, d);
                              o.r(a, -4, -51, 8, 32, t.glow + (.55 + .4 * i).toFixed(2) + ")");
                              o.r(a, -1, -50, 2, 30, t.hi);
                              for (var m = -46; m <= -24; m += 7)
                                o.r(a, -4, m, 8, 1, t.lo);
                              o.blk(a, -13, -18, 26, 4, s, f);
                              o.r(a, -12, -18, 24, 1, u);
                              o.blk(a, -12, -58, 24, 5, s, f);
                              o.r(a, -11, -58, 22, 1, u);
                              o.polygon(a, [[-10, -66], [-22, -62], [-24, -52], [-14, -50], [-9, -57]], h, d);
                              o.polygon(a, [[10, -66], [22, -62], [24, -52], [14, -50], [9, -57]], r, d);
                              o.line(a, -22, -62, -24, -52, u);
                              o.line(a, 22, -62, 24, -52, s);
                              o.r(a, -20, -60, 5, 2, s);
                              o.r(a, 15, -60, 5, 2, f);
                              o.polygon(a, [[-9, -64], [-8, -76], [0, -82], [8, -76], [9, -64]], "#2a2630", d);
                              o.polygon(a, [[-5, -66], [-5, -74], [0, -77], [5, -74], [5, -66]], f, null);
                              o.polygon(a, [[-4, -67], [-4, -73], [0, -75], [4, -73], [4, -67]], s, null);
                              o.r(a, -3, -71, 2, 1, t.hi);
                              o.r(a, 1, -71, 2, 1, t.hi);
                              o.r(a, 13, -84, 2, 36, "#3a2a1a");
                              o.r(a, 13, -84, 1, 36, "#5a4230");
                              o.polygon(a, [[10, -84], [18, -84], [16, -88], [12, -88]], s, f);
                              var w = -96 + Math.round(2 * Math.sin(2 * n));
                              o.ellipse(a, 0, w, 11, 13, t.glow + (.18 + .2 * i).toFixed(2) + ")", null);
                              o.polygon(a, [[0, w - 11], [6, w - 2], [3, w + 9], [-3, w + 9], [-6, w - 2]], t.mid, d);
                              o.polygon(a, [[0, w - 11], [-6, w - 2], [-3, w + 9], [0, w + 2]], t.hi, null);
                              o.polygon(a, [[0, w - 11], [6, w - 2], [3, w + 9], [0, w + 2]], t.lo, null);
                              o.line(a, 0, w - 9, 0, w + 7, t.hi);
                              for (var _ = 0; _ < 3; _++) {
                                var y = 1.8 * n + 2.1 * _;
                                o.dot(a, Math.round(12 * Math.cos(y)), Math.round(w + 5 * Math.sin(y)), t.hi);
                              }
                              for (var b = -1; b <= 1; b++) {
                                var v = Math.round(2 * Math.sin(3 * n + 2 * b));
                                o.line(a, 12 * b, -8, 14 * b + v, -16, t.glow + "0.5)");
                              }
                            })(e, n);
                          }
                          else {
                            if (n.def.tieuXa) {
                              (function (e, n) {
                                if (!a.TieuXaArt || !a.TieuXaArt.ve(e, n)) {
                                  var t = a.VanTieu && a.VanTieu.hang(n.def.tieuXaHang) || { mau: "#ece8dc", vien: "#6b6558" };
                                  o.r(e, -24, -26, 48, 18, "#4a3320");
                                  o.r(e, -22, -24, 44, 14, "#8a6a3e");
                                  o.r(e, -22, -24, 44, 3, t.mau);
                                  o.ellipse(e, -14, -8, 8, 8, "#2a1e14", "#1c140c");
                                }
                              })(e, n);
                            }
                            else {
                              if ("ll_quy_phien" === n.type) {
                                (function (e, n) {
                                  var t = n.animTime || 0;
                                  var i = a.AmHon;
                                  var r = i && a.Assets && a.Assets.get ? a.Assets.get(i.PATH) : null;
                                  var h = Math.round(2 * Math.sin(2.6 * t));
                                  if (o.ellipse(e, 0, 2, 8, 3, "rgba(20,6,10,0.35)", null), r) {
                                    var l = i.SHEET;
                                    var d = i.BOX;
                                    var s = Math.floor(t * l.fps) % l.frames;
                                    e.imageSmoothingEnabled = !1;
                                    return void e.drawImage(r, s % l.cols * l.fw, Math.floor(s / l.cols) * l.fh, l.fw, l.fh, -d.ax, -d.ay + h, d.w, d.h);
                                  }
                                  o.ellipse(e, 0, -16 + h, 10, 11, "#c22333", "#3d0810");
                                  o.ellipse(e, 0, -2 + h, 7, 9, "#7a1420", null);
                                  o.dot(e, -4, -18 + h, "#ff7a6a");
                                  o.dot(e, 4, -18 + h, "#ff7a6a");
                                })(e, n);
                              }
                              else {
                                if ("bong_tan_ta_hon" === n.type) {
                                  (function (a, e) {
                                    var n = e.animTime || 0;
                                    var t = Math.round(2 * Math.sin(3 * n));
                                    a.save();
                                    a.globalAlpha = .82;
                                    o.ellipse(a, 0, -2, 9, 3, "rgba(60,20,90,0.45)", null);
                                    o.taper(a, 0, -30 + t, 12, 18, 22, "#2a1238", "#12061a");
                                    o.line(a, -6, -8 + t, -8, -2, "#2a1238");
                                    o.line(a, 0, -8 + t, 0, -1, "#2a1238");
                                    o.line(a, 6, -8 + t, 8, -2, "#2a1238");
                                    o.ellipse(a, 0, -35 + t, 7, 7, "#1c0c28", "#8a3ad0");
                                    o.r(a, -4, -36 + t, 2, 2, "#ff5a6a");
                                    o.r(a, 2, -36 + t, 2, 2, "#ff5a6a");
                                    o.line(a, -7, -24 + t, -13, -20 + t, "#3a1a50");
                                    o.line(a, 7, -24 + t, 13, -20 + t, "#3a1a50");
                                    o.ellipse(a, 0, -24 + t, 11, 14, null, "rgba(170,90,230,0.35)");
                                    a.restore();
                                  })(e, n);
                                }
                                else {
                                  if ("thach_giap_yeu" === n.type || "thach_yeu" === n.type || "thach_ma" === n.type || "thach_mach_vuong" === n.type || "htd_thach_ma" === n.type || n.def && n.def.yenLang && n.def.thanDa) {
                                    (function (a, e) {
                                      var n = ("idle" === e.state ? 0 : Math.floor(9 * e.animTime) % 2) ? 1 : -1;
                                      var t = "#151c1e";
                                      var i = "#334e52";
                                      var r = "#223538";
                                      var h = "#668078";
                                      o.blk(a, -12 + n, -8, 6, 8, r, t);
                                      o.blk(a, -2 - n, -7, 6, 7, i, t);
                                      o.blk(a, 8 + n, -8, 6, 8, r, t);
                                      o.r(a, -12 + n, -2, 6, 2, "#1d292b");
                                      o.r(a, 8 + n, -2, 6, 2, "#1d292b");
                                      o.ellipse(a, -1, -15, 16, 10, "#594136", "#241b18");
                                      o.blk(a, -13, -24, 10, 12, i, t);
                                      o.blk(a, -5, -28, 11, 15, "#3e5d60", t);
                                      o.blk(a, 5, -25, 10, 13, i, t);
                                      o.r(a, -11, -23, 6, 2, h);
                                      o.r(a, -3, -27, 7, 2, "#819188");
                                      o.r(a, 7, -24, 5, 2, h);
                                      o.line(a, -4, -14, 2, -20, "#6aa9bf");
                                      o.line(a, 2, -20, 8, -14, "#a4d8e3");
                                      o.ellipse(a, 13, -17, 8, 7, r, t);
                                      o.blk(a, 12, -21, 10, 8, i, t);
                                      o.line(a, 18, -23, 25, -27, h);
                                      o.line(a, 19, -21, 27, -22, i);
                                      o.dot(a, 19, -19, "#ff604c");
                                      o.dot(a, 20, -19, "#ffd1a8");
                                      o.r(a, 21, -15, 4, 2, "#201719");
                                      o.line(a, -15, -17, -21, -20 + n, r);
                                      o.blk(a, -24, -23 + n, 5, 5, i, t);
                                    })(e, n);
                                  }
                                  else {
                                    (function (a, e) {
                                      var n = H;
                                      var t = ("idle" === e.state ? 0 : Math.floor(9 * e.animTime) % 2) ? 1 : -1;
                                      o.line(a, -6, -4, -10, -6, n.pink);
                                      o.line(a, -10, -6, -12, -9, n.pinkDk);
                                      o.r(a, -4 + t, -2, 2, 2, n.dark);
                                      o.r(a, 2 - t, -2, 2, 2, n.dark);
                                      o.r(a, -1, -2, 2, 2, n.base);
                                      o.ellipse(a, -1, -6, 6, 4, n.base, n.line);
                                      o.ellipse(a, -1, -8, 4, 2, n.hi, null);
                                      o.r(a, -5, -4, 8, 1, n.dark);
                                      o.ellipse(a, 1, -11, 2, 2, n.base, n.line);
                                      o.dot(a, 1, -11, n.pink);
                                      o.ellipse(a, 5, -7, 3, 3, n.base, n.line);
                                      o.r(a, 4, -9, 3, 1, n.hi);
                                      o.dot(a, 8, -6, n.pink);
                                      o.dot(a, 6, -8, n.eye);
                                      o.line(a, 8, -6, 11, -8, n.hi);
                                      o.line(a, 8, -6, 11, -5, n.hi);
                                    })(e, n);
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      })(e, n);
      if (1 !== p) {
        e.restore();
      }
    }
  }
  function v(e, n, t, i, o) {
    var r = o || n.def.sheet;
    var h = r.anims || {};
    if (n.novaWind > 0 && n.def.fireNova && n.def.fireSheet) {
      var l = n.def.fireSheet;
      var d = a.Assets && a.Assets.get && a.Assets.get(l.path);
      if (d) {
        var s = 1 - Math.max(0, Math.min(1, n.novaWind / n.def.fireNova.windup));
        var u = Math.min(l.frames - 1, Math.floor(s * l.frames));
        var c = u % l.cols * l.fw;
        var f = Math.floor(u / l.cols) * l.fh;
        var p = l.scale || 1;
        e.drawImage(d, c, f, l.fw, l.fh, -l.ax * p, -l.ay * p, l.fw * p, l.fh * p);
      }
    }
    var g;
    var m = -1;
    var w = null;
    var _ = -1;
    if (h.attack && "number" == typeof n.atkAnimAt && "number" == typeof n.drawTime) {
      if (w = "attack", r.attackAnims) {
        var y = r.attackAnims[(0 | n.atkAnimVar) % r.attackAnims.length];
        if (y && h[y]) {
          w = y;
        }
      }
      var b = h[w][1] / (r.fps || 10);
      var v = n.drawTime - n.atkAnimAt;
      if (v >= 0 && (v < b || "telegraph" === n.attackState)) {
        _ = Math.min(1, v / b);
      }
      else {
        w = null;
      }
    }
    var x = !1;
    var M = -1;
    if (h.roar && "number" == typeof n.roarAt && "number" == typeof n.drawTime) {
      var k = h.roar[1] / (r.animFps && r.animFps.roar || r.fps || 10);
      var T = n.drawTime - n.roarAt;
      if (T >= 0 && T < k) {
        x = !0;
        M = T / k;
      }
    }
    if (!h.hurt || !n.giatNow || w || x || n.pounceWind > 0 && n.def.pounce)
      if (r.actionDriven && (h.jump || h.pounce) && (n.pounceWind > 0 && n.def.pounce || n.tcWind > 0 && n.def.tuyetChieu && "vo_cao" === n.def.tuyetChieu.kieu)) {
        var S = n.tcWind > 0 && n.def.tuyetChieu ? 1 - Math.max(0, Math.min(1, n.tcWind / n.def.tuyetChieu.windup)) : 1 - Math.max(0, Math.min(1, n.pounceWind / n.def.pounce.windup));
        var P = h.charge && n.tcWind > 0 && n.def.tuyetChieu && "vo_cao" === n.def.tuyetChieu.kieu;
        if (P && S < .55) {
          g = "charge";
          m = S / .55;
        }
        else {
          if (P) {
            S = (S - .55) / .45;
          }
          if (S < .5 && h.jump) {
            g = "jump";
            m = 2 * S;
          }
          else {
            if (h.pounce) {
              g = "pounce";
              m = Math.max(0, 2 * (S - .5));
            }
            else {
              g = "jump";
              m = S;
            }
          }
        }
      }
      else {
        if (x) {
          g = "roar";
          m = M;
        }
        else {
          if (w) {
            g = w;
            m = _;
          }
          else {
            g = !h.walk || "wander" !== n.state && "return" !== n.state ? !h.run || "wander" !== n.state && "chase" !== n.state && "return" !== n.state ? "idle" : "run" : "walk";
          }
        }
      }
    else {
      g = "hurt";
    }
    var C = h[g] || h.idle;
    if (C) {
      var D;
      var A = r.animFps && r.animFps[g] || r.fps || 10;
      if (m >= 0) {
        var Y = Math.min(.999999, m);
        D = C[0] + Math.min(C[1] - 1, Math.floor(Y * C[1]));
      }
      else {
        D = C[0] + Math.floor((n.animTime || 0) * A) % C[1];
      }
      if (r.rects) {
        var N = r.rects[D];
        var R = r.k || .5;
        if (N) {
          e.drawImage(t, N[0], N[1], N[2], N[3], N[4] * R, N[5] * R, N[2] * R, N[3] * R);
        }
      }
      else {
        var H = D % r.cols * r.fw;
        var I = (r.sourceY || 0) + Math.floor(D / r.cols) * r.fh;
        e.drawImage(t, H, I, r.fw, r.fh, -i.ax, -i.ay, i.w, i.h);
      }
    }
  }
  var x = Object.create(null);
  function M(e, n, t) {
    var i = t ? e + "|" + t : e;
    var o = x[i];
    if (!o) {
      var r = n.human || n.tuSi;
      o = x[i] = Object.assign({}, a.DEFAULT_CHARACTER, r, { aura: "none", hat: r.hat || "none", bag: "none", accessory: r.accessory || "none" });
      if (t) {
        o.weapon = t;
      }
      else {
        if (!(r.weapon)) {
          o.weapon = "none";
        }
      }
    }
    return o;
  }
  c.humanCfg = function (a) {
    return M(a.type, a.def, a.vuKhi);
  };
  var k = 1500;
  c.xinSheet = function (e) {
    var n = e.def;
    var t = a.SpriteFactory;
    if (n && (n.human || n.tuSi) && t && t.enqueue) {
      var i = e.vuKhi ? e.type + "|" + e.vuKhi : e.type;
      if (e.sheetXin !== i) {
        e.sheetXin = i;
        t.enqueue(M(e.type, n, e.vuKhi));
      }
    }
  };
  c.sanSangThan = function (e) {
    var n = e.def;
    if (n.human || n.tuSi) {
      var t = a.SpriteFactory;
      if (!t || !t.peek || !t.enqueue) {
        return !0;
      }
      var i = M(e.type, n, e.vuKhi);
      return !!t.peek(t.keyOf(i)) || (t.enqueue(i), !1);
    }
    var o = a.Assets;
    return !(o && o.giaiMaDang > 0 && o.dangGiaiMa(o.mobPath(n.anhMob || e.type)));
  };
  var T = .3;
  function S(e, n) {
    var t = null;
    var i = (n || 80) * (n || 80);
    var o = a.SceneWorld && a.SceneWorld.player;
    if (o && !o.downed) {
      var r = (o.x - e.x) * (o.x - e.x) + (o.y - e.y) * (o.y - e.y);
      if (r <= i) {
        i = r;
        t = o;
      }
    }
    var h = a.Gateway && a.Gateway.remotes;
    if (h) {
      for (var l in h) {
        var d = h[l];
        if (d && d.seen && !d.downed) {
          var s = (d.x - e.x) * (d.x - e.x) + (d.y - e.y) * (d.y - e.y);
          if (s <= i) {
            i = s;
            t = d;
          }
        }
      }
    }
    return t;
  }
  function P(a, e) {
    return Math.abs(a) > Math.abs(e) ? a < 0 ? 1 : 2 : e < 0 ? 3 : 0;
  }
  function C(e) {
    var n = a.Player;
    if (!n || !n.hasPhiKiem || !n.phiKiemPose || !e.def.tuSi && !e.def.human) {
      return null;
    }
    var t = M(e.type, e.def, e.vuKhi);
    if (!n.hasPhiKiem(t)) {
      e.phiKiemProxy = null;
      return null;
    }
    var i = e.phiKiemProxy;
    if (!(i && i.cfg === t)) {
      i = e.phiKiemProxy = { x: e.x, y: e.y, cfg: t, dir: 0, state: "idle", actTime: 0, phiKiem: null, downed: !1, flyRise: 0 };
    }
    return i;
  }
  function D(a) {
    var e = a.lastMoveX || 0;
    var n = a.lastMoveY || 0;
    return Math.abs(e) < .01 && Math.abs(n) < .01 ? 0 : Math.abs(e) > Math.abs(n) ? e < 0 ? 1 : 2 : n < 0 ? 3 : 0;
  }
  c.drawPhiKiem = function (e, n, t, i, o) {
    if (!e.dead) {
      var r = C(e);
      if (r) {
        var h = null == r.lastT ? 0 : Math.max(0, Math.min(.1, o - r.lastT));
        r.lastT = o;
        r.x = e.x;
        r.y = e.y;
        if ("attack" === r.state) {
          r.actTime += h;
          if (r.actTime >= a.Player.phiKiemDuration(r.cfg)) {
            r.state = "idle";
            r.phiKiem = null;
          }
        }
        var l = a.Player.phiKiemPose(r, o);
        if (l && a.Player.drawPhiKiem) {
          a.Player.drawPhiKiem(n, l, t, i);
        }
      }
    }
  };
  c.theoDoiChem = function (e, n) {
    if (e.dead) {
      e.teleTruoc = !1;
      return void (e.bossTeleTruoc = !1);
    }
    var t = "telegraph" === e.attackState;
    var i = !(!e.def.tuSi && !e.def.human);
    if (!i && (e.def.isBoss || /Yêu Thú Cấp/.test(e.def.name || ""))) {
      if (t && !e.bossTeleTruoc) {
        var o = S(e, 3 * (e.def.hitRadius || a.CONFIG.ENEMY.HIT_RADIUS) + 24);
        e.bossAimX = o ? o.x : e.x + 36 * (e.dir < 0 ? -1 : 1);
        e.bossAimY = o ? o.y : e.y;
      }
      if (!t && e.bossTeleTruoc) {
        var r = a.VFX;
        var h = e.bossAimX - e.x;
        var l = e.bossAimY - e.y;
        if (r && r.spawnBossStrike) {
          r.spawnBossStrike(e.bossAimX, e.bossAimY - 14, h, l, e.type, e.def.drawScale || 1);
        }
      }
      e.bossTeleTruoc = t;
    }
    if (i) {
      if (t && !e.teleTruoc) {
        var d = S(e, 140);
        e.huongDanh = d ? P(d.x - e.x, d.y - e.y) : null;
        var s = C(e);
        if (s) {
          s.x = e.x;
          s.y = e.y;
          s.dir = null != e.huongDanh ? e.huongDanh : D(e);
          s.state = "attack";
          s.actTime = 0;
          a.Player.startPhiKiem(s, d || null);
        }
      }
      if (!t && e.teleTruoc) {
        e.chemLuc = n;
        (function (e) {
          var n = a.VFX;
          if (n) {
            var t = e.vuKhi || e.def.tuSi && e.def.tuSi.weapon || e.def.human && e.def.human.weapon;
            var i = S(e, (e.def.hitRadius || a.CONFIG.ENEMY.HIT_RADIUS) * ((e.def.drawScale || 1) > 1 ? 1.4 : 1) + 26);
            var o = i ? i.x - e.x : e.dir < 0 ? -1 : 1;
            var r = i ? i.y - e.y : 0;
            var h = i ? i.x : e.x + (e.dir < 0 ? -24 : 24);
            var l = i ? i.y : e.y;
            if (a.Audio && a.Audio.atPoint) {
              var d = t && a.Audio.weaponAttackSfx ? a.Audio.weaponAttackSfx(t) : a.Audio.enemyAttackSfx ? a.Audio.enemyAttackSfx(e.type) : "swing";
              a.Audio.atPoint(d, e.x, e.y, { gain: .6, rate: .85 + .2 * Math.random() });
            }
            if ("bich_nguc_ta_dao" === t && n.spawnBichNgucTaDao) {
              n.spawnBichNgucTaDao(h, l);
            }
            else if ("bang_linh_kiem" === t && n.spawnBangLinhKiemImpact) {
              n.spawnBangLinhKiemImpact(h, l - 10, o, r);
            }
            else {
              if ("huyet_kiem" === t && n.spawnHuyetKiem) {
                n.spawnHuyetKiem(h, l - 8);
                return void (n.spawnHuyetKiemImpact && n.spawnHuyetKiemImpact(h, l - 8, o, r));
              }
              if ("huyet_ma_liem" === t && n.spawnHuyetMaLiemSwing) {
                var s = e.def.drawScale || 1;
                n.spawnHuyetMaLiemSwing(e.x, e.y - 22 * (s - 1), a.CONFIG.DIRS[P(o, r)] || "down", i, { duration: .42, hitU: .3 });
              }
              else if (!e.phiKiemProxy) {
                var u = a.WeaponArt && t && a.WeaponArt.defOf ? a.WeaponArt.defOf({ weapon: t }) : null;
                var c = u && u.trail;
                if (c && n.spawnBladeArc) {
                  var f = 180 * Math.atan2(r, o) / Math.PI;
                  n.spawnBladeArc(e.x, e.y, { start: f - 70, sweep: 140, radius: (c.radius || 17) + 4, lift: c.lift || 20, core: c.core, glow: c.glow, life: c.life || .28, style: c.style });
                }
                else {
                  if (n.spawnSlash) {
                    n.spawnSlash(e.x, e.y, P(o, r));
                  }
                }
                if (i && n.spawnHitSpark) {
                  n.spawnHitSpark(h, l - 10, o, r);
                }
              }
            }
          }
        })(e);
      }
      e.teleTruoc = t;
    }
    else {
      e.teleTruoc = !1;
    }
  };
  var A = { xanh: { lo: "#1b6fd6", mid: "#48b6ff", hi: "#c9f2ff", glow: "rgba(90,190,255,", core: "#2fd0e8" }, do: { lo: "#a3122c", mid: "#ff3b4f", hi: "#ffd0d0", glow: "rgba(255,70,80,", core: "#ff5a3a" }, xam: { lo: "#3f5670", mid: "#8fb0d0", hi: "#e6f0ff", glow: "rgba(150,190,230,", core: "#9fd0f0" } };
  c.TRU_MAU = A;
  c.mauTru = function (e) {
    if (e && ("yl_tran_son_bia" === e.type || "tm_tru" === e.type)) {
      return A.xam;
    }
    if (e && "htd_tru_bang" === e.type) {
      return A.xanh;
    }
    if (e && "htd_tru_hoa" === e.type) {
      return A.do;
    }
    var n = a.LamLang;
    return A[n && n.mauTru && n.mauTru(e && e.id) || "do"] || A.do;
  };
  c.nongTru = function (a) {
    return { dx: 0, dy: -96 * (a && a.def && a.def.drawScale || 1) };
  };
  c.veTamTru = function (e, n, t, i, o, r, h) {
    var l = a.LamLang;
    var d = l && l.TRU_BAN;
    if ("yl_tran_son_bia" === n.type && a.YenLang && (d = a.YenLang.BIA_BAN), "htd_tru_bang" !== n.type && "htd_tru_hoa" !== n.type || !a.HuThien || (d = a.HuThien.TRU_BAN), d) {
      var s = c.mauTru(n);
      var u = a.Gateway;
      var f = a.SceneWorld && a.SceneWorld.player;
      var p = d.TAM;
      var g = n.truMucTieu && o - (n.truBanLuc || -99) < d.NHIP_MS / 1e3 + .7 ? n.truMucTieu : null;
      var m = !(!g || !u || g !== u.selfId);
      if (f && !f.downed && Math.hypot(f.x - n.x, f.y - n.y) <= p + 140 || m) {
        var w = m ? .7 + .3 * Math.sin(10 * o) : .38;
        var _ = m ? "rgba(255,60,60," + w.toFixed(2) + ")" : s.glow + w.toFixed(2) + ")";
        a.Pixel.ellipse(e, t, i, p, .5 * p, m ? "rgba(255,40,40,0.06)" : null, _);
        a.Pixel.ellipse(e, t, i, p - 2, .5 * p - 1, null, s.glow + (.45 * w).toFixed(2) + ")");
      }
      if (g) {
        var y = m ? f : u && u.remotes && u.remotes[g];
        if (y && !y.downed) {
          var b = c.nongTru(n);
          var v = t + b.dx;
          var x = i + b.dy;
          var M = Math.round(y.x - r);
          var k = Math.round(y.y - h) - 20;
          var T = .3 + .25 * Math.sin(14 * o);
          a.Pixel.line(e, v, x, M, k, s.glow + T.toFixed(2) + ")");
          a.Pixel.line(e, v + 1, x, M + 1, k, s.glow + (.5 * T).toFixed(2) + ")");
        }
      }
    }
  };
  var Y = { bach_ho_tuyet: { k: "huyet", r: 34, edge: "#7d1c2c", mid: "#ff6b58", glow: "#ffd0a0" }, linh_ho_tran_son: { k: "huyet", r: 56, edge: "#7d1c2c", mid: "#e63d46", glow: "#ffd27a" }, xich_nhan_nguu: { k: "hoa", r: 42, edge: "#8e2518", mid: "#f05a24", glow: "#ffd26a" }, than_thu_xich_long: { k: "hoa", r: 72, edge: "#8e2518", mid: "#ff6b22", glow: "#fff0a0" }, xich_tinh_mang: { k: "doc", r: 24, edge: "#1d633c", mid: "#4fbd68", glow: "#d9ff9c" }, xich_mang_vuong: { k: "doc", r: 50, edge: "#1d633c", mid: "#55c978", glow: "#dcffae" }, u_minh_cu_mang: { k: "doc", r: 58, edge: "#26395f", mid: "#5277b8", glow: "#b8d8ff" }, song_duc_ma_bao: { k: "phong", r: 66, edge: "#49306e", mid: "#9567d6", glow: "#ead8ff" }, ngan_mao_hong: { k: "phong", r: 36, edge: "#49306e", mid: "#9567d6", glow: "#dfe8ff" }, thach_yeu: { k: "tho", r: 27, edge: "#54452f", mid: "#9d8053", glow: "#f0d69d" }, thach_ma: { k: "tho", r: 42, edge: "#1e4e70", mid: "#3c9bd0", glow: "#c5efff" }, thach_giap_yeu: { k: "tho", r: 44, edge: "#5d1d25", mid: "#c23b45", glow: "#ffd0ba" }, thach_mach_vuong: { k: "tho", r: 70, edge: "#604116", mid: "#c89027", glow: "#fff0a0" }, xuyen_son_giap: { k: "phong", r: 40, edge: "#1d4f6e", mid: "#4fb4e0", glow: "#d4f6ff" }, xuyen_son_giap_bd: { k: "phong", r: 58, edge: "#5a1230", mid: "#d0384e", glow: "#ffd680" }, duoc_linh_thu: { k: "moc", r: 25, edge: "#2e775d", mid: "#62d39c", glow: "#e3ffe5" }, doc_dang_yeu: { k: "doc", r: 30, edge: "#315e23", mid: "#74b84a", glow: "#e5ff9e" }, yeu_quai_ha_pham: { k: "ma", r: 28, edge: "#39204e", mid: "#8652a8", glow: "#e7c5ff" } };
  c.sacHien = function (a) {
    return a.bienDi && Y[a.type + "_bd"] || Y[a.type] || null;
  };
  var N = 160;
  var R = { base: "#6cc04a", hi: "#9ade74", dark: "#3f7d2c", line: "#1f3d16", eye: "#12210d", belly: "#b6e79a" };
  var H = { base: "#9a9aa2", hi: "#c2c2ca", dark: "#6e6e78", line: "#2f2f36", pink: "#e59aa8", pinkDk: "#b96f7f", eye: "#12121a" };
  var I = { fur: "#dfe8cf", furHi: "#f4f8e8", furDk: "#a8b795", line: "#3d4a32", jade: "#4fbf9a", jadeHi: "#9df2dd", horn: "#7fc05c", hornHi: "#b6e79a", eye: "#1c2a18", glow: "#bff3d8" };
  var L = { vine: "#4a7a34", vineHi: "#7fc05c", vineDk: "#2c4a1f", line: "#16290f", bloom: "#8a4fa8", bloomDk: "#5a2f70", bloomHi: "#c98fe0", poison: "#a7e05a", maw: "#2a1030", eye: "#f2e08a" };
  var F = { fur: "#5a4a6b", furHi: "#7d6a90", furDk: "#3a2f47", line: "#1a1424", horn: "#d8cfae", hornDk: "#9c9078", claw: "#efe7cd", eye: "#f0c04a", maw: "#2a1020", aura: "#a97fd0" };
  var B = "assets/sprites/mob/thach_than.png";
  var O = { w: 240, h: 202, ax: 120, ay: 200, mat: [[116, 76.5], [140, 83]] };
  var X = { thach_yeu: { w: 40, khe: ["#4a2206", "#d98a22", "#ffe2a6"], kheA: 1, bloom: .2, mat: .5, hq: null }, thach_ma: { w: 60, khe: ["#08345a", "#29a8ff", "#d6f5ff"], kheA: 1, bloom: .35, mat: .75, hq: { than: .14, dat: 0, dom: 0 } }, thach_giap_yeu: { w: 64, khe: ["#5a0610", "#ff2636", "#ffd8d2"], kheA: 1, bloom: .55, mat: 1.2, hq: { than: .24, dat: .3, dom: 4 } }, thach_mach_vuong: { w: 60, khe: ["#553400", "#ffbf2e", "#fff5cf"], kheA: 1, bloom: .6, mat: 1.35, hq: { than: .32, dat: .45, dom: 8, vong: !0 } }, htd_thach_ma: { w: 60, khe: ["#2a0a4a", "#a24bff", "#ecd6ff"], kheA: 1, bloom: .6, mat: 1.3, hq: { than: .3, dat: .45, dom: 6, vong: !0 } } };
  c.THACH_THAN = X;
  var W = {};
  function E(a) {
    var e = parseInt(a.slice(1), 16);
    return [e >> 16 & 255, e >> 8 & 255, 255 & e];
  }
  function K(a, e, n, t) {
    var i = O;
    var o = i.w;
    var r = i.h;
    var h = document.createElement("canvas");
    for (h.width = o, h.height = r, h.getContext("2d").drawImage(a, e, 0, o, r, 0, 0, o, r); o / 2 >= n;) {
      var l = Math.round(o / 2);
      var d = Math.round(r / 2);
      var s = document.createElement("canvas");
      s.width = l;
      s.height = d;
      var u = s.getContext("2d");
      u.imageSmoothingEnabled = !0;
      u.imageSmoothingQuality = "high";
      u.drawImage(h, 0, 0, o, r, 0, 0, l, d);
      h = s;
      o = l;
      r = d;
    }
    var c = document.createElement("canvas");
    c.width = n;
    c.height = t;
    var f = c.getContext("2d");
    f.imageSmoothingEnabled = !0;
    f.imageSmoothingQuality = "high";
    f.drawImage(h, 0, 0, o, r, 0, 0, n, t);
    return c;
  }
  function q(a, e) {
    return "rgba(" + a[0] + "," + a[1] + "," + a[2] + "," + Math.max(0, Math.min(1, e)).toFixed(3) + ")";
  }
}(window.PNTT);
