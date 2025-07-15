import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, ScrollView, Text, XStack, YStack } from 'tamagui';
import DrawerPageHeader from '~/src/components/drawer/DrawerPageHeader';
import Visa from 'public/images/visa.svg';
import Paypal from 'public/images/payment/paypal.svg';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { createElement } from 'react';
import { router } from 'expo-router';
import { shadows } from '~/src/constant';
export default function PaymentMethods() {
  return (
    <YStack f={1} bg="white">
      <SafeAreaView style={style.container}>
        <DrawerPageHeader title="Payment Methods" />
        <YStack f={1} px="$4" gap="$5" justifyContent="space-between">
          <ScrollView showsVerticalScrollIndicator={false} f={1}>
            <YStack py="$5" gap="$7">
              {cardDetails.map((data, i) => (
                <YStack key={i} gap="$3">
                  <Text color="#1E1F20" fontSize={16} fontWeight={700}>
                    {data.title}fd
                  </Text>
                  {data.cards.map((card, i) => (
                    <YStack
                      key={i}
                      bg="#F6F6F8"
                      p="$3"
                      borderWidth={1}
                      borderColor="#EDEEF1"
                      borderRadius={8}>
                      <XStack alignItems="center" justifyContent="space-between">
                        <XStack alignItems="center" gap="$2">
                          {card.icon()}
                          <YStack gap="$2">
                            {card.name && (
                              <Text color="#1E1F20" fontWeight={700} fontSize={12}>
                                {card.name}
                              </Text>
                            )}
                            <Text fontSize={12} fontWeight={500} color="#8E95A2">
                              {card.num}
                            </Text>
                          </YStack>
                        </XStack>
                        <TouchableOpacity
                          style={style.manage}
                          onPress={() =>
                            router.push({
                              pathname: '/(payments)/manage-card',
                              params: {},
                            })
                          }>
                          <Text color="#FD4F01" fontSize={16} fontWeight={700}>
                            {data.title === 'Saved Cards' ? 'Manage' : 'Delete'}
                          </Text>
                        </TouchableOpacity>
                      </XStack>
                    </YStack>
                  ))}
                </YStack>
              ))}
            </YStack>
          </ScrollView>
          <XStack py="$5">
            <Button
              onPress={() =>
                router.push({
                  pathname: '/(payments)/add-cards',
                  params: {},
                })
              }
              {...shadows.small}
              h={43}
              fontSize={16}
              fontWeight={700}
              f={1}
              bg="white"
              borderWidth={1}
              borderColor="#FD4F01"
              color="#FD4F01">
              Add New Payment Method
            </Button>
          </XStack>
        </YStack>
      </SafeAreaView>
    </YStack>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  manage: {
    borderBottomColor: '#FD4F01',
    borderBottomWidth: 2,
  },
});

const cardDetails = [
  {
    title: 'Saved Cards',
    cards: [
      {
        icon: () => createElement(Visa),
        name: 'Card Name',
        num: '**** **** **** 4321',
      },
      {
        icon: () => createElement(Visa),
        name: 'Card Name',
        num: '**** **** **** 4321',
      },
    ],
  },
  {
    title: 'Paypal',
    cards: [
      {
        name: '',
        icon: () => createElement(Paypal),
        num: '***** *****',
      },
    ],
  },
];
