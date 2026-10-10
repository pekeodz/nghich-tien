/* ============================================================================
 *  sung_vat_ui.js — MỤC SỦNG VẬT TRONG HÀNH TRANG (Nghịch Tiên)
 * ----------------------------------------------------------------------------
 *  Bố cục giống bảng Trang Bị của nhân vật:
 *    trái  — bảng sủng vật đang chọn: hình động ở giữa, 3 ô trang bị Mũ · Vai · Giáp,
 *            dòng chỉ số, thanh kinh nghiệm, nút Xuất Chiến / Thu Về;
 *    phải  — 3 mục: Sủng Vật (mọi sủng vật trong game, con chưa có hiện mờ + cách nhận),
 *            Trang Bị (đồ cho sủng vật trong túi), Trứng (ấp trứng), và khung chi tiết.
 *  Thêm sủng vật mới chỉ cần khai báo trong SungVat.DS — bảng tự hiện thêm ô.
 * ==========================================================================*/
(function (P) {
  "use strict";
  var SV = P.SungVat;
  if (!SV) return;
  var U = P.SungVatUI = {};
  var st = { el: null, chon: null, loc: "pet", xem: null, huong: 0, tuXoay: true, dungTay: 0, hoatAnh: "dung", raf: 0, cv: null };
  var THU_TU_HUONG = [0, 1, 3, 2];
  var TEN_HA = { di: "Đi", danh: "Đánh", dung: "Đứng", nghi: "Nghỉ" };
  var FONT_TEN = '"FVF Fernando 08", monospace';

  function el(tag, cls, txt) { var e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; }
  function bieuTuong(icon, kt) {
    var c = document.createElement("canvas");
    c.width = c.height = kt || 32;
    P.drawItemIcon(c.getContext("2d"), icon, 0, 0, kt || 32);
    if (P.sharpenItemIcon) P.sharpenItemIcon(c, icon);
    return c;
  }
  function anhThe(src, kt) { var i = document.createElement("img"); i.src = src + "?v=2"; i.width = i.height = kt; i.alt = ""; return i; }
  function lopPham(g) { return P.Loot && P.Loot.gradeKey ? "grade-" + P.Loot.gradeKey(g) : ""; }
  function caption(t) { if (P.HUD && P.HUD.setCaption) P.HUD.setCaption(t); }
  function amThanh(id) { if (P.Audio && P.Audio.play) { try { P.Audio.play(id); } catch (e) {} } }
  function I() { return P.Inventory; }
  function dsTrung() { return I() ? I().list().filter(function (x) { return x.def && x.def.trungCua && SV.DS[x.def.trungCua]; }) : []; }
  function dsDoSV() { return I() ? I().list().filter(function (x) { return SV.laDoSV(x.def); }) : []; }
  function tenO(slot) { for (var i = 0; i < SV.O_TB.length; i++) if (SV.O_TB[i].id === slot) return SV.O_TB[i].ten; return slot; }
  function dongChiSo(it) {
    return SV.CHI_SO.filter(function (c) { return +it[c[0]]; }).map(function (c) { return c[1] + " " + c[2] + it[c[0]] + c[3]; }).join(" · ");
  }

  /* ---------------- hình động giữa bảng ---------------- */
  function veSan() {
    var cv = st.cv;
    if (!cv || !cv.isConnected || !st.el || st.el.classList.contains("hidden")) { st.raf = 0; return; }
    var c = cv.getContext("2d"), t = performance.now() / 1000;
    c.clearRect(0, 0, cv.width, cv.height);
    var d = st.chon && SV.DS[st.chon];
    if (d) {
      if (st.tuXoay && t > st.dungTay) st.huong = THU_TU_HUONG[Math.floor(t / 2.4) % 4];
      var co = !!SV.du().co[st.chon];
      var ha = st.hoatAnh, tt = t;
      if (ha === "danh") { var chu = t % 1.3; if (chu < 0.6) tt = chu / 0.6; else ha = "dung"; }
      if (ha === "nghi") tt = t % 7;
      c.save();
      if (!co) c.filter = "grayscale(1) brightness(0.45)";
      SV.veKhung(c, d, SV.khung(d, ha, tt, st.huong), st.huong, cv.width / 2, cv.height - 10, 0.92);
      c.restore();
    }
    st.raf = requestAnimationFrame(veSan);
  }
  function xoay(b) {
    var i = THU_TU_HUONG.indexOf(st.huong);
    st.huong = THU_TU_HUONG[(i + b + 4) % 4];
    st.dungTay = performance.now() / 1000 + 6;
  }

  /* ---------------- bảng trái ---------------- */
  function bangTrai() {
    var D = SV.du(), id = st.chon, d = SV.DS[id], s = D.co[id];
    var pane = el("section", "equipment-pane sv-pane");
    // tên (chữ giống tên người chơi) + cấp
    var dau = el("div", "sv-dau");
    dau.appendChild(el("b", "sv-ten", d.ten.toLowerCase()));
    dau.appendChild(el("small", "sv-cap", s ? "Cấp " + s.lv : "Chưa sở hữu"));
    if (s && D.xuat === id) dau.appendChild(el("span", "sv-the", "Đang xuất chiến"));
    pane.appendChild(dau);

    var board = el("div", "equipment-board sv-board");
    var cv = document.createElement("canvas"); cv.width = 132; cv.height = 132; cv.className = "sv-hinh";
    board.appendChild(cv); st.cv = cv;
    var tb = s ? SV.tbCua(id) : {};
    SV.O_TB.forEach(function (o) {
      var itId = tb[o.id], it = itId && P.ITEMS[itId];
      var b = el("button", "equip-slot sv-eq-" + o.id + (it ? " filled " + lopPham(it.grade) : " empty"));
      b.type = "button";
      if (it) b.appendChild(bieuTuong(it.icon, 32)); else b.appendChild(el("span", "slot-mark", o.mark));
      b.appendChild(el("small", "", o.ten));
      if (st.xem && st.xem.slot === o.id && st.xem.dangMac) b.classList.add("selected");
      b.onclick = function () {
        if (!s) return caption("Chưa có " + d.ten + ".");
        st.xem = { slot: o.id, item: itId || null, dangMac: !!it };
        st.loc = "tb";
        U.render(st.el);
      };
      board.appendChild(b);
    });
    [["◀", -1, "trai"], ["▶", 1, "phai"]].forEach(function (x) {
      var b = el("button", "ngt-xoay sv-xoay " + x[2], x[0]); b.type = "button";
      b.setAttribute("aria-label", x[1] < 0 ? "Xoay trái" : "Xoay phải");
      b.onclick = function () { xoay(x[1]); }; board.appendChild(b);
    });
    var ha = el("div", "sv-ha");
    Object.keys(TEN_HA).forEach(function (k) {
      var b = el("button", st.hoatAnh === k ? "on" : "", TEN_HA[k]); b.type = "button";
      b.onclick = function () { st.hoatAnh = k; U.render(st.el); };
      ha.appendChild(b);
    });
    board.appendChild(ha);
    pane.appendChild(board);

    // dòng chỉ số kiểu bảng nhân vật
    var tom = el("div", "equipment-summary sv-tom");
    var cs = SV.chiSoTb(id);
    [
      ["Cấp", s ? s.lv : "—", ""],
      ["Sát thương", s ? SV.satThuong(id) : "—", cs.svCong ? "+" + cs.svCong + "%" : ""],
      ["Nhịp đánh", SV.nhipDanh(id).toFixed(2) + "s", cs.svTocDanh ? "+" + cs.svTocDanh + "%" : ""],
      ["Kỹ năng", Math.round(SV.hoiChieu(id) * 10) / 10 + "s", cs.svHoiChieu ? "−" + cs.svHoiChieu + "%" : ""],
      ["K.nghiệm", "+" + (cs.svExp || 0) + "%", ""]
    ].forEach(function (x) {
      var sp = el("span"); sp.appendChild(el("i", "", x[0])); sp.appendChild(document.createTextNode(String(x[1])));
      if (x[2]) sp.appendChild(el("b", "", x[2]));
      tom.appendChild(sp);
    });
    pane.appendChild(tom);

    if (s) {
      var max = s.lv >= SV.CAU_HINH.CAP_TOI_DA, can = SV.expCan(s.lv), pct = max ? 100 : Math.min(100, Math.round(100 * (s.exp || 0) / can));
      var thanh = el("div", "sv-exp"); var vach = el("i"); vach.style.width = pct + "%"; thanh.appendChild(vach);
      thanh.appendChild(el("span", "", max ? "Cấp tối đa" : (s.exp || 0) + " / " + can + " kinh nghiệm"));
      pane.appendChild(thanh);
      var nut = el("button", "sv-nut", D.xuat === id ? "Thu Về" : "Xuất Chiến"); nut.type = "button";
      nut.onclick = function () {
        if (D.xuat === id) { SV.xuatChien(null); caption(d.ten + " đã về túi linh thú."); }
        else { SV.xuatChien(id); caption(d.ten + " xuất chiến!"); }
        amThanh("ui"); U.render(st.el);
      };
      pane.appendChild(nut);
    } else {
      pane.appendChild(el("p", "sv-khoa", "Chưa sở hữu · Nhận từ: " + (d.nguon || "sự kiện")));
    }
    return pane;
  }

  /* ---------------- bảng phải ---------------- */
  function bangPhai() {
    var D = SV.du();
    var pane = el("section", "inventory-pane sv-pane");
    var loc = el("div", "bag-filters sv-loc");
    [["pet", "Sủng Vật"], ["tb", "Trang Bị"], ["trung", "Trứng"]].forEach(function (x) {
      var b = el("button", "bag-filter" + (st.loc === x[0] ? " on" : ""), x[1]); b.type = "button";
      b.onclick = function () { st.loc = x[0]; if (x[0] !== "tb") st.xem = null; U.render(st.el); };
      loc.appendChild(b);
    });
    pane.appendChild(loc);
    var luoi = el("div", "bag-list sv-luoi");
    var ct = el("div", "ngt-chitiet sv-ct");

    if (st.loc === "pet") {
      var ids = Object.keys(SV.DS);
      ids.sort(function (a, b) { return (D.co[b] ? 1 : 0) - (D.co[a] ? 1 : 0); });
      ids.forEach(function (k) {
        var d = SV.DS[k], s = D.co[k];
        var b = el("button", "bag-slot sv-the-pet" + (s ? "" : " chua") + (st.chon === k ? " selected" : "") + (D.xuat === k ? " xuat" : ""));
        b.type = "button"; b.title = d.ten;
        b.appendChild(anhThe(d.icon, 36));
        b.appendChild(el("span", "bag-qty", s ? "Lv" + s.lv : "🔒"));
        b.onclick = function () { st.chon = k; st.xem = null; U.render(st.el); };
        luoi.appendChild(b);
      });
      pane.appendChild(luoi);
      pane.appendChild(el("p", "dim-note sv-dem", "Đã có " + Object.keys(D.co).filter(function (k) { return SV.DS[k]; }).length + " / " + ids.length + " sủng vật"));
      chiTietPet(ct);
    } else if (st.loc === "tb") {
      var ds = dsDoSV();
      ds.forEach(function (x) {
        var b = el("button", "bag-slot " + lopPham(x.def.grade) + (st.xem && !st.xem.dangMac && st.xem.item === x.def.id ? " selected" : ""));
        b.type = "button"; b.title = x.def.name;
        b.appendChild(bieuTuong(x.def.icon, 32));
        if (x.qty > 1) b.appendChild(el("span", "bag-qty", "x" + x.qty));
        b.onclick = function () { st.xem = { slot: x.def.svSlot, item: x.def.id, dangMac: false }; U.render(st.el); };
        luoi.appendChild(b);
      });
      pane.appendChild(luoi);
      if (!ds.length) pane.appendChild(el("p", "dim-note", "Chưa có trang bị sủng vật nào trong túi."));
      chiTietDo(ct);
    } else {
      var tr = dsTrung();
      if (!tr.length) pane.appendChild(el("p", "dim-note", "Chưa có trứng sủng vật nào."));
      tr.forEach(function (x) {
        var dong = el("div", "sv-trung");
        dong.appendChild(bieuTuong(x.def.icon, 32));
        var tt = el("div");
        tt.appendChild(el("b", "", x.def.name + (x.qty > 1 ? " ×" + x.qty : "")));
        var daCo = !!D.co[x.def.trungCua];
        tt.appendChild(el("small", "", daCo ? "Đã có " + SV.DS[x.def.trungCua].ten + " — ấp thêm thành 200 kinh nghiệm" : "Ấp ra " + SV.DS[x.def.trungCua].ten));
        dong.appendChild(tt);
        var b = el("button", "sv-nut nho", "Ấp Trứng"); b.type = "button";
        b.onclick = function () {
          var kq = SV.apTrung(x.def.id);
          if (!kq.ok) return caption(kq.why);
          st.chon = kq.id; st.hoatAnh = "dung"; st.loc = "pet";
          caption(kq.daCo ? SV.DS[kq.id].ten + " nhận thêm 200 kinh nghiệm." : SV.DS[kq.id].ten + " đã nở và theo đạo hữu!");
          if (P.HUD && P.HUD.refreshBag) P.HUD.refreshBag();
          U.render(st.el);
        };
        dong.appendChild(b);
        pane.appendChild(dong);
      });
      ct.appendChild(el("p", "ngt-goi-y", "Trứng sủng vật hiện do quản trị gửi tặng. Ấp xong, sủng vật hiện ở mục Sủng Vật và tự xuất chiến nếu đạo hữu chưa có con nào đi theo."));
    }
    pane.appendChild(ct);
    return pane;
  }
  function chiTietPet(box) {
    var d = SV.DS[st.chon], s = SV.du().co[st.chon];
    var h = el("div", "ngt-dau"); h.appendChild(anhThe(d.icon, 36));
    var t = el("div"); t.appendChild(el("b", "ngt-ten", d.ten)); t.appendChild(el("small", "ngt-pham", s ? "Cấp " + s.lv + " · " + (d.nguon || "") : "Chưa sở hữu · Nhận từ: " + (d.nguon || "sự kiện")));
    h.appendChild(t); box.appendChild(h);
    box.appendChild(el("p", "ngt-mota", d.mota));
    var kn = el("div", "sv-kn"); kn.appendChild(anhThe(d.kyNang.anh, 40));
    var kt = el("div"); kt.appendChild(el("b", "", d.kyNang.ten)); kt.appendChild(el("small", "", d.kyNang.mota));
    kn.appendChild(kt); box.appendChild(kn);
  }
  function chiTietDo(box) {
    var x = st.xem, d = SV.DS[st.chon], s = SV.du().co[st.chon];
    if (!x || !x.item) {
      box.appendChild(el("p", "ngt-goi-y", x && x.slot ? "Ô " + tenO(x.slot) + " của " + d.ten + " đang trống. Chọn một món trang bị sủng vật bên trên để mặc." :
        "Sủng vật mặc được 3 món: Mũ · Vai · Giáp. Trang bị cộng sát thương, tốc độ đánh, giảm hồi chiêu hoặc thêm kinh nghiệm cho riêng con đang mặc."));
      return;
    }
    var it = P.ITEMS[x.item]; if (!it) return;
    var h = el("div", "ngt-dau"); h.appendChild(bieuTuong(it.icon, 32));
    var t = el("div"); t.appendChild(el("b", "ngt-ten", it.name)); t.appendChild(el("small", "ngt-pham", (it.grade || "") + " · " + tenO(it.svSlot)));
    h.appendChild(t); box.appendChild(h);
    var cs = dongChiSo(it); if (cs) box.appendChild(el("small", "ngt-cs", cs));
    if (it.chiCho) box.appendChild(el("small", "ngt-cg", "Chỉ cho: " + it.chiCho.map(function (k) { return SV.DS[k] ? SV.DS[k].ten : k; }).join(", ")));
    if (it.desc) box.appendChild(el("p", "ngt-mota", it.desc));
    var nut = el("button", "sv-nut nho"); nut.type = "button";
    if (x.dangMac) {
      nut.textContent = "Tháo " + tenO(x.slot);
      nut.onclick = function () { var r = SV.thao(st.chon, x.slot); if (!r.ok) return caption(r.why); amThanh("ui"); st.xem = null; if (P.HUD && P.HUD.refreshBag) P.HUD.refreshBag(); U.render(st.el); };
    } else {
      nut.textContent = "Mặc cho " + d.ten;
      nut.disabled = !s || !SV.macDuoc(st.chon, it);
      nut.onclick = function () { var r = SV.mac(st.chon, it.id); if (!r.ok) return caption(r.why); amThanh("ui"); st.xem = { slot: it.svSlot, item: it.id, dangMac: true }; if (P.HUD && P.HUD.refreshBag) P.HUD.refreshBag(); U.render(st.el); };
    }
    box.appendChild(nut);
  }

  /* ---------------- dựng mục ---------------- */
  U.render = function (root) {
    root = root || document.getElementById("ht-sung-vat");
    if (!root) return;
    st.el = root;
    var D = SV.du();
    if (!st.chon || !SV.DS[st.chon]) st.chon = SV.dangXuat() || Object.keys(D.co).filter(function (k) { return SV.DS[k]; })[0] || Object.keys(SV.DS)[0];
    root.innerHTML = "";
    var shell = el("div", "bag-shell sv");
    shell.appendChild(bangTrai());
    shell.appendChild(bangPhai());
    root.appendChild(shell);
    if (!st.raf) st.raf = requestAnimationFrame(veSan);
  };

  /* ---------------- CSS ---------------- */
  function css() {
    if (document.getElementById("sv-css")) return;
    var s = document.createElement("style"); s.id = "sv-css";
    var vien = "1px 0 #000, -1px 0 #000, 0 1px #000, 0 -1px #000, 1px 1px #000, -1px -1px #000";
    s.textContent = [
      ".sv-dau { display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap; min-height: 20px; }",
      ".sv-ten { font-family: " + FONT_TEN + "; font-size: 15px; font-weight: 700; color: #f0d27a; letter-spacing: .02em; text-shadow: " + vien + "; }",
      ".sv-cap { font-family: " + FONT_TEN + "; font-size: 11px; color: #cfe0b8; text-shadow: " + vien + "; }",
      ".sv-the { margin-left: auto; padding: 1px 6px; font-size: 10px; color: #12210f; background: #8fd88a; border-radius: 8px; }",
      ".sv-board .sv-hinh { position: absolute; z-index: 1; left: 50%; top: 50%; width: 132px; height: 132px; transform: translate(-50%, -54%);",
      "  filter: drop-shadow(0 5px 3px rgba(0, 0, 0, 0.55)); }",
      ".sv-eq-mu { left: 50%; top: 6px; transform: translateX(-50%); }",
      ".sv-eq-mu:active { transform: translateX(-50%) translateY(1px); }",
      ".sv-eq-vai { left: 10px; top: 74px; } .sv-eq-giap { right: 10px; top: 74px; }",
      ".sv-board .equip-slot.selected { outline: 2px solid #d5b56d; outline-offset: 1px; }",
      ".sv-board .sv-xoay { bottom: auto; top: 150px; width: 24px; height: 24px; z-index: 2; }",
      ".sv-board .sv-xoay.trai { left: 14px; } .sv-board .sv-xoay.phai { right: 14px; }",
      ".sv-ha { position: absolute; z-index: 2; left: 0; right: 0; bottom: 6px; display: flex; justify-content: center; gap: 3px; }",
      ".sv-ha button { padding: 2px 7px; font-size: 10px; cursor: pointer; color: #f0e3c7; background: rgba(18,13,9,.6);",
      "  border: 1px solid rgba(177,143,86,.5); border-radius: 3px; }",
      ".sv-ha button.on { color: #2a1c0e; background: linear-gradient(180deg, #f0d48a, #c8964a); border-color: #7a5426; font-weight: 700; }",
      ".sv-tom span { line-height: 14px; } .sv-tom b { font-weight: 600; font-size: 10px; }",
      ".sv-exp { position: relative; height: 14px; margin-top: 6px; background: rgba(0,0,0,.45); border: 1px solid #6f5432; border-radius: 2px; overflow: hidden; }",
      ".sv-exp i { position: absolute; left: 0; top: 0; bottom: 0; background: linear-gradient(90deg, #c88a2a, #f0d48a); }",
      ".sv-exp span { position: relative; display: block; text-align: center; font-size: 10px; line-height: 13px; color: #fff3d6; text-shadow: 0 1px 0 #000; }",
      ".sv-nut { display: block; width: 100%; margin-top: 6px; padding: 6px 12px; cursor: pointer; color: #2a1c0e; font-weight: 700;",
      "  background: linear-gradient(180deg, #f0d48a, #c8964a); border: 1px solid #7a5426; border-radius: 3px; }",
      ".sv-nut:hover { filter: brightness(1.1); } .sv-nut:disabled { opacity: .5; cursor: default; filter: none; }",
      ".sv-nut.nho { width: auto; display: inline-block; align-self: flex-start; }",
      ".sv-khoa { margin: 6px 0 0; color: #bfae8e; font-size: 11px; text-align: center; }",
      ".sv-loc { grid-template-columns: repeat(3, minmax(0, 1fr)); }",
      ".sv-luoi { margin-bottom: 4px; }",
      ".sv-the-pet { position: relative; } .sv-the-pet img { width: 36px; height: 36px; image-rendering: auto; }",
      ".sv-the-pet.chua img { filter: grayscale(1) brightness(.45); } .sv-the-pet.selected { outline: 2px solid #d5b56d; outline-offset: 1px; }",
      ".sv-the-pet.xuat { box-shadow: 0 0 0 2px #7fd88a inset, 0 0 8px rgba(127,216,138,.5); }",
      ".sv-dem { margin: 0 0 6px; }",
      ".sv-ct { margin-top: 2px; } .sv-ct img { image-rendering: auto; }",
      ".sv-kn { display: flex; gap: 8px; align-items: flex-start; padding: 6px; background: rgba(18,13,9,.35); border: 1px solid rgba(177,143,86,.35); border-radius: 3px; }",
      ".sv-kn img { width: 40px; height: 40px; flex: none; border: 1px solid #c8964a; border-radius: 3px; }",
      ".sv-kn div { display: flex; flex-direction: column; gap: 2px; } .sv-kn b { color: #ffcf8a; font-size: 12px; } .sv-kn small { color: #d6c6a8; font-size: 11px; line-height: 15px; }",
      ".sv-trung { display: flex; align-items: center; gap: 8px; padding: 6px 8px; margin-bottom: 6px; background: rgba(73, 52, 29, 0.12);",
      "  border: 1px solid rgba(177,143,86,.3); border-radius: 3px; }",
      ".sv-trung canvas { width: 36px; height: 36px; } .sv-trung > div { flex: 1; display: flex; flex-direction: column; }",
      ".sv-trung b { color: #f3dfb8; font-size: 12px; } .sv-trung small { color: #bfae8e; font-size: 11px; } .sv-trung .sv-nut { margin: 0; align-self: center; }"
    ].join("\n");
    (document.head || document.documentElement).appendChild(s);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", css); else css();
})(window.PNTT);
