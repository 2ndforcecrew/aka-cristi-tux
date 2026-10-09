/* AKA.CRISTI tux 版 — 作品數據（B組）
 * 經典 script，全局 window.AKA_TUX.WORKS
 * 字段約定（供 work.js / showcase.js 消費）：
 *   id, kind('video'|'photo'), title(全大寫英文), titleZh,
 *   services(mono 大寫標籤), year, accent(高飽和點綴色),
 *   media(主媒體), poster(視頻 poster/圖片封面), thumbs(3~5 張)
 */
(function () {
  'use strict';

  var V = 'assets/video/';
  var I = 'assets/img/';

  window.AKA_TUX = window.AKA_TUX || {};

  window.AKA_TUX.WORKS = [
    {
      id: 'aka-cristi-hero',
      kind: 'video',
      title: 'AKA.CRISTI',
      titleZh: '暗河巨獸',
      services: ['FILM', 'DIRECTION', 'FASHION'],
      year: '2026',
      accent: '#D7FF00',
      media: V + 'aka-cristi-hero.mp4',
      poster: I + 'bw-01.jpg',
      thumbs: [I + 'bw-01.jpg', I + 'bw-02.jpg', I + 'photo-01.jpg', I + 'photo-04.jpg']
    },
    {
      id: 'river-leviathan',
      kind: 'video',
      title: 'RIVER LEVIATHAN',
      titleZh: '暗河',
      services: ['FILM', 'DIRECTION'],
      year: '2026',
      accent: '#00E5FF',
      media: V + 'river-leviathan.mp4',
      poster: I + 'bw-02.jpg',
      thumbs: [I + 'bw-02.jpg', I + 'bw-01.jpg', I + 'photo-02.jpg', I + 'photo-05.jpg']
    },
    {
      id: 'wawa-android',
      kind: 'video',
      title: 'WAWA ANDROID',
      titleZh: '霧中人',
      services: ['FILM', 'PORTRAIT'],
      year: '2026',
      accent: '#FF2D78',
      media: V + 'wawa-android.mp4',
      poster: I + 'photo-01.jpg',
      thumbs: [I + 'photo-01.jpg', I + 'photo-06.jpg', I + 'photo-09.jpg']
    },
    {
      id: 'neon-city-nights',
      kind: 'photo',
      title: 'NEON CITY NIGHTS',
      titleZh: '霓虹之夜',
      services: ['PHOTOGRAPHY', 'FASHION'],
      year: '2025',
      accent: '#FF3D00',
      media: I + 'hero-neon-01.jpg',
      poster: I + 'hero-neon-01.jpg',
      thumbs: [I + 'hero-neon-01.jpg', I + 'photo-03.jpg', I + 'photo-07.jpg', I + 'photo-10.jpg']
    },
    {
      id: 'urban-soliloquy',
      kind: 'photo',
      title: 'URBAN SOLILOQUY',
      titleZh: '城市獨白',
      services: ['PHOTOGRAPHY', 'PORTRAIT'],
      year: '2025',
      accent: '#7C4DFF',
      media: I + 'hero-urban-02.jpg',
      poster: I + 'hero-urban-02.jpg',
      thumbs: [I + 'hero-urban-02.jpg', I + 'photo-04.jpg', I + 'photo-08.jpg']
    },
    {
      id: 'dreamweaver',
      kind: 'photo',
      title: 'DREAMWEAVER',
      titleZh: '織夢',
      services: ['EDITORIAL', 'FASHION'],
      year: '2025',
      accent: '#00FF87',
      media: I + 'hero-dream-03.jpg',
      poster: I + 'hero-dream-03.jpg',
      thumbs: [I + 'hero-dream-03.jpg', I + 'photo-05.jpg', I + 'photo-01.jpg', I + 'bw-01.jpg']
    },
    {
      id: 'prism-echo',
      kind: 'photo',
      title: 'PRISM ECHO',
      titleZh: '稜鏡回聲',
      services: ['EDITORIAL', 'ART DIRECTION'],
      year: '2024',
      accent: '#4D7CFF',
      media: I + 'hero-prism-04.jpg',
      poster: I + 'hero-prism-04.jpg',
      thumbs: [I + 'hero-prism-04.jpg', I + 'photo-06.jpg', I + 'photo-02.jpg']
    },
    {
      id: 'sculpted-void',
      kind: 'photo',
      title: 'SCULPTED VOID',
      titleZh: '雕塑虛空',
      services: ['PHOTOGRAPHY', 'ART DIRECTION'],
      year: '2024',
      accent: '#FFB800',
      media: I + 'photo-03.jpg',
      poster: I + 'photo-03.jpg',
      thumbs: [I + 'photo-03.jpg', I + 'bw-02.jpg', I + 'photo-09.jpg', I + 'photo-07.jpg']
    },
    {
      id: 'street-brand-identity',
      kind: 'photo',
      title: 'STREET BRAND IDENTITY',
      titleZh: '街頭品牌',
      services: ['BRANDING', 'ART DIRECTION'],
      year: '2024',
      accent: '#FF6B00',
      media: I + 'photo-08.jpg',
      poster: I + 'photo-08.jpg',
      thumbs: [I + 'photo-08.jpg', I + 'photo-04.jpg', I + 'photo-10.jpg']
    },
    {
      id: 'ethereal-drift',
      kind: 'photo',
      title: 'ETHEREAL DRIFT',
      titleZh: '空靈漂移',
      services: ['EDITORIAL', 'PORTRAIT'],
      year: '2024',
      accent: '#FF4D4D',
      media: I + 'photo-05.jpg',
      poster: I + 'photo-05.jpg',
      thumbs: [I + 'photo-05.jpg', I + 'photo-02.jpg', I + 'photo-06.jpg', I + 'bw-01.jpg']
    }
  ];
})();
