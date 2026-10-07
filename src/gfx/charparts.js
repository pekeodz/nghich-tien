!function (S) {
  "use strict";
  var e = S.Pixel;
  var a = { HEAD_Y: 6, HEAD_H: 16, NECK_Y: 22, NECK_H: 2, TORSO_Y: 24, TORSO_H: 18, ARM_Y: 25, ARM_H: 17, LEG_Y: 42, LEG_H: 20, GROUND: 62 };
  var s = S.CharArt = { RIG: a };
  var o = { 10: { act: "seal", step: 0, bob: 0 }, 11: { act: "seal", step: 1, bob: -1 }, 12: { act: "palm", step: 0, bob: 0 }, 13: { act: "palm", step: 1, bob: -1 }, 14: { act: "gather", step: 0, bob: 0 }, 15: { act: "gather", step: 1, bob: -1 }, 16: { act: "guard", step: 0, bob: 0 }, 17: { act: "guard", step: 1, bob: 1 }, 18: { act: "cast", step: 0, bob: -1 }, 19: { act: "cast", step: 1, bob: 0 }, 20: { act: "hurt", step: 0, bob: 1 }, 21: { act: "hurt", step: 1, bob: 2 }, 22: { act: "down", step: 0, bob: 10, sit: 1 }, 23: { act: "down", step: 1, bob: 11, sit: 1 }, 24: { act: "seal", step: 0, bob: -1, leg: 1 }, 25: { act: "seal", step: 0, bob: -1, leg: -1 }, 26: { act: "seal", step: 1, bob: -1, leg: 1 }, 27: { act: "seal", step: 1, bob: -1, leg: -1 }, 28: { act: "palm", step: 0, bob: -1, leg: 1 }, 29: { act: "palm", step: 0, bob: -1, leg: -1 }, 30: { act: "palm", step: 1, bob: -1, leg: 1 }, 31: { act: "palm", step: 1, bob: -1, leg: -1 } };
  function i(S, e) {
    var a = "right" === S || "left" === S;
    var s = "female" === e.gender;
    return a ? { side: !0, back: !1, female: s, head: { x: 10, w: 13 }, neck: { x: 15, w: 3 }, torso: { x: 12, w: 8 }, legs: [{ x: 12, w: 4 }, { x: 15, w: 4 }], arms: [{ x: 12, w: 3 }, { x: 17, w: 3 }] } : { side: !1, back: "up" === S, female: s, head: { x: 9, w: 14 }, neck: { x: 14, w: 4 }, torso: { x: 11, w: 10 }, legs: [{ x: 12, w: 4 }, { x: 16, w: 4 }], arms: [{ x: 8, w: 3 }, { x: 21, w: 3 }] };
  }
  function B(S, e, s) {
    var o;
    var i;
    var B;
    var n;
    var O = a.LEG_Y + s;
    var t = a.GROUND;
    var h = 0 | e.leg;
    var r = [];
    for (o = 0; o < 2; o++)
      S.side ? (i = 0 !== h, B = S.legs[o].x + (0 === o ? 2 * -h : 2 * h)) : (i = 1 === h && 0 === o || -1 === h && 1 === o, B = S.legs[o].x + (i ? 0 === o ? -1 : 1 : 0)), n = t - (i ? 2 : 0), e.sit && (B = S.legs[o].x + (o ? 2 : -2), O = a.LEG_Y + s, n = t), r.push({ x: B, y: O, w: S.legs[o].w, h: Math.max(4, n - O), knee: e.sit ? t - 5 : Math.round((O + n) / 2), foot: n });
    return r;
  }
  function n(S, e, a, s, o, i) {
    return { diag: !0, x0: S, y0: e, x1: a, y1: s, w: o || 3, palm: !!i, x: Math.min(S, a), y: Math.min(e, s), h: Math.abs(s - e) + 1 };
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
        var e = o[S];
        return e ? { bob: e.bob, leg: e.leg || 0, arm: 0, atk: 0, sit: e.sit || 0, act: e.act, step: e.step } : { bob: 0, leg: 0, arm: 0, atk: 0 };
    }
  };
  s.geom = i;
  s.legRects = B;
  var t = { down: 0, left: 0, right: 1, up: 1 };
  function h(S) {
    return S ? S.diag ? { x: S.x1, y: S.y1 } : S.horiz ? { x: S.x + S.w - 1, y: S.y + 1 } : S.palm ? { x: S.x + 1, y: S.y + S.h } : { x: S.x + 1, y: S.y + S.h - 1 } : null;
  }
  s.weaponArm = function (S) {
    return 0 === t[S] ? 0 : 1;
  };
  s.handOf = h;
  s.weaponHand = function (e, a, o) {
    var B;
    var n = s.weaponArm(e);
    var O = "left" === e ? "right" : e;
    var t = {};
    for (B in a)
      Object.prototype.hasOwnProperty.call(a, B) && (t[B] = a[B]);
    t.attackArm = n;
    t.armed = !0;
    var r = h(b(O, i(O, o || {}), t, 0 | a.bob)[n]);
    if ("left" === e) {
      r = { x: (S.CONFIG && S.CONFIG.CHAR_W || 32) - 1 - r.x, y: r.y };
    }
    return r;
  };
  s.FLUTE = { LEN: 23 };
  var r = { down: { windup: { m: [15, 2], a: 116, n: 17, h: [[1, .22, 1], [0, .62, 1]] }, strike: { m: [15, -6], a: 124, n: 19, h: [[1, .22, 1], [0, .74, 1]] }, sit: { m: [25, 15], a: 180, n: 21, h: [[1, .18, 1], [0, .74, 1]] } }, right: { windup: { m: [21, 3], a: 42, n: 20, h: [[0, .2, 0], [1, .58, 1]] }, strike: { m: [22, -6], a: 56, n: 22, h: [[0, .2, 0], [1, .58, 1]] }, sit: { m: [13, 14], a: 0, n: 21, h: [[0, .2, 0], [1, .55, 1]] } }, up: { windup: { m: [16, 2], a: 66, n: 17, h: [[0, .6, 0], [1, .22, 1]] }, strike: { m: [16, -6], a: 62, n: 19, h: [[0, .6, 0], [1, .22, 1]] }, sit: { m: [25, 15], a: 180, n: 21, h: [[1, .18, 1], [0, .74, 0]] } } };
  function d(S, e, a, s) {
    var o = "left" === S;
    var i = o ? "right" : S;
    if (a.act) {
      return null;
    }
    var B = a.sit ? "sit" : 2 === a.atk ? "strike" : 1 === a.atk ? "windup" : "";
    var O = B && r[i] && r[i][B];
    if (!O) {
      return null;
    }
    var t = O.a * Math.PI / 180;
    var h = Math.cos(t);
    var d = Math.sin(t);
    function l(S) {
      return o ? 31 - S : S;
    }
    for (var f = { x: O.m[0], y: s + O.m[1] }, c = { key: B, dir: S, n: O.n, a: o ? 180 - O.a : O.a, ux: o ? -h : h, uy: d, m: { x: l(f.x), y: f.y }, b: { x: l(f.x + h * O.n), y: f.y + d * O.n }, hands: [], arms: [] }, b = 0; b < O.h.length; b++) {
      var G = O.h[b];
      var H = G[0];
      var g = Math.round(f.x + h * O.n * G[1]);
      var x = Math.round(f.y + d * O.n * G[1]);
      var D = n(l(e.arms[H].x + 1), s + 1, l(g), x, 3, !1);
      D.front = !!G[2];
      c.arms[H] = D;
      c.hands.push({ arm: H, t: G[1], x: l(g), y: x });
    }
    return c;
  }
  s.fluteRig = function (S, e, s) {
    return d(S, i("left" === S ? "right" : S, s || {}), e, a.ARM_Y + (0 | e.bob));
  };
  s.DUAL = { LEN: 59, BUTT: 22 };
  var l = { down: [-100, -80], right: [-118, -62], up: [-100, -80] };
  var f = { down: { windup: [{ x: 4, y: 2, a: -130 }, { x: 28, y: 2, a: -50 }], strike: [{ x: 20, y: 9, a: 188 }, { x: 12, y: 9, a: -8 }] }, right: { windup: [{ x: 8, y: 2, a: -142 }, { x: 11, y: 3, a: -118 }], strike: [{ x: 23, y: 9, a: 10 }, { x: 27, y: 11, a: 24 }] }, up: { windup: [{ x: 5, y: 2, a: -130 }, { x: 27, y: 2, a: -50 }], strike: [{ x: 20, y: 9, a: 188 }, { x: 12, y: 9, a: -8 }] } };
  function c(S, e, a, s) {
    var o = "left" === S;
    var i = o ? "right" : S;
    if (a.act || a.sit) {
      return null;
    }
    var B = 2 === a.atk ? "strike" : 1 === a.atk ? "windup" : "";
    var O = B && f[i] && f[i][B];
    if (!O) {
      return null;
    }
    function t(S) {
      return o ? 31 - S : S;
    }
    for (var h = { key: B, dir: S, hands: [], arms: [] }, r = 0; r < 2; r++) {
      var d = O[r];
      var l = n(t(e.arms[r].x + 1), s + 1, t(d.x), s + d.y, 3, !1);
      l.front = "strike" === B || 1 === r;
      h.arms[r] = l;
      h.hands.push({ arm: r, x: t(d.x), y: s + d.y, a: o ? 180 - d.a : d.a });
    }
    return h;
  }
  function b(S, e, s, o) {
    var i;
    var B = a.ARM_Y + o;
    var t = a.ARM_H;
    var h = 0 | s.arm;
    var r = 0 === s.attackArm ? 0 : 1;
    if (s.flute && (s.atk || s.sit) && !s.act) {
      var l = d(S, e, s, B);
      if (l) {
        return l.arms;
      }
    }
    if (s.dual && s.atk && !s.act) {
      var f = c(S, e, s, B);
      if (f) {
        return f.arms;
      }
    }
    return s.act ? function (S, e, a) {
      var s;
      var o = 0 | e.step;
      var i = S.side;
      var B = S.back;
      var t = S.arms[0].x + 1;
      var h = S.arms[1].x + 1;
      var r = S.neck.x + Math.floor(S.neck.w / 2);
      switch (e.act) {
        case "seal": return O(0 === o ? [n(t + 1, a + 1, r - 2, a + 7, 3), n(h - 1, a + 1, r + 2, a + 7, 3)] : [n(t - 2, a + 3, r - 2, a + 7, 3), n(h + 2, a + 3, r + 2, a + 7, 3)]);
        case "palm": return 0 === o ? [{ x: t, y: a + 1, w: 3, h: 10 }, { x: i ? 15 : h, y: a + 6, w: 3, h: 6 }] : i ? [{ x: t, y: a + 2, w: 3, h: 9 }, { x: 18, y: a + 4, w: 11, h: 3, horiz: !0, palm: !0 }] : B ? [{ x: t, y: a + 2, w: 3, h: 9 }, { x: h - 1, y: a - 1, w: 3, h: 8, palm: !0 }] : [{ x: t, y: a + 2, w: 3, h: 9 }, n(h, a + 2, 18, a + 9, 3, !0)];
        case "gather": return 0 === o ? O([n(t + 1, a + 2, r - 2, a + 9, 3), n(h - 1, a + 2, r + 2, a + 9, 3)]) : [n(t, a + 3, i ? 8 : 4, a + 8, 3, !0), n(h, a + 3, i ? 26 : 28, a + 8, 3, !0)];
        case "guard": return O(0 === o ? [n(t - 2, a + 8, r + 4, a - 2, 3), n(h + 2, a + 8, r - 4, a - 2, 3)] : [n(t - 1, a + 9, r + 3, a + 1, 3), n(h + 1, a + 9, r - 3, a + 1, 3)]);
        case "cast": return 0 === o ? ((s = [n(t + 1, a + 2, i ? 12 : 7, a - 21, 3), n(h - 1, a + 2, i ? 21 : 24, a - 22, 3, !0)])[0].over = s[1].over = !0, s) : [n(t + 1, a - 3, i ? 12 : 11, a + 5, 3), n(h - 1, a - 3, i ? 25 : 21, a + 6, 3, !0)];
        case "hurt": return 0 === o ? [n(t, a + 1, i ? 9 : 4, a + 5, 3), n(h, a + 1, i ? 25 : 28, a + 5, 3)] : [n(t, a + 3, i ? 10 : 5, a + 10, 3), n(h, a + 3, i ? 24 : 27, a + 10, 3)];
        default: return 0 === o ? [{ x: i ? 12 : 10, y: a + 5, w: 3, h: 7 }, { x: i ? 18 : 19, y: a + 5, w: 3, h: 7 }] : [n(i ? 13 : 11, a + 5, i ? 10 : 8, a + 11, 3, !0), n(i ? 19 : 20, a + 5, i ? 23 : 24, a + 11, 3, !0)];
      }
    }(e, s, B) : s.bow && s.atk ? function (S, e, a, s) {
      var o;
      var i;
      var B = 1 === e.atk;
      var O = s ? 0 : 1;
      if (S.side) {
        if (1 === s) {
          o = { x: B ? 22 : 24, y: a + 5 };
          i = { x: B ? 17 : 19, y: a + (B ? 4 : 7) };
        }
        else {
          o = { x: B ? 15 : 13, y: a + 5 };
          i = { x: B ? 20 : 18, y: a + (B ? 4 : 7) };
        }
      }
      else {
        if (0 === s) {
          o = { x: B ? 11 : 12, y: a + 5 };
          i = { x: B ? 20 : 18, y: a + (B ? 4 : 7) };
        }
        else {
          o = { x: B ? 20 : 19, y: a + 5 };
          i = { x: B ? 13 : 15, y: a + (B ? 4 : 7) };
        }
      }
      var t = [];
      t[s] = n(S.arms[s].x + 1, a + 1, o.x, o.y, 3);
      t[O] = n(S.arms[O].x + 1, a + 1, i.x, i.y, 3);
      t[0].front = !0;
      t[1].front = !0;
      return t;
    }(e, s, B, r) : s.armed && s.atk ? function (S, e, s, o) {
      var i;
      var B = o ? 0 : 1;
      var O = (S.side ? S.arms[1].x : S.arms[o].x) + 1;
      var t = { x: S.arms[B].x + (S.side ? B ? 1 : -1 : 0), y: s + 1, w: 3, h: a.ARM_H - 2 };
      var h = n(O, s + 1, (i = S.side ? 1 === e.atk ? { x: O - 5, y: s + 2 } : { x: O + 5, y: s + 9 } : 1 === e.atk ? { x: o ? O + 2 : O - 2, y: s - 3 } : { x: o ? O - 5 : O + 5, y: s + 12 }).x, i.y, 3);
      var r = [];
      r[o] = h;
      r[B] = t;
      if (!(S.side || 0 !== o)) {
        h.front = !0;
      }
      return r;
    }(e, s, B, r) : s.sit ? [{ x: e.side ? 12 : 9, y: B + 1, w: 3, h: 8 }, { x: e.side ? 17 : 20, y: B + 1, w: 3, h: 8 }] : (e.side ? (i = [{ x: e.arms[0].x - h, y: B, w: 3, h: t }, { x: e.arms[1].x + h, y: B, w: 3, h: t }], 1 === s.atk ? i[r] = 0 === r ? { x: e.arms[0].x + 4, y: B - 2, w: 3, h: 12 } : { x: e.arms[1].x - 4, y: B - 2, w: 3, h: 12 } : 2 === s.atk && (i[r] = 0 === r ? { x: e.arms[0].x, y: B + 5, w: 10, h: 3, horiz: !0 } : { x: e.arms[1].x, y: B + 5, w: 10, h: 3, horiz: !0 })) : (i = [{ x: e.arms[0].x, y: B - h, w: 3, h: t }, { x: e.arms[1].x, y: B + h, w: 3, h: t }], 1 === s.atk ? i[r] = 0 === r ? { x: e.arms[0].x + 1, y: B - 5, w: 3, h: 11 } : { x: e.arms[1].x - 1, y: B - 5, w: 3, h: 11 } : 2 === s.atk && (0 === r ? i[0] = { x: e.arms[0].x + 2, y: B + 6, w: 3, h: 13 } : i[1] = "up" === S ? n(e.arms[1].x + 1, B + 1, e.arms[1].x + 3, B - 8, 3) : { x: e.arms[1].x - 2, y: B + 6, w: 3, h: 13 })), i);
  }
  s.dualRig = function (S, e, s) {
    var o = "left" === S ? "right" : S;
    var B = i(o, s || {});
    var n = 0 | e.bob;
    var O = c(S, B, e, a.ARM_Y + n);
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
    for (var d = b(o, B, t, n), f = [], G = l[o] || l.down, H = 0; H < 2; H++) {
      var g = h(d[H]);
      f.push({ arm: H, x: "left" === S ? 31 - g.x : g.x, y: g.y, a: "left" === S ? 180 - G[H] : G[H] });
    }
    return { key: e.act ? "act" : "carry", dir: S, hands: f, arms: d };
  };
  s.armRects = b;
  var G = s.ART = { cloth: { line: "#213421", deep: "#344c2e", shade: "#506d3e", base: "#739650", hi: "#a5ba71" }, trim: { line: "#686b4e", deep: "#929574", shade: "#b4b894", base: "#dddfbc", hi: "#f4f0d1" }, leather: { line: "#281e19", deep: "#403023", shade: "#654731", base: "#896040", hi: "#b88b5b" }, pants: { line: "#333734", deep: "#464b46", shade: "#686d5f", base: "#8a907e", hi: "#b4b5a0" }, metal: { line: "#40484b", deep: "#606b70", shade: "#899498", base: "#bdc5bf", hi: "#ecede0" }, hat: { line: "#77532a", deep: "#a57527", shade: "#cd9b32", base: "#ebc64b", hi: "#fff090" }, crown: { line: "#11121c", deep: "#1b1c29", shade: "#2c2c3d", base: "#414155", hi: "#626071" }, face: { lid: "#3a2620", lidhi: "#5c3d31", low: "#7f8a9b", lowhi: "#a3adba", sclera: "#cfc7bd", blush: "#e7ab97", brow: "#8a5c3f", browhi: "#a9764f", irisdeep: "#191821", irishi: "#4b4859" } };
  var H = { brows: [2, 8], eyes: [2, 8], fringe: [4, 3, 5, 2, 4, 6, 3, 2, 5, 3, 4, 2, 3, 2] };
  var g = s.NOVICE = { ao_thon_lac: { cloth: { line: "#26343a", deep: "#35464a", shade: "#43545a", base: "#56666a", hi: "#788781" }, trim: { line: "#74684f", deep: "#95876a", shade: "#a4956f", base: "#b5a27c", hi: "#d1c09a" }, pants: { line: "#23282c", deep: "#34383c", shade: "#3b4142", base: "#494c4b", hi: "#656762" }, accent: { line: "#4f3b2d", deep: "#674d37", shade: "#75583e", base: "#856344", hi: "#b28a58" } }, lu_hanh_moc: { cloth: { line: "#716953", deep: "#a99d82", shade: "#b9ad91", base: "#c8bb9b", hi: "#e1d5b6" }, trim: { line: "#633128", deep: "#8a4735", shade: "#9c553e", base: "#ad6348", hi: "#d29163" }, pants: { line: "#252b23", deep: "#3e4b35", shade: "#46543d", base: "#58684a", hi: "#849169" }, accent: { line: "#2c201a", deep: "#493024", shade: "#60432f", base: "#72503a", hi: "#987052" } }, tieu_thanh: { cloth: { line: "#123b42", deep: "#17545d", shade: "#24727a", base: "#31939a", hi: "#66bec0" }, trim: { line: "#4b5966", deep: "#71808e", shade: "#a2b0ba", base: "#d2dce0", hi: "#f2f4ee" }, pants: { line: "#4a5662", deep: "#6d7b88", shade: "#9daab4", base: "#cbd5da", hi: "#eef1ec" } }, hong_ty: { cloth: { line: "#0b0d13", deep: "#12151d", shade: "#20242e", base: "#292d38", hi: "#3c424e" }, trim: { line: "#2b1b16", deep: "#4a2d20", shade: "#745039", base: "#9a6a48", hi: "#c49a6a" }, pants: { line: "#201712", deep: "#32241b", shade: "#59402d", base: "#76553a", hi: "#9b7350" } }, truc_co_chap_su: { cloth: { line: "#101827", deep: "#1b2a40", shade: "#2d4562", base: "#426486", hi: "#718faa" }, trim: { line: "#332d29", deep: "#554a40", shade: "#817365", base: "#aa9b87", hi: "#ded5c6" }, pants: { line: "#111827", deep: "#1d293b", shade: "#30445a", base: "#465f78", hi: "#71859a" } }, tho_ren: { cloth: { line: "#342117", deep: "#563722", shade: "#805735", base: "#a8794b", hi: "#d5aa72" }, trim: { line: "#4b3020", deep: "#704a2c", shade: "#9b7047", base: "#c49a67", hi: "#ead1a4" }, pants: { line: "#282923", deep: "#3c3e35", shade: "#5b5e4d", base: "#777a61", hi: "#9b9d7b" } }, su_phu: { cloth: { line: "#171522", deep: "#252334", shade: "#3b384c", base: "#514d62", hi: "#777184" }, trim: { line: "#3f3d49", deep: "#676571", shade: "#92909a", base: "#c7c4c4", hi: "#f0ece2" }, pants: { line: "#15141d", deep: "#23222f", shade: "#373644", base: "#4c4a58", hi: "#706d78" } }, bach_y: { cloth: { line: "#4b5364", deep: "#8a92a1", shade: "#bac1ca", base: "#e6e8e6", hi: "#fbfbf6" }, trim: { line: "#223a57", deep: "#35587d", shade: "#5682ab", base: "#86b0d2", hi: "#c8e1f1" }, accent: { line: "#0f192d", deep: "#1b2c4e", shade: "#294473", base: "#3b5e9b", hi: "#6a90c8" }, silver: { deep: "#97a3b3", base: "#d2dbe5", hi: "#ffffff" }, jade: { line: "#3b6a58", deep: "#68a189", base: "#b3dfc8", hi: "#effff6" }, pants: { line: "#3a4151", deep: "#576173", shade: "#7b8596", base: "#a3acb9", hi: "#cbd2db" } }, hac_y: { cloth: { line: "#07080d", deep: "#0f121d", shade: "#1a1f2f", base: "#272d41", hi: "#3d465f" }, trim: { line: "#2c323e", deep: "#4a5261", shade: "#6c7485", base: "#9199a8", hi: "#c6ccd6" }, leather: { line: "#110b09", deep: "#221713", shade: "#3a281f", base: "#56392a", hi: "#7d5a42" }, accent: { line: "#2a060a", deep: "#520c14", shade: "#7c1420", base: "#a5222d", hi: "#d64a4f" }, metal: { line: "#383e47", deep: "#5f6873", shade: "#8f99a4", base: "#c5ccd3", hi: "#f2f5f7" }, wrap: { line: "#1b1e25", deep: "#343944", shade: "#4c525e", base: "#666d7a", hi: "#9098a5" }, pants: { line: "#050608", deep: "#0c0e14", shade: "#161922", base: "#20242f", hi: "#323847" } }, lam_y: { cloth: { line: "#0d1830", deep: "#182a4e", shade: "#233f73", base: "#33589a", hi: "#5980c0" }, accent: { line: "#566072", deep: "#959fae", shade: "#c1c8d2", base: "#e8ebee", hi: "#ffffff" }, trim: { line: "#04060b", deep: "#0b0f19", shade: "#151b29", base: "#212a3d", hi: "#39465f" }, cord: { line: "#4a3410", deep: "#79591b", shade: "#a17b2d", base: "#c8a14a", hi: "#ecd185" }, pants: { line: "#121a28", deep: "#1f2c44", shade: "#324360", base: "#475c7d", hi: "#6c81a1" } }, chi_ton_kiem_y: { cloth: { line: "#0e121a", deep: "#171d27", shade: "#252d3a", base: "#343d4c", hi: "#536070" }, trim: { line: "#514330", deep: "#796344", shade: "#a38b5d", base: "#c6ad78", hi: "#eee0af" }, accent: { line: "#545f70", deep: "#8998ad", shade: "#b9c7d8", base: "#e1e8ee", hi: "#f9fcff" }, pants: { line: "#11151c", deep: "#1b2029", shade: "#2d3440", base: "#404957", hi: "#606b78" } }, thien_luan_kiem_y: { cloth: { line: "#10233a", deep: "#1d4468", shade: "#3d76a8", base: "#70a8d4", hi: "#bfe3f7" }, trim: { line: "#52340c", deep: "#8d5b16", shade: "#c28a27", base: "#e4b64b", hi: "#ffe7a0" }, accent: { line: "#526274", deep: "#8aa4bd", shade: "#bdd3e3", base: "#e6f3fb", hi: "#ffffff" }, pants: { line: "#0e1b2c", deep: "#1d3048", shade: "#34516d", base: "#5c748e", hi: "#9bb2c8" } }, tuyet_son_kiem_y: { cloth: { line: "#3b4762", deep: "#7a88a6", shade: "#aab8cf", base: "#e1e8f0", hi: "#fbfdff" }, trim: { line: "#46301a", deep: "#7a5933", shade: "#a8804d", base: "#cfa86a", hi: "#f2dca5" }, accent: { line: "#194a61", deep: "#2a83a3", shade: "#44a6c3", base: "#6ccadb", hi: "#b8eef6" }, pants: { line: "#0b0b11", deep: "#15151d", shade: "#22222c", base: "#30303c", hi: "#4b4b5c" }, red: { line: "#3b0d18", deep: "#6b1629", shade: "#931c37", base: "#bb2541", hi: "#e45262" }, pink: { line: "#6a2848", deep: "#a24d75", shade: "#c86a91", base: "#e693b1", hi: "#f9c6d7" }, armor: { line: "#0a1823", deep: "#123246", shade: "#1d506b", base: "#29728f", hi: "#4cb0cf", spark: "#aef2ff" } }, xa_toc_y: { cloth: { line: "#07180f", deep: "#0f3320", shade: "#175232", base: "#217545", hi: "#37a05f" }, trim: { line: "#5a3f08", deep: "#8d6510", shade: "#c79a25", base: "#f0c445", hi: "#ffe8a0" }, pants: { line: "#06130c", deep: "#0c2416", shade: "#12371f", base: "#1a4b2c", hi: "#286a40" } }, hau_toc_y: { cloth: { line: "#2a1607", deep: "#4f2b0e", shade: "#7a4519", base: "#a45f28", hi: "#cf8a48" }, trim: { line: "#5a2f06", deep: "#a2560f", shade: "#dd8a22", base: "#f6b640", hi: "#ffe19a" }, pants: { line: "#21120a", deep: "#3d2211", shade: "#5c3519", base: "#7d4a24", hi: "#a3683a" } }, nhim_toc_y: { cloth: { line: "#150f1d", deep: "#2c2140", shade: "#443561", base: "#5f4c85", hi: "#8570ab" }, trim: { line: "#5e5238", deep: "#8f8054", shade: "#c4b27c", base: "#eadba6", hi: "#fff6d6" }, pants: { line: "#110c18", deep: "#221a31", shade: "#352a4b", base: "#4a3c66", hi: "#66558a" } }, ta_tu_y_xanh: { cloth: { line: "#050f14", deep: "#0a1c24", shade: "#102b36", base: "#173b48", hi: "#245463" }, trim: { line: "#0a3a33", deep: "#146b5c", shade: "#1f9a82", base: "#37c7a4", hi: "#8ff0d2" }, pants: { line: "#050d11", deep: "#0a171d", shade: "#11242c", base: "#18303a", hi: "#24434f" } }, ta_tu_y: { cloth: { line: "#0d0710", deep: "#1b0d1f", shade: "#2c1530", base: "#3d1c42", hi: "#5a2b5f" }, trim: { line: "#3a0a10", deep: "#6b111c", shade: "#9c1b2a", base: "#c8283a", hi: "#ec5a62" }, pants: { line: "#0b070d", deep: "#170f1a", shade: "#241829", base: "#302136", hi: "#45324c" } }, hoang_cuu_bao_y: { cloth: { line: "#0c0b11", deep: "#17151e", shade: "#23202b", base: "#2f2b38", hi: "#4a4555" }, trim: { line: "#4a3115", deep: "#7a5424", shade: "#b28236", base: "#d9ad52", hi: "#f6db8c" }, pants: { line: "#0c0b11", deep: "#17151e", shade: "#221f29", base: "#2d2935", hi: "#433e4d" } }, sat_luc_y: { cloth: { line: "#4a3847", deep: "#7d6477", shade: "#a88f9c", base: "#d8c6b8", hi: "#efe3d3" }, trim: { line: "#3d220f", deep: "#744a1f", shade: "#b07a32", base: "#dcae55", hi: "#f5d98f", spark: "#fff3c8" }, accent: { line: "#2b0810", deep: "#56101b", shade: "#83201f", base: "#b0321f", hi: "#d9642f" }, pants: { line: "#150d15", deep: "#221620", shade: "#34222f", base: "#47303f", hi: "#62475a" }, armor: { line: "#09080c", deep: "#16131b", shade: "#252029", base: "#342e38", hi: "#4d4652", spark: "#7a7280" }, mantle: { line: "#231626", deep: "#3b2439", shade: "#5a3a55", base: "#7b5470", hi: "#9d7590", tip: "#4d5261", tiphi: "#667082" }, cape: { line: "#141017", deep: "#2a232c", shade: "#3a313b", base: "#4a3f4a", hi: "#65596a", pat: "#9a8b98" }, panel: { line: "#1f0c12", deep: "#3a1822", shade: "#4f2430", base: "#5e2f3a", pat: "#9c6f5e" }, flame: { line: "#2c2f7a", deep: "#3b4fb8", base: "#5c95ee", hi: "#a6e4fc", core: "#f0fbff" } }, tan_mo_y: { cloth: { line: "#0c0a0e", deep: "#18151b", shade: "#252028", base: "#342d37", hi: "#4d4451" }, white: { line: "#57505e", deep: "#958ea0", shade: "#c6c0ca", base: "#ebe7ec", hi: "#fbf9f7" }, trim: { line: "#4a3520", deep: "#7a5c38", shade: "#ad8a5c", base: "#d6b682", hi: "#f1ddb4" }, accent: { line: "#4f160f", deep: "#8a2b1b", shade: "#b54428", base: "#d65f37", hi: "#ef905b" }, red: { line: "#370a10", deep: "#66121b", base: "#961d27", hi: "#c43d46" }, olive: { line: "#1c2110", deep: "#2c361a", shade: "#414d26", base: "#576631", hi: "#768848" }, brown: { line: "#1a120d", deep: "#2c2018", shade: "#433225", base: "#5a4434", hi: "#7b624d" }, teal: { deep: "#1b5856", base: "#2d8c86", hi: "#69cfc0" }, pants: { line: "#0a080b", deep: "#141117", shade: "#1e1a22", base: "#28232e", hi: "#3a3442" } }, than_kiem_y: { mantle: { line: "#4a3923", deep: "#b09568", shade: "#d9c49c", base: "#efe2c4", hi: "#fdf7e6" }, trim: { line: "#4a3115", deep: "#7a5424", shade: "#b28236", base: "#d9ad52", hi: "#f6db8c", spark: "#fff4cc" }, cloth: { line: "#0c0b12", deep: "#181623", shade: "#262232", base: "#342f42", hi: "#4b4560" }, white: { line: "#5c5462", deep: "#9b93a0", shade: "#c9c1c6", base: "#e8e2e3", hi: "#fbf8f5" }, pants: { line: "#120e17", deep: "#221a2a", shade: "#34283d", base: "#463750", hi: "#5d4b69" }, jade: { line: "#123f35", deep: "#1f6b58", shade: "#2f8c72", base: "#46b08e", hi: "#9ae6c8" } }, thanh_tam_y: { cloth: { line: "#05111e", deep: "#092c47", shade: "#0d4062", base: "#11567e", hi: "#2a78a2" }, accent: { line: "#2b4a72", deep: "#6890c0", shade: "#97bde2", base: "#c2dbf0", hi: "#eaf5fd" }, trim: { line: "#4d300f", deep: "#8a5a1e", shade: "#c38b37", base: "#e8b552", hi: "#f8da8c", spark: "#fff3c8" }, sleeve: { line: "#050d21", deep: "#0b2454", shade: "#113477", base: "#194792", hi: "#2f65b2" }, navy: { line: "#03060f", deep: "#081228", shade: "#0c1c3c", base: "#12284f", hi: "#1d3b6a" }, red: { line: "#3a0a0c", deep: "#7a1a18", base: "#c2362c", hi: "#ef6a4e" }, pearl: { deep: "#9fb2c6", base: "#e4edf5", hi: "#ffffff" }, pants: { line: "#04070f", deep: "#0a1224", shade: "#101c36", base: "#172746", hi: "#25395e" } }, man_ho_tu_y: { cloth: { line: "#0a1030", deep: "#13245f", shade: "#1c3890", base: "#2a4fbf", hi: "#4d74e0" }, accent: { line: "#1c3890", deep: "#3558c9", shade: "#5579dc", base: "#7d9bef", hi: "#b9cafb" }, trim: { line: "#3f2f14", deep: "#6e5424", shade: "#9c7c3c", base: "#c8a55c", hi: "#eed9a0", spark: "#fff6dc" }, belt: { line: "#26241a", deep: "#454230", shade: "#646046", base: "#878260", hi: "#b5b08a" }, pants: { line: "#07080f", deep: "#11131f", shade: "#1f2233", base: "#2e3246", hi: "#4b5068" } }, hoat_tu_y: { cloth: { line: "#10101a", deep: "#191a27", shade: "#272837", base: "#393849", hi: "#535063" }, trim: { line: "#4d1028", deep: "#800f30", shade: "#aa1238", base: "#d51b42", hi: "#ff5364" }, accent: { line: "#686175", deep: "#958ba3", shade: "#bdb4ca", base: "#e8e4ed", hi: "#fff9ff" }, pants: { line: "#11111c", deep: "#1a1927", shade: "#292638", base: "#3b354b", hi: "#5b5068" } }, nam_tu_y: { cloth: { line: "#240d20", deep: "#570c25", shade: "#881027", base: "#b9162c", hi: "#e83b3e" }, trim: { line: "#663017", deep: "#a65316", shade: "#d78318", base: "#f6b72e", hi: "#fff0a0" }, accent: { line: "#424453", deep: "#777e96", shade: "#b9c1d4", base: "#eef0f5", hi: "#ffffff" }, pants: { line: "#15131f", deep: "#211e2d", shade: "#322b3d", base: "#463849", hi: "#685164" } }, vuong_lam_y: { cloth: { line: "#101017", deep: "#1b1b25", shade: "#2b2935", base: "#3b3743", hi: "#57515e" }, trim: { line: "#41404f", deep: "#686775", shade: "#9b99a8", base: "#cfced9", hi: "#f5f2fa" }, accent: { line: "#350d19", deep: "#541421", shade: "#7d2030", base: "#aa3040", hi: "#d05a62" }, pants: { line: "#101018", deep: "#191a24", shade: "#292a35", base: "#3a3b47", hi: "#5b5a68" } }, huyen_cot_y: { cloth: { line: "#102a46", deep: "#174c78", shade: "#206fa6", base: "#298fd0", hi: "#6bc5ee", spark: "#a8e2f7" }, trim: { line: "#374955", deep: "#617d8e", shade: "#88bacd", base: "#b2e1ed", hi: "#e2eeee" }, pants: { line: "#0b1221", deep: "#132035", shade: "#1b2e48", base: "#2a4161", hi: "#48627f" }, bone: { line: "#3c4650", deep: "#6c7a86", shade: "#8e9ca6", base: "#aebfc8", hi: "#e2eeee" }, ink: { line: "#070d17", deep: "#0b1422", shade: "#101b2b", base: "#101b2b", hi: "#1b2b42" } }, tong_ngoc_y: { cloth: { line: "#293f50", deep: "#34586e", shade: "#5e8b9f", base: "#91bcc8", hi: "#c3dce0" }, trim: { line: "#3a5267", deep: "#718b9e", shade: "#aebfcd", base: "#dce9ed", hi: "#f2f4ee" }, pants: { line: "#243d50", deep: "#2d566e", shade: "#49768c", base: "#80acbb", hi: "#bed4dd" } }, lan_thanh_y: { cloth: { line: "#0d3a40", deep: "#1f7a78", shade: "#3aa59d", base: "#66c6ba", hi: "#a6e6d6" }, skirt: { line: "#062a2e", deep: "#0b4c4f", shade: "#13706e", base: "#1f918a", hi: "#42bab0" }, trim: { line: "#3a464e", deep: "#6b7a84", shade: "#98a7b0", base: "#c3cfd4", hi: "#f2f7f7" }, cream: { line: "#8a8672", deep: "#bdb8a0", shade: "#d8d3bb", base: "#f0ecd8", hi: "#fffdf0" }, accent: { line: "#3a1408", deep: "#6e2c14", shade: "#a54c24", base: "#c8683a", hi: "#ea965e" }, inner: { line: "#0d090b", deep: "#1a1316", shade: "#2b2126", base: "#3c3036", hi: "#5a4a50" }, gold: { line: "#5a3f10", deep: "#8a6420", shade: "#b88a30", base: "#dcb24e", hi: "#fbe48c" }, jade: { line: "#0a4a3a", deep: "#108a6a", shade: "#18ad88", base: "#25c9a0", hi: "#7ff0cf" }, eye: { line: "#8a4a2a", deep: "#b86a3a", shade: "#d88650", base: "#e8a066", hi: "#f6c690" }, pants: { line: "#0c0809", deep: "#17100f", shade: "#271d1e", base: "#3b2d2c", hi: "#5f4c4a" } }, huyet_anh_y: { cloth: { line: "#1c050a", deep: "#3b0913", shade: "#62101d", base: "#8c1a2a", hi: "#c23844" }, trim: { line: "#060508", deep: "#0e0b11", shade: "#19141d", base: "#252029", hi: "#3c3343" }, accent: { line: "#3a0610", deep: "#6d0c19", shade: "#a3162a", base: "#d8303f", hi: "#ff6f6a" }, ash: { line: "#2e282c", deep: "#5d5057", base: "#8f8088", hi: "#c9babf" }, pants: { line: "#0b070b", deep: "#160f15", shade: "#231820", base: "#32222e", hi: "#493343" } }, tu_quang_y: { cloth: { line: "#1b0e2c", deep: "#2d1a4b", shade: "#482c73", base: "#6843a1", hi: "#9871d4" }, trim: { line: "#3b285c", deep: "#6a4e93", shade: "#9477c1", base: "#bda4e3", hi: "#e9dffb" }, accent: { line: "#584a6e", deep: "#9a8db0", shade: "#c6bcd9", base: "#ebe5f4", hi: "#ffffff" }, paper: { line: "#6a4712", deep: "#a57826", shade: "#c99c3a", base: "#e6c65c", hi: "#f8e8a4", ink: "#a8261f" }, glow: { deep: "#8e52e0", base: "#c08cff", hi: "#f0e0ff" }, pants: { line: "#130b1e", deep: "#221631", shade: "#352549", base: "#4a3862", hi: "#6b5788" } }, thanh_lam_dao_bao: { cloth: { line: "#061827", deep: "#0b2d43", shade: "#124b66", base: "#176a88", hi: "#2d91ad", spark: "#63bfd3" }, trim: { line: "#6c4b16", deep: "#9a6e20", shade: "#c4932e", base: "#dfb64b", hi: "#f7dc82", spark: "#fff6d0" }, pants: { line: "#36444d", deep: "#637781", shade: "#91a7ae", base: "#dbe4e6", hi: "#f9fbf8" }, band: { line: "#030a12", deep: "#081a2a", shade: "#0e2a40", base: "#153955", hi: "#22506f" }, sash: { line: "#0a1636", deep: "#14275a", shade: "#1f3d82", base: "#2d56a8", hi: "#4c7fd0" }, jade: { deep: "#2a7d63", base: "#53bf95", hi: "#a6ecc9" }, red: { deep: "#6e1a1a", base: "#b8352c", hi: "#ea6a52" } }, bach_nguyet_hong_lien: { cloth: { line: "#3b3c47", deep: "#686a78", shade: "#a4a7b2", base: "#d6d7dc", hi: "#fffdf6" }, trim: { line: "#5a1725", deep: "#811f31", shade: "#b02d3b", base: "#d83c4d", hi: "#ff8a80" }, pants: { line: "#3d3d48", deep: "#70717c", shade: "#a8aab2", base: "#e1e1e3", hi: "#fffef8" } }, van_lo_lao_ma_bao: { cloth: { line: "#40352b", deep: "#827465", shade: "#b9aa91", base: "#e5dbc6", hi: "#fff5df" }, trim: { line: "#4a1826", deep: "#6b2033", shade: "#913346", base: "#b34b57", hi: "#e48a78" }, pants: { line: "#211e20", deep: "#302c31", shade: "#49414a", base: "#625762", hi: "#97877f" }, accent: { line: "#5b3a18", deep: "#8a5d1d", shade: "#b27b27", base: "#d2a04a", hi: "#ffe09a" } }, man_ho_tu_bao: { cloth: { line: "#081126", deep: "#102247", shade: "#183b72", base: "#2854ad", hi: "#6d91e4", spark: "#a7bff2" }, trim: { line: "#493015", deep: "#7a4b16", shade: "#ae7420", base: "#d49b35", hi: "#ffe08a", spark: "#fff6dc" }, pants: { line: "#090d16", deep: "#131a29", shade: "#242e43", base: "#37465d", hi: "#61738c" }, accent: { line: "#21170d", deep: "#5a3813", shade: "#95621b", base: "#c79237", hi: "#f7d477" } }, ma_vuong_bao: { cloth: { line: "#0d0916", deep: "#1a1028", shade: "#2b1748", base: "#4a2475", hi: "#7647a9" }, trim: { line: "#4b2d0c", deep: "#815016", shade: "#b7751f", base: "#dda63a", hi: "#ffe58a" }, pants: { line: "#08070e", deep: "#15101f", shade: "#261832", base: "#382347", hi: "#62436e" }, accent: { line: "#230b37", deep: "#431260", shade: "#6f2395", base: "#9e3fc5", hi: "#d66cf5", spark: "#f6c8ff" }, metal: { line: "#0c0a12", deep: "#2a2638", shade: "#4a4560", base: "#6e6888", hi: "#b4aecb" } }, xich_ma_y: { rock: { line: "#0b0911", deep: "#1a1722", shade: "#2b2735", base: "#413b50", hi: "#6a6283", spark: "#9a92b4" }, lava: { line: "#6a1404", deep: "#b8300c", shade: "#e04e10", base: "#ff7a1c", hi: "#ffbf55", spark: "#fff1b0" }, cloth: { line: "#10030a", deep: "#2a0a15", shade: "#4a1224", base: "#6e1d33", hi: "#9a3149" }, bone: { line: "#2b2218", deep: "#6e604b", shade: "#aa9c82", base: "#e8dfc7", hi: "#fffaea" }, metal: { line: "#161922", deep: "#454b5c", shade: "#7c8497", base: "#bcc5d6", hi: "#f4f8ff" } }, dai_phu_bao: { cloth: { line: "#58606c", deep: "#9aa2ab", shade: "#c8ced3", base: "#eceeec", hi: "#ffffff" }, trim: { line: "#0b0f1a", deep: "#141b2d", shade: "#222c44", base: "#303c58", hi: "#4a5a7c" }, pants: { line: "#1a1f2a", deep: "#2c3340", shade: "#444c5a", base: "#5d6573", hi: "#8a93a0" }, accent: { line: "#5b3f12", deep: "#8a6420", shade: "#b88b32", base: "#d9ad4f", hi: "#f6dc8e" } }, bach_kim_an_dien_bao: { cloth: { line: "#403b42", deep: "#77727a", shade: "#aaa7a5", base: "#e5e1da", hi: "#fffaf0", mid: "#cbc6c4" }, trim: { line: "#6b4718", deep: "#9b6a1e", shade: "#c99a3a", base: "#e0b957", hi: "#fff0a3" }, pants: { line: "#433d3a", deep: "#615850", shade: "#897b6d", base: "#b4a38e", hi: "#e1d3bc" }, accent: { line: "#2e1219", deep: "#5e1a25", shade: "#8c2931", base: "#ac3a35", hi: "#e8745e" } }, nam_y_bao: { cloth: { line: "#210812", deep: "#3b0b18", shade: "#6f1325", base: "#9d1f32", hi: "#d94a50" }, trim: { line: "#6f3d0c", deep: "#a66a17", shade: "#c88b26", base: "#e3ae42", hi: "#ffe39a" }, pants: { line: "#111018", deep: "#1c1a24", shade: "#302a38", base: "#473b4a", hi: "#756379" }, accent: { line: "#42101b", deep: "#721629", shade: "#a32635", base: "#d13d46", hi: "#ff7b68" } }, tho_ren_moi: { cloth: { line: "#1c1512", deep: "#2e2420", shade: "#463a33", base: "#62524a", hi: "#85746a" }, trim: { line: "#5a1c08", deep: "#9a3a10", shade: "#d1621c", base: "#f08a2c", hi: "#ffd070" }, accent: { line: "#2a1a10", deep: "#47291a", shade: "#6e4529", base: "#93602f", hi: "#bf8a50" }, pants: { line: "#14141a", deep: "#232329", shade: "#383840", base: "#4f4f58", hi: "#74747e" } }, huan_su_bao: { cloth: { line: "#3d0b0e", deep: "#7a1519", shade: "#b2272a", base: "#dd3b35", hi: "#f77a68" }, trim: { line: "#6b4a3a", deep: "#b79c8b", shade: "#d9c0b5", base: "#f2dcd4", hi: "#fff4ee" }, accent: { line: "#4a2d0b", deep: "#805016", shade: "#b57b22", base: "#d7a23b", hi: "#ffe08a" }, pants: { line: "#0d0d12", deep: "#1a1a22", shade: "#2c2c38", base: "#40404f", hi: "#62627a" } }, npc_long_bao: { cloth: { line: "#071226", deep: "#0d2144", shade: "#173c78", base: "#234f9d", hi: "#3c73c6" }, trim: { line: "#4a2d0b", deep: "#805016", shade: "#b57b22", base: "#d7a23b", hi: "#ffe08a" }, pants: { line: "#080d19", deep: "#111b31", shade: "#1d2b49", base: "#2b3d63", hi: "#4b6592" }, accent: { line: "#17233c", deep: "#243c69", shade: "#355b9f", base: "#4b7ac7", hi: "#82b2f2" } } };
  var x = s.EYES = { brown: { name: "Nâu trà", iris: "#71513e", deep: "#352a2b", hi: "#ac8155" }, blue: { name: "Lam ngọc", iris: "#416c8e", deep: "#26344b", hi: "#80bdce" }, green: { name: "Bích ngọc", iris: "#477766", deep: "#293b39", hi: "#9cbe85" }, kim_dong: { name: "Kim Đồng", note: "Đồng tử vàng kim của người luyện thể, thần thú huyết mạch.", iris: "#d39a2c", deep: "#6e4210", hi: "#ffe08a" }, huyet_dong: { name: "Huyết Đồng", note: "Mắt đỏ máu của ma tu, sát khí lộ ra nơi đáy mắt.", iris: "#b52630", deep: "#4b0a13", hi: "#ff7a6a" }, tu_dong: { name: "Tử Đồng", note: "Đồng tử tím huyền, người tu huyễn thuật và tinh tượng.", iris: "#7b4fc2", deep: "#33195c", hi: "#cfa6ff" }, bang_dong: { name: "Băng Đồng", note: "Mắt lam băng nhạt, hàn khí của người tu băng đạo.", iris: "#7fcbe6", deep: "#2c6a8c", hi: "#eafcff" }, yeu_dong: { name: "Yêu Đồng", note: "Tròng vàng lục, đồng tử dọc như yêu thú.", iris: "#c9b23c", deep: "#5d5214", hi: "#f4e88a", slit: "#140f0a" }, nhat_nguyet: { name: "Nhật Nguyệt Đồng", note: "Mắt trái kim nhật, mắt phải ngân nguyệt — âm dương song đồng.", iris: "#d39a2c", deep: "#6e4210", hi: "#ffe08a", pair: [{ iris: "#d39a2c", deep: "#6e4210", hi: "#ffe08a" }, { iris: "#9fb6d8", deep: "#3d5276", hi: "#f1f6ff" }] }, xich_ma: { name: "Xích Ma", note: "Mắt cam rực của ma thần.", iris: "#ff6a22", deep: "#a82a08", hi: "#ffc060", slit: "#fff0b0" }, kim_cuong: { name: "Kim Cương", note: "Mắt kim quang của thân thể cường hoá.", iris: "#fff2a8", deep: "#d99a1c", hi: "#ffffff", glow: { core: "#ffffff", mid: "#fff6c4", rim: "#ffd24a", halo: "#ffd860", far: "#e6a830" } } };
  var D = s.SHOES = { ink: { line: "#171d29", deep: "#263142", shade: "#3f5060", base: "#627586", hi: "#99a7b0" }, cloth: { line: "#454548", deep: "#646362", shade: "#93908a", base: "#bfbbad", hi: "#e5dfc9" } };
  var W = "undefined" != typeof WeakMap ? new WeakMap : null;
  function J(e, s, o) {
    var n = i(e, o);
    var O = 0 | s.bob;
    var t = g[o.outfit] || G;
    if (o.kimHoa && S.Palette && S.Palette.mixHex) {
      t = function (e) {
        var a = W && W.get(e);
        if (a) {
          return a;
        }
        var s;
        var o;
        var i;
        var B = S.Palette.mixHex;
        var n = {};
        for (s in e)
          (o = e[s]) && "object" == typeof o && o.base && o.hi ? (i = "trim" === s || "accent" === s || "metal" === s || "leather" === s, n[s] = { line: o.line, deep: o.deep, shade: i ? B(o.shade, "#b88418", .45) : o.shade, base: B(o.base, "#e0b03a", i ? .55 : .06), hi: B(o.hi, "#fff0a0", i ? .7 : .4) }) : n[s] = o;
        if (W) {
          W.set(e, n);
        }
        return n;
      }(t);
    }
    return { g: n, p: s, cfg: o, dir: e, dy: O, material: t, head: { x: n.head.x, y: a.HEAD_Y + O, w: n.head.w, h: a.HEAD_H }, neck: { x: n.neck.x, y: a.NECK_Y + O, w: n.neck.w }, torso: { x: n.torso.x, y: a.TORSO_Y + O, w: n.torso.w, h: a.TORSO_H }, arms: b(e, n, s, O), legs: B(n, s, O) };
  }
  function u(S, a, s) {
    var o;
    var i;
    var B;
    var n;
    var O;
    var t = 1 / 0;
    var h = -1 / 0;
    for (o = 0; o < a.length; o++)
      t = Math.min(t, a[o][1]), h = Math.max(h, a[o][1]);
    for (B = Math.ceil(t); B <= Math.floor(h); B++) {
      for (n = [], o = 0, i = a.length - 1; o < a.length; i = o++) {
        var r = a[i];
        var d = a[o];
        if ((r[1] <= B && d[1] > B || d[1] <= B && r[1] > B)) {
          n.push(r[0] + (B - r[1]) * (d[0] - r[0]) / (d[1] - r[1]));
        }
      }
      for (n.sort(function (S, e) {
        return S - e;
      }), o = 0; o + 1 < n.length; o += 2)
        O = Math.ceil(n[o]), e.r(S, O, B, Math.floor(n[o + 1]) - O + 1, 1, s);
    }
  }
  function M(S, a, s, o, i, B) {
    e.r(S, a, s, o, i, B.base);
    e.r(S, a, s, 1, i, B.line);
    e.r(S, a + 1, s + 1, 1, i - 2, B.shade);
    e.r(S, a + 2, s, o - 3, 1, B.hi);
    e.r(S, a + o - 1, s + 1, 1, i - 2, B.hi);
    e.r(S, a, s + i - 1, o, 1, B.deep || B.shade);
  }
  function w(S) {
    return S.diag ? { x: S.x0, y: S.y0 } : { x: S.x + 1, y: S.y + 1 };
  }
  function N(S, a, s, o, i) {
    e.fatLine(S, a.x, a.y, s.x, s.y, 3, i ? o.shade : o.base);
    e.line(S, a.x - 1, a.y, s.x - 1, s.y, o.deep);
    e.line(S, a.x + 1, a.y, s.x + 1, s.y, i ? o.base : o.hi);
  }
  function p(S, a, s, o) {
    var i = w(a);
    var B = h(a);
    if (a.bent) {
      var n = { x: a.jx, y: a.jy };
      N(S, i, n, s, o);
      N(S, n, B, s, o);
      e.blk(S, n.x - 1, n.y - 1, 3, 3, o ? s.shade : s.base, s.deep);
    }
    else {
      N(S, i, B, s, o);
    }
    !function (S, a, s, o) {
      var i = h(a);
      var B = a.palm ? 4 : 3;
      M(S, i.x - 1, i.y - 1, B, 3, s);
      e.dot(S, i.x - 1, i.y + 1, o ? s.deep : s.shade);
    }(S, a, s, o);
  }
  function k(S, e, a) {
    for (var s = ["line", "deep", "shade", "base", "hi", "spark"], o = 0; o < e.length; o++) {
      var i = e.charAt(o);
      if ("." !== i && a[s[o]]) {
        S[i] = a[s[o]];
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
  function v(S, a, s, o) {
    var i = Fi(a, s);
    var B = i.far;
    var n = i.Q;
    var O = o.C;
    var t = o.B;
    var h = o.T;
    var r = o.W;
    var d = Math.max(7, i.len);
    var l = d + 2.2;
    var f = o.ko || 7.6;
    var c = Math.max(3, d - (null == o.up ? 3.6 : o.up));
    function b(S) {
      return [Math.round(S[0]), Math.round(S[1])];
    }
    function G(a, s, o, i, B) {
      var O = b(n(a, s));
      var t = b(n(o, i));
      e.line(S, O[0], O[1], t[0], t[1], B);
    }
    function H(a, s, o) {
      var i = b(n(a, s));
      e.dot(S, i[0], i[1], o);
    }
    u(S, [n(-1, -2.6), n(d - 1.5, -2.9), n(d - .6, -1.6), n(d - .6, 1.4), n(l, 2.2), n(l - .6, 3.8), n(c, f), n(c - 1.4, f), n(.35 * d, .58 * f), n(-1, 2.9)], O.line);
    u(S, [n(0, -1.6), n(d - 2.2, -2), n(d - 1.5, -.8), n(d - 1.4, 1.6), n(l - 1.6, 2.4), n(c - .6, f - 1.2), n(c - 1.6, f - 1), n(.35 * d, .58 * f - 1), n(0, 1.9)], B ? O.shade : O.base);
    if (!1 !== o.fold) {
      G(0, 1.2, .35 * d, .58 * f - 1.2, B ? O.base : O.hi);
      G(.4 * d, .58 * f - .6, c - 1.6, f - 1.4, B ? O.base : O.hi);
      G(1.5, -.6, d - 2.6, 0, B ? O.deep : O.shade);
      G(2, 1.4, d - 1.8, .5 * f, B ? O.deep : O.shade);
      G(1, -1.4, d - 2.4, -1.8, B ? O.shade : O.deep);
      if (O.spark && !B) {
        H(1, .4, O.spark);
        H(.4 * d, .58 * f - .9, O.spark);
      }
    }
    if (t) {
      G(l - .4, 2.4, c + .5, f - .4, B ? t.deep : t.base);
      if (2 === o.band) {
        G(l - 1.1, 2.1, c - .3, f - .9, B ? t.line : t.deep);
      }
    }
    if (h) {
      G(l - (2 === o.band ? 1.9 : 1.2), 2, c - (2 === o.band ? 1.1 : .4), f - (2 === o.band ? 1.5 : .8), B ? h.shade : h.base);
    }
    if (h && !B) {
      H(c - .2, f - .5, h.hi);
    }
    if (r) {
      G(d - 1.2, -1.4, d - 1.2, 1.2, B ? r.shade : r.base);
    }
    if (r && !B) {
      H(d - 1.2, -1.4, r.hi);
    }
    return { Q: n, L: d, lo: l, ko: f, b: c, far: B, ln: G, dt: H };
  }
  function y(S, a, s, o) {
    var i = Fi(a, s);
    var B = i.far;
    var n = i.Q;
    var O = o.C;
    var t = o.B;
    var h = o.T;
    var r = Math.max(5, i.len);
    var d = r - .6;
    var l = Math.max(2.4, .5 * r);
    function f(S) {
      return [Math.round(S[0]), Math.round(S[1])];
    }
    function c(a, s, o, i, B) {
      var O = f(n(a, s));
      var t = f(n(o, i));
      e.line(S, O[0], O[1], t[0], t[1], B);
    }
    u(S, [n(-1, -2.6), n(d, -2.2), n(d, 2.4), n(.45 * r, 3.3), n(-1, 2.9)], O.line);
    u(S, [n(0, -1.7), n(d - .8, -1.3), n(d - .8, 1.5), n(.45 * r, 2.4), n(0, 2)], B ? O.shade : O.base);
    c(0, -.7, l - 1, -.5, B ? O.base : O.hi);
    c(.5, 1.2, l - 1, 1.4, B ? O.deep : O.shade);
    if (t) {
      u(S, [n(l, -2.2), n(d, -2.2), n(d, 2.3), n(l, 2.5)], t.line);
      u(S, [n(l + .7, -1.4), n(d - .7, -1.4), n(d - .7, 1.5), n(l + .7, 1.7)], B ? t.shade : t.base);
      c(l + .7, -.9, d - .9, -.9, B ? t.base : t.hi);
      if (h) {
        c(l, -1.8, l, 2.1, B ? h.deep : h.base);
        c(d - .2, -1.8, d - .2, 2, B ? h.deep : h.shade);
      }
    }
  }
  s.rigPose = J;
  s.drawHandBlock = function (S, a, s, o, i) {
    M(S, a - 1, s - 1, 3, 3, o);
    e.dot(S, a - 1, s + 1, i ? o.deep : o.shade);
  };
  var L = ["...KE....EK...", ".xjJKE..EKJjx.", "xjiiJKEEKJJjXx", "xjiJJjEKiJJjXx", "xjJJjEKiJJJjXx", "xjJjEKiJJJJjXx", "xjjEKiJJJJJjXx", "xjEKiJJJJJjjXx", "xEKiJJJJJJjJXx", "xKiJJJJJJjJJXx", "xKJJJiJJjJJjXx", "xKjJiJJjJJiJXx", "xKJjJiJjJiJjXx", "xKjJjJjJjJjJXx", "zZUwUnGGnUwUZz", "zuUUUGYyGUUUuz", "zZuuunggnuuuZz"];
  var C = ["..xjiJJKKJJjXx..", "..xjiJKqcKJjXx..", "..xjiJKqcKJjXx..", "..xjiJKqcKJjXx..", "..xjiJKqcKJjXx..", "..xjiJKqcKJjXx..", "..xjiJKqcKJjXx..", "..xjiJKqcKJjXx..", ".xjJiJKceKJJjXx.", ".xjJijKceKJjJXx.", ".xjiJjKceKJjJXx.", ".xjiJjKceKJJjXx.", ".xjJiJKceKJJjXx.", "xjJiJJKceKJJJjXx", "xjllJJKceKJJllXx", "xlJilJKceKJlJilx", "xjlljJKceKJjlljx", "NgGGYGKceKGYGGgN", "kmMMvMKqeKMvMMmk", ".kkkkkkQQkkkkkk."];
  var j = ["zUw", "zUw", "zuU", "zUw", "zuU", ".zU", ".nG", ".GY", ".RH", ".rR", ".Rr", "..r"];
  var A = ["n", "G", "U", "u", "a", "A", "h", "a", "R", "r", "R", "r"];
  var Q = [".....xjiJJKKJJjXx.....", "....xjiJJKceKJJjXx....", "...xjiJJJKceKJJJjXx...", "..xjiJJiJKceKJJJjjXx..", ".xjiJJJiJKceKJiJJjjXx.", "xjiJJJJiJKceKJJiJJjjXx", "xjJiJJJJJKceKJJJiJjjXx", "xjllJJJJJKceKJJJJllJXx", "xlJilJJJJKceKJJJlJilXx", "xjlljJJJJKceKJJJjllJjx", "NgGGYGGGGKceKGGGGYGGgN", "kmMMvMMMMKqeKMMMMvMMmk", ".kkkkkkkkkQQkkkkkkkkk."];
  var _ = [".....xjiJJjJJJjXx.....", "....xjiJJJjJJJJjXx....", "...xjiJJJJjJJJJJjXx...", "..xjiJJiJJjJJJJJjjXx..", ".xjiJJJiJJjJJJiJJjjXx.", "xjiJJJJiJJjJJJJiJJjjXx", "xjJiJJJJJJjJJJJJiJjjXx", "xjllJJJJJJjJJJJJJllJXx", "xlJilJJJJJjJJJJJlJilXx", "xjlljJJJJJjJJJJJjllJjx", "NgGGYGGGGGgGGGGGGYGGgN", "kmMMvMMMMMmMMMMMMvMMmk", ".kkkkkkkkkkkkkkkkkkkk."];
  var Y = ["...xjiJJJJJKc.....", "..xjiJJJJJJKc.....", "..xjiJJJJJJJKc....", ".xjiJJJJJJJJJKc...", ".xjiJJJJJiJJJJKc..", "xjiJJJJJJJiJJJJKc.", "xjJiJJJJJJJiJJJJKc", "xjJJiJJJJJJJJJJjKc", "xjllJJJJJJJJJllJKc", "xlJilJJJJJJJlJilKc", "NgGGYGGGGGGGGYGgKq", "kmMMvMMMMMMMMvMmKq", ".kkkkkkkkkkkkkkkkQ"];
  var E = ["...KEEEEEEK...", ".xjKKmMMmKKjx.", "xjiJJJJJJJJjXx", "xjiiJJJJJiJjXx", "xjiJjJJJjJJjXx", "xjJJJjJjJJJjXx", "xjiJJJJJJJJjXx", "xjiJJJJJJJJjXx", "xjiJJJJJJJJjXx", "xjiJJJJJJJJjXx", "xjiJJJJJJJJjXx", "xjiJJJjJJJJjXx", "xjJiJJjJJiJjXx", "xjjJjJjJjJjJXx", "zZUwUUUUUUwUZz", "zuUUUUUUUUUUuz", "zZuuuuuuuuuuZz"];
  var K = ["..nGGn..", ".GEEkkg.", "GEEkkkkn", "GEEkEkkn", "GEEEkkkn", "GEkEEkkn", ".gEEkkn.", "..nnnn.."];
  var q = ["..xjiJJjJJJjXx..", "..xjiJJjJJJjXx..", "..xjiJJjJJJjXx..", "..xjiJJjJJJjXx..", "..xjiJJjJJJjXx..", "..xjiJJjJJJjXx..", "..xjiJJjJJJjXx..", "..xjiJJjJJJjXx..", ".xjJiJJjJJJJjXx.", ".xjiJjJjJiJJjXx.", ".xjiJjJjJiJjJXx.", ".xjJiJJjJJiJjXx.", ".xjJiJJjJJJJjXx.", "xjJiJJJjJJJJJjXx", "xjllJJJjJJJJllXx", "xlJilJJjJJJlJilx", "xjlljJJjJJJjlljx", "NgGGYGGgGGYGGgGN", "kmMMvMMmMMvMMvmk", ".kkkkkkkkkkkkkk."];
  var U = ["....KE..EK..", "...xKEEEKJx.", "..xjiKKKJJix", "..xjiJJJKJix", "..xjiJJJJKJx", "..xjJiJJJKJx", "..xjJiJJJJKx", "..xjJiJJJJJx", "..xjiJJJJJJx", "..xjiJJJJjJx", "..xjiJJJjJJx", "..xjJiJjJJJx", "..xjjJjJJiJx", "..xjJjJjJjJx", "..zZUwUUnGGn", "..zuUUUUGYyG", "..zZuuuunggn"];
  var X = ["..xjiJJJJJJKq.", "..xjiJJJJJJKc.", "..xjiJJJJJJKc.", "..xjiJJJJJJKc.", "..xjiJJJJJJKc.", "..xjiJJJJJJKc.", "..xjiJJJJJJKc.", "..xjiJJJJJJKc.", ".xjJiJJJJJJKc.", ".xjJijJJJJJKc.", ".xjiJjJJiJJKc.", ".xjiJJjJiJJKc.", ".xjJiJJjJJJKc.", "xjJiJJJJJJJKc.", "xjllJJJJJllKc.", "xlJilJJJlJiKc.", "xjlljJJJjllKc.", "NgGGYGGGGYGKq.", "kmMMvMMMMvmKq.", ".kkkkkkkkkkkQ."];
  function R(S, e) {
    return S.p.sit ? 57 : Math.min(57, e.foot - 4);
  }
  function V(S, e, a) {
    var s = e.material;
    var o = s.cloth.spark;
    var i = s.cloth.hi;
    var B = v(S, e, a, { C: s.cloth, B: s.band, T: s.trim, W: s.pants, band: 2, ko: 7.2, up: 3.4 });
    if (!(B.far)) {
      B.dt(B.b - 2.2, B.ko - 3.4, o);
      B.dt(B.b - 1.4, B.ko - 4, o);
      B.dt(B.b - .6, B.ko - 3.4, i);
      B.dt(B.b - 1.4, B.ko - 2.6, i);
      B.dt(B.b - 3, B.ko - 2.8, i);
    }
  }
  function z(S) {
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
  var T = ["..oWSSdcCdSSso..", "..oWSSdcCdSSso..", "..oWSSdcCdSSso..", "..oWSSdcCdSSso..", "..oWSSdcCdSSso..", "..oWSSdcCdSSso..", "..oWSSdcCdSSso..", "..oWSSdcCdSSso..", ".oWSSSdcCdSSSso.", ".oWSsSdcCdSsSso.", ".oWSSsdcCdsSSso.", "oWSSSsdcCdsSSSso", "oWShSsdcCdsShSso", "oWhDhSdcCdShDhso", "oWShrSdcCdSrhSso", "oWSSSsdcCdsSSSso", "oWSSSSdcCdSSSSso", "RDDHDDDcCDDDHDDR", "rwWwWwrPPrwWwWwr", ".ooooooppoooooo."];
  var P = ["rD.", "rD.", "RD.", "Dh.", "rD.", "rD.", "RD.", "RD.", "Dh.", "rD.", "rD.", "RD.", "RD.", "Dh.", "rD.", "rD.", "rDd", "r.D", "r.."];
  var Z = ["...rDDDDDDr...", ".oSrDDDDDDrSo.", "oSWrRRRRRRrSso", "oSWSSSSSSSSsso", "oSWSSSSSSSSsso", "oSWSSSmMMSSsso", "oSWSSmMSSSSsso", "oSWSSmMSSSSsso", "oSWSSSmMMSSsso", ".oWSSSSSSSSso.", ".oWSSSSsSSSso.", ".oWSsSSsSSsso.", ".rRRRRRRRRRRr.", ".rRDDDDDDDDRr.", ".rRRRRRRRRRRr.", ".oWSSSSSSSSso.", "..oWSSSSSSso.."];
  var I = ["..oWSSSsSSSSso..", "..oWSSSsSSSSso..", "..oWSSSsSSSSso..", "..oWSSSsSSSSso..", "..oWSSSsSSSSso..", "..oWSSSsSSSSso..", "..oWSSSsSSSSso..", "..oWSSSsSSSSso..", ".oWSSSSsSSSSSso.", ".oWSsSSsSSSsSso.", ".oWSSsSsSSsSSso.", "oWSSSsSSsSSSsSso", "oWShSsSSsSSsShso", "oWhDhSSSsSSShDho", "oWShrSSSsSSSrhSo", "oWSSSsSSsSSSsSso", "oWSSSSSSsSSSSSso", "RDDHDDDDDDDDHDDR", "rwWwWwWwWwWwWwWr", ".oooooooooooooo."];
  var $ = ["....rD..Dr..", "..oSrD.DrSo.", "..oSWrDCWDro", "..oSWSrDCDro", "..oSWSSrDrSo", "..oSWSSSrSSo", "..oSWSSSSSSo", "..oSWSsSSSSo", "..oSWSSsSSso", "..oWSSSSSSso", "..oWSSSSShHo", "..oWSSShDhhD", "..rRRRRDdDDd", "..rRDDDDHHHD", "..rRRRRrDDrR", "..oWSSSrSSro", "..oWSSSSSSso"];
  var SS = ["...oWSSSSSdcC..", "...oWSSSSSdcC..", "...oWSSSSSdcC..", "...oWSSSSSdcC..", "...oWSSSSSdcC..", "...oWSSSSSdcC..", "...oWSSSSSdcC..", "...oWSSSSSdcC..", "..oWSSSSSSdcCo.", "..oWSsSSSSdcCo.", "..oWSSsSSSdcCo.", ".oWSSSsSSSdccCo", ".oWShSsSSSdcCCo", ".oWhDhSsSSdcCco", ".oWShrSSSSdcCCo", ".oWSSSsSSSdccCo", ".oWSSSSSSSdcCCo", ".RDDHDDDDDDcCcR", ".rwWwWwWwWrPPPr", "..oooooooooppo."];
  var eS = [".....oWSSdcCdSSso.....", "....oWSSSdcCdSSSso....", "...oWSSSSdcCdSSSSso...", "..oWSSsSSdcCdSSsSSso..", ".oWSSSsSSdcCdSSsSSSso.", "oWShSSsSSdcCdSSsSShSso", "oWhDhSSSSdcCdSSSShDhso", "oWShrSSSSdcCdSSSSrhSso", "oWSSSSSsSdcCdSsSSSSSso", "RDDHDDDDDDcCDDDDDDHDDR", "rwWwWwWwWrPPrwWwWwWwWr", ".oooooooooppoooooooooo"];
  var aS = [".....oWSSSsSSSSso.....", "....oWSSSSsSSSSSso....", "...oWSSSSSsSSSSSSso...", "..oWSSsSSSsSSSSsSSso..", ".oWSSSsSSSsSSSSsSSSso.", "oWShSSsSSSsSSSSsSShSso", "oWhDhSSSSSsSSSSSShDhso", "oWShrSSSSSsSSSSSSrhSso", "oWSSSSSsSSsSSSsSSSSSso", "RDDHDDDDDDDDDDDDDDHDDR", "rwWwWwWwWwWwWwWwWwWwWr", ".oooooooooooooooooooo."];
  var sS = ["...oWSSSSSdcC.....", "..oWSSSSSSdcCo....", "..oWSSSSSSSdcCo...", ".oWSSsSSSSSSdcCo..", ".oWSSSsSSSSSSdcCo.", "oWShSSsSSSSSSdcCo.", "oWhDhSSSSSSSSdcCo.", "oWShrSSSSSSSSdccCo", "oWSSSSSsSSSSSdcCCo", "RDDHDDDDDDDDDDcCcR", "rwWwWwWwWwWwWrPPPr", ".ooooooooooooopppo"];
  function oS(S, e, a) {
    var s = e.material;
    var o = s.cloth;
    v(S, e, a, { C: { line: o.line, deep: o.shade, shade: "#c3c5cd", base: o.base, hi: o.hi, spark: "#ffffff" }, B: { line: o.shade, deep: "#e9e9ee", shade: o.base, base: "#ffffff", hi: "#ffffff" }, T: s.trim, band: 2, ko: 7, up: 3.2 });
  }
  function iS(S, e) {
    return S.p.sit ? 57 : Math.min(57, e.foot - 4);
  }
  function BS(S, a, s) {
    var o = a.arms[s];
    var i = w(o);
    var B = h(o);
    var n = a.material.cloth;
    var O = a.material.trim;
    var t = a.material.accent || O;
    var r = a.material.pants;
    var d = B.x - i.x;
    var l = B.y - i.y;
    var f = Math.sqrt(d * d + l * l) || 1;
    var c = d / f;
    var b = l / f;
    var G = -b;
    var H = c;
    var g = 0 === s && !o.front;
    var x = a.g.side || a.g.back ? 3 : 4;
    var D = B.x - c * x;
    var W = B.y - b * x;
    var J = g ? n.shade : n.base;
    u(S, [[i.x + 2 * G, i.y + 2 * H], [i.x - 2 * G, i.y - 2 * H], [D - 5 * G, W - 5 * H], [D + 5 * G, W + 5 * H]], J);
    u(S, [[i.x - 2 * G, i.y - 2 * H], [D - 5 * G, W - 5 * H], [D - 3 * G, W - 3 * H], [i.x - G, i.y - H]], r.line);
    e.fatLine(S, i.x + 2 * c, i.y + 2 * b, Math.round(D - c), Math.round(W - b), 2, g ? n.deep : n.hi);
    e.line(S, Math.round(i.x + 5 * c), Math.round(i.y + 5 * b), Math.round(D - 2), Math.round(W - 2), n.shade);
    for (var M = 2; M >= 0; M--) {
      var N = 3 + 2 * M;
      var p = 3 + M;
      u(S, [[i.x + 2 * G - c, i.y + 2 * H - b], [i.x - 2 * G - c, i.y - 2 * H - b], [i.x + c * N - G * p, i.y + b * N - H * p], [i.x + c * (N + 1), i.y + b * (N + 1)], [i.x + c * N + G * p, i.y + b * N + H * p]], g ? n.base : n.hi);
      e.line(S, Math.round(i.x + c * N - G * p), Math.round(i.y + b * N - H * p), Math.round(i.x + c * (N + 1)), Math.round(i.y + b * (N + 1)), t.deep);
      e.line(S, Math.round(i.x + c * (N + 1)), Math.round(i.y + b * (N + 1)), Math.round(i.x + c * N + G * p), Math.round(i.y + b * N + H * p), t.base);
    }
    e.fatLine(S, Math.round(D - 5 * G), Math.round(W - 5 * H), Math.round(D + 5 * G), Math.round(W + 5 * H), 2, g ? n.shade : n.hi);
    e.line(S, Math.round(D - 4 * G), Math.round(W - 4 * H), Math.round(D + 4 * G), Math.round(W + 4 * H), t.base);
    e.line(S, Math.round(D - 2 * G - 2 * c), Math.round(W - 2 * H - 2 * b), Math.round(D + 2 * G - 2 * c), Math.round(W + 2 * H - 2 * b), O.deep);
    e.dot(S, Math.round(D - 5 * G), Math.round(W - 5 * H), t.hi);
    e.dot(S, Math.round(D + 5 * G), Math.round(W + 5 * H), t.line);
  }
  function nS(S) {
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
  var lS = [".....xJJx.....", "...bSxjJJx....", ".bsSSHGNnnN...", ".bsSHSGgYYYg..", ".bsSHSGgGGGGg.", ".bsSSHGnggggn.", ".bsSHSGgYYYYg.", ".bsSHSGgGGyGg.", ".bsSSHGnggggn.", ".bsSHSGgYYYYg.", ".bsSHSGnGGGGn.", ".bsSHSGgYYYYg.", ".bsSHsGnggggn.", ".NgGYGGGGGNnN.", ".NGYGGGGGNGWk.", ".NnggggggNgGG.", "..NNNNNNNNNgN."];
  var fS = ["...bSSHSSSSSb....", "...bSHSSSSSSb....", "..bsSHSSSSSSb....", "..bsSHSSSSSSb....", ".bsSSHSSSSSSb....", ".bsSSHSSSSSSb....", ".bsSHSSSSSSSsb...", "bsSSHSSSSSSSsb...", "bsSHSSSSSSSSsb...", "bsSHSSSSSSSSSsb..", "bsSSHSSSSSSSSsb..", "bsSHSSSSSSSSSsb..", "NnGGYGGGGGGYGGnN.", "NGYGGnGGNGGYGGN..", ".NnnNNnnNNnnNNN.."];
  var cS = [".n.", ".G.", ".n.", "pPp", "prp", "pPr", "prp", "pPp", ".p."];
  var bS = ["..NNNN..", ".NGYYGN.", "NGYGGGgN", "NkrGGrkN", "NGGnnGgN", "NWgWWgWN", ".NkkkkkN", "..NNNN.."];
  var GS = ["..NNNN..", ".NGYYGN.", "NGYGGGgN", "NgGnGnGN", "NGnGnGgN", "NgGnGngN", ".NnkkknN", "..NNNN.."];
  var HS = [".NNNN...", "NGYYGN..", "NGYGGGNN", "NgGGkrGN", "NGGGGnnN", "NgGgWgWN", ".NkkkkkN", "..NNNN.."];
  function gS(S, e, s) {
    var o = e.material;
    var i = o.cloth;
    v(S, e, s, { C: { line: i.line, deep: i.deep, shade: i.shade, base: i.base, hi: "#4a72cc", spark: i.spark }, B: o.trim, T: o.accent, band: 2, ko: 7.4, up: 3 });
    (function (S, e, s) {
      var o = nS(e);
      if (e.g.side) {
        if (1 !== s) {
          return;
        }
        Na(S, e.g.arms[1].x - 2, a.ARM_Y - 4 + e.dy, HS, o, !1);
      }
      else {
        var i = e.g.back ? GS : bS;
        var B = e.g.arms[s].x + 1;
        var n = a.ARM_Y + e.dy;
        if (1 === s) {
          Na(S, B - 3, n - 4, i, o, !1);
        }
        else {
          Na(S, B + 3, n - 4, i, o, !0);
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
    for (var s = w(a), o = h(a), i = o.x - s.x, B = o.y - s.y, n = Math.sqrt(i * i + B * B) || 1, O = i / n, t = B / n, r = -t, d = O, l = ["#e6dfe8", "#1b1524", "#a49aae"], f = 0; f < 3; f++) {
      var c = o.x - O * (3 + f);
      var b = o.y - t * (3 + f);
      e.line(S, Math.round(c - 1.5 * r), Math.round(b - 1.5 * d), Math.round(c + 1.5 * r), Math.round(b + 1.5 * d), l[f]);
    }
    if (n > 8) {
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
    var o = e.arms[s];
    if (s !== function (S) {
      return S.g.back || S.g.side ? 1 : 0;
    }(e)) {
      var i = e.material;
      var B = i.cloth;
      var n = v(S, e, s, { C: { line: B.line, deep: B.shade, shade: B.shade, base: B.base, hi: B.hi }, B: i.trim, T: i.accent, band: 2, ko: 6.4, up: 3 });
      if (!(n.far)) {
        n.dt(n.b - 1.4, n.ko - 2.2, i.trim.base);
        n.dt(n.b - 2.2, n.ko - 2.8, i.trim.hi);
      }
      (function (S, e, s) {
        var o = xS(e);
        if (e.g.side) {
          Na(S, e.g.arms[s].x - 4, a.ARM_Y - 3 + e.dy, kS, o, !1);
        }
        else {
          var i = e.g.arms[s].x + 1;
          var B = a.ARM_Y + e.dy;
          if (1 === s) {
            Na(S, i - 4, B - 6, pS, o, !1);
          }
          else {
            Na(S, i + 4, B - 6, pS, o, !0);
          }
        }
      })(S, e, s);
    }
    else {
      if ((e.g.side || e.g.back || o.front || o.over)) {
        DS(S, o);
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
  var KS = [".....oWSSGWGGSso......", "....oWSSSGWYgGSso.....", "...oWSSSSGWnGGSSso....", "..oWSSSSSGWYgGSSSso...", ".oWSSSSSSGWnGGSSSsso..", "oWSSSSSSSGWYgGSSSssso.", "oWSSSSSSSGWGnGSSSSsOo.", "oWSnSSSSSGWYgGSSSnSOo.", "oWnYnSSSSGWGnGSSnYnOo.", "oWSnSSSSSGWWSGSSSnsOo.", "NgGYGGGGGGGYGGGGGYGgN.", "NnGgGnGgGnGgGnGgGnGnN.", ".NNNNNNNNNNNNNNNNNNN.."];
  var qS = ["...oWSSSSSGo......", "..oWSSSSSSYGo.....", "..oWSSSSSSSnGo....", ".oWSSSSSSSSSYGo...", ".oWSSSSSSSSSSnGo..", "oWSSSSSSSSSSSSYGo.", "oWSsSSSSSSSSSSSnGo", "oWSSsSSSSSSSSSsYGo", "oWSnSSSSSSSSSnSnGo", "oWnYnSSSSSSSnYnYGo", "NgGYGGGGGGGGGYGGgN", "NnGgGnGgGnGgGnGgnN", ".NNNNNNNNNNNNNNNN."];
  function US(S, e) {
    return S.p.sit ? 57 : Math.min(57, e.foot - 4);
  }
  function XS(S, e, a) {
    var s = e.material;
    var o = s.cloth;
    var i = v(S, e, a, { C: { line: o.line, deep: o.shade, shade: o.mid, base: o.base, hi: o.hi }, B: s.accent, T: s.trim, band: 2, ko: 6.6, up: 3 });
    if (!(i.far)) {
      i.dt(i.b - 1.6, i.ko - 2.4, s.trim.base);
      i.dt(i.b - .8, i.ko - 3, s.trim.hi);
      i.dt(i.b - 2.4, i.ko - 3, s.trim.shade);
    }
  }
  function RS(S, a, s) {
    var o = a.arms[s];
    var i = w(o);
    var B = h(o);
    var n = a.material.cloth;
    var O = a.material.trim;
    var t = B.x - i.x;
    var r = B.y - i.y;
    var d = Math.sqrt(t * t + r * r) || 1;
    var l = t / d;
    var f = r / d;
    var c = -f;
    var b = l;
    var G = 0 === s && !o.front;
    var H = a.g.side || a.g.back || s ? 4 : 5;
    var g = B.x - l * H;
    var x = B.y - f * H;
    var D = G ? n.shade : n.base;
    u(S, [[i.x + 2 * c, i.y + 2 * b], [i.x - 2 * c, i.y - 2 * b], [g - 6 * c, x - 6 * b], [g + 6 * c, x + 6 * b]], D);
    u(S, [[i.x - 2 * c, i.y - 2 * b], [g - 6 * c, x - 6 * b], [g - 4 * c, x - 4 * b], [i.x - c, i.y - b]], G ? n.deep : n.shade);
    e.fatLine(S, i.x + 2 * l, i.y + 2 * f, Math.round(g - l), Math.round(x - f), 2, G ? n.deep : n.hi);
    e.line(S, Math.round(i.x + 5 * l), Math.round(i.y + 5 * f), Math.round(g - 2), Math.round(x - 2), n.shade);
    e.fatLine(S, Math.round(g - 6 * c), Math.round(x - 6 * b), Math.round(g + 6 * c), Math.round(x + 6 * b), 2, G ? O.deep : O.base);
    e.line(S, Math.round(g - 5 * c), Math.round(x - 5 * b), Math.round(g + 5 * c), Math.round(x + 5 * b), O.hi);
  }
  var VS = "#a85a4c";
  var zS = "#3a2a22";
  function FS(S, a, s, o, i, B) {
    u(S, [[a - 2, s + 1], [a + i, s - o], [a + 2, s + 1]], B.base);
    e.line(S, a - 1, s, a + i - 1, s - o + 1, B.shade);
    e.line(S, a + 1, s, a + i + 1, s - o + 2, B.hi);
    e.dot(S, a + i, s - o, B.hi2 || B.hi);
  }
  function TS(S, a, s) {
    var o = a.arms[s];
    var i = w(o);
    var B = h(o);
    var n = a.material.cloth;
    var O = (a.material.trim, a.material.accent);
    var t = B.x - i.x;
    var r = B.y - i.y;
    var d = Math.sqrt(t * t + r * r) || 1;
    var l = t / d;
    var f = r / d;
    var c = -f;
    var b = l;
    var H = 0 === s && !o.front;
    var g = i.x + l * d * .58;
    var x = i.y + f * d * .58;
    var D = 3.5;
    u(S, [[i.x + 2 * c, i.y + 2 * b], [i.x - 2 * c, i.y - 2 * b], [g - c * D, x - b * D], [g + c * D, x + b * D]], H ? n.shade : n.base);
    u(S, [[i.x - 2 * c, i.y - 2 * b], [g - c * D, x - b * D], [g - 1.5 * c, x - 1.5 * b], [i.x - c, i.y - b]], H ? n.deep : n.shade);
    e.fatLine(S, Math.round(i.x + 2 * l), Math.round(i.y + 2 * f), Math.round(g - l), Math.round(x - f), 2, H ? n.shade : n.hi);
    e.fatLine(S, Math.round(g - c * D), Math.round(x - b * D), Math.round(g + c * D), Math.round(x + b * D), 2, H ? n.line : n.deep);
    e.line(S, Math.round(g - 2.5 * c), Math.round(x - 2.5 * b), Math.round(g + 2.5 * c), Math.round(x + 2.5 * b), O.base);
    var W = Math.round(B.x - 3 * l);
    var J = Math.round(B.y - 3 * f);
    e.fatLine(S, Math.round(W - 2 * c), Math.round(J - 2 * b), Math.round(W + 2 * c), Math.round(J + 2 * b), 2, G.leather.deep);
    e.line(S, Math.round(W - 2 * c), Math.round(J - 2 * b), Math.round(W + 2 * c), Math.round(J + 2 * b), G.leather.base);
    e.dot(S, W, J, G.metal.hi);
  }
  var PS = { line: "#3a1608", deep: "#6e2a14", shade: "#9a4020", base: "#c2582a", hi: "#e88a48" };
  var ZS = { line: "#14100e", deep: "#231a16", shade: "#3a2c24", base: "#53402f", hi: "#7a604a" };
  function IS(S, a, s) {
    var o = a.arms[s];
    var i = w(o);
    var B = h(o);
    var n = G.metal;
    var O = G.leather;
    var t = PS;
    var r = B.x - i.x;
    var d = B.y - i.y;
    var l = Math.sqrt(r * r + d * d) || 1;
    var f = r / l;
    var c = d / l;
    var b = -c;
    var H = f;
    var g = 0 === s && !o.front;
    var x = i.x + f * l * .3;
    var D = i.y + c * l * .3;
    var W = B.x - 4 * f;
    var J = B.y - 4 * c;
    e.line(S, Math.round(x - 2 * b), Math.round(D - 2 * H), Math.round(x + 2 * b), Math.round(D + 2 * H), g ? t.deep : t.base);
    e.line(S, Math.round(x - 2 * b), Math.round(D - 2 * H + 1), Math.round(x + 2 * b), Math.round(D + 2 * H + 1), g ? t.line : t.deep);
    e.fatLine(S, Math.round(W - 2 * b), Math.round(J - 2 * H), Math.round(W + 2 * b), Math.round(J + 2 * H), 3, g ? O.line : O.deep);
    e.line(S, Math.round(W - 2 * b), Math.round(J - 2 * H), Math.round(W + 2 * b), Math.round(J + 2 * H), O.base);
    e.line(S, Math.round(W + f), Math.round(J + c), Math.round(W + f + 2 * b), Math.round(J + c + 2 * H), n.shade);
    e.dot(S, Math.round(W), Math.round(J), n.hi);
  }
  var $S = ["...oC....Co...", ".oSoCV..VCoSo.", "oSWS4CVVCSSSso", "oSWSr3VVCrSSso", "oSWSSrCVrCSSso", "oSWSSSaArCSSso", "oSWSSSAaCSSsso", "oSWSSSCVSSSsso", "oSWSSCVSSSSsso", ".oWSCVSSSSSso.", ".oWCVSSSsSSso.", ".oCVSSSsSSsso.", ".xJiJJXXJJiJx.", ".xjJJXiiXJJjx.", ".xXjjjXXjjjXx.", ".oWSSSssSSSso.", ".oWSSSssSSSso."];
  var Se = [".X.", ".j.", ".J.", "aVa", "VAV", "aVa", ".c.", "cVc", "c.c"];
  var ee = ["..oWSSCcVCSSso..", "..oWSSCcVCSSso..", "..oWSSCcVCSSso..", "..oWSSCcVCSSso..", "..oWSSCcVCSSso..", "..oWSSCcVCSSso..", "..oWSSCcVCSSso..", "..oWSSCcVCSSso..", ".oWSSSCcVCSSSso.", ".oWSsSCcVCSsSso.", ".oWSSsCcVCsSSso.", "oWSSSsCcVCsSSSso", "oWSSsSCccCSsSSso", "oWSsSSCcVCSSsSso", "oWcSScCcVCcSScWo", "oCVcCVCccCVCcVCo", "qQCVVCQccQCVVCQq", "qVVCVVCVVCVVCVVq", ".qqqqqqqqqqqqqq."];
  var ae = ["..oWSSSsSSSSso..", "..oWSSSsSSSSso..", "..oWSSSsSSSSso..", "..oWSSSsSSSSso..", "..oWSSSsSSSSso..", "..oWSSSsSSSSso..", "..oWSSSsSSSSso..", "..oWSSSsSSSSso..", ".oWSSSSsSSSSSso.", ".oWSsSSsSSSsSso.", ".oWSSsSsSSsSSso.", "oWSSSsSSsSSSsSso", "oWSSsSSSsSSSsSso", "oWSsSSSSsSSSSsso", "oWcSScSSsSScScWo", "oCVcCVCSsCVCcVCo", "qQCVVCQCCQCVVCQq", "qVVCVVCVVCVVCVVq", ".qqqqqqqqqqqqqq."];
  var se = ["...oCCCCCCo...", ".oSoCCCCCCoSo.", "oSWSSSSSSSSsso", "oSWSSSSSSSSsso", "oSWSSSSSSSSsso", "oSWSSSSSSSSsso", "oSWSSSSSSSSsso", "oSWSSSSSSSSsso", "oSWSSSSSSSSsso", ".oWSSSSSSSSso.", ".oWSSSsSSSSso.", ".oWSsSSsSSsso.", ".xJiJJJJJJiJx.", ".xjJJJJJJJJjx.", ".xXjjjjjjjjXx.", ".oWSSSssSSSso.", ".oWSSSssSSSso."];
  var oe = ["....oC..Co..", "..oSoCVVCo..", "..oSWSCVVCSo", "..oSWSSrVCro", "..oSWSSSrCVo", "..oSWSSSSaAo", "..oSWSSSSAao", "..oSWSSSSSCo", "..oSWSSSSSCo", "..oWSSSSSSCo", "..oWSSSSsSCo", "..oWSSsSSSCo", "..xJiJJJJXJx", "..xjJJJJXiXJ", "..xXjjjjjXjx", "..oWSSSSSSCo", "..oWSSSSSSCo"];
  var ie = ["...oWSSSSSSCcV.", "...oWSSSSSSCcV.", "...oWSSSSSSCcV.", "...oWSSSSSSCcV.", "...oWSSSSSSCcV.", "...oWSSSSSSCcV.", "...oWSSSSSSCcV.", "...oWSSSSSSCcV.", "..oWSSSSSSSCcVo", "..oWSsSSSSSCcVo", "..oWSSsSSSSCcVo", ".oWSSSsSSSCccVo", ".oWSSsSSSSCcVVo", ".oWSsSSSSSCcVCo", ".oWcSScSScCcVco", ".oCVcCVCcVCcVCo", ".qQCVVCQCVVCcVq", ".qVVCVVCVVCVVCq", "..qqqqqqqqqqqqq"];
  var Be = [".....oWSSCcVCSSso.....", "....oWSSSCcVCSSSso....", "...oWSSSSCcVCSSSSso...", "..oWSSsSSCcVCSSsSSso..", ".oWSSSsSSCcVCSSsSSSso.", "oWSSsSSsSCcVCSsSSsSSso", "oWcSScSSSCcVCSSScSScWo", "oCVcCVCcVCccCVcCVCcVCo", "qQCVVCQCVVCcQCVVCQCVQq", "qVVCVVCVVCVVCVVCVVCVVq", ".qqqqqqqqqqqqqqqqqqqq."];
  var ne = [".....oWSSSsSSSSso.....", "....oWSSSSsSSSSSso....", "...oWSSSSSsSSSSSSso...", "..oWSSsSSSsSSSSsSSso..", ".oWSSSsSSSsSSSSsSSSso.", "oWSSsSSsSSsSSSsSSsSSso", "oWcSScSSSSsSSSSScSScWo", "oCVcCVCcVCSsCVcCVCcVCo", "qQCVVCQCVVCCQCVVCQCVQq", "qVVCVVCVVCVVCVVCVVCVVq", ".qqqqqqqqqqqqqqqqqqqq."];
  var Oe = ["...oWSSSSSSCc.....", "..oWSSSSSSSCcV....", "..oWSSSSSSSSCcV...", ".oWSSsSSSSSSSCcVo.", ".oWSSSsSSSSSSSCcVo", "oWSSsSSsSSSSSSCcVo", "oWcSScSScSSScSCcVo", "oCVcCVCcVCcVCcCcVo", "qQCVVCQCVVCQCVCcVq", "qVVCVVCVVCVVCVVCVq", ".qqqqqqqqqqqqqqqqq"];
  function te(S, e, a) {
    var s = e.material;
    var o = s.cloth;
    v(S, e, a, { C: { line: o.line, deep: o.shade, shade: "#7aa8b8", base: o.base, hi: o.hi, spark: "#e6f4f6" }, B: s.trim, T: s.pants, band: 2, ko: 6.6, up: -.6 });
  }
  function he(S, e) {
    return S.p.sit ? 57 : Math.min(57, e.foot - 5);
  }
  var re = ["...kCWWWWCk...", ".bSkKmKKmKkSb.", "bsHtKmWWmKtSsb", "bsHtmCWWCmtSsb", "bsStCOmmOCtSsb", "bsHtKmWWmKtSsb", "bsHtmCWWCmtSsb", "bsStCOmmOCtssb", "bsHtKmWWmKtSsb", "bsStmcCCcmtssb", "bsStcOmmOctSsb", "bsStKmCCmKtssb", "bBstKmmmmKtsBb", "bHlHHoCWoHlHHb", "bBsSSOCCOsSSBb", "bSHSSoWCoSHSSb", "bBBsBBOOBBBsBb"];
  var de = ["...kCWWWWCk...", ".bSkKKKKKKkSb.", "bsSHSoCWoSSSsb", "bsSHSScCSSSSsb", "bsSHoCWWCoSSsb", "bsHSSScCSSSSsb", "bsSHSoCWoSSSsb", "bsSSSScCSSSssb", "bsSHSoCWoSSSsb", "bsSSSScCSSSssb", "bsSHSSoWoSSSsb", "bsSSSScCSSSssb", "bBsSSSSOSSSsBb", "bHlHHHlHHHlHHb", "bBsSSBsSSBsSBb", "bSHSSSHSSSHSSb", "bBBsBBBsBBBsBb"];
  var le = ["....kCWWCk..", "...bkKmmKkb.", "..bsSSHStmWb", "..bsSHSStCWb", "..bsSSHStOmb", "..bsSHSStmWb", "..bsSSHStCWb", "..bsSHSStOmb", "..bsSSHStmWb", "..bsSHSStcCb", "..bsSSHStOmb", "..bsSHSStmCb", "..bBsSSStmmb", "..bHlHHHlHHb", "..bBsSSBsSBb", "..bSHSSSHSSb", "..bBBsBBBsBb"];
  var fe = ["..bsHSt", "..bsHSt", "..bsHSt", "..bsHSt", "..bsHSt", "..bsHSt", "..bsHSt", "..bsHSt", ".bsSHSt", ".bsSHSt", ".bsHSSt", ".bsSHSt", "bsSSHSt", "bsSHSSt", "bsoCWot", "bsSHSSt", "bsSSHSt", "tTTTTTt", "bBBBBBb", ".bbbbb."];
  var ce = ["..bsSHSSSSSt..", "..bsSHSSSSSt..", "..bsSHSSSSSt..", "..bsSHSSSSSt..", "..bsSHSSSSSt..", "..bsSHSSSSSt..", "..bsSHSSSSSt..", "..bsSHSSSSSt..", ".bsSHSSSSSSt..", ".bsSHSSSSSSt..", ".bsSSHSSSSSt..", ".bsSHSSSSSSt..", "bsSSHSSSSSSt..", "bsSHSSSSSSSt..", "bsSSoCWoSSSt..", "bsSHSSSSSSSt..", "bsSSHSSSSSSt..", "tTTTTTTTTTTt..", "bBBBBBBBBBBb..", ".bbbbbbbbbb..."];
  function be(S, e, a) {
    var s = e.material;
    var o = s.cloth;
    v(S, e, a, { C: { line: o.line, deep: o.deep, shade: "#2378b8", base: o.base, hi: "#4aaae0", spark: o.spark }, B: s.ink, T: s.trim, W: s.bone, band: 2, ko: 6.8, up: 3.2 });
  }
  function Ge(S, e) {
    return S.p.sit ? 57 : Math.min(58, e.foot - 5);
  }
  var He = { down: [[2, 4, "#326d9d"]], left: [[1, 4, "#19233a"], [2, 4, "#293a54"], [3, 4, "#19233a"], [4, 10, "#326d9d"], [5, 10, "#326d9d"], [6, 10, "#19233a"], [1, 11, "#19233a"], [3, 11, "#326d9d"], [2, 12, "#19233a"], [0, 23, "#326d9d"]], right: [[1, 4, "#19233a"], [2, 4, "#293a54"], [3, 4, "#19233a"], [2, 11, "#326d9d"], [3, 11, "#326d9d"], [2, 12, "#326d9d"], [0, 23, "#326d9d"]], up: [[4, 5, "#293a54"], [5, 5, "#293a54"], [2, 10, "#293a54"], [3, 11, "#293a54"], [10, 23, "#293a54"], [11, 24, "#293a54"]] };
  function ge(S, a, s) {
    var o = a.arms[s];
    var i = w(o);
    var B = h(o);
    var n = a.material.cloth;
    var O = a.material.trim;
    var t = a.material.accent;
    var r = B.x - i.x;
    var d = B.y - i.y;
    var l = Math.sqrt(r * r + d * d) || 1;
    var f = r / l;
    var c = d / l;
    var b = -c;
    var G = f;
    var H = B.x - 4 * f;
    var g = B.y - 4 * c;
    var x = 0 === s && !o.front;
    u(S, [[i.x + 2 * b, i.y + 2 * G], [i.x - 2 * b, i.y - 2 * G], [H - 5 * b, g - 5 * G], [H + 5 * b, g + 5 * G]], n.line);
    u(S, [[i.x + b, i.y + G], [i.x - b, i.y - G], [H - 4 * b, g - 4 * G], [H + 4 * b, g + 4 * G]], x ? n.deep : n.base);
    e.fatLine(S, Math.round(H - 4 * b), Math.round(g - 4 * G), Math.round(H + 4 * b), Math.round(g + 4 * G), 2, t.shade);
    e.line(S, Math.round(H - 5 * b), Math.round(g - 5 * G), Math.round(H + 5 * b), Math.round(g + 5 * G), O.shade);
    e.line(S, Math.round(i.x + 2 * b), Math.round(i.y + 2 * G), Math.round(H + 4 * b), Math.round(g + 4 * G), O.deep);
    for (var D = -1; D <= 1; D += 2) {
      var W = H - 3 * f + b * D * 2;
      var J = g - 3 * c + G * D * 2;
      e.line(S, Math.round(W - f), Math.round(J - c), Math.round(W + b), Math.round(J + G), O.base);
      e.dot(S, Math.round(W + f), Math.round(J + c), O.deep);
    }
    var M = Math.round(i.x);
    var N = Math.round(i.y);
    u(S, [[M - 3, N], [M, N - 2], [M + 3, N], [M + 3, N + 3], [M, N + 5], [M - 3, N + 3]], n.line);
    e.line(S, M - 3, N, M, N - 2, O.shade);
    e.line(S, M, N - 2, M + 3, N, O.hi);
    e.line(S, M - 2, N + 1, M, N, O.base);
    e.line(S, M, N, M + 2, N + 1, O.base);
    e.dot(S, M - 1, N + 2, O.deep);
    e.dot(S, M + 1, N + 2, O.hi);
    e.line(S, M - 2, N + 3, M + 2, N + 3, O.shade);
    e.line(S, M - 3, N + 5, M + 2, N + 6, t.base);
  }
  function xe(S, a, s) {
    var o = a.arms[s];
    var i = w(o);
    var B = h(o);
    var n = a.material.cloth;
    var O = a.material.trim;
    var t = B.x - i.x;
    var r = B.y - i.y;
    var d = Math.sqrt(t * t + r * r) || 1;
    var l = t / d;
    var f = r / d;
    var c = -f;
    var b = l;
    var G = 0 === s && !o.front;
    var H = B.x - 4 * l;
    var g = B.y - 4 * f;
    u(S, [[i.x + 3 * c, i.y + 3 * b], [i.x - 3 * c, i.y - 3 * b], [H - 5 * c, g - 5 * b], [H + 5 * c, g + 5 * b]], G ? n.deep : n.base);
    u(S, [[i.x + 2 * c, i.y + 2 * b], [i.x - 2 * c, i.y - 2 * b], [H - 3 * c, g - 3 * b], [H + 3 * c, g + 3 * b]], G ? n.shade : n.hi);
    e.fatLine(S, Math.round(H - 5 * c), Math.round(g - 5 * b), Math.round(H + 5 * c), Math.round(g + 5 * b), 2, "#eef2ef");
    e.line(S, Math.round(H - 4 * c), Math.round(g - 4 * b), Math.round(H + 4 * c), Math.round(g + 4 * b), "#ffffff");
    e.line(S, Math.round(i.x + 2 * l), Math.round(i.y + 2 * f), Math.round(H - l), Math.round(g - f), O.base);
    e.line(S, Math.round(i.x + 5 * l), Math.round(i.y + 5 * f), Math.round(H - 2), Math.round(g - 2), n.hi);
    var x = Math.round(i.x);
    var D = Math.round(i.y);
    var W = s ? 1 : -1;
    u(S, [[x - 2 * W, D + 1], [x + 2 * W, D - 3], [x + 5 * W, D - 2], [x + 3 * W, D + 2], [x + 1 * W, D + 4]], O.deep);
    e.line(S, x + W, D - 2, x + 4 * W, D - 2, O.hi);
    e.dot(S, x + 3 * W, D + 1, O.base);
  }
  function De(S) {
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
  var We = ["...oC....Co...", ".oOsCW..WCsOo.", ".oOSCW..WCSOo.", "oOsSCW..WCSsOo", "oOsSsCWWCsSsOo", "oOsSShCWhSSsOo", "oOsSSsCWsSSSOo", "oOsSSssGsSSSOo", "oOshSssGsSShOo", "oOshSssGsSShOo", "oOsgSssGsSgsOo", "oOsGgssGsgGsOo", "oOsgSssGsSgsOo", "oOsSsSsGSsSsOo", "oNGGGGGGGGGGNo", "okkGkkkkkkGkko", "oNnnnnnnnnnnNo"];
  var Je = ["...oGGGGGGo...", ".oOsSSSSSSsOo.", "oOsShSSSSShsOo", "oOsShSSSSShsOo", "oOsShSSSSShsOo", "oOsShSSSSShsOo", "oOsShSSSSShsOo", "oOsShSSSSShsOo", "oOsSSSSssSSSOo", "oOsSSSSssSSSOo", "oOsSSSSssSSSOo", "oOsSSSSssSSSOo", "oOsSSSSssSSSOo", "oOsSSSSssSSSOo", "oNGGGGGGGGGGNo", "okkGkkkkkkGkko", "oNnnnnnnnnnnNo"];
  var ue = ["...oC...Co..", "..oOsC.CsOo.", "..oOsSSSCWo.", "..oOsSSSgCWo", "..oOsSSSgCWo", "..oOshSSgCWo", "..oOshSSgCWo", "..oOshSSgCWo", "..oOshSSgCWo", "..oOsSgSgCWo", "..oOsgGSgCWo", "..oOsSgSgCWo", "..oOsSSSgCWo", "..oOsSSSgCWo", ".oNGGGGGGNG.", ".okSkkSkkGYG", ".oNnnnnnNg.."];
  var Me = ["..NGGN..", ".NYGGgN.", "NGgkkgGN", "NGkrrkgN", "NGkrrkgN", "NGgkkggN", ".NgGGgN.", "..NggN.."];
  var we = ["..oSSsGcCCcGsSSo..", "..oSSsGcCCcGsSSo..", "..oSSsGcCCcGsSSo..", "..oSSsGcCCcGsSSo..", "..oSSsGcCCcGsSSo..", "..oSSsGcCCcGsSSo..", "..oSSsGcCCcGsSSo..", "..oSSsGcCCcGsSSo..", ".oSgSGXcCCcXGSgSo.", ".ogGSGXcCCcXGSGgo.", ".ogGgGXcCCcXGgGgo.", "oSgGgGXcCCcXGgGgSo", "ogGYgGXcCCcXGgYGgo", "oGYGgGXcCCcXGgGYGo", "ogGYgGXcCCcXGgYGgo", "oSgGgGXcCCcXGgGgSo", "oSSgSGXcCCcXGSgSSo", "oSSSSGXcCCcXGSSSSo", "oGGGGGGcCCcGGGGGGo", "onnnnnnqqqqnnnnnno"];
  var Ne = ["..oSShSSssSShSSo..", "..oSShSSssSShSSo..", "..oSShSSssSShSSo..", "..oSShSSssSShSSo..", "..oSShSSssSShSSo..", "..oSShSSssSShSSo..", "..oSShSSssSShSSo..", "..oSShSSssSShSSo..", ".oSSShSSssSShSSSo.", ".oSSShSSssSShSSSo.", ".oSSShSSssSShSSSo.", "oSSSShSSssSShSSSSo", "oSSSgSSSssSSSgSSSo", "oSSgGgSSssSSgGgSSo", "oSgGYGSSssSSGYGgSo", "oSgGYGgSssSgGYGgSo", "oSgGGGgSssSgGGGgSo", "oSSgGgSSssSSgGgSSo", "oGGGGGGGssGGGGGGGo", "onnnnnnnnnnnnnnnno"];
  var pe = ["...oSSSsSsGcCo.", "...oSSSsSsGcCo.", "...oSSSsSsGcCo.", "...oSSSsSsGcCo.", "...oSSSsSsGcCo.", "...oSSSsSsGcCo.", "...oSSSsSsGcCo.", "...oSSSsSsGcCo.", "..oSSSSsSsGcCo.", "..oSSSSsSsGcCo.", "..oSSSSsSsGcCo.", "..oSSSSsSsGcCo.", "..oSShSsSsGcCo.", ".oSSgSsSsSGcCo.", ".oSgGgSsSsGcCo.", ".oSgGYgSsSGcCo.", ".oSgGGgSsSGcCo.", ".oSSgGgSsSGcCo.", ".oGGGGGGGGGGCo.", ".onnnnnnnnnnno."];
  var ke = ["Y........", "GY.......", "GgY.Y....", "NGgNGY...", "NgGgNGgW.", "NgGYNGGgW", "NnGGGGGgN", "NngGYGggN", ".NnggGgnN", "..NNnnNN."];
  var me = ["Y.......", "GY......", "GgY.Y...", "NGgGGY..", "NgGGGgW.", "NgGYGGgW", "NnGGGGgN", ".NnggGnN", "..NNnnN."];
  function ve(S, e, s) {
    var o = e.material;
    var i = v(S, e, s, { C: o.cloth, B: o.accent, T: o.trim, W: { line: "#0c0a12", deep: "#171521", shade: "#241f31", base: "#312a42", hi: "#4b4160" }, band: 2, ko: 6.4, up: 3 });
    var B = o.trim;
    if (!(i.far)) {
      i.ln(.34 * i.L, .3 * i.ko, .46 * i.L, .46 * i.ko, B.base);
      i.ln(.46 * i.L, .46 * i.ko, .58 * i.L, .34 * i.ko, B.shade);
      i.dt(.46 * i.L, .4 * i.ko, B.hi);
      i.dt(.3 * i.L, .26 * i.ko, B.shade);
    }
    (function (S, e, s) {
      var o = De(e);
      if (e.g.side) {
        if (1 !== s) {
          return;
        }
        Na(S, e.g.arms[1].x - 2, a.ARM_Y - 7 + e.dy, me, o, !1);
      }
      else {
        var i = e.g.arms[s].x + 1;
        var B = a.ARM_Y + e.dy;
        if (0 === s) {
          Na(S, i - 5, B - 8, ke, o, !1);
        }
        else {
          Na(S, i + 5, B - 8, ke, o, !0);
        }
      }
    })(S, e, s);
  }
  function ye(S, e) {
    return S.p.sit ? 57 : Math.min(57, e.foot - 4);
  }
  function Le(S, a, s) {
    var o = w(a.arms[s]);
    var i = h(a.arms[s]);
    var B = a.material.accent;
    var n = i.x - o.x;
    var O = i.y - o.y;
    var t = Math.sqrt(n * n + O * O) || 1;
    var r = n / t;
    var d = O / t;
    var l = -d;
    var f = r;
    var c = o.x + 4 * r;
    var b = o.y + 4 * d;
    var G = i.x - 2 * r;
    var H = i.y - 2 * d;
    e.fatLine(S, Math.round(c), Math.round(b), Math.round(G), Math.round(H), 4, B.line);
    e.fatLine(S, Math.round(c), Math.round(b), Math.round(G), Math.round(H), 3, B.base);
    for (var g = 4; g < t - 2; g += 3) {
      var x = o.x + r * g;
      var D = o.y + d * g;
      e.line(S, Math.round(x - l), Math.round(D - f), Math.round(x + l + r), Math.round(D + f + d), B.deep);
      e.dot(S, Math.round(x + l), Math.round(D + f), B.hi);
    }
    e.fatLine(S, Math.round(c - l), Math.round(b - f), Math.round(c + l), Math.round(b + f), 2, B.hi);
  }
  function Ce(S, a, s) {
    var o = a.head;
    var i = o.x;
    var B = o.y;
    var n = o.w;
    var O = i + Math.floor(n / 2);
    var t = a.g.side;
    var h = a.g.back;
    var r = 0 | a.p.leg;
    var d = "#11131f";
    var l = "#24273d";
    var f = "#34394f";
    var c = "#565d76";
    var b = "#a60e34";
    var G = "#e32148";
    if ("back" === s && !h || "front" === s && h) {
      var H = t ? i - 4 : i - 3;
      var g = t ? 13 : n + 6;
      var x = B + 34;
      u(S, [[H + 3, B + 3], [H + g - 3, B + 3], [H + g, B + 12], [H + g - 1, B + 19], [H + g + 2 + r, B + 25], [H + g - 2 + r, B + 24], [H + g + r, B + 30], [H + g - 4 + r, B + 28], [H + g - 3 + r, x], [H + g - 7 + r, x - 3], [H + 5 + r, x], [H + 3 + r, x - 5], [H + r, x - 3], [H + 1, B + 17]], d);
      for (var D = 0; D < 4; D++) {
        var W = H + 3 + 3 * D;
        var J = B + 8 + D;
        u(S, [[W, J], [W + 2, J - 1], [W + 4 + r, B + 23], [W + 3 + r, x - 3], [W + r, x - 7], [W + 1 + r, B + 22]], D % 2 ? f : l);
        e.line(S, W + 1, J + 3, W + 2 + r, B + 22, c);
      }
      e.line(S, H + 1, B + 14, H + r, B + 24, b);
      e.line(S, H + r, B + 24, H + 3 + r, x - 1, G);
      e.line(S, H + g - 3, B + 13, H + g + r, B + 25, b);
      e.line(S, H + g + r, B + 25, H + g - 3 + r, x - 2, G);
    }
    if ("back" !== s) {
      if (u(S, [[i - 1, B + 6], [i - 2, B + 1], [i + 2, B - 1], [O, B - 3], [O + 2, B - 1], [i + n, B], [i + n + 1, B + 6], [i + n - 2, B + 9], [O, B + 4], [i + 1, B + 9]], d), e.line(S, i, B + 3, O, B - 1, f), e.line(S, i + 2, B + 3, O, B, c), e.line(S, O + 2, B, i + n - 1, B + 4, f), h) {
        e.line(S, O, B - 3, O, B + 13, G);
        e.line(S, O, B + 13, O + 5, B + 24, b);
        e.line(S, i, B + 4, i - 2, B - 2, G);
        return void e.line(S, i + n - 1, B + 4, i + n + 1, B - 2, G);
      }
      if (t) {
        u(S, [[i, B + 6], [i + 3, B + 7], [i + 2, B + 17], [i + 4, B + 25], [i, B + 29], [i + 1, B + 20], [i - 2, B + 22]], l);
        e.line(S, i + 1, B + 8, i + 1, B + 21, c);
        var M = i + n - 2;
        u(S, [[M - 5, B + 8], [M + 1, B + 6], [M + 2, B + 11], [M + 3, B + 13], [M, B + 14], [M - 3, B + 12]], b);
        e.line(S, M - 4, B + 8, M + 1, B + 10, G);
        u(S, [[M - 4, B + 9], [M - 2, B + 5], [M + 2, B - 4], [M, B + 4], [M - 1, B + 9]], G);
        e.line(S, M - 2, B + 6, M + 1, B - 2, "#ff6a79");
        e.line(S, M - 1, B + 10, M + 1, B + 10, d);
        e.dot(S, M, B + 10, "#fff3e9");
      }
      else {
        var w = 0;
        var N = -3;
        if (!h && "down" === a.dir) {
          if (!Ce._maskAnchorLoaded) {
            var p = {};
            try {
              p = JSON.parse(localStorage.getItem("pntt.mask-editor.v1") || "{}").__anchor_down || {};
            }
            catch (S) {
            }
            Ce._maskAnchor = { x: "number" == typeof p.x ? 0 | p.x : 0, y: "number" == typeof p.y ? 0 | p.y : -3 };
            Ce._maskAnchorLoaded = !0;
          }
          w = Ce._maskAnchor.x;
          N = Ce._maskAnchor.y;
        }
        for (var k = i + w, m = B + N, v = k + Math.floor(n / 2), y = 0; y < 2; y++) {
          var L = y ? 1 : -1;
          var C = y ? i + n - 1 : i;
          e.fatLine(S, C, B + 7, C + L, B + 22, 2, l);
          e.line(S, C, B + 9, C + L, B + 20, f);
        }
        for (u(S, [[k, m + 7], [v, m + 10], [k + n - 1, m + 7], [k + n - 2, m + 13], [v + 2, m + 14], [v, m + 17], [v - 2, m + 14], [k + 1, m + 13]], b), e.line(S, k + 1, m + 8, v, m + 11, G), e.line(S, v, m + 11, k + n - 2, m + 8, G), y = 0; y < 2; y++) {
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
  function je(S) {
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
  var Ae = ["...oG....Go...", ".oOsGQ..QGsOo.", ".oOWCGQQGsSSOo", "oOWCCGQQGSSSOo", "oOWCcGQQGSSSOo", "oOWCCcGQGSSSOo", "oOWCCcCGSSSSOo", "oOWCCCcGhSSSOo", "oOWCCCcGSSSSOo", "oOWCCCcGSSSsOo", "oOWCCCcGSSSsOo", "oOWCCCcGSSSsOo", "oOWCCCcGSSSsOo", "oOWCCcCGSSsSOo", "oNGGGGGGGGGGNo", "okSGSSsSsSGSko", "oNnnnnnnnnnnNo"];
  var Qe = ["...oGGGGGGo...", ".oOsSSSSSSsOo.", "oOsGSSSSSSGsOo", "oOsSGSSSSGSsOo", "oOsSSGSSGSSsOo", "oOsSSSGGSSSsOo", "oOshSSSsSSSsOo", "oOshSSSsSSSsOo", "oOshSSSsSSSsOo", "oOshSSSsSSSsOo", "oOshSSSsSSSsOo", "oOshSSSsSSSsOo", "oOshSSSsSSSsOo", "oOsSSSSsSSSsOo", "oNGGGGGGGGGGNo", "okSGSSSSSSGSko", "oNnnnnnnnnnnNo"];
  var _e = ["...oG...Go..", "..oOsG.GsOo.", "..oOsSSSCWo.", "..oOsSSSGCco", "..oOsSSSGCco", "..oOsSSSGCco", "..oOshSSGCco", "..oOshSSGCco", "..oOshSSGCco", "..oOshSSGCco", "..oOshSSGCco", "..oOshSSGCco", "..oOshSSGCco", "..oOsSSSGCco", ".oNGGGGGGNG.", ".oksSSsSSGYG", ".oNnnnnnnNg."];
  var Ye = ["..NGGN..", ".NYGGgN.", "NGWWkkGN", "NGWkWkgN", "NGWkWkgN", "NGWWkkgN", ".NgGGgN.", "..NggN.."];
  var Ee = ["..NGcCWgXXgWCcGN..", "..NGcCWgXXgWCcGN..", "..NGcCWgXXgWCcGN..", "..NGcCWgXXgWCcGN..", "..NGcCWgXXgWCcGN..", "..NGcCWgXXgWCcGN..", "..NGcCWgXXgWCcGN..", "..NGcCWgXXgWCcGN..", ".NGcCCWgXXgWCCcGN.", ".NGcCCWgXXgWCCcGN.", ".NGcCCWgXXgWCCcGN.", "NGcCCCWgXXgWCCCcGN", "NGcCCCWgXXgWCCCcGN", "NGCQQQCgXXgCQQQCGN", "NGQCCCQgXXgQCCCQGN", "NGQCQQCgXXgCQQCQGN", "NGCQCCCgXXgCCCQCGN", "NgGGGGGgXXgGGGGGgN", "NnnnnnnnXXnnnnnnnN", ".NNNNNNN..NNNNNNN."];
  var Ke = ["..NGcCWCccCWCcGN..", "..NGcCWCccCWCcGN..", "..NGcCWCccCWCcGN..", "..NGcCWCccCWCcGN..", "..NGcCWCccCWCcGN..", "..NGcCWCccCWCcGN..", "..NGcCWCccCWCcGN..", "..NGcCWCccCWCcGN..", ".NGcCCWCccCWCCcGN.", ".NGcCCWCccCWCCcGN.", ".NGcCCWCccCWCCcGN.", "NGcCCCWCccCWCCCcGN", "NGcCCCWCccCWCCCcGN", "NGCQQQCCccCCQQQCGN", "NGQCCCQCccCQCCCQGN", "NGQCQQCCccCCQQCQGN", "NGCQCCCCccCCCCQCGN", "NgGGGGGGggGGGGGGgN", "NnnnnnnnNNnnnnnnnN", ".NNNNNNN..NNNNNNN."];
  var qe = ["...NGcCCCCCgWN.", "...NGcCCCCCgWN.", "...NGcCCCCCgWN.", "...NGcCCCCCgWN.", "...NGcCCCCCgWN.", "...NGcCCCCCgWN.", "...NGcCCCCCgWN.", "...NGcCCCCCgWN.", "..NGcCCCCCCgWN.", "..NGcCCCCCCgWN.", "..NGcCCCCCCgWN.", "..NGcCCCCCCgWN.", "..NGcCCCCCCgWN.", ".NGcQQCCCCCgWN.", ".NGQcCQCCQQgWN.", ".NGQcQCCQCCgWN.", ".NGcQQCCCQQgWN.", ".NgGGGGGGGGgWN.", ".NnnnnnnnnnnWN.", "..NNNNNNNNNNNN."];
  var Ue = ["NG........", "NYG.......", "NYCGN.....", "NGCCCGN...", "NGcCCcCGN.", "NGcccCccGN", ".NggGGgggN"];
  var Xe = ["NG........", "NYG.......", "NYSGN.....", "NGSSSGN...", "NGsSSsSGN.", "NGsssSssGN", ".NggGGgggN"];
  var Re = [".NGG....", "NYGGN...", "NYSSGN..", "NGSSsGN.", "NGsSssGN", "NGsssssN", ".NggggN."];
  function Ve(S, e, s) {
    var o = e.material;
    var i = o.cloth;
    y(S, e, s, { C: { line: i.line, deep: i.deep, shade: i.shade, base: i.base, hi: i.hi }, B: { line: "#06080c", deep: "#0e121a", shade: "#171d27", base: "#1f2631", hi: "#3a4555" }, T: o.trim });
    (function (S, e, s) {
      var o = je(e);
      if (e.g.side) {
        if (1 !== s) {
          return;
        }
        Na(S, e.g.arms[1].x - 2, a.ARM_Y - 4 + e.dy, Re, o, !1);
      }
      else {
        var i = e.g.arms[s].x + 1;
        var B = a.ARM_Y + e.dy;
        if (0 === s) {
          Na(S, i - 6, B - 4, Ue, o, !1);
        }
        else {
          Na(S, i + 6, B - 4, Xe, o, !0);
        }
      }
    })(S, e, s);
  }
  function ze(S, e) {
    return S.p.sit ? 57 : Math.min(57, e.foot - 4);
  }
  var Fe = ["........o..oo..o......", ".......oSooHHooSo.....", "......oSSoSHhSooSSo...", ".....oSSsSSHhSSsSSo...", "....oSsSSShHhSSSsSSo..", "....oSsSSSShHSSSSsSo..", "....oSSsSSShHSSSsSSo..", "....oSsSSSSnNSSSSsSo..", "....oSsSSSsSSsSSSsSo..", "....oSsSs..Sh..sSsSo..", "....oSs....Ss....sSo..", "....oSs..........sSo..", "....oHs..........sHo..", "...oss............sso.", "....oSs..........sSo..", "....oSs..........sSo..", ".....oHs........sHo...", "....oss..........sso..", "....oSs..........sSo..", "...oSs............sSo.", "....oHs..........sHo..", "....oss..........sso..", ".....oSs........sSo...", "....oSs..........sSo..", ".....os..........so...", ".....o............o...", "......o..........o....", "......o..........o...."];
  var Te = [".....o..oo..o.......", "....oSooHHooSo......", "...oSSSHhSSSso......", "...oSSsSSHhSSSSso...", "...oSsSSShHhSSSSso..", "...oSSsSSShHSSSSso..", "...oSsSSSShHSSSSso..", "...oSsSSSSSSSSnNo...", "...oSsSSSSsSSs......", "...oSsSSSsS.........", "...oSsSSSS..........", "...oSsSSSs..........", "...oSHsSSs..........", "...oSsSSSs..........", "....oSHSSs..........", ".....oSSSs..........", "......oSHs..........", ".......oSs..........", ".......os..........."];
  var Pe = [".....oSsSHhSo...........", ".....oSsSHhSo...........", "....oSsSHhSo............", "....oSsSHhSo............", "....osSHhSSo............", "....osSHhSSo............", "...osSHhSSo.............", "...osSHhSSo.............", "...oSsSHhSo.............", "...oSsSHho..............", "..oSsSHho...............", "..oSsSHho...............", "..osSHhSo...............", "..osSHhSo...............", "..osSHhSo...............", "..osSHhSo...............", "..oSsSHho...............", "..oSsSHho...............", "..oSsSHho...............", "..oSsSHho...............", "..osSHhSo...............", "..osSHhSo...............", "..osSHhSo...............", "..osSHhSo...............", "..oSsSHho...............", "..oSsSHo................", "...oSsSo................", "...oHho.................", "....oSo.................", "....oo..................", "....oo.................."];
  var Ze = [".....oSsSHhSSso.....", ".....oSsSHhSSso.....", ".....oSsSHhSSso.....", ".....oSsSHhSSso.....", ".....osSHhSSsSo.....", ".....osSHhSSsSo.....", "......osSHhSSo......", "......osSHhSSo......", "......oSsSHhSo......", "........osSo........", "........oSHo........"];
  var Ie = ["........o..oo..o......", ".......oSooHHooSo.....", "......oSSoSHhSooSSo...", ".....oSsSHhSSsSHhSo...", "....oSsSHhSSsSHhSSso..", "....oSsSHhSSsSHhSSso..", "....oSsSHhSSsSHhSSso..", "....osSHhSSsSHhSSsSo..", ".....osSHhSSsSHhSSo...", ".....osSHhSSsSHhSSo...", ".....osSHhSSsSHhSSo...", ".....oSsSHhSSsSHhSo...", ".....oSsSHhSSsSHhSo...", ".....oSsSHhSSsSHhSo...", ".....oSsSHhSSsSHhSo...", ".....osSHhSSsSHhSSo...", ".....osSHhSSsSHhSSo...", ".....osSHhSSsSHhSSo...", ".....osSHhSSsSHhSSo...", ".....oSsSHhSSsSHhSo...", ".....oSsSHhSSsSHhSo...", "......oSsSHhSSsSHo....", "......oSsSHhSSsSHo....", "......osSHhSSsSHho....", "......osSHhSSsSHho....", "......osSHhSSsSHho....", "......osSHhSSsSHho....", "......oSsSHhSSsSo.....", ".......oSsSHhSSso.....", "........oSsSHhSSo.....", "........oSsSHhSo......", "........osSHhSo.......", ".........osSHho.......", ".........osSHho.......", "......oSo..oSSo.oSo...", "......oo...oSSo.oo....", "............oo........"];
  var $e = ["..........ohHo........", ".........oShHSo.......", ".........kkGkkk.......", "......ooSShHhSSSoo....", ".....ooSShHhhSSSSoo...", "....oSSsShHhHhSSSsSo..", "....oSsSShHhhHSSSsSo..", "....oSSsSShHHhSSsSSo..", "....oSsSSSs..sSSSsSo..", "....oSsSS......SSsSo..", "....oSs..........sSo..", "....oSs..........sSo..", "....ohs..........sho..", "...oSs............sSo.", "....oss..........sso..", "....oSs..........sSo..", ".....ohs........sho...", "....oSs..........sSo..", ".....os..........so...", ".....o............o...", "......o..........o....", "......o..........o...."];
  var Sa = ["......ohHo..........", ".....oShHSo.........", ".....kkGkkk.........", ".....ooSShHhSSSoo...", "....ooSShHhhSSSSoo..", "...oSSsShHhHhSSSso..", "...oSsSShHhhHSSSso..", "...oSSsSShHHhSSSo...", "...oSsSSSSsSs.......", "...oSsSSSsS.........", "...oSsSSSS..........", "...oSsSSSs..........", "...oSHsSSs..........", "...oSsSSSs..........", "....oSHSSs..........", ".....oSSSs..........", "......oSHs..........", ".......oSs..........", ".......os..........."];
  var ea = [".....oShHo........", ".....oShHo........", "....oShHo.........", "....oShHo.........", "...ohHSo..........", "...ohHSo..........", "..ohHSo...........", ".ohHSso...........", ".oShHSo...........", "oShHSo............", "oShHSo............", "oShHSo............", "ohHSso............", "ohHSso............", "ohHSso............", "ohHSso............", "oShHSo............", "oShHSo............", ".oShHSo...........", ".oShHSo...........", ".ohHSso...........", "..ohHSso..........", "..ohHSso..........", "..ohHSso..........", "...oShHSo.........", "....oShHo.........", "....oShHo.........", "....oSso..........", "..ohSo............", "...oSo............", "...oho............", "....oo............", "....oo............", "....oo............"];
  var aa = [".....oShHSo.....", ".....oShHSo.....", ".....oShHSo.....", ".....oShHSo.....", ".....ohHSso.....", ".....ohHSso.....", ".....ohHSso.....", ".....ohHSso.....", ".....oShHSo.....", ".....oShHSo.....", ".....oShHSo....."];
  var sa = ["..........ohHo........", ".........oShHSo.......", ".........kkGkkk.......", "......oShHSshShHSo....", ".....oShHSshShHSsho...", "....ohHSshShHSshShHo..", "....ohHSshShHSshShHo..", "....ohHSshShHSshShHo..", ".....ohHSshShHSshSo...", ".....oShHSshShHSsho...", ".....oShHSshShHSsho...", ".....oShHSshShHSsho...", ".....oShHSshShHSsho...", ".....ohHSshShHSshSo...", ".....ohHSshShHSshSo...", ".....ohHSshShHSshSo...", ".....ohHSshShHSshSo...", ".....oShHSshShHSsho...", ".....oShHSshShHSsho...", ".....oShHSshShHSsho...", ".....oShHSshShHSsho...", "........ohHSshSo......", "........ohHSshSo......", "........ohHSshSo......", "........ohHSshSo......", "........oShHSsho......", "........oShHSsho......", "........oShHSsho......", "..........oShHSsho....", "..........ohHSsho.....", "..........ohHSso......", "...........ohHSo......", "............ohSo......", "..........oSo.........", "..........oo..........", "..........oo..........", "..........oo.........."];
  var oa = { o: "#5a3f18", O: "#8a632c", s: "#c0953f", S: "#e9cf88", h: "#fff0c6", H: "#fffdf4", n: "#274f66", N: "#b8eced" };
  var ia = { o: "#161c26", O: "#424e60", s: "#6c7d94", S: "#9fb0c6", h: "#c7d4e4", H: "#eff7ff", k: "#171c24", G: "#c6ad78" };
  function Ba(S, e, a, s, o) {
    var i = e.head;
    var B = 0 | e.p.leg;
    var n = e.g.side;
    var O = e.g.back;
    var t = pa(e);
    var h = function (S, e) {
      return e < 0 || S < 0 || S > 31 || !(!t || !t(S, e));
    };
    function r(e, a, o, B) {
      Na(S, i.x + (e[1] - a), i.y + (e[2] - 6), e[0], s, !1, o, B || h);
    }
    if ("back" !== a) {
      if (O) {
        r(o.U, 9, Rs(B, 14, 22));
      }
      else {
        if (n) {
          r(o.S, 10, Rs(Us(e), 12, 10));
        }
        else {
          r(o.F, 9, Rs(B, 12, 16));
        }
      }
    }
    else {
      if (O) {
        return;
      }
      if (n) {
        r(o.BS, 10, Rs(Us(e), 8, 12));
      }
      else {
        r(o.BD, 9, Rs(B, 6, 12));
      }
    }
  }
  function na(S) {
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
  var Oa = ["...WG....GW...", ".bsSWG..GWSsb.", "bsHHSWGGWSSsBb", "bsHSSsGWHSSsBb", "bsSSsGWHSSSsBb", "bsSsGWHSSSSsBb", "bssGWHSSSSSsBb", "bsGWHSSSSSssBb", "bGWHSSSSSSsSBb", "bWHSSSSSSsSSBb", "bWSSSHSSsSSsBb", "bWsSHSSsSSHSBb", "bWSsSHSsSHSsBb", "bWsSsSsSsSsSBb", "xgGGGGGGGGGGgx", "xXjJiJjXjJiJXx", "xnggggggggggnx"];
  var ta = ["...WCCCCCCW...", ".bsSWCCCCWSsb.", "bsHSSSSSSSSsBb", "bsHSSSSSSSSsBb", "bsHSSSSSSSSsBb", "bsHSSSSSSSSsBb", "bsHSSSSSSSSsBb", "bsHSSSSSSSSsBb", "bsHSSSSSSSSsBb", "bsHSSSSSSSSsBb", "bsHSSSSsSSSsBb", "bsSHSSSsSSHsBb", "bsSsHSSsSHSsBb", "bssSsSsSsSsSBb", "xgGGGGGGGGGGgx", "xXjJiJjXjJiJXx", "xnggggggggggnx"];
  var ha = ["..NGGN..", ".NYnnGN.", "NYnGGnGN", "GnGeEGnG", "GnGEeGnG", "NGnGGngN", ".NGnngN.", "..NggN.."];
  var ra = ["..bsHSGWCGSSsb..", "..bsHSGWCGSSsb..", "..bsHSGWCGSSsb..", "..bsHSGWCGSSsb..", "..bsHSGWCGSSsb..", "..bsHSGWCGSSsb..", "..bsHSGWCGSSsb..", "..bsHSGWCGSSsb..", ".bsHSSGWCGSSSsb.", ".bsSHSGWCGSHSsb.", ".bsHSSGWCGSSSsb.", "bsSHSSGWCGSSHSsb", "bgggggGWCGgggggb", "bgSSSgGWCGgSSSgb", "bgSYSgGWCGgSYSgb", "bgSSSgGWCGgSSSgb", "bgggggGWCGgggggb", "NgGYGgNqqNgGYGgN", ".NNNNN.QQ.NNNNN."];
  var da = ["..bsHSSGSSSsb...", "..bsHSSGSSSsb...", "..bsHSSGSSSsb...", "..bsHSSGSSSsb...", "..bsHSSGSSSsb...", "..bsHSSGSSSsb...", "..bsHSSGSSSsb...", "..bsHSSGSSSsb...", ".bsHSSSGSSSSsb..", ".bsSHSSGSSHSsb..", ".bsHSSSGSSSSsb..", "bsSHSSSGSSSHSsb.", "bgggggSGSgggggb.", "bgSSSgSGSgSSSgb.", "bgSYSgSGSgSYSgb.", "bgSSSgSGSgSSSgb.", "bgggggSGSgggggb.", "NgGYGgGGGgGYGgN.", ".NNNNNNNNNNNNN.."];
  var la = ["....WG..GW..", "..bsW..GWs..", "..bsSWGGWHb.", "..bsSSGWHSSb", "..bsSSWHSSSb", "..bsSHSSSSWb", "..bsSHSSSSWb", "..bsSHSSSSWb", "..bsSHSSSSWb", "..bsSHSSSsWb", "..bsSHSSsSWb", "..bsSHSsSSWb", "..bsSsSsSsWb", "..bssSsSsSWb", ".xgGGGGGGNG.", ".xXjJiJjNeG.", ".xnggggggNg."];
  var fa = ["...bsHSSSSSGWb.", "...bsHSSSSSGWb.", "...bsHSSSSSGWb.", "...bsHSSSSSGWb.", "...bsHSSSSSGWb.", "...bsHSSSSSGWb.", "...bsHSSSSSGWb.", "...bsHSSSSSGWb.", "..bsSHSSSSSGWb.", "..bsHSSSSSSGWb.", "..bsSHSSSSSGWb.", ".bsSHSSSSSSGWb.", ".bgggggggggGWb.", ".bgSSSgSSSgGWb.", ".bgSYSgSYSgGWb.", ".bgSSSgSSSgGWb.", ".bgggggggggGWb.", ".NgGYGGGYGgNqN.", "..NNNNNNNNNNQN."];
  var ca = ["..NNNNN..", ".NYYYGGN.", "NYGeEGGgN", "NgYYGGggN", ".NgYGggN.", "..NNNNN.."];
  var ba = [".NNNNN..", "NYYYGGN.", "NYGEeGgN", "NgYYGggN", ".NgYggN.", "..NNNN.."];
  function Ga(S, e, s) {
    var o = e.material;
    var i = o.cloth;
    v(S, e, s, { C: { line: i.line, deep: i.deep, shade: i.shade, base: i.base, hi: "#9ccbe8", spark: i.spark }, B: o.trim, T: o.pants, W: o.accent, band: 2, ko: 5.8, up: 2.6 });
    (function (S, e, s) {
      var o = na(e);
      if (e.g.side) {
        if (1 !== s) {
          return;
        }
        Na(S, e.g.arms[1].x - 2, a.ARM_Y - 3 + e.dy, ba, o, !1);
      }
      else {
        var i = e.g.arms[s].x + 1;
        var B = a.ARM_Y + e.dy;
        if (0 === s) {
          Na(S, i - 5, B - 3, ca, o, !1);
        }
        else {
          Na(S, i + 5, B - 3, ca, o, !0);
        }
      }
    })(S, e, s);
  }
  function Ha(S, e) {
    return S.p.sit ? 57 : Math.min(57, e.foot - 4);
  }
  var ga = { Y: "#f2dca5", G: "#cfa86a", g: "#a8804d", n: "#7a5933", N: "#46301a" };
  var xa = { O: "#1b2a45", D: "#285283", S: "#3c73a8", B: "#5a9dd2", M: "#7fc0ea", H: "#b3e0f7", K: "#e8f7ff", w: "#eef3f9", v: "#b7c3d4", r: "#b3223d", R: "#e3505f", z: "#6b1428" };
  var Da = [".........wv.........", "......DDzrRzDD......", "....DDSBMMMBMBDD....", "...DSBBMHHKHMHBMD...", "..DSBBMHKHHHMHKMBD..", ".DSBMSBMSBMSBMSBMMD.", ".DSBMDBMDBHDBMDBHMD.", ".OSBD.SB.SM.SB.SMBO.", ".OSBD.DS.SB.DS.DMBO.", ".OSBD.O..DS.O..DMBO.", ".OSBD....O.....DHBO.", ".OSBD..........DHBO.", ".OSMD..........DMBO.", ".OSBD..........DHBO.", ".OSBD..........DMBO.", ".OSMD..........DMSO.", ".OSBD..........DHSO.", ".ODSD..........DSMO.", ".ODSD..........DSMO.", ".ODS............SMO.", ".OD..............DO.", ".O................O."];
  var Wa = ["..OSBHO.........", "...OSBMHO.......", "....OSBBMHO.....", ".....OSBBMMHO...", "......OSBBMMHO..", ".......OSBBMMHO.", "........OSBBMMHO", "........OSBBMMHO", "........OSBBMMHO", ".........OSBBMHO", ".........OSBBMHO", ".........OSBBMHO", ".........OSBBMHO", ".........OSBBMHO", ".........OSBBMHO", ".........OSBBMHO", ".........OSBBMHO", ".........OBMDBMO", ".........OBMDBMO", ".........OBMDBMO", ".........OBMDBMO", ".........OBMDBMO", ".........OBMDBMO", ".........OBMDBMO", ".........OBMDBMO", "..........OBMDBO", "..........OBMDBO", "..........OBMDBO", "..........OBMDBO", "..........OBMDBO", "..........OBMDBO", "..........OBMDBO", "..........OBMDBO", ".........OBMDBMO", ".........OBMDBMO", ".........OBMDBMO", ".........OBMDBMO", ".........OBMDBMO", ".........OBMDBMO", ".........OBO.OBO", ".........OBO.OBO", ".........OBO.OBO", "..........SM..SM", "..........SM..SM", "..........D...D."];
  var Ja = [".........wwv........", ".....DDDzrRrzDD.....", "...DDSBBSBMrMSBDD...", "..DSSBBSSBMrHSMBBD..", ".DSSBBSSBBMrHMSMHBD.", ".DSBBSSBBMHrHMSMHBD.", ".DSBBSSBBMHrzHSHMBD.", ".DSBSBSBBMHHrMSMHBD.", ".DSBBSSBBMMHrMSHMBD.", ".DSBSBSBBMHHrMSMHBD.", ".DSBBSSBSBMHzHSMHBD.", ".DSSBSSBBMMHHMSHMBD.", ".DSBBSSBBMHHMMSMHBD.", ".DSBSBSBBMHMHMSHMBD.", ".DSBBSSBSBMHMMSMMBD.", ".ODSBSSBBMMHMMSHBBO.", "..ODSSSBBMHHMMSSBO..", "..ODSBSBBMHMHMSDBO..", "..ODSSSBSBMHMMSDDO..", "...ODSSBBMMHMMSDO...", ".....OSSBBMMHHO.....", ".....OSSBBMMHHO.....", "....OSBMHDSBMHO.....", "....OSBMHDSBMHO.....", "....OSBMHDSBMHO.....", "....OSBMHDSBHO......", "...OSBMHDSBMHO......", "...OSBMHDSBMHO......", "...OSBMHDSBHO.......", "...OSBHDSBMHO.......", "..OSBMHDSBMHO.......", "..OSBMHDSBHO........", "..OSBHDSBMHO........", "..OSBHDSBMHO........", "..OSBHDDBMO.........", "..OBMO.OBMO.........", "..OBMO.OBMO.........", "..OBMO.OBO..........", "...OBO.OBO..........", "...SM..OBO..........", "...SM...SM..........", "...D....SM..........", "...D....D...........", "........D..........."];
  var ua = ["......wv............", ".....zrRzDDDD.......", "...DDSBBBBMMMMDD....", "..DSSBBBMMMHHKHMD...", ".DSSBBBMMHHKHHMMMD..", ".DSBBBSBMMHMMBMHMMD.", ".DSBBSBBMSBMSBMHMMD.", ".DSBSBBSBBSMBSMMHMD.", ".DSBBSBBSBBMDMBSMMO.", ".DSBSBBSB..DB.DB.DO.", ".DSBBSBBS.DS......D.", ".DSBBSBSD.DS........", ".DSBSBBSD.SD........", ".DSBBSBSD.SD........", ".DSBSBSD..SD........", ".DSBBSBD..SO........", ".ODSBSBD..O.........", ".ODSBSD.............", "..ODSBD.............", "..ODSD..............", "...OD...............", "...O................"];
  var Ma = [".......OBMO.....", ".....OSBHO......", "...OSBMHO.......", "..OSBMHO........", ".OSBMHO.........", "OSBBMHO.........", "OSBBMHO.........", "OSBBMHO.........", "OSBBMHO.........", "OSBBMHO.........", "OSBBMHO.........", "OSBBMMHO........", "OSBBMMHO........", "OSBBMMHO........", "OSBBMMHO........", "OSBBMMHO........", "OSBBMMHO........", "OSBHDSBHO.......", "OSBHDSBHO.......", "OSBHDSBHO.......", "OSBHDSBHO.......", ".OSBHDBMO.......", ".OSBHDBMO.......", ".OSBHDBMO.......", ".OSBHDBMO.......", ".OSBHDBMO.......", ".OSBHDBMO.......", ".OSBHDBMO.......", ".OSBHDBMO.......", ".OSBHDBMO.......", ".OSBHDBMO.......", ".OSBHDBMO.......", "..OBMDDBO.......", "..OBMDDBO.......", "..OBMDDBO.......", "..OBMDDBO.......", "..OBMDDBO.......", "..OBO.OBO.......", "..OBO.OBO.......", "..OBO.OBO.......", "...SM.SM........", "...SM.SM........", "...D...D........"];
  var wa = [".Y.", "YGg", ".gn", "..n"];
  function Na(S, a, s, o, i, B, n, O) {
    for (var t = 0; t < o.length; t++)
      for (var h = o[t], r = n ? n(t) : 0, d = 0; d < h.length; d++) {
        var l = h.charAt(d);
        if ("." !== l) {
          var f = i[l];
          if (f) {
            var c = (B ? a - d : a + d) + r;
            var b = s + t;
            if (!(O && O(c, b))) {
              e.dot(S, c, b, f);
            }
          }
        }
      }
  }
  function pa(S) {
    for (var e = [], a = 0; a < 2; a++) {
      var s = S.arms[a];
      if (s && s.over && (!S.g.side || 0 !== a)) {
        var o = w(s);
        var i = h(s);
        e.push([o.x, o.y, i.x, i.y]);
      }
    }
    return e.length ? function (S, a) {
      for (var s = 0; s < e.length; s++) {
        var o = e[s];
        var i = o[2] - o[0];
        var B = o[3] - o[1];
        var n = i * i + B * B || 1;
        var O = Math.max(0, Math.min(1, ((S - o[0]) * i + (a - o[1]) * B) / n));
        var t = o[0] + i * O - S;
        var h = o[1] + B * O - a;
        if (t * t + h * h <= 6.5) {
          return !0;
        }
      }
      return !1;
    } : null;
  }
  function ka(S, e) {
    var a = S.cloth;
    var s = S.trim;
    var o = S.accent;
    var i = S.pants;
    var B = S.red;
    var n = S.pink;
    var O = S.armor;
    return { L: a.line, d: a.deep, s: a.shade, W: a.base, h: a.hi, N: s.line, n: s.deep, g: s.shade, G: s.base, Y: s.hi, Q: o.line, q: o.deep, c: o.shade, e: o.base, E: o.hi, x: i.line, X: i.deep, j: i.shade, J: i.base, i: i.hi, Z: B.line, z: B.deep, m: B.shade, r: B.base, R: B.hi, u: n.deep, p: n.base, P: n.hi, o: O.line, a: O.deep, b: O.shade, B: O.base, A: O.hi, K: O.spark, 1: e.line, 2: e.deep, 3: e.shade, 4: e.base, 5: e.hi };
  }
  var ma = ["...xz....zx...", ".LLxr....rxLL.", ".LsWr4444rWhL.", ".LsWr3444rWhL.", ".LsWWr44rWWhL.", ".LsWWr34rWWhL.", ".LsWWWrrWWWhL.", ".LsWWWsrWWWhL.", ".LsWWWWsWWWhL.", ".LssWWWsWWWhL.", ".LsWWWWsWWhhL.", ".LsWsWWsWWWhL.", ".LssWWWsWWWhL.", ".LsWWWWsWWWhL.", ".LsWWWWsWWWhL.", ".NgGGYggYGGgN.", ".xXGXxxxxXGXx.", ".xXXXxxxxXXXx.", ".ZrrRrrrrRrrZ.", ".ZzzzzzzzzzzZ."];
  var va = [".o......", "oAo.o...", "oKboAo..", ".oAboAo.", ".obAAAbo", "obBBBAAo", "obBnGnAo", "obnEeGBo", "obGeqnbo", ".ogNNgo.", "..oNNo.."];
  var ya = ["o......", "Aoo....", "oAbooo.", ".obAAAo", "obBnGno", "obnEeGo", "obGeqno", ".ogNNgo", "..oooo."];
  var La = ["...LsWs", "...LsWs", "..LsWWs", "..LsWhs", "..LsWWs", ".LsWWWs", ".LsWWhs", ".LsWWWs", ".LsWhWs", "LsWWWWs", "LsEWEWE", "LceEeEe", "Lcehhec", "Lqeehcq", "Lqcecqq", "LQqqqqQ", ".QQQQQ."];
  var Ca = ["sWWL...", "sWhL...", "sWWhL..", "sWWhL..", "shWhL..", "sWWWhL.", "sWWWhL.", "sWhWhL.", "sWWWhL.", "sWWWWhL", "EWEWEhL", "eEeEecL", "cehhecL", "qcheeqL", "qqcecqL", "QqqqqQL", ".QQQQQ."];
  var ja = ["...xxxxxxxx...", ".LLxnGGGGnxLL.", ".LsWWWWWWWWhL.", ".LsWWWWWWWWhL.", ".LsWWWWWWWhhL.", ".LssWWWWWWWhL.", ".LsWWWWWWWWhL.", ".LsWWWWsWWWhL.", ".LsWsWWsWWWhL.", ".LssWWWsWWhhL.", ".LsWWWWsWWWhL.", ".LsWWWWsWsWhL.", ".LssWWWsWWWhL.", ".LsWWWWsWWWhL.", ".LsWWWWsWWWhL.", ".NgGGYggYGGgN.", ".xXGXxxxxXGXx.", ".xXXXxxxxXXXx.", ".ZrrRrrrrRrrZ.", ".ZzzzzzzzzzzZ."];
  var Aa = ["...LsWWWs", "...LsWWWs", "..LsWWWhs", "..LsWWWWs", "..LsWhWWs", ".LsWWWWWs", ".LsWWWhWs", ".LsWWWWWs", ".LsWhWWWs", "LsWWWWWWs", "LsEWEWEWE", "LceEeEeEe", "Lcehheehe", "Lqeehecce", "Lqceecqqc", "LQqqqqqqq", ".QQQQQQQQ"];
  var Qa = ["sWWWWL...", "sWWhWL...", "sWWWWhL..", "sWhWWhL..", "sWWWWhL..", "sWWWhWhL.", "sWhWWWhL.", "sWWWWWhL.", "sWWWhWhL.", "sWWWWWWhL", "EWEWEWEhL", "eEeEeEecL", "eheehhecL", "ecceheeqL", "cqqceecqL", "qqqqqqqQL", "QQQQQQQQ."];
  var _a = ["...xx...r...", ".LLxx...rLL.", ".LsWWWWWr4L.", ".LsWWWWWr3L.", ".LssWWWWhrL.", ".LsWWWWWhrL.", ".LsWWWWWhrL.", ".LssWWWWhrL.", ".LsWWsWWhrL.", ".LsWWWWWhrL.", ".LssWWWWhrL.", ".LsWWWsWhrL.", ".LsWWWWWhrL.", ".LssWWWWhrL.", ".LsWWWWWhrL.", ".NgGGYGGgGN.", ".xXGXxxxXGx.", ".xXXXxxxXXx.", ".ZrrRrrrrRZ.", ".ZzzzzzzzzZ."];
  var Ya = ["....LsWWWs", "....LsWWhs", "...LssWWWs", "...LsWWhWs", "...LsWWWWs", "..LssWWWhs", "..LsWWhWWs", "..LsWWWWWs", ".LssWWWhWs", ".LsWWWWWWs", "LsEWEWEWEs", "LceEeEeEeq", "LcehheehcQ", "LqeehecceQ", "LqceecqqcQ", "LQqqqqqqqQ", ".QQQQQQQQ."];
  var Ea = ["GY", "Ee", "qn"];
  var Ka = ["rR", "zr", ".z"];
  var qa = [".GY.", "GEeG", "geqg", ".gn."];
  var Ua = ["rGGr", "zrRz", ".zr.", "..z."];
  var Xa = [".G.", ".n.", "zrR", "zrr", ".z."];
  function Ra(S, e, a, s, o, i, B, n) {
    var O;
    var t = s + 2 - a;
    var h = o.length;
    var r = [];
    if (t >= h) {
      for (O = 0; O < h; O++)
        r.push(o[O]);
    }
    else {
      var d = h - t;
      if (d <= i) {
        for (O = 0; O < h; O++)
          (O < 1 || O > d) && r.push(o[O]);
      }
      else {
        for (O = h - t; O < h; O++)
          r.push(o[O]);
      }
    }
    Na(S, e, a, r, B, !1, n);
  }
  function Va(e, s, o) {
    var i = S.Palette.pick("SKIN", s.cfg.skin, "light");
    var B = ka(s.material, i);
    if (s.g.side) {
      if (1 !== o) {
        return;
      }
      Na(e, s.g.arms[1].x - 2, a.ARM_Y - 3 + s.dy, ya, B, !1);
    }
    else {
      var n = s.g.arms[o].x + 1;
      var O = a.ARM_Y + 1 + s.dy;
      if (0 === o) {
        Na(e, n - 5, O - 6, va, B, !1);
      }
      else {
        Na(e, n + 5, O - 6, va, B, !0);
      }
    }
  }
  function za(S, a, s) {
    var o;
    var i = a.arms[s];
    var B = w(i);
    var n = h(i);
    var O = a.material;
    var t = O.cloth;
    var r = O.accent;
    var d = O.armor;
    var l = O.trim;
    var f = n.x - B.x;
    var c = n.y - B.y;
    var b = Math.sqrt(f * f + c * c) || 1;
    var G = f / b;
    var H = c / b;
    var g = -H;
    var x = G;
    var D = a.g.side && 0 === s && !i.front;
    var W = a.torso.x + a.torso.w / 2;
    function J(S, e) {
      return [B.x + G * S + g * e * o, B.y + H * S + x * e * o];
    }
    function M(S) {
      return [Math.round(S[0]), Math.round(S[1])];
    }
    o = Math.abs(g) > .3 ? (B.x - W) * g >= 0 ? 1 : -1 : x > 0 ? 1 : -1;
    if (a.g.side) {
      o = Math.abs(g) > .3 ? g > 0 ? 1 : -1 : o;
    }
    var N = Math.max(4, Math.round(.55 * b));
    var p = Math.max(N + 2, Math.round(b - 2));
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
    var K = M(J((N + 1 + p) / 2, 0));
    e.dot(S, K[0], K[1], D ? l.shade : l.base);
    var q = M(J(p, -1));
    var U = M(J(p, 1));
    e.line(S, q[0], q[1], U[0], U[1], l.shade);
    if ((1 === s || i.front || i.over || a.g.side)) {
      Va(S, a, s);
    }
  }
  function Fa(S, a, s, o, i, B, n, O, t) {
    var h = a.material;
    var r = t ? h.red.base : h.pink.base;
    var d = t ? h.red.deep : h.pink.hi;
    var l = o + 3 * n;
    var f = o + 4 * n + O;
    if (B - i < 12) {
      e.line(S, o, i, o + 2 * n, i + 1, r);
      return void (t ? OO(S, o + 2 * n - 1, i + 2, Xa, s, !1) : (e.dot(S, o + 3 * n, i + 2, r), e.dot(S, o + 3 * n, i + 3, h.accent.base)));
    }
    var c = i + (t ? 4 : 5);
    var b = t ? Math.min(B - 7, i + 8) : Math.min(B - 2, i + 12);
    e.line(S, o, i, l, c, r);
    e.line(S, l, c, f, b, r);
    e.line(S, l + n, c + 1, f + n, b, d);
    if (t) {
      OO(S, f - 1, b + 1, Xa, s, !1);
    }
    else {
      e.dot(S, f, b + 1, h.accent.base);
      e.dot(S, f + n, b + 1, h.accent.hi);
    }
  }
  var Ta = { O: "#2c2729", D: "#4a4245", S: "#6d6462", B: "#918781", M: "#b3a99f", H: "#d4cabd", K: "#efe8dc", G: "#c8a55c", Y: "#eed9a0", n: "#6e5424" };
  var Pa = ["....................", ".....OOOOOOOOOO.....", "...OODSMHKKHMSDOO...", "..ODSBMHKHMHKMBSDO..", ".ODSBHMBMHHMBMHBSDO.", ".OSBHMD..DD..DMHBSO.", ".ODSBD........DBSDO.", ".OSDSHK......KHSDSO.", ".OBD.DMKH..HKMD.DBO.", ".OSD...DD..DD...DSO.", ".ODO............ODO.", "..O..............O.."];
  var Za = ["......OD............DO......", ".....OSD............DSO.....", "....OSBD............DBSO....", "...OSBMD............DMBSO...", "..OSBMHD............DHMBSO..", "..OBMSMD............DMSMBO..", ".OSMBMSD............DSMBMSO.", ".OBMSSBD............DBSSMBO.", "OSMSBMSD............DSMBSMSO", "OBSBMBSD............DSBMBSBO", "OSBMHMDD............DDMHMBSO", ".OSMBSBDD..........DDBSBMSO.", "OSBMSBSDD..........DDSBSMBSO", "OBMSBSDDD..........DDDSBSMBO", ".OSDSODD............DDOSDSO.", "..OOO..................OOO.."];
  var Ia = ["......................", ".......OOOOOOOO.......", ".....OSMSHKKHSMSO.....", "....OSSHHSHHSHHSSO....", "...OSMSHMSHHSMHSMSO...", "..OSSHMSHSHHSHSMHSSO..", "..OSSHMSHMSSMHSMHSSO..", "..ODBSMBSMSSMSBMSBDO..", "..ODBBDMDMDDMDMDBBDO..", "..ODSSBDMDMMDMDBSSDO..", "..ODSSBBBBGYBBBBSSDO..", "...OOODDDOnGODDDOOO...", "..ODSBMBSDSSDSBMBSDO..", ".ODSMHMSBMHHMBSMHMSDO.", "OSBMHKHBSMHHMSBHKHMBSO", ".OMHMBSDSBMMBSDSBMHMO.", "OSBSDSBMHMSSMHMBSDSBSO", "ODSBMHMSBHKKHBSMHMBSDO", ".OBMHMBDSMHHMSDBMHMBO.", ".OSBSDSBMHMMHMBSDSBSO.", "..ODSBMHMSBBSMHMBSDO..", "...OBMHKHBSSBHKHMBO...", "...OSBMHMSDDSMHMBSO...", "...OBSDSBSSSSBSDSBO...", "....OBOBMHMMHMBOBO....", ".....O.OSMHHMSO.O.....", ".......OBMSSMBO.......", "........OBMMBO........", "........OSBBSO........", ".........OOOO........."];
  var $a = ["....................", "......OOOOOOOO......", "....OOSBMHHKHMOO....", "...ODSBMMBHHKHMSO...", "..ODSBBMHHMBMHHMSO..", ".ODSBMMBSBMHHMBSO...", "ODSBBMHHMBSBMSO.....", "ODBMMBSBMHMD.BMS....", "OSBMGYBMSBDDSMHMS...", "ODSBnGSDDDO....D....", "ODSBMSO.............", "ODBMHSO.............", "OSBMBDO.............", "ODSMSDO.............", ".ODSBDO.............", ".OSBDO..............", "..ODSO..............", "...OO..............."];
  var Ss = ["............", ".....OOO....", "....OSBMO...", "...OSMHMBO..", "..ODBHKHMSO.", ".ODSMHMBSDSO", ".OSBMBSDSBMO", "ODSBSDSBMHMO", "OSBSDSMHKHBO", "OBMBSBMHMBSO", "OSBMHMBSDSDO", ".OSBMHMSBMSO", "ODSDSBMHMBSO", "OSBMSBMHKHBO", "OBMHMBSBMSDO", ".OSBMHMSDSO.", ".ODSBMHMBSO.", "..OSBMHKMBO.", "..ODSBMMBSO.", "...ODSBMSO..", "...OODSBOO..", ".....OOSO...", ".......O...."];
  var es = [".DS..........SD.", ".DB..........BD.", ".OB..........BO.", ".OM..........MO.", ".OHMS......SMHO.", ".OBSDSMHHMSDSBO.", ".OSBMHKHHKHMBSO.", ".OBHMSDOODSMHBO.", ".OSMBMHSSHMBMSO.", "..OBHMBHHBMHBO..", "..OSMHSMMSHMSO..", "...OBMHMMHMBO...", "...OSHMBBMHSO...", "...OBMHMMHMBO...", "....OBHMMHBO....", "....OSMHHMSO....", ".....OBMMBO.....", ".....OSHHSO.....", "......OBBO......", ".......OO......."];
  var as = ["..............", "..............", "..............", ".....S........", "....DB........", "....DHMSDSMH..", "....OMHMSMHKM.", "....OBMHMOOMHO", "....OSBMHMSHMO", ".....OSBMHMHBO", ".....ODSBMHMBO", "......OSMHMBSO", "......OBMHKHBO", "......OSBMHMSO", ".......OSMHMBO", ".......OBHMBSO", ".......OSMHMO.", "........OBMBO.", "........OSMSO.", ".........OBO..", ".........OO..."];
  var ss = ["...LNgGGgNL...", ".LeNGYgGYgNeL.", "LdeNgnGgnGNehL", "LdeNGYgGYgNehL", "LdeNgnGgnGNehL", "LdeNGYgGYgNehL", "LdeNgnGgnGNehL", "LdeNGYgGYgNehL", "LdeNgnGgnGNehL", "LdeNGYgGYgNehL", "LdseNnGgnNehhL", "LdsWeNYGNeWhhL", "LdsWWeNNeWWhhL", "LdsWWWeeWWWhhL", "LdsWWWWeWWWhhL", "LTkkUkUUkUkkUL", "LTuUuttuuUutUL", "LTkUUkUUkUUkUL", "LTttttttttttTL", "LdsWWWWWWWWhhL"];
  var os = ["...LeWWWWeL...", ".LsWeWWWWeWhL.", "LdseWWWWWWehsL", "LdseWWsWWWehsL", "LdeWWWWWWWWehL", "LdeWWWWsWWWehL", "LdesWWWWWWWehL", "LdeWWWWsWWWehL", "LdeWsWWWWWWehL", "LdeWWWWWsWWehL", "LdesWWWWWWWehL", "LdeWWWsWWWWehL", "LdeWWWWWWsWehL", "LdesWWWWWWWehL", "LdeWWWWsWWWehL", "LTkkUkUUkUkkUL", "LTuUuttuuUutUL", "LTkUUkUUkUUkUL", "LTttttttttttTL", "LdsWWWWWWWWhsL"];
  var is = ["...LWeNgN...", "..LdWeNGYN..", ".LddsWeNGYN.", ".LdsWWeNYGgN", ".LdsWWeNgGYN", ".LdsWWWeNGgN", ".LdssWWeNYGN", ".LdsWWWeNgGN", ".LdsWWWWeNYN", ".LdssWWWeNgN", ".LdsWWWWeNGN", ".LdsWWWWWeGN", ".LdssWWWWeNN", ".LdsWWWWWWeL", ".LdsWWWWWWeL", ".LTkUkUUkUkT", ".LTuUuttuUuT", ".LTkUUkUUkUT", ".LTtttttttTT", ".LdsWWWWWWhL"];
  var Bs = ["..LsWWsWW", "..LsWWsWW", "..LsWWsWW", "..LsWWWsW", ".LsWWWWsW", ".LsWWWWsW", ".LsWWWWsW", ".LssWWWsW", ".LsWsWWWs", "LsWWsWWWs", "LsWWsWWWs", "LsWWWsWWs", "LsWWWsgGg", "LsWWWWGgG", "LgGGGGGGG", "Lddddddds", ".LLLLLLLL"];
  var ns = ["WWsWWhL..", "WWsWWhL..", "WWsWWhL..", "WsWWWhL..", "WsWWWWhL.", "WsWWWWhL.", "WsWWWWhL.", "WsWWWshL.", "sWWWsWhL.", "sWWWsWWhL", "sWWWsWWhL", "sWWsWWWhL", "gGgsWWWhL", "GgGWWWWhL", "GGGGGGGgL", "sdddddddL", "LLLLLLLL."];
  var Os = ["...LsWWsWWWWW", "...LsWWsWWWWW", "..LsWWWsWWWWW", "..LsWWWsWWWWW", "..LsWWWWsWWWW", ".LsWWWWWsWWWW", ".LssWWWWsWWWW", ".LsWsWWWWsWWW", "LsWWsWWWWsWWW", "LsWWsWWWWsWWW", "LsWWWsWWWsWWW", "LsWWWsWWWWsWW", "LsgGgWsWWWsWW", "LsGgGWsWWWsWW", "LgGGGGGGGGGGG", "Lddddddddddds", ".LLLLLLLLLLLL"];
  var ts = ["nGGGGn", "gdWWdg", "gdWWdg", "gdWWdg", "gdWhdg", "gdWWdg", "gdWWdg", "gdhWdg", "gdWWdg", "gdWWdg", "gdWWdg", "gdWWdg", "gGnnGg", "gnGGng", "gGGGGg", "gddddg", "nNNNNn"];
  var hs = ["NGN", "gWL", "gWL", "gWL", "gWL", "gWL", "gWL", "gWL", "gWL", "gWL", "gWL", "gWL", "gnL", "GgL", "GGL", "gdL", "NNL"];
  var rs = [".NggN.", "NgYKgN", "gYKYGg", "NgGGgN", ".NggN."];
  var ds = ["Ng", "gY", "gG", "Nn"];
  var ls = [".gG.", ".uk.", "tUkU", "tuUU", ".uU.", "..t."];
  var fs = [".G.", ".u.", "uUk", "uUU", "u.U"];
  var cs = ["xXXx", "XJiX", "XJJX", "xXXx"];
  function bs(S, a, s) {
    var o;
    var i = a.arms[s];
    var B = w(i);
    var n = h(i);
    var O = a.material;
    var t = O.cloth;
    var r = O.accent;
    var d = O.pants;
    var l = n.x - B.x;
    var f = n.y - B.y;
    var c = Math.sqrt(l * l + f * f) || 1;
    var b = l / c;
    var G = f / c;
    var H = -G;
    var g = b;
    var x = a.g.side && 0 === s && !i.front;
    function D(S, e) {
      return [B.x + b * S + H * e * o, B.y + G * S + g * e * o];
    }
    function W(S) {
      return [Math.round(S[0]), Math.round(S[1])];
    }
    function J(a, s, o, i, B) {
      var n = W(D(a, s));
      var O = W(D(o, i));
      e.line(S, n[0], n[1], O[0], O[1], B);
    }
    o = a.g.side ? g - H >= 0 ? 1 : -1 : Math.abs(H) > .3 ? (B.x - (a.torso.x + a.torso.w / 2)) * H >= 0 ? 1 : -1 : g > 0 ? 1 : -1;
    var M = Math.max(6, Math.round(c - 1.5));
    var N = a.g.side ? 6.4 : 5.2;
    var p = i.over ? -2.4 : -1.4;
    u(S, [D(-2, p), D(M, p), D(M + .8, N), D(-2, 2.4)], t.line);
    u(S, [D(-1, p + .9), D(M - 1, p + .9), D(M - .4, N - 1), D(-1, 1.5)], x ? t.shade : t.base);
    J(0, -.4, M - 3, -.6, x ? t.base : t.hi);
    J(2, 1.4, M - 3, N - 2.2, x ? t.deep : t.shade);
    J(M - 3, -.6, M - 2.4, N - 1.2, x ? r.deep : r.base);
    J(M - 1.6, -.6, M - .9, N - .8, x ? r.shade : r.hi);
    J(M - .3, -1.2, M + .4, N - .3, t.line);
    var k = x ? { x: d.line, X: d.line, J: d.deep, i: d.shade } : { x: d.line, X: d.deep, J: d.base, i: d.hi };
    OO(S, i.palm ? n.x - 1 : n.x - 2, n.y - 1, cs, k, !1);
  }
  function Gs(S, e, a) {
    for (var s = [], o = 0; o < 2; o++) {
      var i = S.arms[o];
      if (i && e(o, i)) {
        var B = w(i);
        var n = h(i);
        s.push([B.x, B.y, n.x, n.y]);
      }
    }
    return s.length ? function (S, e) {
      for (var o = 0; o < s.length; o++) {
        var i = s[o];
        var B = i[2] - i[0];
        var n = i[3] - i[1];
        var O = B * B + n * n || 1;
        var t = Math.max(0, Math.min(1, ((S - i[0]) * B + (e - i[1]) * n) / O));
        var h = i[0] + B * t - S;
        var r = i[1] + n * t - e;
        if (h * h + r * r <= a) {
          return !0;
        }
      }
      return !1;
    } : null;
  }
  function Hs(S) {
    var e = S.torso;
    return Gs(S, function (a, s) {
      return s.front || s.over || S.g.side && 1 === a && h(s).x >= e.x + e.w;
    }, 6.5);
  }
  var gs = { O: "#0d0a11", D: "#1b1621", S: "#2a2231", B: "#3b3143", M: "#524559", H: "#6c5e72", g: "#7c5b30", G: "#b88d4f", Y: "#e2bf82", y: "#f6e1ae", n: "#6e4c1c", a: "#c8963c", A: "#f0cf72", w: "#fff1c2" };
  var xs = [".......O....O.......", "......OHO..OMO......", "...O..OBMOOMHMO.O...", "...OHOBMHOBMHMOOMO..", "..OSBMBSBMHMSBMHMSO.", ".OSBBMBSBMHMBSBMMBSO", "OSgGYBSBMBSBMHMBSBSO", "OgGYyGgSBMBSBMHMBSO.", "OGYyYGgOSBMODSBMBSO.", ".OGyYGO.OSBO.OSBSSO.", "OgYyGgO..OO...OBSDO.", "OGYgO..........OSDO.", ".OGYO..........OSDO.", ".OgYO..........OSDO.", ".OgGO...........OSO.", "..OgO...........OSO.", "..OO............OO..", "..O..............O..", "....................", "...................."];
  var Ds = ["......................", "......................", "......................", "......................", "......................", ".....ODSBO....OBSDO...", ".....OSBMSO..OSMBSO...", "....ODSBMSDOODSMBSDO..", "....OSBMHSDDDDSHMBSO..", "....ODSBMSDDDDSMBSDO..", "....OSDSBSDDDDSBSDSO..", ".....ODSDDDDDDDDSDO...", "......OOO......OOO...."];
  var Ws = ["........O....O........", ".......OMO..OHO.......", "....O..OBMO.OMHO.O....", "....OHOOSBMOOMHMOOMO..", "...OSBMHMBSSDSBMHMBO..", "..OSBMHMBSnnSDSBMHMO..", "..OBMHMBSnAAnSDSBMHO..", "..OMHMBSnAwwAnSDSBMO..", "..OHMBSDnAYYanBSDSBO..", "..OMBSDSBnaanHMBSDSO..", "..OBSDSBMHanBMHMBSDO..", "..OSDSBMHMaDSBMHMBSO..", "..ODSBMHMBaSDSBMHMBO..", "...OBMHMBSnBSDSBMHMO..", "...OMHMBSDAMBSDSBMO...", "...OHMBSDSnHMBSDSBO...", "....OSDBMMDMMBDSMO....", "....OSDBMMDMMBDSMO....", ".....ODBMMDMMBDSO.....", "......OBMHDDDMHO......", ".......OMHBDSMO.......", ".......OMHBDSMO.......", "........OHBDSO........", "........OHBDSO........", "........OHBDSO........", "........OHBDSO........", "........OHBDSO........", "........OBDSMO........", "........OBDSMO........", "........OBDSMO........", "........OMBDSO........", "........OBBDSO........", "........OBBDSO........", ".........OBDSO........", "........OSDOBO........", "........OSOOSO........", ".........O..OO........", "............O........."];
  var Js = [".......O..O.........", "......OMOOHO...O....", "..O...OBMOMHO.OMO...", "..OMO.OSBMBMHOMHO...", "..OSBOSBMHMBMHMHOO..", ".OSBMBSBMHMBSBMHMSO.", ".OSBMBSBMHMBSBMgYyO.", ".ODBMSBMHMBSBgGYyGO.", ".OSBHMBSBMBSgGYyGgYO", ".ODBMHBSDSBOgGYGOgGO", ".OSBMBSDSBO.OgGO.OO.", ".ODBMHSDSO...OO.....", ".OSBMSDO............", ".ODBHSDO............", ".OSBMDO.............", ".ODBSDO.............", "..OSDO..............", "..ODO...............", "...O................"];
  var us = [".....OSBO..", "....OSBMO..", "....ODBMO..", "....OSBMSO.", "....ODMHSO.", "....OSMHSO.", "....ODBMSO.", "....OSBMDO.", "....ODMHSO.", "....OSMHBO.", "....ODBMSO.", "....OSBHMO.", "...OSBMHSO.", "...ODBHMSO.", "...OSMHgSO.", "...ODBHGSO.", "...OSBMYgO.", "...ODMHGSO.", "...OSBMgDO.", "...ODMHBSO.", "...OSBHMSO.", "...ODBMHSO.", "...OSMHBDO.", "...ODBMSO..", "...OSBHSO..", "...ODBSDO..", "...OSOODO..", "...OO.OSO..", ".......O..."];
  var Ms = ["a", "A", "n"];
  function ws(S, e) {
    var a = S.mantle;
    var s = S.trim;
    var o = S.cloth;
    var i = S.white;
    var B = S.pants;
    var n = S.jade;
    return { A: a.line, a: a.deep, b: a.shade, W: a.base, w: a.hi, N: s.line, n: s.deep, g: s.shade, G: s.base, Y: s.hi, K: s.spark, x: o.line, X: o.deep, j: o.shade, J: o.base, i: o.hi, Q: i.line, q: i.deep, c: i.shade, e: i.base, E: i.hi, p: B.line, P: B.deep, u: B.shade, U: B.base, v: B.hi, z: n.deep, Z: n.base, H: n.hi, 1: e.line, 2: e.deep, 3: e.shade, 4: e.base, 5: e.hi };
  }
  var Ns = ["...xQE..EQx...", "..xcE3445eQx..", ".xgcEn44nEegx.", "xXjgcEGGEeGJix", "xXjgcE34EeGJix", "xXjJgcEEeGJJix", "xXjJJgEeqeeGix", "xXjJgEeqgGeGix", "xnjJgEegeeYGix", "xXjgEeqgeYgGix", "xXjgEeqengeGix", "xggEeqeeEeGGix", "xXgEeqeEegeGix", "xgEeqeEeeeeGix", "nGGGGGGGGGGGYn", "xXXgXXgXXgXXgx", "xGjjGjjGjjGjjx", "xXXgXXgXXgXXgx", "nggggggggggggn", "xjjjjjjjjjjjjx"];
  var ps = ["...xjJJJJix...", "..xXjJJJJJix..", ".xXjJJJJJJJix.", "xXjJJJJJJJJJix", "xXjJJJJJJJJJix", "xXjJJJJJJJJJix", "xXjJJJJJJJJJix", "xXjJJJJJJJJJix", "xXjJJJJJJJJJix", "xXjJJJJJJJJJix", "xXjJJJJJJJJJix", "xXjJJJJJJJJJix", "xXjJJJJJJJJJix", "xXjJJJJJJJJJix", "nGGGGGGGGGGGYn", "xXXgXXgXXgXXgx", "xGjjGjjGjjGjjx", "xXXgXXgXXgXXgx", "nggggggggggggn", "xjjjjjjjjjjjjx"];
  var ks = [".....xQEe...", "...xXjQE3...", ".xXjJJJgQ43.", ".xXjJJJgQnx.", ".xXjJJJgQex.", ".xXjJJJgcQx.", ".xXjJJJgcex.", ".xXjJJJgcEx.", ".xXjJJngcex.", ".xXjJgJgcEx.", ".xXjJJGgcex.", ".xXjJnJgcEx.", ".xXjJJJgcex.", ".xXjJJJgcEx.", ".nGGGGGGGYn.", ".xgXXgXXgXx.", ".xjGjjGjjGx.", ".xgXXgXXgXx.", ".nggggggggn.", ".xjjjjjjjjx."];
  var ms = ["...AgbWa", "...AgbWa", "...AgbWa", "...AgbWa", "..AgbWwa", "..AgbWwa", "..Agbbwa", "..Agbbwa", "..Agbbwa", "..Aggbwa", ".AgbWGwa", ".Agbgbwa", ".AgbWnwa", ".AgwWbwa", ".AgwWbwa", ".AgwWbwa", ".AgwWbwa", ".AgwWWwa", ".AgwWbwa", ".AggGgWa", ".AGwWYWa", ".AgwGgWa", ".AggWbWa", "AgbwWbWa", "AgbwWWWa", "AgbwWbWa", "AgbwWbWa", "AgbwWbWa", "AgGGgGGa", "AnGgAnGa", ".AnA.Ana", "..A...A."];
  var vs = ["AbWWWWWWWWwA", "AGgwwwwwwgYA", "AGgwwwwwwgYA", "AbGgwwwwgYwA", "AbGgwwwwgYwA", "AbGgwwwwgYwA", "AbWGgwwgYWwA", "AbWGgwwgYWwA", "AbWGgwwgYWwA", "AbWbGggYwWwA", "AbWbGggYwWwA", "AbWbGggYwWwA", "AbWWWgYWwWwA", "AbWbWgYWWWwA", "AbWbWgYWwWwA", "AbWbWgGWwWwA", "AbWbWngWwWwA", "AbWWWWnWwWwA", "AbWbWbWWwWwA", "AbWbWbWWWWwA", "AbWbWbWWwWwA", "AbWbWbWWwWwA", "AbgGgbWgGgwA", "AgWbYbWYwWgA", "AGWgGbWGgWGA", "AbgbWbWWWgwA", "AbWbWbWWwWwA", "AbWWWbWWwWwA", "AbWbWbWWwWwA", "AgGGgGGgGGgA", "AnGgAGnGAgGA", ".AnA.AA.AnA.", "..A.......A."];
  var ys = ["........Agba", "........Agba", ".......AgbGa", ".......AgbGa", ".......AgbGa", "......AgbwGa", "......AgbwGa", "......AgbwGa", "......AgbwGa", ".....AgbWwGa", ".....AgbWwGa", ".....AgbWwGa", ".....AgbWwGa", ".....AgWWwGa", "....AgbbWwGa", "....AgwbWwGa", "....AgwbWwGa", "....AgwbWwGa", "....AgwbWwGa", "...AgbwWwGa.", "...AgbwbwGa.", "...AggGgwGa.", "...AgbwYwGa.", "...AgbGgwGa.", "..AgbgwbwGa.", "..AgbWwWwGa.", "..AgbWwbwGa.", "..AgbWwbwGa.", ".AgbWWwbwGa.", ".AgbWWwbwGa.", ".AgGGgGGgGa.", ".AnGgAnGgna.", "..AnA.AnA.A.", "...A...A...."];
  var Ls = ["A.......", "AA......", "AGAA....", "AgYGAA..", "AgwWYGAA", "AgbWwWGA", "AgbWWwgA", "AngGGGgA", ".AAAAAA."];
  var Cs = ["A.....", "AAAA..", "AgYGAA", "AGwWgA", "AgWWbA", "AgWbbA", "AngGgA", ".AAAA."];
  var js = ["QeEEeQ", "QceEeQ", "QceEEQ", "QcEeEQ", "QceEeQ", "QceEEQ", "QcEeEQ", "QceEeQ", "QceEEQ", "QcEeEQ", "QceEeQ", "QceEEQ", "QcgGeQ", "QgeEYQ", "QgGgGQ", "QceEgQ", "QnGGnQ", ".QQQQ."];
  var As = ["QEQ", "cEQ", "cEQ", "ceQ", "cEQ", "cEQ", "ceQ", "cEQ", "cEQ", "ceQ", "cEQ", "cEQ", "gYQ", "gGQ", "cgQ", "ceQ", "nGQ", ".QQ"];
  var Qs = ["nGGYGGGn", "ngYGGYgn", ".ngGGgn.", ".nnYYnn.", "..ngGn..", "...nn..."];
  var _s = ["nGGn", "ngYn", ".gGn", ".nG.", "..n."];
  var Ys = [".nGGn.", "nGYYGn", "GYZHYG", "GYzZYg", "nGYYGn", ".nggn."];
  var Es = ["nG", "GH", "Zg", "Gg", "ng"];
  var Ks = ["xXx", "XJi", "xjX"];
  function qs(S) {
    var e = S.p;
    return e.leg ? e.leg : e.act || e.atk || e.sit || 1 !== e.bob ? 0 : 1;
  }
  function Us(S) {
    var e = S.p.sit ? 0 : S.legs[0].x - S.g.legs[0].x;
    return e > 0 ? -1 : e < 0 ? 1 : qs(S) ? -1 : 0;
  }
  function Xs(S, e, a) {
    var s;
    var o = S.p.sit ? 62 - a : e.length;
    var i = e.length;
    var B = i - o;
    var n = [];
    if (B <= 0) {
      return e;
    }
    for (s = 0; s < i; s++)
      (s < 1 || s > B) && n.push(e[s]);
    return n;
  }
  function Rs(S, e, a) {
    return function (s) {
      var o = s - e;
      return o <= 0 ? 0 : Math.round(S * Math.min(1, o / a));
    };
  }
  function Vs(s, o, i) {
    var B;
    var n = o.arms[i];
    var O = w(n);
    var t = h(n);
    var r = o.material;
    var d = r.cloth;
    var l = r.trim;
    var f = t.x - O.x;
    var c = t.y - O.y;
    var b = Math.sqrt(f * f + c * c) || 1;
    var G = f / b;
    var H = c / b;
    var g = -H;
    var x = G;
    var D = o.g.side && 0 === i && !n.front;
    function W(S, e) {
      return [O.x + G * S + g * e * B, O.y + H * S + x * e * B];
    }
    function J(S) {
      return [Math.round(S[0]), Math.round(S[1])];
    }
    function M(S, a, o, i, B) {
      var n = J(W(S, a));
      var O = J(W(o, i));
      e.line(s, n[0], n[1], O[0], O[1], B);
    }
    function N(S, a, o) {
      var i = J(W(S, a));
      e.dot(s, i[0], i[1], o);
    }
    B = Math.abs(g) > .3 ? (O.x - (o.torso.x + o.torso.w / 2)) * g >= 0 ? 1 : -1 : x > 0 ? 1 : -1;
    if (o.g.side) {
      B = Math.abs(g) > .3 ? g > 0 ? 1 : -1 : B;
    }
    var p = Math.max(5, Math.round(b - 1.5));
    var k = n.over ? -2.4 : -1.9;
    u(s, [W(-1.5, k), W(p, k + .2), W(p, 2.4), W(.4 * b, 2.9), W(-1.5, 2.5)], d.line);
    u(s, [W(-.5, k + .9), W(p - 1, k + 1), W(p - 1, 1.5), W(.4 * b, 1.9), W(-.5, 1.6)], D ? d.deep : d.base);
    M(0, -.5, p - 2, -.3, D ? d.shade : d.hi);
    M(1, 1.1, p - 2, 1, D ? d.line : d.shade);
    var m = Math.max(3, Math.round(.5 * b));
    N(m, .9, D ? l.deep : l.shade);
    N(m + 1, .1, D ? l.shade : l.base);
    N(m + 2, -.4, D ? l.shade : l.hi);
    N(m + 3, .4, D ? l.deep : l.base);
    N(m + 4, 1.1, D ? l.deep : l.shade);
    M(p - 1, k + .3, p - 1, 2.2, D ? l.deep : l.base);
    var v = D ? { x: d.line, X: d.line, J: d.deep, i: d.shade, j: d.deep } : { x: d.line, X: d.deep, J: d.base, i: d.hi, j: d.shade };
    OO(s, t.x - 1, t.y - 1, Ks, v, !1);
    if (n.palm) {
      e.dot(s, t.x + 2, t.y, D ? d.deep : d.base);
    }
    (function (e, s, o) {
      var i = S.Palette.pick("SKIN", s.cfg.skin, "light");
      var B = ws(s.material, i);
      if (s.g.side) {
        if (1 !== o) {
          return;
        }
        Na(e, s.g.arms[1].x - 3, a.ARM_Y - 3 + s.dy, Cs, B, !1);
      }
      else {
        var n = s.g.arms[o].x + 1;
        var O = a.ARM_Y + s.dy;
        if (0 === o) {
          Na(e, n - 4, O - 4, Ls, B, !1);
        }
        else {
          Na(e, n + 4, O - 4, Ls, B, !0);
        }
      }
    })(s, o, i);
  }
  function zs(S, e) {
    for (var a = [], s = e ? 9 : 4, o = 0; o < 2; o++) {
      var i = S.arms[o];
      if (i && (e ? 1 === o || i.front || i.over : i.over && (!S.g.side || 0 !== o))) {
        var B = w(i);
        var n = h(i);
        var O = n.x - B.x;
        var t = n.y - B.y;
        var r = Math.sqrt(O * O + t * t) || 1;
        var d = e ? 2 : 0;
        a.push([B.x - O / r * d, B.y - t / r * d, n.x, n.y]);
      }
    }
    return a.length ? function (S, e) {
      for (var o = 0; o < a.length; o++) {
        var i = a[o];
        var B = i[2] - i[0];
        var n = i[3] - i[1];
        var O = B * B + n * n || 1;
        var t = Math.max(0, Math.min(1, ((S - i[0]) * B + (e - i[1]) * n) / O));
        var h = i[0] + B * t - S;
        var r = i[1] + n * t - e;
        if (h * h + r * r <= s) {
          return !0;
        }
      }
      return !1;
    } : null;
  }
  var Fs = { O: "#0f0e14", D: "#1d1b24", S: "#2e2b37", B: "#46424f", M: "#6d6977", H: "#9b97a5", L: "#c8c5cf", W: "#efedf3", u: "#3b3641", v: "#57515d", k: "#121118", d: "#28498a", l: "#3f72bd", e: "#9fd0f5", r: "#15141b", R: "#8a8796" };
  var Ts = ["R", "r"];
  var Ps = ["...O..O...O...O..O..", ".OWLOWLOOLMOOMBOSBO.", ".OLWLWHLOLWMBOHMBSO.", "OLWHLWHMLHWMBSBMBSDO", "OWHMLHMBLHMBDSBSDSO.", ".OWMSLMBSHMBSDBSDO..", ".....uOLMHBSDOu.....", "....uuOWLMBSDOuu....", "....vuOLWOOOOOuv....", "...uu.OWO......uu...", "...u...O........u...", "...u............u...", ".....kkk...kkk......", "..kkkellkkkellkkk...", "....klddk.klddk.....", ".....kkk...kkk......"];
  var Zs = ["......................", "......................", "......................", "......................", "......................", "..OS..............SO..", "..OBO............OBO..", "..OMO............OMO..", "...OBDO........ODBO...", "...OMDDDDDDDDDDDDMO...", "....OHDDDDDDDDDDHO....", "....OLO........OLO....", ".....O..........O....."];
  var Is = ["...O..O...O...O..O....", "..OBSOBMOOMLOOLWOLWO..", "..OSBMHOBMWLOLHWLWLO..", ".ODSBMBSBMWHLMHWLHWLO.", "..OSDSBSDBMHLBMHLMHWO.", "...ODSBDSBMHSBMLSMWO..", "......uOBMSHBLOu......", ".....vuOBMSHBLOuu.....", ".....uuOBMSHBLOvu.....", "....vuuOBMSHBLOuuu....", "....uuuOBMSHBLOuuu....", "....uuuOBMSHBLOuuv....", "....uuvOBMSHBLOuuu....", "....uuuOBMSHBLOuvu....", "....uvuOBMSHBLOuuu....", "....uuuOBMSHBLOvuu....", "....vuuOBMSHBLOuuu....", "....uuuOBMSHBLOuuu....", ".....uuOBMSHBLOuu.....", ".......OBSDBMSO.......", ".......OBSDBMSO.......", "......OSBSDBMSBO......", "......OSBSDBMSBO......", "......OBMBSMHBMO......", "......OBMBSMHBMO......", "......OBMBSMHBMO......", "......OBMBSMHBMO......", "......OMHMBHLMHO......", "......OMHMBHLMHO......", "......OMHMBHLMHO......", ".......OHMBHLMO.......", ".......OLHMLWHO.......", ".......OLHMLWHO.......", ".......OLHMLWHO.......", "........OHMLWO........", "........OLHWWO........", "........OLWOOWLO......", "........OWO..OWO......", ".........O....O......."];
  var $s = [".....O...O...O......", "..O..OLOOLWOOWLO....", "..OLOOMLOLWHOWLHO...", ".OMLOMHLMLWHLWHLO...", ".OBMLMHMLHWLHWLWO...", "OSBMHMBMHLHLWHLSO...", "ODBMHBSBMHMLHMSO....", "OSBMBSOOOOOOOOO.....", "ODBMSOuuuuuu........", "OSBMBOuuvuuu........", "ODMHSOuuuuuu........", "OSBMBOuvuuu.........", ".OMHSO.......kkk....", ".OBMO....kkkkellk...", "..OMO.......klddk...", "..OSO........kkk....", "...O................"];
  var So = ["..OSBO.", "..ODMO.", "..OSMHO", "..OBMHO", "..OSHMO", "..OBHLO", ".OSMHLO", ".OBHLHO", ".OMHLWO", ".OBLWHO", ".OMHWLO", ".OHLWHO", ".OMWLWO", "OHLWHLO", "OMWLWHO", "OLWHLWO", "OHLWLWO", ".OWLWO.", ".OLOWO.", ".OO.OO."];
  var eo = { O: "#2a060e", D: "#4a0a17", S: "#721422", B: "#991d22", M: "#bb2c24", H: "#d84b2b", L: "#ee7a3a" };
  var ao = [".......OOOOO........", ".....OOSBMHBOO......", "....OSBMHDLHMBSO....", "...OSBMHLDHLHMBSO...", "..OSBMHLHDMHLHMBSO..", ".OSBMHMHMDSMHMHMBSO.", ".OSBMHMBSO.OSMHMBSO.", ".OSBMHBSO.S.OSMHBSO.", ".OSBMBSO..S..OSBMSO.", ".OSBMSO...D...OSBSO.", ".OSBSO.........OBSO.", ".OSBO..........OBSO.", ".OSO............OSO.", ".OSO............OSO.", ".OBO............OBO.", ".OSO............OSO.", ".OSO............OBO.", ".OMO............OMO.", ".OSO............OSO.", ".ODO............OBO.", "..OO............OSO.", "...O...........OBSO.", "...............OSO..", "...............OBO..", "..............OSO...", "..............OBO...", "..............ODO...", "...............O...."];
  var so = ["......................", "......................", "......................", "......................", "....ODSBO......OBSDO..", "....OSBMO......OMBSO..", "....OSBMSO....OSMBSO..", "....ODSBMSDDDDSMBSDO..", "....OSBMHSDDDDSHMBSO..", "...OSBMHBSDDDDSBHMBSO.", "...ODSBMSDDDDDDSMBSDO.", "...OSDSBSDDDDDDSBSDSO.", "...ODSBSDDDDDDDDSBSDO.", "....ODSDO......OSBMSO.", ".....OO........ODBMSO.", "...............OSBMDO.", "...............ODBSO..", "...............OSBDO..", "...............ODSO...", "...............OSDO...", "...............ODO....", "................O....."];
  var oo = ["........OOOOOO........", "......OOSBMMBSOO......", ".....OSBMHHLHMBSO.....", "....OSBMHLLHHMBSBO....", "...OSBMHLHHMHMBSBSO...", "...OSBMHHMBMHMBSBSO...", "..OSBMHMBSBMHMBSBMSO..", "..OSBMHMBSBMHLMBSBMSO.", "..OSBMHMBSBMHLMBSBMSO.", "..OSBHLMBSBMHMBSBMHSO.", "..ODSBHMBSDBMHMBSBMSO.", "..OSBMHMBSDBHLHBSBMSO.", "..OSBMHLMBSDSBHMBSBMO.", "..OSBMHMBSDSBMHMBSDBO.", "..ODSBHMBSDSBMHLMBSDO.", "..OSBMHLBSDSBHLMBSDSO.", "..ODSBMHBSDSBMHMBSDBO.", "...OSBMHBSDSBMHMBSDO..", "...ODBMHBSDSBHLMBSDO..", "...OSBMLBSDSBMHMBSDO..", "...ODSBMHSDSBMHMBSDO..", "...OSDBMHBSDBHLMBSO...", "....ODBMHSDSBMHBSDO...", "....OSDBMBSDBMLMBSO...", "....ODSBMHSDSBMHBSO...", "....OSBMBSDBMHMBSDO...", "....ODSBMSDSBHMBSDO...", "....OSDBHBSDBMLBSDO...", ".....ODSBMSDSBMBSO....", ".....OSDBMBSDBHBSO....", ".....ODSBMSDSBMBSO....", "......OSDBHBSDBSO.....", "......ODSBMSDSBMO.....", ".......ODSBSDSBO......", ".......OSDBMSDSO......", "........ODSBSDO.......", "........OSDBDSO.......", ".........ODSDO........", ".........OSOSO........", ".........O.O.O........"];
  var io = [".....OOOOOO.......", "...OOSBMHHBOO.....", "..OSBMHLLHMBSO....", ".OSBMHLHHMHMBSO...", ".OSBMHMHMBMHLHSO..", "OSBMHMBSBMHMHMBSO.", "OSBMHLBSBMHMBSMHO.", "OSBMHLBSDSBMSOSBO.", "ODBMHBSDSBSO.OSBO.", "OSBMHBSDSO...OSO..", "ODBMHBSDO.....O...", "OSBHLBSO..........", "ODBMHBSO..........", ".OBMHBSO..........", ".OSBHBO...........", ".ODBMBO...........", ".OSBHBO...........", ".ODBMSO...........", "..OSBO............", "..ODO............."];
  var Bo = ["OSBHBO.", "ODBMBSO", "OSBMHSO", "ODBHLDO", "OSBMHSO", "ODBMHDO", "OSBHLSO", "ODBMHDO", "OSBMHSO", "ODBHLDO", "OSBMHSO", "ODBMHDO", ".OBHLSO", ".OBMHDO", ".OSMHSO", ".ODBHDO", ".OSBHSO", ".ODBMDO", "..OBHSO", "..OSMDO", "..ODBSO", "..OSDBO", "..OBOSO", "..OO.OO", "..O...O"];
  function no(e) {
    a = e.material;
    s = S.Palette.pick("SKIN", e.cfg.skin, "light");
    o = a.cloth;
    i = a.trim;
    B = a.accent;
    n = a.armor;
    O = a.pants;
    t = a.mantle;
    h = a.cape;
    r = a.panel;
    return { Q: o.line, q: o.deep, c: o.shade, e: o.base, E: o.hi, N: i.line, n: i.deep, g: i.shade, G: i.base, Y: i.hi, K: i.spark, Z: B.line, z: B.deep, m: B.shade, r: B.base, R: B.hi, x: n.line, X: n.deep, j: n.shade, J: n.base, i: n.hi, I: n.spark, p: O.line, P: O.deep, u: O.shade, U: O.base, v: O.hi, A: t.line, a: t.deep, b: t.shade, B: t.base, w: t.hi, t: t.tip, T: t.tiphi, k: h.line, d: h.deep, s: h.shade, S: h.base, h: h.hi, l: h.pat, F: r.line, f: r.deep, o: r.shade, O: r.base, y: r.pat, 1: s.line, 2: s.deep, 3: s.shade, 4: s.base, 5: s.hi };
    var a;
    var s;
    var o;
    var i;
    var B;
    var n;
    var O;
    var t;
    var h;
    var r;
  }
  function Oo(S) {
    return !(!S.p || !S.p.mirror) || "left" === S.dir;
  }
  function to(S) {
    return S.g.side ? Oo(S) ? 0 : 1 : S.g.back ? 1 : 0;
  }
  var ho = ["....NG..GN....", "...NgY..YgN...", "..eNGYGGYGNJ..", ".QeNgGYYGgNJx.", ".QEeNgzzgNJix.", ".QeENGmRGNJix.", ".QceENGYNjJix.", ".QceEeNNjJJix.", ".QceEeXjjJJix.", ".QcceEXnGnJix.", ".QceeEXjjJJix.", ".QcceNGYYGNix.", "ZzmrNGKKGNrmzZ", "ZmrRNYzzYNRrmZ", "ZzmrrNGGNrrmzZ", "ZzzmmnNNnmmzzZ", "AbzrNnGGnNrzbA", "AbzrxXnnXxrzbA", "Abzr.xXXx.rzbA", "Abzr..xx..rzbA"];
  var ro = ["....xx..xx....", "...xXjjjjXx...", "..xXjJJJJjXx..", ".xXjJJiiJJjXx.", ".xXjJJJJJJjXx.", ".xXjJJJJJJjXx.", ".xXjJJJJJJjXx.", ".xXjJJJJJJjXx.", ".xXjJJJJJJjXx.", ".xXjJJJJJJjXx.", ".xXjJJJJJJjXx.", ".xXjJJJJJJjXx.", "ZzmrrmrrmrrmzZ", "ZmrRrrRRrrRrmZ", "ZzmrrmrrmrrmzZ", "ZzzmmmzzmmmzzZ", ".AbBFgGGGGgFbA", ".AbBFfOOOOfFbA", ".AbBFfOyyOfFbA", ".AbBFfOOOOfFbA"];
  var lo = ["......Ng....", ".....NGYN...", "..xXjNgGYN..", ".xXjJNGYeQ..", ".xXjJxNeEQ..", ".xXjJxeEeQ..", ".xXjJxeEcQ..", ".xXjJxcEeQ..", ".xXjJxeEcQ..", ".xXjJxcEeQ..", ".xXjJxeEcQ..", ".xXjJxnGnQ..", ".ZzmrrmrRrZ.", ".ZmrRrrRKGN.", ".ZzmrrmrzGN.", ".ZzzmmmzmnZ.", ".AbBbBxrzQ..", ".AbBbBxrzcQ.", ".AbBbBxrzeQ.", ".AbBbBxrzcQ."];
  var fo = ["......Ng....", ".....NGYN...", "..xXjNgGYN..", ".xXjJNGYix..", ".xXjJxNJix..", ".xXjJxjJix..", ".xXjJzrJix..", ".xXjJxzriX..", ".xXjJxjzrx..", ".xXjJxjJzr..", ".xXjJxjJix..", ".xXjJxnGnx..", ".ZzmrrmrRrZ.", ".ZmrRrrRKGN.", ".ZzmrrmrzGN.", ".ZzzmmmzmnZ.", ".AbBbBxrzQ..", ".AbBbBxrzcQ.", ".AbBbBxrzeQ.", ".AbBbBxrzcQ."];
  var co = ["N.........", "NYN..NNN..", "NgYNNYYGNN", ".NgYGGGYGN", "NNgGYYGGgN", "NYNggnnggN", "NgYGGYGGgN", ".NgGYGYGnN", ".NnnggnnN.", "..NNNNNN.."];
  var bo = ["x.........", "xGx..xxx..", "xgGxxGYGxx", ".xgYGjiJGx", "xxGGYGGGgx", "xiXjjXXjjx", "xjiJJiJJjx", ".xjJiJiJXx", ".xnGGYGnx.", "..xxxxxx.."];
  var Go = ["..NN.....", ".NYYNN...", "NYGGYGNN.", "NgYGYGYGN", "NGYgYgYGN", "NgGYgYGgN", "NgYgGgYgN", "NnGgYgGnN", ".NnGgGnN.", "..NNnNN.."];
  var Ho = ["...AbBzr", "...AbBzR", "..AabwzR", "..AabwBr", "..AbBwzr", ".AabBwzr", ".AabBwzR", ".AbbBwzr", ".AabBwzr", "AabbBwzr", "AabbBwzR", "AabbBwzr", "AatbBwzr", "AatbBTzr", "A.tbaT.r", "..ta.t.Z", "..t..t.."];
  var go = ["QeEEeQ", "QceGeQ", "QcGYeQ", "QceGeQ", "QcEeGQ", "QcegYQ", "QceEGQ", "QceGeQ", "QcGYeQ", "QceGeQ", "QcEeGQ", "QcegYQ", "QqcEGQ", "QqceGQ", "QqGYgQ", "QngGnQ", "NnGGnN", ".NNNN."];
  var xo = ["NgOOOOOOgN", "NgOyOOyOgN", "NgOOyyOOgN", "NgyOOOOygN", "NgOyOOyOgN", "NgOOyyOOgN", "NgyOOOOygN", "NgOyOOyOgN", "NgOOyyOOgN", ".NgOyyOgN.", ".NgyOOygN.", "..NgyygN..", "..NnGGnN..", "...NGGN...", "....NN...."];
  var Do = ["...AbBBw", "...AbBwB", "..AabBwB", "..AabBwB", "..AbbBwB", ".AabbBwB", ".AabbBwB", ".AabbwBw", ".AabbBwB", "AabbBwBw", "AabbBwBB", "AabbBwBw", "AatbBwBb", "AatbBTba", "A.tbaT.t", "..ta.t.t", "..t..t.."];
  var Wo = ["....AabBBB", "....AabBwB", "...AabBBwB", "...AabBBwB", "...AabbBwB", "..AabbBBwB", "..AabbBwBw", "..AabbBBwB", ".AabbBBwBw", ".AabbBwBwB", "AabbBBwBwB", "AabbBwBwBb", "AatbBwBwba", "AatbBTbTba", "A.tba.Tt.a", "..ta..t.t.", "..t...t..."];
  var Jo = ["zrQ", "zrc", "zRe", "zrc", "zre", "zRc", "zrE", "zrc", "zRe", "zrc", "zrE", "zRc", "zrg", "ZrG", "ZnN", ".ZN"];
  var uo = ["kSSk..", "kShSk.", "kSsSk.", "kdShSk", "kdSsSk", "kdShSk", "kdSlSk", "kdlSSk", "kdSlhk", "kdsSlk", "kdSlSk", "kdlSsk", "kdSslk", "kdsSSk", "kdSdSk", "kdkdsk", "k.kdk.", "..k.k."];
  var Mo = ["....kSk", "...kSSk", "...kShk", "..kSsSk", "..kdShk", "..kdSsk", ".kdSsSk", ".kdShSk", ".kdlSlk", ".kdSllk", "kdsSlSk", "kdSlSsk", "kdlSlhk", "kdSllSk", "kdsSSSk", "kdSsSsk", "kdsSSdk", "kdSkdsk", "kdk.kdk", ".k...k."];
  var wo = ["Zr.", "zrR", "zrr", ".zr", ".zR", "..z"];
  var No = ["xix", "XJi", "xjX", "x.x"];
  var po = [["..9.", ".99.", ".980", "9800", "8008", "7887", ".77."], [".9..", ".99.", "0890", "0089", "8008", "7887", ".77."]];
  function ko(S, e, a, s, o, i, B, n, O) {
    var t;
    var h = s + 2 - a;
    var r = o.length;
    var d = [];
    if (h >= r) {
      for (t = 0; t < r; t++)
        d.push(o[t]);
    }
    else {
      var l = r - h;
      if (l <= i) {
        for (t = 0; t < r; t++)
          (t < 1 || t > l) && d.push(o[t]);
      }
      else {
        for (t = r - h; t < r; t++)
          d.push(o[t]);
      }
    }
    Na(S, e, a, d, B, n, O);
  }
  function mo(S, e, s) {
    var o = no(e);
    var i = s === to(e);
    if (e.g.side) {
      if (1 !== s) {
        return;
      }
      Na(S, e.g.arms[1].x - 3, a.ARM_Y - 4 + e.dy, Go, o, !1);
    }
    else {
      var B = e.g.arms[s].x + 1;
      var n = a.ARM_Y + e.dy;
      var O = i ? co : bo;
      if (0 === s) {
        Na(S, B - 5, n - 5, O, o, !1);
      }
      else {
        Na(S, B + 5, n - 5, O, o, !0);
      }
    }
  }
  function vo(S, e) {
    var a;
    var s = S.arms[e];
    var o = w(s);
    var i = h(s);
    var B = i.x - o.x;
    var n = i.y - o.y;
    var O = Math.sqrt(B * B + n * n) || 1;
    var t = B / O;
    var r = n / O;
    var d = -r;
    var l = t;
    a = Math.abs(d) > .3 ? (o.x - (S.torso.x + S.torso.w / 2)) * d >= 0 ? 1 : -1 : l > 0 ? 1 : -1;
    if (S.g.side) {
      a = l > .2 ? 1 : l < -.2 ? -1 : d < 0 ? 1 : -1;
    }
    return { a: s, s: o, h: i, len: O, far: S.g.side && 0 === e && !s.front, Q: function (S, e) {
        return [o.x + t * S + d * e * a, o.y + r * S + l * e * a];
      } };
  }
  function yo(S) {
    var e = Math.max(5, Math.round(S.len - 3));
    return { mouth: e, drop: e + 2 };
  }
  function Lo(S) {
    var e = yo(S);
    var a = S.Q;
    return [a(-1, -2.4), a(e.mouth, -2.9), a(e.mouth, -1), a(e.drop + 1, 4.4), a(e.drop - 1, 5.2), a(.45 * e.mouth, 4.2), a(-1, 2.6)];
  }
  function Co(S) {
    return Math.max(4, Math.round(S.len - 1));
  }
  function jo(S, a, s) {
    var o = vo(a, s);
    var i = a.material;
    var B = i.cloth;
    var n = i.trim;
    var O = i.accent;
    var t = o.far;
    var h = o.Q;
    function r(S) {
      return [Math.round(S[0]), Math.round(S[1])];
    }
    function d(a, s, o, i, B) {
      var n = r(h(a, s));
      var O = r(h(o, i));
      e.line(S, n[0], n[1], O[0], O[1], B);
    }
    var l = yo(o);
    var f = l.mouth;
    var c = l.drop;
    u(S, Lo(o), B.line);
    u(S, [h(0, -1.5), h(f - 1, -2), h(f - 1, -.4), h(c, 3.6), h(c - 1, 4.2), h(.45 * f, 3.3), h(0, 1.7)], t ? B.shade : B.base);
    d(0, 1, .45 * f, 2.6, t ? B.base : B.hi);
    d(.45 * f, 3, c - 1, 3.6, t ? B.deep : B.shade);
    d(1, -1, f - 1, -1.3, t ? B.deep : B.shade);
    d(2, .6, f - 1, 1.4, t ? B.shade : B.base);
    d(.5 * f, 1.6, c - 2, 2.4, t ? B.deep : B.shade);
    var b = Math.max(2, Math.round(.4 * f));
    d(b, 0, b + 2, 1.6, t ? n.deep : n.shade);
    d(f - 1, -1.8, f - 1, 0, t ? n.shade : n.base);
    d(f, -.2, c, 3.2, t ? n.deep : n.base);
    d(f + 1, -.4, c - 1, 2, t ? O.deep : O.base);
  }
  function Ao(S, a, s) {
    var o = vo(a, s);
    var i = o.a;
    var B = o.h;
    var n = a.material;
    var O = n.armor;
    var t = n.trim;
    var h = o.far;
    var r = o.Q;
    function d(S) {
      return [Math.round(S[0]), Math.round(S[1])];
    }
    function l(a, s, o, i, B) {
      var n = d(r(a, s));
      var O = d(r(o, i));
      e.line(S, n[0], n[1], O[0], O[1], B);
    }
    function f(a, s, o) {
      var i = d(r(a, s));
      e.dot(S, i[0], i[1], o);
    }
    var c = Co(o);
    u(S, function (S) {
      var e = Co(S);
      var a = S.Q;
      return [a(-1, -2.3), a(e, -2), a(e, 2.4), a(-1, 2.6)];
    }(o), O.line);
    u(S, [r(0, -1.4), r(c - 1, -1.1), r(c - 1, 1.5), r(0, 1.7)], h ? O.deep : O.base);
    l(0, -.6, c - 1, -.4, h ? O.shade : O.hi);
    l(1, 1.1, c - 1, .9, h ? O.line : O.shade);
    for (var b = 3; b < c - 2; b += 3)
      l(b, -1.4, b, 1.6, O.line), f(b + 1, -.5, h ? O.hi : O.spark);
    var G = Math.max(3, Math.round(.5 * o.len));
    l(G, -1.6, G, 1.8, h ? t.deep : t.shade);
    f(G, -.6, h ? t.shade : t.hi);
    l(c - 1, -1.4, c - 1, 1.7, h ? t.deep : t.base);
    var H = h ? { x: O.line, X: O.line, J: O.deep, i: O.shade, j: O.deep } : { x: O.line, X: O.deep, J: O.base, i: O.hi, j: O.shade };
    OO(S, B.x - 1, B.y - 1, No, H, !1);
    if (i.palm) {
      e.dot(S, B.x + 2, B.y, h ? O.deep : O.base);
    }
  }
  function Qo(S, e, a) {
    if (_o(e)) {
      var s = e.material.flame;
      var o = function (S, e) {
        var a = h(S.arms[e]);
        return { x: Math.max(0, Math.min(28, a.x - 2)), y: Math.max(0, a.y - 5) };
      }(e, a);
      var i = { 6: s.line, 7: s.deep, 8: s.base, 9: s.hi, 0: s.core };
      var B = (0 | e.p.bob) + (0 | e.p.leg) + (0 | e.p.step) + (0 | e.p.atk) & 1;
      OO(S, o.x, o.y, po[B], i, !1);
    }
  }
  function _o(e) {
    return !(S.WeaponArt && S.WeaponArt.has(e.cfg) || e.g.back || "hurt" === e.p.act || "down" === e.p.act);
  }
  function Yo(S, e, a) {
    var s = to(e);
    var o = e.arms[0];
    var i = !(!o.front && !o.over);
    if (a === s) {
      jo(S, e, a);
    }
    else {
      Ao(S, e, a);
    }
    mo(S, e, a);
    if (a !== s || 0 === a && i) {
      if (1 === a && 0 === s && i) {
        Qo(S, e, 0);
      }
    }
    else {
      Qo(S, e, a);
    }
  }
  function Eo(S, e, a) {
    var s = e.torso;
    var o = qs(e);
    if (e.g.side) {
      Na(S, s.x - 6, s.y + 2, Xs(e, Mo, s.y + 2), a, !1, Rs(Us(e), 10, 10));
    }
    else {
      var i = s.y + 2;
      var B = Xs(e, uo, i);
      if (e.g.back) {
        Na(S, s.x - 3, i + 1, B, a, !0, Rs(-o, 9, 10));
      }
      else {
        Na(S, s.x + s.w + 2, i + 1, B, a, !1, Rs(o, 9, 10));
      }
    }
  }
  function Ko(S) {
    var e = {};
    S({ fillStyle: "#000000", fillRect: function (S, a, s, o) {
        for (var i = a; i < a + o; i++)
          for (var B = S; B < S + s; B++)
            e[B + "," + i] = 1;
      } });
    return e;
  }
  function qo(e, a) {
    var s = to(e);
    var o = !1;
    var i = S.Palette.pick("SKIN", e.cfg.skin, "light");
    var B = Object.create(e);
    B.material = g.sat_luc_y;
    var n = Ko(function (S) {
      for (var n = 0; n < 2; n++) {
        var O = e.arms[n];
        if (O && (a ? 1 === n || O.front || O.over : O.over && (!e.g.side || 0 !== n))) {
          o = !0;
          p(S, O, i, 0 === n);
          if (n === s) {
            jo(S, B, n);
            if (_o(B)) {
              Qo(S, B, n);
            }
          }
          else {
            Ao(S, B, n);
          }
        }
      }
    });
    return o ? function (S, e) {
      return 1 === n[S + "," + e];
    } : null;
  }
  var Uo = { O: "#131016", D: "#1d1a21", S: "#2c2731", B: "#433c47", M: "#6b6371", H: "#9f97a6", L: "#cbc6d1", W: "#efedf3", u: "#3b3540", v: "#57505c", n: "#7a5a2c", a: "#c8a060", A: "#f2d9a0", z: "#5a1018", r: "#94202a", R: "#c8423c", w: "#f3efe9", q: "#bdb6b0", t: "#249a96", T: "#62d8ca", k: "#16131a", e: "#e6e2ea" };
  var Xo = ["........O..OO..O.....", ".....O.OWOOLWOOHO....", "...O.OLWHLWWHMOLWHO..", "..OWOLWHSDSLWWLHMMBO.", ".OLWLWHSDMHLLHHMBSBSO", "OLWHWHSDMLWHMBSDSBSMO", "OWLWHSDMLWHMSDDSDSBMO", "OLWHSDMLWHMSDDDDSDSBO", "OHLSDSLWHMSDDDAnDSDSO", "OHWLWOnaaAaaaAnAnuvO.", ".OLWHO........A..vuSO", "..OWLO...........vSO.", "..OLHO...........uDO.", "...OWO...........OSDO", "..OLHO............OSO", "..OHLO.............DO", "..OLO..............SO", "...OMO.............DO", "...OLO.............O.", "....O................"];
  var Ro = [".............O..O..O........", "..........OOWLOHWLOLWO......", "........OOWLHMLWWHMHLWO.....", "......OOLWHMSSMLWLHMSHLO....", "....OOLWHMSDMHLWHMSDSMHO....", "...OLWHMSDMHLWHMSDDSBMBO....", "..OWLHSDMLWHMSDDSDDSBSO.....", ".OLHMDSLWHMSDDDSDDSDSDO.....", ".OHMDSLWHSDDOOOOODSDSO......", ".OMDSWLHDOuvuuvuunaaaAn.....", ".OHDSLWHDOuvuuvuvu..........", ".OMSDWLHSOvuuvuuvu..........", "..OSDLWMDOuvuuvuu...........", "..ODSWLHDSOuu...............", "..OSDLWMSDOvu...............", "...ODHLWDSOuO...............", "...OSWLHDSDO................", "...ODLWMSDO.................", "...OSHLWDO..................", "...ODLHLSO..................", "...OSWMHDO..................", "....OLHLO...................", "....OWLHO...................", ".....OWO....................", "......O....................."];
  var Vo = ["an", "zr", "rR", "zr", ".r", "zr", "rR", "wq", "ww", "wq", "q."];
  var zo = [".......O...O...O........", ".....OOLWOSLWOHLWOO.....", "....OOWDMSSWDDWSDLOO....", "...ODSWDMSSWDDWSDLSSO...", "..ODDSLDMDSLDSLSDLSSSO..", "..ODDDSHMDSLDSLDHHSSDO..", "..OSDDSHDMSLDSHDHSSDDO..", "..OLSDDHDMSHDSHDHSDDLO..", "...OHDDHMMSHDMMDMSDHO...", "...OHSDDMBSMDMDMSDDHO...", "....OMSDMDBMDBDBDDMO....", ".....OBSBBBBSBBBDBO.....", "......OBDBDBSDBDBO......", "......ODBDDDSSDBDO......", ".......ODSSDDDSDO.......", ".......ODDnaanSSO.......", ".......OSnrRRrnSO.......", "........OSnzznSO........", "........OSLrzLSO........", "........ODWrzWDO........", ".......OSLHrzHLSO.......", ".......ODWMrzMWDO.......", ".......OSLDrzDLSO.......", ".......OHWSrzSWHO.......", ".......ODLHrzHLDO.......", "........OWMrzMWO........", "........OLDrzDLO........", ".........OHrzHO.........", ".........OLrzLO.........", "..........OrzO..........", "...........zr..........."];
  function Fo(e) {
    a = e.material;
    s = S.Palette.pick("SKIN", e.cfg.skin, "light");
    o = a.cloth;
    i = a.white;
    B = a.trim;
    n = a.accent;
    O = a.red;
    t = a.olive;
    h = a.brown;
    r = a.teal;
    d = a.pants;
    return { x: o.line, X: o.deep, j: o.shade, J: o.base, i: o.hi, Q: i.line, q: i.deep, c: i.shade, e: i.base, E: i.hi, N: B.line, n: B.deep, g: B.shade, G: B.base, Y: B.hi, Z: n.line, z: n.deep, m: n.shade, r: n.base, R: n.hi, F: O.line, f: O.deep, o: O.base, O: O.hi, A: t.line, a: t.deep, b: t.shade, B: t.base, V: t.hi, K: h.line, k: h.deep, h: h.shade, H: h.base, U: h.hi, t: r.deep, T: r.base, y: r.hi, p: d.line, P: d.deep, u: d.shade, s: d.base, v: d.hi, 1: s.line, 2: s.deep, 3: s.shade, 4: s.base, 5: s.hi };
    var a;
    var s;
    var o;
    var i;
    var B;
    var n;
    var O;
    var t;
    var h;
    var r;
    var d;
  }
  var To = ["....xk..kQ....", "...xJkh.hkeQ..", "..xJJkHhhkeeQ.", ".xNGNkTHhkeEQ.", ".xGTGkhTHkeeQ.", ".xNGNjkhTHeEQ.", ".xJoJjxkhTeeQ.", ".xJOJjJxkeTeQ.", ".xJoJjJJxeETQ.", ".xjfJjJJxEeeQ.", ".xjJJjJJxeEeQ.", ".xjJiJjJxeeEQ.", "AbBBVBBBBVBBbA", "ZzmrrrRRrrrmzZ", "AbBBBmRRmBBBbA", "AaZzmrzzrmzZaA", "xJjJNhofQeeEeQ", "xJjJNhofQeEeeQ", "xjJjNHoOQeeEeQ", "xjJjNhfqQeEeeQ"];
  var Po = ["....xx..xx....", "...xjJJJJjx...", "..xGgJJJJgGx..", ".xjGgJJJJgGjx.", ".xJjGJJJJGjJx.", ".xJJjJJJJjJJx.", ".xJJJJJiJJJJx.", ".xJjJJJJJJjJx.", ".xJJJJiJJJJJx.", ".xJjJJJJJJjJx.", ".xJJJJJJiJJJx.", ".xJjJJJJJJjJx.", "AbBBVBBBBVBBbA", "ZzmrrrmmrrrmzZ", "AbBBBBBBBBBBbA", "AaZzmrzzrmzZaA", "xJjJJJofJJJjJx", "xJjJJJofJJJjJx", "xjJjJJoOJJjJjx", "xjJjJJfoJJjJjx"];
  var Zo = ["......kQ....", ".....xkeQ...", "..xXjxhkeQ..", ".xXjJxkTeQ..", ".xXjJxhkTQ..", ".xXjJxkhTQ..", ".xXjJJxkeT..", ".xXjJJxheQ..", ".xXjJJxkeQ..", ".xXjJJxheQ..", ".xXjJJxkeQ..", ".xXjJJxkeQ..", ".AbBBVBBBbA.", ".ZzmrrrRRzZ.", ".AbBBBBmRRz.", ".AaZzmrzzfo.", ".xXjJJhHQeo.", ".xXjJJhHQef.", ".xXjJJhHQeQ.", ".xXjJJhHQeQ."];
  var Io = ["......xQ....", ".....QxeQ...", "..QqcQXxeQ..", ".QqceQxXeQ..", ".QqceeQxeQ..", ".QqcEeQxXQ..", ".QqceEeQxQ..", ".QqceeEQxQ..", ".QqcEeeQeQ..", ".QqceEeQeQ..", ".QqcEeeQeQ..", ".QqceeEQeQ..", ".AbBBVBBBbA.", ".ZzmrrrRRzZ.", ".AbBBBBmRRz.", ".AaZzmrzzfo.", ".QqceEeQtGo.", ".QqcEeeQTyf.", ".QqceEeQtGQ.", ".QqcEeeQTQ.."];
  var $o = [".xJjJJNh", ".xJjJiNh", ".xJjJJNH", "xJjJiJNh", "xJjJJJNh", "xJjiJJNH", "xJjJJJNh", "xJjJJJNh", "xJgJJJNh", "xGJgJJNh", "xJGgJJNH", "xNNGGNNh", "xxJNNxNh", ".xxJxxhN", "..xxx.NN"];
  var Si = ["QeeEeeeQ", "QeEeeceQ", "QeeEeeeQ", "QceeEeeQ", "QeeEeceQ", "QeEeeeeQ", "QeeEeceQ", "QceeEeeQ", "QeeEeeeQ", "QeEeceeQ", "QeeeEeeQ", "QceEeceQ", "QqeeEeeQ", ".QceeEeQ", "..QceEeQ", "...QceQ.", "....QQ.."];
  var ei = ["Tt", "T.", "G.", "t.", "Y.", "T.", "E.", "E.", "c.", "o.", "o.", "f."];
  var ai = ["..xJjJJJ", "..xJjJiJ", ".xJjJJJJ", ".xJjJiJJ", ".xJjJJJJ", "xJjJJiJJ", "xJjJJJJJ", "xJjJJJiJ", "xJgJJJJJ", "xGJgJJgJ", "xJGgJgJG", "xNNGGNNN", "QcExxQcE", ".QcQ.QcQ", "..Q...Q."];
  var si = ["QeEeeQ", "QeeEcQ", "QeEeeQ", "QceEeQ", "QeeEeQ", "QeEecQ", "QeeEeQ", "QceEeQ", "QeEeeQ", "QeeEcQ", "QeEeeQ", "QceeEQ", ".QeEQ.", "..QQ.."];
  var oi = ["....xJjJJJ", "....xJjJiJ", "...xJjJJJJ", "...xJjJiJJ", "...xJjJJJJ", "..xJjJJiJJ", "..xJjJJJJJ", "..xJjJJJiJ", ".xJjJJJJJJ", ".xJgJJJgJJ", "xJGgJJGgJJ", "xJgGJJJgGJ", "xNNGGNNGGN", "xxJNNxxNNx", ".xxJxx.xx.", "..xx...x.."];
  var ii = ["....QeeEee", "....QeEeee", "...QeeEeee", "...QeEeeEe", "...QeeEeee", "..QeeEeeEe", "..QeEeeeEe", "..QeeEeeee", ".QeEeeEeee", ".QecceEcce", "QeceEcecEe", "QcEceeceEe", "QeeeEeeeEe", "QqeeeqQeeQ", ".QqeQQ.QQ.", "..QQ......"];
  var Bi = ["Qe", "Qe", "QE", "Qe", "Qe", "QE", "Qe", "Qe", "QE", "Qe", "Qe", "Qc", "Qe", ".Q"];
  var ni = [".NNNN.", "NGYYGN", "GYnnYG", "GnTTnG", "NGnnGN", ".NGGN.", "..NG..", "..Nn.."];
  var Oi = ["YG...", "Gkh..", ".kUh.", "..khN", ".NGYG", "..NGN"];
  function ti(S, a, s) {
    var o = function (S, e) {
      return vo(S, e);
    }(a, s);
    var i = a.material;
    var B = o.far;
    var n = o.Q;
    var O = s === to(a) || a.g.back;
    var t = O ? i.cloth : i.white;
    var h = i.white;
    var r = i.cloth;
    var d = i.trim;
    function l(S) {
      return [Math.round(S[0]), Math.round(S[1])];
    }
    function f(a, s, o, i, B) {
      var O = l(n(a, s));
      var t = l(n(o, i));
      e.line(S, O[0], O[1], t[0], t[1], B);
    }
    function c(a, s, o) {
      var i = l(n(a, s));
      e.dot(S, i[0], i[1], o);
    }
    var b = yo(o);
    var G = b.mouth;
    var H = b.drop;
    if (u(S, Lo(o), t.line), u(S, [n(0, -1.5), n(G - 1, -2), n(G - 1, -.4), n(H, 3.6), n(H - 1, 4.2), n(.45 * G, 3.3), n(0, 1.7)], B ? t.shade : t.base), f(0, 1, .45 * G, 2.6, B ? t.base : t.hi), f(.45 * G, 3, H - 1, 3.6, B ? t.deep : t.shade), f(1, -1, G - 1, -1.3, B ? t.deep : t.shade), f(2, .6, G - 1, 1.4, B ? t.shade : t.base), O) {
      var g = G - 3;
      f(g, -1.8, g + 2, 3.2, B ? h.shade : h.base);
      f(g + 1, -1.9, g + 3, 3.4, B ? h.deep : h.hi);
      c(g + 1, -.4, r.line);
      c(g + 2, 1.4, r.line);
      c(g + 2, 2.8, r.line);
      f(G, -.2, H, 3.2, B ? h.shade : h.base);
      f(G + 1, -.4, H - 1, 2, B ? h.deep : h.shade);
    }
    else {
      f(G, -.2, H, 3.2, B ? t.deep : t.shade);
      f(G + 1, -.4, H - 1, 2, r.base);
      c(G + 1, .6, d.base);
    }
  }
  function hi(S, e, s) {
    ti(S, e, s);
    if (s === to(e)) {
      (function (S, e, s) {
        var o = Fo(e);
        if (e.g.side) {
          if (1 !== s || Oo(e)) {
            return;
          }
          Na(S, e.g.arms[1].x - 2, a.ARM_Y - 1 + e.dy, ni, o, !1);
        }
      })(S, e, s);
    }
  }
  function ri(e) {
    return !(S.WeaponArt && S.WeaponArt.has(e.cfg));
  }
  function di(e, a) {
    var s = !1;
    var o = S.Palette.pick("SKIN", e.cfg.skin, "light");
    var i = Object.create(e);
    i.material = g.tan_mo_y;
    var B = Ko(function (S) {
      for (var B = 0; B < 2; B++) {
        var n = e.arms[B];
        if (n && (a ? 1 === B || n.front || n.over : n.over && (!e.g.side || 0 !== B))) {
          s = !0;
          p(S, n, o, 0 === B);
          ti(S, i, B);
        }
      }
    });
    return s ? function (S, e) {
      return 1 === B[S + "," + e];
    } : null;
  }
  var li = { ink: "#091923", navy: "#13283c", steel: "#244257", steelHi: "#43627a", jadeDeep: "#123e43", jadeShade: "#1c6262", jade: "#318c80", jadeHi: "#65b4a0", goldDark: "#71502b", gold: "#c8994d", goldHi: "#f0d08b", stitch: "#afa870", redDark: "#421927", red: "#872d42", redHi: "#ba5060", hair: "#111b2b" };
  function fi(S, a) {
    function s(s, o, i, B, n) {
      if (i = Math.round(i), B = Math.round(B), s = Math.round(s), o = Math.round(o), !(i <= 0 || B <= 0))
        if (a) {
          for (var O = o; O < o + B; O++)
            for (var t = s; t < s + i; t++)
              a(t, O) || e.r(S, t, O, 1, 1, n);
        }
        else {
          e.r(S, s, o, i, B, n);
        }
    }
    function o(S, e, a) {
      s(S, e, 1, 1, a);
    }
    function i(S, e, a, s) {
      a.forEach(function (a, i) {
        a.split("").forEach(function (a, B) {
          if (s[a]) {
            o(S + B, e + i, s[a]);
          }
        });
      });
    }
    return { rect: s, dot: o, line: function (S, e, a, o, i, B) {
        B = B || 1;
        S = Math.round(S);
        e = Math.round(e);
        a = Math.round(a);
        o = Math.round(o);
        for (var n, O = Math.abs(a - S), t = S < a ? 1 : -1, h = -Math.abs(o - e), r = e < o ? 1 : -1, d = O + h; s(S - Math.floor(B / 2), e - Math.floor(B / 2), B, B, i), S !== a || e !== o;)
          (n = 2 * d) >= h && (d += h, S += t), n <= O && (d += O, e += r);
      }, poly: function (S, e) {
        var a;
        var o;
        var i;
        var B;
        var n;
        var O;
        var t;
        var h = 1 / 0;
        var r = -1 / 0;
        for (a = 0; a < S.length; a++)
          h = Math.min(h, S[a][1]), r = Math.max(r, S[a][1]);
        for (i = Math.ceil(h); i <= Math.floor(r); i++) {
          for (B = [], a = 0, o = S.length - 1; a < S.length; o = a++)
            n = S[o], O = S[a], (n[1] <= i && O[1] > i || O[1] <= i && n[1] > i) && B.push(n[0] + (i - n[1]) * (O[0] - n[0]) / (O[1] - n[1]));
          for (B.sort(function (S, e) {
            return S - e;
          }), t = 0; t + 1 < B.length; t += 2)
            s(Math.ceil(B[t]), i, Math.floor(B[t + 1]) - Math.ceil(B[t]) + 1, 1, e);
        }
      }, stamp: i, motif: function (S, e) {
        i(S, e, ["..s..", ".s.s.", "s.s.s", ".s.s.", "..s.."], { s: li.stitch });
      } };
  }
  var ci = { o: "#091923", O: "#123e43", d: "#1c6262", D: "#318c80", h: "#65b4a0", H: "#9fd8c4", k: "#091923", K: "#13283c", e: "#244257", E: "#43627a", f: "#6f8fa8", N: "#3d2a12", n: "#71502b", g: "#a07a3c", G: "#c8994d", Y: "#f0d08b", y: "#fff1c4", r: "#421927", R: "#872d42", q: "#ba5060", s: "#afa870" };
  var bi = { line: "#091923", deep: "#123e43", shade: "#1c6262", base: "#318c80", hi: "#65b4a0" };
  var Gi = { line: "#091923", deep: "#13283c", shade: "#244257", base: "#43627a", hi: "#6f8fa8" };
  var Hi = { line: "#3d2a12", deep: "#71502b", shade: "#a07a3c", base: "#c8994d", hi: "#f0d08b" };
  var gi = ["...oh....ho...", "..NGhD..DhGN..", ".NGYGhDDhGYGN.", "kNgGGGnnGGGgNk", "kfEeNGGNeEeEek", "kKKNYYGgNKkKKk", "kEfGYhDgGeEeEk", "kKKGgDOgGkKkKk", "kfENggggNeEeEk", "kKKkNnnNkKkKKk", "kfEeEeEeEeEeEk", "kKkKkKkKkKkKKk", "kEeEeEeEeEeEek", "NgGGGGGGGGGGgN", "NGYGGGGGGGGYGN", "NnggggggggggnN"];
  var xi = [".N..NN..N.", ".NGnGGnGN.", ".GkYGGYkG.", ".NGGrrGGN.", "sNgYYgNs..", "..NNggNN.."];
  var Di = ["..odDhD.", "..odDhD.", "..odDhD.", "..odDhD.", "..odDhD.", "..odDhD.", "..odDhD.", "..odDhD.", ".odDDhD.", ".odDhDD.", ".odhDDD.", ".odDhDD.", "odDDhDD.", "odDsDhD.", "odsDsDD.", "odDsDhD.", "odDDhDD.", "nGGYGGn.", "NnnnnnN.", ".NNNNN.."];
  var Wi = ["rR", "Rq", "rR", "Rq", "rR", "rR", "Rq", "rR", "rR", "nG", "rR", "r."];
  var Ji = ["...ohhhhhho...", "..NGhDDDDhGN..", ".NGYGGGGGGYGN.", "kNgGGGGGGGGgNk", "kfEeEeEeEeEeEk", "kKkKkKkKkKkKKk", "kEfEeEeEeEeEek", "kKKkKkKkKkKkKk", "kfEeEeEeEeEeEk", "kKkKkKkKkKkKKk", "kEfEeEeEeEeEek", "kKKkKkKkKkKkKk", "kfEeEeEeEeEeEk", "NgGGGGGGGGGGgN", "NGYGGGGGGGGYGN", "NnggggggggggnN"];
  var ui = ["..odDhDDDDDDdo..", "..odDhDDDDDDdo..", "..odDhDDDDDDdo..", "..odDhDDDDDDdo..", "..odDhDDDDDDdo..", "..odDhDDDDDDdo..", "..odDhDDDDDDdo..", "..odDhDDDDDDdo..", ".odDDhDDDDDDdo..", ".odDhDDDsDDDdo..", ".odDhDDsDsDDdo..", "odDDhDDDsDDDDdo.", "odDhDDDsDsDDDdo.", "odhDDDsDDDsDDdo.", "odDhDDDDDDDDDdo.", "odDDhDDDDDDDDdo.", "nGGYGGGGGGGYGGn.", "NnnnnnnnnnnnnnN.", ".NNNNNNNNNNNNN.."];
  var Mi = ["....oh.h....", "..NGhDDhG...", ".NGYGhDhGYN.", ".kgGGGGGGgNk", ".kfEeEeEeNGk", ".kKkKkKkKGYk", ".kEfEeEeENgk", ".kKkKkKkKkKk", ".kfEeEeEeEek", ".kKkKkKkKkKk", ".kEfEeEeEeEk", ".kKkKkKkKkKk", ".kfEeEeEeEek", ".NgGGGGGGNGk", ".NGYGGGGGkYG", ".NnggggggNgN"];
  var wi = ["...odDhDDDDdRo.", "...odDhDDDDdRo.", "...odDhDDDDdqo.", "...odDhDDDDdRo.", "...odDhDDDDdRo.", "...odDhDDDDdRo.", "...odDhDDDDdqo.", "...odDhDDDDdRo.", "..odDDhDDDDdRo.", "..odDhDDDDDdRo.", "..odDhDDsDDdRo.", ".odDDhDsDsDdRo.", ".odDhDDDsDDdnG.", ".odhDDDsDDDdRo.", ".odDhDDDDDDdRo.", ".odDDhDDDDDdro.", ".nGGYGGGGYGGn..", ".NnnnnnnnnnnN..", "..NNNNNNNNNN..."];
  var Ni = ["..NNNN..", ".NGYYGN.", "NGfEeeGN", "NkKkKkKN", "NfEeEeEN", "NkKkKkKN", ".NGGggN.", "..NNNN.."];
  var pi = [".NNNN..", "NGYYGN.", "NfEeeGN", "NkKkKkN", "NfEeEeN", ".NGggN.", "..NNN.."];
  var ki = [".....odDhDDDDDDdo.....", "....odDhDDDDDDDDdo....", "...odDhDDDDDDDDDDdo...", "..odDDhDDDDDDDDDDDdo..", ".odDDhDDDDDDDDDDDDDdo.", "odDDhDDDDDDDDDDDDDDDdo", "odDhDDDsDDDDDDsDDDDDdo", "odDhDDsDsDDDDsDsDDDDdo", "odhDDDDsDDDDDDsDDDDDdo", "nGGYGGGGGGGGGGGGGYGGGn", "NnnnnnnnnnnnnnnnnnnnnN", ".NNNNNNNNNNNNNNNNNNNN."];
  var mi = ["...odDhDDDdRo.....", "..odDhDDDDdRo.....", "..odDhDDDDDdqo....", ".odDDhDDDDDDdRo...", ".odDhDDDDDDDDdRo..", "odDDhDDDDDDDDDdRo.", "odDhDDDsDDDDDDdRo.", "odDhDDsDsDDDDDdro.", "odhDDDDsDDDDDDDdo.", "nGGYGGGGGGGGGYGGn.", "NnnnnnnnnnnnnnnnN.", ".NNNNNNNNNNNNNNN.."];
  function vi(S, e, s) {
    y(S, e, s, { C: bi, B: Gi, T: Hi });
    (function (S, e, s) {
      if (e.g.side) {
        if (1 !== s) {
          return;
        }
        Na(S, e.g.arms[1].x - 2, a.ARM_Y - 3 + e.dy, pi, ci, !1);
      }
      else {
        var o = e.g.arms[s].x + 1;
        var i = a.ARM_Y + e.dy;
        if (0 === s) {
          Na(S, o - 4, i - 4, Ni, ci, !1);
        }
        else {
          Na(S, o + 4, i - 4, Ni, ci, !0);
        }
      }
    })(S, e, s);
  }
  function yi(e) {
    a = e.material;
    s = S.Palette.pick("SKIN", e.cfg.skin, "light");
    o = a.cloth;
    i = a.accent;
    B = a.trim;
    n = a.sleeve;
    O = a.navy;
    t = a.red;
    h = a.pearl;
    r = a.pants;
    return { x: o.line, X: o.deep, j: o.shade, J: o.base, i: o.hi, Q: i.line, q: i.deep, c: i.shade, e: i.base, E: i.hi, N: B.line, n: B.deep, g: B.shade, G: B.base, Y: B.hi, y: B.spark, u: n.line, U: n.deep, o: n.shade, O: n.base, w: n.hi, k: O.line, K: O.deep, m: O.shade, M: O.base, L: O.hi, F: t.line, f: t.deep, R: t.base, h: t.hi, a: h.deep, W: h.base, V: h.hi, p: r.line, P: r.deep, s: r.shade, S: r.base, v: r.hi, 1: s.line, 2: s.deep, 3: s.shade, 4: s.base, 5: s.hi };
    var a;
    var s;
    var o;
    var i;
    var B;
    var n;
    var O;
    var t;
    var h;
    var r;
  }
  var Li = ["....kMMMMk....", "...kEmMMmEk...", "xjJGeEmMMEeGJx", "xjJGceEmEecGJx", "xjJGQceEEccGJx", "xjJGeQceEQcGJx", "xjJGeeQceEQGJx", "xjJGEeeQceQGJx", "xjJYeEeeQceGJx", "xjJGeeEeeQcGJx", "xjJGceeEeeQYJx", "xjJGceeeEeQGJx", "xjJGceEeeeQGJx", "xjJGceeEeeQGJx", "xjJGknYYnkGJjx", "xjNgGYGGYGgNjx", "xNgGYGyyGYGgNx", "xjNnGYGGYGnNjx", "xjJGknGGnkGJjx", "xjJGcQnnQcGJjx"];
  var Ci = ["QeEEeQ", "QceEeQ", "QcEeEQ", "QceEeQ", "QeeEcQ", "QcEeeQ", "QceEeQ", "QeeEcQ", "QcEeeQ", "QceEeQ", "QeeEcQ", "QcEeeQ", "QceEeQ", "QeEeeQ", "QgYGgQ", "NGGGGN", ".NNNN."];
  var ji = ["G", "n", "n", "h", "R", "G", "V", "W", "W", "a", "g"];
  var Ai = [".....xjJ", ".....xjJ", "....xjJJ", "....xjJJ", "....xjJJ", "....xjiJ", "....xjiJ", "...xjJiJ", "...xjJJJ", "...xjJJJ", "...xjJJJ", "...xjJJJ", "..xjJiJJ", "..xjJiJJ", "..xjJJiJ", "..xjJJiG", "..xjJJJG", "..xjJJJG", ".xjJiJJG", ".xjJiJJG", ".xjJJiJG", ".xjJJJJG", ".xjJJJJG", "xjJiJJJG", "xjJiJJJG", "xgJJiJJG", "xGjJJgJG", "xGJjgYgG", "xYGGGGGG", "NnGYnGnN", ".NNNNNN."];
  var Qi = [".....xjJ", ".....xjJ", "....xjJJ", "....xjJJ", "....xjJJ", "....xjJJ", "....xjiJ", "...xjJiJ", "...xjJJJ", "...xjJJJ", "...xjJJJ", "...xjJJJ", "..xGJJiJ", "..xGJJiJ", "..xGjJJJ", "..xGjJJJ", "..xGJJJJ", "..xGJJiJ", ".xGjJJiJ", ".xGjJJJJ", ".xGJJJJJ", ".xGJJiJJ", ".xGJJiJJ", "xGjJJJJJ", "xGjJJJJJ", "xGJJJJiJ", "xGJgJJJJ", "xGgYgJJJ", "xYGGGGGG", "NnGYnGnG", ".NNNNNNN"];
  var _i = ["N........", "NYN......", "NGYNN....", "NgGYGNN..", "NgGjJiGNN", "NgjJJiJGN", "NGjJjJjGN", "NnGYGYGgN", ".NGgNNNN.", ".NYN.....", "..N......"];
  var Yi = [".N......", ".NN.....", ".NYNNNN.", "NGYGGYGN", "NgGjJiGN", "NgjJYJGN", "NGjYJjgN", ".NgGGGnN", "..NNNNN."];
  var Ei = ["....QEEEEQ....", "...QceEEecQ...", "xjJJJQeeQJJJjx", "xjJJJJQQJJJJjx", "xjJJJJJJJJJJjx", "xjJJJJJJJJJJjx", "xjJJJJJJJJJJjx", "xjJJJJJJJJJJjx", "xjJJJJJJJJJJjx", "xjJJJJJJJJJJjx", "xjJJJJJJJJJJjx", "xjJJJJJJJJJJjx", "xjJJJJJJJJJJjx", "xjJJJJJJJJJJjx", "xjJJJJiJJJJJjx", "xjJJJJJJJJJJjx", "xjJJJJJJJiJJjx", "xjJJJJJJJJJJjx", "xjJJiJJJJJJJjx", "xjJJJJJJJJJJjx"];
  var Ki = ["gG......Gg", ".GY....YG.", "..gGYYGg..", "...nGGn...", "....GY....", "....gG....", "....nG....", ".....n...."];
  var qi = ["XjJJJJJJJJjX", "XjJJJJJJJJjX", "XjJJJJiJJJjX", "XjJiJJiJJJjX", "XjJiJJJJJJjX", "XjJJJJJJiJjX", "XjJJJJJJiJjX", "XjJJiJJJJJjX", "XjJJiJYJJJjX", "XjJJJgGJJJjX", "XjJJJnGJJJjX", "XjJJgYGgJJjX", "XjJJGJGJGJjX", "XjJJgJGJgJjX", "XjJJJgGgJJjX", "XjJgJJGJJgjX", "XjGJJgYgJJGX", "GjgJgGJGgJgG", "NGjgGJJJGgGN", ".NGGJJJJGGN.", ".NnGGYYGGnN.", "..NNNNNNNN.."];
  var Ui = ["......kMMk..", ".....kmMEEQ.", "..xjJJJGQeEQ", ".xjJJJJGQceQ", ".xjJJiJGQeEQ", ".xjJJJJGQceQ", ".xjJiJJGQeeQ", ".xjJJJJGQcEQ", ".xjJJJiGQeeQ", ".xjJJJJGQceQ", ".xjJiJJGQeEQ", ".xjJJJJGQceQ", ".xjJJJJGQeeQ", ".xjJJiJGQcEQ", ".NgGGGGGGGnN", ".NGYGGGnGYGN", ".xNgGGGnYyVN", ".xjJJJJGnYGN", ".xjJJJJGQnGQ", ".xjJJJiGQceQ"];
  var Xi = ["........xjJx", "........xjJx", ".......xjJJx", ".......xjJJx", ".......xjJiJ", "......xjJJJJ", "......xjJJJJ", "......xjJiJJ", "......xjJJJJ", ".....xjJJJJJ", ".....xjJJiJJ", ".....xjJJJJJ", ".....xjJJJJJ", ".....xjJiJJJ", "....xjJJJJJJ", "....GjJJJiJJ", "....GjJJJJJJ", "....GjJiJJJJ", "...xGJJJJJJJ", "...xGJJJJiJJ", "...xGJJJJJJJ", "...xGJJJJJJJ", "..xGjJJJJJJJ", "..xGJJJiJJJJ", "..xGjJJJJJJJ", "..xGJJJJJJJJ", ".xGjJJJiJJJJ", ".xGJJJJJJJJJ", ".xGjJJJJJJJJ", ".xGjJJJJJiJJ", ".xGJgJJJJJJJ", ".xGgYgJJJJJJ", ".NGGGGGGGGGG", ".NnGYnGnGYnN", "..NNN.NNN.N."];
  var Ri = ["...xjJJJJGQeEQ.", "..xjJJJJJGQceQ.", ".xjJJiJJJGQeEQ.", ".xjJJJiJJGQeeQ.", ".xjJJJiJJGQcEQ.", ".xjJJJJiJGQeEQ.", ".xjJJJJiJGQeeQ.", "xjJJJiJJJGQcEQ.", "xjJJJiJJJGQeEQ.", "xjJJJJiJJGQeeQ.", "xjJJJJiJJGQcEQ.", "xjJJJJJiJGQeEEQ", "xjJgJJJJgGQeeEQ", "xjJGgJJgYGQcEEQ", "xgJJGJgJGGQeeEQ", "NGGGGGGGGGGgYGN", ".NNNNNNNNNNNNN."];
  var Vi = ["G", "n", "R", "f", "G", "V", "a", "R", "F"];
  function zi(S) {
    var e = Math.max(7, S.len);
    return { L: e, low: e + 2.2, tip: Math.max(3, e - 3.6), ko: 7.6 };
  }
  function Fi(S, e) {
    var a = vo(S, e);
    var s = a.Q;
    a.Q = function (S, e) {
      var a = s(S, e);
      return [Math.min(31, Math.max(0, a[0])), Math.max(0, a[1])];
    };
    return a;
  }
  function Ti(S, s, o) {
    (function (S, a, s) {
      var o = Fi(a, s);
      var i = a.material;
      var B = o.far;
      var n = o.Q;
      var O = i.sleeve;
      var t = i.trim;
      var h = i.navy;
      if (a.g.side) {
        !function (S, a, s) {
          var o = Math.max(7, a.len);
          var i = a.Q;
          var B = a.far;
          var n = s.sleeve;
          var O = s.trim;
          var t = s.navy;
          function h(S) {
            return [Math.round(S[0]), Math.round(S[1])];
          }
          function r(a, s, o, B, n) {
            var O = h(i(a, s));
            var t = h(i(o, B));
            e.line(S, O[0], O[1], t[0], t[1], n);
          }
          u(S, [i(-1, -2.5), i(o - 2, -3.3), i(o + 1, -3.1), i(o + 2.7, -1), i(o + 3, 2), i(o + 1.6, 4.6), i(o - 2.5, 5.5), i(.4 * o, 4.3), i(-1, 2.8)], n.line);
          u(S, [i(0, -1.6), i(o - 2, -2.3), i(o + .6, -2.1), i(o + 1.8, -.6), i(o + 2, 1.8), i(o + .8, 3.8), i(o - 2.4, 4.5), i(.4 * o, 3.3), i(0, 1.9)], B ? n.shade : n.base);
          r(0, 1.2, .45 * o, 3, B ? n.base : n.hi);
          r(1.5, -.8, o - 3, -1.4, B ? n.deep : n.shade);
          r(.5 * o, 3.4, o - 3, 3.9, B ? n.deep : n.shade);
          u(S, [i(o - 2.6, -1.2), i(o - .4, -2), i(o + 1.2, -.6), i(o + 1.3, 1.8), i(o - .2, 3.4), i(o - 2.6, 3.4), i(o - 3.4, 1)], B ? t.shade : t.base);
          for (var d = [[o - 2.6, -1.2], [o - .4, -2], [o + 1.2, -.6], [o + 1.3, 1.8], [o - .2, 3.4], [o - 2.6, 3.4], [o - 3.4, 1], [o - 2.6, -1.2]], l = 0; l < d.length - 1; l++)
            r(d[l][0], d[l][1], d[l + 1][0], d[l + 1][1], B ? O.shade : l < 2 || l > 5 ? O.hi : O.base);
          r(o - 1.6, -.6, o + .2, -.8, t.hi);
        }(S, o, i);
      }
      else {
        var r = zi(o);
        var d = r.L;
        var l = r.low;
        var f = r.tip;
        var c = r.ko;
        u(S, function (S) {
          var e = zi(S);
          var a = S.Q;
          var s = e.L;
          var o = e.tip;
          var i = e.ko;
          return [a(-1, -2.6), a(s - 1.5, -2.9), a(s - .6, -1.6), a(s - .6, 1.4), a(e.low, 2.2), a(e.low - .6, 3.8), a(o, i), a(o - 1.4, i), a(.35 * s, .58 * i), a(-1, 2.9)];
        }(o), O.line);
        u(S, [n(0, -1.6), n(d - 2.2, -2), n(d - 1.5, -.8), n(d - 1.4, 1.6), n(l - 1.6, 2.4), n(f - .6, c - 1.2), n(f - 1.6, c - 1), n(.35 * d, .58 * c - 1), n(0, 1.9)], B ? O.shade : O.base);
        G(0, 1.2, .35 * d, .58 * c - 1.2, B ? O.base : O.hi);
        G(.4 * d, .58 * c - .6, f - 1.6, c - 1.4, B ? O.base : O.hi);
        G(1.5, -.6, d - 2.6, 0, B ? O.deep : O.shade);
        G(2, 1.4, d - 1.8, .5 * c, B ? O.deep : O.shade);
        G(1, -1.4, d - 2.4, -1.8, B ? O.shade : O.deep);
        G(l - .4, 2.4, f + .5, c - .4, B ? h.shade : h.base);
        G(l - 1.2, 2.2, f - .4, c - .8, B ? t.shade : t.base);
        G(f + .4, c - 1.6, f - .6, c - .8, B ? t.base : t.hi);
        G(d - 1.4, -2.4, d - 1.4, 1.2, B ? t.deep : t.shade);
      }
      function b(S) {
        return [Math.round(S[0]), Math.round(S[1])];
      }
      function G(a, s, o, i, B) {
        var O = b(n(a, s));
        var t = b(n(o, i));
        e.line(S, O[0], O[1], t[0], t[1], B);
      }
    })(S, s, o);
    (function (S, e, s) {
      var o = yi(e);
      if (e.g.side) {
        if (1 !== s) {
          return;
        }
        Na(S, e.g.arms[1].x - 3, a.ARM_Y - 3 + e.dy, Yi, o, !1);
      }
      else {
        var i = e.g.arms[s].x + 1;
        var B = a.ARM_Y + e.dy;
        if (0 === s) {
          Na(S, i - 5, B - 5, _i, o, !1);
        }
        else {
          Na(S, i + 5, B - 5, _i, o, !0);
        }
      }
    })(S, s, o);
  }
  var Pi = { W: "#fdf6ea", w: "#f2e7d9", l: "#dccabb", h: "#b09786", g: "#84665c", 1: "#fde9c0", 2: "#f9c85e", 3: "#f39a2c", 4: "#e2602c", 5: "#b32a26", 6: "#7a1a1e", 7: "#2c1216", F: "#f8ecd9", f: "#e6d1b4", u: "#bd9670", v: "#8a664c", x: "#4a3229", M: "#6f5150", B: "#533a3b", b: "#3d2a2c", n: "#2a1a1e", N: "#170a0d", R: "#dc5640", S: "#b8322b", s: "#8f2222", t: "#651a1c", T: "#3d0d10", G: "#d9a441", Y: "#f8db85", e: "#b98a30", E: "#8a6420", z: "#54360f", C: "#f3e6cc", c: "#d9c39c", a: "#b39a78", A: "#7c644a", U: "#a9c4d4", V: "#6f8fa6", X: "#4a6680", Z: "#22323f", J: "#c9b39a", K: "#9a836b", L: "#6d5a48", Q: "#4d3f35", q: "#2a2020", O: "#d0382e", P: "#f7ede2", o: "#7f1b1c", D: "#d8604a", d: "#b8443a", m: "#8b3a30", k: "#140b0d", p: "#2b1c1f", r: "#42302f", y: "#5f4645", j: "#150c0e" };
  var Zi = ["............7.55.7..7..........", ".........555544444545..........", ".......7.44432222333445........", ".......53322211ww222234557.....", "....75443211whwwwwwW123445.....", "....54332hwhwhwWwwhwh122347....", "...753221WwwwhwWwwhwhwh1245....", "...5421whwhwwhwWwwhwwhww13457..", "..5542hwwwwwhwwWhwwhwwwh12345..", ".75432whwwwhwhhhhhhwhwhww1245..", "..432WhwhwwhhhhhhhhWwhwhWw237..", "..521wwhwwhhhhhhhhhhwwhwwh345..", "..542hwwwhhhhhhhhhhhhwwhW1244..", ".55421wwhhhhhhhhhhhhhwwwwh23457", "75421hhwwhhhhhhhhhhhhWhwww1245.", ".5421wwwwwhhhhhhhhhhhhwhhh124..", "..421hhhhhhhhhhhhhhhhhhhhhhww..", "..wwhhhhhhhhhhhhhhhhhhhhhhhww..", ".hwwWwh.................hwWwwh.", ".hwwwwhh...............hhwwwwh.", ".hwWwww.................wwwWwh.", ".211www.................www112.", ".33222h.................h22233.", ".44433h.................h33444.", ".w55wwwh...............hwww55w.", ".w7Wwwwh...............hwwwW7w.", "11wWwhw.................whwWw11", "322211w.................w112223", ".4333whh...............hhw3334.", ".554wwhw...............whww455.", ".w7Wwwwwh.............hwwwwW7w.", ".wwWwwww...............wwwwWww.", "2211whww...............wwhw1122", "333222whW.............Whw222333", ".4443wwhWw...........wWhww3444.", ".555WwwwWwh.........hwWwwwW555.", "..wwWwwwwwh.........hwwwwwWww..", ".11wwwhWwwh.........hwwWhwww11.", ".322111Www...........wwW111223.", "..4333wWww...........wwWw3334..", "..554wwwwh...........hwwww455..", "...7hwWwwh...........hwwWwh7...", "....wwWww.............wwWww....", "....211ww.............ww112....", "....33222.............22233....", "....4443...............3444....", ".....55.................55....."];
  var Ii = [".....oooooooo.....", "..oOPOPOPOPOPOPo..", ".oPOPOPOPOPOPOPOo.", "..eGGGGGzYGGGGGe..", "GYGVUVXVGGVUVXVGYG", "GzGCCCCCCCCCCCCGzG", "eGLqqq.....qqqKLGe", "OOLJ..q...q...JLOO", "OoLK..........KLoO", "wWLK..........KLWw", "WPLJ..........JLPW", "wWLK..........KLWw", "wlLKD.......D.KLlw", "WwLDdd.....ddDJLwW", "wlLK...mmmm.k.KLlw", "12LK..........KL21", "23LJ..........JL32", "34LKJ........JKL43", "45LKJ........JKL54", ".6LKJ........JKL6.", "..LKJ........JKL..", "..LK..........KL..", "..LK..........KL..", "..L............L..", "..L............L.."];
  var $i = ["........v", ".....vvvu", "..vvvfffu", "vvffuFffu", "uFfffuFfu", "uuFfffuFv", "ufuFfffu.", "uffuFffv.", "ufufuFu..", "uFvffuu..", "uu.uufu..", "vu.uvvu..", ".v.v..v.."];
  var SB = ["v........", "uvvv.....", "ufffvvv..", "uffFuffvv", "ufFufffFu", "vFufffFuu", ".ufffFufu", ".vffFuffu", "..uFufufu", "..uuffvFu", "..ufuu.uu", "..uvvu.uv", "..v..v.v."];
  var eB = ["...xfF..Ffx...", ".xfFfu..ufFfx.", "xfFfufvvfufFfx", "..NOPOPOPOPb..", "..NbPOPOPOMb..", "..NbBOPOPBMb..", "..NbBBPOBBBb..", "..NbBBPPBBMb..", "..NbBBPcBBMb..", "..NbBBBaBBMb..", "..NbBBBBBBBb..", ".TRRReGRRRRRT.", ".TSSGYzGSSSST.", ".TSSeGGeSSSST.", ".TsssRSsssssT.", "..NbBSBCBBMb..", "..NbBSBcBBMb..", "..NbBGBaBBMb..", "..NbBYBBBBBb..", "..NbBBBBBBMb.."];
  var aB = ["cCCCCc", "cCCCCc", "cCCCCc", "cCCCCc", "cCCCCc", "cCCCCc", "cCCCCc", "cCSSCc", "cSCCSc", "cSsSSc", "cSCCSc", "cCSSCc", "cCCCCc", "cCSSCc", "cSCCSc", "acCCca", "acCCca", ".acca.", "..aa.."];
  var sB = ["...NbBBBBBBBBbN...", "...NbBBBBBBBBbN...", "...NMBBBBBBBBMN...", "...NbBBBBBBBBbN...", "...NGBBBBBBBBGN...", "...NMBBBBBBBBMN...", "..NbBBBBBBBBBBbN..", "..NSBBBBBBBBBBSN..", "..SCSBBBBBBBBSCS..", ".SCsCSBBBBBBSCsCS.", "..SCSBBBBBBBBSCS..", "..NSMBBBBBBBBMSN..", ".NbBBGBBBBBBGBBbN.", ".NbBBBBBBBBBBBBbN.", ".NbBMBBBBBBBBMBbN.", ".NbBBBBBBBBBBBBbN.", "cCcCcCcCcCcCcCcCcC", ".abBBaBBBaBBBaBbNa"];
  var oB = ["......5437577542.", ".....75375475432h", "....45432435432ww", "..7543421434321Ww", "...54232ww2w21wwW", "....32wwwhwwhwwh.", "...432hwwwwhhhh..", "..5431WWWWhhwww..", "..5431wwwwwwwwh..", "...431wwwhhhhw...", "..32wwwWWwwwwh...", ".5431Wwwwwwwhw...", ".5432wwwwhWwwh...", "..5421hwWWwww....", "..hhwwwWwwwhwh...", "..2wwWwwwwhwwh...", ".431WwwwhWwwh....", ".4321wwwWwwhw....", ".5432hwWwwhww....", "..hwwwWwwhwwh....", "..wwwWwwhwwww....", ".21wWwwhWwwww....", ".321wwhWwwhwh....", ".4321hWwwhwww....", "7543wWwwhwwhw....", "..wwwwwwWwwww....", ".1wwWwwWwwhwh....", ".21Wwwhwwhwwwh...", ".321whWwwWwhwh...", ".4432Wwwhwwhw....", ".55wwWwwWwwww....", "..wwWwwhwwhwh....", ".hwwwwhWwwwwh....", ".21Wwwwwwhww.....", ".321whWwwWww.....", ".4332wwwhWwh.....", ".54wwWwwwwwh.....", "..hwwWwhWww......", "..hwWwwhWwh......", "..21Wwwwwwh......", "..3221hWww.......", "..443wwWww.......", "..55.wwWwh.......", "....hwwwwh.......", "....1wWww........", ".....2211........", ".....333.........", ".....54..........", ".....7..........."];
  var iB = [".lw.ooooooo...", ".wWoOPOPOPOo..", ".loPOPOPOPOPo.", "weGGGGGGGGGGYe", "lVUVXVUXVUVXGE", ".ZGYGCCCCCCCCZ", ".LGzG....qqq..", ".LeGe.......q.", ".LOO..........", ".LOo..........", ".LwW..........", ".LWP..........", ".LwW....D.....", ".Lwl.....Dd...", ".LWw.....k.mm.", ".Lwl..........", ".L12..........", ".L23K.........", ".L34K.........", ".L45K.........", ".LK6K.........", ".LKJK.........", ".LKJ..........", ".LKJ..........", ".LKJ..........", ".LK...........", ".LK..........."];
  var BB = ["......v......", "..vvvvfvvvv..", "vvfffuFfffuvv", "uuFfffuFfffuu", "ufuFfffuFfffu", "uffuFfffuFOfu", "ufffuFfffuFPu", "vufvfuufvfuOu", ".vubuvvuBuPvv", "..vbvBBvBvO..", "..NbBBBBBNP..", ".TRRRRRRReGe.", ".TSSSSSSSGYG.", ".TSSSSSSSeGe.", ".TssssssssRS.", "..NbBBBBBMNS.", "..NbBBBBBMNS.", "..NbBBBBBBNG.", "..NbBBBBBMNY.", "..NbBBBBBMN.."];
  var nB = [".....NbBBBBBBcCc", ".....NbBBBBBBcCc", ".....NbBMBBBBcCc", "....NbBBBBBBBcCc", "....NbBBBBBBBcCc", "....NbBMBBBBBcCc", "....NbSBBBBBBcCc", "...NbSCSBBBBBcSc", "...NSCsCSBBBBcSS", "...NbSCSBBBBBcSc", "...NbBSBBBBBBcCc", "..NbBMBBBBBBBcCc", "..NbBBBBBBBBBcCc", "..NbBBBBBBBBBcCc", "..NbBMBBBBBBBcC.", ".NbBBBBBBBBBBcC.", "CcCcCcCcCcCcCcCc", ".NaBMBaBBBaBBBa."];
  var OB = ["..xfFFfx.", ".xfFfFfux", "xfFfFfFuv", "xfufFfuuv", ".xvufuFv.", "..xvufv..", "...xvv..."];
  var tB = ["vvvvvvvvvvvvvvvvvvvv", "uuFfffuFfffuFfffuFfu", "ufuFfffuFfffuFfffuFu", "uffuFfffuFfffuFfffuu", "ufffuFfffuFfffuFfffu", "uFfffuFfffuFfffuFffu", "uuFfufuFfufuFfufuFfu", "ufuFvffuFvffuFvffuFv", "uufu.uufu.uufu.uufu.", "uvvu.uvvu.uvvu.uvvu.", "v..v.v..v.v..v.v..v."];
  var hB = ["............7.55.7..7..........", ".........555544444545..........", ".......7.44432222333445........", ".......53322211ww222234557.....", "....75443211whwwwwwW123445.....", "....54332hwhwhwWwwhwh122347....", "...753221WwwwhwWwwhwhwh1245....", "...5421whwhwwhwWwwhwwwww1345...", "..5542hwwwwwhhwWwwwhwwwh12345..", ".75432whwhwhwwhWWhwwhwhww1245..", "..432WwwhwhwWlllllwhwhwhWw237..", "..521wwhwhhwlllllllWwwhwwh345..", "..542hwwwhhllll44lllWwwhW1244..", ".55421whhwhlll5335llWhwwwh23457", "75421hhwwwlllll44llllhhhww1245.", ".5421wwwwwhllllGYllllhwwhh124..", "..421hhhhwwwwwweGwwwwww.hwWw...", "..hwWwh.wwwwwwwWWwwwwww.hwWwh..", "..hwwwh..wwwwwWwwWwwww..hwwwh..", "..wWwhh..wwwwwwllwwwww..hhwWw..", "..wWwhh...wwww1221www...hhwWw..", ".211ww.....www3443ww.....ww112.", ".3322w.......LK55J.......w2233.", "..443hh......LKJKL......hh344..", "..55whh......JKLKL......hhw55..", ".hwWwwh......LKLKL......hwwWwh.", ".1wwww.......LKLJL.......wwww1.", ".2211w.......LJLKL.......w1122.", ".4333hw......LKLKL......wh3334.", ".554whw......LKLKJ......whw455.", ".h7WwWw.......KJK.......wWwW7h.", ".hwWwWw.......KLK.......wWwWwh.", ".111hwh.......KLK.......hwh111.", ".3322whW......KLJ......Whw2233.", ".444WwwWw.....JLK.....wWwwW444.", ".55wWwwWw.....KLK.....wWwwWw55.", "..wwwhwww.....hWh.....wwwhwww..", "..wWwhWwh..hwwwWwwwh..hwWhwWw..", ".2221wWwh..wwhwWwhww..hwWw1222.", "..333wWw...wWhwWwhWw...wWw333..", "..54hwww...wWhwWwhWw...wwwh45..", "..7.wWwh...wWhwWwhWw...hwWw.7..", "....wWwh...wWhwWwhWw...hwWw....", "...211w....wWhwWwhWw....w112...", "...3322...hwWhwWwhWwh...2233...", "....443...222hwWwh222...344....", "....55....433hwWwh334....55....", "...........552222255...........", "............7.333.7............", "..............555..............", "...............7..............."];
  var rB = ["...NbBBBBBBBBbN...", "...NbBBBBBBBBbN...", "...NbBMBBBBMBbN...", "...NbBBBBBBBBbN...", "...NbBBBBBBBBbN...", "...NbBMBBBBMBbN...", "..NbBBBBBBBBBBbN..", "..NbSBBBBBBBBSbN..", "..NSCSBBBBBBSCSN..", "..SCsCSBBBBSCsCS..", "..NSCSBBBBBBSCSN..", "..NbSMBBBBBBMSbN..", ".NbBBBBBBBBBBBBbN.", ".NbBBBBBBBBBBBBbN.", ".NbBMBBBBBBBBMBbN.", ".NbBBBBBBBBBBBBbN.", "cCcCcCcCcCcCcCcCcC", ".abBMaBBBaBBBaBbNa"];
  function dB(S) {
    return function (e, a) {
      return a < 0 || a > 63 || e < 0 || e > 31 || !(!S || !S(e, a));
    };
  }
  function lB(S, e, a, s) {
    return Rs(S, e - s, a);
  }
  function fB(S, e, a, s, o, i, B, n) {
    Na(S, e.head.x - i + s, e.head.y - 6 + o, a, Pi, !1, B, n);
  }
  function cB(S, e, a, s, o, i, B, n) {
    Na(S, e.torso.x - i + s, e.torso.y - 24 + o, a, Pi, !1, B, n);
  }
  function bB(S, e, a, s, o, i, B, n, O, t) {
    ko(S, e.torso.x - i + s, e.torso.y + e.torso.h - 42 + o, B, a, n, Pi, t, O);
  }
  function GB(S, a, s) {
    var o = vo(a, s);
    var i = o.far;
    var B = o.Q;
    var n = o.len;
    var O = Math.max(4, Math.round(n - 5));
    u(S, [B(-1, -2.4), B(O + 1, -2.2), B(O + 1, 2.2), B(-1, 2.5)], Pi.N);
    u(S, [B(0, -1.6), B(O + 1, -1.4), B(O + 1, 1.4), B(0, 1.7)], i ? Pi.b : Pi.B);
    u(S, [B(1, -1.5), B(O, -1.3), B(O, -.2), B(1, -.2)], i ? Pi.B : Pi.M);
    var t = B(O + 1, -2);
    var h = B(O + 1, 2);
    var r = B(O + 3, -2);
    var d = B(O + 3, 2);
    u(S, [t, h, d, r], i ? Pi.u : Pi.f);
    e.line(S, Math.round(r[0]), Math.round(r[1]), Math.round(d[0]), Math.round(d[1]), i ? Pi.t : Pi.S);
    var l = B(O + 1, 0);
    e.dot(S, Math.round(l[0]), Math.round(l[1]), i ? Pi.f : Pi.F);
  }
  function HB(S, e, a) {
    GB(S, e, a);
    (function (S, e, a) {
      var s = w(e.arms[a]);
      if (e.g.side) {
        if (1 !== a) {
          return;
        }
        Na(S, s.x - 3, s.y - 3, OB, Pi, !1);
      }
      else {
        if (0 === a) {
          Na(S, s.x - 9 + 5, s.y - 26 + 22, $i, Pi, !1);
        }
        else {
          Na(S, s.x - 22 + 18, s.y - 26 + 22, SB, Pi, !1);
        }
      }
    })(S, e, a);
  }
  function gB(e, a) {
    var s = !1;
    var o = S.Palette.pick("SKIN", e.cfg.skin, "light");
    var i = Object.create(e);
    i.material = g.toc_truong_y;
    var B = Ko(function (S) {
      for (var B = 0; B < 2; B++) {
        var n = e.arms[B];
        if (n && (a ? 1 === B || n.front || n.over : n.over && (!e.g.side || 0 !== B))) {
          s = !0;
          p(S, n, o, 0 === B);
          GB(S, i, B);
        }
      }
    });
    return s ? function (S, e) {
      return 1 === B[S + "," + e];
    } : null;
  }
  function xB(e) {
    var a = S.CONFIG && S.CONFIG.CHAR_W || 32;
    var s = S.CONFIG && S.CONFIG.CHAR_H || 64;
    return { fillStyle: "#000000", fillRect: function (S, o, i, B) {
        var n = Math.max(0, S);
        var O = Math.max(0, o);
        var t = Math.min(a, S + i);
        var h = Math.min(s, o + B);
        if (!(t <= n || h <= O)) {
          e.fillStyle = this.fillStyle;
          e.fillRect(n, O, t - n, h - O);
        }
      } };
  }
  function DB(S, e) {
    var a = vo(S, e);
    var s = a.a;
    if (s.bent) {
      var o = a.s;
      var i = { x: s.jx, y: s.jy };
      var B = a.h;
      var n = S.torso.x + S.torso.w / 2;
      var O = function (e, a) {
        var s;
        var o = a.x - e.x;
        var i = a.y - e.y;
        var B = Math.sqrt(o * o + i * i) || 1;
        var O = o / B;
        var t = i / B;
        var h = -t;
        var r = O;
        s = Math.abs(h) > .3 ? (e.x - n) * h >= 0 ? 1 : -1 : r > 0 ? 1 : -1;
        if (S.g.side) {
          s = r > .2 ? 1 : r < -.2 ? -1 : h < 0 ? 1 : -1;
        }
        return { p: e, l: B, ux: O, uy: t, nx: h * s, ny: r * s };
      };
      var t = O(o, i);
      var h = O(i, B);
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
  function WB(S, e, a) {
    for (var s = [], o = S.length, i = 0; i < o; i++) {
      var B = S[i];
      var n = S[(i + 1) % o];
      var O = a < 0 ? B[0] <= e : B[0] >= e;
      var t = a < 0 ? n[0] <= e : n[0] >= e;
      if (O && s.push(B), O !== t) {
        var h = (e - B[0]) / (n[0] - B[0]);
        s.push([e, B[1] + (n[1] - B[1]) * h]);
      }
    }
    return s;
  }
  function JB(S, e, a, s) {
    if (void 0 !== e.elbow) {
      var o;
      var i = e.elbow;
      var B = WB(a, i, -1);
      var n = WB(a, i, 1);
      var O = 1 / 0;
      var t = -1 / 0;
      for (B.length > 2 && u(S, B.map(function (S) {
        return e.Q1(S[0], S[1]);
      }), s), n.length > 2 && u(S, n.map(function (S) {
        return e.Q2(S[0], S[1]);
      }), s), o = 0; o < B.length; o++)
        Math.abs(B[o][0] - i) < 1e-9 && (O = Math.min(O, B[o][1]), t = Math.max(t, B[o][1]));
      if (!(O > t)) {
        var h = e.Q1(i, 0);
        u(S, [h, e.Q1(i, t), e.Q2(i, t)], s);
        u(S, [h, e.Q1(i, O), e.Q2(i, O)], s);
      }
    }
    else {
      u(S, a.map(function (S) {
        return e.Q(S[0], S[1]);
      }), s);
    }
  }
  function uB(S, a, s, o, i, B, n) {
    var O = a.elbow;
    if (void 0 !== O && (s - O) * (i - O) < 0) {
      var t = o + (B - o) * (O - s) / (i - s);
      uB(S, a, s, o, O, t, n);
      return void uB(S, a, O, t, i, B, n);
    }
    var h = a.pt(s, o);
    var r = a.pt(i, B);
    e.line(S, h[0], h[1], r[0], r[1], n);
  }
  function MB(S, a, s, o, i) {
    var B = a.pt(s, o);
    e.dot(S, B[0], B[1], i);
  }
  function wB(S, a, s, o) {
    for (var i = a.torso, B = i.x + (i.w >> 1), n = 0; n < 2; n++) {
      var O = a.legs[n];
      if (a.p.sit) {
        var t = a.legs[1 - n];
        e.fatLine(S, O.x + 1, O.y, O.x + (n ? 3 : -2), O.knee, 5, s.shade);
        e.fatLine(S, O.x + (n ? 3 : -2), O.knee, B + (n ? -3 : 2), O.foot - 2, 5, s.base);
        e.line(S, O.x + (n ? 3 : -2), O.knee - 1, B + (n ? -3 : 2), O.foot - 3, s.hi);
        e.r(S, Math.min(O.x, t.x) - 1, O.foot - 1, Math.abs(O.x - t.x) + O.w + 2, 1, s.line);
      }
      else {
        M(S, O.x - (o ? 1 : 0), O.y, O.w + (o ? 2 : 0), O.h, s);
        if (!(a.g.side)) {
          e.r(S, O.x + (n ? 0 : O.w - 1), O.y + 3, 1, Math.max(1, O.h - 8), s.line);
        }
      }
    }
  }
  function NB(S, e, a) {
    return S.p.sit ? a : e;
  }
  function pB(S, e, a) {
    var s = e.material;
    var o = s.cloth;
    var i = s.trim;
    var B = DB(e, a);
    var n = B.far;
    var O = Math.max(7, B.len - 2);
    JB(S, B, [[-1, -2.3], [.5 * O, -2.6], [O - .6, -3], [O + 3.4, 2.4], [O + 3.2, 5.2], [O + 1.2, 6.8], [O - 2.6, 7], [.5 * O, 4.2], [-1, 2.4]], o.line);
    JB(S, B, [[0, -1.4], [.5 * O, -1.7], [O - 1, -2.1], [O + 2.3, 2.5], [O + 2.2, 4.5], [O + .7, 5.8], [O - 2.4, 5.9], [.5 * O, 3.3], [0, 1.6]], n ? o.shade : o.base);
    uB(S, B, .5, .9, .5 * O, 2.9, n ? o.base : o.hi);
    uB(S, B, .5 * O, 3.2, O - 1.4, 5.2, n ? o.base : o.hi);
    uB(S, B, 1.5, -.7, O - 2.4, -1.3, n ? o.deep : o.shade);
    uB(S, B, .45 * O, 1.2, O + .6, 3.4, n ? o.deep : o.shade);
    uB(S, B, O - 1.3, -2.3, O + 2.3, 3.1, n ? i.shade : i.base);
    uB(S, B, O - 2.1, -2.1, O + 1.4, 3.4, n ? i.deep : i.shade);
    uB(S, B, O + 2.3, 3.3, O + 1.8, 5.1, n ? i.deep : i.base);
    MB(S, B, O - 1, -1.9, n ? i.base : i.hi);
    MB(S, B, O - 1.2, 4.3, n ? i.shade : i.base);
    MB(S, B, O - .3, 4.7, n ? i.base : i.hi);
    MB(S, B, O - 2.2, 4.6, n ? i.deep : i.shade);
  }
  g.toc_truong_y = { cloth: { line: Pi.N, deep: Pi.n, shade: Pi.b, base: Pi.B, hi: Pi.M }, trim: { line: Pi.A, deep: Pi.a, shade: Pi.c, base: Pi.C, hi: Pi.F }, pants: { line: Pi.j, deep: Pi.p, shade: Pi.r, base: Pi.y, hi: Pi.M } };
  var kB = [".a.", ".a.", ".Y.", ".J.", "JiJ", "jXj", ".J.", ".n.", ".G.", "gYg", "gGg", ".g."];
  var mB = ["HS.SH", "SsASs", ".aAa."];
  var vB = [".GY..", "G.gGY", ".gG.."];
  var yB = ["..YGY..", ".G.g.G.", "GgY.YgG", "...g..."];
  function LB(S, e, a, s, o) {
    return [[-2.2, S], [-2.3, -1.2], [-1.8, 0], [-1, 1.2], [0, 2.1], [1.2, e - .1], [a, e], [s, o], [s, -o], [a, S]];
  }
  function CB(S, e, a) {
    var s = e.material;
    var o = s.cloth;
    var i = s.leather;
    var B = s.metal;
    var n = DB(e, a);
    var O = n.far;
    var t = Math.max(6, n.len - 1.5);
    var h = Math.max(4, t - 4);
    var r = .45 * h;
    JB(S, n, LB(-2.6, 2.8, r, h + .5, 2.1), o.line);
    JB(S, n, [[-1.4, -1.7], [-.9, -.4], [-.2, .8], [.9, 1.7], [r, 1.9], [h, 1.2], [h, -1.1], [r, -1.7]], O ? o.shade : o.base);
    uB(S, n, .4, .9, r + 1, 1.3, O ? o.base : o.hi);
    uB(S, n, r + .6, -1.2, h - .6, .4, O ? o.deep : o.shade);
    JB(S, n, [[h - .4, -1.9], [h + .6, -2.3], [t - .5, -2.1], [t + .2, -1.2], [t + .2, 1.2], [t - .5, 2.1], [h + .6, 2.3], [h - .4, 1.9]], i.line);
    JB(S, n, [[h + .4, -1.3], [t - .6, -1.2], [t - .6, 1.2], [h + .4, 1.3]], O ? i.deep : i.shade);
    uB(S, n, h + .6, .6, t - 1, .6, O ? i.shade : i.base);
    var d = (h + t) / 2;
    uB(S, n, d, -1.3, d, 1.3, i.line);
    MB(S, n, d, .6, O ? B.shade : B.base);
  }
  var jB = ["hMMh", "M..M", "hMMh"];
  var AB = ["mMM", "ahh", "mMM"];
  var QB = [".aAAAAAa.", "aSsSHSSsa", ".aAsAsAa."];
  var _B = [".aa.", "aSHa", "aAsa", ".aa."];
  function YB(S, a, s) {
    for (var o = 1; o < a.length; o++) {
      var i = a[o - 1];
      var B = a[o];
      e.fatLine(S, i[0], i[1], B[0], B[1], 2, s.deep);
      e.line(S, i[0], i[1], B[0], B[1], s.shade);
    }
    var n = a[a.length - 1];
    e.dot(S, n[0], n[1], s.line);
  }
  function EB(S, e, a) {
    var s = e.material;
    var o = s.cloth;
    var i = s.accent;
    var B = s.trim;
    var n = DB(e, a);
    var O = n.far;
    var t = Math.max(6, n.len - 2.5);
    JB(S, n, [[-1, -2.4], [.45 * t, -2.8], [t + 1, -3], [t + 1, 5.6], [.45 * t, 4.4], [-1, 2.4]], o.line);
    JB(S, n, [[0, -1.5], [.45 * t, -1.9], [t + .2, -2.1], [t + .2, 4.7], [.45 * t, 3.5], [0, 1.5]], O ? o.shade : o.base);
    uB(S, n, .5, .9, .45 * t, 2.8, O ? o.base : o.hi);
    uB(S, n, .45 * t, 3, t - 1.5, 3.9, O ? o.base : o.hi);
    uB(S, n, 1, -.8, t - 2, -1.4, O ? o.deep : o.shade);
    uB(S, n, .5 * t, 1, t - 2, 1.6, O ? o.deep : o.shade);
    uB(S, n, t - .6, -2.2, t - .6, 4.6, O ? i.shade : i.base);
    uB(S, n, t - 1.4, -2.1, t - 1.4, 4.2, O ? i.deep : i.shade);
    uB(S, n, t + .4, -2.4, t + .4, 5, B.base);
    MB(S, n, t - .6, -1.4, O ? i.base : i.hi);
  }
  var KB = ["..kkk..", ".kWWWk.", "kWKWWKk", "kWWWKKk", "kWWKKKk", ".kKKWk.", "..kkk.."];
  var qB = [".cCc.", "cChCc", ".cCc."];
  var UB = ["C", "c", "C", "h", "C", "c", "c"];
  function XB(S, a, s, o) {
    u(S, a, s);
    for (var i = 0, B = a.length - 1; i < a.length; B = i++)
      e.line(S, Math.round(a[B][0]), Math.round(a[B][1]), Math.round(a[i][0]), Math.round(a[i][1]), o);
  }
  var RB = ["..nnnn.", ".nYGGGn", "nYGgYGn", "nGgnGgn", ".nGnGn.", "..n.n.."];
  var VB = [".nnnnn.", "nYGGGGn", "nGgYgGn", ".nGnGn.", "..n.n.."];
  function zB(S, e, s) {
    var o = e.material;
    var i = o.cloth;
    var B = o.trim;
    var n = o.accent;
    var O = DB(e, s);
    var t = O.far;
    var h = Math.max(6, O.len - 2.5);
    JB(S, O, [[-1, -2.3], [.5 * h, -2.5], [h, -3], [h, 4.3], [.5 * h, 3.3], [-1, 2.3]], i.line);
    JB(S, O, [[0, -1.4], [.5 * h, -1.6], [h - .8, -2.1], [h - .8, 3.4], [.5 * h, 2.4], [0, 1.4]], t ? i.shade : i.base);
    uB(S, O, .5, .8, .5 * h, 2, t ? i.base : i.hi);
    uB(S, O, 1, -.7, h - 1.5, -1.3, t ? i.deep : i.shade);
    uB(S, O, .5 * h, .4, h - 1.5, 1, t ? i.deep : i.shade);
    uB(S, O, h - .6, -2.8, h - .6, 4, t ? B.shade : B.base);
    for (var r = -2.2; r <= 4; r += 3.1)
      JB(S, O, [[h - .8, r - 1.3], [h + 1.8, r], [h - .8, r + 1.3]], B.line), uB(S, O, h - .3, r, h + .9, r, t ? B.base : B.hi);
    MB(S, O, h - 1.4, .8, t ? n.shade : n.base);
    (function (S, e, s) {
      var o = e.material.trim;
      var i = { n: o.line, g: o.shade, G: o.base, Y: o.hi };
      if (e.g.side) {
        if (1 !== s) {
          return;
        }
        Na(S, e.g.arms[1].x - 2, a.ARM_Y - 2 + e.dy, VB, i, !1);
      }
      else {
        var B = e.g.arms[s].x + 1;
        var n = a.ARM_Y - 2 + e.dy;
        if (0 === s) {
          Na(S, B - 4, n, RB, i, !1);
        }
        else {
          Na(S, B + 4, n, RB, i, !0);
        }
      }
    })(S, e, s);
  }
  var FB = ["..n..", ".nOn.", "nOwOn", ".nOn.", "..n.."];
  var TB = ["...o...", "...O...", "..nOn..", "oOOwOOo", "..nOn..", "...O...", "...o..."];
  var PB = ["lll", "prp", "prp", "rrr", "prp", "plp", "prp", "ppp", "lll"];
  var ZB = { cloth: { line: "#12281c", deep: "#1f4631", shade: "#2f6647", base: "#468a5e", hi: "#78b789" }, lining: { line: "#3a5c4d", deep: "#739e89", shade: "#a3c8b3", base: "#d2e9da", hi: "#f2fbf4" }, sash: { line: "#0b1812", deep: "#13281c", shade: "#1d3a29", base: "#294f38", hi: "#406f51" }, cord: { line: "#4d3f17", deep: "#7b682a", shade: "#a58f3d", base: "#cfb75a", hi: "#eedd92" }, pants: { line: "#0e1410", deep: "#18211b", shade: "#243029", base: "#314036", hi: "#48594c" } };
  function IB(S, e, a) {
    var s = ZB.cloth;
    var o = ZB.lining;
    var i = DB(e, a);
    var B = i.far;
    var n = i.len;
    var O = .5 * n;
    JB(S, i, LB(-2.6, 3, O, n - 2.4, -2.9).slice(0, 7).concat([[n - .6, 4.1], [n + .5, 4.4], [n + .6, 3.4], [n - 2.2, -2.9], [O, -2.7]]), s.line);
    JB(S, i, [[-1.4, -1.7], [-.9, -.4], [-.2, .8], [.9, 1.8], [O, 2.2], [n - .8, 3.2], [n - .3, 2.6], [n - 2.6, -1.9], [O, -1.8]], B ? s.shade : s.base);
    uB(S, i, n - 2.3, -2.2, n + .1, 3.5, B ? o.deep : o.shade);
    uB(S, i, n - 1.8, -1.5, n, 2.4, B ? o.shade : o.base);
    uB(S, i, .4, 1, O, 2.1, B ? s.base : s.hi);
    uB(S, i, .7 * O, -.9, n - 3, 1.6, B ? s.deep : s.shade);
  }
  s.THANH_Y_MAT = ZB;
  var $B = [".oo.oo.", "oHokoHo", ".oo.oo."];
  var Sn = [".....L", "....sL", "...s..", "LL.s..", ".LsL..", "..sLL.", ".s....", ".s...."];
  var en = ["L...", ".LL.", "..sL", ".s.."];
  function an(S, e, a, s) {
    for (var o = [], i = 0; i <= s; i++) {
      var B = i / s;
      var n = 1 - B;
      o.push([n * n * S[0] + 2 * n * B * e[0] + B * B * a[0], n * n * S[1] + 2 * n * B * e[1] + B * B * a[1]]);
    }
    return o;
  }
  function sn(S, a, s) {
    for (var o = 0, i = a.length - 1; o < a.length; i = o++)
      e.line(S, Math.round(a[i][0]), Math.round(a[i][1]), Math.round(a[o][0]), Math.round(a[o][1]), s);
  }
  function on(S, a, s) {
    for (var o = 1; o < a.length; o++) {
      var i = a[o - 1];
      var B = a[o];
      e.line(S, Math.round(i[0]), Math.round(i[1]) + 1, Math.round(B[0]), Math.round(B[1]) + 1, s.deep);
      e.line(S, Math.round(i[0]), Math.round(i[1]), Math.round(B[0]), Math.round(B[1]), s.base);
    }
  }
  function Bn(S, e, a) {
    var s = e.material;
    var o = s.cloth;
    var i = s.trim;
    var B = s.accent;
    var n = DB(e, a);
    var O = n.far;
    var t = Math.max(6, n.len - 1.5);
    var h = Math.max(4, .66 * t);
    JB(S, n, [[-1, -2.4], [h, -2.8], [h, 3.2], [-1, 2.4]], o.line);
    JB(S, n, [[0, -1.5], [h - .4, -1.9], [h - .4, 2.3], [0, 1.5]], O ? o.shade : o.base);
    uB(S, n, .5, .8, h - 1, 1.4, O ? o.base : o.hi);
    uB(S, n, 1, -.8, h - 1, -1.1, O ? o.deep : o.shade);
    JB(S, n, [[h - .6, -2.6], [t, -2.2], [t, 2.2], [h - .6, 2.9]], i.line);
    JB(S, n, [[h + .2, -1.7], [t - .8, -1.4], [t - .8, 1.4], [h + .2, 2]], O ? i.base : i.shade);
    for (var r = h + 1; r < t - .8; r += 2)
      uB(S, n, r, -1.6, r + 1, 1.6, O ? i.shade : i.hi);
    uB(S, n, h - .2, -2.2, h - .2, 2.5, O ? B.deep : B.shade);
  }
  var nn = ["...k...", "..kRk..", ".kRHRk.", "kRRHRRk", ".kRRRk.", "..kdk..", "...k..."];
  var On = [".aa.", "aRHa", "adRa", ".aa."];
  var tn = [[15.5, 11], [15, 18], [11.5, 10], [8, 16], [4.5, 10], [1, 18], [.5, 11]];
  var hn = [[15.5, 10], [12.5, 19], [8, 11], [3.5, 19], [.5, 10]];
  var rn = [[13, 9], [10, 15], [6.5, 10], [1.5, 19], [0, 10]];
  function dn(S, a, s, o, i, B, n, O, t) {
    var h;
    var r;
    var d;
    var l = [];
    var f = (i + B) / 16;
    for (h = 0; h < o.length; h++)
      r = o[h], d = Math.round(r[1] * n), l.push([Math.round(a + r[0] + f * d), s + d]);
    var c = [[a + o[o.length - 1][0], s], [a + o[0][0], s]];
    for (h = 0; h < l.length; h++)
      h % 2 && h < l.length - 1 ? c.push([l[h][0] + .6, l[h][1]], [l[h][0] - .6, l[h][1]]) : c.push(l[h]);
    XB(S, c, O.base, O.line);
    var b = function (S, e) {
      return { fillStyle: "#000000", fillRect: function (a, s, o, i) {
          S.fillStyle = this.fillStyle;
          for (var B = s; B < s + i; B++)
            for (var n = a; n < a + o; n++)
              e[n + "," + B] && S.fillRect(n, B, 1, 1);
        } };
    }(S, Ko(function (S) {
      XB(S, c, O.base, O.line);
    }));
    for (h = 1; h < l.length - 1; h++) {
      var G = Math.round(a + o[h][0] + 4 * f);
      if (h % 2) {
        e.line(b, l[h][0], l[h][1] - 1, l[h + 1][0], l[h + 1][1] - 1, t.shade);
        e.line(b, l[h - 1][0], l[h - 1][1] - 1, l[h][0], l[h][1] - 1, t.deep);
        e.dot(b, l[h][0], l[h][1] - 1, t.base);
        e.dot(b, l[h][0], l[h][1] - 2, t.shade);
        e.line(b, l[h][0] - 1, l[h][1] - 3, G - 1, s + 4, O.hi);
      }
      else {
        e.line(b, l[h][0], l[h][1] - 2, G, s + 3, O.shade);
      }
    }
  }
  var ln = Object.create(null);
  function fn(S, a, s) {
    var o = a.arms[s];
    var i = w(o);
    var B = h(o);
    var n = "#12151d";
    var O = "#20242e";
    var t = "#3c424e";
    var r = B.x - i.x;
    var d = B.y - i.y;
    var l = Math.sqrt(r * r + d * d) || 1;
    var f = r / l;
    var c = d / l;
    var b = -c;
    var G = f;
    var H = a.g.side || a.g.back ? 3 : 4;
    var g = Math.round(B.x - f * H);
    var x = Math.round(B.y - c * H);
    var D = 0 === s && !o.front;
    e.fatLine(S, i.x, i.y, g, x, 5, D ? n : "#292d38");
    e.line(S, Math.round(i.x + 2 * b), Math.round(i.y + 2 * G), Math.round(g + 2 * b), Math.round(x + 2 * G), D ? O : t);
    e.line(S, Math.round(i.x - 2 * b), Math.round(i.y - 2 * G), Math.round(g - 2 * b), Math.round(x - 2 * G), "#090b10");
    e.fatLine(S, Math.round(g - 3 * b), Math.round(x - 3 * G), Math.round(g + 3 * b), Math.round(x + 3 * G), 2, D ? n : O);
    e.line(S, Math.round(g - 2 * b), Math.round(x - 2 * G), Math.round(g + 2 * b), Math.round(x + 2 * G), t);
  }
  function cn(S, a, s) {
    if ("long_tuong_y" !== a.cfg.outfit)
      if ("toc_truong_y" !== a.cfg.outfit) {
        if ("quan_dui" !== a.cfg.outfit)
          if (kn(a.cfg)) {
            mn(S, a, s);
          }
          else if (ln[a.cfg.outfit]) {
            ln[a.cfg.outfit].sleeve(xB(S), a, s);
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
                                                if ("bach_kim_an_dien_bao" !== a.cfg.outfit)
                                                  if ("thanh_lam_dao_bao" !== a.cfg.outfit)
                                                    if ("bach_nguyet_hong_lien" !== a.cfg.outfit)
                                                      if ("van_lo_lao_ma_bao" !== a.cfg.outfit)
                                                        if ("man_ho_tu_bao" !== a.cfg.outfit)
                                                          if ("ma_vuong_bao" !== a.cfg.outfit)
                                                            if ("xich_ma_y" !== a.cfg.outfit)
                                                              if ("dai_phu_bao" !== a.cfg.outfit) {
                                                                var o = a.arms[s];
                                                                var i = w(o);
                                                                var B = h(o);
                                                                var n = a.material.cloth;
                                                                var O = a.material.trim;
                                                                if ("tho_ren" === a.cfg.outfit) {
                                                                  var t = Math.round(B.x - .28 * (B.x - i.x));
                                                                  var r = Math.round(B.y - .28 * (B.y - i.y));
                                                                  e.fatLine(S, t - 2, r, t + 2, r, 3, O.deep);
                                                                  e.line(S, t - 2, r - 1, t + 2, r - 1, O.base);
                                                                  e.dot(S, t - 1, r - 1, G.metal.base);
                                                                  return void e.dot(S, t + 2, r, G.metal.hi);
                                                                }
                                                                if ("tieu_thanh" === a.cfg.outfit) {
                                                                  n = O;
                                                                }
                                                                var d = B.x - i.x;
                                                                var l = B.y - i.y;
                                                                var f = Math.sqrt(d * d + l * l) || 1;
                                                                var c = d / f;
                                                                var b = l / f;
                                                                var H = -b;
                                                                var g = c;
                                                                var x = 0 === s && !o.front;
                                                                var D = a.g.side || a.g.back || s ? 4 : 5;
                                                                var W = B.x - c * D;
                                                                var J = B.y - b * D;
                                                                u(S, [[i.x + 2 * H, i.y + 2 * g], [i.x - 2 * H, i.y - 2 * g], [W - 4 * H, J - 4 * g], [W + 4 * H, J + 4 * g]], x ? n.shade : n.base);
                                                                u(S, [[i.x - 2, i.y], [i.x, i.y + 2], [W - 1, J - 2], [W - 4, J]], n.deep);
                                                                e.fatLine(S, i.x + 1, i.y, Math.round(W + 2), Math.round(J - 2), 2, x ? n.base : n.hi);
                                                                e.line(S, Math.round(i.x + 5 * c - 1), Math.round(i.y + 5 * b), Math.round(W - 1), Math.round(J - 2), n.shade);
                                                                e.line(S, Math.round(W - 3), Math.round(J - 3), Math.round(W + 1), Math.round(J - 5), n.deep);
                                                                e.fatLine(S, Math.round(W - 4 * H), Math.round(J - 4 * g), Math.round(W + 4 * H), Math.round(J + 4 * g), 2, x ? O.deep : O.shade);
                                                                e.line(S, Math.round(W - 3 * H), Math.round(J - 3 * g), Math.round(W + 3 * H), Math.round(J + 3 * g), O.base);
                                                                e.dot(S, Math.round(W - 4 * H), Math.round(J - 4 * g), O.line);
                                                                e.dot(S, Math.round(W + 4 * H), Math.round(J + 4 * g), O.line);
                                                              }
                                                              else {
                                                                Dn(S, a, s);
                                                              }
                                                            else {
                                                              aO(S, a, s);
                                                            }
                                                          else {
                                                            mS(S, a, s);
                                                          }
                                                        else {
                                                          gS(S, a, s);
                                                        }
                                                      else {
                                                        BS(S, a, s);
                                                      }
                                                    else {
                                                      oS(S, a, s);
                                                    }
                                                  else {
                                                    V(S, a, s);
                                                  }
                                                else {
                                                  XS(S, a, s);
                                                }
                                              else {
                                                IS(S, a, s);
                                              }
                                            else {
                                              TS(S, a, s);
                                            }
                                          else {
                                            RS(S, a, s);
                                          }
                                        else {
                                          te(S, a, s);
                                        }
                                      else {
                                        be(S, a, s);
                                      }
                                    else {
                                      ge(S, a, s);
                                    }
                                  else {
                                    xe(S, a, s);
                                  }
                                else {
                                  fn(S, a, s);
                                }
                              else {
                                ve(S, a, s);
                              }
                            else {
                              Le(S, a, s);
                            }
                          else {
                            Ve(S, a, s);
                          }
                        else {
                          Vs(S, a, s);
                        }
                      else {
                        bs(S, a, s);
                      }
                    else {
                      za(S, a, s);
                    }
                  else {
                    Ga(S, a, s);
                  }
                else {
                  Ti(S, a, s);
                }
              else {
                hi(S, a, s);
              }
            else {
              Yo(S, a, s);
            }
          else {
            !function (S, e, a) {
              qn(xB(S), e, a);
              Un(S, e, a);
            }(S, a, s);
          }
      }
      else {
        HB(S, a, s);
      }
    else {
      vi(S, a, s);
    }
  }
  function bn(S, a, s, o, i, B) {
    e.r(S, s, o + 8, i, 1, a.mid);
    e.r(S, s, o + 9, i, 1, a.core);
    e.r(S, s, o + 10, i, 1, a.rim);
    e.dot(S, s - 1, o + 8, a.halo);
    e.dot(S, s - 1, o + 9, a.halo);
    e.dot(S, s - 1, o + 7, a.far);
    e.dot(S, s - 1, o + 10, a.far);
    e.r(S, s, o + 11, i, 1, a.far);
    e.r(S, s, o + 6, i, 1, a.far);
    if (!(B)) {
      e.dot(S, s + i, o + 8, a.halo);
      e.dot(S, s + i, o + 9, a.halo);
      e.dot(S, s + i, o + 7, a.far);
      e.dot(S, s + i, o + 10, a.far);
    }
  }
  function Gn(a, s) {
    if (!s.g.back) {
      var o = s.head;
      var i = o.x;
      var B = o.y;
      var n = o.w;
      var O = G.face;
      var t = S.Palette.EYE;
      var h = x[s.cfg.eyeColor];
      var r = h ? h.iris : t.iris;
      var d = h ? h.deep : O.irisdeep;
      var l = h ? h.hi : O.irishi;
      var f = s.p.sit || "hurt" === s.p.act;
      var c = h && h.slit;
      var b = h && h.glow;
      if (s.g.side) {
        if (h && h.pair) {
          r = h.pair[1].iris;
          d = h.pair[1].deep;
          l = h.pair[1].hi;
        }
        e.line(a, i + n - 5, B + 5, i + n - 2, B + 5, O.brow);
        e.r(a, i + n - 5, B + 7, 3, 1, O.lid);
        e.r(a, i + n - 5, B + 8, 3, f ? 1 : 2, f ? O.lid : c ? r : t.white);
        return void (f || (e.r(a, i + n - 3, B + 8, 2, 2, r), e.dot(a, i + n - 2, B + 8, t.spark), c && (e.r(a, i + n - 3, B + 8, 1, 2, c), e.dot(a, i + n - 5, B + 8, d), e.dot(a, i + n - 2, B + 9, l)), e.r(a, i + n - 4, B + 10, 2, 1, O.low), b && bn(a, b, i + n - 5, B, 4, !0)));
      }
      for (var g = 0; g < 2; g++) {
        var D = i + H.eyes[g];
        var W = D + (g ? 0 : 2);
        var J = D + (g ? 2 : 0);
        var u = D + 1;
        e.r(a, D, B + 5, 3, 1, O.brow);
        e.dot(a, D + (g ? 0 : 2), B + 5, O.browhi);
        if (f) {
          e.r(a, D, B + 9, 3, 1, O.lid);
        }
        else {
          if (h && h.pair) {
            r = h.pair[g].iris;
            d = h.pair[g].deep;
            l = h.pair[g].hi;
          }
          e.r(a, D, B + 7, 3, 1, O.lid);
          e.dot(a, J, B + 7, O.lidhi);
          e.r(a, D, B + 8, 3, 3, t.white);
          e.dot(a, J, B + 8, O.sclera);
          e.dot(a, u, B + 8, d);
          e.dot(a, u, B + 9, r);
          e.dot(a, W, B + 9, l);
          e.dot(a, W, B + 8, t.spark);
          e.dot(a, u, B + 10, O.low);
          e.dot(a, W, B + 10, O.lowhi);
          if (c) {
            e.dot(a, J, B + 8, r);
            e.dot(a, J, B + 9, r);
            e.dot(a, J, B + 10, d);
            e.dot(a, u, B + 8, c);
            e.dot(a, u, B + 9, c);
          }
          if (b) {
            bn(a, b, D, B, 3, !1);
          }
        }
      }
    }
  }
  ln.bach_y = { sleeve: pB, under: function (S, e) {
      wB(S, e, e.material.pants, !1);
      if (!(e.arms[0].front || e.arms[0].over)) {
        pB(S, e, 0);
      }
    }, robe: function (S, a) {
      var s = a.material;
      var o = s.cloth;
      var i = s.trim;
      var B = s.accent;
      var n = s.jade;
      var O = a.torso;
      var t = a.g.side;
      var h = a.g.back;
      var r = qs(a);
      var d = O.x - 1;
      var l = O.x + O.w;
      var f = O.y - 1;
      var c = O.x + (O.w >> 1);
      var b = O.y + 11;
      var G = b + 4;
      var H = NB(a, 57, 59);
      var g = a.p.sit ? 5 : 3;
      var x = a.g.female;
      var D = { j: n.base, i: n.hi, J: n.deep, X: n.line, n: i.deep, G: i.base, Y: i.hi, a: B.line, s: B.shade, S: B.base, A: B.deep, H: B.hi, g: i.shade };
      var W = { Y: i.hi, G: i.base, g: i.shade };
      if (!t) {
        var J = x ? 1 : 0;
        var M = a.p.sit ? 0 : r;
        u(S, [[d + 1, f], [l - 1, f], [l, f + 2], [l - J, b], [l - J, G], [l + g + M, H], [d - g + M, H], [d + J, G], [d + J, b], [d, f + 2]], o.line);
        u(S, [[d + 2, f + 1], [l - 2, f + 1], [l - 1, f + 3], [l - 1 - J, b], [l - 1 - J, G], [l + g - 1 + M, H - 1], [d - g + 2 + M, H - 1], [d + 1 + J, G], [d + 1 + J, b], [d + 1, f + 3]], o.base);
        e.line(S, d + 1, f + 3, d + 1 + J, b - 1, o.shade);
        e.line(S, l - 2, f + 3, l - 2 - J, b - 1, o.hi);
        e.line(S, d + 2, G + 1, d - g + 3 + M, H - 2, o.shade);
        e.line(S, c - 2, G + 2, c - 3 + M, H - 2, o.shade);
        e.line(S, c + 3, G + 2, c + 4 + M, H - 2, o.hi);
        e.line(S, l - 2, G + 1, l + g - 2 + M, H - 2, o.deep);
        if (h) {
          e.r(S, c - 3, f, 6, 2, i.base);
          e.r(S, c - 2, f, 4, 1, i.hi);
          Na(S, c - 3, f + 4, yB, W, !1);
          e.line(S, c, f + 8, c, b - 1, o.shade);
          e.line(S, c, G + 1, c + M, H - 2, o.shade);
        }
        else {
          e.line(S, c - 2, f, c, f + 3, i.shade);
          e.line(S, c - 3, f, c - 1, f + 4, i.base);
          e.fatLine(S, c + 2, f, d + 2, b - 1, 2, i.base);
          e.line(S, c + 3, f, d + 3, b - 1, i.hi);
          e.line(S, c + 1, f + 1, d + 1, b - 2, i.deep);
          e.dot(S, c - 1, f + 1, o.hi);
          e.dot(S, c, f + 2, o.hi);
          e.line(S, d + 2, G, d - g + 3 + M, H - 2, i.base);
          e.line(S, d + 3, G, d - g + 4 + M, H - 2, i.hi);
        }
        e.line(S, d - g + 2 + M, H - 1, l + g - 1 + M, H - 1, i.base);
        e.line(S, d - g + 1 + M, H, l + g + M, H, i.deep);
        Na(S, d - g + 3 + M, H - 4, vB, W, !1);
        Na(S, l + g - 3 + M, H - 4, vB, W, !0);
        e.r(S, d, b, l - d + 1, 4, B.base);
        e.r(S, d, b, l - d + 1, 1, B.hi);
        e.r(S, d, b + 3, l - d + 1, 1, B.line);
        e.line(S, d, b + 1, d, b + 2, B.deep);
        e.line(S, d + 1, b + 2, l - 1, b + 2, B.shade);
        var w = h ? d - 1 : l - 3;
        var N = a.p.sit ? 6 : 12;
        var p = w + 2;
        var k = a.p.sit ? 0 : r;
        Na(S, w, b, mB, D, !1);
        e.fatLine(S, p - 1, b + 3, p - 2 - k, b + 2 + N, 2, B.base);
        e.line(S, p - 1, b + 3, p - 2 - k, b + 2 + N, B.hi);
        e.fatLine(S, p + 1, b + 3, p + 2 + k, b + 1 + N, 2, B.shade);
        e.line(S, p + 2, b + 3, p + 3 + k, b + 1 + N, B.base);
        e.dot(S, p - 2 - k, b + 3 + N, B.deep);
        e.dot(S, p + 3 + k, b + 2 + N, B.line);
        if (!(h)) {
          Na(S, d + 2, b + 3, a.p.sit ? kB.slice(0, 7) : kB, D, !1, Rs(-r, 3, 5));
        }
        return void (a.arms[0].front || a.arms[0].over || pB(S, a, 0));
      }
      var m = Us(a);
      var v = l + 1;
      u(S, [[d + 1, f], [l, f], [l + 1, f + 3], [l, b], [l, G], [v + 2 + (a.p.sit ? 3 : 0), H], [d - 3 + m - (a.p.sit ? 3 : 0), H], [d - 1 + m, G + 6], [d, b], [d, f + 3]], o.line);
      u(S, [[d + 2, f + 1], [l - 1, f + 1], [l, f + 3], [l - 1, b], [l - 1, G], [v + 1 + (a.p.sit ? 3 : 0), H - 1], [d - 2 + m - (a.p.sit ? 3 : 0), H - 1], [d + m, G + 6], [d + 1, b], [d + 1, f + 3]], o.base);
      e.line(S, d + 1, f + 3, d + 1, b - 1, o.shade);
      e.line(S, d + 2, G + 2, d - 1 + m, H - 2, o.shade);
      e.line(S, c, G + 2, c + m, H - 2, o.hi);
      e.fatLine(S, l - 2, f, l - 1, b - 1, 2, i.base);
      e.line(S, l - 3, f, l - 2, b - 1, i.hi);
      e.line(S, l, G, v + 1 + (a.p.sit ? 3 : 0), H - 2, i.base);
      e.line(S, d - 2 + m - (a.p.sit ? 3 : 0), H - 1, v + 1 + (a.p.sit ? 3 : 0), H - 1, i.base);
      e.line(S, d - 3 + m - (a.p.sit ? 3 : 0), H, v + 2 + (a.p.sit ? 3 : 0), H, i.deep);
      Na(S, d - 1 + m - (a.p.sit ? 3 : 0), H - 4, vB, W, !1);
      e.r(S, d, b, l - d + 1, 4, B.base);
      e.r(S, d, b, l - d + 1, 1, B.hi);
      e.r(S, d, b + 3, l - d + 1, 1, B.line);
      e.line(S, d + 1, b + 2, l - 1, b + 2, B.shade);
      Na(S, c, b + 3, a.p.sit ? kB.slice(0, 7) : kB, D, !1, Rs(-m, 3, 5));
    } };
  ln.hac_y = { sleeve: CB, under: function (S, a) {
      var s = a.material;
      var o = s.pants;
      var i = s.wrap;
      if (wB(S, a, o, !1), !a.p.sit) {
        for (var B = 0; B < 2; B++) {
          var n = a.legs[B];
          var O = n.knee + 1;
          var t = n.foot - 4;
          e.r(S, n.x, O, n.w, t - O, i.shade);
          e.r(S, n.x, O, 1, t - O, i.line);
          e.r(S, n.x + n.w - 1, O, 1, t - O, i.deep);
          for (var h = O; h < t - 1; h += 2)
            e.line(S, n.x + 1, h + 1, n.x + n.w - 2, h, i.base);
          e.r(S, n.x, O, n.w, 1, i.deep);
        }
      }
      if (!(a.arms[0].front || a.arms[0].over)) {
        CB(S, a, 0);
      }
    }, robe: function (S, a) {
      var s = a.material;
      var o = s.cloth;
      var i = s.trim;
      var B = s.leather;
      var n = s.metal;
      var O = s.accent;
      var t = a.torso;
      var h = a.g.side;
      var r = a.g.back;
      var d = qs(a);
      var l = a.p.sit ? 0 : d;
      var f = t.x - 1;
      var c = t.x + t.w;
      var b = t.y - 1;
      var G = t.x + (t.w >> 1);
      var H = t.y + 12;
      var g = t.y + (a.p.sit ? 21 : 23);
      var x = a.g.female ? 1 : 0;
      var D = { a: O.line, A: O.deep, s: O.shade, S: O.base, H: O.hi, M: n.base, h: n.hi, m: n.deep, l: B.line };
      if (!h) {
        var W = a.p.sit ? 4 : 3;
        XB(S, [[f + 3, b], [c - 3, b], [c - 1, b + 1], [c, b + 3], [c, b + 8], [c - 1 - x, H + 1], [f + 1 + x, H + 1], [f, b + 8], [f, b + 3], [f + 1, b + 1]], o.base, o.line);
        var J = [[G, H + 1], [c - x, H + 1], [c - x, H + 4], [c + W + l, g - 3], [c + W - 1 + l, g - 1], [c + W - 3 + l, g], [G + 2 + l, g], [G + 1 + l, g - 1], [G, H + 5]];
        if (XB(S, [[f + x, H + 1], [G - 1, H + 1], [G - 1, H + 5], [G - 2 + l, g - 1], [G - 3 + l, g], [f - W + 3 + l, g], [f - W + 1 + l, g - 1], [f - W + l, g - 3], [f + x, H + 4]], o.base, o.line), XB(S, J, o.base, o.line), e.line(S, f + 1, b + 3, f + 1, b + 8, o.shade), e.line(S, f + 1, b + 8, f + 2 + x, H, o.shade), e.line(S, c - 1, b + 3, c - 1, b + 8, o.hi), e.line(S, c - 1, b + 8, c - 2 - x, H, o.hi), e.line(S, f + 2, H + 4, f - W + 3 + l, g - 2, o.shade), e.line(S, G - 3, H + 4, G - 4 + l, g - 2, o.deep), e.line(S, c - 2, H + 4, c + W - 2 + l, g - 2, o.hi), e.line(S, G + 2, H + 4, G + 3 + l, g - 2, o.shade), e.line(S, f - W + 2 + l, g - 1, G - 3 + l, g - 1, i.deep), e.line(S, G + 2 + l, g - 1, c + W - 2 + l, g - 1, i.shade), e.line(S, G - 2, H + 5, G - 2 + l, g - 2, i.deep), e.line(S, G + 1, H + 5, G + 1 + l, g - 2, i.shade), r) {
          e.line(S, G, b + 3, G, H - 1, o.deep);
        }
        else {
          e.line(S, G + 2, b + 2, f + 3, H - 1, i.shade);
          e.line(S, G + 3, b + 2, f + 4, H - 1, o.deep);
          e.fatLine(S, f + 2, b + 1, c - 2, H - 1, 2, B.shade);
          e.line(S, f + 2, b + 1, c - 2, H - 1, B.hi);
          for (var u = 0; u < 3; u++) {
            var M = f + 4 + 2 * u;
            var w = b + 3 + Math.round(2.2 * u);
            e.dot(S, M, w - 1, n.hi);
            e.dot(S, M, w, n.base);
            e.dot(S, M + 1, w, n.deep);
          }
        }
        e.r(S, f, H, c - f + 1, 3, B.base);
        e.r(S, f, H, c - f + 1, 1, B.hi);
        e.r(S, f, H + 2, c - f + 1, 1, B.line);
        if (r) {
          e.r(S, f + 1, H + 2, c - f - 1, 2, B.line);
          e.r(S, f + 2, H + 2, c - f - 3, 1, B.shade);
          e.dot(S, c - 1, H + 3, n.base);
          Na(S, f - 3, H + 1, AB, D, !0);
          e.dot(S, f - 1, H + 2, O.base);
        }
        else {
          Na(S, G - 2, H, jB, D, !1);
          e.r(S, f - 1, H + 1, 3, 4, B.line);
          e.r(S, f, H + 2, 2, 2, B.shade);
          e.dot(S, f, H + 2, B.hi);
          Na(S, c + 1, H, AB, D, !1);
        }
        Na(S, G - 4, b - 1, QB, D, !1);
        if (r) {
          Na(S, G - 2, b, _B, D, !1);
          YB(S, [[G - 1, b + 4], [G - 2, b + 7], [G - 3 - l, b + 10], [G - 3 - l, b + 12]], O);
          YB(S, [[G + 1, b + 4], [G + 2, b + 6], [G + 3 + l, b + 8], [G + 4 + l, b + 9]], O);
        }
        else {
          YB(S, [[G - 3, b + 2], [G - 4, b + 5], [G - 4 + l, b + 8], [G - 3 + l, b + 10]], O);
          e.dot(S, G - 3, b + 3, O.base);
        }
        return void (a.arms[0].front || a.arms[0].over || CB(S, a, 0));
      }
      var N = Us(a);
      var p = a.p.sit ? 2 : 0;
      XB(S, [[f + 2, b], [c - 2, b], [c, b + 1], [c + 1, b + 4], [c + 1, b + 8], [c, H + 1], [f + 1, H + 1], [f, b + 10], [f - 1, b + 6], [f - 1, b + 3], [f, b + 1]], o.base, o.line);
      var k = [[G, H + 1], [c, H + 1], [c, H + 4], [c + 2 + p, g - 3], [c + 2 + p, g - 1], [c + p, g], [G + 1 + N, g], [G + N, g - 1], [G, H + 5]];
      XB(S, [[f + 1, H + 1], [G - 1, H + 1], [G - 1, H + 5], [G - 1 + N, g - 1], [G - 2 + N, g], [f + N - p, g], [f - 2 + N - p, g - 2], [f - 2 + N - p, g - 4], [f + 1, H + 4]], o.base, o.line);
      XB(S, k, o.base, o.line);
      e.line(S, f, b + 3, f, b + 6, o.shade);
      e.line(S, f + 1, b + 7, f + 1, b + 10, o.shade);
      e.line(S, c, b + 4, c, b + 8, o.hi);
      e.line(S, f + 1, H + 4, f - 1 + N - p, g - 2, o.shade);
      e.line(S, c - 1, H + 4, c + 1 + p, g - 2, o.hi);
      e.line(S, f + N - p, g - 1, G - 2 + N, g - 1, i.deep);
      e.line(S, G + 1 + N, g - 1, c + p, g - 1, i.shade);
      e.line(S, c - 1, b + 2, c - 1, H - 1, i.base);
      e.fatLine(S, c - 3, b + 1, f + 2, H - 1, 2, B.deep);
      e.line(S, c - 3, b + 1, f + 2, H - 1, B.base);
      e.dot(S, c - 4, b + 3, n.hi);
      e.dot(S, c - 5, b + 5, n.base);
      e.r(S, f, H, c - f + 1, 3, B.base);
      e.r(S, f, H, c - f + 1, 1, B.hi);
      e.r(S, f, H + 2, c - f + 1, 1, B.line);
      e.r(S, f - 1, H + 1, 5, 2, B.line);
      e.dot(S, f, H + 1, B.shade);
      Na(S, f - 2, H, AB, D, !0);
      e.dot(S, f - 4, H + 1, O.base);
      e.r(S, f + 2, b - 1, c - f - 1, 3, O.line);
      e.r(S, f + 3, b, c - f - 3, 1, O.base);
      e.dot(S, c - 2, b, O.hi);
      YB(S, [[f + 1, b], [f - 2, b + 2], [f - 5, b + 3 + N], [f - 8, b + 2 + N]], O);
    } };
  ln.lam_y = { sleeve: EB, under: function (S, e) {
      wB(S, e, e.material.pants, !1);
      if (!(e.arms[0].front || e.arms[0].over)) {
        EB(S, e, 0);
      }
    }, robe: function (S, a) {
      var s = a.material;
      var o = s.cloth;
      var i = s.accent;
      var B = s.trim;
      var n = s.cord;
      var O = a.torso;
      var t = a.g.side;
      var h = a.g.back;
      var r = qs(a);
      var d = a.p.sit ? 0 : r;
      var l = O.x - 1;
      var f = O.x + O.w;
      var c = O.y - 1;
      var b = O.x + (O.w >> 1);
      var G = O.y + 12;
      var H = NB(a, 54, 58);
      var g = H + 3;
      var x = a.p.sit ? 4 : 2;
      var D = a.g.female ? 1 : 0;
      var W = { k: B.line, K: B.base, W: i.base, c: n.deep, C: n.base, h: n.hi };
      if (t) {
        var J = Us(a);
        var M = a.p.sit ? 3 : 0;
        u(S, [[f - 2, G], [f + 1, G], [f + 2 + M, g], [f - 3 + M, g]], i.line);
        u(S, [[f - 1, G], [f, G], [f + 1 + M, g - 1], [f - 2 + M, g - 1]], i.base);
        u(S, [[l + 1, c], [f, c], [f + 1, c + 3], [f, G], [f + 1 + M, H], [l - 2 + J - M, H], [l - 1 + J, G + 6], [l, G], [l, c + 3]], o.line);
        u(S, [[l + 2, c + 1], [f - 1, c + 1], [f, c + 3], [f - 1, G], [f + M, H - 1], [l - 1 + J - M, H - 1], [l + J, G + 6], [l + 1, G], [l + 1, c + 3]], o.base);
        e.line(S, l + 1, c + 3, l + 1, G - 1, o.shade);
        e.line(S, l + 2, G + 3, l - 1 + J - M, H - 2, o.shade);
        e.line(S, b, G + 3, b + J, H - 2, o.hi);
        e.line(S, f, c + 1, f, G, i.base);
        e.dot(S, f, c + 1, i.hi);
        e.fatLine(S, f - 2, c, f - 2, G - 1, 2, B.base);
        e.line(S, f - 2, c, f - 2, G - 1, B.hi);
        e.line(S, f - 1, G + 2, f + M, H - 1, B.base);
        e.line(S, l - 1 + J - M, H - 1, f + M, H - 1, B.base);
        e.line(S, l - 2 + J - M, H, f + 1 + M, H, B.line);
        for (var w = l + J - M; w < f + M; w += 3)
          e.dot(S, w, H - 1, i.shade);
        e.line(S, l, G, f, G, n.base);
        e.line(S, l, G + 1, f, G + 1, n.deep);
        Na(S, f - 1, G - 1, qB.map(function (S) {
          return S.slice(1, 4);
        }), W, !1);
        Na(S, f, G + 2, UB.slice(0, a.p.sit ? 4 : 7), W, !1, Rs(-J, 2, 5));
      }
      else {
        u(S, [[b - 3, G], [b + 3, G], [b + 4 + d, g], [b - 4 + d, g]], i.line);
        u(S, [[b - 2, G], [b + 2, G], [b + 3 + d, g - 1], [b - 3 + d, g - 1]], i.base);
        e.line(S, b - 1, G + 2, b - 2 + d, g - 2, i.shade);
        e.line(S, b + 1, G + 2, b + 2 + d, g - 2, i.hi);
        u(S, [[l + 1, c], [f - 1, c], [f, c + 2], [f - D, G], [f + x + d, H], [l - x + d, H], [l + D, G], [l, c + 2]], o.line);
        u(S, [[l + 2, c + 1], [f - 2, c + 1], [f - 1, c + 3], [f - 1 - D, G], [f + x - 1 + d, H - 1], [l - x + 1 + d, H - 1], [l + 1 + D, G], [l + 1, c + 3]], o.base);
        e.line(S, l + 1, c + 3, l + 1 + D, G - 1, o.shade);
        e.line(S, f - 2, c + 3, f - 2 - D, G - 1, o.hi);
        e.line(S, l + 2, G + 2, l - x + 2 + d, H - 2, o.shade);
        e.line(S, f - 2, G + 2, f + x - 2 + d, H - 2, o.deep);
        e.line(S, l + 3, G + 3, l - x + 4 + d, H - 2, o.hi);
        e.line(S, l - x + 1 + d, H - 1, f + x - 1 + d, H - 1, B.base);
        e.line(S, l - x + d, H, f + x + d, H, B.line);
        for (var N = l - x + 2 + d; N < f + x - 1 + d; N += 3)
          e.dot(S, N, H - 1, i.shade), 1 & N || e.dot(S, N + 1, H - 1, i.shade);
        if (h ? (e.r(S, b - 3, c, 6, 2, B.base), e.r(S, b - 2, c, 4, 1, B.hi), Na(S, b - 3, c + 4, KB, W, !1), e.line(S, b, G + 2, b + d, H - 2, o.deep)) : (u(S, [[b - 1, c], [b + 1, c], [b + 1, G], [b - 1, G]], i.base), e.line(S, b - 1, c + 1, b - 1, G - 1, i.shade), e.dot(S, b, c + 1, i.hi), u(S, [[b - 1, G + 2], [b + 1, G + 2], [b + 2 + d, H], [b - 2 + d, H]], i.base), e.line(S, b - 1, G + 2, b - 2 + d, H - 1, i.shade), e.line(S, b + 1, G + 3, b + 1 + d, H - 2, i.hi), e.line(S, b - 2, c, b - 2, G, B.base), e.line(S, b - 3, c + 1, b - 3, G, B.hi), e.line(S, b + 1, c, b + 1, G, B.base), e.line(S, b + 2, c + 1, b + 2, G, B.line), e.line(S, b - 2, G + 2, b - 3 + d, H - 1, B.base), e.line(S, b - 3, G + 2, b - 4 + d, H - 1, B.hi), e.line(S, b + 1, G + 2, b + 2 + d, H - 1, B.base), e.line(S, b + 2, G + 2, b + 3 + d, H - 1, B.line), e.line(S, b - 3, c, b + 2, c, B.base)), e.line(S, l, G, f, G, n.shade), e.line(S, l, G + 1, f, G + 1, n.deep), e.line(S, l + 1, G, f - 1, G, n.base), !h) {
          Na(S, b - 2, G - 1, qB, W, !1);
          var p = a.p.sit ? 4 : UB.length;
          Na(S, b - 2, G + 2, UB.slice(0, p), W, !1, Rs(-r, 2, 5));
          Na(S, b + 1, G + 2, UB.slice(0, p - 1), W, !1, Rs(r, 2, 5));
        }
        if (!(a.arms[0].front || a.arms[0].over)) {
          EB(S, a, 0);
        }
      }
    } };
  ln.tu_quang_y = { sleeve: zB, under: function (S, e) {
      wB(S, e, e.material.pants, !1);
      if (!(e.arms[0].front || e.arms[0].over)) {
        zB(S, e, 0);
      }
    }, robe: function (S, a) {
      var s = a.material;
      var o = s.cloth;
      var i = s.trim;
      var B = s.accent;
      var n = s.paper;
      var O = s.glow;
      var t = a.torso;
      var h = a.g.side;
      var r = a.g.back;
      var d = qs(a);
      var l = a.p.sit ? 0 : d;
      var f = t.x - 1;
      var c = t.x + t.w;
      var b = t.y - 1;
      var G = t.x + (t.w >> 1);
      var H = t.y + 12;
      var g = NB(a, 56, 59);
      var x = a.p.sit ? 5 : 2;
      var D = a.g.female ? 1 : 0;
      var W = { n: i.line, g: i.shade, G: O.base, o: O.deep, O: O.base, w: O.hi, l: n.line, p: n.base, r: n.ink };
      var J = a.p.sit ? 6 : PB.length;
      if (!h) {
        if (u(S, [[f + 1, b], [c - 1, b], [c, b + 2], [c - D, H], [c + x + l, g], [f - x + l, g], [f + D, H], [f, b + 2]], o.line), u(S, [[f + 2, b + 1], [c - 2, b + 1], [c - 1, b + 3], [c - 1 - D, H], [c + x - 1 + l, g - 1], [f - x + 1 + l, g - 1], [f + 1 + D, H], [f + 1, b + 3]], o.base), e.line(S, f + 1, b + 3, f + 1 + D, H - 1, o.shade), e.line(S, c - 2, b + 3, c - 2 - D, H - 1, o.hi), e.line(S, f + 2, H + 3, f - x + 2 + l, g - 2, o.shade), e.line(S, c - 2, H + 3, c + x - 2 + l, g - 2, o.deep), e.line(S, f + 4, H + 4, f - x + 5 + l, g - 2, o.hi), e.line(S, f - x + 1 + l, g - 1, c + x - 1 + l, g - 1, i.base), e.line(S, f - x + l, g, c + x + l, g, i.line), r) {
          e.line(S, G, H + 3, G + l, g - 2, o.deep);
        }
        else {
          var M = H + 6;
          u(S, [[G, M], [G + 3 + l, g], [G - 3 + l, g]], B.base);
          e.line(S, G, M + 1, G + l, g - 1, B.hi);
          e.line(S, G - 1, M + 2, G - 2 + l, g - 1, B.shade);
          e.line(S, G, M, G - 3 + l, g - 1, i.base);
          e.line(S, G, M, G + 3 + l, g - 1, i.hi);
          e.line(S, G, H + 3, G, M, o.deep);
        }
        e.r(S, f, H, c - f + 1, 3, o.deep);
        e.r(S, f, H, c - f + 1, 1, i.shade);
        e.r(S, f, H + 2, c - f + 1, 1, o.line);
        e.line(S, f + 1, H + 1, c - 1, H + 1, o.shade);
        if (r) {
          Na(S, c - 2, H + 1, PB.slice(0, J), W, !1, Rs(-d, 3, 6));
          e.line(S, f + 2, H + 2, f + 1 + l, H + (a.p.sit ? 7 : 13), i.base);
          e.line(S, f + 1, H + 2, f + l, H + (a.p.sit ? 7 : 13), i.hi);
          e.line(S, f, H + 2, f - 1 - l, H + (a.p.sit ? 6 : 10), i.shade);
        }
        else {
          e.r(S, G - 1, H, 3, 3, i.line);
          e.dot(S, G, H + 1, i.hi);
          Na(S, f - 1, H + 1, PB.slice(0, J), W, !1, Rs(-d, 3, 6));
          Na(S, f + 3, H + 2, PB.slice(0, J - 1), W, !1, Rs(-d, 2, 6));
          e.line(S, c - 2, H + 2, c - 1 + l, H + (a.p.sit ? 7 : 13), i.base);
          e.line(S, c - 1, H + 2, c + l, H + (a.p.sit ? 7 : 13), i.hi);
          e.line(S, c, H + 2, c + 1 - l, H + (a.p.sit ? 6 : 10), i.shade);
          e.dot(S, c - 1 + l, H + (a.p.sit ? 8 : 14), i.line);
        }
        var w = r ? b + 12 : b + 9;
        XB(S, [[G - 4, b - 1], [G + 3, b - 1], [c + 1, b + 1], [c + 2, b + 4], [c + 1, b + 6], [c - 1, b + 7], [c - 3, b + 6], [G + 3, b + 7], [G, w], [G - 1, w], [G - 4, b + 7], [f + 2, b + 6], [f, b + 7], [f - 2, b + 6], [f - 2, b + 4], [f - 1, b + 1]], i.base, i.line);
        e.line(S, G - 3, b, G + 2, b, i.hi);
        e.line(S, f + 1, b + 2, G - 4, b + 1, i.hi);
        e.line(S, f, b + 5, G - 4, b + 5, i.shade);
        e.line(S, G + 3, b + 5, c - 1, b + 5, i.shade);
        e.line(S, G - 3, b + 6, G - 1, w - 1, i.shade);
        e.line(S, G + 2, b + 6, G, w - 1, i.deep);
        e.r(S, G - 3, b - 1, 6, 2, i.line);
        e.r(S, G - 2, b - 1, 4, 1, i.base);
        e.dot(S, G + 1, b - 1, i.hi);
        if (r) {
          Na(S, G - 4, b + 2, TB, W, !1);
        }
        else {
          Na(S, G - 3, b + 2, FB, W, !1);
        }
        return void (a.arms[0].front || a.arms[0].over || zB(S, a, 0));
      }
      var N = Us(a);
      var p = a.p.sit ? 3 : 0;
      u(S, [[f + 1, b], [c, b], [c + 1, b + 3], [c, H], [c + 2 + p, g], [f - 2 + N - p, g], [f - 1 + N, H + 6], [f, H], [f, b + 3]], o.line);
      u(S, [[f + 2, b + 1], [c - 1, b + 1], [c, b + 3], [c - 1, H], [c + 1 + p, g - 1], [f - 1 + N - p, g - 1], [f + N, H + 6], [f + 1, H], [f + 1, b + 3]], o.base);
      e.line(S, f + 1, b + 3, f + 1, H - 1, o.shade);
      e.line(S, f + 2, H + 3, f - 1 + N - p, g - 2, o.shade);
      e.line(S, G + 1, H + 3, G + 1 + N, g - 2, o.hi);
      e.line(S, c, H + 4, c + 1 + p, g - 1, B.base);
      e.line(S, c - 1, H + 4, c + p, g - 1, i.base);
      e.line(S, f - 1 + N - p, g - 1, c + 1 + p, g - 1, i.base);
      e.line(S, f - 2 + N - p, g, c + 2 + p, g, i.line);
      e.r(S, f, H, c - f + 1, 3, o.deep);
      e.r(S, f, H, c - f + 1, 1, i.shade);
      e.r(S, f, H + 2, c - f + 1, 1, o.line);
      e.r(S, c - 1, H, 2, 3, i.line);
      e.dot(S, c - 1, H + 1, i.hi);
      Na(S, G - 2, H + 1, PB.slice(0, J), W, !1, Rs(-N, 3, 6));
      Na(S, G + 1, H + 2, PB.slice(0, J - 1), W, !1, Rs(-N, 2, 6));
      XB(S, [[f + 2, b - 1], [c, b - 1], [c + 2, b + 2], [c + 2, b + 5], [c, b + 7], [c - 2, b + 6], [G, b + 6], [f + 2, b + 8], [f, b + 6], [f - 1, b + 3]], i.base, i.line);
      e.line(S, f + 2, b, c - 1, b, i.hi);
      e.line(S, f + 1, b + 5, c - 1, b + 5, i.shade);
      e.r(S, G - 1, b - 1, 5, 2, i.line);
      e.r(S, G, b - 1, 3, 1, i.base);
    } };
  ln.thanh_y = { sleeve: IB, under: function (S, e) {
      wB(S, e, ZB.pants, !1);
      if (!(e.arms[0].front || e.arms[0].over)) {
        IB(S, e, 0);
      }
    }, robe: function (S, a) {
      var s = ZB.cloth;
      var o = ZB.lining;
      var i = ZB.sash;
      var B = ZB.cord;
      var n = a.torso;
      var O = a.g.side;
      var t = a.g.back;
      var h = qs(a);
      var r = a.p.sit ? 0 : h;
      var d = n.x - 1;
      var l = n.x + n.w;
      var f = n.y - 1;
      var c = n.x + (n.w >> 1);
      var b = n.y + 11;
      var G = NB(a, 54, 59);
      var H = a.g.female ? 1 : 0;
      var g = { o: B.base, H: B.hi, k: B.deep, s: s.hi, L: o.shade };
      if (O) {
        var x = Us(a);
        var D = a.p.sit ? 3 : 0;
        var W = [[d + 2, f], [l - 2, f], [l, f + 1], [l + 1, f + 4], [l + 1, f + 8], [l, b], [l, b + 3], [l + 2 + D, G - 3], [l + 2 + D, G - 1], [l + D, G], [c + x, G + 1], [d - 2 + x - D, G], [d - 3 + x - D, G - 2], [d - 3 + x - D, G - 4], [d + 1, b + 3], [d + 1, b], [d, f + 10], [d - 1, f + 6], [d - 1, f + 3], [d, f + 1]];
        u(S, W, s.base);
        var J = an([l - 1, b + 3], [l - 1, G - 2], [d - 2 + x - D, G - 1], 6);
        u(S, J.concat([[d - 3 + x - D, G - 2], [d - 2 + x - D, G], [c + x, G + 1], [l + D, G], [l + 2 + D, G - 1], [l + 2 + D, G - 3], [l, b + 3]]), s.shade);
        sn(S, W, s.line);
        e.line(S, d, f + 3, d, f + 6, s.shade);
        e.line(S, d + 1, f + 7, d + 1, f + 10, s.shade);
        e.line(S, l, f + 4, l, f + 8, s.hi);
        e.line(S, d + 1, b + 4, d - 2 + x - D, G - 4, s.deep);
        e.line(S, c, b + 4, c + x, G - 5, s.hi);
        on(S, J, o);
        e.line(S, d - 2 + x - D, G, l + D, G, o.deep);
        e.fatLine(S, l - 1, f, l - 1, b - 1, 2, o.base);
        e.line(S, l - 2, f + 1, l - 2, b - 1, s.deep);
        e.dot(S, l, f + 1, o.hi);
        e.r(S, d, b, l - d + 1, 3, i.base);
        e.r(S, d, b, l - d + 1, 1, i.hi);
        e.r(S, d, b + 2, l - d + 1, 1, i.line);
        e.line(S, d, b + 1, l, b + 1, B.deep);
        Na(S, l - 3, b, ["oo.", "oko", "oo."], g, !1);
        var M = a.p.sit ? 4 : 7;
        e.line(S, l - 2, b + 3, l - 1 + x, b + 2 + M, B.shade);
        e.dot(S, l - 1 + x, b + 3 + M, o.base);
      }
      else {
        var w = a.p.sit ? 6 : 4;
        var N = [[d + 3, f], [l - 3, f], [l - 1, f + 1], [l, f + 3], [l, f + 8], [l - 1 - H, b], [l - H, b + 3], [l + w + r, G - 3], [l + w - 1 + r, G - 1], [l + w - 3 + r, G], [c + 2 + r, G + 1], [c - 2 + r, G + 1], [d - w + 3 + r, G], [d - w + 1 + r, G - 1], [d - w + r, G - 3], [d + H, b + 3], [d + 1 + H, b], [d, f + 8], [d, f + 3], [d + 1, f + 1]];
        u(S, N, s.base);
        var p = an(t ? [l - 2, b + 3] : [d + 2, b + 3], t ? [l - 1, G - 3] : [d + 1, G - 3], t ? [d - w + 3 + r, G - 1] : [l + w - 3 + r, G - 1], 6);
        var k = p.slice();
        if (t ? k.push([d - w + r, G - 3], [d + H, b + 3]) : k.push([l + w - 3 + r, G], [c - 2 + r, G + 1], [d - w + 3 + r, G], [d - w + r, G - 3], [d + H, b + 3]), u(S, k, s.shade), sn(S, N, s.line), e.line(S, d + 1, f + 3, d + 1, f + 8, s.shade), e.line(S, l - 1, f + 3, l - 1, f + 8, s.hi), e.line(S, l - 2, b + 4, l + w - 2 + r, G - 4, s.hi), e.line(S, d + 2, b + 5, d - w + 2 + r, G - 4, s.deep), e.line(S, c + (t ? -1 : 2), b + 4, c + (t ? -2 : 3) + r, G - 3, s.shade), on(S, p, o), e.line(S, d - w + 2 + r, G - 1, c - 2 + r, G, o.deep), e.line(S, c + 2 + r, G, l + w - 2 + r, G - 1, o.deep), t ? (e.r(S, c - 3, f, 6, 2, o.base), e.r(S, c - 2, f, 4, 1, o.hi), e.line(S, c - 3, f + 2, c + 2, f + 2, s.deep), Na(S, c - 3, f + 3, Sn, g, !1)) : (e.line(S, c - 2, f, c, f + 3, o.shade), e.fatLine(S, c + 2, f, d + 2, b - 1, 2, o.base), e.line(S, c + 3, f, d + 3, b - 1, o.hi), e.line(S, c + 4, f + 1, d + 4, b - 1, s.deep), Na(S, d - w + 3 + r, G - 6, en, g, !1)), e.r(S, d, b, l - d + 1, 3, i.base), e.r(S, d, b, l - d + 1, 1, i.hi), e.r(S, d, b + 2, l - d + 1, 1, i.line), e.line(S, d, b + 1, l, b + 1, B.deep), !t) {
          var m = c - 3;
          var v = a.p.sit ? 4 : 7;
          Na(S, m, b, $B, g, !1);
          e.line(S, m + 3, b + 3, m + 2 - r, b + 2 + v, B.shade);
          e.line(S, m + 4, b + 3, m + 5 + r, b + 1 + v, B.base);
          e.dot(S, m + 2 - r, b + 3 + v, o.base);
          e.dot(S, m + 5 + r, b + 2 + v, o.shade);
        }
        if (!(a.arms[0].front || a.arms[0].over)) {
          IB(S, a, 0);
        }
      }
    } };
  ln.huyet_anh_y = { sleeve: Bn, under: function (S, e) {
      wB(S, e, e.material.pants, !1);
      if (!(e.arms[0].front || e.arms[0].over)) {
        Bn(S, e, 0);
      }
    }, robe: function (S, a) {
      var s = a.material;
      var o = s.cloth;
      var i = s.trim;
      var B = s.accent;
      var n = s.ash;
      var O = a.torso;
      var t = a.g.side;
      var h = a.g.back;
      var r = qs(a);
      var d = a.p.sit ? 0 : r;
      var l = O.x - 1;
      var f = O.x + O.w;
      var c = O.y - 1;
      var b = O.x + (O.w >> 1);
      var G = O.y + 12;
      var H = G + 3;
      var g = a.p.sit ? 4 : 2;
      var x = a.g.female ? 1 : 0;
      var D = a.p.sit ? .6 : 1;
      var W = { k: i.line, R: B.base, H: B.hi, d: B.deep, a: n.line, h: n.hi };
      if (!t) {
        dn(S, l - g, G, h ? hn : tn, d, 0, D, o, B);
        u(S, [[l + 1, c], [f - 1, c], [f, c + 2], [f - x, G], [f, H], [l, H], [l + x, G], [l, c + 2]], o.line);
        u(S, [[l + 2, c + 1], [f - 2, c + 1], [f - 1, c + 3], [f - 1 - x, G], [f - 1, H], [l + 1, H], [l + 1 + x, G], [l + 1, c + 3]], o.base);
        e.line(S, l + 1, c + 3, l + 1 + x, G - 1, o.shade);
        e.line(S, f - 2, c + 3, f - 2 - x, G - 1, o.hi);
        if (h) {
          Na(S, b - 3, c + 3, nn, W, !1);
        }
        else {
          e.line(S, b + 2, c + 1, l + 2, G - 1, i.base);
          e.line(S, b + 3, c + 1, l + 3, G - 1, i.hi);
          e.line(S, l + 2, G + 2, l + 1, G + 8, i.base);
        }
        e.r(S, b - 3, c - 1, 6, 2, i.line);
        e.r(S, b - 2, c - 1, 4, 1, i.base);
        e.dot(S, b + 1, c - 1, i.hi);
        e.r(S, l, G, f - l + 1, 2, i.hi);
        e.r(S, l, G + 1, f - l + 1, 1, i.base);
        e.r(S, l, G + 2, f - l + 1, 1, i.line);
        var J = h ? b - 4 : b + 2;
        var M = a.p.sit ? 5 : 9;
        e.fatLine(S, J, G + 2, J - 1 - d, G + 2 + M, 2, i.base);
        e.line(S, J + 1, G + 2, J - d, G + 2 + M, i.hi);
        e.line(S, J + 2, G + 2, J + 3 + d, G + M, i.deep);
        e.dot(S, J - 1 - d, G + 3 + M, B.shade);
        if (!(h)) {
          Na(S, b - 2, G - 1, On, W, !1);
        }
        return void (a.arms[0].front || a.arms[0].over || Bn(S, a, 0));
      }
      var w = Us(a);
      dn(S, l - 2 - (a.p.sit ? 2 : 0), G, rn, w, -3, D, o, B);
      u(S, [[l + 1, c], [f, c], [f + 1, c + 3], [f, G], [f, H], [l, H], [l, G], [l, c + 3]], o.line);
      u(S, [[l + 2, c + 1], [f - 1, c + 1], [f, c + 3], [f - 1, G], [f - 1, H], [l + 1, H], [l + 1, G], [l + 1, c + 3]], o.base);
      e.line(S, l + 1, c + 3, l + 1, G - 1, o.shade);
      e.fatLine(S, f - 2, c + 1, f - 1, G - 1, 2, i.base);
      e.r(S, b - 1, c - 1, 5, 2, i.line);
      e.r(S, b, c - 1, 3, 1, i.base);
      e.r(S, l, G, f - l + 1, 2, i.hi);
      e.r(S, l, G + 1, f - l + 1, 1, i.base);
      e.r(S, l, G + 2, f - l + 1, 1, i.line);
      e.fatLine(S, l + 1, G + 2, l - 1 + w, G + (a.p.sit ? 7 : 11), 2, i.base);
      e.line(S, l + 1, G + 2, l - 1 + w, G + (a.p.sit ? 7 : 11), i.hi);
      Na(S, f - 2, G - 1, On.map(function (S) {
        return S.slice(0, 3);
      }), W, !1);
    } };
  var Hn = { line: "#6a655f", deep: "#a29d96", shade: "#cbc6be", base: "#ebe9e3", hi: "#ffffff" };
  var gn = [".WWK.", "WKWKK", "WWWKK", "WWKWK", ".WKK."];
  var xn = ["..R..", ".LGL.", ".GHG.", ".LGL.", "LGGGL", "GHGGG", "GGGGG", "LGGGL", ".LLL."];
  function Dn(S, a, s) {
    var o = a.arms[s];
    var i = w(o);
    var B = h(o);
    var n = a.material.cloth;
    var O = a.material.trim;
    var t = a.material.accent;
    var r = B.x - i.x;
    var d = B.y - i.y;
    var l = Math.sqrt(r * r + d * d) || 1;
    var f = r / l;
    var c = d / l;
    var b = -c;
    var G = f;
    var H = 0 === s && !o.front;
    var g = a.g.side || a.g.back ? 3 : 4;
    var x = B.x - f * g;
    var D = B.y - c * g;
    u(S, [[i.x + 2 * b, i.y + 2 * G], [i.x - 2 * b, i.y - 2 * G], [x - 4 * b, D - 4 * G], [x + 4 * b, D + 4 * G]], H ? n.shade : n.base);
    u(S, [[i.x - 2 * b, i.y - 2 * G], [x - 4 * b, D - 4 * G], [x - 2 * b, D - 2 * G], [i.x - b, i.y - G]], n.deep);
    e.fatLine(S, i.x + 2 * f, i.y + 2 * c, Math.round(x - f), Math.round(D - c), 2, H ? n.shade : n.hi);
    e.line(S, Math.round(i.x + 5 * f), Math.round(i.y + 5 * c), Math.round(x - 2), Math.round(D - 2), n.shade);
    e.line(S, Math.round(x - 4 * b), Math.round(D - 4 * G), Math.round(x + 4 * b), Math.round(D + 4 * G), H ? n.shade : n.hi);
    e.line(S, Math.round(x - 3 * b - f), Math.round(D - 3 * G - c), Math.round(x + 3 * b - f), Math.round(D + 3 * G - c), O.base);
    e.dot(S, Math.round(x - 2 * f), Math.round(D - 2 * c), t.base);
  }
  function Wn(S, a, s, o, i) {
    e.r(S, a - 3, s - 5, 7, 4, "#1d2130");
    e.r(S, a - 3, s - 5, 7, 1, "#3a3f52");
    e.r(S, a - 3, s - 2, 7, 1, o.deep);
    e.r(S, a - 3, s - 1, 7, 1, o.base);
    e.r(S, a - 1, s - 5, 3, 3, o.base);
    e.dot(S, a, s - 4, "#10121a");
    e.r(S, a - 6, s - 2, 3, 1, o.base);
    e.dot(S, a - 7, s - 3, o.hi);
    if (!(i)) {
      e.r(S, a + 4, s - 2, 3, 1, o.base);
      e.dot(S, a + 7, s - 3, o.hi);
    }
  }
  function Jn(s, o) {
    for (var i = S.Palette.pick("SKIN", o.cfg.skin, "light"), B = o.torso, n = o.neck, O = 0; O < 2; O++) {
      var t = o.legs[O];
      M(s, t.x, t.y, t.w, t.h, i);
    }
    if (!(o.arms[0].front || o.arms[0].over)) {
      p(s, o.arms[0], i, !0);
    }
    if (o.g.female) {
      u(s, [[B.x + 1, B.y], [B.x + B.w - 2, B.y], [B.x + B.w - 1, B.y + 4], [B.x + B.w - 2, B.y + 10], [B.x + B.w, B.y + B.h], [B.x, B.y + B.h], [B.x + 1, B.y + 10], [B.x, B.y + 4]], i.base);
      e.line(s, B.x + 1, B.y + 3, B.x + 2, B.y + 10, i.shade);
      e.line(s, B.x + B.w - 2, B.y + 3, B.x + B.w - 3, B.y + 10, i.hi);
    }
    else {
      M(s, B.x, B.y, B.w, B.h, i);
    }
    M(s, B.x, B.y + B.h - 6, B.w, 6, G.pants);
    M(s, n.x, n.y, n.w, a.NECK_H + 1, i);
    (function (a, s) {
      var o = s.head;
      var i = s.g;
      var B = S.Palette.pick("SKIN", s.cfg.skin, "light");
      var n = o.x;
      var O = o.y;
      var t = o.w;
      var h = G.face;
      u(a, [[n + 2, O], [n + t - 3, O], [n + t, O + 5], [n + t - 1, O + 12], [n + t - 4, O + 16], [n + 3, O + 16], [n, O + 12], [n, O + 4]], B.base);
      e.r(a, n, O + 4, 1, 8, B.deep);
      e.r(a, n + 1, O + 6, 1, 7, B.shade);
      e.r(a, n + t - 2, O + 5, 1, 8, B.hi);
      e.r(a, n + 3, O + 15, t - 6, 1, B.shade);
      if (!(i.back)) {
        if (i.side) {
          e.r(a, n + t - 1, O + 9, 2, 3, B.base);
          e.dot(a, n + t, O + 9, B.hi);
          e.r(a, n + 3, O + 7, 3, 5, B.base);
          e.r(a, n + 5, O + 8, 1, 3, B.line);
          e.dot(a, n + 5, O + 11, B.line);
          e.r(a, n + 3, O + 7, 1, 5, B.shade);
          e.dot(a, n + 4, O + 9, B.deep);
          e.dot(a, n + 4, O + 10, B.shade);
          e.r(a, n + 4, O + 7, 2, 1, B.hi);
          e.dot(a, n + 4, O + 11, B.deep);
          e.r(a, n + 1, O + 11, 1, 4, B.shade);
        }
        else {
          e.dot(a, n + 6, O + 12, B.shade);
          e.dot(a, n + 7, O + 12, B.hi);
          e.dot(a, n + 2, O + 12, h.blush);
          e.dot(a, n + t - 3, O + 12, h.blush);
          e.r(a, n - 1, O + 9, 1, 3, B.shade);
          e.r(a, n + t, O + 9, 1, 3, B.base);
        }
      }
    })(s, o);
  }
  function un(e, a) {
    var s = S.Palette.pick("SKIN", a.cfg.skin, "light");
    if ((a.arms[0].front || a.arms[0].over)) {
      p(e, a.arms[0], s, !0);
    }
    p(e, a.arms[1], s, !1);
  }
  var Mn = { line: "#07080b", base: "#17191f", hi: "#30343d", seam: "#0b0c10" };
  function wn(a, s) {
    (function (a, s) {
      if (s.g.female) {
        !function (S, a) {
          var s = a.torso;
          var o = Mn;
          var i = s.y + 3;
          var B = s.x - 1;
          var n = s.w + 2;
          if (a.g.back) {
            e.r(S, B, i + 1, n, 2, o.line);
            return void e.r(S, B + 1, i + 1, n - 2, 1, o.base);
          }
          if (e.r(S, B, i, n, 5, o.line), e.r(S, B + 1, i + 1, n - 2, 3, o.base), e.r(S, B + 1, i + 1, n - 2, 1, o.hi), !a.g.side) {
            var O = s.x + Math.floor(s.w / 2);
            e.r(S, O, i + 2, 1, 2, o.seam);
            e.r(S, O - 2, i - 2, 1, 2, o.line);
            e.r(S, O + 1, i - 2, 1, 2, o.line);
          }
        }(a, s);
      }
      else if (!s.g.side && !s.g.back) {
        var o = s.torso;
        var i = o.x + Math.floor(o.w / 2);
        var B = S.Palette.pick("SKIN", s.cfg.skin, "light");
        e.r(a, i - 3, o.y + 4, 2, 1, B.shade);
        e.r(a, i + 1, o.y + 4, 2, 1, B.shade);
        e.dot(a, i - 4, o.y + 6, B.shade);
        e.r(a, i - 3, o.y + 7, 2, 1, B.shade);
        e.dot(a, i + 3, o.y + 6, B.shade);
        e.r(a, i + 1, o.y + 7, 2, 1, B.shade);
      }
    })(a, s);
    (function (a, s) {
      var o = s.torso;
      var i = Mn;
      var B = o.x - 1;
      var n = o.w + 2;
      var O = B + Math.floor(n / 2);
      var t = o.y + o.h - 4;
      var h = Math.min(s.legs[0].knee, s.legs[1].knee) - 2;
      var r = t + 7;
      if (h <= r) {
        h = r + 2;
      }
      var d = S.Palette.pick("SKIN", s.cfg.skin, "light");
      var l = o.y + o.h - 6;
      e.r(a, o.x, l, o.w, t - l, d.base);
      e.r(a, o.x, l, 1, t - l, d.line);
      e.r(a, o.x + 1, l, 1, t - l, d.shade);
      e.r(a, o.x + o.w - 1, l, 1, t - l, d.hi);
      u(a, [[B, t], [B + n, t], [B + n + 1, h - 1], [O + 2, h], [O + 1, r], [O, r - 1], [O - 1, r], [O - 2, h], [B - 1, h - 1]], i.line);
      e.r(a, B + 1, t + 1, n - 2, h - t - 2, i.base);
      e.r(a, B + 1, h - 3, Math.max(2, O - B - 3), 2, i.base);
      e.r(a, O + 2, h - 3, Math.max(2, B + n - O - 3), 2, i.base);
      e.r(a, B + 1, t, n - 2, 1, i.hi);
      e.r(a, B + 1, t + 2, 1, 5, i.hi);
      e.r(a, B + n - 2, t + 2, 1, 4, i.hi);
      e.r(a, B + 2, h - 2, Math.max(1, O - B - 4), 1, i.hi);
      e.r(a, O + 3, h - 2, Math.max(1, B + n - O - 5), 1, i.hi);
      e.r(a, O, r + 1, 1, Math.max(1, h - r - 2), i.seam);
      e.r(a, B + 1, t + 2, n - 2, 1, i.seam);
    })(a, s);
  }
  var Nn = { ao_thon_lac: { stitch: "#9ba091" }, lu_hanh_moc: { stitch: "#b28b68" } };
  var pn = { line: "#30241e", deep: "#49362b", base: "#785638", hi: "#aa8353" };
  function kn(S) {
    return !(!S || !Nn[S.outfit]);
  }
  function mn(S, a, s) {
    var o = a.material.cloth;
    var i = a.material.trim;
    var B = a.arms[s];
    var n = h(B);
    var O = B.x - 1;
    var t = B.y + 1;
    var r = B.w + 2;
    var d = n.y - 4;
    var l = d - t;
    if (!(l < 3)) {
      e.r(S, O, t, r, l + 2, o.line);
      e.r(S, O + 1, t + 1, r - 2, l, 0 === s ? o.deep : o.base);
      e.r(S, O + 1, t + 2, 1, Math.max(1, l - 2), 0 === s ? o.shade : o.hi);
      e.r(S, O, d, r, 2, i.deep);
      e.r(S, O + 1, d, r - 2, 1, i.base);
      e.dot(S, O + 1, d - 1, i.hi);
    }
  }
  function vn(s, o) {
    if ("toc_truong_y" !== o.cfg.outfit) {
      if ("quan_dui" !== o.cfg.outfit)
        if (kn(o.cfg)) {
          !function (S, a) {
            var s = a.material.pants;
            if (a.p.sit) {
              for (var o = a.torso.x + Math.floor(a.torso.w / 2), i = 0; i < 2; i++) {
                var B = a.legs[i];
                e.fatLine(S, B.x + 1, B.y, B.x + (i ? 3 : -2), B.knee, 5, s.shade);
                e.fatLine(S, B.x + (i ? 3 : -2), B.knee, o + (i ? -3 : 2), B.foot - 2, 5, s.base);
              }
            }
            else {
              !function (S, a) {
                for (var s = a.material.pants, o = 0; o < 2; o++) {
                  var i = a.legs[o];
                  var B = i.x - 1;
                  var n = i.y;
                  var O = i.w + 2;
                  var t = i.foot - 4;
                  var h = t - n;
                  if (!(h < 5)) {
                    e.r(S, B, n, O, h, s.line);
                    e.r(S, B + 1, n + 1, O - 2, h - 2, 0 === o ? s.deep : s.base);
                    e.r(S, B + 1, n + 4, 1, Math.max(1, h - 9), s.hi);
                    e.r(S, B + O - 2, n + 3, 1, Math.max(1, h - 8), s.shade);
                    e.r(S, B + 1, i.knee - 2, O - 2, 1, s.shade);
                    e.r(S, B, t - 2, O, 2, s.deep);
                    e.r(S, B + 1, t - 2, O - 2, 1, s.hi);
                  }
                }
              }(S, a);
            }
            if (!(a.arms[0].front || a.arms[0].over)) {
              mn(S, a, 0);
            }
          }(s, o);
        }
        else if ("long_tuong_y" !== o.cfg.outfit)
          if (ln[o.cfg.outfit]) {
            ln[o.cfg.outfit].under(xB(s), o);
          }
          else if ("lan_thanh_y" !== o.cfg.outfit)
            if ("sat_luc_y" !== o.cfg.outfit)
              if ("tan_mo_y" !== o.cfg.outfit)
                if ("thanh_tam_y" !== o.cfg.outfit)
                  if ("thien_luan_kiem_y" !== o.cfg.outfit)
                    if ("tuyet_son_kiem_y" !== o.cfg.outfit)
                      if ("man_ho_tu_y" !== o.cfg.outfit)
                        if ("than_kiem_y" !== o.cfg.outfit)
                          if ("chi_ton_kiem_y" !== o.cfg.outfit)
                            if ("hoat_tu_y" !== o.cfg.outfit)
                              if ("nam_tu_y" !== o.cfg.outfit)
                                if ("hong_ty" !== o.cfg.outfit)
                                  if ("nam_y_bao" !== o.cfg.outfit)
                                    if ("vuong_lam_y" !== o.cfg.outfit)
                                      if ("huyen_cot_y" !== o.cfg.outfit) {
                                        var i = o.material.cloth;
                                        var B = o.material.trim;
                                        var n = o.material.pants;
                                        if ("bach_kim_an_dien_bao" !== o.cfg.outfit)
                                          if ("thanh_lam_dao_bao" !== o.cfg.outfit)
                                            if ("bach_nguyet_hong_lien" !== o.cfg.outfit)
                                              if ("van_lo_lao_ma_bao" !== o.cfg.outfit)
                                                if ("man_ho_tu_bao" !== o.cfg.outfit)
                                                  if ("ma_vuong_bao" !== o.cfg.outfit)
                                                    if ("xich_ma_y" !== o.cfg.outfit)
                                                      if ("dai_phu_bao" !== o.cfg.outfit)
                                                        if ("npc_long_bao" !== o.cfg.outfit)
                                                          if ("huan_su_bao" !== o.cfg.outfit)
                                                            if ("tho_ren_moi" !== o.cfg.outfit) {
                                                              for (var O = 0; O < 2; O++) {
                                                                var t = o.legs[O];
                                                                var h = t.knee;
                                                                if (o.p.sit) {
                                                                  var r = o.legs[1 - O];
                                                                  var d = o.torso.x + Math.floor(o.torso.w / 2);
                                                                  e.fatLine(s, t.x + 1, t.y, t.x + (O ? 3 : -2), t.knee, 5, n.shade);
                                                                  e.fatLine(s, t.x + (O ? 3 : -2), t.knee, d + (O ? -3 : 2), t.foot - 2, 5, n.base);
                                                                  e.line(s, t.x + (O ? 3 : -2), t.knee - 1, d + (O ? -3 : 2), t.foot - 3, B.shade);
                                                                  e.r(s, Math.min(t.x, r.x) - 1, t.foot - 1, Math.abs(t.x - r.x) + t.w + 2, 1, n.line);
                                                                }
                                                                else {
                                                                  M(s, t.x, t.y, t.w, t.h, n);
                                                                  M(s, t.x, h, t.w, 4, B);
                                                                  e.line(s, t.x, h + 1, t.x + t.w - 1, h, B.hi);
                                                                  e.line(s, t.x, h + 4, t.x + t.w - 1, h + 3, B.line);
                                                                  e.r(s, t.x + (O ? 0 : t.w - 1), h + 5, 1, Math.max(1, t.foot - h - 9), n.line);
                                                                }
                                                              }
                                                              if ("tho_ren" !== o.cfg.outfit) {
                                                                var l = o.torso;
                                                                var f = Math.max(o.legs[0].knee, o.legs[1].knee);
                                                                u(s, [[l.x, l.y + l.h - 5], [l.x + l.w, l.y + l.h - 5], [l.x + l.w + 3, f + 2], [l.x - 3, f + 2]], i.deep);
                                                                if (!(o.arms[0].front || o.arms[0].over)) {
                                                                  cn(s, o, 0);
                                                                }
                                                              }
                                                            }
                                                            else {
                                                              !function (S, a) {
                                                                for (var s = a.material.pants, o = a.torso, i = G.metal, B = 0; B < 2; B++) {
                                                                  var n = a.legs[B];
                                                                  if (a.p.sit) {
                                                                    e.fatLine(S, n.x + 1, n.y, n.x + (B ? 3 : -2), n.knee, 5, s.shade);
                                                                    e.fatLine(S, n.x + (B ? 3 : -2), n.knee, o.x + Math.floor(o.w / 2) + (B ? -3 : 2), n.foot - 2, 5, s.base);
                                                                  }
                                                                  else {
                                                                    M(S, n.x, n.y, n.w, n.h, s);
                                                                    M(S, n.x - 1, n.knee, n.w + 2, 6, G.leather);
                                                                    e.line(S, n.x - 1, n.knee, n.x + n.w, n.knee, i.shade);
                                                                    e.dot(S, n.x, n.knee + 2, i.base);
                                                                    e.dot(S, n.x + n.w - 1, n.knee + 3, i.shade);
                                                                    e.r(S, n.x + (B ? 0 : n.w - 1), n.knee + 7, 1, Math.max(1, n.foot - n.knee - 11), s.line);
                                                                  }
                                                                }
                                                                if (!(a.arms[0].front || a.arms[0].over)) {
                                                                  IS(S, a, 0);
                                                                }
                                                              }(s, o);
                                                            }
                                                          else {
                                                            !function (S, a) {
                                                              for (var s = a.material.pants, o = a.torso, i = 0; i < 2; i++) {
                                                                var B = a.legs[i];
                                                                if (a.p.sit) {
                                                                  e.fatLine(S, B.x + 1, B.y, B.x + (i ? 3 : -2), B.knee, 5, s.shade);
                                                                  e.fatLine(S, B.x + (i ? 3 : -2), B.knee, o.x + Math.floor(o.w / 2) + (i ? -3 : 2), B.foot - 2, 5, s.base);
                                                                }
                                                                else {
                                                                  M(S, B.x, B.y, B.w, B.h, s);
                                                                  M(S, B.x, B.knee, B.w, 4, G.leather);
                                                                  e.line(S, B.x, B.knee + 1, B.x + B.w - 1, B.knee, G.leather.hi);
                                                                  e.r(S, B.x + (i ? 0 : B.w - 1), B.knee + 5, 1, Math.max(1, B.foot - B.knee - 9), s.line);
                                                                }
                                                              }
                                                              if (!(a.arms[0].front || a.arms[0].over)) {
                                                                TS(S, a, 0);
                                                              }
                                                            }(s, o);
                                                          }
                                                        else {
                                                          !function (S, a) {
                                                            for (var s = a.material.pants, o = a.torso, i = 0; i < 2; i++) {
                                                              var B = a.legs[i];
                                                              if (a.p.sit) {
                                                                e.fatLine(S, B.x + 1, B.y, B.x + (i ? 3 : -2), B.knee, 5, s.shade);
                                                                e.fatLine(S, B.x + (i ? 3 : -2), B.knee, o.x + Math.floor(o.w / 2) + (i ? -3 : 2), B.foot - 2, 5, s.base);
                                                              }
                                                              else {
                                                                M(S, B.x - 1, B.y, B.w + 2, B.h, s);
                                                                e.r(S, B.x - 1, Math.max(B.y, B.knee - 2), B.w + 2, 2, s.deep);
                                                                e.line(S, B.x, B.knee, B.x + B.w, B.knee, s.hi);
                                                                e.line(S, B.x + (i ? 0 : B.w), B.y + 5, B.x + (i ? 0 : B.w), B.foot - 5, s.line);
                                                              }
                                                            }
                                                            if (!a.p.sit) {
                                                              var n = Math.min(54, Math.max(a.legs[0].knee, a.legs[1].knee) + 3);
                                                              e.r(S, o.x - 2, o.y + o.h - 3, o.w + 4, 2, s.deep);
                                                              e.line(S, o.x - 1, o.y + o.h - 1, o.x - 2, n, s.shade);
                                                              e.line(S, o.x + o.w + 1, o.y + o.h - 1, o.x + o.w + 2, n, s.hi);
                                                            }
                                                            if (!(a.arms[0].front || a.arms[0].over)) {
                                                              RS(S, a, 0);
                                                            }
                                                          }(s, o);
                                                        }
                                                      else {
                                                        !function (S, a) {
                                                          for (var s = a.material.pants, o = a.material.cloth, i = a.torso, B = 0; B < 2; B++) {
                                                            var n = a.legs[B];
                                                            if (a.p.sit) {
                                                              e.fatLine(S, n.x + 1, n.y, n.x + (B ? 3 : -2), n.knee, 5, o.shade);
                                                              e.fatLine(S, n.x + (B ? 3 : -2), n.knee, i.x + Math.floor(i.w / 2) + (B ? -3 : 2), n.foot - 2, 5, o.base);
                                                            }
                                                            else {
                                                              M(S, n.x, n.y, n.w, n.h, s);
                                                            }
                                                          }
                                                          if (!(a.arms[0].front || a.arms[0].over)) {
                                                            Dn(S, a, 0);
                                                          }
                                                        }(s, o);
                                                      }
                                                    else {
                                                      !function (a, s) {
                                                        for (var o = g.xich_ma_y, i = o.rock, B = o.lava, n = o.cloth, O = s.torso, t = 0; t < 2; t++) {
                                                          var h = s.legs[t];
                                                          if (s.p.sit) {
                                                            var r = O.x + Math.floor(O.w / 2);
                                                            e.fatLine(a, h.x + (t ? 3 : -2), h.knee, r + (t ? -3 : 2), h.foot - 2, 4, i.base);
                                                            e.line(a, h.x + (t ? 3 : -2), h.knee - 1, r + (t ? -3 : 2), h.foot - 3, i.hi);
                                                          }
                                                          else {
                                                            var d = h.x - 1;
                                                            var l = h.w + 2;
                                                            var f = h.knee - 1;
                                                            var c = Math.min(h.foot - 6, f + 6);
                                                            M(a, d, h.y + 1, l, f - h.y, S.Palette.pick("SKIN", s.cfg.skin, "light"));
                                                            e.r(a, d, f, l, c - f + 1, i.line);
                                                            e.r(a, d + 1, f + 1, l - 2, c - f - 1, i.base);
                                                            e.r(a, d + 1, f + 1, 1, c - f - 1, i.hi);
                                                            e.r(a, d + l - 2, f + 2, 1, c - f - 2, i.shade);
                                                            e.r(a, d, f, l, 2, i.deep);
                                                            e.r(a, d + 1, f, l - 2, 1, i.hi);
                                                            e.dot(a, d + Math.floor(l / 2), f - 1, i.hi);
                                                            e.dot(a, h.x + 1, f + 3, B.base);
                                                            e.dot(a, h.x + 2, f + 4, B.deep);
                                                            e.r(a, h.x, h.foot - 5, h.w, 1, n.deep);
                                                            e.r(a, h.x, h.foot - 4, h.w, 1, n.base);
                                                          }
                                                        }
                                                        if (!(s.arms[0].front || s.arms[0].over)) {
                                                          aO(a, s, 0);
                                                        }
                                                      }(s, o);
                                                    }
                                                  else {
                                                    !function (S, a) {
                                                      for (var s = a.material, o = s.pants, i = s.trim, B = s.accent, n = a.torso, O = 0; O < 2; O++) {
                                                        var t = a.legs[O];
                                                        if (a.p.sit) {
                                                          var h = n.x + Math.floor(n.w / 2);
                                                          e.fatLine(S, t.x + 1, t.y, t.x + (O ? 3 : -2), t.knee, 6, o.shade);
                                                          e.fatLine(S, t.x + (O ? 3 : -2), t.knee, h + (O ? -3 : 2), t.foot - 2, 5, o.base);
                                                          e.line(S, t.x + (O ? 3 : -2), t.knee - 1, h + (O ? -3 : 2), t.foot - 3, o.hi);
                                                        }
                                                        else {
                                                          var r = t.x - 1;
                                                          var d = t.w + 2;
                                                          var l = t.foot - 1;
                                                          e.r(S, r, t.y, d, l - t.y, o.line);
                                                          e.r(S, r + 1, t.y, d - 2, l - t.y - 1, o.base);
                                                          e.r(S, r + 1, t.y, 1, l - t.y - 1, o.shade);
                                                          e.r(S, r + d - 2, t.y + 1, 1, l - t.y - 2, o.hi);
                                                          e.r(S, r + 2, t.y + 2, 1, Math.max(1, t.knee - t.y - 4), o.deep);
                                                          var f = Math.max(t.y, t.knee - 2);
                                                          e.r(S, r, f, d, 2, i.deep);
                                                          e.r(S, r + 1, f, d - 2, 1, i.base);
                                                          e.dot(S, r + 1, f, i.hi);
                                                          e.dot(S, r + Math.floor(d / 2), f + 1, B.base);
                                                          e.line(S, r + 1, t.foot - 8, r + d - 2, t.foot - 7, o.deep);
                                                        }
                                                      }
                                                      if (!a.p.sit) {
                                                        var c = Math.min(53, Math.max(a.legs[0].knee, a.legs[1].knee) + 2);
                                                        u(S, [[n.x + 2, n.y + n.h - 3], [n.x + n.w - 2, n.y + n.h - 3], [n.x + n.w + 2, c], [n.x - 2, c]], o.base);
                                                        e.line(S, n.x + 3, n.y + n.h - 1, n.x, c - 1, o.shade);
                                                        e.line(S, n.x + n.w - 3, n.y + n.h - 1, n.x + n.w + 1, c - 1, o.hi);
                                                        e.r(S, n.x - 1, n.y + n.h - 3, n.w + 2, 2, o.deep);
                                                      }
                                                      if (!(a.arms[0].front || a.arms[0].over)) {
                                                        mS(S, a, 0);
                                                      }
                                                    }(s, o);
                                                  }
                                                else {
                                                  !function (S, a) {
                                                    var s = a.material;
                                                    var o = s.pants;
                                                    var i = s.trim;
                                                    var B = a.torso;
                                                    if (a.p.sit) {
                                                      u(S, [[B.x - 1, B.y + B.h - 6], [B.x + B.w, B.y + B.h - 6], [B.x + B.w + 3, 60], [B.x - 4, 60]], o.deep);
                                                    }
                                                    for (var n = 0; n < 2; n++) {
                                                      var O = a.legs[n];
                                                      if (a.p.sit) {
                                                        var t = B.x + Math.floor(B.w / 2);
                                                        e.fatLine(S, O.x + 1, O.y, O.x + (n ? 3 : -2), O.knee, 6, o.shade);
                                                        e.fatLine(S, O.x + (n ? 3 : -2), O.knee, t + (n ? -3 : 2), O.foot - 2, 5, o.base);
                                                        e.line(S, O.x + (n ? 3 : -2), O.knee - 1, t + (n ? -3 : 2), O.foot - 3, o.hi);
                                                      }
                                                      else {
                                                        var h = O.x - 1;
                                                        var r = O.w + 2;
                                                        e.r(S, h, O.y, r, O.h, o.line);
                                                        e.r(S, h + 1, O.y, r - 2, O.h - 1, o.base);
                                                        e.r(S, h + 1, O.y, 1, O.h - 1, o.shade);
                                                        e.r(S, h + r - 2, O.y + 1, 1, O.h - 2, o.hi);
                                                        var d = Math.max(O.y, O.knee - 1);
                                                        e.r(S, h, d, r, 3, i.line);
                                                        e.r(S, h + 1, d, r - 2, 2, i.base);
                                                        e.r(S, h + 1, d, r - 2, 1, i.hi);
                                                        e.dot(S, h + (n ? r - 2 : 1), d + 1, i.deep);
                                                        e.line(S, h + 1, O.foot - 7, h + r - 2, O.foot - 6, o.deep);
                                                      }
                                                    }
                                                    if (!(a.p.sit)) {
                                                      u(S, [[B.x + 1, B.y + B.h - 4], [B.x + B.w - 2, B.y + B.h - 4], [B.x + B.w + 2, B.y + B.h + 12], [B.x - 2, B.y + B.h + 12]], o.base);
                                                      e.line(S, B.x + Math.floor(B.w / 2), B.y + B.h - 2, B.x + Math.floor(B.w / 2), B.y + B.h + 11, o.line);
                                                    }
                                                    if (!(a.arms[0].front || a.arms[0].over)) {
                                                      gS(S, a, 0);
                                                    }
                                                  }(s, o);
                                                }
                                              else {
                                                !function (S, a) {
                                                  for (var s = a.material.pants, o = a.material.cloth, i = a.material.trim, B = a.torso, n = 0; n < 2; n++) {
                                                    var O = a.legs[n];
                                                    if (a.p.sit) {
                                                      e.fatLine(S, O.x + 1, O.y, O.x + (n ? 3 : -2), O.knee, 5, s.shade);
                                                      e.fatLine(S, O.x + (n ? 3 : -2), O.knee, B.x + Math.floor(B.w / 2) + (n ? -3 : 2), O.foot - 2, 5, s.base);
                                                    }
                                                    else {
                                                      M(S, O.x, O.y, O.w, O.h, s);
                                                    }
                                                    var t = Math.max(O.y, O.foot - 4);
                                                    e.line(S, O.x, t, O.x + O.w - 1, t, i.base);
                                                    e.r(S, O.x, t + 1, O.w, 1, o.shade);
                                                  }
                                                  var h = Math.max(a.legs[0].knee, a.legs[1].knee) + 2;
                                                  if (!(a.p.sit)) {
                                                    u(S, [[B.x + 2, B.y + B.h - 3], [B.x + B.w - 2, B.y + B.h - 3], [B.x + B.w + 2, h], [B.x - 2, h]], o.base);
                                                    e.line(S, B.x + 3, B.y + B.h - 1, B.x + 1, h - 1, o.shade);
                                                    e.line(S, B.x + B.w - 3, B.y + B.h - 1, B.x + B.w + 1, h - 1, o.hi);
                                                    e.line(S, B.x + 4, h - 2, B.x + B.w - 4, h - 2, o.deep);
                                                  }
                                                  if (!(a.arms[0].front || a.arms[0].over)) {
                                                    BS(S, a, 0);
                                                  }
                                                }(s, o);
                                              }
                                            else {
                                              !function (S, a) {
                                                for (var s = a.material, o = s.pants, i = s.cloth, B = a.torso, n = 0; n < 2; n++) {
                                                  var O = a.legs[n];
                                                  if (a.p.sit) {
                                                    e.fatLine(S, O.x + 1, O.y, O.x + (n ? 3 : -2), O.knee, 5, i.shade);
                                                    e.fatLine(S, O.x + (n ? 3 : -2), O.knee, B.x + Math.floor(B.w / 2) + (n ? -3 : 2), O.foot - 2, 5, i.base);
                                                  }
                                                  else {
                                                    M(S, O.x, O.y, O.w, O.h, o);
                                                  }
                                                }
                                                if (a.g.side && !a.p.sit) {
                                                  var t = z(a);
                                                  var h = Us(a);
                                                  Na(S, B.x - 3, B.y + 13, P, t, !1, Rs(2 * h, 4, 14));
                                                }
                                                if (!(a.arms[0].front || a.arms[0].over)) {
                                                  oS(S, a, 0);
                                                }
                                              }(s, o);
                                            }
                                          else {
                                            !function (S, a) {
                                              for (var s = a.material, o = s.pants, i = s.cloth, B = a.torso, n = 0; n < 2; n++) {
                                                var O = a.legs[n];
                                                if (a.p.sit) {
                                                  e.fatLine(S, O.x + 1, O.y, O.x + (n ? 3 : -2), O.knee, 5, i.deep);
                                                  e.fatLine(S, O.x + (n ? 3 : -2), O.knee, B.x + Math.floor(B.w / 2) + (n ? -3 : 2), O.foot - 2, 5, i.shade);
                                                }
                                                else {
                                                  M(S, O.x, O.y, O.w, O.h, o);
                                                }
                                              }
                                              if (!(a.arms[0].front || a.arms[0].over)) {
                                                V(S, a, 0);
                                              }
                                            }(s, o);
                                          }
                                        else {
                                          !function (S, a) {
                                            for (var s = a.material, o = s.pants, i = s.cloth, B = a.torso, n = 0; n < 2; n++) {
                                              var O = a.legs[n];
                                              if (a.p.sit) {
                                                e.fatLine(S, O.x + 1, O.y, O.x + (n ? 3 : -2), O.knee, 5, i.deep);
                                                e.fatLine(S, O.x + (n ? 3 : -2), O.knee, B.x + Math.floor(B.w / 2) + (n ? -3 : 2), O.foot - 2, 5, i.shade);
                                              }
                                              else {
                                                M(S, O.x, O.y, O.w, O.h, o);
                                              }
                                            }
                                            if (!(a.arms[0].front || a.arms[0].over)) {
                                              XS(S, a, 0);
                                            }
                                          }(s, o);
                                        }
                                      }
                                      else {
                                        !function (S, a) {
                                          var s = a.material.pants;
                                          var o = a.torso;
                                          if (a.p.sit) {
                                            u(S, [[o.x - 1, o.y + o.h - 6], [o.x + o.w, o.y + o.h - 6], [o.x + o.w + 2, 60], [o.x - 3, 60]], s.deep);
                                          }
                                          for (var i = 0; i < 2; i++) {
                                            var B = a.legs[i];
                                            if (a.p.sit) {
                                              e.fatLine(S, B.x + 1, B.y, B.x + (i ? 3 : -2), B.knee, 5, s.shade);
                                              e.fatLine(S, B.x + (i ? 3 : -2), B.knee, o.x + Math.floor(o.w / 2) + (i ? -3 : 2), B.foot - 2, 5, s.base);
                                              e.line(S, B.x + (i ? 3 : -2), B.knee - 1, o.x + Math.floor(o.w / 2) + (i ? -3 : 2), B.foot - 3, s.hi);
                                            }
                                            else {
                                              M(S, B.x, B.y, B.w, B.h, s);
                                            }
                                          }
                                          if (!(a.p.sit)) {
                                            e.r(S, o.x + 1, o.y + o.h - 5, o.w - 2, 6, s.base);
                                            e.r(S, o.x + 1, o.y + o.h - 5, 1, 6, s.shade);
                                            e.r(S, o.x + o.w - 2, o.y + o.h - 5, 1, 6, s.deep);
                                            e.line(S, o.x + Math.floor(o.w / 2), o.y + o.h - 2, o.x + Math.floor(o.w / 2), o.y + o.h, s.line);
                                          }
                                          if (!(a.arms[0].front || a.arms[0].over)) {
                                            be(S, a, 0);
                                          }
                                        }(s, o);
                                      }
                                    else {
                                      !function (S, a) {
                                        for (var s = a.material.pants, o = a.torso, i = 0; i < 2; i++) {
                                          var B = a.legs[i];
                                          if (a.p.sit) {
                                            e.fatLine(S, B.x + 1, B.y, B.x + (i ? 3 : -2), B.knee, 5, s.shade);
                                            e.fatLine(S, B.x + (i ? 3 : -2), B.knee, o.x + Math.floor(o.w / 2) + (i ? -3 : 2), B.foot - 2, 5, s.base);
                                          }
                                          else {
                                            M(S, B.x, B.y, B.w, B.h, s);
                                          }
                                        }
                                        if (!(a.arms[0].front || a.arms[0].over)) {
                                          ge(S, a, 0);
                                        }
                                      }(s, o);
                                    }
                                  else {
                                    !function (S, a) {
                                      for (var s = a.material.pants, o = a.torso, i = o.x + Math.floor(o.w / 2), B = 0; B < 2; B++) {
                                        var n = a.legs[B];
                                        if (a.p.sit) {
                                          e.fatLine(S, n.x + 1, n.y, n.x + (B ? 3 : -2), n.knee, 5, s.shade);
                                          e.fatLine(S, n.x + (B ? 3 : -2), n.knee, i + (B ? -3 : 2), n.foot - 2, 5, s.base);
                                        }
                                        else {
                                          M(S, n.x - 1, n.y, n.w + 2, n.h, s);
                                          e.r(S, n.x - 1, n.knee - 2, n.w + 2, 3, s.deep);
                                          e.line(S, n.x - 1, n.knee - 2, n.x + n.w, n.knee - 2, s.hi);
                                        }
                                      }
                                      if (!a.p.sit) {
                                        var O = Math.min(56, Math.max(a.legs[0].knee, a.legs[1].knee) + 4);
                                        u(S, [[o.x + 3, o.y + o.h - 3], [o.x + o.w - 3, o.y + o.h - 3], [o.x + o.w + 2, O], [o.x - 2, O]], s.base);
                                        e.line(S, o.x + 3, o.y + o.h - 1, o.x + 1, O - 1, s.shade);
                                        e.line(S, o.x + o.w - 3, o.y + o.h - 1, o.x + o.w + 1, O - 1, s.hi);
                                        e.line(S, i, o.y + o.h - 1, i, O - 1, s.line);
                                        e.r(S, i - 2, o.y + 8, 5, Math.max(5, O - o.y - 8), "#eef2ef");
                                        e.line(S, i - 2, o.y + 9, i - 2, O - 2, "#b9cbd3");
                                        e.line(S, i + 2, o.y + 9, i + 2, O - 2, "#ffffff");
                                      }
                                      if (!(a.arms[0].front || a.arms[0].over)) {
                                        xe(S, a, 0);
                                      }
                                    }(s, o);
                                  }
                                else {
                                  !function (S, a) {
                                    for (var s = { line: "#17120f", deep: "#282019", shade: "#4a3525", base: "#624731", hi: "#806047" }, o = a.torso, i = 0; i < 2; i++) {
                                      var B = a.legs[i];
                                      if (a.p.sit) {
                                        e.fatLine(S, B.x + 1, B.y, B.x + (i ? 3 : -2), B.knee, 5, s.deep);
                                        e.fatLine(S, B.x + (i ? 3 : -2), B.knee, o.x + Math.floor(o.w / 2) + (i ? -3 : 2), B.foot - 2, 5, s.base);
                                      }
                                      else {
                                        M(S, B.x, B.y, B.w, B.h, s);
                                      }
                                    }
                                    if (!(a.arms[0].front || a.arms[0].over)) {
                                      fn(S, a, 0);
                                    }
                                  }(s, o);
                                }
                              else {
                                !function (S, a) {
                                  var s = a.material.pants;
                                  var o = a.torso;
                                  if (a.p.sit) {
                                    u(S, [[o.x - 1, o.y + o.h - 6], [o.x + o.w, o.y + o.h - 6], [o.x + o.w + 2, 60], [o.x - 3, 60]], s.deep);
                                  }
                                  for (var i = 0; i < 2; i++) {
                                    var B = a.legs[i];
                                    if (a.p.sit) {
                                      e.fatLine(S, B.x + 1, B.y, B.x + (i ? 3 : -2), B.knee, 5, s.shade);
                                      e.fatLine(S, B.x + (i ? 3 : -2), B.knee, o.x + Math.floor(o.w / 2) + (i ? -3 : 2), B.foot - 2, 5, s.base);
                                    }
                                    else {
                                      M(S, B.x, B.y, B.w, B.h, s);
                                    }
                                  }
                                  if (!(a.arms[0].front || a.arms[0].over)) {
                                    ve(S, a, 0);
                                  }
                                }(s, o);
                              }
                            else {
                              !function (S, a) {
                                for (var s = a.material.pants, o = a.torso, i = 0; i < 2; i++) {
                                  var B = a.legs[i];
                                  if (a.p.sit) {
                                    e.fatLine(S, B.x + 1, B.y, B.x + (i ? 3 : -2), B.knee, 5, s.shade);
                                    e.fatLine(S, B.x + (i ? 3 : -2), B.knee, o.x + Math.floor(o.w / 2) + (i ? -3 : 2), B.foot - 2, 5, s.base);
                                  }
                                  else {
                                    M(S, B.x, B.y, B.w, B.h, s);
                                  }
                                }
                                if (!(a.arms[0].front || a.arms[0].over)) {
                                  Le(S, a, 0);
                                }
                              }(s, o);
                            }
                          else {
                            !function (S, a) {
                              var s = a.material.pants;
                              var o = a.torso;
                              if (a.p.sit) {
                                u(S, [[o.x - 1, o.y + o.h - 6], [o.x + o.w, o.y + o.h - 6], [o.x + o.w + 2, 60], [o.x - 3, 60]], s.deep);
                              }
                              for (var i = 0; i < 2; i++) {
                                var B = a.legs[i];
                                if (a.p.sit) {
                                  e.fatLine(S, B.x + 1, B.y, B.x + (i ? 3 : -2), B.knee, 5, s.shade);
                                  e.fatLine(S, B.x + (i ? 3 : -2), B.knee, o.x + Math.floor(o.w / 2) + (i ? -3 : 2), B.foot - 2, 5, s.base);
                                }
                                else {
                                  M(S, B.x, B.y, B.w, B.h, s);
                                }
                              }
                              if (!(a.arms[0].front || a.arms[0].over)) {
                                Ve(S, a, 0);
                              }
                            }(s, o);
                          }
                        else {
                          !function (a, s) {
                            var o = s.material;
                            var i = o.pants;
                            var B = s.torso;
                            var n = ws(o, S.Palette.pick("SKIN", s.cfg.skin, "light"));
                            var O = qs(s);
                            if (s.g.side) {
                              Na(a, B.x - 8, B.y - 1, Xs(s, ys, B.y - 1), n, !1, Rs(Us(s), 19, 14));
                            }
                            else {
                              var t = Xs(s, ms, B.y + 1);
                              Na(a, B.x - 8, B.y + 1, t, n, !1, Rs(O, 12, 16));
                              Na(a, B.x + B.w + 7, B.y + 1, t, n, !0, Rs(O, 12, 16));
                            }
                            for (var h = 0; h < 2; h++) {
                              var r = s.legs[h];
                              if (s.p.sit) {
                                e.fatLine(a, r.x + 1, r.y, r.x + (h ? 3 : -2), r.knee, 6, i.shade);
                                e.fatLine(a, r.x + (h ? 3 : -2), r.knee, B.x + Math.floor(B.w / 2) + (h ? -3 : 2), r.foot - 2, 5, i.base);
                                e.line(a, r.x + (h ? 3 : -2), r.knee - 1, B.x + Math.floor(B.w / 2) + (h ? -3 : 2), r.foot - 3, i.hi);
                              }
                              else {
                                var d = r.x - 1;
                                var l = r.w + 2;
                                var f = r.y;
                                var c = r.knee;
                                var b = r.foot - 7;
                                e.r(a, d, f, l, r.foot - f - 6, i.line);
                                e.r(a, d + 1, f, l - 2, r.foot - f - 7, i.base);
                                e.r(a, d + 1, f, 1, r.foot - f - 7, i.shade);
                                e.r(a, d + l - 2, f + 1, 1, r.foot - f - 8, i.hi);
                                e.line(a, d + 2, c, d + 2, c + 3, i.deep);
                                var G = s.g.side ? Us(s) : O;
                                if (G) {
                                  var H = G > 0 ? d + l : d - 1;
                                  e.r(a, H, c + 1, 1, b - c, i.line);
                                  e.r(a, G > 0 ? d + l - 1 : d, c + 1, 1, b - c - 1, G > 0 ? i.hi : i.shade);
                                }
                              }
                            }
                            if (!(s.arms[0].front || s.arms[0].over)) {
                              Vs(a, s, 0);
                            }
                          }(s, o);
                        }
                      else {
                        !function (S, a) {
                          for (var s = a.material.pants, o = a.torso, i = 0; i < 2; i++) {
                            var B = a.legs[i];
                            if (a.p.sit) {
                              e.fatLine(S, B.x + 1, B.y, B.x + (i ? 3 : -2), B.knee, 5, s.shade);
                              e.fatLine(S, B.x + (i ? 3 : -2), B.knee, o.x + Math.floor(o.w / 2) + (i ? -3 : 2), B.foot - 2, 5, s.base);
                            }
                            else {
                              M(S, B.x, B.y, B.w, B.h, s);
                            }
                          }
                          if (!(a.arms[0].front || a.arms[0].over)) {
                            bs(S, a, 0);
                          }
                        }(s, o);
                      }
                    else {
                      !function (S, a) {
                        for (var s = a.material.pants, o = a.torso, i = 0; i < 2; i++) {
                          var B = a.legs[i];
                          if (a.p.sit) {
                            e.fatLine(S, B.x + 1, B.y, B.x + (i ? 3 : -2), B.knee, 5, s.shade);
                            e.fatLine(S, B.x + (i ? 3 : -2), B.knee, o.x + Math.floor(o.w / 2) + (i ? -3 : 2), B.foot - 2, 5, s.base);
                            e.line(S, B.x + (i ? 3 : -2), B.knee - 1, o.x + Math.floor(o.w / 2) + (i ? -3 : 2), B.foot - 3, s.hi);
                          }
                          else {
                            M(S, B.x, B.y, B.w, B.h, s);
                          }
                        }
                        if (!(a.arms[0].front || a.arms[0].over)) {
                          za(S, a, 0);
                        }
                      }(s, o);
                    }
                  else {
                    !function (S, a) {
                      var s = a.material.pants;
                      var o = a.torso;
                      if (a.p.sit) {
                        u(S, [[o.x - 1, o.y + o.h - 6], [o.x + o.w, o.y + o.h - 6], [o.x + o.w + 2, 60], [o.x - 3, 60]], s.deep);
                      }
                      for (var i = 0; i < 2; i++) {
                        var B = a.legs[i];
                        if (a.p.sit) {
                          e.fatLine(S, B.x + 1, B.y, B.x + (i ? 3 : -2), B.knee, 5, s.shade);
                          e.fatLine(S, B.x + (i ? 3 : -2), B.knee, o.x + Math.floor(o.w / 2) + (i ? -3 : 2), B.foot - 2, 5, s.base);
                        }
                        else {
                          M(S, B.x, B.y, B.w, B.h, s);
                        }
                      }
                      if (!(a.arms[0].front || a.arms[0].over)) {
                        Ga(S, a, 0);
                      }
                    }(s, o);
                  }
                else {
                  !function (S, a) {
                    var s = a.material.pants;
                    var o = a.torso;
                    var i = yi(a);
                    var B = qs(a);
                    if (a.g.side) {
                      Na(S, o.x - 8, o.y - 1, Xs(a, Xi, o.y - 1), i, !1, Rs(Us(a), 15, 14));
                    }
                    else {
                      var n = Xs(a, a.g.back ? Qi : Ai, o.y + 1);
                      Na(S, o.x - 8, o.y + 1, n, i, !1, Rs(B, 12, 16));
                      Na(S, o.x + o.w + 7, o.y + 1, n, i, !0, Rs(B, 12, 16));
                    }
                    for (var O = 0; O < 2; O++) {
                      var t = a.legs[O];
                      if (a.p.sit) {
                        e.fatLine(S, t.x + 1, t.y, t.x + (O ? 3 : -2), t.knee, 6, s.shade);
                        e.fatLine(S, t.x + (O ? 3 : -2), t.knee, o.x + Math.floor(o.w / 2) + (O ? -3 : 2), t.foot - 2, 5, s.base);
                        e.line(S, t.x + (O ? 3 : -2), t.knee - 1, o.x + Math.floor(o.w / 2) + (O ? -3 : 2), t.foot - 3, s.hi);
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
                      Ti(S, a, 0);
                    }
                  }(s, o);
                }
              else {
                !function (S, s) {
                  var o = s.material.pants;
                  var i = s.torso;
                  var B = Fo(s);
                  if (!(s.g.side || s.g.back)) {
                    (function (S, s, o) {
                      if (ri(s) && !s.g.side && !s.g.back) {
                        var i = s.g.arms[0].x - 4;
                        var B = a.ARM_Y - 9 + s.dy;
                        OO(S, i, B, Oi, o, !1);
                        e.line(S, i, B + 1, i - 1, B + 7, o.f);
                        e.dot(S, i - 1, B + 8, o.o);
                      }
                    })(S, s, B);
                  }
                  for (var n = 0; n < 2; n++) {
                    var O = s.legs[n];
                    if (s.p.sit) {
                      e.fatLine(S, O.x + 1, O.y, O.x + (n ? 3 : -2), O.knee, 6, o.shade);
                      e.fatLine(S, O.x + (n ? 3 : -2), O.knee, i.x + Math.floor(i.w / 2) + (n ? -3 : 2), O.foot - 2, 5, o.base);
                      e.line(S, O.x + (n ? 3 : -2), O.knee - 1, i.x + Math.floor(i.w / 2) + (n ? -3 : 2), O.foot - 3, o.hi);
                    }
                    else {
                      var t = O.x - 1;
                      var h = O.w + 2;
                      var r = O.y;
                      e.r(S, t, r, h, O.foot - r - 6, o.line);
                      e.r(S, t + 1, r, h - 2, O.foot - r - 7, o.base);
                      e.r(S, t + 1, r, 1, O.foot - r - 7, o.shade);
                      e.r(S, t + h - 2, r + 1, 1, O.foot - r - 8, o.hi);
                    }
                  }
                  if (s.g.side) {
                    var d = s.legs[0];
                    var l = s.p.sit ? -2 : d.x - s.g.legs[0].x;
                    var f = s.p.sit ? 57 : Math.min(56, d.foot - 5);
                    Ra(S, i.x - 6 + l, i.y + i.h - 2, f, Oo(s) ? ii : oi, 8, B, Rs(Us(s), 6, 10));
                  }
                  var c = s.arms[0];
                  if (!(c.front || c.over)) {
                    hi(S, s, 0);
                  }
                }(s, o);
              }
            else {
              !function (S, a) {
                var s = a.material.pants;
                var o = a.torso;
                var i = no(a);
                if (!(a.g.side || a.g.back)) {
                  Eo(S, a, i);
                }
                for (var B = 0; B < 2; B++) {
                  var n = a.legs[B];
                  if (a.p.sit) {
                    e.fatLine(S, n.x + 1, n.y, n.x + (B ? 3 : -2), n.knee, 6, s.shade);
                    e.fatLine(S, n.x + (B ? 3 : -2), n.knee, o.x + Math.floor(o.w / 2) + (B ? -3 : 2), n.foot - 2, 5, s.base);
                    e.line(S, n.x + (B ? 3 : -2), n.knee - 1, o.x + Math.floor(o.w / 2) + (B ? -3 : 2), n.foot - 3, s.hi);
                  }
                  else {
                    var O = n.x - 1;
                    var t = n.w + 2;
                    var h = n.y;
                    e.r(S, O, h, t, n.foot - h - 6, s.line);
                    e.r(S, O + 1, h, t - 2, n.foot - h - 7, s.base);
                    e.r(S, O + 1, h, 1, n.foot - h - 7, s.shade);
                    e.r(S, O + t - 2, h + 1, 1, n.foot - h - 8, s.hi);
                    e.line(S, O + 2, n.knee, O + 2, n.knee + 3, s.deep);
                  }
                }
                if (a.g.side) {
                  var r = a.legs[0];
                  var d = a.p.sit ? -2 : r.x - a.g.legs[0].x;
                  var l = a.p.sit ? 57 : Math.min(57, r.foot - 4);
                  Ra(S, o.x - 6 + d, o.y + o.h - 2, l, Wo, 8, i, Rs(Us(a), 6, 10));
                }
                var f = a.arms[0];
                if (!(f.front || f.over)) {
                  Yo(S, a, 0);
                }
              }(s, o);
            }
          else {
            !function (S, e) {
              wB(S, e, e.material.pants, !1);
              if (!(e.arms[0].front || e.arms[0].over)) {
                qn(xB(S), e, 0);
              }
            }(s, o);
          }
        else {
          !function (S, e) {
            var a = li;
            var s = fi(S);
            var o = s.rect;
            var i = s.line;
            var B = e.torso;
            if (e.p.sit) {
              u(S, [[B.x - 1, B.y + B.h - 6], [B.x + B.w, B.y + B.h - 6], [B.x + B.w + 2, 60], [B.x - 3, 60]], a.ink);
            }
            for (var n = 0; n < 2; n++) {
              var O = e.legs[n];
              if (e.p.sit) {
                i(O.x + 1, O.y, O.x + (n ? 3 : -2), O.knee, a.ink, 6);
                i(O.x + (n ? 3 : -2), O.knee, B.x + B.w / 2 + (n ? -3 : 2), O.foot - 2, a.navy, 5);
                i(O.x + (n ? 3 : -2), O.knee, B.x + B.w / 2 + (n ? -3 : 2), O.foot - 3, a.steel, 2);
              }
              else {
                o(O.x - 1, O.y, O.w + 2, O.h, a.ink);
                o(O.x, O.y, O.w, O.h - 1, a.navy);
                o(O.x + 1, O.y + 1, 1, O.h - 3, a.steel);
              }
            }
            if (!(e.p.sit)) {
              o(B.x + 1, B.y + B.h - 4, B.w - 2, 6, a.navy);
              o(B.x + Math.floor(B.w / 2), B.y + B.h - 2, 1, 4, a.ink);
            }
            var t = e.arms[0];
            if (!(t.front || t.over)) {
              vi(S, e, 0);
            }
          }(s, o);
        }
    }
    else {
      !function (S, a) {
        for (var s = 0; s < 2; s++) {
          var o = a.legs[s];
          if (a.p.sit) {
            e.fatLine(S, o.x + 1, o.y, o.x + (s ? 3 : -2), o.knee, 6, Pi.r);
            e.fatLine(S, o.x + (s ? 3 : -2), o.knee, a.torso.x + Math.floor(a.torso.w / 2) + (s ? -3 : 2), o.foot - 2, 5, Pi.y);
          }
          else {
            var i = o.x - 1;
            var B = o.w + 2;
            var n = o.y;
            e.r(S, i, n, B, o.foot - n - 6, Pi.j);
            e.r(S, i + 1, n, B - 2, o.foot - n - 7, Pi.p);
            e.r(S, i + 1, n, 1, o.foot - n - 7, Pi.r);
          }
        }
        var O = a.arms[0];
        if (!(O.front || O.over)) {
          HB(S, a, 0);
        }
      }(s, o);
    }
  }
  function yn(S, a, s, o, i, B, n, O) {
    var t = a.material.cloth;
    var h = a.material.trim;
    u(S, [[s + 2, o], [s + i - 2, o], [s + i - 1, o + 3], [s + i - 1, o + 7], [s + i - 2, n + 1], [s + 1, n + 1], [s, o + 7], [s, o + 3]], t.base);
    e.r(S, s, o + 4, 1, n - o - 4, t.line);
    e.r(S, s + 1, o + 6, 1, n - o - 7, t.deep);
    e.r(S, s + i - 1, o + 4, 1, n - o - 4, t.shade);
    e.r(S, s + 3, o, i - 6, 1, t.hi);
    e.line(S, s + 3, o + 5, s + 2, n - 2, t.shade);
    e.line(S, s + i - 4, o + 6, s + i - 3, n - 2, t.deep);
    u(S, [[s + 4, o], [O + 1, o + 9], [s + i - 5, o]], h.shade);
    e.fatLine(S, s + 4, o, O, o + 8, 2, h.base);
    e.fatLine(S, s + i - 5, o, O + 1, o + 9, 2, h.hi);
    e.dot(S, O, o + 3, h.hi);
    e.dot(S, O + 1, o + 6, h.base);
    e.line(S, O, o + 9, O + 2, o + 11, h.deep);
    e.line(S, O + 2, o + 10, O + 3, n - 1, h.shade);
    e.line(S, O + 3, o + 11, O + 4, n - 1, t.hi);
  }
  function Ln(S) {
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
  function Cn(S) {
    return S.map(function (S) {
      return S + S.split("").reverse().join("");
    });
  }
  var jn = Cn([".....zS", "...OAHS", ".OAAczS", "OAeAczS", ".OAAacS", ".OaeAcS", ".OAAAAc", ".OccWcc", "..DFffF", "..DEFfF"]);
  var An = Cn([".....zS", "...OAAa", ".OAAAAa", "OAAhAAa", ".OAAAAa", ".OAAAhq", ".OAAAAq", ".OcWWWq", "..DEFFF", "..DEFFf"]);
  var Qn = [".....zSz....", "....OAHSz...", "...OAAAAAO..", "..OAAAAAwAO.", "..OAAAAwDDAO", "..OAhAAwDDEO", "..OAAAwDDEO.", "..OcWWWWWWO.", "...DEFFFFD..", "...DEFFfFD.."];
  var _n = Cn(["......YX", ".zSHSSYN", "zSHsSsYN", ".zsSsSGN", ".......G"]);
  var Yn = [".zSHSSSSzz", "zSHsSsSGNg", ".zsSsSsgNg"];
  var En = [".zSSS", "zSHsS", ".zSsz"];
  var Kn = [".zSSz", "zSHSs", ".zSsz"];
  function qn(S, a, s) {
    var o = DB(a, s);
    var i = a.material;
    var B = i.gold;
    var n = i.trim;
    var O = i.accent;
    var t = i.skirt;
    var h = i.jade;
    var r = o.far;
    var d = Math.max(5, o.len);
    function l(S, e) {
      return o.pt(S, e);
    }
    var f = l(1, 2.8);
    var c = l(.5 * d, 3.4);
    var b = l(d + 2, 3.2);
    e.line(S, f[0], f[1], c[0], c[1], r ? O.deep : O.base);
    e.line(S, c[0], c[1], b[0], b[1], r ? O.deep : O.base);
    var G = l(1, 3.9);
    var H = l(.5 * d, 4.5);
    var g = l(d + 2, 4.3);
    e.line(S, G[0], G[1], H[0], H[1], r ? O.line : O.deep);
    e.line(S, H[0], H[1], g[0], g[1], r ? O.line : O.deep);
    e.dot(S, b[0], b[1] + 1, r ? t.deep : h.base);
    e.dot(S, b[0], b[1] + 2, r ? t.deep : t.base);
    e.dot(S, b[0], b[1] + 3, r ? t.line : t.hi);
    uB(S, o, 3.2, -1.9, 3.2, 1.9, r ? B.deep : B.base);
    uB(S, o, 4.1, -1.9, 4.1, 1.9, r ? B.line : B.deep);
    MB(S, o, 3.2, -.6, r ? B.shade : B.hi);
    uB(S, o, d - 3.4, -2.2, d - 3.4, 2.2, r ? n.deep : n.base);
    uB(S, o, d - 2.4, -2.2, d - 2.4, 2.2, r ? n.shade : n.hi);
    uB(S, o, d - 1.4, -2.2, d - 1.4, 2.2, r ? n.line : n.shade);
    MB(S, o, d - 2.4, 0, r ? h.deep : h.base);
  }
  function Un(S, e, s) {
    var o = Ln(e);
    var i = 0 | e.dy;
    if (e.g.side) {
      if (1 !== s) {
        return;
      }
      Na(S, e.g.arms[1].x - 1, a.ARM_Y - 2 + i, Kn, o, !1);
    }
    else {
      var B = e.g.arms[s].x + 1;
      var n = a.ARM_Y - 2 + i;
      if (0 === s) {
        Na(S, B - 3, n, En, o, !1);
      }
      else {
        Na(S, B + 3, n, En, o, !0);
      }
    }
  }
  function Xn(S, e, a, s) {
    var o = S[e];
    if (null != o) {
      S[e] = o.slice(0, a) + s + o.slice(a + s.length);
    }
  }
  var Rn = {};
  function Vn(S, e) {
    var a = S + e;
    if (Rn[a]) {
      return Rn[a];
    }
    var s;
    var o = function (S, e, a, s) {
      var o;
      var i;
      var B = [];
      for (o = 0; o < S; o++) {
        var n = S > 1 ? o / (S - 1) : 0;
        var O = 2 * Math.round((12 + (s - 12) * Math.pow(n, .8)) / 2);
        var t = Math.round((22 - O) / 2);
        var h = t + O - 1;
        var r = "";
        for (i = 0; i < 22; i++) {
          var d = ".";
          if (i >= t && i <= h) {
            d = "T";
            if (i === t || i === h) {
              d = "k";
            }
            else {
              if (i === t + 1) {
                d = "m";
              }
              else {
                if (i === h - 1) {
                  d = "i";
                }
                else {
                  if ((i - t) % 6 == 3 && o % 5 != 4) {
                    d = "m";
                  }
                }
              }
            }
            if (o >= Math.floor(.55 * S) && "T" === d && o < S - 2) {
              if (!(1 & o || ((i + 2 * (o >> 1 & 1)) % 4 + 4) % 4 != 0)) {
                d = "i";
              }
            }
            if (o === S - 2 && "k" !== d) {
              d = i % 4 == 1 ? "m" : "d";
            }
            if (o === S - 1) {
              d = i % 4 < 3 ? "k" : ".";
            }
          }
          r += d;
        }
        B.push(r);
      }
      return B;
    }(e, 0, 0, "side" === S ? 16 : 18);
    if ("down" === S) {
      for (s = 1; s < e - 2; s++)
        Xn(o, s, 12, "kcW");
      var i = Math.floor(.38 * e);
      var B = e - 1 - i;
      for (s = i; s < e - 2; s++) {
        for (var n = 2 + Math.floor(2 * (s - i) / B), O = 10 - Math.floor(2 * (s - i) / B), t = "", h = 0; h < n; h++)
          t += 0 === h ? "o" : h === n - 1 ? "3" : "4";
        Xn(o, s, O, t);
      }
    }
    Rn[a] = o;
    return o;
  }
  function zn(S, a, s, o, i, B) {
    var n;
    var O = a.material.accent;
    for (n = 0; n < 2; n++) {
      var t = n ? 1 : -1;
      var h = B + 6 * t;
      var r = Math.round(s * (n ? -1 : 1));
      u(S, [[h, i + 2], [h + 2 * t, i + 2], [h + 5 * t + r, o + 1], [h + 2 * t + r, o + 2], [h + 1 * t + r, o - 3]], O.line);
      u(S, [[h + .5 * t, i + 3], [h + 1.5 * t, i + 3], [h + 4 * t + r, o], [h + 2 * t + r, o + 1], [h + 1 * t + r, o - 3]], O.base);
      e.line(S, h + 1 * t, i + 4, h + 3 * t + r, o - 1, O.hi);
      e.line(S, h, i + 4, h + 1 * t + r, o - 3, O.deep);
    }
  }
  Cn([".....OOOOO", "...OOAhhhA", "..OAAAhhAA", ".OAAAhAAAN", ".OAAzSHSSN", ".OAqzsSszJ", "OAAq.....J", "OAhq......", "OAAq......", "OhAq......", "OAAq......", "OAhq......", "OAAq......", "OAhq......", "OAAq......", "OAAq......", ".OAq......", ".OhA......", ".OAq......", "..OA......", "..Oq......", "...O......"]);
  Cn([".....OOOOO", "...OAhhAAA", "..OAhhAAAA", ".OAhhAAAAA", "OaAAAAAAAA", "OaAAAAAAAA", "OaAAAAAAAA", "OaAAAAAAAA", "OaaAaAAaAA", "OaaAaAAaAA", "OaAAaAAaAA", "OaaAAAAAAA", "OaaAaAAaAA", "OaAAaAAaAA", "OaaAaAAaAA", ".OaaAAAAAA", ".OaAAAAaAA", "..OaaAAaAA", "..OaaAAaAA", "...OaAAAAA", "....OqaAAA", "....OqaAAA", ".....OqAAA", ".....OqaAA", "......OqaA", "......OqAA", ".......Oqa", "........Oq", ".........O"]);
  var Fn = { line: "#05060c", deep: "#0b0d18", shade: "#131728", base: "#1d2236", hi: "#3a4666", hi2: "#657699" };
  function Tn(S, a, s) {
    e.dot(S, a, s, "#25c9a0");
    e.dot(S, a, s + 1, "#a54c24");
    e.dot(S, a, s + 2, "#c8683a");
    e.dot(S, a, s + 3, "#6e2c14");
  }
  function Pn(S, e, a, s) {
    var o;
    var i;
    var B = s * s;
    for (i = Math.floor(a - s); i <= Math.ceil(a + s); i++)
      for (o = Math.floor(e - s); o <= Math.ceil(e + s); o++)
        (o - e) * (o - e) + (i - a) * (i - a) <= B && (S[o + "," + i] = 1);
  }
  function Zn(S, e, a) {
    for (var s = 0; s < e.length - 1; s++) {
      var o;
      var i;
      var B = e[s];
      var n = e[s + 1];
      var O = Math.max(2, Math.ceil(2 * Math.max(Math.abs(n[0] - B[0]), Math.abs(n[1] - B[1]))));
      for (o = 0; o <= O; o++)
        i = o / O, Pn(S, B[0] + (n[0] - B[0]) * i, B[1] + (n[1] - B[1]) * i, a[s] + (a[s + 1] - a[s]) * i);
    }
  }
  function In(S, e, a, s) {
    for (var o = 0; o < s.length; o++)
      for (var i = 0; i < s[o].length; i += 2)
        for (var B = s[o][i]; B <= s[o][i + 1]; B++)
          S[e + B + "," + (a + o)] = 1;
  }
  function $n(S, e) {
    var a;
    var s;
    var o = {};
    for (a in S)
      o[e - +(s = a.split(","))[0] + "," + s[1]] = 1;
    return o;
  }
  function SO(S, e) {
    for (var a in e)
      S[a] = 1;
    return S;
  }
  function eO(S, a, s, o) {
    var i;
    var B;
    var n;
    var O;
    var t = {};
    for (i in a)
      a[(n = +(B = i.split(","))[0]) - 1 + "," + (O = +B[1])] || (t[n - 1 + "," + O] = 1), a[n + 1 + "," + O] || (t[n + 1 + "," + O] = 1), a[n + "," + (O - 1)] || (t[n + "," + (O - 1)] = 1), a[n + "," + (O + 1)] || (t[n + "," + (O + 1)] = 1);
    for (i in t)
      n = +(B = i.split(","))[0], O = +B[1], !(n >= 0 && n <= 31 && O >= 0) || o && o(n, O) || e.dot(S, n, O, s.line);
    for (i in a)
      if (n = +(B = i.split(","))[0], O = +B[1], !(n < 0 || n > 31 || O < 0 || o && o(n, O))) {
        var h = a[n + "," + (O - 1)];
        var r = a[n - 1 + "," + O];
        var d = a[n + "," + (O + 1)];
        var l = a[n + 1 + "," + O];
        e.dot(S, n, O, h && r ? d && l ? s.base : s.shade : s.hi);
      }
  }
  function aO(a, s, o) {
    var i = g.xich_ma_y;
    var B = i.rock;
    var n = i.lava;
    var O = function (S, e) {
      var a;
      var s = S.arms[e];
      var o = w(s);
      var i = h(s);
      a = s.bent ? { x: s.jx, y: s.jy } : { x: o.x + .36 * (i.x - o.x), y: o.y + .36 * (i.y - o.y) };
      var B = i.x - a.x;
      var n = i.y - a.y;
      var O = Math.sqrt(B * B + n * n) || 1;
      var t = B / O;
      var r = n / O;
      var d = a.x - o.x;
      var l = a.y - o.y;
      var f = Math.sqrt(d * d + l * l) || 1;
      var c = d / f;
      var b = l / f;
      return { a: s, s: o, e: a, h: i, len: O, ul: f, far: S.g.side && 0 === e && !s.front, Q: function (S, e) {
          return [Math.min(31, Math.max(0, a.x + t * S - r * e)), Math.max(0, a.y + r * S + t * e)];
        }, U: function (S, e) {
          return [Math.min(31, Math.max(0, o.x + c * S - b * e)), Math.max(0, o.y + b * S + c * e)];
        } };
    }(s, o);
    var t = O.Q;
    var r = O.far;
    var d = Math.max(3, O.len - 1);
    var l = S.Palette.pick("SKIN", s.cfg.skin, "light");
    var f = O.U;
    var c = Math.max(2, O.ul + .6);
    function b(S) {
      return [Math.round(S[0]), Math.round(S[1])];
    }
    function G(S, s, o, i, B) {
      var n = b(t(S, s));
      var O = b(t(o, i));
      e.line(a, n[0], n[1], O[0], O[1], B);
    }
    function H(S, s, o) {
      var i = b(t(S, s));
      e.dot(a, i[0], i[1], o);
    }
    function x(S, s, o, i, B) {
      var n = b(f(S, s));
      var O = b(f(o, i));
      e.line(a, n[0], n[1], O[0], O[1], B);
    }
    u(a, [f(0, -2.9), f(.5 * c, -3.3), f(c, -2.7), f(c, 2.8), f(.5 * c, 3.2), f(0, 2.9)], l.line);
    u(a, [f(0, -2), f(.5 * c, -2.4), f(c, -1.8), f(c, 1.8), f(.5 * c, 2.3), f(0, 2)], r ? l.shade : l.base);
    x(.5, -1.6, c - .5, -1.3, r ? l.base : l.hi);
    x(.5, 1.6, c - .5, 1.4, r ? l.deep : l.shade);
    u(a, [t(-1, -2.7), t(d, -2.4), t(d + .4, 2.6), t(-1, 2.9)], B.line);
    u(a, [t(-.4, -1.8), t(d - .5, -1.6), t(d - .2, 1.7), t(-.4, 2)], r ? B.shade : B.base);
    G(0, -1.3, d - 1, -1.2, r ? B.base : B.hi);
    G(.5, 1.4, d - 1, 1.2, r ? B.deep : B.shade);
    G(.5 * d, -1.6, .5 * d, 1.8, B.deep);
    if (!(r)) {
      H(.25 * d, .2, n.base);
      H(.25 * d + 1, -.4, n.hi);
      H(.62 * d, -.6, n.base);
      H(.62 * d + 1, .5, n.deep);
      H(.88 * d, .3, n.hi);
    }
    G(d - .4, -2, d - .4, 2.2, r ? B.deep : B.hi);
    (function (S, a, s) {
      var o = g.xich_ma_y;
      var i = o.rock;
      var B = o.lava;
      var n = a.arms[s];
      var O = w(n);
      var t = {};
      if (!a.g.side || 0 !== s || n.front) {
        var h = a.g.side ? 0 : s ? 1 : -1;
        var r = O.x + h;
        var d = O.y - 1;
        Pn(t, r, d, 2.3);
        Zn(t, [[r + .5 * h, d - 2], [r + 1.2 * h, d - 4]], [1, .4]);
        eO(S, t, i);
        e.dot(S, r, d, B.base);
        e.dot(S, r + h, d + 1, B.deep);
      }
    })(a, s, o);
  }
  function sO(a, s) {
    if ("toc_truong_y" !== s.cfg.outfit)
      if ("quan_dui" !== s.cfg.outfit)
        if ("ao_thon_lac" !== s.cfg.outfit)
          if ("lu_hanh_moc" !== s.cfg.outfit)
            if ("long_tuong_y" !== s.cfg.outfit)
              if (ln[s.cfg.outfit]) {
                ln[s.cfg.outfit].robe(xB(a), s);
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
                                              var o = s.torso;
                                              var i = s.material.cloth;
                                              var B = s.material.trim;
                                              var n = o.x - 1;
                                              var O = o.w + 2;
                                              var t = o.y - 1;
                                              var h = o.h - 1;
                                              var r = t + h - 2;
                                              var d = n + Math.floor(O / 2);
                                              var l = !s.g.side && !s.g.back;
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
                                                                  if ("tho_ren_moi" !== s.cfg.outfit) {
                                                                    if ("tho_ren" === s.cfg.outfit) {
                                                                      e.fatLine(a, s.g.side ? n + O - 2 : n + 2, t + 1, d + 2, r, 2, i.deep);
                                                                      e.line(a, s.g.side ? n + O - 2 : n + 2, t + 1, d + 2, r, i.hi);
                                                                      e.fatLine(a, s.g.side ? n + O - 3 : n + 1, t + 2, d + 3, r - 1, 3, G.leather.deep);
                                                                      e.line(a, s.g.side ? n + O - 3 : n + 1, t + 2, d + 3, r - 1, G.leather.base);
                                                                      e.dot(a, s.g.side ? n + O - 2 : n + 3, t + 4, G.metal.base);
                                                                      e.dot(a, d + 1, t + 7, G.metal.hi);
                                                                      u(a, [[n, r - 4], [n + O, r - 4], [n + O + 1, o.y + o.h + 8], [n + 1, o.y + o.h + 8]], i.base);
                                                                      e.r(a, n, r - 4, 1, 12, i.line);
                                                                      e.r(a, n + O, r - 3, 1, 11, i.deep);
                                                                      e.line(a, n + 3, r - 2, n + 3, o.y + o.h + 6, i.shade);
                                                                      M(a, n - 1, r - 5, O + 2, 3, G.leather);
                                                                      return void e.r(a, d - 1, r - 5, 3, 2, G.metal.base);
                                                                    }
                                                                    if (l) {
                                                                      yn(a, s, n, t, O, 0, r, d);
                                                                    }
                                                                    else {
                                                                      M(a, n, t, O, h, i);
                                                                      e.r(a, n + 2, t + 4, 1, h - 5, i.deep);
                                                                      e.r(a, n + O - 3, t + 3, 1, h - 4, i.shade);
                                                                      if (s.g.back) {
                                                                        e.r(a, n + 2, t, O - 4, 2, B.shade);
                                                                      }
                                                                      else {
                                                                        u(a, [[n + 2, t], [d, t + 4], [n + O - 3, t], [n + O - 2, t + 9], [d - 1, r]], B.shade);
                                                                        e.fatLine(a, n + 2, t, d + 2, t + 7, 3, B.base);
                                                                        e.fatLine(a, n + O - 3, t, d - 2, t + 11, 3, B.base);
                                                                        e.line(a, n + O - 2, t, d - 1, t + 11, B.hi);
                                                                        e.line(a, n + O - 3, t + 6, d - 1, t + 12, B.shade);
                                                                        e.line(a, d - 1, t + 12, d + 2, t + 13, B.hi);
                                                                      }
                                                                    }
                                                                    for (var f = 0; f < 2; f++) {
                                                                      var c = s.legs[f];
                                                                      var b = d + (f ? 1 : -Math.floor(O / 2));
                                                                      var H = b + Math.floor(O / 2) - 1;
                                                                      var x = c.knee + (s.p.sit ? -1 : 1);
                                                                      var D = s.p.sit ? f ? 2 : -2 : c.x - s.g.legs[f].x;
                                                                      var W = l && !s.p.sit ? f ? 2 : -2 : 0;
                                                                      u(a, [[b, r], [H, r], [H + D + (f ? 2 : 0) + W, x], [b + D - (f ? 0 : 2) + W, x]], f ? i.base : i.shade);
                                                                      u(a, [[b + 2, r + 3], [H, r + 4], [H + D + (f ? 1 : -1) + W, x - 2], [b + D + W, x - 1]], i.base);
                                                                      e.fatLine(a, H - 1, r + 4, H + D + (f ? 1 : -1) + W, x - 2, 2, i.hi);
                                                                      e.line(a, b + 1, r + 2, b + D + (f ? 1 : -1) + W, x - 1, i.deep);
                                                                      e.line(a, H, r + 2, H + D + (f ? 2 : 0) + W, x - 1, i.hi);
                                                                      e.line(a, f ? b : H, r + 3, (f ? b : H) + D + W, x, B.base);
                                                                      e.line(a, b + D - (f ? 0 : 2) + W, x, H + D + (f ? 2 : 0) + W, x, B.shade);
                                                                    }
                                                                    if (l && !s.p.sit) {
                                                                      e.line(a, d, r + 3, d, s.legs[0].knee, i.line);
                                                                    }
                                                                    M(a, n, r, O, 3, G.leather);
                                                                    if (!(s.g.back)) {
                                                                      M(a, d - 1, r, 3, 3, G.metal);
                                                                      e.dot(a, d, r + 1, G.metal.deep);
                                                                    }
                                                                    e.r(a, d, r + 3, 2, 5, G.leather.shade);
                                                                    if ("truc_co_chap_su" === s.cfg.outfit) {
                                                                      e.r(a, n, t + 1, 4, 2, B.deep);
                                                                      e.r(a, n + O - 4, t + 1, 4, 2, B.shade);
                                                                      e.line(a, n + 1, t, n + 4, t + 2, B.hi);
                                                                      e.line(a, n + O - 2, t, n + O - 5, t + 2, B.base);
                                                                      e.fatLine(a, n, r - 2, n + O, r - 2, 2, B.deep);
                                                                      e.dot(a, d, r - 2, G.metal.hi);
                                                                      e.dot(a, d - 1, r - 1, B.base);
                                                                      if (!(s.g.back)) {
                                                                        e.r(a, d - 1, t + 5, 3, 4, B.deep);
                                                                        e.dot(a, d, t + 5, B.hi);
                                                                        e.dot(a, d - 1, t + 7, G.metal.base);
                                                                      }
                                                                    }
                                                                    if ("tieu_thanh" === s.cfg.outfit) {
                                                                      if (s.g.back) {
                                                                        e.r(a, n + 2, r - 1, O - 4, 2, B.base);
                                                                      }
                                                                      else {
                                                                        e.fatLine(a, n + 3, t + 1, d, t + 9, 2, i.hi);
                                                                        e.fatLine(a, n + O - 4, t + 1, d + 1, t + 9, 2, i.deep);
                                                                        e.line(a, n + 1, r - 1, d, r + 1, B.hi);
                                                                        e.line(a, n + O - 2, r - 1, d, r + 1, B.base);
                                                                        e.r(a, d - 2, r - 1, 5, 2, B.deep);
                                                                        e.r(a, d - 1, r - 1, 3, 1, B.hi);
                                                                        e.dot(a, d - 3, r + 3, B.hi);
                                                                        e.dot(a, d, r + 4, B.base);
                                                                        e.dot(a, d + 3, r + 3, B.hi);
                                                                      }
                                                                    }
                                                                  }
                                                                  else {
                                                                    !function (a, s) {
                                                                      var o = s.torso;
                                                                      var i = s.material.cloth;
                                                                      var B = s.material.trim;
                                                                      var n = s.material.accent;
                                                                      var O = G.metal;
                                                                      var t = G.leather;
                                                                      var h = S.Palette.pick("SKIN", s.cfg.skin, "tan");
                                                                      var r = o.x - 1;
                                                                      var d = o.w + 2;
                                                                      var l = o.y;
                                                                      var f = r + Math.floor(d / 2);
                                                                      var c = l + 13;
                                                                      var b = Math.max(s.legs[0].knee, s.legs[1].knee);
                                                                      var H = s.p.sit ? Math.min(55, b) : Math.min(48, b);
                                                                      var g = s.g.side;
                                                                      var x = s.g.back;
                                                                      if (u(a, [[r + 1, l], [r + d - 1, l], [r + d + 1, l + 4], [r + d, c + 4], [r, c + 4], [r - 1, l + 4]], i.base), e.r(a, r - 1, l + 4, 2, c - l, i.deep), e.r(a, r + d - 1, l + 4, 2, c - l, i.shade), x || g ? x && (e.line(a, f, l + 1, f, c, i.deep), e.line(a, f - 3, l + 2, f - 2, l + 5, i.shade)) : (u(a, [[f - 3, l], [f + 3, l], [f + 2, l + 3], [f, l + 6], [f - 2, l + 3]], h.base), e.line(a, f - 3, l, f, l + 5, i.hi), e.line(a, f + 3, l, f, l + 5, i.shade), e.line(a, f - 2, l + 3, f - 1, l + 4, h.shade), e.line(a, f + 1, l + 4, f + 2, l + 3, h.shade), e.dot(a, f - 1, l + 1, h.hi), e.dot(a, f + 1, l + 1, h.shade)), x) {
                                                                        e.fatLine(a, r + 2, l, r + d - 3, c - 1, 2, n.deep);
                                                                        e.fatLine(a, r + d - 3, l, r + 2, c - 1, 2, n.base);
                                                                        e.line(a, r + 2, l - 1, r + d - 3, c - 2, n.hi);
                                                                        e.r(a, f - 2, c - 1, 4, 3, n.shade);
                                                                        e.dot(a, f - 1, c - 1, n.hi);
                                                                        e.fatLine(a, f - 1, c + 2, f - 3, H - 4, 2, n.base);
                                                                        e.fatLine(a, f + 1, c + 2, f + 3, H - 5, 2, n.deep);
                                                                        e.line(a, r - 1, H, r + d + 1, H, t.line);
                                                                        e.line(a, r, H - 1, r + d, H - 1, n.deep);
                                                                        e.r(a, r, c + 4, d, H - c - 4, n.base);
                                                                        e.r(a, r, c + 4, 2, H - c - 4, n.deep);
                                                                        e.r(a, r + d - 2, c + 4, 2, H - c - 4, n.hi);
                                                                        e.line(a, r - 1, H, r + d + 1, H, t.line);
                                                                      }
                                                                      else {
                                                                        var D = g ? r + d - 5 : r;
                                                                        if (g) {
                                                                          u(a, [[D + 1, l + 4], [D + 5, l + 5], [D + 6, H], [D, H], [D, l + 8]], n.base);
                                                                          e.r(a, D, l + 8, 1, H - l - 8, n.deep);
                                                                          e.r(a, D + 5, l + 6, 1, H - l - 6, n.hi);
                                                                        }
                                                                        else {
                                                                          u(a, [[f - 4, l + 4], [f + 4, l + 4], [r + d, l + 8], [r + d + 1, H], [r - 1, H], [r, l + 8]], n.base);
                                                                          e.r(a, r - 1, l + 9, 2, H - l - 8, n.deep);
                                                                          e.r(a, r + d - 1, l + 9, 2, H - l - 8, n.hi);
                                                                          e.line(a, f - 4, l + 5, f - 4, l + 9, n.deep);
                                                                          e.line(a, f + 4, l + 5, f + 4, l + 9, n.shade);
                                                                          e.line(a, r + 3, c + 2, r + 2, H - 2, n.shade);
                                                                          e.line(a, r + d - 3, c + 2, r + d - 2, H - 2, n.shade);
                                                                          e.dot(a, f - 1, l + 6, B.deep);
                                                                          e.r(a, f - 2, l + 7, 4, 1, B.base);
                                                                          e.r(a, f - 1, l + 8, 2, 1, B.hi);
                                                                          e.dot(a, f - 1, l + 9, B.base);
                                                                          e.dot(a, f, l + 9, B.deep);
                                                                          e.r(a, r + d - 5, c + 3, 4, 4, n.deep);
                                                                          e.line(a, r + d - 5, c + 3, r + d - 2, c + 3, n.hi);
                                                                          e.dot(a, r + d - 4, c + 4, O.hi);
                                                                          e.dot(a, r + d - 3, c + 6, O.base);
                                                                          e.line(a, r + 3, c + 2, r + 2, c + 9, O.shade);
                                                                          e.line(a, r + 4, c + 2, r + 4, c + 9, O.base);
                                                                          e.dot(a, r + 2, c + 10, O.hi);
                                                                          e.dot(a, r + 4, c + 10, O.hi);
                                                                        }
                                                                        e.line(a, r - 1, H, r + d + 1, H, t.line);
                                                                        e.line(a, r, H - 1, r + d, H - 1, n.deep);
                                                                        e.dot(a, r + 2, H - 2, t.line);
                                                                        e.dot(a, f + 1, H - 3, t.line);
                                                                        e.dot(a, r + d - 3, H - 2, t.line);
                                                                        if (!(g)) {
                                                                          e.fatLine(a, f - 4, l + 4, r + 2, l - 1, 2, n.deep);
                                                                          e.line(a, f - 4, l + 3, r + 2, l - 2, n.hi);
                                                                          e.fatLine(a, f + 4, l + 4, r + d - 2, l - 1, 2, n.deep);
                                                                          e.line(a, f + 4, l + 3, r + d - 2, l - 2, n.shade);
                                                                          e.dot(a, f - 4, l + 5, O.hi);
                                                                          e.dot(a, f + 4, l + 5, O.base);
                                                                        }
                                                                      }
                                                                      if (e.fatLine(a, r - 1, c, r + d + 1, c, 3, t.deep), e.line(a, r, c - 1, r + d, c - 1, t.base), e.line(a, r, c + 1, r + d, c + 1, t.line), x || g || (e.r(a, f - 2, c - 1, 4, 3, O.deep), e.r(a, f - 1, c, 2, 1, O.hi)), x) {
                                                                        e.r(a, r - 3, l - 1, 6, 5, O.deep);
                                                                        e.line(a, r - 3, l - 1, r + 2, l - 1, O.hi);
                                                                        e.line(a, r - 2, l + 1, r + 2, l + 1, O.shade);
                                                                      }
                                                                      else {
                                                                        var W = g ? r + d - 4 : r - 3;
                                                                        u(a, [[W, l - 1], [W + 6, l - 2], [W + 7, l + 2], [W + 5, l + 5], [W, l + 4]], O.deep);
                                                                        u(a, [[W + 1, l], [W + 5, l - 1], [W + 6, l + 2], [W + 4, l + 3], [W + 1, l + 3]], O.shade);
                                                                        e.line(a, W + 1, l, W + 5, l - 1, O.hi);
                                                                        e.line(a, W + 1, l + 2, W + 5, l + 1, O.base);
                                                                        e.dot(a, W + 2, l + 3, t.base);
                                                                        e.dot(a, W + 5, l + 2, O.hi);
                                                                      }
                                                                    }(a, s);
                                                                  }
                                                                else {
                                                                  !function (S, a) {
                                                                    var s = a.torso;
                                                                    var o = a.material.cloth;
                                                                    var i = a.material.trim;
                                                                    var B = a.material.accent;
                                                                    var n = s.x - 2;
                                                                    var O = s.w + 4;
                                                                    var t = s.y - 1;
                                                                    var h = n + Math.floor(O / 2);
                                                                    var r = t + 13;
                                                                    var d = Math.max(a.legs[0].knee, a.legs[1].knee);
                                                                    var l = a.p.sit ? Math.min(56, d + 1) : Math.min(48, d + 1);
                                                                    var f = a.g.side;
                                                                    var c = a.g.back;
                                                                    if (u(S, [[n + 2, t], [n + O - 3, t], [n + O, t + 4], [n + O - 1, r], [n + O + 1, l], [n - 1, l], [n + 1, r], [n, t + 4]], o.base), e.r(S, n, t + 3, 2, r - t - 2, o.deep), e.r(S, n + O - 2, t + 3, 2, r - t - 2, o.hi), e.line(S, n + 3, t + 2, n + 3, r - 1, o.shade), e.line(S, n, r + 2, n - 1, l, o.deep), e.line(S, n + O, r + 2, n + O + 1, l, o.hi), e.line(S, n + 3, r + 3, n + 2, l - 1, o.shade), e.line(S, n + O - 3, r + 3, n + O - 2, l - 1, o.shade), e.line(S, n - 1, l, n + O + 1, l, B.deep), e.line(S, n - 1, l - 1, n + O + 1, l - 1, B.base), e.dot(S, n + 3, l - 1, B.hi), e.dot(S, h + 3, l - 1, B.hi), e.dot(S, n + O - 2, l - 1, B.hi), c || f ? c ? (e.line(S, h - 1, t + 4, h - 1, r - 1, o.deep), e.line(S, h, r + 2, h, l - 2, o.deep), u(S, [[h - 5, t - 2], [h + 4, t - 2], [h + 6, t + 4], [h + 2, t + 8], [h - 3, t + 8], [h - 7, t + 4]], o.shade), u(S, [[h - 4, t - 1], [h + 3, t - 1], [h + 4, t + 3], [h + 1, t + 6], [h - 2, t + 6], [h - 5, t + 3]], o.base), e.line(S, h - 3, t, h + 1, t, o.hi), e.line(S, h - 1, t + 2, h - 1, t + 5, o.deep)) : (e.line(S, n + O - 3, t + 2, n + O - 4, r - 1, i.base), e.line(S, n + O - 3, r + 2, n + O - 4, l - 2, i.shade)) : (e.r(S, h - 1, t + 3, 2, r - t - 2, i.base), e.line(S, h - 1, t + 3, h - 1, r - 1, i.hi), e.line(S, h, t + 5, h, r - 1, i.shade), e.r(S, h - 1, r + 2, 2, l - r - 3, i.base), e.line(S, h, r + 3, h, l - 3, i.shade), e.dot(S, h - 1, t + 6, "#d8f03c"), e.dot(S, h - 1, t + 7, "#8da31c"), e.line(S, n + 3, t + 1, h - 2, t + 5, o.hi), e.line(S, n + O - 4, t + 1, h + 2, t + 5, o.shade)), e.fatLine(S, n - 1, r, n + O + 1, r, 3, G.leather.deep), e.line(S, n, r - 1, n + O, r - 1, G.leather.base), e.line(S, n, r + 1, n + O, r + 1, G.leather.line), c || f || (e.r(S, h - 2, r - 1, 4, 3, B.deep), e.r(S, h - 1, r, 2, 1, B.hi), e.line(S, n + O - 3, r + 2, n + O - 3, r + 5, G.leather.base), e.r(S, n + O - 5, r + 5, 4, 2, G.metal.base), e.line(S, n + O - 5, r + 5, n + O - 2, r + 5, G.metal.hi)), !c) {
                                                                      var b = f ? h - 2 : h;
                                                                      u(S, [[b - 6, t + 1], [b - 4, t - 1], [b + 4, t - 1], [b + 6, t + 1], [b + 4, t + 5], [b - 4, t + 5]], o.shade);
                                                                      u(S, [[b - 5, t + 1], [b - 3, t], [b + 3, t], [b + 5, t + 1], [b + 3, t + 4], [b - 3, t + 4]], o.base);
                                                                      e.line(S, b - 4, t, b - 1, t, o.hi);
                                                                      e.line(S, b - 4, t + 2, b - 2, t + 4, o.deep);
                                                                      e.line(S, b + 4, t + 2, b + 2, t + 4, o.deep);
                                                                    }
                                                                  }(a, s);
                                                                }
                                                              else {
                                                                !function (a, s) {
                                                                  var o = s.torso;
                                                                  var i = s.material.cloth;
                                                                  var B = s.material.trim;
                                                                  var n = s.material.accent;
                                                                  var O = o.x - 6;
                                                                  var t = o.w + 12;
                                                                  var h = o.y - 3;
                                                                  var r = O + Math.floor(t / 2);
                                                                  var d = h + 15;
                                                                  var l = s.p.sit ? Math.min(58, Math.max(s.legs[0].knee, s.legs[1].knee) + 1) : Math.min(53, Math.max(s.legs[0].knee, s.legs[1].knee) - 1);
                                                                  if (s.g.back || s.g.side) {
                                                                    yn(a, s, o.x - 1, o.y - 1, o.w + 2, o.h, o.y + o.h - 3, o.x + Math.floor((o.w + 2) / 2));
                                                                  }
                                                                  else {
                                                                    var f = S.Palette.pick("SKIN", s.cfg.skin, "light");
                                                                    u(a, [[O + 1, h], [O + 5, h - 1], [r - 4, h + 1], [r - 2, d - 2], [O + 1, d + 2], [O - 1, l]], i.shade);
                                                                    u(a, [[r + 4, h], [O + t - 4, h], [O + t + 1, h + 5], [O + t + 2, l - 1], [r + 3, d + 2], [r + 3, d - 2]], i.base);
                                                                    u(a, [[r - 4, h + 1], [r + 4, h + 1], [r + 4, d - 1], [r - 4, d - 1]], f.base);
                                                                    e.r(a, r - 3, h + 3, 2, 6, f.hi);
                                                                    e.r(a, r + 2, h + 3, 2, 6, f.shade);
                                                                    e.line(a, r, h + 3, r, h + 12, f.deep);
                                                                    e.r(a, r - 4, h + 11, 4, 1, f.shade);
                                                                    e.r(a, r + 1, h + 11, 4, 1, f.deep);
                                                                    u(a, [[O + 1, d - 1], [r - 2, d - 1], [r - 4, l], [O - 2, l + 1]], i.base);
                                                                    u(a, [[r + 2, d - 1], [O + t - 1, d - 1], [O + t + 2, l - 1], [r + 4, l]], i.shade);
                                                                    e.line(a, O + 1, d, O - 1, l, B.base);
                                                                    e.line(a, O + t - 1, d, O + t + 1, l, B.hi);
                                                                    e.line(a, r - 2, d + 1, r - 4, l, B.shade);
                                                                    e.line(a, r + 2, d + 1, r + 4, l, B.deep);
                                                                    e.line(a, r, d + 2, r, l, i.line);
                                                                    e.line(a, O + 3, d + 2, O + 1, l - 2, n.base);
                                                                    e.line(a, O + t - 3, d + 2, O + t - 1, l - 2, n.hi);
                                                                    e.fatLine(a, O, d, O + t, d, 3, B.deep);
                                                                    e.line(a, O + 1, d - 1, O + t - 1, d - 1, B.hi);
                                                                    e.line(a, O + 1, d + 1, O + t - 1, d + 1, B.line);
                                                                    e.r(a, r - 3, d - 3, 7, 6, n.deep);
                                                                    e.r(a, r - 2, d - 2, 5, 4, B.base);
                                                                    e.dot(a, r, d, B.hi);
                                                                    e.dot(a, r - 1, d + 1, n.hi);
                                                                  }
                                                                }(a, s);
                                                              }
                                                            else {
                                                              !function (S, a) {
                                                                var s = a.torso;
                                                                var o = a.material.cloth;
                                                                var i = a.material.trim;
                                                                var B = a.material.accent;
                                                                var n = s.x - 3;
                                                                var O = s.w + 6;
                                                                var t = s.y - 2;
                                                                var h = n + Math.floor(O / 2);
                                                                var r = t + 13;
                                                                var d = Math.max(a.legs[0].knee, a.legs[1].knee);
                                                                var l = a.p.sit ? Math.min(59, d + 2) : Math.min(58, d + 5);
                                                                u(S, [[n + 2, t], [n + O - 2, t], [n + O, t + 6], [n + O, r], [n + O + 2, l], [n - 2, l], [n, r], [n, t + 6]], o.base);
                                                                e.line(S, n, t + 5, n - 1, l - 1, o.shade);
                                                                e.line(S, n + O, t + 5, n + O + 1, l - 1, o.deep);
                                                                e.line(S, n + 2, r + 2, n + 1, l - 2, o.shade);
                                                                e.line(S, n + O - 2, r + 2, n + O - 1, l - 2, o.shade);
                                                                if (a.g.back) {
                                                                  e.fatLine(S, h, r + 1, h, l - 2, 2, i.base);
                                                                  e.line(S, h - 1, r + 1, h - 1, l - 2, B.shade);
                                                                  e.fatLine(S, n, r, n + O, r, 2, B.deep);
                                                                }
                                                                else {
                                                                  if (a.g.side) {
                                                                    e.fatLine(S, n + O - 3, t, n + O - 1, r, 2, i.base);
                                                                    e.line(S, n + O - 4, t + 1, n + O - 2, r, B.base);
                                                                    u(S, [[n + O - 3, r + 1], [n + O, r + 1], [n + O + 2, l - 2], [n + O - 2, l - 2]], i.base);
                                                                    e.line(S, n + O - 3, r + 1, n + O - 2, l - 2, B.base);
                                                                    e.fatLine(S, n, r, n + O, r, 2, B.deep);
                                                                    e.line(S, n + 1, r - 1, n + O - 1, r - 1, B.base);
                                                                  }
                                                                  else {
                                                                    e.fatLine(S, n + 3, t, h - 2, t + 8, 2, i.base);
                                                                    e.fatLine(S, n + O - 3, t, h + 2, t + 8, 2, i.base);
                                                                    e.fatLine(S, h - 2, t + 8, h - 2, r, 2, i.base);
                                                                    e.fatLine(S, h + 2, t + 8, h + 2, r, 2, i.base);
                                                                    e.line(S, n + 5, t, h, t + 7, B.base);
                                                                    e.line(S, n + O - 5, t, h, t + 7, B.shade);
                                                                    e.line(S, n + 2, t + 1, h - 3, t + 9, B.shade);
                                                                    e.line(S, n + O - 2, t + 1, h + 3, t + 9, B.deep);
                                                                    e.fatLine(S, n, r, n + O, r, 2, B.deep);
                                                                    e.line(S, n + 1, r - 1, n + O - 1, r - 1, B.base);
                                                                    u(S, [[h - 4, r + 1], [h + 4, r + 1], [h + 5, l - 2], [h - 5, l - 2]], i.base);
                                                                    e.line(S, h - 4, r + 1, h - 5, l - 2, B.base);
                                                                    e.line(S, h + 4, r + 1, h + 5, l - 2, B.shade);
                                                                    e.line(S, h - 3, r + 2, h + 3, r + 2, B.hi);
                                                                    e.line(S, h - 3, r + 3, h - 3, l - 3, i.hi);
                                                                    OO(S, h - 2, r + 6, gn, { W: "#f3f0e6", K: i.line }, !1);
                                                                    e.line(S, h - 3, r + 12, h + 3, r + 12, B.base);
                                                                  }
                                                                }
                                                                e.fatLine(S, n - 2, l - 1, n + O + 2, l - 1, 2, i.base);
                                                                e.line(S, n - 1, l - 2, n + O + 1, l - 2, B.base);
                                                              }(a, s);
                                                            }
                                                          else {
                                                            !function (a, s) {
                                                              var o = g.xich_ma_y;
                                                              var i = S.Palette.pick("SKIN", s.cfg.skin, "light");
                                                              var B = o.cloth;
                                                              var n = o.bone;
                                                              var O = o.rock;
                                                              var t = (o.lava, o.metal);
                                                              var h = s.torso;
                                                              var r = h.x;
                                                              var d = h.y;
                                                              var l = h.w;
                                                              var f = s.g.side;
                                                              var c = s.g.back;
                                                              var b = r + Math.floor(l / 2);
                                                              if (f) {
                                                                e.r(a, r + l - 4, d + 2, 3, 3, i.hi);
                                                                e.r(a, r + l - 4, d + 5, 4, 1, i.deep);
                                                                e.line(a, r + l - 5, d + 7, r + l - 2, d + 7, i.shade);
                                                                e.line(a, r + l - 5, d + 9, r + l - 2, d + 9, i.shade);
                                                                e.dot(a, r + l - 2, d + 3, i.deep);
                                                              }
                                                              else {
                                                                if (c) {
                                                                  e.line(a, b - 1, d + 1, b - 1, d + 11, i.deep);
                                                                  e.line(a, b, d + 1, b, d + 11, i.hi);
                                                                  e.line(a, r + 1, d + 3, b - 3, d + 6, i.shade);
                                                                  e.line(a, r + l - 2, d + 3, b + 2, d + 6, i.shade);
                                                                  e.line(a, r + 1, d + 8, b - 2, d + 10, i.shade);
                                                                  e.line(a, r + l - 2, d + 8, b + 1, d + 10, i.shade);
                                                                  e.dot(a, r + 1, d + 2, i.hi);
                                                                  e.dot(a, r + l - 2, d + 2, i.hi);
                                                                }
                                                                else {
                                                                  e.r(a, r + 1, d + 1, 3, 1, i.hi);
                                                                  e.r(a, r + l - 4, d + 1, 3, 1, i.hi);
                                                                  e.line(a, r, d + 5, r + 4, d + 5, i.deep);
                                                                  e.line(a, r + l - 5, d + 5, r + l - 1, d + 5, i.deep);
                                                                  e.line(a, b - 1, d + 1, b - 1, d + 9, i.deep);
                                                                  e.line(a, b, d + 2, b, d + 9, i.hi);
                                                                  e.dot(a, r + 2, d + 4, i.deep);
                                                                  e.dot(a, r + l - 3, d + 4, i.deep);
                                                                  e.line(a, r + 1, d + 2, r + 3, d + 6, i.line);
                                                                  e.dot(a, r + 2, d + 2, i.hi);
                                                                  e.r(a, r + 2, d + 7, 2, 1, i.deep);
                                                                  e.r(a, r + l - 4, d + 7, 2, 1, i.deep);
                                                                  e.r(a, r + 2, d + 9, 2, 1, i.deep);
                                                                  e.r(a, r + l - 4, d + 9, 2, 1, i.deep);
                                                                }
                                                              }
                                                              var G = r - 1;
                                                              var H = l + 2;
                                                              var x = d + 11;
                                                              e.r(a, G, x, H, 3, B.line);
                                                              e.r(a, G + 1, x + 1, H - 2, 1, B.base);
                                                              e.r(a, G + 1, x, H - 2, 1, B.hi);
                                                              if (!(c)) {
                                                                if (f) {
                                                                  e.r(a, r + l - 3, x - 1, 3, 4, n.line);
                                                                  e.r(a, r + l - 3, x, 2, 3, n.base);
                                                                  e.dot(a, r + l - 3, x, n.hi);
                                                                }
                                                                else {
                                                                  e.r(a, b - 2, x - 1, 4, 5, n.line);
                                                                  e.r(a, b - 1, x, 2, 4, n.base);
                                                                  e.dot(a, b - 1, x, n.hi);
                                                                  e.dot(a, b - 1, x + 1, n.line);
                                                                  e.dot(a, b, x + 1, n.line);
                                                                  e.dot(a, b, x + 3, n.shade);
                                                                  e.dot(a, G + 2, x + 1, t.base);
                                                                  e.dot(a, G + H - 3, x + 1, t.base);
                                                                  e.dot(a, G + 4, x + 1, t.shade);
                                                                  e.dot(a, G + H - 5, x + 1, t.shade);
                                                                }
                                                              }
                                                              var D = x + 3;
                                                              var W = s.p.sit ? Math.min(D + 5, 58) : Math.min(D + 11, 52);
                                                              var J = f ? 4 : 6;
                                                              var M = f ? r + l - 5 : b - 3;
                                                              if (u(a, [[M, D], [M + J, D], [M + J, W - 3], [M + J - 1, W], [M + J - 2, W - 2], [M + J - 3, W + 1], [M + 2, W - 2], [M + 1, W + 1], [M, W - 2]], B.base), e.line(a, M, D, M, W - 3, B.hi), e.line(a, M + J, D, M + J, W - 3, B.deep), e.line(a, M + J - 2, D + 1, M + J - 2, W - 4, B.shade), e.line(a, M, W - 2, M + 1, W + 1, B.line), e.line(a, M + J - 1, W, M + J - 3, W + 1, B.line), !f) {
                                                                for (var w = 0; w < 2; w++) {
                                                                  var N = w ? r + l - 1 : r - 2;
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
                                                            var o = xS(a);
                                                            var i = a.g.side;
                                                            var B = a.g.back;
                                                            var n = qs(a);
                                                            var O = s.y + 15;
                                                            var t = a.p.sit ? Math.max(6, 61 - O) : 99;
                                                            if (i) {
                                                              Na(e, s.x - 3, O, NS.slice(0, t), o, !1, Rs(Us(a), 3, 10));
                                                              return void Na(e, s.x - 3, s.y - 3, wS, o, !1);
                                                            }
                                                            if (Na(e, s.x - 4, O, JS.slice(0, t), o, !1, Rs(n, 3, 10)), B) {
                                                              Na(e, s.x - 4, s.y - 3, uS, o, !1);
                                                              return void Na(e, s.x - 2, s.y + 1, MS, o, !1);
                                                            }
                                                            Na(e, s.x - 4, s.y - 3, WS, o, !1);
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
                                                          var s = nS(e);
                                                          var o = e.g.side;
                                                          var i = e.g.back;
                                                          var B = qs(e);
                                                          var n = a.y + 14;
                                                          var O = e.p.sit ? Math.max(6, 61 - n) : 99;
                                                          var t = e.p.sit ? 5 : cS.length;
                                                          if (o) {
                                                            var h = Us(e);
                                                            Na(S, a.x - 5, n, fS.slice(0, O), s, !1, Rs(h, 3, 10));
                                                            Na(S, a.x - 3, a.y - 3, lS, s, !1);
                                                            return void Na(S, a.x + 1, a.y + 13, cS.slice(0, t), s, !1, Rs(-h, 3, 6));
                                                          }
                                                          Na(S, a.x - 7, n, (i ? rS : hS).slice(0, O), s, !1, Rs(B, 3, 10));
                                                          Na(S, a.x - 6, a.y - 3, i ? dS : OS, s, !1);
                                                          Na(S, a.x, i ? a.y + 1 : a.y + 8, tS, s, !1);
                                                          Na(S, a.x - 2, a.y + 13, cS.slice(0, t), s, !1, Rs(-B, 3, 6));
                                                          Na(S, a.x + a.w - 1, a.y + 13, cS.slice(0, t), s, !1, Rs(-B, 3, 6));
                                                          if (!(e.arms[0].front || e.arms[0].over)) {
                                                            gS(S, e, 0);
                                                          }
                                                        }(a, s);
                                                      }
                                                    else {
                                                      !function (S, a) {
                                                        var s = a.torso;
                                                        var o = a.material.cloth;
                                                        var i = a.material.trim;
                                                        var B = a.material.pants;
                                                        var n = a.material.accent;
                                                        var O = s.x - 2;
                                                        var t = s.w + 4;
                                                        var h = s.y - 1;
                                                        var r = O + Math.floor(t / 2);
                                                        var d = h + 14;
                                                        var l = a.p.sit ? Math.max(a.legs[0].knee, a.legs[1].knee) + 2 : Math.min(59, Math.max(a.legs[0].knee, a.legs[1].knee) + 6);
                                                        var f = 0 | a.p.leg;
                                                        u(S, [[O + 2, h], [O + t - 3, h], [O + t, h + 5], [O + t - 1, d], [O + t + 2, l - 1], [r + 2, l], [r, d + 4], [r - 2, l], [O - 2, l - 1], [O + 1, d], [O, h + 5]], o.line);
                                                        u(S, [[O + 2, h + 1], [O + t - 3, h + 1], [O + t - 1, h + 6], [O + t - 2, d], [O + t + 1, l - 2], [r + 3, l - 1], [r, d + 1], [r - 3, l - 1], [O - 1, l - 2], [O + 2, d], [O + 1, h + 6]], o.base);
                                                        u(S, [[r - 3, h + 3], [r + 3, h + 3], [r + 3, l - 1], [r - 3, l - 1]], B.line);
                                                        e.line(S, r, h + 6, r, l - 2, B.shade);
                                                        if (a.g.back) {
                                                          u(S, [[O + 2, h + 1], [O + t - 3, h + 1], [O + t - 1, h + 8], [r, h + 12], [O + 1, h + 8]], o.hi);
                                                          e.line(S, O + 1, h + 8, r, h + 12, n.deep);
                                                          e.line(S, r, h + 12, O + t - 1, h + 8, n.base);
                                                          e.r(S, r - 2, h + 4, 5, 3, o.base);
                                                          e.line(S, r - 2, h + 5, r, h + 3, n.base);
                                                          e.line(S, r, h + 3, r + 2, h + 5, n.hi);
                                                          e.dot(S, r, h + 7, n.deep);
                                                          u(S, [[O + 2, d + 1], [r - 1, d + 1], [r - 1, l - 2], [O - 1, l - 2]], o.hi);
                                                          u(S, [[r + 1, d + 1], [O + t - 2, d + 1], [O + t + 1, l - 2], [r + 1, l - 2]], o.base);
                                                          e.line(S, r, d + 4, r, l - 1, o.deep);
                                                        }
                                                        else {
                                                          if (a.g.side) {
                                                            u(S, [[O + 2, h + 1], [O + t - 3, h + 1], [O + t - 1, h + 6], [O + 4, h + 11], [O + 1, h + 7]], o.hi);
                                                            e.line(S, O + 1, h + 7, O + 4, h + 11, n.deep);
                                                            e.line(S, O + 4, h + 11, O + t - 1, h + 6, n.base);
                                                            e.fatLine(S, O + t - 3, h + 1, O + t - 2, d - 2, 2, B.line);
                                                            e.line(S, O + t - 4, h + 2, O + t - 3, d - 3, n.hi);
                                                            u(S, [[O + 2, d + 1], [O + t - 3, d + 1], [O + t, l - 3], [O - 1 + f, l - 2]], o.hi);
                                                            e.line(S, O + 3, d + 3, O + 1 + f, l - 3, o.shade);
                                                            e.line(S, O + t - 3, d + 3, O + t, l - 2, n.deep);
                                                            e.line(S, O + t - 2, d + 3, O + t + 1, l - 2, n.hi);
                                                            e.fatLine(S, O + t - 4, d + 2, O + t - 4 + f, l - 4, 2, i.deep);
                                                            e.line(S, O + t - 4, d + 3, O + t - 4 + f, l - 5, i.base);
                                                          }
                                                          else {
                                                            e.r(S, r - 3, h, 7, 4, B.line);
                                                            u(S, [[O + 2, h], [r - 1, h + 6], [r, h + 12], [O + 2, h + 8]], o.hi);
                                                            u(S, [[O + t - 3, h], [r + 1, h + 6], [r, h + 12], [O + t - 2, h + 8]], o.hi);
                                                            e.line(S, O + 3, h + 1, r, h + 8, n.base);
                                                            e.line(S, O + t - 4, h + 1, r + 1, h + 8, n.hi);
                                                            e.line(S, r, h + 8, r, d - 2, n.deep);
                                                            u(S, [[O + 2, d + 1], [r - 3, d + 1], [r - 4 + f, l - 2], [O - 1, l - 2]], o.hi);
                                                            u(S, [[r + 3, d + 1], [O + t - 2, d + 1], [O + t + 1, l - 2], [r + 4 - f, l - 2]], o.base);
                                                            e.line(S, O + 2, d + 4, O, l - 3, o.shade);
                                                            e.line(S, O + t - 2, d + 3, O + t, l - 3, o.hi);
                                                            e.fatLine(S, r - 2, d + 2, r - 2 + f, l - 3, 2, i.deep);
                                                            e.line(S, r - 2, d + 3, r - 2 + f, l - 4, i.base);
                                                            e.fatLine(S, r + 2, d + 2, r + 2 - f, l - 3, 2, i.base);
                                                            e.line(S, r + 3, d + 3, r + 3 - f, l - 4, i.hi);
                                                            e.line(S, r - 4, d + 3, r - 5 + f, l - 2, n.base);
                                                            e.line(S, r + 4, d + 3, r + 5 - f, l - 2, n.hi);
                                                          }
                                                        }
                                                        e.r(S, O + 1, d - 1, t - 1, 3, i.line);
                                                        e.line(S, O + 1, d - 1, O + t - 1, d - 1, i.hi);
                                                        e.line(S, O + 2, d, O + t - 2, d, i.base);
                                                        if (a.g.side || a.g.back) {
                                                          if (a.g.side) {
                                                            e.r(S, O + t - 2, d - 1, 2, 2, n.base);
                                                            e.dot(S, O + t - 1, d - 1, n.hi);
                                                          }
                                                          else {
                                                            e.r(S, r - 1, d, 3, 3, i.deep);
                                                            e.line(S, r, d + 3, r - 2, l - 5, i.base);
                                                          }
                                                        }
                                                        else {
                                                          e.r(S, r - 2, d - 2, 5, 4, n.deep);
                                                          e.r(S, r - 1, d - 2, 3, 3, n.base);
                                                          e.dot(S, r, d - 1, n.hi);
                                                        }
                                                        e.line(S, O - 1, l - 2, r - 4, l - 2, n.base);
                                                        e.line(S, r + 4, l - 2, O + t + 1, l - 2, n.hi);
                                                        e.line(S, O + 2, l - 8, O + 1, l - 5, n.deep);
                                                        e.line(S, O + 1, l - 5, O + 3, l - 4, n.base);
                                                        e.dot(S, O + 3, l - 6, o.hi);
                                                        e.line(S, O + t - 3, l - 8, O + t - 2, l - 5, n.base);
                                                        e.dot(S, O + t - 4, l - 4, n.hi);
                                                      }(a, s);
                                                    }
                                                  else {
                                                    !function (S, e) {
                                                      var a = e.torso;
                                                      var s = z(e);
                                                      var o = e.g.side;
                                                      var i = e.g.back;
                                                      var B = qs(e);
                                                      var n = a.y + 15;
                                                      var O = Math.min(iS(e, e.legs[0]), iS(e, e.legs[1]));
                                                      var t = 59 - eS.length;
                                                      var h = Math.max(0, n - t);
                                                      if (o) {
                                                        if (e.p.sit) {
                                                          Na(S, a.x - 5, t + h, sS.slice(h), s, !1);
                                                        }
                                                        else {
                                                          Ra(S, a.x - 4, n, O, SS, 7, s, Rs(Us(e), 4, 12));
                                                        }
                                                        return void Na(S, a.x - 2, a.y - 2, $, s, !1);
                                                      }
                                                      if (e.p.sit ? Na(S, a.x - 6, t + h, (i ? aS : eS).slice(h), s, !1) : Ra(S, a.x - 3, n, O, i ? I : T, 7, s, Rs(B, 4, 14)), Na(S, a.x - 2, a.y - 2, i ? Z : F, s, !1), i) {
                                                        var r = e.p.sit ? 8 : P.length;
                                                        Na(S, a.x + 2, a.y + 13, P.slice(0, r), s, !1, Rs(B, 4, 14));
                                                        Na(S, a.x + 7, a.y + 13, P.slice(0, r), s, !0, Rs(B, 4, 14));
                                                      }
                                                      if (!(e.arms[0].front || e.arms[0].over)) {
                                                        oS(S, e, 0);
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
                                                    var o = e.g.side;
                                                    var i = e.g.back;
                                                    var B = qs(e);
                                                    var n = a.y + 15;
                                                    var O = Math.min(R(e, e.legs[0]), R(e, e.legs[1]));
                                                    var t = 61 - Q.length;
                                                    var h = Math.max(0, n - t);
                                                    if (o) {
                                                      var r = Us(e);
                                                      if (e.p.sit) {
                                                        Na(S, a.x - 5, t + h, Y.slice(h), s, !1);
                                                      }
                                                      else {
                                                        Ra(S, a.x - 3, n, O, X, 7, s, Rs(r, 4, 12));
                                                      }
                                                      Na(S, a.x - 2, a.y - 2, U, s, !1);
                                                      var d = e.p.sit ? 7 : A.length;
                                                      Na(S, a.x + 7, a.y + 15, A.slice(0, d), s, !1, Rs(-r, 3, 6));
                                                    }
                                                    else {
                                                      if (e.p.sit && Na(S, a.x - 6, t + h, (i ? _ : Q).slice(h), s, !1), i) {
                                                        if (!(e.p.sit)) {
                                                          Ra(S, a.x - 3, n, O, q, 7, s, Rs(B, 4, 14));
                                                        }
                                                        Na(S, a.x - 2, a.y - 2, E, s, !1);
                                                        Na(S, a.x + 1, a.y + 1, K, s, !1);
                                                      }
                                                      else {
                                                        if (!(e.p.sit)) {
                                                          Ra(S, a.x - 3, n, O, C, 7, s, Rs(B, 4, 14));
                                                        }
                                                        Na(S, a.x - 2, a.y - 2, L, s, !1);
                                                        var l = e.p.sit ? 6 : j.length;
                                                        Na(S, a.x + 1, n, j.slice(0, l), s, !1, Rs(-B, 3, 7));
                                                        Na(S, a.x + 8, n, j.slice(0, l), s, !0, Rs(-B, 3, 7));
                                                      }
                                                      if (!(e.arms[0].front || e.arms[0].over)) {
                                                        V(S, e, 0);
                                                      }
                                                    }
                                                  }(a, s);
                                                }
                                              else {
                                                !function (S, e) {
                                                  var a = e.torso;
                                                  var s = vS(e);
                                                  var o = e.g.side;
                                                  var i = e.g.back;
                                                  var B = qs(e);
                                                  var n = a.y + 15;
                                                  var O = Math.min(US(e, e.legs[0]), US(e, e.legs[1]));
                                                  var t = 61 - KS.length;
                                                  var h = Math.max(0, n - t);
                                                  if (o) {
                                                    if (e.p.sit) {
                                                      Na(S, a.x - 5, t + h, qS.slice(h), s, !1);
                                                    }
                                                    else {
                                                      Ra(S, a.x - 3, n, O, ES, 7, s, Rs(Us(e), 4, 12));
                                                    }
                                                    return void Na(S, a.x - 2, a.y - 2, YS, s, !1);
                                                  }
                                                  if (e.p.sit) {
                                                    Na(S, a.x - 6, t + h, KS.slice(h), s, !1);
                                                  }
                                                  else {
                                                    Ra(S, a.x - 3, n, O, i ? _S : AS, 7, s, Rs(B, 4, 14));
                                                  }
                                                  Na(S, a.x - 3, a.y - 2, i ? QS : jS, s, !1);
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
                                                var o = e.g.side;
                                                var i = e.g.back;
                                                var B = qs(e);
                                                var n = a.y + 15;
                                                var O = Math.min(he(e, e.legs[0]), he(e, e.legs[1]));
                                                var t = 58 - Be.length;
                                                var h = Math.max(0, n - t);
                                                if (o) {
                                                  if (e.p.sit) {
                                                    Na(S, a.x - 5, t + h, Oe.slice(h), s, !1);
                                                  }
                                                  else {
                                                    Ra(S, a.x - 4, n, O, ie, 7, s, Rs(Us(e), 4, 12));
                                                  }
                                                  return void Na(S, a.x - 2, a.y - 2, oe, s, !1);
                                                }
                                                if (e.p.sit) {
                                                  Na(S, a.x - 6, t + h, (i ? ne : Be).slice(h), s, !1);
                                                }
                                                else {
                                                  Ra(S, a.x - 3, n, O, i ? ae : ee, 7, s, Rs(B, 4, 14));
                                                }
                                                Na(S, a.x - 2, a.y - 2, i ? se : $S, s, !1);
                                                if (!(i)) {
                                                  Na(S, a.x + 3, a.y + 13, Se.slice(0, e.p.sit ? 6 : Se.length), s, !1, Rs(-B, 3, 6));
                                                }
                                                if (!(e.arms[0].front || e.arms[0].over)) {
                                                  te(S, e, 0);
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
                                              var o = e.g.side;
                                              var i = e.g.back;
                                              var B = qs(e);
                                              var n = a.y + 15;
                                              if (o) {
                                                var O = Math.min(Ge(e, e.legs[0]), Ge(e, e.legs[1]));
                                                Ra(S, a.x - 3, n, O, ce, 7, s, Rs(Us(e), 4, 12));
                                                return void Na(S, a.x - 2, a.y - 2, le, s, !1);
                                              }
                                              for (var t = 0; t < 2; t++) {
                                                var h = e.legs[t];
                                                var r = e.p.sit ? t ? 2 : -2 : h.x - e.g.legs[t].x;
                                                ko(S, t ? a.x + a.w + 2 + r : a.x - 3 + r, n, Ge(e, h), fe, 7, s, 1 === t, Rs(B, 4, 14));
                                              }
                                              Na(S, a.x - 2, a.y - 2, i ? de : re, s, !1);
                                              if (!(e.arms[0].front || e.arms[0].over)) {
                                                be(S, e, 0);
                                              }
                                            }(a, s);
                                          }
                                        else {
                                          !function (S, a) {
                                            var s = a.torso;
                                            var o = a.material.cloth;
                                            var i = a.material.trim;
                                            var B = a.material.accent;
                                            var n = s.x - 2;
                                            var O = s.w + 4;
                                            var t = s.y - 1;
                                            var h = n + Math.floor(O / 2);
                                            var r = t + s.h - 3;
                                            if (M(S, n, t, O, r - t + 1, o), a.g.back) {
                                              e.r(S, h - 3, t, 6, 3, B.deep);
                                              e.line(S, n + 1, t + 2, h, t + 5, i.deep);
                                              e.line(S, h, t + 5, n + O - 2, t + 2, i.base);
                                            }
                                            else {
                                              var d = a.g.side ? h + 1 : h;
                                              e.r(S, d - 2, t - 1, 4, 4, o.line);
                                              e.line(S, d - 2, t, d, t + 3, i.shade);
                                              e.line(S, d + 2, t, d, t + 3, i.hi);
                                              e.fatLine(S, n + 2, t + 1, d + 1, t + 9, 3, B.deep);
                                              e.line(S, n + 2, t + 1, d + 1, t + 9, B.hi);
                                              e.fatLine(S, n + O - 3, t + 1, d - 3, r - 1, 3, o.line);
                                              e.line(S, n + O - 2, t + 1, d - 2, r - 1, i.base);
                                              e.line(S, n + O - 4, t + 2, d - 4, r - 2, i.deep);
                                              for (var l = 0; l < (a.g.side ? 1 : 2); l++) {
                                                var f = a.g.side || l ? n + O - 2 : n + 1;
                                                e.r(S, f - 1, t + 3, 3, r - t - 3, B.shade);
                                                e.r(S, f - 1, t + 3, 3, 3, i.deep);
                                                e.r(S, f, t + 3, 1, 3, i.hi);
                                                e.line(S, f - 1, t + 4, f + 1, t + 4, i.base);
                                                e.line(S, f, t + 7, f - 1, t + 9, i.shade);
                                                e.line(S, f - 1, t + 9, f, t + 11, i.base);
                                                e.line(S, f, t + 7, f + 1, t + 9, i.base);
                                                e.line(S, f + 1, t + 9, f, t + 11, i.deep);
                                              }
                                            }
                                            for (var c = 0; c < 2; c++) {
                                              var b = a.legs[c];
                                              var G = a.p.sit ? c ? 2 : -2 : b.x - a.g.legs[c].x;
                                              var H = a.p.sit ? 58 : Math.min(58, b.foot - 4);
                                              var g = c ? 3 : -3;
                                              var x = c ? h + 1 : n;
                                              var D = c ? n + O - 1 : h - 1;
                                              u(S, [[x - 1, r], [D + 1, r], [D + G + g + 1, H - 1], [x + G + g - 1, H]], B.shade);
                                              u(S, [[x, r], [D, r], [D + G + g, H - 1], [x + G + g, H - 1]], c ? o.base : o.deep);
                                              e.line(S, x + 1, r + 3, x + G + g + 1, H - 3, o.hi);
                                              e.line(S, D - 1, r + 2, D + G + g - 1, H - 3, o.line);
                                              var W = c ? x : D;
                                              var J = W + G + g;
                                              e.line(S, W, r + 2, J, H - 1, i.shade);
                                              e.line(S, x + G + g, H - 1, D + G + g, H - 1, i.deep);
                                              var w = c ? D + G + g - 2 : x + G + g + 2;
                                              var N = H - 5;
                                              e.line(S, w, N - 2, w + (c ? -2 : 2), N, i.base);
                                              e.line(S, w + (c ? -2 : 2), N, w, N + 2, i.shade);
                                              e.dot(S, w + (c ? 1 : -1), N + 1, i.hi);
                                              var p = c ? n + O : n - 1;
                                              var k = p + G + (c ? 3 : -3);
                                              e.line(S, p, r - 2, k, H - 6, B.base);
                                              e.line(S, p, r - 1, k + (c ? -1 : 1), H - 5, B.deep);
                                            }
                                            e.r(S, n, r, O, 3, o.line);
                                            e.line(S, n, r, n + O - 1, r, i.deep);
                                            e.line(S, n + 1, r + 2, n + O - 2, r + 2, B.shade);
                                            var m = a.g.side ? h + 3 : h;
                                            if (!a.g.back) {
                                              e.r(S, m - 2, r - 1, 5, 4, i.deep);
                                              e.r(S, m - 1, r - 1, 3, 3, i.base);
                                              e.dot(S, m, r, B.base);
                                              e.dot(S, m, r - 1, i.hi);
                                              var v = Math.min(56, r + 12);
                                              u(S, [[m - 2, r + 3], [m + 2, r + 3], [m + 2, v - 2], [m, v], [m - 2, v - 2]], B.shade);
                                              e.line(S, m, r + 4, m, v - 3, i.shade);
                                              e.dot(S, m - 1, v - 2, i.hi);
                                              e.dot(S, m + 1, v - 2, i.base);
                                            }
                                          }(a, s);
                                        }
                                      else {
                                        !function (S, a) {
                                          var s = a.torso;
                                          var o = a.material.cloth;
                                          var i = a.material.trim;
                                          var B = a.material.accent;
                                          var n = s.x - 5;
                                          var O = s.w + 10;
                                          var t = s.y - 3;
                                          var h = n + Math.floor(O / 2);
                                          var r = t + 15;
                                          var d = a.p.sit ? Math.min(58, Math.max(a.legs[0].knee, a.legs[1].knee) + 2) : Math.min(55, Math.max(a.legs[0].knee, a.legs[1].knee) - 1);
                                          var l = 0 | a.p.leg;
                                          if (u(S, [[n + 2, t], [n + O - 2, t], [n + O + 1, t + 7], [h + 6, r], [h + 8, d], [h + 2, d + 1], [h, r + 3], [h - 2, d + 1], [h - 8, d], [h - 6, r], [n - 1, t + 7]], o.line), u(S, [[n + 3, t + 1], [n + O - 3, t + 1], [n + O - 1, t + 7], [h + 5, r], [h + 7, d - 1], [h + 2, d], [h, r + 1], [h - 2, d], [h - 7, d - 1], [h - 5, r], [n + 1, t + 7]], o.base), a.g.back) {
                                            e.r(S, h - 5, t + 2, 10, 3, o.deep);
                                            e.line(S, n + 3, t + 4, h, t + 9, i.base);
                                            e.line(S, h, t + 9, n + O - 3, t + 4, i.hi);
                                            e.line(S, h, r + 1, h, d - 2, i.base);
                                            for (var f = 0; f < 3; f++)
                                              e.line(S, h - 4, t + 10 + 4 * f, h + 4, t + 10 + 4 * f, B.shade), e.dot(S, h, t + 11 + 4 * f, i.hi);
                                          }
                                          else {
                                            u(S, [[n + 4, t], [h + 1, t + 10], [h - 1, t + 10], [n + O - 5, t]], "#eef2ef");
                                            e.line(S, n + 4, t, h, t + 9, "#b9cbd3");
                                            e.line(S, n + O - 5, t, h + 1, t + 9, "#ffffff");
                                            e.r(S, h - 4, t + 1, 8, 3, o.deep);
                                            e.line(S, h - 2, r + 2, h - 5 + l, d - 1, i.base);
                                            e.line(S, h + 2, r + 2, h + 5 - l, d - 1, i.hi);
                                            e.line(S, n + 1, r + 6, n - 1, d - 2, i.hi);
                                            e.line(S, n + O - 1, r + 6, n + O + 1, d - 2, i.base);
                                            for (var c = 0; c < 2; c++) {
                                              var b = c ? n + O - 3 : n + 3;
                                              var G = c ? 1 : -1;
                                              e.line(S, b, r + 9, b + 2 * G, r + 13, i.hi);
                                              e.line(S, b + 2 * G, r + 13, b + G, r + 17, i.base);
                                              e.line(S, b + G, r + 17, b + 3 * G, r + 20, i.hi);
                                              e.dot(S, b + 3 * G, r + 20, i.shade);
                                            }
                                          }
                                          e.r(S, n + 1, r - 1, O - 2, 4, "#241923");
                                          e.line(S, n + 2, r - 1, n + O - 3, r - 1, i.hi);
                                          e.line(S, n + 2, r + 2, n + O - 3, r + 2, o.deep);
                                          if (!(a.g.back)) {
                                            e.r(S, h - 3, r - 2, 7, 5, i.deep);
                                            e.r(S, h - 2, r - 2, 5, 4, i.base);
                                            e.dot(S, h, r - 1, i.hi);
                                            e.dot(S, h, r + 1, "#fff0a3");
                                          }
                                          for (var H = -1; H <= 1; H += 2) {
                                            var g = h + 7 * H;
                                            u(S, [[g - 3, t + 2], [g - 1, t - 3], [g + 1, t + 1], [g + 4, t - 2], [g + 3, t + 4], [g, t + 2], [g - 3, t + 5]], i.deep);
                                            e.line(S, g - 1, t - 2, g, t + 1, i.hi);
                                            e.line(S, g, t + 1, g + 3, t - 1, i.base);
                                            e.dot(S, g + 2, t + 3, i.hi);
                                          }
                                        }(a, s);
                                      }
                                    else {
                                      !function (S, a) {
                                        var s = "#090b10";
                                        var o = "#12151d";
                                        var i = "#292d38";
                                        var B = "#291b14";
                                        var n = "#4a3324";
                                        var O = "#4a2d20";
                                        var t = "#745039";
                                        var h = "#9a6a48";
                                        var r = "#c49a6a";
                                        var d = a.torso;
                                        var l = d.x - 3;
                                        var f = d.w + 6;
                                        var c = d.y - 1;
                                        var b = l + Math.floor(f / 2);
                                        var G = c + 15;
                                        var H = Math.min(59, Math.max(a.legs[0].knee, a.legs[1].knee) + 5);
                                        u(S, [[l + 2, c], [l + f - 2, c], [l + f + 1, c + 4], [l + f - 1, G + 1], [l + 1, G + 1], [l - 1, c + 4]], i);
                                        e.r(S, l + 1, c + 5, 2, G - c - 4, s);
                                        e.r(S, l + f - 2, c + 5, 2, G - c - 4, o);
                                        e.r(S, l + 3, c + 2, f - 6, 2, "#3c424e");
                                        e.r(S, l + 3, c + 5, f - 6, 2, o);
                                        e.r(S, b - 3, c - 1, 6, 4, o);
                                        e.r(S, b - 2, c, 4, 2, i);
                                        e.line(S, l + 3, c + 8, l + 4, G - 2, "#20242e");
                                        e.line(S, l + f - 4, c + 8, l + f - 5, G - 2, s);
                                        u(S, [[l + 1, G], [b, G], [b - 2, H], [l - 2, H - 1], [l, H - 5]], "#654833");
                                        u(S, [[b, G], [l + f - 1, G], [l + f + 2, H - 2], [b + 2, H], [b + 1, H - 4]], "#76553a");
                                        e.line(S, l + 2, G + 2, l - 1, H - 2, n);
                                        e.line(S, b - 1, G + 2, b - 2, H - 1, B);
                                        e.line(S, b + 1, G + 2, b + 2, H - 1, "#9a7350");
                                        e.line(S, l + f - 2, G + 2, l + f + 1, H - 2, n);
                                        e.line(S, l - 1, H - 1, b - 2, H, B);
                                        e.line(S, b + 2, H, l + f + 2, H - 2, B);
                                        e.r(S, l - 2, G - 2, f + 4, 4, O);
                                        e.line(S, l - 1, G - 2, l + f + 1, G - 2, r);
                                        e.line(S, l - 1, G + 1, l + f + 1, G + 1, "#241711");
                                        e.r(S, b - 3, G - 3, 7, 6, h);
                                        e.r(S, b - 2, G - 2, 5, 4, t);
                                        e.line(S, b - 1, G - 2, b + 1, G + 1, r);
                                        e.line(S, b + 1, G - 2, b - 1, G + 1, O);
                                        e.r(S, l - 5, G - 1, 5, 7, t);
                                        e.r(S, l - 4, G, 3, 4, h);
                                        e.line(S, l - 4, G + 1, l - 2, G + 1, r);
                                        e.r(S, b + 3, G + 2, 2, 8, O);
                                        e.line(S, b + 3, G + 3, b + 4, G + 8, r);
                                        e.r(S, b + 3, G + 9, 3, 5, "#2b806f");
                                        e.r(S, b + 4, G + 9, 2, 4, "#55b89a");
                                        e.dot(S, b + 4, G + 9, "#b7f3d3");
                                      }(a, s);
                                    }
                                  else {
                                    !function (S, e) {
                                      var a = e.torso;
                                      var s = De(e);
                                      var o = e.g.side;
                                      var i = e.g.back;
                                      var B = qs(e);
                                      var n = a.y + 15;
                                      var O = Math.min(ye(e, e.legs[0]), ye(e, e.legs[1]));
                                      if (o) {
                                        Ra(S, a.x - 4, n, O, pe, 7, s, Rs(Us(e), 4, 12));
                                        return void Na(S, a.x - 2, a.y - 2, ue, s, !1);
                                      }
                                      Ra(S, a.x - 4, n, O, i ? Ne : we, 7, s, Rs(B, 4, 14));
                                      Na(S, a.x - 2, a.y - 2, i ? Je : We, s, !1);
                                      if (!(i)) {
                                        Na(S, a.x + 1, a.y + 9, Me, s, !1);
                                      }
                                      if (!(e.arms[0].front || e.arms[0].over)) {
                                        ve(S, e, 0);
                                      }
                                    }(a, s);
                                  }
                                else {
                                  !function (S, a) {
                                    var s = a.torso;
                                    var o = s.x;
                                    var i = s.w;
                                    var B = s.y;
                                    var n = o + Math.floor(i / 2);
                                    var O = B + s.h - 5;
                                    var t = a.material.cloth;
                                    var h = a.material.trim;
                                    var r = a.material.accent;
                                    if (!(a.g.back)) {
                                      e.line(S, o + 2, B, o + 2, B + 7, h.deep);
                                      e.line(S, o + i - 3, B, o + i - 4, B + 7, h.base);
                                    }
                                    e.r(S, o, B + 7, i, 5, r.shade);
                                    e.line(S, o, B + 7, o + i - 1, B + 9, r.hi);
                                    e.line(S, o, B + 10, o + i - 1, B + 8, r.base);
                                    e.line(S, o + 1, B + 11, o + i - 2, B + 10, r.deep);
                                    for (var d = 0; d < 2; d++) {
                                      var l = a.legs[d];
                                      var f = a.p.sit ? d ? 2 : -2 : l.x - a.g.legs[d].x;
                                      var c = a.p.sit ? 60 : Math.min(58, l.foot - 4);
                                      var b = d ? 1 : -1;
                                      var G = d ? o + i : o - 1;
                                      var H = n + b;
                                      var g = G + 4 * b + f;
                                      var x = H + b + f;
                                      u(S, [[G, O], [H, O], [x, c], [g - b, c - 1], [g + b, c], [g, c - 4]], t.line);
                                      u(S, [[G, O + 2], [H, O + 2], [x, c - 1], [g - b, c - 2], [g, c - 3]], d ? t.base : t.shade);
                                      e.line(S, G, O + 4, g, c - 3, h.deep);
                                      e.line(S, H, O + 5, x, c - 1, h.base);
                                      e.line(S, g, c - 3, g - b, c - 1, h.base);
                                      e.line(S, g - b, c - 1, x, c - 1, h.shade);
                                      e.line(S, G - b, O + 3, g - 2 * b, c - 5, t.hi);
                                      if (c - O > 10) {
                                        e.line(S, g - 2 * b, c - 7, g - b, c - 4, h.base);
                                        e.line(S, g - 2 * b, c - 7, g - 3 * b, c - 9, h.shade);
                                        e.dot(S, g - 3 * b, c - 6, h.hi);
                                      }
                                    }
                                    e.r(S, o - 1, O - 2, i + 2, 5, "#111922");
                                    for (var D = 0; D < 2; D++)
                                      for (var W = 0; W < Math.floor(i / 3); W++) {
                                        var J = o + 3 * W + D % 2;
                                        var M = O - 2 + 2 * D;
                                        e.line(S, J, M, J + 1, M + 1, "#647782");
                                        e.dot(S, J + 2, M, "#334551");
                                      }
                                    e.line(S, o - 1, O + 3, o + i, O + 1, h.deep);
                                    for (var w = 0; w < i; w += 2)
                                      e.dot(S, o + w, O + 2, h.base);
                                    var N = a.g.side ? o + 1 : o + 2;
                                    e.r(S, N, O + 2, 3, 3, h.deep);
                                    e.dot(S, N + 1, O + 3, h.hi);
                                    e.line(S, N + 1, O + 5, N - 2 + (0 | a.p.leg), Math.min(60, O + 12), h.base);
                                    e.line(S, N + 2, O + 5, N + (0 | a.p.leg), Math.min(59, O + 10), h.shade);
                                    if (!(a.g.back)) {
                                      e.line(S, n - 2, O + 5, n, Math.min(59, O + 8), "#8d91a0");
                                      e.line(S, n, Math.min(59, O + 8), o + i - 1, O + 6, "#c3c9d1");
                                    }
                                  }(a, s);
                                }
                              else {
                                !function (S, e) {
                                  var a = e.torso;
                                  var s = je(e);
                                  var o = e.g.side;
                                  var i = e.g.back;
                                  var B = qs(e);
                                  var n = a.y + 15;
                                  var O = Math.min(ze(e, e.legs[0]), ze(e, e.legs[1]));
                                  if (o) {
                                    Ra(S, a.x - 4, n, O, qe, 7, s, Rs(Us(e), 4, 12));
                                    return void Na(S, a.x - 2, a.y - 2, _e, s, !1);
                                  }
                                  Ra(S, a.x - 4, n, O, i ? Ke : Ee, 7, s, Rs(B, 4, 14));
                                  Na(S, a.x - 2, a.y - 2, i ? Qe : Ae, s, !1);
                                  if (!(i)) {
                                    Na(S, a.x + 1, a.y + 9, Ye, s, !1);
                                  }
                                  if (!(e.arms[0].front || e.arms[0].over)) {
                                    Ve(S, e, 0);
                                  }
                                }(a, s);
                              }
                            else {
                              !function (e, a) {
                                var s = a.torso;
                                var o = ws(a.material, S.Palette.pick("SKIN", a.cfg.skin, "light"));
                                var i = a.g.side;
                                var B = a.g.back;
                                var n = qs(a);
                                var O = s.y + s.h;
                                function t(S) {
                                  return a.p.sit ? 57 : Math.min(57, S.foot - 4);
                                }
                                var h = Math.min(t(a.legs[0]), t(a.legs[1]));
                                if (!i && !B) {
                                  Na(e, s.x - 2, s.y - 2, Ns, o, !1);
                                  Ra(e, s.x + 2, O - 1, h, js, 12, o, Rs(n, 6, 10));
                                  Na(e, s.x + 1, O - 1, Qs, o, !1);
                                  OO(e, s.x + 2, s.y + 11, Ys, o, !1);
                                  return void (a.arms[0].front || a.arms[0].over || Vs(e, a, 0));
                                }
                                if (B) {
                                  Na(e, s.x - 2, s.y - 2, ps, o, !1);
                                  Ra(e, s.x - 1, s.y - 1, h + 1, vs, 20, o, Rs(n, 18, 14));
                                  return void (a.arms[0].front || a.arms[0].over || Vs(e, a, 0));
                                }
                                var r = Us(a);
                                Na(e, s.x - 2, s.y - 2, ks, o, !1);
                                Na(e, s.x - 8, s.y - 1, Xs(a, ys, s.y - 1).slice(0, O - s.y + 1), o, !1);
                                Ra(e, s.x + 5, O - 1, h, As, 12, o, Rs(r, 6, 10));
                                Na(e, s.x + 4, O - 1, _s, o, !1);
                                OO(e, s.x + 7, s.y + 12, Es, o, !1);
                              }(a, s);
                            }
                          else {
                            !function (S, a) {
                              var s;
                              var o = a.torso;
                              var i = a.material;
                              var B = function (S) {
                                var e = S.cloth;
                                var a = S.accent;
                                var s = S.trim;
                                var o = S.belt;
                                var i = S.pants;
                                return { L: e.line, d: e.deep, s: e.shade, W: e.base, h: e.hi, Q: a.line, q: a.deep, c: a.shade, e: a.base, E: a.hi, N: s.line, n: s.deep, g: s.shade, G: s.base, Y: s.hi, T: o.line, t: o.deep, u: o.shade, U: o.base, k: o.hi, K: s.spark || s.hi, x: i.line, X: i.deep, j: i.shade, J: i.base, i: i.hi };
                              }(i);
                              var n = a.g.side;
                              var O = a.g.back;
                              var t = 0 | a.p.leg;
                              var h = o.y + o.h;
                              function r(S) {
                                return a.p.sit ? 57 : Math.min(57, S.foot - 5);
                              }
                              var d = Math.min(r(a.legs[0]), r(a.legs[1]));
                              if (n) {
                                var l = a.legs[0];
                                var f = a.p.sit ? -2 : l.x - a.g.legs[0].x;
                                Ra(S, o.x - 5 + f, h, r(l), Os, 10, B);
                                Na(S, o.x - 2, o.y - 2, is, B, !1);
                                Ra(S, o.x + 7, h - 1, d, hs, 10, B);
                                OO(S, o.x + 8, o.y + 13, ds, B, !1);
                                var c = Math.min(h + 6, d - 6);
                                var b = f > 0 ? -1 : f < 0 ? 1 : 0;
                                e.line(S, o.x + 8, h, o.x + 8 + b, c - 1, i.belt.base);
                                OO(S, o.x + 7 + b, c, fs, B, !1);
                              }
                              else {
                                for (s = 0; s < 2; s++) {
                                  var G = a.legs[s];
                                  var H = a.p.sit ? s ? 2 : -2 : G.x - a.g.legs[s].x;
                                  Ra(S, (s ? o.x + o.w - 4 : o.x - 5) + H, h, r(G), s ? ns : Bs, 10, B);
                                }
                                if (Na(S, o.x - 2, o.y - 2, O ? os : ss, B, !1), Ra(S, o.x + 2, h - 1, d, ts, 10, B), O) {
                                  var g = i.trim;
                                  e.line(S, o.x, h - 1, o.x + 2, h + 1, g.shade);
                                  e.line(S, o.x + 3, h + 1, o.x + 4, h, g.shade);
                                  e.line(S, o.x + 5, h, o.x + 6, h + 1, g.shade);
                                  e.line(S, o.x + 7, h + 1, o.x + o.w - 1, h - 1, g.shade);
                                  e.dot(S, o.x + 2, h + 1, g.hi);
                                  e.dot(S, o.x + 7, h + 1, g.hi);
                                  e.dot(S, o.x + 4, h - 1, g.base);
                                  e.dot(S, o.x + 5, h - 1, g.hi);
                                }
                                else {
                                  OO(S, o.x + 2, o.y + 12, rs, B, !1);
                                  var x = Math.min(h + 4, d - 6);
                                  e.line(S, o.x + 3, h - 1, o.x + 4, x - 1, i.trim.shade);
                                  e.line(S, o.x + 6, h - 1, o.x + 5, x - 1, i.trim.deep);
                                  OO(S, o.x + 3, x, ls, B, !1);
                                  var D = Math.min(h + 6, r(a.legs[0]) - 6);
                                  e.line(S, o.x + 1, h, o.x + 1 + t, D - 1, i.belt.base);
                                  OO(S, o.x + t, D, fs, B, !1);
                                }
                                if (!(a.arms[0].front || a.arms[0].over)) {
                                  bs(S, a, 0);
                                }
                              }
                            }(a, s);
                          }
                        else {
                          !function (a, s) {
                            var o = s.torso;
                            var i = s.material;
                            var B = ka(i, S.Palette.pick("SKIN", s.cfg.skin, "light"));
                            var n = s.g.side;
                            var O = s.g.back;
                            var t = 0 | s.p.leg;
                            var h = o.y + o.h;
                            if (!n && !O) {
                              for (var r = 0; r < 2; r++) {
                                var d = s.legs[r];
                                var l = s.p.sit ? r ? 2 : -2 : d.x - s.g.legs[r].x;
                                var f = s.p.sit ? 57 : Math.min(57, d.foot - 5);
                                Ra(a, (r ? o.x + o.w - 3 : o.x - 4) + l, h, f, r ? Ca : La, 10, B);
                              }
                              Na(a, o.x - 2, o.y - 2, ma, B, !1);
                              OO(a, o.x + 3, o.y + 13, qa, B, !1);
                              OO(a, o.x + 3, h, Ua, B, !1);
                              var c = s.p.sit ? 57 : Math.min(57, s.legs[0].foot - 5);
                              var b = s.p.sit ? 57 : Math.min(57, s.legs[1].foot - 5);
                              Fa(a, s, B, o.x - 1, h, c, -1, t, !0);
                              Fa(a, s, B, o.x + o.w, h, b, 1, -t, !1);
                              return void (s.arms[0].front || s.arms[0].over || (za(a, s, 0), Va(a, s, 0)));
                            }
                            if (O) {
                              for (var G = 0; G < 2; G++) {
                                var H = s.legs[G];
                                var g = s.p.sit ? G ? 2 : -2 : H.x - s.g.legs[G].x;
                                var x = s.p.sit ? 57 : Math.min(57, H.foot - 5);
                                Ra(a, (G ? o.x + o.w - 6 : o.x - 4) + g, h, x, G ? Qa : Aa, 10, B);
                              }
                              Na(a, o.x - 2, o.y - 2, ja, B, !1);
                              OO(a, o.x + 3, o.y + 13, qa, B, !1);
                              var D = (s.p.sit ? 57 : Math.min(s.legs[0].foot, s.legs[1].foot) - 5) - 3;
                              e.r(a, o.x + 4, h, 2, Math.max(1, D - h), i.red.base);
                              e.line(a, o.x + 4, h, o.x + 4, D - 1, i.red.deep);
                              e.dot(a, o.x + 5, h + 1, i.red.hi);
                              var W = { G: i.trim.base, n: i.trim.deep, z: i.pink.deep, r: i.pink.base, R: i.pink.hi };
                              OO(a, o.x + 3, D, Xa, W, !1);
                              var J = s.p.sit ? 57 : Math.min(57, s.legs[0].foot - 5);
                              var u = s.p.sit ? 57 : Math.min(57, s.legs[1].foot - 5);
                              Fa(a, s, B, o.x - 1, h, J, -1, t, !1);
                              Fa(a, s, B, o.x + o.w, h, u, 1, -t, !0);
                              return void (s.arms[0].front || s.arms[0].over || (za(a, s, 0), Va(a, s, 0)));
                            }
                            var M = s.legs[0];
                            var w = s.p.sit ? -2 : M.x - s.g.legs[0].x;
                            var N = s.p.sit ? 57 : Math.min(57, M.foot - 5);
                            Ra(a, o.x - 5 + w, h, N, Ya, 10, B);
                            Na(a, o.x - 2, o.y - 2, _a, B, !1);
                            OO(a, o.x + 6, o.y + 13, Ea, B, !1);
                            OO(a, o.x + 6, h, Ka, B, !1);
                            Fa(a, s, B, o.x - 1, h, N, -1, w > 0 ? -1 : w < 0 ? 1 : 0, !1);
                          }(a, s);
                        }
                      else {
                        !function (S, e) {
                          var a = e.torso;
                          var s = na(e);
                          var o = e.g.side;
                          var i = e.g.back;
                          var B = qs(e);
                          var n = a.y + 15;
                          var O = Math.min(Ha(e, e.legs[0]), Ha(e, e.legs[1]));
                          if (o) {
                            Ra(S, a.x - 4, n, O, fa, 7, s, Rs(Us(e), 4, 12));
                            return void Na(S, a.x - 2, a.y - 2, la, s, !1);
                          }
                          Ra(S, a.x - 3, n, O, i ? da : ra, 7, s, Rs(B, 4, 14));
                          Na(S, a.x - 2, a.y - 2, i ? ta : Oa, s, !1);
                          if (!(i)) {
                            Na(S, a.x + 1, a.y + 9, ha, s, !1);
                          }
                          if (!(e.arms[0].front || e.arms[0].over)) {
                            Ga(S, e, 0);
                          }
                        }(a, s);
                      }
                    else {
                      !function (S, e) {
                        var a = e.torso;
                        var s = yi(e);
                        var o = e.g.side;
                        var i = e.g.back;
                        var B = qs(e);
                        var n = a.y + a.h;
                        function O(S) {
                          return e.p.sit ? 57 : Math.min(57, S.foot - 4);
                        }
                        var t = Math.min(O(e.legs[0]), O(e.legs[1]));
                        if (!o && !i) {
                          Ra(S, a.x + 2, n - 1, t, Ci, 12, s, Rs(B, 6, 10));
                          Na(S, a.x - 2, a.y - 2, Li, s, !1);
                          var h = e.p.sit ? 7 : ji.length;
                          Na(S, a.x + 2, n - 1, ji.slice(0, h), s, !1, Rs(-B, 3, 6));
                          Na(S, a.x + 7, n - 1, ji.slice(0, h), s, !1, Rs(-B, 3, 6));
                          return void (e.arms[0].front || e.arms[0].over || Ti(S, e, 0));
                        }
                        if (i) {
                          Na(S, a.x - 2, a.y - 2, Ei, s, !1);
                          Ra(S, a.x - 1, n, t, qi, 17, s, Rs(B, 4, 14));
                          Na(S, a.x - 1, a.y, Ki, s, !1);
                          return void (e.arms[0].front || e.arms[0].over || Ti(S, e, 0));
                        }
                        var r = Us(e);
                        Na(S, a.x - 2, a.y - 2, Ui, s, !1);
                        Na(S, a.x - 8, a.y - 1, Xs(e, Xi, a.y - 1).slice(0, n - a.y + 1), s, !1);
                        Ra(S, a.x - 4, n, t, Ri, 11, s, Rs(r, 6, 10));
                        Na(S, a.x + 6, n - 2, e.p.sit ? Vi.slice(0, 5) : Vi, s, !1, Rs(-r, 2, 5));
                      }(a, s);
                    }
                  else {
                    !function (S, a) {
                      var s = a.torso;
                      var o = Fo(a);
                      var i = a.g.side;
                      var B = a.g.back;
                      var n = qs(a);
                      var O = s.y + s.h;
                      function t(S) {
                        return a.p.sit ? 57 : Math.min(56, S.foot - 5);
                      }
                      var h = Math.min(t(a.legs[0]), t(a.legs[1]));
                      if (!i && !B) {
                        var r = a.legs[0];
                        var d = a.p.sit ? -2 : r.x - a.g.legs[0].x;
                        var l = a.legs[1];
                        var f = a.p.sit ? 2 : l.x - a.g.legs[1].x;
                        ko(S, s.x + 3 + f, O - 2, t(l) + 1, Si, 9, o, !1, Rs(-n, 8, 8));
                        ko(S, s.x - 4 + d, O, t(r) - 1, $o, 8, o, !1, Rs(n, 8, 8));
                        Na(S, s.x - 2, s.y - 2, To, o, !1);
                        OO(S, s.x + 8, O - 4, ei, o, !1);
                        return void (a.arms[0].front || a.arms[0].over || hi(S, a, 0));
                      }
                      if (B) {
                        for (var c = 0; c < 2; c++) {
                          var b = a.legs[c];
                          var G = a.p.sit ? c ? 2 : -2 : b.x - a.g.legs[c].x;
                          ko(S, (c ? s.x + s.w + 4 : s.x - 5) + G, O, t(b), ai, 8, o, 1 === c, Rs(c ? -n : n, 8, 8));
                        }
                        ko(S, s.x + 2, O - 2, h + 1, si, 8, o, !1, Rs(n, 8, 8));
                        Na(S, s.x - 2, s.y - 2, Po, o, !1);
                        if (!(a.arms[0].front || a.arms[0].over)) {
                          hi(S, a, 0);
                        }
                        return void function (S, a, s) {
                          if (ri(a)) {
                            var o = a.torso;
                            var i = o.x + o.w + 3;
                            var B = o.y - 4;
                            var n = o.x - 1;
                            var O = Math.min(o.y + o.h + 7, 59);
                            e.fatLine(S, i, B, n, O, 3, s.K);
                            e.line(S, i, B, n, O, s.H);
                            e.line(S, i - 1, B, n - 1, O, s.k);
                            e.line(S, i + 1, B, n + 1, O, s.U);
                            for (var t = 1; t < 5; t++) {
                              var h = Math.round(i + (n - i) * t / 5);
                              var r = Math.round(B + (O - B) * t / 5);
                              e.dot(S, h, r, s.G);
                              e.dot(S, h + 1, r, s.n);
                            }
                            e.fatLine(S, i + 1, B - 4, i, B, 2, s.k);
                            e.dot(S, i + 1, B - 4, s.G);
                            e.dot(S, i + 2, B - 5, s.Y);
                            e.line(S, i - 2, B + 1, i + 2, B - 1, s.G);
                            e.dot(S, i, B, s.Y);
                            e.dot(S, n, O, s.G);
                            e.dot(S, n + 1, O, s.Y);
                            e.line(S, i + 2, B - 2, i + 3, B + 4, s.o);
                            e.dot(S, i + 3, B + 5, s.O);
                            e.line(S, i + 3, B + 6, i + 3, B + 8, s.e);
                            e.dot(S, i + 3, B + 9, s.c);
                          }
                        }(S, a, o);
                      }
                      var H = Oo(a);
                      var g = Us(a);
                      Na(S, s.x - 2, s.y - 2, H ? Io : Zo, o, !1);
                      Ra(S, s.x + 6, O - 2, h, Bi, 8, o, Rs(g, 6, 10));
                    }(a, s);
                  }
                else {
                  !function (S, e) {
                    var a = e.torso;
                    var s = no(e);
                    var o = e.g.side;
                    var i = e.g.back;
                    var B = qs(e);
                    var n = a.y + a.h;
                    function O(S) {
                      return e.p.sit ? 57 : Math.min(57, S.foot - 4);
                    }
                    var t = Math.min(O(e.legs[0]), O(e.legs[1]));
                    if (!o && !i) {
                      for (var h = 0; h < 2; h++) {
                        var r = e.legs[h];
                        var d = e.p.sit ? h ? 2 : -2 : r.x - e.g.legs[h].x;
                        ko(S, (h ? a.x + a.w + 4 : a.x - 5) + d, n, O(r), Ho, 8, s, 1 === h, Rs(h ? -B : B, 8, 8));
                      }
                      ko(S, a.x + 2, n - 2, t + 1, go, 10, s, !1, Rs(B, 6, 10));
                      Na(S, a.x - 2, a.y - 2, ho, s, !1);
                      return void (e.arms[0].front || e.arms[0].over || Yo(S, e, 0));
                    }
                    if (i) {
                      for (var l = 0; l < 2; l++) {
                        var f = e.legs[l];
                        var c = e.p.sit ? l ? 2 : -2 : f.x - e.g.legs[l].x;
                        ko(S, (l ? a.x + a.w + 5 : a.x - 6) + c, n, O(f), Do, 8, s, 1 === l, Rs(l ? -B : B, 8, 8));
                      }
                      Ra(S, a.x, n - 2, t + 1, xo, 6, s, Rs(B, 8, 8));
                      Na(S, a.x - 2, a.y - 2, ro, s, !1);
                      OO(S, a.x - 2, n - 4, wo, s, !1);
                      OO(S, a.x + a.w + 1, n - 4, wo, s, !0);
                      if (!(e.arms[0].front || e.arms[0].over)) {
                        Yo(S, e, 0);
                      }
                      Eo(S, e, s);
                      return void (e.arms[0].front || e.arms[0].over || mo(S, e, 0));
                    }
                    var b = Oo(e);
                    var G = Us(e);
                    Na(S, a.x - 2, a.y - 2, b ? fo : lo, s, !1);
                    Ra(S, a.x + 6, n - 2, t, Jo, 10, s, Rs(G, 6, 10));
                    if (b) {
                      Eo(S, e, s);
                    }
                  }(a, s);
                }
              else {
                !function (S, a) {
                  var s = a.torso;
                  var o = Ln(a);
                  var i = a.material.trim;
                  var B = a.g.side;
                  var n = a.g.back;
                  var O = s.y + 13;
                  var t = qs(a);
                  var h = a.p.sit ? 0 : t;
                  var r = a.p.sit ? Math.min(57, Math.max(a.legs[0].knee, a.legs[1].knee) + 5) : Math.min(55, Math.max(a.legs[0].foot, a.legs[1].foot) - 7);
                  var d = Math.max(6, r - O);
                  if (B) {
                    var l = Us(a);
                    zn(S, a, -l, r, O, s.x + 4);
                    Na(S, s.x - 7, O + 2, Vn("side", d), o, !1, Rs(l, 3, 12));
                    Na(S, s.x - 2, s.y - 2, Qn, o, !1);
                    Na(S, s.x - 2, s.y + 11, Yn, o, !1);
                  }
                  else if (zn(S, a, h, r, O, s.x + 4), Na(S, s.x - 6, O + 2, Vn(n ? "back" : "down", d), o, !1, Rs(h, 3, 12)), Na(S, s.x - 2, s.y - 2, n ? An : jn, o, !1), Na(S, s.x - 3, s.y + 11, _n, o, !1), !n) {
                    for (var f = a.p.sit ? 2 : 5, c = O + 4, b = 0; b < f; b++)
                      e.dot(S, s.x + 2, c + b, b === f - 1 ? i.line : b % 2 ? i.shade : i.base), e.dot(S, s.x + 7, c + b, b === f - 1 ? i.line : b % 2 ? i.shade : i.hi);
                  }
                  if (!(a.arms[0].front || a.arms[0].over)) {
                    Un(S, a, 0);
                  }
                }(a, s);
              }
            else {
              !function (S, e) {
                var a = e.torso;
                var s = ci;
                var o = e.g.side;
                var i = e.g.back;
                var B = qs(e);
                var n = a.y + 14;
                var O = 60 - ki.length;
                var t = Math.max(0, n - O);
                function h(S) {
                  return function (S, e) {
                    return S.p.sit ? 57 : Math.min(57, e.foot - 5);
                  }(e, S);
                }
                var r = Math.min(h(e.legs[0]), h(e.legs[1]));
                if (o) {
                  var d = Us(e);
                  if (e.p.sit) {
                    Na(S, a.x - 5, O + t, mi.slice(t), s, !1);
                  }
                  else {
                    Ra(S, a.x - 5, n, r, wi, 7, s, Rs(d, 4, 12));
                  }
                  return void Na(S, a.x - 2, a.y - 2, Mi, s, !1);
                }
                if (e.p.sit) {
                  Na(S, a.x - 6, O + t, ki.slice(t), s, !1);
                }
                else if (i) {
                  Ra(S, a.x - 3, n, r, ui, 7, s, Rs(B, 4, 14));
                }
                else {
                  for (var l = 0; l < 2; l++) {
                    var f = e.legs[l];
                    f.x;
                    e.g.legs[l].x;
                    ko(S, l ? f.x + f.w + 3 : f.x - 4, n, h(f), Di, 7, s, 1 === l, Rs(B, 4, 14));
                  }
                  var c = Wi.length;
                  Na(S, a.x + 3, n, Wi.slice(0, Math.min(c, r - n)), s, !1, Rs(-B, 3, 7));
                  Na(S, a.x + 6, n, Wi.slice(0, Math.min(c - 1, r - n)), s, !0, Rs(-B, 3, 7));
                }
                Na(S, a.x - 2, a.y - 2, i ? Ji : gi, s, !1);
                if (!(i)) {
                  Na(S, a.x, a.y + 9, xi, s, !1);
                }
                var b = e.arms[0];
                if (!(b.front || b.over)) {
                  vi(S, e, 0);
                }
              }(a, s);
            }
          else {
            !function (S, a) {
              var s = a.material.cloth;
              var o = a.material.accent;
              var i = a.material.trim;
              var B = Nn.lu_hanh_moc.stitch;
              var n = a.torso;
              var O = n.x - 2;
              var t = n.w + 4;
              var h = O + t;
              var r = O + Math.floor(t / 2);
              var d = n.y;
              var l = n.y + n.h - 3;
              var f = n.y + n.h + 6;
              var c = l - 1;
              if (e.r(S, O + 1, d, t - 2, f - d, s.line), e.r(S, O + 2, d + 1, t - 4, f - d - 2, s.base), e.r(S, O + 2, d + 4, 1, f - d - 6, s.shade), e.r(S, h - 3, d + 4, 1, f - d - 6, s.shade), e.r(S, O + 3, d + 2, t - 6, 1, s.hi), a.g.back) {
                e.r(S, O + 1, d + 3, t - 2, c - d - 2, o.line);
                e.r(S, O + 2, d + 4, t - 4, c - d - 4, o.base);
                e.r(S, O + 3, d + 5, t - 6, 1, o.hi);
                e.line(S, r, d + 7, r, c - 2, o.deep);
                e.dot(S, r - 2, d + 13, B);
                e.dot(S, r + 1, d + 19, B);
              }
              else if (a.g.side) {
                e.r(S, O + 1, d + 2, t - 2, c - d - 1, o.line);
                e.r(S, O + 2, d + 3, t - 4, c - d - 3, o.base);
                e.r(S, O + 2, d + 5, 1, Math.max(1, c - d - 8), o.hi);
                e.line(S, h - 3, d + 3, r, d + 8, B);
                e.r(S, r, d + 8, 1, Math.max(1, c - d - 9), o.deep);
              }
              else {
                var b = Math.max(2, Math.floor((t - 4) / 2));
                e.r(S, O + 1, d + 3, b + 1, c - d - 2, o.line);
                e.r(S, r + 1, d + 3, b + 1, c - d - 2, o.line);
                e.r(S, O + 2, d + 2, 2, 5, o.line);
                e.r(S, h - 4, d + 2, 2, 5, o.line);
                e.r(S, O + 2, d + 4, b - 1, c - d - 4, o.base);
                e.r(S, r + 2, d + 4, b - 1, c - d - 4, o.base);
                e.line(S, O + 2, d + 3, r - 1, d + 8, B);
                e.line(S, h - 3, d + 3, r + 1, d + 8, o.hi);
                e.line(S, O + 2, d + 9, O + 2, c - 2, o.deep);
                e.line(S, h - 3, d + 9, h - 3, c - 2, o.deep);
                e.dot(S, O + 3, d + 13, B);
                e.dot(S, h - 4, d + 13, B);
              }
              if (e.r(S, O + 1, l, t - 2, 3, i.line), e.r(S, O + 1, l, t - 2, 1, i.base), e.r(S, O + 1, l + 2, t - 2, 1, i.deep), !a.g.back) {
                var G = a.g.side ? h - 3 : r + 3;
                e.r(S, G - 1, l - 1, 4, 4, i.line);
                e.r(S, G, l, 2, 1, i.hi);
                e.r(S, G + 1, l + 3, 2, 4, i.base);
                e.r(S, G + 2, l + 5, 1, 2, i.deep);
              }
              e.r(S, O + 2, f - 2, t - 4, 1, s.line);
              e.r(S, O + 3, f - 3, 2, 1, s.hi);
              e.r(S, h - 5, f - 3, 2, 1, s.hi);
            }(a, s);
          }
        else {
          !function (S, a) {
            var s = a.material.cloth;
            var o = a.material.trim;
            var i = a.material.accent;
            var B = Nn.ao_thon_lac.stitch;
            var n = a.torso;
            var O = n.x - 2;
            var t = n.w + 4;
            var h = O + t;
            var r = O + Math.floor(t / 2);
            var d = n.y;
            var l = n.y + n.h - 3;
            var f = n.y + n.h + 5;
            if (e.r(S, O + 1, d, t - 2, f - d, s.line), e.r(S, O, d + 3, 1, f - d - 3, s.line), e.r(S, h - 1, d + 3, 1, f - d - 3, s.line), e.r(S, O + 2, d + 1, t - 4, f - d - 2, s.base), e.r(S, O + 1, d + 4, 1, f - d - 5, s.base), e.r(S, h - 2, d + 4, 1, f - d - 5, s.base), e.r(S, O + 2, d + 4, 1, l - d - 4, s.shade), e.r(S, h - 3, d + 4, 1, l - d - 4, s.shade), e.r(S, O + 3, d + 2, t - 6, 1, s.hi), e.line(S, O + 3, d + 5, O + 4, l - 4, s.hi), e.line(S, h - 3, d + 5, h - 4, l - 4, s.shade), a.g.back ? (e.line(S, r, d + 4, r, f - 3, s.shade), e.line(S, r - 1, d + 5, r - 1, f - 5, s.hi), e.dot(S, r - 2, d + 12, B), e.dot(S, r + 1, d + 17, B)) : a.g.side ? (e.line(S, h - 3, d + 1, r + 1, d + 8, o.base), e.line(S, r + 1, d + 8, r + 1, l - 2, o.deep), e.r(S, O + 2, d + 5, 1, 5, s.hi)) : (e.line(S, O + 3, d + 1, r - 1, d + 7, o.base), e.line(S, h - 3, d + 1, r + 1, d + 8, o.hi), e.line(S, r - 1, d + 7, r - 2, l - 2, o.deep), e.line(S, r + 1, d + 8, r + 2, l - 2, o.base), e.r(S, O + 3, d + 12, 1, 2, s.hi), e.dot(S, O + 4, d + 13, s.hi), e.r(S, O + 2, f - 5, 4, 4, s.line), e.r(S, O + 3, f - 4, 2, 2, o.deep), e.line(S, O + 2, f - 1, O + 5, f - 1, o.base)), e.r(S, O + 1, l, t - 2, 3, i.deep), e.r(S, O + 1, l, t - 2, 1, i.base), e.r(S, O + 1, l + 2, t - 2, 1, i.line), !a.g.back) {
              var c = a.g.side ? h - 3 : r + 3;
              e.r(S, c - 1, l - 1, 4, 4, i.line);
              e.r(S, c, l, 2, 1, i.hi);
              e.line(S, c + 1, l + 2, c + 3, l + 6, i.base);
              e.r(S, c + 2, l + 5, 2, 1, i.deep);
            }
            e.r(S, O + 2, f - 2, t - 4, 1, o.deep);
            e.r(S, O + 3, f - 3, 2, 1, o.base);
            e.r(S, h - 5, f - 3, 2, 1, o.base);
          }(a, s);
        }
      else {
        wn(a, s);
      }
    else {
      !function (S, a) {
        var s = a.torso;
        var o = a.g.side;
        var i = a.g.back;
        var B = qs(a);
        function n(S) {
          return a.p.sit ? 57 : Math.min(56, S.foot - 5);
        }
        s.y;
        s.h;
        var O = Math.min(n(a.legs[0]), n(a.legs[1]));
        if (!o && !i) {
          bB(S, a, sB, 7, 37, 11, O + 1, 8, Rs(B, 8, 8), !1);
          cB(S, a, eB, 9, 22, 11);
          bB(S, a, aB, 13, 37, 11, O, 6, Rs(-B, 8, 8), !1);
          return void (a.arms[0].front || a.arms[0].over || HB(S, a, 0));
        }
        if (i) {
          bB(S, a, rB, 7, 37, 11, O + 1, 8, Rs(B, 8, 8), !1);
          for (var t = s.y; t < s.y + s.h; t++)
            e.r(S, s.x, t, s.w, 1, Pi.B), e.dot(S, s.x, t, Pi.N), e.dot(S, s.x + s.w - 1, t, Pi.N), e.dot(S, s.x + 1, t, Pi.b);
          e.r(S, s.x - 1, s.y + 9, s.w + 2, 3, Pi.S);
          e.r(S, s.x - 1, s.y + 9, s.w + 2, 1, Pi.R);
          e.r(S, s.x - 1, s.y + 11, s.w + 2, 1, Pi.s);
          cB(S, a, tB, 6, 23, 11);
          return void (a.arms[0].front || a.arms[0].over || HB(S, a, 0));
        }
        bB(S, a, nB, 6, 37, 12, O + 1, 8, Rs(Us(a), 6, 10), !1);
        cB(S, a, BB, 10, 22, 12);
      }(a, s);
    }
  }
  function oO(S, e) {
    if ((e.arms[0].front || e.arms[0].over)) {
      cn(S, e, 0);
    }
    cn(S, e, 1);
  }
  var iO = ["..H....", ".LB....", ".LBH...", "LSBH...", "LSBBH..", "LDSBH..", ".LDSBH.", "..LDSBB", "...LDSB"];
  var BO = ["H....", "BH...", "SBH..", ".SBB.", "..SBB", "...SB", "....S"];
  var nO = ["H.....", "BH....", "SBH...", ".SBBB.", "..SDBB", "...SBB", "....SB"];
  function OO(S, a, s, o, i, B) {
    for (var n = 0; n < o.length; n++)
      for (var O = 0; O < o[n].length; O++) {
        var t = o[n].charAt(O);
        if ("." !== t) {
          e.dot(S, B ? a - O : a + O, s + n, i[t]);
        }
      }
  }
  function tO(S, a, s, o) {
    u(S, a, s);
    for (var i = 0, B = a.length - 1; i < a.length; B = i++)
      e.line(S, Math.round(a[B][0]), Math.round(a[B][1]), Math.round(a[i][0]), Math.round(a[i][1]), o);
  }
  function hO(S, e) {
    for (var a = S.slice(), s = S.length - 1; s >= 0; s--)
      a.push([e - S[s][0], S[s][1]]);
    return a;
  }
  var rO = ["..........oSSo........", "......gYoSHhSSsoYg....", "........oSsHSSso......", "......ooSSsHhSSSoo....", ".....ooSSsShHSSSSoo...", "....oSSsSSShHSSSSsSo..", "....oSsSSSHhSSSSsSSo..", "....oSSsSShHSSSSsSSo..", "....oSsSSS.sS.SsSSSo..", "....oSsSS......SSsSo..", "....oSs..........sSo..", "...oSHs..........sHSo.", "...oHSs..........sSHo.", "..oSSs............sSSo", ".oSsSs............sSsS", "..osSHs..........sHSso", "..oSHSs..........sSHSo", "..oHSSss........ssSSHo", ".oSSsSs..........sSsSS", ".oSsSHs..........sHSsS", ".osSHSs..........sSHSs", "oSHSSs............sSSH", "oHSSss............ssSS", ".oSSsSs..........sSsSS", ".oSsSHs..........sHSsS", "..osSHSs........sSHSso", ".oSHSSs..........sSSHS", ".oHSSss..........ssSSH", "..oSSss..........ssSSo", "..oSss............ssSo", "...oss............sso.", ".....os..........so...", ".....o............o..."];
  var dO = ["....oSsSHSSSsSHo....", "....osSHSSSsSHSo....", "....oSHSSSsSHSSo....", "....oHSSSsSHSSSso...", "....oSSSsSHSSSsSo...", "....oSSsSHSSSsSHo...", "...oSsSHSSSsSHSSo...", "...osSHSSSsSHSSSo...", "...oSHSSSsSHSSSso...", "...oHSSSsSHSSSsSHo..", "...oSSSsSHSSSsSHSo..", "...oSSsSHSSSsSHSSo..", "..oSsSHSSSsSHSSSso..", "..osSHSSSsSHSSSsSo..", "..oSHSSSsSHSSSsSHo..", "..oHSSSsSHSSSsSHSo..", "..oSSSsSHSSSsSHSSo..", "..oSSsSHSSSsSHSSSo..", "...oSsSHSSSsSHSSo...", "....osSHSSSsSHSo....", ".....oSHSSSsSHo.....", "......oHSSSsSo......", ".......oSSSso.......", "........oSSo........"];
  var lO = [".......oSSo.........", "......oSHSSoGYg.....", "......oSsSSo........", ".....ooSSsHhSSSoo...", "....ooSSsShHSSSSoo..", "...oSSsSSShHSSSSSo..", "...oSsSSSHhSSSSsSo..", "...oSSsSShHSSSSsSo..", "...oSsSSSSsSs.......", "...oSsSSSSs.........", "...oSsSSSS..........", "...oSsSSSSs.........", "...oSHsSSSs.........", "...oSsSSSSs.........", "...oSHsSSS..........", "...oSsSSSs..........", "....oSHSSs..........", ".....oSSSs..........", "......oSSs..........", ".......oSs..........", "........os.........."];
  var fO = [".....oSsSs......", ".....osSHs......", "....oSHSs.......", "....oHSSSs......", "....oSSSss......", ".....oSSsSs.....", "...oSsSHSs......", "...osSHSSs......", "..oSHSSSs.......", "..oHSSSsSs......", "..oSSSsSHs......", "...oSSsSHSs.....", "..oSsSHSSs......", "..osSHSSSs......", ".oSHSSSss.......", "..oHSSSsSs......", "..oSSSsSHs......", "...oSSsSHSs.....", "..oSsSHSSs......", "...osSHSSs......", "...oSHSSs.......", ".....oHSSs......", "......oSSs......", "........oSs....."];
  var cO = ["..........oSSo........", "......gYoSHhSSsoYg....", "........oSsHSSso......", "......ooSSsHhSSSoo....", ".....ooSSsShHSSSSoo...", "....oSSsSSShHSSSSsSo..", "....oSsSSSHhSSSSsSSo..", "....oSSsSShHSSSSsSSo..", ".....oSsSHSSSsSHSSo...", ".....oSsSHSSSsSHSSo...", ".....oSsSHSSSsSHSSo...", ".....oSsSHSSSsSHSSo...", ".....oSsSHSSSsSHSSo...", "....osSHSSSsSHSSSsSo..", "....osSHSSSsSHSSSsSo..", "....osSHSSSsSHSSSsSo..", "....osSHSSSsSHSSSsSo..", "....osSHSSSsSHSSSsSo..", "....oSsSHSSSsSHSSSso..", "....oSsSHSSSsSHSSSso..", "....oSsSHSSSsSHSSSso..", "....oSsSHSSSsSHSSSso..", "....oSsSHSSSsSHSSSso..", "....osSHSSSsSHSSSsSo..", "....osSHSSSsSHSSSsSo..", "....osSHSSSsSHSSSsSo..", "....osSHSSSsSHSSSsSo..", "....osSHSSSsSHSSSsSo..", "....oSsSHSSSsSHSSSso..", "......oSsSHSSSsSHSo...", ".......oSsSHSSSso.....", ".........oSsSHSo......", "..........oSso........", "..........osSo........", "..........ooGYGoo....."];
  function bO(S, e) {
    var a = { O: S.line, D: S.deep, S: S.shade, B: S.base, H: S.hi, W: S.hi2 || S.hi };
    if (e) {
      for (var s in e)
        a[s] = e[s];
    }
    return a;
  }
  function GO(S, e, a, s) {
    for (var o = [], i = 0; i < 2; i++) {
      var B = S.arms[i];
      if (B && e(i, B)) {
        for (var n = w(B), O = h(B), t = B.bent ? [n, { x: B.jx, y: B.jy }, O] : [n, O], r = 1; r < t.length; r++) {
          var d = t[r - 1];
          var l = t[r];
          var f = l.x - d.x;
          var c = l.y - d.y;
          var b = Math.sqrt(f * f + c * c) || 1;
          var G = 1 === r ? 2 : 0;
          var H = r === t.length - 1 ? 1 : 0;
          o.push([d.x - f / b * G, d.y - c / b * G, l.x + f / b * H, l.y + c / b * H]);
        }
      }
    }
    return o.length ? function (S, e) {
      if (e < a) {
        return !1;
      }
      for (var i = 0; i < o.length; i++) {
        var B = o[i];
        var n = B[2] - B[0];
        var O = B[3] - B[1];
        var t = n * n + O * O || 1;
        var h = Math.max(0, Math.min(1, ((S - B[0]) * n + (e - B[1]) * O) / t));
        var r = B[0] + n * h - S;
        var d = B[1] + O * h - e;
        if (r * r + d * d <= s) {
          return !0;
        }
      }
      return !1;
    } : null;
  }
  function HO(S, e) {
    var a = S.g.side;
    var s = S.head.y;
    var o = GO(S, function (S, e) {
      return e.over && !(a && 0 === S);
    }, -99, 3.9);
    var i = a ? GO(S, function (S, e) {
      return 1 === S || e.front || e.over;
    }, s + 14, 8) : S.g.back ? null : GO(S, function (S, e) {
      return e.front;
    }, s + 12, 7);
    return function (S, a) {
      return a > e || !(!o || !o(S, a)) || !(!i || !i(S, a));
    };
  }
  var gO = Object.create(null);
  gO.dao_dong = { down: { F: ["....................", "........O....O......", ".......OHO..OHO.....", ".....OOBHBOOBHBOO...", "....OSBHBBHBBHBBSO..", "...OSBHBBHWHBBHBBSO.", "..OSBHBBHWHBBHBBBSO.", "..OSBBBHBHBBBBHBBSO.", ".OSBBBHBBBHBBBBHBSDO", ".ODSBHBBSBBHBBSBHSDO", ".ODSHBSOSBHBSOBHSDO.", "..ODSO.OSBO.OSBOSDO.", "..OSO...OO.....OSO..", "...O............O..."] }, side: { F: [".....................", "..........O...O......", "........O.OHO.OHO....", "......OOBOBHBOBHBO...", ".....OSBBHBBBHBBHBO..", "....OSBBHBBBHBBBHBSO.", "...OSBBHBBBHBBBHBBSO.", "..OSBBHBBBHBBBHBBSSO.", "..ODSBHBBHBBBHBBSBSO.", "..ODSHBBHBBSBBBOSOSO.", "..ODSBBHBBSBSOSO.OO..", "..ODSSBHSSSOOSO......", "..ODSBHSO...SO.......", "...ODSHO....O........", "...ODSSO.............", "..OOSDSO.............", "..O.OSO..............", "....OO..............."] }, up: { F: ["....................", "........O....O......", ".......OHO..OHO.....", ".....OOBHBOOBHBOO...", "....OSBBHBBHBBHBSO..", "...OSBBHBBBBHBBHBSO.", "..OSBBHBBBSBBHBBBSO.", ".OSBBHBBBSBSBBHBBSO.", ".OSBHBBBSBBBSBBHBSO.", ".ODSHBBSBBHBBSBBHSDO", ".ODSBBSBBHBHBBSBBSDO", "..ODSBBBHBBBHBBBSDO.", "..ODSBBHBBSBBHBBSDO.", "..ODSSBHBSBSBHBSSDO.", "...ODSSBSBBBSBSSDO..", "...ODDSSSBSBSSSDDO..", "....OODSOSSOSDOO....", "......OO.OO.OO......"] } };
  gO.dao_ke = { pal: { x: "#4a2f1c", w: "#8a5a32", v: "#c49060", k: "#232c3d", K: "#3a4a66" }, down: { F: ["........OOOO........", ".......OBHWBO.......", "....xwwOBBHBOwwv....", ".......OSBBSO.......", "....OOOkKKKKkOOO....", "...OSBBBHBBHBBBSO...", "..OSBBBHBBBBHBBBSO..", "..OSBBHBBBBBBHBBSO..", "..ODSHBBBBBBBBHSDO..", "..OSO..........OSO..", "..OSO..........OSO..", "..OO............OO.."] }, side: { F: ["......OOOO...........", "..xw.OBHWBO..........", "....wOBBHBOw.........", ".....OSBBSOwwv.......", "....OOkKKKkOOO.......", "....OSBBBBHBBHBBSO...", "....OSBBBBHBBBBHBSO..", "...OSBBBBBBHBBBBBSO..", "..OSBBHBBBBBBHBBBSO..", "..ODSBBHBBBBBBBHSO...", "..ODSBBBHBBBBBHOO....", "..ODSSBBBBBBSOO......", "..ODSBSSO...SO.......", "...ODSSO....O........", "...ODSSO.............", "...OSDSO.............", "....OSO..............", ".....O..............."] }, up: { F: ["........OOOO........", ".......OBHWBO.......", "....xwwOBBHBOwwv....", ".......OSBBSO.......", "....OOOkKKKKkOOO....", "...OSBBBHBBHBBBSO...", "..OSBBBHBBBBHBBBSO..", "..OSBBHBBBBBBHBBSO..", ".ODSBHBBBSSBBBHBSDO.", ".ODSHBBBSBBSBBBHSDO.", ".ODHBBBSBBBBSBBBHDO.", "..ODHBSBBBBBBSBHDO..", "..ODSHBBBBBBBBHSDO..", "...ODSHBBBBBBHSDO...", "...ODDSSHBBHSSDDO...", "....OODDSSSSDDOO....", "......OOOOOOOO......"] } };
  gO.ma_vi = { pal: { r: "#7e1f22", R: "#c2413a", q: "#e87a62" }, down: { F: [".........OOO........", "........OHBBO.......", "........ORRqO.......", "....OOOOSBBSOOO.....", "...OSBBBBHBBBBBSO...", "..OSBBHBBBBBHBBBSO..", "..OSBBBBHBBBBBBBSO..", ".OSBBBHBBBBBBBBBBSO.", ".ODSBBBBBBBBBSBBSDO.", ".ODSBBBSBBBOSBBOSDO.", "..OSBBOSBOOSBOOSBO..", "...OBOSBO.OO..OSBO..", "...OB..........BO...", "...OB..........BO...", "...OB..........BO...", "...OS..........SO...", "...OS..........SO...", "....O..........O...."] }, side: { fs: [8, 18], F: [".......OOO...........", "......OHBBO..........", "....OOORRqO..........", "...OBBOOOOOOOOO......", "..OSBOSBBHBBBBBOO....", "..OBSOBBBBBHBBBBSO...", ".OBSOSBBBBBBBBHBBSO..", ".OBSOSBBBHBBBBBBBSO..", ".OSO.ODSBBBBBBBBBSO..", ".OSO.ODSBBBBBSBBOSO..", ".OBSO.ODSSBBBBOSBO...", "..OSO.ODSSSSSOBO.....", "..OBSOODO...BO.......", "..OSBOODO...BO.......", "...OSBODO...BO.......", "...OBSOO....SO.......", "...OSBO......O.......", "....OSBO.............", "....OBSO.............", "....OSBO.............", "....OBSO.............", ".....OBO.............", ".....OSO.............", ".....OO.............."] }, up: { fs: [10, 14], F: [".........OOO........", "........OHBBO.......", "........ORRqO.......", "....OOOOSBHBOOOO....", "...OSBBBOBBOBBBSO...", "..OSBBHBOBHOBHBBSO..", "..OSBHBBOBBOBBHBSO..", ".OSBHBBBOSBOBBBHBSO.", ".ODSBBBBOBHOBBBBSDO.", ".ODSBBBBOBBOBBBBSDO.", ".ODSBBBBOSBOBBBBSDO.", "..ODSBBBOBHOBBBSDO..", "..ODSSBBOBBOBBSSDO..", "...ODSSOSBBOOSSDO...", "...ODDSOBHBSODDO....", "....OODOBBBSOOO.....", ".......OSBBSO.......", ".......OBHBSO.......", ".......OBBSSO.......", ".......OSBBSO.......", "........OBSO........", "........OBSO........", "........OSO.........", ".........O.........."] } };
  gO.kiem_tu_ban_ket = { pal: { m: "#8aa4ad", M: "#c6d3d8", j: "#426e75", J: "#d7eeea" }, down: { bx: -4, by: 6, B: ["......................", "..OO..............OO..", ".OSDO............ODSO.", ".OSDO............ODSO.", ".OSBDO..........ODBSO.", ".OSBDO..........ODBSO.", ".OSBSDO........ODSBSO.", ".OSBSDO........ODSBSO.", ".OSBSDO........ODSBSO.", "OSBBSDO........ODSBBSO", "OSBBSDO........ODSBBSO", "OSBSDO..........ODSBSO", "OSBSDO..........ODSBSO", "OSSDO............ODSSO", ".OSDO............ODSO.", ".OSO..............OSO.", "..O................O.."], F: ["....................", "........OOOO........", "...mMmmOBHHBOmMmjJ..", ".......OSBBSO.......", "....OOOSBBBBSOOO....", "...OSBBHWHOHWHBBSO..", "..OSBBHWHBOBHWHBBSO.", "..OSBHWHBBOBBHWHBSO.", ".OSBBHBBBSOSBBBHBSO.", ".ODSBHBBSO.OSBBHBSDO", ".ODSBHBSO...OSBHBSDO", ".ODSHBSO.....OSHBSDO", ".ODHO.........OSHBDO", ".ODHO.........OSHBDO", ".ODHO.........OSHBDO", ".ODHO.........OSHBDO", ".ODHSO.......OSHBBDO", ".ODHSO.......OSHBBDO", ".OSHSO........OSHBDO", ".OSHBO........OSHBDO", ".OSHBO........OBHSO.", ".OSHBO........OBHSO.", ".OSHSO........OSHSO.", "..OHSO........OSHO..", "..OSO..........OSO..", "...O............O..."] }, side: { fs: [18, 12], F: [".....................", ".....OOOO............", "....OBHHBO...........", "jJmmOSBBSOmmM........", "....OOSBSOOOOOO......", "...OSBBSBBBHBBBOO....", "..OSBBBBBBHWHBBBSO...", "..OSBBBBBHWHBBBBBSO..", ".OSBBBBBBBBBHWHBBBSO.", ".OSBBBHBBBBBBBHBBOSO.", ".ODSBBBHBBBBBBBOSBOO.", ".ODSBBBBHBBBBBOSO.O..", ".ODSBBBBHBBBSO.......", ".ODSBBBBHBBBSO.......", ".ODSBBBBBHBBSO.......", ".ODSBBBBBHBBSO.......", ".ODSBBBBBHBSO........", "..ODSBBBBHBSO........", "..ODSBBBBHBSO........", "..ODSBBBHBSO.........", "..ODSBBBHBSO.........", "..ODSBBBHBSO.........", "..ODSBBHBBSO.........", "...ODSBHBSO..........", "...ODSBHBSO..........", "...ODSHBSO...........", "....OSHBSO...........", "....OSBSO............", ".....OSO.............", "......O.............."] }, up: { fs: [13, 12], F: ["....................", "....................", "......OOOOOOOO......", "....OOBBHWWHBBOO....", "...OSBBHWHHWHBBSO...", "..OSBBHWBOOBWHBBSO..", "..OSBHBBOSHBOBHBSO..", "..mmmmmMOBHSOMmmjJ..", ".ODSBHBBOSBBOBBHBSDO", ".ODSBBHBBOOOBBHBBSDO", ".ODSBBHBBSBSBBHBBSDO", ".ODSBBBHBSBSBHBBBSDO", ".ODSBBBHBSBSBHBBBSDO", ".ODSBHBBHBSBHBBHBSDO", ".ODSBHBBHBSBHBBHBSDO", ".ODSBBHBBHSHBBHBBSDO", ".ODSBBHBBHSHBBHBBSDO", ".ODSBBBHBHSHBHBBBSDO", "..ODSBBHBHSHBHBBSDO.", "..ODSBBHBHSHBHBBSDO.", "..ODSBBBHHSHHBBBSDO.", "...ODSBBHHSHHBBSDO..", "...ODSBBHHSHHBBSDO..", "....ODSBHHSHHBSDO...", "....ODSBBHSHBBSDO...", ".....ODSBHSHBSDO....", "......ODSBSBSDO.....", ".......OSBSBSO......", "........OSSO........", ".........OO........."] } };
  gO.lang_tu_truong_phat = { down: { bx: -4, by: 6, B: ["......................", "..OO..............OO..", ".OSDO............ODSO.", ".OSDO............ODSO.", "OSBDO............ODBSO", "OSBDO............ODBSO", "OSBSDO..........ODSBSO", "OSBSDO..........ODSBSO", "OSBSDO..........ODSBSO", "OSBBSO..........OSBBSO", "OSBBSO..........OSBBSO", "OSBSDO..........ODSBSO", "OSBSDO..........ODSBSO", "OSBSDO..........ODSBSO", "OSSDO............ODSSO", "OSSDO............ODSSO", ".OSO..............OSO.", ".OO................OO."], F: ["....................", "....................", ".......OOOOOO.......", ".....OOBBBBHBOO.....", "....OSBBBBHWHBSO....", "...OSBBBBHWHBOBSO...", "..OSBBBBHWHBBOBBSO..", "..OSBBBHWHBBSOSBBSO.", ".OSBBBHWHBBSODOSBSO.", ".OSBBHWHBBSO..OSBSO.", ".ODSBHHBBSOBO.OSBDO.", ".ODSBOSBOSO.O.OSBDO.", ".ODSO.........OSBDO.", ".ODBO.........OSBDO.", ".ODBO.........OSBDO.", ".ODBO.........OSBDO.", ".OSBSO.......OSBBDO.", ".OSBSO.......OSBBSO.", ".OSBSO........OSBSO.", "OSBHSO........OSHBSO", "OSBHSO........OSHBSO", "OSBHSO........OSHBSO", "OSBHSO........OSHBSO", "OSBHSO........OSHBSO", "OSBBSO........OSBBSO", "OSBSSO........OSSBSO", ".OSOSO........OSOSO.", ".OO.O..........O.OO."] }, side: { fs: [18, 14], F: [".....................", ".....................", "........OOOOOO.......", "......OOBBBBHBOO.....", ".....OSBBBBBHWHBO....", "....OSBBBBBBHWHBSO...", "...OSBBBBBBBBHWHBSO..", "..OSBBBBBBBBBBHWHBSO.", "..OSBBBBBBBBBBBHHBSO.", ".OSBBBBBBBBBBBBBHBSO.", ".OSBBBHBBBBBBBBOSBOO.", ".ODSBBBHBBBBBBOSO.O..", ".ODSBBBBHBBBSO.......", ".ODSBBBBHBBBSO.......", ".ODSBBBBBHBBSO.......", ".ODSBBBBBHBBSO.......", ".ODSBBBBBHBSO........", ".ODSBBBBBHBSO........", ".ODSBBBBBHSO.........", ".ODSBBBBHBSO.........", ".ODSBBBBHBSO.........", ".ODSBBBBHBSO.........", ".ODSBBBHBBSO.........", ".ODSBBBHBBSO.........", ".ODSBBBHBSO..........", ".ODSBBHBBSO..........", ".ODSBBHBBSO..........", ".ODSBBHBSO...........", "..ODSBHBSO...........", "..ODSBHSO............", "..OSOSBSO............", "..O.OSO.O............", ".....O..............."] }, up: { fs: [15, 14], F: ["....................", "....................", ".......OOOOOO.......", ".....OOBBBHBBOO.....", "....OSBBBHWHBBSO....", "...OSBBBHWHWHBBSO...", "..OSBBBHWHBHWHBBSO..", "..OSBBHBBBBBBHBBSO..", ".OSBBHBBBBBBBBHBBSO.", ".OSBBHBBBSBBBBHBBSO.", ".ODSBHBBBSBBBBHBSDO.", ".ODSBBHBBSBBBHBBSDO.", "ODSBBBHBBSBBBHBBBSDO", "ODSBBBHBBBSBBHBBBSDO", "ODSBBBBHBBSBHBBBBSDO", "ODSBBBBHBBSBHBBBBSDO", "ODSBHBBHBBSBHBBHBSDO", "ODSBHBBHBBSBHBBHBSDO", "ODSBHBBBHBSHBBBHBSDO", "ODSBHBBBHBSHBBBHBSDO", "ODSBBHBBHBSHBBHBBSDO", "ODSBBHBBBHSHBBHBBSDO", "ODSBBHBBBHSHBBHBBSDO", "ODSBBBHBBHSHBHBBBSDO", "ODSBBBHBBHSHBHBBBSDO", "ODSBBBHBBHSHBHBBBSO.", ".ODSBBHBBHSHBHBBSDO.", ".ODSBBHBBHSHBHBBSO..", ".ODSBSHBBHSHBHSBSO..", "..ODSOSBBHSHBSOSO...", "..OSO.OSBHSHSO.OO...", "...O...OSBSO...O....", ".........OO........."] } };
  gO.cao_ke_ngoc_quan = { pal: { j: "#69958d", J: "#b9d8ca", i: "#edf0db", g: "#c4ac79", G: "#8c7446", d: "#35595a" }, down: { F: [".......OdddddO......", "...iiiOjJjJjjdOii...", "......OjJiijjdO.....", "......OjjjjjjdO.....", "....OOgGggggGgOO....", "...OSBBBHBBHBBBSO...", "..OSBBBHBBBBHBBBSO..", "..OSBBHBBBBBBHBBSO..", "..ODSHBBBBBBBBHSDO..", "..OSO..........OSO..", "..OSO..........OSO..", "..OSO..........OSO..", "..OSO..........OSO..", "...O............O..."] }, side: { fs: [15, 3], F: [".......OddddddO......", "......iOjJjjjdOii....", ".......OjJijjdO......", "........OjjjdO.......", ".....iOOgGggGgOO.....", ".....iSBBBHBBHBBSO...", "....iSBBBBHBBBBHBSO..", "...iSBBBBBBHBBBBBSO..", "..iSBBHBBBBBBHBBBSO..", "..JDSBBHBBBBBBBHSO...", "..iDSBBBHBBBBBHOO....", "..iDSSBBBBBBSOSO.....", "..iDSBSSO...SO.......", "...JDSSO....SO.......", "...iDSSO....SO.......", "...iSDSO....SO.......", "....iSO......O.......", "....iO...............", "....J................", "....................."] }, up: { fs: [17, 6], F: [".......OdddddO......", "...iiiOddjjjjjOii...", "......OdjjjjjjO.....", "......OdjjJjjjO.....", "....OOgGggggGgOO....", "...OSBBBiBBiBBBSO...", "..OSBBBHiBBiHBBBSO..", "..OSBBHBJBBJBHBBSO..", ".ODSBHBBiBBiBBHBSDO.", ".ODSHBBBiBBiBBBHSDO.", ".ODSBBBBJBBJBBBBSDO.", "..ODSBBBiBBiBBBSDO..", "..ODSSBBiBBiBBSSDO..", "...ODSSBJBBJBSSDO...", "...ODDSSiSSiSSDDO...", "....OODDiSSiDDOO....", "......OOiOOiOO......", "........i..i........", "........J..J........", ".......i....i.......", ".......J....J.......", ".......i....i......."] } };
  gO.ma_tu_tan_phat = { down: { bx: -4, by: 6, B: ["......................", ".OO................OO.", "OSDO..............ODSO", "OSBDO............ODBSO", "OSBDO............ODBSO", "OSBSDO..........ODSBSO", ".OSBDO..........ODBSO.", ".OSBSO..........OSBSO.", "OSBSO............OSBSO", "OSSO..............OSSO", ".OO................OO."], F: [".....O....O.........", "....OBO..OHO...O....", "....OHO.OBHO..OHO...", "..O.OBBOBHBBO.OBO.O.", "..OOSBHBBBHBBOSHOOO.", "...OSBBHBBBHBBBHBSO.", "..OSBBBBHBBBBHBBBSO.", ".OSBHBBBBHBBBBHBBSO.", "OSBBBHBBBBHBBBBHBBSO", "ODSBBBHBBBBHBBBBBSDO", ".ODSBBBBOSBBBOSBBSDO", "ODSBOSBO.OSO..OSBSDO", ".ODBO.........OSBDO.", ".ODBO.........OSBBDO", "OSDBO.........OSBDO.", ".ODBO.........OBBDO.", ".OSBSO.......OSBBSO.", "OSBHSO.......OSHBO..", ".OSHSO........OSBO..", ".OSBO..........OSO..", "OSBO...........OO...", ".OSO................", "..OO................", "..O................."] }, side: { fs: [16, 12], F: ["........O...O........", ".......OBO.OHO.......", "...O...OHOOBHO.O.....", "...OO.OBHBOBBHOOO....", "....OOSBBHBBBBHBOO...", "...OSBBBHBBHBBBBBSO..", "..OSBBHBBBBBBHBBBBSO.", ".OSBBHBBBBBBBBBBHSSO.", "OSSBHBBBBBBBBHBBBSO..", ".ODSBHBBBBBBBBBSSOO..", ".ODSBBHBBBBBBBSOSO...", ".ODSBBHBBBBBBSOO.....", "OSSBBBBHBBBBSO.......", ".ODSBBBHBBBBSO.......", ".ODSBBBBHBBSO........", ".ODSBBBBHBSO.........", "OSSBBBBBHBSO.........", ".ODSBBBBHBSO.........", ".ODSBBBHBSO..........", ".ODSBBBHBSO..........", "OSSBBBHBSO...........", ".OSBBBHBSO...........", ".OSBBSHSO............", "OSSBO.OSO............", ".OSO..OO.............", "..O.................."] }, up: { fs: [14, 12], F: [".....O....O.........", "....OBO..OHO...O....", "....OHO.OBHO..OHO...", "..O.OBBOBHBBO.OBO.O.", "..OOSBBHBBBHBOSBOOO.", "...OSBBBBHBBBBBBBSO.", "..OSBBHBBBBBBHBBBSO.", ".OSBBBHBBBBBBHBBBBSO", ".OSBBBBHBBBBHBBBBBSO", "OSSBBBBHBBBBHBBBBSSO", ".ODSBBBBHBBHBBBBBSDO", ".ODSBBBBHBBHBBBBBSDO", ".ODSBHBBBHHBBBBHBSDO", "OSSBBHBBBHHBBBHBBSSO", ".ODSBBHBBBBBBBHBBSDO", ".ODSBBHBBBBBBHBBBSDO", ".ODSBBBHBBBBHBBBSDO.", "OSSBBBBHBBBHBBBBSSO.", ".ODSBBBBHBHBBBBBSDO.", ".ODSBSBBHBHBBSBSDO..", ".OSBSOSBBHBBSOSBSO..", "OSBSO.OSBHBSO.OSBSO.", ".OSO..OSBHBSO..OSO..", "..O...OSBSBSO...O...", ".......OSOSO........", "........O.O........."] } };
  gO.thanh_van_bien = { pal: { j: "#568d88", J: "#c3e2d7", d: "#2e5257" }, down: { F: ["....................", "....................", "......OOOOOOOO......", "....OOBBHHBBBBOO....", "...OSBHHBBBHHBBSO...", "..OSBHBBBHHBBBHBSO..", "..OSHBBBHBBBBHBBSO..", "..OSBBBHBBBBHBBBSO..", "..ODSBBBBBBBBBBSDO..", "..OSO.....OSO..OSO..", "..OSO......OO..OSO..", "..OO........O...OO.."] }, side: { fs: [20, 16], F: [".....................", ".....................", ".......OOOOOOO.......", ".....OOBBBHHBBOO.....", "....OSBBHHBBBBHSO....", "...OSBHHBBBBHHBBSO...", "..OSBHBBBBHHBBBBSO...", "..OSHBBBHHBBBBBBSO...", "..ODSBBHBBBBBBBHSO...", "..ODSBHBBBBBBBHSO....", "..ODSBBBBBBBBHOO.....", "..ODSSBBBBBBSOSO.....", "..ODSBSSO...SO.......", "...ODSSO....O........", "...ODSSO.............", "...OOjJO.............", "...OSBHO.............", "..OSBBBSO............", "..OBHBSO.............", "..OSBBBSO............", "..OBBHSO.............", "..OSBBBSO............", "..OBHBSO.............", "..OSBBBSO............", "..OBBHSO.............", "..OSBBBSO............", "..OBHBSO.............", "..OSBBSO.............", "..OBHSO..............", "..OdjdO..............", "..OJjjO..............", "..OBHSO..............", "..OSBSO..............", "...OSO...............", "...O................."] }, up: { fs: [16, 16], F: ["....................", "....................", "......OOOOOOOO......", "....OOBBHHBBBBOO....", "...OSBHHBBBBHHBSO...", "..OSBBHBBBBBBHBBSO..", "..OSBHBBBHHBBBHBSO..", ".ODSHBBBHBBHBBBHSDO.", ".ODSBBBHBBBBHBBBSDO.", ".ODSBBHBBBBBBHBBSDO.", "..ODSBBHBBBBHBBSDO..", "..ODSSBBHBBHBBSSDO..", "...ODSSBBHHBBSSDO...", "....ODSSBBBBSSDO....", ".....OOOSBBSOOO.....", "........OjJO........", ".......OSBHSO.......", ".......OBHBBO.......", ".......OSBBHO.......", ".......OBBHSO.......", ".......OSHBBO.......", ".......OBBBHO.......", ".......OSBHSO.......", ".......OBHBBO.......", ".......OSBBHO.......", ".......OBBHSO.......", ".......OSHBBO.......", "........OBHO........", "........OdjO........", "........OJjO........", "........OBHO........", "........OSBO........", ".........OO........."] } };
  gO.tien_tu = { pal: { p: "#d98fa3", P: "#f6d6df", q: "#9c5a6c" }, down: { bx: -4, by: 6, B: ["......................", "..OO..............OO..", ".OSDO............ODSO.", ".OSDO............ODSO.", ".OSBDO..........ODBSO.", ".OSBDO..........ODBSO.", ".OSBSDO........ODSBSO.", ".OSBSDO........ODSBSO.", "OSBBSDO........ODSBBSO", "OSBBSDO........ODSBBSO", "OSBBSDO........ODSBBSO", "OSBBSO..........OSBBSO", "OSBBSO..........OSBBSO", "OSBSDO..........ODSBSO", "OSBSDO..........ODSBSO", "OSBSDO..........ODSBSO", "OSBSDO..........ODSBSO", "OSSDO............ODSSO", ".OSO..............OSO.", ".OO................OO."], F: ["..............qPp...", ".............qPpPq..", ".......OOOOOOOqpq...", ".....OOBBHWWHBOqO...", "....OSBBHWHHWHBBO...", "...OSBBHWHBBHWHBBSO.", "..OSBBHWHBBBBHWHBSO.", "..OSBHWHBBOBBBHWHSO.", ".OSBBHBBBOSOBBBHBSO.", ".ODSBHBBO.S.OBBHBSDO", ".ODSBHBOS...SOBHBSDO", ".ODSHBO.O...O.OHBSDO", ".ODHO.........OSHBDO", ".ODHO.........OSHBDO", ".ODHO.........OSHBDO", ".ODHO.........OSHBDO", ".ODHSO.......OSHBBDO", ".ODHSO.......OSHBBDO", ".OSHBO........OSHBDO", ".OSHBO........OSHBDO", ".OSHBO........OBHSDO", ".OSHBO........OBHSDO", ".OSHSO........OSHSDO", ".OSHSO........OSHSO.", ".OSBSO........OSBSO.", "..OBSO........OSBO..", "..OSO..........OSO..", "..OSO..........OSO..", "...O............O..."] }, side: { fs: [18, 18], F: [".....................", "....qPp..............", "...qPpPq.............", "..OqpPqOOOOO.........", "..OSqqBBHWWHBOO......", "..OSBBBHWHHWHBBBO....", ".OSBBBBBBBHWHBBBSO...", ".OSBBBBBBBBBHWHBBSO..", ".OSBBBBBBBBBBBHHBBSO.", "OSBBBBHBBBBBBBBBHBSO.", "ODSBBBBHBBBBBBBOSBOO.", "ODSBBBBBHBBBBBOSO.O..", "ODSBBBBBHBBBSO.......", "ODSBBBBBHBBBSO.......", "ODSBBBBBBHBBSO.......", "ODSBBBBBBHBBSO.......", "ODSBBBBBBHBSO........", "ODSBBBBBBHBSO........", "ODSBBBBBHBSO.........", "ODSBBBBBHBSO.........", "ODSBBBBHBBSO.........", "ODSBBBBHBBSO.........", "ODSBBBHBBSO..........", "ODSBBBHBBSO..........", "ODSBBHBBBSO..........", "ODSBBHBBSO...........", "ODSBBHBBSO...........", "ODSBHBBBSO...........", ".ODSHBBSO............", ".ODSHBBSO............", ".ODSHBSO.............", "..ODHBSO.............", "..ODSBO..............", "...OSO...............", "....O................"] }, up: { fs: [16, 18], F: ["....................", "....................", "......OOOOOOOO......", "....OOBBHWWHBBOO....", "...OSBBHWHHWHBBSO...", "..OSBBHWHBBHWHBBSO..", "..OSBHBqpPPpqBHBSO..", ".OSBHBqPpqqpPqBHBSO.", ".ODSBBBqpOOpqBBBSDO.", ".ODSBBBBpBBpBBBBSDO.", ".ODSBBHBpBBpBHBBSDO.", "ODSBBBHBqBBqBHBBBSDO", "ODSBBHBBBBBBBBHBBSDO", "ODSBBHBBBSBBBBHBBSDO", "ODSBBBHBBSBBBHBBBSDO", "ODSBBBHBBSBBBHBBBSDO", "ODSBHBBHBBSBHBBHBSDO", "ODSBHBBHBBSBHBBHBSDO", "ODSBHBBBHBSHBBBHBSDO", "ODSBBHBBHBSHBBHBBSDO", "ODSBBHBBBHSHBBHBBSDO", "ODSBBHBBBHSHBBHBBSDO", "ODSBBBHBBHSHBHBBBSDO", "ODSBBBHBBHSHBHBBBSDO", ".ODSBBHBBHSHBHBBSDO.", ".ODSBBHBBHSHBHBBSDO.", ".ODSBBBHBHSHBHBBSDO.", "..ODSBBHBHSHBHBSDO..", "..ODSBBHBHSHBHBSDO..", "...ODSBBHSHBBSDO....", "...ODSBBHSHBBSDO....", "....ODSBBSBBSDO.....", ".....ODSBSBSDO......", "......ODSBSDO.......", ".......ODSDO........", "........OSO.........", ".........O.........."] } };
  var xO = { pal: { k: "#3b3a3f", c: "#9a98a0", C: "#e4e2e8", r: "#8e1b24", R: "#d9403a" }, down: { bx: 1, by: 12, B: ["DDD......DDDD", "DDDD....DDDDD", "DDDD....DDDDD", "DDDD....DDDDD", "DDDD....DDDDD", ".DDD....DDDD."], F: ["..........OOOO.......", ".........OHWBSO......", ".....OOOOOBHBSOOO....", "...OSBHWWHBSBHBSO....", "..OSBHWHBBBSBBHBSO...", ".ODSHWHBBBBSBBBHBSO..", ".ODHHBBSBBBBSBBHBSO..", ".ODHBBBBSBBSBBBBHSO..", ".ODHBBHBBSDSBBHBHSO..", ".ODHBS...R....SBHDO..", ".ODWB....r.....BSDO..", ".ODHB..........HSDO..", ".OSWB..........BHSO..", ".OSHS...........OSDO.", ".OSHS.............OHO", ".OSWS.............OSO", ".OSHB.............OHO", ".OSHB............OSHO", "..OSWO............OO.", "..OSHO..........OWSO.", "..OSHO..........OSHO.", "..OSBO...........OO..", "...OHO..........OWSO.", "...OSO..........OSHO.", "....O...........kCck.", "................kcck.", "................OHSO.", "................OBSO.", "................OHSO.", ".................OSO.", ".................OO.."] }, side: { fs: [18, 18], F: ["....OOOO.............", "...OBHWBO............", "...OSBHBOOOOOO.......", "..OSBBSDDBHHWBOO.....", "..ODSDSBHBBBHHBBOO...", ".ODSBBHBBBHHBBBHSO...", ".ODSBHBBBHHBBBHHBSO..", ".ODSBHBBHHBBBHHBBSO..", ".ODBHBBHBBBBHHBBHSO..", ".ODBHBBHBBBHHBSO.....", ".ODBHBBHBBBHSO.......", ".ODBHBBHBSBHBO.......", ".ODBHBBHBSBHBO.......", ".ODBHBBHBSBHBO.......", ".ODBBHBBHSBHSO.......", ".ODBBHBBHSBHSO.......", ".ODSBHBBHSBHSO.......", ".ODSBHBBHDBHSO.......", ".ODSBBHBHDHSO........", ".ODSBBHBHDHSO........", ".ODSBBHBBDHSO........", ".ODSBBHBBDHO.........", ".ODSBBHBBOSO.........", ".ODSBBHBBSO..........", ".ODSBHBBSO...........", ".ODSBHBBSO...........", ".ODSBHBBSO...........", ".ODSBBHBSO...........", ".ODSBBHBSO...........", "..ODSBHBSO...........", "..ODSBHBSO...........", "..ODSBHSO............", "..ODSBHSO............", "...ODSHSO............", "...ODSSO.............", "....ODSO.............", "....OSO..............", ".....O..............."] }, sideL: { fs: [18, 18], F: ["....OOOO.............", "...OBHWBO............", "...OSBHBOOOOOO.......", "..OSBBSDDBHHWBOO.....", "..ODSDSBHBBBHHBBOO...", ".ODSBBHBBBHHBBBHSO...", ".ODSBHBBBHHBBBHHBSO..", ".ODSBHBBHHBBBHHBBSO..", ".ODBHBBHBBBBHHBBHSO..", ".ODBHBBHBBBHHBSO.....", ".ODBHBBHBBBHSO.......", ".ODBHBBHBBBBSO.......", ".ODBHOWSO............", ".ODBHOSHO............", ".ODBHOOO.............", ".ODBHOWSO............", ".ODBBOSHO............", ".ODSBOOO.............", ".ODSBHOWSO...........", ".ODSBHOSHO...........", ".ODSBBOOO............", ".ODSBBHOWSO..........", ".ODSBBHkCck..........", ".ODSBBHkcck..........", ".ODSBHBOHSO..........", ".ODSBHBOBSO..........", ".ODSBHBOHSO..........", ".ODSBBHBOO...........", ".ODSBBHBSO...........", "..ODSBHBSO...........", "..ODSBHBSO...........", "..ODSBHSO............", "..ODSBHSO............", "...ODSHSO............", "...ODSSO.............", "....ODSO.............", "....OSO..............", ".....O..............."] }, up: { fs: [16, 18], F: ["......OOOO..........", ".....OHWBSO.........", ".....OBHBSOOOOO.....", "...OSBSDDDDSBHBSO...", "..OSBHBSBDDBSBHBSO..", ".ODBHSBSBBSBSHBBBDO.", ".ODHSBHSBBSBBSHBBDO.", ".ODSBHBSHBBSBBSHBDO.", ".ODBHBSBHBBBSBHSBDO.", ".ODHBSBHBBSBBHBSBDO.", ".ODBHBBHBBSBHBBHBDO.", ".ODSBHBBHBSBHBBHBDO.", ".ODSBHBBHBSBHBBHSDO.", ".OOOSBHBBHBSBHBBSDO.", "OWSODSBHBBSBHBBSDO..", "OSHODSBHBBSBHBBSDO..", ".OOODSBHBBSBHBBSDO..", "OWSODSBBHBSBHBBSDO..", "OSHODSBBHBSBHBBSDO..", ".OOODSBBHBSBHBBSDO..", "OWSODSBBHBSBHBBSDO..", "OSHODSBBHBSBHBBSDO..", "kCckDSBBHBSBHBBSDO..", "..ODSBHBBSBHBBBSDO..", "..ODSBHBBSBHBBBSDO..", "..ODSBBHBSBHBBSSDO..", "...ODSBHBSBHBBSDO...", "...ODSBHBSBHBBSDO...", "...ODSBBHSHBBBSDO...", "...ODSBBHSHBBSSDO...", "....ODSBHSHBBSDO....", "....ODSBHSHBBSDO....", "....ODSBBSHBSSDO....", ".....ODSBSHBSDO.....", ".....ODSBSHBSDO.....", "......ODSSBSDO......", ".......ODSSDO.......", "........ODDO........", ".........OO........."] } };
  function DO(a, s, o) {
    if (s.g.female || "xich_ma_toc" !== s.cfg.hair)
      if (s.g.female || "long_tuong_khan" !== s.cfg.hair)
        if (s.g.female || "huan_su_toc" !== s.cfg.hair)
          if (s.g.female || "tho_ren_khan" !== s.cfg.hair)
            if (s.g.female || "toc_truong_mao" !== s.cfg.hair)
              if (s.g.female && "lan_thanh_toc" === s.cfg.hair) {
                !function (S, a, s) {
                  var o = a.head;
                  var i = o.x;
                  var B = o.y;
                  var n = o.w;
                  var O = i + Math.floor(n / 2);
                  var t = 0 | a.p.leg;
                  var h = Fn;
                  var r = Math.min(46, B + o.h + 24);
                  if ("back" !== s) {
                    if (a.g.back) {
                      u(S, [[i - 1, B + 5], [i + 1, B + 1], [i + 4, B - 1], [i + n - 4, B - 1], [i + n, B + 3], [i + n + 1, B + 9], [i + n + 2, B + 14], [i + n + 4, B + 18], [i + n + 2, B + 23], [i + n + 4, B + 27], [i + n + 2, B + 31], [O + 4, B + 34], [O + 1, B + 31], [O - 2, B + 34], [i - 1, B + 31], [i - 3, B + 27], [i - 1, B + 23], [i - 3, B + 18], [i - 1, B + 13]], h.line);
                      u(S, [[i + 1, B + 6], [i + 3, B + 2], [i + 5, B], [i + n - 5, B], [i + n - 1, B + 4], [i + n, B + 10], [i + n + 1, B + 15], [i + n + 2, B + 19], [i + n, B + 24], [i + n + 2, B + 27], [i + n, B + 30], [O + 3, B + 32], [O + 1, B + 29], [O - 2, B + 32], [i, B + 30], [i - 2, B + 27], [i, B + 23], [i - 2, B + 18], [i, B + 13]], h.base);
                      u(S, [[i + 2, B + 8], [i + 5, B + 7], [i + 6, B + 13], [i + 4, B + 18], [i + 5, B + 23], [i + 3, B + 29], [i + 1, B + 30], [i + 1, B + 25], [i + 2, B + 20], [i, B + 15]], h.shade);
                      u(S, [[O - 2, B + 7], [O + 1, B + 7], [O + 2, B + 14], [O, B + 19], [O + 2, B + 25], [O + 1, B + 30], [O - 1, B + 31], [O - 2, B + 25], [O - 1, B + 20], [O - 3, B + 14]], h.deep);
                      e.dot(S, i + 2, B, h.line);
                      e.r(S, i + 2, B + 1, 2, 2, h.base);
                      e.line(S, i + 2, B + 8, i + 3, B + 14, h.hi);
                      e.line(S, i + 3, B + 14, i + 1, B + 20, h.hi2);
                      e.line(S, i + 1, B + 20, i + 3, B + 27, h.hi);
                      e.line(S, i + 5, B + 8, i + 6, B + 14, h.shade);
                      e.line(S, i + n - 4, B + 7, i + n - 2, B + 13, h.hi2);
                      e.line(S, i + n - 2, B + 13, i + n, B + 19, h.shade);
                      e.line(S, i + n, B + 19, i + n - 1, B + 25, h.hi);
                      e.line(S, i + n - 4, B + 17, i + n - 3, B + 23, h.deep);
                      e.line(S, O + 3, B + 9, O + 4, B + 15, h.hi);
                      e.line(S, O + 4, B + 15, O + 2, B + 21, h.shade);
                      e.line(S, O + 2, B + 21, O + 4, B + 28, h.hi2);
                      return void e.line(S, O - 4, B + 10, O - 3, B + 16, h.shade);
                    }
                    if (a.g.side) {
                      u(S, [[i - 2, B + 6], [i - 3, B + 3], [i - 1, B], [i + 2, B - 2], [i + 7, B - 2], [i + 11, B - 1], [i + n - 3, B + 1], [i + n + 1, B + 4], [i + n + 1, B + 7], [i + n - 2, B + 6], [i + n - 5, B + 4], [i + 6, B + 5], [i + 3, B + 7]], h.line);
                      u(S, [[i - 1, B + 4], [i, B + 1], [i + 3, B - 1], [i + 7, B - 1], [i + 11, B], [i + n - 3, B + 2], [i + n, B + 4], [i + n - 1, B + 5], [i + n - 5, B + 3], [i + 6, B + 4], [i + 3, B + 6]], h.base);
                      e.line(S, i + 2, B + 2, i + 7, B, h.hi);
                      e.line(S, i + 7, B, i + 12, B + 1, h.shade);
                      e.line(S, i + 11, B + 1, i + n - 3, B + 3, h.hi2);
                      u(S, [[i + 8, B + 2], [i + 12, B + 1], [i + n - 2, B + 3], [i + n, B + 5], [i + n - 3, B + 5], [i + n - 6, B + 4], [i + 9, B + 4]], h.deep);
                      e.line(S, i + 11, B + 2, i + n - 4, B + 4, h.hi);
                      u(S, [[i + 1, B + 3], [i + 5, B + 4], [i + 7, B + 7], [i + 6, B + 11], [i + 7, B + 14], [i + 5, B + 18], [i + 3, B + 21], [i + 1, B + 19], [i + 2, B + 15], [i + 1, B + 11], [i + 2, B + 7]], h.line);
                      u(S, [[i + 2, B + 5], [i + 4, B + 5], [i + 5, B + 8], [i + 4, B + 11], [i + 5, B + 14], [i + 4, B + 17], [i + 3, B + 19], [i + 2, B + 16], [i + 3, B + 12], [i + 2, B + 9]], h.base);
                      e.line(S, i + 3, B + 6, i + 4, B + 10, h.hi);
                      e.line(S, i + 4, B + 10, i + 3, B + 15, h.hi2);
                      e.line(S, i + 5, B + 8, i + 5, B + 12, h.shade);
                      u(S, [[i - 2, B + 7], [i + 1, B + 5], [i + 2, B + 10], [i, B + 15], [i - 2, B + 19], [i - 4, B + 17]], h.deep);
                      e.line(S, i, B + 9, i - 2, B + 16, h.hi);
                      return void e.line(S, i + 1, B + 8, i + 2, B + 12, h.shade);
                    }
                    u(S, [[i - 1, B + 6], [i - 2, B + 3], [i, B], [i + 3, B - 2], [i + 6, B - 2], [O - 2, B - 2], [O, B - 3], [O + 2, B - 2], [i + n - 6, B - 2], [i + n - 3, B], [i + n, B + 3], [i + n + 1, B + 6], [i + n - 1, B + 8], [i + n - 3, B + 6], [O + 2, B + 5], [O, B + 7], [O - 2, B + 5], [i + 2, B + 7]], h.line);
                    u(S, [[i, B + 4], [i, B + 2], [i + 3, B - 1], [i + 6, B - 1], [O - 2, B - 1], [O, B - 2], [O + 2, B - 1], [i + n - 6, B - 1], [i + n - 3, B + 1], [i + n, B + 4], [i + n - 1, B + 6], [O + 2, B + 4], [O, B + 6], [O - 2, B + 4], [i + 2, B + 6]], h.base);
                    u(S, [[i + 3, B + 1], [i + 6, B], [O - 2, B + 1], [O - 4, B + 4], [O - 6, B + 5], [O - 5, B + 3], [i + 7, B + 3]], h.deep);
                    u(S, [[O + 1, B + 1], [i + n - 6, B], [i + n - 3, B + 2], [i + n - 4, B + 4], [O + 3, B + 5], [O + 4, B + 3]], h.shade);
                    e.line(S, i + 3, B + 2, O - 4, B + 2, h.hi);
                    e.line(S, O + 2, B + 1, i + n - 5, B + 2, h.hi2);
                    e.line(S, O - 4, B + 4, O - 6, B + 5, h.hi);
                    e.line(S, O + 3, B + 4, i + n - 4, B + 5, h.hi);
                    u(S, [[i - 2, B + 5], [i + 1, B + 4], [i + 3, B + 8], [i + 2, B + 12], [i + 1 + t, B + 16], [i - 1 + t, B + 19], [i - 3 + t, B + 21], [i - 4 + t, B + 19], [i - 2 + t, B + 15], [i - 3, B + 11]], h.deep);
                    u(S, [[i - 1, B + 7], [i + 1, B + 6], [i + 2, B + 9], [i + 1, B + 12], [i + t, B + 16], [i - 2 + t, B + 19], [i - 3 + t, B + 18], [i - 1 + t, B + 15], [i - 2, B + 11]], h.base);
                    e.line(S, i, B + 8, i + 1, B + 11, h.hi);
                    e.line(S, i + 1, B + 11, i - 1 + t, B + 16, h.hi2);
                    e.line(S, i - 1 + t, B + 16, i - 3 + t, B + 18, h.hi);
                    Tn(S, i - 3 + t, B + 21);
                    u(S, [[i + n - 3, B + 5], [i + n, B + 4], [i + n + 2, B + 7], [i + n + 3, B + 11], [i + n + 2 - t, B + 15], [i + n + 3 - t, B + 18], [i + n + 1 - t, B + 20], [i + n - 1, B + 18], [i + n - 1 + t, B + 15], [i + n, B + 12]], h.line);
                    u(S, [[i + n - 2, B + 7], [i + n, B + 6], [i + n + 1, B + 9], [i + n + 2, B + 11], [i + n + 1 - t, B + 15], [i + n + 2 - t, B + 18], [i + n - t, B + 17], [i + n - 2 + t, B + 15], [i + n - 1, B + 11]], h.shade);
                    e.line(S, i + n - 1, B + 8, i + n + 1, B + 11, h.hi2);
                    e.line(S, i + n + 1, B + 11, i + n - t, B + 15, h.hi);
                    e.line(S, i + n - t, B + 15, i + n + 1 - t, B + 17, h.hi2);
                    Tn(S, i + n + 1 - t, B + 20);
                  }
                  else {
                    if (a.g.back) {
                      return;
                    }
                    if (a.g.side) {
                      var d = Math.min(46, B + o.h + 25);
                      u(S, [[i - 2, B + 5], [i + 3, B + 5], [i + 6, B + 9], [i + 5, B + 15], [i + 7 + t, B + 21], [i + 5 + t, d - 4], [i + 2 + t, d], [i - 2 + t, d - 2], [i - 6 + t, d - 6], [i - 5 + t, d - 10], [i - 7, B + 18], [i - 5, B + 11]], h.line);
                      u(S, [[i - 1, B + 7], [i + 2, B + 7], [i + 4, B + 10], [i + 3, B + 16], [i + 5 + t, d - 5], [i + 2 + t, d - 2], [i + t, d - 5], [i - 2 + t, d - 8], [i - 3 + t, d - 11], [i - 3, B + 16]], h.base);
                      u(S, [[i - 3, B + 12], [i, B + 10], [i + 1, B + 15], [i - 1 + t, d - 7], [i - 3 + t, d - 4], [i - 5 + t, d - 8]], h.deep);
                      e.line(S, i + 1, B + 9, i + 2, B + 16, h.hi);
                      e.line(S, i + 2, B + 16, i + 4 + t, d - 7, h.hi2);
                      e.line(S, i - 2, B + 16, i - 3 + t, d - 9, h.shade);
                      e.line(S, i + 4, B + 12, i + 5 + t, d - 9, h.deep);
                    }
                    else {
                      var l = r;
                      u(S, [[i + 1, B + 6], [i + 6, B + 6], [i + 7, B + 12], [i + 5, B + 18], [i + 3 + t, l - 5], [i - 1 + t, l], [i - 5 + t, l - 3], [i - 4 + t, l - 8], [i - 2, B + 18], [i - 2, B + 11]], h.line);
                      u(S, [[i + 2, B + 8], [i + 5, B + 8], [i + 5, B + 14], [i + 3 + t, B + 20], [i + 1 + t, l - 4], [i - 2 + t, l - 2], [i - 2 + t, l - 7], [i, B + 18]], h.base);
                      e.line(S, i + 3, B + 9, i + 4, B + 15, h.hi);
                      e.line(S, i + 4, B + 15, i + 1 + t, l - 6, h.hi2);
                      e.line(S, i + 1, B + 16, i - 1 + t, l - 7, h.shade);
                      u(S, [[i + n - 6, B + 6], [i + n - 1, B + 6], [i + n + 2, B + 11], [i + n + 1, B + 18], [i + n + 4 - t, l - 7], [i + n + 5 - t, l - 3], [i + n + 1 - t, l], [i + n - 2 - t, l - 5], [i + n - 3, B + 18], [i + n - 4, B + 12]], h.line);
                      u(S, [[i + n - 5, B + 8], [i + n - 2, B + 8], [i + n, B + 12], [i + n - 1, B + 18], [i + n + 2 - t, l - 5], [i + n + 2 - t, l - 2], [i + n - t, l - 5], [i + n - 4, B + 18]], h.base);
                      e.line(S, i + n - 4, B + 10, i + n - 2, B + 16, h.shade);
                      e.line(S, i + n - 2, B + 16, i + n + 1 - t, l - 7, h.hi);
                    }
                  }
                }(a, s, o);
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
                                          var o = a.head;
                                          var i = o.x;
                                          var B = o.y;
                                          var n = o.w;
                                          var O = i + Math.floor(n / 2);
                                          var t = "#21130f";
                                          var h = "#321f18";
                                          var r = "#4a2c1f";
                                          var d = "#69432a";
                                          var l = "#90603a";
                                          var f = "#b4774c";
                                          var c = "#55b89a";
                                          var b = "#b7f3d3";
                                          if (!a.g.side && !a.g.back && "back" !== s) {
                                            u(S, [[O - 4, B - 1], [O - 5, B - 3], [O - 4, B - 7], [O - 2, B - 9], [O + 2, B - 9], [O + 4, B - 7], [O + 5, B - 3], [O + 4, B - 1]], t);
                                            u(S, [[O - 4, B - 2], [O - 4, B - 6], [O - 2, B - 8], [O + 2, B - 8], [O + 4, B - 6], [O + 4, B - 3], [O + 3, B - 2]], d);
                                            e.r(S, O - 2, B - 7, 4, 2, l);
                                            e.r(S, O - 1, B - 8, 3, 1, f);
                                            e.dot(S, O + 3, B - 5, r);
                                            e.dot(S, O - 4, B - 4, h);
                                            u(S, [[i - 2, B + 7], [i - 2, B + 3], [i - 1, B + 1], [i + 1, B - 2], [i + 5, B - 4], [i + n - 5, B - 4], [i + n - 1, B - 2], [i + n + 1, B + 1], [i + n + 2, B + 4], [i + n + 1, B + 8], [i + n - 2, B + 10], [i + 1, B + 10]], t);
                                            u(S, [[i, B + 5], [i + 1, B + 1], [i + 5, B - 2], [i + n - 5, B - 2], [i + n - 1, B], [i + n, B + 3], [i + n, B + 6], [i + n - 2, B + 8], [i + 1, B + 8]], d);
                                            e.line(S, O, B - 2, O - 2, B + 4, l);
                                            e.line(S, O + 1, B - 2, O + 4, B + 3, r);
                                            e.line(S, i + 2, B + 1, O - 2, B - 2, f);
                                            e.line(S, i + 3, B + 2, O - 1, B + 1, l);
                                            e.line(S, O + 2, B - 1, i + n - 2, B + 2, r);
                                            e.line(S, O + 3, B, i + n - 2, B + 4, l);
                                            u(S, [[i - 2, B + 7], [i + 2, B + 7], [i + 2, B + 12], [i + 1, B + 12], [i + 1, B + 18], [i + 2, B + 19], [i + 1, B + 25], [i - 1, B + 28], [i - 3, B + 26], [i - 3, B + 20], [i - 2, B + 14]], r);
                                            u(S, [[i + n - 2, B + 7], [i + n + 1, B + 7], [i + n + 2, B + 14], [i + n + 1, B + 20], [i + n + 1, B + 26], [i + n - 1, B + 28], [i + n - 3, B + 25], [i + n - 2, B + 19], [i + n - 3, B + 17], [i + n - 3, B + 11]], t);
                                            u(S, [[i, B + 8], [i + 2, B + 9], [i + 1, B + 16], [i + 2, B + 19], [i, B + 25], [i - 1, B + 26], [i - 1, B + 19], [i, B + 14]], d);
                                            u(S, [[i + n - 2, B + 8], [i + n, B + 9], [i + n, B + 15], [i + n - 1, B + 20], [i + n - 2, B + 26], [i + n - 3, B + 24], [i + n - 2, B + 18], [i + n - 3, B + 13]], l);
                                            e.line(S, i - 1, B + 10, i - 2, B + 17, l);
                                            e.line(S, i - 1, B + 18, i, B + 25, f);
                                            e.line(S, i + n, B + 10, i + n + 1, B + 16, r);
                                            e.line(S, i + n, B + 18, i + n - 1, B + 24, d);
                                            e.dot(S, i - 2, B + 24, l);
                                            e.dot(S, i + n - 1, B + 25, f);
                                            u(S, [[i + 3, B + 5], [i + n - 3, B + 5], [i + n - 3, B + 8], [i + n - 5, B + 9], [i + 5, B + 9], [i + 3, B + 8]], d);
                                            e.line(S, i + 3, B + 7, i + n - 4, B + 7, f);
                                            for (var G = 0; G < 5; G++)
                                              e.r(S, i + 3 + 2 * G, B + 8, 1, 2, G % 2 ? r : h), 1 !== G && 3 !== G || e.dot(S, i + 3 + 2 * G, B + 10, l);
                                            e.r(S, O - 6, B - 1, 12, 2, t);
                                            e.line(S, O - 5, B - 1, O + 5, B - 1, b);
                                            e.r(S, O - 2, B - 3, 5, 2, "#287b70");
                                            e.r(S, O - 1, B - 3, 3, 1, b);
                                            e.dot(S, O + 2, B - 2, c);
                                            e.dot(S, O - 5, B, c);
                                            e.dot(S, O + 5, B, b);
                                          }
                                        }(a, s, o);
                                      }
                                      else if (s.g.female && "tong_ngoc_y" === s.cfg.outfit) {
                                        !function (S, a, s) {
                                          var o = a.head;
                                          var i = o.x;
                                          var B = o.y;
                                          var n = o.w;
                                          var O = i + Math.floor(n / 2);
                                          var t = 0 | a.p.leg;
                                          var h = "#21191a";
                                          var r = "#332625";
                                          var d = "#503a32";
                                          var l = "#40302c";
                                          var f = "#795648";
                                          var c = Math.min(47, B + o.h + 24);
                                          if (a.g.side) {
                                            var b = i - 2 + t;
                                            return "back" === s ? (u(S, [[i, B + 4], [i + 6, B + 6], [i + 5, B + 20], [i + 4 + t, c - 3], [b, c], [i - 3 + t, c - 7], [i - 3, B + 17]], h), u(S, [[i + 1, B + 7], [i + 4, B + 8], [i + 3, B + 21], [i + 2 + t, c - 4], [b, c - 2], [i - 2, B + 17]], d), void e.line(S, i, B + 13, i - 1 + t, c - 6, f)) : (u(S, [[i - 2, B + 6], [i, B + 1], [i + 5, B - 2], [i + n - 3, B - 2], [i + n - 1, B], [i + n, B + 3], [i + n, B + 5], [i + n - 2, B + 7], [i + 7, B + 3], [i + 4, B + 7], [i + 3, B + 14], [i - 1, B + 17]], r), e.line(S, i + 5, B, i + 1, B + 6, f), e.line(S, i + 6, B, i + 10, B + 3, d), u(S, [[i, B + 9], [i + 3, B + 10], [i + 3, B + 21], [i + 1 + t, c - 5], [i - 1 + t, c - 3], [i - 1, B + 19]], d), e.line(S, i, B + 14, i + t, c - 7, f), e.line(S, i + 2, B + 16, i + 1 + t, c - 5, r), e.r(S, i + 3, B - 3, 5, 2, "#cbd9e0"), e.r(S, i + 4, B - 4, 3, 2, "#f2f4ee"), e.dot(S, i + 5, B - 5, "#f2f4ee"), e.dot(S, i + 6, B - 3, "#73a8bb"), u(S, [[i + 1, B + 10], [i - 2, B + 9], [i - 2, B + 12], [i, B + 14], [i + 2, B + 12]], "#dce9ed"), e.dot(S, i + 1, B + 11, "#73a8bb"), void e.dot(S, i - 1, B + 10, "#f2f4ee"));
                                          }
                                          if ("back" !== s) {
                                            u(S, [[i - 1, B + 5], [i + 1, B], [O, B - 2], [i + n - 2, B], [i + n + 1, B + 6], [i + n - 1, B + 9], [O, B + 3], [i + 1, B + 9]], r);
                                            e.line(S, O - 1, B, O - 4, B + 5, f);
                                            e.line(S, O + 1, B, O + 4, B + 5, f);
                                            e.line(S, O - 2, B + 2, i, B + 8, d);
                                            e.line(S, O + 2, B + 2, i + n, B + 8, d);
                                            if (a.g.back) {
                                              u(S, [[i, B + 4], [i + n, B + 4], [i + n + 1, B + 17], [i + n + t, c - 5], [O + 2 + t, c], [O - 2 + t, c - 2], [i + t, c - 5], [i - 1, B + 18]], h);
                                              u(S, [[i + 1, B + 5], [i + n - 1, B + 5], [i + n, B + 17], [i + n - 1 + t, c - 6], [O + 2 + t, c - 2], [i + 1 + t, c - 6], [i, B + 18]], d);
                                              e.line(S, O, B + 4, O - 1, B + 16, r);
                                              e.line(S, O - 1, B + 16, O + t, c - 3, r);
                                              e.line(S, i + 3, B + 7, i + 2, B + 22, f);
                                              e.line(S, i + 2, B + 22, i + 3 + t, c - 7, l);
                                              e.line(S, i + n - 3, B + 7, i + n - 2, B + 22, l);
                                              e.line(S, i + n - 2, B + 22, i + n - 3 + t, c - 6, f);
                                            }
                                            else {
                                              e.fatLine(S, i, B + 7, i + 1, B + 18, 2, r);
                                              e.fatLine(S, i + n - 1, B + 7, i + n - 2, B + 19, 2, d);
                                            }
                                            e.r(S, O - 3, B - 3, 7, 2, "#cbd9e0");
                                            e.r(S, O - 2, B - 4, 2, 2, "#f2f4ee");
                                            e.r(S, O + 1, B - 4, 2, 2, "#f2f4ee");
                                            e.dot(S, O, B - 5, "#f2f4ee");
                                            e.dot(S, O, B - 3, "#73a8bb");
                                            for (var G = -1; G <= 1; G += 2)
                                              if (!a.g.side || -1 !== G) {
                                                var H = G < 0 ? i - 2 : i + n + 1;
                                                var g = B + 10;
                                                u(S, [[H, g], [H + 2 * G, g - 1], [H + 2 * G, g + 2], [H + G, g + 4], [H - G, g + 2]], "#dce9ed");
                                                e.dot(S, H, g + 1, "#73a8bb");
                                                e.dot(S, H + G, g, "#f2f4ee");
                                              }
                                          }
                                          else {
                                            if (a.g.back) {
                                              return;
                                            }
                                            u(S, [[i, B + 5], [i + n, B + 5], [i + n + 1, B + 16], [i + n + 2 + t, c - 5], [i + n - 2 + t, c], [i + 3, c - 3], [i - 2, B + 18]], h);
                                            u(S, [[i + 1, B + 7], [i + n - 1, B + 7], [i + n, B + 19], [i + n + t, c - 5], [i + n - 3 + t, c - 2], [i + 2, c - 5], [i - 1, B + 18]], d);
                                            for (var x = 0; x < 3; x++)
                                              e.line(S, i + 2 + 4 * x, B + 13, i + 2 + 4 * x + t, c - 5, 1 === x ? f : r);
                                          }
                                        }(a, s, o);
                                      }
                                      else if (s.g.female && "xich_diem_toc" === s.cfg.hair) {
                                        !function (e, a, s) {
                                          var o = xO;
                                          var i = a.head;
                                          var B = i.x;
                                          var n = i.y;
                                          var O = a.g.side;
                                          var t = a.g.back;
                                          var h = O ? Oo(a) ? o.sideL : o.side : t ? o.up : o.down;
                                          var r = bO(S.Palette.pick("HAIR", a.cfg.hairColor, "hac"), o.pal);
                                          var d = a.p.sit ? 0 : O ? Us(a) : qs(a);
                                          var l = a.p.sit ? 61 : 60;
                                          if ("back" !== s) {
                                            Na(e, B + (O ? -6 : -3), n - 5, h.F, r, !1, h.fs ? Rs(d, h.fs[0], h.fs[1]) : null, HO(a, l));
                                          }
                                          else {
                                            if (h.B) {
                                              Na(e, B + h.bx, n + h.by, h.B, r, !1, null, function (S, e) {
                                                return e > l;
                                              });
                                            }
                                          }
                                        }(a, s, o);
                                      }
                                      else {
                                        var i = s.head;
                                        var B = S.Palette.pick("HAIR", s.cfg.hairColor, "hac");
                                        var n = i.x;
                                        var O = i.y;
                                        var t = i.w;
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
                                                      if ("back" === o) {
                                                        if (h || "ma_vi" === r) {
                                                          var l = s.g.side ? n - 3 : n + 3;
                                                          var f = s.g.side ? 5 : t - 6;
                                                          var c = O + 8;
                                                          var b = h ? 27 : 19;
                                                          u(a, [[l, c], [l + f, c], [l + f + d, c + b - 4], [l + f - 2 + d, c + b], [l + 1 + d, c + b - 2], [l - 1, c + 7]], B.deep);
                                                          e.fatLine(a, l + 2, c + 2, l + 2 + d, c + b - 4, 2, B.base);
                                                          e.line(a, l + 3, c + 3, l + 3 + d, c + b - 7, B.hi);
                                                        }
                                                        if (h) {
                                                          M(a, n, O + 6, 2, 15, B);
                                                          M(a, n + t - 2, O + 6, 2, 15, B);
                                                        }
                                                        return void ("smith_shaggy" === r && (e.r(a, n - 2, O + 5, 3, 10, B.deep), e.r(a, n + t - 1, O + 5, 3, 9, B.base), e.dot(a, n - 2, O + 14, B.line), e.dot(a, n + t, O + 14, B.shade)));
                                                      }
                                                      if (s.g.back && (h || "ma_vi" === r) && DO(a, s, "back"), u(a, [[n - 1, O + 4], [n + 1, O - 1], [n + 4, O - 2], [n + t - 4, O - 2], [n + t, O + 1], [n + t + 1, O + 5], [n + t - 1, O + 6], [n, O + 6]], B.base), e.r(a, n, O + 1, 2, 4, B.deep), e.r(a, n + 2, O, 3, 2, B.shade), e.r(a, n + t - 6, O - 1, 4, 1, B.hi), e.r(a, n + t - 4, O, 2, 2, B.hi2 || B.hi), s.g.back) {
                                                        u(a, [[n, O + 4], [n + t, O + 4], [n + t - 1, O + 12], [n + t - 4, O + 15], [n + 3, O + 15], [n, O + 11]], B.base);
                                                        e.r(a, n + 1, O + 5, 2, 7, B.deep);
                                                        e.r(a, n + t - 4, O + 4, 2, 7, B.hi);
                                                        e.line(a, n + 4, O + 8, n + 6, O + 14, B.shade);
                                                      }
                                                      else {
                                                        for (var x = 0; x < t; x++) {
                                                          var D = H.fringe[x % H.fringe.length];
                                                          if (x > 1 && x < t - 2) {
                                                            D = Math.min(3, D);
                                                          }
                                                          e.r(a, n + x, O + 2, 1, D, x < 3 ? B.deep : B.base);
                                                          if (x % 3 == 0) {
                                                            e.dot(a, n + x, O + D + 1, B.shade);
                                                          }
                                                        }
                                                        if (h || (u(a, [[n + 5, O + 2], [n + 8, O + 2], [n + 6, O + 7], [n + 5, O + 7]], B.deep), e.line(a, n + 6, O + 2, n + 5, O + 5, B.hi), e.dot(a, n + 3, O + 4, B.hi)), s.g.side) {
                                                          if (u(a, [[n - 2, O + 6], [n + 1, O + 2], [n + 3, O + 5], [n + 3, O + 8], [n + 2, O + 13], [n - 1, O + 15], [n - 3, O + 11]], B.base), e.r(a, n - 2, O + 7, 2, 7, B.deep), e.line(a, n + 1, O + 5, n + 1, O + 11, B.shade), e.dot(a, n + 2, O + 4, B.hi), e.dot(a, n - 1, O + 14, B.deep), u(a, [[n + 6, O + 1], [n + 8, O + 2], [n + 8, O + 4], [n + 7, O + 6], [n + 6, O + 7], [n + 6, O + 2]], B.base), e.r(a, n + 6, O + 3, 1, 4, B.shade), e.dot(a, n + 6, O + 7, B.deep), e.dot(a, n + 7, O + 2, B.hi), e.dot(a, n + 2, O + 5, B.base), h || "ma_vi" === r) {
                                                            var W = h ? 27 : 22;
                                                            var J = d > 0 ? 1 : d < 0 ? -1 : 0;
                                                            u(a, [[n - 2, O + 5], [n + 2, O + 2], [n + 6, O + 2], [n + 7, O + 4], [n + 7, O + 9], [n + 6, O + 13], [n + 5, O + 17], [n + 5 + J, O + W - 3], [n + 3 + J, O + W], [n + J, O + W - 1], [n - 2, O + W - 6], [n - 3, O + 11]], B.deep);
                                                            u(a, [[n - 1, O + 6], [n + 2, O + 3], [n + 5, O + 3], [n + 6, O + 5], [n + 6, O + 9], [n + 5, O + 13], [n + 4, O + 17], [n + 4 + J, O + W - 4], [n + 2 + J, O + W - 2], [n + J, O + W - 3], [n - 1, O + W - 8], [n - 2, O + 11]], B.base);
                                                            e.r(a, n + 6, O + 6, 1, 6, B.shade);
                                                            e.line(a, n + 3, O + 4, n + 5, O + 11, B.hi);
                                                            e.line(a, n + 1, O + 9, n + 1 + J, O + W - 6, B.shade);
                                                            e.line(a, n + 3, O + 14, n + 3 + J, O + W - 4, B.hi);
                                                            e.dot(a, n + 2 + J, O + W - 1, B.shade);
                                                            e.dot(a, n + 5 + J, O + W - 3, B.deep);
                                                          }
                                                        }
                                                        else if (h || "ma_vi" === r) {
                                                          var w = h ? 21 : 16;
                                                          u(a, [[n - 2, O + 4], [n + 2, O + 4], [n + 2, O + 9], [n + 1, O + w - 4], [n, O + w], [n - 2, O + w - 2], [n - 3, O + 10]], B.deep);
                                                          u(a, [[n - 1, O + 5], [n + 1, O + 5], [n + 1, O + 10], [n, O + w - 3], [n - 1, O + w - 4], [n - 2, O + 10]], B.shade);
                                                          e.line(a, n, O + 6, n, O + w - 5, B.base);
                                                          u(a, [[n + t - 2, O + 4], [n + t + 2, O + 4], [n + t + 3, O + 10], [n + t + 2, O + w - 2], [n + t, O + w], [n + t - 1, O + w - 4], [n + t - 2, O + 9]], B.base);
                                                          u(a, [[n + t - 1, O + 5], [n + t + 1, O + 5], [n + t + 2, O + 10], [n + t + 1, O + w - 4], [n + t, O + w - 3], [n + t - 1, O + 10]], B.hi);
                                                          e.line(a, n + t, O + 7, n + t, O + w - 5, B.base);
                                                          e.dot(a, n - 1, O + w - 1, B.deep);
                                                          e.dot(a, n + t + 1, O + w - 1, B.shade);
                                                        }
                                                        else {
                                                          e.r(a, n - 1, O + 5, 2, 5, B.shade);
                                                          e.r(a, n + t - 1, O + 5, 2, 4, B.base);
                                                        }
                                                      }
                                                      if ("smith_shaggy" === r) {
                                                        u(a, [[n - 1, O + 1], [n + 1, O - 4], [n + 4, O - 2], [n + 7, O - 5], [n + 10, O - 2], [n + t - 2, O - 4], [n + t + 1, O + 1]], B.deep);
                                                        e.line(a, n + 1, O - 3, n + 4, O - 1, B.hi);
                                                        e.line(a, n + 8, O - 4, n + 10, O - 2, B.base);
                                                        e.r(a, n - 2, O + 5, 2, 9, B.deep);
                                                        e.r(a, n + t, O + 5, 2, 8, B.base);
                                                        e.dot(a, n - 2, O + 14, B.line);
                                                        e.dot(a, n + t + 1, O + 13, B.deep);
                                                      }
                                                      if (h || "dao_ke" === r) {
                                                        M(a, n + 4, O - 5, 7, 4, B);
                                                        e.r(a, n + 5, O - 5, 4, 1, B.hi);
                                                        e.r(a, n + 4, O - 2, 7, 1, G.metal.shade);
                                                        if ("tieu_thanh" === r) {
                                                          e.r(a, n + 6, O - 8, 4, 2, G.metal.base);
                                                          e.r(a, n + 8, O - 10, 4, 2, G.metal.hi);
                                                          e.r(a, n + 10, O - 9, 3, 1, G.metal.shade);
                                                          e.dot(a, n + 6, O - 9, G.metal.hi);
                                                          e.dot(a, n + 12, O - 10, G.metal.base);
                                                        }
                                                      }
                                                      else {
                                                        if ("ma_vi" === r) {
                                                          M(a, s.g.side ? n - 2 : n + 4, O - 2, 5, 4, B);
                                                          e.r(a, s.g.side ? n - 1 : n + 4, O + 1, 4, 1, G.metal.base);
                                                        }
                                                        else {
                                                          e.r(a, n - 1, O + 1, 2, 2, B.deep);
                                                          e.dot(a, n + t, O, B.base);
                                                        }
                                                      }
                                                    }
                                                    else {
                                                      !function (S, e, a, s, o) {
                                                        var i = gO[s];
                                                        var B = e.head;
                                                        var n = B.x;
                                                        var O = B.y;
                                                        var t = e.g.side;
                                                        var h = e.g.back;
                                                        var r = t ? i.side : h ? i.up : i.down;
                                                        var d = bO(o, i.pal);
                                                        var l = e.p.sit ? 0 : t ? Us(e) : qs(e);
                                                        var f = e.p.sit ? 61 : i.lim || 60;
                                                        if ("back" !== a) {
                                                          Na(S, n + (t ? -6 : -3), O - 5, r.F, d, !1, r.fs ? Rs(l, r.fs[0], r.fs[1]) : null, HO(e, f));
                                                        }
                                                        else {
                                                          if (r.B) {
                                                            Na(S, n + r.bx, O + r.by, r.B, d, !1, r.bs ? Rs(l, r.bs[0], r.bs[1]) : null, function (S, e) {
                                                              return e > f;
                                                            });
                                                          }
                                                        }
                                                      }(a, s, o, h ? "tien_tu" : gO[r] && "tien_tu" !== r ? r : "dao_dong", B);
                                                    }
                                                  else {
                                                    !function (S, a, s) {
                                                      var o = a.head;
                                                      var i = o.x;
                                                      var B = o.y;
                                                      var n = o.w;
                                                      var O = i + Math.floor(n / 2);
                                                      var t = 2 * i + n - 1;
                                                      var h = Hn;
                                                      var r = (g.dai_phu_bao || G).accent;
                                                      var d = 0 | a.p.leg;
                                                      if ("back" !== s) {
                                                        if (a.g.side) {
                                                          tO(S, [[i - 2, B + 6], [i - 1, B + 1], [i + 2, B - 1], [i + n - 3, B - 1], [i + n, B + 2], [i + n, B + 4], [i + n - 4, B + 3], [i + 6, B + 4], [i + 6, B + 10], [i + 4, B + 16], [i + 3, B + 24], [i + d, B + 26], [i - 2, B + 18]], h.base, h.shade);
                                                          e.line(S, i + 1, B + 2, i + n - 4, B + 1, h.hi);
                                                          e.line(S, i + 2, B + 6, i + 1, B + 20, h.hi);
                                                          e.line(S, i + 4, B + 8, i + 2, B + 22, h.shade);
                                                          e.r(S, i + n - 6, B + 5, 4, 1, h.hi);
                                                          e.dot(S, i + n - 6, B + 6, h.base);
                                                          return void Wn(S, i + 5, B, r, !0);
                                                        }
                                                        if (a.g.back) {
                                                          tO(S, hO([[i + 2, B - 1], [i - 1, B + 2], [i - 1, B + 8], [i - 2, B + 14], [i - 1, B + 24], [i + 2 + d, B + 30], [i + 6, B + 31]], t), h.base, h.shade);
                                                          for (var l = 0; l < 4; l++) {
                                                            var f = i + 2 + 3 * l;
                                                            e.line(S, f, B + 1, f + (l < 2 ? -1 : 1) + d, B + 24 + l % 2 * 4, l % 2 ? h.shade : h.hi);
                                                          }
                                                          Wn(S, O, B, r, !1);
                                                        }
                                                        else {
                                                          tO(S, hO([[i + 6, B - 1], [i + 2, B - 1], [i - 1, B + 2], [i - 1, B + 6], [i + 1, B + 4], [i + 4, B + 2], [i + 6, B + 2]], t), h.base, h.shade);
                                                          e.line(S, O, B - 1, O, B + 2, h.shade);
                                                          e.line(S, i + 1, B + 2, i + 5, B, h.hi);
                                                          e.line(S, t - (i + 1), B + 2, t - (i + 5), B, h.base);
                                                          for (var c = [[i - 1, B + 4], [i + 1, B + 5], [i + 1, B + 13], [i + 2, B + 18], [i + 1, B + 22], [i - 1, B + 20], [i - 2, B + 12]], b = [], H = 0; H < c.length; H++)
                                                            b.push([t - c[H][0], c[H][1]]);
                                                          tO(S, c, h.base, h.shade);
                                                          tO(S, b, h.shade, h.deep);
                                                          e.line(S, i, B + 6, i, B + 18, h.hi);
                                                          e.r(S, i + 1, B + 5, 4, 1, h.hi);
                                                          e.dot(S, i + 1, B + 6, h.base);
                                                          e.r(S, i + 8, B + 5, 4, 1, h.hi);
                                                          e.dot(S, i + 11, B + 6, h.base);
                                                          Wn(S, O, B, r, !1);
                                                        }
                                                      }
                                                      else {
                                                        if (a.g.side) {
                                                          tO(S, [[i + 3, B + 4], [i - 2, B + 6], [i - 3, B + 16], [i - 2 + d, B + 30], [i + 2 + d, B + 32], [i + 5, B + 22], [i + 6, B + 8]], h.shade, h.deep);
                                                        }
                                                        else {
                                                          if (!(a.g.back)) {
                                                            tO(S, hO([[i + 2, B + 4], [i - 2, B + 8], [i - 3, B + 18], [i - 2 + d, B + 30], [i + 2, B + 32], [i + 6, B + 32]], t), h.shade, h.deep);
                                                          }
                                                        }
                                                      }
                                                    }(a, s, o);
                                                  }
                                                else {
                                                  if (!(h)) {
                                                    (function (a, s, o) {
                                                      var i = s.head;
                                                      var B = S.Palette.pick("HAIR", "nau", "hac");
                                                      var n = i.x;
                                                      var O = i.y;
                                                      var t = i.w;
                                                      if ("back" !== o) {
                                                        if (s.g.back) {
                                                          u(a, [[n - 1, O + 2], [n + t + 1, O + 2], [n + t + 1, O + 13], [n + t - 1, O + 18], [n + 1, O + 18], [n - 1, O + 13]], B.base);
                                                          e.r(a, n, O + 5, 2, 9, B.shade);
                                                          return void e.r(a, n + t - 2, O + 5, 2, 9, B.hi);
                                                        }
                                                        if (s.g.side) {
                                                          u(a, [[n - 2, O + 4], [n, O - 2], [n + 4, O - 5], [n + t, O - 4], [n + t + 1, O + 2], [n + t, O + 8], [n + t - 2, O + 12], [n + 1, O + 14], [n - 2, O + 10]], B.base);
                                                          e.r(a, n - 1, O + 5, 2, 6, B.deep);
                                                          e.r(a, n + 1, O + 1, 2, 7, B.shade);
                                                          e.line(a, n + 3, O - 2, n + 7, O - 4, B.hi);
                                                          e.line(a, n + 5, O - 1, n + 8, O + 2, B.hi2);
                                                          e.r(a, n + t - 3, O + 4, 2, 5, B.shade);
                                                          return void e.dot(a, n + t - 1, O + 8, B.deep);
                                                        }
                                                        u(a, [[n - 2, O + 5], [n - 2, O + 1], [n, O - 3], [n + 4, O - 5], [n + t - 5, O - 5], [n + t, O - 4], [n + t + 2, O - 1], [n + t + 2, O + 4], [n + t, O + 7], [n - 1, O + 7]], B.deep);
                                                        u(a, [[n, O + 3], [n + 1, O - 2], [n + 5, O - 4], [n + t - 5, O - 4], [n + t - 1, O - 2], [n + t, O + 2], [n + t - 1, O + 4], [n + 1, O + 4]], B.base);
                                                        e.r(a, n + 2, O - 2, 4, 2, B.shade);
                                                        e.r(a, n + 7, O - 4, 4, 2, B.hi);
                                                        e.r(a, n + 12, O - 3, 4, 2, B.shade);
                                                        e.r(a, n + 3, O + 1, 3, 2, B.hi2);
                                                        e.r(a, n + 8, O, 3, 2, B.shade);
                                                        e.r(a, n + 13, O + 2, 4, 2, B.hi);
                                                        e.r(a, n + 18, O - 1, 3, 2, B.shade);
                                                        e.dot(a, n + 5, O + 3, B.deep);
                                                        e.dot(a, n + 10, O + 3, B.hi2);
                                                        e.dot(a, n + 16, O + 4, B.deep);
                                                        e.r(a, n - 1, O + 6, 2, 6, B.deep);
                                                        e.r(a, n + t - 1, O + 6, 2, 6, B.base);
                                                        e.r(a, n + 2, O + 7, 2, 2, B.shade);
                                                        e.r(a, n + t - 3, O + 7, 2, 2, B.hi);
                                                      }
                                                      else {
                                                        if (s.g.back || s.g.side) {
                                                          u(a, [[n - 1, O + 4], [n + t + 1, O + 4], [n + t + 1, O + 14], [n + t - 1, O + 18], [n + 2, O + 18], [n - 1, O + 14]], B.deep);
                                                          e.r(a, n, O + 5, t, 8, B.base);
                                                          e.r(a, n + 1, O + 7, 2, 8, B.shade);
                                                        }
                                                        else {
                                                          e.r(a, n - 1, O + 6, 2, 9, B.deep);
                                                          e.r(a, n + t - 1, O + 6, 2, 9, B.base);
                                                        }
                                                      }
                                                    })(a, s, o);
                                                  }
                                                }
                                              else {
                                                if (!(h)) {
                                                  (function (a, s, o) {
                                                    var i = s.head;
                                                    var B = i.x;
                                                    var n = i.y;
                                                    var O = i.w;
                                                    var t = 0 | s.p.leg;
                                                    var h = 2 * B + O - 1;
                                                    var r = "#0e0b14";
                                                    var d = "#1b1524";
                                                    var l = "#2a2136";
                                                    var f = "#4a3b5c";
                                                    var c = "#6c5782";
                                                    var b = "#18052d";
                                                    var G = "#35105d";
                                                    var H = "#5c1a96";
                                                    var g = "#8d32d0";
                                                    var x = { L: b, D: b, S: G, B: g, H: H };
                                                    var D = { L: b, D: G, S: H, B: g, H: "#c76aff" };
                                                    var W = S.Palette.pick("SKIN", s.cfg.skin, "light");
                                                    var J = W && { L: W.line, D: W.deep, S: W.shade, B: W.base, H: W.hi };
                                                    if ("back" === o) {
                                                      if (s.g.back) {
                                                        return;
                                                      }
                                                      return s.g.side ? (tO(a, [[B + 4, n - 1], [B - 1, n + 2], [B - 4, n + 6], [B - 3, n + 8], [B - 6, n + 12], [B - 4, n + 14], [B - 7 + t, n + 19], [B - 4 + t, n + 20], [B - 6 + t, n + 26], [B - 2 + t, n + 25], [B - 3 + t, n + 31], [B + 1 + t, n + 28], [B + 2 + t, n + 33], [B + 5, n + 26], [B + 6, n + 14], [B + 6, n + 4]], l, r), e.line(a, B - 1, n + 5, B - 4 + t, n + 18, f), e.line(a, B + 2, n + 8, B - 1 + t, n + 27, d), void e.line(a, B + 4, n + 12, B + 2 + t, n + 30, c)) : (tO(a, hO([[B + 3, n - 1], [B - 2, n + 3], [B - 5, n + 9], [B - 4, n + 11], [B - 7, n + 16], [B - 5, n + 18], [B - 7 + t, n + 24], [B - 4 + t, n + 25], [B - 5 + t, n + 31], [B - 1 + t, n + 29], [B + 1, n + 34], [B + 5, n + 34]], h), l, r), e.line(a, B - 3, n + 10, B - 5 + t, n + 23, f), e.line(a, h - (B - 3), n + 10, h - (B - 5) - t, n + 23, c), e.line(a, B - 1, n + 18, B - 3 + t, n + 29, d), void e.line(a, h - (B - 1), n + 18, h - (B - 3) - t, n + 29, d));
                                                    }
                                                    if (s.g.side) {
                                                      tO(a, [[B - 2, n + 3], [B, n - 1], [B + 2, n - 2], [B + 3, n - 4], [B + 5, n - 2], [B + 7, n - 5], [B + 9, n - 2], [B + 11, n - 3], [B + O - 1, n], [B + O + 1, n + 3], [B + O - 1, n + 4], [B + O - 2, n + 6], [B + O - 4, n + 4], [B + O - 6, n + 5], [B + 7, n + 4], [B + 7, n + 8], [B + 6, n + 13], [B + 4, n + 17], [B + 5 + t, n + 22], [B + 2 + t, n + 20], [B + t, n + 25], [B - 1, n + 19], [B - 4, n + 21], [B - 3, n + 15], [B - 4, n + 10], [B - 2, n + 8]], l, r);
                                                      e.line(a, B + 1, n + 1, B + 4, n - 2, c);
                                                      e.line(a, B + 7, n - 3, B + 10, n + 1, f);
                                                      e.line(a, B + O - 5, n + 1, B + O - 2, n + 3, f);
                                                      e.line(a, B + 1, n + 4, B - 1, n + 14, f);
                                                      e.line(a, B + 4, n + 9, B + 2, n + 18, d);
                                                      e.line(a, B + 5, n + 5, B + 5, n + 11, d);
                                                      if (J) {
                                                        OO(a, B + 1, n + 5, nO, J, !1);
                                                      }
                                                      return void OO(a, B + 3, n - 5, iO, D, !1);
                                                    }
                                                    if (s.g.back) {
                                                      tO(a, hO([[B + 6, n - 5], [B + 4, n - 2], [B + 2, n - 4], [B + 1, n - 1], [B - 1, n], [B - 1, n + 4], [B - 3, n + 6], [B - 2, n + 8], [B - 5, n + 11], [B - 3, n + 13], [B - 5, n + 17], [B - 2, n + 17], [B - 3 + t, n + 22], [B, n + 21], [B - 1 + t, n + 27], [B + 2, n + 25], [B + 2 + t, n + 31], [B + 4, n + 28], [B + 5 + t, n + 33], [B + 6, n + 30]], h), l, r);
                                                      for (var u = [[B - 4, n + 16], [B - 2 + t, n + 21], [B + t, n + 26], [B + 3 + t, n + 30], [B + 5 + t, n + 24]], M = [[B, n + 4], [B + 2, n + 7], [B + 3, n + 11], [B + 5, n + 9], [B + 3, n + 1]], w = 0; w < u.length; w++)
                                                        e.line(a, M[w][0], M[w][1], u[w][0], u[w][1], w % 2 ? d : f), e.line(a, h - M[w][0], M[w][1], h - u[w][0] + 2 * t, u[w][1], w % 2 ? r : d);
                                                      e.line(a, B + 2, n - 1, B + 5, n - 3, c);
                                                      e.line(a, B + O - 3, n - 1, B + O - 6, n - 3, f);
                                                      OO(a, B - 4, n - 5, iO, x, !1);
                                                      return void OO(a, h - (B - 4), n - 5, iO, x, !0);
                                                    }
                                                    tO(a, hO([[B + 6, n - 5], [B + 4, n - 2], [B + 2, n - 4], [B + 1, n - 1], [B - 1, n], [B - 2, n + 4], [B - 1, n + 6], [B + 1, n + 3], [B + 2, n + 4], [B + 4, n + 3], [B + 5, n + 4], [B + 6, n + 7]], h), l, r);
                                                    e.line(a, B + 1, n + 1, B + 4, n - 2, c);
                                                    e.line(a, B + 5, n + 3, B + 6, n - 3, f);
                                                    e.line(a, h - (B + 5), n + 3, h - (B + 6), n - 3, d);
                                                    e.line(a, h - (B + 1), n + 1, h - (B + 4), n - 2, f);
                                                    for (var N = [[B + 1, n + 3], [B + 1, n + 10], [B + 2, n + 14], [B + 1, n + 18], [B - 1, n + 16], [B - 2 + t, n + 21], [B - 3, n + 17], [B - 5, n + 19], [B - 4, n + 13], [B - 6, n + 12], [B - 3, n + 8], [B - 4, n + 5], [B - 1, n + 2]], p = [], k = 0; k < N.length; k++)
                                                      p.push([h - N[k][0] + (5 === k ? 2 * t : 0), N[k][1]]);
                                                    tO(a, N, l, r);
                                                    tO(a, p, d, "#050408");
                                                    e.line(a, B - 1, n + 5, B - 3, n + 15, f);
                                                    e.line(a, B, n + 11, B - 1 + t, n + 19, c);
                                                    e.line(a, h - (B - 1), n + 5, h - (B - 3), n + 15, l);
                                                    if (J) {
                                                      OO(a, B - 4, n + 5, BO, J, !1);
                                                      OO(a, h - (B - 4), n + 5, BO, J, !0);
                                                    }
                                                    OO(a, B - 4, n - 5, iO, D, !1);
                                                    OO(a, h - (B - 4), n - 5, iO, D, !0);
                                                  })(a, s, o);
                                                }
                                              }
                                            else {
                                              if (!(h)) {
                                                (function (S, e, a) {
                                                  var s = e.head;
                                                  var o = 0 | e.p.leg;
                                                  var i = e.g.side;
                                                  var B = e.g.back;
                                                  var n = { o: "#3d3937", O: "#5e5751", s: "#827970", S: "#a99f91", h: "#d0c5b6", H: "#f0dfc2", G: "#c99a3a", g: "#8a6420", Y: "#f0d08b" };
                                                  var O = pa(e);
                                                  var t = function (S, e) {
                                                    return e < 0 || S < 0 || S > 31 || !(!O || !O(S, e));
                                                  };
                                                  function h(e, a, o, i, B) {
                                                    Na(S, s.x + (a - i), s.y + (o - 6), e, n, !1, B, t);
                                                  }
                                                  if ("back" !== a) {
                                                    if (B) {
                                                      h(cO, 4, 1, 9, Rs(o, 12, 22));
                                                    }
                                                    else {
                                                      if (i) {
                                                        h(lO, 6, 1, 10, Rs(Us(e), 12, 10));
                                                      }
                                                      else {
                                                        h(rO, 4, 1, 9, Rs(o, 12, 16));
                                                      }
                                                    }
                                                  }
                                                  else {
                                                    if (B) {
                                                      return;
                                                    }
                                                    if (i) {
                                                      h(fO, 4, 9, 10, Rs(Us(e), 6, 14));
                                                    }
                                                    else {
                                                      h(dO, 6, 9, 9, Rs(o, 6, 14));
                                                    }
                                                  }
                                                })(a, s, o);
                                              }
                                            }
                                          else {
                                            !function (a, s, o) {
                                              var i = s.head;
                                              var B = S.Palette.pick("HAIR", "ngan", "bach");
                                              var n = G.metal;
                                              var O = i.x;
                                              var t = i.y;
                                              var h = i.w;
                                              var r = O + Math.floor(h / 2);
                                              var d = 0 | s.p.leg;
                                              if (B) {
                                                if ("back" === o) {
                                                  var l = s.g.side ? O - 2 : O - 1;
                                                  var f = (s.g.side, h + 2);
                                                  var c = s.g.side ? 31 : 36;
                                                  u(a, [[l, t + 3], [l + f - 2, t + 2], [l + f + 1, t + 9], [l + f + d, t + c - 5], [l + f - 4 + d, t + c + 1], [l + 3 + d, t + c - 2], [l - 1, t + c - 8]], B.deep);
                                                  u(a, [[l + 2, t + 5], [l + f - 4, t + 4], [l + f - 1, t + 11], [l + f - 4 + d, t + c - 7], [l + f - 7 + d, t + c - 1], [l + 5 + d, t + c - 4], [l + 1, t + c - 10]], B.base);
                                                  e.fatLine(a, l + 4, t + 8, l + 5 + d, t + c - 8, 2, B.shade);
                                                  e.line(a, l + f - 5, t + 8, l + f - 8 + d, t + c - 10, B.hi);
                                                  e.line(a, l + Math.floor(f / 2), t + 8, l + Math.floor(f / 2) + d, t + c - 13, B.hi2 || B.hi);
                                                  u(a, [[O + 2, t - 3], [O + 5, t - 5], [O + h - 5, t - 5], [O + h - 2, t - 2], [O + h - 3, t + 3], [O + 3, t + 3]], B.base);
                                                  e.r(a, O + 4, t - 3, h - 8, 2, B.hi);
                                                  e.r(a, O + 3, t + 1, h - 6, 2, B.shade);
                                                  e.r(a, r - 3, t + 2, 6, 2, n.base);
                                                  e.r(a, r - 2, t + 3, 4, 1, n.hi);
                                                  e.r(a, r - 1, t + 4, 2, 8, n.shade);
                                                  e.dot(a, r, t + 5, n.hi);
                                                  e.r(a, r - 4, t + 5, 2, 5, n.base);
                                                  e.r(a, r + 3, t + 5, 2, 5, n.base);
                                                  e.dot(a, r - 4, t + 10, n.hi);
                                                  return void e.dot(a, r + 3, t + 10, n.shade);
                                                }
                                                u(a, [[O - 1, t + 5], [O, t + 1], [O + 3, t - 2], [O + 7, t - 3], [O + h - 6, t - 3], [O + h - 2, t - 1], [O + h + 1, t + 3], [O + h, t + 7], [O + 2, t + 7]], B.deep);
                                                u(a, [[O + 1, t + 4], [O + 2, t + 1], [O + 5, t - 1], [O + 8, t - 2], [O + h - 7, t - 2], [O + h - 3, t], [O + h - 1, t + 4], [O + h - 2, t + 6], [O + 3, t + 6]], B.base);
                                                e.line(a, O + 3, t + 1, O + 7, t - 1, B.hi);
                                                e.line(a, O + 7, t - 2, r, t + 2, B.hi2 || B.hi);
                                                e.line(a, O + h - 5, t - 1, O + h - 2, t + 3, B.shade);
                                                e.r(a, O + 1, t + 5, 2, 3, B.deep);
                                                u(a, [[O + 4, t - 2], [O + 5, t - 4], [O + 8, t - 5], [O + 11, t - 4], [O + 12, t - 1], [O + 10, t + 1], [O + 5, t + 1]], B.base);
                                                e.r(a, O + 6, t - 4, 5, 1, B.hi);
                                                e.r(a, O + 5, t - 1, 7, 2, B.shade);
                                                e.r(a, O + 7, t, 4, 1, n.base);
                                                e.dot(a, O + 8, t, n.hi);
                                                if (s.g.side) {
                                                  e.r(a, O, t + 6, 2, 2, B.deep);
                                                  u(a, [[O - 1, t + 7], [O + 2, t + 6], [O + 3, t + 10], [O + 2, t + 15], [O + 2, t + 20], [O, t + 22], [O - 1, t + 18]], B.deep);
                                                  u(a, [[O, t + 8], [O + 2, t + 8], [O + 2, t + 13], [O + 1, t + 18], [O, t + 19]], B.base);
                                                  e.r(a, O, t + 10, 1, 7, B.shade);
                                                  e.line(a, O + 1, t + 9, O + 1, t + 16, B.hi);
                                                  u(a, [[O + 1, t + 4], [O + 5, t + 2], [O + 8, t + 4], [O + 8, t + 9], [O + 7, t + 14], [O + 5, t + 17], [O + 2, t + 16], [O + 1, t + 11]], B.deep);
                                                  u(a, [[O + 2, t + 5], [O + 5, t + 4], [O + 7, t + 5], [O + 7, t + 10], [O + 6, t + 14], [O + 4, t + 16], [O + 2, t + 14]], B.base);
                                                  e.r(a, O + 2, t + 7, 2, 7, B.shade);
                                                  e.line(a, O + 4, t + 5, O + 6, t + 12, B.hi);
                                                  e.line(a, O + 5, t + 13, O + 3, t + 17, B.shade);
                                                  u(a, [[O + 1, t + 13], [O + 4, t + 15], [O + 5, t + 21], [O + 4, t + 26], [O + 1, t + 24], [O, t + 18]], B.deep);
                                                  e.line(a, O + 2, t + 15, O + 3, t + 23, B.base);
                                                  e.dot(a, O + 1, t + 24, B.hi);
                                                }
                                                else {
                                                  if (s.g.back) {
                                                    u(a, [[O - 2, t + 6], [O + h + 2, t + 6], [O + h + 3, t + 15], [O + h + 1, t + 24], [O + h - 1, t + 31], [O + h - 4, t + 35], [O + 3, t + 35], [O, t + 30], [O - 2, t + 22]], B.deep);
                                                    u(a, [[O, t + 7], [O + h, t + 7], [O + h + 1, t + 16], [O + h - 1, t + 24], [O + h - 3, t + 30], [O + h - 5, t + 33], [O + 4, t + 33], [O + 2, t + 28], [O, t + 21]], B.base);
                                                    e.r(a, O + 1, t + 7, 2, 19, B.shade);
                                                    e.r(a, O + h - 3, t + 8, 2, 20, B.hi);
                                                    e.fatLine(a, r - 2, t + 8, r - 1, t + 29, 2, B.hi2 || B.hi);
                                                    e.line(a, r + 2, t + 9, r + 1, t + 31, B.shade);
                                                    u(a, [[O + 1, t + 20], [O + 4, t + 22], [O + 5, t + 26], [O + 3, t + 29], [O + 5, t + 32], [O + 8, t + 33], [O + 7, t + 36], [O + 3, t + 35], [O, t + 31], [O + 2, t + 27], [O - 1, t + 24]], B.shade);
                                                    e.line(a, O + 2, t + 22, O + 4, t + 27, B.hi);
                                                    e.line(a, O + 3, t + 29, O + 6, t + 33, B.base);
                                                    u(a, [[O + h - 2, t + 20], [O + h - 5, t + 23], [O + h - 6, t + 27], [O + h - 4, t + 30], [O + h - 6, t + 33], [O + h - 8, t + 35], [O + h - 5, t + 36], [O + h - 1, t + 33], [O + h + 1, t + 29], [O + h - 1, t + 25], [O + h + 2, t + 23]], B.base);
                                                    e.line(a, O + h - 3, t + 22, O + h - 5, t + 27, B.hi2 || B.hi);
                                                    e.line(a, O + h - 5, t + 30, O + h - 7, t + 34, B.shade);
                                                    e.r(a, r - 3, t + 8, 6, 2, n.base);
                                                    e.dot(a, r, t + 9, n.hi);
                                                    e.dot(a, r + 1, t + 3, n.hi);
                                                    e.r(a, r, t + 4, 3, 2, n.base);
                                                    e.dot(a, r + 1, t + 5, n.deep);
                                                    e.r(a, r + 1, t + 6, 1, 8, n.shade);
                                                    e.r(a, r, t + 14, 3, 2, n.hi);
                                                    e.dot(a, r + 1, t + 15, n.base);
                                                  }
                                                  else {
                                                    u(a, [[O + 1, t + 3], [O + 4, t + 1], [O + 7, t + 2], [O + 8, t + 5], [O + 6, t + 7], [O + 5, t + 4], [O + 3, t + 6]], B.base);
                                                    u(a, [[O + h - 7, t + 1], [O + h - 3, t + 1], [O + h - 1, t + 3], [O + h - 3, t + 6], [O + h - 5, t + 7], [O + h - 5, t + 3]], B.shade);
                                                    e.line(a, O + 2, t + 2, O + 5, t + 4, B.hi);
                                                    e.line(a, O + h - 5, t + 2, O + h - 4, t + 5, B.hi);
                                                    e.r(a, O - 1, t + 6, 2, 8, B.shade);
                                                    e.r(a, O + h - 1, t + 6, 2, 8, B.base);
                                                  }
                                                }
                                                var b = s.g.side ? O + 2 : r + 2;
                                                e.dot(a, b, t - 3, n.hi);
                                                e.r(a, b - 1, t - 2, 3, 2, n.base);
                                                e.dot(a, b, t - 1, n.deep);
                                                e.r(a, b + 1, t, 1, 5, n.shade);
                                                e.dot(a, b + 1, t + 5, n.hi);
                                              }
                                            }(a, s, o);
                                          }
                                      }
                                    else {
                                      !function (S, a, s) {
                                        var o = a.head;
                                        var i = o.x;
                                        var B = o.y;
                                        var n = o.w;
                                        var O = i + Math.floor(n / 2);
                                        var t = 0 | a.p.leg;
                                        var h = "#0a1020";
                                        var r = "#19233a";
                                        var d = "#293a54";
                                        var l = "#326d9d";
                                        var f = a.g.side ? i - 3 : i;
                                        var c = a.g.side ? 7 : n;
                                        var b = Math.min(46, B + o.h + 19);
                                        if (("back" === s && !a.g.back || "front" === s && a.g.back)) {
                                          u(S, [[f + 1, B + 6], [f + c - 1, B + 6], [f + c, B + 18], [f + c + t, b - 4], [f + c - 3 + t, b - 1], [f + c - 5 + t, b - 4], [f + 3 + t, b], [f - 1 + t, b - 4], [f, B + 16]], h);
                                          u(S, [[f + 2, B + 9], [f + c - 2, B + 9], [f + c - 1, B + 20], [f + c - 2 + t, b - 5], [f + 3 + t, b - 3], [f + 1, B + 19]], r);
                                          e.line(S, f + 2, B + 13, f + 2 + t, b - 5, d);
                                          e.line(S, f + c - 3, B + 16, f + c - 4 + t, b - 4, l);
                                        }
                                        if ("back" !== s) {
                                          u(S, [[i - 1, B + 4], [i, B], [i + 3, B - 2], [O + 2, B - 3], [i + n - 2, B - 1], [i + n + 1, B + 3], [i + n, B + 8], [i + n - 2, B + 6], [i + n - 4, B + 7], [O + 1, B + 4], [O - 1, B + 7], [O - 3, B + 5], [i + 1, B + 8]], h);
                                          u(S, [[i, B + 3], [i + 4, B - 1], [O + 2, B - 2], [i + n - 2, B], [i + n, B + 4], [i + n - 3, B + 5], [O + 1, B + 3], [O - 1, B + 6], [O - 3, B + 4], [i + 1, B + 7]], r);
                                          e.line(S, O, B - 1, i + 3, B + 3, d);
                                          e.line(S, O + 1, B, i + 5, B + 5, l);
                                          e.line(S, O + 4, B, i + n - 2, B + 3, d);
                                          if (a.g.back) {
                                            e.r(S, i, B + 5, n, 10, r);
                                            e.line(S, O, B + 4, O - 1, B + 18, d);
                                            e.line(S, i + 3, B + 6, i + 2, B + 16, l);
                                            e.line(S, i + n - 3, B + 7, i + n - 2, B + 18, h);
                                          }
                                          else {
                                            if (a.g.side) {
                                              u(S, [[i - 1, B + 4], [i + 4, B + 3], [i + 6, B + 6], [i + 6, B + 12], [i + 5, B + 16], [i + 3, B + 14], [i + 2, B + 17], [i - 1, B + 14]], h);
                                              u(S, [[i, B + 5], [i + 4, B + 5], [i + 5, B + 8], [i + 5, B + 12], [i + 3, B + 14], [i + 1, B + 12]], r);
                                              e.line(S, i + 2, B + 5, i + 2, B + 12, d);
                                              e.line(S, i + 3, B + 6, i + 4, B + 10, l);
                                            }
                                            else {
                                              u(S, [[i - 2, B + 5], [i + 1, B + 4], [i + 2, B + 8], [i + 1, B + 13], [i, B + 16], [i - 2, B + 13]], h);
                                              e.line(S, i, B + 6, i, B + 12, d);
                                              u(S, [[i + n - 2, B + 5], [i + n + 1, B + 5], [i + n + 2, B + 12], [i + n, B + 16], [i + n - 1, B + 13], [i + n - 2, B + 9]], h);
                                              e.line(S, i + n, B + 7, i + n, B + 12, d);
                                              e.dot(S, i + n - 1, B + 8, l);
                                            }
                                          }
                                          (function (S, a) {
                                            var s = He[a.dir];
                                            if (s) {
                                              for (var o = a.head.x, i = a.head.y, B = 0; B < s.length; B++) {
                                                var n = s[B];
                                                if (n[2]) {
                                                  e.dot(S, o + n[0], i + n[1], n[2]);
                                                }
                                                else {
                                                  S.clearRect(o + n[0], i + n[1], 1, 1);
                                                }
                                              }
                                            }
                                          })(S, a);
                                        }
                                      }(a, s, o);
                                    }
                                  else {
                                    !function (S, a, s) {
                                      var o = a.head;
                                      var i = o.x;
                                      var B = o.y;
                                      var n = o.w;
                                      var O = i + Math.floor(n / 2);
                                      var t = 0 | a.p.leg;
                                      var h = "#626375";
                                      var r = "#a2a1b4";
                                      var d = "#d6d4e3";
                                      var l = "#fff9ff";
                                      var f = "#414450";
                                      var c = a.g.side ? i - 4 : i - 2;
                                      var b = a.g.side ? 10 : n + 4;
                                      var G = Math.min(48, B + o.h + 22);
                                      if ("back" === s && !a.g.back || "front" === s && a.g.back) {
                                        u(S, [[c + 2, B + 3], [c + b - 2, B + 3], [c + b, B + 15], [c + b + 1 + t, G - 8], [c + b - 2 + t, G - 4], [c + b - 3 + t, G - 7], [c + b - 6 + t, G], [c + Math.floor(b / 2), G - 3], [c + 3 + t, G - 1], [c - 1 + t, G - 7], [c, B + 19]], h);
                                        u(S, [[c + 3, B + 5], [c + b - 3, B + 5], [c + b - 1, B + 19], [c + b - 2 + t, G - 7], [c + b - 6 + t, G - 2], [c + 3 + t, G - 3], [c + 1, B + 20]], d);
                                        for (var H = 2; H < b - 2; H += 3)
                                          e.line(S, c + H, B + 13, c + H - 1, B + 25, H % 2 ? r : l), e.line(S, c + H - 1, B + 25, c + H + t, G - 6, H % 2 ? l : r);
                                      }
                                      if ("back" !== s) {
                                        if (u(S, [[i - 2, B + 6], [i - 1, B], [i + 3, B - 3], [O, B - 2], [i + n - 3, B - 3], [i + n + 1, B + 1], [i + n + 2, B + 7], [i + n - 1, B + 10], [O + 3, B + 3], [O, B + 2], [O - 3, B + 4], [i, B + 11]], h), u(S, [[i - 1, B + 4], [i, B], [i + 4, B - 2], [O, B], [i + n - 3, B - 2], [i + n, B + 2], [i + n + 1, B + 7], [i + n - 2, B + 5], [O + 2, B + 1], [O - 1, B + 1], [i + 2, B + 7], [i - 1, B + 8]], d), e.line(S, O - 1, B, i + 3, B + 1, l), e.line(S, i + 3, B + 1, i, B + 5, l), e.line(S, O + 1, B, i + n - 3, B + 1, l), e.line(S, i + n - 3, B + 1, i + n, B + 5, l), e.line(S, O - 2, B + 2, i + 1, B + 7, r), e.line(S, O + 2, B + 2, i + n - 1, B + 7, r), a.g.back) {
                                          e.r(S, i, B + 5, n, 10, d);
                                          e.line(S, O, B + 3, O - 1, B + 17, r);
                                          e.line(S, i + 2, B + 5, i + 1, B + 16, l);
                                          e.line(S, i + n - 3, B + 5, i + n - 2, B + 17, l);
                                          e.line(S, O, B - 1, O, B + 22, f);
                                          e.line(S, O + 1, B + 1, O + 1, B + 20, r);
                                          e.dot(S, O, B + 13, l);
                                          e.dot(S, O, B + 22, l);
                                        }
                                        else if (a.g.side) {
                                          u(S, [[i - 1, B + 3], [i + 3, B + 4], [i + 6, B + 3], [i + 5, B + 8], [i + 4, B + 13], [i + 2, B + 18], [i, B + 20], [i + 1, B + 15], [i - 2, B + 13]], d);
                                          e.line(S, i + 3, B + 6, i + 2, B + 15, l);
                                          e.line(S, i + 2, B + 15, i, B + 19, r);
                                          e.line(S, i + 5, B + 5, i + 4, B + 12, h);
                                        }
                                        else {
                                          for (var g = 0; g < 2; g++) {
                                            var x = g ? i + n - 1 : i;
                                            var D = g ? 1 : -1;
                                            u(S, [[x - D, B + 5], [x + 2 * D, B + 7], [x + 2 * D, B + 14], [x + 4 * D, B + 18], [x + 2 * D, B + 17], [x + 3 * D, B + 21], [x + D, B + 19], [x - D, B + 12]], d);
                                            e.line(S, x, B + 7, x + D, B + 14, l);
                                            e.line(S, x + D, B + 14, x + 3 * D, B + 18, r);
                                            e.line(S, x - D, B + 9, x, B + 16, h);
                                          }
                                        }
                                        var W = a.g.side ? O - 2 : O;
                                        u(S, [[W, B], [W - 2, B - 2], [W, B - 4], [W + 1, B - 5], [W + 1, B - 3], [W + 2, B - 1]], f);
                                        e.line(S, W, B - 1, W - 1, B - 2, r);
                                        e.line(S, W - 1, B - 2, W + 1, B - 5, l);
                                        e.dot(S, W + 1, B - 2, r);
                                        e.dot(S, W, B, l);
                                        if (!(a.g.side)) {
                                          e.line(S, i - 1, B + 3, i - 2, B, f);
                                          e.line(S, i - 2, B, i, B - 2, r);
                                          e.dot(S, i, B - 2, l);
                                          e.line(S, i + n, B + 3, i + n + 1, B, f);
                                          e.line(S, i + n + 1, B, i + n - 1, B - 2, r);
                                          e.dot(S, i + n - 1, B - 2, l);
                                        }
                                      }
                                    }(a, s, o);
                                  }
                                else {
                                  !function (a, s, o) {
                                    var i = s.head;
                                    var B = i.x;
                                    var n = i.y;
                                    var O = i.w;
                                    var t = B + Math.floor(O / 2);
                                    var h = 0 | s.p.leg;
                                    var r = S.Palette.pick("HAIR", s.cfg.hairColor, "hac");
                                    var d = Math.min(48, n + i.h + 23);
                                    if ("back" !== o) {
                                      u(a, [[B - 2, n + 5], [B, n], [B + 4, n - 3], [t, n - 4], [B + O - 3, n - 2], [B + O + 1, n + 3], [B + O, n + 8], [t + 2, n + 5], [t - 2, n + 7], [B + 2, n + 9]], r.deep);
                                      u(a, [[B, n + 4], [B + 2, n], [t, n - 2], [B + O - 2, n], [B + O, n + 4], [t + 1, n + 3], [t - 2, n + 6], [B + 2, n + 7]], r.base);
                                      e.line(a, t - 1, n - 2, B + 2, n + 4, r.hi);
                                      e.line(a, t + 1, n - 2, B + O - 2, n + 3, r.shade);
                                      if (s.g.back) {
                                        u(a, [[B, n + 5], [B + O, n + 5], [B + O - 1, n + 15], [t + 4, n + 19], [t - 4, n + 19], [B + 1, n + 14]], r.base);
                                        e.line(a, B + 3, n + 6, t - 2, n + 17, r.hi);
                                        e.line(a, B + O - 3, n + 6, t + 2, n + 17, r.shade);
                                        e.r(a, t - 3, n + 17, 7, 3, r.deep);
                                        e.line(a, t - 3, n + 17, t + 3, n + 17, r.hi);
                                        e.r(a, t - 2, n - 5, 5, 4, r.deep);
                                        e.r(a, t - 1, n - 5, 3, 3, r.base);
                                        e.dot(a, t, n - 5, r.hi);
                                      }
                                      else {
                                        if (s.g.side) {
                                          u(a, [[B - 2, n + 5], [B + 3, n + 3], [B + 7, n + 5], [B + 6, n + 12], [B + 4, n + 18], [B + 1, n + 20], [B - 2, n + 14]], r.deep);
                                          u(a, [[B, n + 6], [B + 3, n + 5], [B + 5, n + 7], [B + 4, n + 13], [B + 2, n + 17], [B, n + 14]], r.base);
                                          e.line(a, B + 2, n + 6, B + 2, n + 16, r.hi);
                                          e.line(a, B + 5, n + 7, B + 4, n + 13, r.shade);
                                          e.r(a, B - 1, n + 16, 4, 2, r.deep);
                                          e.dot(a, B + 1, n + 16, r.hi);
                                        }
                                        else {
                                          e.r(a, B - 1, n + 6, 2, 10, r.deep);
                                          e.line(a, B, n + 7, B, n + 14, r.hi);
                                          e.r(a, B + O - 1, n + 6, 2, 9, r.base);
                                          e.line(a, B + O, n + 7, B + O, n + 13, r.shade);
                                          e.line(a, t - 3, n - 3, t + 4, n - 3, "#c88b26");
                                          e.dot(a, t + 4, n - 3, "#ffe39a");
                                        }
                                      }
                                    }
                                    else {
                                      if (!(s.g.back)) {
                                        u(a, [[B + 1, n + 6], [B + O - 1, n + 6], [B + O + 2, n + 17], [B + O + h, d - 5], [t + 4 + h, d], [t + h, d - 2], [B + 2 + h, d], [B - 2 + h, d - 5], [B - 1, n + 16]], r.deep);
                                        u(a, [[B + 3, n + 9], [B + O - 3, n + 9], [B + O - 1, n + 19], [t + 3 + h, d - 4], [t + h, d - 1], [B + 2 + h, d - 3], [B + 1, n + 18]], r.base);
                                        e.line(a, B + 4, n + 12, t - 2 + h, d - 4, r.hi);
                                        e.line(a, B + O - 4, n + 13, t + 3 + h, d - 5, r.shade);
                                        e.line(a, t, n + 16, t + h, d - 2, r.hi);
                                      }
                                    }
                                  }(a, s, o);
                                }
                              else {
                                Ce(a, s, o);
                              }
                            else {
                              !function (S, e, a) {
                                Ba(S, e, a, ia, { F: [$e, 4, 1], S: [Sa, 6, 1], BS: [ea, 2, 3], BD: [aa, 8, 22], U: [sa, 4, 1] });
                              }(a, s, o);
                            }
                          else {
                            !function (S, e, a) {
                              var s = e.head;
                              var o = s.x;
                              var i = s.y;
                              var B = e.g.side;
                              var n = e.g.back;
                              if ("back" !== a) {
                                var O = zs(e, !1);
                                if (n) {
                                  Na(S, o - 4, i - 5, Is, Fs, !1, Rs(qs(e), 23, 10), O);
                                }
                                else {
                                  if (B) {
                                    Na(S, o - 4, i - 5, $s, Fs, !1, null, O);
                                    return void OO(S, o + 4, i + 10, Ts, Fs, !1);
                                  }
                                  Na(S, o - 3, i - 5, Ps, Fs, !1, null, O);
                                  OO(S, o - 1, i + 10, Ts, Fs, !1);
                                  OO(S, o + s.w, i + 10, Ts, Fs, !1);
                                }
                              }
                              else {
                                if (B || n) {
                                  if (B) {
                                    Na(S, o - 4, i + 8, So, Fs, !1, Rs(Us(e), 6, 12));
                                  }
                                }
                                else {
                                  Na(S, o - 4, i + 8, Zs, Fs, !1);
                                }
                              }
                            }(a, s, o);
                          }
                        else {
                          !function (S, e, a) {
                            var s = e.head;
                            var o = s.x;
                            var i = s.y;
                            var B = e.g.side;
                            var n = e.g.back;
                            var O = qs(e);
                            if ("back" !== a) {
                              var t = zs(e, !1);
                              if (n) {
                                Na(S, o - 4, i - 5, Ws, gs, !1, Rs(O, 20, 16), t);
                              }
                              else {
                                if (B) {
                                  Na(S, o - 8, i + 2, us, gs, !1, Rs(Us(e), 12, 16), zs(e, !0));
                                  Na(S, o - 4, i - 5, Js, gs, !1, null, t);
                                  return void OO(S, o + 4, i + 12, Ms, gs, !1);
                                }
                                Na(S, o - 3, i - 5, xs, gs, !1, null, t);
                                OO(S, o - 1, i + 12, Ms, gs, !1);
                                OO(S, o + s.w, i + 12, Ms, gs, !1);
                              }
                            }
                            else {
                              if (!(B || n)) {
                                Na(S, o - 4, i + 6, Ds, gs, !1);
                              }
                            }
                          }(a, s, o);
                        }
                      else {
                        !function (S, e, a) {
                          var s = e.head;
                          var o = s.x;
                          var i = s.y;
                          var B = e.g.side;
                          var n = e.g.back;
                          var O = 0 | e.p.leg;
                          var t = function (S, e) {
                            return function (a) {
                              var s = a - S;
                              return s <= 0 ? 0 : Math.round(O * Math.min(1, s / e));
                            };
                          };
                          if ("back" !== a) {
                            var h = function (S) {
                              return Gs(S, function (e, a) {
                                return a.over && !(S.g.side && 0 === e);
                              }, 4);
                            }(e);
                            if (n) {
                              Na(S, o - 4, i - 3, Ia, Ta, !1, t(18, 14), h);
                            }
                            else {
                              if (B) {
                                Na(S, o - 4, i - 3, $a, Ta, !1, null, h);
                              }
                              else {
                                Na(S, o - 3, i - 3, Pa, Ta, !1, null, h);
                              }
                            }
                          }
                          else {
                            if (B) {
                              Na(S, o - 8, i + 2, Ss, Ta, !1, t(8, 16));
                            }
                            else {
                              if (!(n)) {
                                Na(S, o - 7, i + 2, Za, Ta, !1);
                              }
                            }
                          }
                        }(a, s, o);
                      }
                    else {
                      !function (S, a, s) {
                        var o = a.head;
                        var i = o.x;
                        var B = o.y;
                        var n = a.g.side;
                        var O = a.g.back;
                        var t = 0 | a.p.leg;
                        var h = function (S, e) {
                          return function (a) {
                            var s = a - S;
                            return s <= 0 ? 0 : Math.round(t * Math.min(1, s / e));
                          };
                        };
                        if ("back" !== s) {
                          var r = pa(a);
                          if (O) {
                            Na(S, i - 3, B - 5, Ja, xa, !1, h(20, 22), r);
                            e.line(S, i + 9, B - 3, i + 14, B - 1, xa.z);
                            return void Na(S, i + 15, B - 1, wa, ga, !1);
                          }
                          if (n) {
                            Na(S, i - 4, B - 5, ua, xa, !1, null, r);
                          }
                          else {
                            Na(S, i - 3, B - 5, Da, xa, !1, null, r);
                          }
                        }
                        else {
                          if (n || O) {
                            if (n) {
                              Na(S, i - 8, B - 5, Ma, xa, !1, h(16, 24));
                              e.line(S, i + 1, B - 3, i - 4, B + 1, xa.r);
                              e.line(S, i - 4, B + 1, i - 5, B + 8, xa.z);
                              e.line(S, i + 1, B - 4, i - 3, B - 2, xa.z);
                              Na(S, i - 6, B - 2, wa, ga, !1);
                            }
                          }
                          else {
                            Na(S, i + 6, B - 5, Wa, xa, !1, h(18, 20));
                            e.line(S, i + 10, B - 3, i + 15, B + 2, xa.r);
                            e.line(S, i + 15, B + 2, i + 16, B + 8, xa.z);
                            e.line(S, i + 9, B - 3, i + 17, B + 1, xa.z);
                            Na(S, i + 17, B + 2, wa, ga, !1);
                          }
                        }
                      }(a, s, o);
                    }
                  else {
                    !function (S, e, a) {
                      Ba(S, e, a, oa, { F: [Fe, 4, 1], S: [Te, 6, 1], BS: [Pe, 4, 5], BD: [Ze, 6, 22], U: [Ie, 4, 1] });
                    }(a, s, o);
                  }
                else {
                  !function (S, a, s) {
                    if ("back" !== s) {
                      var o = a.head;
                      var i = o.x;
                      var B = o.y;
                      var n = a.g.side;
                      var O = a.g.back;
                      var t = qs(a);
                      var h = di(a, !1);
                      if (O) {
                        Na(S, i - 5, B - 6, zo, Uo, !1, Rs(t, 18, 10), f(h));
                      }
                      else {
                        if (n) {
                          var r = di(a, !0);
                          var d = Rs(Us(a), 13, 10);
                          var l = f(r ? function (S, e) {
                            return e >= B + 14 ? r(S, e) : !(!h || !h(S, e));
                          } : h);
                          Na(S, i - 10, B - 6, Ro, Uo, !1, d, l);
                          Na(S, i - 9, B + 6, Vo, Uo, !1, function (S) {
                            return d(S + 12);
                          }, l);
                          e.dot(S, i + 4, B + 12, Uo.k);
                          e.dot(S, i + 4, B + 13, Uo.e);
                          e.dot(S, i + 10, B + 11, Uo.t);
                          return void e.dot(S, i + 10, B + 12, Uo.T);
                        }
                        Na(S, i - 4, B - 6, Xo, Uo, !1, null, f(h));
                        e.dot(S, i + 3, B + 11, Uo.t);
                        e.dot(S, i + 3, B + 12, Uo.T);
                        e.dot(S, i + o.w, B + 12, Uo.k);
                        e.dot(S, i + o.w, B + 13, Uo.e);
                      }
                    }
                    function f(S) {
                      return function (e, a) {
                        return a < 0 || e < 0 || e > 31 || !(!S || !S(e, a));
                      };
                    }
                  }(a, s, o);
                }
              else {
                !function (S, e, a) {
                  var s = e.head;
                  var o = s.x;
                  var i = s.y;
                  var B = e.g.side;
                  var n = e.g.back;
                  var O = qs(e);
                  if ("back" !== a) {
                    var t = qo(e, !1);
                    if (n) {
                      Na(S, o - 4, i - 5, oo, eo, !1, Rs(O, 22, 16), t);
                    }
                    else {
                      if (B) {
                        var h = qo(e, !0);
                        Na(S, o - 3, i + 14, Bo, eo, !1, Rs(Us(e), 4, 16), h);
                        return void Na(S, o - 4, i - 5, io, eo, !1, null, h ? function (S, e) {
                          return e >= i + 14 ? h(S, e) : !(!t || !t(S, e));
                        } : t);
                      }
                      Na(S, o - 3, i - 5, ao, eo, !1, Rs(O, 22, 10), t);
                    }
                  }
                  else {
                    if (!(B || n)) {
                      Na(S, o - 4, i + 6, so, eo, !1, Rs(O, 12, 10));
                    }
                  }
                }(a, s, o);
              }
            else {
              !function (S, e, a) {
                var s = e.head;
                var o = e.g.side;
                var i = e.g.back;
                var B = qs(e);
                var n = gB(e, !1);
                if ("back" === a) {
                  if (i) {
                    return;
                  }
                  return o ? void fB(S, e, oB, 1, 0, 10, lB(Us(e), 14, 26, 0), dB()) : void fB(S, e, Zi, 0, 1, 9, lB(B, 26, 12, 1), dB());
                }
                if (i) {
                  fB(S, e, hB, 0, 1, 9, lB(B, 26, 12, 1), dB(n));
                }
                else if (o) {
                  var O = gB(e, !0);
                  var t = dB(O ? function (S, e) {
                    return e >= s.y + 14 ? O(S, e) : !(!n || !n(S, e));
                  } : n);
                  fB(S, e, iB, 9, 5, 10, lB(Us(e), 24, 8, 5), t);
                }
                else {
                  fB(S, e, Ii, 7, 5, 9, null, dB(n));
                }
              }(a, s, o);
            }
          else {
            !function (a, s, o) {
              if ("back" !== o) {
                var i = s.head;
                var B = S.Palette.pick("HAIR", s.cfg.hairColor, "hac");
                var n = i.x;
                var O = i.y;
                var t = i.w;
                var h = PS;
                var r = (0 | s.p.leg) > 0 ? 1 : 0;
                if (s.g.back) {
                  u(a, [[n - 1, O + 11], [n - 1, O + 1], [n + 1, O - 1], [n + t - 1, O - 1], [n + t, O + 1], [n + t, O + 11], [n + t - 2, O + 12], [n + 2, O + 12]], B.base);
                  u(a, [[n - 1, O + 3], [n - 1, O + 1], [n + 1, O - 1], [n + t - 1, O - 1], [n + t, O + 1], [n + t, O + 3]], h.base);
                  e.r(a, n - 1, O + 2, t + 2, 2, h.deep);
                  e.line(a, n, O + 2, n + t - 1, O + 2, h.shade);
                  e.line(a, n + 2, O, n + t - 3, O, h.hi);
                  e.line(a, n - 1, O + 3, n + t, O + 3, h.line);
                  e.r(a, n + 5, O + 3, 4, 3, h.base);
                  e.dot(a, n + 6, O + 3, h.hi);
                  e.line(a, n + 5, O + 5, n + 8, O + 5, h.deep);
                  e.fatLine(a, n + 5, O + 6, n + 4 + r, O + 10, 2, h.base);
                  e.fatLine(a, n + 8, O + 6, n + 9 - r, O + 11, 2, h.shade);
                  e.dot(a, n + 4 + r, O + 10, h.deep);
                  e.dot(a, n + 9 - r, O + 11, h.line);
                  return void e.r(a, n + 2, O + 9, t - 4, 2, B.shade);
                }
                if (s.g.side) {
                  u(a, [[n - 2, O + 12], [n - 2, O + 1], [n, O - 1], [n + t - 2, O - 1], [n + t - 1, O + 1], [n + t - 1, O + 4], [n + t - 3, O + 4], [n + 6, O + 5], [n + 6, O + 7], [n + 3, O + 6], [n + 3, O + 9], [n + 2, O + 11]], B.base);
                  u(a, [[n - 2, O + 3], [n - 2, O + 1], [n, O - 1], [n + t - 2, O - 1], [n + t - 1, O + 1], [n + t - 1, O + 3]], h.base);
                  e.r(a, n - 2, O + 2, t + 1, 2, h.deep);
                  e.line(a, n - 1, O + 1, n + t - 2, O + 1, h.shade);
                  e.line(a, n + 1, O, n + t - 4, O, h.hi);
                  e.line(a, n - 2, O + 3, n + t - 1, O + 3, h.line);
                  e.r(a, n - 4, O + 1, 3, 3, h.base);
                  e.dot(a, n - 4, O + 1, h.hi);
                  e.dot(a, n - 3, O + 3, h.deep);
                  e.fatLine(a, n - 3, O + 4, n - 5 - r, O + 10, 2, h.shade);
                  e.dot(a, n - 5 - r, O + 10, h.line);
                  e.line(a, n - 2, O + 4, n - 3 - r, O + 8, h.base);
                  return void e.line(a, n - 1, O + 10, n + 2, O + 11, B.deep);
                }
                u(a, [[n - 1, O + 3], [n - 1, O + 1], [n + 1, O - 1], [n + t - 1, O - 1], [n + t, O + 1], [n + t, O + 3]], h.base);
                e.r(a, n - 1, O + 2, t + 2, 2, h.deep);
                e.line(a, n, O + 1, n + t - 1, O + 1, h.shade);
                e.line(a, n + 2, O, n + t - 3, O, h.hi);
                e.line(a, n - 1, O + 3, n + t, O + 3, h.line);
                e.line(a, n + 3, O + 2, n + 4, O, h.shade);
                e.line(a, n + 9, O + 2, n + 10, O, h.shade);
                e.r(a, n + t, O, 3, 3, h.base);
                e.dot(a, n + t, O, h.hi);
                e.dot(a, n + t + 2, O + 2, h.deep);
                e.fatLine(a, n + t + 1, O + 3, n + t + 1 + r, O + 9, 2, h.shade);
                e.dot(a, n + t + 1 + r, O + 9, h.line);
                e.line(a, n + t, O + 3, n + t - r, O + 7, h.base);
                e.dot(a, n - 1, O + 4, B.base);
                e.dot(a, n - 1, O + 5, B.shade);
                e.dot(a, n, O + 4, B.base);
                e.dot(a, n + t - 1, O + 4, B.shade);
              }
            }(a, s, o);
          }
        else {
          !function (a, s, o) {
            if ("back" !== o) {
              var i = s.head;
              var B = S.Palette.pick("HAIR", s.cfg.hairColor, "hac");
              var n = i.x;
              var O = i.y;
              var t = i.w;
              var h = O - 1;
              if (s.g.back) {
                u(a, [[n - 1, O + 11], [n - 1, O + 1], [n + 1, O - 2], [n + t - 1, O - 2], [n + t, O + 1], [n + t, O + 11], [n + t - 2, O + 12], [n + 2, O + 12]], B.base);
                e.r(a, n - 1, O + 3, 2, 8, B.shade);
                e.r(a, n + t - 2, O + 3, 2, 8, B.hi);
                e.r(a, n + 2, O + 10, t - 4, 2, B.shade);
                e.line(a, n + 3, O + 12, n + t - 4, O + 12, B.deep);
                FS(a, n + 2, h, 3, -1, B);
                FS(a, n + 5, h, 4, 0, B);
                FS(a, n + 8, h, 3, 1, B);
                FS(a, n + 11, h, 4, 0, B);
                e.line(a, n + 3, O + 2, n + 5, O + 8, B.hi);
                return void e.line(a, n + 9, O + 3, n + 10, O + 9, B.shade);
              }
              if (s.g.side) {
                u(a, [[n - 2, O + 13], [n - 2, O + 1], [n, O - 2], [n + t - 2, O - 2], [n + t - 1, O + 1], [n + t - 1, O + 4], [n + t - 4, O + 3], [n + 6, O + 5], [n + 6, O + 7], [n + 3, O + 6], [n + 3, O + 9], [n + 2, O + 12]], B.base);
                e.r(a, n - 2, O + 4, 2, 8, B.shade);
                e.line(a, n + 3, O + 2, n + 7, O + 3, B.hi);
                e.line(a, n - 1, O + 12, n + 2, O + 12, B.deep);
                FS(a, n, h, 3, -2, B);
                FS(a, n + 3, h, 4, -1, B);
                FS(a, n + 6, h, 4, 1, B);
                FS(a, n + 9, h, 3, 2, B);
                e.dot(a, n + 6, O + 6, B.shade);
                return void e.dot(a, n + 5, O + 5, B.deep);
              }
              u(a, [[n - 1, O + 6], [n - 1, O + 1], [n + 1, O - 2], [n + t - 1, O - 2], [n + t, O + 1], [n + t, O + 6], [n + t - 1, O + 6], [n + t - 1, O + 5], [n + t - 3, O + 4], [n + t - 4, O + 2], [n + 4, O + 2], [n + 3, O + 4], [n + 1, O + 5], [n + 1, O + 6]], B.base);
              FS(a, n + 1, h, 2, -1, B);
              FS(a, n + 4, h, 4, -1, B);
              FS(a, n + 7, h, 3, 0, B);
              FS(a, n + 10, h, 5, 1, B);
              FS(a, n + 13, h, 2, 1, B);
              e.r(a, n - 1, O + 2, 2, 4, B.shade);
              e.r(a, n + t - 1, O + 2, 2, 4, B.hi);
              e.line(a, n + 3, O, n + 5, O + 2, B.hi);
              e.line(a, n + 8, O - 1, n + 10, O + 1, B.hi2 || B.hi);
              e.dot(a, n + 6, O + 1, B.shade);
              e.dot(a, n + 11, O + 2, B.shade);
              e.dot(a, n, O + 6, B.deep);
              e.dot(a, n + t - 1, O + 6, B.shade);
            }
          }(a, s, o);
        }
      else {
        !function (S, e, a) {
          var s = li;
          var o = fi(S);
          var i = o.rect;
          var B = o.dot;
          var n = o.line;
          var O = o.poly;
          var t = e.head;
          var h = t.x;
          var r = t.y;
          var d = t.w;
          var l = e.g.side;
          var f = e.g.back;
          var c = e.p.leg || 0;
          var b = l ? h : h + 4;
          if (("back" === a ? !f : f) && (O([[b, r + 5], [b + 5, r + 5], [b + 6 + c, r + 22], [b + 3 + c, r + 24], [b + 1, r + 17]], s.ink), O([[b + 1, r + 6], [b + 4, r + 6], [b + 5 + c, r + 21], [b + 3 + c, r + 22]], s.navy), n(b + 2, r + 8, b + 3 + c, r + 20, s.steelHi)), "back" !== a)
            if (O([[h, r + 5], [h, r], [h + 3, r - 3], [h + d - 4, r - 3], [h + d - 1, r], [h + d, r + 5]], s.ink), O([[h + 1, r + 4], [h + 1, r], [h + 4, r - 2], [h + d - 4, r - 2], [h + d - 2, r + 1], [h + d - 1, r + 4]], s.navy), n(h + 3, r - 1, h + d - 5, r - 1, s.steelHi), n(h + 2, r + 1, h + d - 3, r + 2, s.steel), i(h, r + 4, d, 2, s.steel), i(h, r + 6, d, 1, s.ink), f) {
              O([[h, r + 6], [h + d - 1, r + 6], [h + d - 2, r + 13], [h + d - 5, r + 15], [h + 3, r + 14], [h, r + 10]], s.navy);
              n(h + 2, r + 7, h + 3, r + 12, s.steel);
              i(h + 5, r + 6, 4, 3, s.steelHi);
              n(h + 5, r + 9, h + 6 + c, r + 22, s.steel, 3);
              n(h + 6, r + 9, h + 7 + c, r + 21, s.steelHi);
            }
            else {
              var G = l ? h + d - 3 : h + Math.floor(d / 2);
              B(G, r + 3, s.goldHi);
              i(G - 1, r + 4, 3, 1, s.gold);
              B(G, r + 5, s.goldDark);
              i(h, r + 6, 2, 4, s.hair);
              if (!(l)) {
                i(h + d - 2, r + 6, 2, 4, s.hair);
              }
            }
        }(a, s, o);
      }
    else {
      !function (a, s, o) {
        if ("back" !== o) {
          var i = pa(s);
          !function (a, s, o) {
            if (s.g.back || s.g.side) {
              var i = S.Palette.pick("HAIR", "hac", "hac");
              var B = s.head;
              var n = B.x;
              var O = B.y;
              var t = {};
              var h = { line: i.line, hi: i.hi, base: i.base, shade: i.shade };
              if (s.g.back) {
                In(t, n, O, [[1, 12], [0, 13], [0, 13], [0, 13], [0, 13], [0, 13], [0, 13], [0, 13], [0, 13], [1, 12], [1, 12], [2, 11], [3, 5, 8, 10]]);
                eO(a, t, h, o);
                r(n + 3, O + 5, i.hi2);
                r(n + 3, O + 6, i.hi);
                r(n + 10, O + 6, i.hi2);
                r(n + 10, O + 7, i.hi);
                r(n + 6, O + 8, i.hi);
                r(n + 7, O + 9, i.hi);
                r(n + 6, O + 7, i.shade);
                r(n + 7, O + 7, i.shade);
                r(n + 4, O + 10, i.shade);
                r(n + 9, O + 10, i.shade);
              }
              else {
                In(t, n, O + 2, [[2, 6], [1, 6], [0, 5], [0, 4], [0, 4], [0, 4], [0, 4], [1, 4], [1, 3], [2, 3]]);
                eO(a, t, h, o);
                r(n + 1, O + 5, i.hi2);
                r(n + 1, O + 6, i.hi);
                r(n + 2, O + 8, i.hi);
                r(n + 3, O + 10, i.hi);
              }
            }
            function r(S, s, i) {
              if (!(!(S >= 0 && S <= 31 && s >= 0) || o && o(S, s))) {
                e.dot(a, S, s, i);
              }
            }
          }(a, s, i);
          (function (a, s, o) {
            var i;
            var B;
            var n = g.xich_ma_y;
            var O = n.rock;
            var t = n.lava;
            var h = S.Palette.pick("SKIN", s.cfg.skin, "light");
            var r = s.head;
            var d = r.x;
            var l = r.y;
            var f = r.w;
            var c = s.g.side;
            var b = s.g.back;
            var G = 2 * d + f - 1;
            var H = {};
            var x = {};
            var D = {};
            if (c) {
              Zn(H, [[d + 9.2, l + 1.6], [d + 9.6, l - .8], [d + 10.6, l - 3], [d + 11.4, l - 4.8]], [1.5, 1.4, 1.1, .5]);
              eO(a, H, { line: O.line, hi: O.shade, base: O.deep, shade: O.line }, o);
              Zn(x, [[d + 7.4, l + 4.4], [d + 4.6, l + 1.6], [d + 2.2, l - 1.6], [d + 1.2, l - 4], [d + 2.4, l - 5.8]], [2.4, 2.3, 2, 1.5, .6]);
              Zn(x, [[d + 9.6, l + .4], [d + 9.2, l - 2.8]], [1.2, .45]);
              Zn(x, [[d + 6.4, l + .4], [d + 5.6, l - 3.2]], [1.3, .45]);
              eO(a, x, O, o);
              In(D, d, l, [[2, 10], [1, 11], [0, 2, 10, 12]]);
            }
            else {
              Zn(x, [[d + 1, l + 2.2], [d - 1.2, l + .4], [d - 2.8, l - 2], [d - 3, l - 4.2], [d - 1.8, l - 5.8]], [2.1, 1.9, 1.6, 1.1, .5]);
              SO(x, $n(x, G));
              eO(a, x, O, o);
              Zn(i = {}, [[d + 6.5, l + .5], [d + 6.5, l - 5.4]], [2, .55]);
              Zn(i, [[d + 3.4, l + .5], [d + 2.6, l - 3]], [1.2, .45]);
              SO(i, $n(i, G));
              eO(a, i, O, o);
              In(D, d, l, b ? [[2, 11], [1, 12], [0, 13], [0, 13], [1, 12]] : [[2, 11], [1, 12], [0, 2, 11, 13]]);
            }
            eO(a, D, O, o);
            var W;
            var J = c ? [3, 6, 9] : [3, 5, 8, 10];
            for (W = 0; W < J.length; W++)
              e.dot(a, d + J[W], l + 1, O.deep);
            if (!(b)) {
              if (c) {
                e.dot(a, d + 10, l + 1, t.base);
                e.dot(a, d + 10, l, t.hi);
              }
              else {
                e.r(a, d + 6, l + 1, 2, 2, t.base);
                e.dot(a, d + 6, l + 1, t.hi);
                e.dot(a, d + 7, l + 2, t.deep);
              }
            }
            if (!(c || b)) {
              Zn(B = {}, [[d - .4, l + 8.6], [d - 2.2, l + 6.4], [d - 3.2, l + 4.6]], [1.3, .9, .4]);
              SO(B, $n(B, G));
              eO(a, B, { line: h.line, hi: h.hi, base: h.base, shade: h.shade }, o);
            }
          })(a, s, i);
          (function (a, s, o) {
            if (!s.g.back) {
              var i = g.xich_ma_y;
              var B = S.Palette.pick("SKIN", s.cfg.skin, "light");
              var n = i.bone;
              var O = i.metal;
              var t = i.lava;
              var h = s.head;
              var r = h.x;
              var d = h.y;
              var l = h.w;
              if (s.g.side) {
                var f = r + l - 1;
                x(f - 5, d + 4, B.line);
                x(f - 4, d + 4, B.line);
                x(f - 3, d + 5, B.line);
                x(f - 2, d + 5, B.line);
                x(f - 1, d + 6, B.line);
                x(f - 3, d + 11, n.hi);
                x(f - 3, d + 12, n.base);
                x(f - 3, d + 13, n.base);
                x(f - 3, d + 14, n.shade);
                x(f - 2, d + 14, n.deep);
                x(f - 4, d + 12, B.line);
                x(f - 4, d + 13, B.line);
                x(f - 4, d + 14, B.line);
                x(f, d + 12, O.hi);
                x(f + 1, d + 12, O.base);
                x(f + 1, d + 13, O.shade);
                x(f, d + 13, O.shade);
                x(f - 2, d + 15, B.line);
                x(f - 1, d + 15, B.line);
                return void x(f, d + 15, B.line);
              }
              var c;
              var b;
              var G = r + Math.floor(l / 2);
              x(r + 1, d + 4, B.line);
              x(r + 2, d + 4, B.line);
              x(r + 3, d + 5, B.line);
              x(r + 4, d + 5, B.line);
              x(r + 5, d + 6, B.line);
              x(r + 1, d + 5, B.deep);
              x(r + 2, d + 5, B.deep);
              x(r + 12, d + 4, B.line);
              x(r + 11, d + 4, B.line);
              x(r + 10, d + 5, B.line);
              x(r + 9, d + 5, B.line);
              x(r + 8, d + 5, B.line);
              x(r + 7, d + 6, B.line);
              x(r + 12, d + 5, B.deep);
              x(r + 11, d + 5, B.deep);
              x(r + 2, d + 7, B.line);
              x(r + 3, d + 7, B.line);
              x(r + 4, d + 7, B.line);
              x(r + 8, d + 7, B.line);
              x(r + 9, d + 7, B.line);
              x(r + 10, d + 7, B.line);
              x(r + 3, d + 10, B.deep);
              x(r + 4, d + 10, B.shade);
              x(r + 9, d + 10, B.deep);
              x(r + 8, d + 10, B.shade);
              var H = [r + 2, r + l - 3];
              for (c = 0; c < 2; c++)
                b = c ? -1 : 1, x(H[c], d + 11, n.hi), x(H[c], d + 12, n.base), x(H[c], d + 13, n.base), x(H[c], d + 14, n.shade), x(H[c] + b, d + 13, n.base), x(H[c] + b, d + 14, n.deep), x(H[c] + 2 * b, d + 14, B.line), x(H[c] - b, d + 11, B.line), x(H[c] - b, d + 12, B.line), x(H[c] - b, d + 13, B.line), x(H[c] - b, d + 14, B.line), x(H[c] - b, d + 15, B.line), x(H[c], d + 10, B.line);
              x(G - 2, d + 15, B.line);
              x(G - 1, d + 15, B.line);
              x(G, d + 15, B.line);
              x(G + 1, d + 15, B.line);
              x(G - 1, d + 12, O.hi);
              x(G, d + 12, O.base);
              x(G - 2, d + 13, O.base);
              x(G + 1, d + 13, O.shade);
              x(G - 1, d + 14, O.shade);
              x(G, d + 14, O.deep);
              x(r, d + 8, t.base);
              x(r + l - 1, d + 8, t.base);
            }
            function x(S, s, i) {
              if (!(!(S >= 0 && S <= 31 && s >= 0) || o && o(S, s))) {
                e.dot(a, S, s, i);
              }
            }
          })(a, s, i);
        }
      }(a, s, o);
    }
  }
  var WO = { tam_chom: { d: [".O..OS..SO..O.", ".S.O......O.S.", ".h...OShO...h.", "..S..OSSO..S..", "..S..OhSO..S..", "..O...SO...O..", "..o...hO...o..", "......SO......", "......Ss......", "......hO......", "......SO......", "......O.......", "......o......."], dx: 0, dy: 13, s: [".......O..", ".O...OSS..", ".S..O.....", ".h...OSh..", ".S...OSS..", "..S..OhS..", "..O..Sh...", "..o..hS...", ".....SO...", ".....Ss...", ".....hO...", ".....S....", ".....O...."], sx: 4, sy: 12 }, tien_ong: { d: ["Os..........sO", "OS..........SO", "OS..........SO", "Oh..........hO", "OSOSSh..hSSOSO", ".OS.OShhSO.SO.", ".h.OSShSShO.h.", ".S.OhSsShSO.S.", ".o.OShSShSO.o.", "...OSsShSsO...", "...OhSShSSO...", "....OShSsO....", "....OSShSO....", "....OhSsSO....", "....OShSSO....", ".....OShO.....", ".....OSSO.....", ".....OhSO.....", ".....OSsO.....", "......hO......", "......SO......", "......O......."], dx: 0, dy: 9, s: [".O.......", ".S.......", ".S.......", ".hO..OSS.", ".SSOOSShO", ".OSShSSSO", ".OhSShSSO", "OSShSShO.", "OhSSshSO.", ".OShSSShO", ".OShSsSO.", "..OhSShSO", "..OSShSO.", "...OhSSO.", "...OSshO.", "...OShSO.", "....OhSO.", "....OShO.", "....OSO..", "....OhO..", ".....O..."], sx: 5, sy: 9, sway: 12 }, bat_tu: { d: ["..Sh..hS..", ".OS....SO.", "O...Sh...O", "....OO...."], dx: 2, dy: 13, s: ["...Sh", ".OS..", "O....", "...S.", "...O."], sx: 8, sy: 12 }, lang_khach: { d: ["O............O", "s............s", "O............O", "O............O", ".O..sS..Ss..O.", ".OO........OO.", "...OsSShSsO...", ".....OShO.....", "......SO......", "......O......."], dx: 0, dy: 9, s: ["O......", "s......", "O......", "O......", "O...sSh", ".OO....", "...OsSh", "....SO.", "....O.."], sx: 6, sy: 9 } };
  var JO = { van_ly: { down: [".kKKKk.", "kKMWMKk", "kMWkWMk", "kKMWMKk", "wWWWWWw"], side: [".kKKk...", "kKMMKk.W", "kMMmMKWk", "kKKKKKWW", "wWWWWWWw"], up: [".kKKKk.", "kKMMMKk", "kMMmMMk", "kKKKKKk", "wWWWWWw"], pal: { k: "#15161c", K: "#262833", M: "#3b3e4d", m: "#5a5e72", W: "#f3f0e6", w: "#cfc8b6" } }, thao_hai: { down: ["..b4b..", ".4bBb4.", "34B4B43", "tTyTyTt", "TtTtTtT"], side: [".b4b....", ".4bB4b..", "344bB443", "tTyTyTyT", ".TtTtTt."], up: ["..b4b..", ".34443.", ".3bBb3.", "tTyTyTt", "TtTtTtT"], pal: { t: "#9a783a", T: "#c9a35a", y: "#ead08c", b: "#55361c", B: "#7d532d" } }, chien_ngoa: { down: [".GYGGg.", ".kLlLk.", ".kEeEk.", ".kEeEk.", ".kGYGk.", "kKLlLKk", "kLEeELk", "kkkkkkk"], side: [".GYGg...", ".kLlk...", ".kLlEk..", ".kLlEk..", ".kGYGk..", "kLLlLKk.", "kLLLLEEk", "kkkkkkkk"], up: [".GYGGg.", ".kLlLk.", ".kLlLk.", ".kKLKk.", ".kGYGk.", "kKLlLKk", "kKLLLKk", "kkkkkkk"], pal: { k: "#120f0c", K: "#2e241c", L: "#4b3b2c", l: "#715841", e: "#5f6c7d", E: "#aab7c6", G: "#c99a3a", g: "#8a6420", Y: "#f2d58c" } }, bach_ngoc_ly: { down: [".qQQQq.", "qWWWWWq", "qWcJcWq", "qWWjWWq", "qQQQQQq"], side: [".qQQq...", "qWWWWq..", "qWcWcWJq", "qWWWWWjq", ".QQQQQQq"], up: [".qQQQq.", "qWWWWWq", "qWcWcWq", "qWWWWWq", "qQQQQQq"], pal: { q: "#6a7480", Q: "#b2bcc6", W: "#f7f6f1", c: "#c9d2db", j: "#3f9a76", J: "#9fe6c2" } } };
  function uO(a, s) {
    if ("toc_truong_y" !== s.cfg.outfit)
      if ("long_tuong_y" !== s.cfg.outfit) {
        if ("none" !== s.cfg.shoes && !s.p.sit && "quan_dui" !== s.cfg.outfit)
          if (kn(s.cfg)) {
            !function (S, a) {
              for (var s = pn, o = 0; o < 2; o++) {
                var i = a.legs[o];
                var B = i.x - 1;
                var n = i.w + 2;
                var O = i.foot - 4;
                e.r(S, B, O + 2, n, 2, s.line);
                e.r(S, B + 1, O + 1, n - 2, 2, s.base);
                e.r(S, B + 1, O + 1, n - 2, 1, s.hi);
                e.r(S, B + 1, O, 1, 2, s.deep);
                e.r(S, B + n - 2, O, 1, 2, s.deep);
                e.r(S, B + 2, O + 3, Math.max(1, n - 4), 1, s.line);
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
                                if (JO[s.cfg.shoes]) {
                                  !function (S, e, a) {
                                    for (var s = m(Object.assign({}, a.pal), e), o = e.g.side ? a.side : e.g.back ? a.up : a.down, i = 0; i < 2; i++) {
                                      var B = e.legs[i];
                                      Na(S, B.x - 1, B.foot - o.length, o, s, !1);
                                    }
                                  }(a, s, JO[s.cfg.shoes]);
                                }
                                else {
                                  for (var o = D[s.cfg.shoes] || (g[s.cfg.outfit] ? D.ink : G.leather), i = 0; i < 2; i++) {
                                    var B = s.legs[i];
                                    var n = B.x - 1;
                                    var O = B.foot - 5;
                                    var t = B.w + 3;
                                    e.r(a, n + 1, O, t - 2, 5, o.base);
                                    M(a, n, O + 2, t, 3, o);
                                    e.r(a, n + 1, O + 1, t - 2, 1, o.hi);
                                    e.r(a, n, O + 4, t, 1, o.line);
                                    e.r(a, n + 2, O + 2, 2, 1, o.shade);
                                  }
                                }
                              else {
                                !function (S, a) {
                                  if (!a.p.sit) {
                                    for (var s = a.material, o = s.cloth, i = s.trim, B = 0; B < 2; B++) {
                                      var n = a.legs[B];
                                      var O = n.x - 1;
                                      var t = n.w + 2;
                                      var h = n.foot;
                                      var r = h - 9;
                                      e.r(S, O, r, t, h - r, o.line);
                                      e.r(S, O + 1, r + 1, t - 2, h - r - 2, o.base);
                                      e.r(S, O + 1, r + 1, 1, h - r - 3, o.shade);
                                      e.r(S, O + t - 2, r + 2, 1, h - r - 4, o.hi);
                                      e.r(S, O, r, t, 1, i.shade);
                                      e.dot(S, O + 1, r, i.hi);
                                      e.dot(S, O + t - 2, r, i.base);
                                      e.line(S, O + 1, r + 3, O + t - 2, r + 5, i.deep);
                                      e.dot(S, O + 2, r + 4, i.base);
                                      e.r(S, O, h - 1, t, 1, i.deep);
                                      e.r(S, O + 1, h - 1, t - 2, 1, i.base);
                                      if (a.g.side) {
                                        e.dot(S, O + t - 1, h - 2, i.hi);
                                        e.dot(S, O + t - 2, h - 2, i.base);
                                      }
                                      else {
                                        e.dot(S, O + 1, h - 2, i.shade);
                                        e.dot(S, O + t - 2, h - 2, i.hi);
                                      }
                                    }
                                  }
                                }(a, s);
                              }
                            else {
                              !function (S, a) {
                                if (!a.p.sit) {
                                  for (var s = a.material, o = s.pants, i = s.trim, B = 0; B < 2; B++) {
                                    var n = a.legs[B];
                                    var O = n.x - 1;
                                    var t = n.w + 2;
                                    var h = n.foot;
                                    e.r(S, O, h - 6, t, 6, o.line);
                                    e.r(S, O + 1, h - 5, t - 2, 4, o.deep);
                                    e.r(S, O + 1, h - 5, 1, 3, o.shade);
                                    e.r(S, O, h - 6, t, 1, i.shade);
                                    e.dot(S, O + 1, h - 6, i.hi);
                                    e.r(S, O, h - 1, t, 1, i.deep);
                                    e.r(S, O + 1, h - 1, t - 2, 1, i.base);
                                  }
                                }
                              }(a, s);
                            }
                          else {
                            !function (S, a) {
                              if (!a.p.sit) {
                                for (var s = a.material, o = s.pants, i = s.trim, B = 0; B < 2; B++) {
                                  var n = a.legs[B];
                                  var O = n.x - 1;
                                  var t = n.w + 2;
                                  var h = n.foot;
                                  e.r(S, O, h - 6, t, 6, o.line);
                                  e.r(S, O + 1, h - 5, t - 2, 4, o.deep);
                                  e.r(S, O + 1, h - 5, 1, 4, o.base);
                                  e.r(S, O, h - 7, t, 1, i.shade);
                                  e.dot(S, O + 1, h - 7, i.hi);
                                  e.dot(S, O + t - 1, h - 7, i.deep);
                                  e.r(S, O, h - 1, t, 1, o.line);
                                  if (a.g.side) {
                                    e.dot(S, O + t - 1, h - 2, i.base);
                                    e.dot(S, O + t - 2, h - 1, i.shade);
                                  }
                                  else {
                                    e.dot(S, O + 1, h - 2, i.shade);
                                    e.dot(S, O + t - 2, h - 2, i.base);
                                  }
                                }
                              }
                            }(a, s);
                          }
                        else {
                          !function (S, a) {
                            if (!a.p.sit) {
                              for (var s = a.material.trim, o = 0; o < 2; o++) {
                                var i = a.legs[o];
                                var B = i.x - 1;
                                var n = i.w + 3;
                                var O = i.foot;
                                e.r(S, B, O - 6, n, 6, "#111827");
                                e.r(S, B + 1, O - 6, n - 2, 4, "#526d86");
                                e.r(S, B + 1, O - 6, 1, 4, "#36516a");
                                e.r(S, B + n - 2, O - 5, 1, 3, "#7f9ab3");
                                e.r(S, B, O - 6, n, 1, s.deep);
                                e.r(S, B + 1, O - 6, n - 2, 1, s.base);
                                e.dot(S, B + 1, O - 6, s.hi);
                                e.r(S, B + 1, O - 2, n - 2, 1, "#1d2d44");
                                e.r(S, B + 1, O - 1, n - 2, 1, s.shade);
                                e.dot(S, B + n - 2, O - 2, s.hi);
                              }
                            }
                          }(a, s);
                        }
                      else {
                        !function (a, s) {
                          if (!s.p.sit) {
                            for (var o = g.xich_ma_y.bone, i = S.Palette.pick("SKIN", s.cfg.skin, "light"), B = 0; B < 2; B++) {
                              var n = s.legs[B];
                              var O = n.foot;
                              var t = n.x - 1;
                              var h = n.w + 2;
                              e.r(a, t, O - 2, h, 1, i.deep);
                              e.r(a, t, O - 1, h, 1, i.line);
                              e.dot(a, t, O - 1, o.base);
                              e.dot(a, n.x + Math.floor(n.w / 2), O - 1, o.base);
                              e.dot(a, t + h - 1, O - 1, o.base);
                            }
                          }
                        }(a, s);
                      }
                    else {
                      !function (S, a) {
                        if (!a.p.sit) {
                          for (var s = "#09070f", o = a.material.trim, i = 0; i < 2; i++) {
                            var B = a.legs[i];
                            var n = B.x - 1;
                            var O = B.w + 3;
                            var t = B.foot;
                            e.r(S, n, t - 6, O, 6, s);
                            e.r(S, n + 1, t - 6, O - 2, 4, "#4b2d61");
                            e.r(S, n + 1, t - 6, 1, 4, "#302044");
                            e.r(S, n + O - 2, t - 5, 1, 3, "#76518a");
                            e.r(S, n, t - 6, O, 1, o.deep);
                            e.r(S, n + 1, t - 6, O - 2, 1, o.base);
                            e.dot(S, n + 1, t - 6, o.hi);
                            e.r(S, n + 1, t - 2, O - 2, 1, "#171020");
                            e.r(S, n, t - 1, O, 1, s);
                            e.r(S, n + 1, t - 1, O - 2, 1, o.shade);
                            e.dot(S, n + O - 2, t - 2, o.base);
                          }
                        }
                      }(a, s);
                    }
                  else {
                    !function (S, a) {
                      if (!a.p.sit) {
                        for (var s = "#3f2b1d", o = "#a9742c", i = "#d9ad55", B = 0; B < 2; B++) {
                          var n = a.legs[B];
                          var O = n.x - 2;
                          var t = n.w + 5;
                          var h = n.foot;
                          e.r(S, O + 2, h - 5, t - 4, 1, s);
                          e.line(S, O + 1, h - 5, O + 3, h - 3, i);
                          e.line(S, O + t - 2, h - 5, O + t - 4, h - 3, o);
                          e.r(S, O + 1, h - 3, t - 2, 1, o);
                          e.r(S, O, h - 2, t, 2, s);
                          e.r(S, O + 1, h - 2, t - 2, 1, i);
                          e.r(S, O, h - 1, t, 1, "#17130f");
                          e.dot(S, O + 2, h - 3, i);
                        }
                      }
                    }(a, s);
                  }
                else {
                  !function (S, a) {
                    if (!a.p.sit) {
                      for (var s = "#d3a24b", o = 0; o < 2; o++) {
                        var i = a.legs[o];
                        var B = i.x - 2;
                        var n = i.w + 5;
                        var O = i.foot;
                        e.r(S, B + 1, O - 5, n - 2, 4, "#554052");
                        e.r(S, B, O - 2, n, 3, "#211a28");
                        e.line(S, B + 1, O - 5, B + n - 2, O - 5, s);
                        e.line(S, B, O, B + n - 1, O, "#120f18");
                        e.dot(S, B + 2, O - 3, s);
                      }
                    }
                  }(a, s);
                }
              else {
                !function (S, a) {
                  if (!a.p.sit) {
                    for (var s = a.material, o = s.pants, i = s.trim, B = 0; B < 2; B++) {
                      var n = a.legs[B];
                      var O = n.x - 1;
                      var t = n.w + 2;
                      var h = n.foot;
                      var r = h - 8;
                      e.r(S, O, r, t, h - r, o.line);
                      e.r(S, O + 1, r + 1, t - 2, h - r - 2, o.base);
                      e.r(S, O + 1, r + 1, 1, h - r - 3, o.shade);
                      e.r(S, O + t - 2, r + 2, 1, h - r - 4, o.hi);
                      e.r(S, O, r, t, 1, i.shade);
                      e.dot(S, O + 1, r, i.hi);
                      e.r(S, O, h - 1, t, 1, i.deep);
                      e.r(S, O + 1, h - 1, t - 2, 1, i.base);
                      if (a.g.side) {
                        e.dot(S, O + t - 1, h - 2, i.hi);
                        e.dot(S, O + t - 2, h - 2, i.base);
                      }
                      else {
                        e.dot(S, O + 1, h - 2, i.shade);
                        e.dot(S, O + t - 2, h - 2, i.hi);
                      }
                    }
                  }
                }(a, s);
              }
            else {
              !function (S, a) {
                if (!a.p.sit) {
                  for (var s = a.material, o = s.pants, i = s.trim, B = 0; B < 2; B++) {
                    var n = a.legs[B];
                    var O = n.x - 1;
                    var t = n.w + 2;
                    var h = n.foot;
                    var r = h - 8;
                    e.r(S, O, r, t, h - r, o.line);
                    e.r(S, O + 1, r + 1, t - 2, h - r - 2, o.base);
                    e.r(S, O + 1, r + 1, 1, h - r - 3, o.shade);
                    e.r(S, O + t - 2, r + 2, 1, h - r - 4, o.hi);
                    e.r(S, O, r, t, 1, i.shade);
                    e.dot(S, O + 1, r, i.hi);
                    var d = a.g.side ? O + t - 3 : O + (B ? t - 3 : 2);
                    e.dot(S, d, r + 2, i.base);
                    e.dot(S, d + 1, r + 3, i.hi);
                    e.dot(S, d, r + 4, i.shade);
                    e.dot(S, d + 1, r + 5, i.base);
                    e.r(S, O, h - 1, t, 1, i.deep);
                    e.r(S, O + 1, h - 1, t - 2, 1, i.base);
                    if (a.g.side) {
                      e.dot(S, O + t - 1, h - 2, i.hi);
                      e.dot(S, O + t - 2, h - 2, i.base);
                    }
                    else {
                      e.dot(S, O + 1, h - 2, i.shade);
                      e.dot(S, O + t - 2, h - 2, i.hi);
                    }
                  }
                }
              }(a, s);
            }
          else {
            !function (S, a) {
              if (!a.p.sit) {
                for (var s = a.material, o = s.armor, i = s.trim, B = 0; B < 2; B++) {
                  var n = a.legs[B];
                  var O = n.x - 1;
                  var t = n.w + 2;
                  var h = n.foot;
                  var r = h - 7;
                  e.r(S, O, r, t, h - r, o.line);
                  e.r(S, O + 1, r + 1, t - 2, h - r - 2, o.base);
                  e.r(S, O + 1, r + 1, 1, h - r - 3, o.shade);
                  e.r(S, O + t - 2, r + 2, 1, h - r - 4, o.hi);
                  e.r(S, O, r, t, 1, i.shade);
                  e.dot(S, O + 1, r, i.hi);
                  e.dot(S, O + t - 2, r, i.base);
                  e.line(S, O + 1, r + 3, O + t - 2, r + 3, i.deep);
                  e.dot(S, O + 2, r + 3, i.base);
                  e.r(S, O, h - 1, t, 1, i.deep);
                  e.r(S, O + 1, h - 1, t - 2, 1, i.base);
                  if (a.g.side) {
                    e.dot(S, O + t - 1, h - 2, i.hi);
                    e.dot(S, O + t - 2, h - 2, i.base);
                  }
                  else {
                    e.dot(S, O + 1, h - 2, i.shade);
                    e.dot(S, O + t - 2, h - 2, i.hi);
                  }
                }
              }
            }(a, s);
          }
      }
      else {
        !function (S, e) {
          if (!e.p.sit) {
            for (var a = li, s = fi(S), o = s.rect, i = s.dot, B = 0; B < 2; B++) {
              var n = e.legs[B];
              var O = n.x - 1;
              var t = n.foot - 6;
              var h = n.w + 2;
              o(O, t, h, 6, a.ink);
              o(O + 1, t + 1, h - 2, 4, a.navy);
              o(O + 1, t + 1, 1, 3, a.steelHi);
              o(O, t, h, 1, a.goldDark);
              o(O + 1, t, h - 2, 1, a.gold);
              i(O + 1, t, a.goldHi);
              o(O + 1, t + 5, h - 1, 1, a.gold);
              o(O + h - 2, t + 3, 2, 2, a.gold);
              i(O + h - 2, t + 3, a.goldHi);
            }
          }
        }(a, s);
      }
    else {
      !function (S, a) {
        if (!a.p.sit) {
          for (var s = 0; s < 2; s++) {
            var o = a.legs[s];
            var i = o.x - 1;
            var B = o.w + 2;
            var n = o.foot;
            var O = n - 8;
            e.r(S, i, O, B, n - O, Pi.j);
            e.r(S, i + 1, O + 1, B - 2, n - O - 2, Pi.p);
            e.r(S, i + 1, O + 1, 1, n - O - 3, Pi.r);
            e.r(S, i, O, B, 1, Pi.a);
            e.dot(S, i + 1, O, Pi.C);
            var t = a.g.side ? i + B - 3 : i + (s ? B - 3 : 2);
            e.dot(S, t, O + 2, Pi.G);
            e.dot(S, t + 1, O + 3, Pi.Y);
            e.dot(S, t, O + 4, Pi.e);
            e.r(S, i, n - 1, B, 1, Pi.A);
            e.r(S, i + 1, n - 1, B - 2, 1, Pi.a);
            if (a.g.side) {
              e.dot(S, i + B - 1, n - 2, Pi.C);
              e.dot(S, i + B - 2, n - 2, Pi.c);
            }
            else {
              e.dot(S, i + 1, n - 2, Pi.c);
              e.dot(S, i + B - 2, n - 2, Pi.C);
            }
          }
        }
      }(a, s);
    }
  }
  var MO = { xa: { d: "#0b2a1a", b: "#1f7a45", h: "#5fd08a", s: "#123f26", f1: "#f4c542", f2: "#d9412b", f3: "#fff2b8", band: "#8d6510", gem: "#d9412b" }, hau: { d: "#2d1808", b: "#a2662a", h: "#e0a458", s: "#5a3414", f1: "#3fb6c9", f2: "#f28c28", f3: "#fff0c8", band: "#5a2f06", gem: "#3fb6c9", ear: "#e8a598" }, nhim: { d: "#1d1626", b: "#6a5690", h: "#c4b5dc", s: "#382a4f", f1: "#f1e6c8", f2: "#e2602c", f3: "#ffffff", band: "#5e5238", gem: "#e2602c" } };
  function wO(S, a, s, o, i, B, n) {
    for (var O = 0; O < i; O++) {
      var t = Math.round(a + o * O);
      var h = s - O;
      var r = O >= i - 3;
      e.dot(S, t, h, r ? n : 0 === O ? B.d : B.f3);
      if (O > 0) {
        e.dot(S, t + 1, h, r ? B.d : O % 2 ? B.f1 : B.f3);
      }
    }
    e.dot(S, Math.round(a + o * i), s - i, B.d);
  }
  function NO(S, a, s) {
    var o;
    var i;
    var B = MO[s];
    var n = a.head;
    var O = n.w;
    var t = n.y;
    var h = n.x + (O >> 1);
    var r = !!a.g.side;
    var d = !!a.g.back;
    var l = "left" === a.dir ? -1 : 1;
    var f = r ? l > 0 ? n.x : n.x + O - 1 : h;
    var c = r ? l > 0 ? n.x + O - 1 : n.x : h;
    if ("xa" === s)
      if (r) {
        for (o = 0; o < 11; o++) {
          var b = o < 3 ? 3 : o < 8 ? 4 : 3;
          var G = l > 0 ? f - b : f + 1;
          e.r(S, G, t + 2 + o, b, 1, o % 2 ? B.b : B.s);
          e.dot(S, l > 0 ? G : G + b - 1, t + 2 + o, B.d);
          if (o % 3 == 1) {
            e.dot(S, G + (l > 0 ? 1 : b - 2), t + 2 + o, B.h);
          }
        }
      }
      else {
        for (i = -1; i <= 1; i += 2)
          for (o = 0; o < 12; o++) {
            var H = o < 2 ? 1 : o < 9 ? 3 : 2;
            var g = i < 0 ? n.x - H : n.x + O;
            e.r(S, g, t + 3 + o, H, 1, o % 2 ? B.b : B.s);
            e.dot(S, i < 0 ? g : g + H - 1, t + 3 + o, B.d);
            if (o % 3 == 1 && H > 1) {
              e.dot(S, i < 0 ? g + 1 : g + H - 2, t + 3 + o, B.h);
            }
          }
      }
    else if ("hau" === s) {
      var x = r ? [[l > 0 ? n.x + 3 : n.x + O - 7, t + 6]] : [[n.x - 3, t + 6], [n.x + O - 1, t + 6]];
      for (o = 0; o < x.length; o++) {
        var D = x[o][0];
        var W = x[o][1];
        e.r(S, D, W, 4, 5, B.d);
        e.r(S, D + 1, W + 1, 2, 3, B.b);
        e.dot(S, D + 1, W + 1, B.ear);
        e.dot(S, D + 1, W + 2, B.ear);
        e.dot(S, D + 2, W + 1, B.h);
      }
    }
    else if (r) {
      for (o = 0; o < 5; o++) {
        var J = f - 1 * l;
        var u = t + 2 + 2 * o;
        e.line(S, J, u, J - l * (3 + o % 2), u - 2 + o, o % 2 ? B.b : B.h);
        e.dot(S, J - l * (4 + o % 2), u - 2 + o, B.d);
      }
    }
    else {
      for (i = -1; i <= 1; i += 2)
        for (o = 0; o < 3; o++) {
          var M = h + i * (3 + 2 * o);
          var w = t + 1;
          e.line(S, M, w, M + i * (2 + o), w - 3 - o, o % 2 ? B.h : B.b);
          e.dot(S, M + i * (2 + o), w - 3 - o, B.d);
        }
    }
    var N = t + 1;
    if (r) {
      for (o = 0; o < 5; o++)
        wO(S, f + l * (3 - o), N, -l * (.55 + .12 * o), 8 - Math.abs(o - 2), B, o % 2 ? B.f2 : B.f1);
    }
    else {
      for (o = -3; o <= 3; o++)
        wO(S, h + 2 * o, N, .28 * o, 8 - Math.abs(o) + ("nhim" === s ? 1 : 0), B, Math.abs(o) % 2 ? B.f2 : B.f1);
    }
    if (d) {
      e.r(S, n.x, t + 2, O, 2, B.band);
    }
    else {
      if (r) {
        e.r(S, l > 0 ? n.x + 1 : n.x, t + 2, O - 1, 2, B.band);
        e.dot(S, c, t + 2, B.gem);
      }
      else {
        e.r(S, n.x, t + 2, O, 2, B.band);
        e.r(S, n.x, t + 2, O, 1, B.d);
        e.dot(S, h, t + 2, B.gem);
        e.dot(S, h - 1, t + 3, B.f1);
        e.dot(S, h + 1, t + 3, B.f1);
      }
    }
  }
  var pO = { xa: [".gggg..", "g....g.", ".ggg...", "...ggg.", ".g...g.", "..gggR."], hau: [".b...b.", "bpbbbpb", ".bfffb.", ".fdfdf.", ".fffff.", "..fmf.."], nhim: ["q..q..q", ".q.q.q.", "..qqq..", ".qwwwq.", "qwwewwq", ".qqqqq."] };
  var kO = { xa: { g: "#f0c445", R: "#d9412b" }, hau: { b: "#3d2211", p: "#d98a6a", f: "#d9a566", d: "#1c0e05", m: "#7a3a1c" }, nhim: { q: "#eadba6", w: "#8570ab", e: "#e2602c" } };
  function mO(S, e, a) {
    if (!e.g.back) {
      var s = e.torso;
      Na(S, s.x + (s.w - 7 >> 1) + (e.g.side ? "left" === e.dir ? -1 : 1 : 0), s.y + 3, pO[a], kO[a], !1);
    }
  }
  function vO(s, o, i) {
    var B = S.Palette.pick("AURA", o.cfg.aura, "none");
    if (B) {
      for (var n = i % 4, O = o.torso, t = 0; t < 4; t++)
        if ((t + n) % 4 < 2) {
          var h = O.x + (t % 2 ? O.w + 5 : -5);
          var r = O.y + a.TORSO_H - 5 * t - n;
          e.dot(s, h, r, B.core);
          e.dot(s, h, r + 1, B.glow);
        }
    }
  }
  var yO = [];
  var LO = { down: [], up: [], right: [] };
  s.LAYERS = [{ id: "hair_back", z: 0, draw: function (S, e) {
        DO(S, e, "back");
      } }, { id: "body", z: 10, draw: Jn }, { id: "eyes", z: 11, draw: Gn }, { id: "outfit_under", z: 20, draw: vn }, { id: "shoes", z: 21, draw: uO }, { id: "outfit", z: 30, draw: sO }, { id: "arms_front", z: 40, draw: un }, { id: "sleeves_front", z: 41, draw: oO }, { id: "hair_front", z: 50, draw: function (S, e) {
        DO(S, e, "front");
      } }, { id: "beard", z: 55, draw: function (a, s) {
        var o = s.cfg.beard || "none";
        if ("none" !== o && !s.g.back)
          if ("nam_y_rau" !== o)
            if ("man_ho_tu_y_rau" !== o)
              if ("man_ho_tu_rau" !== o)
                if ("dai_phu_rau" !== o)
                  if (WO[o]) {
                    if (!(s.g.female)) {
                      (function (e, a, s) {
                        var o = a.head;
                        var i = S.Palette.pick("HAIR", a.cfg.hairColor, "hac");
                        var B = { o: i.line, O: i.deep, s: i.shade, S: i.base, h: i.hi, H: i.hi2 || i.hi };
                        var n = a.g.side ? Us(a) : qs(a);
                        var O = s.sway && n ? Rs(n, s.sway, 8) : null;
                        var t = Hs(a);
                        if (a.g.side) {
                          Na(e, o.x + s.sx, o.y + s.sy, s.s, B, !1, O, t);
                        }
                        else {
                          Na(e, o.x + s.dx, o.y + s.dy, s.d, B, !1, O, t);
                        }
                      })(a, s, WO[o]);
                    }
                  }
                  else {
                    var i = s.head;
                    var B = S.Palette.pick("HAIR", "nau" === s.cfg.hairColor ? "nau" : "hac", "hac");
                    var n = i.x;
                    var O = i.y;
                    var t = i.w;
                    var h = n + Math.floor(t / 2);
                    if ("ria_kiem" !== o)
                      if ("rau_de" !== o) {
                        if ("quai_non" === o) {
                          if (s.g.side) {
                            u(a, [[n + 3, O + 9], [n + 5, O + 10], [n + 6, O + 14], [n + t - 3, O + 15], [n + t - 5, O + 18], [n + 6, O + 17], [n + 3, O + 13]], B.deep);
                            e.line(a, n + 4, O + 10, n + 6, O + 15, B.base);
                            e.line(a, n + 6, O + 16, n + t - 4, O + 16, B.hi);
                            return void e.dot(a, n + t - 5, O + 18, B.shade);
                          }
                          e.r(a, n, O + 9, 2, 6, B.deep);
                          e.r(a, n + t - 2, O + 9, 2, 6, B.base);
                          u(a, [[n + 1, O + 13], [n + 4, O + 15], [n + 6, O + 17], [n + t - 7, O + 17], [n + t - 5, O + 15], [n + t - 2, O + 13], [n + t - 3, O + 17], [n + t - 7, O + 20], [n + 6, O + 20], [n + 2, O + 17]], B.deep);
                          e.line(a, n + 2, O + 14, n + 6, O + 18, B.base);
                          e.line(a, n + t - 3, O + 14, n + t - 7, O + 18, B.hi);
                          e.r(a, n + 7, O + 18, Math.max(2, t - 14), 2, B.base);
                          e.dot(a, h, O + 20, B.shade);
                        }
                      }
                      else {
                        if (s.g.side) {
                          e.line(a, n + t - 7, O + 12, n + t - 3, O + 13, B.deep);
                          u(a, [[n + t - 6, O + 15], [n + t - 3, O + 15], [n + t - 5, O + 23], [n + t - 7, O + 20]], B.deep);
                          e.line(a, n + t - 5, O + 16, n + t - 5, O + 21, B.base);
                          e.dot(a, n + t - 4, O + 16, B.hi);
                        }
                        else {
                          e.line(a, h - 1, O + 13, h - 4, O + 14, B.deep);
                          e.line(a, h + 1, O + 13, h + 4, O + 14, B.line);
                          u(a, [[h - 2, O + 16], [h + 2, O + 16], [h + 1, O + 23], [h, O + 25], [h - 2, O + 22]], B.deep);
                          e.r(a, h - 1, O + 17, 2, 6, B.base);
                          e.dot(a, h, O + 17, B.hi);
                          e.dot(a, h - 1, O + 23, B.shade);
                        }
                      }
                    else {
                      if (s.g.side) {
                        e.line(a, n + t - 7, O + 12, n + t - 3, O + 13, B.deep);
                        e.dot(a, n + t - 4, O + 12, B.hi);
                        e.dot(a, n + t - 2, O + 14, B.line);
                      }
                      else {
                        e.line(a, h - 1, O + 13, h - 5, O + 14, B.deep);
                        e.line(a, h + 1, O + 13, h + 5, O + 14, B.line);
                        e.dot(a, h - 3, O + 13, B.base);
                        e.dot(a, h + 3, O + 13, B.hi);
                      }
                    }
                  }
                else {
                  !function (S, a) {
                    if (!a.g.back) {
                      var s = a.head;
                      var o = s.x;
                      var i = s.y;
                      var B = s.w;
                      var n = o + Math.floor(B / 2);
                      var O = Hn;
                      if (a.g.side) {
                        e.line(S, o + B - 6, i + 12, o + B - 2, i + 12, O.base);
                        tO(S, [[o + B - 6, i + 13], [o + B - 1, i + 13], [o + B - 1, i + 18], [o + B - 3, i + 28], [o + B - 4, i + 33], [o + B - 6, i + 27], [o + B - 7, i + 18]], O.base, O.shade);
                        return void e.line(S, o + B - 4, i + 15, o + B - 4, i + 29, O.hi);
                      }
                      e.line(S, n - 1, i + 12, n - 4, i + 13, O.base);
                      e.line(S, n - 4, i + 13, n - 5, i + 16, O.shade);
                      e.line(S, n, i + 12, n + 3, i + 13, O.base);
                      e.line(S, n + 3, i + 13, n + 4, i + 16, O.shade);
                      tO(S, [[n - 4, i + 14], [n + 3, i + 14], [n + 4, i + 19], [n + 3, i + 26], [n + 1, i + 33], [n, i + 35], [n - 1, i + 35], [n - 2, i + 33], [n - 4, i + 26], [n - 5, i + 19]], O.base, O.shade);
                      e.line(S, n - 2, i + 15, n - 2, i + 30, O.hi);
                      e.line(S, n + 1, i + 16, n + 1, i + 31, O.shade);
                      e.line(S, n - 4, i + 19, n - 3, i + 25, O.hi);
                      e.dot(S, n, i + 34, O.hi);
                    }
                  }(a, s);
                }
              else {
                if (!(s.g.female)) {
                  (function (S, a) {
                    if (!a.g.back) {
                      var s = a.head;
                      var o = s.x;
                      var i = s.y;
                      var B = s.w;
                      var n = o + Math.floor(B / 2);
                      var O = "#66584c";
                      var t = "#8d7863";
                      var h = "#b09a79";
                      var r = "#d4bd94";
                      var d = "#f2ddb1";
                      if (a.g.side) {
                        e.fatLine(S, o + B - 7, i + 11, o + B - 3, i + 13, 2, O);
                        e.line(S, o + B - 6, i + 11, o + B - 3, i + 12, r);
                        u(S, [[o + B - 7, i + 14], [o + B - 2, i + 15], [o + B - 3, i + 20], [o + B - 5, i + 23], [o + B - 4, i + 25], [o + B - 6, i + 28], [o + B - 9, i + 26], [o + B - 8, i + 21], [o + B - 9, i + 17]], O);
                        u(S, [[o + B - 6, i + 16], [o + B - 3, i + 17], [o + B - 4, i + 21], [o + B - 6, i + 24], [o + B - 6, i + 26], [o + B - 8, i + 24], [o + B - 7, i + 19]], h);
                        e.line(S, o + B - 6, i + 17, o + B - 6, i + 23, r);
                        e.line(S, o + B - 6, i + 24, o + B - 7, i + 27, t);
                        return void e.dot(S, o + B - 6, i + 28, d);
                      }
                      e.fatLine(S, n - 5, i + 11, n - 1, i + 13, 2, O);
                      e.fatLine(S, n + 1, i + 13, n + 5, i + 11, 2, O);
                      e.line(S, n - 4, i + 11, n - 1, i + 12, r);
                      e.line(S, n + 1, i + 12, n + 4, i + 11, d);
                      e.dot(S, n - 5, i + 12, t);
                      e.dot(S, n + 5, i + 12, h);
                      u(S, [[o + 1, i + 14], [o + 4, i + 14], [o + 5, i + 17], [o + 4, i + 20], [o + 3, i + 22], [o + 4, i + 24], [o + 2, i + 26], [o - 1, i + 24], [o, i + 21], [o - 2, i + 19], [o - 1, i + 16]], O);
                      u(S, [[o + 2, i + 16], [o + 4, i + 16], [o + 4, i + 19], [o + 2, i + 22], [o + 3, i + 24], [o + 1, i + 25], [o + 1, i + 21], [o, i + 18]], t);
                      u(S, [[o + B - 1, i + 14], [o + B - 4, i + 14], [o + B - 5, i + 17], [o + B - 4, i + 20], [o + B - 3, i + 22], [o + B - 4, i + 24], [o + B - 2, i + 26], [o + B + 1, i + 24], [o + B, i + 21], [o + B + 2, i + 19], [o + B + 1, i + 16]], O);
                      u(S, [[o + B - 2, i + 16], [o + B - 4, i + 16], [o + B - 4, i + 19], [o + B - 2, i + 22], [o + B - 3, i + 24], [o + B - 1, i + 25], [o + B - 1, i + 21], [o + B, i + 18]], t);
                      e.line(S, o + 2, i + 16, o + 3, i + 21, r);
                      e.line(S, o + B - 2, i + 16, o + B - 3, i + 21, d);
                      u(S, [[o + 4, i + 15], [o + 7, i + 17], [o + B - 7, i + 17], [o + B - 4, i + 15], [o + B - 5, i + 20], [n + 3, i + 23], [n + 2, i + 26], [n, i + 25], [n - 2, i + 26], [n - 3, i + 23], [o + 7, i + 21], [o + 5, i + 18]], O);
                      u(S, [[o + 6, i + 17], [o + 8, i + 18], [o + B - 8, i + 18], [o + B - 6, i + 17], [o + B - 7, i + 21], [n + 2, i + 23], [n + 1, i + 25], [n - 1, i + 24], [n - 2, i + 22], [o + 8, i + 20]], h);
                      e.line(S, o + 6, i + 18, o + 8, i + 21, r);
                      e.line(S, n - 1, i + 18, n - 2, i + 23, d);
                      e.line(S, n + 2, i + 18, n + 2, i + 23, r);
                      e.line(S, o + B - 7, i + 18, o + B - 8, i + 21, t);
                      e.dot(S, n - 1, i + 25, r);
                      e.dot(S, n + 1, i + 25, d);
                    }
                  })(a, s);
                }
              }
            else {
              if (!(s.g.female)) {
                (function (S, e) {
                  if (!e.g.back) {
                    var a = e.head;
                    var s = Hs(e);
                    if (e.g.side) {
                      Na(S, a.x + 2, a.y + 6, as, Ta, !1, null, s);
                    }
                    else {
                      Na(S, a.x - 1, a.y + 7, es, Ta, !1, null, s);
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
                  var o = s.x;
                  var i = s.y;
                  var B = s.w;
                  var n = o + Math.floor(B / 2);
                  var O = "#211a28";
                  var t = "#5c475d";
                  var h = "#92728a";
                  if (a.g.side) {
                    e.line(S, o + B - 7, i + 12, o + B - 3, i + 13, h);
                    u(S, [[o + B - 7, i + 15], [o + B - 2, i + 15], [o + B - 4, i + 21], [o + B - 6, i + 26], [o + B - 8, i + 23], [o + B - 8, i + 18]], O);
                    e.line(S, o + B - 6, i + 16, o + B - 5, i + 23, t);
                    return void e.dot(S, o + B - 6, i + 25, h);
                  }
                  e.line(S, n - 1, i + 13, n - 5, i + 14, h);
                  e.line(S, n + 1, i + 13, n + 5, i + 14, h);
                  e.dot(S, n - 4, i + 13, t);
                  e.dot(S, n + 4, i + 13, t);
                  e.r(S, o + 1, i + 15, 2, 6, O);
                  e.r(S, o + B - 2, i + 15, 2, 6, t);
                  u(S, [[o + 4, i + 17], [o + 7, i + 18], [o + B - 7, i + 18], [o + B - 4, i + 17], [o + B - 6, i + 22], [n + 2, i + 25], [n, i + 28], [n - 2, i + 25], [o + 6, i + 22]], O);
                  u(S, [[o + 7, i + 19], [o + 9, i + 20], [o + B - 9, i + 20], [o + B - 7, i + 19], [o + B - 8, i + 22], [n + 1, i + 24], [n, i + 26], [n - 1, i + 24], [o + 8, i + 22]], t);
                  e.line(S, o + 7, i + 19, o + 9, i + 22, h);
                  e.line(S, n, i + 20, n, i + 26, h);
                  e.dot(S, n, i + 27, h);
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
                  var o = pa(e);
                  var i = e.g.back ? LS : e.g.side ? CS : yS;
                  Na(S, a.x - (e.g.side ? 4 : 2), a.y - 5, i, s, !1, null, function (S, e) {
                    return e < 0 || S < 0 || S > 31 || !(!o || !o(S, e));
                  });
                })(S, e);
              }
            }
            else {
              NO(S, e, "nhim");
            }
          }
          else {
            NO(S, e, "hau");
          }
        }
        else {
          NO(S, e, "xa");
        }
      } }, { id: "bag", z: 61, draw: function (S, a) {
        if ("back_sword" === a.cfg.bag) {
          var s = a.torso;
          var o = a.g.back;
          var i = a.g.side ? { x: s.x + 1, y: s.y - 8 } : { x: s.x + s.w - 1, y: s.y - 8 };
          var B = a.g.side ? { x: s.x + s.w, y: s.y + s.h + 9 } : { x: s.x + 1, y: s.y + s.h + 8 };
          e.fatLine(S, i.x, i.y, B.x, B.y, 4, "#11151d");
          e.fatLine(S, i.x, i.y, B.x, B.y, 2, "#303a49");
          e.line(S, i.x + 1, i.y, B.x + 1, B.y, o ? "#8b99aa" : "#59697b");
          e.fatLine(S, i.x, i.y, i.x, i.y - 5, 3, "#463426");
          e.fatLine(S, i.x - 3, i.y - 1, i.x + 3, i.y - 1, 2, "#a38a5d");
          e.dot(S, i.x, i.y - 5, "#d2bd83");
          e.line(S, s.x, s.y + 1, s.x + s.w, s.y + s.h - 1, "#6c5941");
        }
      } }, { id: "accessory", z: 62, draw: function (a, s) {
        if ("huan_su" !== s.cfg.accessory)
          if ("tho_ren_moi" !== s.cfg.accessory)
            if ("xa_toc" !== s.cfg.accessory)
              if ("hau_toc" !== s.cfg.accessory)
                if ("nhim_toc" !== s.cfg.accessory) {
                  if ("npc_tattoo" === s.cfg.accessory) {
                    if (s.g.back) {
                      return;
                    }
                    var o = s.torso;
                    var i = o.x;
                    var B = o.y;
                    var n = { line: "#253445", deep: "#31475a", base: "#52697a", hi: "#78909a" };
                    if (s.g.side) {
                      e.line(a, i + o.w - 2, B + 3, i + o.w, B + 8, n.deep);
                      e.line(a, i + o.w - 1, B + 6, i + o.w - 3, B + 12, n.base);
                      return void e.dot(a, i + o.w - 2, B + 13, n.hi);
                    }
                    var O = i + Math.floor(o.w / 2);
                    e.line(a, O, B + 2, O - 2, B + 5, n.deep);
                    e.line(a, O, B + 2, O + 2, B + 5, n.deep);
                    e.line(a, O - 2, B + 5, O - 4, B + 7, n.base);
                    e.line(a, O + 2, B + 5, O + 4, B + 7, n.base);
                    e.line(a, O - 4, B + 7, O - 2, B + 10, n.hi);
                    e.line(a, O + 4, B + 7, O + 2, B + 10, n.hi);
                    e.r(a, O - 5, B + 8, 2, 2, n.deep);
                    e.r(a, O + 4, B + 8, 2, 2, n.deep);
                    e.line(a, O - 2, B + 10, O - 4, B + 13, n.base);
                    e.line(a, O + 2, B + 10, O + 4, B + 13, n.base);
                    e.r(a, O - 1, B + 11, 2, 2, n.deep);
                    e.dot(a, O, B + 14, n.hi);
                    e.line(a, i - 1, B + 10, i + 1, B + 13, n.base);
                    return void e.line(a, i + o.w + 1, B + 10, i + o.w - 1, B + 13, n.base);
                  }
                  if ("duoc_truong" !== s.cfg.accessory) {
                    if ("quy_dien" === s.cfg.accessory) {
                      var t = s.head;
                      var r = "#ece3cc";
                      var d = "#8f8468";
                      var l = "#3a3326";
                      var f = "#c0302a";
                      var c = "#140f0c";
                      if (s.g.back) {
                        e.line(a, t.x + 1, t.y + 3, t.x, t.y - 2, d);
                        e.line(a, t.x + t.w - 2, t.y + 3, t.x + t.w - 1, t.y - 2, d);
                        e.dot(a, t.x, t.y - 2, r);
                        return void e.dot(a, t.x + t.w - 1, t.y - 2, r);
                      }
                      if (s.g.side) {
                        u(a, [[t.x + t.w - 7, t.y + 4], [t.x + t.w + 1, t.y + 4], [t.x + t.w + 1, t.y + 13], [t.x + t.w - 6, t.y + 14]], r);
                        e.line(a, t.x + t.w - 7, t.y + 4, t.x + t.w + 1, t.y + 4, d);
                        e.line(a, t.x + t.w - 6, t.y + 14, t.x + t.w + 1, t.y + 13, l);
                        e.r(a, t.x + t.w - 4, t.y + 7, 3, 3, c);
                        e.dot(a, t.x + t.w - 3, t.y + 8, "#ff6a4a");
                        e.line(a, t.x + t.w - 5, t.y + 4, t.x + t.w - 6, t.y - 2, d);
                        e.dot(a, t.x + t.w - 6, t.y - 2, r);
                        return void e.line(a, t.x + t.w - 6, t.y + 11, t.x + t.w - 2, t.y + 12, f);
                      }
                      var b = t.x + Math.floor(t.w / 2);
                      u(a, [[t.x - 1, t.y + 4], [t.x + t.w, t.y + 4], [t.x + t.w - 1, t.y + 12], [b, t.y + 14], [t.x, t.y + 12]], r);
                      e.line(a, t.x - 1, t.y + 4, t.x + t.w, t.y + 4, d);
                      e.line(a, t.x, t.y + 12, b, t.y + 14, l);
                      e.line(a, t.x + t.w - 1, t.y + 12, b, t.y + 14, l);
                      for (var g = 0; g < 2; g++) {
                        var x = t.x + H.eyes[g];
                        e.r(a, x, t.y + 7, 3, 3, c);
                        e.dot(a, x + 1, t.y + 8, "#ff6a4a");
                      }
                      e.line(a, t.x + 1, t.y + 4, t.x - 1, t.y - 2, d);
                      e.dot(a, t.x - 1, t.y - 2, r);
                      e.line(a, t.x + t.w - 2, t.y + 4, t.x + t.w, t.y - 2, d);
                      e.dot(a, t.x + t.w, t.y - 2, r);
                      e.line(a, b, t.y + 4, b, t.y + 6, f);
                      e.line(a, t.x, t.y + 10, t.x + 2, t.y + 11, f);
                      return void e.line(a, t.x + t.w - 1, t.y + 10, t.x + t.w - 3, t.y + 11, f);
                    }
                    if ("black_face_mask" !== s.cfg.accessory)
                      if ("smith_muscles" !== s.cfg.accessory) {
                        if ("tang_kinh_regalia" === s.cfg.accessory) {
                          if (s.g.back) {
                            return;
                          }
                          var D = s.head;
                          var W = s.torso;
                          var J = { line: "#7a5416", deep: "#a97620", base: "#d9a83b", hi: "#ffe18a" };
                          if (s.g.side) {
                            e.line(a, D.x + D.w - 5, D.y + 12, D.x + D.w - 2, D.y + 13, "#5e5148");
                            e.dot(a, D.x + D.w - 2, D.y + 13, "#83746b");
                          }
                          else {
                            e.line(a, D.x + 4, D.y + 12, D.x + 7, D.y + 13, "#5e5148");
                            e.line(a, D.x + D.w - 5, D.y + 12, D.x + D.w - 8, D.y + 13, "#5e5148");
                            e.dot(a, D.x + 7, D.y + 13, "#83746b");
                            e.dot(a, D.x + D.w - 8, D.y + 13, "#83746b");
                          }
                          O = W.x + Math.floor(W.w / 2);
                          var M = W.y + 8;
                          if (s.g.side) {
                            e.line(a, W.x + W.w - 2, W.y + 1, W.x + W.w, M, J.deep);
                            e.line(a, W.x + W.w, M, O + 2, M + 4, J.base);
                          }
                          else {
                            e.line(a, W.x + 1, W.y + 1, O - 1, M + 4, J.deep);
                            e.line(a, W.x + W.w - 2, W.y + 1, O + 1, M + 4, J.base);
                            e.dot(a, O - 1, M + 2, J.hi);
                            e.dot(a, O + 1, M + 2, J.hi);
                          }
                          u(a, [[O - 2, M + 4], [O + 2, M + 4], [O + 2, M + 9], [O, M + 13], [O - 1, M + 9]], "#6a4a25");
                          u(a, [[O - 1, M + 4], [O + 1, M + 5], [O + 1, M + 9], [O, M + 11], [O, M + 7]], "#eee1bd");
                          return void e.dot(a, O, M + 5, "#fff8dc");
                        }
                        if ("white_beard" === s.cfg.accessory) {
                          if (s.g.back) {
                            return;
                          }
                          var w = s.head;
                          var N = { line: "#555967", deep: "#777c8c", shade: "#a8acb7", base: "#d7d8d9", hi: "#f4f1e8" };
                          return s.g.side ? (u(a, [[w.x + w.w - 5, w.y + 11], [w.x + w.w + 1, w.y + 12], [w.x + w.w - 1, w.y + 25], [w.x + w.w - 5, w.y + 20]], N.deep), e.fatLine(a, w.x + w.w - 3, w.y + 13, w.x + w.w - 2, w.y + 23, 2, N.base), void e.dot(a, w.x + w.w - 2, w.y + 14, N.hi)) : (e.fatLine(a, w.x + 3, w.y + 12, w.x + 7, w.y + 14, 2, N.base), e.fatLine(a, w.x + w.w - 4, w.y + 12, w.x + w.w - 8, w.y + 14, 2, N.hi), e.dot(a, w.x + 7, w.y + 13, N.deep), e.dot(a, w.x + w.w - 8, w.y + 13, N.shade), u(a, [[w.x + 4, w.y + 14], [w.x + w.w - 5, w.y + 14], [w.x + w.w - 6, w.y + 24], [w.x + Math.floor(w.w / 2) + 1, w.y + 31], [w.x + 4, w.y + 23]], N.deep), u(a, [[w.x + 6, w.y + 14], [w.x + w.w - 7, w.y + 14], [w.x + w.w - 8, w.y + 22], [w.x + Math.floor(w.w / 2), w.y + 29], [w.x + 6, w.y + 21]], N.base), e.line(a, w.x + 7, w.y + 15, w.x + 7, w.y + 22, N.shade), e.line(a, w.x + w.w - 8, w.y + 15, w.x + w.w - 9, w.y + 21, N.hi), void e.line(a, w.x + Math.floor(w.w / 2), w.y + 17, w.x + Math.floor(w.w / 2), w.y + 27, N.hi));
                        }
                      }
                      else {
                        if (s.g.back) {
                          return;
                        }
                        var p = s.torso;
                        var k = s.head;
                        var m = G.face;
                        var v = "#342722";
                        var y = "#5b4438";
                        if (s.g.side) {
                          e.line(a, p.x + p.w - 3, p.y + 3, p.x + p.w - 1, p.y + 8, m.brow);
                          u(a, [[p.x + p.w - 4, p.y - 2], [p.x + p.w + 3, p.y], [p.x + p.w + 4, p.y + 4], [p.x + p.w - 2, p.y + 5]], G.metal.deep);
                          e.line(a, p.x + p.w - 3, p.y - 2, p.x + p.w + 2, p.y, G.metal.hi);
                          e.line(a, p.x + p.w - 1, p.y + 1, p.x + p.w + 3, p.y + 3, G.metal.shade);
                          e.dot(a, p.x + p.w, p.y + 2, G.leather.base);
                          u(a, [[k.x + k.w - 5, k.y + 11], [k.x + k.w, k.y + 12], [k.x + k.w - 2, k.y + 19], [k.x + k.w - 6, k.y + 16]], v);
                          e.line(a, k.x + k.w - 4, k.y + 12, k.x + k.w - 2, k.y + 17, y);
                        }
                        else {
                          e.line(a, p.x + 2, p.y + 3, p.x + 5, p.y + 5, m.brow);
                          e.line(a, p.x + p.w - 3, p.y + 3, p.x + p.w - 6, p.y + 5, m.brow);
                          e.line(a, p.x + 3, p.y + 7, p.x + 6, p.y + 7, m.blush);
                          e.line(a, p.x + p.w - 4, p.y + 7, p.x + p.w - 7, p.y + 7, m.blush);
                          e.line(a, p.x + Math.floor(p.w / 2), p.y + 7, p.x + Math.floor(p.w / 2), p.y + 11, m.browhi);
                          u(a, [[p.x - 3, p.y], [p.x + 1, p.y - 3], [p.x + 5, p.y - 1], [p.x + 4, p.y + 4], [p.x - 2, p.y + 5]], G.metal.deep);
                          e.line(a, p.x - 2, p.y, p.x + 2, p.y - 2, G.metal.hi);
                          e.line(a, p.x - 1, p.y + 2, p.x + 4, p.y + 1, G.metal.shade);
                          e.dot(a, p.x + 1, p.y + 1, G.leather.base);
                          u(a, [[p.x + p.w - 4, p.y - 1], [p.x + p.w, p.y], [p.x + p.w + 1, p.y + 3], [p.x + p.w - 4, p.y + 3]], G.metal.shade);
                          e.line(a, p.x + p.w - 3, p.y - 1, p.x + p.w, p.y, G.metal.hi);
                          e.dot(a, p.x + p.w - 2, p.y + 1, G.leather.base);
                          e.fatLine(a, k.x + 3, k.y + 12, k.x + 7, k.y + 14, 2, v);
                          e.fatLine(a, k.x + k.w - 4, k.y + 12, k.x + k.w - 8, k.y + 14, 2, v);
                          u(a, [[k.x + 2, k.y + 12], [k.x + 5, k.y + 14], [k.x + 6, k.y + 18], [k.x + Math.floor(k.w / 2), k.y + 22], [k.x + k.w - 7, k.y + 18], [k.x + k.w - 5, k.y + 14], [k.x + k.w - 2, k.y + 12], [k.x + k.w - 4, k.y + 19], [k.x + Math.floor(k.w / 2), k.y + 24], [k.x + 3, k.y + 19]], v);
                          e.line(a, k.x + 5, k.y + 15, k.x + 7, k.y + 19, y);
                          e.line(a, k.x + k.w - 6, k.y + 15, k.x + k.w - 8, k.y + 19, y);
                          e.dot(a, k.x + Math.floor(k.w / 2), k.y + 22, y);
                        }
                      }
                    else {
                      if (s.g.back) {
                        return;
                      }
                      var L = s.head;
                      var C = "#11141c";
                      var j = "#464d5a";
                      if (s.g.side) {
                        u(a, [[L.x + L.w - 6, L.y + 9], [L.x + L.w + 1, L.y + 9], [L.x + L.w, L.y + 15], [L.x + L.w - 5, L.y + 16]], C);
                        e.line(a, L.x + L.w - 5, L.y + 10, L.x + L.w, L.y + 10, j);
                      }
                      else {
                        u(a, [[L.x - 1, L.y + 9], [L.x + L.w, L.y + 9], [L.x + L.w - 2, L.y + 16], [L.x + 1, L.y + 16]], C);
                        e.line(a, L.x, L.y + 10, L.x + L.w - 1, L.y + 10, j);
                        e.r(a, L.x + 2, L.y + 13, L.w - 4, 2, "#282d39");
                        e.dot(a, L.x + 3, L.y + 12, j);
                        e.dot(a, L.x + L.w - 4, L.y + 14, C);
                      }
                    }
                  }
                  else {
                    !function (a, s) {
                      var o = s.g.side || s.g.back ? 1 : 0;
                      var i = h(s.arms[o]);
                      var B = "#24150b";
                      var n = "#7a4a26";
                      var O = "#a8703d";
                      var t = s.g.side || o ? 1 : -1;
                      var r = i.x + t * (s.g.side ? 5 : 3);
                      var d = Math.max(3, s.head.y + 3);
                      var l = Math.min(62, i.y + 20);
                      e.r(a, r - 1, d, 2, l - d, n);
                      e.r(a, r - 1, d, 1, l - d, "#4a2c17");
                      e.dot(a, r, d + 10, O);
                      e.dot(a, r - 1, d + 17, B);
                      u(a, [[r - 2, d + 1], [r + 1, d + 1], [r + 2, d - 2], [r + 3 * t, d - 3], [r + 3 * t, d]], n);
                      e.r(a, r - 2, d - 2, 4, 3, n);
                      e.dot(a, r + 2 * t, d - 2, O);
                      e.dot(a, r, d - 1, O);
                      e.dot(a, r - 2 * t, d + 1, B);
                      var f = t > 0 ? r + 2 : r - 6;
                      var c = d + 4;
                      var b = t > 0 ? r - 6 : r + 2;
                      if (OO(a, f, c, xn, { R: "#b3202a", L: "#6b4514", G: "#c9922e", H: "#f2c96a" }, !1), e.line(a, r, c, f + 2, c, "#b3202a"), s.g.side || (OO(a, b, c + 7, xn, { R: "#8a1820", L: "#5a3a10", G: "#b07c24", H: "#e0b453" }, !1), e.line(a, r, c + 7, b + 2, c + 7, "#8a1820")), e.line(a, f + 2, c + 9, f + 2, c + 14, "#b3202a"), e.dot(a, f + 1, c + 14, "#7a1218"), !s.g.back) {
                        var G = S.Palette.pick("SKIN", s.cfg.skin, "light");
                        e.fatLine(a, i.x, i.y, r, i.y - 1, 2, G.base);
                        e.r(a, r - 1, i.y - 2, 3, 3, G.base);
                        e.dot(a, r + t, i.y, G.shade);
                      }
                    }(a, s);
                  }
                }
                else {
                  mO(a, s, "nhim");
                }
              else {
                mO(a, s, "hau");
              }
            else {
              mO(a, s, "xa");
            }
          else {
            !function (a, s) {
              if (!s.g.back) {
                var o = s.head;
                var i = o.x;
                var B = o.y;
                var n = o.w;
                var O = ZS;
                var t = S.Palette.pick("SKIN", s.cfg.skin, "tan");
                var h = i + Math.floor(n / 2);
                if (s.g.side) {
                  e.line(a, i + n - 6, B + 5, i + n - 2, B + 5, O.line);
                  e.dot(a, i + n - 6, B + 6, O.deep);
                  u(a, [[i + n - 8, B + 10], [i + n - 2, B + 11], [i + n - 1, B + 13], [i + n - 3, B + 16], [i + n - 8, B + 16], [i + n - 9, B + 13]], O.base);
                  e.line(a, i + n - 8, B + 11, i + n - 3, B + 12, O.deep);
                  e.r(a, i + n - 6, B + 15, 3, 1, O.shade);
                  e.dot(a, i + n - 7, B + 13, O.hi);
                  e.dot(a, i + n - 4, B + 16, O.hi);
                  e.dot(a, i + n - 2, B + 14, t.deep);
                  return void e.dot(a, i + n - 5, B + 10, O.shade);
                }
                e.r(a, i + 2, B + 5, 4, 1, O.line);
                e.r(a, i + n - 6, B + 5, 4, 1, O.line);
                e.dot(a, i + 5, B + 6, O.deep);
                e.dot(a, i + n - 6, B + 6, O.deep);
                u(a, [[i + 1, B + 10], [i + 3, B + 11], [i + n - 4, B + 11], [i + n - 2, B + 10], [i + n - 1, B + 13], [i + n - 3, B + 16], [h, B + 17], [i + 2, B + 16], [i, B + 13]], O.base);
                e.r(a, i + 3, B + 11, n - 6, 1, O.deep);
                e.r(a, i + 5, B + 13, n - 10, 2, t.base);
                e.line(a, i + 6, B + 14, i + n - 7, B + 14, VS);
                e.line(a, i + 1, B + 12, i + 2, B + 15, O.deep);
                e.line(a, i + n - 2, B + 12, i + n - 3, B + 15, O.deep);
                e.line(a, i + 4, B + 16, i + n - 5, B + 16, O.shade);
                e.dot(a, i + 3, B + 12, O.hi);
                e.dot(a, i + n - 4, B + 12, O.hi);
                e.dot(a, h, B + 16, O.hi);
                e.dot(a, i + 2, B + 9, O.shade);
                e.dot(a, i + 3, B + 9, t.deep);
                e.dot(a, i + n - 4, B + 8, t.deep);
                e.dot(a, i + n - 3, B + 8, O.shade);
              }
            }(a, s);
          }
        else {
          !function (a, s) {
            if (!s.g.back) {
              var o = s.head;
              var i = o.x;
              var B = o.y;
              var n = o.w;
              var O = G.face;
              var t = S.Palette.pick("SKIN", s.cfg.skin, "tan");
              if (s.g.side) {
                e.r(a, i + n - 5, B + 8, 3, 1, O.lid);
                e.dot(a, i + n - 2, B + 8, O.lid);
                e.r(a, i + n - 5, B + 7, 3, 1, t.base);
                return void e.line(a, i + n - 4, B + 13, i + n - 2, B + 13, zS);
              }
              for (var h = 0; h < 2; h++) {
                var r = i + H.eyes[h];
                var d = h ? r + 2 : r;
                var l = h ? r : r + 2;
                e.r(a, r, B + 7, 3, 1, t.shade);
                e.r(a, r, B + 8, 3, 1, O.lid);
                e.dot(a, d, B + 9, O.lid);
                e.dot(a, l, B + 10, t.shade);
              }
              e.line(a, i + 5, B + 13, i + n - 6, B + 13, zS);
              e.line(a, i + 6, B + 15, i + n - 7, B + 15, VS);
            }
          }(a, s);
        }
      } }, { id: "lan_thanh_y_paint", z: 65, draw: function (S, a) {
        !function (S, a) {
          if (a.cfg && "lan_thanh_y" === a.cfg.outfit) {
            var s = "left" === a.dir;
            var o = LO[s ? "right" : a.dir];
            if (o) {
              for (var i = a.p && a.p.sit ? 0 : a.dy || 0, B = 0; B < o.length; B++) {
                var n = o[B];
                e.dot(S, s ? 31 - n[0] : n[0], n[1] + i, yO[n[2]]);
              }
            }
          }
        }(S, a);
      } }, { id: "aura", z: 70, draw: function (S, e, a, s) {
        vO(S, e, s);
      } }];
  s.layerErrors = 0;
  var CO = {};
  s.drawLayers = function (S, e, a, o, i, B) {
    for (var n = J(e, a, o), O = 0; O < s.LAYERS.length; O++) {
      var t = s.LAYERS[O];
      if (!B || !1 !== B[t.id]) {
        try {
          t.draw(S, n, o, i || 0);
        }
        catch (S) {
          s.layerErrors++;
          if (!(CO[t.id])) {
            CO[t.id] = 1;
            console.error('[PNTT] Lớp "' + t.id + '" của nhân vật vẽ hỏng, bỏ qua lớp này:', S, o);
          }
        }
      }
    }
  };
  s.drawBody = function (S, e, a, s) {
    var o = J(e, a, s);
    Jn(S, o);
    Gn(S, o);
    un(S, o);
  };
  s.drawOutfit = function (S, e, a, s) {
    var o = J(e, a, s);
    vn(S, o);
    uO(S, o);
    sO(S, o);
    un(S, o);
    oO(S, o);
  };
  s.drawHair = function (S, e, a, s, o) {
    DO(S, J(e, a, s), o);
  };
  s.drawAura = function (S, e, a, s, o, i) {
    if ("back" !== o) {
      vO(S, J(e, a, s), i || 0);
    }
  };
}(window.PNTT);
