# Application de gestion de boutiques

Le but de ce projet est de développer un système qui permet la gestion de boutiques, de produits et de catégories associées à ces produits.

## Sommaire

1. Informations générales
2. Arborescence de l'archive
3. Technologies
4. Utilisation
5. Documentation de l'API

## Informations générales

Ce README permet de documenter le projet.

Le code source du client et celui du serveur contiennent également un README : [README du client](./shop-client/README.md), [README du serveur](./shop-server/README.md).


## Arborescence de l'archive

L'archive contient les fichiers et répertoires suivants :

- Le fichier [README.md](./README.md) : le fichier de documentation du projet
- Le répertoire [/shop-client](./shop-client/) : le code source du client
- Le répertoire [/shop-server](./shop-server/) : le code source du serveur
- Le fichier [docker-compose.yml](./docker-compose.yml) : le fichier docker-compose qui permet de lancer la configuration docker du projet

## Technologies

Voici la liste des technologies utilisées dans le projet :

- React pour le front-end
- Spring Boot pour le back-end
- PostgreSQL pour la base de données

## Utilisation

Le projet est entièrement dockerisé. Il suffit d'ouvrir un terminal à la racine de l'archive et d'exécuter la commande `docker compose up`.

Le front-end de l'application se trouve ensuite à l'adresse http://localhost:4200 et le back-end à l'adresse http://localhost:8080.

## Documentation de l'API

Une [documentation swagger](http://localhost:8080/swagger-ui/#/shop-controller) de l'API est disponible.
