/* ============================================================
 * AKA.CRISTI tux 版 — main.js
 * 啟動器：按序 init 各模塊，每個用 typeof 守衛。
 * ============================================================ */
(function () {
  'use strict';

  window.AKA_TUX = window.AKA_TUX || {};

  function safeInit(name) {
    var mod = AKA_TUX[name];
    if (mod && typeof mod.init === 'function') {
      try {
        mod.init();
      } catch (e) {
        if (window.console && console.error) console.error('[AKA_TUX] ' + name + '.init failed:', e);
      }
    }
  }

  function boot() {
    safeInit('nav');
    safeInit('hero');
    safeInit('showcase');
    safeInit('work');
    safeInit('reveal');
    AKA_TUX.ready = true;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
