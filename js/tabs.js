/**
 * Navegação por abas — padrão ARIA Tabs.
 *
 * Responsabilidades:
 *  - alternar painéis sem recarregar a página;
 *  - manter a aba ativa na URL (#identidade, #competencias, ...),
 *    para que um link possa apontar direto para uma aba;
 *  - suportar navegação por teclado (setas, Home, End).
 *
 * O script é defensivo: se a marcação esperada não existir, ele
 * simplesmente não faz nada em vez de quebrar a página inteira.
 */
(function () {
  'use strict';

  var tablist = document.querySelector('[data-tablist]');
  if (!tablist) return;

  var tabs = Array.prototype.slice.call(tablist.querySelectorAll('[role="tab"]'));
  if (tabs.length === 0) return;

  /** Retorna o painel controlado por uma aba, ou null. */
  function panelOf(tab) {
    var id = tab.getAttribute('aria-controls');
    return id ? document.getElementById(id) : null;
  }

  /**
   * Ativa a aba informada.
   * @param {HTMLElement} tab
   * @param {boolean} setFocus  move o foco para a aba (navegação por teclado)
   * @param {boolean} updateHash grava a aba na URL
   */
  function activate(tab, setFocus, updateHash) {
    tabs.forEach(function (t) {
      var panel = panelOf(t);
      var selected = t === tab;

      t.setAttribute('aria-selected', String(selected));
      t.setAttribute('tabindex', selected ? '0' : '-1');
      if (panel) panel.hidden = !selected;
    });

    if (setFocus) tab.focus();

    if (updateHash && tab.dataset.hash) {
      history.replaceState(null, '', '#' + tab.dataset.hash);
    }

    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  /** Encontra a aba correspondente ao hash atual da URL. */
  function tabFromHash() {
    var hash = window.location.hash.replace('#', '');
    if (!hash) return null;
    return tabs.filter(function (t) { return t.dataset.hash === hash; })[0] || null;
  }

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      activate(tab, false, true);
    });

    tab.addEventListener('keydown', function (event) {
      var index = tabs.indexOf(tab);
      var target = null;

      switch (event.key) {
        case 'ArrowRight': target = tabs[(index + 1) % tabs.length]; break;
        case 'ArrowLeft':  target = tabs[(index - 1 + tabs.length) % tabs.length]; break;
        case 'Home':       target = tabs[0]; break;
        case 'End':        target = tabs[tabs.length - 1]; break;
        default: return;
      }

      event.preventDefault();
      activate(target, true, true);
    });
  });

  // Estado inicial: respeita o hash da URL, senão abre a primeira aba.
  activate(tabFromHash() || tabs[0], false, false);

  // Navegação pelo histórico do navegador (voltar/avançar).
  window.addEventListener('hashchange', function () {
    var tab = tabFromHash();
    if (tab) activate(tab, false, false);
  });
})();
