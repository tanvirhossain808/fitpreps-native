import { router, Stack } from 'expo-router';

import { StyleSheet } from 'react-native';
import { View } from 'tamagui';

import { ScreenContent } from '~/components/ScreenContent';

export default function Track() {
  router.push({
    pathname: '/(navigator)/(tabs)/track',
  });
  return <></>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
