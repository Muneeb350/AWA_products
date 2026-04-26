import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SALESMAN_NAME = 'Muneeb Ahmed';

const VISIT_TYPES = ['Catalog Shown', 'Order Taken', 'Follow Up', 'Shop Closed'];

const RECENT_ORDERS = [
  { id: '1', shop: 'Dallas Mart', type: 'Order Taken', amount: '$1,200', time: '09:15 AM', status: 'Delivered' },
  { id: '2', shop: 'Austin Cleaners', type: 'Catalog Shown', amount: '$340', time: '10:40 AM', status: 'Pending' },
  { id: '3', shop: 'Houston Hub', type: 'Order Taken', amount: '$880', time: '12:05 PM', status: 'Delivered' },
  { id: '4', shop: 'Plano Depot', type: 'Follow Up', amount: '$0', time: '01:30 PM', status: 'Follow Up' },
  { id: '5', shop: 'Frisco Stop', type: 'Order Taken', amount: '$620', time: '03:10 PM', status: 'Pending' },
];

const STATUS_COLORS: Record<string, string> = {
  Delivered: '#059669',
  Pending: '#f59e0b',
  'Follow Up': '#3b82f6',
};

export default function SalesmanDashboard() {
  const [modalVisible, setModalVisible] = useState(false);
  const [shopName, setShopName] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedType, setSelectedType] = useState('Catalog Shown');

  const openModal = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setShopName('');
    setNotes('');
    setSelectedType('Catalog Shown');
  };

  const handleSaveVisit = () => {
    if (!shopName.trim()) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Alert.alert('Required', 'Please enter the shop name.');
      return;
    }
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert('Success', `${shopName} visit recorded!`);
    closeModal();
  };

  const handleTypeSelect = (type: string) => {
    Haptics.selectionAsync();
    setSelectedType(type);
  };

  const ListHeader = () => (
    <View>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.dateText}>
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </Text>
          <Text style={styles.welcomeText}>AWA Sales Team</Text>
          <Text style={styles.nameText}>{SALESMAN_NAME}</Text>
        </View>
        <TouchableOpacity
          style={styles.notifBtn}
          onPress={() => Haptics.selectionAsync()}
        >
          <Ionicons name="notifications-outline" size={22} color="#1e293b" />
          <View style={styles.notificationDot} />
        </TouchableOpacity>
      </View>

      {/* Progress Card */}
      <View style={styles.progressCard}>
        <Text style={styles.progressLabel}>Today's Target Progress</Text>
        <Text style={styles.progressValue}>08 / 15</Text>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: '53%' }]} />
        </View>
        <Text style={styles.progressSub}>53% of daily shops completed</Text>
      </View>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Ionicons name="cart-outline" size={22} color="#059669" />
          <Text style={styles.statValue}>38</Text>
          <Text style={styles.statLabel}>Total Orders</Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="time-outline" size={22} color="#f59e0b" />
          <Text style={styles.statValue}>12</Text>
          <Text style={styles.statLabel}>Pending Deliveries</Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="cash-outline" size={22} color="#3b82f6" />
          <Text style={styles.statValue}>$9.4k</Text>
          <Text style={styles.statLabel}>Monthly Revenue</Text>
        </View>
      </View>

      {/* Check-in Button */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.checkInBtn} activeOpacity={0.85} onPress={openModal}>
          <View style={styles.checkInIconCircle}>
            <Ionicons name="location" size={26} color="#059669" />
          </View>
          <View style={{ marginLeft: 14, flex: 1 }}>
            <Text style={styles.checkInText}>Mark New Check-in</Text>
            <Text style={styles.checkInSub}>Record your visit at a shop</Text>
          </View>
          <Ionicons name="chevron-forward" size={22} color="rgba(255,255,255,0.45)" />
        </TouchableOpacity>
      </View>

      {/* Recent Activities Title */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Activities</Text>
      </View>
    </View>
  );

  const renderOrder = ({ item }: { item: typeof RECENT_ORDERS[0] }) => (
    <TouchableOpacity
      style={styles.orderCard}
      activeOpacity={0.8}
      onPress={() => Haptics.selectionAsync()}
    >
      <View style={styles.orderLeft}>
        <View style={[styles.orderDot, { backgroundColor: STATUS_COLORS[item.status] ?? '#64748b' }]} />
        <View>
          <Text style={styles.orderShop}>{item.shop}</Text>
          <Text style={styles.orderType}>{item.type} · {item.time}</Text>
        </View>
      </View>
      <View style={styles.orderRight}>
        <Text style={styles.orderAmount}>{item.amount}</Text>
        <View style={[styles.statusBadge, { backgroundColor: `${STATUS_COLORS[item.status]}18` ?? '#f1f5f9' }]}>
          <Text style={[styles.statusText, { color: STATUS_COLORS[item.status] ?? '#64748b' }]}>
            {item.status}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={RECENT_ORDERS}
        keyExtractor={(item) => item.id}
        renderItem={renderOrder}
        ListHeaderComponent={ListHeader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />

      {/* Visit Log Modal — outside FlatList, no nesting */}
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Visit Details</Text>
              <TouchableOpacity onPress={closeModal}>
                <Ionicons name="close-circle" size={30} color="#cbd5e1" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
              <Text style={styles.inputLabel}>Shop Name</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. Austin Cleaners"
                placeholderTextColor="#94a3b8"
                value={shopName}
                onChangeText={setShopName}
              />

              <Text style={styles.inputLabel}>Visit Purpose</Text>
              <View style={styles.typeGrid}>
                {VISIT_TYPES.map((type) => (
                  <TouchableOpacity
                    key={type}
                    onPress={() => handleTypeSelect(type)}
                    style={[styles.typeBtn, selectedType === type && styles.typeBtnActive]}
                  >
                    <Text style={[styles.typeBtnText, selectedType === type && styles.typeBtnTextActive]}>
                      {type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.inputLabel}>Notes (Optional)</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Write something about the visit..."
                placeholderTextColor="#94a3b8"
                multiline
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  listContent: { paddingBottom: 30 },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: 16,
  },
  dateText: {
    fontSize: 11,
    color: '#059669',
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  welcomeText: { fontSize: 13, color: '#64748b', fontWeight: '600' },
  nameText: { fontSize: 24, fontWeight: '900', color: '#1e293b', marginTop: 2 },
  notifBtn: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ef4444',
    borderWidth: 1.5,
    borderColor: '#fff',
  },

  progressCard: {
    marginHorizontal: 20,
    backgroundColor: '#059669',
    borderRadius: 24,
    padding: 22,
    marginBottom: 18,
    elevation: 4,
    shadowColor: '#059669',
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  progressLabel: { color: '#d1fae5', fontSize: 13, fontWeight: '600' },
  progressValue: { color: '#fff', fontSize: 36, fontWeight: '900', marginVertical: 6 },
  progressBarBg: { height: 8, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 4, marginTop: 4 },
  progressBarFill: { height: 8, backgroundColor: '#fff', borderRadius: 4 },
  progressSub: { color: '#d1fae5', fontSize: 12, marginTop: 10, fontWeight: '500' },

  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f1f5f9',
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
  },
  statValue: { fontSize: 20, fontWeight: '900', color: '#1e293b', marginTop: 8 },
  statLabel: { fontSize: 10, color: '#64748b', fontWeight: '700', textAlign: 'center', marginTop: 4 },

  section: { paddingHorizontal: 20, marginBottom: 16 },
  sectionTitle: { fontSize: 17, fontWeight: '800', color: '#1e293b' },

  checkInBtn: {
    backgroundColor: '#1e293b',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    borderRadius: 22,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  checkInIconCircle: { backgroundColor: '#fff', padding: 10, borderRadius: 14 },
  checkInText: { color: '#fff', fontSize: 16, fontWeight: '800' },
  checkInSub: { color: '#94a3b8', fontSize: 12, marginTop: 2 },

  orderCard: {
    marginHorizontal: 20,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f1f5f9',
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
  },
  orderLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  orderDot: { width: 10, height: 10, borderRadius: 5, marginRight: 12 },
  orderShop: { fontSize: 15, fontWeight: '800', color: '#1e293b' },
  orderType: { fontSize: 12, color: '#94a3b8', marginTop: 2 },
  orderRight: { alignItems: 'flex-end' },
  orderAmount: { fontSize: 15, fontWeight: '800', color: '#1e293b' },
  statusBadge: { marginTop: 5, paddingHorizontal: 10, paddingVertical: 3, borderRadius: 10 },
  statusText: { fontSize: 11, fontWeight: '700' },

  modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.45)' },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    maxHeight: '88%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: { fontSize: 22, fontWeight: '900', color: '#1e293b' },
  inputLabel: { fontSize: 14, fontWeight: '800', color: '#475569', marginBottom: 10, marginTop: 18 },
  input: {
    backgroundColor: '#f1f5f9',
    borderRadius: 16,
    padding: 14,
    fontSize: 15,
    color: '#1e293b',
  },
  textArea: { height: 100, textAlignVertical: 'top' },
  typeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  typeBtn: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  typeBtnActive: { backgroundColor: '#059669', borderColor: '#059669' },
  typeBtnText: { color: '#64748b', fontWeight: '700', fontSize: 13 },
  typeBtnTextActive: { color: '#fff' },
  saveBtn: {
    backgroundColor: '#059669',
    padding: 18,
    borderRadius: 18,
    marginTop: 28,
    alignItems: 'center',
    marginBottom: 16,
  },
  saveBtnText: { color: '#fff', fontSize: 17, fontWeight: '800' },
});
