/* Nghịch Tiên — NPC điểm danh ở làng Tản Viên đổi thành Rem (ảnh do chủ game cung cấp).
 * Ghi đè lúc chạy, không sửa mapdata.js của tác giả. Chức năng NPC (điểm danh, tiểu sử,
 * giới thiệu người làm game) giữ nguyên. */
(function (P) {
  "use strict";
  var md = P.MapData && (P.MapData.TAN_VIEN || (P.MapData.get && P.MapData.get("tan_vien")));
  if (!md) return;
  [].concat(md.props || [], md.interactables || [], md.npcs || []).forEach(function (o) {
    if (!o || o.id !== "manh_shopt1") return;
    o.name = "Rem";
    o.cfg = Object.assign({}, o.cfg || {}, { gender: "female", hair: "tien_tu", hairColor: "lam", outfit: "lam_y", skin: "light", shoes: "ink" });
    o.npcSprite = { paths: ["assets/sprites/npc/rem.png"], frameW: 30, frameH: 68, drawW: 30, drawH: 68, anchorX: 15, anchorY: 66, shadowRx: 10, shadowRy: 3, fps: 1, seq: [0] };
  });
  if (P.ASSET_MANIFEST && !P.ASSET_MANIFEST["assets/sprites/npc/rem.png"]) P.ASSET_MANIFEST["assets/sprites/npc/rem.png"] = 2708;
})(window.PNTT);
