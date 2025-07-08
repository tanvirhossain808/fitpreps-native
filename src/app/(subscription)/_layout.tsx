import { Stack } from 'expo-router';

export default function SubscriptionLayout() {
  return (
    <Stack>
      <Stack.Screen name="upgradeSubscription" options={{ headerShown: false }} />
      <Stack.Screen name="cancelSubscription" options={{ headerShown: false }} />
      <Stack.Screen name="subscriptionQuit" options={{ headerShown: false }} />
      <Stack.Screen name="pauseSubscription" options={{ headerShown: false }} />
    </Stack>
  );
}
