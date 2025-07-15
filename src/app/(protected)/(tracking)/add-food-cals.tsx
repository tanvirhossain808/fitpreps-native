import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, YStack } from 'tamagui';
import TopSearchbar from '~/src/components/shared/TopSearchbar';

export default function AddFoodCals() {
  const insets = useSafeAreaInsets();
  return (
    <YStack>
      <YStack
        pt={insets.top}
        bg="$tracking-primary"
        borderBottomRightRadius={20}
        borderBottomLeftRadius={20}>
        <TopSearchbar placeholder="Search your meal here" showBackButton={false} />
      </YStack>
    </YStack>
  );
}
