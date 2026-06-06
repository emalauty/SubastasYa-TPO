import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  StatusBar,
  Image,
  Platform,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        delay: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        delay: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Fondo oscuro degradado simulando foto de subasta */}
      <View style={styles.background}>
        {/* Overlay degradado */}
        <View style={styles.overlay} />

        {/* Contenido central */}
        <Animated.View
          style={[
            styles.centerContent,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          {/* Logo de la app */}
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/logo.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>

          {/* Nombre de la app */}
          <Text style={styles.appName}>SubastasYa</Text>
          <Text style={styles.tagline}>El arte de pujar, en tu mano.</Text>
        </Animated.View>
      </View>

      {/* Botón Ingresar en la parte inferior */}
      <Animated.View style={[styles.bottomSection, { opacity: fadeAnim }]}>
        <TouchableOpacity
          style={styles.ingresarButton}
          onPress={() => navigation.replace('Login')}
          activeOpacity={0.85}
        >
          <Text style={styles.ingresarText}>Ingresar</Text>
          <Text style={styles.ingresarArrow}> →</Text>
        </TouchableOpacity>

        <View style={styles.registerRow}>
          <Text style={styles.registerText}>¿No tenés cuenta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('RegistroEtapa1')} activeOpacity={0.7}>
            <Text style={styles.registerLink}>Registrate aquí</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A0A09',
  },

  // Fondo con simulación de foto oscura
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1A0A09',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(20, 5, 5, 0.55)',
  },

  // Centro: logo + nombre
  centerContent: {
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  logoContainer: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: 'rgba(133, 34, 33, 0.25)',
    borderWidth: 2,
    borderColor: 'rgba(133, 34, 33, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    overflow: 'hidden',
  },
  logoImage: {
    width: 100,
    height: 100,
  },
  appName: {
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    fontSize: 42,
    fontWeight: 'bold',
    color: '#852221',
    letterSpacing: 1,
    marginBottom: 8,
    textShadowColor: 'rgba(255,255,255,0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  tagline: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.7)',
    letterSpacing: 0.5,
    fontStyle: 'italic',
  },

  // Sección inferior: botón + registro
  bottomSection: {
    paddingHorizontal: 30,
    paddingBottom: 50,
    paddingTop: 24,
    backgroundColor: 'rgba(20, 5, 5, 0.85)',
  },
  ingresarButton: {
    backgroundColor: '#852221',
    paddingVertical: 17,
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#852221',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 6,
  },
  ingresarText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  ingresarArrow: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: 14,
  },
  registerLink: {
    color: '#D97E7D',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
