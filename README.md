# Todo List – Projet React & NestJS

## Introduction

Ce projet est une application **Todo List** développée avec **React** pour le frontend et **NestJS** pour le backend. Elle est connectée à une base de données **MySQL**. L'objectif principal est de créer une application complète permettant aux utilisateurs de créer, éditer et supprimer des tâches via une interface simple et intuitive. Le backend, basé sur NestJS, gère la logique métier et les interactions avec la base de données via Prisma. Le frontend, construit avec React, offre une interface interactive pour l'utilisateur et communique avec le backend via des API RESTful. Durant le développement, j'ai rencontré quelques défis techniques, tels que des conflits de ports et des erreurs de routage, que j'ai résolus avec succès pour assurer une communication fluide entre les deux parties.


## Table des matières

- [Fonctionnalités](#fonctionnalités)
- [Installation](#installation)
- [Lancement de l'application](#lancement-de-lapplication)
- [Tests](#tests)
- [Défis rencontrés et solutions](#défis-rencontrés-et-solutions)
- [Auteur](#auteur)
- [Licence](#licence)

## Fonctionnalités

### Backend (NestJS)

- Création de tâche via une API RESTful.
- Modification de tâches existantes.
- Suppression de tâches via l’API.
- Persistance des données dans une base MySQL.

### Frontend (React)

- Interface utilisateur pour créer des tâches via un formulaire.
- Modification des tâches existantes.
- Suppression directe des tâches depuis l’interface utilisateur.

## Installation

### 1. Cloner le dépôt

```bash
git clone https://github.com/Meliiiissse/Test_Tasks_Frontend_Backend_Melissa.git
```

### 2. Installer les dépendances

#### Backend (NestJS)

```bash
cd backend
yarn install
```

#### Frontend (React)

```bash
cd frontend
yarn install
```

## Lancement de l'application

### 1. Lancer le Backend

```bash
cd backend
yarn run start:dev
```

### 2. Lancer le Frontend

```bash
cd frontend
yarn dev
```

## Tests

### Tester le Backend

```bash
cd backend
yarn run test
```

### Tester le Frontend

```bash
cd frontend
yarn run test
```

## Défis rencontrés et solutions

### Conflit de port

Un conflit est survenu avec le port 3000 déjà utilisé par une autre application. Le problème a été résolu en identifiant l'application concernée et en la fermant, permettant ainsi le démarrage correct de l'application React.

### Problèmes de routes

Des erreurs 404 ont été rencontrées lors de la création et de la modification de tâches. Le problème a été résolu en corrigeant les définitions de routes dans le backend.

## Auteur

**Melissa Benmamas** – Développeuse principale du projet

## Licence

Ce projet est sous licence **MIT**.
