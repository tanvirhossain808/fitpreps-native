import { Stack, router, useNavigation } from 'expo-router';
import { Button, Image, Input, ScrollView, Text, View, XStack, YStack } from 'tamagui';
import Octicons from '@expo/vector-icons/Octicons';
import Feather from '@expo/vector-icons/Feather';
import { NativeScrollEvent, NativeSyntheticEvent, TouchableOpacity, Animated } from 'react-native';
import { Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { selectCategories } from '~/src/constant';
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const [selectCategory, setSelectedCategory] = useState<number | null>(null);
  const navigation = useNavigation();
  const scrollOffset = useRef(0);
  const SCROLL_THRESHOLD = 10;

  // Animated value for tab bar translateY
  const tabBarTranslateY = useRef(new Animated.Value(0)).current;

  const hideTabBar = () => {
    Animated.timing(tabBarTranslateY, {
      toValue: 100, // move tab bar down (hide)
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  const showTabBar = () => {
    Animated.timing(tabBarTranslateY, {
      toValue: 0, // move tab bar up (show)
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const diff = currentOffset - scrollOffset.current;

    if (diff > SCROLL_THRESHOLD) {
      hideTabBar();
    } else if (diff < -SCROLL_THRESHOLD) {
      showTabBar();
    }

    scrollOffset.current = currentOffset;
  };

  useEffect(() => {
    navigation.setOptions({
      tabBarStyle: {
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
        transform: [{ translateY: tabBarTranslateY }],
      },
    });
  }, [navigation, tabBarTranslateY]);

  return (
    <>
      <StatusBar style="dark" />
      <Stack.Screen />

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          onScroll={onScroll}
          scrollEventThrottle={16}
          contentContainerStyle={{ paddingBottom: 60 }}
          showsVerticalScrollIndicator={false}
          bg={'#fffdf6'}>
          <YStack flex={1} pb="$10">
            <XStack p="$4" justifyContent="space-between" gap="$3" flexWrap="wrap" width="100%">
              <XStack
                bg="white"
                alignItems="center"
                pr={14}
                flex={1}
                minWidth={200}
                borderRadius={20}
                elevation={1}
                justifyContent="space-between"
                shadowColor="#0000000D"
                shadowOffset={{ width: 0, height: 0.2 }}
                shadowOpacity={0.05}
                shadowRadius={1}>
                <Input
                  placeholder="Search here"
                  flex={1}
                  focusStyle={{
                    borderColor: 'transparent',
                    outlineWidth: 0,
                    shadowColor: 'transparent',
                  }}
                  minWidth={100}
                  bg="transparent"
                  borderColor="$colorTransparent"
                />
                <TouchableOpacity>
                  <Octicons name="search" size={20} color="black" />
                </TouchableOpacity>
              </XStack>

              <XStack alignItems="center" gap="$2">
                <XStack
                  w={40}
                  h={40}
                  alignItems="center"
                  justifyContent="center"
                  borderRadius={50}
                  bg="#ffede5">
                  <TouchableOpacity>
                    <Feather name="shopping-cart" size={18} color="#FD4F01" />
                  </TouchableOpacity>
                </XStack>

                <XStack
                  w={40}
                  h={40}
                  alignItems="center"
                  justifyContent="center"
                  elevation={1}
                  borderRadius={50}
                  bg="#ffffff"
                  shadowColor="#0000000D"
                  shadowOffset={{ width: 0, height: 2 }}
                  shadowOpacity={0.1}
                  shadowRadius={4}>
                  <TouchableOpacity>
                    <Feather name="menu" size={18} color="#25272C" />
                  </TouchableOpacity>
                </XStack>
              </XStack>
            </XStack>
            <YStack flex={1} pt={'$12'} gap={'$7'}>
              <XStack justifyContent="center">
                <Image source={require('public/images/fitpreps.png')} width={278} height={32} />
              </XStack>
              <YStack alignItems="center">
                <Text color="#1E1F20" fontWeight={500} fontSize={16}>
                  Fuelling your fitness.
                </Text>
                <Text color="#1E1F20" fontWeight={500} fontSize={16}>
                  Pick your journey.
                </Text>
              </YStack>
              <YStack px={'$2'} gap={'$5'}>
                <XStack justifyContent="center" rowGap="$5" gap="$2" flexWrap="wrap">
                  {selectCategories.map(({ img, name, width, border, pathName, path }, i) => (
                    <TouchableOpacity
                      key={i}
                      style={{
                        padding: 3.5,
                        borderWidth: 2,
                        borderRadius: 12,
                        borderColor: selectCategory === i ? border : 'transparent',
                      }}
                      onPress={() =>
                        router.push({
                          pathname: pathName as any,
                          params: { product: path },
                        })
                      }
                      onPressIn={() => setSelectedCategory(i)}
                      onPressOut={() => setSelectedCategory(null)}>
                      <Image source={img} width={width} h={'126'} borderRadius={'$3'} />
                    </TouchableOpacity>
                  ))}
                </XStack>
              </YStack>
            </YStack>
          </YStack>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
