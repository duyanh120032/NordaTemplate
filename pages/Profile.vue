<script setup lang="ts">
definePageMeta({
    middleware: 'auth'
})
const router = useRouter()
const isActive = ref('Dashboard')
const actions = [
    { title: "Dashboard", icon: 'fa-gauge' },
    { title: "Orders", icon: 'fa-arrow-down-1-9' },
    { title: "Credit Cards", icon: 'fa-credit-card' },
    { title: "Address", icon: 'fa-map' },
    {
        title: "Account Details", icon: 'fa-user'
    },
    { title: "Logout", icon: 'fa-arrow-right-from-bracket' }

]
const client = useSupabaseClient()
const user = useSupabaseUser()
const doAction = async (act: string) => {
    if (act === 'Logout') {
        await client.auth.signOut()
        router.push('/')
    }
    isActive.value = act
}
const handleLogout = async () => {
    await client.auth.signOut()
    router.push('/')
}
const {data:orders} = await client.from('Orders').select('*').eq('user_email', user.value.email)


</script>

<template>
    <div>
        <div class="my-account-wrapper pt-120 pb-120">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <!-- My Account Page Start -->
                        <div class="myaccount-page-wrapper">
                            <!-- My Account Tab Menu Start -->
                            <div class="row">
                                <div class="col-lg-3 col-md-4">
                                    <div class="myaccount-tab-menu nav" role="tablist">
                                        <a href="#" :class="{ active: isActive == act.title }" v-for="act in actions "
                                            :key="act.title" @click="doAction(act.title)"><i class="fa-light"
                                                :class="act.icon"></i>
                                            {{ act.title }}</a>
                                    </div>
                                </div>
                                <!-- My Account Tab Menu End -->
                                <!-- My Account Tab Content Start -->
                                <div class="col-lg-9 col-md-8">
                                    <div class="tab-content" id="myaccountContent">
                                        <!-- Single Tab Content Start -->
                                        <div class="tab-pane fade " id="dashboad" role="tabpanel"
                                            :class="{ 'show active': isActive === 'Dashboard' }">
                                            <div class="myaccount-content">
                                                <h3>Dashboard</h3>
                                                <div class="welcome">
                                                    <p>Hello, <strong>{{ user.email }}</strong> (If Not
                                                        <strong>{{ user.email }}</strong>
                                                        <button class="btn" @click="handleLogout">Logout</button>)
                                                    </p>
                                                </div>

                                                <p class="mb-0">From your account dashboard. you can easily check & view
                                                    your recent orders, manage your shipping and billing addresses and
                                                    edit your password and account details.</p>
                                            </div>
                                        </div>
                                    
                                        <div class="tab-pane fade" id="orders" role="tabpanel"
                                            :class="{ 'active show': isActive === 'Orders' }">
                                            <div class="myaccount-content">
                                                <h3>Orders</h3>
                                                <profile-orders :data="orders"/>
                                            </div>
                                        </div>                                     
                                        
                                        <div class="tab-pane fade" id="payment-method" role="tabpanel"
                                            :class="{ 'show active': isActive === 'Credit Cards' }">
                                            <div class="myaccount-content">
                                                <h3>Payment Method</h3>
                                                <p class="saved-message">You Can't Saved Your Payment Method yet.</p>
                                            </div>
                                        </div>
                                       
                                        <div class="tab-pane fade" id="address-edit" role="tabpanel"
                                            :class="{ 'show active': isActive === 'Address' }">
                                            <div class="myaccount-content">
                                                <h3>Billing Address</h3>
                                                <profile-address/>
                                            </div>
                                        </div>
                                      
                                        <div class="tab-pane fade" id="account-info" role="tabpanel"
                                            :class="{ 'show active': isActive === 'Account Details' }">
                                            <div class="myaccount-content">
                                                <h3>Account Details</h3>
                                                <lazy-profile-account-detail/>
                                            </div>
                                        </div>
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



<style scoped>
</style>