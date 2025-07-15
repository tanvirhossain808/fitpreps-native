// src/components/auth/AuthGuard.tsx
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '~/src/store';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!user) {
      router.replace('/(auth)');
    }
  }, [user]);

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
