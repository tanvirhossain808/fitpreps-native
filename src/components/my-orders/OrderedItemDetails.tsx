import { Image, Text, XStack, YStack } from 'tamagui';
import { formatToCustomDateString, truncateText } from '~/src/helper';
import Coin from 'public/images/coin.svg';
import { Order } from '~/src/types/type';
export default function OrderedItemDetails({ ordersData }: { ordersData: Order }) {
  return (
    <>
      <XStack gap="$2">
        <Image src={ordersData.items[0].meta._thumbnail} width={60} height={60} />
        <YStack flex={1}>
          <Text fontSize={12} color="#383A42" numberOfLines={1}>
            Order Number:{' '}
            <Text color="#1E1F20" fontWeight={500}>
              {ordersData._id}
            </Text>
          </Text>

          <XStack width="100%" alignSelf="stretch" justifyContent="space-between" mt="$1">
            <Text color="#1E1F20" fontSize={14} fontWeight={500}>
              {truncateText(ordersData.items[0].order_item_name, 19)}
            </Text>
            <XStack alignItems="center" gap={4}>
              <Text>${ordersData.total}</Text>
              {/* <Coin /> */}
            </XStack>
          </XStack>
          <XStack flex={1} justifyContent="space-between" mt="$1">
            <Text fontSize={14} color="#1E1F20">
              {formatToCustomDateString(ordersData.createdAt)}
            </Text>
            <Text fontSize={14} color="#1E1F20">
              {ordersData.items.length}
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
            {ordersData.items.length}
          </Text>
        </XStack>
      </XStack>
    </>
  );
}
