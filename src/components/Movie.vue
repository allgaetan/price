<template>

<div class="movie-details">
    <div class="details-container">
        <h2>Titre : {{ movie.title }}</h2>
        <p>Réalisateur : {{ movie.director }}</p>
        <p>Date de sortie : {{ movie.date }}</p>
        <p>Genre(s) : {{ movie.genre }}</p>
        <p>Durée : {{ movie.runtime }} min</p>
        <p>Résumé : {{ movie.plot }}</p>
        <p>Commentaire : {{ movie.commentary }}</p>
        <p>Thèmes associés : {{ movie.themesID }}</p>
    </div>

    <div class="poster-container">
        <img class="poster" :src="movie.poster" :alt="movie.title">
    </div>
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
.movie-details {
    vertical-align: top;
}

.poster-container {
    display: inline-block;
    width: 50%;
}
.details-container {
    display: inline-block;
    width: 50%;
}
</style>