<template>
  <main id="main-content" class="location-page">

    <!-- ===== Section 1：Hero Banner 全寬圖片 + 標題 ===== -->
   <section class="hero-section" aria-labelledby="about-heading">
  <h1 id="about-heading" class="about-title">關於我們</h1>
  <PageHero image="https://picsum.photos/1920/400" />
</section>

    <!-- ===== Section 2：創校歷史 — 文字左 + 圖片右（圖片往左覆蓋文字） ===== -->
    <section class="section-history-a" aria-labelledby="history-a-title">
      <div class="history-a-inner">
        <!-- 文字區：width 758px, left calc(50% - 758/2 - 308px) -->
        <div class="history-a-text">
          <h2 id="history-a-title" class="section-heading">創校歷史</h2>
          <p class="section-body">
            臺中市北屯(原大墩)社區大學開辦於民國九十一年六月，近期每年修習學員人次皆超過一萬多人次。臺中市政府自開辦社大以來，由四家開放至六家承辦單位，台中YMCA憑藉良好辦學經驗及成果，至今通過市府多次招標審核、獲選承辦大墩社大。於市政府每年定期之社大評鑑中，皆獲評審委員一致肯定，並連續多年獲得教育部肯定為辦學績優單位。
          </p>
        </div>
        <!-- 圖片區：width 648px, height 508px, left 934px -->
        <div class="history-a-image">
          <img
            src="https://picsum.photos/648/508?random=1"
            alt="創校歷史照片"
            class="history-a-img"
            width="648"
            height="508"
            loading="lazy"
          />
        </div>
      </div>
    </section>

    <!-- ===== Section 3：創校歷史 — 文字在圖片上方中央覆蓋（全寬圖片背景） ===== -->
    <section class="section-history-b" aria-labelledby="history-b-title">
      <!-- 全寬圖片背景 -->
      <img
        src="https://picsum.photos/1920/662?random=2"
        alt="校園環境照片"
        class="history-b-bg"
        width="1920"
        height="662"
        loading="lazy"
      />
      <!-- 文字：width 758px, left calc(50% - 758/2), top 126px -->
      <div class="history-b-text">
        <h2 id="history-b-title" class="section-heading section-heading--light">創校歷史</h2>
        <p class="section-body section-body--light">
          臺中市北屯(原大墩)社區大學開辦於民國九十一年六月，近期每年修習學員人次皆超過一萬多人次。臺中市政府自開辦社大以來，由四家開放至六家承辦單位，台中YMCA憑藉良好辦學經驗及成果，至今通過市府多次招標審核、獲選承辦大墩社大。於市政府每年定期之社大評鑑中，皆獲評審委員一致肯定，並連續多年獲得教育部肯定為辦學績優單位。
        </p>
      </div>
    </section>

    <!-- ===== Section 4：願景 ===== -->
    <section class="section-vision" aria-labelledby="vision-title">
      <!-- 願景標題：width 128px, left calc(50% - 128/2), top 0 -->
      <h2 id="vision-title" class="vision-heading">願景</h2>

      <!-- 三欄圖片：width 1616px, gap 64px, 每張 496×517px -->
      <div class="vision-grid" role="list">
        <article
          v-for="(item, index) in visionItems"
          :key="index"
          class="vision-card"
          role="listitem"
        >
          <img
            :src="item.image"
            :alt="item.alt"
            class="vision-img"
            width="496"
            height="517"
            loading="lazy"
          />
        </article>
      </div>
    </section>

  </main>
</template>

<script setup>
import PageHero from '@/components/PageHero.vue' 
// ─── SEO Meta (搭配 @vueuse/head 或 vue-meta 使用) ──────────────────
// useHead({
//   title: '創校歷史 — 臺中市北屯社區大學',
//   meta: [
//     { name: 'description', content: '臺中市北屯社區大學創校歷史、辦學願景與社區連結介紹。' },
//     { property: 'og:title', content: '創校歷史 — 臺中市北屯社區大學' },
//     { property: 'og:description', content: '臺中市北屯社區大學開辦於民國九十一年六月，持續提供優質社區學習環境。' },
//   ]
// })

// ─── Vision Data ─────────────────────────────────────────────────────
const visionItems = [
  { image: 'https://picsum.photos/496/517?random=3', alt: '願景一：社區連結' },
  { image: 'https://picsum.photos/496/517?random=4', alt: '願景二：終身學習' },
  { image: 'https://picsum.photos/496/517?random=5', alt: '願景三：文化傳承' },
]
</script>

<style scoped>
/* ─── Design Tokens（對應 Figma 規格） ──────────────────────────────── */

