<script setup>
import { ref, computed, watch } from 'vue'
import courses from '@/data/course.json'

import Breadcrumb from '@/components/Breadcrumb.vue'
import Text from '@/components/Text.vue'

import CourseCard from '@/components/CourseCard.vue'
import CourseListItem from '@/components/CourseListItem.vue'
import HotCourseCard from '@/components/HotCourseCard.vue'

import { BarsOutlined, AppstoreOutlined } from '@ant-design/icons-vue'

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
  if (hotStartIndex.value > 0) {
    hotStartIndex.value--
  }
}

function nextHotCourse() {
  if (hotStartIndex.value < hotCourses.value.length - 3) {
    hotStartIndex.value++
  }
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

const totalPages = computed(() => Math.ceil(filteredCourses.value.length / pageSize.value))

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
  current.value = 1
}

function showAllCategory() {
  selectedCategory.value = null
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

    <section class="course-page">
      <section class="section-block">
        <Text>熱門課程</Text>

        <div class="hot-area">
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
      </section>

      <section class="section-block">
        <div ref="courseTitleRef">
          <Text>所有課程</Text>
        </div>

        <div class="search-area">
          <input
            v-model="keywordInput"
            type="text"
            class="search-input"
            placeholder="請輸入課程名稱、老師、分類或據點"
            @keyup.enter="searchCourses"
          />

          <button class="search-btn" @click="searchCourses">搜尋</button>

          <button v-if="keyword" class="clear-btn" @click="clearSearch">
            清除
          </button>
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

          <div class="view-switch">
            <button
              class="switch-btn"
              :class="{ active: viewMode === 'list' }"
              @click="setViewMode('list')"
            >
              <BarsOutlined />
            </button>

            <button
              class="switch-btn"
              :class="{ active: viewMode === 'card' }"
              @click="setViewMode('card')"
            >
              <AppstoreOutlined />
            </button>
          </div>
        </div>

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
.course-page {
  padding-left: 300px;
  padding-right: 300px;
  padding-top: 80px;
}

.section-block {
  margin-bottom: 80px;
}

/* 熱門課程 */
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
  grid-template-columns: repeat(3, 401px);
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

/* 搜尋 */
.search-area {
  display: flex;
  gap: 12px;
  margin: 24px 0;
}

.search-input {
  flex: 1;
  height: 52px;
  padding: 0 20px;
  border: 1px solid #cfcfcf;
  border-radius: 999px;
  font-size: 1rem;
  outline: none;
}

.search-input:focus {
  border-color: #3c3c3c;
}

.search-btn,
.clear-btn {
  min-width: 88px;
  height: 52px;
  padding: 0 20px;
  border-radius: 999px;
  border: 1px solid #3c3c3c;
  cursor: pointer;
}

.search-btn {
  background-color: #3c3c3c;
  color: #f0e9e3;
}

.clear-btn {
  background-color: white;
  color: #3c3c3c;
}

/* 分類與切換 */
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24px;
  margin-bottom: 32px;
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
  gap: 8px;
  flex-shrink: 0;
}

.switch-btn {
  width: 40px;
  height: 36px;
  border: 1px solid #3c3c3c;
  background-color: white;
  color: #3c3c3c;
  cursor: pointer;
}

.switch-btn.active,
.switch-btn:hover {
  background-color: #3c3c3c;
  color: white;
}

/* 所有課程卡片 */
.cards-area {
  display: grid;
  grid-template-columns: repeat(3, 401px);
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
  align-items: center;
}

.page-text {
  margin: 0;
  color: #3c3c3c;
}

.page-area :deep(.ant-pagination-item) {
  border-radius: 50%;
}

.page-area :deep(.ant-pagination-item-active) {
  background-color: #7d7d7d;
  border-color: #3c3c3c;
}

.page-area :deep(.ant-pagination-item-active a) {
  color: white;
}

.page-area :deep(.ant-pagination-prev),
.page-area :deep(.ant-pagination-next) {
  display: none;
}

/* RWD 暫時保留，之後再細修 */
@media (max-width: 1440px) {
  .course-page {
    padding-left: 160px;
    padding-right: 160px;
  }

  .cards-area,
  .hot-track {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 32px;
  }
}

@media (max-width: 1024px) {
  .course-page {
    padding-left: 80px;
    padding-right: 80px;
  }

  .cards-area,
  .hot-track {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .course-page {
    padding-left: 32px;
    padding-right: 32px;
    padding-top: 40px;
  }

  .search-area {
    flex-direction: column;
  }

  .toolbar {
    flex-direction: column;
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

@media (max-width: 390px) {
  .course-page {
    padding-left: 20px;
    padding-right: 20px;
  }
}
</style>