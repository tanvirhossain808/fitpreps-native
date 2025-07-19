import { Button, Text, XStack, YStack } from 'tamagui';
import Coin from 'public/images/coin.svg';
import { TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { ToastProps } from 'react-native-toast-message';
export default function SubCartAddedToast({ props }: { props: ToastProps & { quantity: number } }) {
  return (
    <>
      <YStack
        w="100%"
        gap="$2"
        pb="$3"
        bg="white"
        borderBottomEndRadius={12}
        borderBottomLeftRadius={12}>
        <YStack>
          <XStack bg="#FFDADF" py="$2" px="$3">
            <Text color="#FD4F01" textAlign="center" fontSize={14} fontWeight={700}>
              Insufficient points!
            </Text>
          </XStack>
          <XStack pt="$2" px="$4" w="100%" alignItems="center" justifyContent="space-between">
            <YStack gap="$1">
              <XStack alignItems="center" gap="$1">
                <Text color="#1E1F20" fontWeight={700} fontSize={16}>
                  5
                </Text>
                <Coin />
              </XStack>
              <Text fontSize={14} color="#1E1F20">
                out of 690 left
              </Text>
            </YStack>
            <Button
              color="white"
              fontSize={16}
              fontWeight={700}
              bg="#FD4F01"
              px="$5"
              py="$3"
              onPress={() => router.push('/sub-cart/sub-cart')}>
              <Text color="white" fontSize={16} fontWeight={700}>
                Add{' '}
                <Text color="white" fontSize={16} fontWeight={700}>
                  {props.quantity}
                </Text>{' '}
                Meals to Cart
              </Text>
            </Button>
          </XStack>
        </YStack>
        <XStack bg="#FFEDE5">
          <Text color="#FD4F01" textAlign="center" px="$2" fontSize={14} fontWeight={500}>
            You still have 510 points to spend, grab more meals!
          </Text>
        </XStack>
        <XStack alignItems="center" gap="$1" justifyContent="center">
          <Text fontSize={12} color="#FD4F01" fontWeight={500}>
            Get points here.
          </Text>
          <TouchableOpacity onPress={() => router.push('/sub-cart/subsProductsCart')}>
            <Text
              color="#FD4F01"
              fontSize={14}
              fontWeight={700}
              textDecorationColor="#FD4F01"
              textDecorationLine="underline">
              Buy Subscription Plan
            </Text>
          </TouchableOpacity>
        </XStack>
      </YStack>
    </>
  );
}
