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
        <View className="flex-1 items-center justify-center bg-[#DECFBC]">
          <View>
            <TouchableOpacity>
              <Text
                className="color-white text-lg font-bold p-[10] bg-[#85664A] rounded-[50] mb-[10] items-center text-center h-[50]"
                onPress={() => router.push("/Pages/connexion")}
              >
                CONNEXION
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text
                className="color-white text-lg font-bold  p-[10] bg-[#453A2C] rounded-[50] mb-[10] items-center text-center w-[250] h-[50] justify-center" //Modif
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
