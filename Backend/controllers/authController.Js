/**
 * Definissions des fonctions qui seront associées
 * aux futurs routes dans authRoutes.js
 */
const bcrypt = require("bcrypt");
const path = require("path");
const User = require("../models/userModel");
const logger = require("../middlewares/winston");

//page d'accueil ou page de profil en fonction de la présence de l'utilisateur dans la session
module.exports.home = async (req, res) => {
  if (req.session.user) {
    return res.render("profil", { title: "Flido", user: req.session.user });
  } else {
    return res.render("index", { title: "Flido" });
  }
};

//Fonction pour l'inscription de l'utilisateur
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

//Fonction pour la connexion de l'utilisateur
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

    req.session.user = {
      id: existingUser._id,
      name: existingUser.firstName + " " + existingUser.lastName,
      email: existingUser.email,
    };
    logger.info("Utilisateur connecté avec succès");
    res.json({ message: "Login successful!" });

  } catch (error) {
    logger.error("Erreur durant la connexion: ", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la connexion de l'utilisateur." });
  }
};

module.exports.logout = async (req, res) => {
  req.session.destroy((err) => {
  })
  res.redirect('/');
};

//Fonction pour récupérer les contacts
module.exports.findContact = async (req, res) => {
  try {
    // Vérifier si l'utilisateur est connecté
    if (!req.session.user) {
      logger.warn("Utilisateur non connecté");
      return res.status(401).json({ error: "Vous devez être connecté pour accéder à vos contacts." });
    }

    // Récupérer l'email de l'utilisateur connecté depuis la session
    const email = req.session.user.email;

    // Rechercher l'utilisateur par email
    const user = await User.findOne({ email });

    // Vérifier si l'utilisateur existe
    if (!user) {
      logger.warn("Utilisateur non trouvé");
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    // Vérifier si l'utilisateur a des contacts
    if (!user.contact || user.contact.length === 0) {
      logger.warn("Aucun contact trouvé pour cet utilisateur");
      return res.status(404).json({ error: "Aucun contact trouvé pour cet utilisateur" });
    }

    // Retourner les contacts
    res.status(200).json({ success: true, contacts: user.contact });
  } catch (error) {
    logger.error("Erreur lors de la recherche du contact", error);
    res.status(500).json({
      error: "Erreur lors de la recherche du contact",
    });
  }
};

//Fonction pour ajouter un contact
module.exports.addContact = async (req, res) => {
  try {
    // Vérifier si l'utilisateur est connecté
    if (!req.session.user) {
      logger.warn("Utilisateur non connecté");
      return res.status(401).json({ error: "Vous devez être connecté pour ajouter un contact." });
    }

    // Récupérer l'email du contact depuis la requête
    const { contact } = req.body;

    // Vérifier si le contact est présent
    if (!contact) {
      logger.warn("Le contact est obligatoire !");
      return res.status(400).json({ error: "Le contact est obligatoire !" });
    }

    // Vérifier si le contact correspond à un utilisateur existant
    const contactUser = await User.findOne({ email: contact });
    if (!contactUser) {
      logger.warn("L'utilisateur n'existe pas dans la base de données");
      return res.status(404).json({ error: "Cet utilisateur n'existe pas." });
    }

    // Récupérer l'utilisateur connecté depuis la session
    const email = req.session.user.email;
    const user = await User.findOne({ email });

    if (!user) {
      logger.warn("Utilisateur connecté non trouvé");
      return res.status(404).json({ error: "Utilisateur non trouvé." });
    }

    // Vérifier si le contact est déjà dans la liste
    if (user.contact.includes(contact)) {
      logger.warn("Le contact existe déjà dans la liste");
      return res.status(400).json({ error: "Ce contact existe déjà dans votre liste." });
    }

    // Ajouter le contact à la liste
    user.contact.push(contact);
    await user.save();

    res.status(200).json({ success: true, message: "Contact ajouté avec succès !" });
  } catch (error) {
    logger.error("Erreur lors de l'ajout du contact", error);
    res.status(500).json({ error: "Erreur lors de l'ajout du contact" });
  }
};