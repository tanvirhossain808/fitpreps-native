import { useRef, useState, useEffect, useCallback, useLayoutEffect } from 'react';
import {
  StatusBar as RNStatusBar,
  Platform,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import { styled, H5, Text, View, XStack, YStack, Button, Theme } from 'tamagui';
import { Ionicons } from '@expo/vector-icons';
import TopSearchbar from '~/src/components/shared/TopSearchbar';
import Sortby from '~/src/components/shared/Sortby';
import { cookdFoodCategories, foodOfItems, foodSortByOptions } from '~/src/constant';
import SelectedFoodCategories from '~/src/components/shared/SelectedFoodCategories';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import FilterModal from '~/src/components/modal/Filter';
import ProductLists from '~/src/components/ProductWithotuSub/ProductLists';
import { useSharedValue, withTiming } from 'react-native-reanimated';

// Styled Components
const Container = styled(View, {
  flex: 1,
  backgroundColor: '$background',
});

const Header = styled(View, {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 10,
  backgroundColor: '$background',
});

const Content = styled(View, {
  flex: 1,
});

const FilterButton = styled(Button, {
  backgroundColor: 'transparent',
  pressStyle: { opacity: 0.8 },
  padding: 0,
  margin: 0,
  height: 'auto',
});

const SortButton = styled(Button, {
  backgroundColor: 'transparent',
  pressStyle: { opacity: 0.8 },
  padding: 0,
  margin: 0,
  height: 'auto',
  position: 'relative',
});

const SortDropdown = styled(View, {
  position: 'absolute',
  top: '100%',
  left: 0,
  right: 0,
  zIndex: 100,
});

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

const HEADER_HEIGHT = 320;

export default function Home() {
  const [sort, setSort] = useState<null | string>(null);
  const [showSort, setShowSort] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<string[]>([]);
  const navigation = useNavigation();
  const { product } = useLocalSearchParams();
  const scrollOffset = useRef(0);
  const SCROLL_THRESHOLD = 10;
  const tabBarTranslateY = useSharedValue(0);

  const hideTabBar = useCallback(() => {
    tabBarTranslateY.value = withTiming(100, { duration: 200 });
  }, []);

  const showTabBar = useCallback(() => {
    tabBarTranslateY.value = withTiming(0, { duration: 200 });
  }, []);

  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const diff = currentOffset - scrollOffset.current;

    if (Math.abs(diff) > SCROLL_THRESHOLD) {
      if (diff > 0) {
        hideTabBar();
      } else {
        showTabBar();
      }
    }

    scrollOffset.current = currentOffset;
  }, []);

  // Update tab bar style
  useEffect(() => {
    navigation.setOptions({
      tabBarStyle: () => ({
        ...defaultTabBarStyle,
        display: filterOpen ? 'none' : 'flex',
        transform: [{ translateY: tabBarTranslateY.value }],
      }),
    });
  }, [filterOpen, navigation, tabBarTranslateY]);

  // Status bar effect
  useLayoutEffect(() => {
    RNStatusBar.setBackgroundColor('#0A8A23');
    return () => {
      RNStatusBar.setBarStyle('dark-content', true);
      if (Platform.OS === 'android') {
        RNStatusBar.setBackgroundColor('white', true);
      }
    };
  }, []);

  return (
    <Theme name="light">
      <Container onTouchStart={() => setShowSort(false)}>
        {/* Header */}
        <Header>
          <YStack>
            <XStack bg="$green9" borderBottomStartRadius={20} borderBottomEndRadius={20}>
              <TopSearchbar placeholder="Search your meal here" />
            </XStack>

            <XStack px="$4" py="$5">
              <H5 color="$gray12" fontWeight="700" size="$4">
                What are you looking for today?
              </H5>
            </XStack>

            <SelectedFoodCategories cookdFoodCategories={cookdFoodCategories} />

            <XStack px="$4" mt="$5">
              <XStack
                justifyContent="space-between"
                py="$3"
                borderTopWidth={0.5}
                borderTopColor="$gray5"
                borderBottomWidth={0.5}
                borderBottomColor="$gray5"
                width="100%">
                <XStack alignItems="center" space="$3">
                  <FilterButton
                    onPress={() => setFilterOpen(true)}
                    icon={<Ionicons name="filter-outline" size={16} color="#25272C" />}>
                    <Text color="$gray12" fontSize={12}>
                      Filters
                    </Text>
                  </FilterButton>

                  <SortButton
                    onPress={() => setShowSort(!showSort)}
                    iconAfter={
                      <Ionicons
                        name={showSort ? 'chevron-up' : 'chevron-down'}
                        size={16}
                        color="#25272C"
                      />
                    }>
                    <Text color="$gray12" fontSize={12}>
                      {sort || 'Sort By'}
                    </Text>
                    {showSort && (
                      <SortDropdown>
                        <Sortby
                          data={foodSortByOptions}
                          setShowSort={setShowSort}
                          sort={sort}
                          setSort={setSort}
                        />
                      </SortDropdown>
                    )}
                  </SortButton>
                </XStack>

                <Text fontSize={11} color="$gray12">
                  48 meal preps to explore
                </Text>
              </XStack>
            </XStack>
          </YStack>
        </Header>

        {/* Main Content */}
        <Content style={{ paddingTop: HEADER_HEIGHT }}>
          <ProductLists
            showsVerticalScrollIndicator={false}
            onScroll={handleScroll}
            products={foodOfItems}
          />
        </Content>

        <FilterModal
          open={filterOpen}
          setOpen={setFilterOpen}
          filters={filters}
          setFilters={setFilters}
        />
      </Container>
    </Theme>
  );
}
