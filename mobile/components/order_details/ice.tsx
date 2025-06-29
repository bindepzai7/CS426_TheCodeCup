import React from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import { Colors } from '../../constants/Colors';

type IceLevel = 1 | 2 | 3;

type Props = {
  selected: IceLevel;
  onSelect: (level: IceLevel) => void;
  disabled?: boolean;
};

export default function IceSelector({ selected, onSelect, disabled = false }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Ice</Text>
      <View style={styles.iconGroup}>
        <IceButton level={1} image={require('../../assets/images/details/ice/1.png')} selected={selected === 1} onPress={() => onSelect(1)} disabled={disabled} />
        <IceButton level={2} image={require('../../assets/images/details/ice/2.png')} selected={selected === 2} onPress={() => onSelect(2)} disabled={disabled} />
        <IceButton level={3} image={require('../../assets/images/details/ice/3.png')} selected={selected === 3} onPress={() => onSelect(3)} disabled={disabled} />
      </View>
    </View>
  );
}

function IceButton({
  level,
  image,
  selected,
  onPress,
  disabled,
}: {
  level: number;
  image: any;
  selected: boolean;
  onPress: () => void;
  disabled?: boolean;
}) {
  const size = {
    1: 16,
    2: 32,
    3: 32,
  }[level];

  return (
    <Pressable onPress={onPress} style={styles.iconWrapper}>
      <Image
        source={image}
        style={{
          width: size,
          height: size,
          tintColor: disabled ? 'lightgray' : selected ? Colors.themedBlue : 'lightgray',
          resizeMode: 'contain',
        }}
      />
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
  iconGroup: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
  },
  iconWrapper: {
    padding: 4,
  },
  iconImage: {
    width: 36,
    height: 36,
    resizeMode: 'contain',
  },
});
