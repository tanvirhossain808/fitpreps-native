import { Text, XStack } from 'tamagui';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

export default function AuthHeader({ title = 'auth header' }: { title: string }) {
  const { top } = useSafeAreaInsets();
  return (
    <XStack
      flex={1}
      width={'100%'}
      px="$4"
      py="$5"
      position="absolute"
      top={top}
      left={0}
      right={0}
      zIndex={300}
      alignItems="center">
      <TouchableOpacity style={styles.titleButton} onPress={() => router.back()}>
        <MaterialCommunityIcons name="chevron-left" size={24} color="black" />
      </TouchableOpacity>
      <Text fontSize={20} color="#1E1F20" textAlign="center" fontWeight={700} flex={1}>
        {title}
      </Text>
      <MaterialCommunityIcons
        name="chevron-left"
        size={24}
        color="black"
        style={{ ...styles.opacity, ...styles.titleButton }}
      />
    </XStack>
  );
}

const styles = StyleSheet.create({
  opacity: {
    opacity: 0,
  },
  titleButton: {
    flex: 1,
    maxWidth: 24,
  },
});
