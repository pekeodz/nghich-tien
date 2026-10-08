!function (t) {
  "use strict";
  var e = null;
  var n = null;
  function o(e) {
    if (n) {
      n.classList.toggle("hidden", !e);
    }
    var o;
    var c;
    var i = document.getElementById("account-login-name");
    if (i) {
      var a = !(!e || t.Auth && t.Auth.localFixture || !t.Auth.username);
      i.classList.toggle("hidden", !a);
      if (a) {
        i.textContent = "Tên đăng nhập: " + (2 !== (c = (o = String(t.Auth && t.Auth.username || "")).split("@")).length ? o : (c[0].length < 3 ? c[0].charAt(0) : c[0].slice(0, 2)) + "***@" + c[1]);
      }
    }
  }
  var c = {};
  function i(t, e) {
    c.step = t;
    var n = "busy" === t;
    var o = "done" === t;
    c.cancel.classList.toggle("hidden", o);
    c.confirm.classList.toggle("hidden", o);
    c.done.classList.toggle("hidden", !o);
    c.cancel.disabled = n;
    c.confirm.disabled = n;
    c.confirm.textContent = n ? "Đang xoá… · Deleting…" : "Xoá vĩnh viễn · Delete permanently";
    c.text.classList.toggle("hidden", o);
    c.title.innerHTML = o ? "Đã xoá tài khoản<small>Account deleted</small>" : "Xoá tài khoản?<small>Delete account?</small>";
    c.msg.className = "delete-account-msg" + ("error" === t ? " is-error" : o ? " is-done" : "");
    c.msg.textContent = e || "";
  }
  function a() {
    if (c.root && "busy" !== c.step && "done" !== c.step && (c.root.classList.add("hidden"), n && n.focus)) {
      try {
        n.focus();
      }
      catch (t) {
      }
    }
  }
  var r;
  var l = { "privacy.html": 1, "terms.html": 1, "support.html": 1 };
  var d = {};
  function u() {
    if (d.root && !d.root.classList.contains("hidden") && (d.root.classList.add("hidden"), d.back && d.back.focus)) {
      try {
        d.back.focus();
      }
      catch (t) {
      }
    }
  }
  function s(t) {
    for (var e = parseInt(t.substr(0, 2), 16), n = "", o = 2; o < t.length; o += 2)
      n += String.fromCharCode(parseInt(t.substr(o, 2), 16) ^ e);
    try {
      return decodeURIComponent(escape(n));
    }
    catch (t) {
      return n;
    }
  }
  e = document.getElementById("auth-guest");
  n = document.getElementById("menu-delete-account");
  d.root = document.getElementById("legal");
  d.body = document.getElementById("legal-body");
  d.title = document.getElementById("legal-title");
  d.close = document.getElementById("legal-close");
  if (d.root && d.body) {
    d.close.addEventListener("click", u);
    d.root.addEventListener("click", function (t) {
      if (t.target === d.root) {
        u();
      }
    });
    document.addEventListener("keydown", function (t) {
      if (!("Escape" !== t.key || d.root.classList.contains("hidden"))) {
        t.stopPropagation();
        u();
      }
    }, !0);
    document.addEventListener("click", function (t) {
      var e = t.target && t.target.closest ? t.target.closest("a") : null;
      if (e) {
        var n = d.body.contains(e);
        if (n || e.hasAttribute("data-legal")) {
          var o = function (t) {
            var e = t && t.getAttribute("href");
            if (!e) {
              return null;
            }
            var n = e.split(/[?#]/)[0].replace(/^\.?\//, "");
            return l[n] ? n : null;
          }(e);
          if (o) {
            t.preventDefault();
            (function (t, e) {
              if (!(!d.root || "function" != typeof fetch || "function" != typeof DOMParser)) {
                if (e) {
                  d.back = e;
                }
                fetch(t, { cache: "no-cache" }).then(function (t) {
                  if (!t.ok) {
                    throw new Error("HTTP " + t.status);
                  }
                  return t.text();
                }).then(function (t) {
                  var e;
                  var n = (new DOMParser).parseFromString(t, "text/html").querySelector(".privacy-card");
                  if (!n) {
                    throw new Error("trang không có nội dung");
                  }
                  Array.prototype.forEach.call(n.querySelectorAll("script,style,link,iframe,object,embed,form"), function (t) {
                    t.parentNode.removeChild(t);
                  });
                  Array.prototype.forEach.call(n.querySelectorAll("*"), function (t) {
                    for (var e = t.attributes.length - 1; e >= 0; e--)
                      /^on/i.test(t.attributes[e].name) && t.removeAttribute(t.attributes[e].name);
                  });
                  e = n;
                  Array.prototype.forEach.call(e.querySelectorAll("[data-cfemail]"), function (t) {
                    t.parentNode.replaceChild(document.createTextNode(s(t.getAttribute("data-cfemail"))), t);
                  });
                  Array.prototype.forEach.call(e.querySelectorAll('a[href*="/cdn-cgi/l/email-protection#"]'), function (t) {
                    var e = s(t.getAttribute("href").split("#")[1] || "");
                    t.setAttribute("href", "mailto:" + e);
                    if (/email/i.test(t.textContent) && t.textContent.indexOf("@") < 0) {
                      t.textContent = e;
                    }
                  });
                  var o = n.querySelector("h1");
                  for (d.title.textContent = o && o.textContent || "Pháp lý"; d.body.firstChild;)
                    d.body.removeChild(d.body.firstChild);
                  d.body.appendChild(document.importNode(n, !0));
                  d.body.scrollTop = 0;
                  d.root.classList.remove("hidden");
                  try {
                    d.close.focus();
                  }
                  catch (t) {
                  }
                }).catch(function () {
                  if ("function" == typeof window.open) {
                    window.open(t, "_blank", "noopener");
                  }
                });
              }
            })(o, n ? null : e);
          }
        }
      }
    });
  }
  c.root = document.getElementById("delete-account");
  if (c.root) {
    c.title = document.getElementById("delete-account-title");
    c.text = document.getElementById("delete-account-text");
    c.name = document.getElementById("delete-account-name");
    c.msg = document.getElementById("delete-account-msg");
    c.cancel = document.getElementById("delete-account-cancel");
    c.confirm = document.getElementById("delete-account-confirm");
    c.done = document.getElementById("delete-account-done");
    c.cancel.addEventListener("click", a);
    c.confirm.addEventListener("click", function () {
      if ("busy" !== c.step && t.Auth && t.Auth.user) {
        i("busy");
        t.Auth.deleteAccount().then(function (t) {
          if (!t || !t.ok) {
            throw new Error(t && t.error || "Xoá tài khoản thất bại.");
          }
          i("done", "Tài khoản và toàn bộ dữ liệu đã bị xoá vĩnh viễn khỏi máy chủ. Your account and all of its data have been permanently deleted.");
          try {
            c.done.focus();
          }
          catch (t) {
          }
        }).catch(function (t) {
          i("error", t && t.message || "Xoá tài khoản thất bại. Thử lại sau.");
        });
      }
    });
    c.done.addEventListener("click", function () {
      window.location.reload();
    });
    c.root.addEventListener("click", function (t) {
      if (t.target === c.root) {
        a();
      }
    });
    document.addEventListener("keydown", function (t) {
      if (!("Escape" !== t.key || c.root.classList.contains("hidden"))) {
        t.stopPropagation();
        a();
      }
    }, !0);
  }
  if ((r = document.getElementById("btn-settings"))) {
    r.addEventListener("click", function () {
      var t = document.getElementById("ht-menu");
      if (t) {
        t.click();
      }
    });
  }
  (function () {
    var t = window.PNTT_RUNTIME_CONFIG || {};
    var e = document.getElementById("menu-debug");
    if (e && "production" === t.environment) {
      e.classList.add("hidden");
    }
  })();
  if (e) {
    e.addEventListener("click", function () {
      if (t.AuthUI && t.AuthUI.skip) {
        t.AuthUI.skip();
      }
    });
  }
  if (n) {
    n.addEventListener("click", function () {
      if (t.Auth && t.Auth.user && c.root) {
        c.name.textContent = t.Auth.username || "";
        i("confirm");
        c.root.classList.remove("hidden");
        try {
          c.cancel.focus();
        }
        catch (t) {
        }
      }
    });
  }
  if (t.Auth && t.Auth.onChange) {
    t.Auth.onChange(o);
  }
  o(t.Auth && t.Auth.user);
}(window.PNTT);
(function (t) {
  "use strict";
  var e = document.getElementById("account-email-link");
  if (e && t.Auth) {
    var n = document.getElementById("account-email-open");
    var o = document.getElementById("account-email-done");
    var c = document.getElementById("account-email-form");
    var i = document.getElementById("account-email-help");
    var a = document.getElementById("account-email-input");
    var r = document.getElementById("account-email-send");
    var l = document.getElementById("account-email-password");
    var d = document.getElementById("account-email-code");
    var u = document.getElementById("account-email-confirm");
    var s = document.getElementById("account-email-msg");
    var m = "";
    var h = "";
    var g = 0;
    n.addEventListener("click", function () {
      c.classList.remove("hidden");
      n.classList.add("hidden");
      y("");
      p(t.Auth.user);
      a.focus();
    });
    r.addEventListener("click", function () {
      var e = String(a.value || "").trim().toLowerCase();
      var n = m && m === e && t.Auth.resendLinkedEmail;
      v(!0);
      y(n ? "Đang gửi lại mã…" : "Đang gửi mã…");
      (n ? t.Auth.resendLinkedEmail(e) : t.Auth.linkEmail(e, f(t.Auth.user) ? l.value : "")).then(function (n) {
        if (!n || !n.ok) {
          throw new Error(n && n.error || "Không gửi được mã.");
        }
        if (n.verified) {
          return E();
        }
        m = e;
        h = t.Auth.user && t.Auth.user.id || "";
        y("Đã gửi mã. Kiểm tra hộp thư, cả mục Spam và Quảng cáo.", "ok");
        d.focus();
      }).catch(function (t) {
        y(t && t.message || "Không gửi được mã.", "error");
      }).finally(function () {
        v(!1);
        if (m === e) {
          (function () {
            clearInterval(g);
            var t = 60;
            r.disabled = !0;
            r.textContent = "Gửi lại (" + t + ")";
            g = setInterval(function () {
              if ((t -= 1) > 0) {
                r.textContent = "Gửi lại (" + t + ")";
              }
              else {
                clearInterval(g);
                g = 0;
                r.disabled = !1;
                r.textContent = "Gửi lại";
              }
            }, 1e3);
          })();
        }
      });
    });
    c.addEventListener("submit", function (e) {
      e.preventDefault();
      if (m) {
        v(!0);
        y("Đang xác nhận…");
        t.Auth.verifyLinkedEmail(m, d.value).then(function (t) {
          if (!t || !t.ok) {
            throw new Error(t && t.error || "Mã xác nhận không đúng.");
          }
          E();
        }).catch(function (t) {
          y(t && t.message || "Mã xác nhận không đúng.", "error");
        }).finally(function () {
          v(!1);
        });
      }
      else {
        y('Bấm "Gửi mã" trước.', "error");
      }
    });
    if (t.Auth.onChange) {
      t.Auth.onChange(p);
    }
    p(t.Auth.user);
  }
  function f(e) {
    return !!e && (!0 === (e.user_metadata || {}).guest || t.Auth.isGuest && t.Auth.isGuest());
  }
  function y(t, e) {
    s.textContent = t || "";
    s.className = "account-email-msg" + (e ? " is-" + e : "");
  }
  function v(t) {
    [a, l, d, u].forEach(function (e) {
      if (e) {
        e.disabled = t;
      }
    });
    if (!(!t && g)) {
      r.disabled = t;
    }
    e.classList.toggle("is-busy", t);
  }
  function p(a) {
    var r = function (e) {
      return t.Auth.linkedEmail ? t.Auth.linkedEmail(e) : "";
    }(a);
    var d = f(a);
    var u = !!a && !t.Auth.localFixture;
    if ((!u || h && a && h !== a.id || r) && (m = "", h = ""), e.classList.toggle("hidden", !u), u) {
      if (r) {
        o.textContent = "Email đã liên kết: " + function (t) {
          var e = String(t || "").split("@");
          if (2 !== e.length) {
            return t;
          }
          var n = e[0];
          return (n.length < 3 ? n.charAt(0) : n.slice(0, 2)) + "***@" + e[1];
        }(r);
        o.classList.remove("hidden");
        n.classList.add("hidden");
        return void c.classList.add("hidden");
      }
      o.classList.add("hidden");
      n.classList.toggle("hidden", !c.classList.contains("hidden"));
      l.classList.toggle("hidden", !d);
      i.textContent = d ? "Mã xác nhận gửi tới email. Xong thì đăng nhập bằng email và mật khẩu này." : "Mã xác nhận gửi tới email. Vẫn đăng nhập bằng đạo hiệu như cũ.";
    }
  }
  function E() {
    m = "";
    c.classList.add("hidden");
    y(f(t.Auth.user) ? "Đã liên kết email. Lần sau đăng nhập bằng email này." : "Đã liên kết email. Vẫn đăng nhập bằng đạo hiệu.", "ok");
    p(t.Auth.user);
    if (t.Gateway && t.Gateway.cmd) {
      t.Gateway.cmd("email.soat");
    }
  }
})(window.PNTT);
