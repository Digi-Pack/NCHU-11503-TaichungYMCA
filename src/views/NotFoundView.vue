<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goHome() {
  router.push('/')
}

function goBack() {
  router.back()
}
</script>

<template>
  <div class="notfound">
    <p class="notfound__code">404</p>
    <h1 class="notfound__title">找不到這個頁面</h1>
    <p class="notfound__desc">
      您要前往的頁面可能已被移除、更名，或網址輸入有誤。
    </p>

    <div class="notfound__actions">
      <button class="notfound__btn notfound__btn--primary" @click="goHome">
        回到首頁
      </button>
      <button class="notfound__btn notfound__btn--ghost" @click="goBack">
        返回上一頁
      </button>
    </div>
  </div>
</template>

<style scoped>
.notfound {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 2rem 1.25rem;
  text-align: center;
}

.notfound__code {
  font-size: 5rem;
  font-weight: 700;
  line-height: 1;
  color: #1E4620;
  margin: 0;
}

.notfound__title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #222;
  margin: 1rem 0 0.5rem;
}

.notfound__desc {
  font-size: 1rem;
  line-height: 1.7;
  color: #555;
  max-width: 26rem;
  margin: 0 0 2rem;
}

.notfound__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
}

.notfound__btn {
  font-size: 1rem;
  font-weight: 600;
  min-height: 44px;
  padding: 0.75rem 1.5rem;
  border-radius: 999px;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.notfound__btn:hover {
  opacity: 0.85;
}

.notfound__btn--primary {
  background-color: #D96B27;
  color: #fff;
  border: none;
}

.notfound__btn--ghost {
  background-color: transparent;
  color: #3C3C3C;
  border: 1px solid #706F6F;
}

@media (max-width: 520px) {
  .notfound__actions {
    flex-direction: column;
    width: 100%;
    max-width: 20rem;
  }

  .notfound__btn {
    width: 100%;
  }
}
</style>
