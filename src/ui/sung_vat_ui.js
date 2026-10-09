/* ============================================================================
 *  sung_vat_ui.js — MỤC SỦNG VẬT TRONG HÀNH TRANG (Nghịch Tiên)
 * ----------------------------------------------------------------------------
 *  Sân xem sủng vật (xoay 4 hướng, đổi hoạt ảnh Đi / Đánh / Đứng / Nghỉ),
 *  danh sách sủng vật đang có, cấp + kinh nghiệm, kỹ năng, nút Xuất Chiến / Thu Về,
 *  và trứng sủng vật trong túi để ấp.
 * ==========================================================================*/
(function (P) {
  "use strict";
  var SV = P.SungVat;
  if (!SV) return;
  var U = P.SungVatUI = {};
  var st = { el: null, chon: null, huong: 0, tuXoay: true, dungTay: 0, hoatAnh: "di", raf: 0, cv: null };
  var THU_TU_HUONG = [0, 1, 3, 2];
  var TEN_HA = { di: "Đi", danh: "Đánh", dung: "Đứng", nghi: "Nghỉ" };

  function bieuTuong(icon, kt) {
    var c = document.createElement("canvas");
    c.width = c.height = kt || 32;
    P.drawItemIcon(c.getContext("2d"), icon, 0, 0, kt || 32);
    if (P.sharpenItemIcon) P.sharpenItemIcon(c, icon);
    return c;
  }
  function anhThe(src, kt) { var i = document.createElement("img"); i.src = src + "?v=1"; i.width = i.height = kt; i.alt = ""; return i; }
  function dsTrung() {
    var I = P.Inventory; if (!I) return [];
    return I.list().filter(function (x) { return x.def && x.def.trungCua && SV.DS[x.def.trungCua]; });
  }
  function caption(t) { if (P.HUD && P.HUD.setCaption) P.HUD.setCaption(t); }

  /* ---------------- sân xem ---------------- */
  function veSan() {
    var cv = st.cv;
    if (!cv || !cv.isConnected || !st.el || st.el.classList.contains("hidden")) { st.raf = 0; return; }
    var c = cv.getContext("2d"), t = performance.now() / 1000;
    c.clearRect(0, 0, cv.width, cv.height);
    var id = st.chon, d = id && SV.DS[id];
    if (d) {
      if (st.tuXoay && t > st.dungTay) st.huong = THU_TU_HUONG[Math.floor(t / 2.4) % 4];
      c.fillStyle = "rgba(0,0,0,0.28)";
      c.beginPath(); c.ellipse(100, 168, 34, 9, 0, 0, Math.PI * 2); c.fill();
      var ha = st.hoatAnh, tt = ha === "danh" ? ((t % 1.2) / 0.6) : t;
      if (ha === "danh" && t % 1.2 > 0.6) { ha = "dung"; tt = t; }
      var col = SV.khung(d, ha, ha === "nghi" ? (t % 6) : tt, st.huong);
      SV.veKhung(c, d, col, ha === "nghi" ? 0 : st.huong, 100, 170, 1.35);
    }
    st.raf = requestAnimationFrame(veSan);
  }
  function xoay(b) {
    var i = THU_TU_HUONG.indexOf(st.huong);
    st.huong = THU_TU_HUONG[(i + b + 4) % 4];
    st.dungTay = performance.now() / 1000 + 6;
  }

  /* ---------------- dựng mục ---------------- */
  U.render = function (el) {
    el = el || document.getElementById("ht-sung-vat");
    if (!el) return;
    st.el = el;
    var D = SV.du(), co = Object.keys(D.co).filter(function (k) { return SV.DS[k]; });
    if (!st.chon || !D.co[st.chon]) st.chon = SV.dangXuat() || co[0] || null;
    el.innerHTML = "";
    var goc = document.createElement("div"); goc.className = "sv";

    // trái: sân + danh sách sủng vật
    var trai = document.createElement("section"); trai.className = "sv-trai";
    var san = document.createElement("div"); san.className = "sv-san";
    var cv = document.createElement("canvas"); cv.width = 200; cv.height = 190; cv.className = "sv-hinh";
    san.appendChild(cv); st.cv = cv;
    if (st.chon) {
      [["◀", -1, "trai"], ["▶", 1, "phai"]].forEach(function (x) {
        var b = document.createElement("button"); b.type = "button"; b.className = "ngt-xoay " + x[2]; b.textContent = x[0];
        b.onclick = function () { xoay(x[1]); }; san.appendChild(b);
      });
      var ha = document.createElement("div"); ha.className = "sv-ha";
      Object.keys(TEN_HA).forEach(function (k) {
        var b = document.createElement("button"); b.type = "button"; b.textContent = TEN_HA[k];
        if (st.hoatAnh === k) b.className = "on";
        b.onclick = function () { st.hoatAnh = k; U.render(el); };
        ha.appendChild(b);
      });
      san.appendChild(ha);
    } else {
      var rong = document.createElement("p"); rong.className = "sv-rong";
      rong.textContent = "Chưa có sủng vật nào.";
      san.appendChild(rong);
    }
    trai.appendChild(san);
    var hang = document.createElement("div"); hang.className = "sv-o";
    co.forEach(function (k) {
      var d = SV.DS[k], s = D.co[k];
      var b = document.createElement("button"); b.type = "button";
      b.className = "equip-slot filled sv-slot" + (st.chon === k ? " selected" : "");
      b.appendChild(anhThe(d.icon, 34));
      var nh = document.createElement("small"); nh.textContent = d.ten + " · " + s.lv; b.appendChild(nh);
      if (D.xuat === k) { b.classList.add("dang-xuat"); b.title = "Đang xuất chiến"; }
      b.onclick = function () { st.chon = k; U.render(el); };
      hang.appendChild(b);
    });
    if (co.length) trai.appendChild(hang);
    goc.appendChild(trai);

    // phải: thông tin + kỹ năng + trứng
    var phai = document.createElement("section"); phai.className = "sv-phai";
    if (st.chon) {
      var d = SV.DS[st.chon], s = D.co[st.chon];
      var ct = document.createElement("div"); ct.className = "ngt-chitiet sv-ct";
      var dau = document.createElement("div"); dau.className = "ngt-dau";
      dau.appendChild(anhThe(d.icon, 36));
      var tdiv = document.createElement("div");
      tdiv.innerHTML = '<b class="ngt-ten"></b><small class="ngt-pham"></small>';
      tdiv.querySelector("b").textContent = d.ten + " · cấp " + s.lv + (s.lv >= SV.CAU_HINH.CAP_TOI_DA ? " (tối đa)" : "");
      tdiv.querySelector("small").textContent = D.xuat === st.chon ? "Đang xuất chiến" : "Đang nghỉ trong túi linh thú";
      dau.appendChild(tdiv); ct.appendChild(dau);
      // thanh kinh nghiệm
      var can = SV.expCan(s.lv), pct = s.lv >= SV.CAU_HINH.CAP_TOI_DA ? 100 : Math.min(100, Math.round(100 * (s.exp || 0) / can));
      var thanh = document.createElement("div"); thanh.className = "sv-exp";
      thanh.innerHTML = '<i style="width:' + pct + '%"></i><span></span>';
      thanh.querySelector("span").textContent = s.lv >= SV.CAU_HINH.CAP_TOI_DA ? "Cấp tối đa" : (s.exp || 0) + " / " + can + " kinh nghiệm";
      ct.appendChild(thanh);
      var nut = document.createElement("button"); nut.type = "button"; nut.className = "btn-choice primary ngt-nut";
      if (D.xuat === st.chon) {
        nut.textContent = "Thu Về";
        nut.onclick = function () { SV.xuatChien(null); caption(d.ten + " đã về túi linh thú."); U.render(el); };
      } else {
        nut.textContent = "Xuất Chiến";
        nut.onclick = function () { SV.xuatChien(st.chon); caption(d.ten + " xuất chiến!"); U.render(el); };
      }
      ct.appendChild(nut);
      var cs = document.createElement("small"); cs.className = "ngt-cs";
      cs.textContent = "Mỗi cú mổ ≈ " + SV.satThuong(st.chon) + " sát thương (" + Math.round((d.donGoc + d.donMoiCap * s.lv) * 100) + "% đòn thường của chủ) · " + d.nhipDanh + " giây/cú";
      ct.appendChild(cs);
      var mt = document.createElement("p"); mt.className = "ngt-mota"; mt.textContent = d.mota; ct.appendChild(mt);
      // kỹ năng
      var kn = document.createElement("div"); kn.className = "sv-kn";
      kn.appendChild(anhThe(d.kyNang.anh, 40));
      var kt = document.createElement("div");
      kt.innerHTML = '<b></b><small></small>';
      kt.querySelector("b").textContent = d.kyNang.ten;
      kt.querySelector("small").textContent = d.kyNang.mota;
      kn.appendChild(kt); ct.appendChild(kn);
      phai.appendChild(ct);
    } else {
      var gy = document.createElement("p"); gy.className = "ngt-goi-y";
      gy.textContent = "Ấp một quả Trứng Sủng Vật để có bạn đồng hành: sủng vật đi theo đạo hữu, cùng đánh yêu thú, tự dùng kỹ năng và lên cấp dần.";
      phai.appendChild(gy);
    }
    // trứng trong túi
    var tde = document.createElement("h3"); tde.className = "ngt-tde"; tde.textContent = "Trứng trong túi"; phai.appendChild(tde);
    var ds = dsTrung();
    if (!ds.length) { var r = document.createElement("p"); r.className = "dim-note"; r.textContent = "Chưa có trứng sủng vật nào."; phai.appendChild(r); }
    ds.forEach(function (x) {
      var dong = document.createElement("div"); dong.className = "sv-trung";
      dong.appendChild(bieuTuong(x.def.icon, 32));
      var tt = document.createElement("div");
      tt.innerHTML = "<b></b><small></small>";
      tt.querySelector("b").textContent = x.def.name + (x.qty > 1 ? " ×" + x.qty : "");
      var daCo = !!D.co[x.def.trungCua];
      tt.querySelector("small").textContent = daCo ? "Đã có " + SV.DS[x.def.trungCua].ten + " — ấp thêm thành 200 kinh nghiệm" : "Ấp ra " + SV.DS[x.def.trungCua].ten;
      dong.appendChild(tt);
      var b = document.createElement("button"); b.type = "button"; b.className = "btn-choice primary ngt-nut"; b.textContent = "Ấp Trứng";
      b.onclick = function () {
        var kq = SV.apTrung(x.def.id);
        if (!kq.ok) return caption(kq.why);
        st.chon = kq.id; st.hoatAnh = "dung";
        caption(kq.daCo ? SV.DS[kq.id].ten + " nhận thêm 200 kinh nghiệm." : SV.DS[kq.id].ten + " đã nở và theo đạo hữu!");
        if (P.HUD && P.HUD.refreshBag) P.HUD.refreshBag();
        U.render(el);
      };
      dong.appendChild(b);
      phai.appendChild(dong);
    });
    goc.appendChild(phai);
    el.appendChild(goc);
    if (!st.raf) st.raf = requestAnimationFrame(veSan);
  };

  /* ---------------- CSS ---------------- */
  function css() {
    if (document.getElementById("sv-css")) return;
    var s = document.createElement("style"); s.id = "sv-css";
    s.textContent = [
      ".sv { display: grid; grid-template-columns: 236px minmax(0, 1fr); gap: 12px; align-items: start; }",
      ".sv-trai { display: flex; flex-direction: column; gap: 8px; }",
      ".sv-san { position: relative; height: 222px; border: 2px solid #6f5432; overflow: hidden;",
      "  background: radial-gradient(ellipse at 50% 76%, rgba(150, 170, 90, 0.34), transparent 55%), repeating-linear-gradient(0deg, rgba(255,255,255,0.02) 0 1px, transparent 1px 4px), #2d241b;",
      "  box-shadow: inset 0 0 0 1px #15100b, inset 0 0 24px rgba(0,0,0,0.55); }",
      ".sv-hinh { position: absolute; left: 50%; top: 0; width: 200px; height: 190px; transform: translateX(-50%); }",
      ".sv-ha { position: absolute; left: 0; right: 0; bottom: 6px; display: flex; justify-content: center; gap: 4px; }",
      ".sv-ha button { padding: 3px 8px; font-size: 11px; cursor: pointer; color: #f0e3c7; background: rgba(18,13,9,.6);",
      "  border: 1px solid rgba(177,143,86,.5); border-radius: 3px; }",
      ".sv-ha button.on { color: #2a1c0e; background: linear-gradient(180deg, #f0d48a, #c8964a); border-color: #7a5426; font-weight: 700; }",
      ".sv-san .ngt-xoay { bottom: auto; top: 80px; }",
      ".sv-rong { position: absolute; inset: 0; display: grid; place-items: center; margin: 0; color: #bfae8e; font-size: 12px; }",
      ".sv-o { display: flex; justify-content: center; flex-wrap: wrap; gap: 10px; padding: 2px 0 14px; }",
      ".sv-o .equip-slot { position: relative; left: auto; top: auto; right: auto; transform: none; }",
      ".sv-o .equip-slot img { width: 34px; height: 34px; image-rendering: auto; }",
      ".sv-o .equip-slot.selected { outline: 2px solid #d5b56d; outline-offset: 1px; }",
      ".sv-o .equip-slot.dang-xuat { box-shadow: 0 0 0 2px #7fd88a, 0 0 10px rgba(127,216,138,.6); }",
      ".sv-ct img { image-rendering: auto; }",
      ".sv-exp { position: relative; height: 14px; background: rgba(0,0,0,.45); border: 1px solid #6f5432; border-radius: 2px; overflow: hidden; }",
      ".sv-exp i { position: absolute; left: 0; top: 0; bottom: 0; background: linear-gradient(90deg, #c88a2a, #f0d48a); }",
      ".sv-exp span { position: relative; display: block; text-align: center; font-size: 10px; line-height: 13px; color: #fff3d6; text-shadow: 0 1px 0 #000; }",
      ".sv-ct .ngt-nut { align-self: stretch; text-align: center; }",
      ".sv-kn { display: flex; gap: 8px; align-items: flex-start; padding: 6px; background: rgba(18,13,9,.35); border: 1px solid rgba(177,143,86,.35); border-radius: 3px; }",
      ".sv-kn img { width: 40px; height: 40px; flex: none; border: 1px solid #c8964a; border-radius: 3px; }",
      ".sv-kn div { display: flex; flex-direction: column; gap: 2px; } .sv-kn b { color: #ffcf8a; font-size: 12px; } .sv-kn small { color: #d6c6a8; font-size: 11px; line-height: 15px; }",
      ".sv-trung { display: flex; align-items: center; gap: 8px; padding: 6px 8px; margin-bottom: 6px; background: rgba(73, 52, 29, 0.12);",
      "  border: 1px solid rgba(177,143,86,.3); border-radius: 3px; }",
      ".sv-trung canvas { width: 36px; height: 36px; } .sv-trung div { flex: 1; display: flex; flex-direction: column; }",
      ".sv-trung b { color: #f3dfb8; font-size: 12px; } .sv-trung small { color: #bfae8e; font-size: 11px; } .sv-trung .ngt-nut { align-self: center; margin: 0; }",
      "@media (max-width: 720px) { .sv { grid-template-columns: 1fr; } }"
    ].join("\n");
    (document.head || document.documentElement).appendChild(s);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", css); else css();
})(window.PNTT);
