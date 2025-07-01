import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import HistoryItem from './HistoryItem';
import { Colors } from '@/constants/Colors';

export type Order = {
  id: number;
  created_at: string;
  coffee_name: string;
  address: string;
  price: number;
  delivery_time: string;
};

export default function HistoryList() {
  const { profile } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

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
            return deliveryTime < now;
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
    <View style={styles.container}>
      {loading ? (
              <Text style={styles.loading}>Loading...</Text>
            ) :
      orders.length === 0 ? (
        <Text style={styles.emptyText}>No past orders available.</Text>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <HistoryItem 
            coffeeName={item.coffee_name}
            address={item.address}
            price={item.price}
            time={new Date(item.created_at).toLocaleString('en-GB', {
                day: '2-digit',
                month: 'short',
                hour: '2-digit',
                minute: '2-digit',
              })}
          />}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '5%',
  },
  separator: {
    height: 1,
    backgroundColor: 'lightgray',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: 'gray',
  },
  loading: {
    textAlign: 'center',
    marginTop: 20,
    color: Colors.themedBlue,
  },
});
