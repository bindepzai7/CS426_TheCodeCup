import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { Dimensions, View } from 'react-native';
import { Colors } from '../../constants/Colors';

const { width, height } = Dimensions.get('window');

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.themedBlue,
        tabBarInactiveTintColor: 'lightgray',
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          flex: 1,
          position: 'absolute',
          backgroundColor: Colors.tabBarColor,
          borderRadius: 0.07 * width,
          marginHorizontal: 0.08 * width,
          marginVertical: 0.03 * height,
          height: 0.07 * height,
          elevation: 10,
          shadowColor: 'black',
          shadowOpacity: 0.15,
          shadowRadius: 0.05 * height,
        },
        tabBarIconStyle: {
          height: '100%',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <FontAwesome name="home" size={28} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="rewards"
        options={{
          tabBarIcon: ({ color }) => (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <FontAwesome name="gift" size={28} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          tabBarIcon: ({ color }) => (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <FontAwesome name="shopping-cart" size={28} color={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
