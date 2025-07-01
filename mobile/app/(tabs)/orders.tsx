import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
} from 'react-native';
import BackButton from '@/components/BackButton';
import { Colors } from '../../constants/Colors';
import { useAuth } from '@/context/AuthContext'; 
import { supabase } from '@/lib/supabase';
import HistoryList from '@/components/my_orders/HistoryList';
import OngoingList from '@/components/my_orders/OngoingList';

const { width } = Dimensions.get('window');

export default function MyOrderScreen() {
  const [activeTab, setActiveTab] = useState<'On going' | 'History'>('On going');
  const { profile } = useAuth();
  const userId = profile?.id;

  // Fetch orders based on userId
  const fetchOrders = async () => {
    if (!userId) return;
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId);
    if (error) {
      console.error('Error fetching orders:', error);
      return [];
    }
    return data;
  }

  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Order</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.tabContainer}>
        {['On going', 'History'].map((tab) => (
          <Pressable
            key={tab}
            style={styles.tab}
            onPress={() => setActiveTab(tab as 'On going' | 'History')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
            {activeTab === tab && <View style={styles.tabIndicator} />}
          </Pressable>
        ))}
      </View>

      {/* Content */}
      <View style={styles.content}>
        {activeTab === 'On going' ? (
          <OngoingList />
        ) : (
          <HistoryList />
        )}
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
    justifyContent: 'center',
    paddingBottom: '10%',
  },
  title: {
    fontSize: 23,
    fontWeight: '600',
    color: Colors.themedBlue,
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  tab: {
    flex: 1, 
    alignItems: 'center',
  },
  tabText: {
    fontSize: 20,
    color: '#c5c5c5',
    fontWeight: '500',
  },
  activeTabText: {
    color: Colors.themedBlue,
  },
  tabIndicator: {
    marginTop: '7%',
    width: '65%',
    height: 2,
    borderRadius: 2,
    backgroundColor: Colors.themedBlue,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  placeholder: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 40,
  },
});
