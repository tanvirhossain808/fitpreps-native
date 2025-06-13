import React, { useEffect, useRef, useState } from 'react';
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
  const flatListRef = useRef<FlatList>(null);
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
    const dayStr = String(selectedDate.day);
    const selectedDay = parseInt(dayStr, 10);
    if (isNaN(selectedDay) || selectedDay === 0) return false;
    return day > selectedDay && (day - selectedDay) % 7 === 0 && day <= daysInMonth;
  };
  const isWeekend = (day: DateData): boolean => {
    const date = new Date(day.dateString);
    const dayOfWeek = date.getDay();
    return dayOfWeek === 0 || dayOfWeek === 6;
  };
  const isFromOtherMonth = (day: DateData): boolean => {
    const date = new Date(day.dateString);
    return (
      date.getMonth() !== currentDate.getMonth() || date.getFullYear() !== currentDate.getFullYear()
    );
  };
  useEffect(() => {
    if (modalVisible && flatListRef.current) {
      // Delay scrolling to ensure FlatList is rendered
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({
          index: currentDate.getMonth(),
          animated: true,
          viewPosition: 0.5, // center the selected month in the list
        });
      }, 100); // 100ms delay
    }
  }, [modalVisible]);
  const handleContentSizeChange = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index: currentDate.getMonth(),
        animated: true,
        viewPosition: 0.5,
      });
    }
  };
  const onScrollToIndexFailed = (info: {
    index: number;
    highestMeasuredFrameIndex: number;
    averageItemLength: number;
  }) => {
    flatListRef.current?.scrollToOffset({
      offset: info.averageItemLength * info.index,
      animated: true,
    });
  };
  const ITEM_HEIGHT = 50;

  const getItemLayout = (data: ArrayLike<string> | null | undefined, index: number) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  });

  const renderDay = (day: DateData) => {
    if (!day?.dateString) return null;

    const dayNumber = Number(day.day);
    const isToday = day.dateString === new Date().toISOString().split('T')[0];
    const isSelected = selectedDate?.dateString === day.dateString;
    const highlightMultiple = isMultipleAfterSelected(dayNumber);

    const weekend = isWeekend(day);
    const fromOtherMonth = isFromOtherMonth(day);

    const isDisabled = weekend;

    const handlePress = () => {
      if (isDisabled) return;
      setSelectedDate(day);
    };

    const dayStyle: StyleProp<ViewStyle> = {
      height: 42,
      width: 42,
      borderRadius: 21,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isSelected ? '#FF7435' : 'transparent',
      borderWidth: isToday && !isSelected ? 2 : isSelected ? 2 : 0,
      borderColor: isSelected ? '#FF7435' : isToday ? '#FF7435' : 'transparent',
      opacity: isDisabled ? 0.5 : 1,
    };

    const textColor = isSelected
      ? '#fff'
      : fromOtherMonth
        ? '#8E95A2'
        : highlightMultiple
          ? '#000'
          : '#8E95A2';

    return (
      <TouchableOpacity activeOpacity={isDisabled ? 1 : 0.8} onPress={handlePress} style={dayStyle}>
        <Text color={textColor} fontWeight={isSelected ? 'bold' : 'normal'} fontSize={16}>
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
        alignItems="center"
        borderWidth={1}
        borderBottomWidth={0}
        shadowOpacity={0.5}
        shadowRadius={2}
        elevation={2}
        shadowOffset={{ width: 0, height: 1 }}
        shadowColor="#0A0D12"
        borderColor={'#E5F8EA'}>
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
        style={{
          borderWidth: 1,
          borderColor: '#E5F8EA',
          shadowOpacity: 0.05,
          shadowRadius: 2,
          borderTopColor: 'transparent',
          borderTopWidth: 0,
          elevation: 2,
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowColor: '#0A0D12',
          borderBottomStartRadius: 12,
          borderBottomEndRadius: 12,
        }}
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
            key={modalVisible.toString()}
            borderRadius="$4"
            backgroundColor="#fff"
            maxHeight={300}
            padding="$3"
            width={300}
            marginHorizontal="$5">
            <FlatList
              ref={flatListRef}
              data={MONTHS}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderMonthItem}
              getItemLayout={getItemLayout}
              onContentSizeChange={handleContentSizeChange}
              onScrollToIndexFailed={onScrollToIndexFailed}
              // optional from previous suggestion
            />

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
