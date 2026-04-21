import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../../components/cart-context';

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  category: string;
}

const CATEGORIES = ['All', 'Cleaning', 'Industrial', 'Home', 'Hygiene'];

const PRODUCTS: Product[] = [
  { id: '1', name: 'Glass Cleaner', price: '450', image: 'https://img.freepik.com/free-photo/cleaning-spray-bottle_23-2148530345.jpg', category: 'Cleaning' },
  { id: '2', name: 'Degreaser Pro', price: '1200', image: 'https://img.freepik.com/free-photo/professional-cleaning-service-concept_23-2148454518.jpg', category: 'Industrial' },
  { id: '3', name: 'Multi-Purpose Soap', price: '300', image: 'https://img.freepik.com/free-photo/blue-soap-bubble_23-2148117769.jpg', category: 'Home' },
  { id: '4', name: 'Hand Sanitizer', price: '250', image: 'https://img.freepik.com/free-photo/hand-sanitizer-bottle_23-2148483501.jpg', category: 'Hygiene' },
];

export default function CustomerShop() {
  const { addToCart } = useCart();
  const [activeCat, setActiveCat] = useState('All');

  const renderProduct = ({ item }: { item: Product }) => (
    <View style={styles.productCard}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
        <TouchableOpacity style={styles.wishlistBtn}>
          <Ionicons name="heart-outline" size={18} color="#64748b" />
        </TouchableOpacity>
      </View>
      <View style={styles.productDetails}>
        <Text style={styles.categoryLabel}>{item.category}</Text>
        <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
        <View style={styles.priceRow}>
          <Text style={styles.priceText}>Rs. {item.price}</Text>
          <TouchableOpacity style={styles.addBtn} onPress={() => addToCart(item)}>
            <Ionicons name="add" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* 1. Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerSubtitle}>Deliver to Shop</Text>
          <Text style={styles.headerTitle}>Explore Products</Text>
        </View>
        <TouchableOpacity style={styles.profileBtn}>
          <Ionicons name="notifications-outline" size={24} color="#1e293b" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 2. Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#94a3b8" style={styles.searchIcon} />
          <TextInput placeholder="Search products..." style={styles.searchInput} />
        </View>

        {/* 3. Categories Scroll */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll} contentContainerStyle={{ paddingRight: 40 }}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity 
              key={cat} 
              onPress={() => setActiveCat(cat)}
              style={[styles.catBtn, activeCat === cat && styles.catBtnActive]}
            >
              <Text style={[styles.catText, activeCat === cat && styles.catTextActive]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* 4. Products Grid */}
        <View style={styles.productsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Items</Text>
            <Text style={styles.seeAll}>See All</Text>
          </View>
          
          <FlatList
            data={PRODUCTS}
            renderItem={renderProduct}
            keyExtractor={item => item.id}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={styles.columnWrapper}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 },
  headerSubtitle: { fontSize: 12, color: '#64748b', fontWeight: '600' },
  headerTitle: { fontSize: 24, fontWeight: '900', color: '#1e293b' },
  profileBtn: { padding: 10, backgroundColor: '#f1f5f9', borderRadius: 12 },
  
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f1f5f9', marginHorizontal: 20, paddingHorizontal: 15, borderRadius: 15, marginBottom: 25 },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, paddingVertical: 12, fontSize: 15 },

  catScroll: { paddingLeft: 20, marginBottom: 25 },
  catBtn: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 12, backgroundColor: '#f8fafc', marginRight: 10, borderWidth: 1, borderColor: '#f1f5f9' },
  catBtnActive: { backgroundColor: '#1e293b', borderColor: '#1e293b' },
  catText: { fontWeight: '700', color: '#64748b' },
  catTextActive: { color: '#fff' },

  productsSection: { paddingHorizontal: 20 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#1e293b' },
  seeAll: { color: '#059669', fontWeight: 'bold' },

  columnWrapper: { justifyContent: 'space-between' },
  productCard: { width: '48%', marginBottom: 20 },
  imageContainer: { backgroundColor: '#f8fafc', borderRadius: 20, overflow: 'hidden', position: 'relative' },
  productImage: { width: '100%', height: 150 },
  wishlistBtn: { position: 'absolute', top: 10, right: 10, backgroundColor: '#fff', padding: 6, borderRadius: 10 },
  
  productDetails: { marginTop: 10 },
  categoryLabel: { fontSize: 10, color: '#94a3b8', fontWeight: 'bold', textTransform: 'uppercase' },
  productName: { fontSize: 15, fontWeight: '700', color: '#1e293b', marginTop: 2 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 },
  priceText: { fontSize: 17, fontWeight: '900', color: '#1e293b' },
  addBtn: { backgroundColor: '#1e293b', padding: 8, borderRadius: 10 }
});