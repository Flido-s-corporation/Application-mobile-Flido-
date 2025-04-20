import React, { useState } from "react";
import { useRouter } from "expo-router";
import axios from "axios";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import styles from "../../Styles/connexionStyle";
import { LinearGradient } from "expo-linear-gradient";
// import {
//   getAuth,
//   GoogleAuthProvider,
//   signInWithCredential
// } from 'firebase/auth';
// import { auth } from '../../config/firebaseConfig';
// import * as WebBrowser from 'expo-web-browser';

//Configuration pour la connexion avec Google

// WebBrowser.maybeCompleteAuthSession();

//   const [request, response, promptAsync] = Google.useAuthRequest({
//     expoClientId: 'VOTRE_EXPO_CLIENT_ID',
//     iosClientId: 'VOTRE_IOS_CLIENT_ID.apps.googleusercontent.com',
//     androidClientId: 'VOTRE_ANDROID_CLIENT_ID.apps.googleusercontent.com',
//     webClientId: 'VOTRE_WEB_CLIENT_ID.apps.googleusercontent.com',
//   });

// useEffect(() => {
//   if (response?.type === 'success') {
//     const { id_token } = response.params;
//     const credential = GoogleAuthProvider.credential(id_token);
//     signInWithCredential(auth, credential)
//       .then((userCredential) => {
//         // Utilisateur connecté avec succès
//         const user = userCredential.user;
//         console.log('Utilisateur connecté:', user);

//         // Vous pouvez maintenant accéder aux informations de l'utilisateur :
//         console.log('Nom:', user.displayName);
//         console.log('Email:', user.email);
//         console.log('Photo:', user.photoURL);
//         console.log('ID:', user.uid);
//       })
//       .catch((error) => {
//         console.error('Erreur de connexion:', error);
//       });
//   }
// }, [response]);

//fin

const API_URL = "http://192.168.186.1:3000/api";
const SingUpScreen = () => {
  const router = useRouter();

  const [passwordVisible, setPasswordVisible] = useState(false); // État pour afficher ou masquer le mot de passe

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSignup = async () => {
    //Validation simple sans la backend

    if (formData.password !== formData.confirmPassword) {
      Alert.alert("ERREUR", "Les mots de passe ne correspondent pas");
      return;
    }

    if (
      !formData.email ||
      !formData.password ||
      !formData.firstName ||
      !formData.lastName
    ) {
      Alert.alert("ERREUR", "Veuillez remplir tous les champs");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/register`, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 201) {
        Alert.alert("Succès", "Vous êtes inscrit avec succès");
        return router.push("/Pages/connexion");
      } else {
        Alert.alert("ERREUR", "Erreur inconnue");
      }
    } catch (error) {
      let errorMessage = "Erreur lors de l'inscription";

      if (response) {
        switch (response.status) {
          case 400:
            errorMessage = "Champs manquants";
            break;
          case 409:
            errorMessage = "Email déja utilisé";
            break;
          case 500:
            errorMessage = "Erreur serveur";
            break;
        }
      } else if (error.request) {
        errorMessage = "Pas de reponse du serveur";
      } else {
        errorMessage = "Erreur réseau";
      }
      Alert.alert("ERREUR", errorMessage);
      console.error("Détail de l'erreur: ", error);
    }
  };

  return (
    <LinearGradient colors={["#4b0082", "#6a0dad"]} style={styles.gradient}>
      <View style={styles.container}>
        <Image style={styles.logo} source={require("../../assets/flido.png")} />
        <Text style={styles.title}>Flido</Text>
        <Text style={styles.subtitle}>Create a new account</Text>

        {/* Champs d'inscription */}
        <View style={styles.inputGroup}>
          <TextInput
            style={styles.input}
            placeholder="Prénom"
            onChangeText={(text) => handleChange("firstName", text)}
            value={formData.firstName}
          />
        </View>

        <View style={styles.inputGroup}>
          <TextInput
            style={styles.input}
            placeholder="Nom"
            onChangeText={(text) => handleChange("lastName", text)}
            value={formData.lastName}
          />
        </View>

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
            placeholder="Créer un mot de passe"
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

        <View style={styles.inputGroup}>
          <TextInput
            style={styles.input}
            placeholder="Confirmer votre mot de passe"
            secureTextEntry={!passwordVisible}
            onChangeText={(text) => handleChange("confirmPassword", text)}
            value={formData.confirmPassword}
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
            style={styles.togglePassword}
          >
            <Text>{passwordVisible ? "🙈" : "👁️"}</Text>
          </TouchableOpacity>
        </View>

        {/* Bouton d'inscription */}
        <TouchableOpacity style={styles.loginButton} onPress={handleSignup}>
          <Text style={styles.buttonText}>S'inscrire</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>ou</Text>

        <TouchableOpacity style={styles.googleLogin}>
          <Image
            style={styles.googleIcon}
            source={require("../../assets/google.png")}
          />
          <Text
            style={styles.googleLoginText}
            onPress={() => {
              promptAsync();
            }}
          >
            Se connecter avec Google
          </Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.signupLink}>
            Vous avez déjà un compte ? connexion
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default SingUpScreen;
