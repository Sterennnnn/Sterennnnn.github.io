let offset = 0; // Initial offset

// la fonction permet d'afficher la liste des pokemons en fonction du nom et de l'id de celui-ci
function afficherListe(offset) {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=50&offset=${offset}`) // permet d'accéder aux données via l'URL (on limite le nombre de pokemon grace a ?limite=...)
        .then((response) => response.json()) // permet de convertir les données pour les rendre manipulables
        .then((data) => {
            const cadrePokemon = document.getElementById("cadrePokemon");
            cadrePokemon.innerHTML = ''; // Supprime tout le contenu à l'intérieur du conteneur

             // va chercher mon cadre dans lequel sera tous mes petits cadres où seront mes pokemon ainsi que leurs données
            data.results.forEach((pokemon) => { // pour chaque pokemon dans la liste de pokemon
                const cadre = document.createElement("div"); // création d'un cadre 
                cadre.classList.add("cadre"); // ajout de la classe css cadre à mon cadre 

                const nom = document.createElement("p"); // création d'une partie de texte dans le cadre 

                nom.textContent = pokemon.name.toUpperCase(); // on y ajoute le nom du pokemon en majuscule (car c'est plus jolie) dans le cadre  
                cadre.appendChild(nom); // on ajoute le nom dans le cadre 
                cadrePokemon.appendChild(cadre); // on ajoute le cadre dans notre grand cadre

                fetch("https://pokeapi.co/api/v2/pokemon/" + pokemon.name) // permet de rechercher les infos du pokemon en y accédant grace à l'endpoint pokemon.name
                    .then((response) => response.json()) // permet de convertir les données pour les rendre manipulables
                    .then((data) => {
                        // permet de prendre l'image d'un pokemon puis l'insère dans l'élément de type image pokemonImage
                        const pokemonImage = document.createElement("img");
                        pokemonImage.src = data.sprites.front_default;
                        cadre.appendChild(pokemonImage);
                        // création boutton pour voir les détails quand on clique dessus
                        const bouton = document.createElement("button");
                        bouton.textContent = "Voir les détails";
                        bouton.classList.add("bouton");
                        bouton.addEventListener("click", () => afficherDetailsPokemon(pokemon.name));

                        cadre.appendChild(bouton);
                        cadrePokemon.appendChild(cadre); // On ajoute le cadre au grand cadre    

                    })
                    // permet de gérer si il y a une erreur 
                    .catch((error) => {
                        console.error("Erreur lors de la récupération des données :", error);
                    });
            });
        })
        // permet de gérer si il y a une erreur 
        .catch((error) => {
            console.error("Erreur lors de la récupération des données :", error);
        });
}

afficherListe(offset); // Appel de la fonction pour afficher la liste des Pokémon

// Création d'un bouton "Suivant"
document.getElementById("bouton-suivant").addEventListener("click", () => {
    offset += 50; // Augmentation de l'offset pour afficher les 50 suivants
    afficherListe(offset);
});

//Création d'un bouton "Retour"
document.getElementById("bouton-retour").addEventListener("click", () => {
    if (offset >= 50) { // Vérifiez si l'offset est suffisamment grand pour revenir en arrière
        offset -= 50; // Permet de revenir en arrière en affichant les 50 pokémons précedants
        afficherListe(offset);
    }
});

//fonction qui permet de rechercher un pokemon et affiche ses données grace à son nom ou son id
function recherche_pokemon() {
    const nom_pokemon = document.getElementById("nom_pokemon").value.toLowerCase(); // récupère le nom du pokemon en minuscule
    const url_nom_pokemon = "https://pokeapi.co/api/v2/pokemon/" + nom_pokemon; // création de l'URL pour la requête fetch() 
    fetch(url_nom_pokemon)
        .then((response) => response.json()) // permet de convertir les données pour les rendre manipulables
        // on récupère les données du pokemon et on les insère grâce à chaque id où on veut dans notre page html (voir page html pour l'affichage)
        .then((data) => {
            document.getElementById("nom_pokemon2").textContent = data.name;
            document.getElementById("image_pokemon").src = data.sprites.versions['generation-v']['black-white'].animated.front_default;
            document.getElementById("type_pokemon").textContent = data.types[0].type.name;
            document.getElementById("poids_pokemon").textContent = `${data.weight / 10} kg`;
            document.getElementById("taille_pokemon").textContent = `${data.height/10}0 mètre`;
            document.getElementById("habilite_pokemon").textContent = `${data.abilities[0].ability.name}`;
            console.log(data.stats[0].base_stat)
            document.getElementById("stats0_pokemon").textContent = data.stats[0].base_stat;
            document.getElementById("stats1_pokemon").textContent = data.stats[1].base_stat;
            document.getElementById("stats2_pokemon").textContent = data.stats[2].base_stat;
            document.getElementById("stats3_pokemon").textContent = data.stats[3].base_stat;
            document.getElementById("stats4_pokemon").textContent = data.stats[4].base_stat;
            document.getElementById("stats5_pokemon").textContent = data.stats[5].base_stat;

            const cadre = document.querySelector(".cadre"); // Récupération du cadre

            document.getElementById("info_pokemon").style.display = "block"; // permet de montrer les infos (car on les cache à un moment donné avec une autre fonction)
        })
        // permet de gérer si il y a une erreur 
        .catch((error) =>
            console.error("Erreur lors de la récupération des données des Pokémons:", error));
}

// afficher les détails du pokemon dans on clique sur le bouton voir les détails        
function afficherDetailsPokemon(nomPokemon) {
    fetch("https://pokeapi.co/api/v2/pokemon/" + nomPokemon) // permet de rechercher les infos du pokemon en y accedant  grace à l'endpoint pokemon.name
        .then(response => response.json()) //permet de convertir les données pour les rendre manipulables
        //on créer une fenetre popup avec les infos du pokemon dedant.
        .then(data => { 
            //création de la fenetre 
            const popup = document.getElementById("popup"); 
            const popupImage = document.getElementById("popup-image");
            const popupDetails = document.getElementById("popup-details");
            // On affiche les données dans le fenêtre
            popupImage.src = data.sprites.versions['generation-v']['black-white'].animated.front_default;
            popupDetails.innerHTML = `
                <p><b>Nom: </b>${data.name}</p>
                <p><b>Type: </b>${data.types[0].type.name}</p>
                <p><b>Habilitée:</b> ${data.abilities[0].ability.name}</p>
                <p><b>Poids: </b> ${data.weight/10 } kg</p>
                <p><b>HP: </b>${(data.stats[0].base_stat)} </p>
                <p><b>Attaque: </b>${(data.stats[1].base_stat )} </p>
                <p><b>Défense: </b>${(data.stats[2].base_stat )}</p>
                <p><b>Attaque Spéciale: </b>${(data.stats[3].base_stat )}</p>
                <p><b>Défense Spéciale: </b>${(data.stats[4].base_stat )}</p>
                <p><b>Vitesse: </b>${(data.stats[5].base_stat )}</p>
                `;

            popup.style.display = "block"; //permet de montrer les infos (car on les cache à un moment donner avec une autre fonction)
        })
        // permet de gérer si il y a une erreur 
        .catch(error => {
            console.error("Erreur lors de la récupération des détails du Pokémon :", error);
        });
}


// fonction qu permet de fermer le popup quand on clique sur la croix
function fermerPopup() {
    const popup = document.getElementById("popup");
    popup.style.display = "none";
}
        


