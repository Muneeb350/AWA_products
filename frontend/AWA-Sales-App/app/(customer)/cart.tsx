import React, { useState } from 'react';
import {
  StyleSheet, Text, View, FlatList, Image,
  TouchableOpacity, TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

type CartItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
  image: string;
  category: string;
};

const INITIAL_CART: CartItem[] = [
  { id: '1', name: 'Premium Degreaser', price: 24.50, qty: 2, image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400', category: 'Industrial' },
  { id: '2', name: 'Glass Sparkle Pro', price: 12.99, qty: 1, image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400', category: 'Cleaning' },
  { id: '3', name: 'Eco Floor Wash', price: 18.00, qty: 1, image: 'https://images.unsplash.com/photo-1585833014492-7a360fed76c9?w=400', category: 'Home' },
];

export default function CartScreen() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  const updateQty = (id: string, delta: number) => {
    setCartItems(prev =>
      prev
        .map(item => item.id === id ? { ...item, qty: item.qty + delta } : item)
        .filter(item => item.qty > 0)
    );
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const total = subtotal - discount;

  if (cartItems.length === 0) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.emptyWrap}>
          <View style={styles.emptyIconBg}>
            <Ionicons name="cart-outline" size={54} color="#059669" />
          </View>
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptyDesc}>
            Add some cleaning products and they'll show up here.
          </Text>
          <TouchableOpacity style={styles.emptyShopBtn} activeOpacity={0.85}>
            <Ionicons name="storefront-outline" size={18} color="#fff" />
            <Text style={styles.emptyShopText}>Explore Products</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>My Cart</Text>
          <Text style={styles.headerSub}>
            {cartItems.length} item{cartItems.length !== 1 ? 's' : ''}
          </Text>
        </View>
        <TouchableOpacity onPress={() => setCartItems([])}>
          <Text style={styles.clearAll}>Clear All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={cartItems}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <>
            {/* Promo Code Card */}
            <View style={styles.promoCard}>
              <Ionicons name="pricetag-outline" size={20} color="#059669" />
              <TextInput
                placeholder="Enter promo code"
                placeholderTextColor="#94a3b8"
                style={styles.promoInput}
                value={promoCode}
                onChangeText={setPromoCode}
                autoCapitalize="characters"
              />
              <TouchableOpacity
                style={[styles.applyBtn, promoApplied && styles.applyBtnApplied]}
                onPress={() => promoCode.length > 0 && setPromoApplied(!promoApplied)}
                activeOpacity={0.8}
              >
                <Text style={styles.applyText}>{promoApplied ? 'Remove' : 'Apply'}</Text>
              </TouchableOpacity>
            </View>

            {/* Order Summary */}
            <View style={styles.summaryCard}>
              <Text style={styles.summaryTitle}>Order Summary</Text>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>
                  Subtotal ({cartItems.length} item{cartItems.length !== 1 ? 's' : ''})
                </Text>
                <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
              </View>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Delivery Fee</Text>
                <View style={styles.freeTag}>
                  <Text style={styles.freeText}>FREE</Text>
                </View>
              </View>

              {promoApplied && (
                <View style={styles.summaryRow}>
                  <Text style={[styles.summaryLabel, { color: '#059669' }]}>Discount (10%)</Text>
                  <Text style={[styles.summaryValue, { color: '#059669' }]}>
                    -${discount.toFixed(2)}
                  </Text>
                </View>
              )}

              <View style={styles.divider} />

              <View style={styles.summaryRow}>
                <Text style={styles.totalLabel}>Total Amount</Text>
                <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
              </View>
            </View>
          </>
        }
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.itemImg} />

            <View style={styles.itemInfo}>
              <Text style={styles.itemCat}>{item.category}</Text>
              <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
              <Text style={styles.itemUnitPrice}>${item.price.toFixed(2)} / unit</Text>

              <View style={styles.qtyRow}>
                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() => updateQty(item.id, -1)}
                  activeOpacity={0.8}
                >
                  <Ionicons name="remove" size={17} color="#1e293b" />
                </TouchableOpacity>
                <Text style={styles.qtyText}>{item.qty}</Text>
                <TouchableOpacity
                  style={[styles.qtyBtn, styles.qtyBtnAdd]}
                  onPress={() => updateQty(item.id, 1)}
                  activeOpacity={0.8}
                >
                  <Ionicons name="add" size={17} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.itemRight}>
              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() => updateQty(item.id, -item.qty)}
                activeOpacity={0.8}
              >
                <Ionicons name="trash-outline" size={17} color="#ef4444" />
              </TouchableOpacity>
              <Text style={styles.itemLineTotal}>${(item.price * item.qty).toFixed(2)}</Text>
            </View>
          </View>
        )}
      />

      {/* Sticky Checkout Footer */}
      <View style={styles.footer}>
        <View style={styles.totalPill}>
          <Text style={styles.totalPillLabel}>TOTAL</Text>
          <Text style={styles.totalPillValue}>${total.toFixed(2)}</Text>
        </View>
        <TouchableOpacity
          style={styles.checkoutBtn}
          activeOpacity={0.85}
          onPress={() => router.push('/checkout')}
        >
          <Text style={styles.checkoutText}>Checkout</Text>
          <Ionicons name="arrow-forward-circle" size={22} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const CARD_SHADOW = {
  shadowColor: '#0f172a',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.05,
  shadowRadius: 10,
  elevation: 3,
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },

  // Empty State
  emptyWrap: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 },
  emptyIconBg: {
    width: 120, height: 120, borderRadius: 60,
    backgroundColor: '#ecfdf5', justifyContent: 'center', alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#059669', shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15, shadowRadius: 20, elevation: 8,
  },
  emptyTitle: { fontSize: 22, fontWeight: '800', color: '#0f172a', marginBottom: 8 },
  emptyDesc: { fontSize: 14, color: '#64748b', textAlign: 'center', lineHeight: 21 },
  emptyShopBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    marginTop: 28, backgroundColor: '#059669',
    paddingHorizontal: 28, paddingVertical: 14, borderRadius: 16,
  },
  emptyShopText: { color: '#fff', fontWeight: '800', fontSize: 15 },

  // Header
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end',
    paddingHorizontal: 20, paddingTop: 16, paddingBottom: 14,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1, borderBottomColor: '#f1f5f9',
  },
  headerTitle: { fontSize: 26, fontWeight: '900', color: '#0f172a', letterSpacing: -0.5 },
  headerSub: { fontSize: 13, color: '#059669', fontWeight: '600', marginTop: 3 },
  clearAll: { fontSize: 13, color: '#ef4444', fontWeight: '700' },

  // List
  list: { padding: 16, paddingBottom: 12 },

  // Cart Item
  cartItem: {
    flexDirection: 'row', backgroundColor: '#ffffff',
    borderRadius: 20, padding: 14, marginBottom: 12,
    alignItems: 'center',
    ...CARD_SHADOW,
  },
  itemImg: { width: 84, height: 84, borderRadius: 16, backgroundColor: '#f0fdf4' },
  itemInfo: { flex: 1, marginLeft: 13 },
  itemCat: {
    fontSize: 9, fontWeight: '800', color: '#059669',
    textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 3,
  },
  itemName: { fontSize: 14, fontWeight: '700', color: '#1e293b', lineHeight: 19 },
  itemUnitPrice: { fontSize: 12, color: '#94a3b8', fontWeight: '500', marginTop: 2 },
  qtyRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 10 },
  qtyBtn: {
    width: 30, height: 30, borderRadius: 9,
    backgroundColor: '#f1f5f9', justifyContent: 'center', alignItems: 'center',
  },
  qtyBtnAdd: { backgroundColor: '#059669' },
  qtyText: {
    fontSize: 15, fontWeight: '800', color: '#0f172a',
    minWidth: 22, textAlign: 'center',
  },
  itemRight: {
    alignItems: 'flex-end', justifyContent: 'space-between',
    height: 84, paddingVertical: 2,
  },
  deleteBtn: {
    width: 32, height: 32, borderRadius: 10,
    backgroundColor: '#fff5f5', justifyContent: 'center', alignItems: 'center',
  },
  itemLineTotal: { fontSize: 16, fontWeight: '900', color: '#0f172a' },

  // Promo
  promoCard: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: '#ffffff', borderRadius: 16, padding: 14,
    marginBottom: 12,
    borderWidth: 1.5, borderColor: '#d1fae5',
    ...CARD_SHADOW,
  },
  promoInput: { flex: 1, fontSize: 14, color: '#1e293b', fontWeight: '500' },
  applyBtn: {
    backgroundColor: '#059669', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 10,
  },
  applyBtnApplied: { backgroundColor: '#64748b' },
  applyText: { color: '#fff', fontWeight: '800', fontSize: 13 },

  // Summary
  summaryCard: {
    backgroundColor: '#ffffff', borderRadius: 20, padding: 20, marginBottom: 10,
    ...CARD_SHADOW,
  },
  summaryTitle: { fontSize: 17, fontWeight: '800', color: '#0f172a', marginBottom: 16 },
  summaryRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 11,
  },
  summaryLabel: { fontSize: 14, color: '#64748b', fontWeight: '500' },
  summaryValue: { fontSize: 14, fontWeight: '700', color: '#1e293b' },
  freeTag: {
    backgroundColor: '#d1fae5', paddingHorizontal: 10,
    paddingVertical: 3, borderRadius: 8,
  },
  freeText: { color: '#059669', fontSize: 12, fontWeight: '800' },
  divider: { height: 1, backgroundColor: '#f1f5f9', marginVertical: 10 },
  totalLabel: { fontSize: 16, fontWeight: '800', color: '#0f172a' },
  totalValue: { fontSize: 24, fontWeight: '900', color: '#059669' },

  // Footer
  footer: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20, paddingTop: 14, paddingBottom: 22,
    borderTopLeftRadius: 26, borderTopRightRadius: 26,
    shadowColor: '#0f172a', shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.08, shadowRadius: 16, elevation: 16,
  },
  totalPill: {
    flex: 1, backgroundColor: '#f0fdf4',
    borderRadius: 16, paddingHorizontal: 16, paddingVertical: 10,
  },
  totalPillLabel: {
    fontSize: 10, color: '#059669', fontWeight: '800',
    letterSpacing: 0.8, textTransform: 'uppercase',
  },
  totalPillValue: { fontSize: 20, fontWeight: '900', color: '#0f172a' },
  checkoutBtn: {
    flex: 2, flexDirection: 'row', justifyContent: 'center',
    alignItems: 'center', gap: 8,
    backgroundColor: '#059669', borderRadius: 18, paddingVertical: 16,
  },
  checkoutText: { color: '#fff', fontSize: 16, fontWeight: '800' },
});
