import { useEffect, useState } from 'react';
import SubscribedProductCartStep1 from '../subcription-purchase/partials/SubscribedProducts/SubscribedProductCartStep1';
import SubscribedProductCartStep2 from '../subcription-purchase/partials/SubscribedProducts/SubscribedProductCartStep2';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import SubscribeStep from '../subcription-purchase/partials/SubscribedProducts/SubscribeStep';
import { useLocalSearchParams } from 'expo-router';
import { DateData } from 'react-native-calendars';
import { useDispatch } from 'react-redux';
import { resetSubCart } from '~/src/store/slices/subcartSlice';

export default function PurchaseSubCart() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isShowMapModal, setShowMapModal] = useState<boolean>(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isEditAddress, setIsEditAddress] = useState(false);
  const [selectedDate, setSelectedDate] = useState<DateData | null>(null);
  const { cartType = 'meals', subscriptionType } = useLocalSearchParams() || {};

  const cartSteps: { [key: number]: any } = {
    0: (
      <SubscribedProductCartStep1
        setCurrentStep={setCurrentStep}
        cartType={cartType as string}
        orderData={{}}
        date={selectedDate}
        setDate={setSelectedDate}
      />
    ),
    1: (
      <SubscribedProductCartStep2
        date={selectedDate}
        setDate={setSelectedDate}
        isAddressModalOpen={isAddressModalOpen}
        setIsAddressModalOpen={setIsAddressModalOpen}
        setCurrentStep={setCurrentStep}
        isEditAddress={isEditAddress}
        setIsEditAddress={setIsEditAddress}
        isShowMapModal={isShowMapModal}
        setShowMapModal={setShowMapModal}
      />
    ),
  };

  const CurrentStep = cartSteps[currentStep] || cartSteps[0];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar style="dark" />
      <SubscribeStep
        cartType={'meals' as string}
        setIsEditAddress={setIsEditAddress}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        isEditAddress={isEditAddress}
        isShowMapModal={isShowMapModal}
        isAddressModalOpen={isAddressModalOpen}
        setIsAddressModalOpen={setIsAddressModalOpen}
        setShowMapModal={setShowMapModal}
        isSubsCribedProduct={true}
      />
      {CurrentStep}
    </SafeAreaView>
  );
}
