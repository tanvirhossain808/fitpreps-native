import React, { useState } from 'react';
import Carousel from 'react-native-reanimated-carousel';
import { Image, Text, View, YStack } from 'tamagui';
import { WeeklyReview } from '~/constant';

export default function ReviewSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <Text textAlign="center" fontSize={24} fontWeight={800}>
        REAL PEOPLE, REAL RESULTS, REAl SATISFACTIONS!
      </Text>
      <YStack>
        <Carousel
          autoPlay={true}
          onSnapToItem={(index) => setActiveIndex(index)}
          width={358}
          height={500}
          data={WeeklyReview}
          renderItem={({ item }) => (
            <YStack mt="$3">
              <Image source={item.img} width={358} height={358} />
              <YStack mt="$3">
                <Text color="#959595" fontSize={20} fontWeight={500}>
                  {item.title}
                </Text>
                <Text color="#383A42" fontSize={20} fontWeight={500} mt={4}>
                  {item.description}
                </Text>
              </YStack>
            </YStack>
          )}
        />
        <View flexDirection="row" justifyContent="center" mt={10} gap={8}>
          {WeeklyReview.map((_, index) => (
            <View
              key={index}
              width={index === activeIndex ? 8 : 8}
              height={8}
              borderRadius={4}
              backgroundColor={index === activeIndex ? '#FF6B6B' : '#B6BAC3'}
              opacity={index === activeIndex ? 8 : 0.5}
              //   animation="quick"
              enterStyle={{
                width: index === activeIndex ? 8 : 8,
              }}
            />
          ))}
        </View>
      </YStack>
    </>
  );
}
