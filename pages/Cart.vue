<script setup lang="ts">
import { useCartStore } from '@/store/cart'
import { storeToRefs } from 'pinia';
import { useToast } from 'vue-toastification';

const toast = useToast();

const { getItems: cartItems, getTotal } = storeToRefs(useCartStore())
const client = useSupabaseClient()
const cartStore = useCartStore()
const handleClearCart = () => {
    cartStore.$reset()
}
const coupon = ref('')
const couponError = ref('')
const discount = ref(0)
const handleApplyCoupon = async () => {
    if (coupon.value.length > 0) {
        const { data: Coupon, error } = await client.from('Coupons').select('*').eq('code', coupon.value).single()
        if (error) {
            couponError.value = 'Coupon not found'
        } else {
            discount.value = Coupon.discount
            couponError.value = ''
            toast.success('Coupon applied')
            cartStore.applyCoupon(Coupon)
        }

    }
}
const grandTotal = computed(() => {
    return getTotal.value - getTotal.value * discount.value / 100
})
// shipping options
const shippingOptions = ref([
    {
        name: 'Free Shipping',
        price: 0
    },
    {
        name: 'Standard Shipping',
        price: 10
    },
    {
        name: 'Express Shipping',
        price: 20
    }
])
const selectedShipping = ref(shippingOptions.value[0])
const cities = [
    'Hà nội',
    'TP. Hồ Chí Minh',
    'Đà Nẵng',
    'Quảng Nam',
    'Quảng Ngãi',
    'Quảng Ninh',
    'Quảng Trị',
    'Sơn La',
    'Thanh Hóa',
    'Thừa Thiên Huế',
    'Vĩnh Phúc',
    'Yên Bái',
    'Đồng Nai',
    'Bình Dương',
    'Bình Phước',
    'Bình Thuận',
]
const selectedCity = ref(cities[0])
const states = computed<string[]>(() => {
    if (selectedCity.value === 'Hà nội') {
        return ['Quận Bắc Từ Liêm', 'Quận Đống Đa', 'Quận Cầu Giấy', 'Quận Hà Đông', 'Quận Ba Đình', 'Quận Hoàn Kiếm', 'Quận Hai Bà Trưng', 'Quận Hoàng Mai', 'Quận Long Biên', 'Quận Đống Đa', 'Quận Cầu Giấy', 'Quận Hà Đông', 'Quận Bắc Từ Liêm', 'Quận Nam Từ Liêm', 'Quận Thanh Xuân', 'Quận Sơn Tây', 'Quận Bình Tân', 'Huyện Bắc Mỹ', 'Huyện Nam Mỹ', 'Huyện Mỹ Thoải', 'Huyện Mỹ Xuyên', 'Huyện Thạch Thất', 'Huyện Cầu Ngang', 'Huyện Gia Lâm', 'Huyện Thảo Đức', 'Huyện Phúc Thọ', 'Huyện Thủ Đức', 'Huyện Hưng Đảo', 'Huyện V']
    }
    if (selectedCity.value === 'TP. Hồ Chí Minh') {
        return ['Quận 1', 'Quận 2', 'Quận 3', 'Quận 4', 'Quận 5', 'Quận 6', 'Quận 7', 'Quận 8', 'Quận 9', 'Quận 10', 'Quận 11', 'Quận 12', 'Quận Phú Nhuận', 'Quận Bình Thạnh', 'Quận Tân Bình', 'Quận Tân Phú', 'Quận Gò Vấp']
    }
    return []
})
const selectedState = ref(states.value[0])
const zipCode = ref('')
const isValid = computed(() => {
    return cartItems.value.length > 0
})
</script>
<template>
    <div>
        <layouts-breadcrumb />
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
                                        <th v-if="cartItems.length == 0" class="text-danger ">No item from cart</th>
                                        <cart-item v-for="item in cartItems" :key="item.id" :data="item" />
                                    </tbody>
                                </table>
                            </div>
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="cart-shiping-update-wrapper">
                                        <div class="cart-shiping-update">
                                            <NuxtLink to="/Shop">Continue Shopping</NuxtLink>
                                        </div>
                                        <div class="cart-clear">
                                            <button>Update Cart</button>
                                            <a href="#" @click="handleClearCart">Clear Cart</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div class="row">
                            <div class="col-lg-4 col-md-6">
                                <div class="cart-tax">
                                    <div class="title-wrap">
                                        <h4 class="cart-bottom-title section-bg-gray">Estimate Shipping And Tax</h4>
                                    </div>
                                    <div class="tax-wrapper">
                                        <p>Enter your destination to get a shipping estimate.</p>
                                        <div class="tax-select-wrapper">
                                            <div class="tax-select">
                                                <label>
                                                    * Country
                                                </label>
                                                <select class="email s-email s-wid" v-model="selectedCity">
                                                    <option v-for="ct in cities" :key="ct">{{ ct }}</option>

                                                </select>
                                            </div>
                                            <div class="tax-select">
                                                <label>
                                                    * Region / State
                                                </label>
                                                <select class="email s-email s-wid" v-model="selectedState">
                                                    <option v-for="st in states" :key="st">{{ st }}</option>

                                                </select>
                                            </div>
                                            <div class="tax-select">
                                                <label>
                                                    * Zip/Postal Code
                                                </label>
                                                <input type="text" v-model="zipCode">
                                            </div>
                                            <button class="cart-btn-2" type="submit">Get A Quote</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-6">
                                <div class="discount-code-wrapper">
                                    <div class="title-wrap">
                                        <h4 class="cart-bottom-title section-bg-gray">Use Coupon Code</h4>
                                    </div>
                                    <div class="discount-code">
                                        <p>Enter your coupon code if you have one.</p>
                                        <form @submit.prevent="handleApplyCoupon">
                                            <input type="text" name="name" v-model="coupon">
                                            <button class="cart-btn-2" type="submit">Apply Coupon</button>
                                        </form>
                                        <p v-if="couponError !== ''">{{ couponError }}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-12">
                                <div class="grand-totall">
                                    <div class="title-wrap">
                                        <h4 class="cart-bottom-title section-bg-gary-cart">Cart Total</h4>
                                    </div>
                                    <h5>Total products <span>${{ getTotal }}</span></h5>
                                    <h5 v-if="coupon">Discount <span>-{{ discount }}%</span></h5>
                                    <div class="total-shipping">
                                        <h5>Total shipping</h5>
                                        <ul>
                                            <li v-for="otp in shippingOptions" :key="otp.name">
                                                <input type="radio" name="shipping" :value="otp"
                                                    v-model="selectedShipping">
                                                {{ otp.name }} <span>${{ otp.price }}</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <h4 class="grand-totall-title">Grand Total <span>${{ grandTotal }}</span></h4>
                                    <NuxtLink to="/checkout" :class="`${!isValid ? 'btn disabled' : ''}`">Proceed to
                                        Checkout</NuxtLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>
</style>