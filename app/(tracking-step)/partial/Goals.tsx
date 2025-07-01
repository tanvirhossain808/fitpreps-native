import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Button, Text, XStack, YStack } from 'tamagui';
import { shadows } from '~/constant';

export default function Goals({
  currentStep,
  setCurrentStep,
}: {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const handleNextSteps = () => {
    if (selectedGoal) {
      setCurrentStep(() => 1);
    }
    return;
  };
  return (
    <YStack gap="$10">
      <Text textAlign="center" fontSize={16} fontWeight={500}>
        What’s your goal?
      </Text>
      <YStack gap="$3" px={'$3'}>
        {goals.map(({ name }, i) => (
          <TouchableOpacity key={i} onPress={() => setSelectedGoal(name)}>
            <XStack
              px="$3"
              py={10}
              bg="white"
              borderRadius={12}
              borderWidth={selectedGoal === name ? 2 : 1}
              borderColor={selectedGoal === name ? '$tracking-primary' : '#EDEEF1'}>
              <Text fontSize={16} fontWeight={500}>
                {name}
              </Text>
            </XStack>
          </TouchableOpacity>
        ))}
      </YStack>
      <XStack justifyContent="center">
        <Button
          {...shadows.small}
          px="$5"
          color="white"
          fontSize={16}
          fontWeight={700}
          bg="#FD4F01"
          onPress={handleNextSteps}>
          Next
        </Button>
      </XStack>
    </YStack>
  );
}

const goals = [
  {
    name: 'Weight Loss',
  },
  {
    name: 'Gain Muscle',
  },
  {
    name: 'Maintain',
  },
];
