import React from 'react';
import { View, Text, Image, StyleSheet, Animated, Dimensions } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';
import { useCart } from '@/context/CartContext';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

type Props = {
  item: {
    id: string;
    name: string;
    image_url: string;
    price: number;
    quantity: number;
    size: 'Small' | 'Medium' | 'Large';
    shot: 'Single' | 'Double';
    type: 'Hot' | 'Cold';
    ice: 1 | 2 | 3;
  };
};

const { height, width } = Dimensions.get('window');


export default function CartItem({ item }: Props) {
  const { removeFromCart, calculateItemPrice } = useCart();

  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>
  ) => {
    return (
      <RectButton style={styles.deleteWrapper} onPress={() => removeFromCart(item.id)}>
        <View style={styles.deleteButton}>
          <Ionicons name="trash-outline" size={24} color="#ff3b30" />
        </View>
      </RectButton>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <Image source={{ uri: item.image_url }} style={styles.image} />
          <View style={styles.details}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.subtext}>
              {`${item.shot.toLowerCase()} | ${item.type.toLowerCase()} | ${item.size.toLowerCase()} ${
                item.type === 'Cold'
                  ?  item.ice === 1
                    ? '| light ice'
                    : item.ice === 2
                    ? '| medium ice'
                    : '| full ice'
                  : ''
              }`}
            </Text>
            <Text style={styles.quantity}>x {item.quantity}</Text>
          </View>
          <Text style={styles.price}>${calculateItemPrice(item).toFixed(1)}</Text>
        </View>
      </View>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 0.02 * width,
    paddingBottom: 0.02 * height,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.tabBarColor,
    borderRadius: 16,
    padding: 12,
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginRight: 12,
  },
  details: {
    flex: 1,
    gap: 4,
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1f1f1f',
  },
  subtext: {
    fontSize: 12,
    color: '#888',
  },
  quantity: {
    fontSize: 12,
    color: '#555',
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1f1f1f',
  },
  deleteWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffecec',
    borderRadius: 16,
    width: '17%',
    marginBottom: 0.02 * height,
  },
  deleteButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
