<script setup>

import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter, onBeforeRouteLeave } from 'vue-router'
import courses from '@/data/course.json'

import Breadcrumb from '@/components/Breadcrumb.vue'
import Text from '@/components/Text.vue'
import CourseCard from '@/components/CourseCard.vue'
import CourseListItem from '@/components/CourseListItem.vue'
import HotCourseCard from '@/components/HotCourseCard.vue'
import HotCourseListItem from '@/components/HotCourseListItem.vue'
import PageHero from '@/components/PageHero.vue'
import NotFoundBlock from '@/components/NotFoundBlock.vue'
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
const selectedCategory = ref(route.query.category || null)
const viewMode = ref(route.query.view || 'card')
const courseTitleRef = ref(null)

const keywordInput = ref('')
const keyword = ref('')

const hotCourses = computed(() => courses.slice(0, 5))
const hotListLimit = ref(3)
const hotStartIndex = ref(0)
const hotTrackRef = ref(null)
const activeHotIndex = ref(0)
const isMobileView = ref(false)
let mediaQuery = null

function onMediaChange(e) {
  isMobileView.value = e.matches
  activeHotIndex.value = 0
}

onMounted(() => {
  mediaQuery = window.matchMedia('(max-width: 768px)')
  isMobileView.value = mediaQuery.matches
  mediaQuery.addEventListener('change', onMediaChange)
})

onUnmounted(() => {
  mediaQuery?.removeEventListener('change', onMediaChange)
})

const visibleHotCourses = computed(() => {
  return hotCourses.value.slice(hotStartIndex.value, hotStartIndex.value + 3)
})

const displayedHotCourses = computed(() =>
  isMobileView.value ? hotCourses.value : visibleHotCourses.value
)

function prevHotCourse() {
  if (hotStartIndex.value > 0) hotStartIndex.value--
}

function nextHotCourse() {
  if (hotStartIndex.value < hotCourses.value.length - 3) hotStartIndex.value++
}

