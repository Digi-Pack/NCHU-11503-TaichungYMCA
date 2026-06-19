<script setup>
import PageHero from '@/components/PageHero.vue'
import { ref, computed, watch } from 'vue'
import courses from '@/data/course.json'

import Breadcrumb from '@/components/Breadcrumb.vue'
import Text from '@/components/Text.vue'

import CourseCard from '@/components/CourseCard.vue'
import CourseListItem from '@/components/CourseListItem.vue'
import HotCourseCard from '@/components/HotCourseCard.vue'
import HotCourseListItem from '@/components/HotCourseListItem.vue'

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

const current = ref(1)
const pageSize = ref(6)
const selectedCategory = ref(null)
const viewMode = ref('card')
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
  Math.ceil(filteredCourses.value.length / pageSize.value)
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

watch(current, () => {
  courseTitleRef.value?.scrollIntoView({ behavior: 'smooth' })
})
</script>

<template>
  <main>
    <Breadcrumb :items="breadcrumbItems" />
    <PageHero :image="'https://www.shutterstock.com/image-illustration/watercolor-handprinted-banner-amethyst-crystals-260nw-1424370284.jpg'" />
    <section class="course-page">
      <section class="section-block">
        <Text>熱門課程</Text>

<div v-if="viewMode === 'card'" class="hot-area">
  <button
    class="arrow-btn prev-btn"
    :class="{ disabled: hotStartIndex === 0 }"
    :disabled="hotStartIndex === 0"
    @click="prevHotCourse"
  >
    ‹
  </button>

  <div class="hot-window">
    <div class="hot-track">
      <HotCourseCard
        v-for="course in visibleHotCourses"
        :key="course.id"
        :course="course"
      />
    </div>
  </div>

  <button
    class="arrow-btn next-btn"
    :class="{ disabled: hotStartIndex >= hotCourses.length - 3 }"
    :disabled="hotStartIndex >= hotCourses.length - 3"
    @click="nextHotCourse"
  >
    ›
  </button>
</div>

<div v-else class="hot-list-area">
  <HotCourseListItem
    v-for="course in hotCourses.slice(0, 3)"
    :key="course.id"
    :course="course"
  />
</div>
          
      
      </section>

      <section class="section-block">
        <div ref="courseTitleRef">
          <Text>所有課程</Text>
        </div>

        <div class="toolbar">
          <div class="category-area">
            <button
              class="category-btn"
              :class="{ active: !selectedCategory }"
              @click="showAllCategory"
            >
              全部課程
            </button>

            <button
              v-for="cat in categories"
              :key="cat"
              class="category-btn"
              :class="{ active: selectedCategory === cat }"
              @click="selectCategory(cat)"
            >
              {{ cat }}
            </button>
          </div>

          <div class="display-toggle">    <BarChartOutlined class="icon chart" :class="{ active: viewMode === 'list' }" @click="setViewMode('list')" />
            <TableOutlined class="icon table" :class="{ active: viewMode === 'card' }" @click="setViewMode('card')" />
        
          </div>
        </div>

        <div class="search-area">
          <input
            v-model="keywordInput"
            type="text"
            class="search-input"
            placeholder="輸入關鍵字"
            @keyup.enter="searchCourses"
          />

          <button class="search-btn" @click="searchCourses">
            <SearchOutlined />
            搜尋
          </button>
        </div>

        <button v-if="keyword" class="clear-btn" @click="clearSearch">
          清除搜尋
        </button>

        <div v-if="pageCourses.length === 0" class="empty-text">
          找不到符合條件的課程
        </div>

        <div v-else-if="viewMode === 'card'" class="cards-area">
          <CourseCard
            v-for="course in pageCourses"
            :key="course.id"
            :course="course"
          />
        </div>

        <div v-else class="lists-area">
          <CourseListItem
            v-for="course in pageCourses"
            :key="course.id"
            :course="course"
          />
        </div>

        <div class="page-area">
          <a-pagination
            v-model:current="current"
            :total="filteredCourses.length"
            :page-size="pageSize"
            :show-size-changer="false"
          />

          <p class="page-text">Page {{ current }} of {{ totalPages }}</p>
        </div>
      </section>
    </section>
  </main>
</template>

<style scoped>

.icon {
  width: 50px;
  height: 51px;
  border: 1px solid #3c3c3c;
  background-color: white;
  color: #3c3c3c;
  cursor: pointer;
  font-size: 20px;
  padding: 14px;
}

.course-page {
  width: min(1300px, calc(100% - 80px));
  margin: 0 auto;
  padding-top: 80px;
}

.section-block {
  margin-bottom: 80px;
}

/* 熱門課程 */
.hot-list-area{
  margin-top:40px;
  border-top: 1px solid #b1b0b0;

}

.hot-area {
  position: relative;
  width: 100%;
}

.hot-window {
  width: 100%;
  overflow: hidden;
}

.hot-track {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 47px;
}

