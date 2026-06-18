<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { allLocations } from '@/data/location.js'
import PageHero from '@/components/PageHero.vue'
import Breadcrumb from '@/components/Breadcrumb.vue'

import Swiper from 'swiper'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const locationHeroImg = ref('https://picsum.photos/1920/336')

const BreadcrumbItems = [
  { text: '首頁', to: '/' },
  { text: '服務據點' },
]

// ── 特定 alias 對應徽章顏色 ──
// const aliasBadgeColors = {
//   '大德國中':     { bg: '#FFF3E0', text: '#E65100', border: '#FFCC80' },
//   '陳平國小':     { bg: '#F3E5F5', text: '#6A1B9A', border: '#CE93D8' },
//   '北屯會館':     { bg: '#FCE4EC', text: '#880E4F', border: '#F48FB1' },
//   '松竹國小':     { bg: '#E0F7FA', text: '#00695C', border: '#80DEEA' },
//   '仁美國小':     { bg: '#FFFDE7', text: '#F57F17', border: '#FFF176' },
// }

// function getBadgeStyle(alias) {
//   const c = aliasBadgeColors[alias]
//   if (!c) return null
//   return {
//     backgroundColor: c.bg,
//     color: c.text,
//     border: `1px solid ${c.border}`,
//   }
// }

const tags = [
  { label: '全部',   value: 'all' },
  { label: '北屯本部', value: '北屯本部' },
  { label: '松竹分部', value: '松竹分部' },
  { label: '東山分部', value: '東山分部' },
  { label: '大德分部', value: '大德分部' },
  { label: '陳平分部', value: '陳平分部' },
  { label: '仁美分部', value: '仁美分部' },
  { label: '文昌分部', value: '文昌分部' },
]

const activeTag = ref('all')
function setActiveTag(v) { activeTag.value = v }

function goToRegion(region) {
  if (region && activeTag.value === 'all') {
    activeTag.value = region
  }
}

const showDetail = computed(() => activeTag.value !== 'all')

const filteredLocations = computed(() =>
  activeTag.value === 'all'
    ? allLocations
    : allLocations.filter(loc => loc.region === activeTag.value)
)

// ── Swiper（< 576px，全部模式 & 詳情模式都用）──
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
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  })
}

function destroySwiper() {
  if (swiperInstance) {
    swiperInstance.destroy(true, true)
    swiperInstance = null
  }
}

// 視窗寬度監聽
const isMobile = ref(false)
function checkMobile() {
  isMobile.value = window.innerWidth < 576
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})
onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
  destroySwiper()
})

