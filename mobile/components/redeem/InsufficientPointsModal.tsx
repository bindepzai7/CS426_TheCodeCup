import React from 'react';
import { Modal, View, Text, StyleSheet, Pressable } from 'react-native';
import { Colors } from '@/constants/Colors';

type Props = {
  visible: boolean;
  itemName: string;
  requiredPoints: number;
  userPoints: number;
  onClose: () => void;
};

export default function InsufficientPointsModal({
  visible,
  itemName,
  requiredPoints,
  userPoints,
  onClose,
}: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Insufficient Points</Text>
          <Text style={styles.message}>
            You need {requiredPoints} points to redeem {itemName}.
          </Text>
          <Text style={styles.message}>
            You currently have {userPoints} points.
          </Text>
          <Pressable style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>OK</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.themedBlue,
    marginBottom: 12,
  },
  message: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  button: {
    marginTop: 16,
    backgroundColor: Colors.themedBlue,
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
