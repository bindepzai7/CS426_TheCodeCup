import React from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  Dimensions,
  Text,
  SafeAreaView,
  Platform
} from 'react-native';
import RewardHistoryItem from './RewardHistoryItem';
import { Colors } from '../../constants/Colors';
const { useAuth } = require('@/context/AuthContext');
const { useCart } = require('@/context/CartContext');
import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';


const { width } = Dimensions.get('window');

export type Order = {
  id: number;
  created_at: string;
  coffee_name: string;
  address: string;
  price: number;
  delivery_time: string;
};

export default function RewardHistoryList() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const { profile } = useAuth();
    const { PointsAddedPerItem} = useCart();
  
    useEffect(() => {
      const fetchOrders = async () => {
        if (!profile) return;
        try {
          const { data, error } = await supabase
            .from('orders')
            .select('*')
            .eq('user_id', profile.id)
            .order('created_at', { ascending: false });
  
          if (error) throw error;
  
          const now = new Date();
          const ongoingOrders = (data as Order[]).filter((order) => {
            const orderTime = new Date(order.created_at);
            const deliveryTime = new Date(order.delivery_time);
            return deliveryTime > now;
          });
  
          setOrders(ongoingOrders);
        } catch (err) {
          console.error('Failed to fetch orders:', err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchOrders();
    }, [profile]);
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Reward History</Text>
        <FlatList
          data={orders}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <RewardHistoryItem
              name={item.coffee_name}
              date={item.delivery_time}
              points={item.price * 12}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80 }}
          ListEmptyComponent={
            <Text style={{ textAlign: 'center', color: 'lightgray' }}>
              No reward history available.
            </Text>
          }
          ItemSeparatorComponent={() => (
            <View style={styles.separator} />
          )}
          ListFooterComponent={() => (
                                  <View style={styles.footer}>
                                      <Text style={styles.footerText}>End of history list</Text>
                                  </View>
                              )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  container: {
    flex: 1,
    width: width * 0.7,
    paddingVertical: '5%',
    paddingHorizontal: '1%',
    alignSelf: 'center',
  },
  title: {
    fontSize: 17,
    color: Colors.themedBlue,
    marginBottom: 16,
  },
  separator: {
    height: 1,
    backgroundColor: 'lightgray',
  },
    footer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    fontSize: 14,
    color: 'gray',
    fontStyle: 'italic',
  },
});
