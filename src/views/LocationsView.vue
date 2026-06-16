<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import PageHero from '@/components/PageHero.vue'
import Breadcrumb from '@/components/Breadcrumb.vue'
import { allLocations as initialLocations } from '@/data/location.js';

// Banner 圖片路徑，替換成實際圖片
const heroBanner = ref('https://picsum.photos/1918/336')

// 麵包屑
const breadcrumbItems = [
  { text: '首頁', to: '/' },
  { text: '服務據點' },
]

// SEO — 原生 DOM，不需安裝任何套件
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

onMounted(() => {
  document.title = '服務據點 | 臺中市北屯社區大學'
  setMeta('description', '查詢臺中市北屯社區大學各服務據點資訊，包含地址、電話及交通方式。')
  setMeta('og:title', '服務據點 | 臺中市北屯社區大學', true)
  setMeta('og:description', '查詢臺中市北屯社區大學各服務據點資訊。', true)
  setMeta('og:type', 'website', true)
})

// 離開頁面時還原標題（可選）
onUnmounted(() => {
  document.title = prevTitle
})

// Banner 圖片（替換成實際圖片路徑）

// 篩選標籤
const branchTags = [
  { label: '全部', value: 'all' },
  { label: '北屯會館', value: '北屯本部' },
  { label: '松竹分部', value: '松竹分部' },
  { label: '東山分部', value: '東山分部' },
  { label: '大德分部', value: '大德分部' },
  { label: '陳平分部', value: '陳平分部' },
  { label: '仁美分部', value: '仁美分部' },
];

const activeTag = ref('all')
const viewMode = ref('grid')
const currentPage = ref(1)
const itemsPerPage = 6

// 模擬資料
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
</script>

<template>
  <main id="main-content">
    <!-- 麵包屑 Breadcrumb -->
    <Breadcrumb :items="breadcrumbItems" />

    <!-- Banner 區塊 -->
    <PageHero :image="heroBanner" />

    <!-- 主內容 -->
    <section class="locations-section" aria-labelledby="locations-heading">
      <div class="section-container">
        <!-- 標題列 -->
        <div class="section-header">
          <h1 id="locations-heading" class="section-title">服務據點</h1>
        </div>

        <!-- 篩選標籤 + 檢視切換 -->
        <div class="toolbar" role="toolbar" aria-label="篩選與檢視工具列">
          <!-- Tag 篩選列 -->
          <div class="tag-group" role="group" aria-label="地區篩選">
            <a-button v-for="tag in branchTags" :key="tag.value" shape="round" :aria-pressed="activeTag === tag.value"
              :style="activeTag === tag.value
                ? { background: '#3C3C3C', borderColor: '#938D6B', color: '#ffffff', fontSize: '1rem', height: '51px', minWidth: '120px' }
                : { background: '#ffffff', borderColor: '#3C3C3C', color: '#3C3C3C', fontSize: '1rem', height: '51px', minWidth: '120px' }"
              @click="setTag(tag.value)">
              {{ tag.label }}
            </a-button>
          </div>
        </div>

        <!-- 卡片模式 -->
        <div v-if="viewMode === 'grid'" class="card-group" role="list" aria-label="服務據點卡片列表">
          <article v-for="location in paginatedLocations" :key="location.id" class="location-card" role="listitem">
            <div class="card-img" aria-hidden="true">
              <img v-if="location.image" :src="location.image" :alt="location.name + '照片'" loading="lazy" width="491"
                height="350" />
              <div v-else class="card-img-placeholder" aria-hidden="true"></div>
            </div>
            <div class="card-text">
              <div class="card-title-group">
                <h3 class="card-title">{{ location.name }}</h3>
              </div>
              <p class="card-desc">{{ location.description }}</p>
              <time class="card-date" :datetime="location.date">{{ location.date }}</time>
            </div>
          </article>
        </div>

        <!-- 列表模式 -->
        <div v-else class="list-group" role="list" aria-label="服務據點列表">
          <article v-for="location in paginatedLocations" :key="location.id" class="location-list-item" role="listitem">
            <div class="list-img" aria-hidden="true">
              <img v-if="location.image" :src="location.image" :alt="location.name + '照片'" loading="lazy" width="200"
                height="140" />
              <div v-else class="list-img-placeholder" aria-hidden="true"></div>
            </div>
            <div class="list-content">
              <h3 class="list-title">{{ location.name }}</h3>
              <p class="list-desc">{{ location.description }}</p>
              <time class="list-date" :datetime="location.date">{{ location.date }}</time>
            </div>
          </article>
         
        </div>

        <!-- 分頁 Pagination -->
        <nav class="pagination" aria-label="頁碼導覽">
          <!-- 左：頁碼群組（箭頭 + 數字 + 箭頭） -->
          <div class="pagination-pages">
            
            <button v-for="page in totalPages" :key="page" class="page-number" :class="{ active: currentPage === page }"
              :aria-label="`第 ${page} 頁`" :aria-current="currentPage === page ? 'page' : undefined"
              @click="changePage(page)">
              {{ page }}
            </button>

          </div>

          <p class="pagination-info" aria-live="polite">Page {{ currentPage }} of {{ totalPages }}</p>
        </nav>
      </div>
    </section>
  </main>
