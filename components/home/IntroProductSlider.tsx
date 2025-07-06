import { useState, useRef } from 'react';
import { View, Text, YStack, XStack, useWindowDimensions, Image, Button } from 'tamagui';
import Carousel from 'react-native-reanimated-carousel';
import { HomeIntroProducts, shadows } from '~/constant';
import { router } from 'expo-router';

export default function IntroProductSlider() {
  const { width: windowWidth } = useWindowDimensions();
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);

  // Calculate item width with padding
  const itemWidth = windowWidth; // 20px padding on each side

  return (
    <>
      <YStack width="100%" overflow="visible">
        <Carousel
          ref={carouselRef}
          loop={true}
          autoPlay={true}
          autoPlayInterval={3000}
          width={itemWidth}
          height={500}
          data={HomeIntroProducts}
          onSnapToItem={(index) => setActiveIndex(index)}
          renderItem={({ item, index }) => (
            <YStack gap={40} height={500} pr={35} justifyContent="center" overflow="visible">
              <Text fontSize={24} mb={5} textAlign="center" fontWeight={800}>
                {item.headerTitle}
              </Text>
              <YStack
                // px={20}
                // px={}
                justifyContent="flex-end"
                alignItems="center"
                // overflow="visible"
                height="394"
                px={24}
                py={32}
                borderWidth={1}
                borderRadius={20}
                overflow="visible"
                zIndex={10}
                borderColor="#01B528">
                <Image
                  overflow="visible"
                  position="absolute"
                  source={item.img}
                  width={item.width}
                  // scale={0s}
                  height={'100%'}
                  left={item.left}
                  top={item.top}
                  right={item.right}
                  objectFit="contain"
                  zIndex={0}
                />
                <YStack gap="$3" justifyContent="center" alignItems="center" zIndex={100}>
                  <XStack
                    w={40}
                    justifyContent="center"
                    alignItems="center"
                    h={40}
                    borderRadius={20}
                    bg="#01B528">
                    <Text fontSize={24} color="white" fontWeight={800}>
                      {item.id}
                    </Text>
                  </XStack>
                  <YStack alignItems="center">
                    <Text fontSize={24} fontWeight={800}>
                      {item.title1}
                    </Text>
                    <Text fontSize={24} fontWeight={800}>
                      {item.title2}
                    </Text>
                  </YStack>
                  <Text textAlign="center" mb={10} fontSize={20} fontWeight={500}>
                    {item.description}
                  </Text>
                </YStack>
              </YStack>
            </YStack>
          )}
        />

        {/* Pagination Dots */}
        <XStack justifyContent="center" alignItems="center" gap={8}>
          {HomeIntroProducts.map((_, index) => (
            <View
              key={index}
              width={index === activeIndex ? 8 : 8}
              height={8}
              borderRadius={4}
              backgroundColor={index === activeIndex ? '#FD4F01' : '#B6BAC3'}
            />
          ))}
        </XStack>
      </YStack>
      <YStack px={16} alignItems="center">
        {HomeIntroProducts[activeIndex].icon()}
        <YStack mt="$4" w="100%">
          <Text textAlign="center" fontSize={24} fontWeight={800}>
            {HomeIntroProducts[activeIndex].endTitle1}
          </Text>
          <Text textAlign="center" fontSize={24} fontWeight={800}>
            {HomeIntroProducts[activeIndex].endTitle2}
          </Text>
        </YStack>
        <XStack mt="$5">
          <Button
            onPress={() => router.push('/(navigator)/(tabs)/subscription')}
            color="white"
            bg="#FD4F01"
            {...shadows.small}
            fontSize={16}
            fontWeight={700}
            px={20}>
            Subscribe Now
          </Button>
        </XStack>
      </YStack>
    </>
  );
}
