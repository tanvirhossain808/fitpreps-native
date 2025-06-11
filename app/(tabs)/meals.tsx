import React, { useRef, useState, useEffect } from 'react';
import {
  Animated,
  StatusBar as RNStatusBar,
  Platform,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { H3, H5, Image, Input, Text, View, XStack, YStack } from 'tamagui';
import TopSearchbar from '~/components/shared/TopSearchbar';
import Ionicons from '@expo/vector-icons/Ionicons';
import Sortby from '~/components/shared/Sortby';
import { cookdFoodCategories, foodOfItems, foodSortByOptions } from '~/constant';
import SelectedFoodCategories from '~/components/shared/SelectedFoodCategories';
import Entypo from '@expo/vector-icons/Entypo';
import { router, useNavigation } from 'expo-router';
import FilterModal from '~/components/modal/Filter';
import ProductLists from '~/components/shared/ProductLists';

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

export default function Home() {
  const [showCompact, setShowCompact] = useState(false);
  const [sort, setSort] = useState<null | string>(null);
  const [showSort, setShowSort] = useState(false);
  const [selectFoodCategory, setSelectedFoodCategory] = useState<string | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<string[]>([]);
  const scrollY = useRef(new Animated.Value(0)).current;
  const lastScrollY = useRef(0);
  const animation = useRef(new Animated.Value(0)).current;
  const HEADER_HEIGHT = 160;
  const COMPACT_BAR_HEIGHT = 140;
  const navigation = useNavigation();
  // Animate between header and compact bar when showCompact changes
  const tabBarTranslateY = useRef(new Animated.Value(0)).current;
  const scrollOffset = useRef(0);
  const SCROLL_THRESHOLD = 10;
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
  // Status bar color
  useEffect(() => {
    RNStatusBar.setBarStyle(showCompact ? 'dark-content' : 'light-content', true);
    if (Platform.OS === 'android') {
      RNStatusBar.setBackgroundColor(showCompact ? 'white' : '#0A8A23', true);
    }
  }, [showCompact]);
  useEffect(() => {
    navigation.setOptions({
      tabBarStyle: {
        ...defaultTabBarStyle,
        display: filterOpen ? 'none' : 'flex',
      },
    });
  }, [filterOpen]);
  useEffect(() => {
    Animated.timing(animation, {
      toValue: showCompact ? 1 : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [showCompact, animation]);
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
  const combinedOnScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    // Call both handlers with the event
    handleScroll(event);
    onScroll(event);
  };
  return (
    <View flex={1} bg="white" onTouchStart={() => setShowSort(false)}>
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
          <SelectedFoodCategories
            cookdFoodCategories={cookdFoodCategories}
            selectFoodCategory={selectFoodCategory}
            setSelectedFoodCategory={setSelectedFoodCategory}
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
                  style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 4 }}
                  onPress={() => setFilterOpen(true)}>
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
                    <View style={StyleSheet.absoluteFillObject} pointerEvents="box-none">
                      {/* Backdrop */}
                      <TouchableOpacity
                        style={StyleSheet.absoluteFillObject}
                        activeOpacity={1}
                        onPress={() => setShowSort(false)}
                      />
                      {/* Dropdown */}
                      <Sortby
                        data={foodSortByOptions}
                        setShowSort={setShowSort}
                        sort={sort}
                        setSort={setSort}
                      />
                    </View>
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
          paddingTop: 16,
          minHeight: COMPACT_BAR_HEIGHT,
          backgroundColor: 'white',
          zIndex: 11,
          borderBottomColor: '#eee',
          borderBottomWidth: 1,
          opacity: compactBarOpacity,
          transform: [{ translateY: compactBarTranslateY }],
        }}
        pointerEvents={showCompact ? 'auto' : 'none'}>
        <SafeAreaView>
          <YStack gap={20}>
            <XStack alignItems="center" gap={12} px={16}>
              <Entypo name="chevron-left" size={24} color="black" onPress={() => router.back()} />
              <XStack alignItems="center" position="relative" flex={1}>
                <Input
                  flex={1}
                  placeholder="Search your meal here"
                  placeholderTextColor="#717680"
                  fontSize={14}
                  pr={40}
                  backgroundColor="white"
                  borderRadius={8}
                />
                <TouchableOpacity
                  style={{ display: 'flex', alignItems: 'center', width: 20, height: 20 }}>
                  <Ionicons
                    name="search"
                    size={20}
                    color="black"
                    style={{
                      position: 'absolute',
                      right: 30,
                      pointerEvents: 'none',
                    }}
                  />
                </TouchableOpacity>
              </XStack>
            </XStack>
            <SelectedFoodCategories
              cookdFoodCategories={cookdFoodCategories}
              selectFoodCategory={selectFoodCategory}
              setSelectedFoodCategory={setSelectedFoodCategory}
            />
            <XStack
              justifyContent="space-between"
              py={12}
              borderTopWidth={0.5}
              borderTopColor="#B6BAC3"
              px={16}
              borderBottomWidth={0.5}
              borderBottomColor="#B6BAC3">
              <XStack alignItems="center" gap={12}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 4 }}
                  onPress={() => setFilterOpen(true)}>
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
          </YStack>
        </SafeAreaView>
      </Animated.View>

      {/* Main Content */}
      <SafeAreaView style={{ flex: 1, paddingTop: HEADER_HEIGHT }}>
        <Animated.View style={{ flex: 1 }}>
          {/* <YStack pt={140}> */}
          <ProductLists onScroll={combinedOnScroll} products={foodOfItems} />
          {/* </YStack> */}
        </Animated.View>
      </SafeAreaView>
      <FilterModal
        open={filterOpen}
        setOpen={setFilterOpen}
        filters={filters}
        setFilters={setFilters}
      />
    </View>
  );
}
