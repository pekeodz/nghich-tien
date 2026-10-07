!function (t) {
  "use strict";
  var n = t.Utils;
  var i = t.AuthUI = {};
  var a = {};
  var e = null;
  var s = "signin";
  var c = "off";
  var o = null;
  var u = 0;
  function r() {
    u++;
    c = "off";
    o = null;
    if (a.cap) {
      a.cap.classList.add("hidden");
    }
  }
  function h() {
    if (a.cap && t.Auth && t.Auth.layCaptcha) {
      var n = ++u;
      c = "dang-nap";
      o = null;
      a.capMa.value = "";
      a.capAnh.classList.add("dang-tai");
      t.Auth.layCaptcha().then(function (t) {
        if (n === u && "signup" === s)
          if (a.capAnh.classList.remove("dang-tai"), !t.ok || t.bat) {
            if (a.cap.classList.remove("hidden"), !t.ok) {
              c = "loi";
              a.capImg.removeAttribute("src");
              return void d(t.error + " Bấm vào khung ảnh để thử lại.", "warn");
            }
            c = "bat";
            o = t.id;
            a.capImg.src = t.anh;
          }
          else {
            r();
          }
      });
    }
    else {
      r();
    }
  }
  function g(t) {
    var n = "signin" === (s = t);
    a.submit.classList.toggle("is-active", n);
    a.toggle.classList.toggle("is-active", !n);
    a.submit.setAttribute("aria-pressed", String(n));
    a.toggle.setAttribute("aria-pressed", String(!n));
    a.pass.setAttribute("autocomplete", n ? "current-password" : "new-password");
    d("");
    if (n) {
      r();
    }
    else {
      h();
    }
  }
  function d(t, n) {
    a.msg.textContent = t || "";
    a.msg.className = "auth-msg" + (n ? " " + n : "");
  }
  function l(t) {
    a.submit.disabled = t;
    a.toggle.disabled = t;
    a.root.classList.toggle("busy", t);
  }
  function f() {
    return !a.terms || !!a.terms.checked;
  }
  function m() {
    if (!f()) {
      d("Bạn cần đồng ý Điều khoản sử dụng và Quy tắc cộng đồng trước khi vào game.", "warn");
      return void (a.terms && a.terms.focus());
    }
    var n = a.name.value.trim();
    var u = a.pass.value;
    if (!n) {
      d("Hãy nhập đạo hiệu.", "warn");
      return void a.name.focus();
    }
    if (u.length < 6) {
      d("Mật khẩu phải từ 6 ký tự.", "warn");
      return void a.pass.focus();
    }
    var r = null;
    if ("signup" === s) {
      if ("dang-nap" === c) {
        return void d("Đang tải mã bảo mật, đợi một chút…");
      }
      if ("loi" === c) {
        return void d("Chưa có mã bảo mật — bấm vào khung ảnh để tải lại.", "warn");
      }
      if ("bat" === c) {
        var g = a.capMa.value.trim();
        if (!g) {
          d("Hãy nhập mã bảo mật trong ảnh.", "warn");
          return void a.capMa.focus();
        }
        r = { id: o, ma: g };
      }
    }
    l(!0);
    d("signin" === s ? "Đang nhập đạo…" : "Đang khai tịch…");
    ("signin" === s ? t.Auth.signIn(n, u) : t.Auth.signUp(n, u, r)).then(function (n) {
      if (l(!1), !n.ok) {
        d(n.error, "warn");
        return void (r && (h(), n.captcha && a.capMa.focus()));
      }
      if (t.CloudSave.clearLocal(t.Auth.user && t.Auth.user.id), d("Thành công. Đang mở Tiên Đồ…"), i.hide(), e) {
        var s = e;
        e = null;
        s(!0);
      }
    }).catch(function (n) {
      l(!1);
      d(t.Net.viError(n), "warn");
      if (r) {
        h();
      }
    });
  }
  i.init = function () {
    if (a.root = n.$("#auth-gate"), a.name = n.$("#auth-name"), a.pass = n.$("#auth-pass"), a.submit = n.$("#auth-submit"), a.toggle = n.$("#auth-toggle"), a.msg = n.$("#auth-msg"), a.terms = n.$("#auth-terms"), a.guest = n.$("#auth-guest"), a.cap = n.$("#auth-captcha"), a.capMa = n.$("#auth-captcha-ma"), a.capAnh = n.$("#auth-captcha-anh"), a.capImg = n.$("#auth-captcha-img"), a.root) {
      var t;
      var i = n.$("#auth-tai");
      if (i && (t = "undefined" != typeof navigator && navigator.userAgent || "", window.Capacitor || /Electron\//.test(t))) {
        i.classList.add("hidden");
      }
      a.submit.addEventListener("click", function () {
        if ("signin" === s) {
          m();
        }
        else {
          g("signin");
        }
      });
      a.toggle.addEventListener("click", function () {
        if ("signup" === s) {
          m();
        }
        else {
          g("signup");
        }
      });
      [a.name, a.pass, a.capMa].filter(Boolean).forEach(function (t) {
        t.addEventListener("keydown", function (t) {
          if ("Enter" === t.key) {
            m();
          }
        });
      });
      if (a.capAnh) {
        a.capAnh.addEventListener("click", function () {
          if ("signup" === s) {
            h();
          }
        });
      }
      if (a.terms) {
        a.terms.addEventListener("change", function () {
          if (a.terms.checked) {
            d("");
          }
        });
      }
      g("signin");
    }
  };
  i.show = function () {
    a.root.classList.remove("hidden");
    setTimeout(function () {
      a.name.focus();
    }, 60);
    return new Promise(function (t) {
      e = t;
    });
  };
  i.skip = function () {
    if (!a.root.classList.contains("busy")) {
      if (!f()) {
        d("Bạn cần đồng ý Điều khoản sử dụng và Quy tắc cộng đồng trước khi chơi khách.", "warn");
        return void (a.terms && a.terms.focus());
      }
      if (t.Auth && t.Auth.signInGuest && t.Net.online) {
        l(!0);
        d("Đang vào với tư cách khách…");
        t.Auth.signInGuest().then(function (i) {
          if (l(!1), !i || !i.ok) {
            console.warn("[PNTT] Không cấp được tài khoản khách:", i && i.error);
            return void s();
          }
          t.CloudSave.clearLocal(t.Auth.user && t.Auth.user.id);
          d("");
          n(!0);
        }).catch(function (t) {
          l(!1);
          console.warn("[PNTT] Không cấp được tài khoản khách:", t);
          s();
        });
      }
      else {
        n(!1);
      }
    }
    function n(t) {
      if (i.hide(), e) {
        var n = e;
        e = null;
        n(t);
      }
    }
    function s() {
      if (t.Gateway && t.Gateway.configured && t.Gateway.configured()) {
        d("Chưa vào được với tư cách khách — thử lại sau ít phút, hoặc đăng ký tài khoản.", "warn");
      }
      else {
        n(!1);
      }
    }
  };
  i.hide = function () {
    a.root.classList.add("hidden");
  };
}(window.PNTT);
