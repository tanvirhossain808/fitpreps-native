import { XStack, YStack, Text } from 'tamagui';
import { useState, useRef } from 'react';
import { format, addDays, isSameDay, startOfWeek, endOfWeek, addWeeks, subWeeks } from 'date-fns';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { StyleSheet, TouchableOpacity, PanResponder, View } from 'react-native';

function generateWeekDates(startDate: Date) {
  const days = [];
  const weekStart = startOfWeek(startDate, { weekStartsOn: 0 }); // Start of the week (Sunday)
  const weekEnd = endOfWeek(startDate, { weekStartsOn: 0 }); // End of the week (Saturday)

  for (let i = 0; i < 7; i++) {
    const date = addDays(weekStart, i);
    days.push({
      day: format(date, 'E').charAt(0),
      date: format(date, 'd'),
      fullDate: date,
    });
  }

  return days;
}

export function DateSelector() {
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const weekDates = generateWeekDates(currentWeekStart);
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderRelease: (_, gestureState) => {
        const { dx } = gestureState;
        const swipeThreshold = 50;

        if (dx > swipeThreshold) {
          handlePreviousWeek();
        } else if (dx < -swipeThreshold) {
          handleNextWeek();
        }
      },
    })
  ).current;

  const handleNextWeek = () => {
    setCurrentWeekStart(addWeeks(currentWeekStart, 1));
  };

  const handlePreviousWeek = () => {
    setCurrentWeekStart(subWeeks(currentWeekStart, 1));
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <View>
      <XStack
        px="$7"
        gap={2}
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        {...panResponder.panHandlers}>
        <TouchableOpacity style={style.leftButton} onPress={handlePreviousWeek}>
          <XStack
            bg="#EDEEF1"
            w={30}
            h={30}
            justifyContent="center"
            alignItems="center"
            borderRadius={15}>
            <EvilIcons name="chevron-left" size={20} color="#1E1F20" />
          </XStack>
        </TouchableOpacity>

        {weekDates.map((item, index) => {
          const isSelected = isSameDay(item.fullDate, selectedDate);
          return (
            <YStack
              key={index}
              alignItems="center"
              py={8}
              gap="$2"
              minWidth={35}
              justifyContent="space-between"
              bg={isSelected ? '#E8EFFF' : 'transparent'}
              borderRadius={8}
              onPress={() => handleDateSelect(item.fullDate)}
              hoverStyle={{ bg: '$blue5' }}
              pressStyle={{ bg: '$blue6' }}>
              <Text fontSize={12} color={isSelected ? '$tracking-primary' : '$color'}>
                {item.day}
              </Text>
              <Text
                fontSize={14}
                fontWeight={isSelected ? 700 : 500}
                color={isSelected ? '$tracking-primary' : '$color'}>
                {item.date}
              </Text>
            </YStack>
          );
        })}

        <TouchableOpacity style={style.rightButton} onPress={handleNextWeek}>
          <XStack
            bg="#EDEEF1"
            w={30}
            h={30}
            justifyContent="center"
            alignItems="center"
            borderRadius={15}>
            <EvilIcons name="chevron-right" size={20} color="#1E1F20" />
          </XStack>
        </TouchableOpacity>
      </XStack>
    </View>
  );
}

const style = StyleSheet.create({
  leftButton: {
    position: 'absolute',
    left: 10,
    transform: [{ translateY: -15 }],
    zIndex: 1,
    top: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightButton: {
    position: 'absolute',
    right: 10,
    transform: [{ translateY: -15 }],
    zIndex: 1,
    top: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
