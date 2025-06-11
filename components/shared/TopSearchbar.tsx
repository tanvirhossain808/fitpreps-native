import Feather from '@expo/vector-icons/Feather';
import Octicons from '@expo/vector-icons/Octicons';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Input, XStack } from 'tamagui';

export default function TopSearchbar({ placeholder }: { placeholder: string }) {
  return (
    <XStack p="$4" justifyContent="space-between" gap="$3" flexWrap="wrap" width="100%">
      <XStack
        bg="white"
        alignItems="center"
        pr={14}
        flex={1}
        minWidth={200}
        borderRadius={8}
        elevation={1}
        justifyContent="space-between"
        shadowColor="#0000000D"
        shadowOffset={{ width: 0, height: 0.2 }}
        shadowOpacity={0.05}
        shadowRadius={1}>
        <Input
          placeholder={placeholder}
          flex={1}
          focusStyle={{
            borderColor: 'transparent',
            outlineWidth: 0,
            shadowColor: 'transparent',
          }}
          minWidth={100}
          bg="transparent"
          borderColor="$colorTransparent"
        />
        <TouchableOpacity>
          <Octicons name="search" size={20} color="black" />
        </TouchableOpacity>
      </XStack>

      <XStack alignItems="center" gap="$2">
        <XStack
          w={40}
          h={40}
          alignItems="center"
          justifyContent="center"
          borderRadius={50}
          bg="#ffede5">
          <TouchableOpacity>
            <Feather name="shopping-cart" size={18} color="#FD4F01" />
          </TouchableOpacity>
        </XStack>

        <XStack
          w={40}
          h={40}
          alignItems="center"
          justifyContent="center"
          elevation={1}
          borderRadius={50}
          bg="#ffffff"
          shadowColor="#0000000D"
          shadowOffset={{ width: 0, height: 2 }}
          shadowOpacity={0.1}
          shadowRadius={4}>
          <TouchableOpacity>
            <Feather name="menu" size={18} color="#25272C" />
          </TouchableOpacity>
        </XStack>
      </XStack>
    </XStack>
  );
}
