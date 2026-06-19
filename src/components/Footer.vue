<script setup>
import footerImg from "@/assets/img/footer/footerImg.jpg";
</script>

<template>
  <footer class="footer">
    <div class="footer-shape">
      <svg class="clip-def" width="0" height="0" aria-hidden="true" focusable="false">
        <defs>
          <clipPath id="footer-clip" clipPathUnits="objectBoundingBox">
            <path d="M0 0.99959V0.1326C0.25 -0.03957 0.75 -0.03957 1 0.1326V0.99959H0Z" />
          </clipPath>
        </defs>
      </svg>

      <img class="footer-bg" :src="footerImg" alt="" />

      <div class="footer-main">
        <div class="footer-logo">
          <img src="/img/logo.png" alt="北屯社區大學" />
        </div>
        <div class="footer-right">
          <div class="footer-contact">
            <p class="footer-title">聯絡我們</p>
            <p>臺中市北屯社區大學</p>
            <p>電話：04-2232-8823</p>
            <p>傳真：04-2230-0386</p>
            <p>地址：台中市北屯路10號5樓</p>
          </div>

          <div class="footer-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3640.3364595343937!2d120.69189229999999!3d24.159930199999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34693d5f9dde1da5%3A0xe50901b77b08b928!2zNDA06Ie65Lit5biC5YyX5Y2A6Yym56Wl6YeM5YyX5bGv6LevMTDomZ81!5e0!3m2!1szh-TW!2stw!4v1781509209703!5m2!1szh-TW!2stw"
              loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>

      </div>
    </div>

    <div class="footer-bottom">
      <p>© Copyright - Starfish Tech</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  width: 100%;
  background-color: #F0E9E3;
}

.footer-shape {
  position: relative;
  min-height: 360px;
  overflow: hidden;
}

.clip-def {
  position: absolute;
  width: 0;
  height: 0;
  overflow: hidden;
}

.footer-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  z-index: 0;
  opacity: 0.3;
  clip-path: url(#footer-clip);
}

.footer-main {
  position: relative;
  z-index: 1;
  min-height: 360px;
  box-sizing: border-box;

  max-width: 1800px;
  margin: auto;

  display: flex;
  justify-content: center;
  align-items: center;

  padding-top: 40px;

  gap: 40px;
}

.footer-logo {
  width: clamp(300px, 22vw, 400px);
  height: auto;
  flex-shrink: 1;
}

.footer-logo img {
  width: 100%;
  display: block;
}

.footer-right {
  display: flex;
  align-items: flex-start;

  gap: 40px;

  min-width: 0;
}

.footer-contact {
  width: clamp(280px, 28vw, 420px);
  flex-shrink: 1;
  align-self: stretch;
  display: flex;
  flex-direction: column;
}

.footer-contact .footer-title {
  font-size: 2.25rem;
  font-weight: 500;
  margin: 0 0 20px;
  padding-bottom: 8px;
  border-bottom: 3px solid #1E4620;
  color: #3C3C3C;
  flex-shrink: 0;
}

.footer-contact p:not(.footer-title) {
  margin: 0;
  font-size: 1.5rem;
  color: #3C3C3C;
  flex: 1;
  display: flex;
  align-items: center;
}

.footer-map {
  width: clamp(280px, 28vw, 500px);
  height: 265px;
  flex-shrink: 1;
}

.footer-map iframe {
  width: 100%;
  height: 100%;
  border: 0;
  display: block;
}

.footer-bottom {
  background: #3c3c3c;
  height: 54px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.footer-bottom p {
  margin: 0;
  color: #f9f6f0;
  font-size: 1.125rem;
  text-align: center;
}

/* 1300 */
@media (max-width: 1300px) {
  .footer-contact .footer-title {
    font-size: 2rem;
  }

  .footer-contact p:not(.footer-title) {
    font-size: 1.25rem;
  }
}

/* Tablet Landscape 1024p */
/* 1024 */
@media (max-width: 1024px) {
  .footer-main {
    width: 100%;
    flex-direction: column;
    gap: 16px;
    padding: 20px 0;
  }

  .footer-logo {
    width: 240px;
  }

  .footer-right {
    gap: clamp(50px, 10vw, 100px);
  }

  .footer-contact {
    width: 300px;
  }

  .footer-contact .footer-title {
    margin: 0;
  }

  .footer-contact p {
    font-size: 1.125rem;
    line-height: 1.6;
  }

  .footer-map {
    width: clamp(300px, calc(78.125vw - 300px), 500px);
    height: 220px;
  }
}


/* 768 */
@media (max-width: 768px) {
  .footer-main {
    width: 100%;
    flex-direction: column;
    align-items: center;
  }

  .footer-logo {
    width: 220px;
  }

  .footer-right {
    width: 100%;
    justify-content: center;
    gap: 32px;
  }

  .footer-contact {
    width: 40%;
  }

  .footer-map {
    width: 50%;
    height: 240px;
  }

  .footer-contact .footer-title {
    font-size: 1.5rem;
  }

  .footer-contact p {
    font-size: 1.125rem;
    line-height: 1.6;
  }
}

/* 550 */
@media (max-width: 550px) {
  .footer-main {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "contact logo"
      "map     map";
    align-items: start;
    padding: 70px 16px 10px;
    gap: 10px 0;
  }

  .footer-logo {
    grid-area: logo;
    width: 100%;
    align-self: center;
  }

  .footer-right {
    display: contents;
  }

  .footer-contact {
    grid-area: contact;
    width: 100%;
    text-align: left;
  }

  .footer-contact .footer-title {
    font-size: 1.25rem;
    margin-bottom: 7px;
  }

  .footer-contact p:not(.footer-title) {
    font-size: 1rem;
  }

  .footer-map {
    grid-area: map;
    width: 100%;
    height: 220px;
  }

  .footer-bottom {
    height: 48px;
  }

  .footer-bottom p {
    font-size: 0.875rem;
  }
}
</style>