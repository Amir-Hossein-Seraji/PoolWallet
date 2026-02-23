import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function BalanceCard({ transactions }) {
  const income = transactions
    .filter(item => item.amount > 0)
    .reduce((sum, item) => sum + item.amount, 0);

  const expenses = transactions
    .filter(item => item.amount < 0)
    .reduce((sum, item) => sum + item.amount, 0);

  const totalBalance = income + expenses; 

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Total Balance</Text>
      <Text style={styles.balance}>${totalBalance.toFixed(2)}</Text>
      
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>Income</Text>
          <Text style={[styles.amount, { color: 'green' }]}>+${income.toFixed(2)}</Text>
        </View>
        
        <View style={styles.column}>
          <Text style={styles.label}>Expenses</Text>
          <Text style={[styles.amount, { color: 'red' }]}>-${Math.abs(expenses).toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#1E293B', padding: 20, borderRadius: 15, marginBottom: 20, elevation: 5 },
  title: { color: '#94A3B8', fontSize: 16, fontWeight: 'bold', textAlign: 'center' },
  balance: { color: 'white', fontSize: 36, fontWeight: '900', textAlign: 'center', marginVertical: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, borderTopWidth: 1, borderTopColor: '#334155', paddingTop: 15 },
  column: { alignItems: 'center' },
  label: { color: '#94A3B8', fontSize: 14, marginBottom: 4 },
  amount: { fontSize: 18, fontWeight: 'bold' }
});