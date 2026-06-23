<script setup>
import { computed } from "vue";

const props = defineProps({
  course: {
    type: Object,
    required: true,
  },
});

const previewContent = computed(() => {
  if (!props.course.content) return "";

  const text = Array.isArray(props.course.content)
    ? props.course.content.join("")
    : props.course.content;

  return text.length > 120 ? text.slice(0, 120) + "..." : text;
});
</script>

<template>
  <RouterLink class="hot-list-item" :to="`/courses/${course.id}`">
    <div class="hot-top">
      <h3 class="hot-title">{{ course.title }}</h3>
      <p class="hot-date">{{ course.period }}</p>
    </div>

    <div class="hot-bottom">
      <p class="hot-desc">{{ previewContent }}</p>
      <div class="hot-btn-wrapper">
        <div class="hot-btn">查看更多<span>›</span></div>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
.hot-list-item,
.hot-list-item:link,
.hot-list-item:visited,
.hot-list-item:hover,
.hot-list-item:active {
  text-decoration: none;
  color: inherit;
}

.hot-list-item * {
  text-decoration: none;
}

.hot-list-item {
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

.hot-list-item:hover {
  background-color: #FFF8DC;
}

.hot-top {
  display: flex;
  justify-content: space-between;
  gap: 24px;
}

.hot-title {
  margin: 0;
  font-size: 2.25rem;
  font-weight: 500;
  color: #000;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.hot-date {
  margin: 0;
  font-size: 1.5rem;
  color: #757575;
  white-space: nowrap;
}

.hot-bottom {
  display: flex;
  justify-content: space-between;
  gap: 16px;
}

.hot-desc {
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

.hot-btn-wrapper {
  display: flex;
  align-items: flex-end;
  flex-shrink: 0;
}

.hot-btn {
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

.hot-btn span {
  font-size: 1.5rem;
  line-height: 1;
}

.hot-btn:hover {
  background: #938d6b;
}

@media (max-width: 1000px) {
  .hot-top {
    flex-direction: column;
    gap: 8px;
  }
}

@media (max-width: 768px) {
  .hot-list-item {
    gap: 8px;
  }

  .hot-top {
    flex-direction: column;
    gap: 8px;
  }

  .hot-bottom {
    flex-direction: column;
    gap: 16px;
  }

  .hot-btn-wrapper {
    align-items: flex-start;
  }

  .hot-title {
    font-size: 1.75rem;
  }

  .hot-desc,
  .hot-date {
    font-size: 1.5rem;
  }
}

@media (max-width: 576px) {
  .hot-list-item {
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
  }

  .hot-title {
    white-space: normal;
    overflow: visible;
    text-overflow: unset;
    word-break: break-word;
  }

  .hot-date {
    white-space: normal;
    /* font-size: 1rem; */
  }

  .hot-desc {
    word-break: break-word;
    overflow-wrap: break-word;
  }

  .hot-btn {
    width: 120px;
    height: 48px;
    /* font-size: 14px; */
  }
}
</style>
