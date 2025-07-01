// components/WeightRuler.tsx
import { useRef, useState, useEffect } from 'react';
import { YStack, Text, View, ScrollView, XStack, Button } from 'tamagui';
import { Dimensions, StyleSheet } from 'react-native';
import { shadows } from '~/constant';

const screenWidth = Dimensions.get('window').width;
const ITEM_WIDTH = 14;
const MIN_WEIGHT = 20;
const MAX_WEIGHT = 100;

export default function HeightRuler({
  currentStep,
  setCurrentStep,
}: {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [selectedWeight, setSelectedWeight] = useState(70);
  const [unit, setUnit] = useState('cm');
  const scrollRef = useRef<ScrollView>(null);

  const numbers = Array.from({ length: MAX_WEIGHT - MIN_WEIGHT + 1 }, (_, i) => MIN_WEIGHT + i);

  const handleScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const maxOffset = (MAX_WEIGHT - MIN_WEIGHT) * ITEM_WIDTH;

    // Prevent scrolling past boundaries
    if (offsetX < 0 || offsetX > maxOffset) {
      const clampedX = Math.max(0, Math.min(offsetX, maxOffset));
      requestAnimationFrame(() => {
        scrollRef.current?.scrollTo({ x: clampedX, animated: false });
      });
      return;
    }

    const index = Math.round(offsetX / ITEM_WIDTH);
    setSelectedWeight(MIN_WEIGHT + index);
  };

  // Set initial position
  useEffect(() => {
    const initialScrollX = (70 - MIN_WEIGHT) * ITEM_WIDTH;
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ x: initialScrollX, animated: false });
    });
  }, []);

  return (
    <YStack gap="$10">
      <Text fontSize={16} fontWeight={500} textAlign="center">
        What’s your height?
      </Text>
      <XStack justifyContent="center">
        <XStack borderColor="#B6BAC3" borderWidth={1} p={4} borderRadius={8}>
          {['inches', 'cm'].map((unitType) => (
            <Button
              bg="white"
              {...(unitType === unit && shadows.violetShadow)}
              key={unitType}
              px="$5"
              w={100}
              onPress={() => setUnit(unitType)}
              color={unit === unitType ? 'white' : '#1E1F20'}
              fontWeight={unit === unitType ? 700 : 500}
              backgroundColor={unit === unitType ? '$tracking-primary' : 'transparent'}>
              {unitType}
            </Button>
          ))}
        </XStack>
      </XStack>
      <YStack
        bg="#E8EFFF"
        borderRadius="$8"
        px={6}
        py={54}
        mx="$3"
        alignItems="center"
        justifyContent="center"
        gap="$2">
        <Text fontSize={80} fontWeight="bold" color="$color" mb="$2">
          {selectedWeight * 2}
        </Text>

        <View position="relative" height={100} width="100%">
          <ScrollView
            ref={scrollRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={ITEM_WIDTH}
            decelerationRate="fast"
            contentContainerStyle={{
              paddingHorizontal: screenWidth / 2 - ITEM_WIDTH / 2,
            }}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            bounces={false}
            overScrollMode="never">
            {numbers.map((num, index) => (
              <View key={index}>
                {num % 10 === 0 && (
                  <Text
                    style={style.pickerWeight}
                    overflow="visible"
                    fontSize={20}
                    left={-8}
                    fontWeight={500}
                    position="absolute"
                    top={-4}
                    zIndex={100}
                    textWrap="nowrap"
                    width={50}
                    height={400}
                    color="#888"
                    mt="$1">
                    {num * 2}
                  </Text>
                )}
                <YStack
                  mt={10}
                  key={index}
                  width={ITEM_WIDTH}
                  alignItems="center"
                  justifyContent="flex-start">
                  <View
                    mt={num % 10 === 0 ? 22.5 : 26}
                    overflow="visible"
                    background={'rgba(0, 0, 0, 0.29)'}
                    height={num % 10 === 0 ? 25 : 17}
                    width={2}
                    bg={num % 10 === 0 ? '#000' : 'rgba(0, 0, 0, 0.29)'}
                  />
                </YStack>
              </View>
            ))}
          </ScrollView>

          {/* Center indicator line */}
          <View
            position="absolute"
            top={10}
            height={48}
            bottom={25}
            left={screenWidth / 2 - 1}
            width={2}
            bg="black"
          />

          {/* KG unit label */}
          <Text
            position="absolute"
            bottom={0}
            fontWeight={500}
            alignSelf="center"
            fontSize={14}
            color="black">
            {unit}
          </Text>
        </View>
      </YStack>
      <XStack justifyContent="center">
        <Button
          fontSize={16}
          fontWeight={700}
          px="$5"
          color="white"
          bg="#FD4F01"
          {...shadows.small}>
          Next
        </Button>
      </XStack>
    </YStack>
  );
}

const style = StyleSheet.create({
  pickerWeight: {
    transform: [{ translateX: -8 }],
  },
});
