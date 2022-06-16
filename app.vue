<template>
  <div class="main-wrapper">
    <LayoutsHeader />
    <NuxtPage />
    <ModalProduct />
    <LayoutsFooter />
  </div>
</template>
<script setup lang="ts">

// useHead({
//   title: 'Norda Ecommerce Pinia',

//   link: [
//     {
//       rel: 'stylesheet',
//       href: './assets/css/vendor/bootstrap.min.css'
//     },
//     {
//       rel: 'stylesheet',
//       href: './assets/scss/style.scss'
//     },
//   ],

//   // script: [
//   //   {
//   //     src: './fontawesome.js'
//   //   }
//   // ]
// })



</script>
<style lang="scss">
@import 'assets/css/vendor/bootstrap.min.css';
@import 'assets/scss/style.scss';

body {
  margin: 0;
  padding: 0;
}
</style>
