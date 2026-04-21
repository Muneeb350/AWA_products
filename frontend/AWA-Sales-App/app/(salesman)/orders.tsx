import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Mock Data: Sirf Reference Sales Tracking
const REFERRAL_ORDERS = [
  { id: 'AWA-8821', shop: 'Lone Star Warehouses', total: '4,500', date: '21 April, 2026', status: 'Delivered' },
  { id: 'AWA-8845', shop: 'Austin BBQ Grills', total: '1,200', date: '20 April, 2026', status: 'Processing' },
  { id: 'AWA-8790', shop: 'Dallas Pro Clean', total: '8,900', date: '18 April, 2026', status: 'Shipped' },
  { id: 'AWA-8655', shop: 'Houston Refineries', total: '15,000', date: '15 April, 2026', status: 'Pending' },
];

export default function OrdersScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = REFERRAL_ORDERS.filter(o => 
    o.shop.toLowerCase().includes(searchQuery.toLowerCase()) || 
    o.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Delivered': return { bg: '#d1fae5', text: '#065f46' };
      case 'Shipped': return { bg: '#e0f2fe', text: '#0369a1' };
      case 'Processing': return { bg: '#fef3c7', text: '#92400e' };
      case 'Pending': return { bg: '#f1f5f9', text: '#475569' };
      default: return { bg: '#f1f5f9', text: '#475569' };
    }
  };

  return (
    <View style={styles.container}>
      {/* 1. Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>Reference Orders</Text>
        <Text style={styles.subTitle}>Orders linked to your Sales ID: <Text style={styles.refHighlight}>TX-99</Text></Text>
      </View>

      {/* 2. Search Bar */}
      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color="#94a3b8" />
          <TextInput 
            style={styles.input}
            placeholder="Search by Shop or Order ID..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* 3. Orders List */}
      <FlatList
        data={filteredOrders}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 20 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const statusStyle = getStatusStyle(item.status);
          return (
            <View style={styles.orderCard}>
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.orderId}>{item.id}</Text>
                  <Text style={styles.shopName}>{item.shop}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
                  <Text style={[styles.statusText, { color: statusStyle.text }]}>{item.status}</Text>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.cardFooter}>
                <View style={styles.footerItem}>
                  <Ionicons name="calendar-outline" size={16} color="#64748b" />
                  <Text style={styles.footerText}>{item.date}</Text>
                </View>
                <View style={styles.priceContainer}>
                  <Text style={styles.priceLabel}>Order Value:</Text>
                  <Text style={styles.priceValue}>${item.total}</Text>
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { padding: 25, backgroundColor: '#fff', paddingTop: 60, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  title: { fontSize: 24, fontWeight: '900', color: '#1e293b' },
  subTitle: { fontSize: 13, color: '#64748b', marginTop: 4 },
  refHighlight: { color: '#059669', fontWeight: 'bold' },

  searchSection: { paddingHorizontal: 20, marginTop: 15 },
  searchBar: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#fff', 
    paddingHorizontal: 15, 
    height: 52, 
    borderRadius: 12, 
    borderWidth: 1, 
    borderColor: '#e2e8f0' 
  },
  input: { flex: 1, marginLeft: 10, fontSize: 15, color: '#1e293b' },

  orderCard: { backgroundColor: '#fff', borderRadius: 18, marginBottom: 15, padding: 18, borderWidth: 1, borderColor: '#e2e8f0', elevation: 2, shadowColor: '#000', shadowOpacity: 0.05 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  orderId: { fontSize: 11, fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase' },
  shopName: { fontSize: 17, fontWeight: '800', color: '#1e293b', marginTop: 2 },
  
  statusBadge: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8 },
  statusText: { fontSize: 11, fontWeight: 'bold', textTransform: 'uppercase' },

  divider: { height: 1, backgroundColor: '#f1f5f9', marginVertical: 15 },
  
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  footerItem: { flexDirection: 'row', alignItems: 'center' },
  footerText: { fontSize: 13, color: '#64748b', marginLeft: 6, fontWeight: '500' },
  
  priceContainer: { alignItems: 'flex-end' },
  priceLabel: { fontSize: 10, color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase' },
  priceValue: { fontSize: 18, fontWeight: '900', color: '#1e293b' }
});