<!--
Breadcrumb 共用元件

用途：
統一全站麵包屑樣式與顏色

------------------------------------------------

使用方式

1. 引入元件

import Breadcrumb from '@/components/Breadcrumb.vue'

------------------------------------------------

2. 建立 breadcrumbItems

列表頁範例：

const breadcrumbItems = [
  { text: '首頁', to: '/' },
  { text: '課程查詢' },
]

顯示：

首頁 > 課程查詢

------------------------------------------------

詳細頁範例：

const breadcrumbItems = [
  { text: '首頁', to: '/' },
  { text: '課程查詢', to: '/courses' },
  { text: course.title },
]

顯示：

首頁 > 課程查詢 > 食農永續生活美學課

------------------------------------------------

3. 放入 Template

<Breadcrumb :items="breadcrumbItems" />

------------------------------------------------

欄位說明

text：
畫面顯示文字

to：
RouterLink 路徑
有寫 to 代表可點擊
沒寫 to 代表目前頁面

範例：

{ text: '首頁', to: '/' }

可點擊

{ text: '課程查詢' }

不可點擊

------------------------------------------------

設計規範

首頁：
#7D7D7D

其他層級：
#1E4620

字體大小：
1rem (16px)

------------------------------------------------
-->


<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <div class="breadcrumb">
    <a-breadcrumb separator=">">
      <a-breadcrumb-item v-for="(item, index) in items" :key="item.text">
        <RouterLink
          v-if="item.to"
          :to="item.to"
          :class="{
            'breadcrumb-home': index === 0,
            'breadcrumb-item': index !== 0,
          }"
        >
          {{ item.text }}
        </RouterLink>

        <span v-else class="breadcrumb-item breadcrumb-current">
          {{ item.text }}
        </span>
      </a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>

<style scoped>
.breadcrumb {
  padding: 12px;
  box-sizing: border-box;
}

.breadcrumb-home {
  color: #7d7d7d;
  font-size: 1rem;
  text-decoration: none;
}

.breadcrumb-item {
  color: #7d7d7d;
  font-size: 1rem;
  text-decoration: none;
}

.breadcrumb-current {
  color: #1e4620;
  font-weight: 500;
}

.breadcrumb :deep(.ant-breadcrumb-separator) {
  color: #1e4620;
  font-size: 1rem;
}

.breadcrumb :deep(.ant-breadcrumb-link) {
  margin-inline-start: 0;
  margin-inline-end: 0;
}

.breadcrumb :deep(.ant-breadcrumb a) {
  margin-inline-start: 0;
  margin-inline-end: 0;
}

@media (max-width: 1024px) {
  .breadcrumb-home,
  .breadcrumb-item {
    font-size: 1.25rem;
  }

  .breadcrumb :deep(.ant-breadcrumb-separator) {
    font-size: 1.25rem;
  }
}
</style>
