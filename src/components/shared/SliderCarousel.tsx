import { Button, Text, View, YStack } from 'tamagui';
import { SliderImage } from '~/src/types/type';
import { Dimensions, ImageBackground, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

type SliderCarouselProps = {
  images: SliderImage[];
  productType: string;
};
export default function SliderCarousel({ images, productType }: SliderCarouselProps) {
  const { width } = Dimensions.get('window');
  return (
    <View width={width - 32} height={180} alignSelf="center">
      <Carousel
        width={width - 32}
        height={180}
        data={images}
        autoPlay
        autoPlayInterval={2500}
        loop
        renderItem={({ item }) => (
          <View flex={1} alignItems="center" justifyContent="center">
            <ImageBackground
              source={item.img}
              style={{ width: '100%', minHeight: 123, overflow: 'hidden', borderRadius: 12 }}>
              <YStack py={20} px={16} gap={12}>
                <YStack gap={4}>
                  <Text fontSize={16} color={item.text} fontWeight={700}>
                    {item.caption}
                  </Text>
                  <Text fontSize={12} color={item.text} fontWeight={500} maxWidth={200}>
                    {item.title}
                  </Text>
                </YStack>
                <View>
                  {productType === 'cookd' && (
                    <Button
                      bg="#FFEDE5"
                      fontSize={14}
                      fontWeight={700}
                      color="#FD4F01"
                      borderRadius={8}
                      px={14}
                      py={8}
                      alignSelf="flex-start">
                      See Subscription Plans
                    </Button>
                  )}
                  {productType === 'suppd' && (
                    <TouchableOpacity>
                      <Text
                        w={70}
                        textAlign="left"
                        fontWeight={700}
                        fontSize={14}
                        color="#FD4F01"
                        borderColor={'#FD4F01'}
                        borderBottomWidth={2}>
                        Read More
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </YStack>
            </ImageBackground>
          </View>
        )}
      />
    </View>
  );
}
