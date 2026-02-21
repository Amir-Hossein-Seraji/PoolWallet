import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const chartColors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];

export default function ExpenseChart({ transactions }) {
  const expenses = transactions.filter(t => t.amount < 0);

  if (expenses.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No expenses to show yet! 💸</Text>
      </View>
    );
  }

  const categoryTotals = expenses.reduce((acc, transaction) => {
    const category = transaction.category || 'Other';
    acc[category] = (acc[category] || 0) + Math.abs(transaction.amount);
    return acc;
  }, {});

  const chartData = Object.keys(categoryTotals).map((category, index) => {
    return {
      name: category,
      population: categoryTotals[category],
      color: chartColors[index % chartColors.length],
      legendFontColor: '#7F7F7F',
      legendFontSize: 13,
    };
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expense Breakdown</Text>
      <PieChart
        data={chartData}
        width={screenWidth - 40} 
        height={200}
        chartConfig={{
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor={"population"}
        backgroundColor={"transparent"}
        paddingLeft={"15"}
        absolute 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginVertical: 10,
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    alignSelf: 'flex-start'
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center'
  },
  emptyText: {
    color: '#888',
    fontStyle: 'italic'
  }
});