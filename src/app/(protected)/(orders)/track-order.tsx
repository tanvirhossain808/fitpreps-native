import { useLocalSearchParams } from 'expo-router';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, ScrollView, Text, View, XStack, YStack } from 'tamagui';
import DrawerPageHeader from '~/src/components/drawer/DrawerPageHeader';
import OrderedItemDetails from '~/src/components/my-orders/OrderedItemDetails';
import OrderStepper from '~/src/components/my-orders/OrderStepper';
import Message from 'public/images/message.svg';
import Phone from 'public/images/phone.svg';
export default function TrackOrder() {
  const { trackingNumber } = useLocalSearchParams() || {};
  return (
    <YStack flex={1} bg="white">
      <SafeAreaView style={style.container}>
        <DrawerPageHeader title="Track Order" />
        {/* <ScrollView flex={1} height={minHeight}> */}
        <YStack flex={1} justifyContent="space-between" gap="$4">
          <ScrollView>
            <YStack>
              <YStack px="$4" pt="$2" pb="$5" gap="$5">
                <Text color="#383A42" fontSize={16} fontWeight={500}>
                  Tracking Number:{' '}
                  <Text color="#1E1F20" fontSize={16} fontWeight={700}>
                    {trackingNumber}
                  </Text>
                </Text>
                <YStack>
                  <OrderedItemDetails />
                </YStack>
              </YStack>
              <View py="$3" bg="#FFEDE5" px="$4">
                <Text color="#1E1F20" fontSize={16} fontWeight={500}>
                  Your order will be delivered on{' '}
                  <Text fontWeight={500} fontSize={16} color="#FD4F01">
                    April 14, Monday.
                  </Text>
                </Text>
              </View>
              <OrderStepper />
            </YStack>
          </ScrollView>
          <YStack gap={10} px="$4" pb="$4">
            <Button
              shadowColor="rgba(10, 13, 18, 0.05)"
              shadowOffset={{ width: 0, height: 1 }}
              shadowOpacity={1}
              shadowRadius={2}
              elevation={1}
              bg="#FFEDE5">
              <XStack alignItems="center" gap="$2">
                <Message />
                <Text color="#FD4F01" fontSize={16} fontWeight={700}>
                  Reach out via Whatsapp{' '}
                </Text>
              </XStack>
            </Button>
            <Button
              shadowColor="rgba(10, 13, 18, 0.05)"
              shadowOffset={{ width: 0, height: 1 }}
              shadowOpacity={1}
              shadowRadius={2}
              elevation={1}
              bg="white">
              <XStack alignItems="center" gap="$2">
                <Phone />
                <Text color="#FD4F01" fontSize={16} fontWeight={700}>
                  Write to us
                </Text>
              </XStack>
            </Button>
          </YStack>
        </YStack>
        {/* </ScrollView> */}
      </SafeAreaView>
    </YStack>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});
