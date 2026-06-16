<script setup>
import NavBar from "./components/NavBar.vue";
import Footer from "./components/Footer.vue";
import OpinionBtn from "./components/OpinionBtn.vue";
</script>

<template>
  <div class="layout">
    <NavBar />

    <main class="main-content">
      <RouterView />
     暫放 大家加油
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRREZt-Cb1v5C4C-ssnj0XkdcZIEBWD1ZbSlD9BgwFWNA&s=10" alt="">
    </main>

    <OpinionBtn></OpinionBtn>
    <Footer />
  </div>
</template>

<style>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}


.main-content {
  flex: 1;

  /* /* 新增這行 *避免內容被蓋住/ */
  padding-top: 72px;
}

</style>
