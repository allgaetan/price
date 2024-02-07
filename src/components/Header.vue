<script>

</script>

<template>

    <header class="sticky-header">
        <div class="wrapper">
            <h1 style="margin-top: 1rem;">Mines'Ramax</h1>

            <nav>
                <RouterLink to="/">Acceuil</RouterLink>
                <RouterLink to="/themes">Thèmes</RouterLink>
                <RouterLink to="/catalogue">Catalogue</RouterLink>
                <RouterLink to="/contact">Contact</RouterLink>
            </nav>
        </div>

        <img class="logo" alt="Logo" src="@/assets/logo.png" width="125px" height="125px" />
    </header>
    
</template>

<style>
.sticky-header {
    text-align: center;
    background-color: rgb(41, 41, 41);
    float: left;
    min-width: 100%;
    width: 100%;
    box-shadow: 0 15px 35px black;
    margin-bottom: 5rem;
    position: sticky;
    top: 0;
    z-index: 100;
}

.wrapper {
    vertical-align: top;
    display: inline-block;
    margin-left: 9rem;
}
.logo {
    vertical-align: top;
    float: right;
    margin-right: 1rem;
}

nav {
    width: 100%;
    font-size: 24px;
    text-align: center;
    margin-top: 2rem;
}

nav a.router-link-exact-active {
    color: rgb(200, 26, 26);
}

nav a.router-link-exact-active:hover {
    background-color: transparent;
}

nav a:hover {
    background-color: rgba(255, 255, 255, 0.192);
    border-radius: 5px;
    transition: background-color 0.5s ease-in-out;
}

nav a {
    display: inline-block;
    padding: 0 1rem;
    border-left: 1px solid var(--color-border);
    margin-bottom: 1rem;
    text-decoration: none;
    color: aliceblue;
}

nav a:first-of-type {
    border: 0;
}
</style>