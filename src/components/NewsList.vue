<script setup>
import Text from '@/components/Text.vue';
import { RightOutlined } from "@ant-design/icons-vue";

const props = defineProps({
    title: {
        type: String,
        default: "",
    },
    date: {
        type: String,
        default: "",
    },
    content: {
        type: String,
        default: "",
    },
})
</script>

<template>
    <div class="list">
        <div class="title-date">
            <Text size="text-36">{{ props.title }}</Text>
            <Text size="text-24" color="gray">{{ props.date }}</Text>
        </div>
        <div class="content-check">
            <Text class="content text-limit" size="text-24" color="gray">{{ props.content }}</Text>
            <div class="btn-wrapper">
                <a-button class="more-btn">查看更多
                    <RightOutlined />
                </a-button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.list {
    display: flex;
    flex-direction: column;
    gap: 16px;
    border-bottom: 1px solid #B1B0B0;
    padding: 16px 0;
}

.title-date {
    display: flex;
    justify-content: space-between;
}

.content-check {
    display: flex;
    justify-content: space-between;
    gap: 0 16px;
}

.btn-wrapper {
    display: flex;
    align-items: end;
}

.content {
    max-width: 1420px;
    min-height: 83px;
    text-align: justify;
}

.text-limit {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.more-btn {
    width: 132px;
    height: 56px;
    background-color: #706F6F;
    color: #F9F6F0;
    border-color: #706F6F;
    font-size: 1.125rem;
}

.more-btn:hover {
    background-color: #A0522D;
    border-color: #A0522D;
    color: #FFFFFF;
}
</style>