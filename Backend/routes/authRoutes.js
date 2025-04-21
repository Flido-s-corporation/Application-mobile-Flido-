//Création des routes avec les fonction dans authController
const { Router } = require("express");
const authController = require("../controllers/authController");
const router = Router();
const {Oauth2Client} = require('google-auth-library');

async function getUserData(access_token){
    const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo?access_token${access_token}');
    const data = await response.json();
    console.log('data', data);
}

//Route GET pour la page d'accueil
router.get("/", (req, res, next) => {
    authController.accueil(req, res, next);
  });
  

//Route POST pour créer l'utilisateur
router.post("/api/register", (req, res) => authController.signup(req, res));

//Route google Auth
router.post('/api/auth/google',(req,res,next) => authController.googleAuth(req,res,next));

//Route POST pour se connecter
router.post("/api/login", (req,res)=> authController.login(req,res));


//Exportation des routes pour les utiliser dans d'autres fichiers du backend
module.exports = router;
