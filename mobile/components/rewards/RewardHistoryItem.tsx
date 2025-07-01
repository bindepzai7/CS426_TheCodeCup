import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

type RewardHistoryItemProps = {
  name: string;
  date: string;
  points: number;
};

export default function RewardHistoryItem({ name, date, points }: RewardHistoryItemProps) {
  const dateObj = new Date(date);
  const date1 = `${dateObj.getDate()} ${dateObj.toLocaleString('default', { month: 'long' })} | ${dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.date}>{date1}</Text>
      </View>
      <Text style={styles.points}>+ {Math.round(points)} Pts</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.themedBlue
    },
  date: {
    fontSize: 13,
    color: '#999',
    marginTop: 2,
  },
  points: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.themedBlue,
  },
});
