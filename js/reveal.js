/* AKA.CRISTI tux 版 — reveal.js
 * 通用進場動畫：
 *  - [data-split]：按字符包 <span class="ch" style="--i:N">，CSS 做 stagger
 *  - [data-reveal] / [data-split]：IntersectionObserver 觸發 .is-in（一次性）
 * 無外部 URL 引用，無第三方庫。
 */
(function () {
  'use strict';

  function splitChars(el) {
    if (el.getAttribute('data-split-done') === '1') return;
    var text = el.textContent;
    el.setAttribute('data-split-done', '1');
    el.textContent = '';
    var frag = document.createDocumentFragment();
    var idx = 0;
    for (var i = 0; i < text.length; i++) {
      var ch = text[i];
      if (ch === ' ') {
        /* 空格保留為文本節點，避免連續字距異常 */
        frag.appendChild(document.createTextNode(' '));
        continue;
      }
      var s = document.createElement('span');
      s.className = 'ch';
      s.setAttribute('style', '--i:' + idx);
      s.textContent = ch;
      frag.appendChild(s);
      idx++;
    }
    el.appendChild(frag);
  }

  function init() {
    var splitEls = document.querySelectorAll('[data-split]');
    for (var i = 0; i < splitEls.length; i++) splitChars(splitEls[i]);

    var targets = document.querySelectorAll('[data-reveal], [data-split]');
    if (!targets.length) return;

    if (!('IntersectionObserver' in window)) {
      for (var j = 0; j < targets.length; j++) targets[j].classList.add('is-in');
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        for (var k = 0; k < entries.length; k++) {
          var en = entries[k];
          if (en.isIntersecting) {
            en.target.classList.add('is-in');
            io.unobserve(en.target);
          }
        }
      },
      { threshold: 0.15 }
    );

    for (var m = 0; m < targets.length; m++) io.observe(targets[m]);
  }

  window.AKA_TUX = window.AKA_TUX || {};
  window.AKA_TUX.reveal = { init: init, splitChars: splitChars };
})();
