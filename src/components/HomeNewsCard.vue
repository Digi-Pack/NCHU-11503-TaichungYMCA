<script setup>
import Text from '@/components/Text.vue';

const props = defineProps({
    outPicture: {
        type: String,
        default: "",
    },
    title: {
        type: String,
        default: "",
    },
    desc: {
        type: String,
        default: "",
    },
    date: {
        type: String,
        default: "",
    },
    link: {
        type: String,
        default: "",
    },
})
</script>

<template>
    <div class="card">
        <div class="card-top">
            <img :src="props.outPicture" alt="這是一張圖片">
        </div>
        <div class="card-bot">
            <Text size="text-36" class="text-limit title-height">{{ props.title }}</Text>
            <Text size="text-24" color="gray" class="text-limit fixed-height">{{ props.desc }}</Text>
            <Text size="text-24" color="gray">{{ props.date }}</Text>
        </div>
    </div>
</template>

<style scoped>
.card {
    width: calc(100% / 3);
    /* background-color: bisque; */
    position: relative
}

.card::after {
    content: "";
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.2);
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
}

.card:hover::after {
    opacity: 1;
}

.card-top {
    width: 100%;
    height: 302px;
    /* background-color: brown; */
}

img {
    width: 100%;
    height: 100%;
}

.card-bot {
    padding: 24px 23px 34px;
    display: flex;
    flex-direction: column;
    gap: 16px 0;
}

.title-height{
    height: 83px;
}

/* 修改line-clamp可以限制幾行後截斷 */
.text-limit {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.fixed-height{
    height: 56px;
}
</style>