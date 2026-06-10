<script setup>
import testImg from "@/assets/img/首頁測試圖片.png"
</script>
<template>
  <div>
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
            <div class="title-text">臺中市</div>
            <div class="title-text">北屯社區大學</div>
          </div>
          <div class="content">落實終身學習、發揚北屯特色、致力在地公共事務、推動社會關懷</div>
        </div>
      </div>
    </div>


    <h1>北屯社大首頁</h1>
  </div>
</template>

<style scoped>
.container-full {
  width: 100%;
  margin: auto;
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

.title-text {
  font-size: 4rem;
}

.content {
  font-size: 2rem;
  color: #757575;
  max-width: 750px;
}
</style>
