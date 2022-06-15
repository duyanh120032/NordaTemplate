<template>
  <div class="main-wrapper">
    <Header />
    <NuxtPage />
    <Footer />
  </div>
</template>
<script setup lang="ts">

useHead({
  title: 'Norda Ecommerce',

  link: [
    // {
    //   rel: 'stylesheet',
    //   href: './assets/css/style.min.css'

    // }, 
    {
      rel: 'stylesheet',
      href: './assets/css/vendor/bootstrap.min.css'
    },
    {
      rel: 'stylesheet',
      href: './assets/scss/style.scss'
    },
  ],

  // script: [
  //   {
  //     src: './fontawesome.js'
  //   }
  // ]
})



</script>
<style>
body {
  margin: 0;
  padding: 0;
}
</style>
