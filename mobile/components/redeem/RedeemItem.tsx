import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { Colors } from '@/constants/Colors';

type RedeemItemProps = {
  name: string;
  image_url: string;
  dueDate: string;
  points: number;
  onPress: () => void;
};

export default function RedeemItem({
  name,
  image_url,
  dueDate,
  points,
  onPress,
}: RedeemItemProps) {
  return (
    <View style={styles.itemContainer}>
      <Image source={{ uri: image_url }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.date}>Valid until {dueDate}</Text>
      </View>
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{points} pts</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: '1%',
    backgroundColor: Colors.tabBarColor,
    padding: 12,
    borderRadius: 8,
  },
  image: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  date: {
    color: 'gray',
    fontSize: 12,
    marginTop: 4,
  },
  button: {
    backgroundColor: Colors.themedBlue,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
