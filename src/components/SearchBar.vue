<template>

<div class="search-box" ref="searchBox">
    <input type="text" class="search-bar" v-model="searchTerm" @input="updateDropdown" @blur="hideDropdown" @focus="showDropdown" placeholder="Entrez un mot-clé, un titre, un thème, ...">
    <div v-if="isDropdownVisible && searchTerm.length > 0" class="dropdown" ref="dropdown">
        <div class="dropdown-element" v-for="movie in matchingMovies" :key="movie.movieID" @click="selectMovie(movie)">
            <p class="name">{{ movie.title }}</p>
            <p class="type">Film</p>
            <div style="clear: both;"></div>
        </div>
        <div class="dropdown-element" v-for="theme in matchingThemes" :key="theme.themeID" @click="selectTheme(theme)">
            <p class="name">{{ theme.name }}</p>
            <p class="type">Thème</p>
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
            themes: [],
            matchingMovies: [],
            matchingThemes: [],
            isDropdownVisible: false
        };
    },
    created() {
        fetch('/data/movies.json')
            .then(response => response.json())
            .then(data => {
                this.movies = data;
            });
        fetch('/data/themes.json')
            .then(response => response.json())
            .then(data => {
                this.themes = data;
            });       
        document.addEventListener('click', this.handleClickOutside);
    },
    destroyed() {
        document.removeEventListener('click', this.handleClickOutside);
    },
    methods: {
        updateDropdown() {
            const searchTerm = this.searchTerm.toLowerCase().trim();
            if (searchTerm.length > 0) {
                this.matchingMovies = this.movies.filter(movie =>
                    movie.title.toLowerCase().includes(searchTerm)
                );
                this.matchingThemes = this.themes.filter(theme =>
                    theme.name.toLowerCase().includes(searchTerm)
                );
                this.isDropdownVisible = true;
            } else {
                this.matchingMovies = []; 
                this.matchingThemes = [];
                this.isDropdownVisible = false;
            }
        },
        handleClickOutside(event) {
            if (!this.$refs.searchBox.contains(event.target)) {
                this.isDropdownVisible = false;
            }
        },
        selectMovie(movie) {
            this.searchTerm = ""; 
            this.$router.push({ name: 'Movie', params: { movieID: movie.movieID } });
            this.isDropdownVisible = false;
        },
        selectTheme(theme) {
            this.searchTerm = ""; 
            this.$router.push({ name: 'Theme', params: { themeID: theme.themeID } });
            this.isDropdownVisible = false;
        },
        hideDropdown() {
            setTimeout(() => {
                this.isDropdownVisible = false;
            }, 200); 
        },
		showDropdown() {
            this.isDropdownVisible = true;
        }
    }
};

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