import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const AfterLogin = () => {
  const router = useRouter();

  const handleLogout = () => {
    //On implementera la logique de déconnexion
    router.push('/Pages/connexion');
  };

  return (
    <LinearGradient colors={["#4b0082", "#6a0dad"]} style={styles.gradient}>
      <View style={styles.container}>
        <Image 
          style={styles.logo} 
          source={require('../../assets/flido.png')} 
        />
        <Text style={styles.title}>Bienvenue sur Flido</Text>
        <Text style={styles.subtitle}>Vous êtes maintenant connecté</Text>

        <View style={styles.card}>
          <Text style={styles.cardText}>Profil utilisateur</Text>
          <Text style={styles.cardText}>Options disponibles :</Text>
          
          <TouchableOpacity 
            style={styles.menuButton}
            onPress={() => router.push('/Pages/profile')}
          >
            <Text style={styles.buttonText}>Voir mon profil</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuButton}
            onPress={() => router.push('/Pages/settings')}
          >
            <Text style={styles.buttonText}>Paramètres</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutText}>Déconnexion</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    marginBottom: 30,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: '100%',
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
  },
  cardText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 15,
  },
  menuButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  logoutButton: {
    marginTop: 20,
  },
  logoutText: {
    color: 'white',
    textDecorationLine: 'underline',
  },
});

export default AfterLogin;