<script setup>
defineProps({
  course: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <RouterLink class="hot-card" :to="`/courses/${course.code}`">
    <img
      class="hot-image"
      :src="course.thumbnail || '/img/courses/default-thumb.jpg'"
      :alt="course.title"
    />

    <div class="hot-content">
      <p class="hot-category">
        {{ course.category }}
      </p>

      <h3 class="hot-title">
        {{ course.title }}
      </h3>

      <p class="hot-desc">
        {{ course.content }}
      </p>

      <p class="hot-date">
        {{ course.period }}
      </p>
    </div>
  </RouterLink>
</template>

<style scoped>
.hot-card {
  display: block;
  width: 100%;
  color: inherit;
  text-decoration: none;
}

.hot-image {
  width: 100%;
  aspect-ratio: 4 / 3;
  display: block;
  object-fit: cover;
  border-radius: 10px;
  background-color: #f0f0f0;
}

.hot-content {
  padding-top: 12px;
}

.hot-category {
  margin: 0 0 6px;
  font-size: 0.9rem;
  color: #757575;
}

.hot-title {
  margin: 0 0 8px;
  font-size: 1.2rem;
  font-weight: 500;
  color: #000;
  line-height: 1.4;
}

.hot-desc {
  margin: 0 0 8px;
  color: #757575;
  font-size: 0.95rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.hot-date {
  margin: 0;
  font-size: 0.9rem;
  color: #757575;
}
</style>