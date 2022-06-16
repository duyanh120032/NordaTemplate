<script setup lang="ts">
import { PropType } from 'vue';
import { useToast } from 'vue-toastification';
import { Order } from '~~/types/Order';
import { Product } from '~~/types/Product';




const client = useSupabaseClient();
const toast = useToast();
const { data } = defineProps({
    data: {
        type: Array as PropType<Order[]>,
        default: () => ({} as Order[]),
    }
})
// const { data: dataOrders } = await client.from('Orders').select('*')







// const _data = itemsOrder.map(async (item) => {
//     let newData=[]

//     // Fetch Data Product   
//     if(item.id){

//         const { data: data } = await client.from('Product').select('*').eq('id', item.id).single()

//         const dataProduct= data

//         newData=[...newData, dataProduct.title]

//     }
//     return newData

// }


// // Map data item



//     // return {
//     //     ...Orders,
//     //     items: order.items.map(async (item) => {

//     //         console.log("🚀 ~ file: Orders.vue ~ line 24 ~ items:order.items.map ~ product", product)

//     //         return {
//     //             ...item,
//     //             title: product.title,
//     //         }
//     //     })
//     // }
// )
// console.log(_data);


const handleCancelOrder = async (order: Order) => {
    const { data, error } = await client.from('Orders').update({
        status: 'Cancelled'
    }).eq('id', order.id)
    if (error) {
        toast.error(error.message)
        return
    }
    toast.success('Order cancelled')
}

</script>
<template>
    <div>
        <div class="myaccount-table table-responsive text-center">
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
                    <tr v-for=" (item, n) in data" :key="item.id">
                        <td>{{ n + 1 }}</td>
                        <td>{{ item.id }}</td>
                        <td>{{ new Date(item.created_at).toISOString() }}</td>
                        <td>
                            <p
                                :class="`${item.status === 'Pending' ? 'text-primary' : item.status === 'Cancelled' ? 'text-danger' : 'text-secondary'}`">
                                {{ item.status }}</p>
                        </td>
                        <td>${{ item.total }}</td>
                        <td><button class="check-btn sqr-btn btn btn-warning " v-if="item.status !== 'Cancelled'"
                                @click="handleCancelOrder(item)">Cancel</button></td>
                    </tr>

                </tbody>
            </table>
        </div>
    </div>
</template>



<style scoped>
</style>