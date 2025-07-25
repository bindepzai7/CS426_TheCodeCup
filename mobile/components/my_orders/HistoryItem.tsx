import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

type HistoryItemProps = {
  coffeeName: string;
  address: string;
  price: number;
  time: string;
};

export default function HistoryItem({
  coffeeName,
  address,
  price,
  time,
}: HistoryItemProps) {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Text style={styles.time}>{time}</Text>
        <Text style={styles.price}>${price.toFixed(1)}</Text>
      </View>

      <View style={styles.detailRow}>
        <FontAwesome name="coffee" size={16} color={Colors.themedBlue} />
        <Text style={styles.text}>{coffeeName}</Text>
      </View>

      <View style={styles.detailRow}>
        <Entypo name="location-pin" size={16} color={Colors.themedBlue} />
        <Text style={styles.text}>{address}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    marginVertical: '3%',
    opacity: 0.6,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  time: {
    fontSize: 12,
    color: 'gray',
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.themedBlue,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  text: {
    fontSize: 13,
    color: Colors.themedBlue,
    marginLeft: 6,
  },
});
