import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Texas Locations for Visits
const TODAY_VISITS = [
  { id: '1', shop: 'Lone Star Warehouses', area: 'Downtown Dallas', time: '09:00 AM', status: 'Completed' },
  { id: '2', shop: 'Austin BBQ Grills', area: 'North Austin', time: '11:30 AM', status: 'Pending' },
  { id: '3', shop: 'Houston Oil Refineries', area: 'Port Area', time: '02:00 PM', status: 'Scheduled' },
];

export default function SalesmanDashboard() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* 1. Simple Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.dateText}>April 21, 2026</Text>
            <Text style={styles.welcomeText}>Howdy, Muneeb!</Text>
          </View>
          <TouchableOpacity style={styles.profileBtn}>
            <Ionicons name="person-circle-outline" size={28} color="#059669" />
          </TouchableOpacity>
        </View>

        {/* 2. Main Visit Status Card */}
        <View style={styles.statsContainer}>
          <View style={styles.mainStatCard}>
            <View style={styles.statInfo}>
              <Text style={styles.statLabel}>Daily Visit Progress</Text>
              <Text style={styles.statValue}>08 / 15</Text>
              <Text style={styles.statSubText}>Shops visited today</Text>
            </View>
            <View style={styles.iconCircle}>
              <Ionicons name="footsteps" size={30} color="#059669" />
            </View>
          </View>
        </View>

        {/* 3. The Only Important Action: Start Visit */}
        <View style={styles.actionSection}>
          <TouchableOpacity style={styles.checkInBtn} activeOpacity={0.8}>
            <Ionicons name="location" size={24} color="#fff" />
            <Text style={styles.checkInText}>Mark Shop Check-in</Text>
          </TouchableOpacity>
        </View>

        {/* 4. Visit Plan / History */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your Visit Schedule</Text>
          <Ionicons name="calendar-outline" size={20} color="#64748b" />
        </View>

        <View style={styles.visitList}>
          {TODAY_VISITS.map((visit) => (
            <View key={visit.id} style={styles.visitCard}>
              <View style={[styles.statusIndicator, visit.status === 'Completed' ? styles.bgEmerald : styles.bgSlate]} />
              <View style={styles.visitInfo}>
                <Text style={styles.shopName}>{visit.shop}</Text>
                <Text style={styles.shopArea}>{visit.area}</Text>
                <Text style={styles.visitTime}>{visit.time}</Text>
              </View>
              {visit.status === 'Completed' ? (
                <Ionicons name="checkmark-circle" size={24} color="#059669" />
              ) : (
                <TouchableOpacity style={styles.startBtn}>
                  <Text style={styles.startBtnText}>Start</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 25 },
  dateText: { fontSize: 12, color: '#64748b', fontWeight: '700', textTransform: 'uppercase' },
  welcomeText: { fontSize: 26, fontWeight: '900', color: '#1e293b' },
  profileBtn: { padding: 8, backgroundColor: '#fff', borderRadius: 12, elevation: 1 },

  statsContainer: { paddingHorizontal: 20, marginBottom: 20 },
  mainStatCard: { 
    backgroundColor: '#fff', 
    borderRadius: 24, 
    padding: 25, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  
  // Ye raha wo missing part:
  statInfo: { 
    flex: 1 
  },
  statLabel: { color: '#64748b', fontSize: 14, fontWeight: '600' },
  statValue: { color: '#1e293b', fontSize: 32, fontWeight: '900', marginVertical: 4 },
  statSubText: { color: '#059669', fontSize: 12, fontWeight: '700' },
  iconCircle: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#ecfdf5', justifyContent: 'center', alignItems: 'center' },

  actionSection: { paddingHorizontal: 20, marginBottom: 30 },
  checkInBtn: { 
    backgroundColor: '#059669', 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    padding: 20, 
    borderRadius: 20, 
    elevation: 4,
    shadowColor: '#059669',
    shadowOpacity: 0.3,
    shadowRadius: 10
  },
  checkInText: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginLeft: 10 },

  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 25, marginBottom: 15 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#1e293b' },

  visitList: { paddingHorizontal: 20, marginBottom: 20 },
  visitCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 18, borderRadius: 20, marginBottom: 12, borderWidth: 1, borderColor: '#f1f5f9' },
  statusIndicator: { width: 4, height: 45, borderRadius: 2, marginRight: 15 },
  bgEmerald: { backgroundColor: '#059669' },
  bgSlate: { backgroundColor: '#cbd5e1' },
  visitInfo: { flex: 1 },
  shopName: { fontSize: 16, fontWeight: '700', color: '#1e293b' },
  shopArea: { fontSize: 13, color: '#64748b', marginTop: 2 },
  visitTime: { fontSize: 11, color: '#059669', fontWeight: 'bold', marginTop: 4 },
  
  startBtn: { backgroundColor: '#f1f5f9', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 10 },
  startBtnText: { fontSize: 12, fontWeight: '800', color: '#1e293b' }
});