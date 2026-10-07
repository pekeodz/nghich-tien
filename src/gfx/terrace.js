!function (r) {
  "use strict";
  var a = r.Terrace = {};
  var t = 32;
  var n = new Uint8Array(512);
  var e = new Float32Array(256);
  var o = -1;
  function f(r, a) {
    return e[n[n[255 & r] + a & 255]];
  }
  function i(r, a) {
    var t = Math.floor(r);
    var n = Math.floor(a);
    var e = r - t;
    var o = a - n;
    e = e * e * (3 - 2 * e);
    o = o * o * (3 - 2 * o);
    var i = f(t, n);
    var c = f(t + 1, n);
    var l = f(t, n + 1);
    return i + (c - i) * e + (l - i) * o + (i - c - l + f(t + 1, n + 1)) * e * o;
  }
  function c(r, a) {
    return .62 * i(r, a) + .28 * i(2.03 * r + 17.3, 2.03 * a + 9.1) + .1 * i(4.11 * r + 3.7, 4.11 * a + 41.9);
  }
  function l(r, a, t) {
    var n = 374761393 * r + 668265263 * a + 2147483647 * (0 | t) + 1442695041 * o | 0;
    n = Math.imul(n ^ n >>> 13, 1274126177);
    return ((n ^= n >>> 16) >>> 0) / 4294967296;
  }
  function s(r) {
    var a = parseInt(r.slice(1), 16);
    return [a >> 16 & 255, a >> 8 & 255, 255 & a];
  }
  function v(r, a, t) {
    return [r[0] + (a[0] - r[0]) * t, r[1] + (a[1] - r[1]) * t, r[2] + (a[2] - r[2]) * t];
  }
  function h(r, a) {
    return [r[0] * a, r[1] * a, r[2] * a];
  }
  function u(r, a, t) {
    var n;
    var e;
    var o;
    var f = 1.41421;
    var i = new Float32Array(a * t);
    for (n = 0; n < i.length; n++)
      i[n] = r[n] ? 0 : 1e9;
    for (o = 0; o < t; o++)
      for (e = 0; e < a; e++) {
        var c = i[n = o * a + e];
        if (e > 0 && i[n - 1] + 1 < c) {
          c = i[n - 1] + 1;
        }
        if (o > 0) {
          if (i[n - a] + 1 < c) {
            c = i[n - a] + 1;
          }
          if (e > 0 && i[n - a - 1] + f < c) {
            c = i[n - a - 1] + f;
          }
          if (e < a - 1 && i[n - a + 1] + f < c) {
            c = i[n - a + 1] + f;
          }
        }
        i[n] = c;
      }
    for (o = t - 1; o >= 0; o--)
      for (e = a - 1; e >= 0; e--) {
        var l = i[n = o * a + e];
        if (e < a - 1 && i[n + 1] + 1 < l) {
          l = i[n + 1] + 1;
        }
        if (o < t - 1) {
          if (i[n + a] + 1 < l) {
            l = i[n + a] + 1;
          }
          if (e < a - 1 && i[n + a + 1] + f < l) {
            l = i[n + a + 1] + f;
          }
          if (e > 0 && i[n + a - 1] + f < l) {
            l = i[n + a - 1] + f;
          }
        }
        i[n] = l;
      }
    return i;
  }
  function g(r, a, t, n) {
    var e;
    var o;
    var f;
    var i;
    var c;
    var l = new Float32Array(r.length);
    var s = new Float32Array(r.length);
    for (o = 0; o < t; o++)
      for (e = 0; e < a; e++) {
        for (i = 0, c = 0, f = -n; f <= n; f++) {
          var v = e + f;
          if (!(v < 0 || v >= a)) {
            i += r[o * a + v];
            c++;
          }
        }
        l[o * a + e] = i / c;
      }
    for (o = 0; o < t; o++)
      for (e = 0; e < a; e++) {
        for (i = 0, c = 0, f = -n; f <= n; f++) {
          var h = o + f;
          if (!(h < 0 || h >= t)) {
            i += l[h * a + e];
            c++;
          }
        }
        s[o * a + e] = i / c;
      }
    return s;
  }
  var d = "tham_nui_co_bui";
  var M = { img: null, cells: null };
  function w(a) {
    var f = a.terrace;
    var w = a.width;
    var m = a.height;
    var b = w * t;
    var x = m * t;
    var H = f.rise || 26;
    var I = f.step || 60;
    var U = f.maxLevel || 6;
    var F = f.southPad || 16;
    var T = U * H + 8;
    var P = x + T;
    var N = f.mountain || "C";
    var O = function () {
      var a = r.Assets && r.Assets.object ? r.Assets.object(d) : null;
      if (!a || !a.width || !a.height) {
        return null;
      }
      if (M.img === a) {
        return M.cells;
      }
      M.img = a;
      M.cells = null;
      try {
        var t = r.Utils.canvas(a.width, a.height);
        t.ctx.imageSmoothingEnabled = !1;
        t.ctx.drawImage(a, 0, 0);
        for (var n = t.ctx.getImageData(0, 0, a.width, a.height).data, e = Math.floor(a.width / 4), o = Math.floor(a.height / 4), f = [], i = 0; i < 4; i++)
          for (var c = 0; c < 4; c++) {
            var l;
            var s;
            var v = e;
            var h = o;
            var u = -1;
            var g = -1;
            for (s = 0; s < o; s++)
              for (l = 0; l < e; l++)
                n[4 * ((i * o + s) * a.width + c * e + l) + 3] < 24 || (l < v && (v = l), l > u && (u = l), s < h && (h = s), s > g && (g = s));
            if (!(u < v || g < h)) {
              f.push({ img: a, sx: c * e + v, sy: i * o + h, w: u - v + 1, h: g - h + 1 });
            }
          }
        M.cells = f.length ? f : null;
      }
      catch (r) {
        console.warn("[PNTT] Không cắt được tấm " + d + ":", r);
        M.cells = null;
      }
      return M.cells;
    }();
    var j = null != f.contourNoise ? f.contourNoise : 30;
    var S = null != f.edgeNoise ? f.edgeNoise : 4;
    var _ = f.water || "";
    var R = !!f.rockTop;
    var W = f.grassBias || 0;
    !function (r) {
      if (o !== r) {
        o = r;
        var a;
        var t = 2654435761 * r >>> 0 || 1;
        for (a = 0; a < 256; a++)
          n[a] = a, e[a] = 2 * c() - 1;
        for (a = 255; a > 0; a--) {
          var f = c() * (a + 1) | 0;
          var i = n[a];
          n[a] = n[f];
          n[f] = i;
        }
        for (a = 0; a < 256; a++)
          n[a + 256] = n[a];
      }
      function c() {
        t ^= t << 13;
        t >>>= 0;
        t ^= t >>> 17;
        t ^= t << 5;
        return (t >>>= 0) / 4294967296;
      }
    }(f.seed || 7);
    var q;
    var C;
    var E;
    var K;
    var B;
    var z = function () {
      var a = r.Palette.WORLD;
      var t = { grass: s(a.grass.base), grassD: s(a.grass.d1), grassL: s(a.grass.d2), grassH: s(a.grass.d3), grassLine: s(a.grass.line), dirt: s(a.dirt.base), dirtD: s(a.dirt.d1), dirtL: s(a.dirt.d2), dirtH: s(a.dirt.d3), dirtLine: s(a.dirt.line), peb: s(a.pebble.base), pebD: s(a.pebble.d1), pebL: s(a.pebble.d2), pebH: s(a.pebble.d3), pebLine: s(a.pebble.line), cliff: s(a.cliff.base), cliffD: s(a.cliff.d1), cliffL: s(a.cliff.d2), cliffH: s(a.cliff.d3), line: s(a.cliff.line) };
      t.rockHi = v(t.pebH, t.dirtH, .25);
      t.rockL = v(t.pebL, t.cliffH, .35);
      t.rockM = v(t.peb, t.cliffL, .45);
      t.rockD = v(t.pebD, t.cliff, .55);
      t.rockDD = v(t.cliff, t.cliffD, .6);
      t.crev = v(t.line, t.cliffD, .25);
      return t;
    }();
    var G = new Uint8Array(w * m);
    for (B = 0; B < m; B++) {
      var J = a.ground[B] || "";
      for (K = 0; K < w; K++) {
        var Q = J.charAt(K);
        G[B * w + K] = N.indexOf(Q) >= 0 ? 1 : _ && _.indexOf(Q) >= 0 ? 2 : 0;
      }
    }
    function V(r, a) {
      var n = Math.min(w - 1, Math.max(0, Math.floor(r / t)));
      var e = Math.min(m - 1, Math.max(0, Math.floor(a / t)));
      var o = G[e * w + n];
      return 2 === o || 0 === o && e > 0 && 2 === G[(e - 1) * w + n];
    }
    function X(r, a) {
      var n = Math.min(w - 1, Math.max(0, Math.floor(r / t)));
      var e = Math.min(m - 1, Math.max(0, Math.floor(a / t)));
      return G[e * w + n];
    }
    var Y = b / 4;
    var Z = Math.ceil(P / 4);
    var $ = new Uint8Array(Y * Z);
    var rr = new Uint8Array(Y * Z);
    for (C = 0; C < Z; C++)
      for (q = 0; q < Y; q++) {
        var ar = X(4 * q + 2, 4 * C + 2 - T);
        $[C * Y + q] = ar;
        rr[C * Y + q] = ar ? 0 : 1;
      }
    var tr = u(rr, Y, Z);
    var nr = u($, Y, Z);
    var er = new Float32Array(Y * Z);
    for (E = 0; E < er.length; E++)
      er[E] = $[E] ? 4 * (tr[E] - .5) : 4 * -(nr[E] - .5);
    er = g(g(er, Y, Z, 2), Y, Z, 2);
    var or = new Float32Array(Y * Z);
    for (C = 1; C < Z - 1; C++)
      for (q = 1; q < Y - 1; q++) {
        var fr = er[(E = C * Y + q) + 1] - er[E - 1];
        var ir = er[E + Y] - er[E - Y];
        or[E] = ir / (Math.sqrt(fr * fr + ir * ir) + .001);
      }
    or = g(g(or, Y, Z, 4), Y, Z, 4);
    var cr = f.crest || 3;
    var lr = f.ridgeStep || I;
    var sr = -T;
    var vr = Math.ceil((P + 40 * U + 8) / 4) + 2;
    var hr = Y + 2;
    function ur(r) {
      for (var a = new Float32Array(hr * vr), t = 0; t < vr; t++)
        for (var n = 0; n < hr; n++)
          a[t * hr + n] = r(4 * n, 4 * t + sr);
      return function (r, t) {
        var n = r / 4;
        var e = (t - sr) / 4;
        var o = Math.floor(n);
        var f = Math.floor(e);
        if (o < 0) {
          o = 0;
        }
        else {
          if (o > hr - 2) {
            o = hr - 2;
          }
        }
        if (f < 0) {
          f = 0;
        }
        else {
          if (f > vr - 2) {
            f = vr - 2;
          }
        }
        var i = n - o;
        var c = e - f;
        var l = f * hr + o;
        var s = a[l];
        var v = a[l + 1];
        var h = a[l + hr];
        return s + (v - s) * i + (h - s) * c + (s - v - h + a[l + hr + 1]) * i * c;
      };
    }
    var gr = ur(function (r, a) {
      return c(r / 70, a / 70);
    });
    var dr = ur(function (r, a) {
      return c(r / 13 + 7.7, a / 13);
    });
    var Mr = ur(function (r, a) {
      return c(r / 7 + 1.3, a / 7);
    });
    var wr = new Float32Array(Y * Z);
    var mr = new Float32Array(Y * Z);
    var br = new Float32Array(Y * Z);
    for (C = 0; C < Z; C++) {
      var yr = 4 * C + 2 - T;
      for (q = 0; q < Y; q++) {
        var kr = 4 * q + 2;
        wr[E = C * Y + q] = er[E] - (i(kr / 9, yr / 9) * S + 1);
        mr[E] = er[E] + c(kr / 84 + 3.1, yr / 84) * j + i(kr / 21 + 50, yr / 21) * j / 5;
        br[E] = !1 === f.ridge ? -1 : or[E] - .3 - .1 * i(kr / 40, yr / 40);
      }
    }
    var pr = new Int32Array(b);
    var Dr = new Int32Array(b);
    var Ar = new Float32Array(b);
    for (q = 0; q < b; q++) {
      var xr = q / 4 - .5;
      var Lr = Math.floor(xr);
      Ar[q] = xr - Lr;
      pr[q] = Math.min(Y - 1, Math.max(0, Lr));
      Dr[q] = Math.min(Y - 1, Math.max(0, Lr + 1));
    }
    for (var Hr = new Int8Array(b * P), Ir = 0; Ir < P; Ir++) {
      var Ur = Ir / 4 - .5;
      var Fr = Math.floor(Ur);
      var Tr = Ur - Fr;
      var Pr = Math.min(Z - 1, Math.max(0, Fr)) * Y;
      var Nr = Math.min(Z - 1, Math.max(0, Fr + 1)) * Y;
      var Or = Ir * b;
      for (q = 0; q < b; q++) {
        var jr = Pr + pr[q];
        var Sr = Pr + Dr[q];
        var _r = Nr + pr[q];
        var Rr = Nr + Dr[q];
        var Wr = Ar[q];
        var qr = wr[jr] + (wr[Sr] - wr[jr]) * Wr;
        if (qr + (wr[_r] + (wr[Rr] - wr[_r]) * Wr - qr) * Tr <= 0) {
          Hr[Or + q] = -1;
        }
        else {
          var Cr = mr[jr] + (mr[Sr] - mr[jr]) * Wr;
          var Er = Cr + (mr[_r] + (mr[Rr] - mr[_r]) * Wr - Cr) * Tr;
          var Kr = br[jr] + (br[Sr] - br[jr]) * Wr;
          var Br = Kr + (br[_r] + (br[Rr] - br[_r]) * Wr - Kr) * Tr > 0 ? cr - Math.floor(Er / lr) : 1 + Math.floor(Er / I);
          Hr[Or + q] = Br < 1 ? 1 : Br > U ? U : Br;
        }
      }
    }
    if (_ && !1 !== f.waterSink) {
      for (Ir = 0; Ir < P; Ir++)
        for (q = 0; q < b; q++)
          Hr[E = Ir * b + q] > 0 && V(q, Ir - T) && (Hr[E] -= 1);
    }
    for (q = 0; q < b; q++) {
      var zr = -1e9;
      for (Ir = 0; Ir < P; Ir++)
        if (Hr[E = Ir * b + q] < 0) {
          zr = Ir;
        }
        else {
          var Gr = Math.floor((Ir - zr - F) / H);
          if (Gr < Hr[E]) {
            Hr[E] = Gr < 0 ? 0 : Gr;
          }
        }
    }
    var Jr = b * x;
    var Qr = new Uint8Array(Jr);
    var Vr = new Int8Array(Jr);
    var Xr = new Int16Array(Jr);
    var Yr = new Uint8Array(Jr);
    var Zr = new Uint8Array(Jr);
    var $r = new Int16Array(Jr);
    for (Ir = 0; Ir < P; Ir++) {
      var ra = Ir - T;
      for (q = 0; q < b; q++) {
        var aa = Hr[Ir * b + q];
        if (!(aa < 0)) {
          var ta = ra - aa * H;
          if (!(ta >= x)) {
            if (ta >= 0) {
              Qr[E = ta * b + q] = aa > 0 ? 1 : 3;
              Vr[E] = aa;
              Xr[E] = ra;
            }
            var na = Ir > 0 ? Hr[(Ir - 1) * b + q] : aa;
            if (na < 0 && (na = 0), aa > 0 && na < aa && (!_ || !V(q, ra))) {
              for (var ea = Math.min(13, 6 + 3 * (aa - na)), oa = 1; oa <= ea; oa++) {
                var fa = ta - oa;
                if (!(fa < 0 || fa >= x || 1 === Qr[E = fa * b + q] && Vr[E] >= aa)) {
                  Qr[E] = 4;
                  Vr[E] = aa;
                  Yr[E] = oa;
                  Zr[E] = ea;
                }
              }
            }
            var ia = Ir + 1 < P ? Hr[(Ir + 1) * b + q] : aa;
            if (ia < 0 && (ia = 0), ia < aa) {
              for (var ca = Math.min(x - 1, ra - ia * H), la = Math.min(255, (aa - ia) * H), sa = Math.max(0, ta + 1); sa <= ca; sa++)
                Qr[E = sa * b + q] = 2, Vr[E] = aa, Yr[E] = Math.min(255, sa - ta), Zr[E] = la, $r[E] = ra;
            }
          }
        }
      }
    }
    for (C = 0; C < x; C++)
      for (q = 0; q < b; q++)
        !Qr[E = C * b + q] && X(q, C) && (Qr[E] = 3, Vr[E] = 0, Xr[E] = C);
    var va = [];
    var ha = new Uint8ClampedArray(4 * Jr);
    var ua = new Uint8Array(Jr);
    function ga(r, a, t) {
      var n = 4 * r;
      ha[n] = a[0];
      ha[n + 1] = a[1];
      ha[n + 2] = a[2];
      ha[n + 3] = null == t ? 255 : t;
    }
    function da(r, a) {
      return r < 0 || a < 0 || r >= b || a >= x ? 255 : Qr[a * b + r];
    }
    function Ma(r, a) {
      return r < 0 || a < 0 || r >= b || a >= x ? 99 : Vr[a * b + r];
    }
    var wa = new Uint8Array(Jr);
    for (q = 0; q < b; q++)
      for (C = x - 2; C >= 0; C--) {
        var ma = Qr[(E = C * b + q) + b];
        wa[E] = 2 === ma ? 1 : (1 === ma || 3 === ma) && wa[E + b] && wa[E + b] < 250 ? wa[E + b] + 1 : 0;
      }
    var ba;
    var ya;
    var ka;
    var pa;
    var Da;
    var Aa;
    var xa = new Float32Array(b);
    function La(r) {
      var a;
      var t;
      var n = r * b;
      var e = 0;
      var o = 0;
      for (a = 0; a < b; a++)
        xa[a] = 0;
      for (a = 0; a < b; a++)
        if (t = Qr[n + a] ? Vr[n + a] : -1, 0 !== a && t === (Qr[n + a - 1] ? Vr[n + a - 1] : -1) || (e = a, o = a > 0 ? Qr[n + a - 1] ? Vr[n + a - 1] : -1 : t), t >= 1 && o < t) {
          var f = Math.min(16, 8 + 5 * (t - Math.max(o, 0)));
          var i = a - e + 1;
          if (i <= f) {
            xa[a] = i / f * .999 + .001;
          }
        }
      for (a = b - 1; a >= 0; a--)
        if (t = Qr[n + a] ? Vr[n + a] : -1, a !== b - 1 && t === (Qr[n + a + 1] ? Vr[n + a + 1] : -1) || (e = a, o = a < b - 1 ? Qr[n + a + 1] ? Vr[n + a + 1] : -1 : t), t >= 1 && o < t) {
          var c = Math.min(16, 8 + 5 * (t - Math.max(o, 0)));
          var l = e - a + 1;
          if (l <= c) {
            var s = l / c * .999 + .001;
            if ((!xa[a] || s < xa[a])) {
              xa[a] = -s;
            }
          }
        }
    }
    for (C = 0; C < x; C++)
      for (La(C), q = 0; q < b; q++) {
        var Ha = Qr[E = C * b + q];
        if (Ha) {
          var Ia;
          var Ua = Vr[E];
          if (_ && (2 === Ha ? V(q, $r[E]) : 4 === Ha ? C + Yr[E] < x && 2 !== Qr[E + Yr[E] * b] && V(q, Xr[E + Yr[E] * b]) : (1 === Ha || 3 === Ha) && V(q, Xr[E]))) {
            if (4 === Ha) {
              va.push(E, 0, C, 0);
              continue;
            }
            va.push(E, 2 === Ha ? 1 : 0, 2 === Ha ? Yr[E] : Xr[E], 2 === Ha ? Zr[E] : 0);
          }
          else {
            if (2 === Ha) {
              Ia = y(q, Yr[E], Zr[E], Ua, z, _a(q, C - Yr[E]));
            }
            else if (4 === Ha) {
              Ia = k(q, Yr[E], Zr[E], z);
            }
            else {
              var Fa = Xr[E];
              var Ta = gr(q, Fa + 37 * Ua) + (3 === Ha ? -.38 : .2) + W;
              if (wa[E] && wa[E] <= 8) {
                Ta -= .42 * (1 - (wa[E] - 1) / 8);
              }
              var Pa = Ta + .14 * (l(q, Fa, 3) - .5) > 0;
              ua[E] = Pa ? 1 : 0;
              Ia = 3 !== Ha || Pa ? R && !Pa ? D(q, Fa, dr(q, Fa), z) : p(q, Fa, Pa, dr(q, Fa), z) : A(q, Fa, Mr(q, Fa), z);
              if (2 === da(q, C + 1) && Ma(q, C + 1) === Ua) {
                Ia = Pa ? z.grassH : v(z.rockHi, z.dirtH, .4);
              }
              else {
                if (2 === da(q, C + 2) && Ma(q, C + 2) === Ua) {
                  Ia = v(Ia, Pa ? z.grassL : z.rockL, .55);
                }
              }
              var Na = da(q, C - 1);
              var Oa = Ma(q, C - 1);
              if (4 === Na && Oa === Ua) {
                Ia = Pa ? z.grassH : z.rockHi;
              }
              else if (255 !== Na && (0 === Na || (1 === Na || 3 === Na) && Oa < Ua)) {
                Ia = z.crev;
              }
              else {
                var ja = da(q, C - 2);
                if (255 !== ja && (0 === ja || (1 === ja || 3 === ja) && Ma(q, C - 2) < Ua)) {
                  Ia = Pa ? z.grassH : z.rockHi;
                }
              }
              if (Ua >= 1 && xa[q]) {
                Ia = Sa(0, C, xa[q], z);
              }
            }
            ga(E, Ia);
          }
        }
      }
    function Sa(r, a, t, n) {
      var e = t > 0;
      var o = Math.abs(t);
      var f = y(a + 911, Math.max(1, Math.round(14 * (1 - o))), 16, 3, n, !1);
      f = h(f, e ? 1.06 : .8);
      if (o > .9) {
        f = e ? n.rockHi : v(n.rockL, n.rockHi, .3);
      }
      else {
        if (o < .1) {
          f = n.crev;
        }
      }
      return f;
    }
    function _a(r, a) {
      return !(a < 0 || a >= x || !ua[a * b + r]);
    }
    for (q = 0; q < b; q++)
      for (C = 0; C < x - 1; C++)
        if (2 === Qr[E = C * b + q] && 2 !== Qr[E + b]) {
          for (var Ra = 1; Ra <= 11; Ra++) {
            var Wa = C + Ra;
            if (Wa >= x) {
              break;
            }
            var qa = Wa * b + q;
            if (2 === Qr[qa]) {
              break;
            }
            Ka(qa, .5 * Math.pow(1 - (Ra - 1) / 11, 1.6) * (.8 + .2 * i(q / 6, Wa / 6)));
          }
        }
    for (C = 0; C < x; C++)
      for (q = 1; q < b - 1; q++)
        if (!Qr[E = C * b + q]) {
          for (var Ca = 99, Ea = 1; Ea <= 4; Ea++)
            if (q - Ea >= 0 && Qr[E - Ea] || q + Ea < b && Qr[E + Ea]) {
              Ca = Ea;
              break;
            }
          if (Ca < 99) {
            Ka(E, .2 * (1 - (Ca - 1) / 4));
          }
        }
    function Ka(r, a) {
      var t = 4 * r;
      if (0 === ha[t + 3]) {
        ha[t] = 18;
        ha[t + 1] = 22;
        ha[t + 2] = 14;
        ha[t + 3] = Math.round(255 * a);
      }
      else if (ha[t + 3] < 255) {
        ha[t + 3] = Math.min(255, ha[t + 3] + Math.round(255 * a * (1 - ha[t + 3] / 255)));
      }
      else {
        var n = 1 - .85 * a;
        ha[t] *= n;
        ha[t + 1] *= n;
        ha[t + 2] *= n;
      }
    }
    function Ba(r, a, t, n) {
      if (!(r < 0 || a < 0 || r >= b || a >= x)) {
        var e = a * b + r;
        if (!(n && !Qr[e])) {
          ga(e, t);
        }
      }
    }
    function za(r, a, t) {
      if (!(r < 0 || a < 0 || r >= b || a >= x)) {
        Ka(a * b + r, t);
      }
    }
    function Ga(r, a, t, n, e) {
      var o;
      var f;
      for (o = -t - 1; o <= t + 2; o++)
        for (f = 0; f <= 2; f++) {
          var i = o / (t + 2) * (o / (t + 2)) + f / 2.5 * (f / 2.5);
          if (i <= 1) {
            za(r + o + 1, a + n + f, .32 * (1 - i));
          }
        }
      for (f = -n; f <= n; f++)
        for (o = -t; o <= t; o++) {
          var c = o * o / (t * t) + f * f / (n * n);
          if (!(c > 1)) {
            var s = c > .62;
            var h = (o + .8 * f) / (t + n);
            var u = h < -.35 ? z.rockHi : h < .05 ? z.rockL : h < .4 ? z.rockM : z.rockD;
            if (s && (o > 0 || f > 0)) {
              u = z.rockDD;
            }
            if (c > .86) {
              u = z.crev;
            }
            if (l(r + o, a + f, e) < .08) {
              u = v(u, z.rockDD, .5);
            }
            Ba(r + o, a + f, u, !0);
          }
        }
      if (t >= 4 && l(r, a, e + 1) < .5) {
        Ba(r + 1, a - 1, z.crev, !0);
        Ba(r + 1, a, z.crev, !0);
        Ba(r + 2, a + 1, z.rockDD, !0);
      }
    }
    function Ja(r, a, t, n) {
      var e;
      var o;
      var f = [[0, 0, t], [.7 * -t, 1, .72 * t], [.75 * t, 1.5, .68 * t]];
      for (l(r, a, n) < .5 && f.push([.2 * t, .55 * -t, .66 * t]), e = -t - 3; e <= t + 3; e++)
        for (o = 0; o <= 3; o++) {
          var i = e / (t + 3) * (e / (t + 3)) + o / 3.2 * (o / 3.2);
          if (i <= 1) {
            za(r + e + 2, a + .6 * t + o, .34 * (1 - i));
          }
        }
      function c(r, a) {
        for (var t = 0; t < f.length; t++) {
          var n = r - f[t][0];
          var e = a - f[t][1];
          var o = f[t][2];
          if (n * n + e * e * 1.25 <= o * o) {
            return t + 1;
          }
        }
        return 0;
      }
      var s = Math.ceil(1.9 * t);
      for (o = -s; o <= s; o++)
        for (e = -s; e <= s; e++)
          if (c(e, o)) {
            var v = !(c(e - 1, o) && c(e + 1, o) && c(e, o - 1) && c(e, o + 1));
            var h = (e + o) / (2.2 * t);
            var u = h < -.45 ? z.grassH : h < -.05 ? z.grassL : h < .4 ? z.grass : z.grassD;
            var g = l(r + e, a + o, n + 7);
            if (g < .12) {
              u = z.grassD;
            }
            else {
              if (g > .93 && h < .2) {
                u = z.grassH;
              }
            }
            if (v) {
              u = z.grassLine;
            }
            Ba(r + e, a + o, u, !0);
          }
    }
    function Qa(r, a, t) {
      for (var n = 3 + (3 * l(r, a, t) | 0), e = 0; e < n; e++)
        for (var o = e - (n >> 1), f = 2 + (3 * l(r + e, a, t) | 0), i = 0; i < f; i++)
          Ba(r + o + (o < 0 && i > 1 ? -1 : o > 0 && i > 1 ? 1 : 0), a - i, i === f - 1 ? z.grassH : i ? z.grassL : z.grassD, !0);
    }
    for (ya = 0; ya < x; ya += 18)
      for (ba = 0; ba < b; ba += 18)
        if (Aa = l(ba, ya, 11), ka = ba + (14 * l(ba, ya, 12) | 0), pa = ya + (14 * l(ba, ya, 13) | 0), !(ka >= b || pa >= x)) {
          var Va = Qr[Da = pa * b + ka];
          if (3 === Va && Aa < .62) {
            Ga(ka, pa, 3 + (5 * l(ba, ya, 14) | 0), 2 + (3 * l(ba, ya, 15) | 0), 20);
          }
          else {
            if (1 === Va && Aa < (ua[Da] ? .05 : .12)) {
              Ga(ka, pa, 3 + (4 * l(ba, ya, 14) | 0), 2 + (2 * l(ba, ya, 15) | 0), 21);
            }
          }
        }
    for (q = 0; q < b; q += 3)
      for (C = 1; C < x - 3; C++)
        if (2 === Qr[E = C * b + q] && 2 !== Qr[E + b] && l(q, C, 31) < .16) {
          var Xa = C + 2 + (4 * l(q, C, 32) | 0);
          if (Xa < x && Qr[Xa * b + q] && 2 !== Qr[Xa * b + q]) {
            Ga(q, Xa, 1 + (3 * l(q, C, 33) | 0), 1 + (2 * l(q, C, 34) | 0), 22);
          }
        }
    if (!O) {
      for (ya = 0; ya < x; ya += 30)
        for (ba = 0; ba < b; ba += 30)
          if (ka = ba + (26 * l(ba, ya, 41) | 0), pa = ya + (26 * l(ba, ya, 42) | 0), !(ka >= b || pa >= x) && 1 === Qr[Da = pa * b + ka]) {
            for (var Ya = !1, Za = 2; Za <= 12; Za++)
              if (pa + Za < x && 2 === Qr[(pa + Za) * b + ka]) {
                Ya = !0;
                break;
              }
            var $a = (ua[Da] ? .16 : .06) + (Ya ? .34 : 0);
            if (!(l(ba, ya, 43) >= $a)) {
              for (var rt = 1 + (3 * l(ba, ya, 46) | 0), at = 0; at < rt; at++) {
                var tt = ka + (at ? (18 * l(ba + at, ya, 47) | 0) - 9 : 0);
                var nt = pa + (at ? (8 * l(ba, ya + at, 48) | 0) - 3 : 0);
                if (!(tt < 0 || nt < 0 || tt >= b || nt >= x || 1 !== Qr[nt * b + tt])) {
                  Ja(tt, nt, (at ? 3 : 5) + (5 * l(ba + at, ya + at, 44) | 0), 45 + at);
                }
              }
            }
          }
    }
    if (!O) {
      for (ya = 0; ya < x; ya += 11)
        for (ba = 0; ba < b; ba += 11)
          ka = ba + (9 * l(ba, ya, 51) | 0), pa = ya + (9 * l(ba, ya, 52) | 0), ka >= b || pa >= x || (1 === Qr[Da = pa * b + ka] || 3 === Qr[Da]) && ua[Da] && l(ba, ya, 53) < .45 && Qa(ka, pa, 54);
    }
    for (C = 0; C < x - 1; C++)
      for (q = 0; q < b; q++)
        if (1 === Qr[E = C * b + q] && ua[E] && 2 === Qr[E + b] && !(l(q, C, 61) > .34)) {
          for (var et = 1 + (4 * l(q, C, 62) | 0), ot = 1; ot <= et && !(C + ot >= x || 2 !== Qr[E + ot * b]); ot++)
            ga(E + ot * b, ot === et ? z.grassD : 1 === ot ? z.grass : z.grassL);
        }
    var ft = r.Utils.canvas(b, x);
    var it = ft.ctx.createImageData(b, x);
    it.data.set(ha);
    ft.ctx.putImageData(it, 0, 0);
    if (O) {
      (function (r, a, t, n, e, o) {
        var f;
        var i;
        var c;
        var s = [];
        for (i = 6; i < e - 6; i += 6)
          for (f = 6; f < n - 6; f += 6)
            1 === t[i * n + f] && s.push(i * n + f);
        if (s.length) {
          for (c = s.length - 1; c > 0; c--) {
            var v = l(c, o, 81) * (c + 1) | 0;
            var h = s[c];
            s[c] = s[v];
            s[v] = h;
          }
          for (var u = [], g = [110, 72, 46, 26, 0], d = 0; d < a.length; d++)
            for (var M = a[d], w = !1, m = 0; m < g.length && !w; m++)
              for (var b = g[m], y = 0; y < s.length; y++) {
                var k = s[y];
                var p = k % n;
                var D = k / n | 0;
                if (U(p, D, M)) {
                  var A = !0;
                  for (c = 0; c < u.length; c++) {
                    var x = u[c].x - p;
                    var L = u[c].y - D;
                    if (x * x + L * L < b * b) {
                      A = !1;
                      break;
                    }
                  }
                  if (A) {
                    u.push({ x: p, y: D, c: M });
                    s.splice(y, 1);
                    w = !0;
                    break;
                  }
                }
              }
          for (u.sort(function (r, a) {
            return r.y - a.y;
          }), r.imageSmoothingEnabled = !1, c = 0; c < u.length; c++) {
            var H = u[c];
            var I = H.c;
            r.drawImage(I.img, I.sx, I.sy, I.w, I.h, H.x - (I.w >> 1), H.y - I.h, I.w, I.h);
          }
        }
        function U(r, a, e) {
          if (a - e.h < 0 || r - (e.w >> 1) < 0 || r + (e.w >> 1) >= n) {
            return !1;
          }
          var o = a * n + r - (e.w >> 1);
          var f = a * n + r + (e.w >> 1);
          return !!t[a * n + r] && !!t[o] && !!t[f];
        }
      })(ft.ctx, O, Qr, b, x, f.seed || 7);
    }
    return { canvas: ft.canvas, cell: G, width: w, water: va.length ? L(va, Qr, b, x) : null };
  }
  var m = 15;
  var b = 10;
  function y(r, a, t, n, e, o) {
    if (a <= 0) {
      a = 1;
    }
    for (var f = a + 2.2 * Math.sin(.043 * r + 1.7 * n) + .9 * Math.sin(.17 * r + n), c = r / m, s = f / b, u = Math.floor(c), g = Math.floor(s), d = 9, M = 9, w = 0, y = 0, k = 0, p = -1; p <= 1; p++)
      for (var D = -1; D <= 1; D++) {
        var A = u + D;
        var x = g + p;
        var L = A + .15 + .7 * l(A, 31 * x + n, 71);
        var H = x + .15 + .7 * l(A, 31 * x + n, 72);
        var I = (c - L) * m;
        var U = (s - H) * b;
        var F = Math.sqrt(I * I + U * U * 1.3);
        if (F < d) {
          M = d;
          d = F;
          w = I;
          y = U;
          k = 7919 * A + 104729 * x + n;
        }
        else {
          if (F < M) {
            M = F;
          }
        }
      }
    var T;
    var P = M - d;
    var N = l(k, n, 73);
    var O = N < .22 ? e.rockD : N < .6 ? e.rockM : N < .9 ? e.rockL : e.rockHi;
    var j = -(.75 * w + y) / (.9 * m);
    T = P < 1.3 ? e.crev : P < 2.6 ? j > .05 ? v(O, e.rockHi, .5) : v(O, e.crev, .55) : j > .35 ? v(O, e.rockHi, .35) : j > .05 ? v(O, e.rockL, .2) : j < -.45 ? v(O, e.rockDD, .5) : j < -.15 ? v(O, e.rockD, .3) : O;
    if (l(r, 13 * a + n, 24) < .04) {
      T = v(T, e.rockDD, .6);
    }
    if (1 === a) {
      T = h(T, .5);
    }
    else {
      if (2 === a) {
        T = h(T, .68);
      }
      else {
        if (3 === a) {
          T = h(T, .85);
        }
      }
    }
    if (o && a <= 8 && P > 1.3 && i(r / 5, 9 * n + a / 3) > .15 - .05 * a) {
      T = v(T, a < 4 ? e.grassD : e.grass, .7);
    }
    var S = a / (t || 1);
    T = h(T, 1 - .38 * S * S);
    return h(T, 1 + .05 * (l(r, 7 * a + n, 11) - .5));
  }
  function k(r, a, t, n) {
    return a === t ? v(n.rockL, n.rockHi, .4) : a <= 1 ? n.crev : h(y(r + 577, t - a + 1, t, 5, n, !1), .72);
  }
  function p(r, a, t, n, e) {
    var o;
    var f = l(r, a, 1);
    n += .18 * (l(r, a, 4) - .5);
    if (t) {
      o = n > .3 ? e.grassL : n < -.32 ? e.grassD : e.grass;
      if (f < .035) {
        o = e.grassD;
      }
      else {
        if (f > .975) {
          o = e.grassH;
        }
      }
    }
    else {
      o = n > .3 ? e.dirtL : n < -.32 ? e.dirtD : e.dirt;
      if (f < .025) {
        o = e.dirtLine;
      }
      else {
        if (f > .97) {
          o = e.pebH;
        }
        else {
          if (f > .94) {
            o = e.pebL;
          }
        }
      }
    }
    return o;
  }
  function D(r, a, t, n) {
    var e = l(r, a, 7);
    var o = (t += .2 * (l(r, a, 8) - .5)) > .28 ? n.rockHi : t < -.3 ? n.rockM : n.rockL;
    if (e < .05) {
      o = n.rockD;
    }
    else {
      if (e > .96) {
        o = v(n.rockHi, n.pebH, .5);
      }
    }
    return o;
  }
  function A(r, a, t, n) {
    var e = l(r, a, 2);
    var o = (t += .2 * (l(r, a, 5) - .5)) > .28 ? n.pebL : t < -.28 ? n.pebD : n.peb;
    o = v(o, n.dirt, .4);
    if (e < .05) {
      o = n.pebLine;
    }
    else {
      if (e > .95) {
        o = n.pebH;
      }
    }
    return o;
  }
  var x = 8;
  function L(a, t, n, e) {
    var o;
    var f;
    var i;
    var c;
    var u = r.Palette.WORLD.water;
    var g = s(u.base);
    var d = s(u.d1);
    var M = s(u.d2);
    var w = s(u.d3);
    var m = [236, 250, 255];
    var b = n;
    var y = e;
    var k = 0;
    var p = 0;
    var D = [];
    for (o = 0; o < a.length; o += 4)
      if ((i = (f = a[o]) % n) < b && (b = i), i > k && (k = i), (c = f / n | 0) < y && (y = c), c > p && (p = c), 1 === a[o + 1] && c + 1 < e && !t[f + n]) {
        for (var A = 1; A <= 7 && c + A < e && !t[f + A * n]; A++)
          D.push(f + A * n, A), c + A > p && (p = c + A);
      }
    for (var L = k - b + 1, I = p - y + 1, U = [], F = 0; F < x; F++) {
      var T = r.Utils.canvas(L, I);
      var P = T.ctx.createImageData(L, I);
      var N = P.data;
      for (o = 0; o < a.length; o += 4) {
        var O;
        if (i = (f = a[o]) % n, 1 === a[o + 1]) {
          var j = a[o + 2];
          var S = a[o + 3] || 1;
          var _ = l(i, 5, 91);
          var R = j + (32 * l(i, 7, 92) | 0) - 5 * F & 31;
          O = v(M, w, .35 + .4 * _);
          if (_ < .18) {
            O = v(g, M, .5);
          }
          if (R < 4 + (4 * _ | 0)) {
            O = v(O, m, .75);
          }
          else {
            if (R > 26) {
              O = v(O, g, .35);
            }
          }
          if (j <= 2) {
            O = m;
          }
          else {
            if (j >= S - 3) {
              O = v(O, m, .6 + .1 * (j + F & 1));
            }
          }
          O = h(O, 1 - j / S * .18 * (1 - _));
        }
        else {
          var W = a[o + 2];
          var q = W + (.45 * i | 0) - 2 * F & 15;
          O = l(i, W, 93) < .5 ? g : v(g, M, .5);
          if (q < 2) {
            O = v(O, w, .65);
          }
          else {
            if (q > 12) {
              O = v(O, d, .4);
            }
          }
          if (l(i, W, 94) > .985) {
            O = m;
          }
        }
        H(N, L, f % n - b, (f / n | 0) - y, O, 255);
      }
      for (o = 0; o < D.length; o += 2) {
        var C = D[o + 1];
        var E = D[o];
        var K = Math.round(235 * (1 - (C - 1) / 7) * (.7 + .3 * l(E + 131 * F, C, 95)));
        H(N, L, E % n - b, (E / n | 0) - y, C <= 2 ? m : v(m, w, .4), K);
      }
      T.ctx.putImageData(P, 0, 0);
      U.push(T.canvas);
    }
    return { x: b, y: y, w: L, h: I, frames: U };
  }
  function H(r, a, t, n, e, o) {
    var f = 4 * (n * a + t);
    r[f] = e[0];
    r[f + 1] = e[1];
    r[f + 2] = e[2];
    r[f + 3] = o;
  }
  var I = { data: null, pal: null, sheet: null, layer: null };
  a.layerFor = function (a) {
    var t = a && a.data;
    if (!(t && t.terrace && r.Utils && r.Utils.canvas)) {
      return null;
    }
    var n = r.Palette && r.Palette.WORLD;
    var e = r.Assets && r.Assets.object ? r.Assets.object(d) : null;
    if (I.data !== t || I.pal !== n || I.sheet !== e) {
      I.data = t;
      I.pal = n;
      I.sheet = e;
      I.layer = null;
      try {
        I.layer = w(t);
      }
      catch (r) {
        console.error("[PNTT] Không dựng được núi bậc thang cho " + t.id + ":", r);
      }
    }
    return I.layer;
  };
  a.isMountain = function (r, a, t) {
    return !!r.cell[t * r.width + a];
  };
  a.draw = function (r, a, t, n, e, o) {
    var f = a.canvas;
    var i = Math.max(0, Math.floor(t));
    var c = Math.max(0, Math.floor(n));
    var l = Math.min(f.width, Math.ceil(t + e) + 1);
    var s = Math.min(f.height, Math.ceil(n + o) + 1);
    if (!(l <= i || s <= c)) {
      r.drawImage(f, i, c, l - i, s - c, i - t | 0, c - n | 0, l - i, s - c);
      var v = a.water;
      if (v && v.x < l && v.x + v.w > i && v.y < s && v.y + v.h > c) {
        var h = Math.floor(Date.now() / 85) % x;
        r.drawImage(v.frames[h], v.x - t | 0, v.y - n | 0);
      }
    }
  };
  a._bake = w;
}(window.PNTT = window.PNTT || {});
