!function (t) {
  "use strict";
  var T = t.TranMach;
  var a = t.MapData && t.MapData.MO_LINH_THACH;
  if (T && a) {
    a.tranMach = !0;
    a.enemies.push({ id: T.TRU_ID, type: T.TRU, tx: T.TRU_O.tx, ty: T.TRU_O.ty });
  }
  else {
    if ("undefined" != typeof console) {
      console.error("[PNTT] Trụ Trấn Mạch: thiếu luật TranMach hoặc Mỏ Linh Thạch.");
    }
  }
}(window.PNTT);
