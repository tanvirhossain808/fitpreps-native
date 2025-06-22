import { View, Text, YStack, Image, XStack } from 'tamagui';
import React, { useEffect, useRef } from 'react';
import { FlatList, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { gymProductsForWomen } from '~/constant';
import { GymProduct } from '~/types/type';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
const defaultTabBarStyle = {
  position: 'absolute',
  borderRadius: 20,
  paddingHorizontal: 28,
  height: 68,
  paddingTop: 12,
  elevation: 7,
  shadowColor: '#B6BAC3',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  backgroundColor: 'rgba(255, 255, 255, 0.85)',
};
export default function GymProductsForWomen() {
  const navigation = useNavigation();
  const scrollOffset = useRef(0);
  const isTabBarVisible = useRef(true);
  const toggleTabBar = (visible: boolean) => {
    if (isTabBarVisible.current !== visible) {
      isTabBarVisible.current = visible;
      navigation.setOptions({
        tabBarStyle: visible ? defaultTabBarStyle : { ...defaultTabBarStyle, display: 'none' },
      });
    }
  };
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const diff = currentOffset - scrollOffset.current;
    scrollOffset.current = currentOffset;

    if (diff > 10 && isTabBarVisible.current) {
      toggleTabBar(false);
    } else if (diff < -10 && !isTabBarVisible.current) {
      toggleTabBar(true);
    }
  };

  // Reset tab bar when component unmounts
  useEffect(() => {
    return () => {
      navigation.setOptions({ tabBarStyle: defaultTabBarStyle });
    };
  }, [navigation]);
  useEffect(() => {
    return () => {
      navigation.setOptions({ tabBarStyle: defaultTabBarStyle });
    };
  }, [navigation]);
  return (
    <FlatList<GymProduct>
      keyExtractor={(item, index) => index.toString()}
      data={gymProductsForWomen}
      numColumns={2}
      style={{ paddingHorizontal: 16, marginTop: 20 }}
      renderItem={({ item }) => (
        <YStack
          p={8}
          mb={20}
          borderWidth={1}
          borderColor="#B6BAC3"
          gap={12}
          borderRadius={8}
          overflow="hidden"
          width="100%"
          maxWidth="50%"
          marginHorizontal={4}
          flex={1}>
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
      )}
      onScroll={handleScroll}
    />
  );
}
