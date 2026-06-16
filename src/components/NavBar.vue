<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const navbarBg = ref("rgba(255,255,255,0.95)");
const isMenuOpen = ref(false);

function handleScroll() {
  const scrollY = window.scrollY;

  const alpha = Math.max(0.4, 0.95 - scrollY / 500);

  navbarBg.value = `rgba(255,255,255,${alpha})`;
}

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}

function closeMenu() {
  isMenuOpen.value = false;
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
    <RouterLink to="/" class="logo" @click="closeMenu">
      <img src="/img/logo.png" alt="北屯社區大學" />
    </RouterLink>

    <button class="hamburger" @click="toggleMenu" aria-label="開啟選單">
      <span></span>
      <span></span>
      <span></span>
    </button>

    <div class="nav-right" :class="{ active: isMenuOpen }">
      <nav class="nav-links">
        <RouterLink to="/news" @click="closeMenu">最新消息</RouterLink>
        <RouterLink to="/about" @click="closeMenu">關於我們</RouterLink>
        <RouterLink to="/locations" @click="closeMenu">服務據點</RouterLink>
        <RouterLink to="/courses" @click="closeMenu">所有課程</RouterLink>
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
  max-width: 24px;
  max-height: 24px;
}

.hamburger {
  display: none;
}


/* =========================
   1024
========================= */
@media (max-width: 1024px) {
  .navbar {
    padding: 0 32px;
  }

  .logo img {
    width: 120px;
  }

  .nav-right {
    gap: 16px;
  }

  .nav-links {
    gap: 10px;
  }

  .nav-links a {
    font-size: 1rem;
  }

  .social-links a {
    width: 36px;
    height: 36px;
  }
}


/* =========================
   768 / Mobile Menu
========================= */
@media (max-width: 768px) {
  .navbar {
    height: 72px;
    padding: 0 24px;
  }

  .logo img {
    width: 120px;
  }

  .hamburger {
    width: 40px;
    height: 40px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 6px;

    background: transparent;
    border: none;
    cursor: pointer;
  }

  .hamburger span {
    width: 26px;
    height: 2px;
    background: #1e4620;
    border-radius: 999px;
  }

  .nav-right {
    position: fixed;
    top: 72px;
    left: 0;

    width: 100%;
    height: calc(100vh - 72px);

    display: none;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    padding-top: 48px;
    gap: 32px;

    background: rgba(255, 255, 255, 0.96);
    backdrop-filter: blur(8px);
  }

  .nav-right.active {
    display: flex;
  }

  .nav-links {
    flex-direction: column;
    gap: 24px;
  }

  .nav-links a {
    font-size: 1.25rem;
  }

  .social-links {
    gap: 20px;
  }

  .social-links a {
    width: 40px;
    height: 40px;
  }
}


/* =========================
   432
========================= */
@media (max-width: 432px) {
  .navbar {
    padding: 0 20px;
  }

  .logo img {
    width: 110px;
  }

  .nav-right {
    padding-top: 40px;
  }

  .nav-links {
    gap: 22px;
  }

  .nav-links a {
    font-size: 1.125rem;
  }
}
</style>