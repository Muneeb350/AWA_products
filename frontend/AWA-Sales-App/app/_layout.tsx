import { Stack } from 'expo-router';
import { CartProvider } from '../components/cart-context';

export default function RootLayout() {
  return (
    /* Provider sab se bahar hona chahiye */
    <CartProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        {/* Baaki screens... */}
      </Stack>
    </CartProvider>
  );
}