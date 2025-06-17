import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from 'tamagui';
import ProductLists from '~/components/shared/ProductLists';
import { foodOfItems, fueldFoodOfItems, statusBarColor } from '~/constant';
import { setStatusBarStyle, StatusBar } from 'expo-status-bar';
import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import { FoodOfItem, fueld, SliderItem } from '~/type';
import ProductHeader from '~/components/shared/ProductHeader';
import { Suspense } from 'react';
import { activeStatsBarInfo } from '~/helper';
import LoadingSpinner from '~/components/shared/Loading';

export const unstable_settings = {
  lazy: true,
};

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
      <Suspense
        fallback={
          <LoadingSpinner color={statusBarColor[product as keyof typeof statusBarColor]} />
        }>
        <View style={{ flex: 1 }}>
          <ProductHeader
            productType={product as string}
            activeStatsBarInfo={statusBarInfo as { name: string; color: string } | null}
            insets={insets}
          />

          <View style={styles.contentContainer}>
            <View style={{ flex: 1 }} zIndex={0}>
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
            </View>
          </View>
        </View>
      </Suspense>
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
