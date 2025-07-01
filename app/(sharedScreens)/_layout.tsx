import { Stack } from 'expo-router';
export default function sharedScreensLayout() {
  return (
    <Stack>
      <Stack.Screen name="productSelect" options={{ headerShown: false }} />
      <Stack.Screen name="subscription" options={{ headerShown: false }} />
      <Stack.Screen name="tracking" options={{ headerShown: false }} />
    </Stack>
  );
}
