import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';

type Props = {
  basePrice: number;
  quantity: number;
  size: 'Small' | 'Medium' | 'Large';
  type: 'Hot' | 'Cold';
  shot: 'Single' | 'Double';
};

export default function TotalAmount({ basePrice, quantity, size, type, shot }: Props) {
  const calculateTotal = () => {
    let price = basePrice;

    if (size === 'Medium') price += 0.5;
    else if (size === 'Large') price += 1.0;

    if (type === 'Cold') price += 0.3;

    if (shot === 'Double') price += 0.7;

    return price * quantity;
  };

  const total = calculateTotal();

  return (
    <View style={styles.row}>
      <Text style={styles.label}>Total Amount</Text>
      <Text style={styles.amount}>${total.toFixed(1)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
  },
  label: {
    fontSize: 18,
    fontWeight: '500',
    color: Colors.themedBlue,
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.themedBlue,
  },
});
