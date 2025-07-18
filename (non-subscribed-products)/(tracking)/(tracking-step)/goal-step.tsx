import { ScrollView, YStack } from 'tamagui';
import GoalStepsIndicator from './partial/GoalStepsIndicator';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import Goals from './partial/Goals';
import WeightRuler from './partial/WeightRuler';
import WeightPicker from './partial/Height';
import HeightRuler from './partial/Height';

export default function GoalStep() {
  const [currentStep, setCurrentStep] = useState(0);
  const steps: Record<number, React.ReactNode> = {
    0: <Goals currentStep={currentStep} setCurrentStep={setCurrentStep} />,
    1: <WeightRuler currentStep={currentStep} setCurrentStep={setCurrentStep} />,
    2: <HeightRuler currentStep={currentStep} setCurrentStep={setCurrentStep} />,
  };
  return (
    <YStack
      backgroundColor="linear-gradient(180deg, rgba(255, 255, 255, 0.13) 0%, rgba(138, 173, 255, 0.13) 100%)"
      f={1}>
      <SafeAreaView style={{ ...style.container }}>
        <GoalStepsIndicator setCurrentStep={setCurrentStep} currentStep={currentStep} />
        <ScrollView f={1}>
          <YStack f={1} py={100} px="$4">
            {steps[currentStep]}
          </YStack>
        </ScrollView>
      </SafeAreaView>
    </YStack>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});
