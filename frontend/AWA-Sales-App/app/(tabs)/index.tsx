import React from 'react';
import { useRouter } from 'expo-router'; // Router import kiya
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function Dashboard() {
  const router = useRouter(); // Router initialize kiya

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      {/* 1. Header Section */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.salesmanName}>Naveed Ahmed</Text>
        </View>
        <Image 
          source={{ uri: 'https://ui-avatars.com/api/?name=Naveed+Ahmed&background=059669&color=fff' }} 
          style={styles.profilePic} 
        />
      </View>

      {/* 2. Statistics Cards - Updated to Texas Currency ($) */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Total Orders Today</Text>
          <Text style={styles.statValue}>12</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: '#059669' }]}>
          <Text style={[styles.statLabel, { color: '#ecfdf5' }]}>Booked Amount</Text>
          <Text style={[styles.statValue, { color: '#fff' }]}>$1,450.00</Text>
        </View>
      </View>

      {/* 3. Main Action Buttons */}
      <View style={styles.actionsContainer}>
        {/* NEW ORDER BUTTON - Link Connected */}
        <TouchableOpacity 
          style={styles.mainActionButton}
          activeOpacity={0.8}
          onPress={() => router.push('/new-order')} 
        >
          <MaterialCommunityIcons name="cart-plus" size={32} color="#fff" />
          <Text style={styles.mainActionText}>New Order Booking</Text>
        </TouchableOpacity>

        <View style={styles.secondaryActionsRow}>
          {/* Add Customer - Link to Customers Tab */}
          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => router.push('/(tabs)/customers')}
          >
            <Ionicons name="person-add" size={24} color="#059669" />
            <Text style={styles.secondaryButtonText}>Add Shop</Text>
          </TouchableOpacity>

          {/* View Catalog - Link to Catalog Tab */}
          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => router.push('/(tabs)/catalog')}
          >
            <Ionicons name="book-outline" size={24} color="#059669" />
            <Text style={styles.secondaryButtonText}>Catalog</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 4. Middle Section - Quick Links */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Quick Access</Text>
        
        {/* Customer Directory Link */}
        <TouchableOpacity 
          style={styles.listItem}
          onPress={() => router.push('/(tabs)/customers')}
        >
          <View style={[styles.iconBox, { backgroundColor: '#f0fdf4' }]}>
            <Ionicons name="business" size={22} color="#059669" />
          </View>
          <View style={styles.listTextContainer}>
            <Text style={styles.listTitle}>Customer Directory</Text>
            <Text style={styles.listSubTitle}>View all Texas stores</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#cbd5e1" />
        </TouchableOpacity>

        {/* Recent Bookings Link */}
        <TouchableOpacity 
          style={styles.listItem}
          onPress={() => router.push('/(tabs)/orders')}
        >
          <View style={[styles.iconBox, { backgroundColor: '#eff6ff' }]}>
            <MaterialCommunityIcons name="history" size={22} color="#3b82f6" />
          </View>
          <View style={styles.listTextContainer}>
            <Text style={styles.listTitle}>Recent Bookings</Text>
            <Text style={styles.listSubTitle}>Status of your last orders</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#cbd5e1" />
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 25,
    backgroundColor: '#fff',
  },
  welcomeText: { fontSize: 14, color: '#64748b' },
  salesmanName: { fontSize: 22, fontWeight: 'bold', color: '#1e293b' },
  profilePic: { width: 50, height: 50, borderRadius: 25 },
  
  statsContainer: { flexDirection: 'row', padding: 15, gap: 15 },
  statCard: { 
    flex: 1, 
    backgroundColor: '#fff', 
    padding: 15, 
    borderRadius: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  statLabel: { fontSize: 12, color: '#64748b', marginBottom: 5 },
  statValue: { fontSize: 18, fontWeight: 'bold', color: '#1e293b' },

  actionsContainer: { padding: 15 },
  mainActionButton: {
    backgroundColor: '#059669',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 15,
    gap: 10,
    marginBottom: 15,
    elevation: 4,
    shadowColor: '#059669',
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  mainActionText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  secondaryActionsRow: { flexDirection: 'row', gap: 15 },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#dcfce7',
    gap: 8,
  },
  secondaryButtonText: { color: '#059669', fontWeight: '600' },

  sectionContainer: { padding: 15 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1e293b', marginBottom: 15 },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 1,
  },
  iconBox: { padding: 10, borderRadius: 10, marginRight: 15 },
  listTextContainer: { flex: 1 },
  listTitle: { fontSize: 16, fontWeight: '600', color: '#334155' },
  listSubTitle: { fontSize: 13, color: '#94a3b8' },
});