.arrow-btn {
  position: absolute;
  top: 120px;
  z-index: 5;
  width: 38px;
  height: 38px;
  border: none;
  border-radius: 50%;
  background-color: #7d7d7d;
  color: white;
  font-size: 28px;
  cursor: pointer;
}

.prev-btn {
  left: -56px;
}

.next-btn {
  right: -56px;
}

.arrow-btn.disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

/* 分類與切換 */
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24px;
  margin: 32px 0 24px;
}

.category-area {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.category-btn {
  width: 120px;
  height: 51px;
  border-radius: 999px;
  border: 1px solid #7d7d7d;
  background-color: white;
  color: #3c3c3c;
  cursor: pointer;
  font-size: 16px;
}

.category-btn.active,
.category-btn:hover {
  background-color: #3c3c3c;
  color: white;
}

.view-switch {
  display: flex;
  flex-shrink: 0;
}

.switch-btn {
  width: 50px;
  height: 51px;
  border: 1px solid #3c3c3c;
  background-color: white;
  color: #3c3c3c;
  cursor: pointer;
  font-size: 20px;
}

.switch-btn:first-child {
  border-radius: 8px 0 0 8px;
}

.switch-btn:last-child {
  border-radius: 0 8px 8px 0;
}

.icon:hover {
  background-color: #938d6b;
  border-color: #938d6b;
  color: #F0E9E3;
}

.icon.active {
  background-color: #1e4620;
  border-color: #1e4620;
  color: #F0E9E3;
}

.table {
  border-radius: 0 10px 10px 0;
}

.chart {
  border-radius: 10px 0 0 10px;
  border-right: none;
}

/* 搜尋 */
.search-area {
  position: relative;
  display: flex;
  align-items: center;

  height: 62px;
  margin: 40px 0;

  border: 1px solid #b1b0b0;
  border-radius: 8px;

  background: #fff;
  overflow: hidden;
}

.search-input {
  flex: 1;
  height: 100%;

  padding: 0 120px 0 12px;

  border: none;
  outline: none;

  font-size: 1rem;
}

.search-btn {
  position: absolute;
  top: 3px;
  right: 3px;
  bottom: 3px;

  width: 93px;

  border: none;
  border-radius: 4px;

  background-color: #3c3c3c;
  color: #f9f6f0;

  cursor: pointer;

  font-size: 1rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.search-btn:hover {
  background-color: #2d2d2d;
}

.search-btn :deep(svg) {
  font-size: 20px;
} 


.clear-btn {
  height: 40px;
  padding: 0 20px;
  margin-bottom: 32px;
  border: 1px solid #3c3c3c;
  border-radius: 8px;
  background: white;
  color: #3c3c3c;
  cursor: pointer;
}

/* 所有課程卡片 */
.cards-area {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 47px;
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

/* 分頁 */
.page-area {
  margin-top: 48px;
  display: flex;
  justify-content: space-between;
  align-items: end;
}

.page-text {
  margin: 0;
  color: #3c3c3c;
}

.page-area :deep(.ant-pagination-item) {
  width: 45px;
  height: 45px;
  line-height: 45px;
  border-radius: 50%;
  border-color: #3c3c3c;
  background-color: white;
}

.page-area :deep(.ant-pagination-item a) {
  color: #3c3c3c;
}

.page-area :deep(.ant-pagination-item:hover) {
  background-color: #938d6b;
  border-color: #938d6b;
}

.page-area :deep(.ant-pagination-item:hover a) {
  color: #f0e9e3;
}

.page-area :deep(.ant-pagination-item-active) {
  background-color: #1e4620;
  border-color: #1e4620;
}

.page-area :deep(.ant-pagination-item-active a) {
  color: #f0e9e3;
}

.page-area :deep(.ant-pagination-prev),
.page-area :deep(.ant-pagination-next) {
  display: none;
}

/* 1440 */
@media (max-width: 1440px) {
  .course-page {
    width: calc(100% - 160px);
  }

  .cards-area,
  .hot-track {
    gap: 32px;
  }
}

/* 1024 */
@media (max-width: 1024px) {
  .course-page {
    width: calc(100% - 80px);
  }

  .cards-area,
  .hot-track {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

/* 768 */
@media (max-width: 768px) {
  .course-page {
    width: calc(100% - 64px);
    padding-top: 40px;
  }

  .toolbar {
    flex-direction: column;
  }

.display-toggle {
  align-self: flex-end;}

  .search-area {
    margin: 32px 0;
  }

  .cards-area,
  .hot-track {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .arrow-btn {
    display: none;
  }

  .page-area {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
}

/* 432 */
@media (max-width: 432px) {
  .course-page {
    width: calc(100% - 40px);
  }

  .category-btn {
    width: auto;
    min-width: 100px;
    height: 44px;
    padding: 0 16px;
  }

  .search-input {
    height: 52px;
  }

  .search-btn {
    width: 84px;
    height: 52px;
  }
}
</style>