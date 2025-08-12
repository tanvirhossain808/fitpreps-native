import { YStack } from 'tamagui';
import { useLocalSearchParams } from 'expo-router';
import SubscribedProductsPay from './SubscribedProductsPay';
import Saving from '~/src/components/shared/cart/Saving';
import CartCarosuel from '~/src/components/shared/cart/CartCarosuel';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { resetSubCart, SubEmptyCart } from '~/src/store/slices/subcartSlice';
import { DateData } from 'react-native-calendars';

export default function SubscribeFooter({
  orderData,
  selectedDate,
}: {
  orderData: any;
  selectedDate: DateData | null;
}) {
  console.log(selectedDate, 'date');
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
        <SubscribedProductsPay
          selectedDate={selectedDate}
          orderData={{}}
        />
      </YStack>
    </YStack>
  );
}
