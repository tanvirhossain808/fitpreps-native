import { useState } from 'react';
import SubscribedProductCartStep1 from '../subcription-purchase/partials/SubscribedProducts/SubscribedProductCartStep1';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams } from 'expo-router';
import { DateData } from 'react-native-calendars';

export default function PurchaseSubCart() {
  const [selectedDate, setSelectedDate] = useState<DateData | null>(null);
  const { cartType = 'meals', subscriptionType } = useLocalSearchParams() || {};

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar style="dark" />
      <SubscribedProductCartStep1
        cartType={cartType as string}
        orderData={{}}
        date={selectedDate}
        setDate={setSelectedDate}
      />
    </SafeAreaView>
  );
}
