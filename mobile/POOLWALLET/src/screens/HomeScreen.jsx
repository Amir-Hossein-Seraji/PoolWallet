import React, { useState, useCallback } from 'react';
import { RefreshControl ,View, Text, FlatList, StyleSheet, TouchableOpacity, Alert,TextInput } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // 1. IMPORT POCKET
import BalanceCard from '../components/BalanceCard';
import ExpenseChart from '../components/ExpenseChart';
const API_URL = 'http://localhost:3000/transactions';

export default function HomeScreen({ navigation, setIsLoggedIn }) {
  const [transactions, setTransactions] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] =useState("")
  // 2. THE SECURE FETCH
  const fetchTransactions = async () => {
    try {
      // Get the ID card
      const token = await AsyncStorage.getItem('userToken'); 
      
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // <--- SHOW THE ID CARD TO THE BOUNCER!
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();

      if (response.ok) {
        setTransactions(data); // If successful, save the array
        setErrorMsg("");
      } else {
        // If the Bouncer rejects us, don't crash the math!
        setTransactions([]); 
        setErrorMsg(data.message || "Failed to load data");
      }
    } catch (error) {
      setTransactions([]);
      setErrorMsg("Network Error: " + error.message);
    }
  };
  const onRefresh = async () => {
    setRefreshing(true);      
    await fetchTransactions(); 
    setRefreshing(false);       
  };
  useFocusEffect(
    useCallback(() => {
      fetchTransactions();
    }, [])
  );

  // 3. THE SECURE DELETE
  const deleteTransaction = async (id) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchTransactions(); 
      } else {
        Alert.alert("Error", "Failed to delete transaction");
      }
    } catch (error) {
      Alert.alert("Network Error", error.message);
    }
  };
  const handleLogout = async () => {
  await AsyncStorage.removeItem('userToken'); 
  await AsyncStorage.removeItem('userId');
  setIsLoggedIn(false); 
  };
  const filteredTransactions = transactions.filter(transaction => {
    const title = transaction.title || ""; 
    return title.toLowerCase().includes(searchQuery.toLowerCase());
  });
  return (
    <View style={styles.container}>
      {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}

      <FlatList
        data={filteredTransactions}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh} 
            colors={['#007BFF']} 
            tintColor="#007BFF"  
          />
        }
        ListHeaderComponent={
          <>
            {Array.isArray(transactions) && (
              <>
                <BalanceCard transactions={transactions} />
                <ExpenseChart transactions={transactions} />
              </>
            )}
            <TextInput
              style={styles.searchInput}
              placeholder="🔍 Search transactions..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              clearButtonMode="always" 
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, marginTop: 10 }}>
              <Text style={styles.listTitle}>Recent Transactions</Text>
              <TouchableOpacity onPress={handleLogout}>
                <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 16 }}>Log Out</Text>
              </TouchableOpacity>
            </View>
          </>
        }
        renderItem={({ item }) => {
          const isIncome = item.amount > 0;
          return (
            <View style={styles.listCard}>
              <View style={styles.cardLeft}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardCategory}>{item.category}</Text>
              </View>
              
              <View style={styles.cardRight}>
                <Text style={[styles.cardAmount, { color: isIncome ? 'green' : 'red' }]}>
                  ${Math.abs(item.amount).toFixed(2)}
                </Text>
                <TouchableOpacity onPress={() => deleteTransaction(item.id)} style={styles.deleteButton}>
                  <Text style={styles.deleteText}>❌</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
        ListEmptyComponent={<Text style={{textAlign: 'center', marginTop: 20, color: 'gray'}}>No transactions yet!</Text>}
        contentContainerStyle={{ paddingBottom: 20 }} 
        showsVerticalScrollIndicator={false} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f0f4f8' },
  listTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#333' },
  listCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, backgroundColor: 'white', marginBottom: 10, borderRadius: 8, elevation: 2 },
  cardLeft: { flex: 1 },
  cardRight: { flexDirection: 'row', alignItems: 'center' },
  cardTitle: { fontSize: 16, fontWeight: 'bold' },
  cardCategory: { fontSize: 12, color: 'gray', marginTop: 4 },
  cardAmount: { fontSize: 18, fontWeight: 'bold', marginRight: 15 },
  deleteButton: { padding: 5 },
  deleteText: { fontSize: 16 },
  errorText: { color: 'red', fontSize: 16, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  searchInput: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
    marginTop: 15,
    marginBottom: 5,
  },
});