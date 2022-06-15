<script setup lang="ts">
import { PropType } from 'vue';
import type { Product } from '../types/product'

const { data } = defineProps({
    data: {
        type: Array as PropType<Product[]>,
        default: () => [] as Product[]
    }
})

const isActive = ref(0);
// autoplay
const changeSlide = setInterval(() => {
    isActive.value++;
    if (isActive.value === 2) {
        isActive.value = 0;
    }
}, 3000);
onBeforeUnmount(() => {
    clearInterval(changeSlide);
});
const handleNextSlide = () => {
    isActive.value++;
    if (isActive.value === data.length) {
        isActive.value = 0;
    }
}
const handlePrevSlide = () => {
    isActive.value--;
    if (isActive.value < 0) {
        isActive.value = data.length - 1;
    }
}

</script>

<template>
    <div>
        <div class="slider-area bg-gray">
            <div class="hero-slider-active-1 hero-slider-pt-1 nav-style-1 dot-style-1">
                <div class="single-hero-slider single-animation-wrap " v-for="(n, idx) in data" :key="n.id"
                    :class="`${isActive === idx ? 'active' : 'no-active'}`">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="hero-slider-content-1 hero-slider-content-1-pt-1 slider-animated-1">
                                    <h4 class="animated">{{ n.title }}</h4>
                                    <h1 class="animated">Leather Simple <br>Backpacks</h1>
                                    <p class="animated">Discover our collection with leather simple backpacks. Less is
                                        more
                                        never out trend.</p>
                                    <div class="btn-style-1">
                                        <NuxtLink class="animated btn-1-padding-1" :to="`/detail?id=${n.id}`">Explore
                                            Now</NuxtLink>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="hero-slider-img-1 slider-animated-1">
                                    <img class="animated"
                                        :src="n.image ? n.image : 'assets/images/slider/hm-1-slider-1.png'" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="dots">{{ isActive }}/2</div>
            <div>
                <button class="btn btn-dark next prev-btn" @click="handlePrevSlide">
                    <i class="fa-light fa-minus"></i>
                </button>
                <button class="btn btn-dark next-btn" @click="handleNextSlide">
                    <i class="fa-light fa-plus"></i>
                </button>
            </div>
        </div>
    </div>
</template>
<style lang="scss" >
.hero-slider-active-1 {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: hidden;




    &>div {
        margin: 0 auto;
        overflow: clip;

        h4.animated {
            animation: shortfadeInUp 1s ease-in-out 0.5s;
        }

        h1.animated {
            animation: shortfadeInUp 1s ease-in-out 1s;
        }

        p.animated {
            animation: shortfadeInUp 1s ease-in-out 1.5s;
        }

        a.animated {
            animation: shortfadeInUp 1s ease-in-out 2s;
        }

        img.animated {
            animation: shortfadeInUp 1s ease-in-out ;
        }



        &.no-active {
            display: none;
        }
    }
}

.slider-area {
    position: relative;

    &:hover{
        .next-btn, .prev-btn {
            opacity: 0.7;
        }
    }

    & .dots {
        position: absolute;
        bottom: 0;
        right: 50%;
        transform: translateX(50%);
        font-size: 1.2rem;
        color: #fff;
        background: rgba(0, 0, 0, 0.5);
        padding: 0.5rem;
        border-radius: 0.5rem;
    }

    & .prev-btn,
    .next-btn {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        z-index: 1;
        border-radius: 50%;
        background: #fff;
        opacity: 0;
        width: 40px;
        height: 40px;
        text-align: center;
        font-size: 20px;
        cursor: pointer;
        outline: none;
        transition: all .3s ease-in-out;
        border: 1px solid #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, .2);
        color: black;
        text-align: center;
        line-height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    & .prev-btn {
        left: 40px;
    }

    & .next-btn {
        right: 40px;
    }
}
</style>