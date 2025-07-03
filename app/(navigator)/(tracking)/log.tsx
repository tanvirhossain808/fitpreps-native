import React from 'react';
import { ScrollView, Text, XStack, YStack } from 'tamagui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TopSearchbar from '~/components/shared/TopSearchbar';
import { StatusBar } from 'expo-status-bar';
import { DateSelector } from '~/components/tracking/GenerateWeekDates';
import { ProgressChart } from '~/components/tracking/ProgressChart';
import DailyEntry from '~/components/tracking/DailyEntry';
import WeeklyChart from '~/components/tracking/WeeklyChart';

export default function Log() {
  const insets = useSafeAreaInsets();
  return (
    <YStack f={1} bg="$background">
      <StatusBar style="light" />
      <YStack
        pt={insets.top}
        bg="$tracking-primary"
        borderBottomRightRadius={20}
        borderBottomLeftRadius={20}>
        <TopSearchbar
          isTrackingScreen={false}
          placeholder="Search your meal here"
          showBackButton={false}
        />
      </YStack>
      <YStack f={1}>
        <ScrollView>
          <XStack p="$4">
            <Text fontSize={16} color="$tracking-title" fontWeight={700}>
              Hello User!
            </Text>
          </XStack>
          <XStack>
            <DateSelector />
          </XStack>
          <YStack px="$4" py="$5">
            <ProgressChart />
            {/* <WeeklyChart /> */}
          </YStack>
          <YStack p="$3">
            <DailyEntry />
          </YStack>
        </ScrollView>
      </YStack>
    </YStack>
  );
}
