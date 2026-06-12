<script setup>
import PageHero from '@/components/PageHero.vue' 

const visionImages = [
  { id: 1, alt: '願景圖片一', caption: '' },
  { id: 2, alt: '願景圖片二', caption: '' },
  { id: 3, alt: '願景圖片三', caption: '' },
  { id: 4, alt: '願景圖片四', caption: '' },
]
</script>
<template>
  <main id="main-content" class="location-page">

    <!-- Hero Section -->
   <section class="hero-section" aria-labelledby="location-heading">
  <h1 id="location-heading" class="page-title">服務據點</h1>
  <PageHero image="https://picsum.photos/1920/400" />
</section>

    <!-- 創校歷史 Section 1：文字左、圖片右 -->
    <section class="history-section" aria-labelledby="history-heading-1">
      <div class="container history-layout">
        <div class="history-text">
          <h2 id="history-heading-1" class="section-title">創校歷史</h2>
          <p class="section-body">
            臺中市北屯（原北屯）社區大學獲籌於民國九十一年六月，於當時年間學發社人次倍數自一萬多人次。臺中市政府自開辦社大以來，由初期的服務三六萬典籍學位，台中YMCA志願服務於辦學模式及成果，先後通過市委多次評鑑第一，服務培育大學社大，於年見多的讓市社大調整中，依照教育局員工一校所在，鼓勵多年度教育年鑑也是為到優先優惠不。
          </p>
        </div>
        <div class="history-image-wrapper" role="img" aria-label="創校歷史圖片">
          <img
            src="https://picsum.photos/60/400?random=11"
            alt="創校歷史相關圖片"
            class="history-image"
            width="60"
            height="400"
            loading="lazy"
          />
        </div>
      </div>
    </section>

    <!-- 創校歷史 Section 2：圖片左、文字右（反轉） -->
    <section class="history-section history-section--reverse" aria-labelledby="history-heading-2">
      <div class="container history-layout history-layout--reverse">
        <div class="history-image-wrapper" role="img" aria-label="創校歷史第二段圖片">
          <img
            src="https://picsum.photos/60/400?random=12"
            alt="創校歷史第二段相關圖片"
            class="history-image"
            width="60"
            height="400"
            loading="lazy"
          />
        </div>
        <div class="history-text">
          <h2 id="history-heading-2" class="section-title">創校歷史</h2>
          <p class="section-body">
            臺中市北屯社區大學學辦於民國九十一年六月，於當地年間學發社人次倍數自一萬多人次。臺中市政府自開辦社大以來，由初期的服務三六萬典籍學位，台中YMCA志願服務於辦學模式及成果，先後通過市委多次評鑑第一，服務培育大學社大，不作為多的讓市社大調整中，依照教育局員工一校所在，鼓勵多年度教育年鑑也是為到優先優惠不。
          </p>
        </div>
      </div>
    </section>

    <!-- 願景 Section -->
    <section class="vision-section" aria-labelledby="vision-heading">
      <div class="container">
        <h2 id="vision-heading" class="section-title section-title--center">願景</h2>
        <ul class="vision-grid" role="list" aria-label="願景圖片集">
          <li
            v-for="(item, index) in visionImages"
            :key="item.id"
            class="vision-item"
            role="listitem"
          >
            <figure class="vision-figure">
              <img
                :src="`https://picsum.photos/60/400?random=${20 + index}`"
                :alt="item.alt"
                class="vision-image"
                width="60"
                height="400"
                loading="lazy"
              />
              <figcaption v-if="item.caption" class="vision-caption">
                {{ item.caption }}
              </figcaption>
            </figure>
          </li>
        </ul>
      </div>
    </section>

  </main>
</template>



