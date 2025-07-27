import { FlatList, StyleSheet } from 'react-native';
import { Productsmakelijke, SliderItem } from '~/src/types/type';
import { useGetSmakelijkeProductsQuery } from '~/src/store/apiSlices/products/smakelijke';
import { useTabBarVisibility } from '~/src/hooks/useTabBarVisibility';
import { lazy, useCallback, useEffect, useRef } from 'react';
import LoadingSpinner from '../shared/Loading';
import useProductFilters from '~/src/hooks/useProductFilters';
import { Button, Text, YStack } from 'tamagui';
import { useDispatch } from 'react-redux';
import { resetFilters } from '~/src/store/slices/filterSlice';
import ProductFueldListsCard from './ProductFueldListsCard';
import { FlashList } from '@shopify/flash-list';

export const unstable_settings = {
  lazy: true,
};
export default function FueldProductLists({
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
  const flatListRef = useRef<FlatList>(null);
  useEffect(() => {
    if (flatListRef.current && data?.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({
          index: 0,
          animated: true,
        });
      }, 100);
    }
  }, [data]);
  //   console.log(data, 'data');
  const renderItem = useCallback(
    ({ item, index }: { item: Productsmakelijke | SliderItem; index: number }) => {
      return <ProductFueldListsCard item={item} index={index} productType={productType} />;
    },

    [productType]
  );
  return (
    // <FlatList
    //   ref={flatListRef}
    //   // ItemSeparatorComponent={() => <View h={20} />}
    //   initialNumToRender={20}
    //   windowSize={20}
    //   maxToRenderPerBatch={20}
    //   numColumns={2}
    //   ListEmptyComponent={
    //     <YStack alignItems="center" f={1} justifyContent="center">
    //       <Text fontSize={18} color="#FD4F01">
    //         No products found
    //       </Text>
    //       <Button
    //         onPress={() => {
    //           dispatch(resetFilters());
    //         }}
    //         bg="#FD4F01"
    //         color="white"
    //         mt={16}
    //         fontWeight={700}>
    //         Reset filters
    //       </Button>
    //     </YStack>
    //   }
    //   columnWrapperStyle={{ gap: 8 }}
    //   updateCellsBatchingPeriod={50}
    //   data={(data as (Productsmakelijke | SliderItem)[]) || []}
    //   keyExtractor={(item) => item?._id?.toString()}
    //   renderItem={renderItem}
    //   contentContainerStyle={[{ paddingBottom: 50 }, contentContainerStyle]}
    //   showsVerticalScrollIndicator={showsVerticalScrollIndicator}
    //   scrollEventThrottle={scrollEventThrottle}
    //   onScroll={handleScroll}
    //   style={{
    //     padding: 16,
    //   }}
    // />
    <FlashList
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={scrollEventThrottle}
      onScroll={handleScroll}
      keyExtractor={(item) => item?._id?.toString()}
      estimatedItemSize={325}
      data={data}
      // style={{ flex: 1 }}
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
    // <></>
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
