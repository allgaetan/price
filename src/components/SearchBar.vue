<template>

<div class="search-box">
	<input type="text" class="search-bar" v-model="searchTerm" @input="updateDropdown" placeholder="Search movies...">

	<div v-if="matchingMovies.length > 0" class="dropdown">
		<div class="dropdown-element" v-for="movie in matchingMovies" :key="movie.movieID" @click="selectMovie(movie.title)">
			<p class="name">{{ movie.title }}</p>
			<p class="type">Film</p>
			<div style="clear: both;"></div>
		</div>
	</div>
</div>

</template>
	
<script>
// For now, the search is only on movie titles. To add : 
// Search on every property of the movie
// Search for themes

export default {
	data() {
		return {
			searchTerm: "",
			movies: [],    
			matchingMovies: [] 
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
		// Update dropdown based on the search term
		updateDropdown() {
			const searchTerm = this.searchTerm.toLowerCase().trim();
			if (searchTerm.length > 0) {
				// Filter movies based on the search term
				this.matchingMovies = this.movies.filter(movie =>
					movie.title.toLowerCase().includes(searchTerm)
				);
			} else {
				this.matchingMovies = []; // Clear dropdown if search term is empty
			}
		},
		// Select a movie from the dropdown
		selectMovie(title) {
			this.searchTerm = title; // Set search term to selected movie title
			this.matchingMovies = []; // Clear dropdown
		}
	}
};

</script>
	
<style>

.search-box {
	position: absolute;
	width: 40%;
	margin: auto;
	margin-bottom: 1rem;
	border-radius: 20px;
	overflow: auto;
	box-shadow: 0px 0px 15px black;
}

.search-bar {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    position: relative;
	background-color: aliceblue;
	border: none;
}

.search-bar:focus {
	outline: none;
}

.dropdown {
    overflow-y: auto;
    max-height: 500px;
    width: 100%;
    border-top: none;
    z-index: 200;
}

.dropdown-element {
    padding: 8px;
    cursor: pointer;
	background-color: aliceblue;
	background-size: 200% 100%;
    background-image: linear-gradient(to right, aliceblue 50%, rgb(126, 126, 126) 50%);
    transition: background-position 0.1s;
}

.dropdown-element:hover {
    background-position: -100% 0;
	font-weight: 500;
}

.name {
	float: left;
	color: black;
}
.type {
	float: right;
	font-style: italic;
	color: black;
}

</style>
	