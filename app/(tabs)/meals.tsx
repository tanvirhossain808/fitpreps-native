import React, { useRef, useState, useEffect } from 'react';
import {
  Animated,
  StatusBar as RNStatusBar,
  Platform,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { H3, H5, Image, Text, View, XStack, YStack } from 'tamagui';
import TopSearchbar from '~/components/shared/TopSearchbar';
import Ionicons from '@expo/vector-icons/Ionicons';
import Sortby from '~/components/shared/Sortby';
import { cookdFoodCategories, foodSortByOptions } from '~/constant';

export default function Home() {
  const [showCompact, setShowCompact] = useState(false);
  const [sort, setSort] = useState<null | string>(null);
  const [showSort, setShowSort] = useState(false);
  const [selectFoodCategory, setSelectedFoodCategory] = useState<string | null>(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const lastScrollY = useRef(0);
  const animation = useRef(new Animated.Value(0)).current;
  const HEADER_HEIGHT = 160;
  const COMPACT_BAR_HEIGHT = 190;
  console.log(setShowSort);
  // Animate between header and compact bar when showCompact changes
  useEffect(() => {
    Animated.timing(animation, {
      toValue: showCompact ? 1 : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [showCompact, animation]);

  // Track scroll direction and show/hide header/compact bar
  const handleScroll = Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
    useNativeDriver: false,
    listener: (event) => {
      //@ts-ignore
      const currentY = event.nativeEvent.contentOffset.y;
      if (currentY > lastScrollY.current && currentY > HEADER_HEIGHT) {
        setShowCompact(true);
      } else if (currentY < lastScrollY.current) {
        setShowCompact(false);
      }
      lastScrollY.current = currentY;
    },
  });

  // Animate header translateY
  const headerTranslateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -HEADER_HEIGHT],
  });

  // Animate compact bar
  const compactBarOpacity = animation;
  const compactBarTranslateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-COMPACT_BAR_HEIGHT, 0],
  });

  // Dummy data for scrolling
  const dummyMeals = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    name: `Meal ${i + 1}`,
  }));

  // Status bar color
  useEffect(() => {
    RNStatusBar.setBarStyle(showCompact ? 'dark-content' : 'light-content', true);
    if (Platform.OS === 'android') {
      RNStatusBar.setBackgroundColor(showCompact ? 'white' : '#0A8A23', true);
    }
  }, [showCompact]);

  return (
    <View flex={1} bg="white">
      {/* Animated Header */}
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          transform: [{ translateY: headerTranslateY }],
          minHeight: HEADER_HEIGHT,
          backgroundColor: 'white',
        }}
        pointerEvents={showCompact ? 'none' : 'auto'}>
        <SafeAreaView>
          <XStack bg="#0A8A23" borderBottomStartRadius={20} borderBottomEndRadius={20}>
            <TopSearchbar placeholder="Search your meal here" />
          </XStack>
          <XStack px={16} py={20}>
            <H5 color="#25272C" fontWeight={700} size={16}>
              What are you looking for today?
            </H5>
          </XStack>
          <FlatList
            data={cookdFoodCategories}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
            renderItem={({ item }) => (
              <YStack alignItems="center" justifyContent="space-between" mr={4} w={80} h={80}>
                <XStack
                  justifyContent="center"
                  borderWidth={1.5}
                  borderColor={item.name === selectFoodCategory ? '#FD4F01' : '$colorTransparent'}
                  borderRadius={50}
                  alignItems="center"
                  w={56}
                  h={56}>
                  <TouchableOpacity onPress={() => setSelectedFoodCategory(item.name)}>
                    <Image source={item.img} w={48} h={48} borderRadius={48} />
                  </TouchableOpacity>
                </XStack>
                <Text
                  color={selectFoodCategory === item.name ? '#FD4F01' : '#25272C'}
                  fontWeight={selectFoodCategory === item.name ? 700 : 500}
                  fontSize={12}>
                  {item.name}
                </Text>
              </YStack>
            )}
          />
          <View px={16} mt={'$5'}>
            <XStack
              justifyContent="space-between"
              py={12}
              borderTopWidth={0.5}
              borderTopColor="#B6BAC3"
              borderBottomWidth={0.5}
              borderBottomColor="#B6BAC3">
              <XStack alignItems="center" gap={12}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <Ionicons name="filter-outline" size={16} color="#25272C" />
                  <Text color="#25272C" fontSize={12}>
                    Filters
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setShowSort(!showSort)}
                  activeOpacity={0.5}
                  style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <Text color="#25272C" fontSize={12}>
                    {sort === null ? 'Sort By' : sort}
                  </Text>
                  <Ionicons
                    name={showSort ? 'chevron-up' : 'chevron-down'}
                    size={16}
                    color="#25272C"
                  />
                  {showSort && (
                    <Sortby
                      data={foodSortByOptions}
                      setShowSort={setShowSort}
                      sort={sort}
                      setSort={setSort}
                    />
                  )}
                </TouchableOpacity>
              </XStack>
              <Text fontSize={11} color="#25272C">
                48 meal preps to explore
              </Text>
            </XStack>
          </View>
        </SafeAreaView>
      </Animated.View>

      {/* Sticky Compact Bar */}
      <Animated.View
        style={{
          position: 'absolute',
          top: Platform.OS === 'android' ? 0 : 44,
          left: 0,
          right: 0,
          height: COMPACT_BAR_HEIGHT,
          backgroundColor: 'white',
          zIndex: 11,
          justifyContent: 'center',
          alignItems: 'center',
          borderBottomColor: '#eee',
          borderBottomWidth: 1,
          opacity: compactBarOpacity,
          transform: [{ translateY: compactBarTranslateY }],
        }}
        pointerEvents={showCompact ? 'auto' : 'none'}>
        <Text color="#0A8A23" fontWeight={700} fontSize={18}>
          Compact Bar
        </Text>
      </Animated.View>

      {/* Main Content */}
      <SafeAreaView style={{ flex: 1, paddingTop: HEADER_HEIGHT }}>
        <Animated.ScrollView
          contentContainerStyle={{ paddingBottom: 60 }}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={handleScroll}>
          <YStack bg="white" flex={1} gap="$4" p="$4">
            {dummyMeals.map((meal) => (
              <XStack
                key={meal.id}
                bg="#F2F2F2"
                borderRadius={12}
                p="$3"
                alignItems="center"
                mb="$2">
                <Text color="#0A8A23" fontWeight={700} fontSize={16}>
                  {meal.name}
                </Text>
              </XStack>
            ))}
          </YStack>
        </Animated.ScrollView>
      </SafeAreaView>
    </View>
  );
}
