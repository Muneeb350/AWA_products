import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';

type IoniconsName = keyof typeof Ionicons.glyphMap;

function TabIcon({
  name,
  color,
  focused,
}: {
  name: IoniconsName;
  color: string;
  focused: boolean;
}): React.JSX.Element {
  return (
    <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
      <Ionicons name={name} size={22} color={color} />
    </View>
  );
}

export default function CustomerLayout(): React.JSX.Element {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#059669',
        tabBarInactiveTintColor: '#94a3b8',
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '700',
          marginBottom: 5,
        },
        tabBarStyle: {
          height: 72,
          paddingTop: 6,
          backgroundColor: '#ffffff',
          borderTopWidth: 0,
          elevation: 24,
          shadowColor: '#0f172a',
          shadowOffset: { width: 0, height: -6 },
          shadowOpacity: 0.09,
          shadowRadius: 24,
        },
        headerShown: true,
        headerStyle: {
          backgroundColor: '#ffffff',
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: '#f1f5f9',
        },
        headerTitleStyle: {
          fontWeight: '900',
          color: '#0f172a',
          fontSize: 20,
          letterSpacing: -0.5,
        },
        headerTitleAlign: 'center',
      }}
    >
      {/* Tab 1 — Home (custom floating header lives inside the screen) */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'AWA Products',
          tabBarLabel: 'Home',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              name={focused ? 'storefront' : 'storefront-outline'}
              color={color}
              focused={focused}
            />
          ),
        }}
      />

      {/* Tab 2 — Favorites */}
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'My Wishlist',
          tabBarLabel: 'Favorites',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              name={focused ? 'heart' : 'heart-outline'}
              color={color}
              focused={focused}
            />
          ),
        }}
      />

      {/* Tab 3 — Cart */}
      <Tabs.Screen
        name="cart"
        options={{
          title: 'My Cart',
          tabBarLabel: 'Cart',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              name={focused ? 'cart' : 'cart-outline'}
              color={color}
              focused={focused}
            />
          ),
        }}
      />

      {/* Tab 4 — Orders */}
      <Tabs.Screen
        name="orders"
        options={{
          title: 'My Orders',
          tabBarLabel: 'Orders',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              name={focused ? 'receipt' : 'receipt-outline'}
              color={color}
              focused={focused}
            />
          ),
        }}
      />

      {/* Hidden screens — accessible via router.push() but never shown in the tab bar */}
      <Tabs.Screen name="shop"      options={{ href: null, headerShown: false }} />
      <Tabs.Screen name="checkout"  options={{ href: null, headerShown: false }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconWrap: {
    width: 46,
    height: 30,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  iconWrapActive: {
    backgroundColor: '#d1fae5',
  },
});
