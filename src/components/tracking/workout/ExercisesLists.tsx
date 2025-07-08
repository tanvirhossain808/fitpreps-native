import {
  Checkbox,
  CheckedState,
  ScrollView,
  Text,
  useWindowDimensions,
  XStack,
  YStack,
} from 'tamagui';
import { WorkOutSearch } from '~/src/components/shared/Search';
import Feather from '@expo/vector-icons/Feather';
import Video from 'public/images/video.svg';
import { TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { WorkoutVideoModal } from '../WorkoutVideoModal';
export default function ExercisesLists({ addAction = () => {} }: { addAction?: () => void }) {
  const height = useWindowDimensions().height;
  return (
    <ScrollView
      maxHeight={height}
      py="$3"
      px="$3"
      borderRadius={12}
      bg="rgba(237, 238, 241, 0.20)"
      scrollEnabled={true}
      nestedScrollEnabled={true}>
      <YStack gap="$3" pb={40}>
        <WorkOutSearch placeholder="Search exercise here" value={''} onChangeText={() => {}} />
        {exercies.map((exercise, index) => (
          <CheckExercises exercise={exercise} key={index} addAction={addAction} />
        ))}
      </YStack>
    </ScrollView>
  );
}

const exercies = [
  {
    name: 'Exercise Name',
    type: 'Chest | Triceps',
    done: false,
  },
  {
    name: 'Exercise Name',
    type: 'Chest | Triceps',
    done: false,
  },
  {
    name: 'Exercise Name',
    type: 'Chest | Triceps',
    done: false,
  },
  {
    name: 'Exercise Name',
    type: 'Chest | Triceps',
    done: false,
  },
  {
    name: 'Exercise Name',
    type: 'Chest | Triceps',
    done: false,
  },
  {
    name: 'Exercise Name',
    type: 'Chest | Triceps',
    done: false,
  },
  {
    name: 'Exercise Name',
    type: 'Chest | Triceps',
    done: false,
  },
  {
    name: 'Exercise Name',
    type: 'Chest | Triceps',
    done: false,
  },
  {
    name: 'Exercise Name',
    type: 'Chest | Triceps',
    done: false,
  },
  {
    name: 'Exercise Name',
    type: 'Chest | Triceps',
    done: false,
  },
  {
    name: 'Exercise Name',
    type: 'Chest | Triceps',
    done: false,
  },
  {
    name: 'Exercise Name',
    type: 'Chest | Triceps',
    done: false,
  },
  {
    name: 'Exercise Name',
    type: 'Chest | Triceps',
    done: false,
  },
  {
    name: 'Exercise Name',
    type: 'Chest | Triceps',
    done: false,
  },
  {
    name: 'Exercise Name',
    type: 'Chest | Triceps',
    done: false,
  },
  {
    name: 'Exercise Name',
    type: 'Chest | Triceps',
    done: false,
  },
];

const CheckExercises = ({
  exercise,
  addAction = () => {},
}: {
  exercise: (typeof exercies)[0];
  addAction?: () => void;
}) => {
  const [isChecked, setIsChecked] = useState<CheckedState>(false);
  const [open, setOpen] = useState(false);
  return (
    <YStack gap="$3">
      <XStack
        alignItems="center"
        gap={8}
        py={8}
        borderBottomWidth={1}
        borderColor="#D8DBDF"
        bg="white">
        <Checkbox
          checked={isChecked}
          onCheckedChange={setIsChecked}
          backgroundColor="white"
          borderColor="$tracking-primary"
          justifyContent="center"
          alignItems="center">
          <Checkbox.Indicator>
            <Feather name="check" size={16} color="#588DF5" />
          </Checkbox.Indicator>
        </Checkbox>
        <YStack flex={1}>
          <Text fontSize={12} fontWeight={700}>
            {exercise.name}
          </Text>
          <Text fontSize={12} fontWeight={500}>
            {exercise.type}
          </Text>
        </YStack>
        <XStack alignItems="center" gap={8}>
          <TouchableOpacity onPress={() => setOpen(true)}>
            <Video />
          </TouchableOpacity>
          {isChecked && (
            <TouchableOpacity
              onPress={addAction}
              style={{
                backgroundColor: '#FD4F01',
                paddingVertical: 8,
                paddingHorizontal: 14,
                borderRadius: 8,
              }}>
              <Text color="white" fontSize={14} fontWeight={700}>
                Add
              </Text>
            </TouchableOpacity>
          )}
        </XStack>
      </XStack>
      {open && <WorkoutVideoModal open={open} onOpenChange={setOpen} />}
    </YStack>
  );
};
