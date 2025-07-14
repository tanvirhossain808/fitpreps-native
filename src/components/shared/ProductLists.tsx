import { FlatList } from 'react-native';
import { Productsmakelijke, SliderItem } from '~/src/types/type';
import { useGetSmakelijkeProductsQuery } from '~/src/store/apiSlices/products/smakelijke';
import { useTabBarVisibility } from '~/src/hooks/useTabBarVisibility';
import { lazy, useCallback, useEffect, useRef } from 'react';
import LoadingSpinner from './Loading';
import useProductFilters from '~/src/hooks/useProductFilters';

const ProductsmakelijkeLists = lazy(() => import('./ProductsmakelijkeLists'));

export const unstable_settings = {
  lazy: true,
};
export default function ProductLists({
  productType = 'cookd',
  contentContainerStyle,
  showsVerticalScrollIndicator,
  scrollEventThrottle,
}: {
  // products: (FoodOrSliderItem | fueldOrSliderItem | suppd)[];
  contentContainerStyle?: any;
  showsVerticalScrollIndicator?: boolean;
  scrollEventThrottle?: number;
  productType?: string;
}) {
  const { handleScroll } = useTabBarVisibility();

  const { data, isLoading, error, refetch } = useGetSmakelijkeProductsQuery(null, {
    refetchOnMountOrArgChange: true,
  });

  const { filteredProducts } = useProductFilters(data);
  const flatListRef = useRef<FlatList>(null);
  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index: 0,
        animated: true,
      });
    }
  }, [filteredProducts]);

  const renderItem = useCallback(
    ({ item, index }: { item: Productsmakelijke | SliderItem; index: number }) => {
      // return <View />;j
      return <ProductsmakelijkeLists item={item} index={index} productType={productType} />;
      // return <View />;
    },
    [productType]
  );
  if (isLoading) {
    return <LoadingSpinner color="white" />;
  }

  return (
    <FlatList
      ref={flatListRef}
      // ItemSeparatorComponent={() => <View h={20} />}
      initialNumToRender={20}
      windowSize={20}
      maxToRenderPerBatch={20}
      numColumns={2}
      columnWrapperStyle={{ gap: 8 }}
      updateCellsBatchingPeriod={50}
      data={(filteredProducts as (Productsmakelijke | SliderItem)[]) || []}
      keyExtractor={(item) => item?._id?.toString()}
      renderItem={renderItem}
      contentContainerStyle={[{ paddingBottom: 50 }, contentContainerStyle]}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      scrollEventThrottle={scrollEventThrottle}
      onScroll={handleScroll}
      style={{
        padding: 16,
      }}
    />
  );
}
