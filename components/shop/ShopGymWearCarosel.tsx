import { View, Text, XStack, YStack } from 'tamagui';
import React from 'react';
import Carousel from 'react-native-reanimated-carousel';
import { ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import { shopByCategorySlider } from '~/constant';

const { width } = Dimensions.get('window');

export default function ShopGymWearCarosel() {
  return (
    <YStack py={20}>
      <Carousel
        width={width - 32}
        height={122}
        data={shopByCategorySlider}
        autoPlay
        autoPlayInterval={2500}
        loop
        renderItem={({ item }) => (
          <YStack flex={1} alignItems="center" justifyContent="center">
            <ImageBackground
              source={item.img}
              style={{ width: '100%', minHeight: 123, overflow: 'hidden', borderRadius: 12 }}>
              <XStack justifyContent={item.textPostion === 'right' ? 'flex-end' : 'flex-start'}>
                <YStack py={20} px={16} gap={12} maxWidth={200} justifyContent="space-between">
                  <YStack gap={4}>
                    <Text fontSize={16} color={'white'} fontWeight={700}>
                      {item.caption}
                    </Text>
                    <Text fontSize={12} color={'white'} fontWeight={500} maxWidth={200}>
                      {item.title}
                    </Text>
                  </YStack>
                  <TouchableOpacity>
                    <Text
                      fontSize={14}
                      fontWeight={700}
                      color="white"
                      borderBottomWidth={1}
                      borderBottomColor="white"
                      width={66}>
                      Shop Now
                    </Text>
                  </TouchableOpacity>
                </YStack>
              </XStack>
            </ImageBackground>
          </YStack>
        )}
      />
    </YStack>
  );
}
