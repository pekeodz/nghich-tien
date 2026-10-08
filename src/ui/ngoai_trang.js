/* ============================================================================
 *  ngoai_trang.js — MỤC NGOẠI TRANG TRONG HÀNH TRANG (Nghịch Tiên)
 * ----------------------------------------------------------------------------
 *  Đồ Ngoại Trang (phi phong, sau này mặt nạ, ngoại y…) lưu chung Inventory.equipment
 *  và vẫn cộng chỉ số, nhưng không hiện trên bảng Trang Bị mà có mục riêng:
 *    - sân xem nhân vật xoay 4 hướng, có vòng sáng dưới chân,
 *    - các ô Ngoại Trang (ô "sapCo" = chưa mở, để dành),
 *    - danh sách đồ Ngoại Trang trong túi để khoác / tháo.
 *  Thêm loại mới: khai báo ô trong Inventory.slots với ngoaiTrang: true, vật phẩm có
 *  ngoaiTrang: true, rồi bỏ "sapCo" ở dòng tương ứng trong NT.O bên dưới.
 * ==========================================================================*/
(function (P) {
  "use strict";
  if (!P) return;
  var NT = P.NgoaiTrang = {};
  // thứ tự ô hiện trong mục Ngoại Trang
  NT.O = [
    { id: "phi_phong", name: "Phi Phong", mark: "PHONG" },
    { id: "mat_na", name: "Mặt Nạ", mark: "NẠ", sapCo: true },
    { id: "ngoai_y", name: "Ngoại Y", mark: "Y", sapCo: true }
  ];
  var st = { el: null, chon: null, huong: 0, tuXoay: true, dungTay: 0, raf: 0, cv: null };
  var THU_TU_HUONG = [0, 1, 3, 2];

  function inv() { return P.Inventory; }
  function lopPham(g) { return P.Loot && P.Loot.gradeKey ? "grade-" + P.Loot.gradeKey(g) : ""; }
  function bieuTuong(icon, kt) {
    var c = document.createElement("canvas");
    c.width = c.height = kt || 32;
    P.drawItemIcon(c.getContext("2d"), icon, 0, 0, kt || 32);
    if (P.sharpenItemIcon) P.sharpenItemIcon(c, icon);
    return c;
  }
  NT.dongChiSo = function (it) {
    var t = [];
    if (!it) return "";
    if (it.atkBonus) t.push("Công +" + it.atkBonus);
    if (it.hpBonus) t.push("Khí Huyết +" + it.hpBonus);
    if (it.mpBonus) t.push("Linh Lực +" + it.mpBonus);
    if (it.spBonus) t.push("Thần Thức +" + it.spBonus);
    if (it.bpBonus) t.push("Giáp +" + it.bpBonus);
    if (it.resistBonus) t.push("Kháng +" + Math.round(it.resistBonus * 100) + "%");
    return t.join(" · ");
  };
  function laOMo(id) {
    var s = inv() && inv().slots;
    return !!(s && s.some(function (o) { return o.id === id && o.ngoaiTrang; }));
  }
  function dangMac(id) { var I = inv(); return I && I.equipment ? I.equipped(id) : null; }
  function dsTrongTui() {
    var I = inv(); if (!I) return [];
    return I.list().filter(function (x) { return x.def && x.def.ngoaiTrang; })
      .sort(function (a, b) { return (b.def.phiPhongCap | 0) - (a.def.phiPhongCap | 0); });
  }
  function sauKhiDoi() {
    if (P.PhiPhong && P.PhiPhong.dongBo) P.PhiPhong.dongBo();
    else {
      var W = P.SceneWorld;
      if (W && W.player && P.Player && P.Player.refreshEquipment) P.Player.refreshEquipment(W.player);
      if (P.HUD && P.HUD.refreshPortrait) P.HUD.refreshPortrait();
    }
    if (P.Audio && P.Audio.play) { try { P.Audio.play("ui"); } catch (e) {} }
    NT.render(st.el);
  }

  /* ------------------------------------------------------------------ sân xem nhân vật */
  function veSan() {
    var cv = st.cv;
    if (!cv || !cv.isConnected || !st.el || st.el.classList.contains("hidden") || (P.HUD && P.HUD.bagOpen === false)) { st.raf = 0; return; }
    var c = cv.getContext("2d"), W = P.SceneWorld, pl = W && W.player;
    var t = performance.now() / 1000;
    c.clearRect(0, 0, cv.width, cv.height);
    // nền đất + bóng
    c.fillStyle = "rgba(0,0,0,0.28)";
    c.beginPath(); c.ellipse(100, 160, 30, 8, 0, 0, Math.PI * 2); c.fill();
    if (pl && pl.sheet && P.SpriteFactory) {
      if (st.tuXoay && t > st.dungTay) st.huong = THU_TU_HUONG[Math.floor(t / 2.2) % 4];
      var cfg = pl.cfg, k = P.PhiPhong ? P.PhiPhong.capDangMac() : -1;
      if (k >= 0 && P.PhiPhong.veVong) P.PhiPhong.veVong(c, 100, 160, k, t, 1.55);
      c.imageSmoothingEnabled = false;
      var col = Math.floor(t * 6) % 4;
      try { P.SpriteFactory.drawFrame(c, pl.sheet, st.huong, col, 68, 38, 2, cfg); } catch (e) {}
    }
    st.raf = requestAnimationFrame(veSan);
  }
  function xoay(b) {
    var i = THU_TU_HUONG.indexOf(st.huong);
    st.huong = THU_TU_HUONG[(i + b + 4) % 4];
    st.dungTay = performance.now() / 1000 + 6;
  }

  /* ------------------------------------------------------------------ chi tiết */
  function veChiTiet(box) {
    box.innerHTML = "";
    var x = st.chon;
    if (!x) {
      box.innerHTML = '<p class="ngt-goi-y">Chạm vào một ô hoặc một món bên trên để xem.<br>Phi phong nâng cấp ở chỗ <b>Rem</b>, Chân Núi Tản Viên.</p>';
      return;
    }
    if (x.sapCo) {
      box.innerHTML = '<b class="ngt-ten">' + x.o.name + '</b><small class="ngt-sap">Sắp ra mắt — ô này để dành cho đồ Ngoại Trang mới.</small>';
      return;
    }
    var it = x.def;
    if (!it) {
      box.innerHTML = '<b class="ngt-ten">' + x.o.name + '</b><small>Đang trống. Khoác một món ' + x.o.name + ' trong túi để hiện lên người.</small>';
      return;
    }
    var h = document.createElement("div"); h.className = "ngt-dau";
    h.appendChild(bieuTuong(it.icon, 32));
    var ten = document.createElement("div");
    ten.innerHTML = '<b class="ngt-ten"></b><small class="ngt-pham"></small>';
    ten.querySelector("b").textContent = it.name;
    ten.querySelector("small").textContent = (it.grade || "") + (typeof it.phiPhongCap === "number" ? " · cấp " + (it.phiPhongCap + 1) + "/11" : "");
    h.appendChild(ten); box.appendChild(h);
    var cs = NT.dongChiSo(it);
    if (cs) { var s1 = document.createElement("small"); s1.className = "ngt-cs"; s1.textContent = cs; box.appendChild(s1); }
    if (it.requireRealm && inv().realmNeedName) {
      var s2 = document.createElement("small"); s2.className = inv().realmOk(it) ? "ngt-cg" : "ngt-cg thieu";
      s2.textContent = "Cần " + inv().realmNeedName(it); box.appendChild(s2);
    }
    var mt = document.createElement("p"); mt.className = "ngt-mota"; mt.textContent = it.desc || ""; box.appendChild(mt);
    var nut = document.createElement("button"); nut.type = "button"; nut.className = "btn-choice primary ngt-nut";
    if (x.dangMac) {
      nut.textContent = "Tháo " + x.o.name;
      nut.onclick = function () { var r = inv().unequip(x.o.id); if (r && r.ok) { st.chon = null; sauKhiDoi(); } };
    } else {
      nut.textContent = "Khoác lên người";
      nut.onclick = function () {
        var r = inv().equip(it.id);
        if (r && r.ok) { st.chon = { o: x.o, def: it, dangMac: true }; sauKhiDoi(); }
        else if (P.HUD && P.HUD.setCaption) P.HUD.setCaption(r && r.reason === "chua_du_canh_gioi" ? "Chưa khoác nổi " + it.name + " — cần " + r.needName + "." : "Chưa khoác được.");
      };
    }
    box.appendChild(nut);
  }

  /* ------------------------------------------------------------------ dựng mục */
  NT.render = function (el) {
    el = el || document.getElementById("ht-ngoai-trang");
    if (!el || !inv()) return;
    st.el = el;
    el.innerHTML = "";
    var goc = document.createElement("div"); goc.className = "ngt";

    // trái: sân + ô
    var trai = document.createElement("section"); trai.className = "ngt-trai";
    var san = document.createElement("div"); san.className = "ngt-san";
    var cv = document.createElement("canvas"); cv.width = 200; cv.height = 210; cv.className = "ngt-hinh";
    cv.setAttribute("aria-label", "Nhân vật khoác Ngoại Trang");
    san.appendChild(cv); st.cv = cv;
    var ttrai = document.createElement("button"); ttrai.type = "button"; ttrai.className = "ngt-xoay trai"; ttrai.textContent = "◀"; ttrai.setAttribute("aria-label", "Xoay trái");
    var tphai = document.createElement("button"); tphai.type = "button"; tphai.className = "ngt-xoay phai"; tphai.textContent = "▶"; tphai.setAttribute("aria-label", "Xoay phải");
    ttrai.onclick = function () { xoay(-1); }; tphai.onclick = function () { xoay(1); };
    san.appendChild(ttrai); san.appendChild(tphai);
    trai.appendChild(san);

    var hangO = document.createElement("div"); hangO.className = "ngt-o";
    NT.O.forEach(function (o) {
      var mo = !o.sapCo && laOMo(o.id), def = mo ? dangMac(o.id) : null;
      var b = document.createElement("button"); b.type = "button";
      b.className = "equip-slot ngt-slot" + (def ? " filled " + lopPham(def.grade) : " empty") + (mo ? "" : " khoa");
      if (def) b.appendChild(bieuTuong(def.icon, 32));
      else { var m = document.createElement("span"); m.className = "slot-mark"; m.textContent = mo ? o.mark : "🔒"; b.appendChild(m); }
      var nh = document.createElement("small"); nh.textContent = o.name; b.appendChild(nh);
      if (st.chon && st.chon.o && st.chon.o.id === o.id && (st.chon.dangMac || st.chon.sapCo || !st.chon.def)) b.classList.add("selected");
      b.onclick = function () { st.chon = mo ? { o: o, def: def, dangMac: !!def } : { o: o, sapCo: true }; NT.render(el); };
      hangO.appendChild(b);
    });
    trai.appendChild(hangO);
    // tổng chỉ số từ Ngoại Trang
    var tong = { hpBonus: 0, bpBonus: 0, mpBonus: 0, spBonus: 0, resistBonus: 0 };
    inv().slots.forEach(function (o) { if (!o.ngoaiTrang) return; var d = dangMac(o.id); if (d) for (var k in tong) tong[k] += +d[k] || 0; });
    var tcs = NT.dongChiSo(tong);
    var tg = document.createElement("div"); tg.className = "ngt-tong";
    tg.textContent = tcs ? "Ngoại Trang cộng: " + tcs : "Chưa khoác Ngoại Trang nào.";
    trai.appendChild(tg);
    goc.appendChild(trai);

    // phải: túi đồ ngoại trang + chi tiết
    var phai = document.createElement("section"); phai.className = "ngt-phai";
    var tde = document.createElement("h3"); tde.className = "ngt-tde"; tde.textContent = "Trong túi"; phai.appendChild(tde);
    var luoi = document.createElement("div"); luoi.className = "bag-list ngt-luoi";
    var ds = dsTrongTui();
    ds.forEach(function (x) {
      var b = document.createElement("button"); b.type = "button"; b.className = "bag-slot " + lopPham(x.def.grade);
      b.appendChild(bieuTuong(x.def.icon, 32));
      if (x.qty > 1) { var q = document.createElement("span"); q.className = "bag-qty"; q.textContent = "x" + x.qty; b.appendChild(q); }
      b.title = x.def.name;
      if (st.chon && !st.chon.dangMac && st.chon.def && st.chon.def.id === x.def.id) b.classList.add("selected");
      b.onclick = function () {
        var o = NT.O.filter(function (z) { return z.id === x.def.slot; })[0] || { id: x.def.slot, name: "Ngoại Trang" };
        st.chon = { o: o, def: x.def, dangMac: false }; NT.render(el);
      };
      luoi.appendChild(b);
    });
    phai.appendChild(luoi);
    if (!ds.length) { var r = document.createElement("p"); r.className = "dim-note"; r.textContent = "Chưa có đồ Ngoại Trang nào trong túi."; phai.appendChild(r); }
    var ct = document.createElement("div"); ct.className = "ngt-chitiet";
    veChiTiet(ct);
    phai.appendChild(ct);
    goc.appendChild(phai);
    el.appendChild(goc);

    if (!st.raf) st.raf = requestAnimationFrame(veSan);
  };

  /* ------------------------------------------------------------------ Xem Thông Tin: hàng Ngoại Trang */
  function bocInspect() {
    var U = P.InspectUI;
    if (!U || !U.show || U.show.__ngoaiTrang) return;
    var goc = U.show;
    U.show = function (d) {
      var kq = goc.apply(this, arguments);
      try {
        var root = document.getElementById("inspect"), board = root && root.querySelector(".inspect-board");
        if (!board) return kq;
        var h = document.getElementById("inspect-ngoai");
        if (!h) { h = document.createElement("div"); h.id = "inspect-ngoai"; h.className = "inspect-ngoai"; board.parentNode.insertBefore(h, board.nextSibling); }
        h.innerHTML = "";
        var eq = (d && d.equipment) || {}, co = false;
        var nh = document.createElement("span"); nh.className = "inspect-ngoai-nhan"; nh.textContent = "Ngoại Trang"; h.appendChild(nh);
        NT.O.forEach(function (o) {
          if (o.sapCo) return;
          var it = eq[o.id] && P.ITEMS[eq[o.id]];
          var b = document.createElement("button"); b.type = "button";
          b.className = "inspect-ngoai-o " + (it ? lopPham(it.grade) : "empty");
          if (it) { co = true; b.appendChild(bieuTuong(it.icon, 24)); b.title = it.name; }
          else { b.textContent = o.mark; b.disabled = true; }
          var s = document.createElement("small"); s.textContent = it ? it.name.replace(/^Phi Phong /, "") : o.name + " · trống"; b.appendChild(s);
          if (it) b.onclick = function () {
            var box = document.getElementById("inspect-item"); if (!box) return;
            box.innerHTML = ""; var bb = document.createElement("b"); bb.textContent = it.name;
            var sm = document.createElement("small"); sm.textContent = (it.grade || "") + " · " + NT.dongChiSo(it);
            box.appendChild(bb); box.appendChild(sm); box.classList.remove("hidden");
          };
          h.appendChild(b);
        });
        h.classList.toggle("trong", !co);
      } catch (e) {}
      return kq;
    };
    U.show.__ngoaiTrang = true;
  }

  /* ------------------------------------------------------------------ CSS */
  function css() {
    if (document.getElementById("ngt-css")) return;
    var s = document.createElement("style"); s.id = "ngt-css";
    s.textContent = [
      ".ngt { display: grid; grid-template-columns: 236px minmax(0, 1fr); gap: 12px; align-items: start; }",
      ".ngt-trai { display: flex; flex-direction: column; gap: 8px; }",
      ".ngt-san { position: relative; height: 222px; border: 2px solid #6f5432; overflow: hidden;",
      "  background: radial-gradient(ellipse at 50% 72%, rgba(120, 150, 100, 0.32), transparent 55%), repeating-linear-gradient(0deg, rgba(255,255,255,0.02) 0 1px, transparent 1px 4px), #2d241b;",
      "  box-shadow: inset 0 0 0 1px #15100b, inset 0 0 24px rgba(0,0,0,0.55); }",
      ".ngt-hinh { position: absolute; left: 50%; top: 4px; width: 200px; height: 210px; transform: translateX(-50%); image-rendering: pixelated; }",
      ".ngt-xoay { position: absolute; bottom: 8px; width: 28px; height: 28px; padding: 0; cursor: pointer; color: #f0e3c7;",
      "  background: rgba(18,13,9,.55); border: 1px solid rgba(177,143,86,.5); border-radius: 50%; font-size: 12px; }",
      ".ngt-xoay.trai { left: 8px; } .ngt-xoay.phai { right: 8px; }",
      ".ngt-xoay:hover { filter: brightness(1.3); }",
      ".ngt-o { display: flex; justify-content: center; gap: 14px; padding: 2px 0 14px; }",
      ".ngt-o .equip-slot { position: relative; left: auto; top: auto; right: auto; transform: none; }",
      ".ngt-o .equip-slot.khoa { opacity: .55; }",
      ".ngt-o .equip-slot.selected, .ngt-luoi .bag-slot.selected { outline: 2px solid #d5b56d; outline-offset: 1px; }",
      ".ngt-tong { color: #d9c7a5; font-size: 11px; text-align: center; line-height: 15px; }",
      ".ngt-tde { margin: 0 0 6px; color: #e6cdb2; font-size: 13px; letter-spacing: .04em; }",
      ".ngt-luoi { grid-template-columns: repeat(auto-fill, minmax(46px, 1fr)) !important; margin-bottom: 8px; }",
      ".ngt-chitiet { display: flex; flex-direction: column; gap: 4px; padding: 8px 10px; background: rgba(73, 52, 29, 0.12);",
      "  border: 1px solid rgba(177,143,86,.3); border-radius: 3px; color: #e0d1b5; }",
      ".ngt-dau { display: flex; align-items: center; gap: 8px; } .ngt-dau canvas { width: 36px; height: 36px; image-rendering: pixelated; }",
      ".ngt-dau div { display: flex; flex-direction: column; }",
      ".ngt-ten { color: #f3dfb8; font-size: 13px; } .ngt-pham, .ngt-cg { color: #bfae8e; font-size: 11px; }",
      ".ngt-cs { color: #9fe0a8; font-size: 11px; } .ngt-cg.thieu { color: #ff9a8a; } .ngt-sap { color: #bfae8e; }",
      ".ngt-mota { margin: 2px 0; font-size: 11px; line-height: 16px; color: #d6c6a8; }",
      ".ngt-goi-y { margin: 0; font-size: 11px; line-height: 16px; color: #bfae8e; }",
      ".ngt-nut { align-self: flex-start; margin-top: 2px; padding: 6px 14px; cursor: pointer; color: #2a1c0e; font-weight: 700;",
      "  background: linear-gradient(180deg, #f0d48a, #c8964a); border: 1px solid #7a5426; border-radius: 3px; }",
      ".ngt-nut:hover { filter: brightness(1.1); }",
      "@media (max-width: 720px) { .ngt { grid-template-columns: 1fr; } }",
      ".inspect-ngoai { display: flex; align-items: center; gap: 8px; margin: 6px 0 0; padding: 4px 8px;",
      "  background: rgba(73, 52, 29, 0.08); border: 1px solid rgba(73, 52, 29, 0.22); border-radius: 3px; }",
      ".inspect-ngoai-nhan { color: #e1d0b7; font-size: 11px; font-weight: 700; letter-spacing: .04em; }",
      ".inspect-ngoai-o { display: flex; align-items: center; gap: 5px; padding: 2px 8px 2px 3px; cursor: pointer; color: #e6cdb2;",
      "  background: rgba(18,13,9,.35); border: 1px solid #705632; border-radius: 3px; font-size: 10px; }",
      ".inspect-ngoai-o canvas { width: 24px; height: 24px; image-rendering: pixelated; }",
      ".inspect-ngoai-o small { font-size: 11px; } .inspect-ngoai-o:disabled { cursor: default; opacity: .6; }"
    ].join("\n");
    (document.head || document.documentElement).appendChild(s);
  }

  function caiDat() { css(); bocInspect(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", caiDat); else caiDat();
  window.addEventListener("load", caiDat);
})(window.PNTT);
