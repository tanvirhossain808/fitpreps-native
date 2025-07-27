import { Button, Text, View, XStack, YStack, Image, useWindowDimensions } from 'tamagui';
import { Productsmakelijke, SliderItem } from '~/src/types/type';
import { LinearGradient } from 'expo-linear-gradient';
import { badgesColor } from '~/src/constants/colorConstants';
import { TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement } from '~/src/store/slices/cartSlice';
import Toast from 'react-native-toast-message';
import { RootState } from '~/src/store';
import { useEffect, useMemo, useState } from 'react';
import { productBg, shadows } from '~/src/constant';
import Coin from '~/public/images/coin.svg';
import SliderCarousel from '../shared/SliderCarousel';
import { baseUrl } from '~/src/constants/baseConstant';
import SelectPrice from '../shared/SelectPrice';
import { subDecrement, subIncrement } from '~/src/store/slices/subcartSlice';
export default function ProductsmakelijkeListsSubLists({
  item,
  productType,
  index,
}: {
  item: Productsmakelijke | SliderItem | { type: 'dummy' };
  productType: string;
  index: number;
}) {
  const [selectedProduct, setSelectProduct] = useState<Productsmakelijke | any>();
  const [openSelectedProduct, setOpenSelectedProduct] = useState(false);
  const dispatch = useDispatch();
  const width = useWindowDimensions().width / 2;

  const quantity = useSelector((state: RootState) => {
    if ('_id' in item) {
      return state?.subCart?.subCartItems[item?._id];
    }
    return undefined;
  });
  useEffect(() => {
    const selectedWeight = item as Productsmakelijke;
    if (selectedWeight?.metadata?.weight_options) {
      if (quantity) {
        const selectedProduct = selectedWeight.metadata.weight_options?.find(
          (w) => w.weight === quantity.selectedWeight?.weight
        );
        return setSelectProduct({ selectedWeight: selectedProduct });
      }
      setSelectProduct({ selectedWeight: selectedWeight?.metadata?.weight_options[0] });
    }
  }, [productType, item]);
  const handlePlus = () => {
    const stock = Number((item as Productsmakelijke)?.metadata?._stock);
    const currentQuantity = quantity?.quantity || 0;

    if (!stock || currentQuantity >= stock) {
      Toast.show({
        type: 'error',
        text1: stock === 0 ? 'Out of stock' : 'Not enough stock available',
        position: 'top',
      });
      return;
    }

    const productData = { ...item } as Productsmakelijke;

    const data = {
      ...productData,
      selectedWeight: selectedProduct.selectedWeight,

      metadata: {
        ...productData.metadata,
        _price: selectedProduct.selectedWeight?.price,
      },
    };
    Toast.show({
      type: 'subCartToast',
      text1: 'Product added to cart',
      props: {
        quantity: quantity?.quantity ? quantity.quantity + 1 : 1,
      },
      position: 'bottom',
    });
    dispatch(subIncrement(data));
  };
  const handleMinus = () => {
    if (quantity?.quantity && quantity.quantity > 0) {
      dispatch(subDecrement(quantity as Productsmakelijke));
    }
  };
  if ((item as SliderItem)?.type === 'slider') {
    return (
      <XStack w="100%" style={{ width: '100%' }} my={0}>
        <SliderCarousel images={(item as SliderItem)?.images} productType={productType} />
      </XStack>
    );
  }
  if ((item as { type: string })?.type === 'dummy') {
    return <View h={0} />;
  }

  return (
    <>
      {item.type === 'dummy1' ? (
        <View />
      ) : (
        <YStack
          h={325}
          mb={20}
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
            bg={productBg[productType as keyof typeof productBg]}
            borderRadius={4}>
            <Image
              source={{
                uri:
                  (item as Productsmakelijke)?.files?.length > 0
                    ? baseUrl + `/uploads/${(item as Productsmakelijke)?.files[0]?.url}`
                    : (item as Productsmakelijke)?.thumbnail?.url,
              }}
              width={115}
              height="auto"
              aspectRatio={1}
              resizeMode="cover"
            />

            {(item as Productsmakelijke)?.metadata?.badges && (
              <XStack top={4} gap={2} left={6} position="absolute">
                {(item as Productsmakelijke)?.metadata?.badges?.map((badge, i) => {
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
            <Text
              h={25}
              fontSize={11.5}
              fontWeight={700}
              color="#1E1F20"
              numberOfLines={2}
              ellipsizeMode="tail">
              {(item as Productsmakelijke)?.name}
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
                    €{(item as Productsmakelijke)?.metadata?._price}
                  </Text>
                )}

                {(item as Productsmakelijke).categories.includes('Supplements') ? (
                  <Text fontSize={12} fontWeight={500} color="#1E1F20">
                    {(item as Productsmakelijke)?.metadata?.dose}
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

            {/* <Button fontSize={15} color="white" fontWeight={700} bg="#FD4F01" borderRadius={8}>
              {productType === 'cookd' ? 'Add & Fuel Up' : 'Add'}
            </Button> */}
            {quantity?.quantity && quantity.quantity > 0 ? (
              <XStack
                overflow="hidden"
                borderWidth={1}
                borderRadius={12}
                borderColor="#FD4F01"
                alignItems="center"
                justifyContent="space-between">
                <TouchableOpacity onPress={handleMinus}>
                  <XStack px="$2" py="$2" bg="#FFEDE5">
                    <AntDesign name="minus" size={24} color="#FD4F01" />
                  </XStack>
                </TouchableOpacity>
                <Text>{quantity?.quantity}</Text>
                <TouchableOpacity onPress={handlePlus}>
                  <XStack px="$4" py="$2" bg="#FFEDE5">
                    <AntDesign name="plus" size={24} color="#FD4F01" />
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
