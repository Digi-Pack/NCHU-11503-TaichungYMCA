<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import newsDetailHero from "@/assets/img/news/newsDetailHero.png"
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
        router.push({ name: "news", query: { page: route.query.page, view: route.query.view, category: route.query.category } });
    }
}
</script>

<template>
    <main>
        <Breadcrumb :items="breadcrumbItems" />

        <div class="content-container">

            <div class="hero container-full">
                <img :src="newsDetailHero" alt="這是一張圖片">
            </div>

            <div class="title-section container-normal">
                <div class="title-date">
                    <Text size="text-48" color="deep-gray" weight="f-500">{{ currentNews?.title }}</Text>
                    <div class="date">
                        <Text size="text-24" color="gray">{{ currentNews?.date }}</Text>
                    </div>
                </div>
                <div class="tag-backbtn">
                    <div class="tag">{{ currentNews?.category }}</div>
                    <a-button class="back-btn" @click="goBack">返回上一頁</a-button>
                </div>
            </div>

            <div class="image-video-audio container-normal">
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
                <Text size="text-36" weight="f-500" color="deep-gray" class="brief-section">活動簡介</Text>
                <Text v-for="(paragraph, index) in currentNews.content" :key="index" class="news-content" size="text-24"
                    color="gray">{{ paragraph }}</Text>
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
    width: 100%;
    max-width: 1300px;
    box-sizing: border-box;
    margin: 0 auto;
}

.content-container {
    display: flex;
    flex-direction: column;
    gap: 80px 0;
}

.hero {
    height: clamp(160px, 17.5vw, 336px);
}

.hero img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 70%;
}

.title-section {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.title-date {
    display: flex;
    justify-content: space-between;
}

.date {
    display: flex;
    align-items: center;
}

.tag-backbtn {
    display: flex;
    justify-content: space-between;
}

.tag {
    width: 120px;
    height: 51px;
    border: 1px solid #938D6B;
    border-radius: 20px;
    background-color: #1E4620;
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
    background-color: #938d6b;
    border-color: #938d6b;
    color: #F0E9E3;
}

.image-section {
    width: 100%;
    height: clamp(250px, 33vw, 630px);
}

.image-section img {
    width: 100%;
    height: 100%;
    border-radius: 20px;
}

.video-section {
    width: 100%;
    height: clamp(250px, 33vw, 630px);
}

.video-section iframe {
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 20px;
}

.audio-section {
    width: 100%;
    height: clamp(180px, 18.4vw, 352px);
}

.audio-section iframe {
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 12px;
}

.content-text {
    display: flex;
    flex-direction: column;
    gap: 36px 0;
    margin-bottom: 80px;
}

.brief-section {
    width: 252px;
    border-bottom: 3px solid #1E4620;
}

.news-content {
    white-space: pre-line;
    line-height: 1.5;
    text-align: justify;
}

@media (max-width: 1400px) {
    .container-normal {
        padding: 0 80px;
    }

    .content-container {
        gap: 40px 0;
    }

    .content-text {
        margin-bottom: 40px;
        gap: 28px;
    }
}

@media (max-width: 1100px) {
    .container-normal {
        padding: 0 40px;
    }

    .title-date {
        flex-direction: column;
        gap: 8px;
    }
}

@media (max-width: 768px) {
    .container-normal {
        padding: 0 20px;
    }
}

@media (max-width: 500px) {
    .content-container {
        gap: 20px 0;
    }

    .title-section {
        display: grid;
        grid-template-areas:
            "backbtn"
            "titledate"
            "tag";
    }

    .title-date {
        grid-area: titledate;
    }

    .tag-backbtn {
        display: contents;
    }

    .tag {
        grid-area: tag;
    }

    .back-btn {
        grid-area: backbtn;
        align-self: flex-start;
        justify-self: flex-start;
    }

    .tag {
        width: fit-content;
        height: 26px;
        line-height: 22px;
        font-size: 0.75rem;
        padding: 0 10px;
    }
}
</style>