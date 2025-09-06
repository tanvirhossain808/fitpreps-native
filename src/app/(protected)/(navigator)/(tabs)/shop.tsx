import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import { StatusBar, setStatusBarStyle } from 'expo-status-bar';
import { Suspense, useCallback, useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { YStack } from 'tamagui';
import LoadingSpinner from '~/src/components/shared/Loading';
import ProductHeader from '~/src/components/shared/ProductHeader';
import ProductLists from '~/src/components/ProductWithotuSub/ProductLists';
import DynamicProductLists from '~/src/components/ProductWithotuSub/DynamicProductLists';
import GymProductsForWomen from '~/src/components/shared/shop/GymProductsForWomen';
import DynamicGymProductsForWomen from '~/src/components/shared/shop/DynamicGymProductsForWomen';
import ShopByCategoryList from '~/src/components/shop/ShopByCategoryList';
import { suppdProductCategories } from '~/src/constant';

import { activeStatsBarInfo } from '~/src/helper';
import useProductFilters from '~/src/hooks/useProductFilters';
import useGymwearFilters from '~/src/hooks/useGymwearFilters';
import { useGetSupplementsQuery } from '~/src/store/apiSlices/products/supplementsSlice';
import { useGetGymwearQuery } from '~/src/store/apiSlices/products/gymwearSlice';
import { FoodOfItem, fueld, SliderItem, suppd } from '~/src/types/type';

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
  const { data, isLoading } = useGetSupplementsQuery(null);
  const { data: gymwearData, isLoading: isGymwearLoading } = useGetGymwearQuery(undefined);
  const { filteredProducts } = useProductFilters(data, productType as string);
  const { filteredProducts: filteredGymwearProducts } = useGymwearFilters(gymwearData || []);
  
  // Debug logging
  console.log('Shop - State:', {
    selectCategory,
    productType,
    gender,
    product,
    shouldShowGymwear: selectCategory === 'Gym Wear',
    shouldShowDynamicGymwear: selectCategory === 'Gym Wear' && (gender === 'female' || gender === 'male')
  });
  return (
    <YStack flex={1}>
      <StatusBar style="dark" />
      <YStack flex={1} bg="white">
        <ProductHeader
          data={selectCategory === 'Gym Wear' ? filteredGymwearProducts : filteredProducts}
          gender={gender}
          setGender={setGender}
          selectCategory={selectCategory as string}
          setSelectCategory={setSelectCategory}
          productType={productType as string}
          activeStatsBarInfo={
            { ...statusBarInfo, tentColor: '#FD4F01' } as { name: string; color: string } | null
          }
          insets={insets}
        />
        {(isLoading || (selectCategory === 'Gym Wear' && isGymwearLoading)) ? (
          <LoadingSpinner color={statusBarInfo?.color as string} />
        ) : (
          <>
            {selectCategory !== 'Gym Wear' && gender === null ? (
              <DynamicProductLists
                isLoading={isLoading}
                data={filteredProducts}
                productType={product as string}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
              />
            ) : (
              <YStack flex={1}>
                {selectCategory === 'Gym Wear' && gender === null && (
                  <ShopByCategoryList setGender={setGender} />
                )}
                {selectCategory === 'Gym Wear' && gender === 'female' && (
                  <YStack flex={1}>
                    <DynamicGymProductsForWomen 
                      data={filteredGymwearProducts}
                      isLoading={isGymwearLoading}
                    />
                  </YStack>
                )}
                {selectCategory === 'Gym Wear' && gender === 'male' && (
                  <YStack flex={1}>
                    <DynamicGymProductsForWomen 
                      data={filteredGymwearProducts}
                      isLoading={isGymwearLoading}
                    />
                  </YStack>
                )}
              </YStack>
            )}
          </>
        )}
      </YStack>
    </YStack>
  );
}
