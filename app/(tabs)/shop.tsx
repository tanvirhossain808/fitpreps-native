import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import { StatusBar, setStatusBarStyle } from 'expo-status-bar';
import { lazy, Suspense, useCallback, useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { YStack } from 'tamagui';
import LoadingSpinner from '~/components/shared/Loading';
import ProductHeader from '~/components/shared/ProductHeader';
import ProductLists from '~/components/shared/ProductLists';
import { foodOfItems, fueldFoodOfItems, suppdProductCategories } from '~/constant';

import { activeStatsBarInfo } from '~/helper';
import { FoodOfItem, fueld, SliderItem, suppd } from '~/type';
export const unstable_settings = {
  lazy: true,
};
export default function Shop() {
  const { product = 'suppd' } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const statusBarInfo = activeStatsBarInfo(product as string);
  useFocusEffect(() => {
    setStatusBarStyle('dark', true);
  });
  return (
    <>
      <StatusBar style="dark" />
      <Suspense fallback={<LoadingSpinner color={statusBarInfo?.color as string} />}>
        <YStack flex={1} bg="white">
          <ProductHeader
            productType={product as string}
            activeStatsBarInfo={statusBarInfo as { name: string; color: string } | null}
            insets={insets}
          />
          <ProductLists
            productType={product as string}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            products={
              product === 'cookd'
                ? (foodOfItems as (FoodOfItem | SliderItem | fueld)[])
                : (suppdProductCategories as (FoodOfItem | SliderItem | fueld | suppd)[])
            }
          />
        </YStack>
      </Suspense>
    </>
  );
}
