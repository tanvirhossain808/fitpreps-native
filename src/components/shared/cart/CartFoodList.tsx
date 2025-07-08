import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';
import { ImageSourcePropType, TouchableOpacity } from 'react-native';
import { Text, XStack, Image, YStack } from 'tamagui';

export default function CartFoodList({
  item,
}: {
  item: { name: string; price: number; img: ImageSourcePropType };
}) {
  const [quantity, setQuantity] = useState(1);
  const handlePlus = () => {
    setQuantity(quantity + 1);
  };
  const handleMinus = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  return (
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
        <Image source={item.img} width={48} height={48} borderRadius={8} />
        <YStack flex={1} alignSelf="stretch" justifyContent="space-between">
          <Text fontWeight="600">{item.name}</Text>
          <Text color="#FD4F01" fontWeight="600">
            ${item.price}
          </Text>
        </YStack>
      </XStack>

      <XStack
        shadowColor="#0A0D12"
        shadowOffset={{ width: 0, height: 1 }}
        shadowOpacity={0.05}
        shadowRadius={2}
        elevation={1}
        maxWidth={112}
        flex={1}
        alignSelf="stretch"
        alignItems="center"
        borderWidth={1}
        borderColor="#FD4F01"
        borderRadius={8}
        justifyContent="center"
        bg="#FFEDE5">
        <TouchableOpacity style={{ padding: 8 }} onPress={handlePlus}>
          <AntDesign name="plus" size={24} color="#FD4F01" />
        </TouchableOpacity>
        <XStack alignItems="center" justifyContent="center" height={'100%'} px="$3" bg="white">
          <Text fontSize={14} color="black" fontWeight={700}>
            {quantity}
          </Text>
        </XStack>

        <TouchableOpacity style={{ padding: 8 }} onPress={handleMinus}>
          <AntDesign name="minus" size={24} color="#FD4F01" />
        </TouchableOpacity>
      </XStack>
    </XStack>
  );
}
