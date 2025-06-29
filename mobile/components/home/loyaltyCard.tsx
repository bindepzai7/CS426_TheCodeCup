import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { Colors } from '../../constants/Colors';

const { width, height } = Dimensions.get('window');

const cardWidth = 0.8 * width;
const cardHeight = 0.15 * height;

export default function LoyaltyCard({ current, total }: { current: number, total: number }) {
  const cups = Array.from({ length: total }, (_, i) => (
    <Image
      key={i}
      style={styles.cup}
      source={i < current ? require('../../assets/images/filled_cup.png') : require('../../assets/images/empty_cup.png')}
    />
  ));

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.text}>Loyalty Card</Text>
        <Text style={styles.text}>{current}/{total} Cups</Text>
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
  },
  cup: {
    width: 24,
    height: 24,
    marginHorizontal: '2%',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '95%',  
    },
});
