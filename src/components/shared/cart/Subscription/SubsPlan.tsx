import { Text, YStack } from 'tamagui';
import Saving from '../Saving';
import CartDatePicker from '../CartDatePicker';
import { useLocalSearchParams } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { setStartDate } from '~/src/store/slices/subscriptionSlice';
import { RootState } from '~/src/store';

export default function SubsPlan() {
  const { subscriptionType } = useLocalSearchParams() || {};
  const dispatch = useDispatch();
  const handleDatePicker = (date: any) => {
    dispatch(setStartDate(date.dateString));
  };
  const date = useSelector((s: RootState) => s.subPurchase.startDate);
  console.log(subscriptionType, 'd');
  return (
    <YStack gap={12} mb="$5">
      <Saving isCommingSoon={true} />
      <CartDatePicker
        date={date}
        handleDateSelect={handleDatePicker}
        cartType={'subscription' as string}
      />
    </YStack>
  );
}
