// components/OrderStepper.tsx
import { View } from 'react-native';
import { Text, YStack, XStack, Button } from 'tamagui';
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';

const stepData = [
  {
    label: 'Order placed',
    date: 'on April 14, Monday',
  },
  {
    label: 'Order packed in warehouse',
    date: 'on April 14, Monday',
  },
  {
    label: 'Order out for delivery',
    date: '',
  },
  {
    label: 'Order Delivered',
    date: '',
  },
];

export default function OrderStepper() {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <YStack px="$4" py="$6" bg="white">
      <YStack gap={28}>
        {stepData.map((step, index) => {
          let status: 'done' | 'active' | 'pending' = 'pending';
          if (index === 0) {
            status = 'done'; // always true for "Order placed"
          } else if (index < currentStep) {
            status = 'done';
          } else if (index === currentStep) {
            status = 'active';
          }
          if (index === stepData.length - 1 && currentStep >= stepData.length - 1) {
            status = 'done';
          }
          const isLast = index === stepData.length - 1;
          const nextStatus =
            index + 1 < currentStep ? 'done' : index + 1 === currentStep ? 'active' : 'pending';

          const color = status === 'done' ? '#009A21' : status === 'active' ? '#FD4F01' : '#B6BAC3';

          const lineColor =
            nextStatus === 'done' || nextStatus === 'active' ? '#009A21' : '#EDEEF1';

          const showTopCap = index === 0 && status === 'done';

          return (
            <XStack key={index} alignItems="flex-start" position="relative">
              {/* Vertical Line */}
              {!isLast && (
                <View
                  style={{
                    position: 'absolute',
                    top: 24,
                    left: 9,
                    height: 40,
                    width: 6,
                    backgroundColor: lineColor,
                  }}
                />
              )}

              {/* Top Rounded Cap */}
              {showTopCap && (
                <View
                  style={{
                    position: 'absolute',
                    top: -8,
                    left: 9,
                    width: 6,
                    height: 10,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    backgroundColor: '#16a34a',
                  }}
                />
              )}

              {/* Icon Circle */}
              <YStack
                width={24}
                height={24}
                borderRadius={12}
                bg="white"
                borderWidth={2}
                borderColor={color}
                alignItems="center"
                justifyContent="center"
                mt={1}>
                {status === 'done' ? (
                  <Feather name="check" size={14} color={color} />
                ) : (
                  <Feather name="check" size={14} color={color} />
                )}
              </YStack>

              {/* Step Content */}
              <XStack gap={2} alignItems="center" ml="$2" flex={1}>
                <Text fontSize={13} fontWeight="500" color={color}>
                  {step.label}
                </Text>
                {step.date ? (
                  <Text color="#B6BAC3" fontSize={13} fontWeight={500} textWrap="wrap">
                    {step.date}
                  </Text>
                ) : null}
              </XStack>
            </XStack>
          );
        })}
      </YStack>
    </YStack>
  );
}
