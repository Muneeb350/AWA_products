import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Wahi Texas Products jo Customer Shop mein thay
const PRODUCTS = [
  { id: '1', name: 'LoneStar Heavy Degreaser', price: '2450', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=400', category: 'Industrial' },
  { id: '2', name: 'Austin Shine Glass Pro', price: '850', image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?q=80&w=400', category: 'Commercial' },
  { id: '3', name: 'Houston Multi-Surface', price: '1200', image: 'https://images.unsplash.com/photo-1585833014492-7a360fed76c9?q=80&w=400', category: 'Janitorial' },
];

export default function CatalogScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Product Catalog</Text>
        <Text style={styles.subTitle}>Texas Cleaning Solutions</Text>
      </View>

      <FlatList
        data={PRODUCTS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 20 }}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <Image source={{ uri: item.image }} style={styles.img} />
            <View style={styles.info}>
              <Text style={styles.cat}>{item.category}</Text>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>Retail Price: ${item.price}</Text>
            </View>
            <Ionicons name="information-circle-outline" size={24} color="#059669" />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { padding: 20, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  title: { fontSize: 22, fontWeight: '900', color: '#1e293b' },
  subTitle: { fontSize: 13, color: '#059669', fontWeight: '700', textTransform: 'uppercase' },
  productCard: { flexDirection: 'row', backgroundColor: '#fff', padding: 12, borderRadius: 15, marginBottom: 15, alignItems: 'center', elevation: 2 },
  img: { width: 70, height: 70, borderRadius: 10, backgroundColor: '#f1f5f9' },
  info: { flex: 1, marginLeft: 15 },
  cat: { fontSize: 10, color: '#64748b', fontWeight: 'bold' },
  name: { fontSize: 16, fontWeight: '700', color: '#1e293b' },
  price: { fontSize: 14, color: '#059669', fontWeight: '800', marginTop: 2 }
});