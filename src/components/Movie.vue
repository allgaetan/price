<template>

<div class="movie-props-container">
    <div class="props-left-side">
        <div class="details-container">
            <h2>Titre : {{ movie.title }}</h2><br>
            <p><b>Réalisateur :</b> {{ movie.director }}</p>
            <p><b>Date de sortie :</b> {{ movie.date }}</p><br>
            <p><b>Genre(s) :</b> {{ movie.genre }}</p>
            <p><b>Durée :</b> {{ movie.runtime }} min</p><br>
            <p><b>Résumé :</b> {{ movie.plot }}</p><br><br>
            <p><b>Commentaire :</b> {{ movie.commentary }}</p><br><br>
        </div>
    </div>
    <div class="props-right-side">
        <div class="details-container">
            <img class="poster" :src="movie.poster" :alt="movie.title">
            <br><br><b>Thèmes associés : </b>
            <div v-for="themeID in movie.themesID" :key="themeID">
                <p>{{ getThemeName(themeID) }}</p>
            </div>
        </div>
    </div>  
</div>

</template>

<script>

export default {
    name: 'Movie',
    data() {
        return {
            movie: null,
            themes: [],
        };
    },
    created() {
        const movieID = this.$route.params.movieID;
        fetch('/data/movies.json')
        .then(response => response.json())
        .then(data => {
            this.movie = data.find(movie => movie.movieID == movieID);
        });
        fetch('/data/themes.json')
        .then(response => response.json())
        .then(data => {
            this.themes = data;
        });
    },
    methods: {
        getThemeName(themeID) {
            const theme = this.themes.find(theme => theme.themeID == themeID);
            return theme ? theme.name : 'Unknown Theme';
        }
    }
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
    color: aliceblue;
    font-size: larger;
    align-items: top;
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