<script setup>
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

import PageHero from '@/components/PageHero.vue'
import Breadcrumb from '@/components/Breadcrumb.vue'
import { aboutCards } from '@/data/aboutData.js'
import aboutImage from '@/assets/img/about/about.png'
import aboutBanner from '@/assets/img/locations/banner-location.png'

const BreadcrumbItems = [
  { text: '首頁', to: '/' },
  { text: '關於我們' },
]

const heroBanner = aboutBanner
const cardList = ref(aboutCards)
const swiperModules = [Pagination]
</script>

<template>
  <div class="about-page">
    <section class="banner-section">
      <Breadcrumb :items="BreadcrumbItems" />
      <div class="hero-wrapper">
        <PageHero :image="heroBanner" />
      </div>
    </section>

    <main aria-label="關於我們內容">
      <section class="news-section" aria-label="關於北屯社區大學">

        <div class="intro">
          <div class="intro-header">
            <div class="intro-header-text">
              <h2 class="title-main">關於我們</h2>
            </div>
            <div class="line"></div>
          </div>
          <div class="intro-tagline">落實終身學習、發揚北屯特色、致力在地公共事務、推動社會關懷</div>
          <p class="intro-desc">北屯社大在北屯區擁有「全市最高的高齡人口數」，且辦學主軸聚焦於「高齡預防照護支持」、「都市農業與食農教育」以及「在地文化傳承」</p>
          <div class="intro-image">
            <img :src="aboutImage" alt="關於北屯社區大學" />
          </div>
        </div>

        <div class="card-section">
          <div class="intro-header">
            <div class="intro-header-text">
              <h2 class="title-main">社大發展區域</h2>
            </div>
            <div class="line"></div>
          </div>

          <!-- 桌機 / 平板 卡片列表，≤576px 隱藏 -->
          <ul class="card-container">
            <li v-for="item in cardList" :key="item.id" class="card">
              <div class="card-overlay"></div>
              <div class="card-img">
                <img :src="item.image" :alt="item.title" />
              </div>
              <div class="card-body">
                <h3 class="card-title">{{ item.title }}</h3>
                <p class="card-desc">{{ item.summary }}</p>

              </div>
            </li>
          </ul>

          <!-- 手機版 Swiper，>576px 隱藏 -->
          <swiper :modules="swiperModules" :slides-per-view="1" :pagination="{ clickable: true }" class="card-swiper">
            <swiper-slide v-for="item in cardList" :key="item.id">
              <div class="card">
                <div class="card-overlay"></div>
                <div class="card-img">
                  <img :src="item.image" :alt="item.title" />
                </div>
                <div class="card-body">
                  <h3 class="card-title">{{ item.title }}</h3>
                  <p class="card-desc">{{ item.summary }}</p>
                  <!-- <time :datetime="item.date" class="card-date">{{ item.date }}</time> -->
                </div>
              </div>
            </swiper-slide>
          </swiper>

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
  display: flex;
  flex-direction: column;
  padding-bottom: 80px;
}

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

.hero-wrapper :deep(img) {
  display: block;
  width: 100%;
  height: auto;
}

/* ==================== 內容區塊 ==================== */
/* 圖片2：預設 >1400px，width 100%、max-width 1300px、margin: 0 auto、無 padding */
.news-section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  gap: 80px;
}

/* 圖片2：≤1400px */
@media (max-width: 1400px) {
  .news-section {
    padding: 0 80px;
  }
}

/* 圖片2：≤1100px */
@media (max-width: 1100px) {
  .news-section {
    padding: 0 40px;
  }
}

/* 圖片2：≤768px */
@media (max-width: 768px) {
  .news-section {
    padding: 0 20px;
  }
}

/* ==================== 標題 ==================== */
.intro-header {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.title-main {
  font-size: 4rem;
  color: #3C3C3C;
  margin: 8px 0;
}

.line {
  width: 100%;
  border-top: 3px solid #3C3C3C;
}

/* ==================== Intro ==================== */
.intro {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;
}

.intro-tagline {
  font-size: 1.5rem;
  color: #1E4620;
  font-weight: 500;
}

.intro-desc {
  font-size: 1.25rem;
  color: #706F6F;
  margin: 0;
}

.intro-image {
  align-self: center;
  width: 100%;
  max-width: calc(100% - 324px);
  border-radius: 20px;
  overflow: hidden;
}

.intro-image img {
  width: 100%;
  height: auto;
  object-fit: cover;
  display: block;
}

@media (max-width: 1100px) {
  .intro-image {
    max-width: 100%;
  }
}

/* ==================== 卡片區塊 ==================== */
.card-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 74px;
}

/* ✅ 預設：2×2 grid，四張卡片 */
.card-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
  width: 100%;
  padding: 0;
  margin: 0;
  list-style: none;
}

/* ≤768px：維持 grid 2欄，gap 縮為 16px */
@media (max-width: 768px) {
  .card-container {
    gap: 16px;
  }
}

/* ≤576px：card-container 隱藏，改 Swiper */
@media (max-width: 576px) {
  .card-container {
    display: none;
  }
}

/* Swiper：預設隱藏，≤576px 顯示 */
.card-swiper {
  display: none;
  width: 100%;
}

@media (max-width: 576px) {
  .card-swiper {
    display: block;
    padding-bottom: 40px;
  }
}

/* ==================== 卡片外觀 ==================== */
.card {
  width: 100%;
  border-radius: 31px;
  overflow: hidden;
  background: #ffffff;
  border: 1px solid #f0f0f0;
  position: relative;
}

/* 遮罩 */
.card-overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.2);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  border-radius: 31px;
  z-index: 1;
}

.card:hover .card-overlay {
  opacity: 1;
}

.card-img {
  width: 100%;
  aspect-ratio: 976 / 743;
  overflow: hidden;
}

.card-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.card-body {
  padding: 24.95px 37.43px;
  display: flex;
  flex-direction: column;
  gap: 24.95px;
}

.card-title {
  font-size: 2.25rem;
  margin: 0;
  color: #1E4620;
}

.card-desc {
  font-size: 2rem;
  color: #706F6F;
  margin: 0;
}



/* ==================== Swiper 圓點 ==================== */
:deep(.swiper-pagination-bullet-active) {
  background: #1E4620;
}
</style>