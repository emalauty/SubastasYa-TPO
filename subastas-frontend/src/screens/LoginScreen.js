import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ActivityIndicator
} from 'react-native';
import { COLORS } from '../theme/colors';

const API_URL = 'http://192.168.0.107:8080/api/v1/auth/login';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [errorGeneral, setErrorGeneral] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (text) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(text);
  };

  const handleLogin = async () => {
    let isValid = true;
    setErrorEmail('');
    setErrorPassword('');
    setErrorGeneral('');

    if (!email) {
      setErrorEmail('El email es obligatorio.');
      isValid = false;
    } else if (!validateEmail(email)) {
      setErrorEmail('Formato de email inválido.');
      isValid = false;
    }

    if (!password) {
      setErrorPassword('La contraseña es obligatoria.');
      isValid = false;
    }

    if (!isValid) return;

    setIsLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const usuario = await response.json();
        navigation.replace('Home', { usuario });
      } else if (response.status === 403) {
        const msg = await response.text();
        setErrorGeneral(msg);
      } else {
        setErrorGeneral('Credenciales incorrectas. Verificá tu email y contraseña.');
      }
    } catch (error) {
      console.error(error);
      setErrorGeneral('No se pudo conectar con el servidor. Verificá que el backend esté corriendo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>¡Hola de nuevo!</Text>
        <Text style={styles.subtitle}>Iniciá sesión para empezar a pujar.</Text>
      </View>

      <View style={styles.imagePlaceholder}>
        <Text style={styles.imageEmoji}>🧑‍⚖️🔨</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, errorEmail && styles.inputError]}
          placeholder="Correo electrónico"
          placeholderTextColor="#888"
          value={email}
          onChangeText={t => { setEmail(t); setErrorEmail(''); }}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {errorEmail ? <Text style={styles.errorText}>{errorEmail}</Text> : null}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, errorPassword && styles.inputError]}
          placeholder="Contraseña"
          placeholderTextColor="#888"
          value={password}
          onChangeText={t => { setPassword(t); setErrorPassword(''); }}
          secureTextEntry
        />
        {errorPassword ? <Text style={styles.errorText}>{errorPassword}</Text> : null}
      </View>

      <View style={styles.optionsRow}>
        <TouchableOpacity style={styles.checkboxContainer}>
          <View style={styles.checkbox} />
          <Text style={styles.checkboxText}>Recordarme</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.buttonText}>Iniciar Sesion</Text>
        )}
      </TouchableOpacity>

      {errorGeneral ? (
        <View style={styles.errorBox}>
          <Text style={styles.errorBoxText}>⚠️  {errorGeneral}</Text>
        </View>
      ) : null}

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>¿No tenes cuenta? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('RegistroEtapa1')}>
          <Text style={styles.registerLink}>Registrate aqui</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 15 }}>
        <Text style={styles.registerText}>¿Recibiste el correo? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('RegistroEtapa2')}>
          <Text style={styles.registerLink}>Activá tu cuenta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
    justifyContent: 'center',
    padding: 30,
  },
  headerContainer: { marginBottom: 20 },
  title: {
    fontSize: 28, fontWeight: 'bold',
    color: COLORS.TEXT_TITLE, marginBottom: 8,
  },
  subtitle: { fontSize: 16, color: '#555' },
  imagePlaceholder: {
    height: 180, backgroundColor: '#FFF', borderRadius: 15,
    justifyContent: 'center', alignItems: 'center', marginBottom: 30,
    borderWidth: 1, borderColor: '#EEE'
  },
  imageEmoji: { fontSize: 60 },
  inputContainer: { marginBottom: 20 },
  input: {
    borderBottomWidth: 1, borderBottomColor: '#000',
    paddingVertical: 10, paddingHorizontal: 5, fontSize: 16, color: COLORS.TEXT_MAIN,
  },
  inputError: { borderBottomColor: COLORS.ERROR, borderBottomWidth: 2 },
  errorText: { color: COLORS.ERROR, fontSize: 13, marginTop: 4 },
  optionsRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: 30,
  },
  checkboxContainer: { flexDirection: 'row', alignItems: 'center' },
  checkbox: { width: 16, height: 16, borderWidth: 1, borderColor: '#555', marginRight: 8, borderRadius: 2 },
  checkboxText: { fontSize: 14, color: '#333' },
  forgotPasswordText: { fontSize: 14, color: '#7EADD6' }, // Light blue like wireframe
  errorBox: {
    backgroundColor: '#FEE2E2', borderRadius: 10,
    padding: 14, marginTop: 10, borderLeftWidth: 4, borderLeftColor: COLORS.ERROR,
  },
  errorBoxText: { color: '#7F1D1D', fontSize: 14, lineHeight: 20 },
  button: {
    backgroundColor: COLORS.PRIMARY, paddingVertical: 16,
    borderRadius: 30, alignItems: 'center', // Rounded pill
  },
  buttonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  registerContainer: {
    flexDirection: 'row', justifyContent: 'center', marginTop: 40,
  },
  registerText: { color: '#333', fontSize: 15 },
  registerLink: { color: '#1B263B', fontSize: 15, fontWeight: 'bold' },
});
