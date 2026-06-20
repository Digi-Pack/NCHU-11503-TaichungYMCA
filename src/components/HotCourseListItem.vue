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
<RouterLink class="hot-list-item"
  :to="`/courses/${course.id}`"
>
    <div class="hot-main">
      <div class="hot-top">
        <h3 class="hot-title">
          {{ course.title }}
        </h3>

        <p class="hot-date">
          {{ course.period }}
        </p>
      </div>

      <p class="hot-desc">
        {{ previewContent }}
      </p>
    </div>

    <div class="hot-btn">
      查看更多
      <span>›</span>
    </div>
  </RouterLink>
</template>

<style scoped>
.hot-list-item {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 32px;

  padding: 16px;
  border-bottom: 1px solid #b1b0b0;

  color: inherit;
  text-decoration: none;
}

.hot-main {
  flex: 1;
  min-width: 0;
}

.hot-top {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 16px;
}

.hot-title {
  margin: 0;
  font-size: 1.875rem;
  font-weight: 500;
  color: #000;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.hot-date {
  margin: 0;
  font-size: 1.25rem;
  color: #757575;
  white-space: nowrap;
}

.hot-desc {
  margin: 0;
  font-size: 1.25rem;
  line-height: 1.5;
  color: #757575;

  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;

  overflow: hidden;
}

.hot-btn {
  flex-shrink: 0;
  width: 132px;
  height: 56px;
  margin-top: 60px;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;

  background: #1e4620;
  color: #f9f6f0;
  border-radius: 8px;

  font-size: 1rem;
  font-weight: 500;

  transition: 0.3s ease;
}

.hot-btn span {
  font-size: 1.25rem;
  line-height: 1;
}

.hot-list-item:hover .hot-btn {
  background: #938d6b;
}

@media (max-width: 768px) {
  .hot-list-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .hot-top {
    width: 100%;
    flex-direction: column;
    gap: 8px;
  }

  .hot-title {
    font-size: 1.5rem;
  }

  .hot-desc,
  .hot-date {
    font-size: 1rem;
  }

  .hot-btn {
    margin-top: 0;
    align-self: flex-end;
  }
}
</style>