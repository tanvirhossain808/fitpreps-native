import { Dispatch } from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from 'tamagui';
import { FaqCategory } from '~/types/type';

export default function FaqsOptionSelector({
  data,
  setFaqCategory,
  faqCategory,
}: {
  data: FaqCategory[];
  setFaqCategory: Dispatch<React.SetStateAction<FaqCategory>>;
  faqCategory: FaqCategory;
}) {
  return (
    <FlatList
      keyExtractor={(item) => item.name}
      contentContainerStyle={{
        paddingHorizontal: 12,
      }}
      horizontal
      showsHorizontalScrollIndicator={false}
      data={data}
      ItemSeparatorComponent={() => <View w={12} />}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => setFaqCategory(() => item)}
          style={{
            ...style.btn,
            backgroundColor: faqCategory.name === item.name ? '#FFEDE5' : 'transparent',
            borderWidth: 1,
            borderColor: faqCategory.name === item.name ? '#FF7435' : '#B6BAC3',
          }}>
          <Text>{item.name}</Text>
        </TouchableOpacity>
      )}
    />
  );
}

const style = StyleSheet.create({
  btn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    color: '#1E1F20',
    fontSize: 14,
    fontWeight: 500,
  },
});
