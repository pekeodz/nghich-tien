!function (e) {
  "use strict";
  var t = e.Utils;
  var n = e.Input = { mode: "keyboard", lockMode: !1, keys: {}, joy: { x: 0, y: 0, active: !1 }, vector: { x: 0, y: 0 }, run: !1, tap: null, onModeChange: null, _attack: !1, _interact: !1, _menu: !1, _duel: !1, _meditate: !1, _bag: !1, _skillBook: !1, _autoToggle: !1, _flyToggle: !1, _cycleTarget: !1, _slot: 0, _spell: !1, lastActAt: 0 };
  function o() {
    n.lastActAt = performance.now();
  }
  var r = { KeyW: "up", ArrowUp: "up", KeyS: "down", ArrowDown: "down", KeyA: "left", ArrowLeft: "left", KeyD: "right", ArrowRight: "right" };
  var a = { Digit1: 1, Digit2: 2, Digit3: 3, Digit4: 4, Digit5: 5, Digit6: 6, Digit7: 7, Digit8: 8 };
  var i = { Space: 1, ArrowUp: 1, ArrowDown: 1, ArrowLeft: 1, ArrowRight: 1, Tab: 1 };
  var c = !1;
  var u = !1;
  function l() {
    var e = c || u;
    if (n.run !== e) {
      n.run = e;
      if (n.onRunChange) {
        n.onRunChange(e);
      }
    }
  }
  n.toggleRun = function () {
    u = !u;
    l();
    return n.run;
  };
  n.queueTap = function (e, t, r, a) {
    e = Number(e);
    t = Number(t);
    return !(!isFinite(e) || !isFinite(t) || (n.tap = { x: e, y: t }, o(), void 0 !== r && void 0 !== a && (n.tapClient = { x: r, y: a }), 0));
  };
  n.init = function (c) {
    n.mode = t.detectTouch() ? "touch" : "keyboard";
    window.addEventListener("keydown", function (t) {
      if (!function (e) {
        if (!e || !e.tagName) {
          return !1;
        }
        var t = e.tagName.toLowerCase();
        return "input" === t || "textarea" === t || e.isContentEditable;
      }(t.target)) {
        if (i[t.code] && t.preventDefault(), !t.repeat) {
          if (("Space" === t.code || a[t.code] || "KeyC" === t.code || "KeyX" === t.code)) {
            o();
          }
          if ("Space" === t.code) {
            n._attack = !0;
          }
          if (!("KeyE" !== t.code && "Enter" !== t.code)) {
            n._interact = !0;
          }
          if ("Escape" === t.code) {
            n._menu = !0;
          }
          if ("KeyQ" === t.code) {
            n._meditate = !0;
          }
          if (!("KeyB" !== t.code && "KeyI" !== t.code)) {
            n._bag = !0;
          }
          if ("KeyN" === t.code) {
            n._skillBook = !0;
          }
          if (!("KeyT" !== t.code && "KeyR" !== t.code)) {
            n._autoToggle = !0;
          }
          if ("KeyF" === t.code) {
            n._flyToggle = !0;
          }
          if ("KeyP" === t.code) {
            n._duel = !0;
          }
          if ("KeyO" === t.code) {
            n._doSat = !0;
          }
          var c = a[t.code];
          if (c) {
            n._slot = c;
          }
          if ("KeyC" === t.code) {
            n._slot = 1;
          }
          if ("KeyX" === t.code) {
            n._slot = 2;
          }
          if ("Tab" === t.code) {
            n._cycleTarget = !0;
          }
          if ("KeyY" === t.code && e.Camera && e.Camera.recenter) {
            e.Camera.recenter();
          }
        }
        if (r[t.code]) {
          n.keys[r[t.code]] = !0;
          o();
          p("keyboard");
        }
        if (!("ShiftLeft" !== t.code && "ShiftRight" !== t.code || t.repeat || t.ctrlKey || t.altKey || t.metaKey)) {
          n.toggleRun();
        }
        if (!("Space" !== t.code && "KeyE" !== t.code)) {
          p("keyboard");
        }
      }
    });
    window.addEventListener("keyup", function (e) {
      if (r[e.code]) {
        n.keys[r[e.code]] = !1;
      }
    });
    window.addEventListener("blur", y);
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        y();
      }
    });
    var u = null;
    function l(e) {
      if (u && e.touches && !e.touches.length) {
        var t = u;
        setTimeout(function () {
          if (u === t) {
            if (u.drag) {
              _(!1);
            }
            u = null;
          }
        }, 50);
      }
    }
    function _(t) {
      c.classList.remove("cam-dragging");
      var n = 0;
      var o = 0;
      var r = u.samples || [];
      var a = performance.now();
      if (t && r.length >= 2 && a - r[r.length - 1].t < f) {
        for (var i = 0, l = 0, d = 1; d < r.length; d++)
          i += r[d].dx, l += r[d].dy;
        var s = Math.max(16, r[r.length - 1].t - r[0].t);
        n = i / s * 1e3;
        o = l / s * 1e3;
      }
      if (e.Camera && e.Camera.endDrag) {
        e.Camera.endDrag(n, o);
      }
    }
    c.addEventListener("pointerdown", function (e) {
      if ("touch" === e.pointerType) {
        p("touch");
      }
      if (!(u && u.drag)) {
        u = { id: e.pointerId, x: e.clientX, y: e.clientY, t: performance.now(), canDrag: "mouse" !== e.pointerType || 0 === e.button || 1 === e.button, drag: !1, lx: 0, ly: 0, samples: null };
      }
    });
    window.addEventListener("pointermove", function (n) {
      if (u && u.id === n.pointerId) {
        var o = e.Camera;
        if (u.drag) {
          var r;
          if (o.dragging) {
            var a = e.Renderer && e.Renderer.zoom || 1;
            var i = (n.clientX - u.lx) / a;
            var l = (n.clientY - u.ly) / a;
            if (u.lx = n.clientX, u.ly = n.clientY, i || l) {
              o.dragBy(i, l);
              var f = performance.now();
              for (u.samples.push({ t: f, dx: i, dy: l }); u.samples.length && f - u.samples[0].t > g;)
                u.samples.shift();
            }
          }
        }
        else {
          if (!u.canDrag || !o || !o.beginDrag || !((r = e.SceneWorld) && r.map && e.Game && e.Game.scene === r) || r.transitioning || e.FormationUI && e.FormationUI.aim) {
            return;
          }
          var y = "mouse" === n.pointerType ? s : d;
          if (t.dist(u.x, u.y, n.clientX, n.clientY) < y) {
            return;
          }
          u.drag = !0;
          u.lx = n.clientX;
          u.ly = n.clientY;
          u.samples = [];
          o.beginDrag();
          try {
            c.setPointerCapture(n.pointerId);
          }
          catch (e) {
          }
          c.classList.add("cam-dragging");
        }
      }
    });
    window.addEventListener("pointerup", function (r) {
      if (u && u.id === r.pointerId) {
        if (u.drag) {
          _(!0);
          return void (u = null);
        }
        var a = performance.now() - u.t;
        var i = t.dist(u.x, u.y, r.clientX, r.clientY);
        if (a < 500 && i < 14) {
          n.tap = e.Renderer.screenToBuffer(r.clientX, r.clientY);
          o();
          n.tapClient = { x: r.clientX, y: r.clientY };
        }
        u = null;
      }
    });
    window.addEventListener("pointercancel", function (e) {
      if (u && u.id === e.pointerId && u.drag) {
        _(!1);
      }
      if (!(u && u.id !== e.pointerId)) {
        u = null;
      }
    });
    window.addEventListener("touchend", l, { passive: !0 });
    window.addEventListener("touchcancel", l, { passive: !0 });
    c.addEventListener("contextmenu", function (e) {
      e.preventDefault();
    });
    c.addEventListener("dragstart", function (e) {
      e.preventDefault();
    });
    return n;
  };
  var d = 12;
  var s = 6;
  var g = 90;
  var f = 60;
  function y() {
    n.keys = {};
    c = !1;
    l();
    n.joy.x = n.joy.y = 0;
    n.joy.active = !1;
  }
  function p(e) {
    if (!(n.lockMode || n.mode === e)) {
      n.mode = e;
      if (n.onModeChange) {
        n.onModeChange(e);
      }
    }
  }
  n.setMode = function (e, t) {
    n.lockMode = !!t;
    if (n.mode !== e) {
      n.mode = e;
      if (n.onModeChange) {
        n.onModeChange(e);
      }
    }
  };
  n.setJoystick = function (e, t, r) {
    var a = Number(e);
    var i = Number(t);
    if (!(isFinite(a))) {
      a = 0;
    }
    if (!(isFinite(i))) {
      i = 0;
    }
    var c = Math.sqrt(a * a + i * i);
    if (c > 1) {
      a /= c;
      i /= c;
    }
    n.joy.x = a;
    n.joy.y = i;
    n.joy.active = !!r;
    if (r) {
      p("touch");
      o();
    }
  };
  n.pressAttack = function () {
    n._attack = !0;
    o();
  };
  n.pressInteract = function () {
    n._interact = !0;
  };
  n.pressMenu = function () {
    n._menu = !0;
  };
  n.pressDuel = function () {
    n._duel = !0;
  };
  n.pressMeditate = function () {
    n._meditate = !0;
  };
  n.pressBag = function () {
    n._bag = !0;
  };
  n.pressSkillBook = function () {
    n._skillBook = !0;
  };
  n.pressAutoToggle = function () {
    n._autoToggle = !0;
  };
  n.pressFlyToggle = function () {
    n._flyToggle = !0;
  };
  n.pressDoSat = function () {
    n._doSat = !0;
  };
  n.pressCycleTarget = function () {
    n._cycleTarget = !0;
  };
  n.pressThunder = function () {
    n._slot = 1;
    o();
  };
  n.pressSpell = function () {
    n._spell = !0;
    o();
  };
  n.pressSlot = function (e) {
    n._slot = 0 | e;
    o();
  };
  n.setRun = function (e) {
    u = !!e;
    l();
  };
  n.update = function () {
    var e = 0;
    var t = 0;
    if (n.joy.active) {
      e = n.joy.x;
      t = n.joy.y;
    }
    else if (n.keys.left && (e -= 1), n.keys.right && (e += 1), n.keys.up && (t -= 1), n.keys.down && (t += 1), 0 !== e && 0 !== t) {
      var o = 1 / Math.sqrt(2);
      e *= o;
      t *= o;
    }
    n.vector.x = e;
    n.vector.y = t;
    return n.vector;
  };
  n.hasManualMove = function () {
    return n.joy.active || 0 !== n.vector.x || 0 !== n.vector.y;
  };
  n.consumeAttack = function () {
    var e = n._attack;
    n._attack = !1;
    return e;
  };
  n.consumeInteract = function () {
    var e = n._interact;
    n._interact = !1;
    return e;
  };
  n.consumeMenu = function () {
    var e = n._menu;
    n._menu = !1;
    return e;
  };
  n.consumeDuel = function () {
    var e = n._duel;
    n._duel = !1;
    return e;
  };
  n.consumeDoSat = function () {
    var e = n._doSat;
    n._doSat = !1;
    return e;
  };
  n.consumeTap = function () {
    var e = n.tap;
    n.tap = null;
    return e;
  };
  n.consumeMeditate = function () {
    var e = n._meditate;
    n._meditate = !1;
    return e;
  };
  n.consumeBag = function () {
    var e = n._bag;
    n._bag = !1;
    return e;
  };
  n.consumeSkillBook = function () {
    var e = n._skillBook;
    n._skillBook = !1;
    return e;
  };
  n.consumeAutoToggle = function () {
    var e = n._autoToggle;
    n._autoToggle = !1;
    return e;
  };
  n.consumeFlyToggle = function () {
    var e = n._flyToggle;
    n._flyToggle = !1;
    return e;
  };
  n.consumeSlot = function () {
    var e = 0 | n._slot;
    n._slot = 0;
    return e;
  };
  n.consumeCycleTarget = function () {
    var e = n._cycleTarget;
    n._cycleTarget = !1;
    return e;
  };
  n.consumeSpell = function () {
    var e = n._spell;
    n._spell = !1;
    return e;
  };
  n.reset = function () {
    n.keys = {};
    c = !1;
    l();
    n.joy.x = n.joy.y = 0;
    n.joy.active = !1;
    n.vector.x = n.vector.y = 0;
    n.tap = null;
    n._attack = n._interact = n._menu = n._duel = !1;
    n._meditate = n._bag = n._autoToggle = n._flyToggle = !1;
    n._skillBook = !1;
    n._cycleTarget = !1;
    n._slot = 0;
    n._spell = !1;
  };
  n.resetAll = function () {
    n.reset();
    u = !1;
    l();
  };
}(window.PNTT);
