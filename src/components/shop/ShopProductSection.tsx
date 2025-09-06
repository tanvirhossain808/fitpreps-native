import React, { Dispatch, useRef } from 'react';
import { Dimensions, FlatList } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { Button, Text, XStack, YStack, Image, View } from 'tamagui';
import AntDesign from '@expo/vector-icons/AntDesign';
import Title from '../shared/Title';
import ShopGymWearCarosel from './ShopGymWearCarosel';
import ShopByCategory from './ShopByCategory';
import Entypo from '@expo/vector-icons/Entypo';
import { useGetGymwearQuery } from '~/src/store/apiSlices/products/gymwearSlice';
import { GymwearProduct } from '~/src/types/type';
import { baseUrl } from '~/src/constants/baseConstant';
import LoadingSpinner from '../shared/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement } from '~/src/store/slices/cartSlice';
import { RootState } from '~/src/store';
import Toast from 'react-native-toast-message';
import { TouchableOpacity } from 'react-native';
import { shadows } from '~/src/constant';
const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 32;
const CARD_HEIGHT = 310;

type ItemType = {
  badge: string;
  img: any;
  badgeBg: string;
  color: string;
  subBadgeBg: string;
  subBadgeColor: string;
  subBadge: string;
  ratings: string;
  name: string;
  discount: string;
  price: string;
  originalPrice?: string;
  originalProduct?: GymwearProduct;
};

type SectionType = {
  name: string;
  items: ItemType[];
};

export default function BestSellerSection({
  data,
  setGender,
}: {
  data: SectionType[];
  setGender: Dispatch<React.SetStateAction<'male' | 'female' | null>>;
}) {
  const { data: gymwearData, isLoading, error } = useGetGymwearQuery(undefined);

  // Transform gymwear data into sections
  const dynamicSections = React.useMemo(() => {
    if (!gymwearData) return [];

    // Group products by category
    const categoryGroups = gymwearData
      .filter((item: GymwearProduct) => item.status === 'publish')
      .reduce((groups: { [key: string]: GymwearProduct[] }, item: GymwearProduct) => {
        const category = item.category;
        if (!groups[category]) {
          groups[category] = [];
        }
        groups[category].push(item);
        return groups;
      }, {});

    // Convert to section format
    return Object.entries(categoryGroups).map(([category, products]) => ({
      name: category,
      items: (products as GymwearProduct[]).map((product: GymwearProduct) => ({
        badge: product.metadata.badges?.[0] || 'New',
        img: product.files && product.files.length > 0 
          ? { uri: `${baseUrl}/uploads/${product.files[0].url}` }
          : require('../../../public/images/shop/shapped/img/all.png'),
        badgeBg: product.metadata._product_background_color || '#FD4F01',
        color: '#FD4F01',
        subBadgeBg: '#F0F0F0',
        subBadgeColor: '#666',
        subBadge: product.category,
        ratings: '4.5',
        name: product.name,
        discount: '20%',
        price: `€${parseFloat(product.metadata._price || '0').toFixed(2)}`,
        originalPrice: `€${(parseFloat(product.metadata._price || '0') * 1.2).toFixed(2)}`,
        // Store original product data for cart functionality
        originalProduct: product,
      })),
    }));
  }, [gymwearData]);

  if (isLoading) {
    return <LoadingSpinner color="#FD4F01" />;
  }

  if (error) {
    return (
      <YStack flex={1} alignItems="center" justifyContent="center" p={20}>
        <Text fontSize={16} color="#FD4F01" textAlign="center">
          Failed to load gymwear products
        </Text>
      </YStack>
    );
  }

  return (
    <FlatList
      style={{ flex: 1 }}
      ListHeaderComponent={
        <YStack flex={1}>
          <ShopByCategory setGender={setGender} />
          <ShopGymWearCarosel />
        </YStack>
      }
      data={dynamicSections}
      keyExtractor={(_, index) => `section-${index}`}
      renderItem={({ item }) => <SingleCarouselSection section={item} />}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ padding: 16, paddingBottom: 60 }}
    />
  );
}

