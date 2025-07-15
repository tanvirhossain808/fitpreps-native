import { Stack } from 'expo-router';

export default function PickUserLayout() {
  return (
    <Stack>
      <Stack.Screen name="pick-user" options={{ headerShown: false }} />
    </Stack>
  );
}
