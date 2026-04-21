import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Categories for filtering
const CATEGORIES = ['All', 'Industrial', 'Commercial', 'Janitorial'];

const PRODUCTS = [
  { id: '1', name: 'LoneStar Heavy Degreaser', price: '24.50', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=400', category: 'Industrial' },
  { id: '2', name: 'Austin Shine Glass Pro', price: '8.50', image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?q=80&w=400', category: 'Commercial' },
  { id: '3', name: 'Houston Multi-Surface', price: '12.00', image: 'https://images.unsplash.com/photo-1585833014492-7a360fed76c9?q=80&w=400', category: 'Janitorial' },
  { id: '4', name: 'Dallas Pro Polish', price: '15.00', image: 'https://images.unsplash.com/photo-1550963295-019d8a8a61c5?q=80&w=400', category: 'Commercial' },
];

export default function CatalogScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // Filter Logic
  const filteredProducts = PRODUCTS.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = activeCategory === 'All' || item.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <View style={styles.container}>
      {/* 1. Static Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Product Catalog</Text>
          <Text style={styles.subTitle}>AWA Products</Text>
        </View>
        <TouchableOpacity style={styles.cartIconBox}>
           <Ionicons name="cart-outline" size={24} color="#1e293b" />
           <View style={styles.cartBadge} />
        </TouchableOpacity>
      </View>

      {/* 2. Search Bar */}
      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#94a3b8" />
          <TextInput 
            style={styles.input}
            placeholder="Search products..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={18} color="#94a3b8" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* 3. Category Chips */}
      <View style={{ marginBottom: 10 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterContainer}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity 
              key={cat}
              onPress={() => setActiveCategory(cat)}
              style={[styles.chip, activeCategory === cat && styles.chipActive]}
            >
              <Text style={[styles.chipText, activeCategory === cat && styles.chipTextActive]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* 4. Product List */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.productCard} activeOpacity={0.7}>
            <Image source={{ uri: item.image }} style={styles.img} />
            <View style={styles.info}>
              <View style={styles.catBadge}>
                <Text style={styles.catText}>{item.category}</Text>
              </View>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>${item.price} <Text style={styles.perUnit}>/ unit</Text></Text>
            </View>
            <View style={styles.actionIcon}>
              <Ionicons name="chevron-forward" size={20} color="#cbd5e1" />
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="search-outline" size={50} color="#cbd5e1" />
            <Text style={styles.emptyText}>Bhai, koi product nahi mili!</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 20, 
    backgroundColor: '#fff', 
    paddingTop: 20,
    paddingBottom: 20 
  },
  title: { fontSize: 24, fontWeight: '900', color: '#1e293b' },
  subTitle: { fontSize: 16, color: '#059669', fontWeight: '700', textTransform: 'uppercase' },
  cartIconBox: { padding: 10, backgroundColor: '#f1f5f9', borderRadius: 12 },
  cartBadge: { position: 'absolute', top: 8, right: 8, width: 10, height: 10, backgroundColor: '#ef4444', borderRadius: 5, borderWidth: 2, borderColor: '#fff' },

  searchSection: { paddingHorizontal: 20, marginVertical: 15 },
  searchBar: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#fff', 
    paddingHorizontal: 15, 
    height: 55, 
    borderRadius: 15, 
    borderWidth: 1, 
    borderColor: '#e2e8f0',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05
  },
  input: { flex: 1, marginLeft: 10, fontSize: 16, color: '#1e293b' },

  filterContainer: { paddingHorizontal: 20, paddingBottom: 5 },
  chip: { paddingHorizontal: 18, paddingVertical: 10, borderRadius: 12, backgroundColor: '#fff', marginRight: 10, borderWidth: 1, borderColor: '#e2e8f0' },
  chipActive: { backgroundColor: '#1e293b', borderColor: '#1e293b' },
  chipText: { fontSize: 13, fontWeight: '700', color: '#64748b' },
  chipTextActive: { color: '#fff' },

  productCard: { 
    flexDirection: 'row', 
    backgroundColor: '#fff', 
    padding: 15, 
    borderRadius: 20, 
    marginBottom: 12, 
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f1f5f9'
  },
  img: { width: 85, height: 85, borderRadius: 15, backgroundColor: '#f8fafc' },
  info: { flex: 1, marginLeft: 15 },
  catBadge: { alignSelf: 'flex-start', backgroundColor: '#f0fdf4', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, marginBottom: 5 },
  catText: { fontSize: 10, color: '#059669', fontWeight: 'bold', textTransform: 'uppercase' },
  name: { fontSize: 16, fontWeight: '800', color: '#1e293b', lineHeight: 22 },
  price: { fontSize: 18, color: '#059669', fontWeight: '900', marginTop: 5 },
  perUnit: { fontSize: 12, color: '#94a3b8', fontWeight: 'normal' },
  actionIcon: { padding: 5 },

  emptyContainer: { alignItems: 'center', marginTop: 60 },
  emptyText: { marginTop: 10, color: '#94a3b8', fontSize: 15, fontWeight: '600' }
});