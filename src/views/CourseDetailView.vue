<script setup>
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import courses from '@/data/course.json'

import Breadcrumb from '@/components/Breadcrumb.vue'
import { categoryImages } from '@/data/categoryImages.js'

import {
  UserOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  DollarOutlined,
  BankOutlined,
  CarOutlined,
  AimOutlined,
} from '@ant-design/icons-vue'

const route = useRoute()

const course = computed(() => courses.find((item) => String(item.id) === String(route.params.id)))

const detailImages = computed(() => {
  return (
    categoryImages[course.value?.category]?.detailImages || [
      'https://placehold.co/642x425',
      'https://placehold.co/642x425',
    ]
  )
})

const breadcrumbItems = computed(() => [
  { text: '首頁', to: '/' },
  {
    text: '課程查詢',
    to: {
      path: '/courses',
      query: route.query,
    },
  },
  {
    text: course.value?.title || '找不到課程',
  },
])

const mapEmbedUrl = computed(() => {
  if (!course.value?.location) return ''
  return `https://www.google.com/maps?q=${encodeURIComponent(course.value.location)}&output=embed`
})

const contentParagraphs = computed(() => {
  if (!course.value?.content) return []
  return course.value.content.split('\n').filter(Boolean)
})

const noteParagraphs = computed(() => {
  if (!course.value?.note) return []
  return course.value.note.split('\n').filter(Boolean)
})
</script>

<template>
  <main>
    <Breadcrumb :items="breadcrumbItems" />

    <img
  class="course-banner"
  src="/src/assets/img/course/CourseDetail_Banner.jpg"
  alt="banner"
/>

    <section v-if="course" class="course-detail-container">
      <section class="course-top-section">
        <div class="course-title-area">
          <div class="title-row">
            <h1>{{ course.title }}</h1>
            <p>課程編號：{{ course.code }}</p>
          </div>

          <div class="meta-row">
            <span class="category-tag">{{ course.category }}</span>
            <span class="date-text">公告時間：2026-06-11</span>
          </div>
        </div>

        <section class="section-block">
          <h2 class="section-title">課程簡介</h2>

          <div class="info-card">
            <p>
              <UserOutlined />
              <span>授課老師：{{ course.teacher }}</span>
            </p>

            <p>
              <CalendarOutlined />
              <span>上課期間：{{ course.period }} {{ course.time }}</span>
            </p>

            <p>
              <EnvironmentOutlined />
              <span>上課地點：{{ course.place }}＿{{ course.location }}</span>
            </p>

            <p>
              <DollarOutlined />
              <span>課程學費：{{ course.fee }}</span>
            </p>

            <p>
              <BankOutlined />
              <span>主辦單位：YMCA</span>
            </p>
          </div>

          <div class="btn-center">
            <a
              class="signup-btn"
              :href="course.signupUrl"
              target="_blank"
              rel="noopener noreferrer"
            >
              我要報名
            </a>
          </div>
        </section>
      </section>

      <section class="section-block">
        <h2 class="section-title">課程內容</h2>

        <div class="image-group">
          <img :src="detailImages[0]" :alt="course.title" />

          <img :src="detailImages[1]" :alt="course.title" />
        </div>
        <div class="content-text">
          <p v-for="(text, index) in contentParagraphs" :key="index">
            {{ text }}
          </p>
        </div>
      </section>

      <section class="section-block">
        <h2 class="section-title">活動地圖</h2>

        <iframe
          class="map-frame"
          :src="mapEmbedUrl"
          loading="lazy"
          allowfullscreen
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>

        <div class="traffic-info">
          <p>
            <CarOutlined />
            <span>公車：{{ course.busInfo }}</span>
          </p>

          <p>
            <AimOutlined />
            <span>捷運：{{ course.mrtInfo }}</span>
          </p>
        </div>
      </section>

      <section class="section-block">
        <h2 class="section-title">注意事項</h2>

        <div class="note-text">
          <p v-for="(text, index) in noteParagraphs" :key="index">
            {{ text }}
          </p>
        </div>
      </section>

      <div class="btn-center">
        <a class="signup-btn" :href="course.signupUrl" target="_blank" rel="noopener noreferrer">
          我要報名
        </a>
      </div>
    </section>

    <section v-else class="not-found">
      <h1>找不到課程</h1>
      <RouterLink to="/courses">回到所有課程</RouterLink>
    </section>
  </main>
</template>
<style scoped>

main {
  overflow-x: hidden;
}

.title-row {
  min-width: 0;
}

.title-row h1 {
  min-width: 0;
  word-break: break-word;
}

.course-detail-container {
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  padding: 80px 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 80px;
}

main > img {
  width: 100%;
  display: block;
  object-fit: cover;
}

