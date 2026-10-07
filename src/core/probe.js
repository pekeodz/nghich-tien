!function (n) {
  "use strict";
  var t = n.Probe = { on: !1 };
  var r = 512;
  var e = 600;
  var a = t.KIND = { frame: 1, fix: 2, mapReq: 3, mapCommit: 4, mapCancel: 5, land: 6, warp: 7, revive: 8, underrun: 9, stall: 10 };
  var o = t.FIX = { ignored: 0, soft: 1, hard: 2, stale: 3, blocked: 4 };
  var i = new Uint8Array(r);
  var u = new Float64Array(r);
  var c = new Float64Array(r);
  var s = new Float64Array(r);
  var l = new Float64Array(r);
  var f = new Float64Array(r);
  var h = 0;
  var d = 0;
  function p() {
    return "undefined" != typeof performance && performance.now ? performance.now() : Date.now();
  }
  t.now = p;
  var m = {};
  function b(n) {
    return (n = +n) == n && n !== 1 / 0 && n !== -1 / 0 ? n : 0;
  }
  m[a.stall] = 1;
  m[a.underrun] = 1;
  m[a.mapCommit] = 1;
  m[a.mapCancel] = 1;
  t.sample = function (n, e, a, o, g) {
    if ((t.on || m[n])) {
      i[h] = n;
      u[h] = p();
      c[h] = b(e);
      s[h] = b(a);
      l[h] = b(o);
      f[h] = b(g);
      h = (h + 1) % r;
      d++;
    }
  };
  var g = Object.create(null);
  var v = 0;
  var y = 0;
  t.count = function (n, t) {
    if (void 0 === g[n]) {
      if (v >= 64) {
        return void y++;
      }
      g[n] = 0;
      v++;
    }
    g[n] += void 0 === t ? 1 : t;
  };
  var w = Object.create(null);
  var M = 0;
  t.time = function (n, t) {
    var r = function (n) {
      return w[n] || (M >= 64 ? null : (M++, w[n] = { buf: new Float64Array(e), n: 0, head: 0, total: 0, worst: 0, count: 0 }));
    }(n);
    if (r && t >= 0) {
      r.buf[r.head] = t;
      r.head = (r.head + 1) % e;
      if (r.n < e) {
        r.n++;
      }
      r.total += t;
      r.count++;
      if (t > r.worst) {
        r.worst = t;
      }
    }
  };
  var S = new Float64Array(e);
  function F(n) {
    if (!n || !n.n) {
      return null;
    }
    for (var t = 0; t < n.n; t++)
      S[t] = n.buf[t];
    var r = S.subarray(0, n.n);
    Array.prototype.sort.call(r, function (n, t) {
      return n - t;
    });
    var e = function (t) {
      var e = Math.min(n.n - 1, Math.max(0, Math.round(t * (n.n - 1))));
      return Math.round(100 * r[e]) / 100;
    };
    return { p50: e(.5), p95: e(.95), p99: e(.99), "tệ nhất": Math.round(100 * n.worst) / 100, "trung bình": Math.round(n.total / n.count * 100) / 100, "số mẫu": n.count };
  }
  var x = Object.create(null);
  var A = 0;
  var O = 0;
  t.warn = function (n, t) {
    var r = p();
    if (void 0 === x[n]) {
      if (A >= 64) {
        O++;
        return !1;
      }
      A++;
    }
    else if (r - x[n] < 1e3) {
      O++;
      return !1;
    }
    x[n] = r;
    if ("undefined" != typeof console && console.warn) {
      console.warn("[PNTT] " + t);
    }
    return !0;
  };
  t.start = function () {
    t.on = !0;
    return "máy đo: BẬT";
  };
  t.stop = function () {
    t.on = !1;
    return "máy đo: TẮT";
  };
  t.reset = function () {
    h = 0;
    d = 0;
    i.fill(0);
    g = Object.create(null);
    v = 0;
    y = 0;
    w = Object.create(null);
    M = 0;
    x = Object.create(null);
    A = 0;
    O = 0;
  };
  t.stat = function (n) {
    return F(w[n]);
  };
  t.get = function (n) {
    return g[n] || 0;
  };
  t.report = function () {
    var e = { "máy đo": t.on ? "bật" : "tắt", "nhịp": {}, "bộ đếm": {} };
    for (var a in w)
      e["nhịp"][a] = F(w[a]);
    for (var o in g)
      e["bộ đếm"][o] = g[o];
    if (y) {
      e["bộ đếm"]["(khoá vượt trần, đã dồn)"] = y;
    }
    if (O) {
      e["cảnh báo bị nén"] = O;
    }
    e["vòng đệm"] = { "đang giữ": Math.min(d, r), "sức chứa": r, "tổng đã ghi": d };
    e["tài nguyên"] = function () {
      var t = {};
      var r = n.SceneWorld && n.SceneWorld.cullStats;
      if (r) {
        t["người khác · đang biết"] = r.remotes;
        t["người khác · đang vẽ"] = r.remotesDrawn;
        t["quái · đang sống"] = r.enemies;
        t["quái · đang vẽ"] = r.enemiesDrawn;
      }
      var e = n.SpriteFactory && n.SpriteFactory.stats && n.SpriteFactory.stats();
      if (e) {
        t["sprite · số sheet"] = e.sheets;
        t["sprite · pixel ước lượng (MiB)"] = Math.round(e.bytes / 1048576 * 10) / 10;
        t["sprite · trần (MiB)"] = Math.round(e.budget / 1048576);
        t["sprite · đang xếp hàng dựng"] = e.queued;
        t["sprite · đã dựng (lát / trọn)"] = e.builds + " / " + e.sync;
        t["sprite · đã bỏ vì đầy trần"] = e.evicted;
        if (e.tight) {
          t["sprite · chật (không bỏ được gì)"] = e.tight;
        }
        if (e.refused) {
          t["sprite · phải mặc bộ chung"] = e.refused;
        }
      }
      var a = n.Pixel && n.Pixel.textCacheStats && n.Pixel.textCacheStats();
      if (a) {
        t["chữ · số mảnh"] = a.entries;
        t["chữ · bộ nhớ (MiB)"] = Math.round(a.bytes / 1048576 * 100) / 100;
        t["chữ · trần (MiB)"] = Math.round(a.budget / 1048576);
      }
      try {
        var o = "undefined" != typeof performance && performance.memory;
        if (o) {
          t["JS heap đang dùng (MiB)"] = Math.round(o.usedJSHeapSize / 1048576 * 10) / 10;
        }
      }
      catch (n) {
      }
      return t;
    }();
    return e;
  };
  t.dump = function () {
    for (var n = Math.min(d, r), t = d > r ? h : 0, e = new Array(n), a = 0; a < n; a++) {
      var o = (t + a) % r;
      e[a] = [i[o], Math.round(100 * u[o]) / 100, c[o], s[o], l[o], f[o]];
    }
    return e;
  };
  t.export = function () {
    return JSON.stringify({ "bảng loại": a, "bảng cách sửa": o, "cột": ["loại", "mốc(ms)", "a", "b", "c", "d"], "tổng kết": t.report(), "mẫu": t.dump() });
  };
  try {
    if ("undefined" != typeof location && location.search && /[?&]probe=1\b/.test(location.search)) {
      t.on = !0;
    }
  }
  catch (n) {
  }
}(window.PNTT);
