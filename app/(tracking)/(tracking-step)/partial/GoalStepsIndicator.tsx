import { Progress, Text, View, XStack, YStack } from 'tamagui';
import Step1Active from 'public/images/stepsindicator/step1active.svg';
import Step2Active from 'public/images/stepsindicator/step2Active.svg';
import Step3Active from 'public/images/stepsindicator/step3Active.svg';
import Step2Inactive from 'public/images/stepsindicator/step2InActive.svg';
import Step3Inactive from 'public/images/stepsindicator/step3Inavtive.svg';
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Dispatch, SetStateAction, useEffect } from 'react';
import Check from 'public/images/Check mark.svg';
type StepIndicatorProps = {
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
};

export default function GoalStepsIndicator({
  currentStep = 1,
  setCurrentStep,
}: StepIndicatorProps) {
  const labels = ['Goal', 'Weight', 'Height'];
  const stepCount = labels.length;
  let progressPercent = Math.round(((currentStep + 1) / stepCount) * 100);
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };
  return (
    <>
      <View p="$4">
        <View pb="$5">
          <YStack gap={'$7'}>
            <XStack alignItems="center" gap="$2">
              <TouchableOpacity style={{ zIndex: 20 }} onPress={() => handleBack()}>
                <AntDesign name="left" size={24} color="black" />
              </TouchableOpacity>

              <Text fontSize={20} fontWeight={700}>
                Add Goal
              </Text>
            </XStack>
            <View>
              <View backgroundColor="white" position="relative">
                <Progress value={progressPercent} zIndex={0} height={6} backgroundColor="#EDEEF1">
                  <Progress.Indicator
                    animation="bouncy"
                    zIndex={1}
                    backgroundColor="#588DF5"
                    borderRadius={9999}
                    style={{
                      minWidth: progressPercent === 0 ? 12 : undefined,
                    }}
                  />
                </Progress>
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
                  {labels.map((label, index) => {
                    const color = index <= currentStep ? '#588DF5' : '#8E95A2';

                    return (
                      <View key={index} alignItems="center" left={0}>
                        <Check style={{ color }} />
                        <Text fontSize={12} color={color} marginTop="$1">
                          {label}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              </View>
            </View>
          </YStack>
        </View>
      </View>
    </>
  );
}
