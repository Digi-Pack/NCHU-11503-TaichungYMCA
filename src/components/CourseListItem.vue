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

  const text = Array.isArray(props.course.content)
    ? props.course.content.join("")
    : props.course.content;

  return text.length > 120 ? text.slice(0, 120) + "..." : text;
});
</script>

<template>
  <RouterLink class="course-list-item" :to="{
    path: `/courses/${course.id}`,
    query: route.query,
  }">
    <div class="course-main">
      <div class="course-top">
        <h3 class="course-title">
          {{ course.title }}
        </h3>

        <p class="course-period">
          {{ course.period }}
        </p>
      </div>

      <p class="course-desc">
        {{ previewContent }}
      </p>
    </div>

    <div class="course-btn">
      查看更多
      <span>›</span>
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
  align-items: flex-start;
  justify-content: space-between;
  gap: 32px;

  padding: 16px;
  border-bottom: 1px solid #b1b0b0;

  color: inherit;
}

.course-main {
  flex: 1;
  min-width: 0;
}

.course-top {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 16px;
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

.course-desc {
  margin: 0;
  font-size: 1.5rem;
  line-height: 1.5;
  color: #757575;

  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;

  overflow: hidden;
}

.course-btn {
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

  font-size: 1.125rem;
}


.course-btn span {
  font-size: 1.5rem;
  line-height: 1;
}

.course-list-item:hover .course-btn {
  background: #938d6b;
}

@media (max-width: 768px) {
  .course-list-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .course-top {
    width: 100%;
    flex-direction: column;
    gap: 8px;
  }

  .course-title {
    font-size: 1.5rem;
  }

  .course-desc,
  .course-period {
    font-size: 1rem;
  }

  .course-btn {
    margin-top: 0;
    align-self: flex-end;
  }
}

@media (max-width: 576px) {
  .course-list-item {
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
  }

  .course-main {
    width: 100%;
    min-width: 0;
  }

  .course-top {
    width: 100%;
    flex-direction: column;
    gap: 8px;
  }

  .course-title {
    white-space: normal;
    overflow: visible;
    text-overflow: unset;
    word-break: break-word;
    font-size: 1.375rem;
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
    margin-top: 0;
    align-self: flex-end;
    font-size: 14px;
  }
}

@media (max-width: 390px) {

  .course-list-item,
  .hot-list-item {
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
  }

  .course-main,
  .hot-main {
    width: 100%;
    min-width: 0;
  }

  .course-btn,
  .hot-btn {
    width: 120px;
    height: 48px;
    font-size: 14px;
  }
}
</style>