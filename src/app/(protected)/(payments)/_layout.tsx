import { Stack } from 'expo-router';

export default function Payment() {
  return (
    <Stack>
      <Stack.Screen name="manage-card" options={{ headerShown: false }} />
      <Stack.Screen name="add-cards" options={{ headerShown: false }} />
    </Stack>
  );
}
