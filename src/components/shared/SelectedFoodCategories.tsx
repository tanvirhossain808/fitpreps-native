import { Text, YStack, XStack, Image } from 'tamagui';
import React, { ReactElement } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';

export default function SelectedFoodCategories({
  cookdFoodCategories,
  activeStatsBarInfo,
}: {
  cookdFoodCategories: {
    name: string;
    img: number | { uri: string } | string;
    id: number;
    svg?: () => ReactElement;
  }[];
  activeStatsBarInfo: { name: string; color: string; tentColor: string } | null;
}) {
  const [selectFoodCategory, setSelectedFoodCategory] = React.useState<string | null>(null);
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
            borderColor={
              item.name === selectFoodCategory ? activeStatsBarInfo?.tentColor : 'transparent'
            }
            borderRadius={50}
            alignItems="center"
            w={56}
            h={56}>
            <TouchableOpacity onPress={() => setSelectedFoodCategory(item.name)}>
              {item.img && item.img ? (
                <Image
                  source={typeof item.img === 'string' ? { uri: item.img } : item.img}
                  w={48}
                  h={48}
                  borderRadius={48}
                />
              ) : (
                item.svg && item.svg()
              )}
            </TouchableOpacity>
          </XStack>
          <Text
            color={selectFoodCategory === item.name ? activeStatsBarInfo?.tentColor : '#25272C'}
            fontWeight={selectFoodCategory === item.name ? 700 : 500}
            fontSize={12}>
            {item.name}
          </Text>
        </YStack>
      )}
    />
  );
}
