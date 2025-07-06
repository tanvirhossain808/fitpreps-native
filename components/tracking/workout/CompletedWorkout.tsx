import { YStack, Text, XStack } from 'tamagui';
import CheckCircle from '~/public/images/check-circle-blue.svg';

export default function CompletedWorkout() {
  return (
    <>
      <Text
        borderBottomWidth={1}
        borderBottomColor="#D8DBDF"
        fontSize={16}
        fontWeight={700}
        py="$2">
        Completed Workout
      </Text>
      <YStack>
        {exercies.map((item, index) => (
          <YStack pb={8} gap="$1" key={index}>
            <XStack gap="$2" alignItems="flex-start">
              <CheckCircle />
              <YStack w="100%">
                <Text fontSize={14} fontWeight={700}>
                  {item.title}
                </Text>
                {item?.recommended?.length > 0 && (
                  <YStack pb="$2" w="100%" borderBottomColor="#D8DBDF" borderBottomWidth={1}>
                    <Text mt={4} fontSize={12} fontWeight={500}>
                      Recommended
                    </Text>
                    {item?.recommended?.map((recommended, index) => (
                      <YStack mt={4} w="100%" gap={2} key={index}>
                        <XStack alignItems="center">
                          <Text>Set {recommended.sets} | </Text>
                          <Text>Reps {recommended.reps} </Text>
                          <Text>Weight {recommended.weight}</Text>
                        </XStack>
                      </YStack>
                    ))}
                    <Text color="$tracking-primary" mt={4}>
                      Done:
                    </Text>
                    {item?.recommended?.map((recommended, index) => (
                      <YStack mt={4} w="100%" gap={2} key={index}>
                        <XStack alignItems="center">
                          <Text color="$tracking-primary">Set {recommended.sets} | </Text>
                          <Text color="$tracking-primary">Reps {recommended.reps} </Text>
                          <Text color="$tracking-primary">Weight {recommended.weight}</Text>
                        </XStack>
                      </YStack>
                    ))}
                  </YStack>
                )}
              </YStack>
            </XStack>
          </YStack>
        ))}
      </YStack>
    </>
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
];
