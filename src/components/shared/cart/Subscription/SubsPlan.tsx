import { Text, YStack } from 'tamagui';
import Saving from '../Saving';
import CartDatePicker from '../CartDatePicker';
import { useLocalSearchParams } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { setStartDate } from '~/src/store/slices/subscriptionSlice';
import { RootState } from '~/src/store';
import { SubPlan } from '~/src/types/type';
import { DateData } from 'react-native-calendars';

export default function SubsPlan({ selectedSubPlan }: { selectedSubPlan: SubPlan }) {
  const { subscriptionType } = useLocalSearchParams() || {};
  const dispatch = useDispatch();
  const handleDatePicker = (date: any) => {
    dispatch(setStartDate(date.dateString));
  };
  const date: DateData | null = useSelector((s: RootState) => s.subPurchase.startDate);
  console.log(date, 'dates');
  return (
    <YStack gap={12} mb="$5" justifyContent="space-between">
      <Saving isCommingSoon={true} />
      <CartDatePicker
        isDisabled={selectedSubPlan?.planType === 'Monthly' ? true : false}
        date={date}
        handleDateSelect={handleDatePicker}
        cartType={'subscription' as string}
      />
    </YStack>
  );
}
