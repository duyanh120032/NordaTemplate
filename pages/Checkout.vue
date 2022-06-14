<script setup lang="ts">
import { useCartStore } from "@/store/cart";
const user = useSupabaseUser();
const client = useSupabaseClient();
const isLoggedIn = ref(false);
const isOpenLogin = ref(false);
const isPendingLogin = ref(false);

const { getItems: Items, getCoupon, getTotal } = useCartStore();

const userData = reactive({
    email: '',
    password: '',
    error: '',
})
const handleLogin = async () => {
    isPendingLogin.value = true;
    const res = await client.auth.signIn({ email: userData.email, password: userData.password });
    if (res.error) {
        userData.error = res.error.message;
        isPendingLogin.value = false;
        return
    }
    userData.error = '';
    isPendingLogin.value = false;
}
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

const shippingData = reactive({
    FirstName: '',
    LastName: '',
    Email: '',
    Phone: '',
    Address: '',
    Address2: '',
    City: selectedCity.value,
    Zip: '',
    note: '',
})
watchEffect(() => {
    if (user.value) {
        isLoggedIn.value = true;
        shippingData.Email = user.value.email;
    }
});
const handleLogout = async () => {
    await client.auth.signOut();
    isLoggedIn.value = false;
}
const shippingCost = computed(() => {
    const total = getTotal;
    if (total > 100) {
        return 'Free';
    }
    return 5;
})
const grandTotal = computed(() => {
    let _total = getTotal
    if (getCoupon) {
        _total = _total - _total * getCoupon.discount / 100;
    }
    if(shippingCost.value === 'Free') {
        return _total;
    }
    return _total + shippingCost.value;
})


</script>

