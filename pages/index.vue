<script setup lang="ts">import { Product } from '~~/types/product'

const client = useSupabaseClient()
const { data: sliderProduct } = await client.from<Product>('Product').select('*').range(0, 3)
</script>
<template>
    <div class="home">
        <Slider :data="sliderProduct" />
        <Service />
        <ProductFeature />
    </div>
</template>


<style scoped>
.home {
    color: red;
    min-height: 90vh;
}
</style>