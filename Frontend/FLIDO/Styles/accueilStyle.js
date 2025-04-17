import { StyleSheet } from 'react-native';

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
        marginTop: "50%",
    },
    buttons: {
        marginTop: "20%",
        flexDirection: "column", // Changement pour empiler les boutons verticalement
        // alignItems: "center", // Centrer les boutons horizontalement
    },
    buttonConnexion: {
        backgroundColor: "#800080",
        color: "white",
        padding: 10,
        borderRadius: 50,
        textAlign: "center",
        marginBottom: 10, // Ajout d'espace entre les boutons
        width: 300, // Largeur adaptée
    },
    buttonInscription: {
        backgroundColor: "#000080",
        color: "white",
        padding: 10,
        borderRadius: 50,
        textAlign: "center",
        marginBottom: 10, // Ajout d'espace pour l'harmonie
        width: 300,
    },
    appName: {
        fontSize: 40,
        fontWeight: "bold",
        color: "white",
    },
    appDescription: {
        fontSize: 16,
        color: "white",
        marginTop: 10,
        textAlign: "center",
    },
});

export default styles;