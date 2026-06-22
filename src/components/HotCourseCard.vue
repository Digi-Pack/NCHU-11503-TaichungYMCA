<script setup>
import { computed } from 'vue'
import { categoryImages } from '@/data/categoryImages.js'

const props = defineProps({
  course: {
    type: Object,
    required: true,
  },
})

const thumbnail = computed(() => {
  return categoryImages[props.course.category]?.thumbnail || 'https://placehold.co/401x240'
})

const previewContent = computed(() => {
  if (!props.course.content) return ''

  const text = Array.isArray(props.course.content)
    ? props.course.content.join('')
    : props.course.content

  return text.length > 60 ? text.slice(0, 60) + '...' : text
})
</script>

<template>
  <RouterLink class="hot-card" :to="`/courses/${course.id}`">
    <div class="hot-image">
      <img :src="thumbnail" :alt="course.title" />
    </div>

    <div class="hot-content">
      <h3 class="hot-title">{{ course.title }}</h3>

      <p class="hot-desc">{{ previewContent }}</p>

      <p class="hot-date">{{ course.period }}</p>
    </div>
  </RouterLink>
</template>

<style scoped>
.hot-card {
  position: relative;

  display: block;
  width: 100%;

  color: inherit;
  text-decoration: none;

  background: #fff;
  border-radius: 16px;
  overflow: hidden;

  cursor: pointer;
}

/* 整張卡片遮罩 */
.hot-card::after {
  content: "";
  position: absolute;
  inset: 0;

  background: rgba(0, 0, 0, 0.2);

  opacity: 0;

  transition: opacity 0.3s ease;

  pointer-events: none;

  border-radius: 16px;

  z-index: 2;
}

.hot-card:hover::after {
  opacity: 1;
}

/* ===================== */
/* 圖片 */
/* ===================== */

.hot-image {
  width: 100%;
  aspect-ratio: 401 / 240;

  overflow: hidden;

  background: #ddd;

  border-radius: 16px 16px 0 0;
}

.hot-image img {
  width: 100%;
  height: 100%;

  object-fit: cover;

  display: block;

  transition: transform 0.3s ease;
}

.hot-card:hover .hot-image img {
  transform: scale(1.05);
}

/* ===================== */
/* 文字內容 */
/* ===================== */

.hot-content {
  min-height: 183px;
  padding: 18px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.hot-title {
  margin: 0 0 16px;

  font-size: 1.875rem;
  font-weight: 500;
  line-height: 1.2;

  color: #000;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.hot-desc {
  margin: 0 0 20px;

  font-size: 1.25rem;
  line-height: 1.5;

  color: #757575;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  overflow: hidden;
}

.hot-date {
  margin: 0;

  font-size: 1.25rem;
  line-height: 1.2;

  color: #757575;
}
/* ===================== */
/* 1024 */
/* ===================== */

@media (max-width: 1024px) {
  .hot-title {
    font-size: 1.75rem; /* 28px */
  }

  .hot-desc {
    font-size: 1.125rem; /* 18px */
  }

  .hot-date {
    font-size: 1.125rem; /* 18px */
  }
}

/* ===================== */
/* 768 */
/* ===================== */

@media (max-width: 768px) {
  .hot-content {
    padding: 16px;
  }

  .hot-title {
    font-size: 1.5rem;
  }

  .hot-desc,
  .hot-date {
    font-size: 1rem;
  }
}

/* ===================== */
/* 432 */
/* ===================== */

@media (max-width: 432px) {
  .hot-title {
    font-size: 1.25rem; /* 20px */
  }

  .hot-desc {
    font-size: 0.875rem; /* 14px */
    line-height: 1.5;
  }

  .hot-date {
    font-size: 0.875rem; /* 14px */
  }
}
</style>