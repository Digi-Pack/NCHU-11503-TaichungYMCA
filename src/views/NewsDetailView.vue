<script setup>
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import newsDetailHero from "@/assets/img/news/newsDetailHero.png"
import newsList from "@/data/news.js";
import Text from "@/components/Text.vue";
import Breadcrumb from "@/components/Breadcrumb.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import { ReloadOutlined, CaretRightOutlined, PauseOutlined } from "@ant-design/icons-vue";

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

const isSpeaking = ref(false)
const isPaused = ref(false)
const rate = ref(1)

let speakTimeoutId = null
let gapResumeCallback = null

function cleanText(text) {
    return text
        .replace(/◆/g, '')
        .replace(/★/g, '')
        .replace(/※/g, '')
        .replace(/~/g, '至')
        .replace(/\[/g, '')
        .replace(/\]/g, '')
        .replace(/\n/g, ' ')
        .replace(/(\d{4})\/(\d{1,2})\/(\d{1,2})/g, '$1年$2月$3日')
        .replace(/(\d{1,2})\/(\d{1,2})/g, '$1月$2日')
}

function getNewsSegments(news) {
    return [
        `標題：${news.title}`,
        `日期：${news.date}`,
        `分類：${news.category}`,
        news.subTitle ? `摘要：${news.subTitle}` : '',
        `內容：${Array.isArray(news.content) ? news.content.join('') : news.content}`,
    ].filter(Boolean).map(cleanText)
}

function speakNews(news) {
    const segments = getNewsSegments(news)
    let index = 0

    window.speechSynthesis.cancel()
    clearTimeout(speakTimeoutId)
    gapResumeCallback = null
    isSpeaking.value = true
    isPaused.value = false

    function speakNext() {
        if (index >= segments.length) {
            isSpeaking.value = false
            isPaused.value = false
            return
        }

        const utterance = new SpeechSynthesisUtterance(segments[index++])
        utterance.lang = 'zh-TW'
        utterance.rate = rate.value
        utterance.pitch = 1
        utterance.volume = 1

        utterance.onend = () => {
            if (!isSpeaking.value) return
            gapResumeCallback = speakNext
            speakTimeoutId = setTimeout(() => {
                gapResumeCallback = null
                speakNext()
            }, 300)
        }

        window.speechSynthesis.speak(utterance)
    }

    speakNext()
}

function toggleSpeak() {
    if (!isSpeaking.value) {
        speakNews(currentNews.value)
        return
    }

    if (isPaused.value) {
        isPaused.value = false
        if (gapResumeCallback) {
            const fn = gapResumeCallback
            gapResumeCallback = null
            fn()
        } else {
            window.speechSynthesis.resume()
        }
    } else {
        clearTimeout(speakTimeoutId)
        window.speechSynthesis.pause()
        isPaused.value = true
    }
}

function stopSpeak() {
    window.speechSynthesis.cancel()
    clearTimeout(speakTimeoutId)
    gapResumeCallback = null
    isSpeaking.value = false
    isPaused.value = false
}

function increaseRate() {
    if (rate.value < 1.5) {
        rate.value = Number((rate.value + 0.25).toFixed(2))
    }
    if (isSpeaking.value) stopSpeak()
}

function decreaseRate() {
    if (rate.value > 0.75) {
        rate.value = Number((rate.value - 0.25).toFixed(2))
    }
    if (isSpeaking.value) stopSpeak()
}
</script>

<template>
    <NotFoundView v-if="!currentNews" />
    <main v-else>
        <Breadcrumb :items="breadcrumbItems" />

        <div class="content-container">

            <div class="hero container-full">
                <img :src="newsDetailHero" alt="這是一張圖片">
            </div>

            <div class="title-section container-normal">
                <div class="voice-backbtn-row">
                    <div class="voice-player">
                        <span class="headphone-icon">🎧</span>
                        <button class="player-btn play-btn" @click="toggleSpeak">
                            <PauseOutlined v-if="isSpeaking && !isPaused" />
                            <CaretRightOutlined v-else />
                        </button>
                        <button class="player-btn" @click="decreaseRate">−</button>
                        <span class="rate-text">x{{ rate }}</span>
                        <button class="player-btn" @click="increaseRate">＋</button>
                        <button class="player-btn volume-btn" @click="stopSpeak">
                            <ReloadOutlined />
                        </button>
                    </div>
                    <a-button class="back-btn" @click="goBack">返回上一頁</a-button>
                </div>

                <div class="title-date">
                    <Text size="text-48" color="black" weight="f-500">{{ currentNews?.title }}</Text>
                    <div class="date">
                        <Text size="text-24" color="gray">{{ currentNews?.date }}</Text>
                    </div>
                </div>
                <div class="tag">{{ currentNews?.category }}</div>
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
                <Text size="text-36" weight="f-500" color="primary-d-g" class="brief-section">{{currentNews?.subTitle}}</Text>
                <Text v-for="(paragraph, index) in currentNews.content" :key="index" class="news-content" size="text-24"
                    color="gray">{{ paragraph }}</Text>
            </div>
        </div>

    </main>

</template>

<style scoped>
.voice-player {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    height: 52px;
    width: fit-content;
    padding: 0 18px;
    background: #efefef;
    border-radius: 999px;
}

.headphone-icon {
    font-size: 1.5rem;
    color: #666;
}

.player-btn {
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    background: transparent;
    cursor: pointer;
    color: #666;
    font-size: 1.25rem;
}

.play-btn {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    line-height: 36px;
    background: #5d5d5d;
    color: white;
}

.play-btn:hover {
    background: #1e4620;
}

.rate-text {
    min-width: 40px;
    text-align: center;
    color: #757575;
    font-size: 1.25rem;
}

.volume-btn {
    border-left: 1px solid #cfcfcf;
    padding-left: 14px;
    width: auto;
}

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

.voice-backbtn-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.tag {
    width: 120px;
    height: 51px;
    border: 1px solid #938D6B;
    border-radius: 20px;
    background-color: #1E4620;
    color: #f0e9e3;
    font-size: 1rem;
    text-align: center;
    line-height: 51px;
}

.back-btn {
    width: 120px;
    height: 51px;
    border-radius: 20px;
    background-color: #F9F6F0;
    border-color: #1E4620;
    color: #1E4620;
    font-size: 1.125rem;
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
    border-bottom: 3px solid #1E4620;
    padding-bottom:2px;
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

@media (max-width: 600px) {
    .voice-backbtn-row {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
    }

    .back-btn {
        order: -1;
    }
}

@media (max-width: 500px) {
    .content-container {
        gap: 20px 0;
    }

    .tag {
        font-size: 1rem;
    }
}
</style>