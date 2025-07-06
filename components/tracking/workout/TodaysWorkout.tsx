import { ScrollView, Text, XStack } from 'tamagui';
import { YStack } from 'tamagui';
import WorkOutVideoSlider from './WorkOutVideoSlider';
import { useState } from 'react';
import { WorkoutVideoModal } from '../WorkoutVideoModal';
import YourCompletedWorkout from './YourCompletedWorkout';
import { TouchableOpacity } from 'react-native';
import BookMark from '~/public/images/bookmark (1).svg';
export default function TodaysWorkout() {
  const [onOpen, setOpen] = useState(false);
  return (
    <YStack w="100%" py={12} gap="$5">
      <Text
        borderBottomWidth={1}
        borderBottomColor="#D8DBDF"
        fontSize={16}
        fontWeight={700}
        py="$2">
        Today’s Workout
      </Text>
      <WorkoutTypeSelect />
    </YStack>
  );
}

export const WorkoutTypeSelect = () => {
  const [selectType, setSelectType] = useState('All');
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <XStack gap={6} justifyContent="space-between">
        <TouchableOpacity onPress={() => setSelectType('saved')}>
          <XStack
            bg={selectType === 'saved' ? '#E8EFFF' : 'transparent'}
            px={12}
            py={8}
            borderWidth={1}
            borderColor={selectType === 'saved' ? '$tracking-primary' : '#B6BAC3'}
            borderRadius={8}>
            <BookMark />
            <Text fontSize={14} fontWeight={500} color={'#25272C'}>
              Saved
            </Text>
          </XStack>
        </TouchableOpacity>

        {selectionsLists.map((day, i) => (
          <TouchableOpacity onPress={() => setSelectType(day.name)} key={i}>
            <XStack
              bg={selectType === day.name ? '#E8EFFF' : 'transparent'}
              px={12}
              py={8}
              borderWidth={1}
              borderColor={selectType === day.name ? '$tracking-primary' : '#B6BAC3'}
              borderRadius={8}>
              <Text fontSize={14} fontWeight={500} color={'#25272C'}>
                {day.name}
              </Text>
            </XStack>
          </TouchableOpacity>
        ))}
      </XStack>
    </ScrollView>
  );
};

const selectionsLists = [
  { name: 'All' },
  {
    name: 'Chest',
  },
  {
    name: 'Back',
  },
  {
    name: 'Biceps',
  },
  {
    name: 'Triceps',
  },
  {
    name: 'Full Body',
  },
  {
    name: 'Legs',
  },
  {
    name: 'Cardio',
  },
];
