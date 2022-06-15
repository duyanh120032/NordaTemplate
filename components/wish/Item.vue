<script setup lang="ts">import { PropType } from 'vue';
import { useCartStore } from '../../store/cart';
import { CartItem } from '../../types/product';


const { incWishlistQuantity, decWishlistQuantity, addToCart } = useCartStore()


const { data } = defineProps({
    data: {
        type: Object as PropType<CartItem>,
        default: () => ({})
    }
})
const handleAddToCart = (data: CartItem) => {
    const _data = {
        ...data,
        color: data.colors[1] ? data.colors[1] : data.colors[0],
        size: data.sizes[1] ? data.sizes[1] : data.sizes[0],
        quantity: data.quantity
    }
    addToCart(_data as unknown as CartItem)
}

</script>
<template>
    <tr v-if="data">
        <td class="product-thumbnail">
            <NuxtLink :to="`/detail?id=${data.id}`"><img :src="data.image" alt=""></NuxtLink>
        </td>
        <td class="product-name"><a href="#">{{ data.title }}</a></td>
        <td class="product-price-cart"><span class="amount">${{ data.price }}</span></td>
        <td class="product-quantity pro-details-quality">
            <div class="cart-plus-minus">
                <div class="dec qtybutton" @click="decWishlistQuantity(data.id)">-</div>
                <input class="cart-plus-minus-box" type="text" name="qtybutton" :value="data.quantity">
                <div class="inc qtybutton" @click="incWishlistQuantity(data.id)">+</div>
            </div>
        </td>
        <td class="product-subtotal">${{ data.price * data.quantity }}</td>
        <td class="product-remove">
            <button @click="handleAddToCart(data)" class="btn btn-style-1">Add To Cart</button>
        </td>
    </tr>
</template>



<style scoped lang="scss">
img {
    width: 100px;
    height: 100px;
}
.btn-style-1  {
	background-color: #000;
	color: #fff;
	display: inline-block;
	font-size: 16px;
	font-weight: 600;

    &:hover {
       
        color: rgb(255, 0, 0);
    }
}
</style>