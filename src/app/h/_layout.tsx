import { Stack } from 'expo-router';
export default function sharedScreensLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
