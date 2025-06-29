import React from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import { Colors }   from '../../constants/Colors';


type SizeOption = 'Small' | 'Medium' | 'Large';

type Props = {
  selected: SizeOption;
  onSelect: (value: SizeOption) => void;
};

export default function SizeSelector({ selected, onSelect }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Size</Text>
      <View style={styles.iconGroup}>
        <SizeButton size="Small" selected={selected} onSelect={onSelect} />
        <SizeButton size="Medium" selected={selected} onSelect={onSelect} />
        <SizeButton size="Large" selected={selected} onSelect={onSelect} />
      </View>
    </View>
  );
}

function SizeButton({
  size,
  selected,
  onSelect,
}: {
  size: SizeOption;
  selected: SizeOption;
  onSelect: (value: SizeOption) => void;
}) {
  const isSelected = selected === size;

  const sizeStyle = {
    Small: { width: 20, height: 30 },
    Medium: { width: 25, height: 40 },
    Large: { width: 30, height: 50 },
  }[size];

  return (
    <Pressable onPress={() => onSelect(size)} style={styles.iconWrapper}>
      <Image
        source={require('../../assets/images/details/cup.png')}
        style={[
          styles.iconImage,
          sizeStyle,
          { tintColor: isSelected ? Colors.themedBlue : 'lightgray' },
        ]}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '5%',
  },
  label: {
    fontSize: 18,
    color: Colors.themedBlue,
  },
  iconGroup: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'flex-end', // ✅ align bottoms of all cup icons
  },
  iconWrapper: {
    alignItems: 'center',
    alignSelf: 'flex-end', // ✅ key to make bottoms line up
  },
  iconImage: {
    resizeMode: 'contain',
  },
});
