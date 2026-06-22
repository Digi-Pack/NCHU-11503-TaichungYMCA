<script setup>

import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import courses from '@/data/course.json'

import Breadcrumb from '@/components/Breadcrumb.vue'
import Text from '@/components/Text.vue'
import CourseCard from '@/components/CourseCard.vue'
import CourseListItem from '@/components/CourseListItem.vue'
import HotCourseCard from '@/components/HotCourseCard.vue'
import HotCourseListItem from '@/components/HotCourseListItem.vue'
import PageHero from '@/components/PageHero.vue'
import courseBanner from '@/assets/img/course/Course_Banner.jpg'

import {
  TableOutlined,
  BarChartOutlined,
  SearchOutlined,
} from '@ant-design/icons-vue'

const breadcrumbItems = [{ text: '首頁', to: '/' }, { text: '課程查詢' }]

const categories = [
  '公民與在地',
  '生活應用',
  '音樂表演',
  '健康運動',
  '語言文化',
  '數位科技',
  '藝術手作',
]

const route = useRoute()
const router = useRouter()

const current = ref(Number(route.query.page) || 1)
const pageSize = ref(6)
const selectedCategory = ref(null)
const viewMode = ref(route.query.view || 'card')
const courseTitleRef = ref(null)

const keywordInput = ref('')
const keyword = ref('')

const hotCourses = computed(() => courses.slice(0, 4))
const hotStartIndex = ref(0)

const visibleHotCourses = computed(() => {
  return hotCourses.value.slice(hotStartIndex.value, hotStartIndex.value + 3)
})

function prevHotCourse() {
  if (hotStartIndex.value > 0) hotStartIndex.value--
}

function nextHotCourse() {
  if (hotStartIndex.value < hotCourses.value.length - 3) hotStartIndex.value++
}

const filteredCourses = computed(() => {
  const searchText = keyword.value.trim().toLowerCase()

  return courses.filter((course) => {
    const matchCategory =
      !selectedCategory.value || course.category === selectedCategory.value

    const matchKeyword =
      !searchText ||
      course.title?.toLowerCase().includes(searchText) ||
      course.teacher?.toLowerCase().includes(searchText) ||
      course.category?.toLowerCase().includes(searchText) ||
      course.place?.toLowerCase().includes(searchText) ||
      course.time?.toLowerCase().includes(searchText)

    return matchCategory && matchKeyword
  })
})

const pageCourses = computed(() => {
  const start = (current.value - 1) * pageSize.value
  return filteredCourses.value.slice(start, start + pageSize.value)
})

const totalPages = computed(() =>
  Math.ceil(filteredCourses.value.length / pageSize.value),
)

function searchCourses() {
  keyword.value = keywordInput.value
  current.value = 1
}

function clearSearch() {
  keywordInput.value = ''
  keyword.value = ''
  current.value = 1
}

function selectCategory(cat) {
  selectedCategory.value = selectedCategory.value === cat ? null : cat
  keywordInput.value = ''
  keyword.value = ''
  current.value = 1
}

function showAllCategory() {
  selectedCategory.value = null
  keywordInput.value = ''
  keyword.value = ''
  current.value = 1
}

function setViewMode(mode) {
  viewMode.value = mode
}

watch([current, viewMode], ([page, view]) => {
  router.replace({
    query: {
      ...route.query,
      page,
      view,
    },
  })

  courseTitleRef.value?.scrollIntoView({
    behavior: 'smooth',
  })
})

watch(
  () => route.query.page,
  (newPage) => {
    current.value = Number(newPage) || 1
  },
  { immediate: true },
)
</script>

