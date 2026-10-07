!function (n) {
  "use strict";
  var e = n.Utils;
  var t = n.CONFIG;
  var i = n.SkillBook = { open: !1, detailOpen: !1 };
  var a = {};
  var o = null;
  function h(e, t) {
    var a = n.Skills.setPassiveEquipped(e, t);
    if (!a.ok && n.HUD && n.HUD.setCaption) {
      n.HUD.setCaption("Không mang được: " + a.why + ".");
    }
    i.render("bi_tich");
    return a.ok;
  }
  function l(n) {
    return n ? Array.isArray(n) ? n.map(l).join(" · ") : "burn" === n.kind ? "Thiêu đốt " + n.time + "s, " + n.dps + " sát thương mỗi giây" : "slow" === n.kind ? "Làm chậm còn " + Math.round(100 * n.mult) + "% trong " + n.time + "s" : "stun" === n.kind ? "Choáng " + ("number" == typeof n.chance ? Math.round(100 * n.chance) + "% · " : "") + n.time + "s" : "freeze" === n.kind ? "Đóng băng " + n.time + "s" : n.kind : "Không có";
  }
  function c(e) {
    var t = n.ITEMS && n.ITEMS[e];
    return t ? t.name : e;
  }
  i.entries = function (e) {
    return function (e) {
      var i = n.baseAttack(n.Progress && n.Progress.realmId) + (n.Inventory && n.Inventory.bonus ? n.Inventory.bonus("atkBonus") : 0);
      var a = n.ITEMS && n.ITEMS.bi_tich_dan_linh;
      var o = !(!n.Inventory || !(n.Inventory.owns ? n.Inventory.owns("bi_tich_dan_linh", 1) : n.Inventory.has && n.Inventory.has("bi_tich_dan_linh", 1)));
      var h = !e || e.canMeditate;
      var l = n.meditateMult ? n.meditateMult(e ? e.realmId : null) : 1;
      var c = n.meditateVitalsMult ? n.meditateVitalsMult(e ? e.realmId : null) : 1;
      var d = !!(e && n.Player && n.Player.canFly && n.Player.canFly(e));
      var r = n.Player && n.Player.flyMount && n.Player.flyMount() || n.ITEMS && n.ITEMS.phi_diep || null;
      var s = n.realmById(r && r.fly && r.fly.realmMin || t.FLY.REALM_MIN).name;
      var u = r && r.fly && r.fly.speed || t.FLY.SPEED_MULT;
      var p = r && r.name || "pháp khí phi hành";
      return [{ id: "cong_thuong", kind: "co_ban", name: "Công Thường", short: "Công Thường", element: "Thể Thuật", glyph: "⚔", key: "Space", known: !0, ready: !0, need: "", colors: { glow: "#ffe9a8" }, stats: [["Sát thương", i + " (đã gồm Công từ trang bị)"], ["Tầm với", t.PLAYER.ATTACK_ORIGIN + t.PLAYER.REACH + "px phía trước"], ["Nhịp ra đòn", t.PLAYER.ATTACK_TIME + "s mỗi đòn"], ["Tiêu hao", "Không tốn gì"]], desc: "Quét một đường kình khí ngay trước mặt. Không tốn Linh Lực nên bấm liên tục được, là chiêu nuôi sống mọi đạo hữu chưa có bí tịch.", note: "Điểm phát lực tính từ mũi vũ khí nên vòng qua được gốc cây hay bia đá." }, { id: "dan_linh", kind: "co_ban", name: a ? a.name : "Dẫn Linh Quyết", short: "Dẫn Linh Quyết", element: "Tâm Pháp", glyph: "◈", key: "—", known: o, ready: o, need: "", colors: { glow: "#bff3d8" }, stats: [["Linh Lực", "+" + (a && a.mpRegen || 1) + " mỗi giây"], ["Điều kiện", "Có quyển trong Hành Trang"], ["Kích hoạt", "Tự động khi đã lĩnh ngộ"], ["Tiêu hao", "Không tốn gì"]], desc: "Dẫn linh lực trong kinh mạch về đan điền, giúp Linh Lực hồi đều theo thời gian mà không cần mở thêm một nút kỹ năng.", note: o ? "Đang vận hành tự động." : "Chưa lĩnh ngộ — nhận quyển này từ phần thưởng Bí Tích." }, { id: "toa_thien", kind: "co_ban", name: "Đả Tọa", short: "Tọa Thiền", element: "Tâm Pháp", glyph: "◎", key: "Q", known: !0, ready: h, need: h ? "" : "Phải khai mở Linh Lực (Luyện Khí Tầng 1)", colors: { glow: "#bff3d8" }, stats: [["Khí Huyết", "+" + t.MEDITATE.HP_PER_SEC * c + " mỗi giây"], ["Linh Lực", "+" + t.MEDITATE.MP_PER_SEC * l + " mỗi giây"], ["Thần Thức", "+" + t.MEDITATE.SP_PER_SEC * l + " mỗi giây"], ["Giáp", "+" + t.MEDITATE.BP_PER_SEC * c + " mỗi giây"], ["Đạo Hạnh", "+" + t.MEDITATE.EXP_PER_SEC + " mỗi giây, chỉ ở nơi có linh khí"]], desc: "Ngồi xuống nhập định, hấp thu linh khí trời đất để hồi lại toàn bộ tài nguyên. Đứng dậy là ngắt ngay, nên chọn chỗ vắng quái mà ngồi.", note: "Ngồi trên đài đá linh khí thì tích thêm Đạo Hạnh — đường đột phá nhanh nhất." }, { id: "ngu_kiem", kind: "co_ban", name: "Phi Hành", short: "Phi Hành", element: "Ngự Khí", glyph: "➶", key: "F", known: !0, ready: d, need: d ? "" : "Cần đeo " + p + " và đạt " + s, colors: { glow: "#a9e4ff" }, stats: [["Tốc độ", "×" + u + " (nhanh hơn cả chạy bộ)"], ["Độ cao", "lơ lửng " + t.FLY.HOVER + "px trên mặt đất"], ["Điều kiện", p + " ở ô Phi Hành · " + s], ["Tiêu hao", "Không tốn gì, và đang bay vẫn ra chiêu được"]], desc: "Đứng lên pháp khí phi hành mà lướt đi. Băng qua đồng cỏ và mặt nước cạn nhanh hơn cả chạy bộ, mà vẫn vung được vũ khí lẫn bí tịch ngay trên không — chỉ là lúc xuất chiêu thì đứng lại một nhịp.", note: "Tháo pháp khí giữa chừng thì tự hạ xuống đất, không rơi giữa trời." }];
    }(e = e || n.SceneWorld && n.SceneWorld.player || null).concat(function (e) {
      var i = n.Skills;
      var a = i.knownThunder();
      var o = !e || e.mpMax > 0;
      return [{ id: "loi_chuong", kind: "chu_dong", name: "Lôi Chưởng", short: "Lôi Kích", element: "Hệ Lôi", glyph: "ϟ", key: "1 / C", known: a, ready: a && o, need: a ? o ? "" : "Phải khai mở Linh Lực (Luyện Khí Tầng 1)" : "", colors: { glow: "#8fe3ff" }, stats: [["Sát thương", i.powerDmg(t.THUNDER.COEF) + " cho mỗi mục tiêu trong vùng sét (theo tu vi)"], ["Bán kính", t.THUNDER.RADIUS + "px quanh điểm sét giáng"], ["Tầm xa", t.THUNDER.RANGE + "px"], ["Hồi chiêu", t.THUNDER.COOLDOWN + "s"], ["Tiêu hao", t.THUNDER.MP_COST + " Linh Lực · " + t.THUNDER.SP_COST + " Thần Thức"]], desc: "Vỗ một chưởng dẫn sét giáng thẳng xuống đầu mục tiêu, nổ lan ra cả đám quái đứng quanh nó. Chiêu diện rộng duy nhất của giai đoạn đầu, nên cũng là quyển đắt nhất trong tủ lão nhân.", note: a ? "Học từ: " + c(i.THUNDER_BOOK) + " · Thần Thức dùng để khoá vùng sét — cạn Thần Thức thì chiêu không ra." : "Chưa lĩnh ngộ — mua " + c(i.THUNDER_BOOK) + " ở Tàng Kinh Lão Nhân bằng Linh Thạch." }];
    }(e)).concat(function () {
      var e = n.Skills;
      var t = e.active();
      var i = e.ORDER.slice();
      if (!e.testMode && e.MEDIUM_ORDER) {
        i = i.concat(e.MEDIUM_ORDER.filter(function (n) {
          return e.known(n) || e.ownsBook && e.ownsBook(n);
        }));
      }
      return i.map(function (i) {
        var a = e.DEFS[i];
        var o = e.known(i);
        var h = a.boostWeapon && n.ITEMS ? n.ITEMS[a.boostWeapon] : null;
        var d = !!(h && e.hasBoostWeapon && e.hasBoostWeapon(a));
        var r = e.dmgOf ? e.dmgOf(a) : a.dmg;
        var s = e.fullDmgOf ? e.fullDmgOf(a) : r;
        var u = function (n) {
          return a.shots > 1 ? n + " (cả chùm " + a.shots + " viên)" : String(n);
        };
        var p = u(r);
        if (h) {
          p = u(r) + (d ? " (có " + h.name + ": 100%)" : " (thiếu " + h.name + ": 50% · đủ: " + u(s) + ")");
        }
        var g = !o && e.ownsBook && e.ownsBook(i) && e.lockReason ? e.lockReason(i) : null;
        var m = g ? "Chưa dùng được — " + g + "." : "";
        var k = [["Sát thương", p], ["Tầm xa", a.range + "px"], ["Hồi chiêu", a.cooldown + "s"], ["Vận chiêu", a.cast + "s"], ["Tiêu hao", a.mp + " Linh Lực · " + a.sp + " Thần Thức"], ["Hiệu ứng", l(e.effectOf ? e.effectOf(a) : a.effect)]];
        if (a.bienHinh) {
          var y = a.bienHinh;
          var f = y.lifesteal;
          k = [["Hoá thân", y.time + " giây"], ["Nhịp đánh", "nhanh gấp " + y.speed + " lần (không dưới " + y.minAttack + "s một nhát)"], ["Hồi chiêu", a.cooldown + "s"], ["Vận chiêu", a.cast + "s"], ["Tiêu hao", a.mp + " Linh Lực · " + a.sp + " Thần Thức"]];
          if (f) {
            k.push(["Hút huyết", Math.round(1e3 * f.pct) / 10 + "% Khí Huyết tối đa mỗi nhát trúng" + (null != f.pvp && f.pvp < 1 ? " (đánh người: " + Math.round(f.pct * f.pvp * 1e3) / 10 + "%)" : "")]);
          }
          if (y.giap) {
            k.push([y.giapTen || "Ma Giáp", Math.round(100 * y.giap) + "% Giáp tối đa, đỡ đòn trước hộ thuẫn và Giáp"]);
          }
          k.push(["Chiêu khác", "vẫn dùng được trong lúc hoá thân"]);
        }
        if (a.lifesteal) {
          k.push(["Hút huyết", Math.round(100 * a.lifesteal.pct) + "% Khí Huyết tối đa mỗi kẻ trúng (tối đa " + Math.round(100 * a.lifesteal.max) + "%)" + (d ? "" : " · cần " + (h ? h.name : "pháp khí") + " trong hành trang")]);
        }
        return { id: i, kind: "chu_dong", name: a.name, short: a.short, element: "Hệ " + a.element, glyph: a.glyph, icon: a.icon || null, key: "2 / X", known: o || !!g, ready: o, need: m, colors: a.colors, equipped: !(!t || t.id !== i), stats: k, desc: a.tip, note: o || g ? "Học từ: " + c(a.book) + (h ? " · Có " + h.name + " trong hành trang: 100% sát thương; thiếu: 50%" : "") : "Chưa lĩnh ngộ — cần " + c(a.book) + " trong Hành Trang." };
      });
    }()).concat(function (e) {
      var t = n.LucTinhTrucKiem;
      if (!t || !n.ITEMS || !n.ITEMS[t.BOOK]) {
        return [];
      }
      var i = n.ITEMS[t.BOOK];
      var a = e && e.cfg ? e.cfg.weapon : null;
      var o = a && n.ITEMS[a];
      var h = t.owned(n);
      var l = t.compatible(a);
      var c = t.lockReason ? t.lockReason(n) : null;
      var d = h && l && !c;
      var r = e ? t.attackDuration(e) : .75;
      var s = h ? c ? "Chưa vận hành: " + c + "." : l ? "" : "Cần trang bị " + t.weaponNames(n) + "." : "Cần sở hữu " + i.name + ".";
      return [{ id: "luc_tinh_truc_kiem", kind: "kiem_thuat", name: "Lục Tinh Trực Kiếm", short: "Lục Tinh Trực Kiếm", element: "Kiếm Thuật", glyph: "✦", icon: i.icon, key: "Space", known: h, ready: d, need: s, colors: { glow: "#d45aff" }, stats: [["Kiếm ảnh", "6 thanh"], ["Vũ khí", t.weaponNames(n)], ["Điều kiện", "Trúc Cơ Trung Kỳ · mang Kiếm Hạp"], ["Nhịp vận hành", r + "s mỗi đòn"], ["Kích hoạt", "Tự thay Công Thường khi trang bị đúng kiếm"]], desc: i.desc, note: d ? "Đang vận hành theo " + o.name + "." : s }];
    }(e)).concat((i = n.Skills).PASSIVE_ORDER.map(function (e) {
      var t = i.PASSIVES[e];
      var a = i.ownsPassive ? i.ownsPassive(e) : i.knownPassive(e);
      var o = i.passiveLock ? i.passiveLock(e) : null;
      var h = !(!i.passiveOn || !i.passiveOn(e));
      var l = [];
      if ("shield" === t.kind || "heal" === t.kind) {
        l.push(["shield" === t.kind ? "Chắn được" : "Chữa lại", i.passiveAmount(t) + " điểm Khí Huyết (theo tu vi)"]);
        l.push(["Kích hoạt", "khi một đòn xuyên hết Giáp và chạm tới Khí Huyết"]);
      }
      else {
        l.push(["Hiệu ứng", t.tip]);
      }
      if (t.cooldown) {
        l.push(["Hồi chiêu", t.cooldown + "s"]);
      }
      l.push(["Tiêu hao", t.sp + " Thần Thức mỗi lần kích"]);
      if (t.requireRealm) {
        l.push(["Cảnh giới", n.realmNameById ? n.realmNameById(t.requireRealm) : t.requireRealm]);
      }
      return { id: e, kind: "bi_dong", name: t.name, short: t.short, element: "Hệ " + t.element, glyph: "shield" === t.kind ? "❈" : "✿", key: "—", known: a, ready: a && !o, need: o ? "Chưa mang được — " + o + "." : "", colors: t.colors, equipped: h, stats: l, desc: t.tip, note: a ? "Học từ: " + c(t.book) + " · Mang tối đa " + i.PASSIVE_MAX + " bí tịch bị động." : "Chưa lĩnh ngộ — rút " + c(t.book) + " ở Tàng Kinh Bị Động." };
    }));
    var i;
  };
  var d = [{ kind: "co_ban", muc: "bi_tich", label: "Pháp Quyết Nền Tảng" }, { kind: "chu_dong", muc: "bi_tich", label: "Pháp Thuật Bí Tịch" }, { kind: "kiem_thuat", muc: "bi_tich", label: "Kiếm Thuật" }, { kind: "bi_dong", muc: "bi_tich", label: "Bí Tịch Bị Động" }];
  function r(n) {
    var t = e.$(n);
    if (t) {
      t.addEventListener("click", function () {
        i.toggle();
      });
    }
  }
  function s(n) {
    var e = document.createElement("h3");
    e.className = "skill-group";
    e.textContent = n;
    return e;
  }
  function u(e, t) {
    var i = n.Skills;
    var a = i.DEFS && i.DEFS[t.id] || i.PASSIVES && i.PASSIVES[t.id];
    var o = a && a.book || "loi_chuong" === t.id && i.THUNDER_BOOK;
    var h = o && n.ITEMS && n.ITEMS[o];
    var l = t.icon || h && h.icon;
    if (l && n.drawItemIcon) {
      var c = document.createElement("canvas");
      c.width = c.height = 16;
      c.className = "skill-art-icon";
      c.setAttribute("aria-hidden", "true");
      var d = c.getContext && c.getContext("2d");
      if (d) {
        n.drawItemIcon(d, l, 0, 0, 16);
        return void e.appendChild(c);
      }
    }
    var r = t.icon && n.Assets && n.Assets.item ? n.Assets.item(t.icon) : null;
    if (r && r.src) {
      var s = document.createElement("img");
      s.className = "skill-art-icon";
      s.src = r.src;
      s.alt = "";
      s.setAttribute("aria-hidden", "true");
      s.draggable = !1;
      e.appendChild(s);
    }
    else {
      e.textContent = t.glyph;
    }
  }
  function p(e) {
    var t = "bi_dong" === e.kind && e.known;
    var i = document.createElement(t ? "div" : "button");
    if (t) {
      i.setAttribute("role", "button");
      i.tabIndex = 0;
      i.addEventListener("keydown", function (n) {
        if (n.target === i) {
          if (!("Enter" !== n.key && " " !== n.key)) {
            n.preventDefault();
            g(e);
          }
        }
      });
    }
    else {
      i.type = "button";
    }
    i.className = "skill-row" + (e.known ? "" : " locked") + (e.equipped ? " equipped" : "") + (e.known && !e.ready ? " unready" : "");
    i.setAttribute("aria-label", e.name + " — xem mô tả");
    var a = document.createElement("span");
    a.className = "skill-row-icon";
    a.style.color = e.colors.glow;
    u(a, e);
    i.appendChild(a);
    var o = document.createElement("span");
    o.className = "skill-row-main";
    var l = document.createElement("b");
    l.textContent = e.name;
    var c = document.createElement("em");
    c.textContent = e.element;
    l.appendChild(c);
    o.appendChild(l);
    var d = document.createElement("small");
    d.textContent = e.known ? e.need || e.desc : "Chưa lĩnh ngộ";
    o.appendChild(d);
    i.appendChild(o);
    var r = document.createElement("span");
    if (r.className = "skill-row-side", e.known && "—" !== e.key) {
      var s = document.createElement("kbd");
      s.textContent = e.key.split(" / ")[0];
      r.appendChild(s);
    }
    if (t) {
      var p = n.Skills.passiveList().length >= n.Skills.PASSIVE_MAX;
      var m = !e.equipped && (!e.ready || p);
      var k = document.createElement("label");
      k.className = "skill-tick" + (m ? " off" : "");
      if (m && e.ready) {
        k.title = "Đã mang đủ " + n.Skills.PASSIVE_MAX + " — bỏ một quyển trước";
      }
      var y = document.createElement("input");
      y.type = "checkbox";
      y.checked = !!e.equipped;
      y.disabled = m;
      y.setAttribute("aria-label", "Mang " + e.name);
      y.addEventListener("change", function () {
        h(e.id, y.checked);
      });
      k.addEventListener("click", function (n) {
        n.stopPropagation();
      });
      k.appendChild(y);
      var f = document.createElement("span");
      f.textContent = e.equipped ? "Đang mang" : "Mang";
      k.appendChild(f);
      r.appendChild(k);
    }
    else {
      var v = document.createElement("i");
      v.textContent = function (n) {
        return n.known ? "chu_dong" === n.kind ? n.equipped ? "Đang dùng" : "Đã học" : "bi_dong" === n.kind ? n.equipped ? "Đang mang" : "Chưa mang" : "kiem_thuat" === n.kind ? n.ready ? "Tự phát" : "Chưa đủ" : n.ready ? "Sẵn sàng" : "Chưa đủ" : "Chưa học";
      }(e);
      r.appendChild(v);
    }
    i.appendChild(r);
    i.addEventListener("click", function () {
      g(e);
    });
    return i;
  }
  function g(e) {
    o = e;
    a.popBody.innerHTML = "";
    var t = document.createElement("div");
    t.className = "skill-pop-head";
    var h = document.createElement("span");
    h.className = "skill-pop-glyph";
    h.style.color = e.colors.glow;
    u(h, e);
    t.appendChild(h);
    var l = document.createElement("div");
    var c = document.createElement("h2");
    c.textContent = e.name;
    l.appendChild(c);
    var d;
    var r = document.createElement("p");
    r.className = "skill-pop-tags";
    r.textContent = [e.element, (d = e.kind, "chu_dong" === d ? "Chủ động" : "bi_dong" === d ? "Bị động" : "kiem_thuat" === d ? "Kiếm thuật" : "Nền tảng"), "—" === e.key ? "Không cần bấm phím" : "Phím " + e.key].join(" · ");
    l.appendChild(r);
    t.appendChild(l);
    a.popBody.appendChild(t);
    var s = document.createElement("p");
    s.className = "skill-pop-desc";
    s.textContent = e.desc;
    a.popBody.appendChild(s);
    var p = document.createElement("dl");
    if (p.className = "skill-stats", e.stats.forEach(function (n) {
      var e = document.createElement("dt");
      e.textContent = n[0];
      var t = document.createElement("dd");
      t.textContent = n[1];
      p.appendChild(e);
      p.appendChild(t);
    }), a.popBody.appendChild(p), e.known && e.need) {
      var g = document.createElement("p");
      g.className = "skill-pop-warn";
      g.textContent = "Chưa thi triển được: " + e.need;
      a.popBody.appendChild(g);
    }
    if ("chu_dong" === e.kind && e.known && n.QuickSlots && n.QuickSlots.valid({ kind: "skill", id: e.id }) && a.popBody.appendChild(n.QuickSlots.chipRow({ kind: "skill", id: e.id })), e.note) {
      var m = document.createElement("p");
      m.className = "skill-pop-note";
      m.textContent = e.note;
      a.popBody.appendChild(m);
    }
    var k = "chu_dong" === e.kind && e.known && !e.equipped;
    var y = "bi_dong" === e.kind && e.known && (e.ready || e.equipped);
    a.popUse.classList.toggle("hidden", !k && !y);
    if (k) {
      a.popUse.textContent = "Gắn " + e.short + " vào phím 2";
    }
    if (y) {
      a.popUse.textContent = e.equipped ? "Bỏ mang " + e.short : "Mang " + e.short;
    }
    a.pop.classList.remove("hidden");
    i.detailOpen = !0;
    a.popClose.focus({ preventScroll: !0 });
  }
  function m() {
    if (a.pop) {
      a.pop.classList.add("hidden");
      i.detailOpen = !1;
      o = null;
    }
  }
  i.init = function () {
    a.root = e.$("#bag");
    return a.root ? (a.list = e.$("#skill-list"), a.count = e.$("#bag-count"), a.close = e.$("#bag-close"), a.pop = e.$("#skill-pop"), a.popBody = e.$("#skill-pop-body"), a.popUse = e.$("#skill-pop-use"), a.popClose = e.$("#skill-pop-close"), a.popClose.addEventListener("click", m), a.pop.addEventListener("click", function (n) {
      if (n.target === a.pop) {
        m();
      }
    }), a.popUse.addEventListener("click", function () {
      if (o && "bi_dong" === o.kind && o.known) {
        var e = o;
        m();
        return void h(e.id, !e.equipped);
      }
      if (o && "chu_dong" === o.kind && o.known && n.Skills.setActive(o.id)) {
        m();
        i.render("bi_tich");
      }
    }), a.hudBtn = e.$("#btn-skills"), r("#btn-skills"), r("#btn-skills-touch"), r("#menu-skills"), i) : i;
  };
  i.toggle = function (e) {
    n.HUD.toggleBag("bi-tich");
  };
  i.show = function (e) {
    n.HUD.openBag("bi-tich");
  };
  i.close = function () {
    n.HUD.closeBag();
  };
  Object.defineProperty(i, "open", { get: function () {
      return !(!n.HUD || !n.HUD.bagOpen || "trang-bi" === n.HUD.bagTab);
    } });
  i.back = function () {
    if (i.detailOpen) {
      m();
    }
    else {
      i.close();
    }
  };
  i.render = function (e) {
    if (a.list) {
      var t = d.filter(function (n) {
        return "bi_tich" === n.muc;
      }).map(function (n) {
        return n.kind;
      });
      var o = i.entries().filter(function (n) {
        return t.indexOf(n.kind) >= 0;
      });
      var h = o.filter(function (n) {
        return n.known;
      });
      if (a.count) {
        a.count.textContent = h.length + " / " + o.length + " chiêu";
      }
      a.list.innerHTML = "";
      d.forEach(function (e) {
        if (!(t.indexOf(e.kind) < 0)) {
          var i = o.filter(function (n) {
            return n.kind === e.kind && (n.known || "co_ban" === e.kind);
          });
          if (i.length) {
            var h = e.label;
            if ("bi_dong" === e.kind) {
              h += " · đang mang " + n.Skills.passiveList().length + "/" + n.Skills.PASSIVE_MAX;
            }
            a.list.appendChild(s(h));
            i.forEach(function (n) {
              a.list.appendChild(p(n));
            });
          }
        }
      });
      var l = o.filter(function (n) {
        return !n.known && "co_ban" !== n.kind;
      });
      if (l.length) {
        a.list.appendChild(s("Chưa Lĩnh Ngộ"));
        l.forEach(function (n) {
          a.list.appendChild(p(n));
        });
      }
    }
  };
  i.closeDetail = function () {
    m();
  };
}(window.PNTT);
