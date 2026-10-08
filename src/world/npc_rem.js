/* Nghịch Tiên — NPC điểm danh ở làng Tản Viên (Mạnh ShopT1) đổi thành Rem (ảnh do chủ game cung cấp).
 * Tự chứa: ảnh nằm ngay trong file này, và đổi NPC ở cả dữ liệu bản đồ, lúc nạp bản đồ lẫn lúc vẽ,
 * nên không phụ thuộc thứ tự nạp hay file ảnh riêng. Chức năng NPC (điểm danh, tiểu sử...) giữ nguyên. */
(function (P) {
  "use strict";
  var ID = "manh_shopt1";
  var PATH = "assets/sprites/npc/rem.png";
  var ANH = "data:image/png;base64,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";
  var SPRITE = { paths: [PATH], frameW: 30, frameH: 68, drawW: 30, drawH: 68, anchorX: 15, anchorY: 66, shadowRx: 10, shadowRy: 3, fps: 1, seq: [0] };
  var img = new Image();
  img.src = ANH;

  function doi(o) {
    if (!o || o.id !== ID) return;
    o.name = "Rem";
    o.cfg = Object.assign({}, o.cfg || {}, { gender: "female", hair: "tien_tu", hairColor: "lam", outfit: "lam_y", skin: "light", shoes: "ink" });
    o.npcSprite = SPRITE;
  }
  function doiDuLieu() {
    var M = P.MapData; if (!M) return;
    var md = M.TAN_VIEN || (M.get && M.get("tan_vien"));
    if (md) [].concat(md.props || [], md.interactables || [], md.npcs || []).forEach(doi);
  }
  function boc() {
    // ảnh: trả về ảnh nhúng sẵn nếu bộ nạp chưa có file rem.png
    if (P.Assets && P.Assets.get && !P.Assets.get.__rem) {
      var g = P.Assets.get;
      P.Assets.get = function (p) { var r = g.apply(this, arguments); if (!r && p === PATH && img.complete && img.width) return img; return r; };
      P.Assets.get.__rem = true;
    }
    var T = P.TileMap;
    if (T && T.load && !T.load.__rem) {
      var ld = T.load;
      T.load = function () { var r = ld.apply(this, arguments); (T.props || []).forEach(doi); (T.interactables || []).forEach(doi); return r; };
      T.load.__rem = true;
    }
    if (T && T.drawProp && !T.drawProp.__rem) {
      var dp = T.drawProp;
      T.drawProp = function (r, e) { if (e && e.id === ID && e.name !== "Rem") doi(e); return dp.apply(this, arguments); };
      T.drawProp.__rem = true;
    }
    if (T && T.props) T.props.forEach(doi);
    doiDuLieu();
  }
  boc();
  if (typeof document !== "undefined") document.addEventListener("DOMContentLoaded", boc);
  setTimeout(boc, 1500);
  setInterval(function () { var T = P.TileMap; if (T && T.props) T.props.forEach(function (o) { if (o.id === ID && o.name !== "Rem") boc(); }); }, 2000);
})(window.PNTT);
