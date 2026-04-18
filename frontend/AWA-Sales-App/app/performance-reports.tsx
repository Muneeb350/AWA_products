import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function PerformanceReports() {
  const router = useRouter();
  
  const stats = [
    { label: 'Total Sales (Month)', value: '$12,450', color: '#3b82f6' },
    { label: 'New Customers', value: '28', color: '#8b5cf6' },
    { label: 'Cancelled Orders', value: '2', color: '#ef4444' }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={24} /></TouchableOpacity>
        <Text style={styles.title}>Performance</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView style={{ padding: 20 }}>
        {stats.map((s, i) => (
          <View key={i} style={[styles.card, { borderLeftColor: s.color }]}>
            <Text style={styles.cardLabel}>{s.label}</Text>
            <Text style={styles.cardValue}>{s.value}</Text>
          </View>
        ))}
        <TouchableOpacity style={styles.downloadBtn}>
          <Ionicons name="download-outline" size={20} color="#fff" />
          <Text style={styles.btnText}>Download PDF Report</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 18, fontWeight: 'bold' },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 15, marginBottom: 15, borderLeftWidth: 5, elevation: 2 },
  cardLabel: { color: '#64748b', fontSize: 14 },
  cardValue: { fontSize: 22, fontWeight: 'bold', marginTop: 5 },
  downloadBtn: { backgroundColor: '#1e293b', padding: 18, borderRadius: 12, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20 },
  btnText: { color: '#fff', fontWeight: 'bold', marginLeft: 10 }
});