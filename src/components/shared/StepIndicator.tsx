import { Progress, Text, View, XStack, YStack } from 'tamagui';
import Step1Active from 'public/images/stepsindicator/step1active.svg';
import Step2Active from 'public/images/stepsindicator/step2Active.svg';
import Step3Active from 'public/images/stepsindicator/step3Active.svg';
import Step2Inactive from 'public/images/stepsindicator/step2InActive.svg';
import Step3Inactive from 'public/images/stepsindicator/step3Inavtive.svg';
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect } from 'react';

type StepIndicatorProps = {
  currentStep: number;
  isEditAddress?: boolean;
  isShowMapModal?: boolean;
  setIsEditAddress?: React.Dispatch<React.SetStateAction<boolean>>;
  setShowMapModal?: React.Dispatch<React.SetStateAction<boolean>>;
  isAddressModalOpen?: boolean;
  setIsAddressModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentStep?: React.Dispatch<React.SetStateAction<number>>;
  cartType?: string;
  isSubsCribedProduct?: boolean;
  stepTitle?: string;
  totalSteps?: number;
};

export default function StepIndicator({
  currentStep,
  isEditAddress = false,
  isShowMapModal = false,
  setIsEditAddress,
  setShowMapModal,
  isAddressModalOpen = false,
  setIsAddressModalOpen,
  setCurrentStep,
  cartType,
  isSubsCribedProduct = false,
  stepTitle,
  totalSteps = 3,
}: StepIndicatorProps) {
  // Updated Dutch labels to match web checkout
  const labels = ['Winkelwagen', 'Bezorggegevens', 'Betaling'];
  const labelsSubscribed = ['Datum Selecteren', 'Adres'];
  const stepCount = totalSteps || labels.length;
  let progressPercent = Math.round(((currentStep + 1) / stepCount) * 100);

  // Use provided stepTitle or determine based on current state
  let text = stepTitle || 'Checkout';

  useEffect(() => {
    if (isSubsCribedProduct) {
      progressPercent = Math.round((currentStep / stepCount) * 100);
    } else {
      progressPercent = Math.round(((currentStep + 1) / stepCount) * 100);
    }
  }, [cartType, currentStep, stepCount]);

  // Dynamic text based on current state
  if (!stepTitle) {
    if (isEditAddress && !isShowMapModal && cartType === 'meals') {
      text = 'Adres Bewerken';
    } else if (isShowMapModal) {
      text = 'Bezorglocatie Selecteren';
    } else if (isAddressModalOpen) {
      text = 'Nieuw Adres Toevoegen';
    } else if (cartType === 'subscription') {
      text = 'Abonnement Kopen';
    } else {
      // Default step titles based on current step
      switch (currentStep) {
        case 0:
          text = 'Winkelwagen';
          break;
        case 1:
          text = 'Bezorggegevens';
          break;
        case 2:
          text = 'Betalingssamenvatting';
          break;
        default:
          text = 'Checkout';
      }
    }
  }

  const handleBack = () => {
    if (currentStep === 0) {
      return router.back();
    }
    
    if (isShowMapModal && setShowMapModal) {
      setShowMapModal(false);
    } else if (isEditAddress && setIsAddressModalOpen && setIsEditAddress && !setShowMapModal) {
      setIsAddressModalOpen(false);
      setIsEditAddress(false);
    } else if (isAddressModalOpen && setIsAddressModalOpen) {
      setIsAddressModalOpen(false);
      if (setIsEditAddress) {
        setIsEditAddress(false);
      }
    } else {
      if (currentStep > 0) {
        setCurrentStep && setCurrentStep(currentStep - 1);
      } else {
        router.back();
      }
    }
  };

  return (
    <>
      <View p="$4">
        <View pb="$5" bg="white">
          <YStack gap={'$7'}>
            <XStack alignItems="center" gap="$2">
              <TouchableOpacity style={{ zIndex: 20 }} onPress={() => handleBack()}>
                <AntDesign name="left" size={24} color="black" />
              </TouchableOpacity>
              {text === 'Winkelwagen' || text === 'Abonnement Kopen' ? (
                <Text fontSize={20} fontWeight={700}>
                  {text}
                </Text>
              ) : (
                <Text
                  fontSize={20}
                  fontWeight={700}
                  position="absolute"
                  left={0}
                  right={0}
                  textAlign="center">
                  {text}
                </Text>
              )}
            </XStack>
            <View>
              <View backgroundColor="white" position="relative">
                <Progress value={progressPercent} zIndex={0} height={6} backgroundColor="#FFEDE5">
                  <Progress.Indicator
                    animation="bouncy"
                    zIndex={1}
                    backgroundColor="#FD4F01"
                    borderRadius={9999}
                    style={{
                      minWidth: progressPercent === 0 ? 12 : undefined,
                    }}
                  />
                </Progress>

                {!isSubsCribedProduct && (
                  <View
                    position="absolute"
                    left={0}
                    right={0}
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                    zIndex={1}
                    top={-8}
                    paddingHorizontal="$4">
                    {labels.slice(0, stepCount).map((label, index) => {
                      let IconComponent: React.ElementType = Step1Active;

                      if (index === 0) {
                        IconComponent = Step1Active;
                      } else if (index === 1) {
                        IconComponent = currentStep >= 1 ? Step2Active : Step2Inactive;
                      } else if (index === 2) {
                        IconComponent = currentStep >= 2 ? Step3Active : Step3Inactive;
                      }

                      const isActive = index <= currentStep;
                      const color = isActive ? '#FD4F01' : '#999';

                      return (
                        <View key={index} alignItems="center" left={0}>
                          <IconComponent width={20} height={20} />
                          <Text fontSize={12} color={color} marginTop="$1" textAlign="center">
                            {label}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                )}
                {isSubsCribedProduct && (
                  <View
                    position="absolute"
                    left={0}
                    right={0}
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                    zIndex={1}
                    top={-8}
                    paddingHorizontal="$4">
                    {labelsSubscribed.map((label, index) => {
                      let IconComponent: React.ElementType = Step1Active;

                      if (index === 0) {
                        IconComponent = Step1Active;
                      } else if (index === 1) {
                        IconComponent = currentStep >= 1 ? Step2Active : Step2Inactive;
                      }

                      const isActive = index <= currentStep;
                      const color = isActive ? '#FD4F01' : '#999';

                      return (
                        <View key={index} alignItems="center" left={0}>
                          <IconComponent width={20} height={20} />
                          <Text fontSize={12} color={color} marginTop="$1" textAlign="center">
                            {label}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                )}
              </View>
            </View>
          </YStack>
        </View>
      </View>
    </>
  );
}
