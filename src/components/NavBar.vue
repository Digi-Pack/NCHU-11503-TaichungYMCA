<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const navbarBg = ref("rgba(255,255,255,0.95)");

function handleScroll() {
  const scrollY = window.scrollY;

  const alpha = Math.max(
    0.4,
    0.95 - scrollY / 500
  );

  navbarBg.value = `rgba(255,255,255,${alpha})`;
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

</script>
<template>
  <header class="navbar" :style="{ backgroundColor: navbarBg }">
    <RouterLink to="/" class="logo">
      <img src="/img/logo.png" alt="北屯社區大學" />
    </RouterLink>

    <div class="nav-right">
      <nav class="nav-links">
        <RouterLink to="/news">最新消息</RouterLink>
        <RouterLink to="/about">關於我們</RouterLink>
        <RouterLink to="/locations">服務據點</RouterLink>
        <RouterLink to="/courses">所有課程</RouterLink>
      </nav>

      <div class="social-links">
        <a href="#">
          <img src="/img/fb.svg" alt="Facebook" />
        </a>
        <a href="#">
          <img src="/img/ig.png" alt="Instagram" />
        </a>
      </div>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  width: 100%;
  height: 72px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 48px;
  box-sizing: border-box;
  backdrop-filter: blur(8px);
  transition: background-color 0.3s ease;
}

.logo img {
  width: 136px;
  height: auto;
  display: block;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 24px;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 12px;
}

.nav-links a {
  font-size: 1.25rem;
  color: #1e4620;
  text-decoration: none;
  white-space: nowrap;
}

.nav-links a.router-link-active {
  font-weight: 600;
}

.social-links {
  display: flex;
  align-items: center;
  gap: 12px;
}

.social-links a {
  width: 50px;
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.social-links img {
  display: block;
}
</style>