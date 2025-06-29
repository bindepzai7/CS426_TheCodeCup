import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons, FontAwesome6 } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

type Props = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
  onEdit?: () => void;
  iconColor?: string;
};

export default function ProfileInfoRow({
  icon,
  label,
  value,
  onEdit,
  iconColor = Colors.themedBlue,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Ionicons name={icon} size={20} color={iconColor} />
      </View>
      <View style={styles.info}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
      <Pressable onPress={onEdit}>
        <FontAwesome6 name="edit" size={20} color={Colors.themedBlue} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: '5%',
    paddingHorizontal: 20,
    gap: 12,
    backgroundColor: Colors.backgroundColor,
    marginBottom: '5%',
    borderBottomWidth: 1,
    borderBottomColor: '#dcdcdc',
    borderRadius: 5,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 18,
    backgroundColor: '#eaf3ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
  },
  label: {
    fontSize: 15,
    color: 'gray',
  },
  value: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.themedBlue,
  },
});
