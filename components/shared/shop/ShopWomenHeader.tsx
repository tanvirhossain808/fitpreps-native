import { View, Text, XStack, YStack } from 'tamagui';
import React from 'react';
import Feather from '@expo/vector-icons/Feather';
import { TouchableOpacity } from 'react-native';
export default function ShopWomenHeader() {
  return (
    <XStack py={20} px={16} alignItems="flex-start">
      <TouchableOpacity>
        <Feather name="chevron-left" size={24} color="black" />
      </TouchableOpacity>
      <YStack>
        <Text color="#1E1F20" fontSize={16} fontWeight={700}>
          Shop Women
        </Text>
        <Text color="#1E1F20" fontSize={16}>
          Explore 32 items
        </Text>
      </YStack>
    </XStack>
  );
}
