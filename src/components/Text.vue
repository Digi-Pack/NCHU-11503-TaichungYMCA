<script setup>
const props = defineProps({
    size: {
        type: String,
        default: 'text-64'
    },
    color: {
        type: String,
        default: 'black'
    }
})
</script>

<template>
    <div :class="[props.size, props.color]">
        <slot></slot>
    </div>
</template>

<style scoped>
.text-64 {
    font-size: 4rem;
}

.text-36{
    font-size: 2.25rem;
}

.text-32 {
    font-size: 2rem;

}

.text-24{
    font-size: 1.5rem;
}

.text-20{
    font-size: 1.25rem;
}

.black {
    color: black;
}

.gray {
    color: #757575;
}

.deep-gray{
    color: #3C3C3C;
}
</style>