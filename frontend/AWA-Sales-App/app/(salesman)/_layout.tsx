import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function SalesmanLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#059669', // Emerald Green
        tabBarInactiveTintColor: '#94a3b8',
        tabBarLabelStyle: { fontSize: 11, fontWeight: '700' },
        tabBarStyle: { height: 65, paddingBottom: 10, paddingTop: 5 },
        headerShown: true,
        headerStyle: { backgroundColor: '#fff' },
        headerTitleStyle: { fontWeight: '900', color: '#1e293b' },
      }}
    >
      {/* 1. Dashboard / Visits */}
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'My Visits',
          tabBarLabel: 'Visits',
          tabBarIcon: ({ color }) => <Ionicons name="location" size={24} color={color} />,
        }}
      />

      {/* 2. Catalog (Viewing products for customer) */}
      <Tabs.Screen
        name="catalog" 
        options={{
          title: 'Product Catalog',
          tabBarLabel: 'Catalog',
          tabBarIcon: ({ color }) => <Ionicons name="book" size={24} color={color} />,
        }}
      />

      {/* 3. Orders (Tracking sales) */}
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Order Status',
          tabBarLabel: 'Orders',
          tabBarIcon: ({ color }) => <Ionicons name="receipt-outline" size={24} color={color} />,
        }}
      />

      {/* 4. Profile */}
      <Tabs.Screen
        name="profile"
        options={{
          title: 'My Performance',
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}