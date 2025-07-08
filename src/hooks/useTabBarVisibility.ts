import { useNavigation } from 'expo-router';
import { useRef, useEffect } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

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

export const useTabBarVisibility = (isEnabled = true) => {
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

  useEffect(() => {
    return () => {
      navigation.setOptions({ tabBarStyle: defaultTabBarStyle });
    };
  }, [navigation]);

  return {
    handleScroll,
    toggleTabBar,
    isTabBarVisible: isTabBarVisible.current,
  };
};