<template>
    <div class="checkout-main-area pt-120 pb-120">
        <div class="container">
            <div v-if="user">{{ user }} <button @click="handleLogout">Log out</button></div>
            <div class="customer-zone mb-20" v-if="!isLoggedIn">
                <p class="cart-page-title">Returning customer? <a class="checkout-click1" href="#"
                        @click="isOpenLogin = true">Click here to
                        login</a></p>
                <div class="checkout-login-info" :style="`${isOpenLogin ? 'display:block ;' : ''}`">
                    <p>If you have shopped with us before, please enter your details in the boxes below. If you are a
                        new customer, please proceed to the Billing & Shipping section.</p>
                    <form action="#" @submit.prevent="handleLogin">
                        <div class="row">
                            <div class="col-lg-6 col-md-6">
                                <div class="sin-checkout-login">
                                    <label>Email address <span>*</span></label>
                                    <input type="Email" name="user-name" v-model="userData.email">
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6">
                                <div class="sin-checkout-login">
                                    <label>Passwords <span>*</span></label>
                                    <input type="password" name="user-password" v-model="userData.password">
                                </div>
                            </div>
                        </div>
                        <div>
                            <span v-if="userData.error" class="text-danger"> Some thing went wrong</span>
                        </div>
                        <div class="button-remember-wrap">
                            <button class="button" type="submit">{{ `${isPendingLogin ? 'logging......' : 'Login'}`
                            }}</button>
                            <div class="checkout-login-toggle-btn">
                                <input type="checkbox">
                                <label>Remember me</label>
                            </div>
                        </div>
                        <div class="lost-password">
                            <a href="#">Lost your password?</a>
                        </div>
                    </form>
                    <div class="checkout-login-social">
                        <span>Login with:</span>
                        <ul>
                            <li><a href="#">Facebook</a></li>
                            <li><a href="#">Twitter</a></li>
                            <li><a href="#">Google</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="customer-zone mb-20">
                <p class="cart-page-title">Have a coupon? <a class="checkout-click3" href="#">Click here to enter your
                        code</a></p>
                <div class="checkout-login-info3">
                    <form action="#">
                        <input type="text" placeholder="Coupon code">
                        <input type="submit" value="Apply Coupon">
                    </form>
                </div>
            </div>
            <div class="checkout-wrap pt-30">
                <div class="row">
                    <div class="col-lg-7">
                        <div class="billing-info-wrap mr-50">
                            <h3>Billing Details</h3>
                            <div class="row">
                                <div class="col-lg-6 col-md-6">
                                    <div class="billing-info mb-20">
                                        <label>First Name <abbr class="required" title="required">*</abbr></label>
                                        <input type="text">
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6">
                                    <div class="billing-info mb-20">
                                        <label>Last Name <abbr class="required" title="required">*</abbr></label>
                                        <input type="text">
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <div class="billing-select mb-20">
                                        <label>City <abbr class="required" title="required">*</abbr></label>
                                        <select v-model="selectedCity">
                                            <option v-for="ct in cities" :key="ct">{{ ct }}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <div class="billing-info mb-20">
                                        <label>Street Address <abbr class="required" title="required">*</abbr></label>
                                        <input class="billing-address" placeholder="House number and street name"
                                            type="text" v-model="shippingData.Address">
                                        <input placeholder="Apartment, suite, unit etc." type="text">
                                    </div>
                                </div>
                                <div class="col-lg-12 col-md-12">
                                    <div class="billing-info mb-20">
                                        <label>State / County <abbr class="required" title="required">*</abbr></label>
                                        <input type="text" v-model="shippingData.Address2">
                                    </div>
                                </div>
                                <div class="col-lg-12 col-md-12">
                                    <div class="billing-info mb-20">
                                        <label>Postcode / ZIP <abbr class="required" title="required">*</abbr></label>
                                        <input type="text" v-model="shippingData.Zip">
                                    </div>
                                </div>
                                <div class="col-lg-12 col-md-12">
                                    <div class="billing-info mb-20">
                                        <label>Phone <abbr class="required" title="required">*</abbr></label>
                                        <input type="text" v-model="shippingData.Phone">
                                    </div>
                                </div>
                                <div class="col-lg-12 col-md-12">
                                    <div class="billing-info mb-20">
                                        <label>Email Address <abbr class="required" title="required">*</abbr></label>
                                        <input type="text" v-model="shippingData.Email">
                                    </div>
                                </div>
                            </div>
                            <div class="additional-info-wrap">
                                <label>Order notes</label>
                                <textarea placeholder="Notes about your order, e.g. special notes for delivery. "
                                    name="message" v-model="shippingData.note"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-5">
                        <div class="your-order-area">
                            <h3>Your order</h3>
                            <div class="your-order-wrap gray-bg-4">
                                <div class="your-order-info-wrap">
                                    <div class="your-order-info">
                                        <ul>
                                            <li>Product <span>Total</span></li>
                                        </ul>
                                    </div>
                                    <div class="your-order-middle">
                                        <ul>
                                            <li v-for="item in Items" :key="item.id">{{ item.title }}<span>{{ item.price
                                            }}
                                                </span></li>
                                        </ul>
                                    </div>
                                    <div class="your-order-info order-subtotal" v-if="getCoupon">
                                        <ul>
                                            <li>Coupon <span>-{{ getCoupon }} </span></li>
                                        </ul>
                                    </div>
                                    <div class="your-order-info order-shipping">
                                        <ul>
                                            <li>Shipping <p>${{ shippingCost }}</p>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="your-order-info order-total">
                                        <ul>
                                            <li>Total <span>${{ grandTotal }} </span></li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="payment-method">
                                    <div class="pay-top sin-payment">
                                        <input id="payment_method_1" class="input-radio" type="radio" value="cheque"
                                            name="payment_method">
                                        <label for="payment_method_1"> Direct Bank Transfer </label>
                                        <div class="payment-box payment_method_bacs">
                                            <p>Make your payment directly into our bank account. Please use your Order
                                                ID as the payment reference.</p>
                                        </div>
                                    </div>
                                    <div class="pay-top sin-payment">
                                        <input id="payment-method-2" class="input-radio" type="radio" value="cheque"
                                            name="payment_method">
                                        <label for="payment-method-2">Check payments</label>
                                        <div class="payment-box payment_method_bacs">
                                            <p>Make your payment directly into our bank account. Please use your Order
                                                ID as the payment reference.</p>
                                        </div>
                                    </div>
                                    <div class="pay-top sin-payment">
                                        <input id="payment-method-3" class="input-radio" type="radio" value="cheque"
                                            name="payment_method">
                                        <label for="payment-method-3">Cash on delivery </label>
                                        <div class="payment-box payment_method_bacs">
                                            <p>Make your payment directly into our bank account. Please use your Order
                                                ID as the payment reference.</p>
                                        </div>
                                    </div>
                                    <div class="pay-top sin-payment sin-payment-3">
                                        <input id="payment-method-4" class="input-radio" type="radio" value="cheque"
                                            name="payment_method">
                                        <label for="payment-method-4">PayPal <img alt=""
                                                src="assets/images/icon-img/payment.png"><a href="#">What is
                                                PayPal?</a></label>
                                        <div class="payment-box payment_method_bacs">
                                            <p>Make your payment directly into our bank account. Please use your Order
                                                ID as the payment reference.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="Place-order">
                                <a href="#">Place Order</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>