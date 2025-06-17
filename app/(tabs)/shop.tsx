import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import { StatusBar, setStatusBarStyle } from 'expo-status-bar';
import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScrollView, YStack } from 'tamagui';
import LoadingSpinner from '~/components/shared/Loading';
import ProductHeader from '~/components/shared/ProductHeader';
import ProductLists from '~/components/shared/ProductLists';
import ShopByCategoryList from '~/components/shop/ShopByCategoryList';
import { foodOfItems, fueldFoodOfItems, suppdProductCategories } from '~/constant';

import { activeStatsBarInfo } from '~/helper';
import { FoodOfItem, fueld, SliderItem, suppd } from '~/type';
export const unstable_settings = {
  lazy: true,
};
export default function Shop() {
  const { product = 'suppd' } = useLocalSearchParams();
  const [selectCategory, setSelectCategory] = useState<string>(
    product === 'suppd' ? 'Supplements' : 'Gym Wear'
  );
  const [productType, setProductType] = useState<string | null>();
  const insets = useSafeAreaInsets();
  useFocusEffect(
    useCallback(() => {
      setStatusBarStyle(product === 'suppd' ? 'dark' : 'light');
    }, [product])
  );
  useEffect(() => {
    setStatusBarStyle(selectCategory === 'Supplements' ? 'dark' : 'light');
  }, [productType, selectCategory, product]);
  const statusBarInfo = activeStatsBarInfo(selectCategory === 'Supplements' ? 'suppd' : 'shaped');

  return (
    <>
      <StatusBar style="dark" />
      <Suspense fallback={<LoadingSpinner color={statusBarInfo?.color as string} />}>
        <YStack flex={1} bg="white">
          <ProductHeader
            selectCategory={selectCategory as string}
            setSelectCategory={setSelectCategory}
            productType={product as string}
            activeStatsBarInfo={statusBarInfo as { name: string; color: string } | null}
            insets={insets}
          />
          {selectCategory !== 'Gym Wear' ? (
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
          ) : (
            <ScrollView px={16} flex={1} pb={200}>
              <ShopByCategoryList />
            </ScrollView>
          )}
        </YStack>
      </Suspense>
    </>
  );
}
