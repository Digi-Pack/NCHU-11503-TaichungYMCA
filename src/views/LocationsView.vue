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




// 特定 alias 對應徽章顏色
const aliasBadgeColors = {
  '東光活動中心': { bg: '#E8F4FD', text: '#1565C0', border: '#90CAF9' },
  '大德國中': { bg: '#FFF3E0', text: '#E65100', border: '#FFCC80' },
  '陳平國小': { bg: '#F3E5F5', text: '#6A1B9A', border: '#CE93D8' },
  '文昌國小': { bg: '#E8F5E9', text: '#2E7D32', border: '#A5D6A7' },
  '北屯會館': { bg: '#FCE4EC', text: '#880E4F', border: '#F48FB1' },
  '松竹國小': { bg: '#E0F7FA', text: '#00695C', border: '#80DEEA' },
  '仁美國小': { bg: '#FFFDE7', text: '#F57F17', border: '#FFF176' },
  '東山高中': { bg: '#E5E1FC', text: '#20107E', border: '#B39DDB' },
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
  { label: '全部', value: 'all' },
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
          <div class="section-header__title-row">
            <div class="section-header__title-group">
              <h1 id="locations-title" class="section-header__h1">服務據點</h1>
              <div class="section-header__underline" aria-hidden="true"></div>
            </div>
          </div>
          <p class="section-header__subtitle">
            臺中市北屯（原大墩）社區大學開辦於民國九十一年六月，近期每年修習學員人次皆超過一萬多人次。臺中市政府自開辦社大以來，由四家開放至六家承辦單位，台中YMCA憑藉良好辦學經驗及成果，至今通過市府多次招標審核、獲選承辦大墩社大。
          </p>
        </header>

        <!-- Filter tags -->
        <div class="tag-group" role="group" aria-label="篩選服務據點分類">
          <button v-for="tag in tags" :key="tag.value" class="tag" :class="{ 'tag--active': activeTag === tag.value }"
            :aria-pressed="activeTag === tag.value" @click="setActiveTag(tag.value)">
            {{ tag.label }}
          </button>
        </div>

        <!-- Locations list -->
        <div class="locations-list" role="list" aria-label="服務據點清單">
          <article v-for="location in filteredLocations" :key="location.id" class="location-card" role="listitem">
            <div class="location-card__body">

              <!-- Image -->
              <div class="location-card__img-wrap">
                <img :src="location.image" :alt="`${location.name} ${location.alias}`" class="location-card__img"
                  loading="lazy" width="207" height="207" />
              </div>

              <!-- Info -->
              <div class="location-card__content">
                <div class="location-card__title-group">
                  <div class="location-card__name-row">
                    <h2 class="location-card__name">{{ location.name }}</h2>
                    <!-- 有顏色徽章：東光活動中心 / 大德國中 / 陳平國小 -->
                    <span v-if="location.alias && getBadgeStyle(location.alias)" class="location-card__badge"
                      :style="getBadgeStyle(location.alias)" aria-label="`場地：${location.alias}`">{{ location.alias
                      }}</span>
                    <!-- 一般 alias（無特定顏色） -->
                    <span v-else-if="location.alias" class="location-card__alias">{{ location.alias }}</span>
                  </div>
                  <div class="location-card__title-line" aria-hidden="true"></div>
                </div>

                <div class="location-card__details">
                  <div class="location-card__info-group">

                    <div class="location-card__info-block">
                      <p class="location-card__info-label">營業時間</p>
                      <p class="location-card__info-value">週一至週五 14:00 - 21:00，週六日公休</p>
                    </div>

                    <div class="location-card__info-block">
                      <p class="location-card__info-label">地址</p>
                      <p class="location-card__info-value">{{ location.description }}</p>
                    </div>

                    <div class="location-card__info-block">
                      <p class="location-card__info-label">電話</p>
                      <p class="location-card__info-value">
                        <a :href="`tel:${location.tel}`" class="location-card__tel-link">{{ location.tel }}</a>
                      </p>
                    </div>

                  </div>

                  <div class="location-card__more">
                    <a :href="location.mapUrl" target="_blank" rel="noopener noreferrer" class="btn btn--gray"
                      :aria-label="`查看 ${location.name} 地圖位置（開啟新視窗）`">
                      查看地圖
                    </a>
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
/* ── CSS custom properties (scoped to component root) ── */
.locations-page {
  --c-primary: #1E4620;
  --c-primary-bg: #F0E9E3;
  --c-gray-0: #F9F6F0;
  --c-gray-2: #B1B0B0;
  --c-gray-3: #7D7D7D;
  --c-gray-4: #706F6F;
  --c-gray-5: #3C3C3C;
  --c-white: #FFFFFF;
  --c-border: #000000;
  --c-tag-border: #938D6B;
  --f-noto: 'Noto Sans TC', sans-serif;
  --f-inter: 'Inter', sans-serif;

  display: flex;
  flex-direction: column;
  background: var(--c-gray-0);
  min-height: 100vh;
}

/* ── Banner ── */
.banner {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
}

.breadcrumb-nav {
  width: 1300px;
  max-width: 100%;
  margin-inline: auto;
  padding: 12px clamp(16px, 4vw, 40px);
  box-sizing: border-box;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 4px;
  list-style: none;
  margin: 0;
  padding: 12px 0;
}

.breadcrumb__item {
  font-family: var(--f-noto);
  font-size: 1rem;
  line-height: 19px;
}

.breadcrumb__separator {
  display: flex;
  align-items: center;
}

.breadcrumb__link {
  color: var(--c-gray-3);
  text-decoration: none;
}

.breadcrumb__link:hover,
.breadcrumb__link:focus {
  text-decoration: underline;
  color: var(--c-primary);
}

.breadcrumb__item--current {
  font-weight: 500;
  color: var(--c-primary);
}

/* ── Container: fixed 1300px centre column ── */
.container {
  max-width: 1300px; /* 限制最大寬度為 1300px */
  margin-inline: auto; /* 水平置中 */
  padding-inline: clamp(16px, 4vw, 40px);
  width: 100%; /* 確保在小螢幕時能自動縮放 */
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
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
  padding:40px 0;
}

.tag {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 10px 16px;
  height: 51px;
  min-width: 96px;
  background: var(--c-white);
  border: 1px solid var(--c-gray-5);
  border-radius: 20px;
  font-family: var(--f-noto);
  font-size: 1rem;
  color: var(--c-gray-5);
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.18s, color 0.18s, border-color 0.18s;
}

.tag:hover {
  background: var(--c-gray-5);
  color: var(--c-primary-bg);
  border-color: var(--c-tag-border);
}

.tag:focus-visible {
  outline: 3px solid var(--c-primary);
  outline-offset: 2px;
}

.tag--active {
  background: var(--c-gray-5);
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
  background: var(--c-white);
  border: 1px solid var(--c-border);
  border-radius: 20px;
  padding: 24px;
  box-sizing: border-box;
  display: flex;
}

.location-card__body {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 40px;
  flex-wrap: wrap;
}

/* Image */
.location-card__img-wrap {
  flex: 0 0 auto;
  width: clamp(100px, 14vw, 207px);
  height: clamp(100px, 14vw, 207px);
  border-radius: 10px;
  overflow: hidden;
  background: var(--c-gray-2);
}

.location-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Content area */
.location-card__content {
  flex: 1 1 320px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
}

/* Title */
.location-card__title-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
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
  background: var(--c-primary);
  border-radius: 2px;
}

/* Details row */
.location-card__details {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.location-card__info-group {
  flex: 1 1 240px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.location-card__info-block {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.location-card__info-label {
  font-family: var(--f-inter);
  font-weight: 500;
  font-size: clamp(1rem, 1.2vw, 1.5rem);
  line-height: 1.4;
  color: #000;
  margin: 0;
}

.location-card__info-value {
  font-family: var(--f-inter);
  font-weight: 400;
  font-size: clamp(1rem, 1.1vw, 1.5rem);
  line-height: 1.4;
  color: #000;
  margin: 0;
}

.location-card__tel-link {
  color: inherit;
  text-decoration: none;
}

.location-card__tel-link:hover,
.location-card__tel-link:focus {
  text-decoration: underline;
  color: var(--c-primary);
}

/* CTA */
.location-card__more {
  flex: 0 0 auto;
  align-self: flex-end;
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
  background: var(--c-gray-4);
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