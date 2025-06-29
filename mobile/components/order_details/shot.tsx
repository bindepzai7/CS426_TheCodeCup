import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Colors }   from '../../constants/Colors';

type Props = {
  selected: 'Single' | 'Double';
  onSelect: (value: 'Single' | 'Double') => void;
};

export default function ShotSelector({ selected, onSelect }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Shot</Text>
      <View style={styles.buttonGroup}>
        <OptionButton label="Single" isSelected={selected === 'Single'} onPress={() => onSelect('Single')} />
        <OptionButton label="Double" isSelected={selected === 'Double'} onPress={() => onSelect('Double')} />
      </View>
    </View>
  );
}

function OptionButton({
  label,
  isSelected,
  onPress,
}: {
  label: string;
  isSelected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.option, isSelected && styles.selected]}
    >
      <Text style={[styles.optionText, isSelected && styles.selectedText]}>
        {label}
      </Text>
    </Pressable>
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
  label: {
    fontSize: 18,
    color: Colors.themedBlue,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 10,
  },
  option: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.themedBlue,
  },
  selected: {
    backgroundColor: Colors.themedBlue,
  },
  optionText: {
    fontSize: 14,
    color: Colors.themedBlue,
  },
  selectedText: {
    color: 'white',
  },
});