// < 576px 時，不管全部或詳情模式都初始化 Swiper
watch([isMobile, activeTag, filteredLocations], async ([mobile]) => {
  if (mobile) {
    await nextTick()
    initSwiper()
  } else {
    destroySwiper()
  }
}, { immediate: true })
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
          </div>
          <p v-if="!showDetail" class="section-header__subtitle">
            臺中市北屯（原大墩）社區大學開辦於民國九十一年六月，近期每年修習學員人次皆超過一萬多人次。臺中市政府自開辦社大以來，由四家開放至六家承辦單位，台中YMCA憑藉良好辦學經驗及成果，至今通過市府多次招標審核、獲選承辦大墩社大。
          </p>
        </header>

        <!-- Filter tags -->
        <div class="tag-group" role="group" aria-label="篩選服務據點分類">
          <button
            v-for="tag in tags"
            :key="tag.value"
            class="tag"
            :class="{ 'tag--active': activeTag === tag.value }"
            :aria-pressed="activeTag === tag.value"
            @click="setActiveTag(tag.value)"
          >
            {{ tag.label }}
          </button>
        </div>

        <!-- ── 全部模式：桌機列表 / 手機 Swiper ── -->
        <template v-if="!showDetail">

          <!-- 桌機：一般列表（≥ 576px） -->
          <div
            v-if="!isMobile"
            class="locations-list"
            role="list"
            aria-label="服務據點清單"
          >
            <article
              v-for="location in filteredLocations"
              :key="location.id"
              class="location-card"
              role="listitem"
            >
              <div
                class="location-card__summary location-card__summary--clickable"
                role="button"
                tabindex="0"
                :aria-label="`前往 ${location.name} 詳細資訊`"
                @click="goToRegion(location.region)"
                @keydown.enter.prevent="goToRegion(location.region)"
                @keydown.space.prevent="goToRegion(location.region)"
              >
                <div class="location-card__img-wrap">
                  <img
                    :src="location.image"
                    :alt="`${location.name}${location.alias ? ' ' + location.alias : ''}`"
                    class="location-card__img"
                    loading="lazy"
                    width="207"
                    height="207"
                  />
                </div>
                <div class="location-card__title-group">
                  <div class="location-card__name-row">
                    <h2 class="location-card__name">{{ location.name }}</h2>
                    <!-- <span
                      v-if="location.alias && getBadgeStyle(location.alias)"
                      class="location-card__badge"
                      :style="getBadgeStyle(location.alias)"
                      :aria-label="`場地：${location.alias}`"
                    >{{ location.alias }}</span>
                    <span v-else-if="location.alias" class="location-card__alias">{{ location.alias }}</span> -->
                  </div>
                  <div class="location-card__title-line" aria-hidden="true"></div>
                </div>
              </div>
            </article>
          </div>

          <!-- 手機：Swiper（< 576px） -->
          <div v-else class="swiper locations-swiper" aria-label="服務據點清單">
            <div class="swiper-wrapper">
              <div
                v-for="location in filteredLocations"
                :key="location.id"
                class="swiper-slide"
              >
                <article
                  class="location-card"
                  role="listitem"
                >
                  <div
                    class="location-card__summary location-card__summary--clickable"
                    role="button"
                    tabindex="0"
                    :aria-label="`前往 ${location.name} 詳細資訊`"
                    @click="goToRegion(location.region)"
                    @keydown.enter.prevent="goToRegion(location.region)"
                    @keydown.space.prevent="goToRegion(location.region)"
                  >
                    <div class="location-card__img-wrap">
                      <img
                        :src="location.image"
                        :alt="`${location.name}${location.alias ? ' ' + location.alias : ''}`"
                        class="location-card__img"
                        loading="lazy"
                        width="207"
                        height="207"
                      />
                    </div>
                    <div class="location-card__title-group">
                      <div class="location-card__name-row">
                        <h2 class="location-card__name">{{ location.name }}</h2>
                        <span
                          v-if="location.alias && getBadgeStyle(location.alias)"
                          class="location-card__badge"
                          :style="getBadgeStyle(location.alias)"
                          :aria-label="`場地：${location.alias}`"
                        >{{ location.alias }}</span>
                        <span v-else-if="location.alias" class="location-card__alias">{{ location.alias }}</span>
                      </div>
                      <div class="location-card__title-line" aria-hidden="true"></div>
                    </div>
                  </div>
                </article>
              </div>
            </div>
            <!-- Swiper pagination dots -->
            <div class="swiper-pagination"></div>
          </div>

        </template>

        <!-- ── 詳情模式 ── -->
        <div
          v-else
          class="locations-list"
          role="list"
          aria-label="服務據點清單"
        >
          <article
            v-for="location in filteredLocations"
            :key="location.id"
            class="location-card"
            role="listitem"
          >
            <!-- 詳情區塊：整張卡片內容 -->
            <div
              :id="`detail-${location.id}`"
              class="location-card__detail"
              role="region"
              :aria-label="`${location.name} 詳細資訊`"
            >
              <!-- Body：左側圖片 + 右側（標題+線+警語+資訊） -->
              <div class="detail-body">
                <!-- 左：圖片 + 地圖按鈕，垂直置中 -->
                <div class="detail-body__left">
                  <img
                    :src="location.image"
                    :alt="`${location.name} 場地照片`"
                    class="detail-body__img"
                  />
                  <div class="detail-cta">
                    <a
                      :href="location.mapUrl"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="btn btn--gray"
                    >
                      查看地圖
                    </a>
                  </div>
                </div>

                <!-- 右：標題 + 線 + 警語 + 資訊（全部左對齊） -->
                <div class="detail-right">
                  <!-- 標題 + 線 -->
                  <div class="detail-right__title-group">
                    <h2 class="detail-right__name">{{ location.name }}</h2>
                    <div class="detail-right__line" aria-hidden="true"></div>
                  </div>

                  <!-- 固定警語 -->
                  <div class="detail-alert detail-alert--fixed" role="note">
                    <p class="detail-alert__text">本分部僅提供行政諮詢與報名繳費服務。各課程之實際授課地點，請以課程總表或開課通知簡訊為準。</p>
                  </div>

                  <!-- 動態 Alert（location.alert 有值才顯示） -->
                  <div
                    v-if="location.alert"
                    class="detail-alert"
                    role="alert"
                    aria-live="polite"
                  >
                    <span class="detail-alert__icon" aria-hidden="true">⚠</span>
                    <p class="detail-alert__text">{{ location.alert }}</p>
                  </div>

                  <!-- 資訊區塊 -->
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
                        <a
                          :href="`tel:${location.tel}`"
                          class="detail-tel-link"
                          :aria-label="`撥打電話 ${location.tel}`"
                        >{{ location.tel }}</a>
                      </p>
                    </div>

                    <div class="detail-info__block">
                      <p class="detail-info__label">交通方式</p>
                      <p class="detail-info__value">公車：可搭乘多路公車至「北屯國小」或「監理站」下車步行抵達</p>
                      <p class="detail-info__value">捷運：搭乘台中捷運至「松竹站」或「太原站」下車，轉乘YouBike前往</p>
                    </div>

                    <div class="detail-info__block">
                      <p class="detail-info__label">附近停車資訊</p>
                      <p class="detail-info__value">北屯停車場：臺中市北屯區平德里河北路二段3號旁（步行約10分鐘）</p>
                      <p class="detail-info__value">日月停車場 Eclipse Parking：臺中市北屯區松茂里柳陽西街188-1號旁（步行約10分鐘）</p>
                    </div>
                  </div>

                  <div class="detail-info__block">
                    <p class="detail-info__label">附近停車資訊</p>
                    <p class="detail-info__value">北屯停車場：臺中市北屯區平德里河北路二段3號旁（步行約10分鐘）</p>
                    <p class="detail-info__value">日月停車場 Eclipse Parking：臺中市北屯區松茂里柳陽西街188-1號旁（步行約10分鐘）</p>
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
/* ── CSS custom properties ── */
.locations-page {
  --c-primary:    #1E4620;
  --c-primary-bg: #F0E9E3;
  --c-gray-0:     #F9F6F0;
  --c-gray-2:     #B1B0B0;
  --c-gray-3:     #7D7D7D;
  --c-gray-4:     #706F6F;
  --c-gray-5:     #3C3C3C;
  --c-white:      #FFFFFF;
  --c-border:     #000000;
  --c-tag-border: #938D6B;
  --f-noto:       'Noto Sans TC', sans-serif;
  --f-inter:      'Inter', sans-serif;

  display: flex;
  flex-direction: column;
  background-color: var(--c-gray-0);
  min-height: 100vh;
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
  box-sizing: border-box;
  width: 100%;
  max-width: 1300px;
  margin-inline: auto;
  /* 預設 > 1400px：無 padding，靠 max-width + margin auto 置中 */
}