<template>
  <main>
    <Breadcrumb :items="breadcrumbItems" />
    <PageHero :image="courseBanner" />

    <section class="course-page">
      <section class="section-block">
        <Text class="green"">熱門課程</Text>

        <div v-if="viewMode === 'card'" class=" hot-area">
          <button class="arrow-btn prev-btn" :class="{ disabled: hotStartIndex === 0 }" :disabled="hotStartIndex === 0"
            @click="prevHotCourse">
            ‹
          </button>

          <div class="hot-window">
            <div class="hot-track">
              <HotCourseCard v-for="course in visibleHotCourses" :key="course.id" :course="course" />
            </div>
          </div>

          <button class="arrow-btn next-btn" :class="{ disabled: hotStartIndex >= hotCourses.length - 3 }"
            :disabled="hotStartIndex >= hotCourses.length - 3" @click="nextHotCourse">
            ›
          </button>
          </div>

          <div v-else class="hot-list-area">
            <HotCourseListItem v-for="course in hotCourses.slice(0, 3)" :key="course.id" :course="course" />
          </div>
      </section>

      <section class="section-block">
        <div ref="courseTitleRef">
          <Text class="green">所有課程</Text>
        </div>
        <div class="search-area">
          <input v-model="keywordInput" type="text" class="search-input" placeholder="輸入關鍵字"
            @keyup.enter="searchCourses" />

          <button class="search-btn" @click="searchCourses">
            <SearchOutlined />
            搜尋
          </button>
        </div>

        <div class="toolbar">
          <div class="category-area">
            <button class="category-btn" :class="{ active: !selectedCategory }" @click="showAllCategory">
              全部課程
            </button>

            <button v-for="cat in categories" :key="cat" class="category-btn"
              :class="{ active: selectedCategory === cat }" @click="selectCategory(cat)">
              {{ cat }}
            </button>
          </div>

          <div class="display-toggle">
            <BarChartOutlined class="icon chart" :class="{ active: viewMode === 'list' }"
              @click="setViewMode('list')" />
            <TableOutlined class="icon table" :class="{ active: viewMode === 'card' }" @click="setViewMode('card')" />
          </div>
        </div>
        <button v-if="keyword" class="clear-btn" @click="clearSearch">
          清除搜尋
        </button>
        <div v-else-if="viewMode === 'card'" class="cards-area">
          <CourseCard v-for="course in pageCourses" :key="course.id" :course="course" />
        </div>

        <div v-else class="lists-area">
          <CourseListItem v-for="course in pageCourses" :key="course.id" :course="course" />
        </div>

        <div class="page-area">
          <a-pagination v-model:current="current" :total="filteredCourses.length" :page-size="pageSize"
            :show-size-changer="false" />

          <p class="page-text">Page {{ current }} of {{ totalPages }}</p>
        </div>
      </section>
    </section>
  </main>
</template>

<style scoped>
.icon {
  width: 51px;
  height: 51px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  background: #f9f6f0;
  color: #1e4620;
  border: none;
  cursor: pointer;
  font-size: 20px;
}

.course-page {
  width: 100%;
  max-width: 1300px;
  box-sizing: border-box;
  margin: 0 auto;
  padding: 80px 0 0;
}

.section-block {
  margin-bottom: 64px;
}

.section-block> :first-child {
  width: 100%;
  padding-bottom: 8px;
  margin-bottom: 24px;
  border-bottom: 2px solid #1e4620;
}

/* 熱門課程 */
.hot-list-area {
  margin-top: 40px;
  border-top: 1px solid #b1b0b0;
}

.green {
  color: #1E4620;
}

.hot-area {
  position: relative;
  width: 100%;
}

.hot-window {
  width: 100%;
  overflow: hidden;
}

.hot-track,
.cards-area {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 74px 64px;
}

.hot-track>*,
.cards-area>* {
  width: 100%;
  min-width: 0;
}

.arrow-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 1px solid #b1b0b0;
  background: #F0E9E3;
  color: #7d7d7d;
  font-size: 48px;
  line-height: 45PX;
  display: flex;
  justify-content: center;
  /* align-items: center; */
  cursor: pointer;
}

.prev-btn {
  left: 0;
}

.next-btn {
  right: 0;
}

/* .arrow-btn:hover {
  background: #f5f5f5;
} */

.arrow-btn.disabled {
  cursor: not-allowed;
}

/* 搜尋框 */
.search-area {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  border: 2px solid #b1b0b0;
  border-radius: 16px;
  background: #fff;
  overflow: hidden;
  transition: border-color 0.2s ease;
}

.search-input {
  flex: 1;
  height: 62px;
  padding: 0 120px 0 12px;
  border: none;
  outline: none;
  font-size: 1.5rem;
}

.search-btn {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 93px;
  border: none;
  border-radius: 0 4px 4px 0;
  background-color: #1e4620;
  color: #f9f6f0;
  cursor: pointer;
  font-size: 1.125rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.search-btn:hover {
  border-color: #d96b27;
}

.search-area:focus-within {
  border-color: #d96b27;
}


.search-btn :deep(svg) {
  font-size: 20px;
}

/* 分類 + 檢視切換 */
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  margin-bottom: 40px;
}

.category-area {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  min-width: 0;
}

.category-btn {
  width: 120px;
  height: 51px;
  padding: 16px 12px;
  border-radius: 20px;
  border: 1px solid #1e4620;
  background-color: #f9f6f0;
  color: #1e4620;
  cursor: pointer;
  font-size: 16px;
}

.category-btn.active {
  background-color: #1e4620;
  color: #f9f6f0;
}


.category-btn:hover {
  background-color: #938d6b;
  color: #f9f6f0;
}

.display-toggle {
  display: flex;
  flex-shrink: 0;
  border: 1px solid #1e4620;
  border-radius: 8px;
  overflow: hidden;
  background-color: #f9f6f0;
}

.chart {
  border-right: 1px solid #1e4620;
}

.table,
.chart {
  border-radius: 0;
}

.icon:hover {
  background-color: #938d6b;
  color: #f0e9e3;
}

