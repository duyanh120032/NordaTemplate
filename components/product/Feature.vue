<script setup lang="ts">
import { ProductDetail } from '~~/types/product';

const isActive = ref('best-seller');
const category = ref([
    {
        title: "Best Seller",
        slug: "best-seller",
        data: []
    },
    {
        title: "Trending",
        slug: "trending",
        data: []
    },
    {
        title: "New Arrivals",
        slug: "new-arrivals",
        data: []
    },
    {
        title: "All Products",
        slug: "all-products",
        data: []
    }
])
const client = useSupabaseClient();
const { data: Product } = await client.from<ProductDetail>('Product').select("*");
if (Product) {
    category.value[0].data = Product.slice(0, 6);
    category.value[1].data = Product.slice(6, 12);
    category.value[2].data = Product.slice(12, 18);
    category.value[3].data = Product

}
</script>

<template>
    <div class="product-area section-padding-1 pt-115 pb-75">
        <div class="container">
            <div class="section-title-tab-wrap mb-45">
                <div class="section-title">
                    <h2>Featured Products</h2>
                </div>
                <div class="tab-style-1 nav">
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
                        <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12" v-for="(item, n) in cat.data"
                            :key="item.id">
                            <product-card :data="item" v-if="item" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>