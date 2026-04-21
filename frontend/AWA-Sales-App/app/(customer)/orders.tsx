import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Abhi ke liye empty orders array, baad mein database se connect karenge
const ORDERS: any[] = []; 

export default function OrdersScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        
        {ORDERS.length === 0 ? (
          /* Empty State: Jab koi order na ho */
          <View style={styles.emptyContainer}>
            <View style={styles.iconCircle}>
              <Ionicons name="receipt-outline" size={60} color="#cbd5e1" />
            </View>
            <Text style={styles.emptyTitle}>No Orders Yet</Text>
            <Text style={styles.emptyDesc}>
              Your order history will appear here once you place your first order.
            </Text>
            
            <TouchableOpacity style={styles.browseBtn}>
              <Text style={styles.browseBtnText}>Browse Products</Text>
            </TouchableOpacity>
          </View>
        ) : (
          /* Orders List: Jab orders honge (Baad ke liye setup) */
          <FlatList
            data={ORDERS}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.orderCard}>
                <Text>Order ID: {item.id}</Text>
              </View>
            )}
          />
        )}

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f8fafc' 
  },
  content: { 
    flex: 1, 
    padding: 20, 
    justifyContent: 'center' 
  },
  emptyContainer: { 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  emptyTitle: { 
    fontSize: 22, 
    fontWeight: '900', 
    color: '#1e293b',
    marginBottom: 10 
  },
  emptyDesc: { 
    fontSize: 14, 
    color: '#64748b', 
    textAlign: 'center', 
    paddingHorizontal: 30,
    lineHeight: 20
  },
  browseBtn: {
    marginTop: 30,
    backgroundColor: '#059669',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 15,
  },
  browseBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },
  orderCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10
  }
});