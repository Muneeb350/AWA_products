import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView, Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet, Text,
  TextInput, TouchableOpacity,
  View
} from 'react-native';

export default function RegisterScreen() {
  const router = useRouter();

  const [shopName, setShopName] = useState('');
  const [phone, setPhone] = useState('');
  const [salesmanCode, setSalesmanCode] = useState('');

  const isFormReady = shopName.trim().length > 0 && phone.trim().length > 0 && salesmanCode.trim().length > 0;

  const handleRegister = () => {
    if (!isFormReady) return;
    console.log('Registering...', { shopName, phone, salesmanCode });
    Alert.alert(
      'Success',
      'Shop Registered Successfully!',
      [{ text: 'OK', onPress: () => router.replace('/(customer)') }]
    );
  };

  const handleGoogleSignup = () => {
    Alert.alert('Google Sign-up', 'Redirecting to Google Account...');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <View style={styles.content}>

            <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="#1e293b" />
            </TouchableOpacity>

            <View style={styles.headerArea}>
              <Text style={styles.title}>Join AWA Products</Text>
              <Text style={styles.subtitle}>Register your shop to start direct ordering.</Text>
            </View>

            {/* Google Auth — Primary CTA */}
            <TouchableOpacity style={styles.googleBtn} onPress={handleGoogleSignup}>
              <Ionicons name="logo-google" size={20} color="#fff" />
              <Text style={styles.googleBtnText}>Continue with Google</Text>
            </TouchableOpacity>

            <Text style={styles.googleNote}>
              Your account will be linked to your Google email automatically.
            </Text>

            <View style={styles.dividerArea}>
              <View style={styles.line} />
              <Text style={styles.dividerText}>FILL IN YOUR DETAILS</Text>
              <View style={styles.line} />
            </View>

            <View style={styles.form}>

              <View style={styles.inputGroup}>
                <Ionicons name="storefront-outline" size={20} color="#64748b" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Shop Name *"
                  placeholderTextColor="#94a3b8"
                  value={shopName}
                  onChangeText={setShopName}
                />
              </View>

              <View style={styles.inputGroup}>
                <Ionicons name="call-outline" size={20} color="#64748b" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Phone Number *"
                  placeholderTextColor="#94a3b8"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                />
              </View>

              <View style={[styles.inputGroup, styles.codeGroup]}>
                <Ionicons name="people-outline" size={20} color="#059669" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Salesman Reference Code *"
                  placeholderTextColor="#94a3b8"
                  value={salesmanCode}
                  onChangeText={setSalesmanCode}
                  autoCapitalize="characters"
                />
              </View>

              <TouchableOpacity
                style={[styles.registerBtn, !isFormReady && styles.registerBtnDisabled]}
                onPress={handleRegister}
                disabled={!isFormReady}
                activeOpacity={isFormReady ? 0.8 : 1}
              >
                <Text style={styles.registerBtnText}>Register Shop</Text>
              </TouchableOpacity>

            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 25 },
  backBtn: { marginBottom: 20 },
  headerArea: { marginBottom: 28 },
  title: { fontSize: 28, fontWeight: '900', color: '#1e293b' },
  subtitle: { fontSize: 14, color: '#64748b', marginTop: 5 },

  googleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#059669',
    padding: 16,
    borderRadius: 20,
    marginBottom: 12,
  },
  googleBtnText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },

  googleNote: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 10,
  },

  dividerArea: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  line: { flex: 1, height: 1, backgroundColor: '#e2e8f0' },
  dividerText: { marginHorizontal: 10, fontSize: 11, color: '#cbd5e1', fontWeight: '700' },

  form: { marginTop: 4 },

  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  codeGroup: {
    borderColor: '#059669',
    backgroundColor: '#f0fdf4',
  },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, paddingVertical: 15, fontSize: 16, color: '#1e293b' },

  registerBtn: {
    backgroundColor: '#059669',
    padding: 18,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 8,
  },
  registerBtnDisabled: {
    backgroundColor: '#a7f3d0',
  },
  registerBtnText: { color: '#fff', fontSize: 17, fontWeight: '800' },
});
