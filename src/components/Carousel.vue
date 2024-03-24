<template>

<div v-if="movies.length" class="swiper-container">
    <swiper
        :effect="coverflow"
        :spaceBetween="0"
        :centeredSlides="true"
        :autoplay="{
            delay: 5000,
            disableOnInteraction: false,
        }"
        :navigation="true"
        :modules="modules"
        :loop="true"
        @autoplayTimeLeft="onAutoplayTimeLeft"
        class="mySwiper"
    >

        <swiper-slide v-for="movie in movies">
            <div class="slide-container">
                <div class="left-side">
                    <div class="text-container" @click="goToMovie(movie.movieID)">
                        <h2>{{ movie.title }}</h2>
                        <p>{{ movie.director }}</p>
                        <p>{{ movie.date }}</p>
                    </div>
                </div>
                <div class="right-side">
                    <img class="main-image" :src="movie.poster" :alt="movie.title" @click="goToMovie(movie.movieID)">
                </div>            
            </div>
            
            <img class="background-image" :src="movie.poster" :alt="movie.title">
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
            modules: [Autoplay, Navigation],
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
        goToMovie(movieID) {
            this.$router.push({ name: 'Movie', params: { movieID } });
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
    color: rgb(255, 255, 255);
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
    stroke: rgb(255, 255, 255);
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
    --swiper-navigation-color: rgb(255, 255, 255);
}

.swiper-slide {
    color: rgb(0, 0, 0);
    text-align: center;
    font-size: 18px;
    background: #000000;
    display: flex;
    justify-content: center;
    align-items: center;
}

.slide-container {
    width: 100%;
    z-index: 10;
    display: flex;
}

.right-side {
    width: 50%;
    height: 200px; 
    display: flex; 
    box-sizing: border-box;
    align-items: center;
    justify-content: center;
}

.left-side {
    width: 50%;
    height: 200px; 
    display: flex;
    box-sizing: border-box;
    color: aliceblue;
    font-size: x-large;
    align-items: center;
    justify-content: center;
}

.main-image {
    width: 308px;
    height: 462px;
    box-shadow: 0 0px 35px black;
    transition: all 0.3s ease-in-out;
}
.main-image:hover {
    cursor: pointer;
    transform: scale(1.05);
}

.background-image {
    position: absolute;
    width: 100%;
    filter: blur(20px) brightness(20%);
}

.text-container {
    transition: all 0.3s ease-in-out;
    margin: 10px;
}
.text-container:hover {
    cursor: pointer;
    
    transform: scale(1.05);
}

</style>
  