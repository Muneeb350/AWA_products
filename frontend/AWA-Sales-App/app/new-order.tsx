import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal, FlatList, Alert } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const CUSTOMERS = [
  { id: '1', name: 'Lonestar Convenience Store', area: 'Houston, TX' },
  { id: '2', name: 'Austin Family Mart', area: 'Austin, TX' },
  { id: '3', name: 'Big Tex Gas Station', area: 'Dallas, TX' },
  { id: '4', name: 'Southwest Grocery', area: 'San Antonio, TX' },
  { id: '5', name: 'Ranch Supply Co.', area: 'Fort Worth, TX' },
];

const PRODUCTS = [
  { id: '1', name: 'Ultra-Shine Glass Cleaner', price: 24.99 },
  { id: '2', name: 'Heavy Duty Degreaser (5G)', price: 89.00 },
  { id: '3', name: 'Microfiber Towel Pack', price: 15.50 },
];

export default function NewOrderScreen() {
  const router = useRouter();
  const [selectedCustomer, setSelectedCustomer] = useState<typeof CUSTOMERS[0] | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [cart, setCart] = useState<{id: string, name: string, qty: number, price: number}[]>([]);
  
  const TAX_RATE = 0.0825; 

  // --- Quantity Logic ---
  const updateQuantity = (product: typeof PRODUCTS[0], change: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      
      if (existing) {
        const newQty = existing.qty + change;
        if (newQty <= 0) {
          return prev.filter(item => item.id !== product.id); // Cart se hata do agar 0 ho jaye
        }
        return prev.map(item => item.id === product.id ? {...item, qty: newQty} : item);
      }
      
      if (change > 0) {
        return [...prev, { ...product, qty: 1 }]; // Naya item add karo
      }
      return prev;
    });
  };

  const getItemQty = (id: string) => {
    return cart.find(item => item.id === id)?.qty || 0;
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  // --- Validation Alert Logic ---
  const handleCompleteBooking = () => {
    if (!selectedCustomer) {
      Alert.alert("Missing Information", "Please select a customer first.");
      return;
    }
    if (cart.length === 0) {
      Alert.alert("Empty Cart", "Please add at least one product to book an order.");
      return;
    }
    
    Alert.alert("Order Confirmed", `Success! Order for ${selectedCustomer.name} has been placed.`);
    router.back();
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Order Booking' }} />

      <ScrollView style={styles.content}>
        {/* 1. CUSTOMER SELECTION */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Customer</Text>
          <TouchableOpacity 
            style={[styles.selector, selectedCustomer && styles.selectorActive]} 
            onPress={() => setIsModalVisible(true)}
          >
            <Ionicons name="business" size={20} color={selectedCustomer ? "#059669" : "#64748b"} />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={[styles.selectorText, selectedCustomer && styles.selectedName]}>
                {selectedCustomer ? selectedCustomer.name : "Select Store..."}
              </Text>
            </View>
            <Ionicons name="chevron-down" size={20} color="#94a3b8" />
          </TouchableOpacity>
        </View>

        {/* 2. PRODUCTS WITH QTY BUTTONS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Select Products</Text>
          {PRODUCTS.map(item => (
            <View key={item.id} style={styles.productRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.pName}>{item.name}</Text>
                <Text style={styles.pPrice}>${item.price.toFixed(2)}</Text>
              </View>
              
              <View style={styles.qtyContainer}>
                <TouchableOpacity onPress={() => updateQuantity(item, -1)} style={styles.qtyBtn}>
                  <Ionicons name="remove-circle-outline" size={24} color="#ef4444" />
                </TouchableOpacity>
                
                <Text style={styles.qtyText}>{getItemQty(item.id)}</Text>
                
                <TouchableOpacity onPress={() => updateQuantity(item, 1)} style={styles.qtyBtn}>
                  <Ionicons name="add-circle-outline" size={24} color="#059669" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* 3. ORDER SUMMARY */}
        {cart.length > 0 && (
          <View style={styles.summaryBox}>
            <Text style={styles.sectionTitle}>Final Bill</Text>
            {cart.map(item => (
              <View key={item.id} style={styles.cartItem}>
                <Text style={styles.cartText}>{item.qty}x {item.name}</Text>
                <Text style={styles.cartText}>${(item.qty * item.price).toFixed(2)}</Text>
              </View>
            ))}
            <View style={styles.divider} />
            <View style={styles.billRow}><Text>Subtotal:</Text><Text>${subtotal.toFixed(2)}</Text></View>
            <View style={styles.billRow}><Text>Sales Tax (8.25%):</Text><Text>${tax.toFixed(2)}</Text></View>
            <View style={styles.billRow}><Text style={styles.totalText}>Total:</Text><Text style={styles.totalText}>${total.toFixed(2)}</Text></View>
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.confirmButton}
          onPress={handleCompleteBooking}
        >
          <Text style={styles.confirmText}>Confirm Booking</Text>
        </TouchableOpacity>
      </View>

      {/* MODAL (Same as before) */}
      <Modal visible={isModalVisible} animationType="fade" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Customer</Text>
              <TouchableOpacity onPress={() => setIsModalVisible(false)}><Ionicons name="close" size={24} /></TouchableOpacity>
            </View>
            <FlatList
              data={CUSTOMERS}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.customerItem} onPress={() => { setSelectedCustomer(item); setIsModalVisible(false); }}>
                  <Text style={styles.custName}>{item.name}</Text>
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
  content: { padding: 20 },
  section: { marginBottom: 25 },
  sectionTitle: { fontSize: 13, fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase', marginBottom: 10 },
  selector: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#e2e8f0' },
  selectorActive: { borderColor: '#059669', backgroundColor: '#f0fdf4' },
  selectorText: { fontSize: 16, color: '#64748b' },
  selectedName: { color: '#065f46', fontWeight: 'bold' },
  productRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', padding: 15, borderRadius: 15, marginBottom: 10, elevation: 1 },
  pName: { fontSize: 15, fontWeight: '600', color: '#334155' },
  pPrice: { fontSize: 13, color: '#059669', fontWeight: 'bold' },
  qtyContainer: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  qtyBtn: { padding: 5 },
  qtyText: { fontSize: 16, fontWeight: 'bold', minWidth: 20, textAlign: 'center' },
  summaryBox: { backgroundColor: '#fff', padding: 20, borderRadius: 20, marginBottom: 100, borderTopWidth: 4, borderTopColor: '#059669' },
  cartItem: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  cartText: { color: '#475569', fontSize: 14 },
  divider: { height: 1, backgroundColor: '#f1f5f9', marginVertical: 15 },
  billRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  totalText: { fontWeight: 'bold', fontSize: 18, color: '#1e293b' },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 20, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#f1f5f9' },
  confirmButton: { backgroundColor: '#059669', padding: 18, borderRadius: 15, alignItems: 'center' },
  confirmText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 20, maxHeight: '70%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 18, fontWeight: 'bold' },
  customerItem: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  custName: { fontSize: 16, fontWeight: 'bold' },
});