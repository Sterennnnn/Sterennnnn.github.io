# pokemonAPI
Pokéapi permettant de rechercher des informations sur les Pokémons. 



1- Comment structurer une page HTML pour afficher une liste de Pokémon et un formulaire de
recherche ? 

Pour structurer ma page html: 
J'ai utiliser deux balise section pour chacun des 2 éléments 
Pour mon formulaire: utilisation de form et input qui permet de rentrer le nom ou l'id du pokemon et button pour le bouton de recherche.
Ensuite pour les résultats de recherche: 

```sh

div  class="cadre_rech_pok paragraphe" id="info_pokemon" style="display: none;">
          <img class="" id="image_pokemon">
          <h2 class=""><span id="nom_pokemon2"></span></h2>

          <p class="">Type: <span id="type_pokemon"></span></p>
          <p class="">Habilité: <span id="habilite_pokemon"></span></p>
          <p class="">Poids: <span id="poids_pokemon"></span></p>
          <p class="">Taille: <span id="taille_pokemon"></span></p>
          <div  class="cadre2">
            <p class="">HP: <span id="stats0_pokemon"></span></p>
            <p class="">Attaque: <span id="stats1_pokemon"></span></p>
            <p class="">Défense: <span id="stats2_pokemon"></span></p>
            <p class="">Attaque spéciale: <span id="stats3_pokemon"></span></p>
            <p class="">Défense spéciale: <span id="stats4_pokemon"></span></p>
            <p class="">Vitesse: <span id="stats5_pokemon"></span></p>
          </div>
      </div>

```



2- Comment récupérer et afficher une liste initiale de Pokémon avec l'API PokeAPI ?

https://pokeapi.co/api/v2/pokemon?limit=400

Ici, ?limite=400 cette url permet de récuperer une liste de 400 pokemons

L'utilisation de fetch permet de faire une requette à l'api pour récupérer des données.

Le .json() est une fonction qui premet de traduire les données récupérées de l'url pour les "convertir" sous un format qui permet de manipuler les données.


3-Comment explorer l'API PokeAPI pour trouver les informations nécessaires ?

```js
https://pokeapi.co/api/v2/pokemon/ 

```
On récupère l'endpoint pokemon pour pouvoir choisir les données qu'on récupère avec le nom ou l'id du pokemon. 



4- Comment implémenter une fonctionnalité de recherche pour trouver des Pokémon par leur
numéro ?

J'ai utiliser: onclick="recherche_pokemon()" dans mon html pour que lorsque je clique sur le boutton, ma fonction recherche_pokemon s'exectute. Cette fonction permet de rechercher des pokemons selon sont nom ou son id:

```js
function recherche_pokemon() {
        const nom_pokemon = document.getElementById("nom_pokemon").value.toLowerCase();
        const url_nom_pokemon = "https://pokeapi.co/api/v2/pokemon/" + nom_pokemon;
        fetch(url_nom_pokemon)
            .then((response) => response.json())
            .then((data) =>{
                document.getElementById("nom_pokemon2").textContent=data.name;
                document.getElementById("image_pokemon").src=data.sprites.versions['generation-v']['black-white'].animated.front_default;
                document.getElementById("type_pokemon").textContent=data.types[0].type.name;
                document.getElementById("poids_pokemon").textContent=`${data.weight / 10} kg`;
                document.getElementById("taille_pokemon").textContent=`${data.height/10}0 mètre`;
                document.getElementById("habilite_pokemon").textContent=`${data.abilities[0].ability.name}`;
                console.log(data.stats[0].base_stat)
                document.getElementById("stats0_pokemon").textContent = data.stats[0].base_stat; 
                document.getElementById("stats1_pokemon").textContent = data.stats[1].base_stat; 
                document.getElementById("stats2_pokemon").textContent = data.stats[2].base_stat; 
                document.getElementById("stats3_pokemon").textContent = data.stats[3].base_stat; 
                document.getElementById("stats4_pokemon").textContent = `${data.stats[4].base_stat}`; 
                document.getElementById("stats5_pokemon").textContent = data.stats[5].base_stat;          
                

                document.getElementById("info_pokemon").style.display="block";
            }
            )

            .catch((error) => 
            console.error("Erreur lors de la récupération des données des Pokémons:", error));
        }
```

Dans cette fonction j'ai créer deux constantes qui permet de récupérer le nom du pokemon et l'autre qui pemet de mettre le nom de ce pokemon à la fin de l'url de l'api pour accéder aux données relatives à ce pokemon. Ensuite le fetch fait une requete à l'api via l'url créer auparavant. On traduit les données pour les rendres manipulables puis on récupère les données voulues et on les exploites pour afficher dans notre page html avec l'id de chaque données  relatives aux pokemons.



5- Comment gérer les erreurs, comme une recherche qui ne retourne aucun résultat ?

J'ajoute un .catch:
```js
.catch((error) => 
            console.error("Erreur lors de la récupération des données des Pokémons:", error));
        
```
Cette  fonction permet de gérer si il y aune erreur et renvoie un message d'erreur dans la console.


6- Comment manipuler les objets et tableaux retournés par l'API pour afficher les informations des
Pokémon ?
J'ai utiliser ici la fonction .forEach(). Elle permet d'appliquer des conditions, évènements à tous les élements de la liste en question.

```js
//Explications: Pour chaque pokemon de la liste ça créer une carte pour le pokemon avec son nom et son images

data.results.forEach((pokemon) => {  
                    const cadre = document.createElement("div"); 
                    cadre.classList.add("cadre"); 

                    const nom = document.createElement("p");
                    nom.textContent=pokemon.name.toUpperCase()
                    cadre.appendChild(nom);
                    cadrePokemon.appendChild(cadre);

                    fetch("https://pokeapi.co/api/v2/pokemon/" + pokemon.name)
```
Pour accédez aux propriétés des objets pour extraire les informations nécessaires: 
 
Les objets fonctionnent sous forme de clé et valeur:
```js
 document.getElementById("image_pokemon").src=data.sprites.versions['generation-v']['black-white'].animated.front_default;
                document.getElementById("type_pokemon").textContent=data.types[0].type.name;
```
En premier ici, je récupère l'image du pokemon grace a la clé sprite qui possède la clé versions et je choisis ensuite la donnés que je veux: ici "genereation-v"
Ensuite je récupère le type du pokemon, donc dans le dictionnaire je choisis le premier élement de la clé types puis le type puis le nom du type. Text content permet de dire que l'on récupère une donnée sous forme écrite et src sous forme d'image.


7-  Comment utiliser fetch pour faire des requêtes asynchrones et traiter les données retournées ?

```js
fetch(url_nom_pokemon)
            .then((response) => response.json())
            .then((data) =>{
                document.getElementById("nom_pokemon2").textContent=data.name;
``` 
Le .then() sera effectuer lors de la résolution de la prommesse; donc si la requete retrourne des données la fonction .then() sera executer .


8- Comment travailler avec le format JSON pour extraire les données retournées par l'API ?
    voir question 2 pour .json()
    voir question 6 pour les objets

