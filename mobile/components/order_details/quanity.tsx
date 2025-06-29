import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors }   from '../../constants/Colors';

type Props = {
  name: string;
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
};

export default function CoffeeTitleWithQuantity({
  name,
  quantity,
  onIncrement,
  onDecrement,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <View style={styles.quantityBox}>
        <Pressable onPress={onDecrement}>
          <Ionicons name="remove" size={16} color="#1a2a37" />
        </Pressable>
        <Text style={styles.quantity}>{quantity}</Text>
        <Pressable onPress={onIncrement}>
          <Ionicons name="add" size={16} color="#1a2a37" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: '2%',
    paddingHorizontal: '5%',
  },
  name: {
    fontSize: 18,
    color: Colors.themedBlue,
  },
  quantityBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Colors.themedBlue,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  quantity: {
    marginHorizontal: 12,
    fontSize: 16,
    color: Colors.themedBlue,
  },
});
