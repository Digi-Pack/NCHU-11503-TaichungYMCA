<script setup>
import Text from '@/components/Text.vue';

const props = defineProps({
    url: {
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
    link: {
        type: String,
        default: "",
    },
})
</script>

<template>
    <div class="card">
        <div class="card-top">
            <img :src="props.url" alt="">
        </div>
        <div class="card-bot">
            <Text size="text-32">{{ props.title }}</Text>
            <Text size="text-20" color="gray" class="card-desc">{{ props.desc }}</Text>
        </div>
    </div>
</template>

<style scoped>
.card {
    width: calc(100% / 3);
    /* height: 100%; */
    background-color: bisque;
    position: relative
}

.card::after{
    content: "";
    position: absolute;
    inset: 0;
    background-color: black;
}

.card-top {
    width: 100%;
    height: 360px;
    background-color: brown;
}

.card-bot {
    padding: 24px 23px 34px;
    display: flex;
    flex-direction: column;
    gap: 16px 0;
}

/* 修改line-clamp可以限制幾行後截斷 */
.card-desc {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>