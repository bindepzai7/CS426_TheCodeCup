import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { Colors } from '../../constants/Colors';
import { useAuth } from '@/context/AuthContext';

const { width, height } = Dimensions.get('window');

const cardWidth = 0.8 * width;
const cardHeight = 0.15 * height;

export default function LoyaltyCard({ current = 0, total = 8 }: { current?: number, total?: number }) {
  const { profile } = useAuth();

  const loyaltyCount = (profile?.loyalty_level ?? current) % total;
  const totalCups = total;

  const cups = Array.from({ length: totalCups }, (_, i) => (
    <Image
      key={i}
      style={styles.cup}
      source={
        i < loyaltyCount
          ? require('../../assets/images/filled_cup.png')
          : require('../../assets/images/empty_cup.png')
      }
    />
  ));

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.text}>Loyalty Card</Text>
        <Text style={styles.text}>{loyaltyCount % totalCups}/{totalCups} Cups</Text>
      </View>
      <View style={styles.cupsContainer}>{cups}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.themedBlue,
    width: cardWidth,
    height: cardHeight,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 0.03 * width,
    padding: 16,
    marginBottom: '6%',
  },
  text: {
    fontSize: 15,
    color: 'lightgray',
    marginBottom: '3%',
  },
  cupsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.tabBarColor,
    borderRadius: 0.03 * width,
    height: 0.5 * cardHeight,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: '3%',
  },
  cup: {
    width: 24,
    height: 24,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
});
