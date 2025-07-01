import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BackButton from '@/components/BackButton';
import { Colors } from '../constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
const { width } = Dimensions.get('window');
import RedeemList from '../components/redeem/RedeemList';

export default function CoffeeDetails() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton color="black" size={24} />
        <Text style={styles.title}>Redeem</Text>
        <View style={{ width: 24 }} /> 
      </View>
      <RedeemList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '5%',
    backgroundColor: Colors.backgroundColor, // Use the themed background color
  },
  header: {
    paddingVertical: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', 
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.themedBlue,
    textAlign: 'center',
    flex: 1,
  },
});
