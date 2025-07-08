import React from 'react';
import { Text, YStack } from 'tamagui';
import WeeklyDaySelection from './WeeklyDaySelection';
import RecommendedExercises from './RecommendedExercises';
import CompletedWorkout from './CompletedWorkout';
import ExercisesLists from './ExercisesLists';

export default function CuratedbyTrainer() {
  return (
    <YStack gap="$5">
      <Text fontSize={16} fontWeight={700}>
        Curated by Trainer
      </Text>
      <WeeklyDaySelection />
      <RecommendedExercises />
      <CompletedWorkout />
      <YStack>
        <ExercisesLists />
      </YStack>
    </YStack>
  );
}
