import { View, Text, YStack, XStack, Image } from 'tamagui';
import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';

export default function SelectedFoodCategories({
  cookdFoodCategories,
  selectFoodCategory,
  setSelectedFoodCategory,
}: {
  cookdFoodCategories: { name: string; img: number | { uri: string }; id: number }[];
  selectFoodCategory: string | null;
  setSelectedFoodCategory: (value: React.SetStateAction<string | null>) => void;
}) {
  return (
    <FlatList
      data={cookdFoodCategories}
      keyExtractor={(item) => item.id.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 16 }}
      renderItem={({ item }) => (
        <YStack alignItems="center" justifyContent="space-between" mr={4} w={80} h={80}>
          <XStack
            justifyContent="center"
            borderWidth={1.5}
            borderColor={item.name === selectFoodCategory ? '#FD4F01' : '$colorTransparent'}
            borderRadius={50}
            alignItems="center"
            w={56}
            h={56}>
            <TouchableOpacity onPress={() => setSelectedFoodCategory(item.name)}>
              <Image source={item.img} w={48} h={48} borderRadius={48} />
            </TouchableOpacity>
          </XStack>
          <Text
            color={selectFoodCategory === item.name ? '#FD4F01' : '#25272C'}
            fontWeight={selectFoodCategory === item.name ? 700 : 500}
            fontSize={12}>
            {item.name}
          </Text>
        </YStack>
      )}
    />
  );
}