.course-top-section {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.course-banner {
  width: 100%;
  height: 336px;

  display: block;

  object-fit: cover;
  object-position: center;
}

.course-title-area {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.title-row {
  display: flex;
  align-items: center;
  gap: 16px;
  color:#3C3C3C;
}

.title-row h1 {
  flex: 1;
  margin: 0;
  font-size: 48px;
  font-weight: 500;
  line-height: 1.2;
}

.title-row p {
  margin: 0;
  color: #757575;
  font-size: 32px;
  white-space: nowrap;
}

.meta-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.category-tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 120px;
  height: 51px;
  padding: 0 12px;
  color: #f9f6f0;
  background: #3c3c3c;
  border: 1px solid #1e4620;
  border-radius: 20px;
  font-size: 16px;
}

.date-text {
  color: #757575;
  font-size: 24px;
}

.section-block {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.section-title {
  margin: 0;
  padding-bottom: 12px;
  border-bottom: 3px solid #3c3c3c;
  color: #1E4620;
  font-size: 3rem;
  font-weight: 500;
  line-height: 1.2;
}

.info-card {
  padding: 40px;
  border: 1px solid #7D7D7D;
  border-radius: 20px;
  background-color: #F9F6F0;
}

.info-card p,
.traffic-info p {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin: 0 0 16px;
  color: #010101;
  font-size: 24px;
  line-height: 1.4;
}

.info-card p:last-child,
.traffic-info p:last-child {
  margin-bottom: 0;
}

.info-card :deep(.anticon),
.traffic-info :deep(.anticon) {
  flex-shrink: 0;
  margin-top: 5px;
  color: #7d7d7d;
  font-size: 24px;
}

.btn-center {
  display: flex;
  justify-content: center;
}

.signup-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 54px;
  color: #f9f6f0;
  background: #1E4620;
  border-radius: 8px;
  font-size: 18px;
  text-decoration: none;
}

.signup-btn:hover {
  background: #1e4620;
}

.image-group {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.image-group img {
  width: 100%;
  aspect-ratio: 642 / 425;
  object-fit: cover;
  border-radius: 20px;
}

.content-text,
.note-text {
  color: #757575;
  font-size: 24px;
  line-height: 1.5;
  white-space: pre-line;
}

.content-text p,
.note-text p {
  margin: 0 0 8px;
}

.map-frame {
  width: 100%;
  height: 425px;
  border: 0;
  border-radius: 20px;
}

.traffic-info {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.not-found {
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  padding: 120px 0;
  box-sizing: border-box;
  text-align: center;
}

.not-found h1 {
  margin-bottom: 24px;
  font-size: 40px;
}

/* ===================== */
/* 1024 */
/* ===================== */

@media (max-width: 1300px) {
  .course-banner {
    height: 280px;
  }

  .course-detail-container,
  .not-found {
    max-width: 1300px;
    padding-left: 40px;
    padding-right: 40px;
  }
}

/* 1024 */
@media (max-width: 1024px) {
  .course-detail-container {
    padding-top: 64px;
    padding-bottom: 64px;
    gap: 64px;
  }

  .title-row {
    flex-direction: column;
    align-items: flex-start;
  }

  .title-row h1,
  .section-title {
    font-size: 40px;
  }

  .title-row p {
    font-size: 24px;
  }

  .date-text,
  .info-card p,
  .traffic-info p,
  .content-text,
  .note-text {
    font-size: 20px;
  }

  .info-card {
    padding: 32px;
  }

  .map-frame {
    height: 380px;
  }
}

/* ===================== */
/* 768 */
/* ===================== */

@media (max-width: 768px) {
  .course-banner {
    height: 220px;
  }

  .course-detail-container {
    padding-top: 48px;
    padding-bottom: 48px;
    gap: 56px;
  }

  .course-top-section,
  .section-block {
    gap: 32px;
  }

  .title-row h1,
  .section-title {
    font-size: 32px;
  }

  .meta-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .image-group {
    grid-template-columns: 1fr;
  }

  .info-card {
    padding: 24px;
  }

  .map-frame {
    height: 320px;
  }
}

/* ===================== */
/* 576 */
/* ===================== */

@media (max-width: 576px) {
  .course-banner {
    height: 180px;
  }

  .course-detail-container,
  .not-found {
    padding-left: 20px;
    padding-right: 20px;
  }

  .course-detail-container {
    padding-top: 40px;
    padding-bottom: 40px;
    gap: 48px;
  }

  .course-top-section,
  .section-block {
    gap: 24px;
  }

  .title-row h1,
  .section-title {
    font-size: 28px;
  }

  .title-row p,
  .date-text,
  .info-card p,
  .traffic-info p,
  .content-text,
  .note-text {
    font-size: 16px;
  }

  .category-tag {
    min-width: auto;
    height: 40px;

    border-radius: 16px;

    background: #1e4620;
    color: #f0e9e3;
  }

  .signup-btn {
    width: 112px;
    height: 48px;

    font-size: 16px;
  }

  .map-frame {
    height: 240px;
  }
}

/* ===================== */
/* 432 */
/* ===================== */

@media (max-width: 432px) {
  .course-banner {
    height: 140px;
  }

  .course-detail-container {
    gap: 40px;
  }

  .title-row h1,
  .section-title {
    font-size: 24px;
  }

  .info-card {
    padding: 16px;
  }

  .info-card p,
  .traffic-info p {
    gap: 8px;
  }
}
</style>