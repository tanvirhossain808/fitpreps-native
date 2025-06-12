import { View, Text, Button, Select, Adapt, Sheet, XStack } from 'tamagui';
import AntDesign from '@expo/vector-icons/AntDesign';
import Carousel from 'react-native-reanimated-carousel';
import { FlatList, Dimensions, ImageBackground } from 'react-native';
import { FoodOrSliderItem } from '~/type';
import { Image, YStack } from 'tamagui';

const { width } = Dimensions.get('window');

type SliderImage = {
  img: any; // Should be ImageSourcePropType
  caption: string;
  title: string;
  text: string;
  id: number;
};

type SliderCarouselProps = {
  images: SliderImage[];
};

function SliderCarousel({ images }: SliderCarouselProps) {
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
                  <Text fontSize={12} color={item.text} fontWeight={500}>
                    {item.title}
                  </Text>
                </YStack>
                <View>
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
                </View>
              </YStack>
            </ImageBackground>
          </View>
        )}
      />
    </View>
  );
}

export default function ProductLists({
  products,
  contentContainerStyle,
  showsVerticalScrollIndicator,
  scrollEventThrottle,
  onScroll,
}: {
  products: FoodOrSliderItem[];
  contentContainerStyle?: any;
  showsVerticalScrollIndicator?: boolean;
  scrollEventThrottle?: number;
  onScroll?: any;
}) {
  // Group food items into rows of 2, keep slider as its own row
  const flatListData: any[] = [];
  let row: any[] = [];
  products.forEach((item) => {
    if (item.type === 'food') {
      row.push(item);
      if (row.length === 2) {
        flatListData.push([...row]);
        row = [];
      }
    } else {
      if (row.length) {
        flatListData.push([...row]);
        row = [];
      }
      flatListData.push([item]);
    }
  });
  if (row.length) flatListData.push([...row]);
  return (
    <FlatList
      data={flatListData}
      keyExtractor={(_, idx) => idx.toString()}
      renderItem={({ item }) => {
        // Slider row
        if (item.length === 1 && item[0].type === 'slider') {
          return (
            <YStack w="100%" mb={20}>
              <SliderCarousel images={item[0].images} />
            </YStack>
          );
        }
        // Food row (1 or 2 items)
        return (
          <YStack flexDirection="row" justifyContent="space-between" mb={20}>
            {item.map((food: FoodOrSliderItem) => (
              <YStack
                key={food.id}
                w={'48%'}
                p={8}
                gap={12}
                borderColor="#B6BAC3"
                borderWidth={1}
                borderRadius={8}>
                <View px={9} py={15} alignSelf="stretch" flex={1} bg="#E5F8EA" borderRadius={4}>
                  {food.type === 'food' && (
                    <Image
                      source={food.img}
                      style={{ width: '100%', minWidth: 140, height: 128 }}
                      resizeMode="contain"
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
                </View>
                <YStack gap={8}>
                  {food.type === 'food' && (
                    <Text fontSize={11.5} fontWeight={700} color="#1E1F20">
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
                    Add & Fuel Up
                  </Button>
                </YStack>
              </YStack>
            ))}
            {/* If only one food item in the row, add an empty space to keep grid */}
            {item.length === 1 && <YStack w={'48%'} />}
          </YStack>
        );
      }}
      contentContainerStyle={[
        { paddingBottom: 180 }, // <-- Add paddingBottom here
        contentContainerStyle,
      ]}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      scrollEventThrottle={scrollEventThrottle}
      onScroll={onScroll}
      style={{
        padding: 16,
        paddingTop: 160,
      }}
    />
  );
}

function SelectPrice({ values }: { values: { quantity: string; price: string }[] }) {
  return (
    <Select defaultValue={values[0].quantity}>
      <Select.Trigger
        iconAfter={<AntDesign name="down" size={16} color="#A1A1A1" />}
        width={'100%'}
        borderWidth={1}
        borderColor="#A1A1A1"
        borderRadius={4}
        p={8}
        backgroundColor="$backgroundTransparent">
        <Select.Value />
      </Select.Trigger>

      <Adapt when="sm" platform="touch">
        <Sheet modal dismissOnSnapToBottom>
          <Sheet.Frame>
            <Sheet.ScrollView>
              <Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>
          <Sheet.Overlay />
        </Sheet>
      </Adapt>

      <Select.Content>
        <Select.Viewport>
          <Select.Group>
            <Select.Label>Options</Select.Label>
            {values.map((value, index) => (
              <Select.Item key={index} index={index} value={value.quantity}>
                <Select.ItemText>
                  <XStack>
                    <Text color="#1E1F20" fontWeight={600} fontSize={12}>
                      {value.quantity} - <Text color="#FD4F01">€{value.price}</Text>
                    </Text>
                  </XStack>
                </Select.ItemText>
                <Select.ItemIndicator marginLeft="auto">
                  <AntDesign name="check" size={24} color="black" />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Viewport>
      </Select.Content>
    </Select>
  );
}
