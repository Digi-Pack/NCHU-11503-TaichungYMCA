<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
    image: {
        type: String,
        required: true,
    },
});

const isWide = ref(true);

function updateWidth() {
    isWide.value = window.innerWidth >= 800;
}

onMounted(() => {
    updateWidth();
    window.addEventListener('resize', updateWidth);
});

onUnmounted(() => {
    window.removeEventListener('resize', updateWidth);
});
</script>

<template>
    <div class="hero-wrapper">
        <svg v-if="isWide" width="1918" height="400" viewBox="0 0 1918 400" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <clipPath id="page-hero-clip">
                    <path d="M1522 400H0V0H1918V125C1918 332.143 1677.5 400 1522 400Z" />
                </clipPath>
            </defs>
            <image :href="props.image" x="0" y="0" width="1918" height="400" preserveAspectRatio="xMidYMid slice" clip-path="url(#page-hero-clip)" />
        </svg>
        <img v-else :src="props.image" alt="" />
    </div>
</template>

<style scoped>
.hero-wrapper {
    width: 100%;
    height: clamp(160px, 20.85vw, 400px);
    overflow: hidden;
}

svg {
    display: block;
    width: 100%;
    height: 100%;
}

img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
}
</style>
