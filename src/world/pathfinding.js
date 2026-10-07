!function (r) {
  "use strict";
  var t = r.CONFIG.TILE;
  function i() {
    this.a = [];
  }
  i.prototype.push = function (r) {
    var t = this.a;
    var i = t.length;
    for (t.push(r); i > 0;) {
      var n = i - 1 >> 1;
      if (t[n].f <= t[i].f) {
        break;
      }
      var e = t[n];
      t[n] = t[i];
      t[i] = e;
      i = n;
    }
  };
  i.prototype.pop = function () {
    var r = this.a;
    var t = r[0];
    var i = r.pop();
    if (r.length) {
      r[0] = i;
      for (var n = 0, e = r.length;;) {
        var a = 2 * n + 1;
        var f = a + 1;
        var o = n;
        if (a < e && r[a].f < r[o].f && (o = a), f < e && r[f].f < r[o].f && (o = f), o === n) {
          break;
        }
        var u = r[o];
        r[o] = r[n];
        r[n] = u;
        n = o;
      }
    }
    return t;
  };
  i.prototype.size = function () {
    return this.a.length;
  };
  var n = r.Pathfinder = {};
  var e = [[1, 0, 1], [-1, 0, 1], [0, 1, 1], [0, -1, 1], [1, 1, 1.414], [1, -1, 1.414], [-1, 1, 1.414], [-1, -1, 1.414]];
  function a(r, t, i, n) {
    var e = Math.abs(i - r);
    var a = Math.abs(n - t);
    return e + a + (1.414 - 2) * Math.min(e, a);
  }
  function f(r, t, i) {
    for (var n = [], e = t; -1 !== e;)
      n.push({ tx: e % i, ty: e / i | 0 }), e = r[e];
    n.reverse();
    n.shift();
    return n;
  }
  n.find = function (r, t, n, o, u, l) {
    if (r.isBlockedTile(o, u)) {
      return null;
    }
    if (t === o && n === u) {
      return [];
    }
    l = l || 4e3;
    var h = r.width;
    var s = r.height;
    var v = h * s;
    var p = new Float32Array(v).fill(1 / 0);
    var c = new Int32Array(v).fill(-1);
    var y = new Uint8Array(v);
    var d = n * h + t;
    var g = u * h + o;
    p[d] = 0;
    var k = new i;
    k.push({ i: d, f: a(t, n, o, u) });
    for (var b = 0; k.size();) {
      var w = k.pop();
      if (!y[w.i]) {
        if (y[w.i] = 1, ++b > l) {
          break;
        }
        if (w.i === g) {
          return f(c, g, h);
        }
        for (var x = w.i % h, M = w.i / h | 0, T = 0; T < e.length; T++) {
          var B = x + e[T][0];
          var A = M + e[T][1];
          if (!(B < 0 || A < 0 || B >= h || A >= s || r.isBlockedTile(B, A))) {
            if (0 !== e[T][0] && 0 !== e[T][1]) {
              if (r.isBlockedTile(x + e[T][0], M)) {
                continue;
              }
              if (r.isBlockedTile(x, M + e[T][1])) {
                continue;
              }
            }
            var C = A * h + B;
            if (!y[C]) {
              var I = p[w.i] + e[T][2];
              if (I < p[C]) {
                p[C] = I;
                c[C] = w.i;
                k.push({ i: C, f: I + a(B, A, o, u) });
              }
            }
          }
        }
      }
    }
    return null;
  };
  n.toWaypoints = function (r, i, n, e, a, f) {
    if (!e || !e.length) {
      return [];
    }
    for (var o = e.map(function (r) {
      return { x: r.tx * t + t / 2, y: r.ty * t + t / 2 };
    }), u = [], l = i, h = n, s = 0; s < o.length;) {
      for (var v = s, p = o.length - 1; p > s; p--)
        if (r.lineClear(l, h, o[p].x, o[p].y, a, f)) {
          v = p;
          break;
        }
      u.push(o[v]);
      l = o[v].x;
      h = o[v].y;
      s = v + 1;
    }
    return u;
  };
  n.route = function (r, i, e, a, f, o, u) {
    var l = Math.floor(i / t);
    var h = Math.floor(e / t);
    var s = Math.floor(a / t);
    var v = Math.floor(f / t);
    var p = r.nearestWalkable(s, v, 6);
    if (!p) {
      return [];
    }
    s = p.tx;
    v = p.ty;
    var c = s * t + t / 2;
    var y = v * t + t / 2;
    if (r.lineClear(i, e, c, y, o, u)) {
      return [{ x: c, y: y }];
    }
    var d = n.find(r, l, h, s, v);
    return d ? n.toWaypoints(r, i, e, d, o, u) : [];
  };
}(window.PNTT);
