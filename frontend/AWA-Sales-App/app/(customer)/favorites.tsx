import React, { useState, useEffect, useCallback } from 'react';
import {
  Alert,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Must match the key used in index.tsx
const WISHLIST_KEY = '@awa_wishlist';

// ─── Types ────────────────────────────────────────────────────────────────────

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  image: string;
  badge?: 'Best Seller' | 'New' | 'Eco';
};

type BadgeConfig = { bg: string; color: string };

// ─── Data ─────────────────────────────────────────────────────────────────────

const ALL_PRODUCTS: Product[] = [
  { id: '1', name: 'Glass Cleaner Pro',   category: 'Cleaning',   price: 450,  rating: 4.8, image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400', badge: 'Best Seller' },
  { id: '2', name: 'Heavy Degreaser',     category: 'Industrial', price: 1200, rating: 4.6, image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400' },
  { id: '3', name: 'Eco Floor Wash',      category: 'Home',       price: 300,  rating: 4.9, image: 'https://images.unsplash.com/photo-1585833014492-7a360fed76c9?w=400',  badge: 'Eco'        },
  { id: '4', name: 'Hand Sanitizer',      category: 'Hygiene',    price: 250,  rating: 4.7, image: 'https://images.unsplash.com/photo-1607013407627-6ee814329547?w=400',  badge: 'New'        },
  { id: '5', name: 'Lemon Dish Soap',     category: 'Cleaning',   price: 180,  rating: 4.5, image: 'https://images.unsplash.com/photo-1527515637462-cff94edd56f9?w=400' },
  { id: '6', name: 'Bathroom Shine',      category: 'Home',       price: 520,  rating: 4.8, image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400',  badge: 'New'        },
  { id: '7', name: 'Multi-Surface Spray', category: 'Cleaning',   price: 380,  rating: 4.6, image: 'https://images.unsplash.com/photo-1585687433877-3b09ac1b696e?w=400' },
  { id: '8', name: 'Industrial Solvent',  category: 'Industrial', price: 950,  rating: 4.5, image: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=400' },
];

const BADGE_CONFIG: Record<NonNullable<Product['badge']>, BadgeConfig> = {
  'Best Seller': { bg: '#fef3c7', color: '#d97706' },
  New:           { bg: '#dbeafe', color: '#2563eb' },
  Eco:           { bg: '#d1fae5', color: '#059669' },
};

// ─── Header ───────────────────────────────────────────────────────────────────

function Header({ onBack, count }: { onBack: () => void; count?: number }): React.JSX.Element {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.75}>
        <Ionicons name="arrow-back" size={22} color="#1e293b" />
      </TouchableOpacity>

      <View style={styles.headerCenter}>
        <Text style={styles.headerTitle}>My Wishlist</Text>
        {count !== undefined && count > 0 && (
          <Text style={styles.headerSub}>{count} saved item{count !== 1 ? 's' : ''}</Text>
        )}
      </View>

      {/* Spacer keeps title centered */}
      <View style={styles.backBtn} />
    </View>
  );
}

// ─── FavoriteCard ─────────────────────────────────────────────────────────────

type FavoriteCardProps = {
  product: Product;
  onRemove: () => void;
  onAddToCart: () => void;
};

function FavoriteCard({ product, onRemove, onAddToCart }: FavoriteCardProps): React.JSX.Element {
  const badge = product.badge ? BADGE_CONFIG[product.badge] : null;

  return (
    <View style={styles.card}>
      {/* Product image */}
      <Image source={{ uri: product.image }} style={styles.cardImg} resizeMode="cover" />

      {/* Info section */}
      <View style={styles.cardInfo}>
        {badge && (
          <View style={[styles.badgeTag, { backgroundColor: badge.bg }]}>
            <Text style={[styles.badgeText, { color: badge.color }]}>{product.badge}</Text>
          </View>
        )}
        <Text style={styles.cardCategory}>{product.category}</Text>
        <Text style={styles.cardName} numberOfLines={2}>{product.name}</Text>

        <View style={styles.ratingRow}>
          <Ionicons name="star" size={12} color="#f59e0b" />
          <Text style={styles.ratingText}>{product.rating.toFixed(1)}</Text>
        </View>

        <Text style={styles.priceText}>Rs. {product.price.toLocaleString()}</Text>

        {/* Action buttons */}
        <View style={styles.cardActions}>
          <TouchableOpacity
            style={styles.addCartBtn}
            onPress={onAddToCart}
            activeOpacity={0.85}
          >
            <Ionicons name="cart-outline" size={16} color="#ffffff" />
            <Text style={styles.addCartText}>Add to Cart</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.removeBtn}
            onPress={onRemove}
            activeOpacity={0.8}
          >
            <Ionicons name="trash-outline" size={18} color="#ef4444" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

// ─── FavoritesScreen ──────────────────────────────────────────────────────────

export default function FavoritesScreen(): React.JSX.Element {
  const router = useRouter();
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    AsyncStorage.getItem(WISHLIST_KEY).then((raw) => {
      if (raw) {
        try {
          const ids: string[] = JSON.parse(raw);
          setWishlistIds(new Set(ids));
        } catch {
          // ignore corrupt data
        }
      }
    });
  }, []);

  const favoriteProducts = ALL_PRODUCTS.filter((p) => wishlistIds.has(p.id));

  const handleRemove = useCallback((id: string): void => {
    setWishlistIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      AsyncStorage.setItem(WISHLIST_KEY, JSON.stringify([...next]));
      return next;
    });
  }, []);

  const handleAddToCart = useCallback((product: Product): void => {
    Alert.alert(
      'Added to Cart',
      `${product.name} has been added to your cart.`,
      [
        { text: 'Continue', style: 'cancel' },
        { text: 'View Cart', onPress: () => router.push('/cart') },
      ],
    );
  }, [router]);

  // ── Empty state ───────────────────────────────────────────────────────────
  if (favoriteProducts.length === 0) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <Header onBack={() => router.back()} />

        <View style={styles.emptyWrap}>
          <View style={styles.emptyIconBg}>
            <Ionicons name="heart-outline" size={50} color="#059669" />
          </View>
          <Text style={styles.emptyTitle}>No favorites yet</Text>
          <Text style={styles.emptyDesc}>
            Tap the heart icon on any product to save it here.
          </Text>
          <TouchableOpacity
            style={styles.browseBtn}
            onPress={() => router.back()}
            activeOpacity={0.85}
          >
            <Ionicons name="storefront-outline" size={17} color="#ffffff" />
            <Text style={styles.browseBtnText}>Browse Products</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // ── List ──────────────────────────────────────────────────────────────────
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <Header onBack={() => router.back()} count={favoriteProducts.length} />

      <FlatList
        data={favoriteProducts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <FavoriteCard
            product={item}
            onRemove={() => handleRemove(item.id)}
            onAddToCart={() => handleAddToCart(item)}
          />
        )}
      />
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 14,
    backgroundColor: '#ffffff',
    borderBottomWidth: 0.5,
    borderBottomColor: '#e2e8f0',
  },
  backBtn: {
    width: 40, height: 40, borderRadius: 12,
    backgroundColor: '#f8fafc',
    justifyContent: 'center', alignItems: 'center',
  },
  headerCenter: { alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#0f172a', letterSpacing: -0.3 },
  headerSub:   { fontSize: 12, color: '#059669', fontWeight: '600', marginTop: 2 },

  // List
  list: { padding: 18, gap: 14 },

  // Card
  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: '#e2e8f0',
  },
  cardImg: { width: 110, height: 120 },
  cardInfo: { flex: 1, padding: 14, justifyContent: 'space-between' },

  badgeTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 7, paddingVertical: 2,
    borderRadius: 6, marginBottom: 4,
  },
  badgeText: { fontSize: 8, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 0.4 },

  cardCategory: { fontSize: 10, fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.5 },
  cardName:     { fontSize: 14, fontWeight: '700', color: '#1e293b', lineHeight: 20, marginTop: 2 },

  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  ratingText: { fontSize: 12, fontWeight: '700', color: '#f59e0b' },

  priceText: { fontSize: 16, fontWeight: '900', color: '#059669', marginTop: 4 },

  // Actions
  cardActions: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 10 },

  addCartBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 6, backgroundColor: '#059669',
    paddingVertical: 9, borderRadius: 12,
  },
  addCartText: { color: '#ffffff', fontSize: 13, fontWeight: '700' },

  removeBtn: {
    width: 38, height: 38, borderRadius: 12,
    backgroundColor: '#fff5f5',
    borderWidth: 0.5, borderColor: '#fecaca',
    justifyContent: 'center', alignItems: 'center',
  },

  // Empty state
  emptyWrap: {
    flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40,
  },
  emptyIconBg: {
    width: 110, height: 110, borderRadius: 55,
    backgroundColor: '#ecfdf5',
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 24,
    borderWidth: 0.5, borderColor: '#d1fae5',
  },
  emptyTitle: { fontSize: 22, fontWeight: '800', color: '#0f172a', marginBottom: 8 },
  emptyDesc:  { fontSize: 14, color: '#64748b', textAlign: 'center', lineHeight: 21 },
  browseBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    marginTop: 28, backgroundColor: '#059669',
    paddingHorizontal: 28, paddingVertical: 14, borderRadius: 16,
  },
  browseBtnText: { color: '#ffffff', fontWeight: '800', fontSize: 15 },
});
