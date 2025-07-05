import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LoyaltyCard from '../../components/home/loyaltyCard';
import CoffeeMenuCard from '../../components/home/coffeeCard';
import { Colors } from '../../constants/Colors';
import { router } from 'expo-router';
import { useAuth } from '@/context/AuthContext';


export default function App() {
  const { profile } = useAuth();
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <View style={styles.greetingContainer}>
          <Text style={styles.greeting}>Good morning</Text>
          <Text style={styles.username}>
            {profile?.full_name || 'User'}
          </Text>
        </View>

        <View style={styles.iconRow}>
          <Pressable onPress={() => router.push('/my_cart')}>
            <Ionicons name="cart-outline" size={30} color={Colors.themedBlue} style={styles.icon} />
          </Pressable>
          <Pressable onPress={() => router.push('/profile')}>
            <Ionicons name="person-circle-outline" size={30} color={Colors.themedBlue} />
          </Pressable>
        </View>
      </View>

      <LoyaltyCard/>
      <CoffeeMenuCard />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '5%',
    paddingVertical: '5%',
  },

  greetingContainer: {
    flexDirection: 'column',
  },

  greeting: {
    fontSize: 16,
    color: 'lightgray',
  },

  username: {
    fontSize: 22,
    fontWeight: '600',
    color: Colors.themedBlue,
  },

  iconRow: {
    flexDirection: 'row',
    gap: 16,
  },

  icon: {
    marginLeft: 10,
  },

});
