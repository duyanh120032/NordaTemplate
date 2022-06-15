<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useModalStore } from '~~/store/modal';
import { useCartStore } from '~~/store/cart';
import { CartItem } from '~~/types/product';
// import { useToast } from 'vue-toastification';

const { product } = storeToRefs(useModalStore());
const { addToCart, addToWishlist } = useCartStore();
const { remove } = useModalStore();
const isOpenModal = ref(false);

const handleCloseModal = () => {
    isOpenModal.value = false;
    remove()
}
const selectedColor = ref('')
const selectedSize = ref('')
const selectedQuantity = ref(1)
watch(product, (newValue) => {
    if (newValue !== null) {
        selectedColor.value = newValue.colors[0];
        selectedSize.value = newValue.sizes[0];
        isOpenModal.value = true;
    } else {

        isOpenModal.value = false;
    }
});
watch(selectedQuantity, (val) => {
    if (val > product.value.stock) {
        selectedQuantity.value = product.value.stock
    }
    if (val < 1) {
        selectedQuantity.value = 1
    }
})
const handleAddToWishlist = () => {
    const _data = {
        ...product.value,
        color: selectedColor.value,
        size: selectedSize.value,
        quantity: selectedQuantity.value
    }
    addToWishlist(_data as unknown as CartItem)
}
const handleAddToCart = () => {
    const _data = {
        ...product.value,
        color: selectedColor.value,
        size: selectedSize.value,
        quantity: 1
    }
    addToCart(_data as unknown as CartItem)
}

</script>
<template>
    <Teleport to="body">
        <div class="modal fade " :class="{ show: isOpenModal }" v-if="product !== null">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-label="Close" @click="handleCloseModal"><span
                                aria-hidden="true">x</span></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-lg-5 col-md-6 col-12 col-sm-12">
                                <div class="tab-content quickview-big-img">
                                    <div id="pro-1" class="tab-pane fade show active">
                                        <img :src="product.image" alt="Big image">
                                    </div>

                                </div>
                            </div>
                            <div class="col-lg-7 col-md-6 col-12 col-sm-12">
                                <div class="product-details-content quickview-content">
                                    <h2>{{ product.title }}</h2>
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
                                    <p>Seamlessly predominate enterprise metrics without performance based process
                                        improvements.</p>
                                    <div class="pro-details-price">
                                        <span class="new-price">{{ product.price }}</span>
                                        <span class="old-price">$95.72</span>
                                    </div>
                                    <div class="pro-details-color-wrap">
                                        <span>Color:</span>
                                        <div class="pro-details-color-content">
                                            <ul>
                                                <li v-for="color in product.colors" :key="color"
                                                    @click="selectedColor = color">
                                                    <a :class="`${color} ${selectedColor === color ? 'active' : ''}`">{{
                                                            color
                                                    }}</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="pro-details-size">
                                        <span>Size:</span>
                                        <div class="pro-details-size-content">
                                            <ul>
                                                <li @click="selectedSize = size" v-for="size in product.sizes"
                                                    :key="size"><a :class="{ active: selectedSize === size }">{{
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
                                            <li><span>Categories:</span> <a href="#">Woman,</a> <a href="#">Dress,</a>
                                                <a href="#">T-Shirt</a>
                                            </li>
                                            <li><span>Tag: </span> <a href="#">Fashion,</a> <a href="#">Mentone</a> , <a
                                                    href="#">Texas</a></li>
                                        </ul>
                                    </div>
                                    <div class="pro-details-action-wrap">
                                        <div class="pro-details-add-to-cart">
                                            <a title="Add to Cart" href="#" @click="handleAddToCart">Add To Cart </a>
                                        </div>
                                        <div class="pro-details-action">
                                            <button title="Add to Wishlist" @click="handleAddToWishlist"><i
                                                    class="fa-light fa-heart"></i></button>
                                            <button title="Add to Compare"><i
                                                    class="fa-duotone fa-arrows-rotate"></i></button>
                                            <button class="social" title="Social" ><i
                                                    class="fa-light fa-share"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </teleport>
</template>

>

<style scoped lang="scss">
.modal {
    background-color: rgba(0, 0, 0, 0.5);

}

.show {
    display: block;
}
</style>