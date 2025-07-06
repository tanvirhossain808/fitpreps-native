'react-native';
import { router, useFocusEffect } from 'expo-router';
import React, { useEffect } from 'react';
import { Text, View, YStack } from 'tamagui';

export default function Home() {
  useFocusEffect(() => {
    router.push('/log');
  });
  return (
    <YStack>
      <Text>index</Text>
    </YStack>
  );
}
