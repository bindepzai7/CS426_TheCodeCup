import React from 'react';
import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';
import { Ionicons, FontAwesome6 } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

type Props = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
  onChangeText?: (text: string) => void;
  editable?: boolean;
};

export default function ProfileInfoRow({
  icon,
  label,
  value,
  onChangeText,
  editable = true,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Ionicons name={icon} size={24} color={Colors.themedBlue} />
      </View>

      <View style={styles.info}>
        <Text style={styles.label}>{label}</Text>

        {onChangeText && editable ? (
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChangeText}
            placeholder={label}
            placeholderTextColor="gray"
          />
        ) : (
          <Text style={styles.value}>{value}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: Colors.backgroundColor,
    borderBottomWidth: 1,
    borderBottomColor: '#dcdcdc',
    borderRadius: 5,
    gap: 12,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#eaf3ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.themedBlue,
  },
  input: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.themedBlue,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 2,
  },
});
