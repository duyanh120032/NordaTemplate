<script setup lang="ts">
import { useCartStore } from '@/store/cart'
import { storeToRefs } from 'pinia';

const { getWishlist: Items } = storeToRefs(useCartStore())
const cartStore = useCartStore()

</script>
<template>
    <div>
        <LazyLayoutsBreadcrumb />
        <div class="cart-main-area pt-115 pb-120">
            <div class="container">
                <h3 class="cart-page-title">Your cart items</h3>
                <div class="row">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                        <form action="#">
                            <div class="table-content table-responsive cart-table-content">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Image</th>
                                            <th>Product Name</th>
                                            <th>Until Price</th>
                                            <th>Qty</th>
                                            <th>Subtotal</th>
                                            <th>action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <th v-if="Items.length == 0" class="text-danger ">No item from Wishlist</th>
                                        <wish-item v-for="item in Items" :key="item.id" :data="item" />
                                    </tbody>
                                </table>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
