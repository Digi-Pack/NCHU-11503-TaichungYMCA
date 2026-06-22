<script setup>
import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import PageHero from "@/components/PageHero.vue";
import newsHeroImg from "@/assets/img/news/newsHeroImg.png";
import Text from "@/components/Text.vue";
import HomeNewsCard from "@/components/HomeNewsCard.vue";
import NewsList from "@/components/NewsList.vue";
import Breadcrumb from "@/components/Breadcrumb.vue";
import newsList from "@/data/news.js";
import { BarChartOutlined, TableOutlined, SearchOutlined } from "@ant-design/icons-vue";

const route = useRoute();

const breadcrumbItems = [{ text: "首頁", to: "/" }, { text: "最新消息" }];
const category = ["社大新鮮事", "高齡預防照護", "數位課程", "食農教育", "都市農業", "社區成果分享"];
const current = ref(Number(route.query.page) || 1);
const pageSize = 6;
const selectedCategory = ref(route.query.category || null);
const viewMode = ref(route.query.view === "list" ? "list" : "card");
const keywordInput = ref('');
const keyword = ref('');

function setViewMode(mode) {
  viewMode.value = mode;
}

const filteredNews = computed(() => {
  const searchText = keyword.value.trim().toLowerCase();
  return newsList.filter((news) => {
    const matchCategory = !selectedCategory.value || news.category === selectedCategory.value;
    const matchKeyword =
      !searchText ||
      news.title?.toLowerCase().includes(searchText) ||
      news.content?.join('').toLowerCase().includes(searchText);
    return matchCategory && matchKeyword;
  });
});

function searchNews() {
  keyword.value = keywordInput.value;
  current.value = 1;
}

function clearSearch() {
  keywordInput.value = '';
  keyword.value = '';
  current.value = 1;
}

const cardNews = computed(() => {
  const start = (current.value - 1) * pageSize;
  return filteredNews.value.slice(start, start + pageSize);
});
const totalPages = computed(() => Math.ceil(filteredNews.value.length / pageSize));

function selectCategory(cat) {
  selectedCategory.value = selectedCategory.value === cat ? null : cat;
  current.value = 1;
}

function previewContent(content) {
  return content.join("").slice(0, 200);
}

const router = useRouter();

function goToDetail(id) {
  sessionStorage.setItem('scrollY_news', String(window.scrollY));
  router.push({ name: "news-detail", params: { id }, query: { from: "news", page: current.value, view: viewMode.value, category: selectedCategory.value } });
}


const newsTitleRef = ref(null);

watch(current, (page) => {
  router.replace({ query: { ...route.query, page } });
  newsTitleRef.value?.scrollIntoView({ behavior: "smooth" });
});

watch(viewMode, (view) => {
  router.replace({ query: { ...route.query, view } });
});
</script>

<template>
  <main>
    <Breadcrumb :items="breadcrumbItems" />

    <PageHero class="hero" :image="newsHeroImg"></PageHero>

    <div class="container-normal main-section">

      <div class="newsTitle" ref="newsTitleRef">
        <Text weight="f-500" color="primary-d-g">最新消息</Text>
      </div>

      <div class="search-checkable">
        <div class="search-area">
          <input v-model="keywordInput" type="text" class="search-input" placeholder="請輸入標題或內文關鍵字"
            @keyup.enter="searchNews" />
          <button class="search-btn" @click="searchNews">
            <SearchOutlined />
            搜尋
          </button>
        </div>

        <div class="checkable-area">
          <div class="button-area">
            <a-button v-for="cat in category" :key="cat" class="category-btn"
              :class="{ active: selectedCategory === cat }" @click="selectCategory(cat)">{{ cat }}</a-button>
          </div>
          <div class="display-toggle">
            <a-tooltip title="卡片檢視">
              <TableOutlined class="icon table" :class="{ active: viewMode === 'card' }" @click="setViewMode('card')" />
            </a-tooltip>
            <a-tooltip title="列表檢視">
              <BarChartOutlined class="icon chart" :class="{ active: viewMode === 'list' }"
                @click="setViewMode('list')" />
            </a-tooltip>
          </div>
        </div>

        <button v-if="keyword" class="clear-btn" @click="clearSearch">清除搜尋</button>
      </div>



      <div v-if="cardNews.length === 0" class="empty-text">
        找不到符合條件的消息
      </div>

      <template v-else>
        <div class="cards-area" v-show="viewMode === 'card'">
          <HomeNewsCard v-for="news in cardNews" :key="news.id" :outPicture="news.outPicture" :title="news.title"
            :desc="news.desc" :date="news.date" @click="goToDetail(news.id)"></HomeNewsCard>
        </div>

        <div class="lists-area" v-show="viewMode === 'list'">
          <NewsList v-for="news in cardNews" :key="news.id" :title="news.title" :date="news.date"
            :content="previewContent(news.content)" @click="goToDetail(news.id)"></NewsList>
        </div>
      </template>

      <div class="page-area">
        <a-pagination v-model:current="current" :total="filteredNews.length" :page-size="pageSize" />
        <Text size="text-24" color="deep-gray">Page {{ current }} of {{ totalPages }}</Text>
      </div>
    </div>
  </main>
