<script setup>
const props = defineProps({
    image: {
        type: String,
        required: true,
    },
});
</script>

<template>
    <svg width="1918" height="336" viewBox="0 0 1918 336" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <clipPath id="page-hero-clip">
                <path d="M1522 336H0V0H1918V105C1918 279 1677.5 336 1522 336Z" />
            </clipPath>
        </defs>
        <image :href="props.image" x="0" y="0" preserveAspectRatio="xMidYMid slice" clip-path="url(#page-hero-clip)" />
    </svg>
</template>

<style scoped>
svg {
    display: block;
    width: 100%;
    height: auto;
}

image {
    width: 100%;
    height: 100%;
}
</style>