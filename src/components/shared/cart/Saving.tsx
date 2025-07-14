import { Button, Text, Input, YStack, XStack } from 'tamagui';
import CouponTicket from 'public/images/couponTicket.svg';
export default function Saving() {
  return (
    <YStack gap="$3" mt={12}>
      <Text color="#1E1F20" fontWeight={700} fontSize={16}>
        Savings
      </Text>
      <XStack alignItems="center" gap="$2">
        <XStack
          gap={2}
          flex={1}
          height={45}
          bg="white"
          alignSelf="stretch"
          elevation={1}
          shadowColor="rgba(10, 13, 18, 0.05)"
          shadowOffset={{ width: 0, height: 1 }}
          shadowRadius={2}
          shadowOpacity={1}
          alignItems="center"
          px={14}
          borderColor="#EDEEF1"
          borderWidth={1}
          borderRadius={8}>
          <CouponTicket style={{ marginTop: 4 }} />
          <Input
            py={0}
            alignSelf="stretch"
            flex={1}
            placeholder="Enter Coupon Code"
            placeholderTextColor="#8E95A2"
            fontSize={14}
            bg="transparent"
            borderWidth={0}
            outlineWidth={0}
          />
        </XStack>
        <Button
          height={45}
          px={20}
          py={10}
          fontSize={16}
          fontWeight="700"
          color="#FD4F01"
          borderRadius={8}
          borderWidth={1}
          borderColor="#FD4F01"
          bg="white"
          shadowOffset={{ width: 0, height: 1 }}
          shadowRadius={2}
          shadowColor="rgba(10, 13, 18, 0.05)"
          shadowOpacity={1}>
          Add
        </Button>
      </XStack>
    </YStack>
  );
}
