<script setup lang="ts">
const route = useRoute()
</script>
<template>

    <div class="breadcrumb-area bg-gray">
        <div class="container">
            <div class="breadcrumb-content text-center">
                <ul>
                    <li>
                        <NuxtLink to="/">Home</NuxtLink>
                    </li>
                    <li class="active">{{ route.path.slice(1) }} </li>
                </ul>
            </div>
        </div>
    </div>

</template>



<style lang="scss" scoped>
</style>