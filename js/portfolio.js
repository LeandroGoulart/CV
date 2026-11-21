/* =============================================================
   Portfólio — carrossel Cover Flow
   Sem dependências. Aprimoramento progressivo: se este script não
   rodar, o palco continua sendo uma faixa rolável e todos os
   estudos de caso permanecem visíveis na página.
   ============================================================= */
(function () {
  'use strict';

  var pf = document.querySelector('[data-pf-root]');
  if (!pf) return;

  var stage  = pf.querySelector('[data-cf-stage]');
  var track  = pf.querySelector('[data-cf-track]');
  var dotsEl = pf.querySelector('[data-cf-dots]');
  var range  = pf.querySelector('[data-cf-range]');
  var live   = pf.querySelector('[data-cf-live]');
  var glow   = pf.querySelector('[data-cf-glow]');
  var prevBt = pf.querySelector('[data-cf-prev]');
  var nextBt = pf.querySelector('[data-cf-next]');
  var empty  = pf.querySelector('[data-pf-empty]');
  var filters = document.querySelector('[data-pf-filters]');

  var items = Array.prototype.slice.call(pf.querySelectorAll('.cf__item'));
  var cases = Array.prototype.slice.call(pf.querySelectorAll('.pf-case'));
  if (!stage || !track || items.length === 0) return;

  /* ---------- Geometria ---------- */
  var calm = window.matchMedia('(prefers-reduced-motion: reduce)');
  var small = window.matchMedia('(max-width: 760px)');

  function geo() {
    var narrow = small.matches;
    return {
      angle: calm.matches ? 0 : 48,
      lead:  narrow ? 118 : 158,
      gap:   narrow ? 40  : 58,
      depth: calm.matches ? 0 : (narrow ? 90 : 130),
      dstep: calm.matches ? 0 : 46,
      max:   narrow ? 3 : 4
    };
  }

  var GLOWS = {
    'cover--cloud': 'rgba(138, 180, 255, 0.16)',
    'cover--auto':  'rgba(255, 77, 94, 0.15)',
    'cover--dev':   'rgba(125, 147, 168, 0.12)'
  };

  var visible = items.slice();
  var index = 0;

  /* ---------- Render ---------- */
  function layout() {
    var g = geo();

    /* Limpa estado de itens que saíram do filtro */
    items.forEach(function (item) {
      if (visible.indexOf(item) === -1) item.removeAttribute('data-active');
    });

    visible.forEach(function (item, i) {
      var d = i - index;
      var ad = Math.abs(d);
      var sign = d < 0 ? -1 : 1;
      var x, z, ry, sc, op;

      if (d === 0) {
        x = 0; z = 0; ry = 0; sc = 1; op = 1;
      } else {
        x  = sign * (g.lead + (ad - 1) * g.gap);
        z  = -(g.depth + (ad - 1) * g.dstep);
        ry = -sign * g.angle;
        sc = Math.max(0.62, 1 - ad * 0.06);
        op = ad > g.max ? 0 : Math.max(0.12, 1 - ad * 0.18);
      }

      item.style.transform =
        'translate3d(' + x + 'px,0,' + z + 'px) rotateY(' + ry + 'deg) scale(' + sc + ')';
      item.style.opacity = op;
      item.style.zIndex = String(100 - ad);

      var far = ad > g.max;
      item.inert = far;
      item.setAttribute('aria-hidden', far ? 'true' : 'false');

      if (d === 0) item.setAttribute('data-active', '');
      else item.removeAttribute('data-active');
    });

    var active = visible[index];
    if (!active) return;

    /* Painel do caso correspondente */
    var key = active.getAttribute('data-case');
    cases.forEach(function (c) {
      if (c.getAttribute('data-case') === key) c.setAttribute('data-current', '');
      else c.removeAttribute('data-current');
    });

    /* Brilho ambiente na cor do domínio */
    if (glow) {
      var cover = active.querySelector('.cover');
      var tone = 'rgba(53, 200, 232, 0.16)';
      Object.keys(GLOWS).forEach(function (cls) {
        if (cover && cover.classList.contains(cls)) tone = GLOWS[cls];
      });
      glow.style.setProperty('--cf-glow', tone);
    }

    /* Controles */
    Array.prototype.forEach.call(dotsEl.children, function (dot, i) {
      dot.setAttribute('aria-current', i === index ? 'true' : 'false');
    });
    if (range) range.value = String(index);
    if (prevBt) prevBt.disabled = index === 0;
    if (nextBt) nextBt.disabled = index === visible.length - 1;

    var title = active.querySelector('.cover__title');
    if (live && title) {
      live.textContent = 'Projeto ' + (index + 1) + ' de ' + visible.length +
                         ': ' + title.textContent.trim();
    }
  }

  function go(i) {
    index = Math.max(0, Math.min(visible.length - 1, i));
    layout();
  }

  /* ---------- Controles ---------- */
  function buildDots() {
    dotsEl.textContent = '';
    visible.forEach(function (item, i) {
      var t = item.querySelector('.cover__title');
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'cf__dot';
      b.setAttribute('aria-label', t ? t.textContent.trim() : 'Projeto ' + (i + 1));
      b.addEventListener('click', function () { go(i); });
      dotsEl.appendChild(b);
    });
    if (range) {
      range.max = String(Math.max(0, visible.length - 1));
      range.setAttribute('aria-label', 'Percorrer os ' + visible.length + ' projetos');
    }
  }

  if (prevBt) prevBt.addEventListener('click', function () { go(index - 1); });
  if (nextBt) nextBt.addEventListener('click', function () { go(index + 1); });
  if (range) range.addEventListener('input', function () { go(Number(range.value)); });

  stage.addEventListener('keydown', function (e) {
    var k = e.key;
    if (k === 'ArrowRight') { go(index + 1); e.preventDefault(); }
    else if (k === 'ArrowLeft') { go(index - 1); e.preventDefault(); }
    else if (k === 'Home') { go(0); e.preventDefault(); }
    else if (k === 'End') { go(visible.length - 1); e.preventDefault(); }
  });

  /* Rolagem horizontal de trackpad. deltaY é deixado em paz
     para não sequestrar a rolagem vertical da página. */
  var wheelLock = false;
  stage.addEventListener('wheel', function (e) {
    if (Math.abs(e.deltaX) < 12 || Math.abs(e.deltaX) < Math.abs(e.deltaY)) return;
    e.preventDefault();
    if (wheelLock) return;
    wheelLock = true;
    go(index + (e.deltaX > 0 ? 1 : -1));
    setTimeout(function () { wheelLock = false; }, 260);
  }, { passive: false });

  /* Arrasto */
  var dragId = null, dragX = 0, dragFrom = 0, moved = 0;

  stage.addEventListener('pointerdown', function (e) {
    if (e.button !== 0) return;
    dragId = e.pointerId;
    dragX = e.clientX;
    dragFrom = index;
    moved = 0;
    stage.setAttribute('data-dragging', '');
    stage.setPointerCapture(dragId);
  });

  stage.addEventListener('pointermove', function (e) {
    if (dragId !== e.pointerId) return;
    var dx = e.clientX - dragX;
    moved = Math.abs(dx);
    var step = geo().gap + 34;
    var target = dragFrom - Math.round(dx / step);
    if (target !== index) go(target);
  });

  function endDrag(e) {
    if (dragId !== e.pointerId) return;
    stage.releasePointerCapture(dragId);
    stage.removeAttribute('data-dragging');
    dragId = null;
  }
  stage.addEventListener('pointerup', endDrag);
  stage.addEventListener('pointercancel', endDrag);

  /* Clique na capa */
  items.forEach(function (item) {
    var btn = item.querySelector('.cover');
    if (!btn) return;
    btn.tabIndex = -1;
    btn.addEventListener('click', function () {
      if (moved > 8) return;
      var i = visible.indexOf(item);
      if (i === -1) return;
      if (i === index) {
        var cur = pf.querySelector('.pf-case[data-current] .pf-case__title');
        if (cur) {
          cur.setAttribute('tabindex', '-1');
          cur.focus({ preventScroll: false });
        }
      } else {
        go(i);
      }
    });
  });

  /* ---------- Filtros ---------- */
  function applyFilter(key) {
    visible = items.filter(function (item) {
      var dom = item.getAttribute('data-dom') || '';
      return dom.split(/\s+/).indexOf(key) !== -1;
    });

    items.forEach(function (item) {
      item.hidden = visible.indexOf(item) === -1;
    });

    if (empty) empty.hidden = visible.length > 0;
    stage.hidden = visible.length === 0;

    index = 0;
    buildDots();
    if (visible.length) layout();
    else cases.forEach(function (c) { c.removeAttribute('data-current'); });
  }

  if (filters) {
    filters.addEventListener('click', function (e) {
      var btn = e.target.closest('.filter');
      if (!btn) return;
      Array.prototype.forEach.call(filters.querySelectorAll('.filter'), function (b) {
        b.setAttribute('aria-pressed', String(b === btn));
      });
      applyFilter(btn.getAttribute('data-pf-dom'));
    });
  }

  /* ---------- Início ---------- */
  pf.setAttribute('data-pf-ready', '');
  stage.setAttribute('aria-roledescription', 'carrossel');
  applyFilter('destaque');

  var relayout = null;
  window.addEventListener('resize', function () {
    clearTimeout(relayout);
    relayout = setTimeout(layout, 120);
  });
  if (calm.addEventListener) calm.addEventListener('change', layout);
})();
