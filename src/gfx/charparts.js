!function (S) {
  "use strict";
  var e = S.Pixel;
  var a = { HEAD_Y: 6, HEAD_H: 16, NECK_Y: 22, NECK_H: 2, TORSO_Y: 24, TORSO_H: 18, ARM_Y: 25, ARM_H: 17, LEG_Y: 42, LEG_H: 20, GROUND: 62 };
  var s = S.CharArt = { RIG: a };
  var B = { 10: { act: "seal", step: 0, bob: 0 }, 11: { act: "seal", step: 1, bob: -1 }, 12: { act: "palm", step: 0, bob: 0 }, 13: { act: "palm", step: 1, bob: -1 }, 14: { act: "gather", step: 0, bob: 0 }, 15: { act: "gather", step: 1, bob: -1 }, 16: { act: "guard", step: 0, bob: 0 }, 17: { act: "guard", step: 1, bob: 1 }, 18: { act: "cast", step: 0, bob: -1 }, 19: { act: "cast", step: 1, bob: 0 }, 20: { act: "hurt", step: 0, bob: 1 }, 21: { act: "hurt", step: 1, bob: 2 }, 22: { act: "down", step: 0, bob: 10, sit: 1 }, 23: { act: "down", step: 1, bob: 11, sit: 1 }, 24: { act: "seal", step: 0, bob: -1, leg: 1 }, 25: { act: "seal", step: 0, bob: -1, leg: -1 }, 26: { act: "seal", step: 1, bob: -1, leg: 1 }, 27: { act: "seal", step: 1, bob: -1, leg: -1 }, 28: { act: "palm", step: 0, bob: -1, leg: 1 }, 29: { act: "palm", step: 0, bob: -1, leg: -1 }, 30: { act: "palm", step: 1, bob: -1, leg: 1 }, 31: { act: "palm", step: 1, bob: -1, leg: -1 } };
  function o(S, e) {
    var a = "right" === S || "left" === S;
    var s = "female" === e.gender;
    return a ? { side: !0, back: !1, female: s, head: { x: 10, w: 13 }, neck: { x: 15, w: 3 }, torso: { x: 12, w: 8 }, legs: [{ x: 12, w: 4 }, { x: 15, w: 4 }], arms: [{ x: 12, w: 3 }, { x: 17, w: 3 }] } : { side: !1, back: "up" === S, female: s, head: { x: 9, w: 14 }, neck: { x: 14, w: 4 }, torso: { x: 11, w: 10 }, legs: [{ x: 12, w: 4 }, { x: 16, w: 4 }], arms: [{ x: 8, w: 3 }, { x: 21, w: 3 }] };
  }
  function n(S, e, s) {
    var B;
    var o;
    var n;
    var i;
    var O = a.LEG_Y + s;
    var t = a.GROUND;
    var h = 0 | e.leg;
    var r = [];
    for (B = 0; B < 2; B++)
      S.side ? (o = 0 !== h, n = S.legs[B].x + (0 === B ? 2 * -h : 2 * h)) : (o = 1 === h && 0 === B || -1 === h && 1 === B, n = S.legs[B].x + (o ? 0 === B ? -1 : 1 : 0)), i = t - (o ? 2 : 0), e.sit && (n = S.legs[B].x + (B ? 2 : -2), O = a.LEG_Y + s, i = t), r.push({ x: n, y: O, w: S.legs[B].w, h: Math.max(4, i - O), knee: e.sit ? t - 5 : Math.round((O + i) / 2), foot: i });
    return r;
  }
  function i(S, e, a, s, B, o) {
    return { diag: !0, x0: S, y0: e, x1: a, y1: s, w: B || 3, palm: !!o, x: Math.min(S, a), y: Math.min(e, s), h: Math.abs(s - e) + 1 };
  }
  function O(S) {
    S[0].front = !0;
    return S;
  }
  s.poseOf = function (S) {
    switch (S) {
      case 0:
      case 2:
      case 6: return { bob: 0, leg: 0, arm: 0, atk: 0 };
      case 1: return { bob: -1, leg: 1, arm: 1, atk: 0 };
      case 3: return { bob: -1, leg: -1, arm: -1, atk: 0 };
      case 4: return { bob: 0, leg: 0, arm: 0, atk: 1 };
      case 5: return { bob: -1, leg: 0, arm: 0, atk: 2 };
      case 32: return { bob: -1, leg: 1, arm: 0, atk: 1 };
      case 33: return { bob: -1, leg: -1, arm: 0, atk: 1 };
      case 34: return { bob: -1, leg: 1, arm: 0, atk: 2 };
      case 35: return { bob: -1, leg: -1, arm: 0, atk: 2 };
      case 7: return { bob: 1, leg: 0, arm: 0, atk: 0 };
      case 8: return { bob: 9, leg: 0, arm: 0, atk: 0, sit: 1 };
      case 9: return { bob: 10, leg: 0, arm: 0, atk: 0, sit: 1 };
      default:
        var e = B[S];
        return e ? { bob: e.bob, leg: e.leg || 0, arm: 0, atk: 0, sit: e.sit || 0, act: e.act, step: e.step } : { bob: 0, leg: 0, arm: 0, atk: 0 };
    }
  };
  s.geom = o;
  s.legRects = n;
  var t = { down: 0, left: 0, right: 1, up: 1 };
  function h(S) {
    return S ? S.diag ? { x: S.x1, y: S.y1 } : S.horiz ? { x: S.x + S.w - 1, y: S.y + 1 } : S.palm ? { x: S.x + 1, y: S.y + S.h } : { x: S.x + 1, y: S.y + S.h - 1 } : null;
  }
  s.weaponArm = function (S) {
    return 0 === t[S] ? 0 : 1;
  };
  s.handOf = h;
  s.weaponHand = function (e, a, B) {
    var n;
    var i = s.weaponArm(e);
    var O = "left" === e ? "right" : e;
    var t = {};
    for (n in a)
      Object.prototype.hasOwnProperty.call(a, n) && (t[n] = a[n]);
    t.attackArm = i;
    t.armed = !0;
    var r = h(c(O, o(O, B || {}), t, 0 | a.bob)[i]);
    if ("left" === e) {
      r = { x: (S.CONFIG && S.CONFIG.CHAR_W || 32) - 1 - r.x, y: r.y };
    }
    return r;
  };
  s.FLUTE = { LEN: 23 };
  var r = { down: { windup: { m: [15, 2], a: 116, n: 17, h: [[1, .22, 1], [0, .62, 1]] }, strike: { m: [15, -6], a: 124, n: 19, h: [[1, .22, 1], [0, .74, 1]] }, sit: { m: [25, 15], a: 180, n: 21, h: [[1, .18, 1], [0, .74, 1]] } }, right: { windup: { m: [21, 3], a: 42, n: 20, h: [[0, .2, 0], [1, .58, 1]] }, strike: { m: [22, -6], a: 56, n: 22, h: [[0, .2, 0], [1, .58, 1]] }, sit: { m: [13, 14], a: 0, n: 21, h: [[0, .2, 0], [1, .55, 1]] } }, up: { windup: { m: [16, 2], a: 66, n: 17, h: [[0, .6, 0], [1, .22, 1]] }, strike: { m: [16, -6], a: 62, n: 19, h: [[0, .6, 0], [1, .22, 1]] }, sit: { m: [25, 15], a: 180, n: 21, h: [[1, .18, 1], [0, .74, 0]] } } };
  function d(S, e, a, s) {
    var B = "left" === S;
    var o = B ? "right" : S;
    if (a.act) {
      return null;
    }
    var n = a.sit ? "sit" : 2 === a.atk ? "strike" : 1 === a.atk ? "windup" : "";
    var O = n && r[o] && r[o][n];
    if (!O) {
      return null;
    }
    var t = O.a * Math.PI / 180;
    var h = Math.cos(t);
    var d = Math.sin(t);
    function b(S) {
      return B ? 31 - S : S;
    }
    for (var l = { x: O.m[0], y: s + O.m[1] }, f = { key: n, dir: S, n: O.n, a: B ? 180 - O.a : O.a, ux: B ? -h : h, uy: d, m: { x: b(l.x), y: l.y }, b: { x: b(l.x + h * O.n), y: l.y + d * O.n }, hands: [], arms: [] }, c = 0; c < O.h.length; c++) {
      var G = O.h[c];
      var H = G[0];
      var g = Math.round(l.x + h * O.n * G[1]);
      var x = Math.round(l.y + d * O.n * G[1]);
      var D = i(b(e.arms[H].x + 1), s + 1, b(g), x, 3, !1);
      D.front = !!G[2];
      f.arms[H] = D;
      f.hands.push({ arm: H, t: G[1], x: b(g), y: x });
    }
    return f;
  }
  s.fluteRig = function (S, e, s) {
    return d(S, o("left" === S ? "right" : S, s || {}), e, a.ARM_Y + (0 | e.bob));
  };
  s.DUAL = { LEN: 59, BUTT: 22 };
  var b = { down: [-100, -80], right: [-118, -62], up: [-100, -80] };
  var l = { down: { windup: [{ x: 4, y: 2, a: -130 }, { x: 28, y: 2, a: -50 }], strike: [{ x: 20, y: 9, a: 188 }, { x: 12, y: 9, a: -8 }] }, right: { windup: [{ x: 8, y: 2, a: -142 }, { x: 11, y: 3, a: -118 }], strike: [{ x: 23, y: 9, a: 10 }, { x: 27, y: 11, a: 24 }] }, up: { windup: [{ x: 5, y: 2, a: -130 }, { x: 27, y: 2, a: -50 }], strike: [{ x: 20, y: 9, a: 188 }, { x: 12, y: 9, a: -8 }] } };
  function f(S, e, a, s) {
    var B = "left" === S;
    var o = B ? "right" : S;
    if (a.act || a.sit) {
      return null;
    }
    var n = 2 === a.atk ? "strike" : 1 === a.atk ? "windup" : "";
    var O = n && l[o] && l[o][n];
    if (!O) {
      return null;
    }
    function t(S) {
      return B ? 31 - S : S;
    }
    for (var h = { key: n, dir: S, hands: [], arms: [] }, r = 0; r < 2; r++) {
      var d = O[r];
      var b = i(t(e.arms[r].x + 1), s + 1, t(d.x), s + d.y, 3, !1);
      b.front = "strike" === n || 1 === r;
      h.arms[r] = b;
      h.hands.push({ arm: r, x: t(d.x), y: s + d.y, a: B ? 180 - d.a : d.a });
    }
    return h;
  }
  function c(S, e, s, B) {
    var o;
    var n = a.ARM_Y + B;
    var t = a.ARM_H;
    var h = 0 | s.arm;
    var r = 0 === s.attackArm ? 0 : 1;
    if (s.flute && (s.atk || s.sit) && !s.act) {
      var b = d(S, e, s, n);
      if (b) {
        return b.arms;
      }
    }
    if (s.dual && s.atk && !s.act) {
      var l = f(S, e, s, n);
      if (l) {
        return l.arms;
      }
    }
    return s.act ? function (S, e, a) {
      var s;
      var B = 0 | e.step;
      var o = S.side;
      var n = S.back;
      var t = S.arms[0].x + 1;
      var h = S.arms[1].x + 1;
      var r = S.neck.x + Math.floor(S.neck.w / 2);
      switch (e.act) {
        case "seal": return O(0 === B ? [i(t + 1, a + 1, r - 2, a + 7, 3), i(h - 1, a + 1, r + 2, a + 7, 3)] : [i(t - 2, a + 3, r - 2, a + 7, 3), i(h + 2, a + 3, r + 2, a + 7, 3)]);
        case "palm": return 0 === B ? [{ x: t, y: a + 1, w: 3, h: 10 }, { x: o ? 15 : h, y: a + 6, w: 3, h: 6 }] : o ? [{ x: t, y: a + 2, w: 3, h: 9 }, { x: 18, y: a + 4, w: 11, h: 3, horiz: !0, palm: !0 }] : n ? [{ x: t, y: a + 2, w: 3, h: 9 }, { x: h - 1, y: a - 1, w: 3, h: 8, palm: !0 }] : [{ x: t, y: a + 2, w: 3, h: 9 }, i(h, a + 2, 18, a + 9, 3, !0)];
        case "gather": return 0 === B ? O([i(t + 1, a + 2, r - 2, a + 9, 3), i(h - 1, a + 2, r + 2, a + 9, 3)]) : [i(t, a + 3, o ? 8 : 4, a + 8, 3, !0), i(h, a + 3, o ? 26 : 28, a + 8, 3, !0)];
        case "guard": return O(0 === B ? [i(t - 2, a + 8, r + 4, a - 2, 3), i(h + 2, a + 8, r - 4, a - 2, 3)] : [i(t - 1, a + 9, r + 3, a + 1, 3), i(h + 1, a + 9, r - 3, a + 1, 3)]);
        case "cast": return 0 === B ? ((s = [i(t + 1, a + 2, o ? 12 : 7, a - 21, 3), i(h - 1, a + 2, o ? 21 : 24, a - 22, 3, !0)])[0].over = s[1].over = !0, s) : [i(t + 1, a - 3, o ? 12 : 11, a + 5, 3), i(h - 1, a - 3, o ? 25 : 21, a + 6, 3, !0)];
        case "hurt": return 0 === B ? [i(t, a + 1, o ? 9 : 4, a + 5, 3), i(h, a + 1, o ? 25 : 28, a + 5, 3)] : [i(t, a + 3, o ? 10 : 5, a + 10, 3), i(h, a + 3, o ? 24 : 27, a + 10, 3)];
        default: return 0 === B ? [{ x: o ? 12 : 10, y: a + 5, w: 3, h: 7 }, { x: o ? 18 : 19, y: a + 5, w: 3, h: 7 }] : [i(o ? 13 : 11, a + 5, o ? 10 : 8, a + 11, 3, !0), i(o ? 19 : 20, a + 5, o ? 23 : 24, a + 11, 3, !0)];
      }
    }(e, s, n) : s.bow && s.atk ? function (S, e, a, s) {
      var B;
      var o;
      var n = 1 === e.atk;
      var O = s ? 0 : 1;
      if (S.side) {
        if (1 === s) {
          B = { x: n ? 22 : 24, y: a + 5 };
          o = { x: n ? 17 : 19, y: a + (n ? 4 : 7) };
        }
        else {
          B = { x: n ? 15 : 13, y: a + 5 };
          o = { x: n ? 20 : 18, y: a + (n ? 4 : 7) };
        }
      }
      else {
        if (0 === s) {
          B = { x: n ? 11 : 12, y: a + 5 };
          o = { x: n ? 20 : 18, y: a + (n ? 4 : 7) };
        }
        else {
          B = { x: n ? 20 : 19, y: a + 5 };
          o = { x: n ? 13 : 15, y: a + (n ? 4 : 7) };
        }
      }
      var t = [];
      t[s] = i(S.arms[s].x + 1, a + 1, B.x, B.y, 3);
      t[O] = i(S.arms[O].x + 1, a + 1, o.x, o.y, 3);
      t[0].front = !0;
      t[1].front = !0;
      return t;
    }(e, s, n, r) : s.armed && s.atk ? function (S, e, s, B) {
      var o;
      var n = B ? 0 : 1;
      var O = (S.side ? S.arms[1].x : S.arms[B].x) + 1;
      var t = { x: S.arms[n].x + (S.side ? n ? 1 : -1 : 0), y: s + 1, w: 3, h: a.ARM_H - 2 };
      var h = i(O, s + 1, (o = S.side ? 1 === e.atk ? { x: O - 5, y: s + 2 } : { x: O + 5, y: s + 9 } : 1 === e.atk ? { x: B ? O + 2 : O - 2, y: s - 3 } : { x: B ? O - 5 : O + 5, y: s + 12 }).x, o.y, 3);
      var r = [];
      r[B] = h;
      r[n] = t;
      if (!(S.side || 0 !== B)) {
        h.front = !0;
      }
      return r;
    }(e, s, n, r) : s.sit ? [{ x: e.side ? 12 : 9, y: n + 1, w: 3, h: 8 }, { x: e.side ? 17 : 20, y: n + 1, w: 3, h: 8 }] : (e.side ? (o = [{ x: e.arms[0].x - h, y: n, w: 3, h: t }, { x: e.arms[1].x + h, y: n, w: 3, h: t }], 1 === s.atk ? o[r] = 0 === r ? { x: e.arms[0].x + 4, y: n - 2, w: 3, h: 12 } : { x: e.arms[1].x - 4, y: n - 2, w: 3, h: 12 } : 2 === s.atk && (o[r] = 0 === r ? { x: e.arms[0].x, y: n + 5, w: 10, h: 3, horiz: !0 } : { x: e.arms[1].x, y: n + 5, w: 10, h: 3, horiz: !0 })) : (o = [{ x: e.arms[0].x, y: n - h, w: 3, h: t }, { x: e.arms[1].x, y: n + h, w: 3, h: t }], 1 === s.atk ? o[r] = 0 === r ? { x: e.arms[0].x + 1, y: n - 5, w: 3, h: 11 } : { x: e.arms[1].x - 1, y: n - 5, w: 3, h: 11 } : 2 === s.atk && (0 === r ? o[0] = { x: e.arms[0].x + 2, y: n + 6, w: 3, h: 13 } : o[1] = "up" === S ? i(e.arms[1].x + 1, n + 1, e.arms[1].x + 3, n - 8, 3) : { x: e.arms[1].x - 2, y: n + 6, w: 3, h: 13 })), o);
  }
  s.dualRig = function (S, e, s) {
    var B = "left" === S ? "right" : S;
    var n = o(B, s || {});
    var i = 0 | e.bob;
    var O = f(S, n, e, a.ARM_Y + i);
    if (O) {
      return O;
    }
    if (e.sit) {
      return { key: "sit", dir: S, hands: [], arms: [] };
    }
    var t = {};
    for (var r in e)
      Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
    t.dual = !1;
    t.armed = !1;
    for (var d = c(B, n, t, i), l = [], G = b[B] || b.down, H = 0; H < 2; H++) {
      var g = h(d[H]);
      l.push({ arm: H, x: "left" === S ? 31 - g.x : g.x, y: g.y, a: "left" === S ? 180 - G[H] : G[H] });
    }
    return { key: e.act ? "act" : "carry", dir: S, hands: l, arms: d };
  };
  s.armRects = c;
  var G = s.ART = { cloth: { line: "#213421", deep: "#344c2e", shade: "#506d3e", base: "#739650", hi: "#a5ba71" }, trim: { line: "#686b4e", deep: "#929574", shade: "#b4b894", base: "#dddfbc", hi: "#f4f0d1" }, leather: { line: "#281e19", deep: "#403023", shade: "#654731", base: "#896040", hi: "#b88b5b" }, pants: { line: "#333734", deep: "#464b46", shade: "#686d5f", base: "#8a907e", hi: "#b4b5a0" }, metal: { line: "#40484b", deep: "#606b70", shade: "#899498", base: "#bdc5bf", hi: "#ecede0" }, hat: { line: "#77532a", deep: "#a57527", shade: "#cd9b32", base: "#ebc64b", hi: "#fff090" }, crown: { line: "#11121c", deep: "#1b1c29", shade: "#2c2c3d", base: "#414155", hi: "#626071" }, face: { lid: "#3a2620", lidhi: "#5c3d31", low: "#7f8a9b", lowhi: "#a3adba", sclera: "#cfc7bd", blush: "#e7ab97", brow: "#8a5c3f", browhi: "#a9764f", irisdeep: "#191821", irishi: "#4b4859" } };
  var H = { brows: [2, 8], eyes: [2, 8], fringe: [4, 3, 5, 2, 4, 6, 3, 2, 5, 3, 4, 2, 3, 2] };
  var g = s.NOVICE = { ao_thon_lac: { cloth: { line: "#26343a", deep: "#35464a", shade: "#43545a", base: "#56666a", hi: "#788781" }, trim: { line: "#74684f", deep: "#95876a", shade: "#a4956f", base: "#b5a27c", hi: "#d1c09a" }, pants: { line: "#23282c", deep: "#34383c", shade: "#3b4142", base: "#494c4b", hi: "#656762" }, accent: { line: "#4f3b2d", deep: "#674d37", shade: "#75583e", base: "#856344", hi: "#b28a58" } }, lu_hanh_moc: { cloth: { line: "#716953", deep: "#a99d82", shade: "#b9ad91", base: "#c8bb9b", hi: "#e1d5b6" }, trim: { line: "#633128", deep: "#8a4735", shade: "#9c553e", base: "#ad6348", hi: "#d29163" }, pants: { line: "#252b23", deep: "#3e4b35", shade: "#46543d", base: "#58684a", hi: "#849169" }, accent: { line: "#2c201a", deep: "#493024", shade: "#60432f", base: "#72503a", hi: "#987052" } }, tieu_thanh: { cloth: { line: "#123b42", deep: "#17545d", shade: "#24727a", base: "#31939a", hi: "#66bec0" }, trim: { line: "#4b5966", deep: "#71808e", shade: "#a2b0ba", base: "#d2dce0", hi: "#f2f4ee" }, pants: { line: "#4a5662", deep: "#6d7b88", shade: "#9daab4", base: "#cbd5da", hi: "#eef1ec" } }, hong_ty: { cloth: { line: "#0b0d13", deep: "#12151d", shade: "#20242e", base: "#292d38", hi: "#3c424e" }, trim: { line: "#2b1b16", deep: "#4a2d20", shade: "#745039", base: "#9a6a48", hi: "#c49a6a" }, pants: { line: "#201712", deep: "#32241b", shade: "#59402d", base: "#76553a", hi: "#9b7350" } }, truc_co_chap_su: { cloth: { line: "#101827", deep: "#1b2a40", shade: "#2d4562", base: "#426486", hi: "#718faa" }, trim: { line: "#332d29", deep: "#554a40", shade: "#817365", base: "#aa9b87", hi: "#ded5c6" }, pants: { line: "#111827", deep: "#1d293b", shade: "#30445a", base: "#465f78", hi: "#71859a" } }, tho_ren: { cloth: { line: "#342117", deep: "#563722", shade: "#805735", base: "#a8794b", hi: "#d5aa72" }, trim: { line: "#4b3020", deep: "#704a2c", shade: "#9b7047", base: "#c49a67", hi: "#ead1a4" }, pants: { line: "#282923", deep: "#3c3e35", shade: "#5b5e4d", base: "#777a61", hi: "#9b9d7b" } }, su_phu: { cloth: { line: "#171522", deep: "#252334", shade: "#3b384c", base: "#514d62", hi: "#777184" }, trim: { line: "#3f3d49", deep: "#676571", shade: "#92909a", base: "#c7c4c4", hi: "#f0ece2" }, pants: { line: "#15141d", deep: "#23222f", shade: "#373644", base: "#4c4a58", hi: "#706d78" } }, bach_y: { cloth: { line: "#4b5364", deep: "#8a92a1", shade: "#bac1ca", base: "#e6e8e6", hi: "#fbfbf6" }, trim: { line: "#223a57", deep: "#35587d", shade: "#5682ab", base: "#86b0d2", hi: "#c8e1f1" }, accent: { line: "#0f192d", deep: "#1b2c4e", shade: "#294473", base: "#3b5e9b", hi: "#6a90c8" }, silver: { deep: "#97a3b3", base: "#d2dbe5", hi: "#ffffff" }, jade: { line: "#3b6a58", deep: "#68a189", base: "#b3dfc8", hi: "#effff6" }, pants: { line: "#3a4151", deep: "#576173", shade: "#7b8596", base: "#a3acb9", hi: "#cbd2db" } }, hac_y: { cloth: { line: "#07080d", deep: "#0f121d", shade: "#1a1f2f", base: "#272d41", hi: "#3d465f" }, trim: { line: "#2c323e", deep: "#4a5261", shade: "#6c7485", base: "#9199a8", hi: "#c6ccd6" }, leather: { line: "#110b09", deep: "#221713", shade: "#3a281f", base: "#56392a", hi: "#7d5a42" }, accent: { line: "#2a060a", deep: "#520c14", shade: "#7c1420", base: "#a5222d", hi: "#d64a4f" }, metal: { line: "#383e47", deep: "#5f6873", shade: "#8f99a4", base: "#c5ccd3", hi: "#f2f5f7" }, wrap: { line: "#1b1e25", deep: "#343944", shade: "#4c525e", base: "#666d7a", hi: "#9098a5" }, pants: { line: "#050608", deep: "#0c0e14", shade: "#161922", base: "#20242f", hi: "#323847" } }, lam_y: { cloth: { line: "#0d1830", deep: "#182a4e", shade: "#233f73", base: "#33589a", hi: "#5980c0" }, accent: { line: "#566072", deep: "#959fae", shade: "#c1c8d2", base: "#e8ebee", hi: "#ffffff" }, trim: { line: "#04060b", deep: "#0b0f19", shade: "#151b29", base: "#212a3d", hi: "#39465f" }, cord: { line: "#4a3410", deep: "#79591b", shade: "#a17b2d", base: "#c8a14a", hi: "#ecd185" }, pants: { line: "#121a28", deep: "#1f2c44", shade: "#324360", base: "#475c7d", hi: "#6c81a1" } }, chi_ton_kiem_y: { cloth: { line: "#0e121a", deep: "#171d27", shade: "#252d3a", base: "#343d4c", hi: "#536070" }, trim: { line: "#514330", deep: "#796344", shade: "#a38b5d", base: "#c6ad78", hi: "#eee0af" }, accent: { line: "#545f70", deep: "#8998ad", shade: "#b9c7d8", base: "#e1e8ee", hi: "#f9fcff" }, pants: { line: "#11151c", deep: "#1b2029", shade: "#2d3440", base: "#404957", hi: "#606b78" } }, thien_luan_kiem_y: { cloth: { line: "#10233a", deep: "#1d4468", shade: "#3d76a8", base: "#70a8d4", hi: "#bfe3f7" }, trim: { line: "#52340c", deep: "#8d5b16", shade: "#c28a27", base: "#e4b64b", hi: "#ffe7a0" }, accent: { line: "#526274", deep: "#8aa4bd", shade: "#bdd3e3", base: "#e6f3fb", hi: "#ffffff" }, pants: { line: "#0e1b2c", deep: "#1d3048", shade: "#34516d", base: "#5c748e", hi: "#9bb2c8" } }, tuyet_son_kiem_y: { cloth: { line: "#3b4762", deep: "#7a88a6", shade: "#aab8cf", base: "#e1e8f0", hi: "#fbfdff" }, trim: { line: "#46301a", deep: "#7a5933", shade: "#a8804d", base: "#cfa86a", hi: "#f2dca5" }, accent: { line: "#194a61", deep: "#2a83a3", shade: "#44a6c3", base: "#6ccadb", hi: "#b8eef6" }, pants: { line: "#0b0b11", deep: "#15151d", shade: "#22222c", base: "#30303c", hi: "#4b4b5c" }, red: { line: "#3b0d18", deep: "#6b1629", shade: "#931c37", base: "#bb2541", hi: "#e45262" }, pink: { line: "#6a2848", deep: "#a24d75", shade: "#c86a91", base: "#e693b1", hi: "#f9c6d7" }, armor: { line: "#0a1823", deep: "#123246", shade: "#1d506b", base: "#29728f", hi: "#4cb0cf", spark: "#aef2ff" } }, xa_toc_y: { cloth: { line: "#07180f", deep: "#0f3320", shade: "#175232", base: "#217545", hi: "#37a05f" }, trim: { line: "#5a3f08", deep: "#8d6510", shade: "#c79a25", base: "#f0c445", hi: "#ffe8a0" }, pants: { line: "#06130c", deep: "#0c2416", shade: "#12371f", base: "#1a4b2c", hi: "#286a40" } }, hau_toc_y: { cloth: { line: "#2a1607", deep: "#4f2b0e", shade: "#7a4519", base: "#a45f28", hi: "#cf8a48" }, trim: { line: "#5a2f06", deep: "#a2560f", shade: "#dd8a22", base: "#f6b640", hi: "#ffe19a" }, pants: { line: "#21120a", deep: "#3d2211", shade: "#5c3519", base: "#7d4a24", hi: "#a3683a" } }, nhim_toc_y: { cloth: { line: "#150f1d", deep: "#2c2140", shade: "#443561", base: "#5f4c85", hi: "#8570ab" }, trim: { line: "#5e5238", deep: "#8f8054", shade: "#c4b27c", base: "#eadba6", hi: "#fff6d6" }, pants: { line: "#110c18", deep: "#221a31", shade: "#352a4b", base: "#4a3c66", hi: "#66558a" } }, ta_tu_y_xanh: { cloth: { line: "#050f14", deep: "#0a1c24", shade: "#102b36", base: "#173b48", hi: "#245463" }, trim: { line: "#0a3a33", deep: "#146b5c", shade: "#1f9a82", base: "#37c7a4", hi: "#8ff0d2" }, pants: { line: "#050d11", deep: "#0a171d", shade: "#11242c", base: "#18303a", hi: "#24434f" } }, ta_tu_y: { cloth: { line: "#0d0710", deep: "#1b0d1f", shade: "#2c1530", base: "#3d1c42", hi: "#5a2b5f" }, trim: { line: "#3a0a10", deep: "#6b111c", shade: "#9c1b2a", base: "#c8283a", hi: "#ec5a62" }, pants: { line: "#0b070d", deep: "#170f1a", shade: "#241829", base: "#302136", hi: "#45324c" } }, hoang_cuu_bao_y: { cloth: { line: "#0c0b11", deep: "#17151e", shade: "#23202b", base: "#2f2b38", hi: "#4a4555" }, trim: { line: "#4a3115", deep: "#7a5424", shade: "#b28236", base: "#d9ad52", hi: "#f6db8c" }, pants: { line: "#0c0b11", deep: "#17151e", shade: "#221f29", base: "#2d2935", hi: "#433e4d" } }, sat_luc_y: { cloth: { line: "#4a3847", deep: "#7d6477", shade: "#a88f9c", base: "#d8c6b8", hi: "#efe3d3" }, trim: { line: "#3d220f", deep: "#744a1f", shade: "#b07a32", base: "#dcae55", hi: "#f5d98f", spark: "#fff3c8" }, accent: { line: "#2b0810", deep: "#56101b", shade: "#83201f", base: "#b0321f", hi: "#d9642f" }, pants: { line: "#150d15", deep: "#221620", shade: "#34222f", base: "#47303f", hi: "#62475a" }, armor: { line: "#09080c", deep: "#16131b", shade: "#252029", base: "#342e38", hi: "#4d4652", spark: "#7a7280" }, mantle: { line: "#231626", deep: "#3b2439", shade: "#5a3a55", base: "#7b5470", hi: "#9d7590", tip: "#4d5261", tiphi: "#667082" }, cape: { line: "#141017", deep: "#2a232c", shade: "#3a313b", base: "#4a3f4a", hi: "#65596a", pat: "#9a8b98" }, panel: { line: "#1f0c12", deep: "#3a1822", shade: "#4f2430", base: "#5e2f3a", pat: "#9c6f5e" }, flame: { line: "#2c2f7a", deep: "#3b4fb8", base: "#5c95ee", hi: "#a6e4fc", core: "#f0fbff" } }, tan_mo_y: { cloth: { line: "#0c0a0e", deep: "#18151b", shade: "#252028", base: "#342d37", hi: "#4d4451" }, white: { line: "#57505e", deep: "#958ea0", shade: "#c6c0ca", base: "#ebe7ec", hi: "#fbf9f7" }, trim: { line: "#4a3520", deep: "#7a5c38", shade: "#ad8a5c", base: "#d6b682", hi: "#f1ddb4" }, accent: { line: "#4f160f", deep: "#8a2b1b", shade: "#b54428", base: "#d65f37", hi: "#ef905b" }, red: { line: "#370a10", deep: "#66121b", base: "#961d27", hi: "#c43d46" }, olive: { line: "#1c2110", deep: "#2c361a", shade: "#414d26", base: "#576631", hi: "#768848" }, brown: { line: "#1a120d", deep: "#2c2018", shade: "#433225", base: "#5a4434", hi: "#7b624d" }, teal: { deep: "#1b5856", base: "#2d8c86", hi: "#69cfc0" }, pants: { line: "#0a080b", deep: "#141117", shade: "#1e1a22", base: "#28232e", hi: "#3a3442" } }, than_kiem_y: { mantle: { line: "#4a3923", deep: "#b09568", shade: "#d9c49c", base: "#efe2c4", hi: "#fdf7e6" }, trim: { line: "#4a3115", deep: "#7a5424", shade: "#b28236", base: "#d9ad52", hi: "#f6db8c", spark: "#fff4cc" }, cloth: { line: "#0c0b12", deep: "#181623", shade: "#262232", base: "#342f42", hi: "#4b4560" }, white: { line: "#5c5462", deep: "#9b93a0", shade: "#c9c1c6", base: "#e8e2e3", hi: "#fbf8f5" }, pants: { line: "#120e17", deep: "#221a2a", shade: "#34283d", base: "#463750", hi: "#5d4b69" }, jade: { line: "#123f35", deep: "#1f6b58", shade: "#2f8c72", base: "#46b08e", hi: "#9ae6c8" } }, thanh_tam_y: { cloth: { line: "#05111e", deep: "#092c47", shade: "#0d4062", base: "#11567e", hi: "#2a78a2" }, accent: { line: "#2b4a72", deep: "#6890c0", shade: "#97bde2", base: "#c2dbf0", hi: "#eaf5fd" }, trim: { line: "#4d300f", deep: "#8a5a1e", shade: "#c38b37", base: "#e8b552", hi: "#f8da8c", spark: "#fff3c8" }, sleeve: { line: "#050d21", deep: "#0b2454", shade: "#113477", base: "#194792", hi: "#2f65b2" }, navy: { line: "#03060f", deep: "#081228", shade: "#0c1c3c", base: "#12284f", hi: "#1d3b6a" }, red: { line: "#3a0a0c", deep: "#7a1a18", base: "#c2362c", hi: "#ef6a4e" }, pearl: { deep: "#9fb2c6", base: "#e4edf5", hi: "#ffffff" }, pants: { line: "#04070f", deep: "#0a1224", shade: "#101c36", base: "#172746", hi: "#25395e" } }, man_ho_tu_y: { cloth: { line: "#0a1030", deep: "#13245f", shade: "#1c3890", base: "#2a4fbf", hi: "#4d74e0" }, accent: { line: "#1c3890", deep: "#3558c9", shade: "#5579dc", base: "#7d9bef", hi: "#b9cafb" }, trim: { line: "#3f2f14", deep: "#6e5424", shade: "#9c7c3c", base: "#c8a55c", hi: "#eed9a0", spark: "#fff6dc" }, belt: { line: "#26241a", deep: "#454230", shade: "#646046", base: "#878260", hi: "#b5b08a" }, pants: { line: "#07080f", deep: "#11131f", shade: "#1f2233", base: "#2e3246", hi: "#4b5068" } }, hoat_tu_y: { cloth: { line: "#10101a", deep: "#191a27", shade: "#272837", base: "#393849", hi: "#535063" }, trim: { line: "#4d1028", deep: "#800f30", shade: "#aa1238", base: "#d51b42", hi: "#ff5364" }, accent: { line: "#686175", deep: "#958ba3", shade: "#bdb4ca", base: "#e8e4ed", hi: "#fff9ff" }, pants: { line: "#11111c", deep: "#1a1927", shade: "#292638", base: "#3b354b", hi: "#5b5068" } }, nam_tu_y: { cloth: { line: "#240d20", deep: "#570c25", shade: "#881027", base: "#b9162c", hi: "#e83b3e" }, trim: { line: "#663017", deep: "#a65316", shade: "#d78318", base: "#f6b72e", hi: "#fff0a0" }, accent: { line: "#424453", deep: "#777e96", shade: "#b9c1d4", base: "#eef0f5", hi: "#ffffff" }, pants: { line: "#15131f", deep: "#211e2d", shade: "#322b3d", base: "#463849", hi: "#685164" } }, vuong_lam_y: { cloth: { line: "#101017", deep: "#1b1b25", shade: "#2b2935", base: "#3b3743", hi: "#57515e" }, trim: { line: "#41404f", deep: "#686775", shade: "#9b99a8", base: "#cfced9", hi: "#f5f2fa" }, accent: { line: "#350d19", deep: "#541421", shade: "#7d2030", base: "#aa3040", hi: "#d05a62" }, pants: { line: "#101018", deep: "#191a24", shade: "#292a35", base: "#3a3b47", hi: "#5b5a68" } }, huyen_cot_y: { cloth: { line: "#102a46", deep: "#174c78", shade: "#206fa6", base: "#298fd0", hi: "#6bc5ee", spark: "#a8e2f7" }, trim: { line: "#374955", deep: "#617d8e", shade: "#88bacd", base: "#b2e1ed", hi: "#e2eeee" }, pants: { line: "#0b1221", deep: "#132035", shade: "#1b2e48", base: "#2a4161", hi: "#48627f" }, bone: { line: "#3c4650", deep: "#6c7a86", shade: "#8e9ca6", base: "#aebfc8", hi: "#e2eeee" }, ink: { line: "#070d17", deep: "#0b1422", shade: "#101b2b", base: "#101b2b", hi: "#1b2b42" } }, tong_ngoc_y: { cloth: { line: "#293f50", deep: "#34586e", shade: "#5e8b9f", base: "#91bcc8", hi: "#c3dce0" }, trim: { line: "#3a5267", deep: "#718b9e", shade: "#aebfcd", base: "#dce9ed", hi: "#f2f4ee" }, pants: { line: "#243d50", deep: "#2d566e", shade: "#49768c", base: "#80acbb", hi: "#bed4dd" } }, lan_thanh_y: { cloth: { line: "#0d3a40", deep: "#1f7a78", shade: "#3aa59d", base: "#66c6ba", hi: "#a6e6d6" }, skirt: { line: "#062a2e", deep: "#0b4c4f", shade: "#13706e", base: "#1f918a", hi: "#42bab0" }, trim: { line: "#3a464e", deep: "#6b7a84", shade: "#98a7b0", base: "#c3cfd4", hi: "#f2f7f7" }, cream: { line: "#8a8672", deep: "#bdb8a0", shade: "#d8d3bb", base: "#f0ecd8", hi: "#fffdf0" }, accent: { line: "#3a1408", deep: "#6e2c14", shade: "#a54c24", base: "#c8683a", hi: "#ea965e" }, inner: { line: "#0d090b", deep: "#1a1316", shade: "#2b2126", base: "#3c3036", hi: "#5a4a50" }, gold: { line: "#5a3f10", deep: "#8a6420", shade: "#b88a30", base: "#dcb24e", hi: "#fbe48c" }, jade: { line: "#0a4a3a", deep: "#108a6a", shade: "#18ad88", base: "#25c9a0", hi: "#7ff0cf" }, eye: { line: "#8a4a2a", deep: "#b86a3a", shade: "#d88650", base: "#e8a066", hi: "#f6c690" }, pants: { line: "#0c0809", deep: "#17100f", shade: "#271d1e", base: "#3b2d2c", hi: "#5f4c4a" } }, huyet_anh_y: { cloth: { line: "#1c050a", deep: "#3b0913", shade: "#62101d", base: "#8c1a2a", hi: "#c23844" }, trim: { line: "#060508", deep: "#0e0b11", shade: "#19141d", base: "#252029", hi: "#3c3343" }, accent: { line: "#3a0610", deep: "#6d0c19", shade: "#a3162a", base: "#d8303f", hi: "#ff6f6a" }, ash: { line: "#2e282c", deep: "#5d5057", base: "#8f8088", hi: "#c9babf" }, pants: { line: "#0b070b", deep: "#160f15", shade: "#231820", base: "#32222e", hi: "#493343" } }, tu_quang_y: { cloth: { line: "#1b0e2c", deep: "#2d1a4b", shade: "#482c73", base: "#6843a1", hi: "#9871d4" }, trim: { line: "#3b285c", deep: "#6a4e93", shade: "#9477c1", base: "#bda4e3", hi: "#e9dffb" }, accent: { line: "#584a6e", deep: "#9a8db0", shade: "#c6bcd9", base: "#ebe5f4", hi: "#ffffff" }, paper: { line: "#6a4712", deep: "#a57826", shade: "#c99c3a", base: "#e6c65c", hi: "#f8e8a4", ink: "#a8261f" }, glow: { deep: "#8e52e0", base: "#c08cff", hi: "#f0e0ff" }, pants: { line: "#130b1e", deep: "#221631", shade: "#352549", base: "#4a3862", hi: "#6b5788" } }, thanh_lam_dao_bao: { cloth: { line: "#061827", deep: "#0b2d43", shade: "#124b66", base: "#176a88", hi: "#2d91ad", spark: "#63bfd3" }, trim: { line: "#6c4b16", deep: "#9a6e20", shade: "#c4932e", base: "#dfb64b", hi: "#f7dc82", spark: "#fff6d0" }, pants: { line: "#36444d", deep: "#637781", shade: "#91a7ae", base: "#dbe4e6", hi: "#f9fbf8" }, band: { line: "#030a12", deep: "#081a2a", shade: "#0e2a40", base: "#153955", hi: "#22506f" }, sash: { line: "#0a1636", deep: "#14275a", shade: "#1f3d82", base: "#2d56a8", hi: "#4c7fd0" }, jade: { deep: "#2a7d63", base: "#53bf95", hi: "#a6ecc9" }, red: { deep: "#6e1a1a", base: "#b8352c", hi: "#ea6a52" } }, bach_nguyet_hong_lien: { cloth: { line: "#3b3c47", deep: "#686a78", shade: "#a4a7b2", base: "#d6d7dc", hi: "#fffdf6" }, trim: { line: "#5a1725", deep: "#811f31", shade: "#b02d3b", base: "#d83c4d", hi: "#ff8a80" }, pants: { line: "#3d3d48", deep: "#70717c", shade: "#a8aab2", base: "#e1e1e3", hi: "#fffef8" } }, van_lo_lao_ma_bao: { cloth: { line: "#40352b", deep: "#827465", shade: "#b9aa91", base: "#e5dbc6", hi: "#fff5df" }, trim: { line: "#4a1826", deep: "#6b2033", shade: "#913346", base: "#b34b57", hi: "#e48a78" }, pants: { line: "#211e20", deep: "#302c31", shade: "#49414a", base: "#625762", hi: "#97877f" }, accent: { line: "#5b3a18", deep: "#8a5d1d", shade: "#b27b27", base: "#d2a04a", hi: "#ffe09a" } }, man_ho_tu_bao: { cloth: { line: "#081126", deep: "#102247", shade: "#183b72", base: "#2854ad", hi: "#6d91e4", spark: "#a7bff2" }, trim: { line: "#493015", deep: "#7a4b16", shade: "#ae7420", base: "#d49b35", hi: "#ffe08a", spark: "#fff6dc" }, pants: { line: "#090d16", deep: "#131a29", shade: "#242e43", base: "#37465d", hi: "#61738c" }, accent: { line: "#21170d", deep: "#5a3813", shade: "#95621b", base: "#c79237", hi: "#f7d477" } }, ma_vuong_bao: { cloth: { line: "#0d0916", deep: "#1a1028", shade: "#2b1748", base: "#4a2475", hi: "#7647a9" }, trim: { line: "#4b2d0c", deep: "#815016", shade: "#b7751f", base: "#dda63a", hi: "#ffe58a" }, pants: { line: "#08070e", deep: "#15101f", shade: "#261832", base: "#382347", hi: "#62436e" }, accent: { line: "#230b37", deep: "#431260", shade: "#6f2395", base: "#9e3fc5", hi: "#d66cf5", spark: "#f6c8ff" }, metal: { line: "#0c0a12", deep: "#2a2638", shade: "#4a4560", base: "#6e6888", hi: "#b4aecb" } }, xich_ma_y: { rock: { line: "#0b0911", deep: "#1a1722", shade: "#2b2735", base: "#413b50", hi: "#6a6283", spark: "#9a92b4" }, lava: { line: "#6a1404", deep: "#b8300c", shade: "#e04e10", base: "#ff7a1c", hi: "#ffbf55", spark: "#fff1b0" }, cloth: { line: "#10030a", deep: "#2a0a15", shade: "#4a1224", base: "#6e1d33", hi: "#9a3149" }, bone: { line: "#2b2218", deep: "#6e604b", shade: "#aa9c82", base: "#e8dfc7", hi: "#fffaea" }, metal: { line: "#161922", deep: "#454b5c", shade: "#7c8497", base: "#bcc5d6", hi: "#f4f8ff" } }, dai_phu_bao: { cloth: { line: "#58606c", deep: "#9aa2ab", shade: "#c8ced3", base: "#eceeec", hi: "#ffffff" }, trim: { line: "#0b0f1a", deep: "#141b2d", shade: "#222c44", base: "#303c58", hi: "#4a5a7c" }, pants: { line: "#1a1f2a", deep: "#2c3340", shade: "#444c5a", base: "#5d6573", hi: "#8a93a0" }, accent: { line: "#5b3f12", deep: "#8a6420", shade: "#b88b32", base: "#d9ad4f", hi: "#f6dc8e" } }, bach_kim_an_dien_bao: { cloth: { line: "#403b42", deep: "#77727a", shade: "#aaa7a5", base: "#e5e1da", hi: "#fffaf0", mid: "#cbc6c4" }, trim: { line: "#6b4718", deep: "#9b6a1e", shade: "#c99a3a", base: "#e0b957", hi: "#fff0a3" }, pants: { line: "#433d3a", deep: "#615850", shade: "#897b6d", base: "#b4a38e", hi: "#e1d3bc" }, accent: { line: "#2e1219", deep: "#5e1a25", shade: "#8c2931", base: "#ac3a35", hi: "#e8745e" } }, nam_y_bao: { cloth: { line: "#210812", deep: "#3b0b18", shade: "#6f1325", base: "#9d1f32", hi: "#d94a50" }, trim: { line: "#6f3d0c", deep: "#a66a17", shade: "#c88b26", base: "#e3ae42", hi: "#ffe39a" }, pants: { line: "#111018", deep: "#1c1a24", shade: "#302a38", base: "#473b4a", hi: "#756379" }, accent: { line: "#42101b", deep: "#721629", shade: "#a32635", base: "#d13d46", hi: "#ff7b68" } }, tho_ren_moi: { cloth: { line: "#1c1512", deep: "#2e2420", shade: "#463a33", base: "#62524a", hi: "#85746a" }, trim: { line: "#5a1c08", deep: "#9a3a10", shade: "#d1621c", base: "#f08a2c", hi: "#ffd070" }, accent: { line: "#2a1a10", deep: "#47291a", shade: "#6e4529", base: "#93602f", hi: "#bf8a50" }, pants: { line: "#14141a", deep: "#232329", shade: "#383840", base: "#4f4f58", hi: "#74747e" } }, tang_kinh_bao: { cloth: { line: "#0e2a3a", deep: "#154458", shade: "#1d5f78", base: "#2a7d98", hi: "#4aa3b8" }, trim: { line: "#6b4a12", deep: "#a97620", shade: "#c08e2c", base: "#d9a83b", hi: "#ffe18a" }, pants: { line: "#0e2a3a", deep: "#154458", shade: "#1d5f78", base: "#2a7d98", hi: "#4aa3b8" } }, huan_su_bao: { cloth: { line: "#3d0b0e", deep: "#7a1519", shade: "#b2272a", base: "#dd3b35", hi: "#f77a68" }, trim: { line: "#6b4a3a", deep: "#b79c8b", shade: "#d9c0b5", base: "#f2dcd4", hi: "#fff4ee" }, accent: { line: "#4a2d0b", deep: "#805016", shade: "#b57b22", base: "#d7a23b", hi: "#ffe08a" }, pants: { line: "#0d0d12", deep: "#1a1a22", shade: "#2c2c38", base: "#40404f", hi: "#62627a" } }, npc_long_bao: { cloth: { line: "#071226", deep: "#0d2144", shade: "#173c78", base: "#234f9d", hi: "#3c73c6" }, trim: { line: "#4a2d0b", deep: "#805016", shade: "#b57b22", base: "#d7a23b", hi: "#ffe08a" }, pants: { line: "#080d19", deep: "#111b31", shade: "#1d2b49", base: "#2b3d63", hi: "#4b6592" }, accent: { line: "#17233c", deep: "#243c69", shade: "#355b9f", base: "#4b7ac7", hi: "#82b2f2" } } };
  var x = s.EYES = { brown: { name: "Nâu trà", iris: "#71513e", deep: "#352a2b", hi: "#ac8155" }, blue: { name: "Lam ngọc", iris: "#416c8e", deep: "#26344b", hi: "#80bdce" }, green: { name: "Bích ngọc", iris: "#477766", deep: "#293b39", hi: "#9cbe85" }, kim_dong: { name: "Kim Đồng", note: "Đồng tử vàng kim của người luyện thể, thần thú huyết mạch.", iris: "#d39a2c", deep: "#6e4210", hi: "#ffe08a" }, huyet_dong: { name: "Huyết Đồng", note: "Mắt đỏ máu của ma tu, sát khí lộ ra nơi đáy mắt.", iris: "#b52630", deep: "#4b0a13", hi: "#ff7a6a" }, tu_dong: { name: "Tử Đồng", note: "Đồng tử tím huyền, người tu huyễn thuật và tinh tượng.", iris: "#7b4fc2", deep: "#33195c", hi: "#cfa6ff" }, bang_dong: { name: "Băng Đồng", note: "Mắt lam băng nhạt, hàn khí của người tu băng đạo.", iris: "#7fcbe6", deep: "#2c6a8c", hi: "#eafcff" }, yeu_dong: { name: "Yêu Đồng", note: "Tròng vàng lục, đồng tử dọc như yêu thú.", iris: "#c9b23c", deep: "#5d5214", hi: "#f4e88a", slit: "#140f0a" }, nhat_nguyet: { name: "Nhật Nguyệt Đồng", note: "Mắt trái kim nhật, mắt phải ngân nguyệt — âm dương song đồng.", iris: "#d39a2c", deep: "#6e4210", hi: "#ffe08a", pair: [{ iris: "#d39a2c", deep: "#6e4210", hi: "#ffe08a" }, { iris: "#9fb6d8", deep: "#3d5276", hi: "#f1f6ff" }] }, xich_ma: { name: "Xích Ma", note: "Mắt cam rực của ma thần.", iris: "#ff6a22", deep: "#a82a08", hi: "#ffc060", slit: "#fff0b0" }, kim_cuong: { name: "Kim Cương", note: "Mắt kim quang của thân thể cường hoá.", iris: "#fff2a8", deep: "#d99a1c", hi: "#ffffff", glow: { core: "#ffffff", mid: "#fff6c4", rim: "#ffd24a", halo: "#ffd860", far: "#e6a830" } } };
  var D = s.SHOES = { ink: { line: "#171d29", deep: "#263142", shade: "#3f5060", base: "#627586", hi: "#99a7b0" }, cloth: { line: "#454548", deep: "#646362", shade: "#93908a", base: "#bfbbad", hi: "#e5dfc9" } };
  var W = "undefined" != typeof WeakMap ? new WeakMap : null;
  function J(e, s, B) {
    var i = o(e, B);
    var O = 0 | s.bob;
    var t = g[B.outfit] || G;
    if (B.kimHoa && S.Palette && S.Palette.mixHex) {
      t = function (e) {
        var a = W && W.get(e);
        if (a) {
          return a;
        }
        var s;
        var B;
        var o;
        var n = S.Palette.mixHex;
        var i = {};
        for (s in e)
          (B = e[s]) && "object" == typeof B && B.base && B.hi ? (o = "trim" === s || "accent" === s || "metal" === s || "leather" === s, i[s] = { line: B.line, deep: B.deep, shade: o ? n(B.shade, "#b88418", .45) : B.shade, base: n(B.base, "#e0b03a", o ? .55 : .06), hi: n(B.hi, "#fff0a0", o ? .7 : .4) }) : i[s] = B;
        if (W) {
          W.set(e, i);
        }
        return i;
      }(t);
    }
    return { g: i, p: s, cfg: B, dir: e, dy: O, material: t, head: { x: i.head.x, y: a.HEAD_Y + O, w: i.head.w, h: a.HEAD_H }, neck: { x: i.neck.x, y: a.NECK_Y + O, w: i.neck.w }, torso: { x: i.torso.x, y: a.TORSO_Y + O, w: i.torso.w, h: a.TORSO_H }, arms: c(e, i, s, O), legs: n(i, s, O) };
  }
  function u(S, a, s) {
    var B;
    var o;
    var n;
    var i;
    var O;
    var t = 1 / 0;
    var h = -1 / 0;
    for (B = 0; B < a.length; B++)
      t = Math.min(t, a[B][1]), h = Math.max(h, a[B][1]);
    for (n = Math.ceil(t); n <= Math.floor(h); n++) {
      for (i = [], B = 0, o = a.length - 1; B < a.length; o = B++) {
        var r = a[o];
        var d = a[B];
        if ((r[1] <= n && d[1] > n || d[1] <= n && r[1] > n)) {
          i.push(r[0] + (n - r[1]) * (d[0] - r[0]) / (d[1] - r[1]));
        }
      }
      for (i.sort(function (S, e) {
        return S - e;
      }), B = 0; B + 1 < i.length; B += 2)
        O = Math.ceil(i[B]), e.r(S, O, n, Math.floor(i[B + 1]) - O + 1, 1, s);
    }
  }
  function M(S, a, s, B, o, n) {
    e.r(S, a, s, B, o, n.base);
    e.r(S, a, s, 1, o, n.line);
    e.r(S, a + 1, s + 1, 1, o - 2, n.shade);
    e.r(S, a + 2, s, B - 3, 1, n.hi);
    e.r(S, a + B - 1, s + 1, 1, o - 2, n.hi);
    e.r(S, a, s + o - 1, B, 1, n.deep || n.shade);
  }
  function w(S) {
    return S.diag ? { x: S.x0, y: S.y0 } : { x: S.x + 1, y: S.y + 1 };
  }
  function N(S, a, s, B, o) {
    e.fatLine(S, a.x, a.y, s.x, s.y, 3, o ? B.shade : B.base);
    e.line(S, a.x - 1, a.y, s.x - 1, s.y, B.deep);
    e.line(S, a.x + 1, a.y, s.x + 1, s.y, o ? B.base : B.hi);
  }
  function p(S, a, s, B) {
    var o = w(a);
    var n = h(a);
    if (a.bent) {
      var i = { x: a.jx, y: a.jy };
      N(S, o, i, s, B);
      N(S, i, n, s, B);
      e.blk(S, i.x - 1, i.y - 1, 3, 3, B ? s.shade : s.base, s.deep);
    }
    else {
      N(S, o, n, s, B);
    }
    !function (S, a, s, B) {
      var o = h(a);
      var n = a.palm ? 4 : 3;
      M(S, o.x - 1, o.y - 1, n, 3, s);
      e.dot(S, o.x - 1, o.y + 1, B ? s.deep : s.shade);
    }(S, a, s, B);
  }
  function k(S, e, a) {
    for (var s = ["line", "deep", "shade", "base", "hi", "spark"], B = 0; B < e.length; B++) {
      var o = e.charAt(B);
      if ("." !== o && a[s[B]]) {
        S[o] = a[s[B]];
      }
    }
    return S;
  }
  function m(e, a) {
    var s = S.Palette.pick("SKIN", a.cfg.skin, "light");
    e[1] = s.line;
    e[2] = s.deep;
    e[3] = s.shade;
    e[4] = s.base;
    e[5] = s.hi;
    return e;
  }
  function v(S, a, s, B) {
    var o = un(a, s);
    var n = o.far;
    var i = o.Q;
    var O = B.C;
    var t = B.B;
    var h = B.T;
    var r = B.W;
    var d = Math.max(7, o.len);
    var b = d + 2.2;
    var l = B.ko || 7.6;
    var f = Math.max(3, d - (null == B.up ? 3.6 : B.up));
    function c(S) {
      return [Math.round(S[0]), Math.round(S[1])];
    }
    function G(a, s, B, o, n) {
      var O = c(i(a, s));
      var t = c(i(B, o));
      e.line(S, O[0], O[1], t[0], t[1], n);
    }
    function H(a, s, B) {
      var o = c(i(a, s));
      e.dot(S, o[0], o[1], B);
    }
    u(S, [i(-1, -2.6), i(d - 1.5, -2.9), i(d - .6, -1.6), i(d - .6, 1.4), i(b, 2.2), i(b - .6, 3.8), i(f, l), i(f - 1.4, l), i(.35 * d, .58 * l), i(-1, 2.9)], O.line);
    u(S, [i(0, -1.6), i(d - 2.2, -2), i(d - 1.5, -.8), i(d - 1.4, 1.6), i(b - 1.6, 2.4), i(f - .6, l - 1.2), i(f - 1.6, l - 1), i(.35 * d, .58 * l - 1), i(0, 1.9)], n ? O.shade : O.base);
    if (!1 !== B.fold) {
      G(0, 1.2, .35 * d, .58 * l - 1.2, n ? O.base : O.hi);
      G(.4 * d, .58 * l - .6, f - 1.6, l - 1.4, n ? O.base : O.hi);
      G(1.5, -.6, d - 2.6, 0, n ? O.deep : O.shade);
      G(2, 1.4, d - 1.8, .5 * l, n ? O.deep : O.shade);
      G(1, -1.4, d - 2.4, -1.8, n ? O.shade : O.deep);
      if (O.spark && !n) {
        H(1, .4, O.spark);
        H(.4 * d, .58 * l - .9, O.spark);
      }
    }
    if (t) {
      G(b - .4, 2.4, f + .5, l - .4, n ? t.deep : t.base);
      if (2 === B.band) {
        G(b - 1.1, 2.1, f - .3, l - .9, n ? t.line : t.deep);
      }
    }
    if (h) {
      G(b - (2 === B.band ? 1.9 : 1.2), 2, f - (2 === B.band ? 1.1 : .4), l - (2 === B.band ? 1.5 : .8), n ? h.shade : h.base);
    }
    if (h && !n) {
      H(f - .2, l - .5, h.hi);
    }
    if (r) {
      G(d - 1.2, -1.4, d - 1.2, 1.2, n ? r.shade : r.base);
    }
    if (r && !n) {
      H(d - 1.2, -1.4, r.hi);
    }
    return { Q: i, L: d, lo: b, ko: l, b: f, far: n, ln: G, dt: H };
  }
  function y(S, a, s, B) {
    var o = un(a, s);
    var n = o.far;
    var i = o.Q;
    var O = B.C;
    var t = B.B;
    var h = B.T;
    var r = Math.max(5, o.len);
    var d = r - .6;
    var b = Math.max(2.4, .5 * r);
    function l(S) {
      return [Math.round(S[0]), Math.round(S[1])];
    }
    function f(a, s, B, o, n) {
      var O = l(i(a, s));
      var t = l(i(B, o));
      e.line(S, O[0], O[1], t[0], t[1], n);
    }
    u(S, [i(-1, -2.6), i(d, -2.2), i(d, 2.4), i(.45 * r, 3.3), i(-1, 2.9)], O.line);
    u(S, [i(0, -1.7), i(d - .8, -1.3), i(d - .8, 1.5), i(.45 * r, 2.4), i(0, 2)], n ? O.shade : O.base);
    f(0, -.7, b - 1, -.5, n ? O.base : O.hi);
    f(.5, 1.2, b - 1, 1.4, n ? O.deep : O.shade);
    if (t) {
      u(S, [i(b, -2.2), i(d, -2.2), i(d, 2.3), i(b, 2.5)], t.line);
      u(S, [i(b + .7, -1.4), i(d - .7, -1.4), i(d - .7, 1.5), i(b + .7, 1.7)], n ? t.shade : t.base);
      f(b + .7, -.9, d - .9, -.9, n ? t.base : t.hi);
      if (h) {
        f(b, -1.8, b, 2.1, n ? h.deep : h.base);
        f(d - .2, -1.8, d - .2, 2, n ? h.deep : h.shade);
      }
    }
  }
  s.rigPose = J;
  s.drawHandBlock = function (S, a, s, B, o) {
    M(S, a - 1, s - 1, 3, 3, B);
    e.dot(S, a - 1, s + 1, o ? B.deep : B.shade);
  };
  var L = ["...KE....EK...", ".xjJKE..EKJjx.", "xjiiJKEEKJJjXx", "xjiJJjEKiJJjXx", "xjJJjEKiJJJjXx", "xjJjEKiJJJJjXx", "xjjEKiJJJJJjXx", "xjEKiJJJJJjjXx", "xEKiJJJJJJjJXx", "xKiJJJJJJjJJXx", "xKJJJiJJjJJjXx", "xKjJiJJjJJiJXx", "xKJjJiJjJiJjXx", "xKjJjJjJjJjJXx", "zZUwUnGGnUwUZz", "zuUUUGYyGUUUuz", "zZuuunggnuuuZz"];
  var C = ["..xjiJJKKJJjXx..", "..xjiJKqcKJjXx..", "..xjiJKqcKJjXx..", "..xjiJKqcKJjXx..", "..xjiJKqcKJjXx..", "..xjiJKqcKJjXx..", "..xjiJKqcKJjXx..", "..xjiJKqcKJjXx..", ".xjJiJKceKJJjXx.", ".xjJijKceKJjJXx.", ".xjiJjKceKJjJXx.", ".xjiJjKceKJJjXx.", ".xjJiJKceKJJjXx.", "xjJiJJKceKJJJjXx", "xjllJJKceKJJllXx", "xlJilJKceKJlJilx", "xjlljJKceKJjlljx", "NgGGYGKceKGYGGgN", "kmMMvMKqeKMvMMmk", ".kkkkkkQQkkkkkk."];
  var j = ["zUw", "zUw", "zuU", "zUw", "zuU", ".zU", ".nG", ".GY", ".RH", ".rR", ".Rr", "..r"];
  var A = ["n", "G", "U", "u", "a", "A", "h", "a", "R", "r", "R", "r"];
  var Q = [".....xjiJJKKJJjXx.....", "....xjiJJKceKJJjXx....", "...xjiJJJKceKJJJjXx...", "..xjiJJiJKceKJJJjjXx..", ".xjiJJJiJKceKJiJJjjXx.", "xjiJJJJiJKceKJJiJJjjXx", "xjJiJJJJJKceKJJJiJjjXx", "xjllJJJJJKceKJJJJllJXx", "xlJilJJJJKceKJJJlJilXx", "xjlljJJJJKceKJJJjllJjx", "NgGGYGGGGKceKGGGGYGGgN", "kmMMvMMMMKqeKMMMMvMMmk", ".kkkkkkkkkQQkkkkkkkkk."];
  var _ = [".....xjiJJjJJJjXx.....", "....xjiJJJjJJJJjXx....", "...xjiJJJJjJJJJJjXx...", "..xjiJJiJJjJJJJJjjXx..", ".xjiJJJiJJjJJJiJJjjXx.", "xjiJJJJiJJjJJJJiJJjjXx", "xjJiJJJJJJjJJJJJiJjjXx", "xjllJJJJJJjJJJJJJllJXx", "xlJilJJJJJjJJJJJlJilXx", "xjlljJJJJJjJJJJJjllJjx", "NgGGYGGGGGgGGGGGGYGGgN", "kmMMvMMMMMmMMMMMMvMMmk", ".kkkkkkkkkkkkkkkkkkkk."];
  var Y = ["...xjiJJJJJKc.....", "..xjiJJJJJJKc.....", "..xjiJJJJJJJKc....", ".xjiJJJJJJJJJKc...", ".xjiJJJJJiJJJJKc..", "xjiJJJJJJJiJJJJKc.", "xjJiJJJJJJJiJJJJKc", "xjJJiJJJJJJJJJJjKc", "xjllJJJJJJJJJllJKc", "xlJilJJJJJJJlJilKc", "NgGGYGGGGGGGGYGgKq", "kmMMvMMMMMMMMvMmKq", ".kkkkkkkkkkkkkkkkQ"];
  var E = ["...KEEEEEEK...", ".xjKKmMMmKKjx.", "xjiJJJJJJJJjXx", "xjiiJJJJJiJjXx", "xjiJjJJJjJJjXx", "xjJJJjJjJJJjXx", "xjiJJJJJJJJjXx", "xjiJJJJJJJJjXx", "xjiJJJJJJJJjXx", "xjiJJJJJJJJjXx", "xjiJJJJJJJJjXx", "xjiJJJjJJJJjXx", "xjJiJJjJJiJjXx", "xjjJjJjJjJjJXx", "zZUwUUUUUUwUZz", "zuUUUUUUUUUUuz", "zZuuuuuuuuuuZz"];
  var q = ["..nGGn..", ".GEEkkg.", "GEEkkkkn", "GEEkEkkn", "GEEEkkkn", "GEkEEkkn", ".gEEkkn.", "..nnnn.."];
  var K = ["..xjiJJjJJJjXx..", "..xjiJJjJJJjXx..", "..xjiJJjJJJjXx..", "..xjiJJjJJJjXx..", "..xjiJJjJJJjXx..", "..xjiJJjJJJjXx..", "..xjiJJjJJJjXx..", "..xjiJJjJJJjXx..", ".xjJiJJjJJJJjXx.", ".xjiJjJjJiJJjXx.", ".xjiJjJjJiJjJXx.", ".xjJiJJjJJiJjXx.", ".xjJiJJjJJJJjXx.", "xjJiJJJjJJJJJjXx", "xjllJJJjJJJJllXx", "xlJilJJjJJJlJilx", "xjlljJJjJJJjlljx", "NgGGYGGgGGYGGgGN", "kmMMvMMmMMvMMvmk", ".kkkkkkkkkkkkkk."];
  var U = ["....KE..EK..", "...xKEEEKJx.", "..xjiKKKJJix", "..xjiJJJKJix", "..xjiJJJJKJx", "..xjJiJJJKJx", "..xjJiJJJJKx", "..xjJiJJJJJx", "..xjiJJJJJJx", "..xjiJJJJjJx", "..xjiJJJjJJx", "..xjJiJjJJJx", "..xjjJjJJiJx", "..xjJjJjJjJx", "..zZUwUUnGGn", "..zuUUUUGYyG", "..zZuuuunggn"];
  var X = ["..xjiJJJJJJKq.", "..xjiJJJJJJKc.", "..xjiJJJJJJKc.", "..xjiJJJJJJKc.", "..xjiJJJJJJKc.", "..xjiJJJJJJKc.", "..xjiJJJJJJKc.", "..xjiJJJJJJKc.", ".xjJiJJJJJJKc.", ".xjJijJJJJJKc.", ".xjiJjJJiJJKc.", ".xjiJJjJiJJKc.", ".xjJiJJjJJJKc.", "xjJiJJJJJJJKc.", "xjllJJJJJllKc.", "xlJilJJJlJiKc.", "xjlljJJJjllKc.", "NgGGYGGGGYGKq.", "kmMMvMMMMvmKq.", ".kkkkkkkkkkkQ."];
  function R(S, e) {
    return S.p.sit ? 57 : Math.min(57, e.foot - 4);
  }
  function z(S, e, a) {
    var s = e.material;
    var B = s.cloth.spark;
    var o = s.cloth.hi;
    var n = v(S, e, a, { C: s.cloth, B: s.band, T: s.trim, W: s.pants, band: 2, ko: 7.2, up: 3.4 });
    if (!(n.far)) {
      n.dt(n.b - 2.2, n.ko - 3.4, B);
      n.dt(n.b - 1.4, n.ko - 4, B);
      n.dt(n.b - .6, n.ko - 3.4, o);
      n.dt(n.b - 1.4, n.ko - 2.6, o);
      n.dt(n.b - 3, n.ko - 2.8, o);
    }
  }
  function V(S) {
    var e = S.material;
    var a = {};
    k(a, "oOsSWw", e.cloth);
    k(a, "rRdDh", e.trim);
    k(a, "pPcCv", e.pants);
    a.H = "#ffc9bf";
    a.m = "#aebbd8";
    a.M = "#eef3ff";
    return m(a, S);
  }
  var F = ["...rD....Dr...", ".oSrDD..DDrSo.", "oSWSrDCWDrSSso", "oSWSSrDCDrSSso", "oSWSSSrDrSSSso", "oSWSSSSrSSSSso", "oSWSSSSSSSSsso", "oSWSsSSSSsSSso", "oSWSSsSSsSSsso", ".oWSSSSSSSSso.", ".oWSSSShHSSso.", ".oWSShDhhDhso.", ".rRRRDdDDdDRr.", ".rRDDDHHHDDRr.", ".rRRRrDDrRRRr.", ".oWSSrSSrSSso.", "..oWSSSSSSso.."];
  var P = ["..oWSSdcCdSSso..", "..oWSSdcCdSSso..", "..oWSSdcCdSSso..", "..oWSSdcCdSSso..", "..oWSSdcCdSSso..", "..oWSSdcCdSSso..", "..oWSSdcCdSSso..", "..oWSSdcCdSSso..", ".oWSSSdcCdSSSso.", ".oWSsSdcCdSsSso.", ".oWSSsdcCdsSSso.", "oWSSSsdcCdsSSSso", "oWShSsdcCdsShSso", "oWhDhSdcCdShDhso", "oWShrSdcCdSrhSso", "oWSSSsdcCdsSSSso", "oWSSSSdcCdSSSSso", "RDDHDDDcCDDDHDDR", "rwWwWwrPPrwWwWwr", ".ooooooppoooooo."];
  var T = ["rD.", "rD.", "RD.", "Dh.", "rD.", "rD.", "RD.", "RD.", "Dh.", "rD.", "rD.", "RD.", "RD.", "Dh.", "rD.", "rD.", "rDd", "r.D", "r.."];
  var Z = ["...rDDDDDDr...", ".oSrDDDDDDrSo.", "oSWrRRRRRRrSso", "oSWSSSSSSSSsso", "oSWSSSSSSSSsso", "oSWSSSmMMSSsso", "oSWSSmMSSSSsso", "oSWSSmMSSSSsso", "oSWSSSmMMSSsso", ".oWSSSSSSSSso.", ".oWSSSSsSSSso.", ".oWSsSSsSSsso.", ".rRRRRRRRRRRr.", ".rRDDDDDDDDRr.", ".rRRRRRRRRRRr.", ".oWSSSSSSSSso.", "..oWSSSSSSso.."];
  var I = ["..oWSSSsSSSSso..", "..oWSSSsSSSSso..", "..oWSSSsSSSSso..", "..oWSSSsSSSSso..", "..oWSSSsSSSSso..", "..oWSSSsSSSSso..", "..oWSSSsSSSSso..", "..oWSSSsSSSSso..", ".oWSSSSsSSSSSso.", ".oWSsSSsSSSsSso.", ".oWSSsSsSSsSSso.", "oWSSSsSSsSSSsSso", "oWShSsSSsSSsShso", "oWhDhSSSsSSShDho", "oWShrSSSsSSSrhSo", "oWSSSsSSsSSSsSso", "oWSSSSSSsSSSSSso", "RDDHDDDDDDDDHDDR", "rwWwWwWwWwWwWwWr", ".oooooooooooooo."];
  var $ = ["....rD..Dr..", "..oSrD.DrSo.", "..oSWrDCWDro", "..oSWSrDCDro", "..oSWSSrDrSo", "..oSWSSSrSSo", "..oSWSSSSSSo", "..oSWSsSSSSo", "..oSWSSsSSso", "..oWSSSSSSso", "..oWSSSSShHo", "..oWSSShDhhD", "..rRRRRDdDDd", "..rRDDDDHHHD", "..rRRRRrDDrR", "..oWSSSrSSro", "..oWSSSSSSso"];
  var SS = ["...oWSSSSSdcC..", "...oWSSSSSdcC..", "...oWSSSSSdcC..", "...oWSSSSSdcC..", "...oWSSSSSdcC..", "...oWSSSSSdcC..", "...oWSSSSSdcC..", "...oWSSSSSdcC..", "..oWSSSSSSdcCo.", "..oWSsSSSSdcCo.", "..oWSSsSSSdcCo.", ".oWSSSsSSSdccCo", ".oWShSsSSSdcCCo", ".oWhDhSsSSdcCco", ".oWShrSSSSdcCCo", ".oWSSSsSSSdccCo", ".oWSSSSSSSdcCCo", ".RDDHDDDDDDcCcR", ".rwWwWwWwWrPPPr", "..oooooooooppo."];
  var eS = [".....oWSSdcCdSSso.....", "....oWSSSdcCdSSSso....", "...oWSSSSdcCdSSSSso...", "..oWSSsSSdcCdSSsSSso..", ".oWSSSsSSdcCdSSsSSSso.", "oWShSSsSSdcCdSSsSShSso", "oWhDhSSSSdcCdSSSShDhso", "oWShrSSSSdcCdSSSSrhSso", "oWSSSSSsSdcCdSsSSSSSso", "RDDHDDDDDDcCDDDDDDHDDR", "rwWwWwWwWrPPrwWwWwWwWr", ".oooooooooppoooooooooo"];
  var aS = [".....oWSSSsSSSSso.....", "....oWSSSSsSSSSSso....", "...oWSSSSSsSSSSSSso...", "..oWSSsSSSsSSSSsSSso..", ".oWSSSsSSSsSSSSsSSSso.", "oWShSSsSSSsSSSSsSShSso", "oWhDhSSSSSsSSSSSShDhso", "oWShrSSSSSsSSSSSSrhSso", "oWSSSSSsSSsSSSsSSSSSso", "RDDHDDDDDDDDDDDDDDHDDR", "rwWwWwWwWwWwWwWwWwWwWr", ".oooooooooooooooooooo."];
  var sS = ["...oWSSSSSdcC.....", "..oWSSSSSSdcCo....", "..oWSSSSSSSdcCo...", ".oWSSsSSSSSSdcCo..", ".oWSSSsSSSSSSdcCo.", "oWShSSsSSSSSSdcCo.", "oWhDhSSSSSSSSdcCo.", "oWShrSSSSSSSSdccCo", "oWSSSSSsSSSSSdcCCo", "RDDHDDDDDDDDDDcCcR", "rwWwWwWwWwWwWrPPPr", ".ooooooooooooopppo"];
  function BS(S, e, a) {
    var s = e.material;
    var B = s.cloth;
    v(S, e, a, { C: { line: B.line, deep: B.shade, shade: "#c3c5cd", base: B.base, hi: B.hi, spark: "#ffffff" }, B: { line: B.shade, deep: "#e9e9ee", shade: B.base, base: "#ffffff", hi: "#ffffff" }, T: s.trim, band: 2, ko: 7, up: 3.2 });
  }
  function oS(S, e) {
    return S.p.sit ? 57 : Math.min(57, e.foot - 4);
  }
  function nS(S, a, s) {
    var B = a.arms[s];
    var o = w(B);
    var n = h(B);
    var i = a.material.cloth;
    var O = a.material.trim;
    var t = a.material.accent || O;
    var r = a.material.pants;
    var d = n.x - o.x;
    var b = n.y - o.y;
    var l = Math.sqrt(d * d + b * b) || 1;
    var f = d / l;
    var c = b / l;
    var G = -c;
    var H = f;
    var g = 0 === s && !B.front;
    var x = a.g.side || a.g.back ? 3 : 4;
    var D = n.x - f * x;
    var W = n.y - c * x;
    var J = g ? i.shade : i.base;
    u(S, [[o.x + 2 * G, o.y + 2 * H], [o.x - 2 * G, o.y - 2 * H], [D - 5 * G, W - 5 * H], [D + 5 * G, W + 5 * H]], J);
    u(S, [[o.x - 2 * G, o.y - 2 * H], [D - 5 * G, W - 5 * H], [D - 3 * G, W - 3 * H], [o.x - G, o.y - H]], r.line);
    e.fatLine(S, o.x + 2 * f, o.y + 2 * c, Math.round(D - f), Math.round(W - c), 2, g ? i.deep : i.hi);
    e.line(S, Math.round(o.x + 5 * f), Math.round(o.y + 5 * c), Math.round(D - 2), Math.round(W - 2), i.shade);
    for (var M = 2; M >= 0; M--) {
      var N = 3 + 2 * M;
      var p = 3 + M;
      u(S, [[o.x + 2 * G - f, o.y + 2 * H - c], [o.x - 2 * G - f, o.y - 2 * H - c], [o.x + f * N - G * p, o.y + c * N - H * p], [o.x + f * (N + 1), o.y + c * (N + 1)], [o.x + f * N + G * p, o.y + c * N + H * p]], g ? i.base : i.hi);
      e.line(S, Math.round(o.x + f * N - G * p), Math.round(o.y + c * N - H * p), Math.round(o.x + f * (N + 1)), Math.round(o.y + c * (N + 1)), t.deep);
      e.line(S, Math.round(o.x + f * (N + 1)), Math.round(o.y + c * (N + 1)), Math.round(o.x + f * N + G * p), Math.round(o.y + c * N + H * p), t.base);
    }
    e.fatLine(S, Math.round(D - 5 * G), Math.round(W - 5 * H), Math.round(D + 5 * G), Math.round(W + 5 * H), 2, g ? i.shade : i.hi);
    e.line(S, Math.round(D - 4 * G), Math.round(W - 4 * H), Math.round(D + 4 * G), Math.round(W + 4 * H), t.base);
    e.line(S, Math.round(D - 2 * G - 2 * f), Math.round(W - 2 * H - 2 * c), Math.round(D + 2 * G - 2 * f), Math.round(W + 2 * H - 2 * c), O.deep);
    e.dot(S, Math.round(D - 5 * G), Math.round(W - 5 * H), t.hi);
    e.dot(S, Math.round(D + 5 * G), Math.round(W + 5 * H), t.line);
  }
  function iS(S) {
    var e = S.material;
    var a = {};
    k(a, "bBsSHl", e.cloth);
    k(a, "NngGYy", e.trim);
    k(a, "xXjJi", e.pants);
    a.W = e.trim.spark;
    a.k = e.accent.line;
    a.p = "#e6c65c";
    a.P = "#f8e8a4";
    a.r = "#a8261f";
    return m(a, S);
  }
  var OS = ["........xJiiJx........", ".....bSHxjJJjxHSb.....", ".bsSSHGNnnnnnnNGHSSsb.", ".bsSHSGnYYYGGgnGSHSsb.", ".bsSHSGnGGYGGgnGSHSsb.", ".bsSSHGNnggggnNGHSSsb.", ".bsSHSGnYYYGGgnGSHSsb.", ".bsSHSGnGGyGGgnGSHSsb.", ".bsSSHGNnggggnNGHSSsb.", ".bsSHSGnYYYGGgnGSHSsb.", ".bsSHSGNnggggnNGSHSsb.", ".bsSHSGnYYGGGgnGSHSsb.", ".bsSHsGnggggggnGsHSsb.", ".NgGYGGGGGGGGGGGGGYgN.", ".NGYGGGGGGGGGGGGGGYGN.", ".NnggggggggggggggggnN.", "..NNNNNNNNNNNNNNNNNN.."];
  var tS = ["Nk......kN", "NGkGGGGkGN", "NGWkGGkWGN", "NkGGYGGGkN", "NgGGrrGGgN", ".NgWkkWgN.", "..NNggNN.."];
  var hS = ["....bSSSGxJiJiJxGSSSb....", "....bSHSGxjXjXjxGSHSb....", "...bsSHSGxJiJiJxGSHSsb...", "...bsSHSGxjXjXjxGSHSsb...", "..bsSSHSGxJiJiJxGSHSSsb..", "..bsSSHSGxjXjXjxGSHSSsb..", "..bsSHSSGxJiJiJxGSSHSsb..", ".bsSSHSSGxjXjXjxGSSHSSsb.", ".bsSHSSSGxJiJiJxGSSSHSsb.", ".bsSHSSSGxjXjXjxGSSSHSsb.", "bsSSHSSSGxJiJiJxGSSSHSSsb", "bsSHSSSSGxjXjXjxGSSSSHSsb", "NnGGYGGGGxJiJiJxGGGGYGGnN", "NGYGGnGGNxjXjXjxNGGnGGYGN", ".NnnNNnnN.xxxxx..NnnNNnnN"];
  var rS = ["....bSSSSSSSsSSSSSSSb....", "....bSHSSSSSsSSSSSHSb....", "...bsSHSSSSSsSSSSSHSsb...", "...bsSHSSSSSsSSSSSHSsb...", "..bsSSHSSSSSsSSSSSHSSsb..", "..bsSSHSSSSSsSSSSSHSSsb..", "..bsSHSSSSSSsSSSSSSHSsb..", ".bsSSHSSSSSSsSSSSSSHSSsb.", ".bsSHSSSSSSSsSSSSSSSHSsb.", ".bsSHSSSSSSSsSSSSSSSHSsb.", "bsSSHSSSSSSSsSSSSSSSHSSsb", "bsSHSSSSSSSSsSSSSSSSSHSsb", "NnGGYGGGGGGGGGGGGGGGYGGnN", "NGYGGnGGNGGYGGNGGnGGGYGN.", ".NnnNNnnNNnnNNnnNNnnNNnN."];
  var dS = ["........xJJJJx........", ".....bSHxjjjjxHSb.....", ".bsSSHSSSSSSSSSSHSSsb.", ".bsSHSSSSSSSSSSSSHSsb.", ".bsSHSSSSSSSSSSSSHSsb.", ".bsSHSSSSSSSSSSSSHSsb.", ".bsSHSSSSSSSSSSSSHSsb.", ".bsSHSSSSSSSSSSSSHSsb.", ".bsSHSSSSSSSSSSSSHSsb.", ".bsSHSSSSSSSSSSSSHSsb.", ".bsSHSSSSSSSSSSSSHSsb.", ".bsSHSSSSSsSSSSSSHSsb.", ".bsSHsSSSSsSSSSsSHSsb.", ".NgGYGGGGGGGGGGGGGYgN.", ".NGYGGGGGGGGGGGGGGYGN.", ".NnggggggggggggggggnN.", "..NNNNNNNNNNNNNNNNNN.."];
  var bS = [".....xJJx.....", "...bSxjJJx....", ".bsSSHGNnnN...", ".bsSHSGgYYYg..", ".bsSHSGgGGGGg.", ".bsSSHGnggggn.", ".bsSHSGgYYYYg.", ".bsSHSGgGGyGg.", ".bsSSHGnggggn.", ".bsSHSGgYYYYg.", ".bsSHSGnGGGGn.", ".bsSHSGgYYYYg.", ".bsSHsGnggggn.", ".NgGYGGGGGNnN.", ".NGYGGGGGNGWk.", ".NnggggggNgGG.", "..NNNNNNNNNgN."];
  var lS = ["...bSSHSSSSSb....", "...bSHSSSSSSb....", "..bsSHSSSSSSb....", "..bsSHSSSSSSb....", ".bsSSHSSSSSSb....", ".bsSSHSSSSSSb....", ".bsSHSSSSSSSsb...", "bsSSHSSSSSSSsb...", "bsSHSSSSSSSSsb...", "bsSHSSSSSSSSSsb..", "bsSSHSSSSSSSSsb..", "bsSHSSSSSSSSSsb..", "NnGGYGGGGGGYGGnN.", "NGYGGnGGNGGYGGN..", ".NnnNNnnNNnnNNN.."];
  var fS = [".n.", ".G.", ".n.", "pPp", "prp", "pPr", "prp", "pPp", ".p."];
  var cS = ["..NNNN..", ".NGYYGN.", "NGYGGGgN", "NkrGGrkN", "NGGnnGgN", "NWgWWgWN", ".NkkkkkN", "..NNNN.."];
  var GS = ["..NNNN..", ".NGYYGN.", "NGYGGGgN", "NgGnGnGN", "NGnGnGgN", "NgGnGngN", ".NnkkknN", "..NNNN.."];
  var HS = [".NNNN...", "NGYYGN..", "NGYGGGNN", "NgGGkrGN", "NGGGGnnN", "NgGgWgWN", ".NkkkkkN", "..NNNN.."];
  function gS(S, e, s) {
    var B = e.material;
    var o = B.cloth;
    v(S, e, s, { C: { line: o.line, deep: o.deep, shade: o.shade, base: o.base, hi: "#4a72cc", spark: o.spark }, B: B.trim, T: B.accent, band: 2, ko: 7.4, up: 3 });
    (function (S, e, s) {
      var B = iS(e);
      if (e.g.side) {
        if (1 !== s) {
          return;
        }
        as(S, e.g.arms[1].x - 2, a.ARM_Y - 4 + e.dy, HS, B, !1);
      }
      else {
        var o = e.g.back ? GS : cS;
        var n = e.g.arms[s].x + 1;
        var i = a.ARM_Y + e.dy;
        if (1 === s) {
          as(S, n - 3, i - 4, o, B, !1);
        }
        else {
          as(S, n + 3, i - 4, o, B, !0);
        }
      }
    })(S, e, s);
  }
  function xS(S) {
    var e = S.material;
    var a = {};
    k(a, "kKuUV", e.cloth);
    k(a, "NngGYy", e.trim);
    k(a, "xXjJi", e.pants);
    k(a, "aAmMHZ", e.accent);
    k(a, "qQeER", e.metal);
    a.c = "#a49aae";
    a.w = "#e6dfe8";
    return m(a, S);
  }
  function DS(S, a) {
    for (var s = w(a), B = h(a), o = B.x - s.x, n = B.y - s.y, i = Math.sqrt(o * o + n * n) || 1, O = o / i, t = n / i, r = -t, d = O, b = ["#e6dfe8", "#1b1524", "#a49aae"], l = 0; l < 3; l++) {
      var f = B.x - O * (3 + l);
      var c = B.y - t * (3 + l);
      e.line(S, Math.round(f - 1.5 * r), Math.round(c - 1.5 * d), Math.round(f + 1.5 * r), Math.round(c + 1.5 * d), b[l]);
    }
    if (i > 8) {
      var G = s.x + 3 * O;
      var H = s.y + 3 * t;
      e.line(S, Math.round(G - 1.5 * r), Math.round(H - 1.5 * d), Math.round(G + 1.5 * r), Math.round(H + 1.5 * d), "#dda63a");
      e.dot(S, Math.round(G - 1.5 * r), Math.round(H - 1.5 * d), "#ffe58a");
    }
  }
  var WS = ["...........kGk....", ".....34....GUUk...", "..14544....GVUUk..", ".145444544nGVUUUuk", ".144553554nGVUUUuk", ".234443444nGVUuUuk", "...3443443nGVUuUuk", "...2332332nGVUuUuk", "...3543543GUVUuuk.", "...3433433GUVUuuk.", "...3543543GUVUUuk.", "...3433433GUVUUuk.", ".kGYGGn543GUVUUuk.", ".kUVUuK433GuVUUuk.", ".kuUuKK322GuUUuuk.", ".NgGYGGnAMnGGYGgN.", ".NGYGGGGZHGGGYGGN.", ".NnggggnmAnggggnN."];
  var JS = [".kUVUUuG..GuUVUuk.", ".kUVUUuG..GuUVUuk.", ".kUVUUuG..GuUVUuk.", ".kUVUUuG..GuUVUuk.", "kUUVUUuG..GuUVUUuk", "kUUVUuuG..GuuVUUuk", "kUUVUUuG..GuUVUUuk", "kUGUUGUG..GUGUUGUk", "kGYGGYGG..GGYGGYGk", "NnGgnGgN..NgGngGnN", "kAMHMAkN..NkAMHMAk", "NgGYGGGN..NGGGYGgN", ".NngggN....NgggnN.", "..NNNN......NNNN.."];
  var uS = ["....kGk...........", "...kUUGk.....34...", ".kUVUUUUGn..34541.", ".kUVUUUUUGn4455441", ".kUVUUuUUUGn445542", ".kUVUUuUUUGn434432", ".kUVUUuUUUUGn4342.", ".kUVUUuUUUUGn433..", ".kUVUUuUUUUUGn43..", ".kUVUUuUUUUUGn33..", ".kUVUUuUUUUUUGn3..", ".kUVUUuUUUUUUGn2..", ".kUVUUuUUUUUnGYGk.", ".kUVUUuUUUUuKuVUk.", ".kuUUuuUUUuKKuUuk.", ".NgGYGGGGGGGGYGgN.", ".NGYGGGGYGGGGGYGN.", ".NnggggggggggggnN."];
  var MS = ["G.....G", "Gn...nG", ".GnYnG.", "..gHg..", "...G...", "...n..."];
  var wS = [".....kGk......", "....kUUGn344..", "...kUVUGn4455.", "..kUVUUUGn4554", "..kUVUuUUGn554", "..kUVUuUUGn443", "..kUVUuUUUGn43", "..kUVUuUUUGn32", "..kUVUuUUUUGn3", "..kUVUuUUUUUGk", "..kUVUuUUUUUuk", "..kUVUuUUUUUuk", "..kUVUuUUUUUuk", "..kUVUuUUUUUuk", "..kuUUuuUUUuuk", "..NgGYGGGGnAMn", "..NGYGGGGGGZHG", "..NnggggggnmAn"];
  var NS = ["..kUVUUuUUUUuk", "..kUVUUuUUUUuk", "..kUVUUuUUUUuk", "..kUVUUuUUUUuk", ".kUUVUUuUUUUuk", ".kUUVUUuuUUUuk", ".kUUVUUuUUUUuk", ".kUGUUGUUGUUGk", ".kGYGGYGGYGGYk", ".NnGgnGgnGgnGN", ".kAMHMAkAMHMAk", ".NgGYGGGGGYGgN", "..NngggNNgggnN", "...NNNN..NNNN."];
  var pS = ["........q.", ".......qRq", "..qq..qREq", ".qREqqREEq", "qREEEEEEeq", "qGYGGGGGgq", ".qnMHMMnq.", "..qqqqqq.."];
  var kS = [".q........", "qRq...q...", "qERq.qRq..", "qEEEqREEq.", "qREEEEEEeq", "qGYGGGGGgq", ".qnAMHMnq.", "..qqqqqq.."];
  function mS(S, e, s) {
    var B = e.arms[s];
    if (s !== function (S) {
      return S.g.back || S.g.side ? 1 : 0;
    }(e)) {
      var o = e.material;
      var n = o.cloth;
      var i = v(S, e, s, { C: { line: n.line, deep: n.shade, shade: n.shade, base: n.base, hi: n.hi }, B: o.trim, T: o.accent, band: 2, ko: 6.4, up: 3 });
      if (!(i.far)) {
        i.dt(i.b - 1.4, i.ko - 2.2, o.trim.base);
        i.dt(i.b - 2.2, i.ko - 2.8, o.trim.hi);
      }
      (function (S, e, s) {
        var B = xS(e);
        if (e.g.side) {
          as(S, e.g.arms[s].x - 4, a.ARM_Y - 3 + e.dy, kS, B, !1);
        }
        else {
          var o = e.g.arms[s].x + 1;
          var n = a.ARM_Y + e.dy;
          if (1 === s) {
            as(S, o - 4, n - 6, pS, B, !1);
          }
          else {
            as(S, o + 4, n - 6, pS, B, !0);
          }
        }
      })(S, e, s);
    }
    else {
      if ((e.g.side || e.g.back || B.front || B.over)) {
        DS(S, B);
      }
    }
  }
  function vS(S) {
    var e = S.material;
    var a = {};
    k(a, "oOsSWw", e.cloth);
    k(a, "NngGYy", e.trim);
    k(a, "rRdDh", e.accent);
    k(a, "pPcCv", e.pants);
    a.m = e.cloth.mid;
    return m(a, S);
  }
  var yS = ["........oo........", "......ooWSoo......", "....ooWWSSSsoo....", "...oWWSSSSSSSso...", "..oWWSSSSSSSSSso..", ".oWWSSSSSSSSSmso..", ".oWSSSSSYgSSSmsso.", ".oWSSSSnYGnSSmsso.", ".oWSSSSSgnSSSmsso.", "oWSSSSSSSSSSSmssso", "oWnYYGGGGGGGGGgnso", "oWGOOOOOOOOOOOOGso", "oWGWWWWWWWWWWWWGso", "oWGWWWWWYGWWWWmGso", "oWGmmmmmgnmmmmmGso", "oWGssssssssssssGOo", "oWG............GOo", "omG............GOo", "oWG............GOo", "omnG..........GnOo", "omsG..........GsOo", "onGGn........nGGno", ".onn..........nno."];
  var LS = ["........oo........", "......ooWGoo......", "....ooWWSGSsoo....", "...oWWSSSGSSSso...", "..oWWSSSSGSSSSso..", ".oWWSSSSSGSSSSsso.", ".oWSSSSSSGSSSSsso.", ".oWSSSSSSGSSSSsso.", ".oWSSSSSSGSSSSsso.", "oWWSSSSSSGSSSSssso", "oWSSSSSSSGSSSSssso", "oWSSSSSSSGSSSSssso", "oWSSSSSSSGSSSSsOso", "oWSSSSSSSGSSSSsOso", "oWSSSSSSSGSSSSsOso", "oWSSSSSSSGSSSSsOso", "oWSSSSSSSGSSSSsOso", "oSSSSSSSSGSSSssOso", "oSSsSSSSSGSSSssOso", "oSsSSSSSSGSSSsOOso", "onGGsSSSSGSSSsGGno", ".onGGGsSSGSsGGGno.", "...onGGGGGGGGGno..", ".....onGGYGGno....", ".......nggn......."];
  var CS = [".....oo.............", "....oGWoo...........", "...oGWWSSoo.........", "..oGWWSSSSSoo.......", ".oGWWSSSSSSSSoo.....", ".oGWSSSSSSSSSSSoo...", "oGWSSSSSSSSSSSSSso..", "oGWSSSSSSSSSSSSYso..", "oGSSSSSSSSSSSSYyGo..", "oGSSSSSSSSSSSmnGgso.", "oGSSSSSSSSSSnYGGGGo.", "oGSSSSSSSSmGOOOOO...", "oGSSSSSSSmmGWWWWWWo.", "oGSSSSSSSmmGWWWWYGo.", "oGSSSSSSmmsGmmmmgno.", "oGmSSSSSmmsGssssso..", "oGmSSSSmmsOG........", "oGmmSSmmssOG........", "oGmmmmmmsOOG........", "oGsmmmmsOOnG........", ".oGssmssOOG.........", ".onGssssOnG.........", "..oonGGnnGo.........", "....ooooo..........."];
  var jS = ["..oWSG....GSso..", ".oWSSGY..YGSSso.", "oWWSSSGDDGSSmsOo", "oWSSSSGdDGSSmsOo", "oWWSSSSGDGSmSsOo", "oWSSSSSGdGSmSsOo", ".oWSSSSGGGSSmso.", ".oWSSSnYyGnSmso.", ".oWSSnGYGGgnmso.", ".oWSSSnGGgnSmso.", ".oWSSmSngnSSmso.", ".oWSSSmSGSSmSso.", ".oWmSSSmGSmSmso.", ".oWmSmSSGSmSmso.", ".NgGYGnDDnGYGgN.", ".NGYGGDhDDGGYGN.", ".NnggggnddngggN."];
  var AS = [".oWSSSGWWGSSmso.", ".oWSSSGYGGSSmso.", ".oWSSSGgnGSSmso.", ".oWSSSGWWGSSmso.", ".oWSSSGWWGSSmso.", ".oWSSSGYGGSSmso.", ".oWSSSGgnGSSmso.", ".oWSSSGWWGSSmso.", "oWSSmSGWWGSmSmso", "oWSmSSGYGGSSmmso", "oWSmSSGgnGSSmmso", "oWSSmSGWWGSmSmso", "oWSSSSGWWGSSSmso", "oWSnSSGYGGSSnmso", "oWnYnSGgnGSnYnso", "oWSnSSGWWGSSnmso", "oWSSSSGWWGSSSmso", "NgGYGGGGYGGGYGgN", "NnGgGnGgGnGgGnnN", ".NNNNNNNNNNNNNN."];
  var QS = ["..oWSS....SSso..", ".oWSSSSSSSSSSso.", "oWWSSSSSSSSSSsOo", "oWSSSSSSSSSSSsOo", "oWSSSSSSSSSSSsOo", "oWSSSSSSSSSSSsOo", ".oWSSSSSSSSSSso.", ".oWSSSSSSSSSSso.", ".oWSSSSSSSSSSso.", ".oWSSSSSSSSSSso.", ".oWSSSSSsSSSSso.", ".oWsSSSSsSSSsso.", ".oWsSSSsSsSSsso.", ".oWsSsSSsSSsSso.", ".NgGYGGGGGGYGgN.", ".NGYGGGYGGGGYGN.", ".NnggggggggggnN."];
  var _S = [".oWSSSSGGSSSSso.", ".oWSSSSYGSSSSso.", ".oWSSSSgnSSSSso.", ".oWSSSSSSSSSSso.", ".oWSSSSSSSSSSso.", ".oWSSSSYGSSSSso.", ".oWSSSSgnSSSSso.", ".oWSSSSSSSSSSso.", "oWSSSSSSSSSSSsso", "oWSsSSSYGSSSssso", "oWSSsSSgnSSsSsso", "oWSSSsSSSSsSSsso", "oWSSSSSSSSSSSsso", "oWSnSSnYGnSSnsso", "oWnYnnYyGgnnYnso", "oWSnSSngnnSSnsso", "oWSSSSSSSSSSSsso", "NgGYGGGGYGGGYGgN", "NnGgGnGgGnGgGnnN", ".NNNNNNNNNNNNNN."];
  var YS = ["...oWS..GSo.", "..oWSSGGDGso", ".oWSSSSGDDGo", ".oWSSSSSGDGo", ".oWSSSSSGdGo", ".oWSSSSSSGGo", ".oWSSSSSSSGo", ".oWSSSSSSSso", ".oWSSSSSSSso", ".oWSSSSSSSso", ".oWSSSSSSsso", ".oWsSSSSSsso", ".oWsSSSsSSso", ".oWsSsSSsSso", ".NgGYGGGGnDD", ".NGYGGGGGDhD", ".NnggggggndD"];
  var ES = [".oWSSSSSSSmSGo.", ".oWSSSSSSmSYGo.", ".oWSSSSSSmSnGo.", ".oWSSSSSSmSYGo.", ".oWSSSSSSmSnGo.", ".oWSSSSSSmSYGo.", ".oWSSSSSSmSnGo.", ".oWSSSSSSmSYGo.", ".oWSmSSSSmSGGo.", ".oWSmSSSmSSYGo.", "oWSSSmSSmSSnGso", "oWSSSmSSmSSYGso", "oWSSSSmSmSSnGso", "oWSnSSSSnSSYGso", "oWnYnSSnYnSnGso", "oWSnSSSSnSSYGso", "oWSSSSSSSSSGGso", "NgGYGGGGYGGGGgN", "NnGgGnGgGnGgGnN", ".NNNNNNNNNNNNN."];
  var qS = [".....oWSSGWGGSso......", "....oWSSSGWYgGSso.....", "...oWSSSSGWnGGSSso....", "..oWSSSSSGWYgGSSSso...", ".oWSSSSSSGWnGGSSSsso..", "oWSSSSSSSGWYgGSSSssso.", "oWSSSSSSSGWGnGSSSSsOo.", "oWSnSSSSSGWYgGSSSnSOo.", "oWnYnSSSSGWGnGSSnYnOo.", "oWSnSSSSSGWWSGSSSnsOo.", "NgGYGGGGGGGYGGGGGYGgN.", "NnGgGnGgGnGgGnGgGnGnN.", ".NNNNNNNNNNNNNNNNNNN.."];
  var KS = ["...oWSSSSSGo......", "..oWSSSSSSYGo.....", "..oWSSSSSSSnGo....", ".oWSSSSSSSSSYGo...", ".oWSSSSSSSSSSnGo..", "oWSSSSSSSSSSSSYGo.", "oWSsSSSSSSSSSSSnGo", "oWSSsSSSSSSSSSsYGo", "oWSnSSSSSSSSSnSnGo", "oWnYnSSSSSSSnYnYGo", "NgGYGGGGGGGGGYGGgN", "NnGgGnGgGnGgGnGgnN", ".NNNNNNNNNNNNNNNN."];
  function US(S, e) {
    return S.p.sit ? 57 : Math.min(57, e.foot - 4);
  }
  function XS(S, e, a) {
    var s = e.material;
    var B = s.cloth;
    var o = v(S, e, a, { C: { line: B.line, deep: B.shade, shade: B.mid, base: B.base, hi: B.hi }, B: s.accent, T: s.trim, band: 2, ko: 6.6, up: 3 });
    if (!(o.far)) {
      o.dt(o.b - 1.6, o.ko - 2.4, s.trim.base);
      o.dt(o.b - .8, o.ko - 3, s.trim.hi);
      o.dt(o.b - 2.4, o.ko - 3, s.trim.shade);
    }
  }
  function RS(S, a, s) {
    var B = a.arms[s];
    var o = w(B);
    var n = h(B);
    var i = a.material.cloth;
    var O = a.material.trim;
    var t = n.x - o.x;
    var r = n.y - o.y;
    var d = Math.sqrt(t * t + r * r) || 1;
    var b = t / d;
    var l = r / d;
    var f = -l;
    var c = b;
    var G = 0 === s && !B.front;
    var H = a.g.side || a.g.back || s ? 4 : 5;
    var g = n.x - b * H;
    var x = n.y - l * H;
    var D = G ? i.shade : i.base;
    u(S, [[o.x + 2 * f, o.y + 2 * c], [o.x - 2 * f, o.y - 2 * c], [g - 6 * f, x - 6 * c], [g + 6 * f, x + 6 * c]], D);
    u(S, [[o.x - 2 * f, o.y - 2 * c], [g - 6 * f, x - 6 * c], [g - 4 * f, x - 4 * c], [o.x - f, o.y - c]], G ? i.deep : i.shade);
    e.fatLine(S, o.x + 2 * b, o.y + 2 * l, Math.round(g - b), Math.round(x - l), 2, G ? i.deep : i.hi);
    e.line(S, Math.round(o.x + 5 * b), Math.round(o.y + 5 * l), Math.round(g - 2), Math.round(x - 2), i.shade);
    e.fatLine(S, Math.round(g - 6 * f), Math.round(x - 6 * c), Math.round(g + 6 * f), Math.round(x + 6 * c), 2, G ? O.deep : O.base);
    e.line(S, Math.round(g - 5 * f), Math.round(x - 5 * c), Math.round(g + 5 * f), Math.round(x + 5 * c), O.hi);
  }
  var zS = "#a85a4c";
  var VS = "#3a2a22";
  function FS(S, a, s, B, o, n) {
    u(S, [[a - 2, s + 1], [a + o, s - B], [a + 2, s + 1]], n.base);
    e.line(S, a - 1, s, a + o - 1, s - B + 1, n.shade);
    e.line(S, a + 1, s, a + o + 1, s - B + 2, n.hi);
    e.dot(S, a + o, s - B, n.hi2 || n.hi);
  }
  function PS(S, a, s) {
    var B = a.arms[s];
    var o = w(B);
    var n = h(B);
    var i = a.material.cloth;
    var O = (a.material.trim, a.material.accent);
    var t = n.x - o.x;
    var r = n.y - o.y;
    var d = Math.sqrt(t * t + r * r) || 1;
    var b = t / d;
    var l = r / d;
    var f = -l;
    var c = b;
    var H = 0 === s && !B.front;
    var g = o.x + b * d * .58;
    var x = o.y + l * d * .58;
    var D = 3.5;
    u(S, [[o.x + 2 * f, o.y + 2 * c], [o.x - 2 * f, o.y - 2 * c], [g - f * D, x - c * D], [g + f * D, x + c * D]], H ? i.shade : i.base);
    u(S, [[o.x - 2 * f, o.y - 2 * c], [g - f * D, x - c * D], [g - 1.5 * f, x - 1.5 * c], [o.x - f, o.y - c]], H ? i.deep : i.shade);
    e.fatLine(S, Math.round(o.x + 2 * b), Math.round(o.y + 2 * l), Math.round(g - b), Math.round(x - l), 2, H ? i.shade : i.hi);
    e.fatLine(S, Math.round(g - f * D), Math.round(x - c * D), Math.round(g + f * D), Math.round(x + c * D), 2, H ? i.line : i.deep);
    e.line(S, Math.round(g - 2.5 * f), Math.round(x - 2.5 * c), Math.round(g + 2.5 * f), Math.round(x + 2.5 * c), O.base);
    var W = Math.round(n.x - 3 * b);
    var J = Math.round(n.y - 3 * l);
    e.fatLine(S, Math.round(W - 2 * f), Math.round(J - 2 * c), Math.round(W + 2 * f), Math.round(J + 2 * c), 2, G.leather.deep);
    e.line(S, Math.round(W - 2 * f), Math.round(J - 2 * c), Math.round(W + 2 * f), Math.round(J + 2 * c), G.leather.base);
    e.dot(S, W, J, G.metal.hi);
  }
  var TS = { line: "#3a1608", deep: "#6e2a14", shade: "#9a4020", base: "#c2582a", hi: "#e88a48" };
  var ZS = { line: "#14100e", deep: "#231a16", shade: "#3a2c24", base: "#53402f", hi: "#7a604a" };
  function IS(S, a, s) {
    if ($S(a)) {
      !function (S, e, a) {
        if (1 === a) {
          var s = xe;
          var B = e.torso.x - 11;
          var o = 0 | e.dy;
          Se(S, B + 8, 29, we, s, o);
          Se(S, B + 21, 29, we, s, o);
        }
      }(S, a, s);
    }
    else {
      var B = a.arms[s];
      var o = w(B);
      var n = h(B);
      var i = G.metal;
      var O = G.leather;
      var t = TS;
      var r = n.x - o.x;
      var d = n.y - o.y;
      var b = Math.sqrt(r * r + d * d) || 1;
      var l = r / b;
      var f = d / b;
      var c = -f;
      var H = l;
      var g = 0 === s && !B.front;
      var x = o.x + l * b * .3;
      var D = o.y + f * b * .3;
      var W = n.x - 4 * l;
      var J = n.y - 4 * f;
      e.line(S, Math.round(x - 2 * c), Math.round(D - 2 * H), Math.round(x + 2 * c), Math.round(D + 2 * H), g ? t.deep : t.base);
      e.line(S, Math.round(x - 2 * c), Math.round(D - 2 * H + 1), Math.round(x + 2 * c), Math.round(D + 2 * H + 1), g ? t.line : t.deep);
      e.fatLine(S, Math.round(W - 2 * c), Math.round(J - 2 * H), Math.round(W + 2 * c), Math.round(J + 2 * H), 3, g ? O.line : O.deep);
      e.line(S, Math.round(W - 2 * c), Math.round(J - 2 * H), Math.round(W + 2 * c), Math.round(J + 2 * H), O.base);
      e.line(S, Math.round(W + l), Math.round(J + f), Math.round(W + l + 2 * c), Math.round(J + f + 2 * H), i.shade);
      e.dot(S, Math.round(W), Math.round(J), i.hi);
    }
  }
  function $S(S) {
    return !(S.g.side || S.g.back || S.p.sit || S.p.act || S.p.atk || 0 | S.p.leg);
  }
  function Se(S, a, s, B, o, n, i) {
    for (var O = 0; O < B.length; O++)
      for (var t = B[O], h = s + O, r = null == i || h < i ? 0 | n : 0, d = 0; d < t.length; d++) {
        var b = o[t.charAt(d)];
        if (b) {
          e.dot(S, a + d, h + r, b);
        }
      }
  }
  var ee = { o: "#59627a", d: "#8b95ab", s: "#bcc5d6", w: "#e6ebf3", W: "#ffffff", q: "#6b4a12", g: "#a97620", G: "#d9a83b", Y: "#ffe18a", j: "#1f7a66", J: "#3fb894", K: "#a9f0d2", n: "#0e2a3a", D: "#154458", S: "#1d5f78", B: "#2a7d98", H: "#4aa3b8", c: "#e9eef2", l: "#3a2416", L: "#7d5230", M: "#a06d42", p: "#8a6d3c", P: "#efe2b8", Q: "#fff8dc", x: "#9a7b4a", r: "#c0392b" };
  var ae = [".......oooo.......", "......oswWwo......", "......odswwo......", "..jJgGodsswoGgJK..", "....oqGYJKYGqo....", "....osswwWWwwo....", "...oswwwwWWWwwo...", "..odswwwwwWWwwso..", "..odss......swwo..", "..ods........wwo..", ".ods..........wwo.", ".od............wo.", ".od............wo.", ".os............wo.", "..s............s.."];
  var se = [".sWWW...WWWs.", ".W.........W.", ".s.........s.", ".............", ".............", ".............", "...sWW..WWs..", "...W......W..", "...s.sWWs.s..", ".....sWWs....", ".....sWWs....", ".....dwWd....", ".....dwWd....", ".....dwWd....", ".....dwWd....", ".....dwWd....", "......dwd....", ".......d....."];
  var Be = ["...qc....cq...", "nSBBGccccGBBHn", "SBBBBGccGBBBBH", "SBBBBBGGBBBBBH", "SBBBBBBBBBBBBH", "SBBBBBBBBBBBBH", "SBBBBBBBBBBBBH", "SBBBBBBBBBBBBH", "SBBBBBBBBBBBBH", "SBBBBBBBBBBBBH", "SBBBBBBBBBBBBH", "SBBBBBBBBBBBBH", "SBBBBBBBBBBBBH", "SBBBBBBBBBBBBH", "DSBBBBBBBBBBHB", "llLLLLjKLLLMll", "llllllJjllllll"];
  var oe = [".q.", ".q.", ".q.", ".J.", "JKJ", ".j.", ".q.", "qGq", "jJj", "j.j"];
  var ne = ["...nDSBBBBBBBHn...", "...nDSBBBBBBBHn...", "..nDSBBSBBBBHBHn..", "..nDSBBSBBBBHBHn..", "..nDSBBSBDBBHBHn..", "..nDSBSBBDBBBHHn..", ".nDSBBSBBDBBBHBHn.", ".nDSBBSBBDBBBHBHn.", ".nDSBSBBBDBBBBHHn.", ".nDSBSBBBDBBBBHHn.", ".nDSBSBBBDBHBBHHn.", ".nDSBSBBBDBHBBBHn.", ".nDSBSBBBDBHBBBHn.", ".nDSSBBBBDBBHBBHn.", "nDSBSBBBBDBBHBBBHn", "nDSBSBBBBDBBHBBBHn", "nDSBBBBBBDBBBBBBHn", "nDDGDDGDDGDDGDDGDn", "nGGYGGGGYGGGGYGGGn", ".nnnnnnnnnnnnnnnn."];
  var ie = ["....nBB.", "...nSBB.", "..nSBBB.", ".nSBBBB.", ".nDSBBB.", "nDSBBBB.", "nDSBBBB.", "nDSBBBG.", "nDSBBSG.", "nDSBSBG.", "nDSSBBG.", "nDSBBBGG", "nDSBBBBG", "nDSBBBBG", ".nDSBBBG", ".nDSBBBG", ".nDSBBBG", ".nDSBBGq", "..nGGGq.", "...qqq.."];
  var Oe = [".BBn....", ".BBHn...", ".BBBHn..", ".BBBBHn.", ".BBBBHn.", ".BBBBBHn", ".BBBBBHn", ".GBBBBHn", ".GSBBBHn", ".GBSBBHn", ".GBBSBHn", "GGBBBBHn", "GBBBBBHn", "GBBBBBHn", "GBBBBHn.", "GBBBBHn.", "GBBBBHn.", "qGBBBHn.", ".qGGGn..", "..qqq..."];
  var te = ["qGYGGGGYGq", ".pPPPPPQp.", ".pPxxxxQp.", ".pPPPPPQp.", ".pPxxxPQp.", "45PPPPPQ45", "34PxxxxQ45", "34PPPPPQ34", "22PxxPrQ22", ".pPPPPPQp.", "qGYGGGGYGq"];
  var he = { o: "#2a1810", d: "#4a2c1c", s: "#6b4227", b: "#8a5a36", h: "#b07a4a", j: "#1f7a66", J: "#3fb894", K: "#a9f0d2", q: "#6b4a12", g: "#a97620", G: "#d9a83b", Y: "#ffe18a", n: "#0b0d13", D: "#161a24", S: "#232836", B: "#2f3545", H: "#474e62", m: "#4a1018", r: "#7a1f2a", R: "#b83245", P: "#e0607a", k: "#2b1a12", e: "#4a3020", f: "#654530", F: "#7d5a3c", E: "#9c7650", u: "#3a2618", x: "#b9a882", c: "#e8dcc0", C: "#fff6dc", l: "#4a2d1c", L: "#9a6a48", M: "#c49a6a", t: "#5a3a18", v: "#8a6230", T: "#b88a4a", U: "#dcb878", W: "#f4f1e8" };
  var re = ["...odssssssssssssssho...", "..odsbbbbbbbbbbbbbbbho..", "..odsbbbbbbbbbbbbbbbho..", "..odsbbbbbbbbbbbbbbbho..", "..odsbbbbbbbbbbbbbbbho..", "..odsbbbbbbbbbbbbbbbho..", "..odsbbbbbbbbbbbbbbbho..", "..odsbbbbbbbbbbbbbbbho..", "..odsbbbbbbbbbbbbbbbho..", "..odsbbbbbbbbbbbbbbbho..", "..odsbbbbbbbbbbbbbbbho..", "..odsbbbbbbbbbbbbbbbho..", "..odsbbbbbbbbbbbbbbbho..", ".odsbbbbbbbbbbbbbbbbbho.", ".odsbbbbbbbbbbbbbbbbbho.", ".odsbbbbbbbbbbbbbbbbbho.", ".odsbbbbbbbbbbbbbbbbbho.", ".odsbbbbbbbbbbbbbbbbbho.", ".odsbbbbbbbbbbbbbbbbbho.", ".odsbbbbbbbbbbbbbbbbbho.", ".odsbbbbbbbbbbbbbbbbbho.", ".odsbbbbbbbbbbbbbbbbbho.", ".odsbbbbbbbbbbbbbbbbbho.", ".odsbbbbbbbbbbbbbbbbbho.", ".odsbbbbbbbbbbbbbbbbbho.", ".odsbbbbbbbbbbbbbbbbbho.", ".odsbbbbbbbbbbbbbbbbbho.", ".odsbbbbbbbbbbbbbbbbbho.", ".odsbbbbbbbbbbbbbbbbbho.", ".odsbbbbbbbbbbbbbbbbbho.", ".odsbbbbbbbbbbbbbbbbbho.", "..odbbbbbbbbbbbbbbbbho..", "...obbbbbbbbbbbbbbbbo..."];
  var de = ["........oooo........", ".......osbhbo.......", "....jJGodsbhoGJK....", ".......odsbbo.......", "......ojJKJJjo......", ".....osbbhhbbso.....", "....odsbbbhhbbso....", "...odsbbbdhhbbbso...", "..odsbbbbdhbhbbbso..", "..odsbbs....sbhbso..", "..odsbs......sbbso..", "..ods..........bso..", "..sb............bh..", "..sb............bh..", "..sb............bh..", "..sb............bh..", "..sb............bh..", "..sb............bh..", "..sb............bh..", "..sb............bh..", "..sb............bh..", "..sb............bh..", "..sb............bh..", "..sb............bh..", "..sb............bh..", "..sb............bh..", "..sb............bh..", "...b............b..."];
  var be = ["..nSRRBn..", "..nSBBHn..", "nDSBBBBBLn", "nDSBBBBLMn", "nDSBBBBLHn", "nDSBBBLMHn", ".nSBBBLBn.", ".nSBBLMHn.", ".nSBLBBHn.", ".nSBLMBHn.", ".nSLBBBHn.", ".nSLMBBHn.", ".nLSBBBHn.", ".nLMBBBHn."];
  var le = ["..mRm..mRm..", ".mRPRmmRPRm.", ".mrRRPPRRrm.", ".mrrRmmRrrm.", "....RrrP....", "...mRr.rPm..", "...mRr.rPm..", "...mRr..rPm.", "..mRr...rPm.", "..mRr...rPm.", "..mRm...mPm.", "..m.m...m.m."];
  var fe = ["....kefFFFFFEk....", "....kefFFFFFEk....", "....kefFFFFFEk....", "...kefFFfFFFFEk...", "...kefFFfFFFFEk...", "...kefFFfFFEFEk...", "...kefFfFFFEFEk...", "...kefFfFFFEFEk...", "..kefFFfFFFFEFEk..", "..kefFFfFFFFEFEk..", "..kefFfFFFfFFEEk..", "..kefFfFFFfFFEEk..", "..kefFfFFFfFFFEk..", ".kefFFfFFFfFFFEEk.", ".kefFFfFFFFfFFFEk.", "kuuuuuuuuuuuuuuuuk", "kuGuuGuuGuuGuuGuuk", "kgYggYggYggYggYguk", "kuGuuGuuGuuGuuGuuk", "kxcccccccccccccCCk", "kxxccccccccccccCck", ".kkkkkkkkkkkkkkkk."];
  var ce = [".nBB", "nSBB", "nSBB", "nSBB", "nSBB", "nSBB", "nSBB", "nSBB", "nSBB", "nSBB", "nSBB", "nSBB", "nSBB", "nSBB", "mrRR", "mRPR"];
  var Ge = ["BBn.", "BBHn", "BBHn", "BBHn", "BBHn", "BBHn", "BBHn", "BBHn", "BBHn", "BBHn", "BBHn", "BBHn", "BBHn", "BBHn", "RRPm", "RPRm"];
  var He = ["..ll..", ".lLLl.", "lLMMLl", "lLLGLl", "lLMLLl", "lLLLLl", ".llll."];
  var ge = ["...ttTtt...", "..t.rRr.t..", ".t.rRPRr.t.", ".trRRPPRrt.", ".tTUTUTUTt.", ".tvTvTvTUt.", ".tTvTvTvUt.", "..tvTvTvt..", "..tTTTTTt..", "...ttttt..."];
  var xe = { o: "#4a1808", d: "#7a2c10", s: "#a8431a", b: "#cf6426", h: "#f09548", m: "#2e0e08", r: "#5e1f14", R: "#8a3220", P: "#b85436", z: "#2a2f3a", Z: "#4b5463", i: "#7a8494", I: "#a7b0bd", W: "#e4e9ef", l: "#2a1a10", e: "#47291a", L: "#6e4529", M: "#93602f", N: "#bf8a50", n: "#1c1512", S: "#463a33", B: "#62524a", H: "#85746a", f: "#9a3a10", F: "#f08a2c", Y: "#ffd070", y: "#fff2b0", q: "#6b4a12", g: "#a97620", G: "#d9a83b", k: "#14141a", p: "#232329", x: "#383840", X: "#4f4f58", u: "#1a120c", U: "#3b2618", v: "#5a3c26", V: "#7d5838", a: "#4a2c17", A: "#7a4a26", E: "#a8703d" };
  var De = [".........oo.........", ".....o..ohbo..o.....", "....oho.ohbo.obo....", "..o.ohbohbbsobbo.o..", ".ohbhbbbhbbsbbbsbbo.", ".obbbbsbbbbsbbsbbso.", "...mRPPRRRRPPRRRmRm.", "...mrRRRRgGRRRRrRPm.", "...mrrrrrrrrrrrrmRm.", "...os..........bo.Rm", "..os............borm", "..os............boRm", "..os............bom.", "..os............bo..", "..od............bo.."];
  var We = ["...oooo...oooo....", "...dssd...dssd....", "..................", "..................", "..................", ".os............bo.", ".osb..........bho.", ".osbbsbbbbbbhbbho.", ".odsbbbsoosbbhbbo.", "..odsbbbbbbbhbso..", "..odsbbsbbsbhbso..", "...odsbsbbshbso...", "...odsbbssbhbso...", "....odsbbbhbso....", "....odsbsbhbso....", ".....odsbbhso.....", "......oGYGgo......", ".......osbo.......", "........oo........"];
  var Je = ["..nSB..BHn..", ".nSBB..BBHn.", ".nSBBBBBBHn.", ".nSllllllHn.", ".nSeMMMMNHn.", ".nSeMMMMNHn.", ".nSeMFFMNHn.", ".nSeFYYFNHn.", ".nSeFyYFNHn.", ".nSefFFfNHn.", ".nSeMffMNHn.", ".nSeMMMMNHn.", ".nSeMMMMNHn.", "lMMMqGGqMMMl", "lIMIGYYGIMIl", "leeeqGGqeeel", ".ZeMMMMMMNe.", ".ZeMMLMMMNe.", ".ZeMMLMMMNM.", ".IeMMLMMMNM.", ".IeMLMMMMNe.", ".ZeMLMMMNNl.", ".Z.eMMMMMN..", ".i.eLMMMLN..", "...elLlLle..", "....l.l.l..."];
  var ue = [".kpxxkxxX.", ".kpxxkxxX.", ".kpxxkxxX.", ".kpxxkxxX.", ".kpxxkxxX.", ".kpxxkxxX.", ".kpxxkxxX.", ".kpxxkxxX.", ".kpxxkxxX.", ".kpxxkxxX.", ".ZIIWZIIW.", ".eMMNeMMN.", ".eMINeMIN.", ".eLMNeLMN.", ".UvvVUvvV.", ".UvvVUvvV.", "uUvvVUvvVu", "uUvVVUvVVu", "uZIIWZIIWu", "uuuuuuuuuu"];
  var Me = ["...zzz..", ".zzIIWz.", "zZIIIWWz", "zZiIIIWz", "zZZiWIIz", ".zZZiiz.", "..zzzz.."];
  var we = ["rRP", "mrR", "...", "...", "...", "...", "lll", "eMN", "eIN", "eMN", "lll"];
  var Ne = [".zzzzzz.", "zIIIIIWz", "zIiiiIWz", "zIifFiWz", "zIiFYiWz", "zIifFiWz", "zIiiiIWz", "zZZZZZIz", "zZZZZZZz", ".zzzzzz."];
  var pe = ["...oC....Co...", ".oSoCV..VCoSo.", "oSWS4CVVCSSSso", "oSWSr3VVCrSSso", "oSWSSrCVrCSSso", "oSWSSSaArCSSso", "oSWSSSAaCSSsso", "oSWSSSCVSSSsso", "oSWSSCVSSSSsso", ".oWSCVSSSSSso.", ".oWCVSSSsSSso.", ".oCVSSSsSSsso.", ".xJiJJXXJJiJx.", ".xjJJXiiXJJjx.", ".xXjjjXXjjjXx.", ".oWSSSssSSSso.", ".oWSSSssSSSso."];
  var ke = [".X.", ".j.", ".J.", "aVa", "VAV", "aVa", ".c.", "cVc", "c.c"];
  var me = ["..oWSSCcVCSSso..", "..oWSSCcVCSSso..", "..oWSSCcVCSSso..", "..oWSSCcVCSSso..", "..oWSSCcVCSSso..", "..oWSSCcVCSSso..", "..oWSSCcVCSSso..", "..oWSSCcVCSSso..", ".oWSSSCcVCSSSso.", ".oWSsSCcVCSsSso.", ".oWSSsCcVCsSSso.", "oWSSSsCcVCsSSSso", "oWSSsSCccCSsSSso", "oWSsSSCcVCSSsSso", "oWcSScCcVCcSScWo", "oCVcCVCccCVCcVCo", "qQCVVCQccQCVVCQq", "qVVCVVCVVCVVCVVq", ".qqqqqqqqqqqqqq."];
  var ve = ["..oWSSSsSSSSso..", "..oWSSSsSSSSso..", "..oWSSSsSSSSso..", "..oWSSSsSSSSso..", "..oWSSSsSSSSso..", "..oWSSSsSSSSso..", "..oWSSSsSSSSso..", "..oWSSSsSSSSso..", ".oWSSSSsSSSSSso.", ".oWSsSSsSSSsSso.", ".oWSSsSsSSsSSso.", "oWSSSsSSsSSSsSso", "oWSSsSSSsSSSsSso", "oWSsSSSSsSSSSsso", "oWcSScSSsSScScWo", "oCVcCVCSsCVCcVCo", "qQCVVCQCCQCVVCQq", "qVVCVVCVVCVVCVVq", ".qqqqqqqqqqqqqq."];
  var ye = ["...oCCCCCCo...", ".oSoCCCCCCoSo.", "oSWSSSSSSSSsso", "oSWSSSSSSSSsso", "oSWSSSSSSSSsso", "oSWSSSSSSSSsso", "oSWSSSSSSSSsso", "oSWSSSSSSSSsso", "oSWSSSSSSSSsso", ".oWSSSSSSSSso.", ".oWSSSsSSSSso.", ".oWSsSSsSSsso.", ".xJiJJJJJJiJx.", ".xjJJJJJJJJjx.", ".xXjjjjjjjjXx.", ".oWSSSssSSSso.", ".oWSSSssSSSso."];
  var Le = ["....oC..Co..", "..oSoCVVCo..", "..oSWSCVVCSo", "..oSWSSrVCro", "..oSWSSSrCVo", "..oSWSSSSaAo", "..oSWSSSSAao", "..oSWSSSSSCo", "..oSWSSSSSCo", "..oWSSSSSSCo", "..oWSSSSsSCo", "..oWSSsSSSCo", "..xJiJJJJXJx", "..xjJJJJXiXJ", "..xXjjjjjXjx", "..oWSSSSSSCo", "..oWSSSSSSCo"];
  var Ce = ["...oWSSSSSSCcV.", "...oWSSSSSSCcV.", "...oWSSSSSSCcV.", "...oWSSSSSSCcV.", "...oWSSSSSSCcV.", "...oWSSSSSSCcV.", "...oWSSSSSSCcV.", "...oWSSSSSSCcV.", "..oWSSSSSSSCcVo", "..oWSsSSSSSCcVo", "..oWSSsSSSSCcVo", ".oWSSSsSSSCccVo", ".oWSSsSSSSCcVVo", ".oWSsSSSSSCcVCo", ".oWcSScSScCcVco", ".oCVcCVCcVCcVCo", ".qQCVVCQCVVCcVq", ".qVVCVVCVVCVVCq", "..qqqqqqqqqqqqq"];
  var je = [".....oWSSCcVCSSso.....", "....oWSSSCcVCSSSso....", "...oWSSSSCcVCSSSSso...", "..oWSSsSSCcVCSSsSSso..", ".oWSSSsSSCcVCSSsSSSso.", "oWSSsSSsSCcVCSsSSsSSso", "oWcSScSSSCcVCSSScSScWo", "oCVcCVCcVCccCVcCVCcVCo", "qQCVVCQCVVCcQCVVCQCVQq", "qVVCVVCVVCVVCVVCVVCVVq", ".qqqqqqqqqqqqqqqqqqqq."];
  var Ae = [".....oWSSSsSSSSso.....", "....oWSSSSsSSSSSso....", "...oWSSSSSsSSSSSSso...", "..oWSSsSSSsSSSSsSSso..", ".oWSSSsSSSsSSSSsSSSso.", "oWSSsSSsSSsSSSsSSsSSso", "oWcSScSSSSsSSSSScSScWo", "oCVcCVCcVCSsCVcCVCcVCo", "qQCVVCQCVVCCQCVVCQCVQq", "qVVCVVCVVCVVCVVCVVCVVq", ".qqqqqqqqqqqqqqqqqqqq."];
  var Qe = ["...oWSSSSSSCc.....", "..oWSSSSSSSCcV....", "..oWSSSSSSSSCcV...", ".oWSSsSSSSSSSCcVo.", ".oWSSSsSSSSSSSCcVo", "oWSSsSSsSSSSSSCcVo", "oWcSScSScSSScSCcVo", "oCVcCVCcVCcVCcCcVo", "qQCVVCQCVVCQCVCcVq", "qVVCVVCVVCVVCVVCVq", ".qqqqqqqqqqqqqqqqq"];
  function _e(S, e, a) {
    var s = e.material;
    var B = s.cloth;
    v(S, e, a, { C: { line: B.line, deep: B.shade, shade: "#7aa8b8", base: B.base, hi: B.hi, spark: "#e6f4f6" }, B: s.trim, T: s.pants, band: 2, ko: 6.6, up: -.6 });
  }
  function Ye(S, e) {
    return S.p.sit ? 57 : Math.min(57, e.foot - 5);
  }
  var Ee = ["...kCWWWWCk...", ".bSkKmKKmKkSb.", "bsHtKmWWmKtSsb", "bsHtmCWWCmtSsb", "bsStCOmmOCtSsb", "bsHtKmWWmKtSsb", "bsHtmCWWCmtSsb", "bsStCOmmOCtssb", "bsHtKmWWmKtSsb", "bsStmcCCcmtssb", "bsStcOmmOctSsb", "bsStKmCCmKtssb", "bBstKmmmmKtsBb", "bHlHHoCWoHlHHb", "bBsSSOCCOsSSBb", "bSHSSoWCoSHSSb", "bBBsBBOOBBBsBb"];
  var qe = ["...kCWWWWCk...", ".bSkKKKKKKkSb.", "bsSHSoCWoSSSsb", "bsSHSScCSSSSsb", "bsSHoCWWCoSSsb", "bsHSSScCSSSSsb", "bsSHSoCWoSSSsb", "bsSSSScCSSSssb", "bsSHSoCWoSSSsb", "bsSSSScCSSSssb", "bsSHSSoWoSSSsb", "bsSSSScCSSSssb", "bBsSSSSOSSSsBb", "bHlHHHlHHHlHHb", "bBsSSBsSSBsSBb", "bSHSSSHSSSHSSb", "bBBsBBBsBBBsBb"];
  var Ke = ["....kCWWCk..", "...bkKmmKkb.", "..bsSSHStmWb", "..bsSHSStCWb", "..bsSSHStOmb", "..bsSHSStmWb", "..bsSSHStCWb", "..bsSHSStOmb", "..bsSSHStmWb", "..bsSHSStcCb", "..bsSSHStOmb", "..bsSHSStmCb", "..bBsSSStmmb", "..bHlHHHlHHb", "..bBsSSBsSBb", "..bSHSSSHSSb", "..bBBsBBBsBb"];
  var Ue = ["..bsHSt", "..bsHSt", "..bsHSt", "..bsHSt", "..bsHSt", "..bsHSt", "..bsHSt", "..bsHSt", ".bsSHSt", ".bsSHSt", ".bsHSSt", ".bsSHSt", "bsSSHSt", "bsSHSSt", "bsoCWot", "bsSHSSt", "bsSSHSt", "tTTTTTt", "bBBBBBb", ".bbbbb."];
  var Xe = ["..bsSHSSSSSt..", "..bsSHSSSSSt..", "..bsSHSSSSSt..", "..bsSHSSSSSt..", "..bsSHSSSSSt..", "..bsSHSSSSSt..", "..bsSHSSSSSt..", "..bsSHSSSSSt..", ".bsSHSSSSSSt..", ".bsSHSSSSSSt..", ".bsSSHSSSSSt..", ".bsSHSSSSSSt..", "bsSSHSSSSSSt..", "bsSHSSSSSSSt..", "bsSSoCWoSSSt..", "bsSHSSSSSSSt..", "bsSSHSSSSSSt..", "tTTTTTTTTTTt..", "bBBBBBBBBBBb..", ".bbbbbbbbbb..."];
  function Re(S, e, a) {
    var s = e.material;
    var B = s.cloth;
    v(S, e, a, { C: { line: B.line, deep: B.deep, shade: "#2378b8", base: B.base, hi: "#4aaae0", spark: B.spark }, B: s.ink, T: s.trim, W: s.bone, band: 2, ko: 6.8, up: 3.2 });
  }
  function ze(S, e) {
    return S.p.sit ? 57 : Math.min(58, e.foot - 5);
  }
  var Ve = { down: [[2, 4, "#326d9d"]], left: [[1, 4, "#19233a"], [2, 4, "#293a54"], [3, 4, "#19233a"], [4, 10, "#326d9d"], [5, 10, "#326d9d"], [6, 10, "#19233a"], [1, 11, "#19233a"], [3, 11, "#326d9d"], [2, 12, "#19233a"], [0, 23, "#326d9d"]], right: [[1, 4, "#19233a"], [2, 4, "#293a54"], [3, 4, "#19233a"], [2, 11, "#326d9d"], [3, 11, "#326d9d"], [2, 12, "#326d9d"], [0, 23, "#326d9d"]], up: [[4, 5, "#293a54"], [5, 5, "#293a54"], [2, 10, "#293a54"], [3, 11, "#293a54"], [10, 23, "#293a54"], [11, 24, "#293a54"]] };
  function Fe(S, a, s) {
    var B = a.arms[s];
    var o = w(B);
    var n = h(B);
    var i = a.material.cloth;
    var O = a.material.trim;
    var t = a.material.accent;
    var r = n.x - o.x;
    var d = n.y - o.y;
    var b = Math.sqrt(r * r + d * d) || 1;
    var l = r / b;
    var f = d / b;
    var c = -f;
    var G = l;
    var H = n.x - 4 * l;
    var g = n.y - 4 * f;
    var x = 0 === s && !B.front;
    u(S, [[o.x + 2 * c, o.y + 2 * G], [o.x - 2 * c, o.y - 2 * G], [H - 5 * c, g - 5 * G], [H + 5 * c, g + 5 * G]], i.line);
    u(S, [[o.x + c, o.y + G], [o.x - c, o.y - G], [H - 4 * c, g - 4 * G], [H + 4 * c, g + 4 * G]], x ? i.deep : i.base);
    e.fatLine(S, Math.round(H - 4 * c), Math.round(g - 4 * G), Math.round(H + 4 * c), Math.round(g + 4 * G), 2, t.shade);
    e.line(S, Math.round(H - 5 * c), Math.round(g - 5 * G), Math.round(H + 5 * c), Math.round(g + 5 * G), O.shade);
    e.line(S, Math.round(o.x + 2 * c), Math.round(o.y + 2 * G), Math.round(H + 4 * c), Math.round(g + 4 * G), O.deep);
    for (var D = -1; D <= 1; D += 2) {
      var W = H - 3 * l + c * D * 2;
      var J = g - 3 * f + G * D * 2;
      e.line(S, Math.round(W - l), Math.round(J - f), Math.round(W + c), Math.round(J + G), O.base);
      e.dot(S, Math.round(W + l), Math.round(J + f), O.deep);
    }
    var M = Math.round(o.x);
    var N = Math.round(o.y);
    u(S, [[M - 3, N], [M, N - 2], [M + 3, N], [M + 3, N + 3], [M, N + 5], [M - 3, N + 3]], i.line);
    e.line(S, M - 3, N, M, N - 2, O.shade);
    e.line(S, M, N - 2, M + 3, N, O.hi);
    e.line(S, M - 2, N + 1, M, N, O.base);
    e.line(S, M, N, M + 2, N + 1, O.base);
    e.dot(S, M - 1, N + 2, O.deep);
    e.dot(S, M + 1, N + 2, O.hi);
    e.line(S, M - 2, N + 3, M + 2, N + 3, O.shade);
    e.line(S, M - 3, N + 5, M + 2, N + 6, t.base);
  }
  function Pe(S, a, s) {
    var B = a.arms[s];
    var o = w(B);
    var n = h(B);
    var i = a.material.cloth;
    var O = a.material.trim;
    var t = n.x - o.x;
    var r = n.y - o.y;
    var d = Math.sqrt(t * t + r * r) || 1;
    var b = t / d;
    var l = r / d;
    var f = -l;
    var c = b;
    var G = 0 === s && !B.front;
    var H = n.x - 4 * b;
    var g = n.y - 4 * l;
    u(S, [[o.x + 3 * f, o.y + 3 * c], [o.x - 3 * f, o.y - 3 * c], [H - 5 * f, g - 5 * c], [H + 5 * f, g + 5 * c]], G ? i.deep : i.base);
    u(S, [[o.x + 2 * f, o.y + 2 * c], [o.x - 2 * f, o.y - 2 * c], [H - 3 * f, g - 3 * c], [H + 3 * f, g + 3 * c]], G ? i.shade : i.hi);
    e.fatLine(S, Math.round(H - 5 * f), Math.round(g - 5 * c), Math.round(H + 5 * f), Math.round(g + 5 * c), 2, "#eef2ef");
    e.line(S, Math.round(H - 4 * f), Math.round(g - 4 * c), Math.round(H + 4 * f), Math.round(g + 4 * c), "#ffffff");
    e.line(S, Math.round(o.x + 2 * b), Math.round(o.y + 2 * l), Math.round(H - b), Math.round(g - l), O.base);
    e.line(S, Math.round(o.x + 5 * b), Math.round(o.y + 5 * l), Math.round(H - 2), Math.round(g - 2), i.hi);
    var x = Math.round(o.x);
    var D = Math.round(o.y);
    var W = s ? 1 : -1;
    u(S, [[x - 2 * W, D + 1], [x + 2 * W, D - 3], [x + 5 * W, D - 2], [x + 3 * W, D + 2], [x + 1 * W, D + 4]], O.deep);
    e.line(S, x + W, D - 2, x + 4 * W, D - 2, O.hi);
    e.dot(S, x + 3 * W, D + 1, O.base);
  }
  function Te(S) {
    var e = S.material;
    var a = {};
    k(a, "oOsSh", e.cloth);
    k(a, "NngGY", e.trim);
    k(a, "qQcCW", e.accent);
    k(a, "xXjJi", e.pants);
    a.k = "#171521";
    a.r = "#ff5a3c";
    return m(a, S);
  }
  var Ze = ["...oC....Co...", ".oOsCW..WCsOo.", ".oOSCW..WCSOo.", "oOsSCW..WCSsOo", "oOsSsCWWCsSsOo", "oOsSShCWhSSsOo", "oOsSSsCWsSSSOo", "oOsSSssGsSSSOo", "oOshSssGsSShOo", "oOshSssGsSShOo", "oOsgSssGsSgsOo", "oOsGgssGsgGsOo", "oOsgSssGsSgsOo", "oOsSsSsGSsSsOo", "oNGGGGGGGGGGNo", "okkGkkkkkkGkko", "oNnnnnnnnnnnNo"];
  var Ie = ["...oGGGGGGo...", ".oOsSSSSSSsOo.", "oOsShSSSSShsOo", "oOsShSSSSShsOo", "oOsShSSSSShsOo", "oOsShSSSSShsOo", "oOsShSSSSShsOo", "oOsShSSSSShsOo", "oOsSSSSssSSSOo", "oOsSSSSssSSSOo", "oOsSSSSssSSSOo", "oOsSSSSssSSSOo", "oOsSSSSssSSSOo", "oOsSSSSssSSSOo", "oNGGGGGGGGGGNo", "okkGkkkkkkGkko", "oNnnnnnnnnnnNo"];
  var $e = ["...oC...Co..", "..oOsC.CsOo.", "..oOsSSSCWo.", "..oOsSSSgCWo", "..oOsSSSgCWo", "..oOshSSgCWo", "..oOshSSgCWo", "..oOshSSgCWo", "..oOshSSgCWo", "..oOsSgSgCWo", "..oOsgGSgCWo", "..oOsSgSgCWo", "..oOsSSSgCWo", "..oOsSSSgCWo", ".oNGGGGGGNG.", ".okSkkSkkGYG", ".oNnnnnnNg.."];
  var Sa = ["..NGGN..", ".NYGGgN.", "NGgkkgGN", "NGkrrkgN", "NGkrrkgN", "NGgkkggN", ".NgGGgN.", "..NggN.."];
  var ea = ["..oSSsGcCCcGsSSo..", "..oSSsGcCCcGsSSo..", "..oSSsGcCCcGsSSo..", "..oSSsGcCCcGsSSo..", "..oSSsGcCCcGsSSo..", "..oSSsGcCCcGsSSo..", "..oSSsGcCCcGsSSo..", "..oSSsGcCCcGsSSo..", ".oSgSGXcCCcXGSgSo.", ".ogGSGXcCCcXGSGgo.", ".ogGgGXcCCcXGgGgo.", "oSgGgGXcCCcXGgGgSo", "ogGYgGXcCCcXGgYGgo", "oGYGgGXcCCcXGgGYGo", "ogGYgGXcCCcXGgYGgo", "oSgGgGXcCCcXGgGgSo", "oSSgSGXcCCcXGSgSSo", "oSSSSGXcCCcXGSSSSo", "oGGGGGGcCCcGGGGGGo", "onnnnnnqqqqnnnnnno"];
  var aa = ["..oSShSSssSShSSo..", "..oSShSSssSShSSo..", "..oSShSSssSShSSo..", "..oSShSSssSShSSo..", "..oSShSSssSShSSo..", "..oSShSSssSShSSo..", "..oSShSSssSShSSo..", "..oSShSSssSShSSo..", ".oSSShSSssSShSSSo.", ".oSSShSSssSShSSSo.", ".oSSShSSssSShSSSo.", "oSSSShSSssSShSSSSo", "oSSSgSSSssSSSgSSSo", "oSSgGgSSssSSgGgSSo", "oSgGYGSSssSSGYGgSo", "oSgGYGgSssSgGYGgSo", "oSgGGGgSssSgGGGgSo", "oSSgGgSSssSSgGgSSo", "oGGGGGGGssGGGGGGGo", "onnnnnnnnnnnnnnnno"];
  var sa = ["...oSSSsSsGcCo.", "...oSSSsSsGcCo.", "...oSSSsSsGcCo.", "...oSSSsSsGcCo.", "...oSSSsSsGcCo.", "...oSSSsSsGcCo.", "...oSSSsSsGcCo.", "...oSSSsSsGcCo.", "..oSSSSsSsGcCo.", "..oSSSSsSsGcCo.", "..oSSSSsSsGcCo.", "..oSSSSsSsGcCo.", "..oSShSsSsGcCo.", ".oSSgSsSsSGcCo.", ".oSgGgSsSsGcCo.", ".oSgGYgSsSGcCo.", ".oSgGGgSsSGcCo.", ".oSSgGgSsSGcCo.", ".oGGGGGGGGGGCo.", ".onnnnnnnnnnno."];
  var Ba = ["Y........", "GY.......", "GgY.Y....", "NGgNGY...", "NgGgNGgW.", "NgGYNGGgW", "NnGGGGGgN", "NngGYGggN", ".NnggGgnN", "..NNnnNN."];
  var oa = ["Y.......", "GY......", "GgY.Y...", "NGgGGY..", "NgGGGgW.", "NgGYGGgW", "NnGGGGgN", ".NnggGnN", "..NNnnN."];
  function na(S, e, s) {
    var B = e.material;
    var o = v(S, e, s, { C: B.cloth, B: B.accent, T: B.trim, W: { line: "#0c0a12", deep: "#171521", shade: "#241f31", base: "#312a42", hi: "#4b4160" }, band: 2, ko: 6.4, up: 3 });
    var n = B.trim;
    if (!(o.far)) {
      o.ln(.34 * o.L, .3 * o.ko, .46 * o.L, .46 * o.ko, n.base);
      o.ln(.46 * o.L, .46 * o.ko, .58 * o.L, .34 * o.ko, n.shade);
      o.dt(.46 * o.L, .4 * o.ko, n.hi);
      o.dt(.3 * o.L, .26 * o.ko, n.shade);
    }
    (function (S, e, s) {
      var B = Te(e);
      if (e.g.side) {
        if (1 !== s) {
          return;
        }
        as(S, e.g.arms[1].x - 2, a.ARM_Y - 7 + e.dy, oa, B, !1);
      }
      else {
        var o = e.g.arms[s].x + 1;
        var n = a.ARM_Y + e.dy;
        if (0 === s) {
          as(S, o - 5, n - 8, Ba, B, !1);
        }
        else {
          as(S, o + 5, n - 8, Ba, B, !0);
        }
      }
    })(S, e, s);
  }
  function ia(S, e) {
    return S.p.sit ? 57 : Math.min(57, e.foot - 4);
  }
  function Oa(S, a, s) {
    var B = w(a.arms[s]);
    var o = h(a.arms[s]);
    var n = a.material.accent;
    var i = o.x - B.x;
    var O = o.y - B.y;
    var t = Math.sqrt(i * i + O * O) || 1;
    var r = i / t;
    var d = O / t;
    var b = -d;
    var l = r;
    var f = B.x + 4 * r;
    var c = B.y + 4 * d;
    var G = o.x - 2 * r;
    var H = o.y - 2 * d;
    e.fatLine(S, Math.round(f), Math.round(c), Math.round(G), Math.round(H), 4, n.line);
    e.fatLine(S, Math.round(f), Math.round(c), Math.round(G), Math.round(H), 3, n.base);
    for (var g = 4; g < t - 2; g += 3) {
      var x = B.x + r * g;
      var D = B.y + d * g;
      e.line(S, Math.round(x - b), Math.round(D - l), Math.round(x + b + r), Math.round(D + l + d), n.deep);
      e.dot(S, Math.round(x + b), Math.round(D + l), n.hi);
    }
    e.fatLine(S, Math.round(f - b), Math.round(c - l), Math.round(f + b), Math.round(c + l), 2, n.hi);
  }
  function ta(S, a, s) {
    var B = a.head;
    var o = B.x;
    var n = B.y;
    var i = B.w;
    var O = o + Math.floor(i / 2);
    var t = a.g.side;
    var h = a.g.back;
    var r = 0 | a.p.leg;
    var d = "#11131f";
    var b = "#24273d";
    var l = "#34394f";
    var f = "#565d76";
    var c = "#a60e34";
    var G = "#e32148";
    if ("back" === s && !h || "front" === s && h) {
      var H = t ? o - 4 : o - 3;
      var g = t ? 13 : i + 6;
      var x = n + 34;
      u(S, [[H + 3, n + 3], [H + g - 3, n + 3], [H + g, n + 12], [H + g - 1, n + 19], [H + g + 2 + r, n + 25], [H + g - 2 + r, n + 24], [H + g + r, n + 30], [H + g - 4 + r, n + 28], [H + g - 3 + r, x], [H + g - 7 + r, x - 3], [H + 5 + r, x], [H + 3 + r, x - 5], [H + r, x - 3], [H + 1, n + 17]], d);
      for (var D = 0; D < 4; D++) {
        var W = H + 3 + 3 * D;
        var J = n + 8 + D;
        u(S, [[W, J], [W + 2, J - 1], [W + 4 + r, n + 23], [W + 3 + r, x - 3], [W + r, x - 7], [W + 1 + r, n + 22]], D % 2 ? l : b);
        e.line(S, W + 1, J + 3, W + 2 + r, n + 22, f);
      }
      e.line(S, H + 1, n + 14, H + r, n + 24, c);
      e.line(S, H + r, n + 24, H + 3 + r, x - 1, G);
      e.line(S, H + g - 3, n + 13, H + g + r, n + 25, c);
      e.line(S, H + g + r, n + 25, H + g - 3 + r, x - 2, G);
    }
    if ("back" !== s) {
      if (u(S, [[o - 1, n + 6], [o - 2, n + 1], [o + 2, n - 1], [O, n - 3], [O + 2, n - 1], [o + i, n], [o + i + 1, n + 6], [o + i - 2, n + 9], [O, n + 4], [o + 1, n + 9]], d), e.line(S, o, n + 3, O, n - 1, l), e.line(S, o + 2, n + 3, O, n, f), e.line(S, O + 2, n, o + i - 1, n + 4, l), h) {
        e.line(S, O, n - 3, O, n + 13, G);
        e.line(S, O, n + 13, O + 5, n + 24, c);
        e.line(S, o, n + 4, o - 2, n - 2, G);
        return void e.line(S, o + i - 1, n + 4, o + i + 1, n - 2, G);
      }
      if (t) {
        u(S, [[o, n + 6], [o + 3, n + 7], [o + 2, n + 17], [o + 4, n + 25], [o, n + 29], [o + 1, n + 20], [o - 2, n + 22]], b);
        e.line(S, o + 1, n + 8, o + 1, n + 21, f);
        var M = o + i - 2;
        u(S, [[M - 5, n + 8], [M + 1, n + 6], [M + 2, n + 11], [M + 3, n + 13], [M, n + 14], [M - 3, n + 12]], c);
        e.line(S, M - 4, n + 8, M + 1, n + 10, G);
        u(S, [[M - 4, n + 9], [M - 2, n + 5], [M + 2, n - 4], [M, n + 4], [M - 1, n + 9]], G);
        e.line(S, M - 2, n + 6, M + 1, n - 2, "#ff6a79");
        e.line(S, M - 1, n + 10, M + 1, n + 10, d);
        e.dot(S, M, n + 10, "#fff3e9");
      }
      else {
        var w = 0;
        var N = -3;
        if (!h && "down" === a.dir) {
          if (!ta._maskAnchorLoaded) {
            var p = {};
            try {
              p = JSON.parse(localStorage.getItem("pntt.mask-editor.v1") || "{}").__anchor_down || {};
            }
            catch (S) {
            }
            ta._maskAnchor = { x: "number" == typeof p.x ? 0 | p.x : 0, y: "number" == typeof p.y ? 0 | p.y : -3 };
            ta._maskAnchorLoaded = !0;
          }
          w = ta._maskAnchor.x;
          N = ta._maskAnchor.y;
        }
        for (var k = o + w, m = n + N, v = k + Math.floor(i / 2), y = 0; y < 2; y++) {
          var L = y ? 1 : -1;
          var C = y ? o + i - 1 : o;
          e.fatLine(S, C, n + 7, C + L, n + 22, 2, b);
          e.line(S, C, n + 9, C + L, n + 20, l);
        }
        for (u(S, [[k, m + 7], [v, m + 10], [k + i - 1, m + 7], [k + i - 2, m + 13], [v + 2, m + 14], [v, m + 17], [v - 2, m + 14], [k + 1, m + 13]], c), e.line(S, k + 1, m + 8, v, m + 11, G), e.line(S, v, m + 11, k + i - 2, m + 8, G), y = 0; y < 2; y++) {
          var j = v + 4 * (L = y ? 1 : -1);
          u(S, [[j - L, m + 9], [j + L, m + 6], [j + 3 * L, m - 2], [j + 3 * L, m + 2], [j + L, m + 10]], G);
          e.line(S, j + L, m + 6, j + 3 * L, m - 1, "#ff6a79");
          e.line(S, v + 2 * L, m + 12, v + 4 * L, m + 11, d);
          e.dot(S, v + 3 * L, m + 12, "#fff3e9");
        }
        e.dot(S, v, m + 13, G);
      }
    }
  }
  function ha(S) {
    var e = S.material;
    var a = {};
    k(a, "oOsSh", e.cloth);
    k(a, "NngGY", e.trim);
    k(a, "qQcCW", e.accent);
    k(a, "xXjJi", e.pants);
    a.k = "#0a0c11";
    a.e = "#6f7e93";
    return m(a, S);
  }
  var ra = ["...oG....Go...", ".oOsGQ..QGsOo.", ".oOWCGQQGsSSOo", "oOWCCGQQGSSSOo", "oOWCcGQQGSSSOo", "oOWCCcGQGSSSOo", "oOWCCcCGSSSSOo", "oOWCCCcGhSSSOo", "oOWCCCcGSSSSOo", "oOWCCCcGSSSsOo", "oOWCCCcGSSSsOo", "oOWCCCcGSSSsOo", "oOWCCCcGSSSsOo", "oOWCCcCGSSsSOo", "oNGGGGGGGGGGNo", "okSGSSsSsSGSko", "oNnnnnnnnnnnNo"];
  var da = ["...oGGGGGGo...", ".oOsSSSSSSsOo.", "oOsGSSSSSSGsOo", "oOsSGSSSSGSsOo", "oOsSSGSSGSSsOo", "oOsSSSGGSSSsOo", "oOshSSSsSSSsOo", "oOshSSSsSSSsOo", "oOshSSSsSSSsOo", "oOshSSSsSSSsOo", "oOshSSSsSSSsOo", "oOshSSSsSSSsOo", "oOshSSSsSSSsOo", "oOsSSSSsSSSsOo", "oNGGGGGGGGGGNo", "okSGSSSSSSGSko", "oNnnnnnnnnnnNo"];
  var ba = ["...oG...Go..", "..oOsG.GsOo.", "..oOsSSSCWo.", "..oOsSSSGCco", "..oOsSSSGCco", "..oOsSSSGCco", "..oOshSSGCco", "..oOshSSGCco", "..oOshSSGCco", "..oOshSSGCco", "..oOshSSGCco", "..oOshSSGCco", "..oOshSSGCco", "..oOsSSSGCco", ".oNGGGGGGNG.", ".oksSSsSSGYG", ".oNnnnnnnNg."];
  var la = ["..NGGN..", ".NYGGgN.", "NGWWkkGN", "NGWkWkgN", "NGWkWkgN", "NGWWkkgN", ".NgGGgN.", "..NggN.."];
  var fa = ["..NGcCWgXXgWCcGN..", "..NGcCWgXXgWCcGN..", "..NGcCWgXXgWCcGN..", "..NGcCWgXXgWCcGN..", "..NGcCWgXXgWCcGN..", "..NGcCWgXXgWCcGN..", "..NGcCWgXXgWCcGN..", "..NGcCWgXXgWCcGN..", ".NGcCCWgXXgWCCcGN.", ".NGcCCWgXXgWCCcGN.", ".NGcCCWgXXgWCCcGN.", "NGcCCCWgXXgWCCCcGN", "NGcCCCWgXXgWCCCcGN", "NGCQQQCgXXgCQQQCGN", "NGQCCCQgXXgQCCCQGN", "NGQCQQCgXXgCQQCQGN", "NGCQCCCgXXgCCCQCGN", "NgGGGGGgXXgGGGGGgN", "NnnnnnnnXXnnnnnnnN", ".NNNNNNN..NNNNNNN."];
  var ca = ["..NGcCWCccCWCcGN..", "..NGcCWCccCWCcGN..", "..NGcCWCccCWCcGN..", "..NGcCWCccCWCcGN..", "..NGcCWCccCWCcGN..", "..NGcCWCccCWCcGN..", "..NGcCWCccCWCcGN..", "..NGcCWCccCWCcGN..", ".NGcCCWCccCWCCcGN.", ".NGcCCWCccCWCCcGN.", ".NGcCCWCccCWCCcGN.", "NGcCCCWCccCWCCCcGN", "NGcCCCWCccCWCCCcGN", "NGCQQQCCccCCQQQCGN", "NGQCCCQCccCQCCCQGN", "NGQCQQCCccCCQQCQGN", "NGCQCCCCccCCCCQCGN", "NgGGGGGGggGGGGGGgN", "NnnnnnnnNNnnnnnnnN", ".NNNNNNN..NNNNNNN."];
  var Ga = ["...NGcCCCCCgWN.", "...NGcCCCCCgWN.", "...NGcCCCCCgWN.", "...NGcCCCCCgWN.", "...NGcCCCCCgWN.", "...NGcCCCCCgWN.", "...NGcCCCCCgWN.", "...NGcCCCCCgWN.", "..NGcCCCCCCgWN.", "..NGcCCCCCCgWN.", "..NGcCCCCCCgWN.", "..NGcCCCCCCgWN.", "..NGcCCCCCCgWN.", ".NGcQQCCCCCgWN.", ".NGQcCQCCQQgWN.", ".NGQcQCCQCCgWN.", ".NGcQQCCCQQgWN.", ".NgGGGGGGGGgWN.", ".NnnnnnnnnnnWN.", "..NNNNNNNNNNNN."];
  var Ha = ["NG........", "NYG.......", "NYCGN.....", "NGCCCGN...", "NGcCCcCGN.", "NGcccCccGN", ".NggGGgggN"];
  var ga = ["NG........", "NYG.......", "NYSGN.....", "NGSSSGN...", "NGsSSsSGN.", "NGsssSssGN", ".NggGGgggN"];
  var xa = [".NGG....", "NYGGN...", "NYSSGN..", "NGSSsGN.", "NGsSssGN", "NGsssssN", ".NggggN."];
  function Da(S, e, s) {
    var B = e.material;
    var o = B.cloth;
    y(S, e, s, { C: { line: o.line, deep: o.deep, shade: o.shade, base: o.base, hi: o.hi }, B: { line: "#06080c", deep: "#0e121a", shade: "#171d27", base: "#1f2631", hi: "#3a4555" }, T: B.trim });
    (function (S, e, s) {
      var B = ha(e);
      if (e.g.side) {
        if (1 !== s) {
          return;
        }
        as(S, e.g.arms[1].x - 2, a.ARM_Y - 4 + e.dy, xa, B, !1);
      }
      else {
        var o = e.g.arms[s].x + 1;
        var n = a.ARM_Y + e.dy;
        if (0 === s) {
          as(S, o - 6, n - 4, Ha, B, !1);
        }
        else {
          as(S, o + 6, n - 4, ga, B, !0);
        }
      }
    })(S, e, s);
  }
  function Wa(S, e) {
    return S.p.sit ? 57 : Math.min(57, e.foot - 4);
  }
  var Ja = ["........o..oo..o......", ".......oSooHHooSo.....", "......oSSoSHhSooSSo...", ".....oSSsSSHhSSsSSo...", "....oSsSSShHhSSSsSSo..", "....oSsSSSShHSSSSsSo..", "....oSSsSSShHSSSsSSo..", "....oSsSSSSnNSSSSsSo..", "....oSsSSSsSSsSSSsSo..", "....oSsSs..Sh..sSsSo..", "....oSs....Ss....sSo..", "....oSs..........sSo..", "....oHs..........sHo..", "...oss............sso.", "....oSs..........sSo..", "....oSs..........sSo..", ".....oHs........sHo...", "....oss..........sso..", "....oSs..........sSo..", "...oSs............sSo.", "....oHs..........sHo..", "....oss..........sso..", ".....oSs........sSo...", "....oSs..........sSo..", ".....os..........so...", ".....o............o...", "......o..........o....", "......o..........o...."];
  var ua = [".....o..oo..o.......", "....oSooHHooSo......", "...oSSSHhSSSso......", "...oSSsSSHhSSSSso...", "...oSsSSShHhSSSSso..", "...oSSsSSShHSSSSso..", "...oSsSSSShHSSSSso..", "...oSsSSSSSSSSnNo...", "...oSsSSSSsSSs......", "...oSsSSSsS.........", "...oSsSSSS..........", "...oSsSSSs..........", "...oSHsSSs..........", "...oSsSSSs..........", "....oSHSSs..........", ".....oSSSs..........", "......oSHs..........", ".......oSs..........", ".......os..........."];
  var Ma = [".....oSsSHhSo...........", ".....oSsSHhSo...........", "....oSsSHhSo............", "....oSsSHhSo............", "....osSHhSSo............", "....osSHhSSo............", "...osSHhSSo.............", "...osSHhSSo.............", "...oSsSHhSo.............", "...oSsSHho..............", "..oSsSHho...............", "..oSsSHho...............", "..osSHhSo...............", "..osSHhSo...............", "..osSHhSo...............", "..osSHhSo...............", "..oSsSHho...............", "..oSsSHho...............", "..oSsSHho...............", "..oSsSHho...............", "..osSHhSo...............", "..osSHhSo...............", "..osSHhSo...............", "..osSHhSo...............", "..oSsSHho...............", "..oSsSHo................", "...oSsSo................", "...oHho.................", "....oSo.................", "....oo..................", "....oo.................."];
  var wa = [".....oSsSHhSSso.....", ".....oSsSHhSSso.....", ".....oSsSHhSSso.....", ".....oSsSHhSSso.....", ".....osSHhSSsSo.....", ".....osSHhSSsSo.....", "......osSHhSSo......", "......osSHhSSo......", "......oSsSHhSo......", "........osSo........", "........oSHo........"];
  var Na = ["........o..oo..o......", ".......oSooHHooSo.....", "......oSSoSHhSooSSo...", ".....oSsSHhSSsSHhSo...", "....oSsSHhSSsSHhSSso..", "....oSsSHhSSsSHhSSso..", "....oSsSHhSSsSHhSSso..", "....osSHhSSsSHhSSsSo..", ".....osSHhSSsSHhSSo...", ".....osSHhSSsSHhSSo...", ".....osSHhSSsSHhSSo...", ".....oSsSHhSSsSHhSo...", ".....oSsSHhSSsSHhSo...", ".....oSsSHhSSsSHhSo...", ".....oSsSHhSSsSHhSo...", ".....osSHhSSsSHhSSo...", ".....osSHhSSsSHhSSo...", ".....osSHhSSsSHhSSo...", ".....osSHhSSsSHhSSo...", ".....oSsSHhSSsSHhSo...", ".....oSsSHhSSsSHhSo...", "......oSsSHhSSsSHo....", "......oSsSHhSSsSHo....", "......osSHhSSsSHho....", "......osSHhSSsSHho....", "......osSHhSSsSHho....", "......osSHhSSsSHho....", "......oSsSHhSSsSo.....", ".......oSsSHhSSso.....", "........oSsSHhSSo.....", "........oSsSHhSo......", "........osSHhSo.......", ".........osSHho.......", ".........osSHho.......", "......oSo..oSSo.oSo...", "......oo...oSSo.oo....", "............oo........"];
  var pa = ["..........ohHo........", ".........oShHSo.......", ".........kkGkkk.......", "......ooSShHhSSSoo....", ".....ooSShHhhSSSSoo...", "....oSSsShHhHhSSSsSo..", "....oSsSShHhhHSSSsSo..", "....oSSsSShHHhSSsSSo..", "....oSsSSSs..sSSSsSo..", "....oSsSS......SSsSo..", "....oSs..........sSo..", "....oSs..........sSo..", "....ohs..........sho..", "...oSs............sSo.", "....oss..........sso..", "....oSs..........sSo..", ".....ohs........sho...", "....oSs..........sSo..", ".....os..........so...", ".....o............o...", "......o..........o....", "......o..........o...."];
  var ka = ["......ohHo..........", ".....oShHSo.........", ".....kkGkkk.........", ".....ooSShHhSSSoo...", "....ooSShHhhSSSSoo..", "...oSSsShHhHhSSSso..", "...oSsSShHhhHSSSso..", "...oSSsSShHHhSSSo...", "...oSsSSSSsSs.......", "...oSsSSSsS.........", "...oSsSSSS..........", "...oSsSSSs..........", "...oSHsSSs..........", "...oSsSSSs..........", "....oSHSSs..........", ".....oSSSs..........", "......oSHs..........", ".......oSs..........", ".......os..........."];
  var ma = [".....oShHo........", ".....oShHo........", "....oShHo.........", "....oShHo.........", "...ohHSo..........", "...ohHSo..........", "..ohHSo...........", ".ohHSso...........", ".oShHSo...........", "oShHSo............", "oShHSo............", "oShHSo............", "ohHSso............", "ohHSso............", "ohHSso............", "ohHSso............", "oShHSo............", "oShHSo............", ".oShHSo...........", ".oShHSo...........", ".ohHSso...........", "..ohHSso..........", "..ohHSso..........", "..ohHSso..........", "...oShHSo.........", "....oShHo.........", "....oShHo.........", "....oSso..........", "..ohSo............", "...oSo............", "...oho............", "....oo............", "....oo............", "....oo............"];
  var va = [".....oShHSo.....", ".....oShHSo.....", ".....oShHSo.....", ".....oShHSo.....", ".....ohHSso.....", ".....ohHSso.....", ".....ohHSso.....", ".....ohHSso.....", ".....oShHSo.....", ".....oShHSo.....", ".....oShHSo....."];
  var ya = ["..........ohHo........", ".........oShHSo.......", ".........kkGkkk.......", "......oShHSshShHSo....", ".....oShHSshShHSsho...", "....ohHSshShHSshShHo..", "....ohHSshShHSshShHo..", "....ohHSshShHSshShHo..", ".....ohHSshShHSshSo...", ".....oShHSshShHSsho...", ".....oShHSshShHSsho...", ".....oShHSshShHSsho...", ".....oShHSshShHSsho...", ".....ohHSshShHSshSo...", ".....ohHSshShHSshSo...", ".....ohHSshShHSshSo...", ".....ohHSshShHSshSo...", ".....oShHSshShHSsho...", ".....oShHSshShHSsho...", ".....oShHSshShHSsho...", ".....oShHSshShHSsho...", "........ohHSshSo......", "........ohHSshSo......", "........ohHSshSo......", "........ohHSshSo......", "........oShHSsho......", "........oShHSsho......", "........oShHSsho......", "..........oShHSsho....", "..........ohHSsho.....", "..........ohHSso......", "...........ohHSo......", "............ohSo......", "..........oSo.........", "..........oo..........", "..........oo..........", "..........oo.........."];
  var La = { o: "#5a3f18", O: "#8a632c", s: "#c0953f", S: "#e9cf88", h: "#fff0c6", H: "#fffdf4", n: "#274f66", N: "#b8eced" };
  var Ca = { o: "#161c26", O: "#424e60", s: "#6c7d94", S: "#9fb0c6", h: "#c7d4e4", H: "#eff7ff", k: "#171c24", G: "#c6ad78" };
  function ja(S, e, a, s, B) {
    var o = e.head;
    var n = 0 | e.p.leg;
    var i = e.g.side;
    var O = e.g.back;
    var t = ss(e);
    var h = function (S, e) {
      return e < 0 || S < 0 || S > 31 || !(!t || !t(S, e));
    };
    function r(e, a, B, n) {
      as(S, o.x + (e[1] - a), o.y + (e[2] - 6), e[0], s, !1, B, n || h);
    }
    if ("back" !== a) {
      if (O) {
        r(B.U, 9, xB(n, 14, 22));
      }
      else {
        if (i) {
          r(B.S, 10, xB(HB(e), 12, 10));
        }
        else {
          r(B.F, 9, xB(n, 12, 16));
        }
      }
    }
    else {
      if (O) {
        return;
      }
      if (i) {
        r(B.BS, 10, xB(HB(e), 8, 12));
      }
      else {
        r(B.BD, 9, xB(n, 6, 12));
      }
    }
  }
  function Aa(S) {
    var e = S.material;
    var a = {};
    k(a, "bBsSHw", e.cloth);
    k(a, "NngGYy", e.trim);
    k(a, "qQcCW", e.accent);
    k(a, "xXjJi", e.pants);
    a.e = "#9cecff";
    a.E = "#2a8fc0";
    return m(a, S);
  }
  var Qa = ["...WG....GW...", ".bsSWG..GWSsb.", "bsHHSWGGWSSsBb", "bsHSSsGWHSSsBb", "bsSSsGWHSSSsBb", "bsSsGWHSSSSsBb", "bssGWHSSSSSsBb", "bsGWHSSSSSssBb", "bGWHSSSSSSsSBb", "bWHSSSSSSsSSBb", "bWSSSHSSsSSsBb", "bWsSHSSsSSHSBb", "bWSsSHSsSHSsBb", "bWsSsSsSsSsSBb", "xgGGGGGGGGGGgx", "xXjJiJjXjJiJXx", "xnggggggggggnx"];
  var _a = ["...WCCCCCCW...", ".bsSWCCCCWSsb.", "bsHSSSSSSSSsBb", "bsHSSSSSSSSsBb", "bsHSSSSSSSSsBb", "bsHSSSSSSSSsBb", "bsHSSSSSSSSsBb", "bsHSSSSSSSSsBb", "bsHSSSSSSSSsBb", "bsHSSSSSSSSsBb", "bsHSSSSsSSSsBb", "bsSHSSSsSSHsBb", "bsSsHSSsSHSsBb", "bssSsSsSsSsSBb", "xgGGGGGGGGGGgx", "xXjJiJjXjJiJXx", "xnggggggggggnx"];
  var Ya = ["..NGGN..", ".NYnnGN.", "NYnGGnGN", "GnGeEGnG", "GnGEeGnG", "NGnGGngN", ".NGnngN.", "..NggN.."];
  var Ea = ["..bsHSGWCGSSsb..", "..bsHSGWCGSSsb..", "..bsHSGWCGSSsb..", "..bsHSGWCGSSsb..", "..bsHSGWCGSSsb..", "..bsHSGWCGSSsb..", "..bsHSGWCGSSsb..", "..bsHSGWCGSSsb..", ".bsHSSGWCGSSSsb.", ".bsSHSGWCGSHSsb.", ".bsHSSGWCGSSSsb.", "bsSHSSGWCGSSHSsb", "bgggggGWCGgggggb", "bgSSSgGWCGgSSSgb", "bgSYSgGWCGgSYSgb", "bgSSSgGWCGgSSSgb", "bgggggGWCGgggggb", "NgGYGgNqqNgGYGgN", ".NNNNN.QQ.NNNNN."];
  var qa = ["..bsHSSGSSSsb...", "..bsHSSGSSSsb...", "..bsHSSGSSSsb...", "..bsHSSGSSSsb...", "..bsHSSGSSSsb...", "..bsHSSGSSSsb...", "..bsHSSGSSSsb...", "..bsHSSGSSSsb...", ".bsHSSSGSSSSsb..", ".bsSHSSGSSHSsb..", ".bsHSSSGSSSSsb..", "bsSHSSSGSSSHSsb.", "bgggggSGSgggggb.", "bgSSSgSGSgSSSgb.", "bgSYSgSGSgSYSgb.", "bgSSSgSGSgSSSgb.", "bgggggSGSgggggb.", "NgGYGgGGGgGYGgN.", ".NNNNNNNNNNNNN.."];
  var Ka = ["....WG..GW..", "..bsW..GWs..", "..bsSWGGWHb.", "..bsSSGWHSSb", "..bsSSWHSSSb", "..bsSHSSSSWb", "..bsSHSSSSWb", "..bsSHSSSSWb", "..bsSHSSSSWb", "..bsSHSSSsWb", "..bsSHSSsSWb", "..bsSHSsSSWb", "..bsSsSsSsWb", "..bssSsSsSWb", ".xgGGGGGGNG.", ".xXjJiJjNeG.", ".xnggggggNg."];
  var Ua = ["...bsHSSSSSGWb.", "...bsHSSSSSGWb.", "...bsHSSSSSGWb.", "...bsHSSSSSGWb.", "...bsHSSSSSGWb.", "...bsHSSSSSGWb.", "...bsHSSSSSGWb.", "...bsHSSSSSGWb.", "..bsSHSSSSSGWb.", "..bsHSSSSSSGWb.", "..bsSHSSSSSGWb.", ".bsSHSSSSSSGWb.", ".bgggggggggGWb.", ".bgSSSgSSSgGWb.", ".bgSYSgSYSgGWb.", ".bgSSSgSSSgGWb.", ".bgggggggggGWb.", ".NgGYGGGYGgNqN.", "..NNNNNNNNNNQN."];
  var Xa = ["..NNNNN..", ".NYYYGGN.", "NYGeEGGgN", "NgYYGGggN", ".NgYGggN.", "..NNNNN.."];
  var Ra = [".NNNNN..", "NYYYGGN.", "NYGEeGgN", "NgYYGggN", ".NgYggN.", "..NNNN.."];
  function za(S, e, s) {
    var B = e.material;
    var o = B.cloth;
    v(S, e, s, { C: { line: o.line, deep: o.deep, shade: o.shade, base: o.base, hi: "#9ccbe8", spark: o.spark }, B: B.trim, T: B.pants, W: B.accent, band: 2, ko: 5.8, up: 2.6 });
    (function (S, e, s) {
      var B = Aa(e);
      if (e.g.side) {
        if (1 !== s) {
          return;
        }
        as(S, e.g.arms[1].x - 2, a.ARM_Y - 3 + e.dy, Ra, B, !1);
      }
      else {
        var o = e.g.arms[s].x + 1;
        var n = a.ARM_Y + e.dy;
        if (0 === s) {
          as(S, o - 5, n - 3, Xa, B, !1);
        }
        else {
          as(S, o + 5, n - 3, Xa, B, !0);
        }
      }
    })(S, e, s);
  }
  function Va(S, e) {
    return S.p.sit ? 57 : Math.min(57, e.foot - 4);
  }
  var Fa = { Y: "#f2dca5", G: "#cfa86a", g: "#a8804d", n: "#7a5933", N: "#46301a" };
  var Pa = { O: "#1b2a45", D: "#285283", S: "#3c73a8", B: "#5a9dd2", M: "#7fc0ea", H: "#b3e0f7", K: "#e8f7ff", w: "#eef3f9", v: "#b7c3d4", r: "#b3223d", R: "#e3505f", z: "#6b1428" };
  var Ta = [".........wv.........", "......DDzrRzDD......", "....DDSBMMMBMBDD....", "...DSBBMHHKHMHBMD...", "..DSBBMHKHHHMHKMBD..", ".DSBMSBMSBMSBMSBMMD.", ".DSBMDBMDBHDBMDBHMD.", ".OSBD.SB.SM.SB.SMBO.", ".OSBD.DS.SB.DS.DMBO.", ".OSBD.O..DS.O..DMBO.", ".OSBD....O.....DHBO.", ".OSBD..........DHBO.", ".OSMD..........DMBO.", ".OSBD..........DHBO.", ".OSBD..........DMBO.", ".OSMD..........DMSO.", ".OSBD..........DHSO.", ".ODSD..........DSMO.", ".ODSD..........DSMO.", ".ODS............SMO.", ".OD..............DO.", ".O................O."];
  var Za = ["..OSBHO.........", "...OSBMHO.......", "....OSBBMHO.....", ".....OSBBMMHO...", "......OSBBMMHO..", ".......OSBBMMHO.", "........OSBBMMHO", "........OSBBMMHO", "........OSBBMMHO", ".........OSBBMHO", ".........OSBBMHO", ".........OSBBMHO", ".........OSBBMHO", ".........OSBBMHO", ".........OSBBMHO", ".........OSBBMHO", ".........OSBBMHO", ".........OBMDBMO", ".........OBMDBMO", ".........OBMDBMO", ".........OBMDBMO", ".........OBMDBMO", ".........OBMDBMO", ".........OBMDBMO", ".........OBMDBMO", "..........OBMDBO", "..........OBMDBO", "..........OBMDBO", "..........OBMDBO", "..........OBMDBO", "..........OBMDBO", "..........OBMDBO", "..........OBMDBO", ".........OBMDBMO", ".........OBMDBMO", ".........OBMDBMO", ".........OBMDBMO", ".........OBMDBMO", ".........OBMDBMO", ".........OBO.OBO", ".........OBO.OBO", ".........OBO.OBO", "..........SM..SM", "..........SM..SM", "..........D...D."];
  var Ia = [".........wwv........", ".....DDDzrRrzDD.....", "...DDSBBSBMrMSBDD...", "..DSSBBSSBMrHSMBBD..", ".DSSBBSSBBMrHMSMHBD.", ".DSBBSSBBMHrHMSMHBD.", ".DSBBSSBBMHrzHSHMBD.", ".DSBSBSBBMHHrMSMHBD.", ".DSBBSSBBMMHrMSHMBD.", ".DSBSBSBBMHHrMSMHBD.", ".DSBBSSBSBMHzHSMHBD.", ".DSSBSSBBMMHHMSHMBD.", ".DSBBSSBBMHHMMSMHBD.", ".DSBSBSBBMHMHMSHMBD.", ".DSBBSSBSBMHMMSMMBD.", ".ODSBSSBBMMHMMSHBBO.", "..ODSSSBBMHHMMSSBO..", "..ODSBSBBMHMHMSDBO..", "..ODSSSBSBMHMMSDDO..", "...ODSSBBMMHMMSDO...", ".....OSSBBMMHHO.....", ".....OSSBBMMHHO.....", "....OSBMHDSBMHO.....", "....OSBMHDSBMHO.....", "....OSBMHDSBMHO.....", "....OSBMHDSBHO......", "...OSBMHDSBMHO......", "...OSBMHDSBMHO......", "...OSBMHDSBHO.......", "...OSBHDSBMHO.......", "..OSBMHDSBMHO.......", "..OSBMHDSBHO........", "..OSBHDSBMHO........", "..OSBHDSBMHO........", "..OSBHDDBMO.........", "..OBMO.OBMO.........", "..OBMO.OBMO.........", "..OBMO.OBO..........", "...OBO.OBO..........", "...SM..OBO..........", "...SM...SM..........", "...D....SM..........", "...D....D...........", "........D..........."];
  var $a = ["......wv............", ".....zrRzDDDD.......", "...DDSBBBBMMMMDD....", "..DSSBBBMMMHHKHMD...", ".DSSBBBMMHHKHHMMMD..", ".DSBBBSBMMHMMBMHMMD.", ".DSBBSBBMSBMSBMHMMD.", ".DSBSBBSBBSMBSMMHMD.", ".DSBBSBBSBBMDMBSMMO.", ".DSBSBBSB..DB.DB.DO.", ".DSBBSBBS.DS......D.", ".DSBBSBSD.DS........", ".DSBSBBSD.SD........", ".DSBBSBSD.SD........", ".DSBSBSD..SD........", ".DSBBSBD..SO........", ".ODSBSBD..O.........", ".ODSBSD.............", "..ODSBD.............", "..ODSD..............", "...OD...............", "...O................"];
  var Ss = [".......OBMO.....", ".....OSBHO......", "...OSBMHO.......", "..OSBMHO........", ".OSBMHO.........", "OSBBMHO.........", "OSBBMHO.........", "OSBBMHO.........", "OSBBMHO.........", "OSBBMHO.........", "OSBBMHO.........", "OSBBMMHO........", "OSBBMMHO........", "OSBBMMHO........", "OSBBMMHO........", "OSBBMMHO........", "OSBBMMHO........", "OSBHDSBHO.......", "OSBHDSBHO.......", "OSBHDSBHO.......", "OSBHDSBHO.......", ".OSBHDBMO.......", ".OSBHDBMO.......", ".OSBHDBMO.......", ".OSBHDBMO.......", ".OSBHDBMO.......", ".OSBHDBMO.......", ".OSBHDBMO.......", ".OSBHDBMO.......", ".OSBHDBMO.......", ".OSBHDBMO.......", ".OSBHDBMO.......", "..OBMDDBO.......", "..OBMDDBO.......", "..OBMDDBO.......", "..OBMDDBO.......", "..OBMDDBO.......", "..OBO.OBO.......", "..OBO.OBO.......", "..OBO.OBO.......", "...SM.SM........", "...SM.SM........", "...D...D........"];
  var es = [".Y.", "YGg", ".gn", "..n"];
  function as(S, a, s, B, o, n, i, O) {
    for (var t = 0; t < B.length; t++)
      for (var h = B[t], r = i ? i(t) : 0, d = 0; d < h.length; d++) {
        var b = h.charAt(d);
        if ("." !== b) {
          var l = o[b];
          if (l) {
            var f = (n ? a - d : a + d) + r;
            var c = s + t;
            if (!(O && O(f, c))) {
              e.dot(S, f, c, l);
            }
          }
        }
      }
  }
  function ss(S) {
    for (var e = [], a = 0; a < 2; a++) {
      var s = S.arms[a];
      if (s && s.over && (!S.g.side || 0 !== a)) {
        var B = w(s);
        var o = h(s);
        e.push([B.x, B.y, o.x, o.y]);
      }
    }
    return e.length ? function (S, a) {
      for (var s = 0; s < e.length; s++) {
        var B = e[s];
        var o = B[2] - B[0];
        var n = B[3] - B[1];
        var i = o * o + n * n || 1;
        var O = Math.max(0, Math.min(1, ((S - B[0]) * o + (a - B[1]) * n) / i));
        var t = B[0] + o * O - S;
        var h = B[1] + n * O - a;
        if (t * t + h * h <= 6.5) {
          return !0;
        }
      }
      return !1;
    } : null;
  }
  function Bs(S, e) {
    var a = S.cloth;
    var s = S.trim;
    var B = S.accent;
    var o = S.pants;
    var n = S.red;
    var i = S.pink;
    var O = S.armor;
    return { L: a.line, d: a.deep, s: a.shade, W: a.base, h: a.hi, N: s.line, n: s.deep, g: s.shade, G: s.base, Y: s.hi, Q: B.line, q: B.deep, c: B.shade, e: B.base, E: B.hi, x: o.line, X: o.deep, j: o.shade, J: o.base, i: o.hi, Z: n.line, z: n.deep, m: n.shade, r: n.base, R: n.hi, u: i.deep, p: i.base, P: i.hi, o: O.line, a: O.deep, b: O.shade, B: O.base, A: O.hi, K: O.spark, 1: e.line, 2: e.deep, 3: e.shade, 4: e.base, 5: e.hi };
  }
  var os = ["...xz....zx...", ".LLxr....rxLL.", ".LsWr4444rWhL.", ".LsWr3444rWhL.", ".LsWWr44rWWhL.", ".LsWWr34rWWhL.", ".LsWWWrrWWWhL.", ".LsWWWsrWWWhL.", ".LsWWWWsWWWhL.", ".LssWWWsWWWhL.", ".LsWWWWsWWhhL.", ".LsWsWWsWWWhL.", ".LssWWWsWWWhL.", ".LsWWWWsWWWhL.", ".LsWWWWsWWWhL.", ".NgGGYggYGGgN.", ".xXGXxxxxXGXx.", ".xXXXxxxxXXXx.", ".ZrrRrrrrRrrZ.", ".ZzzzzzzzzzzZ."];
  var ns = [".o......", "oAo.o...", "oKboAo..", ".oAboAo.", ".obAAAbo", "obBBBAAo", "obBnGnAo", "obnEeGBo", "obGeqnbo", ".ogNNgo.", "..oNNo.."];
  var is = ["o......", "Aoo....", "oAbooo.", ".obAAAo", "obBnGno", "obnEeGo", "obGeqno", ".ogNNgo", "..oooo."];
  var Os = ["...LsWs", "...LsWs", "..LsWWs", "..LsWhs", "..LsWWs", ".LsWWWs", ".LsWWhs", ".LsWWWs", ".LsWhWs", "LsWWWWs", "LsEWEWE", "LceEeEe", "Lcehhec", "Lqeehcq", "Lqcecqq", "LQqqqqQ", ".QQQQQ."];
  var ts = ["sWWL...", "sWhL...", "sWWhL..", "sWWhL..", "shWhL..", "sWWWhL.", "sWWWhL.", "sWhWhL.", "sWWWhL.", "sWWWWhL", "EWEWEhL", "eEeEecL", "cehhecL", "qcheeqL", "qqcecqL", "QqqqqQL", ".QQQQQ."];
  var hs = ["...xxxxxxxx...", ".LLxnGGGGnxLL.", ".LsWWWWWWWWhL.", ".LsWWWWWWWWhL.", ".LsWWWWWWWhhL.", ".LssWWWWWWWhL.", ".LsWWWWWWWWhL.", ".LsWWWWsWWWhL.", ".LsWsWWsWWWhL.", ".LssWWWsWWhhL.", ".LsWWWWsWWWhL.", ".LsWWWWsWsWhL.", ".LssWWWsWWWhL.", ".LsWWWWsWWWhL.", ".LsWWWWsWWWhL.", ".NgGGYggYGGgN.", ".xXGXxxxxXGXx.", ".xXXXxxxxXXXx.", ".ZrrRrrrrRrrZ.", ".ZzzzzzzzzzzZ."];
  var rs = ["...LsWWWs", "...LsWWWs", "..LsWWWhs", "..LsWWWWs", "..LsWhWWs", ".LsWWWWWs", ".LsWWWhWs", ".LsWWWWWs", ".LsWhWWWs", "LsWWWWWWs", "LsEWEWEWE", "LceEeEeEe", "Lcehheehe", "Lqeehecce", "Lqceecqqc", "LQqqqqqqq", ".QQQQQQQQ"];
  var ds = ["sWWWWL...", "sWWhWL...", "sWWWWhL..", "sWhWWhL..", "sWWWWhL..", "sWWWhWhL.", "sWhWWWhL.", "sWWWWWhL.", "sWWWhWhL.", "sWWWWWWhL", "EWEWEWEhL", "eEeEeEecL", "eheehhecL", "ecceheeqL", "cqqceecqL", "qqqqqqqQL", "QQQQQQQQ."];
  var bs = ["...xx...r...", ".LLxx...rLL.", ".LsWWWWWr4L.", ".LsWWWWWr3L.", ".LssWWWWhrL.", ".LsWWWWWhrL.", ".LsWWWWWhrL.", ".LssWWWWhrL.", ".LsWWsWWhrL.", ".LsWWWWWhrL.", ".LssWWWWhrL.", ".LsWWWsWhrL.", ".LsWWWWWhrL.", ".LssWWWWhrL.", ".LsWWWWWhrL.", ".NgGGYGGgGN.", ".xXGXxxxXGx.", ".xXXXxxxXXx.", ".ZrrRrrrrRZ.", ".ZzzzzzzzzZ."];
  var ls = ["....LsWWWs", "....LsWWhs", "...LssWWWs", "...LsWWhWs", "...LsWWWWs", "..LssWWWhs", "..LsWWhWWs", "..LsWWWWWs", ".LssWWWhWs", ".LsWWWWWWs", "LsEWEWEWEs", "LceEeEeEeq", "LcehheehcQ", "LqeehecceQ", "LqceecqqcQ", "LQqqqqqqqQ", ".QQQQQQQQ."];
  var fs = ["GY", "Ee", "qn"];
  var cs = ["rR", "zr", ".z"];
  var Gs = [".GY.", "GEeG", "geqg", ".gn."];
  var Hs = ["rGGr", "zrRz", ".zr.", "..z."];
  var gs = [".G.", ".n.", "zrR", "zrr", ".z."];
  function xs(S, e, a, s, B, o, n, i) {
    var O;
    var t = s + 2 - a;
    var h = B.length;
    var r = [];
    if (t >= h) {
      for (O = 0; O < h; O++)
        r.push(B[O]);
    }
    else {
      var d = h - t;
      if (d <= o) {
        for (O = 0; O < h; O++)
          (O < 1 || O > d) && r.push(B[O]);
      }
      else {
        for (O = h - t; O < h; O++)
          r.push(B[O]);
      }
    }
    as(S, e, a, r, n, !1, i);
  }
  function Ds(e, s, B) {
    var o = S.Palette.pick("SKIN", s.cfg.skin, "light");
    var n = Bs(s.material, o);
    if (s.g.side) {
      if (1 !== B) {
        return;
      }
      as(e, s.g.arms[1].x - 2, a.ARM_Y - 3 + s.dy, is, n, !1);
    }
    else {
      var i = s.g.arms[B].x + 1;
      var O = a.ARM_Y + 1 + s.dy;
      if (0 === B) {
        as(e, i - 5, O - 6, ns, n, !1);
      }
      else {
        as(e, i + 5, O - 6, ns, n, !0);
      }
    }
  }
  function Ws(S, a, s) {
    var B;
    var o = a.arms[s];
    var n = w(o);
    var i = h(o);
    var O = a.material;
    var t = O.cloth;
    var r = O.accent;
    var d = O.armor;
    var b = O.trim;
    var l = i.x - n.x;
    var f = i.y - n.y;
    var c = Math.sqrt(l * l + f * f) || 1;
    var G = l / c;
    var H = f / c;
    var g = -H;
    var x = G;
    var D = a.g.side && 0 === s && !o.front;
    var W = a.torso.x + a.torso.w / 2;
    function J(S, e) {
      return [n.x + G * S + g * e * B, n.y + H * S + x * e * B];
    }
    function M(S) {
      return [Math.round(S[0]), Math.round(S[1])];
    }
    B = Math.abs(g) > .3 ? (n.x - W) * g >= 0 ? 1 : -1 : x > 0 ? 1 : -1;
    if (a.g.side) {
      B = Math.abs(g) > .3 ? g > 0 ? 1 : -1 : B;
    }
    var N = Math.max(4, Math.round(.55 * c));
    var p = Math.max(N + 2, Math.round(c - 2));
    u(S, [J(-1, 2.6), J(-1, -2.2), J(N + 1, -2.4), J(N + 1, 3.8)], t.line);
    u(S, [J(0, 1.6), J(0, -1.2), J(N, -1.4), J(N, 2.8)], D ? t.shade : t.base);
    var k = M(J(1, -1));
    var m = M(J(N - 1, -1));
    var v = M(J(1, 1));
    var y = M(J(N - 1, 2));
    e.line(S, k[0], k[1], m[0], m[1], D ? t.base : t.hi);
    e.line(S, v[0], v[1], y[0], y[1], D ? t.deep : t.shade);
    var L = M(J(N, -1.4));
    var C = M(J(N, 2.8));
    e.line(S, L[0], L[1], C[0], C[1], D ? r.deep : r.base);
    var j = M(J(N + 1, 0));
    var A = M(J(p, 0));
    e.fatLine(S, j[0], j[1], A[0], A[1], 3, D ? d.deep : d.base);
    var Q = M(J(N + 1, -1));
    var _ = M(J(p, -1));
    var Y = M(J(N + 1, 1));
    var E = M(J(p, 1));
    e.line(S, Q[0], Q[1], _[0], _[1], D ? d.base : d.hi);
    e.line(S, Y[0], Y[1], E[0], E[1], d.line);
    var q = M(J((N + 1 + p) / 2, 0));
    e.dot(S, q[0], q[1], D ? b.shade : b.base);
    var K = M(J(p, -1));
    var U = M(J(p, 1));
    e.line(S, K[0], K[1], U[0], U[1], b.shade);
    if ((1 === s || o.front || o.over || a.g.side)) {
      Ds(S, a, s);
    }
  }
  function Js(S, a, s, B, o, n, i, O, t) {
    var h = a.material;
    var r = t ? h.red.base : h.pink.base;
    var d = t ? h.red.deep : h.pink.hi;
    var b = B + 3 * i;
    var l = B + 4 * i + O;
    if (n - o < 12) {
      e.line(S, B, o, B + 2 * i, o + 1, r);
      return void (t ? QO(S, B + 2 * i - 1, o + 2, gs, s, !1) : (e.dot(S, B + 3 * i, o + 2, r), e.dot(S, B + 3 * i, o + 3, h.accent.base)));
    }
    var f = o + (t ? 4 : 5);
    var c = t ? Math.min(n - 7, o + 8) : Math.min(n - 2, o + 12);
    e.line(S, B, o, b, f, r);
    e.line(S, b, f, l, c, r);
    e.line(S, b + i, f + 1, l + i, c, d);
    if (t) {
      QO(S, l - 1, c + 1, gs, s, !1);
    }
    else {
      e.dot(S, l, c + 1, h.accent.base);
      e.dot(S, l + i, c + 1, h.accent.hi);
    }
  }
  var us = { O: "#2c2729", D: "#4a4245", S: "#6d6462", B: "#918781", M: "#b3a99f", H: "#d4cabd", K: "#efe8dc", G: "#c8a55c", Y: "#eed9a0", n: "#6e5424" };
  var Ms = ["....................", ".....OOOOOOOOOO.....", "...OODSMHKKHMSDOO...", "..ODSBMHKHMHKMBSDO..", ".ODSBHMBMHHMBMHBSDO.", ".OSBHMD..DD..DMHBSO.", ".ODSBD........DBSDO.", ".OSDSHK......KHSDSO.", ".OBD.DMKH..HKMD.DBO.", ".OSD...DD..DD...DSO.", ".ODO............ODO.", "..O..............O.."];
  var ws = ["......OD............DO......", ".....OSD............DSO.....", "....OSBD............DBSO....", "...OSBMD............DMBSO...", "..OSBMHD............DHMBSO..", "..OBMSMD............DMSMBO..", ".OSMBMSD............DSMBMSO.", ".OBMSSBD............DBSSMBO.", "OSMSBMSD............DSMBSMSO", "OBSBMBSD............DSBMBSBO", "OSBMHMDD............DDMHMBSO", ".OSMBSBDD..........DDBSBMSO.", "OSBMSBSDD..........DDSBSMBSO", "OBMSBSDDD..........DDDSBSMBO", ".OSDSODD............DDOSDSO.", "..OOO..................OOO.."];
  var Ns = ["......................", ".......OOOOOOOO.......", ".....OSMSHKKHSMSO.....", "....OSSHHSHHSHHSSO....", "...OSMSHMSHHSMHSMSO...", "..OSSHMSHSHHSHSMHSSO..", "..OSSHMSHMSSMHSMHSSO..", "..ODBSMBSMSSMSBMSBDO..", "..ODBBDMDMDDMDMDBBDO..", "..ODSSBDMDMMDMDBSSDO..", "..ODSSBBBBGYBBBBSSDO..", "...OOODDDOnGODDDOOO...", "..ODSBMBSDSSDSBMBSDO..", ".ODSMHMSBMHHMBSMHMSDO.", "OSBMHKHBSMHHMSBHKHMBSO", ".OMHMBSDSBMMBSDSBMHMO.", "OSBSDSBMHMSSMHMBSDSBSO", "ODSBMHMSBHKKHBSMHMBSDO", ".OBMHMBDSMHHMSDBMHMBO.", ".OSBSDSBMHMMHMBSDSBSO.", "..ODSBMHMSBBSMHMBSDO..", "...OBMHKHBSSBHKHMBO...", "...OSBMHMSDDSMHMBSO...", "...OBSDSBSSSSBSDSBO...", "....OBOBMHMMHMBOBO....", ".....O.OSMHHMSO.O.....", ".......OBMSSMBO.......", "........OBMMBO........", "........OSBBSO........", ".........OOOO........."];
  var ps = ["....................", "......OOOOOOOO......", "....OOSBMHHKHMOO....", "...ODSBMMBHHKHMSO...", "..ODSBBMHHMBMHHMSO..", ".ODSBMMBSBMHHMBSO...", "ODSBBMHHMBSBMSO.....", "ODBMMBSBMHMD.BMS....", "OSBMGYBMSBDDSMHMS...", "ODSBnGSDDDO....D....", "ODSBMSO.............", "ODBMHSO.............", "OSBMBDO.............", "ODSMSDO.............", ".ODSBDO.............", ".OSBDO..............", "..ODSO..............", "...OO..............."];
  var ks = ["............", ".....OOO....", "....OSBMO...", "...OSMHMBO..", "..ODBHKHMSO.", ".ODSMHMBSDSO", ".OSBMBSDSBMO", "ODSBSDSBMHMO", "OSBSDSMHKHBO", "OBMBSBMHMBSO", "OSBMHMBSDSDO", ".OSBMHMSBMSO", "ODSDSBMHMBSO", "OSBMSBMHKHBO", "OBMHMBSBMSDO", ".OSBMHMSDSO.", ".ODSBMHMBSO.", "..OSBMHKMBO.", "..ODSBMMBSO.", "...ODSBMSO..", "...OODSBOO..", ".....OOSO...", ".......O...."];
  var ms = [".DS..........SD.", ".DB..........BD.", ".OB..........BO.", ".OM..........MO.", ".OHMS......SMHO.", ".OBSDSMHHMSDSBO.", ".OSBMHKHHKHMBSO.", ".OBHMSDOODSMHBO.", ".OSMBMHSSHMBMSO.", "..OBHMBHHBMHBO..", "..OSMHSMMSHMSO..", "...OBMHMMHMBO...", "...OSHMBBMHSO...", "...OBMHMMHMBO...", "....OBHMMHBO....", "....OSMHHMSO....", ".....OBMMBO.....", ".....OSHHSO.....", "......OBBO......", ".......OO......."];
  var vs = ["..............", "..............", "..............", ".....S........", "....DB........", "....DHMSDSMH..", "....OMHMSMHKM.", "....OBMHMOOMHO", "....OSBMHMSHMO", ".....OSBMHMHBO", ".....ODSBMHMBO", "......OSMHMBSO", "......OBMHKHBO", "......OSBMHMSO", ".......OSMHMBO", ".......OBHMBSO", ".......OSMHMO.", "........OBMBO.", "........OSMSO.", ".........OBO..", ".........OO..."];
  var ys = ["...LNgGGgNL...", ".LeNGYgGYgNeL.", "LdeNgnGgnGNehL", "LdeNGYgGYgNehL", "LdeNgnGgnGNehL", "LdeNGYgGYgNehL", "LdeNgnGgnGNehL", "LdeNGYgGYgNehL", "LdeNgnGgnGNehL", "LdeNGYgGYgNehL", "LdseNnGgnNehhL", "LdsWeNYGNeWhhL", "LdsWWeNNeWWhhL", "LdsWWWeeWWWhhL", "LdsWWWWeWWWhhL", "LTkkUkUUkUkkUL", "LTuUuttuuUutUL", "LTkUUkUUkUUkUL", "LTttttttttttTL", "LdsWWWWWWWWhhL"];
  var Ls = ["...LeWWWWeL...", ".LsWeWWWWeWhL.", "LdseWWWWWWehsL", "LdseWWsWWWehsL", "LdeWWWWWWWWehL", "LdeWWWWsWWWehL", "LdesWWWWWWWehL", "LdeWWWWsWWWehL", "LdeWsWWWWWWehL", "LdeWWWWWsWWehL", "LdesWWWWWWWehL", "LdeWWWsWWWWehL", "LdeWWWWWWsWehL", "LdesWWWWWWWehL", "LdeWWWWsWWWehL", "LTkkUkUUkUkkUL", "LTuUuttuuUutUL", "LTkUUkUUkUUkUL", "LTttttttttttTL", "LdsWWWWWWWWhsL"];
  var Cs = ["...LWeNgN...", "..LdWeNGYN..", ".LddsWeNGYN.", ".LdsWWeNYGgN", ".LdsWWeNgGYN", ".LdsWWWeNGgN", ".LdssWWeNYGN", ".LdsWWWeNgGN", ".LdsWWWWeNYN", ".LdssWWWeNgN", ".LdsWWWWeNGN", ".LdsWWWWWeGN", ".LdssWWWWeNN", ".LdsWWWWWWeL", ".LdsWWWWWWeL", ".LTkUkUUkUkT", ".LTuUuttuUuT", ".LTkUUkUUkUT", ".LTtttttttTT", ".LdsWWWWWWhL"];
  var js = ["..LsWWsWW", "..LsWWsWW", "..LsWWsWW", "..LsWWWsW", ".LsWWWWsW", ".LsWWWWsW", ".LsWWWWsW", ".LssWWWsW", ".LsWsWWWs", "LsWWsWWWs", "LsWWsWWWs", "LsWWWsWWs", "LsWWWsgGg", "LsWWWWGgG", "LgGGGGGGG", "Lddddddds", ".LLLLLLLL"];
  var As = ["WWsWWhL..", "WWsWWhL..", "WWsWWhL..", "WsWWWhL..", "WsWWWWhL.", "WsWWWWhL.", "WsWWWWhL.", "WsWWWshL.", "sWWWsWhL.", "sWWWsWWhL", "sWWWsWWhL", "sWWsWWWhL", "gGgsWWWhL", "GgGWWWWhL", "GGGGGGGgL", "sdddddddL", "LLLLLLLL."];
  var Qs = ["...LsWWsWWWWW", "...LsWWsWWWWW", "..LsWWWsWWWWW", "..LsWWWsWWWWW", "..LsWWWWsWWWW", ".LsWWWWWsWWWW", ".LssWWWWsWWWW", ".LsWsWWWWsWWW", "LsWWsWWWWsWWW", "LsWWsWWWWsWWW", "LsWWWsWWWsWWW", "LsWWWsWWWWsWW", "LsgGgWsWWWsWW", "LsGgGWsWWWsWW", "LgGGGGGGGGGGG", "Lddddddddddds", ".LLLLLLLLLLLL"];
  var _s = ["nGGGGn", "gdWWdg", "gdWWdg", "gdWWdg", "gdWhdg", "gdWWdg", "gdWWdg", "gdhWdg", "gdWWdg", "gdWWdg", "gdWWdg", "gdWWdg", "gGnnGg", "gnGGng", "gGGGGg", "gddddg", "nNNNNn"];
  var Ys = ["NGN", "gWL", "gWL", "gWL", "gWL", "gWL", "gWL", "gWL", "gWL", "gWL", "gWL", "gWL", "gnL", "GgL", "GGL", "gdL", "NNL"];
  var Es = [".NggN.", "NgYKgN", "gYKYGg", "NgGGgN", ".NggN."];
  var qs = ["Ng", "gY", "gG", "Nn"];
  var Ks = [".gG.", ".uk.", "tUkU", "tuUU", ".uU.", "..t."];
  var Us = [".G.", ".u.", "uUk", "uUU", "u.U"];
  var Xs = ["xXXx", "XJiX", "XJJX", "xXXx"];
  function Rs(S, a, s) {
    var B;
    var o = a.arms[s];
    var n = w(o);
    var i = h(o);
    var O = a.material;
    var t = O.cloth;
    var r = O.accent;
    var d = O.pants;
    var b = i.x - n.x;
    var l = i.y - n.y;
    var f = Math.sqrt(b * b + l * l) || 1;
    var c = b / f;
    var G = l / f;
    var H = -G;
    var g = c;
    var x = a.g.side && 0 === s && !o.front;
    function D(S, e) {
      return [n.x + c * S + H * e * B, n.y + G * S + g * e * B];
    }
    function W(S) {
      return [Math.round(S[0]), Math.round(S[1])];
    }
    function J(a, s, B, o, n) {
      var i = W(D(a, s));
      var O = W(D(B, o));
      e.line(S, i[0], i[1], O[0], O[1], n);
    }
    B = a.g.side ? g - H >= 0 ? 1 : -1 : Math.abs(H) > .3 ? (n.x - (a.torso.x + a.torso.w / 2)) * H >= 0 ? 1 : -1 : g > 0 ? 1 : -1;
    var M = Math.max(6, Math.round(f - 1.5));
    var N = a.g.side ? 6.4 : 5.2;
    var p = o.over ? -2.4 : -1.4;
    u(S, [D(-2, p), D(M, p), D(M + .8, N), D(-2, 2.4)], t.line);
    u(S, [D(-1, p + .9), D(M - 1, p + .9), D(M - .4, N - 1), D(-1, 1.5)], x ? t.shade : t.base);
    J(0, -.4, M - 3, -.6, x ? t.base : t.hi);
    J(2, 1.4, M - 3, N - 2.2, x ? t.deep : t.shade);
    J(M - 3, -.6, M - 2.4, N - 1.2, x ? r.deep : r.base);
    J(M - 1.6, -.6, M - .9, N - .8, x ? r.shade : r.hi);
    J(M - .3, -1.2, M + .4, N - .3, t.line);
    var k = x ? { x: d.line, X: d.line, J: d.deep, i: d.shade } : { x: d.line, X: d.deep, J: d.base, i: d.hi };
    QO(S, o.palm ? i.x - 1 : i.x - 2, i.y - 1, Xs, k, !1);
  }
  function zs(S, e, a) {
    for (var s = [], B = 0; B < 2; B++) {
      var o = S.arms[B];
      if (o && e(B, o)) {
        var n = w(o);
        var i = h(o);
        s.push([n.x, n.y, i.x, i.y]);
      }
    }
    return s.length ? function (S, e) {
      for (var B = 0; B < s.length; B++) {
        var o = s[B];
        var n = o[2] - o[0];
        var i = o[3] - o[1];
        var O = n * n + i * i || 1;
        var t = Math.max(0, Math.min(1, ((S - o[0]) * n + (e - o[1]) * i) / O));
        var h = o[0] + n * t - S;
        var r = o[1] + i * t - e;
        if (h * h + r * r <= a) {
          return !0;
        }
      }
      return !1;
    } : null;
  }
  function Vs(S) {
    var e = S.torso;
    return zs(S, function (a, s) {
      return s.front || s.over || S.g.side && 1 === a && h(s).x >= e.x + e.w;
    }, 6.5);
  }
  var Fs = { O: "#0d0a11", D: "#1b1621", S: "#2a2231", B: "#3b3143", M: "#524559", H: "#6c5e72", g: "#7c5b30", G: "#b88d4f", Y: "#e2bf82", y: "#f6e1ae", n: "#6e4c1c", a: "#c8963c", A: "#f0cf72", w: "#fff1c2" };
  var Ps = [".......O....O.......", "......OHO..OMO......", "...O..OBMOOMHMO.O...", "...OHOBMHOBMHMOOMO..", "..OSBMBSBMHMSBMHMSO.", ".OSBBMBSBMHMBSBMMBSO", "OSgGYBSBMBSBMHMBSBSO", "OgGYyGgSBMBSBMHMBSO.", "OGYyYGgOSBMODSBMBSO.", ".OGyYGO.OSBO.OSBSSO.", "OgYyGgO..OO...OBSDO.", "OGYgO..........OSDO.", ".OGYO..........OSDO.", ".OgYO..........OSDO.", ".OgGO...........OSO.", "..OgO...........OSO.", "..OO............OO..", "..O..............O..", "....................", "...................."];
  var Ts = ["......................", "......................", "......................", "......................", "......................", ".....ODSBO....OBSDO...", ".....OSBMSO..OSMBSO...", "....ODSBMSDOODSMBSDO..", "....OSBMHSDDDDSHMBSO..", "....ODSBMSDDDDSMBSDO..", "....OSDSBSDDDDSBSDSO..", ".....ODSDDDDDDDDSDO...", "......OOO......OOO...."];
  var Zs = ["........O....O........", ".......OMO..OHO.......", "....O..OBMO.OMHO.O....", "....OHOOSBMOOMHMOOMO..", "...OSBMHMBSSDSBMHMBO..", "..OSBMHMBSnnSDSBMHMO..", "..OBMHMBSnAAnSDSBMHO..", "..OMHMBSnAwwAnSDSBMO..", "..OHMBSDnAYYanBSDSBO..", "..OMBSDSBnaanHMBSDSO..", "..OBSDSBMHanBMHMBSDO..", "..OSDSBMHMaDSBMHMBSO..", "..ODSBMHMBaSDSBMHMBO..", "...OBMHMBSnBSDSBMHMO..", "...OMHMBSDAMBSDSBMO...", "...OHMBSDSnHMBSDSBO...", "....OSDBMMDMMBDSMO....", "....OSDBMMDMMBDSMO....", ".....ODBMMDMMBDSO.....", "......OBMHDDDMHO......", ".......OMHBDSMO.......", ".......OMHBDSMO.......", "........OHBDSO........", "........OHBDSO........", "........OHBDSO........", "........OHBDSO........", "........OHBDSO........", "........OBDSMO........", "........OBDSMO........", "........OBDSMO........", "........OMBDSO........", "........OBBDSO........", "........OBBDSO........", ".........OBDSO........", "........OSDOBO........", "........OSOOSO........", ".........O..OO........", "............O........."];
  var Is = [".......O..O.........", "......OMOOHO...O....", "..O...OBMOMHO.OMO...", "..OMO.OSBMBMHOMHO...", "..OSBOSBMHMBMHMHOO..", ".OSBMBSBMHMBSBMHMSO.", ".OSBMBSBMHMBSBMgYyO.", ".ODBMSBMHMBSBgGYyGO.", ".OSBHMBSBMBSgGYyGgYO", ".ODBMHBSDSBOgGYGOgGO", ".OSBMBSDSBO.OgGO.OO.", ".ODBMHSDSO...OO.....", ".OSBMSDO............", ".ODBHSDO............", ".OSBMDO.............", ".ODBSDO.............", "..OSDO..............", "..ODO...............", "...O................"];
  var $s = [".....OSBO..", "....OSBMO..", "....ODBMO..", "....OSBMSO.", "....ODMHSO.", "....OSMHSO.", "....ODBMSO.", "....OSBMDO.", "....ODMHSO.", "....OSMHBO.", "....ODBMSO.", "....OSBHMO.", "...OSBMHSO.", "...ODBHMSO.", "...OSMHgSO.", "...ODBHGSO.", "...OSBMYgO.", "...ODMHGSO.", "...OSBMgDO.", "...ODMHBSO.", "...OSBHMSO.", "...ODBMHSO.", "...OSMHBDO.", "...ODBMSO..", "...OSBHSO..", "...ODBSDO..", "...OSOODO..", "...OO.OSO..", ".......O..."];
  var SB = ["a", "A", "n"];
  function eB(S, e) {
    var a = S.mantle;
    var s = S.trim;
    var B = S.cloth;
    var o = S.white;
    var n = S.pants;
    var i = S.jade;
    return { A: a.line, a: a.deep, b: a.shade, W: a.base, w: a.hi, N: s.line, n: s.deep, g: s.shade, G: s.base, Y: s.hi, K: s.spark, x: B.line, X: B.deep, j: B.shade, J: B.base, i: B.hi, Q: o.line, q: o.deep, c: o.shade, e: o.base, E: o.hi, p: n.line, P: n.deep, u: n.shade, U: n.base, v: n.hi, z: i.deep, Z: i.base, H: i.hi, 1: e.line, 2: e.deep, 3: e.shade, 4: e.base, 5: e.hi };
  }
  var aB = ["...xQE..EQx...", "..xcE3445eQx..", ".xgcEn44nEegx.", "xXjgcEGGEeGJix", "xXjgcE34EeGJix", "xXjJgcEEeGJJix", "xXjJJgEeqeeGix", "xXjJgEeqgGeGix", "xnjJgEegeeYGix", "xXjgEeqgeYgGix", "xXjgEeqengeGix", "xggEeqeeEeGGix", "xXgEeqeEegeGix", "xgEeqeEeeeeGix", "nGGGGGGGGGGGYn", "xXXgXXgXXgXXgx", "xGjjGjjGjjGjjx", "xXXgXXgXXgXXgx", "nggggggggggggn", "xjjjjjjjjjjjjx"];
  var sB = ["...xjJJJJix...", "..xXjJJJJJix..", ".xXjJJJJJJJix.", "xXjJJJJJJJJJix", "xXjJJJJJJJJJix", "xXjJJJJJJJJJix", "xXjJJJJJJJJJix", "xXjJJJJJJJJJix", "xXjJJJJJJJJJix", "xXjJJJJJJJJJix", "xXjJJJJJJJJJix", "xXjJJJJJJJJJix", "xXjJJJJJJJJJix", "xXjJJJJJJJJJix", "nGGGGGGGGGGGYn", "xXXgXXgXXgXXgx", "xGjjGjjGjjGjjx", "xXXgXXgXXgXXgx", "nggggggggggggn", "xjjjjjjjjjjjjx"];
  var BB = [".....xQEe...", "...xXjQE3...", ".xXjJJJgQ43.", ".xXjJJJgQnx.", ".xXjJJJgQex.", ".xXjJJJgcQx.", ".xXjJJJgcex.", ".xXjJJJgcEx.", ".xXjJJngcex.", ".xXjJgJgcEx.", ".xXjJJGgcex.", ".xXjJnJgcEx.", ".xXjJJJgcex.", ".xXjJJJgcEx.", ".nGGGGGGGYn.", ".xgXXgXXgXx.", ".xjGjjGjjGx.", ".xgXXgXXgXx.", ".nggggggggn.", ".xjjjjjjjjx."];
  var oB = ["...AgbWa", "...AgbWa", "...AgbWa", "...AgbWa", "..AgbWwa", "..AgbWwa", "..Agbbwa", "..Agbbwa", "..Agbbwa", "..Aggbwa", ".AgbWGwa", ".Agbgbwa", ".AgbWnwa", ".AgwWbwa", ".AgwWbwa", ".AgwWbwa", ".AgwWbwa", ".AgwWWwa", ".AgwWbwa", ".AggGgWa", ".AGwWYWa", ".AgwGgWa", ".AggWbWa", "AgbwWbWa", "AgbwWWWa", "AgbwWbWa", "AgbwWbWa", "AgbwWbWa", "AgGGgGGa", "AnGgAnGa", ".AnA.Ana", "..A...A."];
  var nB = ["AbWWWWWWWWwA", "AGgwwwwwwgYA", "AGgwwwwwwgYA", "AbGgwwwwgYwA", "AbGgwwwwgYwA", "AbGgwwwwgYwA", "AbWGgwwgYWwA", "AbWGgwwgYWwA", "AbWGgwwgYWwA", "AbWbGggYwWwA", "AbWbGggYwWwA", "AbWbGggYwWwA", "AbWWWgYWwWwA", "AbWbWgYWWWwA", "AbWbWgYWwWwA", "AbWbWgGWwWwA", "AbWbWngWwWwA", "AbWWWWnWwWwA", "AbWbWbWWwWwA", "AbWbWbWWWWwA", "AbWbWbWWwWwA", "AbWbWbWWwWwA", "AbgGgbWgGgwA", "AgWbYbWYwWgA", "AGWgGbWGgWGA", "AbgbWbWWWgwA", "AbWbWbWWwWwA", "AbWWWbWWwWwA", "AbWbWbWWwWwA", "AgGGgGGgGGgA", "AnGgAGnGAgGA", ".AnA.AA.AnA.", "..A.......A."];
  var iB = ["........Agba", "........Agba", ".......AgbGa", ".......AgbGa", ".......AgbGa", "......AgbwGa", "......AgbwGa", "......AgbwGa", "......AgbwGa", ".....AgbWwGa", ".....AgbWwGa", ".....AgbWwGa", ".....AgbWwGa", ".....AgWWwGa", "....AgbbWwGa", "....AgwbWwGa", "....AgwbWwGa", "....AgwbWwGa", "....AgwbWwGa", "...AgbwWwGa.", "...AgbwbwGa.", "...AggGgwGa.", "...AgbwYwGa.", "...AgbGgwGa.", "..AgbgwbwGa.", "..AgbWwWwGa.", "..AgbWwbwGa.", "..AgbWwbwGa.", ".AgbWWwbwGa.", ".AgbWWwbwGa.", ".AgGGgGGgGa.", ".AnGgAnGgna.", "..AnA.AnA.A.", "...A...A...."];
  var OB = ["A.......", "AA......", "AGAA....", "AgYGAA..", "AgwWYGAA", "AgbWwWGA", "AgbWWwgA", "AngGGGgA", ".AAAAAA."];
  var tB = ["A.....", "AAAA..", "AgYGAA", "AGwWgA", "AgWWbA", "AgWbbA", "AngGgA", ".AAAA."];
  var hB = ["QeEEeQ", "QceEeQ", "QceEEQ", "QcEeEQ", "QceEeQ", "QceEEQ", "QcEeEQ", "QceEeQ", "QceEEQ", "QcEeEQ", "QceEeQ", "QceEEQ", "QcgGeQ", "QgeEYQ", "QgGgGQ", "QceEgQ", "QnGGnQ", ".QQQQ."];
  var rB = ["QEQ", "cEQ", "cEQ", "ceQ", "cEQ", "cEQ", "ceQ", "cEQ", "cEQ", "ceQ", "cEQ", "cEQ", "gYQ", "gGQ", "cgQ", "ceQ", "nGQ", ".QQ"];
  var dB = ["nGGYGGGn", "ngYGGYgn", ".ngGGgn.", ".nnYYnn.", "..ngGn..", "...nn..."];
  var bB = ["nGGn", "ngYn", ".gGn", ".nG.", "..n."];
  var lB = [".nGGn.", "nGYYGn", "GYZHYG", "GYzZYg", "nGYYGn", ".nggn."];
  var fB = ["nG", "GH", "Zg", "Gg", "ng"];
  var cB = ["xXx", "XJi", "xjX"];
  function GB(S) {
    var e = S.p;
    return e.leg ? e.leg : e.act || e.atk || e.sit || 1 !== e.bob ? 0 : 1;
  }
  function HB(S) {
    var e = S.p.sit ? 0 : S.legs[0].x - S.g.legs[0].x;
    return e > 0 ? -1 : e < 0 ? 1 : GB(S) ? -1 : 0;
  }
  function gB(S, e, a) {
    var s;
    var B = S.p.sit ? 62 - a : e.length;
    var o = e.length;
    var n = o - B;
    var i = [];
    if (n <= 0) {
      return e;
    }
    for (s = 0; s < o; s++)
      (s < 1 || s > n) && i.push(e[s]);
    return i;
  }
  function xB(S, e, a) {
    return function (s) {
      var B = s - e;
      return B <= 0 ? 0 : Math.round(S * Math.min(1, B / a));
    };
  }
  function DB(s, B, o) {
    var n;
    var i = B.arms[o];
    var O = w(i);
    var t = h(i);
    var r = B.material;
    var d = r.cloth;
    var b = r.trim;
    var l = t.x - O.x;
    var f = t.y - O.y;
    var c = Math.sqrt(l * l + f * f) || 1;
    var G = l / c;
    var H = f / c;
    var g = -H;
    var x = G;
    var D = B.g.side && 0 === o && !i.front;
    function W(S, e) {
      return [O.x + G * S + g * e * n, O.y + H * S + x * e * n];
    }
    function J(S) {
      return [Math.round(S[0]), Math.round(S[1])];
    }
    function M(S, a, B, o, n) {
      var i = J(W(S, a));
      var O = J(W(B, o));
      e.line(s, i[0], i[1], O[0], O[1], n);
    }
    function N(S, a, B) {
      var o = J(W(S, a));
      e.dot(s, o[0], o[1], B);
    }
    n = Math.abs(g) > .3 ? (O.x - (B.torso.x + B.torso.w / 2)) * g >= 0 ? 1 : -1 : x > 0 ? 1 : -1;
    if (B.g.side) {
      n = Math.abs(g) > .3 ? g > 0 ? 1 : -1 : n;
    }
    var p = Math.max(5, Math.round(c - 1.5));
    var k = i.over ? -2.4 : -1.9;
    u(s, [W(-1.5, k), W(p, k + .2), W(p, 2.4), W(.4 * c, 2.9), W(-1.5, 2.5)], d.line);
    u(s, [W(-.5, k + .9), W(p - 1, k + 1), W(p - 1, 1.5), W(.4 * c, 1.9), W(-.5, 1.6)], D ? d.deep : d.base);
    M(0, -.5, p - 2, -.3, D ? d.shade : d.hi);
    M(1, 1.1, p - 2, 1, D ? d.line : d.shade);
    var m = Math.max(3, Math.round(.5 * c));
    N(m, .9, D ? b.deep : b.shade);
    N(m + 1, .1, D ? b.shade : b.base);
    N(m + 2, -.4, D ? b.shade : b.hi);
    N(m + 3, .4, D ? b.deep : b.base);
    N(m + 4, 1.1, D ? b.deep : b.shade);
    M(p - 1, k + .3, p - 1, 2.2, D ? b.deep : b.base);
    var v = D ? { x: d.line, X: d.line, J: d.deep, i: d.shade, j: d.deep } : { x: d.line, X: d.deep, J: d.base, i: d.hi, j: d.shade };
    QO(s, t.x - 1, t.y - 1, cB, v, !1);
    if (i.palm) {
      e.dot(s, t.x + 2, t.y, D ? d.deep : d.base);
    }
    (function (e, s, B) {
      var o = S.Palette.pick("SKIN", s.cfg.skin, "light");
      var n = eB(s.material, o);
      if (s.g.side) {
        if (1 !== B) {
          return;
        }
        as(e, s.g.arms[1].x - 3, a.ARM_Y - 3 + s.dy, tB, n, !1);
      }
      else {
        var i = s.g.arms[B].x + 1;
        var O = a.ARM_Y + s.dy;
        if (0 === B) {
          as(e, i - 4, O - 4, OB, n, !1);
        }
        else {
          as(e, i + 4, O - 4, OB, n, !0);
        }
      }
    })(s, B, o);
  }
  function WB(S, e) {
    for (var a = [], s = e ? 9 : 4, B = 0; B < 2; B++) {
      var o = S.arms[B];
      if (o && (e ? 1 === B || o.front || o.over : o.over && (!S.g.side || 0 !== B))) {
        var n = w(o);
        var i = h(o);
        var O = i.x - n.x;
        var t = i.y - n.y;
        var r = Math.sqrt(O * O + t * t) || 1;
        var d = e ? 2 : 0;
        a.push([n.x - O / r * d, n.y - t / r * d, i.x, i.y]);
      }
    }
    return a.length ? function (S, e) {
      for (var B = 0; B < a.length; B++) {
        var o = a[B];
        var n = o[2] - o[0];
        var i = o[3] - o[1];
        var O = n * n + i * i || 1;
        var t = Math.max(0, Math.min(1, ((S - o[0]) * n + (e - o[1]) * i) / O));
        var h = o[0] + n * t - S;
        var r = o[1] + i * t - e;
        if (h * h + r * r <= s) {
          return !0;
        }
      }
      return !1;
    } : null;
  }
  var JB = { O: "#0f0e14", D: "#1d1b24", S: "#2e2b37", B: "#46424f", M: "#6d6977", H: "#9b97a5", L: "#c8c5cf", W: "#efedf3", u: "#3b3641", v: "#57515d", k: "#121118", d: "#28498a", l: "#3f72bd", e: "#9fd0f5", r: "#15141b", R: "#8a8796" };
  var uB = ["R", "r"];
  var MB = ["...O..O...O...O..O..", ".OWLOWLOOLMOOMBOSBO.", ".OLWLWHLOLWMBOHMBSO.", "OLWHLWHMLHWMBSBMBSDO", "OWHMLHMBLHMBDSBSDSO.", ".OWMSLMBSHMBSDBSDO..", ".....uOLMHBSDOu.....", "....uuOWLMBSDOuu....", "....vuOLWOOOOOuv....", "...uu.OWO......uu...", "...u...O........u...", "...u............u...", ".....kkk...kkk......", "..kkkellkkkellkkk...", "....klddk.klddk.....", ".....kkk...kkk......"];
  var wB = ["......................", "......................", "......................", "......................", "......................", "..OS..............SO..", "..OBO............OBO..", "..OMO............OMO..", "...OBDO........ODBO...", "...OMDDDDDDDDDDDDMO...", "....OHDDDDDDDDDDHO....", "....OLO........OLO....", ".....O..........O....."];
  var NB = ["...O..O...O...O..O....", "..OBSOBMOOMLOOLWOLWO..", "..OSBMHOBMWLOLHWLWLO..", ".ODSBMBSBMWHLMHWLHWLO.", "..OSDSBSDBMHLBMHLMHWO.", "...ODSBDSBMHSBMLSMWO..", "......uOBMSHBLOu......", ".....vuOBMSHBLOuu.....", ".....uuOBMSHBLOvu.....", "....vuuOBMSHBLOuuu....", "....uuuOBMSHBLOuuu....", "....uuuOBMSHBLOuuv....", "....uuvOBMSHBLOuuu....", "....uuuOBMSHBLOuvu....", "....uvuOBMSHBLOuuu....", "....uuuOBMSHBLOvuu....", "....vuuOBMSHBLOuuu....", "....uuuOBMSHBLOuuu....", ".....uuOBMSHBLOuu.....", ".......OBSDBMSO.......", ".......OBSDBMSO.......", "......OSBSDBMSBO......", "......OSBSDBMSBO......", "......OBMBSMHBMO......", "......OBMBSMHBMO......", "......OBMBSMHBMO......", "......OBMBSMHBMO......", "......OMHMBHLMHO......", "......OMHMBHLMHO......", "......OMHMBHLMHO......", ".......OHMBHLMO.......", ".......OLHMLWHO.......", ".......OLHMLWHO.......", ".......OLHMLWHO.......", "........OHMLWO........", "........OLHWWO........", "........OLWOOWLO......", "........OWO..OWO......", ".........O....O......."];
  var pB = [".....O...O...O......", "..O..OLOOLWOOWLO....", "..OLOOMLOLWHOWLHO...", ".OMLOMHLMLWHLWHLO...", ".OBMLMHMLHWLHWLWO...", "OSBMHMBMHLHLWHLSO...", "ODBMHBSBMHMLHMSO....", "OSBMBSOOOOOOOOO.....", "ODBMSOuuuuuu........", "OSBMBOuuvuuu........", "ODMHSOuuuuuu........", "OSBMBOuvuuu.........", ".OMHSO.......kkk....", ".OBMO....kkkkellk...", "..OMO.......klddk...", "..OSO........kkk....", "...O................"];
  var kB = ["..OSBO.", "..ODMO.", "..OSMHO", "..OBMHO", "..OSHMO", "..OBHLO", ".OSMHLO", ".OBHLHO", ".OMHLWO", ".OBLWHO", ".OMHWLO", ".OHLWHO", ".OMWLWO", "OHLWHLO", "OMWLWHO", "OLWHLWO", "OHLWLWO", ".OWLWO.", ".OLOWO.", ".OO.OO."];
  var mB = { O: "#2a060e", D: "#4a0a17", S: "#721422", B: "#991d22", M: "#bb2c24", H: "#d84b2b", L: "#ee7a3a" };
  var vB = [".......OOOOO........", ".....OOSBMHBOO......", "....OSBMHDLHMBSO....", "...OSBMHLDHLHMBSO...", "..OSBMHLHDMHLHMBSO..", ".OSBMHMHMDSMHMHMBSO.", ".OSBMHMBSO.OSMHMBSO.", ".OSBMHBSO.S.OSMHBSO.", ".OSBMBSO..S..OSBMSO.", ".OSBMSO...D...OSBSO.", ".OSBSO.........OBSO.", ".OSBO..........OBSO.", ".OSO............OSO.", ".OSO............OSO.", ".OBO............OBO.", ".OSO............OSO.", ".OSO............OBO.", ".OMO............OMO.", ".OSO............OSO.", ".ODO............OBO.", "..OO............OSO.", "...O...........OBSO.", "...............OSO..", "...............OBO..", "..............OSO...", "..............OBO...", "..............ODO...", "...............O...."];
  var yB = ["......................", "......................", "......................", "......................", "....ODSBO......OBSDO..", "....OSBMO......OMBSO..", "....OSBMSO....OSMBSO..", "....ODSBMSDDDDSMBSDO..", "....OSBMHSDDDDSHMBSO..", "...OSBMHBSDDDDSBHMBSO.", "...ODSBMSDDDDDDSMBSDO.", "...OSDSBSDDDDDDSBSDSO.", "...ODSBSDDDDDDDDSBSDO.", "....ODSDO......OSBMSO.", ".....OO........ODBMSO.", "...............OSBMDO.", "...............ODBSO..", "...............OSBDO..", "...............ODSO...", "...............OSDO...", "...............ODO....", "................O....."];
  var LB = ["........OOOOOO........", "......OOSBMMBSOO......", ".....OSBMHHLHMBSO.....", "....OSBMHLLHHMBSBO....", "...OSBMHLHHMHMBSBSO...", "...OSBMHHMBMHMBSBSO...", "..OSBMHMBSBMHMBSBMSO..", "..OSBMHMBSBMHLMBSBMSO.", "..OSBMHMBSBMHLMBSBMSO.", "..OSBHLMBSBMHMBSBMHSO.", "..ODSBHMBSDBMHMBSBMSO.", "..OSBMHMBSDBHLHBSBMSO.", "..OSBMHLMBSDSBHMBSBMO.", "..OSBMHMBSDSBMHMBSDBO.", "..ODSBHMBSDSBMHLMBSDO.", "..OSBMHLBSDSBHLMBSDSO.", "..ODSBMHBSDSBMHMBSDBO.", "...OSBMHBSDSBMHMBSDO..", "...ODBMHBSDSBHLMBSDO..", "...OSBMLBSDSBMHMBSDO..", "...ODSBMHSDSBMHMBSDO..", "...OSDBMHBSDBHLMBSO...", "....ODBMHSDSBMHBSDO...", "....OSDBMBSDBMLMBSO...", "....ODSBMHSDSBMHBSO...", "....OSBMBSDBMHMBSDO...", "....ODSBMSDSBHMBSDO...", "....OSDBHBSDBMLBSDO...", ".....ODSBMSDSBMBSO....", ".....OSDBMBSDBHBSO....", ".....ODSBMSDSBMBSO....", "......OSDBHBSDBSO.....", "......ODSBMSDSBMO.....", ".......ODSBSDSBO......", ".......OSDBMSDSO......", "........ODSBSDO.......", "........OSDBDSO.......", ".........ODSDO........", ".........OSOSO........", ".........O.O.O........"];
  var CB = [".....OOOOOO.......", "...OOSBMHHBOO.....", "..OSBMHLLHMBSO....", ".OSBMHLHHMHMBSO...", ".OSBMHMHMBMHLHSO..", "OSBMHMBSBMHMHMBSO.", "OSBMHLBSBMHMBSMHO.", "OSBMHLBSDSBMSOSBO.", "ODBMHBSDSBSO.OSBO.", "OSBMHBSDSO...OSO..", "ODBMHBSDO.....O...", "OSBHLBSO..........", "ODBMHBSO..........", ".OBMHBSO..........", ".OSBHBO...........", ".ODBMBO...........", ".OSBHBO...........", ".ODBMSO...........", "..OSBO............", "..ODO............."];
  var jB = ["OSBHBO.", "ODBMBSO", "OSBMHSO", "ODBHLDO", "OSBMHSO", "ODBMHDO", "OSBHLSO", "ODBMHDO", "OSBMHSO", "ODBHLDO", "OSBMHSO", "ODBMHDO", ".OBHLSO", ".OBMHDO", ".OSMHSO", ".ODBHDO", ".OSBHSO", ".ODBMDO", "..OBHSO", "..OSMDO", "..ODBSO", "..OSDBO", "..OBOSO", "..OO.OO", "..O...O"];
  function AB(e) {
    a = e.material;
    s = S.Palette.pick("SKIN", e.cfg.skin, "light");
    B = a.cloth;
    o = a.trim;
    n = a.accent;
    i = a.armor;
    O = a.pants;
    t = a.mantle;
    h = a.cape;
    r = a.panel;
    return { Q: B.line, q: B.deep, c: B.shade, e: B.base, E: B.hi, N: o.line, n: o.deep, g: o.shade, G: o.base, Y: o.hi, K: o.spark, Z: n.line, z: n.deep, m: n.shade, r: n.base, R: n.hi, x: i.line, X: i.deep, j: i.shade, J: i.base, i: i.hi, I: i.spark, p: O.line, P: O.deep, u: O.shade, U: O.base, v: O.hi, A: t.line, a: t.deep, b: t.shade, B: t.base, w: t.hi, t: t.tip, T: t.tiphi, k: h.line, d: h.deep, s: h.shade, S: h.base, h: h.hi, l: h.pat, F: r.line, f: r.deep, o: r.shade, O: r.base, y: r.pat, 1: s.line, 2: s.deep, 3: s.shade, 4: s.base, 5: s.hi };
    var a;
    var s;
    var B;
    var o;
    var n;
    var i;
    var O;
    var t;
    var h;
    var r;
  }
  function QB(S) {
    return !(!S.p || !S.p.mirror) || "left" === S.dir;
  }
  function _B(S) {
    return S.g.side ? QB(S) ? 0 : 1 : S.g.back ? 1 : 0;
  }
  var YB = ["....NG..GN....", "...NgY..YgN...", "..eNGYGGYGNJ..", ".QeNgGYYGgNJx.", ".QEeNgzzgNJix.", ".QeENGmRGNJix.", ".QceENGYNjJix.", ".QceEeNNjJJix.", ".QceEeXjjJJix.", ".QcceEXnGnJix.", ".QceeEXjjJJix.", ".QcceNGYYGNix.", "ZzmrNGKKGNrmzZ", "ZmrRNYzzYNRrmZ", "ZzmrrNGGNrrmzZ", "ZzzmmnNNnmmzzZ", "AbzrNnGGnNrzbA", "AbzrxXnnXxrzbA", "Abzr.xXXx.rzbA", "Abzr..xx..rzbA"];
  var EB = ["....xx..xx....", "...xXjjjjXx...", "..xXjJJJJjXx..", ".xXjJJiiJJjXx.", ".xXjJJJJJJjXx.", ".xXjJJJJJJjXx.", ".xXjJJJJJJjXx.", ".xXjJJJJJJjXx.", ".xXjJJJJJJjXx.", ".xXjJJJJJJjXx.", ".xXjJJJJJJjXx.", ".xXjJJJJJJjXx.", "ZzmrrmrrmrrmzZ", "ZmrRrrRRrrRrmZ", "ZzmrrmrrmrrmzZ", "ZzzmmmzzmmmzzZ", ".AbBFgGGGGgFbA", ".AbBFfOOOOfFbA", ".AbBFfOyyOfFbA", ".AbBFfOOOOfFbA"];
  var qB = ["......Ng....", ".....NGYN...", "..xXjNgGYN..", ".xXjJNGYeQ..", ".xXjJxNeEQ..", ".xXjJxeEeQ..", ".xXjJxeEcQ..", ".xXjJxcEeQ..", ".xXjJxeEcQ..", ".xXjJxcEeQ..", ".xXjJxeEcQ..", ".xXjJxnGnQ..", ".ZzmrrmrRrZ.", ".ZmrRrrRKGN.", ".ZzmrrmrzGN.", ".ZzzmmmzmnZ.", ".AbBbBxrzQ..", ".AbBbBxrzcQ.", ".AbBbBxrzeQ.", ".AbBbBxrzcQ."];
  var KB = ["......Ng....", ".....NGYN...", "..xXjNgGYN..", ".xXjJNGYix..", ".xXjJxNJix..", ".xXjJxjJix..", ".xXjJzrJix..", ".xXjJxzriX..", ".xXjJxjzrx..", ".xXjJxjJzr..", ".xXjJxjJix..", ".xXjJxnGnx..", ".ZzmrrmrRrZ.", ".ZmrRrrRKGN.", ".ZzmrrmrzGN.", ".ZzzmmmzmnZ.", ".AbBbBxrzQ..", ".AbBbBxrzcQ.", ".AbBbBxrzeQ.", ".AbBbBxrzcQ."];
  var UB = ["N.........", "NYN..NNN..", "NgYNNYYGNN", ".NgYGGGYGN", "NNgGYYGGgN", "NYNggnnggN", "NgYGGYGGgN", ".NgGYGYGnN", ".NnnggnnN.", "..NNNNNN.."];
  var XB = ["x.........", "xGx..xxx..", "xgGxxGYGxx", ".xgYGjiJGx", "xxGGYGGGgx", "xiXjjXXjjx", "xjiJJiJJjx", ".xjJiJiJXx", ".xnGGYGnx.", "..xxxxxx.."];
  var RB = ["..NN.....", ".NYYNN...", "NYGGYGNN.", "NgYGYGYGN", "NGYgYgYGN", "NgGYgYGgN", "NgYgGgYgN", "NnGgYgGnN", ".NnGgGnN.", "..NNnNN.."];
  var zB = ["...AbBzr", "...AbBzR", "..AabwzR", "..AabwBr", "..AbBwzr", ".AabBwzr", ".AabBwzR", ".AbbBwzr", ".AabBwzr", "AabbBwzr", "AabbBwzR", "AabbBwzr", "AatbBwzr", "AatbBTzr", "A.tbaT.r", "..ta.t.Z", "..t..t.."];
  var VB = ["QeEEeQ", "QceGeQ", "QcGYeQ", "QceGeQ", "QcEeGQ", "QcegYQ", "QceEGQ", "QceGeQ", "QcGYeQ", "QceGeQ", "QcEeGQ", "QcegYQ", "QqcEGQ", "QqceGQ", "QqGYgQ", "QngGnQ", "NnGGnN", ".NNNN."];
  var FB = ["NgOOOOOOgN", "NgOyOOyOgN", "NgOOyyOOgN", "NgyOOOOygN", "NgOyOOyOgN", "NgOOyyOOgN", "NgyOOOOygN", "NgOyOOyOgN", "NgOOyyOOgN", ".NgOyyOgN.", ".NgyOOygN.", "..NgyygN..", "..NnGGnN..", "...NGGN...", "....NN...."];
  var PB = ["...AbBBw", "...AbBwB", "..AabBwB", "..AabBwB", "..AbbBwB", ".AabbBwB", ".AabbBwB", ".AabbwBw", ".AabbBwB", "AabbBwBw", "AabbBwBB", "AabbBwBw", "AatbBwBb", "AatbBTba", "A.tbaT.t", "..ta.t.t", "..t..t.."];
  var TB = ["....AabBBB", "....AabBwB", "...AabBBwB", "...AabBBwB", "...AabbBwB", "..AabbBBwB", "..AabbBwBw", "..AabbBBwB", ".AabbBBwBw", ".AabbBwBwB", "AabbBBwBwB", "AabbBwBwBb", "AatbBwBwba", "AatbBTbTba", "A.tba.Tt.a", "..ta..t.t.", "..t...t..."];
  var ZB = ["zrQ", "zrc", "zRe", "zrc", "zre", "zRc", "zrE", "zrc", "zRe", "zrc", "zrE", "zRc", "zrg", "ZrG", "ZnN", ".ZN"];
  var IB = ["kSSk..", "kShSk.", "kSsSk.", "kdShSk", "kdSsSk", "kdShSk", "kdSlSk", "kdlSSk", "kdSlhk", "kdsSlk", "kdSlSk", "kdlSsk", "kdSslk", "kdsSSk", "kdSdSk", "kdkdsk", "k.kdk.", "..k.k."];
  var $B = ["....kSk", "...kSSk", "...kShk", "..kSsSk", "..kdShk", "..kdSsk", ".kdSsSk", ".kdShSk", ".kdlSlk", ".kdSllk", "kdsSlSk", "kdSlSsk", "kdlSlhk", "kdSllSk", "kdsSSSk", "kdSsSsk", "kdsSSdk", "kdSkdsk", "kdk.kdk", ".k...k."];
  var So = ["Zr.", "zrR", "zrr", ".zr", ".zR", "..z"];
  var eo = ["xix", "XJi", "xjX", "x.x"];
  var ao = [["..9.", ".99.", ".980", "9800", "8008", "7887", ".77."], [".9..", ".99.", "0890", "0089", "8008", "7887", ".77."]];
  function so(S, e, a, s, B, o, n, i, O) {
    var t;
    var h = s + 2 - a;
    var r = B.length;
    var d = [];
    if (h >= r) {
      for (t = 0; t < r; t++)
        d.push(B[t]);
    }
    else {
      var b = r - h;
      if (b <= o) {
        for (t = 0; t < r; t++)
          (t < 1 || t > b) && d.push(B[t]);
      }
      else {
        for (t = r - h; t < r; t++)
          d.push(B[t]);
      }
    }
    as(S, e, a, d, n, i, O);
  }
  function Bo(S, e, s) {
    var B = AB(e);
    var o = s === _B(e);
    if (e.g.side) {
      if (1 !== s) {
        return;
      }
      as(S, e.g.arms[1].x - 3, a.ARM_Y - 4 + e.dy, RB, B, !1);
    }
    else {
      var n = e.g.arms[s].x + 1;
      var i = a.ARM_Y + e.dy;
      var O = o ? UB : XB;
      if (0 === s) {
        as(S, n - 5, i - 5, O, B, !1);
      }
      else {
        as(S, n + 5, i - 5, O, B, !0);
      }
    }
  }
  function oo(S, e) {
    var a;
    var s = S.arms[e];
    var B = w(s);
    var o = h(s);
    var n = o.x - B.x;
    var i = o.y - B.y;
    var O = Math.sqrt(n * n + i * i) || 1;
    var t = n / O;
    var r = i / O;
    var d = -r;
    var b = t;
    a = Math.abs(d) > .3 ? (B.x - (S.torso.x + S.torso.w / 2)) * d >= 0 ? 1 : -1 : b > 0 ? 1 : -1;
    if (S.g.side) {
      a = b > .2 ? 1 : b < -.2 ? -1 : d < 0 ? 1 : -1;
    }
    return { a: s, s: B, h: o, len: O, far: S.g.side && 0 === e && !s.front, Q: function (S, e) {
        return [B.x + t * S + d * e * a, B.y + r * S + b * e * a];
      } };
  }
  function no(S) {
    var e = Math.max(5, Math.round(S.len - 3));
    return { mouth: e, drop: e + 2 };
  }
  function io(S) {
    var e = no(S);
    var a = S.Q;
    return [a(-1, -2.4), a(e.mouth, -2.9), a(e.mouth, -1), a(e.drop + 1, 4.4), a(e.drop - 1, 5.2), a(.45 * e.mouth, 4.2), a(-1, 2.6)];
  }
  function Oo(S) {
    return Math.max(4, Math.round(S.len - 1));
  }
  function to(S, a, s) {
    var B = oo(a, s);
    var o = a.material;
    var n = o.cloth;
    var i = o.trim;
    var O = o.accent;
    var t = B.far;
    var h = B.Q;
    function r(S) {
      return [Math.round(S[0]), Math.round(S[1])];
    }
    function d(a, s, B, o, n) {
      var i = r(h(a, s));
      var O = r(h(B, o));
      e.line(S, i[0], i[1], O[0], O[1], n);
    }
    var b = no(B);
    var l = b.mouth;
    var f = b.drop;
    u(S, io(B), n.line);
    u(S, [h(0, -1.5), h(l - 1, -2), h(l - 1, -.4), h(f, 3.6), h(f - 1, 4.2), h(.45 * l, 3.3), h(0, 1.7)], t ? n.shade : n.base);
    d(0, 1, .45 * l, 2.6, t ? n.base : n.hi);
    d(.45 * l, 3, f - 1, 3.6, t ? n.deep : n.shade);
    d(1, -1, l - 1, -1.3, t ? n.deep : n.shade);
    d(2, .6, l - 1, 1.4, t ? n.shade : n.base);
    d(.5 * l, 1.6, f - 2, 2.4, t ? n.deep : n.shade);
    var c = Math.max(2, Math.round(.4 * l));
    d(c, 0, c + 2, 1.6, t ? i.deep : i.shade);
    d(l - 1, -1.8, l - 1, 0, t ? i.shade : i.base);
    d(l, -.2, f, 3.2, t ? i.deep : i.base);
    d(l + 1, -.4, f - 1, 2, t ? O.deep : O.base);
  }
  function ho(S, a, s) {
    var B = oo(a, s);
    var o = B.a;
    var n = B.h;
    var i = a.material;
    var O = i.armor;
    var t = i.trim;
    var h = B.far;
    var r = B.Q;
    function d(S) {
      return [Math.round(S[0]), Math.round(S[1])];
    }
    function b(a, s, B, o, n) {
      var i = d(r(a, s));
      var O = d(r(B, o));
      e.line(S, i[0], i[1], O[0], O[1], n);
    }
    function l(a, s, B) {
      var o = d(r(a, s));
      e.dot(S, o[0], o[1], B);
    }
    var f = Oo(B);
    u(S, function (S) {
      var e = Oo(S);
      var a = S.Q;
      return [a(-1, -2.3), a(e, -2), a(e, 2.4), a(-1, 2.6)];
    }(B), O.line);
    u(S, [r(0, -1.4), r(f - 1, -1.1), r(f - 1, 1.5), r(0, 1.7)], h ? O.deep : O.base);
    b(0, -.6, f - 1, -.4, h ? O.shade : O.hi);
    b(1, 1.1, f - 1, .9, h ? O.line : O.shade);
    for (var c = 3; c < f - 2; c += 3)
      b(c, -1.4, c, 1.6, O.line), l(c + 1, -.5, h ? O.hi : O.spark);
    var G = Math.max(3, Math.round(.5 * B.len));
    b(G, -1.6, G, 1.8, h ? t.deep : t.shade);
    l(G, -.6, h ? t.shade : t.hi);
    b(f - 1, -1.4, f - 1, 1.7, h ? t.deep : t.base);
    var H = h ? { x: O.line, X: O.line, J: O.deep, i: O.shade, j: O.deep } : { x: O.line, X: O.deep, J: O.base, i: O.hi, j: O.shade };
    QO(S, n.x - 1, n.y - 1, eo, H, !1);
    if (o.palm) {
      e.dot(S, n.x + 2, n.y, h ? O.deep : O.base);
    }
  }
  function ro(S, e, a) {
    if (bo(e)) {
      var s = e.material.flame;
      var B = function (S, e) {
        var a = h(S.arms[e]);
        return { x: Math.max(0, Math.min(28, a.x - 2)), y: Math.max(0, a.y - 5) };
      }(e, a);
      var o = { 6: s.line, 7: s.deep, 8: s.base, 9: s.hi, 0: s.core };
      var n = (0 | e.p.bob) + (0 | e.p.leg) + (0 | e.p.step) + (0 | e.p.atk) & 1;
      QO(S, B.x, B.y, ao[n], o, !1);
    }
  }
  function bo(e) {
    return !(S.WeaponArt && S.WeaponArt.has(e.cfg) || e.g.back || "hurt" === e.p.act || "down" === e.p.act);
  }
  function lo(S, e, a) {
    var s = _B(e);
    var B = e.arms[0];
    var o = !(!B.front && !B.over);
    if (a === s) {
      to(S, e, a);
    }
    else {
      ho(S, e, a);
    }
    Bo(S, e, a);
    if (a !== s || 0 === a && o) {
      if (1 === a && 0 === s && o) {
        ro(S, e, 0);
      }
    }
    else {
      ro(S, e, a);
    }
  }
  function fo(S, e, a) {
    var s = e.torso;
    var B = GB(e);
    if (e.g.side) {
      as(S, s.x - 6, s.y + 2, gB(e, $B, s.y + 2), a, !1, xB(HB(e), 10, 10));
    }
    else {
      var o = s.y + 2;
      var n = gB(e, IB, o);
      if (e.g.back) {
        as(S, s.x - 3, o + 1, n, a, !0, xB(-B, 9, 10));
      }
      else {
        as(S, s.x + s.w + 2, o + 1, n, a, !1, xB(B, 9, 10));
      }
    }
  }
  function co(S) {
    var e = {};
    S({ fillStyle: "#000000", fillRect: function (S, a, s, B) {
        for (var o = a; o < a + B; o++)
          for (var n = S; n < S + s; n++)
            e[n + "," + o] = 1;
      } });
    return e;
  }
  function Go(e, a) {
    var s = _B(e);
    var B = !1;
    var o = S.Palette.pick("SKIN", e.cfg.skin, "light");
    var n = Object.create(e);
    n.material = g.sat_luc_y;
    var i = co(function (S) {
      for (var i = 0; i < 2; i++) {
        var O = e.arms[i];
        if (O && (a ? 1 === i || O.front || O.over : O.over && (!e.g.side || 0 !== i))) {
          B = !0;
          p(S, O, o, 0 === i);
          if (i === s) {
            to(S, n, i);
            if (bo(n)) {
              ro(S, n, i);
            }
          }
          else {
            ho(S, n, i);
          }
        }
      }
    });
    return B ? function (S, e) {
      return 1 === i[S + "," + e];
    } : null;
  }
  var Ho = { O: "#131016", D: "#1d1a21", S: "#2c2731", B: "#433c47", M: "#6b6371", H: "#9f97a6", L: "#cbc6d1", W: "#efedf3", u: "#3b3540", v: "#57505c", n: "#7a5a2c", a: "#c8a060", A: "#f2d9a0", z: "#5a1018", r: "#94202a", R: "#c8423c", w: "#f3efe9", q: "#bdb6b0", t: "#249a96", T: "#62d8ca", k: "#16131a", e: "#e6e2ea" };
  var go = ["........O..OO..O.....", ".....O.OWOOLWOOHO....", "...O.OLWHLWWHMOLWHO..", "..OWOLWHSDSLWWLHMMBO.", ".OLWLWHSDMHLLHHMBSBSO", "OLWHWHSDMLWHMBSDSBSMO", "OWLWHSDMLWHMSDDSDSBMO", "OLWHSDMLWHMSDDDDSDSBO", "OHLSDSLWHMSDDDAnDSDSO", "OHWLWOnaaAaaaAnAnuvO.", ".OLWHO........A..vuSO", "..OWLO...........vSO.", "..OLHO...........uDO.", "...OWO...........OSDO", "..OLHO............OSO", "..OHLO.............DO", "..OLO..............SO", "...OMO.............DO", "...OLO.............O.", "....O................"];
  var xo = [".............O..O..O........", "..........OOWLOHWLOLWO......", "........OOWLHMLWWHMHLWO.....", "......OOLWHMSSMLWLHMSHLO....", "....OOLWHMSDMHLWHMSDSMHO....", "...OLWHMSDMHLWHMSDDSBMBO....", "..OWLHSDMLWHMSDDSDDSBSO.....", ".OLHMDSLWHMSDDDSDDSDSDO.....", ".OHMDSLWHSDDOOOOODSDSO......", ".OMDSWLHDOuvuuvuunaaaAn.....", ".OHDSLWHDOuvuuvuvu..........", ".OMSDWLHSOvuuvuuvu..........", "..OSDLWMDOuvuuvuu...........", "..ODSWLHDSOuu...............", "..OSDLWMSDOvu...............", "...ODHLWDSOuO...............", "...OSWLHDSDO................", "...ODLWMSDO.................", "...OSHLWDO..................", "...ODLHLSO..................", "...OSWMHDO..................", "....OLHLO...................", "....OWLHO...................", ".....OWO....................", "......O....................."];
  var Do = ["an", "zr", "rR", "zr", ".r", "zr", "rR", "wq", "ww", "wq", "q."];
  var Wo = [".......O...O...O........", ".....OOLWOSLWOHLWOO.....", "....OOWDMSSWDDWSDLOO....", "...ODSWDMSSWDDWSDLSSO...", "..ODDSLDMDSLDSLSDLSSSO..", "..ODDDSHMDSLDSLDHHSSDO..", "..OSDDSHDMSLDSHDHSSDDO..", "..OLSDDHDMSHDSHDHSDDLO..", "...OHDDHMMSHDMMDMSDHO...", "...OHSDDMBSMDMDMSDDHO...", "....OMSDMDBMDBDBDDMO....", ".....OBSBBBBSBBBDBO.....", "......OBDBDBSDBDBO......", "......ODBDDDSSDBDO......", ".......ODSSDDDSDO.......", ".......ODDnaanSSO.......", ".......OSnrRRrnSO.......", "........OSnzznSO........", "........OSLrzLSO........", "........ODWrzWDO........", ".......OSLHrzHLSO.......", ".......ODWMrzMWDO.......", ".......OSLDrzDLSO.......", ".......OHWSrzSWHO.......", ".......ODLHrzHLDO.......", "........OWMrzMWO........", "........OLDrzDLO........", ".........OHrzHO.........", ".........OLrzLO.........", "..........OrzO..........", "...........zr..........."];
  function Jo(e) {
    a = e.material;
    s = S.Palette.pick("SKIN", e.cfg.skin, "light");
    B = a.cloth;
    o = a.white;
    n = a.trim;
    i = a.accent;
    O = a.red;
    t = a.olive;
    h = a.brown;
    r = a.teal;
    d = a.pants;
    return { x: B.line, X: B.deep, j: B.shade, J: B.base, i: B.hi, Q: o.line, q: o.deep, c: o.shade, e: o.base, E: o.hi, N: n.line, n: n.deep, g: n.shade, G: n.base, Y: n.hi, Z: i.line, z: i.deep, m: i.shade, r: i.base, R: i.hi, F: O.line, f: O.deep, o: O.base, O: O.hi, A: t.line, a: t.deep, b: t.shade, B: t.base, V: t.hi, K: h.line, k: h.deep, h: h.shade, H: h.base, U: h.hi, t: r.deep, T: r.base, y: r.hi, p: d.line, P: d.deep, u: d.shade, s: d.base, v: d.hi, 1: s.line, 2: s.deep, 3: s.shade, 4: s.base, 5: s.hi };
    var a;
    var s;
    var B;
    var o;
    var n;
    var i;
    var O;
    var t;
    var h;
    var r;
    var d;
  }
  var uo = ["....xk..kQ....", "...xJkh.hkeQ..", "..xJJkHhhkeeQ.", ".xNGNkTHhkeEQ.", ".xGTGkhTHkeeQ.", ".xNGNjkhTHeEQ.", ".xJoJjxkhTeeQ.", ".xJOJjJxkeTeQ.", ".xJoJjJJxeETQ.", ".xjfJjJJxEeeQ.", ".xjJJjJJxeEeQ.", ".xjJiJjJxeeEQ.", "AbBBVBBBBVBBbA", "ZzmrrrRRrrrmzZ", "AbBBBmRRmBBBbA", "AaZzmrzzrmzZaA", "xJjJNhofQeeEeQ", "xJjJNhofQeEeeQ", "xjJjNHoOQeeEeQ", "xjJjNhfqQeEeeQ"];
  var Mo = ["....xx..xx....", "...xjJJJJjx...", "..xGgJJJJgGx..", ".xjGgJJJJgGjx.", ".xJjGJJJJGjJx.", ".xJJjJJJJjJJx.", ".xJJJJJiJJJJx.", ".xJjJJJJJJjJx.", ".xJJJJiJJJJJx.", ".xJjJJJJJJjJx.", ".xJJJJJJiJJJx.", ".xJjJJJJJJjJx.", "AbBBVBBBBVBBbA", "ZzmrrrmmrrrmzZ", "AbBBBBBBBBBBbA", "AaZzmrzzrmzZaA", "xJjJJJofJJJjJx", "xJjJJJofJJJjJx", "xjJjJJoOJJjJjx", "xjJjJJfoJJjJjx"];
  var wo = ["......kQ....", ".....xkeQ...", "..xXjxhkeQ..", ".xXjJxkTeQ..", ".xXjJxhkTQ..", ".xXjJxkhTQ..", ".xXjJJxkeT..", ".xXjJJxheQ..", ".xXjJJxkeQ..", ".xXjJJxheQ..", ".xXjJJxkeQ..", ".xXjJJxkeQ..", ".AbBBVBBBbA.", ".ZzmrrrRRzZ.", ".AbBBBBmRRz.", ".AaZzmrzzfo.", ".xXjJJhHQeo.", ".xXjJJhHQef.", ".xXjJJhHQeQ.", ".xXjJJhHQeQ."];
  var No = ["......xQ....", ".....QxeQ...", "..QqcQXxeQ..", ".QqceQxXeQ..", ".QqceeQxeQ..", ".QqcEeQxXQ..", ".QqceEeQxQ..", ".QqceeEQxQ..", ".QqcEeeQeQ..", ".QqceEeQeQ..", ".QqcEeeQeQ..", ".QqceeEQeQ..", ".AbBBVBBBbA.", ".ZzmrrrRRzZ.", ".AbBBBBmRRz.", ".AaZzmrzzfo.", ".QqceEeQtGo.", ".QqcEeeQTyf.", ".QqceEeQtGQ.", ".QqcEeeQTQ.."];
  var po = [".xJjJJNh", ".xJjJiNh", ".xJjJJNH", "xJjJiJNh", "xJjJJJNh", "xJjiJJNH", "xJjJJJNh", "xJjJJJNh", "xJgJJJNh", "xGJgJJNh", "xJGgJJNH", "xNNGGNNh", "xxJNNxNh", ".xxJxxhN", "..xxx.NN"];
  var ko = ["QeeEeeeQ", "QeEeeceQ", "QeeEeeeQ", "QceeEeeQ", "QeeEeceQ", "QeEeeeeQ", "QeeEeceQ", "QceeEeeQ", "QeeEeeeQ", "QeEeceeQ", "QeeeEeeQ", "QceEeceQ", "QqeeEeeQ", ".QceeEeQ", "..QceEeQ", "...QceQ.", "....QQ.."];
  var mo = ["Tt", "T.", "G.", "t.", "Y.", "T.", "E.", "E.", "c.", "o.", "o.", "f."];
  var vo = ["..xJjJJJ", "..xJjJiJ", ".xJjJJJJ", ".xJjJiJJ", ".xJjJJJJ", "xJjJJiJJ", "xJjJJJJJ", "xJjJJJiJ", "xJgJJJJJ", "xGJgJJgJ", "xJGgJgJG", "xNNGGNNN", "QcExxQcE", ".QcQ.QcQ", "..Q...Q."];
  var yo = ["QeEeeQ", "QeeEcQ", "QeEeeQ", "QceEeQ", "QeeEeQ", "QeEecQ", "QeeEeQ", "QceEeQ", "QeEeeQ", "QeeEcQ", "QeEeeQ", "QceeEQ", ".QeEQ.", "..QQ.."];
  var Lo = ["....xJjJJJ", "....xJjJiJ", "...xJjJJJJ", "...xJjJiJJ", "...xJjJJJJ", "..xJjJJiJJ", "..xJjJJJJJ", "..xJjJJJiJ", ".xJjJJJJJJ", ".xJgJJJgJJ", "xJGgJJGgJJ", "xJgGJJJgGJ", "xNNGGNNGGN", "xxJNNxxNNx", ".xxJxx.xx.", "..xx...x.."];
  var Co = ["....QeeEee", "....QeEeee", "...QeeEeee", "...QeEeeEe", "...QeeEeee", "..QeeEeeEe", "..QeEeeeEe", "..QeeEeeee", ".QeEeeEeee", ".QecceEcce", "QeceEcecEe", "QcEceeceEe", "QeeeEeeeEe", "QqeeeqQeeQ", ".QqeQQ.QQ.", "..QQ......"];
  var jo = ["Qe", "Qe", "QE", "Qe", "Qe", "QE", "Qe", "Qe", "QE", "Qe", "Qe", "Qc", "Qe", ".Q"];
  var Ao = [".NNNN.", "NGYYGN", "GYnnYG", "GnTTnG", "NGnnGN", ".NGGN.", "..NG..", "..Nn.."];
  var Qo = ["YG...", "Gkh..", ".kUh.", "..khN", ".NGYG", "..NGN"];
  function _o(S, a, s) {
    var B = function (S, e) {
      return oo(S, e);
    }(a, s);
    var o = a.material;
    var n = B.far;
    var i = B.Q;
    var O = s === _B(a) || a.g.back;
    var t = O ? o.cloth : o.white;
    var h = o.white;
    var r = o.cloth;
    var d = o.trim;
    function b(S) {
      return [Math.round(S[0]), Math.round(S[1])];
    }
    function l(a, s, B, o, n) {
      var O = b(i(a, s));
      var t = b(i(B, o));
      e.line(S, O[0], O[1], t[0], t[1], n);
    }
    function f(a, s, B) {
      var o = b(i(a, s));
      e.dot(S, o[0], o[1], B);
    }
    var c = no(B);
    var G = c.mouth;
    var H = c.drop;
    if (u(S, io(B), t.line), u(S, [i(0, -1.5), i(G - 1, -2), i(G - 1, -.4), i(H, 3.6), i(H - 1, 4.2), i(.45 * G, 3.3), i(0, 1.7)], n ? t.shade : t.base), l(0, 1, .45 * G, 2.6, n ? t.base : t.hi), l(.45 * G, 3, H - 1, 3.6, n ? t.deep : t.shade), l(1, -1, G - 1, -1.3, n ? t.deep : t.shade), l(2, .6, G - 1, 1.4, n ? t.shade : t.base), O) {
      var g = G - 3;
      l(g, -1.8, g + 2, 3.2, n ? h.shade : h.base);
      l(g + 1, -1.9, g + 3, 3.4, n ? h.deep : h.hi);
      f(g + 1, -.4, r.line);
      f(g + 2, 1.4, r.line);
      f(g + 2, 2.8, r.line);
      l(G, -.2, H, 3.2, n ? h.shade : h.base);
      l(G + 1, -.4, H - 1, 2, n ? h.deep : h.shade);
    }
    else {
      l(G, -.2, H, 3.2, n ? t.deep : t.shade);
      l(G + 1, -.4, H - 1, 2, r.base);
      f(G + 1, .6, d.base);
    }
  }
  function Yo(S, e, s) {
    _o(S, e, s);
    if (s === _B(e)) {
      (function (S, e, s) {
        var B = Jo(e);
        if (e.g.side) {
          if (1 !== s || QB(e)) {
            return;
          }
          as(S, e.g.arms[1].x - 2, a.ARM_Y - 1 + e.dy, Ao, B, !1);
        }
      })(S, e, s);
    }
  }
  function Eo(e) {
    return !(S.WeaponArt && S.WeaponArt.has(e.cfg));
  }
  function qo(e, a) {
    var s = !1;
    var B = S.Palette.pick("SKIN", e.cfg.skin, "light");
    var o = Object.create(e);
    o.material = g.tan_mo_y;
    var n = co(function (S) {
      for (var n = 0; n < 2; n++) {
        var i = e.arms[n];
        if (i && (a ? 1 === n || i.front || i.over : i.over && (!e.g.side || 0 !== n))) {
          s = !0;
          p(S, i, B, 0 === n);
          _o(S, o, n);
        }
      }
    });
    return s ? function (S, e) {
      return 1 === n[S + "," + e];
    } : null;
  }
  var Ko = { ink: "#091923", navy: "#13283c", steel: "#244257", steelHi: "#43627a", jadeDeep: "#123e43", jadeShade: "#1c6262", jade: "#318c80", jadeHi: "#65b4a0", goldDark: "#71502b", gold: "#c8994d", goldHi: "#f0d08b", stitch: "#afa870", redDark: "#421927", red: "#872d42", redHi: "#ba5060", hair: "#111b2b" };
  function Uo(S, a) {
    function s(s, B, o, n, i) {
      if (o = Math.round(o), n = Math.round(n), s = Math.round(s), B = Math.round(B), !(o <= 0 || n <= 0))
        if (a) {
          for (var O = B; O < B + n; O++)
            for (var t = s; t < s + o; t++)
              a(t, O) || e.r(S, t, O, 1, 1, i);
        }
        else {
          e.r(S, s, B, o, n, i);
        }
    }
    function B(S, e, a) {
      s(S, e, 1, 1, a);
    }
    function o(S, e, a, s) {
      a.forEach(function (a, o) {
        a.split("").forEach(function (a, n) {
          if (s[a]) {
            B(S + n, e + o, s[a]);
          }
        });
      });
    }
    return { rect: s, dot: B, line: function (S, e, a, B, o, n) {
        n = n || 1;
        S = Math.round(S);
        e = Math.round(e);
        a = Math.round(a);
        B = Math.round(B);
        for (var i, O = Math.abs(a - S), t = S < a ? 1 : -1, h = -Math.abs(B - e), r = e < B ? 1 : -1, d = O + h; s(S - Math.floor(n / 2), e - Math.floor(n / 2), n, n, o), S !== a || e !== B;)
          (i = 2 * d) >= h && (d += h, S += t), i <= O && (d += O, e += r);
      }, poly: function (S, e) {
        var a;
        var B;
        var o;
        var n;
        var i;
        var O;
        var t;
        var h = 1 / 0;
        var r = -1 / 0;
        for (a = 0; a < S.length; a++)
          h = Math.min(h, S[a][1]), r = Math.max(r, S[a][1]);
        for (o = Math.ceil(h); o <= Math.floor(r); o++) {
          for (n = [], a = 0, B = S.length - 1; a < S.length; B = a++)
            i = S[B], O = S[a], (i[1] <= o && O[1] > o || O[1] <= o && i[1] > o) && n.push(i[0] + (o - i[1]) * (O[0] - i[0]) / (O[1] - i[1]));
          for (n.sort(function (S, e) {
            return S - e;
          }), t = 0; t + 1 < n.length; t += 2)
            s(Math.ceil(n[t]), o, Math.floor(n[t + 1]) - Math.ceil(n[t]) + 1, 1, e);
        }
      }, stamp: o, motif: function (S, e) {
        o(S, e, ["..s..", ".s.s.", "s.s.s", ".s.s.", "..s.."], { s: Ko.stitch });
      } };
  }
  var Xo = { o: "#091923", O: "#123e43", d: "#1c6262", D: "#318c80", h: "#65b4a0", H: "#9fd8c4", k: "#091923", K: "#13283c", e: "#244257", E: "#43627a", f: "#6f8fa8", N: "#3d2a12", n: "#71502b", g: "#a07a3c", G: "#c8994d", Y: "#f0d08b", y: "#fff1c4", r: "#421927", R: "#872d42", q: "#ba5060", s: "#afa870" };
  var Ro = { line: "#091923", deep: "#123e43", shade: "#1c6262", base: "#318c80", hi: "#65b4a0" };
  var zo = { line: "#091923", deep: "#13283c", shade: "#244257", base: "#43627a", hi: "#6f8fa8" };
  var Vo = { line: "#3d2a12", deep: "#71502b", shade: "#a07a3c", base: "#c8994d", hi: "#f0d08b" };
  var Fo = ["...oh....ho...", "..NGhD..DhGN..", ".NGYGhDDhGYGN.", "kNgGGGnnGGGgNk", "kfEeNGGNeEeEek", "kKKNYYGgNKkKKk", "kEfGYhDgGeEeEk", "kKKGgDOgGkKkKk", "kfENggggNeEeEk", "kKKkNnnNkKkKKk", "kfEeEeEeEeEeEk", "kKkKkKkKkKkKKk", "kEeEeEeEeEeEek", "NgGGGGGGGGGGgN", "NGYGGGGGGGGYGN", "NnggggggggggnN"];
  var Po = [".N..NN..N.", ".NGnGGnGN.", ".GkYGGYkG.", ".NGGrrGGN.", "sNgYYgNs..", "..NNggNN.."];
  var To = ["..odDhD.", "..odDhD.", "..odDhD.", "..odDhD.", "..odDhD.", "..odDhD.", "..odDhD.", "..odDhD.", ".odDDhD.", ".odDhDD.", ".odhDDD.", ".odDhDD.", "odDDhDD.", "odDsDhD.", "odsDsDD.", "odDsDhD.", "odDDhDD.", "nGGYGGn.", "NnnnnnN.", ".NNNNN.."];
  var Zo = ["rR", "Rq", "rR", "Rq", "rR", "rR", "Rq", "rR", "rR", "nG", "rR", "r."];
  var Io = ["...ohhhhhho...", "..NGhDDDDhGN..", ".NGYGGGGGGYGN.", "kNgGGGGGGGGgNk", "kfEeEeEeEeEeEk", "kKkKkKkKkKkKKk", "kEfEeEeEeEeEek", "kKKkKkKkKkKkKk", "kfEeEeEeEeEeEk", "kKkKkKkKkKkKKk", "kEfEeEeEeEeEek", "kKKkKkKkKkKkKk", "kfEeEeEeEeEeEk", "NgGGGGGGGGGGgN", "NGYGGGGGGGGYGN", "NnggggggggggnN"];
  var $o = ["..odDhDDDDDDdo..", "..odDhDDDDDDdo..", "..odDhDDDDDDdo..", "..odDhDDDDDDdo..", "..odDhDDDDDDdo..", "..odDhDDDDDDdo..", "..odDhDDDDDDdo..", "..odDhDDDDDDdo..", ".odDDhDDDDDDdo..", ".odDhDDDsDDDdo..", ".odDhDDsDsDDdo..", "odDDhDDDsDDDDdo.", "odDhDDDsDsDDDdo.", "odhDDDsDDDsDDdo.", "odDhDDDDDDDDDdo.", "odDDhDDDDDDDDdo.", "nGGYGGGGGGGYGGn.", "NnnnnnnnnnnnnnN.", ".NNNNNNNNNNNNN.."];
  var Sn = ["....oh.h....", "..NGhDDhG...", ".NGYGhDhGYN.", ".kgGGGGGGgNk", ".kfEeEeEeNGk", ".kKkKkKkKGYk", ".kEfEeEeENgk", ".kKkKkKkKkKk", ".kfEeEeEeEek", ".kKkKkKkKkKk", ".kEfEeEeEeEk", ".kKkKkKkKkKk", ".kfEeEeEeEek", ".NgGGGGGGNGk", ".NGYGGGGGkYG", ".NnggggggNgN"];
  var en = ["...odDhDDDDdRo.", "...odDhDDDDdRo.", "...odDhDDDDdqo.", "...odDhDDDDdRo.", "...odDhDDDDdRo.", "...odDhDDDDdRo.", "...odDhDDDDdqo.", "...odDhDDDDdRo.", "..odDDhDDDDdRo.", "..odDhDDDDDdRo.", "..odDhDDsDDdRo.", ".odDDhDsDsDdRo.", ".odDhDDDsDDdnG.", ".odhDDDsDDDdRo.", ".odDhDDDDDDdRo.", ".odDDhDDDDDdro.", ".nGGYGGGGYGGn..", ".NnnnnnnnnnnN..", "..NNNNNNNNNN..."];
  var an = ["..NNNN..", ".NGYYGN.", "NGfEeeGN", "NkKkKkKN", "NfEeEeEN", "NkKkKkKN", ".NGGggN.", "..NNNN.."];
  var sn = [".NNNN..", "NGYYGN.", "NfEeeGN", "NkKkKkN", "NfEeEeN", ".NGggN.", "..NNN.."];
  var Bn = [".....odDhDDDDDDdo.....", "....odDhDDDDDDDDdo....", "...odDhDDDDDDDDDDdo...", "..odDDhDDDDDDDDDDDdo..", ".odDDhDDDDDDDDDDDDDdo.", "odDDhDDDDDDDDDDDDDDDdo", "odDhDDDsDDDDDDsDDDDDdo", "odDhDDsDsDDDDsDsDDDDdo", "odhDDDDsDDDDDDsDDDDDdo", "nGGYGGGGGGGGGGGGGYGGGn", "NnnnnnnnnnnnnnnnnnnnnN", ".NNNNNNNNNNNNNNNNNNNN."];
  var on = ["...odDhDDDdRo.....", "..odDhDDDDdRo.....", "..odDhDDDDDdqo....", ".odDDhDDDDDDdRo...", ".odDhDDDDDDDDdRo..", "odDDhDDDDDDDDDdRo.", "odDhDDDsDDDDDDdRo.", "odDhDDsDsDDDDDdro.", "odhDDDDsDDDDDDDdo.", "nGGYGGGGGGGGGYGGn.", "NnnnnnnnnnnnnnnnN.", ".NNNNNNNNNNNNNNN.."];
  function nn(S, e, s) {
    y(S, e, s, { C: Ro, B: zo, T: Vo });
    (function (S, e, s) {
      if (e.g.side) {
        if (1 !== s) {
          return;
        }
        as(S, e.g.arms[1].x - 2, a.ARM_Y - 3 + e.dy, sn, Xo, !1);
      }
      else {
        var B = e.g.arms[s].x + 1;
        var o = a.ARM_Y + e.dy;
        if (0 === s) {
          as(S, B - 4, o - 4, an, Xo, !1);
        }
        else {
          as(S, B + 4, o - 4, an, Xo, !0);
        }
      }
    })(S, e, s);
  }
  function On(e) {
    a = e.material;
    s = S.Palette.pick("SKIN", e.cfg.skin, "light");
    B = a.cloth;
    o = a.accent;
    n = a.trim;
    i = a.sleeve;
    O = a.navy;
    t = a.red;
    h = a.pearl;
    r = a.pants;
    return { x: B.line, X: B.deep, j: B.shade, J: B.base, i: B.hi, Q: o.line, q: o.deep, c: o.shade, e: o.base, E: o.hi, N: n.line, n: n.deep, g: n.shade, G: n.base, Y: n.hi, y: n.spark, u: i.line, U: i.deep, o: i.shade, O: i.base, w: i.hi, k: O.line, K: O.deep, m: O.shade, M: O.base, L: O.hi, F: t.line, f: t.deep, R: t.base, h: t.hi, a: h.deep, W: h.base, V: h.hi, p: r.line, P: r.deep, s: r.shade, S: r.base, v: r.hi, 1: s.line, 2: s.deep, 3: s.shade, 4: s.base, 5: s.hi };
    var a;
    var s;
    var B;
    var o;
    var n;
    var i;
    var O;
    var t;
    var h;
    var r;
  }
  var tn = ["....kMMMMk....", "...kEmMMmEk...", "xjJGeEmMMEeGJx", "xjJGceEmEecGJx", "xjJGQceEEccGJx", "xjJGeQceEQcGJx", "xjJGeeQceEQGJx", "xjJGEeeQceQGJx", "xjJYeEeeQceGJx", "xjJGeeEeeQcGJx", "xjJGceeEeeQYJx", "xjJGceeeEeQGJx", "xjJGceEeeeQGJx", "xjJGceeEeeQGJx", "xjJGknYYnkGJjx", "xjNgGYGGYGgNjx", "xNgGYGyyGYGgNx", "xjNnGYGGYGnNjx", "xjJGknGGnkGJjx", "xjJGcQnnQcGJjx"];
  var hn = ["QeEEeQ", "QceEeQ", "QcEeEQ", "QceEeQ", "QeeEcQ", "QcEeeQ", "QceEeQ", "QeeEcQ", "QcEeeQ", "QceEeQ", "QeeEcQ", "QcEeeQ", "QceEeQ", "QeEeeQ", "QgYGgQ", "NGGGGN", ".NNNN."];
  var rn = ["G", "n", "n", "h", "R", "G", "V", "W", "W", "a", "g"];
  var dn = [".....xjJ", ".....xjJ", "....xjJJ", "....xjJJ", "....xjJJ", "....xjiJ", "....xjiJ", "...xjJiJ", "...xjJJJ", "...xjJJJ", "...xjJJJ", "...xjJJJ", "..xjJiJJ", "..xjJiJJ", "..xjJJiJ", "..xjJJiG", "..xjJJJG", "..xjJJJG", ".xjJiJJG", ".xjJiJJG", ".xjJJiJG", ".xjJJJJG", ".xjJJJJG", "xjJiJJJG", "xjJiJJJG", "xgJJiJJG", "xGjJJgJG", "xGJjgYgG", "xYGGGGGG", "NnGYnGnN", ".NNNNNN."];
  var bn = [".....xjJ", ".....xjJ", "....xjJJ", "....xjJJ", "....xjJJ", "....xjJJ", "....xjiJ", "...xjJiJ", "...xjJJJ", "...xjJJJ", "...xjJJJ", "...xjJJJ", "..xGJJiJ", "..xGJJiJ", "..xGjJJJ", "..xGjJJJ", "..xGJJJJ", "..xGJJiJ", ".xGjJJiJ", ".xGjJJJJ", ".xGJJJJJ", ".xGJJiJJ", ".xGJJiJJ", "xGjJJJJJ", "xGjJJJJJ", "xGJJJJiJ", "xGJgJJJJ", "xGgYgJJJ", "xYGGGGGG", "NnGYnGnG", ".NNNNNNN"];
  var ln = ["N........", "NYN......", "NGYNN....", "NgGYGNN..", "NgGjJiGNN", "NgjJJiJGN", "NGjJjJjGN", "NnGYGYGgN", ".NGgNNNN.", ".NYN.....", "..N......"];
  var fn = [".N......", ".NN.....", ".NYNNNN.", "NGYGGYGN", "NgGjJiGN", "NgjJYJGN", "NGjYJjgN", ".NgGGGnN", "..NNNNN."];
  var cn = ["....QEEEEQ....", "...QceEEecQ...", "xjJJJQeeQJJJjx", "xjJJJJQQJJJJjx", "xjJJJJJJJJJJjx", "xjJJJJJJJJJJjx", "xjJJJJJJJJJJjx", "xjJJJJJJJJJJjx", "xjJJJJJJJJJJjx", "xjJJJJJJJJJJjx", "xjJJJJJJJJJJjx", "xjJJJJJJJJJJjx", "xjJJJJJJJJJJjx", "xjJJJJJJJJJJjx", "xjJJJJiJJJJJjx", "xjJJJJJJJJJJjx", "xjJJJJJJJiJJjx", "xjJJJJJJJJJJjx", "xjJJiJJJJJJJjx", "xjJJJJJJJJJJjx"];
  var Gn = ["gG......Gg", ".GY....YG.", "..gGYYGg..", "...nGGn...", "....GY....", "....gG....", "....nG....", ".....n...."];
  var Hn = ["XjJJJJJJJJjX", "XjJJJJJJJJjX", "XjJJJJiJJJjX", "XjJiJJiJJJjX", "XjJiJJJJJJjX", "XjJJJJJJiJjX", "XjJJJJJJiJjX", "XjJJiJJJJJjX", "XjJJiJYJJJjX", "XjJJJgGJJJjX", "XjJJJnGJJJjX", "XjJJgYGgJJjX", "XjJJGJGJGJjX", "XjJJgJGJgJjX", "XjJJJgGgJJjX", "XjJgJJGJJgjX", "XjGJJgYgJJGX", "GjgJgGJGgJgG", "NGjgGJJJGgGN", ".NGGJJJJGGN.", ".NnGGYYGGnN.", "..NNNNNNNN.."];
  var gn = ["......kMMk..", ".....kmMEEQ.", "..xjJJJGQeEQ", ".xjJJJJGQceQ", ".xjJJiJGQeEQ", ".xjJJJJGQceQ", ".xjJiJJGQeeQ", ".xjJJJJGQcEQ", ".xjJJJiGQeeQ", ".xjJJJJGQceQ", ".xjJiJJGQeEQ", ".xjJJJJGQceQ", ".xjJJJJGQeeQ", ".xjJJiJGQcEQ", ".NgGGGGGGGnN", ".NGYGGGnGYGN", ".xNgGGGnYyVN", ".xjJJJJGnYGN", ".xjJJJJGQnGQ", ".xjJJJiGQceQ"];
  var xn = ["........xjJx", "........xjJx", ".......xjJJx", ".......xjJJx", ".......xjJiJ", "......xjJJJJ", "......xjJJJJ", "......xjJiJJ", "......xjJJJJ", ".....xjJJJJJ", ".....xjJJiJJ", ".....xjJJJJJ", ".....xjJJJJJ", ".....xjJiJJJ", "....xjJJJJJJ", "....GjJJJiJJ", "....GjJJJJJJ", "....GjJiJJJJ", "...xGJJJJJJJ", "...xGJJJJiJJ", "...xGJJJJJJJ", "...xGJJJJJJJ", "..xGjJJJJJJJ", "..xGJJJiJJJJ", "..xGjJJJJJJJ", "..xGJJJJJJJJ", ".xGjJJJiJJJJ", ".xGJJJJJJJJJ", ".xGjJJJJJJJJ", ".xGjJJJJJiJJ", ".xGJgJJJJJJJ", ".xGgYgJJJJJJ", ".NGGGGGGGGGG", ".NnGYnGnGYnN", "..NNN.NNN.N."];
  var Dn = ["...xjJJJJGQeEQ.", "..xjJJJJJGQceQ.", ".xjJJiJJJGQeEQ.", ".xjJJJiJJGQeeQ.", ".xjJJJiJJGQcEQ.", ".xjJJJJiJGQeEQ.", ".xjJJJJiJGQeeQ.", "xjJJJiJJJGQcEQ.", "xjJJJiJJJGQeEQ.", "xjJJJJiJJGQeeQ.", "xjJJJJiJJGQcEQ.", "xjJJJJJiJGQeEEQ", "xjJgJJJJgGQeeEQ", "xjJGgJJgYGQcEEQ", "xgJJGJgJGGQeeEQ", "NGGGGGGGGGGgYGN", ".NNNNNNNNNNNNN."];
  var Wn = ["G", "n", "R", "f", "G", "V", "a", "R", "F"];
  function Jn(S) {
    var e = Math.max(7, S.len);
    return { L: e, low: e + 2.2, tip: Math.max(3, e - 3.6), ko: 7.6 };
  }
  function un(S, e) {
    var a = oo(S, e);
    var s = a.Q;
    a.Q = function (S, e) {
      var a = s(S, e);
      return [Math.min(31, Math.max(0, a[0])), Math.max(0, a[1])];
    };
    return a;
  }
  function Mn(S, s, B) {
    (function (S, a, s) {
      var B = un(a, s);
      var o = a.material;
      var n = B.far;
      var i = B.Q;
      var O = o.sleeve;
      var t = o.trim;
      var h = o.navy;
      if (a.g.side) {
        !function (S, a, s) {
          var B = Math.max(7, a.len);
          var o = a.Q;
          var n = a.far;
          var i = s.sleeve;
          var O = s.trim;
          var t = s.navy;
          function h(S) {
            return [Math.round(S[0]), Math.round(S[1])];
          }
          function r(a, s, B, n, i) {
            var O = h(o(a, s));
            var t = h(o(B, n));
            e.line(S, O[0], O[1], t[0], t[1], i);
          }
          u(S, [o(-1, -2.5), o(B - 2, -3.3), o(B + 1, -3.1), o(B + 2.7, -1), o(B + 3, 2), o(B + 1.6, 4.6), o(B - 2.5, 5.5), o(.4 * B, 4.3), o(-1, 2.8)], i.line);
          u(S, [o(0, -1.6), o(B - 2, -2.3), o(B + .6, -2.1), o(B + 1.8, -.6), o(B + 2, 1.8), o(B + .8, 3.8), o(B - 2.4, 4.5), o(.4 * B, 3.3), o(0, 1.9)], n ? i.shade : i.base);
          r(0, 1.2, .45 * B, 3, n ? i.base : i.hi);
          r(1.5, -.8, B - 3, -1.4, n ? i.deep : i.shade);
          r(.5 * B, 3.4, B - 3, 3.9, n ? i.deep : i.shade);
          u(S, [o(B - 2.6, -1.2), o(B - .4, -2), o(B + 1.2, -.6), o(B + 1.3, 1.8), o(B - .2, 3.4), o(B - 2.6, 3.4), o(B - 3.4, 1)], n ? t.shade : t.base);
          for (var d = [[B - 2.6, -1.2], [B - .4, -2], [B + 1.2, -.6], [B + 1.3, 1.8], [B - .2, 3.4], [B - 2.6, 3.4], [B - 3.4, 1], [B - 2.6, -1.2]], b = 0; b < d.length - 1; b++)
            r(d[b][0], d[b][1], d[b + 1][0], d[b + 1][1], n ? O.shade : b < 2 || b > 5 ? O.hi : O.base);
          r(B - 1.6, -.6, B + .2, -.8, t.hi);
        }(S, B, o);
      }
      else {
        var r = Jn(B);
        var d = r.L;
        var b = r.low;
        var l = r.tip;
        var f = r.ko;
        u(S, function (S) {
          var e = Jn(S);
          var a = S.Q;
          var s = e.L;
          var B = e.tip;
          var o = e.ko;
          return [a(-1, -2.6), a(s - 1.5, -2.9), a(s - .6, -1.6), a(s - .6, 1.4), a(e.low, 2.2), a(e.low - .6, 3.8), a(B, o), a(B - 1.4, o), a(.35 * s, .58 * o), a(-1, 2.9)];
        }(B), O.line);
        u(S, [i(0, -1.6), i(d - 2.2, -2), i(d - 1.5, -.8), i(d - 1.4, 1.6), i(b - 1.6, 2.4), i(l - .6, f - 1.2), i(l - 1.6, f - 1), i(.35 * d, .58 * f - 1), i(0, 1.9)], n ? O.shade : O.base);
        G(0, 1.2, .35 * d, .58 * f - 1.2, n ? O.base : O.hi);
        G(.4 * d, .58 * f - .6, l - 1.6, f - 1.4, n ? O.base : O.hi);
        G(1.5, -.6, d - 2.6, 0, n ? O.deep : O.shade);
        G(2, 1.4, d - 1.8, .5 * f, n ? O.deep : O.shade);
        G(1, -1.4, d - 2.4, -1.8, n ? O.shade : O.deep);
        G(b - .4, 2.4, l + .5, f - .4, n ? h.shade : h.base);
        G(b - 1.2, 2.2, l - .4, f - .8, n ? t.shade : t.base);
        G(l + .4, f - 1.6, l - .6, f - .8, n ? t.base : t.hi);
        G(d - 1.4, -2.4, d - 1.4, 1.2, n ? t.deep : t.shade);
      }
      function c(S) {
        return [Math.round(S[0]), Math.round(S[1])];
      }
      function G(a, s, B, o, n) {
        var O = c(i(a, s));
        var t = c(i(B, o));
        e.line(S, O[0], O[1], t[0], t[1], n);
      }
    })(S, s, B);
    (function (S, e, s) {
      var B = On(e);
      if (e.g.side) {
        if (1 !== s) {
          return;
        }
        as(S, e.g.arms[1].x - 3, a.ARM_Y - 3 + e.dy, fn, B, !1);
      }
      else {
        var o = e.g.arms[s].x + 1;
        var n = a.ARM_Y + e.dy;
        if (0 === s) {
          as(S, o - 5, n - 5, ln, B, !1);
        }
        else {
          as(S, o + 5, n - 5, ln, B, !0);
        }
      }
    })(S, s, B);
  }
  var wn = { W: "#fdf6ea", w: "#f2e7d9", l: "#dccabb", h: "#b09786", g: "#84665c", 1: "#fde9c0", 2: "#f9c85e", 3: "#f39a2c", 4: "#e2602c", 5: "#b32a26", 6: "#7a1a1e", 7: "#2c1216", F: "#f8ecd9", f: "#e6d1b4", u: "#bd9670", v: "#8a664c", x: "#4a3229", M: "#6f5150", B: "#533a3b", b: "#3d2a2c", n: "#2a1a1e", N: "#170a0d", R: "#dc5640", S: "#b8322b", s: "#8f2222", t: "#651a1c", T: "#3d0d10", G: "#d9a441", Y: "#f8db85", e: "#b98a30", E: "#8a6420", z: "#54360f", C: "#f3e6cc", c: "#d9c39c", a: "#b39a78", A: "#7c644a", U: "#a9c4d4", V: "#6f8fa6", X: "#4a6680", Z: "#22323f", J: "#c9b39a", K: "#9a836b", L: "#6d5a48", Q: "#4d3f35", q: "#2a2020", O: "#d0382e", P: "#f7ede2", o: "#7f1b1c", D: "#d8604a", d: "#b8443a", m: "#8b3a30", k: "#140b0d", p: "#2b1c1f", r: "#42302f", y: "#5f4645", j: "#150c0e" };
  var Nn = ["............7.55.7..7..........", ".........555544444545..........", ".......7.44432222333445........", ".......53322211ww222234557.....", "....75443211whwwwwwW123445.....", "....54332hwhwhwWwwhwh122347....", "...753221WwwwhwWwwhwhwh1245....", "...5421whwhwwhwWwwhwwhww13457..", "..5542hwwwwwhwwWhwwhwwwh12345..", ".75432whwwwhwhhhhhhwhwhww1245..", "..432WhwhwwhhhhhhhhWwhwhWw237..", "..521wwhwwhhhhhhhhhhwwhwwh345..", "..542hwwwhhhhhhhhhhhhwwhW1244..", ".55421wwhhhhhhhhhhhhhwwwwh23457", "75421hhwwhhhhhhhhhhhhWhwww1245.", ".5421wwwwwhhhhhhhhhhhhwhhh124..", "..421hhhhhhhhhhhhhhhhhhhhhhww..", "..wwhhhhhhhhhhhhhhhhhhhhhhhww..", ".hwwWwh.................hwWwwh.", ".hwwwwhh...............hhwwwwh.", ".hwWwww.................wwwWwh.", ".211www.................www112.", ".33222h.................h22233.", ".44433h.................h33444.", ".w55wwwh...............hwww55w.", ".w7Wwwwh...............hwwwW7w.", "11wWwhw.................whwWw11", "322211w.................w112223", ".4333whh...............hhw3334.", ".554wwhw...............whww455.", ".w7Wwwwwh.............hwwwwW7w.", ".wwWwwww...............wwwwWww.", "2211whww...............wwhw1122", "333222whW.............Whw222333", ".4443wwhWw...........wWhww3444.", ".555WwwwWwh.........hwWwwwW555.", "..wwWwwwwwh.........hwwwwwWww..", ".11wwwhWwwh.........hwwWhwww11.", ".322111Www...........wwW111223.", "..4333wWww...........wwWw3334..", "..554wwwwh...........hwwww455..", "...7hwWwwh...........hwwWwh7...", "....wwWww.............wwWww....", "....211ww.............ww112....", "....33222.............22233....", "....4443...............3444....", ".....55.................55....."];
  var pn = [".....oooooooo.....", "..oOPOPOPOPOPOPo..", ".oPOPOPOPOPOPOPOo.", "..eGGGGGzYGGGGGe..", "GYGVUVXVGGVUVXVGYG", "GzGCCCCCCCCCCCCGzG", "eGLqqq.....qqqKLGe", "OOLJ..q...q...JLOO", "OoLK..........KLoO", "wWLK..........KLWw", "WPLJ..........JLPW", "wWLK..........KLWw", "wlLKD.......D.KLlw", "WwLDdd.....ddDJLwW", "wlLK...mmmm.k.KLlw", "12LK..........KL21", "23LJ..........JL32", "34LKJ........JKL43", "45LKJ........JKL54", ".6LKJ........JKL6.", "..LKJ........JKL..", "..LK..........KL..", "..LK..........KL..", "..L............L..", "..L............L.."];
  var kn = ["........v", ".....vvvu", "..vvvfffu", "vvffuFffu", "uFfffuFfu", "uuFfffuFv", "ufuFfffu.", "uffuFffv.", "ufufuFu..", "uFvffuu..", "uu.uufu..", "vu.uvvu..", ".v.v..v.."];
  var mn = ["v........", "uvvv.....", "ufffvvv..", "uffFuffvv", "ufFufffFu", "vFufffFuu", ".ufffFufu", ".vffFuffu", "..uFufufu", "..uuffvFu", "..ufuu.uu", "..uvvu.uv", "..v..v.v."];
  var vn = ["...xfF..Ffx...", ".xfFfu..ufFfx.", "xfFfufvvfufFfx", "..NOPOPOPOPb..", "..NbPOPOPOMb..", "..NbBOPOPBMb..", "..NbBBPOBBBb..", "..NbBBPPBBMb..", "..NbBBPcBBMb..", "..NbBBBaBBMb..", "..NbBBBBBBBb..", ".TRRReGRRRRRT.", ".TSSGYzGSSSST.", ".TSSeGGeSSSST.", ".TsssRSsssssT.", "..NbBSBCBBMb..", "..NbBSBcBBMb..", "..NbBGBaBBMb..", "..NbBYBBBBBb..", "..NbBBBBBBMb.."];
  var yn = ["cCCCCc", "cCCCCc", "cCCCCc", "cCCCCc", "cCCCCc", "cCCCCc", "cCCCCc", "cCSSCc", "cSCCSc", "cSsSSc", "cSCCSc", "cCSSCc", "cCCCCc", "cCSSCc", "cSCCSc", "acCCca", "acCCca", ".acca.", "..aa.."];
  var Ln = ["...NbBBBBBBBBbN...", "...NbBBBBBBBBbN...", "...NMBBBBBBBBMN...", "...NbBBBBBBBBbN...", "...NGBBBBBBBBGN...", "...NMBBBBBBBBMN...", "..NbBBBBBBBBBBbN..", "..NSBBBBBBBBBBSN..", "..SCSBBBBBBBBSCS..", ".SCsCSBBBBBBSCsCS.", "..SCSBBBBBBBBSCS..", "..NSMBBBBBBBBMSN..", ".NbBBGBBBBBBGBBbN.", ".NbBBBBBBBBBBBBbN.", ".NbBMBBBBBBBBMBbN.", ".NbBBBBBBBBBBBBbN.", "cCcCcCcCcCcCcCcCcC", ".abBBaBBBaBBBaBbNa"];
  var Cn = ["......5437577542.", ".....75375475432h", "....45432435432ww", "..7543421434321Ww", "...54232ww2w21wwW", "....32wwwhwwhwwh.", "...432hwwwwhhhh..", "..5431WWWWhhwww..", "..5431wwwwwwwwh..", "...431wwwhhhhw...", "..32wwwWWwwwwh...", ".5431Wwwwwwwhw...", ".5432wwwwhWwwh...", "..5421hwWWwww....", "..hhwwwWwwwhwh...", "..2wwWwwwwhwwh...", ".431WwwwhWwwh....", ".4321wwwWwwhw....", ".5432hwWwwhww....", "..hwwwWwwhwwh....", "..wwwWwwhwwww....", ".21wWwwhWwwww....", ".321wwhWwwhwh....", ".4321hWwwhwww....", "7543wWwwhwwhw....", "..wwwwwwWwwww....", ".1wwWwwWwwhwh....", ".21Wwwhwwhwwwh...", ".321whWwwWwhwh...", ".4432Wwwhwwhw....", ".55wwWwwWwwww....", "..wwWwwhwwhwh....", ".hwwwwhWwwwwh....", ".21Wwwwwwhww.....", ".321whWwwWww.....", ".4332wwwhWwh.....", ".54wwWwwwwwh.....", "..hwwWwhWww......", "..hwWwwhWwh......", "..21Wwwwwwh......", "..3221hWww.......", "..443wwWww.......", "..55.wwWwh.......", "....hwwwwh.......", "....1wWww........", ".....2211........", ".....333.........", ".....54..........", ".....7..........."];
  var jn = [".lw.ooooooo...", ".wWoOPOPOPOo..", ".loPOPOPOPOPo.", "weGGGGGGGGGGYe", "lVUVXVUXVUVXGE", ".ZGYGCCCCCCCCZ", ".LGzG....qqq..", ".LeGe.......q.", ".LOO..........", ".LOo..........", ".LwW..........", ".LWP..........", ".LwW....D.....", ".Lwl.....Dd...", ".LWw.....k.mm.", ".Lwl..........", ".L12..........", ".L23K.........", ".L34K.........", ".L45K.........", ".LK6K.........", ".LKJK.........", ".LKJ..........", ".LKJ..........", ".LKJ..........", ".LK...........", ".LK..........."];
  var An = ["......v......", "..vvvvfvvvv..", "vvfffuFfffuvv", "uuFfffuFfffuu", "ufuFfffuFfffu", "uffuFfffuFOfu", "ufffuFfffuFPu", "vufvfuufvfuOu", ".vubuvvuBuPvv", "..vbvBBvBvO..", "..NbBBBBBNP..", ".TRRRRRRReGe.", ".TSSSSSSSGYG.", ".TSSSSSSSeGe.", ".TssssssssRS.", "..NbBBBBBMNS.", "..NbBBBBBMNS.", "..NbBBBBBBNG.", "..NbBBBBBMNY.", "..NbBBBBBMN.."];
  var Qn = [".....NbBBBBBBcCc", ".....NbBBBBBBcCc", ".....NbBMBBBBcCc", "....NbBBBBBBBcCc", "....NbBBBBBBBcCc", "....NbBMBBBBBcCc", "....NbSBBBBBBcCc", "...NbSCSBBBBBcSc", "...NSCsCSBBBBcSS", "...NbSCSBBBBBcSc", "...NbBSBBBBBBcCc", "..NbBMBBBBBBBcCc", "..NbBBBBBBBBBcCc", "..NbBBBBBBBBBcCc", "..NbBMBBBBBBBcC.", ".NbBBBBBBBBBBcC.", "CcCcCcCcCcCcCcCc", ".NaBMBaBBBaBBBa."];
  var _n = ["..xfFFfx.", ".xfFfFfux", "xfFfFfFuv", "xfufFfuuv", ".xvufuFv.", "..xvufv..", "...xvv..."];
  var Yn = ["vvvvvvvvvvvvvvvvvvvv", "uuFfffuFfffuFfffuFfu", "ufuFfffuFfffuFfffuFu", "uffuFfffuFfffuFfffuu", "ufffuFfffuFfffuFfffu", "uFfffuFfffuFfffuFffu", "uuFfufuFfufuFfufuFfu", "ufuFvffuFvffuFvffuFv", "uufu.uufu.uufu.uufu.", "uvvu.uvvu.uvvu.uvvu.", "v..v.v..v.v..v.v..v."];
  var En = ["............7.55.7..7..........", ".........555544444545..........", ".......7.44432222333445........", ".......53322211ww222234557.....", "....75443211whwwwwwW123445.....", "....54332hwhwhwWwwhwh122347....", "...753221WwwwhwWwwhwhwh1245....", "...5421whwhwwhwWwwhwwwww1345...", "..5542hwwwwwhhwWwwwhwwwh12345..", ".75432whwhwhwwhWWhwwhwhww1245..", "..432WwwhwhwWlllllwhwhwhWw237..", "..521wwhwhhwlllllllWwwhwwh345..", "..542hwwwhhllll44lllWwwhW1244..", ".55421whhwhlll5335llWhwwwh23457", "75421hhwwwlllll44llllhhhww1245.", ".5421wwwwwhllllGYllllhwwhh124..", "..421hhhhwwwwwweGwwwwww.hwWw...", "..hwWwh.wwwwwwwWWwwwwww.hwWwh..", "..hwwwh..wwwwwWwwWwwww..hwwwh..", "..wWwhh..wwwwwwllwwwww..hhwWw..", "..wWwhh...wwww1221www...hhwWw..", ".211ww.....www3443ww.....ww112.", ".3322w.......LK55J.......w2233.", "..443hh......LKJKL......hh344..", "..55whh......JKLKL......hhw55..", ".hwWwwh......LKLKL......hwwWwh.", ".1wwww.......LKLJL.......wwww1.", ".2211w.......LJLKL.......w1122.", ".4333hw......LKLKL......wh3334.", ".554whw......LKLKJ......whw455.", ".h7WwWw.......KJK.......wWwW7h.", ".hwWwWw.......KLK.......wWwWwh.", ".111hwh.......KLK.......hwh111.", ".3322whW......KLJ......Whw2233.", ".444WwwWw.....JLK.....wWwwW444.", ".55wWwwWw.....KLK.....wWwwWw55.", "..wwwhwww.....hWh.....wwwhwww..", "..wWwhWwh..hwwwWwwwh..hwWhwWw..", ".2221wWwh..wwhwWwhww..hwWw1222.", "..333wWw...wWhwWwhWw...wWw333..", "..54hwww...wWhwWwhWw...wwwh45..", "..7.wWwh...wWhwWwhWw...hwWw.7..", "....wWwh...wWhwWwhWw...hwWw....", "...211w....wWhwWwhWw....w112...", "...3322...hwWhwWwhWwh...2233...", "....443...222hwWwh222...344....", "....55....433hwWwh334....55....", "...........552222255...........", "............7.333.7............", "..............555..............", "...............7..............."];
  var qn = ["...NbBBBBBBBBbN...", "...NbBBBBBBBBbN...", "...NbBMBBBBMBbN...", "...NbBBBBBBBBbN...", "...NbBBBBBBBBbN...", "...NbBMBBBBMBbN...", "..NbBBBBBBBBBBbN..", "..NbSBBBBBBBBSbN..", "..NSCSBBBBBBSCSN..", "..SCsCSBBBBSCsCS..", "..NSCSBBBBBBSCSN..", "..NbSMBBBBBBMSbN..", ".NbBBBBBBBBBBBBbN.", ".NbBBBBBBBBBBBBbN.", ".NbBMBBBBBBBBMBbN.", ".NbBBBBBBBBBBBBbN.", "cCcCcCcCcCcCcCcCcC", ".abBMaBBBaBBBaBbNa"];
  function Kn(S) {
    return function (e, a) {
      return a < 0 || a > 63 || e < 0 || e > 31 || !(!S || !S(e, a));
    };
  }
  function Un(S, e, a, s) {
    return xB(S, e - s, a);
  }
  function Xn(S, e, a, s, B, o, n, i) {
    as(S, e.head.x - o + s, e.head.y - 6 + B, a, wn, !1, n, i);
  }
  function Rn(S, e, a, s, B, o, n, i) {
    as(S, e.torso.x - o + s, e.torso.y - 24 + B, a, wn, !1, n, i);
  }
  function zn(S, e, a, s, B, o, n, i, O, t) {
    so(S, e.torso.x - o + s, e.torso.y + e.torso.h - 42 + B, n, a, i, wn, t, O);
  }
  function Vn(S, a, s) {
    var B = oo(a, s);
    var o = B.far;
    var n = B.Q;
    var i = B.len;
    var O = Math.max(4, Math.round(i - 5));
    u(S, [n(-1, -2.4), n(O + 1, -2.2), n(O + 1, 2.2), n(-1, 2.5)], wn.N);
    u(S, [n(0, -1.6), n(O + 1, -1.4), n(O + 1, 1.4), n(0, 1.7)], o ? wn.b : wn.B);
    u(S, [n(1, -1.5), n(O, -1.3), n(O, -.2), n(1, -.2)], o ? wn.B : wn.M);
    var t = n(O + 1, -2);
    var h = n(O + 1, 2);
    var r = n(O + 3, -2);
    var d = n(O + 3, 2);
    u(S, [t, h, d, r], o ? wn.u : wn.f);
    e.line(S, Math.round(r[0]), Math.round(r[1]), Math.round(d[0]), Math.round(d[1]), o ? wn.t : wn.S);
    var b = n(O + 1, 0);
    e.dot(S, Math.round(b[0]), Math.round(b[1]), o ? wn.f : wn.F);
  }
  function Fn(S, e, a) {
    Vn(S, e, a);
    (function (S, e, a) {
      var s = w(e.arms[a]);
      if (e.g.side) {
        if (1 !== a) {
          return;
        }
        as(S, s.x - 3, s.y - 3, _n, wn, !1);
      }
      else {
        if (0 === a) {
          as(S, s.x - 9 + 5, s.y - 26 + 22, kn, wn, !1);
        }
        else {
          as(S, s.x - 22 + 18, s.y - 26 + 22, mn, wn, !1);
        }
      }
    })(S, e, a);
  }
  function Pn(e, a) {
    var s = !1;
    var B = S.Palette.pick("SKIN", e.cfg.skin, "light");
    var o = Object.create(e);
    o.material = g.toc_truong_y;
    var n = co(function (S) {
      for (var n = 0; n < 2; n++) {
        var i = e.arms[n];
        if (i && (a ? 1 === n || i.front || i.over : i.over && (!e.g.side || 0 !== n))) {
          s = !0;
          p(S, i, B, 0 === n);
          Vn(S, o, n);
        }
      }
    });
    return s ? function (S, e) {
      return 1 === n[S + "," + e];
    } : null;
  }
  function Tn(e) {
    var a = S.CONFIG && S.CONFIG.CHAR_W || 32;
    var s = S.CONFIG && S.CONFIG.CHAR_H || 64;
    return { fillStyle: "#000000", fillRect: function (S, B, o, n) {
        var i = Math.max(0, S);
        var O = Math.max(0, B);
        var t = Math.min(a, S + o);
        var h = Math.min(s, B + n);
        if (!(t <= i || h <= O)) {
          e.fillStyle = this.fillStyle;
          e.fillRect(i, O, t - i, h - O);
        }
      } };
  }
  function Zn(S, e) {
    var a = oo(S, e);
    var s = a.a;
    if (s.bent) {
      var B = a.s;
      var o = { x: s.jx, y: s.jy };
      var n = a.h;
      var i = S.torso.x + S.torso.w / 2;
      var O = function (e, a) {
        var s;
        var B = a.x - e.x;
        var o = a.y - e.y;
        var n = Math.sqrt(B * B + o * o) || 1;
        var O = B / n;
        var t = o / n;
        var h = -t;
        var r = O;
        s = Math.abs(h) > .3 ? (e.x - i) * h >= 0 ? 1 : -1 : r > 0 ? 1 : -1;
        if (S.g.side) {
          s = r > .2 ? 1 : r < -.2 ? -1 : h < 0 ? 1 : -1;
        }
        return { p: e, l: n, ux: O, uy: t, nx: h * s, ny: r * s };
      };
      var t = O(B, o);
      var h = O(o, n);
      a.len = t.l + h.l;
      a.elbow = t.l;
      a.Q1 = function (S, e) {
        return [t.p.x + t.ux * S + t.nx * e, t.p.y + t.uy * S + t.ny * e];
      };
      a.Q2 = function (S, e) {
        var a = S - t.l;
        return [h.p.x + h.ux * a + h.nx * e, h.p.y + h.uy * a + h.ny * e];
      };
      a.Q = function (S, e) {
        return S <= t.l ? a.Q1(S, e) : a.Q2(S, e);
      };
    }
    a.pt = function (S, e) {
      var s = a.Q(S, e);
      return [Math.round(s[0]), Math.round(s[1])];
    };
    return a;
  }
  function In(S, e, a) {
    for (var s = [], B = S.length, o = 0; o < B; o++) {
      var n = S[o];
      var i = S[(o + 1) % B];
      var O = a < 0 ? n[0] <= e : n[0] >= e;
      var t = a < 0 ? i[0] <= e : i[0] >= e;
      if (O && s.push(n), O !== t) {
        var h = (e - n[0]) / (i[0] - n[0]);
        s.push([e, n[1] + (i[1] - n[1]) * h]);
      }
    }
    return s;
  }
  function $n(S, e, a, s) {
    if (void 0 !== e.elbow) {
      var B;
      var o = e.elbow;
      var n = In(a, o, -1);
      var i = In(a, o, 1);
      var O = 1 / 0;
      var t = -1 / 0;
      for (n.length > 2 && u(S, n.map(function (S) {
        return e.Q1(S[0], S[1]);
      }), s), i.length > 2 && u(S, i.map(function (S) {
        return e.Q2(S[0], S[1]);
      }), s), B = 0; B < n.length; B++)
        Math.abs(n[B][0] - o) < 1e-9 && (O = Math.min(O, n[B][1]), t = Math.max(t, n[B][1]));
      if (!(O > t)) {
        var h = e.Q1(o, 0);
        u(S, [h, e.Q1(o, t), e.Q2(o, t)], s);
        u(S, [h, e.Q1(o, O), e.Q2(o, O)], s);
      }
    }
    else {
      u(S, a.map(function (S) {
        return e.Q(S[0], S[1]);
      }), s);
    }
  }
  function Si(S, a, s, B, o, n, i) {
    var O = a.elbow;
    if (void 0 !== O && (s - O) * (o - O) < 0) {
      var t = B + (n - B) * (O - s) / (o - s);
      Si(S, a, s, B, O, t, i);
      return void Si(S, a, O, t, o, n, i);
    }
    var h = a.pt(s, B);
    var r = a.pt(o, n);
    e.line(S, h[0], h[1], r[0], r[1], i);
  }
  function ei(S, a, s, B, o) {
    var n = a.pt(s, B);
    e.dot(S, n[0], n[1], o);
  }
  function ai(S, a, s, B) {
    for (var o = a.torso, n = o.x + (o.w >> 1), i = 0; i < 2; i++) {
      var O = a.legs[i];
      if (a.p.sit) {
        var t = a.legs[1 - i];
        e.fatLine(S, O.x + 1, O.y, O.x + (i ? 3 : -2), O.knee, 5, s.shade);
        e.fatLine(S, O.x + (i ? 3 : -2), O.knee, n + (i ? -3 : 2), O.foot - 2, 5, s.base);
        e.line(S, O.x + (i ? 3 : -2), O.knee - 1, n + (i ? -3 : 2), O.foot - 3, s.hi);
        e.r(S, Math.min(O.x, t.x) - 1, O.foot - 1, Math.abs(O.x - t.x) + O.w + 2, 1, s.line);
      }
      else {
        M(S, O.x - (B ? 1 : 0), O.y, O.w + (B ? 2 : 0), O.h, s);
        if (!(a.g.side)) {
          e.r(S, O.x + (i ? 0 : O.w - 1), O.y + 3, 1, Math.max(1, O.h - 8), s.line);
        }
      }
    }
  }
  function si(S, e, a) {
    return S.p.sit ? a : e;
  }
  function Bi(S, e, a) {
    var s = e.material;
    var B = s.cloth;
    var o = s.trim;
    var n = Zn(e, a);
    var i = n.far;
    var O = Math.max(7, n.len - 2);
    $n(S, n, [[-1, -2.3], [.5 * O, -2.6], [O - .6, -3], [O + 3.4, 2.4], [O + 3.2, 5.2], [O + 1.2, 6.8], [O - 2.6, 7], [.5 * O, 4.2], [-1, 2.4]], B.line);
    $n(S, n, [[0, -1.4], [.5 * O, -1.7], [O - 1, -2.1], [O + 2.3, 2.5], [O + 2.2, 4.5], [O + .7, 5.8], [O - 2.4, 5.9], [.5 * O, 3.3], [0, 1.6]], i ? B.shade : B.base);
    Si(S, n, .5, .9, .5 * O, 2.9, i ? B.base : B.hi);
    Si(S, n, .5 * O, 3.2, O - 1.4, 5.2, i ? B.base : B.hi);
    Si(S, n, 1.5, -.7, O - 2.4, -1.3, i ? B.deep : B.shade);
    Si(S, n, .45 * O, 1.2, O + .6, 3.4, i ? B.deep : B.shade);
    Si(S, n, O - 1.3, -2.3, O + 2.3, 3.1, i ? o.shade : o.base);
    Si(S, n, O - 2.1, -2.1, O + 1.4, 3.4, i ? o.deep : o.shade);
    Si(S, n, O + 2.3, 3.3, O + 1.8, 5.1, i ? o.deep : o.base);
    ei(S, n, O - 1, -1.9, i ? o.base : o.hi);
    ei(S, n, O - 1.2, 4.3, i ? o.shade : o.base);
    ei(S, n, O - .3, 4.7, i ? o.base : o.hi);
    ei(S, n, O - 2.2, 4.6, i ? o.deep : o.shade);
  }
  g.toc_truong_y = { cloth: { line: wn.N, deep: wn.n, shade: wn.b, base: wn.B, hi: wn.M }, trim: { line: wn.A, deep: wn.a, shade: wn.c, base: wn.C, hi: wn.F }, pants: { line: wn.j, deep: wn.p, shade: wn.r, base: wn.y, hi: wn.M } };
  var oi = [".a.", ".a.", ".Y.", ".J.", "JiJ", "jXj", ".J.", ".n.", ".G.", "gYg", "gGg", ".g."];
  var ni = ["HS.SH", "SsASs", ".aAa."];
  var ii = [".GY..", "G.gGY", ".gG.."];
  var Oi = ["..YGY..", ".G.g.G.", "GgY.YgG", "...g..."];
  function ti(S, e, a, s, B) {
    return [[-2.2, S], [-2.3, -1.2], [-1.8, 0], [-1, 1.2], [0, 2.1], [1.2, e - .1], [a, e], [s, B], [s, -B], [a, S]];
  }
  function hi(S, e, a) {
    var s = e.material;
    var B = s.cloth;
    var o = s.leather;
    var n = s.metal;
    var i = Zn(e, a);
    var O = i.far;
    var t = Math.max(6, i.len - 1.5);
    var h = Math.max(4, t - 4);
    var r = .45 * h;
    $n(S, i, ti(-2.6, 2.8, r, h + .5, 2.1), B.line);
    $n(S, i, [[-1.4, -1.7], [-.9, -.4], [-.2, .8], [.9, 1.7], [r, 1.9], [h, 1.2], [h, -1.1], [r, -1.7]], O ? B.shade : B.base);
    Si(S, i, .4, .9, r + 1, 1.3, O ? B.base : B.hi);
    Si(S, i, r + .6, -1.2, h - .6, .4, O ? B.deep : B.shade);
    $n(S, i, [[h - .4, -1.9], [h + .6, -2.3], [t - .5, -2.1], [t + .2, -1.2], [t + .2, 1.2], [t - .5, 2.1], [h + .6, 2.3], [h - .4, 1.9]], o.line);
    $n(S, i, [[h + .4, -1.3], [t - .6, -1.2], [t - .6, 1.2], [h + .4, 1.3]], O ? o.deep : o.shade);
    Si(S, i, h + .6, .6, t - 1, .6, O ? o.shade : o.base);
    var d = (h + t) / 2;
    Si(S, i, d, -1.3, d, 1.3, o.line);
    ei(S, i, d, .6, O ? n.shade : n.base);
  }
  var ri = ["hMMh", "M..M", "hMMh"];
  var di = ["mMM", "ahh", "mMM"];
  var bi = [".aAAAAAa.", "aSsSHSSsa", ".aAsAsAa."];
  var li = [".aa.", "aSHa", "aAsa", ".aa."];
  function fi(S, a, s) {
    for (var B = 1; B < a.length; B++) {
      var o = a[B - 1];
      var n = a[B];
      e.fatLine(S, o[0], o[1], n[0], n[1], 2, s.deep);
      e.line(S, o[0], o[1], n[0], n[1], s.shade);
    }
    var i = a[a.length - 1];
    e.dot(S, i[0], i[1], s.line);
  }
  function ci(S, e, a) {
    var s = e.material;
    var B = s.cloth;
    var o = s.accent;
    var n = s.trim;
    var i = Zn(e, a);
    var O = i.far;
    var t = Math.max(6, i.len - 2.5);
    $n(S, i, [[-1, -2.4], [.45 * t, -2.8], [t + 1, -3], [t + 1, 5.6], [.45 * t, 4.4], [-1, 2.4]], B.line);
    $n(S, i, [[0, -1.5], [.45 * t, -1.9], [t + .2, -2.1], [t + .2, 4.7], [.45 * t, 3.5], [0, 1.5]], O ? B.shade : B.base);
    Si(S, i, .5, .9, .45 * t, 2.8, O ? B.base : B.hi);
    Si(S, i, .45 * t, 3, t - 1.5, 3.9, O ? B.base : B.hi);
    Si(S, i, 1, -.8, t - 2, -1.4, O ? B.deep : B.shade);
    Si(S, i, .5 * t, 1, t - 2, 1.6, O ? B.deep : B.shade);
    Si(S, i, t - .6, -2.2, t - .6, 4.6, O ? o.shade : o.base);
    Si(S, i, t - 1.4, -2.1, t - 1.4, 4.2, O ? o.deep : o.shade);
    Si(S, i, t + .4, -2.4, t + .4, 5, n.base);
    ei(S, i, t - .6, -1.4, O ? o.base : o.hi);
  }
  var Gi = ["..kkk..", ".kWWWk.", "kWKWWKk", "kWWWKKk", "kWWKKKk", ".kKKWk.", "..kkk.."];
  var Hi = [".cCc.", "cChCc", ".cCc."];
  var gi = ["C", "c", "C", "h", "C", "c", "c"];
  function xi(S, a, s, B) {
    u(S, a, s);
    for (var o = 0, n = a.length - 1; o < a.length; n = o++)
      e.line(S, Math.round(a[n][0]), Math.round(a[n][1]), Math.round(a[o][0]), Math.round(a[o][1]), B);
  }
  var Di = ["..nnnn.", ".nYGGGn", "nYGgYGn", "nGgnGgn", ".nGnGn.", "..n.n.."];
  var Wi = [".nnnnn.", "nYGGGGn", "nGgYgGn", ".nGnGn.", "..n.n.."];
  function Ji(S, e, s) {
    var B = e.material;
    var o = B.cloth;
    var n = B.trim;
    var i = B.accent;
    var O = Zn(e, s);
    var t = O.far;
    var h = Math.max(6, O.len - 2.5);
    $n(S, O, [[-1, -2.3], [.5 * h, -2.5], [h, -3], [h, 4.3], [.5 * h, 3.3], [-1, 2.3]], o.line);
    $n(S, O, [[0, -1.4], [.5 * h, -1.6], [h - .8, -2.1], [h - .8, 3.4], [.5 * h, 2.4], [0, 1.4]], t ? o.shade : o.base);
    Si(S, O, .5, .8, .5 * h, 2, t ? o.base : o.hi);
    Si(S, O, 1, -.7, h - 1.5, -1.3, t ? o.deep : o.shade);
    Si(S, O, .5 * h, .4, h - 1.5, 1, t ? o.deep : o.shade);
    Si(S, O, h - .6, -2.8, h - .6, 4, t ? n.shade : n.base);
    for (var r = -2.2; r <= 4; r += 3.1)
      $n(S, O, [[h - .8, r - 1.3], [h + 1.8, r], [h - .8, r + 1.3]], n.line), Si(S, O, h - .3, r, h + .9, r, t ? n.base : n.hi);
    ei(S, O, h - 1.4, .8, t ? i.shade : i.base);
    (function (S, e, s) {
      var B = e.material.trim;
      var o = { n: B.line, g: B.shade, G: B.base, Y: B.hi };
      if (e.g.side) {
        if (1 !== s) {
          return;
        }
        as(S, e.g.arms[1].x - 2, a.ARM_Y - 2 + e.dy, Wi, o, !1);
      }
      else {
        var n = e.g.arms[s].x + 1;
        var i = a.ARM_Y - 2 + e.dy;
        if (0 === s) {
          as(S, n - 4, i, Di, o, !1);
        }
        else {
          as(S, n + 4, i, Di, o, !0);
        }
      }
    })(S, e, s);
  }
  var ui = ["..n..", ".nOn.", "nOwOn", ".nOn.", "..n.."];
  var Mi = ["...o...", "...O...", "..nOn..", "oOOwOOo", "..nOn..", "...O...", "...o..."];
  var wi = ["lll", "prp", "prp", "rrr", "prp", "plp", "prp", "ppp", "lll"];
  var Ni = { cloth: { line: "#12281c", deep: "#1f4631", shade: "#2f6647", base: "#468a5e", hi: "#78b789" }, lining: { line: "#3a5c4d", deep: "#739e89", shade: "#a3c8b3", base: "#d2e9da", hi: "#f2fbf4" }, sash: { line: "#0b1812", deep: "#13281c", shade: "#1d3a29", base: "#294f38", hi: "#406f51" }, cord: { line: "#4d3f17", deep: "#7b682a", shade: "#a58f3d", base: "#cfb75a", hi: "#eedd92" }, pants: { line: "#0e1410", deep: "#18211b", shade: "#243029", base: "#314036", hi: "#48594c" } };
  function pi(S, e, a) {
    var s = Ni.cloth;
    var B = Ni.lining;
    var o = Zn(e, a);
    var n = o.far;
    var i = o.len;
    var O = .5 * i;
    $n(S, o, ti(-2.6, 3, O, i - 2.4, -2.9).slice(0, 7).concat([[i - .6, 4.1], [i + .5, 4.4], [i + .6, 3.4], [i - 2.2, -2.9], [O, -2.7]]), s.line);
    $n(S, o, [[-1.4, -1.7], [-.9, -.4], [-.2, .8], [.9, 1.8], [O, 2.2], [i - .8, 3.2], [i - .3, 2.6], [i - 2.6, -1.9], [O, -1.8]], n ? s.shade : s.base);
    Si(S, o, i - 2.3, -2.2, i + .1, 3.5, n ? B.deep : B.shade);
    Si(S, o, i - 1.8, -1.5, i, 2.4, n ? B.shade : B.base);
    Si(S, o, .4, 1, O, 2.1, n ? s.base : s.hi);
    Si(S, o, .7 * O, -.9, i - 3, 1.6, n ? s.deep : s.shade);
  }
  s.THANH_Y_MAT = Ni;
  var ki = [".oo.oo.", "oHokoHo", ".oo.oo."];
  var mi = [".....L", "....sL", "...s..", "LL.s..", ".LsL..", "..sLL.", ".s....", ".s...."];
  var vi = ["L...", ".LL.", "..sL", ".s.."];
  function yi(S, e, a, s) {
    for (var B = [], o = 0; o <= s; o++) {
      var n = o / s;
      var i = 1 - n;
      B.push([i * i * S[0] + 2 * i * n * e[0] + n * n * a[0], i * i * S[1] + 2 * i * n * e[1] + n * n * a[1]]);
    }
    return B;
  }
  function Li(S, a, s) {
    for (var B = 0, o = a.length - 1; B < a.length; o = B++)
      e.line(S, Math.round(a[o][0]), Math.round(a[o][1]), Math.round(a[B][0]), Math.round(a[B][1]), s);
  }
  function Ci(S, a, s) {
    for (var B = 1; B < a.length; B++) {
      var o = a[B - 1];
      var n = a[B];
      e.line(S, Math.round(o[0]), Math.round(o[1]) + 1, Math.round(n[0]), Math.round(n[1]) + 1, s.deep);
      e.line(S, Math.round(o[0]), Math.round(o[1]), Math.round(n[0]), Math.round(n[1]), s.base);
    }
  }
  function ji(S, e, a) {
    var s = e.material;
    var B = s.cloth;
    var o = s.trim;
    var n = s.accent;
    var i = Zn(e, a);
    var O = i.far;
    var t = Math.max(6, i.len - 1.5);
    var h = Math.max(4, .66 * t);
    $n(S, i, [[-1, -2.4], [h, -2.8], [h, 3.2], [-1, 2.4]], B.line);
    $n(S, i, [[0, -1.5], [h - .4, -1.9], [h - .4, 2.3], [0, 1.5]], O ? B.shade : B.base);
    Si(S, i, .5, .8, h - 1, 1.4, O ? B.base : B.hi);
    Si(S, i, 1, -.8, h - 1, -1.1, O ? B.deep : B.shade);
    $n(S, i, [[h - .6, -2.6], [t, -2.2], [t, 2.2], [h - .6, 2.9]], o.line);
    $n(S, i, [[h + .2, -1.7], [t - .8, -1.4], [t - .8, 1.4], [h + .2, 2]], O ? o.base : o.shade);
    for (var r = h + 1; r < t - .8; r += 2)
      Si(S, i, r, -1.6, r + 1, 1.6, O ? o.shade : o.hi);
    Si(S, i, h - .2, -2.2, h - .2, 2.5, O ? n.deep : n.shade);
  }
  var Ai = ["...k...", "..kRk..", ".kRHRk.", "kRRHRRk", ".kRRRk.", "..kdk..", "...k..."];
  var Qi = [".aa.", "aRHa", "adRa", ".aa."];
  var _i = [[15.5, 11], [15, 18], [11.5, 10], [8, 16], [4.5, 10], [1, 18], [.5, 11]];
  var Yi = [[15.5, 10], [12.5, 19], [8, 11], [3.5, 19], [.5, 10]];
  var Ei = [[13, 9], [10, 15], [6.5, 10], [1.5, 19], [0, 10]];
  function qi(S, a, s, B, o, n, i, O, t) {
    var h;
    var r;
    var d;
    var b = [];
    var l = (o + n) / 16;
    for (h = 0; h < B.length; h++)
      r = B[h], d = Math.round(r[1] * i), b.push([Math.round(a + r[0] + l * d), s + d]);
    var f = [[a + B[B.length - 1][0], s], [a + B[0][0], s]];
    for (h = 0; h < b.length; h++)
      h % 2 && h < b.length - 1 ? f.push([b[h][0] + .6, b[h][1]], [b[h][0] - .6, b[h][1]]) : f.push(b[h]);
    xi(S, f, O.base, O.line);
    var c = function (S, e) {
      return { fillStyle: "#000000", fillRect: function (a, s, B, o) {
          S.fillStyle = this.fillStyle;
          for (var n = s; n < s + o; n++)
            for (var i = a; i < a + B; i++)
              e[i + "," + n] && S.fillRect(i, n, 1, 1);
        } };
    }(S, co(function (S) {
      xi(S, f, O.base, O.line);
    }));
    for (h = 1; h < b.length - 1; h++) {
      var G = Math.round(a + B[h][0] + 4 * l);
      if (h % 2) {
        e.line(c, b[h][0], b[h][1] - 1, b[h + 1][0], b[h + 1][1] - 1, t.shade);
        e.line(c, b[h - 1][0], b[h - 1][1] - 1, b[h][0], b[h][1] - 1, t.deep);
        e.dot(c, b[h][0], b[h][1] - 1, t.base);
        e.dot(c, b[h][0], b[h][1] - 2, t.shade);
        e.line(c, b[h][0] - 1, b[h][1] - 3, G - 1, s + 4, O.hi);
      }
      else {
        e.line(c, b[h][0], b[h][1] - 2, G, s + 3, O.shade);
      }
    }
  }
  var Ki = Object.create(null);
  function Ui(S, a, s) {
    if ($S(a)) {
      !function (S, a, s) {
        if (1 === s) {
          var B = he;
          var o = a.torso.x - 11;
          var n = 0 | a.dy;
          Se(S, o + 7, 24, ce, B, n);
          Se(S, o + 21, 24, Ge, B, n);
          Se(S, o + 18, 43, ge, B, n);
          if (n) {
            e.dot(S, o + 26, 40, B.W);
            e.dot(S, o + 27, 38, B.W);
            e.dot(S, o + 25, 37, B.W);
          }
          else {
            e.dot(S, o + 26, 41, B.W);
            e.dot(S, o + 25, 39, B.W);
            e.dot(S, o + 26, 37, B.W);
          }
        }
      }(S, a, s);
    }
    else {
      var B = a.arms[s];
      var o = w(B);
      var n = h(B);
      var i = "#12151d";
      var O = "#20242e";
      var t = "#3c424e";
      var r = n.x - o.x;
      var d = n.y - o.y;
      var b = Math.sqrt(r * r + d * d) || 1;
      var l = r / b;
      var f = d / b;
      var c = -f;
      var G = l;
      var H = a.g.side || a.g.back ? 3 : 4;
      var g = Math.round(n.x - l * H);
      var x = Math.round(n.y - f * H);
      var D = 0 === s && !B.front;
      e.fatLine(S, o.x, o.y, g, x, 5, D ? i : "#292d38");
      e.line(S, Math.round(o.x + 2 * c), Math.round(o.y + 2 * G), Math.round(g + 2 * c), Math.round(x + 2 * G), D ? O : t);
      e.line(S, Math.round(o.x - 2 * c), Math.round(o.y - 2 * G), Math.round(g - 2 * c), Math.round(x - 2 * G), "#090b10");
      e.fatLine(S, Math.round(g - 3 * c), Math.round(x - 3 * G), Math.round(g + 3 * c), Math.round(x + 3 * G), 2, D ? i : O);
      e.line(S, Math.round(g - 2 * c), Math.round(x - 2 * G), Math.round(g + 2 * c), Math.round(x + 2 * G), t);
    }
  }
  function Xi(S, a, s) {
    if ("long_tuong_y" !== a.cfg.outfit)
      if ("toc_truong_y" !== a.cfg.outfit) {
        if ("quan_dui" !== a.cfg.outfit)
          if (BO(a.cfg)) {
            oO(S, a, s);
          }
          else if (Ki[a.cfg.outfit]) {
            Ki[a.cfg.outfit].sleeve(Tn(S), a, s);
          }
          else if ("lan_thanh_y" !== a.cfg.outfit)
            if ("sat_luc_y" !== a.cfg.outfit)
              if ("tan_mo_y" !== a.cfg.outfit)
                if ("thanh_tam_y" !== a.cfg.outfit)
                  if ("thien_luan_kiem_y" !== a.cfg.outfit)
                    if ("tuyet_son_kiem_y" !== a.cfg.outfit)
                      if ("man_ho_tu_y" !== a.cfg.outfit)
                        if ("than_kiem_y" !== a.cfg.outfit)
                          if ("chi_ton_kiem_y" !== a.cfg.outfit)
                            if ("hoat_tu_y" !== a.cfg.outfit)
                              if ("nam_tu_y" !== a.cfg.outfit)
                                if ("hong_ty" !== a.cfg.outfit)
                                  if ("nam_y_bao" !== a.cfg.outfit)
                                    if ("vuong_lam_y" !== a.cfg.outfit)
                                      if ("huyen_cot_y" !== a.cfg.outfit)
                                        if ("tong_ngoc_y" !== a.cfg.outfit)
                                          if ("npc_long_bao" !== a.cfg.outfit)
                                            if ("huan_su_bao" !== a.cfg.outfit)
                                              if ("tho_ren_moi" !== a.cfg.outfit)
                                                if ("tang_kinh_bao" === a.cfg.outfit && $S(a)) {
                                                  !function (S, e, a) {
                                                    if (1 === a) {
                                                      var s = function (S, e) {
                                                        var a;
                                                        var s = {};
                                                        for (a in S)
                                                          s[a] = S[a];
                                                        return m(s, e);
                                                      }(ee, e);
                                                      var B = e.torso.x - 11;
                                                      var o = 0 | e.dy;
                                                      Se(S, B + 4, 24, ie, s, o);
                                                      Se(S, B + 20, 24, Oe, s, o);
                                                      Se(S, B + 11, 26, te, s, o);
                                                    }
                                                  }(S, a, s);
                                                }
                                                else if ("bach_kim_an_dien_bao" !== a.cfg.outfit)
                                                  if ("thanh_lam_dao_bao" !== a.cfg.outfit)
                                                    if ("bach_nguyet_hong_lien" !== a.cfg.outfit)
                                                      if ("van_lo_lao_ma_bao" !== a.cfg.outfit)
                                                        if ("man_ho_tu_bao" !== a.cfg.outfit)
                                                          if ("ma_vuong_bao" !== a.cfg.outfit)
                                                            if ("xich_ma_y" !== a.cfg.outfit)
                                                              if ("dai_phu_bao" !== a.cfg.outfit) {
                                                                var B = a.arms[s];
                                                                var o = w(B);
                                                                var n = h(B);
                                                                var i = a.material.cloth;
                                                                var O = a.material.trim;
                                                                if ("tho_ren" === a.cfg.outfit) {
                                                                  var t = Math.round(n.x - .28 * (n.x - o.x));
                                                                  var r = Math.round(n.y - .28 * (n.y - o.y));
                                                                  e.fatLine(S, t - 2, r, t + 2, r, 3, O.deep);
                                                                  e.line(S, t - 2, r - 1, t + 2, r - 1, O.base);
                                                                  e.dot(S, t - 1, r - 1, G.metal.base);
                                                                  return void e.dot(S, t + 2, r, G.metal.hi);
                                                                }
                                                                if ("tieu_thanh" === a.cfg.outfit) {
                                                                  i = O;
                                                                }
                                                                var d = n.x - o.x;
                                                                var b = n.y - o.y;
                                                                var l = Math.sqrt(d * d + b * b) || 1;
                                                                var f = d / l;
                                                                var c = b / l;
                                                                var H = -c;
                                                                var g = f;
                                                                var x = 0 === s && !B.front;
                                                                var D = a.g.side || a.g.back || s ? 4 : 5;
                                                                var W = n.x - f * D;
                                                                var J = n.y - c * D;
                                                                u(S, [[o.x + 2 * H, o.y + 2 * g], [o.x - 2 * H, o.y - 2 * g], [W - 4 * H, J - 4 * g], [W + 4 * H, J + 4 * g]], x ? i.shade : i.base);
                                                                u(S, [[o.x - 2, o.y], [o.x, o.y + 2], [W - 1, J - 2], [W - 4, J]], i.deep);
                                                                e.fatLine(S, o.x + 1, o.y, Math.round(W + 2), Math.round(J - 2), 2, x ? i.base : i.hi);
                                                                e.line(S, Math.round(o.x + 5 * f - 1), Math.round(o.y + 5 * c), Math.round(W - 1), Math.round(J - 2), i.shade);
                                                                e.line(S, Math.round(W - 3), Math.round(J - 3), Math.round(W + 1), Math.round(J - 5), i.deep);
                                                                e.fatLine(S, Math.round(W - 4 * H), Math.round(J - 4 * g), Math.round(W + 4 * H), Math.round(J + 4 * g), 2, x ? O.deep : O.shade);
                                                                e.line(S, Math.round(W - 3 * H), Math.round(J - 3 * g), Math.round(W + 3 * H), Math.round(J + 3 * g), O.base);
                                                                e.dot(S, Math.round(W - 4 * H), Math.round(J - 4 * g), O.line);
                                                                e.dot(S, Math.round(W + 4 * H), Math.round(J + 4 * g), O.line);
                                                              }
                                                              else {
                                                                Ti(S, a, s);
                                                              }
                                                            else {
                                                              vO(S, a, s);
                                                            }
                                                          else {
                                                            mS(S, a, s);
                                                          }
                                                        else {
                                                          gS(S, a, s);
                                                        }
                                                      else {
                                                        nS(S, a, s);
                                                      }
                                                    else {
                                                      BS(S, a, s);
                                                    }
                                                  else {
                                                    z(S, a, s);
                                                  }
                                                else {
                                                  XS(S, a, s);
                                                }
                                              else {
                                                IS(S, a, s);
                                              }
                                            else {
                                              PS(S, a, s);
                                            }
                                          else {
                                            RS(S, a, s);
                                          }
                                        else {
                                          _e(S, a, s);
                                        }
                                      else {
                                        Re(S, a, s);
                                      }
                                    else {
                                      Fe(S, a, s);
                                    }
                                  else {
                                    Pe(S, a, s);
                                  }
                                else {
                                  Ui(S, a, s);
                                }
                              else {
                                na(S, a, s);
                              }
                            else {
                              Oa(S, a, s);
                            }
                          else {
                            Da(S, a, s);
                          }
                        else {
                          DB(S, a, s);
                        }
                      else {
                        Rs(S, a, s);
                      }
                    else {
                      Ws(S, a, s);
                    }
                  else {
                    za(S, a, s);
                  }
                else {
                  Mn(S, a, s);
                }
              else {
                Yo(S, a, s);
              }
            else {
              lo(S, a, s);
            }
          else {
            !function (S, e, a) {
              GO(Tn(S), e, a);
              HO(S, e, a);
            }(S, a, s);
          }
      }
      else {
        Fn(S, a, s);
      }
    else {
      nn(S, a, s);
    }
  }
  function Ri(S, a, s, B, o, n) {
    e.r(S, s, B + 8, o, 1, a.mid);
    e.r(S, s, B + 9, o, 1, a.core);
    e.r(S, s, B + 10, o, 1, a.rim);
    e.dot(S, s - 1, B + 8, a.halo);
    e.dot(S, s - 1, B + 9, a.halo);
    e.dot(S, s - 1, B + 7, a.far);
    e.dot(S, s - 1, B + 10, a.far);
    e.r(S, s, B + 11, o, 1, a.far);
    e.r(S, s, B + 6, o, 1, a.far);
    if (!(n)) {
      e.dot(S, s + o, B + 8, a.halo);
      e.dot(S, s + o, B + 9, a.halo);
      e.dot(S, s + o, B + 7, a.far);
      e.dot(S, s + o, B + 10, a.far);
    }
  }
  function zi(a, s) {
    if (!s.g.back) {
      var B = s.head;
      var o = B.x;
      var n = B.y;
      var i = B.w;
      var O = G.face;
      var t = S.Palette.EYE;
      var h = x[s.cfg.eyeColor];
      var r = h ? h.iris : t.iris;
      var d = h ? h.deep : O.irisdeep;
      var b = h ? h.hi : O.irishi;
      var l = s.p.sit || "hurt" === s.p.act;
      var f = h && h.slit;
      var c = h && h.glow;
      if (s.g.side) {
        if (h && h.pair) {
          r = h.pair[1].iris;
          d = h.pair[1].deep;
          b = h.pair[1].hi;
        }
        e.line(a, o + i - 5, n + 5, o + i - 2, n + 5, O.brow);
        e.r(a, o + i - 5, n + 7, 3, 1, O.lid);
        e.r(a, o + i - 5, n + 8, 3, l ? 1 : 2, l ? O.lid : f ? r : t.white);
        return void (l || (e.r(a, o + i - 3, n + 8, 2, 2, r), e.dot(a, o + i - 2, n + 8, t.spark), f && (e.r(a, o + i - 3, n + 8, 1, 2, f), e.dot(a, o + i - 5, n + 8, d), e.dot(a, o + i - 2, n + 9, b)), e.r(a, o + i - 4, n + 10, 2, 1, O.low), c && Ri(a, c, o + i - 5, n, 4, !0)));
      }
      for (var g = 0; g < 2; g++) {
        var D = o + H.eyes[g];
        var W = D + (g ? 0 : 2);
        var J = D + (g ? 2 : 0);
        var u = D + 1;
        e.r(a, D, n + 5, 3, 1, O.brow);
        e.dot(a, D + (g ? 0 : 2), n + 5, O.browhi);
        if (l) {
          e.r(a, D, n + 9, 3, 1, O.lid);
        }
        else {
          if (h && h.pair) {
            r = h.pair[g].iris;
            d = h.pair[g].deep;
            b = h.pair[g].hi;
          }
          e.r(a, D, n + 7, 3, 1, O.lid);
          e.dot(a, J, n + 7, O.lidhi);
          e.r(a, D, n + 8, 3, 3, t.white);
          e.dot(a, J, n + 8, O.sclera);
          e.dot(a, u, n + 8, d);
          e.dot(a, u, n + 9, r);
          e.dot(a, W, n + 9, b);
          e.dot(a, W, n + 8, t.spark);
          e.dot(a, u, n + 10, O.low);
          e.dot(a, W, n + 10, O.lowhi);
          if (f) {
            e.dot(a, J, n + 8, r);
            e.dot(a, J, n + 9, r);
            e.dot(a, J, n + 10, d);
            e.dot(a, u, n + 8, f);
            e.dot(a, u, n + 9, f);
          }
          if (c) {
            Ri(a, c, D, n, 3, !1);
          }
        }
      }
    }
  }
  Ki.bach_y = { sleeve: Bi, under: function (S, e) {
      ai(S, e, e.material.pants, !1);
      if (!(e.arms[0].front || e.arms[0].over)) {
        Bi(S, e, 0);
      }
    }, robe: function (S, a) {
      var s = a.material;
      var B = s.cloth;
      var o = s.trim;
      var n = s.accent;
      var i = s.jade;
      var O = a.torso;
      var t = a.g.side;
      var h = a.g.back;
      var r = GB(a);
      var d = O.x - 1;
      var b = O.x + O.w;
      var l = O.y - 1;
      var f = O.x + (O.w >> 1);
      var c = O.y + 11;
      var G = c + 4;
      var H = si(a, 57, 59);
      var g = a.p.sit ? 5 : 3;
      var x = a.g.female;
      var D = { j: i.base, i: i.hi, J: i.deep, X: i.line, n: o.deep, G: o.base, Y: o.hi, a: n.line, s: n.shade, S: n.base, A: n.deep, H: n.hi, g: o.shade };
      var W = { Y: o.hi, G: o.base, g: o.shade };
      if (!t) {
        var J = x ? 1 : 0;
        var M = a.p.sit ? 0 : r;
        u(S, [[d + 1, l], [b - 1, l], [b, l + 2], [b - J, c], [b - J, G], [b + g + M, H], [d - g + M, H], [d + J, G], [d + J, c], [d, l + 2]], B.line);
        u(S, [[d + 2, l + 1], [b - 2, l + 1], [b - 1, l + 3], [b - 1 - J, c], [b - 1 - J, G], [b + g - 1 + M, H - 1], [d - g + 2 + M, H - 1], [d + 1 + J, G], [d + 1 + J, c], [d + 1, l + 3]], B.base);
        e.line(S, d + 1, l + 3, d + 1 + J, c - 1, B.shade);
        e.line(S, b - 2, l + 3, b - 2 - J, c - 1, B.hi);
        e.line(S, d + 2, G + 1, d - g + 3 + M, H - 2, B.shade);
        e.line(S, f - 2, G + 2, f - 3 + M, H - 2, B.shade);
        e.line(S, f + 3, G + 2, f + 4 + M, H - 2, B.hi);
        e.line(S, b - 2, G + 1, b + g - 2 + M, H - 2, B.deep);
        if (h) {
          e.r(S, f - 3, l, 6, 2, o.base);
          e.r(S, f - 2, l, 4, 1, o.hi);
          as(S, f - 3, l + 4, Oi, W, !1);
          e.line(S, f, l + 8, f, c - 1, B.shade);
          e.line(S, f, G + 1, f + M, H - 2, B.shade);
        }
        else {
          e.line(S, f - 2, l, f, l + 3, o.shade);
          e.line(S, f - 3, l, f - 1, l + 4, o.base);
          e.fatLine(S, f + 2, l, d + 2, c - 1, 2, o.base);
          e.line(S, f + 3, l, d + 3, c - 1, o.hi);
          e.line(S, f + 1, l + 1, d + 1, c - 2, o.deep);
          e.dot(S, f - 1, l + 1, B.hi);
          e.dot(S, f, l + 2, B.hi);
          e.line(S, d + 2, G, d - g + 3 + M, H - 2, o.base);
          e.line(S, d + 3, G, d - g + 4 + M, H - 2, o.hi);
        }
        e.line(S, d - g + 2 + M, H - 1, b + g - 1 + M, H - 1, o.base);
        e.line(S, d - g + 1 + M, H, b + g + M, H, o.deep);
        as(S, d - g + 3 + M, H - 4, ii, W, !1);
        as(S, b + g - 3 + M, H - 4, ii, W, !0);
        e.r(S, d, c, b - d + 1, 4, n.base);
        e.r(S, d, c, b - d + 1, 1, n.hi);
        e.r(S, d, c + 3, b - d + 1, 1, n.line);
        e.line(S, d, c + 1, d, c + 2, n.deep);
        e.line(S, d + 1, c + 2, b - 1, c + 2, n.shade);
        var w = h ? d - 1 : b - 3;
        var N = a.p.sit ? 6 : 12;
        var p = w + 2;
        var k = a.p.sit ? 0 : r;
        as(S, w, c, ni, D, !1);
        e.fatLine(S, p - 1, c + 3, p - 2 - k, c + 2 + N, 2, n.base);
        e.line(S, p - 1, c + 3, p - 2 - k, c + 2 + N, n.hi);
        e.fatLine(S, p + 1, c + 3, p + 2 + k, c + 1 + N, 2, n.shade);
        e.line(S, p + 2, c + 3, p + 3 + k, c + 1 + N, n.base);
        e.dot(S, p - 2 - k, c + 3 + N, n.deep);
        e.dot(S, p + 3 + k, c + 2 + N, n.line);
        if (!(h)) {
          as(S, d + 2, c + 3, a.p.sit ? oi.slice(0, 7) : oi, D, !1, xB(-r, 3, 5));
        }
        return void (a.arms[0].front || a.arms[0].over || Bi(S, a, 0));
      }
      var m = HB(a);
      var v = b + 1;
      u(S, [[d + 1, l], [b, l], [b + 1, l + 3], [b, c], [b, G], [v + 2 + (a.p.sit ? 3 : 0), H], [d - 3 + m - (a.p.sit ? 3 : 0), H], [d - 1 + m, G + 6], [d, c], [d, l + 3]], B.line);
      u(S, [[d + 2, l + 1], [b - 1, l + 1], [b, l + 3], [b - 1, c], [b - 1, G], [v + 1 + (a.p.sit ? 3 : 0), H - 1], [d - 2 + m - (a.p.sit ? 3 : 0), H - 1], [d + m, G + 6], [d + 1, c], [d + 1, l + 3]], B.base);
      e.line(S, d + 1, l + 3, d + 1, c - 1, B.shade);
      e.line(S, d + 2, G + 2, d - 1 + m, H - 2, B.shade);
      e.line(S, f, G + 2, f + m, H - 2, B.hi);
      e.fatLine(S, b - 2, l, b - 1, c - 1, 2, o.base);
      e.line(S, b - 3, l, b - 2, c - 1, o.hi);
      e.line(S, b, G, v + 1 + (a.p.sit ? 3 : 0), H - 2, o.base);
      e.line(S, d - 2 + m - (a.p.sit ? 3 : 0), H - 1, v + 1 + (a.p.sit ? 3 : 0), H - 1, o.base);
      e.line(S, d - 3 + m - (a.p.sit ? 3 : 0), H, v + 2 + (a.p.sit ? 3 : 0), H, o.deep);
      as(S, d - 1 + m - (a.p.sit ? 3 : 0), H - 4, ii, W, !1);
      e.r(S, d, c, b - d + 1, 4, n.base);
      e.r(S, d, c, b - d + 1, 1, n.hi);
      e.r(S, d, c + 3, b - d + 1, 1, n.line);
      e.line(S, d + 1, c + 2, b - 1, c + 2, n.shade);
      as(S, f, c + 3, a.p.sit ? oi.slice(0, 7) : oi, D, !1, xB(-m, 3, 5));
    } };
  Ki.hac_y = { sleeve: hi, under: function (S, a) {
      var s = a.material;
      var B = s.pants;
      var o = s.wrap;
      if (ai(S, a, B, !1), !a.p.sit) {
        for (var n = 0; n < 2; n++) {
          var i = a.legs[n];
          var O = i.knee + 1;
          var t = i.foot - 4;
          e.r(S, i.x, O, i.w, t - O, o.shade);
          e.r(S, i.x, O, 1, t - O, o.line);
          e.r(S, i.x + i.w - 1, O, 1, t - O, o.deep);
          for (var h = O; h < t - 1; h += 2)
            e.line(S, i.x + 1, h + 1, i.x + i.w - 2, h, o.base);
          e.r(S, i.x, O, i.w, 1, o.deep);
        }
      }
      if (!(a.arms[0].front || a.arms[0].over)) {
        hi(S, a, 0);
      }
    }, robe: function (S, a) {
      var s = a.material;
      var B = s.cloth;
      var o = s.trim;
      var n = s.leather;
      var i = s.metal;
      var O = s.accent;
      var t = a.torso;
      var h = a.g.side;
      var r = a.g.back;
      var d = GB(a);
      var b = a.p.sit ? 0 : d;
      var l = t.x - 1;
      var f = t.x + t.w;
      var c = t.y - 1;
      var G = t.x + (t.w >> 1);
      var H = t.y + 12;
      var g = t.y + (a.p.sit ? 21 : 23);
      var x = a.g.female ? 1 : 0;
      var D = { a: O.line, A: O.deep, s: O.shade, S: O.base, H: O.hi, M: i.base, h: i.hi, m: i.deep, l: n.line };
      if (!h) {
        var W = a.p.sit ? 4 : 3;
        xi(S, [[l + 3, c], [f - 3, c], [f - 1, c + 1], [f, c + 3], [f, c + 8], [f - 1 - x, H + 1], [l + 1 + x, H + 1], [l, c + 8], [l, c + 3], [l + 1, c + 1]], B.base, B.line);
        var J = [[G, H + 1], [f - x, H + 1], [f - x, H + 4], [f + W + b, g - 3], [f + W - 1 + b, g - 1], [f + W - 3 + b, g], [G + 2 + b, g], [G + 1 + b, g - 1], [G, H + 5]];
        if (xi(S, [[l + x, H + 1], [G - 1, H + 1], [G - 1, H + 5], [G - 2 + b, g - 1], [G - 3 + b, g], [l - W + 3 + b, g], [l - W + 1 + b, g - 1], [l - W + b, g - 3], [l + x, H + 4]], B.base, B.line), xi(S, J, B.base, B.line), e.line(S, l + 1, c + 3, l + 1, c + 8, B.shade), e.line(S, l + 1, c + 8, l + 2 + x, H, B.shade), e.line(S, f - 1, c + 3, f - 1, c + 8, B.hi), e.line(S, f - 1, c + 8, f - 2 - x, H, B.hi), e.line(S, l + 2, H + 4, l - W + 3 + b, g - 2, B.shade), e.line(S, G - 3, H + 4, G - 4 + b, g - 2, B.deep), e.line(S, f - 2, H + 4, f + W - 2 + b, g - 2, B.hi), e.line(S, G + 2, H + 4, G + 3 + b, g - 2, B.shade), e.line(S, l - W + 2 + b, g - 1, G - 3 + b, g - 1, o.deep), e.line(S, G + 2 + b, g - 1, f + W - 2 + b, g - 1, o.shade), e.line(S, G - 2, H + 5, G - 2 + b, g - 2, o.deep), e.line(S, G + 1, H + 5, G + 1 + b, g - 2, o.shade), r) {
          e.line(S, G, c + 3, G, H - 1, B.deep);
        }
        else {
          e.line(S, G + 2, c + 2, l + 3, H - 1, o.shade);
          e.line(S, G + 3, c + 2, l + 4, H - 1, B.deep);
          e.fatLine(S, l + 2, c + 1, f - 2, H - 1, 2, n.shade);
          e.line(S, l + 2, c + 1, f - 2, H - 1, n.hi);
          for (var u = 0; u < 3; u++) {
            var M = l + 4 + 2 * u;
            var w = c + 3 + Math.round(2.2 * u);
            e.dot(S, M, w - 1, i.hi);
            e.dot(S, M, w, i.base);
            e.dot(S, M + 1, w, i.deep);
          }
        }
        e.r(S, l, H, f - l + 1, 3, n.base);
        e.r(S, l, H, f - l + 1, 1, n.hi);
        e.r(S, l, H + 2, f - l + 1, 1, n.line);
        if (r) {
          e.r(S, l + 1, H + 2, f - l - 1, 2, n.line);
          e.r(S, l + 2, H + 2, f - l - 3, 1, n.shade);
          e.dot(S, f - 1, H + 3, i.base);
          as(S, l - 3, H + 1, di, D, !0);
          e.dot(S, l - 1, H + 2, O.base);
        }
        else {
          as(S, G - 2, H, ri, D, !1);
          e.r(S, l - 1, H + 1, 3, 4, n.line);
          e.r(S, l, H + 2, 2, 2, n.shade);
          e.dot(S, l, H + 2, n.hi);
          as(S, f + 1, H, di, D, !1);
        }
        as(S, G - 4, c - 1, bi, D, !1);
        if (r) {
          as(S, G - 2, c, li, D, !1);
          fi(S, [[G - 1, c + 4], [G - 2, c + 7], [G - 3 - b, c + 10], [G - 3 - b, c + 12]], O);
          fi(S, [[G + 1, c + 4], [G + 2, c + 6], [G + 3 + b, c + 8], [G + 4 + b, c + 9]], O);
        }
        else {
          fi(S, [[G - 3, c + 2], [G - 4, c + 5], [G - 4 + b, c + 8], [G - 3 + b, c + 10]], O);
          e.dot(S, G - 3, c + 3, O.base);
        }
        return void (a.arms[0].front || a.arms[0].over || hi(S, a, 0));
      }
      var N = HB(a);
      var p = a.p.sit ? 2 : 0;
      xi(S, [[l + 2, c], [f - 2, c], [f, c + 1], [f + 1, c + 4], [f + 1, c + 8], [f, H + 1], [l + 1, H + 1], [l, c + 10], [l - 1, c + 6], [l - 1, c + 3], [l, c + 1]], B.base, B.line);
      var k = [[G, H + 1], [f, H + 1], [f, H + 4], [f + 2 + p, g - 3], [f + 2 + p, g - 1], [f + p, g], [G + 1 + N, g], [G + N, g - 1], [G, H + 5]];
      xi(S, [[l + 1, H + 1], [G - 1, H + 1], [G - 1, H + 5], [G - 1 + N, g - 1], [G - 2 + N, g], [l + N - p, g], [l - 2 + N - p, g - 2], [l - 2 + N - p, g - 4], [l + 1, H + 4]], B.base, B.line);
      xi(S, k, B.base, B.line);
      e.line(S, l, c + 3, l, c + 6, B.shade);
      e.line(S, l + 1, c + 7, l + 1, c + 10, B.shade);
      e.line(S, f, c + 4, f, c + 8, B.hi);
      e.line(S, l + 1, H + 4, l - 1 + N - p, g - 2, B.shade);
      e.line(S, f - 1, H + 4, f + 1 + p, g - 2, B.hi);
      e.line(S, l + N - p, g - 1, G - 2 + N, g - 1, o.deep);
      e.line(S, G + 1 + N, g - 1, f + p, g - 1, o.shade);
      e.line(S, f - 1, c + 2, f - 1, H - 1, o.base);
      e.fatLine(S, f - 3, c + 1, l + 2, H - 1, 2, n.deep);
      e.line(S, f - 3, c + 1, l + 2, H - 1, n.base);
      e.dot(S, f - 4, c + 3, i.hi);
      e.dot(S, f - 5, c + 5, i.base);
      e.r(S, l, H, f - l + 1, 3, n.base);
      e.r(S, l, H, f - l + 1, 1, n.hi);
      e.r(S, l, H + 2, f - l + 1, 1, n.line);
      e.r(S, l - 1, H + 1, 5, 2, n.line);
      e.dot(S, l, H + 1, n.shade);
      as(S, l - 2, H, di, D, !0);
      e.dot(S, l - 4, H + 1, O.base);
      e.r(S, l + 2, c - 1, f - l - 1, 3, O.line);
      e.r(S, l + 3, c, f - l - 3, 1, O.base);
      e.dot(S, f - 2, c, O.hi);
      fi(S, [[l + 1, c], [l - 2, c + 2], [l - 5, c + 3 + N], [l - 8, c + 2 + N]], O);
    } };
  Ki.lam_y = { sleeve: ci, under: function (S, e) {
      ai(S, e, e.material.pants, !1);
      if (!(e.arms[0].front || e.arms[0].over)) {
        ci(S, e, 0);
      }
    }, robe: function (S, a) {
      var s = a.material;
      var B = s.cloth;
      var o = s.accent;
      var n = s.trim;
      var i = s.cord;
      var O = a.torso;
      var t = a.g.side;
      var h = a.g.back;
      var r = GB(a);
      var d = a.p.sit ? 0 : r;
      var b = O.x - 1;
      var l = O.x + O.w;
      var f = O.y - 1;
      var c = O.x + (O.w >> 1);
      var G = O.y + 12;
      var H = si(a, 54, 58);
      var g = H + 3;
      var x = a.p.sit ? 4 : 2;
      var D = a.g.female ? 1 : 0;
      var W = { k: n.line, K: n.base, W: o.base, c: i.deep, C: i.base, h: i.hi };
      if (t) {
        var J = HB(a);
        var M = a.p.sit ? 3 : 0;
        u(S, [[l - 2, G], [l + 1, G], [l + 2 + M, g], [l - 3 + M, g]], o.line);
        u(S, [[l - 1, G], [l, G], [l + 1 + M, g - 1], [l - 2 + M, g - 1]], o.base);
        u(S, [[b + 1, f], [l, f], [l + 1, f + 3], [l, G], [l + 1 + M, H], [b - 2 + J - M, H], [b - 1 + J, G + 6], [b, G], [b, f + 3]], B.line);
        u(S, [[b + 2, f + 1], [l - 1, f + 1], [l, f + 3], [l - 1, G], [l + M, H - 1], [b - 1 + J - M, H - 1], [b + J, G + 6], [b + 1, G], [b + 1, f + 3]], B.base);
        e.line(S, b + 1, f + 3, b + 1, G - 1, B.shade);
        e.line(S, b + 2, G + 3, b - 1 + J - M, H - 2, B.shade);
        e.line(S, c, G + 3, c + J, H - 2, B.hi);
        e.line(S, l, f + 1, l, G, o.base);
        e.dot(S, l, f + 1, o.hi);
        e.fatLine(S, l - 2, f, l - 2, G - 1, 2, n.base);
        e.line(S, l - 2, f, l - 2, G - 1, n.hi);
        e.line(S, l - 1, G + 2, l + M, H - 1, n.base);
        e.line(S, b - 1 + J - M, H - 1, l + M, H - 1, n.base);
        e.line(S, b - 2 + J - M, H, l + 1 + M, H, n.line);
        for (var w = b + J - M; w < l + M; w += 3)
          e.dot(S, w, H - 1, o.shade);
        e.line(S, b, G, l, G, i.base);
        e.line(S, b, G + 1, l, G + 1, i.deep);
        as(S, l - 1, G - 1, Hi.map(function (S) {
          return S.slice(1, 4);
        }), W, !1);
        as(S, l, G + 2, gi.slice(0, a.p.sit ? 4 : 7), W, !1, xB(-J, 2, 5));
      }
      else {
        u(S, [[c - 3, G], [c + 3, G], [c + 4 + d, g], [c - 4 + d, g]], o.line);
        u(S, [[c - 2, G], [c + 2, G], [c + 3 + d, g - 1], [c - 3 + d, g - 1]], o.base);
        e.line(S, c - 1, G + 2, c - 2 + d, g - 2, o.shade);
        e.line(S, c + 1, G + 2, c + 2 + d, g - 2, o.hi);
        u(S, [[b + 1, f], [l - 1, f], [l, f + 2], [l - D, G], [l + x + d, H], [b - x + d, H], [b + D, G], [b, f + 2]], B.line);
        u(S, [[b + 2, f + 1], [l - 2, f + 1], [l - 1, f + 3], [l - 1 - D, G], [l + x - 1 + d, H - 1], [b - x + 1 + d, H - 1], [b + 1 + D, G], [b + 1, f + 3]], B.base);
        e.line(S, b + 1, f + 3, b + 1 + D, G - 1, B.shade);
        e.line(S, l - 2, f + 3, l - 2 - D, G - 1, B.hi);
        e.line(S, b + 2, G + 2, b - x + 2 + d, H - 2, B.shade);
        e.line(S, l - 2, G + 2, l + x - 2 + d, H - 2, B.deep);
        e.line(S, b + 3, G + 3, b - x + 4 + d, H - 2, B.hi);
        e.line(S, b - x + 1 + d, H - 1, l + x - 1 + d, H - 1, n.base);
        e.line(S, b - x + d, H, l + x + d, H, n.line);
        for (var N = b - x + 2 + d; N < l + x - 1 + d; N += 3)
          e.dot(S, N, H - 1, o.shade), 1 & N || e.dot(S, N + 1, H - 1, o.shade);
        if (h ? (e.r(S, c - 3, f, 6, 2, n.base), e.r(S, c - 2, f, 4, 1, n.hi), as(S, c - 3, f + 4, Gi, W, !1), e.line(S, c, G + 2, c + d, H - 2, B.deep)) : (u(S, [[c - 1, f], [c + 1, f], [c + 1, G], [c - 1, G]], o.base), e.line(S, c - 1, f + 1, c - 1, G - 1, o.shade), e.dot(S, c, f + 1, o.hi), u(S, [[c - 1, G + 2], [c + 1, G + 2], [c + 2 + d, H], [c - 2 + d, H]], o.base), e.line(S, c - 1, G + 2, c - 2 + d, H - 1, o.shade), e.line(S, c + 1, G + 3, c + 1 + d, H - 2, o.hi), e.line(S, c - 2, f, c - 2, G, n.base), e.line(S, c - 3, f + 1, c - 3, G, n.hi), e.line(S, c + 1, f, c + 1, G, n.base), e.line(S, c + 2, f + 1, c + 2, G, n.line), e.line(S, c - 2, G + 2, c - 3 + d, H - 1, n.base), e.line(S, c - 3, G + 2, c - 4 + d, H - 1, n.hi), e.line(S, c + 1, G + 2, c + 2 + d, H - 1, n.base), e.line(S, c + 2, G + 2, c + 3 + d, H - 1, n.line), e.line(S, c - 3, f, c + 2, f, n.base)), e.line(S, b, G, l, G, i.shade), e.line(S, b, G + 1, l, G + 1, i.deep), e.line(S, b + 1, G, l - 1, G, i.base), !h) {
          as(S, c - 2, G - 1, Hi, W, !1);
          var p = a.p.sit ? 4 : gi.length;
          as(S, c - 2, G + 2, gi.slice(0, p), W, !1, xB(-r, 2, 5));
          as(S, c + 1, G + 2, gi.slice(0, p - 1), W, !1, xB(r, 2, 5));
        }
        if (!(a.arms[0].front || a.arms[0].over)) {
          ci(S, a, 0);
        }
      }
    } };
  Ki.tu_quang_y = { sleeve: Ji, under: function (S, e) {
      ai(S, e, e.material.pants, !1);
      if (!(e.arms[0].front || e.arms[0].over)) {
        Ji(S, e, 0);
      }
    }, robe: function (S, a) {
      var s = a.material;
      var B = s.cloth;
      var o = s.trim;
      var n = s.accent;
      var i = s.paper;
      var O = s.glow;
      var t = a.torso;
      var h = a.g.side;
      var r = a.g.back;
      var d = GB(a);
      var b = a.p.sit ? 0 : d;
      var l = t.x - 1;
      var f = t.x + t.w;
      var c = t.y - 1;
      var G = t.x + (t.w >> 1);
      var H = t.y + 12;
      var g = si(a, 56, 59);
      var x = a.p.sit ? 5 : 2;
      var D = a.g.female ? 1 : 0;
      var W = { n: o.line, g: o.shade, G: O.base, o: O.deep, O: O.base, w: O.hi, l: i.line, p: i.base, r: i.ink };
      var J = a.p.sit ? 6 : wi.length;
      if (!h) {
        if (u(S, [[l + 1, c], [f - 1, c], [f, c + 2], [f - D, H], [f + x + b, g], [l - x + b, g], [l + D, H], [l, c + 2]], B.line), u(S, [[l + 2, c + 1], [f - 2, c + 1], [f - 1, c + 3], [f - 1 - D, H], [f + x - 1 + b, g - 1], [l - x + 1 + b, g - 1], [l + 1 + D, H], [l + 1, c + 3]], B.base), e.line(S, l + 1, c + 3, l + 1 + D, H - 1, B.shade), e.line(S, f - 2, c + 3, f - 2 - D, H - 1, B.hi), e.line(S, l + 2, H + 3, l - x + 2 + b, g - 2, B.shade), e.line(S, f - 2, H + 3, f + x - 2 + b, g - 2, B.deep), e.line(S, l + 4, H + 4, l - x + 5 + b, g - 2, B.hi), e.line(S, l - x + 1 + b, g - 1, f + x - 1 + b, g - 1, o.base), e.line(S, l - x + b, g, f + x + b, g, o.line), r) {
          e.line(S, G, H + 3, G + b, g - 2, B.deep);
        }
        else {
          var M = H + 6;
          u(S, [[G, M], [G + 3 + b, g], [G - 3 + b, g]], n.base);
          e.line(S, G, M + 1, G + b, g - 1, n.hi);
          e.line(S, G - 1, M + 2, G - 2 + b, g - 1, n.shade);
          e.line(S, G, M, G - 3 + b, g - 1, o.base);
          e.line(S, G, M, G + 3 + b, g - 1, o.hi);
          e.line(S, G, H + 3, G, M, B.deep);
        }
        e.r(S, l, H, f - l + 1, 3, B.deep);
        e.r(S, l, H, f - l + 1, 1, o.shade);
        e.r(S, l, H + 2, f - l + 1, 1, B.line);
        e.line(S, l + 1, H + 1, f - 1, H + 1, B.shade);
        if (r) {
          as(S, f - 2, H + 1, wi.slice(0, J), W, !1, xB(-d, 3, 6));
          e.line(S, l + 2, H + 2, l + 1 + b, H + (a.p.sit ? 7 : 13), o.base);
          e.line(S, l + 1, H + 2, l + b, H + (a.p.sit ? 7 : 13), o.hi);
          e.line(S, l, H + 2, l - 1 - b, H + (a.p.sit ? 6 : 10), o.shade);
        }
        else {
          e.r(S, G - 1, H, 3, 3, o.line);
          e.dot(S, G, H + 1, o.hi);
          as(S, l - 1, H + 1, wi.slice(0, J), W, !1, xB(-d, 3, 6));
          as(S, l + 3, H + 2, wi.slice(0, J - 1), W, !1, xB(-d, 2, 6));
          e.line(S, f - 2, H + 2, f - 1 + b, H + (a.p.sit ? 7 : 13), o.base);
          e.line(S, f - 1, H + 2, f + b, H + (a.p.sit ? 7 : 13), o.hi);
          e.line(S, f, H + 2, f + 1 - b, H + (a.p.sit ? 6 : 10), o.shade);
          e.dot(S, f - 1 + b, H + (a.p.sit ? 8 : 14), o.line);
        }
        var w = r ? c + 12 : c + 9;
        xi(S, [[G - 4, c - 1], [G + 3, c - 1], [f + 1, c + 1], [f + 2, c + 4], [f + 1, c + 6], [f - 1, c + 7], [f - 3, c + 6], [G + 3, c + 7], [G, w], [G - 1, w], [G - 4, c + 7], [l + 2, c + 6], [l, c + 7], [l - 2, c + 6], [l - 2, c + 4], [l - 1, c + 1]], o.base, o.line);
        e.line(S, G - 3, c, G + 2, c, o.hi);
        e.line(S, l + 1, c + 2, G - 4, c + 1, o.hi);
        e.line(S, l, c + 5, G - 4, c + 5, o.shade);
        e.line(S, G + 3, c + 5, f - 1, c + 5, o.shade);
        e.line(S, G - 3, c + 6, G - 1, w - 1, o.shade);
        e.line(S, G + 2, c + 6, G, w - 1, o.deep);
        e.r(S, G - 3, c - 1, 6, 2, o.line);
        e.r(S, G - 2, c - 1, 4, 1, o.base);
        e.dot(S, G + 1, c - 1, o.hi);
        if (r) {
          as(S, G - 4, c + 2, Mi, W, !1);
        }
        else {
          as(S, G - 3, c + 2, ui, W, !1);
        }
        return void (a.arms[0].front || a.arms[0].over || Ji(S, a, 0));
      }
      var N = HB(a);
      var p = a.p.sit ? 3 : 0;
      u(S, [[l + 1, c], [f, c], [f + 1, c + 3], [f, H], [f + 2 + p, g], [l - 2 + N - p, g], [l - 1 + N, H + 6], [l, H], [l, c + 3]], B.line);
      u(S, [[l + 2, c + 1], [f - 1, c + 1], [f, c + 3], [f - 1, H], [f + 1 + p, g - 1], [l - 1 + N - p, g - 1], [l + N, H + 6], [l + 1, H], [l + 1, c + 3]], B.base);
      e.line(S, l + 1, c + 3, l + 1, H - 1, B.shade);
      e.line(S, l + 2, H + 3, l - 1 + N - p, g - 2, B.shade);
      e.line(S, G + 1, H + 3, G + 1 + N, g - 2, B.hi);
      e.line(S, f, H + 4, f + 1 + p, g - 1, n.base);
      e.line(S, f - 1, H + 4, f + p, g - 1, o.base);
      e.line(S, l - 1 + N - p, g - 1, f + 1 + p, g - 1, o.base);
      e.line(S, l - 2 + N - p, g, f + 2 + p, g, o.line);
      e.r(S, l, H, f - l + 1, 3, B.deep);
      e.r(S, l, H, f - l + 1, 1, o.shade);
      e.r(S, l, H + 2, f - l + 1, 1, B.line);
      e.r(S, f - 1, H, 2, 3, o.line);
      e.dot(S, f - 1, H + 1, o.hi);
      as(S, G - 2, H + 1, wi.slice(0, J), W, !1, xB(-N, 3, 6));
      as(S, G + 1, H + 2, wi.slice(0, J - 1), W, !1, xB(-N, 2, 6));
      xi(S, [[l + 2, c - 1], [f, c - 1], [f + 2, c + 2], [f + 2, c + 5], [f, c + 7], [f - 2, c + 6], [G, c + 6], [l + 2, c + 8], [l, c + 6], [l - 1, c + 3]], o.base, o.line);
      e.line(S, l + 2, c, f - 1, c, o.hi);
      e.line(S, l + 1, c + 5, f - 1, c + 5, o.shade);
      e.r(S, G - 1, c - 1, 5, 2, o.line);
      e.r(S, G, c - 1, 3, 1, o.base);
    } };
  Ki.thanh_y = { sleeve: pi, under: function (S, e) {
      ai(S, e, Ni.pants, !1);
      if (!(e.arms[0].front || e.arms[0].over)) {
        pi(S, e, 0);
      }
    }, robe: function (S, a) {
      var s = Ni.cloth;
      var B = Ni.lining;
      var o = Ni.sash;
      var n = Ni.cord;
      var i = a.torso;
      var O = a.g.side;
      var t = a.g.back;
      var h = GB(a);
      var r = a.p.sit ? 0 : h;
      var d = i.x - 1;
      var b = i.x + i.w;
      var l = i.y - 1;
      var f = i.x + (i.w >> 1);
      var c = i.y + 11;
      var G = si(a, 54, 59);
      var H = a.g.female ? 1 : 0;
      var g = { o: n.base, H: n.hi, k: n.deep, s: s.hi, L: B.shade };
      if (O) {
        var x = HB(a);
        var D = a.p.sit ? 3 : 0;
        var W = [[d + 2, l], [b - 2, l], [b, l + 1], [b + 1, l + 4], [b + 1, l + 8], [b, c], [b, c + 3], [b + 2 + D, G - 3], [b + 2 + D, G - 1], [b + D, G], [f + x, G + 1], [d - 2 + x - D, G], [d - 3 + x - D, G - 2], [d - 3 + x - D, G - 4], [d + 1, c + 3], [d + 1, c], [d, l + 10], [d - 1, l + 6], [d - 1, l + 3], [d, l + 1]];
        u(S, W, s.base);
        var J = yi([b - 1, c + 3], [b - 1, G - 2], [d - 2 + x - D, G - 1], 6);
        u(S, J.concat([[d - 3 + x - D, G - 2], [d - 2 + x - D, G], [f + x, G + 1], [b + D, G], [b + 2 + D, G - 1], [b + 2 + D, G - 3], [b, c + 3]]), s.shade);
        Li(S, W, s.line);
        e.line(S, d, l + 3, d, l + 6, s.shade);
        e.line(S, d + 1, l + 7, d + 1, l + 10, s.shade);
        e.line(S, b, l + 4, b, l + 8, s.hi);
        e.line(S, d + 1, c + 4, d - 2 + x - D, G - 4, s.deep);
        e.line(S, f, c + 4, f + x, G - 5, s.hi);
        Ci(S, J, B);
        e.line(S, d - 2 + x - D, G, b + D, G, B.deep);
        e.fatLine(S, b - 1, l, b - 1, c - 1, 2, B.base);
        e.line(S, b - 2, l + 1, b - 2, c - 1, s.deep);
        e.dot(S, b, l + 1, B.hi);
        e.r(S, d, c, b - d + 1, 3, o.base);
        e.r(S, d, c, b - d + 1, 1, o.hi);
        e.r(S, d, c + 2, b - d + 1, 1, o.line);
        e.line(S, d, c + 1, b, c + 1, n.deep);
        as(S, b - 3, c, ["oo.", "oko", "oo."], g, !1);
        var M = a.p.sit ? 4 : 7;
        e.line(S, b - 2, c + 3, b - 1 + x, c + 2 + M, n.shade);
        e.dot(S, b - 1 + x, c + 3 + M, B.base);
      }
      else {
        var w = a.p.sit ? 6 : 4;
        var N = [[d + 3, l], [b - 3, l], [b - 1, l + 1], [b, l + 3], [b, l + 8], [b - 1 - H, c], [b - H, c + 3], [b + w + r, G - 3], [b + w - 1 + r, G - 1], [b + w - 3 + r, G], [f + 2 + r, G + 1], [f - 2 + r, G + 1], [d - w + 3 + r, G], [d - w + 1 + r, G - 1], [d - w + r, G - 3], [d + H, c + 3], [d + 1 + H, c], [d, l + 8], [d, l + 3], [d + 1, l + 1]];
        u(S, N, s.base);
        var p = yi(t ? [b - 2, c + 3] : [d + 2, c + 3], t ? [b - 1, G - 3] : [d + 1, G - 3], t ? [d - w + 3 + r, G - 1] : [b + w - 3 + r, G - 1], 6);
        var k = p.slice();
        if (t ? k.push([d - w + r, G - 3], [d + H, c + 3]) : k.push([b + w - 3 + r, G], [f - 2 + r, G + 1], [d - w + 3 + r, G], [d - w + r, G - 3], [d + H, c + 3]), u(S, k, s.shade), Li(S, N, s.line), e.line(S, d + 1, l + 3, d + 1, l + 8, s.shade), e.line(S, b - 1, l + 3, b - 1, l + 8, s.hi), e.line(S, b - 2, c + 4, b + w - 2 + r, G - 4, s.hi), e.line(S, d + 2, c + 5, d - w + 2 + r, G - 4, s.deep), e.line(S, f + (t ? -1 : 2), c + 4, f + (t ? -2 : 3) + r, G - 3, s.shade), Ci(S, p, B), e.line(S, d - w + 2 + r, G - 1, f - 2 + r, G, B.deep), e.line(S, f + 2 + r, G, b + w - 2 + r, G - 1, B.deep), t ? (e.r(S, f - 3, l, 6, 2, B.base), e.r(S, f - 2, l, 4, 1, B.hi), e.line(S, f - 3, l + 2, f + 2, l + 2, s.deep), as(S, f - 3, l + 3, mi, g, !1)) : (e.line(S, f - 2, l, f, l + 3, B.shade), e.fatLine(S, f + 2, l, d + 2, c - 1, 2, B.base), e.line(S, f + 3, l, d + 3, c - 1, B.hi), e.line(S, f + 4, l + 1, d + 4, c - 1, s.deep), as(S, d - w + 3 + r, G - 6, vi, g, !1)), e.r(S, d, c, b - d + 1, 3, o.base), e.r(S, d, c, b - d + 1, 1, o.hi), e.r(S, d, c + 2, b - d + 1, 1, o.line), e.line(S, d, c + 1, b, c + 1, n.deep), !t) {
          var m = f - 3;
          var v = a.p.sit ? 4 : 7;
          as(S, m, c, ki, g, !1);
          e.line(S, m + 3, c + 3, m + 2 - r, c + 2 + v, n.shade);
          e.line(S, m + 4, c + 3, m + 5 + r, c + 1 + v, n.base);
          e.dot(S, m + 2 - r, c + 3 + v, B.base);
          e.dot(S, m + 5 + r, c + 2 + v, B.shade);
        }
        if (!(a.arms[0].front || a.arms[0].over)) {
          pi(S, a, 0);
        }
      }
    } };
  Ki.huyet_anh_y = { sleeve: ji, under: function (S, e) {
      ai(S, e, e.material.pants, !1);
      if (!(e.arms[0].front || e.arms[0].over)) {
        ji(S, e, 0);
      }
    }, robe: function (S, a) {
      var s = a.material;
      var B = s.cloth;
      var o = s.trim;
      var n = s.accent;
      var i = s.ash;
      var O = a.torso;
      var t = a.g.side;
      var h = a.g.back;
      var r = GB(a);
      var d = a.p.sit ? 0 : r;
      var b = O.x - 1;
      var l = O.x + O.w;
      var f = O.y - 1;
      var c = O.x + (O.w >> 1);
      var G = O.y + 12;
      var H = G + 3;
      var g = a.p.sit ? 4 : 2;
      var x = a.g.female ? 1 : 0;
      var D = a.p.sit ? .6 : 1;
      var W = { k: o.line, R: n.base, H: n.hi, d: n.deep, a: i.line, h: i.hi };
      if (!t) {
        qi(S, b - g, G, h ? Yi : _i, d, 0, D, B, n);
        u(S, [[b + 1, f], [l - 1, f], [l, f + 2], [l - x, G], [l, H], [b, H], [b + x, G], [b, f + 2]], B.line);
        u(S, [[b + 2, f + 1], [l - 2, f + 1], [l - 1, f + 3], [l - 1 - x, G], [l - 1, H], [b + 1, H], [b + 1 + x, G], [b + 1, f + 3]], B.base);
        e.line(S, b + 1, f + 3, b + 1 + x, G - 1, B.shade);
        e.line(S, l - 2, f + 3, l - 2 - x, G - 1, B.hi);
        if (h) {
          as(S, c - 3, f + 3, Ai, W, !1);
        }
        else {
          e.line(S, c + 2, f + 1, b + 2, G - 1, o.base);
          e.line(S, c + 3, f + 1, b + 3, G - 1, o.hi);
          e.line(S, b + 2, G + 2, b + 1, G + 8, o.base);
        }
        e.r(S, c - 3, f - 1, 6, 2, o.line);
        e.r(S, c - 2, f - 1, 4, 1, o.base);
        e.dot(S, c + 1, f - 1, o.hi);
        e.r(S, b, G, l - b + 1, 2, o.hi);
        e.r(S, b, G + 1, l - b + 1, 1, o.base);
        e.r(S, b, G + 2, l - b + 1, 1, o.line);
        var J = h ? c - 4 : c + 2;
        var M = a.p.sit ? 5 : 9;
        e.fatLine(S, J, G + 2, J - 1 - d, G + 2 + M, 2, o.base);
        e.line(S, J + 1, G + 2, J - d, G + 2 + M, o.hi);
        e.line(S, J + 2, G + 2, J + 3 + d, G + M, o.deep);
        e.dot(S, J - 1 - d, G + 3 + M, n.shade);
        if (!(h)) {
          as(S, c - 2, G - 1, Qi, W, !1);
        }
        return void (a.arms[0].front || a.arms[0].over || ji(S, a, 0));
      }
      var w = HB(a);
      qi(S, b - 2 - (a.p.sit ? 2 : 0), G, Ei, w, -3, D, B, n);
      u(S, [[b + 1, f], [l, f], [l + 1, f + 3], [l, G], [l, H], [b, H], [b, G], [b, f + 3]], B.line);
      u(S, [[b + 2, f + 1], [l - 1, f + 1], [l, f + 3], [l - 1, G], [l - 1, H], [b + 1, H], [b + 1, G], [b + 1, f + 3]], B.base);
      e.line(S, b + 1, f + 3, b + 1, G - 1, B.shade);
      e.fatLine(S, l - 2, f + 1, l - 1, G - 1, 2, o.base);
      e.r(S, c - 1, f - 1, 5, 2, o.line);
      e.r(S, c, f - 1, 3, 1, o.base);
      e.r(S, b, G, l - b + 1, 2, o.hi);
      e.r(S, b, G + 1, l - b + 1, 1, o.base);
      e.r(S, b, G + 2, l - b + 1, 1, o.line);
      e.fatLine(S, b + 1, G + 2, b - 1 + w, G + (a.p.sit ? 7 : 11), 2, o.base);
      e.line(S, b + 1, G + 2, b - 1 + w, G + (a.p.sit ? 7 : 11), o.hi);
      as(S, l - 2, G - 1, Qi.map(function (S) {
        return S.slice(0, 3);
      }), W, !1);
    } };
  var Vi = { line: "#6a655f", deep: "#a29d96", shade: "#cbc6be", base: "#ebe9e3", hi: "#ffffff" };
  var Fi = [".WWK.", "WKWKK", "WWWKK", "WWKWK", ".WKK."];
  var Pi = ["..R..", ".LGL.", ".GHG.", ".LGL.", "LGGGL", "GHGGG", "GGGGG", "LGGGL", ".LLL."];
  function Ti(S, a, s) {
    var B = a.arms[s];
    var o = w(B);
    var n = h(B);
    var i = a.material.cloth;
    var O = a.material.trim;
    var t = a.material.accent;
    var r = n.x - o.x;
    var d = n.y - o.y;
    var b = Math.sqrt(r * r + d * d) || 1;
    var l = r / b;
    var f = d / b;
    var c = -f;
    var G = l;
    var H = 0 === s && !B.front;
    var g = a.g.side || a.g.back ? 3 : 4;
    var x = n.x - l * g;
    var D = n.y - f * g;
    u(S, [[o.x + 2 * c, o.y + 2 * G], [o.x - 2 * c, o.y - 2 * G], [x - 4 * c, D - 4 * G], [x + 4 * c, D + 4 * G]], H ? i.shade : i.base);
    u(S, [[o.x - 2 * c, o.y - 2 * G], [x - 4 * c, D - 4 * G], [x - 2 * c, D - 2 * G], [o.x - c, o.y - G]], i.deep);
    e.fatLine(S, o.x + 2 * l, o.y + 2 * f, Math.round(x - l), Math.round(D - f), 2, H ? i.shade : i.hi);
    e.line(S, Math.round(o.x + 5 * l), Math.round(o.y + 5 * f), Math.round(x - 2), Math.round(D - 2), i.shade);
    e.line(S, Math.round(x - 4 * c), Math.round(D - 4 * G), Math.round(x + 4 * c), Math.round(D + 4 * G), H ? i.shade : i.hi);
    e.line(S, Math.round(x - 3 * c - l), Math.round(D - 3 * G - f), Math.round(x + 3 * c - l), Math.round(D + 3 * G - f), O.base);
    e.dot(S, Math.round(x - 2 * l), Math.round(D - 2 * f), t.base);
  }
  function Zi(S, a, s, B, o) {
    e.r(S, a - 3, s - 5, 7, 4, "#1d2130");
    e.r(S, a - 3, s - 5, 7, 1, "#3a3f52");
    e.r(S, a - 3, s - 2, 7, 1, B.deep);
    e.r(S, a - 3, s - 1, 7, 1, B.base);
    e.r(S, a - 1, s - 5, 3, 3, B.base);
    e.dot(S, a, s - 4, "#10121a");
    e.r(S, a - 6, s - 2, 3, 1, B.base);
    e.dot(S, a - 7, s - 3, B.hi);
    if (!(o)) {
      e.r(S, a + 4, s - 2, 3, 1, B.base);
      e.dot(S, a + 7, s - 3, B.hi);
    }
  }
  function Ii(s, B) {
    for (var o = S.Palette.pick("SKIN", B.cfg.skin, "light"), n = B.torso, i = B.neck, O = 0; O < 2; O++) {
      var t = B.legs[O];
      M(s, t.x, t.y, t.w, t.h, o);
    }
    if (!(B.arms[0].front || B.arms[0].over)) {
      p(s, B.arms[0], o, !0);
    }
    if (B.g.female) {
      u(s, [[n.x + 1, n.y], [n.x + n.w - 2, n.y], [n.x + n.w - 1, n.y + 4], [n.x + n.w - 2, n.y + 10], [n.x + n.w, n.y + n.h], [n.x, n.y + n.h], [n.x + 1, n.y + 10], [n.x, n.y + 4]], o.base);
      e.line(s, n.x + 1, n.y + 3, n.x + 2, n.y + 10, o.shade);
      e.line(s, n.x + n.w - 2, n.y + 3, n.x + n.w - 3, n.y + 10, o.hi);
    }
    else {
      M(s, n.x, n.y, n.w, n.h, o);
    }
    M(s, n.x, n.y + n.h - 6, n.w, 6, G.pants);
    M(s, i.x, i.y, i.w, a.NECK_H + 1, o);
    (function (a, s) {
      var B = s.head;
      var o = s.g;
      var n = S.Palette.pick("SKIN", s.cfg.skin, "light");
      var i = B.x;
      var O = B.y;
      var t = B.w;
      var h = G.face;
      u(a, [[i + 2, O], [i + t - 3, O], [i + t, O + 5], [i + t - 1, O + 12], [i + t - 4, O + 16], [i + 3, O + 16], [i, O + 12], [i, O + 4]], n.base);
      e.r(a, i, O + 4, 1, 8, n.deep);
      e.r(a, i + 1, O + 6, 1, 7, n.shade);
      e.r(a, i + t - 2, O + 5, 1, 8, n.hi);
      e.r(a, i + 3, O + 15, t - 6, 1, n.shade);
      if (!(o.back)) {
        if (o.side) {
          e.r(a, i + t - 1, O + 9, 2, 3, n.base);
          e.dot(a, i + t, O + 9, n.hi);
          e.r(a, i + 3, O + 7, 3, 5, n.base);
          e.r(a, i + 5, O + 8, 1, 3, n.line);
          e.dot(a, i + 5, O + 11, n.line);
          e.r(a, i + 3, O + 7, 1, 5, n.shade);
          e.dot(a, i + 4, O + 9, n.deep);
          e.dot(a, i + 4, O + 10, n.shade);
          e.r(a, i + 4, O + 7, 2, 1, n.hi);
          e.dot(a, i + 4, O + 11, n.deep);
          e.r(a, i + 1, O + 11, 1, 4, n.shade);
        }
        else {
          e.dot(a, i + 6, O + 12, n.shade);
          e.dot(a, i + 7, O + 12, n.hi);
          e.dot(a, i + 2, O + 12, h.blush);
          e.dot(a, i + t - 3, O + 12, h.blush);
          e.r(a, i - 1, O + 9, 1, 3, n.shade);
          e.r(a, i + t, O + 9, 1, 3, n.base);
        }
      }
    })(s, B);
  }
  function $i(e, a) {
    var s = S.Palette.pick("SKIN", a.cfg.skin, "light");
    if ((a.arms[0].front || a.arms[0].over)) {
      p(e, a.arms[0], s, !0);
    }
    p(e, a.arms[1], s, !1);
  }
  var SO = { line: "#07080b", base: "#17191f", hi: "#30343d", seam: "#0b0c10" };
  function eO(a, s) {
    (function (a, s) {
      if (s.g.female) {
        !function (S, a) {
          var s = a.torso;
          var B = SO;
          var o = s.y + 3;
          var n = s.x - 1;
          var i = s.w + 2;
          if (a.g.back) {
            e.r(S, n, o + 1, i, 2, B.line);
            return void e.r(S, n + 1, o + 1, i - 2, 1, B.base);
          }
          if (e.r(S, n, o, i, 5, B.line), e.r(S, n + 1, o + 1, i - 2, 3, B.base), e.r(S, n + 1, o + 1, i - 2, 1, B.hi), !a.g.side) {
            var O = s.x + Math.floor(s.w / 2);
            e.r(S, O, o + 2, 1, 2, B.seam);
            e.r(S, O - 2, o - 2, 1, 2, B.line);
            e.r(S, O + 1, o - 2, 1, 2, B.line);
          }
        }(a, s);
      }
      else if (!s.g.side && !s.g.back) {
        var B = s.torso;
        var o = B.x + Math.floor(B.w / 2);
        var n = S.Palette.pick("SKIN", s.cfg.skin, "light");
        e.r(a, o - 3, B.y + 4, 2, 1, n.shade);
        e.r(a, o + 1, B.y + 4, 2, 1, n.shade);
        e.dot(a, o - 4, B.y + 6, n.shade);
        e.r(a, o - 3, B.y + 7, 2, 1, n.shade);
        e.dot(a, o + 3, B.y + 6, n.shade);
        e.r(a, o + 1, B.y + 7, 2, 1, n.shade);
      }
    })(a, s);
    (function (a, s) {
      var B = s.torso;
      var o = SO;
      var n = B.x - 1;
      var i = B.w + 2;
      var O = n + Math.floor(i / 2);
      var t = B.y + B.h - 4;
      var h = Math.min(s.legs[0].knee, s.legs[1].knee) - 2;
      var r = t + 7;
      if (h <= r) {
        h = r + 2;
      }
      var d = S.Palette.pick("SKIN", s.cfg.skin, "light");
      var b = B.y + B.h - 6;
      e.r(a, B.x, b, B.w, t - b, d.base);
      e.r(a, B.x, b, 1, t - b, d.line);
      e.r(a, B.x + 1, b, 1, t - b, d.shade);
      e.r(a, B.x + B.w - 1, b, 1, t - b, d.hi);
      u(a, [[n, t], [n + i, t], [n + i + 1, h - 1], [O + 2, h], [O + 1, r], [O, r - 1], [O - 1, r], [O - 2, h], [n - 1, h - 1]], o.line);
      e.r(a, n + 1, t + 1, i - 2, h - t - 2, o.base);
      e.r(a, n + 1, h - 3, Math.max(2, O - n - 3), 2, o.base);
      e.r(a, O + 2, h - 3, Math.max(2, n + i - O - 3), 2, o.base);
      e.r(a, n + 1, t, i - 2, 1, o.hi);
      e.r(a, n + 1, t + 2, 1, 5, o.hi);
      e.r(a, n + i - 2, t + 2, 1, 4, o.hi);
      e.r(a, n + 2, h - 2, Math.max(1, O - n - 4), 1, o.hi);
      e.r(a, O + 3, h - 2, Math.max(1, n + i - O - 5), 1, o.hi);
      e.r(a, O, r + 1, 1, Math.max(1, h - r - 2), o.seam);
      e.r(a, n + 1, t + 2, i - 2, 1, o.seam);
    })(a, s);
  }
  var aO = { ao_thon_lac: { stitch: "#9ba091" }, lu_hanh_moc: { stitch: "#b28b68" } };
  var sO = { line: "#30241e", deep: "#49362b", base: "#785638", hi: "#aa8353" };
  function BO(S) {
    return !(!S || !aO[S.outfit]);
  }
  function oO(S, a, s) {
    var B = a.material.cloth;
    var o = a.material.trim;
    var n = a.arms[s];
    var i = h(n);
    var O = n.x - 1;
    var t = n.y + 1;
    var r = n.w + 2;
    var d = i.y - 4;
    var b = d - t;
    if (!(b < 3)) {
      e.r(S, O, t, r, b + 2, B.line);
      e.r(S, O + 1, t + 1, r - 2, b, 0 === s ? B.deep : B.base);
      e.r(S, O + 1, t + 2, 1, Math.max(1, b - 2), 0 === s ? B.shade : B.hi);
      e.r(S, O, d, r, 2, o.deep);
      e.r(S, O + 1, d, r - 2, 1, o.base);
      e.dot(S, O + 1, d - 1, o.hi);
    }
  }
  function nO(s, B) {
    if ("toc_truong_y" !== B.cfg.outfit) {
      if ("quan_dui" !== B.cfg.outfit)
        if (BO(B.cfg)) {
          !function (S, a) {
            var s = a.material.pants;
            if (a.p.sit) {
              for (var B = a.torso.x + Math.floor(a.torso.w / 2), o = 0; o < 2; o++) {
                var n = a.legs[o];
                e.fatLine(S, n.x + 1, n.y, n.x + (o ? 3 : -2), n.knee, 5, s.shade);
                e.fatLine(S, n.x + (o ? 3 : -2), n.knee, B + (o ? -3 : 2), n.foot - 2, 5, s.base);
              }
            }
            else {
              !function (S, a) {
                for (var s = a.material.pants, B = 0; B < 2; B++) {
                  var o = a.legs[B];
                  var n = o.x - 1;
                  var i = o.y;
                  var O = o.w + 2;
                  var t = o.foot - 4;
                  var h = t - i;
                  if (!(h < 5)) {
                    e.r(S, n, i, O, h, s.line);
                    e.r(S, n + 1, i + 1, O - 2, h - 2, 0 === B ? s.deep : s.base);
                    e.r(S, n + 1, i + 4, 1, Math.max(1, h - 9), s.hi);
                    e.r(S, n + O - 2, i + 3, 1, Math.max(1, h - 8), s.shade);
                    e.r(S, n + 1, o.knee - 2, O - 2, 1, s.shade);
                    e.r(S, n, t - 2, O, 2, s.deep);
                    e.r(S, n + 1, t - 2, O - 2, 1, s.hi);
                  }
                }
              }(S, a);
            }
            if (!(a.arms[0].front || a.arms[0].over)) {
              oO(S, a, 0);
            }
          }(s, B);
        }
        else if ("long_tuong_y" !== B.cfg.outfit)
          if (Ki[B.cfg.outfit]) {
            Ki[B.cfg.outfit].under(Tn(s), B);
          }
          else if ("lan_thanh_y" !== B.cfg.outfit)
            if ("sat_luc_y" !== B.cfg.outfit)
              if ("tan_mo_y" !== B.cfg.outfit)
                if ("thanh_tam_y" !== B.cfg.outfit)
                  if ("thien_luan_kiem_y" !== B.cfg.outfit)
                    if ("tuyet_son_kiem_y" !== B.cfg.outfit)
                      if ("man_ho_tu_y" !== B.cfg.outfit)
                        if ("than_kiem_y" !== B.cfg.outfit)
                          if ("chi_ton_kiem_y" !== B.cfg.outfit)
                            if ("hoat_tu_y" !== B.cfg.outfit)
                              if ("nam_tu_y" !== B.cfg.outfit)
                                if ("hong_ty" !== B.cfg.outfit)
                                  if ("nam_y_bao" !== B.cfg.outfit)
                                    if ("vuong_lam_y" !== B.cfg.outfit)
                                      if ("huyen_cot_y" !== B.cfg.outfit) {
                                        var o = B.material.cloth;
                                        var n = B.material.trim;
                                        var i = B.material.pants;
                                        if ("bach_kim_an_dien_bao" !== B.cfg.outfit)
                                          if ("thanh_lam_dao_bao" !== B.cfg.outfit)
                                            if ("bach_nguyet_hong_lien" !== B.cfg.outfit)
                                              if ("van_lo_lao_ma_bao" !== B.cfg.outfit)
                                                if ("man_ho_tu_bao" !== B.cfg.outfit)
                                                  if ("ma_vuong_bao" !== B.cfg.outfit)
                                                    if ("xich_ma_y" !== B.cfg.outfit)
                                                      if ("dai_phu_bao" !== B.cfg.outfit)
                                                        if ("npc_long_bao" !== B.cfg.outfit)
                                                          if ("huan_su_bao" !== B.cfg.outfit)
                                                            if ("tho_ren_moi" !== B.cfg.outfit) {
                                                              if ("tang_kinh_bao" !== B.cfg.outfit || !$S(B)) {
                                                                for (var O = 0; O < 2; O++) {
                                                                  var t = B.legs[O];
                                                                  var h = t.knee;
                                                                  if (B.p.sit) {
                                                                    var r = B.legs[1 - O];
                                                                    var d = B.torso.x + Math.floor(B.torso.w / 2);
                                                                    e.fatLine(s, t.x + 1, t.y, t.x + (O ? 3 : -2), t.knee, 5, i.shade);
                                                                    e.fatLine(s, t.x + (O ? 3 : -2), t.knee, d + (O ? -3 : 2), t.foot - 2, 5, i.base);
                                                                    e.line(s, t.x + (O ? 3 : -2), t.knee - 1, d + (O ? -3 : 2), t.foot - 3, n.shade);
                                                                    e.r(s, Math.min(t.x, r.x) - 1, t.foot - 1, Math.abs(t.x - r.x) + t.w + 2, 1, i.line);
                                                                  }
                                                                  else {
                                                                    M(s, t.x, t.y, t.w, t.h, i);
                                                                    M(s, t.x, h, t.w, 4, n);
                                                                    e.line(s, t.x, h + 1, t.x + t.w - 1, h, n.hi);
                                                                    e.line(s, t.x, h + 4, t.x + t.w - 1, h + 3, n.line);
                                                                    e.r(s, t.x + (O ? 0 : t.w - 1), h + 5, 1, Math.max(1, t.foot - h - 9), i.line);
                                                                  }
                                                                }
                                                                if ("tho_ren" !== B.cfg.outfit) {
                                                                  var b = B.torso;
                                                                  var l = Math.max(B.legs[0].knee, B.legs[1].knee);
                                                                  u(s, [[b.x, b.y + b.h - 5], [b.x + b.w, b.y + b.h - 5], [b.x + b.w + 3, l + 2], [b.x - 3, l + 2]], o.deep);
                                                                  if (!(B.arms[0].front || B.arms[0].over)) {
                                                                    Xi(s, B, 0);
                                                                  }
                                                                }
                                                              }
                                                            }
                                                            else {
                                                              !function (S, a) {
                                                                if (!$S(a)) {
                                                                  for (var s = a.material.pants, B = a.torso, o = G.metal, n = 0; n < 2; n++) {
                                                                    var i = a.legs[n];
                                                                    if (a.p.sit) {
                                                                      e.fatLine(S, i.x + 1, i.y, i.x + (n ? 3 : -2), i.knee, 5, s.shade);
                                                                      e.fatLine(S, i.x + (n ? 3 : -2), i.knee, B.x + Math.floor(B.w / 2) + (n ? -3 : 2), i.foot - 2, 5, s.base);
                                                                    }
                                                                    else {
                                                                      M(S, i.x, i.y, i.w, i.h, s);
                                                                      M(S, i.x - 1, i.knee, i.w + 2, 6, G.leather);
                                                                      e.line(S, i.x - 1, i.knee, i.x + i.w, i.knee, o.shade);
                                                                      e.dot(S, i.x, i.knee + 2, o.base);
                                                                      e.dot(S, i.x + i.w - 1, i.knee + 3, o.shade);
                                                                      e.r(S, i.x + (n ? 0 : i.w - 1), i.knee + 7, 1, Math.max(1, i.foot - i.knee - 11), s.line);
                                                                    }
                                                                  }
                                                                  if (!(a.arms[0].front || a.arms[0].over)) {
                                                                    IS(S, a, 0);
                                                                  }
                                                                }
                                                              }(s, B);
                                                            }
                                                          else {
                                                            !function (S, a) {
                                                              for (var s = a.material.pants, B = a.torso, o = 0; o < 2; o++) {
                                                                var n = a.legs[o];
                                                                if (a.p.sit) {
                                                                  e.fatLine(S, n.x + 1, n.y, n.x + (o ? 3 : -2), n.knee, 5, s.shade);
                                                                  e.fatLine(S, n.x + (o ? 3 : -2), n.knee, B.x + Math.floor(B.w / 2) + (o ? -3 : 2), n.foot - 2, 5, s.base);
                                                                }
                                                                else {
                                                                  M(S, n.x, n.y, n.w, n.h, s);
                                                                  M(S, n.x, n.knee, n.w, 4, G.leather);
                                                                  e.line(S, n.x, n.knee + 1, n.x + n.w - 1, n.knee, G.leather.hi);
                                                                  e.r(S, n.x + (o ? 0 : n.w - 1), n.knee + 5, 1, Math.max(1, n.foot - n.knee - 9), s.line);
                                                                }
                                                              }
                                                              if (!(a.arms[0].front || a.arms[0].over)) {
                                                                PS(S, a, 0);
                                                              }
                                                            }(s, B);
                                                          }
                                                        else {
                                                          !function (S, a) {
                                                            for (var s = a.material.pants, B = a.torso, o = 0; o < 2; o++) {
                                                              var n = a.legs[o];
                                                              if (a.p.sit) {
                                                                e.fatLine(S, n.x + 1, n.y, n.x + (o ? 3 : -2), n.knee, 5, s.shade);
                                                                e.fatLine(S, n.x + (o ? 3 : -2), n.knee, B.x + Math.floor(B.w / 2) + (o ? -3 : 2), n.foot - 2, 5, s.base);
                                                              }
                                                              else {
                                                                M(S, n.x - 1, n.y, n.w + 2, n.h, s);
                                                                e.r(S, n.x - 1, Math.max(n.y, n.knee - 2), n.w + 2, 2, s.deep);
                                                                e.line(S, n.x, n.knee, n.x + n.w, n.knee, s.hi);
                                                                e.line(S, n.x + (o ? 0 : n.w), n.y + 5, n.x + (o ? 0 : n.w), n.foot - 5, s.line);
                                                              }
                                                            }
                                                            if (!a.p.sit) {
                                                              var i = Math.min(54, Math.max(a.legs[0].knee, a.legs[1].knee) + 3);
                                                              e.r(S, B.x - 2, B.y + B.h - 3, B.w + 4, 2, s.deep);
                                                              e.line(S, B.x - 1, B.y + B.h - 1, B.x - 2, i, s.shade);
                                                              e.line(S, B.x + B.w + 1, B.y + B.h - 1, B.x + B.w + 2, i, s.hi);
                                                            }
                                                            if (!(a.arms[0].front || a.arms[0].over)) {
                                                              RS(S, a, 0);
                                                            }
                                                          }(s, B);
                                                        }
                                                      else {
                                                        !function (S, a) {
                                                          for (var s = a.material.pants, B = a.material.cloth, o = a.torso, n = 0; n < 2; n++) {
                                                            var i = a.legs[n];
                                                            if (a.p.sit) {
                                                              e.fatLine(S, i.x + 1, i.y, i.x + (n ? 3 : -2), i.knee, 5, B.shade);
                                                              e.fatLine(S, i.x + (n ? 3 : -2), i.knee, o.x + Math.floor(o.w / 2) + (n ? -3 : 2), i.foot - 2, 5, B.base);
                                                            }
                                                            else {
                                                              M(S, i.x, i.y, i.w, i.h, s);
                                                            }
                                                          }
                                                          if (!(a.arms[0].front || a.arms[0].over)) {
                                                            Ti(S, a, 0);
                                                          }
                                                        }(s, B);
                                                      }
                                                    else {
                                                      !function (a, s) {
                                                        for (var B = g.xich_ma_y, o = B.rock, n = B.lava, i = B.cloth, O = s.torso, t = 0; t < 2; t++) {
                                                          var h = s.legs[t];
                                                          if (s.p.sit) {
                                                            var r = O.x + Math.floor(O.w / 2);
                                                            e.fatLine(a, h.x + (t ? 3 : -2), h.knee, r + (t ? -3 : 2), h.foot - 2, 4, o.base);
                                                            e.line(a, h.x + (t ? 3 : -2), h.knee - 1, r + (t ? -3 : 2), h.foot - 3, o.hi);
                                                          }
                                                          else {
                                                            var d = h.x - 1;
                                                            var b = h.w + 2;
                                                            var l = h.knee - 1;
                                                            var f = Math.min(h.foot - 6, l + 6);
                                                            M(a, d, h.y + 1, b, l - h.y, S.Palette.pick("SKIN", s.cfg.skin, "light"));
                                                            e.r(a, d, l, b, f - l + 1, o.line);
                                                            e.r(a, d + 1, l + 1, b - 2, f - l - 1, o.base);
                                                            e.r(a, d + 1, l + 1, 1, f - l - 1, o.hi);
                                                            e.r(a, d + b - 2, l + 2, 1, f - l - 2, o.shade);
                                                            e.r(a, d, l, b, 2, o.deep);
                                                            e.r(a, d + 1, l, b - 2, 1, o.hi);
                                                            e.dot(a, d + Math.floor(b / 2), l - 1, o.hi);
                                                            e.dot(a, h.x + 1, l + 3, n.base);
                                                            e.dot(a, h.x + 2, l + 4, n.deep);
                                                            e.r(a, h.x, h.foot - 5, h.w, 1, i.deep);
                                                            e.r(a, h.x, h.foot - 4, h.w, 1, i.base);
                                                          }
                                                        }
                                                        if (!(s.arms[0].front || s.arms[0].over)) {
                                                          vO(a, s, 0);
                                                        }
                                                      }(s, B);
                                                    }
                                                  else {
                                                    !function (S, a) {
                                                      for (var s = a.material, B = s.pants, o = s.trim, n = s.accent, i = a.torso, O = 0; O < 2; O++) {
                                                        var t = a.legs[O];
                                                        if (a.p.sit) {
                                                          var h = i.x + Math.floor(i.w / 2);
                                                          e.fatLine(S, t.x + 1, t.y, t.x + (O ? 3 : -2), t.knee, 6, B.shade);
                                                          e.fatLine(S, t.x + (O ? 3 : -2), t.knee, h + (O ? -3 : 2), t.foot - 2, 5, B.base);
                                                          e.line(S, t.x + (O ? 3 : -2), t.knee - 1, h + (O ? -3 : 2), t.foot - 3, B.hi);
                                                        }
                                                        else {
                                                          var r = t.x - 1;
                                                          var d = t.w + 2;
                                                          var b = t.foot - 1;
                                                          e.r(S, r, t.y, d, b - t.y, B.line);
                                                          e.r(S, r + 1, t.y, d - 2, b - t.y - 1, B.base);
                                                          e.r(S, r + 1, t.y, 1, b - t.y - 1, B.shade);
                                                          e.r(S, r + d - 2, t.y + 1, 1, b - t.y - 2, B.hi);
                                                          e.r(S, r + 2, t.y + 2, 1, Math.max(1, t.knee - t.y - 4), B.deep);
                                                          var l = Math.max(t.y, t.knee - 2);
                                                          e.r(S, r, l, d, 2, o.deep);
                                                          e.r(S, r + 1, l, d - 2, 1, o.base);
                                                          e.dot(S, r + 1, l, o.hi);
                                                          e.dot(S, r + Math.floor(d / 2), l + 1, n.base);
                                                          e.line(S, r + 1, t.foot - 8, r + d - 2, t.foot - 7, B.deep);
                                                        }
                                                      }
                                                      if (!a.p.sit) {
                                                        var f = Math.min(53, Math.max(a.legs[0].knee, a.legs[1].knee) + 2);
                                                        u(S, [[i.x + 2, i.y + i.h - 3], [i.x + i.w - 2, i.y + i.h - 3], [i.x + i.w + 2, f], [i.x - 2, f]], B.base);
                                                        e.line(S, i.x + 3, i.y + i.h - 1, i.x, f - 1, B.shade);
                                                        e.line(S, i.x + i.w - 3, i.y + i.h - 1, i.x + i.w + 1, f - 1, B.hi);
                                                        e.r(S, i.x - 1, i.y + i.h - 3, i.w + 2, 2, B.deep);
                                                      }
                                                      if (!(a.arms[0].front || a.arms[0].over)) {
                                                        mS(S, a, 0);
                                                      }
                                                    }(s, B);
                                                  }
                                                else {
                                                  !function (S, a) {
                                                    var s = a.material;
                                                    var B = s.pants;
                                                    var o = s.trim;
                                                    var n = a.torso;
                                                    if (a.p.sit) {
                                                      u(S, [[n.x - 1, n.y + n.h - 6], [n.x + n.w, n.y + n.h - 6], [n.x + n.w + 3, 60], [n.x - 4, 60]], B.deep);
                                                    }
                                                    for (var i = 0; i < 2; i++) {
                                                      var O = a.legs[i];
                                                      if (a.p.sit) {
                                                        var t = n.x + Math.floor(n.w / 2);
                                                        e.fatLine(S, O.x + 1, O.y, O.x + (i ? 3 : -2), O.knee, 6, B.shade);
                                                        e.fatLine(S, O.x + (i ? 3 : -2), O.knee, t + (i ? -3 : 2), O.foot - 2, 5, B.base);
                                                        e.line(S, O.x + (i ? 3 : -2), O.knee - 1, t + (i ? -3 : 2), O.foot - 3, B.hi);
                                                      }
                                                      else {
                                                        var h = O.x - 1;
                                                        var r = O.w + 2;
                                                        e.r(S, h, O.y, r, O.h, B.line);
                                                        e.r(S, h + 1, O.y, r - 2, O.h - 1, B.base);
                                                        e.r(S, h + 1, O.y, 1, O.h - 1, B.shade);
                                                        e.r(S, h + r - 2, O.y + 1, 1, O.h - 2, B.hi);
                                                        var d = Math.max(O.y, O.knee - 1);
                                                        e.r(S, h, d, r, 3, o.line);
                                                        e.r(S, h + 1, d, r - 2, 2, o.base);
                                                        e.r(S, h + 1, d, r - 2, 1, o.hi);
                                                        e.dot(S, h + (i ? r - 2 : 1), d + 1, o.deep);
                                                        e.line(S, h + 1, O.foot - 7, h + r - 2, O.foot - 6, B.deep);
                                                      }
                                                    }
                                                    if (!(a.p.sit)) {
                                                      u(S, [[n.x + 1, n.y + n.h - 4], [n.x + n.w - 2, n.y + n.h - 4], [n.x + n.w + 2, n.y + n.h + 12], [n.x - 2, n.y + n.h + 12]], B.base);
                                                      e.line(S, n.x + Math.floor(n.w / 2), n.y + n.h - 2, n.x + Math.floor(n.w / 2), n.y + n.h + 11, B.line);
                                                    }
                                                    if (!(a.arms[0].front || a.arms[0].over)) {
                                                      gS(S, a, 0);
                                                    }
                                                  }(s, B);
                                                }
                                              else {
                                                !function (S, a) {
                                                  for (var s = a.material.pants, B = a.material.cloth, o = a.material.trim, n = a.torso, i = 0; i < 2; i++) {
                                                    var O = a.legs[i];
                                                    if (a.p.sit) {
                                                      e.fatLine(S, O.x + 1, O.y, O.x + (i ? 3 : -2), O.knee, 5, s.shade);
                                                      e.fatLine(S, O.x + (i ? 3 : -2), O.knee, n.x + Math.floor(n.w / 2) + (i ? -3 : 2), O.foot - 2, 5, s.base);
                                                    }
                                                    else {
                                                      M(S, O.x, O.y, O.w, O.h, s);
                                                    }
                                                    var t = Math.max(O.y, O.foot - 4);
                                                    e.line(S, O.x, t, O.x + O.w - 1, t, o.base);
                                                    e.r(S, O.x, t + 1, O.w, 1, B.shade);
                                                  }
                                                  var h = Math.max(a.legs[0].knee, a.legs[1].knee) + 2;
                                                  if (!(a.p.sit)) {
                                                    u(S, [[n.x + 2, n.y + n.h - 3], [n.x + n.w - 2, n.y + n.h - 3], [n.x + n.w + 2, h], [n.x - 2, h]], B.base);
                                                    e.line(S, n.x + 3, n.y + n.h - 1, n.x + 1, h - 1, B.shade);
                                                    e.line(S, n.x + n.w - 3, n.y + n.h - 1, n.x + n.w + 1, h - 1, B.hi);
                                                    e.line(S, n.x + 4, h - 2, n.x + n.w - 4, h - 2, B.deep);
                                                  }
                                                  if (!(a.arms[0].front || a.arms[0].over)) {
                                                    nS(S, a, 0);
                                                  }
                                                }(s, B);
                                              }
                                            else {
                                              !function (S, a) {
                                                for (var s = a.material, B = s.pants, o = s.cloth, n = a.torso, i = 0; i < 2; i++) {
                                                  var O = a.legs[i];
                                                  if (a.p.sit) {
                                                    e.fatLine(S, O.x + 1, O.y, O.x + (i ? 3 : -2), O.knee, 5, o.shade);
                                                    e.fatLine(S, O.x + (i ? 3 : -2), O.knee, n.x + Math.floor(n.w / 2) + (i ? -3 : 2), O.foot - 2, 5, o.base);
                                                  }
                                                  else {
                                                    M(S, O.x, O.y, O.w, O.h, B);
                                                  }
                                                }
                                                if (a.g.side && !a.p.sit) {
                                                  var t = V(a);
                                                  var h = HB(a);
                                                  as(S, n.x - 3, n.y + 13, T, t, !1, xB(2 * h, 4, 14));
                                                }
                                                if (!(a.arms[0].front || a.arms[0].over)) {
                                                  BS(S, a, 0);
                                                }
                                              }(s, B);
                                            }
                                          else {
                                            !function (S, a) {
                                              for (var s = a.material, B = s.pants, o = s.cloth, n = a.torso, i = 0; i < 2; i++) {
                                                var O = a.legs[i];
                                                if (a.p.sit) {
                                                  e.fatLine(S, O.x + 1, O.y, O.x + (i ? 3 : -2), O.knee, 5, o.deep);
                                                  e.fatLine(S, O.x + (i ? 3 : -2), O.knee, n.x + Math.floor(n.w / 2) + (i ? -3 : 2), O.foot - 2, 5, o.shade);
                                                }
                                                else {
                                                  M(S, O.x, O.y, O.w, O.h, B);
                                                }
                                              }
                                              if (!(a.arms[0].front || a.arms[0].over)) {
                                                z(S, a, 0);
                                              }
                                            }(s, B);
                                          }
                                        else {
                                          !function (S, a) {
                                            for (var s = a.material, B = s.pants, o = s.cloth, n = a.torso, i = 0; i < 2; i++) {
                                              var O = a.legs[i];
                                              if (a.p.sit) {
                                                e.fatLine(S, O.x + 1, O.y, O.x + (i ? 3 : -2), O.knee, 5, o.deep);
                                                e.fatLine(S, O.x + (i ? 3 : -2), O.knee, n.x + Math.floor(n.w / 2) + (i ? -3 : 2), O.foot - 2, 5, o.shade);
                                              }
                                              else {
                                                M(S, O.x, O.y, O.w, O.h, B);
                                              }
                                            }
                                            if (!(a.arms[0].front || a.arms[0].over)) {
                                              XS(S, a, 0);
                                            }
                                          }(s, B);
                                        }
                                      }
                                      else {
                                        !function (S, a) {
                                          var s = a.material.pants;
                                          var B = a.torso;
                                          if (a.p.sit) {
                                            u(S, [[B.x - 1, B.y + B.h - 6], [B.x + B.w, B.y + B.h - 6], [B.x + B.w + 2, 60], [B.x - 3, 60]], s.deep);
                                          }
                                          for (var o = 0; o < 2; o++) {
                                            var n = a.legs[o];
                                            if (a.p.sit) {
                                              e.fatLine(S, n.x + 1, n.y, n.x + (o ? 3 : -2), n.knee, 5, s.shade);
                                              e.fatLine(S, n.x + (o ? 3 : -2), n.knee, B.x + Math.floor(B.w / 2) + (o ? -3 : 2), n.foot - 2, 5, s.base);
                                              e.line(S, n.x + (o ? 3 : -2), n.knee - 1, B.x + Math.floor(B.w / 2) + (o ? -3 : 2), n.foot - 3, s.hi);
                                            }
                                            else {
                                              M(S, n.x, n.y, n.w, n.h, s);
                                            }
                                          }
                                          if (!(a.p.sit)) {
                                            e.r(S, B.x + 1, B.y + B.h - 5, B.w - 2, 6, s.base);
                                            e.r(S, B.x + 1, B.y + B.h - 5, 1, 6, s.shade);
                                            e.r(S, B.x + B.w - 2, B.y + B.h - 5, 1, 6, s.deep);
                                            e.line(S, B.x + Math.floor(B.w / 2), B.y + B.h - 2, B.x + Math.floor(B.w / 2), B.y + B.h, s.line);
                                          }
                                          if (!(a.arms[0].front || a.arms[0].over)) {
                                            Re(S, a, 0);
                                          }
                                        }(s, B);
                                      }
                                    else {
                                      !function (S, a) {
                                        for (var s = a.material.pants, B = a.torso, o = 0; o < 2; o++) {
                                          var n = a.legs[o];
                                          if (a.p.sit) {
                                            e.fatLine(S, n.x + 1, n.y, n.x + (o ? 3 : -2), n.knee, 5, s.shade);
                                            e.fatLine(S, n.x + (o ? 3 : -2), n.knee, B.x + Math.floor(B.w / 2) + (o ? -3 : 2), n.foot - 2, 5, s.base);
                                          }
                                          else {
                                            M(S, n.x, n.y, n.w, n.h, s);
                                          }
                                        }
                                        if (!(a.arms[0].front || a.arms[0].over)) {
                                          Fe(S, a, 0);
                                        }
                                      }(s, B);
                                    }
                                  else {
                                    !function (S, a) {
                                      for (var s = a.material.pants, B = a.torso, o = B.x + Math.floor(B.w / 2), n = 0; n < 2; n++) {
                                        var i = a.legs[n];
                                        if (a.p.sit) {
                                          e.fatLine(S, i.x + 1, i.y, i.x + (n ? 3 : -2), i.knee, 5, s.shade);
                                          e.fatLine(S, i.x + (n ? 3 : -2), i.knee, o + (n ? -3 : 2), i.foot - 2, 5, s.base);
                                        }
                                        else {
                                          M(S, i.x - 1, i.y, i.w + 2, i.h, s);
                                          e.r(S, i.x - 1, i.knee - 2, i.w + 2, 3, s.deep);
                                          e.line(S, i.x - 1, i.knee - 2, i.x + i.w, i.knee - 2, s.hi);
                                        }
                                      }
                                      if (!a.p.sit) {
                                        var O = Math.min(56, Math.max(a.legs[0].knee, a.legs[1].knee) + 4);
                                        u(S, [[B.x + 3, B.y + B.h - 3], [B.x + B.w - 3, B.y + B.h - 3], [B.x + B.w + 2, O], [B.x - 2, O]], s.base);
                                        e.line(S, B.x + 3, B.y + B.h - 1, B.x + 1, O - 1, s.shade);
                                        e.line(S, B.x + B.w - 3, B.y + B.h - 1, B.x + B.w + 1, O - 1, s.hi);
                                        e.line(S, o, B.y + B.h - 1, o, O - 1, s.line);
                                        e.r(S, o - 2, B.y + 8, 5, Math.max(5, O - B.y - 8), "#eef2ef");
                                        e.line(S, o - 2, B.y + 9, o - 2, O - 2, "#b9cbd3");
                                        e.line(S, o + 2, B.y + 9, o + 2, O - 2, "#ffffff");
                                      }
                                      if (!(a.arms[0].front || a.arms[0].over)) {
                                        Pe(S, a, 0);
                                      }
                                    }(s, B);
                                  }
                                else {
                                  !function (S, a) {
                                    if (!$S(a)) {
                                      for (var s = { line: "#17120f", deep: "#282019", shade: "#4a3525", base: "#624731", hi: "#806047" }, B = a.torso, o = 0; o < 2; o++) {
                                        var n = a.legs[o];
                                        if (a.p.sit) {
                                          e.fatLine(S, n.x + 1, n.y, n.x + (o ? 3 : -2), n.knee, 5, s.deep);
                                          e.fatLine(S, n.x + (o ? 3 : -2), n.knee, B.x + Math.floor(B.w / 2) + (o ? -3 : 2), n.foot - 2, 5, s.base);
                                        }
                                        else {
                                          M(S, n.x, n.y, n.w, n.h, s);
                                        }
                                      }
                                      if (!(a.arms[0].front || a.arms[0].over)) {
                                        Ui(S, a, 0);
                                      }
                                    }
                                  }(s, B);
                                }
                              else {
                                !function (S, a) {
                                  var s = a.material.pants;
                                  var B = a.torso;
                                  if (a.p.sit) {
                                    u(S, [[B.x - 1, B.y + B.h - 6], [B.x + B.w, B.y + B.h - 6], [B.x + B.w + 2, 60], [B.x - 3, 60]], s.deep);
                                  }
                                  for (var o = 0; o < 2; o++) {
                                    var n = a.legs[o];
                                    if (a.p.sit) {
                                      e.fatLine(S, n.x + 1, n.y, n.x + (o ? 3 : -2), n.knee, 5, s.shade);
                                      e.fatLine(S, n.x + (o ? 3 : -2), n.knee, B.x + Math.floor(B.w / 2) + (o ? -3 : 2), n.foot - 2, 5, s.base);
                                    }
                                    else {
                                      M(S, n.x, n.y, n.w, n.h, s);
                                    }
                                  }
                                  if (!(a.arms[0].front || a.arms[0].over)) {
                                    na(S, a, 0);
                                  }
                                }(s, B);
                              }
                            else {
                              !function (S, a) {
                                for (var s = a.material.pants, B = a.torso, o = 0; o < 2; o++) {
                                  var n = a.legs[o];
                                  if (a.p.sit) {
                                    e.fatLine(S, n.x + 1, n.y, n.x + (o ? 3 : -2), n.knee, 5, s.shade);
                                    e.fatLine(S, n.x + (o ? 3 : -2), n.knee, B.x + Math.floor(B.w / 2) + (o ? -3 : 2), n.foot - 2, 5, s.base);
                                  }
                                  else {
                                    M(S, n.x, n.y, n.w, n.h, s);
                                  }
                                }
                                if (!(a.arms[0].front || a.arms[0].over)) {
                                  Oa(S, a, 0);
                                }
                              }(s, B);
                            }
                          else {
                            !function (S, a) {
                              var s = a.material.pants;
                              var B = a.torso;
                              if (a.p.sit) {
                                u(S, [[B.x - 1, B.y + B.h - 6], [B.x + B.w, B.y + B.h - 6], [B.x + B.w + 2, 60], [B.x - 3, 60]], s.deep);
                              }
                              for (var o = 0; o < 2; o++) {
                                var n = a.legs[o];
                                if (a.p.sit) {
                                  e.fatLine(S, n.x + 1, n.y, n.x + (o ? 3 : -2), n.knee, 5, s.shade);
                                  e.fatLine(S, n.x + (o ? 3 : -2), n.knee, B.x + Math.floor(B.w / 2) + (o ? -3 : 2), n.foot - 2, 5, s.base);
                                }
                                else {
                                  M(S, n.x, n.y, n.w, n.h, s);
                                }
                              }
                              if (!(a.arms[0].front || a.arms[0].over)) {
                                Da(S, a, 0);
                              }
                            }(s, B);
                          }
                        else {
                          !function (a, s) {
                            var B = s.material;
                            var o = B.pants;
                            var n = s.torso;
                            var i = eB(B, S.Palette.pick("SKIN", s.cfg.skin, "light"));
                            var O = GB(s);
                            if (s.g.side) {
                              as(a, n.x - 8, n.y - 1, gB(s, iB, n.y - 1), i, !1, xB(HB(s), 19, 14));
                            }
                            else {
                              var t = gB(s, oB, n.y + 1);
                              as(a, n.x - 8, n.y + 1, t, i, !1, xB(O, 12, 16));
                              as(a, n.x + n.w + 7, n.y + 1, t, i, !0, xB(O, 12, 16));
                            }
                            for (var h = 0; h < 2; h++) {
                              var r = s.legs[h];
                              if (s.p.sit) {
                                e.fatLine(a, r.x + 1, r.y, r.x + (h ? 3 : -2), r.knee, 6, o.shade);
                                e.fatLine(a, r.x + (h ? 3 : -2), r.knee, n.x + Math.floor(n.w / 2) + (h ? -3 : 2), r.foot - 2, 5, o.base);
                                e.line(a, r.x + (h ? 3 : -2), r.knee - 1, n.x + Math.floor(n.w / 2) + (h ? -3 : 2), r.foot - 3, o.hi);
                              }
                              else {
                                var d = r.x - 1;
                                var b = r.w + 2;
                                var l = r.y;
                                var f = r.knee;
                                var c = r.foot - 7;
                                e.r(a, d, l, b, r.foot - l - 6, o.line);
                                e.r(a, d + 1, l, b - 2, r.foot - l - 7, o.base);
                                e.r(a, d + 1, l, 1, r.foot - l - 7, o.shade);
                                e.r(a, d + b - 2, l + 1, 1, r.foot - l - 8, o.hi);
                                e.line(a, d + 2, f, d + 2, f + 3, o.deep);
                                var G = s.g.side ? HB(s) : O;
                                if (G) {
                                  var H = G > 0 ? d + b : d - 1;
                                  e.r(a, H, f + 1, 1, c - f, o.line);
                                  e.r(a, G > 0 ? d + b - 1 : d, f + 1, 1, c - f - 1, G > 0 ? o.hi : o.shade);
                                }
                              }
                            }
                            if (!(s.arms[0].front || s.arms[0].over)) {
                              DB(a, s, 0);
                            }
                          }(s, B);
                        }
                      else {
                        !function (S, a) {
                          for (var s = a.material.pants, B = a.torso, o = 0; o < 2; o++) {
                            var n = a.legs[o];
                            if (a.p.sit) {
                              e.fatLine(S, n.x + 1, n.y, n.x + (o ? 3 : -2), n.knee, 5, s.shade);
                              e.fatLine(S, n.x + (o ? 3 : -2), n.knee, B.x + Math.floor(B.w / 2) + (o ? -3 : 2), n.foot - 2, 5, s.base);
                            }
                            else {
                              M(S, n.x, n.y, n.w, n.h, s);
                            }
                          }
                          if (!(a.arms[0].front || a.arms[0].over)) {
                            Rs(S, a, 0);
                          }
                        }(s, B);
                      }
                    else {
                      !function (S, a) {
                        for (var s = a.material.pants, B = a.torso, o = 0; o < 2; o++) {
                          var n = a.legs[o];
                          if (a.p.sit) {
                            e.fatLine(S, n.x + 1, n.y, n.x + (o ? 3 : -2), n.knee, 5, s.shade);
                            e.fatLine(S, n.x + (o ? 3 : -2), n.knee, B.x + Math.floor(B.w / 2) + (o ? -3 : 2), n.foot - 2, 5, s.base);
                            e.line(S, n.x + (o ? 3 : -2), n.knee - 1, B.x + Math.floor(B.w / 2) + (o ? -3 : 2), n.foot - 3, s.hi);
                          }
                          else {
                            M(S, n.x, n.y, n.w, n.h, s);
                          }
                        }
                        if (!(a.arms[0].front || a.arms[0].over)) {
                          Ws(S, a, 0);
                        }
                      }(s, B);
                    }
                  else {
                    !function (S, a) {
                      var s = a.material.pants;
                      var B = a.torso;
                      if (a.p.sit) {
                        u(S, [[B.x - 1, B.y + B.h - 6], [B.x + B.w, B.y + B.h - 6], [B.x + B.w + 2, 60], [B.x - 3, 60]], s.deep);
                      }
                      for (var o = 0; o < 2; o++) {
                        var n = a.legs[o];
                        if (a.p.sit) {
                          e.fatLine(S, n.x + 1, n.y, n.x + (o ? 3 : -2), n.knee, 5, s.shade);
                          e.fatLine(S, n.x + (o ? 3 : -2), n.knee, B.x + Math.floor(B.w / 2) + (o ? -3 : 2), n.foot - 2, 5, s.base);
                        }
                        else {
                          M(S, n.x, n.y, n.w, n.h, s);
                        }
                      }
                      if (!(a.arms[0].front || a.arms[0].over)) {
                        za(S, a, 0);
                      }
                    }(s, B);
                  }
                else {
                  !function (S, a) {
                    var s = a.material.pants;
                    var B = a.torso;
                    var o = On(a);
                    var n = GB(a);
                    if (a.g.side) {
                      as(S, B.x - 8, B.y - 1, gB(a, xn, B.y - 1), o, !1, xB(HB(a), 15, 14));
                    }
                    else {
                      var i = gB(a, a.g.back ? bn : dn, B.y + 1);
                      as(S, B.x - 8, B.y + 1, i, o, !1, xB(n, 12, 16));
                      as(S, B.x + B.w + 7, B.y + 1, i, o, !0, xB(n, 12, 16));
                    }
                    for (var O = 0; O < 2; O++) {
                      var t = a.legs[O];
                      if (a.p.sit) {
                        e.fatLine(S, t.x + 1, t.y, t.x + (O ? 3 : -2), t.knee, 6, s.shade);
                        e.fatLine(S, t.x + (O ? 3 : -2), t.knee, B.x + Math.floor(B.w / 2) + (O ? -3 : 2), t.foot - 2, 5, s.base);
                        e.line(S, t.x + (O ? 3 : -2), t.knee - 1, B.x + Math.floor(B.w / 2) + (O ? -3 : 2), t.foot - 3, s.hi);
                      }
                      else {
                        var h = t.x - 1;
                        var r = t.w + 2;
                        var d = t.y;
                        e.r(S, h, d, r, t.foot - d - 6, s.line);
                        e.r(S, h + 1, d, r - 2, t.foot - d - 7, s.base);
                        e.r(S, h + 1, d, 1, t.foot - d - 7, s.shade);
                        e.r(S, h + r - 2, d + 1, 1, t.foot - d - 8, s.hi);
                      }
                    }
                    if (!(a.arms[0].front || a.arms[0].over)) {
                      Mn(S, a, 0);
                    }
                  }(s, B);
                }
              else {
                !function (S, s) {
                  var B = s.material.pants;
                  var o = s.torso;
                  var n = Jo(s);
                  if (!(s.g.side || s.g.back)) {
                    (function (S, s, B) {
                      if (Eo(s) && !s.g.side && !s.g.back) {
                        var o = s.g.arms[0].x - 4;
                        var n = a.ARM_Y - 9 + s.dy;
                        QO(S, o, n, Qo, B, !1);
                        e.line(S, o, n + 1, o - 1, n + 7, B.f);
                        e.dot(S, o - 1, n + 8, B.o);
                      }
                    })(S, s, n);
                  }
                  for (var i = 0; i < 2; i++) {
                    var O = s.legs[i];
                    if (s.p.sit) {
                      e.fatLine(S, O.x + 1, O.y, O.x + (i ? 3 : -2), O.knee, 6, B.shade);
                      e.fatLine(S, O.x + (i ? 3 : -2), O.knee, o.x + Math.floor(o.w / 2) + (i ? -3 : 2), O.foot - 2, 5, B.base);
                      e.line(S, O.x + (i ? 3 : -2), O.knee - 1, o.x + Math.floor(o.w / 2) + (i ? -3 : 2), O.foot - 3, B.hi);
                    }
                    else {
                      var t = O.x - 1;
                      var h = O.w + 2;
                      var r = O.y;
                      e.r(S, t, r, h, O.foot - r - 6, B.line);
                      e.r(S, t + 1, r, h - 2, O.foot - r - 7, B.base);
                      e.r(S, t + 1, r, 1, O.foot - r - 7, B.shade);
                      e.r(S, t + h - 2, r + 1, 1, O.foot - r - 8, B.hi);
                    }
                  }
                  if (s.g.side) {
                    var d = s.legs[0];
                    var b = s.p.sit ? -2 : d.x - s.g.legs[0].x;
                    var l = s.p.sit ? 57 : Math.min(56, d.foot - 5);
                    xs(S, o.x - 6 + b, o.y + o.h - 2, l, QB(s) ? Co : Lo, 8, n, xB(HB(s), 6, 10));
                  }
                  var f = s.arms[0];
                  if (!(f.front || f.over)) {
                    Yo(S, s, 0);
                  }
                }(s, B);
              }
            else {
              !function (S, a) {
                var s = a.material.pants;
                var B = a.torso;
                var o = AB(a);
                if (!(a.g.side || a.g.back)) {
                  fo(S, a, o);
                }
                for (var n = 0; n < 2; n++) {
                  var i = a.legs[n];
                  if (a.p.sit) {
                    e.fatLine(S, i.x + 1, i.y, i.x + (n ? 3 : -2), i.knee, 6, s.shade);
                    e.fatLine(S, i.x + (n ? 3 : -2), i.knee, B.x + Math.floor(B.w / 2) + (n ? -3 : 2), i.foot - 2, 5, s.base);
                    e.line(S, i.x + (n ? 3 : -2), i.knee - 1, B.x + Math.floor(B.w / 2) + (n ? -3 : 2), i.foot - 3, s.hi);
                  }
                  else {
                    var O = i.x - 1;
                    var t = i.w + 2;
                    var h = i.y;
                    e.r(S, O, h, t, i.foot - h - 6, s.line);
                    e.r(S, O + 1, h, t - 2, i.foot - h - 7, s.base);
                    e.r(S, O + 1, h, 1, i.foot - h - 7, s.shade);
                    e.r(S, O + t - 2, h + 1, 1, i.foot - h - 8, s.hi);
                    e.line(S, O + 2, i.knee, O + 2, i.knee + 3, s.deep);
                  }
                }
                if (a.g.side) {
                  var r = a.legs[0];
                  var d = a.p.sit ? -2 : r.x - a.g.legs[0].x;
                  var b = a.p.sit ? 57 : Math.min(57, r.foot - 4);
                  xs(S, B.x - 6 + d, B.y + B.h - 2, b, TB, 8, o, xB(HB(a), 6, 10));
                }
                var l = a.arms[0];
                if (!(l.front || l.over)) {
                  lo(S, a, 0);
                }
              }(s, B);
            }
          else {
            !function (S, e) {
              ai(S, e, e.material.pants, !1);
              if (!(e.arms[0].front || e.arms[0].over)) {
                GO(Tn(S), e, 0);
              }
            }(s, B);
          }
        else {
          !function (S, e) {
            var a = Ko;
            var s = Uo(S);
            var B = s.rect;
            var o = s.line;
            var n = e.torso;
            if (e.p.sit) {
              u(S, [[n.x - 1, n.y + n.h - 6], [n.x + n.w, n.y + n.h - 6], [n.x + n.w + 2, 60], [n.x - 3, 60]], a.ink);
            }
            for (var i = 0; i < 2; i++) {
              var O = e.legs[i];
              if (e.p.sit) {
                o(O.x + 1, O.y, O.x + (i ? 3 : -2), O.knee, a.ink, 6);
                o(O.x + (i ? 3 : -2), O.knee, n.x + n.w / 2 + (i ? -3 : 2), O.foot - 2, a.navy, 5);
                o(O.x + (i ? 3 : -2), O.knee, n.x + n.w / 2 + (i ? -3 : 2), O.foot - 3, a.steel, 2);
              }
              else {
                B(O.x - 1, O.y, O.w + 2, O.h, a.ink);
                B(O.x, O.y, O.w, O.h - 1, a.navy);
                B(O.x + 1, O.y + 1, 1, O.h - 3, a.steel);
              }
            }
            if (!(e.p.sit)) {
              B(n.x + 1, n.y + n.h - 4, n.w - 2, 6, a.navy);
              B(n.x + Math.floor(n.w / 2), n.y + n.h - 2, 1, 4, a.ink);
            }
            var t = e.arms[0];
            if (!(t.front || t.over)) {
              nn(S, e, 0);
            }
          }(s, B);
        }
    }
    else {
      !function (S, a) {
        for (var s = 0; s < 2; s++) {
          var B = a.legs[s];
          if (a.p.sit) {
            e.fatLine(S, B.x + 1, B.y, B.x + (s ? 3 : -2), B.knee, 6, wn.r);
            e.fatLine(S, B.x + (s ? 3 : -2), B.knee, a.torso.x + Math.floor(a.torso.w / 2) + (s ? -3 : 2), B.foot - 2, 5, wn.y);
          }
          else {
            var o = B.x - 1;
            var n = B.w + 2;
            var i = B.y;
            e.r(S, o, i, n, B.foot - i - 6, wn.j);
            e.r(S, o + 1, i, n - 2, B.foot - i - 7, wn.p);
            e.r(S, o + 1, i, 1, B.foot - i - 7, wn.r);
          }
        }
        var O = a.arms[0];
        if (!(O.front || O.over)) {
          Fn(S, a, 0);
        }
      }(s, B);
    }
  }
  function iO(S, a, s, B, o, n, i, O) {
    var t = a.material.cloth;
    var h = a.material.trim;
    u(S, [[s + 2, B], [s + o - 2, B], [s + o - 1, B + 3], [s + o - 1, B + 7], [s + o - 2, i + 1], [s + 1, i + 1], [s, B + 7], [s, B + 3]], t.base);
    e.r(S, s, B + 4, 1, i - B - 4, t.line);
    e.r(S, s + 1, B + 6, 1, i - B - 7, t.deep);
    e.r(S, s + o - 1, B + 4, 1, i - B - 4, t.shade);
    e.r(S, s + 3, B, o - 6, 1, t.hi);
    e.line(S, s + 3, B + 5, s + 2, i - 2, t.shade);
    e.line(S, s + o - 4, B + 6, s + o - 3, i - 2, t.deep);
    u(S, [[s + 4, B], [O + 1, B + 9], [s + o - 5, B]], h.shade);
    e.fatLine(S, s + 4, B, O, B + 8, 2, h.base);
    e.fatLine(S, s + o - 5, B, O + 1, B + 9, 2, h.hi);
    e.dot(S, O, B + 3, h.hi);
    e.dot(S, O + 1, B + 6, h.base);
    e.line(S, O, B + 9, O + 2, B + 11, h.deep);
    e.line(S, O + 2, B + 10, O + 3, i - 1, h.shade);
    e.line(S, O + 3, B + 11, O + 4, i - 1, t.hi);
  }
  function OO(S) {
    var e = S.material;
    var a = {};
    k(a, "OqaAh", e.cloth);
    k(a, "kdmTi", e.skirt);
    k(a, "zZsSH", e.trim);
    k(a, "..cWw", e.cream);
    k(a, "bBoRr", e.accent);
    k(a, "DEFfu", e.inner);
    k(a, "gGyYX", e.gold);
    k(a, ".JjNn", e.jade);
    k(a, "LlMVv", e.pants);
    a.e = e.eye.base;
    a.p = e.eye.deep;
    return m(a, S);
  }
  function tO(S) {
    return S.map(function (S) {
      return S + S.split("").reverse().join("");
    });
  }
  var hO = tO([".....zS", "...OAHS", ".OAAczS", "OAeAczS", ".OAAacS", ".OaeAcS", ".OAAAAc", ".OccWcc", "..DFffF", "..DEFfF"]);
  var rO = tO([".....zS", "...OAAa", ".OAAAAa", "OAAhAAa", ".OAAAAa", ".OAAAhq", ".OAAAAq", ".OcWWWq", "..DEFFF", "..DEFFf"]);
  var dO = [".....zSz....", "....OAHSz...", "...OAAAAAO..", "..OAAAAAwAO.", "..OAAAAwDDAO", "..OAhAAwDDEO", "..OAAAwDDEO.", "..OcWWWWWWO.", "...DEFFFFD..", "...DEFFfFD.."];
  var bO = tO(["......YX", ".zSHSSYN", "zSHsSsYN", ".zsSsSGN", ".......G"]);
  var lO = [".zSHSSSSzz", "zSHsSsSGNg", ".zsSsSsgNg"];
  var fO = [".zSSS", "zSHsS", ".zSsz"];
  var cO = [".zSSz", "zSHSs", ".zSsz"];
  function GO(S, a, s) {
    var B = Zn(a, s);
    var o = a.material;
    var n = o.gold;
    var i = o.trim;
    var O = o.accent;
    var t = o.skirt;
    var h = o.jade;
    var r = B.far;
    var d = Math.max(5, B.len);
    function b(S, e) {
      return B.pt(S, e);
    }
    var l = b(1, 2.8);
    var f = b(.5 * d, 3.4);
    var c = b(d + 2, 3.2);
    e.line(S, l[0], l[1], f[0], f[1], r ? O.deep : O.base);
    e.line(S, f[0], f[1], c[0], c[1], r ? O.deep : O.base);
    var G = b(1, 3.9);
    var H = b(.5 * d, 4.5);
    var g = b(d + 2, 4.3);
    e.line(S, G[0], G[1], H[0], H[1], r ? O.line : O.deep);
    e.line(S, H[0], H[1], g[0], g[1], r ? O.line : O.deep);
    e.dot(S, c[0], c[1] + 1, r ? t.deep : h.base);
    e.dot(S, c[0], c[1] + 2, r ? t.deep : t.base);
    e.dot(S, c[0], c[1] + 3, r ? t.line : t.hi);
    Si(S, B, 3.2, -1.9, 3.2, 1.9, r ? n.deep : n.base);
    Si(S, B, 4.1, -1.9, 4.1, 1.9, r ? n.line : n.deep);
    ei(S, B, 3.2, -.6, r ? n.shade : n.hi);
    Si(S, B, d - 3.4, -2.2, d - 3.4, 2.2, r ? i.deep : i.base);
    Si(S, B, d - 2.4, -2.2, d - 2.4, 2.2, r ? i.shade : i.hi);
    Si(S, B, d - 1.4, -2.2, d - 1.4, 2.2, r ? i.line : i.shade);
    ei(S, B, d - 2.4, 0, r ? h.deep : h.base);
  }
  function HO(S, e, s) {
    var B = OO(e);
    var o = 0 | e.dy;
    if (e.g.side) {
      if (1 !== s) {
        return;
      }
      as(S, e.g.arms[1].x - 1, a.ARM_Y - 2 + o, cO, B, !1);
    }
    else {
      var n = e.g.arms[s].x + 1;
      var i = a.ARM_Y - 2 + o;
      if (0 === s) {
        as(S, n - 3, i, fO, B, !1);
      }
      else {
        as(S, n + 3, i, fO, B, !0);
      }
    }
  }
  function gO(S, e, a, s) {
    var B = S[e];
    if (null != B) {
      S[e] = B.slice(0, a) + s + B.slice(a + s.length);
    }
  }
  var xO = {};
  function DO(S, e) {
    var a = S + e;
    if (xO[a]) {
      return xO[a];
    }
    var s;
    var B = function (S, e, a, s) {
      var B;
      var o;
      var n = [];
      for (B = 0; B < S; B++) {
        var i = S > 1 ? B / (S - 1) : 0;
        var O = 2 * Math.round((12 + (s - 12) * Math.pow(i, .8)) / 2);
        var t = Math.round((22 - O) / 2);
        var h = t + O - 1;
        var r = "";
        for (o = 0; o < 22; o++) {
          var d = ".";
          if (o >= t && o <= h) {
            d = "T";
            if (o === t || o === h) {
              d = "k";
            }
            else {
              if (o === t + 1) {
                d = "m";
              }
              else {
                if (o === h - 1) {
                  d = "i";
                }
                else {
                  if ((o - t) % 6 == 3 && B % 5 != 4) {
                    d = "m";
                  }
                }
              }
            }
            if (B >= Math.floor(.55 * S) && "T" === d && B < S - 2) {
              if (!(1 & B || ((o + 2 * (B >> 1 & 1)) % 4 + 4) % 4 != 0)) {
                d = "i";
              }
            }
            if (B === S - 2 && "k" !== d) {
              d = o % 4 == 1 ? "m" : "d";
            }
            if (B === S - 1) {
              d = o % 4 < 3 ? "k" : ".";
            }
          }
          r += d;
        }
        n.push(r);
      }
      return n;
    }(e, 0, 0, "side" === S ? 16 : 18);
    if ("down" === S) {
      for (s = 1; s < e - 2; s++)
        gO(B, s, 12, "kcW");
      var o = Math.floor(.38 * e);
      var n = e - 1 - o;
      for (s = o; s < e - 2; s++) {
        for (var i = 2 + Math.floor(2 * (s - o) / n), O = 10 - Math.floor(2 * (s - o) / n), t = "", h = 0; h < i; h++)
          t += 0 === h ? "o" : h === i - 1 ? "3" : "4";
        gO(B, s, O, t);
      }
    }
    xO[a] = B;
    return B;
  }
  function WO(S, a, s, B, o, n) {
    var i;
    var O = a.material.accent;
    for (i = 0; i < 2; i++) {
      var t = i ? 1 : -1;
      var h = n + 6 * t;
      var r = Math.round(s * (i ? -1 : 1));
      u(S, [[h, o + 2], [h + 2 * t, o + 2], [h + 5 * t + r, B + 1], [h + 2 * t + r, B + 2], [h + 1 * t + r, B - 3]], O.line);
      u(S, [[h + .5 * t, o + 3], [h + 1.5 * t, o + 3], [h + 4 * t + r, B], [h + 2 * t + r, B + 1], [h + 1 * t + r, B - 3]], O.base);
      e.line(S, h + 1 * t, o + 4, h + 3 * t + r, B - 1, O.hi);
      e.line(S, h, o + 4, h + 1 * t + r, B - 3, O.deep);
    }
  }
  tO([".....OOOOO", "...OOAhhhA", "..OAAAhhAA", ".OAAAhAAAN", ".OAAzSHSSN", ".OAqzsSszJ", "OAAq.....J", "OAhq......", "OAAq......", "OhAq......", "OAAq......", "OAhq......", "OAAq......", "OAhq......", "OAAq......", "OAAq......", ".OAq......", ".OhA......", ".OAq......", "..OA......", "..Oq......", "...O......"]);
  tO([".....OOOOO", "...OAhhAAA", "..OAhhAAAA", ".OAhhAAAAA", "OaAAAAAAAA", "OaAAAAAAAA", "OaAAAAAAAA", "OaAAAAAAAA", "OaaAaAAaAA", "OaaAaAAaAA", "OaAAaAAaAA", "OaaAAAAAAA", "OaaAaAAaAA", "OaAAaAAaAA", "OaaAaAAaAA", ".OaaAAAAAA", ".OaAAAAaAA", "..OaaAAaAA", "..OaaAAaAA", "...OaAAAAA", "....OqaAAA", "....OqaAAA", ".....OqAAA", ".....OqaAA", "......OqaA", "......OqAA", ".......Oqa", "........Oq", ".........O"]);
  var JO = { line: "#05060c", deep: "#0b0d18", shade: "#131728", base: "#1d2236", hi: "#3a4666", hi2: "#657699" };
  function uO(S, a, s) {
    e.dot(S, a, s, "#25c9a0");
    e.dot(S, a, s + 1, "#a54c24");
    e.dot(S, a, s + 2, "#c8683a");
    e.dot(S, a, s + 3, "#6e2c14");
  }
  function MO(S, e, a, s) {
    var B;
    var o;
    var n = s * s;
    for (o = Math.floor(a - s); o <= Math.ceil(a + s); o++)
      for (B = Math.floor(e - s); B <= Math.ceil(e + s); B++)
        (B - e) * (B - e) + (o - a) * (o - a) <= n && (S[B + "," + o] = 1);
  }
  function wO(S, e, a) {
    for (var s = 0; s < e.length - 1; s++) {
      var B;
      var o;
      var n = e[s];
      var i = e[s + 1];
      var O = Math.max(2, Math.ceil(2 * Math.max(Math.abs(i[0] - n[0]), Math.abs(i[1] - n[1]))));
      for (B = 0; B <= O; B++)
        o = B / O, MO(S, n[0] + (i[0] - n[0]) * o, n[1] + (i[1] - n[1]) * o, a[s] + (a[s + 1] - a[s]) * o);
    }
  }
  function NO(S, e, a, s) {
    for (var B = 0; B < s.length; B++)
      for (var o = 0; o < s[B].length; o += 2)
        for (var n = s[B][o]; n <= s[B][o + 1]; n++)
          S[e + n + "," + (a + B)] = 1;
  }
  function pO(S, e) {
    var a;
    var s;
    var B = {};
    for (a in S)
      B[e - +(s = a.split(","))[0] + "," + s[1]] = 1;
    return B;
  }
  function kO(S, e) {
    for (var a in e)
      S[a] = 1;
    return S;
  }
  function mO(S, a, s, B) {
    var o;
    var n;
    var i;
    var O;
    var t = {};
    for (o in a)
      a[(i = +(n = o.split(","))[0]) - 1 + "," + (O = +n[1])] || (t[i - 1 + "," + O] = 1), a[i + 1 + "," + O] || (t[i + 1 + "," + O] = 1), a[i + "," + (O - 1)] || (t[i + "," + (O - 1)] = 1), a[i + "," + (O + 1)] || (t[i + "," + (O + 1)] = 1);
    for (o in t)
      i = +(n = o.split(","))[0], O = +n[1], !(i >= 0 && i <= 31 && O >= 0) || B && B(i, O) || e.dot(S, i, O, s.line);
    for (o in a)
      if (i = +(n = o.split(","))[0], O = +n[1], !(i < 0 || i > 31 || O < 0 || B && B(i, O))) {
        var h = a[i + "," + (O - 1)];
        var r = a[i - 1 + "," + O];
        var d = a[i + "," + (O + 1)];
        var b = a[i + 1 + "," + O];
        e.dot(S, i, O, h && r ? d && b ? s.base : s.shade : s.hi);
      }
  }
  function vO(a, s, B) {
    var o = g.xich_ma_y;
    var n = o.rock;
    var i = o.lava;
    var O = function (S, e) {
      var a;
      var s = S.arms[e];
      var B = w(s);
      var o = h(s);
      a = s.bent ? { x: s.jx, y: s.jy } : { x: B.x + .36 * (o.x - B.x), y: B.y + .36 * (o.y - B.y) };
      var n = o.x - a.x;
      var i = o.y - a.y;
      var O = Math.sqrt(n * n + i * i) || 1;
      var t = n / O;
      var r = i / O;
      var d = a.x - B.x;
      var b = a.y - B.y;
      var l = Math.sqrt(d * d + b * b) || 1;
      var f = d / l;
      var c = b / l;
      return { a: s, s: B, e: a, h: o, len: O, ul: l, far: S.g.side && 0 === e && !s.front, Q: function (S, e) {
          return [Math.min(31, Math.max(0, a.x + t * S - r * e)), Math.max(0, a.y + r * S + t * e)];
        }, U: function (S, e) {
          return [Math.min(31, Math.max(0, B.x + f * S - c * e)), Math.max(0, B.y + c * S + f * e)];
        } };
    }(s, B);
    var t = O.Q;
    var r = O.far;
    var d = Math.max(3, O.len - 1);
    var b = S.Palette.pick("SKIN", s.cfg.skin, "light");
    var l = O.U;
    var f = Math.max(2, O.ul + .6);
    function c(S) {
      return [Math.round(S[0]), Math.round(S[1])];
    }
    function G(S, s, B, o, n) {
      var i = c(t(S, s));
      var O = c(t(B, o));
      e.line(a, i[0], i[1], O[0], O[1], n);
    }
    function H(S, s, B) {
      var o = c(t(S, s));
      e.dot(a, o[0], o[1], B);
    }
    function x(S, s, B, o, n) {
      var i = c(l(S, s));
      var O = c(l(B, o));
      e.line(a, i[0], i[1], O[0], O[1], n);
    }
    u(a, [l(0, -2.9), l(.5 * f, -3.3), l(f, -2.7), l(f, 2.8), l(.5 * f, 3.2), l(0, 2.9)], b.line);
    u(a, [l(0, -2), l(.5 * f, -2.4), l(f, -1.8), l(f, 1.8), l(.5 * f, 2.3), l(0, 2)], r ? b.shade : b.base);
    x(.5, -1.6, f - .5, -1.3, r ? b.base : b.hi);
    x(.5, 1.6, f - .5, 1.4, r ? b.deep : b.shade);
    u(a, [t(-1, -2.7), t(d, -2.4), t(d + .4, 2.6), t(-1, 2.9)], n.line);
    u(a, [t(-.4, -1.8), t(d - .5, -1.6), t(d - .2, 1.7), t(-.4, 2)], r ? n.shade : n.base);
    G(0, -1.3, d - 1, -1.2, r ? n.base : n.hi);
    G(.5, 1.4, d - 1, 1.2, r ? n.deep : n.shade);
    G(.5 * d, -1.6, .5 * d, 1.8, n.deep);
    if (!(r)) {
      H(.25 * d, .2, i.base);
      H(.25 * d + 1, -.4, i.hi);
      H(.62 * d, -.6, i.base);
      H(.62 * d + 1, .5, i.deep);
      H(.88 * d, .3, i.hi);
    }
    G(d - .4, -2, d - .4, 2.2, r ? n.deep : n.hi);
    (function (S, a, s) {
      var B = g.xich_ma_y;
      var o = B.rock;
      var n = B.lava;
      var i = a.arms[s];
      var O = w(i);
      var t = {};
      if (!a.g.side || 0 !== s || i.front) {
        var h = a.g.side ? 0 : s ? 1 : -1;
        var r = O.x + h;
        var d = O.y - 1;
        MO(t, r, d, 2.3);
        wO(t, [[r + .5 * h, d - 2], [r + 1.2 * h, d - 4]], [1, .4]);
        mO(S, t, o);
        e.dot(S, r, d, n.base);
        e.dot(S, r + h, d + 1, n.deep);
      }
    })(a, s, B);
  }
  function yO(a, s) {
    if ("toc_truong_y" !== s.cfg.outfit)
      if ("quan_dui" !== s.cfg.outfit)
        if ("ao_thon_lac" !== s.cfg.outfit)
          if ("lu_hanh_moc" !== s.cfg.outfit)
            if ("long_tuong_y" !== s.cfg.outfit)
              if (Ki[s.cfg.outfit]) {
                Ki[s.cfg.outfit].robe(Tn(a), s);
              }
              else if ("lan_thanh_y" !== s.cfg.outfit)
                if ("sat_luc_y" !== s.cfg.outfit)
                  if ("tan_mo_y" !== s.cfg.outfit)
                    if ("thanh_tam_y" !== s.cfg.outfit)
                      if ("thien_luan_kiem_y" !== s.cfg.outfit)
                        if ("tuyet_son_kiem_y" !== s.cfg.outfit)
                          if ("man_ho_tu_y" !== s.cfg.outfit)
                            if ("than_kiem_y" !== s.cfg.outfit)
                              if ("chi_ton_kiem_y" !== s.cfg.outfit)
                                if ("hoat_tu_y" !== s.cfg.outfit)
                                  if ("nam_tu_y" !== s.cfg.outfit)
                                    if ("hong_ty" !== s.cfg.outfit)
                                      if ("nam_y_bao" !== s.cfg.outfit)
                                        if ("vuong_lam_y" !== s.cfg.outfit)
                                          if ("huyen_cot_y" !== s.cfg.outfit)
                                            if ("tong_ngoc_y" !== s.cfg.outfit) {
                                              var B = s.torso;
                                              var o = s.material.cloth;
                                              var n = s.material.trim;
                                              var i = B.x - 1;
                                              var O = B.w + 2;
                                              var t = B.y - 1;
                                              var h = B.h - 1;
                                              var r = t + h - 2;
                                              var d = i + Math.floor(O / 2);
                                              var b = !s.g.side && !s.g.back;
                                              if ("bach_kim_an_dien_bao" !== s.cfg.outfit)
                                                if ("thanh_lam_dao_bao" !== s.cfg.outfit)
                                                  if ("bach_nguyet_hong_lien" !== s.cfg.outfit)
                                                    if ("van_lo_lao_ma_bao" !== s.cfg.outfit)
                                                      if ("man_ho_tu_bao" !== s.cfg.outfit)
                                                        if ("ma_vuong_bao" !== s.cfg.outfit)
                                                          if ("xich_ma_y" !== s.cfg.outfit)
                                                            if ("dai_phu_bao" !== s.cfg.outfit)
                                                              if ("npc_long_bao" !== s.cfg.outfit)
                                                                if ("huan_su_bao" !== s.cfg.outfit)
                                                                  if ("tho_ren_moi" !== s.cfg.outfit)
                                                                    if ("tang_kinh_bao" === s.cfg.outfit && $S(s)) {
                                                                      !function (S, e) {
                                                                        var a = ee;
                                                                        var s = e.torso.x - 11;
                                                                        var B = 0 | e.dy;
                                                                        Se(S, s + 7, 39, ne, a, 0);
                                                                        Se(S, s + 9, 23, Be, a, B);
                                                                        Se(S, s + 14, 40, oe, a, B);
                                                                      }(a, s);
                                                                    }
                                                                    else {
                                                                      if ("tho_ren" === s.cfg.outfit) {
                                                                        e.fatLine(a, s.g.side ? i + O - 2 : i + 2, t + 1, d + 2, r, 2, o.deep);
                                                                        e.line(a, s.g.side ? i + O - 2 : i + 2, t + 1, d + 2, r, o.hi);
                                                                        e.fatLine(a, s.g.side ? i + O - 3 : i + 1, t + 2, d + 3, r - 1, 3, G.leather.deep);
                                                                        e.line(a, s.g.side ? i + O - 3 : i + 1, t + 2, d + 3, r - 1, G.leather.base);
                                                                        e.dot(a, s.g.side ? i + O - 2 : i + 3, t + 4, G.metal.base);
                                                                        e.dot(a, d + 1, t + 7, G.metal.hi);
                                                                        u(a, [[i, r - 4], [i + O, r - 4], [i + O + 1, B.y + B.h + 8], [i + 1, B.y + B.h + 8]], o.base);
                                                                        e.r(a, i, r - 4, 1, 12, o.line);
                                                                        e.r(a, i + O, r - 3, 1, 11, o.deep);
                                                                        e.line(a, i + 3, r - 2, i + 3, B.y + B.h + 6, o.shade);
                                                                        M(a, i - 1, r - 5, O + 2, 3, G.leather);
                                                                        return void e.r(a, d - 1, r - 5, 3, 2, G.metal.base);
                                                                      }
                                                                      if (b) {
                                                                        iO(a, s, i, t, O, 0, r, d);
                                                                      }
                                                                      else {
                                                                        M(a, i, t, O, h, o);
                                                                        e.r(a, i + 2, t + 4, 1, h - 5, o.deep);
                                                                        e.r(a, i + O - 3, t + 3, 1, h - 4, o.shade);
                                                                        if (s.g.back) {
                                                                          e.r(a, i + 2, t, O - 4, 2, n.shade);
                                                                        }
                                                                        else {
                                                                          u(a, [[i + 2, t], [d, t + 4], [i + O - 3, t], [i + O - 2, t + 9], [d - 1, r]], n.shade);
                                                                          e.fatLine(a, i + 2, t, d + 2, t + 7, 3, n.base);
                                                                          e.fatLine(a, i + O - 3, t, d - 2, t + 11, 3, n.base);
                                                                          e.line(a, i + O - 2, t, d - 1, t + 11, n.hi);
                                                                          e.line(a, i + O - 3, t + 6, d - 1, t + 12, n.shade);
                                                                          e.line(a, d - 1, t + 12, d + 2, t + 13, n.hi);
                                                                        }
                                                                      }
                                                                      for (var l = 0; l < 2; l++) {
                                                                        var f = s.legs[l];
                                                                        var c = d + (l ? 1 : -Math.floor(O / 2));
                                                                        var H = c + Math.floor(O / 2) - 1;
                                                                        var x = f.knee + (s.p.sit ? -1 : 1);
                                                                        var D = s.p.sit ? l ? 2 : -2 : f.x - s.g.legs[l].x;
                                                                        var W = b && !s.p.sit ? l ? 2 : -2 : 0;
                                                                        u(a, [[c, r], [H, r], [H + D + (l ? 2 : 0) + W, x], [c + D - (l ? 0 : 2) + W, x]], l ? o.base : o.shade);
                                                                        u(a, [[c + 2, r + 3], [H, r + 4], [H + D + (l ? 1 : -1) + W, x - 2], [c + D + W, x - 1]], o.base);
                                                                        e.fatLine(a, H - 1, r + 4, H + D + (l ? 1 : -1) + W, x - 2, 2, o.hi);
                                                                        e.line(a, c + 1, r + 2, c + D + (l ? 1 : -1) + W, x - 1, o.deep);
                                                                        e.line(a, H, r + 2, H + D + (l ? 2 : 0) + W, x - 1, o.hi);
                                                                        e.line(a, l ? c : H, r + 3, (l ? c : H) + D + W, x, n.base);
                                                                        e.line(a, c + D - (l ? 0 : 2) + W, x, H + D + (l ? 2 : 0) + W, x, n.shade);
                                                                      }
                                                                      if (b && !s.p.sit) {
                                                                        e.line(a, d, r + 3, d, s.legs[0].knee, o.line);
                                                                      }
                                                                      M(a, i, r, O, 3, G.leather);
                                                                      if (!(s.g.back)) {
                                                                        M(a, d - 1, r, 3, 3, G.metal);
                                                                        e.dot(a, d, r + 1, G.metal.deep);
                                                                      }
                                                                      e.r(a, d, r + 3, 2, 5, G.leather.shade);
                                                                      if ("truc_co_chap_su" === s.cfg.outfit) {
                                                                        e.r(a, i, t + 1, 4, 2, n.deep);
                                                                        e.r(a, i + O - 4, t + 1, 4, 2, n.shade);
                                                                        e.line(a, i + 1, t, i + 4, t + 2, n.hi);
                                                                        e.line(a, i + O - 2, t, i + O - 5, t + 2, n.base);
                                                                        e.fatLine(a, i, r - 2, i + O, r - 2, 2, n.deep);
                                                                        e.dot(a, d, r - 2, G.metal.hi);
                                                                        e.dot(a, d - 1, r - 1, n.base);
                                                                        if (!(s.g.back)) {
                                                                          e.r(a, d - 1, t + 5, 3, 4, n.deep);
                                                                          e.dot(a, d, t + 5, n.hi);
                                                                          e.dot(a, d - 1, t + 7, G.metal.base);
                                                                        }
                                                                      }
                                                                      if ("tieu_thanh" === s.cfg.outfit) {
                                                                        if (s.g.back) {
                                                                          e.r(a, i + 2, r - 1, O - 4, 2, n.base);
                                                                        }
                                                                        else {
                                                                          e.fatLine(a, i + 3, t + 1, d, t + 9, 2, o.hi);
                                                                          e.fatLine(a, i + O - 4, t + 1, d + 1, t + 9, 2, o.deep);
                                                                          e.line(a, i + 1, r - 1, d, r + 1, n.hi);
                                                                          e.line(a, i + O - 2, r - 1, d, r + 1, n.base);
                                                                          e.r(a, d - 2, r - 1, 5, 2, n.deep);
                                                                          e.r(a, d - 1, r - 1, 3, 1, n.hi);
                                                                          e.dot(a, d - 3, r + 3, n.hi);
                                                                          e.dot(a, d, r + 4, n.base);
                                                                          e.dot(a, d + 3, r + 3, n.hi);
                                                                        }
                                                                      }
                                                                    }
                                                                  else {
                                                                    !function (a, s) {
                                                                      if ($S(s)) {
                                                                        !function (S, e) {
                                                                          var a = xe;
                                                                          var s = e.torso.x - 11;
                                                                          var B = 0 | e.dy;
                                                                          Se(S, s + 11, 42, ue, a, 0);
                                                                          Se(S, s + 10, 23, Je, a, B);
                                                                          Se(S, s + 5, 21, Me, a, B);
                                                                        }(a, s);
                                                                      }
                                                                      else {
                                                                        var B = s.torso;
                                                                        var o = s.material.cloth;
                                                                        var n = s.material.trim;
                                                                        var i = s.material.accent;
                                                                        var O = G.metal;
                                                                        var t = G.leather;
                                                                        var h = S.Palette.pick("SKIN", s.cfg.skin, "tan");
                                                                        var r = B.x - 1;
                                                                        var d = B.w + 2;
                                                                        var b = B.y;
                                                                        var l = r + Math.floor(d / 2);
                                                                        var f = b + 13;
                                                                        var c = Math.max(s.legs[0].knee, s.legs[1].knee);
                                                                        var H = s.p.sit ? Math.min(55, c) : Math.min(48, c);
                                                                        var g = s.g.side;
                                                                        var x = s.g.back;
                                                                        if (u(a, [[r + 1, b], [r + d - 1, b], [r + d + 1, b + 4], [r + d, f + 4], [r, f + 4], [r - 1, b + 4]], o.base), e.r(a, r - 1, b + 4, 2, f - b, o.deep), e.r(a, r + d - 1, b + 4, 2, f - b, o.shade), x || g ? x && (e.line(a, l, b + 1, l, f, o.deep), e.line(a, l - 3, b + 2, l - 2, b + 5, o.shade)) : (u(a, [[l - 3, b], [l + 3, b], [l + 2, b + 3], [l, b + 6], [l - 2, b + 3]], h.base), e.line(a, l - 3, b, l, b + 5, o.hi), e.line(a, l + 3, b, l, b + 5, o.shade), e.line(a, l - 2, b + 3, l - 1, b + 4, h.shade), e.line(a, l + 1, b + 4, l + 2, b + 3, h.shade), e.dot(a, l - 1, b + 1, h.hi), e.dot(a, l + 1, b + 1, h.shade)), x) {
                                                                          e.fatLine(a, r + 2, b, r + d - 3, f - 1, 2, i.deep);
                                                                          e.fatLine(a, r + d - 3, b, r + 2, f - 1, 2, i.base);
                                                                          e.line(a, r + 2, b - 1, r + d - 3, f - 2, i.hi);
                                                                          e.r(a, l - 2, f - 1, 4, 3, i.shade);
                                                                          e.dot(a, l - 1, f - 1, i.hi);
                                                                          e.fatLine(a, l - 1, f + 2, l - 3, H - 4, 2, i.base);
                                                                          e.fatLine(a, l + 1, f + 2, l + 3, H - 5, 2, i.deep);
                                                                          e.line(a, r - 1, H, r + d + 1, H, t.line);
                                                                          e.line(a, r, H - 1, r + d, H - 1, i.deep);
                                                                          e.r(a, r, f + 4, d, H - f - 4, i.base);
                                                                          e.r(a, r, f + 4, 2, H - f - 4, i.deep);
                                                                          e.r(a, r + d - 2, f + 4, 2, H - f - 4, i.hi);
                                                                          e.line(a, r - 1, H, r + d + 1, H, t.line);
                                                                        }
                                                                        else {
                                                                          var D = g ? r + d - 5 : r;
                                                                          if (g) {
                                                                            u(a, [[D + 1, b + 4], [D + 5, b + 5], [D + 6, H], [D, H], [D, b + 8]], i.base);
                                                                            e.r(a, D, b + 8, 1, H - b - 8, i.deep);
                                                                            e.r(a, D + 5, b + 6, 1, H - b - 6, i.hi);
                                                                          }
                                                                          else {
                                                                            u(a, [[l - 4, b + 4], [l + 4, b + 4], [r + d, b + 8], [r + d + 1, H], [r - 1, H], [r, b + 8]], i.base);
                                                                            e.r(a, r - 1, b + 9, 2, H - b - 8, i.deep);
                                                                            e.r(a, r + d - 1, b + 9, 2, H - b - 8, i.hi);
                                                                            e.line(a, l - 4, b + 5, l - 4, b + 9, i.deep);
                                                                            e.line(a, l + 4, b + 5, l + 4, b + 9, i.shade);
                                                                            e.line(a, r + 3, f + 2, r + 2, H - 2, i.shade);
                                                                            e.line(a, r + d - 3, f + 2, r + d - 2, H - 2, i.shade);
                                                                            e.dot(a, l - 1, b + 6, n.deep);
                                                                            e.r(a, l - 2, b + 7, 4, 1, n.base);
                                                                            e.r(a, l - 1, b + 8, 2, 1, n.hi);
                                                                            e.dot(a, l - 1, b + 9, n.base);
                                                                            e.dot(a, l, b + 9, n.deep);
                                                                            e.r(a, r + d - 5, f + 3, 4, 4, i.deep);
                                                                            e.line(a, r + d - 5, f + 3, r + d - 2, f + 3, i.hi);
                                                                            e.dot(a, r + d - 4, f + 4, O.hi);
                                                                            e.dot(a, r + d - 3, f + 6, O.base);
                                                                            e.line(a, r + 3, f + 2, r + 2, f + 9, O.shade);
                                                                            e.line(a, r + 4, f + 2, r + 4, f + 9, O.base);
                                                                            e.dot(a, r + 2, f + 10, O.hi);
                                                                            e.dot(a, r + 4, f + 10, O.hi);
                                                                          }
                                                                          e.line(a, r - 1, H, r + d + 1, H, t.line);
                                                                          e.line(a, r, H - 1, r + d, H - 1, i.deep);
                                                                          e.dot(a, r + 2, H - 2, t.line);
                                                                          e.dot(a, l + 1, H - 3, t.line);
                                                                          e.dot(a, r + d - 3, H - 2, t.line);
                                                                          if (!(g)) {
                                                                            e.fatLine(a, l - 4, b + 4, r + 2, b - 1, 2, i.deep);
                                                                            e.line(a, l - 4, b + 3, r + 2, b - 2, i.hi);
                                                                            e.fatLine(a, l + 4, b + 4, r + d - 2, b - 1, 2, i.deep);
                                                                            e.line(a, l + 4, b + 3, r + d - 2, b - 2, i.shade);
                                                                            e.dot(a, l - 4, b + 5, O.hi);
                                                                            e.dot(a, l + 4, b + 5, O.base);
                                                                          }
                                                                        }
                                                                        if (e.fatLine(a, r - 1, f, r + d + 1, f, 3, t.deep), e.line(a, r, f - 1, r + d, f - 1, t.base), e.line(a, r, f + 1, r + d, f + 1, t.line), x || g || (e.r(a, l - 2, f - 1, 4, 3, O.deep), e.r(a, l - 1, f, 2, 1, O.hi)), x) {
                                                                          e.r(a, r - 3, b - 1, 6, 5, O.deep);
                                                                          e.line(a, r - 3, b - 1, r + 2, b - 1, O.hi);
                                                                          e.line(a, r - 2, b + 1, r + 2, b + 1, O.shade);
                                                                        }
                                                                        else {
                                                                          var W = g ? r + d - 4 : r - 3;
                                                                          u(a, [[W, b - 1], [W + 6, b - 2], [W + 7, b + 2], [W + 5, b + 5], [W, b + 4]], O.deep);
                                                                          u(a, [[W + 1, b], [W + 5, b - 1], [W + 6, b + 2], [W + 4, b + 3], [W + 1, b + 3]], O.shade);
                                                                          e.line(a, W + 1, b, W + 5, b - 1, O.hi);
                                                                          e.line(a, W + 1, b + 2, W + 5, b + 1, O.base);
                                                                          e.dot(a, W + 2, b + 3, t.base);
                                                                          e.dot(a, W + 5, b + 2, O.hi);
                                                                        }
                                                                      }
                                                                    }(a, s);
                                                                  }
                                                                else {
                                                                  !function (S, a) {
                                                                    var s = a.torso;
                                                                    var B = a.material.cloth;
                                                                    var o = a.material.trim;
                                                                    var n = a.material.accent;
                                                                    var i = s.x - 2;
                                                                    var O = s.w + 4;
                                                                    var t = s.y - 1;
                                                                    var h = i + Math.floor(O / 2);
                                                                    var r = t + 13;
                                                                    var d = Math.max(a.legs[0].knee, a.legs[1].knee);
                                                                    var b = a.p.sit ? Math.min(56, d + 1) : Math.min(48, d + 1);
                                                                    var l = a.g.side;
                                                                    var f = a.g.back;
                                                                    if (u(S, [[i + 2, t], [i + O - 3, t], [i + O, t + 4], [i + O - 1, r], [i + O + 1, b], [i - 1, b], [i + 1, r], [i, t + 4]], B.base), e.r(S, i, t + 3, 2, r - t - 2, B.deep), e.r(S, i + O - 2, t + 3, 2, r - t - 2, B.hi), e.line(S, i + 3, t + 2, i + 3, r - 1, B.shade), e.line(S, i, r + 2, i - 1, b, B.deep), e.line(S, i + O, r + 2, i + O + 1, b, B.hi), e.line(S, i + 3, r + 3, i + 2, b - 1, B.shade), e.line(S, i + O - 3, r + 3, i + O - 2, b - 1, B.shade), e.line(S, i - 1, b, i + O + 1, b, n.deep), e.line(S, i - 1, b - 1, i + O + 1, b - 1, n.base), e.dot(S, i + 3, b - 1, n.hi), e.dot(S, h + 3, b - 1, n.hi), e.dot(S, i + O - 2, b - 1, n.hi), f || l ? f ? (e.line(S, h - 1, t + 4, h - 1, r - 1, B.deep), e.line(S, h, r + 2, h, b - 2, B.deep), u(S, [[h - 5, t - 2], [h + 4, t - 2], [h + 6, t + 4], [h + 2, t + 8], [h - 3, t + 8], [h - 7, t + 4]], B.shade), u(S, [[h - 4, t - 1], [h + 3, t - 1], [h + 4, t + 3], [h + 1, t + 6], [h - 2, t + 6], [h - 5, t + 3]], B.base), e.line(S, h - 3, t, h + 1, t, B.hi), e.line(S, h - 1, t + 2, h - 1, t + 5, B.deep)) : (e.line(S, i + O - 3, t + 2, i + O - 4, r - 1, o.base), e.line(S, i + O - 3, r + 2, i + O - 4, b - 2, o.shade)) : (e.r(S, h - 1, t + 3, 2, r - t - 2, o.base), e.line(S, h - 1, t + 3, h - 1, r - 1, o.hi), e.line(S, h, t + 5, h, r - 1, o.shade), e.r(S, h - 1, r + 2, 2, b - r - 3, o.base), e.line(S, h, r + 3, h, b - 3, o.shade), e.dot(S, h - 1, t + 6, "#d8f03c"), e.dot(S, h - 1, t + 7, "#8da31c"), e.line(S, i + 3, t + 1, h - 2, t + 5, B.hi), e.line(S, i + O - 4, t + 1, h + 2, t + 5, B.shade)), e.fatLine(S, i - 1, r, i + O + 1, r, 3, G.leather.deep), e.line(S, i, r - 1, i + O, r - 1, G.leather.base), e.line(S, i, r + 1, i + O, r + 1, G.leather.line), f || l || (e.r(S, h - 2, r - 1, 4, 3, n.deep), e.r(S, h - 1, r, 2, 1, n.hi), e.line(S, i + O - 3, r + 2, i + O - 3, r + 5, G.leather.base), e.r(S, i + O - 5, r + 5, 4, 2, G.metal.base), e.line(S, i + O - 5, r + 5, i + O - 2, r + 5, G.metal.hi)), !f) {
                                                                      var c = l ? h - 2 : h;
                                                                      u(S, [[c - 6, t + 1], [c - 4, t - 1], [c + 4, t - 1], [c + 6, t + 1], [c + 4, t + 5], [c - 4, t + 5]], B.shade);
                                                                      u(S, [[c - 5, t + 1], [c - 3, t], [c + 3, t], [c + 5, t + 1], [c + 3, t + 4], [c - 3, t + 4]], B.base);
                                                                      e.line(S, c - 4, t, c - 1, t, B.hi);
                                                                      e.line(S, c - 4, t + 2, c - 2, t + 4, B.deep);
                                                                      e.line(S, c + 4, t + 2, c + 2, t + 4, B.deep);
                                                                    }
                                                                  }(a, s);
                                                                }
                                                              else {
                                                                !function (a, s) {
                                                                  var B = s.torso;
                                                                  var o = s.material.cloth;
                                                                  var n = s.material.trim;
                                                                  var i = s.material.accent;
                                                                  var O = B.x - 6;
                                                                  var t = B.w + 12;
                                                                  var h = B.y - 3;
                                                                  var r = O + Math.floor(t / 2);
                                                                  var d = h + 15;
                                                                  var b = s.p.sit ? Math.min(58, Math.max(s.legs[0].knee, s.legs[1].knee) + 1) : Math.min(53, Math.max(s.legs[0].knee, s.legs[1].knee) - 1);
                                                                  if (s.g.back || s.g.side) {
                                                                    iO(a, s, B.x - 1, B.y - 1, B.w + 2, B.h, B.y + B.h - 3, B.x + Math.floor((B.w + 2) / 2));
                                                                  }
                                                                  else {
                                                                    var l = S.Palette.pick("SKIN", s.cfg.skin, "light");
                                                                    u(a, [[O + 1, h], [O + 5, h - 1], [r - 4, h + 1], [r - 2, d - 2], [O + 1, d + 2], [O - 1, b]], o.shade);
                                                                    u(a, [[r + 4, h], [O + t - 4, h], [O + t + 1, h + 5], [O + t + 2, b - 1], [r + 3, d + 2], [r + 3, d - 2]], o.base);
                                                                    u(a, [[r - 4, h + 1], [r + 4, h + 1], [r + 4, d - 1], [r - 4, d - 1]], l.base);
                                                                    e.r(a, r - 3, h + 3, 2, 6, l.hi);
                                                                    e.r(a, r + 2, h + 3, 2, 6, l.shade);
                                                                    e.line(a, r, h + 3, r, h + 12, l.deep);
                                                                    e.r(a, r - 4, h + 11, 4, 1, l.shade);
                                                                    e.r(a, r + 1, h + 11, 4, 1, l.deep);
                                                                    u(a, [[O + 1, d - 1], [r - 2, d - 1], [r - 4, b], [O - 2, b + 1]], o.base);
                                                                    u(a, [[r + 2, d - 1], [O + t - 1, d - 1], [O + t + 2, b - 1], [r + 4, b]], o.shade);
                                                                    e.line(a, O + 1, d, O - 1, b, n.base);
                                                                    e.line(a, O + t - 1, d, O + t + 1, b, n.hi);
                                                                    e.line(a, r - 2, d + 1, r - 4, b, n.shade);
                                                                    e.line(a, r + 2, d + 1, r + 4, b, n.deep);
                                                                    e.line(a, r, d + 2, r, b, o.line);
                                                                    e.line(a, O + 3, d + 2, O + 1, b - 2, i.base);
                                                                    e.line(a, O + t - 3, d + 2, O + t - 1, b - 2, i.hi);
                                                                    e.fatLine(a, O, d, O + t, d, 3, n.deep);
                                                                    e.line(a, O + 1, d - 1, O + t - 1, d - 1, n.hi);
                                                                    e.line(a, O + 1, d + 1, O + t - 1, d + 1, n.line);
                                                                    e.r(a, r - 3, d - 3, 7, 6, i.deep);
                                                                    e.r(a, r - 2, d - 2, 5, 4, n.base);
                                                                    e.dot(a, r, d, n.hi);
                                                                    e.dot(a, r - 1, d + 1, i.hi);
                                                                  }
                                                                }(a, s);
                                                              }
                                                            else {
                                                              !function (S, a) {
                                                                var s = a.torso;
                                                                var B = a.material.cloth;
                                                                var o = a.material.trim;
                                                                var n = a.material.accent;
                                                                var i = s.x - 3;
                                                                var O = s.w + 6;
                                                                var t = s.y - 2;
                                                                var h = i + Math.floor(O / 2);
                                                                var r = t + 13;
                                                                var d = Math.max(a.legs[0].knee, a.legs[1].knee);
                                                                var b = a.p.sit ? Math.min(59, d + 2) : Math.min(58, d + 5);
                                                                u(S, [[i + 2, t], [i + O - 2, t], [i + O, t + 6], [i + O, r], [i + O + 2, b], [i - 2, b], [i, r], [i, t + 6]], B.base);
                                                                e.line(S, i, t + 5, i - 1, b - 1, B.shade);
                                                                e.line(S, i + O, t + 5, i + O + 1, b - 1, B.deep);
                                                                e.line(S, i + 2, r + 2, i + 1, b - 2, B.shade);
                                                                e.line(S, i + O - 2, r + 2, i + O - 1, b - 2, B.shade);
                                                                if (a.g.back) {
                                                                  e.fatLine(S, h, r + 1, h, b - 2, 2, o.base);
                                                                  e.line(S, h - 1, r + 1, h - 1, b - 2, n.shade);
                                                                  e.fatLine(S, i, r, i + O, r, 2, n.deep);
                                                                }
                                                                else {
                                                                  if (a.g.side) {
                                                                    e.fatLine(S, i + O - 3, t, i + O - 1, r, 2, o.base);
                                                                    e.line(S, i + O - 4, t + 1, i + O - 2, r, n.base);
                                                                    u(S, [[i + O - 3, r + 1], [i + O, r + 1], [i + O + 2, b - 2], [i + O - 2, b - 2]], o.base);
                                                                    e.line(S, i + O - 3, r + 1, i + O - 2, b - 2, n.base);
                                                                    e.fatLine(S, i, r, i + O, r, 2, n.deep);
                                                                    e.line(S, i + 1, r - 1, i + O - 1, r - 1, n.base);
                                                                  }
                                                                  else {
                                                                    e.fatLine(S, i + 3, t, h - 2, t + 8, 2, o.base);
                                                                    e.fatLine(S, i + O - 3, t, h + 2, t + 8, 2, o.base);
                                                                    e.fatLine(S, h - 2, t + 8, h - 2, r, 2, o.base);
                                                                    e.fatLine(S, h + 2, t + 8, h + 2, r, 2, o.base);
                                                                    e.line(S, i + 5, t, h, t + 7, n.base);
                                                                    e.line(S, i + O - 5, t, h, t + 7, n.shade);
                                                                    e.line(S, i + 2, t + 1, h - 3, t + 9, n.shade);
                                                                    e.line(S, i + O - 2, t + 1, h + 3, t + 9, n.deep);
                                                                    e.fatLine(S, i, r, i + O, r, 2, n.deep);
                                                                    e.line(S, i + 1, r - 1, i + O - 1, r - 1, n.base);
                                                                    u(S, [[h - 4, r + 1], [h + 4, r + 1], [h + 5, b - 2], [h - 5, b - 2]], o.base);
                                                                    e.line(S, h - 4, r + 1, h - 5, b - 2, n.base);
                                                                    e.line(S, h + 4, r + 1, h + 5, b - 2, n.shade);
                                                                    e.line(S, h - 3, r + 2, h + 3, r + 2, n.hi);
                                                                    e.line(S, h - 3, r + 3, h - 3, b - 3, o.hi);
                                                                    QO(S, h - 2, r + 6, Fi, { W: "#f3f0e6", K: o.line }, !1);
                                                                    e.line(S, h - 3, r + 12, h + 3, r + 12, n.base);
                                                                  }
                                                                }
                                                                e.fatLine(S, i - 2, b - 1, i + O + 2, b - 1, 2, o.base);
                                                                e.line(S, i - 1, b - 2, i + O + 1, b - 2, n.base);
                                                              }(a, s);
                                                            }
                                                          else {
                                                            !function (a, s) {
                                                              var B = g.xich_ma_y;
                                                              var o = S.Palette.pick("SKIN", s.cfg.skin, "light");
                                                              var n = B.cloth;
                                                              var i = B.bone;
                                                              var O = B.rock;
                                                              var t = (B.lava, B.metal);
                                                              var h = s.torso;
                                                              var r = h.x;
                                                              var d = h.y;
                                                              var b = h.w;
                                                              var l = s.g.side;
                                                              var f = s.g.back;
                                                              var c = r + Math.floor(b / 2);
                                                              if (l) {
                                                                e.r(a, r + b - 4, d + 2, 3, 3, o.hi);
                                                                e.r(a, r + b - 4, d + 5, 4, 1, o.deep);
                                                                e.line(a, r + b - 5, d + 7, r + b - 2, d + 7, o.shade);
                                                                e.line(a, r + b - 5, d + 9, r + b - 2, d + 9, o.shade);
                                                                e.dot(a, r + b - 2, d + 3, o.deep);
                                                              }
                                                              else {
                                                                if (f) {
                                                                  e.line(a, c - 1, d + 1, c - 1, d + 11, o.deep);
                                                                  e.line(a, c, d + 1, c, d + 11, o.hi);
                                                                  e.line(a, r + 1, d + 3, c - 3, d + 6, o.shade);
                                                                  e.line(a, r + b - 2, d + 3, c + 2, d + 6, o.shade);
                                                                  e.line(a, r + 1, d + 8, c - 2, d + 10, o.shade);
                                                                  e.line(a, r + b - 2, d + 8, c + 1, d + 10, o.shade);
                                                                  e.dot(a, r + 1, d + 2, o.hi);
                                                                  e.dot(a, r + b - 2, d + 2, o.hi);
                                                                }
                                                                else {
                                                                  e.r(a, r + 1, d + 1, 3, 1, o.hi);
                                                                  e.r(a, r + b - 4, d + 1, 3, 1, o.hi);
                                                                  e.line(a, r, d + 5, r + 4, d + 5, o.deep);
                                                                  e.line(a, r + b - 5, d + 5, r + b - 1, d + 5, o.deep);
                                                                  e.line(a, c - 1, d + 1, c - 1, d + 9, o.deep);
                                                                  e.line(a, c, d + 2, c, d + 9, o.hi);
                                                                  e.dot(a, r + 2, d + 4, o.deep);
                                                                  e.dot(a, r + b - 3, d + 4, o.deep);
                                                                  e.line(a, r + 1, d + 2, r + 3, d + 6, o.line);
                                                                  e.dot(a, r + 2, d + 2, o.hi);
                                                                  e.r(a, r + 2, d + 7, 2, 1, o.deep);
                                                                  e.r(a, r + b - 4, d + 7, 2, 1, o.deep);
                                                                  e.r(a, r + 2, d + 9, 2, 1, o.deep);
                                                                  e.r(a, r + b - 4, d + 9, 2, 1, o.deep);
                                                                }
                                                              }
                                                              var G = r - 1;
                                                              var H = b + 2;
                                                              var x = d + 11;
                                                              e.r(a, G, x, H, 3, n.line);
                                                              e.r(a, G + 1, x + 1, H - 2, 1, n.base);
                                                              e.r(a, G + 1, x, H - 2, 1, n.hi);
                                                              if (!(f)) {
                                                                if (l) {
                                                                  e.r(a, r + b - 3, x - 1, 3, 4, i.line);
                                                                  e.r(a, r + b - 3, x, 2, 3, i.base);
                                                                  e.dot(a, r + b - 3, x, i.hi);
                                                                }
                                                                else {
                                                                  e.r(a, c - 2, x - 1, 4, 5, i.line);
                                                                  e.r(a, c - 1, x, 2, 4, i.base);
                                                                  e.dot(a, c - 1, x, i.hi);
                                                                  e.dot(a, c - 1, x + 1, i.line);
                                                                  e.dot(a, c, x + 1, i.line);
                                                                  e.dot(a, c, x + 3, i.shade);
                                                                  e.dot(a, G + 2, x + 1, t.base);
                                                                  e.dot(a, G + H - 3, x + 1, t.base);
                                                                  e.dot(a, G + 4, x + 1, t.shade);
                                                                  e.dot(a, G + H - 5, x + 1, t.shade);
                                                                }
                                                              }
                                                              var D = x + 3;
                                                              var W = s.p.sit ? Math.min(D + 5, 58) : Math.min(D + 11, 52);
                                                              var J = l ? 4 : 6;
                                                              var M = l ? r + b - 5 : c - 3;
                                                              if (u(a, [[M, D], [M + J, D], [M + J, W - 3], [M + J - 1, W], [M + J - 2, W - 2], [M + J - 3, W + 1], [M + 2, W - 2], [M + 1, W + 1], [M, W - 2]], n.base), e.line(a, M, D, M, W - 3, n.hi), e.line(a, M + J, D, M + J, W - 3, n.deep), e.line(a, M + J - 2, D + 1, M + J - 2, W - 4, n.shade), e.line(a, M, W - 2, M + 1, W + 1, n.line), e.line(a, M + J - 1, W, M + J - 3, W + 1, n.line), !l) {
                                                                for (var w = 0; w < 2; w++) {
                                                                  var N = w ? r + b - 1 : r - 2;
                                                                  e.r(a, N, x + 3, 2, 5, O.line);
                                                                  e.r(a, N + (w ? 0 : 1), x + 3, 1, 4, O.base);
                                                                  e.dot(a, N + (w ? 0 : 1), x + 3, O.hi);
                                                                  e.dot(a, N + (w ? 1 : 0), x + 8, O.line);
                                                                }
                                                              }
                                                            }(a, s);
                                                          }
                                                        else {
                                                          !function (e, a) {
                                                            var s = a.torso;
                                                            var B = xS(a);
                                                            var o = a.g.side;
                                                            var n = a.g.back;
                                                            var i = GB(a);
                                                            var O = s.y + 15;
                                                            var t = a.p.sit ? Math.max(6, 61 - O) : 99;
                                                            if (o) {
                                                              as(e, s.x - 3, O, NS.slice(0, t), B, !1, xB(HB(a), 3, 10));
                                                              return void as(e, s.x - 3, s.y - 3, wS, B, !1);
                                                            }
                                                            if (as(e, s.x - 4, O, JS.slice(0, t), B, !1, xB(i, 3, 10)), n) {
                                                              as(e, s.x - 4, s.y - 3, uS, B, !1);
                                                              return void as(e, s.x - 2, s.y + 1, MS, B, !1);
                                                            }
                                                            as(e, s.x - 4, s.y - 3, WS, B, !1);
                                                            var h = a.arms[0];
                                                            if (!(h.front || h.over)) {
                                                              p(e, h, S.Palette.pick("SKIN", a.cfg.skin, "light"), !0);
                                                              DS(e, h);
                                                            }
                                                          }(a, s);
                                                        }
                                                      else {
                                                        !function (S, e) {
                                                          var a = e.torso;
                                                          var s = iS(e);
                                                          var B = e.g.side;
                                                          var o = e.g.back;
                                                          var n = GB(e);
                                                          var i = a.y + 14;
                                                          var O = e.p.sit ? Math.max(6, 61 - i) : 99;
                                                          var t = e.p.sit ? 5 : fS.length;
                                                          if (B) {
                                                            var h = HB(e);
                                                            as(S, a.x - 5, i, lS.slice(0, O), s, !1, xB(h, 3, 10));
                                                            as(S, a.x - 3, a.y - 3, bS, s, !1);
                                                            return void as(S, a.x + 1, a.y + 13, fS.slice(0, t), s, !1, xB(-h, 3, 6));
                                                          }
                                                          as(S, a.x - 7, i, (o ? rS : hS).slice(0, O), s, !1, xB(n, 3, 10));
                                                          as(S, a.x - 6, a.y - 3, o ? dS : OS, s, !1);
                                                          as(S, a.x, o ? a.y + 1 : a.y + 8, tS, s, !1);
                                                          as(S, a.x - 2, a.y + 13, fS.slice(0, t), s, !1, xB(-n, 3, 6));
                                                          as(S, a.x + a.w - 1, a.y + 13, fS.slice(0, t), s, !1, xB(-n, 3, 6));
                                                          if (!(e.arms[0].front || e.arms[0].over)) {
                                                            gS(S, e, 0);
                                                          }
                                                        }(a, s);
                                                      }
                                                    else {
                                                      !function (S, a) {
                                                        var s = a.torso;
                                                        var B = a.material.cloth;
                                                        var o = a.material.trim;
                                                        var n = a.material.pants;
                                                        var i = a.material.accent;
                                                        var O = s.x - 2;
                                                        var t = s.w + 4;
                                                        var h = s.y - 1;
                                                        var r = O + Math.floor(t / 2);
                                                        var d = h + 14;
                                                        var b = a.p.sit ? Math.max(a.legs[0].knee, a.legs[1].knee) + 2 : Math.min(59, Math.max(a.legs[0].knee, a.legs[1].knee) + 6);
                                                        var l = 0 | a.p.leg;
                                                        u(S, [[O + 2, h], [O + t - 3, h], [O + t, h + 5], [O + t - 1, d], [O + t + 2, b - 1], [r + 2, b], [r, d + 4], [r - 2, b], [O - 2, b - 1], [O + 1, d], [O, h + 5]], B.line);
                                                        u(S, [[O + 2, h + 1], [O + t - 3, h + 1], [O + t - 1, h + 6], [O + t - 2, d], [O + t + 1, b - 2], [r + 3, b - 1], [r, d + 1], [r - 3, b - 1], [O - 1, b - 2], [O + 2, d], [O + 1, h + 6]], B.base);
                                                        u(S, [[r - 3, h + 3], [r + 3, h + 3], [r + 3, b - 1], [r - 3, b - 1]], n.line);
                                                        e.line(S, r, h + 6, r, b - 2, n.shade);
                                                        if (a.g.back) {
                                                          u(S, [[O + 2, h + 1], [O + t - 3, h + 1], [O + t - 1, h + 8], [r, h + 12], [O + 1, h + 8]], B.hi);
                                                          e.line(S, O + 1, h + 8, r, h + 12, i.deep);
                                                          e.line(S, r, h + 12, O + t - 1, h + 8, i.base);
                                                          e.r(S, r - 2, h + 4, 5, 3, B.base);
                                                          e.line(S, r - 2, h + 5, r, h + 3, i.base);
                                                          e.line(S, r, h + 3, r + 2, h + 5, i.hi);
                                                          e.dot(S, r, h + 7, i.deep);
                                                          u(S, [[O + 2, d + 1], [r - 1, d + 1], [r - 1, b - 2], [O - 1, b - 2]], B.hi);
                                                          u(S, [[r + 1, d + 1], [O + t - 2, d + 1], [O + t + 1, b - 2], [r + 1, b - 2]], B.base);
                                                          e.line(S, r, d + 4, r, b - 1, B.deep);
                                                        }
                                                        else {
                                                          if (a.g.side) {
                                                            u(S, [[O + 2, h + 1], [O + t - 3, h + 1], [O + t - 1, h + 6], [O + 4, h + 11], [O + 1, h + 7]], B.hi);
                                                            e.line(S, O + 1, h + 7, O + 4, h + 11, i.deep);
                                                            e.line(S, O + 4, h + 11, O + t - 1, h + 6, i.base);
                                                            e.fatLine(S, O + t - 3, h + 1, O + t - 2, d - 2, 2, n.line);
                                                            e.line(S, O + t - 4, h + 2, O + t - 3, d - 3, i.hi);
                                                            u(S, [[O + 2, d + 1], [O + t - 3, d + 1], [O + t, b - 3], [O - 1 + l, b - 2]], B.hi);
                                                            e.line(S, O + 3, d + 3, O + 1 + l, b - 3, B.shade);
                                                            e.line(S, O + t - 3, d + 3, O + t, b - 2, i.deep);
                                                            e.line(S, O + t - 2, d + 3, O + t + 1, b - 2, i.hi);
                                                            e.fatLine(S, O + t - 4, d + 2, O + t - 4 + l, b - 4, 2, o.deep);
                                                            e.line(S, O + t - 4, d + 3, O + t - 4 + l, b - 5, o.base);
                                                          }
                                                          else {
                                                            e.r(S, r - 3, h, 7, 4, n.line);
                                                            u(S, [[O + 2, h], [r - 1, h + 6], [r, h + 12], [O + 2, h + 8]], B.hi);
                                                            u(S, [[O + t - 3, h], [r + 1, h + 6], [r, h + 12], [O + t - 2, h + 8]], B.hi);
                                                            e.line(S, O + 3, h + 1, r, h + 8, i.base);
                                                            e.line(S, O + t - 4, h + 1, r + 1, h + 8, i.hi);
                                                            e.line(S, r, h + 8, r, d - 2, i.deep);
                                                            u(S, [[O + 2, d + 1], [r - 3, d + 1], [r - 4 + l, b - 2], [O - 1, b - 2]], B.hi);
                                                            u(S, [[r + 3, d + 1], [O + t - 2, d + 1], [O + t + 1, b - 2], [r + 4 - l, b - 2]], B.base);
                                                            e.line(S, O + 2, d + 4, O, b - 3, B.shade);
                                                            e.line(S, O + t - 2, d + 3, O + t, b - 3, B.hi);
                                                            e.fatLine(S, r - 2, d + 2, r - 2 + l, b - 3, 2, o.deep);
                                                            e.line(S, r - 2, d + 3, r - 2 + l, b - 4, o.base);
                                                            e.fatLine(S, r + 2, d + 2, r + 2 - l, b - 3, 2, o.base);
                                                            e.line(S, r + 3, d + 3, r + 3 - l, b - 4, o.hi);
                                                            e.line(S, r - 4, d + 3, r - 5 + l, b - 2, i.base);
                                                            e.line(S, r + 4, d + 3, r + 5 - l, b - 2, i.hi);
                                                          }
                                                        }
                                                        e.r(S, O + 1, d - 1, t - 1, 3, o.line);
                                                        e.line(S, O + 1, d - 1, O + t - 1, d - 1, o.hi);
                                                        e.line(S, O + 2, d, O + t - 2, d, o.base);
                                                        if (a.g.side || a.g.back) {
                                                          if (a.g.side) {
                                                            e.r(S, O + t - 2, d - 1, 2, 2, i.base);
                                                            e.dot(S, O + t - 1, d - 1, i.hi);
                                                          }
                                                          else {
                                                            e.r(S, r - 1, d, 3, 3, o.deep);
                                                            e.line(S, r, d + 3, r - 2, b - 5, o.base);
                                                          }
                                                        }
                                                        else {
                                                          e.r(S, r - 2, d - 2, 5, 4, i.deep);
                                                          e.r(S, r - 1, d - 2, 3, 3, i.base);
                                                          e.dot(S, r, d - 1, i.hi);
                                                        }
                                                        e.line(S, O - 1, b - 2, r - 4, b - 2, i.base);
                                                        e.line(S, r + 4, b - 2, O + t + 1, b - 2, i.hi);
                                                        e.line(S, O + 2, b - 8, O + 1, b - 5, i.deep);
                                                        e.line(S, O + 1, b - 5, O + 3, b - 4, i.base);
                                                        e.dot(S, O + 3, b - 6, B.hi);
                                                        e.line(S, O + t - 3, b - 8, O + t - 2, b - 5, i.base);
                                                        e.dot(S, O + t - 4, b - 4, i.hi);
                                                      }(a, s);
                                                    }
                                                  else {
                                                    !function (S, e) {
                                                      var a = e.torso;
                                                      var s = V(e);
                                                      var B = e.g.side;
                                                      var o = e.g.back;
                                                      var n = GB(e);
                                                      var i = a.y + 15;
                                                      var O = Math.min(oS(e, e.legs[0]), oS(e, e.legs[1]));
                                                      var t = 59 - eS.length;
                                                      var h = Math.max(0, i - t);
                                                      if (B) {
                                                        if (e.p.sit) {
                                                          as(S, a.x - 5, t + h, sS.slice(h), s, !1);
                                                        }
                                                        else {
                                                          xs(S, a.x - 4, i, O, SS, 7, s, xB(HB(e), 4, 12));
                                                        }
                                                        return void as(S, a.x - 2, a.y - 2, $, s, !1);
                                                      }
                                                      if (e.p.sit ? as(S, a.x - 6, t + h, (o ? aS : eS).slice(h), s, !1) : xs(S, a.x - 3, i, O, o ? I : P, 7, s, xB(n, 4, 14)), as(S, a.x - 2, a.y - 2, o ? Z : F, s, !1), o) {
                                                        var r = e.p.sit ? 8 : T.length;
                                                        as(S, a.x + 2, a.y + 13, T.slice(0, r), s, !1, xB(n, 4, 14));
                                                        as(S, a.x + 7, a.y + 13, T.slice(0, r), s, !0, xB(n, 4, 14));
                                                      }
                                                      if (!(e.arms[0].front || e.arms[0].over)) {
                                                        BS(S, e, 0);
                                                      }
                                                    }(a, s);
                                                  }
                                                else {
                                                  !function (S, e) {
                                                    var a = e.torso;
                                                    var s = function (S) {
                                                      var e = S.material;
                                                      var a = {};
                                                      k(a, "xXjJil", e.cloth);
                                                      k(a, "kKmMv", e.band);
                                                      k(a, "NngGYy", e.trim);
                                                      k(a, "QqceE", e.pants);
                                                      k(a, "zZuUw", e.sash);
                                                      a.a = e.jade.deep;
                                                      a.A = e.jade.base;
                                                      a.h = e.jade.hi;
                                                      a.r = e.red.deep;
                                                      a.R = e.red.base;
                                                      a.H = e.red.hi;
                                                      return m(a, S);
                                                    }(e);
                                                    var B = e.g.side;
                                                    var o = e.g.back;
                                                    var n = GB(e);
                                                    var i = a.y + 15;
                                                    var O = Math.min(R(e, e.legs[0]), R(e, e.legs[1]));
                                                    var t = 61 - Q.length;
                                                    var h = Math.max(0, i - t);
                                                    if (B) {
                                                      var r = HB(e);
                                                      if (e.p.sit) {
                                                        as(S, a.x - 5, t + h, Y.slice(h), s, !1);
                                                      }
                                                      else {
                                                        xs(S, a.x - 3, i, O, X, 7, s, xB(r, 4, 12));
                                                      }
                                                      as(S, a.x - 2, a.y - 2, U, s, !1);
                                                      var d = e.p.sit ? 7 : A.length;
                                                      as(S, a.x + 7, a.y + 15, A.slice(0, d), s, !1, xB(-r, 3, 6));
                                                    }
                                                    else {
                                                      if (e.p.sit && as(S, a.x - 6, t + h, (o ? _ : Q).slice(h), s, !1), o) {
                                                        if (!(e.p.sit)) {
                                                          xs(S, a.x - 3, i, O, K, 7, s, xB(n, 4, 14));
                                                        }
                                                        as(S, a.x - 2, a.y - 2, E, s, !1);
                                                        as(S, a.x + 1, a.y + 1, q, s, !1);
                                                      }
                                                      else {
                                                        if (!(e.p.sit)) {
                                                          xs(S, a.x - 3, i, O, C, 7, s, xB(n, 4, 14));
                                                        }
                                                        as(S, a.x - 2, a.y - 2, L, s, !1);
                                                        var b = e.p.sit ? 6 : j.length;
                                                        as(S, a.x + 1, i, j.slice(0, b), s, !1, xB(-n, 3, 7));
                                                        as(S, a.x + 8, i, j.slice(0, b), s, !0, xB(-n, 3, 7));
                                                      }
                                                      if (!(e.arms[0].front || e.arms[0].over)) {
                                                        z(S, e, 0);
                                                      }
                                                    }
                                                  }(a, s);
                                                }
                                              else {
                                                !function (S, e) {
                                                  var a = e.torso;
                                                  var s = vS(e);
                                                  var B = e.g.side;
                                                  var o = e.g.back;
                                                  var n = GB(e);
                                                  var i = a.y + 15;
                                                  var O = Math.min(US(e, e.legs[0]), US(e, e.legs[1]));
                                                  var t = 61 - qS.length;
                                                  var h = Math.max(0, i - t);
                                                  if (B) {
                                                    if (e.p.sit) {
                                                      as(S, a.x - 5, t + h, KS.slice(h), s, !1);
                                                    }
                                                    else {
                                                      xs(S, a.x - 3, i, O, ES, 7, s, xB(HB(e), 4, 12));
                                                    }
                                                    return void as(S, a.x - 2, a.y - 2, YS, s, !1);
                                                  }
                                                  if (e.p.sit) {
                                                    as(S, a.x - 6, t + h, qS.slice(h), s, !1);
                                                  }
                                                  else {
                                                    xs(S, a.x - 3, i, O, o ? _S : AS, 7, s, xB(n, 4, 14));
                                                  }
                                                  as(S, a.x - 3, a.y - 2, o ? QS : jS, s, !1);
                                                  if (!(e.arms[0].front || e.arms[0].over)) {
                                                    XS(S, e, 0);
                                                  }
                                                }(a, s);
                                              }
                                            }
                                            else {
                                              !function (S, e) {
                                                var a = e.torso;
                                                var s = function (S) {
                                                  var e = S.material;
                                                  var a = {};
                                                  k(a, "oOsSWw", e.cloth);
                                                  k(a, "qQcCV", e.trim);
                                                  k(a, "xXjJi", e.pants);
                                                  a.w = "#e6f4f6";
                                                  a.r = "#8a4a46";
                                                  a.R = "#c27a70";
                                                  a.a = "#4f9a78";
                                                  a.A = "#a8e0c0";
                                                  return m(a, S);
                                                }(e);
                                                var B = e.g.side;
                                                var o = e.g.back;
                                                var n = GB(e);
                                                var i = a.y + 15;
                                                var O = Math.min(Ye(e, e.legs[0]), Ye(e, e.legs[1]));
                                                var t = 58 - je.length;
                                                var h = Math.max(0, i - t);
                                                if (B) {
                                                  if (e.p.sit) {
                                                    as(S, a.x - 5, t + h, Qe.slice(h), s, !1);
                                                  }
                                                  else {
                                                    xs(S, a.x - 4, i, O, Ce, 7, s, xB(HB(e), 4, 12));
                                                  }
                                                  return void as(S, a.x - 2, a.y - 2, Le, s, !1);
                                                }
                                                if (e.p.sit) {
                                                  as(S, a.x - 6, t + h, (o ? Ae : je).slice(h), s, !1);
                                                }
                                                else {
                                                  xs(S, a.x - 3, i, O, o ? ve : me, 7, s, xB(n, 4, 14));
                                                }
                                                as(S, a.x - 2, a.y - 2, o ? ye : pe, s, !1);
                                                if (!(o)) {
                                                  as(S, a.x + 3, a.y + 13, ke.slice(0, e.p.sit ? 6 : ke.length), s, !1, xB(-n, 3, 6));
                                                }
                                                if (!(e.arms[0].front || e.arms[0].over)) {
                                                  _e(S, e, 0);
                                                }
                                              }(a, s);
                                            }
                                          else {
                                            !function (S, e) {
                                              var a = e.torso;
                                              var s = function (S) {
                                                var e = S.material;
                                                var a = {};
                                                k(a, "bBsSHl", e.cloth);
                                                k(a, "oOcCW", e.bone);
                                                k(a, "xXjJi", e.pants);
                                                a.t = e.trim.shade;
                                                a.T = e.trim.base;
                                                a.k = e.ink.line;
                                                a.K = e.ink.base;
                                                a.m = e.ink.hi;
                                                return m(a, S);
                                              }(e);
                                              var B = e.g.side;
                                              var o = e.g.back;
                                              var n = GB(e);
                                              var i = a.y + 15;
                                              if (B) {
                                                var O = Math.min(ze(e, e.legs[0]), ze(e, e.legs[1]));
                                                xs(S, a.x - 3, i, O, Xe, 7, s, xB(HB(e), 4, 12));
                                                return void as(S, a.x - 2, a.y - 2, Ke, s, !1);
                                              }
                                              for (var t = 0; t < 2; t++) {
                                                var h = e.legs[t];
                                                var r = e.p.sit ? t ? 2 : -2 : h.x - e.g.legs[t].x;
                                                so(S, t ? a.x + a.w + 2 + r : a.x - 3 + r, i, ze(e, h), Ue, 7, s, 1 === t, xB(n, 4, 14));
                                              }
                                              as(S, a.x - 2, a.y - 2, o ? qe : Ee, s, !1);
                                              if (!(e.arms[0].front || e.arms[0].over)) {
                                                Re(S, e, 0);
                                              }
                                            }(a, s);
                                          }
                                        else {
                                          !function (S, a) {
                                            var s = a.torso;
                                            var B = a.material.cloth;
                                            var o = a.material.trim;
                                            var n = a.material.accent;
                                            var i = s.x - 2;
                                            var O = s.w + 4;
                                            var t = s.y - 1;
                                            var h = i + Math.floor(O / 2);
                                            var r = t + s.h - 3;
                                            if (M(S, i, t, O, r - t + 1, B), a.g.back) {
                                              e.r(S, h - 3, t, 6, 3, n.deep);
                                              e.line(S, i + 1, t + 2, h, t + 5, o.deep);
                                              e.line(S, h, t + 5, i + O - 2, t + 2, o.base);
                                            }
                                            else {
                                              var d = a.g.side ? h + 1 : h;
                                              e.r(S, d - 2, t - 1, 4, 4, B.line);
                                              e.line(S, d - 2, t, d, t + 3, o.shade);
                                              e.line(S, d + 2, t, d, t + 3, o.hi);
                                              e.fatLine(S, i + 2, t + 1, d + 1, t + 9, 3, n.deep);
                                              e.line(S, i + 2, t + 1, d + 1, t + 9, n.hi);
                                              e.fatLine(S, i + O - 3, t + 1, d - 3, r - 1, 3, B.line);
                                              e.line(S, i + O - 2, t + 1, d - 2, r - 1, o.base);
                                              e.line(S, i + O - 4, t + 2, d - 4, r - 2, o.deep);
                                              for (var b = 0; b < (a.g.side ? 1 : 2); b++) {
                                                var l = a.g.side || b ? i + O - 2 : i + 1;
                                                e.r(S, l - 1, t + 3, 3, r - t - 3, n.shade);
                                                e.r(S, l - 1, t + 3, 3, 3, o.deep);
                                                e.r(S, l, t + 3, 1, 3, o.hi);
                                                e.line(S, l - 1, t + 4, l + 1, t + 4, o.base);
                                                e.line(S, l, t + 7, l - 1, t + 9, o.shade);
                                                e.line(S, l - 1, t + 9, l, t + 11, o.base);
                                                e.line(S, l, t + 7, l + 1, t + 9, o.base);
                                                e.line(S, l + 1, t + 9, l, t + 11, o.deep);
                                              }
                                            }
                                            for (var f = 0; f < 2; f++) {
                                              var c = a.legs[f];
                                              var G = a.p.sit ? f ? 2 : -2 : c.x - a.g.legs[f].x;
                                              var H = a.p.sit ? 58 : Math.min(58, c.foot - 4);
                                              var g = f ? 3 : -3;
                                              var x = f ? h + 1 : i;
                                              var D = f ? i + O - 1 : h - 1;
                                              u(S, [[x - 1, r], [D + 1, r], [D + G + g + 1, H - 1], [x + G + g - 1, H]], n.shade);
                                              u(S, [[x, r], [D, r], [D + G + g, H - 1], [x + G + g, H - 1]], f ? B.base : B.deep);
                                              e.line(S, x + 1, r + 3, x + G + g + 1, H - 3, B.hi);
                                              e.line(S, D - 1, r + 2, D + G + g - 1, H - 3, B.line);
                                              var W = f ? x : D;
                                              var J = W + G + g;
                                              e.line(S, W, r + 2, J, H - 1, o.shade);
                                              e.line(S, x + G + g, H - 1, D + G + g, H - 1, o.deep);
                                              var w = f ? D + G + g - 2 : x + G + g + 2;
                                              var N = H - 5;
                                              e.line(S, w, N - 2, w + (f ? -2 : 2), N, o.base);
                                              e.line(S, w + (f ? -2 : 2), N, w, N + 2, o.shade);
                                              e.dot(S, w + (f ? 1 : -1), N + 1, o.hi);
                                              var p = f ? i + O : i - 1;
                                              var k = p + G + (f ? 3 : -3);
                                              e.line(S, p, r - 2, k, H - 6, n.base);
                                              e.line(S, p, r - 1, k + (f ? -1 : 1), H - 5, n.deep);
                                            }
                                            e.r(S, i, r, O, 3, B.line);
                                            e.line(S, i, r, i + O - 1, r, o.deep);
                                            e.line(S, i + 1, r + 2, i + O - 2, r + 2, n.shade);
                                            var m = a.g.side ? h + 3 : h;
                                            if (!a.g.back) {
                                              e.r(S, m - 2, r - 1, 5, 4, o.deep);
                                              e.r(S, m - 1, r - 1, 3, 3, o.base);
                                              e.dot(S, m, r, n.base);
                                              e.dot(S, m, r - 1, o.hi);
                                              var v = Math.min(56, r + 12);
                                              u(S, [[m - 2, r + 3], [m + 2, r + 3], [m + 2, v - 2], [m, v], [m - 2, v - 2]], n.shade);
                                              e.line(S, m, r + 4, m, v - 3, o.shade);
                                              e.dot(S, m - 1, v - 2, o.hi);
                                              e.dot(S, m + 1, v - 2, o.base);
                                            }
                                          }(a, s);
                                        }
                                      else {
                                        !function (S, a) {
                                          var s = a.torso;
                                          var B = a.material.cloth;
                                          var o = a.material.trim;
                                          var n = a.material.accent;
                                          var i = s.x - 5;
                                          var O = s.w + 10;
                                          var t = s.y - 3;
                                          var h = i + Math.floor(O / 2);
                                          var r = t + 15;
                                          var d = a.p.sit ? Math.min(58, Math.max(a.legs[0].knee, a.legs[1].knee) + 2) : Math.min(55, Math.max(a.legs[0].knee, a.legs[1].knee) - 1);
                                          var b = 0 | a.p.leg;
                                          if (u(S, [[i + 2, t], [i + O - 2, t], [i + O + 1, t + 7], [h + 6, r], [h + 8, d], [h + 2, d + 1], [h, r + 3], [h - 2, d + 1], [h - 8, d], [h - 6, r], [i - 1, t + 7]], B.line), u(S, [[i + 3, t + 1], [i + O - 3, t + 1], [i + O - 1, t + 7], [h + 5, r], [h + 7, d - 1], [h + 2, d], [h, r + 1], [h - 2, d], [h - 7, d - 1], [h - 5, r], [i + 1, t + 7]], B.base), a.g.back) {
                                            e.r(S, h - 5, t + 2, 10, 3, B.deep);
                                            e.line(S, i + 3, t + 4, h, t + 9, o.base);
                                            e.line(S, h, t + 9, i + O - 3, t + 4, o.hi);
                                            e.line(S, h, r + 1, h, d - 2, o.base);
                                            for (var l = 0; l < 3; l++)
                                              e.line(S, h - 4, t + 10 + 4 * l, h + 4, t + 10 + 4 * l, n.shade), e.dot(S, h, t + 11 + 4 * l, o.hi);
                                          }
                                          else {
                                            u(S, [[i + 4, t], [h + 1, t + 10], [h - 1, t + 10], [i + O - 5, t]], "#eef2ef");
                                            e.line(S, i + 4, t, h, t + 9, "#b9cbd3");
                                            e.line(S, i + O - 5, t, h + 1, t + 9, "#ffffff");
                                            e.r(S, h - 4, t + 1, 8, 3, B.deep);
                                            e.line(S, h - 2, r + 2, h - 5 + b, d - 1, o.base);
                                            e.line(S, h + 2, r + 2, h + 5 - b, d - 1, o.hi);
                                            e.line(S, i + 1, r + 6, i - 1, d - 2, o.hi);
                                            e.line(S, i + O - 1, r + 6, i + O + 1, d - 2, o.base);
                                            for (var f = 0; f < 2; f++) {
                                              var c = f ? i + O - 3 : i + 3;
                                              var G = f ? 1 : -1;
                                              e.line(S, c, r + 9, c + 2 * G, r + 13, o.hi);
                                              e.line(S, c + 2 * G, r + 13, c + G, r + 17, o.base);
                                              e.line(S, c + G, r + 17, c + 3 * G, r + 20, o.hi);
                                              e.dot(S, c + 3 * G, r + 20, o.shade);
                                            }
                                          }
                                          e.r(S, i + 1, r - 1, O - 2, 4, "#241923");
                                          e.line(S, i + 2, r - 1, i + O - 3, r - 1, o.hi);
                                          e.line(S, i + 2, r + 2, i + O - 3, r + 2, B.deep);
                                          if (!(a.g.back)) {
                                            e.r(S, h - 3, r - 2, 7, 5, o.deep);
                                            e.r(S, h - 2, r - 2, 5, 4, o.base);
                                            e.dot(S, h, r - 1, o.hi);
                                            e.dot(S, h, r + 1, "#fff0a3");
                                          }
                                          for (var H = -1; H <= 1; H += 2) {
                                            var g = h + 7 * H;
                                            u(S, [[g - 3, t + 2], [g - 1, t - 3], [g + 1, t + 1], [g + 4, t - 2], [g + 3, t + 4], [g, t + 2], [g - 3, t + 5]], o.deep);
                                            e.line(S, g - 1, t - 2, g, t + 1, o.hi);
                                            e.line(S, g, t + 1, g + 3, t - 1, o.base);
                                            e.dot(S, g + 2, t + 3, o.hi);
                                          }
                                        }(a, s);
                                      }
                                    else {
                                      !function (S, a) {
                                        if ($S(a)) {
                                          !function (S, e) {
                                            var a = he;
                                            var s = e.torso.x - 11;
                                            var B = 0 | e.dy;
                                            Se(S, s + 7, 37, fe, a, 0);
                                            Se(S, s + 11, 22, be, a, B);
                                            Se(S, s + 10, 35, le, a, B);
                                            Se(S, s + 4, 42, He, a, B);
                                          }(S, a);
                                        }
                                        else {
                                          var s = "#090b10";
                                          var B = "#12151d";
                                          var o = "#292d38";
                                          var n = "#291b14";
                                          var i = "#4a3324";
                                          var O = "#4a2d20";
                                          var t = "#745039";
                                          var h = "#9a6a48";
                                          var r = "#c49a6a";
                                          var d = a.torso;
                                          var b = d.x - 3;
                                          var l = d.w + 6;
                                          var f = d.y - 1;
                                          var c = b + Math.floor(l / 2);
                                          var G = f + 15;
                                          var H = Math.min(59, Math.max(a.legs[0].knee, a.legs[1].knee) + 5);
                                          u(S, [[b + 2, f], [b + l - 2, f], [b + l + 1, f + 4], [b + l - 1, G + 1], [b + 1, G + 1], [b - 1, f + 4]], o);
                                          e.r(S, b + 1, f + 5, 2, G - f - 4, s);
                                          e.r(S, b + l - 2, f + 5, 2, G - f - 4, B);
                                          e.r(S, b + 3, f + 2, l - 6, 2, "#3c424e");
                                          e.r(S, b + 3, f + 5, l - 6, 2, B);
                                          e.r(S, c - 3, f - 1, 6, 4, B);
                                          e.r(S, c - 2, f, 4, 2, o);
                                          e.line(S, b + 3, f + 8, b + 4, G - 2, "#20242e");
                                          e.line(S, b + l - 4, f + 8, b + l - 5, G - 2, s);
                                          u(S, [[b + 1, G], [c, G], [c - 2, H], [b - 2, H - 1], [b, H - 5]], "#654833");
                                          u(S, [[c, G], [b + l - 1, G], [b + l + 2, H - 2], [c + 2, H], [c + 1, H - 4]], "#76553a");
                                          e.line(S, b + 2, G + 2, b - 1, H - 2, i);
                                          e.line(S, c - 1, G + 2, c - 2, H - 1, n);
                                          e.line(S, c + 1, G + 2, c + 2, H - 1, "#9a7350");
                                          e.line(S, b + l - 2, G + 2, b + l + 1, H - 2, i);
                                          e.line(S, b - 1, H - 1, c - 2, H, n);
                                          e.line(S, c + 2, H, b + l + 2, H - 2, n);
                                          e.r(S, b - 2, G - 2, l + 4, 4, O);
                                          e.line(S, b - 1, G - 2, b + l + 1, G - 2, r);
                                          e.line(S, b - 1, G + 1, b + l + 1, G + 1, "#241711");
                                          e.r(S, c - 3, G - 3, 7, 6, h);
                                          e.r(S, c - 2, G - 2, 5, 4, t);
                                          e.line(S, c - 1, G - 2, c + 1, G + 1, r);
                                          e.line(S, c + 1, G - 2, c - 1, G + 1, O);
                                          e.r(S, b - 5, G - 1, 5, 7, t);
                                          e.r(S, b - 4, G, 3, 4, h);
                                          e.line(S, b - 4, G + 1, b - 2, G + 1, r);
                                          e.r(S, c + 3, G + 2, 2, 8, O);
                                          e.line(S, c + 3, G + 3, c + 4, G + 8, r);
                                          e.r(S, c + 3, G + 9, 3, 5, "#2b806f");
                                          e.r(S, c + 4, G + 9, 2, 4, "#55b89a");
                                          e.dot(S, c + 4, G + 9, "#b7f3d3");
                                        }
                                      }(a, s);
                                    }
                                  else {
                                    !function (S, e) {
                                      var a = e.torso;
                                      var s = Te(e);
                                      var B = e.g.side;
                                      var o = e.g.back;
                                      var n = GB(e);
                                      var i = a.y + 15;
                                      var O = Math.min(ia(e, e.legs[0]), ia(e, e.legs[1]));
                                      if (B) {
                                        xs(S, a.x - 4, i, O, sa, 7, s, xB(HB(e), 4, 12));
                                        return void as(S, a.x - 2, a.y - 2, $e, s, !1);
                                      }
                                      xs(S, a.x - 4, i, O, o ? aa : ea, 7, s, xB(n, 4, 14));
                                      as(S, a.x - 2, a.y - 2, o ? Ie : Ze, s, !1);
                                      if (!(o)) {
                                        as(S, a.x + 1, a.y + 9, Sa, s, !1);
                                      }
                                      if (!(e.arms[0].front || e.arms[0].over)) {
                                        na(S, e, 0);
                                      }
                                    }(a, s);
                                  }
                                else {
                                  !function (S, a) {
                                    var s = a.torso;
                                    var B = s.x;
                                    var o = s.w;
                                    var n = s.y;
                                    var i = B + Math.floor(o / 2);
                                    var O = n + s.h - 5;
                                    var t = a.material.cloth;
                                    var h = a.material.trim;
                                    var r = a.material.accent;
                                    if (!(a.g.back)) {
                                      e.line(S, B + 2, n, B + 2, n + 7, h.deep);
                                      e.line(S, B + o - 3, n, B + o - 4, n + 7, h.base);
                                    }
                                    e.r(S, B, n + 7, o, 5, r.shade);
                                    e.line(S, B, n + 7, B + o - 1, n + 9, r.hi);
                                    e.line(S, B, n + 10, B + o - 1, n + 8, r.base);
                                    e.line(S, B + 1, n + 11, B + o - 2, n + 10, r.deep);
                                    for (var d = 0; d < 2; d++) {
                                      var b = a.legs[d];
                                      var l = a.p.sit ? d ? 2 : -2 : b.x - a.g.legs[d].x;
                                      var f = a.p.sit ? 60 : Math.min(58, b.foot - 4);
                                      var c = d ? 1 : -1;
                                      var G = d ? B + o : B - 1;
                                      var H = i + c;
                                      var g = G + 4 * c + l;
                                      var x = H + c + l;
                                      u(S, [[G, O], [H, O], [x, f], [g - c, f - 1], [g + c, f], [g, f - 4]], t.line);
                                      u(S, [[G, O + 2], [H, O + 2], [x, f - 1], [g - c, f - 2], [g, f - 3]], d ? t.base : t.shade);
                                      e.line(S, G, O + 4, g, f - 3, h.deep);
                                      e.line(S, H, O + 5, x, f - 1, h.base);
                                      e.line(S, g, f - 3, g - c, f - 1, h.base);
                                      e.line(S, g - c, f - 1, x, f - 1, h.shade);
                                      e.line(S, G - c, O + 3, g - 2 * c, f - 5, t.hi);
                                      if (f - O > 10) {
                                        e.line(S, g - 2 * c, f - 7, g - c, f - 4, h.base);
                                        e.line(S, g - 2 * c, f - 7, g - 3 * c, f - 9, h.shade);
                                        e.dot(S, g - 3 * c, f - 6, h.hi);
                                      }
                                    }
                                    e.r(S, B - 1, O - 2, o + 2, 5, "#111922");
                                    for (var D = 0; D < 2; D++)
                                      for (var W = 0; W < Math.floor(o / 3); W++) {
                                        var J = B + 3 * W + D % 2;
                                        var M = O - 2 + 2 * D;
                                        e.line(S, J, M, J + 1, M + 1, "#647782");
                                        e.dot(S, J + 2, M, "#334551");
                                      }
                                    e.line(S, B - 1, O + 3, B + o, O + 1, h.deep);
                                    for (var w = 0; w < o; w += 2)
                                      e.dot(S, B + w, O + 2, h.base);
                                    var N = a.g.side ? B + 1 : B + 2;
                                    e.r(S, N, O + 2, 3, 3, h.deep);
                                    e.dot(S, N + 1, O + 3, h.hi);
                                    e.line(S, N + 1, O + 5, N - 2 + (0 | a.p.leg), Math.min(60, O + 12), h.base);
                                    e.line(S, N + 2, O + 5, N + (0 | a.p.leg), Math.min(59, O + 10), h.shade);
                                    if (!(a.g.back)) {
                                      e.line(S, i - 2, O + 5, i, Math.min(59, O + 8), "#8d91a0");
                                      e.line(S, i, Math.min(59, O + 8), B + o - 1, O + 6, "#c3c9d1");
                                    }
                                  }(a, s);
                                }
                              else {
                                !function (S, e) {
                                  var a = e.torso;
                                  var s = ha(e);
                                  var B = e.g.side;
                                  var o = e.g.back;
                                  var n = GB(e);
                                  var i = a.y + 15;
                                  var O = Math.min(Wa(e, e.legs[0]), Wa(e, e.legs[1]));
                                  if (B) {
                                    xs(S, a.x - 4, i, O, Ga, 7, s, xB(HB(e), 4, 12));
                                    return void as(S, a.x - 2, a.y - 2, ba, s, !1);
                                  }
                                  xs(S, a.x - 4, i, O, o ? ca : fa, 7, s, xB(n, 4, 14));
                                  as(S, a.x - 2, a.y - 2, o ? da : ra, s, !1);
                                  if (!(o)) {
                                    as(S, a.x + 1, a.y + 9, la, s, !1);
                                  }
                                  if (!(e.arms[0].front || e.arms[0].over)) {
                                    Da(S, e, 0);
                                  }
                                }(a, s);
                              }
                            else {
                              !function (e, a) {
                                var s = a.torso;
                                var B = eB(a.material, S.Palette.pick("SKIN", a.cfg.skin, "light"));
                                var o = a.g.side;
                                var n = a.g.back;
                                var i = GB(a);
                                var O = s.y + s.h;
                                function t(S) {
                                  return a.p.sit ? 57 : Math.min(57, S.foot - 4);
                                }
                                var h = Math.min(t(a.legs[0]), t(a.legs[1]));
                                if (!o && !n) {
                                  as(e, s.x - 2, s.y - 2, aB, B, !1);
                                  xs(e, s.x + 2, O - 1, h, hB, 12, B, xB(i, 6, 10));
                                  as(e, s.x + 1, O - 1, dB, B, !1);
                                  QO(e, s.x + 2, s.y + 11, lB, B, !1);
                                  return void (a.arms[0].front || a.arms[0].over || DB(e, a, 0));
                                }
                                if (n) {
                                  as(e, s.x - 2, s.y - 2, sB, B, !1);
                                  xs(e, s.x - 1, s.y - 1, h + 1, nB, 20, B, xB(i, 18, 14));
                                  return void (a.arms[0].front || a.arms[0].over || DB(e, a, 0));
                                }
                                var r = HB(a);
                                as(e, s.x - 2, s.y - 2, BB, B, !1);
                                as(e, s.x - 8, s.y - 1, gB(a, iB, s.y - 1).slice(0, O - s.y + 1), B, !1);
                                xs(e, s.x + 5, O - 1, h, rB, 12, B, xB(r, 6, 10));
                                as(e, s.x + 4, O - 1, bB, B, !1);
                                QO(e, s.x + 7, s.y + 12, fB, B, !1);
                              }(a, s);
                            }
                          else {
                            !function (S, a) {
                              var s;
                              var B = a.torso;
                              var o = a.material;
                              var n = function (S) {
                                var e = S.cloth;
                                var a = S.accent;
                                var s = S.trim;
                                var B = S.belt;
                                var o = S.pants;
                                return { L: e.line, d: e.deep, s: e.shade, W: e.base, h: e.hi, Q: a.line, q: a.deep, c: a.shade, e: a.base, E: a.hi, N: s.line, n: s.deep, g: s.shade, G: s.base, Y: s.hi, T: B.line, t: B.deep, u: B.shade, U: B.base, k: B.hi, K: s.spark || s.hi, x: o.line, X: o.deep, j: o.shade, J: o.base, i: o.hi };
                              }(o);
                              var i = a.g.side;
                              var O = a.g.back;
                              var t = 0 | a.p.leg;
                              var h = B.y + B.h;
                              function r(S) {
                                return a.p.sit ? 57 : Math.min(57, S.foot - 5);
                              }
                              var d = Math.min(r(a.legs[0]), r(a.legs[1]));
                              if (i) {
                                var b = a.legs[0];
                                var l = a.p.sit ? -2 : b.x - a.g.legs[0].x;
                                xs(S, B.x - 5 + l, h, r(b), Qs, 10, n);
                                as(S, B.x - 2, B.y - 2, Cs, n, !1);
                                xs(S, B.x + 7, h - 1, d, Ys, 10, n);
                                QO(S, B.x + 8, B.y + 13, qs, n, !1);
                                var f = Math.min(h + 6, d - 6);
                                var c = l > 0 ? -1 : l < 0 ? 1 : 0;
                                e.line(S, B.x + 8, h, B.x + 8 + c, f - 1, o.belt.base);
                                QO(S, B.x + 7 + c, f, Us, n, !1);
                              }
                              else {
                                for (s = 0; s < 2; s++) {
                                  var G = a.legs[s];
                                  var H = a.p.sit ? s ? 2 : -2 : G.x - a.g.legs[s].x;
                                  xs(S, (s ? B.x + B.w - 4 : B.x - 5) + H, h, r(G), s ? As : js, 10, n);
                                }
                                if (as(S, B.x - 2, B.y - 2, O ? Ls : ys, n, !1), xs(S, B.x + 2, h - 1, d, _s, 10, n), O) {
                                  var g = o.trim;
                                  e.line(S, B.x, h - 1, B.x + 2, h + 1, g.shade);
                                  e.line(S, B.x + 3, h + 1, B.x + 4, h, g.shade);
                                  e.line(S, B.x + 5, h, B.x + 6, h + 1, g.shade);
                                  e.line(S, B.x + 7, h + 1, B.x + B.w - 1, h - 1, g.shade);
                                  e.dot(S, B.x + 2, h + 1, g.hi);
                                  e.dot(S, B.x + 7, h + 1, g.hi);
                                  e.dot(S, B.x + 4, h - 1, g.base);
                                  e.dot(S, B.x + 5, h - 1, g.hi);
                                }
                                else {
                                  QO(S, B.x + 2, B.y + 12, Es, n, !1);
                                  var x = Math.min(h + 4, d - 6);
                                  e.line(S, B.x + 3, h - 1, B.x + 4, x - 1, o.trim.shade);
                                  e.line(S, B.x + 6, h - 1, B.x + 5, x - 1, o.trim.deep);
                                  QO(S, B.x + 3, x, Ks, n, !1);
                                  var D = Math.min(h + 6, r(a.legs[0]) - 6);
                                  e.line(S, B.x + 1, h, B.x + 1 + t, D - 1, o.belt.base);
                                  QO(S, B.x + t, D, Us, n, !1);
                                }
                                if (!(a.arms[0].front || a.arms[0].over)) {
                                  Rs(S, a, 0);
                                }
                              }
                            }(a, s);
                          }
                        else {
                          !function (a, s) {
                            var B = s.torso;
                            var o = s.material;
                            var n = Bs(o, S.Palette.pick("SKIN", s.cfg.skin, "light"));
                            var i = s.g.side;
                            var O = s.g.back;
                            var t = 0 | s.p.leg;
                            var h = B.y + B.h;
                            if (!i && !O) {
                              for (var r = 0; r < 2; r++) {
                                var d = s.legs[r];
                                var b = s.p.sit ? r ? 2 : -2 : d.x - s.g.legs[r].x;
                                var l = s.p.sit ? 57 : Math.min(57, d.foot - 5);
                                xs(a, (r ? B.x + B.w - 3 : B.x - 4) + b, h, l, r ? ts : Os, 10, n);
                              }
                              as(a, B.x - 2, B.y - 2, os, n, !1);
                              QO(a, B.x + 3, B.y + 13, Gs, n, !1);
                              QO(a, B.x + 3, h, Hs, n, !1);
                              var f = s.p.sit ? 57 : Math.min(57, s.legs[0].foot - 5);
                              var c = s.p.sit ? 57 : Math.min(57, s.legs[1].foot - 5);
                              Js(a, s, n, B.x - 1, h, f, -1, t, !0);
                              Js(a, s, n, B.x + B.w, h, c, 1, -t, !1);
                              return void (s.arms[0].front || s.arms[0].over || (Ws(a, s, 0), Ds(a, s, 0)));
                            }
                            if (O) {
                              for (var G = 0; G < 2; G++) {
                                var H = s.legs[G];
                                var g = s.p.sit ? G ? 2 : -2 : H.x - s.g.legs[G].x;
                                var x = s.p.sit ? 57 : Math.min(57, H.foot - 5);
                                xs(a, (G ? B.x + B.w - 6 : B.x - 4) + g, h, x, G ? ds : rs, 10, n);
                              }
                              as(a, B.x - 2, B.y - 2, hs, n, !1);
                              QO(a, B.x + 3, B.y + 13, Gs, n, !1);
                              var D = (s.p.sit ? 57 : Math.min(s.legs[0].foot, s.legs[1].foot) - 5) - 3;
                              e.r(a, B.x + 4, h, 2, Math.max(1, D - h), o.red.base);
                              e.line(a, B.x + 4, h, B.x + 4, D - 1, o.red.deep);
                              e.dot(a, B.x + 5, h + 1, o.red.hi);
                              var W = { G: o.trim.base, n: o.trim.deep, z: o.pink.deep, r: o.pink.base, R: o.pink.hi };
                              QO(a, B.x + 3, D, gs, W, !1);
                              var J = s.p.sit ? 57 : Math.min(57, s.legs[0].foot - 5);
                              var u = s.p.sit ? 57 : Math.min(57, s.legs[1].foot - 5);
                              Js(a, s, n, B.x - 1, h, J, -1, t, !1);
                              Js(a, s, n, B.x + B.w, h, u, 1, -t, !0);
                              return void (s.arms[0].front || s.arms[0].over || (Ws(a, s, 0), Ds(a, s, 0)));
                            }
                            var M = s.legs[0];
                            var w = s.p.sit ? -2 : M.x - s.g.legs[0].x;
                            var N = s.p.sit ? 57 : Math.min(57, M.foot - 5);
                            xs(a, B.x - 5 + w, h, N, ls, 10, n);
                            as(a, B.x - 2, B.y - 2, bs, n, !1);
                            QO(a, B.x + 6, B.y + 13, fs, n, !1);
                            QO(a, B.x + 6, h, cs, n, !1);
                            Js(a, s, n, B.x - 1, h, N, -1, w > 0 ? -1 : w < 0 ? 1 : 0, !1);
                          }(a, s);
                        }
                      else {
                        !function (S, e) {
                          var a = e.torso;
                          var s = Aa(e);
                          var B = e.g.side;
                          var o = e.g.back;
                          var n = GB(e);
                          var i = a.y + 15;
                          var O = Math.min(Va(e, e.legs[0]), Va(e, e.legs[1]));
                          if (B) {
                            xs(S, a.x - 4, i, O, Ua, 7, s, xB(HB(e), 4, 12));
                            return void as(S, a.x - 2, a.y - 2, Ka, s, !1);
                          }
                          xs(S, a.x - 3, i, O, o ? qa : Ea, 7, s, xB(n, 4, 14));
                          as(S, a.x - 2, a.y - 2, o ? _a : Qa, s, !1);
                          if (!(o)) {
                            as(S, a.x + 1, a.y + 9, Ya, s, !1);
                          }
                          if (!(e.arms[0].front || e.arms[0].over)) {
                            za(S, e, 0);
                          }
                        }(a, s);
                      }
                    else {
                      !function (S, e) {
                        var a = e.torso;
                        var s = On(e);
                        var B = e.g.side;
                        var o = e.g.back;
                        var n = GB(e);
                        var i = a.y + a.h;
                        function O(S) {
                          return e.p.sit ? 57 : Math.min(57, S.foot - 4);
                        }
                        var t = Math.min(O(e.legs[0]), O(e.legs[1]));
                        if (!B && !o) {
                          xs(S, a.x + 2, i - 1, t, hn, 12, s, xB(n, 6, 10));
                          as(S, a.x - 2, a.y - 2, tn, s, !1);
                          var h = e.p.sit ? 7 : rn.length;
                          as(S, a.x + 2, i - 1, rn.slice(0, h), s, !1, xB(-n, 3, 6));
                          as(S, a.x + 7, i - 1, rn.slice(0, h), s, !1, xB(-n, 3, 6));
                          return void (e.arms[0].front || e.arms[0].over || Mn(S, e, 0));
                        }
                        if (o) {
                          as(S, a.x - 2, a.y - 2, cn, s, !1);
                          xs(S, a.x - 1, i, t, Hn, 17, s, xB(n, 4, 14));
                          as(S, a.x - 1, a.y, Gn, s, !1);
                          return void (e.arms[0].front || e.arms[0].over || Mn(S, e, 0));
                        }
                        var r = HB(e);
                        as(S, a.x - 2, a.y - 2, gn, s, !1);
                        as(S, a.x - 8, a.y - 1, gB(e, xn, a.y - 1).slice(0, i - a.y + 1), s, !1);
                        xs(S, a.x - 4, i, t, Dn, 11, s, xB(r, 6, 10));
                        as(S, a.x + 6, i - 2, e.p.sit ? Wn.slice(0, 5) : Wn, s, !1, xB(-r, 2, 5));
                      }(a, s);
                    }
                  else {
                    !function (S, a) {
                      var s = a.torso;
                      var B = Jo(a);
                      var o = a.g.side;
                      var n = a.g.back;
                      var i = GB(a);
                      var O = s.y + s.h;
                      function t(S) {
                        return a.p.sit ? 57 : Math.min(56, S.foot - 5);
                      }
                      var h = Math.min(t(a.legs[0]), t(a.legs[1]));
                      if (!o && !n) {
                        var r = a.legs[0];
                        var d = a.p.sit ? -2 : r.x - a.g.legs[0].x;
                        var b = a.legs[1];
                        var l = a.p.sit ? 2 : b.x - a.g.legs[1].x;
                        so(S, s.x + 3 + l, O - 2, t(b) + 1, ko, 9, B, !1, xB(-i, 8, 8));
                        so(S, s.x - 4 + d, O, t(r) - 1, po, 8, B, !1, xB(i, 8, 8));
                        as(S, s.x - 2, s.y - 2, uo, B, !1);
                        QO(S, s.x + 8, O - 4, mo, B, !1);
                        return void (a.arms[0].front || a.arms[0].over || Yo(S, a, 0));
                      }
                      if (n) {
                        for (var f = 0; f < 2; f++) {
                          var c = a.legs[f];
                          var G = a.p.sit ? f ? 2 : -2 : c.x - a.g.legs[f].x;
                          so(S, (f ? s.x + s.w + 4 : s.x - 5) + G, O, t(c), vo, 8, B, 1 === f, xB(f ? -i : i, 8, 8));
                        }
                        so(S, s.x + 2, O - 2, h + 1, yo, 8, B, !1, xB(i, 8, 8));
                        as(S, s.x - 2, s.y - 2, Mo, B, !1);
                        if (!(a.arms[0].front || a.arms[0].over)) {
                          Yo(S, a, 0);
                        }
                        return void function (S, a, s) {
                          if (Eo(a)) {
                            var B = a.torso;
                            var o = B.x + B.w + 3;
                            var n = B.y - 4;
                            var i = B.x - 1;
                            var O = Math.min(B.y + B.h + 7, 59);
                            e.fatLine(S, o, n, i, O, 3, s.K);
                            e.line(S, o, n, i, O, s.H);
                            e.line(S, o - 1, n, i - 1, O, s.k);
                            e.line(S, o + 1, n, i + 1, O, s.U);
                            for (var t = 1; t < 5; t++) {
                              var h = Math.round(o + (i - o) * t / 5);
                              var r = Math.round(n + (O - n) * t / 5);
                              e.dot(S, h, r, s.G);
                              e.dot(S, h + 1, r, s.n);
                            }
                            e.fatLine(S, o + 1, n - 4, o, n, 2, s.k);
                            e.dot(S, o + 1, n - 4, s.G);
                            e.dot(S, o + 2, n - 5, s.Y);
                            e.line(S, o - 2, n + 1, o + 2, n - 1, s.G);
                            e.dot(S, o, n, s.Y);
                            e.dot(S, i, O, s.G);
                            e.dot(S, i + 1, O, s.Y);
                            e.line(S, o + 2, n - 2, o + 3, n + 4, s.o);
                            e.dot(S, o + 3, n + 5, s.O);
                            e.line(S, o + 3, n + 6, o + 3, n + 8, s.e);
                            e.dot(S, o + 3, n + 9, s.c);
                          }
                        }(S, a, B);
                      }
                      var H = QB(a);
                      var g = HB(a);
                      as(S, s.x - 2, s.y - 2, H ? No : wo, B, !1);
                      xs(S, s.x + 6, O - 2, h, jo, 8, B, xB(g, 6, 10));
                    }(a, s);
                  }
                else {
                  !function (S, e) {
                    var a = e.torso;
                    var s = AB(e);
                    var B = e.g.side;
                    var o = e.g.back;
                    var n = GB(e);
                    var i = a.y + a.h;
                    function O(S) {
                      return e.p.sit ? 57 : Math.min(57, S.foot - 4);
                    }
                    var t = Math.min(O(e.legs[0]), O(e.legs[1]));
                    if (!B && !o) {
                      for (var h = 0; h < 2; h++) {
                        var r = e.legs[h];
                        var d = e.p.sit ? h ? 2 : -2 : r.x - e.g.legs[h].x;
                        so(S, (h ? a.x + a.w + 4 : a.x - 5) + d, i, O(r), zB, 8, s, 1 === h, xB(h ? -n : n, 8, 8));
                      }
                      so(S, a.x + 2, i - 2, t + 1, VB, 10, s, !1, xB(n, 6, 10));
                      as(S, a.x - 2, a.y - 2, YB, s, !1);
                      return void (e.arms[0].front || e.arms[0].over || lo(S, e, 0));
                    }
                    if (o) {
                      for (var b = 0; b < 2; b++) {
                        var l = e.legs[b];
                        var f = e.p.sit ? b ? 2 : -2 : l.x - e.g.legs[b].x;
                        so(S, (b ? a.x + a.w + 5 : a.x - 6) + f, i, O(l), PB, 8, s, 1 === b, xB(b ? -n : n, 8, 8));
                      }
                      xs(S, a.x, i - 2, t + 1, FB, 6, s, xB(n, 8, 8));
                      as(S, a.x - 2, a.y - 2, EB, s, !1);
                      QO(S, a.x - 2, i - 4, So, s, !1);
                      QO(S, a.x + a.w + 1, i - 4, So, s, !0);
                      if (!(e.arms[0].front || e.arms[0].over)) {
                        lo(S, e, 0);
                      }
                      fo(S, e, s);
                      return void (e.arms[0].front || e.arms[0].over || Bo(S, e, 0));
                    }
                    var c = QB(e);
                    var G = HB(e);
                    as(S, a.x - 2, a.y - 2, c ? KB : qB, s, !1);
                    xs(S, a.x + 6, i - 2, t, ZB, 10, s, xB(G, 6, 10));
                    if (c) {
                      fo(S, e, s);
                    }
                  }(a, s);
                }
              else {
                !function (S, a) {
                  var s = a.torso;
                  var B = OO(a);
                  var o = a.material.trim;
                  var n = a.g.side;
                  var i = a.g.back;
                  var O = s.y + 13;
                  var t = GB(a);
                  var h = a.p.sit ? 0 : t;
                  var r = a.p.sit ? Math.min(57, Math.max(a.legs[0].knee, a.legs[1].knee) + 5) : Math.min(55, Math.max(a.legs[0].foot, a.legs[1].foot) - 7);
                  var d = Math.max(6, r - O);
                  if (n) {
                    var b = HB(a);
                    WO(S, a, -b, r, O, s.x + 4);
                    as(S, s.x - 7, O + 2, DO("side", d), B, !1, xB(b, 3, 12));
                    as(S, s.x - 2, s.y - 2, dO, B, !1);
                    as(S, s.x - 2, s.y + 11, lO, B, !1);
                  }
                  else if (WO(S, a, h, r, O, s.x + 4), as(S, s.x - 6, O + 2, DO(i ? "back" : "down", d), B, !1, xB(h, 3, 12)), as(S, s.x - 2, s.y - 2, i ? rO : hO, B, !1), as(S, s.x - 3, s.y + 11, bO, B, !1), !i) {
                    for (var l = a.p.sit ? 2 : 5, f = O + 4, c = 0; c < l; c++)
                      e.dot(S, s.x + 2, f + c, c === l - 1 ? o.line : c % 2 ? o.shade : o.base), e.dot(S, s.x + 7, f + c, c === l - 1 ? o.line : c % 2 ? o.shade : o.hi);
                  }
                  if (!(a.arms[0].front || a.arms[0].over)) {
                    HO(S, a, 0);
                  }
                }(a, s);
              }
            else {
              !function (S, e) {
                var a = e.torso;
                var s = Xo;
                var B = e.g.side;
                var o = e.g.back;
                var n = GB(e);
                var i = a.y + 14;
                var O = 60 - Bn.length;
                var t = Math.max(0, i - O);
                function h(S) {
                  return function (S, e) {
                    return S.p.sit ? 57 : Math.min(57, e.foot - 5);
                  }(e, S);
                }
                var r = Math.min(h(e.legs[0]), h(e.legs[1]));
                if (B) {
                  var d = HB(e);
                  if (e.p.sit) {
                    as(S, a.x - 5, O + t, on.slice(t), s, !1);
                  }
                  else {
                    xs(S, a.x - 5, i, r, en, 7, s, xB(d, 4, 12));
                  }
                  return void as(S, a.x - 2, a.y - 2, Sn, s, !1);
                }
                if (e.p.sit) {
                  as(S, a.x - 6, O + t, Bn.slice(t), s, !1);
                }
                else if (o) {
                  xs(S, a.x - 3, i, r, $o, 7, s, xB(n, 4, 14));
                }
                else {
                  for (var b = 0; b < 2; b++) {
                    var l = e.legs[b];
                    l.x;
                    e.g.legs[b].x;
                    so(S, b ? l.x + l.w + 3 : l.x - 4, i, h(l), To, 7, s, 1 === b, xB(n, 4, 14));
                  }
                  var f = Zo.length;
                  as(S, a.x + 3, i, Zo.slice(0, Math.min(f, r - i)), s, !1, xB(-n, 3, 7));
                  as(S, a.x + 6, i, Zo.slice(0, Math.min(f - 1, r - i)), s, !0, xB(-n, 3, 7));
                }
                as(S, a.x - 2, a.y - 2, o ? Io : Fo, s, !1);
                if (!(o)) {
                  as(S, a.x, a.y + 9, Po, s, !1);
                }
                var c = e.arms[0];
                if (!(c.front || c.over)) {
                  nn(S, e, 0);
                }
              }(a, s);
            }
          else {
            !function (S, a) {
              var s = a.material.cloth;
              var B = a.material.accent;
              var o = a.material.trim;
              var n = aO.lu_hanh_moc.stitch;
              var i = a.torso;
              var O = i.x - 2;
              var t = i.w + 4;
              var h = O + t;
              var r = O + Math.floor(t / 2);
              var d = i.y;
              var b = i.y + i.h - 3;
              var l = i.y + i.h + 6;
              var f = b - 1;
              if (e.r(S, O + 1, d, t - 2, l - d, s.line), e.r(S, O + 2, d + 1, t - 4, l - d - 2, s.base), e.r(S, O + 2, d + 4, 1, l - d - 6, s.shade), e.r(S, h - 3, d + 4, 1, l - d - 6, s.shade), e.r(S, O + 3, d + 2, t - 6, 1, s.hi), a.g.back) {
                e.r(S, O + 1, d + 3, t - 2, f - d - 2, B.line);
                e.r(S, O + 2, d + 4, t - 4, f - d - 4, B.base);
                e.r(S, O + 3, d + 5, t - 6, 1, B.hi);
                e.line(S, r, d + 7, r, f - 2, B.deep);
                e.dot(S, r - 2, d + 13, n);
                e.dot(S, r + 1, d + 19, n);
              }
              else if (a.g.side) {
                e.r(S, O + 1, d + 2, t - 2, f - d - 1, B.line);
                e.r(S, O + 2, d + 3, t - 4, f - d - 3, B.base);
                e.r(S, O + 2, d + 5, 1, Math.max(1, f - d - 8), B.hi);
                e.line(S, h - 3, d + 3, r, d + 8, n);
                e.r(S, r, d + 8, 1, Math.max(1, f - d - 9), B.deep);
              }
              else {
                var c = Math.max(2, Math.floor((t - 4) / 2));
                e.r(S, O + 1, d + 3, c + 1, f - d - 2, B.line);
                e.r(S, r + 1, d + 3, c + 1, f - d - 2, B.line);
                e.r(S, O + 2, d + 2, 2, 5, B.line);
                e.r(S, h - 4, d + 2, 2, 5, B.line);
                e.r(S, O + 2, d + 4, c - 1, f - d - 4, B.base);
                e.r(S, r + 2, d + 4, c - 1, f - d - 4, B.base);
                e.line(S, O + 2, d + 3, r - 1, d + 8, n);
                e.line(S, h - 3, d + 3, r + 1, d + 8, B.hi);
                e.line(S, O + 2, d + 9, O + 2, f - 2, B.deep);
                e.line(S, h - 3, d + 9, h - 3, f - 2, B.deep);
                e.dot(S, O + 3, d + 13, n);
                e.dot(S, h - 4, d + 13, n);
              }
              if (e.r(S, O + 1, b, t - 2, 3, o.line), e.r(S, O + 1, b, t - 2, 1, o.base), e.r(S, O + 1, b + 2, t - 2, 1, o.deep), !a.g.back) {
                var G = a.g.side ? h - 3 : r + 3;
                e.r(S, G - 1, b - 1, 4, 4, o.line);
                e.r(S, G, b, 2, 1, o.hi);
                e.r(S, G + 1, b + 3, 2, 4, o.base);
                e.r(S, G + 2, b + 5, 1, 2, o.deep);
              }
              e.r(S, O + 2, l - 2, t - 4, 1, s.line);
              e.r(S, O + 3, l - 3, 2, 1, s.hi);
              e.r(S, h - 5, l - 3, 2, 1, s.hi);
            }(a, s);
          }
        else {
          !function (S, a) {
            var s = a.material.cloth;
            var B = a.material.trim;
            var o = a.material.accent;
            var n = aO.ao_thon_lac.stitch;
            var i = a.torso;
            var O = i.x - 2;
            var t = i.w + 4;
            var h = O + t;
            var r = O + Math.floor(t / 2);
            var d = i.y;
            var b = i.y + i.h - 3;
            var l = i.y + i.h + 5;
            if (e.r(S, O + 1, d, t - 2, l - d, s.line), e.r(S, O, d + 3, 1, l - d - 3, s.line), e.r(S, h - 1, d + 3, 1, l - d - 3, s.line), e.r(S, O + 2, d + 1, t - 4, l - d - 2, s.base), e.r(S, O + 1, d + 4, 1, l - d - 5, s.base), e.r(S, h - 2, d + 4, 1, l - d - 5, s.base), e.r(S, O + 2, d + 4, 1, b - d - 4, s.shade), e.r(S, h - 3, d + 4, 1, b - d - 4, s.shade), e.r(S, O + 3, d + 2, t - 6, 1, s.hi), e.line(S, O + 3, d + 5, O + 4, b - 4, s.hi), e.line(S, h - 3, d + 5, h - 4, b - 4, s.shade), a.g.back ? (e.line(S, r, d + 4, r, l - 3, s.shade), e.line(S, r - 1, d + 5, r - 1, l - 5, s.hi), e.dot(S, r - 2, d + 12, n), e.dot(S, r + 1, d + 17, n)) : a.g.side ? (e.line(S, h - 3, d + 1, r + 1, d + 8, B.base), e.line(S, r + 1, d + 8, r + 1, b - 2, B.deep), e.r(S, O + 2, d + 5, 1, 5, s.hi)) : (e.line(S, O + 3, d + 1, r - 1, d + 7, B.base), e.line(S, h - 3, d + 1, r + 1, d + 8, B.hi), e.line(S, r - 1, d + 7, r - 2, b - 2, B.deep), e.line(S, r + 1, d + 8, r + 2, b - 2, B.base), e.r(S, O + 3, d + 12, 1, 2, s.hi), e.dot(S, O + 4, d + 13, s.hi), e.r(S, O + 2, l - 5, 4, 4, s.line), e.r(S, O + 3, l - 4, 2, 2, B.deep), e.line(S, O + 2, l - 1, O + 5, l - 1, B.base)), e.r(S, O + 1, b, t - 2, 3, o.deep), e.r(S, O + 1, b, t - 2, 1, o.base), e.r(S, O + 1, b + 2, t - 2, 1, o.line), !a.g.back) {
              var f = a.g.side ? h - 3 : r + 3;
              e.r(S, f - 1, b - 1, 4, 4, o.line);
              e.r(S, f, b, 2, 1, o.hi);
              e.line(S, f + 1, b + 2, f + 3, b + 6, o.base);
              e.r(S, f + 2, b + 5, 2, 1, o.deep);
            }
            e.r(S, O + 2, l - 2, t - 4, 1, B.deep);
            e.r(S, O + 3, l - 3, 2, 1, B.base);
            e.r(S, h - 5, l - 3, 2, 1, B.base);
          }(a, s);
        }
      else {
        eO(a, s);
      }
    else {
      !function (S, a) {
        var s = a.torso;
        var B = a.g.side;
        var o = a.g.back;
        var n = GB(a);
        function i(S) {
          return a.p.sit ? 57 : Math.min(56, S.foot - 5);
        }
        s.y;
        s.h;
        var O = Math.min(i(a.legs[0]), i(a.legs[1]));
        if (!B && !o) {
          zn(S, a, Ln, 7, 37, 11, O + 1, 8, xB(n, 8, 8), !1);
          Rn(S, a, vn, 9, 22, 11);
          zn(S, a, yn, 13, 37, 11, O, 6, xB(-n, 8, 8), !1);
          return void (a.arms[0].front || a.arms[0].over || Fn(S, a, 0));
        }
        if (o) {
          zn(S, a, qn, 7, 37, 11, O + 1, 8, xB(n, 8, 8), !1);
          for (var t = s.y; t < s.y + s.h; t++)
            e.r(S, s.x, t, s.w, 1, wn.B), e.dot(S, s.x, t, wn.N), e.dot(S, s.x + s.w - 1, t, wn.N), e.dot(S, s.x + 1, t, wn.b);
          e.r(S, s.x - 1, s.y + 9, s.w + 2, 3, wn.S);
          e.r(S, s.x - 1, s.y + 9, s.w + 2, 1, wn.R);
          e.r(S, s.x - 1, s.y + 11, s.w + 2, 1, wn.s);
          Rn(S, a, Yn, 6, 23, 11);
          return void (a.arms[0].front || a.arms[0].over || Fn(S, a, 0));
        }
        zn(S, a, Qn, 6, 37, 12, O + 1, 8, xB(HB(a), 6, 10), !1);
        Rn(S, a, An, 10, 22, 12);
      }(a, s);
    }
  }
  function LO(S, e) {
    if ((e.arms[0].front || e.arms[0].over)) {
      Xi(S, e, 0);
    }
    Xi(S, e, 1);
  }
  var CO = ["..H....", ".LB....", ".LBH...", "LSBH...", "LSBBH..", "LDSBH..", ".LDSBH.", "..LDSBB", "...LDSB"];
  var jO = ["H....", "BH...", "SBH..", ".SBB.", "..SBB", "...SB", "....S"];
  var AO = ["H.....", "BH....", "SBH...", ".SBBB.", "..SDBB", "...SBB", "....SB"];
  function QO(S, a, s, B, o, n) {
    for (var i = 0; i < B.length; i++)
      for (var O = 0; O < B[i].length; O++) {
        var t = B[i].charAt(O);
        if ("." !== t) {
          e.dot(S, n ? a - O : a + O, s + i, o[t]);
        }
      }
  }
  function _O(S, a, s, B) {
    u(S, a, s);
    for (var o = 0, n = a.length - 1; o < a.length; n = o++)
      e.line(S, Math.round(a[n][0]), Math.round(a[n][1]), Math.round(a[o][0]), Math.round(a[o][1]), B);
  }
  function YO(S, e) {
    for (var a = S.slice(), s = S.length - 1; s >= 0; s--)
      a.push([e - S[s][0], S[s][1]]);
    return a;
  }
  var EO = ["..........oSSo........", "......gYoSHhSSsoYg....", "........oSsHSSso......", "......ooSSsHhSSSoo....", ".....ooSSsShHSSSSoo...", "....oSSsSSShHSSSSsSo..", "....oSsSSSHhSSSSsSSo..", "....oSSsSShHSSSSsSSo..", "....oSsSSS.sS.SsSSSo..", "....oSsSS......SSsSo..", "....oSs..........sSo..", "...oSHs..........sHSo.", "...oHSs..........sSHo.", "..oSSs............sSSo", ".oSsSs............sSsS", "..osSHs..........sHSso", "..oSHSs..........sSHSo", "..oHSSss........ssSSHo", ".oSSsSs..........sSsSS", ".oSsSHs..........sHSsS", ".osSHSs..........sSHSs", "oSHSSs............sSSH", "oHSSss............ssSS", ".oSSsSs..........sSsSS", ".oSsSHs..........sHSsS", "..osSHSs........sSHSso", ".oSHSSs..........sSSHS", ".oHSSss..........ssSSH", "..oSSss..........ssSSo", "..oSss............ssSo", "...oss............sso.", ".....os..........so...", ".....o............o..."];
  var qO = ["....oSsSHSSSsSHo....", "....osSHSSSsSHSo....", "....oSHSSSsSHSSo....", "....oHSSSsSHSSSso...", "....oSSSsSHSSSsSo...", "....oSSsSHSSSsSHo...", "...oSsSHSSSsSHSSo...", "...osSHSSSsSHSSSo...", "...oSHSSSsSHSSSso...", "...oHSSSsSHSSSsSHo..", "...oSSSsSHSSSsSHSo..", "...oSSsSHSSSsSHSSo..", "..oSsSHSSSsSHSSSso..", "..osSHSSSsSHSSSsSo..", "..oSHSSSsSHSSSsSHo..", "..oHSSSsSHSSSsSHSo..", "..oSSSsSHSSSsSHSSo..", "..oSSsSHSSSsSHSSSo..", "...oSsSHSSSsSHSSo...", "....osSHSSSsSHSo....", ".....oSHSSSsSHo.....", "......oHSSSsSo......", ".......oSSSso.......", "........oSSo........"];
  var KO = [".......oSSo.........", "......oSHSSoGYg.....", "......oSsSSo........", ".....ooSSsHhSSSoo...", "....ooSSsShHSSSSoo..", "...oSSsSSShHSSSSSo..", "...oSsSSSHhSSSSsSo..", "...oSSsSShHSSSSsSo..", "...oSsSSSSsSs.......", "...oSsSSSSs.........", "...oSsSSSS..........", "...oSsSSSSs.........", "...oSHsSSSs.........", "...oSsSSSSs.........", "...oSHsSSS..........", "...oSsSSSs..........", "....oSHSSs..........", ".....oSSSs..........", "......oSSs..........", ".......oSs..........", "........os.........."];
  var UO = [".....oSsSs......", ".....osSHs......", "....oSHSs.......", "....oHSSSs......", "....oSSSss......", ".....oSSsSs.....", "...oSsSHSs......", "...osSHSSs......", "..oSHSSSs.......", "..oHSSSsSs......", "..oSSSsSHs......", "...oSSsSHSs.....", "..oSsSHSSs......", "..osSHSSSs......", ".oSHSSSss.......", "..oHSSSsSs......", "..oSSSsSHs......", "...oSSsSHSs.....", "..oSsSHSSs......", "...osSHSSs......", "...oSHSSs.......", ".....oHSSs......", "......oSSs......", "........oSs....."];
  var XO = ["..........oSSo........", "......gYoSHhSSsoYg....", "........oSsHSSso......", "......ooSSsHhSSSoo....", ".....ooSSsShHSSSSoo...", "....oSSsSSShHSSSSsSo..", "....oSsSSSHhSSSSsSSo..", "....oSSsSShHSSSSsSSo..", ".....oSsSHSSSsSHSSo...", ".....oSsSHSSSsSHSSo...", ".....oSsSHSSSsSHSSo...", ".....oSsSHSSSsSHSSo...", ".....oSsSHSSSsSHSSo...", "....osSHSSSsSHSSSsSo..", "....osSHSSSsSHSSSsSo..", "....osSHSSSsSHSSSsSo..", "....osSHSSSsSHSSSsSo..", "....osSHSSSsSHSSSsSo..", "....oSsSHSSSsSHSSSso..", "....oSsSHSSSsSHSSSso..", "....oSsSHSSSsSHSSSso..", "....oSsSHSSSsSHSSSso..", "....oSsSHSSSsSHSSSso..", "....osSHSSSsSHSSSsSo..", "....osSHSSSsSHSSSsSo..", "....osSHSSSsSHSSSsSo..", "....osSHSSSsSHSSSsSo..", "....osSHSSSsSHSSSsSo..", "....oSsSHSSSsSHSSSso..", "......oSsSHSSSsSHSo...", ".......oSsSHSSSso.....", ".........oSsSHSo......", "..........oSso........", "..........osSo........", "..........ooGYGoo....."];
  function RO(S, e) {
    var a = { O: S.line, D: S.deep, S: S.shade, B: S.base, H: S.hi, W: S.hi2 || S.hi };
    if (e) {
      for (var s in e)
        a[s] = e[s];
    }
    return a;
  }
  function zO(S, e, a, s) {
    for (var B = [], o = 0; o < 2; o++) {
      var n = S.arms[o];
      if (n && e(o, n)) {
        for (var i = w(n), O = h(n), t = n.bent ? [i, { x: n.jx, y: n.jy }, O] : [i, O], r = 1; r < t.length; r++) {
          var d = t[r - 1];
          var b = t[r];
          var l = b.x - d.x;
          var f = b.y - d.y;
          var c = Math.sqrt(l * l + f * f) || 1;
          var G = 1 === r ? 2 : 0;
          var H = r === t.length - 1 ? 1 : 0;
          B.push([d.x - l / c * G, d.y - f / c * G, b.x + l / c * H, b.y + f / c * H]);
        }
      }
    }
    return B.length ? function (S, e) {
      if (e < a) {
        return !1;
      }
      for (var o = 0; o < B.length; o++) {
        var n = B[o];
        var i = n[2] - n[0];
        var O = n[3] - n[1];
        var t = i * i + O * O || 1;
        var h = Math.max(0, Math.min(1, ((S - n[0]) * i + (e - n[1]) * O) / t));
        var r = n[0] + i * h - S;
        var d = n[1] + O * h - e;
        if (r * r + d * d <= s) {
          return !0;
        }
      }
      return !1;
    } : null;
  }
  function VO(S, e) {
    var a = S.g.side;
    var s = S.head.y;
    var B = zO(S, function (S, e) {
      return e.over && !(a && 0 === S);
    }, -99, 3.9);
    var o = a ? zO(S, function (S, e) {
      return 1 === S || e.front || e.over;
    }, s + 14, 8) : S.g.back ? null : zO(S, function (S, e) {
      return e.front;
    }, s + 12, 7);
    return function (S, a) {
      return a > e || !(!B || !B(S, a)) || !(!o || !o(S, a));
    };
  }
  var FO = Object.create(null);
  FO.dao_dong = { down: { F: ["....................", "........O....O......", ".......OHO..OHO.....", ".....OOBHBOOBHBOO...", "....OSBHBBHBBHBBSO..", "...OSBHBBHWHBBHBBSO.", "..OSBHBBHWHBBHBBBSO.", "..OSBBBHBHBBBBHBBSO.", ".OSBBBHBBBHBBBBHBSDO", ".ODSBHBBSBBHBBSBHSDO", ".ODSHBSOSBHBSOBHSDO.", "..ODSO.OSBO.OSBOSDO.", "..OSO...OO.....OSO..", "...O............O..."] }, side: { F: [".....................", "..........O...O......", "........O.OHO.OHO....", "......OOBOBHBOBHBO...", ".....OSBBHBBBHBBHBO..", "....OSBBHBBBHBBBHBSO.", "...OSBBHBBBHBBBHBBSO.", "..OSBBHBBBHBBBHBBSSO.", "..ODSBHBBHBBBHBBSBSO.", "..ODSHBBHBBSBBBOSOSO.", "..ODSBBHBBSBSOSO.OO..", "..ODSSBHSSSOOSO......", "..ODSBHSO...SO.......", "...ODSHO....O........", "...ODSSO.............", "..OOSDSO.............", "..O.OSO..............", "....OO..............."] }, up: { F: ["....................", "........O....O......", ".......OHO..OHO.....", ".....OOBHBOOBHBOO...", "....OSBBHBBHBBHBSO..", "...OSBBHBBBBHBBHBSO.", "..OSBBHBBBSBBHBBBSO.", ".OSBBHBBBSBSBBHBBSO.", ".OSBHBBBSBBBSBBHBSO.", ".ODSHBBSBBHBBSBBHSDO", ".ODSBBSBBHBHBBSBBSDO", "..ODSBBBHBBBHBBBSDO.", "..ODSBBHBBSBBHBBSDO.", "..ODSSBHBSBSBHBSSDO.", "...ODSSBSBBBSBSSDO..", "...ODDSSSBSBSSSDDO..", "....OODSOSSOSDOO....", "......OO.OO.OO......"] } };
  FO.dao_ke = { pal: { x: "#4a2f1c", w: "#8a5a32", v: "#c49060", k: "#232c3d", K: "#3a4a66" }, down: { F: ["........OOOO........", ".......OBHWBO.......", "....xwwOBBHBOwwv....", ".......OSBBSO.......", "....OOOkKKKKkOOO....", "...OSBBBHBBHBBBSO...", "..OSBBBHBBBBHBBBSO..", "..OSBBHBBBBBBHBBSO..", "..ODSHBBBBBBBBHSDO..", "..OSO..........OSO..", "..OSO..........OSO..", "..OO............OO.."] }, side: { F: ["......OOOO...........", "..xw.OBHWBO..........", "....wOBBHBOw.........", ".....OSBBSOwwv.......", "....OOkKKKkOOO.......", "....OSBBBBHBBHBBSO...", "....OSBBBBHBBBBHBSO..", "...OSBBBBBBHBBBBBSO..", "..OSBBHBBBBBBHBBBSO..", "..ODSBBHBBBBBBBHSO...", "..ODSBBBHBBBBBHOO....", "..ODSSBBBBBBSOO......", "..ODSBSSO...SO.......", "...ODSSO....O........", "...ODSSO.............", "...OSDSO.............", "....OSO..............", ".....O..............."] }, up: { F: ["........OOOO........", ".......OBHWBO.......", "....xwwOBBHBOwwv....", ".......OSBBSO.......", "....OOOkKKKKkOOO....", "...OSBBBHBBHBBBSO...", "..OSBBBHBBBBHBBBSO..", "..OSBBHBBBBBBHBBSO..", ".ODSBHBBBSSBBBHBSDO.", ".ODSHBBBSBBSBBBHSDO.", ".ODHBBBSBBBBSBBBHDO.", "..ODHBSBBBBBBSBHDO..", "..ODSHBBBBBBBBHSDO..", "...ODSHBBBBBBHSDO...", "...ODDSSHBBHSSDDO...", "....OODDSSSSDDOO....", "......OOOOOOOO......"] } };
  FO.ma_vi = { pal: { r: "#7e1f22", R: "#c2413a", q: "#e87a62" }, down: { F: [".........OOO........", "........OHBBO.......", "........ORRqO.......", "....OOOOSBBSOOO.....", "...OSBBBBHBBBBBSO...", "..OSBBHBBBBBHBBBSO..", "..OSBBBBHBBBBBBBSO..", ".OSBBBHBBBBBBBBBBSO.", ".ODSBBBBBBBBBSBBSDO.", ".ODSBBBSBBBOSBBOSDO.", "..OSBBOSBOOSBOOSBO..", "...OBOSBO.OO..OSBO..", "...OB..........BO...", "...OB..........BO...", "...OB..........BO...", "...OS..........SO...", "...OS..........SO...", "....O..........O...."] }, side: { fs: [8, 18], F: [".......OOO...........", "......OHBBO..........", "....OOORRqO..........", "...OBBOOOOOOOOO......", "..OSBOSBBHBBBBBOO....", "..OBSOBBBBBHBBBBSO...", ".OBSOSBBBBBBBBHBBSO..", ".OBSOSBBBHBBBBBBBSO..", ".OSO.ODSBBBBBBBBBSO..", ".OSO.ODSBBBBBSBBOSO..", ".OBSO.ODSSBBBBOSBO...", "..OSO.ODSSSSSOBO.....", "..OBSOODO...BO.......", "..OSBOODO...BO.......", "...OSBODO...BO.......", "...OBSOO....SO.......", "...OSBO......O.......", "....OSBO.............", "....OBSO.............", "....OSBO.............", "....OBSO.............", ".....OBO.............", ".....OSO.............", ".....OO.............."] }, up: { fs: [10, 14], F: [".........OOO........", "........OHBBO.......", "........ORRqO.......", "....OOOOSBHBOOOO....", "...OSBBBOBBOBBBSO...", "..OSBBHBOBHOBHBBSO..", "..OSBHBBOBBOBBHBSO..", ".OSBHBBBOSBOBBBHBSO.", ".ODSBBBBOBHOBBBBSDO.", ".ODSBBBBOBBOBBBBSDO.", ".ODSBBBBOSBOBBBBSDO.", "..ODSBBBOBHOBBBSDO..", "..ODSSBBOBBOBBSSDO..", "...ODSSOSBBOOSSDO...", "...ODDSOBHBSODDO....", "....OODOBBBSOOO.....", ".......OSBBSO.......", ".......OBHBSO.......", ".......OBBSSO.......", ".......OSBBSO.......", "........OBSO........", "........OBSO........", "........OSO.........", ".........O.........."] } };
  FO.kiem_tu_ban_ket = { pal: { m: "#8aa4ad", M: "#c6d3d8", j: "#426e75", J: "#d7eeea" }, down: { bx: -4, by: 6, B: ["......................", "..OO..............OO..", ".OSDO............ODSO.", ".OSDO............ODSO.", ".OSBDO..........ODBSO.", ".OSBDO..........ODBSO.", ".OSBSDO........ODSBSO.", ".OSBSDO........ODSBSO.", ".OSBSDO........ODSBSO.", "OSBBSDO........ODSBBSO", "OSBBSDO........ODSBBSO", "OSBSDO..........ODSBSO", "OSBSDO..........ODSBSO", "OSSDO............ODSSO", ".OSDO............ODSO.", ".OSO..............OSO.", "..O................O.."], F: ["....................", "........OOOO........", "...mMmmOBHHBOmMmjJ..", ".......OSBBSO.......", "....OOOSBBBBSOOO....", "...OSBBHWHOHWHBBSO..", "..OSBBHWHBOBHWHBBSO.", "..OSBHWHBBOBBHWHBSO.", ".OSBBHBBBSOSBBBHBSO.", ".ODSBHBBSO.OSBBHBSDO", ".ODSBHBSO...OSBHBSDO", ".ODSHBSO.....OSHBSDO", ".ODHO.........OSHBDO", ".ODHO.........OSHBDO", ".ODHO.........OSHBDO", ".ODHO.........OSHBDO", ".ODHSO.......OSHBBDO", ".ODHSO.......OSHBBDO", ".OSHSO........OSHBDO", ".OSHBO........OSHBDO", ".OSHBO........OBHSO.", ".OSHBO........OBHSO.", ".OSHSO........OSHSO.", "..OHSO........OSHO..", "..OSO..........OSO..", "...O............O..."] }, side: { fs: [18, 12], F: [".....................", ".....OOOO............", "....OBHHBO...........", "jJmmOSBBSOmmM........", "....OOSBSOOOOOO......", "...OSBBSBBBHBBBOO....", "..OSBBBBBBHWHBBBSO...", "..OSBBBBBHWHBBBBBSO..", ".OSBBBBBBBBBHWHBBBSO.", ".OSBBBHBBBBBBBHBBOSO.", ".ODSBBBHBBBBBBBOSBOO.", ".ODSBBBBHBBBBBOSO.O..", ".ODSBBBBHBBBSO.......", ".ODSBBBBHBBBSO.......", ".ODSBBBBBHBBSO.......", ".ODSBBBBBHBBSO.......", ".ODSBBBBBHBSO........", "..ODSBBBBHBSO........", "..ODSBBBBHBSO........", "..ODSBBBHBSO.........", "..ODSBBBHBSO.........", "..ODSBBBHBSO.........", "..ODSBBHBBSO.........", "...ODSBHBSO..........", "...ODSBHBSO..........", "...ODSHBSO...........", "....OSHBSO...........", "....OSBSO............", ".....OSO.............", "......O.............."] }, up: { fs: [13, 12], F: ["....................", "....................", "......OOOOOOOO......", "....OOBBHWWHBBOO....", "...OSBBHWHHWHBBSO...", "..OSBBHWBOOBWHBBSO..", "..OSBHBBOSHBOBHBSO..", "..mmmmmMOBHSOMmmjJ..", ".ODSBHBBOSBBOBBHBSDO", ".ODSBBHBBOOOBBHBBSDO", ".ODSBBHBBSBSBBHBBSDO", ".ODSBBBHBSBSBHBBBSDO", ".ODSBBBHBSBSBHBBBSDO", ".ODSBHBBHBSBHBBHBSDO", ".ODSBHBBHBSBHBBHBSDO", ".ODSBBHBBHSHBBHBBSDO", ".ODSBBHBBHSHBBHBBSDO", ".ODSBBBHBHSHBHBBBSDO", "..ODSBBHBHSHBHBBSDO.", "..ODSBBHBHSHBHBBSDO.", "..ODSBBBHHSHHBBBSDO.", "...ODSBBHHSHHBBSDO..", "...ODSBBHHSHHBBSDO..", "....ODSBHHSHHBSDO...", "....ODSBBHSHBBSDO...", ".....ODSBHSHBSDO....", "......ODSBSBSDO.....", ".......OSBSBSO......", "........OSSO........", ".........OO........."] } };
  FO.lang_tu_truong_phat = { down: { bx: -4, by: 6, B: ["......................", "..OO..............OO..", ".OSDO............ODSO.", ".OSDO............ODSO.", "OSBDO............ODBSO", "OSBDO............ODBSO", "OSBSDO..........ODSBSO", "OSBSDO..........ODSBSO", "OSBSDO..........ODSBSO", "OSBBSO..........OSBBSO", "OSBBSO..........OSBBSO", "OSBSDO..........ODSBSO", "OSBSDO..........ODSBSO", "OSBSDO..........ODSBSO", "OSSDO............ODSSO", "OSSDO............ODSSO", ".OSO..............OSO.", ".OO................OO."], F: ["....................", "....................", ".......OOOOOO.......", ".....OOBBBBHBOO.....", "....OSBBBBHWHBSO....", "...OSBBBBHWHBOBSO...", "..OSBBBBHWHBBOBBSO..", "..OSBBBHWHBBSOSBBSO.", ".OSBBBHWHBBSODOSBSO.", ".OSBBHWHBBSO..OSBSO.", ".ODSBHHBBSOBO.OSBDO.", ".ODSBOSBOSO.O.OSBDO.", ".ODSO.........OSBDO.", ".ODBO.........OSBDO.", ".ODBO.........OSBDO.", ".ODBO.........OSBDO.", ".OSBSO.......OSBBDO.", ".OSBSO.......OSBBSO.", ".OSBSO........OSBSO.", "OSBHSO........OSHBSO", "OSBHSO........OSHBSO", "OSBHSO........OSHBSO", "OSBHSO........OSHBSO", "OSBHSO........OSHBSO", "OSBBSO........OSBBSO", "OSBSSO........OSSBSO", ".OSOSO........OSOSO.", ".OO.O..........O.OO."] }, side: { fs: [18, 14], F: [".....................", ".....................", "........OOOOOO.......", "......OOBBBBHBOO.....", ".....OSBBBBBHWHBO....", "....OSBBBBBBHWHBSO...", "...OSBBBBBBBBHWHBSO..", "..OSBBBBBBBBBBHWHBSO.", "..OSBBBBBBBBBBBHHBSO.", ".OSBBBBBBBBBBBBBHBSO.", ".OSBBBHBBBBBBBBOSBOO.", ".ODSBBBHBBBBBBOSO.O..", ".ODSBBBBHBBBSO.......", ".ODSBBBBHBBBSO.......", ".ODSBBBBBHBBSO.......", ".ODSBBBBBHBBSO.......", ".ODSBBBBBHBSO........", ".ODSBBBBBHBSO........", ".ODSBBBBBHSO.........", ".ODSBBBBHBSO.........", ".ODSBBBBHBSO.........", ".ODSBBBBHBSO.........", ".ODSBBBHBBSO.........", ".ODSBBBHBBSO.........", ".ODSBBBHBSO..........", ".ODSBBHBBSO..........", ".ODSBBHBBSO..........", ".ODSBBHBSO...........", "..ODSBHBSO...........", "..ODSBHSO............", "..OSOSBSO............", "..O.OSO.O............", ".....O..............."] }, up: { fs: [15, 14], F: ["....................", "....................", ".......OOOOOO.......", ".....OOBBBHBBOO.....", "....OSBBBHWHBBSO....", "...OSBBBHWHWHBBSO...", "..OSBBBHWHBHWHBBSO..", "..OSBBHBBBBBBHBBSO..", ".OSBBHBBBBBBBBHBBSO.", ".OSBBHBBBSBBBBHBBSO.", ".ODSBHBBBSBBBBHBSDO.", ".ODSBBHBBSBBBHBBSDO.", "ODSBBBHBBSBBBHBBBSDO", "ODSBBBHBBBSBBHBBBSDO", "ODSBBBBHBBSBHBBBBSDO", "ODSBBBBHBBSBHBBBBSDO", "ODSBHBBHBBSBHBBHBSDO", "ODSBHBBHBBSBHBBHBSDO", "ODSBHBBBHBSHBBBHBSDO", "ODSBHBBBHBSHBBBHBSDO", "ODSBBHBBHBSHBBHBBSDO", "ODSBBHBBBHSHBBHBBSDO", "ODSBBHBBBHSHBBHBBSDO", "ODSBBBHBBHSHBHBBBSDO", "ODSBBBHBBHSHBHBBBSDO", "ODSBBBHBBHSHBHBBBSO.", ".ODSBBHBBHSHBHBBSDO.", ".ODSBBHBBHSHBHBBSO..", ".ODSBSHBBHSHBHSBSO..", "..ODSOSBBHSHBSOSO...", "..OSO.OSBHSHSO.OO...", "...O...OSBSO...O....", ".........OO........."] } };
  FO.cao_ke_ngoc_quan = { pal: { j: "#69958d", J: "#b9d8ca", i: "#edf0db", g: "#c4ac79", G: "#8c7446", d: "#35595a" }, down: { F: [".......OdddddO......", "...iiiOjJjJjjdOii...", "......OjJiijjdO.....", "......OjjjjjjdO.....", "....OOgGggggGgOO....", "...OSBBBHBBHBBBSO...", "..OSBBBHBBBBHBBBSO..", "..OSBBHBBBBBBHBBSO..", "..ODSHBBBBBBBBHSDO..", "..OSO..........OSO..", "..OSO..........OSO..", "..OSO..........OSO..", "..OSO..........OSO..", "...O............O..."] }, side: { fs: [15, 3], F: [".......OddddddO......", "......iOjJjjjdOii....", ".......OjJijjdO......", "........OjjjdO.......", ".....iOOgGggGgOO.....", ".....iSBBBHBBHBBSO...", "....iSBBBBHBBBBHBSO..", "...iSBBBBBBHBBBBBSO..", "..iSBBHBBBBBBHBBBSO..", "..JDSBBHBBBBBBBHSO...", "..iDSBBBHBBBBBHOO....", "..iDSSBBBBBBSOSO.....", "..iDSBSSO...SO.......", "...JDSSO....SO.......", "...iDSSO....SO.......", "...iSDSO....SO.......", "....iSO......O.......", "....iO...............", "....J................", "....................."] }, up: { fs: [17, 6], F: [".......OdddddO......", "...iiiOddjjjjjOii...", "......OdjjjjjjO.....", "......OdjjJjjjO.....", "....OOgGggggGgOO....", "...OSBBBiBBiBBBSO...", "..OSBBBHiBBiHBBBSO..", "..OSBBHBJBBJBHBBSO..", ".ODSBHBBiBBiBBHBSDO.", ".ODSHBBBiBBiBBBHSDO.", ".ODSBBBBJBBJBBBBSDO.", "..ODSBBBiBBiBBBSDO..", "..ODSSBBiBBiBBSSDO..", "...ODSSBJBBJBSSDO...", "...ODDSSiSSiSSDDO...", "....OODDiSSiDDOO....", "......OOiOOiOO......", "........i..i........", "........J..J........", ".......i....i.......", ".......J....J.......", ".......i....i......."] } };
  FO.ma_tu_tan_phat = { down: { bx: -4, by: 6, B: ["......................", ".OO................OO.", "OSDO..............ODSO", "OSBDO............ODBSO", "OSBDO............ODBSO", "OSBSDO..........ODSBSO", ".OSBDO..........ODBSO.", ".OSBSO..........OSBSO.", "OSBSO............OSBSO", "OSSO..............OSSO", ".OO................OO."], F: [".....O....O.........", "....OBO..OHO...O....", "....OHO.OBHO..OHO...", "..O.OBBOBHBBO.OBO.O.", "..OOSBHBBBHBBOSHOOO.", "...OSBBHBBBHBBBHBSO.", "..OSBBBBHBBBBHBBBSO.", ".OSBHBBBBHBBBBHBBSO.", "OSBBBHBBBBHBBBBHBBSO", "ODSBBBHBBBBHBBBBBSDO", ".ODSBBBBOSBBBOSBBSDO", "ODSBOSBO.OSO..OSBSDO", ".ODBO.........OSBDO.", ".ODBO.........OSBBDO", "OSDBO.........OSBDO.", ".ODBO.........OBBDO.", ".OSBSO.......OSBBSO.", "OSBHSO.......OSHBO..", ".OSHSO........OSBO..", ".OSBO..........OSO..", "OSBO...........OO...", ".OSO................", "..OO................", "..O................."] }, side: { fs: [16, 12], F: ["........O...O........", ".......OBO.OHO.......", "...O...OHOOBHO.O.....", "...OO.OBHBOBBHOOO....", "....OOSBBHBBBBHBOO...", "...OSBBBHBBHBBBBBSO..", "..OSBBHBBBBBBHBBBBSO.", ".OSBBHBBBBBBBBBBHSSO.", "OSSBHBBBBBBBBHBBBSO..", ".ODSBHBBBBBBBBBSSOO..", ".ODSBBHBBBBBBBSOSO...", ".ODSBBHBBBBBBSOO.....", "OSSBBBBHBBBBSO.......", ".ODSBBBHBBBBSO.......", ".ODSBBBBHBBSO........", ".ODSBBBBHBSO.........", "OSSBBBBBHBSO.........", ".ODSBBBBHBSO.........", ".ODSBBBHBSO..........", ".ODSBBBHBSO..........", "OSSBBBHBSO...........", ".OSBBBHBSO...........", ".OSBBSHSO............", "OSSBO.OSO............", ".OSO..OO.............", "..O.................."] }, up: { fs: [14, 12], F: [".....O....O.........", "....OBO..OHO...O....", "....OHO.OBHO..OHO...", "..O.OBBOBHBBO.OBO.O.", "..OOSBBHBBBHBOSBOOO.", "...OSBBBBHBBBBBBBSO.", "..OSBBHBBBBBBHBBBSO.", ".OSBBBHBBBBBBHBBBBSO", ".OSBBBBHBBBBHBBBBBSO", "OSSBBBBHBBBBHBBBBSSO", ".ODSBBBBHBBHBBBBBSDO", ".ODSBBBBHBBHBBBBBSDO", ".ODSBHBBBHHBBBBHBSDO", "OSSBBHBBBHHBBBHBBSSO", ".ODSBBHBBBBBBBHBBSDO", ".ODSBBHBBBBBBHBBBSDO", ".ODSBBBHBBBBHBBBSDO.", "OSSBBBBHBBBHBBBBSSO.", ".ODSBBBBHBHBBBBBSDO.", ".ODSBSBBHBHBBSBSDO..", ".OSBSOSBBHBBSOSBSO..", "OSBSO.OSBHBSO.OSBSO.", ".OSO..OSBHBSO..OSO..", "..O...OSBSBSO...O...", ".......OSOSO........", "........O.O........."] } };
  FO.thanh_van_bien = { pal: { j: "#568d88", J: "#c3e2d7", d: "#2e5257" }, down: { F: ["....................", "....................", "......OOOOOOOO......", "....OOBBHHBBBBOO....", "...OSBHHBBBHHBBSO...", "..OSBHBBBHHBBBHBSO..", "..OSHBBBHBBBBHBBSO..", "..OSBBBHBBBBHBBBSO..", "..ODSBBBBBBBBBBSDO..", "..OSO.....OSO..OSO..", "..OSO......OO..OSO..", "..OO........O...OO.."] }, side: { fs: [20, 16], F: [".....................", ".....................", ".......OOOOOOO.......", ".....OOBBBHHBBOO.....", "....OSBBHHBBBBHSO....", "...OSBHHBBBBHHBBSO...", "..OSBHBBBBHHBBBBSO...", "..OSHBBBHHBBBBBBSO...", "..ODSBBHBBBBBBBHSO...", "..ODSBHBBBBBBBHSO....", "..ODSBBBBBBBBHOO.....", "..ODSSBBBBBBSOSO.....", "..ODSBSSO...SO.......", "...ODSSO....O........", "...ODSSO.............", "...OOjJO.............", "...OSBHO.............", "..OSBBBSO............", "..OBHBSO.............", "..OSBBBSO............", "..OBBHSO.............", "..OSBBBSO............", "..OBHBSO.............", "..OSBBBSO............", "..OBBHSO.............", "..OSBBBSO............", "..OBHBSO.............", "..OSBBSO.............", "..OBHSO..............", "..OdjdO..............", "..OJjjO..............", "..OBHSO..............", "..OSBSO..............", "...OSO...............", "...O................."] }, up: { fs: [16, 16], F: ["....................", "....................", "......OOOOOOOO......", "....OOBBHHBBBBOO....", "...OSBHHBBBBHHBSO...", "..OSBBHBBBBBBHBBSO..", "..OSBHBBBHHBBBHBSO..", ".ODSHBBBHBBHBBBHSDO.", ".ODSBBBHBBBBHBBBSDO.", ".ODSBBHBBBBBBHBBSDO.", "..ODSBBHBBBBHBBSDO..", "..ODSSBBHBBHBBSSDO..", "...ODSSBBHHBBSSDO...", "....ODSSBBBBSSDO....", ".....OOOSBBSOOO.....", "........OjJO........", ".......OSBHSO.......", ".......OBHBBO.......", ".......OSBBHO.......", ".......OBBHSO.......", ".......OSHBBO.......", ".......OBBBHO.......", ".......OSBHSO.......", ".......OBHBBO.......", ".......OSBBHO.......", ".......OBBHSO.......", ".......OSHBBO.......", "........OBHO........", "........OdjO........", "........OJjO........", "........OBHO........", "........OSBO........", ".........OO........."] } };
  FO.tien_tu = { pal: { p: "#d98fa3", P: "#f6d6df", q: "#9c5a6c" }, down: { bx: -4, by: 6, B: ["......................", "..OO..............OO..", ".OSDO............ODSO.", ".OSDO............ODSO.", ".OSBDO..........ODBSO.", ".OSBDO..........ODBSO.", ".OSBSDO........ODSBSO.", ".OSBSDO........ODSBSO.", "OSBBSDO........ODSBBSO", "OSBBSDO........ODSBBSO", "OSBBSDO........ODSBBSO", "OSBBSO..........OSBBSO", "OSBBSO..........OSBBSO", "OSBSDO..........ODSBSO", "OSBSDO..........ODSBSO", "OSBSDO..........ODSBSO", "OSBSDO..........ODSBSO", "OSSDO............ODSSO", ".OSO..............OSO.", ".OO................OO."], F: ["..............qPp...", ".............qPpPq..", ".......OOOOOOOqpq...", ".....OOBBHWWHBOqO...", "....OSBBHWHHWHBBO...", "...OSBBHWHBBHWHBBSO.", "..OSBBHWHBBBBHWHBSO.", "..OSBHWHBBOBBBHWHSO.", ".OSBBHBBBOSOBBBHBSO.", ".ODSBHBBO.S.OBBHBSDO", ".ODSBHBOS...SOBHBSDO", ".ODSHBO.O...O.OHBSDO", ".ODHO.........OSHBDO", ".ODHO.........OSHBDO", ".ODHO.........OSHBDO", ".ODHO.........OSHBDO", ".ODHSO.......OSHBBDO", ".ODHSO.......OSHBBDO", ".OSHBO........OSHBDO", ".OSHBO........OSHBDO", ".OSHBO........OBHSDO", ".OSHBO........OBHSDO", ".OSHSO........OSHSDO", ".OSHSO........OSHSO.", ".OSBSO........OSBSO.", "..OBSO........OSBO..", "..OSO..........OSO..", "..OSO..........OSO..", "...O............O..."] }, side: { fs: [18, 18], F: [".....................", "....qPp..............", "...qPpPq.............", "..OqpPqOOOOO.........", "..OSqqBBHWWHBOO......", "..OSBBBHWHHWHBBBO....", ".OSBBBBBBBHWHBBBSO...", ".OSBBBBBBBBBHWHBBSO..", ".OSBBBBBBBBBBBHHBBSO.", "OSBBBBHBBBBBBBBBHBSO.", "ODSBBBBHBBBBBBBOSBOO.", "ODSBBBBBHBBBBBOSO.O..", "ODSBBBBBHBBBSO.......", "ODSBBBBBHBBBSO.......", "ODSBBBBBBHBBSO.......", "ODSBBBBBBHBBSO.......", "ODSBBBBBBHBSO........", "ODSBBBBBBHBSO........", "ODSBBBBBHBSO.........", "ODSBBBBBHBSO.........", "ODSBBBBHBBSO.........", "ODSBBBBHBBSO.........", "ODSBBBHBBSO..........", "ODSBBBHBBSO..........", "ODSBBHBBBSO..........", "ODSBBHBBSO...........", "ODSBBHBBSO...........", "ODSBHBBBSO...........", ".ODSHBBSO............", ".ODSHBBSO............", ".ODSHBSO.............", "..ODHBSO.............", "..ODSBO..............", "...OSO...............", "....O................"] }, up: { fs: [16, 18], F: ["....................", "....................", "......OOOOOOOO......", "....OOBBHWWHBBOO....", "...OSBBHWHHWHBBSO...", "..OSBBHWHBBHWHBBSO..", "..OSBHBqpPPpqBHBSO..", ".OSBHBqPpqqpPqBHBSO.", ".ODSBBBqpOOpqBBBSDO.", ".ODSBBBBpBBpBBBBSDO.", ".ODSBBHBpBBpBHBBSDO.", "ODSBBBHBqBBqBHBBBSDO", "ODSBBHBBBBBBBBHBBSDO", "ODSBBHBBBSBBBBHBBSDO", "ODSBBBHBBSBBBHBBBSDO", "ODSBBBHBBSBBBHBBBSDO", "ODSBHBBHBBSBHBBHBSDO", "ODSBHBBHBBSBHBBHBSDO", "ODSBHBBBHBSHBBBHBSDO", "ODSBBHBBHBSHBBHBBSDO", "ODSBBHBBBHSHBBHBBSDO", "ODSBBHBBBHSHBBHBBSDO", "ODSBBBHBBHSHBHBBBSDO", "ODSBBBHBBHSHBHBBBSDO", ".ODSBBHBBHSHBHBBSDO.", ".ODSBBHBBHSHBHBBSDO.", ".ODSBBBHBHSHBHBBSDO.", "..ODSBBHBHSHBHBSDO..", "..ODSBBHBHSHBHBSDO..", "...ODSBBHSHBBSDO....", "...ODSBBHSHBBSDO....", "....ODSBBSBBSDO.....", ".....ODSBSBSDO......", "......ODSBSDO.......", ".......ODSDO........", "........OSO.........", ".........O.........."] } };
  var PO = { pal: { k: "#3b3a3f", c: "#9a98a0", C: "#e4e2e8", r: "#8e1b24", R: "#d9403a" }, down: { bx: 1, by: 12, B: ["DDD......DDDD", "DDDD....DDDDD", "DDDD....DDDDD", "DDDD....DDDDD", "DDDD....DDDDD", ".DDD....DDDD."], F: ["..........OOOO.......", ".........OHWBSO......", ".....OOOOOBHBSOOO....", "...OSBHWWHBSBHBSO....", "..OSBHWHBBBSBBHBSO...", ".ODSHWHBBBBSBBBHBSO..", ".ODHHBBSBBBBSBBHBSO..", ".ODHBBBBSBBSBBBBHSO..", ".ODHBBHBBSDSBBHBHSO..", ".ODHBS...R....SBHDO..", ".ODWB....r.....BSDO..", ".ODHB..........HSDO..", ".OSWB..........BHSO..", ".OSHS...........OSDO.", ".OSHS.............OHO", ".OSWS.............OSO", ".OSHB.............OHO", ".OSHB............OSHO", "..OSWO............OO.", "..OSHO..........OWSO.", "..OSHO..........OSHO.", "..OSBO...........OO..", "...OHO..........OWSO.", "...OSO..........OSHO.", "....O...........kCck.", "................kcck.", "................OHSO.", "................OBSO.", "................OHSO.", ".................OSO.", ".................OO.."] }, side: { fs: [18, 18], F: ["....OOOO.............", "...OBHWBO............", "...OSBHBOOOOOO.......", "..OSBBSDDBHHWBOO.....", "..ODSDSBHBBBHHBBOO...", ".ODSBBHBBBHHBBBHSO...", ".ODSBHBBBHHBBBHHBSO..", ".ODSBHBBHHBBBHHBBSO..", ".ODBHBBHBBBBHHBBHSO..", ".ODBHBBHBBBHHBSO.....", ".ODBHBBHBBBHSO.......", ".ODBHBBHBSBHBO.......", ".ODBHBBHBSBHBO.......", ".ODBHBBHBSBHBO.......", ".ODBBHBBHSBHSO.......", ".ODBBHBBHSBHSO.......", ".ODSBHBBHSBHSO.......", ".ODSBHBBHDBHSO.......", ".ODSBBHBHDHSO........", ".ODSBBHBHDHSO........", ".ODSBBHBBDHSO........", ".ODSBBHBBDHO.........", ".ODSBBHBBOSO.........", ".ODSBBHBBSO..........", ".ODSBHBBSO...........", ".ODSBHBBSO...........", ".ODSBHBBSO...........", ".ODSBBHBSO...........", ".ODSBBHBSO...........", "..ODSBHBSO...........", "..ODSBHBSO...........", "..ODSBHSO............", "..ODSBHSO............", "...ODSHSO............", "...ODSSO.............", "....ODSO.............", "....OSO..............", ".....O..............."] }, sideL: { fs: [18, 18], F: ["....OOOO.............", "...OBHWBO............", "...OSBHBOOOOOO.......", "..OSBBSDDBHHWBOO.....", "..ODSDSBHBBBHHBBOO...", ".ODSBBHBBBHHBBBHSO...", ".ODSBHBBBHHBBBHHBSO..", ".ODSBHBBHHBBBHHBBSO..", ".ODBHBBHBBBBHHBBHSO..", ".ODBHBBHBBBHHBSO.....", ".ODBHBBHBBBHSO.......", ".ODBHBBHBBBBSO.......", ".ODBHOWSO............", ".ODBHOSHO............", ".ODBHOOO.............", ".ODBHOWSO............", ".ODBBOSHO............", ".ODSBOOO.............", ".ODSBHOWSO...........", ".ODSBHOSHO...........", ".ODSBBOOO............", ".ODSBBHOWSO..........", ".ODSBBHkCck..........", ".ODSBBHkcck..........", ".ODSBHBOHSO..........", ".ODSBHBOBSO..........", ".ODSBHBOHSO..........", ".ODSBBHBOO...........", ".ODSBBHBSO...........", "..ODSBHBSO...........", "..ODSBHBSO...........", "..ODSBHSO............", "..ODSBHSO............", "...ODSHSO............", "...ODSSO.............", "....ODSO.............", "....OSO..............", ".....O..............."] }, up: { fs: [16, 18], F: ["......OOOO..........", ".....OHWBSO.........", ".....OBHBSOOOOO.....", "...OSBSDDDDSBHBSO...", "..OSBHBSBDDBSBHBSO..", ".ODBHSBSBBSBSHBBBDO.", ".ODHSBHSBBSBBSHBBDO.", ".ODSBHBSHBBSBBSHBDO.", ".ODBHBSBHBBBSBHSBDO.", ".ODHBSBHBBSBBHBSBDO.", ".ODBHBBHBBSBHBBHBDO.", ".ODSBHBBHBSBHBBHBDO.", ".ODSBHBBHBSBHBBHSDO.", ".OOOSBHBBHBSBHBBSDO.", "OWSODSBHBBSBHBBSDO..", "OSHODSBHBBSBHBBSDO..", ".OOODSBHBBSBHBBSDO..", "OWSODSBBHBSBHBBSDO..", "OSHODSBBHBSBHBBSDO..", ".OOODSBBHBSBHBBSDO..", "OWSODSBBHBSBHBBSDO..", "OSHODSBBHBSBHBBSDO..", "kCckDSBBHBSBHBBSDO..", "..ODSBHBBSBHBBBSDO..", "..ODSBHBBSBHBBBSDO..", "..ODSBBHBSBHBBSSDO..", "...ODSBHBSBHBBSDO...", "...ODSBHBSBHBBSDO...", "...ODSBBHSHBBBSDO...", "...ODSBBHSHBBSSDO...", "....ODSBHSHBBSDO....", "....ODSBHSHBBSDO....", "....ODSBBSHBSSDO....", ".....ODSBSHBSDO.....", ".....ODSBSHBSDO.....", "......ODSSBSDO......", ".......ODSSDO.......", "........ODDO........", ".........OO........."] } };
  function TO(a, s, B) {
    if (s.g.female || "xich_ma_toc" !== s.cfg.hair)
      if (s.g.female || "long_tuong_khan" !== s.cfg.hair)
        if (s.g.female || "huan_su_toc" !== s.cfg.hair)
          if (s.g.female || "tho_ren_khan" !== s.cfg.hair)
            if (s.g.female || "tang_kinh_bui" !== s.cfg.hair)
              if (s.g.female || "toc_truong_mao" !== s.cfg.hair)
                if (s.g.female && "lan_thanh_toc" === s.cfg.hair) {
                  !function (S, a, s) {
                    var B = a.head;
                    var o = B.x;
                    var n = B.y;
                    var i = B.w;
                    var O = o + Math.floor(i / 2);
                    var t = 0 | a.p.leg;
                    var h = JO;
                    var r = Math.min(46, n + B.h + 24);
                    if ("back" !== s) {
                      if (a.g.back) {
                        u(S, [[o - 1, n + 5], [o + 1, n + 1], [o + 4, n - 1], [o + i - 4, n - 1], [o + i, n + 3], [o + i + 1, n + 9], [o + i + 2, n + 14], [o + i + 4, n + 18], [o + i + 2, n + 23], [o + i + 4, n + 27], [o + i + 2, n + 31], [O + 4, n + 34], [O + 1, n + 31], [O - 2, n + 34], [o - 1, n + 31], [o - 3, n + 27], [o - 1, n + 23], [o - 3, n + 18], [o - 1, n + 13]], h.line);
                        u(S, [[o + 1, n + 6], [o + 3, n + 2], [o + 5, n], [o + i - 5, n], [o + i - 1, n + 4], [o + i, n + 10], [o + i + 1, n + 15], [o + i + 2, n + 19], [o + i, n + 24], [o + i + 2, n + 27], [o + i, n + 30], [O + 3, n + 32], [O + 1, n + 29], [O - 2, n + 32], [o, n + 30], [o - 2, n + 27], [o, n + 23], [o - 2, n + 18], [o, n + 13]], h.base);
                        u(S, [[o + 2, n + 8], [o + 5, n + 7], [o + 6, n + 13], [o + 4, n + 18], [o + 5, n + 23], [o + 3, n + 29], [o + 1, n + 30], [o + 1, n + 25], [o + 2, n + 20], [o, n + 15]], h.shade);
                        u(S, [[O - 2, n + 7], [O + 1, n + 7], [O + 2, n + 14], [O, n + 19], [O + 2, n + 25], [O + 1, n + 30], [O - 1, n + 31], [O - 2, n + 25], [O - 1, n + 20], [O - 3, n + 14]], h.deep);
                        e.dot(S, o + 2, n, h.line);
                        e.r(S, o + 2, n + 1, 2, 2, h.base);
                        e.line(S, o + 2, n + 8, o + 3, n + 14, h.hi);
                        e.line(S, o + 3, n + 14, o + 1, n + 20, h.hi2);
                        e.line(S, o + 1, n + 20, o + 3, n + 27, h.hi);
                        e.line(S, o + 5, n + 8, o + 6, n + 14, h.shade);
                        e.line(S, o + i - 4, n + 7, o + i - 2, n + 13, h.hi2);
                        e.line(S, o + i - 2, n + 13, o + i, n + 19, h.shade);
                        e.line(S, o + i, n + 19, o + i - 1, n + 25, h.hi);
                        e.line(S, o + i - 4, n + 17, o + i - 3, n + 23, h.deep);
                        e.line(S, O + 3, n + 9, O + 4, n + 15, h.hi);
                        e.line(S, O + 4, n + 15, O + 2, n + 21, h.shade);
                        e.line(S, O + 2, n + 21, O + 4, n + 28, h.hi2);
                        return void e.line(S, O - 4, n + 10, O - 3, n + 16, h.shade);
                      }
                      if (a.g.side) {
                        u(S, [[o - 2, n + 6], [o - 3, n + 3], [o - 1, n], [o + 2, n - 2], [o + 7, n - 2], [o + 11, n - 1], [o + i - 3, n + 1], [o + i + 1, n + 4], [o + i + 1, n + 7], [o + i - 2, n + 6], [o + i - 5, n + 4], [o + 6, n + 5], [o + 3, n + 7]], h.line);
                        u(S, [[o - 1, n + 4], [o, n + 1], [o + 3, n - 1], [o + 7, n - 1], [o + 11, n], [o + i - 3, n + 2], [o + i, n + 4], [o + i - 1, n + 5], [o + i - 5, n + 3], [o + 6, n + 4], [o + 3, n + 6]], h.base);
                        e.line(S, o + 2, n + 2, o + 7, n, h.hi);
                        e.line(S, o + 7, n, o + 12, n + 1, h.shade);
                        e.line(S, o + 11, n + 1, o + i - 3, n + 3, h.hi2);
                        u(S, [[o + 8, n + 2], [o + 12, n + 1], [o + i - 2, n + 3], [o + i, n + 5], [o + i - 3, n + 5], [o + i - 6, n + 4], [o + 9, n + 4]], h.deep);
                        e.line(S, o + 11, n + 2, o + i - 4, n + 4, h.hi);
                        u(S, [[o + 1, n + 3], [o + 5, n + 4], [o + 7, n + 7], [o + 6, n + 11], [o + 7, n + 14], [o + 5, n + 18], [o + 3, n + 21], [o + 1, n + 19], [o + 2, n + 15], [o + 1, n + 11], [o + 2, n + 7]], h.line);
                        u(S, [[o + 2, n + 5], [o + 4, n + 5], [o + 5, n + 8], [o + 4, n + 11], [o + 5, n + 14], [o + 4, n + 17], [o + 3, n + 19], [o + 2, n + 16], [o + 3, n + 12], [o + 2, n + 9]], h.base);
                        e.line(S, o + 3, n + 6, o + 4, n + 10, h.hi);
                        e.line(S, o + 4, n + 10, o + 3, n + 15, h.hi2);
                        e.line(S, o + 5, n + 8, o + 5, n + 12, h.shade);
                        u(S, [[o - 2, n + 7], [o + 1, n + 5], [o + 2, n + 10], [o, n + 15], [o - 2, n + 19], [o - 4, n + 17]], h.deep);
                        e.line(S, o, n + 9, o - 2, n + 16, h.hi);
                        return void e.line(S, o + 1, n + 8, o + 2, n + 12, h.shade);
                      }
                      u(S, [[o - 1, n + 6], [o - 2, n + 3], [o, n], [o + 3, n - 2], [o + 6, n - 2], [O - 2, n - 2], [O, n - 3], [O + 2, n - 2], [o + i - 6, n - 2], [o + i - 3, n], [o + i, n + 3], [o + i + 1, n + 6], [o + i - 1, n + 8], [o + i - 3, n + 6], [O + 2, n + 5], [O, n + 7], [O - 2, n + 5], [o + 2, n + 7]], h.line);
                      u(S, [[o, n + 4], [o, n + 2], [o + 3, n - 1], [o + 6, n - 1], [O - 2, n - 1], [O, n - 2], [O + 2, n - 1], [o + i - 6, n - 1], [o + i - 3, n + 1], [o + i, n + 4], [o + i - 1, n + 6], [O + 2, n + 4], [O, n + 6], [O - 2, n + 4], [o + 2, n + 6]], h.base);
                      u(S, [[o + 3, n + 1], [o + 6, n], [O - 2, n + 1], [O - 4, n + 4], [O - 6, n + 5], [O - 5, n + 3], [o + 7, n + 3]], h.deep);
                      u(S, [[O + 1, n + 1], [o + i - 6, n], [o + i - 3, n + 2], [o + i - 4, n + 4], [O + 3, n + 5], [O + 4, n + 3]], h.shade);
                      e.line(S, o + 3, n + 2, O - 4, n + 2, h.hi);
                      e.line(S, O + 2, n + 1, o + i - 5, n + 2, h.hi2);
                      e.line(S, O - 4, n + 4, O - 6, n + 5, h.hi);
                      e.line(S, O + 3, n + 4, o + i - 4, n + 5, h.hi);
                      u(S, [[o - 2, n + 5], [o + 1, n + 4], [o + 3, n + 8], [o + 2, n + 12], [o + 1 + t, n + 16], [o - 1 + t, n + 19], [o - 3 + t, n + 21], [o - 4 + t, n + 19], [o - 2 + t, n + 15], [o - 3, n + 11]], h.deep);
                      u(S, [[o - 1, n + 7], [o + 1, n + 6], [o + 2, n + 9], [o + 1, n + 12], [o + t, n + 16], [o - 2 + t, n + 19], [o - 3 + t, n + 18], [o - 1 + t, n + 15], [o - 2, n + 11]], h.base);
                      e.line(S, o, n + 8, o + 1, n + 11, h.hi);
                      e.line(S, o + 1, n + 11, o - 1 + t, n + 16, h.hi2);
                      e.line(S, o - 1 + t, n + 16, o - 3 + t, n + 18, h.hi);
                      uO(S, o - 3 + t, n + 21);
                      u(S, [[o + i - 3, n + 5], [o + i, n + 4], [o + i + 2, n + 7], [o + i + 3, n + 11], [o + i + 2 - t, n + 15], [o + i + 3 - t, n + 18], [o + i + 1 - t, n + 20], [o + i - 1, n + 18], [o + i - 1 + t, n + 15], [o + i, n + 12]], h.line);
                      u(S, [[o + i - 2, n + 7], [o + i, n + 6], [o + i + 1, n + 9], [o + i + 2, n + 11], [o + i + 1 - t, n + 15], [o + i + 2 - t, n + 18], [o + i - t, n + 17], [o + i - 2 + t, n + 15], [o + i - 1, n + 11]], h.shade);
                      e.line(S, o + i - 1, n + 8, o + i + 1, n + 11, h.hi2);
                      e.line(S, o + i + 1, n + 11, o + i - t, n + 15, h.hi);
                      e.line(S, o + i - t, n + 15, o + i + 1 - t, n + 17, h.hi2);
                      uO(S, o + i + 1 - t, n + 20);
                    }
                    else {
                      if (a.g.back) {
                        return;
                      }
                      if (a.g.side) {
                        var d = Math.min(46, n + B.h + 25);
                        u(S, [[o - 2, n + 5], [o + 3, n + 5], [o + 6, n + 9], [o + 5, n + 15], [o + 7 + t, n + 21], [o + 5 + t, d - 4], [o + 2 + t, d], [o - 2 + t, d - 2], [o - 6 + t, d - 6], [o - 5 + t, d - 10], [o - 7, n + 18], [o - 5, n + 11]], h.line);
                        u(S, [[o - 1, n + 7], [o + 2, n + 7], [o + 4, n + 10], [o + 3, n + 16], [o + 5 + t, d - 5], [o + 2 + t, d - 2], [o + t, d - 5], [o - 2 + t, d - 8], [o - 3 + t, d - 11], [o - 3, n + 16]], h.base);
                        u(S, [[o - 3, n + 12], [o, n + 10], [o + 1, n + 15], [o - 1 + t, d - 7], [o - 3 + t, d - 4], [o - 5 + t, d - 8]], h.deep);
                        e.line(S, o + 1, n + 9, o + 2, n + 16, h.hi);
                        e.line(S, o + 2, n + 16, o + 4 + t, d - 7, h.hi2);
                        e.line(S, o - 2, n + 16, o - 3 + t, d - 9, h.shade);
                        e.line(S, o + 4, n + 12, o + 5 + t, d - 9, h.deep);
                      }
                      else {
                        var b = r;
                        u(S, [[o + 1, n + 6], [o + 6, n + 6], [o + 7, n + 12], [o + 5, n + 18], [o + 3 + t, b - 5], [o - 1 + t, b], [o - 5 + t, b - 3], [o - 4 + t, b - 8], [o - 2, n + 18], [o - 2, n + 11]], h.line);
                        u(S, [[o + 2, n + 8], [o + 5, n + 8], [o + 5, n + 14], [o + 3 + t, n + 20], [o + 1 + t, b - 4], [o - 2 + t, b - 2], [o - 2 + t, b - 7], [o, n + 18]], h.base);
                        e.line(S, o + 3, n + 9, o + 4, n + 15, h.hi);
                        e.line(S, o + 4, n + 15, o + 1 + t, b - 6, h.hi2);
                        e.line(S, o + 1, n + 16, o - 1 + t, b - 7, h.shade);
                        u(S, [[o + i - 6, n + 6], [o + i - 1, n + 6], [o + i + 2, n + 11], [o + i + 1, n + 18], [o + i + 4 - t, b - 7], [o + i + 5 - t, b - 3], [o + i + 1 - t, b], [o + i - 2 - t, b - 5], [o + i - 3, n + 18], [o + i - 4, n + 12]], h.line);
                        u(S, [[o + i - 5, n + 8], [o + i - 2, n + 8], [o + i, n + 12], [o + i - 1, n + 18], [o + i + 2 - t, b - 5], [o + i + 2 - t, b - 2], [o + i - t, b - 5], [o + i - 4, n + 18]], h.base);
                        e.line(S, o + i - 4, n + 10, o + i - 2, n + 16, h.shade);
                        e.line(S, o + i - 2, n + 16, o + i + 1 - t, b - 7, h.hi);
                      }
                    }
                  }(a, s, B);
                }
                else if (s.g.female || "sat_luc_toc" !== s.cfg.hair)
                  if (s.g.female || "tan_mo_toc" !== s.cfg.hair)
                    if (s.g.female || "thien_luan_toc" !== s.cfg.hair)
                      if (s.g.female || "tuyet_son_toc" !== s.cfg.hair)
                        if (s.g.female || "man_ho_tu_y_toc" !== s.cfg.hair)
                          if (s.g.female || "than_kiem_toc" !== s.cfg.hair)
                            if (s.g.female || "hoang_cuu_toc" !== s.cfg.hair)
                              if (s.g.female || "chi_ton_toc" !== s.cfg.hair)
                                if (s.g.female || "hoat_tu_toc_mat_na" !== s.cfg.hair)
                                  if (s.g.female || "nam_y_toc" !== s.cfg.hair)
                                    if (s.g.female || "vuong_lam_toc" !== s.cfg.hair)
                                      if (s.g.female || "huyen_cot_toc" !== s.cfg.hair)
                                        if (s.g.female && "hong_ty_toc" === s.cfg.hair) {
                                          !function (S, a, s) {
                                            if ($S(a)) {
                                              !function (S, e, a) {
                                                var s = e.head;
                                                if ("back" !== a) {
                                                  Se(S, s.x - 3, s.y - 6, de, he, 0);
                                                }
                                                else {
                                                  Se(S, s.x - 5, s.y + 2, re, he, 0);
                                                }
                                              }(S, a, s);
                                            }
                                            else {
                                              var B = a.head;
                                              var o = B.x;
                                              var n = B.y;
                                              var i = B.w;
                                              var O = o + Math.floor(i / 2);
                                              var t = "#21130f";
                                              var h = "#321f18";
                                              var r = "#4a2c1f";
                                              var d = "#69432a";
                                              var b = "#90603a";
                                              var l = "#b4774c";
                                              var f = "#55b89a";
                                              var c = "#b7f3d3";
                                              if (!a.g.side && !a.g.back && "back" !== s) {
                                                u(S, [[O - 4, n - 1], [O - 5, n - 3], [O - 4, n - 7], [O - 2, n - 9], [O + 2, n - 9], [O + 4, n - 7], [O + 5, n - 3], [O + 4, n - 1]], t);
                                                u(S, [[O - 4, n - 2], [O - 4, n - 6], [O - 2, n - 8], [O + 2, n - 8], [O + 4, n - 6], [O + 4, n - 3], [O + 3, n - 2]], d);
                                                e.r(S, O - 2, n - 7, 4, 2, b);
                                                e.r(S, O - 1, n - 8, 3, 1, l);
                                                e.dot(S, O + 3, n - 5, r);
                                                e.dot(S, O - 4, n - 4, h);
                                                u(S, [[o - 2, n + 7], [o - 2, n + 3], [o - 1, n + 1], [o + 1, n - 2], [o + 5, n - 4], [o + i - 5, n - 4], [o + i - 1, n - 2], [o + i + 1, n + 1], [o + i + 2, n + 4], [o + i + 1, n + 8], [o + i - 2, n + 10], [o + 1, n + 10]], t);
                                                u(S, [[o, n + 5], [o + 1, n + 1], [o + 5, n - 2], [o + i - 5, n - 2], [o + i - 1, n], [o + i, n + 3], [o + i, n + 6], [o + i - 2, n + 8], [o + 1, n + 8]], d);
                                                e.line(S, O, n - 2, O - 2, n + 4, b);
                                                e.line(S, O + 1, n - 2, O + 4, n + 3, r);
                                                e.line(S, o + 2, n + 1, O - 2, n - 2, l);
                                                e.line(S, o + 3, n + 2, O - 1, n + 1, b);
                                                e.line(S, O + 2, n - 1, o + i - 2, n + 2, r);
                                                e.line(S, O + 3, n, o + i - 2, n + 4, b);
                                                u(S, [[o - 2, n + 7], [o + 2, n + 7], [o + 2, n + 12], [o + 1, n + 12], [o + 1, n + 18], [o + 2, n + 19], [o + 1, n + 25], [o - 1, n + 28], [o - 3, n + 26], [o - 3, n + 20], [o - 2, n + 14]], r);
                                                u(S, [[o + i - 2, n + 7], [o + i + 1, n + 7], [o + i + 2, n + 14], [o + i + 1, n + 20], [o + i + 1, n + 26], [o + i - 1, n + 28], [o + i - 3, n + 25], [o + i - 2, n + 19], [o + i - 3, n + 17], [o + i - 3, n + 11]], t);
                                                u(S, [[o, n + 8], [o + 2, n + 9], [o + 1, n + 16], [o + 2, n + 19], [o, n + 25], [o - 1, n + 26], [o - 1, n + 19], [o, n + 14]], d);
                                                u(S, [[o + i - 2, n + 8], [o + i, n + 9], [o + i, n + 15], [o + i - 1, n + 20], [o + i - 2, n + 26], [o + i - 3, n + 24], [o + i - 2, n + 18], [o + i - 3, n + 13]], b);
                                                e.line(S, o - 1, n + 10, o - 2, n + 17, b);
                                                e.line(S, o - 1, n + 18, o, n + 25, l);
                                                e.line(S, o + i, n + 10, o + i + 1, n + 16, r);
                                                e.line(S, o + i, n + 18, o + i - 1, n + 24, d);
                                                e.dot(S, o - 2, n + 24, b);
                                                e.dot(S, o + i - 1, n + 25, l);
                                                u(S, [[o + 3, n + 5], [o + i - 3, n + 5], [o + i - 3, n + 8], [o + i - 5, n + 9], [o + 5, n + 9], [o + 3, n + 8]], d);
                                                e.line(S, o + 3, n + 7, o + i - 4, n + 7, l);
                                                for (var G = 0; G < 5; G++)
                                                  e.r(S, o + 3 + 2 * G, n + 8, 1, 2, G % 2 ? r : h), 1 !== G && 3 !== G || e.dot(S, o + 3 + 2 * G, n + 10, b);
                                                e.r(S, O - 6, n - 1, 12, 2, t);
                                                e.line(S, O - 5, n - 1, O + 5, n - 1, c);
                                                e.r(S, O - 2, n - 3, 5, 2, "#287b70");
                                                e.r(S, O - 1, n - 3, 3, 1, c);
                                                e.dot(S, O + 2, n - 2, f);
                                                e.dot(S, O - 5, n, f);
                                                e.dot(S, O + 5, n, c);
                                              }
                                            }
                                          }(a, s, B);
                                        }
                                        else if (s.g.female && "tong_ngoc_y" === s.cfg.outfit) {
                                          !function (S, a, s) {
                                            var B = a.head;
                                            var o = B.x;
                                            var n = B.y;
                                            var i = B.w;
                                            var O = o + Math.floor(i / 2);
                                            var t = 0 | a.p.leg;
                                            var h = "#21191a";
                                            var r = "#332625";
                                            var d = "#503a32";
                                            var b = "#40302c";
                                            var l = "#795648";
                                            var f = Math.min(47, n + B.h + 24);
                                            if (a.g.side) {
                                              var c = o - 2 + t;
                                              return "back" === s ? (u(S, [[o, n + 4], [o + 6, n + 6], [o + 5, n + 20], [o + 4 + t, f - 3], [c, f], [o - 3 + t, f - 7], [o - 3, n + 17]], h), u(S, [[o + 1, n + 7], [o + 4, n + 8], [o + 3, n + 21], [o + 2 + t, f - 4], [c, f - 2], [o - 2, n + 17]], d), void e.line(S, o, n + 13, o - 1 + t, f - 6, l)) : (u(S, [[o - 2, n + 6], [o, n + 1], [o + 5, n - 2], [o + i - 3, n - 2], [o + i - 1, n], [o + i, n + 3], [o + i, n + 5], [o + i - 2, n + 7], [o + 7, n + 3], [o + 4, n + 7], [o + 3, n + 14], [o - 1, n + 17]], r), e.line(S, o + 5, n, o + 1, n + 6, l), e.line(S, o + 6, n, o + 10, n + 3, d), u(S, [[o, n + 9], [o + 3, n + 10], [o + 3, n + 21], [o + 1 + t, f - 5], [o - 1 + t, f - 3], [o - 1, n + 19]], d), e.line(S, o, n + 14, o + t, f - 7, l), e.line(S, o + 2, n + 16, o + 1 + t, f - 5, r), e.r(S, o + 3, n - 3, 5, 2, "#cbd9e0"), e.r(S, o + 4, n - 4, 3, 2, "#f2f4ee"), e.dot(S, o + 5, n - 5, "#f2f4ee"), e.dot(S, o + 6, n - 3, "#73a8bb"), u(S, [[o + 1, n + 10], [o - 2, n + 9], [o - 2, n + 12], [o, n + 14], [o + 2, n + 12]], "#dce9ed"), e.dot(S, o + 1, n + 11, "#73a8bb"), void e.dot(S, o - 1, n + 10, "#f2f4ee"));
                                            }
                                            if ("back" !== s) {
                                              u(S, [[o - 1, n + 5], [o + 1, n], [O, n - 2], [o + i - 2, n], [o + i + 1, n + 6], [o + i - 1, n + 9], [O, n + 3], [o + 1, n + 9]], r);
                                              e.line(S, O - 1, n, O - 4, n + 5, l);
                                              e.line(S, O + 1, n, O + 4, n + 5, l);
                                              e.line(S, O - 2, n + 2, o, n + 8, d);
                                              e.line(S, O + 2, n + 2, o + i, n + 8, d);
                                              if (a.g.back) {
                                                u(S, [[o, n + 4], [o + i, n + 4], [o + i + 1, n + 17], [o + i + t, f - 5], [O + 2 + t, f], [O - 2 + t, f - 2], [o + t, f - 5], [o - 1, n + 18]], h);
                                                u(S, [[o + 1, n + 5], [o + i - 1, n + 5], [o + i, n + 17], [o + i - 1 + t, f - 6], [O + 2 + t, f - 2], [o + 1 + t, f - 6], [o, n + 18]], d);
                                                e.line(S, O, n + 4, O - 1, n + 16, r);
                                                e.line(S, O - 1, n + 16, O + t, f - 3, r);
                                                e.line(S, o + 3, n + 7, o + 2, n + 22, l);
                                                e.line(S, o + 2, n + 22, o + 3 + t, f - 7, b);
                                                e.line(S, o + i - 3, n + 7, o + i - 2, n + 22, b);
                                                e.line(S, o + i - 2, n + 22, o + i - 3 + t, f - 6, l);
                                              }
                                              else {
                                                e.fatLine(S, o, n + 7, o + 1, n + 18, 2, r);
                                                e.fatLine(S, o + i - 1, n + 7, o + i - 2, n + 19, 2, d);
                                              }
                                              e.r(S, O - 3, n - 3, 7, 2, "#cbd9e0");
                                              e.r(S, O - 2, n - 4, 2, 2, "#f2f4ee");
                                              e.r(S, O + 1, n - 4, 2, 2, "#f2f4ee");
                                              e.dot(S, O, n - 5, "#f2f4ee");
                                              e.dot(S, O, n - 3, "#73a8bb");
                                              for (var G = -1; G <= 1; G += 2)
                                                if (!a.g.side || -1 !== G) {
                                                  var H = G < 0 ? o - 2 : o + i + 1;
                                                  var g = n + 10;
                                                  u(S, [[H, g], [H + 2 * G, g - 1], [H + 2 * G, g + 2], [H + G, g + 4], [H - G, g + 2]], "#dce9ed");
                                                  e.dot(S, H, g + 1, "#73a8bb");
                                                  e.dot(S, H + G, g, "#f2f4ee");
                                                }
                                            }
                                            else {
                                              if (a.g.back) {
                                                return;
                                              }
                                              u(S, [[o, n + 5], [o + i, n + 5], [o + i + 1, n + 16], [o + i + 2 + t, f - 5], [o + i - 2 + t, f], [o + 3, f - 3], [o - 2, n + 18]], h);
                                              u(S, [[o + 1, n + 7], [o + i - 1, n + 7], [o + i, n + 19], [o + i + t, f - 5], [o + i - 3 + t, f - 2], [o + 2, f - 5], [o - 1, n + 18]], d);
                                              for (var x = 0; x < 3; x++)
                                                e.line(S, o + 2 + 4 * x, n + 13, o + 2 + 4 * x + t, f - 5, 1 === x ? l : r);
                                            }
                                          }(a, s, B);
                                        }
                                        else if (s.g.female && "xich_diem_toc" === s.cfg.hair) {
                                          !function (e, a, s) {
                                            var B = PO;
                                            var o = a.head;
                                            var n = o.x;
                                            var i = o.y;
                                            var O = a.g.side;
                                            var t = a.g.back;
                                            var h = O ? QB(a) ? B.sideL : B.side : t ? B.up : B.down;
                                            var r = RO(S.Palette.pick("HAIR", a.cfg.hairColor, "hac"), B.pal);
                                            var d = a.p.sit ? 0 : O ? HB(a) : GB(a);
                                            var b = a.p.sit ? 61 : 60;
                                            if ("back" !== s) {
                                              as(e, n + (O ? -6 : -3), i - 5, h.F, r, !1, h.fs ? xB(d, h.fs[0], h.fs[1]) : null, VO(a, b));
                                            }
                                            else {
                                              if (h.B) {
                                                as(e, n + h.bx, i + h.by, h.B, r, !1, null, function (S, e) {
                                                  return e > b;
                                                });
                                              }
                                            }
                                          }(a, s, B);
                                        }
                                        else {
                                          var o = s.head;
                                          var n = S.Palette.pick("HAIR", s.cfg.hairColor, "hac");
                                          var i = o.x;
                                          var O = o.y;
                                          var t = o.w;
                                          var h = s.g.female;
                                          var r = h && "tieu_thanh" === s.cfg.hair ? "tieu_thanh" : h && "bach_nguyet_tram" === s.cfg.hair ? "bach_nguyet_tram" : h ? "tien_tu" : s.cfg.hair;
                                          var d = 0 | s.p.leg;
                                          if ("bald" !== r)
                                            if ("bach_nguyet_tram" !== r)
                                              if ("man_ho_tu_toc" !== r)
                                                if ("ma_vuong_toc" !== r)
                                                  if ("npc_curly" !== r)
                                                    if ("dai_phu_toc" !== r)
                                                      if ("smith_shaggy" === r || "tieu_thanh" === r) {
                                                        if ("back" === B) {
                                                          if (h || "ma_vi" === r) {
                                                            var b = s.g.side ? i - 3 : i + 3;
                                                            var l = s.g.side ? 5 : t - 6;
                                                            var f = O + 8;
                                                            var c = h ? 27 : 19;
                                                            u(a, [[b, f], [b + l, f], [b + l + d, f + c - 4], [b + l - 2 + d, f + c], [b + 1 + d, f + c - 2], [b - 1, f + 7]], n.deep);
                                                            e.fatLine(a, b + 2, f + 2, b + 2 + d, f + c - 4, 2, n.base);
                                                            e.line(a, b + 3, f + 3, b + 3 + d, f + c - 7, n.hi);
                                                          }
                                                          if (h) {
                                                            M(a, i, O + 6, 2, 15, n);
                                                            M(a, i + t - 2, O + 6, 2, 15, n);
                                                          }
                                                          return void ("smith_shaggy" === r && (e.r(a, i - 2, O + 5, 3, 10, n.deep), e.r(a, i + t - 1, O + 5, 3, 9, n.base), e.dot(a, i - 2, O + 14, n.line), e.dot(a, i + t, O + 14, n.shade)));
                                                        }
                                                        if (s.g.back && (h || "ma_vi" === r) && TO(a, s, "back"), u(a, [[i - 1, O + 4], [i + 1, O - 1], [i + 4, O - 2], [i + t - 4, O - 2], [i + t, O + 1], [i + t + 1, O + 5], [i + t - 1, O + 6], [i, O + 6]], n.base), e.r(a, i, O + 1, 2, 4, n.deep), e.r(a, i + 2, O, 3, 2, n.shade), e.r(a, i + t - 6, O - 1, 4, 1, n.hi), e.r(a, i + t - 4, O, 2, 2, n.hi2 || n.hi), s.g.back) {
                                                          u(a, [[i, O + 4], [i + t, O + 4], [i + t - 1, O + 12], [i + t - 4, O + 15], [i + 3, O + 15], [i, O + 11]], n.base);
                                                          e.r(a, i + 1, O + 5, 2, 7, n.deep);
                                                          e.r(a, i + t - 4, O + 4, 2, 7, n.hi);
                                                          e.line(a, i + 4, O + 8, i + 6, O + 14, n.shade);
                                                        }
                                                        else {
                                                          for (var x = 0; x < t; x++) {
                                                            var D = H.fringe[x % H.fringe.length];
                                                            if (x > 1 && x < t - 2) {
                                                              D = Math.min(3, D);
                                                            }
                                                            e.r(a, i + x, O + 2, 1, D, x < 3 ? n.deep : n.base);
                                                            if (x % 3 == 0) {
                                                              e.dot(a, i + x, O + D + 1, n.shade);
                                                            }
                                                          }
                                                          if (h || (u(a, [[i + 5, O + 2], [i + 8, O + 2], [i + 6, O + 7], [i + 5, O + 7]], n.deep), e.line(a, i + 6, O + 2, i + 5, O + 5, n.hi), e.dot(a, i + 3, O + 4, n.hi)), s.g.side) {
                                                            if (u(a, [[i - 2, O + 6], [i + 1, O + 2], [i + 3, O + 5], [i + 3, O + 8], [i + 2, O + 13], [i - 1, O + 15], [i - 3, O + 11]], n.base), e.r(a, i - 2, O + 7, 2, 7, n.deep), e.line(a, i + 1, O + 5, i + 1, O + 11, n.shade), e.dot(a, i + 2, O + 4, n.hi), e.dot(a, i - 1, O + 14, n.deep), u(a, [[i + 6, O + 1], [i + 8, O + 2], [i + 8, O + 4], [i + 7, O + 6], [i + 6, O + 7], [i + 6, O + 2]], n.base), e.r(a, i + 6, O + 3, 1, 4, n.shade), e.dot(a, i + 6, O + 7, n.deep), e.dot(a, i + 7, O + 2, n.hi), e.dot(a, i + 2, O + 5, n.base), h || "ma_vi" === r) {
                                                              var W = h ? 27 : 22;
                                                              var J = d > 0 ? 1 : d < 0 ? -1 : 0;
                                                              u(a, [[i - 2, O + 5], [i + 2, O + 2], [i + 6, O + 2], [i + 7, O + 4], [i + 7, O + 9], [i + 6, O + 13], [i + 5, O + 17], [i + 5 + J, O + W - 3], [i + 3 + J, O + W], [i + J, O + W - 1], [i - 2, O + W - 6], [i - 3, O + 11]], n.deep);
                                                              u(a, [[i - 1, O + 6], [i + 2, O + 3], [i + 5, O + 3], [i + 6, O + 5], [i + 6, O + 9], [i + 5, O + 13], [i + 4, O + 17], [i + 4 + J, O + W - 4], [i + 2 + J, O + W - 2], [i + J, O + W - 3], [i - 1, O + W - 8], [i - 2, O + 11]], n.base);
                                                              e.r(a, i + 6, O + 6, 1, 6, n.shade);
                                                              e.line(a, i + 3, O + 4, i + 5, O + 11, n.hi);
                                                              e.line(a, i + 1, O + 9, i + 1 + J, O + W - 6, n.shade);
                                                              e.line(a, i + 3, O + 14, i + 3 + J, O + W - 4, n.hi);
                                                              e.dot(a, i + 2 + J, O + W - 1, n.shade);
                                                              e.dot(a, i + 5 + J, O + W - 3, n.deep);
                                                            }
                                                          }
                                                          else if (h || "ma_vi" === r) {
                                                            var w = h ? 21 : 16;
                                                            u(a, [[i - 2, O + 4], [i + 2, O + 4], [i + 2, O + 9], [i + 1, O + w - 4], [i, O + w], [i - 2, O + w - 2], [i - 3, O + 10]], n.deep);
                                                            u(a, [[i - 1, O + 5], [i + 1, O + 5], [i + 1, O + 10], [i, O + w - 3], [i - 1, O + w - 4], [i - 2, O + 10]], n.shade);
                                                            e.line(a, i, O + 6, i, O + w - 5, n.base);
                                                            u(a, [[i + t - 2, O + 4], [i + t + 2, O + 4], [i + t + 3, O + 10], [i + t + 2, O + w - 2], [i + t, O + w], [i + t - 1, O + w - 4], [i + t - 2, O + 9]], n.base);
                                                            u(a, [[i + t - 1, O + 5], [i + t + 1, O + 5], [i + t + 2, O + 10], [i + t + 1, O + w - 4], [i + t, O + w - 3], [i + t - 1, O + 10]], n.hi);
                                                            e.line(a, i + t, O + 7, i + t, O + w - 5, n.base);
                                                            e.dot(a, i - 1, O + w - 1, n.deep);
                                                            e.dot(a, i + t + 1, O + w - 1, n.shade);
                                                          }
                                                          else {
                                                            e.r(a, i - 1, O + 5, 2, 5, n.shade);
                                                            e.r(a, i + t - 1, O + 5, 2, 4, n.base);
                                                          }
                                                        }
                                                        if ("smith_shaggy" === r) {
                                                          u(a, [[i - 1, O + 1], [i + 1, O - 4], [i + 4, O - 2], [i + 7, O - 5], [i + 10, O - 2], [i + t - 2, O - 4], [i + t + 1, O + 1]], n.deep);
                                                          e.line(a, i + 1, O - 3, i + 4, O - 1, n.hi);
                                                          e.line(a, i + 8, O - 4, i + 10, O - 2, n.base);
                                                          e.r(a, i - 2, O + 5, 2, 9, n.deep);
                                                          e.r(a, i + t, O + 5, 2, 8, n.base);
                                                          e.dot(a, i - 2, O + 14, n.line);
                                                          e.dot(a, i + t + 1, O + 13, n.deep);
                                                        }
                                                        if (h || "dao_ke" === r) {
                                                          M(a, i + 4, O - 5, 7, 4, n);
                                                          e.r(a, i + 5, O - 5, 4, 1, n.hi);
                                                          e.r(a, i + 4, O - 2, 7, 1, G.metal.shade);
                                                          if ("tieu_thanh" === r) {
                                                            e.r(a, i + 6, O - 8, 4, 2, G.metal.base);
                                                            e.r(a, i + 8, O - 10, 4, 2, G.metal.hi);
                                                            e.r(a, i + 10, O - 9, 3, 1, G.metal.shade);
                                                            e.dot(a, i + 6, O - 9, G.metal.hi);
                                                            e.dot(a, i + 12, O - 10, G.metal.base);
                                                          }
                                                        }
                                                        else {
                                                          if ("ma_vi" === r) {
                                                            M(a, s.g.side ? i - 2 : i + 4, O - 2, 5, 4, n);
                                                            e.r(a, s.g.side ? i - 1 : i + 4, O + 1, 4, 1, G.metal.base);
                                                          }
                                                          else {
                                                            e.r(a, i - 1, O + 1, 2, 2, n.deep);
                                                            e.dot(a, i + t, O, n.base);
                                                          }
                                                        }
                                                      }
                                                      else {
                                                        !function (S, e, a, s, B) {
                                                          var o = FO[s];
                                                          var n = e.head;
                                                          var i = n.x;
                                                          var O = n.y;
                                                          var t = e.g.side;
                                                          var h = e.g.back;
                                                          var r = t ? o.side : h ? o.up : o.down;
                                                          var d = RO(B, o.pal);
                                                          var b = e.p.sit ? 0 : t ? HB(e) : GB(e);
                                                          var l = e.p.sit ? 61 : o.lim || 60;
                                                          if ("back" !== a) {
                                                            as(S, i + (t ? -6 : -3), O - 5, r.F, d, !1, r.fs ? xB(b, r.fs[0], r.fs[1]) : null, VO(e, l));
                                                          }
                                                          else {
                                                            if (r.B) {
                                                              as(S, i + r.bx, O + r.by, r.B, d, !1, r.bs ? xB(b, r.bs[0], r.bs[1]) : null, function (S, e) {
                                                                return e > l;
                                                              });
                                                            }
                                                          }
                                                        }(a, s, B, h ? "tien_tu" : FO[r] && "tien_tu" !== r ? r : "dao_dong", n);
                                                      }
                                                    else {
                                                      !function (S, a, s) {
                                                        var B = a.head;
                                                        var o = B.x;
                                                        var n = B.y;
                                                        var i = B.w;
                                                        var O = o + Math.floor(i / 2);
                                                        var t = 2 * o + i - 1;
                                                        var h = Vi;
                                                        var r = (g.dai_phu_bao || G).accent;
                                                        var d = 0 | a.p.leg;
                                                        if ("back" !== s) {
                                                          if (a.g.side) {
                                                            _O(S, [[o - 2, n + 6], [o - 1, n + 1], [o + 2, n - 1], [o + i - 3, n - 1], [o + i, n + 2], [o + i, n + 4], [o + i - 4, n + 3], [o + 6, n + 4], [o + 6, n + 10], [o + 4, n + 16], [o + 3, n + 24], [o + d, n + 26], [o - 2, n + 18]], h.base, h.shade);
                                                            e.line(S, o + 1, n + 2, o + i - 4, n + 1, h.hi);
                                                            e.line(S, o + 2, n + 6, o + 1, n + 20, h.hi);
                                                            e.line(S, o + 4, n + 8, o + 2, n + 22, h.shade);
                                                            e.r(S, o + i - 6, n + 5, 4, 1, h.hi);
                                                            e.dot(S, o + i - 6, n + 6, h.base);
                                                            return void Zi(S, o + 5, n, r, !0);
                                                          }
                                                          if (a.g.back) {
                                                            _O(S, YO([[o + 2, n - 1], [o - 1, n + 2], [o - 1, n + 8], [o - 2, n + 14], [o - 1, n + 24], [o + 2 + d, n + 30], [o + 6, n + 31]], t), h.base, h.shade);
                                                            for (var b = 0; b < 4; b++) {
                                                              var l = o + 2 + 3 * b;
                                                              e.line(S, l, n + 1, l + (b < 2 ? -1 : 1) + d, n + 24 + b % 2 * 4, b % 2 ? h.shade : h.hi);
                                                            }
                                                            Zi(S, O, n, r, !1);
                                                          }
                                                          else {
                                                            _O(S, YO([[o + 6, n - 1], [o + 2, n - 1], [o - 1, n + 2], [o - 1, n + 6], [o + 1, n + 4], [o + 4, n + 2], [o + 6, n + 2]], t), h.base, h.shade);
                                                            e.line(S, O, n - 1, O, n + 2, h.shade);
                                                            e.line(S, o + 1, n + 2, o + 5, n, h.hi);
                                                            e.line(S, t - (o + 1), n + 2, t - (o + 5), n, h.base);
                                                            for (var f = [[o - 1, n + 4], [o + 1, n + 5], [o + 1, n + 13], [o + 2, n + 18], [o + 1, n + 22], [o - 1, n + 20], [o - 2, n + 12]], c = [], H = 0; H < f.length; H++)
                                                              c.push([t - f[H][0], f[H][1]]);
                                                            _O(S, f, h.base, h.shade);
                                                            _O(S, c, h.shade, h.deep);
                                                            e.line(S, o, n + 6, o, n + 18, h.hi);
                                                            e.r(S, o + 1, n + 5, 4, 1, h.hi);
                                                            e.dot(S, o + 1, n + 6, h.base);
                                                            e.r(S, o + 8, n + 5, 4, 1, h.hi);
                                                            e.dot(S, o + 11, n + 6, h.base);
                                                            Zi(S, O, n, r, !1);
                                                          }
                                                        }
                                                        else {
                                                          if (a.g.side) {
                                                            _O(S, [[o + 3, n + 4], [o - 2, n + 6], [o - 3, n + 16], [o - 2 + d, n + 30], [o + 2 + d, n + 32], [o + 5, n + 22], [o + 6, n + 8]], h.shade, h.deep);
                                                          }
                                                          else {
                                                            if (!(a.g.back)) {
                                                              _O(S, YO([[o + 2, n + 4], [o - 2, n + 8], [o - 3, n + 18], [o - 2 + d, n + 30], [o + 2, n + 32], [o + 6, n + 32]], t), h.shade, h.deep);
                                                            }
                                                          }
                                                        }
                                                      }(a, s, B);
                                                    }
                                                  else {
                                                    if (!(h)) {
                                                      (function (a, s, B) {
                                                        var o = s.head;
                                                        var n = S.Palette.pick("HAIR", "nau", "hac");
                                                        var i = o.x;
                                                        var O = o.y;
                                                        var t = o.w;
                                                        if ("back" !== B) {
                                                          if (s.g.back) {
                                                            u(a, [[i - 1, O + 2], [i + t + 1, O + 2], [i + t + 1, O + 13], [i + t - 1, O + 18], [i + 1, O + 18], [i - 1, O + 13]], n.base);
                                                            e.r(a, i, O + 5, 2, 9, n.shade);
                                                            return void e.r(a, i + t - 2, O + 5, 2, 9, n.hi);
                                                          }
                                                          if (s.g.side) {
                                                            u(a, [[i - 2, O + 4], [i, O - 2], [i + 4, O - 5], [i + t, O - 4], [i + t + 1, O + 2], [i + t, O + 8], [i + t - 2, O + 12], [i + 1, O + 14], [i - 2, O + 10]], n.base);
                                                            e.r(a, i - 1, O + 5, 2, 6, n.deep);
                                                            e.r(a, i + 1, O + 1, 2, 7, n.shade);
                                                            e.line(a, i + 3, O - 2, i + 7, O - 4, n.hi);
                                                            e.line(a, i + 5, O - 1, i + 8, O + 2, n.hi2);
                                                            e.r(a, i + t - 3, O + 4, 2, 5, n.shade);
                                                            return void e.dot(a, i + t - 1, O + 8, n.deep);
                                                          }
                                                          u(a, [[i - 2, O + 5], [i - 2, O + 1], [i, O - 3], [i + 4, O - 5], [i + t - 5, O - 5], [i + t, O - 4], [i + t + 2, O - 1], [i + t + 2, O + 4], [i + t, O + 7], [i - 1, O + 7]], n.deep);
                                                          u(a, [[i, O + 3], [i + 1, O - 2], [i + 5, O - 4], [i + t - 5, O - 4], [i + t - 1, O - 2], [i + t, O + 2], [i + t - 1, O + 4], [i + 1, O + 4]], n.base);
                                                          e.r(a, i + 2, O - 2, 4, 2, n.shade);
                                                          e.r(a, i + 7, O - 4, 4, 2, n.hi);
                                                          e.r(a, i + 12, O - 3, 4, 2, n.shade);
                                                          e.r(a, i + 3, O + 1, 3, 2, n.hi2);
                                                          e.r(a, i + 8, O, 3, 2, n.shade);
                                                          e.r(a, i + 13, O + 2, 4, 2, n.hi);
                                                          e.r(a, i + 18, O - 1, 3, 2, n.shade);
                                                          e.dot(a, i + 5, O + 3, n.deep);
                                                          e.dot(a, i + 10, O + 3, n.hi2);
                                                          e.dot(a, i + 16, O + 4, n.deep);
                                                          e.r(a, i - 1, O + 6, 2, 6, n.deep);
                                                          e.r(a, i + t - 1, O + 6, 2, 6, n.base);
                                                          e.r(a, i + 2, O + 7, 2, 2, n.shade);
                                                          e.r(a, i + t - 3, O + 7, 2, 2, n.hi);
                                                        }
                                                        else {
                                                          if (s.g.back || s.g.side) {
                                                            u(a, [[i - 1, O + 4], [i + t + 1, O + 4], [i + t + 1, O + 14], [i + t - 1, O + 18], [i + 2, O + 18], [i - 1, O + 14]], n.deep);
                                                            e.r(a, i, O + 5, t, 8, n.base);
                                                            e.r(a, i + 1, O + 7, 2, 8, n.shade);
                                                          }
                                                          else {
                                                            e.r(a, i - 1, O + 6, 2, 9, n.deep);
                                                            e.r(a, i + t - 1, O + 6, 2, 9, n.base);
                                                          }
                                                        }
                                                      })(a, s, B);
                                                    }
                                                  }
                                                else {
                                                  if (!(h)) {
                                                    (function (a, s, B) {
                                                      var o = s.head;
                                                      var n = o.x;
                                                      var i = o.y;
                                                      var O = o.w;
                                                      var t = 0 | s.p.leg;
                                                      var h = 2 * n + O - 1;
                                                      var r = "#0e0b14";
                                                      var d = "#1b1524";
                                                      var b = "#2a2136";
                                                      var l = "#4a3b5c";
                                                      var f = "#6c5782";
                                                      var c = "#18052d";
                                                      var G = "#35105d";
                                                      var H = "#5c1a96";
                                                      var g = "#8d32d0";
                                                      var x = { L: c, D: c, S: G, B: g, H: H };
                                                      var D = { L: c, D: G, S: H, B: g, H: "#c76aff" };
                                                      var W = S.Palette.pick("SKIN", s.cfg.skin, "light");
                                                      var J = W && { L: W.line, D: W.deep, S: W.shade, B: W.base, H: W.hi };
                                                      if ("back" === B) {
                                                        if (s.g.back) {
                                                          return;
                                                        }
                                                        return s.g.side ? (_O(a, [[n + 4, i - 1], [n - 1, i + 2], [n - 4, i + 6], [n - 3, i + 8], [n - 6, i + 12], [n - 4, i + 14], [n - 7 + t, i + 19], [n - 4 + t, i + 20], [n - 6 + t, i + 26], [n - 2 + t, i + 25], [n - 3 + t, i + 31], [n + 1 + t, i + 28], [n + 2 + t, i + 33], [n + 5, i + 26], [n + 6, i + 14], [n + 6, i + 4]], b, r), e.line(a, n - 1, i + 5, n - 4 + t, i + 18, l), e.line(a, n + 2, i + 8, n - 1 + t, i + 27, d), void e.line(a, n + 4, i + 12, n + 2 + t, i + 30, f)) : (_O(a, YO([[n + 3, i - 1], [n - 2, i + 3], [n - 5, i + 9], [n - 4, i + 11], [n - 7, i + 16], [n - 5, i + 18], [n - 7 + t, i + 24], [n - 4 + t, i + 25], [n - 5 + t, i + 31], [n - 1 + t, i + 29], [n + 1, i + 34], [n + 5, i + 34]], h), b, r), e.line(a, n - 3, i + 10, n - 5 + t, i + 23, l), e.line(a, h - (n - 3), i + 10, h - (n - 5) - t, i + 23, f), e.line(a, n - 1, i + 18, n - 3 + t, i + 29, d), void e.line(a, h - (n - 1), i + 18, h - (n - 3) - t, i + 29, d));
                                                      }
                                                      if (s.g.side) {
                                                        _O(a, [[n - 2, i + 3], [n, i - 1], [n + 2, i - 2], [n + 3, i - 4], [n + 5, i - 2], [n + 7, i - 5], [n + 9, i - 2], [n + 11, i - 3], [n + O - 1, i], [n + O + 1, i + 3], [n + O - 1, i + 4], [n + O - 2, i + 6], [n + O - 4, i + 4], [n + O - 6, i + 5], [n + 7, i + 4], [n + 7, i + 8], [n + 6, i + 13], [n + 4, i + 17], [n + 5 + t, i + 22], [n + 2 + t, i + 20], [n + t, i + 25], [n - 1, i + 19], [n - 4, i + 21], [n - 3, i + 15], [n - 4, i + 10], [n - 2, i + 8]], b, r);
                                                        e.line(a, n + 1, i + 1, n + 4, i - 2, f);
                                                        e.line(a, n + 7, i - 3, n + 10, i + 1, l);
                                                        e.line(a, n + O - 5, i + 1, n + O - 2, i + 3, l);
                                                        e.line(a, n + 1, i + 4, n - 1, i + 14, l);
                                                        e.line(a, n + 4, i + 9, n + 2, i + 18, d);
                                                        e.line(a, n + 5, i + 5, n + 5, i + 11, d);
                                                        if (J) {
                                                          QO(a, n + 1, i + 5, AO, J, !1);
                                                        }
                                                        return void QO(a, n + 3, i - 5, CO, D, !1);
                                                      }
                                                      if (s.g.back) {
                                                        _O(a, YO([[n + 6, i - 5], [n + 4, i - 2], [n + 2, i - 4], [n + 1, i - 1], [n - 1, i], [n - 1, i + 4], [n - 3, i + 6], [n - 2, i + 8], [n - 5, i + 11], [n - 3, i + 13], [n - 5, i + 17], [n - 2, i + 17], [n - 3 + t, i + 22], [n, i + 21], [n - 1 + t, i + 27], [n + 2, i + 25], [n + 2 + t, i + 31], [n + 4, i + 28], [n + 5 + t, i + 33], [n + 6, i + 30]], h), b, r);
                                                        for (var u = [[n - 4, i + 16], [n - 2 + t, i + 21], [n + t, i + 26], [n + 3 + t, i + 30], [n + 5 + t, i + 24]], M = [[n, i + 4], [n + 2, i + 7], [n + 3, i + 11], [n + 5, i + 9], [n + 3, i + 1]], w = 0; w < u.length; w++)
                                                          e.line(a, M[w][0], M[w][1], u[w][0], u[w][1], w % 2 ? d : l), e.line(a, h - M[w][0], M[w][1], h - u[w][0] + 2 * t, u[w][1], w % 2 ? r : d);
                                                        e.line(a, n + 2, i - 1, n + 5, i - 3, f);
                                                        e.line(a, n + O - 3, i - 1, n + O - 6, i - 3, l);
                                                        QO(a, n - 4, i - 5, CO, x, !1);
                                                        return void QO(a, h - (n - 4), i - 5, CO, x, !0);
                                                      }
                                                      _O(a, YO([[n + 6, i - 5], [n + 4, i - 2], [n + 2, i - 4], [n + 1, i - 1], [n - 1, i], [n - 2, i + 4], [n - 1, i + 6], [n + 1, i + 3], [n + 2, i + 4], [n + 4, i + 3], [n + 5, i + 4], [n + 6, i + 7]], h), b, r);
                                                      e.line(a, n + 1, i + 1, n + 4, i - 2, f);
                                                      e.line(a, n + 5, i + 3, n + 6, i - 3, l);
                                                      e.line(a, h - (n + 5), i + 3, h - (n + 6), i - 3, d);
                                                      e.line(a, h - (n + 1), i + 1, h - (n + 4), i - 2, l);
                                                      for (var N = [[n + 1, i + 3], [n + 1, i + 10], [n + 2, i + 14], [n + 1, i + 18], [n - 1, i + 16], [n - 2 + t, i + 21], [n - 3, i + 17], [n - 5, i + 19], [n - 4, i + 13], [n - 6, i + 12], [n - 3, i + 8], [n - 4, i + 5], [n - 1, i + 2]], p = [], k = 0; k < N.length; k++)
                                                        p.push([h - N[k][0] + (5 === k ? 2 * t : 0), N[k][1]]);
                                                      _O(a, N, b, r);
                                                      _O(a, p, d, "#050408");
                                                      e.line(a, n - 1, i + 5, n - 3, i + 15, l);
                                                      e.line(a, n, i + 11, n - 1 + t, i + 19, f);
                                                      e.line(a, h - (n - 1), i + 5, h - (n - 3), i + 15, b);
                                                      if (J) {
                                                        QO(a, n - 4, i + 5, jO, J, !1);
                                                        QO(a, h - (n - 4), i + 5, jO, J, !0);
                                                      }
                                                      QO(a, n - 4, i - 5, CO, D, !1);
                                                      QO(a, h - (n - 4), i - 5, CO, D, !0);
                                                    })(a, s, B);
                                                  }
                                                }
                                              else {
                                                if (!(h)) {
                                                  (function (S, e, a) {
                                                    var s = e.head;
                                                    var B = 0 | e.p.leg;
                                                    var o = e.g.side;
                                                    var n = e.g.back;
                                                    var i = { o: "#3d3937", O: "#5e5751", s: "#827970", S: "#a99f91", h: "#d0c5b6", H: "#f0dfc2", G: "#c99a3a", g: "#8a6420", Y: "#f0d08b" };
                                                    var O = ss(e);
                                                    var t = function (S, e) {
                                                      return e < 0 || S < 0 || S > 31 || !(!O || !O(S, e));
                                                    };
                                                    function h(e, a, B, o, n) {
                                                      as(S, s.x + (a - o), s.y + (B - 6), e, i, !1, n, t);
                                                    }
                                                    if ("back" !== a) {
                                                      if (n) {
                                                        h(XO, 4, 1, 9, xB(B, 12, 22));
                                                      }
                                                      else {
                                                        if (o) {
                                                          h(KO, 6, 1, 10, xB(HB(e), 12, 10));
                                                        }
                                                        else {
                                                          h(EO, 4, 1, 9, xB(B, 12, 16));
                                                        }
                                                      }
                                                    }
                                                    else {
                                                      if (n) {
                                                        return;
                                                      }
                                                      if (o) {
                                                        h(UO, 4, 9, 10, xB(HB(e), 6, 14));
                                                      }
                                                      else {
                                                        h(qO, 6, 9, 9, xB(B, 6, 14));
                                                      }
                                                    }
                                                  })(a, s, B);
                                                }
                                              }
                                            else {
                                              !function (a, s, B) {
                                                var o = s.head;
                                                var n = S.Palette.pick("HAIR", "ngan", "bach");
                                                var i = G.metal;
                                                var O = o.x;
                                                var t = o.y;
                                                var h = o.w;
                                                var r = O + Math.floor(h / 2);
                                                var d = 0 | s.p.leg;
                                                if (n) {
                                                  if ("back" === B) {
                                                    var b = s.g.side ? O - 2 : O - 1;
                                                    var l = (s.g.side, h + 2);
                                                    var f = s.g.side ? 31 : 36;
                                                    u(a, [[b, t + 3], [b + l - 2, t + 2], [b + l + 1, t + 9], [b + l + d, t + f - 5], [b + l - 4 + d, t + f + 1], [b + 3 + d, t + f - 2], [b - 1, t + f - 8]], n.deep);
                                                    u(a, [[b + 2, t + 5], [b + l - 4, t + 4], [b + l - 1, t + 11], [b + l - 4 + d, t + f - 7], [b + l - 7 + d, t + f - 1], [b + 5 + d, t + f - 4], [b + 1, t + f - 10]], n.base);
                                                    e.fatLine(a, b + 4, t + 8, b + 5 + d, t + f - 8, 2, n.shade);
                                                    e.line(a, b + l - 5, t + 8, b + l - 8 + d, t + f - 10, n.hi);
                                                    e.line(a, b + Math.floor(l / 2), t + 8, b + Math.floor(l / 2) + d, t + f - 13, n.hi2 || n.hi);
                                                    u(a, [[O + 2, t - 3], [O + 5, t - 5], [O + h - 5, t - 5], [O + h - 2, t - 2], [O + h - 3, t + 3], [O + 3, t + 3]], n.base);
                                                    e.r(a, O + 4, t - 3, h - 8, 2, n.hi);
                                                    e.r(a, O + 3, t + 1, h - 6, 2, n.shade);
                                                    e.r(a, r - 3, t + 2, 6, 2, i.base);
                                                    e.r(a, r - 2, t + 3, 4, 1, i.hi);
                                                    e.r(a, r - 1, t + 4, 2, 8, i.shade);
                                                    e.dot(a, r, t + 5, i.hi);
                                                    e.r(a, r - 4, t + 5, 2, 5, i.base);
                                                    e.r(a, r + 3, t + 5, 2, 5, i.base);
                                                    e.dot(a, r - 4, t + 10, i.hi);
                                                    return void e.dot(a, r + 3, t + 10, i.shade);
                                                  }
                                                  u(a, [[O - 1, t + 5], [O, t + 1], [O + 3, t - 2], [O + 7, t - 3], [O + h - 6, t - 3], [O + h - 2, t - 1], [O + h + 1, t + 3], [O + h, t + 7], [O + 2, t + 7]], n.deep);
                                                  u(a, [[O + 1, t + 4], [O + 2, t + 1], [O + 5, t - 1], [O + 8, t - 2], [O + h - 7, t - 2], [O + h - 3, t], [O + h - 1, t + 4], [O + h - 2, t + 6], [O + 3, t + 6]], n.base);
                                                  e.line(a, O + 3, t + 1, O + 7, t - 1, n.hi);
                                                  e.line(a, O + 7, t - 2, r, t + 2, n.hi2 || n.hi);
                                                  e.line(a, O + h - 5, t - 1, O + h - 2, t + 3, n.shade);
                                                  e.r(a, O + 1, t + 5, 2, 3, n.deep);
                                                  u(a, [[O + 4, t - 2], [O + 5, t - 4], [O + 8, t - 5], [O + 11, t - 4], [O + 12, t - 1], [O + 10, t + 1], [O + 5, t + 1]], n.base);
                                                  e.r(a, O + 6, t - 4, 5, 1, n.hi);
                                                  e.r(a, O + 5, t - 1, 7, 2, n.shade);
                                                  e.r(a, O + 7, t, 4, 1, i.base);
                                                  e.dot(a, O + 8, t, i.hi);
                                                  if (s.g.side) {
                                                    e.r(a, O, t + 6, 2, 2, n.deep);
                                                    u(a, [[O - 1, t + 7], [O + 2, t + 6], [O + 3, t + 10], [O + 2, t + 15], [O + 2, t + 20], [O, t + 22], [O - 1, t + 18]], n.deep);
                                                    u(a, [[O, t + 8], [O + 2, t + 8], [O + 2, t + 13], [O + 1, t + 18], [O, t + 19]], n.base);
                                                    e.r(a, O, t + 10, 1, 7, n.shade);
                                                    e.line(a, O + 1, t + 9, O + 1, t + 16, n.hi);
                                                    u(a, [[O + 1, t + 4], [O + 5, t + 2], [O + 8, t + 4], [O + 8, t + 9], [O + 7, t + 14], [O + 5, t + 17], [O + 2, t + 16], [O + 1, t + 11]], n.deep);
                                                    u(a, [[O + 2, t + 5], [O + 5, t + 4], [O + 7, t + 5], [O + 7, t + 10], [O + 6, t + 14], [O + 4, t + 16], [O + 2, t + 14]], n.base);
                                                    e.r(a, O + 2, t + 7, 2, 7, n.shade);
                                                    e.line(a, O + 4, t + 5, O + 6, t + 12, n.hi);
                                                    e.line(a, O + 5, t + 13, O + 3, t + 17, n.shade);
                                                    u(a, [[O + 1, t + 13], [O + 4, t + 15], [O + 5, t + 21], [O + 4, t + 26], [O + 1, t + 24], [O, t + 18]], n.deep);
                                                    e.line(a, O + 2, t + 15, O + 3, t + 23, n.base);
                                                    e.dot(a, O + 1, t + 24, n.hi);
                                                  }
                                                  else {
                                                    if (s.g.back) {
                                                      u(a, [[O - 2, t + 6], [O + h + 2, t + 6], [O + h + 3, t + 15], [O + h + 1, t + 24], [O + h - 1, t + 31], [O + h - 4, t + 35], [O + 3, t + 35], [O, t + 30], [O - 2, t + 22]], n.deep);
                                                      u(a, [[O, t + 7], [O + h, t + 7], [O + h + 1, t + 16], [O + h - 1, t + 24], [O + h - 3, t + 30], [O + h - 5, t + 33], [O + 4, t + 33], [O + 2, t + 28], [O, t + 21]], n.base);
                                                      e.r(a, O + 1, t + 7, 2, 19, n.shade);
                                                      e.r(a, O + h - 3, t + 8, 2, 20, n.hi);
                                                      e.fatLine(a, r - 2, t + 8, r - 1, t + 29, 2, n.hi2 || n.hi);
                                                      e.line(a, r + 2, t + 9, r + 1, t + 31, n.shade);
                                                      u(a, [[O + 1, t + 20], [O + 4, t + 22], [O + 5, t + 26], [O + 3, t + 29], [O + 5, t + 32], [O + 8, t + 33], [O + 7, t + 36], [O + 3, t + 35], [O, t + 31], [O + 2, t + 27], [O - 1, t + 24]], n.shade);
                                                      e.line(a, O + 2, t + 22, O + 4, t + 27, n.hi);
                                                      e.line(a, O + 3, t + 29, O + 6, t + 33, n.base);
                                                      u(a, [[O + h - 2, t + 20], [O + h - 5, t + 23], [O + h - 6, t + 27], [O + h - 4, t + 30], [O + h - 6, t + 33], [O + h - 8, t + 35], [O + h - 5, t + 36], [O + h - 1, t + 33], [O + h + 1, t + 29], [O + h - 1, t + 25], [O + h + 2, t + 23]], n.base);
                                                      e.line(a, O + h - 3, t + 22, O + h - 5, t + 27, n.hi2 || n.hi);
                                                      e.line(a, O + h - 5, t + 30, O + h - 7, t + 34, n.shade);
                                                      e.r(a, r - 3, t + 8, 6, 2, i.base);
                                                      e.dot(a, r, t + 9, i.hi);
                                                      e.dot(a, r + 1, t + 3, i.hi);
                                                      e.r(a, r, t + 4, 3, 2, i.base);
                                                      e.dot(a, r + 1, t + 5, i.deep);
                                                      e.r(a, r + 1, t + 6, 1, 8, i.shade);
                                                      e.r(a, r, t + 14, 3, 2, i.hi);
                                                      e.dot(a, r + 1, t + 15, i.base);
                                                    }
                                                    else {
                                                      u(a, [[O + 1, t + 3], [O + 4, t + 1], [O + 7, t + 2], [O + 8, t + 5], [O + 6, t + 7], [O + 5, t + 4], [O + 3, t + 6]], n.base);
                                                      u(a, [[O + h - 7, t + 1], [O + h - 3, t + 1], [O + h - 1, t + 3], [O + h - 3, t + 6], [O + h - 5, t + 7], [O + h - 5, t + 3]], n.shade);
                                                      e.line(a, O + 2, t + 2, O + 5, t + 4, n.hi);
                                                      e.line(a, O + h - 5, t + 2, O + h - 4, t + 5, n.hi);
                                                      e.r(a, O - 1, t + 6, 2, 8, n.shade);
                                                      e.r(a, O + h - 1, t + 6, 2, 8, n.base);
                                                    }
                                                  }
                                                  var c = s.g.side ? O + 2 : r + 2;
                                                  e.dot(a, c, t - 3, i.hi);
                                                  e.r(a, c - 1, t - 2, 3, 2, i.base);
                                                  e.dot(a, c, t - 1, i.deep);
                                                  e.r(a, c + 1, t, 1, 5, i.shade);
                                                  e.dot(a, c + 1, t + 5, i.hi);
                                                }
                                              }(a, s, B);
                                            }
                                        }
                                      else {
                                        !function (S, a, s) {
                                          var B = a.head;
                                          var o = B.x;
                                          var n = B.y;
                                          var i = B.w;
                                          var O = o + Math.floor(i / 2);
                                          var t = 0 | a.p.leg;
                                          var h = "#0a1020";
                                          var r = "#19233a";
                                          var d = "#293a54";
                                          var b = "#326d9d";
                                          var l = a.g.side ? o - 3 : o;
                                          var f = a.g.side ? 7 : i;
                                          var c = Math.min(46, n + B.h + 19);
                                          if (("back" === s && !a.g.back || "front" === s && a.g.back)) {
                                            u(S, [[l + 1, n + 6], [l + f - 1, n + 6], [l + f, n + 18], [l + f + t, c - 4], [l + f - 3 + t, c - 1], [l + f - 5 + t, c - 4], [l + 3 + t, c], [l - 1 + t, c - 4], [l, n + 16]], h);
                                            u(S, [[l + 2, n + 9], [l + f - 2, n + 9], [l + f - 1, n + 20], [l + f - 2 + t, c - 5], [l + 3 + t, c - 3], [l + 1, n + 19]], r);
                                            e.line(S, l + 2, n + 13, l + 2 + t, c - 5, d);
                                            e.line(S, l + f - 3, n + 16, l + f - 4 + t, c - 4, b);
                                          }
                                          if ("back" !== s) {
                                            u(S, [[o - 1, n + 4], [o, n], [o + 3, n - 2], [O + 2, n - 3], [o + i - 2, n - 1], [o + i + 1, n + 3], [o + i, n + 8], [o + i - 2, n + 6], [o + i - 4, n + 7], [O + 1, n + 4], [O - 1, n + 7], [O - 3, n + 5], [o + 1, n + 8]], h);
                                            u(S, [[o, n + 3], [o + 4, n - 1], [O + 2, n - 2], [o + i - 2, n], [o + i, n + 4], [o + i - 3, n + 5], [O + 1, n + 3], [O - 1, n + 6], [O - 3, n + 4], [o + 1, n + 7]], r);
                                            e.line(S, O, n - 1, o + 3, n + 3, d);
                                            e.line(S, O + 1, n, o + 5, n + 5, b);
                                            e.line(S, O + 4, n, o + i - 2, n + 3, d);
                                            if (a.g.back) {
                                              e.r(S, o, n + 5, i, 10, r);
                                              e.line(S, O, n + 4, O - 1, n + 18, d);
                                              e.line(S, o + 3, n + 6, o + 2, n + 16, b);
                                              e.line(S, o + i - 3, n + 7, o + i - 2, n + 18, h);
                                            }
                                            else {
                                              if (a.g.side) {
                                                u(S, [[o - 1, n + 4], [o + 4, n + 3], [o + 6, n + 6], [o + 6, n + 12], [o + 5, n + 16], [o + 3, n + 14], [o + 2, n + 17], [o - 1, n + 14]], h);
                                                u(S, [[o, n + 5], [o + 4, n + 5], [o + 5, n + 8], [o + 5, n + 12], [o + 3, n + 14], [o + 1, n + 12]], r);
                                                e.line(S, o + 2, n + 5, o + 2, n + 12, d);
                                                e.line(S, o + 3, n + 6, o + 4, n + 10, b);
                                              }
                                              else {
                                                u(S, [[o - 2, n + 5], [o + 1, n + 4], [o + 2, n + 8], [o + 1, n + 13], [o, n + 16], [o - 2, n + 13]], h);
                                                e.line(S, o, n + 6, o, n + 12, d);
                                                u(S, [[o + i - 2, n + 5], [o + i + 1, n + 5], [o + i + 2, n + 12], [o + i, n + 16], [o + i - 1, n + 13], [o + i - 2, n + 9]], h);
                                                e.line(S, o + i, n + 7, o + i, n + 12, d);
                                                e.dot(S, o + i - 1, n + 8, b);
                                              }
                                            }
                                            (function (S, a) {
                                              var s = Ve[a.dir];
                                              if (s) {
                                                for (var B = a.head.x, o = a.head.y, n = 0; n < s.length; n++) {
                                                  var i = s[n];
                                                  if (i[2]) {
                                                    e.dot(S, B + i[0], o + i[1], i[2]);
                                                  }
                                                  else {
                                                    S.clearRect(B + i[0], o + i[1], 1, 1);
                                                  }
                                                }
                                              }
                                            })(S, a);
                                          }
                                        }(a, s, B);
                                      }
                                    else {
                                      !function (S, a, s) {
                                        var B = a.head;
                                        var o = B.x;
                                        var n = B.y;
                                        var i = B.w;
                                        var O = o + Math.floor(i / 2);
                                        var t = 0 | a.p.leg;
                                        var h = "#626375";
                                        var r = "#a2a1b4";
                                        var d = "#d6d4e3";
                                        var b = "#fff9ff";
                                        var l = "#414450";
                                        var f = a.g.side ? o - 4 : o - 2;
                                        var c = a.g.side ? 10 : i + 4;
                                        var G = Math.min(48, n + B.h + 22);
                                        if ("back" === s && !a.g.back || "front" === s && a.g.back) {
                                          u(S, [[f + 2, n + 3], [f + c - 2, n + 3], [f + c, n + 15], [f + c + 1 + t, G - 8], [f + c - 2 + t, G - 4], [f + c - 3 + t, G - 7], [f + c - 6 + t, G], [f + Math.floor(c / 2), G - 3], [f + 3 + t, G - 1], [f - 1 + t, G - 7], [f, n + 19]], h);
                                          u(S, [[f + 3, n + 5], [f + c - 3, n + 5], [f + c - 1, n + 19], [f + c - 2 + t, G - 7], [f + c - 6 + t, G - 2], [f + 3 + t, G - 3], [f + 1, n + 20]], d);
                                          for (var H = 2; H < c - 2; H += 3)
                                            e.line(S, f + H, n + 13, f + H - 1, n + 25, H % 2 ? r : b), e.line(S, f + H - 1, n + 25, f + H + t, G - 6, H % 2 ? b : r);
                                        }
                                        if ("back" !== s) {
                                          if (u(S, [[o - 2, n + 6], [o - 1, n], [o + 3, n - 3], [O, n - 2], [o + i - 3, n - 3], [o + i + 1, n + 1], [o + i + 2, n + 7], [o + i - 1, n + 10], [O + 3, n + 3], [O, n + 2], [O - 3, n + 4], [o, n + 11]], h), u(S, [[o - 1, n + 4], [o, n], [o + 4, n - 2], [O, n], [o + i - 3, n - 2], [o + i, n + 2], [o + i + 1, n + 7], [o + i - 2, n + 5], [O + 2, n + 1], [O - 1, n + 1], [o + 2, n + 7], [o - 1, n + 8]], d), e.line(S, O - 1, n, o + 3, n + 1, b), e.line(S, o + 3, n + 1, o, n + 5, b), e.line(S, O + 1, n, o + i - 3, n + 1, b), e.line(S, o + i - 3, n + 1, o + i, n + 5, b), e.line(S, O - 2, n + 2, o + 1, n + 7, r), e.line(S, O + 2, n + 2, o + i - 1, n + 7, r), a.g.back) {
                                            e.r(S, o, n + 5, i, 10, d);
                                            e.line(S, O, n + 3, O - 1, n + 17, r);
                                            e.line(S, o + 2, n + 5, o + 1, n + 16, b);
                                            e.line(S, o + i - 3, n + 5, o + i - 2, n + 17, b);
                                            e.line(S, O, n - 1, O, n + 22, l);
                                            e.line(S, O + 1, n + 1, O + 1, n + 20, r);
                                            e.dot(S, O, n + 13, b);
                                            e.dot(S, O, n + 22, b);
                                          }
                                          else if (a.g.side) {
                                            u(S, [[o - 1, n + 3], [o + 3, n + 4], [o + 6, n + 3], [o + 5, n + 8], [o + 4, n + 13], [o + 2, n + 18], [o, n + 20], [o + 1, n + 15], [o - 2, n + 13]], d);
                                            e.line(S, o + 3, n + 6, o + 2, n + 15, b);
                                            e.line(S, o + 2, n + 15, o, n + 19, r);
                                            e.line(S, o + 5, n + 5, o + 4, n + 12, h);
                                          }
                                          else {
                                            for (var g = 0; g < 2; g++) {
                                              var x = g ? o + i - 1 : o;
                                              var D = g ? 1 : -1;
                                              u(S, [[x - D, n + 5], [x + 2 * D, n + 7], [x + 2 * D, n + 14], [x + 4 * D, n + 18], [x + 2 * D, n + 17], [x + 3 * D, n + 21], [x + D, n + 19], [x - D, n + 12]], d);
                                              e.line(S, x, n + 7, x + D, n + 14, b);
                                              e.line(S, x + D, n + 14, x + 3 * D, n + 18, r);
                                              e.line(S, x - D, n + 9, x, n + 16, h);
                                            }
                                          }
                                          var W = a.g.side ? O - 2 : O;
                                          u(S, [[W, n], [W - 2, n - 2], [W, n - 4], [W + 1, n - 5], [W + 1, n - 3], [W + 2, n - 1]], l);
                                          e.line(S, W, n - 1, W - 1, n - 2, r);
                                          e.line(S, W - 1, n - 2, W + 1, n - 5, b);
                                          e.dot(S, W + 1, n - 2, r);
                                          e.dot(S, W, n, b);
                                          if (!(a.g.side)) {
                                            e.line(S, o - 1, n + 3, o - 2, n, l);
                                            e.line(S, o - 2, n, o, n - 2, r);
                                            e.dot(S, o, n - 2, b);
                                            e.line(S, o + i, n + 3, o + i + 1, n, l);
                                            e.line(S, o + i + 1, n, o + i - 1, n - 2, r);
                                            e.dot(S, o + i - 1, n - 2, b);
                                          }
                                        }
                                      }(a, s, B);
                                    }
                                  else {
                                    !function (a, s, B) {
                                      var o = s.head;
                                      var n = o.x;
                                      var i = o.y;
                                      var O = o.w;
                                      var t = n + Math.floor(O / 2);
                                      var h = 0 | s.p.leg;
                                      var r = S.Palette.pick("HAIR", s.cfg.hairColor, "hac");
                                      var d = Math.min(48, i + o.h + 23);
                                      if ("back" !== B) {
                                        u(a, [[n - 2, i + 5], [n, i], [n + 4, i - 3], [t, i - 4], [n + O - 3, i - 2], [n + O + 1, i + 3], [n + O, i + 8], [t + 2, i + 5], [t - 2, i + 7], [n + 2, i + 9]], r.deep);
                                        u(a, [[n, i + 4], [n + 2, i], [t, i - 2], [n + O - 2, i], [n + O, i + 4], [t + 1, i + 3], [t - 2, i + 6], [n + 2, i + 7]], r.base);
                                        e.line(a, t - 1, i - 2, n + 2, i + 4, r.hi);
                                        e.line(a, t + 1, i - 2, n + O - 2, i + 3, r.shade);
                                        if (s.g.back) {
                                          u(a, [[n, i + 5], [n + O, i + 5], [n + O - 1, i + 15], [t + 4, i + 19], [t - 4, i + 19], [n + 1, i + 14]], r.base);
                                          e.line(a, n + 3, i + 6, t - 2, i + 17, r.hi);
                                          e.line(a, n + O - 3, i + 6, t + 2, i + 17, r.shade);
                                          e.r(a, t - 3, i + 17, 7, 3, r.deep);
                                          e.line(a, t - 3, i + 17, t + 3, i + 17, r.hi);
                                          e.r(a, t - 2, i - 5, 5, 4, r.deep);
                                          e.r(a, t - 1, i - 5, 3, 3, r.base);
                                          e.dot(a, t, i - 5, r.hi);
                                        }
                                        else {
                                          if (s.g.side) {
                                            u(a, [[n - 2, i + 5], [n + 3, i + 3], [n + 7, i + 5], [n + 6, i + 12], [n + 4, i + 18], [n + 1, i + 20], [n - 2, i + 14]], r.deep);
                                            u(a, [[n, i + 6], [n + 3, i + 5], [n + 5, i + 7], [n + 4, i + 13], [n + 2, i + 17], [n, i + 14]], r.base);
                                            e.line(a, n + 2, i + 6, n + 2, i + 16, r.hi);
                                            e.line(a, n + 5, i + 7, n + 4, i + 13, r.shade);
                                            e.r(a, n - 1, i + 16, 4, 2, r.deep);
                                            e.dot(a, n + 1, i + 16, r.hi);
                                          }
                                          else {
                                            e.r(a, n - 1, i + 6, 2, 10, r.deep);
                                            e.line(a, n, i + 7, n, i + 14, r.hi);
                                            e.r(a, n + O - 1, i + 6, 2, 9, r.base);
                                            e.line(a, n + O, i + 7, n + O, i + 13, r.shade);
                                            e.line(a, t - 3, i - 3, t + 4, i - 3, "#c88b26");
                                            e.dot(a, t + 4, i - 3, "#ffe39a");
                                          }
                                        }
                                      }
                                      else {
                                        if (!(s.g.back)) {
                                          u(a, [[n + 1, i + 6], [n + O - 1, i + 6], [n + O + 2, i + 17], [n + O + h, d - 5], [t + 4 + h, d], [t + h, d - 2], [n + 2 + h, d], [n - 2 + h, d - 5], [n - 1, i + 16]], r.deep);
                                          u(a, [[n + 3, i + 9], [n + O - 3, i + 9], [n + O - 1, i + 19], [t + 3 + h, d - 4], [t + h, d - 1], [n + 2 + h, d - 3], [n + 1, i + 18]], r.base);
                                          e.line(a, n + 4, i + 12, t - 2 + h, d - 4, r.hi);
                                          e.line(a, n + O - 4, i + 13, t + 3 + h, d - 5, r.shade);
                                          e.line(a, t, i + 16, t + h, d - 2, r.hi);
                                        }
                                      }
                                    }(a, s, B);
                                  }
                                else {
                                  ta(a, s, B);
                                }
                              else {
                                !function (S, e, a) {
                                  ja(S, e, a, Ca, { F: [pa, 4, 1], S: [ka, 6, 1], BS: [ma, 2, 3], BD: [va, 8, 22], U: [ya, 4, 1] });
                                }(a, s, B);
                              }
                            else {
                              !function (S, e, a) {
                                var s = e.head;
                                var B = s.x;
                                var o = s.y;
                                var n = e.g.side;
                                var i = e.g.back;
                                if ("back" !== a) {
                                  var O = WB(e, !1);
                                  if (i) {
                                    as(S, B - 4, o - 5, NB, JB, !1, xB(GB(e), 23, 10), O);
                                  }
                                  else {
                                    if (n) {
                                      as(S, B - 4, o - 5, pB, JB, !1, null, O);
                                      return void QO(S, B + 4, o + 10, uB, JB, !1);
                                    }
                                    as(S, B - 3, o - 5, MB, JB, !1, null, O);
                                    QO(S, B - 1, o + 10, uB, JB, !1);
                                    QO(S, B + s.w, o + 10, uB, JB, !1);
                                  }
                                }
                                else {
                                  if (n || i) {
                                    if (n) {
                                      as(S, B - 4, o + 8, kB, JB, !1, xB(HB(e), 6, 12));
                                    }
                                  }
                                  else {
                                    as(S, B - 4, o + 8, wB, JB, !1);
                                  }
                                }
                              }(a, s, B);
                            }
                          else {
                            !function (S, e, a) {
                              var s = e.head;
                              var B = s.x;
                              var o = s.y;
                              var n = e.g.side;
                              var i = e.g.back;
                              var O = GB(e);
                              if ("back" !== a) {
                                var t = WB(e, !1);
                                if (i) {
                                  as(S, B - 4, o - 5, Zs, Fs, !1, xB(O, 20, 16), t);
                                }
                                else {
                                  if (n) {
                                    as(S, B - 8, o + 2, $s, Fs, !1, xB(HB(e), 12, 16), WB(e, !0));
                                    as(S, B - 4, o - 5, Is, Fs, !1, null, t);
                                    return void QO(S, B + 4, o + 12, SB, Fs, !1);
                                  }
                                  as(S, B - 3, o - 5, Ps, Fs, !1, null, t);
                                  QO(S, B - 1, o + 12, SB, Fs, !1);
                                  QO(S, B + s.w, o + 12, SB, Fs, !1);
                                }
                              }
                              else {
                                if (!(n || i)) {
                                  as(S, B - 4, o + 6, Ts, Fs, !1);
                                }
                              }
                            }(a, s, B);
                          }
                        else {
                          !function (S, e, a) {
                            var s = e.head;
                            var B = s.x;
                            var o = s.y;
                            var n = e.g.side;
                            var i = e.g.back;
                            var O = 0 | e.p.leg;
                            var t = function (S, e) {
                              return function (a) {
                                var s = a - S;
                                return s <= 0 ? 0 : Math.round(O * Math.min(1, s / e));
                              };
                            };
                            if ("back" !== a) {
                              var h = function (S) {
                                return zs(S, function (e, a) {
                                  return a.over && !(S.g.side && 0 === e);
                                }, 4);
                              }(e);
                              if (i) {
                                as(S, B - 4, o - 3, Ns, us, !1, t(18, 14), h);
                              }
                              else {
                                if (n) {
                                  as(S, B - 4, o - 3, ps, us, !1, null, h);
                                }
                                else {
                                  as(S, B - 3, o - 3, Ms, us, !1, null, h);
                                }
                              }
                            }
                            else {
                              if (n) {
                                as(S, B - 8, o + 2, ks, us, !1, t(8, 16));
                              }
                              else {
                                if (!(i)) {
                                  as(S, B - 7, o + 2, ws, us, !1);
                                }
                              }
                            }
                          }(a, s, B);
                        }
                      else {
                        !function (S, a, s) {
                          var B = a.head;
                          var o = B.x;
                          var n = B.y;
                          var i = a.g.side;
                          var O = a.g.back;
                          var t = 0 | a.p.leg;
                          var h = function (S, e) {
                            return function (a) {
                              var s = a - S;
                              return s <= 0 ? 0 : Math.round(t * Math.min(1, s / e));
                            };
                          };
                          if ("back" !== s) {
                            var r = ss(a);
                            if (O) {
                              as(S, o - 3, n - 5, Ia, Pa, !1, h(20, 22), r);
                              e.line(S, o + 9, n - 3, o + 14, n - 1, Pa.z);
                              return void as(S, o + 15, n - 1, es, Fa, !1);
                            }
                            if (i) {
                              as(S, o - 4, n - 5, $a, Pa, !1, null, r);
                            }
                            else {
                              as(S, o - 3, n - 5, Ta, Pa, !1, null, r);
                            }
                          }
                          else {
                            if (i || O) {
                              if (i) {
                                as(S, o - 8, n - 5, Ss, Pa, !1, h(16, 24));
                                e.line(S, o + 1, n - 3, o - 4, n + 1, Pa.r);
                                e.line(S, o - 4, n + 1, o - 5, n + 8, Pa.z);
                                e.line(S, o + 1, n - 4, o - 3, n - 2, Pa.z);
                                as(S, o - 6, n - 2, es, Fa, !1);
                              }
                            }
                            else {
                              as(S, o + 6, n - 5, Za, Pa, !1, h(18, 20));
                              e.line(S, o + 10, n - 3, o + 15, n + 2, Pa.r);
                              e.line(S, o + 15, n + 2, o + 16, n + 8, Pa.z);
                              e.line(S, o + 9, n - 3, o + 17, n + 1, Pa.z);
                              as(S, o + 17, n + 2, es, Fa, !1);
                            }
                          }
                        }(a, s, B);
                      }
                    else {
                      !function (S, e, a) {
                        ja(S, e, a, La, { F: [Ja, 4, 1], S: [ua, 6, 1], BS: [Ma, 4, 5], BD: [wa, 6, 22], U: [Na, 4, 1] });
                      }(a, s, B);
                    }
                  else {
                    !function (S, a, s) {
                      if ("back" !== s) {
                        var B = a.head;
                        var o = B.x;
                        var n = B.y;
                        var i = a.g.side;
                        var O = a.g.back;
                        var t = GB(a);
                        var h = qo(a, !1);
                        if (O) {
                          as(S, o - 5, n - 6, Wo, Ho, !1, xB(t, 18, 10), l(h));
                        }
                        else {
                          if (i) {
                            var r = qo(a, !0);
                            var d = xB(HB(a), 13, 10);
                            var b = l(r ? function (S, e) {
                              return e >= n + 14 ? r(S, e) : !(!h || !h(S, e));
                            } : h);
                            as(S, o - 10, n - 6, xo, Ho, !1, d, b);
                            as(S, o - 9, n + 6, Do, Ho, !1, function (S) {
                              return d(S + 12);
                            }, b);
                            e.dot(S, o + 4, n + 12, Ho.k);
                            e.dot(S, o + 4, n + 13, Ho.e);
                            e.dot(S, o + 10, n + 11, Ho.t);
                            return void e.dot(S, o + 10, n + 12, Ho.T);
                          }
                          as(S, o - 4, n - 6, go, Ho, !1, null, l(h));
                          e.dot(S, o + 3, n + 11, Ho.t);
                          e.dot(S, o + 3, n + 12, Ho.T);
                          e.dot(S, o + B.w, n + 12, Ho.k);
                          e.dot(S, o + B.w, n + 13, Ho.e);
                        }
                      }
                      function l(S) {
                        return function (e, a) {
                          return a < 0 || e < 0 || e > 31 || !(!S || !S(e, a));
                        };
                      }
                    }(a, s, B);
                  }
                else {
                  !function (S, e, a) {
                    var s = e.head;
                    var B = s.x;
                    var o = s.y;
                    var n = e.g.side;
                    var i = e.g.back;
                    var O = GB(e);
                    if ("back" !== a) {
                      var t = Go(e, !1);
                      if (i) {
                        as(S, B - 4, o - 5, LB, mB, !1, xB(O, 22, 16), t);
                      }
                      else {
                        if (n) {
                          var h = Go(e, !0);
                          as(S, B - 3, o + 14, jB, mB, !1, xB(HB(e), 4, 16), h);
                          return void as(S, B - 4, o - 5, CB, mB, !1, null, h ? function (S, e) {
                            return e >= o + 14 ? h(S, e) : !(!t || !t(S, e));
                          } : t);
                        }
                        as(S, B - 3, o - 5, vB, mB, !1, xB(O, 22, 10), t);
                      }
                    }
                    else {
                      if (!(n || i)) {
                        as(S, B - 4, o + 6, yB, mB, !1, xB(O, 12, 10));
                      }
                    }
                  }(a, s, B);
                }
              else {
                !function (S, e, a) {
                  var s = e.head;
                  var B = e.g.side;
                  var o = e.g.back;
                  var n = GB(e);
                  var i = Pn(e, !1);
                  if ("back" === a) {
                    if (o) {
                      return;
                    }
                    return B ? void Xn(S, e, Cn, 1, 0, 10, Un(HB(e), 14, 26, 0), Kn()) : void Xn(S, e, Nn, 0, 1, 9, Un(n, 26, 12, 1), Kn());
                  }
                  if (o) {
                    Xn(S, e, En, 0, 1, 9, Un(n, 26, 12, 1), Kn(i));
                  }
                  else if (B) {
                    var O = Pn(e, !0);
                    var t = Kn(O ? function (S, e) {
                      return e >= s.y + 14 ? O(S, e) : !(!i || !i(S, e));
                    } : i);
                    Xn(S, e, jn, 9, 5, 10, Un(HB(e), 24, 8, 5), t);
                  }
                  else {
                    Xn(S, e, pn, 7, 5, 9, null, Kn(i));
                  }
                }(a, s, B);
              }
            else {
              !function (S, a, s) {
                if ("back" !== s) {
                  var B = a.head;
                  var o = B.x;
                  var n = B.y;
                  var i = B.w;
                  var O = ee;
                  if ($S(a)) {
                    Se(S, o - 2, n - 6, ae, O, 0);
                  }
                  else {
                    var t = o + Math.floor(i / 2);
                    u(S, [[o - 1, n + 6], [o - 1, n + 1], [o + 1, n - 1], [o + i - 2, n - 1], [o + i, n + 1], [o + i, a.g.back ? n + 12 : n + 4], [o + i - 3, a.g.back ? n + 13 : n + 3], [o + 2, a.g.back ? n + 13 : n + 3]], O.w);
                    e.line(S, o + 1, n, o + i - 2, n, O.W);
                    e.r(S, o - 1, n + 2, 1, 4, O.s);
                    e.r(S, t - 3, n - 5, 6, 4, O.w);
                    e.r(S, t - 3, n - 5, 1, 4, O.s);
                    e.r(S, t - 4, n - 2, 8, 1, O.G);
                  }
                }
              }(a, s, B);
            }
          else {
            !function (a, s, B) {
              if ("back" !== B)
                if ($S(s)) {
                  !function (S, e) {
                    Se(S, e.head.x - 3, e.head.y - 6, De, xe, 0);
                  }(a, s);
                }
                else {
                  var o = s.head;
                  var n = S.Palette.pick("HAIR", s.cfg.hairColor, "hac");
                  var i = o.x;
                  var O = o.y;
                  var t = o.w;
                  var h = TS;
                  var r = (0 | s.p.leg) > 0 ? 1 : 0;
                  if (s.g.back) {
                    u(a, [[i - 1, O + 11], [i - 1, O + 1], [i + 1, O - 1], [i + t - 1, O - 1], [i + t, O + 1], [i + t, O + 11], [i + t - 2, O + 12], [i + 2, O + 12]], n.base);
                    u(a, [[i - 1, O + 3], [i - 1, O + 1], [i + 1, O - 1], [i + t - 1, O - 1], [i + t, O + 1], [i + t, O + 3]], h.base);
                    e.r(a, i - 1, O + 2, t + 2, 2, h.deep);
                    e.line(a, i, O + 2, i + t - 1, O + 2, h.shade);
                    e.line(a, i + 2, O, i + t - 3, O, h.hi);
                    e.line(a, i - 1, O + 3, i + t, O + 3, h.line);
                    e.r(a, i + 5, O + 3, 4, 3, h.base);
                    e.dot(a, i + 6, O + 3, h.hi);
                    e.line(a, i + 5, O + 5, i + 8, O + 5, h.deep);
                    e.fatLine(a, i + 5, O + 6, i + 4 + r, O + 10, 2, h.base);
                    e.fatLine(a, i + 8, O + 6, i + 9 - r, O + 11, 2, h.shade);
                    e.dot(a, i + 4 + r, O + 10, h.deep);
                    e.dot(a, i + 9 - r, O + 11, h.line);
                    return void e.r(a, i + 2, O + 9, t - 4, 2, n.shade);
                  }
                  if (s.g.side) {
                    u(a, [[i - 2, O + 12], [i - 2, O + 1], [i, O - 1], [i + t - 2, O - 1], [i + t - 1, O + 1], [i + t - 1, O + 4], [i + t - 3, O + 4], [i + 6, O + 5], [i + 6, O + 7], [i + 3, O + 6], [i + 3, O + 9], [i + 2, O + 11]], n.base);
                    u(a, [[i - 2, O + 3], [i - 2, O + 1], [i, O - 1], [i + t - 2, O - 1], [i + t - 1, O + 1], [i + t - 1, O + 3]], h.base);
                    e.r(a, i - 2, O + 2, t + 1, 2, h.deep);
                    e.line(a, i - 1, O + 1, i + t - 2, O + 1, h.shade);
                    e.line(a, i + 1, O, i + t - 4, O, h.hi);
                    e.line(a, i - 2, O + 3, i + t - 1, O + 3, h.line);
                    e.r(a, i - 4, O + 1, 3, 3, h.base);
                    e.dot(a, i - 4, O + 1, h.hi);
                    e.dot(a, i - 3, O + 3, h.deep);
                    e.fatLine(a, i - 3, O + 4, i - 5 - r, O + 10, 2, h.shade);
                    e.dot(a, i - 5 - r, O + 10, h.line);
                    e.line(a, i - 2, O + 4, i - 3 - r, O + 8, h.base);
                    return void e.line(a, i - 1, O + 10, i + 2, O + 11, n.deep);
                  }
                  u(a, [[i - 1, O + 3], [i - 1, O + 1], [i + 1, O - 1], [i + t - 1, O - 1], [i + t, O + 1], [i + t, O + 3]], h.base);
                  e.r(a, i - 1, O + 2, t + 2, 2, h.deep);
                  e.line(a, i, O + 1, i + t - 1, O + 1, h.shade);
                  e.line(a, i + 2, O, i + t - 3, O, h.hi);
                  e.line(a, i - 1, O + 3, i + t, O + 3, h.line);
                  e.line(a, i + 3, O + 2, i + 4, O, h.shade);
                  e.line(a, i + 9, O + 2, i + 10, O, h.shade);
                  e.r(a, i + t, O, 3, 3, h.base);
                  e.dot(a, i + t, O, h.hi);
                  e.dot(a, i + t + 2, O + 2, h.deep);
                  e.fatLine(a, i + t + 1, O + 3, i + t + 1 + r, O + 9, 2, h.shade);
                  e.dot(a, i + t + 1 + r, O + 9, h.line);
                  e.line(a, i + t, O + 3, i + t - r, O + 7, h.base);
                  e.dot(a, i - 1, O + 4, n.base);
                  e.dot(a, i - 1, O + 5, n.shade);
                  e.dot(a, i, O + 4, n.base);
                  e.dot(a, i + t - 1, O + 4, n.shade);
                }
            }(a, s, B);
          }
        else {
          !function (a, s, B) {
            if ("back" !== B) {
              var o = s.head;
              var n = S.Palette.pick("HAIR", s.cfg.hairColor, "hac");
              var i = o.x;
              var O = o.y;
              var t = o.w;
              var h = O - 1;
              if (s.g.back) {
                u(a, [[i - 1, O + 11], [i - 1, O + 1], [i + 1, O - 2], [i + t - 1, O - 2], [i + t, O + 1], [i + t, O + 11], [i + t - 2, O + 12], [i + 2, O + 12]], n.base);
                e.r(a, i - 1, O + 3, 2, 8, n.shade);
                e.r(a, i + t - 2, O + 3, 2, 8, n.hi);
                e.r(a, i + 2, O + 10, t - 4, 2, n.shade);
                e.line(a, i + 3, O + 12, i + t - 4, O + 12, n.deep);
                FS(a, i + 2, h, 3, -1, n);
                FS(a, i + 5, h, 4, 0, n);
                FS(a, i + 8, h, 3, 1, n);
                FS(a, i + 11, h, 4, 0, n);
                e.line(a, i + 3, O + 2, i + 5, O + 8, n.hi);
                return void e.line(a, i + 9, O + 3, i + 10, O + 9, n.shade);
              }
              if (s.g.side) {
                u(a, [[i - 2, O + 13], [i - 2, O + 1], [i, O - 2], [i + t - 2, O - 2], [i + t - 1, O + 1], [i + t - 1, O + 4], [i + t - 4, O + 3], [i + 6, O + 5], [i + 6, O + 7], [i + 3, O + 6], [i + 3, O + 9], [i + 2, O + 12]], n.base);
                e.r(a, i - 2, O + 4, 2, 8, n.shade);
                e.line(a, i + 3, O + 2, i + 7, O + 3, n.hi);
                e.line(a, i - 1, O + 12, i + 2, O + 12, n.deep);
                FS(a, i, h, 3, -2, n);
                FS(a, i + 3, h, 4, -1, n);
                FS(a, i + 6, h, 4, 1, n);
                FS(a, i + 9, h, 3, 2, n);
                e.dot(a, i + 6, O + 6, n.shade);
                return void e.dot(a, i + 5, O + 5, n.deep);
              }
              u(a, [[i - 1, O + 6], [i - 1, O + 1], [i + 1, O - 2], [i + t - 1, O - 2], [i + t, O + 1], [i + t, O + 6], [i + t - 1, O + 6], [i + t - 1, O + 5], [i + t - 3, O + 4], [i + t - 4, O + 2], [i + 4, O + 2], [i + 3, O + 4], [i + 1, O + 5], [i + 1, O + 6]], n.base);
              FS(a, i + 1, h, 2, -1, n);
              FS(a, i + 4, h, 4, -1, n);
              FS(a, i + 7, h, 3, 0, n);
              FS(a, i + 10, h, 5, 1, n);
              FS(a, i + 13, h, 2, 1, n);
              e.r(a, i - 1, O + 2, 2, 4, n.shade);
              e.r(a, i + t - 1, O + 2, 2, 4, n.hi);
              e.line(a, i + 3, O, i + 5, O + 2, n.hi);
              e.line(a, i + 8, O - 1, i + 10, O + 1, n.hi2 || n.hi);
              e.dot(a, i + 6, O + 1, n.shade);
              e.dot(a, i + 11, O + 2, n.shade);
              e.dot(a, i, O + 6, n.deep);
              e.dot(a, i + t - 1, O + 6, n.shade);
            }
          }(a, s, B);
        }
      else {
        !function (S, e, a) {
          var s = Ko;
          var B = Uo(S);
          var o = B.rect;
          var n = B.dot;
          var i = B.line;
          var O = B.poly;
          var t = e.head;
          var h = t.x;
          var r = t.y;
          var d = t.w;
          var b = e.g.side;
          var l = e.g.back;
          var f = e.p.leg || 0;
          var c = b ? h : h + 4;
          if (("back" === a ? !l : l) && (O([[c, r + 5], [c + 5, r + 5], [c + 6 + f, r + 22], [c + 3 + f, r + 24], [c + 1, r + 17]], s.ink), O([[c + 1, r + 6], [c + 4, r + 6], [c + 5 + f, r + 21], [c + 3 + f, r + 22]], s.navy), i(c + 2, r + 8, c + 3 + f, r + 20, s.steelHi)), "back" !== a)
            if (O([[h, r + 5], [h, r], [h + 3, r - 3], [h + d - 4, r - 3], [h + d - 1, r], [h + d, r + 5]], s.ink), O([[h + 1, r + 4], [h + 1, r], [h + 4, r - 2], [h + d - 4, r - 2], [h + d - 2, r + 1], [h + d - 1, r + 4]], s.navy), i(h + 3, r - 1, h + d - 5, r - 1, s.steelHi), i(h + 2, r + 1, h + d - 3, r + 2, s.steel), o(h, r + 4, d, 2, s.steel), o(h, r + 6, d, 1, s.ink), l) {
              O([[h, r + 6], [h + d - 1, r + 6], [h + d - 2, r + 13], [h + d - 5, r + 15], [h + 3, r + 14], [h, r + 10]], s.navy);
              i(h + 2, r + 7, h + 3, r + 12, s.steel);
              o(h + 5, r + 6, 4, 3, s.steelHi);
              i(h + 5, r + 9, h + 6 + f, r + 22, s.steel, 3);
              i(h + 6, r + 9, h + 7 + f, r + 21, s.steelHi);
            }
            else {
              var G = b ? h + d - 3 : h + Math.floor(d / 2);
              n(G, r + 3, s.goldHi);
              o(G - 1, r + 4, 3, 1, s.gold);
              n(G, r + 5, s.goldDark);
              o(h, r + 6, 2, 4, s.hair);
              if (!(b)) {
                o(h + d - 2, r + 6, 2, 4, s.hair);
              }
            }
        }(a, s, B);
      }
    else {
      !function (a, s, B) {
        if ("back" !== B) {
          var o = ss(s);
          !function (a, s, B) {
            if (s.g.back || s.g.side) {
              var o = S.Palette.pick("HAIR", "hac", "hac");
              var n = s.head;
              var i = n.x;
              var O = n.y;
              var t = {};
              var h = { line: o.line, hi: o.hi, base: o.base, shade: o.shade };
              if (s.g.back) {
                NO(t, i, O, [[1, 12], [0, 13], [0, 13], [0, 13], [0, 13], [0, 13], [0, 13], [0, 13], [0, 13], [1, 12], [1, 12], [2, 11], [3, 5, 8, 10]]);
                mO(a, t, h, B);
                r(i + 3, O + 5, o.hi2);
                r(i + 3, O + 6, o.hi);
                r(i + 10, O + 6, o.hi2);
                r(i + 10, O + 7, o.hi);
                r(i + 6, O + 8, o.hi);
                r(i + 7, O + 9, o.hi);
                r(i + 6, O + 7, o.shade);
                r(i + 7, O + 7, o.shade);
                r(i + 4, O + 10, o.shade);
                r(i + 9, O + 10, o.shade);
              }
              else {
                NO(t, i, O + 2, [[2, 6], [1, 6], [0, 5], [0, 4], [0, 4], [0, 4], [0, 4], [1, 4], [1, 3], [2, 3]]);
                mO(a, t, h, B);
                r(i + 1, O + 5, o.hi2);
                r(i + 1, O + 6, o.hi);
                r(i + 2, O + 8, o.hi);
                r(i + 3, O + 10, o.hi);
              }
            }
            function r(S, s, o) {
              if (!(!(S >= 0 && S <= 31 && s >= 0) || B && B(S, s))) {
                e.dot(a, S, s, o);
              }
            }
          }(a, s, o);
          (function (a, s, B) {
            var o;
            var n;
            var i = g.xich_ma_y;
            var O = i.rock;
            var t = i.lava;
            var h = S.Palette.pick("SKIN", s.cfg.skin, "light");
            var r = s.head;
            var d = r.x;
            var b = r.y;
            var l = r.w;
            var f = s.g.side;
            var c = s.g.back;
            var G = 2 * d + l - 1;
            var H = {};
            var x = {};
            var D = {};
            if (f) {
              wO(H, [[d + 9.2, b + 1.6], [d + 9.6, b - .8], [d + 10.6, b - 3], [d + 11.4, b - 4.8]], [1.5, 1.4, 1.1, .5]);
              mO(a, H, { line: O.line, hi: O.shade, base: O.deep, shade: O.line }, B);
              wO(x, [[d + 7.4, b + 4.4], [d + 4.6, b + 1.6], [d + 2.2, b - 1.6], [d + 1.2, b - 4], [d + 2.4, b - 5.8]], [2.4, 2.3, 2, 1.5, .6]);
              wO(x, [[d + 9.6, b + .4], [d + 9.2, b - 2.8]], [1.2, .45]);
              wO(x, [[d + 6.4, b + .4], [d + 5.6, b - 3.2]], [1.3, .45]);
              mO(a, x, O, B);
              NO(D, d, b, [[2, 10], [1, 11], [0, 2, 10, 12]]);
            }
            else {
              wO(x, [[d + 1, b + 2.2], [d - 1.2, b + .4], [d - 2.8, b - 2], [d - 3, b - 4.2], [d - 1.8, b - 5.8]], [2.1, 1.9, 1.6, 1.1, .5]);
              kO(x, pO(x, G));
              mO(a, x, O, B);
              wO(o = {}, [[d + 6.5, b + .5], [d + 6.5, b - 5.4]], [2, .55]);
              wO(o, [[d + 3.4, b + .5], [d + 2.6, b - 3]], [1.2, .45]);
              kO(o, pO(o, G));
              mO(a, o, O, B);
              NO(D, d, b, c ? [[2, 11], [1, 12], [0, 13], [0, 13], [1, 12]] : [[2, 11], [1, 12], [0, 2, 11, 13]]);
            }
            mO(a, D, O, B);
            var W;
            var J = f ? [3, 6, 9] : [3, 5, 8, 10];
            for (W = 0; W < J.length; W++)
              e.dot(a, d + J[W], b + 1, O.deep);
            if (!(c)) {
              if (f) {
                e.dot(a, d + 10, b + 1, t.base);
                e.dot(a, d + 10, b, t.hi);
              }
              else {
                e.r(a, d + 6, b + 1, 2, 2, t.base);
                e.dot(a, d + 6, b + 1, t.hi);
                e.dot(a, d + 7, b + 2, t.deep);
              }
            }
            if (!(f || c)) {
              wO(n = {}, [[d - .4, b + 8.6], [d - 2.2, b + 6.4], [d - 3.2, b + 4.6]], [1.3, .9, .4]);
              kO(n, pO(n, G));
              mO(a, n, { line: h.line, hi: h.hi, base: h.base, shade: h.shade }, B);
            }
          })(a, s, o);
          (function (a, s, B) {
            if (!s.g.back) {
              var o = g.xich_ma_y;
              var n = S.Palette.pick("SKIN", s.cfg.skin, "light");
              var i = o.bone;
              var O = o.metal;
              var t = o.lava;
              var h = s.head;
              var r = h.x;
              var d = h.y;
              var b = h.w;
              if (s.g.side) {
                var l = r + b - 1;
                x(l - 5, d + 4, n.line);
                x(l - 4, d + 4, n.line);
                x(l - 3, d + 5, n.line);
                x(l - 2, d + 5, n.line);
                x(l - 1, d + 6, n.line);
                x(l - 3, d + 11, i.hi);
                x(l - 3, d + 12, i.base);
                x(l - 3, d + 13, i.base);
                x(l - 3, d + 14, i.shade);
                x(l - 2, d + 14, i.deep);
                x(l - 4, d + 12, n.line);
                x(l - 4, d + 13, n.line);
                x(l - 4, d + 14, n.line);
                x(l, d + 12, O.hi);
                x(l + 1, d + 12, O.base);
                x(l + 1, d + 13, O.shade);
                x(l, d + 13, O.shade);
                x(l - 2, d + 15, n.line);
                x(l - 1, d + 15, n.line);
                return void x(l, d + 15, n.line);
              }
              var f;
              var c;
              var G = r + Math.floor(b / 2);
              x(r + 1, d + 4, n.line);
              x(r + 2, d + 4, n.line);
              x(r + 3, d + 5, n.line);
              x(r + 4, d + 5, n.line);
              x(r + 5, d + 6, n.line);
              x(r + 1, d + 5, n.deep);
              x(r + 2, d + 5, n.deep);
              x(r + 12, d + 4, n.line);
              x(r + 11, d + 4, n.line);
              x(r + 10, d + 5, n.line);
              x(r + 9, d + 5, n.line);
              x(r + 8, d + 5, n.line);
              x(r + 7, d + 6, n.line);
              x(r + 12, d + 5, n.deep);
              x(r + 11, d + 5, n.deep);
              x(r + 2, d + 7, n.line);
              x(r + 3, d + 7, n.line);
              x(r + 4, d + 7, n.line);
              x(r + 8, d + 7, n.line);
              x(r + 9, d + 7, n.line);
              x(r + 10, d + 7, n.line);
              x(r + 3, d + 10, n.deep);
              x(r + 4, d + 10, n.shade);
              x(r + 9, d + 10, n.deep);
              x(r + 8, d + 10, n.shade);
              var H = [r + 2, r + b - 3];
              for (f = 0; f < 2; f++)
                c = f ? -1 : 1, x(H[f], d + 11, i.hi), x(H[f], d + 12, i.base), x(H[f], d + 13, i.base), x(H[f], d + 14, i.shade), x(H[f] + c, d + 13, i.base), x(H[f] + c, d + 14, i.deep), x(H[f] + 2 * c, d + 14, n.line), x(H[f] - c, d + 11, n.line), x(H[f] - c, d + 12, n.line), x(H[f] - c, d + 13, n.line), x(H[f] - c, d + 14, n.line), x(H[f] - c, d + 15, n.line), x(H[f], d + 10, n.line);
              x(G - 2, d + 15, n.line);
              x(G - 1, d + 15, n.line);
              x(G, d + 15, n.line);
              x(G + 1, d + 15, n.line);
              x(G - 1, d + 12, O.hi);
              x(G, d + 12, O.base);
              x(G - 2, d + 13, O.base);
              x(G + 1, d + 13, O.shade);
              x(G - 1, d + 14, O.shade);
              x(G, d + 14, O.deep);
              x(r, d + 8, t.base);
              x(r + b - 1, d + 8, t.base);
            }
            function x(S, s, o) {
              if (!(!(S >= 0 && S <= 31 && s >= 0) || B && B(S, s))) {
                e.dot(a, S, s, o);
              }
            }
          })(a, s, o);
        }
      }(a, s, B);
    }
  }
  var ZO = { tam_chom: { d: [".O..OS..SO..O.", ".S.O......O.S.", ".h...OShO...h.", "..S..OSSO..S..", "..S..OhSO..S..", "..O...SO...O..", "..o...hO...o..", "......SO......", "......Ss......", "......hO......", "......SO......", "......O.......", "......o......."], dx: 0, dy: 13, s: [".......O..", ".O...OSS..", ".S..O.....", ".h...OSh..", ".S...OSS..", "..S..OhS..", "..O..Sh...", "..o..hS...", ".....SO...", ".....Ss...", ".....hO...", ".....S....", ".....O...."], sx: 4, sy: 12 }, tien_ong: { d: ["Os..........sO", "OS..........SO", "OS..........SO", "Oh..........hO", "OSOSSh..hSSOSO", ".OS.OShhSO.SO.", ".h.OSShSShO.h.", ".S.OhSsShSO.S.", ".o.OShSShSO.o.", "...OSsShSsO...", "...OhSShSSO...", "....OShSsO....", "....OSShSO....", "....OhSsSO....", "....OShSSO....", ".....OShO.....", ".....OSSO.....", ".....OhSO.....", ".....OSsO.....", "......hO......", "......SO......", "......O......."], dx: 0, dy: 9, s: [".O.......", ".S.......", ".S.......", ".hO..OSS.", ".SSOOSShO", ".OSShSSSO", ".OhSShSSO", "OSShSShO.", "OhSSshSO.", ".OShSSShO", ".OShSsSO.", "..OhSShSO", "..OSShSO.", "...OhSSO.", "...OSshO.", "...OShSO.", "....OhSO.", "....OShO.", "....OSO..", "....OhO..", ".....O..."], sx: 5, sy: 9, sway: 12 }, bat_tu: { d: ["..Sh..hS..", ".OS....SO.", "O...Sh...O", "....OO...."], dx: 2, dy: 13, s: ["...Sh", ".OS..", "O....", "...S.", "...O."], sx: 8, sy: 12 }, lang_khach: { d: ["O............O", "s............s", "O............O", "O............O", ".O..sS..Ss..O.", ".OO........OO.", "...OsSShSsO...", ".....OShO.....", "......SO......", "......O......."], dx: 0, dy: 9, s: ["O......", "s......", "O......", "O......", "O...sSh", ".OO....", "...OsSh", "....SO.", "....O.."], sx: 6, sy: 9 } };
  var IO = { van_ly: { down: [".kKKKk.", "kKMWMKk", "kMWkWMk", "kKMWMKk", "wWWWWWw"], side: [".kKKk...", "kKMMKk.W", "kMMmMKWk", "kKKKKKWW", "wWWWWWWw"], up: [".kKKKk.", "kKMMMKk", "kMMmMMk", "kKKKKKk", "wWWWWWw"], pal: { k: "#15161c", K: "#262833", M: "#3b3e4d", m: "#5a5e72", W: "#f3f0e6", w: "#cfc8b6" } }, thao_hai: { down: ["..b4b..", ".4bBb4.", "34B4B43", "tTyTyTt", "TtTtTtT"], side: [".b4b....", ".4bB4b..", "344bB443", "tTyTyTyT", ".TtTtTt."], up: ["..b4b..", ".34443.", ".3bBb3.", "tTyTyTt", "TtTtTtT"], pal: { t: "#9a783a", T: "#c9a35a", y: "#ead08c", b: "#55361c", B: "#7d532d" } }, chien_ngoa: { down: [".GYGGg.", ".kLlLk.", ".kEeEk.", ".kEeEk.", ".kGYGk.", "kKLlLKk", "kLEeELk", "kkkkkkk"], side: [".GYGg...", ".kLlk...", ".kLlEk..", ".kLlEk..", ".kGYGk..", "kLLlLKk.", "kLLLLEEk", "kkkkkkkk"], up: [".GYGGg.", ".kLlLk.", ".kLlLk.", ".kKLKk.", ".kGYGk.", "kKLlLKk", "kKLLLKk", "kkkkkkk"], pal: { k: "#120f0c", K: "#2e241c", L: "#4b3b2c", l: "#715841", e: "#5f6c7d", E: "#aab7c6", G: "#c99a3a", g: "#8a6420", Y: "#f2d58c" } }, bach_ngoc_ly: { down: [".qQQQq.", "qWWWWWq", "qWcJcWq", "qWWjWWq", "qQQQQQq"], side: [".qQQq...", "qWWWWq..", "qWcWcWJq", "qWWWWWjq", ".QQQQQQq"], up: [".qQQQq.", "qWWWWWq", "qWcWcWq", "qWWWWWq", "qQQQQQq"], pal: { q: "#6a7480", Q: "#b2bcc6", W: "#f7f6f1", c: "#c9d2db", j: "#3f9a76", J: "#9fe6c2" } } };
  function $O(a, s) {
    if ("toc_truong_y" !== s.cfg.outfit)
      if ("long_tuong_y" !== s.cfg.outfit) {
        if ("none" !== s.cfg.shoes && !s.p.sit && "quan_dui" !== s.cfg.outfit)
          if (BO(s.cfg)) {
            !function (S, a) {
              for (var s = sO, B = 0; B < 2; B++) {
                var o = a.legs[B];
                var n = o.x - 1;
                var i = o.w + 2;
                var O = o.foot - 4;
                e.r(S, n, O + 2, i, 2, s.line);
                e.r(S, n + 1, O + 1, i - 2, 2, s.base);
                e.r(S, n + 1, O + 1, i - 2, 1, s.hi);
                e.r(S, n + 1, O, 1, 2, s.deep);
                e.r(S, n + i - 2, O, 1, 2, s.deep);
                e.r(S, n + 2, O + 3, Math.max(1, i - 4), 1, s.line);
              }
            }(a, s);
          }
          else if ("sat_luc_y" !== s.cfg.outfit)
            if ("tan_mo_y" !== s.cfg.outfit)
              if ("thanh_tam_y" !== s.cfg.outfit)
                if ("nam_y_bao" !== s.cfg.outfit)
                  if ("man_ho_tu_bao" !== s.cfg.outfit)
                    if ("ma_vuong_bao" !== s.cfg.outfit)
                      if ("xich_ma_y" !== s.cfg.outfit)
                        if ("thien_luan_kiem_y" !== s.cfg.outfit)
                          if ("tuyet_son_kiem_y" !== s.cfg.outfit)
                            if ("man_ho_tu_y" !== s.cfg.outfit)
                              if ("than_kiem_y" !== s.cfg.outfit)
                                if (IO[s.cfg.shoes]) {
                                  !function (S, e, a) {
                                    for (var s = m(Object.assign({}, a.pal), e), B = e.g.side ? a.side : e.g.back ? a.up : a.down, o = 0; o < 2; o++) {
                                      var n = e.legs[o];
                                      as(S, n.x - 1, n.foot - B.length, B, s, !1);
                                    }
                                  }(a, s, IO[s.cfg.shoes]);
                                }
                                else {
                                  for (var B = D[s.cfg.shoes] || (g[s.cfg.outfit] ? D.ink : G.leather), o = 0; o < 2; o++) {
                                    var n = s.legs[o];
                                    var i = n.x - 1;
                                    var O = n.foot - 5;
                                    var t = n.w + 3;
                                    e.r(a, i + 1, O, t - 2, 5, B.base);
                                    M(a, i, O + 2, t, 3, B);
                                    e.r(a, i + 1, O + 1, t - 2, 1, B.hi);
                                    e.r(a, i, O + 4, t, 1, B.line);
                                    e.r(a, i + 2, O + 2, 2, 1, B.shade);
                                  }
                                }
                              else {
                                !function (S, a) {
                                  if (!a.p.sit) {
                                    for (var s = a.material, B = s.cloth, o = s.trim, n = 0; n < 2; n++) {
                                      var i = a.legs[n];
                                      var O = i.x - 1;
                                      var t = i.w + 2;
                                      var h = i.foot;
                                      var r = h - 9;
                                      e.r(S, O, r, t, h - r, B.line);
                                      e.r(S, O + 1, r + 1, t - 2, h - r - 2, B.base);
                                      e.r(S, O + 1, r + 1, 1, h - r - 3, B.shade);
                                      e.r(S, O + t - 2, r + 2, 1, h - r - 4, B.hi);
                                      e.r(S, O, r, t, 1, o.shade);
                                      e.dot(S, O + 1, r, o.hi);
                                      e.dot(S, O + t - 2, r, o.base);
                                      e.line(S, O + 1, r + 3, O + t - 2, r + 5, o.deep);
                                      e.dot(S, O + 2, r + 4, o.base);
                                      e.r(S, O, h - 1, t, 1, o.deep);
                                      e.r(S, O + 1, h - 1, t - 2, 1, o.base);
                                      if (a.g.side) {
                                        e.dot(S, O + t - 1, h - 2, o.hi);
                                        e.dot(S, O + t - 2, h - 2, o.base);
                                      }
                                      else {
                                        e.dot(S, O + 1, h - 2, o.shade);
                                        e.dot(S, O + t - 2, h - 2, o.hi);
                                      }
                                    }
                                  }
                                }(a, s);
                              }
                            else {
                              !function (S, a) {
                                if (!a.p.sit) {
                                  for (var s = a.material, B = s.pants, o = s.trim, n = 0; n < 2; n++) {
                                    var i = a.legs[n];
                                    var O = i.x - 1;
                                    var t = i.w + 2;
                                    var h = i.foot;
                                    e.r(S, O, h - 6, t, 6, B.line);
                                    e.r(S, O + 1, h - 5, t - 2, 4, B.deep);
                                    e.r(S, O + 1, h - 5, 1, 3, B.shade);
                                    e.r(S, O, h - 6, t, 1, o.shade);
                                    e.dot(S, O + 1, h - 6, o.hi);
                                    e.r(S, O, h - 1, t, 1, o.deep);
                                    e.r(S, O + 1, h - 1, t - 2, 1, o.base);
                                  }
                                }
                              }(a, s);
                            }
                          else {
                            !function (S, a) {
                              if (!a.p.sit) {
                                for (var s = a.material, B = s.pants, o = s.trim, n = 0; n < 2; n++) {
                                  var i = a.legs[n];
                                  var O = i.x - 1;
                                  var t = i.w + 2;
                                  var h = i.foot;
                                  e.r(S, O, h - 6, t, 6, B.line);
                                  e.r(S, O + 1, h - 5, t - 2, 4, B.deep);
                                  e.r(S, O + 1, h - 5, 1, 4, B.base);
                                  e.r(S, O, h - 7, t, 1, o.shade);
                                  e.dot(S, O + 1, h - 7, o.hi);
                                  e.dot(S, O + t - 1, h - 7, o.deep);
                                  e.r(S, O, h - 1, t, 1, B.line);
                                  if (a.g.side) {
                                    e.dot(S, O + t - 1, h - 2, o.base);
                                    e.dot(S, O + t - 2, h - 1, o.shade);
                                  }
                                  else {
                                    e.dot(S, O + 1, h - 2, o.shade);
                                    e.dot(S, O + t - 2, h - 2, o.base);
                                  }
                                }
                              }
                            }(a, s);
                          }
                        else {
                          !function (S, a) {
                            if (!a.p.sit) {
                              for (var s = a.material.trim, B = 0; B < 2; B++) {
                                var o = a.legs[B];
                                var n = o.x - 1;
                                var i = o.w + 3;
                                var O = o.foot;
                                e.r(S, n, O - 6, i, 6, "#111827");
                                e.r(S, n + 1, O - 6, i - 2, 4, "#526d86");
                                e.r(S, n + 1, O - 6, 1, 4, "#36516a");
                                e.r(S, n + i - 2, O - 5, 1, 3, "#7f9ab3");
                                e.r(S, n, O - 6, i, 1, s.deep);
                                e.r(S, n + 1, O - 6, i - 2, 1, s.base);
                                e.dot(S, n + 1, O - 6, s.hi);
                                e.r(S, n + 1, O - 2, i - 2, 1, "#1d2d44");
                                e.r(S, n + 1, O - 1, i - 2, 1, s.shade);
                                e.dot(S, n + i - 2, O - 2, s.hi);
                              }
                            }
                          }(a, s);
                        }
                      else {
                        !function (a, s) {
                          if (!s.p.sit) {
                            for (var B = g.xich_ma_y.bone, o = S.Palette.pick("SKIN", s.cfg.skin, "light"), n = 0; n < 2; n++) {
                              var i = s.legs[n];
                              var O = i.foot;
                              var t = i.x - 1;
                              var h = i.w + 2;
                              e.r(a, t, O - 2, h, 1, o.deep);
                              e.r(a, t, O - 1, h, 1, o.line);
                              e.dot(a, t, O - 1, B.base);
                              e.dot(a, i.x + Math.floor(i.w / 2), O - 1, B.base);
                              e.dot(a, t + h - 1, O - 1, B.base);
                            }
                          }
                        }(a, s);
                      }
                    else {
                      !function (S, a) {
                        if (!a.p.sit) {
                          for (var s = "#09070f", B = a.material.trim, o = 0; o < 2; o++) {
                            var n = a.legs[o];
                            var i = n.x - 1;
                            var O = n.w + 3;
                            var t = n.foot;
                            e.r(S, i, t - 6, O, 6, s);
                            e.r(S, i + 1, t - 6, O - 2, 4, "#4b2d61");
                            e.r(S, i + 1, t - 6, 1, 4, "#302044");
                            e.r(S, i + O - 2, t - 5, 1, 3, "#76518a");
                            e.r(S, i, t - 6, O, 1, B.deep);
                            e.r(S, i + 1, t - 6, O - 2, 1, B.base);
                            e.dot(S, i + 1, t - 6, B.hi);
                            e.r(S, i + 1, t - 2, O - 2, 1, "#171020");
                            e.r(S, i, t - 1, O, 1, s);
                            e.r(S, i + 1, t - 1, O - 2, 1, B.shade);
                            e.dot(S, i + O - 2, t - 2, B.base);
                          }
                        }
                      }(a, s);
                    }
                  else {
                    !function (S, a) {
                      if (!a.p.sit) {
                        for (var s = "#3f2b1d", B = "#a9742c", o = "#d9ad55", n = 0; n < 2; n++) {
                          var i = a.legs[n];
                          var O = i.x - 2;
                          var t = i.w + 5;
                          var h = i.foot;
                          e.r(S, O + 2, h - 5, t - 4, 1, s);
                          e.line(S, O + 1, h - 5, O + 3, h - 3, o);
                          e.line(S, O + t - 2, h - 5, O + t - 4, h - 3, B);
                          e.r(S, O + 1, h - 3, t - 2, 1, B);
                          e.r(S, O, h - 2, t, 2, s);
                          e.r(S, O + 1, h - 2, t - 2, 1, o);
                          e.r(S, O, h - 1, t, 1, "#17130f");
                          e.dot(S, O + 2, h - 3, o);
                        }
                      }
                    }(a, s);
                  }
                else {
                  !function (S, a) {
                    if (!a.p.sit) {
                      for (var s = "#d3a24b", B = 0; B < 2; B++) {
                        var o = a.legs[B];
                        var n = o.x - 2;
                        var i = o.w + 5;
                        var O = o.foot;
                        e.r(S, n + 1, O - 5, i - 2, 4, "#554052");
                        e.r(S, n, O - 2, i, 3, "#211a28");
                        e.line(S, n + 1, O - 5, n + i - 2, O - 5, s);
                        e.line(S, n, O, n + i - 1, O, "#120f18");
                        e.dot(S, n + 2, O - 3, s);
                      }
                    }
                  }(a, s);
                }
              else {
                !function (S, a) {
                  if (!a.p.sit) {
                    for (var s = a.material, B = s.pants, o = s.trim, n = 0; n < 2; n++) {
                      var i = a.legs[n];
                      var O = i.x - 1;
                      var t = i.w + 2;
                      var h = i.foot;
                      var r = h - 8;
                      e.r(S, O, r, t, h - r, B.line);
                      e.r(S, O + 1, r + 1, t - 2, h - r - 2, B.base);
                      e.r(S, O + 1, r + 1, 1, h - r - 3, B.shade);
                      e.r(S, O + t - 2, r + 2, 1, h - r - 4, B.hi);
                      e.r(S, O, r, t, 1, o.shade);
                      e.dot(S, O + 1, r, o.hi);
                      e.r(S, O, h - 1, t, 1, o.deep);
                      e.r(S, O + 1, h - 1, t - 2, 1, o.base);
                      if (a.g.side) {
                        e.dot(S, O + t - 1, h - 2, o.hi);
                        e.dot(S, O + t - 2, h - 2, o.base);
                      }
                      else {
                        e.dot(S, O + 1, h - 2, o.shade);
                        e.dot(S, O + t - 2, h - 2, o.hi);
                      }
                    }
                  }
                }(a, s);
              }
            else {
              !function (S, a) {
                if (!a.p.sit) {
                  for (var s = a.material, B = s.pants, o = s.trim, n = 0; n < 2; n++) {
                    var i = a.legs[n];
                    var O = i.x - 1;
                    var t = i.w + 2;
                    var h = i.foot;
                    var r = h - 8;
                    e.r(S, O, r, t, h - r, B.line);
                    e.r(S, O + 1, r + 1, t - 2, h - r - 2, B.base);
                    e.r(S, O + 1, r + 1, 1, h - r - 3, B.shade);
                    e.r(S, O + t - 2, r + 2, 1, h - r - 4, B.hi);
                    e.r(S, O, r, t, 1, o.shade);
                    e.dot(S, O + 1, r, o.hi);
                    var d = a.g.side ? O + t - 3 : O + (n ? t - 3 : 2);
                    e.dot(S, d, r + 2, o.base);
                    e.dot(S, d + 1, r + 3, o.hi);
                    e.dot(S, d, r + 4, o.shade);
                    e.dot(S, d + 1, r + 5, o.base);
                    e.r(S, O, h - 1, t, 1, o.deep);
                    e.r(S, O + 1, h - 1, t - 2, 1, o.base);
                    if (a.g.side) {
                      e.dot(S, O + t - 1, h - 2, o.hi);
                      e.dot(S, O + t - 2, h - 2, o.base);
                    }
                    else {
                      e.dot(S, O + 1, h - 2, o.shade);
                      e.dot(S, O + t - 2, h - 2, o.hi);
                    }
                  }
                }
              }(a, s);
            }
          else {
            !function (S, a) {
              if (!a.p.sit) {
                for (var s = a.material, B = s.armor, o = s.trim, n = 0; n < 2; n++) {
                  var i = a.legs[n];
                  var O = i.x - 1;
                  var t = i.w + 2;
                  var h = i.foot;
                  var r = h - 7;
                  e.r(S, O, r, t, h - r, B.line);
                  e.r(S, O + 1, r + 1, t - 2, h - r - 2, B.base);
                  e.r(S, O + 1, r + 1, 1, h - r - 3, B.shade);
                  e.r(S, O + t - 2, r + 2, 1, h - r - 4, B.hi);
                  e.r(S, O, r, t, 1, o.shade);
                  e.dot(S, O + 1, r, o.hi);
                  e.dot(S, O + t - 2, r, o.base);
                  e.line(S, O + 1, r + 3, O + t - 2, r + 3, o.deep);
                  e.dot(S, O + 2, r + 3, o.base);
                  e.r(S, O, h - 1, t, 1, o.deep);
                  e.r(S, O + 1, h - 1, t - 2, 1, o.base);
                  if (a.g.side) {
                    e.dot(S, O + t - 1, h - 2, o.hi);
                    e.dot(S, O + t - 2, h - 2, o.base);
                  }
                  else {
                    e.dot(S, O + 1, h - 2, o.shade);
                    e.dot(S, O + t - 2, h - 2, o.hi);
                  }
                }
              }
            }(a, s);
          }
      }
      else {
        !function (S, e) {
          if (!e.p.sit) {
            for (var a = Ko, s = Uo(S), B = s.rect, o = s.dot, n = 0; n < 2; n++) {
              var i = e.legs[n];
              var O = i.x - 1;
              var t = i.foot - 6;
              var h = i.w + 2;
              B(O, t, h, 6, a.ink);
              B(O + 1, t + 1, h - 2, 4, a.navy);
              B(O + 1, t + 1, 1, 3, a.steelHi);
              B(O, t, h, 1, a.goldDark);
              B(O + 1, t, h - 2, 1, a.gold);
              o(O + 1, t, a.goldHi);
              B(O + 1, t + 5, h - 1, 1, a.gold);
              B(O + h - 2, t + 3, 2, 2, a.gold);
              o(O + h - 2, t + 3, a.goldHi);
            }
          }
        }(a, s);
      }
    else {
      !function (S, a) {
        if (!a.p.sit) {
          for (var s = 0; s < 2; s++) {
            var B = a.legs[s];
            var o = B.x - 1;
            var n = B.w + 2;
            var i = B.foot;
            var O = i - 8;
            e.r(S, o, O, n, i - O, wn.j);
            e.r(S, o + 1, O + 1, n - 2, i - O - 2, wn.p);
            e.r(S, o + 1, O + 1, 1, i - O - 3, wn.r);
            e.r(S, o, O, n, 1, wn.a);
            e.dot(S, o + 1, O, wn.C);
            var t = a.g.side ? o + n - 3 : o + (s ? n - 3 : 2);
            e.dot(S, t, O + 2, wn.G);
            e.dot(S, t + 1, O + 3, wn.Y);
            e.dot(S, t, O + 4, wn.e);
            e.r(S, o, i - 1, n, 1, wn.A);
            e.r(S, o + 1, i - 1, n - 2, 1, wn.a);
            if (a.g.side) {
              e.dot(S, o + n - 1, i - 2, wn.C);
              e.dot(S, o + n - 2, i - 2, wn.c);
            }
            else {
              e.dot(S, o + 1, i - 2, wn.c);
              e.dot(S, o + n - 2, i - 2, wn.C);
            }
          }
        }
      }(a, s);
    }
  }
  var St = { xa: { d: "#0b2a1a", b: "#1f7a45", h: "#5fd08a", s: "#123f26", f1: "#f4c542", f2: "#d9412b", f3: "#fff2b8", band: "#8d6510", gem: "#d9412b" }, hau: { d: "#2d1808", b: "#a2662a", h: "#e0a458", s: "#5a3414", f1: "#3fb6c9", f2: "#f28c28", f3: "#fff0c8", band: "#5a2f06", gem: "#3fb6c9", ear: "#e8a598" }, nhim: { d: "#1d1626", b: "#6a5690", h: "#c4b5dc", s: "#382a4f", f1: "#f1e6c8", f2: "#e2602c", f3: "#ffffff", band: "#5e5238", gem: "#e2602c" } };
  function et(S, a, s, B, o, n, i) {
    for (var O = 0; O < o; O++) {
      var t = Math.round(a + B * O);
      var h = s - O;
      var r = O >= o - 3;
      e.dot(S, t, h, r ? i : 0 === O ? n.d : n.f3);
      if (O > 0) {
        e.dot(S, t + 1, h, r ? n.d : O % 2 ? n.f1 : n.f3);
      }
    }
    e.dot(S, Math.round(a + B * o), s - o, n.d);
  }
  function at(S, a, s) {
    var B;
    var o;
    var n = St[s];
    var i = a.head;
    var O = i.w;
    var t = i.y;
    var h = i.x + (O >> 1);
    var r = !!a.g.side;
    var d = !!a.g.back;
    var b = "left" === a.dir ? -1 : 1;
    var l = r ? b > 0 ? i.x : i.x + O - 1 : h;
    var f = r ? b > 0 ? i.x + O - 1 : i.x : h;
    if ("xa" === s)
      if (r) {
        for (B = 0; B < 11; B++) {
          var c = B < 3 ? 3 : B < 8 ? 4 : 3;
          var G = b > 0 ? l - c : l + 1;
          e.r(S, G, t + 2 + B, c, 1, B % 2 ? n.b : n.s);
          e.dot(S, b > 0 ? G : G + c - 1, t + 2 + B, n.d);
          if (B % 3 == 1) {
            e.dot(S, G + (b > 0 ? 1 : c - 2), t + 2 + B, n.h);
          }
        }
      }
      else {
        for (o = -1; o <= 1; o += 2)
          for (B = 0; B < 12; B++) {
            var H = B < 2 ? 1 : B < 9 ? 3 : 2;
            var g = o < 0 ? i.x - H : i.x + O;
            e.r(S, g, t + 3 + B, H, 1, B % 2 ? n.b : n.s);
            e.dot(S, o < 0 ? g : g + H - 1, t + 3 + B, n.d);
            if (B % 3 == 1 && H > 1) {
              e.dot(S, o < 0 ? g + 1 : g + H - 2, t + 3 + B, n.h);
            }
          }
      }
    else if ("hau" === s) {
      var x = r ? [[b > 0 ? i.x + 3 : i.x + O - 7, t + 6]] : [[i.x - 3, t + 6], [i.x + O - 1, t + 6]];
      for (B = 0; B < x.length; B++) {
        var D = x[B][0];
        var W = x[B][1];
        e.r(S, D, W, 4, 5, n.d);
        e.r(S, D + 1, W + 1, 2, 3, n.b);
        e.dot(S, D + 1, W + 1, n.ear);
        e.dot(S, D + 1, W + 2, n.ear);
        e.dot(S, D + 2, W + 1, n.h);
      }
    }
    else if (r) {
      for (B = 0; B < 5; B++) {
        var J = l - 1 * b;
        var u = t + 2 + 2 * B;
        e.line(S, J, u, J - b * (3 + B % 2), u - 2 + B, B % 2 ? n.b : n.h);
        e.dot(S, J - b * (4 + B % 2), u - 2 + B, n.d);
      }
    }
    else {
      for (o = -1; o <= 1; o += 2)
        for (B = 0; B < 3; B++) {
          var M = h + o * (3 + 2 * B);
          var w = t + 1;
          e.line(S, M, w, M + o * (2 + B), w - 3 - B, B % 2 ? n.h : n.b);
          e.dot(S, M + o * (2 + B), w - 3 - B, n.d);
        }
    }
    var N = t + 1;
    if (r) {
      for (B = 0; B < 5; B++)
        et(S, l + b * (3 - B), N, -b * (.55 + .12 * B), 8 - Math.abs(B - 2), n, B % 2 ? n.f2 : n.f1);
    }
    else {
      for (B = -3; B <= 3; B++)
        et(S, h + 2 * B, N, .28 * B, 8 - Math.abs(B) + ("nhim" === s ? 1 : 0), n, Math.abs(B) % 2 ? n.f2 : n.f1);
    }
    if (d) {
      e.r(S, i.x, t + 2, O, 2, n.band);
    }
    else {
      if (r) {
        e.r(S, b > 0 ? i.x + 1 : i.x, t + 2, O - 1, 2, n.band);
        e.dot(S, f, t + 2, n.gem);
      }
      else {
        e.r(S, i.x, t + 2, O, 2, n.band);
        e.r(S, i.x, t + 2, O, 1, n.d);
        e.dot(S, h, t + 2, n.gem);
        e.dot(S, h - 1, t + 3, n.f1);
        e.dot(S, h + 1, t + 3, n.f1);
      }
    }
  }
  var st = { xa: [".gggg..", "g....g.", ".ggg...", "...ggg.", ".g...g.", "..gggR."], hau: [".b...b.", "bpbbbpb", ".bfffb.", ".fdfdf.", ".fffff.", "..fmf.."], nhim: ["q..q..q", ".q.q.q.", "..qqq..", ".qwwwq.", "qwwewwq", ".qqqqq."] };
  var Bt = { xa: { g: "#f0c445", R: "#d9412b" }, hau: { b: "#3d2211", p: "#d98a6a", f: "#d9a566", d: "#1c0e05", m: "#7a3a1c" }, nhim: { q: "#eadba6", w: "#8570ab", e: "#e2602c" } };
  function ot(S, e, a) {
    if (!e.g.back) {
      var s = e.torso;
      as(S, s.x + (s.w - 7 >> 1) + (e.g.side ? "left" === e.dir ? -1 : 1 : 0), s.y + 3, st[a], Bt[a], !1);
    }
  }
  function nt(s, B, o) {
    var n = S.Palette.pick("AURA", B.cfg.aura, "none");
    if (n) {
      for (var i = o % 4, O = B.torso, t = 0; t < 4; t++)
        if ((t + i) % 4 < 2) {
          var h = O.x + (t % 2 ? O.w + 5 : -5);
          var r = O.y + a.TORSO_H - 5 * t - i;
          e.dot(s, h, r, n.core);
          e.dot(s, h, r + 1, n.glow);
        }
    }
  }
  var it = [];
  var Ot = { down: [], up: [], right: [] };
  s.LAYERS = [{ id: "hair_back", z: 0, draw: function (S, e) {
        TO(S, e, "back");
      } }, { id: "body", z: 10, draw: Ii }, { id: "eyes", z: 11, draw: zi }, { id: "outfit_under", z: 20, draw: nO }, { id: "shoes", z: 21, draw: $O }, { id: "outfit", z: 30, draw: yO }, { id: "arms_front", z: 40, draw: $i }, { id: "sleeves_front", z: 41, draw: LO }, { id: "hair_front", z: 50, draw: function (S, e) {
        TO(S, e, "front");
      } }, { id: "beard", z: 55, draw: function (a, s) {
        var B = s.cfg.beard || "none";
        if ("none" !== B && !s.g.back)
          if ("nam_y_rau" !== B)
            if ("man_ho_tu_y_rau" !== B)
              if ("man_ho_tu_rau" !== B)
                if ("dai_phu_rau" !== B)
                  if ("tang_kinh_rau" !== B)
                    if (ZO[B]) {
                      if (!(s.g.female)) {
                        (function (e, a, s) {
                          var B = a.head;
                          var o = S.Palette.pick("HAIR", a.cfg.hairColor, "hac");
                          var n = { o: o.line, O: o.deep, s: o.shade, S: o.base, h: o.hi, H: o.hi2 || o.hi };
                          var i = a.g.side ? HB(a) : GB(a);
                          var O = s.sway && i ? xB(i, s.sway, 8) : null;
                          var t = Vs(a);
                          if (a.g.side) {
                            as(e, B.x + s.sx, B.y + s.sy, s.s, n, !1, O, t);
                          }
                          else {
                            as(e, B.x + s.dx, B.y + s.dy, s.d, n, !1, O, t);
                          }
                        })(a, s, ZO[B]);
                      }
                    }
                    else {
                      var o = s.head;
                      var n = S.Palette.pick("HAIR", "nau" === s.cfg.hairColor ? "nau" : "hac", "hac");
                      var i = o.x;
                      var O = o.y;
                      var t = o.w;
                      var h = i + Math.floor(t / 2);
                      if ("ria_kiem" !== B)
                        if ("rau_de" !== B) {
                          if ("quai_non" === B) {
                            if (s.g.side) {
                              u(a, [[i + 3, O + 9], [i + 5, O + 10], [i + 6, O + 14], [i + t - 3, O + 15], [i + t - 5, O + 18], [i + 6, O + 17], [i + 3, O + 13]], n.deep);
                              e.line(a, i + 4, O + 10, i + 6, O + 15, n.base);
                              e.line(a, i + 6, O + 16, i + t - 4, O + 16, n.hi);
                              return void e.dot(a, i + t - 5, O + 18, n.shade);
                            }
                            e.r(a, i, O + 9, 2, 6, n.deep);
                            e.r(a, i + t - 2, O + 9, 2, 6, n.base);
                            u(a, [[i + 1, O + 13], [i + 4, O + 15], [i + 6, O + 17], [i + t - 7, O + 17], [i + t - 5, O + 15], [i + t - 2, O + 13], [i + t - 3, O + 17], [i + t - 7, O + 20], [i + 6, O + 20], [i + 2, O + 17]], n.deep);
                            e.line(a, i + 2, O + 14, i + 6, O + 18, n.base);
                            e.line(a, i + t - 3, O + 14, i + t - 7, O + 18, n.hi);
                            e.r(a, i + 7, O + 18, Math.max(2, t - 14), 2, n.base);
                            e.dot(a, h, O + 20, n.shade);
                          }
                        }
                        else {
                          if (s.g.side) {
                            e.line(a, i + t - 7, O + 12, i + t - 3, O + 13, n.deep);
                            u(a, [[i + t - 6, O + 15], [i + t - 3, O + 15], [i + t - 5, O + 23], [i + t - 7, O + 20]], n.deep);
                            e.line(a, i + t - 5, O + 16, i + t - 5, O + 21, n.base);
                            e.dot(a, i + t - 4, O + 16, n.hi);
                          }
                          else {
                            e.line(a, h - 1, O + 13, h - 4, O + 14, n.deep);
                            e.line(a, h + 1, O + 13, h + 4, O + 14, n.line);
                            u(a, [[h - 2, O + 16], [h + 2, O + 16], [h + 1, O + 23], [h, O + 25], [h - 2, O + 22]], n.deep);
                            e.r(a, h - 1, O + 17, 2, 6, n.base);
                            e.dot(a, h, O + 17, n.hi);
                            e.dot(a, h - 1, O + 23, n.shade);
                          }
                        }
                      else {
                        if (s.g.side) {
                          e.line(a, i + t - 7, O + 12, i + t - 3, O + 13, n.deep);
                          e.dot(a, i + t - 4, O + 12, n.hi);
                          e.dot(a, i + t - 2, O + 14, n.line);
                        }
                        else {
                          e.line(a, h - 1, O + 13, h - 5, O + 14, n.deep);
                          e.line(a, h + 1, O + 13, h + 5, O + 14, n.line);
                          e.dot(a, h - 3, O + 13, n.base);
                          e.dot(a, h + 3, O + 13, n.hi);
                        }
                      }
                    }
                  else {
                    !function (S, a) {
                      var s = a.head;
                      var B = s.x;
                      var o = s.y;
                      var n = s.w;
                      var i = ee;
                      if ($S(a)) {
                        Se(S, B, o + 5, se, i, 0);
                      }
                      else {
                        if (a.g.side) {
                          e.r(S, B + n - 6, o + 5, 4, 1, i.W);
                          u(S, [[B + n - 5, o + 14], [B + n - 2, o + 14], [B + n - 2, o + 19], [B + n - 4, o + 22]], i.w);
                        }
                      }
                    }(a, s);
                  }
                else {
                  !function (S, a) {
                    if (!a.g.back) {
                      var s = a.head;
                      var B = s.x;
                      var o = s.y;
                      var n = s.w;
                      var i = B + Math.floor(n / 2);
                      var O = Vi;
                      if (a.g.side) {
                        e.line(S, B + n - 6, o + 12, B + n - 2, o + 12, O.base);
                        _O(S, [[B + n - 6, o + 13], [B + n - 1, o + 13], [B + n - 1, o + 18], [B + n - 3, o + 28], [B + n - 4, o + 33], [B + n - 6, o + 27], [B + n - 7, o + 18]], O.base, O.shade);
                        return void e.line(S, B + n - 4, o + 15, B + n - 4, o + 29, O.hi);
                      }
                      e.line(S, i - 1, o + 12, i - 4, o + 13, O.base);
                      e.line(S, i - 4, o + 13, i - 5, o + 16, O.shade);
                      e.line(S, i, o + 12, i + 3, o + 13, O.base);
                      e.line(S, i + 3, o + 13, i + 4, o + 16, O.shade);
                      _O(S, [[i - 4, o + 14], [i + 3, o + 14], [i + 4, o + 19], [i + 3, o + 26], [i + 1, o + 33], [i, o + 35], [i - 1, o + 35], [i - 2, o + 33], [i - 4, o + 26], [i - 5, o + 19]], O.base, O.shade);
                      e.line(S, i - 2, o + 15, i - 2, o + 30, O.hi);
                      e.line(S, i + 1, o + 16, i + 1, o + 31, O.shade);
                      e.line(S, i - 4, o + 19, i - 3, o + 25, O.hi);
                      e.dot(S, i, o + 34, O.hi);
                    }
                  }(a, s);
                }
              else {
                if (!(s.g.female)) {
                  (function (S, a) {
                    if (!a.g.back) {
                      var s = a.head;
                      var B = s.x;
                      var o = s.y;
                      var n = s.w;
                      var i = B + Math.floor(n / 2);
                      var O = "#66584c";
                      var t = "#8d7863";
                      var h = "#b09a79";
                      var r = "#d4bd94";
                      var d = "#f2ddb1";
                      if (a.g.side) {
                        e.fatLine(S, B + n - 7, o + 11, B + n - 3, o + 13, 2, O);
                        e.line(S, B + n - 6, o + 11, B + n - 3, o + 12, r);
                        u(S, [[B + n - 7, o + 14], [B + n - 2, o + 15], [B + n - 3, o + 20], [B + n - 5, o + 23], [B + n - 4, o + 25], [B + n - 6, o + 28], [B + n - 9, o + 26], [B + n - 8, o + 21], [B + n - 9, o + 17]], O);
                        u(S, [[B + n - 6, o + 16], [B + n - 3, o + 17], [B + n - 4, o + 21], [B + n - 6, o + 24], [B + n - 6, o + 26], [B + n - 8, o + 24], [B + n - 7, o + 19]], h);
                        e.line(S, B + n - 6, o + 17, B + n - 6, o + 23, r);
                        e.line(S, B + n - 6, o + 24, B + n - 7, o + 27, t);
                        return void e.dot(S, B + n - 6, o + 28, d);
                      }
                      e.fatLine(S, i - 5, o + 11, i - 1, o + 13, 2, O);
                      e.fatLine(S, i + 1, o + 13, i + 5, o + 11, 2, O);
                      e.line(S, i - 4, o + 11, i - 1, o + 12, r);
                      e.line(S, i + 1, o + 12, i + 4, o + 11, d);
                      e.dot(S, i - 5, o + 12, t);
                      e.dot(S, i + 5, o + 12, h);
                      u(S, [[B + 1, o + 14], [B + 4, o + 14], [B + 5, o + 17], [B + 4, o + 20], [B + 3, o + 22], [B + 4, o + 24], [B + 2, o + 26], [B - 1, o + 24], [B, o + 21], [B - 2, o + 19], [B - 1, o + 16]], O);
                      u(S, [[B + 2, o + 16], [B + 4, o + 16], [B + 4, o + 19], [B + 2, o + 22], [B + 3, o + 24], [B + 1, o + 25], [B + 1, o + 21], [B, o + 18]], t);
                      u(S, [[B + n - 1, o + 14], [B + n - 4, o + 14], [B + n - 5, o + 17], [B + n - 4, o + 20], [B + n - 3, o + 22], [B + n - 4, o + 24], [B + n - 2, o + 26], [B + n + 1, o + 24], [B + n, o + 21], [B + n + 2, o + 19], [B + n + 1, o + 16]], O);
                      u(S, [[B + n - 2, o + 16], [B + n - 4, o + 16], [B + n - 4, o + 19], [B + n - 2, o + 22], [B + n - 3, o + 24], [B + n - 1, o + 25], [B + n - 1, o + 21], [B + n, o + 18]], t);
                      e.line(S, B + 2, o + 16, B + 3, o + 21, r);
                      e.line(S, B + n - 2, o + 16, B + n - 3, o + 21, d);
                      u(S, [[B + 4, o + 15], [B + 7, o + 17], [B + n - 7, o + 17], [B + n - 4, o + 15], [B + n - 5, o + 20], [i + 3, o + 23], [i + 2, o + 26], [i, o + 25], [i - 2, o + 26], [i - 3, o + 23], [B + 7, o + 21], [B + 5, o + 18]], O);
                      u(S, [[B + 6, o + 17], [B + 8, o + 18], [B + n - 8, o + 18], [B + n - 6, o + 17], [B + n - 7, o + 21], [i + 2, o + 23], [i + 1, o + 25], [i - 1, o + 24], [i - 2, o + 22], [B + 8, o + 20]], h);
                      e.line(S, B + 6, o + 18, B + 8, o + 21, r);
                      e.line(S, i - 1, o + 18, i - 2, o + 23, d);
                      e.line(S, i + 2, o + 18, i + 2, o + 23, r);
                      e.line(S, B + n - 7, o + 18, B + n - 8, o + 21, t);
                      e.dot(S, i - 1, o + 25, r);
                      e.dot(S, i + 1, o + 25, d);
                    }
                  })(a, s);
                }
              }
            else {
              if (!(s.g.female)) {
                (function (S, e) {
                  if (!e.g.back) {
                    var a = e.head;
                    var s = Vs(e);
                    if (e.g.side) {
                      as(S, a.x + 2, a.y + 6, vs, us, !1, null, s);
                    }
                    else {
                      as(S, a.x - 1, a.y + 7, ms, us, !1, null, s);
                    }
                  }
                })(a, s);
              }
            }
          else {
            if (!(s.g.female)) {
              (function (S, a) {
                if (!a.g.back) {
                  var s = a.head;
                  var B = s.x;
                  var o = s.y;
                  var n = s.w;
                  var i = B + Math.floor(n / 2);
                  var O = "#211a28";
                  var t = "#5c475d";
                  var h = "#92728a";
                  if (a.g.side) {
                    e.line(S, B + n - 7, o + 12, B + n - 3, o + 13, h);
                    u(S, [[B + n - 7, o + 15], [B + n - 2, o + 15], [B + n - 4, o + 21], [B + n - 6, o + 26], [B + n - 8, o + 23], [B + n - 8, o + 18]], O);
                    e.line(S, B + n - 6, o + 16, B + n - 5, o + 23, t);
                    return void e.dot(S, B + n - 6, o + 25, h);
                  }
                  e.line(S, i - 1, o + 13, i - 5, o + 14, h);
                  e.line(S, i + 1, o + 13, i + 5, o + 14, h);
                  e.dot(S, i - 4, o + 13, t);
                  e.dot(S, i + 4, o + 13, t);
                  e.r(S, B + 1, o + 15, 2, 6, O);
                  e.r(S, B + n - 2, o + 15, 2, 6, t);
                  u(S, [[B + 4, o + 17], [B + 7, o + 18], [B + n - 7, o + 18], [B + n - 4, o + 17], [B + n - 6, o + 22], [i + 2, o + 25], [i, o + 28], [i - 2, o + 25], [B + 6, o + 22]], O);
                  u(S, [[B + 7, o + 19], [B + 9, o + 20], [B + n - 9, o + 20], [B + n - 7, o + 19], [B + n - 8, o + 22], [i + 1, o + 24], [i, o + 26], [i - 1, o + 24], [B + 8, o + 22]], t);
                  e.line(S, B + 7, o + 19, B + 9, o + 22, h);
                  e.line(S, i, o + 20, i, o + 26, h);
                  e.dot(S, i, o + 27, h);
                }
              })(a, s);
            }
          }
      } }, { id: "hat", z: 60, draw: function (S, e) {
        if ("xa_toc_mao" !== e.cfg.hat) {
          if ("hau_toc_mao" !== e.cfg.hat) {
            if ("nhim_toc_mao" !== e.cfg.hat) {
              if ("bach_kim_an_dien_bao" === e.cfg.outfit) {
                (function (S, e) {
                  var a = e.head;
                  var s = vS(e);
                  var B = ss(e);
                  var o = e.g.back ? LS : e.g.side ? CS : yS;
                  as(S, a.x - (e.g.side ? 4 : 2), a.y - 5, o, s, !1, null, function (S, e) {
                    return e < 0 || S < 0 || S > 31 || !(!B || !B(S, e));
                  });
                })(S, e);
              }
            }
            else {
              at(S, e, "nhim");
            }
          }
          else {
            at(S, e, "hau");
          }
        }
        else {
          at(S, e, "xa");
        }
      } }, { id: "bag", z: 61, draw: function (S, a) {
        if ("back_sword" === a.cfg.bag) {
          var s = a.torso;
          var B = a.g.back;
          var o = a.g.side ? { x: s.x + 1, y: s.y - 8 } : { x: s.x + s.w - 1, y: s.y - 8 };
          var n = a.g.side ? { x: s.x + s.w, y: s.y + s.h + 9 } : { x: s.x + 1, y: s.y + s.h + 8 };
          e.fatLine(S, o.x, o.y, n.x, n.y, 4, "#11151d");
          e.fatLine(S, o.x, o.y, n.x, n.y, 2, "#303a49");
          e.line(S, o.x + 1, o.y, n.x + 1, n.y, B ? "#8b99aa" : "#59697b");
          e.fatLine(S, o.x, o.y, o.x, o.y - 5, 3, "#463426");
          e.fatLine(S, o.x - 3, o.y - 1, o.x + 3, o.y - 1, 2, "#a38a5d");
          e.dot(S, o.x, o.y - 5, "#d2bd83");
          e.line(S, s.x, s.y + 1, s.x + s.w, s.y + s.h - 1, "#6c5941");
        }
      } }, { id: "accessory", z: 62, draw: function (a, B) {
        if ("huan_su" !== B.cfg.accessory)
          if ("tho_ren_moi" !== B.cfg.accessory)
            if ("xa_toc" !== B.cfg.accessory)
              if ("hau_toc" !== B.cfg.accessory)
                if ("nhim_toc" !== B.cfg.accessory) {
                  if ("npc_tattoo" === B.cfg.accessory) {
                    if (B.g.back) {
                      return;
                    }
                    var o = B.torso;
                    var n = o.x;
                    var i = o.y;
                    var O = { line: "#253445", deep: "#31475a", base: "#52697a", hi: "#78909a" };
                    if (B.g.side) {
                      e.line(a, n + o.w - 2, i + 3, n + o.w, i + 8, O.deep);
                      e.line(a, n + o.w - 1, i + 6, n + o.w - 3, i + 12, O.base);
                      return void e.dot(a, n + o.w - 2, i + 13, O.hi);
                    }
                    var t = n + Math.floor(o.w / 2);
                    e.line(a, t, i + 2, t - 2, i + 5, O.deep);
                    e.line(a, t, i + 2, t + 2, i + 5, O.deep);
                    e.line(a, t - 2, i + 5, t - 4, i + 7, O.base);
                    e.line(a, t + 2, i + 5, t + 4, i + 7, O.base);
                    e.line(a, t - 4, i + 7, t - 2, i + 10, O.hi);
                    e.line(a, t + 4, i + 7, t + 2, i + 10, O.hi);
                    e.r(a, t - 5, i + 8, 2, 2, O.deep);
                    e.r(a, t + 4, i + 8, 2, 2, O.deep);
                    e.line(a, t - 2, i + 10, t - 4, i + 13, O.base);
                    e.line(a, t + 2, i + 10, t + 4, i + 13, O.base);
                    e.r(a, t - 1, i + 11, 2, 2, O.deep);
                    e.dot(a, t, i + 14, O.hi);
                    e.line(a, n - 1, i + 10, n + 1, i + 13, O.base);
                    return void e.line(a, n + o.w + 1, i + 10, n + o.w - 1, i + 13, O.base);
                  }
                  if ("duoc_truong" !== B.cfg.accessory) {
                    if ("quy_dien" === B.cfg.accessory) {
                      var r = B.head;
                      var d = "#ece3cc";
                      var b = "#8f8468";
                      var l = "#3a3326";
                      var f = "#c0302a";
                      var c = "#140f0c";
                      if (B.g.back) {
                        e.line(a, r.x + 1, r.y + 3, r.x, r.y - 2, b);
                        e.line(a, r.x + r.w - 2, r.y + 3, r.x + r.w - 1, r.y - 2, b);
                        e.dot(a, r.x, r.y - 2, d);
                        return void e.dot(a, r.x + r.w - 1, r.y - 2, d);
                      }
                      if (B.g.side) {
                        u(a, [[r.x + r.w - 7, r.y + 4], [r.x + r.w + 1, r.y + 4], [r.x + r.w + 1, r.y + 13], [r.x + r.w - 6, r.y + 14]], d);
                        e.line(a, r.x + r.w - 7, r.y + 4, r.x + r.w + 1, r.y + 4, b);
                        e.line(a, r.x + r.w - 6, r.y + 14, r.x + r.w + 1, r.y + 13, l);
                        e.r(a, r.x + r.w - 4, r.y + 7, 3, 3, c);
                        e.dot(a, r.x + r.w - 3, r.y + 8, "#ff6a4a");
                        e.line(a, r.x + r.w - 5, r.y + 4, r.x + r.w - 6, r.y - 2, b);
                        e.dot(a, r.x + r.w - 6, r.y - 2, d);
                        return void e.line(a, r.x + r.w - 6, r.y + 11, r.x + r.w - 2, r.y + 12, f);
                      }
                      var g = r.x + Math.floor(r.w / 2);
                      u(a, [[r.x - 1, r.y + 4], [r.x + r.w, r.y + 4], [r.x + r.w - 1, r.y + 12], [g, r.y + 14], [r.x, r.y + 12]], d);
                      e.line(a, r.x - 1, r.y + 4, r.x + r.w, r.y + 4, b);
                      e.line(a, r.x, r.y + 12, g, r.y + 14, l);
                      e.line(a, r.x + r.w - 1, r.y + 12, g, r.y + 14, l);
                      for (var x = 0; x < 2; x++) {
                        var D = r.x + H.eyes[x];
                        e.r(a, D, r.y + 7, 3, 3, c);
                        e.dot(a, D + 1, r.y + 8, "#ff6a4a");
                      }
                      e.line(a, r.x + 1, r.y + 4, r.x - 1, r.y - 2, b);
                      e.dot(a, r.x - 1, r.y - 2, d);
                      e.line(a, r.x + r.w - 2, r.y + 4, r.x + r.w, r.y - 2, b);
                      e.dot(a, r.x + r.w, r.y - 2, d);
                      e.line(a, g, r.y + 4, g, r.y + 6, f);
                      e.line(a, r.x, r.y + 10, r.x + 2, r.y + 11, f);
                      return void e.line(a, r.x + r.w - 1, r.y + 10, r.x + r.w - 3, r.y + 11, f);
                    }
                    if ("black_face_mask" !== B.cfg.accessory)
                      if ("smith_muscles" !== B.cfg.accessory) {
                        if ("tang_kinh_regalia" === B.cfg.accessory) {
                          if (B.g.back) {
                            return;
                          }
                          var W = B.head;
                          var J = B.torso;
                          var M = { line: "#7a5416", deep: "#a97620", base: "#d9a83b", hi: "#ffe18a" };
                          if (B.g.side) {
                            e.line(a, W.x + W.w - 5, W.y + 12, W.x + W.w - 2, W.y + 13, "#5e5148");
                            e.dot(a, W.x + W.w - 2, W.y + 13, "#83746b");
                          }
                          else {
                            e.line(a, W.x + 4, W.y + 12, W.x + 7, W.y + 13, "#5e5148");
                            e.line(a, W.x + W.w - 5, W.y + 12, W.x + W.w - 8, W.y + 13, "#5e5148");
                            e.dot(a, W.x + 7, W.y + 13, "#83746b");
                            e.dot(a, W.x + W.w - 8, W.y + 13, "#83746b");
                          }
                          t = J.x + Math.floor(J.w / 2);
                          var w = J.y + 8;
                          if (B.g.side) {
                            e.line(a, J.x + J.w - 2, J.y + 1, J.x + J.w, w, M.deep);
                            e.line(a, J.x + J.w, w, t + 2, w + 4, M.base);
                          }
                          else {
                            e.line(a, J.x + 1, J.y + 1, t - 1, w + 4, M.deep);
                            e.line(a, J.x + J.w - 2, J.y + 1, t + 1, w + 4, M.base);
                            e.dot(a, t - 1, w + 2, M.hi);
                            e.dot(a, t + 1, w + 2, M.hi);
                          }
                          u(a, [[t - 2, w + 4], [t + 2, w + 4], [t + 2, w + 9], [t, w + 13], [t - 1, w + 9]], "#6a4a25");
                          u(a, [[t - 1, w + 4], [t + 1, w + 5], [t + 1, w + 9], [t, w + 11], [t, w + 7]], "#eee1bd");
                          return void e.dot(a, t, w + 5, "#fff8dc");
                        }
                        if ("white_beard" === B.cfg.accessory) {
                          if (B.g.back) {
                            return;
                          }
                          var N = B.head;
                          var p = { line: "#555967", deep: "#777c8c", shade: "#a8acb7", base: "#d7d8d9", hi: "#f4f1e8" };
                          return B.g.side ? (u(a, [[N.x + N.w - 5, N.y + 11], [N.x + N.w + 1, N.y + 12], [N.x + N.w - 1, N.y + 25], [N.x + N.w - 5, N.y + 20]], p.deep), e.fatLine(a, N.x + N.w - 3, N.y + 13, N.x + N.w - 2, N.y + 23, 2, p.base), void e.dot(a, N.x + N.w - 2, N.y + 14, p.hi)) : (e.fatLine(a, N.x + 3, N.y + 12, N.x + 7, N.y + 14, 2, p.base), e.fatLine(a, N.x + N.w - 4, N.y + 12, N.x + N.w - 8, N.y + 14, 2, p.hi), e.dot(a, N.x + 7, N.y + 13, p.deep), e.dot(a, N.x + N.w - 8, N.y + 13, p.shade), u(a, [[N.x + 4, N.y + 14], [N.x + N.w - 5, N.y + 14], [N.x + N.w - 6, N.y + 24], [N.x + Math.floor(N.w / 2) + 1, N.y + 31], [N.x + 4, N.y + 23]], p.deep), u(a, [[N.x + 6, N.y + 14], [N.x + N.w - 7, N.y + 14], [N.x + N.w - 8, N.y + 22], [N.x + Math.floor(N.w / 2), N.y + 29], [N.x + 6, N.y + 21]], p.base), e.line(a, N.x + 7, N.y + 15, N.x + 7, N.y + 22, p.shade), e.line(a, N.x + N.w - 8, N.y + 15, N.x + N.w - 9, N.y + 21, p.hi), void e.line(a, N.x + Math.floor(N.w / 2), N.y + 17, N.x + Math.floor(N.w / 2), N.y + 27, p.hi));
                        }
                      }
                      else {
                        if (B.g.back) {
                          return;
                        }
                        var k = B.torso;
                        var m = B.head;
                        var v = G.face;
                        var y = "#342722";
                        var L = "#5b4438";
                        if (B.g.side) {
                          e.line(a, k.x + k.w - 3, k.y + 3, k.x + k.w - 1, k.y + 8, v.brow);
                          u(a, [[k.x + k.w - 4, k.y - 2], [k.x + k.w + 3, k.y], [k.x + k.w + 4, k.y + 4], [k.x + k.w - 2, k.y + 5]], G.metal.deep);
                          e.line(a, k.x + k.w - 3, k.y - 2, k.x + k.w + 2, k.y, G.metal.hi);
                          e.line(a, k.x + k.w - 1, k.y + 1, k.x + k.w + 3, k.y + 3, G.metal.shade);
                          e.dot(a, k.x + k.w, k.y + 2, G.leather.base);
                          u(a, [[m.x + m.w - 5, m.y + 11], [m.x + m.w, m.y + 12], [m.x + m.w - 2, m.y + 19], [m.x + m.w - 6, m.y + 16]], y);
                          e.line(a, m.x + m.w - 4, m.y + 12, m.x + m.w - 2, m.y + 17, L);
                        }
                        else {
                          e.line(a, k.x + 2, k.y + 3, k.x + 5, k.y + 5, v.brow);
                          e.line(a, k.x + k.w - 3, k.y + 3, k.x + k.w - 6, k.y + 5, v.brow);
                          e.line(a, k.x + 3, k.y + 7, k.x + 6, k.y + 7, v.blush);
                          e.line(a, k.x + k.w - 4, k.y + 7, k.x + k.w - 7, k.y + 7, v.blush);
                          e.line(a, k.x + Math.floor(k.w / 2), k.y + 7, k.x + Math.floor(k.w / 2), k.y + 11, v.browhi);
                          u(a, [[k.x - 3, k.y], [k.x + 1, k.y - 3], [k.x + 5, k.y - 1], [k.x + 4, k.y + 4], [k.x - 2, k.y + 5]], G.metal.deep);
                          e.line(a, k.x - 2, k.y, k.x + 2, k.y - 2, G.metal.hi);
                          e.line(a, k.x - 1, k.y + 2, k.x + 4, k.y + 1, G.metal.shade);
                          e.dot(a, k.x + 1, k.y + 1, G.leather.base);
                          u(a, [[k.x + k.w - 4, k.y - 1], [k.x + k.w, k.y], [k.x + k.w + 1, k.y + 3], [k.x + k.w - 4, k.y + 3]], G.metal.shade);
                          e.line(a, k.x + k.w - 3, k.y - 1, k.x + k.w, k.y, G.metal.hi);
                          e.dot(a, k.x + k.w - 2, k.y + 1, G.leather.base);
                          e.fatLine(a, m.x + 3, m.y + 12, m.x + 7, m.y + 14, 2, y);
                          e.fatLine(a, m.x + m.w - 4, m.y + 12, m.x + m.w - 8, m.y + 14, 2, y);
                          u(a, [[m.x + 2, m.y + 12], [m.x + 5, m.y + 14], [m.x + 6, m.y + 18], [m.x + Math.floor(m.w / 2), m.y + 22], [m.x + m.w - 7, m.y + 18], [m.x + m.w - 5, m.y + 14], [m.x + m.w - 2, m.y + 12], [m.x + m.w - 4, m.y + 19], [m.x + Math.floor(m.w / 2), m.y + 24], [m.x + 3, m.y + 19]], y);
                          e.line(a, m.x + 5, m.y + 15, m.x + 7, m.y + 19, L);
                          e.line(a, m.x + m.w - 6, m.y + 15, m.x + m.w - 8, m.y + 19, L);
                          e.dot(a, m.x + Math.floor(m.w / 2), m.y + 22, L);
                        }
                      }
                    else {
                      if (B.g.back) {
                        return;
                      }
                      var C = B.head;
                      var j = "#11141c";
                      var A = "#464d5a";
                      if (B.g.side) {
                        u(a, [[C.x + C.w - 6, C.y + 9], [C.x + C.w + 1, C.y + 9], [C.x + C.w, C.y + 15], [C.x + C.w - 5, C.y + 16]], j);
                        e.line(a, C.x + C.w - 5, C.y + 10, C.x + C.w, C.y + 10, A);
                      }
                      else {
                        u(a, [[C.x - 1, C.y + 9], [C.x + C.w, C.y + 9], [C.x + C.w - 2, C.y + 16], [C.x + 1, C.y + 16]], j);
                        e.line(a, C.x, C.y + 10, C.x + C.w - 1, C.y + 10, A);
                        e.r(a, C.x + 2, C.y + 13, C.w - 4, 2, "#282d39");
                        e.dot(a, C.x + 3, C.y + 12, A);
                        e.dot(a, C.x + C.w - 4, C.y + 14, j);
                      }
                    }
                  }
                  else {
                    !function (a, s) {
                      var B = s.g.side || s.g.back ? 1 : 0;
                      var o = h(s.arms[B]);
                      var n = "#24150b";
                      var i = "#7a4a26";
                      var O = "#a8703d";
                      var t = s.g.side || B ? 1 : -1;
                      var r = o.x + t * (s.g.side ? 5 : 3);
                      var d = Math.max(3, s.head.y + 3);
                      var b = Math.min(62, o.y + 20);
                      e.r(a, r - 1, d, 2, b - d, i);
                      e.r(a, r - 1, d, 1, b - d, "#4a2c17");
                      e.dot(a, r, d + 10, O);
                      e.dot(a, r - 1, d + 17, n);
                      u(a, [[r - 2, d + 1], [r + 1, d + 1], [r + 2, d - 2], [r + 3 * t, d - 3], [r + 3 * t, d]], i);
                      e.r(a, r - 2, d - 2, 4, 3, i);
                      e.dot(a, r + 2 * t, d - 2, O);
                      e.dot(a, r, d - 1, O);
                      e.dot(a, r - 2 * t, d + 1, n);
                      var l = t > 0 ? r + 2 : r - 6;
                      var f = d + 4;
                      var c = t > 0 ? r - 6 : r + 2;
                      if (QO(a, l, f, Pi, { R: "#b3202a", L: "#6b4514", G: "#c9922e", H: "#f2c96a" }, !1), e.line(a, r, f, l + 2, f, "#b3202a"), s.g.side || (QO(a, c, f + 7, Pi, { R: "#8a1820", L: "#5a3a10", G: "#b07c24", H: "#e0b453" }, !1), e.line(a, r, f + 7, c + 2, f + 7, "#8a1820")), e.line(a, l + 2, f + 9, l + 2, f + 14, "#b3202a"), e.dot(a, l + 1, f + 14, "#7a1218"), !s.g.back) {
                        var G = S.Palette.pick("SKIN", s.cfg.skin, "light");
                        e.fatLine(a, o.x, o.y, r, o.y - 1, 2, G.base);
                        e.r(a, r - 1, o.y - 2, 3, 3, G.base);
                        e.dot(a, r + t, o.y, G.shade);
                      }
                    }(a, B);
                  }
                }
                else {
                  ot(a, B, "nhim");
                }
              else {
                ot(a, B, "hau");
              }
            else {
              ot(a, B, "xa");
            }
          else {
            !function (a, B) {
              if (!B.g.back)
                if ($S(B)) {
                  !function (a, B) {
                    var o = xe;
                    var n = B.torso.x - 11;
                    var i = h(B.arms[1]);
                    var O = S.Palette.pick("SKIN", B.cfg.skin, "tan");
                    Se(a, B.head.x - 2, B.head.y + 4, We, o, 0);
                    e.fatLine(a, i.x, i.y - 2, n + 26, 52, 2, o.A);
                    e.line(a, i.x - 1, i.y - 2, n + 25, 52, o.a);
                    e.line(a, i.x + 1, i.y - 1, n + 27, 51, o.E);
                    e.r(a, i.x - 1, i.y - 3, 3, 1, o.I);
                    e.dot(a, i.x + 1, i.y - 3, o.W);
                    Se(a, n + 23, 52, Ne, o, 0);
                    s.drawHandBlock(a, i.x, i.y, O, !1);
                  }(a, B);
                }
                else {
                  var o = B.head;
                  var n = o.x;
                  var i = o.y;
                  var O = o.w;
                  var t = ZS;
                  var r = S.Palette.pick("SKIN", B.cfg.skin, "tan");
                  var d = n + Math.floor(O / 2);
                  if (B.g.side) {
                    e.line(a, n + O - 6, i + 5, n + O - 2, i + 5, t.line);
                    e.dot(a, n + O - 6, i + 6, t.deep);
                    u(a, [[n + O - 8, i + 10], [n + O - 2, i + 11], [n + O - 1, i + 13], [n + O - 3, i + 16], [n + O - 8, i + 16], [n + O - 9, i + 13]], t.base);
                    e.line(a, n + O - 8, i + 11, n + O - 3, i + 12, t.deep);
                    e.r(a, n + O - 6, i + 15, 3, 1, t.shade);
                    e.dot(a, n + O - 7, i + 13, t.hi);
                    e.dot(a, n + O - 4, i + 16, t.hi);
                    e.dot(a, n + O - 2, i + 14, r.deep);
                    return void e.dot(a, n + O - 5, i + 10, t.shade);
                  }
                  e.r(a, n + 2, i + 5, 4, 1, t.line);
                  e.r(a, n + O - 6, i + 5, 4, 1, t.line);
                  e.dot(a, n + 5, i + 6, t.deep);
                  e.dot(a, n + O - 6, i + 6, t.deep);
                  u(a, [[n + 1, i + 10], [n + 3, i + 11], [n + O - 4, i + 11], [n + O - 2, i + 10], [n + O - 1, i + 13], [n + O - 3, i + 16], [d, i + 17], [n + 2, i + 16], [n, i + 13]], t.base);
                  e.r(a, n + 3, i + 11, O - 6, 1, t.deep);
                  e.r(a, n + 5, i + 13, O - 10, 2, r.base);
                  e.line(a, n + 6, i + 14, n + O - 7, i + 14, zS);
                  e.line(a, n + 1, i + 12, n + 2, i + 15, t.deep);
                  e.line(a, n + O - 2, i + 12, n + O - 3, i + 15, t.deep);
                  e.line(a, n + 4, i + 16, n + O - 5, i + 16, t.shade);
                  e.dot(a, n + 3, i + 12, t.hi);
                  e.dot(a, n + O - 4, i + 12, t.hi);
                  e.dot(a, d, i + 16, t.hi);
                  e.dot(a, n + 2, i + 9, t.shade);
                  e.dot(a, n + 3, i + 9, r.deep);
                  e.dot(a, n + O - 4, i + 8, r.deep);
                  e.dot(a, n + O - 3, i + 8, t.shade);
                }
            }(a, B);
          }
        else {
          !function (a, s) {
            if (!s.g.back) {
              var B = s.head;
              var o = B.x;
              var n = B.y;
              var i = B.w;
              var O = G.face;
              var t = S.Palette.pick("SKIN", s.cfg.skin, "tan");
              if (s.g.side) {
                e.r(a, o + i - 5, n + 8, 3, 1, O.lid);
                e.dot(a, o + i - 2, n + 8, O.lid);
                e.r(a, o + i - 5, n + 7, 3, 1, t.base);
                return void e.line(a, o + i - 4, n + 13, o + i - 2, n + 13, VS);
              }
              for (var h = 0; h < 2; h++) {
                var r = o + H.eyes[h];
                var d = h ? r + 2 : r;
                var b = h ? r : r + 2;
                e.r(a, r, n + 7, 3, 1, t.shade);
                e.r(a, r, n + 8, 3, 1, O.lid);
                e.dot(a, d, n + 9, O.lid);
                e.dot(a, b, n + 10, t.shade);
              }
              e.line(a, o + 5, n + 13, o + i - 6, n + 13, VS);
              e.line(a, o + 6, n + 15, o + i - 7, n + 15, zS);
            }
          }(a, B);
        }
      } }, { id: "lan_thanh_y_paint", z: 65, draw: function (S, a) {
        !function (S, a) {
          if (a.cfg && "lan_thanh_y" === a.cfg.outfit) {
            var s = "left" === a.dir;
            var B = Ot[s ? "right" : a.dir];
            if (B) {
              for (var o = a.p && a.p.sit ? 0 : a.dy || 0, n = 0; n < B.length; n++) {
                var i = B[n];
                e.dot(S, s ? 31 - i[0] : i[0], i[1] + o, it[i[2]]);
              }
            }
          }
        }(S, a);
      } }, { id: "aura", z: 70, draw: function (S, e, a, s) {
        nt(S, e, s);
      } }];
  s.layerErrors = 0;
  var tt = {};
  s.drawLayers = function (S, e, a, B, o, n) {
    for (var i = J(e, a, B), O = 0; O < s.LAYERS.length; O++) {
      var t = s.LAYERS[O];
      if (!n || !1 !== n[t.id]) {
        try {
          t.draw(S, i, B, o || 0);
        }
        catch (S) {
          s.layerErrors++;
          if (!(tt[t.id])) {
            tt[t.id] = 1;
            console.error('[PNTT] Lớp "' + t.id + '" của nhân vật vẽ hỏng, bỏ qua lớp này:', S, B);
          }
        }
      }
    }
  };
  s.drawBody = function (S, e, a, s) {
    var B = J(e, a, s);
    Ii(S, B);
    zi(S, B);
    $i(S, B);
  };
  s.drawOutfit = function (S, e, a, s) {
    var B = J(e, a, s);
    nO(S, B);
    $O(S, B);
    yO(S, B);
    $i(S, B);
    LO(S, B);
  };
  s.drawHair = function (S, e, a, s, B) {
    TO(S, J(e, a, s), B);
  };
  s.drawAura = function (S, e, a, s, B, o) {
    if ("back" !== B) {
      nt(S, J(e, a, s), o || 0);
    }
  };
}(window.PNTT);
