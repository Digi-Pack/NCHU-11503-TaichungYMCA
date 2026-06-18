<script setup>
import { ref, computed } from 'vue'
import { allLocations } from '@/data/location.js'
import PageHero from '@/components/PageHero.vue'
import Breadcrumb from '@/components/Breadcrumb.vue'

const locationHeroImg = ref('https://picsum.photos/1920/336')

const BreadcrumbItems = [
  { text: '首頁', to: '/' },
  { text: '服務據點' },
]

// ── 特定 alias 對應徽章顏色（已移除東山高中顏色）──
const aliasBadgeColors = {
  '東光活動中心': { bg: '#E8F4FD', text: '#1565C0', border: '#90CAF9' },
  '大德國中':     { bg: '#FFF3E0', text: '#E65100', border: '#FFCC80' },
  '陳平國小':     { bg: '#F3E5F5', text: '#6A1B9A', border: '#CE93D8' },
  '文昌國小':     { bg: '#E8F5E9', text: '#2E7D32', border: '#A5D6A7' },
  '北屯會館':     { bg: '#FCE4EC', text: '#880E4F', border: '#F48FB1' },
  '松竹國小':     { bg: '#E0F7FA', text: '#00695C', border: '#80DEEA' },
  '仁美國小':     { bg: '#FFFDE7', text: '#F57F17', border: '#FFF176' },
}

function getBadgeStyle(alias) {
  const c = aliasBadgeColors[alias]
  if (!c) return null
  return {
    backgroundColor: c.bg,
    color: c.text,
    border: `1px solid ${c.border}`,
  }
}

const tags = [
  { label: '全部',    value: 'all'    },
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

// 從「全部」列表點擊卡片，跳至對應分部詳情頁
function goToRegion(region) {
  if (region && activeTag.value === 'all') {
    activeTag.value = region
  }
}

// 只有切換到特定分部時才顯示詳情
const showDetail = computed(() => activeTag.value !== 'all')

const filteredLocations = computed(() =>
  activeTag.value === 'all'
    ? allLocations
    : allLocations.filter(loc => loc.region === activeTag.value)
)
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
          <!-- <div class="section-header__title-row"> -->
            <div class="section-header__title-group">
              <h1 id="locations-title" class="section-header__h1">服務據點</h1>
              <!-- <div class="section-header__underline" aria-hidden="true"></div>
            </div> -->
          </div>
          <!-- 介紹文字：只有「全部」顯示 -->
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

        <!-- Locations list -->
        <div class="locations-list" role="list" aria-label="服務據點清單">
          <article
            v-for="location in filteredLocations"
            :key="location.id"
            class="location-card"
            role="listitem"
          >
            <!-- ── 摘要列（永遠顯示；全部模式下可點擊跳分部）── -->
            <div
              class="location-card__summary"
              :class="{ 'location-card__summary--clickable': !showDetail }"
              :role="!showDetail ? 'button' : undefined"
              :tabindex="!showDetail ? 0 : undefined"
              :aria-label="!showDetail ? `前往 ${location.name} 詳細資訊` : undefined"
              @click="goToRegion(location.region)"
              @keydown.enter.prevent="goToRegion(location.region)"
              @keydown.space.prevent="goToRegion(location.region)"
            >
              <!-- Image -->
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

              <!-- Title + badge -->
              <div class="location-card__title-group">
                <div class="location-card__name-row">
                  <h2 class="location-card__name">{{ location.name }}</h2>
                  <span
                    v-if="location.alias && getBadgeStyle(location.alias)"
                    class=""
                    :style="getBadgeStyle(location.alias)"
                    :aria-label="`場地：${location.alias}`"
                  ></span>
                  <span
                    v-else-if="location.alias"
                    class="location-card__alias"
                  >{{ location.alias }}</span>
                </div>
                <div class="location-card__title-line" aria-hidden="true"></div>
              </div>
            </div>

            <!-- ── 詳情區塊：切換到特定分部才顯示 ── -->
            <div
              v-if="showDetail"
              :id="`detail-${location.id}`"
              class="location-card__detail"
              role="region"
              :aria-label="`${location.name} 詳細資訊`"
            >
              <!-- Alert：若 location.alert 有值才顯示 -->
              <div
                v-if="location.alert"
                class="detail-alert"
                role="alert"
                aria-live="polite"
              >
                <span class="detail-alert__icon" aria-hidden="true">⚠</span>
                <p class="detail-alert__text">{{ location.alert }}</p>
              </div>

              <div class="detail-body">
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

                <!-- 查看地圖按鈕 -->
                <div class="detail-cta">
                  <a
                    :href="location.mapUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="btn btn--gray"
                    :aria-label="`查看 ${location.name} 地圖位置（開啟新視窗）`"
                  >
                    查看地圖
                  </a>
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
  --f-noto:  'Noto Sans TC', sans-serif;
  --f-inter: 'Inter', sans-serif;

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
  padding-inline: clamp(16px, 4vw, 40px);
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

.section-header__title-row {
  border-bottom: 3px solid var(--c-gray-5);
  padding-bottom: 8px;
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

/* ── Summary row（摘要，永遠顯示）── */
.location-card__summary {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 40px;
  padding: 24px;
  flex-wrap: wrap;
}

/* 全部模式下，卡片可點擊 */
.location-card__summary--clickable {
  cursor: pointer;
  transition: background-color 0.18s;
  border-radius: 20px;
}

.location-card__summary--clickable:hover {
  background-color: #F5F5F5;
}

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
  gap: 12px;
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
  padding: 0 24px 32px;
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
  align-items: flex-end;
  justify-content: space-between;
  gap: 40px;
  flex-wrap: wrap;
}

.detail-info {
  flex: 1 1 320px;
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
  flex: 0 0 auto;
  align-self: flex-end;
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

.btn:hover {
  opacity: 0.82;
  transform: translateY(-1px);
}

.btn:focus-visible {
  outline: 3px solid var(--c-primary);
  outline-offset: 2px;
}

.btn--gray {
  background-color: var(--c-gray-4);
  color: var(--c-gray-0);
}

/* ── Reduced motion ── */
@media (prefers-reduced-motion: reduce) {
  .btn,
  .tag {
    transition: none;
  }
}
</style>
