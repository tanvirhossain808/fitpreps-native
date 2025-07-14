import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';
import { ImageSourcePropType, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Text, XStack, Image, YStack } from 'tamagui';
import { baseUrl } from '~/src/constants/baseConstant';
import { RootState } from '~/src/store';
import { increment, decrement } from '~/src/store/slices/cartSlice';
import { Productsmakelijke } from '~/src/types/type';
export default function CartFoodList({
  item,
}: {
  item: Productsmakelijke & {
    quantity: number;
  };
}) {
  const dispatch = useDispatch();
  // const quantity = useSelector((state: RootState) => {
  //   if ('_id' in item) {
  //     return state?.cart?.cartItems[item._id];
  //   }
  //   return undefined;
  // });
  const handlePlus = (item: Productsmakelijke) => {
    dispatch(increment(item));
  };
  const handleMinus = (item: Productsmakelijke) => {
    dispatch(decrement(item));
  };
  return (
    // <></>
    <XStack
      pb="$2"
      zIndex={0}
      flex={1}
      alignSelf="stretch"
      alignItems="center"
      gap="$2"
      flexWrap="wrap"
      bg="white"
      borderBottomWidth={1}
      borderColor="#EDEEF1"
      borderRadius={8}>
      <XStack flex={1} gap="$2" alignSelf="stretch">
        {/* <Image source={item.img} width={48} height={48} borderRadius={8} /> */}
        <XStack
          bg="#F4F4F7"
          borderRadius={8}
          w={48}
          h={48}
          alignItems="center"
          justifyContent="center">
          <Image
            source={{
              uri:
                item?.files?.length > 0
                  ? baseUrl + `/uploads/${item?.files[0]?.url}`
                  : item?.thumbnail?.url,
            }}
            width={40}
            height={40}
            aspectRatio={1}
            resizeMode="cover"
          />
        </XStack>
        <YStack flex={1} alignSelf="stretch" justifyContent="space-between">
          <Text
            fontSize={12}
            numberOfLines={2}
            ellipsizeMode="tail"
            color="#1E1F20"
            fontWeight={500}>
            {item.name}
          </Text>
          <Text color="#FD4F01" fontSize={14} fontWeight={700}>
            ${(parseFloat(item.metadata._price) * Number(item.quantity)).toFixed(2)}
          </Text>
        </YStack>
      </XStack>

      <XStack
        shadowColor="#0A0D12"
        shadowOffset={{ width: 0, height: 1 }}
        shadowOpacity={0.05}
        shadowRadius={2}
        elevation={1}
        maxHeight={40}
        maxWidth={112}
        flex={1}
        alignSelf="stretch"
        alignItems="center"
        borderWidth={1}
        borderColor="#FD4F01"
        borderRadius={8}
        justifyContent="center"
        bg="#FFEDE5">
        <TouchableOpacity style={{ padding: 8 }} onPress={() => handleMinus(item)}>
          <AntDesign name="minus" size={24} color="#FD4F01" />
        </TouchableOpacity>
        <XStack alignItems="center" justifyContent="center" height={'100%'} px="$3" bg="white">
          <Text fontSize={14} color="black" fontWeight={700}>
            {item?.quantity}
          </Text>
        </XStack>
        <TouchableOpacity style={{ padding: 8 }} onPress={() => handlePlus(item)}>
          <AntDesign name="plus" size={24} color="#FD4F01" />
        </TouchableOpacity>
      </XStack>
    </XStack>
  );
}
