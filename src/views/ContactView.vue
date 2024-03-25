<script setup>

</script>


<template>

<div class="contact">
    <form name="Contact form" method="POST" netlify>
        <input type="hidden" name="form-name" value="Contact form">
        <h2>Contactez-nous</h2>
        <div class="formulaire">
            <div class="gauche">
                <div class="groupe">
                    <label for="prenom">Votre Prénom</label>
                    <input type="text" id="prenom" name="prenom" autocomplete="off" required />
                    <i class="fas fa-user"></i>
                </div>
                <div class="groupe">
                    <label for="nom">Votre Nom</label>
                    <input type="text" id="nom" name="nom" autocomplete="off" required />
                    <i class="fas fa-user"></i>
                </div>
                <div class="groupe">
                    <label for="email">Votre adresse e-mail</label>
                    <input type="email" id="email" name="email" autocomplete="off" required />
                    <i class="fas fa-envelope"></i>
                </div>
            </div>
            <div class="droite">
                <div class="groupe">
                    <label for="message">Message</label>
                    <textarea id="message" name="message" placeholder="Saisissez ici..."></textarea>
                </div>
            </div>
        </div>

        <div class="bouton">
            <button type="submit">Envoyer le message</button>
        </div>
    </form>
</div>

</template>


<style>

form {
    padding: 30px;
    border-radius: 10px;
}
form h1 {
    font-size: 20px;
}
form .gauche {
    width: 30%;
}
form .droite {
    width: 67%;
}

form .separation {
    width: 100%;
    height: 1px;
}
form .formulaire {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 30px;
}
form .formulaire .groupe {
    position: relative; 
    margin-top: 20px;
    display: flex;
    flex-direction: column;
}
form .formulaire .gauche .groupe input {
    margin-top: 5px;
    padding: 10px 5px 10px 30px;
    border: 1px solid #c9c9c9;
    outline-color: #747cdf;
    border-radius: 5px;
}
form .formulaire .gauche .groupe i {
    position: absolute; 
    left: 0;
    top: 25px;
    padding: 9px 8px;
    color: #747cdf;
}
form .formulaire .droite {
    margin-left: 40px;
}
form .formulaire .droite .groupe {
    height: 100%;
}
form .formulaire .droite .groupe textarea {
    margin-top: 5px;
    padding: 10px;
    background-color: #f1f1f1;
    outline-color: #747cdf;
    border-radius: 5px;
    resize: none;
    height: 72%;
}

form .bouton {
    text-align: center;
}
form .bouton button {
    margin-top: 10px;
    background-color: #d31a1a;
    color: white;
    font-size: 15px;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    outline: none;
    cursor: pointer;
    transition: transform 0.5s;
}
form .bouton button:hover {
    transform: scale(1.05);
}

@media screen and (max-width: 920px) {
    form .corps-formulaire .droite {
        margin-left: 0px;
    }
}


</style>
