<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import PageHero from '@/components/PageHero.vue'

// SEO (若有使用 @vueuse/head 或 nuxt)
// useHead({
//   title: '關於我們 - 臺中市北屯社區大學',
//   meta: [
//     { name: 'description', content: '臺中市北屯社區大學最新消息與活動資訊，每年修習學員人次超過一萬多人。' },
//     { property: 'og:title', content: '關於我們 - 臺中市北屯社區大學' },
//   ],
// })

const heroBanner = ref('https://picsum.photos/1918/336')

const newsList = ref([
  { id: 1, title: '最新消息', summary: '臺中市北屯(原大墩)社區大學開辦於民國九十一年六月，近期每年修習學員人次皆超過一萬多...', date: '2026-01-01', image: 'https://picsum.photos/seed/n1/600/400' },
  { id: 2, title: '最新消息', summary: '臺中市北屯(原大墩)社區大學開辦於民國九十一年六月，近期每年修習學員人次皆超過一萬多...', date: '2026-01-02', image: 'https://picsum.photos/seed/n2/600/400' },
  { id: 3, title: '最新消息', summary: '臺中市北屯(原大墩)社區大學開辦於民國九十一年六月，近期每年修習學員人次皆超過一萬多...', date: '2026-01-03', image: 'https://picsum.photos/seed/n3/600/400' },
  { id: 4, title: '最新消息', summary: '臺中市北屯(原大墩)社區大學開辦於民國九十一年六月，近期每年修習學員人次皆超過一萬多...', date: '2026-01-04', image: 'https://picsum.photos/seed/n4/600/400' },
  { id: 5, title: '最新消息', summary: '臺中市北屯(原大墩)社區大學開辦於民國九十一年六月，近期每年修習學員人次皆超過一萬多...', date: '2026-01-05', image: 'https://picsum.photos/seed/n5/600/400' },
  { id: 6, title: '最新消息', summary: '臺中市北屯(原大墩)社區大學開辦於民國九十一年六月，近期每年修習學員人次皆超過一萬多...', date: '2026-01-06', image: 'https://picsum.photos/seed/n6/600/400' },
])

const PAGE_SIZE = 6
const currentPage = ref(1)
const totalPages = computed(() => Math.ceil(newsList.value.length / PAGE_SIZE))
const pagedNews = computed(() => {
  const start = (currentPage.value - 1) * PAGE_SIZE
  return newsList.value.slice(start, start + PAGE_SIZE)
})

