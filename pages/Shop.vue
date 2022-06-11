        
<script setup lang="ts">

const client = useSupabaseClient()
const viewMode = ref('grid');

const { data } = await useAsyncData('products', async () => {
    const { data } = await client.from('Product').select('*').order('id')
    return data
})
const {data:Categories} = await useAsyncData('categories', async () => {
    const { data } = await client.from('Category').select('*')
    return data
})
const catFilter = ref('');
const viewOptions = [
    20, 40, 60, 80
]
const end = ref(0)
const start = ref(0)
const currentPage = ref(1);
const perPage = ref(3);
const totalPages = computed(() => {
    return Math.ceil(data.value.length / perPage.value) <= 0 ? 1 : Math.ceil(data.value.length / perPage.value);
})
const viewOption = ref(viewOptions[0]);
const sortBy = ref('');
const ProductData = computed(() => {
    // pagination
    start.value = (currentPage.value - 1) * perPage.value;
    end.value = currentPage.value * perPage.value;

    if(catFilter.value.length > 0){
        return data.value.filter(product => product.category.includes(catFilter.value))
    }
    // sort
    const sortedData = data.value.slice(start.value, end.value).sort((a, b) => {
        if (sortBy.value === 'name') {
            return a.name > b.name ? 1 : -1;
        } else {
            return a.price > b.price ? 1 : -1;
        }
    });
    return sortedData;
})
const onNextPage = () => {

    if (currentPage.value < totalPages.value) {
        currentPage.value++;
    }
}
const onPrevPage = () => {

    if (currentPage.value > 1) {
        currentPage.value--;
    }
}
const onChangePage = (n) => {
    currentPage.value = n;
}

