import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput, 
  Modal, ScrollView, KeyboardAvoidingView, Platform, Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Top USA Cities for the Dropdown
const USA_CITIES = [
  "New York, NY", "Los Angeles, CA", "Chicago, IL", "Houston, TX", 
  "Phoenix, AZ", "Philadelphia, PA", "San Antonio, TX", "San Diego, CA", 
  "Dallas, TX", "Austin, TX", "Miami, FL", "Atlanta, GA", "Boston, MA",
  "San Francisco, CA", "Seattle, WA", "Denver, CO"
].sort();

const INITIAL_CUSTOMERS = [
  { id: 'CUS-1001', name: 'James Carter', business: 'Carter & Co.', phone: '+1 214 000 1234', area: 'Dallas, TX', address: '1234 Elm St', status: 'Active' },
];

export default function CustomersScreen() {
  const [search, setSearch] = useState('');
  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS);
  
  // Modals Visibility
  const [modalVisible, setModalVisible] = useState(false);
  const [cityModalVisible, setCityModalVisible] = useState(false);

  // Form States
  const [fullName, setFullName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Select City');
  const [citySearch, setCitySearch] = useState('');
  const [address, setAddress] = useState('');
  const [generatedId, setGeneratedId] = useState('');

  // Auto-generate ID when modal opens
  useEffect(() => {
    if (modalVisible) {
      const newId = `CUS-${Math.floor(1000 + Math.random() * 9000)}`;
      setGeneratedId(newId);
    }
  }, [modalVisible]);

  const filteredCities = USA_CITIES.filter(c => 
    c.toLowerCase().includes(citySearch.toLowerCase())
  );

  const handleAddCustomer = () => {
    // Basic Validation
    if (!fullName || !phone || city === 'Select City') {
      Alert.alert("Missing Fields", "Please fill all required fields (*) and select a city.");
      return;
    }

    const newCust = {
      id: generatedId,
      name: fullName,
      business: businessName || 'N/A',
      phone: phone,
      area: city,
      address: address || 'N/A',
      status: 'Active',
    };

    // Update Local List
    setCustomers([newCust, ...customers]);
    
    // Close Modal
    setModalVisible(false);
    
    // 1. SHOW SUCCESS MESSAGE
    Alert.alert(
      "Success ✅",
      "Customer Added Successfully!",
      [{ text: "OK" }]
    );

    // Reset Form
    setFullName(''); 
    setBusinessName(''); 
    setPhone(''); 
    setAddress(''); 
    setCity('Select City');
  };

  const renderCustomer = ({ item }: { item: typeof INITIAL_CUSTOMERS[0] }) => (
    <View style={styles.card}>
      <View style={styles.cardMain}>
        <View style={styles.avatarBox}><Text style={styles.avatarText}>{item.name.charAt(0)}</Text></View>
        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.businessText}>{item.business}</Text>
          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={12} color="#94a3b8" />
            <Text style={styles.locationText}>{item.area}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.callBtn} onPress={() => Alert.alert("Calling...", `Dialing ${item.phone}`)}>
          <Ionicons name="call" size={18} color="#059669" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Customers</Text>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#94a3b8" />
          <TextInput placeholder="Search store name..." style={styles.input} value={search} onChangeText={setSearch} />
        </View>
      </View>

      <FlatList 
        data={customers.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))}
        renderItem={renderCustomer}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />

      {/* FAB Button to open Modal */}
      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
        <Ionicons name="person-add" size={24} color="#fff" />
      </TouchableOpacity>

      {/* MAIN ADD CUSTOMER MODAL */}
      <Modal visible={modalVisible} animationType="slide" transparent={true} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View style={styles.headerIconTitle}>
                <View style={styles.plusIconBg}><Ionicons name="person-add" size={20} color="#059669" /></View>
                <View style={{marginLeft: 12}}>
                  <Text style={styles.modalTitleText}>Add Customer</Text>
                  <Text style={styles.modalSubTitle}>Fill in the customer's details below</Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => setModalVisible(false)}><Ionicons name="close" size={24} color="#94a3b8" /></TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={{padding: 20}}>
              <Text style={styles.label}>Customer ID <Text style={styles.optional}>(auto-generated)</Text></Text>
              <View style={styles.disabledInput}><Text style={{color: '#64748b'}}>{generatedId}</Text><Ionicons name="refresh" size={18} color="#94a3b8" /></View>

              <View style={styles.row}>
                <View style={{flex: 1, marginRight: 10}}>
                  <Text style={styles.label}>Full Name <Text style={{color: '#ef4444'}}>*</Text></Text>
                  <TextInput style={styles.formInput} placeholder="e.g. James Carter" value={fullName} onChangeText={setFullName} />
                </View>
                <View style={{flex: 1}}>
                  <Text style={styles.label}>Business Name <Text style={styles.optional}>(optional)</Text></Text>
                  <TextInput style={styles.formInput} placeholder="e.g. Carter & Co." value={businessName} onChangeText={setBusinessName} />
                </View>
              </View>

              <View style={styles.row}>
                <View style={{flex: 1, marginRight: 10}}>
                  <Text style={styles.label}>Phone <Text style={{color: '#ef4444'}}>*</Text></Text>
                  <TextInput style={styles.formInput} placeholder="+1 214 000 1234" keyboardType="phone-pad" value={phone} onChangeText={setPhone} />
                </View>
                <View style={{flex: 1}}>
                  <Text style={styles.label}>City / Area <Text style={{color: '#ef4444'}}>*</Text></Text>
                  <TouchableOpacity style={styles.formInput} onPress={() => setCityModalVisible(true)}>
                    <Text style={{color: city === 'Select City' ? '#94a3b8' : '#1e293b'}} numberOfLines={1}>{city}</Text>
                    <Ionicons name="chevron-down" size={18} color="#94a3b8" />
                  </TouchableOpacity>
                </View>
              </View>

              <Text style={styles.label}>Address <Text style={styles.optional}>(optional)</Text></Text>
              <TextInput style={[styles.formInput, {height: 80, textAlignVertical: 'top'}]} multiline placeholder="e.g. 1234 Elm St, Suite 5" value={address} onChangeText={setAddress} />

              <View style={styles.modalFooter}>
                <TouchableOpacity style={styles.cancelBtn} onPress={() => setModalVisible(false)}><Text style={styles.cancelBtnText}>Cancel</Text></TouchableOpacity>
                <TouchableOpacity style={styles.submitBtn} onPress={handleAddCustomer}><Text style={styles.submitBtnText}>Add Customer</Text></TouchableOpacity>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </Modal>

      {/* SUB-MODAL FOR CITY PICKER */}
      <Modal visible={cityModalVisible} animationType="fade" transparent={true} onRequestClose={() => setCityModalVisible(false)}>
        <View style={styles.cityModalOverlay}>
          <View style={styles.cityModalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitleText}>Select City</Text>
              <TouchableOpacity onPress={() => setCityModalVisible(false)}><Ionicons name="close" size={24} color="#94a3b8" /></TouchableOpacity>
            </View>
            <View style={{padding: 15}}>
              <View style={[styles.searchBar, {backgroundColor: '#f8fafc', borderWidth: 1, borderColor: '#e2e8f0'}]}>
                <Ionicons name="search" size={18} color="#94a3b8" />
                <TextInput placeholder="Search USA cities..." style={styles.input} value={citySearch} onChangeText={setCitySearch} />
              </View>
            </View>
            <FlatList
              data={filteredCities}
              keyExtractor={item => item}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.cityItem} 
                  onPress={() => { setCity(item); setCityModalVisible(false); setCitySearch(''); }}
                >
                  <Text style={[styles.cityItemText, city === item && {color: '#059669', fontWeight: 'bold'}]}>{item}</Text>
                  {city === item && <Ionicons name="checkmark-circle" size={20} color="#059669" />}
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { backgroundColor: '#fff', padding: 20, paddingTop: 60, borderBottomLeftRadius: 30, borderBottomRightRadius: 30, elevation: 2 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1e293b', marginBottom: 15 },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f1f5f9', paddingHorizontal: 15, borderRadius: 15, height: 50 },
  input: { flex: 1, marginLeft: 10, fontSize: 16 },
  list: { padding: 20, paddingBottom: 100 },
  card: { backgroundColor: '#fff', borderRadius: 20, padding: 15, marginBottom: 12, elevation: 1 },
  cardMain: { flexDirection: 'row', alignItems: 'center' },
  avatarBox: { width: 45, height: 45, borderRadius: 12, backgroundColor: '#dcfce7', justifyContent: 'center', alignItems: 'center' },
  avatarText: { fontSize: 18, fontWeight: 'bold', color: '#059669' },
  info: { flex: 1, marginLeft: 12 },
  name: { fontSize: 15, fontWeight: 'bold', color: '#1e293b' },
  businessText: { fontSize: 12, color: '#64748b' },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  locationText: { fontSize: 11, color: '#94a3b8', marginLeft: 4 },
  callBtn: { width: 35, height: 35, borderRadius: 10, backgroundColor: '#f0fdf4', justifyContent: 'center', alignItems: 'center' },
  fab: { position: 'absolute', bottom: 30, right: 20, backgroundColor: '#059669', width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', elevation: 5 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 20 },
  modalContent: { backgroundColor: '#fff', borderRadius: 25, overflow: 'hidden', maxHeight: '90%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, borderBottomWidth: 1, borderBottomColor: '#f1f5f9', alignItems: 'center' },
  headerIconTitle: { flexDirection: 'row', alignItems: 'center' },
  plusIconBg: { backgroundColor: '#dcfce7', padding: 10, borderRadius: 10 },
  modalTitleText: { fontSize: 18, fontWeight: 'bold', color: '#1e293b' },
  modalSubTitle: { fontSize: 13, color: '#94a3b8' },
  label: { fontSize: 13, fontWeight: '600', color: '#475569', marginBottom: 8, marginTop: 15 },
  optional: { fontWeight: '400', color: '#94a3b8' },
  disabledInput: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f8fafc', padding: 12, borderRadius: 10, borderWidth: 1, borderColor: '#e2e8f0' },
  formInput: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: '#e2e8f0', padding: 12, borderRadius: 10, minHeight: 48 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  modalFooter: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 30, marginBottom: 20, gap: 10 },
  cancelBtn: { paddingVertical: 12, paddingHorizontal: 20, borderRadius: 10, borderWidth: 1, borderColor: '#e2e8f0' },
  cancelBtnText: { color: '#475569', fontWeight: '600' },
  submitBtn: { backgroundColor: '#059669', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 10 },
  submitBtnText: { color: '#fff', fontWeight: 'bold' },
  cityModalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
  cityModalContent: { backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30, height: '70%' },
  cityItem: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  cityItemText: { fontSize: 16, color: '#334155' }
});