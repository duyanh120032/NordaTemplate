<template>
    <div class="product-details-area pt-120 pb-115">
        <div class="container">
            <div class="row">
                <div class="col-lg-6 col-md-6">
                    <div class="product-details-fixed-img">
                        <div class="easyzoom-style">
                            <div class="easyzoom easyzoom--overlay">
                                <a href="assets/images/product-details/b-large-1.jpg">
                                    <img src="assets/images/product-details/large-1.jpg" alt="">
                                </a>
                            </div>
                            <a class="easyzoom-pop-up img-popup" href="assets/images/product-details/b-large-1.jpg"><i class="fa-duotone fa-arrows-maximize"></i></a>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6">
                    <div class="product-details-content pro-details-content-mrg">
                        <h2>Simple Black T-Shirt</h2>
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
                        <p>Seamlessly predominate enterprise metrics without performance based process improvements.</p>
                        <div class="pro-details-price">
                            <span class="new-price">$75.72</span>
                            <span class="old-price">$95.72</span>
                        </div>
                        <div class="pro-details-color-wrap">
                            <span>Color:</span>
                            <div class="pro-details-color-content">
                                <ul>
                                    <li><a class="dolly" href="#">dolly</a></li>
                                    <li><a class="white" href="#">white</a></li>
                                    <li><a class="azalea" href="#">azalea</a></li>
                                    <li><a class="peach-orange" href="#">Orange</a></li>
                                    <li><a class="mona-lisa active" href="#">lisa</a></li>
                                    <li><a class="cupid" href="#">cupid</a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="pro-details-size">
                            <span>Size:</span>
                            <div class="pro-details-size-content">
                                <ul>
                                    <li><a href="#">XS</a></li>
                                    <li><a href="#">S</a></li>
                                    <li><a href="#">M</a></li>
                                    <li><a href="#">L</a></li>
                                    <li><a href="#">XL</a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="pro-details-quality">
                            <span>Quantity:</span>
                            <div class="cart-plus-minus">
                                <input class="cart-plus-minus-box" type="text" name="qtybutton" value="1">
                            </div>
                        </div>
                        <div class="product-details-meta">
                            <ul>
                                <li><span>Categories:</span> <a href="#">Woman,</a> <a href="#">Dress,</a> <a
                                        href="#">T-Shirt</a></li>
                                <li><span>Tag: </span> <a href="#">Fashion,</a> <a href="#">Mentone</a> , <a
                                        href="#">Texas</a></li>
                            </ul>
                        </div>
                        <div class="pro-details-action-wrap">
                            <div class="pro-details-add-to-cart">
                                <a title="Add to Cart" href="#">Add To Cart </a>
                            </div>
                            <div class="pro-details-action">
                                <a title="Add to Wishlist" href="#"><i class="fa-light fa-heart"></i></a>
                                <a title="Add to Compare" href="#"><i class="fa-duotone fa-arrows-rotate"></i></a>
                                <a class="social" title="Social" href="#"><i class="fa-light fa-share"></i></a>
                                <div class="product-dec-social">
                                    <a class="facebook" title="Facebook" href="#"><i
                                            class="icon-social-facebook"></i></a>
                                    <a class="twitter" title="Twitter" href="#"><i class="fa-duotone fa-arrows-rotate"></i></a>
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
</template>