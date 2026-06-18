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

const BreadcrumbItems = [
  { text: '首頁', to: '/' },
  { text: '關於我們' },
]

const heroBanner = ref('https://picsum.photos/1920/336')
const cardList = ref(aboutCards)
const swiperModules = [Pagination]
</script>
<template>
  <div class="about-page">
    <section class="banner-section">
      <Breadcrumb :items="BreadcrumbItems" />
      <div class="hero-wrapper">
        <PageHero :image="heroBanner" />
        <h1 class="hero-title"></h1>
      </div>
    </section>

    <main aria-label="關於我們內容">
      <section class="news-section" aria-label="關於北屯社區大學">
        <div class="intro">
          <div class="intro-header">
            <div class="intro-header-text"><h2>關於我們</h2></div>
            <div class="line"></div>
          </div>
          <div class="intro-tagline">落實終身學習、發揚北屯特色、致力在地公共事務、推動社會關懷</div>
          <p class="intro-desc">北屯社大在北屯區擁有「全市最高的高齡人口數」，且辦學主軸聚焦於「高齡預防照護支持」、「都市農業與食農教育」以及「在地文化傳承」</p>
          <div class="intro-image"><img :src="aboutImage" alt="關於北屯社區大學" /></div>
        </div>

        <div class="card-section">
          <div class="intro-header">
            <div class="intro-header-text"><h2>社大發展區域</h2></div>
            <div class="line"></div>
          </div>

          <ul class="card-grid">
            <li v-for="item in cardList" :key="item.id" class="card">
              <div class="card-img"><img :src="item.image" :alt="item.title" /></div>
              <div class="card-body">
                <h3>{{ item.title }}</h3>
                <p>{{ item.summary }}</p>
                <time :datetime="item.date">{{ item.date }}</time>
              </div>
            </li>
          </ul>

          <swiper :modules="swiperModules" :slides-per-view="1" :pagination="{ clickable: true }" class="card-swiper">
            <swiper-slide v-for="item in cardList" :key="item.id">
              <div class="card">
                <div class="card-img"><img :src="item.image" :alt="item.title" /></div>
                <div class="card-body">
                  <h3>{{ item.title }}</h3>
                  <p>{{ item.summary }}</p>
                  <time :datetime="item.date">{{ item.date }}</time>
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
* { box-sizing: border-box; }
.about-page { width: 100%; margin: 0; display: flex; flex-direction: column; padding-bottom: 80px; }
.banner-section { width: 100%; display: flex; flex-direction: column; padding-bottom: 80px; }
.hero-wrapper { position: relative; width: 100%; }
.hero-wrapper :deep(img) { display: block; width: 100%; height: auto; }
.news-section { display: flex; flex-direction: column; align-items: center; width: min(1300px, 100%); margin: 0 auto; gap: 80px; }
.intro-header { width: 100%; display: flex; flex-direction: column; gap: 8px; }
.intro-header h2 { font-size: 4rem; color: #3C3C3C; margin: 8px 0; }
.line { width: 100%; border-top: 3px solid #1E4620; }
.intro { width: 100%; display: flex; flex-direction: column; align-items: center; gap: 32px; }
.intro-image { width: 976px; max-width: 100%; border-radius: 20px; overflow: hidden; }
.intro-image img { width: 100%; height: auto; border-radius: 20px; object-fit: contain; }

/* 卡片區塊版面控制 */
.card-section { width: 100%; display: flex; flex-direction: column; align-items: center; gap: 74px; }
.card-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(500px, 100%), 1fr)); column-gap: 64px; row-gap: 74px; width: 100%; padding: 0; margin: 0; list-style: none; }
.card-swiper { display: none; width: 100%; }

/* 手機版響應式設定 */
@media (max-width: 575px) {
  .card-grid { display: none; }
  .card-swiper { display: block; padding-bottom: 40px; }
}

/* 卡片外觀設定 */
.card { width: 100%; border-radius: 31px; overflow: hidden; background: #ffffff; border: 1px solid #f0f0f0; }
.card-img { width: 100%; aspect-ratio: 765 / 546; overflow: hidden; }
.card-img img { width: 100%; height: 100%; object-fit: cover; display: block; }
.card-body { padding: 24.95px 37.43px; display: flex; flex-direction: column; gap: 24.95px; }
.card-body h3 { font-size: 2.25rem; margin: 0; }
.card-body p, .card-body time { font-size: 2rem; color: #757575; margin: 0; }

:deep(.swiper-pagination-bullet-active) { background: #1E4620; }
</style>