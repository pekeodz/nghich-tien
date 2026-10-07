!function (a) {
  "use strict";
  var t = a.Utils;
  var e = a.CONFIG;
  var n = a.PrologueData;
  var o = a.ScenePrologue = { name: "prologue" };
  var r = null;
  var i = 2 * Math.PI;
  var l = ["down", "left", "right", "up"];
  function s(a, t, e) {
    return a < t ? t : a > e ? e : a;
  }
  function u(a, t, e) {
    return a + (t - a) * e;
  }
  function h(a, t) {
    return a + Math.random() * (t - a);
  }
  function f(t, e) {
    var n = a.Audio;
    if (n && n.play) {
      n.play(t, e);
    }
  }
  function c() {
    return a.TuyetMenhArt;
  }
  function d() {
    return a.TuyetMenhFx;
  }
  function p() {
    return a.PrologueUI;
  }
  function m(a, t) {
    if (r) {
      r.timers.push({ t: a, fn: t });
    }
  }
  function g(t) {
    var e = a.Skills && a.Skills.DEFS && a.Skills.DEFS[t];
    return e ? e.colors : void 0;
  }
  function y() {
    return a.Quality ? a.Quality.tier : 2;
  }
  function b(a) {
    return String(a).replace("{ten}", r && r.cfg && r.cfg.name || "đạo hữu");
  }
  function x(a, t, e, n) {
    return Math.sqrt((a - e) * (a - e) + 1.7 * (t - n) * (1.7 * (t - n)));
  }
  function w(a) {
    return l[a] || "down";
  }
  function v(t) {
    var e = Object.assign({}, a.DEFAULT_CHARACTER, t || {});
    e.weapon = "none";
    e.aura = "none";
    return e;
  }
  function k(t, e, n, o, r) {
    var l = a.SpriteFactory;
    var s = l.keyOf(e);
    var u = l.enqueue(e);
    return { id: t.id, def: t, cfg: e, key: s, sheet: u ? l.peek(s) : null, sheetWait: 0, x: n, y: o, dir: r || 0, pose: "idle", poseT: 0, poseDur: 0, walkT: 0, animTime: 3 * Math.random(), moving: !1, hp: 1, maxHp: t.maxHp || 1e3, floorHp: t.floor || 0, mp: t.maxMp || 0, maxMp: t.maxMp || 0, alpha: 1, flash: 0, kx: 0, ky: 0, ox: 0, oy: 0, busy: 0, stunT: 0, freezeT: 0, slowT: 0, rootT: 0, burnT: 0, hasteT: 0, shieldT: 0, shieldHp: 0, shieldBell: !1, flyRise: 0, cd: h(1.5, 3), goTo: null, lunge: null, dead: !1, down: !1, home: { x: n, y: o }, ph: Math.random() * i, invul: 0 };
  }
  function T(t, e) {
    var n = t.spear;
    var o = a.Player;
    if (n && o && o.startPhiKiem) {
      n.state = "attack";
      n.attackTime = 0;
      n.atkDur = o.phiKiemDuration ? o.phiKiemDuration(n.cfg) : 1;
      o.startPhiKiem(n, e && null != e.x ? { x: e.x, y: e.y, dead: !1 } : null);
      f("weapon_impact_pierce", { gain: .5, rate: .9 });
    }
  }
  var M = { attack: 1, cast: 1, hurt: 1, seal: 1, palm: 1 };
  function A(a, t, e) {
    a.pose = t;
    a.poseT = 0;
    a.poseDur = e || 0;
  }
  function S(a) {
    var t;
    var n = a.pose;
    var o = e.ANIM[n] || e.ANIM.idle;
    var r = o.cols.length;
    t = "walk" === n ? Math.floor(a.walkT * o.fps) % r : M[n] ? Math.min(r - 1, Math.floor(a.poseT / (a.poseDur || .4) * r)) : Math.floor(a.animTime * o.fps) % r;
    return o.cols[t];
  }
  function C(a, t, e) {
    var n = t - a.x;
    var o = e - a.y;
    if (.8 * Math.abs(n) > Math.abs(o)) {
      a.dir = n < 0 ? 1 : 2;
    }
    else {
      a.dir = o < 0 ? 3 : 0;
    }
  }
  function F(a) {
    var t = n.SLOTS[a];
    var e = r.L;
    return { x: e.cx + t[0] * e.rx, y: e.cy + t[1] * e.ry };
  }
  function L() {
    var a = [r.hero].concat(r.enemies);
    if (r.mortal && r.mortal.a) {
      a.push(r.mortal.a);
    }
    return a;
  }
  function H(l) {
    l = l || {};
    var u = a.Renderer;
    r = { params: l, t: 0, phase: "battle", mode: "cine", done: !1, finishing: !1, w: u.w, h: u.h, timers: [], tele: [], fly: [], script: [], si: -1, cur: null, sk: n.SKILLS.map(function () {
        return { cd: 0, unlocked: !1, used: 0 };
      }), fade: 1, fadeGoal: 1, fadeSpd: 1.6, bars: 0, barsGoal: 0, cfg: l.cfg || t.store.get(e.STORAGE_KEY, null) || a.DEFAULT_CHARACTER, ai: { on: !1, conc: 1, allow: null, lamLash: !1 }, marker: null, lamHits: 0, dodge: null, tutT: 0, idleT: 0, baked: !1, mood: 0, warmed: !1, truc: !1, trucHits: 0, tt: null, kimoT: 1e9, autoLong: !1, longUsed: 0, longArm: 0, sayCd: {} };
    if (a.HUD && a.HUD.hide) {
      a.HUD.hide();
    }
    if (a.TouchUI && a.TouchUI.setVisible) {
      a.TouchUI.setVisible(!1, !1);
    }
    var T;
    var M;
    var S;
    var H;
    var X;
    var _;
    var V;
    var E = p();
    E.build();
    E.setSkills(n.SKILLS);
    E.setHero(n.CAST.hero);
    E.onSkip = o.skip;
    E.anchor = ea;
    E.show();
    E.controls(!1);
    E.bars(1, 1, 1);
    E.barsVisible(!0);
    E.hint(null);
    E.dialogHide();
    E.cardHide();
    for (var O = 0; O < n.SKILLS.length; O++)
      E.unlock(O, !1);
    a.VFX.clear();
    R(!0);
    P();
    V = n.CAST;
    H = F("hero");
    r.hero = k(V.hero, (X = r.cfg, "male" === (_ = Object.assign({}, a.DEFAULT_CHARACTER, X || {}, n.CAST.hero.cfgOver)).gender && Object.assign(_, n.CAST.hero.cfgOverMale), _), H.x, H.y, 2);
    r.hero.hp = 1;
    r.hero.shieldBell = !0;
    r.hero.shieldHp = n.SHIELD;
    r.hero.shieldT = 9999;
    r.hero.shieldMax = n.SHIELD;
    r.hero.shieldLong = !1;
    r.hero.state = "idle";
    r.hero.attackTime = 0;
    r.hero.atkDur = .96;
    r.hero.flyRise = 0;
    r.hero.downed = !1;
    r.hero.mp = V.hero.maxMp;
    r.enemies = [];
    ["huyet", "hacsat", "tuyen", "lam"].forEach(function (t) {
      var e;
      var n = F(t);
      var o = k(V[t], Object.assign({}, a.DEFAULT_CHARACTER, V[t].cfg), n.x, n.y, n.x < r.L.cx ? 2 : 1);
      o.name = V[t].name;
      if (V[t].spear) {
        o.spear = (e = o, { cfg: Object.assign({}, a.DEFAULT_CHARACTER, { weapon: e.def.spear }), x: e.x, y: e.y, dir: e.dir, state: "idle", attackTime: 0, phiKiem: null, flyRise: 0, downed: !1, atkDur: 1 });
      }
      r.enemies.push(o);
    });
    r.actors = { hero: r.hero, huyet: r.enemies[0], hacsat: r.enemies[1], tuyen: r.enemies[2], lam: r.enemies[3] };
    a.SpriteFactory.enqueue(v(r.cfg));
    (function () {
      var t = a.VFX;
      var e = a.Assets;
      ["NguyetQuangFX", "ThanChuongFX", "KimKiemFX", "HuyetBucFX", "HuyetLiemFX", "HoangLoiFX", "TuTuongBanFX"].forEach(function (t) {
        if (a[t] && a[t].prime) {
          try {
            a[t].prime();
          }
          catch (a) {
          }
        }
      });
      if (t && t.primeMaHonPhe) {
        t.primeMaHonPhe();
      }
      if (t && t.HEAVY && e && e.loadFx && y() >= 1) {
        ["bang_kiem_tran", "ma_bao_an", "tram_ma", "tien_vu", "kim_o", "kim_long", "bang_kiem_luan"].forEach(function (a) {
          if (t.HEAVY[a]) {
            e.loadFx(t.HEAVY[a]);
          }
        });
      }
      var o = a.BACKGROUND_AURAS && a.BACKGROUND_AURAS.qi_ring;
      if (o && e && e.loadImage) {
        var r = n.CAST;
        Object.keys(r).forEach(function (a) {
          var t = (r[a].cfgOver || r[a].cfg || {}).linhCan;
          o.variants.forEach(function (a) {
            if (a.he === t) {
              e.loadImage(a.path, e.PRIO && e.PRIO.NORMAL);
            }
          });
        });
      }
      if (t && t.primeAnhKyPhu) {
        try {
          t.primeAnhKyPhu();
        }
        catch (a) {
        }
      }
    })();
    r.script = (T = n.TEXT, M = [], S = r.L, M.push({ id: "card", start: function (a) {
        p().card(T.card1);
        r.fadeGoal = 1;
        r.fade = 1;
        p().skipVisible(!0);
      }, upd: function (t, e) {
        e.t += t;
        if (e.t > .6) {
          (function () {
            if (!r.warmed) {
              r.warmed = !0;
              var t = a.VFX;
              var e = -900;
              var n = -900;
              try {
                if (t.spawnLucTinhKiemSlash) {
                  t.spawnLucTinhKiemSlash(e, n, 2);
                }
                if (t.spawnLucTinhKiemImpact) {
                  t.spawnLucTinhKiemImpact(e, n, 1, 0);
                }
                if (t.spawnLightning) {
                  t.spawnLightning(e, n);
                }
                if (t.spawnLoiDong) {
                  t.spawnLoiDong(e, n);
                }
                if (t.spawnLoanLoiBao) {
                  t.spawnLoanLoiBao(e, n);
                }
                if (t.spawnCuuHuyetTran) {
                  t.spawnCuuHuyetTran(e, n, { radius: 10 });
                }
                if (t.spawnKimThuongGiangThe) {
                  t.spawnKimThuongGiangThe(e, n);
                }
                if (t.spawnTienVu) {
                  t.spawnTienVu(e, n, { radius: 10 });
                }
                if (a.HoangLoiFX && a.HoangLoiFX.spawnThuongVu) {
                  a.HoangLoiFX.spawnThuongVu({ x: e, y: n }, { x: e, y: n }, { hitDelay: 1, radius: 10 });
                }
              }
              catch (a) {
              }
            }
          })();
        }
        if (!e.fading && r.baked && function () {
          for (var a = L(), t = 0; t < a.length; t++)
            if (!a[t].sheet) {
              return !1;
            }
          return !0;
        }() && e.t >= 3.8) {
          e.fading = !0;
          e.t2 = 0;
          p().cardFade();
          r.fadeGoal = 0;
          r.fadeSpd = .9;
          r.barsGoal = 1;
        }
        return !!e.fading && (e.t2 += t, e.t2 >= 1);
      }, onTap: function (a) {
        if (a.st.t > 1.2) {
          a.st.t = Math.max(a.st.t, 3.8);
        }
      }, end: function () {
        p().cardHide();
        r.fadeSpd = 1.6;
      } }), M.push({ id: void 0, upd: function (a, t) {
        t.t += a;
        return t.t >= .6;
      } }), M.push(oa("huyet", "huyet1", "dlg1")), M.push(oa("hero", "hero1")), M.push(ra("move", { pulse: null, start: function () {
        r.tutAllowMove = !0;
        r.tutAllowAtk = !1;
        r.ai.on = !1;
        p().lockAtk(!0);
        r.marker = { x: S.cx + .3 * S.rx, y: S.cy - .42 * S.ry, t: 0, hit: !1 };
        if (r.fx) {
          d().setMood(r.fx, .1);
        }
      }, test: function () {
        var a = r.hero;
        var t = r.marker;
        return x(a.x, a.y, t.x, t.y) < 18 && (t.hit = !0, !0);
      }, done: function () {
        var t = r.marker;
        a.VFX.spawnRing(t.x, t.y, "#ffe28a", 54, .7);
        a.VFX.spawnRing(t.x, t.y, "#fff6c8", 30, .5);
        if (r.fx) {
          d().pulseArray(r.fx, 1);
        }
      }, end: function () {
        r.marker = null;
      } })), M.push(na(function () {
      aa("huyet", "huyet2");
    }, 1.6)), M.push(ra("attack", { pulse: "atk", start: function () {
        r.tutAllowAtk = !0;
        p().lockAtk(!1);
        r.ai.on = !0;
        r.ai.allow = [];
        r.ai.lamLash = !0;
        r.lamHits = 0;
        r.heroFloor = .6;
        aa("lam", T.lam1, 2.4);
        r.onEnemyHit = function (a, t) {
          if ("lam" === a.id && "slash" === t.kind) {
            r.lamHits++;
          }
        };
      }, test: function () {
        return r.lamHits >= 4;
      }, done: function () {
        var t = r.actors.lam;
        r.ai.lamLash = !1;
        t.engaging = !1;
        D(t, r.hero.x, r.hero.y, 150);
        t.stunT = .8;
        A(t, "hurt", .5);
        j(t);
        B(t, t.home.x, t.home.y, 80, null);
        aa("lam", T.lam2, 2.6);
        a.VFX.spawnFlash(.18, "#fff2d0");
      }, end: function () {
        r.onEnemyHit = null;
        r.ai.lamLash = !1;
        r.actors.lam.engaging = !1;
      } })), M.push(na(function () {
      aa("huyet", T.huyet3, 2.6);
    }, 1)), M.push(ra("dodge", { pulse: null, start: function (a) {
        r.heroFloor = .6;
        r.ai.on = !1;
        aa("hacsat", T.hac1, 2.6);
        r.sayCd.hacsat = r.t + 9;
        var t = r.actors.hacsat;
        m(.5, function () {
          if (r) {
            var a = Q(t, Y.hacsat[0]);
            a.dur = 1.8;
            a.lead = Math.min(a.lead, .72);
            a.lock = .6;
            r.dodge = { tl: a, result: null };
          }
        });
      }, test: function () {
        return !(!r.dodge || !r.dodge.result);
      }, done: function () {
        var a = "dodged" === r.dodge.result;
        p().toast(a ? T.dodged : T.hit, !a);
      }, praise: !1, after: 1.3, end: function () {
        r.dodge = null;
      } })), M.push(na(function () {
      aa("hero", T.hero2, 2.6);
      r.hero.mp = r.hero.maxMp;
    }, .8)), M.push(ra("loi", { pulse: 0, unlock: 0, start: function () {
        r.ai.on = !0;
        r.ai.allow = ["hacsat", "huyet"];
        r.ai.conc = 1;
        r.ai.slow = 1.3;
        r.heroFloor = .55;
        if (r.fx) {
          d().setMood(r.fx, .22);
        }
        r.onCast = function (a) {
          if ("loi" === a) {
            r.castedLoi = !0;
          }
        };
        m(3.5, function () {
          z("hacsat", 2);
        });
      }, test: function () {
        return !!r.castedLoi;
      }, after: 2.2 })), M.push(na(function () {
      aa("hacsat", T.hac2, 2.8);
    }, .8)), M.push(ra("bang", { pulse: 1, unlock: 1, start: function () {
        r.onCast = function (a) {
          if ("bang" === a) {
            r.castedBang = !0;
          }
        };
        r.ai.allow = ["hacsat", "huyet", "tuyen"];
        r.autoLong = !0;
        r.longArm = 0;
        m(2.5, function () {
          z("tuyen", 2);
        });
      }, test: function () {
        return !!r.castedBang;
      }, after: 2.6 })), M.push(na(function () {
      aa("tuyen", T.tuyen1, 2.8);
    }, .8)), M.push(ra("kim", { pulse: 2, unlock: 2, start: function () {
        r.onCast = function (a) {
          if ("kim" === a) {
            r.castedKim = !0;
          }
        };
        r.ai.allow = null;
        r.ai.conc = 2;
        r.ai.slow = 1;
        if (r.fx) {
          d().setMood(r.fx, .35);
        }
        r.hero.mp = Math.max(r.hero.mp, 60);
        r.kimoT = 4;
        m(2, function () {
          z("lam", 1);
        });
        m(8, function () {
          z("lam", 2);
        });
      }, test: function () {
        return !!r.castedKim;
      }, after: 2.4 })), M.push({ id: "truc", start: function (a) {
        r.mode = "cine";
        r.ai.on = !1;
        r.tele.length = 0;
        r.heroFloor = .5;
        p().controls(!1);
        p().pulse(null);
        r.enemies.forEach(function (a) {
          a.engaging = !1;
        });
        aa("hero", T.heroTruc, 2.6);
        m(.7, function () {
          if (r) {
            W();
          }
        });
        m(1.7, function () {
          if (r) {
            aa("huyet", T.huyetTruc, 3);
          }
        });
      }, upd: function (a, t) {
        t.t += a;
        return t.t >= 3.2;
      } }), M.push(ra("trucfight", { pulse: "atk", start: function () {
        r.ai.on = !0;
        r.ai.allow = null;
        r.ai.conc = 2;
        r.ai.slow = 1;
        r.trucHits = 0;
        r.heroFloor = .45;
        r.tutAllowAtk = !0;
        p().lockAtk(!1);
        if (r.fx) {
          d().setMood(r.fx, .5);
        }
        m(3.5, function () {
          z("tuyen", 3);
        });
      }, test: function () {
        return r.trucHits >= 5;
      }, praise: !1, after: 1 })), M.push(na(function () {
      aa("hero", T.hero3, 2.8);
      r.hero.mp = r.hero.maxMp;
    }, .8)), M.push(ra("van", { pulse: 3, unlock: 3, start: function () {
        r.onCast = function (a) {
          if ("van" === a) {
            r.castedVan = !0;
          }
        };
        r.ai.allow = ["lam"];
        r.ai.conc = 1;
        r.ai.slow = 2;
        r.hero.mp = r.hero.maxMp;
      }, test: function () {
        return !!r.castedVan;
      }, after: 3.2, end: function () {
        r.onCast = null;
      } })), M.push((n.TEXT, { id: "defeat", start: function (a) {
        var t = p();
        r.mode = "cine";
        r.ai.on = !1;
        r.tele.length = 0;
        r.barsGoal = 1;
        t.controls(!1);
        t.hint(null);
        t.pulse(null);
        t.captionHide();
        var e = r.hero;
        e.mp = 3;
        e.goal = null;
        r.heroFloor = .2;
        if (r.fx) {
          d().setMood(r.fx, .75);
        }
        r.enemies.forEach(function (a) {
          a.engaging = !1;
          a.freezeT = 0;
        });
        a.phase = 0;
        a.t = 0;
      }, upd: function (t, e) {
        return function (t, e) {
          var o = r.hero;
          var i = n.TEXT;
          var l = p();
          var u = a.VFX;
          function c(a) {
            e.phase = a;
            e.t = 0;
            e.sub = 0;
            e.done = !1;
          }
          e.t += t;
          var x = r.actors;
          switch (e.phase) {
            case 0:
              if (!(e.sub)) {
                e.sub = 1;
                ta("tuyen", b(i.tuyen2), function () {
                  e.done = !0;
                });
              }
              if (e.done) {
                c(1);
              }
              break;
            case 1:
              if (!(e.sub)) {
                e.sub = 1;
                e.arrived = 0;
                l.dialogHide();
                [["huyet", -52, 4], ["hacsat", 54, 2], ["tuyen", -30, -28], ["lam", 34, 26]].forEach(function (a) {
                  var t = x[a[0]];
                  A(t, "idle");
                  t.stunT = 0;
                  t.engaging = !1;
                  B(t, o.x + a[1], o.y + a[2], 150, function () {
                    e.arrived++;
                  });
                });
              }
              if ((e.arrived >= 4 || e.t > 3)) {
                c(2);
              }
              break;
            case 2:
              if (!(e.sub)) {
                e.sub = 1;
                r.enemies.forEach(function (a) {
                  C(a, o.x, o.y);
                });
                [{ t: 0, who: "huyet", fn: function (a) {
                      ia(a);
                    } }, { t: .32, who: "lam", fn: function (a) {
                      u.spawnLoiTienLash(a.x, a.y, w(a.dir), o, { owner: a, weapon: "bach_loi_tien", crackAt: .22, strikeAt: .1, endAt: .5, sfx: "local", cancel: !1 });
                    } }, { t: .62, who: "hacsat", fn: function (a) {
                      u.spawnFanAttack(a.x, a.y, w(a.dir), o);
                    } }, { t: .92, who: "tuyen", fn: function (a) {
                      ia(a);
                      if (u.spawnBichNgucTaDao) {
                        u.spawnBichNgucTaDao(o.x, o.y - 12);
                      }
                    } }, { t: 1.35, who: "hacsat", fn: function (a) {
                      u.spawnMaBaoAn(o.x, o.y, { colors: g("ma_bao_an"), radius: 60 });
                    }, hold: !0 }, { t: 1.62, who: "huyet", fn: function (a) {
                      u.spawnCuuHuyetTran(o.x, o.y, { colors: g("cuu_huyet_kiem_tran"), radius: 60 });
                    }, hold: !0 }, { t: 2.2, who: "tuyen", fn: function (a) {
                      if (u.spawnHuyetBuc) {
                        u.spawnHuyetBuc(a, o, { hitDelay: .34 });
                      }
                    }, hold: !0 }, { t: 2.45, who: "lam", fn: function (a) {
                      u.spawnLoanLoiBao(o.x, o.y);
                    }, hold: !0 }].forEach(function (a, t) {
                  m(a.t, function () {
                    if (r) {
                      var t = x[a.who];
                      C(t, o.x, o.y);
                      A(t, "attack", .35);
                      a.fn(t);
                      m(a.hold ? .42 : .16, function () {
                        if (r) {
                          o.invul = 0;
                          q(a.hold ? .12 : .075, { fromX: t.x, fromY: t.y, kb: 40, noFloor: !1, force: !0 });
                          if (r.fx) {
                            d().pulseArray(r.fx, .5);
                          }
                        }
                      });
                    }
                  });
                });
              }
              if (e.t > 3.3) {
                o.hp = Math.min(o.hp, .14);
                c(3);
              }
              break;
            case 3:
              if (!(e.sub)) {
                e.sub = 1;
                o.down = !0;
                A(o, "down", 0);
                o.shieldHp = 0;
                r.hero.dir = 0;
                ta("hero", b(i.hero4), function () {
                  e.done = !0;
                });
              }
              if (e.done) {
                c(30);
              }
              break;
            case 30:
              if (!e.sub) {
                e.sub = 1;
                l.dialogHide();
                var v = a.TuTuongBanFX;
                var k = s(.52 * r.L.rx, 84, 132);
                o.down = !1;
                o.hp = Math.max(o.hp, .14);
                A(o, "seal", .9);
                o.dir = 0;
                o.busy = 1;
                r.tt = v.create(o.x, o.y + 2, k, { sq: .5, tier: y() });
                l.banner(n.AUTO.tran.name, n.AUTO.tran.color);
                aa("hero", i.heroTran, 3);
                u.spawnFlash(.22, "#fff0c0");
                u.spawnRing(o.x, o.y - 4, "#ffe9a8", 1.1 * k, .9);
                u.spawnRing(o.x, o.y - 4, "#fff6d8", .6 * k, .6);
                if (r.fx) {
                  d().flash(r.fx, .4, [255, 226, 150]);
                  d().pulseArray(r.fx, 2);
                  d().setMood(r.fx, .85);
                }
                f("breakthrough", { gain: .6 });
                f("spell");
                if (a.Camera) {
                  a.Camera.shake(6, .45);
                }
                r.enemies.forEach(function (a) {
                  a.engaging = !1;
                  a.freezeT = 0;
                  a.down = !1;
                  A(a, "hurt", .5);
                  a.stunT = 3.2;
                  var t = a.x - o.x;
                  var e = (a.y - o.y) / r.tt.sq;
                  var n = Math.sqrt(t * t + e * e) || 1;
                  var i = 1.22 * k;
                  B(a, o.x + t / n * i, o.y + e / n * i * r.tt.sq, 240, null, !0);
                });
              }
              if (e.t > 1.6) {
                c(31);
              }
              break;
            case 31:
              if (!e.sub) {
                e.sub = 1;
                for (var T = 0; T < 8; T++)
                  (function (t) {
                    m(.2 + .58 * t, function () {
                      if (r && r.tt) {
                        var e = G();
                        var n = t % 4;
                        a.TuTuongBanFX.strike(r.tt, n, e);
                        e.forEach(function (a) {
                          U(a, .012, { quiet: !0 });
                          if (1 === n) {
                            a.burnT = Math.max(a.burnT || 0, 2.5);
                          }
                          if (2 === n) {
                            a.woundT = 2;
                          }
                          if (3 === n) {
                            a.slowT = Math.max(a.slowT, 2);
                          }
                        });
                        if (a.Camera) {
                          a.Camera.shake(2.2, .15);
                        }
                        if (1 === t) {
                          aa("huyet", i.huyetTran, 2.6);
                        }
                        if (2 === t) {
                          aa("hero", i.heroTran2, 2.6);
                        }
                        if (3 === t) {
                          aa("hacsat", i.hacTran, 2.4);
                        }
                        if (5 === t) {
                          aa("tuyen", i.tuyenTran, 2.4);
                        }
                      }
                    });
                  })(T);
              }
              if (e.t > 5.2) {
                c(32);
              }
              break;
            case 32:
              if (!(e.sub)) {
                e.sub = 1;
                r.enemies.forEach(function (t, e) {
                  m(.15 + .28 * e, function () {
                    if (r && r.tt) {
                      C(t, o.x, o.y);
                      A(t, "attack", .35);
                      a.TuTuongBanFX.ripple(r.tt, Math.atan2((t.y - o.y) / r.tt.sq, t.x - o.x));
                      ia(t);
                      if (a.Camera) {
                        a.Camera.shake(3, .2);
                      }
                    }
                  });
                });
                m(1.5, function () {
                  if (r && r.tt) {
                    a.TuTuongBanFX.shatter(r.tt);
                    u.spawnFlash(.35, "#fff6dd");
                    if (r.fx) {
                      d().flash(r.fx, .6, [255, 235, 190]);
                      d().pulseArray(r.fx, 2.2);
                    }
                    if (a.Camera) {
                      a.Camera.shake(9, .6);
                    }
                    f("hit_big");
                    r.enemies.forEach(function (a) {
                      a.stunT = 0;
                      B(a, o.x + (a.x < o.x ? -46 : 46), o.y + (a.y < o.y ? -14 : 14), 210, null);
                    });
                    q(.12, { force: !0, noFloor: !0, fromX: o.x + 1, fromY: o.y, kb: 90 });
                  }
                });
              }
              if (e.t > 2.4) {
                o.hp = Math.min(o.hp, .12);
                c(33);
              }
              break;
            case 33:
              if (!(e.sub)) {
                e.sub = 1;
                o.down = !0;
                A(o, "down", 0);
                o.shieldHp = 0;
                o.dir = 0;
              }
              if (e.t > 1) {
                r.tt = null;
                c(4);
              }
              break;
            case 4:
              if (!(e.sub)) {
                e.sub = 1;
                ta("hero", b(i.hero5), function () {
                  e.done = !0;
                });
              }
              if (e.done) {
                l.dialogHide();
                c(5);
              }
              break;
            case 5:
              if (!(e.sub)) {
                e.sub = 1;
                o.down = !1;
                o.hp = Math.max(o.hp, .14);
                A(o, "cast", .8);
                o.dir = 2;
                u.spawnFlash(.28, "#ffe9a8");
                if (r.fx) {
                  d().flash(r.fx, .45, [255, 205, 90]);
                  d().pulseArray(r.fx, 2);
                  d().setMood(r.fx, .9);
                }
                u.spawnRing(o.x, o.y - 6, "#ffd36a", 120, .9);
                u.spawnRing(o.x, o.y - 6, "#fff3c0", 70, .6);
                f("breakthrough");
                if (a.Camera) {
                  a.Camera.shake(9, .7);
                }
                r.enemies.forEach(function (a) {
                  D(a, o.x, o.y, 360);
                  A(a, "hurt", .5);
                  if (!("tuyen" !== a.id && "lam" !== a.id)) {
                    m(.45, function () {
                      if (r) {
                        A(a, "hurt", 999);
                        a.down = !0;
                      }
                    });
                  }
                });
                m(.55, function () {
                  if (r) {
                    a.NguyetQuangFX.spawn(o, x.huyet, { colors: g("nguyet_quang"), radius: 60, hitDelay: 1.3 });
                    f("spell");
                    m(1.3, function () {
                      if (r) {
                        U(x.huyet, .1, { quiet: !0, big: !0 });
                        A(x.huyet, "hurt", .5);
                        f("hit_big");
                      }
                    });
                  }
                });
                m(1.25, function () {
                  if (r) {
                    a.ThanChuongFX.spawn(o, x.hacsat, { colors: g("ngu_sac_than_chuong"), radius: 56, hitDelay: 1.8 });
                    f("spell");
                    m(1.8, function () {
                      if (r) {
                        U(x.hacsat, .1, { quiet: !0, big: !0 });
                        A(x.hacsat, "hurt", .5);
                        f("hit_big");
                      }
                    });
                  }
                });
              }
              if (e.t > 4.2) {
                c(6);
              }
              break;
            case 6:
              if (!(e.sub)) {
                e.sub = 1;
                o.hp = .1;
                A(o, "down", 0);
                o.down = !0;
                ta("huyet", b(i.huyet4), function () {
                  e.done = !0;
                });
              }
              if (e.done) {
                l.dialogHide();
                c(7);
              }
              break;
            case 7:
              if (!e.sub) {
                e.sub = 1;
                var M = x.huyet;
                B(M, o.x - 30, o.y + 3, 120, function () {
                  e.arrive = !0;
                }, !0);
                M.dir = 2;
              }
              if (e.arrive && 1 === e.sub) {
                e.sub = 2;
                e.t0 = e.t;
                A(x.huyet, "attack", .5);
                m(.22, function () {
                  if (r) {
                    x.huyet;
                    var t = r.hero;
                    u.spawnHuyetKiemImpact(t.x, t.y - 22, 1, 0);
                    u.spawnBloodSpit(t.x, t.y, 2, 9);
                    u.spawnBloodPool(t.x, t.y, 6);
                    u.spawnFlash(.35, "#ff5a5a");
                    u.spawnVignette("#b01820", .9, .9);
                    t.hp = 0;
                    t.dead = !0;
                    t.shieldHp = 0;
                    f("hit_big");
                    f("down");
                    if (a.Camera) {
                      a.Camera.shake(8, .5);
                    }
                    if (u.spawnMaHonPhe) {
                      u.spawnMaHonPhe(x.hacsat, t, { colors: g("ma_hon_phe"), range: 120, hitDelay: .8 });
                    }
                  }
                });
              }
              if (2 === e.sub && e.t - e.t0 > 1.6) {
                c(8);
              }
              break;
            case 8:
              if (e.sub || (e.sub = 1, r.fx && d().setMood(r.fx, 1), ta("hero", b(i.hero6), function () {
                e.done = !0;
              })), e.t > .5 && !e.wisp) {
                e.wisp = !0;
                for (var S = 0; S < 18; S++)
                  (function (a) {
                    m(.12 * a, function () {
                      if (r) {
                        u.spawnQiWisp(r.hero.x + h(-8, 8), r.hero.y - 20);
                      }
                    });
                  })(S);
              }
              if (e.done) {
                c(9);
              }
              break;
            case 9:
              if (!(e.sub)) {
                e.sub = 1;
                ta("hacsat", b(i.hac3), function () {
                  e.done = !0;
                });
              }
              if (e.done) {
                l.dialogHide();
                u.spawnFlash(1.2, "#ffffff");
                if (r.fx) {
                  d().flash(r.fx, 1, [255, 255, 255]);
                }
                f("breakthrough");
                f("whisper");
                r.fadeGoal = 1;
                r.fadeSpd = .9;
                c(10);
              }
              break;
            case 10:
              r.hero.alpha = Math.max(0, r.hero.alpha - .8 * t);
              return r.fade >= .98 && e.t > 1.4;
          }
          return !1;
        }(t, e);
      } })), T.rebirth.forEach(function (t, e) {
      M.push(function (t, e) {
        return { id: 0 === e ? "rebirth" : void 0, start: function (n) {
            if (0 === e) {
              (function () {
                r.phase = "rebirth";
                R(!1, 2.5);
                a.VFX.clear();
                r.rebirth = { t: 0, line: 0, orb: { a: 2.3, r: 1 }, stars: [], flash: 0 };
                for (var t = 0; t < 90; t++)
                  r.rebirth.stars.push({ x: Math.random(), y: Math.random(), s: Math.random(), ph: Math.random() * i });
                r.barsGoal = .6;
                r.fadeGoal = 0;
                r.fadeSpd = 1.2;
                p().skipVisible(!0);
                p().barsVisible(!1);
                r.heroFloor = 0;
              })();
            }
            p().narr(b(t), function () {
              n.done = !0;
            });
            r.rebirth.line = e;
          }, upd: function (a, t) {
            return !!t.done;
          }, end: function () {
            p().dialogHide();
          } };
      }(t, e));
    }), M.push({ id: "mortal", start: function () {
        r.fadeGoal = 1;
        r.fadeSpd = 1.5;
        p().dialogHide();
      }, upd: function (t, e) {
        e.t += t;
        if (!e.began && r.fade >= .97) {
          e.began = !0;
          e.t = 0;
          (function () {
            r.phase = "mortal";
            a.VFX.clear();
            a.Renderer;
            var t = { id: "mortal", name: r.cfg.name || "phàm nhân", maxHp: 100 };
            var e = Math.round(.42 * r.w);
            var n = Math.round(.7 * r.h);
            var o = k(t, v(r.cfg), e, n, 2);
            A(o, "sit", 0);
            o.alpha = 1;
            r.mortal = { t: 0, a: o, bg: null, birds: [], motes: [] };
            r.mortal.hut = {};
            r.mortal.bg = function (a, t, e) {
              for (var n = c().kit, o = Math.ceil(a / 2), r = Math.ceil(t / 2), l = n.mkCanvas(o, r), u = l.getContext("2d"), h = u.createImageData(o, r), f = new Uint32Array(h.data.buffer), d = n.ramp(["#150c2a", "#24103a", "#3a1646", "#58204e", "#7e2c52", "#a83c52", "#d05a50", "#ee8454", "#fbb065", "#ffd98a"]), p = n.ramp(["#2a1238", "#3a1a46", "#522355", "#72305c"]), m = n.ramp(["#1a0c26", "#26123a", "#341a46"]), g = .56 * r, y = .7 * o, b = g - 4, x = n.tex(), w = new Float32Array(o), v = new Float32Array(o), k = 0; k < o; k++)
                w[k] = g - 6 - .16 * r * Math.pow(1 - Math.abs(2 * n.vn1(.012 * k, 4) - 1), 1.3) - .05 * r * n.vn1(.05 * k, 5), v[k] = g + 6 - .08 * r * Math.pow(1 - Math.abs(2 * n.vn1(.02 * k + 9, 6) - 1), 1.2) - .03 * r * n.vn1(.09 * k, 7);
              for (var T = 0; T < r; T++)
                for (var M = 0; M < o; M++) {
                  var A = s(T / g, 0, 1);
                  var S = M - y;
                  var C = T - b;
                  var F = S * S + C * C;
                  var L = .06 + .55 * Math.pow(A, 1.5) + .6 * Math.exp(-F / (2 * Math.pow(.34 * r, 2))) + .07 * (n.smp(x.A, .5 * M, 1.4 * T) - .5);
                  var H = n.pick(d, L, M, T);
                  if (T >= w[M]) {
                    var X = (T - w[M]) / (.2 * r);
                    H = n.pick(p, .25 + .5 * s(X, 0, 1) * .5 + .35 * Math.exp(-F / (2 * Math.pow(.4 * r, 2))), M, T);
                  }
                  if (T >= v[M]) {
                    H = n.pick(m, .15 + .4 * s((T - v[M]) / (.2 * r), 0, 1) + .3 * Math.exp(-F / (2 * Math.pow(.5 * r, 2))), M, T);
                  }
                  f[T * o + M] = H;
                }
              u.putImageData(h, 0, 0);
              var R = g + .02 * r;
              u.fillStyle = "#10081a";
              u.fillRect(0, R, o, r - R);
              var _ = u.createLinearGradient(0, R, 0, r);
              _.addColorStop(0, "#2a1a30");
              _.addColorStop(1, "#0c0612");
              u.fillStyle = _;
              u.fillRect(0, R, o, r - R);
              u.fillStyle = "#e8a060";
              u.globalAlpha = .18;
              u.fillRect(0, R, o, 2);
              u.globalAlpha = 1;
              var P = .14 * o;
              var V = R + 4;
              var E = .17 * o;
              var D = .13 * r;
              if (e) {
                e.px = 2 * (P + E / 2);
                e.py = 2 * (V - D - .1 * r);
                e.wx = 2 * (P + .3 * E);
                e.wy = 2 * (V - .62 * D);
                e.ww = .16 * E * 2;
                e.wh = .3 * D * 2;
              }
              u.fillStyle = "#120a1c";
              u.fillRect(P, V - D, E, D);
              u.beginPath();
              u.moveTo(P - 6, V - D);
              u.lineTo(P + E / 2, V - D - .1 * r);
              u.lineTo(P + E + 6, V - D);
              u.closePath();
              u.fill();
              u.fillStyle = "#ffb860";
              u.fillRect(P + .32 * E, V - .62 * D, .16 * E, .3 * D);
              u.fillStyle = "#7a3c40";
              u.fillRect(P - 6, V - D - 1, E + 12, 1);
              u.strokeStyle = "#0c0614";
              u.lineWidth = 3;
              u.lineCap = "round";
              var O = .86 * o;
              var K = R + 6;
              u.beginPath();
              u.moveTo(O, K);
              u.quadraticCurveTo(O - 4, K - .18 * r, O + 2, K - .3 * r);
              u.stroke();
              u.lineWidth = 1.6;
              for (var B = 0; B < 6; B++)
                u.beginPath(), u.moveTo(O + 1, K - r * (.14 + .03 * B)), u.lineTo(O + (B % 2 ? 1 : -1) * (10 + 3 * B), K - r * (.2 + .04 * B)), u.stroke();
              u.fillStyle = "#0c0614";
              for (var G = 0; G < 26; G++)
                u.beginPath(), u.arc(O + 38 * (Math.random() - .5), K - .34 * r + 14 * (Math.random() - .5), 3 + 4 * Math.random(), 0, i), u.fill();
              u.fillStyle = "#120a1c";
              for (var I = 0; I < 11; I++) {
                var U = .36 * o + 6 * I;
                u.fillRect(U, R - 2 - I % 3, 2, 7 + I % 3);
              }
              u.fillRect(.36 * o, R, 66, 1);
              u.fillRect(.36 * o, R + 3, 66, 1);
              u.fillStyle = "#0a0510";
              for (var q = 0; q < o; q += 3) {
                var W = 2 + 7 * q % 5;
                u.fillRect(q, r - W - 2 - 13 * q % 6, 2, W + 6);
              }
              return l;
            }(r.w, r.h, r.mortal.hut);
            for (var l = 0; l < 5; l++)
              r.mortal.birds.push({ x: Math.random() * r.w, y: r.h * (.14 + .18 * Math.random()), v: 8 + 10 * Math.random(), ph: Math.random() * i });
            for (l = 0; l < 40; l++)
              r.mortal.motes.push({ x: Math.random() * r.w, y: Math.random() * r.h, v: 3 + 6 * Math.random(), ph: Math.random() * i });
            r.barsGoal = 0;
            r.fade = 1;
            r.fadeGoal = 0;
            r.fadeSpd = .7;
            p().skipVisible(!0);
            p().barsVisible(!1);
          })();
        }
        return e.began && e.t >= 3.4;
      } }), T.mortal.forEach(function (a) {
      var t;
      M.push((t = a, { id: void 0, start: function (a) {
          p().narr(b(t), function () {
            a.done = !0;
          });
        }, upd: function (a, t) {
          return !!t.done;
        }, end: function () {
          p().dialogHide();
        } }));
    }), M.push({ id: "end", start: function (a) {
        p().dialogHide();
        p().card({ title: T.end.title, sub: "", line: b(T.end.line) });
        r.cardShown = !0;
      }, upd: function (a, t) {
        t.t += a;
        if (t.t > 4.2 && !t.out) {
          t.out = !0;
          r.fadeGoal = 1;
          r.fadeSpd = 1.4;
          p().cardFade();
        }
        return t.t > 5.6;
      }, onTap: function (a) {
        if (a.st.t > 1.6 && a.st.t < 4.2) {
          a.st.t = 4.2;
        }
      } }), M);
    J();
    if (l.startAt) {
      Z(l.startAt);
    }
  }
  function X(a, t) {
    if (console.error("[Prologue] lỗi " + t + ":", a), r && (r.err = (r.err || 0) + 1, r.err >= 3 && !r.done)) {
      r.finishing = !0;
      r.fade = 1;
      r.fadeGoal = 1;
      try {
        p().hide();
      }
      catch (a) {
      }
      _();
    }
  }
  function R(t, e) {
    if (a.Audio && a.Audio.music) {
      a.Audio.music("tientruyen", t, e);
    }
  }
  function _() {
    if (r && !r.done) {
      r.done = !0;
      var t = r.params.onDone;
      if (t) {
        t(r.params);
      }
      else {
        a.Game.changeScene(a.SceneCharCreate, null);
      }
    }
  }
  function P() {
    var t = a.Renderer;
    var e = y() >= 1 && (t.gfx || 1) >= 2 && t.w * t.h <= 62e4 ? 2 : 1;
    r.job = c().start(t.w, t.h, { S: e, tier: y() });
    r.L = r.job.L;
    r.baked = !1;
    r.w = t.w;
    r.h = t.h;
  }
  function V(a) {
    f("thunder", { gain: .28 });
  }
  function E(a, t) {
    if (a.kx || a.ky) {
      a.x += a.kx * t;
      a.y += a.ky * t;
      var e = Math.exp(-8 * t);
      a.kx *= e;
      a.ky *= e;
      if (Math.abs(a.kx) < 1 && Math.abs(a.ky) < 1) {
        a.kx = 0;
        a.ky = 0;
      }
    }
  }
  function D(a, t, e, n) {
    var o = a.x - t;
    var r = .6 * (a.y - e);
    var i = Math.sqrt(o * o + r * r) || 1;
    a.kx += o / i * n;
    a.ky += r / i * n * .5;
  }
  function O(a) {
    for (var t = [r.hero].concat(r.enemies), e = 0; e < t.length; e++) {
      var n = t[e];
      if (n !== a && !n.dead && !n.hidden) {
        var o = a.x - n.x;
        var i = 1.8 * (a.y - n.y);
        var l = Math.sqrt(o * o + i * i);
        if (l < 16 && l > .01) {
          var s = .5 * (16 - l);
          a.x += o / l * s;
          a.y += i / l * s / 1.8;
        }
      }
    }
  }
  function K(a, t) {
    var e = a.goTo;
    if (e) {
      var n = e.x - a.x;
      var o = e.y - a.y;
      var r = Math.sqrt(n * n + o * o);
      if (r < 3) {
        a.goTo = null;
        a.moving = !1;
        if ("walk" === a.pose) {
          A(a, "idle");
        }
        return void (e.cb && e.cb());
      }
      var i = (e.sp || 70) * t;
      a.x += n / r * Math.min(i, r);
      a.y += o / r * Math.min(i, r);
      if (!(e.keepDir)) {
        if (Math.abs(n) >= .8 * Math.abs(o)) {
          a.dir = n < 0 ? 1 : 2;
        }
        else {
          a.dir = o < 0 ? 3 : 0;
        }
      }
      a.moving = !0;
      a.walkT += t;
      if (!("walk" === a.pose || M[a.pose])) {
        A(a, "walk");
      }
    }
  }
  function B(a, t, e, n, o, r) {
    a.goTo = { x: t, y: e, sp: n, cb: o, keepDir: r };
  }
  function G() {
    return r.enemies.filter(function (a) {
      return !a.dead && !a.hidden;
    });
  }
  function I(a, t) {
    var e = null;
    var n = t || 1e9;
    G().forEach(function (t) {
      var o = x(a.x, a.y, t.x, t.y);
      if (o < n) {
        n = o;
        e = t;
      }
    });
    return e;
  }
  function U(t, e, n) {
    if (n = n || {}, !t.dead) {
      var o = t.hp;
      t.hp = Math.max(t.floorHp, t.hp - e);
      a.VFX.spawnDamage(t.x, t.y - 44, Math.max(1, Math.round(e * t.maxHp)), null, !!n.big);
      t.flash = .12;
      if (n.burn) {
        t.burnT = Math.max(t.burnT || 0, n.burn);
      }
      if (!(n.quiet)) {
        A(t, "hurt", .28);
        t.stunT = Math.max(t.stunT, n.stun || .2);
        if (n.kb) {
          D(t, null != n.fromX ? n.fromX : r.hero.x, null != n.fromY ? n.fromY : r.hero.y, 3.4 * n.kb);
        }
      }
      if (r.onEnemyHit) {
        r.onEnemyHit(t, n, o - t.hp);
      }
    }
  }
  function q(t, e) {
    e = e || {};
    var o = r.hero;
    var i = a.VFX;
    if (o.dead || o.invul > 0 && !e.force) {
      return !1;
    }
    var l = t * o.maxHp;
    if (o.invul = .45, o.shieldHp > 0) {
      var s = Math.min(o.shieldHp, l);
      if (o.shieldHp -= s, l -= s, i.spawnDamage(o.x, o.y - 52, Math.round(s), "take"), o.shieldHp <= 0) {
        var u = o.shieldLong;
        o.shieldHp = 0;
        o.shieldT = 0;
        o.shieldLong = !1;
        p().toast(u ? n.TEXT.longBreak : n.TEXT.shieldBreak, !0);
        f("hurt", { gain: .7 });
        if (a.Camera) {
          a.Camera.shake(4, .25);
        }
        if (r.fx) {
          d().flash(r.fx, .35, [255, 210, 120]);
        }
      }
    }
    if (l > 0) {
      var h = e.noFloor ? 0 : null == r.heroFloor ? n.HERO_FLOOR : r.heroFloor;
      var c = o.hp;
      o.hp = Math.max(h, o.hp - l / o.maxHp);
      i.spawnDamage(o.x, o.y - 52, Math.round((c - o.hp) * o.maxHp) || Math.round(l), "take");
    }
    A(o, "hurt", .3);
    o.busy = Math.max(o.busy, .12);
    if (null != e.fromX) {
      D(o, e.fromX, e.fromY, e.kb || 60);
    }
    i.spawnVignette("#8e1c14", .32, .55);
    i.spawnBloodSpit(o.x, o.y, o.dir, 3);
    f("hurt", { gain: .8 });
    if (a.Camera) {
      a.Camera.shake(2.4, .18);
    }
    return !0;
  }
  function W(t) {
    var e = r.hero;
    var o = a.LucTinhTrucKiem;
    var i = a.VFX;
    if (!r.truc && o) {
      r.truc = !0;
      r.trucHits = 0;
      e.cfg = Object.assign({}, e.cfg, { lucTinh: !0 });
      o.summon(e, a.Game.time);
      if (!(t)) {
        A(e, "cast", .7);
        e.busy = .5;
        e.goal = null;
        i.spawnRing(e.x, e.y - 8, "#8dffc0", 74, .8);
        i.spawnRing(e.x, e.y - 8, "#e8fff0", 42, .55);
        i.spawnFlash(.2, "#d8ffe8");
        if (r.fx) {
          d().flash(r.fx, .3, [150, 255, 200]);
          d().pulseArray(r.fx, 1.2);
        }
        p().banner(n.AUTO.truc.name, n.AUTO.truc.color);
        f("breakthrough", { gain: .5 });
        f("spell");
        if (a.Camera) {
          a.Camera.shake(4, .3);
        }
      }
    }
  }
  function N(t) {
    var e = n.SKILLS[t];
    var o = r.sk[t];
    var i = r.hero;
    if (a.VFX, !o.unlocked || i.dead || i.down || i.stunT > 0) {
      return !1;
    }
    if (o.cd > 0) {
      return !1;
    }
    if (i.mp < e.mp) {
      p().toast("Hết Linh Lực", !0);
      f("deny");
      return !1;
    }
    i.mp -= e.mp;
    o.cd = e.cd;
    o.used++;
    i.goal = null;
    r.idleT = 0;
    var l = I(i, 320);
    if (l) {
      C(i, l.x, l.y);
    }
    p().banner(e.name, e.color);
    if (r.fx) {
      d().pulseArray(r.fx, 1);
    }
    f("spell");
    if ("loi" === e.id) {
      (function (t) {
        var e = r.hero;
        var n = a.VFX;
        A(e, "cast", .42);
        e.busy = .38;
        var o;
        var i = (o = e, G().map(function (a) {
          return { e: a, d: x(o.x, o.y, a.x, a.y) };
        }).filter(function (a) {
          return a.d <= 340;
        }).sort(function (a, t) {
          return a.d - t.d;
        }).slice(0, 3).map(function (a) {
          return a.e;
        }));
        if (!(i.length)) {
          i = [{ x: e.x + (1 === e.dir ? -80 : 80), y: e.y, fake: !0 }];
        }
        n.spawnRing(e.x, e.y - 6, t.color, 30, .45);
        i.forEach(function (o, i) {
          m(.14 + .1 * i, function () {
            if (r) {
              var i = e.x + (1 === e.dir ? -8 : 8);
              var l = e.y - 30;
              n.spawnTalismanPaper(i, l, o.x, o.y, "loi_dong", { impact: !0, life: .3, fromLift: 0, toLift: 24, lift: 16 });
              m(.3, function () {
                if (r) {
                  n.spawnLightning(o.x, o.y);
                  n.spawnLoiDong(o.x, o.y);
                  n.spawnRing(o.x, o.y, "#d9b8ff", 38, .4);
                  if (!(o.fake)) {
                    U(o, t.dmg, { kind: "loi", stun: .7, kb: 14, fromX: e.x, fromY: e.y, big: !0 });
                  }
                  f("thunder", { gain: .5 });
                  if (a.Camera) {
                    a.Camera.shake(2.5, .16);
                  }
                }
              });
            }
          });
        });
      })(e);
    }
    else {
      if ("bang" === e.id) {
        (function (t, e) {
          var n = r.hero;
          var o = a.VFX;
          r.L;
          A(n, "seal", .5);
          n.busy = .4;
          var i = e ? e.x : n.x + (1 === n.dir ? -70 : 70);
          var l = e ? e.y : n.y;
          o.spawnRing(n.x, n.y - 6, t.color, 32, .45);
          if (o.spawnBangKiemTran) {
            o.spawnBangKiemTran(i, l, { colors: g("bang_kiem_tran"), radius: 76 });
          }
          m(.34, function () {
            if (r) {
              G().forEach(function (a) {
                var e = (a.x - i) / 76;
                var n = (a.y - l) / 45.6;
                if (!(e * e + n * n > 1)) {
                  U(a, t.dmg, { kind: "bang", stun: .3, kb: 0, quiet: !0, big: !0 });
                  a.freezeT = 2.6;
                  a.slowT = 5;
                  A(a, "hurt", .2);
                  a.busy = 0;
                  j(a);
                }
              });
              f("weapon_frost_sword", { gain: .8 });
              if (r.fx) {
                d().flash(r.fx, .2, [160, 230, 255]);
              }
            }
          });
        })(e, l);
      }
      else {
        if ("kim" === e.id) {
          (function (t, e) {
            var n = r.hero;
            var o = a.VFX;
            A(n, "cast", .5);
            n.busy = .45;
            var i = e || { x: n.x + (1 === n.dir ? -80 : 80), y: n.y, dead: !1 };
            a.KimKiemFX.spawn(n, i, { hitDelay: 1.55 });
            m(1.55, function () {
              if (r) {
                if (!(i.fake || null == i.hp)) {
                  U(i, t.dmg, { kind: "kim", stun: 1.2, kb: 46, fromX: n.x, fromY: n.y, big: !0 });
                  j(i);
                }
                o.spawnRing(i.x, i.y, "#ffe28a", 52, .5);
                if (r.fx) {
                  d().flash(r.fx, .4, [255, 220, 120]);
                }
                f("hit_big");
              }
            });
          })(e, l);
        }
        else {
          (function (t, e) {
            var n = r.hero;
            var o = a.VFX;
            A(n, "seal", .8);
            n.busy = .6;
            var i = e || { x: n.x + 80, y: n.y };
            r.vanFx = a.VanKiemFX.spawn(n, { x: i.x, y: i.y, target: null != i.hp ? i : null }, 1.7, 0, 1);
            o.spawnRing(n.x, n.y - 6, t.color, 44, .7);
            if (r.fx) {
              d().setMood(r.fx, Math.max(r.fx.moodGoal, .5));
              d().pulseArray(r.fx, 1.4);
            }
            m(1.7, function () {
              if (r) {
                G().forEach(function (e, o) {
                  m(.07 * o, function () {
                    if (r) {
                      U(e, t.dmg, { kind: "van", stun: 1.4, kb: 60, fromX: n.x, fromY: n.y, big: !0 });
                      a.VFX.spawnRing(e.x, e.y, "#bff8ee", 46, .45);
                      a.VFX.spawnHitSpark(e.x, e.y - 26, 1, -.4);
                      j(e);
                    }
                  });
                });
                if (r.fx) {
                  d().flash(r.fx, .7, [190, 255, 245]);
                }
                o.spawnFlash(.35, "#d8fff8");
                if (a.Camera) {
                  a.Camera.shake(7, .5);
                }
                f("hit_big");
                f("breakthrough", { gain: .5 });
              }
            });
          })(e, l);
        }
      }
    }
    if (r.onCast) {
      r.onCast(e.id);
    }
    return !0;
  }
  o.enter = function (t) {
    try {
      H(t);
    }
    catch (i) {
      console.error("[Prologue] không dựng được, bỏ qua:", i);
      var e = t && t.onDone;
      r = null;
      try {
        var n = p();
        if (n.built) {
          n.hide();
        }
      }
      catch (a) {
      }
      setTimeout(function () {
        if (a.Game.scene === o) {
          if (e) {
            e(t);
          }
          else {
            a.Game.changeScene(a.SceneCharCreate, null);
          }
        }
      }, 0);
    }
  };
  o.exit = function () {
    R(!1, .6);
    var t = p();
    if (t.built) {
      t.anchor = null;
      t.hide();
      t.hint(null);
      t.dialogHide();
      t.cardHide();
      t.pulse(null);
    }
    if (a.VFX) {
      a.VFX.clear();
    }
    if (r && r.art && c()) {
      c().release(r.art);
    }
    if (r && r.mortal && r.mortal.bg) {
      r.mortal.bg.width = 0;
      r.mortal.bg.height = 0;
    }
    if (a.Camera) {
      a.Camera.shakeTime = 0;
      a.Camera.ox = 0;
      a.Camera.oy = 0;
    }
    r = null;
  };
  o.skip = function () {
    if (r && !r.finishing) {
      r.finishing = !0;
      R(!1, 1.2);
      r.timers.length = 0;
      r.tele.length = 0;
      r.ai.on = !1;
      r.mode = "cine";
      var a = p();
      a.dialogHide();
      a.hint(null);
      a.pulse(null);
      a.captionHide();
      a.controls(!1);
      a.skipVisible(!1);
      a.cardFade();
      r.fadeGoal = 1;
      r.fadeSpd = 2.6;
      r.endAfterFade = !0;
    }
  };
  o.debug = function () {
    return r;
  };
  o.jump = function (a) {
    return !!r && Z(a);
  };
  o.testAttack = function (a, t) {
    return r && Y[a] ? Q(r.actors[a], Y[a][t || 0]) : null;
  };
  o.update = function (t) {
    if (r) {
      try {
        (function (t) {
          if (r) {
            var e = a.Renderer;
            if (r.t += t, !r.baked || e.w === r.w && e.h === r.h || function () {
              var t = r.L;
              var e = a.Renderer;
              var n = r.fx ? r.fx.moodGoal : 0;
              if (r.art) {
                c().release(r.art);
              }
              r.art = null;
              r.fx = null;
              P();
              c().pump(r.job, 1e9);
              r.art = r.job.out;
              r.job = null;
              r.fx = d().create(r.art, { tier: y(), onThunder: V });
              r.fx.mood = r.fx.moodGoal = n;
              r.baked = !0;
              var o = [r.hero].concat(r.enemies);
              var i = r.L;
              o.forEach(function (a) {
                a.x = i.cx + (a.x - t.cx) / t.rx * i.rx;
                a.y = i.cy + (a.y - t.cy) / t.ry * i.ry;
                a.home.x = i.cx + (a.home.x - t.cx) / t.rx * i.rx;
                a.home.y = i.cy + (a.home.y - t.cy) / t.ry * i.ry;
              });
              if (r.marker) {
                r.marker.x = i.cx + (r.marker.x - t.cx) / t.rx * i.rx;
                r.marker.y = i.cy + (r.marker.y - t.cy) / t.ry * i.ry;
              }
              if (a.Camera) {
                a.Camera.snapTo(e.w / 2, e.h / 2, e.w, e.h, e.w, e.h);
              }
            }(), function (t) {
              for (var e = a.SpriteFactory, n = L(), o = !1, r = 0; r < n.length; r++) {
                var i = n[r];
                if (!(i.sheet)) {
                  o = !0;
                  i.sheet = e.peek(i.key);
                  if (!(i.sheet)) {
                    i.sheetWait += t;
                    if (i.sheetWait > 2.5) {
                      i.sheet = e.get(i.cfg);
                    }
                  }
                }
              }
              if (o) {
                e.pump(7);
              }
            }(t), function () {
              if (!r.baked && r.job) {
                var a = r.fade >= .95 ? 22 : 8;
                if (c().pump(r.job, a)) {
                  r.art = r.job.out;
                  r.job = null;
                  r.fx = d().create(r.art, { tier: y(), onThunder: V });
                  r.fx.mood = r.fx.moodGoal = r.mood;
                  r.baked = !0;
                }
              }
            }(), p().update(t), (l = a.Input).consumeMenu() ? o.skip() : "cine" !== r.mode && "battle" === r.phase || ((l.consumeAttack() || l.consumeInteract() || l.consumeTap()) && (p().talking() ? p().advance() : r.cur && r.cur.onTap && r.cur.onTap(r.cur)), l.consumeSlot()), function (a) {
              for (var t = r.timers.length - 1; t >= 0; t--) {
                var e = r.timers[t];
                if (e.t -= a, e.t <= 0) {
                  r.timers.splice(t, 1);
                  try {
                    e.fn();
                  }
                  catch (a) {
                    console.error("[Prologue]", a);
                  }
                  if (!r) {
                    return;
                  }
                }
              }
            }(t), r && (function (a) {
              if (!r.finishing) {
                var t = r.cur;
                if (t && t.upd(a, t.st, t)) {
                  if (t.end && t.end(t.st, t), !r || r.finishing) {
                    return;
                  }
                  if (!r.script[r.si + 1]) {
                    r.cur = null;
                    return void _();
                  }
                  J();
                }
              }
            }(t), r)) {
              if (r.ambT = (null == r.ambT ? 2.5 : r.ambT) - t, r.ambT <= 0 && (r.ambT = 11 + 8 * Math.random(), "battle" === r.phase && r.baked ? f("huyet_hang_ambient", { gain: .38, rate: .9 + .1 * Math.random() }) : "mortal" === r.phase && f("huyet_rung_ambient", { gain: .3, rate: 1.05 + .1 * Math.random() })), r.fade += (r.fadeGoal - r.fade) * Math.min(1, t * r.fadeSpd * 3), Math.abs(r.fade - r.fadeGoal) < .004 && (r.fade = r.fadeGoal), r.bars += (r.barsGoal - r.bars) * Math.min(1, 3.2 * t), r.endAfterFade && r.fade >= .99) {
                r.endAfterFade = !1;
                return void _();
              }
              if ("battle" === r.phase) {
                if (!r.baked) {
                  return;
                }
                !function (t) {
                  var e = r.hero;
                  var o = a.Input;
                  var i = r.L;
                  if (e.animTime += t, e.poseT += t, e.flash = Math.max(0, e.flash - t), e.invul = Math.max(0, e.invul - t), e.busy = Math.max(0, e.busy - t), e.stunT = Math.max(0, e.stunT - t), e.atkCd = Math.max(0, (e.atkCd || 0) - t), e.comboT = Math.max(0, (e.comboT || 0) - t), "attack" === e.state && (e.attackTime += t, e.attackTime >= (e.atkDur || .96) && (e.state = "idle", e.attackTime = 0)), e.downed = !(!e.down && !e.dead), e.shieldLong && (e.shieldT -= t, (e.shieldT <= 0 || e.shieldHp <= 0) && (e.shieldLong = !1, e.shieldHp = 0, e.shieldT = 0)), function (t) {
                    var e = r.hero;
                    if (!("play" !== r.mode || e.dead || e.down || "battle" !== r.phase)) {
                      if (r.autoLong) {
                        r.longArm += t;
                        if (e.shieldHp <= 0 && (e.hp < .74 || r.longArm > 26) && r.longUsed < 2 && r.t - (r.longLast || -99) > 18) {
                          (function () {
                            var t = r.hero;
                            var e = a.VFX;
                            var o = n.AUTO.long;
                            r.longUsed++;
                            r.longLast = r.t;
                            t.shieldLong = !0;
                            t.shieldBell = !1;
                            t.shieldHp = o.shield;
                            t.shieldMax = o.shield;
                            t.shieldT = o.secs;
                            A(t, "cast", .45);
                            t.busy = Math.max(t.busy, .35);
                            e.spawnTalismanPaper(t.x, t.y - 30, t.x, t.y - 46, "kim_giap", { life: .45, lift: 6, fromLift: 24, toLift: 40, colors: { paper: "#ffeaa0", edge: "#c9902a", ink: "#8a4b16", glow: "#ffe98a" } });
                            e.spawnRing(t.x, t.y - 6, o.color, 50, .6);
                            e.spawnRing(t.x, t.y - 6, "#fff3c0", 28, .45);
                            p().banner(o.name, o.color);
                            f("spell", { gain: .5, rate: .85 });
                            aa("hero", "heroLong");
                            m(1, function () {
                              if (r) {
                                aa("huyet", "huyetLong");
                              }
                            });
                          })();
                        }
                      }
                      r.kimoT -= t;
                      if (r.kimoT <= 0 && e.busy <= 0 && e.stunT <= 0) {
                        (function () {
                          var t = r.hero;
                          var e = a.VFX;
                          var o = n.AUTO.kimo;
                          var i = G();
                          if (i.length && r.baked) {
                            var l = i[0];
                            var s = -1e9;
                            i.forEach(function (a) {
                              var e = 0;
                              i.forEach(function (t) {
                                var n = t.x - a.x;
                                var o = 1.7 * (t.y - a.y);
                                if (n * n + o * o < 1e4) {
                                  e++;
                                }
                              });
                              if ((e -= x(t.x, t.y, a.x, a.y) / 300) > s) {
                                s = e;
                                l = a;
                              }
                            });
                            var u = l.x - t.x;
                            var h = l.y - 18 - (t.y - 22);
                            var c = Math.sqrt(u * u + h * h) || 1;
                            u /= c;
                            h /= c;
                            C(t, l.x, l.y);
                            A(t, "cast", .6);
                            t.busy = .5;
                            t.goal = null;
                            r.kimoT = o.cd;
                            e.spawnTalismanPaper(t.x, t.y - 34, t.x + 22 * u, t.y - 34 + 12 * h, "hoa_phu", { life: .3, lift: 8, arc: 5 });
                            e.spawnKimO(t.x, t.y, u, h);
                            p().banner(o.name, o.color);
                            f("spell", { gain: .5, rate: .7 });
                            aa("hero", "heroKimO");
                            G().forEach(function (n) {
                              var i = n.x - t.x;
                              var l = n.y - 18 - (t.y - 22);
                              var s = i * u + l * h;
                              var c = Math.abs(i * h - l * u);
                              if (!(s < 10 || s > 340 || c > 42)) {
                                m(.72 + Math.min(.5, s / 340 * .55), function () {
                                  if (r && !n.dead) {
                                    U(n, o.dmg, { kind: "kimo", stun: .6, kb: 28, fromX: t.x, fromY: t.y, big: !0, burn: 5 });
                                    e.spawnKimOImpact(n.x, n.y - 22, u, h);
                                    j(n);
                                    f("thunder", { gain: .4, rate: .75 });
                                    f("hit_big", { gain: .5, rate: .8 });
                                    if (a.Camera) {
                                      a.Camera.shake(3, .2);
                                    }
                                  }
                                });
                              }
                            });
                            m(1.3, function () {
                              if (r && "play" === r.mode) {
                                aa("hacsat", "hacKimO");
                              }
                            });
                          }
                          else {
                            r.kimoT = 3;
                          }
                        })();
                      }
                    }
                  }(t), e.poseDur > 0 && e.poseT >= e.poseDur && "down" !== e.pose && A(e, e.moving ? "walk" : "idle"), e.lunge) {
                    var l = e.lunge;
                    var u = Math.min(t, l.dur - l.t);
                    e.x += l.dx * u / l.dur;
                    e.y += l.dy * u / l.dur;
                    l.t += t;
                    if (l.t >= l.dur) {
                      e.lunge = null;
                    }
                  }
                  E(e, t);
                  var h = "play" === r.mode && !e.dead && !e.down;
                  if (e.moving = !1, h) {
                    var c = o.vector;
                    var d = c.x;
                    var g = c.y;
                    var y = 0 !== d || 0 !== g;
                    var b = o.consumeTap();
                    if (y && (e.goal = null, r.idleT = 0), b && r.tutAllowMove && (e.goal = { x: b.x, y: b.y }, r.idleT = 0, a.VFX.spawnRipple(b.x, b.y, "#ffe8a0")), !y && e.goal) {
                      var w = e.goal.x - e.x;
                      var v = e.goal.y - e.y;
                      var k = Math.sqrt(w * w + v * v);
                      if (k < 4) {
                        e.goal = null;
                      }
                      else {
                        d = w / k;
                        g = v / k;
                      }
                    }
                    if (e.busy <= 0 && e.stunT <= 0 && (0 !== d || 0 !== g)) {
                      var T = 92 * Math.min(1, Math.sqrt(d * d + g * g)) * (e.slowT > 0 ? .5 : 1);
                      e.x += d * T * t;
                      e.y += g * T * t;
                      if (Math.abs(d) >= .8 * Math.abs(g)) {
                        e.dir = d < 0 ? 1 : 2;
                      }
                      else {
                        e.dir = g < 0 ? 3 : 0;
                      }
                      e.moving = !0;
                      e.walkT += t;
                      if (!("walk" === e.pose || M[e.pose])) {
                        A(e, "walk");
                      }
                      if ((4 * e.walkT | 0) != (4 * (e.walkT - t) | 0)) {
                        f("step", { gain: .35 });
                      }
                    }
                    else {
                      if ("walk" === e.pose) {
                        A(e, "idle");
                      }
                    }
                    if (o.consumeAttack()) {
                      r.atkBuf = .28;
                    }
                    if ((r.atkBuf > 0 || p().atkHeld) && r.tutAllowAtk && function () {
                      var t = r.hero;
                      if (t.busy > 0 || t.atkCd > 0 || t.stunT > 0 || t.dead || t.down) {
                        return !1;
                      }
                      var e = I(t, 130);
                      if (e) {
                        C(t, e.x, e.y);
                      }
                      t.atkCd = .44;
                      t.busy = .391;
                      A(t, "attack", .46);
                      t.goal = null;
                      t.combo = t.comboT > 0 ? t.combo % 3 + 1 : 1;
                      t.comboT = 1.2;
                      var n = t.combo;
                      if (e) {
                        var o = Math.sqrt((e.x - t.x) * (e.x - t.x) + (e.y - t.y) * (e.y - t.y)) || 1;
                        var i = s(o - 36, 0, 30);
                        t.lunge = { dx: (e.x - t.x) / o * i, dy: (e.y - t.y) / o * i, t: 0, dur: .14 };
                      }
                      var l = a.Audio;
                      var u = a.LucTinhTrucKiem;
                      f(l && l.weaponAttackSfx ? l.weaponAttackSfx("luc_tinh_kiem") : "swing", { rate: .94 + .14 * Math.random() });
                      var h = .18;
                      if (r.truc && u && u.startAttack) {
                        t.state = "attack";
                        t.attackTime = 0;
                        t.atkDur = u.attackDuration(t);
                        u.startAttack(t, e, a.Game.time);
                        h = .35 * t.atkDur;
                        t.atkCd = .5;
                      }
                      m(h, function () {
                        !function (t, e) {
                          var n = r.hero;
                          if (n && !n.dead) {
                            if (!(r.truc)) {
                              a.VFX.spawnLucTinhKiemSlash(n.x, n.y, n.dir);
                            }
                            var o = t && !t.dead && x(n.x, n.y, t.x, t.y) <= 68 ? t : null;
                            if (!o) {
                              var i = I(n, 54);
                              if (i) {
                                o = i;
                              }
                            }
                            if (o) {
                              var l = 3 === e;
                              var s = o.x - n.x;
                              var u = o.y - n.y;
                              if (r.truc) {
                                r.trucHits++;
                              }
                              U(o, .026 * (l ? 1.9 : 1) * (r.truc ? 1.5 : 1), { kind: "slash", big: l, kb: l ? 70 : 26, fromX: n.x, fromY: n.y, stun: l ? .45 : .18 });
                              a.VFX.spawnLucTinhKiemImpact(o.x, o.y - 26, s, u - 6);
                              var h = a.Audio;
                              f(h && h.weaponImpactSfx ? h.weaponImpactSfx("luc_tinh_kiem") : "hit", { rate: .95 + .1 * Math.random() });
                              if (l && a.Camera) {
                                a.Camera.shake(3, .16);
                              }
                              if (r.onHeroHit) {
                                r.onHeroHit(o, "slash");
                              }
                            }
                          }
                        }(e, n);
                      });
                      r.idleT = 0;
                      r.atkCount = (r.atkCount || 0) + 1;
                      return !0;
                    }()) {
                      r.atkBuf = 0;
                    }
                    r.atkBuf = Math.max(0, (r.atkBuf || 0) - t);
                    var S = o.consumeSlot();
                    if (S >= 1 && S <= 4 && (r.slotBuf = { n: S, t: .32 }), r.slotBuf)
                      if (r.slotBuf.t -= t, r.slotBuf.t <= 0) {
                        r.slotBuf = null;
                      }
                      else if (e.busy <= 0 && e.stunT <= 0) {
                        var F = r.slotBuf.n;
                        r.slotBuf = null;
                        N(F - 1);
                      }
                  }
                  else {
                    o.consumeAttack();
                    o.consumeSlot();
                    o.consumeTap();
                    if (!("walk" !== e.pose || e.goTo)) {
                      A(e, "idle");
                    }
                  }
                  K(e, t);
                  O(e);
                  a.TuyetMenhFx.clamp(i, e, 3);
                }(t);
                (function (t) {
                  var e = r.hero;
                  var n = r.L;
                  var o = r.ai;
                  r.enemies.forEach(function (i) {
                    if (i.animTime += t, i.poseT += t, i.flash = Math.max(0, i.flash - t), i.stunT = Math.max(0, i.stunT - t), i.busy = Math.max(0, i.busy - t), i.slowT = Math.max(0, i.slowT - t), function (a, t) {
                      var e = a.spear;
                      if (e) {
                        e.x = a.x;
                        e.y = a.y;
                        e.dir = a.dir;
                        if ("attack" === e.state) {
                          e.attackTime += t;
                          if (e.attackTime >= e.atkDur) {
                            e.state = "idle";
                            e.attackTime = 0;
                          }
                        }
                      }
                    }(i, t), i.burnT > 0 && (i.burnT -= t, i.burnTick = (i.burnTick || 0) + t, i.burnTick >= .7 && !i.dead && (i.burnTick = 0, U(i, .005, { quiet: !0 }))), i.freezeT > 0 && (i.freezeT -= t, i.freezeT <= 0 && (a.VFX.spawnRing(i.x, i.y - 20, "#bdf0ff", 34, .35), f("weapon_impact_pierce", { gain: .5 }))), i.poseDur > 0 && i.poseT >= i.poseDur && "down" !== i.pose && A(i, i.moving ? "walk" : "idle"), E(i, t), !i.dead) {
                      var l = i.freezeT > 0;
                      var s = i.stunT > 0;
                      if (i.moving = !1, i.goTo) {
                        K(i, t);
                      }
                      else if ("play" === r.mode && !l && !s && i.busy <= 0 && !i.engaging) {
                        var u = i.home.x + 10 * Math.sin(.6 * r.t + i.ph);
                        var c = i.home.y + 4 * Math.cos(.45 * r.t + i.ph);
                        var d = u - i.x;
                        var p = c - i.y;
                        var m = Math.sqrt(d * d + p * p);
                        if (m > 2.5) {
                          var g = Math.min(m, 38 * t * (i.slowT > 0 ? .45 : 1));
                          i.x += d / m * g;
                          i.y += p / m * g;
                          i.moving = !0;
                          i.walkT += t;
                          if (!("walk" === i.pose || M[i.pose])) {
                            A(i, "walk");
                          }
                        }
                        else {
                          if ("walk" === i.pose) {
                            A(i, "idle");
                          }
                        }
                      }
                      else {
                        if (!("walk" !== i.pose || i.goTo)) {
                          A(i, "idle");
                        }
                      }
                      if (!l && i.busy <= 0 && "hurt" !== i.pose && C(i, e.x, e.y), O(i), a.TuyetMenhFx.clamp(n, i, 1), "play" === r.mode && o.on && !l && !s && i.busy <= 0 && !i.engaging) {
                        i.cd -= t;
                        var y = !o.allow || o.allow.indexOf(i.id) >= 0;
                        if (i.cd <= 0 && y && r.tele.length < o.conc && !e.dead) {
                          Q(i);
                          i.cd = h(3.6, 5.6) * (o.slow || 1);
                        }
                      }
                    }
                  });
                  var i = r.actors.lam;
                  if ("play" === r.mode && o.lamLash && !i.dead && i.freezeT <= 0) {
                    (function (t, e) {
                      var n = r.hero;
                      if (t.stunT > 0 || t.busy > 0 || "hurt" === t.pose) {
                        t.engaging = !0;
                      }
                      else {
                        if (t.engaging = !0, x(t.x, t.y, n.x, n.y) > 62) {
                          var o = n.x - t.x;
                          var i = n.y - t.y;
                          var l = Math.sqrt(o * o + i * i) || 1;
                          var s = 74 * e;
                          t.x += o / l * s;
                          t.y += i / l * s;
                          t.moving = !0;
                          t.walkT += e;
                          if ("walk" !== t.pose) {
                            A(t, "walk");
                          }
                          C(t, n.x, n.y);
                          return void (t.lashCd = Math.max(t.lashCd || 0, .5));
                        }
                        if ("walk" === t.pose) {
                          A(t, "idle");
                        }
                        t.lashCd = (t.lashCd || 1.2) - e;
                        C(t, n.x, n.y);
                        if (t.lashCd <= 0) {
                          t.lashCd = 2.4;
                          A(t, "attack", .5);
                          t.busy = .55;
                          a.VFX.spawnLoiTienLash(t.x, t.y, w(t.dir), n, { owner: t, weapon: "bach_loi_tien", crackAt: .26, strikeAt: .12, endAt: .55, sfx: "local", cancel: !1 });
                          m(.3, function () {
                            if (!(!r || t.dead || t.freezeT > 0)) {
                              if (x(t.x, t.y, n.x, n.y) <= 86) {
                                q(.045, { fromX: t.x, fromY: t.y, kb: 36 });
                              }
                            }
                          });
                        }
                      }
                    })(i, t);
                  }
                })(t);
                (function (t) {
                  for (var e = r.hero, n = r.tele.length - 1; n >= 0; n--) {
                    var o = r.tele[n];
                    if ("play" === r.mode || o.keep) {
                      if (o.t += t, o.t < o.lock) {
                        var i = Math.min(1, 5 * t);
                        o.x += (e.x - o.x) * i;
                        o.y += (e.y - o.y) * i;
                      }
                      if (!o.started && o.t >= o.dur - o.lead) {
                        o.started = !0;
                        try {
                          o.pat.start(o.e, o.x, o.y);
                        }
                        catch (a) {
                          console.error("[Prologue] chiêu địch", a);
                        }
                      }
                      if (o.t >= o.dur) {
                        r.tele.splice(n, 1);
                        var l = o.pat.r;
                        var s = .55 * o.pat.r;
                        var u = Math.pow((e.x - o.x) / l, 2) + Math.pow((e.y - o.y) / s, 2) <= 1;
                        A(o.e, "attack", .3);
                        try {
                          o.pat.hit(o.e, o.x, o.y);
                        }
                        catch (a) {
                          console.error("[Prologue] chiêu địch", a);
                        }
                        if (u) {
                          q(o.pat.dmg, { fromX: o.x, fromY: o.y, kb: 50 });
                        }
                        if (r.dodge && r.dodge.tl === o) {
                          r.dodge.result = u ? "hit" : "dodged";
                        }
                        if (r.fx) {
                          d().pulseArray(r.fx, .4);
                        }
                        if (a.Camera) {
                          a.Camera.shake(3, .2);
                        }
                      }
                    }
                    else {
                      r.tele.splice(n, 1);
                    }
                  }
                })(t);
                if (r.tt) {
                  a.TuTuongBanFX.update(r.tt, t);
                }
                d().update(r.fx, t);
                a.VFX.update(t);
                if (a.Camera) {
                  a.Camera.update(r.w / 2, r.h / 2, r.w, r.h, r.w, r.h, t);
                }
                (function (a) {
                  var t = r.hero;
                  var e = p();
                  e.bars(t.hp, t.mp / t.maxMp, t.shieldHp / (t.shieldMax || n.SHIELD));
                  for (var o = 0; o < n.SKILLS.length; o++) {
                    var i = r.sk[o];
                    var l = n.SKILLS[o];
                    if (i.cd > 0) {
                      i.cd = Math.max(0, i.cd - a);
                    }
                    e.skillState(o, { cd: i.cd / l.cd, sec: i.cd, mpOk: t.mp >= l.mp });
                  }
                  if (!("play" !== r.mode || t.dead)) {
                    t.mp = Math.min(t.maxMp, t.mp + 3.4 * a);
                  }
                })(t);
              }
              else {
                if ("rebirth" === r.phase) {
                  (function (a) {
                    var t = r.rebirth;
                    if (t.t += a, t.flash = Math.max(0, t.flash - 1.6 * a), Math.random() < 28 * a) {
                      var e = r.w;
                      var n = r.h;
                      var o = Math.random() * i;
                      var l = .6 * Math.max(e, n);
                      t.parts = t.parts || [];
                      t.parts.push({ x: e / 2 + Math.cos(o) * l, y: .4 * n + Math.sin(o) * l * .55, t: 0, dur: 2.2 + 1.6 * Math.random(), a: o, c: Math.random() < .5 ? 0 : 1 });
                    }
                    if (t.parts) {
                      for (var s = t.parts.length - 1; s >= 0; s--)
                        t.parts[s].t += a, t.parts[s].t >= t.parts[s].dur && t.parts.splice(s, 1);
                    }
                  })(t);
                  a.VFX.update(t);
                }
                else {
                  if ("mortal" === r.phase) {
                    (function (a) {
                      var t = r.mortal;
                      t.t += a;
                      var e = t.a;
                      e.animTime += a;
                      e.poseT += a;
                      if (t.t > 5.5 && "sit" === e.pose) {
                        A(e, "idle", 0);
                      }
                      for (var n = 0; n < t.birds.length; n++)
                        t.birds[n].x += t.birds[n].v * a, t.birds[n].x > r.w + 20 && (t.birds[n].x = -20);
                      for (n = 0; n < t.motes.length; n++) {
                        var o = t.motes[n];
                        o.y -= o.v * a * .6;
                        o.x += Math.sin(.7 * t.t + o.ph) * a * 4;
                        if (o.y < -4) {
                          o.y = r.h + 4;
                          o.x = Math.random() * r.w;
                        }
                      }
                    })(t);
                    a.VFX.update(t);
                  }
                }
              }
            }
          }
          var l;
        })(t);
        if (r) {
          r.err = 0;
        }
      }
      catch (a) {
        X(a, "khi cập nhật");
      }
    }
  };
  var Y = { huyet: [{ id: "cuuhuyet", windup: 1.15, lead: 1, r: 64, dmg: .078, color: "#ff4a6a", start: function (t, e, n) {
          a.VFX.spawnCuuHuyetTran(e, n, { colors: g("cuu_huyet_kiem_tran"), radius: 64 });
          f("weapon_blood_sword");
        }, hit: function (t, e, n) {
          a.VFX.spawnHuyetKiemImpact(e, n - 16, 0, -1);
          f("hit_big", { gain: .8 });
        } }, { id: "liem", windup: .95, lead: .22, r: 48, dmg: .068, color: "#ff3b52", start: function (t, e, n) {
          if (a.VFX.spawnHuyetLiem) {
            a.VFX.spawnHuyetLiem(t, { x: e, y: n }, { hitDelay: .17 });
          }
        }, hit: function (a, t, e) {
          f("hit_big", { gain: .8 });
        } }], hacsat: [{ id: "baoan", windup: .9, lead: .72, r: 66, dmg: .08, color: "#c27bff", say: "hac1", start: function (t, e, n) {
          a.VFX.spawnMaBaoAn(e, n, { colors: g("ma_bao_an"), radius: 66 });
        }, hit: function (t, e, n) {
          a.VFX.spawnMaBaoAnImpact(e, n, { colors: g("ma_bao_an"), radius: 66 });
          f("hit_big", { gain: .8 });
        } }, { id: "hon", windup: 1.15, lead: 1.05, r: 44, dmg: .065, color: "#a85cff", start: function (t, e, n) {
          if (a.VFX.spawnMaHonPhe) {
            a.VFX.spawnMaHonPhe(t, { x: e, y: n }, { colors: g("ma_hon_phe"), range: 200, hitDelay: 1.05 });
          }
        }, hit: function (a, t, e) {
          f("hit_big", { gain: .8 });
        } }, { id: "anhky", windup: .95, lead: .62, r: 42, dmg: .07, color: "#55cfff", say: "hacAnh", start: function (t, e, n) {
          if (a.VFX.spawnAnhKyPhu) {
            a.VFX.spawnAnhKyPhu(t.x, t.y - 8, { x: e, y: n }, { duration: .56, hitU: .9, range: 360, layers: 3 });
          }
        }, hit: function (t, e, n) {
          if (a.VFX.spawnAnhKyPhuImpact) {
            a.VFX.spawnAnhKyPhuImpact(e, n - 16);
          }
          f("hit_big", { gain: .8 });
        } }], tuyen: [{ id: "tramma", windup: .85, lead: .62, r: 62, dmg: .074, color: "#b77dff", start: function (t, e, n) {
          a.VFX.spawnTramMa(e, n);
        }, hit: function (a, t, e) {
          f("hit_big", { gain: .8 });
        } }, { id: "buc", windup: .8, lead: .34, r: 44, dmg: .062, color: "#ff5a4a", start: function (t, e, n) {
          if (a.VFX.spawnHuyetBuc) {
            a.VFX.spawnHuyetBuc(t, { x: e, y: n }, { hitDelay: .34 });
          }
        }, hit: function (a, t, e) {
          f("hit_big", { gain: .8 });
        } }, { id: "tienvu", windup: 1, lead: .44, r: 78, dmg: .075, color: "#ffd24a", say: "tuyenTien", start: function (t, e, n) {
          if (a.VFX.spawnTienVu) {
            a.VFX.spawnTienVu(e, n, { colors: g("tien_vu"), radius: 78 });
          }
        }, hit: function (a, t, e) {
          f("hit_big", { gain: .8 });
        } }, { id: "luan", windup: 1.25, lead: 1.25, r: 50, dmg: .07, color: "#8deaff", say: "tuyenLuan", start: function (t, e, n) {
          if (a.VFX.spawnBangKiemLuan) {
            a.VFX.spawnBangKiemLuan(t.x, t.y, { colors: g("bang_kiem_luan"), radius: 120, aim: Math.atan2(n - t.y, e - t.x), dir: t.dir, targets: [{ x: e, y: n + 18 }] });
          }
        }, hit: function (a, t, e) {
          f("weapon_frost_sword", { gain: .7 });
        } }], lam: [{ id: "loi", windup: .95, lead: .5, r: 58, dmg: .07, color: "#7fd6ff", start: function (t, e, n) {
          a.VFX.spawnLoanLoiBao(e, n);
        }, hit: function (t, e, n) {
          f("thunder", { gain: .5 });
          a.VFX.spawnLightning(e, n);
        } }, { id: "thuongvu", windup: 1.4, lead: 1.05, r: 84, dmg: .085, color: "#ffe680", say: "lamVu", wind: function (a) {
          T(a, r.hero);
        }, start: function (t, e, n) {
          if (a.HoangLoiFX) {
            a.HoangLoiFX.spawnThuongVu(t, { x: e, y: n }, { hitDelay: 1, radius: 84 });
          }
        }, hit: function (a, t, e) {
          f("thunder", { gain: .55 });
        } }, { id: "kimthuong", windup: 1.45, lead: 1.2, r: 78, dmg: .09, color: "#ff9a3a", say: "lamThuong", wind: function (a) {
          T(a, r.hero);
        }, start: function (t, e, n) {
          if (a.VFX.spawnKimThuongGiangThe) {
            a.VFX.spawnKimThuongGiangThe(e, n);
          }
        }, hit: function (t, e, n) {
          f("hit_big", { gain: .8 });
          if (a.Camera) {
            a.Camera.shake(3, .2);
          }
        } }] };
  function j(a) {
    for (var t = r.tele.length - 1; t >= 0; t--)
      r.tele[t].e === a && r.tele.splice(t, 1);
    if ("cast" === a.pose) {
      A(a, "idle");
    }
    a.busy = 0;
  }
  function z(a, t) {
    if (r && "play" === r.mode && !r.hero.dead && !r.hero.down) {
      var e = r.actors[a];
      if (!(!e || e.dead || e.freezeT > 0 || e.stunT > 0 || e.busy > 0)) {
        Q(e, Y[a][t]);
      }
    }
  }
  function Q(a, t) {
    var e = r.hero;
    t = t || function (a) {
      var t = Y[a.id];
      return t[Math.floor(Math.random() * t.length)];
    }(a);
    var n = t.windup * (r.ai.windMul || 1);
    var o = { e: a, pat: t, x: e.x, y: e.y, t: 0, dur: n, lead: Math.min(t.lead, n), started: !1, lock: .5 * n };
    if (r.tele.push(o), t.wind) {
      try {
        t.wind(a);
      }
      catch (a) {
        console.error("[Prologue] chiêu địch", a);
      }
    }
    if (t.say) {
      (function (a, t) {
        if ("play" === r.mode && t) {
          if (!((r.sayCd[a.id] || 0) > r.t)) {
            r.sayCd[a.id] = r.t + 9;
            aa(a.id, t);
          }
        }
      })(a, t.say);
    }
    a.busy = n + .25;
    C(a, e.x, e.y);
    A(a, "cast", n);
    f("whisper", { gain: .5 });
    return o;
  }
  function J() {
    r.si++;
    r.cur = r.script[r.si] || null;
    if (r.cur) {
      r.cur.st = { t: 0 };
      if (r.cur.start) {
        r.cur.start(r.cur.st, r.cur);
      }
    }
  }
  function Z(a) {
    for (var t = 0; t < r.script.length; t++)
      if (r.script[t].id === a) {
        if (r.cur && r.cur.end) {
          try {
            r.cur.end(r.cur.st, r.cur);
          }
          catch (a) {
          }
        }
        p().cardHide();
        p().dialogHide();
        r.timers.length = 0;
        r.fade = 0;
        r.fadeGoal = 0;
        $(a);
        r.si = t - 1;
        J();
        return !0;
      }
    return !1;
  }
  function $(a) {
    var t = ["move", "attack", "dodge", "loi", "bang", "kim", "truc", "van"].indexOf(a);
    if (r.barsGoal = 0, r.bars = 0, !(t < 0)) {
      r.mode = "play";
      p().controls(!0);
      r.tutAllowMove = !0;
      r.tutAllowAtk = t >= 1;
      p().lockAtk(t < 1);
      for (var e = 0; e < Math.min(4, Math.max(0, t - 3)); e++)
        r.sk[e].unlocked = !0, p().unlock(e, !0);
      if (t >= 7) {
        W(!0);
      }
      if (t >= 5) {
        r.autoLong = !0;
        r.kimoT = 4;
      }
    }
  }
  function aa(a, t, e) {
    var o = n.CAST[a];
    if (o && r) {
      var i = null != n.TEXT[t] ? n.TEXT[t] : t;
      p().bubble(a, { name: o.name, color: o.color, text: b(i), sec: e || 0, block: !1 });
    }
  }
  function ta(a, t, e) {
    var o = n.CAST[a];
    p().bubble(a, { name: o.name, color: o.color, text: t, block: !0, cb: e });
  }
  function ea(t) {
    if (!r || !r.actors) {
      return null;
    }
    var n = r.actors[t];
    var o = a.Renderer;
    if ("battle" !== r.phase || !n || n.hidden || n.alpha < .3 || !o.display) {
      return null;
    }
    var i = o.display.getBoundingClientRect();
    var l = a.Camera || {};
    var s = e.CHAR_ANCHOR_Y + (n === r.hero ? 8 : 26);
    return { x: i.left + (n.x + (l.ox || 0)) * o.zoom, y: i.top + (n.y - s + (l.oy || 0)) * o.zoom };
  }
  function na(a, t, e) {
    return { id: e, start: function (t, e) {
        a(t, e);
      }, upd: function (a, e) {
        e.t += a;
        return e.t >= (t || 0);
      } };
  }
  function oa(a, t, e) {
    return { id: e, start: function (e) {
        ta(a, function (a) {
          return b(n.TEXT[a]);
        }(t), function () {
          e.done = !0;
        });
      }, upd: function (a, t) {
        return !!t.done;
      }, onTap: function () {
        p().advance();
      } };
  }
  function ra(a, t) {
    return { id: a, start: function (e, o) {
        r.mode = "play";
        r.barsGoal = 0;
        r.tutT = 0;
        r.idleT = 0;
        var i = p();
        i.controls(!0);
        i.hint(n.HINT[a]);
        i.pulse(null == t.pulse ? null : t.pulse);
        if (null != t.unlock) {
          r.sk[t.unlock].unlocked = !0;
          i.unlock(t.unlock, !0);
        }
        if (t.start) {
          t.start(e, o);
        }
      }, upd: function (a, e, o) {
        if (r.tutT += a, e.t += a, r.idleT += a, e.ok) {
          if (e.t2 += a, e.t2 >= (null == t.after ? .9 : t.after)) {
            return !0;
          }
        }
        else {
          if (r.idleT > 9) {
            r.idleT = 4;
            p().nudge();
          }
          if (null != t.unlock && r.tutT > 26 && !e.auto) {
            e.auto = !0;
            r.sk[t.unlock].cd = 0;
            r.hero.mp = Math.max(r.hero.mp, n.SKILLS[t.unlock].mp);
            N(t.unlock);
          }
          if (r.tutT > 90 && void 0 !== t.test) {
            e.force = !0;
          }
          if ((e.force || t.test(a, e))) {
            e.ok = !0;
            e.t2 = 0;
            p().hintOk();
            p().pulse(null);
            if (!1 !== t.praise) {
              p().toast(n.TEXT.good[Math.floor(Math.random() * n.TEXT.good.length)]);
              f("levelup", { gain: .5 });
            }
            if (t.done) {
              t.done(e, o);
            }
          }
        }
        return !1;
      }, end: function () {
        p().hint(null);
        if (t.end) {
          t.end();
        }
      } };
  }
  function ia(t) {
    var e = a.WeaponArt && a.WeaponArt.arcOf ? a.WeaponArt.arcOf(t.cfg, w(t.dir)) : null;
    if (e) {
      a.VFX.spawnBladeArc(t.x, t.y, e);
    }
    else {
      a.VFX.spawnSlash(t.x, t.y, t.dir);
    }
    f("swing", { rate: .85 });
  }
  var la = null;
  var sa = null;
  function ua(t, n, o) {
    if (!(n.alpha <= .01 || n.hidden) && n.sheet) {
      var l = Math.round(n.x);
      var u = Math.round(n.y);
      var h = a.VFX;
      var f = a.Game.time;
      if (!(o)) {
        t.fillStyle = "rgba(2,0,6,0.42)";
        t.beginPath();
        t.ellipse(l, u + 1, 12, 3.8, 0, 0, i);
        t.fill();
      }
      if (n.alpha < 1) {
        t.globalAlpha = n.alpha;
      }
      if (n.cfg && n.cfg.aura && "none" !== n.cfg.aura && y() >= 1) {
        (function (t, e, n, o) {
          var r = a.BACKGROUND_AURAS && a.BACKGROUND_AURAS[o.cfg.aura];
          if (r && r.variants && a.Assets) {
            var i;
            var l = null;
            for (i = 0; i < r.variants.length; i++)
              r.variants[i].he === o.cfg.linhCan && (l = r.variants[i]);
            if (l) {
              var s = a.Assets.get(l.path);
              if (s) {
                var u = Math.floor((o.animTime || 0) * (r.fps || 8)) % (l.frames || 3);
                t.save();
                t.imageSmoothingEnabled = !1;
                t.globalAlpha = o.alpha < 1 ? o.alpha : 1;
                t.drawImage(s, u % l.cols * l.fw, Math.floor(u / l.cols) * l.fh, l.fw, l.fh, Math.round(e - l.fw / 2), Math.round(n - l.fh + 4), l.fw, l.fh);
                t.restore();
              }
            }
          }
        })(t, l, u, n);
      }
      var c = a.Player;
      var d = a.LucTinhTrucKiem;
      var p = "hero" === n.id && r.truc && d && c && d.enabled(n);
      if (h.drawPlayerStatus) {
        h.drawPlayerStatus(t, l, u, n, f, "back");
      }
      if (p) {
        if (c.drawLucTinhKiemAura) {
          c.drawLucTinhKiemAura(t, l, u, n, "back");
        }
        d.drawLayer(t, n, 0, 0, "back", c.drawPhiKiem, l, u - 28);
      }
      var m = l - e.CHAR_W / 2 + Math.round(n.ox);
      var g = u - e.CHAR_ANCHOR_Y + Math.round(n.oy);
      if (n.flash > 0 ? function (t, e, n, o, r, i) {
        var l = e.sheet.ss || 1;
        if (!(la)) {
          la = document.createElement("canvas");
        }
        var s = Math.ceil(96 * l);
        var u = Math.ceil(112 * l);
        if (!(la.width === s && la.height === u)) {
          la.width = s;
          la.height = u;
        }
        (sa = la.getContext("2d")).setTransform(1, 0, 0, 1, 0, 0);
        sa.clearRect(0, 0, s, u);
        sa.setTransform(l, 0, 0, l, 0, 0);
        sa.imageSmoothingEnabled = !1;
        a.SpriteFactory.drawFrame(sa, e.sheet, e.dir, S(e), 32, 40, 1, e.cfg);
        sa.setTransform(1, 0, 0, 1, 0, 0);
        sa.globalCompositeOperation = "source-atop";
        sa.globalAlpha = i;
        sa.fillStyle = "#ffffff";
        sa.fillRect(0, 0, s, u);
        sa.globalAlpha = 1;
        sa.globalCompositeOperation = "source-over";
        t.drawImage(la, 0, 0, s, u, n - 48, o - 102, 96, 112);
      }(t, n, l, u, 0, .75 * s(n.flash / .12, 0, 1)) : a.SpriteFactory.drawFrame(t, n.sheet, n.dir, S(n), m, g, 1, n.cfg), h.drawPlayerStatus && h.drawPlayerStatus(t, l, u, n, f, "front"), p && (c.drawLucTinhKiemAura && c.drawLucTinhKiemAura(t, l, u, n, "front"), d.drawLayer(t, n, 0, 0, "front", c.drawPhiKiem, l, u - 28)), n.spear && c && c.phiKiemPose) {
        var b = c.phiKiemPose(n.spear, f);
        if (b) {
          c.drawPhiKiem(t, b, 0, 0);
        }
      }
      if (n.freezeT > 0 && h.drawPlayerFrozen) {
        h.drawPlayerFrozen(t, l, u, n, f);
      }
      t.globalAlpha = 1;
    }
  }
  function ha(t) {
    if (r) {
      var n = a.Renderer;
      var o = n.w;
      var l = n.h;
      if (t.fillStyle = "#030107", t.fillRect(0, 0, o, l), "battle" === r.phase ? r.baked && function (t) {
        var n = d();
        var o = a.VFX;
        var l = a.Camera;
        t.save();
        if (l) {
          t.translate(Math.round(l.ox || 0), Math.round(l.oy || 0));
        }
        n.drawBack(t, r.fx);
        (function (a) {
          var t = r.marker;
          if (t) {
            t.t += .016;
            var e = r.t;
            var n = .5 + .5 * Math.sin(4 * e);
            a.save();
            a.translate(t.x, t.y);
            a.globalCompositeOperation = "lighter";
            var o = a.createLinearGradient(0, -90, 0, 0);
            o.addColorStop(0, "rgba(255,230,150,0)");
            o.addColorStop(1, "rgba(255,230,150," + (.35 + .2 * n).toFixed(3) + ")");
            a.fillStyle = o;
            a.fillRect(-17, -96, 34, 96);
            a.globalAlpha = .55 + .3 * n;
            a.fillStyle = "#ffd36a";
            a.beginPath();
            a.ellipse(0, 0, 25 + 3 * n, 10 + 1.4 * n, 0, 0, i);
            a.fill();
            a.globalAlpha = 1;
            a.strokeStyle = "#fff4c8";
            a.lineWidth = 2;
            a.beginPath();
            a.ellipse(0, 0, 27, 11, 0, 0, i);
            a.stroke();
            a.setLineDash([4, 3]);
            a.lineDashOffset = 10 * -e;
            a.beginPath();
            a.ellipse(0, 0, 36 + 2 * n, 15, 0, 0, i);
            a.stroke();
            a.setLineDash([]);
            a.globalCompositeOperation = "source-over";
            var l = 3 * Math.sin(5 * e) - 62;
            a.fillStyle = "#ffe56a";
            a.strokeStyle = "#3a2410";
            a.lineWidth = 1;
            a.beginPath();
            a.moveTo(-7, l - 10);
            a.lineTo(7, l - 10);
            a.lineTo(0, l);
            a.closePath();
            a.fill();
            a.stroke();
            a.restore();
          }
        })(t);
        (function (a) {
          for (var t = r.t, e = 0; e < r.tele.length; e++) {
            var n = r.tele[e];
            var o = n.t / n.dur;
            var l = n.pat.r;
            var s = .55 * n.pat.r;
            var u = n.pat.color;
            a.save();
            a.translate(n.x, n.y);
            a.globalAlpha = .1 + .22 * o;
            a.fillStyle = u;
            a.beginPath();
            a.ellipse(0, 0, l, s, 0, 0, i);
            a.fill();
            a.globalAlpha = .85;
            a.strokeStyle = u;
            a.lineWidth = 1.6;
            a.setLineDash([5, 4]);
            a.lineDashOffset = 18 * -t;
            a.beginPath();
            a.ellipse(0, 0, l, s, 0, 0, i);
            a.stroke();
            a.setLineDash([]);
            var h = 1 - o;
            a.globalAlpha = .95;
            a.strokeStyle = "#ffffff";
            a.lineWidth = 1.2;
            a.beginPath();
            a.ellipse(0, 0, Math.max(2, l * h), Math.max(1, s * h), 0, 0, i);
            a.stroke();
            a.globalAlpha = .9 * (.6 + .4 * Math.sin(16 * t));
            a.fillStyle = "#fff";
            a.fillRect(-1, -s - 8, 2, 5);
            a.fillRect(-1, -s - 2, 2, 2);
            a.restore();
          }
        })(t);
        (function (a) {
          if ("play" === r.mode && r.hero && !r.hero.dead) {
            var t = I(r.hero, 130);
            if (t) {
              var e = .5 + .5 * Math.sin(6 * r.t);
              a.save();
              a.globalAlpha = .55 + .3 * e;
              a.strokeStyle = "#ffe8a0";
              a.lineWidth = 1.2;
              a.beginPath();
              a.ellipse(t.x, t.y + 1, 15, 5.4, 0, 0, i);
              a.stroke();
              a.restore();
            }
          }
        })(t);
        if (r.tt) {
          a.TuTuongBanFX.drawGround(t, r.tt);
        }
        o.draw(t, 0, 0, "back");
        var s = [];
        if ([r.hero].concat(r.enemies).forEach(function (a) {
          s.push({ y: a.y, fn: function (t) {
              ua(t, a);
            } });
        }), r.tt) {
          for (var u = 0; u < 4; u++)
            (function (t) {
              s.push({ y: a.TuTuongBanFX.eye(r.tt, t).y, fn: function (e) {
                  if (r.tt) {
                    a.TuTuongBanFX.drawEye(e, r.tt, t);
                  }
                } });
            })(u);
        }
        n.depthItems(r.fx, s);
        s.sort(function (a, t) {
          return a.y - t.y;
        });
        for (var h = 0; h < s.length; h++)
          s[h].fn(t);
        o.draw(t, 0, 0, "front");
        if (r.tt) {
          a.TuTuongBanFX.drawFx(t, r.tt);
        }
        n.drawFront(t, r.fx);
        o.draw(t, 0, 0, "base");
        (function (t) {
          var n = a.Pixel;
          if (!("play" !== r.mode && "cine" !== r.mode)) {
            r.enemies.forEach(function (a) {
              if (!(a.dead || a.hidden || a.alpha < .3)) {
                var o = Math.round(a.x);
                var r = Math.round(a.y) - e.CHAR_ANCHOR_Y - 4;
                var i = o - 17;
                t.fillStyle = "rgba(8,2,12,0.85)";
                t.fillRect(i - 1, r - 1, 36, 6);
                t.fillStyle = a.hp > .5 ? "#d84a52" : a.hp > .3 ? "#e07a3a" : "#e0b030";
                t.fillRect(i, r, Math.max(1, Math.round(34 * a.hp)), 4);
                t.fillStyle = "rgba(255,255,255,0.28)";
                t.fillRect(i, r, Math.max(1, Math.round(34 * a.hp)), 1);
                if (n && n.text) {
                  n.text(t, o, r - 3, a.def.name, a.def.color, "#000000", "700 6.2px " + n.MAP_FONT, "center");
                  n.text(t, o, r - 10, a.def.realm, "hau" === a.def.rank ? "#ffb070" : "#bfe0ff", "#000000", "700 5px " + n.MAP_FONT, "center");
                }
              }
            });
          }
        })(t);
        t.restore();
      }(t) : "rebirth" === r.phase ? function (a, t, e) {
        var n;
        var o = r.rebirth;
        var l = o.t;
        a.fillStyle = "#05010a";
        a.fillRect(0, 0, t, e);
        var h = a.createRadialGradient(t / 2, .4 * e, 4, t / 2, .4 * e, .6 * Math.max(t, e));
        for (h.addColorStop(0, "rgba(120,60,200,0.42)"), h.addColorStop(.4, "rgba(60,20,110,0.28)"), h.addColorStop(1, "rgba(5,1,10,0)"), a.fillStyle = h, a.fillRect(0, 0, t, e), n = 0; n < o.stars.length; n++) {
          var f = o.stars[n];
          var c = .25 + .6 * (.5 + .5 * Math.sin(1.4 * l + f.ph));
          a.fillStyle = "rgba(230,215,255," + c.toFixed(3) + ")";
          a.fillRect(f.x * t | 0, f.y * e | 0, f.s > .9 ? 2 : 1, f.s > .9 ? 2 : 1);
        }
        var d = t / 2;
        var p = .4 * e;
        var m = Math.min(.36 * t, .52 * e);
        var g = .42;
        var y = .28 * l;
        a.save();
        a.translate(d, p);
        a.scale(1, g);
        var b = ["#7e5ad6", "#d8a24a", "#e0506a", "#4ab0d8", "#6ac078", "#a0a0b8"];
        for (n = 0; n < 6; n++) {
          var x = y + n * i / 6 + .04;
          var w = y + (n + 1) * i / 6 - .04;
          a.beginPath();
          a.moveTo(0, 0);
          a.arc(0, 0, .9 * m, x, w);
          a.closePath();
          a.fillStyle = b[n];
          a.globalAlpha = .14 + .05 * Math.sin(1.3 * l + n);
          a.fill();
        }
        for (a.globalAlpha = 1, a.strokeStyle = "rgba(232,196,120,0.85)", a.lineWidth = 2.4, [1, .9, .62, .34].forEach(function (t, e) {
          a.globalAlpha = 0 === e ? 1 : .7;
          a.beginPath();
          a.arc(0, 0, m * t, 0, i);
          a.stroke();
        }), a.globalAlpha = 1, a.lineWidth = 1.2, n = 0; n < 48; n++) {
          var v = -1.4 * y + n * i / 48;
          var k = n % 6 == 0;
          a.beginPath();
          a.moveTo(Math.cos(v) * m * (k ? .9 : .94), Math.sin(v) * m * (k ? .9 : .94));
          a.lineTo(Math.cos(v) * m, Math.sin(v) * m);
          a.stroke();
        }
        for (a.strokeStyle = "rgba(255,224,150,0.6)", n = 0; n < 6; n++) {
          var T = y + n * i / 6;
          a.beginPath();
          a.moveTo(Math.cos(T) * m * .34, Math.sin(T) * m * .34);
          a.lineTo(Math.cos(T) * m * .9, Math.sin(T) * m * .9);
          a.stroke();
        }
        for (a.fillStyle = "rgba(255,214,140,0.8)", a.strokeStyle = "rgba(255,214,140,0.75)", a.lineWidth = 1.4, n = 0; n < 18; n++) {
          var M = 1.8 * -y + n * i / 18;
          var A = .965 * m;
          var S = m * (.025 + 7 * n % 3 * .02);
          a.beginPath();
          a.moveTo(Math.cos(M) * A, Math.sin(M) * A);
          a.lineTo(Math.cos(M + .02) * (A + S), Math.sin(M + .02) * (A + S));
          a.stroke();
          if (n % 3 == 0) {
            a.beginPath();
            a.arc(Math.cos(M + .06) * (.98 * m), Math.sin(M + .06) * (.98 * m), 1.6, 0, i);
            a.fill();
          }
        }
        for (n = 0; n < 3; n++) {
          var C = (.42 * l + n / 3) % 1;
          a.strokeStyle = "rgba(255,200,130," + (.5 * (1 - C)).toFixed(3) + ")";
          a.lineWidth = 1.6;
          a.beginPath();
          a.arc(0, 0, m * (.18 + .95 * C), 0, i);
          a.stroke();
        }
        if (a.restore(), l > 5.5) {
          var F = s((l - 5.5) / 2.5, 0, 1);
          var L = a.createLinearGradient(0, 0, 0, p);
          L.addColorStop(0, "rgba(255,230,190,0)");
          L.addColorStop(1, "rgba(255,225,170," + (.32 * F).toFixed(3) + ")");
          a.globalCompositeOperation = "lighter";
          a.fillStyle = L;
          a.beginPath();
          a.moveTo(d - .06 * m, 0);
          a.lineTo(d + .06 * m, 0);
          a.lineTo(d + .34 * m, p);
          a.lineTo(d - .34 * m, p);
          a.closePath();
          a.fill();
          a.globalCompositeOperation = "source-over";
        }
        var H = s(.2 + l / 12, .2, 1);
        var X = a.createRadialGradient(d, p, 0, d, p, .5 * m);
        if (X.addColorStop(0, "rgba(255,240,200," + (.9 * H).toFixed(3) + ")"), X.addColorStop(.3, "rgba(255,170,90," + (.4 * H).toFixed(3) + ")"), X.addColorStop(1, "rgba(255,120,60,0)"), a.globalCompositeOperation = "lighter", a.fillStyle = X, a.beginPath(), a.ellipse(d, p, .5 * m, .5 * m * g * 1.3, 0, 0, i), a.fill(), o.parts) {
          for (n = 0; n < o.parts.length; n++) {
            var R = o.parts[n];
            var _ = R.t / R.dur;
            var P = _ * _;
            var V = u(R.x, d, P);
            var E = u(R.y, p, P);
            a.globalAlpha = .9 * Math.sin(Math.PI * _);
            a.fillStyle = R.c ? "#ffd9a0" : "#cdb4ff";
            a.fillRect(0 | V, 0 | E, 2, 2);
            a.globalAlpha = .35;
            a.fillRect(0 | u(R.x, d, .9 * P), 0 | u(R.y, p, .9 * P), 1, 1);
          }
          a.globalAlpha = 1;
        }
        var D = s(l / 7.5, 0, 1);
        var O = u(2.4, -.4, D) + 7 * D;
        var K = u(1.25 * m, 0, D * D);
        var B = d + Math.cos(O) * K;
        var G = p + Math.sin(O) * K * g - 30 * (1 - D);
        if (l > 7.5) {
          var I = l - 7.5;
          B = d + I * I * 6;
          G = p + I * I * 70;
        }
        for (n = 8; n >= 0; n--) {
          var U = Math.max(0, D - .012 * n);
          var q = u(2.4, -.4, U) + 7 * U;
          var W = u(1.25 * m, 0, U * U);
          var N = d + Math.cos(q) * W;
          var Y = p + Math.sin(q) * W * g - 30 * (1 - U);
          a.globalAlpha = .5 * (1 - n / 9);
          a.fillStyle = "#e8f4ff";
          a.beginPath();
          a.arc(N, Y, 3 - .25 * n, 0, i);
          a.fill();
        }
        a.globalAlpha = 1;
        var j = a.createRadialGradient(B, G, 0, B, G, 26);
        j.addColorStop(0, "rgba(255,255,255,1)");
        j.addColorStop(.3, "rgba(190,230,255,0.7)");
        j.addColorStop(1, "rgba(120,180,255,0)");
        a.fillStyle = j;
        a.beginPath();
        a.arc(B, G, 26, 0, i);
        a.fill();
        a.globalCompositeOperation = "source-over";
      }(t, o, l) : "mortal" === r.phase && function (a, t, e) {
        var n = r.mortal;
        a.imageSmoothingEnabled = !1;
        a.drawImage(n.bg, 0, 0, n.bg.width, n.bg.height, 0, 0, 2 * n.bg.width, 2 * n.bg.height);
        var o = n.t;
        var l = .7 * t;
        var h = .56 * e + 30;
        var f = .5 * e - 6;
        var c = s(o / 8, 0, 1);
        var d = u(h, f, 1 - Math.pow(1 - c, 2));
        a.save();
        a.beginPath();
        a.rect(0, 0, t, .57 * e);
        a.clip();
        a.globalCompositeOperation = "lighter";
        var p = a.createRadialGradient(l, d, 0, l, d, .4 * e);
        p.addColorStop(0, "rgba(255,240,190,0.95)");
        p.addColorStop(.08, "rgba(255,210,130,0.7)");
        p.addColorStop(.3, "rgba(255,140,80,0.25)");
        p.addColorStop(1, "rgba(255,100,60,0)");
        a.fillStyle = p;
        a.fillRect(0, 0, t, e);
        a.globalCompositeOperation = "source-over";
        a.fillStyle = "#fff2c0";
        a.beginPath();
        a.arc(l, d, .065 * e, 0, i);
        a.fill();
        a.restore();
        a.save();
        a.beginPath();
        a.rect(0, 0, t, .72 * e);
        a.clip();
        a.globalCompositeOperation = "lighter";
        for (var m = 0; m < 8; m++) {
          var g = Math.PI * (1.04 + .125 * m) + .02 * Math.sin(.3 * o + m);
          var y = 1.1 * e;
          var b = a.createLinearGradient(l, d, l + Math.cos(g) * y, d + Math.sin(g) * y);
          b.addColorStop(0, "rgba(255,214,150," + (.22 * c).toFixed(3) + ")");
          b.addColorStop(1, "rgba(255,170,100,0)");
          a.fillStyle = b;
          a.beginPath();
          a.moveTo(l, d);
          a.lineTo(l + Math.cos(g - .04) * y, d + Math.sin(g - .04) * y);
          a.lineTo(l + Math.cos(g + .04) * y, d + Math.sin(g + .04) * y);
          a.closePath();
          a.fill();
        }
        a.restore();
        var x = n.hut;
        if (x && x.px) {
          for (var w = 0; w < 8; w++) {
            var v = (.16 * o + w / 8) % 1;
            a.globalAlpha = .5 * (1 - v) * Math.min(1, 5 * v);
            a.fillStyle = "#9a7488";
            a.beginPath();
            a.arc(x.px + 12 + 5 * Math.sin(6 * v + w) + 26 * v, x.py + 10 - 78 * v, 2.5 + 8 * v, 0, i);
            a.fill();
          }
          a.globalAlpha = 1;
          a.globalCompositeOperation = "lighter";
          a.fillStyle = "rgba(255,170,80," + (.14 + .05 * Math.sin(9 * o) + .04 * Math.sin(23 * o)).toFixed(3) + ")";
          a.fillRect(x.wx - 4, x.wy - 4, x.ww + 8, x.wh + 8);
          a.globalCompositeOperation = "source-over";
        }
        a.strokeStyle = "#1a0c24";
        a.lineWidth = 1;
        a.lineCap = "round";
        for (var k = 0; k < n.birds.length; k++) {
          var T = n.birds[k];
          var M = 2.4 * Math.sin(6 * o + T.ph);
          a.beginPath();
          a.moveTo(T.x - 4, T.y - M);
          a.quadraticCurveTo(T.x - 2, T.y - 1 - M, T.x, T.y);
          a.quadraticCurveTo(T.x + 2, T.y - 1 - M, T.x + 4, T.y - M);
          a.stroke();
        }
        for (ua(a, n.a, !0), a.globalCompositeOperation = "lighter", k = 0; k < n.motes.length; k++) {
          var A = n.motes[k];
          a.globalAlpha = .25 + .25 * Math.sin(1.5 * o + A.ph);
          a.fillStyle = "#ffd9a0";
          a.fillRect(0 | A.x, 0 | A.y, 1, 1);
        }
        a.globalAlpha = 1;
        a.globalCompositeOperation = "source-over";
        var S = a.createLinearGradient(0, .5 * e, 0, .7 * e);
        S.addColorStop(0, "rgba(255,170,130,0)");
        S.addColorStop(.6, "rgba(255,170,130,0.1)");
        S.addColorStop(1, "rgba(120,60,90,0)");
        a.fillStyle = S;
        a.fillRect(0, .5 * e, t, .2 * e);
        var C = a.createRadialGradient(t / 2, e / 2, .3 * e, t / 2, e / 2, .95 * e);
        C.addColorStop(0, "rgba(8,2,14,0)");
        C.addColorStop(1, "rgba(8,2,14,0.6)");
        a.fillStyle = C;
        a.fillRect(0, 0, t, e);
      }(t, o, l), "rebirth" === r.phase && a.VFX.draw(t, 0, 0, "base"), r.bars > .004) {
        var h = Math.round(.085 * l * r.bars);
        t.fillStyle = "#000";
        t.fillRect(0, 0, o, h);
        t.fillRect(0, l - h, o, h);
      }
      if (r.fade > .004) {
        t.globalAlpha = r.fade;
        t.fillStyle = "#030107";
        t.fillRect(0, 0, o, l);
        t.globalAlpha = 1;
      }
    }
  }
  o.draw = function (t) {
    if (r) {
      try {
        ha(t);
      }
      catch (e) {
        try {
          t.setTransform(a.Renderer.gfx || 1, 0, 0, a.Renderer.gfx || 1, 0, 0);
          t.globalAlpha = 1;
          t.globalCompositeOperation = "source-over";
        }
        catch (a) {
        }
        X(e, "khi vẽ");
      }
    }
  };
}(window.PNTT);
