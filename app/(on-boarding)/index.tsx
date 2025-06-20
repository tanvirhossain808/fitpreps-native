import { Dimensions, ImageBackground, Pressable } from 'react-native';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import { YStack } from 'tamagui';
import { useCallback, useEffect, useRef, useState } from 'react';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

type OnBoardingItem = {
  id: number;
  img: any;
  statusBar: 'light' | 'dark';
};

const onBoardingScreen: OnBoardingItem[] = [
  {
    id: 1,
    img: require('../../public/images/on-boarding/onboarding1.png'),
    statusBar: 'light',
  },
  {
    id: 2,
    img: require('../../public/images/on-boarding/onboarding2.png'),
    statusBar: 'dark',
  },
  {
    id: 3,
    img: require('../../public/images/on-boarding/onboarding3.png'),
    statusBar: 'light',
  },
  {
    id: 4,
    img: require('../../public/images/on-boarding/onboarding4.png'),
    statusBar: 'light',
  },
  {
    id: 5,
    img: require('../../public/images/on-boarding/onboarding5.png'),
    statusBar: 'light',
  },
];

const { width } = Dimensions.get('window');
const SLIDE_DURATION = 5000; // 5 seconds per slide

export default function OnboardingScreen() {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<ICarouselInstance>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastSlideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigatedRef = useRef(false);
  const isUserInteracting = useRef(false);

  const navigateToHome = useCallback(() => {
    if (!navigatedRef.current) {
      navigatedRef.current = true;
      router.replace('/(tabs)');
    }
  }, []);

  const clearTimers = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (lastSlideTimerRef.current) {
      clearTimeout(lastSlideTimerRef.current);
      lastSlideTimerRef.current = null;
    }
  }, []);

  // Handle slide changes and auto-advance
  useEffect(() => {
    clearTimers();

    if (isUserInteracting.current) return;

    // Handle last slide
    if (activeIndex === onBoardingScreen.length - 1) {
      lastSlideTimerRef.current = setTimeout(() => {
        navigateToHome();
      }, SLIDE_DURATION);
      return;
    }

    // Handle other slides
    timeoutRef.current = setTimeout(() => {
      if (!isUserInteracting.current) {
        carouselRef.current?.next();
      }
    }, SLIDE_DURATION);

    return clearTimers;
  }, [activeIndex, isUserInteracting.current, clearTimers, navigateToHome]);

  const onSnapToItem = useCallback(
    (index: number) => {
      clearTimers();
      setActiveIndex(index);
      // If we land on the last slide, start the navigation timer
      if (index === onBoardingScreen.length - 1) {
        lastSlideTimerRef.current = setTimeout(() => {
          navigateToHome();
        }, SLIDE_DURATION);
      }
    },
    [clearTimers, navigateToHome]
  );

  const onScrollBegin = useCallback(() => {
    isUserInteracting.current = true;
    clearTimers();
  }, [clearTimers]);

  const onScrollEnd = useCallback(() => {
    isUserInteracting.current = false;
  }, []);

  const current = onBoardingScreen[activeIndex];

  const handlePressOut = () => {
    isUserInteracting.current = false;
    if (activeIndex === onBoardingScreen.length - 1) {
      navigateToHome();
      clearTimers();
    }
  };
  return (
    <YStack f={1}>
      <StatusBar style={current.statusBar === 'dark' ? 'dark' : 'light'} />

      <Pressable
        onPressIn={() => {
          isUserInteracting.current = true;
        }}
        onPressOut={() => {
          handlePressOut();
          isUserInteracting.current = false;
        }}
        style={{ flex: 1 }}>
        <Carousel
          ref={carouselRef}
          defaultIndex={0}
          width={width}
          loop={false}
          autoPlay={false}
          data={onBoardingScreen}
          scrollAnimationDuration={300}
          onSnapToItem={onSnapToItem}
          onScrollStart={onScrollBegin}
          onScrollEnd={onScrollEnd}
          customAnimation={(value) => {
            'worklet';
            return {
              transform: [{ translateX: value * width }],
            };
          }}
          renderItem={({ item }) => (
            <YStack f={1}>
              <ImageBackground
                source={item.img}
                style={{
                  flex: 1,
                  width: '100%',
                  height: '100%',
                }}
                resizeMode="cover"
              />
            </YStack>
          )}
        />
      </Pressable>
    </YStack>
  );
}
