import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from 'tamagui';
import { statusBarColor } from '~/src/constant';
import { setStatusBarStyle, StatusBar } from 'expo-status-bar';
import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import ProductHeader from '~/src/components/shared/ProductHeader';
import { lazy, Suspense } from 'react';
import { activeStatsBarInfo } from '~/src/helper';
import LoadingSpinner from '~/src/components/shared/Loading';
import { useGetSmakelijkeProductsQuery } from '~/src/store/apiSlices/products/smakelijke';
import useProductFilters from '~/src/hooks/useProductFilters';
import { useGetProductsQuery } from '~/src/store/apiSlices/products/productsSlice';
const ProductLists = lazy(() => import('~/src/components/ProductWithotuSub/ProductLists'));
export default function Home() {
  const insets = useSafeAreaInsets();
  const { product = 'cookd' } = useLocalSearchParams();
  const statusBarInfo = activeStatsBarInfo(product as string);
  useFocusEffect(() => {
    setStatusBarStyle('light', true);
  });
  const { data: cookd, isLoading } = useGetSmakelijkeProductsQuery(null);
  const { data: fueld, isLoading: fueldLoading } = useGetProductsQuery(null);
  // const { filteredProducts } = useProductFilters(
  //   product === 'fueld' ? fueld : cookd,
  //   product as string
  // );
  const { filteredProducts } = useProductFilters(
    // @ts-ignore
    product === 'fueld' ? fueld : cookd,
    product as string
  );
  console.log(fueld, 'data');
  // console.log(fueld, 'fueld');
  // console.log(filteredProducts, 'filteredProducts');
  // useEffect(() => {
  //   async function registerUser() {
  //     const { data, error } = await login({
  //       email: 't@t.com',
  //       password: 'password',
  //     });
  //     console.log(data, 'yo data');
  //     if (data) {
  //       dispatch(setUser(data));
  //     }
  //   }
  //   registerUser();
  // }, [login]);
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
                  // products={
                  //   product === 'cookd'
                  //     ? (foodOfItems as (FoodOfItem | SliderItem | fueld)[])
                  //     : (fueldFoodOfItems as (FoodOfItem | SliderItem | fueld)[])
                  // }
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
