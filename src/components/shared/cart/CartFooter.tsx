import { YStack } from 'tamagui';
import CartCarosuel from './CartCarosuel';
import CartPay from './CartPay';
import Saving from './Saving';
import { useLocalSearchParams } from 'expo-router';
import { DateData } from 'react-native-calendars';

export default function FooterCart({
  setCurrentStep,
  orderData,
  date,
}: {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  orderData: any;
  date: DateData | null;
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
        <CartPay setCurrentStep={setCurrentStep} orderData={orderData} date={date} />
      </YStack>
    </YStack>
  );
}
