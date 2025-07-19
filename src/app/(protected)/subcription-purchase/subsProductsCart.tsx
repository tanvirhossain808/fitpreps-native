import { SafeAreaView } from 'react-native-safe-area-context';
import StepIndicator from '~/src/components/shared/StepIndicator';
import { useEffect, useState } from 'react';
import CartStep2 from '~/src/components/shared/cart/CartStep2';
import CartStep3 from '~/src/components/shared/cart/CartStep3';
import { useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { RootState } from '~/src/store';

import { useOrderData } from '~/src/hooks/useOrderData';
import SubscribedProductCartStep1 from './partials/SubscribedProducts/SubscribedProductCartStep1';
import SubscribedProductCartStep2 from './partials/SubscribedProducts/SubscribedProductCartStep2';
import SubscribeStep from './partials/SubscribedProducts/SubscribeStep';
import CartStep1 from '~/src/components/shared/cart/CartStep1';

export default function PurchaseSubCart() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isShowMapModal, setShowMapModal] = useState<boolean>(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isEditAddress, setIsEditAddress] = useState(false);
  const { cartType = 'meals', subscriptionType } = useLocalSearchParams() || {};

  // const { sub, tax, shippingFee, discount, final } = useCartLogic();
  // useEffect(() => {
  //   if (sub > 125) {
  //     dispatch(setShipping(0));
  //   }
  //   dispatch(setSubTotal(sub));
  // }, [sub]);

  const cartSteps: { [key: number]: any } = {
    0: (
      <SubscribedProductCartStep1
        setCurrentStep={setCurrentStep}
        cartType={cartType as string}
        orderData={{}}
      />
    ),
    1: (
      <SubscribedProductCartStep2
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
