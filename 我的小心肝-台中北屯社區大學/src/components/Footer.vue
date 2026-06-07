<template>
  <footer class="footer">
    <div class="footer-shape">
      <svg viewBox="0 0 1920 515" preserveAspectRatio="none">
        <path
          d="M0 514.788V68.2881C367 -1.2119 808 5.7881 973.5 1.7881C1353.9 -10.2119 1762.67 41.1214 1919.5 68.2881V514.788H0Z"
          fill="#D9D9D9"
        />
      </svg>

      <div class="footer-main">
        <div class="footer-logo">
          <img src="/img/logo.png" alt="北屯社區大學" />
        </div>
                <div class="footer-contact">
          <p class="footer-title">聯絡我們</p>
          <p>臺中市北屯社區大學</p>
          <p>電話：04-2232-8823</p>
          <p>傳真：04-2230-0386</p>
          <p>地址：台中市北屯路10號5樓</p>
        </div>

        <div class="footer-nav">
          <p class="footer-title">網站導航</p>
          <RouterLink to="/about">關於我們</RouterLink>
          <RouterLink to="/locations">服務據點</RouterLink>
          <RouterLink to="/courses">所有課程</RouterLink>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <p>© Copyright - 2017 台中YMCA All Rights Reserved.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  width: 100%;
}

/* 灰色主體 */
.footer-shape {
  position: relative;
  min-height: 515px;
  overflow: hidden;
}

.footer-shape svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.footer-main {
  position: relative;
  z-index: 1;

  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 80px;

  padding: 170px 120px 80px;
}

/* Logo區 */
.footer-logo {
  width: 320px;
}

.footer-logo img {
  width: 100%;
  display: block;
}

/* 聯絡資訊 */
.footer-contact {
  width: 500px;
}

.footer-title {
  font-size: 24px;
  font-weight: 700;

  margin: 0 0 24px 0;
  padding-bottom: 8px;

  border-bottom: 1px solid #000;
}

.footer-contact p {
  margin: 0 0 12px 0;

  font-size: 16px;
  line-height: 1.8;

  color: #2d2d2d;
}

/* 網站導航 */
.footer-nav {
  width: 350px;

  display: flex;
  flex-direction: column;
}

.footer-nav a {
  text-decoration: none;

  color: #2d2d2d;

  font-size: 16px;

  margin-bottom: 12px;
}

.footer-nav a:hover {
  text-decoration: underline;
}

/* Copyright */
.footer-bottom {
  background: #000;

  padding: 16px 32px;
}

.footer-bottom p {
  margin: 0;

  color: #ebe3e0;

  font-size: 14px;
}
</style>
