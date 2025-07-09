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
  // const category = useSelector((state: RootState) => state.filter.category);
  // console.log(category, 'category');
  const { data, isLoading, error, refetch } = useGetSmakelijkeProductsQuery(null);

  const { filteredProducts, filters, updateSortBy } = useProductFilters(data);
  // console.log(filteredProducts, 'filteredProducts');
  // console.log(filteredProducts, 'filter');
  // console.log(filteredProducts, 'filteredProducts');
  // console.log(filteredProducts, 'filters');
  // console.log(filteredProducts, 'fil');
  const renderItem = useCallback(
    ({ item }: { item: (Productsmakelijke | SliderItem)[] }) => {
      // return <View />;
      return <ProductsmakelijkeLists item={item} productType={productType} />;
    },
    [productType]
  );
  if (isLoading) {
    return <LoadingSpinner color="white" />;
  }
  // const isReady = products && products.length > 0;
  // if (!isReady) {
  //   return <LoadingSpinner color="white" />;
  // }
  return (
    <FlatList
      initialNumToRender={15}
      windowSize={15}
      maxToRenderPerBatch={15}
      updateCellsBatchingPeriod={50}
      data={filteredProducts || []}
      keyExtractor={(item, idx) => item[0]._id}
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
