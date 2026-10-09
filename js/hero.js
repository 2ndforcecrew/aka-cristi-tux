/* AKA.CRISTI tux 版 — hero.js
 * 全屏視頻 hero：自動播放容錯 + 進出視口播放/暫停 + reduced-motion 降級。
 * 約定：index.html 含 #hero > .hero-media > video。
 * 無外部 URL 引用，無第三方庫。
 */
(function () {
  'use strict';

  function init() {
    var hero = document.getElementById('hero');
    if (!hero) return;
    var video = hero.querySelector('.hero-media video');
    if (!video) return;

    var mq = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
    var reduced = mq && mq.matches;

    if (reduced) {
      /* 降級：不自動播放，顯示 poster 靜幀 */
      video.removeAttribute('autoplay');
      video.pause();
      return;
    }

    /* 自動播放容錯（靜音視頻一般可播，被攔截則靜默） */
    function tryPlay() {
      var p = video.play();
      if (p && typeof p.catch === 'function') {
        p.catch(function () { /* 自動播放被攔截：保持靜幀 */ });
      }
    }
    tryPlay();

    /* 進出視口播放/暫停，省性能 */
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(
        function (entries) {
          var en = entries[0];
          if (en.isIntersecting) tryPlay();
          else video.pause();
        },
        { threshold: 0.15 }
      );
      io.observe(hero);
    }
  }

  window.AKA_TUX = window.AKA_TUX || {};
  window.AKA_TUX.hero = { init: init };
})();
