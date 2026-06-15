<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import PageHero from '@/components/PageHero.vue'
import Breadcrumb from '@/components/Breadcrumb.vue' // 引入元件
import { aboutCards } from '@/data/aboutData.js'

// 定義麵包屑數據
const breadcrumbItems = [
  { text: '首頁', to: '/' },
  { text: '關於我們' },
]

const heroBanner = ref('https://picsum.photos/1918/336')

const cardList = ref(aboutCards)

const PAGE_SIZE = 4
const currentPage = ref(1)

const totalPages = computed(() =>
  Math.ceil(cardList.value.length / PAGE_SIZE)
)

const pagedNews = computed(() => {
  const start =
    (currentPage.value - 1) * PAGE_SIZE

  return cardList.value.slice(
    start,
    start + PAGE_SIZE
  )
})

function goPage(p) {
  if (p < 1 || p > totalPages.value) return

  currentPage.value = p

  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}
</script>

<template>
  <div class="about-page">

    <!-- Banner -->
    <section class="banner-section">

      <Breadcrumb :items="breadcrumbItems" />

      <div class="hero-wrapper">

        <PageHero :image="heroBanner" />

        <div class="hero-title">
    
        </div>

      </div>

    </section>

    <!-- Main -->
    <main>

      <section class="news-section">

        <!-- 關於我們 -->
        <div class="intro">

          <div class="intro-header">

            <h2>北屯社區大學</h2>

            <div class="line"></div>

          </div>

          <div class="intro-title">
            落實終身學習、發揚北屯特色、致力在地公共事務、推動社會關懷
          </div>

          <p class="intro-desc">
            推動地方與社區永續發展、培育在地人才，落實在地文化治理與終身學習，以達公民社會之目標。
            北屯社大秉持上述精神，期許發展成以人為本的城鄉並重型社區大學，我們秉持推展終身教育的精神，以「落實終身學習、發揚北屯特色、致力在地公共事務、推動社會關懷」為辦學理念，並以「都市農業的推廣」、「高齡預防照護支持體系的推動」、「北屯在地特色的開發與傳承」為致力方向，並透過課程發展、公民行動社群、在地學習圈建立等行動模式，激發學員的學習動機，讓北屯社大可以成為快樂學習、方便進修的學習機構，並且在民眾不斷的進修與自我成長之際，也和北屯在地一同成長，進一步展現北屯特色，創立共好的北屯在地風貌。
          </p>

          <div class="intro-image">

            <img 
            src="@/assets/img/關於我們/about.png"
             alt="" 
             >

          </div>

        </div>

        <!-- 理念 -->
        <div class="card-section">

          <div class="intro-header">

            <h2>社大發展區域</h2>

            <div class="line"></div>

          </div>

          <ul class="card-grid">

            <li v-for="item in pagedNews" :key="item.id" class="card">

              <img :src="item.image" :alt="item.title" />

              <div class="card-body">

                <h3>
                  {{ item.title }}
                </h3>

                <p>
                  {{ item.summary }}
                </p>

                <time>
                  {{ item.date }}
                </time>

              </div>

            </li>

          </ul>

        </div>


      </section>

    </main>

  </div>
</template>
<style scoped>
* {
  box-sizing: border-box;
}

.about-page {

  position: relative;

  width: 1920px;

  min-height: 4039px;

  margin: auto;

  background: #ffffff;

  display: flex;

  flex-direction: column;

  gap: 80px;

  overflow: hidden;

  font-family:
    'Noto Sans TC';

}


.hero-container {
  position: relative;
  width: 1918px;
  height: 336px;
  margin: auto;
  overflow: hidden;
  border-radius: 20px;
  /* 根據 Figma 常見設計 */
}

/* 確保 PageHero 元件內的圖片能填滿容器 */
.hero-container :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.hero-title {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 64px;
  color: #FFFFFF;
  /* 確保文字顏色與背景區隔 */
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  /* 增加陰影讓文字更清晰 */
  margin: 0;
  z-index: 2;
  pointer-events: none;
  /* 讓點擊穿透到下方 */
}

/* body */

