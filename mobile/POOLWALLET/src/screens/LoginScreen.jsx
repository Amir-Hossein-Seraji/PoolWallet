import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://localhost:3000/auth/login';

export default function LoginScreen({ navigation, setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem('userToken', data.access_token);
        await AsyncStorage.setItem('userId', data.user.id);
        
        Alert.alert("Success", "Welcome back!");
        
        setIsLoggedIn(true); 
      } else {
        Alert.alert("Login Failed", data.message || "Something went wrong");
      }
    } catch (error) {
      Alert.alert("Error", "Could not connect to server");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back! 👋</Text>
      <Text style={styles.subtitle}>Sign in to your wallet</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Enter your email" 
          value={email} 
          onChangeText={setEmail}
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Enter your password" 
          value={password} 
          onChangeText={setPassword}
          secureTextEntry={true}    
          autoCapitalize="none"      
          autoCorrect={false}       
          textContentType="password" 
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.linkText}>Don't have an account? <Text style={{fontWeight: 'bold'}}>Sign Up</Text></Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 30, justifyContent: 'center', backgroundColor: '#F0F4F8' },
  title: { fontSize: 32, fontWeight: '900', color: '#1E293B', marginBottom: 10 },
  subtitle: { fontSize: 18, color: '#64748B', marginBottom: 40 },
  inputContainer: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '600', color: '#1E293B', marginBottom: 8 },
  input: { backgroundColor: 'white', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', fontSize: 16 },
  button: { backgroundColor: '#007BFF', padding: 18, borderRadius: 12, alignItems: 'center', marginTop: 10, shadowColor: '#007BFF', shadowOpacity: 0.3, shadowRadius: 10, elevation: 5 },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  linkText: { textAlign: 'center', marginTop: 25, color: '#64748B', fontSize: 16 },
});