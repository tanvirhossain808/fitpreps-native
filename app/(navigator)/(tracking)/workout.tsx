import React, { useState } from 'react';
import { ScrollView, Text, XStack, YStack } from 'tamagui';
import { StatusBar } from 'expo-status-bar';
import TopSearchbar from '~/components/shared/TopSearchbar';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { DateSelector } from '~/components/tracking/GenerateWeekDates';
import WeeklyChart from '~/components/tracking/WeeklyChart';
import Feather from '@expo/vector-icons/Feather';
import WorkOutVideoSlider from '~/components/tracking/workout/WorkOutVideoSlider';
import { WorkoutVideoModal } from '~/components/tracking/WorkoutVideoModal';
import { router } from 'expo-router';
export default function Workout() {
  const [open, setOpen] = useState(false);
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
      <SafeAreaView edges={['bottom', 'left', 'right']} style={{ ...style.container }}>
        <YStack f={1}>
          <XStack py="$5">
            <DateSelector />
          </XStack>
          <ScrollView>
            <YStack px="$4" py="$5">
              <WeeklyChart />
            </YStack>
            <YStack px="$4" py="$5">
              <Text fontSize={16} fontWeight={700}>
                What do you want to train today?
              </Text>
              <XStack mt={10}>
                <TranToday />
              </XStack>
            </YStack>
            <YStack px="$4" py="$5">
              <SelectWorkoutType />
            </YStack>
            <YStack px="$4" py="$5" mb={80}>
              <Text fontSize={16} fontWeight={700}>
                Explore Full Body Routines
              </Text>
              <Text mt={4}>20 Videos</Text>
              <WorkOutVideoSlider onPress={() => setOpen(true)} />
            </YStack>
          </ScrollView>
        </YStack>
      </SafeAreaView>
      {open && <WorkoutVideoModal open={open} onOpenChange={setOpen} />}
    </YStack>
  );
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$background',
  },
});

const TranToday = () => {
  return (
    <XStack w={'100%'} gap={10}>
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: '/train-workout',
            params: {
              workoutBy: 'bytrainer',
            },
          })
        }
        style={{ width: '48%', backgroundColor: '#DEE5F5', borderRadius: 12 }}>
        <XStack px={16} py={12} alignItems="center" bg="#" justifyContent="space-between">
          <YStack>
            <Text fontSize={15} fontWeight={700}>
              Curated by
            </Text>
            <Text fontSize={15} fontWeight={700}>
              Trainer
            </Text>
          </YStack>
          <Feather name="chevron-right" size={24} color="black" />
        </XStack>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: '/train-workout',
            params: {
              workoutBy: 'byyou',
            },
          })
        }
        style={{ width: '48%', backgroundColor: '#DEE5F5', borderRadius: 12 }}>
        <XStack px={16} py={12} w="100%" alignItems="center" justifyContent="space-between">
          <YStack>
            <Text fontSize={15} fontWeight={700}>
              Your
            </Text>
            <Text fontSize={15} fontWeight={700}>
              {' '}
              Workouts
            </Text>
          </YStack>
          <Feather name="chevron-right" size={24} color="black" />
        </XStack>
      </TouchableOpacity>
    </XStack>
  );
};

const SelectWorkoutType = () => {
  const [workoutType, setWorkoutType] = useState<string>('');
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <XStack>
        {workoutTypes.map((type, i) => (
          <TouchableOpacity onPress={() => setWorkoutType(type.name)} key={i}>
            <YStack w={80} alignItems="center">
              <XStack
                w={56}
                h={56}
                borderRadius={28}
                justifyContent="center"
                alignItems="center"
                borderWidth={1}
                borderColor={workoutType === type.name ? '$tracking-primary' : 'transparent'}
                key={i}>
                <XStack w={48} height={48} borderRadius={24} bg="#D9D9D9"></XStack>
              </XStack>
              <Text
                fontSize={12}
                color={workoutType === type.name ? '$tracking-primary' : '#25272C'}
                fontWeight={workoutType === type.name ? 700 : 500}>
                {type.name}
              </Text>
            </YStack>
          </TouchableOpacity>
        ))}
      </XStack>
    </ScrollView>
  );
};

const workoutTypes = [
  {
    name: 'Full Body',
  },
  {
    name: 'Chest',
  },
  {
    name: 'Back',
  },
  {
    name: 'Legs',
  },
  {
    name: 'Cardio',
  },
];
