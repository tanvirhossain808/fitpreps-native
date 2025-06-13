import { Progress, Text, View, XStack, YStack } from 'tamagui';
import Step1Active from 'public/images/stepsindicator/step1active.svg';
import Step2Active from 'public/images/stepsindicator/step2Active.svg';
import Step3Active from 'public/images/stepsindicator/step3Active.svg';
import Step2Inactive from 'public/images/stepsindicator/step2InActive.svg';
import Step3Inactive from 'public/images/stepsindicator/step3Inavtive.svg';
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';

type StepIndicatorProps = {
  currentStep: number;
};

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  const labels = ['Select Date', 'Address', 'Payment'];
  const stepCount = labels.length;
  const progressPercent = Math.round(((currentStep + 1) / stepCount) * 100);

  return (
    <>
      <View p="$4">
        <View pb="$5" bg="white">
          <YStack gap={'$7'}>
            <XStack alignItems="center" gap="$2">
              <TouchableOpacity onPress={() => router.back()}>
                <AntDesign name="left" size={24} color="black" />
              </TouchableOpacity>
              <Text fontSize={20} fontWeight={700}>
                Cart
              </Text>
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
