import { View, Text, Button, Image, YStack } from 'tamagui';
import { FlatList, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import {
  FoodOfItem,
  FoodOrSliderItem,
  fueld,
  fueldOrSliderItem,
  SliderItem,
  suppd,
} from '~/types/type';
import { useEffect, useMemo, useRef } from 'react';
import { useNavigation } from 'expo-router';
import SelectPrice from './SelectPrice';
import SupplementLists from '../shop/SupplementLists';
import SliderCarousel from './SliderCarousel';

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
export const unstable_settings = {
  lazy: true,
};
export default function ProductLists({
  products,
  productType = 'cookd',
  contentContainerStyle,
  showsVerticalScrollIndicator,
  scrollEventThrottle,
}: {
  products: (FoodOrSliderItem | fueldOrSliderItem | suppd)[];
  contentContainerStyle?: any;
  showsVerticalScrollIndicator?: boolean;
  scrollEventThrottle?: number;
  productType?: string;
}) {
  const navigation = useNavigation();
  const scrollOffset = useRef(0);
  const isTabBarVisible = useRef(true);
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
  useEffect(() => {
    return () => {
      navigation.setOptions({ tabBarStyle: defaultTabBarStyle });
    };
  }, [navigation]);
  // Group food items into rows of 2, keep slider as its own row
  type Row = (FoodOrSliderItem | fueldOrSliderItem | suppd)[];

  const flatListData = useMemo(() => {
    const result: Row[] = [];
    let row: (FoodOrSliderItem | fueldOrSliderItem | suppd)[] = [];

    const pushRow = () => {
      if (row.length > 0) {
        result.push([...row]);
        row = [];
      }
    };

    for (const item of products) {
      if (item.type === 'slider') {
        pushRow();
        result.push([item]);
      } else {
        row.push(item);
        if (row.length === 2) {
          pushRow();
        }
      }
    }

    pushRow();

    return result;
  }, [products]);
  return (
    <FlatList
      initialNumToRender={6}
      windowSize={6}
      maxToRenderPerBatch={10}
      updateCellsBatchingPeriod={50}
      data={flatListData}
      keyExtractor={(_, idx) => idx.toString()}
      renderItem={({ item }) => {
        // Slider row
        if (item.length === 1 && item[0].type === 'slider') {
          return (
            <YStack w="100%" mb={20}>
              <SliderCarousel images={item[0].images} productType={productType} />
            </YStack>
          );
        }
        // Food row (1 or 2 items)
        if (item[0].type === 'food') {
          return (
            <YStack flexDirection="row" justifyContent="space-between" mb={20}>
              {item.map((food: FoodOfItem | fueld | suppd | SliderItem) => (
                <YStack
                  key={food.id}
                  w={'48%'}
                  p={8}
                  bg="white"
                  gap={food.type === 'food' && (food as fueld)?.protein ? 20 : 12}
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
                    {food.type === 'food' && (
                      <Image
                        source={food.img}
                        style={{ width: '126', height: 111 }}
                        resizeMode="cover"
                        // resizeMode="contain"
                      />
                    )}
                    {food.type === 'food' && (
                      <Text
                        position="absolute"
                        p={'$2'}
                        top={6}
                        left={6}
                        fontSize={10}
                        fontWeight={700}
                        color="white"
                        bg="#01B528"
                        borderRadius={20}>
                        {food.badge}
                      </Text>
                    )}
                    {food.type === 'food' && (food as fueld)?.protein && (
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
                      </YStack>
                    )}
                  </View>
                  <YStack gap={8}>
                    {food.type === 'food' && productType === 'cookd' ? null : (
                      <Text
                        px={6}
                        py={4}
                        maxWidth={71}
                        textAlign="center"
                        bg="#E5F8EA"
                        borderRadius={20}
                        color="#009A21"
                        fontSize={10}
                        fontWeight={500}>
                        {food.type === 'food' && (food as fueld).subBadge}
                      </Text>
                    )}
                    {food.type === 'food' && (
                      <Text
                        fontSize={11.5}
                        fontWeight={700}
                        color="#1E1F20"
                        numberOfLines={2}
                        ellipsizeMode="tail">
                        {food.name}
                      </Text>
                    )}
                    {food.type === 'food' && Array.isArray(food.price) ? (
                      <View>
                        <SelectPrice values={food.price} />
                      </View>
                    ) : (
                      food.type === 'food' && (
                        <View>
                          <Text fontSize={14} fontWeight={700} color="#FD4F01">
                            {food?.price}
                          </Text>
                          <Text fontSize={12} fontWeight={500} color="#1E1F20">
                            333 kCal <Text> | </Text>
                            <Text>475 g</Text>
                          </Text>
                        </View>
                      )
                    )}
                    <Button
                      fontSize={15}
                      color="white"
                      fontWeight={700}
                      bg="#FD4F01"
                      borderRadius={8}>
                      {productType === 'cookd' ? 'Add & Fuel Up' : 'Add'}
                    </Button>
                  </YStack>
                </YStack>
              ))}
              {/* If only one food item in the row, add an empty space to keep grid */}
              {item.length === 1 && <YStack w={'48%'} />}
            </YStack>
          );
        } else if (item[0].type === 'product') {
          return (
            <>
              <SupplementLists item={item as suppd[]} productType={productType} />
            </>
          );
        }
        return null;
      }}
      contentContainerStyle={[{ paddingBottom: 50 }, contentContainerStyle]}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      scrollEventThrottle={scrollEventThrottle}
      onScroll={handleScroll}
      style={{
        padding: 16,
      }}
    />
  );
}
