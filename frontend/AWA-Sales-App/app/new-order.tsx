import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, ScrollView, TouchableOpacity, 
  Alert, Dimensions, Modal, SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

const { width, height } = Dimensions.get('window');

// Types
interface Customer {
  id: string;
  name: string;
  area: string;
  business: string;
  address: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
}

interface CartItem extends Product {
  quantity: number;
}

// Mock Data
const CUSTOMERS: Customer[] = [
  { id: '1', name: 'James Carter', area: 'Houston, TX', business: 'Carter & Co.', address: '1234 Elm St' },
  { id: '2', name: 'Naveed Ahmed', area: 'Dallas, TX', business: 'AWA Products', address: '786 Market Rd' },
];

const PRODUCTS: Product[] = [
  { id: '1', name: 'Ultra-Shine Glass Cleaner', price: 24.99 },
  { id: '2', name: 'Heavy Duty Degreaser', price: 89.00 },
  { id: '3', name: 'Microfiber Towel Pack', price: 15.50 },
];

export default function NewOrderScreen() {
  const router = useRouter();
  
  // States
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [generatedOrderID, setGeneratedOrderID] = useState('');

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);

  // PDF Generation Function
  const handleGeneratePDF = async (shouldShare: boolean) => {
    if (!selectedCustomer) return;

    const orderID = generatedOrderID || `#ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric',
    });

    const htmlContent = `
      <html>
        <head>
          <style>
            body { font-family: 'Helvetica', sans-serif; padding: 40px; color: #1a1a1a; }
            .header { margin-bottom: 40px; }
            .company-name { font-size: 26px; font-weight: bold; margin: 0; }
            .tax-invoice { font-size: 14px; color: #666; margin-top: 5px; }
            .info-grid { display: flex; justify-content: space-between; margin-top: 30px; }
            .invoice-details { text-align: right; font-size: 14px; }
            table { width: 100%; border-collapse: collapse; margin-top: 30px; }
            th { text-align: left; font-size: 12px; color: #666; border-bottom: 1px solid #eee; padding: 10px 0; }
            td { padding: 15px 0; font-size: 14px; border-bottom: 1px dotted #eee; }
            .totals { float: right; width: 200px; margin-top: 20px; }
            .total-row { display: flex; justify-content: space-between; padding: 5px 0; }
            .grand-total { border-top: 2px solid #000; font-weight: bold; font-size: 18px; margin-top: 10px; padding-top: 10px; }
            .footer { margin-top: 100px; font-size: 12px; color: #888; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 class="company-name">AWA Products</h1>
            <p class="tax-invoice">Tax Invoice</p>
          </div>
          <div class="info-grid">
            <div>
              <p><strong>Bill To</strong></p>
              <p>${selectedCustomer.name}<br/>${selectedCustomer.business}<br/>${selectedCustomer.address}<br/>${selectedCustomer.area}, USA</p>
            </div>
            <div class="invoice-details">
              <p><strong>Invoice ${orderID}</strong><br/>Date: ${currentDate}<br/>Status: Delivered</p>
            </div>
          </div>
          <table>
            <thead>
              <tr><th>Item</th><th style="text-align:center">Qty</th><th style="text-align:right">Unit Price</th><th style="text-align:right">Total</th></tr>
            </thead>
            <tbody>
              ${cart.map(item => `
                <tr>
                  <td>${item.name}</td>
                  <td style="text-align:center">${item.quantity}</td>
                  <td style="text-align:right">$${item.price.toFixed(2)}</td>
                  <td style="text-align:right">$${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <div class="totals">
            <div class="total-row"><span>Subtotal:</span><span>$${totalAmount}</span></div>
            <div class="total-row grand-total"><span>Total:</span><span>$${totalAmount}</span></div>
          </div>
          <div style="clear:both"></div>
          <p class="footer">Thank you for your purchase.</p>
        </body>
      </html>
    `;

    try {
      if (shouldShare) {
        const { uri } = await Print.printToFileAsync({ html: htmlContent });
        await Sharing.shareAsync(uri);
      } else {
        await Print.printAsync({ html: htmlContent });
      }
    } catch (e) {
      Alert.alert("Error", "Could not process PDF");
    }
  };

  const handleConfirmOrder = () => {
    if (!selectedCustomer || cart.length === 0) {
      Alert.alert("Error", "Please select a customer and products.");
      return;
    }

    const newID = `#ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    setGeneratedOrderID(newID);

    // Main Alert Message
    Alert.alert(
      "Order Confirmed Successfully! ✅",
      "What would you like to do next?",
      [
        { text: "Preview Invoice", onPress: () => setShowPreviewModal(true) },
        { text: "Share PDF", onPress: () => handleGeneratePDF(true) },
        { text: "Done", onPress: () => router.replace('/(tabs)/orders'), style: "cancel" }
      ],
      { cancelable: false }
    );
  };

  const addToCart = (product: Product) => {
    setCart((currentCart) => {
      const exists = currentCart.find(i => i.id === product.id);
      if (exists) {
        return currentCart.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...currentCart, { ...product, quantity: 1 }];
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Nav */}
      <View style={styles.headerNav}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
          <Ionicons name="arrow-back" size={24} color="#1e293b" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Booking</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Step 1: Customer */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Select Customer</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {CUSTOMERS.map(c => (
              <TouchableOpacity 
                key={c.id} 
                onPress={() => setSelectedCustomer(c)}
                style={[styles.custCard, selectedCustomer?.id === c.id && styles.activeCust]}
              >
                <Text style={[styles.custName, selectedCustomer?.id === c.id && {color: '#fff'}]}>{c.name}</Text>
                <Text style={[styles.custArea, selectedCustomer?.id === c.id && {color: '#dcfce7'}]}>{c.area}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Step 2: Products */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Select Products</Text>
          {PRODUCTS.map(p => (
            <TouchableOpacity key={p.id} style={styles.productRow} onPress={() => addToCart(p)}>
              <View>
                <Text style={styles.pName}>{p.name}</Text>
                <Text style={styles.pPrice}>${p.price.toFixed(2)}</Text>
              </View>
              <Ionicons name="add-circle" size={28} color="#059669" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Summary */}
        {cart.length > 0 && (
          <View style={styles.summaryCard}>
            <Text style={styles.summaryHeading}>Booking Summary</Text>
            {cart.map(item => (
              <View key={item.id} style={styles.summaryRow}>
                <Text style={{color: '#94a3b8'}}>{item.quantity}x {item.name}</Text>
                <Text style={{color: '#fff'}}>${(item.price * item.quantity).toFixed(2)}</Text>
              </View>
            ))}
            <View style={styles.divider} />
            <View style={styles.totalRow}>
              <Text style={{color: '#94a3b8', fontWeight: 'bold'}}>Total Amount</Text>
              <Text style={{color: '#fff', fontSize: 22, fontWeight: 'bold'}}>${totalAmount}</Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Main Confirm Button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirmOrder}>
          <Text style={styles.btnText}>Confirm Order</Text>
          <Ionicons name="checkmark-done" size={20} color="#fff" style={{marginLeft: 8}} />
        </TouchableOpacity>
      </View>

      {/* PREVIEW MODAL */}
      <Modal visible={showPreviewModal} animationType="slide" transparent={true}>
        <View style={styles.modalBg}>
          <View style={styles.modalBox}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Invoice Preview</Text>
              <TouchableOpacity onPress={() => setShowPreviewModal(false)}>
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.previewContent}>
              <View style={styles.previewInvoice}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>AWA Products</Text>
                <Text style={{color: '#666'}}>Order ID: {generatedOrderID}</Text>
                <View style={{height: 1, backgroundColor: '#eee', marginVertical: 15}} />
                
                <Text style={{fontWeight: 'bold', marginBottom: 5}}>Bill To:</Text>
                <Text>{selectedCustomer?.name}</Text>
                <Text>{selectedCustomer?.business}</Text>
                
                <View style={{marginTop: 20}}>
                  {cart.map(i => (
                    <View key={i.id} style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5}}>
                      <Text>{i.quantity}x {i.name}</Text>
                      <Text>${(i.price * i.quantity).toFixed(2)}</Text>
                    </View>
                  ))}
                </View>
                
                <View style={{height: 1, backgroundColor: '#eee', marginVertical: 15}} />
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Text style={{fontWeight: 'bold'}}>Grand Total</Text>
                  <Text style={{fontWeight: 'bold', color: '#059669', fontSize: 18}}>${totalAmount}</Text>
                </View>
              </View>
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity style={styles.shareBtn} onPress={() => { handleGeneratePDF(true); setShowPreviewModal(false); }}>
                <Text style={{color: '#fff', fontWeight: 'bold'}}>Share Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  headerNav: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, paddingTop: 40, backgroundColor: '#fff', alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  iconBtn: { padding: 8, backgroundColor: '#f1f5f9', borderRadius: 10 },
  section: { padding: 20 },
  sectionTitle: { fontSize: 12, fontWeight: 'bold', color: '#94a3b8', marginBottom: 12, textTransform: 'uppercase' },
  custCard: { padding: 15, backgroundColor: '#fff', borderRadius: 15, marginRight: 10, borderWidth: 1, borderColor: '#e2e8f0', width: 130 },
  activeCust: { backgroundColor: '#059669', borderColor: '#059669' },
  custName: { fontWeight: 'bold', fontSize: 14 },
  custArea: { fontSize: 11, color: '#64748b' },
  productRow: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#fff', padding: 18, borderRadius: 15, marginBottom: 8, alignItems: 'center' },
  pName: { fontWeight: '600' },
  pPrice: { color: '#059669', fontWeight: 'bold' },
  summaryCard: { margin: 20, backgroundColor: '#1e293b', padding: 20, borderRadius: 20 },
  summaryHeading: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 15 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  divider: { height: 1, backgroundColor: '#334155', marginVertical: 15 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  bottomBar: { padding: 20, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#f1f5f9' },
  confirmBtn: { backgroundColor: '#059669', padding: 18, borderRadius: 15, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },

  // Modal Preview Styles
  modalBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 20 },
  modalBox: { backgroundColor: '#fff', borderRadius: 25, maxHeight: '80%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  modalTitle: { fontSize: 16, fontWeight: 'bold' },
  previewContent: { padding: 20 },
  previewInvoice: { padding: 20, backgroundColor: '#f8fafc', borderRadius: 15, borderWidth: 1, borderColor: '#e2e8f0' },
  modalFooter: { padding: 20 },
  shareBtn: { backgroundColor: '#1e293b', padding: 15, borderRadius: 12, alignItems: 'center' }
}); 