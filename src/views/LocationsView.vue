<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { allLocations } from '@/data/location.js'
import PageHero from '@/components/PageHero.vue'
import Breadcrumb from '@/components/Breadcrumb.vue'
import { CarOutlined, AimOutlined, EnvironmentOutlined } from '@ant-design/icons-vue'


import Swiper from 'swiper'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

import locationHeroImgSrc from '@/assets/img/locations/banner-location.png'
const locationHeroImg = ref(locationHeroImgSrc)
import lostImg from '@/assets/img/locations/lost.jpg'

const BreadcrumbItems = [
  { text: '首頁', to: '/' },
  { text: '服務據點' },
]

const tags = [
  { label: '全部據點', value: 'all' },
  { label: '校本部', value: '校本部' },
  { label: '松竹分部', value: '松竹分部' },
  { label: '東山分部', value: '東山分部' },
  { label: '大德分部', value: '大德分部' },
  { label: '陳平分部', value: '陳平分部' },
  { label: '仁美分部', value: '仁美分部' },
  { label: '文昌分部', value: '文昌分部' },
]

const activeTag = ref('all')
function setActiveTag(v) { activeTag.value = v }

const showDetail = computed(() => activeTag.value !== 'all')

const filteredLocations = computed(() =>
  activeTag.value === 'all'
    ? allLocations
    : allLocations.filter(loc => loc.region === activeTag.value)
)

let swiperInstance = null

function initSwiper() {
  if (swiperInstance) {
    swiperInstance.destroy(true, true)
    swiperInstance = null
  }
  const el = document.querySelector('.locations-swiper')
  if (!el) return
  swiperInstance = new Swiper(el, {
    modules: [Pagination],
    slidesPerView: 1,
    spaceBetween: 16,
    pagination: { el: '.swiper-pagination', clickable: true },
  })
}

function destroySwiper() {
  if (swiperInstance) {
    swiperInstance.destroy(true, true)
    swiperInstance = null
  }
}

const isMobile = ref(false)
function checkMobile() {
  isMobile.value = window.innerWidth < 768
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})
onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
  destroySwiper()
})

watch([isMobile, activeTag, filteredLocations], async ([mobile]) => {
  if (mobile) {
    await nextTick()
    initSwiper()
  } else {
    destroySwiper()
  }
}, { immediate: true })

async function goToRegion(region, id) {
  if (region) {
    activeTag.value = region

    await nextTick()

    requestAnimationFrame(() => {
      const targetElement = document.getElementById('locations-title')
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    })
  }
}
</script>

