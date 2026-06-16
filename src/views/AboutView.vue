<script setup>
import { ref } from 'vue'
import PageHero from '@/components/PageHero.vue'
import Breadcrumb from '@/components/Breadcrumb.vue'
import { aboutCards } from '@/data/aboutData.js'
import aboutImage from '@/assets/img/關於我們/about.png'



const breadcrumbItems = [
  { text: '首頁', to: '/' },
  { text: '關於我們' },
]

const heroBanner = ref('https://picsum.photos/1918/336')
const cardList = ref(aboutCards)
</script>

<template>
  <div class="about-page">

    <!-- Banner -->
    <section class="banner-section">
      <Breadcrumb :items="breadcrumbItems" />
      <div class="hero-wrapper">
        <PageHero :image="heroBanner" />
        <h1 class="hero-title"></h1>
      </div>
    </section>

    <!-- Main -->
    <main aria-label="關於我們內容">
      <section class="news-section" aria-label="關於北屯社區大學">

        <!-- 關於我們 -->
        <div class="intro">
         

          <div class="intro-header">
            <div class="intro-header-text">
              <h2>關於我們</h2>
            </div>
            <div class="line"></div>
          </div>


          <div class="intro-tagline">
            落實終身學習、發揚北屯特色、致力在地公共事務、推動社會關懷
          </div>

          <p class="intro-desc">
            北屯社大在北屯區擁有「全市最高的高齡人口數」，且辦學主軸聚焦於「高齡預防照護支持」、「都市農業與食農教育」以及「在地文化傳承」
          </p>

           <div class="intro-image">
            <img :src="aboutImage" alt="關於北屯社區大學" />
          </div>

        </div>

        <!-- 社大發展區域 -->
        <div class="card-section">

          <div class="intro-header">
            <div class="intro-header-text">
              <h2>社大發展區域</h2>
            </div>
            <div class="line"></div>
          </div>

          <ul class="card-grid">
            <li v-for="item in cardList" :key="item.id" class="card">
              <div class="card-img">
                <img :src="item.image" :alt="item.title" />
              </div>
              <div class="card-body">
                <div class="card-title-wrap">
                  <h3>{{ item.title }}</h3>
                </div>
                <p>{{ item.summary }}</p>
                <time :datetime="item.date">{{ item.date }}</time>
              </div>
            </li>
          </ul>

        </div>

      </section>
    </main>

  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.about-page {
  width: 100%;
  margin: 0;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  padding-bottom: 80px;
}

/* ===== Banner ===== */
.banner-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 80px;
}

.hero-wrapper {
  position: relative;
  width: 100%;
}

.hero-wrapper :deep(svg),
.hero-wrapper :deep(img) {
  display: block;
  width: 100%;
  height: auto;
}

.hero-title {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  color: #000000;
  font-family: 'Inter', sans-serif;
  font-size: clamp(1.75rem, 4vw, 4rem);
  font-weight: 500;
  line-height: 1.2;
  text-align: center;
  pointer-events: none;
  white-space: nowrap;
  margin: 0;
}

/* ===== Main ===== */
main {
  display: flex;
  flex-direction: column;
  width: 100%;
}

/* 中間 section 寬度固定 1300px，水平置中 */
.news-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: min(1300px, 100%);
  margin: 0 auto;
  /* padding: 0 24px; */
  gap: 80px;
}

/* ===== Section Header (shared) ===== */
.intro-header {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.intro-header-text {
  display: flex;
  flex-direction: row;
  align-items: center;

}

.intro-header h2 {
  font-family: 'Noto Sans TC', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 4rem;
  line-height: 43px;
  color: #3C3C3C;
  margin: 0;
}

.line {
  width: 100%;
  height: 0;
  border-top: 3px solid #1E4620;
}

/* ===== 關於我們 intro ===== */
.intro {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
}

.intro-title-row {
  width: 100%;
}




.intro-tagline {
  width: 100%;
  font-family: 'Inter', sans-serif;
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 29px;
  color: #000000;
}

.intro-desc {
  width: 100%;
  font-family: 'Inter', sans-serif;
  font-size: 1.125rem;
  font-weight: 400;
  line-height: 22px;
  color: #000000;
  margin: 0;
}

/* ===== about 圖片：976×243px ===== */
/* ===== about 圖片 ===== */
.intro-image {
  width: 976px;
  max-width: 100%;

  margin: 0 auto;

  border-radius: 20px;
  overflow: hidden;
}

.intro-image img {
  display: block;
  width: 100%;
  height: auto;     /* ← 關鍵 */
  border-radius: 20px;
  object-fit: contain;
}

/* ===== 社大發展區域 cards ===== */
.card-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 74px;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(500px, 100%), 1fr));
  column-gap: 64px;
  row-gap: 74px;
  width: 100%;
  padding: 0;
  margin: 0;
  list-style: none;
}

/* Single card */
.card {
  width: 100%;
  position: relative;
  border-radius: 31px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* Card image — top 2/3 */
.card-img {
  width: 100%;
  aspect-ratio: 765 / 546;
  overflow: hidden;
  border-radius: 31px 31px 0 0;
  background: #d9d9d9;
  flex-shrink: 0;
}

.card-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Card text — bottom white block */
.card-body {
  width: 100%;
  padding: 24.95px 37.43px;
  background: #ffffff;
  border-radius: 0 0 31px 31px;
  display: flex;
  flex-direction: column;
  gap: 24.95px;
  border: 1px solid #f0f0f0;
  border-top: none;
}

.card-title-wrap {
  display: flex;
  flex-direction: column;
  gap: 18.71px;
}

.card-body h3 {
  margin: 0;
  font-family: 'Inter', sans-serif;
  font-size: 2.25rem;
  font-weight: 400;
  line-height: 45px;
  color: #000000;
}

.card-body p {
  margin: 0;
  font-family: 'Inter', sans-serif;
  font-size: 2rem;
  line-height: 38px;
  color: #757575;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-body time {
  font-family: 'Inter', sans-serif;
  font-size: 2rem;
  line-height: 38px;
  color: #757575;
}
</style>
