/* ============================================================
 * AKA.CRISTI tux 版 — work.js
 * 三視圖（list / editorial / grid）一次性渲染 + 切換器狀態。
 * ============================================================ */
(function () {
  'use strict';

  window.AKA_TUX = window.AKA_TUX || {};

  var state = { mode: 'list' };

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function renderList(works) {
    var html = '';
    for (var i = 0; i < works.length; i++) {
      var w = works[i];
      var thumbs = '';
      for (var t = 0; t < Math.min(w.thumbs.length, 4); t++) {
        thumbs += '<img loading="lazy" decoding="async" src="' + esc(w.thumbs[t]) + '" alt="">';
      }
      html += ''
        + '<div class="work-row" role="listitem" data-id="' + esc(w.id) + '">'
        +   '<h3 class="row-title">' + esc(w.title) + '</h3>'
        +   '<p class="row-tags">' + esc(w.services.join(' / ')) + '</p>'
        +   '<div class="row-thumbs">' + thumbs + '</div>'
        + '</div>';
    }
    return html;
  }

  function renderEditorial(works) {
    var html = '';
    for (var i = 0; i < works.length; i++) {
      var w = works[i];
      var media = w.kind === 'video'
        ? '<video muted loop playsinline preload="metadata" poster="' + esc(w.poster) + '"><source src="' + esc(w.media) + '" type="video/mp4"></video>'
        : '<img loading="lazy" decoding="async" src="' + esc(w.media) + '" alt="' + esc(w.title) + '">';
      html += ''
        + '<div class="ed-block" style="--accent:' + esc(w.accent) + '">'
        +   '<div class="ed-media">' + media + '</div>'
        +   '<div><h3 class="ed-title">' + esc(w.title) + '</h3>'
        +   '<p class="ed-text">' + esc(w.titleZh) + ' — ' + esc(w.services.join(' / ')) + '，' + esc(w.year) + '。</p>'
        +   '<p class="ed-tags">' + esc(w.services.join(' · ')) + '</p></div>'
        + '</div>';
    }
    return html;
  }

  function renderGrid(works) {
    var html = '';
    for (var i = 0; i < works.length; i++) {
      var w = works[i];
      html += ''
        + '<div class="grid-cell" data-id="' + esc(w.id) + '" aria-label="' + esc(w.title) + '">'
        +   '<img loading="lazy" decoding="async" src="' + esc(w.poster) + '" alt="' + esc(w.title) + '">'
        + '</div>';
    }
    return html;
  }

  function setMode(mode) {
    if (mode !== 'list' && mode !== 'editorial' && mode !== 'grid') return;
    state.mode = mode;
    var views = document.getElementById('work-views');
    if (views) views.setAttribute('data-mode', mode);
    var btns = document.querySelectorAll('.view-switcher button[data-view]');
    for (var i = 0; i < btns.length; i++) {
      var on = btns[i].getAttribute('data-view') === mode;
      btns[i].classList.toggle('is-active', on);
      btns[i].setAttribute('aria-pressed', on ? 'true' : 'false');
    }
  }

  AKA_TUX.work = {
    state: state,
    setMode: setMode,
    getMode: function () { return state.mode; },
    init: function () {
      var works = AKA_TUX.WORKS || [];
      var list = document.querySelector('#work-views .view-list');
      var ed = document.querySelector('#work-views .view-editorial');
      var grid = document.querySelector('#work-views .view-grid');
      if (list) list.innerHTML = renderList(works);
      if (ed) ed.innerHTML = renderEditorial(works);
      if (grid) grid.innerHTML = renderGrid(works);
      var btns = document.querySelectorAll('.view-switcher button[data-view]');
      for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener('click', function () {
          setMode(this.getAttribute('data-view'));
        });
      }
      setMode('list');
    }
  };
})();
