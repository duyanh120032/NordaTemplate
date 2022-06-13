<script setup lang="ts">
import { useCartStore } from '@/store/cart'
import { PropType } from 'vue';
import { CartItem, Product } from '~~/types/product';
const { data } = defineProps({
    data: {
        type: Object as PropType<Product>,
        default: () => ({})
    }
})
const { addToCart } = useCartStore()

const handleAddToCart = (data: Product) => {
    const _data = {
        ...data,
        colors: 'Blue',
        sizes: 'M',
        quantity: 1
    }
    addToCart(_data as unknown as CartItem)
}




</script>

<template>
    <div>
        <div class="single-product-wrap mb-35" v-if="data">
            <div class="product-img product-img-zoom mb-15">
                <NuxtLink :to="`/detail?id=${data.id}`">
                    <img :src="`${data.image ? data.image : ''}`" alt="">
                </NuxtLink>>
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
                <h3>
                    <NuxtLink :to="`/${data.id}`">{{ data.title }}</NuxtLink>
                </h3>
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
                <h3>
                    <NuxtLink :to="`/${data.id}`">Basic Joggin Shorts</NuxtLink>
                </h3>
                <div class="product-price-2">
                    <span>$20.50</span>
                </div>
                <div class="pro-add-to-cart">
                    <button title="Add to Cart" @click="handleAddToCart(data)">Add To Cart</button>
                </div>
            </div>
        </div>
    </div>
</template>