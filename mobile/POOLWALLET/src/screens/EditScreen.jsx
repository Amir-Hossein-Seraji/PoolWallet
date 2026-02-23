import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://localhost:3000/transactions';

export default function EditScreen({ route, navigation }) {
  const { transaction } = route.params;

  const [title, setTitle] = useState(transaction.title);
  const [amount, setAmount] = useState(transaction.amount.toString()); 
  const [category, setCategory] = useState(transaction.category);

  const updateTransaction = async () => {
    if (!title || !amount || !category) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      const token = await AsyncStorage.getItem('userToken');

      const response = await fetch(`${API_URL}/${transaction.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: title,
          amount: parseFloat(amount),
          category: category,
        }),
      });

      if (response.ok) {
        Alert.alert("Success!", "Transaction updated");
        navigation.goBack(); 
      } else {
        const errorData = await response.json();
        Alert.alert("Error", errorData.message || "Failed to update");
      }
    } catch (error) {
      Alert.alert("Network Error", "Could not connect to the server.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Edit Transaction</Text>
      
      <View style={styles.card}>
        <Text style={styles.label}>Title</Text>
        <TextInput style={styles.input} value={title} onChangeText={setTitle} />
        
        <Text style={styles.label}>Amount ($)</Text>
        <TextInput style={styles.input} value={amount} onChangeText={setAmount} keyboardType="numeric" />
        
        <Text style={styles.label}>Category</Text>
        <TextInput style={styles.input} value={category} onChangeText={setCategory} />
        
        <TouchableOpacity style={styles.button} onPress={updateTransaction}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f0f4f8' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#333', textAlign: 'center' },
  card: { backgroundColor: 'white', padding: 20, borderRadius: 15, elevation: 3 },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 5, color: '#555' },
  input: { backgroundColor: '#f9f9f9', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#ddd', marginBottom: 15, fontSize: 16 },
  button: { backgroundColor: '#10B981', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 }, // Green button for Edit!
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' }
});