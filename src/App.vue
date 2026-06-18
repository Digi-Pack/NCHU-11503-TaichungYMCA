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
  background-color: #f0e9e3;
}

</style>
