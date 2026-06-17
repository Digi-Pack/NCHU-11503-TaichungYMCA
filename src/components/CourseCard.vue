<script setup>
defineProps({
  course: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="course-card">
    <div class="card-image">
      <img :src="course.thumbnail" :alt="course.title" />
    </div>

    <div class="card-content">
      <div class="tags">
        <span class="category-tag">{{ course.category }}</span>
      </div>

      <h3 class="course-title">
        {{ course.title }}
      </h3>

      <p class="teacher">
        {{ course.teacher }}
      </p>

      <p class="datetime">
        {{ course.period }} ｜ {{ course.time }}
      </p>

      <RouterLink class="detail-btn" :to="`/courses/${course.code}`">
        查看更多 ＞
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.course-card {
  width: 401px;
  height: 423px;
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}

.card-image {
  width: 401px;
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
  padding: 14px 18px 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.tags {
  margin-bottom: 8px;
}

.category-tag {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 999px;
  background: #f0e9e3;
  color: #3c3c3c;
  font-size: 14px;
}

.course-title {
  margin: 0 0 8px;
  font-size: 1.4rem;
  font-weight: 700;
  line-height: 1.25;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.teacher {
  margin: 0 0 6px;
  color: #757575;
  font-size: 0.95rem;
  line-height: 1.4;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.datetime {
  margin: 0;
  color: #757575;
  font-size: 0.9rem;
  line-height: 1.4;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.detail-btn {
  margin-top: auto;
  width: fit-content;
  padding: 8px 14px;
  border-radius: 6px;
  background: #7d7d7d;
  color: #fff;
  text-decoration: none;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .course-card {
    width: 100%;
  }

  .card-image {
    width: 100%;
  }
}
</style>