@media (max-width: 1400px) {
  .container { padding-inline: 80px; }
}
@media (max-width: 1100px) {
  .container { padding-inline: 40px; }
}
@media (max-width: 768px) {
  .container { padding-inline: 20px; }
}

/* ── Locations section ── */
.locations-section {
  padding-block: clamp(32px, 4vw, 80px);
}

/* ── Section header ── */
.section-header {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.section-header__title-group {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}

.section-header__h1 {
  font-family: var(--f-noto);
  font-weight: 500;
  font-size: clamp(2rem, 4vw, 4rem);
  line-height: 1.2;
  color: var(--c-gray-5);
  margin: 0;
}



.section-header__subtitle {
  font-family: var(--f-inter);
  font-weight: 400;
  font-size: clamp(1rem, 1.4vw, 1.5rem);
  line-height: 1.7;
  color: #000;
  margin: 0;
}

/* ── Tag group ── */
.tag-group {
  display: flex;
  flex-wrap: wrap;
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
  min-width: 96px;
  background-color: var(--c-white);
  border: 1px solid var(--c-gray-5);
  border-radius: 20px;
  font-family: var(--f-noto);
  font-size: 1rem;
  color: var(--c-gray-5);
  cursor: pointer;
  white-space: nowrap;
  transition: background-color 0.18s, color 0.18s, border-color 0.18s;
}

.tag:hover {
  background-color: var(--c-gray-5);
  color: var(--c-primary-bg);
  border-color: var(--c-tag-border);
}

.tag:focus-visible {
  outline: 3px solid var(--c-primary);
  outline-offset: 2px;
}

.tag--active {
  background-color: var(--c-gray-5);
  border-color: var(--c-tag-border);
  color: var(--c-primary-bg);
}

/* ── Location list ── */
.locations-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-bottom: 40px;
}

