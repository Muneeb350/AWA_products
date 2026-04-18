import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout from AWA Products?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Logout", 
          style: "destructive", 
          onPress: () => router.replace('/login') 
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header Profile Section */}
      <View style={styles.header}>
        <Image 
          source={{ uri: 'https://ui-avatars.com/api/?name=Naveed+Ahmed&background=059669&color=fff&size=128' }} 
          style={styles.avatar} 
        />
        <Text style={styles.userName}>Naveed Ahmed</Text>
        <Text style={styles.userRole}>Senior Sales Representative</Text>
        <View style={styles.locationTag}>
          <Ionicons name="location" size={14} color="#64748b" />
          <Text style={styles.locationText}>Houston, Texas</Text>
        </View>
      </View>

      {/* Profile Options */}
      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.optionItem}>
          <View style={styles.optionIconContainer}>
            <Ionicons name="settings-outline" size={22} color="#475569" />
          </View>
          <Text style={styles.optionLabel}>App Settings</Text>
          <Ionicons name="chevron-forward" size={20} color="#cbd5e1" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionItem}>
          <View style={[styles.optionIconContainer, { backgroundColor: '#eff6ff' }]}>
            <MaterialCommunityIcons name="shield-check-outline" size={22} color="#3b82f6" />
          </View>
          <Text style={styles.optionLabel}>Privacy Policy</Text>
          <Ionicons name="chevron-forward" size={20} color="#cbd5e1" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionItem}>
          <View style={[styles.optionIconContainer, { backgroundColor: '#fdf2f2' }]}>
            <Ionicons name="help-circle-outline" size={22} color="#ef4444" />
          </View>
          <Text style={styles.optionLabel}>Help & Support</Text>
          <Ionicons name="chevron-forward" size={20} color="#cbd5e1" />
        </TouchableOpacity>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={22} color="#fff" />
          <Text style={styles.logoutText}>Logout Session</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.versionText}>App Version 1.0.4 (Texas Build)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { 
    backgroundColor: '#fff', 
    alignItems: 'center', 
    paddingTop: 80, 
    paddingBottom: 30, 
    borderBottomLeftRadius: 30, 
    borderBottomRightRadius: 30,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10
  },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 15, borderWidth: 3, borderColor: '#f0fdf4' },
  userName: { fontSize: 22, fontWeight: 'bold', color: '#1e293b' },
  userRole: { fontSize: 14, color: '#64748b', marginTop: 4 },
  locationTag: { flexDirection: 'row', alignItems: 'center', marginTop: 10, backgroundColor: '#f1f5f9', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20 },
  locationText: { fontSize: 12, color: '#64748b', marginLeft: 4, fontWeight: '600' },
  optionsContainer: { padding: 20, marginTop: 10 },
  optionItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#fff', 
    padding: 15, 
    borderRadius: 15, 
    marginBottom: 12,
    elevation: 1 
  },
  optionIconContainer: { width: 40, height: 40, backgroundColor: '#f8fafc', borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  optionLabel: { flex: 1, fontSize: 16, color: '#334155', fontWeight: '500' },
  logoutButton: { 
    flexDirection: 'row', 
    backgroundColor: '#ef4444', 
    marginTop: 20, 
    padding: 18, 
    borderRadius: 15, 
    justifyContent: 'center', 
    alignItems: 'center',
    gap: 10,
    elevation: 4,
    shadowColor: '#ef4444',
    shadowOpacity: 0.3,
    shadowRadius: 5
  },
  logoutText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  versionText: { textAlign: 'center', color: '#94a3b8', fontSize: 12, marginTop: 20 }
});