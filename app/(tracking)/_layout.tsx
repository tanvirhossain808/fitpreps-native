import { Stack } from 'expo-router';

export default function TrackingLayout() {
  return (
    <Stack>
      <Stack.Screen name="goal-step" options={{ headerShown: false }} />
    </Stack>
  );
}
