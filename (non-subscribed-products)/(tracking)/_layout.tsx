import { Stack } from 'expo-router';

export default function TrackingLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tracking-step)" options={{ headerShown: false }} />
      <Stack.Screen name="(pick-user)" options={{ headerShown: false }} />
    </Stack>
  );
}
