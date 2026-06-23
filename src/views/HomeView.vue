<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import heroImg from "@/assets/img/home/heroImg.png"
import bannerImg from "@/assets/img/home/bannerImg.webp"
import locationImg from "@/assets/img/home/locationImg.png"
import newsList from "@/data/news.js";
import Text from "@/components/Text.vue";
import HomeNewsCard from "@/components/HomeNewsCard.vue";
import { RightCircleOutlined } from "@ant-design/icons-vue";
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const latestNews = computed(() =>
  [...newsList].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 4)
);

const router = useRouter();

function goToDetail(id) {
  router.push({ name: "news-detail", params: { id }, query: { from: "home" } });
}

const vReveal = {
  beforeMount(el, binding) {
    el.classList.add("reveal-hidden");
    const index = binding.value?.index ?? 0;
    el.style.transitionDelay = `${index * 0.12}s`;
  },
  mounted(el, binding) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("reveal-visible");
            observer.unobserve(el);
          }
        });
      },
      {
        threshold: binding.value?.threshold ?? 0.15,
        rootMargin: binding.value?.rootMargin ?? "0px 0px -10% 0px",
      }
    );
    observer.observe(el);
    el._revealObserver = observer;
  },
  unmounted(el) {
    el._revealObserver?.disconnect();
  },
};
</script>
<template>
  <main class="home">
    <div class="hero-area container-full">
      <div class="hero-left">
        <!-- SVG 畫布：寬 1017、高 659整體概念：先把圖片鋪滿整個畫布，再用 clipPath 把超出形狀的部分裁掉 -->
        <svg viewBox="0 0 1017 659" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
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
          <image :href="heroImg" x="0" y="0" preserveAspectRatio="xMidYMid slice" clip-path="url(#shape-clip)" />
        </svg>
      </div>
      <div class="hero-right">
        <div class="text-content">
          <div class="title">
            <Text color="primary-d-g" weight="f-500">臺中市</Text>
            <Text color="primary-d-g" weight="f-500">北屯社區大學</Text>
          </div>
          <Text size="text-48" color="gray" class="sub-title">落實終身學習、發揚北屯特色、致力在地公共事務、推動社會關懷</Text>
          <RouterLink to="/courses" class="courses-btn">查看最新課程 →</RouterLink>
        </div>
      </div>
    </div>

    <div class="banner container-full" v-reveal>
      <img class="banner-img" :src="bannerImg" alt="照護人員與長輩交談的情景">
      <div class="banner-overlay"></div>
      <div class="banner-text-container">
        <Text size="text-48" color="primary-d-o" weight="f-500">深耕北屯、永續學習</Text>
        <Text size="text-36" class="banner-text"
          color="gray">現今的世代快速變化，從社會各個層級到個人，都面臨著快速且急劇的轉變；環境的變動、社會基本價值快速演變，和人們對於新知和技能的需求，都讓我們進入一個終身學習的世代。</Text>
      </div>
    </div>

    <div class="news container-normal" id="latest-news">
      <div class="news-title-row" @click="router.push('/news')">
        <Text size="text-48" color="primary-d-g" weight="f-500">最新消息</Text>
        <RightCircleOutlined class="news-icon" />
      </div>
      <div class="card-container">
        <HomeNewsCard v-for="(news, index) in latestNews" :key="news.id" v-reveal="{ index }"
          :outPicture="news.outPicture" :title="news.title"
          :desc="news.desc" :date="news.date" @click="goToDetail(news.id)"></HomeNewsCard>
      </div>

      <div class="news-swiper" v-reveal>
        <Swiper :modules="[Pagination]" :slides-per-view="1" :pagination="{ clickable: true }">
          <SwiperSlide v-for="news in latestNews" :key="news.id">
            <HomeNewsCard :outPicture="news.outPicture" :title="news.title"
              :desc="news.desc" :date="news.date" @click="goToDetail(news.id)" />
          </SwiperSlide>
        </Swiper>
      </div>

    </div>

    <div class="location container-normal" v-reveal @click="router.push('/locations')">
      <div class="location-left">
        <div class="location-text-container">
          <div class="location-title">
            <Text size="text-48" weight="f-500" color="primary-d-g">服務據點</Text>
            <RightCircleOutlined class="location-icon" />
          </div>
          <Text size="text-36" color="gray"
            class="location-desc">臺中市北屯（原大墩）社區大學自民國 91 年起由台中 YMCA 承辦，深耕終身教育，每年吸引逾萬人次學員修習。憑藉優異的辦學成果，不僅歷年均獲市府評鑑高度肯定，更連續多年榮獲教育部評選為「辦學績優單位」。</Text>
        </div>
      </div>
      <div class="location-right">
        <div class="img-wrapper">
          <img class="location-img" :src="locationImg" alt="服務據點">
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.container-full {
  width: 100%;
}

