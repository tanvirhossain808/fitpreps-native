import { useNavigation } from 'expo-router';
import { useRef, useEffect } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { useDispatch } from 'react-redux';
import { onScrollBottom, onScrollTop } from '../store/slices/scrollSlice';

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
  const lastDispatchTimeRef = useRef<number>(0);

  const dispatch = useDispatch();
  const toggleTabBar = (visible: boolean) => {
    if (isTabBarVisible.current !== visible) {
      isTabBarVisible.current = visible;
      navigation.setOptions({
        tabBarStyle: visible ? defaultTabBarStyle : { ...defaultTabBarStyle, display: 'none' },
      });
    }
  };
  // const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
  //   const currentOffset = event.nativeEvent.contentOffset.y;
  //   const diff = currentOffset - scrollOffset.current;
  //   scrollOffset.current = currentOffset;

  //   if (diff > 10 && isTabBarVisible.current) {
  //     toggleTabBar(false);
  //     setTimeout(() => {
  //       dispatch(onScrollTop());
  //     }, 100);
  //   } else if (diff < -10 && !isTabBarVisible.current) {
  //     toggleTabBar(true);
  //     setTimeout(() => {
  //       dispatch(onScrollBottom());
  //     }, 100);
  //   }
  // };
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const diff = currentOffset - scrollOffset.current;
    scrollOffset.current = currentOffset;

    const now = Date.now();
    const shouldDispatch = now - lastDispatchTimeRef.current > 100;

    if (diff > 10 && isTabBarVisible.current) {
      toggleTabBar(false);

      if (shouldDispatch) {
        setTimeout(() => {
          dispatch(onScrollTop());
          lastDispatchTimeRef.current = Date.now(); // update after dispatch
        }, 100);
      }
    } else if (diff < -10 && !isTabBarVisible.current) {
      toggleTabBar(true);

      if (shouldDispatch) {
        setTimeout(() => {
          dispatch(onScrollBottom());
          lastDispatchTimeRef.current = Date.now(); // update after dispatch
        }, 100);
      }
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
