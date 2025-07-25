import { Stack } from 'expo-router';
import AuthGuard from '~/src/components/auth/AuthGuard';
import { useGetSmakelijkeProductsQuery } from '~/src/store/apiSlices/products/smakelijke';

export default function ProtectedLayout() {
  const { data: cookd, isLoading } = useGetSmakelijkeProductsQuery(null);

  return (
    <AuthGuard>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthGuard>
  );
}
