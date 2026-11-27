/* Cybersecurity Quickscan: werking. Teksten en gewichten staan in quiz-config.js. */
(function () {
  "use strict";

  /* ---------- Score ---------- */

  function optionsFor(q, cfg) { return q.options || cfg.standardOptions; }

  function compute(answers, cfg) {
    var rows = cfg.questions.map(function (q, order) {
      var opts = optionsFor(q, cfg);
      var a = answers[q.id];
      var pct = (a != null && opts[a]) ? opts[a].pct : 0;
      return { q: q, order: order, pct: pct, points: q.weight * pct, loss: q.weight * (1 - pct) };
    });

    var total = Math.round(rows.reduce(function (s, r) { return s + r.points; }, 0) * 10) / 10;
    var level = cfg.levels.filter(function (l) { return total >= l.min; })[0];

    var domains = cfg.domains.map(function (d) {
      var mine = rows.filter(function (r) { return r.q.domain === d.id; });
      var max = mine.reduce(function (s, r) { return s + r.q.weight; }, 0);
      var got = mine.reduce(function (s, r) { return s + r.points; }, 0);
      return { id: d.id, label: d.label, pct: max ? Math.round(got / max * 100) : 0 };
    });

    var priorities = rows
      .filter(function (r) { return r.loss > 0; })
      .sort(function (a, b) { return (b.loss - a.loss) || (b.q.weight - a.q.weight) || (a.order - b.order); })
      .slice(0, 3)
      .map(function (r) { return r.q; });

    function pctOf(id) { return rows.filter(function (r) { return r.q.id === id; })[0].pct; }
    var insurable = !(pctOf("Q4") < 1 || pctOf("Q2") === 0 || pctOf("Q1") === 0);

    var sector = answers.P3, size = answers.P2, nis2 = null;
    if (cfg.nis2.sectors.indexOf(sector) !== -1) {
      nis2 = cfg.nis2.sizes.indexOf(size) !== -1 ? "direct" : "indirect";
    }

    return { total: total, level: level, domains: domains, priorities: priorities, insurable: insurable, nis2: nis2 };
  }

  /* ---------- Matching ---------- */

  var LEVEL_KEY = { low: "low", mid: "mid", good: "good" };

  function match(answers, cfg, data) {
    var W = data.weights;
    var lost = cfg.questions.map(function (q) {
      var opts = optionsFor(q, cfg);
      var a = answers[q.id];
      var pct = (a != null && opts[a]) ? opts[a].pct : 0;
      return { q: q, loss: q.weight * (1 - pct) };
    }).filter(function (r) { return r.loss > 0 && r.q.cap; })
      .sort(function (a, b) { return (b.loss - a.loss) || (b.q.weight - a.q.weight); });
    var lossSum = lost.reduce(function (s, r) { return s + r.loss; }, 0);
    var level = LEVEL_KEY[compute(answers, cfg).level.id];
    var sme = answers.P2 !== "250+";
    var wantsIt = answers.P4 === "self";

    return data.providers.map(function (p) {
      var capKeys = Object.keys(p.caps);
      var coverage = lossSum
        ? lost.reduce(function (s, r) { return s + r.loss * (p.caps[r.q.cap] || 0); }, 0) / lossSum
        : capKeys.reduce(function (s, k) { return s + p.caps[k]; }, 0) / capKeys.length;
      var levelFit = p.levels.length ? (p.levels.indexOf(level) !== -1 ? 1 : 0) : 0.5;
      var sectorFit = p.sectors.length ? (p.sectors.indexOf(answers.P3) !== -1 ? 1 : 0.3) : 0.5;
      var vlaioFit = (p.vlaio && sme) ? 1 : 0;
      var kindFit = wantsIt ? (p.kind === "it" ? 1 : 0.5) : (p.kind === "advies" ? 1 : 0.6);
      var score = W.coverage * coverage + W.level * levelFit + W.sector * sectorFit + W.vlaio * vlaioFit + W.kind * kindFit;
      var top = lost.slice(0, 3);
      return {
        provider: p,
        pct: Math.round(score),
        covered: top.filter(function (r) { return p.caps[r.q.cap] === 1; }).map(function (r) { return r.q.short; }),
        partly: top.filter(function (r) { return p.caps[r.q.cap] === 0.5; }).map(function (r) { return r.q.short; }),
        missing: top.filter(function (r) { return !p.caps[r.q.cap]; }).map(function (r) { return r.q.short; }),
        noGaps: !lossSum,
        levelFit: levelFit === 1,
        sectorFit: sectorFit === 1,
        vlaioFit: vlaioFit === 1,
        kindFit: kindFit === 1
      };
    }).sort(function (a, b) { return (b.pct - a.pct) || (a.provider.name < b.provider.name ? -1 : 1); }).slice(0, 3);
  }

  if (typeof module !== "undefined") { module.exports = { compute: compute, match: match }; }
  if (typeof document === "undefined") { return; }

  /* ---------- Opslag ---------- */

  var cfg = window.QUIZ_CONFIG;
  var root = document.getElementById("quiz");
  if (!cfg || !root) { return; }

  var steps = cfg.profile.concat(cfg.questions);
  var state = { i: -1, answers: {} };

  function load() {
    try {
      var saved = JSON.parse(localStorage.getItem(cfg.storageKey));
      if (saved && typeof saved.i === "number" && saved.answers) { state = saved; }
    } catch (e) { /* geen opslag beschikbaar: de quiz werkt zonder */ }
  }
  function save() {
    try { localStorage.setItem(cfg.storageKey, JSON.stringify(state)); } catch (e) { /* idem */ }
  }
  function reset() {
    state = { i: -1, answers: {} };
    try { localStorage.removeItem(cfg.storageKey); } catch (e) { /* idem */ }
  }

  /* ---------- Hulpjes ---------- */

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) { n.className = cls; }
    if (text != null) { n.textContent = text; }
    return n;
  }
  function comma(n) { return n.toFixed(1).replace(".", ","); }
  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function go(i) {
    state.i = i;
    save();
    render();
    root.scrollIntoView({ block: "nearest", behavior: reduced ? "auto" : "smooth" });
    root.focus({ preventScroll: true });
  }

  /* ---------- Schermen ---------- */

  function renderStart() {
    var box = el("div", "quiz-start");
    box.appendChild(el("h2", null, cfg.start.title));
    box.appendChild(el("p", "lead", cfg.start.subtitle));
    var hasProgress = Object.keys(state.answers).length > 0;
    var b = el("button", "btn primary big", hasProgress ? cfg.start.resume : cfg.start.button);
    b.type = "button";
    b.onclick = function () {
      var next = 0;
      while (next < steps.length && state.answers[steps[next].id] != null) { next++; }
      go(hasProgress ? Math.min(next, steps.length) : 0);
    };
    box.appendChild(b);
    box.appendChild(el("p", "quiz-note", cfg.start.note));
    return box;
  }

  function renderQuestion() {
    var step = steps[state.i];
    var box = el("div", "quiz-card");

    var bar = el("div", "quiz-progress");
    bar.setAttribute("role", "progressbar");
    bar.setAttribute("aria-valuemin", "0");
    bar.setAttribute("aria-valuemax", String(steps.length));
    bar.setAttribute("aria-valuenow", String(state.i));
    var fill = el("i");
    fill.style.width = (state.i / steps.length * 100) + "%";
    bar.appendChild(fill);
    box.appendChild(bar);

    box.appendChild(el("p", "quiz-count",
      cfg.labels.progress.replace("{n}", state.i + 1).replace("{total}", steps.length)));
    box.appendChild(el("h2", "quiz-question", step.text));

    var det = el("details", "quiz-explain");
    det.appendChild(el("summary", null, cfg.labels.explain));
    det.appendChild(el("p", null, step.explain));
    box.appendChild(det);

    var current = state.answers[step.id];
    function answer(value) {
      state.answers[step.id] = value;
      save();
      setTimeout(function () { go(state.i + 1); }, reduced ? 0 : 220);
    }

    if (step.type === "dropdown") {
      var sel = el("select", "quiz-select");
      sel.setAttribute("aria-label", step.text);
      var first = el("option", null, cfg.labels.choose);
      first.value = ""; first.disabled = true; first.selected = current == null;
      sel.appendChild(first);
      step.options.forEach(function (o) {
        var op = el("option", null, o.label);
        op.value = o.id; op.selected = current === o.id;
        sel.appendChild(op);
      });
      sel.onchange = function () { answer(sel.value); };
      box.appendChild(sel);
    } else {
      var list = el("div", "quiz-options");
      var opts = step.options || cfg.standardOptions;
      opts.forEach(function (o, idx) {
        var value = step.weight != null ? idx : o.id;
        var b = el("button", "quiz-option" + (current === value ? " selected" : ""), o.label);
        b.type = "button";
        b.setAttribute("aria-pressed", current === value ? "true" : "false");
        b.onclick = function () {
          Array.prototype.forEach.call(list.children, function (c) { c.classList.remove("selected"); });
          b.classList.add("selected");
          answer(value);
        };
        list.appendChild(b);
      });
      box.appendChild(list);
    }

    var nav = el("div", "quiz-nav");
    var prev = el("button", "btn ghost", cfg.labels.previous);
    prev.type = "button";
    prev.onclick = function () { go(state.i - 1); };
    nav.appendChild(prev);
    if (current != null) {
      var next = el("button", "btn", cfg.labels.next);
      next.type = "button";
      next.onclick = function () { go(state.i + 1); };
      nav.appendChild(next);
    }
    box.appendChild(nav);
    return box;
  }

  function gauge(result) {
    var wrap = el("div", "gauge level-" + result.level.color);
    var len = Math.PI * 80; /* halve cirkel, straal 80 */
    wrap.innerHTML =
      '<svg viewBox="0 0 200 112" role="img" aria-label="">' +
      '<path class="gauge-track" d="M20 100 A80 80 0 0 1 180 100" />' +
      '<path class="gauge-fill" d="M20 100 A80 80 0 0 1 180 100" stroke-dasharray="' + len + '" stroke-dashoffset="' + len + '" />' +
      "</svg>";
    wrap.querySelector("svg").setAttribute("aria-label", comma(result.total) + " " + cfg.labels.outOf);
    var num = el("div", "gauge-num");
    var big = el("strong", null, reduced ? comma(result.total) : "0,0");
    num.appendChild(big);
    num.appendChild(el("span", null, cfg.labels.outOf));
    wrap.appendChild(num);

    var arc = wrap.querySelector(".gauge-fill");
    var target = len * (1 - result.total / 10);
    if (reduced) {
      arc.style.strokeDashoffset = target;
    } else {
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { arc.style.strokeDashoffset = target; });
      });
      var t0 = null, dur = 900;
      var tick = function (t) {
        if (t0 === null) { t0 = t; }
        var p = Math.min(1, (t - t0) / dur);
        big.textContent = comma(result.total * (1 - Math.pow(1 - p, 3)));
        if (p < 1) { requestAnimationFrame(tick); }
      };
      requestAnimationFrame(tick);
    }
    return wrap;
  }

  function labelOf(step, value) {
    var opts = step.options || cfg.standardOptions;
    if (value == null) { return ""; }
    if (step.weight != null) { return opts[value] ? opts[value].label : ""; }
    var hit = opts.filter(function (o) { return o.id === value; })[0];
    return hit ? hit.label : "";
  }

  function leadPayload(r, values) {
    var data = {};
    Object.keys(cfg.lead.extraFields || {}).forEach(function (k) { data[k] = cfg.lead.extraFields[k]; });
    data.naam = values.name;
    data.email = values.email;
    data.telefoon = values.phone;
    data.bedrijf = values.company;
    data.toestemming = "ja";
    data.score = comma(r.total);
    data.niveau = r.level.label;
    data.prioriteiten = r.priorities.map(function (q) { return q.id; }).join(", ");
    data.verzekerbaar = r.insurable ? "ja" : "nee";
    data.nis2 = r.nis2 || "geen";
    steps.forEach(function (s) { data[s.id] = labelOf(s, state.answers[s.id]); });
    data.matches = matchesNow().map(function (m) { return m.provider.name + " (" + m.pct + "%)"; }).join("; ");
    data.pagina = location.href;
    return data;
  }

  function renderLead(r) {
    var L = cfg.lead;
    var box = el("section", "lead");
    box.id = "lead";
    box.appendChild(el("h3", null, L.title));
    var found = matchesNow();
    box.appendChild(el("p", null, found.length
      ? L.introMatches.replace("{n}", found.length).replace("{pct}", found[0].pct)
      : L.intro));
    if (L.points) {
      var pts = el("ul", "lead-points");
      L.points.forEach(function (t) { pts.appendChild(el("li", null, t)); });
      box.appendChild(pts);
    }

    var form = el("form", "lead-form");
    var inputs = {};
    [["name", "text", "name"], ["email", "email", "email"], ["phone", "tel", "tel"], ["company", "text", "organization"]]
      .forEach(function (f) {
        var wrap = el("label", "field");
        wrap.appendChild(el("span", null, L.fields[f[0]]));
        var input = el("input");
        input.type = f[1]; input.name = f[0]; input.required = true;
        input.setAttribute("autocomplete", f[2]);
        wrap.appendChild(input);
        inputs[f[0]] = input;
        form.appendChild(wrap);
      });

    /* Verborgen veld tegen spamrobots: mensen laten het leeg. */
    var trap = el("input", "trap");
    trap.type = "text"; trap.name = "website"; trap.tabIndex = -1;
    trap.setAttribute("autocomplete", "off");
    trap.setAttribute("aria-hidden", "true");
    form.appendChild(trap);

    var consent = el("label", "consent");
    var check = el("input");
    check.type = "checkbox"; check.required = true;
    consent.appendChild(check);
    var ctext = el("span");
    ctext.appendChild(el("strong", null, L.consent));
    if (L.consentNote) { ctext.appendChild(el("small", null, L.consentNote)); }
    consent.appendChild(ctext);
    form.appendChild(consent);

    var submit = el("button", "btn primary big", L.submit);
    submit.type = "submit";
    form.appendChild(submit);

    var status = el("p", "lead-status");
    status.setAttribute("role", "status");
    form.appendChild(status);

    form.onsubmit = function (e) {
      e.preventDefault();
      if (trap.value) { return; }
      submit.disabled = true;
      status.className = "lead-status";
      status.textContent = L.sending;
      var values = {};
      Object.keys(inputs).forEach(function (k) { values[k] = inputs[k].value.trim(); });
      fetch(L.endpoint, {
        method: "POST",
        headers: { "Content-Type": L.contentType || "application/json", "Accept": "application/json" },
        body: JSON.stringify(leadPayload(r, values))
      }).then(function (res) {
        if (!res.ok) { throw new Error("HTTP " + res.status); }
        return res.json().catch(function () { return {}; });
      }).then(function (body) {
        /* De ontvanger kan een fout melden met status 200 (Google Apps Script doet dat). */
        if (body && body.ok === false) { throw new Error(body.error || "geweigerd"); }
        box.innerHTML = "";
        box.appendChild(el("h3", null, L.title));
        box.appendChild(el("p", "lead-done", L.success));
      }).catch(function () {
        submit.disabled = false;
        status.className = "lead-status is-error";
        status.textContent = L.error;
      });
    };

    box.appendChild(form);
    return box;
  }

  function matchesNow() {
    return window.MATCH_DATA ? match(state.answers, cfg, window.MATCH_DATA) : [];
  }

  function renderMatches() {
    var list = matchesNow();
    if (!list.length) { return null; }
    var T = cfg.labels;
    var box = el("section", "matches");
    box.appendChild(el("h3", null, T.matchEyebrow));
    box.appendChild(el("p", "matches-title", T.matchTitle));
    box.appendChild(el("p", "matches-intro", T.matchIntro));
    list.forEach(function (m, idx) {
      var card = el("article", "match");
      var top = el("div", "match-top");
      top.appendChild(el("span", "match-pct", T.matchPct.replace("{n}", m.pct)));
      top.appendChild(el("span", "match-meta", m.provider.region));
      card.appendChild(top);
      card.appendChild(el("h4", null, T.matchSpecialist.replace("{n}", idx + 1) + ": " + m.provider.label));
      var ul = el("ul");
      function line(cls, text) { ul.appendChild(el("li", cls, text)); }
      if (m.noGaps) { line(null, T.matchAll); }
      if (m.covered.length) { line(null, T.matchCovered.replace("{items}", m.covered.join(", "))); }
      if (m.partly.length) { line("partly", T.matchPartly.replace("{items}", m.partly.join(", "))); }
      if (m.missing.length) { line("miss", T.matchMissing.replace("{items}", m.missing.join(", "))); }
      if (m.levelFit) { line(null, T.matchLevel); }
      if (m.sectorFit) { line(null, T.matchSector); }
      if (m.vlaioFit) { line(null, T.matchVlaio); }
      if (m.kindFit) { line(null, m.provider.kind === "it" ? T.matchKindIt : T.matchKindAdvies); }
      card.appendChild(ul);
      box.appendChild(card);
    });
    var how = el("details", "match-how");
    how.appendChild(el("summary", null, T.matchHow));
    how.appendChild(el("p", null, T.matchHowText));
    box.appendChild(how);
    return box;
  }

  function renderResult() {
    var r = compute(state.answers, cfg);
    var box = el("div", "quiz-result");

    var head = el("div", "result-head");
    var left = el("div", "result-score");
    left.appendChild(el("h2", null, cfg.labels.resultTitle));
    left.appendChild(gauge(r));
    head.appendChild(left);
    var right = el("div", "result-level");
    right.appendChild(el("span", "badge level-" + r.level.color, r.level.label));
    right.appendChild(el("p", null, r.level.text));
    head.appendChild(right);
    box.appendChild(head);

    var leadOn = cfg.lead && cfg.lead.endpoint;
    var leadBox = leadOn ? renderLead(r) : null;
    if (leadBox) { box.appendChild(leadBox); }

    var dom = el("section", "result-block");
    dom.appendChild(el("h3", null, cfg.labels.domainsTitle));
    r.domains.forEach(function (d) {
      var row = el("div", "bar-row");
      row.appendChild(el("span", "bar-label", d.label));
      var track = el("div", "bar-track");
      var fill = el("i");
      fill.style.width = (reduced ? d.pct : 0) + "%";
      track.appendChild(fill);
      row.appendChild(track);
      row.appendChild(el("span", "bar-val", d.pct + "%"));
      dom.appendChild(row);
      if (!reduced) { requestAnimationFrame(function () { requestAnimationFrame(function () { fill.style.width = d.pct + "%"; }); }); }
    });
    box.appendChild(dom);

    var pri = el("section", "result-block");
    pri.appendChild(el("h3", null, cfg.labels.prioritiesTitle));
    if (r.priorities.length) {
      var ol = el("ol", "priorities");
      r.priorities.forEach(function (q) { ol.appendChild(el("li", null, q.tip)); });
      pri.appendChild(ol);
    } else {
      pri.appendChild(el("p", null, cfg.labels.noPriorities));
    }
    box.appendChild(pri);

    var notes = el("div", "result-notes");
    var ins = el("section", "note " + (r.insurable ? "note-ok" : "note-warn"));
    ins.appendChild(el("h3", null, cfg.labels.insuranceTitle));
    ins.appendChild(el("p", null, r.insurable ? cfg.insurance.ok : cfg.insurance.warning));
    notes.appendChild(ins);
    if (r.nis2) {
      var n2 = el("section", "note note-info");
      n2.appendChild(el("h3", null, cfg.labels.nis2Title));
      n2.appendChild(el("p", null, cfg.nis2[r.nis2]));
      notes.appendChild(n2);
    }
    box.appendChild(notes);

    var matchBox = renderMatches();
    if (matchBox) { box.appendChild(matchBox); }

    var actions = el("div", "result-actions");
    var cta = el("a", "btn primary big", cfg.cta.label);
    if (leadOn) {
      cta.href = "#lead";
      cta.onclick = function (e) {
        e.preventDefault();
        leadBox.scrollIntoView({ block: "start", behavior: reduced ? "auto" : "smooth" });
        var first = leadBox.querySelector("input");
        if (first) { first.focus({ preventScroll: true }); }
      };
    } else {
      cta.href = cfg.cta.url;
    }
    actions.appendChild(cta);
    var again = el("button", "btn ghost", cfg.labels.restart);
    again.type = "button";
    again.onclick = function () { reset(); go(-1); };
    actions.appendChild(again);
    box.appendChild(actions);

    box.appendChild(el("p", "disclaimer", cfg.labels.disclaimer));
    return box;
  }

  function render() {
    root.innerHTML = "";
    root.className = "quiz";
    if (state.i < 0) { root.appendChild(renderStart()); }
    else if (state.i >= steps.length) { root.classList.add("is-result"); root.appendChild(renderResult()); }
    else { root.appendChild(renderQuestion()); }
  }

  load();
  if (state.i > steps.length) { state.i = steps.length; }
  root.setAttribute("tabindex", "-1");
  render();
})();
