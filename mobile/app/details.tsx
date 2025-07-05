import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  Pressable,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BackButton from '@/components/BackButton';
import { Colors } from '../constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import uuid from 'react-native-uuid';
import { useCart } from '../context/CartContext';
import { useAuth } from '@/context/AuthContext';

import CoffeeTitleWithQuantity from '../components/order_details/quanity';
import ShotSelector from '@/components/order_details/shot';
import SelectTypeSelector from '@/components/order_details/type';
import SizeSelector from '@/components/order_details/size';
import IceSelector from '@/components/order_details/ice';
import TotalAmount from '@/components/order_details/totalprice';
import AddToCartButton from '@/components/order_details/addToCard';

const { height, width } = Dimensions.get('window');

export default function CoffeeDetails() {
  const { addToCart } = useCart();
  const { profile } = useAuth(); // check authentication
  const { name, image_url, price } = useLocalSearchParams();
  const [quantity, setQuantity] = useState(1);
  const [shot, setShot] = useState<'Single' | 'Double'>('Single');
  const [type, setType] = useState<'Hot' | 'Cold'>('Cold');
  const [size, setSize] = useState<'Small' | 'Medium' | 'Large'>('Medium');
  const [iceLevel, setIceLevel] = useState<1 | 2 | 3>(2);
  const parsedPrice = parseFloat(price as string);

  const [authModalVisible, setAuthModalVisible] = useState(false);

  const handleAddToCart = () => {
    if (!profile) {
      setAuthModalVisible(true);
      return;
    }

    addToCart({
      id: uuid.v4().toString(),
      name: name as string,
      image_url: image_url as string,
      price: parsedPrice,
      type,
      size,
      shot,
      ice: iceLevel,
      quantity,
    });

    router.push('/my_cart');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton color="black" size={24} />
        <Text style={styles.title}>Details</Text>
        <Pressable onPress={() => router.push('/my_cart')}>
          <Ionicons name="cart-outline" size={24} color={Colors.themedBlue} />
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
        <AddToCartButton onPress={handleAddToCart} />
      </View>

      {/* 🚨 Modal for unauthenticated users */}
      <Modal visible={authModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalText}>
              You need to be signed in to add items to your cart.
            </Text>
            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.modalBtn, { backgroundColor: Colors.themedBlue }]}
                onPress={() => {
                  setAuthModalVisible(false);
                  router.push('/login');
                }}
              >
                <Text style={styles.modalBtnText}>Sign In</Text>
              </Pressable>
              <Pressable
                style={[styles.modalBtn, { backgroundColor: '#ccc' }]}
                onPress={() => setAuthModalVisible(false)}
              >
                <Text style={[styles.modalBtnText, { color: 'black' }]}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
    height: 0.2 * height,
    resizeMode: 'contain',
    marginVertical: 20,
    backgroundColor: 'white',
    alignSelf: 'center',
  },
  imageWrapper: {
    width: 0.8 * width,
    height: 0.23 * height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    marginVertical: 0.02 * height,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
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

  // 🔽 Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: 'white',
    width: '80%',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    color: Colors.themedBlue,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 16,
  },
  modalBtn: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  modalBtnText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
