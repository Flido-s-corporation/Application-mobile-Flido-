import React, { useState } from "react";
import axios from "axios";
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import styles from "../../Styles/connexionStyle";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

const API_URL = "http://192.168.186.1:3000/api";
const LoginScreen = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async () => {
    // Validation simple sur frontend
    if (!formData.email || !formData.password) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/login`, {
        email: formData.email,
        password: formData.password,
      });

      if (response.data.message === "Login successful!") {
        Alert.alert("Succès", "Connexion réussie");

        router.push("/Pages/afterLogin");
      }
    } catch (error) {
      let errorMessage = "Erreur lors de la connexion";
      
      if (error.response) {
        switch (error.response.status) {
          case 400:
            errorMessage = "Email ou mot de passe incorrect";
            break;
          case 500:
            errorMessage = "Erreur serveur lors de la connexion";
            break;
          default:
            errorMessage = `Erreur serveur (${error.response.status})`;
        }
      } else if (error.request) {
        errorMessage = "Pas de réponse du serveur";
      } else {
        errorMessage = "Erreur réseau ou configuration";
      }
      
      Alert.alert("Erreur", errorMessage);
      console.error("Détail de l'erreur:", error);
    }
  };

  return (
    <LinearGradient
      colors={["#4b0082", "#6a0dad"]}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <Image style={styles.logo} source={require("../../assets/flido.png")} />
        <Text style={styles.title}>Flido</Text>
        <Text style={styles.subtitle}>Connecte-toi pour continuer</Text>

        {/* Champs de connexion */}
        <View style={styles.inputGroup}>
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            onChangeText={(text) => handleChange("email", text)}
            value={formData.email}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        
        <View style={styles.inputGroup}>
          <TextInput
            style={styles.input}
            placeholder="Mot de passe"
            secureTextEntry={!passwordVisible}
            onChangeText={(text) => handleChange("password", text)}
            value={formData.password}
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
        <TouchableOpacity 
          style={styles.loginButton} 
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Se connecter</Text>
        </TouchableOpacity>
        
        <Text style={styles.orText}>ou</Text>
        
        <TouchableOpacity style={styles.googleLogin}>
          <Image
            style={styles.googleIcon}
            source={require("../../assets/google.png")}
          />
          <Text style={styles.googleLoginText}>Se connecter avec Google</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => router.push("/Pages/inscription")}>
          <Text style={styles.signupLink}>
            Pas encore de compte? S'inscrire
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default LoginScreen;