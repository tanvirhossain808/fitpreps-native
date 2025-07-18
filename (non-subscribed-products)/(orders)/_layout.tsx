import { Stack } from 'expo-router';

export default function OrdersLayout() {
  return (
    <Stack>
      <Stack.Screen name="track-order" options={{ headerShown: false }} />
      <Stack.Screen name="order-details" options={{ headerShown: false }} />
    </Stack>
  );
}
