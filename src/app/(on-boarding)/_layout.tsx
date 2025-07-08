import { Stack } from 'expo-router';
import { useGetProductsQuery } from '~/src/store/apiSlices/products/productsSlice';

export default function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
