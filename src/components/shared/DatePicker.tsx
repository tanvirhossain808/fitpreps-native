import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
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

export default function CustomHeaderCalendar({
  toggleDatePicker,
  title = '',
  date,
  setDate,
}: {
  toggleDatePicker: () => void;
  title?: string;
  date?: DateData | null;
  setDate?: React.Dispatch<React.SetStateAction<DateData | null>>;
}) {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const dialogRef = useRef<View>(null);
  const flatListRef = useRef<FlatList>(null);

  const year = currentDate.getFullYear();
  const monthIndex = currentDate.getMonth();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === monthIndex;

  const changeMonth = (offset: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + offset);

    // Prevent navigating to past months
    const newMonth = newDate.getMonth();
    const newYear = newDate.getFullYear();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();

    if (newYear < currentYear || (newYear === currentYear && newMonth < currentMonth)) {
      return;
    }

    setCurrentDate(newDate);
  };

  const selectMonth = (monthIndex: number) => {
    const newDate = new Date(currentDate);
    // Prevent selecting past months in the current year
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();

    if (newDate.getFullYear() === currentYear && monthIndex < currentMonth) {
      return;
    }

    newDate.setMonth(monthIndex);
    setCurrentDate(newDate);
    setModalVisible(false);
  };

  const onMonthChange = (month: { month: number; year: number }) => {
    const newDate = new Date(currentDate);
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();

    // Prevent navigating to past months
    if (
      month.year < currentYear ||
      (month.year === currentYear && month.month - 1 < currentMonth)
    ) {
      return;
    }

    newDate.setFullYear(month.year);
    newDate.setMonth(month.month - 1);
    setCurrentDate(newDate);
  };

  const isMultipleAfterSelected = (day: number): boolean => {
    if (!date || !date.day) return false;
    const dayStr = String(date.day);
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

  const isPastDate = (date: DateData): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const currentDate = new Date(date.dateString);
    return currentDate < today;
  };

  useEffect(() => {
    if (modalVisible && flatListRef.current) {
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({
          index: currentDate.getMonth(),
          animated: true,
          viewPosition: 0.5,
        });
      }, 100);
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
    const isSelected = date?.dateString === day.dateString;
    const highlightMultiple = isMultipleAfterSelected(dayNumber);
    const weekend = isWeekend(day);
    const fromOtherMonth = isFromOtherMonth(day);
    const isPast = isPastDate(day);
    const isDisabled = weekend || isPast;

    const handlePress = () => {
      if (isDisabled) return;
      if (setDate) {
        setDate(day);
      }

      toggleDatePicker();
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
      : fromOtherMonth || isPast
        ? '#8E95A2'
        : highlightMultiple
          ? '#000'
          : '#8E95A2';

    return (
      <TouchableOpacity
        activeOpacity={isDisabled ? 1 : 0.8}
        onPress={handlePress}
        style={dayStyle}
        disabled={isDisabled}>
        <Text color={textColor} fontWeight={isSelected ? 'bold' : 'normal'} fontSize={16}>
          {dayNumber}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderMonthItem = ({ item, index }: { item: string; index: number }) => {
    const today = new Date();
    const isPastMonth =
      today.getFullYear() === currentDate.getFullYear() && index < today.getMonth();

    return (
      <TouchableOpacity
        onPress={() => !isPastMonth && selectMonth(index)}
        style={{
          paddingVertical: 14,
          paddingHorizontal: 20,
          borderBottomWidth: 1,
          borderColor: '#eee',
          backgroundColor: currentDate.getMonth() === index ? '#FD4F01' : 'transparent',
          opacity: isPastMonth ? 0.5 : 1,
        }}
        disabled={isPastMonth}>
        <Text
          color={currentDate.getMonth() === index ? '#fff' : isPastMonth ? '#999' : '#000'}
          fontSize={16}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  const formattedMonth = `${year}-${(monthIndex + 1).toString().padStart(2, '0')}-01`;

  return (
    <YStack flex={1}>
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
          <TouchableOpacity
            onPress={() => changeMonth(-1)}
            disabled={isCurrentMonth && today.getDate() === 1}>
            <Feather
              name="chevron-left"
              size={24}
              color={isCurrentMonth && today.getDate() === 1 ? '#ccc' : '#6B7280'}
            />
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
          ...({
            'stylesheet.calendar.header': {
              week: {
                marginTop: 5,
                flexDirection: 'row',
                justifyContent: 'space-around',
              },
            },
          } as any),
        }}
        dayComponent={({ date }) => renderDay(date!!)}
        renderHeader={() => null}
        minDate={new Date().toISOString().split('T')[0]}
      />

      <Dialog
        modal
        open={modalVisible}
        onOpenChange={(open) => {
          if (!open) {
            setModalVisible(false);
          }
        }}>
        <Dialog.Portal>
          <Dialog.Overlay
            backgroundColor="rgba(0,0,0,0.3)"
            onPress={() => {
              setModalVisible(false);
              toggleDatePicker();
            }}
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
          />

          <Dialog.Content
            ref={dialogRef}
            key={modalVisible.toString()}
            borderRadius="$4"
            backgroundColor="#fff"
            maxHeight={300}
            padding="$3"
            width={300}
            marginHorizontal="$5"
            onStartShouldSetResponder={() => true}
            onTouchEnd={(e) => e.stopPropagation()}>
            <TouchableWithoutFeedback>
              <View>
                <FlatList
                  ref={flatListRef}
                  data={MONTHS}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={renderMonthItem}
                  getItemLayout={getItemLayout}
                  onContentSizeChange={handleContentSizeChange}
                  onScrollToIndexFailed={onScrollToIndexFailed}
                />
                <Button
                  onPress={() => {
                    setModalVisible(false);
                    toggleDatePicker();
                  }}
                  backgroundColor="transparent"
                  color="#FD4F01"
                  marginTop="$3"
                  fontWeight="bold">
                  Close
                </Button>
              </View>
            </TouchableWithoutFeedback>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
    </YStack>
  );
}
