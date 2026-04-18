import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function TargetHistory() {
  const router = useRouter();
  const data = [
    { month: 'March 2026', achieved: '95%', status: 'Excellent' },
    { month: 'February 2026', achieved: '82%', status: 'Good' },
    { month: 'January 2026', achieved: '60%', status: 'Below Average' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={24} /></TouchableOpacity>
        <Text style={styles.title}>Target History</Text>
        <View style={{ width: 24 }} />
      </View>
      <FlatList 
        data={data}
        contentContainerStyle={{ padding: 20 }}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View>
              <Text style={styles.monthText}>{item.month}</Text>
              <Text style={styles.statusText}>{item.status}</Text>
            </View>
            <Text style={styles.achievedText}>{item.achieved}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 18, fontWeight: 'bold' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', padding: 20, borderRadius: 15, marginBottom: 10 },
  monthText: { fontWeight: 'bold', fontSize: 16 },
  statusText: { color: '#64748b', fontSize: 12 },
  achievedText: { color: '#059669', fontWeight: 'bold', fontSize: 18 }
});