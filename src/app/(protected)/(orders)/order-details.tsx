import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Image, ScrollView, Text, View, XStack, YStack } from 'tamagui';
import DrawerPageHeader from '~/src/components/drawer/DrawerPageHeader';
import Coin from 'public/images/coin.svg';
import { useLocalSearchParams } from 'expo-router';
import { Order } from '~/src/types/type';
export default function OrderDetails() {
  const { orderedItems } = useLocalSearchParams();
  const orderData: Order = JSON.parse(orderedItems as string);
  console.log(orderData, 'order daa');
  const height = Dimensions.get('screen').height - 200;
  const subtotal =
    Number(orderData.total) -
    (orderData.metadata?._billing_country?.toLowerCase() === 'nl' ? 6.95 : 8.95);
  return (
    <YStack flex={1} bg="white">
      <SafeAreaView style={style.container}>
        <DrawerPageHeader title="My Orders" />
        <YStack px="$4" justifyContent="space-between" flex={1}>
          <ScrollView
            style={style.container}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            <YStack
              px="$4"
              f={1}
              minHeight={height}
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
                      {orderData.metadata._deliveryDate}
                    </Text>
                  </YStack>
                </XStack>
                <XStack gap="$2">
                  <Text color="#8E95A2" fontSize={12}>
                    Order Number:
                  </Text>
                  <YStack flex={1}>
                    <Text color="#1E1F20" fontSize={12} fontWeight={600} flexWrap="wrap">
                      {orderData._id}
                    </Text>
                  </YStack>
                </XStack>
                {/* <XStack gap="$2">
                  <Text color="#8E95A2" fontSize={12}>
                    Tracking Number:
                  </Text>
                  <YStack flex={1}>
                    <Text color="#1E1F20" fontSize={12} fontWeight={600} flexWrap="wrap">
                      ASDGH234GAS24
                    </Text>
                  </YStack>
                </XStack> */}
                <XStack borderBottomWidth={1} borderBottomColor="#EDEEF1" gap="$2" pb="$2">
                  <Text color="#8E95A2" fontSize={12}>
                    Delivered on:
                  </Text>
                  <YStack flex={1}>
                    <Text color="#1E1F20" fontSize={12} fontWeight={600} flexWrap="wrap">
                      {/* ABC Apartments, Street name, Block no., Area, City Name, State - 000000. */}
                      {orderData.metadata._shipping_address_1 +
                        ', ' +
                        orderData.metadata._shipping_address_2 +
                        ', ' +
                        orderData.metadata._shipping_city +
                        ', ' +
                        orderData.metadata._shipping_state +
                        ', ' +
                        orderData.metadata._shipping_postcode}
                    </Text>
                  </YStack>
                </XStack>
              </YStack>
              <YStack flex={1} gap="$2">
                {orderData.items.map((item, i) => (
                  <XStack
                    key={i}
                    gap="$2"
                    borderBottomWidth={1}
                    pb="$1"
                    borderBottomColor="#EDEEF1">
                    <Image
                      source={{ uri: item.meta._thumbnail }}
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
                        {item.order_item_name}
                      </Text>
                      <XStack alignItems="center" justifyContent="space-between">
                        <XStack alignItems="center" gap="$1">
                          <Text color="#FD4F01" fontSize={14} fontWeight={700}>
                            ${item.meta._line_total}
                          </Text>
                          {/* <Coin /> */}
                        </XStack>
                        <Text color="#1E1F20" fontSize={14}>
                          Qty: {item.meta._qty}
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
                        $ {subtotal}
                      </Text>
                      {/* <Coin /> */}
                      {/* (country === 'BE' ? 8.95 : 6.95); */}
                    </XStack>
                  </XStack>
                  <XStack justifyContent="space-between" alignItems="center">
                    <Text color="#1E1F20" fontSize={14} fontWeight={500}>
                      Shipping cost
                    </Text>
                    <XStack alignItems="center" gap="$1">
                      <Text color="#1E1F20" fontSize={14} fontWeight={500}>
                        €
                        {orderData.metadata._billing_country.toLocaleLowerCase() === 'nl'
                          ? 6.95
                          : 8.95}
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
                    €{orderData.total}
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