main {

  display: flex;

  flex-direction: column;

  width: 1920px;

  min-height: 3443px;

}

/* ===== Banner ===== */

.banner-section {
  width: 100%;
}

.hero-wrapper {

  position: relative;

  width: 100%;

  max-width: 1918px;

  margin: auto;

}

/* 控制 PageHero 尺寸 */

.hero-wrapper :deep(svg) {

  display: block;

  width: 100%;

  height: auto;

}

/* 疊在 PageHero 上 */

.hero-title {

  position: absolute;

  top: 50%;

  left: 50%;

  transform:
    translate(-50%, -50%);

  z-index: 10;

  color: #FFF;

  font-size: 64px;

  font-weight: 500;

  line-height: 1.2;

  text-align: center;

  text-shadow:
    0 4px 20px rgba(0, 0, 0, .35);

  pointer-events: none;

}

@media (max-width:1200px) {

  .hero-title {

    font-size: 40px;

  }

}

/* ===== 關於我們 ===== */


.intro{

  width:100%;

  display:flex;

  flex-direction:column;

  align-items:center;

}

.intro-image{

  width:976px;

  margin:0 auto;

}

.intro-image img{

  display:block;

  width:100%;

  border-radius:20px;

  object-fit:cover;

}

.intro-header,
.intro-title,
.intro-desc{

  width:976px;

  margin-left:auto;

  margin-right:auto;

}

.news-section {

  display: flex;

  flex-direction: column;

  align-items: center;

  padding: 0 152px;

  gap: 80px;

  width: 1920px;

}

/* 標題 */

.section-header {

  width: 1600px;

  display: flex;

  justify-content: center;

}

.section-header h2 {

  font-size: 64px;

  font-weight: 400;

  line-height: 77px;

  margin: 0;


}

/* ===== 卡片區 ===== */

.card-grid {

  display: grid;

  grid-template-columns:

    765px 765px;

  column-gap: 64px;

  row-gap: 74px;

  width: 1600px;

  padding: 0;

  margin: 0;

  list-style: none;

}

/* 單卡 */

.card {

  width: 765px;

  height: 806px;

  position: relative;

  overflow: hidden;

  border-radius: 31px;

}

/* 圖 */

.card-img {

  position: absolute;

  top: 0;

  left: 0;

  width: 765px;

  height: 806px;

  border-radius: 31px;

  /* overflow:hidden; */
  object-fit: cover;
  display: block;

}

.card-img img {

  width: 100%;

  height: 100%;

  object-fit: cover;


}

/* 白底文字 */

.card-body {

  position: absolute;

  left: 50%;

  bottom: 1px;

  transform: translateX(-50%);

  width: 765px;

  height: 260px;

  padding:

    25px 37px;

  background: #fff;

  border-radius:

    0 0 31px 31px;

  display: flex;

  flex-direction: column;

  gap: 25px;

}

.card-body h3 {

  margin: 0;

  font-size: 37px;

  font-weight: 400;

  line-height: 45px;

}

.card-body p {

  margin: 0;

  font-size: 31px;

  line-height: 38px;

  color: #757575;

}

.card-body time {

  font-size: 31px;

  line-height: 38px;

  color: #757575;

}


/* ===== RWD ===== */

@media (max-width:1920px) {

  .about-page {

    width: 100%;

  }

  main {

    width: 100%;

  }

  .news-section {

    width: 100%;

    padding:

      0 80px;

  }

  .card-grid {

    width: 100%;

    grid-template-columns:

      repeat(2,
        minmax(0, 1fr));

  }

  .card {

    width: 100%;

    height: auto;

  }

  .card-img {

    position: relative;

    width: 100%;

    height: auto;

    aspect-ratio: 765/806;

    border-radius: 31px;
  }

  .card-body {

    position: relative;

    left: auto;

    bottom: auto;

    transform: none;

    width: 100%;

    height: auto;

  }

}

@media (max-width:1200px) {

  .card-grid {

    grid-template-columns: 1fr;

  }

  .hero-title {

    font-size: 40px;

  }

  .section-header h2 {

    font-size: 40px;

  }

}
</style>