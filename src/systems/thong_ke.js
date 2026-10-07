/* ============================================================================
 *  thong_ke.js — THỐNG KÊ DIỆT QUÁI (Nghịch Tiên)
 * ----------------------------------------------------------------------------
 *  Game gốc chỉ đếm quái cho nhiệm vụ (Quest.kills ở giai đoạn 5,
 *  Quest.patrolKills ở giai đoạn 6). File này thêm bộ đếm tổng, lưu trong
 *  Quest.flags.thong_ke nên tự đi theo bản lưu lên Firebase:
 *      { tong: tổng quái, boss: số boss, loai: { "Tên quái": số lần } }
 *  Không tính người (def.human), giống cách game gốc đếm.
 * ==========================================================================*/
(function (P) {
  "use strict";
  var Q = P.Quest;
  if (!Q || !Q.addKill || Q.__thongKeVa) return;
  Q.__thongKeVa = true;
  var goc = Q.addKill;
  Q.addKill = function (def) {
    if (def && !def.human) {
      try {
        var f = Q.flags || (Q.flags = {});
        var t = f.thong_ke || (f.thong_ke = { tong: 0, boss: 0, loai: {} });
        t.tong = (t.tong | 0) + 1;
        if (def.isBoss) t.boss = (t.boss | 0) + 1;
        var ten = String(def.name || "?").split("·").map(function (x) { return x.trim(); })
          .filter(function (x) { return x && !/^Yêu Thú/.test(x); }).join(" · ") || "?";
        t.loai = t.loai || {};
        t.loai[ten] = (t.loai[ten] | 0) + 1;
      } catch (e) { /* thống kê hỏng không được làm hỏng trận đánh */ }
    }
    var r = goc.apply(this, arguments);
    if (!r && def && !def.human) Q.save();   // goc chỉ tự lưu ở giai đoạn 5–6
    return r;
  };
})(window.PNTT);
