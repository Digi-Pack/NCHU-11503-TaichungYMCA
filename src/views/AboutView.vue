<script setup>
import { ref } from 'vue'
import PageHero from '@/components/PageHero.vue'
const currentPage = ref(1)

const newsItems = ref([
  {
    id: 1,
    title: '最新消息標題一',
    excerpt: '這裡是消息的簡短摘要，提供讀者了解本則消息的大致內容與重點方向。',
    date: '2026-05-01',
    dateIso: '2026-05-01',
    link: '#'
  },
  {
    id: 2,
    title: '最新消息標題二',
    excerpt: '這裡是消息的簡短摘要，提供讀者了解本則消息的大致內容與重點方向。',
    date: '2026-04-28',
    dateIso: '2026-04-28',
    link: '#'
  },
  {
    id: 3,
    title: '最新消息標題三',
    excerpt: '這裡是消息的簡短摘要，提供讀者了解本則消息的大致內容與重點方向。',
    date: '2026-04-20',
    dateIso: '2026-04-20',
    link: '#'
  },
  {
    id: 4,
    title: '最新消息標題四',
    excerpt: '這裡是消息的簡短摘要，提供讀者了解本則消息的大致內容與重點方向。',
    date: '2026-04-15',
    dateIso: '2026-04-15',
    link: '#'
  },
  {
    id: 5,
    title: '最新消息標題五',
    excerpt: '這裡是消息的簡短摘要，提供讀者了解本則消息的大致內容與重點方向。',
    date: '2026-04-10',
    dateIso: '2026-04-10',
    link: '#'
  },
  {
    id: 6,
    title: '最新消息標題六',
    excerpt: '這裡是消息的簡短摘要，提供讀者了解本則消息的大致內容與重點方向。',
    date: '2026-04-05',
    dateIso: '2026-04-05',
    link: '#'
  }
])
</script>


<template>
  <main id="main-content" class="about-page">

    <!-- Hero Section -->
  <section class="hero-section" aria-labelledby="about-heading">
  <h1 id="about-heading" class="about-title">關於我們</h1>
  <PageHero image="https://picsum.photos/1920/400" />
</section>

    <!-- About Content Section -->
    <section class="about-content-section" aria-labelledby="about-intro-heading">
      <div class="container">
        <h2 id="about-intro-heading" class="section-title">我們的故事</h2>
        <p class="about-description">
          本校致力於提供優質的教育環境，培育學生多元發展。我們秉持著創新、誠信與卓越的核心價值，持續推動各項學術研究與社會服務，為社會貢獻培育優秀的人才。
        </p>
      </div>
    </section>

    <!-- Latest News Section -->
    <section class="news-section" aria-labelledby="news-heading">
      <div class="container">
        <div class="news-header">
          <h2 id="news-heading" class="section-title">最新消息</h2>
          <a href="#" class="news-more-link" aria-label="查看更多最新消息">
            <span aria-hidden="true">▶</span>
          </a>
        </div>

        <ul class="news-grid" role="list" aria-label="最新消息列表">
          <li
            v-for="(item, index) in newsItems"
            :key="item.id"
            class="news-card"
            role="listitem"
          >
            <article :aria-labelledby="`news-title-${item.id}`">
              <a :href="item.link" class="news-card-link" :aria-label="`閱讀更多：${item.title}`">
                <div class="news-image-wrapper">
                  <img
                    :src="`https://picsum.photos/60/400?random=${index + 1}`"
                    :alt="`${item.title} 相關圖片`"
                    class="news-image"
                    width="60"
                    height="400"
                    loading="lazy"
                  />
                </div>
                <div class="news-content">
                  <h3 :id="`news-title-${item.id}`" class="news-title">{{ item.title }}</h3>
                  <p class="news-excerpt">{{ item.excerpt }}</p>
                  <time :datetime="item.dateIso" class="news-date">{{ item.date }}</time>
                </div>
              </a>
            </article>
          </li>
        </ul>

        <!-- Pagination -->
        <nav aria-label="最新消息分頁">
          <ul class="pagination" role="list">
            <li v-for="page in 3" :key="page">
              <button
                class="page-dot"
                :class="{ active: page === currentPage }"
                :aria-label="`第 ${page} 頁`"
                :aria-current="page === currentPage ? 'page' : undefined"
                @click="currentPage = page"
              ></button>
            </li>
          </ul>
        </nav>
      </div>
    </section>

  </main>
</template>



<style scoped>
/* ===== CSS Variables ===== */
.about-page {
  /* --color-cream: #F9F6F0; */
  --color-green: #1E4620;
  --color-orange: #D96B27;
  --color-white: #ffffff;
  --color-text: #2c2c2c;
  --color-text-muted: #666666;
  --font-family: 'Noto Serif TC', 'Noto Sans TC', 'Microsoft JhengHei', serif;
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 2rem;
  --spacing-lg: 3rem;
  --spacing-xl: 4rem;
  --border-radius: 4px;
  --transition: 0.25s ease;

  background-color: var(--color-cream);
  color: var(--color-text);
  font-family: var(--font-family);
  min-height: 100vh;
}

