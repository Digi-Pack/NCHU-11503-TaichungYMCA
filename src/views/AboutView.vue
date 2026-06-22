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
import aboutBanner from '@/assets/img/about/banner-about.png'

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
  font-family: 'Noto Sans TC', sans-serif;
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
.news-section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  gap: 80px;
}

@media (max-width: 1400px) {
  .news-section {
    padding: 0 80px;
  }
}

@media (max-width: 1100px) {
  .news-section {
    padding: 0 40px;
  }
}

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

/* title-main：對應 text-48（3rem） */
.title-main {
  font-size: 4rem;
  color: #1E4620;
  margin: 8px 0;
}

@media (max-width: 1300px) {
  .title-main {
    font-size: 3.5rem; /* text-48 @1300px */
  }
}

@media (max-width: 950px) {
  .title-main {
    font-size: 3.25rem; /* text-48 @950px */
  }
}

@media (max-width: 768px) {
  .title-main {
    font-size: 3rem; /* text-48 @768px */
  }
}

@media (max-width: 390px) {
  .title-main {
    font-size: 2.5rem; /* text-48 @390px */
  }
}

.line {
  width: 100%;
  border-top: 3px solid #1E4620;
}

/* ==================== Intro ==================== */
.intro {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;
}

/* intro-tagline：對應 text-36（2.25rem） */
.intro-tagline {
  font-size: 2.25rem;
  color: #1E4620;
  font-weight: 500;
}

@media (max-width: 1300px) {
  .intro-tagline {
    font-size: 2rem; /* text-36 @1300px */
  }
}

@media (max-width: 768px) {
  .intro-tagline {
    font-size: 1.75rem; /* text-36 @768px */
  }
}

@media (max-width: 390px) {
  .intro-tagline {
    font-size: 1.5rem; /* text-36 @390px */
  }
}

/* intro-desc：對應 text-24（1.5rem），text.vue 無斷點定義，維持固定 */
.intro-desc {
  font-size: 1.5rem;
  color: #706F6F;
  margin: 0;
}

.intro-image {
  align-self: center;
  width: 976px;
  max-width: 100%;
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

.card-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 64px;
  width: 100%;
  padding: 0;
  margin: 0;
  list-style: none;
}

@media (max-width: 768px) {
  .card-container {
    gap: 16px;
  }
}

@media (max-width: 576px) {
  .card-container {
    display: none;
  }
}

.card-swiper {
  display: none;
  width: 100%;
}

@media (max-width: 576px) {
  .card-swiper {
    display: block;
    padding-bottom: 20px;
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
  aspect-ratio: 618 / 434;
  overflow: hidden;
}

.card-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.card-body {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 24.95px;
}

/* card-title：對應 text-36（2.25rem） */
.card-title {
  font-size: 2.25rem;
  margin: 0;
  color: #3C3C3C;
}

@media (max-width: 1300px) {
  .card-title {
    font-size: 2rem; /* text-36 @1300px */
  }
}

@media (max-width: 768px) {
  .card-title {
    font-size: 1.75rem; /* text-36 @768px */
  }
}

@media (max-width: 390px) {
  .card-title {
    font-size: 1.5rem; /* text-36 @390px */
  }
}

/* card-desc：對應 text-24（1.5rem），text.vue 無斷點定義，維持固定 */
.card-desc {
  font-size: 1.5rem;
  color: #706F6F;
  margin: 0;
}

/* ==================== Swiper 圓點 ==================== */
:deep(.swiper-pagination-bullet-active) {
  background: #1E4620;
}
</style>