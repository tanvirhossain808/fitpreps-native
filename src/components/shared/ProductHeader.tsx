import { Dispatch, lazy } from 'react';
import { Text, View, XStack } from 'tamagui';
import { selectSuppdProductType } from '~/src/helper';
import ShopSwitchingHeader from './shop/ShopSwitchingHeader';
import ShopWomenHeader from './shop/ShopWomenHeader';
import SelectedFoodCategories from './SelectedFoodCategories';
import FitlerButton from './Filters/FitlerButton';
import SortButton from './Sort/SortButton';
import TopSearchbar from './TopSearchbar';

export default function ProductHeader({
  productType,
  activeStatsBarInfo,
  insets,
  selectCategory = '',
  setSelectCategory = () => {},
  gender = null,
  setGender = () => {},
}: {
  productType: string;
  selectCategory?: string;
  setSelectCategory?: Dispatch<React.SetStateAction<string>>;
  activeStatsBarInfo: { name: string; color: string } | null;
  gender?: string | null;
  setGender?: Dispatch<React.SetStateAction<'male' | 'female' | null>>;
  insets: { top: number };
}) {
  return (
    <View>
      <View>
        <XStack
          {...{
            backgroundColor: activeStatsBarInfo?.color ? activeStatsBarInfo.color : '',
            borderBottomStartRadius: 20,
            borderBottomEndRadius: 20,
            paddingTop: insets.top,
          }}>
          <TopSearchbar placeholder="Search your meal here" />
        </XStack>
        {(selectCategory === 'Supplements' || selectCategory === 'Gym Wear') && gender === null && (
          <View px={16} py={20}>
            <ShopSwitchingHeader
              setGender={setGender}
              product={productType}
              selectCategory={selectCategory}
              setSelectCategory={setSelectCategory}
            />
          </View>
        )}
        {selectCategory === 'Gym Wear' && gender === 'female' && <ShopWomenHeader />}
        {(selectCategory !== 'Gym Wear' || gender !== null) && (
          <>
            <XStack px={16} py={productType === 'suppd' || productType === 'shapped' ? 10 : 20}>
              <Text color="#25272C" fontWeight={700} fontSize={16}>
                What are you looking for today?
              </Text>
            </XStack>

            <SelectedFoodCategories
              activeStatsBarInfo={
                activeStatsBarInfo as { name: string; color: string; tentColor: string } | null
              }
              cookdFoodCategories={selectSuppdProductType(productType)}
            />

            <View px={16} mt={20}>
              <XStack
                justifyContent="space-between"
                py={12}
                borderTopWidth={0.5}
                borderTopColor="#B6BAC3"
                borderBottomWidth={0.5}
                borderBottomColor="#B6BAC3">
                <XStack alignItems="center" gap={12}>
                  <FitlerButton productType={productType as string} />
                  <SortButton />
                </XStack>
                <Text fontSize={11} color="#25272C">
                  48 meal preps to explore
                </Text>
              </XStack>
            </View>
          </>
        )}
      </View>
    </View>
  );
}
