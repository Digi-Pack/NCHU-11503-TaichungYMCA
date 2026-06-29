<script setup>
defineProps({
  title: { type: String, default: '找不到這個頁面' },
  description: { type: String, default: '' },
  showCode: { type: Boolean, default: true },
  showImage: { type: Boolean, default: true },
})
</script>

<template>
  <div class="notfound">
    <div class="notfound__container">
      <div v-if="showImage" class="notfound__image-wrapper">
        <img src="@/assets/img/notfound/notfound.png" alt="404 Illustration" class="notfound__image" />
      </div>
      <div class="notfound__content">
        <p v-if="showCode" class="notfound__code">404</p>
        <h1 class="notfound__title">{{ title }}</h1>
        <p v-if="description" class="notfound__desc">{{ description }}</p>
        <div class="notfound__actions">
          <slot />
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
  min-height: 60vh;
  padding: 2rem 1.25rem;
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
  display: flex;
  flex-direction: column;
  align-items: center;
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
  color: #1E4620;
  margin: 1rem 0 0.5rem;
}

.notfound__desc {
  font-size: 2rem;
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

.notfound__actions:has(:slotted(button:hover)) :slotted(button:not(:hover)) {
  opacity: 0.3;
}

:slotted(.notfound__btn) {
  font-size: 2rem;
  font-weight: 600;
  min-height: 48px;
  padding: 0.75rem 2rem;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.2s ease;
}

:slotted(.notfound__btn--primary) {
  background-color: #1E4620;
  color: #F9F6F0;
  border: 2px solid transparent;
}

:slotted(.notfound__btn--ghost) {
  background-color: transparent;
  color: #1E4620;
  border: 2px solid #1E4620;
}

:slotted(.notfound__btn:hover),
:slotted(.notfound__btn.is-active) {
  background-color: #D96B27;
  color: #ffffff;
  border-color: transparent;
  transform: translateY(-2px);
}

:slotted(.notfound__btn.is-faded) {
  opacity: 0.3;
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
    font-size: 2.5rem;
  }

  .notfound__actions {
    flex-direction: column;
    width: 100%;
    max-width: 20rem;
    margin: 0 auto;
  }

  :slotted(.notfound__btn) {
    width: 100%;
  }
}
</style>
