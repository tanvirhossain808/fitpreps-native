import * as Font from 'expo-font';
import React, { useEffect } from 'react';
import { TamaguiProvider, Text } from 'tamagui';
import { SplashScreen, Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // Added import
import { StyleSheet } from 'react-native'; // Added import
import Toast from 'react-native-toast-message';

import config from '../../tamagui.config';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { toastConfig } from '~/src/toast-config/toast-config';
import { Provider } from 'react-redux';
import { persistor, store } from '../store';
import { PersistGate } from 'redux-persist/integration/react';

SplashScreen.preventAutoHideAsync();

// export const unstable_settings = {
//   initialRouteName: '(tabs)',
// };

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
    <Provider store={store}>
      <TamaguiProvider config={config}>
        <PersistGate loading={null} persistor={persistor}>
          <GestureHandlerRootView style={styles.container}>
            <SafeAreaProvider>
              <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="(on-boarding)" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
                <Stack.Screen name="(sharedScreens)" options={{ headerShown: false }} />
                <Stack.Screen name="cart" options={{ headerShown: false }} />
                <Stack.Screen name="orderplaced" options={{ headerShown: false }} />
                <Stack.Screen name="(orders)" options={{ headerShown: false }} />
                <Stack.Screen name="h" options={{ headerShown: false }} />
                <Stack.Screen name="(navigator)" options={{ headerShown: false }} />
                <Stack.Screen name="(subscription)" options={{ headerShown: false }} />
                <Stack.Screen name="(addresses)" options={{ headerShown: false }} />
                <Stack.Screen name="(payments)" options={{ headerShown: false }} />
                <Stack.Screen name="(tracking)" options={{ headerShown: false }} />
              </Stack>
              <Toast config={toastConfig} />
            </SafeAreaProvider>
          </GestureHandlerRootView>
        </PersistGate>
      </TamaguiProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
