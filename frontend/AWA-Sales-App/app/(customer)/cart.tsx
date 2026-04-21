import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function CustomerLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#059669', // Customer Green Theme
        tabBarInactiveTintColor: '#94a3b8',
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
        tabBarStyle: {
          paddingBottom: 5,
          height: 60,
        },
        headerShown: true,
        headerStyle: { backgroundColor: '#fff' },
        headerTitleStyle: { fontWeight: '900', color: '#1e293b' },
      }}
    >
      {/* 1. Shop Tab */}
      <Tabs.Screen
        name="shop"
        options={{
          title: 'AWA Shop',
          tabBarLabel: 'Shop',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="basket" size={size} color={color} />
          ),
        }}
      />

      {/* 2. Cart Tab */}
      <Tabs.Screen
        name="cart"
        options={{
          title: 'My Cart',
          tabBarLabel: 'Cart',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart" size={size} color={color} />
          ),
        }}
      />

      {/* 3. Orders Tab */}
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Order History',
          tabBarLabel: 'Orders',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="receipt" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}