import express from "express";

import bookController from "./book.controller.js";

// Créer une application Express
const app = express();

// Middleware pour analyser les requêtes JSON
app.use(express.json());

// Définir les routes pour l'API des livres
app.use("/books", bookController);

// Exporter l'application pour les tests d'intégration
export default app;
