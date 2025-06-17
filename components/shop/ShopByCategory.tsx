import { Dimensions, TouchableOpacity } from 'react-native';
import { Image, Text, View, XStack, YStack } from 'tamagui';
import { shopByCategory } from '~/constant';
import Title from '../shared/Title';

export default function ShopByCategory() {
  const gap = 16;
  const containerWidth = Dimensions.get('window').width - 16 * 2;
  const imageWidth = (containerWidth - gap) / 2;
  return (
    <YStack gap={5}>
      <Title text="Shop By Category" />
      <XStack alignItems="center" gap={gap} justifyContent="space-between" width={'100%'}>
        {shopByCategory.map((category, i) => (
          <YStack key={i}>
            <TouchableOpacity
              style={{
                width: imageWidth,
                alignSelf: 'stretch',
              }}>
              <Image
                source={category.Img}
                width={imageWidth}
                height={175}
                borderRadius={8}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text color="#1E1F20" fontSize={14} fontWeight={500} textAlign="center">
              {category.name}
            </Text>
          </YStack>
        ))}
      </XStack>
    </YStack>
  );
}
