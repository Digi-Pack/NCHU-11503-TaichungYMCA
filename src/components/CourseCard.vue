<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { categoryImages } from '@/data/categoryImages.js'
const getThumbnail = (category) => {
  return categoryImages[category]?.thumbnail
}
const route = useRoute()

const props = defineProps({
  course: {
    type: Object,
    required: true,
  },
})

const previewContent = computed(() => {
  if (!props.course.content) return ''

  const text = Array.isArray(props.course.content)
    ? props.course.content.join('')
    : props.course.content

  return text.length > 50 ? text.slice(0, 50) + '...' : text
})
</script>

<template>
  <RouterLink
    class="course-card"
    :to="{
      path: `/courses/${course.id}`,
      query: route.query,
    }"
  >
    <div class="card-image">
      <img :src="categoryImages[course.category]?.thumbnail" :alt="course.title" />
    </div>

    <div class="card-content">
      <h3 class="course-title">
        {{ course.title }}
      </h3>

      <p class="course-desc">
        {{ previewContent }}
      </p>

      <p class="course-date">
        {{ course.period }}
      </p>
    </div>
  </RouterLink>
</template>

<style scoped>
.course-card,
.course-card:visited,
.course-card:hover,
.course-card:active {
  text-decoration: none;
  color: inherit;
}

.course-card {
  width: 100%;
  max-width: 401px;
  height: 425px;
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  justify-self: center;
}

.card-image {
  width: 100%;
  height: 240px;
  overflow: hidden;
  background: #ddd;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.card-content {
  height: 183px;
  padding: 18px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.course-title {
  margin: 0 0 16px;
  font-size: 1.875rem;
  font-weight: 500;
  line-height: 1.2;
  color: #000;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.course-desc {
  margin: 0 0 20px;
  font-size: 1.25rem;
  line-height: 1.4;
  color: #757575;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.course-date {
  margin: 0;
  font-size: 1.25rem;
  line-height: 1.2;
  color: #757575;
}

@media (max-width: 1024px) {
  .course-title {
    font-size: 1.75rem;
  }

  .course-desc,
  .course-date {
    font-size: 1.125rem;
  }
}

@media (max-width: 768px) {
  .course-card {
    max-width: 401px;
    height: auto;
  }

  .card-image {
    height: auto;
    aspect-ratio: 401 / 240;
  }

  .card-content {
    height: auto;
    min-height: 183px;
  }

  .course-title {
    font-size: 1.5rem;
  }

  .course-desc,
  .course-date {
    font-size: 1rem;
  }
}

@media (max-width: 432px) {
  .card-content {
    padding: 16px;
  }

  .course-title {
    font-size: 1.25rem;
  }

  .course-desc,
  .course-date {
    font-size: 0.875rem;
  }
}
</style>
