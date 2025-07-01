import React from 'react';
import { View, Text, StyleSheet, Pressable, Image, Dimensions } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/context/AuthContext';

type Props = {
  onRedeem: () => void;
};

const { width, height } = Dimensions.get('window');

const cardWidth = 0.8 * width;
const cardHeight = 0.13 * height;

export default function PointsInfoCard({onRedeem}: Props) {
  const { profile } = useAuth();
  const userPoints = profile?.reward_points ?? 0;

  // Ensure points is a number
  let points = typeof userPoints === 'number' ? userPoints : 0;
  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.label}>My Points:</Text>
        <Text style={styles.points}>{points}</Text>
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.redeemButton,
          pressed && { opacity: 0.7 }
        ]}
        onPress={onRedeem}
      >
        <Text style={styles.redeemText}>Redeem drinks</Text>
      </Pressable>

      <Image
        source={require('@/assets/images/coffee.png')} 
        style={styles.backgroundImage}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.themedBlue,
    width: cardWidth,
    height: cardHeight,
    alignSelf: 'center',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  label: {
    color: 'lightgray',
    fontSize: 14,
    marginBottom: 4,
  },
  points: {
    color: 'lightgray',
    fontSize: 28,
    fontWeight: 'bold',
  },
  redeemButton: {
    backgroundColor: '#3d5a6c',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    zIndex: 2,
  },
  redeemText: {
    color: 'lightgray',
    fontSize: 12,
    fontWeight: '600',
  },
  backgroundImage: {
    position: 'absolute',
    bottom: -15,
    right: -15,
    width: 60,
    height: 60,
    opacity: 0.5,
    zIndex: 0,
  },
});
