<template>

<div class="theme-details">
    <div v-for="movie in filteredMoviesByTheme(theme.themeID)" :key="movie.movieID">
        <div class="movie-container">
            <div class="movie-card" @click="goToMovie(movie.movieID)">
                <div class="posters">
                    <img :src="movie.poster" :alt="movie.title">
                </div>
                <div class="movie-details">
                    <h2 class="title">{{ movie.title }}</h2>
                    <p class="date">{{ movie.date }}</p>
                    <p class="director">{{ movie.director }}</p>
                    <p class="runtime">{{ movie.runtime }} min</p>
                </div>
            </div>
        </div>
    </div>
</div>

</template>

<script>

export default {
    name: 'Theme',
    data() {
        return {
            theme: null,
            movies: [],
        };
    },
    created() {
        const themeID = this.$route.params.themeID;
        fetch('/data/themes.json')
        .then(response => response.json())
        .then(data => {
            this.theme = data.find(theme => theme.themeID == themeID);
        });
        fetch("/data/movies.json")
        .then(response => response.json())
        .then(data => {
            this.movies = data;
        }); 
    },
    methods: {
        filteredMoviesByTheme(themeID) {
            return this.movies.filter(movie => {
                for (var i=0; i<movie.themesID.length; i++) {
                    return movie.themesID[i] == themeID;
                }
            });
        },
        goToMovie(movieID) {
            this.$router.push({ name: 'Movie', params: { movieID } });
        },
    }
};

</script>

<style>
.theme-details {
    margin-top: 2rem;
    margin-left: 1rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
}
</style>