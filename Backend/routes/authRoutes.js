//Création des routes avec les fonction dans authController
const { Router } = require("express");
const authController = require("../controllers/authController");
const router = Router();

//Route GET pour la page d'accueil
router.get("/", (req, res,) => {
    authController.home(req, res);
  });
  

//Route POST pour créer l'utilisateur
router.post("/api/register", (req, res) => authController.signup(req, res));

//Route POST pour se connecter
router.post("/api/login", (req,res)=> authController.login(req,res));

//Route pour rechercher contact
router.get("/api/findContact", (req, res) => authController.findContact(req, res));

//Route pour ajouter un contact
router.put("/api/addContact", (req, res) => authController.addContact(req, res));

//Route GET pour se connecter avec Google
router.get("/api/auth/google", (req,res)=> authController.googleLogin(req,res));

//Route redirection pour la page de profil
router.get('/auth/google/callback', async (req, res) => authController.googleCallback(req, res));

//Route get deconnexion
router.get('/auth/logout', (req, res) => authController.logout(req, res));

//Exportation des routes pour les utiliser dans d'autres fichiers du backend
module.exports = router;


