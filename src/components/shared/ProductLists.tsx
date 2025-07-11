import { FlatList } from 'react-native';
import { Productsmakelijke, SliderItem } from '~/src/types/type';
import { useGetSmakelijkeProductsQuery } from '~/src/store/apiSlices/products/smakelijke';
import { useTabBarVisibility } from '~/src/hooks/useTabBarVisibility';
import { lazy, useCallback, useEffect } from 'react';
import LoadingSpinner from './Loading';
import useProductFilters from '~/src/hooks/useProductFilters';
import { useSelector } from 'react-redux';
import { RootState } from '~/src/store';
import { View } from 'tamagui';
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

  const { data, isLoading, error, refetch } = useGetSmakelijkeProductsQuery(null);

  const { filteredProducts, filters, updateSortBy } = useProductFilters(data);

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
      // ItemSeparatorComponent={() => <View h={20} />}
      initialNumToRender={20}
      windowSize={20}
      maxToRenderPerBatch={20}
      numColumns={2}
      columnWrapperStyle={{ gap: 8 }}
      updateCellsBatchingPeriod={50}
      data={(filteredProducts as (Productsmakelijke | SliderItem)[]) || []}
      keyExtractor={(item, idx) => idx.toString()}
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
