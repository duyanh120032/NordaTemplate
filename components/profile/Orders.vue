<script setup lang="ts">
import { PropType } from 'vue';
import { Order } from '~~/types/Order';

const { data } = defineProps({
    data: {
        type: Array as PropType<Order[]>,
        default: () => ({} as Order[]),
    }

})
</script>
<template>
    <div>
        <div class="myaccount-table table-responsive text-center">
            <table class="table table-bordered">
                <thead class="thead-light">
                    <tr>
                        <th>Order</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Total</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for=" (item,n) in data" :key="item.id">
                        <td>{{n+1}}</td>
                        <td>{{new Date(item.created_at).toISOString()}}</td>
                        <td>Pending</td>
                        <td>${{item.total}}</td>
                        <td><a href="cart.html" class="check-btn sqr-btn ">View</a></td>
                    </tr>
                    
                </tbody>
            </table>
        </div>
    </div>
</template>



<style scoped>
</style>