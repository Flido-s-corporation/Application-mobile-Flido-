import { useRouter } from "expo-router";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient"; // Importation de expo-linear-gradient la bibliothèque qui gère la couleur

const Accueil = () => {
  const router = useRouter(); // Initialisation de router pour les changements de page

  return (
    <>
      <LinearGradient
        colors={["#000000", "#3533cd", "#6933cd", "#2c1b4b"]} // Bleu foncé vers violet
        // colors={["#000080", "#800080"]}
        className="flex-1"
      >
        <View className="flex-1 items-center justify-center">
          <View>
            <TouchableOpacity>
              <Text
                className="text-white p-[10] bg-[#800080] rounded-[50] mb-[10] items-center text-center"
                onPress={() => router.push("/Pages/connexion")}
              >
                CONNEXION
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text
                className="text-white p-[10] bg-[#000080] rounded-[50] mb-[10] items-center text-center w-[300]"
                onPress={() => router.push("/Pages/inscription")}
              >
                INSCRIPTION
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </>
  );
};

export default Accueil;
