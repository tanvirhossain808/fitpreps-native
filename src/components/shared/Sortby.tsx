import { Text, YStack, Portal } from 'tamagui';
import { TouchableOpacity } from 'react-native';
import { SortOption } from '~/src/types/type';
import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';

export default function Sortby({
  data,
  setShowSort,
  sort,
  setSort,
  handleUpdateSortBy,
}: {
  data: {
    name: string;
    value: string;
  }[];
  setShowSort: (show: boolean) => void;
  sort: string | null;
  setSort: (sort: string | null) => void;
  handleUpdateSortBy: (sortOption: SortOption) => void;
}) {
  const handleSortPress = (sortValue: SortOption) => {
    setTimeout(() => handleUpdateSortBy(sortValue), 0);
    setShowSort(false);
  };

  return (
    <Portal top={300} left={70}>
      <YStack
        pos="absolute"
        top={25}
        zIndex={200}
        borderColor="#8E95A2"
        borderWidth={1}
        py={12}
        borderRadius={8}
        bg="white"
        left={-50}
        shadowColor="#000"
        shadowOffset={{ width: 0, height: 4 }}
        shadowOpacity={0.15}
        shadowRadius={8}
        elevationAndroid={4}
        w={146}>
        {data.map(({ name, value }, i) => (
          <TouchableOpacity
            key={i}
            onPressIn={() => setSort(name)}
            onPress={() => handleSortPress(value as SortOption)}>
            <Text
              px={16}
              bg={sort === name ? '#E5F8EA' : 'transparent'}
              fontSize={13}
              py={12}
              fontWeight={500}
              color="#1E1F20">
              {name}
            </Text>
          </TouchableOpacity>
        ))}
      </YStack>
    </Portal>
  );
}
