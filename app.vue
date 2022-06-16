<template>
  <div class="main-wrapper">
    <LayoutsHeader />
    <NuxtPage />
    <ModalProduct />
    <LayoutsFooter />
  </div>
</template>
<script setup lang="ts">
const route = useRoute()
watch(route, (newVal, oldVal) => {
  if (newVal.path === oldVal.path) {
    window.scrollTo(0, 0)
    useHead({
      title: `Norda Ecommerce | ${String(newVal.name).toUpperCase()}`,
    });
  }
})


</script>
<style lang="scss">
@import 'assets/css/vendor/bootstrap.min.css';
@import 'assets/scss/style.scss';

body {
  margin: 0;
  padding: 0;
}
</style>
