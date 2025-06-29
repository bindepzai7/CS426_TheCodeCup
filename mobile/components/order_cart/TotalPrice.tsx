import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors'; 

type Props = {
  value: number;
};

export default function TotalPrice({ value }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Total Price</Text>
      <Text style={styles.amount}>${value.toFixed(1)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
  },
  label: {
    fontSize: 13,
    color: 'lightgray',
    marginBottom: 4,
  },
  amount: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.themedBlue, 
  },
});
