import React, { useRef } from 'react';
import { Dimensions, FlatList, PanResponder, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { Button, H2, Text, XStack, YStack, Image } from 'tamagui';
import AntDesign from '@expo/vector-icons/AntDesign';
import Title from '../shared/Title';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 32) / 2;
const CARD_HEIGHT = 280;
const SPACING = 16;

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
  price: string;
};

type SectionType = {
  name: string;
  items: ItemType[];
};

export default function BestSellerSection({ data }: { data: SectionType[] }) {
  return (
    <FlatList
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

  // Group items into pairs using map
  const groupedItems = section.items
    .map((item, index) => {
      if (index % 2 === 0) {
        return [item, section.items[index + 1]];
      }
      return null;
    })
    .filter((pair): pair is ItemType[] => pair !== null);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      carouselRef.current?.scrollTo({
        index: currentIndex - 1,
        animated: true,
      });
    }
  };

  const handleNext = () => {
    if (currentIndex < groupedItems.length - 1) {
      setCurrentIndex(currentIndex + 1);
      carouselRef.current?.scrollTo({
        index: currentIndex + 1,
        animated: true,
      });
    }
  };

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      // Allow vertical scrolling when swiping vertically
      if (Math.abs(gestureState.dy) > Math.abs(gestureState.dx)) {
        return true;
      }
      return false;
    },
  });

  const handleScrollEnd = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <YStack space="$4">
      <XStack alignItems="center" justifyContent="space-between">
        <Title text={section.name} />
        <XStack space="$2">
          <Button
            size="$2"
            onPress={handlePrev}
            backgroundColor="#eee"
            circular
            disabled={currentIndex === 0}
            icon={<AntDesign name="left" size={16} color="black" />}
          />
          <Button
            size="$2"
            onPress={handleNext}
            backgroundColor="#eee"
            circular
            disabled={currentIndex === groupedItems.length - 1}
            icon={<AntDesign name="right" size={16} color="black" />}
          />
        </XStack>
      </XStack>

      <View {...panResponder.panHandlers}>
        <Carousel
          ref={carouselRef}
          loop={false}
          width={width - 32}
          height={CARD_HEIGHT}
          data={groupedItems}
          scrollAnimationDuration={500}
          onScrollEnd={handleScrollEnd}
          renderItem={({ item }) => (
            <XStack space={SPACING} width="100%">
              {item.map((product, index) => (
                <YStack
                  key={index}
                  width={CARD_WIDTH}
                  borderWidth={1}
                  borderColor="#eee"
                  borderRadius="$4"
                  backgroundColor="white"
                  overflow="hidden">
                  {/* Top Badge */}
                  <View
                    backgroundColor={product.badgeBg}
                    position="absolute"
                    top={8}
                    left={8}
                    paddingHorizontal="$2"
                    paddingVertical="$1"
                    borderRadius="$2"
                    zIndex={1}>
                    <Text color={product.color} fontSize="$2" fontWeight="bold">
                      {product.badge}
                    </Text>
                  </View>

                  {/* Image */}
                  <Image
                    source={product.img}
                    width="100%"
                    height={150}
                    resizeMode="cover"
                    borderRadius="$4"
                  />

                  <YStack padding="$3" space="$2" flex={1} justifyContent="space-between">
                    {/* Ratings */}
                    <XStack alignItems="center" justifyContent="flex-end">
                      <Text fontSize="$2" color="orange">
                        ⭐ {product.ratings}
                      </Text>
                    </XStack>

                    {/* Sub Badge */}
                    <Text
                      backgroundColor={product.subBadgeBg}
                      color={product.subBadgeColor}
                      paddingHorizontal="$2"
                      paddingVertical="$1"
                      fontSize="$2"
                      borderRadius="$2"
                      alignSelf="flex-start">
                      {product.subBadge}
                    </Text>

                    {/* Product Name */}
                    <Text fontWeight="bold" fontSize="$4">
                      {product.name}
                    </Text>

                    {/* Price */}
                    <Text color="red" fontSize="$5" fontWeight="bold">
                      {product.price}
                    </Text>

                    {/* Add Button */}
                    <Button
                      backgroundColor="orange"
                      borderRadius="$2"
                      padding="$2"
                      width="100%"
                      onPress={() => console.log('Add pressed')}>
                      Add
                    </Button>
                  </YStack>
                </YStack>
              ))}
            </XStack>
          )}
          mode="parallax"
          modeConfig={{
            parallaxScrollingOffset: 80,
            parallaxScrollingScale: 0.9,
            enableMomentum: true,
            enableSnap: true,
          }}
        />
      </View>
    </YStack>
  );
}