/* ── Location card ── */
.location-card {
  background-color: var(--c-white);
  border: 1px solid var(--c-border);
  border-radius: 20px;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* ── Summary row ── */
.location-card__summary {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 40px;
  padding: 24px;
  flex-wrap: wrap;
}

.location-card__summary--clickable {
  cursor: pointer;
  transition: background-color 0.18s;
  border-radius: 20px;
}

.location-card__summary--clickable:hover  { background-color: #F5F5F5; }

.location-card__summary--clickable:focus-visible {
  outline: 3px solid var(--c-primary);
  outline-offset: -3px;
  border-radius: 20px;
}

/* Image */
.location-card__img-wrap {
  flex: 0 0 auto;
  width: clamp(100px, 14vw, 207px);
  height: clamp(100px, 14vw, 207px);
  border-radius: 10px;
  overflow: hidden;
  background-color: var(--c-gray-2);
}

.location-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Title group */
.location-card__title-group {
  flex: 1 1 240px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
}

.location-card__name-row {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  /* gap: 12px; */
  flex-wrap: wrap;
}

.location-card__name {
  font-family: var(--f-noto);
  font-weight: 500;
  font-size: clamp(1.25rem, 2vw, 2.25rem);
  line-height: 1.2;
  color: var(--c-gray-5);
  margin: 0;
}

.location-card__badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 16px;
  font-family: var(--f-noto);
  font-weight: 500;
  font-size: 0.875rem;
  white-space: nowrap;
  line-height: 1.4;
}

.location-card__alias {
  font-family: var(--f-noto);
  font-weight: 400;
  font-size: clamp(1rem, 1.2vw, 1.25rem);
  color: var(--c-gray-3);
  white-space: nowrap;
}

.location-card__title-line {
  width: 100%;
  height: 3px;
  background-color: var(--c-primary);
  border-radius: 2px;
}

/* ── Detail panel ── */
.location-card__detail {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px 24px 32px;  /* 頂部也有 padding，因為標題現在在 detail 內 */
}

/* ── Alert ── */
.detail-alert {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 12px;
  border: 2px solid #000002;
  border-radius: 8px;
  background-color: var(--c-white);
}

.detail-alert__icon {
  font-size: 1.125rem;
  flex-shrink: 0;
  color: var(--c-gray-5);
}

.detail-alert__text {
  font-family: var(--f-noto);
  font-weight: 400;
  font-size: 1.125rem;
  line-height: 1.4;
  color: #000;
  margin: 0;
}

/* ── Detail body ── */
.detail-body {
  display: flex;
  flex-direction: row;
  align-items: center;   /* 左側圖片與右側內容垂直置中對齊 */
  gap: 40px;             /* 圖片與文字之間 40px */
}

/* 左：圖片 + 查看地圖按鈕，垂直置中 */
.detail-body__left {
  flex: 0 0 207px;
  align-self: center;    /* 確保左欄垂直置中 */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.detail-body__img {
  width: 207px;
  height: 207px;
  object-fit: cover;
  border-radius: 10px;
  display: block;
}

/* 右：標題 + 線 + 警語 + 資訊，全部左對齊 */
.detail-right {
  flex: 1 1 320px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  min-width: 0;
  align-self: stretch;   /* 右欄撐滿高度，讓左欄能置中 */
}

/* 右欄：標題 + 線 */
.detail-right__title-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.detail-right__name {
  font-family: var(--f-noto);
  font-weight: 500;
  font-size: clamp(1.25rem, 2vw, 2.25rem);
  line-height: 1.2;
  color: var(--c-gray-5);
  margin: 0;
}

.detail-right__line {
  width: 100%;
  height: 3px;
  background-color: var(--c-primary);
  border-radius: 2px;
}

/* 右欄：資訊區塊 */
.detail-info {
  display: flex;
  flex-direction: column;
  gap: 40px;
  min-width: 0;
}

.detail-info__block {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.detail-info__label {
  font-family: var(--f-inter);
  font-weight: 500;
  font-size: clamp(1rem, 1.2vw, 1.5rem);
  line-height: 1.4;
  color: #000;
  margin: 0;
}

.detail-info__value {
  font-family: var(--f-inter);
  font-weight: 400;
  font-size: clamp(1rem, 1.1vw, 1.5rem);
  line-height: 1.4;
  color: #000;
  margin: 0;
}

.detail-cta {
  width: 100%;
  display: flex;
  justify-content: center;
}

.detail-tel-link {
  color: inherit;
  text-decoration: none;
}

.detail-tel-link:hover,
.detail-tel-link:focus {
  text-decoration: underline;
  color: var(--c-primary);
}

/* ── Button ── */
.btn {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  min-width: 104px;
  height: 54px;
  border-radius: 8px;
  font-family: var(--f-noto);
  font-weight: 400;
  font-size: 1.125rem;
  text-decoration: none;
  cursor: pointer;
  border: none;
  transition: opacity 0.18s, transform 0.15s;
  white-space: nowrap;
}

.btn:hover         { opacity: 0.82; transform: translateY(-1px); }
.btn:focus-visible { outline: 3px solid var(--c-primary); outline-offset: 2px; }
.btn--gray         { background-color: var(--c-gray-4); color: var(--c-gray-0); }

/* ──────────────────────────────────────────
   RWD：詳情模式 detail-body 換行
   ────────────────────────────────────────── */

/* ≤ 768px：圖片 + 右欄改為垂直排列 */
@media (max-width: 768px) {
  .detail-body {
    flex-direction: column;
    align-items: stretch;
    gap: 24px;
  }

  .detail-body__left {
    flex: 0 0 auto;
    align-self: center;
    width: auto;
  }

  .detail-body__img {
    width: min(207px, 100%);
    height: auto;
    aspect-ratio: 1;
  }

  .detail-right {
    flex: 1 1 auto;
    align-self: stretch;
  }
}

/* ≤ 576px：detail padding 縮小 */
@media (max-width: 576px) {
  .location-card__detail {
    padding: 16px 16px 24px;
  }

  .location-card__summary {
    padding: 16px;
    gap: 16px;
  }

  .tag-group {
    gap: 8px;
    padding-block: 24px;
  }

  .tag {
    padding: 8px 12px;
    height: 40px;
    min-width: 80px;
    font-size: 0.875rem;
  }
}

/* ──────────────────────────────────────────
   Swiper（< 576px 全部模式）
   ────────────────────────────────────────── */
.locations-swiper {
  width: 100%;
  padding-bottom: 40px !important; /* 讓分頁點有空間 */
}

.locations-swiper .swiper-slide {
  height: auto;
}

/* Swiper pagination dots 樣式 */
.locations-swiper :deep(.swiper-pagination) {
  bottom: 8px;
}

.locations-swiper :deep(.swiper-pagination-bullet) {
  width: 10px;
  height: 10px;
  background-color: var(--c-gray-2);
  opacity: 1;
  transition: background-color 0.18s;
}

.locations-swiper :deep(.swiper-pagination-bullet-active) {
  background-color: var(--c-gray-5);
}

/* ── Reduced motion ── */
@media (prefers-reduced-motion: reduce) {
  .btn, .tag { transition: none; }
}
</style>
