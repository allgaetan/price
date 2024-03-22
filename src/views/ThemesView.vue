<template>

<div class="themes">
    <div class="level-lines" v-for="level in levels" :key="level">
        <h1 class="level">{{ level }}</h1>
        <div class="themes-container">
            <div v-for="theme in filteredMoviesByLevel(level)" :key="theme.themeID">
                <div class="theme-container">
                    <div class="theme-card" @click="goToTheme(theme.themeID)">
                        <div class="theme-details">
                            <h2 class="name">{{ theme.name }}</h2>
                            <p class="description">{{  }}</p>
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
            themes: [], 
            levels: ["Lycée","Prépa","Université"],
        };
    },
    created() {
        fetch("/data/themes.json")
        .then(response => response.json())
        .then(data => {
            this.themes = data;
        }); 
    },
    methods: {
        filteredMoviesByLevel(level) {
            return this.themes.filter(theme => {
                return theme.level == level;
            });
        },
        goToTheme(themeID) {
            this.$router.push({ name: 'Theme', params: { themeID } });
        },
    },
};

</script>

<style>

.themes {
    margin-top: 2rem;
    margin-left: 1rem;
}

.themes-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
}

.theme-container {
    text-align: left; 
}

.theme-card {
    position: relative;
    width: 220px;
    height: 220px;
    border-radius: 10px;
    box-shadow: 0 15px 35px black;
    overflow: hidden;
    display: inline-block;
    margin: 1rem;
}

.theme-card:hover {
    cursor: pointer;
}

.theme-details .name {
    color: rgb(255, 255, 255);
    width: 100%;
    margin: 1rem;
    display: block;
}

.theme-details .description {
    color: rgb(255, 255, 255);
    width: 100%;
    margin-left: 1rem;
    display: block;
}

.level {
    margin-left: 1rem;
}

</style>
