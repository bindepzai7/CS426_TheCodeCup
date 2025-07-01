import React from 'react';
import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

type ConfirmModalProps = {
  visible: boolean;
  itemName: string;
  points: number;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmModal({
  visible,
  itemName,
  points,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
          <Text style={styles.title}>Confirm Redemption</Text>
          <Text style={styles.message}>
            Do you want to redeem <Text style={styles.highlight}>{itemName}</Text> for{' '}
            <Text style={styles.highlight}>{points} points</Text>?
          </Text>
          <View style={styles.buttonRow}>
            <Pressable onPress={onCancel} style={[styles.button, styles.cancel]}>
              <Text style={styles.buttonText}>Cancel</Text>
            </Pressable>
            <Pressable onPress={onConfirm} style={[styles.button, styles.confirm]}>
              <Text style={styles.buttonText}>Confirm</Text>
            </Pressable>
          </View>
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
  modalBox: {
    width: '85%',
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
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  highlight: {
    fontWeight: 'bold',
    color: Colors.themedBlue,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancel: {
    backgroundColor: '#ccc',
  },
  confirm: {
    backgroundColor: Colors.themedBlue,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
