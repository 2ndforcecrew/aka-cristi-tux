/* AKA.CRISTI tux 版 — nav.js
 * 懸浮條 + 全屏菜單開合。掛 window.AKA_TUX.nav。
 * 約定：index.html 含 #nav、[data-js="menu-btn"]、#menu-overlay。
 * 無外部 URL 引用，無第三方庫。
 */
(function () {
  'use strict';

  function init() {
    var nav = document.getElementById('nav');
    var btn = document.querySelector('[data-js="menu-btn"]');
    var overlay = document.getElementById('menu-overlay');
    if (!nav || !btn || !overlay) return;

    var links = overlay.querySelectorAll('a[href]');

    function open() {
      document.body.classList.add('menu-open');
      overlay.setAttribute('aria-hidden', 'false');
      btn.setAttribute('aria-expanded', 'true');
      if (links.length) links[0].focus();
    }

    function close() {
      document.body.classList.remove('menu-open');
      overlay.setAttribute('aria-hidden', 'true');
      btn.setAttribute('aria-expanded', 'false');
    }

    btn.addEventListener('click', function () {
      if (document.body.classList.contains('menu-open')) close();
      else open();
    });

    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', close);
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' || e.key === 'Esc') close();
    });

    /* 滾動收緊：rAF 節流 */
    var ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var y = window.scrollY || window.pageYOffset || 0;
        nav.classList.toggle('is-scrolled', y > 80);
        ticking = false;
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  window.AKA_TUX = window.AKA_TUX || {};
  window.AKA_TUX.nav = { init: init };
})();
