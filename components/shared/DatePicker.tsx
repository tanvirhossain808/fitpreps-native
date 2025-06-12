import React, { useState } from 'react';
import { FlatList, TouchableOpacity, View, StyleProp, ViewStyle } from 'react-native';
import { Calendar, LocaleConfig, DateData } from 'react-native-calendars';
import { Feather } from '@expo/vector-icons';
import { XStack, YStack, Text, Dialog, Button } from 'tamagui';
import AntDesign from '@expo/vector-icons/AntDesign';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

LocaleConfig.locales['custom'] = {
  monthNames: [...MONTHS],
  monthNamesShort: [...MONTHS],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  today: 'Today',
};
LocaleConfig.defaultLocale = 'custom';

export default function CustomHeaderCalendar() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<DateData | null>(null);

  const year = currentDate.getFullYear();
  const monthIndex = currentDate.getMonth();

  // Number of days in the current month
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

  const formattedMonth = `${year}-${(monthIndex + 1).toString().padStart(2, '0')}-01`;

  const changeMonth = (offset: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + offset);
    setCurrentDate(newDate);
  };

  const selectMonth = (monthIndex: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(monthIndex);
    setCurrentDate(newDate);
    setModalVisible(false);
  };

  const onMonthChange = (month: { month: number; year: number }) => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(month.year);
    newDate.setMonth(month.month - 1);
    setCurrentDate(newDate);
  };

  const isMultipleAfterSelected = (day: number): boolean => {
    if (!selectedDate || !selectedDate.day) return false;
    const dayStr = String(selectedDate.day); // Ensure we're working with a string
    const selectedDay = parseInt(dayStr, 10);
    if (isNaN(selectedDay) || selectedDay === 0) return false;
    return day > selectedDay && (day - selectedDay) % 7 === 0 && day <= daysInMonth;
  };

  const renderDay = (day: DateData) => {
    if (!day.dateString) return null;

    const dayNumber = Number(day.day);

    const todayDateString = new Date().toISOString().split('T')[0];

    const isSelected = selectedDate?.dateString === day.dateString;
    const isToday = day.dateString === todayDateString;
    const highlightMultiple = isMultipleAfterSelected(dayNumber);

    // We can type style object as StyleProp<ViewStyle>
    const dayStyle: StyleProp<ViewStyle> = {
      height: 42,
      width: 42,
      borderRadius: 21,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isSelected ? '#FF7435' : 'transparent',
      borderWidth: isToday && !isSelected ? 2 : isSelected ? 2 : 0,
      borderColor: isSelected ? '#FF7435' : isToday ? '#FF7435' : 'transparent',
    };

    return (
      <TouchableOpacity activeOpacity={0.8} onPress={() => setSelectedDate(day)} style={dayStyle}>
        <Text
          color={isSelected ? '#fff' : highlightMultiple ? '#000' : '#8E95A2'}
          fontWeight={isSelected ? 'bold' : 'normal'}
          fontSize={16}>
          {dayNumber}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderMonthItem = ({ item, index }: { item: string; index: number }) => (
    <TouchableOpacity
      onPress={() => selectMonth(index)}
      style={{
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderColor: '#eee',
        backgroundColor: currentDate.getMonth() === index ? '#FD4F01' : 'transparent',
      }}>
      <Text color={currentDate.getMonth() === index ? '#fff' : '#000'} fontSize={16}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <YStack flex={1} backgroundColor="#fff">
      <XStack
        backgroundColor="#F7F8F8"
        paddingHorizontal="$4"
        paddingVertical="$3"
        justifyContent="space-between"
        alignItems="center">
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          <Text color="#6B7280" fontSize={18} fontWeight={500} marginRight={4}>
            {MONTHS[currentDate.getMonth()]}
          </Text>
          <AntDesign name="caretdown" size={15} color="#6B7280" />
        </TouchableOpacity>

        <XStack space="$3" alignItems="center">
          <TouchableOpacity onPress={() => changeMonth(-1)}>
            <Feather name="chevron-left" size={24} color="#6B7280" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => changeMonth(1)}>
            <Feather name="chevron-right" size={24} color="#6B7280" />
          </TouchableOpacity>
        </XStack>
      </XStack>

      <Calendar
        key={formattedMonth}
        current={formattedMonth}
        onMonthChange={onMonthChange}
        hideExtraDays={false}
        hideDayNames={false}
        hideArrows={true}
        disableMonthChange={false}
        firstDay={1}
        theme={{
          calendarBackground: '#fff',
          dayTextColor: '#8E95A2',
          textDisabledColor: '#ccc',
          monthTextColor: '#000',
          textDayFontWeight: '400',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '600',
        }}
        dayComponent={({ date }) => renderDay(date!!)}
        renderHeader={() => null}
      />

      {/* Modal for month picker */}
      <Dialog modal open={modalVisible} onOpenChange={setModalVisible}>
        <Dialog.Portal>
          <Dialog.Overlay backgroundColor="rgba(0,0,0,0.3)" />
          <Dialog.Content
            borderRadius="$4"
            backgroundColor="#fff"
            maxHeight={300}
            padding="$3"
            width={300}
            marginHorizontal="$5">
            {/* <FlatList
              data={MONTHS}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderMonthItem}
            /> */}

            <Button
              onPress={() => setModalVisible(false)}
              backgroundColor="transparent"
              color="#FD4F01"
              marginTop="$3"
              fontWeight="bold">
              Close
            </Button>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
    </YStack>
  );
}
