import { XStack, Text, ScrollView } from 'tamagui';
import { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;
type DayOfWeek = (typeof days)[number];

export default function WeeklyDaySelection() {
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>('Mon');

  useEffect(() => {
    const date = new Date();
    const dayIndex = (date.getDay() + 6) % 7;
    setSelectedDay(days[dayIndex]);
  }, []);

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <XStack space={6} justifyContent="space-between">
        {days.map((day, i) => (
          <TouchableOpacity onPress={() => setSelectedDay(day)} key={i}>
            <XStack
              bg={selectedDay === day ? '#E8EFFF' : 'transparent'}
              px={12}
              py={8}
              borderWidth={1}
              borderColor={selectedDay === day ? '$tracking-primary' : '#B6BAC3'}
              borderRadius={8}>
              <Text fontSize={14} fontWeight={500} color={'#25272C'}>
                {day}
              </Text>
            </XStack>
          </TouchableOpacity>
        ))}
      </XStack>
    </ScrollView>
  );
}
export const YourWorkOutSelect = () => {
  const [selectType, setSelectType] = useState('All');
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <XStack gap={6} justifyContent="space-between">
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
