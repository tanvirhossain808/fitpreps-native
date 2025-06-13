import { Text, XStack, YStack, Input, Button } from 'tamagui';
import CouponTicket from 'public/images/couponTicket.svg';
import CartCarosuel from './CartCarosuel';
import CartPay from './CartPay';

export default function FooterCart({
  setCurrentStep,
}: {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <YStack flex={1} gap="$3" mt={12}>
      <YStack gap="$3">
        <Text color="#1E1F20" fontWeight={700} fontSize={16}>
          Savings
        </Text>
        <XStack alignItems="center" gap="$2">
          <XStack
            gap={2}
            flex={1}
            height={'40px'}
            bg="white"
            alignSelf="stretch"
            elevation={1}
            shadowColor="rgba(10, 13, 18, 0.05)"
            shadowOffset={{ width: 0, height: 1 }}
            shadowRadius={2}
            shadowOpacity={1}
            alignItems="center"
            px={14}
            py={10}
            borderColor="#EDEEF1"
            borderWidth={1}
            borderRadius={8}>
            <CouponTicket />
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
            height={'40px'}
            px={20}
            py={10}
            fontSize={16}
            fontWeight="700"
            color="#FD4F01"
            borderRadius={8}
            borderWidth={1}
            borderColor="#FD4F01"
            h={60}
            bg="white"
            shadowOffset={{ width: 0, height: 1 }}
            shadowRadius={2}
            shadowColor="rgba(10, 13, 18, 0.05)"
            shadowOpacity={1}>
            Add
          </Button>
        </XStack>
      </YStack>
      <YStack pt="$5" pb="$2" gap="$3">
        <CartCarosuel />
      </YStack>
      <YStack flex={1}>
        <CartPay setCurrentStep={setCurrentStep} />
      </YStack>
    </YStack>
  );
}
