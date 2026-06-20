<script setup>
const props = defineProps({
    size: {
        type: String,
        default: 'text-64'
    },
    color: {
        type: String,
        default: 'black'
    },
    weight: {
        type: String,
        default: ''
    }
})
</script>

<template>
    <div :class="[props.size, props.color, props.weight]">
        <slot></slot>
    </div>
</template>

<style scoped>
.text-64 {
    font-size: 4rem;
}

.text-48 {
    font-size: 3rem;
}

.text-36 {
    font-size: 2.25rem;
}

.text-32 {
    font-size: 2rem;
}

.text-24 {
    font-size: 1.5rem;
}


.text-18 {
    font-size: 1.125rem;
}


.text-16 {
    font-size: 1rem;
}

.text-20 {
    font-size: 1.25rem;
}

@media (max-width: 1300px) {
    .text-64 {
        font-size: 3.5rem;
    }

    .text-48 {
        font-size: 2.625rem;
    }

    .text-36 {
        font-size: 2rem;
    }

    .text-32 {
        font-size: 1.75rem;
    }

    .text-24 {
        font-size: 1.375rem;
    }
}

@media (max-width: 950px) {
    .text-64 {
        font-size: 3.25rem;
    }

    .text-48 {
        font-size: 2.375rem;
    }
}

@media (max-width: 768px) {
    .text-64 {
        font-size: 3rem;
    }

    .text-48 {
        font-size: 2.25rem;
    }

    .text-36 {
        font-size: 1.75rem;
    }
    
    .text-30{
        font-size:1.85rem; 
    }
/* 課程大標示29.5 */

    .text-32 {
        font-size: 1.5rem;
    }

    .text-24 {
        font-size: 1.25rem;
    }
}

@media (max-width: 390px) {
    .text-64 {
        font-size: 2.5rem;
    }

    .text-48 {
        font-size: 2rem;
    }

    .text-36 {
        font-size: 1.5rem;
    }

    .text-32 {
        font-size: 1.25rem;
    }
}

.primary-d-g {
    color: #1e4620;
}

.primary-d-o {
    color: #D96B27
}

.gray {
    color: #706F6F;
}

.deep-gray {
    color: #3C3C3C;
}

.black {
    color: #000000;
}

.f-500 {
    font-weight: 500;
}
</style>