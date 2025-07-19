import { View, Text, Button, YStack, XStack, Input } from 'tamagui';
import React, { useState } from 'react';
import Visa from 'public/images/payment/visa.svg';
import Master from 'public/images/payment/master.svg';
import Am from 'public/images/payment/am.svg';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import Paypal from 'public/images/payment/paypal.svg';
import { router } from 'expo-router';
import { useSelector } from 'react-redux';
import { RootState } from '~/src/store';
export default function PurchaseStep3({
  setCurrentStep,
  selectedIndex,
  setSelectedIndex,
  subsType,
}: {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  selectedIndex: number | null;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number | null>>;
  subsType?: string | undefined;
}) {
  const [showPass, setShowPass] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('creditCard');
  const selectedAddress = useSelector((s: RootState) =>
    s.address.find((item) => item?._id === selectedIndex?.toString())
  );
  console.log(selectedAddress, 'selectedAddress');
  return (
    <YStack flex={1} padding={16} justifyContent="space-between">
      <YStack py="$5">
        <Text color="#1E1F20" fontSize={16} fontWeight={700}>
          Payment Options
        </Text>
        <YStack
          py={8}
          mt="20"
          gap="$3"
          borderWidth={1}
          borderColor="$B6BAC3"
          borderRadius={12}
          onPress={() => setSelectedPaymentMethod('creditCard')}>
          <XStack py={8} alignItems="center" justifyContent="space-between" px={16}>
            <XStack alignItems="center" gap="$2">
              <XStack
                alignItems="center"
                justifyContent="center"
                w={12}
                h={12}
                borderRadius={6}
                borderColor="#FD4F01"
                borderWidth={1}>
                <View
                  width={8}
                  height={8}
                  borderRadius={selectedPaymentMethod === 'creditCard' ? 6 : 0}
                  backgroundColor={
                    selectedPaymentMethod === 'creditCard' ? '#FD4F01' : 'transparent'
                  }></View>
              </XStack>
              <Text color="#1E1F20" fontWeight={500}>
                Credit Card
              </Text>
            </XStack>
            <XStack alignItems="center">
              <Visa />
              <Master />
              <Am />
              <Text mb={5} px={7} color="#1E1F20" fontSize={12}>
                +5
              </Text>
            </XStack>
          </XStack>
          <View h={'1'} bg="#B6BAC3"></View>
          <YStack px={16} gap={12} pb={8}>
            {cardInfo.map((item, index) => (
              <View key={index}>
                {item.name !== 'CVV' ? (
                  <Input
                    backgroundColor="white"
                    shadowColor="rgba(10, 13, 18, 0.05)"
                    shadowOffset={{ width: 0, height: 1 }}
                    shadowRadius={2}
                    shadowOpacity={1}
                    elevation={1}
                    placeholder={item.placeholder}
                    focusStyle={{
                      borderColor: 'transparent',
                      outlineWidth: 0,
                      shadowColor: 'transparent',
                    }}
                    placeholderTextColor={index === 0 ? '#1E1F20' : '#8E95A2'}
                    borderColor="#EDEEF1"
                    borderRadius={8}
                    height={40}
                    borderWidth={1}
                  />
                ) : (
                  <XStack
                    backgroundColor="white"
                    borderColor="#EDEEF1"
                    borderRadius={8}
                    height={40}
                    borderWidth={1}
                    shadowColor="rgba(10, 13, 18, 0.05)"
                    shadowOffset={{ width: 0, height: 1 }}
                    shadowRadius={2}
                    shadowOpacity={1}
                    elevation={0.5}
                    overflow="hidden"
                    width="100%"
                    alignItems="center"
                    px={12}>
                    <Input
                      secureTextEntry={!showPass}
                      flex={1}
                      backgroundColor="transparent"
                      borderWidth={0}
                      height="100%"
                      padding={0}
                      placeholder={item.placeholder}
                      placeholderTextColor="#8E95A2"
                      fontSize={14}
                      focusStyle={{
                        borderColor: 'transparent',
                        outlineWidth: 0,
                        shadowColor: 'transparent',
                      }}
                    />
                    <TouchableOpacity onPress={() => setShowPass(!showPass)}>
                      <Feather name={!showPass ? 'eye-off' : 'eye'} size={24} color="black" />
                    </TouchableOpacity>
                  </XStack>
                )}
              </View>
            ))}
          </YStack>
        </YStack>
        <XStack
          onPress={() => setSelectedPaymentMethod('paypal')}
          py={8}
          borderWidth={1}
          borderColor="#B6BAC3"
          borderRadius={12}
          mt={'$6'}
          alignItems="center"
          justifyContent="space-between"
          px={16}>
          <XStack alignItems="center" gap="$2">
            <XStack
              alignItems="center"
              justifyContent="center"
              w={12}
              h={12}
              borderRadius={6}
              borderColor="#FD4F01"
              borderWidth={1}>
              <View
                width={8}
                height={8}
                borderRadius={selectedPaymentMethod === 'paypal' ? 6 : 0}
                backgroundColor={
                  selectedPaymentMethod === 'paypal' ? '#FD4F01' : 'transparent'
                }></View>
            </XStack>
            <Text color="#1E1F20" fontWeight={500}>
              Paypal
            </Text>
          </XStack>
          <Paypal />
        </XStack>
      </YStack>
      <Button
        onPress={() =>
          router.push({
            pathname: '/orderplaced',
            params: {
              status: 'success',
              type: subsType === 'upgrade' ? 'upgrade' : 'subscription',
            },
          })
        }
        backgroundColor="#FD4F01"
        height={44}
        borderRadius={12}
        fontWeight={700}
        fontSize={16}
        shadowColor="rgba(10, 13, 18, 0.05)"
        shadowOffset={{ width: 0, height: 1 }}
        shadowRadius={2}
        shadowOpacity={1}
        elevation={0.5}
        alignItems="center"
        justifyContent="center">
        <Text color="white" fontWeight={600}>
          Pay Now
        </Text>
      </Button>
    </YStack>
  );
}

const cardInfo = [
  {
    name: 'Card number',
    placeholder: 'xxxx xxxx xxxx xxxx',
  },
  {
    name: 'name',
    placeholder: 'Name on card - test',
  },
  {
    name: 'Expiry',
    placeholder: 'Expiry Date - test',
  },
  {
    name: 'CVV',
    placeholder: 'CVV -test',
  },
];
