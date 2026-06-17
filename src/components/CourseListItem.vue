<script setup>
defineProps({
  course: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="course-list-item">
    <div class="course-main">
      <div class="course-tags">
        <span class="course-category">{{ course.category }}</span>
      </div>

      <h2 class="course-title">
        {{ course.title }}
      </h2>

      <p class="course-teacher">
        {{ course.teacher }}
      </p>

      <p class="course-info">
        {{ course.period }}｜{{ course.time }}｜{{ course.campus }}｜{{ course.fee }}
      </p>
    </div>

    <RouterLink class="more-btn" :to="`/courses/${course.code}`">
      查看更多 ＞
    </RouterLink>
  </div>
</template>

<style scoped>
.course-list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 40px;
  padding: 24px 0;
  border-bottom: 1px solid #cfcfcf;
}

.course-main {
  flex: 1;
}

.course-tags {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.course-code,
.course-category {
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 0.9rem;
}

.course-code {
  background-color: #3c3c3c;
  color: #f0e9e3;
}

.course-category {
  background-color: #f0e9e3;
  color: #3c3c3c;
}

.course-title {
  margin: 0 0 10px;
  font-size: 2rem;
  font-weight: 500;
  color: #000;
}

.course-teacher {
  margin: 0 0 8px;
  font-size: 1.3rem;
  color: #757575;
}

.course-info {
  margin: 0;
  font-size: 1rem;
  color: #757575;
}

.more-btn {
  flex-shrink: 0;
  padding: 14px 24px;
  border-radius: 6px;
  background-color: #7d7d7d;
  color: #fff;
  text-decoration: none;
}

.more-btn:hover {
  opacity: 0.85;
}

@media (max-width: 768px) {
  .course-list-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }

  .course-title {
    font-size: 1.5rem;
  }
}
</style>