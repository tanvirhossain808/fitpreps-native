import { TouchableOpacity, StyleSheet } from 'react-native';
import { Button, Text, XStack, YStack } from 'tamagui';
import Coin from 'public/images/coin.svg';
import { shadows } from '~/constant';
import { router } from 'expo-router';

export default function CoinSubscriber() {
  return (
    <YStack gap="$5" borderRadius={20} bg="white" px="$3" py="$5" mb={40}>
      <YStack gap="$3">
        <Text fontSize={16} fontWeight={700} color="#1E1F20">
          Use your subscription points for your meals!
        </Text>
        <XStack alignItems="center" justifyContent="center" gap="$2">
          <Text color="#1E1F20" fontSize={16} fontWeight={500}>
            You have
          </Text>
          <XStack alignItems="center" gap={4}>
            <Text color="#FD4F01" fontWeight={700} fontSize={16}>
              X
            </Text>
            <Coin />
          </XStack>
          <Text color="#1E1F20" fontSize={16} fontWeight={500}>
            available.
          </Text>
        </XStack>
      </YStack>
      <YStack alignItems="center" gap="$3">
        <Button
          onPress={() =>
            router.push({
              pathname: '/(navigator)/(tabs)/meals',
              params: { product: 'fueld' },
            })
          }
          color="white"
          fontSize={16}
          fontWeight={700}
          bg="#FD4F01"
          {...shadows.small}
          borderRadius={8}
          px="$5">
          Use Subscription Points
        </Button>
        <TouchableOpacity onPress={() => router.push('/(navigator)/(tabs)/subscription')}>
          <Text
            color="#FD4F01"
            fontSize={16}
            fontWeight={700}
            borderBottomColor="#FD4F01"
            borderBottomWidth={2}>
            Buy Subscription Plan
          </Text>
        </TouchableOpacity>
      </YStack>
    </YStack>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backBtn: {
    marginTop: 9,
  },
  rightBtn: {
    opacity: 0,
  },
});
