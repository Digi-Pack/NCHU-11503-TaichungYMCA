<template>
  <header class="navbar">
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 48px;
  background-color: #fff;
  box-sizing: border-box;
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
  color: #1E4620;
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