.icon.active {
  background-color: #1e4620;
  color: #f0e9e3;
}

.clear-btn {
  height: 40px;
  padding: 0 20px;
  margin-bottom: 32px;
  border: 1px solid #1e4620;
  border-radius: 8px;
  background: #f9f6f0;
  color: #1e4620;
  cursor: pointer;
}

.clear-btn:hover {
  background-color: #938d6b;
  border-color: #938d6b;
  color: #f0e9e3;
}

.lists-area {
  width: 100%;
}

.empty-text {
  padding: 80px 0;
  text-align: center;
  color: #757575;
  font-size: 1.2rem;
}

.page-area {
  margin-top: 48px;
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 16px;
  flex-wrap: wrap;
}

.page-text {
  font-size: 1.5rem;
  margin: 0;
  color: #1e4620;
}

.page-area :deep(.ant-pagination) {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}


.page-area :deep(.ant-pagination-item) {
  width: 45px;
  height: 45px;
  min-width: 45px;
  line-height: 41px;
  border-radius: 50%;
  border: 2px solid #1e4620;
  background-color: #f9f6f0;
  transition: all 0.2s ease;
}

.page-area :deep(.ant-pagination-item a) {
  color: #1e4620;
  font-size: 18px;
  font-weight: 400;
}

.page-area :deep(.ant-pagination-item:hover),
.page-area :deep(.ant-pagination-item-active) {
  background-color: #d1c8c1;
  border-color: #1e4620;
}

.page-area :deep(.ant-pagination-item:hover a),
.page-area :deep(.ant-pagination-item-active a) {
  color: #1e4620;
}

.page-area :deep(.ant-pagination-prev),
.page-area :deep(.ant-pagination-next) {
  display: none;
}

/* 1100：平板變版 */
@media (max-width: 1100px) {
  .course-page {
    padding: 64px 40px 40px;
  }

  .category-btn {
    font-size: 1.25rem;
    height: 60px;
    white-space: nowrap;
  }

  .toolbar {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    margin-bottom: 40px;
  }

  .display-toggle {
    order: 1;
    align-self: flex-start;
  }

  .category-area {
    order: 2;
    width: 100%;
  }

  .hot-track,
  .cards-area {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 32px;
  }
}

/* 1440 */
@media (max-width: 1440px) {
  .course-page {
    max-width: 1300px;
    padding: 80px 40px 0;
  }

  .hot-track,
  .cards-area {
    gap: 48px 40px;
  }
}

/* 1024 */
@media (max-width: 1024px) {
  .course-page {
    padding: 64px 40px 40px;
  }
}

/* 768 */
@media (max-width: 768px) {
  .course-page {
    padding: 48px 32px 0;
  }

  .section-block {
    margin-bottom: 48px;
  }

  .category-btn {
    font-size: 1.25rem;
    /* 20px */
    height: 60px;
    font-weight: 500;
  }

  .toolbar {
    flex-direction: column;
    align-items: stretch;
    gap: 20px;
  }

  .display-toggle {
    align-self: flex-end;
  }

  .hot-track,
  .cards-area {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .arrow-btn {
    display: none;
  }

  .page-area {
    flex-direction: column;
    align-items: flex-start;
  }
}

/* 432 */
@media (max-width: 432px) {
  .course-page {
    padding: 40px 20px 0;
  }

  .category-area {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  .category-btn {
    width: 100%;
    height: 60px;
    padding: 0 12px;
    font-size: 1.25rem;
    /* 20px */
    font-weight: 500;
  }

  .search-input {
    height: 52px;
    padding-right: 100px;
  }

  .search-btn {
    width: 84px;
    font-size: 1.5rem;
  }

  .page-area :deep(.ant-pagination-item) {
    width: 36px;
    height: 36px;
    min-width: 36px;
    line-height: 32px;
  }

  .page-area :deep(.ant-pagination-item a) {
    font-size: 14px;
  }
}

/* 390 */
@media (max-width: 390px) {
  .course-page {
    padding-left: 12px;
    padding-right: 12px;
  }

  .category-area {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .category-btn {
    min-width: 0;
    height: 60px;
    font-size: 1.25rem;
    /* 20px */
    font-weight: 500;
  }

  .display-toggle {
    align-self: flex-end;
  }

  .search-input {
    padding-left: 10px;
    padding-right: 90px;
  }

  .search-btn {
    width: 76px;
    gap: 4px;
    font-size: 14px;
  }

  .page-area {
    width: 100%;
    overflow: hidden;
  }

  .page-area :deep(.ant-pagination) {
    max-width: 100%;
    gap: 6px;
  }

  .page-area :deep(.ant-pagination-item) {
    width: 32px;
    height: 32px;
    min-width: 32px;
    line-height: 28px;
  }

  .page-area :deep(.ant-pagination-item a) {
    font-size: 13px;
  }
}
</style>