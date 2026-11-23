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

  if (typeof module !== "undefined") { module.exports = { compute: compute }; }
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
    box.appendChild(el("h1", null, cfg.start.title));
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

    var actions = el("div", "result-actions");
    var cta = el("a", "btn primary big", cfg.cta.label);
    cta.href = cfg.cta.url;
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
