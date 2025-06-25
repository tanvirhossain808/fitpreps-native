import { Text, View, XStack, YStack } from 'tamagui';
import Coin from 'public/images/coin.svg';
import Visa from 'public/images/visa.svg';
import { TouchableOpacity } from 'react-native';
export default function CurrentlySubscription({ showPlan = true }: { showPlan?: boolean }) {
  return (
    <>
      {!showPlan ? (
        <YStack gap={12}>
          <XStack alignItems="flex-end" justifyContent="space-between">
            <YStack>
              <Text color="#1E1F20" fontSize={12} fontWeight={500}>
                Current Subscription :
              </Text>
              <Text color="#1E1F20" fontSize={16} fontWeight={700}>
                Weekly: Starter Pack
              </Text>
            </YStack>

            <Text color="#1E1F20" fontSize={14} fontWeight={700}>
              €126
            </Text>
          </XStack>
          <XStack
            alignItems="center"
            justifyContent="space-between"
            p="$4"
            borderWidth={2}
            borderColor="#D24100"
            borderRadius={8}>
            <Text color="black" fontWeight={500} fontSize={16}>
              Points balance:
            </Text>
            <XStack alignItems="center" gap={4}>
              <Text color="#FD4F01" fontSize={16} fontWeight={700}>
                630
              </Text>
              <Coin />
            </XStack>
          </XStack>
          <YStack
            gap="$4"
            p={12}
            bg="#F6F6F8"
            borderRadius={8}
            borderWidth={1}
            borderColor="#EDEEF1">
            <XStack alignItems="center" justifyContent="space-between">
              <Text fontSize={16} fontWeight={700} color="#1E1F20">
                Next payment due on
              </Text>
              <Text fontSize={16} fontWeight={500} color="#1E1F20">
                April 25, 2025
              </Text>
            </XStack>
            <XStack alignItems="center" justifyContent="space-between">
              <XStack alignItems="center">
                <Visa />
                <Text color="#1E1F20" fontWeight={500}>
                  **** **** **** 4321
                </Text>
              </XStack>
              <TouchableOpacity>
                <Text
                  fontSize={16}
                  fontWeight={700}
                  color="#FD4F01"
                  borderBottomWidth={2}
                  borderBottomColor="#FD4F01">
                  Change mode
                </Text>
              </TouchableOpacity>
            </XStack>
          </YStack>
        </YStack>
      ) : (
        <YStack gap="12">
          <YStack gap={4}>
            <Text color="#1E1F20" fontSize={12} fontWeight={500}>
              Current Subscription :
            </Text>
            <Text color="#1E1F20" fontSize={16} fontWeight={700}>
              Weekly
            </Text>
          </YStack>
          <YStack gap="$3" borderColor="#D24100" borderWidth={2} borderRadius={8} p="$4">
            <XStack alignItems="center" justifyContent="space-between">
              <XStack gap="$2" alignItems="center">
                <Text color="#1E1F20" fontSize={16} fontWeight={700}>
                  Starter Pack
                </Text>

                <Text
                  px="$2"
                  color="#D24100"
                  fontSize={10}
                  fontWeight={700}
                  borderRadius={40}
                  py="$1"
                  bg="#FFDADF">
                  Current
                </Text>
              </XStack>
              <Text color="#25272C" fontWeight={700} fontSize={14}>
                €126
              </Text>
            </XStack>
            <XStack>
              <XStack gap={8}>
                <XStack alignItems="center" gap={4}>
                  <Text color="#FD4F01" fontSize={16} fontWeight={700}>
                    1260
                  </Text>
                  <Coin />
                </XStack>
                <Text fontSize={16} fontWeight={700}>
                  +
                </Text>
                <XStack alignItems="center" gap={4}>
                  <Text color="#FD4F01" fontSize={16} fontWeight={700}>
                    120
                  </Text>
                  <Coin />
                </XStack>
                <Text
                  fontSize={12}
                  fontWeight={700}
                  px="$2"
                  color="#009A21"
                  py="$1"
                  borderRadius={40}
                  backgroundColor="#E5F8EA">
                  Free
                </Text>
              </XStack>
            </XStack>
            <View h={1} bg="#8E95A2"></View>
            <XStack alignItems="center" justifyContent="space-between">
              <Text color="black" fontSize={16} fontWeight={500}>
                Points balance:
              </Text>
              <XStack alignItems="center" gap={4}>
                <Text color="#FD4F01" fontSize={16} fontWeight={700}>
                  630
                </Text>
                <Coin />
              </XStack>
            </XStack>
          </YStack>
        </YStack>
      )}
    </>
  );
}
