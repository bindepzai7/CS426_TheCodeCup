import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';

type Props = {
  onPress: () => void;
  disabled?: boolean;
};

export default function AddToCartButton({ onPress, disabled = false }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        pressed && { opacity: 0.7 },
        disabled && styles.disabled,
      ]}
      disabled={disabled}
    >
      <Text style={styles.text}>Add to cart</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.themedBlue,
    borderRadius: 999,
    paddingVertical: '5%',
    marginTop: '5%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontWeight: '600',
  },
  disabled: {
    backgroundColor: 'lightgray',
  },
});
