import { useRouter } from "expo-router";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient"; // Importation de expo-linear-gradient la bibliothèque qui gère la couleur 

const Accueil = () => {
  const router = useRouter(); // Initialisation de router pour les changements de page

  return (
    <>
    <LinearGradient
        colors={["#000080", "#800080"]} // Bleu foncé vers violet
        style={styles.gradient}
    >
        <View style={styles.appContainer}>
            <Image
                style={styles.image}
                source={require('../../assets/flido.png')}
            />

            <View style={styles.buttons}>
                <TouchableOpacity>
                    <Text style={styles.buttonConnexion}>CONNEXION</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.buttonInscription}>INSCRIPTION</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.appInfo}>
                <Text style={styles.appName}>FLIDO</Text>
                <Text style={styles.appDescription}>
                    SEPARATED BY FRONTIERS, UNITED BY FLIDO
                </Text>
            </View>
        </View>
    </LinearGradient>
    </>
);
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1, 
  },
  appContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },

  appInfo: {
    alignItems: "center",
    marginTop: "60%"
  },
  buttons: {
    marginTop: "20%",
  },
  
});

export default Accueil;