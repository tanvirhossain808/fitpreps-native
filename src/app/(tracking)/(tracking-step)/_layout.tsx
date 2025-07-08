import { Stack } from 'expo-router';

export default function GoalLayout() {
  return (
    <Stack>
      <Stack.Screen name="goal-step" options={{ headerShown: false }} />
    </Stack>
  );
}
