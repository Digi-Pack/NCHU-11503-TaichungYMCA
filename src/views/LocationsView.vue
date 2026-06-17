<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import PageHero from '@/components/PageHero.vue'
import Breadcrumb from '@/components/Breadcrumb.vue'
import { allLocations as initialLocations } from '@/data/location.js'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const heroBanner = ref('https://picsum.photos/1918/336')

const breadcrumbItems = [
  { text: '首頁', to: '/' },
  { text: '服務據點' },
]

const setMeta = (name, content, isProperty = false) => {
  const attr = isProperty ? 'property' : 'name'
  let el = document.querySelector(`meta[${attr}="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

const prevTitle = document.title

// ── 視窗寬度偵測（驅動所有 RWD，不用 media query）────────────
const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1280)
const updateWindowWidth = () => { windowWidth.value = window.innerWidth }

// 是否進入 Swiper 模式
const isMobileSwiper = computed(() => windowWidth.value < 576)

// section-container padding（取代 media query）
const containerPadding = computed(() => {
  const w = windowWidth.value
  if (w < 576)  return '0 16px'
  if (w < 768)  return '0 20px'
  if (w < 1100) return '0 40px'
  if (w < 1400) return '0 80px'
  return '0 158px'
})

// card-group grid columns（取代 media query）
const cardColumns = computed(() => {
  const w = windowWidth.value
  if (w < 1100) return 'repeat(2, 1fr)'
  return 'repeat(3, 1fr)'
})

// card-group gap（取代 media query）
const cardGap = computed(() => {
  const w = windowWidth.value
  if (w < 1100) return '32px'
  if (w < 1400) return '40px'
  return '64px'
})

// toolbar 方向（取代 media query）
const toolbarDirection = computed(() => windowWidth.value < 768 ? 'column' : 'row')
const toolbarAlign = computed(() => windowWidth.value < 768 ? 'flex-start' : 'center')

// section padding（取代 media query）
const sectionPadding = computed(() => windowWidth.value < 768 ? '32px 0 48px' : '60px 0 80px')

// section-title size
const titleSize = computed(() => {
  const w = windowWidth.value
  if (w < 576) return '2rem'
  return 'clamp(2rem, 4vw, 4rem)'
})

// list-img size
const listImgWidth = computed(() => windowWidth.value < 768 ? '120px' : '200px')
const listImgHeight = computed(() => windowWidth.value < 768 ? '90px' : '140px')

onMounted(() => {
  document.title = '服務據點 | 臺中市北屯社區大學'
  setMeta('description', '查詢臺中市北屯社區大學各服務據點資訊，包含地址、電話及交通方式。')
  setMeta('og:title', '服務據點 | 臺中市北屯社區大學', true)
  setMeta('og:description', '查詢臺中市北屯社區大學各服務據點資訊。', true)
  setMeta('og:type', 'website', true)
  updateWindowWidth()
  window.addEventListener('resize', updateWindowWidth)
})

onUnmounted(() => {
  document.title = prevTitle
  window.removeEventListener('resize', updateWindowWidth)
})

// ── 分部標籤 ─────────────────────────────────────────────
const branchTags = [
  { label: '全部', value: 'all' },
  { label: '北屯分部', value: '北屯分部' },
  { label: '松竹分部', value: '松竹分部' },
  { label: '東山分部', value: '東山分部' },
  { label: '大德分部', value: '大德分部' },
  { label: '陳平分部', value: '陳平分部' },
  { label: '仁美分部', value: '仁美分部' },
  { label: '文昌分部', value: '文昌分部' },
]

const activeTag = ref('all')
const viewMode = ref('grid')
const currentPage = ref(1)
const itemsPerPage = 6

const allLocations = ref(initialLocations)

const setTag = (tag) => {
  activeTag.value = tag
  currentPage.value = 1
}

const filteredLocations = computed(() => {
  if (activeTag.value === 'all') return allLocations.value
  return allLocations.value.filter((l) => l.region === activeTag.value)
})

const totalPages = computed(() => Math.ceil(filteredLocations.value.length / itemsPerPage))

const paginatedLocations = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredLocations.value.slice(start, start + itemsPerPage)
})

const changePage = (page) => {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const swiperModules = [Pagination]
</script>

<template>
  <main id="main-content">
    <Breadcrumb :items="breadcrumbItems" />
    <PageHero :image="heroBanner" />

    <section
      class="locations-section"
      aria-labelledby="locations-heading"
      :style="{ padding: sectionPadding }"
    >
      <div
        class="section-container"
        :style="{ padding: containerPadding }"
      >
        <div class="section-header">
          <h1
            id="locations-heading"
            class="section-title"
            :style="{ fontSize: titleSize }"
          >
            服務據點
          </h1>
        </div>

        <div
          class="toolbar"
          role="toolbar"
          aria-label="篩選與檢視工具列"
          :style="{
            flexDirection: toolbarDirection,
            alignItems: toolbarAlign,
          }"
        >
          <div class="tag-group" role="group" aria-label="地區篩選">
            <a-button
              v-for="tag in branchTags"
              :key="tag.value"
              shape="round"
              :aria-pressed="activeTag === tag.value"
              :style="activeTag === tag.value
                ? { background: '#3C3C3C', borderColor: '#938D6B', color: '#ffffff', fontSize: '1rem', height: '51px', minWidth: '120px' }
                : { background: '#ffffff', borderColor: '#3C3C3C', color: '#3C3C3C', fontSize: '1rem', height: '51px', minWidth: '120px' }"
              @click="setTag(tag.value)"
            >
              {{ tag.label }}
            </a-button>
          </div>
        </div>

        <!-- ══ Swiper 模式（< 576px）══════════════════════════ -->
        <template v-if="isMobileSwiper">
          <!--
            .swiper-host：固定用 100vw 撐滿視窗、左移到螢幕邊緣，
            避免父層 padding 造成的寬度錯誤與圖片溢出。
          -->
          <div class="swiper-host">
            <Swiper
              :modules="swiperModules"
              :slides-per-view="1"
              :space-between="16"
              :centered-slides="true"
              :pagination="{ clickable: true }"
              class="location-swiper"
              aria-label="服務據點滑動卡片"
            >
              <SwiperSlide
                v-for="location in filteredLocations"
                :key="location.id"
              >
                <article class="location-card">
                  <div class="card-img" aria-hidden="true">
                    <img
                      v-if="location.image"
                      :src="location.image"
                      :alt="location.name + '照片'"
                      loading="lazy"
                      width="491"
                      height="350"
                    />
                    <div v-else class="card-img-placeholder" aria-hidden="true"></div>
                  </div>
                  <div class="card-text">
                    <span class="card-region-tag">{{ location.region }}</span>
                    <h3 class="card-title">{{ location.alias }}</h3>
                    <p class="card-address">
                      <svg class="address-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {{ location.description }}
                    </p>
                    <a
                      :href="location.mapUrl"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="card-map-btn"
                      :aria-label="'查看' + location.alias + '地圖'"
                    >
                      查看地圖
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" aria-hidden="true"
                        style="vertical-align: middle; margin-left: 4px;">
                        <path d="M3 11l19-9-9 19-2-8-8-2z" />
                      </svg>
                    </a>
                  </div>
                </article>
              </SwiperSlide>
            </Swiper>
          </div>
        </template>

        <!-- ══ 一般模式（≥ 576px）══════════════════════════════ -->
        <template v-else>
          <!-- 卡片 Grid -->
          <div
            v-if="viewMode === 'grid'"
            class="card-group"
            role="list"
            aria-label="服務據點卡片列表"
            :style="{
              gridTemplateColumns: cardColumns,
              gap: cardGap,
            }"
          >
            <article
              v-for="location in paginatedLocations"
              :key="location.id"
              class="location-card"
              role="listitem"
            >
              <div class="card-img" aria-hidden="true">
                <img
                  v-if="location.image"
                  :src="location.image"
                  :alt="location.name + '照片'"
                  loading="lazy"
                  width="491"
                  height="350"
                />
                <div v-else class="card-img-placeholder" aria-hidden="true"></div>
              </div>
              <div class="card-text">
                <span class="card-region-tag">{{ location.region }}</span>
                <h3 class="card-title">{{ location.alias }}</h3>
                <p class="card-address">
                  <svg class="address-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {{ location.description }}
                </p>
                <a
                  :href="location.mapUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="card-map-btn"
                  :aria-label="'查看' + location.alias + '地圖'"
                >
                  查看地圖
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" aria-hidden="true"
                    style="vertical-align: middle; margin-left: 4px;">
                    <path d="M3 11l19-9-9 19-2-8-8-2z" />
                  </svg>
                </a>
              </div>
            </article>
          </div>

          <!-- 列表 List -->
          <div v-else class="list-group" role="list" aria-label="服務據點列表">
            <article
              v-for="location in paginatedLocations"
              :key="location.id"
              class="location-list-item"
              role="listitem"
            >
              <div
                class="list-img"
                aria-hidden="true"
                :style="{ width: listImgWidth, minWidth: listImgWidth, height: listImgHeight }"
              >
                <img
                  v-if="location.image"
                  :src="location.image"
                  :alt="location.name + '照片'"
                  loading="lazy"
                  width="200"
                  height="140"
                />
                <div v-else class="list-img-placeholder" aria-hidden="true"></div>
              </div>
              <div class="list-content">
                <span class="card-region-tag">{{ location.region }}</span>
                <h3 class="list-title">{{ location.alias }}</h3>
                <p class="card-address">
                  <svg class="address-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {{ location.description }}
                </p>
                <a
                  :href="location.mapUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="card-map-btn"
                  :aria-label="'查看' + location.alias + '地圖'"
                >
                  查看地圖
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" aria-hidden="true"
                    style="vertical-align: middle; margin-left: 4px;">
                    <path d="M3 11l19-9-9 19-2-8-8-2z" />
                  </svg>
                </a>
              </div>
            </article>
          </div>

          <!-- 分頁 -->
          <nav class="pagination" aria-label="頁碼導覽">
            <div class="pagination-pages">
              <button
                v-for="page in totalPages"
                :key="page"
                class="page-number"
                :class="{ active: currentPage === page }"
                :aria-label="`第 ${page} 頁`"
                :aria-current="currentPage === page ? 'page' : undefined"
                @click="changePage(page)"
              >
                {{ page }}
              </button>
            </div>
            <p class="pagination-info" aria-live="polite">Page {{ currentPage }} of {{ totalPages }}</p>
          </nav>
        </template>

      </div>
    </section>
  </main>
</template>

<style scoped>
/* ── 不含 RWD breakpoint 的 media query，全部改由 JS computed 控制 ── */

.locations-section {
  background: #fff;
  /* padding 由 :style 綁定 */
}

.section-container {
  max-width: 1616px;
  margin: 0 auto;
  /* padding 由 :style 綁定 */
}

.section-header {
  margin-bottom: 32px;
}

.section-title {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  line-height: 1.2;
  color: #000;
  margin: 0;
  /* font-size 由 :style 綁定 */
}

.toolbar {
  display: flex;
  gap: 16px;
  margin-bottom: 40px;
  flex-wrap: wrap;
  /* flex-direction / align-items 由 :style 綁定 */
}

.tag-group {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
}

/* ===== 卡片 Grid ===== */
.card-group {
  display: grid;
  /* grid-template-columns / gap 由 :style 綁定 */
  margin-bottom: 74px;
}

.location-card {
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
  transition: box-shadow 0.2s, transform 0.2s;
}

.location-card:hover {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.13);
  transform: translateY(-2px);
}

.card-img {
  width: 100%;
  aspect-ratio: 491 / 350;
  overflow: hidden;
  background: #e8e8e8;
  position: relative;
}

.card-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.card-img-placeholder {
  width: 100%;
  height: 100%;
  background: repeating-conic-gradient(#d8d8d8 0% 25%, #e8e8e8 0% 50%) 0 0 / 24px 24px;
}

.card-text {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px 24px 24px;
  background: #fff;
  border-radius: 0 0 20px 20px;
  flex: 1;
}

.card-region-tag {
  display: inline-block;
  font-family: 'Noto Sans TC', sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  color: #4a7c59;
  background: #eaf3ed;
  border-radius: 4px;
  padding: 2px 10px;
  width: fit-content;
}

.card-title {
  font-family: 'Inter', sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.3;
  color: #000;
  margin: 0;
}

.card-address {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  font-family: 'Noto Sans TC', sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  color: #757575;
  margin: 0;
}

.address-icon {
  flex-shrink: 0;
  margin-top: 3px;
  color: #757575;
}

.card-map-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: auto;
  padding: 12px 0;
  background: #2d5a3d;
  color: #fff;
  border-radius: 8px;
  font-family: 'Noto Sans TC', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  transition: background 0.2s;
}

.card-map-btn:hover {
  background: #1e4020;
}

.card-map-btn:focus-visible {
  outline: 2px solid #1E4620;
  outline-offset: 2px;
}

/* ===== 列表 List ===== */
.list-group {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 74px;
}

.location-list-item {
  display: flex;
  gap: 32px;
  border-radius: 16px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
  padding: 24px;
  align-items: flex-start;
  transition: box-shadow 0.2s;
}

.location-list-item:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}

.list-img {
  /* width / min-width / height 由 :style 綁定 */
  border-radius: 12px;
  overflow: hidden;
  background: #e8e8e8;
  flex-shrink: 0;
}

.list-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.list-img-placeholder {
  width: 100%;
  height: 100%;
  background: repeating-conic-gradient(#d8d8d8 0% 25%, #e8e8e8 0% 50%) 0 0 / 20px 20px;
  border-radius: 12px;
}

.list-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
}

.list-title {
  font-family: 'Inter', sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 29px;
  color: #000;
  margin: 0;
}

/* ===== 分頁 ===== */
.pagination {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 12px;
}

.pagination-pages {
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: flex-start;
}

.page-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  border-radius: 80px;
  border: 2px solid #3C3C3C;
  background: #fff;
  font-family: 'Noto Sans TC', sans-serif;
  font-size: 1.125rem;
  line-height: 22px;
  color: #3C3C3C;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.page-number:hover {
  background: #7D7D7D;
  color: #F9F6F0;
  border-color: #7D7D7D;
}

.page-number:focus-visible {
  outline: 2px solid #1E4620;
  outline-offset: 2px;
}

.page-number.active {
  background: #7D7D7D;
  border-color: #3C3C3C;
  color: #3C3C3C;
}

.pagination-info {
  font-family: 'Noto Sans TC', sans-serif;
  font-size: 1.5rem;
  line-height: 29px;
  color: #3C3C3C;
  margin: 0;
  white-space: nowrap;
  min-width: 160px;
  text-align: right;
}

/* ===== Swiper ===== */

/*
 * swiper-host：用 100vw 撐滿螢幕寬、以負 margin 抵消父層 padding，
 * 讓 Swiper 不受 section-container padding 影響，徹底解決圖片溢出。
 * overflow:hidden 截斷相鄰 slide 殘影。
 * padding-bottom 留給 pagination dots。
 */
.swiper-host {
  width: 100vw;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  overflow: hidden;
  padding-bottom: 52px;
  box-sizing: border-box;
}

.location-swiper {
  width: 100%;
  /* 左右各留 16px 讓卡片不貼螢幕邊 */
  padding-left: 16px !important;
  padding-right: 16px !important;
  box-sizing: border-box;
}

/* slide 高度 auto，讓卡片自然撐高 */
.location-swiper :deep(.swiper-slide) {
  height: auto;
}

/* swiper-slide 內的 article 撐滿高度 */
.location-swiper :deep(.swiper-slide) .location-card {
  height: 100%;
}

/* pagination dots 容器 */
.location-swiper :deep(.swiper-pagination) {
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 0 0;
}

/* 預設 dot */
.location-swiper :deep(.swiper-pagination-bullet) {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #C4C4C4;
  opacity: 1;
  flex-shrink: 0;
  transition: background 0.2s, transform 0.2s;
}

/* 目前頁 dot */
.location-swiper :deep(.swiper-pagination-bullet-active) {
  background: #2d5a3d;
  transform: scale(1.2);
}
</style>