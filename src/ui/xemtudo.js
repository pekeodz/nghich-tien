!function (t) {
  "use strict";
  var e = null;
  function n() {
    var n = document.getElementById("hud-right");
    if (n && t.Camera) {
      (e = document.createElement("button")).type = "button";
      e.id = "cam-recenter";
      e.hidden = !0;
      e.textContent = "◎";
      e.title = "Về nhân vật (Y)";
      e.setAttribute("aria-label", "Về nhân vật");
      e.addEventListener("pointerdown", function (t) {
        t.stopPropagation();
      });
      e.addEventListener("click", function (e) {
        e.stopPropagation();
        t.Camera.recenter();
      });
      n.appendChild(e);
      t.Camera.onFreeChange = function (t) {
        e.hidden = !t;
      };
    }
  }
  if ("loading" === document.readyState) {
    document.addEventListener("DOMContentLoaded", n);
  }
  else {
    n();
  }
}(window.PNTT);
