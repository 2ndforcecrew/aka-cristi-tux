/* ============================================================
 * AKA.CRISTI tux 版 — showcase.js
 * 全屏項目展播：渲染 panel + rAF 視差 + 視頻進出播放。
 * ============================================================ */
(function () {
  'use strict';

  window.AKA_TUX = window.AKA_TUX || {};

  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function renderPanels() {
    var host = document.getElementById('showcase-panels');
    if (!host || !AKA_TUX.WORKS) return [];
    var html = '';
    for (var i = 0; i < AKA_TUX.WORKS.length; i++) {
      var w = AKA_TUX.WORKS[i];
      var media = w.kind === 'video'
        ? '<video muted loop playsinline preload="metadata" poster="' + esc(w.poster) + '"><source src="' + esc(w.media) + '" type="video/mp4"></video>'
        : '<img loading="lazy" decoding="async" src="' + esc(w.media) + '" alt="' + esc(w.title) + '">';
      html += ''
        + '<article class="panel" data-id="' + esc(w.id) + '" style="--accent:' + esc(w.accent) + '">'
        +   '<div class="panel-sticky">'
        +     '<h3 class="panel-word" aria-hidden="true">' + esc(w.title) + '</h3>'
        +     '<div class="panel-media">' + media + '</div>'
        +     '<div class="panel-accent"></div>'
        +     '<div class="panel-info">'
        +       '<p class="p-title">' + esc(w.title) + (w.titleZh ? ' — ' + esc(w.titleZh) : '') + '</p>'
        +       '<p class="p-meta">' + esc(w.services.join(' · ')) + ' — ' + esc(w.year) + '</p>'
        +     '</div>'
        +   '</div>'
        + '</article>';
    }
    host.innerHTML = html;
    return Array.prototype.slice.call(host.querySelectorAll('.panel'));
  }

  /* 視差：rAF 循環，按每 panel 在視口中的進度驅動 */
  function initParallax(panels) {
    if (reduced || !panels.length) return;
    var ticking = false;
    function update() {
      ticking = false;
      var vh = window.innerHeight;
      for (var i = 0; i < panels.length; i++) {
        var r = panels[i].getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) continue;
        var progress = Math.min(Math.max(-r.top / (r.height || 1), 0), 1);
        var media = panels[i].querySelector('.panel-media video, .panel-media img');
        var word = panels[i].querySelector('.panel-word');
        if (media) media.style.transform = 'scale(1.15) translateY(' + (progress * -8).toFixed(2) + '%)';
        if (word) word.style.transform = 'translateY(' + (progress * 12).toFixed(2) + '%)';
      }
    }
    function onScroll() {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
  }

  /* 視頻 panel：進入視口 50% 播放，離開暫停 */
  function initVideoToggle(panels) {
    if (!('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (entries) {
      for (var i = 0; i < entries.length; i++) {
        var v = entries[i].target.querySelector('.panel-media video');
        if (!v) continue;
        if (reduced) { v.pause(); continue; }
        if (entries[i].intersectionRatio >= 0.5) {
          var p = v.play();
          if (p && p.catch) p.catch(function () {});
        } else {
          v.pause();
        }
      }
    }, { threshold: 0.5 });
    for (var j = 0; j < panels.length; j++) io.observe(panels[j]);
  }

  AKA_TUX.showcase = {
    init: function () {
      var panels = renderPanels();
      initParallax(panels);
      initVideoToggle(panels);
    }
  };
})();
