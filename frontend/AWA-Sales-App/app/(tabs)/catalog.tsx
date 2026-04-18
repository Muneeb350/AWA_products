import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Categories for the filter bar
const CATEGORIES = ['All', 'Chemicals', 'Paper Goods', 'Tools', 'Safety'];

// Enhanced Product Data
const PRODUCTS = [
  { id: '1', name: 'Ultra-Shine Glass Cleaner', category: 'Chemicals', price: 24.99, image: 'https://images.unsplash.com/photo-1584622781564-1d9876a13d00?q=80&w=200&auto=format&fit=crop', stock: 'In Stock' },
  { id: '2', name: 'Heavy Duty Degreaser (5G)', category: 'Chemicals', price: 89.00, image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=200&auto=format&fit=crop', stock: 'Low Stock' },
  { id: '3', name: 'Microfiber Towel Pack', category: 'Tools', price: 15.50, image: 'https://images.unsplash.com/photo-1610427302434-90a6e60b2103?q=80&w=200&auto=format&fit=crop', stock: 'In Stock' },
  { id: '4', name: 'Industrial Floor Mop', category: 'Tools', price: 45.00, image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=200&auto=format&fit=crop', stock: 'In Stock' },
  { id: '5', name: 'Nitrile Gloves (Box)', category: 'Safety', price: 12.99, image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=200&auto=format&fit=crop', stock: 'Out of Stock' },
];

export default function CatalogScreen() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProducts = PRODUCTS.filter(p => 
    (activeCategory === 'All' || p.category === activeCategory) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const renderProduct = ({ item }: { item: typeof PRODUCTS[0] }) => (
    <TouchableOpacity style={styles.productCard} activeOpacity={0.9}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      
      <View style={styles.productInfo}>
        <View>
          <Text style={styles.categoryTag}>{item.category}</Text>
          <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
        </View>
        
        <View style={styles.cardFooter}>
          <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
          <View style={[styles.stockBadge, { backgroundColor: item.stock === 'Out of Stock' ? '#fee2e2' : '#f0fdf4' }]}>
            <Text style={[styles.stockText, { color: item.stock === 'Out of Stock' ? '#ef4444' : '#059669' }]}>
              {item.stock}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* 1. Header with Search */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Product Catalog</Text>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#94a3b8" />
          <TextInput 
            placeholder="Search cleaning supplies..." 
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      {/* 2. Horizontal Category Bar */}
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
          {CATEGORIES.map(cat => (
            <TouchableOpacity 
              key={cat} 
              onPress={() => setActiveCategory(cat)}
              style={[styles.categoryChip, activeCategory === cat && styles.activeChip]}
            >
              <Text style={[styles.categoryText, activeCategory === cat && styles.activeCategoryText]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* 3. Product Grid */}
      <FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={item => item.id}
        numColumns={2} // Two items per row
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.columnWrapper}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { backgroundColor: '#fff', paddingHorizontal: 20, paddingTop: 60, paddingBottom: 20 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#1e293b', marginBottom: 15 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f1f5f9', paddingHorizontal: 15, borderRadius: 12, height: 50 },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 16, color: '#1e293b' },
  
  categoryScroll: { paddingHorizontal: 20, paddingVertical: 15 },
  categoryChip: { paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20, backgroundColor: '#fff', marginRight: 10, borderWidth: 1, borderColor: '#e2e8f0' },
  activeChip: { backgroundColor: '#059669', borderColor: '#059669' },
  categoryText: { color: '#64748b', fontWeight: '600' },
  activeCategoryText: { color: '#fff' },

  listContainer: { paddingHorizontal: 15, paddingBottom: 100 },
  columnWrapper: { justifyContent: 'space-between' },
  
  productCard: { 
    backgroundColor: '#fff', 
    width: '48%', 
    borderRadius: 20, 
    marginBottom: 15, 
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10
  },
  productImage: { width: '100%', height: 140, backgroundColor: '#f1f5f9' },
  productInfo: { padding: 12, flex: 1, justifyContent: 'space-between' },
  categoryTag: { fontSize: 10, fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase' },
  productName: { fontSize: 14, fontWeight: 'bold', color: '#334155', marginTop: 4, height: 40 },
  cardFooter: { marginTop: 10 },
  productPrice: { fontSize: 18, fontWeight: 'bold', color: '#059669' },
  stockBadge: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6, marginTop: 5 },
  stockText: { fontSize: 10, fontWeight: 'bold' }
});