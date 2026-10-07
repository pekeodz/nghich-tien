/* ============================================================================
 *  firebase-shim.js — Dùng Firebase thay cho Supabase, KHÔNG sửa code game.
 * ----------------------------------------------------------------------------
 *  Game gọi window.supabase.createClient(...) rồi dùng:
 *      client.auth.{onAuthStateChange, getSession, signUp, signInWithPassword,
 *                   signOut, updateUser, verifyOtp, resend, refreshSession}
 *      client.from("characters").select(...).eq("user_id", id).maybeSingle()
 *      client.from("characters").upsert(row, {onConflict:"user_id"})
 *  File này dựng lại đúng các hàm đó bằng Firebase Auth + Firestore.
 *
 *  Cần nạp SAU 3 file firebase-*-compat.js và SAU runtime-config.js.
 *  Cấu hình lấy từ PNTT_RUNTIME_CONFIG.firebase. Chưa điền thì không làm gì,
 *  game tự chạy chế độ ngoại tuyến (localStorage) như cũ.
 *
 *  Dữ liệu nhân vật nằm ở Firestore: collection "characters", document = uid.
 * ==========================================================================*/
(function () {
  "use strict";
  var FAKE_DOMAIN = "@players.phamnhan.game";
  var cfg = (window.PNTT_RUNTIME_CONFIG || {}).firebase;

  if (!cfg || !cfg.apiKey || /^DAN_/i.test(cfg.apiKey)) {
    console.info("[PNTT] Chưa điền firebase trong runtime-config.js — chạy ngoại tuyến.");
    return;
  }
  if (!window.firebase || !firebase.initializeApp) {
    console.warn("[PNTT] Chưa nạp được Firebase SDK (kiểm tra mạng) — chạy ngoại tuyến.");
    return;
  }

  var ERR = {
    "auth/invalid-credential": "Invalid login credentials",
    "auth/invalid-login-credentials": "Invalid login credentials",
    "auth/wrong-password": "Invalid login credentials",
    "auth/user-not-found": "Invalid login credentials",
    "auth/email-already-in-use": "User already registered",
    "auth/weak-password": "Password should be at least 6 characters",
    "auth/network-request-failed": "Failed to fetch",
    "auth/invalid-email": "Email không hợp lệ.",
    "auth/too-many-requests": "Thử quá nhiều lần, hãy đợi một lát rồi thử lại.",
    "auth/operation-not-allowed": "Chưa bật đăng nhập Email/Password trong Firebase Console.",
    "permission-denied": "Firestore từ chối (kiểm tra Rules)."
  };
  function mkErr(e) {
    var code = (e && e.code) || "";
    return { message: ERR[code] || (e && e.message) || String(e), code: code };
  }

  function toUser(fu) {
    if (!fu) return null;
    var email = String(fu.email || "").toLowerCase();
    var name = fu.displayName ||
      (email.slice(-FAKE_DOMAIN.length) === FAKE_DOMAIN ? email.split("@")[0] : email);
    return {
      id: fu.uid,
      email: email,
      user_metadata: { username: name, guest: /^k[0-9a-f]{9}@players\.phamnhan\.game$/.test(email) },
      app_metadata: {}
    };
  }
  function toSession(fu) {
    if (!fu) return Promise.resolve(null);
    return fu.getIdToken().then(function (tok) {
      return { user: toUser(fu), access_token: tok };
    });
  }
  function wrap(p) {            // đổi kết quả Firebase -> dạng { data, error } của Supabase
    return p.then(function (cred) {
      return toSession(cred.user).then(function (s) {
        return { data: { user: s.user, session: s }, error: null };
      });
    }).catch(function (e) {
      return { data: { user: null, session: null }, error: mkErr(e) };
    });
  }
  var NOT_SUPPORTED = { message: "Tính năng này chưa hỗ trợ trên bản Firebase." };

  function create() {
    var app = firebase.apps.length ? firebase.app() : firebase.initializeApp(cfg);
    var fa = firebase.auth(app);
    var db = firebase.firestore(app);

    var restored = new Promise(function (res) {
      var off = fa.onAuthStateChanged(function (u) { off(); res(u); });
    });

    var auth = {
      onAuthStateChange: function (cb) {
        var off = fa.onAuthStateChanged(function (u) {
          toSession(u).then(function (s) { cb(u ? "SIGNED_IN" : "SIGNED_OUT", s); });
        });
        return { data: { subscription: { unsubscribe: off } } };
      },
      getSession: function () {
        return restored.then(function () { return toSession(fa.currentUser); })
          .then(function (s) { return { data: { session: s }, error: null }; });
      },
      signUp: function (a) { return wrap(fa.createUserWithEmailAndPassword(a.email, a.password)); },
      signInWithPassword: function (a) { return wrap(fa.signInWithEmailAndPassword(a.email, a.password)); },
      signOut: function () { return fa.signOut().then(function () { return { error: null }; }); },
      refreshSession: function () {
        return toSession(fa.currentUser).then(function (s) { return { data: { session: s }, error: null }; });
      },
      updateUser: function () { return Promise.resolve({ data: null, error: NOT_SUPPORTED }); },
      verifyOtp: function () { return Promise.resolve({ data: null, error: NOT_SUPPORTED }); },
      resend: function () { return Promise.resolve({ error: NOT_SUPPORTED }); }
    };

    // adminRev: số phiên bản do trang quản trị (admin.html) tăng mỗi lần sửa nhân vật.
    // Máy khách gửi kèm số nó đang biết; nếu admin vừa sửa thì Firestore Rules từ chối
    // bản lưu cũ -> game tải lại để nhận dữ liệu mới, không ghi đè thay đổi của admin.
    var knownRev = {};
    var reloading = false;
    var FV = firebase.firestore.FieldValue;

    function today() {
      var d = new Date();
      return d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
    }
    function showBan(d) {
      alert("Tài khoản này đã bị khoá." + (d.banReason ? "\nLý do: " + d.banReason : "") +
        "\nLiên hệ quản trị viên để biết thêm.");
      fa.signOut().then(function () { location.reload(); });
    }

    // Firestore không nhận mảng lồng mảng nên appearance/save được lưu dạng chuỗi JSON.
    function encode(row) {
      var o = { uid: row.user_id, updatedAt: FV.serverTimestamp(), adminRev: knownRev[row.user_id] || 0 };
      ["name", "map_id", "x", "y", "dir", "realm_id", "exp"].forEach(function (k) {
        if (row[k] !== undefined && row[k] !== null) o[k] = row[k];
      });
      o.appearanceJson = JSON.stringify(row.appearance || {});
      o.saveJson = JSON.stringify(row.save || {});
      return o;
    }
    function decode(d) {
      function p(s) { try { return JSON.parse(s || "{}"); } catch (e) { return {}; } }
      return {
        name: d.name, map_id: d.map_id, x: d.x, y: d.y, dir: d.dir,
        realm_id: d.realm_id, exp: d.exp,
        appearance: p(d.appearanceJson), save: p(d.saveJson)
      };
    }

    function Table(name) { this.name = name; this.id = null; }
    Table.prototype.select = function () { return this; };
    Table.prototype.eq = function (col, val) { if (col === "user_id") this.id = val; return this; };
    Table.prototype.maybeSingle = function () {
      if (!this.id) return Promise.resolve({ data: null, error: null });
      var id = this.id;
      return db.collection(this.name).doc(id).get().then(function (snap) {
        if (!snap.exists) { knownRev[id] = 0; return { data: null, error: null }; }
        var d = snap.data();
        if (d.banned) { showBan(d); return { data: null, error: { message: "Tài khoản đã bị khoá." } }; }
        knownRev[id] = d.adminRev || 0;
        return { data: decode(d), error: null };
      }).catch(function (e) { return { data: null, error: mkErr(e) }; });
    };

    // Sao lưu mỗi ngày một bản: characters/{uid}/backups/{YYYY-MM-DD}.
    // Rules chỉ cho TẠO, không cho sửa/xoá, nên bản cũ không bị ghi đè.
    function backupOnce(col, uid, data) {
      var day = today(), key = "pntt_backup_day_" + uid;
      try { if (localStorage.getItem(key) === day) return; } catch (e) {}
      var copy = {};
      for (var k in data) copy[k] = data[k];
      copy.backupAt = FV.serverTimestamp();
      db.collection(col).doc(uid).collection("backups").doc(day).set(copy)
        .catch(function () { /* đã có bản hôm nay */ })
        .then(function () { try { localStorage.setItem(key, day); } catch (e) {} });
    }

    // Khi bị từ chối ghi: kiểm tra xem admin vừa sửa hoặc khoá nhân vật không.
    function checkRejected(col, uid) {
      return db.collection(col).doc(uid).get().then(function (snap) {
        if (!snap.exists || reloading) return;
        var d = snap.data();
        if (d.banned) { reloading = true; showBan(d); return; }
        if ((d.adminRev || 0) !== (knownRev[uid] || 0)) {
          reloading = true;
          alert("Quản trị viên vừa cập nhật nhân vật của bạn. Game sẽ tải lại để nhận dữ liệu mới.");
          location.reload();
        }
      }).catch(function () {});
    }

    Table.prototype.upsert = function (row) {
      if (reloading) return Promise.resolve({ error: { message: "Đang tải lại." } });
      var col = this.name, data = encode(row);
      return db.collection(col).doc(row.user_id).set(data, { merge: true })
        .then(function () { backupOnce(col, row.user_id, data); return { error: null }; })
        .catch(function (e) {
          if (e && e.code === "permission-denied") checkRejected(col, row.user_id);
          return { error: mkErr(e) };
        });
    };

    return { auth: auth, from: function (t) { return new Table(t); } };
  }

  window.supabase = { createClient: create };   // client.js sẽ gọi hàm này
})();
