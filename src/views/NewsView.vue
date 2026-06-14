<script setup>
import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import PageHero from "@/components/PageHero.vue";
import newsHeroImg from "@/assets/img/最新消息/最新消息測試圖.png";
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
const selectedCategory = ref(null);
const viewMode = ref(route.query.view === "list" ? "list" : "card");

function setViewMode(mode) {
  viewMode.value = mode;
}

const filteredNews = computed(() => {
  if (!selectedCategory.value) return newsList;
  return newsList.filter((news) => news.category === selectedCategory.value);
});

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
  router.push({ name: "news-detail", params: { id }, query: { from: "news", page: current.value, view: viewMode.value } });
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

      <div ref="newsTitleRef" id="news-title">
        <Text>最新消息</Text>
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

      <div class="cards-area" v-show="viewMode === 'card'">
        <HomeNewsCard v-for="news in cardNews" :key="news.id" :outPicture="news.outPicture" :title="news.title"
          :desc="news.desc" :date="news.date" @click="goToDetail(news.id)"></HomeNewsCard>
      </div>

      <div class="lists-area" v-show="viewMode === 'list'">
        <NewsList v-for="news in cardNews" :key="news.id" :title="news.title" :date="news.date" :content="previewContent(news.content)" @click="goToDetail(news.id)"></NewsList>
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
  width: 85%;
  margin: auto;
}

.main-section {
  /* height: 1410px; */
  /* background-color: lightcoral; */
  display: flex;
  flex-direction: column;
  gap: 40px 0;
}

.hero{
  margin-bottom: 80px;
}

.checkable-area {
  display: flex;
  justify-content: space-between;
}

.button-area {
  max-width: 800px;
  display: flex;
  flex-wrap: wrap;
  gap: 0 16px;
}

.icon {
  font-size: 28px;
  background-color: #FFFFFF;
  color: #3C3C3C;
  border: 2px solid #3C3C3C;
  padding: 10px;
  cursor: pointer;
}

.icon.active {
  background-color: #3C3C3C;
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
  background-color: #FFFFFF;
  border-color: #3C3C3C;
  color: #3C3C3C;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.category-btn:hover,
.category-btn.active {
  background-color: #3C3C3C;
  border-color: #3C3C3C;
  color: #F0E9E3;
}

.cards-area {
  width: 100%;
  flex: 1;
  padding-right: 10px;
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
  padding-right: 10px;
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
}

.page-area :deep(.ant-pagination-item a) {
  color: #3C3C3C;
}

.page-area :deep(.ant-pagination-item-active) {
  background-color: #7D7D7D;
  border-color: #3C3C3C;
}

.page-area :deep(.ant-pagination-item-active a) {
  color: #F0E9E3;
}

.page-area :deep(.ant-pagination-prev),
.page-area :deep(.ant-pagination-next) {
  display: none;
}
</style>