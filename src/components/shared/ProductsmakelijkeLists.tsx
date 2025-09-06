import { Button, Text, View, XStack, YStack, Image } from 'tamagui';
import SliderCarousel from './SliderCarousel';
import { Productsmakelijke, SliderItem, GymwearProduct } from '~/src/types/type';
import { LinearGradient } from 'expo-linear-gradient';
import { badgesColor } from '~/src/constants/colorConstants';
import SelectPrice from './SelectPrice';
import { baseUrl } from '~/src/constants/baseConstant';
import { TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement } from '~/src/store/slices/cartSlice';
import Toast from 'react-native-toast-message';
import { RootState } from '~/src/store';
import { useEffect, useState } from 'react';
import { productBg, shadows } from '~/src/constant';
import Coin from '~/public/images/coin.svg';
import SubCartAddedToast from '../toast/SubCartAddedToast';
export default function ProductsmakelijkeLists({
  item,
  productType,
  index,
}: {
  item: Productsmakelijke | SliderItem | GymwearProduct | { type: 'dummy' };
  productType: string;
  index: number;
}) {
  const [selectedProduct, setSelectProduct] = useState<Productsmakelijke | any>();
  const [openSelectedProduct, setOpenSelectedProduct] = useState(false);

  // Helper function to get image source for different product types
  const getImageSource = () => {
    if (productType === 'shaped' || productType === 'gymwear') {
      const gymwearItem = item as GymwearProduct;
      if (gymwearItem?.files?.length > 0) {
        return baseUrl + `/uploads/${gymwearItem.files[0].url}`;
      }
      if (gymwearItem?.thumbnail?.url) {
        return baseUrl + `/uploads/${gymwearItem.thumbnail.url}`;
      }
      return null;
    } else {
      const productItem = item as Productsmakelijke;
      if (productItem?.files?.length > 0) {
        return baseUrl + `/uploads/${productItem.files[0].url}`;
      }
      if (productItem?.thumbnail?.url) {
        return productItem.thumbnail.url;
      }
      return null;
    }
  };

  const dispatch = useDispatch();
  const quantity = useSelector((state: RootState) => {
    if ('_id' in item) {
      return state?.cart?.cartItems[item?._id];
    }
    return undefined;
  });
  // console.log(item?.metadata?.weight_options, 'item');
  useEffect(() => {
    if (productType === 'cookd') {
      const selectedWeight = item as Productsmakelijke;
      // console.log(selectedWeight?.metadata?.weight_options, 'selectedWeight');
      if (quantity && 'selectedWeight' in quantity) {
        const selectedProduct = selectedWeight.metadata.weight_options?.find(
          (w) => w.weight === quantity.selectedWeight?.weight
        );
        return setSelectProduct({ selectedWeight: selectedProduct });
      }
      if (!selectedWeight?.metadata?.weight_options) {
        return;
      }
      if (selectedWeight?.metadata?.weight_options) {
        setSelectProduct({ selectedWeight: selectedWeight?.metadata?.weight_options[0] });
      }
    }
  }, [productType, item]);
  // console.log(selectedProduct);
  const handlePlus = () => {
    let data;

    if (productType === 'cookd') {
      const productData = { ...item } as Productsmakelijke;
      data = {
        ...productData,
        selectedWeight: selectedProduct.selectedWeight,
        metadata: {
          ...productData.metadata,
          _price: selectedProduct.selectedWeight?.price,
          // _coin: selectedProduct.selectedWeight?.coin,
        },
      };
    } else if (productType === 'shaped' || productType === 'gymwear') {
      const gymwearData = { ...item } as GymwearProduct;
      data = {
        ...gymwearData,
        type: 'gymwear' as const,
        categories: [gymwearData.category],
        productId: gymwearData.gymwearId,
      };
    } else {
      data = { ...item } as Productsmakelijke;
    }

    Toast.show({
      type: 'cardAddedToast',
      text1: 'Product added to cart',
      props: {
        quantity: quantity?.quantity ? quantity.quantity + 1 : 1,
      },
      position: 'bottom',
    });
    // }, 0);
    dispatch(increment(data));
  };
  const handleMinus = () => {
    if (quantity?.quantity && quantity.quantity > 0) {
      if (productType === 'shaped' || productType === 'gymwear') {
        dispatch(decrement(item as GymwearProduct));
      } else {
        dispatch(decrement(item as Productsmakelijke));
      }
    }
  };
  if ((item as SliderItem)?.type === 'slider') {
    return (
      <XStack w="100%" height={180} py={0} my={0}>
        <SliderCarousel images={(item as SliderItem)?.images} productType={productType} />
      </XStack>
    );
  }
  if ((item as { type: string })?.type === 'dummy') {
    return <View h={0} />;
  }
  return (
    <>
      {(item as any).type === 'dummy1' ? (
        <View h={0} />
      ) : (
        <YStack
          h={325}
          mt={index === 7 || index === 6 ? 0 : 20}
          key={(item as Productsmakelijke)?._id}
          w={'98%'}
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
            maxHeight={165}
            width={'100%'}
            alignSelf="stretch"
            flex={1}
            bg={productBg[productType as keyof typeof productBg] || '#F5F5F5'}
            borderRadius={4}>
            <Image
              source={{
                uri: getImageSource() || '',
              }}
              width={115}
              height="auto"
              aspectRatio={1}
              resizeMode="cover"
            />
            {((item as Productsmakelijke)?.metadata?.badges || (item as GymwearProduct)?.metadata?.badges) && (
              <XStack top={4} gap={2} left={6} position="absolute">
                {((item as Productsmakelijke)?.metadata?.badges || (item as GymwearProduct)?.metadata?.badges)?.map((badge, i) => {
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
                {productType === 'suppd' && (
                  <Text
                    p={5}
                    fontSize={7}
                    fontWeight={700}
                    {...badgesColor['20% Korting' as keyof typeof badgesColor]}
                    borderRadius={20}>
                    20% Korting
                  </Text>
                )}
              </XStack>
            )}
            {productType === 'fueld' && (item as Productsmakelijke)?.eiwitten && (
              <YStack
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
                <View bg="white" position="absolute" inset={0} borderRadius={25} top={20}></View>
                <Text fontSize={13} color="#FD4F01" fontFamily="$oswald" fontWeight={700}>
                  {/* {(food as fueld)?.protein} */}
                  {(item as Productsmakelijke)?.eiwitten}
                </Text>
                <Text color="#1E1F20" fontWeight={500} fontSize={12}>
                  protein
                </Text>
              </YStack>
            )}
          </View>
          <YStack gap={8} justifyContent="space-between" f={1}>
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
              h={30}
              fontWeight={700}
              color="#1E1F20"
              numberOfLines={2}
              ellipsizeMode="tail">
              {(item as Productsmakelijke)?.name || (item as GymwearProduct)?.name}
            </Text>
            {(item as Productsmakelijke)?.metadata?.weight_options !== undefined && (
              <View>
                {openSelectedProduct ? (
                  <SelectPrice
                    selectedWeight={selectedProduct.selectedWeight.weight as string}
                    setOpenSelectedProduct={setOpenSelectedProduct}
                    quantity={quantity?.quantity ? quantity.quantity : 0}
                    setSelectProduct={setSelectProduct}
                    values={(item as any)?.metadata?.weight_options}
                  />
                ) : (
                  <TouchableOpacity
                    disabled={quantity ? true : false}
                    onPress={() => setOpenSelectedProduct(true)}>
                    <XStack
                      borderWidth={1}
                      borderColor="#A1A1A1"
                      borderRadius={4}
                      p={8}
                      alignItems="center"
                      justifyContent="space-between">
                      <View>
                        {!selectedProduct?.selectedWeight?.coin ? (
                          <XStack alignItems="center">
                            <Text color="#1E1F20" fontWeight={600} fontSize={12}>
                              {selectedProduct?.selectedWeight?.weight} -{' '}
                              <Text color="#FD4F01">€{selectedProduct?.selectedWeight?.price}</Text>
                            </Text>
                          </XStack>
                        ) : (
                          <XStack alignItems="center">
                            <Text color="#1E1F20" fontWeight={600} fontSize={12}>
                              {selectedProduct?.selectedWeight?.weight} -{' '}
                            </Text>
                            <View>
                              <Coin />
                            </View>
                            <Text></Text>
                            <Text>{selectedProduct?.selectedWeight?.coin}</Text>
                          </XStack>
                        )}
                      </View>
                      <AntDesign name="down" size={16} color="#A1A1A1" />
                    </XStack>
                  </TouchableOpacity>
                )}
              </View>
            )}

            {productType !== 'cookd' && (
              <View>
                {(item as Productsmakelijke)?.metadata?.coin ? (
                  <XStack gap={4} alignItems="center">
                    <Text fontSize={14} fontWeight={700} color="#FD4F01">
                      {(item as Productsmakelijke)?.metadata?.coin}
                    </Text>
                    <Coin />
                  </XStack>
                ) : (
                  <Text fontSize={14} fontWeight={700} color="#FD4F01">
                    {/*      <Coin /> */} €{(item as Productsmakelijke)?.metadata?._price || (item as GymwearProduct)?.metadata?._price}
                  </Text>
                )}

                {(item as Productsmakelijke).categories?.includes('Supplements') ? (
                  <Text mt={10} fontSize={12} fontWeight={500} color="#1E1F20">
                    {(item as Productsmakelijke)?.metadata?.dose}
                  </Text>
                ) : productType === 'shaped' || productType === 'gymwear' ? (
                  <Text fontSize={12} fontWeight={500} color="#1E1F20">
                    {(item as GymwearProduct)?.category}
                  </Text>
                ) : (
                  <Text fontSize={12} fontWeight={500} color="#1E1F20">
                    {
                      (item as Productsmakelijke)?.metadata?.nutretions_data[0]
                        ?.voedingswaarde_contents
                    }
                  </Text>
                )}
              </View>
            )}
            {quantity?.quantity && quantity.quantity > 0 ? (
              // <XStack
              //   overflow="hidden"
              //   borderWidth={1}
              //   borderRadius={12}
              //   borderColor="#FD4F01"
              //   alignItems="center"
              //   justifyContent="space-between">
              //   <TouchableOpacity onPress={handleMinus}>
              //     <XStack px="$2" py="$2" bg="#FFEDE5">
              //       <AntDesign name="minus" size={24} color="#FD4F01" />
              //     </XStack>
              //   </TouchableOpacity>
              //   <Text>{quantity?.quantity}</Text>
              //   <TouchableOpacity onPress={handlePlus}>
              //     <XStack px="$4" py="$2" bg="#FFEDE5">
              //       <AntDesign name="plus" size={24} color="#FD4F01" />
              //     </XStack>
              //   </TouchableOpacity>
              // </XStack>
              <XStack
                overflow="hidden"
                borderWidth={1}
                borderRadius={12}
                borderColor="#FD4F01"
                alignItems="center"
                justifyContent="space-between">
                <TouchableOpacity onPress={handleMinus}>
                  <XStack px="16" py="10" bg="#FFEDE5">
                    <AntDesign name="minus" size={18} color="#FD4F01" />
                  </XStack>
                </TouchableOpacity>
                <Text>{quantity?.quantity}</Text>
                <TouchableOpacity onPress={handlePlus}>
                  <XStack px="16" py="10" bg="#FFEDE5">
                    <AntDesign name="plus" size={18} color="#FD4F01" />
                  </XStack>
                </TouchableOpacity>
              </XStack>
            ) : (
              <Button
                fontSize={15}
                color="white"
                fontWeight={700}
                {...shadows.small}
                bg="#FD4F01"
                borderRadius={8}
                onPress={handlePlus}>
                {productType === 'cookd' ? 'Add & Fuel Up' : 'Add'}
              </Button>
            )}
          </YStack>
        </YStack>
      )}
    </>
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
