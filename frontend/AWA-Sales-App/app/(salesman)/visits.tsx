import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AREAS = ['All', 'Dallas', 'Austin', 'Houston', 'San Antonio'];

const VISIT_HISTORY = [
  { id: '1', shop: 'Lone Star Warehouses', area: 'Dallas', status: 'Completed', time: '09:00 AM', type: 'Order Taken' },
  { id: '2', shop: 'Austin BBQ Grills', area: 'Austin', status: 'Completed', time: '11:30 AM', type: 'Catalog Shown' },
  { id: '3', shop: 'Houston Refineries', area: 'Houston', status: 'Pending', time: '02:00 PM', type: '-' },
  { id: '4', shop: 'Alamo Cleaning Co', area: 'San Antonio', status: 'Completed', time: '04:15 PM', type: 'Follow Up' },
];

export default function VisitsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  // Logic: Search aur Filter dono ko ek sath apply karna
  const filteredVisits = VISIT_HISTORY.filter(item => {
    const matchesSearch = item.shop.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'All' || item.area === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <View style={styles.container}>
      
      {/* 1. Search Bar Section */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#64748b" style={styles.searchIcon} />
        <TextInput 
          style={styles.searchInput}
          placeholder="Search shops..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={18} color="#94a3b8" />
          </TouchableOpacity>
        )}
      </View>

      {/* 2. Horizontal Area Filters */}
      <View style={{ marginBottom: 15 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterList}>
          {AREAS.map((area) => (
            <TouchableOpacity 
              key={area}
              onPress={() => setActiveFilter(area)}
              style={[styles.filterChip, activeFilter === area && styles.filterChipActive]}
            >
              <Text style={[styles.filterText, activeFilter === area && styles.filterTextActive]}>
                {area}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* 3. Visits List */}
      <FlatList
        data={filteredVisits}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.info}>
              <Text style={styles.shopName}>{item.shop}</Text>
              <View style={styles.metaRow}>
                <Text style={styles.areaTag}>{item.area}</Text>
                <Text style={styles.details}> • {item.type} • {item.time}</Text>
              </View>
            </View>
            <View style={[styles.badge, item.status === 'Completed' ? styles.bgGreen : styles.bgSlate]}>
              <Text style={styles.badgeText}>{item.status}</Text>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={{ color: '#94a3b8' }}>Bhai, is area mein koi visit nahi mili!</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc', padding: 20 },
  
  // Search Styles
  searchContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#fff', 
    borderRadius: 15, 
    paddingHorizontal: 15, 
    height: 50, 
    borderWidth: 1, 
    borderColor: '#e2e8f0',
    marginBottom: 15
  },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, fontSize: 16, color: '#1e293b' },

  // Filter Styles
  filterList: { paddingRight: 20 },
  filterChip: { 
    paddingHorizontal: 16, 
    paddingVertical: 8, 
    borderRadius: 20, 
    backgroundColor: '#fff', 
    borderWidth: 1, 
    borderColor: '#e2e8f0', 
    marginRight: 8 
  },
  filterChipActive: { backgroundColor: '#1e293b', borderColor: '#1e293b' },
  filterText: { fontSize: 13, fontWeight: '700', color: '#64748b' },
  filterTextActive: { color: '#fff' },

  // List Card Styles
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, elevation: 1 },
  info: { flex: 1 },
  shopName: { fontSize: 16, fontWeight: '700', color: '#1e293b' },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  areaTag: { fontSize: 11, fontWeight: 'bold', color: '#059669', backgroundColor: '#ecfdf5', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  details: { fontSize: 12, color: '#64748b' },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  bgGreen: { backgroundColor: '#d1fae5' },
  bgSlate: { backgroundColor: '#f1f5f9' },
  badgeText: { fontSize: 10, fontWeight: 'bold', color: '#059669' },
  emptyState: { alignItems: 'center', marginTop: 50 }
});