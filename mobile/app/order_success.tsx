import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TrackMyOrder from '@/components/order_success/TrackMyOrderButton';
import { router } from 'expo-router';
import { Colors } from '../constants/Colors'; // Import the Colors constant

export default function OrderSuccess() {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('@/assets/images/order_success.png')} 
        resizeMode="contain"
      />
      <Text style={styles.title}>Order Success</Text>
      <Text style={styles.subtitle}>
        Your order has been placed successfully.{"\n"}
        For more details, go to my orders.
      </Text>
      <TrackMyOrder onPress={() => router.push('/orders')} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.backgroundColor, // Use the themed background color
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: '15%',
  },
  title: {
    fontSize: 25,
    fontWeight: '600',
    color: '#0f172a',
    marginVertical: '5%',
  },
  subtitle: {
    fontSize: 15,
    color: 'gray',
    textAlign: 'center',
    lineHeight: 20,
  },
});
