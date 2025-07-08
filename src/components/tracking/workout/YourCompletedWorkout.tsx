import { Text, XStack, YStack } from 'tamagui';
import CheckCircle from '~/public/images/check-circle-blue.svg';

export default function YourCompletedWorkout() {
  return (
    <XStack f={1} w="100%" p={8} gap={8}>
      <CheckCircle />
      <YStack flex={1} gap={10}>
        <XStack alignSelf="stretch" justifyContent="space-between">
          <Text>30 mins</Text>
          <XStack gap="$1" alignSelf="stretch">
            <Text p={8} bg="#FC0" borderRadius={20} fontSize={10} fontWeight={700}>
              Beginner
            </Text>
            <Text
              p={8}
              bg="$tracking-primary"
              color="white"
              borderRadius={20}
              fontSize={10}
              fontWeight={700}>
              Strength Training
            </Text>
          </XStack>
        </XStack>
        <Text fontSize={13}>
          Lorem ipsum dolor sit amet, conse ctetur adipiscing elit, sed do eiusmod tempor
          incididunt.
        </Text>
      </YStack>
    </XStack>
  );
}
