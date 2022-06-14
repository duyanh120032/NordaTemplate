<script lang="ts" setup>
import { ProductDetail, CartItem } from "@/types/product"
import { useCartStore } from "@/store/cart"
const route = useRoute()
const client = useSupabaseClient()
const { addToCart, addToWishlist } = useCartStore()

const { data: product, error } = await client.from<ProductDetail>('Product').select(`*,catSlug:category.slug`).eq('id', route.query.id as string).single()
if (!error) {
    await client.from('Product').update({
        views: product.views + 1
    }).eq('id', route.query.id as string)
}
const selectedQuantity = ref(1)
const selectedColor = ref(product.colors[0])
const selectedSize = ref(product.sizes[0])

const handleAddToCart = () => {
    const _data = {
        ...product,
        color: selectedColor.value,
        size: selectedSize.value,
        quantity: 1
    }
    addToCart(_data as unknown as CartItem)
}
const handleAddToWishlist = () => {
    const _data = {
        ...product,
        color: selectedColor.value,
        size: selectedSize.value,
        quantity: selectedQuantity.value
    }
    addToWishlist(_data as unknown as CartItem)
}
watch(selectedQuantity, (val) => {
    if (val > product.stock) {
        selectedQuantity.value = product.stock
    }
    if (val < 1) {
        selectedQuantity.value = 1
    }
})

</script>

<template>
    <div>
        <div class="product-details-area pt-120 pb-115" v-if="!error">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6 col-md-6">
                        <div class="product-details-fixed-img">
                            <div class="easyzoom-style">
                                <div class="easyzoom easyzoom--overlay">
                                    <a href="assets/images/product-details/b-large-1.jpg">
                                        <img :src="`${product.image ? product.image : 'assets/images/product-details/large-1.jpg'}`"
                                            alt="Imagae large">
                                    </a>
                                </div>
                                <a class="easyzoom-pop-up img-popup"
                                    href="assets/images/product-details/b-large-1.jpg"><i
                                        class="fa-duotone fa-arrows-maximize"></i></a>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-6">
                        <div class="product-details-content pro-details-content-mrg">
                            <h2> {{ product.title }}</h2>
                            <div class="product-ratting-review-wrap">
                                <div class="product-ratting-digit-wrap">
                                    <div class="product-ratting">
                                        <i class="fa-duotone fa-star" v-for="n in 5" :key="n"
                                            :style="`${n <= 4 ? 'color: yellow;' : ''}`"></i>

                                    </div>
                                    <div class="product-digit">
                                        <span>5.0</span>
                                    </div>
                                </div>
                                <div class="product-review-order">
                                    <span>62 Reviews</span>
                                    <span>242 orders</span>
                                </div>
                            </div>
                            <p>Seamlessly predominate enterprise metrics without performance based process improvements.
                            </p>
                            <div class="pro-details-price">
                                <span class="new-price">${{ product.price }}</span>
                                <span class="old-price">$95.72</span>
                            </div>
                            <div class="pro-details-color-wrap">
                                <span>Color:</span>
                                <div class="pro-details-color-content">
                                    <ul>
                                        <li v-for="color in product.colors" :key="color" @click="selectedColor = color">
                                            <a :class="`${color} ${selectedColor === color ? 'active' : ''}`">{{ color
                                            }}</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="pro-details-size">
                                <span>Size:</span>
                                <div class="pro-details-size-content">
                                    <ul>
                                        <li @click="selectedSize = size" v-for="size in product.sizes" :key="size"><a
                                                :class="{ active: selectedSize === size }">{{
                                                        size
                                                }}</a></li>

                                    </ul>
                                </div>
                            </div>
                            <div class="pro-details-quality">
                                <span>Quantity:</span>
                                <div class="cart-plus-minus">
                                    <div class="dec qtybutton" @click="selectedQuantity--">-</div>
                                    <input class="cart-plus-minus-box" type="text" name="qtybutton"
                                        :value="selectedQuantity">
                                    <div class="inc qtybutton" @click="selectedQuantity++">+</div>
                                </div>
                            </div>
                            <div class="product-details-meta">
                                <ul>
                                    <li><span>Categories:</span> <a href="#">{{ product.catSlug }}</a></li>
                                </ul>
                            </div>
                            <div class="pro-details-action-wrap">
                                <div class="pro-details-add-to-cart">
                                    <a title="Add to Cart" href="#" @click="handleAddToCart">Add To Cart </a>
                                </div>
                                <div class="pro-details-action">
                                    <a title="Add to Wishlist" href="#" @click="handleAddToWishlist"><i
                                            class="fa-light fa-heart"></i></a>
                                    <a title="Add to Compare" href="#"><i class="fa-duotone fa-arrows-rotate"></i></a>
                                    <a class="social" title="Social" href="#"><i class="fa-light fa-share"></i></a>
                                    <div class="product-dec-social">
                                        <a class="facebook" title="Facebook" href="#"><i
                                                class="icon-social-facebook"></i></a>
                                        <a class="twitter" title="Twitter" href="#"><i
                                                class="fa-duotone fa-arrows-rotate"></i></a>
                                        <a class="instagram" title="Instagram" href="#"><i
                                                class="icon-social-instagram"></i></a>
                                        <a class="pinterest" title="Pinterest" href="#"><i
                                                class="icon-social-pinterest"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>