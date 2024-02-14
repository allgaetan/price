<template>

<div class="catalogue">
    <div class="card" v-for="movie in movies" :key="movie.movieID" @click="goToMovie(movie.movieID)">
        <div class="posters">
            <img :src="movie.poster" :alt="movie.title">
        </div>
        <div class="details">
            <h2 class="title">{{ movie.title }}</h2>
            <p class="date">{{ movie.date }}</p>
            <p class="director">{{ movie.director }}</p>
            <p class="runtime">{{ movie.runtime }} min</p>
        </div>
    </div>
</div>

</template>


<style>

.card {
    position: relative;
    width: 240px;
    height: 330px;
    background-color: aliceblue;
    border-radius: 10px;
    box-shadow: 0 15px 35px black;
    overflow: hidden;
    display: inline-block;
    margin: 1rem;
}
.card:hover {
    cursor: pointer;
}
.card .posters {
    position: relative;
    overflow: hidden;
}
.card .posters::before {
    content: '';
    position: absolute;
    bottom: -180px;
    width: 100%;
    height: 100%;
    background: linear-gradient(0deg, #000000b2 70%, transparent);
    transition: 0.5s;
    z-index: 1;
}
.card:hover .posters::before {
    bottom: 0px;
}
.card .posters img {
    max-width: 240px;
    min-height: 330px;
    transition: 0.5s;
}
.card:hover .posters img {
    transform: translateY(-50px);
    filter: blur(5px);
}
.card .details {
    position: absolute;
    width: 100%;
    bottom: -57px;
    left: 0;
    padding: 20px;
    z-index: 2;
    transition: 0.5s;
}
.card:hover .details {
    bottom: 50px;
}
.card .details .title {
    max-width: 180px;
}

.catalogue {
    text-align: center;
}
.catalogue .card {
    text-align: left;
}

</style>


<script>

export default {
    data() {
        return {
            movies: [], 
        };
    },
    created() {
        fetch('../src/movies.json')
        .then(response => response.json())
        .then(data => {
            this.movies = data;
        });
    },
    methods: {
        goToMovie(movieID) {
            this.$router.push({ name: 'Movie', params: { movieID } });
        },
    },
};

</script>


  