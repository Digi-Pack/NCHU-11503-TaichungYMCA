<script setup>
import { ref, computed } from "vue";
import PageHero from "@/components/PageHero.vue";
import newsHeroImg from "@/assets/img/最新消息/最新消息測試圖.png";
import Text from "@/components/Text.vue";
import HomeNewsCard from "@/components/HomeNewsCard.vue";
import newsList from "@/data/news.js";
import { BarChartOutlined, TableOutlined } from "@ant-design/icons-vue";

const category = ["社大新鮮事", "高齡預防照護", "數位課程", "食農教育", "都市農業", "社區成果分享"];
const current = ref(1);
const pageSize = 6;
const selectedCategories = ref([]);

const filteredNews = computed(() => {
  if (selectedCategories.value.length === 0) return newsList;
  return newsList.filter((news) => selectedCategories.value.includes(news.category));
});

const cardNews = computed(() => {
  const start = (current.value - 1) * pageSize;
  return filteredNews.value.slice(start, start + pageSize);
});
const totalPages = computed(() => Math.ceil(filteredNews.value.length / pageSize));

function selectCategory(cat) {
  const index = selectedCategories.value.indexOf(cat);
  if (index === -1) {
    selectedCategories.value.push(cat);
  } else {
    selectedCategories.value.splice(index, 1);
  }
  current.value = 1;
}
</script>

<template>
  <section>
    <div class="breadcrumb">
      <a-breadcrumb separator=">">
        <a-breadcrumb-item>首頁</a-breadcrumb-item>
        <a-breadcrumb-item>最新消息</a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <PageHero :image="newsHeroImg"></PageHero>
    <div class="container-normal main-section">
      <Text>最新消息</Text>
      <div class="checkable-area">
        <div class="button-area">
          <a-button v-for="cat in category" :key="cat" class="category-btn"
            :class="{ active: selectedCategories.includes(cat) }" @click="selectCategory(cat)">{{ cat }}</a-button>
        </div>
        <div class="display-toggle">
          <TableOutlined class="icon table" />
          <BarChartOutlined class="icon chart" />
        </div>
      </div>
      <div class="cards-area">
        <HomeNewsCard v-for="news in cardNews" :key="news.id" :outPicture="news.outPicture" :title="news.title"
          :desc="news.desc" :date="news.date"></HomeNewsCard>
      </div>
      <div class="page-area">
        <a-pagination v-model:current="current" :total="filteredNews.length" :page-size="pageSize" />
        <Text size="text-24" color="deep-gray">Page {{ current }} of {{ totalPages }}</Text>
      </div>
    </div>
  </section>
</template>

<style scoped>
.breadcrumb {
  padding: 10px 0;
}

.container-normal {
  width: 90%;
  margin: auto;
}

.main-section {
  /* height: 1410px; */
  background-color: lightcoral;
  display: flex;
  flex-direction: column;
  gap: 40px 0;
}

.checkable-area {
  display: flex;
  justify-content: space-between;
}

.button-area {
  display: flex;
  gap: 0 16px;
}

.icon{
font-size: 28px;
background-color: #FFFFFF;
color: #3C3C3C;
border: 2px solid #3C3C3C;
padding: 10px;
}

.table{
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}

.chart{
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}

.category-btn {
  width: 120px;
  height: 51px;
  border-radius: 20px;
  background-color: #FFFFFF;
  border-color: #3C3C3C;
  color: #3C3C3C;
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
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 74px 64px;
  background-color: lightskyblue;
}

.cards-area :deep(.card) {
  width: 100%;
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