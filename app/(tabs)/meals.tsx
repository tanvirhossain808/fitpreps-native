import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { H5, Text, View, XStack } from 'tamagui';
import TopSearchbar from '~/components/shared/TopSearchbar';
import SelectedFoodCategories from '~/components/shared/SelectedFoodCategories';
import ProductLists from '~/components/shared/ProductLists';
import { cookdFoodCategories, foodOfItems } from '~/constant';
import FitlerButton from '~/components/shared/Filters/FitlerButton';
import SortButton from '~/components/shared/Sort/SortButton';

export default function Home() {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1 }}>
      {/* Header Section */}
      <View>
        <View>
          <XStack
            {...{
              backgroundColor: '#0A8A23',
              borderBottomStartRadius: 20,
              borderBottomEndRadius: 20,
              paddingTop: insets.top,
            }}>
            <TopSearchbar placeholder="Search your meal here" />
          </XStack>

          <XStack px={16} py={20}>
            <H5 color="#25272C" fontWeight={700} size={16}>
              What are you looking for today?
            </H5>
          </XStack>

          <SelectedFoodCategories cookdFoodCategories={cookdFoodCategories} />

          <View px={16} mt={20}>
            <XStack
              justifyContent="space-between"
              py={12}
              borderTopWidth={0.5}
              borderTopColor="#B6BAC3"
              borderBottomWidth={0.5}
              borderBottomColor="#B6BAC3">
              <XStack alignItems="center" gap={12}>
                <FitlerButton />
                <SortButton />
              </XStack>
              <Text fontSize={11} color="#25272C">
                48 meal preps to explore
              </Text>
            </XStack>
          </View>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.contentContainer}>
        <View style={{ flex: 1 }} zIndex={0}>
          <ProductLists
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            products={foodOfItems}
          />
        </View>
      </View>
    </View>
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
  filterButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
});
