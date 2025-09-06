import { FlatList, StyleSheet } from 'react-native';
import { Productsmakelijke, SliderItem, GymwearProduct } from '~/src/types/type';
import { useGetSmakelijkeProductsQuery } from '~/src/store/apiSlices/products/smakelijke';
import { useGetGymwearQuery } from '~/src/store/apiSlices/products/gymwearSlice';
import { useTabBarVisibility } from '~/src/hooks/useTabBarVisibility';
import React, { lazy, useCallback, useEffect, useRef } from 'react';
import LoadingSpinner from '../shared/Loading';
import useProductFilters from '~/src/hooks/useProductFilters';
import { Button, Text, YStack } from 'tamagui';
import { useDispatch } from 'react-redux';
import { resetFilters } from '~/src/store/slices/filterSlice';
import ProductsmakelijkeLists from '../shared/ProductsmakelijkeLists';
import { AnimatedFlashList, FlashList, FlashListRef, MasonryFlashList } from '@shopify/flash-list';

export const unstable_settings = {
  lazy: true,
};

export default function DynamicProductLists({
  productType = 'cookd',
  contentContainerStyle,
  showsVerticalScrollIndicator,
  scrollEventThrottle,
  isLoading,
  data,
}: {
  contentContainerStyle?: any;
  showsVerticalScrollIndicator?: boolean;
  scrollEventThrottle?: number;
  productType?: string;
  isLoading?: boolean;
  data: any;
}) {
  const { handleScroll } = useTabBarVisibility();
  const dispatch = useDispatch();
  const flatListRef = useRef<FlatList>(null);
  
  // Get gymwear data if productType is 'shaped' or 'gymwear'
  const { data: gymwearData, isLoading: gymwearLoading } = useGetGymwearQuery(
    undefined,
    { skip: !['shaped', 'gymwear'].includes(productType) }
  );

  // Determine which data to use
  const finalData = React.useMemo(() => {
    if (['shaped', 'gymwear'].includes(productType)) {
      return gymwearData || [];
    }
    return data || [];
  }, [productType, data, gymwearData]);

  const finalIsLoading = React.useMemo(() => {
    if (['shaped', 'gymwear'].includes(productType)) {
      return gymwearLoading;
    }
    return isLoading;
  }, [productType, isLoading, gymwearLoading]);

  useEffect(() => {
    if (flatListRef.current && finalData?.length > 0) {
      const timer = setTimeout(() => {
        flatListRef.current?.scrollToIndex({
          index: 0,
          animated: true,
          viewPosition: 0,
        });
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [finalData]);

  const renderItem = useCallback(
    ({ item, index }: { item: Productsmakelijke | SliderItem | GymwearProduct; index: number }) => {
      return <ProductsmakelijkeLists item={item} index={index} productType={productType} />;
    },
    [productType]
  );

  return (
    <FlashList
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={scrollEventThrottle}
      onScroll={handleScroll}
      keyExtractor={(item) => item?._id?.toString()}
      estimatedItemSize={325}
      data={finalData}
      ref={flatListRef as any}
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
