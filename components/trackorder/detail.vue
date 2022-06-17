<script setup lang="ts">import { PropType } from 'vue';
import { Order } from '~~/types/Order';
import { ProductDetail } from '~~/types/product';

const client = useSupabaseClient()
const { data } = defineProps({
    data: {
        type: Object as PropType<Order>,
        default: () => ({} as Order),
    }
})
</script>
<template>
    <div class="container">
        <div class="table-responsive text-center">
            <table class="table table-bordered">
                <thead class="thead-light">
                    <tr>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Quanity</th>
                        <th>Color</th>
                        <th>Size</th>
                        <th>Image</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, n) in data.items" :key="item.id">
                        <td>{{ item.title }}</td>
                        <td>${{ item.price }}</td>
                        <td>{{ item.quantity }}</td>
                        <td>{{ item.color }}</td>
                        <td>{{ item.size }}</td>
                        <td style="width:100px ;height:100px"><img :src="item.image" class="img-thumbnail"></td>
                        <td>${{ item.price * item.quantity }}</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="6" class="text-right">Total</td>
                        <td>${{ data.total }}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>
</template>



<style scoped>
</style>