import * as Font from 'expo-font';

import React, { useEffect } from 'react';
import { TamaguiProvider } from 'tamagui';
import { SplashScreen, Stack } from 'expo-router';
import { useFonts } from 'expo-font';

import config from '../tamagui.config';

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  const [loaded] = useFonts({
    'Gilroy-Regular': require('assets/fonts/Gilroy-Regular.ttf'),
    'Gilroy-Medium': require('assets/fonts/Gilroy-Medium.ttf'),
    'Gilroy-SemiBold': require('assets/fonts/Gilroy-SemiBold.ttf'),
    'Gilroy-Bold': require('assets/fonts/Gilroy-Bold.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <TamaguiProvider config={config}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
    </TamaguiProvider>
  );
}