<style scoped>
/* ===== CSS Variables ===== */
.location-page {
  /* --color-cream: #F9F6F0; */
  --color-green: #1E4620;
  --color-orange: #D96B27;
  --color-white: #ffffff;
  --color-text: #2c2c2c;
  --color-text-muted: #555555;
  --font-family: 'Noto Serif TC', 'Noto Sans TC', 'Microsoft JhengHei', serif;
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 2rem;
  --spacing-lg: 3rem;
  --spacing-xl: 5rem;
  --border-radius: 4px;
  --transition: 0.25s ease;

  background-color: var(--color-cream);
  color: var(--color-text);
  font-family: var(--font-family);
  min-height: 100vh;
}

/* ===== Container ===== */
.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 var(--spacing-md);
}

/* ===== Hero Section ===== */


.page-title {
  color: var(--color-orange);
  font-size: clamp(1.25rem, 3vw, 1.75rem);
  font-weight: 700;
  padding: var(--spacing-sm) var(--spacing-md);
  margin: 0;
  letter-spacing: 0.05em;
}

/* ===== Section Titles ===== */
.section-title {
  font-size: clamp(1.3rem, 2.5vw, 1.7rem);
  font-weight: 700;
  color: var(--color-green);
  margin: 0 0 var(--spacing-sm);
  padding-bottom: var(--spacing-xs);
  border-bottom: 3px solid var(--color-orange);
  display: inline-block;
}

.section-title--center {
  display: block;
  text-align: center;
  border-bottom: none;
  position: relative;
  padding-bottom: var(--spacing-sm);
}

.section-title--center::after {
  content: '';
  display: block;
  width: 60px;
  height: 3px;
  background-color: var(--color-orange);
  margin: var(--spacing-xs) auto 0;
}

.section-body {
  font-size: 0.95rem;
  line-height: 2;
  color: var(--color-text-muted);
  margin: 0;
}

/* ===== History Sections ===== */
.history-section {
  padding: var(--spacing-xl) 0;
}

.history-section + .history-section {
  border-top: 1px solid rgba(30, 70, 32, 0.12);
}

.history-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-lg);
  align-items: center;
}

.history-layout--reverse {
  /* image is already first in DOM for reverse layout */
}

.history-text {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.history-image-wrapper {
  overflow: hidden;
  border-radius: var(--border-radius);
  border: 1px solid rgba(30, 70, 32, 0.1);
}

.history-image {
  display: block;
  width: 100%;
  height: 300px;
  object-fit: cover;
  transition: transform var(--transition);
}

.history-image-wrapper:hover .history-image {
  transform: scale(1.03);
}

/* ===== Vision Section ===== */
.vision-section {
  padding: var(--spacing-xl) 0;
  background-color: var(--color-white);
  border-top: 1px solid rgba(30, 70, 32, 0.12);
}

.vision-grid {
  list-style: none;
  margin: var(--spacing-md) 0 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-md);
}

.vision-item {
  overflow: hidden;
  border-radius: var(--border-radius);
  border: 1px solid rgba(30, 70, 32, 0.1);
}

.vision-figure {
  margin: 0;
  position: relative;
}

.vision-image {
  display: block;
  width: 100%;
  height: 240px;
  object-fit: cover;
  transition: transform var(--transition);
}

.vision-item:hover .vision-image {
  transform: scale(1.04);
}

.vision-caption {
  padding: var(--spacing-xs) var(--spacing-sm);
  font-size: 0.85rem;
  color: var(--color-text-muted);
  background-color: var(--color-cream);
}

/* ===== Responsive ===== */
@media (max-width: 768px) {
  .history-layout,
  .history-layout--reverse {
    grid-template-columns: 1fr;
  }

  .history-layout--reverse .history-image-wrapper {
    order: -1;
  }

  .vision-grid {
    grid-template-columns: 1fr;
  }


}

/* ===== Reduced Motion ===== */
@media (prefers-reduced-motion: reduce) {
  .history-image,
  .vision-image {
    transition: none;
  }
  .history-image-wrapper:hover .history-image,
  .vision-item:hover .vision-image {
    transform: none;
  }
}
</style>