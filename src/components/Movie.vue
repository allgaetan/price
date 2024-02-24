<template>

<div>
    <img class="poster" :src="movie.poster" :alt="movie.title" onerror="this.src='/src/assets/logo.jpeg'">
    <h2>{{ movie.title }}</h2>
    <p>{{ movie.director }}</p>
    <p>{{ movie.date }}</p>
    <p>{{ movie.genre }}</p>
    <p>{{ movie.runtime }} min</p>
    <p>{{ movie.plot }}</p>
    <p>{{ movie.commentary }}</p>
    <p>{{ movie.themesID }}</p>
</div>

</template>

<script>

export default {
    name: 'Movie',
    data() {
        return {
            movie: null,
        };
    },
    created() {
        const movieID = this.$route.params.movieID;
        fetch('/data/movies.json')
        .then(response => response.json())
        .then(data => {
            this.movie = data.find(movie => movie.movieID == movieID);
        });
    },
};

</script>

<style>
.poster {
    width: 120px;
    height: 160px;
}
</style>