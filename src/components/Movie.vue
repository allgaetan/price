<template>

<div class="movie-props-container">
    <div class="props-left-side">
        <div class="details-container">
            <h2>Titre : {{ movie.title }}</h2><br>
            <p>Réalisateur : {{ movie.director }}</p>
            <p>Date de sortie : {{ movie.date }}</p><br>
            <p>Genre(s) : {{ movie.genre }}</p>
            <p>Durée : {{ movie.runtime }} min</p><br>
            <p>Résumé : {{ movie.plot }}</p><br><br>
            <p>Commentaire : {{ movie.commentary }}</p><br><br>
            <p>Thèmes associés : {{ movie.themesID }}</p>
        </div>
    </div>
    <div class="props-right-side">
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
.movie-props-container {
    margin-top: 2rem;
    margin-left: 1rem;
    position: relative;
    display: flex;
}

.props-right-side {
    width: 50%;
    display: flex; 
    box-sizing: border-box;
    justify-content: center;
}

.props-left-side {
    width: 50%;
    display: flex;
    box-sizing: border-box;
    color: aliceblue;
    font-size: larger;
    align-items: left;
    justify-content: left;
}

.poster {
    width: 308px;
    height: 462px;
    box-shadow: 0 0px 35px black;
}

.details-container {
    margin: 10px;
}

</style>