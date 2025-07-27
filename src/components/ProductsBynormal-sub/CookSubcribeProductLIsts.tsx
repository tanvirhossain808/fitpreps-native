import { FlatList, StyleSheet } from 'react-native';
import { Productsmakelijke, SliderItem } from '~/src/types/type';
import { useTabBarVisibility } from '~/src/hooks/useTabBarVisibility';
import { lazy, useCallback, useEffect, useRef } from 'react';
import LoadingSpinner from '../shared/Loading';
import { Button, Text, YStack } from 'tamagui';
import { useDispatch } from 'react-redux';
import { resetFilters } from '~/src/store/slices/filterSlice';
import { FlashList } from '@shopify/flash-list';
import ProductsmakelijkeListsSubLists from './ProductsmakelijkeListsSubLists';

// const ProductsmakelijkeListsSubLists = lazy(() => import('./ProductsmakelijkeListsSubLists'));
export const unstable_settings = {
  lazy: true,
};
export default function CookSubcribeProductLIsts({
  productType = 'cookd',
  contentContainerStyle,
  showsVerticalScrollIndicator,
  scrollEventThrottle,
  isLoading,
  data,
}: {
  // products: (FoodOrSliderItem | fueldOrSliderItem | suppd)[];
  contentContainerStyle?: any;
  showsVerticalScrollIndicator?: boolean;
  scrollEventThrottle?: number;
  productType?: string;
  isLoading?: boolean;
  data: any;
}) {
  const { handleScroll } = useTabBarVisibility();
  // console.log(productType, 'type');
  const dispatch = useDispatch();
  // const { filteredProducts } = useProductFilters(data2);
  // console.log('filt', filteredProducts);
  const flatListRef = useRef<FlashList<Productsmakelijke>>(null);
  // useEffect(() => {
  //   if (flatListRef.current && data?.length > 0) {

  //     flatListRef.current.scrollToIndex({
  //       index: 0,
  //       animated: true,
  //     });
  //   }
  // }, [data]);
  useEffect(() => {
    if (flatListRef.current && data?.length > 0) {
      const timer = setTimeout(() => {
        flatListRef.current?.scrollToIndex({
          index: 0,
          animated: true,
          viewPosition: 0, // Ensures item is at the very top
        });
      }, 100); // Slightly longer delay to be safe
      return () => clearTimeout(timer);
    }
  }, [data]);
  //   console.log(data, 'data');
  const renderItem = useCallback(
    ({ item, index }: { item: Productsmakelijke | SliderItem; index: number }) => {
      return <ProductsmakelijkeListsSubLists item={item} index={index} productType={productType} />;
    },

    [productType]
  );
  return (
    <FlashList
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={scrollEventThrottle}
      onScroll={handleScroll}
      estimatedItemSize={325}
      data={data}
      ref={flatListRef}
      renderItem={renderItem}
      numColumns={2}
      contentContainerStyle={{ ...styles.flashList }}
      ListEmptyComponent={
        <YStack alignItems="center" f={1} justifyContent="center">
          <Text fontSize={18} color="#FD4F01">
            No products found
          </Text>
          <Button
            onPress={() => {
              dispatch(resetFilters());
            }}
            bg="#FD4F01"
            color="white"
            mt={16}
            fontWeight={700}>
            Reset filters
          </Button>
        </YStack>
      }
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  flashList: {
    paddingBottom: 10,
    paddingTop: 20,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
});
