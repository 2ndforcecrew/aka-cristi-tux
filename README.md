# AKA.CRISTI — TUX Edition

AKA.CRISTI 作品站第三版：暗色電影風，設計語言參考 tux.co（TUX Creative House），內容為原創。

舊版 `cristi-portfolio`（v2.2）與現版 `aka-cristi-portfolio` 均不受影響。

## 用法

本地預覽（不要用 `file://` 直接打開——視頻可能不播放）：

```bash
cd ~/workspace/code-agent/projects/aka-cristi-tux
python3 -m http.server 8000
# 瀏覽器打開 http://localhost:8000/
```

## 目錄結構

```
aka-cristi-tux/
├── index.html            # 單頁：nav / hero / showcase / work / about / contact / footer
├── css/
│   ├── tokens.css        # 色彩 / 字體 / 間距 / 圓角 token（暗色電影風）
│   ├── base.css          # reset、字體棧、reduced-motion
│   ├── nav.css           # 懸浮圓角條 + 全屏菜單
│   ├── hero.css          # 全屏視頻 hero + 底部巨型標題
│   ├── showcase.css      # 全屏項目展播（pinned / 視差 / 巨型背景字）
│   ├── work.css          # 三視圖 + 底部膠囊切換器
│   ├── sections.css      # about / contact / footer
│   └── reveal.css        # 通用進場動畫
├── js/
│   ├── data.js           # 作品數據（window.AKA_TUX.WORKS，10 個）
│   ├── nav.js / hero.js / showcase.js / work.js / reveal.js
│   └── main.js           # 啟動器
├── assets/video/         # 3 個視頻（aka-cristi-hero / river-leviathan / wawa-android）
├── assets/img/           # 32 張圖片
└── test/smoke.mjs        # Node 靜態冒烟測試
```

## 測試

```bash
node test/smoke.mjs        # 10 項靜態檢查
node --check js/showcase.js && node --check js/work.js && node --check js/main.js
```

## 部署

```bash
git add -A && git commit -m "vX.Y" && git push origin main
```

推送到 GitHub 倉庫 `2ndforcecrew/aka-cristi-tux`，GitHub Pages 自動部署。
Live：https://2ndforcecrew.github.io/aka-cristi-tux/

## 設計來源

- 設計語言參考 https://tux.co/en/（懸浮導航條、全屏視頻 hero、三視圖切換器、全屏項目展播等**版式模式**），文案與作品內容均為 AKA.CRISTI 原創，不抄襲對方內容。
- 字體：Archivo / Inter / JetBrains Mono（系統字棧，無外部字體依賴）。
- 零外部依賴、零外部 URL 引用。
