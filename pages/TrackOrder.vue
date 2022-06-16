<script setup lang="ts">
const client = useSupabaseClient()
const trackState = reactive({
    email: '',
    result: [],
    loading: false,
    error: null,
})
const handleSubmit = async () => {
    if (trackState.email.length === 0) {
        return
    }
    trackState.loading = true
    trackState.error = null
    try {
        const result = await client.from('Order').select('*').eq('shipping_data.Email', 'email')
        console.log("🚀 ~ file: TrackOrder.vue ~ line 17 ~ handleSubmit ~ result", result)
        trackState.result = result.data
    } catch (error) {
        trackState.error = error.message
    }
}
</script>

<template>
    <div>
        <div class="order-tracking-area pt-110 pb-120">
            <div class="container">
                <div class="row">
                    <div class="col-xl-6 col-lg-8 col-md-10 ml-auto mr-auto">
                        <div class="order-tracking-content">
                            <p>To track your order please enter your Order ID in the box below and press the "Track"
                                button. This was given to you on your receipt and in the confirmation email you should
                                have received.</p>
                            <div class="order-tracking-form">
                                <form action="#" @submit.prevent="handleSubmit">
                                    <div class="sin-order-tracking">
                                        <label>Billing Email</label>
                                        <input type="email" placeholder="Email you used during checkout" autocomplete="email"
                                            v-model="trackState.email">
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