<script setup lang="ts">import { PropType } from 'vue';
import { CartItem } from '~~/types/product';
import { useCartStore } from '~~/store/cart';

const { removeCartItem } = useCartStore();
const { data } = defineProps({
    data: {
        type: Object as PropType<CartItem>,
        default: () => ({} as CartItem)
    }
})
</script>

<template>
    <div>
        <li class="single-product-cart">
            <div class="cart-img">
                <NuxtLink :to="`/detail?id=${data.id}`"><img :src="data.image" alt="Product "></NuxtLink>
            </div>
            <div class="cart-title">
                <h4>
                    <NuxtLink :to="`/detail?id=${data.id}`">{{ data.title }}</NuxtLink>
                </h4>
                <span> {{ data.quantity }} × ${{ data.price }} </span>
            </div>
            <div class="cart-delete" @click="removeCartItem(data.id)">
                <a href="#">×</a>
            </div>
        </li>
    </div>
</template>



<style scoped>
</style>