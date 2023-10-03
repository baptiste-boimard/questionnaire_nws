**Sujet : Conception et réalisation d’un site web pour la création de sondages**

**Objectif** : 
Le but de ce projet est de développer un site web permettant à n'importe quel utilisateur de créer, partager et visualiser les résultats de sondages en utilisant le langage Javascript couplé à une base de données.

**Fonctionnalités attendues** :

1. **Inscription et connexion d’utilisateur** :
   - Création de compte avec vérification d'email.
   - Connexion sécurisée avec mot de passe.

2. **Création de sondages** :
   - Formulaire de création permettant d'entrer la question du sondage.
   - Option pour ajouter plusieurs réponses possibles.
   - Possibilité de définir une date d'expiration pour le sondage.
   - Lien unique généré pour chaque sondage pour le partager.

3. **Participation au sondage** :
   - Affichage de la question et des réponses possibles.
   - Validation de la réponse et enregistrement dans la base de données.
   - Empêcher la double participation grâce à l'utilisation de cookies ou de l'authentification.

4. **Visualisation des résultats** :
   - Graphique montrant la répartition des votes.
   - Pourcentage pour chaque réponse.
   - Nombre total de participants.

5. **Espace personnel de l’utilisateur** :
   - Liste des sondages créés par l'utilisateur.
   - Lien rapide pour partager, éditer ou supprimer un sondage.
   - Visualisation des sondages auxquels l'utilisateur a participé.

**Technologies et outils suggérés** :

- **Backend** : Node.js + TypeScript
- **Base de données** : Postegresql + Orm Sequlize
- **Frontend** : HTML, CSS (Framework comme Bootstrap), React/Redux + Typescript

**Contraintes** :

- Le site doit être responsive, adapté pour les mobiles et tablettes.
- Sécurité : Assurez-vous que votre site est protégé contre les principales vulnérabilités web (Injection SQL, Cross-site scripting, etc.).
- Le code doit être propre, commenté et facilement compréhensible.

**Étapes suggérées pour la réalisation** :

1. **Conception** : 
   - Étude des besoins et spécifications.
   - Maquettage du site (outils comme Figma, Adobe XD).

2. **Développement** :
   - Mise en place de l'environnement de développement.
   - Création de la base de données.
   - Développement backend en Node.js (gestion des utilisateurs, création de sondages, enregistrement des votes).
   - Développement frontend React/redux.

3. **Tests** :
   - Tests unitaires pour le backend.
   - Tests d'intégration.
   - Tests utilisateurs pour assurer l'ergonomie et la fiabilité du site.

4. **Déploiement** :
   - Mise en ligne sur un serveur.
   - Configuration et optimisation pour la production.