import { FlatList } from 'react-native';
import { Productsmakelijke, SliderItem } from '~/src/types/type';
import { useGetSmakelijkeProductsQuery } from '~/src/store/apiSlices/products/smakelijke';
import { useTabBarVisibility } from '~/src/hooks/useTabBarVisibility';
import { lazy, useCallback, useEffect } from 'react';
import LoadingSpinner from './Loading';
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
  const { data, isLoading, error, ...rest } = useGetSmakelijkeProductsQuery(null);

  const { handleScroll } = useTabBarVisibility();
  const renderItem = useCallback(
    ({ item }: { item: (Productsmakelijke | SliderItem)[] }) => {
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
      initialNumToRender={10}
      windowSize={10}
      maxToRenderPerBatch={10}
      updateCellsBatchingPeriod={50}
      data={data || []}
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