function SingleCarouselSection({ section }: { section: SectionType }) {
  const carouselRef = useRef<any>(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  // Cart functions
  const handleAddToCart = (product: GymwearProduct) => {
    const cartProduct = {
      ...product,
      type: 'gymwear' as const,
      categories: [product.category],
      productId: product.gymwearId,
    };
    
    dispatch(increment(cartProduct));
    
    Toast.show({
      type: 'success',
      text1: 'Product added to cart',
      text2: `${product.name} has been added to your cart`,
      position: 'bottom',
    });
  };

  const handleRemoveFromCart = (product: GymwearProduct) => {
    dispatch(decrement(product));
  };

  const getCartQuantity = (productId: string) => {
    return cartItems[productId]?.quantity || 0;
  };

  const handleNext = () => {
    if (currentIndex < groupedItems.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      carouselRef.current?.scrollTo({ index: newIndex, animated: true });
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      carouselRef.current?.scrollTo({ index: newIndex, animated: true });
    }
  };

  const groupedItems = section.items.reduce((result, item, index) => {
    if (index % 2 === 0) {
      result.push([item, section.items[index + 1]].filter(Boolean));
    }
    return result;
  }, [] as ItemType[][]);

  return (
    <YStack gap={12} flex={1} paddingBottom={60}>
      <XStack alignItems="center" justifyContent="space-between">
        <Title text={section.name} />
        <XStack gap="$2">
          <Button
            onPress={handlePrev}
            backgroundColor={currentIndex === 0 ? '#F2F4F7' : '#EDEEF1'}
            circular
            width={32}
            height={32}
            disabled={currentIndex === 0}
            icon={
              <AntDesign name="left" size={16} color={currentIndex === 0 ? '#98A2B3' : '#1E1F20'} />
            }
          />
          <Button
            disabled={currentIndex >= groupedItems.length - 1}
            width={32}
            height={32}
            onPress={handleNext}
            backgroundColor={currentIndex >= groupedItems.length - 1 ? '#F2F4F7' : '#EDEEF1'}
            circular
            icon={
              <AntDesign
                name="right"
                size={16}
                color={currentIndex >= groupedItems.length - 1 ? '#98A2B3' : '#1E1F20'}
              />
            }
          />
        </XStack>
      </XStack>
      <Carousel
        ref={carouselRef}
        loop={false}
        width={CARD_WIDTH}
        data={groupedItems}
        style={{ minHeight: CARD_HEIGHT }}
        scrollAnimationDuration={500}
        onSnapToItem={setCurrentIndex}
        enabled={false}
        renderItem={({ item: items }) => (
          <XStack width={CARD_WIDTH} gap={8} pb={20}>
            {items.map((item, idx) => (
              <YStack
                key={idx}
                p={8}
                flex={1}
                borderWidth={1}
                borderColor="#B6BAC3"
                gap={12}
                borderRadius={8}
                overflow="hidden">
                <View>
                  <Image
                    height={170}
                    borderRadius={8}
                    width={'100%'}
                    source={item.img}
                    resizeMode="cover"
                  />
                  {/* <Text
                    top={4}
                    left={4}
                    color={item.color}
                    p={'$2'}
                    borderRadius={20}
                    bg={item.badgeBg}
                    position="absolute">
                    {item.badge}
                  </Text> */}
                  <XStack
                    alignItems="center"
                    bg="white"
                    p={4}
                    borderRadius={4}
                    gap={2}
                    bottom={4}
                    right={4}
                    position="absolute">
                    <Entypo name="star" size={10} color="#FDB022" />
                    <Text fontSize={10} fontWeight={500}>
                      {item.ratings}
                    </Text>
                  </XStack>
                </View>
                <YStack gap={8}>
                  <XStack>
                    <Text
                      textAlign="left"
                      paddingHorizontal={8}
                      paddingVertical={6}
                      borderRadius={4}
                      bg={item.subBadgeBg}
                      fontWeight="500"
                      fontSize={10}
                      color={item.subBadgeColor}>
                      {item.subBadge}
                    </Text>
                  </XStack>

                  <Text fontSize={12} fontWeight={700} color="black">
                    {item.name}
                  </Text>
                  <XStack alignItems="center" justifyContent="space-between">
                    <XStack alignItems="center" gap={4}>
                      <Text color="#FD4F01" fontSize={14} fontWeight={700}>
                        {item.price}
                      </Text>
                      {item.originalPrice && (
                        <Text fontSize={14} color="#383A42" textDecorationLine="line-through">
                          {item.originalPrice}
                        </Text>
                      )}
                    </XStack>
                    {item.discount && (
                      <Text
                        bg=""
                        color="#7A62E9"
                        fontWeight={600}
                        backgroundColor="#EDEEF1"
                        px={8}
                        borderRadius={20}
                        py={4}>
                        {item.discount}% off
                      </Text>
                    )}
                  </XStack>
                  
                  {/* Cart Controls */}
                  {item.originalProduct && (
                    <YStack mt={8}>
                      {getCartQuantity(item.originalProduct._id) > 0 ? (
                        <XStack
                          overflow="hidden"
                          borderWidth={1}
                          borderRadius={12}
                          borderColor="#FD4F01"
                          alignItems="center"
                          justifyContent="space-between">
                          <TouchableOpacity onPress={() => handleRemoveFromCart(item.originalProduct!)}>
                            <XStack px="16" py="10" bg="#FFEDE5">
                              <AntDesign name="minus" size={18} color="#FD4F01" />
                            </XStack>
                          </TouchableOpacity>
                          <Text fontSize={16} fontWeight={600} color="#FD4F01" px={16}>
                            {getCartQuantity(item.originalProduct._id)}
                          </Text>
                          <TouchableOpacity onPress={() => handleAddToCart(item.originalProduct!)}>
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
                          onPress={() => handleAddToCart(item.originalProduct!)}
                          width="100%">
                          Add
                        </Button>
                      )}
                    </YStack>
                  )}
                </YStack>
              </YStack>
            ))}
          </XStack>
        )}
      />
    </YStack>
  );
}
