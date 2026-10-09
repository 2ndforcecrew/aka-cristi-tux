#!/usr/bin/env node
/**
 * AKA.CRISTI tux 版 — 冒烟測試（Node 無依賴，靜態斷言）
 * 用法：node test/smoke.mjs   （在項目根執行）
 * 退出碼：0 = 全部通過，1 = 有失敗
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const results = [];

function check(name, fn) {
  try {
    fn();
    results.push({ ok: true, name });
    console.log(`✓ ${name}`);
  } catch (e) {
    results.push({ ok: false, name, reason: e.message });
    console.error(`✗ ${name} —— ${e.message}`);
  }
}

function must(cond, msg) {
  if (!cond) throw new Error(msg);
}

function readFile(p) {
  const full = path.join(ROOT, p);
  must(fs.existsSync(full), `文件不存在: ${p}`);
  return fs.readFileSync(full, 'utf8');
}

function readAll(files) {
  return files.map(f => {
    const full = path.join(ROOT, f);
    must(fs.existsSync(full), `文件不存在: ${f}`);
    return { f, src: fs.readFileSync(full, 'utf8') };
  });
}

function globCss() {
  const dir = path.join(ROOT, 'css');
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(f => f.endsWith('.css')).map(f => `css/${f}`);
}

function globJs() {
  const dir = path.join(ROOT, 'js');
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(f => f.endsWith('.js')).map(f => `js/${f}`);
}

/* ---------- 1. index.html 骨架 id ---------- */
check('1. index.html 含 nav/hero/showcase/work/about/contact 六個錨點', () => {
  const html = readFile('index.html');
  for (const id of ['nav', 'hero', 'showcase', 'work', 'about', 'contact']) {
    must(html.includes(`id="${id}"`), `缺少 id="${id}"`);
  }
});

/* ---------- 2. 懸浮 nav + 全屏菜單 ---------- */
check('2. 懸浮 nav 含 MENU 按鈕 (data-js="menu-btn") 與全屏 overlay (id="menu-overlay")', () => {
  const html = readFile('index.html');
  must(html.includes('data-js="menu-btn"'), '缺少 data-js="menu-btn"');
  must(html.includes('id="menu-overlay"'), '缺少 id="menu-overlay"');
});

/* ---------- 3. hero 視頻四屬性 ---------- */
check('3. hero <video> 具備 muted / playsinline / autoplay / loop', () => {
  const html = readFile('index.html');
  const m = html.match(/<video\b[^>]*>/i);
  must(m, 'index.html 中找不到 <video>');
  const tag = m[0];
  for (const attr of ['muted', 'playsinline', 'autoplay', 'loop']) {
    must(new RegExp(`\\b${attr}\\b`, 'i').test(tag), `<video> 缺少 ${attr} 屬性`);
  }
});

/* ---------- 4. showcase panel 數量 == WORKS 數量 ---------- */
check('4. showcase panel 數量 == AKA_TUX.WORKS.length', () => {
  const dataJs = readFile('js/data.js');
  const ids = [...dataJs.matchAll(/id:\s*'([^']+)'/g)].map(x => x[1]);
  must(ids.length > 0, 'js/data.js 中解析不到作品 id');
  const html = readFile('index.html');
  // 靜態寫死的 panel（class 含 panel 的元素）
  const staticPanels = (html.match(/class="[^"]*\bpanel\b[^"]*"/g) || []).length;
  if (staticPanels > 0) {
    must(staticPanels === ids.length,
      `靜態 panel ${staticPanels} 個 ≠ WORKS ${ids.length} 個`);
    return;
  }
  // JS 動態渲染：showcase.js 必須從 AKA_TUX.WORKS 生成 panel
  let built = false;
  for (const f of globJs()) {
    const src = fs.readFileSync(path.join(ROOT, f), 'utf8');
    if (src.includes('AKA_TUX.WORKS') && /panel/i.test(src)) { built = true; break; }
  }
  must(built, 'index.html 無靜態 panel，且 js 中找不到從 AKA_TUX.WORKS 生成 panel 的邏輯');
});

/* ---------- 5. 三視圖切換器 ---------- */
check('5. 三視圖容器 data-mode="list" 默認 + 三按鈕 data-view 齊全', () => {
  const html = readFile('index.html');
  must(/data-mode="list"/.test(html), '缺少 data-mode="list" 默認容器');
  for (const v of ['list', 'editorial', 'grid']) {
    must(html.includes(`data-view="${v}"`), `缺少 data-view="${v}" 按鈕`);
  }
});

