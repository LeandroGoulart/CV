/**
 * Linha do tempo em espinha de peixe.
 *
 * Responsabilidades:
 *  - filtrar os marcos por categoria (trabalho, formação, certificação);
 *  - redistribuir os itens visíveis acima e abaixo da espinha, para que a
 *    alternância continue correta depois de qualquer filtro;
 *  - rolar horizontalmente pelos botões, mantendo o estado deles coerente.
 *
 * Defensivo: sem a marcação esperada, o script não faz nada.
 */
(function () {
  'use strict';

  var root = document.querySelector('[data-timeline]');
  if (!root) return;

  var viewport = root.querySelector('[data-timeline-viewport]');
  var track = root.querySelector('[data-timeline-track]');
  if (!viewport || !track) return;

  var items = Array.prototype.slice.call(track.querySelectorAll('[data-type]'));
  if (items.length === 0) return;

  var filterBar = document.querySelector('[data-timeline-filters]');
  var buttons = filterBar
    ? Array.prototype.slice.call(filterBar.querySelectorAll('[data-filter]'))
    : [];

  var prevBtn = root.querySelector('[data-scroll="prev"]');
  var nextBtn = root.querySelector('[data-scroll="next"]');

  /** Largura de um passo de rolagem: três colunas. */
  function step() {
    var first = items.filter(function (i) { return !i.hidden; })[0];
    var w = first ? first.getBoundingClientRect().width : 210;
    return Math.round(w * 3);
  }

  /** Liga/desliga os botões conforme a posição da rolagem. */
  function syncNav() {
    if (!prevBtn || !nextBtn) return;
    var max = viewport.scrollWidth - viewport.clientWidth;
    prevBtn.disabled = viewport.scrollLeft <= 1;
    nextBtn.disabled = viewport.scrollLeft >= max - 1;
  }

  /** Alterna os itens visíveis entre a linha de cima e a de baixo. */
  function relayout() {
    var shown = 0;
    items.forEach(function (item) {
      if (item.hidden) return;
      item.classList.toggle('fb-item--down', shown % 2 === 1);
      shown++;
    });
    return shown;
  }

  function fillCounts() {
    buttons.forEach(function (btn) {
      var slot = btn.querySelector('[data-count]');
      if (!slot) return;
      var type = btn.dataset.filter;
      slot.textContent = String(
        type === 'all'
          ? items.length
          : items.filter(function (i) { return i.dataset.type === type; }).length
      );
    });
  }

  function apply(type) {
    items.forEach(function (item) {
      item.hidden = type !== 'all' && item.dataset.type !== type;
    });

    var shown = relayout();

    buttons.forEach(function (btn) {
      btn.setAttribute('aria-pressed', String(btn.dataset.filter === type));
    });

    viewport.setAttribute(
      'aria-label',
      'Linha do tempo da trajetória, ' + shown + ' de ' + items.length + ' marcos exibidos'
    );

    viewport.scrollTo({ left: 0, behavior: 'auto' });
    syncNav();
  }

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () { apply(btn.dataset.filter); });
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', function () {
      viewport.scrollBy({ left: -step(), behavior: 'smooth' });
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      viewport.scrollBy({ left: step(), behavior: 'smooth' });
    });
  }

  viewport.addEventListener('scroll', syncNav, { passive: true });
  window.addEventListener('resize', syncNav);

  fillCounts();
  apply('all');
})();
