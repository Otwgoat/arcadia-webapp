Arcadia Zoo

Pourquoi ?

Cette application web est le résultat d'un projet d'évualuation dans le cadre du titre professionel, que j'ambitionne d'obtenir . L'objectif ici était de créer une application web fictive présentant le zoo Arcadia, situé à Brocéliande. Le parc souhaite véhiculer des valeurs liées à l'écologie, la préservation des espèces animales, et la pédagogie. Cette application en est à coup sûr le meilleur moyen de communication. L'appli contient également un back-office permettant aux employés , vétérinaires et à José le directeur (et administrateur) d'enregistrer un maximum d'informations sur leurs animaux et de gérer l'application ouverte au public.

Comment ?

Le back-end du projet est construit grâce à symphony, tandis que le front a été conçu par React via webpack-encore.

Deploiement en local:

Assurez-vous d'avoir Node.js et Composer installés avant de continuer. La commande symfony est également nécessaire.

1. Installer les dépendances du back-end en tapant la commande :

$ composer install

2. Installez les dépendances du front-end :

$ npm install

3. Créez la base de données :

$ php bin/console app:create-database

4. Créez les tables :

$ php bin/console app:create-tables

5. Générer les clés jwt :

$ php bin/console lexik:jwt:generate-keypair

6. Remplir le fichier .env en complétant les placeholder avec vos propres variables.

7. Lancement de symfony :

$ symfony server:start

8. Lancement de la construction du front :

$ npm run dev-server

Une ligne de commande a été créée pour configurer un administrateur :

$ php bin/console app:create-admin <firstname> <lastname> <email> <password>

Les utilisateurs seront crées par l'administrateur et un mot de passe sera entré par l'admin lors de la création.
