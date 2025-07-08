import { Button, Text, View, XStack, YStack, Image } from 'tamagui';
import SliderCarousel from './SliderCarousel';
import { Productsmakelijke, SliderItem } from '~/src/types/type';
import { LinearGradient } from 'expo-linear-gradient';
import { badgesColor } from '~/src/constants/colorConstants';
import SelectPrice from './SelectPrice';
import { baseUrl } from '~/src/constants/baseConstant';

export default function ProductsmakelijkeLists({
  item,
  productType,
}: {
  item: (Productsmakelijke | SliderItem)[];
  productType: string;
}) {
  // Slider row
  if (item?.length === 1 && 'type' in item[0] && item[0]?.type === 'slider') {
    return (
      <YStack w="100%" mb={20}>
        <SliderCarousel images={(item[0] as SliderItem)?.images} productType={productType} />
      </YStack>
    );
  }
  return (
    <YStack flexDirection="row" justifyContent="space-between" mb={20}>
      {item.map((item) => {
        const product = item as Productsmakelijke;
        return (
          <YStack
            key={product?._id}
            w={'48%'}
            p={8}
            bg="white"
            gap={20}
            borderColor="#B6BAC3"
            borderWidth={1}
            borderRadius={8}>
            <View
              py={15}
              justifyContent="center"
              alignItems="center"
              height={165}
              width={'100%'}
              alignSelf="stretch"
              flex={1}
              bg="#E5F8EA"
              borderRadius={4}>
              <Image
                source={{
                  uri:
                    product?.files?.length > 0
                      ? baseUrl + `/uploads/${product.files[0]?.url}`
                      : product?.thumbnail?.url,
                }}
                // style={{ width: '126', height: 111 }}
                width={115}
                height="auto"
                aspectRatio={1}
                resizeMode="contain"
                // resizeMode="contain"
              />
              {product?.metadata?.badges && (
                <XStack top={4} gap={2} left={6} position="absolute">
                  {product?.metadata?.badges?.map((badge, i) => {
                    if (badge === 'Premium') {
                      return (
                        <LinearGradient
                          key={i}
                          style={{
                            borderRadius: 20,
                            display: 'flex',
                            alignItems: 'center',
                            paddingVertical: 5,
                            paddingHorizontal: 5,
                          }}
                          colors={['#BBA271', '#846C49']}>
                          <Text
                            key={i}
                            // p={'$2'}
                            color="white"
                            fontSize={7}
                            fontWeight={600}>
                            Premium
                          </Text>
                        </LinearGradient>
                      );
                    }
                    const chefFav = badge === 'Chef’s Favoriet';
                    if (chefFav) {
                      return (
                        <Text
                          key={i}
                          p={5}
                          fontSize={7}
                          fontWeight={700}
                          {...badgesColor[badge as keyof typeof badgesColor]}
                          borderRadius={20}>
                          Chef&apos;s Favoriet
                        </Text>
                      );
                    }
                    return (
                      <Text
                        key={i}
                        p={5}
                        fontSize={7}
                        fontWeight={700}
                        {...badgesColor[badge as keyof typeof badgesColor]}
                        borderRadius={20}>
                        {badge}
                      </Text>
                    );
                  })}
                </XStack>
              )}
              {/* <YStack
                  borderTopWidth={1}
                  borderLeftWidth={0.1}
                  borderRightWidth={0.1}
                  borderColor="#FD4F01"
                  alignItems="center"
                  justifyContent="center"
                  position="absolute"
                  bottom={-20}
                  top="100%"
                  right={'50%'}
                  transform={[{ translateX: '50%' }]}
                  width={50}
                  height={50}
                  bg="#FFF"
                  borderRadius={50}>
                  <View
                    bg="white"
                    position="absolute"
                    inset={0}
                    borderRadius={25}
                    top={20}></View>
                  <Text fontSize={13} color="#FD4F01" fontFamily="$oswald" fontWeight={700}>
                    {(food as fueld)?.protein}
                  </Text>
                  <Text color="#1E1F20" fontWeight={500} fontSize={12}>
                    protein
                  </Text>
                </YStack> */}
            </View>
            <YStack gap={8}>
              {/* <Text
                px={6}
                py={4}
                maxWidth={71}
                textAlign="center"
                bg="#E5F8EA"
                borderRadius={20}
                color="#009A21"
                fontSize={10}
                fontWeight={500}>
                {product?.name}
              </Text> */}

              <Text
                fontSize={11.5}
                fontWeight={700}
                color="#1E1F20"
                numberOfLines={2}
                ellipsizeMode="tail">
                {product?.name}
              </Text>

              <View>
                <SelectPrice values={product?.metadata?.weight_options} />
              </View>

              {/* <View>
                  <Text fontSize={14} fontWeight={700} color="#FD4F01">
                    {product?.metadata?.price}
                  </Text>
                  <Text fontSize={12} fontWeight={500} color="#1E1F20">
                    333 kCal <Text> | </Text>
                    <Text>475 g</Text>
                  </Text>
                </View> */}

              <Button fontSize={15} color="white" fontWeight={700} bg="#FD4F01" borderRadius={8}>
                {productType === 'cookd' ? 'Add & Fuel Up' : 'Add'}
              </Button>
            </YStack>
          </YStack>
        );
      })}

      {/* {item?.length === 1 && <YStack w={'48%'} />} */}
    </YStack>
  );

  // else if (item[0].type === 'product') {
  //   return (
  //     <>
  //       <SupplementLists item={item as suppd[]} productType={productType} />
  //     </>
  //   );
  // }
  // return null;
}
