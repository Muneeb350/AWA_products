import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function CustomerLayout() {
  return (
    <Tabs screenOptions={{ 
      tabBarActiveTintColor: '#059669', // Customer ke liye Green theme
      headerShown: true,
      headerStyle: { backgroundColor: '#fff' },
      headerTitleStyle: { fontWeight: '900', color: '#1e293b' }
    }}>
      <Tabs.Screen
        name="shop"
        options={{
          title: 'AWA Shop',
          tabBarIcon: ({ color }) => <Ionicons name="basket" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'My Orders',
          tabBarIcon: ({ color }) => <Ionicons name="receipt" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}