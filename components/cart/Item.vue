<script setup lang="ts">
const qty = ref(1);
watch(qty, () => {
    if (qty.value < 1) {
        qty.value = 1;
    }

});
const emits = defineEmits(['removeFromCart']);

</script>
<template>
    <tr>
        <td class="product-thumbnail">
            <a href="#"><img src="assets/images/cart/cart-1.jpg" alt=""></a>
        </td>
        <td class="product-name"><a href="#">Simple Black T-Shirt</a></td>
        <td class="product-price-cart"><span class="amount">$260.00</span></td>
        <td class="product-quantity pro-details-quality">
            <div class="cart-plus-minus">
                <div class="dec qtybutton" @click="qty--">-</div>
                <input class="cart-plus-minus-box" type="text" name="qtybutton" v-model="qty">
                <div class="inc qtybutton" @click="qty++">+</div>
            </div>
        </td>
        <td class="product-subtotal">$110.00</td>
        <td class="product-remove">
            <a href="#" @click="emits('removeFromCart')"><i class="fa-light fa-xmark"></i></a>
        </td>
    </tr>
</template>



<style scoped>
</style>