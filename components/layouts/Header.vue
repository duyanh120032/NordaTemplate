<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useCartStore } from '~~/store/cart';

const isOpenSearch = useState('search-close', () => false);
const isOpenCart = useState('cart-close', () => false);
const searchKey = ref('');
const router = useRouter()

const headerRef = ref<HTMLElement | null>(null)
const onCloseCart = () => {
    isOpenCart.value = false
}
const handleSearch = () => {
    if (searchKey.value.length > 0) {
        navigateTo('/shop?q=' + searchKey.value)
    }
    console.log(searchKey.value)
}
const isOpenMobileSidebar = useState('false', () => false);
const { getCount, getCountWishlist } = storeToRefs(useCartStore())

</script>

<template>
    <div style="margin-bottom:150px ;">
        <header class="header-area transparent-bar section-padding-1" ref="headerRef">
            <div class="container-fluid">
                <div class="header-large-device">
                    <div class="header-top header-top-ptb-1 border-bottom-1">
                        <div class="row">
                            <div class="col-xl-4 col-lg-5">
                                <div class="header-offer-wrap">
                                    <p><i class="fa-thin fa-paper-plane"></i> FREE SHIPPING world wide for all orders
                                        over
                                        <span>$199</span>
                                    </p>
                                </div>
                            </div>
                            <div class="col-xl-8 col-lg-7">
                                <div class="header-top-right">
                                    <div class="same-style-wrap">
                                        <div class="same-style same-style-border track-order">
                                            <NuxtLink to="/trackorder">Track Your Order</NuxtLink>
                                        </div>
                                        <div class="same-style same-style-border language-wrap">
                                            <a class="language-dropdown-active" href="#">English<i
                                                    class="fa-light fa-angle-down"></i></a>
                                            <div class="language-dropdown">
                                                <ul>
                                                    <li><a href="#">English</a></li>
                                                    <li><a href="#">French</a></li>
                                                    <li><a href="#">German</a></li>
                                                    <li><a href="#">Spanish</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="same-style same-style-border currency-wrap">
                                            <a class="currency-dropdown-active" href="#">US Dollar <i
                                                    class="fa-light fa-angle-down"></i></a>
                                            <div class="currency-dropdown">
                                                <ul>
                                                    <li><a href="#">USD</a></li>
                                                    <li><a href="#">EUR</a></li>
                                                    <li><a href="#">Real</a></li>
                                                    <li><a href="#">BDT</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="social-style-1 social-style-1-mrg">
                                        <a href="#"><i class="fa-brands fa-twitter"></i></a>
                                        <a href="#"><i class="fa-brands fa-facebook-f"></i></a>
                                        <a href="#"><i class="fa-brands fa-instagram"></i></a>
                                        <a href="#"><i class="fa-brands fa-youtube"></i></a>
                                        <a href="#"><i class="fa-brands fa-pinterest-p"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="header-bottom">
                        <div class="row align-items-center">
                            <div class="col-xl-2 col-lg-2">
                                <div class="logo">
                                   <NuxtLink to="/"><img src="assets/images/logo/logo.png" alt="logo"></NuxtLink>
                                </div>
                            </div>
                            <div class="col-xl-8 col-lg-7">
                                <div class="main-menu main-menu-padding-1 main-menu-lh-1">
                                    <nav>
                                        <ul>
                                            <li>
                                                <NuxtLink to="/">HOME </NuxtLink>

                                            </li>
                                            <li>
                                                <NuxtLink to="/shop">SHOP </NuxtLink>

                                            </li>
                                            <li>
                                                <NuxtLink to="/contact">CONTACT </NuxtLink>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                            <div class="col-xl-2 col-lg-3">
                                <div class="header-action header-action-flex header-action-mrg-right">
                                    <div class="same-style-2 header-search-1">
                                        <a class="search-toggle" href="#" @click="isOpenSearch = !isOpenSearch">
                                            <i class="fa-light fa-magnifying-glass"></i>
                                        </a>
                                        <div class="search-wrap-1 " :class="`${isOpenSearch ? 'open' : ''}`">
                                            <form action="#" @submit.prevent="handleSearch">
                                                <input placeholder="Search products…" type="text" v-model="searchKey">
                                                <button class="button-search" type="submit"><i
                                                        class="fa-light fa-magnifying-glass"></i></button>
                                            </form>
                                        </div>
                                    </div>
                                    <div class="same-style-2">
                                        <NuxtLink to="/signIn"><i class="fa-light fa-user"></i></NuxtLink>
                                    </div>
                                    <div class="same-style-2">
                                        <NuxtLink to="/Wish"><i class="fa-light fa-heart"></i><span
                                                class="pro-count red" v-if="getCountWishlist > 0">0{{ getCountWishlist
                                                }}</span></NuxtLink>
                                    </div>
                                    <div class="same-style-2 header-cart">
                                        <a class="cart-active" href="#" @click="isOpenCart = !isOpenCart">
                                            <i class="fa-light fa-cart-arrow-down"></i><span class="pro-count red"
                                                v-if="getCount > 0">0{{ getCount }}</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="header-small-device small-device-ptb-1">
                    <div class="row align-items-center">
                        <div class="col-5">
                            <div class="mobile-logo">
                                <a href="index.html">
                                    <img alt="" src="assets/images/logo/logo.png">
                                </a>
                            </div>
                        </div>
                        <div class="col-7">
                            <div class="header-action header-action-flex">
                                <div class="same-style-2">
                                    <NuxtLink to="/signin"><i class="fa-light fa-user"></i></NuxtLink>
                                </div>
                                <div class="same-style-2">
                                    <NuxtLink to="/wish"><i class="fa-light fa-heart"></i><span
                                            class="pro-count red">03</span></NuxtLink>
                                </div>
                                <div class="same-style-2 header-cart">
                                    <a class="cart-active" href="#" @click="isOpenCart = !isOpenCart">
                                        <i class="fa-light fa-basket-shopping"></i><span class="pro-count red">02</span>
                                    </a>
                                </div>
                                <div class="same-style-2 main-menu-icon">
                                    <a class="mobile-header-button-active" href="#"
                                        @click="isOpenMobileSidebar = !isOpenMobileSidebar"><i
                                            class="fa-light fa-bars"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <MiniCart :is-open="isOpenCart" @close="onCloseCart" />
        <LayoutsMobileSidebar :isOpened="isOpenMobileSidebar" @close="isOpenMobileSidebar = false" />
    </div>
</template>
