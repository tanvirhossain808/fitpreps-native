import { View, Text, Button } from 'tamagui';
import React from 'react';
import Carousel from 'react-native-reanimated-carousel';
import { FlatList, Dimensions, ImageBackground } from 'react-native';
import { FoodOrSliderItem } from '~/type';
import { Image, YStack } from 'tamagui';

const { width } = Dimensions.get('window');

type SliderImage = {
  img: any; // Should be ImageSourcePropType
  caption: string;
  title: string;
  text: string;
  id: number;
};

type SliderCarouselProps = {
  images: SliderImage[];
};

function SliderCarousel({ images }: SliderCarouselProps) {
  return (
    <View width={width - 32} height={180} alignSelf="center">
      <Carousel
        width={width - 32}
        height={180}
        data={images}
        autoPlay
        autoPlayInterval={2500}
        loop
        renderItem={({ item }) => (
          <View flex={1} alignItems="center" justifyContent="center">
            <ImageBackground
              source={item.img}
              style={{ width: '100%', minHeight: 123, overflow: 'hidden', borderRadius: 12 }}>
              <YStack py={20} px={16} gap={12}>
                <YStack gap={4}>
                  <Text fontSize={16} color={item.text} fontWeight={700}>
                    {item.caption}
                  </Text>
                  <Text fontSize={12} color={item.text} fontWeight={500}>
                    {item.title}
                  </Text>
                </YStack>
                <View>
                  <Button
                    bg="#FFEDE5"
                    fontSize={14}
                    fontWeight={700}
                    color="#FD4F01"
                    borderRadius={8}
                    px={14}
                    py={8}
                    alignSelf="flex-start">
                    See Subscription Plans
                  </Button>
                </View>
              </YStack>
            </ImageBackground>
          </View>
        )}
      />
    </View>
  );
}

export default function ProductLists({
  products,
  contentContainerStyle,
  showsVerticalScrollIndicator,
  scrollEventThrottle,
  onScroll,
}: {
  products: FoodOrSliderItem[];
  contentContainerStyle?: any;
  showsVerticalScrollIndicator?: boolean;
  scrollEventThrottle?: number;
  onScroll?: any;
}) {
  // Group food items into rows of 2, keep slider as its own row
  const flatListData: any[] = [];
  let row: any[] = [];
  products.forEach((item) => {
    if (item.type === 'food') {
      row.push(item);
      if (row.length === 2) {
        flatListData.push([...row]);
        row = [];
      }
    } else {
      if (row.length) {
        flatListData.push([...row]);
        row = [];
      }
      flatListData.push([item]);
    }
  });
  if (row.length) flatListData.push([...row]);

  return (
    <FlatList
      data={flatListData}
      keyExtractor={(_, idx) => idx.toString()}
      renderItem={({ item }) => {
        // Slider row
        if (item.length === 1 && item[0].type === 'slider') {
          return (
            <YStack w="100%" mb={20}>
              <SliderCarousel images={item[0].images} />
            </YStack>
          );
        }
        // Food row (1 or 2 items)
        return (
          <YStack flexDirection="row" justifyContent="space-between" mb={20}>
            {item.map((food: FoodOrSliderItem) => (
              <YStack
                key={food.id}
                w={'48%'}
                p={8}
                gap={12}
                borderColor="#B6BAC3"
                borderWidth={1}
                borderRadius={8}>
                <View px={9} py={15} alignSelf="stretch" flex={1} bg="#E5F8EA" borderRadius={4}>
                  <Image
                    source={food.img}
                    style={{ width: '100%', minWidth: 140, height: 128 }}
                    resizeMode="contain"
                  />
                </View>
                <YStack gap={8}>
                  <Text fontSize={12} fontWeight={700} color="#1E1F20">
                    {food.name}
                  </Text>
                  <Button
                    fontSize={15}
                    color="white"
                    fontWeight={700}
                    bg="#FD4F01"
                    borderRadius={8}>
                    Add & Fuel Up
                  </Button>
                </YStack>
              </YStack>
            ))}
            {/* If only one food item in the row, add an empty space to keep grid */}
            {item.length === 1 && <YStack w={'48%'} />}
          </YStack>
        );
      }}
      contentContainerStyle={[
        { paddingBottom: 180 }, // <-- Add paddingBottom here
        contentContainerStyle,
      ]}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      scrollEventThrottle={scrollEventThrottle}
      onScroll={onScroll}
      style={{
        padding: 16,
        paddingTop: 160,
      }}
    />
  );
}
