import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal, TextInput, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const VISIT_TYPES = ['Catalog Shown', 'Order Taken', 'Follow Up', 'Shop Closed'];

export default function SalesmanDashboard() {
  const [modalVisible, setModalVisible] = useState(false);
  const [shopName, setShopName] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedType, setSelectedType] = useState('Catalog Shown');

  const handleSaveVisit = () => {
    if (!shopName) {
      Alert.alert("Error", "Please fill all the Required Fields!");
      return;
    }

    const visitData = {
      shop: shopName,
      type: selectedType,
      notes: notes,
      time: new Date().toLocaleTimeString(),
    };

    console.log("Saving Visit:", visitData);
    Alert.alert("Success", `${shopName} Record Saved Successfully!`);

    setModalVisible(false);
    setShopName('');
    setNotes('');
    setSelectedType('Catalog Shown');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        // 1. Professional Header
        <View style={styles.header}>
          <View>
            <Text style={styles.dateText}>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</Text>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.nameText}>Muneeb Ahmed</Text>
          </View>
          <TouchableOpacity style={styles.profileBtn}>
            <Ionicons name="notifications-outline" size={22} color="#1e293b" />
            {/* Optional: Chota sa red dot notification ke liye */}
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>
        {/* 2. Main Progress Card (Emerald Green Theme) */}
        <View style={styles.statsContainer}>
          <View style={styles.mainStatCard}>
            <View style={styles.statInfo}>
              <Text style={styles.statLabel}>Today's Target Progress</Text>
              <Text style={styles.statValue}>08 / 15</Text>

              {/* Progress Bar */}
              <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: '53%' }]} />
              </View>

              <Text style={styles.statSubText}>You have completed 53% of your daily shops.</Text>
            </View>
          </View>
        </View>

        {/* 3. Stats Grid (New Added) */}
        <View style={styles.statsGrid}>
          <View style={styles.miniStatBox}>
            <Ionicons name="time-outline" size={20} color="#059669" />
            <Text style={styles.miniStatValue}>4.5h</Text>
            <Text style={styles.miniStatLabel}>Active Time</Text>
          </View>
          <View style={styles.miniStatBox}>
            <Ionicons name="cart-outline" size={20} color="#059669" />
            <Text style={styles.miniStatValue}>12</Text>
            <Text style={styles.miniStatLabel}>Orders</Text>
          </View>
        </View>

        {/* 3.5 Quick Summary Section (New) */}
        <View style={styles.summarySection}>
          <Text style={styles.sectionTitle}>Performance Insights</Text>
          <View style={styles.summaryRow}>

            {/* Top Shop Card */}
            <View style={[styles.summaryCard, { borderLeftColor: '#f59e0b' }]}>
              <View style={styles.summaryIconBox}>
                <Ionicons name="trophy-outline" size={20} color="#f59e0b" />
              </View>
              <Text style={styles.summaryLabel}>Top Shop</Text>
              <Text style={styles.summaryValue} numberOfLines={1}>Dallas Mart</Text>
              <Text style={styles.summarySub}>$1,200 total</Text>
            </View>

            {/* Last Visit Card */}
            <View style={[styles.summaryCard, { borderLeftColor: '#3b82f6' }]}>
              <View style={styles.summaryIconBox}>
                <Ionicons name="time-outline" size={20} color="#3b82f6" />
              </View>
              <Text style={styles.summaryLabel}>Last Visit</Text>
              <Text style={styles.summaryValue} numberOfLines={1}>Austin Clean</Text>
              <Text style={styles.summarySub}>12 mins ago</Text>
            </View>

          </View>
        </View>

        {/* 4. Main Action Button (Check-in) */}
        <View style={styles.actionSection}>
          <Text style={styles.sectionTitle}>Main Action</Text>
          <TouchableOpacity
            style={styles.checkInBtn}
            activeOpacity={0.8}
            onPress={() => setModalVisible(true)}
          >
            <View style={styles.checkInIconCircle}>
              <Ionicons name="location" size={28} color="#059669" />
            </View>
            <View style={{ marginLeft: 15 }}>
              <Text style={styles.checkInText}>Mark New Check-in</Text>
              <Text style={styles.checkInSubText}>Record your visit at shop</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="rgba(255,255,255,0.5)" style={{ marginLeft: 'auto' }} />
          </TouchableOpacity>
        </View>

        {/* 5. Visit Log Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.modalOverlay}
          >
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Visit Details</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Ionicons name="close-circle" size={32} color="#cbd5e1" />
                </TouchableOpacity>
              </View>

              <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.label}>Shop Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. Austin Cleaners"
                  value={shopName}
                  onChangeText={setShopName}
                />

                <Text style={styles.label}>Visit Purpose</Text>
                <View style={styles.typeGrid}>
                  {VISIT_TYPES.map((type) => (
                    <TouchableOpacity
                      key={type}
                      onPress={() => setSelectedType(type)}
                      style={[styles.typeBtn, selectedType === type && styles.typeBtnActive]}
                    >
                      <Text style={[styles.typeBtnText, selectedType === type && styles.typeBtnTextActive]}>{type}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <Text style={styles.label}>Visit Notes (Optional)</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Write something about the visit..."
                  multiline={true}
                  value={notes}
                  onChangeText={setNotes}
                />

                <TouchableOpacity style={styles.saveBtn} onPress={handleSaveVisit}>
                  <Text style={styles.saveBtnText}>Submit Visit Record</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </KeyboardAvoidingView>
        </Modal>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'flex-start', // Start par align karne se zyada clean lagta hai
    paddingHorizontal: 25,
    paddingTop: 20,
    paddingBottom: 10
  },
  dateText: { 
    fontSize: 11, 
    color: '#059669', // Emerald Green for date
    fontWeight: '800', 
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4
  },
  welcomeText: { 
    fontSize: 16, 
    color: '#64748b', 
    fontWeight: '500' 
  },
  nameText: { 
    fontSize: 24, 
    fontWeight: '900', 
    color: '#1e293b',
    marginTop: -2 // Thora sa gap kam karne ke liye
  },
  profileBtn: { 
    padding: 10, 
    backgroundColor: '#fff', 
    borderRadius: 14, 
    elevation: 2, 
    shadowColor: '#000', 
    shadowOpacity: 0.05,
    position: 'relative'
  },
  notificationDot: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ef4444', // Red dot
    borderWidth: 1.5,
    borderColor: '#fff'
  },
  notifBtn: { backgroundColor: '#fff', padding: 10, borderRadius: 12, elevation: 1 },

  statsContainer: { paddingHorizontal: 20, marginBottom: 15 },
  mainStatCard: { backgroundColor: '#059669', borderRadius: 28, padding: 25, elevation: 5, shadowColor: '#059669', shadowOpacity: 0.2 },
  statInfo: { width: '100%' },
  statLabel: { color: '#d1fae5', fontSize: 14, fontWeight: '600' },
  statValue: { color: '#fff', fontSize: 38, fontWeight: '900', marginVertical: 6 },
  progressBarBg: { height: 8, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 4, marginTop: 10 },
  progressBarFill: { height: 8, backgroundColor: '#fff', borderRadius: 4 },
  statSubText: { color: '#d1fae5', fontSize: 12, marginTop: 15, fontWeight: '500' },

  statsGrid: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 25 },
  miniStatBox: { width: '48%', backgroundColor: '#fff', padding: 15, borderRadius: 20, borderWidth: 1, borderColor: '#f1f5f9' },
  miniStatValue: { fontSize: 18, fontWeight: '900', color: '#1e293b', marginTop: 8 },
  miniStatLabel: { fontSize: 12, color: '#64748b', fontWeight: '600' },

  actionSection: { paddingHorizontal: 20, marginBottom: 30 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#1e293b', marginBottom: 15 },
  checkInBtn: { backgroundColor: '#1e293b', flexDirection: 'row', alignItems: 'center', padding: 20, borderRadius: 24, elevation: 3 },
  checkInIconCircle: { backgroundColor: '#fff', padding: 10, borderRadius: 16 },
  checkInText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  checkInSubText: { color: '#94a3b8', fontSize: 12 },
  summarySection: { paddingHorizontal: 20, marginBottom: 25 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between' },
  summaryCard: { width: '48%', backgroundColor: '#fff', padding: 15, borderRadius: 20, borderLeftWidth: 5, elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, },
  summaryIconBox: { marginBottom: 8 },
  summaryLabel: { fontSize: 11, color: '#64748b', fontWeight: '700', textTransform: 'uppercase' },
  summaryValue: { fontSize: 16, fontWeight: '800', color: '#1e293b', marginTop: 2 },
  summarySub: { fontSize: 11, color: '#94a3b8', marginTop: 4 },

  // Modal Styles
  modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { backgroundColor: '#fff', borderTopLeftRadius: 35, borderTopRightRadius: 35, padding: 25, maxHeight: '85%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 22, fontWeight: '900', color: '#1e293b' },
  label: { fontSize: 15, fontWeight: '800', color: '#475569', marginBottom: 10, marginTop: 20 },
  input: { backgroundColor: '#f1f5f9', borderRadius: 15, padding: 15, fontSize: 16, color: '#1e293b' },
  textArea: { height: 100, textAlignVertical: 'top' },
  typeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  typeBtn: { paddingHorizontal: 15, paddingVertical: 10, borderRadius: 12, backgroundColor: '#fff', borderWidth: 1, borderColor: '#e2e8f0' },
  typeBtnActive: { backgroundColor: '#059669', borderColor: '#059669' },
  typeBtnText: { color: '#64748b', fontWeight: '700', fontSize: 13 },
  typeBtnTextActive: { color: '#fff' },
  saveBtn: { backgroundColor: '#059669', padding: 20, borderRadius: 18, marginTop: 30, alignItems: 'center', marginBottom: 20 },
  saveBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },

  
});