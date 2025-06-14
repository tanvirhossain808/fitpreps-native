import { SafeAreaView } from 'react-native-safe-area-context';
import StepIndicator from '~/components/shared/StepIndicator';
import { useState } from 'react';
import CartStep2 from '~/components/shared/cart/CartStep2';
import CartStep3 from '~/components/shared/cart/CartStep3';
import CartStep1 from '~/components/shared/cart/CartStep1';
export default function Cart() {
  const [currentStep, setCurrentStep] = useState<number>(2);
  const [isShowMapModal, setShowMapModal] = useState<boolean>(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isEditAddress, setIsEditAddress] = useState(false);

  const cartSteps: { [key: number]: any } = {
    0: <CartStep1 setCurrentStep={setCurrentStep} />,
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
    2: <CartStep3 setCurrentStep={setCurrentStep} />,
  };

  const CurrentStep = cartSteps[currentStep] || cartSteps[0];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StepIndicator
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
