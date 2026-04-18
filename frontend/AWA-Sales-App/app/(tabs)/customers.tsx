import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Texas-based Cleaning Supply Clients
const CUSTOMERS = [
  { id: '1', name: 'Lonestar Convenience Store', owner: 'John Miller', area: 'Downtown Houston, TX', balance: '$150.00' },
  { id: '2', name: 'Austin Family Mart', owner: 'Sarah Williams', area: 'Sixth Street, Austin', balance: '$0.00' },
  { id: '3', name: 'Big Tex Gas Station', owner: 'Robert Davis', area: 'Deep Ellum, Dallas', balance: '$1,240.50' },
  { id: '4', name: 'Southwest Grocery', owner: 'Michael Brown', area: 'Alamo Heights, San Antonio', balance: '$45.00' },
  { id: '5', name: 'Ranch Supply Co.', owner: 'David Wilson', area: 'Fort Worth Stockyards', balance: '$890.25' },
];

export default function CustomersScreen() {
  const [search, setSearch] = useState('');

  const renderCustomer = ({ item }: { item: typeof CUSTOMERS[0] }) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.7}>
      <View style={styles.customerIcon}>
        <Ionicons name="business" size={24} color="#059669" />
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.shopName}>{item.name}</Text>
        <Text style={styles.ownerName}>{item.owner} • {item.area}</Text>
      </View>

      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Outstanding</Text>
        <Text style={[styles.balanceValue, { color: item.balance === '$0.00' ? '#94a3b8' : '#ef4444' }]}>
          {item.balance}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Search Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Customer Directory</Text>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#94a3b8" />
          <TextInput 
            placeholder="Search stores or owners..." 
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
            placeholderTextColor="#94a3b8"
          />
        </View>
      </View>

      {/* Shop List */}
      <FlatList 
        data={CUSTOMERS.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.owner.toLowerCase().includes(search.toLowerCase()))}
        renderItem={renderCustomer}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listPadding}
        showsVerticalScrollIndicator={false}
      />

      {/* Add New Customer Button */}
      <TouchableOpacity style={styles.fab}>
        <Ionicons name="person-add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { backgroundColor: '#fff', paddingHorizontal: 20, paddingTop: 60, paddingBottom: 20, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 3 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#1e293b', marginBottom: 15 },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f1f5f9', paddingHorizontal: 15, borderRadius: 12, height: 50 },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 16, color: '#1e293b' },
  listPadding: { padding: 15, paddingBottom: 100 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 15, borderRadius: 15, marginBottom: 12, elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2 },
  customerIcon: { width: 50, height: 50, borderRadius: 12, backgroundColor: '#f0fdf4', justifyContent: 'center', alignItems: 'center' },
  infoContainer: { flex: 1, marginLeft: 15 },
  shopName: { fontSize: 16, fontWeight: 'bold', color: '#334155' },
  ownerName: { fontSize: 13, color: '#94a3b8', marginTop: 2 },
  balanceContainer: { alignItems: 'flex-end' },
  balanceLabel: { fontSize: 10, color: '#94a3b8', textTransform: 'uppercase', fontWeight: 'bold' },
  balanceValue: { fontSize: 14, fontWeight: '700', marginTop: 2 },
  fab: { position: 'absolute', bottom: 30, right: 20, backgroundColor: '#059669', width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', elevation: 5, shadowColor: '#059669', shadowOpacity: 0.4, shadowRadius: 6 }
});