import { Image, Text, XStack, YStack } from 'tamagui';
import { truncateText } from '~/src/helper';
import Coin from 'public/images/coin.svg';
export default function OrderedItemDetails() {
  return (
    <>
      <XStack gap="$2">
        <Image src={require('public/images/orderfood.png')} width={60} height={60} />
        <YStack flex={1}>
          <Text fontSize={12} color="#383A42">
            Order Number:{' '}
            <Text color="#1E1F20" fontWeight={500}>
              FA234VUE34Q6D
            </Text>
          </Text>

          <XStack width="100%" alignSelf="stretch" justifyContent="space-between" mt="$1">
            <Text color="#1E1F20" fontSize={14} fontWeight={500}>
              {truncateText('Beef Teriyaki Noodles', 19)}
            </Text>
            <XStack alignItems="center" gap={4}>
              <Text>1260</Text>
              <Coin />
            </XStack>
          </XStack>
          <XStack flex={1} justifyContent="space-between" mt="$1">
            <Text fontSize={14} color="#1E1F20">
              7 April, 01:20 pm
            </Text>
            <Text fontSize={14} color="#1E1F20">
              5 items
            </Text>
          </XStack>
        </YStack>
      </XStack>
      <XStack mt="$2" gap="$1">
        <Image
          width={28}
          height={28}
          src={require('public/images/Cajun Garnalen - Gele rijst - Edamame Beans 1.png')}
        />
        <XStack px={9} py="$2" bg="white" borderRadius={4}>
          <Text color="#8E95A2" fontWeight={500} fontSize={12}>
            +3
          </Text>
        </XStack>
      </XStack>
    </>
  );
}
