import { View, Text, StyleSheet, Dimensions, Image, Pressable } from 'react-native';
import { Colors } from '../../constants/Colors';

const { width, height } = Dimensions.get('window');

const cardWidth = 0.44 * width;
const cardHeight = 0.2 * height;

export default function CoffeeItem({
  name,
  image_url,
  onPress,
}: {
  name: string;
  image_url: string;
  onPress?: () => void;
}) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image source={{uri: image_url}} style={styles.image} />
      </View>
      <Text style={styles.text}>{name}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    width: cardWidth,
    height: cardHeight,
    borderRadius: 0.03 * width,
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 0.02 * width,
    padding: 10,
  },
  text: {
    color: Colors.themedBlue,
    fontSize: 16,
    marginBottom: 5,
  },
  imageContainer: {
    width: '100%',
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '80%',
    height: '100%',
    resizeMode: 'contain',
  },
});
