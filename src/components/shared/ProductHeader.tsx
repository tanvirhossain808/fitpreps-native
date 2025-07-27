import { Dispatch } from 'react';
import { Text, View, XStack, YStack } from 'tamagui';
import { selectSuppdProductType } from '~/src/helper';
import ShopSwitchingHeader from './shop/ShopSwitchingHeader';
import ShopWomenHeader from './shop/ShopWomenHeader';
import SelectedFoodCategories from './SelectedFoodCategories';
import FitlerButton from './Filters/FitlerButton';
import SortButton from './Sort/SortButton';
import TopSearchbar from './TopSearchbar';
import { useDispatch } from 'react-redux';
import { Productsmakelijke, SortOption } from '~/src/types/type';
import { setSortBy } from '~/src/store/slices/filterSlice';
import { ImageBackground } from 'react-native';
import SubcriberCoin from '../ProductsBynormal-sub/Subscription';
import SubscribedCoin from '../ProducutBYCategory/SubscribedCoin';

export default function ProductHeader({
  productType,
  activeStatsBarInfo,
  insets,
  data,
  selectCategory = '',
  setSelectCategory = () => {},
  gender = null,
  setGender = () => {},
  subscription = false,
}: {
  productType: string;
  selectCategory?: string;
  setSelectCategory?: Dispatch<React.SetStateAction<string>>;
  activeStatsBarInfo: { name: string; color: string } | null;
  gender?: string | null;
  setGender?: Dispatch<React.SetStateAction<'male' | 'female' | null>>;
  insets: { top: number };
  data: Productsmakelijke[] | any;
  subscription?: boolean;
}) {
  const dispatch = useDispatch();
  const updateSortBy = (sortOption: SortOption) => dispatch(setSortBy(sortOption));
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
        {subscription && <SubscribedCoin />}
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
              productCategories={selectSuppdProductType(productType)}
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
                  <FitlerButton productType={productType as string} updateSortBy={updateSortBy} />
                  <SortButton updateSortBy={updateSortBy} />
                </XStack>
                <Text fontSize={11} color="#25272C">
                  {data.length <= 4
                    ? data.length - 3 < 0
                      ? 0
                      : data.length - 3
                    : data?.length - 2}{' '}
                  meal preps to explore
                </Text>
              </XStack>
            </View>
          </>
        )}
      </View>
    </View>
  );
}
