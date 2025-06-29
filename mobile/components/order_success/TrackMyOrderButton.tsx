import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

type Props = {
  onPress: () => void;
};

export default function TrackMyOrder({ onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [
      styles.button,
      pressed && { opacity: 0.7 },
    ]}>
      <Text style={styles.text}>Track My Order</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.themedBlue,
    borderRadius: 999,
    paddingVertical: '3%',
    paddingHorizontal: '25%',
    alignItems: 'center',
    marginTop: '30%',
  },
  text: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});
