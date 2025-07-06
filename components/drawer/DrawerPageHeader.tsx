import { Text, XStack } from 'tamagui';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function DrawerPageHeader({ title }: { title: string }) {
  return (
    <XStack py="$5" px="$4">
      <TouchableOpacity onPress={() => router.back()}>
        <Feather name="chevron-left" size={24} color="#1E1F20" />
      </TouchableOpacity>
      <Text flex={1} color="#1E1F20" fontWeight={700} fontSize={20} textAlign="center">
        {title}
      </Text>
      <TouchableOpacity disabled style={style.hiddenOpacity}>
        <Feather name="chevron-left" size={24} color="#1E1F20" />
      </TouchableOpacity>
    </XStack>
  );
}

export function VideoHeader({ title, onPress }: { title: string; onPress: () => void }) {
  const handleBack = () => {};
  return (
    <XStack py="$5">
      <TouchableOpacity onPress={onPress}>
        <Feather name="chevron-left" size={24} color="white" />
      </TouchableOpacity>
      <Text flex={1} color="white" fontWeight={700} fontSize={20} textAlign="center">
        {title}
      </Text>
      <TouchableOpacity disabled style={style.hiddenOpacity}>
        <Feather name="chevron-left" size={24} color="#1E1F20" />
      </TouchableOpacity>
    </XStack>
  );
}

const style = StyleSheet.create({
  hiddenOpacity: {
    opacity: 0,
  },
});
