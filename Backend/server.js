// ****LANCEZ LE SERVEUR AVEC "npm run dev" !!!**** \\

//Importation des dépendances
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const logger = require("./middlewares/winston");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");


// Configuration de CORS
const corsOptions = {
  origin: '*', // Autoriser toutes les origines
  credentials: true, // Autoriser l'envoi de cookies ou d'en-têtes d'authentification
  allowedHeaders: ['sessionId', 'Content-Type', 'Authorization'], // En-têtes autorisés
  exposedHeaders: ['sessionId'], // En-têtes exposés
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'], // Méthodes HTTP autorisées
  preflightContinue: false // Ne pas continuer vers le prochain middleware pour les requêtes OPTIONS
};


//Création d'une instance de Express et configation de base de middlewares
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../FrontFlido/views")));
//Donner accèes au frontend
app.use(cors(corsOptions));

//Middelware pour les log d'accès aux pages
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

//routes
app.use("/", authRoutes);

//Démarrage du serveur et connexion à la base de données MongoDB
mongoose
  .connect(process.env.DB_URL) //URL du serveur en variable d'environnement
  .then(() => {
    logger.info("Connected to MongoDB");
    app.listen(3000, () => {
      logger.info("Server is running on port 3000");
    });
  })
  .catch((err) => {
    logger.error("Failed to connect to MongoDB", err);
  });
