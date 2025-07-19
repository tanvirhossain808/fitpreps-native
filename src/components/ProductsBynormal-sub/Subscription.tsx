import { View } from 'tamagui';
import ProductHeader from '../shared/ProductHeader';
import LoadingSpinner from '../shared/Loading';
import { lazy, Suspense } from 'react';
import useProductFilters from '~/src/hooks/useProductFilters';
import { useGetProductsQuery } from '~/src/store/apiSlices/products/productsSlice';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { activeStatsBarInfo } from '~/src/helper';
import { statusBarColor } from '~/src/constant';
import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
const SubProductList = lazy(() => import('./SubProductLists'));

export default function Subscription({
  subscription,
  product,
}: {
  subscription: boolean;
  product: string;
}) {
  const { data } = useGetProductsQuery(null);
  const { filteredProducts } = useProductFilters(data?.subscribedProducts, product);
  const insets = useSafeAreaInsets();
  const statusBarInfo = activeStatsBarInfo(product as string);
  return (
    <>
      <StatusBar style="light" />
      <View style={{ flex: 1 }}>
        <ProductHeader
          data={filteredProducts}
          productType={'fueld' as string}
          activeStatsBarInfo={statusBarInfo as { name: string; color: string } | null}
          insets={insets}
          subscription={subscription}
        />
        <View style={styles.contentContainer}>
          <View style={{ flex: 1 }} zIndex={0}>
            <Suspense
              fallback={
                <LoadingSpinner color={statusBarColor['fueld' as keyof typeof statusBarColor]} />
              }>
              <SubProductList
                productType={'fueld' as string}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                data={filteredProducts}
              />
            </Suspense>
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