.home {
  display: flex;
  flex-direction: column;
  gap: 80px 0;
}

.hero-area {
  display: flex;
  gap: 0 75px;
  overflow: hidden;
  min-height: 500px;
}

@keyframes slide-in-left {
  from { transform: translateX(-120%); }
  to   { transform: translateX(0); }
}

@keyframes slide-in-right {
  from { transform: translateX(120%); }
  to   { transform: translateX(0); }
}

.hero-left {
  width: 53%;
  animation: slide-in-left 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

svg {
  display: block;
  width: 100%;
  height: 100%;
}

image {
  width: 100%;
  height: 100%;
}


.hero-right {
  flex-grow: 1;
  display: flex;
  align-items: center;
  animation: slide-in-right 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.5s both;
}

.text-content {
  width: 100%;
  max-width: 750px;
  display: flex;
  flex-direction: column;
  gap: 32px 0;
  padding: 20px 20px 0 0;
}

.title {
  display: flex;
  flex-direction: column;
  gap: 12px 0;
}

.sub-title{
  text-align: justify;
  line-height: 1.5;
}

.courses-btn {
  display: inline-block;
  padding: 14px 28px;
  border-radius: 6px;
  background-color: #1e4620;
  color: #f0e9e3;
  text-decoration: none;
  font-size: 1.25rem;
  align-self: flex-start;
  font-weight: 500;
}

.courses-btn:hover {
  background-color: #938d6b;
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
  object-fit: cover;
  object-position: center 20%;
  -webkit-mask-image: linear-gradient(to bottom,
      transparent 0%, black 25%, black 75%, transparent 100%);
  mask-image: linear-gradient(to bottom,
      transparent 0%, black 25%, black 75%, transparent 100%);
}

.banner-overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(255, 255, 255, 0.65);
  -webkit-mask-image: linear-gradient(to bottom,
      transparent 0%, black 25%, black 75%, transparent 100%);
  mask-image: linear-gradient(to bottom,
      transparent 0%, black 25%, black 75%, transparent 100%);
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

.banner-text{
  text-align: justify;
  line-height: 1.5;
}

.news {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 74px 0;
}

.news.container-normal {
  width: 100%;
  max-width: 1300px;
  box-sizing: border-box;
  margin: 0 auto;
}

.news-title-row {
  width: 100%;
  align-self: flex-start;
  display: flex;
  align-items: center;
  gap: 0 16px;
  border-bottom: 3px solid #1e4620;
  padding-bottom: 8px;
  cursor: pointer;
}

.news-icon {
  font-size: 3rem;
  color: #1e4620;
  background-color: #f0e9e3;
  border-radius: 50%;
}


.card-container :deep(.card) {
  cursor: pointer;
}

.card-container {
  width: 100%;
  display: flex;
  gap: 0 64px;
}

.card-container :deep(.card):nth-child(4) {
  display: none;
}

.location.container-normal {
  width: 100%;
  max-width: 1300px;
  box-sizing: border-box;
  margin-left: auto;
  margin-right: auto;
}

.location {
  display: flex;
  align-items: center;
  gap: 0 40px;
  cursor: pointer;
  margin-bottom: 80px;
  min-height: 510px;
}

.location-left {
  flex: 1;
}

.location-text-container {
  display: flex;
  flex-direction: column;
  gap: 32px 0;
  max-width: 622px;
}

.location-title {
  width: 100%;
  display: flex;
  align-items: center;
  align-self: flex-start;
  gap: 0 16px;
  border-bottom: 3px solid #1e4620;
  padding-bottom: 8px;
}

.location-icon {
  font-size: 3rem;
  color: #1e4620;
  background-color: #f0e9e3;
  border-radius: 50%;
}

.location-desc {
  text-align: justify;
  display: -webkit-box;
  -webkit-line-clamp: 9;
  line-clamp: 9;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.5;
}

.location-right {
  flex: 1;
}

.img-wrapper {
  width: 100%;
  height: clamp(400px, calc(274.29px + 12.277vw), 510px);
  position: relative;
}

.location-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
}