</template>



<style scoped>

/* ===== 主內容區 ===== */
.locations-section {
  padding: 60px 0 80px;
  background: #fff;
}

.section-container {
  max-width: 1616px;
  margin: 0 auto;
  padding: 0 158px;
}

/* ===== 標題 ===== */
.section-header {
  margin-bottom: 32px;
}

.section-title {
  font-family: 'Inter', sans-serif;
  font-size: clamp(2rem, 4vw, 4rem);
  font-weight: 400;
  line-height: 1.2;
  color: #000;
  margin: 0;
}

/* ===== Toolbar ===== */
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

/* Tag 篩選 */
.tag-group {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
}

/* tag-btn 樣式由 a-button :style 控制 */

/* view-toggle 樣式由 a-button-group + a-button :style 控制 */

/* ===== 卡片 Grid ===== */
.card-group {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 64px 64px;
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
  gap: 16px;
  padding: 16px 24px;
  background: #fff;
  border-radius: 0 0 20px 20px;
  flex: 1;
}

.card-title-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.card-title {
  font-family: 'Inter', sans-serif;
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 29px;
  color: #000;
  margin: 0;
}

.card-desc {
  font-family: 'Inter', sans-serif;
  font-size: 1.25rem;
  line-height: 24px;
  color: #757575;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-date {
  font-family: 'Inter', sans-serif;
  font-size: 1.25rem ;
  line-height: 24px;
  color: #757575;
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
  width: 200px;
  min-width: 200px;
  height: 140px;
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
  gap: 12px;
  flex: 1;
}

.list-title {
  font-family: 'Inter', sans-serif;
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 29px;
  color: #000;
  margin: 0;
}

.list-desc {
  font-family: 'Inter', sans-serif;
  font-size: 1.125rem;
  line-height: 24px;
  color: #757575;
  margin: 0;
}

.list-date {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  line-height: 24px;
  color: #757575;
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

.page-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  border-radius: 80px;
  border: 2px solid #3C3C3C;
  background: #fff;
  color: #3C3C3C;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.page-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.page-btn:not(:disabled):hover {
  background: #3C3C3C;
  color: #fff;
}

.page-btn:focus-visible {
  outline: 2px solid #1E4620;
  outline-offset: 2px;
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
  /* 佔一個固定寬度讓頁碼能真正置中 */
  min-width: 160px;
  text-align: right;
}


/* ===== 響應式 RWD ===== */
@media (max-width: 1400px) {
  .section-container {
    padding: 0 80px;
  }

  .card-group {
    gap: 40px;
  }
}

@media (max-width: 1100px) {
  .section-container {
    padding: 0 40px;
  }

  .card-group {
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
  }
}

@media (max-width: 768px) {
  .section-container {
    padding: 0 20px;
  }

  .card-group {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .toolbar {
    flex-direction: column;
    align-items: flex-start;
  }

  .tag-group {
    gap: 8px;
  }

  .list-img {
    width: 120px;
    min-width: 120px;
    height: 90px;
  }

  .list-title {
    font-size: 1.125rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .locations-section {
    padding: 32px 0 48px;
  }
}

@media (max-width: 480px) {
  .location-list-item {
    flex-direction: column;
    padding: 16px;
  }

  .list-img {
    width: 100%;
    min-width: unset;
    height: 180px;
  }

  .pagination-info {
    font-size: 1rem;
  }
}
</style>
