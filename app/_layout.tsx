import * as Font from 'expo-font';
import React, { useEffect } from 'react';
import { TamaguiProvider } from 'tamagui';
import { SplashScreen, Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // Added import
import { StyleSheet } from 'react-native'; // Added import

import config from '../tamagui.config';
import { SafeAreaProvider } from 'react-native-safe-area-context';

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  const [loaded] = useFonts({
    'Gilroy-Regular': require('assets/fonts/Gilroy-Regular.ttf'),
    'Gilroy-Medium': require('assets/fonts/Gilroy-Medium.ttf'),
    'Gilroy-SemiBold': require('assets/fonts/Gilroy-SemiBold.ttf'),
    'Gilroy-Bold': require('assets/fonts/Gilroy-Bold.ttf'),
    'Gilroy-ExtraBold': require('assets/fonts/Gilroy-ExtraBold.ttf'),
    'Oswald-bold': require('assets/fonts/Oswald-Bold.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <TamaguiProvider config={config}>
      <GestureHandlerRootView style={styles.container}>
        <SafeAreaProvider>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
            <Stack.Screen name="(sharedScreens)" options={{ headerShown: false }} />
            <Stack.Screen name="cart" options={{ headerShown: false }} />
            <Stack.Screen name="orderplaced" options={{ headerShown: false }} />
            <Stack.Screen name="h" options={{ headerShown: false }} />
          </Stack>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </TamaguiProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
