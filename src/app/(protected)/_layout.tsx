import { Stack } from 'expo-router';
import AuthGuard from '~/src/components/auth/AuthGuard';

export default function ProtectedLayout() {
  return (
    <AuthGuard>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthGuard>
  );
}
