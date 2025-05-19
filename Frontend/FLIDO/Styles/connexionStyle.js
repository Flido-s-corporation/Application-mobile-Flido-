import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    backgroundColor: "#DECFBC",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "90%",
    alignItems: "center",
  },
  logo: {
    width: width * 0.2, // Adaptation à la taille de l'écran
    height: width * 0.2,
    marginBottom: height * 0.02,
    borderRadius: (width * 0.5) / 2, // Bordure arrondie proportionnelle
  },
  title: {
    fontSize: width * 0.08,
    fontWeight: "bold",
    color: "white",
    marginBottom: height * 0.015,
  },
  subtitle: {
    fontSize: width * 0.045,
    color: "white",
    marginBottom: height * 0.03,
  },
  inputGroup: {
    width: "100%",
    marginBottom: height * 0.02,
    position: "relative",
  },
  input: {
    width: "100%",
    padding: height * 0.015,
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
    marginBottom: height * 0.03,
  },
  loginButton: {
    width: "100%",
    backgroundColor: "#000080",
    padding: height * 0.02,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: height * 0.02,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: width * 0.045,
  },
  orText: {
    color: "#ccc",
    marginBottom: height * 0.02,
  },
  googleLogin: {
    width: "100%",
    backgroundColor: "white",
    padding: height * 0.02,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: height * 0.03,
    marginTop: height * 0.02,
  },
  googleIcon: {
    width: width * 0.05,
    height: width * 0.05,
    marginRight: 10,
  },
  googleLoginText: {
    color: "black",
    fontSize: width * 0.04,
  },
  signupLink: {
    color: "black",
    textDecorationLine: "underline",
    marginBottom: "10%",
    fontSize: width * 0.04,
  },
});

export default styles;