import { SafeAreaView } from 'react-native-safe-area-context';
import StepIndicator from '~/components/shared/StepIndicator';
import { useState } from 'react';
import CartStep2 from '~/components/shared/cart/CartStep2';
import CartStep3 from '~/components/shared/cart/CartStep3';
import CartStep1 from '~/components/shared/cart/CartStep1';
import { useLocalSearchParams } from 'expo-router';
export default function Cart() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isShowMapModal, setShowMapModal] = useState<boolean>(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isEditAddress, setIsEditAddress] = useState(false);
  const { cartType = 'meals', subscriptionType, packId } = useLocalSearchParams() || {};
  const cartSteps: { [key: number]: any } = {
    0: <CartStep1 setCurrentStep={setCurrentStep} cartType={cartType as string} />,
    1: (
      <CartStep2
        isAddressModalOpen={isAddressModalOpen}
        setIsAddressModalOpen={setIsAddressModalOpen}
        setCurrentStep={setCurrentStep}
        isEditAddress={isEditAddress}
        setIsEditAddress={setIsEditAddress}
        isShowMapModal={isShowMapModal}
        setShowMapModal={setShowMapModal}
      />
    ),
    2: <CartStep3 setCurrentStep={setCurrentStep} subsType={subscriptionType as string} />,
  };

  const CurrentStep = cartSteps[currentStep] || cartSteps[0];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StepIndicator
        cartType={cartType as string}
        setIsEditAddress={setIsEditAddress}
        currentStep={currentStep}
        isEditAddress={isEditAddress}
        isShowMapModal={isShowMapModal}
        isAddressModalOpen={isAddressModalOpen}
        setIsAddressModalOpen={setIsAddressModalOpen}
        setShowMapModal={setShowMapModal}
      />
      {CurrentStep}
    </SafeAreaView>
  );
}
