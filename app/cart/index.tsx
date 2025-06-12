import { View, Text, YStack, Progress, XStack, H2 } from 'tamagui';
import { SafeAreaView } from 'react-native-safe-area-context';
import Step1Active from 'public/images/stepsindicator/step1active.svg';
import Step2Active from 'public/images/stepsindicator/step2Active.svg';
import Step3Active from 'public/images/stepsindicator/step3Active.svg';
import Step2Inactive from 'public/images/stepsindicator/step2InActive.svg';
import Step3Inactive from 'public/images/stepsindicator/step3Inavtive.svg';
import AntDesign from '@expo/vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import DatePicker from '~/components/shared/DatePicker';
export default function Cart() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View flex={1}>
        <DatePicker />
      </View>
      <View padding="$4" pb={'$8'} bg="white">
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
            <CustomStepIndicator currentStep={0} />
          </View>
        </YStack>
      </View>
      <YStack p="$4">
        <YStack gap={12} px="$4" py="$5">
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.2)', 'rgba(255, 184, 23, 0.2)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0.8, y: 1 }}
            style={{
              flex: 1,
              borderRadius: 12,
              paddingHorizontal: 16,
              paddingVertical: 20,
              position: 'absolute',
              inset: 0,
            }}></LinearGradient>

          <Text fontSize={16} fontWeight={700} color="#1E1F20">
            Pick Delivery Date
          </Text>
          <Text color="#FD4F01" fontWeight={500} fontSize={12}>
            NOTE: We don’t deliver on Saturday and Sunday.
          </Text>
        </YStack>
      </YStack>
    </SafeAreaView>
  );
}

const labels = ['Select Date', 'Address', 'Payment'];

type StepIndicatorProps = {
  currentStep: number;
};

function CustomStepIndicator({ currentStep }: StepIndicatorProps) {
  const stepCount = labels.length;
  const progressPercent = Math.round(((currentStep + 1) / stepCount) * 100);

  return (
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

      {/* Step Icons & Labels */}
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
  );
}
