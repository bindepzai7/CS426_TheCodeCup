import React from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';

type Props = {
  onPress: () => void;
};

export default function CheckoutButton({ onPress }: Props) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed && { opacity: 0.8 },
      ]}
      onPress={onPress}
    >
      <Ionicons name="cart-outline" size={18} color="white" style={styles.icon} />
      <Text style={styles.text}>Checkout</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    backgroundColor: Colors.themedBlue,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 999,
  },
  icon: {
    marginRight: 6,
  },
  text: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});
