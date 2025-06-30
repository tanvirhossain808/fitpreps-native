import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from 'tamagui';
import { foodOfItems, fueldFoodOfItems, statusBarColor } from '~/constant';
import { setStatusBarStyle, StatusBar } from 'expo-status-bar';
import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import { FoodOfItem, fueld, SliderItem } from '~/types/type';
import ProductHeader from '~/components/shared/ProductHeader';
import { lazy, Suspense } from 'react';
import { activeStatsBarInfo } from '~/helper';
import LoadingSpinner from '~/components/shared/Loading';
// Change the import to use lazy
const ProductLists = lazy(() => import('~/components/shared/ProductLists'));
// export const unstable_settings = {
//   lazy: true,
// };

export default function Home() {
  const insets = useSafeAreaInsets();
  const { product = 'cookd' } = useLocalSearchParams();
  const statusBarInfo = activeStatsBarInfo(product as string);
  useFocusEffect(() => {
    setStatusBarStyle('light', true);
  });
  return (
    <>
      <StatusBar style="light" />

      <View style={{ flex: 1 }}>
        <ProductHeader
          productType={product as string}
          activeStatsBarInfo={statusBarInfo as { name: string; color: string } | null}
          insets={insets}
        />

        <View style={styles.contentContainer}>
          <View style={{ flex: 1 }} zIndex={0}>
            <Suspense
              fallback={
                <LoadingSpinner color={statusBarColor[product as keyof typeof statusBarColor]} />
              }>
              <ProductLists
                productType={product as string}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                products={
                  product === 'cookd'
                    ? (foodOfItems as (FoodOfItem | SliderItem | fueld)[])
                    : (fueldFoodOfItems as (FoodOfItem | SliderItem | fueld)[])
                }
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
