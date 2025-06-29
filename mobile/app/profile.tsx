import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BackButton from '@/components/BackButton';
import ProfileInfoRow from '@/components/profile/ProfileInfoRow';
import { Colors } from '../constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
const { width } = Dimensions.get('window');

export default function CoffeeDetails() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton color="black" size={24} />
        <Text style={styles.title}>Profile</Text>
        <View style={{ width: 24 }}/>
      </View>
      <ProfileInfoRow
        icon="person-outline"
        label="Full name"
        value="bin Dep Zai"
        onEdit={() => {}}
      />
      <ProfileInfoRow
        icon="call-outline"
        label="Phone number"
        value="+60134589525"
        onEdit={() => {}}
      />
      <ProfileInfoRow
        icon="mail-outline"
        label="Email"
        value="bindepzai@email.com"
        onEdit={() => {}}
      />
      <ProfileInfoRow
        icon="location-outline"
        label="Address"
        value="3 Addersion Court Chino Hills, HO56824, United State"
        onEdit={() => {}}
      />
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
