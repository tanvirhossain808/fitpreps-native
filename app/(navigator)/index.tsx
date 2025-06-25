import { View, Text } from 'react-native';
import React from 'react';
import { Button } from 'tamagui';
import { Redirect, router } from 'expo-router';

export default function index() {
  // return <Redirect href="/(navigator)/manage-subscription" />;
  return (
    <View>
      <Text>index</Text>
      <Button onPress={() => router.push('/(tabs)/meals')}>tabs</Button>
    </View>
  );
}
