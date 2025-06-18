import React, { useRef } from 'react';
import { Dimensions, FlatList } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { Button, Text, XStack, YStack, Image, View } from 'tamagui';
import AntDesign from '@expo/vector-icons/AntDesign';
import Title from '../shared/Title';
import ShopGymWearCarosel from './ShopGymWearCarosel';
import ShopByCategory from './ShopByCategory';
import Entypo from '@expo/vector-icons/Entypo';
const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 32;
const CARD_HEIGHT = 310;

type ItemType = {
  badge: string;
  img: any;
  badgeBg: string;
  color: string;
  subBadgeBg: string;
  subBadgeColor: string;
  subBadge: string;
  ratings: string;
  name: string;
  discount: string;
  price: string;
};

type SectionType = {
  name: string;
  items: ItemType[];
};

export default function BestSellerSection({ data }: { data: SectionType[] }) {
  return (
    <FlatList
      style={{ flex: 1 }}
      ListHeaderComponent={
        <YStack flex={1}>
          <ShopByCategory />
          <ShopGymWearCarosel />
        </YStack>
      }
      data={data}
      keyExtractor={(_, index) => `section-${index}`}
      renderItem={({ item }) => <SingleCarouselSection section={item} />}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ padding: 16 }}
    />
  );
}

function SingleCarouselSection({ section }: { section: SectionType }) {
  const carouselRef = useRef<any>(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const handleNext = () => {
    if (currentIndex < groupedItems.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      carouselRef.current?.scrollTo({ index: newIndex, animated: true });
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      carouselRef.current?.scrollTo({ index: newIndex, animated: true });
    }
  };

  const groupedItems = section.items.reduce((result, item, index) => {
    if (index % 2 === 0) {
      result.push([item, section.items[index + 1]].filter(Boolean));
    }
    return result;
  }, [] as ItemType[][]);

  return (
    <YStack gap={12} flex={1}>
      <XStack alignItems="center" justifyContent="space-between">
        <Title text={section.name} />
        <XStack gap="$2">
          <Button
            onPress={handlePrev}
            backgroundColor={currentIndex === 0 ? '#F2F4F7' : '#EDEEF1'}
            circular
            width={32}
            height={32}
            disabled={currentIndex === 0}
            icon={
              <AntDesign name="left" size={16} color={currentIndex === 0 ? '#98A2B3' : '#1E1F20'} />
            }
          />
          <Button
            disabled={currentIndex >= groupedItems.length - 1}
            width={32}
            height={32}
            onPress={handleNext}
            backgroundColor={currentIndex >= groupedItems.length - 1 ? '#F2F4F7' : '#EDEEF1'}
            circular
            icon={
              <AntDesign
                name="right"
                size={16}
                color={currentIndex >= groupedItems.length - 1 ? '#98A2B3' : '#1E1F20'}
              />
            }
          />
        </XStack>
      </XStack>
      <Carousel
        ref={carouselRef}
        loop={false}
        width={CARD_WIDTH}
        data={groupedItems}
        style={{ minHeight: CARD_HEIGHT }}
        scrollAnimationDuration={500}
        onSnapToItem={setCurrentIndex}
        enabled={false}
        renderItem={({ item: items }) => (
          <XStack width={CARD_WIDTH} gap={8} pb={20}>
            {items.map((item, idx) => (
              <YStack
                key={idx}
                p={8}
                flex={1}
                borderWidth={1}
                borderColor="#B6BAC3"
                gap={12}
                borderRadius={8}
                overflow="hidden">
                <View>
                  <Image
                    height={170}
                    borderRadius={8}
                    width={'100%'}
                    source={item.img}
                    resizeMode="cover"
                  />
                  <Text
                    top={4}
                    left={4}
                    color={item.color}
                    p={'$2'}
                    borderRadius={20}
                    bg={item.badgeBg}
                    position="absolute">
                    {item.badge}
                  </Text>
                  <XStack
                    alignItems="center"
                    bg="white"
                    p={4}
                    borderRadius={4}
                    gap={2}
                    bottom={4}
                    right={4}
                    position="absolute">
                    <Entypo name="star" size={10} color="#FDB022" />
                    <Text fontSize={10} fontWeight={500}>
                      {item.ratings}
                    </Text>
                  </XStack>
                </View>
                <YStack gap={8}>
                  <XStack>
                    <Text
                      textAlign="left"
                      paddingHorizontal={8}
                      paddingVertical={6}
                      borderRadius={4}
                      bg={item.subBadgeBg}
                      fontWeight="500"
                      fontSize={10}
                      color={item.subBadgeColor}>
                      {item.subBadge}
                    </Text>
                  </XStack>

                  <Text fontSize={12} fontWeight={700} color="black">
                    {item.name}
                  </Text>
                  <XStack alignItems="center" justifyContent="space-between">
                    <XStack alignItems="center" gap={4}>
                      <Text color="#FD4F01" fontSize={14} fontWeight={700}>
                        €XX
                      </Text>
                      <Text fontSize={14} color="#383A42">
                        €XX
                      </Text>
                    </XStack>
                    {item.discount && (
                      <Text
                        bg=""
                        color="#7A62E9"
                        fontWeight={600}
                        backgroundColor="#EDEEF1"
                        px={8}
                        borderRadius={20}
                        py={4}>
                        {item.discount}% off
                      </Text>
                    )}
                  </XStack>
                </YStack>
              </YStack>
            ))}
          </XStack>
        )}
      />
    </YStack>
  );
}