<template>
  <main id="main-content" class="locations-page">

    <!-- Banner -->
    <section class="banner" aria-label="服務據點頁面標題">
      <Breadcrumb :items="BreadcrumbItems" />
      <PageHero :image="locationHeroImg" />
    </section>

    <!-- Main content -->
    <section class="locations-section" aria-labelledby="locations-title">
      <div class="container">

        <!-- Section heading -->
        <header class="section-header">
          <div class="section-header__title-group">
            <h1 id="locations-title" class="section-header__h1">服務據點</h1>
            <div class="section-header__title-line" aria-hidden="true"></div>
          </div>
          <p v-if="!showDetail" class="section-header__subtitle">
            臺中市北屯(原大墩)社區大學開辦於民國九十一年六月，近期每年修習學員人次皆超過一萬多人次。臺中市政府自開辦社大以來，由四家開放至六家承辦單位，台中YMCA憑藉良好辦學經驗及成果，至今通過市府多次招標審核、獲選承辦大墩社大。於市政府每年定期之社大評鑑中，皆獲評審委員一致肯定，並連續多年獲得教育部肯定為辦學績優單位。
          </p>
        </header>

        <!-- Filter tags -->
        <div class="tag-group" role="group" aria-label="篩選服務據點分類">
          <button v-for="tag in tags" :key="tag.value" class="tag" :class="{ 'tag--active': activeTag === tag.value }"
            :aria-pressed="activeTag === tag.value" @click="setActiveTag(tag.value)">
            {{ tag.label }}
          </button>
        </div>

        <!-- ── 全部模式 ── -->
        <template v-if="!showDetail">

          <!-- 桌機（≥ 768px） -->
          <div v-if="!isMobile" class="locations-list" role="list" aria-label="服務據點清單">
            <article v-for="location in filteredLocations" :key="location.id"
              class="location-card location-card--clickable" role="listitem"
              @click="goToRegion(location.region, location.id)">
              <div class="location-card__summary">
                <div class="location-card__img-wrap">
                  <img :src="location.image" :alt="location.name" class="location-card__img" loading="lazy" width="207"
                    height="207" @error="(e) => e.target.src = lostImg" />
                </div>
                <div class="location-card__content">
                  <h2 class="location-card__name">{{ location.name }}</h2>
                  <div class="location-card__title-line" aria-hidden="true"></div>

                  <div class="location-card__bottom">
                    <div class="location-card__info">
                      <div class="location-card__info-block">
                        <p class="location-card__info-label">營業時間</p>
                        <p class="location-card__info-value">週一至週五 14:00 - 21:00，週六日公休</p>
                      </div>
                      <div class="location-card__info-block">
                        <p class="location-card__info-label">電話</p>
                        <p class="location-card__info-value">
                          <a :href="`tel:${location.tel}`" class="detail-tel-link" @click.stop>{{ location.tel }}</a>
                        </p>
                      </div>
                    </div>
                    <div class="location-card__more">
                      <button class="btn btn--primary" @click.stop="goToRegion(location.region, location.id)"
                        :aria-label="`查看 ${location.name} 更多資訊`">更多資訊</button>
                    </div>
                  </div>

                </div>
              </div>
            </article>
          </div>

          <!-- 手機 Swiper（< 768px） -->
          <div v-else class="swiper locations-swiper" aria-label="服務據點清單">
            <div class="swiper-wrapper">
              <div v-for="location in filteredLocations" :key="location.id" class="swiper-slide">
                <article class="location-card location-card--clickable" role="listitem"
                  @click="goToRegion(location.region, location.id)">
                  <div class="location-card__summary">
                    <div class="location-card__img-wrap">
                      <img :src="location.image" :alt="location.name" class="location-card__img" loading="lazy"
                        width="207" height="207" @error="(e) => e.target.src = lostImg" />
                    </div>
                    <div class="location-card__content">
                      <h2 class="location-card__name">{{ location.name }}</h2>
                      <div class="location-card__title-line" aria-hidden="true"></div>

                      <div class="location-card__bottom">
                        <div class="location-card__info">
                          <div class="location-card__info-block">
                            <p class="location-card__info-label">營業時間</p>
                            <p class="location-card__info-value">週一至週五 14:00 - 21:00，週六日公休</p>
                          </div>
                          <div class="location-card__info-block">
                            <p class="location-card__info-label">電話</p>
                            <p class="location-card__info-value">
                              <a :href="`tel:${location.tel}`" class="detail-tel-link" @click.stop>{{ location.tel
                              }}</a>
                            </p>
                          </div>
                        </div>
                        <div class="location-card__more">
                          <button class="btn btn--primary" @click.stop="goToRegion(location.region, location.id)"
                            :aria-label="`查看 ${location.name} 更多資訊`">更多資訊</button>
                        </div>
                      </div>

                    </div>
                  </div>
                </article>
              </div>
            </div>
            <div class="swiper-pagination"></div>
          </div>

        </template>

        <!-- ── 詳情模式 ── -->
        <div v-else class="locations-list" role="list" aria-label="服務據點清單">
          <article v-for="location in filteredLocations" :key="location.id" class="location-card" role="listitem">
            <div :id="`detail-${location.id}`" class="location-card__detail" role="region"
              :aria-label="`${location.name} 詳細資訊`">
              <div class="detail-body">
                <div class="detail-body__left">

                  <div class="detail-right">
                    <div class="detail-right__title-group">
                      <h2 class="detail-right__name">
                        {{ location.region === '校本部' ? '校本部' : location.name }}
                      </h2>
                      <div class="detail-right__line" aria-hidden="true"></div>
                    </div>

                    <div class="detail-right__img-wrapper">
                      <img :src="location.image" :alt="`${location.name} 場地照片`" class="detail-body__img"
                        @error="(e) => e.target.src = lostImg" />
                      <div class="detail-cta">
                        <a :href="location.mapUrl" target="_blank" rel="noopener noreferrer"
                          class="btn btn--primary">開啟地圖</a>
                      </div>
                    </div>
                  </div>


                  <div class="detail-alert" role="note">
                    <p class="detail-alert__text">本分部僅提供行政諮詢與報名繳費服務。各課程之實際授課地點，請以課程總表或開課通知簡訊為準。</p>
                  </div>

                  <div v-if="location.alert" class="detail-alert" role="alert" aria-live="polite">
                    <span class="detail-alert__icon" aria-hidden="true">⚠</span>
                    <p class="detail-alert__text">{{ location.alert }}</p>
                  </div>

                  <div class="detail-info">
                    <div class="detail-info__block">
                      <p class="detail-info__label">營業時間</p>
                      <p class="detail-info__value">週一至週五 14:00 - 21:00，週六日公休</p>
                    </div>
                    <div class="detail-info__block">
                      <p class="detail-info__label">地址</p>
                      <p class="detail-info__value">{{ location.description }}</p>
                    </div>
                    <div class="detail-info__block">
                      <p class="detail-info__label">電話</p>
                      <p class="detail-info__value">
                        <a :href="`tel:${location.tel}`" class="detail-tel-link" :aria-label="`撥打電話 ${location.tel}`">{{
                          location.tel }}</a>
                      </p>
                    </div>
                    <div class="detail-info__block">
                      <p class="detail-info__label">交通方式</p>
                      <p class="detail-info__value detail-info__value--traffic">
                        <CarOutlined /><span>公車：可搭乘多路公車至「北屯國小」或「監理站」下車步行抵達</span>
                      </p>
                      <p class="detail-info__value detail-info__value--traffic">
                        <AimOutlined /><span>捷運：搭乘台中捷運至「松竹站」或「太原站」下車，轉乘YouBike前往</span>
                      </p>
                    </div>
                    <div class="detail-info__block">
                      <p class="detail-info__label">附近停車資訊</p>
                      <p class="detail-info__value detail-info__value--traffic">
                        <EnvironmentOutlined /><span>北屯停車場：臺中市北屯區平德里河北路二段3號旁（步行約10分鐘）</span>
                      </p>
                      <p class="detail-info__value detail-info__value--traffic">
                        <EnvironmentOutlined /><span>日月停車場 Eclipse Parking：臺中市北屯區松茂里柳陽西街188-1號旁（步行約10分鐘）</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>

      </div>
    </section>
  </main>
