<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'

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
  <div class="notfound">
    <div class="notfound__container">
      <div class="notfound__image-wrapper">
        <img src="@/assets/img/notfound/notfound.png" alt="404 Illustration" class="notfound__image" />
      </div>
      <div class="notfound__content">
        <p class="notfound__code">頁面建立中</p>
        <h1 class="notfound__title">找不到這個頁面</h1>
        <p class="notfound__desc">
          您要前往的頁面可能已被移除、更名，或網址輸入有誤。
        </p>

        <div class="notfound__actions">
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
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.notfound {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  padding: 2rem 1.25rem;
  background-color: #F0E9E3; /* Optional background color */
}

.notfound__container {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 3rem;
  max-width: 1200px;
  width: 100%;
}

.notfound__image-wrapper {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-shrink: 0;
}

.notfound__image {
  max-width: 100%;
  height: auto;
  display: block;
  object-fit: contain;
}

.notfound__content {
  flex: 1;
  text-align: left;
}

.notfound__code {
  font-size: 5rem;
  font-weight: 700;
  line-height: 1;
  color: #1E4620;
  margin: 0;
}

.notfound__title {
  font-size: 2rem;
  font-weight: 700;
  color: #222;
  margin: 1rem 0 0.5rem;
}

.notfound__desc {
  font-size: 1.5rem;
  line-height: 1.7;
  color: #555;
  max-width: 30rem;
  margin: 0 0 2rem;
}

.notfound__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.notfound__actions:has(.notfound__btn:hover) .notfound__btn:not(:hover) {
  opacity: 0.3;
}

.notfound__btn {
  font-size: 1rem;
  font-weight: 600;
  min-height: 48px;
  padding: 0.75rem 2rem;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: #1E4620;
  color: #F9F6F0;
  border: none;
}

.notfound__btn:hover {
  background-color: #D96B27;
  color: #ffffff;
  opacity: 1;
  transform: translateY(-2px);
}

.notfound__btn.is-active {
  background-color: #D96B27;
  color: #ffffff;
  border-color: transparent;
  transform: translateY(-2px);
}

.notfound__btn.is-faded {
  opacity: 0.3;
}
.notfound__btn--primary {
  background-color: #1E4620;
  color: #F9F6F0;
  border: 2px solid transparent;
}

.notfound__btn--ghost {
  background-color: transparent;
  color: #1E4620;
  border: 2px solid #1E4620;
}

.notfound__btn--ghost:hover {
  background-color: #D96B27;
  color: #ffffff;
  border-color: transparent;
  transform: translateY(-2px);
}



@media (max-width: 992px) {
  .notfound__container {
    flex-direction: column;
    text-align: center;
    gap: 2rem;
  }

  .notfound__content {
    text-align: center;
    
  }

  .notfound__desc {
    margin: 0 auto 2rem;
    width: 100%;
  }

  .notfound__actions {
    justify-content: center;
  }
}

@media (max-width: 520px) {
  .notfound__code {
    font-size: 4rem;
  }

  .notfound__title {
    font-size: 1.75rem;
  }

  .notfound__actions {
    flex-direction: column;
    width: 100%;
    max-width: 20rem;
    margin: 0 auto;
  }

  .notfound__btn {
    width: 100%;
  }
}
</style>