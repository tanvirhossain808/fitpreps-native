import { ScrollView, Text, View, XStack, YStack } from 'tamagui';
import ShopByCategory from './ShopByCategory';
import Carousel from 'react-native-reanimated-carousel';
import { Dimensions, ImageBackground, TouchableOpacity } from 'react-native';
import { shopByCategorySlider, shopProductSection } from '~/constant';
import ShopByProductSection from './ShopProductSection';
import ShopGymWearCarosel from './ShopGymWearCarosel';

export default function ShopByCategoryList() {
  const { width } = Dimensions.get('window');

  return (
    <YStack flex={1}>
      <ShopByProductSection data={shopProductSection} />
    </YStack>
  );
}
