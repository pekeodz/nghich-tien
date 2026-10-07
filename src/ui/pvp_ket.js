!function (e) {
  "use strict";
  var t = e.PvpKet = {};
  var a = null;
  var n = 0;
  var i = 0;
  var s = "";
  var l = 0;
  function o() {
    if (a) {
      var e = Date.now();
      if (e >= n) {
        a.hidden = !0;
        a.classList.remove("hien");
        return void (l && (clearInterval(l), l = 0));
      }
      a.querySelector("small").textContent = i && e < i ? "Về " + s + " sau " + Math.ceil((i - e) / 1e3) + "s" : "";
    }
  }
  t.show = function (t) {
    if (t && t.tieu) {
      var d = a || ((a = document.createElement("div")).id = "pvp-ket", a.hidden = !0, a.setAttribute("role", "status"), a.setAttribute("aria-live", "polite"), a.innerHTML = "<b></b><span></span><small></small>", document.body.appendChild(a), a);
      var r = Date.now();
      d.className = "pvp-" + ("thang" === t.kq || "thua" === t.kq ? t.kq : "hoa");
      d.querySelector("b").textContent = t.tieu;
      d.querySelector("span").textContent = t.phu || "";
      s = t.ve || "";
      i = s && t.dem > 0 ? r + t.dem : 0;
      n = r + Math.max(1500, Math.min(15e3, t.ms || 6e3));
      d.hidden = !1;
      d.offsetWidth;
      d.classList.add("hien");
      if (e.Audio && e.Audio.play) {
        e.Audio.play("thang" === t.kq ? "pvp_win" : "thua" === t.kq ? "pvp_lose" : "pvp_draw");
      }
      o();
      if (!(l)) {
        l = setInterval(o, 250);
      }
    }
  };
}(window.PNTT);
