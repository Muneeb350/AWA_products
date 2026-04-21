import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
  const router = useRouter();
  const { role } = useLocalSearchParams(); // Yeh check karega ke salesman hai ya customer
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    // Filhal ke liye simple logic
    if (role === 'salesman') {
      router.replace('/(salesman)/dashboard'); // Salesman dashboard par jaye
    } else {
      router.replace('/(customer)'); // Customer home par jaye
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <View style={styles.content}>
          {/* Back Button */}
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#1e293b" />
          </TouchableOpacity>

          <View style={styles.headerArea}>
            <Text style={styles.welcomeText}>Welcome Back!</Text>
            <Text style={styles.subText}>
              Logging in as <Text style={styles.roleHighlight}>{role === 'salesman' ? 'Company Salesman' : 'Shop Owner'}</Text>
            </Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Ionicons name="mail-outline" size={20} color="#64748b" style={styles.inputIcon} />
              <TextInput 
                style={styles.input} 
                placeholder="Email Address" 
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Ionicons name="lock-closed-outline" size={20} color="#64748b" style={styles.inputIcon} />
              <TextInput 
                style={styles.input} 
                placeholder="Password" 
                value={password}
                onChangeText={setPassword}
                secureTextEntry 
              />
            </View>

            <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
              <Text style={styles.loginBtnText}>Login</Text>
            </TouchableOpacity>

            {/* Registration Link: Sirf Customer ke liye show hoga */}
            {role === 'customer' && (
              <TouchableOpacity 
                style={styles.registerLink} 
                onPress={() => router.push('/register')}
              >
                <Text style={styles.registerText}>
                  Don't have an account? <Text style={styles.registerHighlight}>Register Now</Text>
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { flex: 1, padding: 25 },
  backBtn: { marginTop: 10, marginBottom: 30 },
  headerArea: { marginBottom: 40 },
  welcomeText: { fontSize: 32, fontWeight: '900', color: '#1e293b' },
  subText: { fontSize: 16, color: '#64748b', marginTop: 5 },
  roleHighlight: { color: '#059669', fontWeight: 'bold', textTransform: 'capitalize' },
  form: { marginTop: 10 },
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
  inputIcon: { marginRight: 10 },
  input: { flex: 1, paddingVertical: 15, fontSize: 16, color: '#1e293b' },
  loginBtn: { 
    backgroundColor: '#1e293b', 
    padding: 18, 
    borderRadius: 15, 
    alignItems: 'center', 
    marginTop: 10 
  },
  loginBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  registerLink: { marginTop: 25, alignItems: 'center' },
  registerText: { color: '#64748b', fontSize: 14 },
  registerHighlight: { color: '#059669', fontWeight: 'bold' }
});