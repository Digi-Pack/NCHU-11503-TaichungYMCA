<script setup>
import { computed } from "vue";
import testImg from "@/assets/img/首頁/首頁測試圖片.png"
import newsList from "@/data/news.js";
import Text from "@/components/Text.vue";
import HomeNewsCard from "@/components/HomeNewsCard.vue";
import { RightCircleOutlined } from "@ant-design/icons-vue";

const latestNews = computed(() =>
  [...newsList].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3)
  // 只取前三筆最新的資料
);
</script>
<template>
  <main class="home">
    <div class="hero-area container-full">
      <div class="hero-left">
        <!-- SVG 畫布：寬 1017、高 659整體概念：先把圖片鋪滿整個畫布，再用 clipPath 把超出形狀的部分裁掉 -->
        <svg viewBox="0 0 1017 659" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <!-- clipPath（裁切路徑）：定義一個不規則形狀的「模板」
          只有落在這個形狀內的圖片區域才會顯示，超出的部分會被隱藏 -->
            <clipPath id="shape-clip">
              <path
                d="M668.944 566C992.444 473 1016.94 206 1016.94 0H0C0.11168 119.333 -1.21954 418.1 0 658.5C312.944 648 385.444 647.501 668.944 566Z" />
            </clipPath>
          </defs>
          <!--
        image 標籤：載入圖片，尺寸設定為整個畫布大小 (1017x659)
        clip-path：套用上方定義的裁切路徑，超出形狀的圖片區域會被隱藏
        preserveAspectRatio="xMidYMid slice"：圖片等比例縮放並裁切以填滿區域，不拉伸變形
      -->
          <!-- 要換圖的話，更換image的href即可 -->
          <image :href="testImg" x="0" y="0" preserveAspectRatio="xMidYMid slice" clip-path="url(#shape-clip)" />
        </svg>
      </div>
      <div class="hero-right">
        <div class="text-content">
          <div class="title">
            <Text>臺中市</Text>
            <Text>北屯社區大學</Text>
          </div>
          <Text size="text-48" color="gray">落實終身學習、發揚北屯特色、致力在地公共事務、推動社會關懷</Text>
        </div>
      </div>
    </div>

    <div class="banner container-full">
      <img class="banner-img" src="https://picsum.photos/1905/400" alt="">
      <div class="banner-overlay"></div>
      <div class="banner-text-container">
        <Text size="text-48">深耕北屯、永續學習</Text>
        <Text size="text-36"
          color="gray">現今的世代快速變化，從社會各個層級到個人，都面臨著快速且急劇的轉變；環境的變動、社會基本價值快速演變，和人們對於新知和技能的需求，都讓我們進入一個終身學習的世代。</Text>
      </div>
    </div>

    <div class="news container-normal">
      <Text size="text-48">最新消息</Text>
      <div class="card-container">
        <HomeNewsCard v-for="news in latestNews" :key="news.id" :outPicture="news.outPicture" :title="news.title"
          :desc="news.desc" :date="news.date"></HomeNewsCard>
      </div>
    </div>

    <div class="location container-normal">
      <div class="location-left">
        <div class="location-text-container">
          <div class="location-title">
            <Text size="text-48">服務據點</Text>
            <RightCircleOutlined class="location-icon" />
          </div>
          <Text size="text-36" color="gray"
            class="location-desc">臺中市北屯(原大墩)社區大學開辦於民國九十一年六月，近期每年修習學員人次皆超過一萬多人次。臺中市政府自開辦社大以來，由四家開放至六家承辦單位，台中YMCA憑藉良好辦學經驗及成果，至今通過市府多次招標審核、獲選承辦大墩社大。於市政府每年定期之社大評鑑中，皆獲評審委員一致肯定，並連續多年獲得教育部肯定為辦學績優單位。</Text>
        </div>
      </div>
      <div class="location-right">
        <div class="img-wrapper">
          <img class="location-img" src="https://picsum.photos/650/525" alt="">
          <div class="location-overlay"></div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.container-full {
  width: 100%;
  margin: auto;
}

.container-normal {
  width: 85%;
  margin: auto;
}

.home {
  display: flex;
  flex-direction: column;
  gap: 80px 0;
}

.hero-area {
  /* background-color: black; */
  display: flex;
  gap: 0 75px;
}

.hero-left {
  width: 53%;
}

svg {
  display: block;
  width: 100%;
  height: auto;
}

image {
  width: 100%;
  height: 100%;
}

.hero-right {
  flex-grow: 1;
  /* background-color: beige; */
  display: flex;
  align-items: center;
}

.text-content {
  width: 100%;
  max-width: 750px;
  /* height: 300px; */
  /* background-color: brown; */
  display: flex;
  flex-direction: column;
  gap: 32px 0;
}

.title {
  display: flex;
  flex-direction: column;
  gap: 12px 0;
}

.banner {
  height: 400px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.banner-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.banner-overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(255, 255, 255, 0.5);
}

.banner-text-container {
  position: relative;
  z-index: 1;
  max-width: 760px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px 0;
}

.news {
  /* height: 670px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 74px 0;
  /* background-color: lightgray; */
}

.card-container {
  width: 100%;
  /* flex: 1; */
  display: flex;
  gap: 0 64px;
  /* background-color: aquamarine; */
}

.location {
  /* height: 525px; */
  display: flex;
  align-items: center;
  /* background-color: lightblue; */
  padding: 0 0 0 178px;
  position: relative;
}

.location-left {
  max-width: 760px;
  z-index: 1;
}

.location-text-container {
  display: flex;
  flex-direction: column;
  gap: 32px 0;
}

.location-title {
  display: flex;
  align-items: center;
  gap: 0 10px;
}

.location-icon {
  font-size: 3rem;
  color: #7D7D7D;
}

.location-desc {
  text-align: justify;
}

.location-right {
  flex: 1;
}

.img-wrapper {
  height: 525px;
  min-width: 650px;
  max-width: 650px;
  position: relative;
  left: -100px;
}

.location-img {
  width: 100%;
  height: 100%;
}

.location-overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(255, 255, 255, 0.5);
}
</style>
