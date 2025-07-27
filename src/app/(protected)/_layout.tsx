import { Stack } from 'expo-router';
import AuthGuard from '~/src/components/auth/AuthGuard';
import { useGetProductsQuery } from '~/src/store/apiSlices/products/productsSlice';
import { useGetSmakelijkeProductsQuery } from '~/src/store/apiSlices/products/smakelijke';
import { useGetSupplementsQuery } from '~/src/store/apiSlices/products/supplementsSlice';

export default function ProtectedLayout() {
  const { data: cookd } = useGetSmakelijkeProductsQuery(null);
  const { data: fueld } = useGetProductsQuery(null);
  const { data: suppd } = useGetSupplementsQuery(null);

  return (
    <AuthGuard>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthGuard>
  );
}
