import { useLocalSearchParams } from 'expo-router';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BackButton from '@/components/BackButton';
import { useState } from 'react';
import { Colors } from '../constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import uuid from 'react-native-uuid';

import CoffeeTitleWithQuantity from '../components/order_details/quanity';
import ShotSelector from '@/components/order_details/shot';
import SelectTypeSelector from '@/components/order_details/type';
import SizeSelector from '@/components/order_details/size';
import IceSelector from '@/components/order_details/ice';
import TotalAmount from '@/components/order_details/totalprice';
import AddToCartButton from '@/components/order_details/addToCard';
import { useCart } from '../context/CartContext';

const { height, width } = Dimensions.get('window');

export default function CoffeeDetails() {
  const { addToCart } = useCart();
  const { name, image_url, price } = useLocalSearchParams();
  const [quantity, setQuantity] = useState(1);
  const [shot, setShot] = useState<'Single' | 'Double'>('Single');
  const [type, setType] = useState<'Hot' | 'Cold'>('Cold');
  const [size, setSize] = useState<'Small' | 'Medium' | 'Large'>('Medium');
  const [iceLevel, setIceLevel] = useState<1 | 2 | 3>(2);
  const parsedPrice = parseFloat(price as string);
  console.log('Parsed Price:', parsedPrice);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton color="black" size={24} />
        <Text style={styles.title}>Details</Text>
        <Pressable onPress={() => router.push('/my_cart')}>
          <Ionicons name="cart-outline" size={24} color={Colors.themedBlue}/>
        </Pressable>
        
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageWrapper}>
          <Image source={{ uri: image_url as string }} style={styles.image} />
        </View>

        <CoffeeTitleWithQuantity
          name={name as string}
          quantity={quantity}
          onIncrement={() => setQuantity(q => q + 1)}
          onDecrement={() => setQuantity(q => Math.max(1, q - 1))}
        />
        <View style={styles.divider} />

        <ShotSelector selected={shot} onSelect={setShot} />
        <View style={styles.divider} />

        <SelectTypeSelector selected={type} onSelect={setType} />
        <View style={styles.divider} />

        <SizeSelector selected={size} onSelect={setSize} />
        <View style={styles.divider} />

        <IceSelector selected={iceLevel} onSelect={setIceLevel} disabled={type === 'Hot'} />
      </ScrollView>

      <View style={styles.bottom}>
        <TotalAmount
          basePrice={parsedPrice}
          size={size}
          type={type}
          shot={shot}
          quantity={quantity}
        />
        <AddToCartButton
          onPress={() => {
            addToCart({
              id: uuid.v4().toString(), // Generate unique ID
              name: name as string,
              image_url: image_url as string,
              price: parsedPrice,
              type,
              size,
              shot,
              ice: iceLevel,
              quantity,
            });
            router.push('/my_cart'); // Then navigate
          }}
        />
      </View>
    </SafeAreaView>
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
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.themedBlue,
  },
  image: {
    width: '90%',
    height: 0.2 * Dimensions.get('window').height   ,
    resizeMode: 'contain',
    marginVertical: 20,
    backgroundColor: 'white',
    alignSelf: 'center',
  },
  imageWrapper: {
    width: 0.8 * width,
    height: 0.23 * Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    marginVertical: 0.02 * height,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  divider: {
    height: 1,
    backgroundColor: 'lightgray',
    marginVertical: '1%',
    marginHorizontal: '5%',
  },
  bottom: {
    marginTop: 'auto',
  },
});
