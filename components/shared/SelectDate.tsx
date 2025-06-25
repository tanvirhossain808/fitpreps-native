import { TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Entypo } from '@expo/vector-icons';
import DatePickerCalendar from 'public/images/calendar1.svg';
import { DateData } from 'react-native-calendars';
import { Portal, Text, View, XStack } from 'tamagui';
import DatePicker from '~/components/shared/DatePicker';

export default function SelectDate({ title = '' }: { title?: string }) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<DateData | null>(null);
  const toggleDatePicker = () => setShowDatePicker(!showDatePicker);
  const formatSelectedDate = (date: DateData | null) => {
    if (!date) return title;
    const dateObj = new Date(date.dateString);
    return dateObj
      .toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        timeZone: 'UTC',
      })
      .replace(/\//g, ' / ');
  };
  return (
    <XStack
      flex={1}
      width={'100%'}
      background={'red'}
      borderWidth={1}
      borderRadius={8}
      bg="white"
      borderColor="#EDEEF1"
      alignItems="center"
      px={14}
      py={13}
      shadowColor="rgba(10, 13, 18, 0.05)"
      shadowOpacity={1}
      shadowOffset={{ width: 0, height: 1 }}
      shadowRadius={2}
      elevation="$1">
      <TouchableOpacity
        style={{ width: '100%', display: 'flex', flex: 1 }}
        onPress={() => setShowDatePicker(!showDatePicker)}>
        <XStack gap="$2">
          <DatePickerCalendar size={20} />
          <Text
            alignSelf="stretch"
            flex={1}
            color={formatSelectedDate(selectedDate) === 'Date Of Birth' ? '#8E95A2' : '#1E1F20'}
            fontSize={14}>
            {formatSelectedDate(selectedDate)}
          </Text>
          {showDatePicker ? (
            <Entypo name="chevron-small-up" size={20} color="#1E1F20" />
          ) : (
            <Entypo name="chevron-small-down" size={20} color="#1E1F20" />
          )}
        </XStack>
      </TouchableOpacity>
      {showDatePicker && (
        <Portal>
          <View zIndex={10000} position="absolute" top={270} px={36} left={0} right={0} bottom={0}>
            <DatePicker
              title={title}
              toggleDatePicker={toggleDatePicker}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </View>
        </Portal>
      )}
    </XStack>
  );
}