.about-title {
  font-family: 'Noto Sans TC', sans-serif;
  font-size: clamp(28px, 3.5vw, 64px);
  font-weight: 500;
  color: #000000;
  padding: 16px clamp(20px, 4vw, 80px);
  margin: 0;
}
.location-page {
  --color-cream:       #F9F6F0;
  --color-green:       #1E4620;
  --color-orange:      #D96B27;
  --color-text-body:   #757575;
  --color-text-dark:   #000000;

  --font-heading-size: 64px;
  --font-heading-lh:   77px;
  --font-body-size:    32px;
  --font-body-lh:      39px;

  --section-gap:       80px;       /* Figma gap: 80px */
  --page-width:        1920px;
  --container-width:   1616px;     /* 願景 frame 寬度 */

  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: var(--section-gap);         /* Figma: gap 80px */
  width: 100%;
  background: #ffffff;
  font-family: 'Noto Sans TC', 'Inter', sans-serif;
  overflow-x: hidden;
}

/* ─── 通用標題 ──────────────────────────────────────────────────────── */
.section-heading {
  font-size: var(--font-heading-size);
  line-height: var(--font-heading-lh);
  font-weight: 400;
  color: var(--color-text-dark);
  margin-bottom: 32px;             /* Figma text gap: 32px */
}

.section-heading--light {
  color: #ffffff;
}

.section-body {
  font-size: var(--font-body-size);
  line-height: var(--font-body-lh);
  font-weight: 400;
  color: var(--color-text-body);
}

.section-body--light {
  color: rgba(255, 255, 255, 0.9);
}

/* ═══════════════════════════════════════════════════════════════════════
   Section 1 — Hero  (width: 1918px, height: 336px)
══════════════════════════════════════════════════════════════════════ */

/* 標題：left calc(50% - 320px/2 - 96px), top calc(50% - 77px/2 + 0.5px) */
/* Section 1 — Hero */
.hero-section {
  width: 100%;
  align-self: stretch;
  flex-shrink: 0;
}

/* ✅ 穿透 scoped，讓 PageHero 的 SVG 撐滿 */
.hero-section :deep(svg) {
  display: block;
  width: 100%;
  height: auto;
}

/* ✅ SVG 內的 image 對應 viewBox 絕對尺寸 */
.hero-section :deep(image) {
  width: 1918px;
  height: 336px;
}

/* ═══════════════════════════════════════════════════════════════════════
   Section 2 — 創校歷史 A  (width: 1920px, height: 662px)
   文字 left calc(50% - 758/2 - 308px), top 126px
   圖片 left 934px, top 65px, width 648px, height 508px
══════════════════════════════════════════════════════════════════════ */
.section-history-a {
  position: relative;
  width: 100%;
  height: 662px;
  align-self: stretch;
  flex-shrink: 0;
}

.history-a-inner {
  position: relative;
  width: 100%;
  height: 100%;
}

/* 文字區：absolute, width 758px, height 382px */
.history-a-text {
  position: absolute;
  width: 758px;
  height: 382px;
  left: calc(50% - 758px / 2 - 308px);
  top: 126px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.history-a-text .section-heading {
  margin-bottom: 0;
}

/* 圖片：absolute, width 648px, height 508px, left 934px, top 65px */
.history-a-image {
  position: absolute;
  width: 648px;
  height: 508px;
  left: 934px;
  top: 65px;
}

.history-a-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
  display: block;
}

/* ═══════════════════════════════════════════════════════════════════════
   Section 3 — 創校歷史 B  (width: 1920px, height: 662px, 全寬圖片背景)
   文字 left calc(50% - 758/2), top 126px → 字在圖片上
══════════════════════════════════════════════════════════════════════ */
.section-history-b {
  position: relative;
  width: 100%;
  height: 662px;
  align-self: stretch;
  flex-shrink: 0;
  overflow: hidden;
}

.history-b-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* 半透明遮罩讓文字可讀 */
.section-history-b::after {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.38);
  pointer-events: none;
}

