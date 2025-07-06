import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import { StatusBar, setStatusBarStyle } from 'expo-status-bar';
import { Suspense, useCallback, useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { YStack } from 'tamagui';
import LoadingSpinner from '~/components/shared/Loading';
import ProductHeader from '~/components/shared/ProductHeader';
import ProductLists from '~/components/shared/ProductLists';
import GymProductsForWomen from '~/components/shared/shop/GymProductsForWomen';
import ShopByCategoryList from '~/components/shop/ShopByCategoryList';
import { foodOfItems, suppdProductCategories } from '~/constant';

import { activeStatsBarInfo } from '~/helper';
import { FoodOfItem, fueld, SliderItem, suppd } from '~/types/type';

export const unstable_settings = {
  lazy: true,
};
export default function Shop() {
  const { product = 'suppd' } = useLocalSearchParams();
  const [selectCategory, setSelectCategory] = useState<string>(
    product === 'suppd' ? 'Supplements' : 'Gym Wear'
  );
  const [productType, setProductType] = useState<string | null>(product as string);
  const [gender, setGender] = useState<'male' | 'female' | null>(null);
  const insets = useSafeAreaInsets();
  useFocusEffect(
    useCallback(() => {
      setStatusBarStyle(product === 'suppd' ? 'dark' : 'light');
      setSelectCategory(() => (product === 'suppd' ? 'Supplements' : 'Gym Wear'));
      return () => {
        setSelectCategory(() => 'Supplements');
        setProductType(() => 'suppd');
        setGender(null);
      };
    }, [product])
  );
  useEffect(() => {
    setStatusBarStyle(selectCategory === 'Supplements' ? 'dark' : 'light');
    if (selectCategory === 'Gym Wear') {
      setProductType(() => 'shaped');
    } else if (selectCategory === 'Supplements') {
      setProductType(() => 'suppd');
    }
  }, [productType, selectCategory, product]);
  const statusBarInfo = activeStatsBarInfo(selectCategory === 'Supplements' ? 'suppd' : 'shaped');

  return (
    <YStack flex={1}>
      <StatusBar style="dark" />
      <Suspense fallback={<LoadingSpinner color={statusBarInfo?.color as string} />}>
        <YStack flex={1} bg="white">
          <ProductHeader
            gender={gender}
            setGender={setGender}
            selectCategory={selectCategory as string}
            setSelectCategory={setSelectCategory}
            productType={productType as string}
            activeStatsBarInfo={statusBarInfo as { name: string; color: string } | null}
            insets={insets}
          />
          {selectCategory !== 'Gym Wear' && gender === null ? (
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
            <YStack flex={1}>
              {selectCategory === 'Gym Wear' && gender === null && (
                <ShopByCategoryList setGender={setGender} />
              )}
              {selectCategory === 'Gym Wear' && gender === 'female' && (
                <YStack flex={1}>
                  <GymProductsForWomen />
                </YStack>
              )}
            </YStack>
          )}
        </YStack>
      </Suspense>
    </YStack>
  );
}
