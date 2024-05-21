<template>

<div class="catalogue">
    <div class="alphabetical-lines" v-for="letter in alphabet" :key="letter">
        <div class="letter-in-movies-first-letter" v-if="moviesFirstLetter.includes(letter)" :key="moviesFirstLetter">
            <h1 class="letter">{{ letter }}</h1>
            <div class="movies-container">
                <div v-for="movie in filteredMoviesByLetter(letter)" :key="movie.movieID">
                    <div class="movie-starts-with-letter">
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
            </div>
        </div>
    </div>
</div>

</template>

<script>

export default {
    data() {
        return {
            movies: [], 
            alphabet: ["#","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","X","Y","Z"],
        };
    },
    computed: {
        moviesFirstLetter() {
            return this.movies.map(movie => {
                if (movie.title[0].match(/[a-z]/i)) {
                    return movie.title[0].toUpperCase();
                } else {
                    return "#";
                }
            });
        },
    },
    created() {
        fetch("/data/movies.json")
        .then(response => response.json())
        .then(data => {
            this.movies = data;
        }); 
    },
    methods: {
        filteredMoviesByLetter(letter) {
            return this.movies.filter(movie => {
                const firstLetter = movie.title[0].toUpperCase();
                if (firstLetter.match(/[a-z]/i)) {
                    return firstLetter == letter;
                } else {
                    return "#" == letter;
                } 
            });
        },
        goToMovie(movieID) {
            this.$router.push({ name: 'Movie', params: { movieID } });
        },
    },
};

</script>

<style>

.catalogue {
    margin-top: 2rem;
    margin-left: 1rem;
}

.movies-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
}

.movie-container {
    text-align: left; 
}

.movie-card {
    position: relative;
    width: 220px;
    height: 330px;
    background-color: aliceblue;
    border-radius: 10px;
    box-shadow: 0 15px 35px black;
    overflow: hidden;
    display: inline-block;
    margin: 1rem;
}

.movie-card:hover {
    cursor: pointer;
}

.movie-card .posters {
    position: relative;
    overflow: hidden;
}

.movie-card .posters::before {
    content: '';
    position: absolute;
    bottom: -180px;
    width: 100%;
    height: 100%;
    background: linear-gradient(0deg, #000000d8 80%, transparent);
    transition: 0.5s;
    z-index: 1;
}

.movie-card:hover .posters::before {
    bottom: 0px;
}

.movie-card .posters img {
    width: 220px;
    height: 330px;
    transition: 0.5s;
}

.movie-card:hover .posters img {
    filter: blur(5px);
}

.movie-card .movie-details {
    position: absolute;
    width: 100%;
    bottom: -57px;
    left: 0;
    padding: 20px;
    z-index: 2;
    transition: 0.5s;
}

.movie-card:hover .movie-details {
    bottom: 50px;
}

.movie-card .movie-details .title {
    max-width: 180px;
}

.letter {
    margin-left: 1rem;
}

</style>


  