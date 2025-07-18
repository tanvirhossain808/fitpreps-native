import { View } from 'tamagui';
import ProductHeader from '../shared/ProductHeader';
import LoadingSpinner from '../shared/Loading';
import { lazy, Suspense } from 'react';
import { useGetSmakelijkeProductsQuery } from '~/src/store/apiSlices/products/smakelijke';
import useProductFilters from '~/src/hooks/useProductFilters';
import { useGetProductsQuery } from '~/src/store/apiSlices/products/productsSlice';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { activeStatsBarInfo } from '~/src/helper';
import { statusBarColor } from '~/src/constant';
import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
const ProductLists = lazy(() => import('~/src/components/shared/ProductLists'));

export default function NOnSubscription({
  product,
  subscription,
}: {
  product: string;
  subscription: boolean;
}) {
  const { data: cookd, isLoading } = useGetSmakelijkeProductsQuery(null);
  const { data: fueld, isLoading: fueldLoading } = useGetProductsQuery(null);
  const { filteredProducts } = useProductFilters(
    product === 'fueld' ? fueld?.nonSubscribedProducts || [] : cookd,
    product as string
  );
  const insets = useSafeAreaInsets();
  const statusBarInfo = activeStatsBarInfo(product as string);
  return (
    <>
      <StatusBar style="light" />
      <View style={{ flex: 1 }}>
        <ProductHeader
          data={filteredProducts}
          productType={product as string}
          activeStatsBarInfo={statusBarInfo as { name: string; color: string } | null}
          insets={insets}
        />

        <View style={styles.contentContainer}>
          <View style={{ flex: 1 }} zIndex={0}>
            {isLoading || fueldLoading ? (
              <LoadingSpinner color={statusBarColor[product as keyof typeof statusBarColor]} />
            ) : (
              <Suspense
                fallback={
                  <LoadingSpinner color={statusBarColor[product as keyof typeof statusBarColor]} />
                }>
                <ProductLists
                  productType={product as string}
                  showsVerticalScrollIndicator={false}
                  scrollEventThrottle={16}
                  data={filteredProducts}
                />
              </Suspense>
            )}
          </View>
        </View>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  sortDropdownContainer: {
    ...StyleSheet.absoluteFillObject,
    pointerEvents: 'box-none',
  },
  sortBackdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  contentContainer: {
    flex: 1,
  },
});
