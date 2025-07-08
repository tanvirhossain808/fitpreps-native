import { TouchableOpacity, useWindowDimensions } from 'react-native';
import { useRef, useState } from 'react';
import { HomeVideoSlider } from '~/src/constant';
import { YStack, Text, XStack, Image, ScrollView } from 'tamagui';
import Play from 'public/images/home/intro-products/Play.svg';
import Left from 'public/images/home/intro-products/Icon+bg.svg';
import Right from 'public/images/home/intro-products/Icon+bg (1).svg';
import { WorkoutVideoModal } from '../tracking/WorkoutVideoModal';

export default function HomeIntroVideoSlider() {
  const { width: windowWidth } = useWindowDimensions();
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemWidth = 260; // Fixed width for each item
  const spacing = 10; // Gap between items
  const [playVide, setPlayVideo] = useState(false);

  const scrollTo = (direction: 'left' | 'right') => {
    const newIndex = direction === 'right' ? currentIndex + 1 : currentIndex - 1;
    if (newIndex >= 0 && newIndex < HomeVideoSlider.length) {
      scrollViewRef.current?.scrollTo({
        x: newIndex * (itemWidth + spacing),
        animated: true,
      });
      setCurrentIndex(newIndex);
    }
  };

  return (
    <YStack>
      <Text fontSize={24} fontWeight={800} textAlign="center">
        Trusted by people that rise to every challenge
      </Text>

      <ScrollView
        ref={scrollViewRef}
        mt="$7"
        horizontal
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        scrollEventThrottle={16}
        onScroll={(event) => {
          const offsetX = event.nativeEvent.contentOffset.x;
          const index = Math.round(offsetX / (itemWidth + spacing));
          setCurrentIndex(index);
        }}>
        <XStack gap={spacing}>
          {HomeVideoSlider.map((item, index) => (
            <XStack maxWidth={itemWidth} key={index} position="relative">
              <Image source={item.img} width={itemWidth} height={486} objectFit="contain" />
              <XStack
                position="absolute"
                top="50%"
                left="50%"
                style={{ transform: [{ translateX: -15 }, { translateY: -15 }] }}>
                <TouchableOpacity onPress={() => setPlayVideo(true)}>
                  <Play />
                </TouchableOpacity>
              </XStack>
            </XStack>
          ))}
        </XStack>
      </ScrollView>

      <XStack mt="$7" justifyContent="center" gap="$2">
        <TouchableOpacity
          onPress={() => scrollTo('left')}
          disabled={currentIndex === 0}
          style={{ opacity: currentIndex === 0 ? 0.5 : 1 }}>
          <Left />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => scrollTo('right')}
          disabled={currentIndex === HomeVideoSlider.length - 1}
          style={{ opacity: currentIndex === HomeVideoSlider.length - 1 ? 0.5 : 1 }}>
          <Right />
        </TouchableOpacity>
      </XStack>
      {playVide && <WorkoutVideoModal open={playVide} onOpenChange={setPlayVideo} />}
    </YStack>
  );
}
