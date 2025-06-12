import { View, Text } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import Header from './partials/Header';
import Feather from '@expo/vector-icons/Feather';
export default function sharedScreensLayout() {
  return (
    <Stack>
      <Stack.Screen name="productSelect" options={{ headerShown: false }} />
    </Stack>
  );
}
