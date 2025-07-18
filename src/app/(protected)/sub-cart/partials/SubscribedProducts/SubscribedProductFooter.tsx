import { YStack } from 'tamagui';
import { useLocalSearchParams } from 'expo-router';
import SubscribedProductsPay from './SubscribedProductsPay';
import Saving from '~/src/components/shared/cart/Saving';
import CartCarosuel from '~/src/components/shared/cart/CartCarosuel';

export default function SubscribeFooter({
  setCurrentStep,
  orderData,
}: {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  orderData: any;
}) {
  const { cartType } = useLocalSearchParams() || {};
  return (
    <YStack flex={1} gap="$3" mt={12}>
      {cartType === 'meals' && <Saving />}
      {cartType === 'meals' && (
        <YStack pt="$5" pb="$2" gap="$3">
          <CartCarosuel />
        </YStack>
      )}
      <YStack flex={1}>
        <SubscribedProductsPay setCurrentStep={setCurrentStep} orderData={{}} />
      </YStack>
    </YStack>
  );
}
