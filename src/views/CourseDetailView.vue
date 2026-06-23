<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
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
  ReloadOutlined,
  CaretRightOutlined,
  PauseOutlined,
} from '@ant-design/icons-vue'

const route = useRoute()
const router = useRouter()

function goBack() {
  router.push({ path: '/courses', query: route.query })
}

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
const isSpeaking = ref(false)
const isPaused = ref(false)
const rate = ref(1)

let speakTimeoutId = null
let gapResumeCallback = null

function cleanText(text) {
  return text
    .replace(/◆/g, '')
    .replace(/★/g, '')
    .replace(/※/g, '')
    .replace(/~/g, '至')
    .replace(/\[/g, '')
    .replace(/\]/g, '')
    .replace(/\n/g, ' ')
    .replace(/(\d{4})\/(\d{1,2})\/(\d{1,2})/g, '$1年$2月$3日')
    .replace(/(\d{1,2})\/(\d{1,2})/g, '$1月$2日')
}

function getCourseSegments(course) {
  return [
    `課程名稱：${course.title}`,
    `授課老師：${course.teacher}`,
    `上課日期：${course.period}`,
    `上課時間：${course.time}`,
    `上課地點：${course.place}`,
    `課程費用：${course.fee}`,
    `課程內容：${course.content}`,
  ].map(cleanText)
}

function speakCourse(course) {
  const segments = getCourseSegments(course)
  let index = 0

  window.speechSynthesis.cancel()
  clearTimeout(speakTimeoutId)
  gapResumeCallback = null
  isSpeaking.value = true
  isPaused.value = false

  function speakNext() {
    if (index >= segments.length) {
      isSpeaking.value = false
      isPaused.value = false
      return
    }

    const utterance = new SpeechSynthesisUtterance(segments[index++])
    utterance.lang = 'zh-TW'
    utterance.rate = rate.value
    utterance.pitch = 1
    utterance.volume = 1

    utterance.onend = () => {
      if (!isSpeaking.value) return
      gapResumeCallback = speakNext
      speakTimeoutId = setTimeout(() => {
        gapResumeCallback = null
        speakNext()
      }, 300)
    }

    window.speechSynthesis.speak(utterance)
  }

  speakNext()
}

function toggleSpeak(course) {
  if (!isSpeaking.value) {
    speakCourse(course)
    return
  }

  if (isPaused.value) {
    isPaused.value = false
    if (gapResumeCallback) {
      const fn = gapResumeCallback
      gapResumeCallback = null
      fn()
    } else {
      window.speechSynthesis.resume()
    }
  } else {
    clearTimeout(speakTimeoutId)
    window.speechSynthesis.pause()
    isPaused.value = true
  }
}

function stopSpeak() {
  window.speechSynthesis.cancel()
  clearTimeout(speakTimeoutId)
  gapResumeCallback = null
  isSpeaking.value = false
  isPaused.value = false
}

function changeRate() {
  if (rate.value === 1) {
    rate.value = 1.25
  } else if (rate.value === 1.25) {
    rate.value = 0.8
  } else {
    rate.value = 1
  }

  if (isSpeaking.value) {
    stopSpeak()
  }
}

function increaseRate() {
  if (rate.value < 1.5) {
    rate.value = Number((rate.value + 0.25).toFixed(2))
  }

  if (isSpeaking.value) {
    stopSpeak()
  }
}

function decreaseRate() {
  if (rate.value > 0.75) {
    rate.value = Number((rate.value - 0.25).toFixed(2))
  }

  if (isSpeaking.value) {
    stopSpeak()
  }
}
</script>

<template>
  <main>
    <Breadcrumb :items="breadcrumbItems" />

    <img class="course-banner" src="/src/assets/img/course/CourseDetail_Banner.jpg" alt="banner" />

    <section v-if="course" class="course-detail-container">
      <section class="course-top-section">
        <div class="course-title-area">
          <div class="voice-backbtn-row">
            <div class="voice-player">
              <span class="headphone-icon">🎧</span>

              <button class="player-btn play-btn" @click="toggleSpeak(course)">
                <PauseOutlined v-if="isSpeaking && !isPaused" />
                <CaretRightOutlined v-else />
              </button>

              <button class="player-btn" @click="decreaseRate">
                −
              </button>

              <span class="rate-text">
                x{{ rate }}
              </span>

              <button class="player-btn" @click="increaseRate">
                ＋
              </button>

              <button class="player-btn volume-btn" @click="stopSpeak">
                <ReloadOutlined />
              </button>
            </div>
            <a-button class="back-btn" @click="goBack">返回上一頁</a-button>
          </div>

          <div class="title-row">
            <h1>{{ course.title }}</h1>
            <span class="date-text">課程編號：{{ course.code }}</span>
          </div>

          <div class="meta-row">
            <div class="tag-code">
              <span class="category-tag">{{ course.category }}</span>
            </div>
            <p class="release-time">公告時間: 2026-06-11</p>
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
            <a class="signup-btn" :href="course.signupUrl" target="_blank" rel="noopener noreferrer">
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

        <iframe class="map-frame" :src="mapEmbedUrl" loading="lazy" allowfullscreen
          referrerpolicy="no-referrer-when-downgrade"></iframe>

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

