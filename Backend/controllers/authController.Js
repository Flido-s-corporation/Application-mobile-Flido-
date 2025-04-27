/**
 * Definissions des fonctions qui seront associées
 * aux futurs routes dans authRoutes.js
 */

const bcrypt = require("bcrypt");
const path = require("path");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const logger = require("../middlewares/winston");
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

module.exports.home = async (req, res) => {
  if (req.session.user) {
    return res.render("profil", { title: "Flido", user: req.session.user });
  } else {
    return res.render("index", { title: "Flido" });
  }
};

module.exports.signup = async (req, res) => {
  try {
    //Chercher le nom, prénom, mail et mot de passe dans le requete
    const { lastName, firstName, email, password } = req.body;

    //Vérifie si tous les éléments sont présents sinon renvoie une erreur
    if (!lastName || !firstName || !email || !password) {
      logger.warn("Erreur d'inscription: Champs manquants");
      return res
        .status(400)
        .json({ error: "Tous les champs sont obligatoires." });
    }

    /**
     * Cherche l'email dans la base de données
     * et renvoie une erreur si il existe déjà
     */
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      logger.warn(`Erreur d'inscription: ${email} existe déjà`);
      return res.status(409).json({ error: "Email déjà utilisé" });
    }

    //Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    //Création de l'utilisateur en accord avec le schéma dans userModel
    const newUser = new User({
      lastName,
      firstName,
      email,
      password: hashedPassword,
    });

    // Sauvegarder dans la base de données
    await newUser.save();

    logger.info(`Utilisateur créer`, "userID: ", newUser._id);
    res.status(201).json({ success: true });
  } catch (error) {
    logger.error("Erreur durant l'inscription", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la création de l'utilisateur." });
  }
};

module.exports.login = async (req, res) => {
  try {
    //VERIFIER SI L'utillisateur existe
    const existingUser = await User.findOne({ email: req.body.email });
    if (!existingUser) {
      logger.warn("Email introuvable");
      return res
        .status(400)
        .json({ error: "L'email ou le mot de passe est incorrecte." });
    }

    //verifier si le mot de passe est correcte
    const passwordCorrect = await bcrypt.compare(
      req.body.password,
      existingUser.password
    );
    if (!passwordCorrect) {
      logger.warn("Mot de passe erroné");
      return res
        .status(400)
        .json({ error: "L'email ou le mot de passe est incorrecte." });
    }

    //Créer et assigner un token
    const token = jwt.sign({ _id: existingUser._id }, process.env.TOKEN_SECRET);
    logger.info("Utilisateur connecté avec succès");
    res.cookie("auth-token", token, { httpOnly: true, maxAge: 3600000 });
    res.json({ message: "Login successful!" });
  } catch (error) {
    logger.error("Erreur durant la connexion: ", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la connexion de l'utilisateur." });
  }
};

module.exports.googleLogin = async (req, res) => {
  const url = client.generateAuthUrl({
    access_type: "offline",
    scope: ["profile", "email"],
  });
  res.redirect(url);
};

module.exports.googleCallback = async (req, res) => {
  const code = req.query.code;

  try {
    const { tokens } = await client.getToken(code);
    //client.setCredentials(tokens);

    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.CLIENT_ID,
    });

    const payload = ticket.getPayload();
    
    let user = await User.findOne({ email: payload.email });

    if (!user) {
      // Si l'utilisateur n'existe pas, le créer
      const hashedPassword = await bcrypt.hash(payload.sub, 10);

      user = new User({
        firstName: payload.given_name,
        lastName: payload.family_name,
        email: payload.email,
        password: hashedPassword, // Utiliser l'ID Google comme mot de passe temporaire
      });

      await user.save();
    }

    req.session.user = {
      id: user._id,
      name: user.firstName + " " + user.lastName,
      email: user.email,
    };

    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

module.exports.logout = async (req, res) => {
  req.session.destroy((err) => {
  })
  res.redirect('/');
};