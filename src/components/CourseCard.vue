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
      <img
        :src="course.thumbnail || 'https://placehold.co/401x240'"
        :alt="course.title"
      />
    </div>

    <div class="card-content">
      <div class="category-tag">
        {{ course.category }}
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

      <RouterLink
        :to="`/courses/${course.id}`"
        class="detail-btn"
      >
        查看更多 ＞
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.course-card {
  width: 401px;
  height: 423px;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
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

/* ========================= */

.card-content {
  height: 183px;
  padding: 14px 18px;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
}

.category-tag {
  width: fit-content;

  padding: 4px 10px;

  background: #f4eee9;

  border-radius: 999px;

  font-size: 13px;

  color: #3c3c3c;

  margin-bottom: 10px;
}

/* ========================= */
/* 課程名稱固定一行 */
/* ========================= */

.course-title {
  margin: 0;

  font-size: 1.8rem;

  font-weight: 700;

  line-height: 1.2;

  white-space: nowrap;

  overflow: hidden;

  text-overflow: ellipsis;

  margin-bottom: 8px;
}

/* ========================= */
/* 老師固定一行 */
/* ========================= */

.teacher {
  margin: 0;

  font-size: 0.95rem;

  color: #757575;

  white-space: nowrap;

  overflow: hidden;

  text-overflow: ellipsis;

  margin-bottom: 8px;
}

/* ========================= */
/* 日期時間固定一行 */
/* ========================= */

.datetime {
  margin: 0;

  font-size: 0.9rem;

  color: #757575;

  white-space: nowrap;

  overflow: hidden;

  text-overflow: ellipsis;
}

/* ========================= */

.detail-btn {
  margin-top: auto;

  width: fit-content;

  padding: 8px 16px;

  background: #7d7d7d;

  color: white;

  text-decoration: none;

  border-radius: 6px;

  font-size: 14px;

  transition: 0.2s;
}

.detail-btn:hover {
  background: #5f5f5f;
}
</style>