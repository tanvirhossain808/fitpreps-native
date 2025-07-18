import { SafeAreaView } from 'react-native-safe-area-context';
import StepIndicator from '~/src/components/shared/StepIndicator';
import { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import PurchaseStep1 from './partials/purchase-sub/PurchaseStep-1';
import PurchaseStep2 from './partials/purchase-sub/PurchaseStep-2';
import PurchaseStep3 from './partials/purchase-sub/PurchaseStep-3';
import { subscriptionPlans } from '~/src/constant';
import { SubPlan as sp } from '~/src/types/type';
import { useDispatch } from 'react-redux';
import { resetSubscriptionForm } from '~/src/store/slices/subscriptionSlice';
export default function PurchaseSubCart() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isShowMapModal, setShowMapModal] = useState<boolean>(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isEditAddress, setIsEditAddress] = useState(false);
  const { selectedPlan: subPlan } = useLocalSearchParams() || {};
  const [selectedSubPlan, setSelectedSubPlan] = useState<sp>(
    subPlan ? JSON.parse(subPlan as string) : null
  );
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(resetSubscriptionForm());
    };
  }, []);
  const cartSteps: { [key: number]: any } = {
    0: (
      <PurchaseStep1
        selectedSubPlan={selectedSubPlan}
        setCurrentStep={setCurrentStep}
        cartType={'meals' as string}
        orderData={{}}
      />
    ),
    1: (
      <PurchaseStep2
        isAddressModalOpen={isAddressModalOpen}
        setIsAddressModalOpen={setIsAddressModalOpen}
        setCurrentStep={setCurrentStep}
        isEditAddress={isEditAddress}
        setIsEditAddress={setIsEditAddress}
        isShowMapModal={isShowMapModal}
        setShowMapModal={setShowMapModal}
      />
    ),
    2: <PurchaseStep3 setCurrentStep={setCurrentStep} subsType={'subscription' as string} />,
  };

  const CurrentStep = cartSteps[currentStep] || cartSteps[0];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar style="dark" />
      <StepIndicator
        cartType={'subscription' as string}
        setIsEditAddress={setIsEditAddress}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
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
