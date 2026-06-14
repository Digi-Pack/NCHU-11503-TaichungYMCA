<script setup>
import { ref, computed, watch } from 'vue'
import PageHero from '@/components/PageHero.vue'
import Text from '@/components/Text.vue'
import courses from '@/data/course.json'
const courseHeroImg = 'https://picsum.photos/1920/500'

const category = [
  '公民與在地',
  '生活應用',
  '音樂表演',
  '健康運動',
  '語言文化',
  '數位科技',
  '藝術手作',
]

const current = ref(1)
const pageSize = ref(6)

const pageSizeOptions = [6, 10, 20, 50]


function changePageSize(value) {
  pageSize.value = value
  current.value = 1
}

const selectedCategory = ref(null)
const courseTitleRef = ref(null)

const filteredCourses = computed(() => {
  if (!selectedCategory.value) return courses
  return courses.filter((course) => course.category === selectedCategory.value)
})

const pageCourses = computed(() => {
  const start = (current.value - 1) * pageSize.value
  return filteredCourses.value.slice(start, start + pageSize.value)
})

const totalPages = computed(() => Math.ceil(filteredCourses.value.length / pageSize.value))

function selectCategory(cat) {
  selectedCategory.value = selectedCategory.value === cat ? null : cat
  current.value = 1
}

watch(current, () => {
  courseTitleRef.value?.scrollIntoView({ behavior: 'smooth' })
})
</script>

<template>
  <main>
    <div class="breadcrumb">
      <a-breadcrumb separator=">">
        <a-breadcrumb-item>首頁</a-breadcrumb-item>
        <a-breadcrumb-item>課程查詢</a-breadcrumb-item>
      </a-breadcrumb>
    </div>

    <PageHero class="hero" :image="courseHeroImg"></PageHero>

    <div class="container-normal main-section">
      <div ref="courseTitleRef">
        <Text>課程查詢</Text>
      </div>

      <div class="checkable-area">
        <div class="button-area">
          <a-button
            v-for="cat in category"
            :key="cat"
            class="category-btn"
            :class="{ active: selectedCategory === cat }"
            @click="selectCategory(cat)"
          >
            {{ cat }}
          </a-button>
        </div>
      </div>

      <div class="lists-area">
        <div v-for="course in pageCourses" :key="course.code" class="course-list-item">
          <div class="course-main">
            <div class="course-tags">
              <span class="course-code">{{ course.code }}</span>
              <span class="course-category">{{ course.category }}</span>
            </div>

            <h2 class="course-title">
              {{ course.title }}
            </h2>

            <p class="course-desc">
              {{ course.teacher }}
            </p>

            <p class="course-info">
              {{ course.period }}｜{{ course.weekday }}｜{{ course.time }}｜{{ course.fee }}
            </p>
          </div>

          <RouterLink class="more-btn" :to="`/courses/${course.code}`"> 查看更多 ＞ </RouterLink>
        </div>
      </div>

      <div class="page-area">
        <div class="page-left">
   <a-pagination
  v-model:current="current"
  :total="filteredCourses.length"
  :page-size="pageSize"
  :show-size-changer="false"
/>

          <div class="page-size">
            <span>每頁顯示</span>
            <a-select v-model:value="pageSize" style="width: 90px" @change="changePageSize">
              <a-select-option v-for="num in pageSizeOptions" :key="num" :value="num">
                {{ num }} 筆
              </a-select-option>
            </a-select>
          </div>

          <RouterLink class="more-btn" :to="`/courses/${course.code}`"> 查看更多 ＞ </RouterLink>
        </div>
      </div>

        <Text size="text-24" color="deep-gray"> Page {{ current }} of {{ totalPages }} </Text>
      </div>
    </div>
  </main>
</template>

<style scoped>
.breadcrumb {
  padding: 10px 0;
}

.container-normal {
  width: 85%;
  margin: auto;
}

.main-section {
  display: flex;
  flex-direction: column;
  gap: 40px 0;
}

.hero {
  margin-bottom: 80px;
}

.checkable-area {
  display: flex;
  justify-content: space-between;
}

.button-area {
  max-width: 1000px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.category-btn {
  min-width: 120px;
  height: 51px;
  border-radius: 20px;
  background-color: #ffffff;
  border-color: #3c3c3c;
  color: #3c3c3c;
  font-size: 1rem;
}

.category-btn:hover,
.category-btn.active {
  background-color: #3c3c3c;
  border-color: #3c3c3c;
  color: #f0e9e3;
}

.lists-area {
  width: 100%;
  padding-right: 10px;
}

.course-list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 40px;
  padding: 24px 0;
  border-bottom: 1px solid #cfcfcf;
}

.course-main {
  flex: 1;
}

.course-tags {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.course-code,
.course-category {
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 0.9rem;
}

.course-code {
  background-color: #3c3c3c;
  color: #f0e9e3;
}

.course-category {
  background-color: #f0e9e3;
  color: #3c3c3c;
}

.course-title {
  margin: 0 0 10px;
  font-size: 2rem;
  font-weight: 500;
  color: #000000;
}

.course-desc {
  margin: 0 0 8px;
  font-size: 1.3rem;
  color: #757575;
}

.course-info {
  margin: 0;
  font-size: 1rem;
  color: #757575;
}

.more-btn {
  flex-shrink: 0;
  padding: 14px 24px;
  border-radius: 6px;
  background-color: #7d7d7d;
  color: #ffffff;
  text-decoration: none;
}

.more-btn:hover {
  opacity: 0.85;
}

.page-area {
  display: flex;
  justify-content: space-between;
  align-items: end;
}

.page-area :deep(.ant-pagination-item) {
  width: 45px;
  height: 45px;
  line-height: 45px;
  border-radius: 50%;
  border-color: #3c3c3c;
}

.page-area :deep(.ant-pagination-item a) {
  color: #3c3c3c;
}

.page-area :deep(.ant-pagination-item-active) {
  background-color: #7d7d7d;
  border-color: #3c3c3c;
}

.page-area :deep(.ant-pagination-item-active a) {
  color: #f0e9e3;
}

.page-area :deep(.ant-pagination-prev),
.page-area :deep(.ant-pagination-next) {
  display: none;
}

.page-left {
  display: flex;
  align-items: center;
  gap: 24px;
}

.page-size {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #3c3c3c;
}
</style>
