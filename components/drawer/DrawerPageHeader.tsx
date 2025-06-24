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

const style = StyleSheet.create({
  hiddenOpacity: {
    opacity: 0,
  },
});
