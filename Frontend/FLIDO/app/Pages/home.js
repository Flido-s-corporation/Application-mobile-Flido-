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
        className= 'flex-1'
    >
        <View  className= ' flex-1 justify-center items-center'>

        <View>
                <Text className= 'text-white text-6xl font-bold'> FLIDO</Text>
            </View>


            <Image
                className= ' w-[200] h-[200] rounded-[100]'
                source={require('../../assets/flido.png')}
            />

            {/* <View style={styles.buttons}>
                <TouchableOpacity>
                    <Text style={styles.buttonConnexion}
                        onPress={() => router.push('/Pages/accueil')}
                    >
                        GET STARTED
                    </Text>
                </TouchableOpacity>
            </View> */}
            

        </View>
    </LinearGradient>
    </>
);
};

export default Accueil;