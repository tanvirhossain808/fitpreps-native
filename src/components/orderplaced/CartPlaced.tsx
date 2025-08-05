import { Text, XStack, YStack } from 'tamagui';
import Marker from 'public/images/marker-pin-01.svg';
export default function CartPlaced() {
  return (
    <YStack gap="$3">
      {/* <XStack>
        <XStack alignItems="center" gap="$1" minWidth={135}>
          <Marker />
          <Text color="#1E1F20" fontSize={16} fontWeight={500}>
            ETA
          </Text>
        </XStack>
        <XStack alignItems="center" gap="$1" minWidth={135}>
          <Text color="#1E1F20" fontSize={16} fontWeight={500}>
            Mon, 1st, 4:00 PM
          </Text>
        </XStack>
      </XStack>
      <XStack alignItems="flex-start">
        <XStack alignItems="center" gap="$1" minWidth={135}>
          <Marker />
          <Text color="#1E1F20" fontSize={16} fontWeight={500}>
            Deliver to
          </Text>
        </XStack>
        <XStack alignItems="center" gap="$1" minWidth={135} flex={1}>
          <Text color="#1E1F20" fontSize={16} fontWeight={500} width="100%">
            ABC Apartments, Street name, Block no., Area, City
          </Text>
        </XStack>
      </XStack> */}
    </YStack>
  );
}
