import React, { useEffect } from 'react';
import { Button, Text, View, XStack, YStack } from 'tamagui';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/src/store';
import { setOrderData } from '~/src/store/slices/cartSlice';
import Toast from 'react-native-toast-message';
import Coin from 'public/images/coin.svg';
import { DateData } from 'react-native-calendars';
export default function SubscribedProductsPay({
  setCurrentStep,
  selectedDate,
  orderData,
}: {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  selectedDate: DateData | null;
  orderData: any;
}) {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(setTotal as any);
  // }, []);
  const { subTotal } = useSelector((s: RootState) => s.subCart);
  const cartItems = useSelector((s: RootState) => s.subCart);

  const dispatch = useDispatch();
  useEffect(() => {}, []);
  const handleCheckout = () => {
    // const c = Object.values(cartItems);
    if (!selectedDate) {
      return Toast.show({
        type: 'error',
        text1: 'Please select delivery date',
        position: 'top',
      });
    }
    setCurrentStep(1);
    dispatch(setOrderData(orderData));
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
          <XStack gap={2}>
            <Coin />
            <Text fontSize={14} fontWeight={500} color="#1E1F20">
              {subTotal}
            </Text>
          </XStack>
        </XStack>
        <XStack alignItems="center" justifyContent="space-between">
          <Text fontSize={14} fontWeight={500} color="#1E1F20">
            Shipping cost
          </Text>
          <Text fontSize={14} fontWeight={500} color="#1E1F20">
            €0
          </Text>
        </XStack>
      </YStack>
      <View my={'$2'} bg="#B6BAC3" height={1}></View>
      <XStack alignItems="center" justifyContent="space-between">
        <Text fontWeight={700} fontSize={14} color="#1E1F20">
          Total
        </Text>
        <XStack gap={2}>
          <Coin />
          <Text fontWeight={700} fontSize={14} color="#1E1F20">
            {subTotal}
          </Text>
        </XStack>
      </XStack>
      <Button
        mt="$3"
        bg="#FD4F01"
        borderRadius={8}
        fontSize={16}
        fontWeight={700}
        color="white"
        // onPress={() => setCurrentStep(1)}
        onPress={handleCheckout}>
        Checkout
      </Button>
    </YStack>
  );
}
