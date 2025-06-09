import { Stack } from 'expo-router';

import { StyleSheet } from 'react-native';
import { View } from 'tamagui';

import { ScreenContent } from '~/components/ScreenContent';

export default function Home() {
  return (
    <>
      <Stack.Screen />
      <View style={styles.container}>
        <ScreenContent path="app/(tabs)/two.tsx" title="Tab Two" />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
