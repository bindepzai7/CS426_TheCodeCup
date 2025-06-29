import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, ActivityIndicator } from 'react-native';
import { Colors } from '../../constants/Colors';
import { router } from 'expo-router';
import CoffeeItem from './coffeeItem';
import { supabase } from '../../lib/supabase';

const { width, height } = Dimensions.get('window');

type Coffee = {
  id: number;
  created_at: string;
  name: string;
  image_url: string;
  price: number;
};

export default function CoffeeMenuCard() {
  const [coffeeList, setCoffeeList] = useState<Coffee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCoffees() {
      try {
        const { data, error } = await supabase.from('Coffee').select('*');
        if (error) throw error;
        setCoffeeList(data);
      } catch (err) {
        console.error('Error fetching coffee data:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchCoffees();
  }, []);

  return (
    <View style={styles.background}>
      <View style={styles.card}>
        <Text style={styles.text}>Choose your coffee</Text>
        <View style={styles.coffeeList}>
          {loading ? (
            <ActivityIndicator size="large" color="white" />
          ) : (
            <FlatList
              data={coffeeList}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <CoffeeItem
                  name={item.name}
                  image_url={item.image_url}
                  onPress={() =>
                    router.push({
                      pathname: '/details',
                      params: { name: item.name, image_url: item.image_url, price: item.price },
                    })
                  }
                />
              )}
              numColumns={2}
              contentContainerStyle={{ alignItems: 'center' }}
            />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 0.03 * width,
    height: 0.6 * height,
  },
  text: {
    color: 'lightgray',
    marginTop: '5%',
    marginLeft: '7%',
    marginBottom: '3%',
    fontSize: 18,
  },
  coffeeList: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: '5%',
  },
  background: {
    backgroundColor: Colors.themedBlue,
    width: '100%',
    height: height,
    borderRadius: 0.07 * width,
  },
});
