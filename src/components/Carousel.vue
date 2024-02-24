<template>

<div v-if="movies.length" class="swiper-container">
    <swiper
        :effect="coverflow"
        :spaceBetween="0"
        :centeredSlides="true"
        :autoplay="{
            delay: 3000,
            disableOnInteraction: false,
        }"
        :pagination="{
            clickable: true,
        }"
        :navigation="true"
        :modules="modules"
        :loop="true"
        @autoplayTimeLeft="onAutoplayTimeLeft"
        class="mySwiper"
    >

        <swiper-slide v-for="movie in movies">
            <img :src="movie.poster" :alt="movie.title" onerror="this.src='/src/assets/logo.jpeg'">
        </swiper-slide>

        <template #container-end>
            <div class="autoplay-progress">
                <svg viewBox="0 0 48 48" ref="progressCircle">
                    <circle cx="24" cy="24" r="20"></circle>
                </svg>
                <span ref="progressContent"></span>
            </div>
        </template>
    </swiper>
</div>
<div v-else>Loading...</div>

</template>

<script>

import {ref} from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/css';

import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default {
    components: {
        Swiper,
        SwiperSlide,
    },
    setup() {
        const progressCircle = ref(null);
        const progressContent = ref(null);
        const onAutoplayTimeLeft = (s, time, progress) => {
            progressCircle.value.style.setProperty('--progress', 1 - progress);
            progressContent.value.textContent = `${Math.ceil(time / 1000)}s`;
        };
        return {
            onAutoplayTimeLeft,
            progressCircle,
            progressContent,
            modules: [Autoplay, Pagination, Navigation],
        };       
    },
    data() {
        return {
            movies: [], 
        };
    },
    created() {
        fetch('/data/movies.json')
        .then(response => response.json())
        .then(data => {
            this.movies = data;
        }); 
    },
    watch: {
        movies: {
            immediate: true,
            handler(newVal) {
                if (newVal.length > 0) {
                    this.initSwiper();
                }
            },
        },
    },
    methods: {
        initSwiper() {
            this.$nextTick(() => {
                new Swiper('.mySwiper');
            });
        },
    },
};


</script>


<style>

.swiper-container {
    position: relative;
    height: 100%;
}

.autoplay-progress {
    position: absolute;
    right: 16px;
    bottom: 16px;
    z-index: 10;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: rgb(200, 26, 26);
}

.autoplay-progress svg {
    --progress: 0;
    position: absolute;
    left: 0;
    top: 0px;
    z-index: 10;
    width: 100%;
    height: 100%;
    stroke-width: 4px;
    stroke: rgb(200, 26, 26);
    fill: rgb(41, 41, 41);
    stroke-dashoffset: calc(125.6 * (1 - var(--progress)));
    stroke-dasharray: 125.6;
    transform: rotate(-90deg);
}

.autoplay-progress span {
    z-index: 15;
}

.swiper {
    width: 100%;
    height: 100%;
    --swiper-navigation-color: rgb(200, 26, 26);
    --swiper-pagination-bullet-opacity: 1;
    --swiper-pagination-color: rgb(200, 26, 26);
    --swiper-pagination-bullet-inactive-opacity: 0.2;
    --swiper-pagination-bullet-inactive-color: rgb(0, 0, 0);
}

.swiper-slide {
    color: rgb(0, 0, 0);
    text-align: center;
    font-size: 18px;
    background: #808080;

    display: flex;
    justify-content: center;
    align-items: center;
}

.swiper-slide img {
    width: 220px;
    height: 330px;
}

</style>
  