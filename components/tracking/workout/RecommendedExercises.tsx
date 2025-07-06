import React from 'react';
import { Text, XStack, YStack } from 'tamagui';
import DownArrow from '~/public/images/chevron-down.svg';
export default function ExercisesLists() {
  return (
    <YStack
      p="$3"
      bg="rgba(237, 238, 241, 0.50)"
      borderWidth={1}
      borderColor="rgba(0, 0, 0, 0.10)"
      borderRadius={8}>
      <YStack>
        {exercies.map((item, index) => (
          <YStack mt="$2" gap="$1" key={index}>
            <XStack alignItems="center" justifyContent="space-between">
              <Text fontSize={14} fontWeight={700}>
                {item.title}
              </Text>
              <XStack
                alignItems="center"
                justifyContent="center"
                width={28}
                height={28}
                bg="white"
                borderRadius={14}>
                <DownArrow />
              </XStack>
            </XStack>
            {item?.recommended?.length > 0 && (
              <YStack pb="$2" borderBottomColor="#D8DBDF" borderBottomWidth={1}>
                <Text fontSize={12} fontWeight={500}>
                  Recommended
                </Text>
                {item?.recommended?.map((recommended, index) => (
                  <YStack w="100%" gap={2} key={index}>
                    <XStack alignItems="center">
                      <Text>Set {recommended.sets} | </Text>
                      <Text>Reps {recommended.reps} </Text>
                      <Text>Weight {recommended.weight}</Text>
                    </XStack>
                  </YStack>
                ))}
              </YStack>
            )}
          </YStack>
        ))}
      </YStack>
    </YStack>
  );
}

const exercies = [
  {
    title: 'Exercises 1',
    recommended: [
      {
        sets: 1,
        reps: 10,
        weight: '5kg',
      },
      {
        sets: 2,
        reps: 10,
        weight: '5kg',
      },
      {
        sets: 3,
        reps: 10,
        weight: '5kg',
      },
    ],
  },
  {
    title: 'Exercises 2',
    recommended: [
      {
        sets: 1,
        reps: 10,
        weight: '5kg',
      },
      {
        sets: 2,
        reps: 10,
        weight: '5kg',
      },
      {
        sets: 3,
        reps: 10,
        weight: '5kg',
      },
    ],
  },
  {
    title: 'Exercises',
    recommended: [
      {
        sets: 1,
        reps: 10,
        weight: '5kg',
      },
      {
        sets: 2,
        reps: 10,
        weight: '5kg',
      },
      {
        sets: 3,
        reps: 10,
        weight: '5kg',
      },
    ],
  },
  {
    title: 'Exercises 4',
    recommended: [
      {
        sets: 1,
        reps: 10,
        weight: '5kg',
      },
      {
        sets: 2,
        reps: 10,
        weight: '5kg',
      },
      {
        sets: 3,
        reps: 10,
        weight: '5kg',
      },
    ],
  },
];
