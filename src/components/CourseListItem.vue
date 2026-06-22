<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const props = defineProps({
  course: {
    type: Object,
    required: true,
  },
});

const previewContent = computed(() => {
  if (!props.course.content) return "";

  return Array.isArray(props.course.content)
    ? props.course.content.join("")
    : props.course.content;
});
</script>

<template>
  <RouterLink class="course-list-item" :to="{
    path: `/courses/${course.id}`,
    query: route.query,
  }">
    <div class="course-top">
      <h3 class="course-title">{{ course.title }}</h3>
      <p class="course-period">{{ course.period }}</p>
    </div>

    <div class="course-bottom">
      <p class="course-desc">{{ previewContent }}</p>
      <div class="course-btn-wrapper">
        <div class="course-btn">查看更多<span>›</span></div>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
.course-list-item,
.course-list-item:link,
.course-list-item:visited,
.course-list-item:hover,
.course-list-item:active {
  text-decoration: none;
  color: inherit;
}

.course-list-item * {
  text-decoration: none;
}

.course-list-item {
  display: flex;
  flex-direction: column;
  gap: 16px;

  padding: 24px;

  background: #ffffff;
  border-radius: 16px;

  color: inherit;

  margin-bottom: 16px;
  transition: background-color 0.2s ease;
}

.course-list-item:hover {
  background-color: #FFF8DC;
}

.course-top {
  display: flex;
  justify-content: space-between;
  gap: 24px;
}

.course-title {
  margin: 0;
  font-size: 2.25rem;
  font-weight: 500;
  color: #000;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.course-period {
  margin: 0;
  font-size: 1.5rem;
  color: #757575;
  white-space: nowrap;
}

.course-bottom {
  display: flex;
  justify-content: space-between;
  gap: 16px;
}

.course-desc {
  margin: 0;
  font-size: 1.5rem;
  line-height: 1.5;
  color: #757575;
  text-align: justify;

  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;

  overflow: hidden;
}

.course-btn-wrapper {
  display: flex;
  align-items: flex-end;
  flex-shrink: 0;
}

.course-btn {
  width: 132px;
  height: 56px;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;

  background: #1e4620;
  color: #f9f6f0;
  border-radius: 8px;

  font-size: 1.125rem;
}

.course-btn span {
  font-size: 1.5rem;
  line-height: 1;
}

.course-btn:hover {
  background: #938d6b;
}

@media (max-width: 768px) {
  .course-list-item {
    gap: 8px;
  }

  .course-top {
    flex-direction: column;
    gap: 8px;
  }

  .course-bottom {
    flex-direction: column;
    gap: 16px;
  }

  .course-btn-wrapper {
    align-items: flex-start;
  }

  .course-title {
    font-size: 1.75rem;
  }

  .course-desc,
  .course-period {
    font-size: 1.5rem;
  }
}

@media (max-width: 576px) {
  .course-list-item {
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
  }

  .course-title {
    white-space: normal;
    overflow: visible;
    text-overflow: unset;
    word-break: break-word;
  }

  .course-period {
    white-space: normal;
    font-size: 1rem;
  }

  .course-desc {
    word-break: break-word;
    overflow-wrap: break-word;
  }

  .course-btn {
    width: 120px;
    height: 48px;
    font-size: 14px;
  }
}
</style>