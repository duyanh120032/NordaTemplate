<script setup lang="ts">
const currentPage = ref(1);
const emits = defineEmits(['pageChanged', 'nextPage', 'previousPage']);

const handleNextPage = () => {

    if (currentPage.value < totalPages) {
        currentPage.value++;
        emits('nextPage')
    }
}
const handlePrevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
        emits('previousPage')
    }
}
const changePage = (page: number) => {
    currentPage.value = page;
    emits('pageChanged', page)
}
const { totalPages } = defineProps({
    totalPages: {
        default: 0,
        type: Number
    }
})
// const totalPages = computed(() => {
//     return Math.ceil(numOfProducts / perPage) <= 0 ? 1 : Math.ceil(numOfProducts / perPage);
// })
</script>

<template>
    <div class="pro-pagination-style text-center mt-10">
        <ul>
            <li @click="handlePrevPage"><span><i class="fa-duotone fa-angle-left"></i></span></li>
            <li v-for="page in totalPages" :key="page"><span :class="{ active: currentPage === page }"
                    @click=changePage(page)>{{ page
                    }}</span>
            </li>
            <li @click="handleNextPage"><span><i class="fa-duotone fa-angle-right"></i></span></li>
        </ul>
    </div>
</template>