<script setup lang="ts">
const isActive = ref('best-seller');
const category = [
    {
        title: "Best Seller",
        slug: "best-seller",
    },
    {
        title: "Trending",
        slug: "trending",
    },
    {
        title: "New Arrivals",
        slug: "new-arrivals",
    },
    {
        title: "All Products",
        slug: "all-products",
    }
]
</script>

<template>
    <div class="product-area section-padding-1 pt-115 pb-75">
        <div class="container">
            <div class="section-title-tab-wrap mb-45">
                <div class="section-title">
                    <h2>Featured Products</h2>
                </div>
                <div class="tab-style-1 nav">
                    <!-- <a class="active" href="#product-1" data-toggle="tab">Best Seller</a>
                    <a href="#product-2" data-toggle="tab"> Trending</a>
                    <a href="#product-3" data-toggle="tab">New Arrivals </a>
                    <a href="#product-4" data-toggle="tab">All Products</a> -->
                    <span href="#" v-for="(cat, n) in category" :key="cat.title"
                        :class="`${isActive === cat.slug ? 'active' : ''}`" @click="isActive = cat.slug">{{ cat.title
                        }}</span>
                </div>
            </div>
        </div>
        <div class="container-fluid">
            <div class="tab-content jump">
                <div id="product-1" class="tab-pane " v-for="cat in category" :key="cat.slug"
                    :class="`${isActive === cat.slug ? 'active' : ''}`">
                    <div class="row">
                        <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
                            <div class="single-product-wrap mb-35">
                                <div class="product-img product-img-zoom mb-20">
                                    <a href="product-details.html">
                                        <img src="assets/images/product/product-1.jpg" alt="">
                                    </a>
                                    <div class="product-action-wrap">
                                        <div class="product-action-left">
                                            <button><i class="icon-basket-loaded"></i>Add to Cart</button>
                                        </div>
                                        <div class="product-action-right tooltip-style">
                                            <button data-toggle="modal" data-target="#exampleModal"><i
                                                    class="icon-size-fullscreen icons"></i><span>Quick
                                                    View</span></button>
                                            <button class="font-inc"><i
                                                    class="icon-refresh"></i><span>Compare</span></button>
                                        </div>
                                    </div>
                                </div>
                                <div class="product-content-wrap">
                                    <div class="product-content-left">
                                        <h4><a href="product-details.html">Simple Black T-Shirt</a></h4>
                                        <div class="product-price">
                                            <span>$56.20</span>
                                        </div>
                                    </div>
                                    <div class="product-content-right tooltip-style">
                                        <button class="font-inc"><i
                                                class="icon-heart"></i><span>Wishlist</span></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
                            <div class="single-product-wrap mb-35">
                                <div class="product-img product-img-zoom mb-20">
                                    <a href="product-details.html">
                                        <img src="assets/images/product/product-2.jpg" alt="">
                                    </a>
                                    <div class="product-action-wrap">
                                        <div class="product-action-left">
                                            <button><i class="icon-basket-loaded"></i>Add to Cart</button>
                                        </div>
                                        <div class="product-action-right tooltip-style">
                                            <button data-toggle="modal" data-target="#exampleModal"><i
                                                    class="icon-size-fullscreen icons"></i><span>Quick
                                                    View</span></button>
                                            <button class="font-inc"><i
                                                    class="icon-refresh"></i><span>Compare</span></button>
                                        </div>
                                    </div>
                                </div>
                                <div class="product-content-wrap">
                                    <div class="product-content-left">
                                        <h4><a href="product-details.html">Black Simple Sneaker</a></h4>
                                        <div class="product-price">
                                            <span>$38.50</span>
                                        </div>
                                    </div>
                                    <div class="product-content-right tooltip-style">
                                        <button class="font-inc"><i
                                                class="icon-heart"></i><span>Wishlist</span></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
                            <div class="single-product-wrap mb-35">
                                <div class="product-img product-img-zoom mb-20">
                                    <a href="product-details.html">
                                        <img src="assets/images/product/product-3.jpg" alt="">
                                    </a>
                                    <span class="pro-badge left bg-red">-20%</span>
                                    <div class="product-action-wrap">
                                        <div class="product-action-left">
                                            <button><i class="icon-basket-loaded"></i>Add to Cart</button>
                                        </div>
                                        <div class="product-action-right tooltip-style">
                                            <button data-toggle="modal" data-target="#exampleModal"><i
                                                    class="icon-size-fullscreen icons"></i><span>Quick
                                                    View</span></button>
                                            <button class="font-inc"><i
                                                    class="icon-refresh"></i><span>Compare</span></button>
                                        </div>
                                    </div>
                                </div>
                                <div class="product-content-wrap">
                                    <div class="product-content-left">
                                        <h4><a href="product-details.html">Lined Brown Swearshirt</a></h4>
                                        <div class="product-price">
                                            <span class="new-price">$46.00</span>
                                            <span class="old-price">$66.75</span>
                                        </div>
                                    </div>
                                    <div class="product-content-right tooltip-style">
                                        <button class="font-inc"><i
                                                class="icon-heart"></i><span>Wishlist</span></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
                            <div class="single-product-wrap mb-35">
                                <div class="product-img product-img-zoom mb-20">
                                    <a href="product-details.html">
                                        <img src="assets/images/product/product-4.jpg" alt="">
                                    </a>
                                    <div class="product-action-wrap">
                                        <div class="product-action-left">
                                            <button><i class="icon-basket-loaded"></i>Add to Cart</button>
                                        </div>
                                        <div class="product-action-right tooltip-style">
                                            <button data-toggle="modal" data-target="#exampleModal"><i
                                                    class="icon-size-fullscreen icons"></i><span>Quick
                                                    View</span></button>
                                            <button class="font-inc"><i
                                                    class="icon-refresh"></i><span>Compare</span></button>
                                        </div>
                                    </div>
                                </div>
                                <div class="product-content-wrap">
                                    <div class="product-content-left">
                                        <h4><a href="product-details.html">Norda Simple Backpack</a></h4>
                                        <div class="product-price">
                                            <span>$102.54</span>
                                        </div>
                                    </div>
                                    <div class="product-content-right tooltip-style">
                                        <button class="font-inc"><i
                                                class="icon-heart"></i><span>Wishlist</span></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
                            <div class="single-product-wrap mb-35">
                                <div class="product-img product-img-zoom mb-20">
                                    <a href="product-details.html">
                                        <img src="assets/images/product/product-5.jpg" alt="">
                                    </a>
                                    <span class="pro-badge left bg-red">-15%</span>
                                    <div class="product-action-wrap">
                                        <div class="product-action-left">
                                            <button><i class="icon-basket-loaded"></i>Add to Cart</button>
                                        </div>
                                        <div class="product-action-right tooltip-style">
                                            <button data-toggle="modal" data-target="#exampleModal"><i
                                                    class="icon-size-fullscreen icons"></i><span>Quick
                                                    View</span></button>
                                            <button class="font-inc"><i
                                                    class="icon-refresh"></i><span>Compare</span></button>
                                        </div>
                                    </div>
                                </div>
                                <div class="product-content-wrap">
                                    <div class="product-content-left">
                                        <h4><a href="product-details.html">Contrasting Sunglasses</a></h4>
                                        <div class="product-price">
                                            <span class="new-price">$35.45</span>
                                            <span class="old-price">$45.80</span>
                                        </div>
                                    </div>
                                    <div class="product-content-right tooltip-style">
                                        <button class="font-inc"><i
                                                class="icon-heart"></i><span>Wishlist</span></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
                            <div class="single-product-wrap mb-35">
                                <div class="product-img product-img-zoom mb-20">
                                    <a href="product-details.html">
                                        <img src="assets/images/product/product-6.jpg" alt="">
                                    </a>
                                    <div class="product-action-wrap">
                                        <div class="product-action-left">
                                            <button><i class="icon-basket-loaded"></i>Add to Cart</button>
                                        </div>
                                        <div class="product-action-right tooltip-style">
                                            <button data-toggle="modal" data-target="#exampleModal"><i
                                                    class="icon-size-fullscreen icons"></i><span>Quick
                                                    View</span></button>
                                            <button class="font-inc"><i
                                                    class="icon-refresh"></i><span>Compare</span></button>
                                        </div>
                                    </div>
                                </div>
                                <div class="product-content-wrap">
                                    <div class="product-content-left">
                                        <h4><a href="product-details.html">Simple Blue T-Shirt</a></h4>
                                        <div class="product-price">
                                            <span>$56.20</span>
                                        </div>
                                    </div>
                                    <div class="product-content-right tooltip-style">
                                        <button class="font-inc"><i
                                                class="icon-heart"></i><span>Wishlist</span></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
                            <div class="single-product-wrap mb-35">
                                <div class="product-img product-img-zoom mb-20">
                                    <a href="product-details.html">
                                        <img src="assets/images/product/product-7.jpg" alt="">
                                    </a>
                                    <div class="product-action-wrap">
                                        <div class="product-action-left">
                                            <button><i class="icon-basket-loaded"></i>Add to Cart</button>
                                        </div>
                                        <div class="product-action-right tooltip-style">
                                            <button data-toggle="modal" data-target="#exampleModal"><i
                                                    class="icon-size-fullscreen icons"></i><span>Quick
                                                    View</span></button>
                                            <button class="font-inc"><i
                                                    class="icon-refresh"></i><span>Compare</span></button>
                                        </div>
                                    </div>
                                </div>
                                <div class="product-content-wrap">
                                    <div class="product-content-left">
                                        <h4><a href="product-details.html">Norda Sport Sneaker</a></h4>
                                        <div class="product-price">
                                            <span>$37.86</span>
                                        </div>
                                    </div>
                                    <div class="product-content-right tooltip-style">
                                        <button class="font-inc"><i
                                                class="icon-heart"></i><span>Wishlist</span></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
                            <div class="single-product-wrap mb-35">
                                <div class="product-img product-img-zoom mb-20">
                                    <a href="product-details.html">
                                        <img src="assets/images/product/product-8.jpg" alt="">
                                    </a>
                                    <span class="pro-badge left bg-black">Out of stock</span>
                                    <div class="product-action-wrap">
                                        <div class="product-action-left">
                                            <button><i class="icon-basket-loaded"></i>Add to Cart</button>
                                        </div>
                                        <div class="product-action-right tooltip-style">
                                            <button data-toggle="modal" data-target="#exampleModal"><i
                                                    class="icon-size-fullscreen icons"></i><span>Quick
                                                    View</span></button>
                                            <button class="font-inc"><i
                                                    class="icon-refresh"></i><span>Compare</span></button>
                                        </div>
                                    </div>
                                </div>
                                <div class="product-content-wrap">
                                    <div class="product-content-left">
                                        <h4><a href="product-details.html">Basic Sneaker</a></h4>
                                        <div class="product-price">
                                            <span>$46.20</span>
                                        </div>
                                    </div>
                                    <div class="product-content-right tooltip-style">
                                        <button class="font-inc"><i
                                                class="icon-heart"></i><span>Wishlist</span></button>
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