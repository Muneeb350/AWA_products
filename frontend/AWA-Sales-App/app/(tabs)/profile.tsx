import React from 'react';
import { 
  StyleSheet, Text, View, ScrollView, TouchableOpacity, 
  SafeAreaView, Dimensions, Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

interface MenuOption {
  id: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  action: () => void;
}

export default function ProfileScreen() {
  const router = useRouter();

  // Mock User Data
  const user = {
    name: "Naveed Ahmed",
    email: "naveed.awa@gmail.com",
    role: "Senior Sales Executive",
    stats: {
      todaySales: "$1,240",
      totalOrders: "14",
      target: "85%"
    }
  };

  // Logout Function Fix
  const handleLogout = () => {
    Alert.alert(
      "Logout Confirmation", 
      "Are you sure you want to sign out? You will need to login again to access your account.",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Logout", 
          style: "destructive", 
          onPress: () => {
            // Yeh aapko seedha login page par le jayega
            // 'replace' use kiya hai taake user wapas dashboard par na aa sake
            router.replace('/login'); 
          } 
        } 
      ]
    );
  };

  const menuOptions: MenuOption[] = [
    { 
      id: '1', 
      title: 'Performance Reports', 
      icon: 'bar-chart-outline', 
      color: '#8b5cf6',
      action: () => router.push('/performance-reports') 
    },
    { 
      id: '2', 
      title: 'Target History', 
      icon: 'trophy-outline', 
      color: '#f59e0b',
      action: () => router.push('/target-history') 
    },
    { 
      id: '3', 
      title: 'Help & Support', 
      icon: 'help-circle-outline', 
      color: '#10b981',
      action: () => Alert.alert("Support", "Email: support@awaproducts.com\nContact: +1 234 567 890") 
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Profile Header */}
        <View style={styles.header}>
          <View style={styles.profileImgContainer}>
             <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarText}>NA</Text>
             </View>
          </View>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userRole}>{user.role}</Text>
          <View style={styles.emailBadge}>
             <Text style={styles.emailText}>{user.email}</Text>
          </View>
        </View>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Today</Text>
            <Text style={styles.statValue}>{user.stats.todaySales}</Text>
          </View>
          
          <TouchableOpacity 
            style={[styles.statCard, { backgroundColor: '#059669' }]}
            onPress={() => router.push('/(tabs)/orders')}
          >
            <Text style={[styles.statLabel, { color: '#dcfce7' }]}>Orders</Text>
            <Text style={[styles.statValue, { color: '#fff' }]}>{user.stats.totalOrders}</Text>
          </TouchableOpacity>

          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Target</Text>
            <Text style={styles.statValue}>{user.stats.target}</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Dashboard Options</Text>
          {menuOptions.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.menuItem}
              onPress={item.action}
            >
              <View style={[styles.iconBox, { backgroundColor: item.color + '15' }]}>
                <Ionicons name={item.icon} size={22} color={item.color} />
              </View>
              <Text style={styles.menuText}>{item.title}</Text>
              <Ionicons name="chevron-forward" size={18} color="#cbd5e1" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity 
          style={styles.logoutBtn}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={20} color="#ef4444" />
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>Version 2.0.4 (Stable)</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { alignItems: 'center', paddingTop: 40, paddingBottom: 20, backgroundColor: '#fff' },
  profileImgContainer: { position: 'relative', marginBottom: 16 },
  avatarPlaceholder: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#1e293b', justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: '#fff', fontSize: 32, fontWeight: 'bold' },
  userName: { fontSize: 24, fontWeight: '800', color: '#1e293b' },
  userRole: { fontSize: 14, color: '#64748b', marginTop: 4 },
  emailBadge: { marginTop: 12, backgroundColor: '#f1f5f9', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  emailText: { fontSize: 12, color: '#475569', fontWeight: '600' },
  statsContainer: { flexDirection: 'row', justifyContent: 'space-between', padding: 20 },
  statCard: { flex: 1, backgroundColor: '#fff', marginHorizontal: 5, padding: 15, borderRadius: 20, alignItems: 'center', elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10 },
  statLabel: { fontSize: 11, color: '#94a3b8', fontWeight: 'bold', textTransform: 'uppercase' },
  statValue: { fontSize: 18, fontWeight: '800', color: '#1e293b', marginTop: 4 },
  menuSection: { padding: 20 },
  sectionTitle: { fontSize: 12, fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', marginBottom: 15, letterSpacing: 1 },
  menuItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 16, borderRadius: 18, marginBottom: 10, elevation: 1 },
  iconBox: { padding: 10, borderRadius: 12, marginRight: 15 },
  menuText: { flex: 1, fontSize: 16, fontWeight: '600', color: '#1e293b' },
  logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', margin: 20, padding: 18, borderRadius: 18, backgroundColor: '#fee2e2' },
  logoutText: { color: '#ef4444', fontWeight: 'bold', marginLeft: 10, fontSize: 16 },
  versionText: { textAlign: 'center', color: '#cbd5e1', fontSize: 12, marginBottom: 30 }
});