/* ===== Skip Link (Accessibility) ===== */
.about-page:focus-within .skip-link:focus {
  clip: auto;
}

/* ===== Container ===== */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-md);
}

/* ===== Hero Section ===== */
.hero-section {
  position: relative;
}

.about-title {
  color: var(--color-orange);
  font-size: clamp(1.25rem, 3vw, 1.75rem);
  font-weight: 700;
  padding: var(--spacing-sm) var(--spacing-md);
  margin: 0;
  background-color: var(--color-green);
  letter-spacing: 0.05em;
}


/* ===== About Content Section ===== */
.about-content-section {
  padding: var(--spacing-lg) 0;
  background-color: var(--color-cream);
  border-bottom: 2px solid var(--color-green);
}

.section-title {
  font-size: clamp(1.25rem, 2.5vw, 1.6rem);
  font-weight: 700;
  color: var(--color-green);
  margin: 0 0 var(--spacing-sm);
  padding-bottom: var(--spacing-xs);
  border-bottom: 3px solid var(--color-orange);
  display: inline-block;
}

.about-description {
  font-size: 1rem;
  line-height: 1.9;
  color: var(--color-text);
  max-width: 800px;
  margin-top: var(--spacing-sm);
}

/* ===== News Section ===== */
.news-section {
  padding: var(--spacing-lg) 0;
  background-color: var(--color-cream);
}

.news-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
}

.news-more-link {
  color: var(--color-green);
  text-decoration: none;
  font-size: 0.85rem;
  border: 1px solid var(--color-green);
  padding: 2px 8px;
  border-radius: var(--border-radius);
  transition: background-color var(--transition), color var(--transition);
  margin-left: auto;
}

.news-more-link:hover,
.news-more-link:focus-visible {
  background-color: var(--color-green);
  color: var(--color-cream);
  outline: 2px solid var(--color-orange);
  outline-offset: 2px;
}

/* ===== News Grid ===== */
.news-grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-md);
}

.news-card {
  background-color: var(--color-white);
  border: 1px solid rgba(30, 70, 32, 0.15);
  border-radius: var(--border-radius);
  overflow: hidden;
  transition: box-shadow var(--transition), transform var(--transition);
}

.news-card:hover {
  box-shadow: 0 6px 20px rgba(30, 70, 32, 0.15);
  transform: translateY(-2px);
}

.news-card-link {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
  height: 100%;
}

.news-card-link:focus-visible {
  outline: 3px solid var(--color-orange);
  outline-offset: 2px;
}

.news-image-wrapper {
  width: 100%;
  overflow: hidden;
  background-color: #e0ddd7;
}

.news-image {
  display: block;
  width: 100%;
  height: 160px;
  object-fit: cover;
  transition: transform var(--transition);
}

.news-card:hover .news-image {
  transform: scale(1.04);
}

.news-content {
  padding: var(--spacing-sm);
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: var(--spacing-xs);
}

.news-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--color-green);
  margin: 0;
  line-height: 1.5;
}

.news-excerpt {
  font-size: 0.85rem;
  color: var(--color-text-muted);
  line-height: 1.7;
  margin: 0;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-date {
  font-size: 0.78rem;
  color: var(--color-orange);
  font-weight: 600;
  letter-spacing: 0.03em;
  margin-top: auto;
}

/* ===== Pagination ===== */
.pagination {
  list-style: none;
  margin: var(--spacing-md) 0 0;
  padding: 0;
  display: flex;
  gap: var(--spacing-xs);
  justify-content: center;
  align-items: center;
}

.page-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid var(--color-green);
  background-color: transparent;
  cursor: pointer;
  padding: 0;
  transition: background-color var(--transition);
}

.page-dot.active {
  background-color: var(--color-green);
}

.page-dot:hover,
.page-dot:focus-visible {
  background-color: var(--color-orange);
  border-color: var(--color-orange);
  outline: 2px solid var(--color-orange);
  outline-offset: 2px;
}


/* ===== Responsive ===== */
@media (max-width: 900px) {
  .news-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .footer-image-wrapper {
    width: 100%;
  }
}

@media (max-width: 600px) {
  .news-grid {
    grid-template-columns: 1fr;
  }
  .school-info {
    flex-direction: column;
  }
  .footer-info-inner {
    flex-direction: column;
  }
  
}

/* ===== Reduced Motion ===== */
@media (prefers-reduced-motion: reduce) {
  .news-card,
  .news-image,
  .news-more-link,
  .page-dot,
  .contact-details a {
    transition: none;
  }
  .news-card:hover {
    transform: none;
  }
  .news-card:hover .news-image {
    transform: none;
  }
}
</style>