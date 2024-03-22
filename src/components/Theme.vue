<template>

<div class="theme-details">

</div>

</template>

<script>

export default {
    name: 'Theme',
    data() {
        return {
            theme: null,
        };
    },
    created() {
        const themeID = this.$route.params.themeID;
        fetch('/data/themes.json')
        .then(response => response.json())
        .then(data => {
            this.theme = data.find(theme => theme.themeID == themeID);
        });
    },
};

</script>

<style>

</style>