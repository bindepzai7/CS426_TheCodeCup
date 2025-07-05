import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, ActivityIndicator, Alert } from 'react-native';
import { Colors } from '../../constants/Colors';
import { supabase } from '@/lib/supabase';
import RedeemItem from './RedeemItem';
import { useAuth } from '@/context/AuthContext';
import InsufficientPointsModal from './InsufficientPointsModal';
import ConfirmModal from './ConfirmModal';

type Redeem = {
  id: number;
  name: string;
  image_url: string;
  due_date: string;
  points: number;
};

const { width } = Dimensions.get('window');

export default function RedeemList() {
  const [redeemList, setRedeemList] = useState<Redeem[]>([]);
  const [loading, setLoading] = useState(true);
    const { profile, removePoints } = useAuth();
  const userPoints = profile?.reward_points ?? 0;
  const [showInsufficientModal, setShowInsufficientModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Redeem | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  

  useEffect(() => {
    async function fetchRedeems() {
        try {
            const { data, error } = await supabase.from('redeems').select('*');
            if (error) throw error;
            setRedeemList(data);
        } catch (err) {
            console.error('Error fetching redeem data:', err);
        }
        finally {
            setLoading(false);
        }
    }

    fetchRedeems();
  }, []);

  const handleRedeem = (item: Redeem) => {
    if (userPoints < item.points) {
        setSelectedItem(item);
        setShowInsufficientModal(true);
    }
    else {
        setSelectedItem(item);
        setShowConfirmModal(true);
    }
  }


  return (
    <View style={styles.container}>
        <View style={styles.listContainer}>
            {loading ? (
                <ActivityIndicator size="large" color={Colors.themedBlue} />    
            ) : (
                <FlatList
                    data={redeemList}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <RedeemItem
                            name={item.name}
                            image_url={item.image_url}
                            dueDate={item.due_date}
                            points={item.points}
                            onPress={() => handleRedeem(item)}
                        />
                    )}
                    contentContainerStyle={styles.list}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                    ListEmptyComponent={() => (
                        <Text style={styles.emptyText}>No rewards available</Text>
                    )}
                    ListFooterComponent={() => (
                        <View style={styles.footer}>
                            <Text style={styles.footerText}>End of rewards list</Text>
                        </View>
                    )}
                />
            )}
        </View>
        <InsufficientPointsModal
            visible={showInsufficientModal}
            itemName={selectedItem?.name || ''}
            requiredPoints={selectedItem?.points || 0}
            userPoints={userPoints}
            onClose={() => setShowInsufficientModal(false)}
        />
        <ConfirmModal
            visible={showConfirmModal}
            itemName={selectedItem?.name || ''}
            points={selectedItem?.points || 0}
            onCancel={() => setShowConfirmModal(false)}
            onConfirm={() => {
                setShowConfirmModal(false);
                removePoints(selectedItem?.points || 0);
            }}
        />


    </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundColor,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.themedBlue,
        marginBottom: 16,
    },
    listContainer: {
        flex: 1,
        backgroundColor: Colors.backgroundColor,
    },
    list: {
        paddingBottom: 16,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.tabBarColor,
        borderRadius: 8,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 8,
    },
    textContainer: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.themedBlue,
    },
    date: {
        color: Colors.themedBlue,
        fontSize: 12,
        marginTop: 4,
    },
    button: {
        backgroundColor: Colors.themedBlue,
        borderRadius: 20,
        paddingVertical: 6,
        paddingHorizontal: 16,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    separator: {
        height: 1,
        backgroundColor: 'lightgray',
        marginVertical: 8,
        marginHorizontal: 16,
    },
    emptyText: {
        textAlign: 'center',
        color: 'gray',
        fontSize: 16,
        marginTop: 20,
    },
    footer: {
        padding: 16,    
        alignItems: 'center',
        justifyContent: 'center',
    },
    footerText: {
        color: 'gray',
        fontSize: 14,
    },
});


