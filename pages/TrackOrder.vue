<script setup lang="ts">import { Order } from '~~/types/Order';
import { ProductDetail } from '~~/types/product';

const route = useRoute()
const { code } = route.query || {}



const client = useSupabaseClient()
const trackState = reactive({
    email: '',
    result: null as null | Order[],
    loading: false,
    error: null,
    code: code || '',
})

const handleSubmit = async () => {
    if (trackState.email.length === 0) {
        return
    }
    trackState.loading = true
    trackState.error = null
    const { data } = await client.from<Order>('Orders').select('*').eq('user_email', trackState.email)
    trackState.result = data
}
const handleCancelOrder = async (id: string | number) => {
    await client.from<Order>('Orders').delete().eq('id', id)

}
const orderDetail = reactive({
    order: null as null | Order,
    loading: false,
    error: null,
})
const viewOrder = async (id: string | number) => {
    orderDetail.loading = true
    orderDetail.error = null
    console.log(id)
    const { data } = await client.from<Order>('Orders').select('*').eq('id', id).single()


    data.items = await Promise.all(data.items.map(async (item) => {
        const { data: product } = await client.from<ProductDetail>('Product').select('*').eq('id', item.id).single()
        if (product.title) {
            return {
                ...item,
                title: product.title,
                image: product.image,
                price: product.price,
            }
        }
    }))
    orderDetail.order = data
}
watchEffect(async () => {
    if (code && typeof code === 'string') {
        trackState.code = code
        console.log(trackState.code)
        await viewOrder(code)
    }

})
</script>

<template>
    <div>
        <div class="order-tracking-area pt-110 pb-120">
            <div class="container">
                <div class="myaccount-table table-responsive text-center" v-if="trackState.result">
                    <table class="table table-bordered">
                        <thead class="thead-light">
                            <tr>
                                <th>Order</th>
                                <th>Code</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Total</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for=" (item, n) in trackState.result" :key="item.id">
                                <td>{{ n + 1 }}</td>
                                <td>{{ item.id }}</td>
                                <td>{{ new Date(item.created_at).toISOString() }}</td>
                                <td>
                                    <p
                                        :class="`${item.status === 'Pending' ? 'text-primary' : item.status === 'Cancelled' ? 'text-danger' : 'text-secondary'}`">
                                        {{ item.status }}</p>
                                </td>
                                <td>${{ item.total }}</td>
                                <td><button class="check-btn sqr-btn btn btn-warning mr-3 "
                                        v-if="item.status !== 'Cancelled'"
                                        @click="handleCancelOrder(item.id)">Cancel</button>
                                    <button class="check-btn sqr-btn btn btn-success "
                                        v-if="item.status !== 'Cancelled'" @click="viewOrder(item.id)">View
                                        Detail</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="row">
                    <trackorder-detail v-if="orderDetail.order" :data="orderDetail.order" />
                </div>
                <div class="row">
                    <div class="col-xl-6 col-lg-8 col-md-10 ml-auto mr-auto">
                        <div class="order-tracking-content">
                            <p v-if="!trackState.result">To track your order please enter your Order ID in the box below
                                and press the "Track"
                                button. This was given to you on your receipt and in the confirmation email you should
                                have received.</p>
                            <div class="order-tracking-form">
                                <form action="#" @submit.prevent="handleSubmit">
                                    <div class="sin-order-tracking">
                                        <label>Billing Email</label>
                                        <input type="email" placeholder="Email you used during checkout"
                                            autocomplete="email" v-model="trackState.email">
                                    </div>
                                    <div class="order-track-btn">
                                        <button class="btn" type="submit">Track Now</button>
                                    </div>
                                </form>
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