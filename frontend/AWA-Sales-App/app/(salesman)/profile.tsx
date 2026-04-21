import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Types define ki hain taake "implicitly has any type" wala error khatam ho jaye
interface ProfileOptionProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle?: string;
  onPress: () => void;
  color?: string;
}

const SalesmanProfile = () => {
  const salesmanData = {
    name: "Muneeb Ahmed",
    email: "muneeb.sales@texascleaning.com",
    phone: "+92 300 1234567",
    role: "Senior Sales Executive",
    stats: {
      orders: "124",
      revenue: "$12.5k",
      rating: "4.8"
    }
  };

  // Props ko yahan type-safe banaya hai
  const ProfileOption = ({ icon, title, subtitle, onPress, color = "#1e293b" }: ProfileOptionProps) => (
    <TouchableOpacity style={styles.optionItem} onPress={onPress}>
      <View style={[styles.iconContainer, { backgroundColor: color + '10' }]}>
        <Ionicons name={icon} size={22} color={color} />
      </View>
      <View style={styles.optionTextContainer}>
        <Text style={styles.optionTitle}>{title}</Text>
        {subtitle && <Text style={styles.optionSubtitle}>{subtitle}</Text>}
      </View>
      <Ionicons name="chevron-forward" size={18} color="#94a3b8" />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* 1. Header Section */}
      <View style={styles.header}>
        <View style={styles.profileImageContainer}>
          <Image 
            source={{ uri: 'https://ui-avatars.com/api/?name=Muneeb+Ahmed&background=059669&color=fff&size=128' }} 
            style={styles.profileImage} 
          />
          <TouchableOpacity style={styles.editBadge}>
            <Ionicons name="camera" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.userName}>{salesmanData.name}</Text>
        <Text style={styles.userRole}>{salesmanData.role}</Text>
      </View>

      {/* 2. Stats Grid */}
      <View style={styles.statsGrid}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{salesmanData.stats.orders}</Text>
          <Text style={styles.statLabel}>Orders</Text>
        </View>
        <View style={[styles.statBox, styles.statBorder]}>
          <Text style={styles.statValue}>{salesmanData.stats.revenue}</Text>
          <Text style={styles.statLabel}>Revenue</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{salesmanData.stats.rating}</Text>
          <Text style={styles.statLabel}>Rating</Text>
        </View>
      </View>

      {/* 3. Settings/Options */}
      <View style={styles.optionsSection}>
        <Text style={styles.sectionTitle}>Account Settings</Text>
        
        <ProfileOption 
          icon="person-outline" 
          title="Personal Information" 
          subtitle="Change name, email or phone"
          onPress={() => {}}
          color="#3b82f6"
        />
        <ProfileOption 
          icon="bar-chart-outline" 
          title="Sales Performance" 
          subtitle="View your daily & monthly targets"
          onPress={() => {}}
          color="#059669"
        />
        <ProfileOption 
          icon="notifications-outline" 
          title="Notifications" 
          subtitle="Manage alerts and reminders"
          onPress={() => {}}
          color="#f59e0b"
        />

        <TouchableOpacity style={styles.logoutBtn}>
          <Ionicons name="log-out-outline" size={20} color="#ef4444" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { alignItems: 'center', paddingVertical: 30, backgroundColor: '#fff' },
  profileImageContainer: { position: 'relative', marginBottom: 15 },
  profileImage: { width: 100, height: 100, borderRadius: 50, borderWidth: 3, borderColor: '#f1f5f9' },
  editBadge: { position: 'absolute', bottom: 0, right: 0, backgroundColor: '#059669', padding: 6, borderRadius: 15, borderWidth: 2, borderColor: '#fff' },
  userName: { fontSize: 22, fontWeight: '900', color: '#1e293b' },
  userRole: { fontSize: 14, color: '#64748b', marginTop: 2 },
  statsGrid: { flexDirection: 'row', backgroundColor: '#fff', marginHorizontal: 20, marginTop: -25, borderRadius: 16, elevation: 4, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, paddingVertical: 15 },
  statBox: { flex: 1, alignItems: 'center' },
  statBorder: { borderLeftWidth: 1, borderRightWidth: 1, borderColor: '#f1f5f9' },
  statValue: { fontSize: 18, fontWeight: '800', color: '#1e293b' },
  statLabel: { fontSize: 12, color: '#94a3b8', marginTop: 2 },
  optionsSection: { padding: 25 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#64748b', marginBottom: 15, textTransform: 'uppercase', letterSpacing: 1 },
  optionItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 15, borderRadius: 16, marginBottom: 12 },
  iconContainer: { width: 45, height: 45, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  optionTextContainer: { flex: 1, marginLeft: 15 },
  optionTitle: { fontSize: 16, fontWeight: '600', color: '#1e293b' },
  optionSubtitle: { fontSize: 12, color: '#94a3b8', marginTop: 2 },
  logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20, padding: 15, borderRadius: 16, backgroundColor: '#fee2e2' },
  logoutText: { marginLeft: 10, fontSize: 16, fontWeight: '700', color: '#ef4444' }
});

export default SalesmanProfile;