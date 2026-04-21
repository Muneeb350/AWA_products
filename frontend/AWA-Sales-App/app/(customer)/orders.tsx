import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

type OrderStatus = 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

type Order = {
  id: string;
  orderNo: string;
  date: string;
  items: number;
  total: number;
  status: OrderStatus;
};

const STATUS_CONFIG: Record<OrderStatus, { color: string; bg: string; icon: any; label: string }> = {
  Processing: { color: '#d97706', bg: '#fef3c7', icon: 'time-outline', label: 'Processing' },
  Shipped:    { color: '#2563eb', bg: '#dbeafe', icon: 'car-outline',  label: 'Shipped'    },
  Delivered:  { color: '#059669', bg: '#d1fae5', icon: 'checkmark-circle-outline', label: 'Delivered' },
  Cancelled:  { color: '#dc2626', bg: '#fee2e2', icon: 'close-circle-outline',     label: 'Cancelled' },
};

const FILTERS = ['All', 'Processing', 'Shipped', 'Delivered', 'Cancelled'] as const;
type Filter = (typeof FILTERS)[number];

const SAMPLE_ORDERS: Order[] = []; // Replace with real data

export default function OrdersScreen() {
  const [activeFilter, setActiveFilter] = useState<Filter>('All');

  const filtered =
    activeFilter === 'All'
      ? SAMPLE_ORDERS
      : SAMPLE_ORDERS.filter(o => o.status === activeFilter);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>My Orders</Text>
          <Text style={styles.headerSub}>{SAMPLE_ORDERS.length} total orders</Text>
        </View>
        <TouchableOpacity style={styles.searchBtn}>
          <Ionicons name="search-outline" size={22} color="#1e293b" />
        </TouchableOpacity>
      </View>

      {SAMPLE_ORDERS.length === 0 ? (
        /* ── Empty State ── */
        <View style={styles.emptyWrap}>
          {/* Decorative rings */}
          <View style={styles.ringOuter}>
            <View style={styles.ringInner}>
              <View style={styles.iconCircle}>
                <Ionicons name="receipt-outline" size={44} color="#059669" />
              </View>
            </View>
          </View>

          <Text style={styles.emptyTitle}>No Orders Yet</Text>
          <Text style={styles.emptyDesc}>
            Your order history will appear here once you place your first order.
          </Text>

          {/* Feature hints */}
          <View style={styles.hintRow}>
            {[
              { icon: 'time-outline', label: 'Track Orders' },
              { icon: 'receipt-outline', label: 'View Invoices' },
              { icon: 'refresh-outline', label: 'Reorder Easily' },
            ].map(hint => (
              <View key={hint.label} style={styles.hintItem}>
                <View style={styles.hintIconWrap}>
                  <Ionicons name={hint.icon as any} size={20} color="#059669" />
                </View>
                <Text style={styles.hintLabel}>{hint.label}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.shopBtn} activeOpacity={0.85}>
            <Ionicons name="storefront-outline" size={18} color="#fff" />
            <Text style={styles.shopBtnText}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {/* Filter Pills */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterScroll}
          >
            {FILTERS.map(f => (
              <TouchableOpacity
                key={f}
                onPress={() => setActiveFilter(f)}
                style={[styles.filterPill, activeFilter === f && styles.filterPillActive]}
                activeOpacity={0.8}
              >
                <Text style={[styles.filterText, activeFilter === f && styles.filterTextActive]}>
                  {f}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <FlatList
            data={filtered}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.noResults}>
                <Ionicons name="filter-outline" size={36} color="#cbd5e1" />
                <Text style={styles.noResultsText}>No {activeFilter} orders</Text>
              </View>
            }
            renderItem={({ item }) => {
              const cfg = STATUS_CONFIG[item.status];
              return (
                <TouchableOpacity style={styles.orderCard} activeOpacity={0.9}>
                  {/* Left accent bar */}
                  <View style={[styles.accentBar, { backgroundColor: cfg.color }]} />

                  <View style={styles.orderInfo}>
                    <View style={styles.orderTopRow}>
                      <Text style={styles.orderNo}>{item.orderNo}</Text>
                      <View style={[styles.statusTag, { backgroundColor: cfg.bg }]}>
                        <Ionicons name={cfg.icon} size={13} color={cfg.color} />
                        <Text style={[styles.statusText, { color: cfg.color }]}>{cfg.label}</Text>
                      </View>
                    </View>
                    <Text style={styles.orderDate}>{item.date}</Text>
                    <View style={styles.orderBottomRow}>
                      <Text style={styles.orderMeta}>{item.items} item{item.items !== 1 ? 's' : ''}</Text>
                      <Text style={styles.orderTotal}>${item.total.toFixed(2)}</Text>
                    </View>
                  </View>

                  <TouchableOpacity style={styles.chevronBtn}>
                    <Ionicons name="chevron-forward" size={18} color="#94a3b8" />
                  </TouchableOpacity>
                </TouchableOpacity>
              );
            }}
          />
        </>
      )}
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

  // Header
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end',
    paddingHorizontal: 20, paddingTop: 16, paddingBottom: 14,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1, borderBottomColor: '#f1f5f9',
  },
  headerTitle: { fontSize: 26, fontWeight: '900', color: '#0f172a', letterSpacing: -0.5 },
  headerSub: { fontSize: 13, color: '#059669', fontWeight: '600', marginTop: 3 },
  searchBtn: {
    width: 42, height: 42, borderRadius: 14,
    backgroundColor: '#f8fafc', justifyContent: 'center', alignItems: 'center',
  },

  // Empty State
  emptyWrap: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 36 },
  ringOuter: {
    width: 160, height: 160, borderRadius: 80,
    backgroundColor: '#f0fdf4', justifyContent: 'center', alignItems: 'center',
    marginBottom: 28,
  },
  ringInner: {
    width: 126, height: 126, borderRadius: 63,
    backgroundColor: '#dcfce7', justifyContent: 'center', alignItems: 'center',
  },
  iconCircle: {
    width: 92, height: 92, borderRadius: 46,
    backgroundColor: '#ecfdf5', justifyContent: 'center', alignItems: 'center',
    shadowColor: '#059669', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18, shadowRadius: 14, elevation: 8,
  },
  emptyTitle: {
    fontSize: 24, fontWeight: '900', color: '#0f172a',
    letterSpacing: -0.4, marginBottom: 10,
  },
  emptyDesc: {
    fontSize: 14, color: '#64748b', textAlign: 'center',
    lineHeight: 22, marginBottom: 28,
  },
  hintRow: {
    flexDirection: 'row', gap: 16, marginBottom: 32,
  },
  hintItem: { alignItems: 'center', gap: 8 },
  hintIconWrap: {
    width: 50, height: 50, borderRadius: 16,
    backgroundColor: '#ecfdf5', justifyContent: 'center', alignItems: 'center',
  },
  hintLabel: { fontSize: 11, fontWeight: '700', color: '#475569' },
  shopBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: '#059669', paddingHorizontal: 30,
    paddingVertical: 15, borderRadius: 16,
  },
  shopBtnText: { color: '#fff', fontWeight: '800', fontSize: 15 },

  // Filter pills
  filterScroll: { paddingHorizontal: 20, paddingVertical: 14, gap: 8 },
  filterPill: {
    paddingHorizontal: 16, paddingVertical: 8,
    borderRadius: 50, backgroundColor: '#ffffff',
    borderWidth: 1.5, borderColor: '#e2e8f0',
  },
  filterPillActive: { backgroundColor: '#059669', borderColor: '#059669' },
  filterText: { fontSize: 13, fontWeight: '700', color: '#64748b' },
  filterTextActive: { color: '#ffffff' },

  // Order List
  list: { paddingHorizontal: 16, paddingTop: 4, paddingBottom: 20 },
  noResults: { alignItems: 'center', paddingTop: 40, gap: 10 },
  noResultsText: { fontSize: 15, color: '#94a3b8', fontWeight: '600' },

  // Order Card
  orderCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#ffffff', borderRadius: 18,
    marginBottom: 12, overflow: 'hidden',
    ...CARD_SHADOW,
  },
  accentBar: { width: 4, alignSelf: 'stretch' },
  orderInfo: { flex: 1, padding: 16 },
  orderTopRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 4,
  },
  orderNo: { fontSize: 15, fontWeight: '800', color: '#0f172a' },
  statusTag: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20,
  },
  statusText: { fontSize: 12, fontWeight: '700' },
  orderDate: { fontSize: 12, color: '#94a3b8', fontWeight: '500', marginBottom: 8 },
  orderBottomRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  orderMeta: { fontSize: 13, color: '#64748b', fontWeight: '600' },
  orderTotal: { fontSize: 16, fontWeight: '900', color: '#0f172a' },
  chevronBtn: { paddingRight: 14 },
});
