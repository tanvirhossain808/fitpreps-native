import { XStack, Text, YStack, View } from 'tamagui';
import Feather from '@expo/vector-icons/Feather';
import Coin from 'public/images/coin.svg';
import { TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
export default function SubsHeader() {
  return (
    <YStack gap="$3">
      <XStack alignItems="center" gap="$2" justifyContent="space-between" mt="$4">
        <Text color="#1E1F20" fontSize={16} fontWeight={700}>
          Order Summary
        </Text>
        <Feather name="chevron-up" size={20} color="black" />
      </XStack>
      <XStack bg="#B6BAC3" h={1}></XStack>
      <YStack>
        <YStack>
          <XStack alignItems="center" justifyContent="space-between">
            <Text color="#1E1F20" fontSize={16} fontWeight={500}>
              Weekly Plan: Starter Pack
            </Text>
            <Text color="#1E1F20" fontSize={16} fontWeight={700}>
              €63
            </Text>
          </XStack>
          <XStack mt={1} alignItems="center" gap={8}>
            <XStack alignItems="center" gap={4}>
              <Text color="#FD4F01" fontSize={14} fontWeight={700}>
                630
              </Text>
              <Coin />
            </XStack>
            <Text fontSize={16} color="#1E1F20" fontWeight={700}>
              +
            </Text>
            <XStack alignItems="center" gap={4}>
              <Text color="#FD4F01" fontSize={14} fontWeight={700}>
                630
              </Text>
              <Coin />
              <View px={8} py={4} backgroundColor="#E5F8EA" borderRadius={40}>
                <Text color="#009A21" fontSize={12} fontWeight={700}>
                  FREE
                </Text>
              </View>
            </XStack>
          </XStack>
        </YStack>
      </YStack>
      <XStack alignItems="center" justifyContent="flex-end">
        <TouchableOpacity onPress={() => router.back()}>
          <Text color="#FD4F01" fontSize={14} fontWeight={700} textDecorationLine="underline">
            Change Subscription Plan
          </Text>
        </TouchableOpacity>
      </XStack>
    </YStack>
  );
}