</script>
<template>
    <div class="shop">
        <LazyLayoutsBreadcrumb />
        <div class="shop-area pt-120 pb-120">
            <div class="container">
                <div class="row flex-row-reverse">
                    <div class="col-lg-9">
                        <div class="shop-topbar-wrapper">
                            <div class="shop-topbar-left">
                                <div class="view-mode nav">
                                    <span :class="{ active: viewMode === 'grid' }" @click="viewMode = 'grid'"><i
                                            class="fa-light fa-grid "></i></span>
                                    <span :class="{ active: viewMode === 'tab' }" @click="viewMode = 'tab'"><i
                                            class="fa-light fa-bars"></i></span>
                                </div>
                                <p>Showing {{start}} - {{end}} of {{data.length}} results </p>
                            </div>
                            <div class="product-sorting-wrapper">
                                <div class="product-shorting shorting-style">
                                    <label>View :</label>
                                    <select v-model="viewOption">
                                        <option value="20" selected>20</option>
                                        <option :value="otp" v-for="otp in viewOptions" :key="otp">{{
                                                otp
                                        }}</option>
                                    </select>
                                </div>
                                <div class="product-show shorting-style">
                                    <label>Sort by :</label>
                                    <select v-model="sortBy">
                                        <option value="">Default</option>
                                        <option value="name"> Name</option>
                                        <option value="price"> price</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="shop-bottom-area">
                            <div class="tab-content jump">
                                <div id="shop-1" class="tab-pane " :class="{ active: viewMode === 'grid' }">
                                    <div class="row">
                                        <div class="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12"
                                            v-for="productItem in ProductData" :key="productItem.title">
                                            <ProductCard :data="productItem" />
                                        </div>
                                    </div>
                                </div>
                                <div id="shop-2" class="tab-pane " :class="{ active: viewMode === 'tab' }">
                                    <ProductCardTab v-for="productItem in ProductData" :key="productItem.title"
                                        :data="productItem" />

                                </div>
                            </div>
                            <Paginate :totalPages="totalPages" @next-page="onNextPage" @previous-page="onPrevPage"
                                @page-changed="onChangePage" />
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div class="sidebar-wrapper sidebar-wrapper-mrg-right">
                            <div class="sidebar-widget mb-40">
                                <h4 class="sidebar-widget-title">Search </h4>
                                <div class="sidebar-search">
                                    <form class="sidebar-search-form" action="#">
                                        <input type="text" placeholder="Search here...">
                                        <button>
                                            <i class="icon-magnifier"></i>
                                        </button>
                                    </form>
                                </div>
                            </div>
                            <div class="sidebar-widget shop-sidebar-border mb-35 pt-40">
                                <h4 class="sidebar-widget-title">Categories </h4>
                                <div class="shop-catigory">
                                    <ul>
                                        <li v-for="cat in Categories" :key="cat.title"><span @click="catFilter=cat.slug" :class="{active:catFilter===cat.slug}">{{cat.title}}</span></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="sidebar-widget shop-sidebar-border mb-40 pt-40">
                                <h4 class="sidebar-widget-title">Price Filter </h4>
                                <div class="price-filter">
                                    <span>Range: $100.00 - 1.300.00 </span>
                                    <div id="slider-range"></div>
                                    <div class="price-slider-amount">
                                        <div class="label-input">
                                            <input type="text" id="amount" name="price" placeholder="Add Your Price" />
                                        </div>
                                        <button type="button">Filter</button>
                                    </div>
                                </div>
                            </div>
                            <div class="sidebar-widget shop-sidebar-border mb-40 pt-40">
                                <h4 class="sidebar-widget-title">Refine By </h4>
                                <div class="sidebar-widget-list">
                                    <ul>
                                        <li>
                                            <div class="sidebar-widget-list-left">
                                                <input type="checkbox"> <a href="#">On Sale <span>4</span> </a>
                                                <span class="checkmark"></span>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="sidebar-widget-list-left">
                                                <input type="checkbox" value=""> <a href="#">New <span>5</span></a>
                                                <span class="checkmark"></span>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="sidebar-widget-list-left">
                                                <input type="checkbox" value=""> <a href="#">In Stock <span>6</span>
                                                </a>
                                                <span class="checkmark"></span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="sidebar-widget shop-sidebar-border mb-40 pt-40">
                                <h4 class="sidebar-widget-title">Size </h4>
                                <div class="sidebar-widget-list">
                                    <ul>
                                        <li>
                                            <div class="sidebar-widget-list-left">
                                                <input type="checkbox" value=""> <a href="#">XL <span>4</span> </a>
                                                <span class="checkmark"></span>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="sidebar-widget-list-left">
                                                <input type="checkbox" value=""> <a href="#">L <span>5</span> </a>
                                                <span class="checkmark"></span>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="sidebar-widget-list-left">
                                                <input type="checkbox" value=""> <a href="#">SM <span>6</span> </a>
                                                <span class="checkmark"></span>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="sidebar-widget-list-left">
                                                <input type="checkbox" value=""> <a href="#">XXL <span>7</span> </a>
                                                <span class="checkmark"></span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="sidebar-widget shop-sidebar-border mb-40 pt-40">
                                <h4 class="sidebar-widget-title">Color </h4>
                                <div class="sidebar-widget-list">
                                    <ul>
                                        <li>
                                            <div class="sidebar-widget-list-left">
                                                <input type="checkbox" value=""> <a href="#">Green <span>7</span> </a>
                                                <span class="checkmark"></span>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="sidebar-widget-list-left">
                                                <input type="checkbox" value=""> <a href="#">Cream <span>8</span> </a>
                                                <span class="checkmark"></span>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="sidebar-widget-list-left">
                                                <input type="checkbox" value=""> <a href="#">Blue <span>9</span> </a>
                                                <span class="checkmark"></span>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="sidebar-widget-list-left">
                                                <input type="checkbox" value=""> <a href="#">Black <span>3</span> </a>
                                                <span class="checkmark"></span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="sidebar-widget shop-sidebar-border pt-40">
                                <h4 class="sidebar-widget-title">Popular Tags</h4>
                                <div class="tag-wrap sidebar-widget-tag">
                                    <a href="#">Clothing</a>
                                    <a href="#">Accessories</a>
                                    <a href="#">For Men</a>
                                    <a href="#">Women</a>
                                    <a href="#">Fashion</a>
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
.shop {

    margin-top: 150px;
    min-height: 100vh;
}
</style>