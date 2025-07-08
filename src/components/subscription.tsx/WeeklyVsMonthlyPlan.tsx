import { Text, XStack, YStack } from 'tamagui';
import { weeklyPlans } from '~/src/constant';

export default function WeeklyVsMonthlyPlan() {
  return (
    <YStack>
      <XStack alignItems="center">
        <XStack bg="rgba(248, 210, 68, 0.49)" py={8} borderTopStartRadius={12} width="50%">
          <Text
            textAlign="center"
            width={'100%'}
            color="#FD4F01"
            textTransform="uppercase"
            fontSize={24}
            fontWeight={700}>
            weekly{' '}
          </Text>
        </XStack>
        <XStack bg="rgba(255, 116, 53, 0.15)" py={8} borderTopEndRadius={12} width="50%">
          <Text
            flex={1}
            textTransform="uppercase"
            textAlign="center"
            color="#FD4F01"
            fontSize={24}
            fontWeight={700}>
            MONTHLY
          </Text>
        </XStack>
      </XStack>
      <XStack alignItems="center" mt={4}>
        <Text
          top={-15}
          fontStyle="italic"
          zIndex={20}
          position="absolute"
          width={'100%'}
          textAlign="center"
          fontSize={18}
          fontWeight={700}
          color="#1E1F20">
          V/S
        </Text>
      </XStack>
      <XStack width={'100%'}>
        <YStack
          width="50%"
          gap={8}
          py={12}
          px={8}
          bg="rgba(248, 210, 68, 0.49)"
          borderBottomLeftRadius={12}>
          {weeklyPlans.map((plan, i) => {
            return (
              <YStack key={i} w={'100%'} alignSelf="stretch">
                <XStack alignItems="center" gap={4}>
                  {plan.img()}
                  <Text fontSize={11} flexShrink={1} fontWeight={500} color="#FD4F01" w={'100%'}>
                    {plan.name}
                  </Text>
                </XStack>
              </YStack>
            );
          })}
        </YStack>
        <YStack
          width="50%"
          gap={8}
          py={12}
          px={8}
          bg="rgba(255, 116, 53, 0.15)"
          borderBottomRightRadius={12}>
          {weeklyPlans.map((plan, i) => {
            return (
              <YStack key={i}>
                <XStack alignItems="center" gap={4}>
                  {plan.img()}
                  <Text fontSize={11} flexShrink={1} fontWeight={500} color="#FD4F01" w={'100%'}>
                    {plan.name}
                  </Text>
                </XStack>
              </YStack>
            );
          })}
        </YStack>
      </XStack>
    </YStack>
  );
}
