import { Text, YStack } from 'tamagui';
import Saving from '../Saving';
import CartDatePicker from '../CartDatePicker';
import { useLocalSearchParams } from 'expo-router';

export default function SubsPlan() {
  const { subscriptionType } = useLocalSearchParams() || {};
  return (
    <YStack gap={12} mb="$5">
      <Saving />
      <CartDatePicker cartType={subscriptionType as string} />
    </YStack>
  );
}
