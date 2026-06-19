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
import { BarChartOutlined, TableOutlined } from "@ant-design/icons-vue";

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
  sessionStorage.setItem('newsScrollY', String(window.scrollY));
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

      <div class="newsTitle" ref="newsTitleRef" id="news-title">
        <Text weight="f-500" color="deep-gray">最新消息</Text>
      </div>

      <div class="checkable-area">
        <div class="button-area">
          <a-button v-for="cat in category" :key="cat" class="category-btn"
            :class="{ active: selectedCategory === cat }" @click="selectCategory(cat)">{{ cat }}</a-button>
        </div>
        <div class="display-toggle">
          <TableOutlined class="icon table" :class="{ active: viewMode === 'card' }" @click="setViewMode('card')" />
          <BarChartOutlined class="icon chart" :class="{ active: viewMode === 'list' }" @click="setViewMode('list')" />
        </div>
      </div>

      <div class="search-area">
        <input v-model="keywordInput" type="text" class="search-input" placeholder="請輸入標題或內文關鍵字"
          @keyup.enter="searchNews" />
        <button class="search-btn" @click="searchNews">搜尋</button>
        <button v-if="keyword" class="clear-btn" @click="clearSearch">清除</button>
      </div>

      <div class="cards-area" v-show="viewMode === 'card'">
        <HomeNewsCard v-for="news in cardNews" :key="news.id" :outPicture="news.outPicture" :title="news.title"
          :desc="news.desc" :date="news.date" @click="goToDetail(news.id)"></HomeNewsCard>
      </div>

      <div class="lists-area" v-show="viewMode === 'list'">
        <NewsList v-for="news in cardNews" :key="news.id" :title="news.title" :date="news.date"
          :content="previewContent(news.content)" @click="goToDetail(news.id)"></NewsList>
      </div>

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
  /* height: 1410px; */
  /* background-color: lightcoral; */
  display: flex;
  flex-direction: column;
  gap: 40px 0;
  margin-bottom: 80px;
}

.newsTitle {
  border-bottom: 3px solid #3C3C3C;
  padding-bottom: 2px;
}

.hero {
  margin-bottom: 80px;
}

.checkable-area {
  display: flex;
  justify-content: space-between;
}

.search-area {
  display: flex;
  gap: 12px;
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

.search-btn:hover {
  background-color: #938d6b;
  border-color: #938d6b;
  color: #f0e9e3;
}

.clear-btn {
  background-color: white;
  color: #3c3c3c;
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
  border-color: #1e4620;
  color: #F0E9E3;
}

.cards-area {
  width: 100%;
  flex: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 74px 64px;
  /* background-color: lightskyblue; */
}

.cards-area :deep(.card) {
  width: 100%;
  cursor: pointer;
}

.lists-area {
  width: 100%;
  /* background-color: lightblue; */
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
  border-color: #3C3C3C;
  background-color: white;
}

.page-area :deep(.ant-pagination-item a) {
  color: #3C3C3C;
}

.page-area :deep(.ant-pagination-item:hover) {
  background-color: #938d6b;
  border-color: #938d6b;
}

.page-area :deep(.ant-pagination-item:hover a) {
  color: #F0E9E3;
}

.page-area :deep(.ant-pagination-item-active) {
  background-color: #1e4620;
  border-color: #1e4620;
}

.page-area :deep(.ant-pagination-item-active a) {
  color: #F0E9E3;
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
}

@media (max-width: 440px) {
  .button-area {
    grid-template-columns: repeat(2, 1fr);
  }

  .search-area{
    gap: 0 6px;
  }

  .search-btn{
    min-width: 60px;
  }
}

</style>