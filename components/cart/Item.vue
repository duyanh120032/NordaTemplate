<script setup lang="ts">import { PropType } from 'vue';
import { CartItem } from '~~/types/product';
import { useCartStore } from '~~/store/cart';


const {incQuantity,decQuantity,removeCartItem} = useCartStore()


const { data } = defineProps({
    data: {
        type: Object as PropType<CartItem>,
        default: () => ({})
    }
})
console.log(data);
</script>
<template>
    <tr v-if="data">
        <td class="product-thumbnail">
            <NuxtLink :to="`/detail?id=${data.id}`"><img :src="data.image" alt=""></NuxtLink>
        </td>
        <td class="product-name"><a href="#">{{data.title}}</a></td>
        <td class="product-price-cart"><span class="amount">${{data.price}}</span></td>
        <td class="product-quantity pro-details-quality">
            <div class="cart-plus-minus">
                <div class="dec qtybutton" @click="decQuantity(data.id)">-</div>
                <input class="cart-plus-minus-box" type="text" name="qtybutton" :value="data.quantity">
                <div class="inc qtybutton" @click="incQuantity(data.id)">+</div>
            </div>
        </td>
        <td class="product-subtotal">${{data.price*data.quantity}}</td>
        <td class="product-remove">
            <a href="#" @click="removeCartItem(data.id)"><i class="fa-light fa-xmark"></i></a>
        </td>
    </tr>
</template>



<style scoped>
img{
    width: 100px;
    height: 100px;
}
</style>