</template>

<style scoped>
.container-normal {
  width: 100%;
  max-width: 1300px;
  box-sizing: border-box;
  margin: 0 auto;
}

.main-section {
  display: flex;
  flex-direction: column;
  gap: 40px 0;
  margin-bottom: 80px;
}

.newsTitle {
  border-bottom: 3px solid #1e4620;
  padding-bottom: 2px;
}

.hero {
  margin-bottom: 80px;
}

.search-checkable{
  display: flex;
  flex-direction: column;
  gap: 20px 0;
}

.checkable-area {
  display: flex;
  justify-content: space-between;
}

.search-area {
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid #b1b0b0;
  border-radius: 16px;
  background: #fff;
  overflow: hidden;
}

.search-input {
  flex: 1;
  height: 62px;
  padding: 0 120px 0 12px;
  border: none;
  outline: none;
  font-size: 1rem;
}

.search-input::placeholder {
  font-size: 1.125rem;
}

.search-btn {
  position: absolute;
  right: 0px;
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
  background-color: #938d6b;
}

.search-btn :deep(svg) {
  font-size: 20px;
}

.clear-btn {
  height: 40px;
  padding: 0 20px;
  border: 1px solid #1e4620;
  border-radius: 8px;
  background: #f9f6f0;
  color: #1e4620;
  cursor: pointer;
  align-self: start;
}

.clear-btn:hover {
  background-color: #938d6b;
  border-color: #938d6b;
  color: #f0e9e3;
}

.button-area {
  max-width: 800px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px 16px;
}

.icon {
  font-size: 28px;
  background-color: #F9F6F0;
  color: #1e4620;
  border: 2px solid #1e4620;
  padding: 10px;
  cursor: pointer;
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
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  border-right: none;
}

.chart {
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  border-left: none;
}

.category-btn {
  width: calc(800px / 6 - 16px);
  height: 51px;
  border-radius: 20px;
  background-color: #F9F6F0;
  border-color: #1e4620;
  color: #1e4620;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.category-btn:hover {
  background-color: #938d6b;
  border-color: #938d6b;
  color: #F0E9E3;
}

.category-btn.active {
  background-color: #1e4620;
  border-color: #938d6b;
  color: #F0E9E3;
}

.cards-area {
  width: 100%;
  flex: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 74px 64px;
}

.cards-area :deep(.card) {
  width: 100%;
  cursor: pointer;
}

.empty-text {
  padding: 80px 0;
  text-align: center;
  color: #757575;
  font-size: 1.2rem;
}

.lists-area {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px 0;
}

.lists-area :deep(.list) {
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.lists-area :deep(.list:hover) {
  background-color: #FFF8DC;
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


@media (max-width: 1400px) {
  .container-normal {
    padding: 0 80px;
  }

  .page-area {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
}

@media (max-width: 1200px) {
  .hero {
    margin-bottom: 40px;
  }

  .checkable-area {
    flex-direction: column-reverse;
    align-items: flex-start;
    gap: 20px;
  }
}

@media (max-width: 1100px) {
  .container-normal {
    padding: 0 40px;
  }

  .cards-area {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
}

@media(max-width:1024px) {
  .main-section {
    gap: 20px 0;
  }
}

@media (max-width: 768px) {
  .container-normal {
    padding: 0 16px;
  }

  .cards-area {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .checkable-area {
    flex-direction: column-reverse;
    gap: 16px;
  }
}

@media (max-width: 560px) {
  .button-area {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: 100%;
    max-width: 100%;
  }

  .category-btn {
    width: 100%;
  }

  .clear-btn {
    align-self: stretch;
  }
}

@media (max-width: 440px) {
  .button-area {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 432px) {
  .search-input {
    height: 52px;
  }

  .search-btn {
    width: 84px;
  }
}
</style>