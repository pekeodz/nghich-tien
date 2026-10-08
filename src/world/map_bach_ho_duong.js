/* Nghịch Tiên — bản đồ phó bản Bạch Hổ Đường (vào từ Môn Đồ Bạch Hổ Đường ở cổng tây Thành Thăng Long).
 * Sảnh vuông, giữa là đài ngọc có hào nước bao quanh, 4 cây cầu. Môn đồ canh giữ đứng ở đầu cầu,
 * hạ hết thì Đường Chủ Long Quy hiện trên đài; Long Quy ngã thì Thử Bảo chạy tán loạn.
 * Quái trong phó bản do systems/bach_ho_duong.js thả lúc vào, không để trong enemies[]. */
(function (P) {
  "use strict";
  if (!P.MapData) return;
  P.MapData.BACH_HO_DUONG = {
    id: "bach_ho_duong", scope: "party", name: "Bạch Hổ Đường", subtitle: "Hạ Đường Chủ, nhặt Thử Bảo",
    width: 36, height: 28,
    legend: {
      V: { ground: "dt_wall", block: !0, flyBlock: !0 },
      s: { ground: "dt_slate", block: !1 },
      v: { ground: "dt_paving", block: !1 },
      j: { ground: "dt_jade", block: !1 },
      p: { ground: "pebble", block: !1 },
      "=": { ground: "bridge", block: !1 },
      "3": { ground: "water", block: !0, anim: !0 }
    },
    ground: ["VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV", "VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV", "VVssssssssssssssssssssssssssssssssVV", "VVssssssssssssssssssssssssssssssssVV", "VVssssssssssssssssssssssssssssssssVV", "VVsssssss33333333==33333333sssssssVV", "VVsssssss33333333==33333333sssssssVV", "VVsssssss33vvvvvvvvvvvvvv33sssssssVV", "VVsssssss33vjjjjjjjjjjjjv33sssssssVV", "VVsssssss33vjjjjjjjjjjjjv33sssssssVV", "VVsssssss33vjjjjjjjjjjjjv33sssssssVV", "VVsssssss33vjjjjjjjjjjjjv33sssssssVV", "VVsssssss==vjjjjjjjjjjjjv==sssssssVV", "VVsssssss==vjjjjjjjjjjjjv==sssssssVV", "VVsssssss33vjjjjjjjjjjjjv33sssssssVV", "VVsssssss33vjjjjjjjjjjjjv33sssssssVV", "VVsssssss33vjjjjjjjjjjjjv33sssssssVV", "VVsssssss33vjjjjjjjjjjjjv33sssssssVV", "VVsssssss33vvvvvvvvvvvvvv33sssssssVV", "VVsssssss33333333==33333333sssssssVV", "VVsssssss33333333==33333333sssssssVV", "VVsssssssssssssssppsssssssssssssssVV", "VVsssssssssssssssppsssssssssssssssVV", "VVsssssssssssssssppsssssssssssssssVV", "VVsssssssssssssssppsssssssssssssssVV", "VVsssssssssssssssppsssssssssssssssVV", "VVVVVVVVVVVVVVVVppppVVVVVVVVVVVVVVVV", "VVVVVVVVVVVVVVVVppppVVVVVVVVVVVVVVVV"],
    interactables: [], props: [], enemies: [], critters: [],
    napQuai: ["long_quy", "thu_bao", "hac_y_ta_tu_1"],
    decorations: [
      { name: "dt_long_tru", tx: 11, ty: 7, variant: 0 }, { name: "dt_long_tru", tx: 24, ty: 7, variant: 1 },
      { name: "dt_long_tru", tx: 11, ty: 18, variant: 0 }, { name: "dt_long_tru", tx: 24, ty: 18, variant: 1 },
      { name: "dt_co_chien", tx: 5, ty: 3, variant: 0 }, { name: "dt_co_chien", tx: 30, ty: 3, variant: 1 },
      { name: "dt_co_chien", tx: 5, ty: 23, variant: 2 }, { name: "dt_co_chien", tx: 30, ty: 23, variant: 3 },
      { name: "dt_lu_hoa", tx: 15, ty: 22, variant: 0 }, { name: "dt_lu_hoa", tx: 20, ty: 22, variant: 1 },
      { name: "dt_lu_hoa", tx: 15, ty: 3, variant: 0 }, { name: "dt_lu_hoa", tx: 20, ty: 3, variant: 1 },
      { name: "dt_den_long", tx: 3, ty: 12, variant: 0 }, { name: "dt_den_long", tx: 32, ty: 12, variant: 1 },
      { name: "dt_gia_binh_khi", tx: 4, ty: 7, variant: 0 }, { name: "dt_gia_binh_khi", tx: 31, ty: 17, variant: 0 },
      { name: "dt_trong_thanh", tx: 31, ty: 7, variant: 0 }, { name: "dt_gom", tx: 4, ty: 18, variant: 0 }
    ],
    portals: [
      { tx: 16, ty: 27, toMap: "bat_quai_thach_phan", targetSpawn: { tx: 11, ty: 30 }, label: "Rời Bạch Hổ Đường" },
      { tx: 17, ty: 27, toMap: "bat_quai_thach_phan", targetSpawn: { tx: 11, ty: 30 }, label: "Rời Bạch Hổ Đường" },
      { tx: 18, ty: 27, toMap: "bat_quai_thach_phan", targetSpawn: { tx: 11, ty: 30 }, label: "Rời Bạch Hổ Đường" },
      { tx: 19, ty: 27, toMap: "bat_quai_thach_phan", targetSpawn: { tx: 11, ty: 30 }, label: "Rời Bạch Hổ Đường" }
    ],
    spawn: { tx: 17, ty: 24 },
    ambient: "#1d2430"
  };
})(window.PNTT);
