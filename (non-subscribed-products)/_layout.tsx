import { Slot } from 'expo-router';

export default function NonSubscribedProductsLayout() {
  return <Slot screenOptions={{ headerShown: false }} />;
}
