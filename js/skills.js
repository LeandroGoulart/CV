/**
 * Competências: filtro por stack.
 *
 * Um eixo só, de propósito. Ao filtrar, as dimensões que contêm algo relevante
 * abrem sozinhas e as que não contêm nada são ocultadas — o recrutador não
 * precisa abrir oito blocos para descobrir onde está o que lhe interessa.
 *
 * A contagem de cada dimensão vem sempre do DOM.
 * Defensivo: sem a marcação esperada, o script não faz nada.
 */
(function () {
  'use strict';

  var root = document.querySelector('[data-dims]');
  var bar = document.querySelector('[data-stack-filters]');
  if (!root || !bar) return;

  var dims = Array.prototype.slice.call(root.querySelectorAll('[data-dim]'));
  var items = Array.prototype.slice.call(root.querySelectorAll('[data-stack]'));
  if (items.length === 0) return;

  var buttons = Array.prototype.slice.call(bar.querySelectorAll('[data-stack]'));
  var empty = document.querySelector('[data-dims-empty]');

  function matches(item, stack) {
    return stack === 'all' ||
      (item.dataset.stack || '').split(' ').indexOf(stack) !== -1;
  }

  function apply(stack) {
    var total = 0;
    var filtering = stack !== 'all';

    items.forEach(function (item) {
      item.hidden = !matches(item, stack);
    });

    dims.forEach(function (dim) {
      var inside = Array.prototype.slice.call(dim.querySelectorAll('[data-stack]'));
      var visible = inside.filter(function (i) { return !i.hidden; }).length;

      dim.hidden = visible === 0;
      total += visible;

      // Com filtro ativo, abre o que sobrou; sem filtro, volta ao estado fechado.
      dim.open = filtering && visible > 0;

      var counter = dim.querySelector('[data-dim-count]');
      if (counter) counter.textContent = visible;
    });

    buttons.forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.stack === stack));
    });

    if (empty) empty.hidden = total > 0;
  }

  buttons.forEach(function (b) {
    b.addEventListener('click', function () { apply(b.dataset.stack); });
  });

  apply('all');
})();