.voice-backbtn-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.voice-player {
  display: inline-flex;
  align-items: center;
  gap: 10px;

  height: 52px;
  width: fit-content;
  padding: 0 18px;

  background: #efefef;
  border-radius: 999px;
}

.headphone-icon {
  font-size: 1.75rem;
  color: #666;
}

.player-btn {
  width: 32px;
  height: 32px;

  display: flex;
  justify-content: center;
  align-items: center;

  border: none;
  background: transparent;

  cursor: pointer;

  color: #666;
  font-size: 1.5rem;
}

.play-btn {
  width: 36px;
  height: 36px;
  line-height: 36px;

  border-radius: 50%;

  background: #5d5d5d;
  color: white;
}

.play-btn:hover {
  background: #1e4620;
}

.rate-text {
  min-width: 40px;
  text-align: center;
  color: #757575;
  font-size: 1.5rem;
}

.volume-btn {
  border-left: 1px solid #cfcfcf;
  padding-left: 14px;
  width: auto;
}

.main-btn {
  background: #555;
  color: #fff;
}

.main-btn:hover {
  background: #1e4620;
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

main>img {
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
  color: #3C3C3C;
}

.title-row h1 {
  flex: 1;
  margin: 0;
  font-size: 3rem;
  font-weight: 500;
  line-height: 1.2;
}

.release-time {
  margin: 0;
  color: #757575;
  font-size: 1.5rem;
  white-space: nowrap;
}

.meta-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.tag-code {
  display: flex;
  align-items: center;
  gap: 16px;
}

.back-btn {
  /* width: 120px; */
  height: 51px;
  border-radius: 20px;
  background-color: #f9f6f0;
  border-color: #1e4620;
  color: #1e4620;
  font-size: 1.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.back-btn:hover {
  background-color: #938d6b;
  border-color: #938d6b;
  color: #f0e9e3;
}

.category-tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 120px;
  height: 51px;
  padding: 0 12px;
  color: #f0e9e3;
  background: #1e4620;
  border: 1px solid #938D6B;
  border-radius: 20px;
  font-size: 1.25rem;
}

.date-text {
  color: #757575;
  font-size: 1.5rem;
  white-space: nowrap;
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
  font-size: 2.25rem;
  font-weight: 500;
  line-height: 1.2;
}

.info-card {
  padding: 40px;
  border: 1px solid #7D7D7D;
  border-radius: 20px;
  background-color: #F9F6F0;
  text-align: justify;
}

.info-card p,
.traffic-info p {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin: 0 0 16px;
  color: #010101;
  font-size: 1.5rem;
  line-height: 1.5;
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
  font-size: 1.5rem;
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
  font-size: 1.25rem;
  text-decoration: none;
}

.signup-btn:hover {
  background: #938d6b;
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
  font-size: 1.5rem;
  line-height: 1.5;
  white-space: pre-line;
}

.content-text p,
.note-text p {
  margin: 0 0 8px;
  text-align: justify;
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
  text-align: justify;
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
/* 1400 */
/* ===================== */

@media (max-width: 1400px) {
  .course-detail-container,
  .not-found {
    padding-left: 80px;
    padding-right: 80px;
  }
}

/* ===================== */
/* 1300 */
/* ===================== */

@media (max-width: 1300px) {
  .course-banner {
    height: 280px;
  }

  .title-row h1 {
    font-size: 2.625rem;
  }

  .section-title {
    font-size: 2rem;
  }
}

/* ===================== */
/* 1100 */
/* ===================== */

@media (max-width: 1100px) {
  .course-detail-container,
  .not-found {
    padding-left: 40px;
    padding-right: 40px;
  }
}

/* ===================== */
/* 950 */
/* ===================== */

@media (max-width: 950px) {
  .title-row h1 {
    font-size: 2.375rem;
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

  .course-detail-container,
  .not-found {
    padding-left: 20px;
    padding-right: 20px;
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

  .title-row h1 {
    font-size: 2.25rem;
  }

  .section-title {
    font-size: 1.75rem;
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
/* 600 */
/* ===================== */

@media (max-width: 600px) {
  .voice-backbtn-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .back-btn {
    order: -1;
  }
}

/* ===================== */
/* 576 */
/* ===================== */

@media (max-width: 576px) {
  .course-banner {
    height: 180px;
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
/* 
  .category-tag {
    min-width: auto;
    height: 40px;

    border-radius: 16px;

    background: #1e4620;
    color: #f0e9e3;
  } */

  /* .signup-btn {
    width: 112px;
    height: 48px;

    font-size: 1rem;
  } */

  .map-frame {
    height: 240px;
  }
}

/* ===================== */
/* 390 */
/* ===================== */

@media (max-width: 390px) {
  .title-row h1 {
    font-size: 2rem;
  }

  .section-title {
    font-size: 1.5rem;
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

  .info-card {
    padding: 16px;
  }

  .info-card p,
  .traffic-info p {
    gap: 8px;
  }
}
</style>