/* 文字：width 758px, height 382px, left calc(50% - 758/2), top 126px */
.history-b-text {
  position: absolute;
  z-index: 2;
  width: 758px;
  height: 382px;
  left: calc(50% - 758px / 2);
  top: 126px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.history-b-text .section-heading {
  margin-bottom: 0;
}

/* ═══════════════════════════════════════════════════════════════════════
   Section 4 — 願景  (width: 1920px, height: 662px)
   標題：width 128px, left calc(50% - 128/2), top 0
   Grid：width 1616px, height 517px, left calc(50% - 1616/2), top 151px, gap 64px
   每張：width 496px, height 517px, border-radius 20px
══════════════════════════════════════════════════════════════════════ */
.section-vision {
  position: relative;
  width: 100%;
  height: 662px;
  align-self: stretch;
  flex-shrink: 0;
}

.vision-heading {
  position: absolute;
  width: 128px;
  height: 77px;
  left: calc(50% - 128px / 2);
  top: 0;
  font-family: 'Inter', sans-serif;
  font-size: 64px;
  font-weight: 400;
  line-height: 77px;
  color: var(--color-text-dark);
  white-space: nowrap;
}

.vision-grid {
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 64px;                        /* Figma gap: 64px */
  width: 1616px;
  height: 517px;
  left: calc(50% - 1616px / 2);
  top: 151px;
}

.vision-card {
  flex: none;
  width: 496px;
  height: 517px;
}

.vision-img {
  width: 496px;
  height: 517px;
  object-fit: cover;
  border-radius: 20px;
  display: block;
}

/* ═══════════════════════════════════════════════════════════════════════
   RWD — 響應式斷點
══════════════════════════════════════════════════════════════════════ */

/* ── 1440px 寬螢幕縮放 ─────────────────────────────────────────────── */
@media (max-width: 1919px) {
  .location-page {
    --font-heading-size: clamp(32px, 3.5vw, 64px);
    --font-heading-lh:   1.2;
    --font-body-size:    clamp(16px, 1.8vw, 32px);
    --font-body-lh:      1.7;
  }

  /* .hero-wrapper      { height: clamp(200px, 17.5vw, 336px); }
  .hero-title        { font-size: clamp(28px, 3.5vw, 64px); line-height: 1.2; } */

  /* Section 2 */
  .section-history-a { height: auto; min-height: 500px; padding: 80px 0; }
  .history-a-inner   { display: flex; flex-direction: row; align-items: center;
                        padding-inline: clamp(40px, 4vw, 160px); gap: 0; }
  .history-a-text    { position: static; width: 50%; height: auto; padding-right: 48px; }
  .history-a-image   { position: static; width: 50%; height: auto; }
  .history-a-img     { width: 100%; height: clamp(280px, 26vw, 508px); }

  /* Section 3 */
  .section-history-b { height: clamp(400px, 34.5vw, 662px); }
  .history-b-text    { position: absolute;
                        width: clamp(400px, 39.5vw, 758px);
                        height: auto;
                        left: 50%; transform: translateX(-50%);
                        top: clamp(60px, 6.5vw, 126px); }

  /* Section 4 */
  .section-vision    { height: auto; padding: clamp(40px, 4vw, 80px) 0 clamp(60px, 5vw, 80px); }
  .vision-heading    { position: static; text-align: center; display: block;
                        font-size: clamp(32px, 3.5vw, 64px); line-height: 1.2;
                        margin-bottom: clamp(24px, 2.5vw, 74px); }
  .vision-grid       { position: static; width: clamp(80%, 84vw, 1616px);
                        height: auto; margin-inline: auto; gap: clamp(20px, 3.3vw, 64px); }
  .vision-card       { width: auto; flex: 1; height: auto; }
  .vision-img        { width: 100%; height: clamp(200px, 26.9vw, 517px); }
}

/* ── Tablet 768px ─────────────────────────────────────────────────── */
@media (max-width: 1024px) {
  .location-page { --section-gap: 60px; }

  .hero-title { left: 50%; transform: translateX(-50%); width: auto; white-space: nowrap; }

  /* Section 2：上下堆疊 */
  .history-a-inner   { flex-direction: column; padding-inline: 40px; }
  .history-a-text    { width: 100%; padding-right: 0; }
  .history-a-img     { height: 320px; }

  /* Section 3 文字置中 */
  .history-b-text    { width: 80%; left: 10%; transform: none; }

  /* 願景 2欄 */
  .vision-grid       { flex-wrap: wrap; justify-content: center; }
  .vision-card       { width: calc(50% - 32px); flex: none; }
  .vision-img        { width: 100%; height: 280px; }
}

/* ── Mobile ≤ 767px ────────────────────────────────────────────────── */
@media (max-width: 767px) {
  .location-page { --section-gap: 40px; }

  .section-heading   { font-size: 28px; line-height: 1.3; }
  .section-body      { font-size: 15px; line-height: 1.75; }

  .history-a-inner   { padding-inline: 20px; }

  .history-b-text    { width: 90%; left: 5%; transform: none; top: 40px; }
  .section-history-b { height: 380px; }

  .vision-grid       { flex-direction: column; width: 90%; gap: 24px; }
  .vision-card       { width: 100%; }
  .vision-img        { height: 220px; }
}
</style>