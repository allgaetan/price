<template>

<div class="search-box">
	<input type="text" class="search-bar" v-model="searchTerm" @input="updateDropdown" placeholder="Search movies...">

	<div v-if="matchingMovies.length > 0" class="dropdown">
		<div class="dropdown-element" v-for="movie in matchingMovies" :key="movie.movieID" @click="goToMovie(movie.movieID)">
			<p class="name">{{ movie.title }}</p>
			<p class="type">Film</p>
			<div style="clear: both;"></div>
		</div>
	</div>
</div>

</template>
	
<script>

export default {
	data() {
		return {
			searchTerm: "",
			movies: [],    
			matchingMovies: [] 
		};
	},
    created() {
        fetch('/data/movies.json')
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
		},
		goToMovie(movieID) {
            this.$router.push({ name: 'Movie', params: { movieID } });
			this.matchingMovies = [];
        }
	}
};



/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("dropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
	if (event.target.className.indexOf('dropdown') == -1) {
		var dropdowns = document.getElementsByClassName("dropdown-element");
		var i;
		for (i = 0; i < dropdowns.length; i++) {
			var openDropdown = dropdowns[i];
			if (openDropdown.classList.contains('show')) {
				openDropdown.classList.remove('show');
			}
		}
	}
}

</script>
	
<style>

.search-box {
	position: relative;
	width: 40%;
	margin: auto;
	margin-bottom: 1rem;
	box-shadow: 0px 0px 15px black;
}

.search-bar {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
	background-color: aliceblue;
	border: none;
	outline: none;
}

.dropdown {
	position: absolute;
    overflow-y: auto;
    max-height: 500px;
    width: 100%;
    border-top: none;
    z-index: 200;
	display: block;	
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