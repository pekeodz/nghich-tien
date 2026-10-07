!function (t) {
  "use strict";
  var e = t.Utils;
  var n = t.Chat = { open: !1, quickOpen: !1, cur: "map", quickChannel: "map", lastFrom: "" };
  t.Thu = n;
  var i;
  var a = {};
  var o = Object.create(null);
  var c = [];
  var r = Object.create(null);
  var u = Object.create(null);
  var s = [];
  var l = !1;
  var d = Object.create(null);
  try {
    var h = JSON.parse(window.localStorage.getItem("pntt.blocked-users.v1") || "{}");
    if (h && "object" == typeof h) {
      d = h;
    }
  }
  catch (t) {
  }
  function p(t, e) {
    return String(t || e || "").toLowerCase();
  }
  function v(t, e) {
    return "thien_dao" === String(t || "") || "thiên đạo" === String(e || "").trim().toLowerCase();
  }
  function f(t, e) {
    if (v(t, e)) {
      return !1;
    }
    var n = p(t, e);
    return !(!n || !d[n]);
  }
  function m() {
    try {
      window.localStorage.setItem("pntt.blocked-users.v1", JSON.stringify(d));
    }
    catch (t) {
    }
  }
  function g(e, n) {
    var i;
    var a;
    var o = (i = window.PNTT_RUNTIME_CONFIG || {}, "auto" === (a = String(i.serverUrl || "").trim()) && "undefined" != typeof location && "file:" !== location.protocol ? location.origin : /^wss?:\/\//i.test(a) ? a.replace(/^ws/i, "http").replace(/\/+$/, "") : /^https?:\/\//i.test(a) ? a.replace(/\/+$/, "") : "");
    if (!o || !window.fetch) {
      return Promise.reject(new Error("moderation_offline"));
    }
    var c = Object.assign({ action: e }, n || {});
    var r = { "Content-Type": "application/json", Accept: "application/json" };
    var u = t.Net && t.Net.client && t.Net.client.auth;
    return (u && u.getSession ? u.getSession() : Promise.resolve(null)).then(function (t) {
      var e = t && t.data && t.data.session && t.data.session.access_token;
      if (e) {
        r.Authorization = "Bearer " + e;
      }
      return fetch(o + "/api/moderation/report", { method: "POST", headers: r, body: JSON.stringify(c) }).then(function (t) {
        return t.json().catch(function () {
          return {};
        }).then(function (e) {
          if (!t.ok || !e.ok) {
            throw new Error(e.error || "moderation_failed");
          }
          return e;
        });
      });
    });
  }
  function w(e) {
    n.line(e, "sys", { muc: n.cur });
    if (x() && t.HUD && t.HUD.setCaption) {
      t.HUD.setCaption(e);
    }
  }
  function k() {
    if (a.chanBtn) {
      var t = Object.keys(d).length;
      a.chanBtn.classList.toggle("hidden", !t);
      a.chanBtn.textContent = "⊘ " + t;
      a.chanBtn.title = "Đã chặn " + t + " người — bấm để bỏ chặn";
      if (!t && a.chanList) {
        a.chanList.classList.add("hidden");
      }
    }
  }
  function y() {
    if (a.chanList) {
      a.chanList.textContent = "";
      var t = Object.keys(d);
      if (t.length) {
        t.forEach(function (t) {
          var e = d[t] || {};
          var n = document.createElement("div");
          n.className = "thu-chan-row";
          var i = document.createElement("span");
          i.textContent = e.name || e.id || t;
          var o = document.createElement("button");
          o.type = "button";
          o.className = "chat-line-action";
          o.textContent = "Bỏ chặn";
          o.dataset.boChan = t;
          n.appendChild(i);
          n.appendChild(o);
          a.chanList.appendChild(n);
        });
      }
      else {
        a.chanList.classList.add("hidden");
      }
    }
  }
  function b(t, e, n, i) {
    if (!(o[t])) {
      o[t] = { key: t, kind: e, ten: n, note: i || "", dong: [], chuaDoc: 0, moiNhat: 0, viec: null };
      c.push(t);
    }
    return o[t];
  }
  function C(t) {
    return "w:" + String(t || "").toLowerCase();
  }
  function x() {
    return !!(t.SectUI && t.SectUI.dangDocHopThu && t.SectUI.dangDocHopThu());
  }
  function L() {
    var t = "world" === n.quickChannel ? "world" : "map";
    if (a.quickMap) {
      a.quickMap.classList.toggle("on", "map" === t);
      a.quickMap.setAttribute("aria-selected", "map" === t ? "true" : "false");
    }
    if (a.quickWorld) {
      a.quickWorld.classList.toggle("on", "world" === t);
      a.quickWorld.setAttribute("aria-selected", "world" === t ? "true" : "false");
    }
    if (a.quickInput) {
      a.quickInput.placeholder = "world" === t ? "Nói với toàn thế giới…" : "Nói với đồng đạo trong bản đồ…";
    }
  }
  !function () {
    var t = !1;
    for (var e in d) {
      var n = d[e] || {};
      if (v(n.id || e, n.name)) {
        delete d[e];
        t = !0;
      }
    }
    if (t) {
      m();
    }
  }();
  n.blockUser = function (t, e) {
    var n = p(t, e);
    if (!(!n || v(t, e) || f(t, e))) {
      d[n] = { id: String(t || ""), name: String(e || ""), at: Date.now() };
      m();
      (function (t, e) {
        var n = p(t, e);
        for (var i in o)
          o[i].dong = o[i].dong.filter(function (t) {
            return !t.authorId || p(t.authorId, t.whoPlain) !== n;
          });
        s = s.filter(function (t) {
          return p("", t.who) !== n;
        });
        if (a.worldLine && a.worldLine.textContent && p("", a.worldLine.textContent.split(":")[0]) === n) {
          l = !1;
          a.worldLine.textContent = "";
          if (a.worldBanner) {
            a.worldBanner.classList.add("hidden");
          }
        }
        G();
        W();
        H();
        o.clan.chuaDoc = Math.min(o.clan.chuaDoc, o.clan.dong.length);
        B();
        M();
      })(t, e);
      k();
      w("Đã chặn " + (e || "người chơi") + ". Bỏ chặn ở nút ⊘ trên đầu khung Thư.");
      g("block", { targetId: t || "", targetName: e || "" }).catch(function () {
        w("Không đồng bộ được lệnh chặn với máy chủ. Vui lòng thử lại khi đã nối mạng.");
      });
    }
  };
  n.unblockUser = function (t) {
    var e = d[t];
    if (e) {
      delete d[t];
      m();
      k();
      y();
      n.line("Đã bỏ chặn " + (e.name || "người chơi") + ".", "sys", { muc: n.cur });
      if (e.id) {
        g("unblock", { targetId: e.id, targetName: e.name || "" }).catch(function () {
        });
      }
    }
  };
  n.reportLine = function (t) {
    if (t && t.authorId && !t.mine) {
      var e = window.prompt("Lý do báo cáo nội dung phản cảm/lạm dụng (tuỳ chọn):", "Nội dung phản cảm hoặc quấy rối");
      if (null !== e) {
        g("report", { targetId: t.authorId, targetName: t.whoPlain || t.who, channel: t.muc || "", message: t.text, reason: e.slice(0, 300) }).then(function () {
          w("Đã gửi báo cáo. Nhà phát triển sẽ xem xét và xử lý trong vòng 24 giờ.");
        }).catch(function () {
          w("Chưa gửi được báo cáo. Hãy kiểm tra kết nối và thử lại.");
        });
      }
    }
  };
  b("map", "map", "Bản Đồ");
  b("world", "world", "Thế Giới");
  b("clan", "clan", "Tông Môn");
  b("sys", "sys", "Tin Đến");
  n.init = function () {
    a.root = e.$("#thu");
    if (a.root) {
      a.rail = e.$("#thu-rail");
      a.log = e.$("#thu-log");
      a.title = e.$("#thu-title");
      a.note = e.$("#thu-note");
      a.act = e.$("#thu-act");
      a.input = e.$("#thu-input");
      a.send = e.$("#thu-send");
      a.close = e.$("#thu-close");
      a.opener = e.$("#btn-chat");
      a.quick = e.$("#quick-chat");
      a.quickInput = e.$("#quick-chat-input");
      a.quickSend = e.$("#quick-chat-send");
      a.quickClose = e.$("#quick-chat-close");
      a.quickMap = e.$("#quick-chat-map");
      a.quickWorld = e.$("#quick-chat-world");
      a.quickOpener = e.$("#btn-chat-compose");
      a.worldBanner = e.$("#world-chat-banner");
      a.worldLine = e.$("#world-chat-line");
      a.chanBtn = e.$("#thu-chan");
      a.chanList = e.$("#thu-chan-list");
      a.sectBtn = e.$("#btn-sect");
      if (a.chanBtn && a.chanList) {
        a.chanBtn.addEventListener("click", function () {
          var t = a.chanList.classList.contains("hidden");
          if (t) {
            y();
          }
          a.chanList.classList.toggle("hidden", !t);
        });
        a.chanList.addEventListener("click", function (t) {
          var e = t.target && t.target.closest && t.target.closest("[data-bo-chan]");
          if (e) {
            n.unblockUser(e.dataset.boChan);
          }
        });
        k();
      }
      a.send.addEventListener("click", function () {
        E();
      });
      a.close.addEventListener("click", function () {
        n.close();
      });
      if (a.opener) {
        a.opener.addEventListener("click", function () {
          n.toggle();
        });
      }
      if (a.quickSend) {
        a.quickSend.addEventListener("click", D);
      }
      if (a.quickClose) {
        a.quickClose.addEventListener("click", n.quickClose);
      }
      if (a.quickMap) {
        a.quickMap.addEventListener("click", function () {
          n.setQuickChannel("map");
        });
      }
      if (a.quickWorld) {
        a.quickWorld.addEventListener("click", function () {
          n.setQuickChannel("world");
        });
      }
      if (a.worldLine) {
        a.worldLine.addEventListener("animationend", P);
      }
      if (a.quickOpener) {
        a.quickOpener.addEventListener("click", function () {
          n.quickToggle();
        });
      }
      a.rail.addEventListener("click", function (t) {
        var e = t.target && t.target.closest && t.target.closest("[data-muc]");
        if (e) {
          n.doc(e.dataset.muc);
        }
      });
      a.log.addEventListener("click", function (t) {
        var e = t.target && t.target.closest && t.target.closest("[data-chat-action]");
        if (e) {
          var i = e._chatLine;
          if (i) {
            if ("block" === e.dataset.chatAction) {
              n.blockUser(i.authorId, i.whoPlain || i.who);
            }
            else {
              n.reportLine(i);
            }
          }
        }
        else {
          var a = t.target && t.target.closest && t.target.closest("[data-invite-key][data-viec]");
          if (a) {
            var o = r[a.dataset.inviteKey];
            if (o && o.active && o.expiresAt && Date.now() >= o.expiresAt) {
              return void n.setInvite(o.inviteKind, null, o.id, "expired");
            }
            var c = o && o.active && o.viec && o.viec[0 | a.dataset.viec];
            if (c && c.onChoose) {
              n.setInvite(o.inviteKind, null, o.id, "answered");
              c.onChoose();
            }
          }
          else {
            var u = t.target && t.target.closest && t.target.closest("[data-who]");
            if (u) {
              n.whisperTo(u.dataset.who);
            }
          }
        }
      });
      a.act.addEventListener("click", function (t) {
        var e = t.target && t.target.closest && t.target.closest("[data-viec]");
        if (e) {
          var i = o[n.cur];
          var a = i && i.viec && i.viec[0 | e.dataset.viec];
          if (a && a.onChoose) {
            a.onChoose();
          }
        }
      });
      a.input.addEventListener("keydown", function (t) {
        if ("Enter" === t.key) {
          t.preventDefault();
          E();
        }
        if ("Escape" === t.key) {
          t.preventDefault();
          n.close();
        }
        t.stopPropagation();
      });
      if (a.quickInput) {
        a.quickInput.addEventListener("keydown", function (t) {
          if ("Enter" === t.key) {
            t.preventDefault();
            D();
          }
          if ("Escape" === t.key) {
            t.preventDefault();
            n.quickClose();
          }
          t.stopPropagation();
        });
      }
      window.addEventListener("keydown", function (t) {
        if (!function (t) {
          if (!t || !t.tagName) {
            return !1;
          }
          var e = t.tagName.toLowerCase();
          return "input" === e || "textarea" === e || t.isContentEditable;
        }(t.target) && !a.root.classList.contains("hidden")) {
          return "Escape" === t.key && n.open ? (t.preventDefault(), t.stopPropagation(), void n.close()) : void (n.open || n.quickOpen || "Enter" !== t.key || t.repeat || (t.preventDefault(), t.stopPropagation(), n.quickShow()));
        }
      }, !0);
      G();
      W();
      L();
    }
  };
  n.showPanel = function () {
    if (a.root) {
      a.root.classList.remove("hidden");
    }
  };
  n.hidePanel = function () {
    if (a.root) {
      n.close();
      n.quickClose();
      a.root.classList.add("hidden");
    }
  };
  n.toggle = function () {
    if (n.open) {
      n.close();
    }
    else {
      n.show();
    }
  };
  n.show = function (t) {
    if (a.root) {
      a.root.classList.remove("hidden");
      n.quickClose();
      n.open = !0;
      a.root.classList.add("mo");
      document.body.classList.add("chat-open");
      if (a.opener && a.opener.setAttribute) {
        a.opener.setAttribute("aria-expanded", "true");
      }
      n.doc(t || n.cur || "map");
      if (!(S())) {
        a.input.focus();
      }
    }
  };
  n.close = function () {
    if (a.root) {
      n.open = !1;
      a.root.classList.remove("mo");
      if (!(n.quickOpen)) {
        document.body.classList.remove("chat-open");
      }
      if (a.opener && a.opener.setAttribute) {
        a.opener.setAttribute("aria-expanded", "false");
      }
      a.input.blur();
    }
  };
  n.quickToggle = function () {
    if (n.quickOpen) {
      n.quickClose();
    }
    else {
      n.quickShow();
    }
  };
  n.quickShow = function () {
    if (a.quick) {
      n.close();
      n.quickOpen = !0;
      n.quickChannel = "map";
      L();
      a.quick.classList.remove("hidden");
      document.body.classList.add("chat-open");
      if (a.quickOpener && a.quickOpener.setAttribute) {
        a.quickOpener.setAttribute("aria-expanded", "true");
      }
      a.quickInput.focus();
    }
  };
  n.quickClose = function () {
    n.quickOpen = !1;
    if (a.quick) {
      a.quick.classList.add("hidden");
    }
    if (!(n.open)) {
      document.body.classList.remove("chat-open");
    }
    if (a.quickOpener && a.quickOpener.setAttribute) {
      a.quickOpener.setAttribute("aria-expanded", "false");
    }
    if (a.quickInput) {
      a.quickInput.blur();
    }
  };
  n.setQuickChannel = function (t) {
    n.quickChannel = "world" === t ? "world" : "map";
    L();
    if (a.quickInput) {
      a.quickInput.focus();
    }
  };
  n.doc = function (t) {
    if (!(o[t] && "clan" !== o[t].kind)) {
      t = "map";
    }
    n.cur = t;
    o[t].chuaDoc = 0;
    G();
    W();
    H();
  };
  n.whisperTo = function (t) {
    if (t) {
      var e = b(C(t), "whisper", t);
      e.moiNhat = Date.now();
      n.show(e.key);
    }
  };
  var q = { duel: "Lời Mời Tỉ Thí", trade: "Lời Mời Giao Dịch", party: "Lời Mời Vào Đội", sect: "Lời Mời Vào Tông", lamlang: "Bí Cảnh Tông Môn" };
  function N(t, e, n) {
    var i = e || n && (n.inviteId || n.id) || "default";
    return String(t || "") + ":" + String(i);
  }
  function I(t, e) {
    var n = r[t];
    if (n && n.active) {
      n.active = !1;
      n.status = function (t) {
        return "accepted" === t || "declined" === t || "answered" === t ? "Đã trả lời" : "expired" === t ? "Đã hết hạn" : "offline" === t ? "Người mời đã rời mạng" : "duel" === t ? "Không còn khả dụng khi đang tỉ thí" : "full" === t ? "Tổ đội đã đủ người" : "in_dungeon" === t ? "Tổ đội đã vào bí cảnh" : "Lời mời không còn hiệu lực";
      }(e);
      n.viec = [];
    }
    if (u[t]) {
      clearTimeout(u[t]);
      delete u[t];
    }
  }
  function S() {
    var t = o[n.cur];
    return !t || "invite" === t.kind || "sys" === t.kind;
  }
  function D() {
    var t = (a.quickInput && a.quickInput.value || "").trim();
    if (t) {
      a.quickInput.value = "";
      O(t, n.quickChannel);
      n.quickClose();
    }
  }
  function E() {
    var t = (a.input.value || "").trim();
    if (t) {
      a.input.value = "";
      var e = t.match(/^\/(\S+)\s*([\s\S]*)$/);
      if (e) {
        var i = e[1].toLowerCase();
        var c = e[2];
        return "n" === i || "w" === i || "nr" === i ? function (t) {
          var e = (t || "").match(/^(\S+)\s+([\s\S]+)$/);
          if (e) {
            T(e[1], e[2].trim());
          }
          else {
            n.line("Cách dùng: /n <đạo hiệu> <lời nhắn>", "sys", { muc: n.cur });
          }
        }(c) : "r" === i ? function (t) {
          var e = (t || "").trim();
          if (n.lastFrom) {
            if (e) {
              T(n.lastFrom, e);
            }
            else {
              n.whisperTo(n.lastFrom);
            }
          }
          else {
            n.line("Chưa ai nhắn riêng cho đạo hữu.", "sys", { muc: n.cur });
          }
        }(c) : "m" === i || "s" === i ? (n.doc("map"), void ((c = (c || "").trim()) && O(c))) : void n.line("Không có lệnh /" + i + ". Chỉ có /n, /r, /m.", "sys", { muc: n.cur });
      }
      var r = o[n.cur];
      return r && "map" !== r.kind ? "world" === r.kind ? O(t, "world") : "whisper" === r.kind ? T(r.ten, t) : void 0 : O(t, "map");
    }
  }
  function O(e, i) {
    if (!(("world" === i ? t.Gateway && t.Gateway.chat && t.Gateway.chat(e, "world") : t.Gateway && t.Gateway.chat && t.Gateway.chat(e)))) {
      n.line("Chưa nối được máy chủ — lời chưa gửi đi.", "sys", { muc: "map" });
    }
  }
  function T(e, i) {
    if (e) {
      var a = b(C(e), "whisper", e);
      a.moiNhat = Date.now();
      if (!(t.Gateway && t.Gateway.whisper && t.Gateway.whisper(e, i))) {
        n.line("Chưa nối được máy chủ — lời chưa gửi đi.", "sys", { muc: a.key });
      }
    }
    else {
      n.line("Chưa chọn người nhận.", "sys", { muc: n.cur });
    }
  }
  function A() {
    if (!l && s.length && a.worldBanner && a.worldLine) {
      var t = s.shift();
      l = !0;
      a.worldLine.textContent = t.who + ": " + t.text;
      var e = Math.max(7, Math.min(15, 5 + .05 * t.text.length));
      if (a.worldLine.style && a.worldLine.style.setProperty) {
        a.worldLine.style.setProperty("--world-chat-duration", e + "s");
      }
      a.worldBanner.classList.remove("hidden");
      a.worldLine.classList.remove("run");
      a.worldLine.offsetWidth;
      a.worldLine.classList.add("run");
    }
  }
  function P() {
    l = !1;
    if (s.length) {
      A();
    }
    else {
      if (a.worldBanner) {
        a.worldBanner.classList.add("hidden");
      }
      if (a.worldLine) {
        a.worldLine.classList.remove("run");
      }
    }
  }
  function M() {
    if (t.SectUI && t.SectUI.hopThuDoi) {
      t.SectUI.hopThuDoi();
    }
  }
  function B() {
    if (a.sectBtn) {
      var t = o.clan.chuaDoc;
      a.sectBtn.dataset.chuaDoc = t > 9 ? "9+" : t > 0 ? String(t) : "";
      a.sectBtn.classList.toggle("co-tin", t > 0);
    }
  }
  function G() {
    if (a.rail) {
      var t;
      var e = (t = { invite: 0, map: 1, world: 2, whisper: 4, sys: 5 }, c.map(function (t) {
        return o[t];
      }).filter(function (t) {
        return "clan" !== t.kind;
      }).sort(function (e, n) {
        return t[e.kind] !== t[n.kind] ? t[e.kind] - t[n.kind] : "whisper" === e.kind ? n.moiNhat - e.moiNhat : c.indexOf(e.key) - c.indexOf(n.key);
      }));
      a.rail.textContent = "";
      for (var i = 0; i < e.length; i++) {
        var r = e[i];
        var u = document.createElement("button");
        u.type = "button";
        u.className = "thu-muc" + (r.key === n.cur ? " on" : "") + " k-" + r.kind;
        u.dataset.muc = r.key;
        var s = document.createElement("span");
        s.className = "thu-muc-ten";
        s.textContent = r.ten;
        u.appendChild(s);
        var l = r.note || $(r);
        if (l) {
          var d = document.createElement("span");
          d.className = "thu-muc-phu";
          d.textContent = l;
          u.appendChild(d);
        }
        if (r.chuaDoc > 0) {
          var h = document.createElement("span");
          h.className = "thu-cham";
          h.textContent = r.chuaDoc > 9 ? "9+" : String(r.chuaDoc);
          u.appendChild(h);
        }
        a.rail.appendChild(u);
      }
    }
  }
  function $(t) {
    var e = t.dong[t.dong.length - 1];
    return e ? (e.who ? e.who + ": " : "") + e.text : "";
  }
  function U(t) {
    var e = document.createElement("div");
    if (e.className = "chat-line " + t.kind + (t.mine ? " mine" : "") + (t.vai ? " r-" + t.vai : "") + (t.phe ? " phe-" + t.phe : ""), t.who) {
      var n = document.createElement("b");
      n.className = "chat-who";
      if (!(t.mine)) {
        n.dataset.who = t.whoPlain || t.who;
        n.title = "Nhắn riêng " + (t.whoPlain || t.who);
      }
      n.textContent = t.who;
      e.appendChild(n);
      e.appendChild(document.createTextNode(": "));
    }
    var i = document.createElement("span");
    if (i.className = "chat-text", i.textContent = t.text, e.appendChild(i), t.authorId && !t.mine && "sys" !== t.kind && "clan-sys" !== t.kind && !v(t.authorId, t.whoPlain || t.who)) {
      var a = document.createElement("span");
      a.className = "chat-line-actions";
      var o = document.createElement("button");
      o.type = "button";
      o.className = "chat-line-action";
      o.dataset.chatAction = "report";
      o.textContent = "Báo cáo";
      o.title = "Báo cáo nội dung phản cảm";
      o._chatLine = t;
      var c = document.createElement("button");
      c.type = "button";
      c.className = "chat-line-action";
      c.dataset.chatAction = "block";
      c.textContent = "Chặn";
      c.title = "Chặn người chơi và xoá khỏi feed";
      c._chatLine = t;
      a.appendChild(o);
      a.appendChild(c);
      e.appendChild(a);
    }
    return e;
  }
  function W() {
    if (a.log) {
      var t = o[n.cur] || o.map;
      a.title.textContent = t.ten;
      a.note.textContent = t.note || "";
      a.log.textContent = "";
      for (var e = 0; e < t.dong.length; e++) {
        var i = t.dong[e];
        if (i.invite) {
          var c = document.createElement("section");
          c.className = "thu-invite" + (i.active ? " dang-cho" : " da-dong");
          c.setAttribute("aria-label", (q[i.inviteKind] || "Lời mời") + (i.who ? " từ " + i.who : ""));
          var r = document.createElement("div");
          r.className = "thu-invite-tieu-de";
          r.textContent = (q[i.inviteKind] || "Lời mời") + (i.who ? " · " + i.who : "");
          c.appendChild(r);
          var u = document.createElement("div");
          if (u.className = "thu-invite-noi-dung", u.textContent = i.text, c.appendChild(u), i.active && i.viec && i.viec.length) {
            var s = document.createElement("div");
            s.className = "thu-invite-actions";
            for (var l = 0; l < i.viec.length; l++) {
              var d = document.createElement("button");
              d.type = "button";
              d.className = "thu-viec" + (0 === l ? " chinh" : "");
              d.dataset.inviteKey = i.inviteKey;
              d.dataset.viec = String(l);
              d.textContent = i.viec[l].label;
              if (i.viec[l].note) {
                d.title = i.viec[l].note;
              }
              s.appendChild(d);
            }
            c.appendChild(s);
          }
          else {
            var h = document.createElement("div");
            h.className = "thu-invite-trang-thai";
            h.textContent = i.status || "Đã đóng";
            c.appendChild(h);
          }
          a.log.appendChild(c);
        }
        else {
          a.log.appendChild(U(i));
        }
      }
      a.log.scrollTop = a.log.scrollHeight;
      (function (t) {
        a.act.textContent = "";
        var e = "invite" === t.kind && t.viec && t.viec.length;
        if (a.act.classList.toggle("hidden", !e), e) {
          for (var n = 0; n < t.viec.length; n++) {
            var i = t.viec[n];
            var o = document.createElement("button");
            o.type = "button";
            o.className = "thu-viec" + (0 === n ? " chinh" : "");
            o.dataset.viec = String(n);
            o.textContent = i.label;
            if (i.note) {
              o.title = i.note;
            }
            a.act.appendChild(o);
          }
        }
      })(t);
      (function (t) {
        var e = S();
        a.input.disabled = e;
        a.send.disabled = e;
        if ("map" === t.kind) {
          a.input.placeholder = "Nói với đồng đạo quanh đây…";
        }
        else {
          if ("world" === t.kind) {
            a.input.placeholder = "Nói với toàn thế giới…";
          }
          else {
            if ("whisper" === t.kind) {
              a.input.placeholder = "Nhắn riêng " + t.ten + "…";
            }
            else {
              a.input.placeholder = "Mục này chỉ để đọc";
            }
          }
        }
      })(t);
    }
  }
  function H() {
    if (a.opener) {
      var t = 0;
      for (var e in o)
        "clan" !== o[e].kind && (t += o[e].chuaDoc);
      a.opener.dataset.chuaDoc = t > 9 ? "9+" : t > 0 ? String(t) : "";
      a.opener.classList.toggle("co-tin", t > 0);
    }
  }
  function _(t) {
    return Math.min(9, 3.5 + .06 * t.length);
  }
  function j() {
    return "500 8px " + t.Pixel.MAP_FONT;
  }
  function K(e, n, i) {
    for (var a = n || 108, o = i || 3, c = j(), r = [], u = "", s = String(e).split(/\s+/), l = 0; l < s.length; l++) {
      var d = s[l];
      if (d) {
        for (; t.Pixel.textWidth(d, c) > a;) {
          for (var h = d.length - 1; h > 1 && t.Pixel.textWidth(d.slice(0, h), c) > a;)
            h--;
          if (u) {
            r.push(u);
            u = "";
          }
          r.push(d.slice(0, h));
          d = d.slice(h);
        }
        var p = u ? u + " " + d : d;
        if (u && t.Pixel.textWidth(p, c) > a) {
          r.push(u);
          u = d;
        }
        else {
          u = p;
        }
      }
    }
    if (u) {
      r.push(u);
    }
    if (r.length > o) {
      (r = r.slice(0, o))[o - 1] = r[o - 1].replace(/.{0,2}$/, "…");
    }
    return r;
  }
  function F(e, n, i, a) {
    for (var o = j(), c = t.Pixel, r = 0, u = 0; u < n.dong.length; u++)
      r = Math.max(r, c.textWidth(n.dong[u], o));
    var s = r + 8;
    var l = 10 * n.dong.length + 6 - 2;
    var d = i - Math.round(s / 2);
    var h = a - l;
    c.blk(e, d, h, s, l, "#ffffff", "#20242c");
    for (var p = 0; p < 3; p++) {
      var v = 3 - p;
      c.r(e, i - v, h + l + p, 2 * v, 1, "#ffffff");
      c.r(e, i - v - 1, h + l + p, 1, 1, "#20242c");
      c.r(e, i + v, h + l + p, 1, 1, "#20242c");
    }
    c.r(e, i - 1, h + l + 3, 2, 1, "#20242c");
    for (var f = 0; f < n.dong.length; f++)
      c.text(e, i, h + 3 + 10 * f + 7, n.dong[f], "#14181f", null, o, "center");
  }
  n.setInvite = function (e, i, a, c) {
    if (e = String(e || "")) {
      if (!i) {
        for (var s = a ? [N(e, a)] : Object.keys(r).filter(function (t) {
          return 0 === t.indexOf(e + ":") && r[t].active;
        }), l = 0; l < s.length; l++)
          I(s[l], c);
        if (t.HUD && t.HUD.setInvite) {
          t.HUD.setInvite(e, null, a);
        }
        if ("sys" === n.cur) {
          W();
        }
        G();
        return void H();
      }
      var d = N(e, a, i);
      var h = r[d];
      if (h ? o.sys.dong.indexOf(h) < 0 && o.sys.dong.push(h) : (h = { invite: !0, inviteKey: d, inviteKind: e, id: a || i.inviteId || i.id || "default", text: "", who: "", viec: [], active: !0, status: "" }, r[d] = h, o.sys.dong.push(h), n.open && "sys" === n.cur || o.sys.chuaDoc++), h.text = i.text || "", h.who = i.name || "", h.viec = i.viec || [], h.active = !0, h.status = "", h.expiresAt = Number(i.expiresAt) || 0, h.expiresAt && h.expiresAt <= Date.now() && (h.active = !1, h.status = "Đã hết hạn", h.viec = []), u[d] && (clearTimeout(u[d]), delete u[d]), h.active && h.expiresAt) {
        var p = Math.max(0, h.expiresAt - Date.now());
        u[d] = setTimeout(function () {
          n.setInvite(e, null, a || i.inviteId || i.id, "expired");
        }, p);
        if (u[d] && u[d].unref) {
          u[d].unref();
        }
      }
      if (t.HUD && t.HUD.setInvite) {
        t.HUD.setInvite(e, h.active ? i : null, a || h.id);
      }
      if ("sys" === n.cur) {
        W();
      }
      G();
      H();
    }
  };
  n.enterMap = function (t) {
    var e = o.map;
    e.dong = [];
    e.chuaDoc = 0;
    e.note = t || "";
    if (t) {
      e.dong.push({ text: "Đã vào " + t + ".", kind: "sys" });
    }
    G();
    W();
    H();
  };
  n.guiTong = function (e) {
    if ((e = String(e || "").trim())) {
      (function (e) {
        if (t.Gateway && t.Gateway.sect) {
          if (!(t.Gateway.sectChat && t.Gateway.sectChat(e))) {
            n.line("Chưa nối được máy chủ — lời chưa gửi đi.", "sys", { muc: "clan" });
          }
        }
        else {
          n.line("Chưa gia nhập tông môn nào.", "sys", { muc: "clan" });
        }
      })(e);
    }
  };
  n.pushSay = function (e, i, a) {
    if (!f(e, i)) {
      var o = !(!t.Gateway || !e || e !== t.Gateway.selfId);
      n.line(a, "say", { who: i, mine: o, muc: "map", authorId: e });
      n.bubble(e, a, o);
    }
  };
  n.pushWorldSay = function (e, i, a) {
    if (!f(e, i)) {
      var o = !(!t.Gateway || !e || e !== t.Gateway.selfId);
      for (n.line(a, "world", { who: i, mine: o, muc: "world", authorId: e }), s.push({ who: String(i || "Ẩn danh"), text: String(a || "") }); s.length > 20;)
        s.shift();
      A();
    }
  };
  n.pushWhisper = function (e) {
    if (!f(e.from, e.fromName)) {
      if (e.mine) {
        var i = b(C(e.toName), "whisper", e.toName);
        i.moiNhat = Date.now();
        return void n.line(e.text, "whisper", { who: e.fromName || (a = t.SceneWorld && t.SceneWorld.player, o = a && a.cfg && a.cfg.name, o ? String(o) : t.Auth && t.Auth.username ? String(t.Auth.username) : "Ta"), mine: !0, muc: i.key, authorId: e.from });
      }
      var a;
      var o;
      n.lastFrom = e.fromName;
      var c = b(C(e.fromName), "whisper", e.fromName);
      c.moiNhat = Date.now();
      t.Audio.play("whisper");
      n.line(e.text, "whisper", { who: e.fromName, muc: c.key, authorId: e.from });
    }
  };
  n.pushWhisperError = function (t, e) {
    var i = { offline: (e || "Người ấy") + " không có trên máy chủ lúc này.", self: "Không nhắn riêng cho chính mình được.", blocked: (e || "Người ấy") + " đã bị chặn hoặc đã chặn đạo hữu.", empty: "Lời nhắn trống." };
    n.line(i[t] || "Lời nhắn chưa gửi được.", "sys", { muc: e ? C(e) : n.cur });
  };
  n.pushSect = function (e) {
    var i = function (e) {
      return !e || f(e.id, e.ten) ? null : e.he ? { text: e.text, kind: "clan-sys", opts: { muc: "clan" } } : { text: e.text, kind: "clan", opts: { who: "[" + (e.chucTen || "") + "] " + (e.ten || ""), whoPlain: e.ten || "", authorId: e.id, mine: !(!t.Gateway || !e.id || e.id !== t.Gateway.selfId), muc: "clan", vai: e.chuc || "", phe: e.phe || "" } };
    }(e);
    if (i) {
      n.line(i.text, i.kind, i.opts);
    }
  };
  n.pushClan = function (t, e) {
    n.line(e, "clan", { who: t, muc: "clan" });
  };
  n.setSect = function (t) {
    var e = o.clan;
    if (e) {
      e.note = t ? t.ten + " · " + (t.capTen || "") : "";
      var n = t ? t.id : null;
      var a = void 0 !== i && i !== n;
      i = n;
      if (a) {
        e.dong = [];
        e.chuaDoc = 0;
        B();
        M();
      }
    }
  };
  n.tongDong = function () {
    return o.clan.dong;
  };
  n.tongChuaDoc = function () {
    return o.clan.chuaDoc;
  };
  n.docTong = function () {
    o.clan.chuaDoc = 0;
    B();
  };
  n.line = function (t, e, i) {
    var a = (i = i || {}).muc || ("say" === e ? "map" : "sys");
    var c = o[a] || o.sys;
    if (!i.authorId || !f(i.authorId, i.whoPlain || i.who)) {
      if (function (t, e, n, i) {
        for (t.dong.push({ text: e, kind: n || "sys", who: i.who || "", whoPlain: i.whoPlain || i.who || "", authorId: i.authorId || "", muc: t.key, vai: i.vai || "", phe: i.phe || "", mine: !!i.mine }); t.dong.length > 200;) {
          var a = t.dong.findIndex(function (t) {
            return !t.invite || !t.active;
          });
          if (a < 0) {
            break;
          }
          t.dong.splice(a, 1);
        }
      }(c, t, e, i), "clan" === c.key) {
        if (!(i.mine || x())) {
          c.chuaDoc++;
        }
        B();
        return void M();
      }
      if (!(n.open && n.cur === c.key)) {
        c.chuaDoc++;
      }
      if (n.cur === c.key) {
        W();
      }
      G();
      H();
    }
  };
  n.veDong = U;
  n.bubbles = Object.create(null);
  n.bubble = function (e, i, a) {
    if (e && i && t.Pixel && t.Pixel.textWidth) {
      n.bubbles[e] = { dong: K(i), con: _(i), mine: !!a };
    }
  };
  n.bubbleAt = function (e, i, a, o) {
    if (e && i && t.Pixel && t.Pixel.textWidth) {
      n.bubbles[e] = { dong: K(i, 150, 6), con: Math.min(12, _(i) + 2), at: { x: a, y: o } };
    }
  };
  n.updateBubbles = function (t) {
    for (var e in n.bubbles)
      (n.bubbles[e].con -= t) <= 0 && delete n.bubbles[e];
  };
  n.drawBubbles = function (e, i, a, o) {
    var c = t.CONFIG;
    var r = t.Gateway && t.Gateway.remotes || {};
    var u = t.Gateway && t.Gateway.selfId;
    for (var s in n.bubbles) {
      var l = n.bubbles[s].at;
      if (l) {
        F(e, n.bubbles[s], Math.round(l.x - i), Math.round(l.y - a) - c.CHAR_ANCHOR_Y - 3 - 36);
      }
      else {
        var d = u && s === u ? o : r[s];
        if (d && (d === o || d.seen)) {
          var h = d.x + (d.viewOff ? d.viewOff.x : 0);
          var p = d.y + (d.viewOff ? d.viewOff.y : 0);
          F(e, n.bubbles[s], Math.round(h - i), Math.round(p - a) - c.CHAR_ANCHOR_Y - 3 - 36);
        }
      }
    }
  };
}(window.PNTT);
