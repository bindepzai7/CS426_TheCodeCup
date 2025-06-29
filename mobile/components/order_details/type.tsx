import React from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import { Colors }   from '../../constants/Colors';

type Props = {
  selected: 'Hot' | 'Cold';
  onSelect: (value: 'Hot' | 'Cold') => void;
};

export default function SelectTypeSelector({ selected, onSelect }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select</Text>
      <View style={styles.iconGroup}>
        <IconButton
          image={require('../../assets/images/details/hot.png')}
          isSelected={selected === 'Hot'}
          onPress={() => onSelect('Hot')}
        />
        <IconButton
          image={require('../../assets/images/details/cold.png')}
          isSelected={selected === 'Cold'}
          onPress={() => onSelect('Cold')}
        />
      </View>
    </View>
  );
}

function IconButton({
  image,
  isSelected,
  onPress,
}: {
  image: any;
  isSelected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={styles.iconWrapper}>
      <Image
        source={image}
        style={[
          styles.iconImage,
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
  },
  iconWrapper: {
    padding: 4,
  },
  iconImage: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
});
