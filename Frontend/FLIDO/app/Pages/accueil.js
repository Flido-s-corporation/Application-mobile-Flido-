import { useRouter } from "expo-router";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient"; // Importation de expo-linear-gradient la bibliothèque qui gère la couleur 
import styles from '../../Styles/accueilStyle'; //Importation du style de accueil

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

export default Accueil;