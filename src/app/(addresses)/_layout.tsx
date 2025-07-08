import { Stack } from 'expo-router';

export default function AddressLayout() {
  return (
    <Stack>
      <Stack.Screen name="new-address" options={{ headerShown: false }} />
      <Stack.Screen name="current-location" options={{ headerShown: false }} />
      <Stack.Screen name="edit-address" options={{ headerShown: false }} />
    </Stack>
  );
}
