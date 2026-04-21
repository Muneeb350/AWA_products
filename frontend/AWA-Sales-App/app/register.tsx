import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, TextInput, TouchableOpacity, 
  SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, Alert 
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function RegisterScreen() {
  const router = useRouter();
  
  const [shopName, setShopName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [salesmanCode, setSalesmanCode] = useState('');

  const handleRegister = () => {
    // Validation: Salesman Code ab Required hai
    if (!shopName || !email || !password || !salesmanCode) {
      Alert.alert("Required Field", "Please fill all fields. Salesman Reference Code is mandatory.");
      return;
    }

    console.log("Registering...", { shopName, salesmanCode });
    
    Alert.alert(
      "Success", 
      "Shop Registered Successfully!",
      [{ text: "OK", onPress: () => router.replace('/(customer)') }]
    );
  };

  const handleGoogleSignup = () => {
    // Yahan Google Auth ki logic aayegi baad mein
    Alert.alert("Google Sign-up", "Redirecting to Google Account...");
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            
            <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="#1e293b" />
            </TouchableOpacity>

            <View style={styles.headerArea}>
              <Text style={styles.title}>Join AWA Products</Text>
              <Text style={styles.subtitle}>Register your shop to start direct ordering.</Text>
            </View>

            {/* Google Social Button */}
            <TouchableOpacity style={styles.googleBtn} onPress={handleGoogleSignup}>
              <Ionicons name="logo-google" size={20} color="#ea4335" />
              <Text style={styles.googleBtnText}>Connect with Google</Text>
            </TouchableOpacity>

            <View style={styles.dividerArea}>
              <View style={styles.line} />
              <Text style={styles.dividerText}>OR REGISTER MANUALLY</Text>
              <View style={styles.line} />
            </View>

            <View style={styles.form}>
              <View style={styles.inputGroup}>
                <Ionicons name="business-outline" size={20} color="#64748b" style={styles.inputIcon} />
                <TextInput 
                  style={styles.input} 
                  placeholder="Customer/Shop Name *" 
                  value={shopName}
                  onChangeText={setShopName}
                />
              </View>

              <View style={styles.inputGroup}>
                <Ionicons name="mail-outline" size={20} color="#64748b" style={styles.inputIcon} />
                <TextInput 
                  style={styles.input} 
                  placeholder="Email / Phone *" 
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              <View style={styles.inputGroup}>
                <Ionicons name="lock-closed-outline" size={20} color="#64748b" style={styles.inputIcon} />
                <TextInput 
                  style={styles.input} 
                  placeholder="Password *" 
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry 
                />
              </View>

              {/* REQUIRED Salesman Code */}
              <View style={[styles.inputGroup, styles.requiredCode]}>
                <Ionicons name="qr-code-outline" size={20} color="#059669" style={styles.inputIcon} />
                <TextInput 
                  style={styles.input} 
                  placeholder="Salesman Reference Code *" 
                  value={salesmanCode}
                  onChangeText={setSalesmanCode}
                  autoCapitalize="characters"
                />
              </View>
              <Text style={styles.warningText}>* You cannot register without a Salesman Code.</Text>

              <TouchableOpacity style={styles.registerBtn} onPress={handleRegister}>
                <Text style={styles.registerBtnText}>Create Shop Account</Text>
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
  form: { marginTop: 10 },
  backBtn: { marginBottom: 20 },
  headerArea: { marginBottom: 25 },
  title: { fontSize: 28, fontWeight: '900', color: '#1e293b' },
  subtitle: { fontSize: 14, color: '#64748b', marginTop: 5 },
  
  // Google Button Styles
  googleBtn: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    padding: 15, 
    borderRadius: 15, 
    borderWidth: 1, 
    borderColor: '#e2e8f0',
    marginBottom: 20 
  },
  googleBtnText: { marginLeft: 10, fontSize: 16, fontWeight: '600', color: '#475569' },
  
  dividerArea: { flexDirection: 'row', alignItems: 'center', marginBottom: 25 },
  line: { flex: 1, height: 1, backgroundColor: '#f1f5f9' },
  dividerText: { marginHorizontal: 10, fontSize: 14, color: '#cbd5e1', fontWeight: 'bold' },
  
  inputGroup: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#f8fafc', 
    borderRadius: 15, 
    paddingHorizontal: 15, 
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#f1f5f9'
  },
  requiredCode: { borderColor: '#059669', backgroundColor: '#f0fdf4' },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, paddingVertical: 15, fontSize: 16 },
  warningText: { fontSize: 11, color: '#ef4444', marginBottom: 20, marginLeft: 5, fontWeight: '600' },
  registerBtn: { backgroundColor: '#1e293b', padding: 18, borderRadius: 15, alignItems: 'center' },
  registerBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});