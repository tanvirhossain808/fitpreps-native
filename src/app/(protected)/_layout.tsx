import { Slot, Stack } from 'expo-router';
import AuthGuard from '~/src/components/auth/AuthGuard';

export default function ProtectedLayout() {
  return (
    <AuthGuard>
      <Slot screenOptions={{ headerShown: false }} />
    </AuthGuard>
  );
}
