import { FlatList, StyleSheet, View, Text } from 'react-native';
import BackButton from '@/components/BackButton';
import CartItem from '@/components/order_cart/CartItem';
import CheckoutButton from '@/components/order_cart/CheckoutButton';
import TotalPrice from '@/components/order_cart/TotalPrice';
import { Colors } from '../constants/Colors';
import { useCart } from '../context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { router } from 'expo-router';
import { supabase } from '@/lib/supabase';

export default function MyOrderScreen() {
  const { cart, totalPrice, clearCart, calculateItemPrice, totalPoints } = useCart();
  const { profile, incrementLoyaltyLevel, addPoints } = useAuth();

  const handleCheckout = async () => {
    if (!profile) {
      router.push('/login');
      return;
    }

    const deliveryTime = new Date(Date.now() + 30 * 60 * 1000).toISOString();

    const orderData = cart.map((item) => ({
      user_id: profile.id,
      coffee_name: item.name,
      address: profile.address ?? 'N/A',
      price: calculateItemPrice(item),
      quantity: item.quantity ?? 1,
      delivery_time: deliveryTime,
    }));
    const { error } = await supabase.from('orders').insert(orderData);

    if (error) {
      console.error('Error placing order:', error.message);
      return;
    }
    await addPoints(Math.round(totalPoints));
    incrementLoyaltyLevel();
    clearCart();
    console.log('Order placed successfully');
    router.push('/order_success');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton />
      </View>
      <Text style={styles.title}>My Cart</Text>

      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CartItem item={item} />}
        contentContainerStyle={{ paddingBottom: '20%' }}
      />
      <View style={styles.checkoutContainer}>
        <TotalPrice value={totalPrice} />
        <CheckoutButton onPress={handleCheckout} />
      </View>
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
    paddingTop: '5%',
    paddingHorizontal: '5%',
    gap: 16,
  },
  title: {
    fontSize: 30,
    color: Colors.themedBlue,
    fontWeight: '600',
    paddingHorizontal: '8%',
    paddingVertical: '2%',
  },
  checkoutContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: '10%',
    paddingBottom: '7%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: '5%',
    backgroundColor: Colors.backgroundColor,
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.themedBlue,
  },
});
