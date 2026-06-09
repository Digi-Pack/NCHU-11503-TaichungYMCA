<script setup>
import NavBar from "./components/NavBar.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <div class="layout">
    <NavBar />

    <main class="main-content">
      暫時亂放一個東西測546545465試dfghjkjf
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRREZt-Cb1v5C4C-ssnj0XkdcZIEBWD1ZbSlD9BgwFWNA&s=10" alt="">
      <RouterView />
    </main>

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
}
</style>