function scrollToHot(index) {
  if (!hotTrackRef.value) return
  const cards = hotTrackRef.value.children
  if (cards[index]) {
    cards[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
  }
  activeHotIndex.value = index
}

function onHotScroll() {
  if (!hotTrackRef.value) return
  const track = hotTrackRef.value
  const cards = Array.from(track.children)
  const scrollLeft = track.scrollLeft
  let closest = 0
  let minDist = Infinity
  cards.forEach((card, i) => {
    const dist = Math.abs(card.offsetLeft - scrollLeft)
    if (dist < minDist) { minDist = dist; closest = i }
  })
  activeHotIndex.value = closest
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
  selectedCategory.value = null
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

watch(current, (page) => {
  router.replace({
    query: {
      ...route.query,
      page,
      view: viewMode.value,
      category: selectedCategory.value || undefined,
    },
  })

  courseTitleRef.value?.scrollIntoView({
    behavior: 'smooth',
  })
})

watch(viewMode, (view) => {
  router.replace({
    query: {
      ...route.query,
      page: current.value,
      view,
      category: selectedCategory.value || undefined,
    },
  })
})

watch(selectedCategory, (category) => {
  router.replace({
    query: {
      ...route.query,
      page: current.value,
      view: viewMode.value,
      category: category || undefined,
    },
  })
})

watch(
  () => route.query.page,
  (newPage) => {
    current.value = Number(newPage) || 1
  },
  { immediate: true },
)

onBeforeRouteLeave((to) => {
  if (to.name === 'course-detail') {
    sessionStorage.setItem('scrollY_courses', String(window.scrollY))
  }
})
</script>

<template>
  <div>
    <Breadcrumb :items="breadcrumbItems" />
    <PageHero :image="courseBanner" />

    <section class="course-page">
      <section class="section-block">
        <Text class="green">熱門課程</Text>

        <div v-if="viewMode === 'card'" class="hot-area">
          <button class="arrow-btn prev-btn" :class="{ disabled: hotStartIndex === 0 }" :disabled="hotStartIndex === 0"
            @click="prevHotCourse">
            ‹
          </button>

          <div class="hot-window">
            <div class="hot-track" ref="hotTrackRef" @scroll="onHotScroll">
              <HotCourseCard v-for="course in displayedHotCourses" :key="course.id" :course="course" />
            </div>
          </div>

          <button class="arrow-btn next-btn" :class="{ disabled: hotStartIndex >= hotCourses.length - 3 }"
            :disabled="hotStartIndex >= hotCourses.length - 3" @click="nextHotCourse">
            ›
          </button>

          <div class="hot-pagination">
            <button
              v-for="(_, i) in hotCourses"
              :key="i"
              class="hot-dot"
              :class="{ active: activeHotIndex === i }"
              @click="scrollToHot(i)"
            />
          </div>
          </div>

          <div v-else class="hot-list-area">
            <HotCourseListItem v-for="course in hotCourses.slice(0, hotListLimit)" :key="course.id" :course="course" />
            <button v-if="hotListLimit < hotCourses.length" class="show-more-btn" @click="hotListLimit = hotCourses.length">
              顯示更多
            </button>
            <button v-else class="show-more-btn" @click="hotListLimit = 3">
              顯示較少
            </button>
          </div>
      </section>

      <section class="section-block">
        <div ref="courseTitleRef">
          <Text class="green">所有課程</Text>
        </div>
        <div class="search-area">
          <input v-model="keywordInput" type="text" class="search-input" placeholder="輸入課名、老師、時間等"
            @keyup.enter="searchCourses" />

          <button class="search-btn" @click="searchCourses">
            <SearchOutlined />
            搜尋
          </button>
        </div>

        <div class="toolbar">
          <div class="toolbar-row">
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
              <a-tooltip title="列表檢視">
                <BarChartOutlined class="icon chart" :class="{ active: viewMode === 'list' }"
                  @click="setViewMode('list')" />
              </a-tooltip>
              <a-tooltip title="卡片檢視">
                <TableOutlined class="icon table" :class="{ active: viewMode === 'card' }" @click="setViewMode('card')" />
              </a-tooltip>
            </div>
          </div>

          <button v-if="keyword" class="clear-btn" @click="clearSearch">清除搜尋</button>
        </div>
        <NotFoundBlock
          v-if="pageCourses.length === 0"
          :show-code="false"
          title="找不到符合條件的課程"
          description="請嘗試其他關鍵字或分類"
        />

        <template v-else>
          <div v-if="viewMode === 'card'" class="cards-area">
            <CourseCard v-for="course in pageCourses" :key="course.id" :course="course" />
          </div>

          <div v-else class="lists-area">
            <CourseListItem v-for="course in pageCourses" :key="course.id" :course="course" />
          </div>
        </template>

        <div v-if="filteredCourses.length > 0" class="page-area">
          <a-pagination v-model:current="current" :total="filteredCourses.length" :page-size="pageSize"
            :show-size-changer="false" />

          <Text size="text-24" color="deep-gray">第 {{ current }} 頁，共 {{ totalPages }} 頁</Text>
        </div>
      </section>
    </section>
  </div>
</template>

<style scoped>
.icon {
  font-size: 32px;
  background-color: #f9f6f0;
  color: #1e4620;
  border: 2px solid #1e4620;
  padding: 10px;
  cursor: pointer;
  width: 51px;
  height: 51px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.course-page {
  width: 100%;
  max-width: 1300px;
  box-sizing: border-box;
  margin: 0 auto;
  padding: 80px 0 0 0;
}

.section-block {
  margin-bottom: 40px;
}

.section-block > :first-child {
  width: 100%;
  padding-bottom: 8px;
  margin-bottom: 24px;
  border-bottom: 2px solid #1e4620;
  font-weight: 500;
}

.green {
  color: #1e4620;
}

/* 熱門課程：桌機保留箭頭切換 */
.hot-area {
  position: relative;
  width: 100%;
}

.hot-window {
  width: 100%;
  overflow: hidden;
}

.hot-track {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 48px 40px;
}

.hot-track > * {
  width: 100%;
  min-width: 0;
}

/* 所有課程 */
.cards-area {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 48px 40px;
}

.cards-area > * {
  width: 100%;
  min-width: 0;
}

/* 熱門課程列表 */
.hot-list-area {
  margin-top: 40px;
  /* border-top: 1px solid #b1b0b0; */
}

.show-more-btn {
  display: block;
  margin: 8px auto 0;
  padding: 0 24px;
  height: 44px;
  border: 1px solid #1e4620;
  border-radius: 8px;
  background: #f9f6f0;
  color: #1e4620;
  font-size: 1.125rem;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.show-more-btn:hover {
  background-color: #938d6b;
  border-color: #938d6b;
  color: #f9f6f0;
}

.hot-pagination {
  display: none;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
}

.hot-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  padding: 0;
  background-color: #b1b0b0;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.hot-dot.active {
  background-color: #1e4620;
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
  background: #f0e9e3;
  color: #7d7d7d;
  font-size: 48px;
  line-height: 45px;
  display: flex;
  justify-content: center;
  cursor: pointer;
}

.prev-btn {
  left: 0;
}

.next-btn {
  right: 0;
}

.arrow-btn.disabled {
  cursor: not-allowed;
  opacity: 0.45;
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
  font-size: 1.25rem;
}

.search-btn {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100px;
  border: none;
  border-radius: 0 4px 4px 0;
  background-color: #1e4620;
  color: #f9f6f0;
  cursor: pointer;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.search-area:focus-within {
  border-color: #d96b27;
}

.search-btn :deep(svg) {
  font-size: 21px;
}

/* 分類 + 檢視切換 */
.toolbar {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 40px;
}

.toolbar-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
}

.category-area {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  min-width: 0;
}

.category-btn {
  /* width: 120px; */
  height: 51px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 20px;
  border: 1px solid #1e4620;
  background-color: #f9f6f0;
  color: #1e4620;
  cursor: pointer;

  font-size: 1.25rem;
  font-weight: 500;
  white-space: nowrap;

  padding: 0 16px;
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
}

.chart {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  border-right: none;
}

.table {
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  border-left: none;
}

.icon:hover {
  background-color: #938d6b;
  border-color: #938d6b;
  color: #f0e9e3;
}

.icon.active {
  background-color: #1e4620;
  border-color: #1e4620;
  color: #f0e9e3;
}

.clear-btn {
  /* height: 40px; */
  width: fit-content;
  padding: 10px 20px;
  border: 1px solid #1e4620;
  border-radius: 8px;
  background: #f9f6f0;
  color: #1e4620;
  cursor: pointer;
  font-size:1.5rem;
}

.clear-btn:hover {
  background-color: #938d6b;
  border-color: #938d6b;
  color: #f0e9e3;
}

.lists-area {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
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
}

.page-area :deep(.ant-pagination) {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 0;
}

.page-area :deep(.ant-pagination-item) {
  width: 45px;
  height: 45px;
  line-height: 45px;
  border-radius: 50%;
  border: 2px solid #1e4620;
  background-color: transparent;
}

.page-area :deep(.ant-pagination-item a) {
  color: #1e4620;
  font-size: 1.125rem;
}

.page-area :deep(.ant-pagination-item:hover) {
  background-color: #d1c8c1;
}

.page-area :deep(.ant-pagination-item-active) {
  background-color: #d1c8c1;
  border-color: #1e4620;
}

.page-area :deep(.ant-pagination-item-active a) {
  color: #1e4620;
}

.page-area :deep(.ant-pagination-prev),
.page-area :deep(.ant-pagination-next) {
  display: none;
}

/* 1400 */
@media (max-width: 1400px) {
  .course-page {
    padding-left: 80px;
    padding-right: 80px;
  }
}

/* 1200 以下：toolbar 全部變化 */
@media (max-width: 1200px) {
  .toolbar-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }

  .display-toggle {
    order: 1;
    align-self: flex-start;
  }

  .category-area {
    order: 2;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }

  .category-btn {
    width: 100%;
  }

  .clear-btn {
    width: 100%;
  }
}

/* 1100 以下：熱門課程改成水平滑動 */
@media (max-width: 1100px) {
  .course-page {
    padding: 64px 40px 40px;
  }

  .arrow-btn {
    display: flex;
  }

    .prev-btn {
    left: 8px;
  }

  .next-btn {
    right: 8px;
  }

  .hot-window {
    overflow: visible;
  }

  .hot-track {
    display: flex;
    gap: 24px;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    padding-bottom: 16px;
    -webkit-overflow-scrolling: touch;
  }

  .hot-track::-webkit-scrollbar {
    display: none;
  }

  .hot-track > * {
    flex: 0 0 calc(50% - 12px);
    scroll-snap-align: start;
  }

  .cards-area {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 32px;
  }
}

/* 1550 */
@media (max-width: 1550px) {
  .page-area {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
}

/* 1024 */
@media (max-width: 1024px) {
  .page-area {
    margin-top: 20px;
  }
}

/* 768 */
@media (max-width: 768px) {
  .course-page {
    padding: 48px 16px 0;
  }
  .arrow-btn {
    display: none;
  }

  .hot-pagination {
    display: flex;
  }

  .section-block {
    margin-bottom: 48px;
  }

  .hot-track > * {
    flex: 0 0 100%;
  }

  .cards-area {
    grid-template-columns: 1fr;
    gap: 32px;
  }

}

/* 650 */
@media (max-width: 650px) {

}

/* 432 */
@media (max-width: 432px) {
  .category-area {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  .category-btn {
    width: 100%;
    height: 51px;
    padding: 0 12px;
    font-size: 1.25rem;
    font-weight: 500;
  }

  .hot-track > * {
    flex: 0 0 88%;
  }

}

/* 390 */
@media (max-width: 390px) {

  .category-area {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .category-btn {
    min-width: 0;
    height: 51px;
    font-size: 1.25rem;
    font-weight: 500;
  }

  .hot-track > * {
    flex: 0 0 90%;
  }

  .page-area :deep(.ant-pagination-item) {
    width: 44px;
    height: 44px;
    line-height: 44px;
  }
}
</style>