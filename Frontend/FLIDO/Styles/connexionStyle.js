import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    backgroundColor: "#4b0082", // Fond violet couvrant tout l'écran
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "90%",
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20, // Plus d'espace sous le logo
    borderRadius: 100,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10, // Espacement entre le titre et le sous-titre
  },
  subtitle: {
    fontSize: 16,
    color: "white",
    marginBottom: 30, // Espacement entre le sous-titre et le champ de texte
  },
  inputGroup: {
    width: "100%",
    marginBottom: 20, // Plus d'espace entre les champs de texte
    position: "relative",
  },
  input: {
    width: "100%",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "white",
  },
  togglePassword: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  forgotPassword: {
    color: "#ccc",
    textDecorationLine: "underline",
    marginBottom: 30, // Espacement entre le lien de mot de passe oublié et le bouton
  },
  loginButton: {
    width: "100%",
    backgroundColor: "#000080",
    padding: 15, // Espacement interne plus grand pour le bouton
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20, // Espacement entre le bouton et le texte "ou"
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  orText: {
    color: "#ccc",
    marginBottom: 20, // Espacement entre "ou" et le bouton Google
  },
  googleLogin: {
    width: "100%",
    backgroundColor: "white",
    padding: 15, // Espacement interne plus grand pour le bouton Google
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30, // Espacement entre le bouton Google et le lien d'inscription
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10,

  },
  googleLoginText: {
    color: "black",
  },
  signupLink: {
    color: "#ccc",
    textDecorationLine: "underline",
  },
});

export default styles;