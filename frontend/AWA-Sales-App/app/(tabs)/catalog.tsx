import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Texas Cleaning Supplies Data
const PRODUCTS = [
  { id: '1', name: 'Ultra-Shine Glass Cleaner', category: 'Chemicals', price: '$24.99', stock: '45 Units', sku: 'CL-001' },
  { id: '2', name: 'Heavy Duty Degreaser (5G)', category: 'Industrial', price: '$89.00', stock: '12 Units', sku: 'CL-002' },
  { id: '3', name: 'Microfiber Towel Pack (12pcs)', category: 'Tools', price: '$15.50', stock: '120 Units', sku: 'TL-098' },
  { id: '4', name: 'Citrus All-Purpose Cleaner', category: 'Chemicals', price: '$32.00', stock: '30 Units', sku: 'CL-005' },
  { id: '5', name: 'Industrial Floor Buffer Mop', category: 'Equipment', price: '$145.00', stock: '5 Units', sku: 'EQ-044' },
  { id: '6', name: 'Bio-Safe Disinfectant Spray', category: 'Chemicals', price: '$19.95', stock: '85 Units', sku: 'CL-012' },
];

export default function CatalogScreen() {
  const [search, setSearch] = useState('');

  const renderProduct = ({ item }: { item: typeof PRODUCTS[0] }) => (
    <View style={styles.productCard}>
      <View style={styles.imagePlaceholder}>
        <Ionicons name="flask-outline" size={30} color="#059669" />
      </View>
      
      <View style={styles.details}>
        <View style={styles.titleRow}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.skuText}>{item.sku}</Text>
        </View>
        <Text style={styles.categoryText}>{item.category}</Text>
        
        <View style={styles.priceRow}>
          <Text style={styles.priceText}>{item.price}</Text>
          <View style={styles.stockBadge}>
            <Text style={styles.stockText}>Stock: {item.stock}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Product Catalog</Text>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#94a3b8" />
          <TextInput 
            placeholder="Search cleaning supplies..." 
            style={styles.searchInput}
            placeholderTextColor="#94a3b8"
            onChangeText={setSearch}
          />
        </View>
      </View>

      {/* Product List */}
      <FlatList 
        data={PRODUCTS.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()))}
        renderItem={renderProduct}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 15, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { backgroundColor: '#fff', paddingHorizontal: 20, paddingTop: 60, paddingBottom: 20, elevation: 2, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#1e293b', marginBottom: 15 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f1f5f9', paddingHorizontal: 15, borderRadius: 12, height: 50 },
  searchInput: { marginLeft: 10, flex: 1, fontSize: 16, color: '#1e293b' },
  productCard: { flexDirection: 'row', backgroundColor: '#fff', padding: 15, borderRadius: 15, marginBottom: 12, alignItems: 'center', elevation: 1, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 2 },
  imagePlaceholder: { width: 70, height: 70, backgroundColor: '#f0fdf4', borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  details: { flex: 1, marginLeft: 15 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  productName: { fontSize: 16, fontWeight: 'bold', color: '#334155', flex: 1, marginRight: 5 },
  skuText: { fontSize: 10, color: '#94a3b8', fontWeight: 'bold' },
  categoryText: { fontSize: 12, color: '#64748b', marginBottom: 8 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  priceText: { fontSize: 18, fontWeight: 'bold', color: '#059669' },
  stockBadge: { backgroundColor: '#f1f5f9', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  stockText: { fontSize: 11, color: '#475569', fontWeight: '600' },
});