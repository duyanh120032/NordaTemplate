<script setup lang="ts">
const { user } = defineProps({
    user: {
        default: null,
        type: Object
    }
})
const {user_metadata:userData} =user
</script>
<template>
    <div>
        <address v-if="userData">
            <p><strong>{{userData.displayname}}</strong></p>
            <p>1355 Market St, Suite 900 <br>
                San Francisco, CA 94103</p>
            <p>Mobile: (123) 456-7890</p>
        </address>
        <a href="#" class="check-btn sqr-btn "><i class="fa fa-edit"></i> Edit
            Address</a>
    </div>
</template>



<style scoped>
</style>