</template>

<style scoped>
/* ── Page ── */
.locations-page {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
}

/* ── Banner ── */
.banner {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
}

/* ── Container ── */
.container {
  position: relative;
  display: block;
  width: 100%;
  max-width: 1300px;
  margin-inline: auto;
  box-sizing: border-box;
}

@media (max-width: 1100px) {
  .container {
    padding-inline: 40px;
  }
}

@media (max-width: 768px) {
  .container {
    padding-inline: 24px;
  }
}

@media (max-width: 576px) {
  .container {
    padding-inline: 16px;
  }
}

/* ── Locations section ── */
.locations-section {
  width: 100%;
  padding: 80px 0;
}

@media (max-width: 1200px) {
  .locations-section {
    padding: 40px 0;
  }
}

/* ── Section header ── */
.section-header {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.section-header__title-group {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.section-header__h1 {
  font-family: 'Noto Sans TC', sans-serif;
  font-weight: 500;
  font-size: 4rem;
  line-height: 1.5;
  color: #1E4620;
  margin: 0;
}

.section-header__title-line {
  width: 100%;
  height: 3px;
  background-color: #1E4620;
  border-radius: 2px;
}

.section-header__subtitle {
  font-family: 'Noto Sans TC', sans-serif;
  font-weight: 400;
  font-size: 1.5rem;
  line-height: 1.5;
  color: #706F6F;
  margin: 0;
  text-align: justify;
}

/* ── Tag group ── */
.tag-group {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 16px;
  padding-block: 40px;
}

.tag {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 10px 16px;
  height: 51px;
  flex: 1 1 0;
  min-width: 0;
  background-color: #F9F6F0;
  border: 1px solid #1E4620;
  border-radius: 20px;
  font-family: 'Noto Sans TC', sans-serif;
  font-size: 1.25rem;
  font-weight: 500;
  color: #1E4620;
  cursor: pointer;
  white-space: nowrap;
  transition: background-color 0.18s, color 0.18s, border-color 0.18s;
}

.tag:not(.tag--active):hover {
  background-color: #938D6B;
  color: #F0E9E3;
  border-color: #938D6B;
}

.tag:focus-visible {
  outline: 3px solid #1E4620;
  outline-offset: 2px;
}

.tag--active {
  background-color: #1E4620;
  border-color: #938D6B;
  color: #F0E9E3;
}

/* ── Location list ── */
.locations-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-bottom: 40px;
}

/* ── Location card ── */
.location-card--clickable {
  cursor: pointer;
}

.location-card--clickable:hover {
  box-shadow: 0 4px 16px rgba(30, 70, 32, 0.12);
}

.location-card {
  background-color: #F9F6F0;
  border: 1px solid #000000;
  border-radius: 20px;
  box-sizing: border-box;
  overflow: hidden;
}

/* ── Summary row ── */
.location-card__summary {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 40px;
  padding: 24px;
  flex-wrap: nowrap;
  min-height: 207px;
}

/* ── Image wrap ── */
.location-card__img-wrap {
  flex: 0 0 auto;
  width: 207px;
  height: 207px;
  border-radius: 10px;
  overflow: hidden;
  background-color: #B1B0B0;
  align-self: center;
}

/* ── Detail image wrapper：始終保持 relative，確保 CTA 在各斷點都能絕對定位 ── */
.detail-right__img-wrapper {
 position: relative;
  width: 100%;
}

.location-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* ── Card content（右側） ── */
.location-card__content {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: flex-start;
  min-width: 0;
}

.location-card__name {
  font-family: 'Noto Sans TC', sans-serif;
  font-weight: 500;
  font-size: 2.25rem;
  line-height: 1.5;
  color: #1E4620;
  margin: 0;
}

.location-card__title-line {
  width: 100%;
  height: 3px;
  background-color: #1E4620;
  border-radius: 2px;
  margin-right: -24px;
  margin-bottom: 16px;
}

/* ── Card bottom（資訊 + 按鈕同列） ── */
.location-card__bottom {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
}

.location-card__info {
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1 1 auto;
  min-width: 0;
}

.location-card__info-block {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.location-card__info-label {
  font-family: 'Noto Sans TC', sans-serif;
  font-weight: 500;
  font-size: 1.5rem;
  line-height: 1.5;
  color: #3C3C3C;
  margin: 0;
}

.location-card__info-value {
  font-family: 'Noto Sans TC', sans-serif;
  font-weight: 400;
  font-size: 1.5rem;
  line-height: 1.5;
  color: #706F6F;
  margin: 0;
  text-align: justify;
}

.location-card__more {
  flex: 0 0 auto;
  align-self: flex-end;
}

/* ── Detail panel ── */
.location-card__detail {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 24px 24px 32px;
}

/* ── Alert ── */
.detail-alert {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 12px;
  border: 2px solid #6155F5;
  border-radius: 8px;
  background-color: #F9F6F0;
}

.detail-alert__icon {
  font-size: 1.5rem;
  flex-shrink: 0;
  color: #3C3C3C;
}

.detail-alert__text {
  font-family: 'Noto Sans TC', sans-serif;
  font-weight: 400;
  font-size: 1.5rem;
  line-height: 1.5;
  color: #6155F5;
  margin: 0;
  text-align: justify;
}

/* ── Detail body ── */
.detail-body {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.detail-body__left {
  flex: 0 0 auto;
  align-self: stretch;
  display: grid;
  grid-template-rows: auto auto 1fr;
  /* detail-right / alert / 剩餘 detail-info */
  align-items: start;
  gap: 24px;
  width: 100%;
}


.detail-body__img {
  width: 100%;
  height: auto;
  aspect-ratio: 912 / 512;
  max-height: 512px;
  object-fit: cover;
  border-radius: 20px;
  display: block;
}

.detail-right {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
  width: 100%;
}

.detail-right__title-group {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.detail-right__name {
  font-family: 'Noto Sans TC', sans-serif;
  font-weight: 500;
  font-size: 2.25rem;
  line-height: 1.5;
  color: #1E4620;
  margin: 0;
}

.detail-right__line {
  width: 100%;
  height: 3px;
  background-color: #1E4620;
  border-radius: 2px;
}

.detail-info {
  display: flex;
  flex-direction: column;
  gap: 40px;
  min-width: 0;
  text-align: justify;
}

.detail-info__block {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.detail-info__label {
  font-family: 'Noto Sans TC', sans-serif;
  font-weight: 500;
  font-size: 1.5rem;
  line-height: 1.5;
  color: #3C3C3C;
  margin: 0;
}

.detail-info__value {
  font-family: 'Noto Sans TC', sans-serif;
  font-weight: 400;
  font-size: 1.5rem;
  line-height: 1.5;
  color: #706F6F;
  margin: 0;
}

.detail-info__value--traffic {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.detail-info__value--traffic :deep(.anticon) {
  flex-shrink: 0;
  margin-top: 5px;
  color: #7d7d7d;
  font-size: 1.5rem;
}

/* ── CTA：始終絕對定位在圖片右下角，所有斷點通用 ── */
.detail-cta {
  position: absolute;
  bottom: 20px;
  right: 20px;
  z-index: 1;
}

.detail-tel-link {
  color: inherit;
  text-decoration: none;
}

.detail-tel-link:hover,
.detail-tel-link:focus {
  text-decoration: underline;
  color: #1E4620;
}

/* ── Buttons ── */
.btn {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 16px 20px;
  height: 54px;
  border-radius: 8px;
  font-family: 'Noto Sans TC', sans-serif;
  font-weight: 400;
  font-size: 1.25rem;
  text-decoration: none;
  cursor: pointer;
  border: none;
  transition: opacity 0.18s, transform 0.15s;
  white-space: nowrap;
}

.btn:hover {
  opacity: 0.82;
  transform: translateY(-1px);
}

.btn:focus-visible {
  outline: 3px solid #1E4620;
  outline-offset: 2px;
}

.btn--primary {
  background-color: #1E4620;
  color: #F9F6F0;
}

.btn--primary:hover {
  background-color: #938D6B;
  opacity: 1;
}

/* ── Swiper ── */
.locations-swiper {
  width: 100%;
  padding-bottom: 40px !important;
}

.locations-swiper .swiper-slide {
  height: auto;
}

.locations-swiper :deep(.swiper-pagination) {
  bottom: 8px;
}

.locations-swiper :deep(.swiper-pagination-bullet) {
  width: 10px;
  height: 10px;
  background-color: #D1C8C1;
  opacity: 1;
  transition: background-color 0.18s;
}

.locations-swiper :deep(.swiper-pagination-bullet-active) {
  background-color: #1E4620;
}

/* ════════════════════════════════════════
   RWD 斷點
   1300px / 950px / 768px / 576px / 390px
   ════════════════════════════════════════ */

@media (max-width: 1300px) {
  .section-header__h1 {
    font-size: 3.5rem;
  }

  .location-card__name {
    font-size: 2rem;
  }

  .detail-right__name {
    font-size: 2rem;
  }

  .tag-group {
    gap: 12px;
  }

  .tag {
    height: 48px;
    padding: 8px 12px;
  }
}

@media (max-width: 1100px) {
  .tag-group {
    flex-wrap: wrap;
    gap: 10px;
  }

  .tag {
    flex: 1 1 calc(50% - 5px);
    max-width: calc(50% - 5px);
    height: 48px;
    padding: 8px 12px;
  }
}

@media (max-width: 950px) {
  .section-header__h1 {
    font-size: 3.25rem;
  }
}

@media (max-width: 768px) {
  .section-header__h1 {
    font-size: 3rem;
  }

  .location-card__name {
    font-size: 1.75rem;
  }

  .detail-right__name {
    font-size: 1.75rem;
  }

  .location-card__summary {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
    min-height: unset;
  }

  .location-card__img-wrap {
    width: 100%;
    height: auto;
    aspect-ratio: 16 / 9;
  }

  .location-card__bottom {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
  }

  .location-card__more {
    align-self: flex-end;
  }

  .detail-body {
    flex-direction: column;
    align-items: stretch;
    gap: 24px;
  }

  .detail-body__left {
    flex: 0 0 auto;
    align-self: stretch;
    width: 100%;
    display: flex;
    flex-direction: column;
    grid-template-rows: unset;
  }

  .detail-body__img {
    width: 100%;
    height: auto;
    aspect-ratio: 16 / 9;
  }

  .detail-right {
    flex: 1 1 auto;
    align-self: stretch;
    gap: 24px;
  }

  .detail-info {
    gap: 24px;
  }
}

@media (max-width: 576px) {
  .location-card__detail {
    padding: 16px 16px 24px;
  }

  .location-card__summary {
    padding: 16px;
    gap: 12px;
  }

  .tag-group {
    gap: 8px;
    padding-block: 24px;
  }

  .tag {
    flex: 1 1 calc(50% - 4px);
    max-width: calc(50% - 4px);
    height: 48px;
    padding: 8px 12px;
  }

  .detail-right {
    gap: 16px;
  }

  .detail-info {
    gap: 16px;
  }

  .locations-list {
    gap: 16px;
    padding-bottom: 24px;
  }

  .btn {
    height: 44px;
    font-size: 1.25rem;
    padding: 16px 20px;
  }

  .location-card__bottom {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .location-card__more {
    align-self: flex-end;
  }

  /* 小螢幕下 CTA 縮小，確保不超出圖片邊界 */
  .detail-cta {
    bottom: 12px;
    right: 12px;
  }

  .detail-cta .btn {
    height: 38px;
    font-size: 1rem;
    padding: 10px 14px;
  }
}

@media (max-width: 390px) {
  .section-header__h1 {
    font-size: 2.5rem;
  }

  .tag-group {
    gap: 6px;
  }

  .tag {
    flex: 1 1 calc(50% - 3px);
    max-width: calc(50% - 3px);
    height: 48px;
    padding: 8px 10px;
  }

  /* 超小螢幕再縮一點 */
  .detail-cta {
    bottom: 8px;
    right: 8px;
  }

  .detail-cta .btn {
    height: 34px;
    font-size: 0.9rem;
    padding: 8px 12px;
  }
}

/* ── Accessibility ── */
@media (prefers-reduced-motion: reduce) {

  .btn,
  .tag {
    transition: none;
  }
}
</style>