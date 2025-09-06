import { View, Text, YStack, Image, XStack, Button } from 'tamagui';
import React, { useEffect, useRef } from 'react';
import { FlatList, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { GymwearProduct } from '~/src/types/type';
import { Entypo } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from 'expo-router';
import { useGetGymwearQuery } from '~/src/store/apiSlices/products/gymwearSlice';
import LoadingSpinner from '../Loading';
import { baseUrl } from '~/src/constants/baseConstant';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement } from '~/src/store/slices/cartSlice';
import { RootState } from '~/src/store';
import Toast from 'react-native-toast-message';
import { TouchableOpacity } from 'react-native';
import { shadows } from '~/src/constant';

const defaultTabBarStyle = {
  position: 'absolute',
  borderRadius: 20,
  paddingHorizontal: 28,
  height: 68,
  paddingTop: 12,
  elevation: 7,
  shadowColor: '#B6BAC3',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  backgroundColor: 'rgba(255, 255, 255, 0.85)',
};

interface DynamicGymProductsForWomenProps {
  data?: any[];
  isLoading?: boolean;
}

export default function DynamicGymProductsForWomen({ 
  data = [], 
  isLoading = false 
}: DynamicGymProductsForWomenProps) {
  const navigation = useNavigation();
  const scrollOffset = useRef(0);
  const isTabBarVisible = useRef(true);
  const dispatch = useDispatch();
  
  // Debug logging
  console.log('DynamicGymProductsForWomen - Props:', {
    isLoading,
    dataLength: data?.length,
    data: data
  });

  const toggleTabBar = (visible: boolean) => {
    if (isTabBarVisible.current !== visible) {
      isTabBarVisible.current = visible;
      navigation.setOptions({
        tabBarStyle: visible ? defaultTabBarStyle : { ...defaultTabBarStyle, display: 'none' },
      });
    }
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const diff = currentOffset - scrollOffset.current;
    scrollOffset.current = currentOffset;

    if (diff > 10 && isTabBarVisible.current) {
      toggleTabBar(false);
    } else if (diff < -10 && !isTabBarVisible.current) {
      toggleTabBar(true);
    }
  };

  // Reset tab bar when component unmounts
  useEffect(() => {
    return () => {
      navigation.setOptions({ tabBarStyle: defaultTabBarStyle });
    };
  }, [navigation]);

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

  // Get cart items from Redux store
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  
  // Get cart quantity for a product
  const getCartQuantity = (productId: string) => {
    return cartItems[productId]?.quantity || 0;
  };

  // Transform gymwear data to match the expected format
  const transformedGymwear = React.useMemo(() => {
    if (!data || data.length === 0) return [];
    
    console.log('Raw gymwear data:', data);
    
    return data
      .filter((item: GymwearProduct) => item.status === 'publish')
      .map((item: GymwearProduct) => {
        console.log('Processing item:', item.name, item.metadata);
        return {
          _id: item._id,
          name: item.name,
          price: `€${parseFloat(item.metadata._price || '0').toFixed(2)}`,
          originalPrice: `€${(parseFloat(item.metadata._price || '0') * 1.2).toFixed(2)}`, // 20% markup for original price
          discount: '20%', // You can calculate this based on your business logic
          img: item.files && item.files.length > 0 
            ? { uri: `${baseUrl}/uploads/${item.files[0].url}` }
            : require('../../../../public/images/shop/shapped/img/all.png'),
          badge: item.metadata.badges?.[0] || 'New',
          badgeBg: item.metadata._product_background_color || '#FD4F01',
          color: '#FD4F01',
          subBadge: item.category,
          subBadgeBg: '#F0F0F0',
          subBadgeColor: '#666',
          ratings: '4.5',
          stock: parseInt(item.metadata._stock || '0'),
          sizes: item.sizes || ['XS', 'S', 'M', 'L', 'XL'],
          category: item.category,
          product_slug: item.product_slug,
          // Add original product data for cart functionality
          originalProduct: item,
        };
      });
  }, [data]);

  if (isLoading) {
    return <LoadingSpinner color="#FD4F01" />;
  }

  if (!data || data.length === 0) {
    return (
      <YStack flex={1} alignItems="center" justifyContent="center" p={20}>
        <Text fontSize={16} color="#FD4F01" textAlign="center">
          No gymwear products found
        </Text>
        <Text fontSize={12} color="#666" textAlign="center" mt={10}>
          Try adjusting your filters or check back later
        </Text>
      </YStack>
    );
  }

  return (
    <YStack flex={1}>
      {/* Debug info */}
      {/* {__DEV__ && (
        <YStack p={10} bg="#f0f0f0" m={10} borderRadius={8}>
          <Text fontSize={12} color="#333">
            Debug: {transformedGymwear.length} products loaded
          </Text>
          <Text fontSize={10} color="#666">
            Raw data length: {data?.length || 0}
          </Text>
        </YStack>
      )} */}
      
      <FlatList
        keyExtractor={(item, index) => item._id || index.toString()}
        data={transformedGymwear}
        numColumns={2}
        style={{ paddingHorizontal: 16, marginTop: 20 }}
      renderItem={({ item }) => (
        <YStack
          p={8}
          mb={20}
          borderWidth={1}
          borderColor="#B6BAC3"
          gap={12}
          borderRadius={8}
          overflow="hidden"
          width="100%"
          maxWidth="50%"
          marginHorizontal={4}
          flex={1}>
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
                <Text fontSize={14} color="#383A42" textDecorationLine="line-through">
                  {item.originalPrice}
                </Text>
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
                  {item.discount} off
                </Text>
              )}
            </XStack>
            
            {/* Cart Controls */}
            <YStack mt={8}>
              {getCartQuantity(item._id) > 0 ? (
                <XStack
                  overflow="hidden"
                  borderWidth={1}
                  borderRadius={12}
                  borderColor="#FD4F01"
                  alignItems="center"
                  justifyContent="space-between">
                  <TouchableOpacity onPress={() => handleRemoveFromCart(item.originalProduct)}>
                    <XStack px="16" py="10" bg="#FFEDE5">
                      <AntDesign name="minus" size={18} color="#FD4F01" />
                    </XStack>
                  </TouchableOpacity>
                  <Text fontSize={16} fontWeight={600} color="#FD4F01" px={16}>
                    {getCartQuantity(item._id)}
                  </Text>
                  <TouchableOpacity onPress={() => handleAddToCart(item.originalProduct)}>
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
                  onPress={() => handleAddToCart(item.originalProduct)}
                  width="100%">
                  Add
                </Button>
              )}
            </YStack>
          </YStack>
        </YStack>
      )}
      onScroll={handleScroll}
      ListEmptyComponent={
        <YStack flex={1} alignItems="center" justifyContent="center" p={20}>
          <Text fontSize={16} color="#FD4F01" textAlign="center">
            No gymwear products available
          </Text>
        </YStack>
      }
    />
    </YStack>
  );
}
