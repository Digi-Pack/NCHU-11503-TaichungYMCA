<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import NotFoundBlock from '@/components/NotFoundBlock.vue'

const router = useRouter()
const activeBtn = ref(null)

function goHome() {
  router.push('/')
}

function goBack() {
  router.back()
}

function setActive(btn) {
  activeBtn.value = btn
}

function clearActive() {
  activeBtn.value = null
}
</script>

<template>
  <div class="page-bg">
    <NotFoundBlock
      title="找不到這個頁面"
      description="您要前往的頁面可能已被移除、更名，或網址輸入有誤。"
    >
      <button
        class="notfound__btn notfound__btn--primary"
        :class="{ 'is-active': activeBtn === 'home', 'is-faded': activeBtn && activeBtn !== 'home' }"
        @click="goHome"
        @touchstart="setActive('home')"
        @touchend="clearActive"
      >
        回到首頁
      </button>
      <button
        class="notfound__btn notfound__btn--ghost"
        :class="{ 'is-active': activeBtn === 'back', 'is-faded': activeBtn && activeBtn !== 'back' }"
        @click="goBack"
        @touchstart="setActive('back')"
        @touchend="clearActive"
      >
        返回上一頁
      </button>
    </NotFoundBlock>
  </div>
</template>

<style scoped>
.page-bg {
  background-color: #F0E9E3;
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
