import { StyleSheet, View, Text } from 'react-native';
import LoyaltyCard from '../../components/home/loyaltyCard';
import PointsInfoCard from '@/components/rewards/pointsInfoCard';
import { Colors } from '../../constants/Colors';
import { router } from 'expo-router';

export default function Home() {
  return (
      <View style={styles.container}>  
        <View style={styles.header}>
          <Text style={styles.title}>Rewards</Text>
        </View>
        <LoyaltyCard current={3} total={8} />
        <PointsInfoCard
          points={2750}
          onRedeem={() => router.push('/redeem')}
        />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '5%',
    backgroundColor: Colors.backgroundColor,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '11%',
  },
  title: {
    fontSize: 24,
    color: Colors.themedBlue,
    paddingHorizontal: '8%',
    alignSelf: 'center',
    fontWeight: '600',
  },
});
