<template>
  <footer class="footer">
    <div class="footer-shape">
      <svg viewBox="0 0 1920 515" preserveAspectRatio="none">
        <defs>
          <pattern id="footerPattern" patternUnits="userSpaceOnUse" width="1920" height="515">
            <image
              href="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJjc5HYDDPSlfz0Yolwc9TTfd6Ww5KG7l2lrhFUrLa86ySGS3anRUE1CQ&s=10"
              width="1920" height="515" preserveAspectRatio="xMidYMid slice" />
          </pattern>
        </defs>
  <!-- 弧形的圖片改上面的網址 -->
        <path
          d="M0 514.788V68.2881C367 -1.2119 808 5.7881 973.5 1.7881C1353.9 -10.2119 1762.67 41.1214 1919.5 68.2881V514.788H0Z"
          fill="url(#footerPattern)" />
      </svg>

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
}

.footer-shape {
  position: relative;
  height: 514px;
  overflow: hidden;
  opacity:60%; 
  /* 字很淺先把圖片的透明度設高 */
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
  min-height: 515px;
  box-sizing: border-box;

  display: flex;
  justify-content: center;
  align-items: start;
  gap: 80px;
  padding: 190px 250px 250px;
}

.footer-logo {
  width: 400px;
  height: 171px;
  flex-shrink: 0;
}

.footer-logo img {
  width: 100%;
  display: block;
}

.footer-right {
  display: flex;
  align-items: flex-start;
  gap: 80px;
}

.footer-contact {
  width: 420px;
  flex-shrink: 0;
}

.footer-contact .footer-title {
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 20px;
  padding-bottom: 8px;
  border-bottom: 1px solid #000;
  color: rgba(71, 65, 53, 1);
}



.footer-contact p {
  margin: 0 0 10px;
  font-size: 1.5rem;
  color: #2d2d2d;
}

.footer-map {
  width: 392px;
  height: 265px;
  flex-shrink: 0;
}

.footer-map iframe {
  width: 100%;
  height: 100%;
  border: 0;
  display: block;
}

.footer-bottom {
  background: #3C3C3C;
  height: 54px;
  display: flex;
  justify-content: center;
  align-items: center;
}



.footer-bottom p {
  margin: 0;
  color: #F9F6F0;
  font-size: 1.125rem;
  text-align: center;

}
</style>