import React, { useState } from 'react';
import {
  StyleSheet, Text, View, FlatList, Image, TouchableOpacity,
  TextInput, ScrollView, StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../../components/cart-context';

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  category: string;
  rating: string;
  badge?: string;
}

const CATEGORIES = ['All', 'Cleaning', 'Industrial', 'Home', 'Hygiene'];

const PRODUCTS: Product[] = [
  { id: '1', name: 'Glass Cleaner Pro', price: '450', image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400', category: 'Cleaning', rating: '4.8', badge: 'Best Seller' },
  { id: '2', name: 'Degreaser Pro X', price: '1200', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400', category: 'Industrial', rating: '4.6' },
  { id: '3', name: 'Eco Floor Wash', price: '300', image: 'https://images.unsplash.com/photo-1585833014492-7a360fed76c9?w=400', category: 'Home', rating: '4.9', badge: 'Eco' },
  { id: '4', name: 'Hand Sanitizer', price: '250', image: 'https://images.unsplash.com/photo-1607013407627-6ee814329547?w=400', category: 'Hygiene', rating: '4.7' },
  { id: '5', name: 'Lemon Dish Soap', price: '180', image: 'https://images.unsplash.com/photo-1527515637462-cff94edd56f9?w=400', category: 'Cleaning', rating: '4.5' },
  { id: '6', name: 'Bathroom Shine', price: '520', image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400', category: 'Home', rating: '4.8', badge: 'New' },
  { id: '7', name: 'Multi-Surface Spray', price: '380', image: 'https://images.unsplash.com/photo-1585687433877-3b09ac1b696e?w=400', category: 'Cleaning', rating: '4.6' },
  { id: '8', name: 'Industrial Solvent', price: '950', image: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=400', category: 'Industrial', rating: '4.5' },
];

const BADGE_STYLES: Record<string, { bg: string; text: string }> = {
  'Best Seller': { bg: '#fef3c7', text: '#d97706' },
  'Eco':         { bg: '#d1fae5', text: '#059669' },
  'New':         { bg: '#dbeafe', text: '#2563eb' },
};

export default function CustomerShop() {
  const { addToCart, cart } = useCart();
  const [activeCat, setActiveCat] = useState('All');
  const [search, setSearch] = useState('');
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [addedItems, setAddedItems] = useState<string[]>([]);

  const cartCount: number = cart?.reduce((sum: number, i: any) => sum + i.quantity, 0) ?? 0;

  const filtered = PRODUCTS.filter(
    p =>
      (activeCat === 'All' || p.category === activeCat) &&
      p.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleWishlist = (id: string) =>
    setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);

  const handleAdd = (item: Product) => {
    addToCart(item);
    setAddedItems(prev => [...prev, item.id]);
    setTimeout(() => setAddedItems(prev => prev.filter(i => i !== item.id)), 1000);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>

        {/* ── Header ── */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerSub}>Delivered to your door</Text>
            <Text style={styles.headerTitle}>Explore Products</Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="cart-outline" size={22} color="#1e293b" />
              {cartCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{cartCount > 99 ? '99+' : cartCount}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Search Row ── */}
        <View style={styles.searchRow}>
          <View style={styles.searchBar}>
            <Ionicons name="search-outline" size={20} color="#94a3b8" />
            <TextInput
              placeholder="Search products..."
              placeholderTextColor="#94a3b8"
              style={styles.searchInput}
              value={search}
              onChangeText={setSearch}
            />
            {search.length > 0 && (
              <TouchableOpacity onPress={() => setSearch('')}>
                <Ionicons name="close-circle" size={18} color="#94a3b8" />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity style={styles.filterBtn}>
            <Ionicons name="options-outline" size={22} color="#059669" />
          </TouchableOpacity>
        </View>

        {/* ── Category Pills ── */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.catScroll}
        >
          {CATEGORIES.map(cat => (
            <TouchableOpacity
              key={cat}
              onPress={() => setActiveCat(cat)}
              style={[styles.catPill, activeCat === cat && styles.catPillActive]}
              activeOpacity={0.8}
            >
              <Text style={[styles.catText, activeCat === cat && styles.catTextActive]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* ── Section Header ── */}
        <View style={styles.sectionHead}>
          <View>
            <Text style={styles.sectionTitle}>
              {activeCat === 'All' ? 'All Products' : activeCat}
            </Text>
            <Text style={styles.sectionSub}>{filtered.length} products available</Text>
          </View>
          <TouchableOpacity style={styles.sortBtn}>
            <Ionicons name="swap-vertical-outline" size={16} color="#059669" />
            <Text style={styles.sortText}>Sort</Text>
          </TouchableOpacity>
        </View>

        {/* ── Products Grid ── */}
        <FlatList
          data={filtered}
          numColumns={2}
          keyExtractor={item => item.id}
          scrollEnabled={false}
          contentContainerStyle={styles.grid}
          columnWrapperStyle={styles.gridRow}
          ListEmptyComponent={
            <View style={styles.noResults}>
              <Ionicons name="search-outline" size={40} color="#cbd5e1" />
              <Text style={styles.noResultsText}>No products found</Text>
            </View>
          }
          renderItem={({ item }) => {
            const added = addedItems.includes(item.id);
            const badgeCfg = item.badge ? BADGE_STYLES[item.badge] : null;
            return (
              <TouchableOpacity style={styles.card} activeOpacity={0.92}>
                {/* Image */}
                <View style={styles.imgWrap}>
                  <Image source={{ uri: item.image }} style={styles.productImg} />

                  {/* Top badges */}
                  <TouchableOpacity
                    style={styles.wishBtn}
                    onPress={() => toggleWishlist(item.id)}
                    activeOpacity={0.8}
                  >
                    <Ionicons
                      name={wishlist.includes(item.id) ? 'heart' : 'heart-outline'}
                      size={16}
                      color={wishlist.includes(item.id) ? '#ef4444' : '#64748b'}
                    />
                  </TouchableOpacity>

                  {badgeCfg && (
                    <View style={[styles.productBadge, { backgroundColor: badgeCfg.bg }]}>
                      <Text style={[styles.productBadgeText, { color: badgeCfg.text }]}>
                        {item.badge}
                      </Text>
                    </View>
                  )}

                  {/* Category overlay */}
                  <View style={styles.catBadge}>
                    <Text style={styles.catBadgeText}>{item.category}</Text>
                  </View>
                </View>

                {/* Details */}
                <View style={styles.cardBody}>
                  <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
                  <View style={styles.ratingRow}>
                    <Ionicons name="star" size={12} color="#f59e0b" />
                    <Text style={styles.ratingText}>{item.rating}</Text>
                  </View>
                  <View style={styles.priceRow}>
                    <Text style={styles.priceText}>Rs. {item.price}</Text>
                    <TouchableOpacity
                      style={[styles.addBtn, added && styles.addBtnAdded]}
                      onPress={() => handleAdd(item)}
                      activeOpacity={0.85}
                    >
                      <Ionicons
                        name={added ? 'checkmark' : 'add'}
                        size={20}
                        color="#fff"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const CARD_SHADOW = {
  shadowColor: '#0f172a',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.07,
  shadowRadius: 12,
  elevation: 4,
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },

  // Header
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, paddingTop: 16, paddingBottom: 14,
    backgroundColor: '#ffffff',
  },
  headerSub: { fontSize: 12, color: '#94a3b8', fontWeight: '600' },
  headerTitle: { fontSize: 24, fontWeight: '900', color: '#0f172a', letterSpacing: -0.5 },
  headerActions: { flexDirection: 'row', alignItems: 'center' },
  iconBtn: {
    width: 44, height: 44, borderRadius: 14,
    backgroundColor: '#f8fafc', justifyContent: 'center', alignItems: 'center',
  },
  badge: {
    position: 'absolute', top: 2, right: 2,
    backgroundColor: '#ef4444', borderRadius: 8,
    minWidth: 18, height: 18, justifyContent: 'center', alignItems: 'center',
    borderWidth: 1.5, borderColor: '#f8fafc', paddingHorizontal: 2,
  },
  badgeText: { color: '#fff', fontSize: 9, fontWeight: '900' },

  // Search
  searchRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 20, gap: 10, marginBottom: 18,
    marginTop: 6,
  },
  searchBar: {
    flex: 1, flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#ffffff', paddingHorizontal: 16, height: 52,
    borderRadius: 16, gap: 10, ...CARD_SHADOW,
  },
  searchInput: { flex: 1, fontSize: 14, color: '#1e293b', fontWeight: '500' },
  filterBtn: {
    width: 52, height: 52, borderRadius: 16,
    backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center',
    ...CARD_SHADOW,
  },

  // Categories
  catScroll: { paddingHorizontal: 20, paddingBottom: 4, gap: 8 },
  catPill: {
    paddingHorizontal: 18, paddingVertical: 10,
    borderRadius: 50, backgroundColor: '#ffffff',
    borderWidth: 1.5, borderColor: '#e2e8f0',
  },
  catPillActive: { backgroundColor: '#059669', borderColor: '#059669' },
  catText: { fontSize: 13, fontWeight: '700', color: '#64748b' },
  catTextActive: { color: '#ffffff' },

  // Section
  sectionHead: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end',
    paddingHorizontal: 20, marginTop: 22, marginBottom: 14,
  },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: '#0f172a', letterSpacing: -0.3 },
  sectionSub: { fontSize: 12, color: '#94a3b8', fontWeight: '500', marginTop: 2 },
  sortBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingHorizontal: 12, paddingVertical: 6,
    borderRadius: 10, backgroundColor: '#ecfdf5',
  },
  sortText: { fontSize: 13, fontWeight: '700', color: '#059669' },

  // Grid
  grid: { paddingHorizontal: 14, paddingBottom: 8 },
  gridRow: { justifyContent: 'space-between', marginBottom: 4 },
  noResults: { alignItems: 'center', paddingTop: 40, gap: 10 },
  noResultsText: { fontSize: 15, color: '#94a3b8', fontWeight: '600' },

  // Card
  card: {
    width: '48.5%', backgroundColor: '#ffffff', borderRadius: 20,
    marginBottom: 16, overflow: 'hidden', ...CARD_SHADOW,
  },
  imgWrap: { backgroundColor: '#f0fdf4', position: 'relative' },
  productImg: { width: '100%', height: 150 },
  wishBtn: {
    position: 'absolute', top: 10, right: 10,
    backgroundColor: '#ffffff', width: 32, height: 32,
    borderRadius: 10, justifyContent: 'center', alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1, shadowRadius: 4, elevation: 2,
  },
  productBadge: {
    position: 'absolute', top: 10, left: 10,
    paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6,
  },
  productBadgeText: { fontSize: 9, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 0.3 },
  catBadge: {
    position: 'absolute', bottom: 8, left: 8,
    backgroundColor: 'rgba(5,150,105,0.14)',
    paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6,
  },
  catBadgeText: { fontSize: 9, fontWeight: '800', color: '#059669', textTransform: 'uppercase', letterSpacing: 0.5 },

  cardBody: { padding: 12 },
  productName: { fontSize: 14, fontWeight: '700', color: '#1e293b', lineHeight: 20 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginTop: 5, gap: 4 },
  ratingText: { fontSize: 12, fontWeight: '700', color: '#f59e0b' },
  priceRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginTop: 10,
  },
  priceText: { fontSize: 15, fontWeight: '900', color: '#0f172a' },
  addBtn: {
    backgroundColor: '#059669', width: 34, height: 34,
    borderRadius: 11, justifyContent: 'center', alignItems: 'center',
  },
  addBtnAdded: { backgroundColor: '#047857' },
});
