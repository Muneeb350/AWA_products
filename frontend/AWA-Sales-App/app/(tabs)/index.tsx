import React from 'react';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function Dashboard() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      {/* 1. PREMIUM HEADER */}
      <View style={styles.headerGradient}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.welcomeText}>Saturday, April 18</Text>
            <Text style={styles.salesmanName}>Hi, Naveed Ahmed! 👋</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/(tabs)/profile')}>
            <Image 
              source={{ uri: 'https://ui-avatars.com/api/?name=Naveed+Ahmed&background=dcfce7&color=059669&bold=true' }} 
              style={styles.profilePic} 
            />
          </TouchableOpacity>
        </View>

        {/* 2. TARGET CARD (Visual Highlight) */}
        <View style={styles.targetCard}>
          <View>
            <Text style={styles.targetTitle}>Monthly Target</Text>
            <Text style={styles.targetAmount}>$12,450 / <Text style={{fontSize: 14, color: '#94a3b8'}}>$20,000</Text></Text>
          </View>
          <View style={styles.progressCircle}>
            <Text style={styles.progressText}>62%</Text>
          </View>
        </View>
      </View>

      {/* 3. QUICK STATS (Row) */}
      <View style={styles.statsRow}>
        <View style={styles.miniStat}>
          <Ionicons name="cart" size={20} color="#059669" />
          <Text style={styles.miniStatValue}>12</Text>
          <Text style={styles.miniStatLabel}>Orders Today</Text>
        </View>
        <View style={styles.miniStat}>
          <Ionicons name="trending-up" size={20} color="#3b82f6" />
          <Text style={styles.miniStatValue}>$1.4k</Text>
          <Text style={styles.miniStatLabel}>Earnings</Text>
        </View>
        <View style={styles.miniStat}>
          <Ionicons name="people" size={20} color="#8b5cf6" />
          <Text style={styles.miniStatValue}>45</Text>
          <Text style={styles.miniStatLabel}>Clients</Text>
        </View>
      </View>

      {/* 4. MAIN ACTIONS GRID */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Business Actions</Text>
        
        <View style={styles.grid}>
          {/* New Order - Large Card */}
          <TouchableOpacity 
            style={[styles.gridCard, { width: '100%', backgroundColor: '#059669' }]}
            onPress={() => router.push('/new-order')}
          >
            <MaterialCommunityIcons name="plus-circle" size={40} color="#fff" />
            <View style={{marginLeft: 15}}>
              <Text style={[styles.gridCardTitle, {color: '#fff'}]}>New Order Booking</Text>
              <Text style={{color: '#d1fae5', fontSize: 12}}>Create invoice for Texas clients</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#fff" style={{marginLeft: 'auto'}} />
          </TouchableOpacity>

          {/* Secondary Grid Items */}
          <TouchableOpacity 
            style={styles.gridCardSmall}
            onPress={() => router.push('/(tabs)/customers')}
          >
            <View style={[styles.iconCircle, {backgroundColor: '#f0fdf4'}]}>
              <Ionicons name="person-add" size={24} color="#059669" />
            </View>
            <Text style={styles.smallCardTitle}>Add Shop</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.gridCardSmall}
            onPress={() => router.push('/(tabs)/catalog')}
          >
            <View style={[styles.iconCircle, {backgroundColor: '#eff6ff'}]}>
              <Ionicons name="book" size={24} color="#3b82f6" />
            </View>
            <Text style={styles.smallCardTitle}>Catalog</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 5. RECENT ACTIVITY PREVIEW */}
      <View style={styles.sectionContainer}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15}}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/orders')}>
            <Text style={{color: '#059669', fontWeight: '600'}}>View All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.activityItem}>
          <View style={[styles.dot, {backgroundColor: '#f59e0b'}]} />
          <Text style={styles.activityText}>Pending: <Text style={{fontWeight: 'bold'}}>Big Tex Gas Station</Text></Text>
          <Text style={styles.activityTime}>2m ago</Text>
        </View>
        <View style={styles.activityItem}>
          <View style={[styles.dot, {backgroundColor: '#059669'}]} />
          <Text style={styles.activityText}>Delivered: <Text style={{fontWeight: 'bold'}}>Lonestar Store</Text></Text>
          <Text style={styles.activityTime}>1h ago</Text>
        </View>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  headerGradient: {
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
  },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 },
  welcomeText: { fontSize: 14, color: '#94a3b8', fontWeight: '600' },
  salesmanName: { fontSize: 24, fontWeight: 'bold', color: '#1e293b' },
  profilePic: { width: 50, height: 50, borderRadius: 15, borderWidth: 2, borderColor: '#f1f5f9' },
  
  targetCard: { 
    backgroundColor: '#1e293b', 
    borderRadius: 20, 
    padding: 20, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  targetTitle: { color: '#94a3b8', fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase' },
  targetAmount: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginTop: 5 },
  progressCircle: { 
    width: 60, height: 60, borderRadius: 30, borderWidth: 5, borderColor: '#059669', 
    justifyContent: 'center', alignItems: 'center', backgroundColor: '#334155' 
  },
  progressText: { color: '#fff', fontSize: 14, fontWeight: 'bold' },

  statsRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: -20 },
  miniStat: { 
    backgroundColor: '#fff', width: (width - 60) / 3, padding: 15, borderRadius: 20, 
    alignItems: 'center', elevation: 10, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10 
  },
  miniStatValue: { fontSize: 16, fontWeight: 'bold', color: '#1e293b', marginTop: 5 },
  miniStatLabel: { fontSize: 10, color: '#94a3b8', fontWeight: '600' },

  sectionContainer: { padding: 20, marginTop: 10 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1e293b' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 15 },
  gridCard: { 
    flexDirection: 'row', alignItems: 'center', padding: 20, borderRadius: 20, marginBottom: 15,
    elevation: 4, shadowColor: '#059669', shadowOpacity: 0.2 
  },
  gridCardTitle: { fontSize: 18, fontWeight: 'bold' },
  gridCardSmall: { 
    backgroundColor: '#fff', width: '48%', padding: 20, borderRadius: 25, 
    alignItems: 'center', elevation: 2, shadowColor: '#000', shadowOpacity: 0.05 
  },
  iconCircle: { width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  smallCardTitle: { fontSize: 14, fontWeight: 'bold', color: '#475569' },

  activityItem: { 
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', 
    padding: 15, borderRadius: 15, marginBottom: 10 
  },
  dot: { width: 10, height: 10, borderRadius: 5, marginRight: 15 },
  activityText: { flex: 1, fontSize: 14, color: '#475569' },
  activityTime: { fontSize: 12, color: '#94a3b8' }
});