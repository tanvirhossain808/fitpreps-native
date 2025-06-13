import React from 'react';
import { Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { Button, Image, Text, XStack, YStack } from 'tamagui';
import { youMayLike } from '~/constant';

export default function CartCarousel() {
  const width = Dimensions.get('window').width - 32;

  return (
    <YStack width="100%" gap="$3" pb="$5">
      <Text color="#1E1F20" fontWeight={700} fontSize={16}>
        You might also like
      </Text>
      <Carousel
        loop
        width={width}
        height={200}
        autoPlay={true}
        autoPlayInterval={3000}
        data={youMayLike}
        scrollAnimationDuration={300}
        windowSize={3}
        style={{ width: '100%' }}
        renderItem={({ item, index }) => (
          <XStack
            key={index}
            p="$3"
            mx="$2"
            gap="$3"
            borderColor="#F7F8F8"
            borderWidth={1}
            borderRadius={12}
            shadowColor="rgba(56, 58, 66, 0.2)"
            shadowOffset={{ width: 2, height: 2 }}
            shadowRadius={4}
            shadowOpacity={1}
            elevation={4}
            backgroundColor="white">
            <XStack bg="#E5F8EA" borderRadius={4} p={9}>
              <Image source={item.img} width={107} height={107} />
            </XStack>
            <YStack flex={1} flexWrap="wrap" gap={3}>
              <Text
                alignSelf="flex-start"
                fontSize={10}
                fontWeight={700}
                color="white"
                p="$2"
                bg="#01B528"
                borderRadius={20}>
                {item.badge}
              </Text>
              <Text
                textWrap="wrap"
                color="#1E1F20"
                fontSize={15}
                fontWeight={700}
                alignSelf="stretch"
                ellipsizeMode="tail"
                width="100%"
                numberOfLines={2}>
                {item.name}
              </Text>
              <XStack width={'100%'} alignItems="center" mt={4} justifyContent="space-between">
                <Text color="#FD4F01" fontWeight={700} fontSize={14}>
                  €{item.price || '9'}
                </Text>
                <Button
                  px={20}
                  py={12}
                  fontSize={16}
                  borderWidth={1}
                  borderColor={'#FD4F01'}
                  shadowColor="rgba(10,13,18,0.05)"
                  shadowOffset={{ width: 0, height: 1 }}
                  shadowOpacity={1}
                  shadowRadius={2}
                  elevation={2}
                  borderRadius={8}
                  fontWeight={700}
                  color="#FD4F01"
                  bg="white">
                  ADD
                </Button>
              </XStack>
            </YStack>
          </XStack>
        )}
      />
    </YStack>
  );
}
