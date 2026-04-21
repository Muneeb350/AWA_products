import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Share } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SalesmanProfile() {
  const salesmanData = {
    name: "Muneeb Ahmed",
    id: "AWA-350", // Yeh hai woh unique code
    phone: "+92 300 1234567"
  };

  const onShare = async () => {
    try {
      await Share.share({
        message: `Please download AWA Products App and use my Reference Code: ${salesmanData.id} to place your orders.`,
      });
    }  catch (error: any) {
  console.log(error.message);
}
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{salesmanData.name.charAt(0)}</Text>
        </View>
        <Text style={styles.userName}>{salesmanData.name}</Text>
        <Text style={styles.userRole}>Company Sales Executive</Text>
      </View>

      <View style={styles.codeCard}>
        <Text style={styles.codeLabel}>YOUR UNIQUE REFERRAL CODE</Text>
        <View style={styles.codeBox}>
          <Text style={styles.codeValue}>{salesmanData.id}</Text>
          <TouchableOpacity onPress={onShare}>
            <Ionicons name="share-social" size={24} color="#3b82f6" />
          </TouchableOpacity>
        </View>
        <Text style={styles.codeHint}>Ask customers to enter this code during registration.</Text>
      </View>

      <TouchableOpacity style={styles.logoutBtn}>
        <Ionicons name="log-out-outline" size={20} color="#ef4444" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc', padding: 20 },
  profileHeader: { alignItems: 'center', marginVertical: 30 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#3b82f6', justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
  avatarText: { fontSize: 32, fontWeight: 'bold', color: '#fff' },
  userName: { fontSize: 22, fontWeight: '800', color: '#1e293b' },
  userRole: { fontSize: 14, color: '#64748b', marginTop: 4 },
  
  codeCard: { backgroundColor: '#fff', padding: 25, borderRadius: 20, alignItems: 'center', borderWidth: 1, borderColor: '#e2e8f0', elevation: 2 },
  codeLabel: { fontSize: 12, fontWeight: 'bold', color: '#94a3b8', letterSpacing: 1 },
  codeBox: { flexDirection: 'row', alignItems: 'center', marginVertical: 15, backgroundColor: '#eff6ff', paddingHorizontal: 25, paddingVertical: 15, borderRadius: 15 },
  codeValue: { fontSize: 32, fontWeight: '900', color: '#3b82f6', marginRight: 15, letterSpacing: 2 },
  codeHint: { fontSize: 12, color: '#64748b', textAlign: 'center', paddingHorizontal: 20 },

  logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 'auto', marginBottom: 20, padding: 15 },
  logoutText: { marginLeft: 8, color: '#ef4444', fontWeight: 'bold', fontSize: 16 }
});