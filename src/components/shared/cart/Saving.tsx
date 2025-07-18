import { Button, Text, Input, YStack, XStack } from 'tamagui';
import CouponTicket from 'public/images/couponTicket.svg';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/src/store';
import { useVerifyCouponMutation } from '~/src/store/apiSlices/verifyCouponSlice';
import Toast from 'react-native-toast-message';
import { setCoupon } from '~/src/store/slices/cartSlice';

export default function Saving({ isCommingSoon = false }: { isCommingSoon?: boolean }) {
  const { token, user } = useSelector((s: RootState) => s.user.user!);
  console.log(user, 'user');
  const [verifyCoupon, { isSuccess, isLoading, error }] = useVerifyCouponMutation();
  const dispatch = useDispatch();
  const [couponCode, setCouponCode] = useState('');

  const validCoupons = ['freesnack', 'summerfit', 'willem', 'mama', 'summer', 'father', 'fit'];

  const handleSubmitCoupon = async () => {
    if (!user) {
      //logout the user
    }
    if (isCommingSoon) {
      return Toast.show({
        type: 'error',
        text1: 'Not available',
        text2: 'Coming soon',
      });
    }
    if (validCoupons.includes(couponCode.toLowerCase())) {
    }
    const verifyCouponResponse = await verifyCoupon({
      couponCode: couponCode,
      userId: user._id,
      token: token,
    }).unwrap();
    Toast.show({
      type: 'success',
      text1: verifyCouponResponse.message,
    });

    dispatch(setCoupon(verifyCouponResponse.coupon));

    return setCouponCode('');
  };

  useEffect(() => {
    if (error && 'status' in error && error.status === 404) {
      setCouponCode('');
      Toast.show({
        type: 'minimumOrderAmountToast',
        //@ts-ignore
        text1: error?.data?.message!,
        position: 'top',
      });
    }
  }, [error]);

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
            value={couponCode}
            py={0}
            alignSelf="stretch"
            flex={1}
            placeholder="Enter Coupon Code"
            placeholderTextColor="#8E95A2"
            fontSize={14}
            bg="transparent"
            borderWidth={0}
            outlineWidth={0}
            onChangeText={setCouponCode}
          />
        </XStack>
        <Button
          onPress={handleSubmitCoupon}
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
