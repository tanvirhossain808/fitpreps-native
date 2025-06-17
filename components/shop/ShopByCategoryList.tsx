import { ScrollView, Text, View, XStack, YStack } from 'tamagui';
import ShopByCategory from './ShopByCategory';
import Carousel from 'react-native-reanimated-carousel';
import { Dimensions, ImageBackground, TouchableOpacity } from 'react-native';
import { shopByCategorySlider, shopProductSection } from '~/constant';
import ShopByProductSection from './ShopProductSection';

export default function ShopByCategoryList() {
  const { width } = Dimensions.get('window');

  return (
    <View pb={50}>
      <ShopByCategory />
      <View>
        <Carousel
          width={width - 32}
          height={200}
          data={shopByCategorySlider}
          autoPlay
          autoPlayInterval={2500}
          loop
          renderItem={({ item }) => (
            <View flex={1} alignItems="center" justifyContent="center">
              <ImageBackground
                source={item.img}
                style={{ width: '100%', minHeight: 123, overflow: 'hidden', borderRadius: 12 }}>
                <XStack justifyContent={item.textPostion === 'right' ? 'flex-end' : 'flex-start'}>
                  <YStack py={20} px={16} gap={12} maxWidth={200} justifyContent="space-between">
                    <YStack gap={4}>
                      <Text fontSize={16} color={'white'} fontWeight={700}>
                        {item.caption}
                      </Text>
                      <Text fontSize={12} color={'white'} fontWeight={500} maxWidth={200}>
                        {item.title}
                      </Text>
                    </YStack>
                    <TouchableOpacity>
                      <Text
                        fontSize={14}
                        fontWeight={700}
                        color="white"
                        borderBottomWidth={1}
                        borderBottomColor="white"
                        width={66}>
                        Shop Now
                      </Text>
                    </TouchableOpacity>
                  </YStack>
                </XStack>
              </ImageBackground>
            </View>
          )}
        />
      </View>
      {/* <ShopByProductSection data={shopProductSection} /> */}
    </View>
  );
}
