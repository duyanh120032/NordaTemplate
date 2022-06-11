<script setup lang="ts">
import { PropType } from 'vue';
import { Product } from '~~/types/product';

const { data } = defineProps({
    data: {
        default: Object,
        type: Object as PropType<Product>
    },
})
</script>

<template>
    <div class="shop-list-wrap mb-30" v-if="data">
        <div class="row">
            <div class="col-xl-4 col-lg-5 col-md-6 col-sm-6">
                <div class="product-list-img">
                    <a href="product-details.html">
                        <img :src="data.image" alt="Product Style">
                    </a>
                    <div class="product-list-quickview">
                        <button title="Quick View"><i class="fa-duotone fa-arrows-maximize"></i></button>
                    </div>
                </div>
            </div>
            <div class="col-xl-8 col-lg-7 col-md-6 col-sm-6">
                <div class="shop-list-content">
                    <h3><a href="product-details.html">{{ data.title }}</a></h3>
                    <div class="pro-list-price">
                        <span class="new-price">${{ data.price }}</span>
                        <span class="old-price">$45.80</span>
                    </div>
                    <div class="product-list-rating-wrap">
                        <div class="product-list-rating">
                            <i class="fa-duotone fa-star" v-for="n in 5" :key="n" style="color: yellow;"></i>
                        </div>
                        <span>(3)</span>
                    </div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipic it, sed do eiusmod
                        tempor labor incididunt ut et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip.</p>
                    <div class="product-list-action">
                        <button title="Add To Cart"><i class="fa-duotone fa-cart-shopping"></i></button>
                        <button title="Wishlist"><i class="fa-light fa-heart"></i></button>
                        <button title="Compare"><i class="fa-duotone fa-arrows-rotate"></i></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>