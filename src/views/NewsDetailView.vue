<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import newsList from "@/data/news.js";
import Text from "@/components/Text.vue";
import Breadcrumb from "@/components/Breadcrumb.vue";

const route = useRoute();
const router = useRouter();

const currentNews = computed(() => newsList.find((news) => news.id === route.params.id));

const breadcrumbItems = computed(() => [
    { text: "首頁", to: "/" },
    { text: "最新消息", to: "/news" },
    { text: currentNews.value?.title || "最新消息詳細" },
]);

function goBack() {
  if (route.query.from === "home") {
    router.push({ name: "home", hash: "#latest-news" });
  } else {
    router.push({ name: "news", query: { page: route.query.page, view: route.query.view }, hash: "#news-title" });
  }
}
</script>

<template>
    <main>
        <Breadcrumb :items="breadcrumbItems" />

        <div class="content-container">

            <div class="hero container-full">
                <img src="https://picsum.photos/1905/336" alt="這是一張圖片">
            </div>

            <div class="title-section container-normal">
                <div class="title-date">
                    <Text size="text-48">{{ currentNews?.title }}</Text>
                    <div class="date">
                        <Text size="text-24" color="gray">{{ currentNews?.date }}</Text>
                    </div>
                </div>
                <div class="tag-backbtn">
                    <div class="tag">{{ currentNews?.category }}</div>
                    <a-button class="back-btn" @click="goBack">返回上一頁</a-button>
                </div>
            </div>

            <div class="image-video-audio container-small">
                <div class="image-section" v-if="currentNews?.images">
                    <img :src="currentNews.images" alt="這是一張圖片">
                </div>

                <div class="video-section" v-if="currentNews?.youtubeUrls">
                    <iframe :src="currentNews.youtubeUrls" allowfullscreen></iframe>
                </div>

                <div class="audio-section" v-if="currentNews?.spotifyUrl">
                    <iframe :src="currentNews.spotifyUrl" allowfullscreen></iframe>
                </div>
            </div>

            <div class="content-text container-normal">
                <Text size="text-36" class="brief-section">活動簡介</Text>
                <Text v-for="(paragraph, index) in currentNews.content" :key="index" class="news-content" size="text-24" color="gray">{{ paragraph }}</Text>
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

.container-small {
    width: 75%;
    margin: auto;
}

.content-container{
    display: flex;
    flex-direction: column;
    gap: 80px 0;
}

.hero {
    height: 336px;
    /* background-color: lightblue; */
}

.title-section {
    /* height: 300px; */
    display: flex;
    flex-direction: column;
    gap: 16px;
    /* background-color: aquamarine; */
}

.title-date {
    display: flex;
    justify-content: space-between;
}

.date {
    display: flex;
    align-items: center;
}

.tag-backbtn{
    display: flex;
    justify-content: space-between;
}

.tag {
    width: 120px;
    height: 51px;
    border: 1px solid #938D6B;
    border-radius: 20px;
    background-color: #3C3C3C;
    color: white;
    font-size: 1rem;
    text-align: center;
    line-height: 51px;
}

.back-btn {
    width: 120px;
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

.back-btn:hover {
    background-color: #3C3C3C;
    border-color: #3C3C3C;
    color: #F0E9E3;
}

.image-section {
    width: 100%;
    height: 630px;
}

.image-section img {
    width: 100%;
    height: 100%;
    /* display: block; */
}

.video-section {
    width: 100%;
    height: 630px;
}

.video-section iframe {
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 20px;
}

.audio-section {
    width: 100%;
    height: 352px;
}

.audio-section iframe {
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 12px;
}

.content-text{
    display: flex;
    flex-direction: column;
    gap: 36px 0;
}

.brief-section{
    width: 252px;
    /* background-color: aquamarine; */
    border-bottom: 3px solid #1E4620;
}

.news-content {
    white-space: pre-line;
    line-height: 1.5;
    text-align: justify;
}
</style>