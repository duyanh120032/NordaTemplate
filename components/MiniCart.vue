<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { useCartStore } from '@/store/cart'
import { storeToRefs } from 'pinia';


const { isOpen } = defineProps({
    isOpen: {
        default: false,
        type: Boolean,
    },
});
const { getItems: cartItems,getTotal } = storeToRefs(useCartStore());
const emits = defineEmits(['close'])

// const _isOpen = toRef(props, 'isOpen');
const MiniCartRef = ref<HTMLElement | null>(null);
onClickOutside(MiniCartRef, () => {
    emits('close')
});

</script>

<template>
    <div class="sidebar-cart-active" :class="`${isOpen ? 'inside' : ''}`" ref="MiniCartRef">
        <div class="sidebar-cart-all">
            <a class="cart-close" href="#"><i class="icon_close"></i></a>
            <div class="cart-content">
                <h3>Shopping Cart</h3>
                <ul>
                    <ProductCartMini v-for="item in cartItems" :key="item.id" :data="item" />
                </ul>
                <div class="cart-total">
                    <h4>Subtotal: <span>${{getTotal}}</span></h4>
                </div>
                <div class="cart-checkout-btn">
                    <NuxtLink class="btn-hover cart-btn-style" to="/cart">view cart</NuxtLink>
                    <NuxtLink class="no-mrg btn-hover cart-btn-style" to="/cart">checkout</NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>