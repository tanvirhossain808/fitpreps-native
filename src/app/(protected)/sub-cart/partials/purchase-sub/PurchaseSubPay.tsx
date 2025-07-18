import React, { useEffect } from 'react';
import { Button, Text, View, XStack, YStack } from 'tamagui';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/src/store';
import { setOrderData } from '~/src/store/slices/cartSlice';
import Toast from 'react-native-toast-message';
import { setStartDate } from '~/src/store/slices/subscriptionSlice';

export default function PurchaseSubPay({
  setCurrentStep,
  orderData,
}: {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  orderData: any;
}) {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(setTotal as any);
  // }, []);
  const { total, subTotal, shipping, tax } = useSelector((s: RootState) => s.cart);
  const cartItems = useSelector((s: RootState) => s.cart.cartItems);
  const dispatch = useDispatch();
  const isDateSelected = useSelector((s: RootState) => s.subPurchase.startDate);
  const handleCheckout = () => {
    if (!isDateSelected) {
      return Toast.show({
        type: 'error',
        text1: 'Please select your subscription start date',
      });
    }
    setCurrentStep(1);
  };

  return (
    <YStack flex={1} pb="$5">
      <XStack alignItems="center" justifyContent="space-between">
        <Text color="#1E1F20" fontSize={16} fontWeight={700}>
          To Pay
        </Text>
        <Ionicons name="chevron-up" size={18} color="black" />
      </XStack>
      <YStack mt="$3" flex={1}>
        <XStack alignItems="center" justifyContent="space-between">
          <Text fontSize={14} fontWeight={500} color="#1E1F20">
            Subtotal
          </Text>
          <Text fontSize={14} fontWeight={500} color="#1E1F20">
            €{subTotal.toFixed(2)}
          </Text>
        </XStack>
        <XStack alignItems="center" justifyContent="space-between">
          <Text fontSize={14} fontWeight={500} color="#1E1F20">
            Shipping cost
          </Text>
          <Text fontSize={14} fontWeight={500} color="#1E1F20">
            €{(shipping + tax).toFixed(2)}
          </Text>
        </XStack>
      </YStack>
      <View my={'$2'} bg="#B6BAC3" height={1}></View>
      <XStack alignItems="center" justifyContent="space-between">
        <Text fontWeight={700} fontSize={14} color="#1E1F20">
          Total
        </Text>
        <Text fontWeight={700} fontSize={14} color="#1E1F20">
          €{total.toFixed(2)}
        </Text>
      </XStack>
      <Button
        mt="$3"
        bg="#FD4F01"
        borderRadius={8}
        fontSize={16}
        fontWeight={700}
        color="white"
        onPress={handleCheckout}
        // onPress={handleCheckout}
      >
        Checkout
      </Button>
    </YStack>
  );
}
