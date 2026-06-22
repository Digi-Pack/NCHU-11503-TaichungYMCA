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
})
</script>

<template>
    <div class="card">
        <div class="card-top">
            <img :src="props.outPicture" alt="這是一張圖片">
        </div>
        <div class="card-bot">
            <Text size="text-36" weight="f-500" color="deep-gray" class="text-limit title-height">{{ props.title }}</Text>
            <Text size="text-24" color="gray" class="text-limit fixed-height">{{ props.desc }}</Text>
            <Text size="text-24" color="gray">{{ props.date }}</Text>
        </div>
    </div>
</template>

<style scoped>
.card {
    width: calc(100% / 3);
    /* background-color: bisque; */
    position: relative;
    border-radius:20px;
}

.card::after {
    content: "";
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.2);
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
    border-radius:20px;
}

.card:hover::after {
    opacity: 1;
}

.card-top {
    width: 100%;
    height: 248px;
    overflow: hidden;
}

img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    border-radius:20px 20px 0 0;
}

.card-bot {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px 0;
    background-color: white;
    border-bottom-left-radius:20px;
    border-bottom-right-radius:20px;
}

.title-height{
    line-height: 1.2;
    height: 2.4em;
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
    line-height: 1.5;
    /* height: 3.6em;
    -webkit-line-clamp: 3;
    line-clamp: 3; */
}
</style>