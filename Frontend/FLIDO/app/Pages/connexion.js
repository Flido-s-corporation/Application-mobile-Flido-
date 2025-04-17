import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import styles from '../../Styles/connexionStyle'; // Style mis à jour
import { LinearGradient } from "expo-linear-gradient";

const LoginScreen = () => {
  const [passwordVisible, setPasswordVisible] = useState(false); // État pour afficher ou masquer le mot de passe

  return (
    <LinearGradient
      colors={["#4b0082", "#6a0dad"]} // Dégradé violet couvrant tout l'écran
      style={styles.gradient} // Style global pour le dégradé
    >
      <View style={styles.container}>
        {/* Logo et Titre */}
        <Image style={styles.logo} source={require('../../assets/flido.png')} />
        <Text style={styles.title}>Flido</Text>
        <Text style={styles.subtitle}>Connecte-toi pour continuer</Text>

        {/* Champs de connexion */}
        <View style={styles.inputGroup}>
          <TextInput style={styles.input} placeholder="E-mail ou nom d'utilisateur" />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
            style={styles.input}
            placeholder="Mot de passe"
            secureTextEntry={!passwordVisible}
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
            style={styles.togglePassword}
          >
            <Text>{passwordVisible ? "🙈" : "👁️"}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Mot de passe oublié?</Text>
        </TouchableOpacity>

        {/* Boutons */}
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.buttonText}>Se connecter</Text>
        </TouchableOpacity>
        <Text style={styles.orText}>ou</Text>
        <TouchableOpacity style={styles.googleLogin}>
          <Image style={styles.googleIcon} source={require('../../assets/google.png')} />
          <Text style={styles.googleLoginText}>Se connecter avec Google</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.signupLink}>Pas encore de compte? S'inscrire</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default LoginScreen;