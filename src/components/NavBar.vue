<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { FacebookFilled, InstagramOutlined, MenuOutlined, CloseOutlined } from "@ant-design/icons-vue";

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

    <button class="hamburger" @click="toggleMenu" :aria-label="isMenuOpen ? '關閉選單' : '開啟選單'">
      <CloseOutlined v-if="isMenuOpen" class="hamburger-icon" />
      <MenuOutlined v-else class="hamburger-icon" />
    </button>

    <div class="nav-right" :class="{ active: isMenuOpen }">
      <nav class="nav-links">
        <RouterLink to="/news" @click="closeMenu">最新消息</RouterLink>
        <RouterLink to="/about" @click="closeMenu">關於我們</RouterLink>
        <RouterLink to="/locations" @click="closeMenu">服務據點</RouterLink>
        <RouterLink to="/courses" @click="closeMenu">所有課程</RouterLink>
      </nav>

      <div class="social-links">
        <a href="https://www.facebook.com/BEITUN.COMMUNITY" target="blank">
          <FacebookFilled class="social-icon" />
        </a>
        <!-- <a href="#">
          <InstagramOutlined class="social-icon" />
        </a> -->
      </div>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  width: 100%;
  /* height: 72px; */
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 20px 24px;
  box-sizing: border-box;

  backdrop-filter: blur(8px);
  transition: background-color 0.3s ease;
}

.logo img {
  height: 72px;
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
  gap: 24px;
}

.nav-links a {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 104px;
  height: 54px;
  padding: 16px;
  font-size: 1.25rem;
  color: #1e4620;
  text-decoration: none;
  white-space: nowrap;
  border-radius: 8px;
  border: unset;
}

.nav-links a:hover {
  background-color: #938d6b;
  color: #f0e9e3;
}

.nav-links a.router-link-active {
  background-color: #1e4620;
  color: #f0e9e3;
}

.social-links {
  display: flex;
  align-items: center;
  gap: 5px;
}

.social-links a {
  width: 50px;
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
}

.social-links a:hover {
  background-color: #938d6b;
}

.social-links .social-icon {
  font-size: 2.25rem;
  color: #1e4620;
}

.social-links a:hover .social-icon {
  color: #f0e9e3;
}

.hamburger {
  display: none;
}


/* =========================
   1024
========================= */
@media (max-width: 1024px) {
  .navbar {
    padding: 10px 24px;
  }

  .nav-right {
    gap: 16px;
  }

  .nav-links {
    gap: 16px;
  }
}


/* =========================
   768 / Mobile Menu
========================= */
@media (max-width: 768px) {
  .navbar {
    padding: 10px 24px;
  }

  .hamburger {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 6px;

    background: transparent;
    border: none;
    cursor: pointer;
  }

  .hamburger-icon {
    font-size: 2rem;
    color: #1e4620;
  }

  .nav-right {
    position: fixed;
    top: 92px;
    left: 0;

    width: 100%;
    height: calc(100vh - 92px);

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
    font-size: 1.75rem;
    width: auto;
    height: auto;
  }

  .social-links {
    gap: 20px;
  }

  .social-links a {
    width: auto;
    height: auto;
    padding: 6px;
  }

  .social-links .social-icon {
    font-size: 3rem;
  }
}


/* =========================
   432
========================= */
@media (max-width: 432px) {
  .navbar {
    padding: 10px 20px;
  }


  .nav-right {
    padding-top: 40px;
  }

  .nav-links {
    gap: 24px;
  }

  .nav-links a {
    font-size: 1.5rem;
  }
}
</style>