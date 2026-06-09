# AGENTS.md — 北屯社大課程平台優化專題 開發規範

> 這份文件是全組（含每個人使用的 AI 工具：Codex、Gemini、Claude 等）共同遵守的開發規範。
> 所有 AI 在產生或修改程式碼前，應先閱讀本檔並遵照以下約定。
> 本檔為「活文件」：規範若有調整，請更新本檔並提交至 Git，確保全組與各家 AI 讀到的都是同一份最新版本。

---

## 專案簡介

- **專案**：北屯社區大學課程平台優化（前端重構）
- **目標**：改善原平台的排版、課程分類與篩選、報名狀態呈現
- **架構**：Vue 3 **純前端**專案，無後端資料庫，課程等資料來自本地資料檔

## 核心資料模型（供「資料流原則」參考）

平台主要處理以下「物件」：

- `course` 課程：id、課名、category（類別）、campus（分部）、時段、費用、status（報名狀態）
- `category` 課程類別：自然科學、資訊科技、運動舞蹈、養生保健…等
- `campus` 分部：校本部、松竹、東山、仁美、文昌…等
- `status` 報名狀態：開放中 / 即將額滿 / 已額滿
- `news` 最新消息：日期、標題、連結

---

## 一、必須統一（不統一，專案會壞或無法整合）

### 1. 技術主幹
- 框架：**Vue 3**
- 建置工具：**Vite**
- 路由：**Vue Router**
- 純前端，課程等資料放本地資料檔（`src/data/`）。狀態管理不特別規定，依資料擺法判斷是否需要。

### 2. 套件管理器
- 全組統一使用 **npm**（不可混用 yarn / pnpm）。
- `package-lock.json` 必須提交至 Git，確保所有人安裝到相同版本。

### 3. 資料夾結構
`src/` 底下固定如下：
- `components/`：共用元件
- `views/`：頁面
- `router/`：路由設定
- `data/`：本地資料檔（課程等）
- `composables/`：共用邏輯
- `assets/`：圖片等靜態資源

### 4. 元件 API 風格
- 一律使用**組合式 API**（Composition API）。
- 統一採 **`<script setup>`** 寫法（不使用 `setup()` 函式寫法、不使用選項式 API）。

### 5. Git 工作流
- 每個功能開獨立 **feature 分支**，不直接推 main。
- commit message 使用統一前綴（建議採 feat / fix / docs / style / refactor / chore；**實際前綴規則待團隊確認**）。
- 合併前一律發 **PR**，並由組員 review。

---

## 二、建議統一（不統一不會壞，但會持續產生磨擦）

### 6. 命名規則
- 元件名稱：大駝峰 PascalCase（例：`CourseCard`）
- 變數名稱：小駝峰 camelCase（例：`selectedCategory`）

### 7. CSS 策略
- 全組統一使用 **Tailwind CSS**（不混用 scoped CSS / CSS Modules 作為主要方案）。
- ⚠️ **必須關閉 Tailwind 的 preflight**：preflight 是 Tailwind 內建的 CSS reset，會與 Ant Design Vue 的元件樣式衝突（例如按鈕背景被洗掉）。關閉方式依 Tailwind 版本：
  - **v3**：在 `tailwind.config.js` 設定 `corePlugins: { preflight: false }`
  - **v4**：改在 CSS 設定，將 `@import "tailwindcss";` 拆成分層匯入，並省略 preflight 那一層

### 8. UI／圖示套件
- 全組統一使用 **Ant Design Vue**（套件 `ant-design-vue`，Vue 版本，非 React 版）及其內建 icon。

### 9. 資料流原則（純前端版）
- **單一來源**：課程等資料只放一處（本地資料檔），各頁面／元件向同一處取用，不各自複製一份。
- **衍生資料用 computed**：篩選、搜尋、熱門推薦等，皆從原始清單以 `computed` 即時算出，不另存 state。
- **狀態當唯一真相**：報名狀態以單一欄位 `status` 表示；標籤文字與按鈕狀態皆由此欄位計算（computed），不在多處各自判斷。
- **狀態驅動 UI**：透過修改 state 讓畫面自動更新，不直接操作 DOM。


*最後更新：請於每次修改後更新此處日期，並提交至 Git。*