@media (max-width: 1750px) {
  .hero-right {
    padding-right: 40px;
  }
}

@media (max-width: 1600px) {
  .hero-left {
    width: 60%;
  }

  .location-desc {
    -webkit-line-clamp: 7;
    line-clamp: 7;
  }
}

@media (max-width: 1400px) {
  .news.container-normal {
    padding: 0 80px;
  }

  .location.container-normal {
    padding: 0 80px;
  }
}

@media (max-width: 1300px) {
  .hero-left {
    width: 100%;
  }

  .news {
    gap: 32px 0;
  }

  .card-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;
  }

  .card-container :deep(.card):nth-child(4) {
    display: block;
  }

  .card-container :deep(.card) {
    width: 100%;
  }

  .location-icon,
  .news-icon {
    font-size: 2.625rem;
  }
}

@media (max-width: 1100px) {
  .news.container-normal {
    padding: 0 40px;
  }

  .location.container-normal {
    padding: 0 40px;
  }
}

@media (max-width: 1024px) {
  .hero-area {
    gap: 0 40px;
  }

  .banner-text-container {
    padding: 0 10%;
  }

  .location {
    min-height: unset;
    flex-direction: column;
    gap: 32px 0;
  }

  .location-left {
    width: 100%;
  }

  .location-text-container {
    max-width: unset;
  }

  .location-desc {
    display: none;
  }

  .location-right {
    display: block;
    width: 100%;
  }

  .img-wrapper {
    height: 320px;
    width: 100%;
  }
}

@media (max-width: 950px) {
  .location-icon,
  .news-icon {
    font-size: 2.375rem;
  }
}

@media (max-width: 768px) {
  .hero-area {
    flex-direction: column;
    gap: 40px 0;
  }

  .hero-right {
    width: 100%;
    padding: 0 10%;
  }

  .news.container-normal {
    padding: 0 20px;
    align-items: flex-start;
    gap: 16px 0;
  }

  .card-container {
    gap: 16px;
  }

.location.container-normal {
    padding: 0 20px;
  }

  .location {
    gap: 16px 0;
  }

  .img-wrapper {
    height: 260px;
  }

  .location-icon,
  .news-icon {
    font-size: 2.25rem;
  }

  .location-title,
  .news-title-row {
    gap: 0 8px;
  }

}

.news-swiper {
  display: none;
  width: 100%;
}

.news-swiper :deep(.card) {
  width: 100%;
  cursor: pointer;
}

.news-swiper :deep(.swiper-pagination) {
  position: static;
  margin-top: 16px;
}

@media (max-width: 576px) {
  .card-container {
    display: none;
  }

  .news-swiper {
    display: block;
  }

  .news-title-row{
    width: 100%;
  }

.location-title{
  width: 100%;
}
  
  .hero-right {
    padding: 0 6%;
  }

  .banner-text-container {
    padding: 0 6%;
  }

}

@media (max-width: 390px) {
  .location-icon,
  .news-icon {
    font-size: 2rem;
  }
}

/* === 捲動淡入動畫 === */
.reveal-hidden {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 1.2s ease-out, transform 1.2s ease-out;
}

.reveal-visible {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .reveal-hidden {
    opacity: 1;
    transform: none;
    transition: none;
    transition-delay: 0s;
  }
}
</style>