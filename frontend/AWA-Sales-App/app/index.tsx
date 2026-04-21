import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function RoleSelection() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        
        {/* Logo Section */}
        <View style={styles.logoArea}>
          <Image 
            source={require('../assets/images/logo.png')} 
            style={styles.logoImage}
            resizeMode="contain"
          />
          <Text style={styles.brandName}>AWA PRODUCTS</Text>
          <Text style={styles.tagline}>Manufacturers of Premium Cleaning Brands</Text>
        </View>

        <Text style={styles.instruction}>Please select your role to continue</Text>

        {/* Salesman Card */}
        <TouchableOpacity 
          style={styles.roleCard}
          onPress={() => router.push('/login?role=salesman')}
        >
          <View style={[styles.iconBox, { backgroundColor: '#eff6ff' }]}>
            <Ionicons name="briefcase" size={32} color="#3b82f6" />
          </View>
          <View style={styles.cardText}>
            <Text style={styles.roleTitle}>Company Salesman</Text>
            <Text style={styles.roleDesc}>Marketing, Onboarding & Analytics</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#cbd5e1" />
        </TouchableOpacity>

        {/* Customer Card */}
        <TouchableOpacity 
          style={[styles.roleCard, { marginTop: 20 }]}
          onPress={() => router.push('/login?role=customer')}
        >
          <View style={[styles.iconBox, { backgroundColor: '#f0fdf4' }]}>
            <Ionicons name="storefront" size={32} color="#059669" />
          </View>
          <View style={styles.cardText}>
            <Text style={styles.roleTitle}>Shop Owner / Customer</Text>
            <Text style={styles.roleDesc}>Browse Catalog & Place Orders</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#cbd5e1" />
        </TouchableOpacity>
      </View>

      <Text style={styles.footerText}>Powered by Global Tech Stack v1.0</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff' 
  },
  content: { 
    flex: 1, 
    padding: 25, 
    justifyContent: 'center' 
  },
  logoArea: { 
    alignItems: 'center', 
    marginBottom: 90 
  },
  logoImage: { 
    width: 180, 
    height: 150, 
    marginBottom: 0 
  },
  brandName: { 
    fontSize: 28, 
    fontWeight: '900', 
    color: '#1e293b', 
    letterSpacing: 1, 
    marginTop: -20,
  },
  tagline: { 
    fontSize: 16, 
    color: '#64748b', 
    marginTop: 5 
  },
  instruction: { 
    fontSize: 12, 
    fontWeight: '700', 
    color: '#94a3b8', 
    textTransform: 'uppercase', 
    marginBottom: 25, 
    textAlign: 'center',
    letterSpacing: 1
  },
  roleCard: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#fff', 
    padding: 20, 
    borderRadius: 24, 
    borderWidth: 1, 
    borderColor: '#f1f5f9',
    // Shadow for iOS
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 5 },
    // Elevation for Android
    elevation: 3,
  },
  iconBox: { 
    padding: 15, 
    borderRadius: 18, 
    marginRight: 15 
  },
  cardText: { 
    flex: 1 
  },
  roleTitle: { 
    fontSize: 18, 
    fontWeight: '800', 
    color: '#1e293b' 
  },
  roleDesc: { 
    fontSize: 13, 
    color: '#64748b', 
    marginTop: 2 
  },
  footerText: { 
    textAlign: 'center', 
    color: '#cbd5e1', 
    fontSize: 15, 
    marginBottom: 20 
  }
});