function goPage(p) {
  if (p < 1 || p > totalPages.value) return
  currentPage.value = p
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <div class="about-page">

    <!-- ── BANNER ── -->
    <section aria-label="頁面橫幅">

      <!-- Breadcrumb -->
      <nav class="breadcrumbs" aria-label="您目前的位置">
        <ol>
          <li><RouterLink to="/">首頁</RouterLink></li>
          <li aria-hidden="true" class="sep">›</li>
          <li><span aria-current="page">關於我們</span></li>
        </ol>
      </nav>

      <!-- PageHero 左右撐滿 -->
      <div class="hero-container">
        <PageHero :image="heroBanner" />
        <h1 class="hero-title">放圖片美化</h1>
      </div>

    </section>

    <!-- ── MAIN ── -->
    <main id="main-content" tabindex="-1">
      <section class="news-section" aria-labelledby="section-heading">

        <!-- Section Title Row -->
        <div class="section-header">
          <h2 id="section-heading">關於我們</h2>
          <!-- View toggle -->
          <div class="view-toggle" role="group" aria-label="顯示方式">
            <button
              class="toggle-btn toggle-list"
              aria-label="列表顯示"
              aria-pressed="true"
            >
              <!-- list icon -->
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <rect x="2" y="4" width="16" height="2.5" rx="1" fill="currentColor"/>
                <rect x="2" y="9" width="16" height="2.5" rx="1" fill="currentColor"/>
                <rect x="2" y="14" width="16" height="2.5" rx="1" fill="currentColor"/>
              </svg>
            </button>
            <button
              class="toggle-btn toggle-grid"
              aria-label="格狀顯示"
              aria-pressed="false"
            >
              <!-- grid icon -->
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <rect x="2" y="2" width="7" height="7" rx="1" fill="currentColor"/>
                <rect x="11" y="2" width="7" height="7" rx="1" fill="currentColor"/>
                <rect x="2" y="11" width="7" height="7" rx="1" fill="currentColor"/>
                <rect x="11" y="11" width="7" height="7" rx="1" fill="currentColor"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Card Grid -->
        <ul class="card-grid" role="list" aria-label="關於我們文章列表">
          <li v-for="item in pagedNews" :key="item.id" class="card">
            <article>
              <figure class="card-img">
                <img
                  :src="item.image"
                  :alt="`${item.title} 圖片`"
                  width="600"
                  height="400"
                  loading="lazy"
                />
              </figure>
              <div class="card-body">
                <h3>{{ item.title }}</h3>
                <p>{{ item.summary }}</p>
                <time :datetime="item.date">{{ item.date }}</time>
              </div>
            </article>
          </li>
        </ul>

        <!-- Pagination -->
        <nav class="pagination" aria-label="分頁導覽">
          <button
            class="page-btn arrow-btn"
            :disabled="currentPage === 1"
            aria-label="上一頁"
            @click="goPage(currentPage - 1)"
          >‹</button>

          <button
            v-for="p in totalPages"
            :key="p"
            class="page-btn"
            :class="{ active: p === currentPage }"
            :aria-label="`第 ${p} 頁`"
            :aria-current="p === currentPage ? 'page' : undefined"
            @click="goPage(p)"
          >{{ p }}</button>

          <button
            class="page-btn arrow-btn"
            :disabled="currentPage === totalPages"
            aria-label="下一頁"
            @click="goPage(currentPage + 1)"
          >›</button>

          <span class="page-info" aria-live="polite" aria-atomic="true">
            Page {{ currentPage }} of {{ totalPages }}
          </span>
        </nav>

      </section>
    </main>

  </div>
</template>

<style scoped>
/* ── Token ── */
.about-page {
  --c-bg:      #F9F6F0;
  --c-primary: #1E4620;
  --c-accent:  #D96B27;
  --c-text:    #2D2D2D;
  --c-muted:   #757575;
  --c-white:   #ffffff;
  --radius-card: 20px;
  --gap-card:  40px;

  background: var(--c-bg);
  color: var(--c-text);
  font-family: 'Noto Sans TC', sans-serif;
  min-height: 100vh;
}

/* ── Breadcrumb ── */
.breadcrumbs {
  padding: 10px 24px;
}
.breadcrumbs ol {
  display: flex;
  align-items: center;
  gap: 4px;
  list-style: none;
  margin: 0;
  padding: 0;
}
.breadcrumbs a {
  font-size: 15px;
  color: #7D7D7D;
  text-decoration: none;
  transition: color 0.15s;
}
.breadcrumbs a:hover,
.breadcrumbs a:focus-visible {
  color: var(--c-primary);
  text-decoration: underline;
}
.breadcrumbs .sep { color: #B1B0B0; font-size: 13px; }
.breadcrumbs [aria-current] {
  font-size: 15px;
  font-weight: 500;
  color: var(--c-primary);
}

/* ── Hero ── */
.hero-container {
  position: relative;
  width: 100%;
  overflow: hidden;
}
.hero-title {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  font-size: clamp(28px, 4.5vw, 64px);
  font-weight: 500;
  color: var(--c-white);
  text-shadow: 0 2px 16px rgba(0,0,0,.45);
  pointer-events: none;
}

/* ── News Section ── */
.news-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 56px 152px 80px;
  gap: 40px;
}

/* Section header */
.section-header {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: relative;
}
.section-header h2 {
  font-size: clamp(28px, 3.5vw, 64px);
  font-weight: 400;
  color: var(--c-text);
  margin: 0;
  text-align: center;
}

/* View toggle */
.view-toggle {
  position: absolute;
  right: 0;
  display: flex;
}
.toggle-btn {
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
  color: #F9F6F0;
}
.toggle-btn:focus-visible {
  outline: 2px solid var(--c-accent);
  outline-offset: -2px;
}
.toggle-list {
  background: #3C3C3C;
  border-radius: 8px 0 0 8px;
}
.toggle-grid {
  background: transparent;
  border: 1px solid #3C3C3C;
  border-radius: 0 8px 8px 0;
  color: #3C3C3C;
}

/* ── Card Grid ── */
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--gap-card);
  width: 100%;
  max-width: 1600px;
  list-style: none;
  margin: 0;
  padding: 0;
}
.card {
  border-radius: var(--radius-card);
  overflow: hidden;
  background: var(--c-white);
  box-shadow: 0 2px 10px rgba(0,0,0,.07);
  transition: transform .2s ease, box-shadow .2s ease;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 28px rgba(0,0,0,.13);
}
.card article {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.card-img {
  margin: 0;
  flex-shrink: 0;
}
.card-img img {
  display: block;
  width: 100%;
  height: 280px;
  object-fit: cover;
}
.card-body {
  padding: 16px 24px 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}
.card-body h3 {
  font-size: 20px;
  font-weight: 500;
  color: var(--c-text);
  margin: 0;
}
.card-body p {
  font-size: 15px;
  line-height: 1.65;
  color: var(--c-muted);
  margin: 0;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.card-body time {
  font-size: 14px;
  color: var(--c-muted);
}

/* ── Pagination ── */
.pagination {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
}
.page-btn {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: 2px solid #3C3C3C;
  background: transparent;
  cursor: pointer;
  font-family: 'Noto Sans TC', sans-serif;
  font-size: 18px;
  color: #3C3C3C;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background .15s, color .15s;
}
.page-btn:focus-visible {
  outline: 2px solid var(--c-accent);
  outline-offset: 2px;
}
.page-btn:hover:not(:disabled):not(.active) {
  background: #e6e6e6;
}
.page-btn.active {
  background: #3C3C3C;
  color: var(--c-bg);
}
.page-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}
.arrow-btn { font-size: 22px; }
.page-info {
  font-size: 18px;
  color: #3C3C3C;
  margin-left: 8px;
  font-family: 'Noto Sans TC', sans-serif;
}

/* ── RWD ── */
@media (max-width: 1280px) {
  .news-section { padding: 48px 40px 64px; }
}

@media (max-width: 960px) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }
  .news-section { padding: 40px 24px 56px; }
}

@media (max-width: 600px) {
  .card-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  .news-section { padding: 32px 16px 48px; }
  .hero-title { font-size: 26px; }
  .view-toggle { position: static; margin-top: 12px; }
  .section-header {
    flex-direction: column;
    gap: 12px;
    align-items: center;
  }
}
</style>