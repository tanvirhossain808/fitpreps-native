import { Text, YStack, Image, XStack, Button } from 'tamagui';
import React from 'react';
import { Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Marker from 'public/images/marker-pin-01.svg';
import Clock from 'public/images/clock-stopwatch.svg';
import { BlurView } from 'expo-blur';
export default function index() {
  const screenWidth = Dimensions.get('window').width;

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
              px="$7"
              py="$2">
              <YStack
                style={{
                  borderRadius: 12,
                  padding: 16,
                }}
                gap="$7">
                <YStack>
                  <Text fontSize={24} textAlign="center" fontWeight="700" color="#009A21">
                    Awesome!
                  </Text>
                  <Text fontSize={24} fontWeight="700" color="#009A21" textAlign="center">
                    Your order has been placed successfully!
                  </Text>
                </YStack>
                <YStack gap="$3">
                  <XStack>
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
                  </XStack>
                </YStack>
                <XStack justifyContent="center">
                  <Button
                    minWidth={164}
                    backgroundColor="#FD4F01"
                    borderRadius={8}
                    color="white"
                    fontWeight={700}>
                    Track Order
                  </Button>
                </XStack>
              </YStack>
            </YStack>
          </BlurView>
        </SafeAreaView>
      </YStack>
    </YStack>
  );
}
