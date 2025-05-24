import React, { useState } from "react";
import axios from "axios";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

const API_URL = "http://192.168.186.1:3000/api";
const LoginScreen = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

  const handleLogin = async () => {
    // Reset all errors
    setErrors({
      email: "",
      password: "",
    });

    let isValid = true;
    const newErrors = { ...errors };

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
    }

    if (!isValid) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/login`, {
        email: formData.email,
        password: formData.password,
      });

      if (response.data.message === "Login successful!") {
        showNotification("Connexion réussie !", "success");
        setTimeout(() => router.push("/Pages/Contacs"), 2000);
      }
    } catch (error) {
      let errorMessage = "Erreur lors de la connexion";
      
      if (error.response) {
        switch (error.response.status) {
          case 400:
            setErrors({ 
              ...errors, 
              email: "Email ou mot de passe incorrect",
              password: "Email ou mot de passe incorrect"
            });
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
      console.error("Détail de l'erreur:", error);
    }
  };

  return (
    <LinearGradient
      colors={["#DECFBC", "#DECFBC"]}
      className="flex-1 justify-center bg-[#DECFBC] items-center"
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

      <View className="w-[90%] items-center">
        <Image 
          className="w-[150] h-[150] mb-4" 
          source={require("../../assets/images/lg.png")} 
        />
        <Text className="text-3xl font-bold text-white mb-2">Flido</Text>
        <Text className="text-base text-black mb-6">Connecte-toi pour continuer</Text>

        {/* Champs de connexion */}
        <View className="w-full mb-4">
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
        
        <View className="w-full mb-4 relative">
          <TextInput
            className={`w-full p-3 rounded bg-white ${
              errors.password ? "border border-red-500" : ""
            }`}
            placeholder="Mot de passe"
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
        
        <TouchableOpacity className="mb-6">
          <Text className="text-[#ccc] underline">Mot de passe oublié?</Text>
        </TouchableOpacity>

        {/* Boutons */}
        <TouchableOpacity 
          className="w-full bg-[#85664A] p-4 rounded items-center mb-4"
          onPress={handleLogin}
        >
          <Text className="text-white font-bold text-base">Se connecter</Text>
        </TouchableOpacity>
        
        <Text className="text-[#ccc] mb-4">ou</Text>
        
        <TouchableOpacity className="w-full bg-white p-4 rounded flex-row items-center justify-center mb-6">
          <Image
            className="w-5 h-5 mr-2"
            source={require("../../assets/google.png")}
          />
          <Text className="text-black text-sm">Se connecter avec Google</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => router.push("/Pages/inscription")}>
          <Text className="text-black underline text-sm">
            Pas encore de compte? S'inscrire
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default LoginScreen;