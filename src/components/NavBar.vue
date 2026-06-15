<template>
  <header class="navbar">
    <RouterLink to="/" class="logo">
      <img src="/img/logo.png" alt="北屯社區大學" />
    </RouterLink>

    <nav class="nav-links">
      <RouterLink to="/news">最新消息</RouterLink>
      <RouterLink to="/about">關於我們</RouterLink>
      <RouterLink to="/locations">服務據點</RouterLink>
      <RouterLink to="/courses">所有課程</RouterLink>
    </nav>
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
  background-color: fff;
  box-sizing: border-box;
}

.logo img {
  width: 136px;
  height: auto;
  display: block;
}

.nav-links {
  display: flex;
  gap: 12px;
}

.nav-links a {
  font-size: 18px;
  color: #1E4620;
  text-decoration: none;
}

.nav-links a.router-link-active {
  font-weight: 600;
}
</style>