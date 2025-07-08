import { Text } from 'tamagui';
import { YStack } from 'tamagui';
import WeeklyDaySelection, { YourWorkOutSelect } from './WeeklyDaySelection';
import WorkOutVideoSlider from './WorkOutVideoSlider';
import { router } from 'expo-router';
import { useState } from 'react';
import { WorkoutVideoModal } from '../WorkoutVideoModal';
import YourCompletedWorkout from './YourCompletedWorkout';

export default function YourWorkout() {
  const [onOpen, setOpen] = useState(false);
  return (
    <YStack w="100%" py={12} gap="$5">
      <Text
        borderBottomWidth={1}
        borderBottomColor="#D8DBDF"
        fontSize={16}
        fontWeight={700}
        py="$2">
        Saved Workouts
      </Text>
      <YourWorkOutSelect />

      <WorkOutVideoSlider onPress={() => setOpen(true)} />
      <Text fontSize={16} fontWeight={700}>
        Completed workouts
      </Text>
      <YourCompletedWorkout />
      {onOpen && <WorkoutVideoModal open={onOpen} onOpenChange={setOpen} />}
    </YStack>
  );
}
