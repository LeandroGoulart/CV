/**
 * Filtro da linha do tempo.
 *
 * Os botões funcionam como alternância de categoria (trabalho, formação,
 * certificação) e um botão "Tudo" que limpa o filtro. A contagem de cada
 * categoria é calculada a partir do próprio HTML, para não haver número
 * escrito à mão que possa divergir do conteúdo.
 *
 * Defensivo: sem a marcação esperada, o script não faz nada.
 */
(function () {
  'use strict';

  var root = document.querySelector('[data-timeline]');
  if (!root) return;

  var filterBar = document.querySelector('[data-timeline-filters]');
  if (!filterBar) return;

  var items = Array.prototype.slice.call(root.querySelectorAll('[data-type]'));
  if (items.length === 0) return;

  var buttons = Array.prototype.slice.call(filterBar.querySelectorAll('[data-filter]'));

  /** Preenche a contagem exibida em cada botão. */
  function fillCounts() {
    buttons.forEach(function (btn) {
      var slot = btn.querySelector('[data-count]');
      if (!slot) return;

      var type = btn.dataset.filter;
      var total = type === 'all'
        ? items.length
        : items.filter(function (i) { return i.dataset.type === type; }).length;

      slot.textContent = String(total);
    });
  }

  /** Aplica o filtro e atualiza o estado dos botões. */
  function apply(type) {
    items.forEach(function (item) {
      item.hidden = type !== 'all' && item.dataset.type !== type;
    });

    buttons.forEach(function (btn) {
      btn.setAttribute('aria-pressed', String(btn.dataset.filter === type));
    });

    var visible = items.filter(function (i) { return !i.hidden; }).length;
    root.setAttribute('aria-label',
      'Linha do tempo, ' + visible + ' de ' + items.length + ' marcos exibidos');
  }

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      apply(btn.dataset.filter);
    });
  });

  fillCounts();
  apply('all');
})();
