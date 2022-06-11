<script setup lang="ts">
const { data } = defineProps({
    data: {
        type: Object,
        default: () => ({})
    }
})



</script>

<template>
    <div class="single-product-wrap mb-35"  v-if="data">
        <div class="product-img product-img-zoom mb-15">
            <a href="product-details.html">
                <img :src="`${data.image?data.image:''}`" alt="">
            </a>
            <div class="product-action-2 tooltip-style-2">
                <button title="Wishlist"><i class="fa-light fa-heart"></i></button>
                <button title="Quick View"><i class="fa-duotone fa-arrows-maximize"></i></button>
                <button title="Compare"><i class="fa-duotone fa-arrows-rotate"></i></button>
            </div>
        </div>
        <div class="product-content-wrap-2 text-center">
            <div class="product-rating-wrap">
                <div class="product-rating">
                    <i class="fa-duotone fa-star" v-for="n in 5" :key="n" style="color: yellow;"></i>

                </div>
                <span>(2)</span>
            </div>
            <h3><a href="product-details.html">{{ data.title }}</a></h3>
            <div class="product-price-2">
                <span>${{ data.price }}</span>
            </div>
        </div>
        <div class="product-content-wrap-2 product-content-position text-center">
            <div class="product-rating-wrap">
                <div class="product-rating">
                    <i class="fa-duotone fa-star" v-for="n in 5" :key="n" style="color: yellow;"></i>
                </div>
                <span>(2)</span>
            </div>
            <h3><a href="product-details.html">Basic Joggin Shorts</a></h3>
            <div class="product-price-2">
                <span>$20.50</span>
            </div>
            <div class="pro-add-to-cart">
                <button title="Add to Cart">Add To Cart</button>
            </div>
        </div>
    </div>
</template>