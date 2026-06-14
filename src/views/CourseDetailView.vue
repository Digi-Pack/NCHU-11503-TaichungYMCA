<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import PageHero from '@/components/PageHero.vue'
import Text from '@/components/Text.vue'
import courses from '@/data/course.json'
const courseHeroImg = 'https://picsum.photos/1920/500'

const route = useRoute()

const course = computed(() => {
  return courses.find((item) => item.code === route.params.id)
})

import Breadcrumb from '@/components/Breadcrumb.vue'

const breadcrumbItems = computed(() => [
  { text: '首頁', to: '/' },
  { text: '課程查詢', to: '/courses' },
  { text: course.value?.title || '課程詳細' },
])
</script>

<template>
  <main>
    <Breadcrumb :items="breadcrumbItems" />

    <PageHero class="hero" :image="courseHeroImg" />

    <div class="container-normal main-section">
      <template v-if="course">
        <Text>{{ course.title }}</Text>

        <div class="course-detail">
          <p>課程代碼：{{ course.code }}</p>
          <p>課程分類：{{ course.category }}</p>
          <p>授課教師：{{ course.teacher }}</p>
          <p>課程期間：{{ course.period }}</p>
          <p>上課時間：{{ course.weekday }} {{ course.time }}</p>
          <p>課程費用：{{ course.fee }}</p>

          <div class="content-block">
            <h2>課程介紹</h2>
            <p>{{ course.content }}</p>
          </div>

          <div v-if="course.note" class="content-block">
            <h2>備註</h2>
            <p>{{ course.note }}</p>
          </div>

          <a class="signup-btn" :href="course.signupUrl" target="_blank"> 前往報名 </a>
        </div>
      </template>

      <template v-else>
        <Text>找不到課程</Text>
      </template>
    </div>
  </main>
</template>

<style scoped>
.container-normal {
  width: 85%;
  margin: auto;
}

.hero {
  margin-bottom: 80px;
}

.main-section {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.course-detail {
  line-height: 1.8;
  font-size: 1.2rem;
  color: #3c3c3c;
}

.content-block {
  margin-top: 32px;
}

.content-block p {
  white-space: pre-line;
}

.signup-btn {
  display: inline-block;
  margin-top: 32px;
  padding: 14px 28px;
  border-radius: 6px;
  background-color: #7d7d7d;
  color: white;
  text-decoration: none;
}
</style>
