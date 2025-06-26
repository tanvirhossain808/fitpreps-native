import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Image, ScrollView, Text, View, XStack, YStack } from 'tamagui';
import DrawerPageHeader from '~/components/drawer/DrawerPageHeader';
import Coin from 'public/images/coin.svg';
export default function OrderDetails() {
  return (
    <YStack flex={1} bg="white">
      <SafeAreaView style={style.container}>
        <DrawerPageHeader title="My Orders" />
        <YStack px="$4" justifyContent="space-between" flex={1}>
          <ScrollView style={style.container}>
            <YStack
              px="$4"
              py="$5"
              gap="$5"
              bg="linear-gradient(53deg, rgba(255, 184, 23, 0.20) -86.68%, rgba(255, 255, 255, 0.20) 144.67%)"
              borderRadius={12}>
              <YStack gap="$3">
                <XStack gap="$2">
                  <Text color="#8E95A2" fontSize={12}>
                    Delivered on:
                  </Text>
                  <YStack flex={1}>
                    <Text color="#1E1F20" fontSize={12} fontWeight={600} flexWrap="wrap">
                      7 April, 01:20 pm
                    </Text>
                  </YStack>
                </XStack>
                <XStack gap="$2">
                  <Text color="#8E95A2" fontSize={12}>
                    Order Number:
                  </Text>
                  <YStack flex={1}>
                    <Text color="#1E1F20" fontSize={12} fontWeight={600} flexWrap="wrap">
                      FA234VUE34Q6D
                    </Text>
                  </YStack>
                </XStack>
                <XStack gap="$2">
                  <Text color="#8E95A2" fontSize={12}>
                    Tracking Number:
                  </Text>
                  <YStack flex={1}>
                    <Text color="#1E1F20" fontSize={12} fontWeight={600} flexWrap="wrap">
                      ASDGH234GAS24
                    </Text>
                  </YStack>
                </XStack>
                <XStack borderBottomWidth={1} borderBottomColor="#EDEEF1" gap="$2" pb="$2">
                  <Text color="#8E95A2" fontSize={12}>
                    Delivered on:
                  </Text>
                  <YStack flex={1}>
                    <Text color="#1E1F20" fontSize={12} fontWeight={600} flexWrap="wrap">
                      ABC Apartments, Street name, Block no., Area, City Name, State - 000000.
                    </Text>
                  </YStack>
                </XStack>
              </YStack>
              <YStack gap="$2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <XStack
                    key={i}
                    gap="$2"
                    borderBottomWidth={1}
                    pb="$1"
                    borderBottomColor="#EDEEF1">
                    <Image
                      source={require('public/images/Beef teriyaki noodles.png')}
                      w={48}
                      height={48}
                      borderRadius={8}
                    />
                    <YStack flex={1} gap="$1">
                      <Text
                        color="#1E1F20"
                        flexWrap="wrap"
                        //   width="100%"
                        fontSize={14}
                        fontWeight={600}>
                        Stew - Mashed potatoes - Carrot mix
                      </Text>
                      <XStack alignItems="center" justifyContent="space-between">
                        <XStack alignItems="center" gap="$1">
                          <Text color="#FD4F01" fontSize={14} fontWeight={700}>
                            60
                          </Text>
                          <Coin />
                        </XStack>
                        <Text color="#1E1F20" fontSize={14}>
                          Qty: 1
                        </Text>
                      </XStack>
                    </YStack>
                  </XStack>
                ))}
              </YStack>
              <YStack gap="$2">
                <YStack>
                  <XStack justifyContent="space-between" alignItems="center">
                    <Text color="#1E1F20" fontSize={14} fontWeight={500}>
                      Subtotal
                    </Text>
                    <XStack alignItems="center" gap="$1">
                      <Text color="#FD4F01" fontSize={14} fontWeight={700}>
                        420
                      </Text>
                      <Coin />
                    </XStack>
                  </XStack>
                  <XStack justifyContent="space-between" alignItems="center">
                    <Text color="#1E1F20" fontSize={14} fontWeight={500}>
                      Shipping cost
                    </Text>
                    <XStack alignItems="center" gap="$1">
                      <Text color="#1E1F20" fontSize={14} fontWeight={500}>
                        €00
                      </Text>
                    </XStack>
                  </XStack>
                </YStack>
                <View h={1} bg="#B6BAC3"></View>
                <XStack alignItems="center" justifyContent="space-between">
                  <Text fontWeight={700} fontSize={14} color="#1E1F20">
                    Total
                  </Text>
                  <Text fontWeight={700} fontSize={14} color="#1E1F20">
                    €00
                  </Text>
                </XStack>
              </YStack>
            </YStack>
          </ScrollView>
          <YStack pb="$5">
            <Button
              color="#FD4F01"
              bg="white"
              borderWidth={1}
              borderColor="#FD4F01"
              fontSize={16}
              fontWeight={700}>
              Reorder
            </Button>
          </YStack>
        </YStack>
      </SafeAreaView>
    </YStack>
  );
}
const style = StyleSheet.create({
  container: { flex: 1 },
});