/* ---------- 6. data.js 媒體路徑真實存在 ---------- */
check('6. data.js 的 media/poster/thumbs 路徑在 assets/ 真實存在', () => {
  const dataJs = readFile('js/data.js');
  // 解析 var 前綴（如 var V = 'assets/video/';），支援 media: V + 'x.mp4' 寫法
  const prefixes = {};
  for (const m of dataJs.matchAll(/var\s+([A-Za-z_$][\w$]*)\s*=\s*'([^']*\/)'/g)) {
    prefixes[m[1]] = m[2];
  }
  const paths = new Set();
  const collect = (s) => {
    // 形式一：media: 'assets/x'（字面量）
    for (const m of s.matchAll(/(?:media|poster)\s*:\s*'([^']+)'/g)) paths.add(m[1]);
    // 形式二：media: PREFIX + 'x'（前綴拼接）
    for (const m of s.matchAll(/(?:media|poster)\s*:\s*([A-Za-z_$][\w$]*)\s*\+\s*'([^']+)'/g)) {
      paths.add((prefixes[m[1]] || '') + m[2]);
    }
  };
  collect(dataJs);
  // thumbs 數組內的每一項（字面量或前綴拼接）
  for (const arr of dataJs.matchAll(/thumbs\s*:\s*\[([^\]]*)\]/g)) {
    const inner = arr[1];
    for (const m of inner.matchAll(/'([^']+)'/g)) {
      // 判斷前面是否有 PREFIX +，有則拼前綴
      const before = inner.slice(0, m.index);
      const pm = before.match(/([A-Za-z_$][\w$]*)\s*\+\s*$/);
      paths.add(pm && prefixes[pm[1]] ? prefixes[pm[1]] + m[1] : m[1]);
    }
  }
  must(paths.size > 0, 'data.js 中解析不到任何媒體路徑');
  const missing = [...paths].filter(p =>
    !p.startsWith('data:') && !fs.existsSync(path.join(ROOT, p)));
  must(missing.length === 0, `缺失文件: ${missing.join(', ')}`);
});

/* ---------- 7. 無外部 URL 引用 ---------- */
check('7. index.html/css/js 無外部 URL（禁 http://、https://、fonts.googleapis）', () => {
  const files = readAll(['index.html', ...globCss(), ...globJs()]);
  must(files.length > 1, '掃描文件過少，項目文件可能缺失');
  const bad = [];
  for (const { f, src } of files) {
    // data: URI 天然不含 http(s)://，直接嚴格掃
    if (/https?:\/\//.test(src)) bad.push(`${f} 含 http(s)://`);
    if (/fonts\.googleapis/i.test(src)) bad.push(`${f} 含 fonts.googleapis`);
  }
  must(bad.length === 0, bad.join('；'));
});

/* ---------- 8. 無 gsap / ScrollTrigger / three ---------- */
check('8. 無 gsap / ScrollTrigger / three 引用', () => {
  const files = readAll(['index.html', ...globCss(), ...globJs()]);
  const bad = [];
  for (const { f, src } of files) {
    if (/gsap/i.test(src)) bad.push(`${f} 含 gsap`);
    if (/scrolltrigger/i.test(src)) bad.push(`${f} 含 ScrollTrigger`);
    if (/\bthree\b/i.test(src)) bad.push(`${f} 含 three`);
  }
  must(bad.length === 0, bad.join('；'));
});

/* ---------- 9. prefers-reduced-motion ---------- */
check('9. prefers-reduced-motion 出現 ≥1 次', () => {
  const files = [...globCss(), ...globJs()];
  let n = 0;
  for (const f of files) {
    const src = fs.readFileSync(path.join(ROOT, f), 'utf8');
    n += (src.match(/prefers-reduced-motion/g) || []).length;
  }
  must(n >= 1, 'css/js 中找不到 prefers-reduced-motion');
});

/* ---------- 10. README 用法說明 ---------- */
check('10. README.md 存在且含用法說明', () => {
  const md = readFile('README.md');
  must(/用法|使用/.test(md), 'README.md 未提及「用法/使用」');
});

/* ---------- 匯總 ---------- */
const passed = results.filter(r => r.ok).length;
console.log(`\n通過 ${passed}/${results.length}`);
process.exit(passed === results.length ? 0 : 1);
