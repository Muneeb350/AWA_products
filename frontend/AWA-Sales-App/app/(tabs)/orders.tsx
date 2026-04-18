import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; // Router import kiya

// Texas-based Cleaning Orders Demo Data
const ORDERS = [
  { id: 'ORD-5501', shop: 'Lonestar Convenience', date: '04/15/2026', total: '$245.00', status: 'Delivered' },
  { id: 'ORD-5502', shop: 'Big Tex Gas Station', date: '04/16/2026', total: '$1,120.50', status: 'Pending' },
  { id: 'ORD-5503', shop: 'Ranch Supply Co.', date: '04/16/2026', total: '$890.25', status: 'Shipped' },
  { id: 'ORD-5504', shop: 'Southwest Grocery', date: '04/17/2026', total: '$45.00', status: 'Cancelled' },
  { id: 'ORD-5505', shop: 'Austin Family Mart', date: '04/18/2026', total: '$310.00', status: 'Pending' },
];

export default function OrdersScreen() {
  const router = useRouter(); // Router initialize kiya
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return '#059669';
      case 'Pending': return '#f59e0b';
      case 'Shipped': return '#3b82f6';
      case 'Cancelled': return '#ef4444';
      default: return '#64748b';
    }
  };

  const renderOrder = ({ item }: { item: typeof ORDERS[0] }) => (
    <TouchableOpacity style={styles.orderCard} activeOpacity={0.7}>
      <View style={styles.orderHeader}>
        <View style={styles.orderIdBox}>
          <MaterialCommunityIcons name="clipboard-text-outline" size={20} color="#059669" />
          <Text style={styles.orderId}>{item.id}</Text>
        </View>
        <Text style={styles.orderDate}>{item.date}</Text>
      </View>

      <View style={styles.orderBody}>
        <Text style={styles.shopName}>{item.shop}</Text>
        <View style={styles.statusBadge}>
          <View style={[styles.statusDot, { backgroundColor: getStatusColor(item.status) }]} />
          <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>{item.status}</Text>
        </View>
      </View>

      <View style={styles.orderFooter}>
        <Text style={styles.totalLabel}>Order Total:</Text>
        <Text style={styles.totalValue}>{item.total}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Order History</Text>
        <Text style={styles.subTitle}>Recent bookings in Texas office</Text>
      </View>

      {/* Orders List */}
      <FlatList 
        data={ORDERS}
        renderItem={renderOrder}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listPadding}
        showsVerticalScrollIndicator={false}
      />

      {/* NEW ORDER FLOATING BUTTON (FAB) */}
      <TouchableOpacity 
        style={styles.fab} 
        activeOpacity={0.8}
        onPress={() => router.push('/new-order')} // New Order screen par le jayega
      >
        <Ionicons name="add" size={32} color="#fff" />
        <Text style={styles.fabText}>New</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { backgroundColor: '#fff', paddingHorizontal: 20, paddingTop: 60, paddingBottom: 25, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 3 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#1e293b' },
  subTitle: { fontSize: 14, color: '#94a3b8', marginTop: 5 },
  listPadding: { padding: 15, paddingBottom: 100 },
  orderCard: { backgroundColor: '#fff', padding: 15, borderRadius: 15, marginBottom: 15, elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2 },
  orderHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#f1f5f9', paddingBottom: 10, marginBottom: 10 },
  orderIdBox: { flexDirection: 'row', alignItems: 'center' },
  orderId: { fontSize: 14, fontWeight: '700', color: '#334155', marginLeft: 5 },
  orderDate: { fontSize: 13, color: '#94a3b8' },
  orderBody: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  shopName: { fontSize: 16, fontWeight: 'bold', color: '#1e293b', flex: 1 },
  statusBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f8fafc', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20 },
  statusDot: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
  statusText: { fontSize: 12, fontWeight: '600' },
  orderFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, borderTopWidth: 1, borderTopColor: '#f1f5f9' },
  totalLabel: { fontSize: 14, color: '#64748b' },
  totalValue: { fontSize: 18, fontWeight: 'bold', color: '#059669' },
  
  // Floating Action Button Styles
  fab: { 
    position: 'absolute', 
    bottom: 20, 
    right: 20, 
    backgroundColor: '#059669', 
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 30, 
    flexDirection: 'row',
    alignItems: 'center', 
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5
  },
  fabText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 5
  }
});