/* ============================================================================
 *  vat_pham_moi.js — VẬT PHẨM LẤY TỪ BẢN CẬP NHẬT CỦA TÁC GIẢ
 * ----------------------------------------------------------------------------
 *  items.js của bản Nghịch Tiên là bản cũ. Món nào tác giả thêm sau thì khai báo
 *  ở đây (dán nguyên khối định nghĩa từ items.js bản mới), để không phải sửa
 *  file items.js lớn. Nạp ngay sau items.js / thu_cuoi.js trong index.html.
 * ==========================================================================*/
(function (P) {
  "use strict";
  var I = P.ITEMS;   // ví dụ: I.ten_moi = { id: "ten_moi", name: "...", ... };

  // (Huyết Ma Phủ đã có trong items.js bản mới của tác giả — không khai báo lại ở đây.)

  // Vật phẩm đã gỡ khỏi game: xoá khỏi túi đồ của người chơi cũ khi vào game
  var DA_GO = ["bi_tich_nhan_kiem_hop_nhat"];
  function donTui() {
    var INV = P.Inventory; if (!INV || !INV.bag) return false;
    DA_GO.forEach(function (id) { if (id in INV.bag) delete INV.bag[id]; if (INV.bound && id in INV.bound) delete INV.bound[id]; });
    return true;
  }
  var lan = 0, hen = setInterval(function () { donTui(); if (++lan > 60) clearInterval(hen); }, 1000);
})(window.PNTT);
