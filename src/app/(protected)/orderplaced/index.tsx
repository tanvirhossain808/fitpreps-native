import { Text, YStack, Image, XStack, Button } from 'tamagui';
import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Marker from 'public/images/marker-pin-01.svg';
import Clock from 'public/images/clock-stopwatch.svg';
import { BlurView } from 'expo-blur';
import { router, useLocalSearchParams } from 'expo-router';
import CartPlaced from '~/src/components/orderplaced/CartPlaced';
import { useCheckPaymentMutation } from '~/src/store/apiSlices/checkPaymentSlice';
import { RootState } from '~/src/store';
import { useSelector } from 'react-redux';
export default function OrderPlaced() {
  const screenWidth = Dimensions.get('window').width;
  const { type, id } = useLocalSearchParams() || {};
  const [checkPayment] = useCheckPaymentMutation();
  const [isSuccess, setIsSuccess] = useState(false);
  const token = useSelector((s: RootState) => s.user.user?.token);
  console.log(id, 'id');
  useEffect(() => {
    checkPayment({ id, token })
      .unwrap()
      .then((res) => {
        // console.log(res, 'ress');
        if (res.status === 'processing' || res.status === 'completed') {
          setIsSuccess(true);
        } else {
          setIsSuccess(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  return (
    <YStack flex={1} bg="white">
      <YStack flex={1} position="relative" width="100%" aspectRatio={390 / 844}>
        <Image
          source={require('public/images/orderplaced.png')}
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          width="100%"
          height="100%"
          resizeMode="cover"
        />
        <SafeAreaView style={{ flex: 1 }}>
          {isSuccess ? (
            <BlurView
              intensity={60}
              // experimentalBlurMethod="dimezisBlurView"
              tint="light"
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
              }}>
              <YStack
                bg="linear-gradient(0deg, rgba(255, 184, 23, 0.20) 0%, rgba(255, 255, 255, 0.20) 100%)"
                flex={1}
                px="$4"
                py="$2">
                <YStack
                  style={{
                    borderRadius: 12,
                    paddingVertical: 16,
                  }}
                  gap="$7">
                  <YStack>
                    <Text fontSize={24} textAlign="center" fontWeight="700" color="#009A21">
                      Awesome!
                    </Text>
                    {type === 'meals' && (
                      <Text fontSize={24} fontWeight="700" color="#009A21" textAlign="center">
                        Your order has been placed
                      </Text>
                    )}
                  </YStack>
                  {type === 'meals' && <CartPlaced />}
                  {type === 'subscription' && (
                    <Text textAlign="center" color="#1E1F20" fontSize={16} fontWeight={500}>
                      You have successfully bought a subscription plan! Now you can continue to add
                      your favourite meals.
                    </Text>
                  )}
                  {type === 'upgrade' && (
                    <Text textAlign="center" color="#1E1F20" fontSize={16} fontWeight={500}>
                      You have successfully upgraded your subscription plan! Now you can continue to
                      add your favourite meals.
                    </Text>
                  )}
                  <XStack justifyContent="center">
                    <Button
                      onPress={() => {
                        if (type === 'meals') {
                          router.push('/(tabs)/meals');
                        } else {
                          router.replace({
                            pathname: '/meals',
                            // params: {},
                          });
                        }
                      }}
                      minWidth={164}
                      backgroundColor="#FD4F01"
                      borderRadius={8}
                      color="white"
                      fontWeight={700}>
                      {type === 'meals' ? 'Track Order' : 'Proceed To Add Meals'}
                    </Button>
                  </XStack>
                </YStack>
              </YStack>
            </BlurView>
          ) : (
            <YStack gap={15} px="$4" py="$2" flex={1} justifyContent="center" alignItems="center">
              <Text fontSize={24} fontWeight={700} color="#FD4F01">
                Failed
              </Text>
              <Text fontSize={20} fontWeight={700} color="green">
                Your order is not completed, Due to payment failed!
              </Text>
              <Button
                color="white"
                backgroundColor="#FD4F01"
                onPress={() => {
                  router.replace('/(tabs)/meals');
                }}>
                Try Again
              </Button>
            </YStack>
          )}
        </SafeAreaView>
      </YStack>
    </YStack>
  );
}
