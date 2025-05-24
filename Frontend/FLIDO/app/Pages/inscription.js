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
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const API_URL = "http://192.168.186.1:3000/api";
const SignUpScreen = () => {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: "", type: "" }), 3000);
  };

  const handleSignup = async () => {
    // Reset all errors
    setErrors({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    let isValid = true;
    const newErrors = { ...errors };

    if (!formData.firstName) {
      newErrors.firstName = "Le prénom est obligatoire";
      isValid = false;
    }

    if (!formData.lastName) {
      newErrors.lastName = "Le nom est obligatoire";
      isValid = false;
    }

    if (!formData.email) {
      newErrors.email = "L'email est obligatoire";
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Email invalide";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Le mot de passe est obligatoire";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Le mot de passe doit contenir au moins 6 caractères";
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
      isValid = false;
    }

    if (!isValid) {
      setErrors(newErrors);
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
        showNotification("Inscription réussie !", "success");
        setTimeout(() => router.push("/Pages/connexion"), 2000);
      }
    } catch (error) {
      let errorMessage = "Erreur lors de l'inscription";

      if (error.response) {
        switch (error.response.status) {
          case 400:
            errorMessage = "Tous les champs sont obligatoires.";
            break;
          case 409:
            setErrors({ ...errors, email: "Email déjà utilisé" });
            return;
          case 500:
            errorMessage = "Erreur serveur";
            break;
          default:
            errorMessage = `Erreur serveur (${error.response.status})`;
        }
      } else if (error.request) {
        errorMessage = "Pas de réponse du serveur";
      } else {
        errorMessage = "Erreur réseau ou configuration";
      }

      showNotification(errorMessage, "error");
      console.error("Détail de l'erreur: ", error);
    }
  };

  return (
    <LinearGradient
      colors={["#DECFBC", "#DECFBC"]}
      className="flex-1 bg-[#DECFBC] justify-center items-center"
    >
      {/* Notification */}
      {notification.message && (
        <View
          className={`absolute top-0 left-0 right-0 p-4 ${
            notification.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          <Text className="text-white text-center">{notification.message}</Text>
        </View>
      )}

      <View className="w-full items-center">
        <View className="items-center">
          <Image
            className="w-[150] h-[150] rounded-full"
            source={require("../../assets/images/lg.png")}
          />
          <Text className="text-4xl font-bold text-white mb-[40]">Flido</Text>
        </View>

        <Text className="text-base text-white mb-6">Create a new account</Text>

        {/* Champs d'inscription */}
        <View className="w-3/4 mb-4">
          <TextInput
            className={`w-full p-3 rounded bg-white ${
              errors.firstName ? "border border-red-500" : ""
            }`}
            placeholder="Prénom"
            placeholderTextColor="black"
            onChangeText={(text) => handleChange("firstName", text)}
            value={formData.firstName}
          />
          {errors.firstName && (
            <Text className="text-red-500 text-xs mt-1">{errors.firstName}</Text>
          )}
        </View>

        <View className="w-3/4 mb-4">
          <TextInput
            className={`w-full p-3 rounded bg-white ${
              errors.lastName ? "border border-red-500" : ""
            }`}
            placeholder="Nom"
            placeholderTextColor="black"
            onChangeText={(text) => handleChange("lastName", text)}
            value={formData.lastName}
          />
          {errors.lastName && (
            <Text className="text-red-500 text-xs mt-1">{errors.lastName}</Text>
          )}
        </View>

        <View className="w-3/4 mb-4">
          <TextInput
            className={`w-full p-3 rounded bg-white ${
              errors.email ? "border border-red-500" : ""
            }`}
            placeholder="E-mail"
            placeholderTextColor="black"
            onChangeText={(text) => handleChange("email", text)}
            value={formData.email}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {errors.email && (
            <Text className="text-red-500 text-xs mt-1">{errors.email}</Text>
          )}
        </View>

        <View className="w-3/4 mb-4 relative">
          <TextInput
            className={`w-full p-3 rounded bg-white ${
              errors.password ? "border border-red-500" : ""
            }`}
            placeholder="Créer un mot de passe"
            placeholderTextColor="black"
            secureTextEntry={!passwordVisible}
            onChangeText={(text) => handleChange("password", text)}
            value={formData.password}
          />
          {errors.password && (
            <Text className="text-red-500 text-xs mt-1">{errors.password}</Text>
          )}
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
            className="absolute right-3 top-3"
          >
            <Text>{passwordVisible ? "🙈" : "👁️"}</Text>
          </TouchableOpacity>
        </View>

        <View className="w-3/4 mb-4 relative">
          <TextInput
            className={`w-full p-3 rounded bg-white ${
              errors.confirmPassword ? "border border-red-500" : ""
            }`}
            placeholder="Confirmer votre mot de passe"
            placeholderTextColor="black"
            secureTextEntry={!passwordVisible}
            onChangeText={(text) => handleChange("confirmPassword", text)}
            value={formData.confirmPassword}
          />
          {errors.confirmPassword && (
            <Text className="text-red-500 text-xs mt-1">
              {errors.confirmPassword}
            </Text>
          )}
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
            className="absolute right-3 top-3"
          >
            <Text>{passwordVisible ? "🙈" : "👁️"}</Text>
          </TouchableOpacity>
        </View>

        {/* Bouton d'inscription */}
        <TouchableOpacity
          className="w-1/2 bg-[#85664A] p-4 rounded-[50] items-center mb-4 mt-10"
          onPress={handleSignup}
        >
          <Text className="text-white font-bold text-base">S'inscrire</Text>
        </TouchableOpacity>

        <TouchableOpacity className="w-[300] bg-white p-4 rounded flex-row items-center justify-center mb-6 mt-4">
          <Image
            className="w-5 h-5 mr-2"
            source={require("../../assets/google.png")}
          />
          <Text className="text-black text-sm">Se connecter avec Google</Text>
        </TouchableOpacity>

        <TouchableOpacity className="mb-10">
          <Text className="text-black underline text-sm">
            Vous avez déjà un compte ? connexion
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default SignUpScreen;